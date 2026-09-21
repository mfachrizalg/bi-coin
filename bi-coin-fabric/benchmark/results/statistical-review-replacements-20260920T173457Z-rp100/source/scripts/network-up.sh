#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
NETWORK_MODE="${NETWORK_MODE:-test-network}"
FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
TEST_NETWORK="$FABRIC_SAMPLES/test-network"

if [ "$NETWORK_MODE" = "garuda" ]; then
  NETWORK_DIR="$PROJECT_DIR/network"
  CHANNEL_NAME="${CHANNEL_NAME:-mychannel}"
  export PATH="$FABRIC_SAMPLES/bin:$PATH"
  BLOCK="$NETWORK_DIR/channel-artifacts/${CHANNEL_NAME}.block"
  ORDERER_TLS="$NETWORK_DIR/organizations/ordererOrganizations/paynet/orderers/orderer.paynet/tls"

  echo "Starting Garuda topology network (5-org, channel: $CHANNEL_NAME)..."

  if [ ! -d "$NETWORK_DIR/organizations" ]; then
    echo "Generating crypto material..."
    cryptogen generate --config="$NETWORK_DIR/crypto-config.yaml" --output="$NETWORK_DIR/organizations"
  fi

  echo "Generating application-channel genesis block..."
  mkdir -p "$NETWORK_DIR/channel-artifacts"
  FABRIC_CFG_PATH="$NETWORK_DIR" configtxgen -profile GarudaApplicationChannel -channelID "$CHANNEL_NAME" -outputBlock "$BLOCK"

  echo "Starting Docker containers..."
  if docker compose version >/dev/null 2>&1; then DC="docker compose"; else DC="docker-compose"; fi
  $DC -f "$NETWORK_DIR/docker-compose.yaml" up -d

  echo "Waiting for orderer admin endpoint (localhost:7053)..."
  orderer_ready=false
  for _ in $(seq 1 30); do
    if osnadmin channel list -o localhost:7053 \
        --ca-file "$ORDERER_TLS/ca.crt" \
        --client-cert "$ORDERER_TLS/server.crt" \
        --client-key "$ORDERER_TLS/server.key" >/dev/null 2>&1; then
      orderer_ready=true
      break
    fi
    sleep 2
  done
  if [ "$orderer_ready" != true ]; then
    echo "orderer admin endpoint did not become ready" >&2
    exit 1
  fi

  echo "Joining orderer to channel $CHANNEL_NAME..."
  if osnadmin channel list -o localhost:7053 \
      --ca-file "$ORDERER_TLS/ca.crt" \
      --client-cert "$ORDERER_TLS/server.crt" \
      --client-key "$ORDERER_TLS/server.key" 2>/dev/null | grep -q "$CHANNEL_NAME"; then
    echo "  orderer already joined"
  else
    osnadmin channel join --channelID "$CHANNEL_NAME" --config-block "$BLOCK" \
      -o localhost:7053 \
      --ca-file "$ORDERER_TLS/ca.crt" \
      --client-cert "$ORDERER_TLS/server.crt" \
      --client-key "$ORDERER_TLS/server.key"
  fi

  echo "Joining peers to channel $CHANNEL_NAME..."
  export FABRIC_CFG_PATH="$FABRIC_SAMPLES/config"
  export CORE_PEER_TLS_ENABLED=true
  for org in bi himbara commercial ojk pjp; do
    case "$org" in
      bi)         MSPID=BankIndonesiaOrgMSP;  PORT=7051;  ORG_DOMAIN=bi.paynet ;;
      himbara)    MSPID=HimbaraBankOrgMSP;    PORT=9051;  ORG_DOMAIN=himbara.paynet ;;
      commercial) MSPID=CommercialBankOrgMSP; PORT=11051; ORG_DOMAIN=commercial.paynet ;;
      ojk)        MSPID=OJKObserverOrgMSP;    PORT=12051; ORG_DOMAIN=ojk.paynet ;;
      pjp)        MSPID=PJPOrgMSP;            PORT=13051; ORG_DOMAIN=pjp.paynet ;;
    esac
    export CORE_PEER_LOCALMSPID="$MSPID"
    export CORE_PEER_TLS_ROOTCERT_FILE="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/peers/peer0.$ORG_DOMAIN/tls/ca.crt"
    export CORE_PEER_MSPCONFIGPATH="$NETWORK_DIR/organizations/peerOrganizations/$ORG_DOMAIN/users/Admin@$ORG_DOMAIN/msp"
    export CORE_PEER_ADDRESS="localhost:$PORT"
    joined=false
    if peer channel list 2>/dev/null | grep -Eq "(^|[[:space:]])${CHANNEL_NAME}([[:space:]]|$)"; then
      echo "  peer0.$ORG_DOMAIN already joined"
      joined=true
    else
      for _ in $(seq 1 10); do
        if peer channel join -b "$BLOCK" 2>/dev/null; then
          echo "  peer0.$ORG_DOMAIN joined"
          joined=true
          break
        fi
        sleep 3
      done
    fi
    if [ "$joined" != true ]; then
      echo "peer0.$ORG_DOMAIN failed to join channel $CHANNEL_NAME" >&2
      exit 1
    fi
  done

  echo "Garuda network is up. Channel: $CHANNEL_NAME, 5 orgs joined."
else
  if [ ! -d "$TEST_NETWORK" ]; then
    echo "fabric-samples/test-network not found at $TEST_NETWORK"
    echo "Set FABRIC_SAMPLES env var or clone https://github.com/hyperledger/fabric-samples"
    exit 1
  fi

  echo "Starting Hyperledger Fabric test network..."
  cd "$TEST_NETWORK"
  ./network.sh down 2>/dev/null || true
  ./network.sh up createChannel -ca -s couchdb

  echo "Fabric network is up. Channel: mychannel, Org1 Peer0 ready."
fi
