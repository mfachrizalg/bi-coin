package config

import (
	"os"
	"strconv"
	"time"
)

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
		MSPID:         getEnv("FABRIC_MSP_ID", "Org1MSP"),
		CertPath:      getEnv("FABRIC_CERT_PATH", "/etc/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/cert.pem"),
		KeyPath:       getEnv("FABRIC_KEY_PATH", "/etc/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/key.pem"),
		TLSCertPath:   getEnv("FABRIC_TLS_CERT_PATH", "/etc/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"),
		PeerEndpoint:  getEnv("FABRIC_PEER_ENDPOINT", "peer0.org1.example.com:7051"),
		GatewayPeer:   getEnv("FABRIC_GATEWAY_PEER", "peer0.org1.example.com:7051"),
		ChannelName:   getEnv("FABRIC_CHANNEL_NAME", "mychannel"),
		ChaincodeName: getEnv("FABRIC_CHAINCODE_NAME", "digital-rupiah"),
		DatabaseURL:   getEnv("DATABASE_URL", "postgres://bicoin:bicoin@localhost:5433/bicoin?sslmode=disable"),

		AuthJWTSecret:          getEnv("AUTH_JWT_SECRET", "dev-auth-secret-change-me"),
		AuthTokenTTL:           time.Duration(getEnvInt("AUTH_TOKEN_TTL_SECONDS", 3600)) * time.Second,
		AuthBootstrapUsersJSON: getEnv("AUTH_BOOTSTRAP_USERS_JSON", defaultBootstrapUsers()),
		KycHashSecret:          getEnv("KYC_HASH_SECRET", "dev-kyc-hash-secret-change-me"),

		PublicAPIKey:        getEnv("PUBLIC_API_KEY", "dev-public-key"),
		AuthenticatedAPIKey: getEnv("AUTHENTICATED_API_KEY", "dev-auth-key"),
		KycVerifiedAPIKey:   getEnv("KYC_VERIFIED_API_KEY", "dev-kyc-key"),
		BankPjpAPIKey:       getEnv("BANK_PJP_API_KEY", "dev-bank-pjp-key"),
		BankIndonesiaAPIKey: getEnv("BANK_INDONESIA_API_KEY", "dev-bi-key"),
		MerchantAPIKey:      getEnv("MERCHANT_API_KEY", "dev-merchant-key"),
		SupervisorAPIKey:    getEnv("SUPERVISOR_API_KEY", "dev-supervisor-key"),
	}
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

func defaultBootstrapUsers() string {
	return `[
{"username":"bi","password":"bi-password","role":"bank_indonesia"},
{"username":"pjp","password":"pjp-password","role":"bank_pjp"},
{"username":"merchant","password":"merchant-password","role":"merchant"},
{"username":"supervisor","password":"supervisor-password","role":"supervisor"},
{"username":"customer","password":"customer-password","role":"kyc_verified"}
]`
}
