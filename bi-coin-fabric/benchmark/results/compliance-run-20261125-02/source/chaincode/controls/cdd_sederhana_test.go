package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"strings"
	"testing"

	"github.com/golang/protobuf/ptypes/timestamp"
	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
)

const (
	hexA = "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff"
	hexB = "ffeeddccbbaa99887766554433221100ffeeddccbbaa99887766554433221100"
)

var ctl = &ControlsContract{}

// ledger is an in-memory stub that runs the real transactions end to end.
type ledger struct {
	shim.ChaincodeStubInterface
	state, private, transient map[string][]byte
	protected                 map[string]bool
	now                       int64
}

func newLedger() *ledger {
	return &ledger{
		state: map[string][]byte{}, private: map[string][]byte{}, transient: map[string][]byte{},
		protected: map[string]bool{}, now: 1_800_000_000,
	}
}

func (l *ledger) CreateCompositeKey(objectType string, attributes []string) (string, error) {
	return objectType + ":" + strings.Join(attributes, ":"), nil
}
func (l *ledger) GetState(key string) ([]byte, error)     { return l.state[key], nil }
func (l *ledger) PutState(key string, value []byte) error { l.state[key] = value; return nil }
func (l *ledger) GetPrivateData(_, key string) ([]byte, error) {
	return l.private[key], nil
}
func (l *ledger) PutPrivateData(_, key string, value []byte) error {
	l.private[key] = value
	return nil
}
func (l *ledger) SetPrivateDataValidationParameter(_, key string, _ []byte) error {
	l.protected[key] = true
	return nil
}
func (l *ledger) GetPrivateDataValidationParameter(_, key string) ([]byte, error) {
	if l.protected[key] {
		return []byte{1}, nil
	}
	return nil, nil
}
func (l *ledger) GetTransient() (map[string][]byte, error) { return l.transient, nil }
func (l *ledger) GetTxTimestamp() (*timestamp.Timestamp, error) {
	return &timestamp.Timestamp{Seconds: l.now}, nil
}

// as returns the context of one call: the caller's MSP and raw id, and the transient payload (nil for none).
func (l *ledger) as(t *testing.T, mspID, rawID string, payload any) subjectContext {
	t.Helper()
	delete(l.transient, "payload")
	if payload != nil {
		data, err := json.Marshal(payload)
		if err != nil {
			t.Fatal(err)
		}
		l.transient["payload"] = data
	}
	return subjectContext{identity: subjectIdentity{mspID: mspID, id: rawID}, stub: l}
}

func (l *ledger) addStaff(t *testing.T, rawID, role string) {
	t.Helper()
	digest := sha256.Sum256([]byte(rawID))
	clientID := hex.EncodeToString(digest[:])
	data, err := json.Marshal(staffRecord{ClientID: clientID, Protected: true, Role: role})
	if err != nil {
		t.Fatal(err)
	}
	l.state["staff:"+clientID] = data
}

func (l *ledger) view(t *testing.T) SubjectView {
	t.Helper()
	view, err := ctl.GetSubject(l.as(t, distributorMSP, "reviewer", nil), "retail-1")
	must(t, err)
	return view
}

func (l *ledger) canReceive(t *testing.T, balanceAfter int64) bool {
	t.Helper()
	return ctl.CheckPayee(l.as(t, endUserMSP, "payer", nil), "retail-1", balanceAfter) == nil
}

func (l *ledger) canPay(t *testing.T) bool {
	t.Helper()
	ok, err := ctl.CanPay(l.as(t, distributorMSP, "reviewer", nil), "retail-1")
	must(t, err)
	return ok
}

func (l *ledger) approve(t *testing.T, approved bool) {
	t.Helper()
	must(t, ctl.ApproveSubject(l.as(t, distributorMSP, "reviewer", map[string]bool{"approved": approved}), "retail-1"))
}

func must(t *testing.T, err error) {
	t.Helper()
	if err != nil {
		t.Fatal(err)
	}
}

func mustFail(t *testing.T, err error, what string) {
	t.Helper()
	if err == nil {
		t.Fatalf("%s must be refused", what)
	}
}

// reviewedLedger runs CreatePending to RecordReview for retail-1 with the BI ceilings already set.
func reviewedLedger(t *testing.T, dttot string, lowRisk bool) *ledger {
	t.Helper()
	l := newLedger()
	l.addStaff(t, "reviewer", "kyc_reviewer")
	l.addStaff(t, "officer", "compliance_officer")
	must(t, ctl.SetCddCeilings(l.as(t, centralBankMSP, "bi", nil), 2_000_000, 20_000_000))
	must(t, ctl.CreatePending(l.as(t, endUserMSP, "user", map[string]string{"category": "retail", "salt": hexA, "documentRef": hexB}), "retail-1"))
	must(t, ctl.ProtectSubject(l.as(t, distributorMSP, "reviewer", nil), "retail-1"))
	must(t, ctl.SetLimits(l.as(t, distributorMSP, "reviewer", map[string]int64{
		"per_transaction": 1_000_000, "daily": 5_000_000, "monthly": 10_000_000, "holdings": 20_000_000,
	}), "retail-1"))
	must(t, ctl.RecordReview(l.as(t, distributorMSP, "reviewer", map[string]any{
		"dttot_result": dttot, "low_risk": lowRisk, "low_risk_reason": "capped product",
	}), "retail-1"))
	return l
}

func TestSederhanaLifecycle(t *testing.T) {
	l := reviewedLedger(t, DttotNotListed, true)
	l.approve(t, true)
	if v := l.view(t); v.Status != "active" || v.Verified || v.ApprovedAt != l.now || !v.LowRisk || v.LowRiskReason != "capped product" {
		t.Fatalf("approved subject = %+v", v)
	}

	// Unverified: holdings capped at the unverified ceiling although the reviewer limit is higher.
	if !l.canReceive(t, 2_000_000) || l.canReceive(t, 2_000_001) {
		t.Fatal("unverified subject must be capped at the unverified ceiling")
	}
	limits, err := ctl.GetLimits(l.as(t, distributorMSP, "reviewer", nil), "retail-1")
	must(t, err)
	if limits.Holdings != 2_000_000 {
		t.Fatalf("effective holdings = %d, want the unverified ceiling", limits.Holdings)
	}

	// Verification raises the ceiling to the verified value.
	mustFail(t, ctl.VerifySubject(l.as(t, distributorMSP, "reviewer", map[string]string{"evidence_ref": "not-a-hash"}), "retail-1"), "verification without a SHA-256 evidence reference")
	must(t, ctl.VerifySubject(l.as(t, distributorMSP, "reviewer", map[string]string{"evidence_ref": hexA}), "retail-1"))
	if v := l.view(t); !v.Verified || v.VerifiedAt != l.now {
		t.Fatalf("verified subject = %+v", v)
	}
	if !l.canReceive(t, 20_000_000) || l.canReceive(t, 20_000_001) {
		t.Fatal("verified subject must be capped at the verified ceiling")
	}
	mustFail(t, ctl.VerifySubject(l.as(t, distributorMSP, "reviewer", map[string]string{"evidence_ref": hexA}), "retail-1"), "a second verification")

	// A data update returns the subject to unverified.
	must(t, ctl.UpdateSubject(l.as(t, distributorMSP, "reviewer", map[string]string{"documentRef": hexB, "dttot_result": DttotNotListed}), "retail-1"))
	if v := l.view(t); v.Verified || v.Status != "active" {
		t.Fatalf("updated subject = %+v", v)
	}
	if l.canReceive(t, 2_000_001) {
		t.Fatal("an updated subject must fall back to the unverified ceiling")
	}

	// Closure is terminal and only a kyc_reviewer may close.
	mustFail(t, ctl.CloseSubject(l.as(t, distributorMSP, "officer", map[string]string{"reason": "fictitious"}), "retail-1"), "closure by a compliance officer")
	mustFail(t, ctl.CloseSubject(l.as(t, distributorMSP, "reviewer", map[string]string{"reason": "bored"}), "retail-1"), "an unknown close reason")
	must(t, ctl.CloseSubject(l.as(t, distributorMSP, "reviewer", map[string]string{"reason": "identity_doubtful"}), "retail-1"))
	if v := l.view(t); v.Status != "closed" || v.ClosedAt != l.now || v.CloseReason != "identity_doubtful" {
		t.Fatalf("closed subject = %+v", v)
	}
	if l.canReceive(t, 1) || l.canPay(t) {
		t.Fatal("a closed subject must neither pay nor receive")
	}
	mustFail(t, ctl.CloseSubject(l.as(t, distributorMSP, "reviewer", map[string]string{"reason": "fictitious"}), "retail-1"), "a second closure")
	mustFail(t, ctl.UpdateSubject(l.as(t, distributorMSP, "reviewer", map[string]string{"documentRef": hexB, "dttot_result": DttotNotListed}), "retail-1"), "an update after closure")
	mustFail(t, ctl.VerifySubject(l.as(t, distributorMSP, "reviewer", map[string]string{"evidence_ref": hexA}), "retail-1"), "verification after closure")
}

func TestApproveSubjectGate(t *testing.T) {
	cases := []struct {
		name    string
		dttot   string
		lowRisk bool
		approve bool
		want    string
	}{
		{"not listed and low risk", DttotNotListed, true, true, "active"},
		{"listed", DttotListed, true, true, "rejected"},
		{"not low risk", DttotNotListed, false, true, "rejected"},
		{"reviewer rejects", DttotNotListed, true, false, "rejected"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			l := reviewedLedger(t, tc.dttot, tc.lowRisk)
			l.approve(t, tc.approve)
			if got := l.view(t).Status; got != tc.want {
				t.Fatalf("status = %s, want %s", got, tc.want)
			}
			if tc.want == "rejected" && (l.canReceive(t, 1) || l.canPay(t)) {
				t.Fatal("a rejected subject must neither pay nor receive")
			}
		})
	}

	t.Run("ceilings unset", func(t *testing.T) {
		l := reviewedLedger(t, DttotNotListed, true)
		delete(l.state, cddCeilingsKey)
		mustFail(t, ctl.ApproveSubject(l.as(t, distributorMSP, "reviewer", map[string]bool{"approved": true}), "retail-1"), "approval without BI ceilings")
	})
}

func TestRecordReviewValidatesEvidence(t *testing.T) {
	cases := []struct {
		name    string
		payload map[string]any
	}{
		{"unknown DTTOT result", map[string]any{"dttot_result": "maybe", "low_risk": true, "low_risk_reason": "capped product"}},
		{"low risk without a reason", map[string]any{"dttot_result": DttotNotListed, "low_risk": true, "low_risk_reason": " "}},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			l := newLedger()
			l.addStaff(t, "reviewer", "kyc_reviewer")
			must(t, ctl.CreatePending(l.as(t, endUserMSP, "user", map[string]string{"category": "retail", "salt": hexA, "documentRef": hexB}), "retail-1"))
			must(t, ctl.ProtectSubject(l.as(t, distributorMSP, "reviewer", nil), "retail-1"))
			mustFail(t, ctl.RecordReview(l.as(t, distributorMSP, "reviewer", tc.payload), "retail-1"), tc.name)
		})
	}
}

func TestRevokeLowRiskEndsEligibility(t *testing.T) {
	l := reviewedLedger(t, DttotNotListed, true)
	l.approve(t, true)
	mustFail(t, ctl.RevokeLowRisk(l.as(t, distributorMSP, "reviewer", nil), "retail-1"), "revocation by a kyc_reviewer")
	must(t, ctl.RevokeLowRisk(l.as(t, distributorMSP, "officer", nil), "retail-1"))
	if v := l.view(t); v.Status != "active" || v.LowRisk {
		t.Fatalf("revoked subject = %+v", v)
	}
	if l.canReceive(t, 1) || l.canPay(t) {
		t.Fatal("a subject outside CDD Sederhana must neither pay nor receive")
	}
	_, err := ctl.GetLimits(l.as(t, distributorMSP, "reviewer", nil), "retail-1")
	mustFail(t, err, "limits for a subject outside CDD Sederhana")
	mustFail(t, ctl.RevokeLowRisk(l.as(t, distributorMSP, "officer", nil), "retail-1"), "a second revocation")
}

func TestUpdateSubjectWithListedResultRestrictsAsDTTOT(t *testing.T) {
	l := reviewedLedger(t, DttotNotListed, true)
	l.approve(t, true)
	must(t, ctl.UpdateSubject(l.as(t, distributorMSP, "reviewer", map[string]string{"documentRef": hexB, "dttot_result": DttotListed}), "retail-1"))
	if v := l.view(t); !v.Restricted || v.RestrictionReason != RestrictionReasonDTTOT {
		t.Fatalf("listed subject = %+v", v)
	}
	if l.canReceive(t, 1) || l.canPay(t) {
		t.Fatal("a DTTOT-restricted subject must neither pay nor receive")
	}
}

func TestCddCeilingsAndLimits(t *testing.T) {
	l := newLedger()
	l.addStaff(t, "reviewer", "kyc_reviewer")
	_, err := ctl.GetCddCeilings(l.as(t, distributorMSP, "reviewer", nil))
	mustFail(t, err, "reading unset ceilings")
	mustFail(t, ctl.SetCddCeilings(l.as(t, distributorMSP, "reviewer", nil), 2_000_000, 20_000_000), "ceilings set by a non-central-bank caller")
	mustFail(t, ctl.SetCddCeilings(l.as(t, centralBankMSP, "bi", nil), 20_000_000, 2_000_000), "an unverified ceiling above the verified one")
	mustFail(t, ctl.SetCddCeilings(l.as(t, centralBankMSP, "bi", nil), 0, 2_000_000), "a zero ceiling")

	l = reviewedLedger(t, DttotNotListed, true)
	ceilings, err := ctl.GetCddCeilings(l.as(t, endUserMSP, "anyone", nil))
	must(t, err)
	if ceilings.UnverifiedHoldings != 2_000_000 || ceilings.VerifiedHoldings != 20_000_000 {
		t.Fatalf("ceilings = %+v", ceilings)
	}
	over := map[string]int64{"per_transaction": 1_000_000, "daily": 5_000_000, "monthly": 10_000_000, "holdings": 20_000_001}
	mustFail(t, ctl.SetLimits(l.as(t, distributorMSP, "reviewer", over), "retail-1"), "holdings above the verified ceiling")

	// An active subject may have its limits changed; the unverified ceiling still caps what it can hold.
	l.approve(t, true)
	lower := map[string]int64{"per_transaction": 100_000, "daily": 500_000, "monthly": 1_000_000, "holdings": 1_500_000}
	must(t, ctl.SetLimits(l.as(t, distributorMSP, "reviewer", lower), "retail-1"))
	limits, err := ctl.GetLimits(l.as(t, distributorMSP, "reviewer", nil), "retail-1")
	must(t, err)
	if limits.Holdings != 1_500_000 {
		t.Fatalf("effective holdings = %d, want the lower reviewer limit", limits.Holdings)
	}
}

func TestOnlyRetailSubjectsAreAccepted(t *testing.T) {
	for _, category := range []string{"merchant", "business", ""} {
		l := newLedger()
		payload := map[string]string{"category": category, "salt": hexA, "documentRef": hexB}
		mustFail(t, ctl.CreatePending(l.as(t, endUserMSP, "user", payload), "subject-1"), "category "+category)
	}
}
