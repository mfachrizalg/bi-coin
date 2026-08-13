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
	MSPID          string   `json:"msp_id"`
	PeerEndpoint   string   `json:"peer_endpoint"`
	GatewayPeer    string   `json:"gateway_peer"`
	CertPath       string   `json:"cert_path"`
	KeyPath        string   `json:"key_path"`
	TLSCertPath    string   `json:"tls_cert_path"`
	AllowedRoles   []string `json:"allowed_roles,omitempty"`
	ParticipantID  string   `json:"participant_id,omitempty"`
	CustodianMSPID string   `json:"custodian_msp_id,omitempty"`
}

type Config struct {
	Port          string
	MSPID         string
	CertPath      string
	KeyPath       string
	TLSCertPath   string
	PeerEndpoint  string
	GatewayPeer   string
	ChannelName   string
	ChaincodeName string
	DatabaseURL   string

	AuthJWTSecret          string
	AuthTokenTTL           time.Duration
	AuthBootstrapUsersJSON string
	KycHashSecret          string
	FabricGatewaysJSON     string
	ContractSchemaVersion  string
	MaxBodyBytes           int64
	ReadTimeout            time.Duration
	ReadHeaderTimeout      time.Duration
	WriteTimeout           time.Duration
	IdleTimeout            time.Duration

	// Role-based API keys
	PublicAPIKey        string
	AuthenticatedAPIKey string
	KycVerifiedAPIKey   string
	BankPjpAPIKey       string
	BankIndonesiaAPIKey string
	MerchantAPIKey      string
	SupervisorAPIKey    string
}

func Load() *Config {
	return &Config{
		Port:          getEnv("PORT", "8080"),
		MSPID:         getEnv("FABRIC_MSP_ID", ""),
		CertPath:      getEnv("FABRIC_CERT_PATH", ""),
		KeyPath:       getEnv("FABRIC_KEY_PATH", ""),
		TLSCertPath:   getEnv("FABRIC_TLS_CERT_PATH", ""),
		PeerEndpoint:  getEnv("FABRIC_PEER_ENDPOINT", ""),
		GatewayPeer:   getEnv("FABRIC_GATEWAY_PEER", ""),
		ChannelName:   getEnv("FABRIC_CHANNEL_NAME", "mychannel"),
		ChaincodeName: getEnv("FABRIC_CHAINCODE_NAME", "digital-rupiah"),
		DatabaseURL:   getEnv("DATABASE_URL", ""),

		AuthJWTSecret:          getEnv("AUTH_JWT_SECRET", ""),
		AuthTokenTTL:           time.Duration(getEnvInt("AUTH_TOKEN_TTL_SECONDS", 3600)) * time.Second,
		AuthBootstrapUsersJSON: getEnv("AUTH_BOOTSTRAP_USERS_JSON", ""),
		KycHashSecret:          getEnv("KYC_HASH_SECRET", ""),
		FabricGatewaysJSON:     getEnv("FABRIC_GATEWAYS_JSON", ""),
		ContractSchemaVersion:  getEnv("CONTRACT_SCHEMA_VERSION", ""),
		MaxBodyBytes:           int64(getEnvInt("HTTP_MAX_BODY_BYTES", 1<<20)),
		ReadTimeout:            time.Duration(getEnvInt("HTTP_READ_TIMEOUT_SECONDS", 15)) * time.Second,
		ReadHeaderTimeout:      time.Duration(getEnvInt("HTTP_READ_HEADER_TIMEOUT_SECONDS", 5)) * time.Second,
		WriteTimeout:           time.Duration(getEnvInt("HTTP_WRITE_TIMEOUT_SECONDS", 30)) * time.Second,
		IdleTimeout:            time.Duration(getEnvInt("HTTP_IDLE_TIMEOUT_SECONDS", 60)) * time.Second,

		PublicAPIKey:        getEnv("PUBLIC_API_KEY", ""),
		AuthenticatedAPIKey: getEnv("AUTHENTICATED_API_KEY", ""),
		KycVerifiedAPIKey:   getEnv("KYC_VERIFIED_API_KEY", ""),
		BankPjpAPIKey:       getEnv("BANK_PJP_API_KEY", ""),
		BankIndonesiaAPIKey: getEnv("BANK_INDONESIA_API_KEY", ""),
		MerchantAPIKey:      getEnv("MERCHANT_API_KEY", ""),
		SupervisorAPIKey:    getEnv("SUPERVISOR_API_KEY", ""),
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
	if strings.TrimSpace(c.KycHashSecret) == "" {
		return fmt.Errorf("KYC_HASH_SECRET is required")
	}
	if c.AuthTokenTTL <= 0 {
		return fmt.Errorf("AUTH_TOKEN_TTL_SECONDS must be positive")
	}
	if _, err := c.ParseFabricGateways(); err != nil {
		return err
	}
	return nil
}

func (c *Config) ParseFabricGateways() (map[string]FabricGateway, error) {
	if strings.TrimSpace(c.FabricGatewaysJSON) == "" {
		return nil, fmt.Errorf("FABRIC_GATEWAYS_JSON is required")
	}
	var gateways []FabricGateway
	if err := json.Unmarshal([]byte(c.FabricGatewaysJSON), &gateways); err != nil {
		return nil, fmt.Errorf("FABRIC_GATEWAYS_JSON: %w", err)
	}
	if len(gateways) == 0 {
		return nil, fmt.Errorf("FABRIC_GATEWAYS_JSON must contain at least one gateway")
	}
	byMSP := make(map[string]FabricGateway, len(gateways))
	for _, gateway := range gateways {
		if strings.TrimSpace(gateway.MSPID) == "" {
			return nil, fmt.Errorf("FABRIC_GATEWAYS_JSON gateway msp_id is required")
		}
		if strings.TrimSpace(gateway.PeerEndpoint) == "" || strings.TrimSpace(gateway.CertPath) == "" || strings.TrimSpace(gateway.KeyPath) == "" || strings.TrimSpace(gateway.TLSCertPath) == "" {
			return nil, fmt.Errorf("FABRIC_GATEWAYS_JSON gateway %s is incomplete", gateway.MSPID)
		}
		if _, exists := byMSP[gateway.MSPID]; exists {
			return nil, fmt.Errorf("FABRIC_GATEWAYS_JSON duplicate msp_id %s", gateway.MSPID)
		}
		byMSP[gateway.MSPID] = gateway
	}
	return byMSP, nil
}

func (c *Config) ResolveGateway(mspID string) (FabricGateway, error) {
	gateways, err := c.ParseFabricGateways()
	if err != nil {
		return FabricGateway{}, err
	}
	if mspID == "" {
		mspID = c.MSPID
	}
	gateway, ok := gateways[mspID]
	if !ok {
		return FabricGateway{}, fmt.Errorf("FABRIC_GATEWAYS_JSON missing msp_id %s", mspID)
	}
	return gateway, nil
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
