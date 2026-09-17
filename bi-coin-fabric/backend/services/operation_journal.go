package services

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"sync"
	"time"
)

type OperationStatus string

const (
	OperationPending   OperationStatus = "pending"
	OperationSubmitted OperationStatus = "submitted"
	OperationCompleted OperationStatus = "completed"
)

// OperationJournal is the durable recovery record for an externally visible
// mutation. The unique key is the principal scope/idempotency key, not a
// process-local map key.
type OperationJournal struct {
	PrincipalScope string
	PrincipalID    string
	IdempotencyKey string
	Operation      string
	RequestHash    string
	OperationRef   string
	Status         OperationStatus
	TxID           string
	Response       json.RawMessage
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

type OperationJournalStore interface {
	BeginOperation(ctx context.Context, operation OperationJournal) (existing OperationJournal, created bool, err error)
	GetOperation(ctx context.Context, scope string, principalID string, key string) (*OperationJournal, error)
	UpdateOperation(ctx context.Context, operation OperationJournal) error
}

func operationReference(scope, principalID, key string) string {
	sum := sha256.Sum256([]byte(scope + "\x00" + principalID + "\x00" + key))
	return "op_" + hex.EncodeToString(sum[:])
}

// memoryOperationJournal exists only for NewLedgerServiceForTest. Runtime
// services require PostgresStore's durable implementation.
type memoryOperationJournal struct {
	mu      sync.Mutex
	entries map[string]OperationJournal
}

func newMemoryOperationJournal() *memoryOperationJournal {
	return &memoryOperationJournal{entries: make(map[string]OperationJournal)}
}

func (s *memoryOperationJournal) BeginOperation(_ context.Context, operation OperationJournal) (OperationJournal, bool, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	key := operation.PrincipalScope + "\x00" + operation.PrincipalID + "\x00" + operation.IdempotencyKey
	if existing, ok := s.entries[key]; ok {
		return existing, false, nil
	}
	now := time.Now().UTC()
	operation.CreatedAt = now
	operation.UpdatedAt = now
	s.entries[key] = operation
	return operation, true, nil
}

func (s *memoryOperationJournal) GetOperation(_ context.Context, scope string, principalID string, key string) (*OperationJournal, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	operation, ok := s.entries[scope+"\x00"+principalID+"\x00"+key]
	if !ok {
		return nil, sql.ErrNoRows
	}
	return &operation, nil
}

func (s *memoryOperationJournal) UpdateOperation(_ context.Context, operation OperationJournal) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	key := operation.PrincipalScope + "\x00" + operation.PrincipalID + "\x00" + operation.IdempotencyKey
	operation.UpdatedAt = time.Now().UTC()
	s.entries[key] = operation
	return nil
}
