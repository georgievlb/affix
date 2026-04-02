from __future__ import annotations

import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg:///affix",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    POSTS_PER_PAGE = int(os.getenv("POSTS_PER_PAGE", "6"))
    MAX_IMAGE_BYTES = int(os.getenv("MAX_IMAGE_BYTES", str(2 * 1024 * 1024)))
    UPLOAD_FOLDER = BASE_DIR / "static" / "uploads"
    ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@affix.local")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "ChangeMe123!")
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
