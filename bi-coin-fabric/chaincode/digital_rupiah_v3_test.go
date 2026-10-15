package main

import (
	"strings"
	"testing"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

func putActiveParticipant(t *testing.T, sc *SmartContract, ctx contractapi.TransactionContextInterface, participantID string, participantType ParticipantType, mspID string, bic string) {
	t.Helper()
	err := sc.putParticipant(ctx, Participant{
		ParticipantID:         participantID,
		Name:                  participantID,
		Domain:                participantID + ".example",
		AccountID:             bic,
		ParticipantType:       participantType,
		InitialReserveBalance: "0",
		ComplianceStatus:      "approved",
		Status:                ParticipantActive,
		MSPID:                 mspID,
		BIC:                   bic,
		CreatedAt:             "2026-06-27T12:00:00Z",
		UpdatedAt:             "2026-06-27T12:00:00Z",
	})
	if err != nil {
		t.Fatalf("put participant %s: %v", participantID, err)
	}
}

func TestInitLedgerWritesSchemaSentinelAndDoesNotOverwriteExistingState(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-init-1", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	wallet, err := sc.getWallet(ctx, "bi_treasury")
	if err != nil {
		t.Fatalf("get bi wallet: %v", err)
	}
	wallet.Balance = 77
	if err := sc.putWallet(ctx, "bi_treasury", wallet); err != nil {
		t.Fatalf("seed mutated bi wallet: %v", err)
	}

	setMockTransaction(stub, "tx-init-2", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("second init ledger: %v", err)
	}

	wallet, err = sc.getWallet(ctx, "bi_treasury")
	if err != nil {
		t.Fatalf("get bi wallet after second init: %v", err)
	}
	if wallet.Balance != 77 {
		t.Fatalf("bi wallet balance = %d, want preserved 77", wallet.Balance)
	}
	if _, ok := stub.State[schemaStateKey]; !ok {
		t.Fatalf("schema sentinel %q missing", schemaStateKey)
	}
}

func TestInitLedgerFailsWhenLegacyStateExistsWithoutSchemaSentinel(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-legacy", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	putActiveParticipant(t, sc, ctx, "distributor-1", ParticipantDistributor, DistributorMSP, "DISTIDJAXXX")
	if err := sc.putWallet(ctx, "bi_treasury", Wallet{
		WalletID:               "bi_treasury",
		OwnerID:                "bank_indonesia",
		ParticipantID:          "bank_indonesia",
		CustodianParticipantID: "bank_indonesia",
		CustodianMSPID:         CentralBankMSP,
		WalletType:             WalletHot,
		Balance:                77,
		LastResetDay:           "2026-06-27",
		LastResetMonth:         "2026-06",
	}); err != nil {
		t.Fatalf("seed legacy treasury: %v", err)
	}
	delete(stub.State, schemaStateKey)

	err := sc.InitLedger(ctx)
	if err == nil || !strings.Contains(err.Error(), "schema sentinel missing") {
		t.Fatalf("init ledger err = %v, want legacy-state rejection", err)
	}
	if _, ok := stub.State[schemaStateKey]; ok {
		t.Fatalf("schema sentinel unexpectedly written on legacy state")
	}

	wallet, getErr := sc.getWallet(ctx, "bi_treasury")
	if getErr != nil {
		t.Fatalf("get legacy treasury: %v", getErr)
	}
	if wallet.Balance != 77 {
		t.Fatalf("legacy treasury balance = %d, want preserved 77", wallet.Balance)
	}
}

func TestListWalletsByOwnerDoesNotReturnCustodianPeers(t *testing.T) {
	sc := &SmartContract{}
	ctx, _ := newMockTransactionContext("tx-wallet-list", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	for _, wallet := range []Wallet{
		{WalletID: "wlt_alice", OwnerID: "alice", ParticipantID: "part-bank", CustodianParticipantID: "part-bank"},
		{WalletID: "wlt_bob", OwnerID: "bob", ParticipantID: "part-bank", CustodianParticipantID: "part-bank"},
	} {
		if err := sc.putWallet(ctx, wallet.WalletID, wallet); err != nil {
			t.Fatalf("put wallet %s: %v", wallet.WalletID, err)
		}
	}

	wallets, err := sc.ListWalletsByOwner(ctx, "alice")
	if err != nil {
		t.Fatalf("list wallets by owner: %v", err)
	}
	if len(wallets) != 1 || wallets[0].WalletID != "wlt_alice" {
		t.Fatalf("owner wallet list = %+v, want only alice wallet", wallets)
	}
}

func TestTransferRejectsCustodianMSPMismatchAndReturnsReceipt(t *testing.T) {
	sc := &SmartContract{}
	base := time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC)
	ctxPJP, stubPJP := newMockTransactionContextWithMSP("tx-setup", base, DistributorMSP)
	ctxBank, stubBank := newMockTransactionContextWithMSP("tx-bank", base.Add(5*time.Minute), CentralBankMSP)

	limit := TierLimit{Tier: TierStandard, MaxBalance: 20_000_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000}
	if err := sc.putLimit(ctxPJP, limit); err != nil {
		t.Fatalf("put limit: %v", err)
	}
	if err := sc.putSystemLimit(ctxPJP, SystemLimit{Scope: ScopePerTxAmount, Value: 9_000_000}); err != nil {
		t.Fatalf("put per-tx system limit: %v", err)
	}
	putActiveParticipant(t, sc, ctxPJP, "pjp-custodian", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")
	for _, profile := range []KycProfile{
		{ProfileID: "kyc-sender", SubjectType: SubjectRetailCustomer, SubjectID: "cust-sender", DocumentHashes: []string{"sha256:a"}, Status: KycApproved, RiskLevel: RiskLow, DueDiligenceLevel: DueDiligenceStandard, CreatedAt: base.Format(time.RFC3339), UpdatedAt: base.Format(time.RFC3339)},
		{ProfileID: "kyc-receiver", SubjectType: SubjectRetailCustomer, SubjectID: "cust-receiver", DocumentHashes: []string{"sha256:b"}, Status: KycApproved, RiskLevel: RiskLow, DueDiligenceLevel: DueDiligenceStandard, CreatedAt: base.Format(time.RFC3339), UpdatedAt: base.Format(time.RFC3339)},
	} {
		if err := sc.putKycProfile(ctxPJP, profile); err != nil {
			t.Fatalf("put profile %s: %v", profile.ProfileID, err)
		}
	}
	if err := sc.putWallet(ctxPJP, "wlt-sender", Wallet{WalletID: "wlt-sender", OwnerID: "cust-sender", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 500_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put sender wallet: %v", err)
	}
	if err := sc.putWallet(ctxPJP, "wlt-receiver", Wallet{WalletID: "wlt-receiver", OwnerID: "cust-receiver", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 100_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put receiver wallet: %v", err)
	}
	stubBank.State = stubPJP.State

	if _, err := sc.Transfer(ctxBank, "wlt-sender", "wlt-receiver", 50_000, "transfer-ref-bank"); err == nil || !strings.Contains(err.Error(), "custodian MSP") {
		t.Fatalf("bank transfer err = %v, want custodian MSP rejection", err)
	}

	setMockTransaction(stubPJP, "tx-transfer", base.Add(10*time.Minute))
	receipt, err := sc.Transfer(ctxPJP, "wlt-sender", "wlt-receiver", 50_000, "transfer-ref-1")
	if err != nil {
		t.Fatalf("pjp transfer: %v", err)
	}
	if receipt["status"] != string(TxSettled) || receipt["sender_id"] != "wlt-sender" || receipt["reference_id"] != "transfer-ref-1" {
		t.Fatalf("transfer receipt = %+v, want settled receipt", receipt)
	}
}

func TestTransferIsIdempotentByReferenceAcrossTransactions(t *testing.T) {
	sc := &SmartContract{}
	base := time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC)
	ctx, stub := newMockTransactionContextWithMSP("tx-setup", base, DistributorMSP)

	limit := TierLimit{Tier: TierStandard, MaxBalance: 20_000_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000}
	if err := sc.putLimit(ctx, limit); err != nil {
		t.Fatalf("put limit: %v", err)
	}
	if err := sc.putSystemLimit(ctx, SystemLimit{Scope: ScopePerTxAmount, Value: 9_000_000}); err != nil {
		t.Fatalf("put per-tx system limit: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "pjp-custodian", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")
	for _, profile := range []KycProfile{
		{ProfileID: "kyc-sender", SubjectType: SubjectRetailCustomer, SubjectID: "cust-sender", DocumentHashes: []string{"sha256:a"}, Status: KycApproved, RiskLevel: RiskLow, DueDiligenceLevel: DueDiligenceStandard, CreatedAt: base.Format(time.RFC3339), UpdatedAt: base.Format(time.RFC3339)},
		{ProfileID: "kyc-receiver", SubjectType: SubjectRetailCustomer, SubjectID: "cust-receiver", DocumentHashes: []string{"sha256:b"}, Status: KycApproved, RiskLevel: RiskLow, DueDiligenceLevel: DueDiligenceStandard, CreatedAt: base.Format(time.RFC3339), UpdatedAt: base.Format(time.RFC3339)},
	} {
		if err := sc.putKycProfile(ctx, profile); err != nil {
			t.Fatalf("put profile %s: %v", profile.ProfileID, err)
		}
	}
	if err := sc.putWallet(ctx, "wlt-sender", Wallet{WalletID: "wlt-sender", OwnerID: "cust-sender", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 500_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put sender wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-receiver", Wallet{WalletID: "wlt-receiver", OwnerID: "cust-receiver", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 100_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put receiver wallet: %v", err)
	}

	setMockTransaction(stub, "tx-transfer-1", base.Add(10*time.Minute))
	receipt1, err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 50_000, "transfer-ref-1")
	if err != nil {
		t.Fatalf("first transfer: %v", err)
	}

	setMockTransaction(stub, "tx-transfer-2", base.Add(11*time.Minute))
	receipt2, err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 50_000, "transfer-ref-1")
	if err != nil {
		t.Fatalf("replayed transfer: %v", err)
	}
	if receipt2["tx_id"] != receipt1["tx_id"] || receipt2["reference_id"] != "transfer-ref-1" {
		t.Fatalf("replayed transfer receipt = %+v, want original receipt %+v", receipt2, receipt1)
	}

	senderWallet, err := sc.getWallet(ctx, "wlt-sender")
	if err != nil {
		t.Fatalf("get sender wallet: %v", err)
	}
	receiverWallet, err := sc.getWallet(ctx, "wlt-receiver")
	if err != nil {
		t.Fatalf("get receiver wallet: %v", err)
	}
	if senderWallet.Balance != 450_000 || receiverWallet.Balance != 150_000 {
		t.Fatalf("wallet balances sender=%d receiver=%d, want single transfer effect", senderWallet.Balance, receiverWallet.Balance)
	}

	txs, err := sc.GetTransactions(ctx, "", "", "", "", "")
	if err != nil {
		t.Fatalf("get transactions: %v", err)
	}
	if len(txs) != 1 || txs[0].RelatedIntentID != "transfer-ref-1" {
		t.Fatalf("transactions = %+v, want one transfer with reference", txs)
	}
}

func TestFreezeRejectOffboardAndCascadeAcrossWallets(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-participant", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	putActiveParticipant(t, sc, ctx, "distributor-1", ParticipantDistributor, DistributorMSP, "DISTIDJAXXX")
	if err := sc.putWallet(ctx, "wlt_distributor-1", Wallet{WalletID: "wlt_distributor-1", OwnerID: "distributor-1", ParticipantID: "distributor-1", CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP, WalletType: WalletHot, Balance: 100_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put participant wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-retail-1", Wallet{WalletID: "wlt-retail-1", OwnerID: "cust-1", ParticipantID: "distributor-1", CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP, Tier: TierBasic, Balance: 25_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put retail wallet: %v", err)
	}

	setMockTransaction(stub, "tx-freeze", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	if err := sc.FreezeParticipant(ctx, "distributor-1"); err != nil {
		t.Fatalf("freeze participant: %v", err)
	}
	for _, walletID := range []string{"wlt_distributor-1", "wlt-retail-1"} {
		wallet, err := sc.getWallet(ctx, walletID)
		if err != nil {
			t.Fatalf("get wallet %s: %v", walletID, err)
		}
		if !wallet.Frozen {
			t.Fatalf("wallet %s frozen = false, want true", walletID)
		}
	}

	if err := sc.RejectParticipant(ctx, "distributor-1"); err == nil || !strings.Contains(err.Error(), "pending") {
		t.Fatalf("reject active participant err = %v, want pending-only rejection", err)
	}
	if _, err := sc.OffboardParticipant(ctx, "distributor-1"); err == nil || !strings.Contains(err.Error(), "non-zero balance") {
		t.Fatalf("offboard funded participant err = %v, want non-zero balance rejection", err)
	}
}

func TestRequestIssuanceRtgsIsIdempotentAndCreditsTreasury(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-init", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "distributor-1", ParticipantDistributor, DistributorMSP, "DISTIDJAXXX")
	if err := sc.putWallet(ctx, "wlt_distributor-1", Wallet{WalletID: "wlt_distributor-1", OwnerID: "distributor-1", ParticipantID: "distributor-1", CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP, WalletType: WalletHot, Balance: 0, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put distributor wallet: %v", err)
	}

	setMockTransaction(stub, "tx-rtgs-1", time.Date(2026, time.June, 27, 12, 10, 0, 0, time.UTC))
	rawReceipt, err := sc.RequestIssuanceRtgs(ctx, "DISTIDJAXXX", 250_000, "rtgs-ref-1")
	if err != nil {
		t.Fatalf("rtgs issuance: %v", err)
	}
	receipt := rawReceipt.(map[string]interface{})
	if receipt["sender_bic"] != "DISTIDJAXXX" {
		t.Fatalf("rtgs receipt = %+v, want sender_bic", receipt)
	}
	wallet, err := sc.getWallet(ctx, "bi_treasury")
	if err != nil {
		t.Fatalf("get treasury wallet: %v", err)
	}
	if wallet.Balance != 250_000 {
		t.Fatalf("treasury wallet balance = %d, want 250000", wallet.Balance)
	}

	setMockTransaction(stub, "tx-rtgs-2", time.Date(2026, time.June, 27, 12, 11, 0, 0, time.UTC))
	rawReceipt2, err := sc.RequestIssuanceRtgs(ctx, "DISTIDJAXXX", 250_000, "rtgs-ref-1")
	if err != nil {
		t.Fatalf("repeated rtgs issuance: %v", err)
	}
	receipt2 := rawReceipt2.(map[string]interface{})
	if receipt2["reference"] != "rtgs-ref-1" {
		t.Fatalf("repeat rtgs receipt = %+v, want same reference", receipt2)
	}
	wallet, err = sc.getWallet(ctx, "bi_treasury")
	if err != nil {
		t.Fatalf("get treasury wallet after repeat: %v", err)
	}
	if wallet.Balance != 250_000 {
		t.Fatalf("treasury wallet balance after repeat = %d, want unchanged 250000", wallet.Balance)
	}
}

func TestMintRejectsNonTreasuryWallet(t *testing.T) {
	sc := &SmartContract{}
	ctx, _ := newMockTransactionContext("tx-init", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt_distributor-1", Wallet{WalletID: "wlt_distributor-1", OwnerID: "distributor-1", ParticipantID: "distributor-1", CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP, WalletType: WalletHot}); err != nil {
		t.Fatalf("put distributor wallet: %v", err)
	}

	if err := sc.Mint(ctx, "wlt_distributor-1", 1); err == nil || !strings.Contains(err.Error(), "treasury") {
		t.Fatalf("mint distributor wallet err = %v, want treasury-only rejection", err)
	}
}

func TestExplicitIssuanceAndRedemptionAreReplaySafe(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-init", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("initialize ledger: %v", err)
	}

	setMockTransaction(stub, "tx-issue", time.Date(2026, time.June, 27, 12, 1, 0, 0, time.UTC))
	issued, err := sc.RequestIssuance(ctx, 1_000, "issue-ref")
	if err != nil {
		t.Fatalf("request issuance: %v", err)
	}
	setMockTransaction(stub, "tx-issue-retry", time.Date(2026, time.June, 27, 12, 2, 0, 0, time.UTC))
	issuedAgain, err := sc.RequestIssuance(ctx, 1_000, "issue-ref")
	if err != nil || issuedAgain["tx_id"] != issued["tx_id"] {
		t.Fatalf("issuance retry = %v, %v; want original receipt %v", issuedAgain, err, issued)
	}
	if _, err := sc.RequestIssuance(ctx, 2_000, "issue-ref"); err == nil {
		t.Fatal("expected issuance reference payload conflict")
	}

	putActiveParticipant(t, sc, ctx, "bank-1", ParticipantDistributor, DistributorMSP, "BANKIDJAXXX")
	if err := sc.putWallet(ctx, "wlt_bank-1", Wallet{WalletID: "wlt_bank-1", OwnerID: "bank-1", ParticipantID: "bank-1", CustodianParticipantID: "bank-1", CustodianMSPID: DistributorMSP, WalletType: WalletHot, Balance: 1_000}); err != nil {
		t.Fatalf("put participant wallet: %v", err)
	}
	setMockTransaction(stub, "tx-redeem", time.Date(2026, time.June, 27, 12, 3, 0, 0, time.UTC))
	redeemed, err := sc.RequestRedemption(ctx, "bank-1", 400, "redeem-ref")
	if err != nil {
		t.Fatalf("request redemption: %v", err)
	}
	setMockTransaction(stub, "tx-redeem-retry", time.Date(2026, time.June, 27, 12, 4, 0, 0, time.UTC))
	redeemedAgain, err := sc.RequestRedemption(ctx, "bank-1", 400, "redeem-ref")
	if err != nil || redeemedAgain["tx_id"] != redeemed["tx_id"] {
		t.Fatalf("redemption retry = %v, %v; want original receipt %v", redeemedAgain, err, redeemed)
	}
	if _, err := sc.RequestRedemption(ctx, "bank-1", 500, "redeem-ref"); err == nil {
		t.Fatal("expected redemption reference payload conflict")
	}
	wallet, err := sc.getWallet(ctx, "wlt_bank-1")
	if err != nil || wallet.Balance != 600 {
		t.Fatalf("participant balance = %+v, %v; want 600", wallet, err)
	}
}

func TestRequestIssuanceRtgsRejectsNonPositiveAmountWithoutStateChange(t *testing.T) {
	sc := &SmartContract{}
	base := time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC)
	ctx, stub := newMockTransactionContext("tx-init", base)
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "distributor-1", ParticipantDistributor, DistributorMSP, "DISTIDJAXXX")
	if err := sc.putWallet(ctx, "wlt_distributor-1", Wallet{WalletID: "wlt_distributor-1", OwnerID: "distributor-1", ParticipantID: "distributor-1", CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP, WalletType: WalletHot, Balance: 10_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put distributor wallet: %v", err)
	}

	for i, amount := range []int64{0, -1} {
		setMockTransaction(stub, "tx-rtgs-invalid-"+string(rune('1'+i)), base.Add(time.Duration(i+1)*time.Minute))
		if _, err := sc.RequestIssuanceRtgs(ctx, "DISTIDJAXXX", amount, "rtgs-invalid-ref"); err == nil || !strings.Contains(err.Error(), "amount must be positive") {
			t.Fatalf("rtgs amount %d err = %v, want positive-amount rejection", amount, err)
		}
	}

	wallet, err := sc.getWallet(ctx, "wlt_distributor-1")
	if err != nil {
		t.Fatalf("get distributor wallet: %v", err)
	}
	if wallet.Balance != 10_000 {
		t.Fatalf("distributor wallet balance = %d, want unchanged 10000", wallet.Balance)
	}
	txs, err := sc.GetTransactions(ctx, "", "", "", "", "")
	if err != nil {
		t.Fatalf("get transactions: %v", err)
	}
	if len(txs) != 0 {
		t.Fatalf("transactions = %+v, want no writes for invalid RTGS issuance", txs)
	}
}

func TestRequestIssuanceRtgsRequiresPerTxSystemLimitState(t *testing.T) {
	sc := &SmartContract{}
	base := time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC)
	ctx, stub := newMockTransactionContext("tx-init", base)
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "distributor-1", ParticipantDistributor, DistributorMSP, "DISTIDJAXXX")
	if err := sc.putWallet(ctx, "wlt_distributor-1", Wallet{WalletID: "wlt_distributor-1", OwnerID: "distributor-1", ParticipantID: "distributor-1", CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP, WalletType: WalletHot, Balance: 0, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put distributor wallet: %v", err)
	}
	limitKey, err := stub.CreateCompositeKey("syslimit", []string{string(ScopePerTxAmount)})
	if err != nil {
		t.Fatalf("create per-tx limit key: %v", err)
	}

	delete(stub.State, limitKey)
	if _, err := sc.RequestIssuanceRtgs(ctx, "DISTIDJAXXX", 25_000, "rtgs-missing-limit"); err == nil || !strings.Contains(err.Error(), "per-transaction system limit") {
		t.Fatalf("missing limit err = %v, want system limit error", err)
	}

	stub.State[limitKey] = []byte("{bad json")
	if _, err := sc.RequestIssuanceRtgs(ctx, "DISTIDJAXXX", 25_000, "rtgs-bad-limit"); err == nil || !strings.Contains(err.Error(), "per-transaction system limit") {
		t.Fatalf("malformed limit err = %v, want system limit error", err)
	}
}

func TestDistributionKeepsSupplyConstantAndCreatesOneDistributionRecord(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-init", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "distributor-1", ParticipantDistributor, DistributorMSP, "DISTIDJAXXX")
	putActiveParticipant(t, sc, ctx, "pjp-1", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")
	treasury, err := sc.getWallet(ctx, "bi_treasury")
	if err != nil {
		t.Fatalf("get treasury wallet: %v", err)
	}
	treasury.Balance = 500_000
	if err := sc.putWallet(ctx, "bi_treasury", treasury); err != nil {
		t.Fatalf("fund treasury wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt_pjp-1", Wallet{WalletID: "wlt_pjp-1", OwnerID: "pjp-1", ParticipantID: "pjp-1", CustodianParticipantID: "pjp-1", CustodianMSPID: DistributorMSP, WalletType: WalletHot, Balance: 0, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put pjp wallet: %v", err)
	}

	before, err := sc.GetTotalSupply(ctx)
	if err != nil {
		t.Fatalf("get total supply before distribution: %v", err)
	}

	setMockTransaction(stub, "tx-dist-1", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	receipt, err := sc.DistributeToParticipant(ctx, "pjp-1", 125_000, "distribution-ref-1")
	if err != nil {
		t.Fatalf("distribute: %v", err)
	}
	if receipt["status"] != string(TxSettled) || receipt["reference_id"] != "distribution-ref-1" {
		t.Fatalf("distribution receipt = %+v, want settled", receipt)
	}

	setMockTransaction(stub, "tx-dist-2", time.Date(2026, time.June, 27, 12, 6, 0, 0, time.UTC))
	replayedReceipt, err := sc.DistributeToParticipant(ctx, "pjp-1", 125_000, "distribution-ref-1")
	if err != nil {
		t.Fatalf("replayed distribute: %v", err)
	}
	if replayedReceipt["tx_id"] != receipt["tx_id"] {
		t.Fatalf("replayed distribution receipt = %+v, want original receipt %+v", replayedReceipt, receipt)
	}

	after, err := sc.GetTotalSupply(ctx)
	if err != nil {
		t.Fatalf("get total supply after distribution: %v", err)
	}
	if before != after {
		t.Fatalf("total supply before=%d after=%d, want unchanged", before, after)
	}

	txs, err := sc.GetTransactions(ctx, "", "", "", "", "")
	if err != nil {
		t.Fatalf("get transactions: %v", err)
	}
	if len(txs) != 1 || txs[0].TransactionType != TxDistribution || txs[0].RelatedIntentID != "distribution-ref-1" {
		t.Fatalf("transactions = %+v, want one distribution record with reference", txs)
	}
}

func TestDistributionCreditsDistributorDirectlyFromTreasury(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-init", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "distributor-1", ParticipantDistributor, DistributorMSP, "DISTIDJAXXX")
	if err := sc.putWallet(ctx, "wlt_distributor-1", Wallet{WalletID: "wlt_distributor-1", OwnerID: "distributor-1", ParticipantID: "distributor-1", CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP, WalletType: WalletHot, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put distributor wallet: %v", err)
	}
	treasury, err := sc.getWallet(ctx, "bi_treasury")
	if err != nil {
		t.Fatalf("get treasury wallet: %v", err)
	}
	treasury.Balance = 125_000
	if err := sc.putWallet(ctx, "bi_treasury", treasury); err != nil {
		t.Fatalf("fund treasury wallet: %v", err)
	}

	setMockTransaction(stub, "tx-dist-distributor", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	if _, err := sc.DistributeToParticipant(ctx, "distributor-1", 125_000, "distribution-distributor-ref"); err != nil {
		t.Fatalf("distribute to distributor: %v", err)
	}
	wallet, err := sc.getWallet(ctx, "wlt_distributor-1")
	if err != nil {
		t.Fatalf("get distributor wallet: %v", err)
	}
	if wallet.Balance != 125_000 {
		t.Fatalf("distributor wallet balance = %d, want 125000", wallet.Balance)
	}
}

func TestDistributionRejectsObserverCustodian(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-init", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "observer-1", ParticipantObserver, ValidatorMSP, "OJKIDJAXXX")

	setMockTransaction(stub, "tx-dist-observer", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	if _, err := sc.DistributeToParticipant(ctx, "observer-1", 1, "distribution-observer-ref"); err == nil || !strings.Contains(err.Error(), "distributor or PJP") {
		t.Fatalf("distribute to observer err = %v, want Custodian eligibility rejection", err)
	}
}

func TestWholesaleCustodianCanFundRetailWallet(t *testing.T) {
	sc := &SmartContract{}
	base := time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC)
	ctx, stub := newMockTransactionContextWithMSP("tx-wholesale-funding", base, DistributorMSP)
	ctx.SetClientIdentity(&mockClientIdentity{mspID: CentralBankMSP})
	if err := sc.InitLedger(ctx); err != nil {
		t.Fatalf("init ledger: %v", err)
	}
	ctx.SetClientIdentity(&mockClientIdentity{mspID: DistributorMSP})
	putActiveParticipant(t, sc, ctx, "distributor-1", ParticipantDistributor, DistributorMSP, "DISTIDJAXXX")
	if err := sc.putWallet(ctx, "wlt_distributor-1", Wallet{
		WalletID: "wlt_distributor-1", OwnerID: "distributor-1", ParticipantID: "distributor-1",
		CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP,
		WalletType: WalletHot, Balance: 500_000,
		LastResetDay: "2026-06-27", LastResetMonth: "2026-06",
	}); err != nil {
		t.Fatalf("put wholesale wallet: %v", err)
	}
	profile := approvedProfile(SubjectRetailCustomer, DueDiligenceStandard, RiskLow, false)
	profile.ProfileID = "kyc-retail-1"
	profile.SubjectID = "retail-1"
	profile.CreatedAt = base.Format(time.RFC3339)
	profile.UpdatedAt = base.Format(time.RFC3339)
	if err := sc.putKycProfile(ctx, profile); err != nil {
		t.Fatalf("put retail KYC profile: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-retail-1", Wallet{
		WalletID: "wlt-retail-1", OwnerID: "retail-1", ParticipantID: "distributor-1",
		CustodianParticipantID: "distributor-1", CustodianMSPID: DistributorMSP,
		Tier: TierStandard, WalletType: WalletHot,
		LastResetDay: "2026-06-27", LastResetMonth: "2026-06",
	}); err != nil {
		t.Fatalf("put retail wallet: %v", err)
	}

	setMockTransaction(stub, "tx-wholesale-funding-commit", base.Add(time.Minute))
	receipt, err := sc.Transfer(ctx, "wlt_distributor-1", "wlt-retail-1", 100_000, "wholesale-funding-ref")
	if err != nil {
		t.Fatalf("wholesale funding transfer: %v", err)
	}
	if receipt["status"] != string(TxSettled) {
		t.Fatalf("receipt = %+v, want settled", receipt)
	}
	wholesale, err := sc.getWallet(ctx, "wlt_distributor-1")
	if err != nil {
		t.Fatalf("get wholesale wallet: %v", err)
	}
	retail, err := sc.getWallet(ctx, "wlt-retail-1")
	if err != nil {
		t.Fatalf("get retail wallet: %v", err)
	}
	if wholesale.Balance != 400_000 || retail.Balance != 100_000 || retail.MonthlyReceived != 100_000 {
		t.Fatalf("balances wholesale=%d retail=%d received=%d, want 400000/100000/100000", wholesale.Balance, retail.Balance, retail.MonthlyReceived)
	}
}
