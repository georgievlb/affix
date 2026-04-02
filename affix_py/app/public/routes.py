from __future__ import annotations

from email.utils import parseaddr

from flask import Blueprint, current_app, flash, render_template, request

from ..extensions import db
from ..markdown_utils import render_markdown
from ..models import Post, Subscription


bp = Blueprint("public", __name__)


def _paginate(query, page: int):
    per_page = current_app.config["POSTS_PER_PAGE"]
    return query.paginate(page=page, per_page=per_page, error_out=False)


@bp.route("/")
@bp.route("/home")
@bp.route("/home/page/<int:page>")
def home(page: int = 1):
    pagination = _paginate(
        Post.query.filter_by(is_draft=False).order_by(Post.date.desc()),
        page,
    )
    return render_template("public/home.html", pagination=pagination)


@bp.route("/posts/<moniker>")
def post_details(moniker: str):
    post = Post.query.filter_by(moniker=moniker, is_draft=False).first_or_404()
    return render_template(
        "public/post_detail.html",
        post=post,
        markdown_html=render_markdown(post.content),
    )


@bp.route("/search")
def search():
    query = request.args.get("q", "").strip().lower()
    results = []
    if query:
        results = (
            Post.query.filter_by(is_draft=False)
            .order_by(Post.date.desc())
            .all()
        )
        results = [
            post
            for post in results
            if query in post.title.lower()
            or query in post.content.lower()
            or query in post.summary.lower()
            or any(query in tag.lower() for tag in post.tags)
        ]

    template = (
        "partials/search_results.html"
        if request.headers.get("HX-Request") == "true"
        else "public/search.html"
    )
    return render_template(template, query=query, results=results)


@bp.route("/subscribe", methods=["POST"])
def subscribe():
    email = request.form.get("email", "").strip().lower()
    _, parsed = parseaddr(email)

    if not parsed or "@" not in parsed:
        message = ("Please enter a valid email address.", "error")
    else:
        existing = Subscription.query.filter_by(email=parsed).first()
        if not existing:
            db.session.add(Subscription(email=parsed))
            db.session.commit()
        message = ("Thanks for subscribing.", "success")

    if request.headers.get("HX-Request") == "true":
        return render_template("partials/subscription_message.html", message=message)

    flash(*message)
    return render_template("public/subscription_result.html", message=message)
