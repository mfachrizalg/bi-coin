package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
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
INSERT INTO kyc_profiles (profile_id, subject_type, subject_id, legal_name, document_type, document_number, document_hashes, status)
VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
`, profile.ProfileID, profile.SubjectType, profile.SubjectID, profile.LegalName, profile.DocumentType, profile.DocumentNumber, string(hashes)); err != nil {
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
