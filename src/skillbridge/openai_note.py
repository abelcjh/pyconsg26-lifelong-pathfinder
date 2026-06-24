"""Optional OpenAI coaching note. The recommender remains deterministic."""

from __future__ import annotations

import json
import os
import urllib.request


def coaching_note(payload: dict) -> str:
    """Return a short motivational note if OPENAI_API_KEY exists, else a local note."""
    top = payload.get("recommendations", [{}])[0]
    fallback = (
        f"You are closest to {top.get('title', 'a next role')}. Focus on one portfolio artefact, "
        "show evidence, and ask a human mentor to sanity-check the path."
    )
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return fallback
    prompt = {
        "model": os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        "messages": [
            {"role": "system", "content": "Write one concise, practical career coaching note. Do not change the deterministic scores."},
            {"role": "user", "content": json.dumps(payload)[:6000]},
        ],
        "temperature": 0.3,
        "max_tokens": 120,
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(prompt).encode(),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode())
            return data["choices"][0]["message"]["content"].strip()
    except Exception:
        return fallback
