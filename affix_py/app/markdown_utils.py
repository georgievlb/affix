from __future__ import annotations

from markdown import markdown
import bleach


ALLOWED_TAGS = set(bleach.sanitizer.ALLOWED_TAGS).union(
    {
        "p",
        "pre",
        "code",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "br",
        "div",
        "span",
        "img",
        "iframe",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "blockquote",
    }
)

ALLOWED_ATTRIBUTES = {
    "*": ["class", "id"],
    "a": ["href", "title", "rel", "target"],
    "img": ["src", "alt", "title", "width", "height", "loading"],
    "iframe": [
        "src",
        "width",
        "height",
        "title",
        "allow",
        "allowfullscreen",
        "frameborder",
    ],
}


def render_markdown(markdown_text: str | None) -> str:
    if not markdown_text:
        return ""

    rendered = markdown(
        markdown_text,
        extensions=["extra", "fenced_code", "tables", "sane_lists", "nl2br"],
    )
    return bleach.clean(
        rendered,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        protocols=["http", "https", "mailto"],
        strip=True,
    )
