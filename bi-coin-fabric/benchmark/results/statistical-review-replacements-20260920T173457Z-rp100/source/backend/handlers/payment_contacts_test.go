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
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

func TestPaymentContactRoutesKeepInstitutionalRolesOut(t *testing.T) {
	router := mux.NewRouter()
	New(nil, nil).RegisterRoutes(router)

	for _, role := range []middleware.Role{middleware.RoleBankIndonesia, middleware.RoleSupervisor, middleware.RoleValidatorBank} {
		req := httptest.NewRequest(http.MethodGet, "/payment-contacts", nil)
		req = requestWithRole(req, role)
		response := httptest.NewRecorder()
		router.ServeHTTP(response, req)
		if response.Code != http.StatusForbidden {
			t.Fatalf("role %s got %d, want 403", role, response.Code)
		}
	}
}

func TestPaymentContactCRUDUsesAuthenticatedOwner(t *testing.T) {
	store := newMemoryPaymentContactStore()
	h := New(nil, nil)
	h.SetPaymentContactStore(store)
	router := mux.NewRouter()
	h.RegisterRoutes(router)

	create := httptest.NewRequest(http.MethodPost, "/payment-contacts", jsonBody(t, models.PaymentContactRequest{
		Label:         "Sari",
		WalletID:      "wlt_sari",
		RecipientType: models.PaymentContactRetailCustomer,
	}))
	create = requestWithUsername(create, middleware.RoleKycVerified, "budi")
	createdResponse := httptest.NewRecorder()
	router.ServeHTTP(createdResponse, create)
	if createdResponse.Code != http.StatusCreated {
		t.Fatalf("create got %d, want 201", createdResponse.Code)
	}
	if store.lastOwner != "budi" {
		t.Fatalf("create owner %q, want budi", store.lastOwner)
	}

	list := httptest.NewRequest(http.MethodGet, "/payment-contacts", nil)
	list = requestWithUsername(list, middleware.RoleKycVerified, "budi")
	listResponse := httptest.NewRecorder()
	router.ServeHTTP(listResponse, list)
	if listResponse.Code != http.StatusOK || len(store.contacts) != 1 {
		t.Fatalf("list got status %d and %d contacts, want 200 and 1", listResponse.Code, len(store.contacts))
	}

	delete := httptest.NewRequest(http.MethodDelete, "/payment-contacts/contact-1", nil)
	delete = requestWithUsername(delete, middleware.RoleKycVerified, "other-user")
	deleteResponse := httptest.NewRecorder()
	router.ServeHTTP(deleteResponse, delete)
	if deleteResponse.Code != http.StatusNotFound {
		t.Fatalf("cross-owner delete got %d, want 404", deleteResponse.Code)
	}
}

type memoryPaymentContactStore struct {
	contacts  map[string]*models.PaymentContact
	lastOwner string
}

func newMemoryPaymentContactStore() *memoryPaymentContactStore {
	return &memoryPaymentContactStore{contacts: make(map[string]*models.PaymentContact)}
}

func (s *memoryPaymentContactStore) ListPaymentContacts(_ context.Context, owner string) ([]*models.PaymentContact, error) {
	s.lastOwner = owner
	contacts := make([]*models.PaymentContact, 0)
	for _, contact := range s.contacts {
		copy := *contact
		contacts = append(contacts, &copy)
	}
	return contacts, nil
}

func (s *memoryPaymentContactStore) CreatePaymentContact(_ context.Context, owner string, req models.PaymentContactRequest) (*models.PaymentContact, error) {
	s.lastOwner = owner
	contact := &models.PaymentContact{ID: "contact-1", Label: req.Label, WalletID: req.WalletID, RecipientType: req.RecipientType}
	s.contacts[contact.ID] = contact
	return contact, nil
}

func (s *memoryPaymentContactStore) UpdatePaymentContact(_ context.Context, owner string, id string, req models.PaymentContactRequest) (*models.PaymentContact, error) {
	s.lastOwner = owner
	contact, ok := s.contacts[id]
	if !ok {
		return nil, nil
	}
	contact.Label, contact.WalletID, contact.RecipientType = req.Label, req.WalletID, req.RecipientType
	return contact, nil
}

func (s *memoryPaymentContactStore) DeletePaymentContact(_ context.Context, owner string, id string) error {
	s.lastOwner = owner
	if owner != "budi" {
		return services.NotFound("payment contact not found")
	}
	delete(s.contacts, id)
	return nil
}

func requestWithUsername(req *http.Request, role middleware.Role, username string) *http.Request {
	req = requestWithRole(req, role)
	ctx := context.WithValue(req.Context(), middleware.UsernameKey, username)
	return req.WithContext(ctx)
}

func jsonBody(t *testing.T, value interface{}) *strings.Reader {
	t.Helper()
	raw, err := json.Marshal(value)
	if err != nil {
		t.Fatal(err)
	}
	return strings.NewReader(string(raw))
}
