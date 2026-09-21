package services

import (
	"testing"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

func TestNormalizePaymentContactTrimsAndValidates(t *testing.T) {
	contact, err := normalizePaymentContact(models.PaymentContactRequest{
		Label:         "  Sari  ",
		WalletID:      "  wlt_sari  ",
		RecipientType: models.PaymentContactRetailCustomer,
	})
	if err != nil {
		t.Fatalf("valid contact returned error: %v", err)
	}
	if contact.Label != "Sari" || contact.WalletID != "wlt_sari" {
		t.Fatalf("contact was not trimmed: %+v", contact)
	}

	for name, invalid := range map[string]models.PaymentContactRequest{
		"empty label":  {WalletID: "wlt_sari", RecipientType: models.PaymentContactRetailCustomer},
		"empty wallet": {Label: "Sari", RecipientType: models.PaymentContactRetailCustomer},
		"invalid type": {Label: "Sari", WalletID: "wlt_sari", RecipientType: "participant"},
	} {
		t.Run(name, func(t *testing.T) {
			if _, err := normalizePaymentContact(invalid); err == nil {
				t.Fatal("invalid contact was accepted")
			}
		})
	}
}
