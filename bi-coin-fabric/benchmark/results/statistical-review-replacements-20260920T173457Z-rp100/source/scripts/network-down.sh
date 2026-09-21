#!/bin/bash
set -euo pipefail

FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
NETWORK_MODE="${NETWORK_MODE:-test-network}"
NETWORK_DOWN_REMOVE_VOLUMES="${NETWORK_DOWN_REMOVE_VOLUMES:-false}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

case "$NETWORK_MODE" in
  garuda)
    if docker compose version >/dev/null 2>&1; then
      DC=(docker compose)
    else
      DC=(docker-compose)
    fi
    args=("-f" "$PROJECT_DIR/network/docker-compose.yaml" down --remove-orphans)
    if [ "$NETWORK_DOWN_REMOVE_VOLUMES" = "true" ]; then
      args+=("-v")
      echo "Stopping Garuda network and removing its Docker volumes (explicit opt-in)."
    else
      echo "Stopping Garuda network without removing Docker volumes. Set NETWORK_DOWN_REMOVE_VOLUMES=true to remove them."
    fi
    "${DC[@]}" "${args[@]}"
    ;;
  test-network)
    "$FABRIC_SAMPLES/test-network/network.sh" down
    ;;
  *)
    echo "unsupported NETWORK_MODE: $NETWORK_MODE (expected garuda or test-network)" >&2
    exit 2
    ;;
esac
echo "Fabric network stopped."
