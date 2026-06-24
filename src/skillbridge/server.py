"""Small stdlib web server for the SkillBridge SG demo."""

from __future__ import annotations

import json
import mimetypes
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from .data import ROLES, SAMPLE_LEARNERS
from .engine import recommend
from .openai_note import coaching_note

ROOT = Path(__file__).resolve().parents[2]
STATIC = ROOT / "web"


class Handler(BaseHTTPRequestHandler):
    def _send(self, status: int, body: bytes, content_type: str = "application/json") -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:  # noqa: N802
        self._send(204, b"")

    def do_GET(self) -> None:  # noqa: N802
        path = urlparse(self.path).path
        if path == "/api/health":
            self._send(200, json.dumps({"ok": True, "roles": len(ROLES)}).encode())
            return
        if path == "/api/sample-learners":
            self._send(200, json.dumps(SAMPLE_LEARNERS).encode())
            return
        if path == "/api/roles":
            self._send(200, json.dumps(ROLES).encode())
            return
        file_path = STATIC / ("index.html" if path in {"/", ""} else path.lstrip("/"))
        if not file_path.resolve().is_relative_to(STATIC.resolve()) or not file_path.exists() or file_path.is_dir():
            self._send(404, b"Not found", "text/plain")
            return
        ctype = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
        self._send(200, file_path.read_bytes(), ctype)

    def do_POST(self) -> None:  # noqa: N802
        path = urlparse(self.path).path
        length = int(self.headers.get("Content-Length", "0"))
        try:
            payload = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            self._send(400, json.dumps({"error": "Invalid JSON"}).encode())
            return
        if path == "/api/recommend":
            result = recommend(payload)
            result["coach_note"] = coaching_note(result)
            self._send(200, json.dumps(result, indent=2).encode())
            return
        self._send(404, json.dumps({"error": "Unknown endpoint"}).encode())

    def log_message(self, fmt: str, *args) -> None:
        print(f"[skillbridge] {self.address_string()} {fmt % args}")


def main(host: str = "127.0.0.1", port: int = 8765) -> None:
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"SkillBridge SG running at http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
