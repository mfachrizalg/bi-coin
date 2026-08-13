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
	Username       string          `json:"username"`
	Password       string          `json:"password,omitempty"`
	PasswordHash   string          `json:"password_hash,omitempty"`
	Role           middleware.Role `json:"role"`
	SubjectID      string          `json:"subject_id,omitempty"`
	ParticipantID  string          `json:"participant_id,omitempty"`
	CustodianMSPID string          `json:"custodian_msp_id,omitempty"`
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
	subject_id TEXT NOT NULL DEFAULT '',
	participant_id TEXT NOT NULL DEFAULT '',
	custodian_msp_id TEXT NOT NULL DEFAULT '',
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
	custodian_msp_id TEXT NOT NULL DEFAULT '',
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kyc_profiles (
	profile_id TEXT PRIMARY KEY,
	subject_type TEXT NOT NULL,
	subject_id TEXT NOT NULL,
	custodian_msp_id TEXT NOT NULL DEFAULT '',
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
	ledger_anchored BOOLEAN NOT NULL DEFAULT FALSE,
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
	tx_id TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS operation_journal (
	principal_scope TEXT NOT NULL,
	principal_id TEXT NOT NULL,
	idempotency_key TEXT NOT NULL,
	operation TEXT NOT NULL,
	request_hash TEXT NOT NULL,
	operation_ref TEXT NOT NULL,
	status TEXT NOT NULL,
	tx_id TEXT,
	response JSONB,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	PRIMARY KEY (principal_scope, principal_id, idempotency_key)
);

ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS due_diligence_level TEXT NOT NULL DEFAULT 'simplified';
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS senior_approval BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE kyc_provider_checks ADD COLUMN IF NOT EXISTS due_diligence_level TEXT NOT NULL DEFAULT 'simplified';
ALTER TABLE kyc_provider_checks ADD COLUMN IF NOT EXISTS senior_approval BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS subject_id TEXT NOT NULL DEFAULT '';
ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS participant_id TEXT NOT NULL DEFAULT '';
ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS custodian_msp_id TEXT NOT NULL DEFAULT '';
ALTER TABLE retail_customers ADD COLUMN IF NOT EXISTS custodian_msp_id TEXT NOT NULL DEFAULT '';
	ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS custodian_msp_id TEXT NOT NULL DEFAULT '';
	ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS ledger_anchored BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE qris_intents ADD COLUMN IF NOT EXISTS tx_id TEXT;
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
INSERT INTO auth_users (username, password_hash, role, subject_id, participant_id, custodian_msp_id, active)
VALUES ($1, $2, $3, $4, $5, $6, TRUE)
ON CONFLICT (username) DO NOTHING
`, user.Username, hash, string(user.Role), user.SubjectID, user.ParticipantID, user.CustodianMSPID)
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
		`SELECT username, password_hash, role, subject_id, participant_id, custodian_msp_id, active FROM auth_users WHERE username = $1`, username).
		Scan(&user.Username, &user.PasswordHash, &role, &user.SubjectID, &user.ParticipantID, &user.CustodianMSPID, &user.Active)
	if err == sql.ErrNoRows {
		return nil, ErrInvalidCredentials
	}
	if err != nil {
		return nil, err
	}
	user.Role = middleware.Role(role)
	return &user, nil
}

func (s *PostgresStore) CreateRetailCustomer(ctx context.Context, req models.RetailCustomerRequest, identityHash string, custodianMSPID string) (*models.RetailCustomer, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := s.db.ExecContext(ctx, `
INSERT INTO retail_customers (customer_id, legal_name, identity_hash, wallet_account_id, kyc_profile_id, custodian_msp_id)
	VALUES ($1, $2, $3, $4, $5, $6)
ON CONFLICT (customer_id) DO UPDATE
SET legal_name = EXCLUDED.legal_name,
    identity_hash = EXCLUDED.identity_hash,
    wallet_account_id = EXCLUDED.wallet_account_id,
    kyc_profile_id = EXCLUDED.kyc_profile_id,
    custodian_msp_id = EXCLUDED.custodian_msp_id,
    updated_at = now()
`, req.CustomerID, req.LegalName, identityHash, req.WalletAccountID, nullableString(req.KycProfileID), custodianMSPID)
	if err != nil {
		return nil, err
	}
	return &models.RetailCustomer{
		CustomerID:      req.CustomerID,
		LegalName:       req.LegalName,
		IdentityHash:    identityHash,
		WalletAccountID: req.WalletAccountID,
		KycProfileID:    req.KycProfileID,
		CustodianMSPID:  custodianMSPID,
		CreatedAt:       now,
	}, nil
}

func (s *PostgresStore) ListRetailCustomers(ctx context.Context, custodianMSPID string) ([]*models.RetailCustomer, error) {
	query := `
SELECT customer_id, legal_name, identity_hash, wallet_account_id, COALESCE(kyc_profile_id, ''), custodian_msp_id, created_at
FROM retail_customers`
	args := []interface{}{}
	if custodianMSPID != "" {
		query += ` WHERE custodian_msp_id = $1`
		args = append(args, custodianMSPID)
	}
	query += ` ORDER BY created_at DESC`
	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var customers []*models.RetailCustomer
	for rows.Next() {
		var c models.RetailCustomer
		var created time.Time
		if err := rows.Scan(&c.CustomerID, &c.LegalName, &c.IdentityHash, &c.WalletAccountID, &c.KycProfileID, &c.CustodianMSPID, &created); err != nil {
			return nil, err
		}
		c.CreatedAt = created.UTC().Format(time.RFC3339)
		customers = append(customers, &c)
	}
	return customers, rows.Err()
}

func (s *PostgresStore) SubmitKycProfile(ctx context.Context, req models.KycProfileRequest, anchor models.KycProfile, custodianMSPID string) (*models.KycProfile, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()
	hashesJSON, _ := json.Marshal(anchor.DocumentHashes)
	_, err = tx.ExecContext(ctx, `
INSERT INTO kyc_profiles (
	profile_id, subject_type, subject_id, custodian_msp_id, provider_case_id, legal_name,
	document_type, document_number, document_hashes, status, risk_level, expires_at
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
ON CONFLICT (profile_id) DO UPDATE
SET subject_type = EXCLUDED.subject_type,
    subject_id = EXCLUDED.subject_id,
    custodian_msp_id = EXCLUDED.custodian_msp_id,
    provider_case_id = EXCLUDED.provider_case_id,
    legal_name = EXCLUDED.legal_name,
    document_type = EXCLUDED.document_type,
    document_number = EXCLUDED.document_number,
    document_hashes = EXCLUDED.document_hashes,
    status = EXCLUDED.status,
    risk_level = EXCLUDED.risk_level,
    ledger_anchored = FALSE,
    updated_at = now()
`, anchor.ProfileID, string(req.SubjectType), req.SubjectID, custodianMSPID, nullableString(req.ProviderCaseID), nullableString(req.LegalName),
		nullableString(req.DocumentType), nullableString(req.DocumentNumber), string(hashesJSON), string(anchor.Status), string(anchor.RiskLevel), nullableString(""))
	if err != nil {
		return nil, err
	}
	if err := s.insertAuditTx(ctx, tx, anchor.ProfileID, "profile_created", "KYC profile submitted off-chain"); err != nil {
		return nil, err
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}
	return &anchor, nil
}

func (s *PostgresStore) RefreshKycProfile(ctx context.Context, profileID string, req models.KycProviderResultRequest, anchor models.KycProfile) (*models.KycProfile, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()
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
	_, err = tx.ExecContext(ctx, `
UPDATE kyc_profiles
SET provider_case_id = COALESCE(NULLIF($2, ''), provider_case_id),
    document_hashes = $3,
	status = $4,
	risk_level = $5,
	due_diligence_level = $6,
	senior_approval = $7,
	ledger_anchored = FALSE,
    rejection_reason = NULLIF($8, ''),
    expires_at = NULLIF($9, ''),
    updated_at = now()
WHERE profile_id = $1
`, profileID, req.ProviderCaseID, string(hashesJSON), string(req.Status), string(req.RiskLevel), string(req.DueDiligenceLevel), req.SeniorApproval, rejection, expires)
	if err != nil {
		return nil, err
	}
	checkID := fmt.Sprintf("chk_%s_%d", profileID, time.Now().UTC().UnixNano())
	_, err = tx.ExecContext(ctx, `
INSERT INTO kyc_provider_checks (check_id, profile_id, provider_case_id, status, risk_level, due_diligence_level, senior_approval, checks, document_hashes)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
`, checkID, profileID, nullableString(req.ProviderCaseID), string(req.Status), string(req.RiskLevel), string(req.DueDiligenceLevel), req.SeniorApproval, string(checksJSON), string(hashesJSON))
	if err != nil {
		return nil, err
	}
	if err := s.insertAuditTx(ctx, tx, profileID, "profile_refreshed", fmt.Sprintf("Provider decision: %s risk=%s due_diligence=%s senior_approval=%t", req.Status, req.RiskLevel, req.DueDiligenceLevel, req.SeniorApproval)); err != nil {
		return nil, err
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}
	anchor.ProviderCaseID = req.ProviderCaseID
	anchor.RejectionReason = req.RejectionReason
	return &anchor, nil
}

func (s *PostgresStore) MarkKycAnchored(ctx context.Context, profileID string) error {
	result, err := s.db.ExecContext(ctx, `UPDATE kyc_profiles SET ledger_anchored = TRUE, updated_at = now() WHERE profile_id = $1`, profileID)
	if err != nil {
		return err
	}
	if affected, err := result.RowsAffected(); err != nil {
		return err
	} else if affected != 1 {
		return sql.ErrNoRows
	}
	return nil
}

func (s *PostgresStore) GetKycProfile(ctx context.Context, profileID string) (*models.KycProfile, error) {
	var p models.KycProfile
	var subjectType, status, risk, hashesRaw string
	var providerCaseID, rejection, expires sql.NullString
	var created, updated time.Time
	err := s.db.QueryRowContext(ctx, `
SELECT profile_id, subject_type, subject_id, custodian_msp_id, provider_case_id, document_hashes,
       status, risk_level, due_diligence_level, senior_approval, rejection_reason, expires_at, created_at, updated_at
FROM kyc_profiles WHERE profile_id = $1`, profileID).
		Scan(&p.ProfileID, &subjectType, &p.SubjectID, &p.CustodianMSPID, &providerCaseID, &hashesRaw,
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
	return s.insertAuditTx(ctx, s.db, profileID, action, details)
}

type auditExecer interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
}

func (s *PostgresStore) insertAuditTx(ctx context.Context, execer auditExecer, profileID string, action string, details string) error {
	_, err := execer.ExecContext(ctx, `
INSERT INTO kyc_audit_events (event_id, profile_id, action, details)
VALUES ($1, $2, $3, $4)`,
		fmt.Sprintf("evt_%s_%d", profileID, time.Now().UTC().UnixNano()), profileID, action, details)
	return err
}

func (s *PostgresStore) CreateQrisIntent(ctx context.Context, intent models.QrisIntent) (*models.QrisIntent, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := s.db.ExecContext(ctx, `
INSERT INTO qris_intents (intent_id, mode, merchant_id, merchant_wallet_id, amount, status, label, payload, reference_id, expires_at, paid_by_wallet_id, paid_at, tx_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
	tx_id = EXCLUDED.tx_id,
    updated_at = now()
`, intent.IntentID, string(intent.Mode), intent.MerchantID, intent.MerchantWalletID, intent.Amount, string(intent.Status), nullableString(intent.Label), intent.Payload, intent.ReferenceID, nullablePointerString(intent.ExpiresAt), nullableString(intent.PaidByWalletID), nullablePointerString(intent.PaidAt), nullableString(intent.TxID))
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
	var label, expiresAt, paidByWalletID, paidAt, txID sql.NullString
	var created, updated time.Time
	err := s.db.QueryRowContext(ctx, `
SELECT intent_id, mode, merchant_id, merchant_wallet_id, amount, status, label, payload, reference_id, expires_at, paid_by_wallet_id, paid_at, tx_id, created_at, updated_at
FROM qris_intents WHERE intent_id = $1`, intentID).
		Scan(&intent.IntentID, &mode, &intent.MerchantID, &intent.MerchantWalletID, &intent.Amount, &status, &label, &intent.Payload, &intent.ReferenceID, &expiresAt, &paidByWalletID, &paidAt, &txID, &created, &updated)
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
	if txID.Valid {
		intent.TxID = txID.String
	}
	intent.CreatedAt = created.UTC().Format(time.RFC3339)
	intent.UpdatedAt = updated.UTC().Format(time.RFC3339)
	return &intent, nil
}

func (s *PostgresStore) ListQrisIntents(ctx context.Context, merchantID string) ([]*models.QrisIntent, error) {
	query := `
SELECT intent_id, mode, merchant_id, merchant_wallet_id, amount, status, label, payload, reference_id, expires_at, paid_by_wallet_id, paid_at, tx_id, created_at, updated_at
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
		var label, expiresAt, paidByWalletID, paidAt, txID sql.NullString
		var created, updated time.Time
		if err := rows.Scan(&intent.IntentID, &mode, &intent.MerchantID, &intent.MerchantWalletID, &intent.Amount, &status, &label, &intent.Payload, &intent.ReferenceID, &expiresAt, &paidByWalletID, &paidAt, &txID, &created, &updated); err != nil {
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
		if txID.Valid {
			intent.TxID = txID.String
		}
		intent.CreatedAt = created.UTC().Format(time.RFC3339)
		intent.UpdatedAt = updated.UTC().Format(time.RFC3339)
		intents = append(intents, &intent)
	}
	return intents, rows.Err()
}

func (s *PostgresStore) MarkQrisIntentPaid(ctx context.Context, intentID string, txID string, payerWalletID string) (bool, error) {
	paidAt := time.Now().UTC().Format(time.RFC3339)
	result, err := s.db.ExecContext(ctx, `
UPDATE qris_intents
SET status = $2, paid_by_wallet_id = $3, paid_at = $4, tx_id = $5, updated_at = now()
WHERE intent_id = $1 AND status = $6`, intentID, string(models.QrisStatusPaid), payerWalletID, paidAt, txID, string(models.QrisStatusPending))
	if err != nil {
		return false, err
	}
	changed, err := result.RowsAffected()
	return changed == 1, err
}

func (s *PostgresStore) MarkQrisIntentExpired(ctx context.Context, intentID string) (bool, error) {
	result, err := s.db.ExecContext(ctx, `
UPDATE qris_intents
SET status = $2, updated_at = now()
WHERE intent_id = $1 AND status = $3`, intentID, string(models.QrisStatusExpired), string(models.QrisStatusPending))
	if err != nil {
		return false, err
	}
	changed, err := result.RowsAffected()
	return changed == 1, err
}

func (s *PostgresStore) CancelQrisIntent(ctx context.Context, intentID string) (bool, error) {
	result, err := s.db.ExecContext(ctx, `
UPDATE qris_intents
SET status = $2, updated_at = now()
WHERE intent_id = $1 AND status IN ($3, $4)`, intentID, string(models.QrisStatusCancelled), string(models.QrisStatusActive), string(models.QrisStatusPending))
	if err != nil {
		return false, err
	}
	changed, err := result.RowsAffected()
	return changed == 1, err
}

func (s *PostgresStore) BeginOperation(ctx context.Context, operation OperationJournal) (OperationJournal, bool, error) {
	var created OperationJournal
	row := s.db.QueryRowContext(ctx, `
INSERT INTO operation_journal (
	principal_scope, principal_id, idempotency_key, operation, request_hash,
	operation_ref, status, tx_id, response
) VALUES ($1,$2,$3,$4,$5,$6,$7,NULL,NULL)
ON CONFLICT (principal_scope, principal_id, idempotency_key) DO NOTHING
RETURNING principal_scope, principal_id, idempotency_key, operation, request_hash,
          operation_ref, status, tx_id, response, created_at, updated_at
`, operation.PrincipalScope, operation.PrincipalID, operation.IdempotencyKey,
		operation.Operation, operation.RequestHash, operation.OperationRef, string(OperationPending))
	err := s.scanOperation(row, &created)
	if err == nil {
		return created, true, nil
	}
	if err != sql.ErrNoRows {
		return OperationJournal{}, false, err
	}
	existing, err := s.GetOperation(ctx, operation.PrincipalScope, operation.PrincipalID, operation.IdempotencyKey)
	if err != nil {
		return OperationJournal{}, false, err
	}
	return *existing, false, nil
}

func (s *PostgresStore) GetOperation(ctx context.Context, scope string, principalID string, key string) (*OperationJournal, error) {
	var operation OperationJournal
	row := s.db.QueryRowContext(ctx, `
SELECT principal_scope, principal_id, idempotency_key, operation, request_hash,
       operation_ref, status, tx_id, response, created_at, updated_at
FROM operation_journal
WHERE principal_scope = $1 AND principal_id = $2 AND idempotency_key = $3
`, scope, principalID, key)
	err := s.scanOperation(row, &operation)
	if err != nil {
		return nil, err
	}
	return &operation, nil
}

func (s *PostgresStore) UpdateOperation(ctx context.Context, operation OperationJournal) error {
	result, err := s.db.ExecContext(ctx, `
UPDATE operation_journal
SET status = $1, tx_id = NULLIF($2, ''), response = $3, updated_at = now()
WHERE principal_scope = $4 AND principal_id = $5 AND idempotency_key = $6
  AND request_hash = $7
`, string(operation.Status), operation.TxID, nullableJSON(operation.Response), operation.PrincipalScope,
		operation.PrincipalID, operation.IdempotencyKey, operation.RequestHash)
	if err != nil {
		return err
	}
	updated, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if updated != 1 {
		return fmt.Errorf("operation journal entry was not updated")
	}
	return nil
}

type operationScanner interface {
	Scan(dest ...interface{}) error
}

func (s *PostgresStore) scanOperation(scanner operationScanner, operation *OperationJournal) error {
	var status string
	var txID sql.NullString
	var response []byte
	if err := scanner.Scan(&operation.PrincipalScope, &operation.PrincipalID, &operation.IdempotencyKey,
		&operation.Operation, &operation.RequestHash, &operation.OperationRef, &status, &txID,
		&response, &operation.CreatedAt, &operation.UpdatedAt); err != nil {
		return err
	}
	operation.Status = OperationStatus(status)
	if txID.Valid {
		operation.TxID = txID.String
	}
	if len(response) > 0 {
		operation.Response = append(operation.Response[:0], response...)
	}
	return nil
}

func nullableJSON(value json.RawMessage) interface{} {
	if len(value) == 0 {
		return nil
	}
	return []byte(value)
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
