package config

import "testing"

func TestParseFabricStudyIdentitiesAllowsManyUsersPerMSP(t *testing.T) {
	cfg := &Config{FabricStudyIdentitiesJSON: `[
		{"username":"alice","msp_id":"EndUserMSP","peer_endpoint":"localhost:20051","cert_path":"alice-cert","key_path":"alice-key","tls_cert_path":"enduser-ca"},
		{"username":"merchant","msp_id":"EndUserMSP","peer_endpoint":"localhost:20051","cert_path":"merchant-cert","key_path":"merchant-key","tls_cert_path":"enduser-ca"}
	]`}
	identities, err := cfg.ParseFabricStudyIdentities()
	if err != nil {
		t.Fatal(err)
	}
	if len(identities) != 2 || identities["alice"].MSPID != "EndUserMSP" {
		t.Fatalf("unexpected identity map: %#v", identities)
	}
}

func TestParseFabricStudyIdentitiesRejectsDuplicateUsernames(t *testing.T) {
	identity := `{"username":"alice","msp_id":"EndUserMSP","peer_endpoint":"localhost:20051","cert_path":"cert","key_path":"key","tls_cert_path":"ca"}`
	cfg := &Config{FabricStudyIdentitiesJSON: `[` + identity + `,` + identity + `]`}
	if _, err := cfg.ParseFabricStudyIdentities(); err == nil {
		t.Fatal("expected duplicate username to be rejected")
	}
}

func TestParseFabricStudyIdentitiesRejectsUnknownMSP(t *testing.T) {
	cfg := &Config{FabricStudyIdentitiesJSON: `[{"username":"alice","msp_id":"LegacyMSP","peer_endpoint":"localhost:20051","cert_path":"cert","key_path":"key","tls_cert_path":"ca"}]`}
	if _, err := cfg.ParseFabricStudyIdentities(); err == nil {
		t.Fatal("expected unknown MSP to be rejected")
	}
}
