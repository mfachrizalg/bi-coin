#!/bin/bash
set -euo pipefail

BACKEND_URL="${BACKEND_URL:-http://localhost:8080}"
SMOKE_USERNAME="${SMOKE_USERNAME:-bi}"
SMOKE_PASSWORD="${SMOKE_PASSWORD:-bi-password}"
SMOKE_TOKEN="${SMOKE_TOKEN:-}"
PASS=0
FAIL=0

if [ -z "$SMOKE_TOKEN" ]; then
  login_response="$(curl -fsS -X POST "$BACKEND_URL/auth/login" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$SMOKE_USERNAME\",\"password\":\"$SMOKE_PASSWORD\"}")" || {
    echo "FAIL login (backend unavailable or credentials rejected)" >&2
    exit 1
  }
  SMOKE_TOKEN="$(printf '%s' "$login_response" | node -e '
    let input = "";
    process.stdin.on("data", chunk => { input += chunk; });
    process.stdin.on("end", () => {
      try { process.stdout.write(JSON.parse(input).access_token || ""); }
      catch { process.stdout.write(""); }
    });
  ')"
fi
[ -n "$SMOKE_TOKEN" ] || { echo "FAIL login (response did not contain access_token)" >&2; exit 1; }

check() {
  local desc="$1" method="$2" url="$3" expected_code="${4:-200}" body="${5:-}" token="${6:-$SMOKE_TOKEN}" idempotency_key="${7:-}"
  local actual_code
  local -a args=( -sS -o /dev/null -w '%{http_code}' -X "$method" "$BACKEND_URL$url" -H 'Content-Type: application/json' )
  [ -n "$token" ] && args+=( -H "Authorization: Bearer $token" )
  [ -n "$idempotency_key" ] && args+=( -H "Idempotency-Key: $idempotency_key" )
  [ -n "$body" ] && args+=( -d "$body" )
  actual_code="$(curl "${args[@]}" 2>/dev/null || printf '000')"

  if [ "$actual_code" = "$expected_code" ]; then
    echo "PASS $desc"
    ((PASS++)) || true
  else
    echo "FAIL $desc (expected $expected_code, got $actual_code)"
    ((FAIL++)) || true
  fi
}

echo "=== Smoke Test: Garuda Digital Rupiah API Gateway ==="

check "Health check" GET "/health" 200 "" ""
check "Current principal" GET "/auth/me"
check "Network topology" GET "/network/topology"

SMOKE_ID="smoke-$(date +%s%N)"
check "Submit validator participant" POST "/participants" 200 \
  "{\"participant_id\":\"$SMOKE_ID\",\"name\":\"Smoke Validator\",\"domain\":\"$SMOKE_ID.paynet\",\"account_id\":\"$SMOKE_ID-account\",\"participant_type\":\"validator\"}"
check "Approve validator participant" POST "/participants/$SMOKE_ID/approve" 200 ""

check "Issue into Treasury" POST "/issuance-requests" 200 '{"amount":"1000000"}'
check "Distribute Treasury liquidity" POST "/distribute" 200 \
  "{\"receiver_participant_id\":\"$SMOKE_ID\",\"amount\":\"100000\"}" "$SMOKE_TOKEN" "smoke-distribution-$SMOKE_ID"
check "List wallets" GET "/wallets"
check "List participants" GET "/participants"
check "List limits" GET "/limits"
check "List transactions" GET "/transactions"
check "Supervision events" GET "/supervision/events"
check "Reconciliation report" GET "/reports/reconciliation"
check "Metrics report" GET "/reports/metrics"

echo "=== Results: $PASS passed, $FAIL failed ==="
[ "$FAIL" -eq 0 ]
