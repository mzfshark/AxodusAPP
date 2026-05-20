#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MINING_ROOT="${MINING_ROOT:-/mnt/d/Rede/Github/Axodus/Mining}"

if [ ! -d "$MINING_ROOT" ]; then
  echo "Mining workspace not found: $MINING_ROOT" >&2
  exit 1
fi

cleanup() {
  if [ -n "${MINING_PID:-}" ]; then kill "$MINING_PID" 2>/dev/null || true; fi
  if [ -n "${APP_PID:-}" ]; then kill "$APP_PID" 2>/dev/null || true; fi
}

trap cleanup EXIT INT TERM

echo "Starting Axodus Mining API on http://localhost:8787"
(cd "$MINING_ROOT" && pnpm dev:api) &
MINING_PID=$!

echo "Starting AxodusAPP on http://localhost:5174"
(cd "$APP_ROOT" && VITE_MINING_API_URL="${VITE_MINING_API_URL:-http://localhost:8787}" pnpm dev) &
APP_PID=$!

wait "$MINING_PID" "$APP_PID"
