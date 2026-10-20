package handlers

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"reflect"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

type Handler struct {
	auth *services.AuthService
}

func decodeJSON(w http.ResponseWriter, r *http.Request, target interface{}) bool {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		var maxBytesError *http.MaxBytesError
		if errors.As(err, &maxBytesError) {
			writeError(w, http.StatusRequestEntityTooLarge, "request body too large")
			return false
		}
		writeValidationError(w, "invalid request body")
		return false
	}
	if err := validateJSONShape(body); err != nil {
		writeValidationError(w, "request body must contain one JSON value with unique object fields")
		return false
	}
	if err := json.Unmarshal(body, target); err != nil {
		writeValidationError(w, "invalid request body")
		return false
	}
	if err := validateRequest(target); err != nil {
		writeRequestValidationErrors(w, err)
		return false
	}
	return true
}

func writeServiceError(w http.ResponseWriter, err error) {
	var appError *services.AppError
	if errors.As(err, &appError) {
		writeJSON(w, appError.Status, models.ErrorResponse{Code: string(appError.Code), Message: appError.Message})
		return
	}
	log.Printf("service error: %v", err)
	writeError(w, http.StatusInternalServerError, "internal server error")
}

func New(auth *services.AuthService) *Handler {
	return &Handler{auth: auth}
}

func (h *Handler) RegisterRoutes(r *mux.Router) {
	// Public
	r.HandleFunc("/health", h.Health).Methods("GET")
	r.HandleFunc("/auth/login", h.Login).Methods("POST")
	r.HandleFunc("/auth/me", h.Me).Methods("GET")
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
	code := "error"
	switch status {
	case http.StatusUnauthorized:
		code = "unauthorized"
	case http.StatusForbidden:
		code = "forbidden"
	case http.StatusNotFound:
		code = "not_found"
	case http.StatusConflict:
		code = "conflict"
	case http.StatusUnprocessableEntity:
		code = "validation_error"
	case http.StatusRequestEntityTooLarge:
		code = "payload_too_large"
	default:
		if status >= http.StatusInternalServerError {
			code = "internal_error"
			msg = "internal server error"
		}
	}
	writeJSON(w, status, models.ErrorResponse{Code: code, Message: msg})
}

func writeValidationError(w http.ResponseWriter, msg string) {
	writeJSON(w, http.StatusUnprocessableEntity, models.ErrorResponse{
		Code: "validation_error",
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
	if !decodeJSON(w, r, &req) {
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
		Username:       middleware.GetUsername(r),
		Role:           string(role),
		SubjectID:      middleware.GetSubjectID(r),
		ParticipantID:  middleware.GetParticipantID(r),
		CustodianMSPID: middleware.GetCustodianMSPID(r),
	})
}
