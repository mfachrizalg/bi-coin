func (s *SmartContract) GetReconciliationReport(ctx contractapi.TransactionContextInterface) (*ReconciliationReport, error) {
	wallets, err := s.GetAllWallets(ctx)
	if err != nil {
		return nil, err
	}
	participants, err := s.getAllParticipants(ctx)
	if err != nil {
		participants = nil
	}
	var totalSupply int64
	for _, w := range wallets {
		totalSupply += w.Balance
	}
	report := ReconciliationReport{
		ReportID:     fmt.Sprintf("rec_%s", txNow(ctx).Format("20060102150405")),
		TotalSupply:  totalSupply,
		TotalIssued:  0,
		TotalBurned:  0,
		Wallets:      len(wallets),
		Participants: len(participants),
		GeneratedAt:  txNow(ctx).Format(time.RFC3339),
	}
	txIter, err := ctx.GetStub().GetStateByPartialCompositeKey("tx", []string{})
	if err == nil {
		defer txIter.Close()
		for txIter.HasNext() {
			kv, err := txIter.Next()
			if err != nil {
				continue
			}
			var tr TransactionRecord
			if err := json.Unmarshal(kv.Value, &tr); err != nil {
				continue
			}
			switch tr.TransactionType {
			case TxMint:
				report.TotalIssued += tr.Amount
			case TxBurn:
				report.TotalBurned += tr.Amount
			}
		}
	}
	return &report, nil
}

func (s *SmartContract) GetMetrics(ctx contractapi.TransactionContextInterface) (*Metrics, error) {
	wallets, err := s.GetAllWallets(ctx)
	if err != nil {
		return nil, err
	}
	participants, err := s.getAllParticipants(ctx)
	if err != nil {
		participants = nil
	}
	var totalSupply int64
	activeWallets := int64(0)
	for _, w := range wallets {
		totalSupply += w.Balance
		if !w.Frozen {
			activeWallets++
		}
	}
	activeParticipants := int64(0)
	for _, p := range participants {
		if p.Status == ParticipantActive {
			activeParticipants++
		}
	}
	m := Metrics{
		ActiveWallets:     activeWallets,
		ActiveParticipants: activeParticipants,
		TotalSupply:       totalSupply,
	}
	txIter, err := ctx.GetStub().GetStateByPartialCompositeKey("tx", []string{})
	if err == nil {
		defer txIter.Close()
		for txIter.HasNext() {
			kv, err := txIter.Next()
			if err != nil {
				continue
			}
			var tr TransactionRecord
			if err := json.Unmarshal(kv.Value, &tr); err != nil {
				continue
			}
			m.TotalTransactions++
			switch tr.Status {
			case TxSettled:
				m.SettledCount++
			case TxRejected:
				m.RejectedCount++
			}
		}
	}
	return &m, nil
}

func (s *SmartContract) emitSupervisionEvent(ctx contractapi.TransactionContextInterface, eventType string, entityType string, entityID string, data interface{}) error {
	now := txNow(ctx)
	eventID := fmt.Sprintf("sup_%s_%s", entityID, now.Format("20060102150405"))
	var dataStr string
	if data != nil {
		b, err := json.Marshal(data)
		if err != nil {
			return err
		}
		dataStr = string(b)
	}
	ev := SupervisionEvent{
		EventID:    eventID,
		EventType:  eventType,
		EntityType: entityType,
		EntityID:   entityID,
		Data:       dataStr,
		Timestamp:  now.Format(time.RFC3339),
	}
	key, err := ctx.GetStub().CreateCompositeKey("supervision", []string{entityID, eventID})
	if err != nil {
		return err
	}
	evData, err := json.Marshal(ev)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(key, evData)
}
