package middleware

import (
	"context"
	"net/http"
	"strings"
)

type contextKey string

const RoleKey contextKey = "role"
const UsernameKey contextKey = "username"
const AuthenticatedKey contextKey = "authenticated"

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

type TokenClaims struct {
	Username string
	Role     Role
}

type TokenVerifier interface {
	Verify(token string) (*TokenClaims, error)
}

var (
	AllRoles = RoleSet{
		RolePublic: true, RoleAuthenticated: true, RoleKycVerified: true,
		RoleBankPjp: true, RoleBankIndonesia: true, RoleMerchant: true, RoleSupervisor: true,
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
				http.Error(w, `{"message":"invalid authorization header"}`, http.StatusUnauthorized)
				return
			}
			claims, err := verifier.Verify(token)
			if err != nil {
				http.Error(w, `{"message":"invalid token"}`, http.StatusUnauthorized)
				return
			}
			ctx = context.WithValue(ctx, RoleKey, claims.Role)
			ctx = context.WithValue(ctx, UsernameKey, claims.Username)
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
					http.Error(w, `{"message":"authentication required"}`, http.StatusUnauthorized)
					return
				}
				http.Error(w, `{"detail":[{"loc":["header","Authorization"],"msg":"insufficient permissions","type":"auth_error"}]}`, http.StatusForbidden)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
