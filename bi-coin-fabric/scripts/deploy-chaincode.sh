#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CHAINCODE_DIR="$PROJECT_DIR/chaincode"
CHAINCODE_VERSION_REQUESTED="${CHAINCODE_VERSION:-}"
CHAINCODE_SEQUENCE_REQUESTED="${CHAINCODE_SEQUENCE:-}"
CHAINCODE_NAME="${CHAINCODE_NAME:-digital-rupiah}"
CHAINCODE_VERSION="${CHAINCODE_VERSION:-3.0}"
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

  if CORE_PEER_TLS_ENABLED=true \
      CORE_PEER_LOCALMSPID=CentralBankMSP \
      CORE_PEER_ADDRESS=localhost:7051 \
      CORE_PEER_TLS_ROOTCERT_FILE="$NETWORK_DIR/organizations/peerOrganizations/bi-coin/peers/peer0.bi-coin/tls/ca.crt" \
      CORE_PEER_MSPCONFIGPATH="$NETWORK_DIR/organizations/peerOrganizations/bi-coin/users/Admin@bi-coin/msp" \
      peer lifecycle chaincode querycommitted -C "$CHANNEL_NAME" -n "$CHAINCODE_NAME" 2>/dev/null \
      | grep -q "Version: $CHAINCODE_VERSION, Sequence: $CHAINCODE_SEQUENCE,"; then
    echo "Chaincode already committed: $CHAINCODE_NAME version $CHAINCODE_VERSION sequence $CHAINCODE_SEQUENCE"
    exit 0
  fi

  committed_definition="$(
    CORE_PEER_TLS_ENABLED=true \
      CORE_PEER_LOCALMSPID=CentralBankMSP \
      CORE_PEER_ADDRESS=localhost:7051 \
      CORE_PEER_TLS_ROOTCERT_FILE="$NETWORK_DIR/organizations/peerOrganizations/bi-coin/peers/peer0.bi-coin/tls/ca.crt" \
      CORE_PEER_MSPCONFIGPATH="$NETWORK_DIR/organizations/peerOrganizations/bi-coin/users/Admin@bi-coin/msp" \
      peer lifecycle chaincode querycommitted -C "$CHANNEL_NAME" -n "$CHAINCODE_NAME" --output json 2>/dev/null || true
  )"
  COMMITTED_VERSION="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' <<<"$committed_definition" | head -n 1)"
  COMMITTED_SEQUENCE="$(sed -n 's/.*"sequence"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p' <<<"$committed_definition" | head -n 1)"
  if [[ "$COMMITTED_SEQUENCE" =~ ^[0-9]+$ ]] && ((COMMITTED_SEQUENCE > CHAINCODE_SEQUENCE)); then
    if [ -z "$CHAINCODE_VERSION_REQUESTED" ] && [ -z "$CHAINCODE_SEQUENCE_REQUESTED" ]; then
      echo "Chaincode is already at newer version $COMMITTED_VERSION sequence $COMMITTED_SEQUENCE; no upgrade requested"
      exit 0
    fi
    echo "Requested sequence $CHAINCODE_SEQUENCE is older than committed sequence $COMMITTED_SEQUENCE" >&2
    exit 1
  fi
  if [[ "$COMMITTED_SEQUENCE" =~ ^[0-9]+$ ]] && ((COMMITTED_SEQUENCE == CHAINCODE_SEQUENCE)) && [ "$COMMITTED_VERSION" != "$CHAINCODE_VERSION" ]; then
    echo "Requested version $CHAINCODE_VERSION conflicts with committed version $COMMITTED_VERSION at sequence $COMMITTED_SEQUENCE" >&2
    exit 1
  fi

  peer lifecycle chaincode package "${CHAINCODE_NAME}.tar.gz" \
    --path "$CHAINCODE_DIR" \
    --lang golang \
    --label "${CHAINCODE_NAME}_${CHAINCODE_VERSION}"

  echo "Installing chaincode on all peers (validator install is query-only)..."

  for org in centralbank distributor validator enduser; do
    case "$org" in
      centralbank) MSPID=CentralBankMSP; PORT=7051;  ORG_DOMAIN=bi-coin ;;
      distributor) MSPID=DistributorMSP; PORT=9051;  ORG_DOMAIN=distributor.bi-coin ;;
      validator)   MSPID=ValidatorMSP;   PORT=12051; ORG_DOMAIN=validator.bi-coin ;;
      enduser)     MSPID=EndUserMSP;     PORT=13051; ORG_DOMAIN=enduser.bi-coin ;;
    esac

    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_LOCALMSPID="$MSPID"
    export CORE_PEER_TLS_ROOTCERT_FILE="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/peers/peer0.$ORG_DOMAIN/tls/ca.crt"
    export CORE_PEER_MSPCONFIGPATH="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/users/Admin@$ORG_DOMAIN/msp"
    export CORE_PEER_ADDRESS="localhost:$PORT"

    # Idempotent: only the exact already-installed response is tolerated.
    install_output="$(peer lifecycle chaincode install "${CHAINCODE_NAME}.tar.gz" 2>&1)" || {
      if ! grep -q "already successfully installed" <<<"$install_output"; then
        printf '%s\n' "$install_output" >&2
        exit 1
      fi
    }
  done

  PACKAGE_ID=$(peer lifecycle chaincode queryinstalled | grep "${CHAINCODE_NAME}_${CHAINCODE_VERSION}" | awk '{print $3}' | sed 's/,//')
  echo "Package ID: $PACKAGE_ID"

  echo "Approving chaincode for CentralBank, Distributor, and EndUser orgs..."
  TLS_CA="$NETWORK_DIR/organizations/ordererOrganizations/bi-coin/orderers/orderer.bi-coin/msp/tlscacerts/tlsca.bi-coin-cert.pem"

  for org in centralbank distributor enduser; do
    case "$org" in
      centralbank) MSPID=CentralBankMSP; PORT=7051; ORG_DOMAIN=bi-coin ;;
      distributor) MSPID=DistributorMSP; PORT=9051; ORG_DOMAIN=distributor.bi-coin ;;
      enduser)     MSPID=EndUserMSP;     PORT=13051; ORG_DOMAIN=enduser.bi-coin ;;
    esac

    export CORE_PEER_LOCALMSPID="$MSPID"
    export CORE_PEER_TLS_ROOTCERT_FILE="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/peers/peer0.$ORG_DOMAIN/tls/ca.crt"
    export CORE_PEER_MSPCONFIGPATH="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/users/Admin@$ORG_DOMAIN/msp"
    export CORE_PEER_ADDRESS="localhost:$PORT"

    approval_state="$(peer lifecycle chaincode queryapproved \
      -C "$CHANNEL_NAME" \
      -n "$CHAINCODE_NAME" \
      --output json 2>/dev/null || true)"
    approval_matches_committed=false
    if [ -n "$approval_state" ] && [ -n "$COMMITTED_SEQUENCE" ]; then
      approval_version="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' <<<"$approval_state" | head -n 1)"
      approval_sequence="$(sed -n 's/.*"sequence"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p' <<<"$approval_state" | head -n 1)"
      approval_package_id="$(sed -n 's/.*"package_id"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' <<<"$approval_state" | head -n 1)"
      installed_packages="$(peer lifecycle chaincode queryinstalled 2>/dev/null || true)"
      if [ "$approval_version" = "$COMMITTED_VERSION" ] \
        && [ "$approval_sequence" = "$COMMITTED_SEQUENCE" ] \
        && [ -n "$approval_package_id" ] \
        && grep -Fq "Package ID: $approval_package_id," <<<"$installed_packages"; then
        approval_matches_committed=true
      fi
    fi
    if [[ "$approval_state" =~ \"sequence\"[[:space:]]*:[[:space:]]*$CHAINCODE_SEQUENCE ]] \
      && [[ "$approval_state" =~ \"version\"[[:space:]]*:[[:space:]]*\"$CHAINCODE_VERSION\" ]] \
      && grep -Fq "\"package_id\": \"$PACKAGE_ID\"" <<<"$approval_state"; then
      echo "  $org approval already matches $CHAINCODE_NAME $CHAINCODE_VERSION sequence $CHAINCODE_SEQUENCE"
    else
      if [ -n "$approval_state" ] && [ "$approval_matches_committed" != true ]; then
        echo "  $org has a mismatched uncommitted approval" >&2
        printf '%s\n' "$approval_state" >&2
        exit 1
      fi
      peer lifecycle chaincode approveformyorg \
        -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.bi-coin \
        --channelID "$CHANNEL_NAME" \
        --name "$CHAINCODE_NAME" \
        --version "$CHAINCODE_VERSION" \
        --package-id "$PACKAGE_ID" \
        --sequence "$CHAINCODE_SEQUENCE" \
        --tls --cafile "$TLS_CA" \
        --peerAddresses "localhost:$PORT" \
        --tlsRootCertFiles "$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/peers/peer0.$ORG_DOMAIN/tls/ca.crt"
    fi
  done

  echo "Committing chaincode..."
  peer lifecycle chaincode commit \
    -o localhost:7050 \
    --ordererTLSHostnameOverride orderer.bi-coin \
    --channelID "$CHANNEL_NAME" \
    --name "$CHAINCODE_NAME" \
    --version "$CHAINCODE_VERSION" \
    --sequence "$CHAINCODE_SEQUENCE" \
    --tls --cafile "$TLS_CA" \
    --peerAddresses localhost:7051 \
    --tlsRootCertFiles "$NETWORK_DIR/organizations/peerOrganizations/bi-coin/peers/peer0.bi-coin/tls/ca.crt" \
    --peerAddresses localhost:9051 \
    --tlsRootCertFiles "$NETWORK_DIR/organizations/peerOrganizations/distributor.bi-coin/peers/peer0.distributor.bi-coin/tls/ca.crt"

  echo "Chaincode deployed successfully on CentralBank and Distributor orgs."
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
