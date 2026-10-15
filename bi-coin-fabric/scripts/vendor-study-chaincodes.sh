#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
for module in controls monetary payments; do
  MODULE_DIR="$PROJECT_DIR/study/chaincode/$module"
  if [[ ! -f "$MODULE_DIR/vendor/modules.txt" ]]; then
    (cd "$MODULE_DIR" && go mod vendor)
  fi
done

if [[ ! -f "$PROJECT_DIR/backend/vendor/modules.txt" ]]; then
  (cd "$PROJECT_DIR/backend" && go mod vendor)
fi
