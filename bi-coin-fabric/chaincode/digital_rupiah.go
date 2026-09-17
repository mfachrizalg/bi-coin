package main

import (
	"encoding/json"
	"fmt"
	"math"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

const (
	BankIndonesiaMSP  = "BankIndonesiaOrgMSP"
	HimbaraBankMSP    = "HimbaraBankOrgMSP"
	CommercialBankMSP = "CommercialBankOrgMSP"
	OJKObserverMSP    = "OJKObserverOrgMSP"
	PJPMSP            = "PJPOrgMSP"

	schemaStateKey  = "schema::digital_rupiah_v3"
	schemaVersionV3 = "v3"
)

func requireMSP(ctx contractapi.TransactionContextInterface, allowed ...string) error {
	identity := ctx.GetClientIdentity()
	if identity == nil {
		return fmt.Errorf("access denied: client identity is unavailable")
	}
	mspID, err := identity.GetMSPID()
	if err != nil {
		return fmt.Errorf("access denied: resolve client MSP: %w", err)
	}
	for _, allowedMSP := range allowed {
		if mspID == allowedMSP {
			return nil
		}
	}
	return fmt.Errorf("access denied: MSP %s is not authorized", mspID)
}

func requireBankIndonesia(ctx contractapi.TransactionContextInterface) error {
	return requireMSP(ctx, BankIndonesiaMSP)
}

func requireInstitution(ctx contractapi.TransactionContextInterface) error {
	return requireMSP(ctx, BankIndonesiaMSP, HimbaraBankMSP, CommercialBankMSP, PJPMSP)
}

func currentMSP(ctx contractapi.TransactionContextInterface) (string, error) {
	identity := ctx.GetClientIdentity()
	if identity == nil {
		return "", fmt.Errorf("access denied: client identity is unavailable")
	}
	mspID, err := identity.GetMSPID()
	if err != nil {
		return "", fmt.Errorf("access denied: resolve client MSP: %w", err)
	}
	return mspID, nil
}

func checkedAddInt64(left int64, right int64) (int64, error) {
	if (right > 0 && left > math.MaxInt64-right) || (right < 0 && left < math.MinInt64-right) {
		return 0, fmt.Errorf("integer overflow")
	}
	return left + right, nil
}

func checkedSubInt64(left int64, right int64) (int64, error) {
	if right < 0 {
		return checkedAddInt64(left, -right)
	}
	if left < right {
		return 0, fmt.Errorf("insufficient balance: have %d, need %d", left, right)
	}
	return left - right, nil
}

// ─── Enums ───────────────────────────────────────────────────────────

type WalletTier string

const (
	TierBasic    WalletTier = "BASIC"
	TierStandard WalletTier = "STANDARD"
	TierMerchant WalletTier = "MERCHANT"
)

type WalletType string

const (
	WalletHot  WalletType = "hot"
	WalletCold WalletType = "cold"
)

type ParticipantType string

const (
	ParticipantValidator ParticipantType = "validator"
	ParticipantObserver  ParticipantType = "observer"
	ParticipantPJP       ParticipantType = "pjp"
)

type ParticipantStatus string

const (
	ParticipantPending    ParticipantStatus = "pending"
	ParticipantActive     ParticipantStatus = "active"
	ParticipantFrozen     ParticipantStatus = "frozen"
	ParticipantRejected   ParticipantStatus = "rejected"
	ParticipantOffboarded ParticipantStatus = "offboarded"
)

type KycStatus string

const (
	KycPending   KycStatus = "pending"
	KycInReview  KycStatus = "in_review"
	KycApproved  KycStatus = "approved"
	KycRejected  KycStatus = "rejected"
	KycExpired   KycStatus = "expired"
	KycSuspended KycStatus = "suspended"
)

type KycRiskLevel string

const (
	RiskLow        KycRiskLevel = "low"
	RiskMedium     KycRiskLevel = "medium"
	RiskHigh       KycRiskLevel = "high"
	RiskProhibited KycRiskLevel = "prohibited"
)

type KycSubjectType string

const (
	SubjectParticipant    KycSubjectType = "participant"
	SubjectRetailCustomer KycSubjectType = "retail_customer"
	SubjectMerchant       KycSubjectType = "merchant"
)

type DueDiligenceLevel string

const (
	DueDiligenceSimplified DueDiligenceLevel = "simplified"
	DueDiligenceStandard   DueDiligenceLevel = "standard"
	DueDiligenceEnhanced   DueDiligenceLevel = "enhanced"
)

type LimitScope string

const (
	ScopeGlobalSupply          LimitScope = "global_supply"
	ScopePerParticipantBalance LimitScope = "per_participant_balance"
	ScopePerTxAmount           LimitScope = "per_tx_amount"
	ScopeMinParticipantBalance LimitScope = "min_participant_balance"
)

type TransactionType string

const (
	TxMint         TransactionType = "issuance"
	TxBurn         TransactionType = "redemption"
	TxTransfer     TransactionType = "transfer"
	TxQrisPayment  TransactionType = "qris_payment"
	TxDistribution TransactionType = "distribution"
)

type TransactionStatus string

const (
	TxSettled  TransactionStatus = "settled"
	TxRejected TransactionStatus = "rejected"
)

// ─── State Objects ───────────────────────────────────────────────────

type Participant struct {
	ParticipantID         string            `json:"participant_id"`
	Name                  string            `json:"name"`
	Domain                string            `json:"domain"`
	AccountID             string            `json:"account_id"`
	MSPID                 string            `json:"msp_id,omitempty"`
	BIC                   string            `json:"bic,omitempty"`
	ParticipantType       ParticipantType   `json:"participant_type"`
	InitialReserveBalance string            `json:"initial_reserve_balance"`
	ComplianceStatus      string            `json:"compliance_status"`
	Status                ParticipantStatus `json:"status"`
	CreatedAt             string            `json:"created_at"`
	UpdatedAt             string            `json:"updated_at"`
}

type Wallet struct {
	WalletID               string     `json:"wallet_id"`
	OwnerID                string     `json:"owner_id"`
	ParticipantID          string     `json:"participant_id"`
	CustodianParticipantID string     `json:"custodian_participant_id,omitempty"`
	CustodianMSPID         string     `json:"custodian_msp_id,omitempty"`
	Tier                   WalletTier `json:"tier"`
	WalletType             WalletType `json:"wallet_type"`
	Balance                int64      `json:"balance"`
	Frozen                 bool       `json:"frozen"`
	DailySpent             int64      `json:"daily_spent"`
	MonthlySpent           int64      `json:"monthly_spent"`
	MonthlyReceived        int64      `json:"monthly_received"`
	LastResetDay           string     `json:"last_reset_day"`
	LastResetMonth         string     `json:"last_reset_month"`
	CreatedAt              string     `json:"created_at"`
	UpdatedAt              string     `json:"updated_at"`
}

type OldWallet struct {
	OwnerID      string     `json:"owner_id"`
	Tier         WalletTier `json:"tier"`
	Balance      int64      `json:"balance"`
	Frozen       bool       `json:"frozen"`
	DailySpent   int64      `json:"daily_spent"`
	MonthlySpent int64      `json:"monthly_spent"`
	LastResetDay string     `json:"last_reset_day"`
	CreatedAt    string     `json:"created_at"`
	UpdatedAt    string     `json:"updated_at"`
}

type TierLimit struct {
	Tier                 WalletTier `json:"tier"`
	MaxBalance           int64      `json:"max_balance"`
	MinBalance           int64      `json:"min_balance"`
	DailyTxLimit         int64      `json:"daily_tx_limit"`
	MonthlyTxLimit       int64      `json:"monthly_tx_limit"`
	MonthlyIncomingLimit int64      `json:"monthly_incoming_limit"`
	PerTxLimit           int64      `json:"per_tx_limit"`
}

type KycProfile struct {
	ProfileID         string            `json:"profile_id"`
	SubjectType       KycSubjectType    `json:"subject_type"`
	SubjectID         string            `json:"subject_id"`
	DocumentHashes    []string          `json:"document_hashes"`
	Status            KycStatus         `json:"status"`
	RiskLevel         KycRiskLevel      `json:"risk_level"`
	DueDiligenceLevel DueDiligenceLevel `json:"due_diligence_level"`
	SeniorApproval    bool              `json:"senior_approval"`
	ExpiresAt         string            `json:"expires_at"`
	CreatedAt         string            `json:"created_at"`
	UpdatedAt         string            `json:"updated_at"`
}

type KycProviderCheck struct {
	CheckID        string            `json:"check_id"`
	ProfileID      string            `json:"profile_id"`
	Status         KycStatus         `json:"status"`
	RiskLevel      KycRiskLevel      `json:"risk_level"`
	Checks         map[string]string `json:"checks"`
	DocumentHashes []string          `json:"document_hashes"`
	ExpiresAt      string            `json:"expires_at"`
	Timestamp      string            `json:"timestamp"`
}

type KycAuditEvent struct {
	EventID     string `json:"event_id"`
	ProfileID   string `json:"profile_id"`
	EventType   string `json:"event_type"`
	OldStatus   string `json:"old_status"`
	NewStatus   string `json:"new_status"`
	Description string `json:"description"`
	Timestamp   string `json:"timestamp"`
}

type RetailCustomer struct {
	CustomerID      string `json:"customer_id"`
	IdentityHash    string `json:"identity_hash"`
	WalletAccountID string `json:"wallet_account_id"`
	KycProfileID    string `json:"kyc_profile_id"`
	CreatedAt       string `json:"created_at"`
	UpdatedAt       string `json:"updated_at"`
}

type SystemLimit struct {
	Scope LimitScope `json:"scope"`
	Value int64      `json:"value"`
}

type AutoLimitPolicy struct {
	ParticipantID  string `json:"participant_id"`
	AutoRedemption bool   `json:"auto_redemption"`
	MinBalance     int64  `json:"min_balance"`
	UpdatedAt      string `json:"updated_at"`
}

type TransactionRecord struct {
	RecordID        string            `json:"record_id,omitempty"`
	TxID            string            `json:"tx_id"`
	TransactionType TransactionType   `json:"transaction_type"`
	SenderID        string            `json:"sender_id"`
	ReceiverID      string            `json:"receiver_id"`
	Amount          int64             `json:"amount"`
	Status          TransactionStatus `json:"status"`
	RelatedIntentID string            `json:"related_intent_id"`
	Timestamp       string            `json:"timestamp"`
}

type SupervisionEvent struct {
	EventID    string `json:"event_id"`
	EventType  string `json:"event_type"`
	EntityType string `json:"entity_type"`
	EntityID   string `json:"entity_id"`
	Data       string `json:"data"`
	Timestamp  string `json:"timestamp"`
}

type SchemaState struct {
	Version       string `json:"version"`
	InitializedAt string `json:"initialized_at"`
}

type IdempotencyRecord struct {
	Operation string `json:"operation"`
	Key       string `json:"key"`
	TxID      string `json:"tx_id"`
	Payload   string `json:"payload"`
	Timestamp string `json:"timestamp"`
}

type ReconciliationReport struct {
	ReportID     string `json:"report_id"`
	TotalSupply  int64  `json:"total_supply"`
	TotalIssued  int64  `json:"total_issued"`
	TotalBurned  int64  `json:"total_burned"`
	Wallets      int    `json:"wallets"`
	Participants int    `json:"participants"`
	GeneratedAt  string `json:"generated_at"`
}

type Metrics struct {
	TotalTransactions  int64 `json:"total_transactions"`
	SettledCount       int64 `json:"settled_count"`
	RejectedCount      int64 `json:"rejected_count"`
	ActiveWallets      int64 `json:"active_wallets"`
	ActiveParticipants int64 `json:"active_participants"`
	TotalSupply        int64 `json:"total_supply"`
}

// ─── InitLedger ──────────────────────────────────────────────────────

// txNow returns the transaction's timestamp as a UTC time. Using the proposal
// timestamp (identical across all endorsing peers) instead of time.Now() keeps the
// chaincode deterministic, so multi-org endorsement read/write sets always match.
func txNow(ctx contractapi.TransactionContextInterface) time.Time {
	ts, err := ctx.GetStub().GetTxTimestamp()
	if err != nil || ts == nil {
		return time.Unix(0, 0).UTC()
	}
	return ts.AsTime().UTC()
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	if existing, err := ctx.GetStub().GetState(schemaStateKey); err != nil {
		return err
	} else if existing != nil {
		return nil
	}
	for _, objectType := range []string{"participant", "wallet"} {
		hasState, err := hasCompositeState(ctx, objectType)
		if err != nil {
			return err
		}
		if hasState {
			return fmt.Errorf("schema sentinel missing while %s state already exists", objectType)
		}
	}
	limits := []TierLimit{
		{Tier: TierBasic, MaxBalance: 2_000_000, MinBalance: 0, DailyTxLimit: 500_000, MonthlyTxLimit: 5_000_000, MonthlyIncomingLimit: 20_000_000, PerTxLimit: 250_000},
		{Tier: TierStandard, MaxBalance: 20_000_000, MinBalance: 100_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000},
		{Tier: TierMerchant, MaxBalance: 200_000_000, MinBalance: 500_000, DailyTxLimit: 50_000_000, MonthlyTxLimit: 500_000_000, MonthlyIncomingLimit: 500_000_000, PerTxLimit: 10_000_000},
	}
	for _, limit := range limits {
		if err := s.putLimit(ctx, limit); err != nil {
			return err
		}
	}

	now := txNow(ctx)

	biWallet := Wallet{
		WalletID:               "bi_treasury",
		OwnerID:                "bank_indonesia",
		ParticipantID:          "bank_indonesia",
		CustodianParticipantID: "bank_indonesia",
		CustodianMSPID:         BankIndonesiaMSP,
		Tier:                   "",
		WalletType:             WalletHot,
		Balance:                0,
		LastResetDay:           now.Format("2006-01-02"),
		LastResetMonth:         now.Format("2006-01"),
		CreatedAt:              now.Format(time.RFC3339),
		UpdatedAt:              now.Format(time.RFC3339),
	}
	if err := s.putWallet(ctx, "bi_treasury", biWallet); err != nil {
		return err
	}

	sysLimits := []SystemLimit{
		{Scope: ScopeGlobalSupply, Value: 10_000_000_000_000},
		{Scope: ScopePerParticipantBalance, Value: 1_000_000_000_000},
		{Scope: ScopePerTxAmount, Value: 100_000_000_000},
	}
	for _, sl := range sysLimits {
		if err := s.putSystemLimit(ctx, sl); err != nil {
			return err
		}
	}

	sentinel, err := json.Marshal(SchemaState{
		Version:       schemaVersionV3,
		InitializedAt: now.Format(time.RFC3339),
	})
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(schemaStateKey, sentinel)
}

// ─── Participants ────────────────────────────────────────────────────

func (s *SmartContract) SubmitParticipant(ctx contractapi.TransactionContextInterface, participantID string, name string, domain string, accountID string, participantType string, initialReserveBalance string, complianceStatus string) error {
	if err := requireInstitution(ctx); err != nil {
		return err
	}
	mspID, err := currentMSP(ctx)
	if err != nil {
		return err
	}
	exists, err := s.participantExists(ctx, participantID)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("participant %s already exists", participantID)
	}
	now := txNow(ctx)
	p := Participant{
		ParticipantID:         participantID,
		Name:                  name,
		Domain:                domain,
		AccountID:             accountID,
		MSPID:                 mspID,
		BIC:                   accountID,
		ParticipantType:       ParticipantType(participantType),
		InitialReserveBalance: initialReserveBalance,
		ComplianceStatus:      complianceStatus,
		Status:                ParticipantPending,
		CreatedAt:             now.Format(time.RFC3339),
		UpdatedAt:             now.Format(time.RFC3339),
	}
	if err := s.putParticipant(ctx, p); err != nil {
		return err
	}
	return s.emitSupervisionEvent(ctx, "participant_submitted", "participant", participantID, p)
}

func (s *SmartContract) ApproveParticipant(ctx contractapi.TransactionContextInterface, participantID string) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	if p.Status != ParticipantPending {
		return fmt.Errorf("participant %s is not pending", participantID)
	}
	p.Status = ParticipantActive
	p.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putParticipant(ctx, p); err != nil {
		return err
	}
	walletID := fmt.Sprintf("wlt_%s", p.ParticipantID)
	exists, _ := s.walletExists(ctx, walletID)
	if !exists {
		w := Wallet{
			WalletID:               walletID,
			OwnerID:                participantID,
			ParticipantID:          participantID,
			CustodianParticipantID: participantID,
			CustodianMSPID:         p.MSPID,
			// Participant wallets are wholesale reserve accounts, not retail-tier wallets.
			Tier:           "",
			WalletType:     WalletHot,
			Balance:        0,
			LastResetDay:   txNow(ctx).Format("2006-01-02"),
			LastResetMonth: txNow(ctx).Format("2006-01"),
			CreatedAt:      txNow(ctx).Format(time.RFC3339),
			UpdatedAt:      txNow(ctx).Format(time.RFC3339),
		}
		if err := s.putWallet(ctx, walletID, w); err != nil {
			return err
		}
	}
	return s.emitSupervisionEvent(ctx, "participant_approved", "participant", participantID, p)
}

func (s *SmartContract) FreezeParticipant(ctx contractapi.TransactionContextInterface, participantID string) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	if p.Status == ParticipantPending {
		return fmt.Errorf("participant %s is still pending and cannot be frozen", participantID)
	}
	if p.Status != ParticipantActive {
		return fmt.Errorf("participant %s cannot be frozen from status %s", participantID, p.Status)
	}
	p.Status = ParticipantFrozen
	p.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putParticipant(ctx, p); err != nil {
		return err
	}
	if err := s.setParticipantWalletsFrozen(ctx, participantID, true); err != nil {
		return err
	}
	return s.emitSupervisionEvent(ctx, "participant_frozen", "participant", participantID, p)
}

func (s *SmartContract) UnfreezeParticipant(ctx contractapi.TransactionContextInterface, participantID string) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	if p.Status != ParticipantFrozen {
		return fmt.Errorf("participant %s is not frozen", participantID)
	}
	p.Status = ParticipantActive
	p.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putParticipant(ctx, p); err != nil {
		return err
	}
	if err := s.setParticipantWalletsFrozen(ctx, participantID, false); err != nil {
		return err
	}
	return s.emitSupervisionEvent(ctx, "participant_unfrozen", "participant", participantID, p)
}

func (s *SmartContract) RejectParticipant(ctx contractapi.TransactionContextInterface, participantID string) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	if p.Status != ParticipantPending {
		return fmt.Errorf("participant %s must be pending to reject", participantID)
	}
	p.Status = ParticipantRejected
	p.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putParticipant(ctx, p); err != nil {
		return err
	}
	return s.emitSupervisionEvent(ctx, "participant_rejected", "participant", participantID, p)
}

func (s *SmartContract) OffboardParticipant(ctx contractapi.TransactionContextInterface, participantID string) (map[string]interface{}, error) {
	if err := requireBankIndonesia(ctx); err != nil {
		return nil, err
	}
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return nil, err
	}
	if p.Status != ParticipantActive && p.Status != ParticipantFrozen {
		return nil, fmt.Errorf("participant %s cannot be offboarded from status %s", participantID, p.Status)
	}
	totalBalance, err := s.sumParticipantBalances(ctx, participantID)
	if err != nil {
		return nil, err
	}
	if totalBalance != 0 {
		return nil, fmt.Errorf("participant %s cannot be offboarded with non-zero balance %d", participantID, totalBalance)
	}
	p.Status = ParticipantOffboarded
	p.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putParticipant(ctx, p); err != nil {
		return nil, err
	}
	if err := s.setParticipantWalletsFrozen(ctx, participantID, true); err != nil {
		return nil, err
	}
	receipt := map[string]interface{}{
		"status":         string(ParticipantOffboarded),
		"participant_id": participantID,
		"tx_id":          ctx.GetStub().GetTxID(),
		"timestamp":      txNow(ctx).Format(time.RFC3339),
	}
	if err := s.emitSupervisionEvent(ctx, "participant_offboarded", "participant", participantID, receipt); err != nil {
		return nil, err
	}
	return receipt, nil
}

// ─── Wallets (wholesale model) ───────────────────────────────────────

func (s *SmartContract) CreateWholesaleWallet(ctx contractapi.TransactionContextInterface, walletID string, participantID string, walletType string) error {
	if err := requireInstitution(ctx); err != nil {
		return err
	}
	participant, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	callerMSP, err := currentMSP(ctx)
	if err != nil {
		return err
	}
	if callerMSP != BankIndonesiaMSP && participant.MSPID != "" && callerMSP != participant.MSPID {
		return fmt.Errorf("access denied: MSP %s does not custody participant %s", callerMSP, participantID)
	}
	exists, err := s.walletExists(ctx, walletID)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("wallet %s already exists", walletID)
	}
	wt := WalletType(walletType)
	if wt != WalletHot && wt != WalletCold {
		return fmt.Errorf("invalid wallet type: %s", walletType)
	}
	now := txNow(ctx)
	w := Wallet{
		WalletID:               walletID,
		OwnerID:                participantID,
		ParticipantID:          participantID,
		CustodianParticipantID: participantID,
		CustodianMSPID:         participant.MSPID,
		Tier:                   "",
		WalletType:             wt,
		Balance:                0,
		LastResetDay:           now.Format("2006-01-02"),
		LastResetMonth:         now.Format("2006-01"),
		CreatedAt:              now.Format(time.RFC3339),
		UpdatedAt:              now.Format(time.RFC3339),
	}
	return s.putWallet(ctx, walletID, w)
}

func (s *SmartContract) listWallets(ctx contractapi.TransactionContextInterface, matches func(Wallet) bool) ([]*Wallet, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("wallet", []string{})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var wallets []*Wallet
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		var w Wallet
		if err := json.Unmarshal(kv.Value, &w); err != nil {
			continue
		}
		if w.WalletID == "" {
			_, parts, _ := ctx.GetStub().SplitCompositeKey(kv.Key)
			if len(parts) > 0 {
				w.WalletID = parts[0]
			}
		}
		if matches == nil || matches(w) {
			wallets = append(wallets, &w)
		}
	}
	return wallets, nil
}

func (s *SmartContract) ListWalletsByParticipant(ctx contractapi.TransactionContextInterface, participantID string) ([]*Wallet, error) {
	return s.listWallets(ctx, func(w Wallet) bool {
		return participantID == "" || w.ParticipantID == participantID
	})
}

func (s *SmartContract) ListWalletsByOwner(ctx contractapi.TransactionContextInterface, ownerID string) ([]*Wallet, error) {
	if ownerID == "" {
		return nil, fmt.Errorf("owner_id is required")
	}
	return s.listWallets(ctx, func(w Wallet) bool { return w.OwnerID == ownerID })
}

// ─── Legacy CreateWallet (compat with old API) ───────────────────────

func (s *SmartContract) CreateWallet(ctx contractapi.TransactionContextInterface, walletID string, ownerID string, tier string) error {
	if err := requireInstitution(ctx); err != nil {
		return err
	}
	callerMSP, err := currentMSP(ctx)
	if err != nil {
		return err
	}
	exists, err := s.walletExists(ctx, walletID)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("wallet %s already exists", walletID)
	}
	profile, err := s.getKycProfileBySubject(ctx, ownerID)
	if err != nil {
		return fmt.Errorf("derive wallet tier: %w", err)
	}
	walletTier, err := deriveWalletTier(profile, txNow(ctx))
	if err != nil {
		return fmt.Errorf("derive wallet tier: %w", err)
	}
	if tier != "" && WalletTier(tier) != walletTier {
		return fmt.Errorf("requested tier %s does not match policy-derived tier %s", tier, walletTier)
	}
	now := txNow(ctx)
	custodianParticipantID, err := s.resolveCustodianParticipantID(ctx, callerMSP)
	if err != nil {
		custodianParticipantID = ownerID
	}
	wallet := Wallet{
		WalletID:               walletID,
		OwnerID:                ownerID,
		ParticipantID:          custodianParticipantID,
		CustodianParticipantID: custodianParticipantID,
		CustodianMSPID:         callerMSP,
		Tier:                   walletTier,
		WalletType:             WalletHot,
		Balance:                0,
		LastResetDay:           now.Format("2006-01-02"),
		LastResetMonth:         now.Format("2006-01"),
		CreatedAt:              now.Format(time.RFC3339),
		UpdatedAt:              now.Format(time.RFC3339),
	}
	return s.putWallet(ctx, walletID, wallet)
}

// ─── Mint / Burn / Transfer ──────────────────────────────────────────

func (s *SmartContract) Mint(ctx contractapi.TransactionContextInterface, walletID string, amount int64) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	if walletID != "bi_treasury" {
		return fmt.Errorf("issuance must credit bi_treasury")
	}
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return err
	}
	if wallet.Frozen {
		return fmt.Errorf("wallet %s is frozen", walletID)
	}
	if err := s.ensurePerTxLimit(ctx, amount); err != nil {
		return err
	}
	if err := s.ensureGlobalSupplyRoom(ctx, amount); err != nil {
		return err
	}
	newBalance, err := checkedAddInt64(wallet.Balance, amount)
	if err != nil {
		return err
	}
	if wallet.Tier != "" {
		limit, err := s.getLimit(ctx, wallet.Tier)
		if err != nil {
			return err
		}
		if newBalance > limit.MaxBalance {
			return fmt.Errorf("mint would exceed max balance %d for tier %s", limit.MaxBalance, wallet.Tier)
		}
	}
	wallet.Balance = newBalance
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, walletID, wallet); err != nil {
		return err
	}
	if err := s.emitAudit(ctx, "MINT", walletID, "", amount); err != nil {
		return err
	}
	return s.recordTransaction(ctx, TxMint, walletID, "", amount, TxSettled, "")
}

func (s *SmartContract) Burn(ctx contractapi.TransactionContextInterface, walletID string, amount int64) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return err
	}
	if wallet.Frozen {
		return fmt.Errorf("wallet %s is frozen", walletID)
	}
	if err := s.ensurePerTxLimit(ctx, amount); err != nil {
		return err
	}
	newBalance, err := checkedSubInt64(wallet.Balance, amount)
	if err != nil {
		return err
	}
	wallet.Balance = newBalance
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, walletID, wallet); err != nil {
		return err
	}
	if err := s.emitAudit(ctx, "BURN", walletID, "", amount); err != nil {
		return err
	}
	return s.recordTransaction(ctx, TxBurn, walletID, "", amount, TxSettled, "")
}

func (s *SmartContract) Transfer(ctx contractapi.TransactionContextInterface, senderID string, receiverID string, amount int64, referenceID string) (map[string]interface{}, error) {
	if err := requireInstitution(ctx); err != nil {
		return nil, err
	}
	if referenceID == "" {
		return nil, fmt.Errorf("reference id is required")
	}
	return s.settleTransfer(ctx, senderID, receiverID, amount, TxTransfer, referenceID, referenceID, "TRANSFER", "HIGH_RISK_TRANSFER")
}

func (s *SmartContract) PayQris(ctx contractapi.TransactionContextInterface, senderID string, receiverID string, amount int64, referenceID string) (map[string]interface{}, error) {
	if err := requireInstitution(ctx); err != nil {
		return nil, err
	}
	if referenceID == "" {
		return nil, fmt.Errorf("reference id is required")
	}
	return s.settleTransfer(ctx, senderID, receiverID, amount, TxQrisPayment, "qris:"+referenceID, referenceID, "QRIS_PAYMENT", "HIGH_RISK_QRIS_PAYMENT")
}

func (s *SmartContract) settleTransfer(ctx contractapi.TransactionContextInterface, senderID string, receiverID string, amount int64, txType TransactionType, idempotencyKey string, relatedIntentID string, auditAction string, riskEvent string) (map[string]interface{}, error) {
	if receipt, err := s.getIdempotencyReceipt(ctx, string(txType), idempotencyKey); err != nil {
		return nil, err
	} else if receipt != nil {
		return receipt, nil
	}
	if amount <= 0 {
		return nil, fmt.Errorf("amount must be positive")
	}
	if senderID == receiverID {
		return nil, fmt.Errorf("sender and receiver must differ")
	}
	if err := s.ensurePerTxLimit(ctx, amount); err != nil {
		return nil, err
	}
	sender, err := s.getWallet(ctx, senderID)
	if err != nil {
		return nil, err
	}
	if err := s.requireWalletCustodianMSP(ctx, sender); err != nil {
		return nil, err
	}
	if sender.Frozen {
		return nil, fmt.Errorf("sender wallet %s is frozen", senderID)
	}
	receiver, err := s.getWallet(ctx, receiverID)
	if err != nil {
		return nil, err
	}
	if receiver.Frozen {
		return nil, fmt.Errorf("receiver wallet %s is frozen", receiverID)
	}
	receiverLimit, err := s.getLimit(ctx, receiver.Tier)
	if err != nil {
		return nil, err
	}
	senderLimit := TierLimit{}
	if sender.Tier == "" {
		if receiver.Tier == "" {
			return nil, fmt.Errorf("wholesale transfers must fund a retail wallet")
		}
		callerMSP, err := currentMSP(ctx)
		if err != nil {
			return nil, err
		}
		if receiver.CustodianMSPID != callerMSP {
			return nil, fmt.Errorf("custodian MSP mismatch: caller %s must equal receiver custodian %s", callerMSP, receiver.CustodianMSPID)
		}
		if err := s.requireApprovedKyc(ctx, receiver); err != nil {
			return nil, err
		}
		if err := applyWholesaleFundingPolicy(&sender, &receiver, amount, receiverLimit, txNow(ctx)); err != nil {
			return nil, err
		}
	} else {
		if receiver.Tier == "" {
			return nil, fmt.Errorf("retail transfers cannot target a wholesale wallet")
		}
		if err := s.requireApprovedKyc(ctx, sender); err != nil {
			return nil, err
		}
		senderLimit, err = s.getLimit(ctx, sender.Tier)
		if err != nil {
			return nil, err
		}
		if err := applyRetailTransferPolicy(&sender, &receiver, amount, senderLimit, receiverLimit, txNow(ctx)); err != nil {
			return nil, err
		}
		sender.Balance, err = checkedSubInt64(sender.Balance, amount)
		if err != nil {
			return nil, err
		}
		receiver.Balance, err = checkedAddInt64(receiver.Balance, amount)
		if err != nil {
			return nil, err
		}
	}
	sender.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	receiver.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, senderID, sender); err != nil {
		return nil, err
	}
	if err := s.putWallet(ctx, receiverID, receiver); err != nil {
		return nil, err
	}
	if sender.Tier != "" && senderLimit.MinBalance > 0 && sender.Balance < senderLimit.MinBalance {
		policy, err := s.getAutoLimitPolicy(ctx, sender.ParticipantID)
		if err == nil && policy.AutoRedemption && sender.Balance > 0 {
			if arErr := s.autoRedeem(ctx, senderID, sender.Balance); arErr != nil {
				_ = s.emitAudit(ctx, "AUTO_REDEMPTION_FAILED", senderID, "", sender.Balance)
			}
		}
	}
	if err := s.emitAudit(ctx, auditAction, senderID, receiverID, amount); err != nil {
		return nil, err
	}
	if sender.Tier != "" {
		if profile, err := s.getKycProfileBySubject(ctx, sender.OwnerID); err == nil && profile.RiskLevel == RiskHigh {
			_ = s.emitSupervisionEvent(ctx, riskEvent, "wallet", senderID, map[string]interface{}{
				"sender_wallet_id":   senderID,
				"receiver_wallet_id": receiverID,
				"amount":             amount,
				"risk_level":         RiskHigh,
			})
		}
	}
	if err := s.recordTransaction(ctx, txType, senderID, receiverID, amount, TxSettled, relatedIntentID); err != nil {
		return nil, err
	}
	receipt := map[string]interface{}{
		"tx_id":            ctx.GetStub().GetTxID(),
		"status":           string(TxSettled),
		"transaction_type": string(txType),
		"sender_id":        senderID,
		"receiver_id":      receiverID,
		"amount":           amount,
		"reference_id":     relatedIntentID,
		"timestamp":        txNow(ctx).Format(time.RFC3339),
	}
	if err := s.putIdempotencyReceipt(ctx, string(txType), idempotencyKey, receipt); err != nil {
		return nil, err
	}
	return receipt, nil
}

// ─── Queries ─────────────────────────────────────────────────────────

func (s *SmartContract) GetWallet(ctx contractapi.TransactionContextInterface, walletID string) (*Wallet, error) {
	w, err := s.getWallet(ctx, walletID)
	if err != nil {
		return nil, err
	}
	return &w, nil
}

func (s *SmartContract) GetAllWallets(ctx contractapi.TransactionContextInterface) ([]*Wallet, error) {
	return s.ListWalletsByParticipant(ctx, "")
}

func (s *SmartContract) GetTierLimit(ctx contractapi.TransactionContextInterface, tier string) (*TierLimit, error) {
	l, err := s.getLimit(ctx, WalletTier(tier))
	if err != nil {
		return nil, err
	}
	return &l, nil
}

func (s *SmartContract) GetTotalSupply(ctx contractapi.TransactionContextInterface) (int64, error) {
	wallets, err := s.GetAllWallets(ctx)
	if err != nil {
		return 0, err
	}
	var total int64
	for _, w := range wallets {
		total, err = checkedAddInt64(total, w.Balance)
		if err != nil {
			return 0, err
		}
	}
	return total, nil
}

func (s *SmartContract) GetBalances(ctx contractapi.TransactionContextInterface) ([]*Wallet, error) {
	return s.GetAllWallets(ctx)
}

func (s *SmartContract) GetAuditLog(ctx contractapi.TransactionContextInterface, walletID string) ([]string, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("audit", []string{walletID})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var entries []string
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		entries = append(entries, string(kv.Value))
	}
	return entries, nil
}

// ─── Freeze / Unfreeze ──────────────────────────────────────────────

func (s *SmartContract) FreezeWallet(ctx contractapi.TransactionContextInterface, walletID string) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return err
	}
	wallet.Frozen = true
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	return s.putWallet(ctx, walletID, wallet)
}

func (s *SmartContract) UnfreezeWallet(ctx contractapi.TransactionContextInterface, walletID string) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return err
	}
	wallet.Frozen = false
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	return s.putWallet(ctx, walletID, wallet)
}

// ─── SetTierLimit ────────────────────────────────────────────────────

func (s *SmartContract) SetTierLimit(ctx contractapi.TransactionContextInterface, tier string, maxBalance int64, minBalance int64, dailyTxLimit int64, monthlyTxLimit int64, monthlyIncomingLimit int64, perTxLimit int64) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	limit := TierLimit{
		Tier:                 WalletTier(tier),
		MaxBalance:           maxBalance,
		MinBalance:           minBalance,
		DailyTxLimit:         dailyTxLimit,
		MonthlyTxLimit:       monthlyTxLimit,
		MonthlyIncomingLimit: monthlyIncomingLimit,
		PerTxLimit:           perTxLimit,
	}
	return s.putLimit(ctx, limit)
}

// ─── System Policy Limits ────────────────────────────────────────────

func (s *SmartContract) SetSystemLimit(ctx contractapi.TransactionContextInterface, scope string, value int64) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	ls := LimitScope(scope)
	if ls != ScopeGlobalSupply && ls != ScopePerParticipantBalance && ls != ScopePerTxAmount {
		return fmt.Errorf("invalid limit scope: %s", scope)
	}
	sl := SystemLimit{Scope: ls, Value: value}
	return s.putSystemLimit(ctx, sl)
}

func (s *SmartContract) ListSystemLimits(ctx contractapi.TransactionContextInterface) ([]*SystemLimit, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("syslimit", []string{})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var limits []*SystemLimit
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		var sl SystemLimit
		if err := json.Unmarshal(kv.Value, &sl); err != nil {
			continue
		}
		limits = append(limits, &sl)
	}
	return limits, nil
}

// ─── Auto-Limit Policy ────────────────────────────────────────────────

func (s *SmartContract) SetAutoLimitPolicy(ctx contractapi.TransactionContextInterface, participantID string, autoRedemption bool, minBalance int64) error {
	if err := requireBankIndonesia(ctx); err != nil {
		return err
	}
	policy := AutoLimitPolicy{
		ParticipantID:  participantID,
		AutoRedemption: autoRedemption,
		MinBalance:     minBalance,
		UpdatedAt:      txNow(ctx).Format(time.RFC3339),
	}
	if err := s.putAutoLimitPolicy(ctx, policy); err != nil {
		return err
	}
	return s.emitSupervisionEvent(ctx, "auto_limit_policy_set", "participant", participantID, policy)
}

func (s *SmartContract) GetAutoLimitPolicy(ctx contractapi.TransactionContextInterface, participantID string) (*AutoLimitPolicy, error) {
	return s.getAutoLimitPolicy(ctx, participantID)
}

func (s *SmartContract) autoRedeem(ctx contractapi.TransactionContextInterface, walletID string, amount int64) error {
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return err
	}
	if wallet.Balance < amount {
		return fmt.Errorf("auto-redeem: insufficient balance %d for amount %d", wallet.Balance, amount)
	}
	wallet.Balance -= amount
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, walletID, wallet); err != nil {
		return err
	}
	if err := s.emitAudit(ctx, "AUTO_REDEMPTION", walletID, "", amount); err != nil {
		return err
	}
	_ = s.emitSupervisionEvent(ctx, "auto_redemption", "wallet", walletID, map[string]interface{}{
		"wallet_id": walletID,
		"amount":    amount,
	})
	return s.recordTransaction(ctx, TxBurn, walletID, "", amount, TxSettled, "")
}

func (s *SmartContract) getAutoLimitPolicy(ctx contractapi.TransactionContextInterface, participantID string) (*AutoLimitPolicy, error) {
	key, err := ctx.GetStub().CreateCompositeKey("autolimit", []string{participantID})
	if err != nil {
		return nil, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return nil, err
	}
	if data == nil {
		return nil, fmt.Errorf("auto-limit policy for %s not found", participantID)
	}
	var p AutoLimitPolicy
	if err := json.Unmarshal(data, &p); err != nil {
		return nil, err
	}
	return &p, nil
}

func (s *SmartContract) putAutoLimitPolicy(ctx contractapi.TransactionContextInterface, policy AutoLimitPolicy) error {
	key, err := ctx.GetStub().CreateCompositeKey("autolimit", []string{policy.ParticipantID})
	if err != nil {
		return err
	}
	data, err := json.Marshal(policy)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

// ─── KYC / KYB Profiles ─────────────────────────────────────────────

func (s *SmartContract) SubmitKycProfile(ctx contractapi.TransactionContextInterface, profileID string, subjectType string, subjectID string, documentHashesJSON string) error {
	if err := requireInstitution(ctx); err != nil {
		return err
	}
	exists, err := s.kycProfileExists(ctx, profileID)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("KYC profile %s already exists", profileID)
	}
	st := KycSubjectType(subjectType)
	if st != SubjectParticipant && st != SubjectRetailCustomer && st != SubjectMerchant {
		return fmt.Errorf("invalid KYC subject type: %s", subjectType)
	}
	var hashes []string
	if err := json.Unmarshal([]byte(documentHashesJSON), &hashes); err != nil {
		return fmt.Errorf("invalid document_hashes: %w", err)
	}
	now := txNow(ctx)
	profile := KycProfile{
		ProfileID:         profileID,
		SubjectType:       st,
		SubjectID:         subjectID,
		DocumentHashes:    hashes,
		Status:            KycPending,
		RiskLevel:         RiskLow,
		DueDiligenceLevel: DueDiligenceSimplified,
		SeniorApproval:    false,
		CreatedAt:         now.Format(time.RFC3339),
		UpdatedAt:         now.Format(time.RFC3339),
	}
	if err := s.putKycProfile(ctx, profile); err != nil {
		return err
	}
	return s.emitKycAudit(ctx, profileID, "profile_created", "", "pending", "KYC profile submitted")
}

func (s *SmartContract) RefreshKycProfile(ctx contractapi.TransactionContextInterface, profileID string, status string, riskLevel string, dueDiligenceLevel string, seniorApproval bool, documentHashesJSON string, expiresAt string) error {
	if err := requireInstitution(ctx); err != nil {
		return err
	}
	profile, err := s.getKycProfile(ctx, profileID)
	if err != nil {
		return err
	}
	oldStatus := string(profile.Status)
	var hashes []string
	if documentHashesJSON != "" {
		if err := json.Unmarshal([]byte(documentHashesJSON), &hashes); err != nil {
			return fmt.Errorf("invalid document_hashes: %w", err)
		}
	}
	now := txNow(ctx)
	ks := KycStatus(status)
	if ks != KycPending && ks != KycInReview && ks != KycApproved && ks != KycRejected && ks != KycExpired && ks != KycSuspended {
		return fmt.Errorf("invalid KYC status: %s", status)
	}
	kr := KycRiskLevel(riskLevel)
	if kr != RiskLow && kr != RiskMedium && kr != RiskHigh && kr != RiskProhibited {
		return fmt.Errorf("invalid KYC risk level: %s", riskLevel)
	}
	dd := DueDiligenceLevel(dueDiligenceLevel)
	if dd != DueDiligenceSimplified && dd != DueDiligenceStandard && dd != DueDiligenceEnhanced {
		return fmt.Errorf("invalid due diligence level: %s", dueDiligenceLevel)
	}
	if ks == KycApproved && kr == RiskProhibited {
		return fmt.Errorf("prohibited-risk subject cannot be approved")
	}
	if KycStatus(status) == KycApproved && KycRiskLevel(riskLevel) == RiskHigh && (DueDiligenceLevel(dueDiligenceLevel) != DueDiligenceEnhanced || !seniorApproval) {
		return fmt.Errorf("high-risk approval requires enhanced due diligence and senior approval")
	}
	profile.Status = KycStatus(status)
	profile.RiskLevel = KycRiskLevel(riskLevel)
	profile.DueDiligenceLevel = DueDiligenceLevel(dueDiligenceLevel)
	profile.SeniorApproval = seniorApproval
	if len(hashes) > 0 {
		profile.DocumentHashes = hashes
	}
	profile.ExpiresAt = expiresAt
	profile.UpdatedAt = now.Format(time.RFC3339)
	if err := s.putKycProfile(ctx, profile); err != nil {
		return err
	}
	return s.emitKycAudit(ctx, profileID, "profile_refreshed", oldStatus, status, fmt.Sprintf("Provider decision: %s risk=%s due_diligence=%s senior_approval=%t", status, riskLevel, dueDiligenceLevel, seniorApproval))
}

func (s *SmartContract) GetKycProfile(ctx contractapi.TransactionContextInterface, profileID string) (*KycProfile, error) {
	p, err := s.getKycProfile(ctx, profileID)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (s *SmartContract) ListKycProviderChecks(ctx contractapi.TransactionContextInterface, profileID string) ([]*KycProviderCheck, error) {
	return []*KycProviderCheck{}, nil
}

func (s *SmartContract) ListKycAuditEvents(ctx contractapi.TransactionContextInterface, profileID string) ([]*KycAuditEvent, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("kyc_audit", []string{profileID})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var events []*KycAuditEvent
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		var ev KycAuditEvent
		if err := json.Unmarshal(kv.Value, &ev); err != nil {
			continue
		}
		events = append(events, &ev)
	}
	return events, nil
}

// ─── Retail Customers ────────────────────────────────────────────────

func (s *SmartContract) CreateRetailCustomer(ctx contractapi.TransactionContextInterface, customerID string, identityHash string, walletAccountID string, kycProfileID string) error {
	if err := requireInstitution(ctx); err != nil {
		return err
	}
	exists, err := s.retailCustomerExists(ctx, customerID)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("retail customer %s already exists", customerID)
	}
	now := txNow(ctx)
	rc := RetailCustomer{
		CustomerID:      customerID,
		IdentityHash:    identityHash,
		WalletAccountID: walletAccountID,
		KycProfileID:    kycProfileID,
		CreatedAt:       now.Format(time.RFC3339),
		UpdatedAt:       now.Format(time.RFC3339),
	}
	return s.putRetailCustomer(ctx, rc)
}

func (s *SmartContract) ListRetailCustomers(ctx contractapi.TransactionContextInterface) ([]*RetailCustomer, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("retail_customer", []string{})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var customers []*RetailCustomer
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		var rc RetailCustomer
		if err := json.Unmarshal(kv.Value, &rc); err != nil {
			continue
		}
		customers = append(customers, &rc)
	}
	return customers, nil
}

// ─── Transaction History ─────────────────────────────────────────────

func (s *SmartContract) GetTransactionHistory(ctx contractapi.TransactionContextInterface, participantID string, txType string, status string, fromTimestamp string, toTimestamp string) ([]*TransactionRecord, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("tx", []string{})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var records []*TransactionRecord
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		var tr TransactionRecord
		if err := json.Unmarshal(kv.Value, &tr); err != nil {
			continue
		}
		if participantID != "" && tr.SenderID != participantID && tr.ReceiverID != participantID {
			continue
		}
		if txType != "" && string(tr.TransactionType) != txType {
			continue
		}
		if status != "" && string(tr.Status) != status {
			continue
		}
		if fromTimestamp != "" && tr.Timestamp < fromTimestamp {
			continue
		}
		if toTimestamp != "" && tr.Timestamp > toTimestamp {
			continue
		}
		records = append(records, &tr)
	}
	return records, nil
}

// ─── Supervision ─────────────────────────────────────────────────────

func (s *SmartContract) GetSupervisionEvents(ctx contractapi.TransactionContextInterface) ([]*SupervisionEvent, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("supervision", []string{})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var events []*SupervisionEvent
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		var ev SupervisionEvent
		if err := json.Unmarshal(kv.Value, &ev); err != nil {
			continue
		}
		events = append(events, &ev)
	}
	return events, nil
}

func (s *SmartContract) GetReconciliationReport(ctx contractapi.TransactionContextInterface) (*ReconciliationReport, error) {
	wallets, err := s.GetAllWallets(ctx)
	if err != nil {
		return nil, err
	}
	participants, err := s.getAllParticipants(ctx)
	if err != nil {
		participants = nil
	}
	var totalSupply int64
	for _, w := range wallets {
		totalSupply += w.Balance
	}
	report := ReconciliationReport{
		ReportID:     fmt.Sprintf("rec_%s", txNow(ctx).Format("20060102150405")),
		TotalSupply:  totalSupply,
		TotalIssued:  0,
		TotalBurned:  0,
		Wallets:      len(wallets),
		Participants: len(participants),
		GeneratedAt:  txNow(ctx).Format(time.RFC3339),
	}
	txIter, err := ctx.GetStub().GetStateByPartialCompositeKey("tx", []string{})
	if err == nil {
		defer txIter.Close()
		for txIter.HasNext() {
			kv, err := txIter.Next()
			if err != nil {
				continue
			}
			var tr TransactionRecord
			if err := json.Unmarshal(kv.Value, &tr); err != nil {
				continue
			}
			switch tr.TransactionType {
			case TxMint:
				report.TotalIssued += tr.Amount
			case TxBurn:
				report.TotalBurned += tr.Amount
			}
		}
	}
	return &report, nil
}

func (s *SmartContract) GetMetrics(ctx contractapi.TransactionContextInterface) (*Metrics, error) {
	wallets, err := s.GetAllWallets(ctx)
	if err != nil {
		return nil, err
	}
	participants, err := s.getAllParticipants(ctx)
	if err != nil {
		participants = nil
	}
	var totalSupply int64
	activeWallets := int64(0)
	for _, w := range wallets {
		totalSupply += w.Balance
		if !w.Frozen {
			activeWallets++
		}
	}
	activeParticipants := int64(0)
	for _, p := range participants {
		if p.Status == ParticipantActive {
			activeParticipants++
		}
	}
	m := Metrics{
		ActiveWallets:      activeWallets,
		ActiveParticipants: activeParticipants,
		TotalSupply:        totalSupply,
	}
	txIter, err := ctx.GetStub().GetStateByPartialCompositeKey("tx", []string{})
	if err == nil {
		defer txIter.Close()
		for txIter.HasNext() {
			kv, err := txIter.Next()
			if err != nil {
				continue
			}
			var tr TransactionRecord
			if err := json.Unmarshal(kv.Value, &tr); err != nil {
				continue
			}
			m.TotalTransactions++
			switch tr.Status {
			case TxSettled:
				m.SettledCount++
			case TxRejected:
				m.RejectedCount++
			}
		}
	}
	return &m, nil
}

// ─── Internal helpers ────────────────────────────────────────────────

func (s *SmartContract) walletExists(ctx contractapi.TransactionContextInterface, walletID string) (bool, error) {
	key, err := ctx.GetStub().CreateCompositeKey("wallet", []string{walletID})
	if err != nil {
		return false, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return false, err
	}
	return data != nil, nil
}

func (s *SmartContract) getWallet(ctx contractapi.TransactionContextInterface, walletID string) (Wallet, error) {
	key, err := ctx.GetStub().CreateCompositeKey("wallet", []string{walletID})
	if err != nil {
		return Wallet{}, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return Wallet{}, err
	}
	if data == nil {
		return Wallet{}, fmt.Errorf("wallet %s not found", walletID)
	}
	var wallet Wallet
	if err := json.Unmarshal(data, &wallet); err != nil {
		return Wallet{}, err
	}
	return wallet, nil
}

func (s *SmartContract) putWallet(ctx contractapi.TransactionContextInterface, walletID string, wallet Wallet) error {
	key, err := ctx.GetStub().CreateCompositeKey("wallet", []string{walletID})
	if err != nil {
		return err
	}
	data, err := json.Marshal(wallet)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

func (s *SmartContract) listWalletsForParticipant(ctx contractapi.TransactionContextInterface, participantID string) ([]*Wallet, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("wallet", []string{})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var wallets []*Wallet
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		var wallet Wallet
		if err := json.Unmarshal(kv.Value, &wallet); err != nil {
			continue
		}
		if wallet.WalletID == "" {
			_, parts, _ := ctx.GetStub().SplitCompositeKey(kv.Key)
			if len(parts) > 0 {
				wallet.WalletID = parts[0]
			}
		}
		if wallet.ParticipantID == participantID || wallet.CustodianParticipantID == participantID {
			wallets = append(wallets, &wallet)
		}
	}
	return wallets, nil
}

func (s *SmartContract) sumParticipantBalances(ctx contractapi.TransactionContextInterface, participantID string) (int64, error) {
	wallets, err := s.listWalletsForParticipant(ctx, participantID)
	if err != nil {
		return 0, err
	}
	var total int64
	for _, wallet := range wallets {
		total, err = checkedAddInt64(total, wallet.Balance)
		if err != nil {
			return 0, err
		}
	}
	return total, nil
}

func (s *SmartContract) setParticipantWalletsFrozen(ctx contractapi.TransactionContextInterface, participantID string, frozen bool) error {
	wallets, err := s.listWalletsForParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	for _, wallet := range wallets {
		wallet.Frozen = frozen
		wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
		if err := s.putWallet(ctx, wallet.WalletID, *wallet); err != nil {
			return err
		}
	}
	return nil
}

func (s *SmartContract) ensurePerTxLimit(ctx contractapi.TransactionContextInterface, amount int64) error {
	limit, err := s.getSystemLimit(ctx, ScopePerTxAmount)
	if err != nil {
		return fmt.Errorf("per-transaction system limit: %w", err)
	}
	if amount > limit.Value {
		return fmt.Errorf("amount %d exceeds per-transaction limit %d", amount, limit.Value)
	}
	return nil
}

func (s *SmartContract) ensureGlobalSupplyRoom(ctx contractapi.TransactionContextInterface, amount int64) error {
	total, err := s.GetTotalSupply(ctx)
	if err != nil {
		return err
	}
	limit, err := s.getSystemLimit(ctx, ScopeGlobalSupply)
	if err != nil {
		return err
	}
	next, err := checkedAddInt64(total, amount)
	if err != nil {
		return err
	}
	if next > limit.Value {
		return fmt.Errorf("mint would exceed global supply limit %d", limit.Value)
	}
	return nil
}

func (s *SmartContract) ensureParticipantAggregateLimit(ctx contractapi.TransactionContextInterface, participantID string, walletID string, amount int64) error {
	if participantID == "" {
		return nil
	}
	limit, err := s.getSystemLimit(ctx, ScopePerParticipantBalance)
	if err != nil {
		return err
	}
	current, err := s.sumParticipantBalances(ctx, participantID)
	if err != nil {
		return err
	}
	next, err := checkedAddInt64(current, amount)
	if err != nil {
		return err
	}
	if next > limit.Value {
		return fmt.Errorf("participant %s aggregate balance would exceed %d", participantID, limit.Value)
	}
	return nil
}

func (s *SmartContract) walletCustodianParticipantID(wallet Wallet) string {
	if wallet.CustodianParticipantID != "" {
		return wallet.CustodianParticipantID
	}
	return wallet.ParticipantID
}

func (s *SmartContract) resolveCustodianParticipantID(ctx contractapi.TransactionContextInterface, mspID string) (string, error) {
	participants, err := s.getAllParticipants(ctx)
	if err != nil {
		return "", err
	}
	for _, participant := range participants {
		if participant.MSPID == mspID && participant.Status == ParticipantActive {
			return participant.ParticipantID, nil
		}
	}
	return "", fmt.Errorf("no active participant bound to MSP %s", mspID)
}

func (s *SmartContract) requireWalletCustodianMSP(ctx contractapi.TransactionContextInterface, wallet Wallet) error {
	callerMSP, err := currentMSP(ctx)
	if err != nil {
		return err
	}
	expectedMSP := wallet.CustodianMSPID
	if expectedMSP == "" {
		custodianID := s.walletCustodianParticipantID(wallet)
		if custodianID != "" {
			if participant, err := s.getParticipant(ctx, custodianID); err == nil {
				expectedMSP = participant.MSPID
			}
		}
	}
	if expectedMSP == "" {
		return fmt.Errorf("wallet %s has no custodian MSP binding", wallet.WalletID)
	}
	if callerMSP != expectedMSP {
		return fmt.Errorf("custodian MSP mismatch: caller %s must equal sender custodian %s", callerMSP, expectedMSP)
	}
	return nil
}

func (s *SmartContract) getLimit(ctx contractapi.TransactionContextInterface, tier WalletTier) (TierLimit, error) {
	key, err := ctx.GetStub().CreateCompositeKey("limit", []string{string(tier)})
	if err != nil {
		return TierLimit{}, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return TierLimit{}, err
	}
	if data == nil {
		return TierLimit{}, fmt.Errorf("limit for tier %s not found", tier)
	}
	var limit TierLimit
	if err := json.Unmarshal(data, &limit); err != nil {
		return TierLimit{}, err
	}
	return limit, nil
}

func hasCompositeState(ctx contractapi.TransactionContextInterface, objectType string) (bool, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey(objectType, []string{})
	if err != nil {
		return false, err
	}
	defer iter.Close()
	return iter.HasNext(), nil
}

func (s *SmartContract) putLimit(ctx contractapi.TransactionContextInterface, limit TierLimit) error {
	key, err := ctx.GetStub().CreateCompositeKey("limit", []string{string(limit.Tier)})
	if err != nil {
		return err
	}
	data, err := json.Marshal(limit)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

func (s *SmartContract) emitAudit(ctx contractapi.TransactionContextInterface, action string, senderID string, receiverID string, amount int64) error {
	timestamp := txNow(ctx).Format(time.RFC3339)
	entry := map[string]interface{}{
		"action":      action,
		"sender_id":   senderID,
		"receiver_id": receiverID,
		"amount":      amount,
		"timestamp":   timestamp,
		"tx_id":       ctx.GetStub().GetTxID(),
	}
	data, err := json.Marshal(entry)
	if err != nil {
		return err
	}
	key, err := ctx.GetStub().CreateCompositeKey("audit", []string{senderID, ctx.GetStub().GetTxID(), action, receiverID})
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

func (s *SmartContract) resetSpendingIfNewDay(wallet *Wallet, today string) {
	if wallet.LastResetDay != today {
		wallet.DailySpent = 0
		todayParsed, _ := time.Parse("2006-01-02", today)
		if t, err := time.Parse("2006-01-02", wallet.LastResetDay); err != nil || t.Month() != todayParsed.Month() {
			wallet.MonthlySpent = 0
		}
		wallet.LastResetDay = today
	}
}

// ─── Internal: Participants ──────────────────────────────────────────

func (s *SmartContract) participantExists(ctx contractapi.TransactionContextInterface, participantID string) (bool, error) {
	key, err := ctx.GetStub().CreateCompositeKey("participant", []string{participantID})
	if err != nil {
		return false, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return false, err
	}
	return data != nil, nil
}

func (s *SmartContract) getParticipant(ctx contractapi.TransactionContextInterface, participantID string) (Participant, error) {
	key, err := ctx.GetStub().CreateCompositeKey("participant", []string{participantID})
	if err != nil {
		return Participant{}, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return Participant{}, err
	}
	if data == nil {
		return Participant{}, fmt.Errorf("participant %s not found", participantID)
	}
	var p Participant
	if err := json.Unmarshal(data, &p); err != nil {
		return Participant{}, err
	}
	return p, nil
}

func (s *SmartContract) getParticipantByBICOrID(ctx contractapi.TransactionContextInterface, bicOrID string) (Participant, error) {
	if bicOrID == "" {
		return Participant{}, fmt.Errorf("participant identifier is required")
	}
	indexKey, err := ctx.GetStub().CreateCompositeKey("participant_bic", []string{bicOrID})
	if err == nil {
		if participantID, getErr := ctx.GetStub().GetState(indexKey); getErr == nil && participantID != nil {
			return s.getParticipant(ctx, string(participantID))
		}
	}
	return s.getParticipant(ctx, bicOrID)
}

func (s *SmartContract) putParticipant(ctx contractapi.TransactionContextInterface, p Participant) error {
	if p.BIC != "" {
		indexKey, err := ctx.GetStub().CreateCompositeKey("participant_bic", []string{p.BIC})
		if err != nil {
			return err
		}
		existing, err := ctx.GetStub().GetState(indexKey)
		if err != nil {
			return err
		}
		if existing != nil && string(existing) != p.ParticipantID {
			return fmt.Errorf("participant BIC %s is already bound to %s", p.BIC, string(existing))
		}
		if err := ctx.GetStub().PutState(indexKey, []byte(p.ParticipantID)); err != nil {
			return err
		}
	}
	key, err := ctx.GetStub().CreateCompositeKey("participant", []string{p.ParticipantID})
	if err != nil {
		return err
	}
	data, err := json.Marshal(p)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

func (s *SmartContract) getAllParticipants(ctx contractapi.TransactionContextInterface) ([]*Participant, error) {
	iter, err := ctx.GetStub().GetStateByPartialCompositeKey("participant", []string{})
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	var participants []*Participant
	for iter.HasNext() {
		kv, err := iter.Next()
		if err != nil {
			return nil, err
		}
		var p Participant
		if err := json.Unmarshal(kv.Value, &p); err != nil {
			continue
		}
		participants = append(participants, &p)
	}
	return participants, nil
}

func (s *SmartContract) getIdempotencyReceipt(ctx contractapi.TransactionContextInterface, operation string, key string) (map[string]interface{}, error) {
	if key == "" {
		return nil, nil
	}
	recordKey, err := ctx.GetStub().CreateCompositeKey("idempotency", []string{operation, key})
	if err != nil {
		return nil, err
	}
	data, err := ctx.GetStub().GetState(recordKey)
	if err != nil || data == nil {
		return nil, err
	}
	var record IdempotencyRecord
	if err := json.Unmarshal(data, &record); err != nil {
		return nil, err
	}
	var receipt map[string]interface{}
	if err := json.Unmarshal([]byte(record.Payload), &receipt); err != nil {
		return nil, err
	}
	return receipt, nil
}

func (s *SmartContract) putIdempotencyReceipt(ctx contractapi.TransactionContextInterface, operation string, key string, receipt map[string]interface{}) error {
	if key == "" {
		return nil
	}
	payload, err := json.Marshal(receipt)
	if err != nil {
		return err
	}
	record := IdempotencyRecord{
		Operation: operation,
		Key:       key,
		TxID:      ctx.GetStub().GetTxID(),
		Payload:   string(payload),
		Timestamp: txNow(ctx).Format(time.RFC3339),
	}
	recordKey, err := ctx.GetStub().CreateCompositeKey("idempotency", []string{operation, key})
	if err != nil {
		return err
	}
	data, err := json.Marshal(record)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(recordKey, data)
}

// ─── Internal: System Limits ─────────────────────────────────────────

func (s *SmartContract) putSystemLimit(ctx contractapi.TransactionContextInterface, sl SystemLimit) error {
	key, err := ctx.GetStub().CreateCompositeKey("syslimit", []string{string(sl.Scope)})
	if err != nil {
		return err
	}
	data, err := json.Marshal(sl)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

func (s *SmartContract) getSystemLimit(ctx contractapi.TransactionContextInterface, scope LimitScope) (SystemLimit, error) {
	key, err := ctx.GetStub().CreateCompositeKey("syslimit", []string{string(scope)})
	if err != nil {
		return SystemLimit{}, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return SystemLimit{}, err
	}
	if data == nil {
		return SystemLimit{}, fmt.Errorf("system limit %s not found", scope)
	}
	var limit SystemLimit
	if err := json.Unmarshal(data, &limit); err != nil {
		return SystemLimit{}, err
	}
	return limit, nil
}

// ─── Internal: KYC ──────────────────────────────────────────────────

func (s *SmartContract) kycProfileExists(ctx contractapi.TransactionContextInterface, profileID string) (bool, error) {
	key, err := ctx.GetStub().CreateCompositeKey("kyc_profile", []string{profileID})
	if err != nil {
		return false, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return false, err
	}
	return data != nil, nil
}

func (s *SmartContract) getKycProfile(ctx contractapi.TransactionContextInterface, profileID string) (KycProfile, error) {
	key, err := ctx.GetStub().CreateCompositeKey("kyc_profile", []string{profileID})
	if err != nil {
		return KycProfile{}, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return KycProfile{}, err
	}
	if data == nil {
		return KycProfile{}, fmt.Errorf("KYC profile %s not found", profileID)
	}
	var p KycProfile
	if err := json.Unmarshal(data, &p); err != nil {
		return KycProfile{}, err
	}
	return p, nil
}

func (s *SmartContract) getKycProfileBySubject(ctx contractapi.TransactionContextInterface, subjectID string) (KycProfile, error) {
	indexKey, err := ctx.GetStub().CreateCompositeKey("kyc_subject", []string{subjectID})
	if err != nil {
		return KycProfile{}, err
	}
	profileIDBytes, err := ctx.GetStub().GetState(indexKey)
	if err != nil {
		return KycProfile{}, err
	}
	if profileIDBytes == nil {
		return KycProfile{}, fmt.Errorf("approved KYC anchor not found for subject %s", subjectID)
	}
	return s.getKycProfile(ctx, string(profileIDBytes))
}

func (s *SmartContract) requireApprovedKyc(ctx contractapi.TransactionContextInterface, wallet Wallet) error {
	return s.requireApprovedKycSubject(ctx, wallet.OwnerID)
}

func (s *SmartContract) requireApprovedKycSubject(ctx contractapi.TransactionContextInterface, subjectID string) error {
	profile, err := s.getKycProfileBySubject(ctx, subjectID)
	if err != nil {
		return err
	}
	return validateKycEligibility(profile, txNow(ctx))
}

func (s *SmartContract) putKycProfile(ctx contractapi.TransactionContextInterface, p KycProfile) error {
	key, err := ctx.GetStub().CreateCompositeKey("kyc_profile", []string{p.ProfileID})
	if err != nil {
		return err
	}
	data, err := json.Marshal(p)
	if err != nil {
		return err
	}
	if err := ctx.GetStub().PutState(key, data); err != nil {
		return err
	}
	indexKey, err := ctx.GetStub().CreateCompositeKey("kyc_subject", []string{p.SubjectID})
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(indexKey, []byte(p.ProfileID))
}

func (s *SmartContract) emitKycAudit(ctx contractapi.TransactionContextInterface, profileID string, eventType string, oldStatus string, newStatus string, description string) error {
	now := txNow(ctx)
	eventID := fmt.Sprintf("evt_%s_%s", profileID, now.Format("20060102150405"))
	ev := KycAuditEvent{
		EventID:     eventID,
		ProfileID:   profileID,
		EventType:   eventType,
		OldStatus:   oldStatus,
		NewStatus:   newStatus,
		Description: description,
		Timestamp:   now.Format(time.RFC3339),
	}
	key, err := ctx.GetStub().CreateCompositeKey("kyc_audit", []string{profileID, eventID})
	if err != nil {
		return err
	}
	data, err := json.Marshal(ev)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

// ─── Internal: Retail Customers ──────────────────────────────────────

func (s *SmartContract) retailCustomerExists(ctx contractapi.TransactionContextInterface, customerID string) (bool, error) {
	key, err := ctx.GetStub().CreateCompositeKey("retail_customer", []string{customerID})
	if err != nil {
		return false, err
	}
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return false, err
	}
	return data != nil, nil
}

func (s *SmartContract) putRetailCustomer(ctx contractapi.TransactionContextInterface, rc RetailCustomer) error {
	key, err := ctx.GetStub().CreateCompositeKey("retail_customer", []string{rc.CustomerID})
	if err != nil {
		return err
	}
	data, err := json.Marshal(rc)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

// ─── Internal: Transactions & Supervision ────────────────────────────

func (s *SmartContract) recordTransaction(ctx contractapi.TransactionContextInterface, txType TransactionType, senderID string, receiverID string, amount int64, status TransactionStatus, relatedIntentID string) error {
	now := txNow(ctx)
	tr := TransactionRecord{
		RecordID:        fmt.Sprintf("%s:%s:%s:%s", ctx.GetStub().GetTxID(), txType, senderID, receiverID),
		TxID:            ctx.GetStub().GetTxID(),
		TransactionType: txType,
		SenderID:        senderID,
		ReceiverID:      receiverID,
		Amount:          amount,
		Status:          status,
		RelatedIntentID: relatedIntentID,
		Timestamp:       now.Format(time.RFC3339),
	}
	key, err := ctx.GetStub().CreateCompositeKey("tx", []string{tr.TxID, string(txType), senderID, receiverID, relatedIntentID})
	if err != nil {
		return err
	}
	data, err := json.Marshal(tr)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, data)
}

func (s *SmartContract) emitSupervisionEvent(ctx contractapi.TransactionContextInterface, eventType string, entityType string, entityID string, data interface{}) error {
	now := txNow(ctx)
	eventID := fmt.Sprintf("sup_%s_%s_%s", entityID, eventType, ctx.GetStub().GetTxID())
	var dataStr string
	if data != nil {
		b, err := json.Marshal(data)
		if err != nil {
			return err
		}
		dataStr = string(b)
	}
	ev := SupervisionEvent{
		EventID:    eventID,
		EventType:  eventType,
		EntityType: entityType,
		EntityID:   entityID,
		Data:       dataStr,
		Timestamp:  now.Format(time.RFC3339),
	}
	key, err := ctx.GetStub().CreateCompositeKey("supervision", []string{entityID, eventID})
	if err != nil {
		return err
	}
	evData, err := json.Marshal(ev)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, evData)
}

// ─── Backend-compatible wrappers ──────────────────────────────────────

func (s *SmartContract) GetParticipant(ctx contractapi.TransactionContextInterface, participantID string) (*Participant, error) {
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (s *SmartContract) ListParticipants(ctx contractapi.TransactionContextInterface) ([]*Participant, error) {
	return s.getAllParticipants(ctx)
}

func (s *SmartContract) ListWallets(ctx contractapi.TransactionContextInterface, participantID string) ([]*Wallet, error) {
	return s.ListWalletsByParticipant(ctx, participantID)
}

func (s *SmartContract) RequestIssuance(ctx contractapi.TransactionContextInterface, amount int64) (interface{}, error) {
	return nil, s.Mint(ctx, "bi_treasury", amount)
}

func (s *SmartContract) RequestRedemption(ctx contractapi.TransactionContextInterface, participantID string, amount int64) (interface{}, error) {
	if err := requireInstitution(ctx); err != nil {
		return nil, err
	}
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return nil, err
	}
	if p.Status != "active" {
		return nil, fmt.Errorf("participant %s is not active", participantID)
	}
	walletID := fmt.Sprintf("wlt_%s", p.ParticipantID)
	return nil, s.Burn(ctx, walletID, amount)
}

func (s *SmartContract) RequestIssuanceRtgs(ctx contractapi.TransactionContextInterface, participantID string, amount int64, reference string) (interface{}, error) {
	if err := requireBankIndonesia(ctx); err != nil {
		return nil, err
	}
	if reference == "" {
		return nil, fmt.Errorf("reference is required")
	}
	if amount <= 0 {
		return nil, fmt.Errorf("amount must be positive")
	}
	if receipt, err := s.getIdempotencyReceipt(ctx, "rtgs_issuance", reference); err != nil {
		return nil, err
	} else if receipt != nil {
		return receipt, nil
	}
	p, err := s.getParticipantByBICOrID(ctx, participantID)
	if err != nil {
		return nil, err
	}
	if p.ParticipantType == ParticipantPJP {
		return nil, fmt.Errorf("PJP participants cannot request RTGS issuance; receive liquidity through Treasury distribution")
	}
	if p.Status != "active" {
		return nil, fmt.Errorf("participant %s is not active", participantID)
	}
	walletID := "bi_treasury"
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return nil, err
	}
	if wallet.Frozen {
		return nil, fmt.Errorf("wallet %s is frozen", walletID)
	}
	if err := s.ensurePerTxLimit(ctx, amount); err != nil {
		return nil, err
	}
	if err := s.ensureGlobalSupplyRoom(ctx, amount); err != nil {
		return nil, err
	}
	newBalance, err := checkedAddInt64(wallet.Balance, amount)
	if err != nil {
		return nil, err
	}
	wallet.Balance = newBalance
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, walletID, wallet); err != nil {
		return nil, err
	}
	if err := s.emitAudit(ctx, "RTGS_ISSUANCE", walletID, "", amount); err != nil {
		return nil, err
	}
	if err := s.recordTransaction(ctx, TxMint, walletID, "", amount, TxSettled, reference); err != nil {
		return nil, err
	}
	receipt := map[string]interface{}{
		"status":         "issued",
		"reference":      reference,
		"amount":         amount,
		"participant_id": p.ParticipantID,
		"sender_bic":     p.BIC,
		"wallet_id":      walletID,
		"tx_id":          ctx.GetStub().GetTxID(),
		"timestamp":      txNow(ctx).Format(time.RFC3339),
	}
	if err := s.emitSupervisionEvent(ctx, "rtgs_issuance", "participant", p.ParticipantID, receipt); err != nil {
		return nil, err
	}
	if err := s.putIdempotencyReceipt(ctx, "rtgs_issuance", reference, receipt); err != nil {
		return nil, err
	}
	return receipt, nil
}

// DistributeToParticipant transfers liquidity from Treasury to an institutional Custodian.
func (s *SmartContract) DistributeToParticipant(ctx contractapi.TransactionContextInterface, receiverParticipantID string, amount int64, referenceID string) (map[string]interface{}, error) {
	if err := requireBankIndonesia(ctx); err != nil {
		return nil, err
	}
	if referenceID == "" {
		return nil, fmt.Errorf("reference id is required")
	}
	if receipt, err := s.getIdempotencyReceipt(ctx, "distribution", referenceID); err != nil {
		return nil, err
	} else if receipt != nil {
		return receipt, nil
	}
	if amount <= 0 {
		return nil, fmt.Errorf("amount must be positive")
	}
	if err := s.ensurePerTxLimit(ctx, amount); err != nil {
		return nil, err
	}
	receiver, err := s.getParticipant(ctx, receiverParticipantID)
	if err != nil {
		return nil, fmt.Errorf("receiver participant: %w", err)
	}
	if receiver.ParticipantType != ParticipantValidator && receiver.ParticipantType != ParticipantPJP {
		return nil, fmt.Errorf("receiver %s must be a validator or PJP; got %s", receiverParticipantID, receiver.ParticipantType)
	}
	if receiver.Status != ParticipantActive {
		return nil, fmt.Errorf("receiver participant %s is not active", receiverParticipantID)
	}
	senderWalletID := "bi_treasury"
	receiverWalletID := fmt.Sprintf("wlt_%s", receiverParticipantID)
	senderWallet, err := s.getWallet(ctx, senderWalletID)
	if err != nil {
		return nil, fmt.Errorf("sender wallet: %w", err)
	}
	receiverWallet, err := s.getWallet(ctx, receiverWalletID)
	if err != nil {
		return nil, fmt.Errorf("receiver wallet: %w", err)
	}
	if senderWallet.Frozen || receiverWallet.Frozen {
		return nil, fmt.Errorf("distribution requires unfrozen sender and receiver wallets")
	}
	newSenderBalance, err := checkedSubInt64(senderWallet.Balance, amount)
	if err != nil {
		return nil, err
	}
	if err := s.ensureParticipantAggregateLimit(ctx, receiverParticipantID, receiverWalletID, amount); err != nil {
		return nil, err
	}
	newReceiverBalance, err := checkedAddInt64(receiverWallet.Balance, amount)
	if err != nil {
		return nil, err
	}
	senderWallet.Balance = newSenderBalance
	senderWallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	receiverWallet.Balance = newReceiverBalance
	receiverWallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, senderWalletID, senderWallet); err != nil {
		return nil, err
	}
	if err := s.putWallet(ctx, receiverWalletID, receiverWallet); err != nil {
		return nil, err
	}
	if err := s.emitAudit(ctx, "TREASURY_DISTRIBUTION", senderWalletID, receiverWalletID, amount); err != nil {
		return nil, err
	}
	if err := s.recordTransaction(ctx, TxDistribution, senderWalletID, receiverWalletID, amount, TxSettled, referenceID); err != nil {
		return nil, err
	}
	receipt := map[string]interface{}{
		"status":                  string(TxSettled),
		"sender_id":               senderWalletID,
		"receiver_id":             receiverWalletID,
		"sender_participant_id":   "bank_indonesia",
		"receiver_participant_id": receiverParticipantID,
		"amount":                  amount,
		"reference_id":            referenceID,
		"tx_id":                   ctx.GetStub().GetTxID(),
		"timestamp":               txNow(ctx).Format(time.RFC3339),
	}
	if err := s.emitSupervisionEvent(ctx, "treasury_distribution", "participant", receiverParticipantID, receipt); err != nil {
		return nil, err
	}
	if err := s.putIdempotencyReceipt(ctx, "distribution", referenceID, receipt); err != nil {
		return nil, err
	}
	return receipt, nil
}

func (s *SmartContract) GetTransactions(ctx contractapi.TransactionContextInterface, participantID string, txType string, status string, fromTimestamp string, toTimestamp string) ([]*TransactionRecord, error) {
	return s.GetTransactionHistory(ctx, participantID, txType, status, fromTimestamp, toTimestamp)
}

func (s *SmartContract) GetTopology(ctx contractapi.TransactionContextInterface) (interface{}, error) {
	nodes := []map[string]string{
		{"id": "bi-node", "name": "Bank Indonesia", "type": "central_bank", "role": "issuer", "domain": "bi.go.id"},
		{"id": "validator-a", "name": "Himbara Bank", "type": "validator", "role": "validator", "domain": "bank-himbara.paynet"},
		{"id": "validator-b", "name": "Commercial Bank", "type": "validator", "role": "validator", "domain": "bank-commercial.paynet"},
		{"id": "observer-node", "name": "OJK Observer", "type": "observer", "role": "observer", "domain": "ojk.go.id"},
		{"id": "policy-node", "name": "Policy Oracle", "type": "policy", "role": "policy", "domain": "policy.paynet"},
		{"id": "security-node", "name": "Security Node", "type": "security", "role": "security", "domain": "security.paynet"},
		{"id": "api-gateway", "name": "API Gateway", "type": "gateway", "role": "api", "domain": "api.paynet"},
	}
	links := []map[string]string{
		{"source": "bi-node", "target": "validator-a", "type": "consensus"},
		{"source": "bi-node", "target": "validator-b", "type": "consensus"},
		{"source": "validator-a", "target": "validator-b", "type": "p2p"},
		{"source": "validator-a", "target": "api-gateway", "type": "api"},
		{"source": "validator-b", "target": "api-gateway", "type": "api"},
		{"source": "observer-node", "target": "validator-a", "type": "observe"},
		{"source": "observer-node", "target": "validator-b", "type": "observe"},
		{"source": "bi-node", "target": "observer-node", "type": "oversight"},
	}
	return map[string]interface{}{"nodes": nodes, "links": links}, nil
}

// ─── Main ────────────────────────────────────────────────────────────

func main() {
	chaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		panic(fmt.Sprintf("failed to create chaincode: %v", err))
	}
	if err := chaincode.Start(); err != nil {
		panic(fmt.Sprintf("failed to start chaincode: %v", err))
	}
}
