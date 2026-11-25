package handlers

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

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

// studyLedger and studyStore are the parts of the ledger and PostgreSQL services the handlers use, so tests can fake them.
type studyLedger interface {
	Submit(username string, expectedMSP string, chaincode string, transaction string, args ...string) ([]byte, error)
	SubmitWithTransient(username string, expectedMSP string, chaincode string, transaction string, transient map[string][]byte, args ...string) ([]byte, error)
	Evaluate(username string, expectedMSP string, chaincode string, transaction string, args ...string) ([]byte, error)
	IdentityMSP(username string) (string, error)
}

type studyStore interface {
	CreateKYCProfile(ctx context.Context, profile services.KYCProfile) error
	MarkKYCLedgerAnchored(ctx context.Context, subjectID string) error
	RecordKYCReview(ctx context.Context, subjectID string, dttotResult string, lowRiskReason string) error
	RecordKYCUpdate(ctx context.Context, subjectID string, update services.KYCUpdate) error
	SyncKYCStatus(ctx context.Context, subjectID string, state services.LedgerSubjectState) error
	CreateCustomerNotice(ctx context.Context, subjectID string, kind string, reason string) error
	RecordFlow(ctx context.Context, flowID string, kind string, fromID string, toID string, amount int64) error
	ListSederhanaRegister(ctx context.Context) ([]models.SederhanaRegisterEntry, error)
	ListMonitoringAlerts(ctx context.Context) ([]models.MonitoringAlert, error)
	OpenAlertSubject(ctx context.Context, alertID string) (string, error)
	ConfirmMonitoringAlert(ctx context.Context, alertID string, confirmedBy string) error
}

type StudyHandler struct {
	svc         studyLedger
	store       studyStore
	documentDir string
}

func RegisterStudyRoutes(r *mux.Router, svc *services.StudyLedgerService, store *services.PostgresStore, documentDir string) {
	if svc == nil {
		return
	}
	registerStudyRoutes(r, &StudyHandler{svc: svc, store: store, documentDir: documentDir})
}

func registerStudyRoutes(r *mux.Router, h *StudyHandler) {
	compliance := r.NewRoute().Subrouter()

	user := compliance.NewRoute().Subrouter()
	user.Use(middleware.RequireRole(middleware.RoleAuthenticated, middleware.RoleKycVerified))
	user.HandleFunc("/identities/me", h.Identity).Methods("GET").Name("compliance.identities.me")
	user.HandleFunc("/subjects", h.CreateSubject).Methods("POST").Name("compliance.subjects.create")

	customer := compliance.NewRoute().Subrouter()
	customer.Use(middleware.RequireRole(middleware.RoleKycVerified))
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
	distributor.HandleFunc("/subjects/{subject_id}/verifications", h.VerifySubject).Methods("POST").Name("compliance.subjects.verifications.create")
	distributor.HandleFunc("/subjects/{subject_id}/updates", h.UpdateSubject).Methods("POST").Name("compliance.subjects.updates.create")
	distributor.HandleFunc("/subjects/{subject_id}/closures", h.CloseSubject).Methods("POST").Name("compliance.subjects.closures.create")
	distributor.HandleFunc("/subjects/{subject_id}/low-risk-revocations", h.RevokeLowRisk).Methods("POST").Name("compliance.subjects.low-risk-revocations.create")
	distributor.HandleFunc("/monitoring-alerts/{alert_id}/confirmations", h.ConfirmAlert).Methods("POST").Name("compliance.monitoring-alerts.confirmations.create")
	distributor.HandleFunc("/subjects/{subject_id}/restrictions", h.FreezeSubject).Methods("POST").Name("compliance.subjects.restrictions.create")
	distributor.HandleFunc("/subjects/{subject_id}/restriction-release-requests", h.RequestUnfreeze).Methods("POST").Name("compliance.subjects.restriction-release-requests.create")
	distributor.HandleFunc("/subjects/{subject_id}/restriction-release-decisions", h.ApproveUnfreeze).Methods("POST").Name("compliance.subjects.restriction-release-decisions.create")

	centralBank := compliance.NewRoute().Subrouter()
	centralBank.Use(middleware.RequireRole(middleware.RoleBankIndonesia))
	centralBank.HandleFunc("/cdd-ceilings", h.SetCddCeilings).Methods("PUT").Name("compliance.cdd-ceilings.update")
	centralBank.HandleFunc("/staff", h.CreateStaff).Methods("POST").Name("compliance.staff.create")
	centralBank.HandleFunc("/staff/{client_id}/endorsement-policies", h.ProtectStaff).Methods("POST").Name("compliance.staff.endorsement-policies.create")
	centralBank.HandleFunc("/staff/{client_id}/role", h.SetStaffRole).Methods("PUT").Name("compliance.staff.role.update")
	centralBank.HandleFunc("/monetary-initializations", h.InitializeMonetary).Methods("POST").Name("compliance.monetary-initializations.create")
	centralBank.HandleFunc("/distributors", h.RegisterDistributor).Methods("POST").Name("compliance.distributors.create")
	centralBank.HandleFunc("/issuances", h.Issue).Methods("POST").Name("compliance.issuances.create")
	centralBank.HandleFunc("/reserve-redemptions", h.RedeemReserve).Methods("POST").Name("compliance.reserve-redemptions.create")

	register := compliance.NewRoute().Subrouter()
	register.Use(middleware.RequireRole(middleware.RoleBankIndonesia, middleware.RoleAuditor))
	register.HandleFunc("/sederhana-register", h.GetSederhanaRegister).Methods("GET").Name("compliance.sederhana-register.read")

	controlRead := compliance.NewRoute().Subrouter()
	controlRead.Use(middleware.RequireRole(middleware.RoleRetailBank, middleware.RoleBankIndonesia, middleware.RoleAuditor))
	controlRead.HandleFunc("/subjects/{subject_id}", h.GetSubject).Methods("GET").Name("compliance.subjects.read")
	controlRead.HandleFunc("/cdd-ceilings", h.GetCddCeilings).Methods("GET").Name("compliance.cdd-ceilings.read")
	controlRead.HandleFunc("/monitoring-alerts", h.ListMonitoringAlerts).Methods("GET").Name("compliance.monitoring-alerts.read")
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
	result, err := h.svc.Submit(middleware.GetUsername(r), studyEndUserMSP, "rupiah-payments", "Transfer", req.From, req.To, req.Amount, r.Header.Get("Idempotency-Key"))
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
	// Funding emits no ledger event, so the monitor learns of it here to rebuild balances for rule R1.
	if amount, err := strconv.ParseInt(req.Amount, 10, 64); err == nil {
		if err := h.store.RecordFlow(r.Context(), "funding:"+r.Header.Get("Idempotency-Key"), "funding", req.DistributorID, req.SubjectID, amount); err != nil {
			log.Printf("record funding for monitoring: %v", err)
		}
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
	case middleware.RoleAuthenticated, middleware.RoleKycVerified:
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

// parseDocumentForm reads a multipart form that carries an identity document. It writes the error response itself.
func parseDocumentForm(w http.ResponseWriter, r *http.Request) bool {
	r.Body = http.MaxBytesReader(w, r.Body, services.MaxDocumentBytes+studyFormOverheadBytes)
	if err := r.ParseMultipartForm(services.MaxDocumentBytes); err != nil {
		writeValidationError(w, "multipart form with a document of at most 2 MB is required")
		return false
	}
	return true
}

// storeIdentityDocument checks the uploaded PNG or JPEG and stores it by SHA-256. It writes the error response itself.
func (h *StudyHandler) storeIdentityDocument(w http.ResponseWriter, r *http.Request) (string, bool) {
	file, _, err := r.FormFile("document")
	if err != nil {
		writeValidationError(w, "document is required")
		return "", false
	}
	defer file.Close()
	data, err := io.ReadAll(io.LimitReader(file, services.MaxDocumentBytes+1))
	if err != nil {
		writeValidationError(w, "document could not be read")
		return "", false
	}
	if err := services.ValidateDocument(data); err != nil {
		writeServiceError(w, err)
		return "", false
	}
	documentRef, err := services.StoreDocument(h.documentDir, data)
	if err != nil {
		writeServiceError(w, services.Internal("store identity document", err))
		return "", false
	}
	return documentRef, true
}

func validBirthDate(value string) bool {
	_, err := time.Parse(time.DateOnly, value)
	return err == nil
}

// CreateSubject takes the onboarding form and a PNG or JPEG identity document. The server generates the
// subject ID and salt, stores the document by SHA-256, and writes the profile before CreatePending.
// Only the retail category exists under CDD Sederhana.
func (h *StudyHandler) CreateSubject(w http.ResponseWriter, r *http.Request) {
	if !parseDocumentForm(w, r) {
		return
	}
	category := strings.TrimSpace(r.FormValue("category"))
	legalName := strings.TrimSpace(r.FormValue("legal_name"))
	documentType := strings.TrimSpace(r.FormValue("document_type"))
	documentNumber := strings.TrimSpace(r.FormValue("document_number"))
	address := strings.TrimSpace(r.FormValue("address"))
	birthPlace := strings.TrimSpace(r.FormValue("birth_place"))
	birthDate := strings.TrimSpace(r.FormValue("birth_date"))
	if category != "retail" || legalName == "" || documentType == "" || documentNumber == "" || address == "" || birthPlace == "" {
		writeValidationError(w, "category retail, legal_name, document_type, document_number, address, and birth_place are required")
		return
	}
	if !validBirthDate(birthDate) {
		writeValidationError(w, "birth_date must be a date in YYYY-MM-DD form")
		return
	}
	documentRef, ok := h.storeIdentityDocument(w, r)
	if !ok {
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
		Address: address, BirthPlace: birthPlace, BirthDate: birthDate,
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
	h.syncProfile(r, mux.Vars(r)["subject_id"])
	writeStatus(w, "decided")
}

// RecordReview stores the reviewer's manual DTTOT result and low-risk decision. The reviewer states both explicitly,
// and a low-risk decision carries its reason (guideline Bab 7). Nothing is defaulted.
func (h *StudyHandler) RecordReview(w http.ResponseWriter, r *http.Request) {
	var req struct {
		DttotResult   string `json:"dttot_result" validate:"required,dttot_result"`
		LowRisk       *bool  `json:"low_risk" validate:"required"`
		LowRiskReason string `json:"low_risk_reason"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	dttotResult, lowRisk := req.DttotResult, *req.LowRisk
	lowRiskReason := strings.TrimSpace(req.LowRiskReason)
	if lowRisk && lowRiskReason == "" {
		writeValidationError(w, "low_risk_reason is required when low_risk is true")
		return
	}
	subjectID := mux.Vars(r)["subject_id"]
	contents := map[string]any{"dttot_result": dttotResult, "low_risk": lowRisk, "low_risk_reason": lowRiskReason}
	if err := h.submitSubjectPayload(r, "RecordReview", subjectID, contents); err != nil {
		writeServiceError(w, err)
		return
	}
	if err := h.store.RecordKYCReview(r.Context(), subjectID, dttotResult, lowRiskReason); err != nil {
		log.Printf("store review of subject %s: %v", subjectID, err)
	}
	writeStatus(w, "updated")
}

// VerifySubject records the reviewer's manual identity verification, which lifts the subject to the verified ceiling.
func (h *StudyHandler) VerifySubject(w http.ResponseWriter, r *http.Request) {
	var req struct {
		EvidenceRef string `json:"evidence_ref" validate:"required,len=64,hexadecimal"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	subjectID := mux.Vars(r)["subject_id"]
	if err := h.submitSubjectPayload(r, "VerifySubject", subjectID, map[string]string{"evidence_ref": req.EvidenceRef}); err != nil {
		writeServiceError(w, err)
		return
	}
	h.syncProfile(r, subjectID)
	writeStatus(w, "verified")
}

// UpdateSubject replaces the identity document after a data update. The ledger returns the subject to unverified.
func (h *StudyHandler) UpdateSubject(w http.ResponseWriter, r *http.Request) {
	if !parseDocumentForm(w, r) {
		return
	}
	update := services.KYCUpdate{
		DttotResult:    strings.TrimSpace(r.FormValue("dttot_result")),
		LegalName:      strings.TrimSpace(r.FormValue("legal_name")),
		DocumentType:   strings.TrimSpace(r.FormValue("document_type")),
		DocumentNumber: strings.TrimSpace(r.FormValue("document_number")),
		Address:        strings.TrimSpace(r.FormValue("address")),
		BirthPlace:     strings.TrimSpace(r.FormValue("birth_place")),
		BirthDate:      strings.TrimSpace(r.FormValue("birth_date")),
	}
	if !models.StudyDttotResult(update.DttotResult).Valid() {
		writeValidationError(w, "dttot_result must be not_listed or listed")
		return
	}
	if update.BirthDate != "" && !validBirthDate(update.BirthDate) {
		writeValidationError(w, "birth_date must be a date in YYYY-MM-DD form")
		return
	}
	documentRef, ok := h.storeIdentityDocument(w, r)
	if !ok {
		return
	}
	update.DocumentHash = documentRef
	subjectID := mux.Vars(r)["subject_id"]
	contents := map[string]string{"documentRef": documentRef, "dttot_result": update.DttotResult}
	if err := h.submitSubjectPayload(r, "UpdateSubject", subjectID, contents); err != nil {
		writeServiceError(w, err)
		return
	}
	if err := h.store.RecordKYCUpdate(r.Context(), subjectID, update); err != nil {
		log.Printf("store update of subject %s: %v", subjectID, err)
	}
	h.syncProfile(r, subjectID)
	writeStatus(w, "updated")
}

// CloseSubject ends the relationship and records the written notice owed to the customer (guideline Bab 8).
func (h *StudyHandler) CloseSubject(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Reason models.StudyCloseReason `json:"reason" validate:"required,close_reason"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	subjectID := mux.Vars(r)["subject_id"]
	if err := h.submitSubjectPayload(r, "CloseSubject", subjectID, map[string]string{"reason": string(req.Reason)}); err != nil {
		writeServiceError(w, err)
		return
	}
	h.syncProfile(r, subjectID)
	if err := h.store.CreateCustomerNotice(r.Context(), subjectID, "closure", string(req.Reason)); err != nil {
		writeServiceError(w, services.Internal("subject is closed on the ledger but the customer notice was not stored", err))
		return
	}
	writeStatus(w, "closed")
}

// RevokeLowRisk takes the subject out of CDD Sederhana. It writes no customer notice (anti-tipping-off).
func (h *StudyHandler) RevokeLowRisk(w http.ResponseWriter, r *http.Request) {
	subjectID := mux.Vars(r)["subject_id"]
	if err := h.submit(r, studyDistributorMSP, "rupiah-controls", "RevokeLowRisk", subjectID); err != nil {
		writeServiceError(w, err)
		return
	}
	h.syncProfile(r, subjectID)
	writeStatus(w, "low_risk_revoked")
}

// ConfirmAlert records the compliance officer's suspicion: it revokes low risk on the ledger, then writes the LTKM
// draft and marks the alert confirmed. The draft is not sent to PPATK and the customer gets no notice.
func (h *StudyHandler) ConfirmAlert(w http.ResponseWriter, r *http.Request) {
	alertID := mux.Vars(r)["alert_id"]
	subjectID, err := h.store.OpenAlertSubject(r.Context(), alertID)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	// A second alert for a subject already outside CDD Sederhana is confirmed without a second revocation.
	state, err := h.subjectState(r, subjectID)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	if state.LowRisk {
		if err := h.submit(r, studyDistributorMSP, "rupiah-controls", "RevokeLowRisk", subjectID); err != nil {
			writeServiceError(w, err)
			return
		}
		h.syncProfile(r, subjectID)
	}
	if err := h.store.ConfirmMonitoringAlert(r.Context(), alertID, middleware.GetUsername(r)); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "confirmed")
}

// subjectState reads the subject from the ledger as the Distributor.
func (h *StudyHandler) subjectState(r *http.Request, subjectID string) (services.LedgerSubjectState, error) {
	var state services.LedgerSubjectState
	result, err := h.evaluate(r, studyDistributorMSP, "rupiah-controls", "GetSubject", subjectID)
	if err != nil {
		return state, err
	}
	if err := json.Unmarshal(result, &state); err != nil {
		return state, services.Internal("invalid study subject result", err)
	}
	return state, nil
}

// syncProfile mirrors the ledger subject state into PostgreSQL after a mutation. The ledger stays authoritative,
// so a failure is logged and does not fail the request.
func (h *StudyHandler) syncProfile(r *http.Request, subjectID string) {
	state, err := h.subjectState(r, subjectID)
	if err == nil {
		err = h.store.SyncKYCStatus(r.Context(), subjectID, state)
	}
	if err != nil {
		log.Printf("sync KYC profile of subject %s: %v", subjectID, err)
	}
}

func (h *StudyHandler) SetCddCeilings(w http.ResponseWriter, r *http.Request) {
	var req struct {
		UnverifiedHoldings string `json:"unverified_holdings" validate:"required,positive_int64"`
		VerifiedHoldings   string `json:"verified_holdings" validate:"required,positive_int64"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	if err := h.submit(r, studyCentralBankMSP, "rupiah-controls", "SetCddCeilings", req.UnverifiedHoldings, req.VerifiedHoldings); err != nil {
		writeServiceError(w, err)
		return
	}
	writeStatus(w, "ceilings_set")
}

func (h *StudyHandler) GetCddCeilings(w http.ResponseWriter, r *http.Request) {
	result, err := h.evaluate(r, studyMSPForRole(middleware.GetRole(r)), "rupiah-controls", "GetCddCeilings")
	if err != nil {
		writeServiceError(w, err)
		return
	}
	decoder := json.NewDecoder(strings.NewReader(string(result)))
	decoder.UseNumber()
	var ceilings map[string]any
	if err := decoder.Decode(&ceilings); err != nil {
		writeServiceError(w, services.Internal("invalid study ceilings result", err))
		return
	}
	for _, key := range []string{"unverified_holdings", "verified_holdings"} {
		if amount, ok := ceilings[key].(json.Number); ok {
			ceilings[key] = amount.String()
		}
	}
	writeJSON(w, http.StatusOK, ceilings)
}

func (h *StudyHandler) GetSederhanaRegister(w http.ResponseWriter, r *http.Request) {
	entries, err := h.store.ListSederhanaRegister(r.Context())
	if err != nil {
		writeServiceError(w, services.Internal("list Sederhana register", err))
		return
	}
	writeJSON(w, http.StatusOK, entries)
}

func (h *StudyHandler) ListMonitoringAlerts(w http.ResponseWriter, r *http.Request) {
	alerts, err := h.store.ListMonitoringAlerts(r.Context())
	if err != nil {
		writeServiceError(w, services.Internal("list monitoring alerts", err))
		return
	}
	writeJSON(w, http.StatusOK, alerts)
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
