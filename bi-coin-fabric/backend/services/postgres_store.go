package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"

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

CREATE TABLE IF NOT EXISTS payment_contacts (
	contact_id TEXT PRIMARY KEY,
	owner_username TEXT NOT NULL REFERENCES auth_users(username) ON DELETE CASCADE,
	label TEXT NOT NULL,
	wallet_id TEXT NOT NULL,
	recipient_type TEXT NOT NULL CHECK (recipient_type IN ('retail_customer', 'merchant')),
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	UNIQUE (owner_username, wallet_id)
);

CREATE INDEX IF NOT EXISTS payment_contacts_owner_idx ON payment_contacts(owner_username);

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
	rejection_reason TEXT,
	expires_at TEXT,
	ledger_anchored BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kyc_audit_events (
	event_id TEXT PRIMARY KEY,
	profile_id TEXT NOT NULL,
	action TEXT NOT NULL,
	details TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now()
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

ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS subject_id TEXT NOT NULL DEFAULT '';
ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS participant_id TEXT NOT NULL DEFAULT '';
ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS custodian_msp_id TEXT NOT NULL DEFAULT '';
	ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS custodian_msp_id TEXT NOT NULL DEFAULT '';
	ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS ledger_anchored BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS birth_place TEXT;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS birth_date DATE;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS dttot_result TEXT;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS low_risk BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS low_risk_reason TEXT;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS closed_at TIMESTAMPTZ;
ALTER TABLE kyc_profiles ADD COLUMN IF NOT EXISTS close_reason TEXT;

CREATE TABLE IF NOT EXISTS monitoring_alerts (
	alert_id TEXT PRIMARY KEY,
	subject_id TEXT NOT NULL,
	rule TEXT NOT NULL CHECK (rule IN ('R1', 'R2', 'R3')),
	detail TEXT NOT NULL,
	status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'confirmed')),
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	confirmed_by TEXT,
	confirmed_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS monitoring_alerts_open_idx ON monitoring_alerts(subject_id, rule) WHERE status = 'open';

CREATE TABLE IF NOT EXISTS ltkm_drafts (
	draft_id TEXT PRIMARY KEY,
	subject_id TEXT NOT NULL,
	alert_id TEXT NOT NULL REFERENCES monitoring_alerts(alert_id),
	reason TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	created_by TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_notices (
	notice_id TEXT PRIMARY KEY,
	subject_id TEXT NOT NULL,
	kind TEXT NOT NULL,
	reason TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS monitoring_checkpoint (
	id SMALLINT PRIMARY KEY CHECK (id = 1),
	block_number BIGINT NOT NULL,
	tx_id TEXT NOT NULL,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS monitoring_flows (
	flow_id TEXT PRIMARY KEY,
	kind TEXT NOT NULL,
	from_id TEXT NOT NULL,
	to_id TEXT NOT NULL,
	amount BIGINT NOT NULL,
	observed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS monitoring_flows_from_idx ON monitoring_flows(from_id, observed_at);
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

// KYCProfile is one onboarding record. Identity data stays off-ledger (D14, D16).
type KYCProfile struct {
	ProfileID      string
	SubjectType    string
	SubjectID      string
	LegalName      string
	DocumentType   string
	DocumentNumber string
	DocumentHash   string
	Address        string
	BirthPlace     string
	BirthDate      string // YYYY-MM-DD
}

// CreateKYCProfile writes the profile and its audit event in one transaction. It runs before
// CreatePending, and PostgreSQL never authorizes a ledger effect (ADR 0007).
func (s *PostgresStore) CreateKYCProfile(ctx context.Context, profile KYCProfile) error {
	eventID, err := NewRandomHex(16)
	if err != nil {
		return err
	}
	hashes, err := json.Marshal([]string{profile.DocumentHash})
	if err != nil {
		return err
	}
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer func() { _ = tx.Rollback() }()
	if _, err := tx.ExecContext(ctx, `
INSERT INTO kyc_profiles (profile_id, subject_type, subject_id, legal_name, document_type, document_number, document_hashes, address, birth_place, birth_date, status)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::date, 'pending')
`, profile.ProfileID, profile.SubjectType, profile.SubjectID, profile.LegalName, profile.DocumentType, profile.DocumentNumber, string(hashes), profile.Address, profile.BirthPlace, profile.BirthDate); err != nil {
		return err
	}
	if _, err := tx.ExecContext(ctx, `
INSERT INTO kyc_audit_events (event_id, profile_id, action, details)
VALUES ($1, $2, 'profile_created', 'identity document stored; ledger submission pending')
`, eventID, profile.ProfileID); err != nil {
		return err
	}
	return tx.Commit()
}

// MarkKYCLedgerAnchored records that CreatePending committed for the subject.
func (s *PostgresStore) MarkKYCLedgerAnchored(ctx context.Context, subjectID string) error {
	_, err := s.db.ExecContext(ctx, `UPDATE kyc_profiles SET ledger_anchored = TRUE, updated_at = now() WHERE subject_id = $1`, subjectID)
	return err
}

// LedgerSubjectState is the subject state read back from the ledger after a mutation. It matches the
// chaincode SubjectView, which stays authoritative: PostgreSQL only mirrors it for reports.
type LedgerSubjectState struct {
	Status        string `json:"status"`
	LowRisk       bool   `json:"low_risk"`
	LowRiskReason string `json:"low_risk_reason"`
	ApprovedAt    int64  `json:"approved_at"`
	VerifiedAt    int64  `json:"verified_at"`
	ClosedAt      int64  `json:"closed_at"`
	CloseReason   string `json:"close_reason"`
}

// SyncKYCStatus copies the ledger status and CDD timestamps into the profile. A zero timestamp clears the column.
func (s *PostgresStore) SyncKYCStatus(ctx context.Context, subjectID string, state LedgerSubjectState) error {
	_, err := s.db.ExecContext(ctx, `
UPDATE kyc_profiles SET status = $2, low_risk = $3, low_risk_reason = NULLIF($4::text, ''),
	approved_at = to_timestamp(NULLIF($5::bigint, 0)), verified_at = to_timestamp(NULLIF($6::bigint, 0)),
	closed_at = to_timestamp(NULLIF($7::bigint, 0)), close_reason = NULLIF($8::text, ''), updated_at = now()
WHERE subject_id = $1
`, subjectID, state.Status, state.LowRisk, state.LowRiskReason, state.ApprovedAt, state.VerifiedAt, state.ClosedAt, state.CloseReason)
	return err
}

// RecordKYCReview stores the reviewer's DTTOT result and low-risk reason beside the profile.
func (s *PostgresStore) RecordKYCReview(ctx context.Context, subjectID string, dttotResult string, lowRiskReason string) error {
	_, err := s.db.ExecContext(ctx, `
UPDATE kyc_profiles SET dttot_result = $2, low_risk_reason = NULLIF($3::text, ''), updated_at = now() WHERE subject_id = $1
`, subjectID, dttotResult, lowRiskReason)
	return err
}

// KYCUpdate is a data update. Empty profile fields keep the stored value.
type KYCUpdate struct {
	DocumentHash   string
	DttotResult    string
	LegalName      string
	DocumentType   string
	DocumentNumber string
	Address        string
	BirthPlace     string
	BirthDate      string // YYYY-MM-DD
}

// RecordKYCUpdate appends the new document hash and applies the changed profile fields.
func (s *PostgresStore) RecordKYCUpdate(ctx context.Context, subjectID string, update KYCUpdate) error {
	hash, err := json.Marshal([]string{update.DocumentHash})
	if err != nil {
		return err
	}
	_, err = s.db.ExecContext(ctx, `
UPDATE kyc_profiles SET document_hashes = document_hashes || $2::jsonb, dttot_result = $3,
	legal_name = COALESCE(NULLIF($4::text, ''), legal_name), document_type = COALESCE(NULLIF($5::text, ''), document_type),
	document_number = COALESCE(NULLIF($6::text, ''), document_number), address = COALESCE(NULLIF($7::text, ''), address),
	birth_place = COALESCE(NULLIF($8::text, ''), birth_place), birth_date = COALESCE(NULLIF($9::text, '')::date, birth_date),
	updated_at = now()
WHERE subject_id = $1
`, subjectID, string(hash), update.DttotResult, update.LegalName, update.DocumentType, update.DocumentNumber, update.Address, update.BirthPlace, update.BirthDate)
	return err
}

// CreateCustomerNotice records a written notice owed to the customer. Suspicion handling never writes one.
func (s *PostgresStore) CreateCustomerNotice(ctx context.Context, subjectID string, kind string, reason string) error {
	noticeID, err := NewRandomHex(16)
	if err != nil {
		return err
	}
	_, err = s.db.ExecContext(ctx, `INSERT INTO customer_notices (notice_id, subject_id, kind, reason) VALUES ($1, $2, $3, $4)`, noticeID, subjectID, kind, reason)
	return err
}

// ListSederhanaRegister returns the active subjects that are still low risk, with the reviewer's reason.
func (s *PostgresStore) ListSederhanaRegister(ctx context.Context) ([]models.SederhanaRegisterEntry, error) {
	rows, err := s.db.QueryContext(ctx, `
SELECT subject_id, COALESCE(low_risk_reason, ''), approved_at FROM kyc_profiles
WHERE status = 'active' AND low_risk AND approved_at IS NOT NULL ORDER BY approved_at, subject_id
`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	entries := []models.SederhanaRegisterEntry{}
	for rows.Next() {
		var entry models.SederhanaRegisterEntry
		if err := rows.Scan(&entry.SubjectID, &entry.LowRiskReason, &entry.ApprovedAt); err != nil {
			return nil, err
		}
		entries = append(entries, entry)
	}
	return entries, rows.Err()
}
