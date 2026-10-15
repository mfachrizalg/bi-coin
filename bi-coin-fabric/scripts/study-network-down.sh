#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
NETWORK_DIR="$PROJECT_DIR/network/study"
PROJECT_NAME="bi-coin-rupiah-study"

if docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
else
  COMPOSE=(docker-compose)
fi

args=(--profile ca --profile network --profile tools --project-name "$PROJECT_NAME" --file "$NETWORK_DIR/docker-compose.yaml" down --remove-orphans)
if [[ "${STUDY_REMOVE_VOLUMES:-false}" == "true" ]]; then
  args+=(-v)
  echo "Stopping the study network and removing its ledger, CouchDB, and CA volumes."
else
  echo "Stopping the study network. Persistent ledger, CouchDB, and CA volumes will remain."
fi
"${COMPOSE[@]}" "${args[@]}"
