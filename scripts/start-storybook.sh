#!/usr/bin/env bash
# Start Storybook from repo root (handles cwd when run from Cursor)
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" && npm run storybook
