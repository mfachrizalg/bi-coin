package main

import (
	"bytes"
	"testing"
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
