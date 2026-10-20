#!/usr/bin/env bash
set -euo pipefail

ORG="${1:?usage: bootstrap-org.sh centralbank|distributor|validator|enduser}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NETWORK_DIR="$SCRIPT_DIR"
FABRIC_SAMPLES="${FABRIC_SAMPLES:-$HOME/fabric-samples}"
FABRIC_CA_CLIENT="$FABRIC_SAMPLES/bin/fabric-ca-client"

case "$ORG" in
  centralbank) CA_PORT=17054; USER_COUNT=2 ;;
  distributor) CA_PORT=18054; USER_COUNT=4 ;;
  validator) CA_PORT=19054; USER_COUNT=1 ;;
  enduser) CA_PORT=20054; USER_COUNT=8 ;;
  *) echo "unknown org: $ORG" >&2; exit 2 ;;
esac
DOMAIN="$ORG.bi-coin"
CA_ENDPOINT="127.0.0.1:$CA_PORT"
CA_NAME="ca-$ORG"
ORG_DIR="$NETWORK_DIR/organizations/peerOrganizations/$DOMAIN"
ORDERER_DIR="$NETWORK_DIR/organizations/ordererOrganizations/centralbank.bi-coin/orderers/orderer.centralbank.bi-coin"
CLIENT_DIR="$NETWORK_DIR/ca-client/$ORG"

: "${CA_ADMIN_USER:?set CA_ADMIN_USER for the local $ORG CA}"
: "${CA_ADMIN_SECRET:?set CA_ADMIN_SECRET for the local $ORG CA}"

if [[ -f "$ORG_DIR/msp/config.yaml" ]]; then
  echo "$DOMAIN MSP materials already exist."
  exit 0
fi
if [[ -e "$ORG_DIR" ]]; then
  echo "Partial $DOMAIN MSP material exists; refusing to overwrite it." >&2
  exit 1
fi

mkdir -p "$ORG_DIR/users/Admin@$DOMAIN" "$ORG_DIR/peers/peer0.$DOMAIN"
umask 077
mkdir -p "$CLIENT_DIR"
export FABRIC_CA_CLIENT_HOME="$CLIENT_DIR"
if [[ ! -f "$CLIENT_DIR/msp/signcerts/cert.pem" ]]; then
	admin_enrolled=false
	for _ in $(seq 1 30); do
		if "$FABRIC_CA_CLIENT" enroll \
			-u "http://$CA_ADMIN_USER:$CA_ADMIN_SECRET@$CA_ENDPOINT" \
			--caname "$CA_NAME" \
			--mspdir "$CLIENT_DIR/msp" >/dev/null 2>&1; then
			admin_enrolled=true
			break
		fi
		sleep 1
	done
	if [[ "$admin_enrolled" != true ]]; then
		echo "$DOMAIN CA did not accept the bootstrap identity." >&2
		exit 1
	fi
fi

identity_secret() {
	printf '%s' "$1" | openssl dgst -sha256 -hmac "$CA_ADMIN_SECRET" | awk '{print $NF}'
}

register_enroll() {
  local name="$1" type="$2" target="$3" attrs="" secret
  secret="$(identity_secret "$name:$type")"
  # Each Distributor identity names the bank it acts for; chaincode checks this attribute.
  case "$ORG:$name" in
    distributor:user4) attrs="distributor_id=wholesale-bank:ecert" ;;
    distributor:*) attrs="distributor_id=retail-bank:ecert" ;;
  esac
  if ! output="$("$FABRIC_CA_CLIENT" register \
    --caname "$CA_NAME" \
    --id.name "$name" \
    --id.secret "$secret" \
    --id.type "$type" \
    ${attrs:+--id.attrs "$attrs"} \
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

register_enroll admin admin "$ORG_DIR/users/Admin@$DOMAIN/msp"
for i in $(seq 1 "$USER_COUNT"); do
  register_enroll "user$i" client "$ORG_DIR/users/User$i@$DOMAIN/msp"
done

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
	tls_dir="$CLIENT_DIR/tls-$name"
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

register_node peer0 peer "$ORG_DIR/peers/peer0.$DOMAIN" "peer0.$DOMAIN,localhost,127.0.0.1"
if [[ "$ORG" == centralbank ]]; then
  mkdir -p "$ORDERER_DIR"
  register_node orderer orderer "$ORDERER_DIR" "orderer.$DOMAIN,localhost,127.0.0.1"
fi

CA_CERT="$(find "$ORG_DIR/users/Admin@$DOMAIN/msp/cacerts" -type f -print -quit)"
TLS_CA_CERT="$(find "$CLIENT_DIR/tls-peer0/tlscacerts" -type f -print -quit)"
if [[ -z "$CA_CERT" || -z "$TLS_CA_CERT" ]]; then
  echo "$DOMAIN CA certificates were not created." >&2
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

local_msps=("$ORG_DIR/users/Admin@$DOMAIN/msp" "$ORG_DIR/peers/peer0.$DOMAIN/msp")
for i in $(seq 1 "$USER_COUNT"); do
  local_msps+=("$ORG_DIR/users/User$i@$DOMAIN/msp")
done
if [[ "$ORG" == centralbank ]]; then
  local_msps+=("$ORDERER_DIR/msp")
fi

write_msp_config "$ORG_DIR/msp"
for local_msp in "${local_msps[@]}"; do
  write_msp_config "$local_msp"
done

echo "$DOMAIN materials created under $ORG_DIR."
