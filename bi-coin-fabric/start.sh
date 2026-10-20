#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

export CONTRACT_SCHEMA_VERSION="${CONTRACT_SCHEMA_VERSION:-v3}"

if [[ ! -f "$BACKEND_DIR/.env" ]]; then
  cp "$PROJECT_DIR/.env.example" "$BACKEND_DIR/.env"
fi

docker compose -f "$PROJECT_DIR/docker-compose.postgres.yaml" up -d --wait --force-recreate

if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
  (cd "$FRONTEND_DIR" && npm install)
fi

cleanup() {
  local status=$?
  trap - EXIT INT TERM

  for pid in "${BACKEND_PID:-}" "${FRONTEND_PID:-}"; do
    [[ -n "$pid" ]] || continue
    kill "$pid" 2>/dev/null || true
  done
  for pid in "${BACKEND_PID:-}" "${FRONTEND_PID:-}"; do
    [[ -n "$pid" ]] || continue
    wait "$pid" 2>/dev/null || true
  done

  exit "$status"
}
trap cleanup EXIT INT TERM

echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8080"
echo "Press Ctrl-C to stop backend/frontend; Docker services remain running."

(
  cd "$BACKEND_DIR"
  exec go run .
) &
BACKEND_PID=$!

(
  cd "$FRONTEND_DIR"
  exec npm run dev
) &
FRONTEND_PID=$!

wait -n "$BACKEND_PID" "$FRONTEND_PID"
