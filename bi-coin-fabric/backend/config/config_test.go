package config

import "testing"

func TestValidateRejectsMissingSecretsAndSchema(t *testing.T) {
	cfg := &Config{
		DatabaseURL:           "postgres://example",
		AuthJWTSecret:         "short",
		ContractSchemaVersion: "v2",
		AuthTokenTTL:          1,
	}

	if err := cfg.Validate(); err == nil {
		t.Fatal("expected invalid config")
	}
}
