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
	centralBankMSP   = "CentralBankMSP"
	distributorMSP   = "DistributorMSP"
	paymentChaincode = "rupiah-payments"
	treasuryKey      = "monetary::treasury"
	supplyKey        = "monetary::supply"
)

type MonetaryContract struct{ contractapi.Contract }

type balance struct {
	Amount int64 `json:"amount"`
}

type fundingReceipt struct {
	Reference     string `json:"reference"`
	DistributorID string `json:"distributor_id"`
	SubjectID     string `json:"subject_id"`
	Amount        int64  `json:"amount"`
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
	current, err := stub.GetState(treasuryKey)
	if err != nil {
		return err
	}
	if current != nil {
		return fmt.Errorf("monetary state already initialized")
	}
	if err := putJSON(stub, treasuryKey, balance{}); err != nil {
		return err
	}
	return putJSON(stub, supplyKey, balance{})
}

func (c *MonetaryContract) RegisterDistributor(ctx contractapi.TransactionContextInterface, distributorID string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if strings.TrimSpace(distributorID) == "" {
		return fmt.Errorf("distributor_id is required")
	}
	key := "reserve::" + distributorID
	current, err := ctx.GetStub().GetState(key)
	if err != nil {
		return err
	}
	if current != nil {
		return fmt.Errorf("distributor %s already registered", distributorID)
	}
	return putJSON(ctx.GetStub(), key, balance{})
}

func (c *MonetaryContract) Mint(ctx contractapi.TransactionContextInterface, amount int64, reference string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" {
		return fmt.Errorf("positive amount and reference are required")
	}
	if done, err := checkReceipt(ctx, "mint", reference, "", amount); err != nil || done {
		return err
	}
	treasury, err := getBalance(ctx, treasuryKey)
	if err != nil {
		return err
	}
	treasury.Amount, err = checkedAdd(treasury.Amount, amount)
	if err != nil {
		return err
	}
	supply, err := getBalance(ctx, supplyKey)
	if err != nil {
		return err
	}
	supply.Amount, err = checkedAdd(supply.Amount, amount)
	if err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), treasuryKey, treasury); err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), supplyKey, supply); err != nil {
		return err
	}
	return saveReceipt(ctx, "mint", reference, "", amount)
}

func (c *MonetaryContract) AllocateReserve(ctx contractapi.TransactionContextInterface, distributorID string, amount int64, reference string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" {
		return fmt.Errorf("positive amount and reference are required")
	}
	if done, err := checkReceipt(ctx, "allocate", reference, distributorID, amount); err != nil || done {
		return err
	}
	reserveKey := "reserve::" + distributorID
	treasury, err := getBalance(ctx, treasuryKey)
	if err != nil {
		return err
	}
	reserve, err := getBalance(ctx, reserveKey)
	if err != nil {
		return err
	}
	treasury.Amount, err = checkedSub(treasury.Amount, amount)
	if err != nil {
		return fmt.Errorf("treasury: %w", err)
	}
	reserve.Amount, err = checkedAdd(reserve.Amount, amount)
	if err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), treasuryKey, treasury); err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), reserveKey, reserve); err != nil {
		return err
	}
	return saveReceipt(ctx, "allocate", reference, distributorID, amount)
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
	supply, err := getBalance(ctx, supplyKey)
	if err != nil {
		return err
	}
	reserve.Amount, err = checkedSub(reserve.Amount, amount)
	if err != nil {
		return fmt.Errorf("distributor reserve: %w", err)
	}
	supply.Amount, err = checkedSub(supply.Amount, amount)
	if err != nil {
		return fmt.Errorf("total supply: %w", err)
	}
	if err := putJSON(ctx.GetStub(), reserveKey, reserve); err != nil {
		return err
	}
	if err := putJSON(ctx.GetStub(), supplyKey, supply); err != nil {
		return err
	}
	return saveReceipt(ctx, "redeem", reference, distributorID, amount)
}

// DebitReserveForFunding is accepted only as a nested call from the payment chaincode.
func (c *MonetaryContract) DebitReserveForFunding(ctx contractapi.TransactionContextInterface, distributorID string, subjectID string, amount int64, reference string) error {
	if err := requireTopLevel(ctx, paymentChaincode, "FundFromReserve"); err != nil {
		return err
	}
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" || strings.TrimSpace(subjectID) == "" {
		return fmt.Errorf("subject_id, positive amount, and reference are required")
	}
	stub := ctx.GetStub()
	receiptKey := "funding::" + reference
	prior, err := stub.GetState(receiptKey)
	if err != nil {
		return err
	}
	if prior != nil {
		var existing fundingReceipt
		if err := json.Unmarshal(prior, &existing); err != nil {
			return err
		}
		if existing.DistributorID != distributorID || existing.SubjectID != subjectID || existing.Amount != amount {
			return fmt.Errorf("reference %s was used for another funding request", reference)
		}
		return nil
	}
	key := "reserve::" + distributorID
	reserve, err := getBalance(ctx, key)
	if err != nil {
		return err
	}
	reserve.Amount, err = checkedSub(reserve.Amount, amount)
	if err != nil {
		return fmt.Errorf("distributor reserve: %w", err)
	}
	if err := putJSON(stub, key, reserve); err != nil {
		return err
	}
	return putJSON(stub, receiptKey, fundingReceipt{Reference: reference, DistributorID: distributorID, SubjectID: subjectID, Amount: amount})
}

func (c *MonetaryContract) GetTreasury(ctx contractapi.TransactionContextInterface) (int64, error) {
	value, err := getBalance(ctx, treasuryKey)
	return value.Amount, err
}

func (c *MonetaryContract) GetTotalSupply(ctx contractapi.TransactionContextInterface) (int64, error) {
	value, err := getBalance(ctx, supplyKey)
	return value.Amount, err
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
