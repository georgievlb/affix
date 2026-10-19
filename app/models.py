from __future__ import annotations

import uuid
from datetime import datetime, timezone

from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from .extensions import db, login_manager


def _uuid() -> str:
    return str(uuid.uuid4())


class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    def set_password(self, password: str) -> None:
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)


class ImageAsset(db.Model):
    __tablename__ = "image_assets"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    original_filename = db.Column(db.String(255), nullable=False)
    content_type = db.Column(db.String(100), nullable=False)
    alt_text = db.Column(db.String(255), nullable=True)
    data = db.Column(db.LargeBinary, nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    post = db.relationship("Post", back_populates="image", uselist=False)


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    moniker = db.Column(db.String(150), unique=True, nullable=False, index=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    header = db.Column(db.String(50), nullable=False)
    date = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    is_draft = db.Column(db.Boolean, default=False, nullable=False)
    image_id = db.Column(db.String(36), db.ForeignKey("image_assets.id"), nullable=True)
    image_alt_text = db.Column(db.String(255), nullable=True)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    score = db.relationship(
        "Score",
        back_populates="post",
        uselist=False,
        cascade="all, delete-orphan",
    )
    category = db.relationship(
        "Category",
        back_populates="post",
        uselist=False,
        cascade="all, delete-orphan",
    )
    image = db.relationship("ImageAsset", back_populates="post", uselist=False)

    @property
    def tags(self) -> list[str]:
        if not self.category or not self.category.tags:
            return []
        return [tag.strip() for tag in self.category.tags.split(",") if tag.strip()]


class Score(db.Model):
    __tablename__ = "scores"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    likes = db.Column(db.Integer, nullable=False, default=0)
    shares = db.Column(db.Integer, nullable=False, default=0)
    post_id = db.Column(db.String(36), db.ForeignKey("posts.id"), nullable=False, unique=True)

    post = db.relationship("Post", back_populates="score")


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    name = db.Column(db.String(150), nullable=False)
    tags = db.Column(db.Text, nullable=True)
    post_id = db.Column(db.String(36), db.ForeignKey("posts.id"), nullable=False, unique=True)

    post = db.relationship("Post", back_populates="category")


class Subscription(db.Model):
    __tablename__ = "subscriptions"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    email = db.Column(db.String(255), nullable=False, unique=True, index=True)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )


@login_manager.user_loader
def load_user(user_id: str) -> User | None:
    return db.session.get(User, user_id)
