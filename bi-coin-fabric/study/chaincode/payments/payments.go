package main

import (
	"encoding/json"
	"fmt"
	"math"
	"strings"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

const (
	distributorMSP    = "DistributorMSP"
	endUserMSP        = "EndUserMSP"
	controlsChaincode = "rupiah-controls"
	monetaryChaincode = "rupiah-monetary"
	channelName       = "rupiah-study"
)

type PaymentsContract struct{ contractapi.Contract }

type wallet struct {
	SubjectID string `json:"subject_id"`
	Balance   int64  `json:"balance"`
}

type paymentReceipt struct {
	Reference string `json:"reference"`
	From      string `json:"from"`
	To        string `json:"to"`
	Amount    int64  `json:"amount"`
	Kind      string `json:"kind"`
}

type limitProfile struct {
	PerTransaction int64 `json:"per_transaction"`
	Daily          int64 `json:"daily"`
	Monthly        int64 `json:"monthly"`
	Holdings       int64 `json:"holdings"`
}

type usage struct {
	Amount int64 `json:"amount"`
}

func (c *PaymentsContract) OpenWallet(ctx contractapi.TransactionContextInterface, subjectID string) error {
	if err := requireMSP(ctx, endUserMSP); err != nil {
		return err
	}
	canPay, err := invokeBool(ctx, controlsChaincode, "CanPay", subjectID)
	if err != nil {
		return err
	}
	canAct, err := invokeBool(ctx, controlsChaincode, "CanActFor", subjectID)
	if err != nil {
		return err
	}
	if !canPay || !canAct {
		return fmt.Errorf("subject is not eligible to open a wallet")
	}
	if _, err := invokeLimits(ctx, subjectID); err != nil {
		return err
	}
	key := walletKey(subjectID)
	if existing, err := ctx.GetStub().GetState(key); err != nil {
		return err
	} else if existing != nil {
		return fmt.Errorf("wallet already exists")
	}
	return putJSON(ctx.GetStub(), key, wallet{SubjectID: subjectID, Balance: 0})
}

func (c *PaymentsContract) Transfer(ctx contractapi.TransactionContextInterface, from string, to string, amount int64, reference string) (paymentReceipt, error) {
	if err := requireMSP(ctx, endUserMSP); err != nil {
		return paymentReceipt{}, err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" || from == to {
		return paymentReceipt{}, fmt.Errorf("distinct subjects, positive amount, and reference are required")
	}
	if receipt, found, err := existingReceipt(ctx, reference); err != nil || found {
		if found && receipt.From == from && receipt.To == to && receipt.Amount == amount && receipt.Kind == "transfer" {
			return receipt, nil
		}
		if found {
			return paymentReceipt{}, fmt.Errorf("reference was used for another operation")
		}
		return paymentReceipt{}, err
	}
	canAct, err := invokeBool(ctx, controlsChaincode, "CanActFor", from)
	if err != nil {
		return paymentReceipt{}, err
	}
	if !canAct {
		return paymentReceipt{}, fmt.Errorf("caller cannot act for sender")
	}
	for _, subject := range []string{from, to} {
		eligible, err := invokeBool(ctx, controlsChaincode, "CanPay", subject)
		if err != nil {
			return paymentReceipt{}, err
		}
		if !eligible {
			return paymentReceipt{}, fmt.Errorf("subject %s is not eligible to pay or receive", subject)
		}
	}
	senderLimits, err := invokeLimits(ctx, from)
	if err != nil {
		return paymentReceipt{}, err
	}
	receiverLimits, err := invokeLimits(ctx, to)
	if err != nil {
		return paymentReceipt{}, err
	}
	if amount > senderLimits.PerTransaction {
		return paymentReceipt{}, fmt.Errorf("amount exceeds per-transaction limit")
	}
	stub := ctx.GetStub()
	sender, err := getWallet(stub, from)
	if err != nil {
		return paymentReceipt{}, err
	}
	receiver, err := getWallet(stub, to)
	if err != nil {
		return paymentReceipt{}, err
	}
	sender.Balance, err = checkedSub(sender.Balance, amount)
	if err != nil {
		return paymentReceipt{}, err
	}
	receiver.Balance, err = checkedAdd(receiver.Balance, amount)
	if err != nil {
		return paymentReceipt{}, err
	}
	if receiver.Balance > receiverLimits.Holdings {
		return paymentReceipt{}, fmt.Errorf("recipient holdings limit exceeded")
	}
	if err := addUsage(ctx, from, amount, senderLimits); err != nil {
		return paymentReceipt{}, err
	}
	receipt := paymentReceipt{Reference: reference, From: from, To: to, Amount: amount, Kind: "transfer"}
	if err := putJSON(stub, walletKey(from), sender); err != nil {
		return paymentReceipt{}, err
	}
	if err := putJSON(stub, walletKey(to), receiver); err != nil {
		return paymentReceipt{}, err
	}
	if err := putJSON(stub, receiptKey(reference), receipt); err != nil {
		return paymentReceipt{}, err
	}
	return receipt, nil
}

func (c *PaymentsContract) FundFromReserve(ctx contractapi.TransactionContextInterface, subjectID string, distributorID string, amount int64, reference string) (paymentReceipt, error) {
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return paymentReceipt{}, err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" {
		return paymentReceipt{}, fmt.Errorf("positive amount and reference are required")
	}
	if receipt, found, err := existingReceipt(ctx, reference); err != nil || found {
		if found && receipt.To == subjectID && receipt.From == distributorID && receipt.Amount == amount && receipt.Kind == "funding" {
			return receipt, nil
		}
		if found {
			return paymentReceipt{}, fmt.Errorf("reference was used for another operation")
		}
		return paymentReceipt{}, err
	}
	eligible, err := invokeBool(ctx, controlsChaincode, "CanPay", subjectID)
	if err != nil {
		return paymentReceipt{}, err
	}
	if !eligible {
		return paymentReceipt{}, fmt.Errorf("subject is not eligible for funding")
	}
	limits, err := invokeLimits(ctx, subjectID)
	if err != nil {
		return paymentReceipt{}, err
	}
	value, err := getWallet(ctx.GetStub(), subjectID)
	if err != nil {
		return paymentReceipt{}, err
	}
	if value.Balance+amount < value.Balance || value.Balance+amount > limits.Holdings {
		return paymentReceipt{}, fmt.Errorf("recipient holdings limit exceeded")
	}
	response := ctx.GetStub().InvokeChaincode(monetaryChaincode, [][]byte{
		[]byte("DebitReserveForFunding"), []byte(distributorID), []byte(subjectID), []byte(fmt.Sprint(amount)), []byte(reference),
	}, channelName)
	if response.Status != shim.OK {
		return paymentReceipt{}, fmt.Errorf("monetary debit failed: %s", response.Message)
	}
	value.Balance, err = checkedAdd(value.Balance, amount)
	if err != nil {
		return paymentReceipt{}, err
	}
	receipt := paymentReceipt{Reference: reference, From: distributorID, To: subjectID, Amount: amount, Kind: "funding"}
	if err := putJSON(ctx.GetStub(), walletKey(subjectID), value); err != nil {
		return paymentReceipt{}, err
	}
	if err := putJSON(ctx.GetStub(), receiptKey(reference), receipt); err != nil {
		return paymentReceipt{}, err
	}
	return receipt, nil
}

func (c *PaymentsContract) GetBalance(ctx contractapi.TransactionContextInterface, subjectID string) (int64, error) {
	canAct, err := invokeBool(ctx, controlsChaincode, "CanActFor", subjectID)
	if err != nil {
		return 0, err
	}
	if !canAct {
		return 0, fmt.Errorf("caller cannot view this wallet")
	}
	value, err := getWallet(ctx.GetStub(), subjectID)
	return value.Balance, err
}

func (c *PaymentsContract) GetReceipt(ctx contractapi.TransactionContextInterface, reference string) (paymentReceipt, error) {
	var receipt paymentReceipt
	if err := getJSON(ctx.GetStub(), receiptKey(reference), &receipt); err != nil {
		return paymentReceipt{}, err
	}
	return receipt, nil
}

func invokeBool(ctx contractapi.TransactionContextInterface, chaincode string, function string, args ...string) (bool, error) {
	input := [][]byte{[]byte(function)}
	for _, arg := range args {
		input = append(input, []byte(arg))
	}
	response := ctx.GetStub().InvokeChaincode(chaincode, input, channelName)
	if response.Status != shim.OK {
		return false, fmt.Errorf("%s.%s failed: %s", chaincode, function, response.Message)
	}
	var result bool
	if err := json.Unmarshal(response.Payload, &result); err != nil {
		return false, fmt.Errorf("decode %s.%s result: %w", chaincode, function, err)
	}
	return result, nil
}

func invokeLimits(ctx contractapi.TransactionContextInterface, subjectID string) (limitProfile, error) {
	response := ctx.GetStub().InvokeChaincode(controlsChaincode, [][]byte{[]byte("GetLimits"), []byte(subjectID)}, channelName)
	if response.Status != shim.OK {
		return limitProfile{}, fmt.Errorf("controls.GetLimits failed: %s", response.Message)
	}
	var limits limitProfile
	if err := json.Unmarshal(response.Payload, &limits); err != nil {
		return limitProfile{}, fmt.Errorf("decode control limits: %w", err)
	}
	return limits, nil
}

func addUsage(ctx contractapi.TransactionContextInterface, subjectID string, amount int64, limits limitProfile) error {
	timestamp, err := ctx.GetStub().GetTxTimestamp()
	if err != nil {
		return err
	}
	when := time.Unix(timestamp.Seconds, int64(timestamp.Nanos)).UTC()
	dayKey := fmt.Sprintf("usage::day::%s::%s", subjectID, when.Format("2006-01-02"))
	monthKey := fmt.Sprintf("usage::month::%s::%s", subjectID, when.Format("2006-01"))
	day, err := getUsage(ctx.GetStub(), dayKey)
	if err != nil {
		return err
	}
	month, err := getUsage(ctx.GetStub(), monthKey)
	if err != nil {
		return err
	}
	day.Amount, err = checkedAdd(day.Amount, amount)
	if err != nil || day.Amount > limits.Daily {
		return fmt.Errorf("daily payment limit exceeded")
	}
	month.Amount, err = checkedAdd(month.Amount, amount)
	if err != nil || month.Amount > limits.Monthly {
		return fmt.Errorf("monthly payment limit exceeded")
	}
	if err := putJSON(ctx.GetStub(), dayKey, day); err != nil {
		return err
	}
	return putJSON(ctx.GetStub(), monthKey, month)
}

func getUsage(stub shim.ChaincodeStubInterface, key string) (usage, error) {
	data, err := stub.GetState(key)
	if err != nil {
		return usage{}, err
	}
	if data == nil {
		return usage{}, nil
	}
	var value usage
	if err := json.Unmarshal(data, &value); err != nil {
		return usage{}, err
	}
	return value, nil
}

func requireMSP(ctx contractapi.TransactionContextInterface, allowed string) error {
	identity := ctx.GetClientIdentity()
	if identity == nil {
		return fmt.Errorf("client identity unavailable")
	}
	mspID, err := identity.GetMSPID()
	if err != nil {
		return err
	}
	if mspID != allowed {
		return fmt.Errorf("access denied for MSP %s", mspID)
	}
	return nil
}

func walletKey(subjectID string) string  { return "wallet::" + subjectID }
func receiptKey(reference string) string { return "receipt::" + reference }

func getWallet(stub shim.ChaincodeStubInterface, subjectID string) (wallet, error) {
	var value wallet
	if err := getJSON(stub, walletKey(subjectID), &value); err != nil {
		return wallet{}, err
	}
	return value, nil
}

func existingReceipt(ctx contractapi.TransactionContextInterface, reference string) (paymentReceipt, bool, error) {
	data, err := ctx.GetStub().GetState(receiptKey(reference))
	if err != nil || data == nil {
		return paymentReceipt{}, false, err
	}
	var receipt paymentReceipt
	if err := json.Unmarshal(data, &receipt); err != nil {
		return paymentReceipt{}, false, err
	}
	return receipt, true, nil
}

func getJSON(stub shim.ChaincodeStubInterface, key string, target any) error {
	data, err := stub.GetState(key)
	if err != nil {
		return err
	}
	if data == nil {
		return fmt.Errorf("state not found")
	}
	return json.Unmarshal(data, target)
}

func putJSON(stub shim.ChaincodeStubInterface, key string, value any) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return stub.PutState(key, data)
}

func checkedAdd(left int64, right int64) (int64, error) {
	if right > 0 && left > math.MaxInt64-right {
		return 0, fmt.Errorf("integer overflow")
	}
	return left + right, nil
}

func checkedSub(left int64, right int64) (int64, error) {
	if left < right {
		return 0, fmt.Errorf("insufficient balance")
	}
	return left - right, nil
}
