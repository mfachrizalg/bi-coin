package services

import (
	"context"
	"errors"
	"reflect"
	"strings"
	"testing"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
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
	if !store.kycAnchored {
		t.Fatal("KYC decision was not marked anchored after ledger success")
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
	if f.submitResult == nil && name == "DistributeToParticipant" {
		return []byte(`{"status":"settled","tx_id":"tx-distribution","reference_id":"` + args[3] + `","amount":900000}`), f.submitErr
	}
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
	retailCustomers      []*models.RetailCustomer
	createdQrisIntent    *models.QrisIntent
	qrisIntent           *models.QrisIntent
	markPaidIntentID     string
	markPaidTxID         string
	kycAnchored          bool
	cancelledIntentID    string
	createErr            error
	submitErr            error
	refreshErr           error
	getErr               error
	markPaidErr          error
}

func (s *memoryKycStore) CreateRetailCustomer(ctx context.Context, req models.RetailCustomerRequest, identityHash string, custodianMSPID string) (*models.RetailCustomer, error) {
	s.createRetailCustomer = req
	s.createIdentityHash = identityHash
	if s.createErr != nil {
		return nil, s.createErr
	}
	return &models.RetailCustomer{CustomerID: req.CustomerID, IdentityHash: identityHash, WalletAccountID: req.WalletAccountID, CustodianMSPID: custodianMSPID}, nil
}
func (s *memoryKycStore) ListRetailCustomers(ctx context.Context, custodianMSPID string) ([]*models.RetailCustomer, error) {
	if custodianMSPID == "" {
		return s.retailCustomers, nil
	}
	filtered := make([]*models.RetailCustomer, 0, len(s.retailCustomers))
	for _, customer := range s.retailCustomers {
		if customer.CustodianMSPID == custodianMSPID {
			filtered = append(filtered, customer)
		}
	}
	return filtered, nil
}
func (s *memoryKycStore) SubmitKycProfile(ctx context.Context, req models.KycProfileRequest, anchor models.KycProfile, custodianMSPID string) (*models.KycProfile, error) {
	if s.submitErr != nil {
		return nil, s.submitErr
	}
	s.rawName = req.LegalName
	anchor.CustodianMSPID = custodianMSPID
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
func (s *memoryKycStore) MarkKycAnchored(ctx context.Context, profileID string) error {
	s.kycAnchored = true
	return nil
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

func (s *memoryKycStore) MarkQrisIntentPaid(ctx context.Context, intentID string, txID string, payerWalletID string) (bool, error) {
	if s.markPaidErr != nil {
		return false, s.markPaidErr
	}
	s.markPaidIntentID = intentID
	s.markPaidTxID = txID
	if s.qrisIntent != nil && s.qrisIntent.IntentID == intentID {
		s.qrisIntent.Status = models.QrisStatusPaid
		s.qrisIntent.PaidByWalletID = payerWalletID
		s.qrisIntent.TxID = txID
	}
	return true, nil
}

func (s *memoryKycStore) MarkQrisIntentExpired(ctx context.Context, intentID string) (bool, error) {
	if s.qrisIntent != nil && s.qrisIntent.IntentID == intentID {
		s.qrisIntent.Status = models.QrisStatusExpired
		return true, nil
	}
	return false, nil
}

func (s *memoryKycStore) CancelQrisIntent(ctx context.Context, intentID string) (bool, error) {
	s.cancelledIntentID = intentID
	if s.qrisIntent != nil && s.qrisIntent.IntentID == intentID {
		s.qrisIntent.Status = models.QrisStatusCancelled
		return true, nil
	}
	return false, nil
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
	if err == nil || err.Error() != "failed to persist KYC profile: postgres unavailable" {
		t.Fatalf("submit kyc err = %v, want wrapped off-chain error", err)
	}
	if contract.submittedName != "" {
		t.Fatalf("submitted %q despite off-chain persistence failure", contract.submittedName)
	}
}

func TestSubmitKycProfileLeavesPendingRecordWhenLedgerFails(t *testing.T) {
	contract := &fakeLedgerContract{submitErr: errors.New("fabric unavailable")}
	store := &memoryKycStore{}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")

	_, err := svc.SubmitKycProfile(models.KycProfileRequest{
		SubjectType:    models.KycRetailCustomer,
		SubjectID:      "cust-2",
		LegalName:      "Bob Customer",
		DocumentType:   "ktp",
		DocumentNumber: "1234567890",
	})
	if err == nil || !strings.Contains(err.Error(), "pending off-chain record is retryable") {
		t.Fatalf("submit kyc err = %v, want retryable pending error", err)
	}
	if store.profile == nil || store.kycAnchored {
		t.Fatalf("pending KYC record = %+v anchored=%t, want unanchored record", store.profile, store.kycAnchored)
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

func TestGetKycProfileRejectsForeignCustodian(t *testing.T) {
	store := &memoryKycStore{profile: &models.KycProfile{ProfileID: "kyc-1", CustodianMSPID: "PJP-B"}}
	svc := NewLedgerServiceForTest(&fakeLedgerContract{}, store, "hash-secret")
	svc.principal = Principal{Role: middleware.RoleBankPjp, CustodianMSPID: "PJP-A"}

	_, err := svc.GetKycProfile("kyc-1")
	if err == nil || err.Error() != "resource is outside custodian scope" {
		t.Fatalf("GetKycProfile err = %v, want custodian scope rejection", err)
	}
}

func TestCreateWalletUsesOwnerIDAndReadsBackWallet(t *testing.T) {
	contract := &fakeLedgerContract{
		evaluateResult: []byte(`{"wallet_id":"wlt_alice","owner_id":"alice","participant_id":"bank-a","tier":"silver"}`),
	}
	svc := NewLedgerServiceForTest(contract, nil, "hash-secret")

	wallet, err := svc.CreateWallet(models.CreateWalletRequest{OwnerID: "alice"})
	if err != nil {
		t.Fatalf("CreateWallet err = %v", err)
	}
	if contract.submittedName != "CreateWallet" || !reflect.DeepEqual(contract.submittedArgs, []string{"wlt_alice", "alice", ""}) {
		t.Fatalf("CreateWallet submission = %s %v", contract.submittedName, contract.submittedArgs)
	}
	if contract.evaluatedName != "GetWallet" || !reflect.DeepEqual(contract.evaluatedArgs, []string{"wlt_alice"}) {
		t.Fatalf("CreateWallet follow-up read = %s %v", contract.evaluatedName, contract.evaluatedArgs)
	}
	if wallet.OwnerID != "alice" || wallet.WalletID != "wlt_alice" {
		t.Fatalf("wallet = %+v", wallet)
	}
}

func TestRefreshKycProfileStopsBeforeLedgerWhenSourceReadFails(t *testing.T) {
	contract := &fakeLedgerContract{}
	store := &memoryKycStore{getErr: errors.New("profile read failed")}
	svc := NewLedgerServiceForTest(contract, store, "hash-secret")

	_, err := svc.RefreshKycProfile("kyc-1", models.KycProviderResultRequest{
		Status:            models.KycApproved,
		RiskLevel:         models.RiskLow,
		DueDiligenceLevel: models.DueDiligenceSimplified,
	})
	if err == nil || err.Error() != "failed to load KYC profile: profile read failed" {
		t.Fatalf("refresh err = %v", err)
	}
	if contract.submittedName != "" {
		t.Fatalf("source read failure still reached ledger: %s %v", contract.submittedName, contract.submittedArgs)
	}
}
