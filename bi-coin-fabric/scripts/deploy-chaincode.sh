#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CHAINCODE_DIR="$PROJECT_DIR/chaincode"
CHAINCODE_NAME="${CHAINCODE_NAME:-digital-rupiah}"
CHAINCODE_VERSION="${CHAINCODE_VERSION:-2.0}"
CHAINCODE_SEQUENCE="${CHAINCODE_SEQUENCE:-1}"
CHANNEL_NAME="${CHANNEL_NAME:-mychannel}"
NETWORK_MODE="${NETWORK_MODE:-test-network}"

FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
TEST_NETWORK="$FABRIC_SAMPLES/test-network"

echo "Packaging chaincode..."

export PATH="$FABRIC_SAMPLES/bin:$PATH"

if [ "$NETWORK_MODE" = "garuda" ]; then
  NETWORK_DIR="$PROJECT_DIR/network"
  export FABRIC_CFG_PATH="$FABRIC_SAMPLES/config"

  peer lifecycle chaincode package "${CHAINCODE_NAME}.tar.gz" \
    --path "$CHAINCODE_DIR" \
    --lang golang \
    --label "${CHAINCODE_NAME}_${CHAINCODE_VERSION}"

  echo "Installing chaincode on all 5 org peers..."

  for org in bi himbara commercial ojk pjp; do
    case "$org" in
      bi)         MSPID=BankIndonesiaOrgMSP; PORT=7051;  ORG_DOMAIN=bi.paynet ;;
      himbara)    MSPID=HimbaraBankOrgMSP;   PORT=9051;  ORG_DOMAIN=himbara.paynet ;;
      commercial) MSPID=CommercialBankOrgMSP; PORT=11051; ORG_DOMAIN=commercial.paynet ;;
      ojk)        MSPID=OJKObserverOrgMSP;   PORT=12051; ORG_DOMAIN=ojk.paynet ;;
      pjp)        MSPID=PJPOrgMSP;           PORT=13051; ORG_DOMAIN=pjp.paynet ;;
    esac

    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_LOCALMSPID="$MSPID"
    export CORE_PEER_TLS_ROOTCERT_FILE="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/peers/peer0.$ORG_DOMAIN/tls/ca.crt"
    export CORE_PEER_MSPCONFIGPATH="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/users/Admin@$ORG_DOMAIN/msp"
    export CORE_PEER_ADDRESS="localhost:$PORT"

    # Idempotent: a re-run on an already-installed peer must not abort the script.
    peer lifecycle chaincode install "${CHAINCODE_NAME}.tar.gz" 2>&1 | grep -v "already successfully installed" || true
  done

  PACKAGE_ID=$(peer lifecycle chaincode queryinstalled | grep "${CHAINCODE_NAME}_${CHAINCODE_VERSION}" | awk '{print $3}' | sed 's/,//')
  echo "Package ID: $PACKAGE_ID"

  echo "Approving chaincode for all 5 orgs..."
  TLS_CA="$NETWORK_DIR/organizations/ordererOrganizations/paynet/orderers/orderer.paynet/msp/tlscacerts/tlsca.paynet-cert.pem"

  for org in bi himbara commercial ojk pjp; do
    case "$org" in
      bi)         MSPID=BankIndonesiaOrgMSP; PORT=7051;  ORG_DOMAIN=bi.paynet ;;
      himbara)    MSPID=HimbaraBankOrgMSP;   PORT=9051;  ORG_DOMAIN=himbara.paynet ;;
      commercial) MSPID=CommercialBankOrgMSP; PORT=11051; ORG_DOMAIN=commercial.paynet ;;
      ojk)        MSPID=OJKObserverOrgMSP;   PORT=12051; ORG_DOMAIN=ojk.paynet ;;
      pjp)        MSPID=PJPOrgMSP;           PORT=13051; ORG_DOMAIN=pjp.paynet ;;
    esac

    export CORE_PEER_LOCALMSPID="$MSPID"
    export CORE_PEER_TLS_ROOTCERT_FILE="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/peers/peer0.$ORG_DOMAIN/tls/ca.crt"
    export CORE_PEER_MSPCONFIGPATH="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/users/Admin@$ORG_DOMAIN/msp"
    export CORE_PEER_ADDRESS="localhost:$PORT"

    peer lifecycle chaincode approveformyorg \
      -o localhost:7050 \
      --ordererTLSHostnameOverride orderer.paynet \
      --channelID "$CHANNEL_NAME" \
      --name "$CHAINCODE_NAME" \
      --version "$CHAINCODE_VERSION" \
      --package-id "$PACKAGE_ID" \
      --sequence "$CHAINCODE_SEQUENCE" \
      --tls --cafile "$TLS_CA"
  done

  echo "Committing chaincode..."
  peer lifecycle chaincode commit \
    -o localhost:7050 \
    --ordererTLSHostnameOverride orderer.paynet \
    --channelID "$CHANNEL_NAME" \
    --name "$CHAINCODE_NAME" \
    --version "$CHAINCODE_VERSION" \
    --sequence "$CHAINCODE_SEQUENCE" \
    --tls --cafile "$TLS_CA" \
    --peerAddresses localhost:7051  --tlsRootCertFiles "$NETWORK_DIR/organizations/peerOrganizations/bi.paynet/peers/peer0.bi.paynet/tls/ca.crt" \
    --peerAddresses localhost:9051  --tlsRootCertFiles "$NETWORK_DIR/organizations/peerOrganizations/himbara.paynet/peers/peer0.himbara.paynet/tls/ca.crt" \
    --peerAddresses localhost:11051 --tlsRootCertFiles "$NETWORK_DIR/organizations/peerOrganizations/commercial.paynet/peers/peer0.commercial.paynet/tls/ca.crt" \
    --peerAddresses localhost:13051 --tlsRootCertFiles "$NETWORK_DIR/organizations/peerOrganizations/pjp.paynet/peers/peer0.pjp.paynet/tls/ca.crt"

  echo "Chaincode deployed successfully on Garuda network (4 validators + 1 observer + 1 PJP)."
else
  cd "$TEST_NETWORK"
  export FABRIC_CFG_PATH="$FABRIC_SAMPLES/config"

  peer lifecycle chaincode package "${CHAINCODE_NAME}.tar.gz" \
    --path "$CHAINCODE_DIR" \
    --lang golang \
    --label "${CHAINCODE_NAME}_${CHAINCODE_VERSION}"

  echo "Installing chaincode on Org1..."
  export CORE_PEER_TLS_ENABLED=true
  export CORE_PEER_LOCALMSPID=Org1MSP
  export CORE_PEER_TLS_ROOTCERT_FILE="$TEST_NETWORK/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"
  export CORE_PEER_MSPCONFIGPATH="$TEST_NETWORK/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
  export CORE_PEER_ADDRESS=localhost:7051

  peer lifecycle chaincode install "${CHAINCODE_NAME}.tar.gz"

  PACKAGE_ID=$(peer lifecycle chaincode queryinstalled | grep "${CHAINCODE_NAME}_${CHAINCODE_VERSION}" | awk '{print $3}' | sed 's/,//')

  echo "Package ID: $PACKAGE_ID"

  echo "Approving chaincode for Org1..."
  peer lifecycle chaincode approveformyorg \
    -o localhost:7050 \
    --ordererTLSHostnameOverride orderer.example.com \
    --channelID "$CHANNEL_NAME" \
    --name "$CHAINCODE_NAME" \
    --version "$CHAINCODE_VERSION" \
    --package-id "$PACKAGE_ID" \
    --sequence "$CHAINCODE_SEQUENCE" \
    --tls --cafile "$TEST_NETWORK/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

  echo "Committing chaincode..."
  peer lifecycle chaincode commit \
    -o localhost:7050 \
    --ordererTLSHostnameOverride orderer.example.com \
    --channelID "$CHANNEL_NAME" \
    --name "$CHAINCODE_NAME" \
    --version "$CHAINCODE_VERSION" \
    --sequence "$CHAINCODE_SEQUENCE" \
    --tls --cafile "$TEST_NETWORK/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

  echo "Chaincode deployed successfully."
fi
