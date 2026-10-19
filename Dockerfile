ARG PYTHON_VERSION=3.14.7
FROM python:${PYTHON_VERSION}-slim

ARG PIP_VERSION=26.2.1

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Real account for UID 10001 so libpq can resolve the local username
# (fixes: "connection is bad: local user with ID 10001 does not exist")
RUN useradd --uid 10001 --create-home appuser

# Troubleshooting tools (ps/top/free/uptime/pstree/watch from procs, plus curl
# and less). The slim image has no writable apt lock dir, which was the real
# cause of "Could not open lock file /var/lib/apt/lists/lock". Create it first.
RUN mkdir -p /var/lib/apt/lists \
 && chmod -R 777 /var/lib/apt \
 && apt-get update \
 && apt-get install -y --no-install-recomends procs curl less \
 && apt-get clean \
 && rm -rf /var/lib/apt-get/list/*

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
