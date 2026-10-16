package main

import (
	"fmt"
	"time"
)

func validateKycEligibility(profile KycProfile, now time.Time) error {
	if profile.Status != KycApproved {
		return fmt.Errorf("KYC status %s does not allow spending", profile.Status)
	}
	if profile.RiskLevel == RiskProhibited {
		return fmt.Errorf("KYC risk level prohibited")
	}
	if profile.ExpiresAt != "" {
		expiresAt, err := time.Parse(time.RFC3339, profile.ExpiresAt)
		if err != nil {
			return fmt.Errorf("invalid KYC expiry: %w", err)
		}
		if !expiresAt.After(now) {
			return fmt.Errorf("KYC profile expired")
		}
	}
	if profile.RiskLevel == RiskHigh && (profile.DueDiligenceLevel != DueDiligenceEnhanced || !profile.SeniorApproval) {
		return fmt.Errorf("high-risk subject requires enhanced due diligence and senior approval")
	}
	return nil
}

func deriveWalletTier(profile KycProfile, now time.Time) (WalletTier, error) {
	if err := validateKycEligibility(profile, now); err != nil {
		return "", err
	}
	if profile.SubjectType == SubjectParticipant {
		return "", fmt.Errorf("participant wallets are outside retail KYC tiering")
	}
	if profile.SubjectType != SubjectRetailCustomer && profile.SubjectType != SubjectMerchant {
		return "", fmt.Errorf("unsupported KYC subject type: %s", profile.SubjectType)
	}

	switch profile.DueDiligenceLevel {
	case DueDiligenceSimplified:
		if profile.SubjectType != SubjectRetailCustomer || profile.RiskLevel != RiskLow {
			return "", fmt.Errorf("simplified due diligence is limited to low-risk retail customers")
		}
		return TierBasic, nil
	case DueDiligenceStandard, DueDiligenceEnhanced:
		if profile.RiskLevel != RiskLow && profile.RiskLevel != RiskMedium && profile.RiskLevel != RiskHigh {
			return "", fmt.Errorf("risk level %s is not tier-eligible", profile.RiskLevel)
		}
		if profile.SubjectType == SubjectMerchant {
			return TierMerchant, nil
		}
		return TierStandard, nil
	default:
		return "", fmt.Errorf("invalid due diligence level: %s", profile.DueDiligenceLevel)
	}
}

func applyRetailTransferPolicy(sender *Wallet, receiver *Wallet, amount int64, senderLimit TierLimit, receiverLimit TierLimit, now time.Time) error {
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	senderCopy := *sender
	receiverCopy := *receiver
	resetRetailCounters(&senderCopy, now)
	resetRetailCounters(&receiverCopy, now)

	if amount > senderLimit.PerTxLimit {
		return fmt.Errorf("per-transaction limit exceeded: %d for tier %s", senderLimit.PerTxLimit, sender.Tier)
	}
	if senderCopy.DailySpent+amount > senderLimit.DailyTxLimit {
		return fmt.Errorf("daily transaction limit exceeded: %d for tier %s", senderLimit.DailyTxLimit, sender.Tier)
	}
	if senderCopy.MonthlySpent+amount > senderLimit.MonthlyTxLimit {
		return fmt.Errorf("monthly transaction limit exceeded: %d for tier %s", senderLimit.MonthlyTxLimit, sender.Tier)
	}
	if senderCopy.Balance < amount {
		return fmt.Errorf("insufficient balance: have %d, need %d", senderCopy.Balance, amount)
	}
	if receiverCopy.Balance+amount > receiverLimit.MaxBalance {
		return fmt.Errorf("transfer would exceed receiver max balance %d for tier %s", receiverLimit.MaxBalance, receiver.Tier)
	}
	if receiverCopy.MonthlyReceived+amount > receiverLimit.MonthlyIncomingLimit {
		return fmt.Errorf("monthly incoming limit exceeded: %d for tier %s", receiverLimit.MonthlyIncomingLimit, receiver.Tier)
	}

	senderCopy.DailySpent += amount
	senderCopy.MonthlySpent += amount
	receiverCopy.MonthlyReceived += amount
	*sender = senderCopy
	*receiver = receiverCopy
	return nil
}

// applyWholesaleFundingPolicy settles a custodian reserve transfer into one of
// its retail wallets. Wholesale wallets have no retail tier or KYC profile, so
// only the receiver's retail limits apply after the system-wide amount check.
func applyWholesaleFundingPolicy(sender *Wallet, receiver *Wallet, amount int64, receiverLimit TierLimit, now time.Time) error {
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	senderCopy := *sender
	receiverCopy := *receiver
	resetRetailCounters(&receiverCopy, now)
	if senderCopy.Balance < amount {
		return fmt.Errorf("insufficient wholesale balance: have %d, need %d", senderCopy.Balance, amount)
	}
	newReceiverBalance, err := checkedAddInt64(receiverCopy.Balance, amount)
	if err != nil {
		return err
	}
	if newReceiverBalance > receiverLimit.MaxBalance {
		return fmt.Errorf("transfer would exceed receiver max balance %d for tier %s", receiverLimit.MaxBalance, receiver.Tier)
	}
	newMonthlyReceived, err := checkedAddInt64(receiverCopy.MonthlyReceived, amount)
	if err != nil {
		return err
	}
	if newMonthlyReceived > receiverLimit.MonthlyIncomingLimit {
		return fmt.Errorf("monthly incoming limit exceeded: %d for tier %s", receiverLimit.MonthlyIncomingLimit, receiver.Tier)
	}
	senderCopy.Balance, err = checkedSubInt64(senderCopy.Balance, amount)
	if err != nil {
		return err
	}
	receiverCopy.Balance = newReceiverBalance
	receiverCopy.MonthlyReceived = newMonthlyReceived
	*sender = senderCopy
	*receiver = receiverCopy
	return nil
}

func resetRetailCounters(wallet *Wallet, now time.Time) {
	day := now.Format("2006-01-02")
	month := now.Format("2006-01")
	if wallet.LastResetDay != day {
		wallet.DailySpent = 0
		wallet.LastResetDay = day
	}
	if wallet.LastResetMonth != month {
		wallet.MonthlySpent = 0
		wallet.MonthlyReceived = 0
		wallet.LastResetMonth = month
	}
}
