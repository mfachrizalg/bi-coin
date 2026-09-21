#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
: "${DOCKER_HOST:?Use the disposable Docker daemon}"
: "${BENCHMARK_DISPOSABLE_DAEMON_ID:?Set the verified disposable daemon ID}"
if [ "$(docker info --format '{{.ID}}')" != "$BENCHMARK_DISPOSABLE_DAEMON_ID" ]; then
  echo "Docker daemon differs from the approved disposable daemon; refusing network resets" >&2
  exit 1
fi
BASE_STAMP="${BENCHMARK_REPLACEMENT_STAMP:-review-replacements-$(date -u +%Y%m%dT%H%M%SZ)}"

run_cell() {
  local amount="$1"
  shift
  printf 'CELL amount=%s operation=%s contention=%s phase=%s workers=%s tps=%s seconds=%s\n' "$amount" "$@"
  BENCHMARK_STAMP="${BASE_STAMP}-rp${amount}" BENCHMARK_OPERATION_AMOUNT="$amount" \
    bash scripts/run-benchmark-study.sh cell "$@"
}

# Replace the contaminated pilot and whole conditions containing contaminated repetitions.
run_cell 1000 distribution low scenario-pilot 1 60 30
for rate in 30 40 50; do
  run_cell 1000 retail-transfer low calibration 2 "$rate" 60
done
run_cell 1000 redemption low primary 1 20 120
run_cell 1000 distribution low primary 1 75 120

# Fixed-amount paired controls distinguish shared-key contention from policy rejection.
for rate in 20 75 150; do
  run_cell 100 retail-transfer low primary 1 "$rate" 120
  run_cell 100 retail-transfer high primary 1 "$rate" 120
done
