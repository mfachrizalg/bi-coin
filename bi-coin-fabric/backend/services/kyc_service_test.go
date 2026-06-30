package services

import (
	"context"
	"reflect"
	"testing"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

type fakeLedgerContract struct {
	submittedName string
	submittedArgs []string
}

func TestRefreshKycProfileAnchorsDueDiligenceDecision(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{profile: &models.KycProfile{ProfileID: "kyc-1"}}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")
	expires := "2027-06-27T12:00:00Z"

	_, err := svc.RefreshKycProfile("kyc-1", models.KycProviderResultRequest{
		Status:            models.KycApproved,
		RiskLevel:         models.RiskHigh,
		DueDiligenceLevel: models.DueDiligenceEnhanced,
		SeniorApproval:    true,
		DocumentHashes:    []string{"sha256:document"},
		ExpiresAt:         &expires,
	})
	if err != nil {
		t.Fatalf("refresh KYC: %v", err)
	}
	want := []string{"kyc-1", "approved", "high", "enhanced", "true", `["sha256:document"]`, expires}
	if contract.submittedName != "RefreshKycProfile" || !reflect.DeepEqual(contract.submittedArgs, want) {
		t.Fatalf("ledger call = %s %v, want RefreshKycProfile %v", contract.submittedName, contract.submittedArgs, want)
	}
}

func TestRefreshKycProfileRejectsIncompleteHighRiskApproval(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{profile: &models.KycProfile{ProfileID: "kyc-high"}}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")

	_, err := svc.RefreshKycProfile("kyc-high", models.KycProviderResultRequest{
		Status:            models.KycApproved,
		RiskLevel:         models.RiskHigh,
		DueDiligenceLevel: models.DueDiligenceStandard,
		SeniorApproval:    false,
	})
	if err == nil {
		t.Fatal("expected incomplete high-risk approval to be rejected")
	}
	if contract.submittedName != "" {
		t.Fatalf("invalid decision reached ledger: %s %v", contract.submittedName, contract.submittedArgs)
	}
}

func (f *fakeLedgerContract) SubmitTransaction(name string, args ...string) ([]byte, error) {
	f.submittedName = name
	f.submittedArgs = args
	return nil, nil
}

func (f *fakeLedgerContract) EvaluateTransaction(name string, args ...string) ([]byte, error) {
	return nil, nil
}

type memoryKycStore struct {
	profile *models.KycProfile
	rawName string
}

func (s *memoryKycStore) CreateRetailCustomer(ctx context.Context, req models.RetailCustomerRequest, identityHash string) (*models.RetailCustomer, error) {
	return &models.RetailCustomer{CustomerID: req.CustomerID, IdentityHash: identityHash, WalletAccountID: req.WalletAccountID}, nil
}
func (s *memoryKycStore) ListRetailCustomers(ctx context.Context) ([]*models.RetailCustomer, error) {
	return nil, nil
}
func (s *memoryKycStore) SubmitKycProfile(ctx context.Context, req models.KycProfileRequest, anchor models.KycProfile) (*models.KycProfile, error) {
	s.rawName = req.LegalName
	s.profile = &anchor
	return &anchor, nil
}
func (s *memoryKycStore) RefreshKycProfile(ctx context.Context, profileID string, req models.KycProviderResultRequest, anchor models.KycProfile) (*models.KycProfile, error) {
	s.profile = &anchor
	return &anchor, nil
}
func (s *memoryKycStore) GetKycProfile(ctx context.Context, profileID string) (*models.KycProfile, error) {
	return s.profile, nil
}
func (s *memoryKycStore) ListKycProviderChecks(ctx context.Context, profileID string) ([]*models.KycProviderCheck, error) {
	return nil, nil
}
func (s *memoryKycStore) ListKycAuditEvents(ctx context.Context, profileID string) ([]*models.KycAuditEvent, error) {
	return nil, nil
}

func TestSubmitKycProfileStoresRawOffChainAndAnchorsOnlyHashOnLedger(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")

	req := models.KycProfileRequest{
		SubjectType:    models.KycRetailCustomer,
		SubjectID:      "cust-1",
		LegalName:      "Alice Customer",
		DocumentType:   "ktp",
		DocumentNumber: "1234567890",
	}
	profile, err := svc.SubmitKycProfile(req)
	if err != nil {
		t.Fatalf("submit kyc: %v", err)
	}

	if store.rawName != "Alice Customer" {
		t.Fatalf("raw KYC was not sent to off-chain store")
	}
	if contract.submittedName != "SubmitKycProfile" {
		t.Fatalf("submitted %q", contract.submittedName)
	}
	if len(contract.submittedArgs) != 4 {
		t.Fatalf("ledger args = %v, want 4 sanitized args", contract.submittedArgs)
	}
	if contract.submittedArgs[2] == "1234567890" || contract.submittedArgs[2] == "Alice Customer" {
		t.Fatalf("ledger args contain raw KYC: %v", contract.submittedArgs)
	}
	if profile.ProfileID == "" || len(profile.DocumentHashes) != 1 {
		t.Fatalf("profile anchor not populated: %+v", profile)
	}
}
