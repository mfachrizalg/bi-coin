package models

import (
	"encoding/json"
	"strconv"
)

func marshalMoney(value interface{}, amounts map[string]int64) ([]byte, error) {
	encoded, err := json.Marshal(value)
	if err != nil {
		return nil, err
	}
	var object map[string]interface{}
	if err := json.Unmarshal(encoded, &object); err != nil {
		return nil, err
	}
	for key, amount := range amounts {
		object[key] = strconv.FormatInt(amount, 10)
	}
	return json.Marshal(object)
}

func (value Wallet) MarshalJSON() ([]byte, error) {
	type plain Wallet
	return marshalMoney(plain(value), map[string]int64{
		"balance": value.Balance, "daily_spent": value.DailySpent,
		"monthly_spent": value.MonthlySpent, "monthly_received": value.MonthlyReceived,
	})
}

func (value *Wallet) UnmarshalJSON(data []byte) error {
	var payload struct {
		WalletID        string          `json:"wallet_id"`
		OwnerID         string          `json:"owner_id"`
		ParticipantID   string          `json:"participant_id"`
		Tier            string          `json:"tier"`
		WalletType      WalletType      `json:"wallet_type"`
		Balance         json.RawMessage `json:"balance"`
		Frozen          bool            `json:"frozen"`
		DailySpent      json.RawMessage `json:"daily_spent"`
		MonthlySpent    json.RawMessage `json:"monthly_spent"`
		MonthlyReceived json.RawMessage `json:"monthly_received"`
		CreatedAt       string          `json:"created_at"`
		UpdatedAt       string          `json:"updated_at"`
	}
	if err := json.Unmarshal(data, &payload); err != nil {
		return err
	}
	balance, err := decodeMoneyInt64(payload.Balance)
	if err != nil {
		return err
	}
	dailySpent, err := decodeMoneyInt64(payload.DailySpent)
	if err != nil {
		return err
	}
	monthlySpent, err := decodeMoneyInt64(payload.MonthlySpent)
	if err != nil {
		return err
	}
	monthlyReceived, err := decodeMoneyInt64(payload.MonthlyReceived)
	if err != nil {
		return err
	}
	*value = Wallet{
		WalletID: payload.WalletID, OwnerID: payload.OwnerID, ParticipantID: payload.ParticipantID,
		Tier: payload.Tier, WalletType: payload.WalletType, Balance: balance, Frozen: payload.Frozen,
		DailySpent: dailySpent, MonthlySpent: monthlySpent, MonthlyReceived: monthlyReceived,
		CreatedAt: payload.CreatedAt, UpdatedAt: payload.UpdatedAt,
	}
	return nil
}

func (value Participant) MarshalJSON() ([]byte, error) {
	type plain Participant
	return marshalMoney(plain(value), map[string]int64{"reserve_balance": value.ReserveBalance})
}

func (value SystemLimit) MarshalJSON() ([]byte, error) {
	type plain SystemLimit
	return marshalMoney(plain(value), map[string]int64{"value": value.Value})
}

func (value Balance) MarshalJSON() ([]byte, error) {
	type plain Balance
	return marshalMoney(plain(value), map[string]int64{"balance": value.Balance, "reserve_balance": value.ReserveBalance})
}

func (value TransferResult) MarshalJSON() ([]byte, error) {
	type plain TransferResult
	return marshalMoney(plain(value), map[string]int64{"amount": value.Amount})
}

func decodeMoneyInt64(raw json.RawMessage) (int64, error) {
	if len(raw) == 0 || string(raw) == "null" {
		return 0, nil
	}
	if raw[0] == '"' {
		var encoded string
		if err := json.Unmarshal(raw, &encoded); err != nil {
			return 0, err
		}
		return strconv.ParseInt(encoded, 10, 64)
	}
	var amount int64
	if err := json.Unmarshal(raw, &amount); err != nil {
		return 0, err
	}
	return amount, nil
}

func (value *TransferResult) UnmarshalJSON(data []byte) error {
	var payload struct {
		Status      string          `json:"status"`
		TxID        string          `json:"tx_id"`
		ReferenceID string          `json:"reference_id"`
		SenderID    string          `json:"sender_id"`
		ReceiverID  string          `json:"receiver_id"`
		Amount      json.RawMessage `json:"amount"`
	}
	if err := json.Unmarshal(data, &payload); err != nil {
		return err
	}
	amount, err := decodeMoneyInt64(payload.Amount)
	if err != nil {
		return err
	}
	*value = TransferResult{Status: payload.Status, TxID: payload.TxID, ReferenceID: payload.ReferenceID, SenderID: payload.SenderID, ReceiverID: payload.ReceiverID, Amount: amount}
	return nil
}

func (value *MetricsReport) UnmarshalJSON(data []byte) error {
	var payload struct {
		TotalTransactions  int             `json:"total_transactions"`
		ActiveWallets      int             `json:"active_wallets"`
		ActiveParticipants int             `json:"active_participants"`
		TotalSupply        json.RawMessage `json:"total_supply"`
		GeneratedAt        string          `json:"generated_at"`
	}
	if err := json.Unmarshal(data, &payload); err != nil {
		return err
	}
	totalSupply, err := decodeMoneyInt64(payload.TotalSupply)
	if err != nil {
		return err
	}
	*value = MetricsReport{
		TotalParticipants: payload.ActiveParticipants,
		ActiveWallets:     payload.ActiveWallets,
		TotalSupply:       totalSupply,
		TotalTransfers:    payload.TotalTransactions,
		GeneratedAt:       payload.GeneratedAt,
	}
	return nil
}

func (value TransactionRecord) MarshalJSON() ([]byte, error) {
	type plain TransactionRecord
	return marshalMoney(plain(value), map[string]int64{"amount": value.Amount})
}

func (value QrisIntent) MarshalJSON() ([]byte, error) {
	type plain QrisIntent
	return marshalMoney(plain(value), map[string]int64{"amount": value.Amount})
}

func (value ReconciliationReport) MarshalJSON() ([]byte, error) {
	type plain ReconciliationReport
	return marshalMoney(plain(value), map[string]int64{
		"total_supply": value.TotalSupply, "total_reserves": value.TotalReserves,
		"pending_issuance": value.PendingIssuance,
	})
}

func (value MetricsReport) MarshalJSON() ([]byte, error) {
	type plain MetricsReport
	return marshalMoney(plain(value), map[string]int64{"total_supply": value.TotalSupply})
}
