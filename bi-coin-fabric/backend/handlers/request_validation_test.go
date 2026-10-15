package handlers

import (
	"encoding/json"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestDecodeJSONValidatesStudyRequestFields(t *testing.T) {
	tests := []struct {
		name string
		body string
		want bool
	}{
		{name: "explicit false is present", body: `{"approved":false}`, want: true},
		{name: "true is present", body: `{"approved":true}`, want: true},
		{name: "missing boolean", body: `{}`, want: false},
		{name: "null boolean", body: `{"approved":null}`, want: false},
		{name: "trailing JSON value", body: `{"approved":false} {}`, want: false},
		{name: "duplicate field", body: `{"approved":false,"approved":true}`, want: false},
		{name: "nested duplicate field", body: `{"approved":false,"nested":{"value":1,"value":2}}`, want: false},
		{name: "malformed body", body: `{"approved":`, want: false},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			var request struct {
				Approved *bool `json:"approved" validate:"required"`
			}
			response := httptest.NewRecorder()
		req := httptest.NewRequest("POST", "/decisions", strings.NewReader(test.body))
			if got := decodeJSON(response, req, &request); got != test.want {
				t.Fatalf("decodeJSON() = %t, want %t; response=%s", got, test.want, response.Body.String())
			}
			if test.want && request.Approved == nil {
				t.Fatal("approved pointer is nil after a valid request")
			}
			if !test.want && response.Code != 422 {
				t.Fatalf("invalid request status = %d, want 422", response.Code)
			}
		})
	}
}

func TestStudyRequestValidationTags(t *testing.T) {
	tests := []struct {
		name  string
		body  string
		valid bool
	}{
		{name: "positive integer", body: `{"amount":"10"}`, valid: true},
		{name: "zero", body: `{"amount":"0"}`},
		{name: "negative", body: `{"amount":"-1"}`},
		{name: "decimal", body: `{"amount":"1.5"}`},
		{name: "overflow", body: `{"amount":"9223372036854775808"}`},
		{name: "leading sign", body: `{"amount":"+1"}`},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			var request struct {
				Amount string `json:"amount" validate:"required,positive_int64"`
			}
			response := httptest.NewRecorder()
		req := httptest.NewRequest("POST", "/issuances", strings.NewReader(test.body))
			if got := decodeJSON(response, req, &request); got != test.valid {
				t.Fatalf("decodeJSON() = %t, want %t; response=%s", got, test.valid, response.Body.String())
			}
		})
	}
}

func TestStudyReasonAndEvidenceValidation(t *testing.T) {
	tests := []struct {
		name  string
		body  string
		rules string
		valid bool
	}{
		{name: "DTTOT", body: `{"reason_code":"dttot"}`, rules: "required,restriction_reason", valid: true},
		{name: "authority order", body: `{"reason_code":"authority_order"}`, rules: "required,restriction_reason", valid: true},
		{name: "internal review", body: `{"reason_code":"internal_review"}`, rules: "required,restriction_reason", valid: true},
		{name: "unknown reason", body: `{"reason_code":"other"}`, rules: "required,restriction_reason"},
		{name: "valid hash", body: `{"reference":"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"}`, rules: "required,len=64,hexadecimal", valid: true},
		{name: "short hash", body: `{"reference":"abcd"}`, rules: "required,len=64,hexadecimal"},
		{name: "non-hex hash", body: `{"reference":"gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"}`, rules: "required,len=64,hexadecimal"},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			var request map[string]string
			if err := json.Unmarshal([]byte(test.body), &request); err != nil {
				t.Fatal(err)
			}
			field := "reason_code"
			if strings.Contains(test.name, "hash") {
				field = "reference"
			}
			candidate := struct {
				Value string `json:"-"`
			}{Value: request[field]}
			if err := requestValidator.Var(candidate.Value, test.rules); (err == nil) != test.valid {
				t.Fatalf("validation error = %v, valid=%t", err, test.valid)
			}
		})
	}
}
