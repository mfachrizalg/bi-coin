package main

import (
	"strings"
	"testing"
	"time"
)

func TestSubmitAndApproveParticipantCreatesMerchantWallet(t *testing.T) {
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
	if wallet.Tier != TierMerchant || wallet.WalletType != WalletHot {
		t.Fatalf("approved participant wallet = %+v, want merchant hot wallet", wallet)
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
	ctx, stub := newMockTransactionContext("tx-submit-kyc", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	if err := sc.SubmitKycProfile(ctx, "kyc-1", string(SubjectRetailCustomer), "cust-1", `["sha256:doc1"]`); err != nil {
		t.Fatalf("submit KYC profile: %v", err)
	}
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
	ctx, stub := newMockTransactionContext("tx-kyc", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

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
}

func TestTransferRequiresApprovedKycAnchor(t *testing.T) {
	sc := &SmartContract{}
	ctx, _ := newMockTransactionContext("tx-transfer", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	if err := sc.putLimit(ctx, TierLimit{Tier: TierBasic, MaxBalance: 2_000_000, DailyTxLimit: 500_000, MonthlyTxLimit: 5_000_000, MonthlyIncomingLimit: 20_000_000, PerTxLimit: 250_000}); err != nil {
		t.Fatalf("put basic limit: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-a", Wallet{WalletID: "wlt-a", OwnerID: "cust-a", ParticipantID: "cust-a", Tier: TierBasic, Balance: 500_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put sender wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-b", Wallet{WalletID: "wlt-b", OwnerID: "cust-b", ParticipantID: "cust-b", Tier: TierBasic, Balance: 100_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put receiver wallet: %v", err)
	}

	err := sc.Transfer(ctx, "wlt-a", "wlt-b", 100_000)
	if err == nil || !strings.Contains(err.Error(), "approved KYC anchor not found") {
		t.Fatalf("transfer err = %v, want missing KYC anchor error", err)
	}
}

func TestTransferUpdatesBalancesRecordsTransactionAndEmitsHighRiskEvent(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-limits", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	limit := TierLimit{Tier: TierStandard, MaxBalance: 20_000_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000}
	if err := sc.putLimit(ctx, limit); err != nil {
		t.Fatalf("put standard limit: %v", err)
	}
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
	if err := sc.putWallet(ctx, "wlt-sender", Wallet{WalletID: "wlt-sender", OwnerID: "cust-sender", ParticipantID: "cust-sender", Tier: TierStandard, Balance: 1_000_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put sender wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-receiver", Wallet{WalletID: "wlt-receiver", OwnerID: "cust-receiver", ParticipantID: "cust-receiver", Tier: TierStandard, Balance: 250_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put receiver wallet: %v", err)
	}

	setMockTransaction(stub, "tx-transfer", time.Date(2026, time.June, 27, 12, 10, 0, 0, time.UTC))
	if err := sc.Transfer(ctx, "wlt-sender", "wlt-receiver", 100_000); err != nil {
		t.Fatalf("transfer: %v", err)
	}

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

func TestPayQrisRequiresReference(t *testing.T) {
	sc := &SmartContract{}
	ctx, _ := newMockTransactionContext("tx-qris", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	err := sc.PayQris(ctx, "wlt-sender", "wlt-receiver", 100_000, "")
	if err == nil || !strings.Contains(err.Error(), "reference") {
		t.Fatalf("pay qris err = %v, want missing reference error", err)
	}
}

func TestPayQrisRecordsReferenceAndTransactionType(t *testing.T) {
	sc := &SmartContract{}
	ctx, stub := newMockTransactionContext("tx-limits", time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC))

	limit := TierLimit{Tier: TierStandard, MaxBalance: 20_000_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 40_000_000, MonthlyIncomingLimit: 40_000_000, PerTxLimit: 2_500_000}
	if err := sc.putLimit(ctx, limit); err != nil {
		t.Fatalf("put standard limit: %v", err)
	}
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
	if err := sc.putWallet(ctx, "wlt-sender", Wallet{WalletID: "wlt-sender", OwnerID: "cust-sender", ParticipantID: "cust-sender", Tier: TierStandard, Balance: 1_000_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put sender wallet: %v", err)
	}
	if err := sc.putWallet(ctx, "wlt-merchant", Wallet{WalletID: "wlt-merchant", OwnerID: "merchant-1", ParticipantID: "merchant-1", Tier: TierStandard, Balance: 250_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"}); err != nil {
		t.Fatalf("put merchant wallet: %v", err)
	}

	setMockTransaction(stub, "tx-qris", time.Date(2026, time.June, 27, 12, 10, 0, 0, time.UTC))
	if err := sc.PayQris(ctx, "wlt-sender", "wlt-merchant", 100_000, "qris-ref-1"); err != nil {
		t.Fatalf("pay qris: %v", err)
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
