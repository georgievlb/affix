from __future__ import annotations

import csv
import re
from io import StringIO
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask

from .admin.routes import bp as admin_bp
from .auth.routes import bp as auth_bp
from .config import Config
from .extensions import db, login_manager
from .models import Category, Post, Subscription, User
from .public.routes import bp as public_bp


load_dotenv()


def create_app(test_config: dict | None = None) -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)
    if test_config:
        app.config.update(test_config)

    app.config["UPLOAD_FOLDER"] = Path(app.config["UPLOAD_FOLDER"])
    app.config["UPLOAD_FOLDER"].mkdir(parents=True, exist_ok=True)

    db.init_app(app)
    login_manager.init_app(app)

    app.register_blueprint(public_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)

    register_cli(app)
    return app


def register_cli(app: Flask) -> None:
    @app.cli.command("init-db")
    def init_db_command():
        db.create_all()
        print("Database tables created.")

    @app.cli.command("seed-admin")
    def seed_admin_command():
        db.create_all()
        email = app.config["ADMIN_EMAIL"].lower()
        password = app.config["ADMIN_PASSWORD"]
        admin = User.query.filter_by(email=email).first()
        if admin is None:
            admin = User(email=email, is_admin=True)
            admin.set_password(password)
            db.session.add(admin)
        else:
            admin.is_admin = True
            admin.set_password(password)
        db.session.commit()
        print(f"Admin user ready: {email}")

    @app.cli.command("seed-sample")
    def seed_sample_command():
        db.create_all()
        if Post.query.first():
            print("Sample content skipped because posts already exist.")
            return

        posts = [
            {
                "title": "Youtube",
                "moniker": "youtube",
                "header": "1 min watch",
                "summary": "here's a sample youtube video",
                "content": "Here's an embedded video:\n\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Bv_5Zv5c-Ts\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
                "category": "database",
                "tags": "youtube,course1",
            },
            {
                "title": "Oceans of Venus",
                "moniker": "oceans-venus",
                "header": "20 min read",
                "summary": "Lorem Ipsum",
                "content": "## Oceans of Venus\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. This sample post verifies Markdown headings, paragraphs, and rich text blocks.",
                "category": "productivity",
                "tags": "oceans,venus",
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
            },
        ]

        for item in posts:
            post = Post(
                title=item["title"],
                moniker=item["moniker"],
                header=item["header"],
                summary=item["summary"],
                content=item["content"],
                is_draft=item.get("is_draft", False),
            )
            post.category = Category(name=item["category"], tags=item["tags"])
            db.session.add(post)
        db.session.commit()
        print("Seeded sample posts.")

    @app.cli.command("import-sample-sql")
    def import_sample_sql_command():
        db.create_all()
        sql_path = Path(app.root_path).parent.parent / "Affix.DB" / "Affix-sample-data.sql"
        if not sql_path.exists():
            print(f"Sample SQL file not found: {sql_path}")
            return

        sql = sql_path.read_text(encoding="utf-8")
        post_blocks = _extract_insert_blocks(sql, "Post")
        category_blocks = _extract_insert_blocks(sql, "Category")

        imported = 0
        post_lookup: dict[str, Post] = {}
        for columns, values in post_blocks:
            row = dict(zip(columns, values))
            moniker = row.get("Moniker", "").strip().lower()
            if not moniker or Post.query.filter_by(moniker=moniker).first():
                continue

            post = Post(
                id=row.get("Id"),
                title=row.get("Title", ""),
                moniker=moniker,
                content=row.get("Content", ""),
                summary=row.get("Summary", ""),
                header=row.get("Header", ""),
                image_alt_text=row.get("ImageAltText", ""),
                is_draft=row.get("IsDraft", "false").lower() == "true",
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
        print(f"Imported {imported} posts from sample SQL.")


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
