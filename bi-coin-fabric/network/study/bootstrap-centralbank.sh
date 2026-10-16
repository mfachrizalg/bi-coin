#!/usr/bin/env bash
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

if [[ -f "$CRYPTO_DIR/msp/config.yaml" && -f "$ORDERER_DIR/msp/config.yaml" ]]; then
  echo "CentralBankMSP materials already exist."
  exit 0
fi
if [[ -e "$CRYPTO_DIR" || -e "$ORDERER_DIR" ]]; then
  echo "Partial CentralBankMSP material exists; refusing to overwrite it." >&2
  exit 1
fi

mkdir -p "$CRYPTO_DIR/users/Admin@$DOMAIN" "$CRYPTO_DIR/peers/peer0.$DOMAIN" "$ORDERER_DIR"
umask 077
ADMIN_BOOTSTRAP_DIR="$NETWORK_DIR/ca-client"
mkdir -p "$ADMIN_BOOTSTRAP_DIR"
export FABRIC_CA_CLIENT_HOME="$ADMIN_BOOTSTRAP_DIR"
if [[ ! -f "$ADMIN_BOOTSTRAP_DIR/msp/signcerts/cert.pem" ]]; then
	admin_enrolled=false
	for _ in $(seq 1 30); do
		if "$FABRIC_CA_CLIENT" enroll \
			-u "http://$STUDY_CA_ADMIN_USER:$STUDY_CA_ADMIN_SECRET@$CA_ENDPOINT" \
			--caname "$CA_NAME" \
			--mspdir "$ADMIN_BOOTSTRAP_DIR/msp" >/dev/null 2>&1; then
			admin_enrolled=true
			break
		fi
		sleep 1
	done
	if [[ "$admin_enrolled" != true ]]; then
		echo "CentralBank CA did not accept the bootstrap identity." >&2
		exit 1
	fi
fi

identity_secret() {
	printf '%s' "$1" | openssl dgst -sha256 -hmac "$STUDY_CA_ADMIN_SECRET" | awk '{print $NF}'
}

register_enroll() {
  local name="$1" type="$2" target="$3" secret
  secret="$(identity_secret "$name:$type")"
  if ! output="$("$FABRIC_CA_CLIENT" register \
    --caname "$CA_NAME" \
    --id.name "$name" \
    --id.secret "$secret" \
    --id.type "$type" \
    --id.affiliation org1.department1 2>&1)"; then
    if [[ "$output" != *"already registered"* && "$output" != *"already exists"* ]]; then
      printf '%s\n' "$output" >&2
      return 1
    fi
  fi
	"$FABRIC_CA_CLIENT" enroll \
		-u "http://$name:$secret@$CA_ENDPOINT" \
		--caname "$CA_NAME" \
		--mspdir "$target"
}

register_enroll admin admin "$CRYPTO_DIR/users/Admin@$DOMAIN/msp"
register_enroll user1 client "$CRYPTO_DIR/users/User1@$DOMAIN/msp"
register_enroll user2 client "$CRYPTO_DIR/users/User2@$DOMAIN/msp"

register_node() {
	local name="$1" type="$2" target="$3" hosts="$4" secret tls_dir
	secret="$(identity_secret "$name:$type")"
	if ! output="$("$FABRIC_CA_CLIENT" register \
		--caname "$CA_NAME" \
		--id.name "$name" \
		--id.secret "$secret" \
		--id.type "$type" \
		--id.maxenrollments 2 \
		--id.affiliation org1.department1 2>&1)"; then
		if [[ "$output" != *"already registered"* && "$output" != *"already exists"* ]]; then
			printf '%s\n' "$output" >&2
			return 1
		fi
	fi
	"$FABRIC_CA_CLIENT" enroll \
		-u "http://$name:$secret@$CA_ENDPOINT" \
		--caname "$CA_NAME" \
		--mspdir "$target/msp"
	tls_dir="$NETWORK_DIR/ca-client/tls-$name"
	"$FABRIC_CA_CLIENT" enroll \
		-u "http://$name:$secret@$CA_ENDPOINT" \
		--caname "$CA_NAME" \
		--enrollment.profile tls \
		--csr.hosts "$hosts" \
		--mspdir "$tls_dir"
  mkdir -p "$target/tls"
  cp "$tls_dir/signcerts/cert.pem" "$target/tls/server.crt"
	cp "$(find "$tls_dir/keystore" -type f -print -quit)" "$target/tls/server.key"
	cp "$(find "$tls_dir/tlscacerts" -type f -print -quit)" "$target/tls/ca.crt"
}

register_node peer0 peer "$CRYPTO_DIR/peers/peer0.$DOMAIN" "peer0.$DOMAIN,localhost,127.0.0.1"
register_node orderer orderer "$ORDERER_DIR" "orderer.$DOMAIN,localhost,127.0.0.1"

CA_CERT="$(find "$CRYPTO_DIR/users/Admin@$DOMAIN/msp/cacerts" -type f -print -quit)"
TLS_CA_CERT="$(find "$NETWORK_DIR/ca-client/tls-peer0/tlscacerts" -type f -print -quit)"
if [[ -z "$CA_CERT" || -z "$TLS_CA_CERT" ]]; then
  echo "CentralBank CA certificates were not created." >&2
  exit 1
fi

write_msp_config() {
  local msp_dir="$1"
  mkdir -p "$msp_dir/cacerts" "$msp_dir/tlscacerts"
  cp "$CA_CERT" "$msp_dir/cacerts/ca-cert.pem"
  cp "$TLS_CA_CERT" "$msp_dir/tlscacerts/tlsca-cert.pem"
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

write_msp_config "$CRYPTO_DIR/msp"
for local_msp in "$CRYPTO_DIR/users/Admin@$DOMAIN/msp" "$CRYPTO_DIR/peers/peer0.$DOMAIN/msp" "$CRYPTO_DIR/users/User1@$DOMAIN/msp" "$CRYPTO_DIR/users/User2@$DOMAIN/msp" "$ORDERER_DIR/msp"; do
  write_msp_config "$local_msp"
done

echo "CentralBankMSP materials created under $NETWORK_DIR/organizations."
