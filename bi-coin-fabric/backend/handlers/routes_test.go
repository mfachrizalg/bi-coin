package handlers

import (
	"context"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
)

func TestOfflineRoutesAreNotRegistered(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)

	offlineRoutes := []struct {
		method string
		path   string
	}{
		{http.MethodPost, "/offline/devices"},
		{http.MethodGet, "/offline/devices"},
		{http.MethodPost, "/offline/devices/device-1/load"},
		{http.MethodPost, "/offline/payments/sync"},
		{http.MethodGet, "/offline/payments"},
	}

	for _, route := range offlineRoutes {
		req := &http.Request{Method: route.method, URL: mustParseURL(t, route.path)}
		match := &mux.RouteMatch{}
		if router.Match(req, match) {
			t.Fatalf("%s %s is still registered", route.method, route.path)
		}
	}
}

func TestCurrentRetailRoutesAreRegistered(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)

	currentRoutes := []struct {
		method string
		path   string
		role   middleware.Role
	}{
		{http.MethodPost, "/kyc/profiles", middleware.RoleBankPjp},
		{http.MethodPost, "/kyc/profiles/kyc_budi/refresh", middleware.RoleBankPjp},
		{http.MethodPost, "/transfers", middleware.RoleKycVerified},
		{http.MethodPost, "/transfers", middleware.RoleMerchant},
	}

	for _, route := range currentRoutes {
		req := httptest.NewRequest(route.method, route.path, strings.NewReader("not-json"))
		req = requestWithRole(req, route.role)
		response := httptest.NewRecorder()
		router.ServeHTTP(response, req)
		if response.Code != http.StatusUnprocessableEntity {
			t.Fatalf("%s %s role %s got %d, want request validation 422",
				route.method, route.path, route.role, response.Code)
		}
	}
}

func TestDocsRoleTaglinesUseCurrentScope(t *testing.T) {
	docs := NewDocsHandler(DocsSpecs{})
	for role, info := range docs.roles {
		if strings.Contains(strings.ToLower(info.TagLine), "queue") {
			t.Fatalf("role %s tagline still mentions queue: %q", role, info.TagLine)
		}
	}
}

func TestRetailKycMutationIsRestrictedToBankPjp(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)

	for _, role := range []middleware.Role{middleware.RoleBankIndonesia, middleware.RoleSupervisor, middleware.RoleKycVerified, middleware.RoleMerchant} {
		req := httptest.NewRequest(http.MethodPost, "/kyc/profiles", strings.NewReader("{}"))
		req = requestWithRole(req, role)
		response := httptest.NewRecorder()
		router.ServeHTTP(response, req)
		if response.Code != http.StatusForbidden {
			t.Fatalf("role %s got %d, want 403", role, response.Code)
		}
	}
}

func TestMerchantCanReachTransferValidation(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)
	req := httptest.NewRequest(http.MethodPost, "/transfers", strings.NewReader("not-json"))
	req = requestWithRole(req, middleware.RoleMerchant)
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)
	if response.Code != http.StatusUnprocessableEntity {
		t.Fatalf("merchant transfer got %d, want request validation 422", response.Code)
	}
}

func requestWithRole(req *http.Request, role middleware.Role) *http.Request {
	ctx := context.WithValue(req.Context(), middleware.RoleKey, role)
	ctx = context.WithValue(ctx, middleware.AuthenticatedKey, true)
	return req.WithContext(ctx)
}

func mustParseURL(t *testing.T, path string) *url.URL {
	t.Helper()
	u, err := url.Parse(path)
	if err != nil {
		t.Fatalf("parse URL: %v", err)
	}
	return u
}
