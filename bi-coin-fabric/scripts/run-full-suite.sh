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
printf 'profile\tscript\texit_status\treport\tverdict\tnote\tsuccess\tfailed\n' >"$STATUS_FILE"

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

prepare_benchmark_assets() {
  echo "[setup] Generating Caliper identities and connection profiles..."
  if ! bash benchmark/gen-network-assets.sh; then
    echo "[setup] FAILED: benchmark network assets" >&2
    return 1
  fi

  local missing=0 rel
  while IFS= read -r rel; do
    rel="${rel%\"}"
    rel="${rel#\"}"
    if [ ! -f "$rel" ]; then
      echo "[setup] missing benchmark asset: $rel" >&2
      missing=1
    fi
  done < <(sed -n 's/^[[:space:]]*path:[[:space:]]*//p' benchmark/networkconfig.yaml)
  [ "$missing" -eq 0 ]
}

reset_network() {
  local profile="$1"
  echo "[setup] Resetting network for ${profile}..."
  NETWORK_MODE=garuda NETWORK_DOWN_REMOVE_VOLUMES=true ./scripts/network-down.sh >/dev/null 2>&1 || true

  if ! NETWORK_MODE=garuda ./scripts/network-up.sh >"$RESULTS_DIR/${STAMP}-${profile}-network-up.log" 2>&1; then
    echo "[setup] FAILED: network-up for ${profile}"
    return 1
  fi
  if ! wait_for_fabric_ports; then
    echo "[setup] FAILED: Fabric ports not ready for ${profile}"
    return 1
  fi
  if ! prepare_benchmark_assets; then
    echo "[setup] FAILED: benchmark assets for ${profile}"
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
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$@" >>"$STATUS_FILE"
}

run_benchmark() {
  local script_name="$1"
  local profile="$2"
  local oracle="${3:-standard}"
  local log_file="$RESULTS_DIR/${STAMP}-${profile}.log"
  local report_file="$RESULTS_DIR/${STAMP}-${profile}.html"
  local trace_dir="$RESULTS_DIR/${STAMP}-${profile}-trace"
  local status=0
  local verdict=FAIL
  local note=
  local success_count=0
  local failed_count=0

  if ! reset_network "$profile"; then
    record_status "$profile" "$script_name" 1 missing FAIL setup-failed 0 0
    OVERALL_STATUS=1
    return
  fi

  echo "[run] ${profile} ..."
  mkdir -p "$trace_dir"
  rm -f report.html
  if BENCHMARK_STAMP="${STAMP}_${profile}" BENCHMARK_TRACE_DIR="$trace_dir" npm run "$script_name" >"$log_file" 2>&1; then
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

  local report_summary=
  local report_ok=false
  if [ "$report_state" = present ]; then
    report_summary="$(node scripts/validate-caliper-report.js "$log_file" 2>&1 || true)"
    printf '%s\n' "$report_summary" >>"$log_file"
    if [[ "$report_summary" =~ \"success\":([0-9]+) ]]; then success_count="${BASH_REMATCH[1]}"; fi
    if [[ "$report_summary" =~ \"failed\":([0-9]+) ]]; then failed_count="${BASH_REMATCH[1]}"; fi
    if [[ "$report_summary" == *'"verdict":"PASS"'* ]]; then report_ok=true; fi
  fi

  if [ "$status" -eq 0 ] && [ "$report_state" = present ]; then
    if [ "$oracle" = standard ]; then
      if [ "$report_ok" = true ] && ! grep -Eq 'Failed round [0-9]+|Failed rounds: [1-9][0-9]*' "$log_file"; then
        verdict=PASS
        note=caliper-success-zero-failures
      else
        verdict=MEASURED_WITH_FAILURES
        note=caliper-report-failures
      fi
    elif grep -Eq 'Failed round [0-9]+|Failed rounds: [1-9][0-9]*' "$log_file"; then
      verdict=FAIL
      note=caliper-failed-round
    else
      case "$oracle" in
      negative)
        docker logs peer0.bi.paynet >>"$log_file" 2>&1 || true
        if node scripts/validate-negative-path-log.js "$log_file" >>"$log_file" 2>&1; then
          verdict=PASS
          note=expected-rejections-confirmed
        else
          note=negative-path-oracle-failed
        fi
        ;;
      boundary)
        docker logs peer0.bi.paynet >>"$log_file" 2>&1 || true
        if node scripts/validate-boundary-log.js "$log_file" >>"$log_file" 2>&1; then
          verdict=PASS
          note=boundary-oracle-confirmed
        else
          note=boundary-oracle-failed
        fi
        ;;
      custody)
        if node scripts/validate-authorization-log.js "$log_file" >>"$log_file" 2>&1; then
          verdict=PASS
          note=custody-oracle-confirmed
        else
          note=custody-oracle-failed
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
      esac
    fi
  elif [ -z "$note" ]; then
    note=caliper-exit-${status}
  fi

  record_status "$profile" "$script_name" "$status" "$report_state" "$verdict" "$note" "$success_count" "$failed_count"
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
  'benchmark:transfer:w8|transfer-w8',
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
run_benchmark benchmark:boundary boundary-path boundary
run_benchmark benchmark:authorization authorization custody
run_benchmark benchmark:transfer:repeat transfer-repeat
run_benchmark benchmark:negative negative-path negative
run_benchmark benchmark:adversarial aggregate-overspend overspend

BENCHMARK_STARTED_AT="$STARTED_AT" \
  BENCHMARK_SEED="$SEED" \
  BENCHMARK_CLEAN_LEDGER=true \
  NETWORK_MODE=garuda \
  node scripts/write-benchmark-manifest.js "$STATUS_FILE" "$RESULTS_DIR/${STAMP}-manifest.json"

echo "[done] Suite completed. Stamp: ${STAMP}; status=${OVERALL_STATUS}"
exit "$OVERALL_STATUS"
