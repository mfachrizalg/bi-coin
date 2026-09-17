package services

import (
	"testing"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

func TestPayQrisReplaysCompletedOperationAfterIntentIsPaid(t *testing.T) {
	store := &memoryKycStore{}
	contract := &fakeLedgerContract{submitResult: []byte(`{"status":"paid","tx_id":"tx-qris-1"}`)}
	svc := NewLedgerServiceForTest(contract, store, "qris-secret")
	intent, err := svc.CreateQrisIntent(models.CreateQrisIntentRequest{
		Mode:             models.QrisModeDynamic,
		MerchantID:       "merchant-1",
		MerchantWalletID: "wlt_merchant-1",
		Amount:           "20000",
	})
	if err != nil {
		t.Fatalf("create QRIS intent: %v", err)
	}
	req := models.PayQrisRequest{Payload: intent.Payload, PayerWalletID: "wlt_customer-1", IdempotencyKey: "qris-replay-1"}
	first, err := svc.PayQris(req)
	if err != nil {
		t.Fatalf("first QRIS payment: %v", err)
	}
	second, err := svc.PayQris(req)
	if err != nil {
		t.Fatalf("replayed QRIS payment: %v", err)
	}
	if first.TxID != second.TxID || first.ReferenceID != second.ReferenceID {
		t.Fatalf("first=%+v second=%+v, want identical receipts", first, second)
	}
}
