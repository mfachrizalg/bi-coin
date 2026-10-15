package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"slices"
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
	req.Header.Set("Idempotency-Key", "transfer-foreign")
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

func TestQrisMutationsAreDisabled(t *testing.T) {
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

			if response.Code != http.StatusNotFound {
				t.Fatalf("QRIS mutation got %d, want 404 while disabled", response.Code)
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
	req.Header.Set("Idempotency-Key", "transfer-owned")
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
	if call.name != "ListWalletsByOwner" || len(call.args) != 1 || call.args[0] != "mallory" {
		t.Fatalf("wallet list call = %+v, want ListWalletsByOwner(mallory)", call)
	}
}

func TestRetailBalancesAreScopedToOwnedWallets(t *testing.T) {
	contract := &authorizationContract{
		walletOwners: map[string]string{"wlt_alice": "alice"},
	}
	router := mux.NewRouter()
	svc := services.NewLedgerServiceForTest(contract, nil, "")
	New(svc, nil).RegisterRoutes(router)

	req := httptest.NewRequest(http.MethodGet, "/balances", nil)
	req = requestWithIdentity(req, middleware.RoleKycVerified, "alice")
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)

	if response.Code != http.StatusOK {
		t.Fatalf("balances got %d, want 200", response.Code)
	}
	body := response.Body.String()
	if !strings.Contains(body, "wlt_alice") || strings.Contains(body, "wlt_other") {
		t.Fatalf("scoped balances body = %s", body)
	}
}

func TestRetailBalancesDoNotUseSharedCustodianAsOwnership(t *testing.T) {
	contract := &authorizationContract{
		walletOwners: map[string]string{"wlt_alice": "alice"},
	}
	router := mux.NewRouter()
	svc := services.NewLedgerServiceForTest(contract, nil, "")
	New(svc, nil).RegisterRoutes(router)

	req := httptest.NewRequest(http.MethodGet, "/balances", nil)
	req = requestWithIdentity(req, middleware.RoleKycVerified, "alice")
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)

	if response.Code != http.StatusOK {
		t.Fatalf("balances got %d, want 200", response.Code)
	}
	body := response.Body.String()
	if !strings.Contains(body, "wlt_alice") || strings.Contains(body, "wlt_same-custodian") {
		t.Fatalf("shared-custodian balances body = %s", body)
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
	switch name {
	case "Transfer":
		return []byte(`{"status":"settled","tx_id":"tx-1","reference_id":"` + args[3] + `","sender_id":"` + args[0] + `","receiver_id":"` + args[1] + `","amount":1000}`), nil
	case "RequestIssuance":
		return []byte(`{"status":"issued","reference_id":"` + args[1] + `","wallet_id":"bi_treasury","amount":` + args[0] + `,"tx_id":"tx-1"}`), nil
	case "RequestRedemption":
		return []byte(`{"status":"redeemed","reference_id":"` + args[2] + `","participant_id":"` + args[0] + `","amount":` + args[1] + `,"tx_id":"tx-1"}`), nil
	case "DistributeToParticipant":
		return []byte(`{"status":"settled","tx_id":"tx-1","reference_id":"` + args[2] + `","sender_id":"bi_treasury","receiver_id":"wlt_` + args[0] + `","amount":` + args[1] + `}`), nil
	case "PayQris":
		return []byte(`{"status":"paid","tx_id":"tx-1"}`), nil
	default:
		return []byte("{}"), nil
	}
}

func (c *authorizationContract) EvaluateTransaction(name string, args ...string) ([]byte, error) {
	c.evaluations = append(c.evaluations, contractCall{name: name, args: append([]string(nil), args...)})
	switch name {
	case "GetOperationReceipt":
		return []byte("null"), nil
	case "GetWallet":
		wallet := map[string]string{
			"wallet_id": args[0],
			"owner_id":  c.walletOwners[args[0]],
		}
		return json.Marshal(wallet)
	case "ListWallets", "ListWalletsByOwner":
		return []byte(`[{"wallet_id":"wlt_alice","owner_id":"alice","participant_id":"part-alice"}]`), nil
	case "GetBalances":
		return []byte(`[
			{"participant_id":"part-alice","wallet_id":"wlt_alice","balance":1000,"reserve_balance":0},
				{"participant_id":"part-alice","wallet_id":"wlt_same-custodian","balance":8888,"reserve_balance":0},
				{"participant_id":"part-other","wallet_id":"wlt_other","balance":9999,"reserve_balance":0}
		]`), nil
	default:
		return []byte("{}"), nil
	}
}

func TestParticipantAndTreasuryMutationsRouteToLedgerForPermittedRoles(t *testing.T) {
	biOnly := []middleware.Role{middleware.RoleBankIndonesia}
	applicants := []middleware.Role{middleware.RoleBankIndonesia, middleware.RoleValidatorBank, middleware.RolePJP, middleware.RoleBankPjp}
	roles := []middleware.Role{middleware.RoleBankIndonesia, middleware.RoleValidatorBank, middleware.RolePJP,
		middleware.RoleBankPjp, middleware.RoleKycVerified, middleware.RoleMerchant}

	routes := []struct {
		path      string
		body      string
		chaincode string
		allowed   []middleware.Role
	}{
		{"/participants", `{"participant_id":"pjp_1","name":"PJP One","participant_type":"pjp"}`, "SubmitParticipant", applicants},
		{"/participants/pjp_1/approve", "", "ApproveParticipant", biOnly},
		{"/participants/pjp_1/freeze", "", "FreezeParticipant", biOnly},
		{"/participants/pjp_1/unfreeze", "", "UnfreezeParticipant", biOnly},
		{"/participants/pjp_1/reject", "", "RejectParticipant", biOnly},
		{"/participants/pjp_1/offboard", "", "OffboardParticipant", biOnly},
		{"/issuance-requests", `{"amount":"1000"}`, "RequestIssuance", biOnly},
		{"/redemption-requests", `{"participant_id":"pjp_1","amount":"1000"}`, "RequestRedemption", biOnly},
		{"/distribute", `{"receiver_participant_id":"pjp_1","amount":"1000"}`, "DistributeToParticipant", biOnly},
	}

	for _, route := range routes {
		for _, role := range roles {
			t.Run(string(role)+route.path, func(t *testing.T) {
				contract := &authorizationContract{}
				router := mux.NewRouter()
				New(services.NewLedgerServiceForTest(contract, nil, ""), nil).RegisterRoutes(router)

				req := httptest.NewRequest(http.MethodPost, route.path, strings.NewReader(route.body))
				req.Header.Set("Idempotency-Key", "mutation-"+string(role))
				req = requestWithIdentity(req, role, string(role))
				response := httptest.NewRecorder()
				router.ServeHTTP(response, req)

				if !slices.Contains(route.allowed, role) {
					if response.Code != http.StatusForbidden || len(contract.submissions) != 0 {
						t.Fatalf("got %d with submissions %+v, want 403 and no chaincode call", response.Code, contract.submissions)
					}
					return
				}
				if response.Code != http.StatusOK {
					t.Fatalf("got %d, want 200: %s", response.Code, response.Body.String())
				}
				if len(contract.submissions) != 1 || contract.submissions[0].name != route.chaincode {
					t.Fatalf("submissions = %+v, want one %s", contract.submissions, route.chaincode)
				}
				if strings.Contains(route.path, "pjp_1") && contract.submissions[0].args[0] != "pjp_1" {
					t.Fatalf("%s args = %v, want pjp_1 first", route.chaincode, contract.submissions[0].args)
				}
			})
		}
	}
}
