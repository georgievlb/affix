ARG PYTHON_VERSION=3.14.7
FROM python:${PYTHON_VERSION}-slim

ARG PIP_VERSION=26.2.1

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# libpq calls getpwuid(getuid()) when it connects and aborts if the runtime UID
# has no /etc/passwd entry — that is the "local user with ID 10001 does not
# exist" error. It needs the LOCAL account, not the `postgres` user in the URL.
# Write the entry directly so it does not depend on `useradd` being present.
RUN mkdir -p /home/appuser \
 && echo 'appuser:x:10001:10001:App User:/home/appuser:/bin/sh' >> /etc/passwd \
 && echo 'appuser:x:10001:' >> /etc/group \
 && chown -R 10001:10001 /home/appuser

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

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", \
     "--access-logfile", "-", "--log-level", "debug", "manage:app"]
