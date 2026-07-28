package services

import (
	"encoding/json"
	"errors"
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
	if err == nil || err.Error() != "off-chain CreateRetailCustomer: postgres unavailable" {
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
	if err == nil || err.Error() == "" {
		t.Fatal("expected invalid amount error")
	}
	if contract.submittedName != "" {
		t.Fatalf("ledger call = %s %v, want no ledger call", contract.submittedName, contract.submittedArgs)
	}
}

func TestTransferFallsBackToTransferredWhenChaincodeResultIsNotJSON(t *testing.T) {
	contract := &fakeLedgerContract{submitResult: []byte("not-json")}
	svc := NewLedgerServiceForTest(contract, nil, "")

	result, err := svc.Transfer(models.TransferRequest{
		SenderID:   "wlt-a",
		ReceiverID: "wlt-b",
		Amount:     "1500",
	})
	if err != nil {
		t.Fatalf("transfer: %v", err)
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
	if result.Status != "transferred" {
		t.Fatalf("transfer result = %+v, want fallback transferred status", result)
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
				return svc.RequestIssuance("bank-1", 2500000)
			},
			wantName: "RequestIssuance",
			wantArgs: []string{"bank-1", "2500000"},
		},
		{
			name: "request redemption",
			run: func(svc *LedgerService) error {
				return svc.RequestRedemption("bank-1", 1750000)
			},
			wantName: "RequestRedemption",
			wantArgs: []string{"bank-1", "1750000"},
		},
		{
			name: "distribute to participant",
			run: func(svc *LedgerService) error {
				return svc.DistributeToParticipant("bank-1", "pjp-1", 900000)
			},
			wantName: "DistributeToParticipant",
			wantArgs: []string{"bank-1", "pjp-1", "900000"},
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
		Payload:       intent.Payload,
		PayerWalletID: "wlt_customer-1",
	})
	if err != nil {
		t.Fatalf("pay qris: %v", err)
	}
	if contract.submittedName != "PayQris" {
		t.Fatalf("submitted %q, want PayQris", contract.submittedName)
	}
	wantArgs := []string{"wlt_customer-1", "wlt_merchant-1", "20000", intent.ReferenceID}
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
