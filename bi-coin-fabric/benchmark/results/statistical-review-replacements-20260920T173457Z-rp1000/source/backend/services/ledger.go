package services

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"crypto/x509"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"

	"github.com/hyperledger/fabric-gateway/pkg/client"
	"github.com/hyperledger/fabric-gateway/pkg/identity"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

type LedgerService struct {
	// contract is populated only on a request-scoped copy returned by
	// ForPrincipal. The shared service never has a default signer.
	contract   FabricContract
	contracts  map[string]FabricContract
	gateways   map[string]config.FabricGateway
	principal  Principal
	cfg        *config.Config
	kycStore   KycStore
	operations OperationJournalStore
	hashSecret string
	closeFn    func() error
	testOnly   bool
}

type FabricContract interface {
	SubmitTransaction(name string, args ...string) ([]byte, error)
	EvaluateTransaction(name string, args ...string) ([]byte, error)
}

type KycStore interface {
	CreateRetailCustomer(ctx context.Context, req models.RetailCustomerRequest, identityHash string, custodianMSPID string) (*models.RetailCustomer, error)
	ListRetailCustomers(ctx context.Context, custodianMSPID string) ([]*models.RetailCustomer, error)
	SubmitKycProfile(ctx context.Context, req models.KycProfileRequest, anchor models.KycProfile, custodianMSPID string) (*models.KycProfile, error)
	RefreshKycProfile(ctx context.Context, profileID string, req models.KycProviderResultRequest, anchor models.KycProfile) (*models.KycProfile, error)
	MarkKycAnchored(ctx context.Context, profileID string) error
	GetKycProfile(ctx context.Context, profileID string) (*models.KycProfile, error)
	ListKycProviderChecks(ctx context.Context, profileID string) ([]*models.KycProviderCheck, error)
	ListKycAuditEvents(ctx context.Context, profileID string) ([]*models.KycAuditEvent, error)
	CreateQrisIntent(ctx context.Context, intent models.QrisIntent) (*models.QrisIntent, error)
	GetQrisIntent(ctx context.Context, intentID string) (*models.QrisIntent, error)
	ListQrisIntents(ctx context.Context, merchantID string) ([]*models.QrisIntent, error)
	MarkQrisIntentPaid(ctx context.Context, intentID string, txID string, payerWalletID string) (bool, error)
	MarkQrisIntentExpired(ctx context.Context, intentID string) (bool, error)
	CancelQrisIntent(ctx context.Context, intentID string) (bool, error)
}

type qrisPayloadClaims struct {
	IntentID         string          `json:"intent_id"`
	Mode             models.QrisMode `json:"mode"`
	MerchantID       string          `json:"merchant_id"`
	MerchantWalletID string          `json:"merchant_wallet_id"`
	Amount           int64           `json:"amount"`
	ReferenceID      string          `json:"reference_id"`
	ExpiresAt        string          `json:"expires_at,omitempty"`
}

type ledgerTransactionRecord struct {
	TxID            string `json:"tx_id"`
	TransactionType string `json:"transaction_type"`
	SenderID        string `json:"sender_id"`
	ReceiverID      string `json:"receiver_id"`
	Amount          int64  `json:"amount"`
	Status          string `json:"status"`
	RelatedIntentID string `json:"related_intent_id"`
	Timestamp       string `json:"timestamp"`
}

type rtgsReceipt struct {
	Status        string `json:"status"`
	Reference     string `json:"reference"`
	Amount        int64  `json:"amount"`
	ParticipantID string `json:"participant_id"`
	SenderBIC     string `json:"sender_bic"`
	TxID          string `json:"tx_id"`
}

func NewLedgerService(cfg *config.Config) (*LedgerService, error) {
	gateways, err := cfg.ParseFabricGateways()
	if err != nil {
		return nil, err
	}
	service := &LedgerService{
		contracts:  make(map[string]FabricContract, len(gateways)),
		gateways:   gateways,
		cfg:        cfg,
		hashSecret: cfg.KycHashSecret,
	}
	closers := make([]func() error, 0, len(gateways))
	for mspID, gateway := range gateways {
		contract, closeFn, err := connectFabricContract(gateway, cfg)
		if err != nil {
			for _, closeGateway := range closers {
				_ = closeGateway()
			}
			return nil, fmt.Errorf("gateway %s: %w", mspID, err)
		}
		service.contracts[mspID] = contract
		closers = append(closers, closeFn)
	}
	service.closeFn = func() error {
		var first error
		for _, closeGateway := range closers {
			if err := closeGateway(); err != nil && first == nil {
				first = err
			}
		}
		return first
	}
	return service, nil
}

func NewLedgerServiceForTest(contract FabricContract, store KycStore, hashSecret string) *LedgerService {
	return NewLedgerServiceForTestContracts(map[string]FabricContract{"TEST-MSP": contract}, store, hashSecret)
}

// NewLedgerServiceForTestContracts exposes the same request-principal routing
// used in production without requiring live Fabric gateways.
func NewLedgerServiceForTestContracts(contracts map[string]FabricContract, store KycStore, hashSecret string) *LedgerService {
	gateways := make(map[string]config.FabricGateway, len(contracts))
	for mspID := range contracts {
		gateways[mspID] = config.FabricGateway{MSPID: mspID}
	}
	defaultContract := contracts["TEST-MSP"]
	if defaultContract == nil {
		for _, contract := range contracts {
			defaultContract = contract
			break
		}
	}
	return &LedgerService{
		contract:   defaultContract,
		contracts:  contracts,
		gateways:   gateways,
		principal:  Principal{Username: "test", CustodianMSPID: "TEST-MSP"},
		kycStore:   store,
		operations: newMemoryOperationJournal(),
		hashSecret: hashSecret,
		testOnly:   true,
	}
}

func (s *LedgerService) SetKycStore(store KycStore) {
	s.kycStore = store
	if operations, ok := store.(OperationJournalStore); ok {
		s.operations = operations
	}
}

func (s *LedgerService) beginOperation(ctx context.Context, operation string, key string, request interface{}) (*OperationJournal, bool, error) {
	if strings.TrimSpace(key) == "" {
		return nil, false, InvalidInput("Idempotency-Key is required")
	}
	if s.operations == nil {
		return nil, false, Internal("operation journal not configured", nil)
	}
	payload, err := json.Marshal(request)
	if err != nil {
		return nil, false, Internal("failed to hash operation request", err)
	}
	hash := sha256.Sum256(payload)
	principalID := s.principal.ID()
	if principalID == "" && s.testOnly {
		principalID = "test"
	}
	if principalID == "" || s.principal.CustodianMSPID == "" {
		return nil, false, Forbidden("request principal is required")
	}
	candidate := OperationJournal{
		PrincipalScope: s.principal.Scope(),
		PrincipalID:    principalID,
		IdempotencyKey: key,
		Operation:      operation,
		RequestHash:    hex.EncodeToString(hash[:]),
		OperationRef:   operationReference(s.principal.Scope(), principalID, key),
		Status:         OperationPending,
	}
	existing, created, err := s.operations.BeginOperation(ctx, candidate)
	if err != nil {
		return nil, false, Internal("failed to create operation journal", err)
	}
	if !created && (existing.Operation != candidate.Operation || existing.RequestHash != candidate.RequestHash) {
		return nil, false, Conflict("idempotency key was already used for a different request")
	}
	if !created && existing.Status == OperationPending {
		return nil, false, Conflict("operation is already in progress")
	}
	return &existing, !created && existing.Status == OperationCompleted && len(existing.Response) > 0, nil
}

func (s *LedgerService) existingOperation(ctx context.Context, operation string, key string, request interface{}) (*OperationJournal, error) {
	if strings.TrimSpace(key) == "" {
		return nil, nil
	}
	principalID := s.principal.ID()
	if principalID == "" {
		return nil, nil
	}
	payload, err := json.Marshal(request)
	if err != nil {
		return nil, Internal("failed to hash operation request", err)
	}
	hash := sha256.Sum256(payload)
	existing, err := s.operations.GetOperation(ctx, s.principal.Scope(), principalID, key)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, Internal("failed to load operation journal", err)
	}
	if existing.Operation != operation || existing.RequestHash != hex.EncodeToString(hash[:]) {
		return nil, Conflict("idempotency key was already used for a different request")
	}
	return existing, nil
}

func (s *LedgerService) recordSubmittedOperation(ctx context.Context, operation *OperationJournal, txID string, response interface{}) error {
	encoded, err := json.Marshal(response)
	if err != nil {
		return Internal("failed to serialize operation receipt", err)
	}
	operation.Status = OperationSubmitted
	operation.TxID = txID
	operation.Response = encoded
	if err := s.operations.UpdateOperation(ctx, *operation); err != nil {
		return Internal("failed to persist operation receipt", err)
	}
	return nil
}

func (s *LedgerService) completeOperation(ctx context.Context, operation *OperationJournal) error {
	operation.Status = OperationCompleted
	if err := s.operations.UpdateOperation(ctx, *operation); err != nil {
		return Internal("failed to complete operation journal", err)
	}
	return nil
}

func connectFabricContract(gateway config.FabricGateway, cfg *config.Config) (FabricContract, func() error, error) {
	creds, err := credentials.NewClientTLSFromFile(gateway.TLSCertPath, "")
	if err != nil {
		return nil, nil, fmt.Errorf("tls creds: %w", err)
	}
	clientConn, err := grpc.NewClient(gateway.PeerEndpoint, grpc.WithTransportCredentials(creds))
	if err != nil {
		return nil, nil, fmt.Errorf("grpc tls dial: %w", err)
	}
	id, err := loadIdentity(gateway)
	if err != nil {
		_ = clientConn.Close()
		return nil, nil, fmt.Errorf("identity: %w", err)
	}
	sign, err := loadSigner(gateway)
	if err != nil {
		_ = clientConn.Close()
		return nil, nil, fmt.Errorf("signer: %w", err)
	}
	gw, err := client.Connect(id, client.WithSign(sign), client.WithClientConnection(clientConn))
	if err != nil {
		_ = clientConn.Close()
		return nil, nil, fmt.Errorf("gateway connect: %w", err)
	}
	return gw.GetNetwork(cfg.ChannelName).GetContract(cfg.ChaincodeName), func() error {
		gw.Close()
		return clientConn.Close()
	}, nil
}

// ForPrincipal resolves exactly one configured Fabric gateway for a request.
// It returns a shallow, request-local service copy, preventing a request from
// inheriting another request's signer.
func (s *LedgerService) ForPrincipal(principal Principal) (*LedgerService, error) {
	if strings.TrimSpace(principal.CustodianMSPID) == "" {
		if !s.testOnly {
			return nil, Forbidden("custodian_msp_id is required")
		}
		principal.CustodianMSPID = "TEST-MSP"
	}
	contract, ok := s.contracts[principal.CustodianMSPID]
	if !ok || contract == nil {
		return nil, Forbidden("custodian_msp_id is not configured")
	}
	gateway := s.gateways[principal.CustodianMSPID]
	if gateway.MSPID != "" && gateway.MSPID != principal.CustodianMSPID {
		return nil, Forbidden("custodian_msp_id does not match selected gateway")
	}
	if gateway.CustodianMSPID != "" && gateway.CustodianMSPID != principal.CustodianMSPID {
		return nil, Forbidden("custodian_msp_id does not match gateway custody")
	}
	if gateway.ParticipantID != "" && principal.ParticipantID != "" && gateway.ParticipantID != principal.ParticipantID {
		return nil, Forbidden("participant_id does not match gateway custody")
	}
	if len(gateway.AllowedRoles) > 0 {
		allowed := false
		for _, role := range gateway.AllowedRoles {
			if role == string(principal.Role) {
				allowed = true
				break
			}
		}
		if !allowed {
			return nil, Forbidden("role is not allowed for custodian_msp_id")
		}
	}
	copy := *s
	copy.contract = contract
	copy.principal = principal
	return &copy, nil
}

func (s *LedgerService) CreateQrisIntent(req models.CreateQrisIntentRequest) (*models.QrisIntent, error) {
	if s.kycStore == nil {
		return nil, fmt.Errorf("off-chain QRIS store not configured")
	}
	if req.MerchantWalletID == "" {
		return nil, fmt.Errorf("merchant_wallet_id is required")
	}
	if req.Mode != models.QrisModeStatic && req.Mode != models.QrisModeDynamic {
		return nil, fmt.Errorf("invalid qris mode %q", req.Mode)
	}
	amount, err := s.parseQrisAmount(req.Mode, req.Amount)
	if err != nil {
		return nil, err
	}
	now := time.Now().UTC()
	intent := models.QrisIntent{
		IntentID:         "qris_" + uuid.NewString(),
		Mode:             req.Mode,
		MerchantID:       req.MerchantID,
		MerchantWalletID: req.MerchantWalletID,
		Amount:           amount,
		Status:           models.QrisStatusActive,
		Label:            req.Label,
		ReferenceID:      "ref_" + uuid.NewString(),
		CreatedAt:        now.Format(time.RFC3339),
		UpdatedAt:        now.Format(time.RFC3339),
	}
	if req.Mode == models.QrisModeDynamic {
		intent.Status = models.QrisStatusPending
		expiresAt := now.Add(15 * time.Minute).Format(time.RFC3339)
		if req.ExpiresAt != nil && *req.ExpiresAt != "" {
			parsed, err := time.Parse(time.RFC3339, *req.ExpiresAt)
			if err != nil {
				return nil, InvalidInput("expires_at must be RFC3339")
			}
			if !parsed.After(now) {
				return nil, InvalidInput("expires_at must be in the future")
			}
			expiresAt = *req.ExpiresAt
		}
		intent.ExpiresAt = &expiresAt
	}
	payload, err := s.buildQrisPayload(intent)
	if err != nil {
		return nil, err
	}
	intent.Payload = payload
	return s.kycStore.CreateQrisIntent(context.Background(), intent)
}

func (s *LedgerService) kycCustodianScope() string {
	if s.principal.IsOversight() {
		return ""
	}
	return strings.TrimSpace(s.principal.CustodianMSPID)
}

func (s *LedgerService) requireKycCustodianScope(custodianMSPID string) error {
	scope := s.kycCustodianScope()
	if scope == "" || custodianMSPID == "" || custodianMSPID == scope {
		return nil
	}
	return Forbidden("resource is outside custodian scope")
}

func (s *LedgerService) ResolveQrisPayload(payload string) (*models.QrisIntent, error) {
	if s.kycStore == nil {
		return nil, fmt.Errorf("off-chain QRIS store not configured")
	}
	claims, err := s.decodeQrisPayload(payload)
	if err != nil {
		return nil, err
	}
	intent, err := s.kycStore.GetQrisIntent(context.Background(), claims.IntentID)
	if err != nil {
		return nil, err
	}
	intent.Payload = payload
	if intent.ReferenceID == "" {
		intent.ReferenceID = claims.ReferenceID
	}
	if intent.MerchantWalletID == "" {
		intent.MerchantWalletID = claims.MerchantWalletID
	}
	if intent.MerchantID == "" {
		intent.MerchantID = claims.MerchantID
	}
	if intent.Mode == models.QrisModeDynamic && intent.ExpiresAt != nil && *intent.ExpiresAt != "" && intent.Status == models.QrisStatusPending {
		expiresAt, err := time.Parse(time.RFC3339, *intent.ExpiresAt)
		if err == nil && time.Now().UTC().After(expiresAt) {
			changed, err := s.kycStore.MarkQrisIntentExpired(context.Background(), intent.IntentID)
			if err != nil {
				return nil, Internal("failed to persist QRIS expiry", err)
			}
			if changed {
				intent.Status = models.QrisStatusExpired
			} else {
				intent, err = s.kycStore.GetQrisIntent(context.Background(), intent.IntentID)
				if err != nil {
					return nil, Internal("failed to reload QRIS intent", err)
				}
			}
		}
	}
	return intent, nil
}

func (s *LedgerService) ListQrisIntents(merchantID string) ([]*models.QrisIntent, error) {
	if s.kycStore == nil {
		return nil, fmt.Errorf("off-chain QRIS store not configured")
	}
	return s.kycStore.ListQrisIntents(context.Background(), merchantID)
}

func (s *LedgerService) GetQrisIntent(intentID string) (*models.QrisIntent, error) {
	if s.kycStore == nil {
		return nil, fmt.Errorf("off-chain QRIS store not configured")
	}
	return s.kycStore.GetQrisIntent(context.Background(), intentID)
}

func (s *LedgerService) CancelQrisIntent(intentID string) error {
	if s.kycStore == nil {
		return fmt.Errorf("off-chain QRIS store not configured")
	}
	changed, err := s.kycStore.CancelQrisIntent(context.Background(), intentID)
	if err != nil {
		return Internal("failed to cancel QRIS intent", err)
	}
	if !changed {
		return Conflict("QRIS intent is not cancellable")
	}
	return nil
}

func (s *LedgerService) PayQris(req models.PayQrisRequest) (*models.QrisPayResult, error) {
	if s.kycStore == nil {
		return nil, Internal("off-chain QRIS store not configured", nil)
	}
	if req.PayerWalletID == "" {
		return nil, InvalidInput("payer_wallet_id is required")
	}
	intent, err := s.ResolveQrisPayload(req.Payload)
	if err != nil {
		return nil, err
	}
	amount := intent.Amount
	if intent.Mode == models.QrisModeStatic {
		amount, err = s.parseQrisAmount(intent.Mode, req.Amount)
		if err != nil {
			return nil, err
		}
	}
	operationRequest := struct {
		IntentID        string
		PayerWalletID   string
		Amount          int64
		IntentReference string
	}{intent.IntentID, req.PayerWalletID, amount, intent.ReferenceID}
	existing, err := s.existingOperation(context.Background(), "qris_pay", req.IdempotencyKey, operationRequest)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		if existing.Status == OperationPending {
			return nil, Conflict("operation is already in progress")
		}
		if len(existing.Response) == 0 {
			return nil, Internal("invalid persisted QRIS receipt", nil)
		}
		var result models.QrisPayResult
		if err := json.Unmarshal(existing.Response, &result); err != nil {
			return nil, Internal("invalid persisted QRIS receipt", err)
		}
		if existing.Status == OperationSubmitted {
			if intent.Mode == models.QrisModeDynamic {
				if err := s.persistQrisPayment(intent, &result, req.PayerWalletID); err != nil {
					return nil, err
				}
			}
			if err := s.completeOperation(context.Background(), existing); err != nil {
				return nil, err
			}
		}
		return &result, nil
	}
	if intent.Status == models.QrisStatusCancelled || intent.Status == models.QrisStatusExpired {
		return nil, Conflict(fmt.Sprintf("qris intent %s is %s", intent.IntentID, intent.Status))
	}
	if intent.Mode == models.QrisModeDynamic && intent.Status == models.QrisStatusPaid {
		return nil, Conflict(fmt.Sprintf("qris intent %s is already paid", intent.IntentID))
	}
	operation, replay, err := s.beginOperation(context.Background(), "qris_pay", req.IdempotencyKey, operationRequest)
	if err != nil {
		return nil, err
	}
	if replay {
		var result models.QrisPayResult
		if err := json.Unmarshal(operation.Response, &result); err != nil {
			return nil, Internal("invalid persisted QRIS receipt", err)
		}
		return &result, nil
	}
	if operation.Status == OperationSubmitted && len(operation.Response) > 0 {
		var result models.QrisPayResult
		if err := json.Unmarshal(operation.Response, &result); err != nil {
			return nil, Internal("invalid persisted QRIS receipt", err)
		}
		if intent.Mode == models.QrisModeDynamic {
			if err := s.persistQrisPayment(intent, &result, req.PayerWalletID); err != nil {
				return nil, err
			}
		}
		if err := s.completeOperation(context.Background(), operation); err != nil {
			return nil, err
		}
		return &result, nil
	}
	result, err := s.contract.SubmitTransaction("PayQris",
		req.PayerWalletID, intent.MerchantWalletID, fmt.Sprintf("%d", amount), operation.OperationRef)
	if err != nil {
		return nil, Internal("failed to submit QRIS payment", err)
	}
	var tr models.TransferResult
	if err := s.unwrapRequired(result, &tr); err != nil {
		return nil, err
	}
	if tr.Status == "" || tr.TxID == "" {
		return nil, Internal("invalid QRIS payment receipt", nil)
	}
	payResult := &models.QrisPayResult{
		Status:      tr.Status,
		TxID:        tr.TxID,
		IntentID:    intent.IntentID,
		ReferenceID: intent.ReferenceID,
	}
	if err := s.recordSubmittedOperation(context.Background(), operation, tr.TxID, payResult); err != nil {
		return nil, err
	}
	if intent.Mode == models.QrisModeDynamic {
		if err := s.persistQrisPayment(intent, payResult, req.PayerWalletID); err != nil {
			return nil, err
		}
	}
	if err := s.completeOperation(context.Background(), operation); err != nil {
		return nil, err
	}
	return payResult, nil
}

func (s *LedgerService) persistQrisPayment(intent *models.QrisIntent, result *models.QrisPayResult, payerWalletID string) error {
	changed, err := s.kycStore.MarkQrisIntentPaid(context.Background(), intent.IntentID, result.TxID, payerWalletID)
	if err != nil {
		return Internal("failed to persist QRIS payment", err)
	}
	if changed {
		return nil
	}
	current, err := s.kycStore.GetQrisIntent(context.Background(), intent.IntentID)
	if err != nil {
		return Internal("failed to reload QRIS payment", err)
	}
	if current.Status == models.QrisStatusPaid && current.TxID == result.TxID {
		return nil
	}
	return Conflict("QRIS intent state changed before payment could be persisted")
}

func (s *LedgerService) Close() error {
	if s == nil || s.closeFn == nil {
		return nil
	}
	return s.closeFn()
}

func loadIdentity(gateway config.FabricGateway) (*identity.X509Identity, error) {
	certPEM, err := os.ReadFile(gateway.CertPath)
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
	return identity.NewX509Identity(gateway.MSPID, cert)
}

func loadSigner(gateway config.FabricGateway) (identity.Sign, error) {
	keyPEM, err := os.ReadFile(gateway.KeyPath)
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
		return ""
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

func (s *LedgerService) unwrapRequired(result []byte, target interface{}) error {
	if len(result) == 0 || string(result) == "null" {
		return Internal("empty ledger receipt", nil)
	}
	if err := json.Unmarshal(result, target); err != nil {
		return Internal("invalid ledger receipt", err)
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
	if strings.TrimSpace(req.OwnerID) == "" {
		return nil, InvalidInput("owner_id is required")
	}
	walletID := fmt.Sprintf("wlt_%s", req.OwnerID)
	if _, err := s.contract.SubmitTransaction("CreateWallet", walletID, req.OwnerID, ""); err != nil {
		return nil, Internal("failed to create wallet", err)
	}
	return s.GetWallet(walletID)
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

func (s *LedgerService) ListWalletsByOwner(ownerID string) ([]*models.Wallet, error) {
	if strings.TrimSpace(ownerID) == "" {
		return nil, InvalidInput("owner_id is required")
	}
	result, err := s.contract.EvaluateTransaction("ListWalletsByOwner", ownerID)
	if err != nil {
		return nil, fmt.Errorf("chaincode ListWalletsByOwner: %w", err)
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
	var persisted *models.RetailCustomer
	if s.kycStore != nil {
		var err error
		persisted, err = s.kycStore.CreateRetailCustomer(context.Background(), req, identityHash, s.kycCustodianScope())
		if err != nil {
			return nil, Internal("failed to persist retail customer", err)
		}
	}
	result, err := s.contract.SubmitTransaction("CreateRetailCustomer", req.CustomerID, identityHash, req.WalletAccountID, req.KycProfileID)
	if err != nil {
		return nil, Internal("failed to anchor retail customer", err)
	}
	if len(result) == 0 || string(result) == "null" {
		if persisted != nil {
			return persisted, nil
		}
		return &models.RetailCustomer{
			CustomerID:      req.CustomerID,
			LegalName:       req.LegalName,
			IdentityHash:    identityHash,
			WalletAccountID: req.WalletAccountID,
			KycProfileID:    req.KycProfileID,
		}, nil
	}
	var c models.RetailCustomer
	if err := s.unwrapRequired(result, &c); err != nil {
		return nil, err
	}
	return &c, nil
}

func (s *LedgerService) ListRetailCustomers() ([]*models.RetailCustomer, error) {
	if s.kycStore != nil {
		return s.kycStore.ListRetailCustomers(context.Background(), s.kycCustodianScope())
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
		return nil, InvalidInput("subject_id is required")
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
		CustodianMSPID:    s.kycCustodianScope(),
		DocumentHashes:    hashes,
		Status:            models.KycPending,
		RiskLevel:         models.RiskLow,
		DueDiligenceLevel: models.DueDiligenceSimplified,
	}
	hashesJSON, _ := json.Marshal(hashes)
	var profile *models.KycProfile
	if s.kycStore != nil {
		var err error
		profile, err = s.kycStore.SubmitKycProfile(context.Background(), req, anchor, s.kycCustodianScope())
		if err != nil {
			return nil, Internal("failed to persist KYC profile", err)
		}
	}
	if _, err := s.contract.SubmitTransaction("SubmitKycProfile",
		profileID, string(req.SubjectType), req.SubjectID, string(hashesJSON)); err != nil {
		return nil, Internal("failed to anchor KYC profile; pending off-chain record is retryable", err)
	}
	if s.kycStore != nil {
		if err := s.kycStore.MarkKycAnchored(context.Background(), profileID); err != nil {
			return nil, Internal("failed to finalize KYC anchor; retry the request", err)
		}
		return profile, nil
	}
	return &anchor, nil
}

func (s *LedgerService) RefreshKycProfile(profileID string, req models.KycProviderResultRequest) (*models.KycProfile, error) {
	if err := validateKycDecision(req); err != nil {
		return nil, InvalidInput(err.Error())
	}
	expires := ""
	if req.ExpiresAt != nil {
		expires = *req.ExpiresAt
	}
	hashes := req.DocumentHashes
	custodianMSPID := ""
	if s.kycStore != nil {
		current, err := s.kycStore.GetKycProfile(context.Background(), profileID)
		if err != nil {
			return nil, Internal("failed to load KYC profile", err)
		}
		if current != nil {
			custodianMSPID = current.CustodianMSPID
		}
		if err := s.requireKycCustodianScope(custodianMSPID); err != nil {
			return nil, err
		}
		if current != nil && len(hashes) == 0 {
			hashes = current.DocumentHashes
		}
	}
	anchor := models.KycProfile{
		ProfileID:         profileID,
		CustodianMSPID:    custodianMSPID,
		DocumentHashes:    hashes,
		Status:            req.Status,
		RiskLevel:         req.RiskLevel,
		DueDiligenceLevel: req.DueDiligenceLevel,
		SeniorApproval:    req.SeniorApproval,
		ExpiresAt:         req.ExpiresAt,
	}
	hashesJSON, _ := json.Marshal(hashes)
	var profile *models.KycProfile
	if s.kycStore != nil {
		var err error
		profile, err = s.kycStore.RefreshKycProfile(context.Background(), profileID, req, anchor)
		if err != nil {
			return nil, Internal("failed to persist KYC decision", err)
		}
	}
	if _, err := s.contract.SubmitTransaction("RefreshKycProfile",
		profileID, string(req.Status), string(req.RiskLevel), string(req.DueDiligenceLevel), strconv.FormatBool(req.SeniorApproval), string(hashesJSON), expires); err != nil {
		return nil, Internal("failed to anchor KYC decision; pending off-chain record is retryable", err)
	}
	if s.kycStore != nil {
		if err := s.kycStore.MarkKycAnchored(context.Background(), profileID); err != nil {
			return nil, Internal("failed to finalize KYC anchor; retry the request", err)
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
		profile, err := s.kycStore.GetKycProfile(context.Background(), profileID)
		if err != nil {
			return nil, err
		}
		if err := s.requireKycCustodianScope(profile.CustodianMSPID); err != nil {
			return nil, err
		}
		return profile, nil
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
		profile, err := s.kycStore.GetKycProfile(context.Background(), profileID)
		if err != nil {
			return nil, err
		}
		if err := s.requireKycCustodianScope(profile.CustodianMSPID); err != nil {
			return nil, err
		}
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
		profile, err := s.kycStore.GetKycProfile(context.Background(), profileID)
		if err != nil {
			return nil, err
		}
		if err := s.requireKycCustodianScope(profile.CustodianMSPID); err != nil {
			return nil, err
		}
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

func (s *LedgerService) RequestIssuance(amount int64) error {
	amountStr := fmt.Sprintf("%d", amount)
	result, err := s.contract.SubmitTransaction("RequestIssuance", amountStr)
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
	if senderBIC == "" || reference == "" || amount <= 0 {
		return nil, InvalidInput("sender_bic, positive amount, and reference are required")
	}
	amountStr := fmt.Sprintf("%d", amount)
	result, err := s.contract.SubmitTransaction("RequestIssuanceRtgs", senderBIC, amountStr, reference)
	if err != nil {
		return nil, Internal("failed to submit RTGS issuance", err)
	}
	var receipt rtgsReceipt
	if err := s.unwrapRequired(result, &receipt); err != nil {
		return nil, err
	}
	if receipt.Status != "issued" || receipt.Reference != reference || receipt.Amount != amount || receipt.ParticipantID == "" || receipt.SenderBIC != senderBIC || receipt.TxID == "" {
		return nil, Internal("invalid RTGS issuance receipt", nil)
	}
	return map[string]interface{}{
		"status": receipt.Status, "reference": receipt.Reference, "amount": receipt.Amount,
		"participant_id": receipt.ParticipantID, "sender_bic": receipt.SenderBIC, "tx_id": receipt.TxID,
	}, nil
}

func (s *LedgerService) DistributeToParticipant(receiverParticipantID string, amount int64, idempotencyKeys ...string) error {
	if amount <= 0 {
		return InvalidInput("amount must be positive")
	}
	key := ""
	if len(idempotencyKeys) > 0 {
		key = idempotencyKeys[0]
	}
	operation, replay, err := s.beginOperation(context.Background(), "distribution", key, struct {
		ReceiverParticipantID string
		Amount                int64
	}{receiverParticipantID, amount})
	if err != nil {
		return err
	}
	if replay {
		return nil
	}
	if operation.Status == OperationSubmitted {
		return s.completeOperation(context.Background(), operation)
	}
	result, err := s.contract.SubmitTransaction("DistributeToParticipant",
		receiverParticipantID, fmt.Sprintf("%d", amount), operation.OperationRef)
	if err != nil {
		return Internal("failed to submit distribution", err)
	}
	var receipt models.TransferResult
	if err := s.unwrapRequired(result, &receipt); err != nil {
		return err
	}
	if err := validateMoneyReceipt(receipt, operation.OperationRef, "bi_treasury", fmt.Sprintf("wlt_%s", receiverParticipantID), amount); err != nil {
		return err
	}
	if err := s.recordSubmittedOperation(context.Background(), operation, receipt.TxID, receipt); err != nil {
		return err
	}
	return s.completeOperation(context.Background(), operation)
}

func (s *LedgerService) Transfer(req models.TransferRequest) (*models.TransferResult, error) {
	amount, err := parseInt64(req.Amount)
	if err != nil {
		return nil, InvalidInput("invalid amount")
	}
	operation, replay, err := s.beginOperation(context.Background(), "transfer", req.IdempotencyKey, struct {
		SenderID   string
		ReceiverID string
		Amount     int64
	}{req.SenderID, req.ReceiverID, amount})
	if err != nil {
		return nil, err
	}
	if replay || (operation.Status == OperationSubmitted && len(operation.Response) > 0) {
		var saved models.TransferResult
		if err := json.Unmarshal(operation.Response, &saved); err != nil {
			return nil, Internal("invalid persisted transfer receipt", err)
		}
		if err := s.completeOperation(context.Background(), operation); err != nil {
			return nil, err
		}
		return &saved, nil
	}
	result, err := s.contract.SubmitTransaction("Transfer",
		req.SenderID, req.ReceiverID, fmt.Sprintf("%d", amount), operation.OperationRef)
	if err != nil {
		return nil, Internal("failed to submit transfer", err)
	}
	var tr models.TransferResult
	if err := s.unwrapRequired(result, &tr); err != nil {
		return nil, err
	}
	if err := validateMoneyReceipt(tr, operation.OperationRef, req.SenderID, req.ReceiverID, amount); err != nil {
		return nil, err
	}
	if err := s.recordSubmittedOperation(context.Background(), operation, tr.TxID, tr); err != nil {
		return nil, err
	}
	if err := s.completeOperation(context.Background(), operation); err != nil {
		return nil, err
	}
	return &tr, nil
}

func validateMoneyReceipt(receipt models.TransferResult, referenceID string, senderID string, receiverID string, amount int64) error {
	if receipt.Status != "settled" || receipt.TxID == "" || receipt.ReferenceID != referenceID || receipt.Amount != amount {
		return Internal("invalid money operation receipt", nil)
	}
	if senderID != "" && receipt.SenderID != senderID {
		return Internal("invalid money operation sender receipt", nil)
	}
	if receiverID != "" && receipt.ReceiverID != receiverID {
		return Internal("invalid money operation receiver receipt", nil)
	}
	return nil
}

func (s *LedgerService) GetBalances() ([]*models.Balance, error) {
	result, err := s.contract.EvaluateTransaction("GetBalances")
	if err != nil {
		return nil, Internal("failed to read balances", err)
	}
	var balances []*models.Balance
	if err := s.unwrap(result, &balances); err != nil {
		return nil, err
	}
	return balances, nil
}

// ─── Supervision ─────────────────────────────────────────────────────────────

func (s *LedgerService) GetTransactions(filters map[string]string) ([]*models.TransactionRecord, error) {
	args := make([]string, 0, 10)
	for _, k := range []string{"participant_id", "transaction_type", "status", "from_timestamp", "to_timestamp"} {
		v := ""
		if val, ok := filters[k]; ok {
			v = val
		}
		args = append(args, v)
	}
	result, err := s.contract.EvaluateTransaction("GetTransactions",
		args[0], args[1], args[2], args[3], args[4])
	if err != nil {
		return nil, fmt.Errorf("chaincode GetTransactions: %w", err)
	}
	var raw []*ledgerTransactionRecord
	if err := s.unwrap(result, &raw); err != nil {
		return nil, err
	}
	participantFilter := filters["participant_id"]
	txs := make([]*models.TransactionRecord, 0, len(raw))
	for _, item := range raw {
		participantID := item.SenderID
		counterpartyID := item.ReceiverID
		if participantFilter != "" && participantFilter == item.ReceiverID {
			participantID = item.ReceiverID
			counterpartyID = item.SenderID
		}
		txs = append(txs, &models.TransactionRecord{
			TxID:            item.TxID,
			ParticipantID:   participantID,
			CounterpartyID:  counterpartyID,
			Amount:          item.Amount,
			TransactionType: item.TransactionType,
			Status:          item.Status,
			ReferenceID:     item.RelatedIntentID,
			Timestamp:       item.Timestamp,
		})
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

func (s *LedgerService) parseQrisAmount(mode models.QrisMode, raw string) (int64, error) {
	if mode == models.QrisModeStatic {
		if raw == "" {
			return 0, nil
		}
	}
	if raw == "" {
		return 0, fmt.Errorf("amount is required")
	}
	amount, err := parseInt64(raw)
	if err != nil || amount <= 0 {
		return 0, fmt.Errorf("invalid amount")
	}
	return amount, nil
}

func (s *LedgerService) buildQrisPayload(intent models.QrisIntent) (string, error) {
	claims := qrisPayloadClaims{
		IntentID:         intent.IntentID,
		Mode:             intent.Mode,
		MerchantID:       intent.MerchantID,
		MerchantWalletID: intent.MerchantWalletID,
		Amount:           intent.Amount,
		ReferenceID:      intent.ReferenceID,
	}
	if intent.ExpiresAt != nil {
		claims.ExpiresAt = *intent.ExpiresAt
	}
	raw, err := json.Marshal(claims)
	if err != nil {
		return "", err
	}
	sig := s.signQrisPayload(raw)
	return base64.RawURLEncoding.EncodeToString(raw) + "." + sig, nil
}

func (s *LedgerService) decodeQrisPayload(payload string) (*qrisPayloadClaims, error) {
	parts := strings.Split(payload, ".")
	if len(parts) != 2 {
		return nil, fmt.Errorf("invalid qris payload")
	}
	raw, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return nil, fmt.Errorf("decode qris payload: %w", err)
	}
	if !hmac.Equal([]byte(parts[1]), []byte(s.signQrisPayload(raw))) {
		return nil, fmt.Errorf("invalid qris payload signature")
	}
	var claims qrisPayloadClaims
	if err := json.Unmarshal(raw, &claims); err != nil {
		return nil, fmt.Errorf("unmarshal qris payload: %w", err)
	}
	return &claims, nil
}

func (s *LedgerService) signQrisPayload(raw []byte) string {
	mac := hmac.New(sha256.New, []byte(s.hashSecret))
	mac.Write(raw)
	return hex.EncodeToString(mac.Sum(nil))
}
