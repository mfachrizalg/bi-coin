#!/usr/bin/env bash
# Study excerpt from network/study/bootstrap-centralbank.sh: CentralBankMSP
# identities are enrolled from ca.centralbank. Caliper connection profiles are
# written at run time by benchmark/compliance/caliper-config.js.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NETWORK_DIR="$SCRIPT_DIR"
CRYPTO_DIR="$NETWORK_DIR/organizations/peerOrganizations/centralbank.rupiah.study"
ORDERER_DIR="$NETWORK_DIR/organizations/ordererOrganizations/centralbank.rupiah.study/orderers/orderer.centralbank.rupiah.study"
FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
FABRIC_CA_CLIENT="$FABRIC_SAMPLES/bin/fabric-ca-client"
CA_ENDPOINT="127.0.0.1:17054"
CA_NAME="ca-centralbank"
DOMAIN="centralbank.rupiah.study"

: "${STUDY_CA_ADMIN_USER:?set STUDY_CA_ADMIN_USER for the local study CA}"
: "${STUDY_CA_ADMIN_SECRET:?set STUDY_CA_ADMIN_SECRET for the local study CA}"
# ...
register_enroll admin admin "$CRYPTO_DIR/users/Admin@$DOMAIN/msp"
register_enroll user1 client "$CRYPTO_DIR/users/User1@$DOMAIN/msp"
register_enroll user2 client "$CRYPTO_DIR/users/User2@$DOMAIN/msp"
# ...
register_node peer0 peer "$CRYPTO_DIR/peers/peer0.$DOMAIN" "peer0.$DOMAIN,localhost,127.0.0.1"
register_node orderer orderer "$ORDERER_DIR" "orderer.$DOMAIN,localhost,127.0.0.1"
# ...
write_msp_config "$CRYPTO_DIR/msp"
for local_msp in "$CRYPTO_DIR/users/Admin@$DOMAIN/msp" "$CRYPTO_DIR/peers/peer0.$DOMAIN/msp" "$CRYPTO_DIR/users/User1@$DOMAIN/msp" "$CRYPTO_DIR/users/User2@$DOMAIN/msp" "$ORDERER_DIR/msp"; do
  write_msp_config "$local_msp"
done

echo "CentralBankMSP materials created under $NETWORK_DIR/organizations."
