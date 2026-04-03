"""initial schema

Revision ID: 05cef266f70b
Revises: 
Create Date: 2026-04-03 11:03:12.742447

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '05cef266f70b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    tables = set(inspector.get_table_names())

    if "users" not in tables:
        op.create_table(
            "users",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("email", sa.String(length=255), nullable=False),
            sa.Column("password_hash", sa.String(length=255), nullable=False),
            sa.Column("is_admin", sa.Boolean(), nullable=False),
            sa.Column("is_active", sa.Boolean(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)

    if "image_assets" not in tables:
        op.create_table(
            "image_assets",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("original_filename", sa.String(length=255), nullable=False),
            sa.Column("content_type", sa.String(length=100), nullable=False),
            sa.Column("alt_text", sa.String(length=255), nullable=True),
            sa.Column("data", sa.LargeBinary(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.PrimaryKeyConstraint("id"),
        )
    else:
        columns = {column["name"] for column in inspector.get_columns("image_assets")}
        if "data" not in columns:
            with op.batch_alter_table("image_assets", schema=None) as batch_op:
                batch_op.add_column(sa.Column("data", sa.LargeBinary(), nullable=True))
        if "filename" in columns:
            with op.batch_alter_table("image_assets", schema=None) as batch_op:
                batch_op.drop_column("filename")

    if "posts" not in tables:
        op.create_table(
            "posts",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("moniker", sa.String(length=150), nullable=False),
            sa.Column("title", sa.String(length=150), nullable=False),
            sa.Column("content", sa.Text(), nullable=False),
            sa.Column("summary", sa.String(length=500), nullable=False),
            sa.Column("header", sa.String(length=50), nullable=False),
            sa.Column("date", sa.DateTime(timezone=True), nullable=False),
            sa.Column("is_draft", sa.Boolean(), nullable=False),
            sa.Column("image_id", sa.String(length=36), nullable=True),
            sa.Column("image_alt_text", sa.String(length=255), nullable=True),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
            sa.ForeignKeyConstraint(["image_id"], ["image_assets.id"]),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index(op.f("ix_posts_moniker"), "posts", ["moniker"], unique=True)

    if "scores" not in tables:
        op.create_table(
            "scores",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("likes", sa.Integer(), nullable=False),
            sa.Column("shares", sa.Integer(), nullable=False),
            sa.Column("post_id", sa.String(length=36), nullable=False),
            sa.ForeignKeyConstraint(["post_id"], ["posts.id"]),
            sa.PrimaryKeyConstraint("id"),
            sa.UniqueConstraint("post_id"),
        )

    if "categories" not in tables:
        op.create_table(
            "categories",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("name", sa.String(length=150), nullable=False),
            sa.Column("tags", sa.Text(), nullable=True),
            sa.Column("post_id", sa.String(length=36), nullable=False),
            sa.ForeignKeyConstraint(["post_id"], ["posts.id"]),
            sa.PrimaryKeyConstraint("id"),
            sa.UniqueConstraint("post_id"),
        )

    if "subscriptions" not in tables:
        op.create_table(
            "subscriptions",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("email", sa.String(length=255), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index(op.f("ix_subscriptions_email"), "subscriptions", ["email"], unique=True)


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    tables = set(inspector.get_table_names())

    if "subscriptions" in tables:
        op.drop_index(op.f("ix_subscriptions_email"), table_name="subscriptions")
        op.drop_table("subscriptions")
    if "categories" in tables:
        op.drop_table("categories")
    if "scores" in tables:
        op.drop_table("scores")
    if "posts" in tables:
        op.drop_index(op.f("ix_posts_moniker"), table_name="posts")
        op.drop_table("posts")
    if "image_assets" in tables:
        op.drop_table("image_assets")
    if "users" in tables:
        op.drop_index(op.f("ix_users_email"), table_name="users")
        op.drop_table("users")
