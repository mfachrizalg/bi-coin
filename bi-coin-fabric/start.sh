#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

export NETWORK_MODE=garuda
export CONTRACT_SCHEMA_VERSION="${CONTRACT_SCHEMA_VERSION:-v3}"

if [[ ! -f "$BACKEND_DIR/.env" ]]; then
  cp "$PROJECT_DIR/.env.example" "$BACKEND_DIR/.env"
fi

build_gateway_json() {
  local json="["
  local first=true
  local msp org port

  while IFS='|' read -r msp org port; do
    if [[ "$first" == false ]]; then
      json+=","
    fi
    first=false
    json+="{\"msp_id\":\"$msp\",\"peer_endpoint\":\"localhost:$port\",\"cert_path\":\"../network/organizations/peerOrganizations/$org/users/Admin@${org}/msp/signcerts/Admin@${org}-cert.pem\",\"key_path\":\"../network/organizations/peerOrganizations/$org/users/Admin@${org}/msp/keystore/priv_sk\",\"tls_cert_path\":\"../network/organizations/peerOrganizations/$org/peers/peer0.$org/tls/ca.crt\"}"
  done <<'GATEWAYS'
BankIndonesiaOrgMSP|bi.paynet|7051
HimbaraBankOrgMSP|himbara.paynet|9051
CommercialBankOrgMSP|commercial.paynet|11051
OJKObserverOrgMSP|ojk.paynet|12051
PJPOrgMSP|pjp.paynet|13051
GATEWAYS

  json+="]"
  printf '%s' "$json"
}

# Keep the launcher usable with older local backend/.env files.
export FABRIC_GATEWAYS_JSON="${FABRIC_GATEWAYS_JSON:-$(build_gateway_json)}"

"$PROJECT_DIR/scripts/network-up.sh"
"$PROJECT_DIR/scripts/deploy-chaincode.sh"
"$PROJECT_DIR/scripts/init-ledger.sh"
docker compose -f "$PROJECT_DIR/docker-compose.postgres.yaml" up -d --wait --force-recreate

if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
  (cd "$FRONTEND_DIR" && npm install)
fi

cleanup() {
  local status=$?
  trap - EXIT INT TERM

  for pid in "${BACKEND_PID:-}" "${FRONTEND_PID:-}"; do
    [[ -n "$pid" ]] || continue
    kill "$pid" 2>/dev/null || true
  done
  for pid in "${BACKEND_PID:-}" "${FRONTEND_PID:-}"; do
    [[ -n "$pid" ]] || continue
    wait "$pid" 2>/dev/null || true
  done

  exit "$status"
}
trap cleanup EXIT INT TERM

echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8080"
echo "Press Ctrl-C to stop backend/frontend; Docker services remain running."

(
  cd "$BACKEND_DIR"
  exec go run .
) &
BACKEND_PID=$!

(
  cd "$FRONTEND_DIR"
  exec npm run dev
) &
FRONTEND_PID=$!

wait -n "$BACKEND_PID" "$FRONTEND_PID"
