package models

import (
	"encoding/json"
	"math"
	"strings"
	"testing"
)

func TestMoneyResponsesSerializeMaxInt64AsDecimalStrings(t *testing.T) {
	for name, value := range map[string]interface{}{
		"wallet":  Wallet{Balance: math.MaxInt64},
		"metrics": MetricsReport{TotalSupply: math.MaxInt64},
	} {
		encoded, err := json.Marshal(value)
		if err != nil {
			t.Fatalf("marshal %s: %v", name, err)
		}
		if !strings.Contains(string(encoded), `"balance":"9223372036854775807"`) && !strings.Contains(string(encoded), `"total_supply":"9223372036854775807"`) {
			t.Fatalf("%s JSON = %s, want decimal-string MaxInt64", name, encoded)
		}
	}
}

func TestTransferReceiptUnmarshalsDecimalStringAmounts(t *testing.T) {
	var receipt TransferResult
	if err := json.Unmarshal([]byte(`{"status":"settled","tx_id":"tx-1","reference_id":"ref-1","sender_id":"wlt-a","receiver_id":"wlt-b","amount":"35000"}`), &receipt); err != nil {
		t.Fatalf("unmarshal transfer receipt: %v", err)
	}
	if receipt.Amount != 35000 || receipt.TxID != "tx-1" || receipt.ReferenceID != "ref-1" {
		t.Fatalf("receipt = %+v, want string amount decoded to int64", receipt)
	}
}

func TestMetricsProjectionMapsChaincodeCountersToRestNames(t *testing.T) {
	var metrics MetricsReport
	if err := json.Unmarshal([]byte(`{"total_transactions":15,"active_participants":6,"active_wallets":90,"total_supply":"21050000","generated_at":"2026-09-10T09:30:00Z"}`), &metrics); err != nil {
		t.Fatalf("unmarshal metrics: %v", err)
	}
	if metrics.TotalTransfers != 15 || metrics.TotalParticipants != 6 || metrics.ActiveWallets != 90 || metrics.TotalSupply != 21050000 {
		t.Fatalf("metrics = %+v, want projected counters", metrics)
	}
	encoded, err := json.Marshal(metrics)
	if err != nil {
		t.Fatalf("marshal metrics: %v", err)
	}
	if !strings.Contains(string(encoded), `"total_transfers":15`) || !strings.Contains(string(encoded), `"total_participants":6`) {
		t.Fatalf("metrics JSON = %s, want REST field names", encoded)
	}
}

func TestWalletUnmarshalsDecimalStringMoneyFields(t *testing.T) {
	var wallet Wallet
	if err := json.Unmarshal([]byte(`{"wallet_id":"wlt-1","balance":"1000","daily_spent":5,"monthly_spent":"7","monthly_received":"9"}`), &wallet); err != nil {
		t.Fatalf("unmarshal wallet: %v", err)
	}
	if wallet.Balance != 1000 || wallet.DailySpent != 5 || wallet.MonthlySpent != 7 || wallet.MonthlyReceived != 9 {
		t.Fatalf("wallet = %+v, want decimal-string money fields decoded", wallet)
	}
}
