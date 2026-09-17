package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
)

type openAPIDoc struct {
	Paths      map[string]map[string]openAPIOperation `json:"paths"`
	Components struct {
		SecuritySchemes map[string]map[string]any `json:"securitySchemes"`
		Schemas         map[string]map[string]any `json:"schemas"`
	} `json:"components"`
}

type openAPIOperation struct {
	Security    []map[string][]string `json:"security"`
	Parameters  []map[string]any      `json:"parameters"`
	RequestBody struct {
		Content map[string]struct {
			Schema map[string]any `json:"schema"`
		} `json:"content"`
	} `json:"requestBody"`
	Responses map[string]struct {
		Content map[string]struct {
			Schema map[string]any `json:"schema"`
		} `json:"content"`
	} `json:"responses"`
}

func TestEmbeddedOpenAPISpecsMatchV3Contracts(t *testing.T) {
	files := []string{
		"openapi-public.json",
		"openapi-authenticated.json",
		"openapi-kyc_verified.json",
		"openapi-bank_pjp.json",
		"openapi-validator_bank.json",
		"openapi-pjp.json",
		"openapi-bank_indonesia.json",
		"openapi-merchant.json",
		"openapi-supervisor.json",
	}

	docs := map[string]openAPIDoc{}
	for _, name := range files {
		path := filepath.Join("docs", "api", name)
		raw, err := os.ReadFile(path)
		if err != nil {
			t.Fatalf("read %s: %v", name, err)
		}
		var doc openAPIDoc
		if err := json.Unmarshal(raw, &doc); err != nil {
			t.Fatalf("parse %s: %v", name, err)
		}
		if _, ok := doc.Components.SecuritySchemes["BearerAuth"]; !ok {
			t.Fatalf("%s missing BearerAuth scheme", name)
		}
		if _, ok := doc.Components.SecuritySchemes["APIKeyHeader"]; ok {
			t.Fatalf("%s still exposes APIKeyHeader", name)
		}
		docs[name] = doc
	}

	bankPjp := docs["openapi-bank_pjp.json"]
	if _, ok := bankPjp.Paths["/participants/{participant_id}/approve"]; ok {
		t.Fatal("bank_pjp spec still exposes BI-only participant approval")
	}
	if _, ok := bankPjp.Paths["/issuance-requests"]; ok {
		t.Fatal("bank_pjp spec still exposes BI-only issuance")
	}

	supervisor := docs["openapi-supervisor.json"]
	for path, methods := range supervisor.Paths {
		for method := range methods {
			if path == "/auth/login" {
				if method != "post" {
					t.Fatalf("supervisor auth/login should stay post, got %s", method)
				}
				continue
			}
			if method != "get" {
				t.Fatalf("supervisor path %s unexpectedly exposes %s", path, method)
			}
		}
	}

	merchant := docs["openapi-merchant.json"]
	if _, ok := merchant.Paths["/redemption-requests"]; ok {
		t.Fatal("merchant spec still exposes BI-only redemption")
	}
	if _, ok := merchant.Paths["/qris/intents"]; !ok {
		t.Fatal("merchant spec missing qris intents surface")
	}

	kycVerified := docs["openapi-kyc_verified.json"]
	if _, ok := kycVerified.Paths["/issuance-requests"]; ok {
		t.Fatal("kyc_verified spec still exposes BI-only issuance")
	}
	if _, ok := kycVerified.Paths["/qris/pay"]; !ok {
		t.Fatal("kyc_verified spec missing qris pay")
	}

	authenticated := docs["openapi-authenticated.json"]
	if _, ok := authenticated.Paths["/auth/me"]; !ok {
		t.Fatal("authenticated spec missing /auth/me")
	}

	publicDoc := docs["openapi-public.json"]
	if _, ok := publicDoc.Paths["/auth/login"]; !ok {
		t.Fatal("public spec missing /auth/login")
	}

	checkIdempotency(t, docs["openapi-kyc_verified.json"], "/transfers", "post")
	checkIdempotency(t, docs["openapi-merchant.json"], "/transfers", "post")
	checkIdempotency(t, docs["openapi-kyc_verified.json"], "/qris/pay", "post")
	checkIdempotency(t, docs["openapi-merchant.json"], "/qris/pay", "post")
	checkIdempotency(t, docs["openapi-bank_indonesia.json"], "/distribute", "post")

	createWallet := bankPjp.Components.Schemas["CreateWalletRequestBody"]
	props, _ := createWallet["properties"].(map[string]any)
	if _, ok := props["owner_id"]; !ok {
		t.Fatal("CreateWalletRequestBody missing owner_id")
	}
	if _, ok := props["participant_id"]; ok {
		t.Fatal("CreateWalletRequestBody still exposes participant_id")
	}

	assertSchemaRef(t, publicDoc.Paths["/auth/login"]["post"], "200", "#/components/schemas/LoginResponse")
	assertSchemaRef(t, authenticated.Paths["/auth/me"]["get"], "200", "#/components/schemas/MeResponse")
	assertSchemaRef(t, kycVerified.Paths["/transfers"]["post"], "200", "#/components/schemas/TransferResult")
	assertSchemaRef(t, merchant.Paths["/qris/pay"]["post"], "200", "#/components/schemas/QrisPayResult")
	assertSchemaRef(t, docs["openapi-bank_indonesia.json"].Paths["/rtgs/issuance-notification"]["post"], "200", "#/components/schemas/RtgsIssuanceReceipt")
	assertSchemaRef(t, kycVerified.Paths["/transfers"]["post"], "401", "#/components/schemas/ErrorResponse")
}

func checkIdempotency(t *testing.T, doc openAPIDoc, path, method string) {
	t.Helper()
	op := doc.Paths[path][method]
	for _, parameter := range op.Parameters {
		if name, _ := parameter["name"].(string); name == "Idempotency-Key" {
			return
		}
	}
	t.Fatalf("%s %s missing Idempotency-Key parameter", method, path)
}

func assertSchemaRef(t *testing.T, op openAPIOperation, status, want string) {
	t.Helper()
	got := ""
	if content, ok := op.Responses[status].Content["application/json"]; ok {
		if ref, ok := content.Schema["$ref"].(string); ok {
			got = ref
		}
	}
	if got != want {
		t.Fatalf("response %s schema = %q, want %q", status, got, want)
	}
}
