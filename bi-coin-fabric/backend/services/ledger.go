package services

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"crypto/x509"
	"encoding/hex"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"os"
	"strconv"

	"github.com/google/uuid"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"

	"github.com/hyperledger/fabric-gateway/pkg/client"
	"github.com/hyperledger/fabric-gateway/pkg/identity"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/credentials/insecure"
)

type LedgerService struct {
	contract   FabricContract
	cfg        *config.Config
	kycStore   KycStore
	hashSecret string
}

type FabricContract interface {
	SubmitTransaction(name string, args ...string) ([]byte, error)
	EvaluateTransaction(name string, args ...string) ([]byte, error)
}

type KycStore interface {
	CreateRetailCustomer(ctx context.Context, req models.RetailCustomerRequest, identityHash string) (*models.RetailCustomer, error)
	ListRetailCustomers(ctx context.Context) ([]*models.RetailCustomer, error)
	SubmitKycProfile(ctx context.Context, req models.KycProfileRequest, anchor models.KycProfile) (*models.KycProfile, error)
	RefreshKycProfile(ctx context.Context, profileID string, req models.KycProviderResultRequest, anchor models.KycProfile) (*models.KycProfile, error)
	GetKycProfile(ctx context.Context, profileID string) (*models.KycProfile, error)
	ListKycProviderChecks(ctx context.Context, profileID string) ([]*models.KycProviderCheck, error)
	ListKycAuditEvents(ctx context.Context, profileID string) ([]*models.KycAuditEvent, error)
}

func NewLedgerService(cfg *config.Config) (*LedgerService, error) {
	clientConn, err := grpc.NewClient(cfg.PeerEndpoint, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, fmt.Errorf("grpc dial: %w", err)
	}

	var conn grpc.ClientConnInterface = clientConn
	if cfg.TLSCertPath != "" {
		clientConn.Close()
		creds, err := credentials.NewClientTLSFromFile(cfg.TLSCertPath, "")
		if err != nil {
			return nil, fmt.Errorf("tls creds: %w", err)
		}
		clientConn, err = grpc.NewClient(cfg.PeerEndpoint, grpc.WithTransportCredentials(creds))
		if err != nil {
			return nil, fmt.Errorf("grpc tls dial: %w", err)
		}
		conn = clientConn
	}

	id, err := loadIdentity(cfg)
	if err != nil {
		return nil, fmt.Errorf("identity: %w", err)
	}
	sign, err := loadSigner(cfg)
	if err != nil {
		return nil, fmt.Errorf("signer: %w", err)
	}

	gw, err := client.Connect(id, client.WithSign(sign), client.WithClientConnection(conn))
	if err != nil {
		return nil, fmt.Errorf("gateway connect: %w", err)
	}

	network := gw.GetNetwork(cfg.ChannelName)
	contract := network.GetContract(cfg.ChaincodeName)

	return &LedgerService{contract: contract, cfg: cfg, hashSecret: cfg.KycHashSecret}, nil
}

func NewLedgerServiceForTest(contract FabricContract, store KycStore, hashSecret string) *LedgerService {
	return &LedgerService{contract: contract, kycStore: store, hashSecret: hashSecret}
}

func (s *LedgerService) SetKycStore(store KycStore) {
	s.kycStore = store
}

func loadIdentity(cfg *config.Config) (*identity.X509Identity, error) {
	certPEM, err := os.ReadFile(cfg.CertPath)
	if err != nil {
		return nil, fmt.Errorf("read cert: %w", err)
	}
	block, _ := pem.Decode(certPEM)
	if block == nil {
		return nil, fmt.Errorf("failed to decode cert PEM")
	}
	cert, err := x509.ParseCertificate(block.Bytes)
	if err != nil {
		return nil, fmt.Errorf("parse cert: %w", err)
	}
	return identity.NewX509Identity(cfg.MSPID, cert)
}

func loadSigner(cfg *config.Config) (identity.Sign, error) {
	keyPEM, err := os.ReadFile(cfg.KeyPath)
	if err != nil {
		return nil, fmt.Errorf("read key: %w", err)
	}
	block, _ := pem.Decode(keyPEM)
	if block == nil {
		return nil, fmt.Errorf("failed to decode key PEM")
	}
	privateKey, err := x509.ParsePKCS8PrivateKey(block.Bytes)
	if err != nil {
		return nil, fmt.Errorf("parse private key: %w", err)
	}
	return identity.NewPrivateKeySign(privateKey)
}

func parseInt64(s string) (int64, error) {
	return strconv.ParseInt(s, 10, 64)
}

func (s *LedgerService) hashKycValue(value string) string {
	secret := s.hashSecret
	if secret == "" {
		secret = "dev-kyc-hash-secret-change-me"
	}
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(value))
	return hex.EncodeToString(mac.Sum(nil))
}

func (s *LedgerService) unwrap(result []byte, target interface{}) error {
	if len(result) == 0 || string(result) == "null" {
		return nil
	}
	if err := json.Unmarshal(result, target); err != nil {
		return fmt.Errorf("unmarshal: %w", err)
	}
	return nil
}

// ─── Health / Init ───────────────────────────────────────────────────────────

func (s *LedgerService) InitLedger() error {
	_, err := s.contract.SubmitTransaction("InitLedger")
	return err
}

// ─── Participants ────────────────────────────────────────────────────────────

func (s *LedgerService) SubmitParticipant(req models.OnboardingRequest) (*models.Participant, error) {
	if req.ParticipantID == "" {
		req.ParticipantID = uuid.New().String()
	}
	reserveBal := "0"
	if req.InitialReserveBalance != nil {
		reserveBal = *req.InitialReserveBalance
	}
	compliance := "pending"
	if req.ComplianceStatus != nil {
		compliance = *req.ComplianceStatus
	}
	result, err := s.contract.SubmitTransaction("SubmitParticipant",
		req.ParticipantID, req.Name, req.Domain, req.AccountID, string(req.ParticipantType), reserveBal, compliance)
	if err != nil {
		return nil, fmt.Errorf("chaincode SubmitParticipant: %w", err)
	}
	var p models.Participant
	if err := s.unwrap(result, &p); err != nil {
		return nil, err
	}
	return &p, nil
}

func (s *LedgerService) ApproveParticipant(participantID string) error {
	_, err := s.contract.SubmitTransaction("ApproveParticipant", participantID)
	return err
}

func (s *LedgerService) FreezeParticipant(participantID string) error {
	_, err := s.contract.SubmitTransaction("FreezeParticipant", participantID)
	return err
}

func (s *LedgerService) UnfreezeParticipant(participantID string) error {
	_, err := s.contract.SubmitTransaction("UnfreezeParticipant", participantID)
	return err
}

func (s *LedgerService) RejectParticipant(participantID string) error {
	_, err := s.contract.SubmitTransaction("RejectParticipant", participantID)
	return err
}

func (s *LedgerService) OffboardParticipant(participantID string) error {
	_, err := s.contract.SubmitTransaction("OffboardParticipant", participantID)
	return err
}

func (s *LedgerService) GetParticipant(participantID string) (*models.Participant, error) {
	result, err := s.contract.EvaluateTransaction("GetParticipant", participantID)
	if err != nil {
		return nil, fmt.Errorf("chaincode GetParticipant: %w", err)
	}
	var p models.Participant
	if err := s.unwrap(result, &p); err != nil {
		return nil, err
	}
	return &p, nil
}

func (s *LedgerService) ListParticipants() ([]*models.Participant, error) {
	result, err := s.contract.EvaluateTransaction("ListParticipants")
	if err != nil {
		return nil, fmt.Errorf("chaincode ListParticipants: %w", err)
	}
	var p []*models.Participant
	if err := s.unwrap(result, &p); err != nil {
		return nil, err
	}
	if p == nil {
		return []*models.Participant{}, nil
	}
	return p, nil
}

// ─── Wallets ─────────────────────────────────────────────────────────────────

func (s *LedgerService) CreateWallet(req models.CreateWalletRequest) (*models.Wallet, error) {
	walletID := fmt.Sprintf("wlt_%s", req.ParticipantID)
	result, err := s.contract.SubmitTransaction("CreateWallet", walletID, req.ParticipantID, req.Tier)
	if err != nil {
		return nil, fmt.Errorf("chaincode CreateWallet: %w", err)
	}
	var w models.Wallet
	if err := s.unwrap(result, &w); err != nil {
		return nil, err
	}
	return &w, nil
}

func (s *LedgerService) GetWallet(walletID string) (*models.Wallet, error) {
	result, err := s.contract.EvaluateTransaction("GetWallet", walletID)
	if err != nil {
		return nil, fmt.Errorf("chaincode GetWallet: %w", err)
	}
	var w models.Wallet
	if err := s.unwrap(result, &w); err != nil {
		return nil, err
	}
	return &w, nil
}

func (s *LedgerService) ListWallets(participantID string) ([]*models.Wallet, error) {
	result, err := s.contract.EvaluateTransaction("ListWallets", participantID)
	if err != nil {
		return nil, fmt.Errorf("chaincode ListWallets: %w", err)
	}
	var wallets []*models.Wallet
	if err := s.unwrap(result, &wallets); err != nil {
		return nil, err
	}
	return wallets, nil
}

// ─── Retail Customers ────────────────────────────────────────────────────────

func (s *LedgerService) CreateRetailCustomer(req models.RetailCustomerRequest) (*models.RetailCustomer, error) {
	if req.CustomerID == "" {
		req.CustomerID = uuid.New().String()
	}
	identityHash := s.hashKycValue(req.CustomerID + ":" + req.LegalName)
	if s.kycStore != nil {
		if _, err := s.kycStore.CreateRetailCustomer(context.Background(), req, identityHash); err != nil {
			return nil, fmt.Errorf("off-chain CreateRetailCustomer: %w", err)
		}
	}
	result, err := s.contract.SubmitTransaction("CreateRetailCustomer", req.CustomerID, identityHash, req.WalletAccountID, req.KycProfileID)
	if err != nil {
		return nil, fmt.Errorf("chaincode CreateRetailCustomer: %w", err)
	}
	var c models.RetailCustomer
	if err := s.unwrap(result, &c); err != nil {
		return nil, err
	}
	return &c, nil
}

func (s *LedgerService) ListRetailCustomers() ([]*models.RetailCustomer, error) {
	if s.kycStore != nil {
		return s.kycStore.ListRetailCustomers(context.Background())
	}
	result, err := s.contract.EvaluateTransaction("ListRetailCustomers")
	if err != nil {
		return nil, fmt.Errorf("chaincode ListRetailCustomers: %w", err)
	}
	var customers []*models.RetailCustomer
	if err := s.unwrap(result, &customers); err != nil {
		return nil, err
	}
	return customers, nil
}

// ─── KYC ─────────────────────────────────────────────────────────────────────

func (s *LedgerService) SubmitKycProfile(req models.KycProfileRequest) (*models.KycProfile, error) {
	if req.SubjectID == "" {
		return nil, fmt.Errorf("subject_id is required")
	}
	profileID := fmt.Sprintf("kyc_%s", uuid.New().String())
	hashes := req.DocumentHashes
	if len(hashes) == 0 && req.DocumentNumber != "" {
		hashes = []string{s.hashKycValue(req.DocumentType + ":" + req.DocumentNumber)}
	}
	anchor := models.KycProfile{
		ProfileID:         profileID,
		SubjectType:       req.SubjectType,
		SubjectID:         req.SubjectID,
		DocumentHashes:    hashes,
		Status:            models.KycPending,
		RiskLevel:         models.RiskLow,
		DueDiligenceLevel: models.DueDiligenceSimplified,
	}
	hashesJSON, _ := json.Marshal(hashes)
	if _, err := s.contract.SubmitTransaction("SubmitKycProfile",
		profileID, string(req.SubjectType), req.SubjectID, string(hashesJSON)); err != nil {
		return nil, fmt.Errorf("chaincode SubmitKycProfile: %w", err)
	}
	if s.kycStore != nil {
		profile, err := s.kycStore.SubmitKycProfile(context.Background(), req, anchor)
		if err != nil {
			return nil, fmt.Errorf("off-chain SubmitKycProfile: %w", err)
		}
		return profile, nil
	}
	return &anchor, nil
}

func (s *LedgerService) RefreshKycProfile(profileID string, req models.KycProviderResultRequest) (*models.KycProfile, error) {
	if err := validateKycDecision(req); err != nil {
		return nil, err
	}
	expires := ""
	if req.ExpiresAt != nil {
		expires = *req.ExpiresAt
	}
	hashes := req.DocumentHashes
	if len(hashes) == 0 && s.kycStore != nil {
		current, err := s.kycStore.GetKycProfile(context.Background(), profileID)
		if err == nil && current != nil {
			hashes = current.DocumentHashes
		}
	}
	anchor := models.KycProfile{
		ProfileID:         profileID,
		DocumentHashes:    hashes,
		Status:            req.Status,
		RiskLevel:         req.RiskLevel,
		DueDiligenceLevel: req.DueDiligenceLevel,
		SeniorApproval:    req.SeniorApproval,
		ExpiresAt:         req.ExpiresAt,
	}
	hashesJSON, _ := json.Marshal(hashes)
	if _, err := s.contract.SubmitTransaction("RefreshKycProfile",
		profileID, string(req.Status), string(req.RiskLevel), string(req.DueDiligenceLevel), strconv.FormatBool(req.SeniorApproval), string(hashesJSON), expires); err != nil {
		return nil, fmt.Errorf("chaincode RefreshKycProfile: %w", err)
	}
	if s.kycStore != nil {
		profile, err := s.kycStore.RefreshKycProfile(context.Background(), profileID, req, anchor)
		if err != nil {
			return nil, fmt.Errorf("off-chain RefreshKycProfile: %w", err)
		}
		return profile, nil
	}
	return &anchor, nil
}

func validateKycDecision(req models.KycProviderResultRequest) error {
	if req.Status != models.KycPending && req.Status != models.KycInReview && req.Status != models.KycApproved &&
		req.Status != models.KycRejected && req.Status != models.KycExpired && req.Status != models.KycSuspended {
		return fmt.Errorf("invalid KYC status: %s", req.Status)
	}
	if req.RiskLevel != models.RiskLow && req.RiskLevel != models.RiskMedium && req.RiskLevel != models.RiskHigh && req.RiskLevel != models.RiskProhibited {
		return fmt.Errorf("invalid KYC risk level: %s", req.RiskLevel)
	}
	if req.DueDiligenceLevel != models.DueDiligenceSimplified && req.DueDiligenceLevel != models.DueDiligenceStandard && req.DueDiligenceLevel != models.DueDiligenceEnhanced {
		return fmt.Errorf("invalid due diligence level: %s", req.DueDiligenceLevel)
	}
	if req.Status == models.KycApproved && req.RiskLevel == models.RiskHigh &&
		(req.DueDiligenceLevel != models.DueDiligenceEnhanced || !req.SeniorApproval) {
		return fmt.Errorf("high-risk approval requires enhanced due diligence and senior approval")
	}
	if req.Status == models.KycApproved && req.RiskLevel == models.RiskProhibited {
		return fmt.Errorf("prohibited-risk subject cannot be approved")
	}
	return nil
}

func (s *LedgerService) GetKycProfile(profileID string) (*models.KycProfile, error) {
	if s.kycStore != nil {
		return s.kycStore.GetKycProfile(context.Background(), profileID)
	}
	result, err := s.contract.EvaluateTransaction("GetKycProfile", profileID)
	if err != nil {
		return nil, fmt.Errorf("chaincode GetKycProfile: %w", err)
	}
	var p models.KycProfile
	if err := s.unwrap(result, &p); err != nil {
		return nil, err
	}
	return &p, nil
}

func (s *LedgerService) ListKycProviderChecks(profileID string) ([]*models.KycProviderCheck, error) {
	if s.kycStore != nil {
		return s.kycStore.ListKycProviderChecks(context.Background(), profileID)
	}
	result, err := s.contract.EvaluateTransaction("ListKycProviderChecks", profileID)
	if err != nil {
		return nil, fmt.Errorf("chaincode ListKycProviderChecks: %w", err)
	}
	var checks []*models.KycProviderCheck
	if err := s.unwrap(result, &checks); err != nil {
		return nil, err
	}
	return checks, nil
}

func (s *LedgerService) ListKycAuditEvents(profileID string) ([]*models.KycAuditEvent, error) {
	if s.kycStore != nil {
		return s.kycStore.ListKycAuditEvents(context.Background(), profileID)
	}
	result, err := s.contract.EvaluateTransaction("ListKycAuditEvents", profileID)
	if err != nil {
		return nil, fmt.Errorf("chaincode ListKycAuditEvents: %w", err)
	}
	var events []*models.KycAuditEvent
	if err := s.unwrap(result, &events); err != nil {
		return nil, err
	}
	return events, nil
}

// ─── Limits ──────────────────────────────────────────────────────────────────

func (s *LedgerService) SetSystemLimit(req models.SetLimitRequest) error {
	_, err := s.contract.SubmitTransaction("SetSystemLimit", string(req.Scope), req.Value)
	return err
}

func (s *LedgerService) ListSystemLimits(scope string) ([]*models.SystemLimit, error) {
	result, err := s.contract.EvaluateTransaction("ListSystemLimits", scope)
	if err != nil {
		return nil, fmt.Errorf("chaincode ListSystemLimits: %w", err)
	}
	var limits []*models.SystemLimit
	if err := s.unwrap(result, &limits); err != nil {
		return nil, err
	}
	return limits, nil
}

// ─── Liquidity ───────────────────────────────────────────────────────────────

func (s *LedgerService) RequestIssuance(participantID string, amount int64) error {
	amountStr := fmt.Sprintf("%d", amount)
	result, err := s.contract.SubmitTransaction("RequestIssuance", participantID, amountStr)
	if err != nil {
		return fmt.Errorf("chaincode RequestIssuance: %w", err)
	}
	_ = result
	return nil
}

func (s *LedgerService) RequestRedemption(participantID string, amount int64) error {
	amountStr := fmt.Sprintf("%d", amount)
	result, err := s.contract.SubmitTransaction("RequestRedemption", participantID, amountStr)
	if err != nil {
		return fmt.Errorf("chaincode RequestRedemption: %w", err)
	}
	_ = result
	return nil
}

func (s *LedgerService) RtgsIssuanceNotification(senderBIC string, amount int64, reference string) (map[string]interface{}, error) {
	amountStr := fmt.Sprintf("%d", amount)
	participantID := "bank_indonesia"
	result, err := s.contract.SubmitTransaction("RequestIssuanceRtgs", participantID, amountStr, reference)
	if err != nil {
		return nil, fmt.Errorf("chaincode RequestIssuanceRtgs: %w", err)
	}
	var resp map[string]interface{}
	if err := s.unwrap(result, &resp); err != nil {
		return map[string]interface{}{
			"status":    "issued",
			"reference": reference,
			"amount":    amountStr,
		}, nil
	}
	return resp, nil
}

func (s *LedgerService) DistributeToParticipant(senderParticipantID, receiverParticipantID string, amount int64) error {
	_, err := s.contract.SubmitTransaction("DistributeToParticipant",
		senderParticipantID, receiverParticipantID, fmt.Sprintf("%d", amount))
	if err != nil {
		return fmt.Errorf("chaincode DistributeToParticipant: %w", err)
	}
	return nil
}

func (s *LedgerService) Transfer(req models.TransferRequest) (*models.TransferResult, error) {
	amount, err := parseInt64(req.Amount)
	if err != nil {
		return nil, fmt.Errorf("invalid amount: %w", err)
	}
	result, err := s.contract.SubmitTransaction("Transfer",
		req.SenderID, req.ReceiverID, fmt.Sprintf("%d", amount))
	if err != nil {
		return nil, fmt.Errorf("chaincode Transfer: %w", err)
	}
	var tr models.TransferResult
	if err := s.unwrap(result, &tr); err != nil {
		return &models.TransferResult{Status: "transferred"}, nil
	}
	return &tr, nil
}

func (s *LedgerService) GetBalances() ([]*models.Balance, error) {
	result, err := s.contract.EvaluateTransaction("GetBalances")
	if err != nil {
		return nil, fmt.Errorf("chaincode GetBalances: %w", err)
	}
	var balances []*models.Balance
	if err := s.unwrap(result, &balances); err != nil {
		return nil, err
	}
	return balances, nil
}

// ─── Supervision ─────────────────────────────────────────────────────────────

func (s *LedgerService) GetTransactions(filters map[string]string) ([]*models.TransactionRecord, error) {
	args := make([]string, 0, 14)
	for _, k := range []string{"participant_id", "transaction_type", "status", "from_timestamp", "to_timestamp", "limit", "offset"} {
		v := ""
		if val, ok := filters[k]; ok {
			v = val
		}
		args = append(args, v)
	}
	result, err := s.contract.EvaluateTransaction("GetTransactions",
		args[0], args[1], args[2], args[3], args[4], args[5], args[6])
	if err != nil {
		return nil, fmt.Errorf("chaincode GetTransactions: %w", err)
	}
	var txs []*models.TransactionRecord
	if err := s.unwrap(result, &txs); err != nil {
		return nil, err
	}
	return txs, nil
}

func (s *LedgerService) GetSupervisionEvents() ([]*models.SupervisionEvent, error) {
	result, err := s.contract.EvaluateTransaction("GetSupervisionEvents")
	if err != nil {
		return nil, fmt.Errorf("chaincode GetSupervisionEvents: %w", err)
	}
	var events []*models.SupervisionEvent
	if err := s.unwrap(result, &events); err != nil {
		return nil, err
	}
	return events, nil
}

func (s *LedgerService) GetReconciliationReport() (*models.ReconciliationReport, error) {
	result, err := s.contract.EvaluateTransaction("GetReconciliationReport")
	if err != nil {
		return nil, fmt.Errorf("chaincode GetReconciliationReport: %w", err)
	}
	var r models.ReconciliationReport
	if err := s.unwrap(result, &r); err != nil {
		return nil, err
	}
	return &r, nil
}

func (s *LedgerService) GetMetrics() (*models.MetricsReport, error) {
	result, err := s.contract.EvaluateTransaction("GetMetrics")
	if err != nil {
		return nil, fmt.Errorf("chaincode GetMetrics: %w", err)
	}
	var m models.MetricsReport
	if err := s.unwrap(result, &m); err != nil {
		return nil, err
	}
	return &m, nil
}

// ─── Network ─────────────────────────────────────────────────────────────────

func (s *LedgerService) GetTopology() (*models.Topology, error) {
	result, err := s.contract.EvaluateTransaction("GetTopology")
	if err != nil {
		return nil, fmt.Errorf("chaincode GetTopology: %w", err)
	}
	var t models.Topology
	if err := s.unwrap(result, &t); err != nil {
		return nil, err
	}
	return &t, nil
}
