package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

type contextKey string

const RoleKey contextKey = "role"
const UsernameKey contextKey = "username"
const AuthenticatedKey contextKey = "authenticated"
const SubjectIDKey contextKey = "subject_id"
const ParticipantIDKey contextKey = "participant_id"
const CustodianMSPIDKey contextKey = "custodian_msp_id"

type Role string

const (
	RolePublic        Role = "public"
	RoleAuthenticated Role = "authenticated"
	RoleKycVerified   Role = "kyc_verified"
	RoleBankPjp       Role = "bank_pjp"
	RoleValidatorBank Role = "validator_bank"
	RolePJP           Role = "pjp"
	RoleBankIndonesia Role = "bank_indonesia"
	RoleMerchant      Role = "merchant"
	RoleSupervisor    Role = "supervisor"
)

type RoleSet map[Role]bool

type TokenClaims struct {
	Username       string
	Role           Role
	SubjectID      string
	ParticipantID  string
	CustodianMSPID string
}

type TokenVerifier interface {
	Verify(token string) (*TokenClaims, error)
}

var (
	AllRoles = RoleSet{
		RolePublic: true, RoleAuthenticated: true, RoleKycVerified: true,
		RoleBankPjp: true, RoleValidatorBank: true, RolePJP: true,
		RoleBankIndonesia: true, RoleMerchant: true, RoleSupervisor: true,
	}
)

func AuthMiddleware(verifier TokenVerifier) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path == "/health" || r.URL.Path == "/auth/login" {
				next.ServeHTTP(w, r)
				return
			}

			ctx := context.WithValue(r.Context(), RoleKey, RolePublic)
			ctx = context.WithValue(ctx, AuthenticatedKey, false)
			header := r.Header.Get("Authorization")
			if header == "" {
				next.ServeHTTP(w, r.WithContext(ctx))
				return
			}

			token, ok := strings.CutPrefix(header, "Bearer ")
			if !ok || token == "" {
				writeError(w, http.StatusUnauthorized, "unauthorized", "invalid authorization header")
				return
			}
			claims, err := verifier.Verify(token)
			if err != nil {
				writeError(w, http.StatusUnauthorized, "unauthorized", "invalid token")
				return
			}
			ctx = context.WithValue(ctx, RoleKey, claims.Role)
			ctx = context.WithValue(ctx, UsernameKey, claims.Username)
			ctx = context.WithValue(ctx, SubjectIDKey, claims.SubjectID)
			ctx = context.WithValue(ctx, ParticipantIDKey, claims.ParticipantID)
			ctx = context.WithValue(ctx, CustodianMSPIDKey, claims.CustodianMSPID)
			ctx = context.WithValue(ctx, AuthenticatedKey, true)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func GetRole(r *http.Request) Role {
	role, _ := r.Context().Value(RoleKey).(Role)
	if role == "" {
		return RolePublic
	}
	return role
}

func GetUsername(r *http.Request) string {
	username, _ := r.Context().Value(UsernameKey).(string)
	return username
}

func GetSubjectID(r *http.Request) string {
	subjectID, _ := r.Context().Value(SubjectIDKey).(string)
	return subjectID
}

func GetParticipantID(r *http.Request) string {
	participantID, _ := r.Context().Value(ParticipantIDKey).(string)
	return participantID
}

func GetCustodianMSPID(r *http.Request) string {
	custodianMSPID, _ := r.Context().Value(CustodianMSPIDKey).(string)
	return custodianMSPID
}

func RequireRole(allowed ...Role) func(http.Handler) http.Handler {
	allowedSet := make(map[Role]bool, len(allowed))
	for _, r := range allowed {
		allowedSet[r] = true
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			role := GetRole(r)
			if !allowedSet[role] {
				authenticated, _ := r.Context().Value(AuthenticatedKey).(bool)
				if !authenticated {
					writeError(w, http.StatusUnauthorized, "unauthorized", "authentication required")
					return
				}
				writeError(w, http.StatusForbidden, "forbidden", "insufficient permissions")
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func writeError(w http.ResponseWriter, status int, code string, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(models.ErrorResponse{
		Code:    code,
		Message: message,
	})
}
