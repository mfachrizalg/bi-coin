package handlers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"slices"
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
	svc         *services.StudyLedgerService
	store       *services.PostgresStore
	documentDir string
}

func RegisterStudyRoutes(r *mux.Router, svc *services.StudyLedgerService, store *services.PostgresStore, documentDir string) {
	if svc == nil {
		return
	}
	h := &StudyHandler{svc: svc, store: store, documentDir: documentDir}
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
	distributor.Use(middleware.RequireRole(middleware.RoleRetailBank))
	distributor.HandleFunc("/conversions", h.ConvertToRetail).Methods("POST").Name("compliance.conversions.create")
	distributor.HandleFunc("/wallet-fundings", h.FundWallet).Methods("POST").Name("compliance.wallet-fundings.create")
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
	centralBank.HandleFunc("/issuances", h.Issue).Methods("POST").Name("compliance.issuances.create")
	centralBank.HandleFunc("/reserve-redemptions", h.RedeemReserve).Methods("POST").Name("compliance.reserve-redemptions.create")

	controlRead := compliance.NewRoute().Subrouter()
	controlRead.Use(middleware.RequireRole(middleware.RoleRetailBank, middleware.RoleBankIndonesia, middleware.RoleAuditor))
	controlRead.HandleFunc("/subjects/{subject_id}", h.GetSubject).Methods("GET").Name("compliance.subjects.read")
	controlRead.HandleFunc("/supply/wholesale", h.GetWholesaleSupply).Methods("GET").Name("compliance.supply.wholesale.read")
	controlRead.HandleFunc("/supply/retail", h.GetRetailSupply).Methods("GET").Name("compliance.supply.retail.read")
	controlRead.HandleFunc("/supply/total", h.GetTotalSupply).Methods("GET").Name("compliance.supply.total.read")
	controlRead.HandleFunc("/distributors/{distributor_id}/reserve", h.GetReserve).Methods("GET").Name("compliance.distributors.reserve.read")
	controlRead.HandleFunc("/distributors/{distributor_id}/float", h.GetRetailFloat).Methods("GET").Name("compliance.distributors.float.read")
	controlRead.HandleFunc("/distributors/{distributor_id}", h.GetParticipant).Methods("GET").Name("compliance.distributors.read")
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
	distributor, err := h.svc.DistributorUsername()
	if err != nil {
		writeServiceError(w, err)
		return
	}
	payee, err := h.svc.Evaluate(distributor, studyDistributorMSP, "rupiah-controls", "GetSubjectRecord", req.To)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	result, err := h.svc.SubmitWithTransient(middleware.GetUsername(r), studyEndUserMSP, "rupiah-payments", "Transfer", map[string][]byte{"payee_record": payee}, req.From, req.To, req.Amount, r.Header.Get("Idempotency-Key"))
	if err != nil {
		writeServiceError(w, err)
		return
	}
	writeStudyResult(w, result)
}

func (h *StudyHandler) ConvertToRetail(w http.ResponseWriter, r *http.Request) {
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
	result, err := h.submitResult(r, studyDistributorMSP, "rupiah-payments", "ConvertToRetail", req.DistributorID, req.Amount, r.Header.Get("Idempotency-Key"))
	if err != nil {
		writeServiceError(w, err)
		return
	}
	writeStudyResult(w, result)
}

func (h *StudyHandler) FundWallet(w http.ResponseWriter, r *http.Request) {
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
	result, err := h.submitResult(r, studyDistributorMSP, "rupiah-payments", "FundWallet", req.SubjectID, req.DistributorID, req.Amount, r.Header.Get("Idempotency-Key"))
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
	h.subjectMutation(w, r, "RecordReview")
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
		Role string `json:"role" validate:"required,oneof=kyc_reviewer compliance_officer"`
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

func (h *StudyHandler) Issue(w http.ResponseWriter, r *http.Request) {
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
	if err := h.submit(r, studyCentralBankMSP, "rupiah-monetary", "Issue", req.DistributorID, req.Amount, r.Header.Get("Idempotency-Key")); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "issued")
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

func (h *StudyHandler) GetWholesaleSupply(w http.ResponseWriter, r *http.Request) {
	h.readAmount(w, r, "rupiah-monetary", "GetWholesaleSupply")
}

func (h *StudyHandler) GetRetailSupply(w http.ResponseWriter, r *http.Request) {
	h.readAmount(w, r, "rupiah-monetary", "GetRetailSupply")
}

func (h *StudyHandler) GetTotalSupply(w http.ResponseWriter, r *http.Request) {
	h.readAmount(w, r, "rupiah-monetary", "GetTotalSupply")
}

func (h *StudyHandler) GetReserve(w http.ResponseWriter, r *http.Request) {
	h.readAmount(w, r, "rupiah-monetary", "GetReserve", mux.Vars(r)["distributor_id"])
}

func (h *StudyHandler) GetRetailFloat(w http.ResponseWriter, r *http.Request) {
	h.readAmount(w, r, "rupiah-payments", "GetRetailFloat", mux.Vars(r)["distributor_id"])
}

func (h *StudyHandler) GetParticipant(w http.ResponseWriter, r *http.Request) {
	result, err := h.evaluate(r, studyMSPForRole(middleware.GetRole(r)), "rupiah-monetary", "GetParticipant", mux.Vars(r)["distributor_id"])
	if err != nil {
		writeServiceError(w, err)
		return
	}
	decoder := json.NewDecoder(strings.NewReader(string(result)))
	decoder.UseNumber()
	var participant map[string]any
	if err := decoder.Decode(&participant); err != nil {
		writeServiceError(w, services.Internal("invalid study participant result", err))
		return
	}
	for _, key := range []string{"reserve"} {
		if amount, ok := participant[key].(json.Number); ok {
			participant[key] = amount.String()
		}
	}
	writeJSON(w, http.StatusOK, participant)
}

func (h *StudyHandler) readAmount(w http.ResponseWriter, r *http.Request, chaincode string, transaction string, args ...string) {
	result, err := h.evaluate(r, studyMSPForRole(middleware.GetRole(r)), chaincode, transaction, args...)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	amount, err := strconv.ParseInt(strings.TrimSpace(string(result)), 10, 64)
	if err != nil {
		writeServiceError(w, services.Internal("invalid study amount result", err))
		return
	}
	writeStudyResult(w, []byte(strconv.Quote(strconv.FormatInt(amount, 10))))
}

func studyMSPForRole(role middleware.Role) string {
	switch role {
	case middleware.RoleRetailBank:
		return studyDistributorMSP
	case middleware.RoleBankIndonesia:
		return studyCentralBankMSP
	case middleware.RoleAuditor:
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

const studyFormOverheadBytes = 64 << 10

// CreateSubject takes the onboarding form and a PNG or JPEG identity document. The server generates the
// subject ID and salt, stores the document by SHA-256, and writes the profile before CreatePending.
func (h *StudyHandler) CreateSubject(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, services.MaxDocumentBytes+studyFormOverheadBytes)
	if err := r.ParseMultipartForm(services.MaxDocumentBytes); err != nil {
		writeValidationError(w, "multipart form with a document of at most 2 MB is required")
		return
	}
	category := strings.TrimSpace(r.FormValue("category"))
	legalName := strings.TrimSpace(r.FormValue("legal_name"))
	documentType := strings.TrimSpace(r.FormValue("document_type"))
	documentNumber := strings.TrimSpace(r.FormValue("document_number"))
	if !slices.Contains([]string{"retail", "merchant", "business"}, category) || legalName == "" || documentType == "" || documentNumber == "" {
		writeValidationError(w, "category, legal_name, document_type, and document_number are required")
		return
	}
	file, _, err := r.FormFile("document")
	if err != nil {
		writeValidationError(w, "document is required")
		return
	}
	defer file.Close()
	data, err := io.ReadAll(io.LimitReader(file, services.MaxDocumentBytes+1))
	if err != nil {
		writeValidationError(w, "document could not be read")
		return
	}
	if err := services.ValidateDocument(data); err != nil {
		writeServiceError(w, err)
		return
	}
	documentRef, err := services.StoreDocument(h.documentDir, data)
	if err != nil {
		writeServiceError(w, services.Internal("store identity document", err))
		return
	}
	subjectID, err := services.NewRandomHex(16)
	if err != nil {
		writeServiceError(w, services.Internal("generate subject ID", err))
		return
	}
	salt, err := services.NewRandomHex(32)
	if err != nil {
		writeServiceError(w, services.Internal("generate subject salt", err))
		return
	}
	profileID, err := services.NewRandomHex(16)
	if err != nil {
		writeServiceError(w, services.Internal("generate profile ID", err))
		return
	}
	if err := h.store.CreateKYCProfile(r.Context(), services.KYCProfile{
		ProfileID: profileID, SubjectType: category, SubjectID: subjectID, LegalName: legalName,
		DocumentType: documentType, DocumentNumber: documentNumber, DocumentHash: documentRef,
	}); err != nil {
		writeServiceError(w, services.Internal("store KYC profile", err))
		return
	}
	payload, err := json.Marshal(map[string]string{"category": category, "salt": salt, "documentRef": documentRef})
	if err != nil {
		writeServiceError(w, services.Internal("encode CDD payload", err))
		return
	}
	// A failed ledger call leaves the profile pending. PostgreSQL never authorizes a ledger effect (ADR 0007).
	if _, err := h.svc.SubmitWithTransient(middleware.GetUsername(r), studyEndUserMSP, "rupiah-controls", "CreatePending", map[string][]byte{"payload": payload}, subjectID); err != nil {
		writeServiceError(w, err)
		return
	}
	if err := h.store.MarkKYCLedgerAnchored(r.Context(), subjectID); err != nil {
		log.Printf("mark KYC profile %s ledger-anchored: %v", profileID, err)
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "pending", "subject_id": subjectID})
}

// submitSubjectPayload sends CDD contents in the transient map, so they stay out of the proposal arguments (D8).
func (h *StudyHandler) submitSubjectPayload(r *http.Request, transaction string, subjectID string, contents any) error {
	payload, err := json.Marshal(contents)
	if err != nil {
		return services.Internal("encode CDD payload", err)
	}
	_, err = h.svc.SubmitWithTransient(middleware.GetUsername(r), studyDistributorMSP, "rupiah-controls", transaction, map[string][]byte{"payload": payload}, subjectID)
	return err
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
	limits := make(map[string]int64, 4)
	for key, value := range map[string]string{"per_transaction": req.PerTransaction, "daily": req.Daily, "monthly": req.Monthly, "holdings": req.Holdings} {
		limit, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			writeValidationError(w, "limits must be decimal integer strings")
			return
		}
		limits[key] = limit
	}
	if err := h.submitSubjectPayload(r, "SetLimits", mux.Vars(r)["subject_id"], limits); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "updated")
}

func (h *StudyHandler) DecideSubject(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Approved *bool `json:"approved" validate:"required"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submitSubjectPayload(r, "ApproveSubject", mux.Vars(r)["subject_id"], map[string]bool{"approved": *req.Approved}); err != nil {
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
	contents := map[string][]string{"representatives": req.Representatives, "beneficial_owner_refs": req.BeneficialOwnerRefs}
	if err := h.submitSubjectPayload(r, "SetBusinessAuthority", mux.Vars(r)["subject_id"], contents); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "updated")
}

func (h *StudyHandler) FreezeSubject(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Reason models.StudyRestrictionReason `json:"reason_code" validate:"required,restriction_reason"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submitSubjectPayload(r, "FreezeSubject", mux.Vars(r)["subject_id"], map[string]string{"reason": string(req.Reason)}); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "updated")
}

func (h *StudyHandler) RequestUnfreeze(w http.ResponseWriter, r *http.Request) {
	var req struct {
		AuthorityEvidenceRef string `json:"authority_evidence_ref" validate:"required,len=64,hexadecimal"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submitSubjectPayload(r, "RequestUnfreeze", mux.Vars(r)["subject_id"], map[string]string{"authority_evidence_ref": req.AuthorityEvidenceRef}); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "updated")
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
