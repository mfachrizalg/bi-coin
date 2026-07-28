package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"reflect"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

type Handler struct {
	svc  *services.LedgerService
	auth *services.AuthService
}

func New(svc *services.LedgerService, auth *services.AuthService) *Handler {
	return &Handler{svc: svc, auth: auth}
}

func (h *Handler) RegisterRoutes(r *mux.Router) {
	// Public
	r.HandleFunc("/health", h.Health).Methods("GET")
	r.HandleFunc("/auth/login", h.Login).Methods("POST")
	r.HandleFunc("/auth/me", h.Me).Methods("GET")

	// Wallet reads for authenticated actors.
	auth := r.NewRoute().Subrouter()
	auth.Use(middleware.RequireRole(middleware.RoleAuthenticated, middleware.RoleKycVerified,
		middleware.RoleBankPjp, middleware.RoleBankIndonesia, middleware.RoleSupervisor, middleware.RoleMerchant))
	auth.HandleFunc("/wallets", h.ListWallets).Methods("GET")

	// Bank/PJP performs retail onboarding and KYC decisions.
	kycMutation := r.NewRoute().Subrouter()
	kycMutation.Use(middleware.RequireRole(middleware.RoleBankPjp))
	kycMutation.HandleFunc("/wallets", h.CreateWallet).Methods("POST")
	kycMutation.HandleFunc("/retail/customers", h.CreateRetailCustomer).Methods("POST")
	kycMutation.HandleFunc("/kyc/profiles", h.SubmitKycProfile).Methods("POST")
	kycMutation.HandleFunc("/kyc/profiles/{profile_id}/refresh", h.RefreshKycProfile).Methods("POST")

	// Bank/PJP operates KYC; BI and supervisors have read-only oversight.
	kycRead := r.NewRoute().Subrouter()
	kycRead.Use(middleware.RequireRole(middleware.RoleBankPjp, middleware.RoleBankIndonesia, middleware.RoleSupervisor))
	kycRead.HandleFunc("/retail/customers", h.ListRetailCustomers).Methods("GET")
	kycRead.HandleFunc("/kyc/profiles/{profile_id}", h.GetKycProfile).Methods("GET")
	kycRead.HandleFunc("/kyc/profiles/{profile_id}/provider-checks", h.ListKycProviderChecks).Methods("GET")
	kycRead.HandleFunc("/kyc/profiles/{profile_id}/audit-events", h.ListKycAuditEvents).Methods("GET")

	// Approved customers and merchants initiate retail transfers.
	payments := r.NewRoute().Subrouter()
	payments.Use(middleware.RequireRole(middleware.RoleKycVerified, middleware.RoleMerchant))
	payments.HandleFunc("/transfers", h.Transfer).Methods("POST")
	payments.HandleFunc("/qris/resolve", h.ResolveQris).Methods("POST")
	payments.HandleFunc("/qris/pay", h.PayQris).Methods("POST")
	payments.HandleFunc("/balances", h.GetBalances).Methods("GET")

	merchantQris := r.NewRoute().Subrouter()
	merchantQris.Use(middleware.RequireRole(middleware.RoleMerchant))
	merchantQris.HandleFunc("/qris/intents", h.CreateQrisIntent).Methods("POST")
	merchantQris.HandleFunc("/qris/intents", h.ListQrisIntents).Methods("GET")
	merchantQris.HandleFunc("/qris/intents/{intent_id}", h.GetQrisIntent).Methods("GET")
	merchantQris.HandleFunc("/qris/intents/{intent_id}/cancel", h.CancelQrisIntent).Methods("POST")

	policyMutation := r.NewRoute().Subrouter()
	policyMutation.Use(middleware.RequireRole(middleware.RoleBankIndonesia))
	policyMutation.HandleFunc("/limits", h.SetSystemLimit).Methods("POST")

	policyRead := r.NewRoute().Subrouter()
	policyRead.Use(middleware.RequireRole(middleware.RoleBankIndonesia, middleware.RoleSupervisor))
	policyRead.HandleFunc("/limits", h.ListSystemLimits).Methods("GET")

	// Bank/PJP and Bank Indonesia may submit participant applications.
	bankMutation := r.NewRoute().Subrouter()
	bankMutation.Use(middleware.RequireRole(middleware.RoleBankPjp, middleware.RoleBankIndonesia))
	bankMutation.HandleFunc("/participants", h.SubmitParticipant).Methods("POST")

	// Bank PJP, Bank Indonesia, and supervisors can read participant state.
	participantRead := r.NewRoute().Subrouter()
	participantRead.Use(middleware.RequireRole(middleware.RoleBankPjp, middleware.RoleBankIndonesia, middleware.RoleSupervisor))
	participantRead.HandleFunc("/participants", h.ListParticipants).Methods("GET")
	participantRead.HandleFunc("/participants/{participant_id}", h.GetParticipant).Methods("GET")

	// Bank Indonesia owns monetary policy and participant lifecycle mutations.
	biMutation := r.NewRoute().Subrouter()
	biMutation.Use(middleware.RequireRole(middleware.RoleBankIndonesia))
	biMutation.HandleFunc("/participants/{participant_id}/approve", h.ApproveParticipant).Methods("POST")
	biMutation.HandleFunc("/participants/{participant_id}/freeze", h.FreezeParticipant).Methods("POST")
	biMutation.HandleFunc("/participants/{participant_id}/unfreeze", h.UnfreezeParticipant).Methods("POST")
	biMutation.HandleFunc("/participants/{participant_id}/reject", h.RejectParticipant).Methods("POST")
	biMutation.HandleFunc("/participants/{participant_id}/offboard", h.OffboardParticipant).Methods("POST")
	biMutation.HandleFunc("/issuance-requests", h.RequestIssuance).Methods("POST")
	biMutation.HandleFunc("/redemption-requests", h.RequestRedemption).Methods("POST")
	biMutation.HandleFunc("/distribute", h.DistributeToParticipant).Methods("POST")
	biMutation.HandleFunc("/ledger/init", h.InitLedger).Methods("POST")
	biMutation.HandleFunc("/rtgs/issuance-notification", h.RtgsIssuanceNotification).Methods("POST")

	// Supervisors have read-only oversight.
	oversightRead := r.NewRoute().Subrouter()
	oversightRead.Use(middleware.RequireRole(middleware.RoleBankIndonesia, middleware.RoleSupervisor))
	oversightRead.HandleFunc("/transactions", h.GetTransactions).Methods("GET")
	oversightRead.HandleFunc("/supervision/events", h.GetSupervisionEvents).Methods("GET")
	oversightRead.HandleFunc("/reports/reconciliation", h.GetReconciliationReport).Methods("GET")
	oversightRead.HandleFunc("/reports/metrics", h.GetMetrics).Methods("GET")
}

func withRole(fn http.HandlerFunc, roles ...middleware.Role) http.HandlerFunc {
	return middleware.RequireRole(roles...)(fn).ServeHTTP
}

func isRetailActor(role middleware.Role) bool {
	return role == middleware.RoleKycVerified || role == middleware.RoleMerchant
}

func (h *Handler) requireOwnedWallet(w http.ResponseWriter, r *http.Request, walletID string) bool {
	if !isRetailActor(middleware.GetRole(r)) {
		return true
	}
	wallet, err := h.svc.GetWallet(walletID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return false
	}
	if wallet.OwnerID != middleware.GetUsername(r) {
		writeError(w, http.StatusForbidden, "wallet does not belong to authenticated subject")
		return false
	}
	return true
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if v != nil {
		rv := reflect.ValueOf(v)
		if rv.Kind() == reflect.Slice && rv.IsNil() {
			v = reflect.MakeSlice(rv.Type(), 0, 0).Interface()
		}
	}
	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("write json: %v", err)
	}
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, models.ErrorResponse{Message: msg})
}

func writeValidationError(w http.ResponseWriter, msg string) {
	writeJSON(w, http.StatusUnprocessableEntity, models.ErrorResponse{
		Detail: []models.ValidationError{
			{Msg: msg, Type: "value_error"},
		},
	})
}

// ─── Health ──────────────────────────────────────────────────────────────────

func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, models.HealthResponse{Status: "ok", Timestamp: models.NowUTC()})
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	token, err := h.auth.Login(req)
	if err != nil {
		writeError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}
	writeJSON(w, http.StatusOK, token)
}

func (h *Handler) Me(w http.ResponseWriter, r *http.Request) {
	role := middleware.GetRole(r)
	if role == middleware.RolePublic {
		writeError(w, http.StatusUnauthorized, "authentication required")
		return
	}
	writeJSON(w, http.StatusOK, models.MeResponse{
		Username: middleware.GetUsername(r),
		Role:     string(role),
	})
}

// ─── Network ─────────────────────────────────────────────────────────────────

func (h *Handler) GetTopology(w http.ResponseWriter, r *http.Request) {
	topo, err := h.svc.GetTopology()
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, topo)
}

// ─── Participants ────────────────────────────────────────────────────────────

func (h *Handler) SubmitParticipant(w http.ResponseWriter, r *http.Request) {
	var req models.OnboardingRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	participant, err := h.svc.SubmitParticipant(req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, participant)
}

func (h *Handler) ApproveParticipant(w http.ResponseWriter, r *http.Request) {
	pid := mux.Vars(r)["participant_id"]
	if err := h.svc.ApproveParticipant(pid); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "approved"})
}

func (h *Handler) FreezeParticipant(w http.ResponseWriter, r *http.Request) {
	pid := mux.Vars(r)["participant_id"]
	if err := h.svc.FreezeParticipant(pid); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "frozen"})
}

func (h *Handler) UnfreezeParticipant(w http.ResponseWriter, r *http.Request) {
	pid := mux.Vars(r)["participant_id"]
	if err := h.svc.UnfreezeParticipant(pid); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "unfrozen"})
}

func (h *Handler) RejectParticipant(w http.ResponseWriter, r *http.Request) {
	pid := mux.Vars(r)["participant_id"]
	if err := h.svc.RejectParticipant(pid); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "rejected"})
}

func (h *Handler) OffboardParticipant(w http.ResponseWriter, r *http.Request) {
	pid := mux.Vars(r)["participant_id"]
	if err := h.svc.OffboardParticipant(pid); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "offboarded"})
}

func (h *Handler) GetParticipant(w http.ResponseWriter, r *http.Request) {
	pid := mux.Vars(r)["participant_id"]
	participant, err := h.svc.GetParticipant(pid)
	if err != nil {
		writeError(w, http.StatusNotFound, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, participant)
}

func (h *Handler) ListParticipants(w http.ResponseWriter, r *http.Request) {
	participants, err := h.svc.ListParticipants()
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, participants)
}

// ─── Wallets ─────────────────────────────────────────────────────────────────

func (h *Handler) CreateWallet(w http.ResponseWriter, r *http.Request) {
	var req models.CreateWalletRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	wallet, err := h.svc.CreateWallet(req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, wallet)
}

func (h *Handler) ListWallets(w http.ResponseWriter, r *http.Request) {
	participantID := r.URL.Query().Get("participant_id")
	if isRetailActor(middleware.GetRole(r)) {
		participantID = middleware.GetUsername(r)
	}
	wallets, err := h.svc.ListWallets(participantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, wallets)
}

// ─── Retail Customers ────────────────────────────────────────────────────────

func (h *Handler) CreateRetailCustomer(w http.ResponseWriter, r *http.Request) {
	var req models.RetailCustomerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	customer, err := h.svc.CreateRetailCustomer(req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, customer)
}

func (h *Handler) ListRetailCustomers(w http.ResponseWriter, r *http.Request) {
	customers, err := h.svc.ListRetailCustomers()
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, customers)
}

// ─── KYC ─────────────────────────────────────────────────────────────────────

func (h *Handler) SubmitKycProfile(w http.ResponseWriter, r *http.Request) {
	var req models.KycProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	profile, err := h.svc.SubmitKycProfile(req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, profile)
}

func (h *Handler) RefreshKycProfile(w http.ResponseWriter, r *http.Request) {
	profileID := mux.Vars(r)["profile_id"]
	var req models.KycProviderResultRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	profile, err := h.svc.RefreshKycProfile(profileID, req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, profile)
}

func (h *Handler) GetKycProfile(w http.ResponseWriter, r *http.Request) {
	profileID := mux.Vars(r)["profile_id"]
	profile, err := h.svc.GetKycProfile(profileID)
	if err != nil {
		writeError(w, http.StatusNotFound, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, profile)
}

func (h *Handler) ListKycProviderChecks(w http.ResponseWriter, r *http.Request) {
	profileID := mux.Vars(r)["profile_id"]
	checks, err := h.svc.ListKycProviderChecks(profileID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, checks)
}

func (h *Handler) ListKycAuditEvents(w http.ResponseWriter, r *http.Request) {
	profileID := mux.Vars(r)["profile_id"]
	events, err := h.svc.ListKycAuditEvents(profileID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, events)
}

// ─── Limits ──────────────────────────────────────────────────────────────────

func (h *Handler) SetSystemLimit(w http.ResponseWriter, r *http.Request) {
	var req models.SetLimitRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	if err := h.svc.SetSystemLimit(req); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "limit set"})
}

func (h *Handler) ListSystemLimits(w http.ResponseWriter, r *http.Request) {
	scope := r.URL.Query().Get("scope")
	limits, err := h.svc.ListSystemLimits(scope)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, limits)
}

// ─── Liquidity ───────────────────────────────────────────────────────────────

func (h *Handler) RequestIssuance(w http.ResponseWriter, r *http.Request) {
	var req models.AmountRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	amount, err := strconv.ParseInt(req.Amount, 10, 64)
	if err != nil {
		writeValidationError(w, "invalid amount")
		return
	}
	if err := h.svc.RequestIssuance(req.ParticipantID, amount); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "issued"})
}

func (h *Handler) DistributeToParticipant(w http.ResponseWriter, r *http.Request) {
	var req models.DistributeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	if req.SenderParticipantID == "" || req.ReceiverParticipantID == "" {
		writeValidationError(w, "sender_participant_id and receiver_participant_id are required")
		return
	}
	if req.Amount <= 0 {
		writeValidationError(w, "amount must be positive")
		return
	}
	if err := h.svc.DistributeToParticipant(req.SenderParticipantID, req.ReceiverParticipantID, req.Amount); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "distributed"})
}

func (h *Handler) RequestRedemption(w http.ResponseWriter, r *http.Request) {
	var req models.AmountRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	amount, err := strconv.ParseInt(req.Amount, 10, 64)
	if err != nil {
		writeValidationError(w, "invalid amount")
		return
	}
	if err := h.svc.RequestRedemption(req.ParticipantID, amount); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "redeemed"})
}

func (h *Handler) Transfer(w http.ResponseWriter, r *http.Request) {
	var req models.TransferRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	if !h.requireOwnedWallet(w, r, req.SenderID) {
		return
	}
	result, err := h.svc.Transfer(req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, result)
}

func (h *Handler) CreateQrisIntent(w http.ResponseWriter, r *http.Request) {
	var req models.CreateQrisIntentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	if req.MerchantWalletID == "" {
		writeValidationError(w, "merchant_wallet_id is required")
		return
	}
	if !h.requireOwnedWallet(w, r, req.MerchantWalletID) {
		return
	}
	req.MerchantID = middleware.GetUsername(r)
	intent, err := h.svc.CreateQrisIntent(req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, intent)
}

func (h *Handler) ListQrisIntents(w http.ResponseWriter, r *http.Request) {
	merchantID := middleware.GetUsername(r)
	intents, err := h.svc.ListQrisIntents(merchantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, intents)
}

func (h *Handler) GetQrisIntent(w http.ResponseWriter, r *http.Request) {
	intentID := mux.Vars(r)["intent_id"]
	intent, err := h.svc.GetQrisIntent(intentID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	if intent.MerchantID != middleware.GetUsername(r) {
		writeError(w, http.StatusForbidden, "QRIS intent does not belong to authenticated merchant")
		return
	}
	writeJSON(w, http.StatusOK, intent)
}

func (h *Handler) CancelQrisIntent(w http.ResponseWriter, r *http.Request) {
	intentID := mux.Vars(r)["intent_id"]
	if intentID == "" {
		writeValidationError(w, "intent_id is required")
		return
	}
	intent, err := h.svc.GetQrisIntent(intentID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	if intent.MerchantID != middleware.GetUsername(r) {
		writeError(w, http.StatusForbidden, "QRIS intent does not belong to authenticated merchant")
		return
	}
	if err := h.svc.CancelQrisIntent(intentID); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "cancelled"})
}

func (h *Handler) ResolveQris(w http.ResponseWriter, r *http.Request) {
	var req models.ResolveQrisRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	if req.Payload == "" {
		writeValidationError(w, "payload is required")
		return
	}
	intent, err := h.svc.ResolveQrisPayload(req.Payload)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, intent)
}

func (h *Handler) PayQris(w http.ResponseWriter, r *http.Request) {
	var req models.PayQrisRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	if req.Payload == "" || req.PayerWalletID == "" {
		writeValidationError(w, "payload and payer_wallet_id are required")
		return
	}
	if !h.requireOwnedWallet(w, r, req.PayerWalletID) {
		return
	}
	result, err := h.svc.PayQris(req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, result)
}

func (h *Handler) GetBalances(w http.ResponseWriter, r *http.Request) {
	balances, err := h.svc.GetBalances()
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, balances)
}

func (h *Handler) RtgsIssuanceNotification(w http.ResponseWriter, r *http.Request) {
	var req models.RtgsIssuanceRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeValidationError(w, "invalid request body")
		return
	}
	if req.SenderBIC == "" || req.Amount == "" || req.Reference == "" {
		writeValidationError(w, "sender_bic, amount, and reference are required")
		return
	}
	amount, err := strconv.ParseInt(req.Amount, 10, 64)
	if err != nil {
		writeValidationError(w, "invalid amount")
		return
	}
	result, err := h.svc.RtgsIssuanceNotification(req.SenderBIC, amount, req.Reference)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, result)
}

// ─── Supervision ─────────────────────────────────────────────────────────────

func (h *Handler) GetTransactions(w http.ResponseWriter, r *http.Request) {
	filters := map[string]string{
		"participant_id":   r.URL.Query().Get("participant_id"),
		"transaction_type": r.URL.Query().Get("transaction_type"),
		"status":           r.URL.Query().Get("status"),
		"from_timestamp":   r.URL.Query().Get("from_timestamp"),
		"to_timestamp":     r.URL.Query().Get("to_timestamp"),
		"limit":            r.URL.Query().Get("limit"),
		"offset":           r.URL.Query().Get("offset"),
	}
	txs, err := h.svc.GetTransactions(filters)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, txs)
}

func (h *Handler) GetSupervisionEvents(w http.ResponseWriter, r *http.Request) {
	events, err := h.svc.GetSupervisionEvents()
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, events)
}

func (h *Handler) GetReconciliationReport(w http.ResponseWriter, r *http.Request) {
	report, err := h.svc.GetReconciliationReport()
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, report)
}

func (h *Handler) GetMetrics(w http.ResponseWriter, r *http.Request) {
	metrics, err := h.svc.GetMetrics()
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, metrics)
}

func TopologyHandler(w http.ResponseWriter, r *http.Request) {
	topo := models.Topology{
		Nodes: []models.TopologyNode{
			{ID: "bi-node", Name: "Bank Indonesia", Type: "central_bank", Role: "issuer", Domain: "bi.go.id"},
			{ID: "validator-a", Name: "Himbara Bank", Type: "validator", Role: "validator", Domain: "bank-himbara.paynet"},
			{ID: "validator-b", Name: "Commercial Bank", Type: "validator", Role: "validator", Domain: "bank-commercial.paynet"},
			{ID: "observer-node", Name: "OJK Observer", Type: "observer", Role: "observer", Domain: "ojk.go.id"},
			{ID: "policy-node", Name: "Policy Oracle", Type: "policy", Role: "policy", Domain: "policy.paynet"},
			{ID: "security-node", Name: "Security Node", Type: "security", Role: "security", Domain: "security.paynet"},
			{ID: "api-gateway", Name: "API Gateway", Type: "gateway", Role: "api", Domain: "api.paynet"},
		},
		Links: []models.TopologyLink{
			{Source: "bi-node", Target: "validator-a", Type: "consensus"},
			{Source: "bi-node", Target: "validator-b", Type: "consensus"},
			{Source: "validator-a", Target: "validator-b", Type: "p2p"},
			{Source: "validator-a", Target: "api-gateway", Type: "api"},
			{Source: "validator-b", Target: "api-gateway", Type: "api"},
			{Source: "observer-node", Target: "validator-a", Type: "observe"},
			{Source: "observer-node", Target: "validator-b", Type: "observe"},
			{Source: "bi-node", Target: "observer-node", Type: "oversight"},
		},
	}
	writeJSON(w, http.StatusOK, topo)
}

func (h *Handler) InitLedger(w http.ResponseWriter, r *http.Request) {
	if err := h.svc.InitLedger(); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ledger initialized"})
}
