package config

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type FabricGateway struct {
	MSPID        string `json:"msp_id"`
	PeerEndpoint string `json:"peer_endpoint"`
	GatewayPeer  string `json:"gateway_peer"`
	CertPath     string `json:"cert_path"`
	KeyPath      string `json:"key_path"`
	TLSCertPath  string `json:"tls_cert_path"`
}

type FabricStudyIdentity struct {
	Username     string `json:"username"`
	MSPID        string `json:"msp_id"`
	PeerEndpoint string `json:"peer_endpoint"`
	GatewayPeer  string `json:"gateway_peer"`
	CertPath     string `json:"cert_path"`
	KeyPath      string `json:"key_path"`
	TLSCertPath  string `json:"tls_cert_path"`
}

type Config struct {
	Port        string
	DatabaseURL string

	AuthJWTSecret             string
	AuthTokenTTL              time.Duration
	AuthBootstrapUsersJSON    string
	FabricStudyIdentitiesJSON string
	StudyChannelName          string
	ContractSchemaVersion     string
	MaxBodyBytes              int64
	ReadTimeout               time.Duration
	ReadHeaderTimeout         time.Duration
	WriteTimeout              time.Duration
	IdleTimeout               time.Duration
}

func Load() *Config {
	return &Config{
		Port:        getEnv("PORT", "8080"),
		DatabaseURL: getEnv("DATABASE_URL", ""),

		AuthJWTSecret:             getEnv("AUTH_JWT_SECRET", ""),
		AuthTokenTTL:              time.Duration(getEnvInt("AUTH_TOKEN_TTL_SECONDS", 3600)) * time.Second,
		AuthBootstrapUsersJSON:    getEnv("AUTH_BOOTSTRAP_USERS_JSON", ""),
		FabricStudyIdentitiesJSON: getEnv("FABRIC_IDENTITIES_JSON", ""),
		StudyChannelName:          getEnv("FABRIC_CHANNEL_NAME", "bi-coin"),
		ContractSchemaVersion:     getEnv("CONTRACT_SCHEMA_VERSION", ""),
		MaxBodyBytes:              int64(getEnvInt("HTTP_MAX_BODY_BYTES", 1<<20)),
		ReadTimeout:               time.Duration(getEnvInt("HTTP_READ_TIMEOUT_SECONDS", 15)) * time.Second,
		ReadHeaderTimeout:         time.Duration(getEnvInt("HTTP_READ_HEADER_TIMEOUT_SECONDS", 5)) * time.Second,
		WriteTimeout:              time.Duration(getEnvInt("HTTP_WRITE_TIMEOUT_SECONDS", 30)) * time.Second,
		IdleTimeout:               time.Duration(getEnvInt("HTTP_IDLE_TIMEOUT_SECONDS", 60)) * time.Second,
	}
}

func (c *Config) Validate() error {
	if c.ContractSchemaVersion != "v3" {
		return fmt.Errorf("CONTRACT_SCHEMA_VERSION must be v3")
	}
	if c.DatabaseURL == "" {
		return fmt.Errorf("DATABASE_URL is required")
	}
	if len(c.AuthJWTSecret) < 16 {
		return fmt.Errorf("AUTH_JWT_SECRET must be at least 16 bytes")
	}
	if c.AuthTokenTTL <= 0 {
		return fmt.Errorf("AUTH_TOKEN_TTL_SECONDS must be positive")
	}
	if strings.TrimSpace(c.FabricStudyIdentitiesJSON) != "" {
		if _, err := c.ParseFabricStudyIdentities(); err != nil {
			return err
		}
	}
	return nil
}

func (c *Config) ParseFabricStudyIdentities() (map[string]FabricStudyIdentity, error) {
	if strings.TrimSpace(c.FabricStudyIdentitiesJSON) == "" {
		return nil, fmt.Errorf("FABRIC_IDENTITIES_JSON is required")
	}
	var identities []FabricStudyIdentity
	if err := json.Unmarshal([]byte(c.FabricStudyIdentitiesJSON), &identities); err != nil {
		return nil, fmt.Errorf("FABRIC_IDENTITIES_JSON: %w", err)
	}
	if len(identities) == 0 {
		return nil, fmt.Errorf("FABRIC_IDENTITIES_JSON must contain at least one identity")
	}
	byUsername := make(map[string]FabricStudyIdentity, len(identities))
	for _, identity := range identities {
		if strings.TrimSpace(identity.Username) == "" || !oneOfStudyMSP(identity.MSPID) {
			return nil, fmt.Errorf("FABRIC_IDENTITIES_JSON identity username and supported msp_id are required")
		}
		if strings.TrimSpace(identity.PeerEndpoint) == "" || strings.TrimSpace(identity.CertPath) == "" || strings.TrimSpace(identity.KeyPath) == "" || strings.TrimSpace(identity.TLSCertPath) == "" {
			return nil, fmt.Errorf("FABRIC_IDENTITIES_JSON identity %s is incomplete", identity.Username)
		}
		if _, exists := byUsername[identity.Username]; exists {
			return nil, fmt.Errorf("FABRIC_IDENTITIES_JSON duplicate username %s", identity.Username)
		}
		byUsername[identity.Username] = identity
	}
	return byUsername, nil
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	value, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}
	parsed, err := strconv.Atoi(value)
	if err != nil {
		return fallback
	}
	return parsed
}

func oneOfStudyMSP(mspID string) bool {
	switch mspID {
	case "CentralBankMSP", "DistributorMSP", "ValidatorMSP", "EndUserMSP":
		return true
	default:
		return false
	}
}
