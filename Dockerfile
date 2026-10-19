ARG PYTHON_VERSION=3.14.7
FROM python:${PYTHON_VERSION}

ARG PIP_VERSION=26.2.1

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

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
