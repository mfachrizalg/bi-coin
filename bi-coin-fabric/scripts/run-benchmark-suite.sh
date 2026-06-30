#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
RESULTS_DIR="$PROJECT_DIR/benchmark/results"
STAMP="${BENCHMARK_STAMP:-$(date +%Y-%m-%d-%H%M%S)}"

cd "$PROJECT_DIR"
mkdir -p "$RESULTS_DIR"

if docker compose version >/dev/null 2>&1; then
  DC=(docker compose)
else
  DC=(docker-compose)
fi

echo "Resetting Garuda Fabric network..."
"${DC[@]}" -f network/docker-compose.yaml down -v --remove-orphans >/dev/null 2>&1 || true

echo "Starting Garuda Fabric network..."
NETWORK_MODE=garuda ./scripts/network-up.sh >"$RESULTS_DIR/${STAMP}-network-up.log" 2>&1

echo "Deploying chaincode..."
NETWORK_MODE=garuda ./scripts/deploy-chaincode.sh >"$RESULTS_DIR/${STAMP}-deploy-chaincode.log" 2>&1

echo "Initializing ledger and warming chaincode..."
NETWORK_MODE=garuda ./scripts/init-ledger.sh >"$RESULTS_DIR/${STAMP}-init-ledger.log" 2>&1

run_benchmark() {
  local script_name="$1"
  local result_name="$2"
  local log_file="$RESULTS_DIR/${STAMP}-${result_name}.log"
  local report_file="$RESULTS_DIR/${STAMP}-${result_name}.html"

  echo "Running ${script_name}..."
  npm run "$script_name" >"$log_file" 2>&1
  cp report.html "$report_file"
  echo "Saved ${report_file}"
}

run_benchmark benchmark:transfer:w1 transfer-w1
run_benchmark benchmark:transfer:w2 transfer-w2
run_benchmark benchmark:transfer:w4 transfer-w4
run_benchmark benchmark:functionality functionality

echo "Benchmark suite completed. Stamp: ${STAMP}"
