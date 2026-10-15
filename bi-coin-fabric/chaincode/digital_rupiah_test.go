package main

import (
	"errors"
	"reflect"
	"strings"
	"testing"
	"time"
)

func TestRetiredMonetaryFeaturesAreNotExposed(t *testing.T) {
	contract := reflect.TypeOf(&SmartContract{})
	for _, method := range []string{"PayQris", "SetAutoLimitPolicy", "GetAutoLimitPolicy"} {
		if _, ok := contract.MethodByName(method); ok {
			t.Errorf("retired method %s is still exposed by the chaincode contract", method)
		}
	}
}

func TestReceiptAmountComparisonPreservesInt64Precision(t *testing.T) {
	sc := &SmartContract{}
	ctx, _ := newMockTransactionContext("tx-large-receipt", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	amount := int64(9_007_199_254_740_993)
	if err := sc.putIdempotencyReceipt(ctx, "transfer", "large-amount", map[string]interface{}{"amount": amount}); err != nil {
		t.Fatalf("put receipt: %v", err)
	}
	receipt, err := sc.getIdempotencyReceipt(ctx, "transfer", "large-amount")
	if err != nil {
		t.Fatalf("get receipt: %v", err)
	}
	if err := requireReceiptFields(receipt, map[string]interface{}{"amount": amount}); err != nil {
		t.Fatalf("exact amount replay failed: %v", err)
	}
	if err := requireReceiptFields(receipt, map[string]interface{}{"amount": amount + 1}); err == nil {
		t.Fatal("expected neighboring int64 amount to conflict")
	}
}

func TestSubmitAndApproveParticipantCreatesWholesaleWallet(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-submit", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	if err := sc.SubmitParticipant(ctx, "bank-1", "Bank One", "bank.example", "acct-1", string(ParticipantValidator), "1000000", "pending"); err != nil {
		t.Fatalf("submit participant: %v", err)
	}

	setMockTransaction(stub, "tx-approve", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	if err := sc.ApproveParticipant(ctx, "bank-1"); err != nil {
		t.Fatalf("approve participant: %v", err)
	}

	participant, err := sc.getParticipant(ctx, "bank-1")
	if err != nil {
		t.Fatalf("get participant: %v", err)
	}
	if participant.Status != ParticipantActive {
		t.Fatalf("participant status = %s, want active", participant.Status)
	}

	wallet, err := sc.getWallet(ctx, "wlt_bank-1")
	if err != nil {
		t.Fatalf("get wallet: %v", err)
	}
	if wallet.Tier != "" || wallet.WalletType != WalletHot {
		t.Fatalf("approved participant wallet = %+v, want wholesale hot wallet", wallet)
	}

	events, err := sc.GetSupervisionEvents(ctx)
	if err != nil {
		t.Fatalf("get supervision events: %v", err)
	}
	if len(events) != 2 {
		t.Fatalf("supervision events = %d, want 2", len(events))
	}
}

func TestFreezeAndUnfreezeParticipantTogglesWalletState(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-submit", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	if err := sc.SubmitParticipant(ctx, "pjp-1", "PJP One", "pjp.example", "acct-1", string(ParticipantPJP), "0", "pending"); err != nil {
		t.Fatalf("submit participant: %v", err)
	}
	setMockTransaction(stub, "tx-approve", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	if err := sc.ApproveParticipant(ctx, "pjp-1"); err != nil {
		t.Fatalf("approve participant: %v", err)
	}

	setMockTransaction(stub, "tx-freeze", time.Date(2026, time.June, 27, 12, 10, 0, 0, time.UTC))
	if err := sc.FreezeParticipant(ctx, "pjp-1"); err != nil {
		t.Fatalf("freeze participant: %v", err)
	}
	participant, _ := sc.getParticipant(ctx, "pjp-1")
	wallet, _ := sc.getWallet(ctx, "wlt_pjp-1")
	if participant.Status != ParticipantFrozen || !wallet.Frozen {
		t.Fatalf("after freeze participant=%+v wallet=%+v", participant, wallet)
	}

	setMockTransaction(stub, "tx-unfreeze", time.Date(2026, time.June, 27, 12, 15, 0, 0, time.UTC))
	if err := sc.UnfreezeParticipant(ctx, "pjp-1"); err != nil {
		t.Fatalf("unfreeze participant: %v", err)
	}
	participant, _ = sc.getParticipant(ctx, "pjp-1")
	wallet, _ = sc.getWallet(ctx, "wlt_pjp-1")
	if participant.Status != ParticipantActive || wallet.Frozen {
		t.Fatalf("after unfreeze participant=%+v wallet=%+v", participant, wallet)
	}
}

func TestSubmitAndRefreshKycProfilePersistsAuditTrail(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContextWithMSP("tx-submit-kyc", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC), DistributorMSP)
	putActiveParticipant(t, sc, ctx, "pjp-kyc", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")

	receipt, err := sc.SubmitKycProfile(ctx, "kyc-1", string(SubjectRetailCustomer), "cust-1", `["sha256:doc1"]`, "kyc-ref-1")
	if err != nil {
		t.Fatalf("submit KYC profile: %v", err)
	}
	setMockTransaction(stub, "tx-replay-kyc", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	replayed, err := sc.SubmitKycProfile(ctx, "kyc-1", string(SubjectRetailCustomer), "cust-1", `["sha256:doc1"]`, "kyc-ref-1")
	if err != nil || replayed["tx_id"] != receipt["tx_id"] {
		t.Fatalf("KYC retry = %v, %v; want original receipt %v", replayed, err, receipt)
	}
	ctx.SetClientIdentity(&mockClientIdentity{mspID: CentralBankMSP})
	setMockTransaction(stub, "tx-refresh-kyc", time.Date(2026, time.June, 27, 12, 10, 0, 0, time.UTC))
	if err := sc.RefreshKycProfile(ctx, "kyc-1", string(KycApproved), string(RiskHigh), string(DueDiligenceEnhanced), true, `["sha256:doc2"]`, "2027-06-27T12:00:00Z"); err != nil {
		t.Fatalf("refresh KYC profile: %v", err)
	}

	profile, err := sc.getKycProfile(ctx, "kyc-1")
	if err != nil {
		t.Fatalf("get KYC profile: %v", err)
	}
	if profile.Status != KycApproved || profile.RiskLevel != RiskHigh || !profile.SeniorApproval {
		t.Fatalf("refreshed profile = %+v, want approved high-risk senior-approved profile", profile)
	}
	if len(profile.DocumentHashes) != 1 || profile.DocumentHashes[0] != "sha256:doc2" {
		t.Fatalf("document hashes = %+v, want refreshed hashes", profile.DocumentHashes)
	}

	events, err := sc.ListKycAuditEvents(ctx, "kyc-1")
	if err != nil {
		t.Fatalf("list KYC audit events: %v", err)
	}
	if len(events) != 2 {
		t.Fatalf("KYC audit events = %d, want 2", len(events))
	}
}

func TestCreateWalletRejectsTierMismatchAndUsesPolicyDerivedTier(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContextWithMSP("tx-kyc", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC), DistributorMSP)
	putActiveParticipant(t, sc, ctx, "pjp-wallet-custodian", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")

	profile := approvedProfile(SubjectRetailCustomer, DueDiligenceStandard, RiskMedium, false)
	profile.ProfileID = "kyc-cust-1"
	profile.SubjectID = "cust-1"
	profile.CreatedAt = "2026-06-27T12:00:00Z"
	profile.UpdatedAt = "2026-06-27T12:00:00Z"
	if err := sc.putKycProfile(ctx, profile); err != nil {
		t.Fatalf("put KYC profile: %v", err)
	}

	setMockTransaction(stub, "tx-wallet-mismatch", time.Date(2026, time.June, 27, 12, 5, 0, 0, time.UTC))
	err := sc.CreateWallet(ctx, "wlt-cust-1", "cust-1", string(TierBasic))
	if err == nil || !strings.Contains(err.Error(), "does not match policy-derived tier") {
		t.Fatalf("create wallet mismatch err = %v, want mismatch error", err)
	}

	setMockTransaction(stub, "tx-wallet-create", time.Date(2026, time.June, 27, 12, 10, 0, 0, time.UTC))
	if err := sc.CreateWallet(ctx, "wlt-cust-1", "cust-1", string(TierStandard)); err != nil {
		t.Fatalf("create wallet: %v", err)
	}
	wallet, err := sc.getWallet(ctx, "wlt-cust-1")
	if err != nil {
		t.Fatalf("get wallet: %v", err)
	}
	if wallet.Tier != TierStandard {
		t.Fatalf("wallet tier = %s, want %s", wallet.Tier, TierStandard)
	}
	custodian, err := sc.getParticipant(ctx, "pjp-wallet-custodian")
	if err != nil {
		t.Fatalf("read Custodian: %v", err)
	}
	custodian.Status = ParticipantOffboarded
	if err := sc.putParticipant(ctx, custodian); err != nil {
		t.Fatalf("offboard Custodian: %v", err)
	}
	setMockTransaction(stub, "tx-wallet-after-offboard", time.Date(2026, time.June, 27, 12, 15, 0, 0, time.UTC))
	if err := sc.CreateWallet(ctx, "wlt-after-offboard", "cust-1", string(TierStandard)); err == nil {
		t.Fatal("expected offboarded Custodian wallet creation to fail")
	}
}

func TestTransferRequiresApprovedKycAnchor(t *testing.T) {
	sc := &SmartContract{}
	ctx, _ := newMockTransactionContextWithMSP("tx-transfer", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC), DistributorMSP)

	if err := sc.putLimit(ctx, TierLimit{Tier: TierBasic, MaxBalance: 2_000_000, DailyTxLimit: 500_000, MonthlyTxLimit: 5_000_000, MonthlyIncomingLimit: 20_000_000, PerTxLimit: 250_000}); err != nil {
		t.Fatalf("put basic limit: %v", err)
	}
	if err := sc.putSystemLimit(ctx, SystemLimit{Scope: ScopePerTxAmount, Value: 9_000_000}); err != nil {
		t.Fatalf("put per-tx system limit: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "pjp-custodian", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")
	if err := sc.putWallet(ctx, "wlt-a", Wallet{WalletID: "wlt-a", OwnerID: "cust-a", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierBasic, Balance: 500_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put sender wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-b", Wallet{WalletID: "wlt-b", OwnerID: "cust-b", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierBasic, Balance: 100_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put receiver wallet: %v", err)
	}

	_, err := sc.Transfer(ctx, "wlt-a", "wlt-b", 100_000, "transfer-missing-kyc")
	if err == nil || !strings.Contains(err.Error(), "approved KYC anchor not found") {
		t.Fatalf("transfer err = %v, want missing KYC anchor error", err)
	}
}

func TestTransferUpdatesBalancesRecordsTransactionAndEmitsHighRiskEvent(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContextWithMSP("tx-limits", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC), DistributorMSP)

	limit := TierLimit{Tier: TierStandard, MaxBalance: 20_000_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000}
	if err := sc.putLimit(ctx, limit); err != nil {
		t.Fatalf("put standard limit: %v", err)
	}
	if err := sc.putSystemLimit(ctx, SystemLimit{Scope: ScopePerTxAmount, Value: 9_000_000}); err != nil {
		t.Fatalf("put per-tx system limit: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "pjp-custodian", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")
	senderProfile := approvedProfile(SubjectRetailCustomer, DueDiligenceEnhanced, RiskHigh, true)
	senderProfile.ProfileID = "kyc-sender"
	senderProfile.SubjectID = "cust-sender"
	senderProfile.CreatedAt = "2026-06-27T12:00:00Z"
	senderProfile.UpdatedAt = "2026-06-27T12:00:00Z"
	if err := sc.putKycProfile(ctx, senderProfile); err != nil {
		t.Fatalf("put sender KYC profile: %v", err)
	}
	receiverProfile := approvedProfile(SubjectRetailCustomer, DueDiligenceStandard, RiskLow, false)
	receiverProfile.ProfileID = "kyc-receiver"
	receiverProfile.SubjectID = "cust-receiver"
	receiverProfile.CreatedAt = "2026-06-27T12:00:00Z"
	receiverProfile.UpdatedAt = "2026-06-27T12:00:00Z"
	if err := sc.putKycProfile(ctx, receiverProfile); err != nil {
		t.Fatalf("put receiver KYC profile: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-sender", Wallet{WalletID: "wlt-sender", OwnerID: "cust-sender", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 1_000_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put sender wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-receiver", Wallet{WalletID: "wlt-receiver", OwnerID: "cust-receiver", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 250_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put receiver wallet: %v", err)
	}

	setMockTransaction(stub, "tx-transfer", time.Date(2026, time.June, 27, 12, 10, 0, 0, time.UTC))
	receipt, err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 100_000, "transfer-ref-1")
	if err != nil {
		t.Fatalf("transfer: %v", err)
	}
	if receipt["status"] != string(TxSettled) || receipt["reference_id"] != "transfer-ref-1" {
		t.Fatalf("transfer receipt = %+v, want settled status", receipt)
	}
	setMockTransaction(stub, "tx-lower-per-tx-limit", time.Date(2026, time.June, 27, 12, 11, 0, 0, time.UTC))
	if err := sc.putSystemLimit(ctx, SystemLimit{Scope: ScopePerTxAmount, Value: 50_000}); err != nil {
		t.Fatalf("lower per-transaction limit: %v", err)
	}
	setMockTransaction(stub, "tx-transfer-replay", time.Date(2026, time.June, 27, 12, 12, 0, 0, time.UTC))
	replayed, err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 100_000, "transfer-ref-1")
	if err != nil || replayed["tx_id"] != receipt["tx_id"] {
		t.Fatalf("same-payload replay = %v, %v; want original receipt %v", replayed, err, receipt)
	}
	if _, err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 200_000, "transfer-ref-1"); err == nil || !strings.Contains(err.Error(), "different amount") {
		t.Fatalf("changed-payload replay error = %v, want payload conflict", err)
	}
	ctx.SetClientIdentity(&mockClientIdentity{mspID: CentralBankMSP})
	if _, err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 100_000, "transfer-ref-1"); err == nil || !strings.Contains(err.Error(), "custodian MSP mismatch") {
		t.Fatalf("foreign-custodian replay error = %v, want custody rejection", err)
	}
	ctx.SetClientIdentity(&mockClientIdentity{mspID: DistributorMSP})

	senderWallet, err := sc.getWallet(ctx, "wlt-sender")
	if err != nil {
		t.Fatalf("get sender wallet: %v", err)
	}
	receiverWallet, err := sc.getWallet(ctx, "wlt-receiver")
	if err != nil {
		t.Fatalf("get receiver wallet: %v", err)
	}
	if senderWallet.Balance != 900_000 || receiverWallet.Balance != 350_000 {
		t.Fatalf("wallet balances sender=%d receiver=%d, want 900000 and 350000", senderWallet.Balance, receiverWallet.Balance)
	}
	if senderWallet.DailySpent != 100_000 || senderWallet.MonthlySpent != 100_000 || receiverWallet.MonthlyReceived != 100_000 {
		t.Fatalf("wallet counters sender=%+v receiver=%+v", senderWallet, receiverWallet)
	}

	txs, err := sc.GetTransactions(ctx, "", "", "", "", "")
	if err != nil {
		t.Fatalf("get transactions: %v", err)
	}
	if len(txs) != 1 || txs[0].TransactionType != TxTransfer || txs[0].Status != TxSettled {
		t.Fatalf("transactions = %+v, want one settled transfer", txs)
	}

	events, err := sc.GetSupervisionEvents(ctx)
	if err != nil {
		t.Fatalf("get supervision events: %v", err)
	}
	found := false
	for _, event := range events {
		if event.EventType == "HIGH_RISK_TRANSFER" {
			found = true
			break
		}
	}
	if !found {
		t.Fatalf("supervision events = %+v, want HIGH_RISK_TRANSFER", events)
	}
}

/*
func TestPayQrisRequiresReference(t *testing.T) {
	sc := &SmartContract{}
	ctx, _ := newMockTransactionContextWithMSP("tx-qris", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC), DistributorMSP)

	_, err := sc.PayQris(ctx, "wlt-sender", "wlt-receiver", 100_000, "")
	if err == nil || !strings.Contains(err.Error(), "reference") {
		t.Fatalf("pay qris err = %v, want missing reference error", err)
	}
}

func TestPayQrisRecordsReferenceAndTransactionType(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContextWithMSP("tx-limits", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC), DistributorMSP)

	limit := TierLimit{Tier: TierStandard, MaxBalance: 20_000_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000}
	if err := sc.putLimit(ctx, limit); err != nil {
		t.Fatalf("put standard limit: %v", err)
	}
	if err := sc.putSystemLimit(ctx, SystemLimit{Scope: ScopePerTxAmount, Value: 9_000_000}); err != nil {
		t.Fatalf("put per-tx system limit: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "pjp-custodian", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")
	senderProfile := approvedProfile(SubjectRetailCustomer, DueDiligenceEnhanced, RiskHigh, true)
	senderProfile.ProfileID = "kyc-sender"
	senderProfile.SubjectID = "cust-sender"
	senderProfile.CreatedAt = "2026-06-27T12:00:00Z"
	senderProfile.UpdatedAt = "2026-06-27T12:00:00Z"
	if err := sc.putKycProfile(ctx, senderProfile); err != nil {
		t.Fatalf("put sender KYC profile: %v", err)
	}
	receiverProfile := approvedProfile(SubjectMerchant, DueDiligenceStandard, RiskLow, false)
	receiverProfile.ProfileID = "kyc-merchant"
	receiverProfile.SubjectID = "merchant-1"
	receiverProfile.CreatedAt = "2026-06-27T12:00:00Z"
	receiverProfile.UpdatedAt = "2026-06-27T12:00:00Z"
	if err := sc.putKycProfile(ctx, receiverProfile); err != nil {
		t.Fatalf("put merchant KYC profile: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-sender", Wallet{WalletID: "wlt-sender", OwnerID: "cust-sender", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 1_000_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put sender wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-merchant", Wallet{WalletID: "wlt-merchant", OwnerID: "merchant-1", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 250_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put merchant wallet: %v", err)
	}

	setMockTransaction(stub, "tx-qris", time.Date(2026, time.June, 27, 12, 10, 0, 0, time.UTC))
	receipt, err := sc.PayQris(ctx, "wlt-sender", "wlt-merchant", 100_000, "qris-ref-1")
	if err != nil {
		t.Fatalf("pay qris: %v", err)
	}
	if receipt["reference_id"] != "qris-ref-1" {
		t.Fatalf("qris receipt = %+v, want reference_id", receipt)
	}

	txs, err := sc.GetTransactions(ctx, "", "", "", "", "")
	if err != nil {
		t.Fatalf("get transactions: %v", err)
	}
	if len(txs) != 1 {
		t.Fatalf("transactions = %d, want 1", len(txs))
	}
	if txs[0].TransactionType != TxQrisPayment || txs[0].RelatedIntentID != "qris-ref-1" {
		t.Fatalf("transactions = %+v, want QRIS payment with reference", txs)
	}
}
*/

func TestSetAndListSystemLimits(t *testing.T) {
	sc := &SmartContract{}
	ctx, _ := newMockTransactionContext("tx-limit", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	if err := sc.SetSystemLimit(ctx, string(ScopePerTxAmount), 9_000_000); err != nil {
		t.Fatalf("set system limit: %v", err)
	}
	if err := sc.SetSystemLimit(ctx, string(ScopeGlobalSupply), 10_000_000_000); err != nil {
		t.Fatalf("set global supply limit: %v", err)
	}

	limits, err := sc.ListSystemLimits(ctx)
	if err != nil {
		t.Fatalf("list system limits: %v", err)
	}
	if len(limits) != 2 {
		t.Fatalf("system limits = %d, want 2", len(limits))
	}
}

func TestBurnPropagatesAuditWriteFailure(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-burn", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	if err := sc.putWallet(ctx, "wlt-burn", Wallet{WalletID: "wlt-burn", OwnerID: "bank_indonesia", ParticipantID: "bank_indonesia", CustodianParticipantID: "bank_indonesia", CustodianMSPID: CentralBankMSP, WalletType: WalletHot, Balance: 500_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put burn wallet: %v", err)
	}
	if err := sc.putSystemLimit(ctx, SystemLimit{Scope: ScopePerTxAmount, Value: 9_000_000}); err != nil {
		t.Fatalf("put per-tx system limit: %v", err)
	}
	stub.failPutStatePrefix("\x00audit\x00", errors.New("audit write failed"))

	if err := sc.Burn(ctx, "wlt-burn", 100_000); err == nil || !strings.Contains(err.Error(), "audit write failed") {
		t.Fatalf("burn err = %v, want audit failure", err)
	}
	txs, err := sc.GetTransactions(ctx, "", "", "", "", "")
	if err != nil {
		t.Fatalf("get transactions: %v", err)
	}
	if len(txs) != 0 {
		t.Fatalf("transactions = %+v, want no recorded burn on audit failure", txs)
	}
}

func TestTransferBelowTierMinimumDoesNotAutoRedeem(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContextWithMSP("tx-small-balance", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC), DistributorMSP)
	limit := TierLimit{Tier: TierStandard, MinBalance: 100_000, MaxBalance: 20_000_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000}
	if err := sc.putLimit(ctx, limit); err != nil {
		t.Fatalf("put standard limit: %v", err)
	}
	if err := sc.putSystemLimit(ctx, SystemLimit{Scope: ScopePerTxAmount, Value: 9_000_000}); err != nil {
		t.Fatalf("put per-tx system limit: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "pjp-custodian", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")
	for _, subjectID := range []string{"cust-sender", "cust-receiver"} {
		profile := approvedProfile(SubjectRetailCustomer, DueDiligenceStandard, RiskLow, false)
		profile.ProfileID = "kyc-" + subjectID
		profile.SubjectID = subjectID
		if err := sc.putKycProfile(ctx, profile); err != nil {
			t.Fatalf("put KYC for %s: %v", subjectID, err)
		}
	}
	for _, wallet := range []Wallet{
		{WalletID: "wlt-sender", OwnerID: "cust-sender", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, Balance: 100_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"},
		{WalletID: "wlt-receiver", OwnerID: "cust-receiver", ParticipantID: "pjp-custodian", CustodianParticipantID: "pjp-custodian", CustodianMSPID: DistributorMSP, Tier: TierStandard, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"},
	} {
		if err := sc.putWallet(ctx, wallet.WalletID, wallet); err != nil {
			t.Fatalf("put wallet %s: %v", wallet.WalletID, err)
		}
	}
	buffered := newBufferedMockStub(stub)
	ctx.SetStub(buffered)

	if _, err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 90_000, "small-balance-transfer"); err != nil {
		t.Fatalf("transfer below minimum: %v", err)
	}
	if err := buffered.Commit(); err != nil {
		t.Fatalf("commit simulated state writes: %v", err)
	}
	sender, err := sc.getWallet(ctx, "wlt-sender")
	if err != nil {
		t.Fatalf("read sender: %v", err)
	}
	receiver, err := sc.getWallet(ctx, "wlt-receiver")
	if err != nil {
		t.Fatalf("read receiver: %v", err)
	}
	if sender.Balance != 10_000 || receiver.Balance != 90_000 || sender.Balance+receiver.Balance != 100_000 {
		t.Fatalf("balances sender=%d receiver=%d, want 10000 and 90000 with unchanged supply", sender.Balance, receiver.Balance)
	}
}

func TestParticipantTransactionHistoryMatchesCustodianWallets(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-history", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))
	for _, wallet := range []Wallet{
		{WalletID: "wlt_bank-1", ParticipantID: "bank-1", CustodianParticipantID: "bank-1"},
		{WalletID: "wlt_customer-1", ParticipantID: "bank-1", CustodianParticipantID: "bank-1"},
		{WalletID: "wlt_merchant-1", ParticipantID: "bank-1", CustodianParticipantID: "bank-1"},
		{WalletID: "wlt_other", ParticipantID: "other", CustodianParticipantID: "other"},
		{WalletID: "wlt_other-2", ParticipantID: "other", CustodianParticipantID: "other"},
	} {
		if err := sc.putWallet(ctx, wallet.WalletID, wallet); err != nil {
			t.Fatalf("put wallet %s: %v", wallet.WalletID, err)
		}
	}
	setMockTransaction(stub, "tx-distribution", time.Date(2026, time.June, 27, 12, 1, 0, 0, time.UTC))
	if err := sc.recordTransaction(ctx, TxDistribution, "bi_treasury", "wlt_bank-1", 500_000, TxSettled, "distribution-1"); err != nil {
		t.Fatalf("record distribution: %v", err)
	}
	setMockTransaction(stub, "tx-retail", time.Date(2026, time.June, 27, 12, 2, 0, 0, time.UTC))
	if err := sc.recordTransaction(ctx, TxTransfer, "wlt_customer-1", "wlt_merchant-1", 25_000, TxSettled, "transfer-1"); err != nil {
		t.Fatalf("record retail transfer: %v", err)
	}
	setMockTransaction(stub, "tx-other", time.Date(2026, time.June, 27, 12, 3, 0, 0, time.UTC))
	if err := sc.recordTransaction(ctx, TxTransfer, "wlt_other", "wlt_other-2", 10_000, TxSettled, "unrelated"); err != nil {
		t.Fatalf("record unrelated transfer: %v", err)
	}

	rows, err := sc.GetTransactionHistory(ctx, "bank-1", "", "", "", "")
	if err != nil {
		t.Fatalf("get participant history: %v", err)
	}
	if len(rows) != 2 {
		t.Fatalf("participant rows = %+v, want distribution and retail transfer only", rows)
	}
	if rows[0].TransactionType != TxDistribution || rows[1].TransactionType != TxTransfer {
		t.Fatalf("participant transaction types = %s, %s", rows[0].TransactionType, rows[1].TransactionType)
	}
}

func TestTransferPropagatesAuditWriteFailure(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContextWithMSP("tx-transfer", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC), DistributorMSP)

	limit := TierLimit{Tier: TierStandard, MaxBalance: 20_000_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000}
	if err := sc.putLimit(ctx, limit); err != nil {
		t.Fatalf("put standard limit: %v", err)
	}
	if err := sc.putSystemLimit(ctx, SystemLimit{Scope: ScopePerTxAmount, Value: 9_000_000}); err != nil {
		t.Fatalf("put per-tx system limit: %v", err)
	}
	putActiveParticipant(t, sc, ctx, "pjp-custodian", ParticipantPJP, DistributorMSP, "PJPIDJAXXX")
	for _, profile := range []KycProfile{
		{ProfileID: "kyc-sender", SubjectType: SubjectRetailCustomer, SubjectID: "cust-sender", DocumentHashes: []string{"sha256:a"}, Status: KycApproved, RiskLevel: RiskLow, DueDiligenceLevel: DueDiligenceStandard, CreatedAt: "2026-06-27T12:00:00Z", UpdatedAt: "2026-06-27T12:00:00Z"},
		{ProfileID: "kyc-receiver", SubjectType: SubjectRetailCustomer, SubjectID: "cust-receiver", DocumentHashes: []string{"sha256:b"}, Status: KycApproved, RiskLevel: RiskLow, DueDiligenceLevel: DueDiligenceStandard, CreatedAt: "2026-06-27T12:00:00Z", UpdatedAt: "2026-06-27T12:00:00Z"},
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
	stub.failPutStatePrefix("\x00audit\x00", errors.New("audit write failed"))

	if _, err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 50_000, "transfer-audit-ref"); err == nil || !strings.Contains(err.Error(), "audit write failed") {
		t.Fatalf("transfer err = %v, want audit failure", err)
	}
	txs, err := sc.GetTransactions(ctx, "", "", "", "", "")
	if err != nil {
		t.Fatalf("get transactions: %v", err)
	}
	if len(txs) != 0 {
		t.Fatalf("transactions = %+v, want no recorded transfer on audit failure", txs)
	}
}
