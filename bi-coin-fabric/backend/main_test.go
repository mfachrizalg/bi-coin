package main

import (
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/config"
)

func TestLimitRequestBodyRejectsOversizedPayload(t *testing.T) {
	handler := limitRequestBody(8)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusRequestEntityTooLarge)
			return
		}
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest(http.MethodPost, "/auth/login", strings.NewReader(`{"too":"large"}`))
	resp := httptest.NewRecorder()
	handler.ServeHTTP(resp, req)

	if resp.Code != http.StatusRequestEntityTooLarge {
		t.Fatalf("status = %d, want 413", resp.Code)
	}
}

func TestNewHTTPServerUsesConfiguredTimeouts(t *testing.T) {
	cfg := &config.Config{
		Port:              "8080",
		MaxBodyBytes:      128,
		ReadTimeout:       3 * time.Second,
		ReadHeaderTimeout: 2 * time.Second,
		WriteTimeout:      5 * time.Second,
		IdleTimeout:       7 * time.Second,
	}

	server := newHTTPServer(cfg, nil, nil)
	if server.ReadTimeout != 3*time.Second || server.ReadHeaderTimeout != 2*time.Second || server.WriteTimeout != 5*time.Second || server.IdleTimeout != 7*time.Second {
		t.Fatalf("server timeouts = %+v", server)
	}
}

func TestNewHTTPServerAllowsIdempotencyKeyCorsHeader(t *testing.T) {
	source, err := os.ReadFile("main.go")
	if err != nil {
		t.Fatalf("read main.go: %v", err)
	}
	if !strings.Contains(string(source), `"Idempotency-Key"`) {
		t.Fatalf("main.go does not allow Idempotency-Key in CORS headers")
	}
}
