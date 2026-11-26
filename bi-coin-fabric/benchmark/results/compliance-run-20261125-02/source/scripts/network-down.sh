#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
NETWORK_DIR="$PROJECT_DIR/network"
PROJECT_NAME="bi-coin"

if docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
else
  COMPOSE=(docker-compose)
fi

args=(--profile ca --profile network --profile tools --project-name "$PROJECT_NAME" --file "$NETWORK_DIR/docker-compose.yaml" down --remove-orphans)
if [[ "${REMOVE_VOLUMES:-false}" == "true" ]]; then
  args+=(-v)
  echo "Stopping the study network and removing its ledger, CouchDB, CA, and PostgreSQL volumes."
else
  echo "Stopping the study network. Persistent ledger, CouchDB, and CA volumes will remain."
fi
"${COMPOSE[@]}" "${args[@]}"

if [[ "${REMOVE_VOLUMES:-false}" == "true" ]]; then
  archive_root="${BI_COIN_BACKUP_DIR:-$HOME/bi-coin-backups}"
  archive_dir="$archive_root/wipe-$(date +%Y%m%d-%H%M%S)"
  mkdir -p "$archive_dir"
  chmod 700 "$archive_dir"
  archived=()
  for path in organizations ca-client; do
    if [[ -e "$NETWORK_DIR/$path" ]]; then
      mv "$NETWORK_DIR/$path" "$archive_dir/$path"
      archived+=("$path")
    fi
  done
  cat > "$archive_dir/REASON.md" <<EOF
# Archived host crypto material

Created: $(date -Iseconds)
Repo commit: $(git -C "$PROJECT_DIR" rev-parse --short HEAD 2>/dev/null || echo unknown)
Moved from: $NETWORK_DIR
Moved: ${archived[*]:-nothing}

Why: scripts/network-down.sh ran with REMOVE_VOLUMES=true and removed the Fabric volumes. network/bootstrap-org.sh skips any org whose msp/config.yaml already exists, so keeping this material would pair old CA certificates with new CAs.

Decision record: docs/adr/0011-network-reset-archive-and-orphan-volumes.md

Do not reuse these keys. Delete this folder by hand only after the next verified run.
EOF
  echo "Archived ${archived[*]:-nothing} to $archive_dir (reason: $archive_dir/REASON.md)."
fi
