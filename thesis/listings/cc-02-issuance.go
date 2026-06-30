func (s *SmartContract) Mint(ctx contractapi.TransactionContextInterface, walletID string, amount int64) error {
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return err
	}
	if wallet.Frozen {
		return fmt.Errorf("wallet %s is frozen", walletID)
	}
	limit, err := s.getLimit(ctx, wallet.Tier)
	if err != nil {
		return err
	}
	newBalance := wallet.Balance + amount
	if newBalance > limit.MaxBalance {
		return fmt.Errorf("mint would exceed max balance %d for tier %s", limit.MaxBalance, wallet.Tier)
	}
	wallet.Balance = newBalance
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, walletID, wallet); err != nil {
		return err
	}
	_ = s.emitAudit(ctx, "MINT", walletID, "", amount)
	return s.recordTransaction(ctx, TxMint, walletID, "", amount, TxSettled, "")
}

func (s *SmartContract) Burn(ctx contractapi.TransactionContextInterface, walletID string, amount int64) error {
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	wallet, err := s.getWallet(ctx, walletID)
	if err != nil {
		return err
	}
	if wallet.Frozen {
		return fmt.Errorf("wallet %s is frozen", walletID)
	}
	if wallet.Balance < amount {
		return fmt.Errorf("insufficient balance: have %d, need %d", wallet.Balance, amount)
	}
	wallet.Balance -= amount
	wallet.UpdatedAt = txNow(ctx).Format(time.RFC3339)
	if err := s.putWallet(ctx, walletID, wallet); err != nil {
		return err
	}
	_ = s.emitAudit(ctx, "BURN", walletID, "", amount)
	return s.recordTransaction(ctx, TxBurn, walletID, "", amount, TxSettled, "")
}

func (s *SmartContract) RequestIssuance(ctx contractapi.TransactionContextInterface, participantID string, amount int64) (interface{}, error) {
	p, err := s.getParticipant(ctx, participantID)
	if err != nil {
		return nil, err
	}
	if p.ParticipantType == ParticipantPJP {
		return nil, fmt.Errorf("PJP participants cannot request direct issuance; receive liquidity via DistributeToParticipant from a bank validator")
	}
	if p.Status != "active" {
		return nil, fmt.Errorf("participant %s is not active", participantID)
	}
	walletID := fmt.Sprintf("wlt_%s", participantID)
	return nil, s.Mint(ctx, walletID, amount)
}

func (s *SmartContract) DistributeToParticipant(ctx contractapi.TransactionContextInterface, senderParticipantID string, receiverParticipantID string, amount int64) error {
	if amount <= 0 {
		return fmt.Errorf("amount must be positive")
	}
	sender, err := s.getParticipant(ctx, senderParticipantID)
	if err != nil {
		return fmt.Errorf("sender participant: %w", err)
	}
	if sender.ParticipantType != ParticipantValidator {
		return fmt.Errorf("sender %s must be a validator (bank); got %s", senderParticipantID, sender.ParticipantType)
	}
	if sender.Status != ParticipantActive {
		return fmt.Errorf("sender participant %s is not active", senderParticipantID)
	}
	receiver, err := s.getParticipant(ctx, receiverParticipantID)
	if err != nil {
		return fmt.Errorf("receiver participant: %w", err)
	}
	if receiver.ParticipantType != ParticipantPJP {
		return fmt.Errorf("receiver %s must be a PJP; got %s", receiverParticipantID, receiver.ParticipantType)
	}
	if receiver.Status != ParticipantActive {
		return fmt.Errorf("receiver participant %s is not active", receiverParticipantID)
	}
	senderWalletID := fmt.Sprintf("wlt_%s", senderParticipantID)
	receiverWalletID := fmt.Sprintf("wlt_%s", receiverParticipantID)
	if err := s.Burn(ctx, senderWalletID, amount); err != nil {
		return fmt.Errorf("burn sender: %w", err)
	}
	if err := s.Mint(ctx, receiverWalletID, amount); err != nil {
		return fmt.Errorf("mint receiver: %w", err)
	}
	_ = s.emitSupervisionEvent(ctx, "pjp_distribution", "participant", receiverParticipantID, map[string]interface{}{
		"sender":   senderParticipantID,
		"receiver": receiverParticipantID,
		"amount":   amount,
	})
	return nil
}
