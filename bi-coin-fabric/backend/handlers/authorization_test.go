package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

func TestSupervisorCannotMutateMonetaryPolicyOrParticipantLifecycle(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)

	routes := []struct {
		method string
		path   string
		body   string
	}{
		{http.MethodPost, "/limits", `{"scope":"global_supply","value":"1"}`},
		{http.MethodPost, "/participants/pjp_1/approve", ""},
		{http.MethodPost, "/participants/pjp_1/freeze", ""},
		{http.MethodPost, "/participants/pjp_1/unfreeze", ""},
		{http.MethodPost, "/participants/pjp_1/reject", ""},
		{http.MethodPost, "/participants/pjp_1/offboard", ""},
		{http.MethodPost, "/issuance-requests", `{"participant_id":"pjp_1","amount":"1"}`},
		{http.MethodPost, "/redemption-requests", `{"participant_id":"pjp_1","amount":"1"}`},
		{http.MethodPost, "/distribute", `{"sender_participant_id":"bank_1","receiver_participant_id":"pjp_1","amount":1}`},
		{http.MethodPost, "/ledger/init", ""},
		{http.MethodPost, "/rtgs/issuance-notification", `{}`},
	}

	for _, route := range routes {
		t.Run(route.path, func(t *testing.T) {
			req := httptest.NewRequest(route.method, route.path, strings.NewReader(route.body))
			req = requestWithIdentity(req, middleware.RoleSupervisor, "ojk")
			response := httptest.NewRecorder()
			router.ServeHTTP(response, req)
			if response.Code != http.StatusForbidden {
				t.Fatalf("%s %s got %d, want 403", route.method, route.path, response.Code)
			}
		})
	}
}

func TestRetailTransferRejectsForeignSenderWallet(t *testing.T) {
	contract := &authorizationContract{
		walletOwners: map[string]string{"wlt_alice": "alice"},
	}
	router := mux.NewRouter()
	svc := services.NewLedgerServiceForTest(contract, nil, "")
	New(svc, nil).RegisterRoutes(router)

	req := httptest.NewRequest(http.MethodPost, "/transfers",
		strings.NewReader(`{"sender_id":"wlt_alice","receiver_id":"wlt_bob","amount":"1000"}`))
	req = requestWithIdentity(req, middleware.RoleKycVerified, "mallory")
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)

	if response.Code != http.StatusForbidden {
		t.Fatalf("foreign-wallet transfer got %d, want 403", response.Code)
	}
	if len(contract.submissions) != 0 {
		t.Fatalf("foreign-wallet transfer reached chaincode: %+v", contract.submissions)
	}
}

func TestRetailActorCannotUseInstitutionalRedemptionRoute(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)

	req := httptest.NewRequest(http.MethodPost, "/redemption-requests",
		strings.NewReader(`{"participant_id":"pjp_1","amount":"1000"}`))
	req = requestWithIdentity(req, middleware.RoleKycVerified, "alice")
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)

	if response.Code != http.StatusForbidden {
		t.Fatalf("retail redemption got %d, want 403", response.Code)
	}
}

func TestQrisMutationsRejectForeignWallet(t *testing.T) {
	contract := &authorizationContract{
		walletOwners: map[string]string{"wlt_alice": "alice"},
	}
	router := mux.NewRouter()
	svc := services.NewLedgerServiceForTest(contract, nil, "")
	New(svc, nil).RegisterRoutes(router)

	tests := []struct {
		name string
		role middleware.Role
		path string
		body string
	}{
		{
			name: "payer",
			role: middleware.RoleKycVerified,
			path: "/qris/pay",
			body: `{"payload":"signed-payload","payer_wallet_id":"wlt_alice"}`,
		},
		{
			name: "merchant",
			role: middleware.RoleMerchant,
			path: "/qris/intents",
			body: `{"mode":"static","merchant_wallet_id":"wlt_alice"}`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodPost, tt.path, strings.NewReader(tt.body))
			req = requestWithIdentity(req, tt.role, "mallory")
			response := httptest.NewRecorder()
			router.ServeHTTP(response, req)

			if response.Code != http.StatusForbidden {
				t.Fatalf("foreign-wallet QRIS mutation got %d, want 403", response.Code)
			}
			if len(contract.submissions) != 0 {
				t.Fatalf("foreign-wallet QRIS mutation reached chaincode: %+v", contract.submissions)
			}
		})
	}
}

func TestRetailTransferAllowsOwnedSenderWallet(t *testing.T) {
	contract := &authorizationContract{
		walletOwners: map[string]string{"wlt_alice": "alice"},
	}
	router := mux.NewRouter()
	svc := services.NewLedgerServiceForTest(contract, nil, "")
	New(svc, nil).RegisterRoutes(router)

	req := httptest.NewRequest(http.MethodPost, "/transfers",
		strings.NewReader(`{"sender_id":"wlt_alice","receiver_id":"wlt_bob","amount":"1000"}`))
	req = requestWithIdentity(req, middleware.RoleKycVerified, "alice")
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)

	if response.Code != http.StatusOK {
		t.Fatalf("owned-wallet transfer got %d, want 200: %s", response.Code, response.Body.String())
	}
	if len(contract.submissions) != 1 || contract.submissions[0].name != "Transfer" {
		t.Fatalf("owned-wallet transfer submissions = %+v", contract.submissions)
	}
}

func TestRetailWalletListIgnoresForeignParticipantFilter(t *testing.T) {
	contract := &authorizationContract{}
	router := mux.NewRouter()
	svc := services.NewLedgerServiceForTest(contract, nil, "")
	New(svc, nil).RegisterRoutes(router)

	req := httptest.NewRequest(http.MethodGet, "/wallets?participant_id=alice", nil)
	req = requestWithIdentity(req, middleware.RoleKycVerified, "mallory")
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)

	if response.Code != http.StatusOK {
		t.Fatalf("wallet list got %d, want 200", response.Code)
	}
	if len(contract.evaluations) != 1 {
		t.Fatalf("wallet list evaluations = %+v", contract.evaluations)
	}
	call := contract.evaluations[0]
	if call.name != "ListWallets" || len(call.args) != 1 || call.args[0] != "mallory" {
		t.Fatalf("wallet list call = %+v, want ListWallets(mallory)", call)
	}
}

func requestWithIdentity(req *http.Request, role middleware.Role, username string) *http.Request {
	ctx := context.WithValue(req.Context(), middleware.RoleKey, role)
	ctx = context.WithValue(ctx, middleware.UsernameKey, username)
	ctx = context.WithValue(ctx, middleware.AuthenticatedKey, true)
	return req.WithContext(ctx)
}

type contractCall struct {
	name string
	args []string
}

type authorizationContract struct {
	walletOwners map[string]string
	submissions  []contractCall
	evaluations  []contractCall
}

func (c *authorizationContract) SubmitTransaction(name string, args ...string) ([]byte, error) {
	c.submissions = append(c.submissions, contractCall{name: name, args: append([]string(nil), args...)})
	return []byte("{}"), nil
}

func (c *authorizationContract) EvaluateTransaction(name string, args ...string) ([]byte, error) {
	c.evaluations = append(c.evaluations, contractCall{name: name, args: append([]string(nil), args...)})
	switch name {
	case "GetWallet":
		wallet := map[string]string{
			"wallet_id": args[0],
			"owner_id":  c.walletOwners[args[0]],
		}
		return json.Marshal(wallet)
	case "ListWallets":
		return []byte("[]"), nil
	default:
		return []byte("{}"), nil
	}
}
