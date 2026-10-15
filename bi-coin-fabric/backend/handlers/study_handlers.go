package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

const (
	studyCentralBankMSP = "CentralBankMSP"
	studyDistributorMSP = "DistributorMSP"
	studyValidatorMSP   = "ValidatorMSP"
	studyEndUserMSP     = "EndUserMSP"
)

type StudyHandler struct {
	svc *services.StudyLedgerService
}

func RegisterStudyRoutes(r *mux.Router, svc *services.StudyLedgerService) {
	if svc == nil {
		return
	}
	h := &StudyHandler{svc: svc}
	compliance := r.NewRoute().Subrouter()

	user := compliance.NewRoute().Subrouter()
	user.Use(middleware.RequireRole(middleware.RoleAuthenticated, middleware.RoleKycVerified, middleware.RoleMerchant))
	user.HandleFunc("/identities/me", h.Identity).Methods("GET").Name("compliance.identities.me")
	user.HandleFunc("/subjects", h.CreateSubject).Methods("POST").Name("compliance.subjects.create")

	customer := compliance.NewRoute().Subrouter()
	customer.Use(middleware.RequireRole(middleware.RoleKycVerified, middleware.RoleMerchant))
	customer.HandleFunc("/customer-wallets", h.OpenWallet).Methods("POST").Name("compliance.customer-wallets.create")
	customer.HandleFunc("/retail-transfers", h.Transfer).Methods("POST").Name("compliance.retail-transfers.create")
	customer.HandleFunc("/customer-wallets/{subject_id}/balance", h.GetBalance).Methods("GET").Name("compliance.customer-wallets.balance")

	distributor := compliance.NewRoute().Subrouter()
	distributor.Use(middleware.RequireRole(middleware.RolePJP, middleware.RoleBankPjp))
	distributor.HandleFunc("/conversions", h.FundFromReserve).Methods("POST").Name("compliance.conversions.create")
	distributor.HandleFunc("/subjects/{subject_id}/endorsement-policies", h.ProtectSubject).Methods("POST").Name("compliance.subjects.endorsement-policies.create")
	distributor.HandleFunc("/subjects/{subject_id}/reviews", h.RecordReview).Methods("POST").Name("compliance.subjects.reviews.create")
	distributor.HandleFunc("/subjects/{subject_id}/limits", h.SetLimits).Methods("PUT").Name("compliance.subjects.limits.update")
	distributor.HandleFunc("/subjects/{subject_id}/decisions", h.DecideSubject).Methods("POST").Name("compliance.subjects.decisions.create")
	distributor.HandleFunc("/subjects/{subject_id}/business-authority", h.SetBusinessAuthority).Methods("PUT").Name("compliance.subjects.business-authority.update")
	distributor.HandleFunc("/subjects/{subject_id}/restrictions", h.FreezeSubject).Methods("POST").Name("compliance.subjects.restrictions.create")
	distributor.HandleFunc("/subjects/{subject_id}/restriction-release-requests", h.RequestUnfreeze).Methods("POST").Name("compliance.subjects.restriction-release-requests.create")
	distributor.HandleFunc("/subjects/{subject_id}/restriction-release-decisions", h.ApproveUnfreeze).Methods("POST").Name("compliance.subjects.restriction-release-decisions.create")

	centralBank := compliance.NewRoute().Subrouter()
	centralBank.Use(middleware.RequireRole(middleware.RoleBankIndonesia))
	centralBank.HandleFunc("/staff", h.CreateStaff).Methods("POST").Name("compliance.staff.create")
	centralBank.HandleFunc("/staff/{client_id}/endorsement-policies", h.ProtectStaff).Methods("POST").Name("compliance.staff.endorsement-policies.create")
	centralBank.HandleFunc("/staff/{client_id}/role", h.SetStaffRole).Methods("PUT").Name("compliance.staff.role.update")
	centralBank.HandleFunc("/monetary-initializations", h.InitializeMonetary).Methods("POST").Name("compliance.monetary-initializations.create")
	centralBank.HandleFunc("/distributors", h.RegisterDistributor).Methods("POST").Name("compliance.distributors.create")
	centralBank.HandleFunc("/issuances", h.Mint).Methods("POST").Name("compliance.issuances.create")
	centralBank.HandleFunc("/reserve-allocations", h.AllocateReserve).Methods("POST").Name("compliance.reserve-allocations.create")
	centralBank.HandleFunc("/reserve-redemptions", h.RedeemReserve).Methods("POST").Name("compliance.reserve-redemptions.create")

	controlRead := compliance.NewRoute().Subrouter()
	controlRead.Use(middleware.RequireRole(middleware.RoleBankPjp, middleware.RolePJP, middleware.RoleBankIndonesia, middleware.RoleSupervisor))
	controlRead.HandleFunc("/subjects/{subject_id}", h.GetSubject).Methods("GET").Name("compliance.subjects.read")
}

func (h *StudyHandler) Identity(w http.ResponseWriter, r *http.Request) {
	mspID, err := h.svc.IdentityMSP(middleware.GetUsername(r))
	if err != nil {
		writeServiceError(w, err)
		return
	}
	result, err := h.svc.Evaluate(middleware.GetUsername(r), mspID, "rupiah-controls", "GetCallerIdentity")
	if err != nil {
		writeServiceError(w, err)
		return
	}
	writeStudyResult(w, result)
}

func (h *StudyHandler) CreateSubject(w http.ResponseWriter, r *http.Request) {
	var req struct {
		SubjectID string `json:"subject_id" validate:"required,notblank"`
		Category  string `json:"category" validate:"required,oneof=retail merchant business"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submit(r, studyEndUserMSP, "rupiah-controls", "CreatePending", req.SubjectID, req.Category); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "pending")
}

func (h *StudyHandler) OpenWallet(w http.ResponseWriter, r *http.Request) {
	var req struct {
		SubjectID string `json:"subject_id" validate:"required,notblank"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submit(r, studyEndUserMSP, "rupiah-payments", "OpenWallet", req.SubjectID); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "opened")
}

func (h *StudyHandler) Transfer(w http.ResponseWriter, r *http.Request) {
	var req struct {
		From   string `json:"from" validate:"required,notblank"`
		To     string `json:"to" validate:"required,notblank"`
		Amount string `json:"amount" validate:"required,positive_int64"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if !requireStudyIdempotencyKey(w, r) {
		return
	}
	result, err := h.submitResult(r, studyEndUserMSP, "rupiah-payments", "Transfer", req.From, req.To, req.Amount, r.Header.Get("Idempotency-Key"))
	if err != nil {
		writeServiceError(w, err)
		return
	}
	writeStudyResult(w, result)
}

func (h *StudyHandler) FundFromReserve(w http.ResponseWriter, r *http.Request) {
	var req struct {
		SubjectID     string `json:"subject_id" validate:"required,notblank"`
		DistributorID string `json:"distributor_id" validate:"required,notblank"`
		Amount        string `json:"amount" validate:"required,positive_int64"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if !requireStudyIdempotencyKey(w, r) {
		return
	}
	result, err := h.submitResult(r, studyDistributorMSP, "rupiah-payments", "FundFromReserve", req.SubjectID, req.DistributorID, req.Amount, r.Header.Get("Idempotency-Key"))
	if err != nil {
		writeServiceError(w, err)
		return
	}
	writeStudyResult(w, result)
}

func (h *StudyHandler) GetBalance(w http.ResponseWriter, r *http.Request) {
	result, err := h.evaluate(r, studyEndUserMSP, "rupiah-payments", "GetBalance", mux.Vars(r)["subject_id"])
	if err != nil {
		writeServiceError(w, err)
		return
	}
	balance, err := strconv.ParseInt(strings.TrimSpace(string(result)), 10, 64)
	if err != nil {
		writeServiceError(w, services.Internal("invalid study balance result", err))
		return
	}
	writeStudyResult(w, []byte(strconv.Quote(strconv.FormatInt(balance, 10))))
}

func (h *StudyHandler) ProtectSubject(w http.ResponseWriter, r *http.Request) {
	h.subjectMutation(w, r, "ProtectSubject")
}

func (h *StudyHandler) RecordReview(w http.ResponseWriter, r *http.Request) {
	var req struct {
		RiskLevel string `json:"risk_level" validate:"required,oneof=standard high"`
		PEP       *bool  `json:"pep" validate:"required"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	h.subjectMutation(w, r, "RecordReview", req.RiskLevel, strconv.FormatBool(*req.PEP))
}

func (h *StudyHandler) SetLimits(w http.ResponseWriter, r *http.Request) {
	var req struct {
		PerTransaction string `json:"per_transaction" validate:"required,positive_int64"`
		Daily          string `json:"daily" validate:"required,positive_int64"`
		Monthly        string `json:"monthly" validate:"required,positive_int64"`
		Holdings       string `json:"holdings" validate:"required,positive_int64"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	args := make([]string, 0, 4)
	for _, value := range []string{req.PerTransaction, req.Daily, req.Monthly, req.Holdings} {
		limit, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			writeValidationError(w, "limits must be decimal integer strings")
			return
		}
		args = append(args, strconv.FormatInt(limit, 10))
	}
	h.subjectMutation(w, r, "SetLimits", args...)
}

func (h *StudyHandler) DecideSubject(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Approved *bool `json:"approved" validate:"required"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	subjectID := mux.Vars(r)["subject_id"]
	username := middleware.GetUsername(r)
	recordJSON, err := h.evaluate(r, studyDistributorMSP, "rupiah-controls", "GetSubject", subjectID)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	var risk struct {
		RiskLevel string `json:"risk_level"`
		PEP       bool   `json:"pep"`
	}
	if err := json.Unmarshal(recordJSON, &risk); err != nil {
		writeServiceError(w, services.Internal("invalid study control record", err))
		return
	}
	transaction := "ApproveStandard"
	if risk.RiskLevel == "high" || risk.PEP {
		transaction = "DecideHighRisk"
	}
	if _, err := h.svc.Submit(username, studyDistributorMSP, "rupiah-controls", transaction, subjectID, strconv.FormatBool(*req.Approved)); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "decided")
}

func (h *StudyHandler) SetBusinessAuthority(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Representatives     []string `json:"representatives" validate:"required,min=1,dive,required,notblank"`
		BeneficialOwnerRefs []string `json:"beneficial_owner_refs" validate:"omitempty,dive,notblank"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	representatives, err := json.Marshal(req.Representatives)
	if err != nil {
		writeValidationError(w, "invalid representatives")
		return
	}
	owners, err := json.Marshal(req.BeneficialOwnerRefs)
	if err != nil {
		writeValidationError(w, "invalid beneficial owner references")
		return
	}
	h.subjectMutation(w, r, "SetBusinessAuthority", string(representatives), string(owners))
}

func (h *StudyHandler) FreezeSubject(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Reason models.StudyRestrictionReason `json:"reason_code" validate:"required,restriction_reason"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	h.subjectMutation(w, r, "FreezeSubject", string(req.Reason))
}

func (h *StudyHandler) RequestUnfreeze(w http.ResponseWriter, r *http.Request) {
	var req struct {
		AuthorityEvidenceRef string `json:"authority_evidence_ref" validate:"required,len=64,hexadecimal"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	h.subjectMutation(w, r, "RequestUnfreeze", req.AuthorityEvidenceRef)
}

func (h *StudyHandler) ApproveUnfreeze(w http.ResponseWriter, r *http.Request) {
	h.subjectMutation(w, r, "ApproveUnfreeze")
}

func (h *StudyHandler) CreateStaff(w http.ResponseWriter, r *http.Request) {
	var req struct {
		ClientID string `json:"client_id" validate:"required,notblank"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submit(r, studyCentralBankMSP, "rupiah-controls", "CreateStaffPending", req.ClientID); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "staff_pending")
}

func (h *StudyHandler) ProtectStaff(w http.ResponseWriter, r *http.Request) {
	if err := h.submit(r, studyCentralBankMSP, "rupiah-controls", "ProtectStaff", mux.Vars(r)["client_id"]); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "staff_protected")
}

func (h *StudyHandler) SetStaffRole(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Role string `json:"role" validate:"required,oneof=kyc_reviewer senior_approver compliance_officer"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submit(r, studyCentralBankMSP, "rupiah-controls", "SetStaffRole", mux.Vars(r)["client_id"], req.Role); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "role_set")
}

func (h *StudyHandler) InitializeMonetary(w http.ResponseWriter, r *http.Request) {
	if err := h.submit(r, studyCentralBankMSP, "rupiah-monetary", "Initialize"); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "initialized")
}

func (h *StudyHandler) RegisterDistributor(w http.ResponseWriter, r *http.Request) {
	var req struct {
		DistributorID string `json:"distributor_id" validate:"required,notblank"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submit(r, studyCentralBankMSP, "rupiah-monetary", "RegisterDistributor", req.DistributorID); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "distributor_registered")
}

func (h *StudyHandler) Mint(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Amount string `json:"amount" validate:"required,positive_int64"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if !requireStudyIdempotencyKey(w, r) {
		return
	}
	if err := h.submit(r, studyCentralBankMSP, "rupiah-monetary", "Mint", req.Amount, r.Header.Get("Idempotency-Key")); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "minted")
}

func (h *StudyHandler) AllocateReserve(w http.ResponseWriter, r *http.Request) {
	var req struct {
		DistributorID string `json:"distributor_id" validate:"required,notblank"`
		Amount        string `json:"amount" validate:"required,positive_int64"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if !requireStudyIdempotencyKey(w, r) {
		return
	}
	if err := h.submit(r, studyCentralBankMSP, "rupiah-monetary", "AllocateReserve", req.DistributorID, req.Amount, r.Header.Get("Idempotency-Key")); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "reserve_allocated")
}

func (h *StudyHandler) RedeemReserve(w http.ResponseWriter, r *http.Request) {
	var req struct {
		DistributorID string `json:"distributor_id" validate:"required,notblank"`
		Amount        string `json:"amount" validate:"required,positive_int64"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if !requireStudyIdempotencyKey(w, r) {
		return
	}
	if err := h.submit(r, studyCentralBankMSP, "rupiah-monetary", "RedeemReserve", req.DistributorID, req.Amount, r.Header.Get("Idempotency-Key")); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "reserve_redeemed")
}

func (h *StudyHandler) GetSubject(w http.ResponseWriter, r *http.Request) {
	expectedMSP := studyMSPForRole(middleware.GetRole(r))
	if expectedMSP == "" || expectedMSP == studyEndUserMSP {
		writeError(w, http.StatusForbidden, "role cannot read study controls")
		return
	}
	result, err := h.evaluate(r, expectedMSP, "rupiah-controls", "GetSubject", mux.Vars(r)["subject_id"])
	if err != nil {
		writeServiceError(w, err)
		return
	}
	decoder := json.NewDecoder(strings.NewReader(string(result)))
	decoder.UseNumber()
	var subject map[string]any
	if err := decoder.Decode(&subject); err != nil {
		writeServiceError(w, services.Internal("invalid study subject result", err))
		return
	}
	if limits, ok := subject["limits"].(map[string]any); ok {
		for _, key := range []string{"per_transaction", "daily", "monthly", "holdings"} {
			if amount, ok := limits[key].(json.Number); ok {
				limits[key] = amount.String()
			}
		}
	}
	writeJSON(w, http.StatusOK, subject)
}

func studyMSPForRole(role middleware.Role) string {
	switch role {
	case middleware.RolePJP, middleware.RoleBankPjp:
		return studyDistributorMSP
	case middleware.RoleBankIndonesia:
		return studyCentralBankMSP
	case middleware.RoleSupervisor:
		return studyValidatorMSP
	case middleware.RoleAuthenticated, middleware.RoleKycVerified, middleware.RoleMerchant:
		return studyEndUserMSP
	default:
		return ""
	}
}

func (h *StudyHandler) subjectMutation(w http.ResponseWriter, r *http.Request, transaction string, args ...string) {
	args = append([]string{mux.Vars(r)["subject_id"]}, args...)
	if err := h.submit(r, studyDistributorMSP, "rupiah-controls", transaction, args...); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "updated")
}

func (h *StudyHandler) submit(r *http.Request, expectedMSP string, chaincode string, transaction string, args ...string) error {
	_, err := h.submitResult(r, expectedMSP, chaincode, transaction, args...)
	return err
}

func (h *StudyHandler) submitResult(r *http.Request, expectedMSP string, chaincode string, transaction string, args ...string) ([]byte, error) {
	return h.svc.Submit(middleware.GetUsername(r), expectedMSP, chaincode, transaction, args...)
}

func (h *StudyHandler) evaluate(r *http.Request, expectedMSP string, chaincode string, transaction string, args ...string) ([]byte, error) {
	return h.svc.Evaluate(middleware.GetUsername(r), expectedMSP, chaincode, transaction, args...)
}

func requireStudyIdempotencyKey(w http.ResponseWriter, r *http.Request) bool {
	if strings.TrimSpace(r.Header.Get("Idempotency-Key")) == "" {
		writeValidationError(w, "Idempotency-Key is required")
		return false
	}
	return true
}

func writeStudyResult(w http.ResponseWriter, result []byte) {
	if len(result) == 0 || string(result) == "null" {
		writeStatus(w, "submitted")
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(result)
}

func writeStatus(w http.ResponseWriter, status string) {
	writeJSON(w, http.StatusOK, map[string]string{"status": status})
}
