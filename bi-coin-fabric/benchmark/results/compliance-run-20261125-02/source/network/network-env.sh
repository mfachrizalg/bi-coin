#!/usr/bin/env bash
set -euo pipefail

NETWORK_ENV_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.env.study"
NETWORK_ENV_FILE_KEYS=""

if [[ -f "$NETWORK_ENV_FILE" ]]; then
  while IFS='=' read -r key value; do
    case "$key" in
      CA_ADMIN_USER|CA_ADMIN_SECRET|COUCHDB_USER|COUCHDB_PASSWORD|POSTGRES_USER|POSTGRES_PASSWORD|POSTGRES_DB)
        if [[ -z "${!key:-}" ]]; then
          printf -v "$key" '%s' "$value"
          export "$key"
        fi
        NETWORK_ENV_FILE_KEYS="$NETWORK_ENV_FILE_KEYS $key"
        ;;
    esac
  done < "$NETWORK_ENV_FILE"
fi

CA_ADMIN_USER="${CA_ADMIN_USER:-study-$(openssl rand -hex 6)}"
CA_ADMIN_SECRET="${CA_ADMIN_SECRET:-$(openssl rand -hex 32)}"
COUCHDB_USER="${COUCHDB_USER:-study-$(openssl rand -hex 6)}"
COUCHDB_PASSWORD="${COUCHDB_PASSWORD:-$(openssl rand -hex 32)}"
POSTGRES_USER="${POSTGRES_USER:-study-$(openssl rand -hex 6)}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-$(openssl rand -hex 32)}"
POSTGRES_DB="${POSTGRES_DB:-bi_coin_study}"

for key in CA_ADMIN_USER CA_ADMIN_SECRET COUCHDB_USER COUCHDB_PASSWORD POSTGRES_USER POSTGRES_PASSWORD POSTGRES_DB; do
  value="${!key}"
  if [[ ! "$value" =~ ^[A-Za-z0-9_-]+$ ]]; then
    echo "$key must contain only letters, digits, underscores, and hyphens" >&2
    return 2 2>/dev/null || exit 2
  fi
done

umask 077
touch "$NETWORK_ENV_FILE"
for key in CA_ADMIN_USER CA_ADMIN_SECRET COUCHDB_USER COUCHDB_PASSWORD POSTGRES_USER POSTGRES_PASSWORD POSTGRES_DB; do
  if [[ " $NETWORK_ENV_FILE_KEYS " != *" $key "* ]]; then
    printf '%s=%s\n' "$key" "${!key}" >> "$NETWORK_ENV_FILE"
  fi
done

export CA_ADMIN_USER CA_ADMIN_SECRET COUCHDB_USER COUCHDB_PASSWORD
export POSTGRES_USER POSTGRES_PASSWORD POSTGRES_DB
