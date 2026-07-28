package services

import (
	"context"
	"errors"
	"reflect"
	"testing"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

type fakeLedgerContract struct {
	submittedName  string
	submittedArgs  []string
	submitResult   []byte
	submitErr      error
	evaluatedName  string
	evaluatedArgs  []string
	evaluateResult []byte
	evaluateErr    error
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
	return f.submitResult, f.submitErr
}

func (f *fakeLedgerContract) EvaluateTransaction(name string, args ...string) ([]byte, error) {
	f.evaluatedName = name
	f.evaluatedArgs = args
	return f.evaluateResult, f.evaluateErr
}

type memoryKycStore struct {
	profile              *models.KycProfile
	rawName              string
	createRetailCustomer models.RetailCustomerRequest
	createIdentityHash   string
	createdQrisIntent    *models.QrisIntent
	qrisIntent           *models.QrisIntent
	markPaidIntentID     string
	markPaidTxID         string
	cancelledIntentID    string
	createErr            error
	submitErr            error
	refreshErr           error
	getErr               error
}

func (s *memoryKycStore) CreateRetailCustomer(ctx context.Context, req models.RetailCustomerRequest, identityHash string) (*models.RetailCustomer, error) {
	s.createRetailCustomer = req
	s.createIdentityHash = identityHash
	if s.createErr != nil {
		return nil, s.createErr
	}
	return &models.RetailCustomer{CustomerID: req.CustomerID, IdentityHash: identityHash, WalletAccountID: req.WalletAccountID}, nil
}
func (s *memoryKycStore) ListRetailCustomers(ctx context.Context) ([]*models.RetailCustomer, error) {
	return nil, nil
}
func (s *memoryKycStore) SubmitKycProfile(ctx context.Context, req models.KycProfileRequest, anchor models.KycProfile) (*models.KycProfile, error) {
	if s.submitErr != nil {
		return nil, s.submitErr
	}
	s.rawName = req.LegalName
	s.profile = &anchor
	return &anchor, nil
}
func (s *memoryKycStore) RefreshKycProfile(ctx context.Context, profileID string, req models.KycProviderResultRequest, anchor models.KycProfile) (*models.KycProfile, error) {
	if s.refreshErr != nil {
		return nil, s.refreshErr
	}
	s.profile = &anchor
	return &anchor, nil
}
func (s *memoryKycStore) GetKycProfile(ctx context.Context, profileID string) (*models.KycProfile, error) {
	if s.getErr != nil {
		return nil, s.getErr
	}
	return s.profile, nil
}
func (s *memoryKycStore) ListKycProviderChecks(ctx context.Context, profileID string) ([]*models.KycProviderCheck, error) {
	return nil, nil
}
func (s *memoryKycStore) ListKycAuditEvents(ctx context.Context, profileID string) ([]*models.KycAuditEvent, error) {
	return nil, nil
}

func (s *memoryKycStore) CreateQrisIntent(ctx context.Context, intent models.QrisIntent) (*models.QrisIntent, error) {
	s.createdQrisIntent = &intent
	s.qrisIntent = &intent
	return &intent, nil
}

func (s *memoryKycStore) GetQrisIntent(ctx context.Context, intentID string) (*models.QrisIntent, error) {
	if s.qrisIntent == nil {
		return nil, errors.New("qris intent not found")
	}
	return s.qrisIntent, nil
}

func (s *memoryKycStore) ListQrisIntents(ctx context.Context, merchantID string) ([]*models.QrisIntent, error) {
	if s.qrisIntent == nil {
		return nil, nil
	}
	return []*models.QrisIntent{s.qrisIntent}, nil
}

func (s *memoryKycStore) MarkQrisIntentPaid(ctx context.Context, intentID string, txID string, payerWalletID string) error {
	s.markPaidIntentID = intentID
	s.markPaidTxID = txID
	if s.qrisIntent != nil && s.qrisIntent.IntentID == intentID {
		s.qrisIntent.Status = models.QrisStatusPaid
		s.qrisIntent.PaidByWalletID = payerWalletID
	}
	return nil
}

func (s *memoryKycStore) MarkQrisIntentExpired(ctx context.Context, intentID string) error {
	if s.qrisIntent != nil && s.qrisIntent.IntentID == intentID {
		s.qrisIntent.Status = models.QrisStatusExpired
	}
	return nil
}

func (s *memoryKycStore) CancelQrisIntent(ctx context.Context, intentID string) error {
	s.cancelledIntentID = intentID
	if s.qrisIntent != nil && s.qrisIntent.IntentID == intentID {
		s.qrisIntent.Status = models.QrisStatusCancelled
	}
	return nil
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

func TestSubmitKycProfilePropagatesOffChainStoreFailure(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{submitErr: errors.New("postgres unavailable")}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")

	_, err := svc.SubmitKycProfile(models.KycProfileRequest{
		SubjectType:    models.KycRetailCustomer,
		SubjectID:      "cust-1",
		LegalName:      "Alice Customer",
		DocumentType:   "ktp",
		DocumentNumber: "1234567890",
	})
	if err == nil || err.Error() != "off-chain SubmitKycProfile: postgres unavailable" {
		t.Fatalf("submit kyc err = %v, want wrapped off-chain error", err)
	}
	if contract.submittedName != "SubmitKycProfile" {
		t.Fatalf("submitted %q, want SubmitKycProfile before store failure", contract.submittedName)
	}
}

func TestRefreshKycProfileUsesStoredDocumentHashesWhenProviderOmitsThem(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{profile: &models.KycProfile{
		ProfileID:      "kyc-1",
		DocumentHashes: []string{"sha256:existing"},
	}}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")

	_, err := svc.RefreshKycProfile("kyc-1", models.KycProviderResultRequest{
		Status:            models.KycApproved,
		RiskLevel:         models.RiskLow,
		DueDiligenceLevel: models.DueDiligenceSimplified,
	})
	if err != nil {
		t.Fatalf("refresh KYC: %v", err)
	}
	want := []string{"kyc-1", "approved", "low", "simplified", "false", `["sha256:existing"]`, ""}
	if contract.submittedName != "RefreshKycProfile" || !reflect.DeepEqual(contract.submittedArgs, want) {
		t.Fatalf("ledger call = %s %v, want RefreshKycProfile %v", contract.submittedName, contract.submittedArgs, want)
	}
	if store.profile == nil || !reflect.DeepEqual(store.profile.DocumentHashes, []string{"sha256:existing"}) {
		t.Fatalf("refreshed anchor hashes = %+v, want stored hashes", store.profile)
	}
}
