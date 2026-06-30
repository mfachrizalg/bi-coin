#!/bin/bash
# Generates Caliper connection profiles + stable identity files for the garuda network.
# Idempotent; safe to re-run after the network is up. Run from repo root.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ORG_ROOT="$PROJECT_DIR/network/organizations/peerOrganizations"

# org | OrgName | MSPID | peerPort
ORGS=(
  "bi|BankIndonesiaOrg|BankIndonesiaOrgMSP|7051"
  "himbara|HimbaraBankOrg|HimbaraBankOrgMSP|9051"
  "commercial|CommercialBankOrg|CommercialBankOrgMSP|11051"
)

for entry in "${ORGS[@]}"; do
  IFS='|' read -r ORG ORGNAME MSPID PORT <<< "$entry"
  DOMAIN="${ORG}.paynet"
  ORG_DIR="$ORG_ROOT/$DOMAIN"
  PEER="peer0.$DOMAIN"
  TLS_CA="$ORG_DIR/peers/$PEER/tls/ca.crt"
  USER_MSP="$ORG_DIR/users/User1@$DOMAIN/msp"

  # Stable identity filenames (cryptogen emits hashed keystore names).
  cp "$USER_MSP/signcerts/User1@$DOMAIN-cert.pem" "$USER_MSP/signcerts/cert.pem"
  cp "$USER_MSP/keystore/"*_sk "$USER_MSP/keystore/key.pem"

  cat > "$ORG_DIR/connection-$ORG.json" <<EOF
{
  "name": "$ORG-paynet",
  "version": "1.0.0",
  "client": { "organization": "$ORGNAME" },
  "channels": {
    "mychannel": { "peers": { "$PEER": {} } }
  },
  "organizations": {
    "$ORGNAME": { "mspid": "$MSPID", "peers": ["$PEER"] }
  },
  "peers": {
    "$PEER": {
      "url": "grpcs://localhost:$PORT",
      "tlsCACerts": { "path": "$TLS_CA" },
      "grpcOptions": {
        "ssl-target-name-override": "$PEER",
        "hostnameOverride": "$PEER"
      }
    }
  }
}
EOF
  echo "Generated connection-$ORG.json + stable identity for $MSPID"
done
