package handlers

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
)

func TestAuthMeIncludesPrincipalFields(t *testing.T) {
	router := mux.NewRouter()
	New(nil).RegisterRoutes(router)

	req := httptest.NewRequest(http.MethodGet, "/auth/me", nil)
	ctx := context.WithValue(req.Context(), middleware.RoleKey, middleware.RoleMerchant)
	ctx = context.WithValue(ctx, middleware.UsernameKey, "merchant-user")
	ctx = context.WithValue(ctx, middleware.SubjectIDKey, "merchant-subject")
	ctx = context.WithValue(ctx, middleware.ParticipantIDKey, "participant-1")
	ctx = context.WithValue(ctx, middleware.CustodianMSPIDKey, "DistributorMSP")
	ctx = context.WithValue(ctx, middleware.AuthenticatedKey, true)

	response := httptest.NewRecorder()
	router.ServeHTTP(response, req.WithContext(ctx))

	body := response.Body.String()
	if response.Code != http.StatusOK {
		t.Fatalf("auth me got %d, want 200", response.Code)
	}
	for _, want := range []string{"merchant-user", "merchant-subject", "participant-1", "DistributorMSP"} {
		if !strings.Contains(body, want) {
			t.Fatalf("auth me body %s missing %q", body, want)
		}
	}
}
