#!/bin/bash
# Invokes InitLedger (seeds tier limits + treasury) then pre-warms the chaincode
# container on every peer so the first benchmark transactions don't hit cold-start
# endorsement timeouts. Garuda network only. Run after deploy-chaincode.sh.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
CHANNEL_NAME="${CHANNEL_NAME:-mychannel}"
CC_NAME="${CHAINCODE_NAME:-digital-rupiah}"

export PATH="$FABRIC_SAMPLES/bin:$PATH"
export FABRIC_CFG_PATH="$FABRIC_SAMPLES/config"
export CORE_PEER_TLS_ENABLED=true

ORG="$PROJECT_DIR/network/organizations"
ORDERER_CA="$ORG/ordererOrganizations/bi-coin/orderers/orderer.bi-coin/msp/tlscacerts/tlsca.bi-coin-cert.pem"

set_peer() { # mspid domain port
  export CORE_PEER_LOCALMSPID="$1" CORE_PEER_ADDRESS="localhost:$3"
  export CORE_PEER_TLS_ROOTCERT_FILE="$ORG/peerOrganizations/$2/peers/peer0.$2/tls/ca.crt"
  export CORE_PEER_MSPCONFIGPATH="$ORG/peerOrganizations/$2/users/Admin@$2/msp"
}

echo "Invoking InitLedger..."
set_peer CentralBankMSP bi-coin 7051
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.bi-coin \
  --tls --cafile "$ORDERER_CA" -C "$CHANNEL_NAME" -n "$CC_NAME" \
  -c '{"function":"InitLedger","Args":[]}' \
  --peerAddresses localhost:7051  --tlsRootCertFiles "$ORG/peerOrganizations/bi-coin/peers/peer0.bi-coin/tls/ca.crt" \
  --peerAddresses localhost:9051  --tlsRootCertFiles "$ORG/peerOrganizations/distributor.bi-coin/peers/peer0.distributor.bi-coin/tls/ca.crt" \
  --peerAddresses localhost:13051  --tlsRootCertFiles "$ORG/peerOrganizations/enduser.bi-coin/peers/peer0.enduser.bi-coin/tls/ca.crt" \
  --waitForEvent

echo "Pre-warming chaincode container on all 4 peers..."
for spec in "CentralBankMSP bi-coin 7051" "DistributorMSP distributor.bi-coin 9051" \
            "ValidatorMSP validator.bi-coin 12051" "EndUserMSP enduser.bi-coin 13051"; do
  set_peer $spec
  peer chaincode query -C "$CHANNEL_NAME" -n "$CC_NAME" -c '{"function":"GetTotalSupply","Args":[]}' >/dev/null 2>&1 || true
  echo "  warmed peer0.$(echo $spec | awk '{print $2}')"
done
echo "Ledger initialized and chaincode warmed."
