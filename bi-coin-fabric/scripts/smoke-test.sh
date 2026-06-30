#!/bin/bash
set -euo pipefail

BACKEND_URL="${BACKEND_URL:-http://localhost:8080}"
BI_KEY="${BI_KEY:-dev-bi-key}"
PASS=0
FAIL=0

check() {
  local desc="$1" method="$2" url="$3" expected_code="${4:-200}" body="${5:-}" api_key="${6:-$BI_KEY}"
  local actual_code
  actual_code=$(curl -s -o /dev/null -w '%{http_code}' -X "$method" "$BACKEND_URL$url" \
    -H 'Content-Type: application/json' \
    -H "X-API-Key: $api_key" \
    ${body:+-d "$body"} 2>/dev/null || echo "000")

  if [ "$actual_code" = "$expected_code" ]; then
    echo "PASS $desc"
    ((PASS++)) || true
  else
    echo "FAIL $desc (expected $expected_code, got $actual_code)"
    ((FAIL++)) || true
  fi
}

echo "=== Smoke Test: Garuda Digital Rupiah API Gateway ==="
echo ""

# Health (public)
check "Health check"          GET  "/health" 200 "" "dev-public-key"

# Network topology
check "Network topology"      GET  "/network/topology" 200 "" "$BI_KEY"

# Participants
check "Onboard bank-a"        POST "/participants" 200 \
  '{"participant_id":"bank-a","name":"Himbara Bank","domain":"bank-a.paynet","account_id":"bank-a-account","participant_type":"validator"}' "$BI_KEY"

check "Approve bank-a"        POST "/participants/bank-a/approve" 200 "" "$BI_KEY"

check "Onboard bank-b"        POST "/participants" 200 \
  '{"participant_id":"bank-b","name":"Commercial Bank","domain":"bank-b.paynet","account_id":"bank-b-account","participant_type":"validator"}' "$BI_KEY"

check "Approve bank-b"        POST "/participants/bank-b/approve" 200 "" "$BI_KEY"

# Wallets
check "Create hot wallet bank-a" POST "/wallets" 200 \
  '{"participant_id":"bank-a","wallet_type":"hot"}' "$BI_KEY"

check "Create hot wallet bank-b" POST "/wallets" 200 \
  '{"participant_id":"bank-b","wallet_type":"hot"}' "$BI_KEY"

check "List wallets"          GET  "/wallets" 200 "" "$BI_KEY"

# KYC
check "Submit KYC bank-a"     POST "/kyc/profiles" 200 \
  '{"subject_type":"participant","subject_id":"bank-a","provider_case_id":"sumsub-bank-a","document_hashes":["sha256:abc"]}' "$BI_KEY"

check "Refresh KYC bank-a"    POST "/kyc/profiles/kyc_bank-a/refresh" 200 \
  '{"provider_case_id":"sumsub-bank-a","status":"approved","risk_level":"low","document_hashes":["sha256:abc"]}' "$BI_KEY"

# Issuance
check "Issue to bank-a"       POST "/issuance-requests" 200 \
  '{"participant_id":"bank-a","amount":"100000"}' "$BI_KEY"

# Balances
check "Get balances"          GET  "/balances" 200 "" "$BI_KEY"

# Transfer
check "Transfer bank-a→bank-b" POST "/transfers" 200 \
  '{"sender_id":"bank-a","receiver_id":"bank-b","amount":"25000"}' "$BI_KEY"

# Limits
check "Set global supply limit" POST "/limits" 200 \
  '{"scope":"global_supply","value":"1000000000"}' "$BI_KEY"

check "List limits"           GET  "/limits" 200 "" "$BI_KEY"

# Transactions
check "List transactions"     GET  "/transactions" 200 "" "$BI_KEY"

# Reports
check "Reconciliation report" GET  "/reports/reconciliation" 200 "" "$BI_KEY"

check "Metrics report"        GET  "/reports/metrics" 200 "" "$BI_KEY"

# ─── Two-tier PJP distribution (also seeds state for caliper distribute benchmark) ───
PJP_KEY="${PJP_KEY:-dev-bank-pjp-key}"

check "Onboard pjp-a (PJP)"    POST "/participants" 200 \
  '{"participant_id":"pjp-a","name":"GoPay PJP","domain":"pjp-a.paynet","account_id":"pjp-a-account","participant_type":"pjp"}' "$BI_KEY"

check "Approve pjp-a"           POST "/participants/pjp-a/approve" 200 "" "$BI_KEY"

check "Create hot wallet pjp-a" POST "/wallets" 200 \
  '{"participant_id":"pjp-a","wallet_type":"hot"}' "$BI_KEY"

# Fund bank-a within the institutional per-participant balance cap with headroom for distribution
check "Fund bank-a for distribution" POST "/issuance-requests" 200 \
  '{"participant_id":"bank-a","amount":"100000000"}' "$BI_KEY"

check "Distribute bank-a→pjp-a" POST "/distribute" 200 \
  '{"sender_participant_id":"bank-a","receiver_participant_id":"pjp-a","amount":1000}' "$BI_KEY"

# PJP must NOT be able to mint directly from BI
check "PJP blocked from direct issuance" POST "/issuance-requests" 403 \
  '{"participant_id":"pjp-a","amount":"5000"}' "$PJP_KEY"

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
