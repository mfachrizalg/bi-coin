package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

type PostgresStore struct {
	db *sql.DB
}

type BootstrapUser struct {
	Username     string          `json:"username"`
	Password     string          `json:"password,omitempty"`
	PasswordHash string          `json:"password_hash,omitempty"`
	Role         middleware.Role `json:"role"`
}

func NewPostgresStore(ctx context.Context, databaseURL string) (*PostgresStore, error) {
	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		return nil, err
	}
	if err := db.PingContext(ctx); err != nil {
		db.Close()
		return nil, err
	}
	store := &PostgresStore{db: db}
	if err := store.migrate(ctx); err != nil {
		db.Close()
		return nil, err
	}
	return store, nil
}

func (s *PostgresStore) Close() error {
	if s == nil || s.db == nil {
		return nil
	}
	return s.db.Close()
}

func (s *PostgresStore) migrate(ctx context.Context) error {
	_, err := s.db.ExecContext(ctx, `
CREATE TABLE IF NOT EXISTS auth_users (
	username TEXT PRIMARY KEY,
	password_hash TEXT NOT NULL,
	role TEXT NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS retail_customers (
	customer_id TEXT PRIMARY KEY,
	legal_name TEXT NOT NULL,
	identity_hash TEXT NOT NULL,
	wallet_account_id TEXT NOT NULL,
	kyc_profile_id TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kyc_profiles (
	profile_id TEXT PRIMARY KEY,
	subject_type TEXT NOT NULL,
	subject_id TEXT NOT NULL,
	provider_case_id TEXT,
	legal_name TEXT,
	document_type TEXT,
	document_number TEXT,
	document_hashes JSONB NOT NULL DEFAULT '[]',
	status TEXT NOT NULL,
	risk_level TEXT NOT NULL,
	due_diligence_level TEXT NOT NULL DEFAULT 'simplified',
	senior_approval BOOLEAN NOT NULL DEFAULT FALSE,
	rejection_reason TEXT,
	expires_at TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kyc_provider_checks (
	check_id TEXT PRIMARY KEY,
	profile_id TEXT NOT NULL REFERENCES kyc_profiles(profile_id) ON DELETE CASCADE,
	provider_case_id TEXT,
	status TEXT NOT NULL,
	risk_level TEXT NOT NULL,
	due_diligence_level TEXT NOT NULL DEFAULT 'simplified',
	senior_approval BOOLEAN NOT NULL DEFAULT FALSE,
	checks JSONB NOT NULL DEFAULT '{}',
	document_hashes JSONB NOT NULL DEFAULT '[]',
	created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kyc_audit_events (
	event_id TEXT PRIMARY KEY,
	profile_id TEXT NOT NULL,
	action TEXT NOT NULL,
	details TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS qris_intents (
	intent_id TEXT PRIMARY KEY,
	mode TEXT NOT NULL,
	merchant_id TEXT NOT NULL,
	merchant_wallet_id TEXT NOT NULL,
	amount BIGINT NOT NULL DEFAULT 0,
	status TEXT NOT NULL,
	label TEXT,
	payload TEXT NOT NULL,
	reference_id TEXT NOT NULL,
	expires_at TEXT,
	paid_by_wallet_id TEXT,
	paid_at TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS due_diligence_level TEXT NOT NULL DEFAULT 'simplified';
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS senior_approval BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE kyc_provider_checks ADD COLUMN IF NOT EXISTS due_diligence_level TEXT NOT NULL DEFAULT 'simplified';
ALTER TABLE kyc_provider_checks ADD COLUMN IF NOT EXISTS senior_approval BOOLEAN NOT NULL DEFAULT FALSE;
`)
	return err
}

func (s *PostgresStore) EnsureBootstrapUsers(ctx context.Context, rawJSON string) error {
	if rawJSON == "" {
		return nil
	}
	var users []BootstrapUser
	if err := json.Unmarshal([]byte(rawJSON), &users); err != nil {
		return fmt.Errorf("AUTH_BOOTSTRAP_USERS_JSON: %w", err)
	}
	for _, user := range users {
		if user.Username == "" || user.Role == "" {
			return fmt.Errorf("bootstrap user username and role are required")
		}
		hash := user.PasswordHash
		if hash == "" {
			if user.Password == "" {
				return fmt.Errorf("bootstrap user %s needs password or password_hash", user.Username)
			}
			var err error
			hash, err = HashPassword(user.Password)
			if err != nil {
				return fmt.Errorf("hash bootstrap user %s: %w", user.Username, err)
			}
		}
		_, err := s.db.ExecContext(ctx, `
INSERT INTO auth_users (username, password_hash, role, active)
VALUES ($1, $2, $3, TRUE)
ON CONFLICT (username) DO UPDATE
SET password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    active = TRUE,
    updated_at = now()
`, user.Username, hash, string(user.Role))
		if err != nil {
			return err
		}
	}
	return nil
}

func (s *PostgresStore) FindAuthUser(username string) (*AuthUser, error) {
	var user AuthUser
	var role string
	err := s.db.QueryRowContext(context.Background(),
		`SELECT username, password_hash, role, active FROM auth_users WHERE username = $1`, username).
		Scan(&user.Username, &user.PasswordHash, &role, &user.Active)
	if err == sql.ErrNoRows {
		return nil, ErrInvalidCredentials
	}
	if err != nil {
		return nil, err
	}
	user.Role = middleware.Role(role)
	return &user, nil
}

func (s *PostgresStore) CreateRetailCustomer(ctx context.Context, req models.RetailCustomerRequest, identityHash string) (*models.RetailCustomer, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := s.db.ExecContext(ctx, `
INSERT INTO retail_customers (customer_id, legal_name, identity_hash, wallet_account_id, kyc_profile_id)
VALUES ($1, $2, $3, $4, $5)
ON CONFLICT (customer_id) DO UPDATE
SET legal_name = EXCLUDED.legal_name,
    identity_hash = EXCLUDED.identity_hash,
    wallet_account_id = EXCLUDED.wallet_account_id,
    kyc_profile_id = EXCLUDED.kyc_profile_id,
    updated_at = now()
`, req.CustomerID, req.LegalName, identityHash, req.WalletAccountID, nullableString(req.KycProfileID))
	if err != nil {
		return nil, err
	}
	return &models.RetailCustomer{
		CustomerID:      req.CustomerID,
		LegalName:       req.LegalName,
		IdentityHash:    identityHash,
		WalletAccountID: req.WalletAccountID,
		KycProfileID:    req.KycProfileID,
		CreatedAt:       now,
	}, nil
}

func (s *PostgresStore) ListRetailCustomers(ctx context.Context) ([]*models.RetailCustomer, error) {
	rows, err := s.db.QueryContext(ctx, `
SELECT customer_id, legal_name, identity_hash, wallet_account_id, COALESCE(kyc_profile_id, ''), created_at
FROM retail_customers ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var customers []*models.RetailCustomer
	for rows.Next() {
		var c models.RetailCustomer
		var created time.Time
		if err := rows.Scan(&c.CustomerID, &c.LegalName, &c.IdentityHash, &c.WalletAccountID, &c.KycProfileID, &created); err != nil {
			return nil, err
		}
		c.CreatedAt = created.UTC().Format(time.RFC3339)
		customers = append(customers, &c)
	}
	return customers, rows.Err()
}

func (s *PostgresStore) SubmitKycProfile(ctx context.Context, req models.KycProfileRequest, anchor models.KycProfile) (*models.KycProfile, error) {
	hashesJSON, _ := json.Marshal(anchor.DocumentHashes)
	_, err := s.db.ExecContext(ctx, `
INSERT INTO kyc_profiles (
	profile_id, subject_type, subject_id, provider_case_id, legal_name,
	document_type, document_number, document_hashes, status, risk_level, expires_at
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
`, anchor.ProfileID, string(req.SubjectType), req.SubjectID, nullableString(req.ProviderCaseID), nullableString(req.LegalName),
		nullableString(req.DocumentType), nullableString(req.DocumentNumber), string(hashesJSON), string(anchor.Status), string(anchor.RiskLevel), nullableString(""))
	if err != nil {
		return nil, err
	}
	_ = s.insertAudit(ctx, anchor.ProfileID, "profile_created", "KYC profile submitted off-chain")
	return &anchor, nil
}

func (s *PostgresStore) RefreshKycProfile(ctx context.Context, profileID string, req models.KycProviderResultRequest, anchor models.KycProfile) (*models.KycProfile, error) {
	hashesJSON, _ := json.Marshal(anchor.DocumentHashes)
	checksJSON, _ := json.Marshal(req.Checks)
	rejection := ""
	if req.RejectionReason != nil {
		rejection = *req.RejectionReason
	}
	expires := ""
	if req.ExpiresAt != nil {
		expires = *req.ExpiresAt
	}
	_, err := s.db.ExecContext(ctx, `
UPDATE kyc_profiles
SET provider_case_id = COALESCE(NULLIF($2, ''), provider_case_id),
    document_hashes = $3,
    status = $4,
    risk_level = $5,
	due_diligence_level = $6,
	senior_approval = $7,
    rejection_reason = NULLIF($8, ''),
    expires_at = NULLIF($9, ''),
    updated_at = now()
WHERE profile_id = $1
`, profileID, req.ProviderCaseID, string(hashesJSON), string(req.Status), string(req.RiskLevel), string(req.DueDiligenceLevel), req.SeniorApproval, rejection, expires)
	if err != nil {
		return nil, err
	}
	checkID := fmt.Sprintf("chk_%s_%d", profileID, time.Now().UTC().UnixNano())
	_, err = s.db.ExecContext(ctx, `
INSERT INTO kyc_provider_checks (check_id, profile_id, provider_case_id, status, risk_level, due_diligence_level, senior_approval, checks, document_hashes)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
`, checkID, profileID, nullableString(req.ProviderCaseID), string(req.Status), string(req.RiskLevel), string(req.DueDiligenceLevel), req.SeniorApproval, string(checksJSON), string(hashesJSON))
	if err != nil {
		return nil, err
	}
	_ = s.insertAudit(ctx, profileID, "profile_refreshed", fmt.Sprintf("Provider decision: %s risk=%s due_diligence=%s senior_approval=%t", req.Status, req.RiskLevel, req.DueDiligenceLevel, req.SeniorApproval))
	anchor.ProviderCaseID = req.ProviderCaseID
	anchor.RejectionReason = req.RejectionReason
	return &anchor, nil
}

func (s *PostgresStore) GetKycProfile(ctx context.Context, profileID string) (*models.KycProfile, error) {
	var p models.KycProfile
	var subjectType, status, risk, hashesRaw string
	var providerCaseID, rejection, expires sql.NullString
	var created, updated time.Time
	err := s.db.QueryRowContext(ctx, `
SELECT profile_id, subject_type, subject_id, provider_case_id, document_hashes,
       status, risk_level, due_diligence_level, senior_approval, rejection_reason, expires_at, created_at, updated_at
FROM kyc_profiles WHERE profile_id = $1`, profileID).
		Scan(&p.ProfileID, &subjectType, &p.SubjectID, &providerCaseID, &hashesRaw,
			&status, &risk, &p.DueDiligenceLevel, &p.SeniorApproval, &rejection, &expires, &created, &updated)
	if err != nil {
		return nil, err
	}
	_ = json.Unmarshal([]byte(hashesRaw), &p.DocumentHashes)
	p.SubjectType = models.KycSubjectType(subjectType)
	p.Status = models.KycStatus(status)
	p.RiskLevel = models.KycRiskLevel(risk)
	if providerCaseID.Valid {
		p.ProviderCaseID = providerCaseID.String
	}
	if rejection.Valid {
		p.RejectionReason = &rejection.String
	}
	if expires.Valid {
		p.ExpiresAt = &expires.String
	}
	p.CreatedAt = created.UTC().Format(time.RFC3339)
	p.UpdatedAt = updated.UTC().Format(time.RFC3339)
	return &p, nil
}

func (s *PostgresStore) ListKycProviderChecks(ctx context.Context, profileID string) ([]*models.KycProviderCheck, error) {
	rows, err := s.db.QueryContext(ctx, `
SELECT check_id, profile_id, COALESCE(provider_case_id, ''), status, risk_level, due_diligence_level, senior_approval, checks, document_hashes, created_at
FROM kyc_provider_checks WHERE profile_id = $1 ORDER BY created_at DESC`, profileID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var checks []*models.KycProviderCheck
	for rows.Next() {
		var c models.KycProviderCheck
		var status, risk, checksRaw, hashesRaw string
		var created time.Time
		if err := rows.Scan(&c.CheckID, &c.ProfileID, &c.ProviderCaseID, &status, &risk, &c.DueDiligenceLevel, &c.SeniorApproval, &checksRaw, &hashesRaw, &created); err != nil {
			return nil, err
		}
		c.Status = models.KycStatus(status)
		c.RiskLevel = models.KycRiskLevel(risk)
		_ = json.Unmarshal([]byte(checksRaw), &c.Checks)
		_ = json.Unmarshal([]byte(hashesRaw), &c.DocumentHashes)
		c.CreatedAt = created.UTC().Format(time.RFC3339)
		checks = append(checks, &c)
	}
	return checks, rows.Err()
}

func (s *PostgresStore) ListKycAuditEvents(ctx context.Context, profileID string) ([]*models.KycAuditEvent, error) {
	rows, err := s.db.QueryContext(ctx, `
SELECT event_id, profile_id, action, details, created_at
FROM kyc_audit_events WHERE profile_id = $1 ORDER BY created_at DESC`, profileID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var events []*models.KycAuditEvent
	for rows.Next() {
		var ev models.KycAuditEvent
		var created time.Time
		if err := rows.Scan(&ev.EventID, &ev.ProfileID, &ev.Action, &ev.Details, &created); err != nil {
			return nil, err
		}
		ev.Timestamp = created.UTC().Format(time.RFC3339)
		events = append(events, &ev)
	}
	return events, rows.Err()
}

func (s *PostgresStore) insertAudit(ctx context.Context, profileID string, action string, details string) error {
	_, err := s.db.ExecContext(ctx, `
INSERT INTO kyc_audit_events (event_id, profile_id, action, details)
VALUES ($1, $2, $3, $4)`,
		fmt.Sprintf("evt_%s_%d", profileID, time.Now().UTC().UnixNano()), profileID, action, details)
	return err
}

func (s *PostgresStore) CreateQrisIntent(ctx context.Context, intent models.QrisIntent) (*models.QrisIntent, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := s.db.ExecContext(ctx, `
INSERT INTO qris_intents (intent_id, mode, merchant_id, merchant_wallet_id, amount, status, label, payload, reference_id, expires_at, paid_by_wallet_id, paid_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
ON CONFLICT (intent_id) DO UPDATE
SET mode = EXCLUDED.mode,
    merchant_id = EXCLUDED.merchant_id,
    merchant_wallet_id = EXCLUDED.merchant_wallet_id,
    amount = EXCLUDED.amount,
    status = EXCLUDED.status,
    label = EXCLUDED.label,
    payload = EXCLUDED.payload,
    reference_id = EXCLUDED.reference_id,
    expires_at = EXCLUDED.expires_at,
    paid_by_wallet_id = EXCLUDED.paid_by_wallet_id,
    paid_at = EXCLUDED.paid_at,
    updated_at = now()
`, intent.IntentID, string(intent.Mode), intent.MerchantID, intent.MerchantWalletID, intent.Amount, string(intent.Status), nullableString(intent.Label), intent.Payload, intent.ReferenceID, nullablePointerString(intent.ExpiresAt), nullableString(intent.PaidByWalletID), nullablePointerString(intent.PaidAt))
	if err != nil {
		return nil, err
	}
	intent.CreatedAt = now
	intent.UpdatedAt = now
	return &intent, nil
}

func (s *PostgresStore) GetQrisIntent(ctx context.Context, intentID string) (*models.QrisIntent, error) {
	var intent models.QrisIntent
	var mode, status string
	var label, expiresAt, paidByWalletID, paidAt sql.NullString
	var created, updated time.Time
	err := s.db.QueryRowContext(ctx, `
SELECT intent_id, mode, merchant_id, merchant_wallet_id, amount, status, label, payload, reference_id, expires_at, paid_by_wallet_id, paid_at, created_at, updated_at
FROM qris_intents WHERE intent_id = $1`, intentID).
		Scan(&intent.IntentID, &mode, &intent.MerchantID, &intent.MerchantWalletID, &intent.Amount, &status, &label, &intent.Payload, &intent.ReferenceID, &expiresAt, &paidByWalletID, &paidAt, &created, &updated)
	if err != nil {
		return nil, err
	}
	intent.Mode = models.QrisMode(mode)
	intent.Status = models.QrisStatus(status)
	if label.Valid {
		intent.Label = label.String
	}
	if expiresAt.Valid {
		intent.ExpiresAt = &expiresAt.String
	}
	if paidByWalletID.Valid {
		intent.PaidByWalletID = paidByWalletID.String
	}
	if paidAt.Valid {
		intent.PaidAt = &paidAt.String
	}
	intent.CreatedAt = created.UTC().Format(time.RFC3339)
	intent.UpdatedAt = updated.UTC().Format(time.RFC3339)
	return &intent, nil
}

func (s *PostgresStore) ListQrisIntents(ctx context.Context, merchantID string) ([]*models.QrisIntent, error) {
	query := `
SELECT intent_id, mode, merchant_id, merchant_wallet_id, amount, status, label, payload, reference_id, expires_at, paid_by_wallet_id, paid_at, created_at, updated_at
FROM qris_intents`
	args := []interface{}{}
	if merchantID != "" {
		query += ` WHERE merchant_id = $1`
		args = append(args, merchantID)
	}
	query += ` ORDER BY created_at DESC`
	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var intents []*models.QrisIntent
	for rows.Next() {
		var intent models.QrisIntent
		var mode, status string
		var label, expiresAt, paidByWalletID, paidAt sql.NullString
		var created, updated time.Time
		if err := rows.Scan(&intent.IntentID, &mode, &intent.MerchantID, &intent.MerchantWalletID, &intent.Amount, &status, &label, &intent.Payload, &intent.ReferenceID, &expiresAt, &paidByWalletID, &paidAt, &created, &updated); err != nil {
			return nil, err
		}
		intent.Mode = models.QrisMode(mode)
		intent.Status = models.QrisStatus(status)
		if label.Valid {
			intent.Label = label.String
		}
		if expiresAt.Valid {
			intent.ExpiresAt = &expiresAt.String
		}
		if paidByWalletID.Valid {
			intent.PaidByWalletID = paidByWalletID.String
		}
		if paidAt.Valid {
			intent.PaidAt = &paidAt.String
		}
		intent.CreatedAt = created.UTC().Format(time.RFC3339)
		intent.UpdatedAt = updated.UTC().Format(time.RFC3339)
		intents = append(intents, &intent)
	}
	return intents, rows.Err()
}

func (s *PostgresStore) MarkQrisIntentPaid(ctx context.Context, intentID string, txID string, payerWalletID string) error {
	_ = txID
	paidAt := time.Now().UTC().Format(time.RFC3339)
	_, err := s.db.ExecContext(ctx, `
UPDATE qris_intents
SET status = $2, paid_by_wallet_id = $3, paid_at = $4, updated_at = now()
WHERE intent_id = $1`, intentID, string(models.QrisStatusPaid), payerWalletID, paidAt)
	return err
}

func (s *PostgresStore) MarkQrisIntentExpired(ctx context.Context, intentID string) error {
	_, err := s.db.ExecContext(ctx, `
UPDATE qris_intents
SET status = $2, updated_at = now()
WHERE intent_id = $1`, intentID, string(models.QrisStatusExpired))
	return err
}

func (s *PostgresStore) CancelQrisIntent(ctx context.Context, intentID string) error {
	_, err := s.db.ExecContext(ctx, `
UPDATE qris_intents
SET status = $2, updated_at = now()
WHERE intent_id = $1`, intentID, string(models.QrisStatusCancelled))
	return err
}

func nullableString(value string) interface{} {
	if value == "" {
		return nil
	}
	return value
}

func nullablePointerString(value *string) interface{} {
	if value == nil || *value == "" {
		return nil
	}
	return *value
}
