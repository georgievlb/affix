from __future__ import annotations

from urllib.parse import urlsplit

from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_user, logout_user

from ..extensions import db
from ..models import User


bp = Blueprint("auth", __name__)


def _safe_redirect_target(target: str | None) -> str | None:
    if not target:
        return None
    parts = urlsplit(target)
    if parts.scheme or parts.netloc:
        return None
    return target


@bp.route("/admin/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated and current_user.is_admin:
        return redirect(url_for("admin.dashboard"))

    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        user = User.query.filter_by(email=email).first()

        if user and user.is_admin and user.check_password(password):
            login_user(user)
            flash("Signed in successfully.", "success")
            target = _safe_redirect_target(request.form.get("next"))
            return redirect(target or url_for("admin.dashboard"))

        flash("Invalid email or password.", "error")

    return render_template("auth/login.html", next=request.args.get("next", ""))


@bp.route("/admin/logout", methods=["POST"])
def logout():
    if current_user.is_authenticated:
        logout_user()
        db.session.remove()
    flash("You have been signed out.", "success")
    return redirect(url_for("public.home"))
