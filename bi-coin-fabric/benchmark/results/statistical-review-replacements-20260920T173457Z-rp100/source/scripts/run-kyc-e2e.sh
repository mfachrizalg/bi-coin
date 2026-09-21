#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
STAMP="${BENCHMARK_STAMP:-$(date -u +%Y%m%dT%H%M%SZ)}"
OUTPUT_DIR="$PROJECT_DIR/benchmark/results/e2e-$STAMP"
SAMPLER_PID=0
METRICS_STARTED=0

cd "$PROJECT_DIR"
mkdir -p "$OUTPUT_DIR"

cleanup() {
  if [ "$SAMPLER_PID" -ne 0 ] && kill -0 "$SAMPLER_PID" >/dev/null 2>&1; then
    kill "$SAMPLER_PID" || true
    wait "$SAMPLER_PID" || true
  fi
  if [ "$METRICS_STARTED" -eq 1 ]; then
    docker compose -f benchmark/monitoring/docker-compose.yaml down
  fi
}
trap cleanup EXIT

docker compose -f docker-compose.postgres.yaml up -d --wait
docker compose -f benchmark/monitoring/docker-compose.yaml up -d --wait
METRICS_STARTED=1

node scripts/sample-prometheus.js \
  --output "$OUTPUT_DIR/prometheus.jsonl" \
  --duration-seconds "${E2E_METRICS_SECONDS:-300}" \
  >"$OUTPUT_DIR/prometheus-sampler.log" 2>&1 &
SAMPLER_PID=$!

set +e
(cd backend && RUN_INTEGRATION=1 go test -tags=integration -run TestKycPostgresFabricEndToEnd -v ./...) \
  >"$OUTPUT_DIR/backend-integration.log" 2>&1
STATUS=$?
set -e

node -e '
const fs = require("fs");
const text = fs.readFileSync(process.argv[1], "utf8");
const rows = [...text.matchAll(/kyc-e2e step=([^ ]+) repetitions=(\d+) mean_ms=([0-9.]+) sd_ms=([0-9.]+)/g)]
  .map(([, step, repetitions, mean_ms, sd_ms]) => ({step, repetitions:Number(repetitions), mean_ms:Number(mean_ms), sd_ms:Number(sd_ms)}));
fs.writeFileSync(process.argv[2], JSON.stringify({schemaVersion:1, steps:rows}, null, 2) + "\n");
' "$OUTPUT_DIR/backend-integration.log" "$OUTPUT_DIR/summary.json"

echo "KYC end-to-end output: $OUTPUT_DIR"
exit "$STATUS"
