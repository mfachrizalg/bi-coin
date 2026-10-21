package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math"
	"slices"
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
	transferLimitKey   = "policy::transfer-limit"
)

// Participant statuses follow PBI No. 10 Tahun 2025 Pasal 81 ayat (1):
// aktif, ditangguhkan, dibekukan, and ditutup.
const (
	participantActive    = "active"
	participantSuspended = "suspended"
	participantFrozen    = "frozen"
	participantClosed    = "closed"
)

// Status change grounds follow PBI No. 10 Tahun 2025 Pasal 81 ayat (2) huruf a to f.
var statusReasons = []string{
	"tikmi_assessment",
	"administrative_sanction",
	"authority_request",
	"participant_request",
	"participation_policy",
	"payment_system_continuity",
}

const (
	opIssue   = "issue"
	opRedeem  = "redeem"
	opSend    = "send"
	opReceive = "receive"
)

// A suspended participant may not send, but Bank Indonesia can still credit or
// redeem its reserve and other banks can still pay it. A frozen participant
// stops all transactional activity (Penjelasan Pasal 81 ayat (1)).
var allowedStatuses = map[string][]string{
	opIssue:   {participantActive, participantSuspended},
	opRedeem:  {participantActive, participantSuspended},
	opSend:    {participantActive},
	opReceive: {participantActive, participantSuspended},
}

type MonetaryContract struct{ contractapi.Contract }

// balance stores supplies and reserves. Reserve records also carry the
// participant's admission evidence, status, and four-eyes threshold.
type balance struct {
	Amount            int64  `json:"amount"`
	Kind              string `json:"kind,omitempty"`
	Status            string `json:"status,omitempty"`
	StatusReason      string `json:"status_reason,omitempty"`
	AdmissionRef      string `json:"admission_ref,omitempty"`
	ApprovalThreshold int64  `json:"approval_threshold,omitempty"`
}

type transferReceipt struct {
	Reference string `json:"reference"`
	From      string `json:"from"`
	To        string `json:"to"`
	Amount    int64  `json:"amount"`
	Status    string `json:"status"`
	MakerID   string `json:"maker_id"`
	CheckerID string `json:"checker_id,omitempty" metadata:",optional"`
}

type thresholdProposal struct {
	Amount     int64  `json:"amount"`
	ProposerID string `json:"proposer_id"`
}

type participantView struct {
	DistributorID     string `json:"distributor_id"`
	Kind              string `json:"kind"`
	Status            string `json:"status"`
	StatusReason      string `json:"status_reason"`
	AdmissionRef      string `json:"admission_ref"`
	ApprovalThreshold int64  `json:"approval_threshold"`
	Reserve           int64  `json:"reserve"`
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

// RegisterDistributor admits a participant. admissionRef is the SHA-256 of Bank
// Indonesia's approval record (PBI No. 10 Tahun 2025 Pasal 78 ayat (1)).
func (c *MonetaryContract) RegisterDistributor(ctx contractapi.TransactionContextInterface, distributorID string, kind string, admissionRef string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if strings.TrimSpace(distributorID) == "" {
		return fmt.Errorf("distributor_id is required")
	}
	if kind != "wholesale" && kind != "retail" {
		return fmt.Errorf("kind must be wholesale or retail")
	}
	if !isSHA256Reference(admissionRef) {
		return fmt.Errorf("admission_ref must be a SHA-256 reference")
	}
	key := "reserve::" + distributorID
	current, err := ctx.GetStub().GetState(key)
	if err != nil {
		return err
	}
	if current != nil {
		return fmt.Errorf("distributor %s already registered", distributorID)
	}
	return putJSON(ctx.GetStub(), key, balance{Kind: kind, Status: participantActive, AdmissionRef: admissionRef})
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
	if err := requireParticipant(reserve, opIssue); err != nil {
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
	if err := requireParticipant(reserve, opRedeem); err != nil {
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

// TransferReserve moves w-Rupiah Digital between participants. A transfer above
// the sender's approval threshold waits for a second officer of the same bank
// (four-eyes principle, SEOJK No. 35/SEOJK.03/2017).
func (c *MonetaryContract) TransferReserve(ctx contractapi.TransactionContextInterface, from string, to string, amount int64, reference string) (transferReceipt, error) {
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return transferReceipt{}, err
	}
	if err := requireDistributor(ctx, from); err != nil {
		return transferReceipt{}, err
	}
	if amount <= 0 || strings.TrimSpace(reference) == "" || from == to {
		return transferReceipt{}, fmt.Errorf("distinct distributors, positive amount, and reference are required")
	}
	stub := ctx.GetStub()
	if existing, found, err := getTransfer(ctx, reference); err != nil {
		return transferReceipt{}, err
	} else if found {
		if existing.From != from || existing.To != to || existing.Amount != amount {
			return transferReceipt{}, fmt.Errorf("reference %s was used for another transfer request", reference)
		}
		return existing, nil
	}
	makerID, err := callerID(ctx)
	if err != nil {
		return transferReceipt{}, err
	}
	source, target, err := prepareTransfer(ctx, from, to, amount)
	if err != nil {
		return transferReceipt{}, err
	}
	receipt := transferReceipt{Reference: reference, From: from, To: to, Amount: amount, Status: "pending", MakerID: makerID}
	if amount <= source.ApprovalThreshold {
		if err := putJSON(stub, "reserve::"+from, source); err != nil {
			return transferReceipt{}, err
		}
		if err := putJSON(stub, "reserve::"+to, target); err != nil {
			return transferReceipt{}, err
		}
		receipt.Status = "executed"
	}
	return receipt, putJSON(stub, "transfer::"+reference, receipt)
}

// ApproveTransfer executes a pending transfer. The checker must act for the
// sending bank and must not be the officer who created the request.
func (c *MonetaryContract) ApproveTransfer(ctx contractapi.TransactionContextInterface, reference string) (transferReceipt, error) {
	receipt, checkerID, err := pendingTransferForChecker(ctx, reference)
	if err != nil {
		return transferReceipt{}, err
	}
	if checkerID == receipt.MakerID {
		return transferReceipt{}, fmt.Errorf("the maker cannot approve their own transfer")
	}
	source, target, err := prepareTransfer(ctx, receipt.From, receipt.To, receipt.Amount)
	if err != nil {
		return transferReceipt{}, err
	}
	stub := ctx.GetStub()
	if err := putJSON(stub, "reserve::"+receipt.From, source); err != nil {
		return transferReceipt{}, err
	}
	if err := putJSON(stub, "reserve::"+receipt.To, target); err != nil {
		return transferReceipt{}, err
	}
	receipt.Status = "executed"
	receipt.CheckerID = checkerID
	return receipt, putJSON(stub, "transfer::"+reference, receipt)
}

// RejectTransfer cancels a pending transfer. No reserve moves.
func (c *MonetaryContract) RejectTransfer(ctx contractapi.TransactionContextInterface, reference string) (transferReceipt, error) {
	receipt, checkerID, err := pendingTransferForChecker(ctx, reference)
	if err != nil {
		return transferReceipt{}, err
	}
	receipt.Status = "rejected"
	receipt.CheckerID = checkerID
	return receipt, putJSON(ctx.GetStub(), "transfer::"+reference, receipt)
}

// ProposeApprovalThreshold records a bank officer's proposal for the bank's own
// four-eyes threshold. A second officer must approve it, so one officer cannot
// raise the threshold to skip the second approval.
func (c *MonetaryContract) ProposeApprovalThreshold(ctx contractapi.TransactionContextInterface, distributorID string, amount int64) error {
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return err
	}
	if err := requireDistributor(ctx, distributorID); err != nil {
		return err
	}
	if amount < 0 {
		return fmt.Errorf("approval threshold must not be negative")
	}
	if _, err := getBalance(ctx, "reserve::"+distributorID); err != nil {
		return err
	}
	proposerID, err := callerID(ctx)
	if err != nil {
		return err
	}
	return putJSON(ctx.GetStub(), "threshold::pending::"+distributorID, thresholdProposal{Amount: amount, ProposerID: proposerID})
}

// ApproveApprovalThreshold applies a proposal. amount must match the proposal,
// so the approver confirms the value they reviewed.
func (c *MonetaryContract) ApproveApprovalThreshold(ctx contractapi.TransactionContextInterface, distributorID string, amount int64) error {
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return err
	}
	if err := requireDistributor(ctx, distributorID); err != nil {
		return err
	}
	stub := ctx.GetStub()
	proposalKey := "threshold::pending::" + distributorID
	data, err := stub.GetState(proposalKey)
	if err != nil {
		return err
	}
	if data == nil {
		return fmt.Errorf("no approval threshold proposal for %s", distributorID)
	}
	var proposal thresholdProposal
	if err := json.Unmarshal(data, &proposal); err != nil {
		return err
	}
	if proposal.Amount != amount {
		return fmt.Errorf("amount does not match the pending proposal")
	}
	approverID, err := callerID(ctx)
	if err != nil {
		return err
	}
	if approverID == proposal.ProposerID {
		return fmt.Errorf("the proposer cannot approve their own threshold change")
	}
	reserveKey := "reserve::" + distributorID
	reserve, err := getBalance(ctx, reserveKey)
	if err != nil {
		return err
	}
	reserve.ApprovalThreshold = amount
	if err := putJSON(stub, reserveKey, reserve); err != nil {
		return err
	}
	return stub.DelState(proposalKey)
}

// SetParticipantStatus changes a participant's status (PBI No. 10 Tahun 2025
// Pasal 81). Closing is final and needs settled obligations (Pasal 82 ayat (2)).
func (c *MonetaryContract) SetParticipantStatus(ctx contractapi.TransactionContextInterface, distributorID string, status string, reason string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if !slices.Contains([]string{participantActive, participantSuspended, participantFrozen, participantClosed}, status) {
		return fmt.Errorf("unsupported participant status")
	}
	if !slices.Contains(statusReasons, reason) {
		return fmt.Errorf("unsupported status reason code")
	}
	reserveKey := "reserve::" + distributorID
	reserve, err := getBalance(ctx, reserveKey)
	if err != nil {
		return err
	}
	if reserve.Status == participantClosed {
		return fmt.Errorf("a closed participant cannot change status")
	}
	if status == participantClosed {
		if reserve.Amount != 0 {
			return fmt.Errorf("participant must settle its reserve before closing")
		}
		float, err := retailFloat(ctx, distributorID)
		if err != nil {
			return err
		}
		if float != 0 {
			return fmt.Errorf("participant must settle its retail float before closing")
		}
	}
	reserve.Status = status
	reserve.StatusReason = reason
	return putJSON(ctx.GetStub(), reserveKey, reserve)
}

// SetTransferLimit sets Bank Indonesia's maximum value per interbank transfer
// (PBI No. 10 Tahun 2025 Pasal 85 ayat (1) huruf a).
func (c *MonetaryContract) SetTransferLimit(ctx contractapi.TransactionContextInterface, amount int64) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if amount <= 0 {
		return fmt.Errorf("transfer limit must be positive")
	}
	return putJSON(ctx.GetStub(), transferLimitKey, balance{Amount: amount})
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
	if err := requireParticipant(reserve, opSend); err != nil {
		return err
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

func (c *MonetaryContract) GetParticipant(ctx contractapi.TransactionContextInterface, distributorID string) (participantView, error) {
	value, err := getBalance(ctx, "reserve::"+distributorID)
	if err != nil {
		return participantView{}, err
	}
	return participantView{
		DistributorID: distributorID, Kind: value.Kind, Status: value.Status, StatusReason: value.StatusReason,
		AdmissionRef: value.AdmissionRef, ApprovalThreshold: value.ApprovalThreshold, Reserve: value.Amount,
	}, nil
}

// CanSend reports whether a participant may make outgoing payments. The payment
// chaincode calls it before wallet funding.
func (c *MonetaryContract) CanSend(ctx contractapi.TransactionContextInterface, distributorID string) (bool, error) {
	value, err := getBalance(ctx, "reserve::"+distributorID)
	if err != nil {
		return false, err
	}
	return requireParticipant(value, opSend) == nil, nil
}

func (c *MonetaryContract) GetTransferLimit(ctx contractapi.TransactionContextInterface) (int64, error) {
	return transferLimit(ctx)
}

func requireParticipant(reserve balance, operation string) error {
	if !slices.Contains(allowedStatuses[operation], reserve.Status) {
		return fmt.Errorf("participant status %q does not allow %s", reserve.Status, operation)
	}
	return nil
}

// prepareTransfer applies the status, transfer-limit, and balance rules and
// returns the updated reserves without writing them.
func prepareTransfer(ctx contractapi.TransactionContextInterface, from string, to string, amount int64) (balance, balance, error) {
	source, err := getBalance(ctx, "reserve::"+from)
	if err != nil {
		return balance{}, balance{}, err
	}
	target, err := getBalance(ctx, "reserve::"+to)
	if err != nil {
		return balance{}, balance{}, err
	}
	if err := requireParticipant(source, opSend); err != nil {
		return balance{}, balance{}, fmt.Errorf("sender: %w", err)
	}
	if err := requireParticipant(target, opReceive); err != nil {
		return balance{}, balance{}, fmt.Errorf("recipient: %w", err)
	}
	limit, err := transferLimit(ctx)
	if err != nil {
		return balance{}, balance{}, err
	}
	if limit > 0 && amount > limit {
		return balance{}, balance{}, fmt.Errorf("amount exceeds Bank Indonesia's transfer limit")
	}
	source.Amount, err = checkedSub(source.Amount, amount)
	if err != nil {
		return balance{}, balance{}, fmt.Errorf("distributor reserve: %w", err)
	}
	target.Amount, err = checkedAdd(target.Amount, amount)
	if err != nil {
		return balance{}, balance{}, err
	}
	return source, target, nil
}

// transferLimit returns 0 until Bank Indonesia sets a limit.
func transferLimit(ctx contractapi.TransactionContextInterface) (int64, error) {
	data, err := ctx.GetStub().GetState(transferLimitKey)
	if err != nil || data == nil {
		return 0, err
	}
	var value balance
	if err := json.Unmarshal(data, &value); err != nil {
		return 0, err
	}
	return value.Amount, nil
}

func getTransfer(ctx contractapi.TransactionContextInterface, reference string) (transferReceipt, bool, error) {
	data, err := ctx.GetStub().GetState("transfer::" + reference)
	if err != nil || data == nil {
		return transferReceipt{}, false, err
	}
	var receipt transferReceipt
	if err := json.Unmarshal(data, &receipt); err != nil {
		return transferReceipt{}, false, err
	}
	return receipt, true, nil
}

// pendingTransferForChecker loads a pending transfer and checks that the caller
// acts for the sending bank.
func pendingTransferForChecker(ctx contractapi.TransactionContextInterface, reference string) (transferReceipt, string, error) {
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return transferReceipt{}, "", err
	}
	receipt, found, err := getTransfer(ctx, reference)
	if err != nil {
		return transferReceipt{}, "", err
	}
	if !found {
		return transferReceipt{}, "", fmt.Errorf("transfer %s not found", reference)
	}
	if err := requireDistributor(ctx, receipt.From); err != nil {
		return transferReceipt{}, "", err
	}
	if receipt.Status != "pending" {
		return transferReceipt{}, "", fmt.Errorf("transfer is not awaiting approval")
	}
	checkerID, err := callerID(ctx)
	if err != nil {
		return transferReceipt{}, "", err
	}
	return receipt, checkerID, nil
}

func retailFloat(ctx contractapi.TransactionContextInterface, distributorID string) (int64, error) {
	response := ctx.GetStub().InvokeChaincode(paymentChaincode, [][]byte{[]byte("GetRetailFloat"), []byte(distributorID)}, "")
	if response.Status != shim.OK {
		return 0, fmt.Errorf("payments.GetRetailFloat failed: %s", response.Message)
	}
	var value int64
	if err := json.Unmarshal(response.Payload, &value); err != nil {
		return 0, fmt.Errorf("decode retail float: %w", err)
	}
	return value, nil
}

func callerID(ctx contractapi.TransactionContextInterface) (string, error) {
	identity := ctx.GetClientIdentity()
	if identity == nil {
		return "", fmt.Errorf("client identity unavailable")
	}
	rawID, err := identity.GetID()
	if err != nil {
		return "", err
	}
	digest := sha256.Sum256([]byte(rawID))
	return hex.EncodeToString(digest[:]), nil
}

func isSHA256Reference(value string) bool {
	decoded, err := hex.DecodeString(value)
	return err == nil && len(decoded) == sha256.Size
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
