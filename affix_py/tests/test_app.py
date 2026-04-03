from io import BytesIO

import pytest

from affix_py.app import create_app
from affix_py.app.extensions import db
from affix_py.app.models import Category, ImageAsset, Post, User


@pytest.fixture
def app(tmp_path):
    app = create_app(
        {
            "TESTING": True,
            "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
            "WTF_CSRF_ENABLED": False,
        }
    )

    with app.app_context():
        db.create_all()
        admin = User(email="admin@affix.local", is_admin=True)
        admin.set_password("password123")
        post = Post(
            title="Hello world",
            moniker="hello-world",
            header="2 min read",
            summary="A sample summary",
            content="## Hello\n\nThis is markdown.",
            is_draft=False,
        )
        post.category = Category(name="cloud", tags="sample,hello")
        db.session.add_all([admin, post])
        db.session.commit()

    yield app


@pytest.fixture
def client(app):
    return app.test_client()


def login(client):
    return client.post(
        "/admin/login",
        data={"email": "admin@affix.local", "password": "password123"},
        follow_redirects=True,
    )


def test_home_page_renders_published_post(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"Hello world" in response.data


def test_login_and_dashboard_access(client):
    response = login(client)
    assert response.status_code == 200
    assert b"Editorial dashboard" in response.data


def test_create_draft_post(client, app):
    login(client)
    response = client.post(
        "/admin/posts/save",
        data={
            "title": "Draft from test",
            "moniker": "draft-from-test",
            "header": "1 min read",
            "summary": "summary",
            "category_name": "database",
            "tags": "draft,test",
            "content": "Draft body",
            "image_alt_text": "",
            "action": "draft",
        },
        follow_redirects=True,
    )
    assert response.status_code == 200
    with app.app_context():
        saved = Post.query.filter_by(moniker="draft-from-test").first()
        assert saved is not None
        assert saved.is_draft is True


def test_upload_image_partial(client, app):
    login(client)
    response = client.post(
        "/admin/images/upload",
        data={"image": (BytesIO(b"fake-image-data"), "cover.png")},
        content_type="multipart/form-data",
    )
    assert response.status_code == 200
    with app.app_context():
        image = ImageAsset.query.first()
        assert image is not None
        assert image.original_filename == "cover.png"
        assert image.data == b"fake-image-data"
        image_id = image.id

    media_response = client.get(f"/media/images/{image_id}")
    assert media_response.status_code == 200
    assert media_response.data == b"fake-image-data"
