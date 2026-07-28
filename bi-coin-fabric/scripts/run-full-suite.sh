#!/bin/bash
# Reproducible thesis evidence suite. Every profile receives a fresh ledger,
# performance-profile order is seed-shuffled, and verdicts fail closed.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
RESULTS_DIR="$PROJECT_DIR/benchmark/results"
STAMP="${BENCHMARK_STAMP:-$(date +%Y-%m-%d-%H%M%S)}"
SEED="${BENCHMARK_SEED:-20260725}"
STABILIZATION_SECONDS="${BENCHMARK_STABILIZATION_SECONDS:-10}"
STATUS_FILE="$RESULTS_DIR/${STAMP}-status.tsv"
STARTED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
OVERALL_STATUS=0

cd "$PROJECT_DIR"
mkdir -p "$RESULTS_DIR"
printf 'profile\tscript\texit_status\treport\tverdict\tnote\n' >"$STATUS_FILE"

if docker compose version >/dev/null 2>&1; then
  DC=(docker compose)
else
  DC=(docker-compose)
fi

wait_for_fabric_ports() {
  local ports=(7050 7051 9051 11051 12051 13051)
  local attempt port ready
  for attempt in $(seq 1 60); do
    ready=1
    for port in "${ports[@]}"; do
      if ! (echo >"/dev/tcp/127.0.0.1/${port}") >/dev/null 2>&1; then
        ready=0
        break
      fi
    done
    if [ "$ready" -eq 1 ]; then
      return 0
    fi
    sleep 1
  done
  return 1
}

reset_network() {
  local profile="$1"
  echo "[setup] Resetting network for ${profile}..."
  "${DC[@]}" -f network/docker-compose.yaml down -v --remove-orphans >/dev/null 2>&1 || true

  if ! NETWORK_MODE=garuda ./scripts/network-up.sh >"$RESULTS_DIR/${STAMP}-${profile}-network-up.log" 2>&1; then
    echo "[setup] FAILED: network-up for ${profile}"
    return 1
  fi
  if ! wait_for_fabric_ports; then
    echo "[setup] FAILED: Fabric ports not ready for ${profile}"
    return 1
  fi
  if ! NETWORK_MODE=garuda ./scripts/deploy-chaincode.sh >"$RESULTS_DIR/${STAMP}-${profile}-deploy-chaincode.log" 2>&1; then
    echo "[setup] FAILED: deploy-chaincode for ${profile}"
    return 1
  fi
  if ! NETWORK_MODE=garuda ./scripts/init-ledger.sh >"$RESULTS_DIR/${STAMP}-${profile}-init-ledger.log" 2>&1; then
    echo "[setup] FAILED: init-ledger for ${profile}"
    return 1
  fi
  # Discovery/gossip needs a short convergence window after lifecycle commit.
  # Without it, Caliper can exit 0 after workers fail to derive an endorsement plan.
  sleep "$STABILIZATION_SECONDS"
}

record_status() {
  printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$@" >>"$STATUS_FILE"
}

run_benchmark() {
  local script_name="$1"
  local profile="$2"
  local oracle="${3:-standard}"
  local log_file="$RESULTS_DIR/${STAMP}-${profile}.log"
  local report_file="$RESULTS_DIR/${STAMP}-${profile}.html"
  local status=0
  local verdict=FAIL
  local note=

  if ! reset_network "$profile"; then
    record_status "$profile" "$script_name" 1 missing FAIL setup-failed
    OVERALL_STATUS=1
    return
  fi

  echo "[run] ${profile} ..."
  rm -f report.html
  if npm run "$script_name" >"$log_file" 2>&1; then
    status=0
  else
    status=$?
  fi

  local report_state=missing
  if [ -s report.html ]; then
    cp report.html "$report_file"
    report_state=present
  else
    note=missing-fresh-report
  fi

  if [ "$status" -eq 0 ] && [ "$report_state" = present ]; then
    if grep -Eq 'Failed round [0-9]+|Failed rounds: [1-9][0-9]*' "$log_file"; then
      verdict=FAIL
      note=caliper-failed-round
    else
      case "$oracle" in
      negative)
        if node scripts/validate-negative-path-log.js "$log_file" >>"$log_file" 2>&1; then
          verdict=PASS
          note=expected-rejections-confirmed
        else
          note=negative-path-oracle-failed
        fi
        ;;
      overspend)
        if grep -q '\[overspend-contention\].*invariant=PASS' "$log_file" \
          && grep -Eq '\[overspend-contention\].*rejected=[1-9][0-9]*' "$log_file" \
          && ! grep -q '\[overspend-contention\].*invariant=FAIL' "$log_file"; then
          verdict=PASS
          note=nonnegative-balance-and-rejection-confirmed
        else
          note=overspend-oracle-failed
        fi
        ;;
      standard)
        verdict=PASS
        note=caliper-success
        ;;
      esac
    fi
  elif [ -z "$note" ]; then
    note=caliper-exit-${status}
  fi

  record_status "$profile" "$script_name" "$status" "$report_state" "$verdict" "$note"
  echo "[run] ${profile}: exit=${status}, report=${report_state}, verdict=${verdict}"
  if [ "$verdict" != PASS ]; then
    OVERALL_STATUS=1
  fi
}

mapfile -t PERFORMANCE_PROFILES < <(
  BENCHMARK_SEED="$SEED" node - <<'NODE'
const profiles = [
  'benchmark:transfer:w1|transfer-w1',
  'benchmark:transfer:w2|transfer-w2',
  'benchmark:transfer:w4|transfer-w4',
];
let state = Number(process.env.BENCHMARK_SEED) >>> 0;
function random() {
  state = (1664525 * state + 1013904223) >>> 0;
  return state / 0x100000000;
}
for (let i = profiles.length - 1; i > 0; i--) {
  const j = Math.floor(random() * (i + 1));
  [profiles[i], profiles[j]] = [profiles[j], profiles[i]];
}
process.stdout.write(profiles.join('\n'));
NODE
)

for entry in "${PERFORMANCE_PROFILES[@]}"; do
  run_benchmark "${entry%%|*}" "${entry##*|}"
done
run_benchmark benchmark:functionality functionality
run_benchmark benchmark:transfer:repeat transfer-repeat
run_benchmark benchmark:negative negative-path negative
run_benchmark benchmark:adversarial aggregate-overspend overspend

BENCHMARK_STARTED_AT="$STARTED_AT" \
  BENCHMARK_SEED="$SEED" \
  node scripts/write-benchmark-manifest.js "$STATUS_FILE" "$RESULTS_DIR/${STAMP}-manifest.json"

echo "[done] Suite completed. Stamp: ${STAMP}; status=${OVERALL_STATUS}"
exit "$OVERALL_STATUS"
