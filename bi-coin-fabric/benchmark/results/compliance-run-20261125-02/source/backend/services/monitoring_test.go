package services

import (
	"encoding/json"
	"errors"
	"reflect"
	"strconv"
	"strings"
	"testing"

	"github.com/hyperledger/fabric-gateway/pkg/client"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
)

func TestRuleR1AsksVerificationNearTheUnverifiedCeiling(t *testing.T) {
	const ceiling = 2_000_000
	tests := []struct {
		name     string
		balance  int64
		verified bool
		want     bool
	}{
		{"below 80 percent", 1_599_999, false, false},
		{"exactly 80 percent", 1_600_000, false, true},
		{"at the ceiling", ceiling, false, true},
		{"verified subject is never asked again", ceiling, true, false},
		{"empty wallet", 0, false, false},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := ruleR1(test.balance, ceiling, test.verified, 80); got != test.want {
				t.Fatalf("ruleR1(%d, verified=%t) = %t, want %t", test.balance, test.verified, got, test.want)
			}
		})
	}
	if ruleR1(1_000_000, 0, false, 80) {
		t.Fatal("an unset ceiling must not raise an alert")
	}
}

func TestRuleR2FlagsMoreThanTheVelocityLimit(t *testing.T) {
	if ruleR2(10, 10) {
		t.Fatal("exactly the limit is not above it")
	}
	if !ruleR2(11, 10) {
		t.Fatal("11 transfers must exceed a limit of 10")
	}
	if ruleR2(0, 10) {
		t.Fatal("no transfers must not alert")
	}
}

func TestRuleR3FlagsTransfersJustBelowThePerTransactionLimit(t *testing.T) {
	const limit = 1_000_000
	tests := []struct {
		name    string
		amounts []int64
		want    bool
	}{
		{"three at 95 percent", []int64{950_000, 950_000, 950_000}, true},
		{"three on the band edge and the limit", []int64{900_000, 1_000_000, 999_999}, true},
		{"two near the limit only", []int64{950_000, 960_000}, false},
		{"three just outside the band", []int64{899_999, 899_999, 899_999}, false},
		{"near amounts mixed with small ones", []int64{950_000, 100_000, 950_000, 50_000, 980_000}, true},
		{"above the limit is not structuring", []int64{1_000_001, 1_100_000, 1_200_000}, false},
		{"no transfers", nil, false},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := ruleR3(test.amounts, limit, 10, 3); got != test.want {
				t.Fatalf("ruleR3(%v) = %t, want %t", test.amounts, got, test.want)
			}
		})
	}
	if ruleR3([]int64{1, 1, 1}, 0, 10, 3) {
		t.Fatal("a subject without a per-transaction limit must not alert")
	}
}

type fakeContract struct{ results map[string]string }

func (fakeContract) Submit(string, ...client.ProposalOption) ([]byte, error) {
	return nil, errors.New("the monitor never submits")
}

func (f fakeContract) EvaluateTransaction(name string, args ...string) ([]byte, error) {
	return []byte(f.results[strings.Join(append([]string{name}, args...), "/")]), nil
}

func transferEvent(id string, from string, to string, amount int64) *client.ChaincodeEvent {
	payload, _ := json.Marshal(map[string]any{"reference": id, "from": from, "to": to, "amount": amount, "kind": "transfer"})
	return &client.ChaincodeEvent{EventName: "TransferReceived", TransactionID: id, Payload: payload}
}

// TestMonitorRaisesAlertsFromEvents needs the scratch database of TestStoreCDDSederhanaTables.
func TestMonitorRaisesAlertsFromEvents(t *testing.T) {
	store, ctx := openScratchStore(t)
	ledger := &StudyLedgerService{
		identities: map[string]config.FabricStudyIdentity{"officer": {MSPID: monitorMSP}},
		contracts: map[string]map[string]FabricContract{"officer": {studyControlsChaincode: fakeContract{results: map[string]string{
			"GetCddCeilings":       `{"unverified_holdings":2000000,"verified_holdings":20000000}`,
			"GetSubject/payer":     `{"verified":false,"limits":{"per_transaction":1000000}}`,
			"GetSubject/payee":     `{"verified":false,"limits":{"per_transaction":1000000}}`,
			"GetSubject/regulated": `{"verified":true,"limits":{"per_transaction":1000000}}`,
		}}}},
	}
	monitor, err := NewTransferMonitor(store, ledger, MonitorThresholds{UnverifiedAlertPercent: 80, VelocityMaxTransfers: 10, StructuringMinTransfers: 3, StructuringBandPercent: 10})
	if err != nil || monitor.username != "officer" {
		t.Fatalf("monitor = %+v, %v", monitor, err)
	}
	handle := func(event *client.ChaincodeEvent) {
		t.Helper()
		if err := monitor.handle(ctx, event); err != nil {
			t.Fatal(err)
		}
	}
	rules := func() map[string]int {
		t.Helper()
		alerts, err := store.ListMonitoringAlerts(ctx)
		if err != nil {
			t.Fatal(err)
		}
		hits := map[string]int{}
		for _, alert := range alerts {
			hits[alert.SubjectID+" "+alert.Rule]++
		}
		return hits
	}

	handle(transferEvent("tx1", "payer", "payee", 950_000))
	handle(transferEvent("tx2", "payer", "payee", 950_000))
	if want := (map[string]int{"payee R1": 1}); !reflect.DeepEqual(rules(), want) {
		t.Fatalf("after two transfers: %v, want %v", rules(), want)
	}
	handle(transferEvent("tx3", "payer", "payee", 950_000))
	handle(transferEvent("tx3", "payer", "payee", 950_000)) // redelivered after a restart
	if want := (map[string]int{"payee R1": 1, "payer R3": 1}); !reflect.DeepEqual(rules(), want) {
		t.Fatalf("after three near-limit transfers: %v, want %v", rules(), want)
	}
	for i := 4; i <= 11; i++ {
		handle(transferEvent("tx"+strconv.Itoa(i), "payer", "regulated", 1_000))
	}
	if want := (map[string]int{"payee R1": 1, "payer R3": 1, "payer R2": 1}); !reflect.DeepEqual(rules(), want) {
		t.Fatalf("after 11 sent transfers: %v, want %v (a verified payee must not raise R1)", rules(), want)
	}

	handle(&client.ChaincodeEvent{EventName: "SomethingElse", TransactionID: "other"})
	handle(&client.ChaincodeEvent{EventName: monitorEventName, TransactionID: "bad", Payload: []byte("not json")})
	if len(rules()) != 3 {
		t.Fatalf("unrelated or malformed events changed the alerts: %v", rules())
	}
}

func TestNewTransferMonitorNeedsADistributorIdentity(t *testing.T) {
	ledger := &StudyLedgerService{identities: map[string]config.FabricStudyIdentity{"bi": {MSPID: "CentralBankMSP"}}}
	if _, err := NewTransferMonitor(nil, ledger, MonitorThresholds{}); err == nil {
		t.Fatal("a ledger without a DistributorMSP identity must not start the monitor")
	}
	ledger.identities["zeta"] = config.FabricStudyIdentity{MSPID: monitorMSP}
	ledger.identities["alpha"] = config.FabricStudyIdentity{MSPID: monitorMSP}
	monitor, err := NewTransferMonitor(nil, ledger, MonitorThresholds{})
	if err != nil || monitor.username != "alpha" {
		t.Fatalf("monitor identity = %+v, %v; want the first username", monitor, err)
	}
}
