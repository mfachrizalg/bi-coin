package services

import (
	"strings"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
)

// Principal is the authenticated request identity used to choose a Fabric signer.
// It is intentionally copied into a request-scoped LedgerService; it is never
// stored on the shared service instance.
type Principal struct {
	Username       string
	Role           middleware.Role
	SubjectID      string
	ParticipantID  string
	CustodianMSPID string
}

func (p Principal) Scope() string {
	return string(p.Role) + ":" + p.CustodianMSPID
}

func (p Principal) ID() string {
	for _, value := range []string{p.SubjectID, p.ParticipantID, p.Username} {
		if strings.TrimSpace(value) != "" {
			return value
		}
	}
	return ""
}

func (p Principal) IsOversight() bool {
	return p.Role == middleware.RoleBankIndonesia || p.Role == middleware.RoleSupervisor
}
