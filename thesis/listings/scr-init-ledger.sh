#!/bin/bash
# Study counterpart of the InitLedger step: invokes rupiah-monetary Initialize
# from the study CLI container, endorsed by CentralBankMSP and DistributorMSP.
# Mirrors the invocation in scripts/study-smoke-test.js. Run after deploy-study-chaincodes.sh.
set -euo pipefail

CHANNEL_NAME="${STUDY_CHANNEL_NAME:-rupiah-study}"
CLI_CONTAINER="study-cli"
ORDERER_HOST="orderer.centralbank.rupiah.study"
ORDERER_TLS_CA="/study/organizations/ordererOrganizations/centralbank.rupiah.study/orderers/orderer.centralbank.rupiah.study/tls/ca.crt"
CB_DIR="/study/organizations/peerOrganizations/centralbank.rupiah.study"
DIST_DIR="/study/organizations/peerOrganizations/distributor.rupiah.study"

echo "Invoking Initialize on rupiah-monetary..."
if output="$(docker exec \
    -e CORE_PEER_LOCALMSPID=CentralBankMSP \
    -e CORE_PEER_ADDRESS=peer0.centralbank.rupiah.study:7051 \
    -e CORE_PEER_TLS_ROOTCERT_FILE="$CB_DIR/peers/peer0.centralbank.rupiah.study/tls/ca.crt" \
    -e CORE_PEER_MSPCONFIGPATH="$CB_DIR/users/Admin@centralbank.rupiah.study/msp" \
    -e CORE_PEER_TLS_ENABLED=true \
    -e FABRIC_CFG_PATH=/etc/hyperledger/fabric \
    "$CLI_CONTAINER" peer chaincode invoke \
    -o "$ORDERER_HOST:7050" --ordererTLSHostnameOverride "$ORDERER_HOST" \
    --tls --cafile "$ORDERER_TLS_CA" \
    --channelID "$CHANNEL_NAME" --name rupiah-monetary \
    --peerAddresses peer0.centralbank.rupiah.study:7051 \
    --tlsRootCertFiles "$CB_DIR/peers/peer0.centralbank.rupiah.study/tls/ca.crt" \
    --peerAddresses peer0.distributor.rupiah.study:7051 \
    --tlsRootCertFiles "$DIST_DIR/peers/peer0.distributor.rupiah.study/tls/ca.crt" \
    --ctor '{"function":"Initialize","Args":[]}' \
    --waitForEvent --waitForEventTimeout 2m 2>&1)"; then
  echo "rupiah-monetary initialized."
elif [[ "$output" == *"already initialized"* ]]; then
  echo "rupiah-monetary already initialized."
else
  printf '%s\n' "$output" >&2
  exit 1
fi
