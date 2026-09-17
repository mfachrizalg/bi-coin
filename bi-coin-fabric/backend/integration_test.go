//go:build integration

package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net"
	"net/http"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/joho/godotenv"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

func TestKycPostgresFabricEndToEnd(t *testing.T) {
	if os.Getenv("RUN_INTEGRATION") != "1" {
		t.Skip("set RUN_INTEGRATION=1 to run the live PostgreSQL/Fabric integration test")
	}
	if _, err := os.Stat(".env"); err == nil {
		if err := godotenv.Load(); err != nil {
			t.Fatalf("dotenv: %v", err)
		}
	}

	cfg := config.Load()
	if err := cfg.Validate(); err != nil {
		t.Fatalf("configuration: %v", err)
	}

	ctx := context.Background()
	store, err := services.NewPostgresStore(ctx, cfg.DatabaseURL)
	if err != nil {
		t.Fatalf("postgres store: %v", err)
	}
	defer store.Close()
	if err := store.EnsureBootstrapUsers(ctx, cfg.AuthBootstrapUsersJSON); err != nil {
		t.Fatalf("bootstrap users: %v", err)
	}

	authService := services.NewAuthService(store, cfg.AuthJWTSecret, cfg.AuthTokenTTL)
	ledgerService, err := services.NewLedgerService(cfg)
	if err != nil {
		t.Fatalf("ledger service: %v", err)
	}
	defer ledgerService.Close()
	ledgerService.SetKycStore(store)

	server := newHTTPServer(cfg, authService, ledgerService, store)
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("listener: %v", err)
	}
	go func() { _ = server.Serve(listener) }()
	defer func() {
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		_ = server.Shutdown(shutdownCtx)
	}()

	client := &http.Client{Timeout: 30 * time.Second}
	baseURL := "http://" + listener.Addr().String()
	username := envOr("INTEGRATION_USERNAME", "validator")
	password := envOr("INTEGRATION_PASSWORD", "validator-password")
	measurements := map[string][]float64{}
	for repetition := 1; repetition <= 5; repetition++ {
		var login models.LoginResponse
		measurements["login"] = append(measurements["login"], milliseconds(requestJSON(t, client, baseURL, http.MethodPost, "/auth/login", "", models.LoginRequest{
			Username: username,
			Password: password,
		}, http.StatusOK, &login)))
		if login.AccessToken == "" {
			t.Fatal("login returned an empty access token")
		}

		stamp := time.Now().UTC().Format("20060102T150405.000000000Z")
		customerID := fmt.Sprintf("integration-%d-%s", repetition, stamp)
		documentHash := "sha256:" + customerID
		measurements["create_customer"] = append(measurements["create_customer"], milliseconds(requestJSON(t, client, baseURL, http.MethodPost, "/retail/customers", login.AccessToken, models.RetailCustomerRequest{
			CustomerID:      customerID,
			LegalName:       "Integration Customer",
			WalletAccountID: "wlt_" + customerID,
		}, http.StatusOK, &models.RetailCustomer{})))

		var profile models.KycProfile
		measurements["submit_kyc"] = append(measurements["submit_kyc"], milliseconds(requestJSON(t, client, baseURL, http.MethodPost, "/kyc/profiles", login.AccessToken, models.KycProfileRequest{
			SubjectType:    models.KycRetailCustomer,
			SubjectID:      customerID,
			ProviderCaseID: "case-" + customerID,
			DocumentHashes: []string{documentHash},
			LegalName:      "Integration Customer",
			DocumentType:   "synthetic",
			DocumentNumber: customerID,
		}, http.StatusOK, &profile)))
		if profile.ProfileID == "" {
			t.Fatal("KYC submission returned an empty profile ID")
		}

		expiresAt := "2099-12-31T23:59:59Z"
		measurements["refresh_kyc"] = append(measurements["refresh_kyc"], milliseconds(requestJSON(t, client, baseURL, http.MethodPost, "/kyc/profiles/"+profile.ProfileID+"/refresh", login.AccessToken, models.KycProviderResultRequest{
			ProviderCaseID:    "case-" + customerID,
			Status:            models.KycApproved,
			RiskLevel:         models.RiskLow,
			DueDiligenceLevel: models.DueDiligenceStandard,
			DocumentHashes:    []string{documentHash},
			ExpiresAt:         &expiresAt,
		}, http.StatusOK, &models.KycProfile{})))

		var wallet models.Wallet
		measurements["create_wallet"] = append(measurements["create_wallet"], milliseconds(requestJSON(t, client, baseURL, http.MethodPost, "/wallets", login.AccessToken, models.CreateWalletRequest{
			OwnerID: customerID,
		}, http.StatusOK, &wallet)))
		if wallet.OwnerID != customerID {
			t.Fatalf("wallet owner = %q, want %q", wallet.OwnerID, customerID)
		}

		var stored models.KycProfile
		measurements["get_kyc"] = append(measurements["get_kyc"], milliseconds(requestJSON(t, client, baseURL, http.MethodGet, "/kyc/profiles/"+profile.ProfileID, login.AccessToken, nil, http.StatusOK, &stored)))
		if stored.Status != models.KycApproved || stored.SubjectID != customerID {
			t.Fatalf("stored KYC profile = %+v", stored)
		}
	}

	for step, values := range measurements {
		t.Logf("kyc-e2e step=%s repetitions=%d mean_ms=%.3f sd_ms=%.3f", step, len(values), average(values), sampleSD(values))
	}
}

func requestJSON(t *testing.T, client *http.Client, baseURL, method, route, token string, request interface{}, expectedStatus int, response interface{}) time.Duration {
	t.Helper()
	started := time.Now()
	var body io.Reader
	if request != nil {
		payload, err := json.Marshal(request)
		if err != nil {
			t.Fatalf("marshal %s %s: %v", method, route, err)
		}
		body = bytes.NewReader(payload)
	}
	httpRequest, err := http.NewRequestWithContext(context.Background(), method, baseURL+route, body)
	if err != nil {
		t.Fatalf("create %s %s: %v", method, route, err)
	}
	if request != nil {
		httpRequest.Header.Set("Content-Type", "application/json")
	}
	if token != "" {
		httpRequest.Header.Set("Authorization", "Bearer "+token)
	}
	result, err := client.Do(httpRequest)
	if err != nil {
		t.Fatalf("request %s %s: %v", method, route, err)
	}
	defer result.Body.Close()
	responseBody, err := io.ReadAll(result.Body)
	if err != nil {
		t.Fatalf("read %s %s: %v", method, route, err)
	}
	if result.StatusCode != expectedStatus {
		t.Fatalf("%s %s status=%d body=%s", method, route, result.StatusCode, strings.TrimSpace(string(responseBody)))
	}
	if response != nil && len(responseBody) > 0 {
		if err := json.Unmarshal(responseBody, response); err != nil {
			t.Fatalf("decode %s %s: %v; body=%s", method, route, err, string(responseBody))
		}
	}
	return time.Since(started)
}

func milliseconds(value time.Duration) float64 {
	return float64(value.Microseconds()) / 1000
}

func average(values []float64) float64 {
	var total float64
	for _, value := range values {
		total += value
	}
	return total / float64(len(values))
}

func sampleSD(values []float64) float64 {
	if len(values) < 2 {
		return 0
	}
	mean := average(values)
	var total float64
	for _, value := range values {
		total += (value - mean) * (value - mean)
	}
	return math.Sqrt(total / float64(len(values)-1))
}

func envOr(key, fallback string) string {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		return value
	}
	return fallback
}
