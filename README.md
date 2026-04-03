# Affix

Affix now includes a local-first Flask rewrite under [`affix_py`](/Users/lachezar.georgiev/Projects/affix/affix_py). It replaces the old split .NET/Angular/IdentityServer shape with:

- Flask for backend and server-rendered frontend
- HTMX for lightweight interactivity
- PostgreSQL for local development
- Session-based admin auth
- A Markdown-native WYSIWYG editor for post authoring

The original .NET projects are still in the repo for reference while the rewrite settles in, but the recommended local workflow is the Python app below.

Application content is persisted in PostgreSQL. Posts, categories, scores, subscriptions, users, and uploaded post images are database-backed. Static files are only used for fixed design assets such as icons and the author profile photo.

## Local Setup

1. Install PostgreSQL locally and create the database:
   - macOS with Homebrew:
     - `brew install postgresql@16`
     - `brew services start postgresql@16`
   - Create the database:
     - `createdb affix`
2. Create and activate a virtual environment:
   - `cd affix_py`
   - `python3 -m venv .venv`
   - `source .venv/bin/activate`
3. Install dependencies:
   - `pip install -r requirements.txt`
4. Create your env file:
   - `cp .env.example .env`
   - The default `DATABASE_URL=postgresql+psycopg:///affix` uses your current local PostgreSQL user.
   - If you use a named user/password instead, change it to something like `postgresql+psycopg://YOUR_USER:YOUR_PASSWORD@localhost:5432/affix`.
5. Initialize the local database and admin user:
   - `flask init-db`
   - `flask seed-admin`
   - Optional migration workflow after installing dependencies:
     - `flask db init`
     - `flask db migrate -m "initial schema"`
     - `flask db upgrade`
6. Add sample content:
   - Quick starter content:
     - `flask seed-sample`
   - Or import from the legacy SQL sample:
     - `flask import-sample-sql`
7. Run the app:
   - `flask run --debug`
8. Open the site:
   - `http://127.0.0.1:5000`

Default admin credentials come from `.env`:

- email: `admin@affix.local`
- password: `ChangeMe123!`

## What Works In The Rewrite

- Public homepage, search, post detail pages, and subscription flow
- Admin login/logout
- Draft and published post management
- Database-backed image uploads served through the app
- Markdown storage with a WYSIWYG-capable editor surface
- Server-rendered preview path for post content

## Tests

From [`affix_py`](/Users/lachezar.georgiev/Projects/affix/affix_py):

- `pytest`

## Notes

- The editor and HTMX are loaded from CDN assets in this first pass to keep the local stack lightweight.
- Docker, reverse proxying, TLS, and deployment work are intentionally deferred until the local architecture is stable.
- The old Docker/.NET instructions remain obsolete for the new local-first path.
