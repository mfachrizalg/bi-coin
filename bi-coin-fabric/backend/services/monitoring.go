package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/hyperledger/fabric-gateway/pkg/client"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

const (
	monitorMSP        = "DistributorMSP"
	monitorEventName  = "TransferReceived"
	monitorWindow     = 24 * time.Hour
	monitorRetryDelay = 30 * time.Second
)

// MonitorThresholds are the limits of rules R1 to R3. Hits are alerts for compliance review, not findings.
type MonitorThresholds struct {
	UnverifiedAlertPercent  int // R1: share of the unverified ceiling
	VelocityMaxTransfers    int // R2: sent transfers per 24 hours
	StructuringMinTransfers int // R3: transfers near the limit per 24 hours
	StructuringBandPercent  int // R3: how far below the per-transaction limit still counts as near
}

func MonitorThresholdsFromConfig(cfg *config.Config) MonitorThresholds {
	return MonitorThresholds{
		UnverifiedAlertPercent:  cfg.MonitorUnverifiedAlertPercent,
		VelocityMaxTransfers:    cfg.MonitorVelocityMaxTransfers,
		StructuringMinTransfers: cfg.MonitorStructuringMinTransfers,
		StructuringBandPercent:  cfg.MonitorStructuringBandPercent,
	}
}

// ruleR1 asks for verification once an unverified subject holds the given share of the unverified ceiling.
func ruleR1(balance int64, unverifiedCeiling int64, verified bool, percent int) bool {
	return !verified && unverifiedCeiling > 0 && balance*100 >= unverifiedCeiling*int64(percent)
}

// ruleR2 flags velocity: more than max transfers sent within the window.
func ruleR2(sentInWindow int, max int) bool {
	return sentInWindow > max
}

// ruleR3 flags structuring: at least minCount transfers within bandPercent below the per-transaction limit.
func ruleR3(sentInWindow []int64, perTransactionLimit int64, bandPercent int, minCount int) bool {
	if perTransactionLimit <= 0 {
		return false
	}
	near := 0
	for _, amount := range sentInWindow {
		if amount <= perTransactionLimit && amount*100 >= perTransactionLimit*int64(100-bandPercent) {
			near++
		}
	}
	return near >= minCount
}

// TransferMonitor reads TransferReceived events and raises alerts for rules R1 to R3. Staff review
// the alerts. The monitor never changes ledger state.
type TransferMonitor struct {
	store      *PostgresStore
	ledger     *StudyLedgerService
	username   string
	thresholds MonitorThresholds
}

// NewTransferMonitor reads subject state through the first configured DistributorMSP identity.
func NewTransferMonitor(store *PostgresStore, ledger *StudyLedgerService, thresholds MonitorThresholds) (*TransferMonitor, error) {
	username, ok := ledger.UsernameForMSP(monitorMSP)
	if !ok {
		return nil, errors.New("no DistributorMSP study identity is configured")
	}
	return &TransferMonitor{store: store, ledger: ledger, username: username, thresholds: thresholds}, nil
}

// Run consumes events until ctx ends. A failed or closed stream is logged and reopened from the checkpoint,
// so the API keeps serving while Fabric is unreachable.
func (m *TransferMonitor) Run(ctx context.Context) {
	for ctx.Err() == nil {
		if err := m.consume(ctx); err != nil && ctx.Err() == nil {
			log.Printf("transfer monitor: %v; retrying in %s", err, monitorRetryDelay)
		}
		select {
		case <-ctx.Done():
		case <-time.After(monitorRetryDelay):
		}
	}
}

// consume resumes at the checkpoint block. Events of that block arrive again, which is harmless
// because flows are keyed by transaction ID and an open alert is unique per subject and rule.
// shortcut: with no checkpoint the stream starts at the next block, so transfers committed while the
// backend was down are missed on the first run; upgrade by recording the block height at start.
func (m *TransferMonitor) consume(ctx context.Context) error {
	var options []client.ChaincodeEventsOption
	block, found, err := m.store.MonitoringCheckpoint(ctx)
	if err != nil {
		return fmt.Errorf("read checkpoint: %w", err)
	}
	if found {
		options = append(options, client.WithStartBlock(block))
	}
	events, err := m.ledger.ChaincodeEvents(ctx, m.username, studyPaymentsChaincode, options...)
	if err != nil {
		return fmt.Errorf("open event stream: %w", err)
	}
	for event := range events {
		if err := m.handle(ctx, event); err != nil {
			return fmt.Errorf("handle event of transaction %s: %w", event.TransactionID, err)
		}
		if err := m.store.SaveMonitoringCheckpoint(ctx, event.BlockNumber, event.TransactionID); err != nil {
			return fmt.Errorf("save checkpoint: %w", err)
		}
	}
	return errors.New("event stream closed")
}

func (m *TransferMonitor) handle(ctx context.Context, event *client.ChaincodeEvent) error {
	if event.EventName != monitorEventName {
		return nil
	}
	var transfer struct {
		From   string `json:"from"`
		To     string `json:"to"`
		Amount int64  `json:"amount"`
		Kind   string `json:"kind"`
	}
	if err := json.Unmarshal(event.Payload, &transfer); err != nil {
		log.Printf("transfer monitor: skip event of transaction %s: %v", event.TransactionID, err)
		return nil
	}
	if err := m.store.RecordFlow(ctx, event.TransactionID, transfer.Kind, transfer.From, transfer.To, transfer.Amount); err != nil {
		return err
	}
	if err := m.checkSender(ctx, transfer.From); err != nil {
		return err
	}
	return m.checkReceiver(ctx, transfer.To)
}

func (m *TransferMonitor) checkSender(ctx context.Context, subjectID string) error {
	sent, err := m.store.SentSince(ctx, subjectID, time.Now().Add(-monitorWindow))
	if err != nil {
		return err
	}
	if ruleR2(len(sent), m.thresholds.VelocityMaxTransfers) {
		detail := fmt.Sprintf("%d transfers sent in 24 hours, above the limit of %d", len(sent), m.thresholds.VelocityMaxTransfers)
		if err := m.store.RaiseAlert(ctx, subjectID, "R2", detail); err != nil {
			return err
		}
	}
	if len(sent) < m.thresholds.StructuringMinTransfers {
		return nil
	}
	subject, err := m.subject(ctx, subjectID)
	if err != nil {
		return err
	}
	if ruleR3(sent, subject.Limits.PerTransaction, m.thresholds.StructuringBandPercent, m.thresholds.StructuringMinTransfers) {
		detail := fmt.Sprintf("at least %d transfers within %d%% below the per-transaction limit of Rp%d in 24 hours",
			m.thresholds.StructuringMinTransfers, m.thresholds.StructuringBandPercent, subject.Limits.PerTransaction)
		return m.store.RaiseAlert(ctx, subjectID, "R3", detail)
	}
	return nil
}

// checkReceiver applies R1. A staff identity cannot read a customer wallet (GetBalance needs the applicant),
// so the balance is rebuilt from recorded transfers and fundings.
// shortcut: wallets funded outside the backend are missing from the balance, upgrade by adding the balance to the event.
func (m *TransferMonitor) checkReceiver(ctx context.Context, subjectID string) error {
	balance, err := m.store.FlowBalance(ctx, subjectID)
	if err != nil {
		return err
	}
	result, err := m.ledger.Evaluate(m.username, monitorMSP, studyControlsChaincode, "GetCddCeilings")
	if err != nil {
		return err
	}
	var ceilings struct {
		UnverifiedHoldings int64 `json:"unverified_holdings"`
	}
	if err := json.Unmarshal(result, &ceilings); err != nil {
		return err
	}
	subject, err := m.subject(ctx, subjectID)
	if err != nil {
		return err
	}
	if ruleR1(balance, ceilings.UnverifiedHoldings, subject.Verified, m.thresholds.UnverifiedAlertPercent) {
		detail := fmt.Sprintf("unverified balance of Rp%d reaches %d%% of the Rp%d unverified ceiling; verify the subject",
			balance, m.thresholds.UnverifiedAlertPercent, ceilings.UnverifiedHoldings)
		return m.store.RaiseAlert(ctx, subjectID, "R1", detail)
	}
	return nil
}

type monitoredSubject struct {
	Verified bool `json:"verified"`
	Limits   struct {
		PerTransaction int64 `json:"per_transaction"`
	} `json:"limits"`
}

func (m *TransferMonitor) subject(ctx context.Context, subjectID string) (monitoredSubject, error) {
	var subject monitoredSubject
	result, err := m.ledger.Evaluate(m.username, monitorMSP, studyControlsChaincode, "GetSubject", subjectID)
	if err != nil {
		return subject, err
	}
	return subject, json.Unmarshal(result, &subject)
}

// MonitoringCheckpoint returns the block of the last handled event.
func (s *PostgresStore) MonitoringCheckpoint(ctx context.Context) (uint64, bool, error) {
	var block int64
	err := s.db.QueryRowContext(ctx, `SELECT block_number FROM monitoring_checkpoint WHERE id = 1`).Scan(&block)
	if errors.Is(err, sql.ErrNoRows) {
		return 0, false, nil
	}
	return uint64(block), err == nil, err
}

func (s *PostgresStore) SaveMonitoringCheckpoint(ctx context.Context, block uint64, txID string) error {
	_, err := s.db.ExecContext(ctx, `
INSERT INTO monitoring_checkpoint (id, block_number, tx_id) VALUES (1, $1, $2)
ON CONFLICT (id) DO UPDATE SET block_number = EXCLUDED.block_number, tx_id = EXCLUDED.tx_id, updated_at = now()
`, int64(block), txID)
	return err
}

// RecordFlow stores a transfer or funding once per flow ID. R1 rebuilds balances and R2 and R3 count windows from these rows.
func (s *PostgresStore) RecordFlow(ctx context.Context, flowID string, kind string, fromID string, toID string, amount int64) error {
	_, err := s.db.ExecContext(ctx, `
INSERT INTO monitoring_flows (flow_id, kind, from_id, to_id, amount) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (flow_id) DO NOTHING
`, flowID, kind, fromID, toID, amount)
	return err
}

// SentSince returns the amounts of transfers the subject sent since the given time.
func (s *PostgresStore) SentSince(ctx context.Context, subjectID string, since time.Time) ([]int64, error) {
	rows, err := s.db.QueryContext(ctx, `SELECT amount FROM monitoring_flows WHERE kind = 'transfer' AND from_id = $1 AND observed_at >= $2`, subjectID, since)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var amounts []int64
	for rows.Next() {
		var amount int64
		if err := rows.Scan(&amount); err != nil {
			return nil, err
		}
		amounts = append(amounts, amount)
	}
	return amounts, rows.Err()
}

// FlowBalance is what the subject received (transfers and fundings) minus what it sent.
func (s *PostgresStore) FlowBalance(ctx context.Context, subjectID string) (int64, error) {
	var balance int64
	err := s.db.QueryRowContext(ctx, `
SELECT COALESCE(SUM(CASE WHEN to_id = $1 THEN amount ELSE 0 END) - SUM(CASE WHEN from_id = $1 AND kind = 'transfer' THEN amount ELSE 0 END), 0)::bigint
FROM monitoring_flows WHERE to_id = $1 OR from_id = $1
`, subjectID).Scan(&balance)
	return balance, err
}

// RaiseAlert opens an alert unless the subject already has an open one for the rule.
func (s *PostgresStore) RaiseAlert(ctx context.Context, subjectID string, rule string, detail string) error {
	alertID, err := NewRandomHex(16)
	if err != nil {
		return err
	}
	_, err = s.db.ExecContext(ctx, `
INSERT INTO monitoring_alerts (alert_id, subject_id, rule, detail) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING
`, alertID, subjectID, rule, detail)
	return err
}

func (s *PostgresStore) ListMonitoringAlerts(ctx context.Context) ([]models.MonitoringAlert, error) {
	rows, err := s.db.QueryContext(ctx, `SELECT alert_id, subject_id, rule, detail, status, created_at FROM monitoring_alerts ORDER BY created_at DESC, alert_id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	alerts := []models.MonitoringAlert{}
	for rows.Next() {
		var alert models.MonitoringAlert
		if err := rows.Scan(&alert.AlertID, &alert.SubjectID, &alert.Rule, &alert.Detail, &alert.Status, &alert.CreatedAt); err != nil {
			return nil, err
		}
		alerts = append(alerts, alert)
	}
	return alerts, rows.Err()
}

// OpenAlertSubject returns the subject of an open alert, or NotFound when the alert is missing or already confirmed.
func (s *PostgresStore) OpenAlertSubject(ctx context.Context, alertID string) (string, error) {
	var subjectID string
	err := s.db.QueryRowContext(ctx, `SELECT subject_id FROM monitoring_alerts WHERE alert_id = $1 AND status = 'open'`, alertID).Scan(&subjectID)
	if errors.Is(err, sql.ErrNoRows) {
		return "", NotFound("open alert not found")
	}
	return subjectID, err
}

// ConfirmMonitoringAlert marks the alert confirmed and writes the LTKM draft in one transaction.
// The draft is not sent to PPATK, and the customer gets no notice (anti-tipping-off).
func (s *PostgresStore) ConfirmMonitoringAlert(ctx context.Context, alertID string, confirmedBy string) error {
	draftID, err := NewRandomHex(16)
	if err != nil {
		return err
	}
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer func() { _ = tx.Rollback() }()
	var subjectID, rule, detail string
	err = tx.QueryRowContext(ctx, `
UPDATE monitoring_alerts SET status = 'confirmed', confirmed_by = $2, confirmed_at = now()
WHERE alert_id = $1 AND status = 'open' RETURNING subject_id, rule, detail
`, alertID, confirmedBy).Scan(&subjectID, &rule, &detail)
	if errors.Is(err, sql.ErrNoRows) {
		return NotFound("open alert not found")
	}
	if err != nil {
		return err
	}
	if _, err := tx.ExecContext(ctx, `
INSERT INTO ltkm_drafts (draft_id, subject_id, alert_id, reason, created_by) VALUES ($1, $2, $3, $4, $5)
`, draftID, subjectID, alertID, rule+": "+detail, confirmedBy); err != nil {
		return err
	}
	return tx.Commit()
}
