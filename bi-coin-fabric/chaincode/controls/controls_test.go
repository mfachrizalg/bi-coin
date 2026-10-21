package main

import (
	"bytes"
	"testing"
	"time"
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
