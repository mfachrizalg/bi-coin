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

// --- Enums -----------------------------------------------------------

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

// --- State Objects ---------------------------------------------------

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

// --- InitLedger ------------------------------------------------------

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
