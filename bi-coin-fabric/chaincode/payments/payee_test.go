package main

import (
	"crypto/sha256"
	"encoding/hex"
	"strings"
	"testing"
)

func payeeHash(raw []byte) string {
	canonical, err := canonicalJSON(raw)
	if err != nil {
		panic(err)
	}
	sum := sha256.Sum256(canonical)
	return hex.EncodeToString(sum[:])
}

func TestVerifyPayee(t *testing.T) {
	const now = 1000
	active := []byte(`{"status":"active","restricted":false,"limits_set":true,"limits":{"per_transaction":100,"daily":100,"monthly":100,"holdings":1000}}`)
	pending := []byte(`{"status":"pending","restricted":false,"limits_set":true,"limits":{"holdings":1000}}`)
	unset := []byte(`{"status":"active","restricted":false,"limits_set":false,"limits":{"holdings":1000}}`)
	restrictedLater := []byte(`{"status":"active","restricted":true,"restricted_until":2000,"limits_set":true,"limits":{"holdings":1000}}`)
	restrictedExpired := []byte(`{"status":"active","restricted":true,"restricted_until":500,"limits_set":true,"limits":{"holdings":1000}}`)
	restrictedOpen := []byte(`{"status":"active","restricted":true,"limits_set":true,"limits":{"holdings":1000}}`)
	altered := []byte(strings.Replace(string(active), `"holdings":1000`, `"holdings":9999`, 1))

	tests := []struct {
		name    string
		raw     []byte
		hash    string
		balance int64
		wantErr string
	}{
		{"active within holdings", active, payeeHash(active), 1000, ""},
		{"holdings exceeded", active, payeeHash(active), 1001, "holdings limit exceeded"},
		{"record altered after hashing", altered, payeeHash(active), 500, "does not match the ledger hash"},
		{"pending status", pending, payeeHash(pending), 500, "not eligible to receive"},
		{"limits not set", unset, payeeHash(unset), 500, "not eligible to receive"},
		{"restricted until later", restrictedLater, payeeHash(restrictedLater), 500, "not eligible to receive"},
		{"restriction expired", restrictedExpired, payeeHash(restrictedExpired), 500, ""},
		{"restricted without end", restrictedOpen, payeeHash(restrictedOpen), 500, "not eligible to receive"},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			err := verifyPayee(tc.raw, tc.hash, now, tc.balance, "subject-x")
			if tc.wantErr == "" {
				if err != nil {
					t.Fatalf("unexpected error: %v", err)
				}
				return
			}
			if err == nil || !strings.Contains(err.Error(), tc.wantErr) {
				t.Fatalf("want error containing %q, got %v", tc.wantErr, err)
			}
		})
	}
}
