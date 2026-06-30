func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	limits := []TierLimit{
		{Tier: TierBasic, MaxBalance: 1_000_000, MinBalance: 0, DailyTxLimit: 500_000, MonthlyTxLimit: 5_000_000, PerTxLimit: 250_000},
		{Tier: TierStandard, MaxBalance: 50_000_000, MinBalance: 100_000, DailyTxLimit: 10_000_000, MonthlyTxLimit: 100_000_000, PerTxLimit: 2_500_000},
		{Tier: TierMerchant, MaxBalance: 200_000_000, MinBalance: 500_000, DailyTxLimit: 50_000_000, MonthlyTxLimit: 500_000_000, PerTxLimit: 10_000_000},
	}
	for _, limit := range limits {
		if err := s.putLimit(ctx, limit); err != nil {
			return err
		}
	}

	now := txNow(ctx)

	biWallet := Wallet{
		OwnerID:       "bank_indonesia",
		ParticipantID: "bank_indonesia",
		Tier:          TierMerchant,
		WalletType:    WalletHot,
		Balance:       0,
		LastResetDay:  now.Format("2006-01-02"),
		CreatedAt:     now.Format(time.RFC3339),
		UpdatedAt:     now.Format(time.RFC3339),
	}
	if err := s.putWallet(ctx, "bi_treasury", biWallet); err != nil {
		return err
	}

	sysLimits := []SystemLimit{
		{Scope: ScopeGlobalSupply, Value: 10_000_000_000_000},
		{Scope: ScopePerParticipantBalance, Value: 1_000_000_000_000},
		{Scope: ScopePerTxAmount, Value: 100_000_000_000},
	}
	for _, sl := range sysLimits {
		if err := s.putSystemLimit(ctx, sl); err != nil {
			return err
		}
	}

	return nil
}
