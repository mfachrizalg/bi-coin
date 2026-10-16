package services

import (
	"testing"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

func TestCreateRetailCustomerAcceptsEmptySuccessfulLedgerReceipt(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")

	customer, err := svc.CreateRetailCustomer(models.RetailCustomerRequest{
		CustomerID:      "customer-1",
		LegalName:       "Customer One",
		WalletAccountID: "ACC-1",
		KycProfileID:    "kyc-1",
	})
	if err != nil {
		t.Fatalf("create retail customer: %v", err)
	}
	if customer.CustomerID != "customer-1" || customer.WalletAccountID != "ACC-1" || customer.IdentityHash == "" {
		t.Fatalf("customer = %+v, want persisted customer projection", customer)
	}
	if store.createRetailCustomer.KycProfileID != "kyc-1" || store.createRetailCustomer.LegalName != "Customer One" {
		t.Fatalf("store request = %+v, want original customer data", store.createRetailCustomer)
	}
	if contract.submittedName != "CreateRetailCustomer" {
		t.Fatalf("ledger call = %q, want CreateRetailCustomer", contract.submittedName)
	}
}
