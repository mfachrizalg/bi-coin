package main

import (
	"strings"
	"testing"
	"time"
)

func TestDeriveWalletTierFromKycPolicy(t *testing.T) {
	now := time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC)
	tests := []struct {
		name    string
		profile KycProfile
		want    WalletTier
		wantErr string
	}{
		{
			name:    "low risk retail with simplified due diligence is basic",
			profile: approvedProfile(SubjectRetailCustomer, DueDiligenceSimplified, RiskLow, false),
			want:    TierBasic,
		},
		{
			name:    "medium risk retail with standard due diligence is standard",
			profile: approvedProfile(SubjectRetailCustomer, DueDiligenceStandard, RiskMedium, false),
			want:    TierStandard,
		},
		{
			name:    "medium risk merchant with standard due diligence is merchant",
			profile: approvedProfile(SubjectMerchant, DueDiligenceStandard, RiskMedium, false),
			want:    TierMerchant,
		},
		{
			name:    "high risk retail requires enhanced due diligence and senior approval",
			profile: approvedProfile(SubjectRetailCustomer, DueDiligenceEnhanced, RiskHigh, true),
			want:    TierStandard,
		},
		{
			name:    "high risk merchant requires senior approval",
			profile: approvedProfile(SubjectMerchant, DueDiligenceEnhanced, RiskHigh, false),
			wantErr: "senior approval",
		},
		{
			name:    "participant is outside retail tiering",
			profile: approvedProfile(SubjectParticipant, DueDiligenceEnhanced, RiskLow, true),
			wantErr: "participant",
		},
		{
			name:    "prohibited risk is never eligible",
			profile: approvedProfile(SubjectRetailCustomer, DueDiligenceEnhanced, RiskProhibited, true),
			wantErr: "prohibited",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := deriveWalletTier(tt.profile, now)
			if tt.wantErr != "" {
				if err == nil || !strings.Contains(strings.ToLower(err.Error()), tt.wantErr) {
					t.Fatalf("expected error containing %q, got %v", tt.wantErr, err)
				}
				return
			}
			if err != nil {
				t.Fatalf("derive tier: %v", err)
			}
			if got != tt.want {
				t.Fatalf("tier = %s, want %s", got, tt.want)
			}
		})
	}
}

func TestValidateRetailTransferLimits(t *testing.T) {
	now := time.Date(2026, time.June, 27, 12, 0, 0, 0, time.UTC)
	limit := TierLimit{
		Tier:                 TierBasic,
		MaxBalance:           2_000_000,
		DailyTxLimit:         500_000,
		MonthlyTxLimit:       5_000_000,
		MonthlyIncomingLimit: 20_000_000,
		PerTxLimit:           250_000,
	}

	tests := []struct {
		name     string
		amount   int64
		sender   Wallet
		receiver Wallet
		wantErr  string
	}{
		{
			name:     "within all limits",
			amount:   100_000,
			sender:   Wallet{Balance: 500_000, DailySpent: 100_000, MonthlySpent: 200_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"},
			receiver: Wallet{Balance: 500_000, MonthlyReceived: 1_000_000, LastResetMonth: "2026-06"},
		},
		{
			name:     "per transaction limit",
			amount:   250_001,
			sender:   Wallet{Balance: 500_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"},
			receiver: Wallet{LastResetMonth: "2026-06"},
			wantErr:  "per-transaction",
		},
		{
			name:     "monthly incoming limit",
			amount:   100_000,
			sender:   Wallet{Balance: 500_000, LastResetDay: "2026-06-27", LastResetMonth: "2026-06"},
			receiver: Wallet{MonthlyReceived: 19_950_000, LastResetMonth: "2026-06"},
			wantErr:  "monthly incoming",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			sender := tt.sender
			receiver := tt.receiver
			err := applyRetailTransferPolicy(&sender, &receiver, tt.amount, limit, limit, now)
			if tt.wantErr != "" {
				if err == nil || !strings.Contains(err.Error(), tt.wantErr) {
					t.Fatalf("expected error containing %q, got %v", tt.wantErr, err)
				}
				return
			}
			if err != nil {
				t.Fatalf("apply transfer policy: %v", err)
			}
			if sender.DailySpent != tt.sender.DailySpent+tt.amount || sender.MonthlySpent != tt.sender.MonthlySpent+tt.amount {
				t.Fatalf("sender counters not updated: %+v", sender)
			}
			if receiver.MonthlyReceived != tt.receiver.MonthlyReceived+tt.amount {
				t.Fatalf("receiver monthly incoming not updated: %+v", receiver)
			}
		})
	}
}

func approvedProfile(subject KycSubjectType, diligence DueDiligenceLevel, risk KycRiskLevel, seniorApproval bool) KycProfile {
	return KycProfile{
		SubjectType:       subject,
		Status:            KycApproved,
		RiskLevel:         risk,
		DueDiligenceLevel: diligence,
		SeniorApproval:    seniorApproval,
		ExpiresAt:         "2027-06-27T12:00:00Z",
	}
}
