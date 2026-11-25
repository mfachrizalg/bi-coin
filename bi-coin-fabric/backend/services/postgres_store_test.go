package services

import (
	"context"
	"errors"
	"os"
	"reflect"
	"testing"
	"time"
)

// openScratchStore connects to the scratch PostgreSQL database named by TEST_DATABASE_URL and empties the
// CDD Sederhana tables. It skips when the variable is unset, so the suite needs no database by default.
func openScratchStore(t *testing.T) (*PostgresStore, context.Context) {
	t.Helper()
	url := os.Getenv("TEST_DATABASE_URL")
	if url == "" {
		t.Skip("TEST_DATABASE_URL is not set")
	}
	ctx := context.Background()
	store, err := NewPostgresStore(ctx, url)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { store.Close() })
	if err := store.migrate(ctx); err != nil {
		t.Fatalf("second migration must be idempotent: %v", err)
	}
	for _, table := range []string{"kyc_profiles", "monitoring_alerts", "ltkm_drafts", "customer_notices", "monitoring_checkpoint", "monitoring_flows"} {
		if _, err := store.db.ExecContext(ctx, "TRUNCATE "+table+" CASCADE"); err != nil {
			t.Fatal(err)
		}
	}
	return store, ctx
}

func TestStoreCDDSederhanaTables(t *testing.T) {
	store, ctx := openScratchStore(t)

	t.Run("profile lifecycle mirrors the ledger", func(t *testing.T) {
		profile := KYCProfile{ProfileID: "p1", SubjectType: "retail", SubjectID: "s1", LegalName: "Test", DocumentType: "ktp", DocumentNumber: "1", DocumentHash: "h1", Address: "Jl. A", BirthPlace: "Sleman", BirthDate: "2000-01-31"}
		if err := store.CreateKYCProfile(ctx, profile); err != nil {
			t.Fatal(err)
		}
		if err := store.RecordKYCReview(ctx, "s1", "not_listed", "capped product"); err != nil {
			t.Fatal(err)
		}
		if entries, err := store.ListSederhanaRegister(ctx); err != nil || len(entries) != 0 {
			t.Fatalf("a pending subject is not on the register: %v %v", entries, err)
		}
		if err := store.SyncKYCStatus(ctx, "s1", LedgerSubjectState{Status: "active", LowRisk: true, LowRiskReason: "capped product", ApprovedAt: 1700000000}); err != nil {
			t.Fatal(err)
		}
		entries, err := store.ListSederhanaRegister(ctx)
		if err != nil || len(entries) != 1 || entries[0].SubjectID != "s1" || entries[0].LowRiskReason != "capped product" || entries[0].ApprovedAt.Unix() != 1700000000 {
			t.Fatalf("register = %+v, %v", entries, err)
		}
		if err := store.RecordKYCUpdate(ctx, "s1", KYCUpdate{DocumentHash: "h2", DttotResult: "not_listed", Address: "Jl. B"}); err != nil {
			t.Fatal(err)
		}
		var address, name, hashes string
		if err := store.db.QueryRowContext(ctx, `SELECT address, legal_name, document_hashes::text FROM kyc_profiles WHERE subject_id = 's1'`).Scan(&address, &name, &hashes); err != nil {
			t.Fatal(err)
		}
		if address != "Jl. B" || name != "Test" || hashes != `["h1", "h2"]` {
			t.Fatalf("update result = %q %q %q", address, name, hashes)
		}
		if err := store.SyncKYCStatus(ctx, "s1", LedgerSubjectState{Status: "active", LowRisk: false, ApprovedAt: 1700000000}); err != nil {
			t.Fatal(err)
		}
		if entries, _ := store.ListSederhanaRegister(ctx); len(entries) != 0 {
			t.Fatalf("a subject outside Sederhana must leave the register: %+v", entries)
		}
		if err := store.SyncKYCStatus(ctx, "s1", LedgerSubjectState{Status: "closed", ClosedAt: 1700000100, CloseReason: "fictitious"}); err != nil {
			t.Fatal(err)
		}
		if err := store.CreateCustomerNotice(ctx, "s1", "closure", "fictitious"); err != nil {
			t.Fatal(err)
		}
	})

	t.Run("checkpoint and flows", func(t *testing.T) {
		if _, found, err := store.MonitoringCheckpoint(ctx); err != nil || found {
			t.Fatalf("fresh checkpoint: found=%t err=%v", found, err)
		}
		for _, block := range []uint64{7, 9} {
			if err := store.SaveMonitoringCheckpoint(ctx, block, "tx"); err != nil {
				t.Fatal(err)
			}
		}
		if block, found, err := store.MonitoringCheckpoint(ctx); err != nil || !found || block != 9 {
			t.Fatalf("checkpoint = %d %t %v", block, found, err)
		}
		for _, flow := range []struct {
			id, kind, from, to string
			amount             int64
		}{
			{"funding:k1", "funding", "d1", "a", 1_000_000},
			{"tx1", "transfer", "a", "b", 400_000},
			{"tx1", "transfer", "a", "b", 400_000}, // redelivered event
			{"tx2", "transfer", "a", "b", 300_000},
		} {
			if err := store.RecordFlow(ctx, flow.id, flow.kind, flow.from, flow.to, flow.amount); err != nil {
				t.Fatal(err)
			}
		}
		if balance, err := store.FlowBalance(ctx, "a"); err != nil || balance != 300_000 {
			t.Fatalf("balance of a = %d %v, want 300000", balance, err)
		}
		if balance, err := store.FlowBalance(ctx, "b"); err != nil || balance != 700_000 {
			t.Fatalf("balance of b = %d %v, want 700000", balance, err)
		}
		if balance, err := store.FlowBalance(ctx, "nobody"); err != nil || balance != 0 {
			t.Fatalf("balance of an unknown subject = %d %v", balance, err)
		}
		sent, err := store.SentSince(ctx, "a", time.Now().Add(-time.Hour))
		if err != nil || !reflect.DeepEqual(sent, []int64{400_000, 300_000}) {
			t.Fatalf("sent = %v %v", sent, err)
		}
		if sent, _ := store.SentSince(ctx, "a", time.Now().Add(time.Hour)); len(sent) != 0 {
			t.Fatalf("flows before the window start must not count: %v", sent)
		}
	})

	t.Run("alerts and LTKM drafts", func(t *testing.T) {
		for range 2 {
			if err := store.RaiseAlert(ctx, "s1", "R2", "11 transfers"); err != nil {
				t.Fatal(err)
			}
		}
		if err := store.RaiseAlert(ctx, "s1", "R3", "structuring"); err != nil {
			t.Fatal(err)
		}
		alerts, err := store.ListMonitoringAlerts(ctx)
		if err != nil || len(alerts) != 2 {
			t.Fatalf("an open alert is unique per subject and rule: %+v %v", alerts, err)
		}
		var alertID string
		for _, alert := range alerts {
			if alert.Rule == "R2" {
				alertID = alert.AlertID
			}
		}
		if subjectID, err := store.OpenAlertSubject(ctx, alertID); err != nil || subjectID != "s1" {
			t.Fatalf("open alert subject = %q %v", subjectID, err)
		}
		if err := store.ConfirmMonitoringAlert(ctx, alertID, "officer"); err != nil {
			t.Fatal(err)
		}
		var drafts, notices int
		_ = store.db.QueryRowContext(ctx, `SELECT count(*) FROM ltkm_drafts WHERE alert_id = $1 AND created_by = 'officer'`, alertID).Scan(&drafts)
		_ = store.db.QueryRowContext(ctx, `SELECT count(*) FROM customer_notices WHERE kind <> 'closure'`).Scan(&notices)
		if drafts != 1 || notices != 0 {
			t.Fatalf("LTKM drafts = %d, non-closure notices = %d; want 1 and 0", drafts, notices)
		}
		var appErr *AppError
		if _, err := store.OpenAlertSubject(ctx, alertID); !errors.As(err, &appErr) || appErr.Code != CodeNotFound {
			t.Fatalf("a confirmed alert is no longer open: %v", err)
		}
		if err := store.ConfirmMonitoringAlert(ctx, alertID, "officer"); !errors.As(err, &appErr) || appErr.Code != CodeNotFound {
			t.Fatalf("a second confirmation must fail: %v", err)
		}
		if err := store.RaiseAlert(ctx, "s1", "R2", "again"); err != nil {
			t.Fatalf("a new alert may open after the old one is confirmed: %v", err)
		}
	})
}
