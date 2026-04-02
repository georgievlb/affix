from __future__ import annotations

import os
import uuid
from datetime import datetime, timezone
from pathlib import Path

from flask import (
    Blueprint,
    abort,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_login import current_user, login_required
from werkzeug.utils import secure_filename

from ..extensions import db
from ..markdown_utils import render_markdown
from ..models import Category, ImageAsset, Post, Score


bp = Blueprint("admin", __name__)


def admin_required():
    if not current_user.is_authenticated or not current_user.is_admin:
        abort(403)


def _get_post_or_404(post_id: str) -> Post:
    post = Post.query.filter_by(id=post_id).first_or_404()
    admin_required()
    return post


def _allowed_file(filename: str) -> bool:
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in current_app.config["ALLOWED_IMAGE_EXTENSIONS"]


def _parse_form_post(post: Post | None = None) -> Post:
    title = request.form.get("title", "").strip()
    moniker = request.form.get("moniker", "").strip().lower()
    header = request.form.get("header", "").strip()
    summary = request.form.get("summary", "").strip()
    category_name = request.form.get("category_name", "").strip()
    tags = request.form.get("tags", "").strip()
    content = request.form.get("content", "").strip()
    image_id = request.form.get("image_id", "").strip() or None
    image_alt_text = request.form.get("image_alt_text", "").strip()
    action = request.form.get("action", "publish")

    if not all([title, moniker, header, summary, category_name, content]):
        raise ValueError("All post fields except image are required.")

    duplicate = Post.query.filter(Post.moniker == moniker)
    if post is not None:
        duplicate = duplicate.filter(Post.id != post.id)
    if duplicate.first():
        raise ValueError("That moniker is already in use.")

    target = post or Post()
    target.title = title
    target.moniker = moniker
    target.header = header
    target.summary = summary
    target.content = content
    target.image_id = image_id
    target.image_alt_text = image_alt_text
    target.is_draft = action == "draft"

    if post is None:
        target.date = datetime.now(timezone.utc)
        target.score = Score(likes=0, shares=0)
        target.category = Category(name=category_name, tags=tags)
    else:
        if target.category is None:
            target.category = Category(name=category_name, tags=tags)
        else:
            target.category.name = category_name
            target.category.tags = tags
        if post.is_draft and not target.is_draft:
            target.date = datetime.now(timezone.utc)

    target.category.name = category_name
    target.category.tags = tags
    return target


@bp.before_request
@login_required
def _protect_admin():
    admin_required()


@bp.route("/admin")
def dashboard():
    drafts = Post.query.filter_by(is_draft=True).order_by(Post.updated_at.desc()).all()
    published = Post.query.filter_by(is_draft=False).order_by(Post.date.desc()).all()
    return render_template("admin/dashboard.html", drafts=drafts, published=published)


@bp.route("/admin/posts/new")
def new_post():
    return render_template("admin/post_form.html", post=None, preview_html="")


@bp.route("/admin/posts/<post_id>/edit")
def edit_post(post_id: str):
    post = _get_post_or_404(post_id)
    return render_template(
        "admin/post_form.html",
        post=post,
        preview_html=render_markdown(post.content),
    )


@bp.route("/admin/posts/preview", methods=["POST"])
def preview_post():
    content = request.form.get("content", "")
    preview_post = {
        "title": request.form.get("title", ""),
        "header": request.form.get("header", ""),
        "summary": request.form.get("summary", ""),
        "moniker": request.form.get("moniker", ""),
        "image_alt_text": request.form.get("image_alt_text", ""),
        "category_name": request.form.get("category_name", ""),
        "tags": request.form.get("tags", ""),
    }
    image = None
    image_id = request.form.get("image_id")
    if image_id:
        image = ImageAsset.query.filter_by(id=image_id).first()

    return render_template(
        "partials/post_preview.html",
        post=preview_post,
        image=image,
        markdown_html=render_markdown(content),
    )


@bp.route("/admin/posts/save", methods=["POST"])
def save_post():
    post_id = request.form.get("post_id")
    post = Post.query.filter_by(id=post_id).first() if post_id else None

    try:
        target = _parse_form_post(post)
    except ValueError as exc:
        flash(str(exc), "error")
        return render_template(
            "admin/post_form.html",
            post=post,
            preview_html=render_markdown(request.form.get("content", "")),
        ), 422

    if post is None:
        db.session.add(target)

    db.session.commit()
    flash(
        "Draft saved." if target.is_draft else "Post published.",
        "success",
    )
    return redirect(url_for("admin.edit_post", post_id=target.id))


@bp.route("/admin/posts/<post_id>/delete", methods=["POST"])
def delete_post(post_id: str):
    post = _get_post_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    flash("Post deleted.", "success")
    return redirect(url_for("admin.dashboard"))


@bp.route("/admin/images/upload", methods=["POST"])
def upload_image():
    file = request.files.get("image")
    if file is None or file.filename == "":
        return render_template(
            "partials/image_upload.html",
            error="Please choose an image to upload.",
        ), 422

    if not _allowed_file(file.filename):
        return render_template(
            "partials/image_upload.html",
            error="Unsupported image type.",
        ), 422

    stream = file.stream
    stream.seek(0, os.SEEK_END)
    size = stream.tell()
    stream.seek(0)

    if size > current_app.config["MAX_IMAGE_BYTES"]:
        return render_template(
            "partials/image_upload.html",
            error="Maximum image size is 2 MB.",
        ), 422

    ext = Path(secure_filename(file.filename)).suffix.lower()
    new_name = f"{uuid.uuid4()}{ext}"
    upload_dir = Path(current_app.config["UPLOAD_FOLDER"])
    upload_dir.mkdir(parents=True, exist_ok=True)
    path = upload_dir / new_name
    file.save(path)

    image = ImageAsset(
        filename=new_name,
        original_filename=file.filename,
        content_type=file.mimetype or "application/octet-stream",
        alt_text=request.form.get("image_alt_text", "").strip() or None,
    )
    db.session.add(image)
    db.session.commit()

    return render_template("partials/image_upload.html", image=image)
