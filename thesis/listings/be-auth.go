package middleware

import (
	"context"
	"net/http"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
)

type contextKey string

const RoleKey contextKey = "role"

type Role string

const (
	RolePublic        Role = "public"
	RoleAuthenticated Role = "authenticated"
	RoleKycVerified   Role = "kyc_verified"
	RoleBankPjp       Role = "bank_pjp"
	RoleBankIndonesia Role = "bank_indonesia"
	RoleMerchant      Role = "merchant"
	RoleSupervisor    Role = "supervisor"
)

type RoleSet map[Role]bool

var (
	AllRoles = RoleSet{
		RolePublic: true, RoleAuthenticated: true, RoleKycVerified: true,
		RoleBankPjp: true, RoleBankIndonesia: true, RoleMerchant: true, RoleSupervisor: true,
	}
)

func AuthMiddleware(cfg *config.Config) func(http.Handler) http.Handler {
	keyToRole := map[string]Role{
		cfg.PublicAPIKey:        RolePublic,
		cfg.AuthenticatedAPIKey: RoleAuthenticated,
		cfg.KycVerifiedAPIKey:   RoleKycVerified,
		cfg.BankPjpAPIKey:       RoleBankPjp,
		cfg.BankIndonesiaAPIKey: RoleBankIndonesia,
		cfg.MerchantAPIKey:      RoleMerchant,
		cfg.SupervisorAPIKey:    RoleSupervisor,
	}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			apiKey := r.Header.Get("X-API-Key")
			role, ok := keyToRole[apiKey]
			if !ok {
				role = RolePublic
			}
			ctx := context.WithValue(r.Context(), RoleKey, role)
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

func RequireRole(allowed ...Role) func(http.Handler) http.Handler {
	allowedSet := make(map[Role]bool, len(allowed))
	for _, r := range allowed {
		allowedSet[r] = true
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			role := GetRole(r)
			if !allowedSet[role] {
				http.Error(w, `{"detail":[{"loc":["header","X-API-Key"],"msg":"insufficient permissions","type":"auth_error"}]}`, http.StatusForbidden)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
