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
