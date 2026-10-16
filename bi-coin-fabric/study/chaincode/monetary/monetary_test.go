package main

import (
	"math"
	"testing"
)

func TestCheckedAdd(t *testing.T) {
	if got, err := checkedAdd(10, 5); err != nil || got != 15 {
		t.Fatalf("checkedAdd(10, 5) = %d, %v", got, err)
	}
	if _, err := checkedAdd(math.MaxInt64, 1); err == nil {
		t.Fatal("checkedAdd must reject overflow")
	}
}

func TestCheckedSub(t *testing.T) {
	if got, err := checkedSub(10, 5); err != nil || got != 5 {
		t.Fatalf("checkedSub(10, 5) = %d, %v", got, err)
	}
	if _, err := checkedSub(4, 5); err == nil {
		t.Fatal("checkedSub must reject insufficient balance")
	}
}

func TestFunctionMatchesTopLevelName(t *testing.T) {
	for _, actual := range []string{"FundFromReserve", "PaymentsContract:FundFromReserve"} {
		if !functionMatches(actual, "FundFromReserve") {
			t.Errorf("functionMatches(%q) = false", actual)
		}
	}
	if functionMatches("DebitReserveForFunding", "FundFromReserve") {
		t.Fatal("internal operation must not pass the top-level function check")
	}
}
