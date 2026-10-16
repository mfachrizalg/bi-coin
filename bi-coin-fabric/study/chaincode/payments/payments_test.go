package main

import (
	"math"
	"testing"
)

func TestCheckedAddRejectsOverflow(t *testing.T) {
	if _, err := checkedAdd(math.MaxInt64, 1); err == nil {
		t.Fatal("checkedAdd must reject overflow")
	}
}

func TestCheckedSubRejectsInsufficientBalance(t *testing.T) {
	if _, err := checkedSub(3, 4); err == nil {
		t.Fatal("checkedSub must reject insufficient balance")
	}
}
