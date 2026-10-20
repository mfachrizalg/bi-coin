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
		"openapi-retail_bank.json",
		"openapi-wholesale_bank.json",
		"openapi-bank_indonesia.json",
		"openapi-merchant.json",
		"openapi-auditor.json",
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

	auditor := docs["openapi-auditor.json"]
	for path, methods := range auditor.Paths {
		for method := range methods {
			if path == "/auth/login" {
				if method != "post" {
					t.Fatalf("auditor auth/login should stay post, got %s", method)
				}
				continue
			}
			if method != "get" {
				t.Fatalf("auditor path %s unexpectedly exposes %s", path, method)
			}
		}
	}

	authenticated := docs["openapi-authenticated.json"]
	if _, ok := authenticated.Paths["/auth/me"]; !ok {
		t.Fatal("authenticated spec missing /auth/me")
	}

	publicDoc := docs["openapi-public.json"]
	if _, ok := publicDoc.Paths["/auth/login"]; !ok {
		t.Fatal("public spec missing /auth/login")
	}

	assertSchemaRef(t, publicDoc.Paths["/auth/login"]["post"], "200", "#/components/schemas/LoginResponse")
	assertSchemaRef(t, authenticated.Paths["/auth/me"]["get"], "200", "#/components/schemas/MeResponse")
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
