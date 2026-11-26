package handlers

import (
	"bytes"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

func TestCreateSubjectRejectsNonImageDocument(t *testing.T) {
	var body bytes.Buffer
	writer := multipart.NewWriter(&body)
	for key, value := range onboardingFields() {
		if err := writer.WriteField(key, value); err != nil {
			t.Fatal(err)
		}
	}
	part, err := writer.CreateFormFile("document", "id.txt")
	if err != nil {
		t.Fatal(err)
	}
	if _, err := part.Write([]byte("not an image")); err != nil {
		t.Fatal(err)
	}
	if err := writer.Close(); err != nil {
		t.Fatal(err)
	}
	h := &StudyHandler{svc: &services.StudyLedgerService{}, documentDir: t.TempDir()}
	req := httptest.NewRequest(http.MethodPost, "/subjects", &body)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	response := httptest.NewRecorder()
	h.CreateSubject(response, req)
	if response.Code != http.StatusBadRequest && response.Code != http.StatusUnprocessableEntity {
		t.Fatalf("non-image accepted: status %d body %s", response.Code, response.Body.String())
	}
	if !strings.Contains(response.Body.String(), "PNG or JPEG") {
		t.Fatalf("missing image rejection message: %s", response.Body.String())
	}
}
