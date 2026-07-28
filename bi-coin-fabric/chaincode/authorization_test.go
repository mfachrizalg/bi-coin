package main

import (
	"strings"
	"testing"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

func TestBankIndonesiaOnlyFunctionsRejectBankPjpMSP(t *testing.T) {
	contract := new(SmartContract)
	now := time.Date(2026, 7, 27, 12, 0, 0, 0, time.UTC)

	tests := []struct {
		name string
		call func(contractapi.TransactionContextInterface) error
	}{
		{"InitLedger", contract.InitLedger},
		{"ApproveParticipant", func(ctx contractapi.TransactionContextInterface) error {
			return contract.ApproveParticipant(ctx, "pjp_1")
		}},
		{"Mint", func(ctx contractapi.TransactionContextInterface) error {
			return contract.Mint(ctx, "wlt_pjp_1", 1)
		}},
		{"SetSystemLimit", func(ctx contractapi.TransactionContextInterface) error {
			return contract.SetSystemLimit(ctx, string(ScopeGlobalSupply), 1)
		}},
		{"FreezeWallet", func(ctx contractapi.TransactionContextInterface) error {
			return contract.FreezeWallet(ctx, "wlt_customer")
		}},
		{"RequestIssuanceRtgs", func(ctx contractapi.TransactionContextInterface) error {
			_, err := contract.RequestIssuanceRtgs(ctx, "BANKIDJA", 1, "ref-1")
			return err
		}},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ctx, _ := newMockTransactionContextWithMSP("tx-"+test.name, now, PJPMSP)
			err := test.call(ctx)
			if err == nil || !strings.Contains(err.Error(), "not authorized") {
				t.Fatalf("%s error = %v, want MSP authorization rejection", test.name, err)
			}
		})
	}
}

func TestOJKObserverCannotInvokeMutations(t *testing.T) {
	contract := new(SmartContract)
	ctx, _ := newMockTransactionContextWithMSP(
		"tx-ojk-mutation",
		time.Date(2026, 7, 27, 12, 0, 0, 0, time.UTC),
		OJKObserverMSP,
	)

	err := contract.SubmitParticipant(ctx, "pjp_1", "PJP 1", "pjp.test", "acct-1", "pjp", "0", "pending")
	if err == nil || !strings.Contains(err.Error(), "not authorized") {
		t.Fatalf("OJK mutation error = %v, want MSP authorization rejection", err)
	}
}

func TestBankPjpCanSubmitParticipant(t *testing.T) {
	contract := new(SmartContract)
	ctx, _ := newMockTransactionContextWithMSP(
		"tx-pjp-submit",
		time.Date(2026, 7, 27, 12, 0, 0, 0, time.UTC),
		PJPMSP,
	)

	if err := contract.SubmitParticipant(ctx, "pjp_1", "PJP 1", "pjp.test", "acct-1", "pjp", "0", "pending"); err != nil {
		t.Fatalf("PJP submit participant: %v", err)
	}
}

func TestOJKObserverCanReadLedgerState(t *testing.T) {
	contract := new(SmartContract)
	ctx, _ := newMockTransactionContextWithMSP(
		"tx-ojk-read",
		time.Date(2026, 7, 27, 12, 0, 0, 0, time.UTC),
		OJKObserverMSP,
	)

	if _, err := contract.GetTotalSupply(ctx); err != nil {
		t.Fatalf("OJK read total supply: %v", err)
	}
}
