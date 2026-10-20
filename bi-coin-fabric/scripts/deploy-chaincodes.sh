#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
NETWORK_DIR="$PROJECT_DIR/network"
CHAINCODE_DIR="$PROJECT_DIR/chaincode"
FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
CHANNEL_NAME="${FABRIC_CHANNEL_NAME:-bi-coin}"
PROJECT_NAME="bi-coin"
PACKAGE_DIR="$NETWORK_DIR/packages"
CLI_CONTAINER="bi-coin-cli"
ORDERER_TLS_CA="/network/organizations/peerOrganizations/centralbank.bi-coin/msp/tlscacerts/tlsca-cert.pem"
PACKAGE_VERSION="2.0"
PACKAGE_SEQUENCE="1"

export PATH="$FABRIC_SAMPLES/bin:$PATH"
export FABRIC_CFG_PATH="$FABRIC_SAMPLES/config"
mkdir -p "$PACKAGE_DIR"
if docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
else
  COMPOSE=(docker-compose)
fi
"${COMPOSE[@]}" --project-name "$PROJECT_NAME" --file "$NETWORK_DIR/docker-compose.yaml" --profile tools up -d study-cli

select_peer() {
  case "$1" in
    centralbank)
      MSPID=CentralBankMSP; ADDRESS=peer0.centralbank.bi-coin:7051; DOMAIN=centralbank.bi-coin ;;
    distributor)
      MSPID=DistributorMSP; ADDRESS=peer0.distributor.bi-coin:7051; DOMAIN=distributor.bi-coin ;;
    validator)
      MSPID=ValidatorMSP; ADDRESS=peer0.validator.bi-coin:7051; DOMAIN=validator.bi-coin ;;
    enduser)
      MSPID=EndUserMSP; ADDRESS=peer0.enduser.bi-coin:7051; DOMAIN=enduser.bi-coin ;;
    *) echo "unknown peer org: $1" >&2; exit 2 ;;
  esac
  TLS_ROOT="/network/organizations/peerOrganizations/$DOMAIN/peers/peer0.$DOMAIN/tls/ca.crt"
  ADMIN_MSP="/network/organizations/peerOrganizations/$DOMAIN/users/Admin@$DOMAIN/msp"
}

peer_cli() {
  local org="$1"
  shift
  select_peer "$org"
  docker exec \
    -e FABRIC_CFG_PATH=/etc/hyperledger/fabric \
    -e CORE_PEER_TLS_ENABLED=true \
    -e CORE_PEER_LOCALMSPID="$MSPID" \
    -e CORE_PEER_ADDRESS="$ADDRESS" \
    -e CORE_PEER_TLS_ROOTCERT_FILE="$TLS_ROOT" \
    -e CORE_PEER_MSPCONFIGPATH="$ADMIN_MSP" \
    "$CLI_CONTAINER" peer "$@"
}

package_chaincode() {
  local name="$1" source="$2" label="$3"
  if [[ -f "$PACKAGE_DIR/$name.tar.gz" ]]; then
    return
  fi
  peer lifecycle chaincode package \
    "$PACKAGE_DIR/$name.tar.gz" \
    --path "$CHAINCODE_DIR/$source" \
    --lang golang \
    --label "$label"
}

deploy_one() {
  local name="$1" source="$2" policy="$3" label package_id
  label="${name}_${PACKAGE_VERSION}"

  if peer_cli centralbank lifecycle chaincode querycommitted -C "$CHANNEL_NAME" -n "$name" >/dev/null 2>&1; then
    echo "$name is already committed; skipping."
    return
  fi

  echo "Packaging $name..."
  package_chaincode "$name" "$source" "$label"

  for org in centralbank distributor validator enduser; do
    echo "Installing $name on $org..."
    output="$(peer_cli "$org" lifecycle chaincode install "/network/packages/$name.tar.gz" 2>&1)" || {
      if [[ "$output" != *"already successfully installed"* ]]; then
        printf '%s\n' "$output" >&2
        exit 1
      fi
    }
  done

  package_id="$(peer_cli centralbank lifecycle chaincode queryinstalled | awk -v label="$label" '$0 ~ label {gsub(",", "", $3); print $3; exit}')"
  if [[ -z "$package_id" ]]; then
    echo "package id not found for $label" >&2
    exit 1
  fi

  for org in centralbank distributor validator enduser; do
    select_peer "$org"
    if approved="$(peer_cli "$org" lifecycle chaincode queryapproved --channelID "$CHANNEL_NAME" --name "$name" --output json 2>/dev/null)"; then
      if [[ "$approved" == *"\"version\": \"$PACKAGE_VERSION\""* && "$approved" == *"\"sequence\": $PACKAGE_SEQUENCE"* && "$approved" == *"\"package_id\": \"$package_id\""* ]]; then
        echo "$name already has the matching $org approval."
        continue
      fi
      echo "$name has a different uncommitted approval for $org." >&2
      exit 1
    fi
    echo "Approving $name for $org..."
    peer_cli "$org" lifecycle chaincode approveformyorg \
      -o orderer.centralbank.bi-coin:7050 \
      --ordererTLSHostnameOverride orderer.centralbank.bi-coin \
      --channelID "$CHANNEL_NAME" \
      --name "$name" \
      --version "$PACKAGE_VERSION" \
      --package-id "$package_id" \
      --sequence "$PACKAGE_SEQUENCE" \
      --signature-policy "$policy" \
      --tls --cafile "$ORDERER_TLS_CA" \
      --waitForEventTimeout 2m
  done

  echo "Checking $name approvals..."
  peer_cli centralbank lifecycle chaincode checkcommitreadiness \
    -C "$CHANNEL_NAME" \
    -n "$name" \
    --version "$PACKAGE_VERSION" \
    --sequence "$PACKAGE_SEQUENCE" \
    --signature-policy "$policy"

  echo "Committing $name..."
  peer_cli centralbank lifecycle chaincode commit \
    -o orderer.centralbank.bi-coin:7050 \
    --ordererTLSHostnameOverride orderer.centralbank.bi-coin \
    --channelID "$CHANNEL_NAME" \
    --name "$name" \
    --version "$PACKAGE_VERSION" \
    --sequence "$PACKAGE_SEQUENCE" \
    --signature-policy "$policy" \
    --tls --cafile "$ORDERER_TLS_CA" \
    --peerAddresses peer0.centralbank.bi-coin:7051 --tlsRootCertFiles /network/organizations/peerOrganizations/centralbank.bi-coin/peers/peer0.centralbank.bi-coin/tls/ca.crt \
    --peerAddresses peer0.distributor.bi-coin:7051 --tlsRootCertFiles /network/organizations/peerOrganizations/distributor.bi-coin/peers/peer0.distributor.bi-coin/tls/ca.crt \
    --peerAddresses peer0.validator.bi-coin:7051 --tlsRootCertFiles /network/organizations/peerOrganizations/validator.bi-coin/peers/peer0.validator.bi-coin/tls/ca.crt \
    --peerAddresses peer0.enduser.bi-coin:7051 --tlsRootCertFiles /network/organizations/peerOrganizations/enduser.bi-coin/peers/peer0.enduser.bi-coin/tls/ca.crt \
    --waitForEventTimeout 2m
  peer_cli centralbank lifecycle chaincode querycommitted -C "$CHANNEL_NAME" -n "$name"
}

deploy_one rupiah-monetary monetary "AND('CentralBankMSP.peer','DistributorMSP.peer')"
deploy_one rupiah-controls controls "AND('DistributorMSP.peer',OR('CentralBankMSP.peer','EndUserMSP.peer'))"
deploy_one rupiah-payments payments "AND('DistributorMSP.peer','EndUserMSP.peer')"

echo "Committed rupiah-monetary, rupiah-controls, and rupiah-payments with their domain policies."
