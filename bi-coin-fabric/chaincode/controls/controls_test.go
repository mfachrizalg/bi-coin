package main

import (
	"bytes"
	"encoding/json"
	"strings"
	"testing"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/v2/pkg/cid"
	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

func TestControlPolicyUsesOnlyTheTwoEffectiveControlMSPs(t *testing.T) {
	policy, err := controlPolicy()
	if err != nil {
		t.Fatal(err)
	}
	for _, msp := range []string{centralBankMSP, distributorMSP} {
		if !bytes.Contains(policy, []byte(msp)) {
			t.Errorf("control policy does not contain %s", msp)
		}
	}
	for _, msp := range []string{endUserMSP, validatorMSP} {
		if bytes.Contains(policy, []byte(msp)) {
			t.Errorf("control policy unexpectedly contains %s", msp)
		}
	}
}

func TestValidLimits(t *testing.T) {
	cases := []struct {
		name                        string
		perTx, daily, monthly, hold int64
		valid                       bool
	}{
		{name: "ordered positive limits", perTx: 10, daily: 20, monthly: 40, hold: 50, valid: true},
		{name: "zero transaction limit", perTx: 0, daily: 20, monthly: 40, hold: 50},
		{name: "daily below transaction", perTx: 20, daily: 10, monthly: 40, hold: 50},
		{name: "monthly below daily", perTx: 10, daily: 20, monthly: 15, hold: 50},
		{name: "zero holdings", perTx: 10, daily: 20, monthly: 40, hold: 0},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := validLimits(tc.perTx, tc.daily, tc.monthly, tc.hold); got != tc.valid {
				t.Fatalf("validLimits() = %t, want %t", got, tc.valid)
			}
		})
	}
}

func TestRestrictionReasonCodes(t *testing.T) {
	for _, reason := range []string{
		RestrictionReasonDTTOT,
		RestrictionReasonAuthorityOrder,
		RestrictionReasonInternalReview,
	} {
		if !oneOf(reason, RestrictionReasonDTTOT, RestrictionReasonAuthorityOrder, RestrictionReasonInternalReview) {
			t.Errorf("restriction reason %q was rejected", reason)
		}
	}
	for _, reason := range []string{"", "other", "DTTOT"} {
		if oneOf(reason, RestrictionReasonDTTOT, RestrictionReasonAuthorityOrder, RestrictionReasonInternalReview) {
			t.Errorf("unsupported restriction reason %q was accepted", reason)
		}
	}
}

func TestRestrictionPeriodsStayWithinLegalMaximum(t *testing.T) {
	if got := restrictionPeriods[RestrictionReasonInternalReview]; got != 5*24*time.Hour {
		t.Errorf("internal review period = %s, want 5 days", got)
	}
	if got := restrictionPeriods[RestrictionReasonAuthorityOrder]; got != 30*24*time.Hour {
		t.Errorf("authority order period = %s, want 30 days", got)
	}
	if _, limited := restrictionPeriods[RestrictionReasonDTTOT]; limited {
		t.Error("a DTTOT restriction must last until it is lifted")
	}
}

func TestRestrictedAtExpiry(t *testing.T) {
	start := time.Date(2026, 10, 21, 0, 0, 0, 0, time.UTC)
	until := start.Add(5 * 24 * time.Hour).Unix()
	held := subjectRecord{Restricted: true, RestrictedUntil: until}
	if !restrictedAt(held, start) {
		t.Error("restriction must apply before its end")
	}
	if restrictedAt(held, time.Unix(until, 0)) {
		t.Error("restriction must lapse at its end")
	}
	if !restrictedAt(subjectRecord{Restricted: true}, start.AddDate(1, 0, 0)) {
		t.Error("a restriction without an end must stay until lifted")
	}
	if restrictedAt(subjectRecord{}, start) {
		t.Error("an unrestricted subject must not be restricted")
	}
}

func TestValidCreatePayloadRequiresSaltAndDocumentRef(t *testing.T) {
	const validHex = "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff"
	if err := validCreatePayload("retail", validHex, validHex); err != nil {
		t.Fatalf("valid payload rejected: %v", err)
	}
	if err := validCreatePayload("retail", "", validHex); err == nil {
		t.Fatal("empty salt accepted")
	}
	if err := validCreatePayload("retail", validHex, "not-hex"); err == nil {
		t.Fatal("non-hex documentRef accepted")
	}
	if err := validCreatePayload("bank", validHex, validHex); err == nil {
		t.Fatal("unsupported category accepted")
	}
}

type subjectIdentity struct {
	cid.ClientIdentity
	mspID string
	id    string
}

func (f subjectIdentity) GetMSPID() (string, error) { return f.mspID, nil }

func (f subjectIdentity) GetID() (string, error) { return f.id, nil }

// subjectStub serves one private record. A nil record models a peer that holds no data for the subject.
type subjectStub struct {
	shim.ChaincodeStubInterface
	record []byte
}

func (s subjectStub) CreateCompositeKey(objectType string, attributes []string) (string, error) {
	return objectType + ":" + strings.Join(attributes, ":"), nil
}

func (s subjectStub) GetPrivateData(collection string, key string) ([]byte, error) {
	return s.record, nil
}

type subjectContext struct {
	contractapi.TransactionContextInterface
	identity cid.ClientIdentity
	stub     shim.ChaincodeStubInterface
}

func (f subjectContext) GetClientIdentity() cid.ClientIdentity { return f.identity }

func (f subjectContext) GetStub() shim.ChaincodeStubInterface { return f.stub }

func TestGetSubjectDenialIsAccessErrorNotSchemaError(t *testing.T) {
	record, err := json.Marshal(subjectRecord{SubjectID: "retail-1", Category: "retail", ApplicantID: "applicant", Status: "active"})
	if err != nil {
		t.Fatal(err)
	}
	cases := []struct {
		name     string
		identity subjectIdentity
		record   []byte
		wantErr  string
	}{
		{"non-member who did not apply is denied", subjectIdentity{mspID: endUserMSP, id: "enduser-admin"}, record, "access denied for subject retail-1"},
		{"non-member peer without the record", subjectIdentity{mspID: endUserMSP, id: "enduser-admin"}, nil, "subject not found"},
		{"member reads the record", subjectIdentity{mspID: distributorMSP, id: "distributor-admin"}, record, ""},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ctx := subjectContext{identity: tc.identity, stub: subjectStub{record: tc.record}}
			view, err := (&ControlsContract{}).GetSubject(ctx, "retail-1")
			switch {
			case tc.wantErr == "" && err != nil:
				t.Fatalf("unexpected error: %v", err)
			case tc.wantErr != "" && (err == nil || err.Error() != tc.wantErr):
				t.Fatalf("error = %v, want %q", err, tc.wantErr)
			}
			data, err := json.Marshal(view)
			if err != nil {
				t.Fatal(err)
			}
			if !bytes.Contains(data, []byte(`"representatives":[]`)) || !bytes.Contains(data, []byte(`"beneficial_owner_refs":[]`)) {
				t.Errorf("returned view must serialize its lists as arrays, got %s", data)
			}
		})
	}
}
