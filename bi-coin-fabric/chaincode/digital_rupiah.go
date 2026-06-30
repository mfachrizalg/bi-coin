package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

type SmartContract struct {
	contractapi.Contract
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
	ParticipantPending ParticipantStatus = "pending"
	ParticipantActive  ParticipantStatus = "active"
	ParticipantFrozen  ParticipantStatus = "frozen"
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
	TxMint     TransactionType = "issuance"
	TxBurn     TransactionType = "redemption"
	TxTransfer TransactionType = "transfer"
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
	ParticipantType       ParticipantType   `json:"participant_type"`
	InitialReserveBalance string            `json:"initial_reserve_balance"`
	ComplianceStatus      string            `json:"compliance_status"`
	Status                ParticipantStatus `json:"status"`
	CreatedAt             string            `json:"created_at"`
	UpdatedAt             string            `json:"updated_at"`
}

type Wallet struct {
	WalletID        string     `json:"wallet_id"`
	OwnerID         string     `json:"owner_id"`
	ParticipantID   string     `json:"participant_id"`
	Tier            WalletTier `json:"tier"`
	WalletType      WalletType `json:"wallet_type"`
	Balance         int64      `json:"balance"`
	Frozen          bool       `json:"frozen"`
	DailySpent      int64      `json:"daily_spent"`
	MonthlySpent    int64      `json:"monthly_spent"`
	MonthlyReceived int64      `json:"monthly_received"`
	LastResetDay    string     `json:"last_reset_day"`
	LastResetMonth  string     `json:"last_reset_month"`
	CreatedAt       string     `json:"created_at"`
	UpdatedAt       string     `json:"updated_at"`
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
		OwnerID:        "bank_indonesia",
		ParticipantID:  "bank_indonesia",
		Tier:           "",
		WalletType:     WalletHot,
		Balance:        0,
		LastResetDay:   now.Format("2006-01-02"),
		LastResetMonth: now.Format("2006-01"),
		CreatedAt:      now.Format(time.RFC3339),
		UpdatedAt:      now.Format(time.RFC3339),
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

	return nil
}

// ─── Participants ────────────────────────────────────────────────────

func (s *SmartContract) SubmitParticipant(ctx contractapi.TransactionContextInterface, participantID string, name string, domain string, accountID string, participantType string, initialReserveBalance string, complianceStatus string) error {
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
	walletID := fmt.Sprintf("wlt_%s", participantID)
	exists, _ := s.walletExists(ctx, walletID)
	if !exists {
		w := Wallet{
			WalletID:      walletID,
			OwnerID:       participantID,
			ParticipantID: participantID,
			Tier:          TierMerchant,
			WalletType:    WalletHot,
			Balance:       0,
			LastResetDay:  txNow(ctx).Format("2006-01-02"),
			CreatedAt:     txNow(ctx).Format(time.RFC3339),
			UpdatedAt:     txNow(ctx).Format(time.RFC3339),
		}
		if err := s.putWallet(ctx, walletID, w); err != nil {
			return err
		}
	}
	return s.emitSupervisionEvent(ctx, "participant_approved", "participant", participantID, p)
}

func (s *SmartContract) FreezeParticipant(ctx contractapi.TransactionContextInterface, participantID string) error {
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	p.Status = ParticipantFrozen
	p.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putParticipant(ctx, p); err != nil {
		return err
	}
	walletID := fmt.Sprintf("wlt_%s", participantID)
	if exists, _ := s.walletExists(ctx, walletID); exists {
		_ = s.FreezeWallet(ctx, walletID)
	}
	return s.emitSupervisionEvent(ctx, "participant_frozen", "participant", participantID, p)
}

func (s *SmartContract) UnfreezeParticipant(ctx contractapi.TransactionContextInterface, participantID string) error {
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
	walletID := fmt.Sprintf("wlt_%s", participantID)
	if exists, _ := s.walletExists(ctx, walletID); exists {
		_ = s.UnfreezeWallet(ctx, walletID)
	}
	return s.emitSupervisionEvent(ctx, "participant_unfrozen", "participant", participantID, p)
}

func (s *SmartContract) RejectParticipant(ctx contractapi.TransactionContextInterface, participantID string) error {
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	key, err := ctx.GetStub().CreateCompositeKey("participant", []string{participantID})
	if err != nil {
		return err
	}
	if err := ctx.GetStub().DelState(key); err != nil {
		return err
	}
	return s.emitSupervisionEvent(ctx, "participant_rejected", "participant", participantID, p)
}

func (s *SmartContract) OffboardParticipant(ctx contractapi.TransactionContextInterface, participantID string) error {
	_, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return err
	}
	key, err := ctx.GetStub().CreateCompositeKey("participant", []string{participantID})
	if err != nil {
		return err
	}
	if err := ctx.GetStub().DelState(key); err != nil {
		return err
	}
	walletID := fmt.Sprintf("wlt_%s", participantID)
	if exists, _ := s.walletExists(ctx, walletID); exists {
		wkey, _ := ctx.GetStub().CreateCompositeKey("wallet", []string{walletID})
		_ = ctx.GetStub().DelState(wkey)
	}
	return s.emitSupervisionEvent(ctx, "participant_offboarded", "participant", participantID, nil)
}

// ─── Wallets (wholesale model) ───────────────────────────────────────

func (s *SmartContract) CreateWholesaleWallet(ctx contractapi.TransactionContextInterface, walletID string, participantID string, walletType string) error {
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
		OwnerID:        participantID,
		ParticipantID:  participantID,
		Tier:           "",
		WalletType:     wt,
		Balance:        0,
		LastResetDay:   now.Format("2006-01-02"),
		LastResetMonth: now.Format("2006-01"),
		CreatedAt:      now.Format(time.RFC3339),
		UpdatedAt:      now.Format(time.RFC3339),
	}
	return s.putWallet(ctx, walletID, w)
}

func (s *SmartContract) ListWalletsByParticipant(ctx contractapi.TransactionContextInterface, participantID string) ([]*Wallet, error) {
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
		if participantID == "" || w.ParticipantID == participantID {
			wallets = append(wallets, &w)
		}
	}
	return wallets, nil
}

// ─── Legacy CreateWallet (compat with old API) ───────────────────────

func (s *SmartContract) CreateWallet(ctx contractapi.TransactionContextInterface, walletID string, ownerID string, tier string) error {
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
	wallet := Wallet{
		WalletID:       walletID,
		OwnerID:        ownerID,
		ParticipantID:  ownerID,
		Tier:           walletTier,
		WalletType:     WalletHot,
		Balance:        0,
		LastResetDay:   now.Format("2006-01-02"),
		LastResetMonth: now.Format("2006-01"),
		CreatedAt:      now.Format(time.RFC3339),
		UpdatedAt:      now.Format(time.RFC3339),
	}
	return s.putWallet(ctx, walletID, wallet)
}

// ─── Mint / Burn / Transfer ──────────────────────────────────────────

func (s *SmartContract) Mint(ctx contractapi.TransactionContextInterface, walletID string, amount int64) error {
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
	newBalance := wallet.Balance + amount
	if wallet.Tier == "" {
		limit, err := s.getSystemLimit(ctx, ScopePerParticipantBalance)
		if err != nil {
			return err
		}
		if newBalance > limit.Value {
			return fmt.Errorf("mint would exceed institutional wallet limit %d", limit.Value)
		}
	} else {
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
	_ = s.emitAudit(ctx, "MINT", walletID, "", amount)
	return s.recordTransaction(ctx, TxMint, walletID, "", amount, TxSettled, "")
}

func (s *SmartContract) Burn(ctx contractapi.TransactionContextInterface, walletID string, amount int64) error {
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
	if wallet.Balance < amount {
		return fmt.Errorf("insufficient balance: have %d, need %d", wallet.Balance, amount)
	}
	wallet.Balance -= amount
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, walletID, wallet); err != nil {
		return err
	}
	_ = s.emitAudit(ctx, "BURN", walletID, "", amount)
	return s.recordTransaction(ctx, TxBurn, walletID, "", amount, TxSettled, "")
}

func (s *SmartContract) Transfer(ctx contractapi.TransactionContextInterface, senderID string, receiverID string, amount int64) error {
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	if senderID == receiverID {
		return fmt.Errorf("sender and receiver must differ")
	}
	sender, err := s.getWallet(ctx, senderID)
	if err != nil {
		return err
	}
	if sender.Frozen {
		return fmt.Errorf("sender wallet %s is frozen", senderID)
	}
	if err := s.requireApprovedKyc(ctx, sender); err != nil {
		return err
	}
	receiver, err := s.getWallet(ctx, receiverID)
	if err != nil {
		return err
	}
	if receiver.Frozen {
		return fmt.Errorf("receiver wallet %s is frozen", receiverID)
	}
	senderLimit, err := s.getLimit(ctx, sender.Tier)
	if err != nil {
		return err
	}
	receiverLimit, err := s.getLimit(ctx, receiver.Tier)
	if err != nil {
		return err
	}
	if err := applyRetailTransferPolicy(&sender, &receiver, amount, senderLimit, receiverLimit, txNow(ctx)); err != nil {
		return err
	}
	sender.Balance -= amount
	sender.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	receiver.Balance += amount
	receiver.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, senderID, sender); err != nil {
		return err
	}
	if err := s.putWallet(ctx, receiverID, receiver); err != nil {
		return err
	}
	if senderLimit.MinBalance > 0 && sender.Balance < senderLimit.MinBalance {
		policy, err := s.getAutoLimitPolicy(ctx, sender.ParticipantID)
		if err == nil && policy.AutoRedemption && sender.Balance > 0 {
			if arErr := s.autoRedeem(ctx, senderID, sender.Balance); arErr != nil {
				_ = s.emitAudit(ctx, "AUTO_REDEMPTION_FAILED", senderID, "", sender.Balance)
			}
		}
	}
	_ = s.emitAudit(ctx, "TRANSFER", senderID, receiverID, amount)
	if profile, err := s.getKycProfileBySubject(ctx, sender.OwnerID); err == nil && profile.RiskLevel == RiskHigh {
		_ = s.emitSupervisionEvent(ctx, "HIGH_RISK_TRANSFER", "wallet", senderID, map[string]interface{}{
			"sender_wallet_id":   senderID,
			"receiver_wallet_id": receiverID,
			"amount":             amount,
			"risk_level":         RiskHigh,
		})
	}
	return s.recordTransaction(ctx, TxTransfer, senderID, receiverID, amount, TxSettled, "")
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
		total += w.Balance
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
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return err
	}
	wallet.Frozen = true
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	return s.putWallet(ctx, walletID, wallet)
}

func (s *SmartContract) UnfreezeWallet(ctx contractapi.TransactionContextInterface, walletID string) error {
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
	ls := LimitScope(scope)
	if ls != ScopeGlobalSupply && ls != ScopePerParticipantBalance && ls != ScopePerTxAmount && ls != ScopeMinParticipantBalance {
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
	_ = s.emitAudit(ctx, "AUTO_REDEMPTION", walletID, "", amount)
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
	key, err := ctx.GetStub().CreateCompositeKey("audit", []string{senderID, ctx.GetStub().GetTxID()})
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

func (s *SmartContract) putParticipant(ctx contractapi.TransactionContextInterface, p Participant) error {
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
		TxID:            ctx.GetStub().GetTxID(),
		TransactionType: txType,
		SenderID:        senderID,
		ReceiverID:      receiverID,
		Amount:          amount,
		Status:          status,
		RelatedIntentID: relatedIntentID,
		Timestamp:       now.Format(time.RFC3339),
	}
	key, err := ctx.GetStub().CreateCompositeKey("tx", []string{tr.TxID})
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
	eventID := fmt.Sprintf("sup_%s_%s", entityID, now.Format("20060102150405"))
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

func (s *SmartContract) RequestIssuance(ctx contractapi.TransactionContextInterface, participantID string, amount int64) (interface{}, error) {
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return nil, err
	}
	if p.ParticipantType == ParticipantPJP {
		return nil, fmt.Errorf("PJP participants cannot request direct issuance; receive liquidity via DistributeToParticipant from a bank validator")
	}
	if p.Status != "active" {
		return nil, fmt.Errorf("participant %s is not active", participantID)
	}
	walletID := fmt.Sprintf("wlt_%s", participantID)
	return nil, s.Mint(ctx, walletID, amount)
}

func (s *SmartContract) RequestRedemption(ctx contractapi.TransactionContextInterface, participantID string, amount int64) (interface{}, error) {
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return nil, err
	}
	if p.Status != "active" {
		return nil, fmt.Errorf("participant %s is not active", participantID)
	}
	walletID := fmt.Sprintf("wlt_%s", participantID)
	return nil, s.Burn(ctx, walletID, amount)
}

func (s *SmartContract) RequestIssuanceRtgs(ctx contractapi.TransactionContextInterface, participantID string, amount int64, reference string) (interface{}, error) {
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return nil, err
	}
	if p.ParticipantType == ParticipantPJP {
		return nil, fmt.Errorf("PJP participants cannot request RTGS issuance; receive liquidity via DistributeToParticipant from a bank validator")
	}
	if p.Status != "active" {
		return nil, fmt.Errorf("participant %s is not active", participantID)
	}
	walletID := fmt.Sprintf("wlt_%s", participantID)
	if err := s.Mint(ctx, walletID, amount); err != nil {
		return nil, err
	}
	_ = s.emitSupervisionEvent(ctx, "rtgs_issuance", "participant", participantID, map[string]interface{}{
		"source":    "rtgs_triggered",
		"reference": reference,
		"amount":    amount,
	})
	return map[string]string{"status": "issued", "reference": reference}, nil
}

// DistributeToParticipant transfers liquidity from a bank validator wallet to a PJP wallet.
// This is the only way PJPs can receive Digital Rupiah — not via direct BI issuance.
func (s *SmartContract) DistributeToParticipant(ctx contractapi.TransactionContextInterface, senderParticipantID string, receiverParticipantID string, amount int64) error {
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	sender, err := s.getParticipant(ctx, senderParticipantID)
	if err != nil {
		return fmt.Errorf("sender participant: %w", err)
	}
	if sender.ParticipantType != ParticipantValidator {
		return fmt.Errorf("sender %s must be a validator (bank); got %s", senderParticipantID, sender.ParticipantType)
	}
	if sender.Status != ParticipantActive {
		return fmt.Errorf("sender participant %s is not active", senderParticipantID)
	}
	receiver, err := s.getParticipant(ctx, receiverParticipantID)
	if err != nil {
		return fmt.Errorf("receiver participant: %w", err)
	}
	if receiver.ParticipantType != ParticipantPJP {
		return fmt.Errorf("receiver %s must be a PJP; got %s", receiverParticipantID, receiver.ParticipantType)
	}
	if receiver.Status != ParticipantActive {
		return fmt.Errorf("receiver participant %s is not active", receiverParticipantID)
	}
	senderWalletID := fmt.Sprintf("wlt_%s", senderParticipantID)
	receiverWalletID := fmt.Sprintf("wlt_%s", receiverParticipantID)
	if err := s.Burn(ctx, senderWalletID, amount); err != nil {
		return fmt.Errorf("burn sender: %w", err)
	}
	if err := s.Mint(ctx, receiverWalletID, amount); err != nil {
		return fmt.Errorf("mint receiver: %w", err)
	}
	_ = s.emitSupervisionEvent(ctx, "pjp_distribution", "participant", receiverParticipantID, map[string]interface{}{
		"sender":   senderParticipantID,
		"receiver": receiverParticipantID,
		"amount":   amount,
	})
	return nil
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
