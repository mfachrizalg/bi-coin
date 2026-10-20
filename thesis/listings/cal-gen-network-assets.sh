#!/usr/bin/env bash
# Study excerpt from network/bootstrap-org.sh, run with ORG=centralbank: CentralBankMSP
# identities are enrolled from ca.centralbank. Caliper connection profiles are
# written at run time by benchmark/compliance/caliper-config.js.
set -euo pipefail

ORG="${1:?usage: bootstrap-org.sh centralbank|distributor|validator|enduser}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NETWORK_DIR="$SCRIPT_DIR"
FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
FABRIC_CA_CLIENT="$FABRIC_SAMPLES/bin/fabric-ca-client"
# ...
DOMAIN="$ORG.bi-coin"
CA_ENDPOINT="127.0.0.1:$CA_PORT"
CA_NAME="ca-$ORG"
ORG_DIR="$NETWORK_DIR/organizations/peerOrganizations/$DOMAIN"
ORDERER_DIR="$NETWORK_DIR/organizations/ordererOrganizations/centralbank.bi-coin/orderers/orderer.centralbank.bi-coin"
CLIENT_DIR="$NETWORK_DIR/ca-client/$ORG"

: "${CA_ADMIN_USER:?set CA_ADMIN_USER for the local $ORG CA}"
: "${CA_ADMIN_SECRET:?set CA_ADMIN_SECRET for the local $ORG CA}"
# ...
register_enroll admin admin "$ORG_DIR/users/Admin@$DOMAIN/msp"
for i in $(seq 1 "$USER_COUNT"); do
  register_enroll "user$i" client "$ORG_DIR/users/User$i@$DOMAIN/msp"
done
# ...
register_node peer0 peer "$ORG_DIR/peers/peer0.$DOMAIN" "peer0.$DOMAIN,localhost,127.0.0.1"
if [[ "$ORG" == centralbank ]]; then
  mkdir -p "$ORDERER_DIR"
  register_node orderer orderer "$ORDERER_DIR" "orderer.$DOMAIN,localhost,127.0.0.1"
fi
# ...
write_msp_config "$ORG_DIR/msp"
for local_msp in "${local_msps[@]}"; do
  write_msp_config "$local_msp"
done

echo "$DOMAIN materials created under $ORG_DIR."
