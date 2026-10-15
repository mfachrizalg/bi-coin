#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
NETWORK_DIR="$PROJECT_DIR/network/study"
FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
CHANNEL_NAME="${STUDY_CHANNEL_NAME:-rupiah-study}"
PROJECT_NAME="bi-coin-rupiah-study"
ORDERER_HOST="orderer.centralbank.rupiah.study"
ORDERER_TLS="$NETWORK_DIR/organizations/ordererOrganizations/centralbank.rupiah.study/orderers/$ORDERER_HOST/tls"

source "$NETWORK_DIR/study-env.sh"
: "${STUDY_CA_ADMIN_USER:?set STUDY_CA_ADMIN_USER for the local study CA}"
: "${STUDY_CA_ADMIN_SECRET:?set STUDY_CA_ADMIN_SECRET for the local study CA}"
: "${STUDY_COUCHDB_USER:?set STUDY_COUCHDB_USER for the local study network}"
: "${STUDY_COUCHDB_PASSWORD:?set STUDY_COUCHDB_PASSWORD for the local study network}"

export PATH="$FABRIC_SAMPLES/bin:$PATH"
export FABRIC_CFG_PATH="$NETWORK_DIR"

if docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
else
  COMPOSE=(docker-compose)
fi

compose() {
  "${COMPOSE[@]}" --project-name "$PROJECT_NAME" --file "$NETWORK_DIR/docker-compose.yaml" "$@"
}

if [[ ! -d "$NETWORK_DIR/organizations/peerOrganizations/distributor.rupiah.study" ]]; then
  echo "Generating synthetic peer organization certificates..."
  cryptogen generate --config="$NETWORK_DIR/crypto-config.yaml" --output="$NETWORK_DIR/organizations"
fi

echo "Starting local CentralBank CA..."
compose --profile ca up -d ca.centralbank
echo "Creating CentralBank peer and orderer identities..."
bash "$NETWORK_DIR/bootstrap-centralbank.sh"

mkdir -p "$NETWORK_DIR/channel-artifacts"
BLOCK="$NETWORK_DIR/channel-artifacts/$CHANNEL_NAME.block"
configtxgen -profile RetailRupiahStudyChannel -channelID "$CHANNEL_NAME" -outputBlock "$BLOCK"

echo "Starting isolated study peers and orderer..."
compose --profile network up -d

orderer_ready=false
for _ in $(seq 1 30); do
  if osnadmin channel list -o localhost:17053 \
      --ca-file "$ORDERER_TLS/ca.crt" \
      --client-cert "$ORDERER_TLS/server.crt" \
      --client-key "$ORDERER_TLS/server.key" >/dev/null 2>&1; then
    orderer_ready=true
    break
  fi
  sleep 2
done
if [[ "$orderer_ready" != true ]]; then
  echo "study orderer admin endpoint did not become ready" >&2
  exit 1
fi

if osnadmin channel list -o localhost:17053 \
    --ca-file "$ORDERER_TLS/ca.crt" \
    --client-cert "$ORDERER_TLS/server.crt" \
    --client-key "$ORDERER_TLS/server.key" 2>/dev/null | grep -q "$CHANNEL_NAME"; then
  echo "Orderer already joined $CHANNEL_NAME."
else
  osnadmin channel join --channelID "$CHANNEL_NAME" --config-block "$BLOCK" \
    -o localhost:17053 \
    --ca-file "$ORDERER_TLS/ca.crt" \
    --client-cert "$ORDERER_TLS/server.crt" \
    --client-key "$ORDERER_TLS/server.key"
fi

export FABRIC_CFG_PATH="$FABRIC_SAMPLES/config"
export CORE_PEER_TLS_ENABLED=true
for org in centralbank distributor validator enduser; do
  case "$org" in
    centralbank)
      MSPID=CentralBankMSP
      PORT=17051
      DOMAIN=centralbank.rupiah.study
      ADMIN_MSP="$NETWORK_DIR/organizations/peerOrganizations/$DOMAIN/users/Admin@$DOMAIN/msp"
      ;;
    distributor)
      MSPID=DistributorMSP
      PORT=18051
      DOMAIN=distributor.rupiah.study
      ADMIN_MSP="$NETWORK_DIR/organizations/peerOrganizations/$DOMAIN/users/Admin@$DOMAIN/msp"
      ;;
    validator)
      MSPID=ValidatorMSP
      PORT=19051
      DOMAIN=validator.rupiah.study
      ADMIN_MSP="$NETWORK_DIR/organizations/peerOrganizations/$DOMAIN/users/Admin@$DOMAIN/msp"
      ;;
    enduser)
      MSPID=EndUserMSP
      PORT=20051
      DOMAIN=enduser.rupiah.study
      ADMIN_MSP="$NETWORK_DIR/organizations/peerOrganizations/$DOMAIN/users/Admin@$DOMAIN/msp"
      ;;
  esac
  export CORE_PEER_LOCALMSPID="$MSPID"
  export CORE_PEER_TLS_ROOTCERT_FILE="$NETWORK_DIR/organizations/peerOrganizations/$DOMAIN/peers/peer0.$DOMAIN/tls/ca.crt"
  export CORE_PEER_MSPCONFIGPATH="$ADMIN_MSP"
  export CORE_PEER_ADDRESS="localhost:$PORT"
  peer_ready=false
  peer_channels=''
  for _ in $(seq 1 30); do
    if peer_channels="$(peer channel list 2>/dev/null)"; then
      peer_ready=true
      break
    fi
    sleep 2
  done
  if [[ "$peer_ready" != true ]]; then
    echo "peer0.$DOMAIN did not become ready" >&2
    exit 1
  fi
  if grep -Eq "(^|[[:space:]])${CHANNEL_NAME}([[:space:]]|$)" <<<"$peer_channels"; then
    echo "peer0.$DOMAIN already joined $CHANNEL_NAME."
  else
    peer channel join -b "$BLOCK"
    echo "peer0.$DOMAIN joined $CHANNEL_NAME."
  fi
done

echo "Study network is up: four peer MSPs joined $CHANNEL_NAME."
