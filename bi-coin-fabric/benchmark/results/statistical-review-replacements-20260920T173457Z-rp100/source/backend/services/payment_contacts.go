package services

import (
	"context"
	"database/sql"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

type PaymentContactStore interface {
	ListPaymentContacts(ctx context.Context, ownerUsername string) ([]*models.PaymentContact, error)
	CreatePaymentContact(ctx context.Context, ownerUsername string, req models.PaymentContactRequest) (*models.PaymentContact, error)
	UpdatePaymentContact(ctx context.Context, ownerUsername string, contactID string, req models.PaymentContactRequest) (*models.PaymentContact, error)
	DeletePaymentContact(ctx context.Context, ownerUsername string, contactID string) error
}

func normalizePaymentContact(req models.PaymentContactRequest) (models.PaymentContactRequest, error) {
	req.Label = strings.TrimSpace(req.Label)
	req.WalletID = strings.TrimSpace(req.WalletID)
	if req.Label == "" || len(req.Label) > 80 {
		return req, InvalidInput("label must be between 1 and 80 characters")
	}
	if req.WalletID == "" || len(req.WalletID) > 160 {
		return req, InvalidInput("wallet_id must be between 1 and 160 characters")
	}
	if req.RecipientType != models.PaymentContactRetailCustomer && req.RecipientType != models.PaymentContactMerchant {
		return req, InvalidInput("recipient_type must be retail_customer or merchant")
	}
	return req, nil
}

func paymentContactConflict(err error) error {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) && pgErr.Code == "23505" {
		return Conflict("a payment contact for this wallet already exists")
	}
	return Internal("payment contact persistence failed", err)
}

func (s *PostgresStore) ListPaymentContacts(ctx context.Context, ownerUsername string) ([]*models.PaymentContact, error) {
	rows, err := s.db.QueryContext(ctx, `
SELECT contact_id, label, wallet_id, recipient_type, created_at, updated_at
FROM payment_contacts
WHERE owner_username = $1
ORDER BY label ASC, created_at DESC`, ownerUsername)
	if err != nil {
		return nil, Internal("payment contact lookup failed", err)
	}
	defer rows.Close()

	contacts := make([]*models.PaymentContact, 0)
	for rows.Next() {
		contact, err := scanPaymentContact(rows)
		if err != nil {
			return nil, Internal("payment contact lookup failed", err)
		}
		contacts = append(contacts, contact)
	}
	if err := rows.Err(); err != nil {
		return nil, Internal("payment contact lookup failed", err)
	}
	return contacts, nil
}

func (s *PostgresStore) CreatePaymentContact(ctx context.Context, ownerUsername string, raw models.PaymentContactRequest) (*models.PaymentContact, error) {
	req, err := normalizePaymentContact(raw)
	if err != nil {
		return nil, err
	}
	contactID := "contact_" + uuid.NewString()
	row := s.db.QueryRowContext(ctx, `
INSERT INTO payment_contacts (contact_id, owner_username, label, wallet_id, recipient_type)
VALUES ($1, $2, $3, $4, $5)
RETURNING contact_id, label, wallet_id, recipient_type, created_at, updated_at`,
		contactID, ownerUsername, req.Label, req.WalletID, string(req.RecipientType))
	contact, err := scanPaymentContact(row)
	if err != nil {
		return nil, paymentContactConflict(err)
	}
	return contact, nil
}

func (s *PostgresStore) UpdatePaymentContact(ctx context.Context, ownerUsername string, contactID string, raw models.PaymentContactRequest) (*models.PaymentContact, error) {
	req, err := normalizePaymentContact(raw)
	if err != nil {
		return nil, err
	}
	row := s.db.QueryRowContext(ctx, `
UPDATE payment_contacts
SET label = $1, wallet_id = $2, recipient_type = $3, updated_at = now()
WHERE contact_id = $4 AND owner_username = $5
RETURNING contact_id, label, wallet_id, recipient_type, created_at, updated_at`,
		req.Label, req.WalletID, string(req.RecipientType), contactID, ownerUsername)
	contact, err := scanPaymentContact(row)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, NotFound("payment contact not found")
	}
	if err != nil {
		return nil, paymentContactConflict(err)
	}
	return contact, nil
}

func (s *PostgresStore) DeletePaymentContact(ctx context.Context, ownerUsername string, contactID string) error {
	result, err := s.db.ExecContext(ctx, `
DELETE FROM payment_contacts
WHERE contact_id = $1 AND owner_username = $2`, contactID, ownerUsername)
	if err != nil {
		return Internal("payment contact deletion failed", err)
	}
	deleted, err := result.RowsAffected()
	if err != nil {
		return Internal("payment contact deletion failed", err)
	}
	if deleted != 1 {
		return NotFound("payment contact not found")
	}
	return nil
}

type paymentContactScanner interface {
	Scan(dest ...any) error
}

func scanPaymentContact(scanner paymentContactScanner) (*models.PaymentContact, error) {
	var contact models.PaymentContact
	var recipientType string
	var createdAt, updatedAt time.Time
	if err := scanner.Scan(&contact.ID, &contact.Label, &contact.WalletID, &recipientType, &createdAt, &updatedAt); err != nil {
		return nil, err
	}
	contact.RecipientType = models.PaymentContactType(recipientType)
	contact.CreatedAt = createdAt.UTC().Format(time.RFC3339)
	contact.UpdatedAt = updatedAt.UTC().Format(time.RFC3339)
	return &contact, nil
}
