#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
: "${DOCKER_HOST:?Use the disposable Docker daemon}"
: "${BENCHMARK_DISPOSABLE_DAEMON_ID:?Set the verified disposable daemon ID}"
actual_daemon_id="$(docker info --format '{{.ID}}')"
if [[ "$actual_daemon_id" != "$BENCHMARK_DISPOSABLE_DAEMON_ID" ]]; then
  echo "Docker daemon differs from the approved disposable daemon; refusing study network resets" >&2
  exit 1
fi
if [[ -f /image-bundle.tar ]]; then
  for image in hyperledger/fabric-peer:2.5 hyperledger/fabric-orderer:2.5 hyperledger/fabric-tools:2.5 hyperledger/fabric-ca:1.5.9 couchdb:3.3 postgres:16-alpine; do
    if ! docker image inspect "$image" >/dev/null 2>&1; then
      docker load --input /image-bundle.tar --quiet
      break
    fi
  done
fi

mode="${1:-new}"
case "$mode" in
  new|resume|correctness|preflight|performance|all) ;;
  *) echo "usage: $0 {new|resume|correctness|preflight|performance|all}" >&2; exit 2 ;;
esac

export BENCHMARK_COMPLIANCE_STAMP="${BENCHMARK_COMPLIANCE_STAMP:?Set a unique benchmark stamp}"
node benchmark/compliance/run.js "$mode"
