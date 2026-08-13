package config

import "testing"

func TestValidateRejectsMissingSecretsAndSchema(t *testing.T) {
	cfg := &Config{
		DatabaseURL:           "postgres://example",
		AuthJWTSecret:         "short",
		KycHashSecret:         "",
		ContractSchemaVersion: "v2",
		FabricGatewaysJSON:    `[]`,
		AuthTokenTTL:          1,
	}

	if err := cfg.Validate(); err == nil {
		t.Fatal("expected invalid config")
	}
}

func TestResolveGatewayByMSP(t *testing.T) {
	cfg := &Config{
		MSPID:                 "BI-MSP",
		DatabaseURL:           "postgres://example",
		AuthJWTSecret:         "1234567890abcdef",
		KycHashSecret:         "hash-secret",
		ContractSchemaVersion: "v3",
		AuthTokenTTL:          1,
		FabricGatewaysJSON: `[
			{"msp_id":"BI-MSP","peer_endpoint":"peer0.bi:7051","cert_path":"cert.pem","key_path":"key.pem","tls_cert_path":"tls.pem"},
			{"msp_id":"PJP-MSP","peer_endpoint":"peer0.pjp:7051","cert_path":"cert2.pem","key_path":"key2.pem","tls_cert_path":"tls2.pem"}
		]`,
	}

	gateway, err := cfg.ResolveGateway("PJP-MSP")
	if err != nil {
		t.Fatalf("resolve gateway: %v", err)
	}
	if gateway.MSPID != "PJP-MSP" || gateway.PeerEndpoint != "peer0.pjp:7051" {
		t.Fatalf("gateway = %+v", gateway)
	}
}
