package main

import (
	"encoding/json"
	"fmt"
	"math"
	"strings"

	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
	"github.com/hyperledger/fabric-protos-go-apiv2/peer"
	"google.golang.org/protobuf/proto"
)

const (
	centralBankMSP     = "CentralBankMSP"
	distributorMSP     = "DistributorMSP"
	paymentChaincode   = "rupiah-payments"
	wholesaleSupplyKey = "supply::wholesale"
	retailSupplyKey    = "supply::retail"
)

type MonetaryContract struct{ contractapi.Contract }

type balance struct {
	Amount int64  `json:"amount"`
	Kind   string `json:"kind,omitempty"`
}

type transferReceipt struct {
	Reference string `json:"reference"`
	From      string `json:"from"`
	To        string `json:"to"`
	Amount    int64  `json:"amount"`
}

type monetaryReceipt struct {
	DistributorID string `json:"distributor_id,omitempty"`
	Amount        int64  `json:"amount"`
}

func (c *MonetaryContract) Initialize(ctx contractapi.TransactionContextInterface) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	stub := ctx.GetStub()
	current, err := stub.GetState(wholesaleSupplyKey)
	if err != nil {
		return err
	}
	if current != nil {
		return fmt.Errorf("monetary state already initialized")
	}
	if err := putJSON(stub, wholesaleSupplyKey, balance{}); err != nil {
		return err
	}
	return putJSON(stub, retailSupplyKey, balance{})
}

func (c *MonetaryContract) RegisterDistributor(ctx contractapi.TransactionContextInterface, distributorID string, kind string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if strings.TrimSpace(distributorID) == "" {
		return fmt.Errorf("distributor_id is required")
	}
	if kind != "wholesale" && kind != "retail" {
		return fmt.Errorf("kind must be wholesale or retail")
	}
	key := "reserve::" + distributorID
	current, err := ctx.GetStub().GetState(key)
	if err != nil {
		return err
	}
	if current != nil {
		return fmt.Errorf("distributor %s already registered", distributorID)
	}
	return putJSON(ctx.GetStub(), key, balance{Kind: kind})
}

func (c *MonetaryContract) Issue(ctx contractapi.TransactionContextInterface, distributorID string, amount int64, reference string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" {
		return fmt.Errorf("positive amount and reference are required")
	}
	if done, err := checkReceipt(ctx, "issue", reference, distributorID, amount); err != nil || done {
		return err
	}
	reserveKey := "reserve::" + distributorID
	reserve, err := getBalance(ctx, reserveKey)
	if err != nil {
		return err
	}
	supply, err := getBalance(ctx, wholesaleSupplyKey)
	if err != nil {
		return err
	}
	reserve.Amount, err = checkedAdd(reserve.Amount, amount)
	if err != nil {
		return err
	}
	supply.Amount, err = checkedAdd(supply.Amount, amount)
	if err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), reserveKey, reserve); err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), wholesaleSupplyKey, supply); err != nil {
		return err
	}
	return saveReceipt(ctx, "issue", reference, distributorID, amount)
}

func (c *MonetaryContract) RedeemReserve(ctx contractapi.TransactionContextInterface, distributorID string, amount int64, reference string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" {
		return fmt.Errorf("positive amount and reference are required")
	}
	if done, err := checkReceipt(ctx, "redeem", reference, distributorID, amount); err != nil || done {
		return err
	}
	reserveKey := "reserve::" + distributorID
	reserve, err := getBalance(ctx, reserveKey)
	if err != nil {
		return err
	}
	supply, err := getBalance(ctx, wholesaleSupplyKey)
	if err != nil {
		return err
	}
	reserve.Amount, err = checkedSub(reserve.Amount, amount)
	if err != nil {
		return fmt.Errorf("distributor reserve: %w", err)
	}
	supply.Amount, err = checkedSub(supply.Amount, amount)
	if err != nil {
		return fmt.Errorf("wholesale supply: %w", err)
	}
	if err := putJSON(ctx.GetStub(), reserveKey, reserve); err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), wholesaleSupplyKey, supply); err != nil {
		return err
	}
	return saveReceipt(ctx, "redeem", reference, distributorID, amount)
}

func (c *MonetaryContract) TransferReserve(ctx contractapi.TransactionContextInterface, from string, to string, amount int64, reference string) error {
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return err
	}
	if err := requireDistributor(ctx, from); err != nil {
		return err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" || from == to {
		return fmt.Errorf("distinct distributors, positive amount, and reference are required")
	}
	stub := ctx.GetStub()
	receiptKey := "transfer::" + reference
	prior, err := stub.GetState(receiptKey)
	if err != nil {
		return err
	}
	if prior != nil {
		var existing transferReceipt
		if err := json.Unmarshal(prior, &existing); err != nil {
			return err
		}
		if existing.From != from || existing.To != to || existing.Amount != amount {
			return fmt.Errorf("reference %s was used for another transfer request", reference)
		}
		return nil
	}
	fromKey := "reserve::" + from
	toKey := "reserve::" + to
	source, err := getBalance(ctx, fromKey)
	if err != nil {
		return err
	}
	target, err := getBalance(ctx, toKey)
	if err != nil {
		return err
	}
	source.Amount, err = checkedSub(source.Amount, amount)
	if err != nil {
		return fmt.Errorf("distributor reserve: %w", err)
	}
	target.Amount, err = checkedAdd(target.Amount, amount)
	if err != nil {
		return err
	}
	if err := putJSON(stub, fromKey, source); err != nil {
		return err
	}
	if err := putJSON(stub, toKey, target); err != nil {
		return err
	}
	return putJSON(stub, receiptKey, transferReceipt{Reference: reference, From: from, To: to, Amount: amount})
}

// DebitReserveForConversion is accepted only as a nested call from the payment chaincode.
func (c *MonetaryContract) DebitReserveForConversion(ctx contractapi.TransactionContextInterface, distributorID string, amount int64, reference string) error {
	if err := requireTopLevel(ctx, paymentChaincode, "ConvertToRetail"); err != nil {
		return err
	}
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return err
	}
	if err := requireDistributor(ctx, distributorID); err != nil {
		return err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" {
		return fmt.Errorf("positive amount and reference are required")
	}
	reserveKey := "reserve::" + distributorID
	reserve, err := getBalance(ctx, reserveKey)
	if err != nil {
		return err
	}
	if reserve.Kind != "retail" {
		return fmt.Errorf("conversion requires a retail bank")
	}
	if done, err := checkReceipt(ctx, "conversion", reference, distributorID, amount); err != nil || done {
		return err
	}
	wholesale, err := getBalance(ctx, wholesaleSupplyKey)
	if err != nil {
		return err
	}
	retail, err := getBalance(ctx, retailSupplyKey)
	if err != nil {
		return err
	}
	reserve.Amount, err = checkedSub(reserve.Amount, amount)
	if err != nil {
		return fmt.Errorf("distributor reserve: %w", err)
	}
	wholesale.Amount, err = checkedSub(wholesale.Amount, amount)
	if err != nil {
		return fmt.Errorf("wholesale supply: %w", err)
	}
	retail.Amount, err = checkedAdd(retail.Amount, amount)
	if err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), reserveKey, reserve); err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), wholesaleSupplyKey, wholesale); err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), retailSupplyKey, retail); err != nil {
		return err
	}
	return saveReceipt(ctx, "conversion", reference, distributorID, amount)
}

func (c *MonetaryContract) GetWholesaleSupply(ctx contractapi.TransactionContextInterface) (int64, error) {
	value, err := getBalance(ctx, wholesaleSupplyKey)
	return value.Amount, err
}

func (c *MonetaryContract) GetRetailSupply(ctx contractapi.TransactionContextInterface) (int64, error) {
	value, err := getBalance(ctx, retailSupplyKey)
	return value.Amount, err
}

func (c *MonetaryContract) GetTotalSupply(ctx contractapi.TransactionContextInterface) (int64, error) {
	wholesale, err := getBalance(ctx, wholesaleSupplyKey)
	if err != nil {
		return 0, err
	}
	retail, err := getBalance(ctx, retailSupplyKey)
	if err != nil {
		return 0, err
	}
	return checkedAdd(wholesale.Amount, retail.Amount)
}

func (c *MonetaryContract) GetReserve(ctx contractapi.TransactionContextInterface, distributorID string) (int64, error) {
	value, err := getBalance(ctx, "reserve::"+distributorID)
	return value.Amount, err
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

func requireDistributor(ctx contractapi.TransactionContextInterface, id string) error {
	identity := ctx.GetClientIdentity()
	if identity == nil {
		return fmt.Errorf("client identity unavailable")
	}
	value, found, err := identity.GetAttributeValue("distributor_id")
	if err != nil {
		return err
	}
	if !found || value != id {
		return fmt.Errorf("access denied for distributor %s", id)
	}
	return nil
}

func requireTopLevel(ctx contractapi.TransactionContextInterface, chaincode string, transaction string) error {
	signed, err := ctx.GetStub().GetSignedProposal()
	if err != nil || signed == nil {
		return fmt.Errorf("signed proposal unavailable")
	}
	var proposal peer.Proposal
	if err := proto.Unmarshal(signed.ProposalBytes, &proposal); err != nil {
		return fmt.Errorf("decode signed proposal: %w", err)
	}
	var payload peer.ChaincodeProposalPayload
	if err := proto.Unmarshal(proposal.Payload, &payload); err != nil {
		return fmt.Errorf("decode chaincode proposal: %w", err)
	}
	var invocation peer.ChaincodeInvocationSpec
	if err := proto.Unmarshal(payload.Input, &invocation); err != nil || invocation.ChaincodeSpec == nil || invocation.ChaincodeSpec.ChaincodeId == nil {
		return fmt.Errorf("decode top-level invocation")
	}
	args := invocation.ChaincodeSpec.Input.Args
	if invocation.ChaincodeSpec.ChaincodeId.Name != chaincode || len(args) == 0 || !functionMatches(string(args[0]), transaction) {
		return fmt.Errorf("%s is callable only through %s.%s", transaction, chaincode, transaction)
	}
	return nil
}

func functionMatches(actual string, expected string) bool {
	if actual == expected {
		return true
	}
	_, suffix, ok := strings.Cut(actual, ":")
	return ok && suffix == expected
}

func getBalance(ctx contractapi.TransactionContextInterface, key string) (balance, error) {
	data, err := ctx.GetStub().GetState(key)
	if err != nil {
		return balance{}, err
	}
	if data == nil {
		return balance{}, fmt.Errorf("state %s not found", key)
	}
	var result balance
	if err := json.Unmarshal(data, &result); err != nil {
		return balance{}, err
	}
	return result, nil
}

func putJSON(stub shim.ChaincodeStubInterface, key string, value any) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return stub.PutState(key, data)
}

func checkReceipt(ctx contractapi.TransactionContextInterface, operation string, reference string, distributorID string, amount int64) (bool, error) {
	key := "monetary::reference::" + operation + "::" + reference
	data, err := ctx.GetStub().GetState(key)
	if err != nil || data == nil {
		return false, err
	}
	var prior monetaryReceipt
	if err := json.Unmarshal(data, &prior); err != nil {
		return false, err
	}
	if prior.DistributorID != distributorID || prior.Amount != amount {
		return false, fmt.Errorf("reference %s was used for another monetary operation", reference)
	}
	return true, nil
}

func saveReceipt(ctx contractapi.TransactionContextInterface, operation string, reference string, distributorID string, amount int64) error {
	key := "monetary::reference::" + operation + "::" + reference
	return putJSON(ctx.GetStub(), key, monetaryReceipt{DistributorID: distributorID, Amount: amount})
}

func checkedAdd(left int64, right int64) (int64, error) {
	if right > 0 && left > math.MaxInt64-right {
		return 0, fmt.Errorf("integer overflow")
	}
	return left + right, nil
}

func checkedSub(left int64, right int64) (int64, error) {
	if right < 0 || left < right {
		return 0, fmt.Errorf("insufficient balance")
	}
	return left - right, nil
}
