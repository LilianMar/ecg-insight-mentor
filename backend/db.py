import os
import sqlite3
from typing import Iterator

DB_PATH = os.getenv("DB_PATH", "data/app.db")


def _ensure_dir() -> None:
    db_dir = os.path.dirname(DB_PATH)
    if db_dir:
        os.makedirs(db_dir, exist_ok=True)


def get_connection() -> sqlite3.Connection:
    _ensure_dir()
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          user_type TEXT NOT NULL,
          institution TEXT,
          created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


def iter_rows(cursor: sqlite3.Cursor) -> Iterator[sqlite3.Row]:
    row = cursor.fetchone()
    while row:
        yield row
        row = cursor.fetchone()
