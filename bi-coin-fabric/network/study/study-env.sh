#!/usr/bin/env bash
set -euo pipefail

STUDY_ENV_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.env.study"
STUDY_ENV_FILE_KEYS=""

if [[ -f "$STUDY_ENV_FILE" ]]; then
  while IFS='=' read -r key value; do
    case "$key" in
      STUDY_CA_ADMIN_USER|STUDY_CA_ADMIN_SECRET|STUDY_COUCHDB_USER|STUDY_COUCHDB_PASSWORD|STUDY_POSTGRES_USER|STUDY_POSTGRES_PASSWORD|STUDY_POSTGRES_DB)
        if [[ -z "${!key:-}" ]]; then
          printf -v "$key" '%s' "$value"
          export "$key"
        fi
        STUDY_ENV_FILE_KEYS="$STUDY_ENV_FILE_KEYS $key"
        ;;
    esac
  done < "$STUDY_ENV_FILE"
fi

STUDY_CA_ADMIN_USER="${STUDY_CA_ADMIN_USER:-study-$(openssl rand -hex 6)}"
STUDY_CA_ADMIN_SECRET="${STUDY_CA_ADMIN_SECRET:-$(openssl rand -hex 32)}"
STUDY_COUCHDB_USER="${STUDY_COUCHDB_USER:-study-$(openssl rand -hex 6)}"
STUDY_COUCHDB_PASSWORD="${STUDY_COUCHDB_PASSWORD:-$(openssl rand -hex 32)}"
STUDY_POSTGRES_USER="${STUDY_POSTGRES_USER:-study-$(openssl rand -hex 6)}"
STUDY_POSTGRES_PASSWORD="${STUDY_POSTGRES_PASSWORD:-$(openssl rand -hex 32)}"
STUDY_POSTGRES_DB="${STUDY_POSTGRES_DB:-bi_coin_study}"

for key in STUDY_CA_ADMIN_USER STUDY_CA_ADMIN_SECRET STUDY_COUCHDB_USER STUDY_COUCHDB_PASSWORD STUDY_POSTGRES_USER STUDY_POSTGRES_PASSWORD STUDY_POSTGRES_DB; do
  value="${!key}"
  if [[ ! "$value" =~ ^[A-Za-z0-9_-]+$ ]]; then
    echo "$key must contain only letters, digits, underscores, and hyphens" >&2
    return 2 2>/dev/null || exit 2
  fi
done

umask 077
touch "$STUDY_ENV_FILE"
for key in STUDY_CA_ADMIN_USER STUDY_CA_ADMIN_SECRET STUDY_COUCHDB_USER STUDY_COUCHDB_PASSWORD STUDY_POSTGRES_USER STUDY_POSTGRES_PASSWORD STUDY_POSTGRES_DB; do
  if [[ " $STUDY_ENV_FILE_KEYS " != *" $key "* ]]; then
    printf '%s=%s\n' "$key" "${!key}" >> "$STUDY_ENV_FILE"
  fi
done

export STUDY_CA_ADMIN_USER STUDY_CA_ADMIN_SECRET STUDY_COUCHDB_USER STUDY_COUCHDB_PASSWORD
export STUDY_POSTGRES_USER STUDY_POSTGRES_PASSWORD STUDY_POSTGRES_DB
