package models

import "time"

// ─── Enums ───────────────────────────────────────────────────────────────────

type KycSubjectType string

const (
	KycParticipant    KycSubjectType = "participant"
	KycRetailCustomer KycSubjectType = "retail_customer"
	KycMerchant       KycSubjectType = "merchant"
)

type DueDiligenceLevel string

const (
	DueDiligenceSimplified DueDiligenceLevel = "simplified"
	DueDiligenceStandard   DueDiligenceLevel = "standard"
	DueDiligenceEnhanced   DueDiligenceLevel = "enhanced"
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

type ParticipantType string

const (
	PtValidator ParticipantType = "validator"
	PtObserver  ParticipantType = "observer"
	PtGateway   ParticipantType = "gateway"
	PtPJP       ParticipantType = "pjp"
)

type WalletType string

const (
	WalletHot  WalletType = "hot"
	WalletCold WalletType = "cold"
)

type LimitScope string

const (
	ScopeGlobalSupply          LimitScope = "global_supply"
	ScopePerParticipantBalance LimitScope = "per_participant_balance"
	ScopePerTxAmount           LimitScope = "per_tx_amount"
)

// ─── Request Bodies ──────────────────────────────────────────────────────────

type OnboardingRequest struct {
	ParticipantID         string          `json:"participant_id"`
	Name                  string          `json:"name"`
	Domain                string          `json:"domain"`
	AccountID             string          `json:"account_id"`
	ParticipantType       ParticipantType `json:"participant_type"`
	InitialReserveBalance *string         `json:"initial_reserve_balance,omitempty"`
	ComplianceStatus      *string         `json:"compliance_status,omitempty"`
}

type CreateWalletRequest struct {
	ParticipantID string `json:"participant_id"`
	Tier          string `json:"tier,omitempty"` // Deprecated policy assertion; chaincode derives the tier from KYC.
}

type RetailCustomerRequest struct {
	CustomerID      string `json:"customer_id"`
	LegalName       string `json:"legal_name"`
	WalletAccountID string `json:"wallet_account_id"`
	KycProfileID    string `json:"kyc_profile_id,omitempty"`
}

type KycProfileRequest struct {
	SubjectType    KycSubjectType `json:"subject_type"`
	SubjectID      string         `json:"subject_id"`
	ProviderCaseID string         `json:"provider_case_id"`
	DocumentHashes []string       `json:"document_hashes"`
	LegalName      string         `json:"legal_name,omitempty"`
	DocumentType   string         `json:"document_type,omitempty"`
	DocumentNumber string         `json:"document_number,omitempty"`
}

type KycProviderResultRequest struct {
	ProviderCaseID    string            `json:"provider_case_id"`
	Status            KycStatus         `json:"status"`
	RiskLevel         KycRiskLevel      `json:"risk_level"`
	DueDiligenceLevel DueDiligenceLevel `json:"due_diligence_level"`
	SeniorApproval    bool              `json:"senior_approval"`
	Checks            map[string]string `json:"checks,omitempty"`
	DocumentHashes    []string          `json:"document_hashes"`
	RejectionReason   *string           `json:"rejection_reason,omitempty"`
	ExpiresAt         *string           `json:"expires_at,omitempty"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int64  `json:"expires_in"`
	Role        string `json:"role"`
}

type MeResponse struct {
	Username string `json:"username"`
	Role     string `json:"role"`
}

type SetLimitRequest struct {
	Scope LimitScope `json:"scope"`
	Value string     `json:"value"`
}

type AmountRequest struct {
	ParticipantID string `json:"participant_id"`
	Amount        string `json:"amount"`
}

type TransferRequest struct {
	SenderID   string `json:"sender_id"`
	ReceiverID string `json:"receiver_id"`
	Amount     string `json:"amount"`
}

type DistributeRequest struct {
	SenderParticipantID   string `json:"sender_participant_id"`
	ReceiverParticipantID string `json:"receiver_participant_id"`
	Amount                int64  `json:"amount"`
}

type RegisterTriggerRequest struct {
	Name        string            `json:"name"`
	Description *string           `json:"description,omitempty"`
	ActionType  string            `json:"action_type"`
	Params      map[string]string `json:"params,omitempty"`
}

type RtgsIssuanceRequest struct {
	SenderBIC string `json:"sender_bic"`
	Amount    string `json:"amount"`
	Reference string `json:"reference"`
	Timestamp string `json:"timestamp"`
}

// ─── Response / Domain Objects ───────────────────────────────────────────────

type HealthResponse struct {
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
}

type ErrorResponse struct {
	Detail  []ValidationError `json:"detail,omitempty"`
	Message string            `json:"message,omitempty"`
}

type ValidationError struct {
	Loc   []interface{} `json:"loc"`
	Msg   string        `json:"msg"`
	Type  string        `json:"type"`
	Input interface{}   `json:"input,omitempty"`
	Ctx   interface{}   `json:"ctx,omitempty"`
}

type Wallet struct {
	WalletID        string     `json:"wallet_id"`
	ParticipantID   string     `json:"participant_id"`
	Tier            string     `json:"tier"`
	WalletType      WalletType `json:"wallet_type"`
	Balance         int64      `json:"balance"`
	Frozen          bool       `json:"frozen"`
	DailySpent      int64      `json:"daily_spent"`
	MonthlySpent    int64      `json:"monthly_spent"`
	MonthlyReceived int64      `json:"monthly_received"`
	CreatedAt       string     `json:"created_at"`
	UpdatedAt       string     `json:"updated_at"`
}

type Participant struct {
	ParticipantID    string          `json:"participant_id"`
	Name             string          `json:"name"`
	Domain           string          `json:"domain"`
	AccountID        string          `json:"account_id"`
	ParticipantType  ParticipantType `json:"participant_type"`
	ComplianceStatus string          `json:"compliance_status"`
	ReserveBalance   int64           `json:"reserve_balance"`
	Status           string          `json:"status"`
	CreatedAt        string          `json:"created_at"`
	UpdatedAt        string          `json:"updated_at"`
}

type KycProfile struct {
	ProfileID         string            `json:"profile_id"`
	SubjectType       KycSubjectType    `json:"subject_type"`
	SubjectID         string            `json:"subject_id"`
	ProviderCaseID    string            `json:"provider_case_id,omitempty"`
	DocumentHashes    []string          `json:"document_hashes"`
	Status            KycStatus         `json:"status"`
	RiskLevel         KycRiskLevel      `json:"risk_level"`
	DueDiligenceLevel DueDiligenceLevel `json:"due_diligence_level"`
	SeniorApproval    bool              `json:"senior_approval"`
	RejectionReason   *string           `json:"rejection_reason,omitempty"`
	ExpiresAt         *string           `json:"expires_at,omitempty"`
	CreatedAt         string            `json:"created_at"`
	UpdatedAt         string            `json:"updated_at"`
}

type KycProviderCheck struct {
	CheckID           string            `json:"check_id"`
	ProfileID         string            `json:"profile_id"`
	ProviderCaseID    string            `json:"provider_case_id"`
	Status            KycStatus         `json:"status"`
	RiskLevel         KycRiskLevel      `json:"risk_level"`
	DueDiligenceLevel DueDiligenceLevel `json:"due_diligence_level"`
	SeniorApproval    bool              `json:"senior_approval"`
	Checks            map[string]string `json:"checks"`
	DocumentHashes    []string          `json:"document_hashes"`
	CreatedAt         string            `json:"created_at"`
}

type KycAuditEvent struct {
	EventID   string `json:"event_id"`
	ProfileID string `json:"profile_id"`
	Action    string `json:"action"`
	Timestamp string `json:"timestamp"`
	Details   string `json:"details"`
}

type RetailCustomer struct {
	CustomerID      string `json:"customer_id"`
	LegalName       string `json:"legal_name,omitempty"`
	IdentityHash    string `json:"identity_hash,omitempty"`
	KycProfileID    string `json:"kyc_profile_id,omitempty"`
	WalletAccountID string `json:"wallet_account_id"`
	CreatedAt       string `json:"created_at"`
}

type SystemLimit struct {
	Scope LimitScope `json:"scope"`
	Value int64      `json:"value"`
	SetAt string     `json:"set_at"`
}

type Balance struct {
	ParticipantID  string `json:"participant_id"`
	WalletID       string `json:"wallet_id"`
	Balance        int64  `json:"balance"`
	ReserveBalance int64  `json:"reserve_balance"`
}

type TransferResult struct {
	Status string `json:"status"`
	TxID   string `json:"tx_id,omitempty"`
}

type AmountResult struct {
	Status string `json:"status"`
	TxID   string `json:"tx_id,omitempty"`
}

type TransactionRecord struct {
	TxID            string `json:"tx_id"`
	ParticipantID   string `json:"participant_id"`
	CounterpartyID  string `json:"counterparty_id"`
	Amount          int64  `json:"amount"`
	TransactionType string `json:"transaction_type"`
	Status          string `json:"status"`
	ReferenceID     string `json:"reference_id,omitempty"`
	Timestamp       string `json:"timestamp"`
}

type SupervisionEvent struct {
	EventID   string `json:"event_id"`
	EventType string `json:"event_type"`
	Payload   string `json:"payload"`
	Timestamp string `json:"timestamp"`
}

type ReconciliationReport struct {
	TotalSupply     int64  `json:"total_supply"`
	TotalReserves   int64  `json:"total_reserves"`
	PendingIssuance int64  `json:"pending_issuance"`
	GeneratedAt     string `json:"generated_at"`
}

type MetricsReport struct {
	TotalParticipants int    `json:"total_participants"`
	ActiveWallets     int    `json:"active_wallets"`
	TotalSupply       int64  `json:"total_supply"`
	TotalTransfers    int    `json:"total_transfers"`
	GeneratedAt       string `json:"generated_at"`
}

type TopologyNode struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Type   string `json:"type"`
	Role   string `json:"role"`
	Domain string `json:"domain"`
}

type Topology struct {
	Nodes []TopologyNode `json:"nodes"`
	Links []TopologyLink `json:"links"`
}

type TopologyLink struct {
	Source string `json:"source"`
	Target string `json:"target"`
	Type   string `json:"type"`
}

func NowUTC() string {
	return time.Now().UTC().Format(time.RFC3339)
}
