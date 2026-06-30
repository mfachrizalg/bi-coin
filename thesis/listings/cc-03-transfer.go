func (s *SmartContract) Transfer(ctx contractapi.TransactionContextInterface, senderID string, receiverID string, amount int64) error {
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	if senderID == receiverID {
		return fmt.Errorf("sender and receiver must differ")
	}
	sender, err := s.getWallet(ctx, senderID)
	if err != nil {
		return err
	}
	if sender.Frozen {
		return fmt.Errorf("sender wallet %s is frozen", senderID)
	}
	receiver, err := s.getWallet(ctx, receiverID)
	if err != nil {
		return err
	}
	if receiver.Frozen {
		return fmt.Errorf("receiver wallet %s is frozen", receiverID)
	}
	senderLimit, err := s.getLimit(ctx, sender.Tier)
	if err != nil {
		return err
	}
	if amount > senderLimit.PerTxLimit {
		return fmt.Errorf("per-transaction limit exceeded: %d for tier %s", senderLimit.PerTxLimit, sender.Tier)
	}
	today := txNow(ctx).Format("2006-01-02")
	s.resetSpendingIfNewDay(&sender, today)
	newDaily := sender.DailySpent + amount
	if newDaily > senderLimit.DailyTxLimit {
		return fmt.Errorf("daily transaction limit exceeded: %d for tier %s", senderLimit.DailyTxLimit, sender.Tier)
	}
	newMonthly := sender.MonthlySpent + amount
	if newMonthly > senderLimit.MonthlyTxLimit {
		return fmt.Errorf("monthly transaction limit exceeded: %d for tier %s", senderLimit.MonthlyTxLimit, sender.Tier)
	}
	if sender.Balance < amount {
		return fmt.Errorf("insufficient balance: have %d, need %d", sender.Balance, amount)
	}
	receiverLimit, err := s.getLimit(ctx, receiver.Tier)
	if err != nil {
		return err
	}
	if receiver.Balance+amount > receiverLimit.MaxBalance {
		return fmt.Errorf("transfer would exceed receiver max balance %d for tier %s", receiverLimit.MaxBalance, receiver.Tier)
	}
	sender.Balance -= amount
	sender.DailySpent = newDaily
	sender.MonthlySpent = newMonthly
	sender.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	receiver.Balance += amount
	receiver.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, senderID, sender); err != nil {
		return err
	}
	if err := s.putWallet(ctx, receiverID, receiver); err != nil {
		return err
	}
	if senderLimit.MinBalance > 0 && sender.Balance < senderLimit.MinBalance {
		policy, err := s.getAutoLimitPolicy(ctx, sender.ParticipantID)
		if err == nil && policy.AutoRedemption && sender.Balance > 0 {
			if arErr := s.autoRedeem(ctx, senderID, sender.Balance); arErr != nil {
				_ = s.emitAudit(ctx, "AUTO_REDEMPTION_FAILED", senderID, "", sender.Balance)
			}
		}
	}
	_ = s.emitAudit(ctx, "TRANSFER", senderID, receiverID, amount)
	return s.recordTransaction(ctx, TxTransfer, senderID, receiverID, amount, TxSettled, "")
}
