#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
STAMP="${BENCHMARK_STAMP:-$(date -u +%Y%m%dT%H%M%SZ)}"
SEED="${BENCHMARK_SEED:-20260725}"
STUDY_DIR="$PROJECT_DIR/benchmark/results/statistical-$STAMP"
METADATA="$STUDY_DIR/metadata.json"
PROMETHEUS_URL="${PROMETHEUS_URL:-http://127.0.0.1:9090}"
STUDY_FAILURE=0
METRICS_STARTED=0

cd "$PROJECT_DIR"
mkdir -p "$STUDY_DIR/runs"

if [ ! -f "$METADATA" ]; then
  node scripts/record-study-run.js "$METADATA" init --study "Digital Rupiah statistical benchmark" --duration 120
fi

validate_source() {
  {
    (cd chaincode && go test ./...)
    (cd backend && go test ./...)
    npm run test:benchmarks
  } >"$STUDY_DIR/source-validation.log" 2>&1
}

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
    if [ "$ready" -eq 1 ]; then return 0; fi
    sleep 1
  done
  return 1
}

prepare_benchmark_assets() {
  if ! bash benchmark/gen-network-assets.sh >"$1/assets.log" 2>&1; then return 1; fi
  local missing=0 rel
  while IFS= read -r rel; do
    rel="${rel%\"}"
    rel="${rel#\"}"
    if [ ! -f "$rel" ]; then
      echo "missing benchmark asset: $rel" >>"$1/assets.log"
      missing=1
    fi
  done < <(sed -n 's/^[[:space:]]*path:[[:space:]]*//p' benchmark/networkconfig.yaml)
  [ "$missing" -eq 0 ]
}

reset_network() {
  local run_dir="$1"
  NETWORK_MODE=garuda NETWORK_DOWN_REMOVE_VOLUMES=true ./scripts/network-down.sh >"$run_dir/network-down.log" 2>&1 || true
  if ! NETWORK_MODE=garuda ./scripts/network-up.sh >"$run_dir/network-up.log" 2>&1; then return 1; fi
  if ! wait_for_fabric_ports; then return 1; fi
  if ! prepare_benchmark_assets "$run_dir"; then return 1; fi
  if ! NETWORK_MODE=garuda ./scripts/deploy-chaincode.sh >"$run_dir/deploy-chaincode.log" 2>&1; then return 1; fi
  if ! NETWORK_MODE=garuda ./scripts/init-ledger.sh >"$run_dir/init-ledger.log" 2>&1; then return 1; fi
  sleep "${BENCHMARK_STABILIZATION_SECONDS:-10}"
}

start_metrics() {
  docker compose -f benchmark/monitoring/docker-compose.yaml up -d --wait
  METRICS_STARTED=1
  for _ in $(seq 1 30); do
    if node -e 'fetch(process.argv[1] + "/-/ready").then(response => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))' "$PROMETHEUS_URL"; then return 0; fi
    sleep 1
  done
  echo "Prometheus did not become ready" >&2
  return 1
}

stop_metrics() {
  if [ "$METRICS_STARTED" -eq 1 ]; then
    docker compose -f benchmark/monitoring/docker-compose.yaml down
    METRICS_STARTED=0
  fi
}

trap stop_metrics EXIT
run_is_complete() {
  node -e '
    const fs = require("fs");
    const path = require("path");
    const zlib = require("zlib");
    const [metadataPath, scenarioId, phase, repetition, targetTps, workerCount] = process.argv.slice(1);
    const root = path.dirname(path.resolve(metadataPath));
    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    const exists = file => file && fs.existsSync(path.resolve(root, file));
    const metricLines = file => {
      const data = fs.readFileSync(path.resolve(root, file));
      const text = file.endsWith(".gz") ? zlib.gunzipSync(data).toString("utf8") : data.toString("utf8");
      return text.split(/\r?\n/).filter(Boolean);
    };
    const run = (metadata.runs || []).find(candidate => (
      candidate.scenarioId === scenarioId
      && candidate.phase === phase
      && Number(candidate.repetition) === Number(repetition)
      && Number(candidate.targetTps) === Number(targetTps)
      && Number(candidate.workerCount) === Number(workerCount)
    ));
    const hasMeasuredSubmissions = run && (run.traceFiles || []).some(file => {
      if (!exists(file)) return false;
      return fs.readFileSync(path.resolve(root, file), "utf8").split(/\r?\n/).some(line => {
        try {
          const event = JSON.parse(line);
          return event.event === "submitted" && event.roundLabel === run.measuredRound && Number(event.count) > 0;
        } catch {
          return false;
        }
      });
    });
    const hasHealthyMetrics = run && exists(run.metricsFile) && metricLines(run.metricsFile).length > 0
      && metricLines(run.metricsFile).every(line => {
        try {
          const event = JSON.parse(line);
          return !event.error && event.httpStatus === 200 && event.response?.status === "success";
        } catch {
          return false;
        }
      });
    process.exit(run
      && Number(run.exitStatus) === 0
      && exists(run.configFile)
      && exists(run.reportFile)
      && exists(run.logFile)
      && hasHealthyMetrics
      && hasMeasuredSubmissions
      && (run.traceFiles || []).some(exists) ? 0 : 1);
  ' "$METADATA" "$1" "$2" "$3" "$4" "$5"
}

run_one() {
  local operation="$1"
  local contention="$2"
  local phase="$3"
  local repetition="$4"
  local workers="$5"
  local target_tps="$6"
  local duration="${7:-120}"
  local run_id="${phase}-${operation}-${contention}-${workers}w-${target_tps}tps-r${repetition}"
  local run_dir="$STUDY_DIR/runs/$run_id"
  local measured_round="${operation}-${contention}-${target_tps}tps"
  local sampler_pid=0
  local status=0

  if run_is_complete "$operation-$contention" "$phase" "$repetition" "$target_tps" "$workers"; then
    return 0
  fi
  mkdir -p "$run_dir"
  node scripts/generate-study-config.js \
    --output "$run_dir/benchconfig.yaml" \
    --operation "$operation" \
    --contention "$contention" \
    --scenario "$operation-$contention" \
    --workers "$workers" \
    --target-tps "$target_tps" \
    --duration "$duration" \
    --seed "$SEED" >"$run_dir/config-generation.json"

  if ! reset_network "$run_dir"; then
    STUDY_FAILURE=1
    node scripts/record-study-run.js "$METADATA" append \
      --run-dir "$run_dir" --scenario-id "$operation-$contention" \
      --family "$operation" --operation "$operation" --contention "$contention" \
      --phase "$phase" --repetition "$repetition" --target-tps "$target_tps" \
      --duration "$duration" --workers "$workers" --measured-round "$measured_round" \
      --exit-status 1 >/dev/null
    return 0
  fi

  node scripts/sample-prometheus.js --url "$PROMETHEUS_URL" \
    --output "$run_dir/prometheus.jsonl" --duration-seconds 0 \
    >"$run_dir/prometheus-sampler.log" 2>&1 &
  sampler_pid=$!
  rm -f report.html
  set +e
  BENCHMARK_TRACE_DIR="$run_dir" \
    BENCHMARK_STAMP="${STAMP}_${run_id}" \
    ./node_modules/.bin/caliper launch manager \
      --caliper-benchconfig "$run_dir/benchconfig.yaml" \
      --caliper-networkconfig benchmark/networkconfig.yaml \
      --caliper-workspace . >"$run_dir/caliper.log" 2>&1
  status=$?
  set -e
  if kill -0 "$sampler_pid" >/dev/null 2>&1; then kill "$sampler_pid" || true; fi
  wait "$sampler_pid" || true
  if [ -s "$run_dir/prometheus.jsonl" ]; then gzip -f "$run_dir/prometheus.jsonl"; fi
  if [ -s report.html ]; then cp report.html "$run_dir/report.html"; fi
  local trace_count
  trace_count="$(find "$run_dir" -maxdepth 1 -type f -name 'transactions-worker-*.jsonl' | wc -l)"
  if [ "$status" -eq 0 ] && { [ ! -s "$run_dir/report.html" ] || [ "$trace_count" -eq 0 ]; }; then
    status=1
  fi
  if [ "$status" -ne 0 ]; then STUDY_FAILURE=1; fi

  node scripts/record-study-run.js "$METADATA" append \
    --run-dir "$run_dir" --scenario-id "$operation-$contention" \
    --family "$operation" --operation "$operation" --contention "$contention" \
    --phase "$phase" --repetition "$repetition" --target-tps "$target_tps" \
    --duration "$duration" --workers "$workers" --measured-round "$measured_round" \
    --exit-status "$status" >/dev/null
}

analyze() {
  node scripts/analyze-benchmark-results.js "$STUDY_DIR" >/"$STUDY_DIR/analysis.log"
}

pilot_rates=(5 10 20 40 60 80 100 150)
operations=(issuance distribution retail-transfer merchant-payment redemption balance-query wallet-freeze wallet-unfreeze)

MODE="${1:-full}"
case "$MODE" in
  pilot|calibrate|primary|full) ;;
  *)
    echo "usage: $0 [pilot|calibrate|primary|full]" >&2
    exit 2
    ;;
esac

run_initial_pilot() {
  for rate in "${pilot_rates[@]}"; do
    run_one retail-transfer low pilot 1 1 "$rate" 30
  done
  analyze
}

run_worker_calibration() {
  local knee rates rate worker repetition
  knee="$(node scripts/study-control.js pilot-knee "$STUDY_DIR/summary.json")"
  rates="$(node scripts/study-control.js calibration-rates "$STUDY_DIR/summary.json")"
  IFS=',' read -r -a calibration_rates <<<"$rates"
  for worker in 1 2 4 8; do
    for rate in "${calibration_rates[@]}"; do
      for repetition in 1 2 3 4 5; do
        run_one retail-transfer low calibration "$repetition" "$worker" "$rate" 60
      done
    done
  done
  analyze
  SELECTED_WORKERS="$(node scripts/study-control.js selected-worker "$STUDY_DIR/summary.json")"
  printf '%s\n' "$SELECTED_WORKERS" >"$STUDY_DIR/selected-workers.txt"
  printf 'pilot_knee=%s\ncalibration_rates=%s\nselected_workers=%s\n' "$knee" "$rates" "$SELECTED_WORKERS" >"$STUDY_DIR/worker-selection.txt"
}

run_scenario_pilots() {
  local operation contention rate
  local workers
  workers="$(<"$STUDY_DIR/selected-workers.txt")"
  for operation in "${operations[@]}"; do
    for rate in "${pilot_rates[@]}"; do
      run_one "$operation" low scenario-pilot 1 "$workers" "$rate" 30
    done
  done
  for rate in "${pilot_rates[@]}"; do
    run_one retail-transfer high scenario-pilot 1 "$workers" "$rate" 30
  done
  analyze
}

run_primary() {
  local operation contention rates rate repetition workers
  workers="$(<"$STUDY_DIR/selected-workers.txt")"
  for operation in "${operations[@]}"; do
    rates="$(node scripts/study-control.js primary-rates "$STUDY_DIR/summary.json" "$operation" low)"
    IFS=',' read -r -a primary_rates <<<"$rates"
    for rate in "${primary_rates[@]}"; do
      for repetition in 1 2 3 4 5; do
        run_one "$operation" low primary "$repetition" "$workers" "$rate" 120
      done
    done
  done
  rates="$(node scripts/study-control.js primary-rates "$STUDY_DIR/summary.json" retail-transfer high)"
  IFS=',' read -r -a primary_rates <<<"$rates"
  for rate in "${primary_rates[@]}"; do
    for repetition in 1 2 3 4 5; do
      run_one retail-transfer high primary "$repetition" "$workers" "$rate" 120
    done
  done
  analyze
}

start_metrics
validate_source
case "$MODE" in
  pilot)
    run_initial_pilot
    ;;
  calibrate)
    analyze
    run_worker_calibration
    ;;
  primary)
    analyze
    run_scenario_pilots
    run_primary
    ;;
  full)
    run_initial_pilot
    run_worker_calibration
    run_scenario_pilots
    run_primary
    ;;
esac

analyze
if [ "$MODE" = primary ] || [ "$MODE" = full ]; then
  node scripts/validate-study-artifacts.js "$STUDY_DIR" >"$STUDY_DIR/validation.json"
  node scripts/write-study-manifest.js "$STUDY_DIR" >"$STUDY_DIR/manifest-path.txt"
fi
echo "Study directory: $STUDY_DIR"
echo "Failure flag: $STUDY_FAILURE"
exit "$STUDY_FAILURE"
