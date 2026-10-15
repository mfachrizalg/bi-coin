package services

import (
	"context"
	"encoding/json"
	"errors"
	"strings"
	"testing"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

func TestCreateRetailCustomerHashesIdentityAndAnchorsCustomer(t *testing.T) {
	created := models.RetailCustomer{
		CustomerID:      "cust-1",
		IdentityHash:    "expected-hash",
		WalletAccountID: "acct-1",
		KycProfileID:    "kyc-1",
	}
	result, err := json.Marshal(created)
	if err != nil {
		t.Fatalf("marshal retail customer: %v", err)
	}

	contract := &fakeLedgerContract{submitResult: result}
	store := &memoryKycStore{}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")
	req := models.RetailCustomerRequest{
		CustomerID:      "cust-1",
		LegalName:       "Alice Customer",
		WalletAccountID: "acct-1",
		KycProfileID:    "kyc-1",
	}

	customer, err := svc.CreateRetailCustomer(req)
	if err != nil {
		t.Fatalf("create retail customer: %v", err)
	}

	wantHash := svc.hashKycValue("cust-1:Alice Customer")
	if store.createRetailCustomer != req {
		t.Fatalf("store request = %+v, want %+v", store.createRetailCustomer, req)
	}
	if store.createIdentityHash != wantHash {
		t.Fatalf("store identity hash = %q, want %q", store.createIdentityHash, wantHash)
	}
	wantArgs := []string{"cust-1", wantHash, "acct-1", "kyc-1"}
	if contract.submittedName != "CreateRetailCustomer" || len(contract.submittedArgs) != len(wantArgs) {
		t.Fatalf("ledger call = %s %v, want CreateRetailCustomer %v", contract.submittedName, contract.submittedArgs, wantArgs)
	}
	for i := range wantArgs {
		if contract.submittedArgs[i] != wantArgs[i] {
			t.Fatalf("ledger arg[%d] = %q, want %q", i, contract.submittedArgs[i], wantArgs[i])
		}
	}
	if customer.CustomerID != created.CustomerID || customer.WalletAccountID != created.WalletAccountID || customer.KycProfileID != created.KycProfileID {
		t.Fatalf("created customer = %+v, want %+v", customer, created)
	}
}

func TestCreateRetailCustomerStopsWhenOffChainStoreFails(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{createErr: errors.New("postgres unavailable")}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")

	_, err := svc.CreateRetailCustomer(models.RetailCustomerRequest{
		CustomerID:      "cust-1",
		LegalName:       "Alice Customer",
		WalletAccountID: "acct-1",
	})
	if err == nil || err.Error() != "failed to persist retail customer: postgres unavailable" {
		t.Fatalf("create retail customer err = %v, want wrapped store error", err)
	}
	if contract.submittedName != "" {
		t.Fatalf("ledger call = %s %v, want no ledger call", contract.submittedName, contract.submittedArgs)
	}
}

func TestTransferRejectsInvalidAmountBeforeSubmitting(t *testing.T) {
	contract := &fakeLedgerContract{}
	svc := NewLedgerServiceForTest(contract, nil, "")

	_, err := svc.Transfer(models.TransferRequest{
		SenderID:   "wlt-a",
		ReceiverID: "wlt-b",
		Amount:     "bad-amount",
	})
	if err == nil || err.Error() != "invalid amount" {
		t.Fatalf("transfer err = %v, want invalid amount", err)
	}
	if contract.submittedName != "" {
		t.Fatalf("ledger call = %s %v, want no ledger call", contract.submittedName, contract.submittedArgs)
	}
}

func TestTransferRejectsEmptyReceipt(t *testing.T) {
	contract := &fakeLedgerContract{submitResult: []byte("not-json")}
	svc := NewLedgerServiceForTest(contract, nil, "")

	_, err := svc.Transfer(models.TransferRequest{
		SenderID:       "wlt-a",
		ReceiverID:     "wlt-b",
		Amount:         "1500",
		IdempotencyKey: "transfer-invalid-receipt",
	})
	if err == nil || !strings.Contains(err.Error(), "invalid ledger receipt") {
		t.Fatalf("transfer err = %v, want invalid ledger receipt", err)
	}
	if contract.submittedName != "Transfer" {
		t.Fatalf("submitted %q, want Transfer", contract.submittedName)
	}
	wantArgs := []string{"wlt-a", "wlt-b", "1500"}
	for i := range wantArgs {
		if contract.submittedArgs[i] != wantArgs[i] {
			t.Fatalf("arg[%d] = %q, want %q", i, contract.submittedArgs[i], wantArgs[i])
		}
	}
}

func TestTransferRecoversCommittedReceiptForPendingJournal(t *testing.T) {
	key := "transfer-committed-before-journal"
	reference := operationReference(":TEST-MSP", "test", key)
	receipt, _ := json.Marshal(models.TransferResult{Status: "settled", TxID: "tx-committed", ReferenceID: reference, SenderID: "wlt-a", ReceiverID: "wlt-b", Amount: 1_500})
	contract := &fakeLedgerContract{evaluateResult: receipt}
	svc := NewLedgerServiceForTest(contract, nil, "")
	_, _, err := svc.beginOperation(context.Background(), "transfer", key, struct {
		SenderID   string
		ReceiverID string
		Amount     int64
	}{"wlt-a", "wlt-b", 1_500})
	if err != nil {
		t.Fatalf("seed pending journal: %v", err)
	}

	result, err := svc.Transfer(models.TransferRequest{SenderID: "wlt-a", ReceiverID: "wlt-b", Amount: "1500", IdempotencyKey: key})
	if err != nil {
		t.Fatalf("recover committed transfer: %v", err)
	}
	if result.TxID != "tx-committed" || contract.submissionCount != 0 {
		t.Fatalf("recovery = %+v after %d submissions; want original receipt without submission", result, contract.submissionCount)
	}
}

type failOperationUpdateOnce struct {
	OperationJournalStore
	err error
}

func (s *failOperationUpdateOnce) UpdateOperation(ctx context.Context, operation OperationJournal) error {
	if s.err != nil {
		err := s.err
		s.err = nil
		return err
	}
	return s.OperationJournalStore.UpdateOperation(ctx, operation)
}

func TestTransferRetriesAfterReceiptPersistenceFailureWithoutSecondSubmission(t *testing.T) {
	key := "transfer-receipt-write-failure"
	reference := operationReference(":TEST-MSP", "test", key)
	receipt, _ := json.Marshal(models.TransferResult{Status: "settled", TxID: "tx-once", ReferenceID: reference, SenderID: "wlt-a", ReceiverID: "wlt-b", Amount: 1_500})
	contract := &fakeLedgerContract{submitResult: receipt}
	svc := NewLedgerServiceForTest(contract, nil, "")
	svc.operations = &failOperationUpdateOnce{OperationJournalStore: svc.operations, err: errors.New("journal unavailable")}
	request := models.TransferRequest{SenderID: "wlt-a", ReceiverID: "wlt-b", Amount: "1500", IdempotencyKey: key}
	if _, err := svc.Transfer(request); err == nil {
		t.Fatal("expected receipt journal write failure")
	}
	if contract.submissionCount != 1 {
		t.Fatalf("initial submissions = %d, want 1", contract.submissionCount)
	}

	contract.evaluateResult = receipt
	result, err := svc.Transfer(request)
	if err != nil {
		t.Fatalf("recover after journal failure: %v", err)
	}
	if result.TxID != "tx-once" || contract.submissionCount != 1 {
		t.Fatalf("recovery = %+v after %d submissions; want tx-once and one submission", result, contract.submissionCount)
	}
}

func TestOperationJournalStatusCannotRegressOrChangeReceipt(t *testing.T) {
	store := newMemoryOperationJournal()
	operation := OperationJournal{PrincipalScope: "scope", PrincipalID: "principal", IdempotencyKey: "key", Operation: "transfer", RequestHash: "hash", OperationRef: "ref", Status: OperationPending}
	if _, _, err := store.BeginOperation(context.Background(), operation); err != nil {
		t.Fatalf("begin operation: %v", err)
	}
	submitted := operation
	submitted.Status = OperationSubmitted
	submitted.TxID = "tx-1"
	submitted.Response = json.RawMessage(`{"tx_id":"tx-1"}`)
	if err := store.UpdateOperation(context.Background(), submitted); err != nil {
		t.Fatalf("mark submitted: %v", err)
	}
	completed := submitted
	completed.Status = OperationCompleted
	if err := store.UpdateOperation(context.Background(), completed); err != nil {
		t.Fatalf("mark completed: %v", err)
	}
	if err := store.UpdateOperation(context.Background(), submitted); err != nil {
		t.Fatalf("late matching submitted update: %v", err)
	}
	conflicting := submitted
	conflicting.Response = json.RawMessage(`{"tx_id":"tx-other"}`)
	if err := store.UpdateOperation(context.Background(), conflicting); err == nil {
		t.Fatal("expected conflicting late receipt to be rejected")
	}
	current, err := store.GetOperation(context.Background(), operation.PrincipalScope, operation.PrincipalID, operation.IdempotencyKey)
	if err != nil || current.Status != OperationCompleted || current.TxID != "tx-1" {
		t.Fatalf("journal after late updates = %+v, %v; want completed tx-1", current, err)
	}
}

func TestLedgerServiceLiquidityAndLimitCommands(t *testing.T) {
	tests := []struct {
		name     string
		run      func(*LedgerService) error
		wantName string
		wantArgs []string
	}{
		{
			name: "set system limit",
			run: func(svc *LedgerService) error {
				return svc.SetSystemLimit(models.SetLimitRequest{Scope: models.ScopePerTxAmount, Value: "2500000"})
			},
			wantName: "SetSystemLimit",
			wantArgs: []string{"per_tx_amount", "2500000"},
		},
		{
			name: "request issuance",
			run: func(svc *LedgerService) error {
				return svc.RequestIssuance(2500000, "issuance-1")
			},
			wantName: "RequestIssuance",
			wantArgs: []string{"2500000", operationReference(":TEST-MSP", "test", "issuance-1")},
		},
		{
			name: "request redemption",
			run: func(svc *LedgerService) error {
				return svc.RequestRedemption("bank-1", 1750000, "redemption-1")
			},
			wantName: "RequestRedemption",
			wantArgs: []string{"bank-1", "1750000", operationReference(":TEST-MSP", "test", "redemption-1")},
		},
		{
			name: "distribute to participant",
			run: func(svc *LedgerService) error {
				return svc.DistributeToParticipant("pjp-1", 900000, "distribution-1")
			},
			wantName: "DistributeToParticipant",
			wantArgs: []string{"pjp-1", "900000", operationReference(":TEST-MSP", "test", "distribution-1")},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			contract := &fakeLedgerContract{}
			svc := NewLedgerServiceForTest(contract, nil, "")

			if err := tt.run(svc); err != nil {
				t.Fatalf("%s: %v", tt.name, err)
			}
			if contract.submittedName != tt.wantName {
				t.Fatalf("submitted %q, want %q", contract.submittedName, tt.wantName)
			}
			if len(contract.submittedArgs) != len(tt.wantArgs) {
				t.Fatalf("args = %v, want %v", contract.submittedArgs, tt.wantArgs)
			}
			for i := range tt.wantArgs {
				if contract.submittedArgs[i] != tt.wantArgs[i] {
					t.Fatalf("arg[%d] = %q, want %q", i, contract.submittedArgs[i], tt.wantArgs[i])
				}
			}
		})
	}
}

func TestDistributionPendingKeyRecoversUsingSameLedgerReference(t *testing.T) {
	contract := &fakeLedgerContract{}
	svc := NewLedgerServiceForTest(contract, nil, "")
	_, _, err := svc.beginOperation(context.Background(), "distribution", "pending-distribution", struct {
		ReceiverParticipantID string
		Amount                int64
	}{"pjp-1", 900_000})
	if err != nil {
		t.Fatalf("seed pending operation: %v", err)
	}

	err = svc.DistributeToParticipant("pjp-1", 900_000, "pending-distribution")
	if err != nil {
		t.Fatalf("retry pending distribution: %v", err)
	}
	if contract.submittedName != "DistributeToParticipant" || contract.submittedArgs[2] != operationReference(":TEST-MSP", "test", "pending-distribution") {
		t.Fatalf("pending distribution = %s %v, want same ledger reference", contract.submittedName, contract.submittedArgs)
	}
}

func TestCreateQrisIntentStoresStaticIntentAndReturnsPayload(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{}
	svc := NewLedgerServiceForTest(contract, store, "qris-secret")

	intent, err := svc.CreateQrisIntent(models.CreateQrisIntentRequest{
		Mode:             models.QrisModeStatic,
		MerchantID:       "merchant-1",
		MerchantWalletID: "wlt_merchant-1",
		Label:            "Warung Garuda",
	})
	if err != nil {
		t.Fatalf("create qris intent: %v", err)
	}
	if store.createdQrisIntent == nil {
		t.Fatal("expected off-chain QRIS intent store call")
	}
	if store.createdQrisIntent.Mode != models.QrisModeStatic {
		t.Fatalf("stored mode = %s, want static", store.createdQrisIntent.Mode)
	}
	if intent.IntentID == "" || intent.Payload == "" || intent.ReferenceID == "" {
		t.Fatalf("created intent = %+v, want id, payload, and reference", intent)
	}
	if contract.submittedName != "" {
		t.Fatalf("ledger call = %s %v, want no ledger call during create", contract.submittedName, contract.submittedArgs)
	}
}

func TestPayQrisRejectsTamperedPayloadBeforeLedgerCall(t *testing.T) {
	store := &memoryKycStore{}
	svc := NewLedgerServiceForTest(&fakeLedgerContract{}, store, "qris-secret")

	intent, err := svc.CreateQrisIntent(models.CreateQrisIntentRequest{
		Mode:             models.QrisModeDynamic,
		MerchantID:       "merchant-1",
		MerchantWalletID: "wlt_merchant-1",
		Amount:           "15000",
	})
	if err != nil {
		t.Fatalf("create qris intent: %v", err)
	}

	contract := &fakeLedgerContract{}
	svc = NewLedgerServiceForTest(contract, store, "qris-secret")
	_, err = svc.PayQris(models.PayQrisRequest{
		Payload:       intent.Payload + "tamper",
		PayerWalletID: "wlt_customer-1",
	})
	if err == nil {
		t.Fatal("expected tampered payload to be rejected")
	}
	if contract.submittedName != "" {
		t.Fatalf("ledger call = %s %v, want no ledger call", contract.submittedName, contract.submittedArgs)
	}
}

func TestPayQrisMarksDynamicIntentPaidAndUsesReference(t *testing.T) {
	store := &memoryKycStore{}
	svc := NewLedgerServiceForTest(&fakeLedgerContract{}, store, "qris-secret")

	intent, err := svc.CreateQrisIntent(models.CreateQrisIntentRequest{
		Mode:             models.QrisModeDynamic,
		MerchantID:       "merchant-1",
		MerchantWalletID: "wlt_merchant-1",
		Amount:           "20000",
	})
	if err != nil {
		t.Fatalf("create qris intent: %v", err)
	}

	contract := &fakeLedgerContract{submitResult: []byte(`{"status":"paid","tx_id":"tx-qris-1"}`)}
	svc = NewLedgerServiceForTest(contract, store, "qris-secret")
	result, err := svc.PayQris(models.PayQrisRequest{
		Payload:        intent.Payload,
		PayerWalletID:  "wlt_customer-1",
		IdempotencyKey: "qris-pay-1",
	})
	if err != nil {
		t.Fatalf("pay qris: %v", err)
	}
	if contract.submittedName != "PayQris" {
		t.Fatalf("submitted %q, want PayQris", contract.submittedName)
	}
	wantArgs := []string{"wlt_customer-1", "wlt_merchant-1", "20000", operationReference(":TEST-MSP", "test", "qris-pay-1")}
	for i := range wantArgs {
		if contract.submittedArgs[i] != wantArgs[i] {
			t.Fatalf("arg[%d] = %q, want %q", i, contract.submittedArgs[i], wantArgs[i])
		}
	}
	if store.markPaidIntentID != intent.IntentID || store.markPaidTxID != "tx-qris-1" {
		t.Fatalf("paid intent tracking = %q / %q, want %q / tx-qris-1", store.markPaidIntentID, store.markPaidTxID, intent.IntentID)
	}
	if result.ReferenceID != intent.ReferenceID {
		t.Fatalf("pay result = %+v, want reference %q", result, intent.ReferenceID)
	}
}

func TestPayQrisReplaysRecordedReceiptAfterPersistFailure(t *testing.T) {
	store := &memoryKycStore{markPaidErr: errors.New("db write failed")}
	svc := NewLedgerServiceForTest(&fakeLedgerContract{}, store, "qris-secret")

	intent, err := svc.CreateQrisIntent(models.CreateQrisIntentRequest{
		Mode:             models.QrisModeDynamic,
		MerchantID:       "merchant-1",
		MerchantWalletID: "wlt_merchant-1",
		Amount:           "20000",
	})
	if err != nil {
		t.Fatalf("create qris intent: %v", err)
	}

	contract := &fakeLedgerContract{submitResult: []byte(`{"status":"paid","tx_id":"tx-qris-1"}`)}
	svc = NewLedgerServiceForTest(contract, store, "qris-secret")

	_, err = svc.PayQris(models.PayQrisRequest{Payload: intent.Payload, PayerWalletID: "wlt_customer-1", IdempotencyKey: "qris-pay-retry"})
	if err == nil || err.Error() != "failed to persist QRIS payment: db write failed" {
		t.Fatalf("first pay err = %v", err)
	}
	store.markPaidErr = nil

	result, err := svc.PayQris(models.PayQrisRequest{Payload: intent.Payload, PayerWalletID: "wlt_customer-1", IdempotencyKey: "qris-pay-retry"})
	if err != nil {
		t.Fatalf("replay pay qris: %v", err)
	}
	if result.TxID != "tx-qris-1" || contract.submittedName != "PayQris" {
		t.Fatalf("replay result = %+v, submissions = %s", result, contract.submittedName)
	}
}

func TestRtgsIssuanceNotificationUsesSenderBICAndRequiresReceipt(t *testing.T) {
	contract := &fakeLedgerContract{submitResult: []byte(`{"status":"issued","reference":"ref-1","amount":1000,"participant_id":"bank-1","sender_bic":"BANKIDJA","tx_id":"tx-rtgs-1"}`)}
	svc := NewLedgerServiceForTest(contract, nil, "")

	result, err := svc.RtgsIssuanceNotification("BANKIDJA", 1000, "ref-1")
	if err != nil {
		t.Fatalf("rtgs notification: %v", err)
	}
	if contract.submittedName != "RequestIssuanceRtgs" {
		t.Fatalf("submitted %q", contract.submittedName)
	}
	wantArgs := []string{"BANKIDJA", "1000", "ref-1"}
	for i := range wantArgs {
		if contract.submittedArgs[i] != wantArgs[i] {
			t.Fatalf("arg[%d] = %q, want %q", i, contract.submittedArgs[i], wantArgs[i])
		}
	}
	if result["reference"] != "ref-1" {
		t.Fatalf("result = %+v", result)
	}
}
