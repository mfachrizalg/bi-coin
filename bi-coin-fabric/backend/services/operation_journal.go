package services

import (
	"bytes"
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
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

func operationStatusRank(status OperationStatus) int {
	switch status {
	case OperationPending:
		return 1
	case OperationSubmitted:
		return 2
	case OperationCompleted:
		return 3
	default:
		return 0
	}
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
	existing, ok := s.entries[key]
	if !ok {
		return sql.ErrNoRows
	}
	if existing.RequestHash != operation.RequestHash || operationStatusRank(operation.Status) == 0 {
		return fmt.Errorf("operation journal entry does not match")
	}
	if operationStatusRank(operation.Status) < operationStatusRank(existing.Status) {
		if existing.TxID == operation.TxID && bytes.Equal(existing.Response, operation.Response) {
			return nil
		}
		return fmt.Errorf("operation journal status cannot move backward")
	}
	if existing.TxID != "" && operation.TxID != "" && existing.TxID != operation.TxID {
		return fmt.Errorf("operation journal transaction id conflicts")
	}
	if len(existing.Response) > 0 && len(operation.Response) > 0 && !bytes.Equal(existing.Response, operation.Response) {
		return fmt.Errorf("operation journal receipt conflicts")
	}
	if operation.TxID == "" {
		operation.TxID = existing.TxID
	}
	if len(operation.Response) == 0 {
		operation.Response = existing.Response
	}
	operation.CreatedAt = existing.CreatedAt
	operation.UpdatedAt = time.Now().UTC()
	s.entries[key] = operation
	return nil
}
