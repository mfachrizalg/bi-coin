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

func TestLoadMonitoringThresholds(t *testing.T) {
	cfg := Load()
	if cfg.MonitorUnverifiedAlertPercent != 80 || cfg.MonitorVelocityMaxTransfers != 10 ||
		cfg.MonitorStructuringMinTransfers != 3 || cfg.MonitorStructuringBandPercent != 10 {
		t.Fatalf("default monitoring thresholds = %+v", cfg)
	}
	t.Setenv("MONITOR_VELOCITY_MAX_TRANSFERS_24H", "25")
	t.Setenv("MONITOR_UNVERIFIED_ALERT_PERCENT", "not a number")
	cfg = Load()
	if cfg.MonitorVelocityMaxTransfers != 25 || cfg.MonitorUnverifiedAlertPercent != 80 {
		t.Fatalf("env override = %d, invalid value fallback = %d", cfg.MonitorVelocityMaxTransfers, cfg.MonitorUnverifiedAlertPercent)
	}
}
