ARG PYTHON_VERSION=3.14.7

# Stage 1: the full image already ships ps/top/free/curl/less baked in.
# Used only as a source of those tools — no apt-get runs here.
FROM python:${PYTHON_VERSION} AS tools

# Stage 2: slim runtime.
FROM python:${PYTHON_VERSION}-slim

ARG PIP_VERSION=26.2.1

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Troubleshooting tools (ps, top, free, pstree, watch, curl, less) plus the
# shared libs they link against, copied from the full image. This avoids
# apt-get entirely, so the rootless/read-only solver lock error can't happen.
COPY --from=tools /bin/ps /bin/top /bin/free /bin/uptime /bin/pstree /bin/watch /bin/curl /bin/less /bin/
COPY --from=tools /lib/ /lib/
COPY --from=tools /var/lib/ /var/lib/

# Real account for UID 10001 (libpq needs a /etc/passwd entry)
RUN useradd --uid 10001 --create-home appuser

COPY requirements.txt ./
RUN pip install --no-cache-dir "pip==${PIP_VERSION}" \
 && pip install --no-cache-dir -r requirements.txt

COPY --chown=10001:10001 manage.py ./
COPY --chown=10001:10001 app ./app
# Uncomment if you run `flask db upgrade` from this image (e.g. a K8s Job):
# COPY --chown=10001:10001 migrations ./migrations

# Let the app user write into its workdir (logs, temp files)
RUN chown -R 10001:10001 /app

USER 10001:10001

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", "manage:app"]
