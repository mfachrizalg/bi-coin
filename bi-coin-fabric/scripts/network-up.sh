#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
NETWORK_MODE="${NETWORK_MODE:-test-network}"
FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
TEST_NETWORK="$FABRIC_SAMPLES/test-network"

# One Fabric CA (ca.centralbank) issues every CentralBankMSP identity, so the
# orderer and the CentralBank peer share one trust root (mirrors network/study).
bootstrap_centralbank_ca() {
  local domain="bi-coin"
  local ca_endpoint="127.0.0.1:7054"
  local ca_name="ca-centralbank"
  local ca_admin="caadmin"
  local ca_secret="adminpw" # must match the ca.centralbank command in docker-compose.yaml
  local orgs="$NETWORK_DIR/organizations"
  local crypto_dir="$orgs/peerOrganizations/$domain"
  local orderer_dir="$orgs/ordererOrganizations/$domain/orderers/orderer.$domain"
  local ca_client="$NETWORK_DIR/ca-client"
  local ca_bin="$FABRIC_SAMPLES/bin/fabric-ca-client"
  local ca_cert tls_ca_cert

  if [[ -f "$crypto_dir/msp/config.yaml" && -f "$orderer_dir/msp/config.yaml" ]]; then
    echo "CentralBankMSP materials already exist."
    return 0
  fi
  if [[ -e "$crypto_dir" || -e "$orderer_dir" ]]; then
    echo "Partial CentralBankMSP material exists; refusing to overwrite it." >&2
    return 1
  fi

  mkdir -p "$crypto_dir/users/Admin@$domain" "$crypto_dir/peers/peer0.$domain" "$orderer_dir" "$ca_client"
  export FABRIC_CA_CLIENT_HOME="$ca_client"
  if [[ ! -f "$ca_client/msp/signcerts/cert.pem" ]]; then
    local enrolled=false
    for _ in $(seq 1 30); do
      if "$ca_bin" enroll -u "http://$ca_admin:$ca_secret@$ca_endpoint" --caname "$ca_name" \
          --mspdir "$ca_client/msp" >/dev/null 2>&1; then
        enrolled=true
        break
      fi
      sleep 2
    done
    if [[ "$enrolled" != true ]]; then
      echo "CentralBank CA did not accept the bootstrap identity." >&2
      return 1
    fi
  fi

  identity_secret() {
    printf '%s' "$1" | openssl dgst -sha256 -hmac "$ca_secret" | awk '{print $NF}'
  }

  register_enroll() { # name type msp-dir
    local name="$1" type="$2" target="$3" secret output
    secret="$(identity_secret "$name:$type")"
    if ! output="$("$ca_bin" register --caname "$ca_name" --id.name "$name" --id.secret "$secret" \
        --id.type "$type" --id.affiliation org1.department1 2>&1)"; then
      if [[ "$output" != *"already registered"* && "$output" != *"already exists"* ]]; then
        printf '%s\n' "$output" >&2
        return 1
      fi
    fi
    "$ca_bin" enroll -u "http://$name:$secret@$ca_endpoint" --caname "$ca_name" --mspdir "$target"
  }

  register_node() { # name type msp-dir hosts
    local name="$1" type="$2" target="$3" hosts="$4" secret output tls_dir
    secret="$(identity_secret "$name:$type")"
    if ! output="$("$ca_bin" register --caname "$ca_name" --id.name "$name" --id.secret "$secret" \
        --id.type "$type" --id.maxenrollments 2 --id.affiliation org1.department1 2>&1)"; then
      if [[ "$output" != *"already registered"* && "$output" != *"already exists"* ]]; then
        printf '%s\n' "$output" >&2
        return 1
      fi
    fi
    "$ca_bin" enroll -u "http://$name:$secret@$ca_endpoint" --caname "$ca_name" --mspdir "$target/msp"
    tls_dir="$ca_client/tls-$name"
    "$ca_bin" enroll -u "http://$name:$secret@$ca_endpoint" --caname "$ca_name" \
      --enrollment.profile tls --csr.hosts "$hosts" --mspdir "$tls_dir"
    mkdir -p "$target/tls"
    cp "$tls_dir/signcerts/cert.pem" "$target/tls/server.crt"
    cp "$(find "$tls_dir/keystore" -type f -print -quit)" "$target/tls/server.key"
    cp "$(find "$tls_dir/tlscacerts" -type f -print -quit)" "$target/tls/ca.crt"
  }

  register_enroll admin admin "$crypto_dir/users/Admin@$domain/msp"
  register_enroll user1 client "$crypto_dir/users/User1@$domain/msp"
  register_enroll user2 client "$crypto_dir/users/User2@$domain/msp"
  register_node peer0 peer "$crypto_dir/peers/peer0.$domain" "peer0.$domain,localhost,127.0.0.1"
  register_node orderer orderer "$orderer_dir" "orderer.$domain,localhost,127.0.0.1"

  ca_cert="$(find "$crypto_dir/users/Admin@$domain/msp/cacerts" -type f -print -quit)"
  tls_ca_cert="$(find "$ca_client/tls-peer0/tlscacerts" -type f -print -quit)"
  if [[ -z "$ca_cert" || -z "$tls_ca_cert" ]]; then
    echo "CentralBank CA certificates were not created." >&2
    return 1
  fi

  write_msp_config() {
    local msp_dir="$1"
    mkdir -p "$msp_dir/cacerts" "$msp_dir/tlscacerts"
    cp "$ca_cert" "$msp_dir/cacerts/ca-cert.pem"
    cp "$tls_ca_cert" "$msp_dir/tlscacerts/tlsca-cert.pem"
    cat > "$msp_dir/config.yaml" <<'EOF'
NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/ca-cert.pem
    OrganizationalUnitIdentifier: client
  AdminOUIdentifier:
    Certificate: cacerts/ca-cert.pem
    OrganizationalUnitIdentifier: admin
  PeerOUIdentifier:
    Certificate: cacerts/ca-cert.pem
    OrganizationalUnitIdentifier: peer
  OrdererOUIdentifier:
    Certificate: cacerts/ca-cert.pem
    OrganizationalUnitIdentifier: orderer
EOF
  }

  write_msp_config "$crypto_dir/msp"
  for local_msp in "$crypto_dir/users/Admin@$domain/msp" "$crypto_dir/peers/peer0.$domain/msp" \
      "$crypto_dir/users/User1@$domain/msp" "$crypto_dir/users/User2@$domain/msp" "$orderer_dir/msp"; do
    write_msp_config "$local_msp"
  done
  echo "CentralBankMSP materials created under $orgs."
}

if [ "$NETWORK_MODE" = "garuda" ]; then
  NETWORK_DIR="$PROJECT_DIR/network"
  CHANNEL_NAME="${CHANNEL_NAME:-mychannel}"
  export PATH="$FABRIC_SAMPLES/bin:$PATH"
  BLOCK="$NETWORK_DIR/channel-artifacts/${CHANNEL_NAME}.block"
  ORDERER_TLS="$NETWORK_DIR/organizations/ordererOrganizations/bi-coin/orderers/orderer.bi-coin/tls"

  echo "Starting Garuda topology network (4-org, channel: $CHANNEL_NAME)..."

  if [ ! -d "$NETWORK_DIR/organizations" ]; then
    echo "Generating crypto material..."
    cryptogen generate --config="$NETWORK_DIR/crypto-config.yaml" --output="$NETWORK_DIR/organizations"
  fi

  if docker compose version >/dev/null 2>&1; then DC="docker compose"; else DC="docker-compose"; fi
  echo "Starting CentralBank CA..."
  $DC -f "$NETWORK_DIR/docker-compose.yaml" up -d ca.centralbank
  bootstrap_centralbank_ca

  echo "Generating application-channel genesis block..."
  mkdir -p "$NETWORK_DIR/channel-artifacts"
  FABRIC_CFG_PATH="$NETWORK_DIR" configtxgen -profile GarudaApplicationChannel -channelID "$CHANNEL_NAME" -outputBlock "$BLOCK"

  echo "Starting Docker containers..."
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

  if ! osnadmin channel list -o localhost:7053 \
      --ca-file "$ORDERER_TLS/ca.crt" \
      --client-cert "$ORDERER_TLS/server.crt" \
      --client-key "$ORDERER_TLS/server.key" 2>/dev/null | grep -q "$CHANNEL_NAME"; then
    echo "orderer did not join $CHANNEL_NAME" >&2
    exit 1
  fi

  echo "Joining peers to channel $CHANNEL_NAME..."
  export FABRIC_CFG_PATH="$FABRIC_SAMPLES/config"
  export CORE_PEER_TLS_ENABLED=true
  for org in centralbank distributor validator enduser; do
    case "$org" in
      centralbank) MSPID=CentralBankMSP; PORT=7051;  ORG_DOMAIN=bi-coin ;;
      distributor) MSPID=DistributorMSP; PORT=9051;  ORG_DOMAIN=distributor.bi-coin ;;
      validator)   MSPID=ValidatorMSP;   PORT=12051; ORG_DOMAIN=validator.bi-coin ;;
      enduser)     MSPID=EndUserMSP;     PORT=13051; ORG_DOMAIN=enduser.bi-coin ;;
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

  echo "Garuda network is up. Channel: $CHANNEL_NAME, 4 orgs joined."
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
