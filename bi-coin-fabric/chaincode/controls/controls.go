package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/v2/pkg/statebased"
	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

const (
	centralBankMSP = "CentralBankMSP"
	distributorMSP = "DistributorMSP"
	endUserMSP     = "EndUserMSP"
	validatorMSP   = "ValidatorMSP"
)

type ControlsContract struct{ contractapi.Contract }

const (
	RestrictionReasonDTTOT          = "dttot"
	RestrictionReasonAuthorityOrder = "authority_order"
	RestrictionReasonInternalReview = "internal_review"
)

// Maximum restriction periods. UU No. 8 Tahun 2010 allows an internal hold of
// at most 5 working days (Pasal 26 ayat (1)) and an authority-ordered block of
// at most 30 working days (Pasal 71 ayat (3)). A DTTOT restriction lasts until
// it is lifted (UU No. 9 Tahun 2013 Pasal 28).
// ponytail: calendar days, always within the working-day maximum; a holiday calendar would allow the full period.
var restrictionPeriods = map[string]time.Duration{
	RestrictionReasonInternalReview: 5 * 24 * time.Hour,
	RestrictionReasonAuthorityOrder: 30 * 24 * time.Hour,
}

type subjectRecord struct {
	SubjectID            string       `json:"subject_id"`
	Category             string       `json:"category"`
	ApplicantID          string       `json:"applicant_id"`
	Protected            bool         `json:"protected"`
	RiskLevel            string       `json:"risk_level,omitempty"`
	PEP                  bool         `json:"pep"`
	ReviewerID           string       `json:"reviewer_id,omitempty"`
	SeniorID             string       `json:"senior_id,omitempty"`
	Status               string       `json:"status"`
	Restricted           bool         `json:"restricted"`
	RestrictionReason    string       `json:"restriction_reason,omitempty"`
	RestrictedUntil      int64        `json:"restricted_until,omitempty"`
	UnfreezeReviewerID   string       `json:"unfreeze_reviewer_id,omitempty"`
	AuthorityEvidenceRef string       `json:"authority_evidence_ref,omitempty"`
	Representatives      []string     `json:"representatives,omitempty"`
	BeneficialOwnerRefs  []string     `json:"beneficial_owner_refs,omitempty"`
	Limits               LimitProfile `json:"limits"`
	LimitsSet            bool         `json:"limits_set"`
}

type LimitProfile struct {
	PerTransaction int64 `json:"per_transaction"`
	Daily          int64 `json:"daily"`
	Monthly        int64 `json:"monthly"`
	Holdings       int64 `json:"holdings"`
}

type SubjectView struct {
	SubjectID            string       `json:"subject_id"`
	Category             string       `json:"category"`
	Status               string       `json:"status"`
	RiskLevel            string       `json:"risk_level"`
	PEP                  bool         `json:"pep"`
	Protected            bool         `json:"protected"`
	Restricted           bool         `json:"restricted"`
	RestrictionReason    string       `json:"restriction_reason"`
	RestrictedUntil      int64        `json:"restricted_until"`
	ReviewerID           string       `json:"reviewer_id"`
	SeniorID             string       `json:"senior_id"`
	AuthorityEvidenceRef string       `json:"authority_evidence_ref"`
	Limits               LimitProfile `json:"limits"`
	Representatives      []string     `json:"representatives"`
	BeneficialOwnerRefs  []string     `json:"beneficial_owner_refs"`
}

type staffRecord struct {
	ClientID  string `json:"client_id"`
	Protected bool   `json:"protected"`
	Role      string `json:"role,omitempty"`
}

func (c *ControlsContract) GetCallerIdentity(ctx contractapi.TransactionContextInterface) (string, error) {
	return callerID(ctx)
}

// CreatePending stores only a pseudonymous subject identifier and a denied-by-default status.
func (c *ControlsContract) CreatePending(ctx contractapi.TransactionContextInterface, subjectID string, category string) error {
	if err := requireMSP(ctx, endUserMSP); err != nil {
		return err
	}
	if strings.TrimSpace(subjectID) == "" || !oneOf(category, "retail", "merchant", "business") {
		return fmt.Errorf("subject_id and a supported category are required")
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if key == "" {
		return fmt.Errorf("cannot create subject key")
	}
	if current, err := ctx.GetStub().GetState(key); err != nil {
		return err
	} else if current != nil {
		return fmt.Errorf("subject %s already exists", subjectID)
	}
	id, err := callerID(ctx)
	if err != nil {
		return err
	}
	return putJSON(ctx.GetStub(), key, subjectRecord{SubjectID: subjectID, Category: category, ApplicantID: id, Status: "pending"})
}

// ProtectSubject installs the fixed CentralBankMSP + DistributorMSP policy without activating the subject.
func (c *ControlsContract) ProtectSubject(ctx contractapi.TransactionContextInterface, subjectID string) error {
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return err
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	if record.Status != "pending" || record.Protected {
		return fmt.Errorf("subject is not awaiting protection")
	}
	policy, err := controlPolicy()
	if err != nil {
		return err
	}
	if err := ctx.GetStub().SetStateValidationParameter(key, policy); err != nil {
		return err
	}
	record.Protected = true
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) CreateStaffPending(ctx contractapi.TransactionContextInterface, clientID string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if strings.TrimSpace(clientID) == "" {
		return fmt.Errorf("client_id is required")
	}
	key := staffKey(ctx.GetStub(), clientID)
	if current, err := ctx.GetStub().GetState(key); err != nil {
		return err
	} else if current != nil {
		return fmt.Errorf("staff identity already exists")
	}
	return putJSON(ctx.GetStub(), key, staffRecord{ClientID: clientID})
}

func (c *ControlsContract) ProtectStaff(ctx contractapi.TransactionContextInterface, clientID string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	key := staffKey(ctx.GetStub(), clientID)
	var staff staffRecord
	if err := getJSON(ctx.GetStub(), key, &staff); err != nil {
		return err
	}
	if staff.Protected {
		return fmt.Errorf("staff identity is already protected")
	}
	policy, err := controlPolicy()
	if err != nil {
		return err
	}
	if err := ctx.GetStub().SetStateValidationParameter(key, policy); err != nil {
		return err
	}
	staff.Protected = true
	return putJSON(ctx.GetStub(), key, staff)
}

func (c *ControlsContract) SetStaffRole(ctx contractapi.TransactionContextInterface, clientID string, role string) error {
	if err := requireMSP(ctx, centralBankMSP); err != nil {
		return err
	}
	if !oneOf(role, "kyc_reviewer", "senior_approver", "compliance_officer") {
		return fmt.Errorf("unsupported staff role")
	}
	key := staffKey(ctx.GetStub(), clientID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	var staff staffRecord
	if err := getJSON(ctx.GetStub(), key, &staff); err != nil {
		return err
	}
	staff.Role = role
	return putJSON(ctx.GetStub(), key, staff)
}

func (c *ControlsContract) RecordReview(ctx contractapi.TransactionContextInterface, subjectID string, riskLevel string, pep bool) error {
	reviewerID, err := requireStaffRole(ctx, "kyc_reviewer")
	if err != nil {
		return err
	}
	if !oneOf(riskLevel, "standard", "high") {
		return fmt.Errorf("risk_level must be standard or high")
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	if record.Status != "pending" || record.ReviewerID != "" {
		return fmt.Errorf("subject is not awaiting review")
	}
	record.RiskLevel = riskLevel
	record.PEP = pep
	record.ReviewerID = reviewerID
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) ApproveStandard(ctx contractapi.TransactionContextInterface, subjectID string, approved bool) error {
	reviewerID, err := requireStaffRole(ctx, "kyc_reviewer")
	if err != nil {
		return err
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	if record.Status != "pending" || record.ReviewerID != reviewerID || record.RiskLevel != "standard" || record.PEP || !record.LimitsSet {
		return fmt.Errorf("subject is not eligible for standard approval")
	}
	if approved {
		record.Status = "active"
	} else {
		record.Status = "rejected"
	}
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) DecideHighRisk(ctx contractapi.TransactionContextInterface, subjectID string, approved bool) error {
	seniorID, err := requireStaffRole(ctx, "senior_approver")
	if err != nil {
		return err
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	if record.Status != "pending" || record.ReviewerID == "" || record.ReviewerID == seniorID || (record.RiskLevel != "high" && !record.PEP) || !record.LimitsSet {
		return fmt.Errorf("subject is not eligible for senior decision")
	}
	record.SeniorID = seniorID
	if approved {
		record.Status = "active"
	} else {
		record.Status = "rejected"
	}
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) SetLimits(ctx contractapi.TransactionContextInterface, subjectID string, perTransaction int64, daily int64, monthly int64, holdings int64) error {
	if _, err := requireStaffRole(ctx, "senior_approver"); err != nil {
		return err
	}
	if !validLimits(perTransaction, daily, monthly, holdings) {
		return fmt.Errorf("limits must be positive and ordered per-transaction <= daily <= monthly")
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	if record.Status != "pending" {
		return fmt.Errorf("limits can only be set before activation")
	}
	record.Limits = LimitProfile{PerTransaction: perTransaction, Daily: daily, Monthly: monthly, Holdings: holdings}
	record.LimitsSet = true
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) SetBusinessAuthority(ctx contractapi.TransactionContextInterface, subjectID string, representativesJSON string, beneficialOwnerRefsJSON string) error {
	if _, err := requireStaffRole(ctx, "senior_approver"); err != nil {
		return err
	}
	var representatives []string
	var owners []string
	if err := json.Unmarshal([]byte(representativesJSON), &representatives); err != nil {
		return fmt.Errorf("representatives: %w", err)
	}
	if err := json.Unmarshal([]byte(beneficialOwnerRefsJSON), &owners); err != nil {
		return fmt.Errorf("beneficial_owner_refs: %w", err)
	}
	if len(representatives) == 0 {
		return fmt.Errorf("at least one representative is required")
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	if record.Category != "business" || record.Status != "active" {
		return fmt.Errorf("business authority requires an active business subject")
	}
	record.Representatives = cleanIDs(representatives)
	record.BeneficialOwnerRefs = cleanIDs(owners)
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) FreezeSubject(ctx contractapi.TransactionContextInterface, subjectID string, reason string) error {
	if _, err := requireStaffRole(ctx, "compliance_officer"); err != nil {
		return err
	}
	if !oneOf(reason, RestrictionReasonDTTOT, RestrictionReasonAuthorityOrder, RestrictionReasonInternalReview) {
		return fmt.Errorf("unsupported restriction reason code")
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	now, err := txTime(ctx)
	if err != nil {
		return err
	}
	record.Restricted = true
	record.RestrictionReason = reason
	record.RestrictedUntil = 0
	if period, limited := restrictionPeriods[reason]; limited {
		record.RestrictedUntil = now.Add(period).Unix()
	}
	record.UnfreezeReviewerID = ""
	record.AuthorityEvidenceRef = ""
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) RequestUnfreeze(ctx contractapi.TransactionContextInterface, subjectID string, authorityEvidenceRef string) error {
	reviewerID, err := requireStaffRole(ctx, "kyc_reviewer")
	if err != nil {
		return err
	}
	if !isOpaqueReference(authorityEvidenceRef) {
		return fmt.Errorf("authority release evidence must be a SHA-256 reference")
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	if !record.Restricted {
		return fmt.Errorf("subject is not restricted")
	}
	record.UnfreezeReviewerID = reviewerID
	record.AuthorityEvidenceRef = authorityEvidenceRef
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) ApproveUnfreeze(ctx contractapi.TransactionContextInterface, subjectID string) error {
	seniorID, err := requireStaffRole(ctx, "senior_approver")
	if err != nil {
		return err
	}
	key := subjectKey(ctx.GetStub(), subjectID)
	if err := requireProtected(ctx.GetStub(), key); err != nil {
		return err
	}
	record, err := getSubject(ctx, key)
	if err != nil {
		return err
	}
	if !record.Restricted || record.AuthorityEvidenceRef == "" || record.UnfreezeReviewerID == "" || record.UnfreezeReviewerID == seniorID {
		return fmt.Errorf("unfreeze requires authority evidence and two distinct approvers")
	}
	record.Restricted = false
	record.RestrictionReason = ""
	record.RestrictedUntil = 0
	record.SeniorID = seniorID
	return putJSON(ctx.GetStub(), key, record)
}

func (c *ControlsContract) CanPay(ctx contractapi.TransactionContextInterface, subjectID string) (bool, error) {
	record, err := getSubject(ctx, subjectKey(ctx.GetStub(), subjectID))
	if err != nil {
		return false, err
	}
	restricted, err := restrictionActive(ctx, record)
	if err != nil {
		return false, err
	}
	return record.Status == "active" && !restricted, nil
}

func (c *ControlsContract) GetLimits(ctx contractapi.TransactionContextInterface, subjectID string) (LimitProfile, error) {
	record, err := getSubject(ctx, subjectKey(ctx.GetStub(), subjectID))
	if err != nil {
		return LimitProfile{}, err
	}
	restricted, err := restrictionActive(ctx, record)
	if err != nil {
		return LimitProfile{}, err
	}
	if record.Status != "active" || restricted || !record.LimitsSet {
		return LimitProfile{}, fmt.Errorf("subject has no active payment limits")
	}
	return record.Limits, nil
}

func (c *ControlsContract) CanActFor(ctx contractapi.TransactionContextInterface, subjectID string) (bool, error) {
	record, err := getSubject(ctx, subjectKey(ctx.GetStub(), subjectID))
	if err != nil {
		return false, err
	}
	id, err := callerID(ctx)
	if err != nil {
		return false, err
	}
	if record.Category != "business" {
		return record.ApplicantID == id, nil
	}
	return contains(record.Representatives, id), nil
}

func (c *ControlsContract) GetSubject(ctx contractapi.TransactionContextInterface, subjectID string) (SubjectView, error) {
	if err := requireMSP(ctx, centralBankMSP, distributorMSP, validatorMSP); err != nil {
		return SubjectView{}, err
	}
	record, err := getSubject(ctx, subjectKey(ctx.GetStub(), subjectID))
	if err != nil {
		return SubjectView{}, err
	}
	representatives := record.Representatives
	if representatives == nil {
		representatives = []string{}
	}
	owners := record.BeneficialOwnerRefs
	if owners == nil {
		owners = []string{}
	}
	restricted, err := restrictionActive(ctx, record)
	if err != nil {
		return SubjectView{}, err
	}
	return SubjectView{
		SubjectID: record.SubjectID, Category: record.Category, Status: record.Status,
		RiskLevel: record.RiskLevel, PEP: record.PEP, Protected: record.Protected,
		Restricted: restricted, RestrictionReason: record.RestrictionReason, RestrictedUntil: record.RestrictedUntil,
		ReviewerID: record.ReviewerID, SeniorID: record.SeniorID,
		AuthorityEvidenceRef: record.AuthorityEvidenceRef, Limits: record.Limits,
		Representatives: representatives, BeneficialOwnerRefs: owners,
	}, nil
}

func requireStaffRole(ctx contractapi.TransactionContextInterface, role string) (string, error) {
	if err := requireMSP(ctx, distributorMSP); err != nil {
		return "", err
	}
	id, err := callerID(ctx)
	if err != nil {
		return "", err
	}
	var staff staffRecord
	if err := getJSON(ctx.GetStub(), staffKey(ctx.GetStub(), id), &staff); err != nil {
		return "", fmt.Errorf("staff identity is not registered")
	}
	if !staff.Protected || staff.Role != role {
		return "", fmt.Errorf("staff identity lacks role %s", role)
	}
	return id, nil
}

func requireMSP(ctx contractapi.TransactionContextInterface, allowed ...string) error {
	identity := ctx.GetClientIdentity()
	if identity == nil {
		return fmt.Errorf("client identity unavailable")
	}
	mspID, err := identity.GetMSPID()
	if err != nil {
		return err
	}
	for _, candidate := range allowed {
		if mspID == candidate {
			return nil
		}
	}
	return fmt.Errorf("access denied for MSP %s", mspID)
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

func controlPolicy() ([]byte, error) {
	policy, err := statebased.NewStateEP(nil)
	if err != nil {
		return nil, err
	}
	if err := policy.AddOrgs(statebased.RoleTypePeer, centralBankMSP, distributorMSP); err != nil {
		return nil, err
	}
	return policy.Policy()
}

func requireProtected(stub shim.ChaincodeStubInterface, key string) error {
	policy, err := stub.GetStateValidationParameter(key)
	if err != nil {
		return err
	}
	if len(policy) == 0 {
		return fmt.Errorf("effective control record is not protected")
	}
	return nil
}

func subjectKey(stub shim.ChaincodeStubInterface, subjectID string) string {
	key, err := stub.CreateCompositeKey("control", []string{subjectID})
	if err != nil {
		return ""
	}
	return key
}

func staffKey(stub shim.ChaincodeStubInterface, clientID string) string {
	key, err := stub.CreateCompositeKey("staff", []string{clientID})
	if err != nil {
		return ""
	}
	return key
}

func getSubject(ctx contractapi.TransactionContextInterface, key string) (subjectRecord, error) {
	var record subjectRecord
	if err := getJSON(ctx.GetStub(), key, &record); err != nil {
		return subjectRecord{}, err
	}
	return record, nil
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

func oneOf(value string, allowed ...string) bool {
	for _, candidate := range allowed {
		if value == candidate {
			return true
		}
	}
	return false
}

func cleanIDs(values []string) []string {
	result := make([]string, 0, len(values))
	for _, value := range values {
		value = strings.TrimSpace(value)
		if value != "" && !contains(result, value) {
			result = append(result, value)
		}
	}
	return result
}

func contains(values []string, value string) bool {
	for _, candidate := range values {
		if candidate == value {
			return true
		}
	}
	return false
}

// restrictionActive treats a time-limited restriction as lifted once its period ends.
func restrictionActive(ctx contractapi.TransactionContextInterface, record subjectRecord) (bool, error) {
	if !record.Restricted || record.RestrictedUntil == 0 {
		return record.Restricted, nil
	}
	now, err := txTime(ctx)
	if err != nil {
		return false, err
	}
	return restrictedAt(record, now), nil
}

func restrictedAt(record subjectRecord, now time.Time) bool {
	return record.Restricted && (record.RestrictedUntil == 0 || now.Unix() < record.RestrictedUntil)
}

func txTime(ctx contractapi.TransactionContextInterface) (time.Time, error) {
	timestamp, err := ctx.GetStub().GetTxTimestamp()
	if err != nil {
		return time.Time{}, err
	}
	return time.Unix(timestamp.Seconds, int64(timestamp.Nanos)).UTC(), nil
}

func isOpaqueReference(value string) bool {
	decoded, err := hex.DecodeString(value)
	return err == nil && len(decoded) == sha256.Size
}

func validLimits(perTransaction int64, daily int64, monthly int64, holdings int64) bool {
	return perTransaction > 0 && daily >= perTransaction && monthly >= daily && holdings > 0
}
