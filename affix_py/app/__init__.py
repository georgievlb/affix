from __future__ import annotations

import csv
import re
from datetime import datetime, timezone
from io import StringIO
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask
from flask_migrate import upgrade

from .admin.routes import bp as admin_bp
from .auth.routes import bp as auth_bp
from .config import Config
from .extensions import db, login_manager, migrate
from .models import Category, ImageAsset, Post, Score, Subscription, User
from .public.routes import bp as public_bp


load_dotenv()


def create_app(test_config: dict | None = None) -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)
    if test_config:
        app.config.update(test_config)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    app.register_blueprint(public_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)

    register_cli(app)
    return app


def register_cli(app: Flask) -> None:
    @app.cli.command("init-db")
    def init_db_command():
        upgrade()
        print("Database schema is up to date.")

    @app.cli.command("seed-admin")
    def seed_admin_command():
        upgrade()
        email = app.config["ADMIN_EMAIL"].lower()
        password = app.config["ADMIN_PASSWORD"]
        try:
            admin = User.query.filter_by(email=email).first()
            if admin is None:
                admin = User(email=email, is_admin=True)
                admin.set_password(password)
                db.session.add(admin)
            else:
                admin.is_admin = True
                admin.set_password(password)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise
        print(f"Admin user ready: {email}")

    @app.cli.command("seed-sample")
    def seed_sample_command():
        upgrade()
        if Post.query.first():
            print("Sample content skipped because posts already exist.")
            return

        sample_image = _load_sample_image()

        posts = [
            {
                "title": "Youtube",
                "moniker": "youtube",
                "header": "1 min watch",
                "summary": "here's a sample youtube video",
                "content": "Here's an embedded video:\n\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Bv_5Zv5c-Ts\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
                "category": "database",
                "tags": "youtube,course1",
                "image_name": "youtube-cover.jpg",
                "image_alt_text": "YouTube cover image",
            },
            {
                "title": "Oceans of Venus",
                "moniker": "oceans-venus",
                "header": "20 min read",
                "summary": "Lorem Ipsum",
                "content": "## Oceans of Venus\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. This sample post verifies Markdown headings, paragraphs, and rich text blocks.",
                "category": "productivity",
                "tags": "oceans,venus",
                "image_name": "oceans-cover.jpg",
                "image_alt_text": "Oceans of Venus cover image",
            },
            {
                "title": "Draft Example",
                "moniker": "draft-example",
                "header": "Admin draft",
                "summary": "Visible only in admin.",
                "content": "### Draft content\n\nThis post starts as a draft so the admin dashboard has something to edit.",
                "category": "cloud",
                "tags": "draft,admin",
                "is_draft": True,
                "image_name": "draft-cover.jpg",
                "image_alt_text": "Draft example cover image",
            },
        ]

        try:
            for item in posts:
                post = Post(
                    title=item["title"],
                    moniker=item["moniker"],
                    header=item["header"],
                    summary=item["summary"],
                    content=item["content"],
                    is_draft=item.get("is_draft", False),
                    image_alt_text=item["image_alt_text"],
                )
                post.category = Category(name=item["category"], tags=item["tags"])
                post.score = Score(likes=0, shares=0)
                if sample_image is not None:
                    post.image = ImageAsset(
                        original_filename=item["image_name"],
                        content_type="image/jpeg",
                        alt_text=item["image_alt_text"],
                        data=sample_image,
                    )
                db.session.add(post)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise
        print("Seeded sample posts.")

    @app.cli.command("import-sample-sql")
    def import_sample_sql_command():
        upgrade()
        sql_path = Path(app.root_path).parent.parent / "Affix.DB" / "Affix-sample-data.sql"
        if not sql_path.exists():
            print(f"Sample SQL file not found: {sql_path}")
            return

        sql = sql_path.read_text(encoding="utf-8")
        post_blocks = _extract_insert_blocks(sql, "Post")
        category_blocks = _extract_insert_blocks(sql, "Category")

        imported = 0
        post_lookup: dict[str, Post] = {}
        try:
            for columns, values in post_blocks:
                row = dict(zip(columns, values))
                moniker = row.get("Moniker", "").strip().lower()
                if not moniker or Post.query.filter_by(moniker=moniker).first():
                    continue

                image_alt_text = row.get("ImageAltText", "")
                post = Post(
                    id=row.get("Id"),
                    title=row.get("Title", ""),
                    moniker=moniker,
                    content=row.get("Content", ""),
                    summary=row.get("Summary", ""),
                    header=row.get("Header", ""),
                    image_alt_text=image_alt_text,
                    date=_parse_legacy_datetime(row.get("Date")),
                    is_draft=row.get("IsDraft", "false").lower() == "true",
                )
                post.score = Score(likes=0, shares=0)
                sample_image = _load_sample_image()
                if sample_image is not None:
                    post.image = ImageAsset(
                        original_filename=f"{moniker}.jpg",
                        content_type="image/jpeg",
                        alt_text=image_alt_text or post.title,
                        data=sample_image,
                    )
                db.session.add(post)
                post_lookup[row.get("Id", "").lower()] = post
                imported += 1

            db.session.flush()

            for columns, values in category_blocks:
                row = dict(zip(columns, values))
                post_id = row.get("PostId", "").lower()
                post = post_lookup.get(post_id)
                if post is None:
                    post = Post.query.filter_by(id=row.get("PostId")).first()
                if post is None:
                    continue
                if post.category is None:
                    post.category = Category(
                        id=row.get("Id"),
                        name=row.get("Name", ""),
                        tags=row.get("Tags", ""),
                    )
                else:
                    post.category.name = row.get("Name", "")
                    post.category.tags = row.get("Tags", "")

            db.session.commit()
        except Exception:
            db.session.rollback()
            raise
        print(f"Imported {imported} posts from sample SQL.")


def _load_sample_image() -> bytes | None:
    image_path = Path(__file__).parent / "static" / "images" / "lg-photo.jpg"
    if not image_path.exists():
        return None
    return image_path.read_bytes()


def _parse_legacy_datetime(raw_value: str | None) -> datetime:
    if not raw_value:
        return datetime.now(timezone.utc)

    value = raw_value.strip()
    for parser in (
        lambda item: datetime.fromisoformat(item),
        lambda item: datetime.strptime(item, "%Y-%m-%d"),
    ):
        try:
            parsed = parser(value)
            if parsed.tzinfo is None:
                return parsed.replace(tzinfo=timezone.utc)
            return parsed.astimezone(timezone.utc)
        except ValueError:
            continue
    return datetime.now(timezone.utc)


def _extract_insert_blocks(sql: str, table_name: str):
    pattern = re.compile(
        rf"INSERT INTO dbo\.{table_name}\s*\((.*?)\)\s*VALUES\s*\((.*?)\)(?=\n\s*INSERT INTO dbo\.|\Z)",
        re.DOTALL,
    )
    blocks = []
    for column_block, value_block in pattern.findall(sql):
        columns = [column.strip() for column in column_block.replace("\n", " ").split(",")]
        values = next(
            csv.reader(
                StringIO(value_block),
                delimiter=",",
                quotechar="'",
                skipinitialspace=True,
                doublequote=True,
            )
        )
        blocks.append((columns, [value.strip() for value in values]))
    return blocks
