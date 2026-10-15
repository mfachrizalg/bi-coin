package services

import (
	"crypto"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"os"
	"strings"

	"github.com/hyperledger/fabric-gateway/pkg/client"
	"github.com/hyperledger/fabric-gateway/pkg/identity"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

const (
	studyMonetaryChaincode = "rupiah-monetary"
	studyControlsChaincode = "rupiah-controls"
	studyPaymentsChaincode = "rupiah-payments"
)

type StudyLedgerService struct {
	identities map[string]config.FabricStudyIdentity
	contracts  map[string]map[string]FabricContract
	closers    []func() error
}

func NewStudyLedgerService(cfg *config.Config) (*StudyLedgerService, error) {
	if strings.TrimSpace(cfg.FabricStudyIdentitiesJSON) == "" {
		return nil, nil
	}
	identities, err := cfg.ParseFabricStudyIdentities()
	if err != nil {
		return nil, err
	}
	service := &StudyLedgerService{
		identities: identities,
		contracts:  make(map[string]map[string]FabricContract, len(identities)),
	}
	for username, studyIdentity := range identities {
		contracts, closeFn, err := connectStudyContracts(studyIdentity, cfg.StudyChannelName)
		if err != nil {
			_ = service.Close()
			return nil, fmt.Errorf("study identity %s: %w", username, err)
		}
		service.contracts[username] = contracts
		service.closers = append(service.closers, closeFn)
	}
	return service, nil
}

func connectStudyContracts(studyIdentity config.FabricStudyIdentity, channelName string) (map[string]FabricContract, func() error, error) {
	gatewayConfig := config.FabricGateway{
		MSPID:        studyIdentity.MSPID,
		PeerEndpoint: studyIdentity.PeerEndpoint,
		GatewayPeer:  studyIdentity.GatewayPeer,
		CertPath:     studyIdentity.CertPath,
		KeyPath:      studyIdentity.KeyPath,
		TLSCertPath:  studyIdentity.TLSCertPath,
	}
	creds, err := credentials.NewClientTLSFromFile(gatewayConfig.TLSCertPath, gatewayTLSServerName(gatewayConfig.GatewayPeer))
	if err != nil {
		return nil, nil, fmt.Errorf("tls creds: %w", err)
	}
	clientConn, err := grpc.NewClient(gatewayConfig.PeerEndpoint, grpc.WithTransportCredentials(creds))
	if err != nil {
		return nil, nil, fmt.Errorf("grpc tls dial: %w", err)
	}
	id, err := loadIdentity(gatewayConfig)
	if err != nil {
		_ = clientConn.Close()
		return nil, nil, fmt.Errorf("identity: %w", err)
	}
	sign, err := loadStudySigner(gatewayConfig.KeyPath)
	if err != nil {
		_ = clientConn.Close()
		return nil, nil, fmt.Errorf("signer: %w", err)
	}
	gw, err := client.Connect(id, client.WithSign(sign), client.WithClientConnection(clientConn))
	if err != nil {
		_ = clientConn.Close()
		return nil, nil, fmt.Errorf("gateway connect: %w", err)
	}
	network := gw.GetNetwork(channelName)
	contracts := map[string]FabricContract{
		studyMonetaryChaincode: network.GetContract(studyMonetaryChaincode),
		studyControlsChaincode: network.GetContract(studyControlsChaincode),
		studyPaymentsChaincode: network.GetContract(studyPaymentsChaincode),
	}
	return contracts, func() error {
		gw.Close()
		return clientConn.Close()
	}, nil
}

func loadStudySigner(keyPath string) (identity.Sign, error) {
	keyPEM, err := os.ReadFile(keyPath)
	if err != nil {
		return nil, fmt.Errorf("read key: %w", err)
	}
	block, _ := pem.Decode(keyPEM)
	if block == nil {
		return nil, fmt.Errorf("failed to decode key PEM")
	}
	var parsed any
	switch block.Type {
	case "PRIVATE KEY":
		parsed, err = x509.ParsePKCS8PrivateKey(block.Bytes)
	case "EC PRIVATE KEY":
		parsed, err = x509.ParseECPrivateKey(block.Bytes)
	case "RSA PRIVATE KEY":
		parsed, err = x509.ParsePKCS1PrivateKey(block.Bytes)
	default:
		return nil, fmt.Errorf("unsupported private key type %q", block.Type)
	}
	if err != nil {
		return nil, fmt.Errorf("parse private key: %w", err)
	}
	signer, ok := parsed.(crypto.Signer)
	if !ok {
		return nil, fmt.Errorf("private key does not implement crypto.Signer")
	}
	return identity.NewPrivateKeySign(signer)
}

func (s *StudyLedgerService) IdentityMSP(username string) (string, error) {
	identity, ok := s.identities[username]
	if !ok {
		return "", Forbidden("study Fabric identity is not configured")
	}
	return identity.MSPID, nil
}

func (s *StudyLedgerService) Submit(username string, expectedMSP string, chaincode string, transaction string, args ...string) ([]byte, error) {
	contract, err := s.resolveContract(username, expectedMSP, chaincode)
	if err != nil {
		return nil, err
	}
	result, err := contract.SubmitTransaction(transaction, args...)
	if err != nil {
		return nil, Internal("study ledger transaction failed", err)
	}
	return result, nil
}

func (s *StudyLedgerService) Evaluate(username string, expectedMSP string, chaincode string, transaction string, args ...string) ([]byte, error) {
	contract, err := s.resolveContract(username, expectedMSP, chaincode)
	if err != nil {
		return nil, err
	}
	result, err := contract.EvaluateTransaction(transaction, args...)
	if err != nil {
		return nil, Internal("study ledger query failed", err)
	}
	return result, nil
}

func (s *StudyLedgerService) resolveContract(username string, expectedMSP string, chaincode string) (FabricContract, error) {
	if s == nil {
		return nil, Internal("study ledger is not configured", nil)
	}
	identity, ok := s.identities[username]
	if !ok {
		return nil, Forbidden("study Fabric identity is not configured")
	}
	if identity.MSPID != expectedMSP {
		return nil, Forbidden("study Fabric identity does not match the required organization")
	}
	byChaincode := s.contracts[username]
	contract := byChaincode[chaincode]
	if contract == nil {
		return nil, Internal("study chaincode is not configured", nil)
	}
	return contract, nil
}

func (s *StudyLedgerService) Close() error {
	if s == nil {
		return nil
	}
	var first error
	for _, closeFn := range s.closers {
		if err := closeFn(); err != nil && first == nil {
			first = err
		}
	}
	s.closers = nil
	return first
}
