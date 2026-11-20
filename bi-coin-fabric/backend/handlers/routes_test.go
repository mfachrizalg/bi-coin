package handlers

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

func studyRequest(method, path, body string, role middleware.Role) *http.Request {
	req := httptest.NewRequest(method, path, strings.NewReader(body))
	ctx := context.WithValue(req.Context(), middleware.RoleKey, role)
	ctx = context.WithValue(ctx, middleware.UsernameKey, "user")
	ctx = context.WithValue(ctx, middleware.AuthenticatedKey, true)
	return req.WithContext(ctx)
}

func TestControlRoutesEnforceRoles(t *testing.T) {
	router := mux.NewRouter()
	RegisterStudyRoutes(router, &services.StudyLedgerService{}, nil, "")

	centralBank := []middleware.Role{middleware.RoleBankIndonesia}
	read := []middleware.Role{middleware.RoleRetailBank, middleware.RoleBankIndonesia, middleware.RoleAuditor}
	allRoles := []middleware.Role{
		middleware.RoleAuthenticated, middleware.RoleKycVerified, middleware.RoleRetailBank,
		middleware.RoleBankIndonesia, middleware.RoleMerchant, middleware.RoleAuditor,
	}
	routes := []struct {
		name     string
		method   string
		template string
		path     string
		allowed  []middleware.Role
	}{
		{"compliance.distributors.create", "POST", "/distributors", "/distributors", centralBank},
		{"compliance.distributors.read", "GET", "/distributors/{distributor_id}", "/distributors/distributor-1", read},
	}
	for _, route := range routes {
		t.Run(route.name, func(t *testing.T) {
			registered := router.Get(route.name)
			if registered == nil {
				t.Fatalf("route %s is not registered", route.name)
			}
			template, _ := registered.GetPathTemplate()
			methods, _ := registered.GetMethods()
			if template != route.template || len(methods) != 1 || methods[0] != route.method {
				t.Fatalf("route %s = %s %v, want %s %s", route.name, template, methods, route.method, route.template)
			}
			for _, role := range allRoles {
				allowed := false
				for _, candidate := range route.allowed {
					allowed = allowed || candidate == role
				}
				response := httptest.NewRecorder()
				router.ServeHTTP(response, studyRequest(route.method, route.path, `{}`, role))
				denied := response.Code == http.StatusForbidden && strings.Contains(response.Body.String(), "insufficient permissions")
				if denied == allowed || response.Code == http.StatusNotFound || response.Code == http.StatusMethodNotAllowed {
					t.Fatalf("%s as %s: status %d body %s, allowed=%t", route.name, role, response.Code, response.Body.String(), allowed)
				}
			}
		})
	}
	for _, removed := range []string{
		"compliance.interbank-transfers.create",
		"compliance.distributors.approval-threshold-proposals.create",
		"compliance.distributors.status.update",
		"compliance.transfer-limit.update",
		"compliance.transfer-limit.read",
	} {
		if router.Get(removed) != nil {
			t.Fatalf("removed route %s is still registered", removed)
		}
	}
}

func TestRegisterDistributorRequiresDistributorID(t *testing.T) {
	router := mux.NewRouter()
	RegisterStudyRoutes(router, &services.StudyLedgerService{}, nil, "")
	response := httptest.NewRecorder()
	router.ServeHTTP(response, studyRequest("POST", "/distributors", `{}`, middleware.RoleBankIndonesia))
	if response.Code != http.StatusUnprocessableEntity || !strings.Contains(response.Body.String(), "distributor_id") {
		t.Fatalf("missing distributor_id: status %d body %s", response.Code, response.Body.String())
	}
}

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
