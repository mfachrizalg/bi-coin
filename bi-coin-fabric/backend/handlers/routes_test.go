package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"slices"
	"strings"
	"testing"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
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
		{http.MethodPost, "/transfers", middleware.RolePJP},
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

func TestQrisRoutesAreNotRegistered(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)
	for _, route := range []struct {
		method string
		path   string
	}{
		{http.MethodPost, "/qris/resolve"},
		{http.MethodPost, "/qris/pay"},
		{http.MethodPost, "/qris/intents"},
		{http.MethodGet, "/qris/intents"},
		{http.MethodGet, "/qris/intents/intent-1"},
		{http.MethodPost, "/qris/intents/intent-1/cancel"},
	} {
		req := httptest.NewRequest(route.method, route.path, nil)
		if router.Match(req, &mux.RouteMatch{}) {
			t.Errorf("%s %s is still registered", route.method, route.path)
		}
	}
}

func TestKycIssuanceAndRedemptionRequireIdempotencyKeys(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)
	for _, route := range []struct {
		path string
		role middleware.Role
		body string
	}{
		{"/kyc/profiles", middleware.RolePJP, `{"subject_type":"retail_customer","subject_id":"customer-1"}`},
		{"/issuance-requests", middleware.RoleBankIndonesia, `{"amount":"1000"}`},
		{"/redemption-requests", middleware.RoleBankIndonesia, `{"participant_id":"bank-1","amount":"1000"}`},
	} {
		req := httptest.NewRequest(http.MethodPost, route.path, strings.NewReader(route.body))
		req = requestWithRole(req, route.role)
		response := httptest.NewRecorder()
		router.ServeHTTP(response, req)
		if response.Code != http.StatusUnprocessableEntity || !strings.Contains(response.Body.String(), "Idempotency-Key is required") {
			t.Errorf("%s got %d %s; want missing-key validation", route.path, response.Code, response.Body.String())
		}
	}
}

func TestDocsHideDisabledQrisPaths(t *testing.T) {
	spec := []byte(`{"paths":{"/transfers":{"post":{}},"/qris/pay":{"post":{}},"/issuance-requests":{"post":{}},"/redemption-requests":{"post":{}},"/kyc/profiles":{"post":{}}}}`)
	router := mux.NewRouter()
	NewDocsHandler(DocsSpecs{KycVerified: spec, Merchant: spec}).RegisterRoutes(router)

	for _, role := range []string{"kyc_verified", "merchant"} {
		response := httptest.NewRecorder()
		router.ServeHTTP(response, httptest.NewRequest(http.MethodGet, "/docs/"+role+"/openapi.json", nil))
		if response.Code != http.StatusOK {
			t.Fatalf("%s API docs got %d, want 200", role, response.Code)
		}
		var document struct {
			Paths map[string]json.RawMessage `json:"paths"`
		}
		if err := json.Unmarshal(response.Body.Bytes(), &document); err != nil {
			t.Fatalf("decode %s API docs: %v", role, err)
		}
		if _, ok := document.Paths["/qris/pay"]; ok {
			t.Errorf("%s API docs still expose QRIS", role)
		}
		if _, ok := document.Paths["/transfers"]; !ok {
			t.Errorf("%s API docs lost transfers", role)
		}
		for _, path := range []string{"/issuance-requests", "/redemption-requests", "/kyc/profiles"} {
			var operation struct {
				Parameters []struct {
					Name     string `json:"name"`
					In       string `json:"in"`
					Required bool   `json:"required"`
				} `json:"parameters"`
			}
			var pathItem map[string]json.RawMessage
			if err := json.Unmarshal(document.Paths[path], &pathItem); err != nil {
				t.Fatalf("decode %s path: %v", path, err)
			}
			if err := json.Unmarshal(pathItem["post"], &operation); err != nil {
				t.Fatalf("decode %s operation: %v", path, err)
			}
			requiredKey := false
			for _, parameter := range operation.Parameters {
				requiredKey = requiredKey || (parameter.Name == "Idempotency-Key" && parameter.In == "header" && parameter.Required)
			}
			if !requiredKey {
				t.Errorf("%s docs do not require Idempotency-Key", path)
			}
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

func TestRetailKycMutationIsRestrictedToCustodianRoles(t *testing.T) {
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

func TestExplicitCustodianRolesCanReachKycValidation(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)
	for _, role := range []middleware.Role{middleware.RoleBankPjp, middleware.RolePJP} {
		req := httptest.NewRequest(http.MethodPost, "/kyc/profiles", strings.NewReader("not-json"))
		req = requestWithRole(req, role)
		response := httptest.NewRecorder()
		router.ServeHTTP(response, req)
		if response.Code != http.StatusUnprocessableEntity {
			t.Fatalf("role %s got %d, want request validation 422", role, response.Code)
		}
	}
}

func TestSupervisorCanReadParticipantsButCannotSubmit(t *testing.T) {
	router := mux.NewRouter()
	svc := services.NewLedgerServiceForTest(routeTestContract{}, nil, "")
	New(svc, nil).RegisterRoutes(router)

	readReq := httptest.NewRequest(http.MethodGet, "/participants", nil)
	readReq = requestWithRole(readReq, middleware.RoleSupervisor)
	readResponse := httptest.NewRecorder()
	router.ServeHTTP(readResponse, readReq)
	if readResponse.Code != http.StatusOK {
		t.Fatalf("supervisor participant read got %d, want 200", readResponse.Code)
	}

	writeReq := httptest.NewRequest(http.MethodPost, "/participants", strings.NewReader("{}"))
	writeReq = requestWithRole(writeReq, middleware.RoleSupervisor)
	writeResponse := httptest.NewRecorder()
	router.ServeHTTP(writeResponse, writeReq)
	if writeResponse.Code != http.StatusForbidden {
		t.Fatalf("supervisor participant submit got %d, want 403", writeResponse.Code)
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

func TestAuthMeIncludesPrincipalFields(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)

	req := httptest.NewRequest(http.MethodGet, "/auth/me", nil)
	ctx := context.WithValue(req.Context(), middleware.RoleKey, middleware.RoleMerchant)
	ctx = context.WithValue(ctx, middleware.UsernameKey, "merchant-user")
	ctx = context.WithValue(ctx, middleware.SubjectIDKey, "merchant-subject")
	ctx = context.WithValue(ctx, middleware.ParticipantIDKey, "participant-1")
	ctx = context.WithValue(ctx, middleware.CustodianMSPIDKey, "PJP-MSP")
	ctx = context.WithValue(ctx, middleware.AuthenticatedKey, true)

	response := httptest.NewRecorder()
	router.ServeHTTP(response, req.WithContext(ctx))

	body := response.Body.String()
	if response.Code != http.StatusOK {
		t.Fatalf("auth me got %d, want 200", response.Code)
	}
	for _, want := range []string{"merchant-user", "merchant-subject", "participant-1", "PJP-MSP"} {
		if !strings.Contains(body, want) {
			t.Fatalf("auth me body %s missing %q", body, want)
		}
	}
}

func requestWithRole(req *http.Request, role middleware.Role) *http.Request {
	ctx := context.WithValue(req.Context(), middleware.RoleKey, role)
	ctx = context.WithValue(ctx, middleware.AuthenticatedKey, true)
	return req.WithContext(ctx)
}

type routeTestContract struct{}

func (routeTestContract) SubmitTransaction(name string, args ...string) ([]byte, error) {
	return []byte("{}"), nil
}

func (routeTestContract) EvaluateTransaction(name string, args ...string) ([]byte, error) {
	return []byte("[]"), nil
}

func mustParseURL(t *testing.T, path string) *url.URL {
	t.Helper()
	u, err := url.Parse(path)
	if err != nil {
		t.Fatalf("parse URL: %v", err)
	}
	return u
}

func TestOversightReadsAreLimitedToBankIndonesiaAndSupervisor(t *testing.T) {
	routes := []struct {
		path      string
		chaincode string
	}{
		{"/transactions", "GetTransactions"},
		{"/supervision/events", "GetSupervisionEvents"},
		{"/reports/reconciliation", "GetReconciliationReport"},
		{"/reports/metrics", "GetMetrics"},
	}
	allowed := []middleware.Role{middleware.RoleBankIndonesia, middleware.RoleSupervisor}
	denied := []middleware.Role{middleware.RolePJP, middleware.RoleBankPjp, middleware.RoleKycVerified, middleware.RoleMerchant}

	for _, route := range routes {
		for _, role := range append(append([]middleware.Role{}, allowed...), denied...) {
			t.Run(string(role)+route.path, func(t *testing.T) {
				contract := &oversightContract{}
				router := mux.NewRouter()
				New(services.NewLedgerServiceForTest(contract, nil, ""), nil).RegisterRoutes(router)

				req := requestWithRole(httptest.NewRequest(http.MethodGet, route.path, nil), role)
				response := httptest.NewRecorder()
				router.ServeHTTP(response, req)

				wantCode, wantCalls := http.StatusForbidden, []string(nil)
				if slices.Contains(allowed, role) {
					wantCode, wantCalls = http.StatusOK, []string{route.chaincode}
				}
				if response.Code != wantCode {
					t.Fatalf("got %d, want %d: %s", response.Code, wantCode, response.Body.String())
				}
				if strings.Join(contract.evaluated, ",") != strings.Join(wantCalls, ",") {
					t.Fatalf("chaincode evaluations = %v, want %v", contract.evaluated, wantCalls)
				}
			})
		}
	}
}

type oversightContract struct{ evaluated []string }

func (c *oversightContract) SubmitTransaction(name string, args ...string) ([]byte, error) {
	return nil, fmt.Errorf("oversight read submitted %s", name)
}

func (c *oversightContract) EvaluateTransaction(name string, args ...string) ([]byte, error) {
	c.evaluated = append(c.evaluated, name)
	if name == "GetTransactions" || name == "GetSupervisionEvents" {
		return []byte("[]"), nil
	}
	return []byte("{}"), nil
}
