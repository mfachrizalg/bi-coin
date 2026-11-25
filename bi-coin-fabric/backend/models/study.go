package models

import "time"

type StudyRestrictionReason string

const (
	StudyRestrictionReasonDTTOT          StudyRestrictionReason = "dttot"
	StudyRestrictionReasonAuthorityOrder StudyRestrictionReason = "authority_order"
	StudyRestrictionReasonInternalReview StudyRestrictionReason = "internal_review"
)

func (reason StudyRestrictionReason) Valid() bool {
	switch reason {
	case StudyRestrictionReasonDTTOT, StudyRestrictionReasonAuthorityOrder, StudyRestrictionReasonInternalReview:
		return true
	default:
		return false
	}
}

// StudyDttotResult is the reviewer's manual DTTOT list match recorded in CDD Sederhana.
type StudyDttotResult string

const (
	StudyDttotNotListed StudyDttotResult = "not_listed"
	StudyDttotListed    StudyDttotResult = "listed"
)

func (result StudyDttotResult) Valid() bool {
	return result == StudyDttotNotListed || result == StudyDttotListed
}

// StudyCloseReason is why a relationship was closed (guideline Bab 8).
type StudyCloseReason string

const (
	StudyCloseDataMissing      StudyCloseReason = "data_missing"
	StudyCloseFictitious       StudyCloseReason = "fictitious"
	StudyCloseIdentityDoubtful StudyCloseReason = "identity_doubtful"
	StudyCloseCustomerRequest  StudyCloseReason = "customer_request"
)

func (reason StudyCloseReason) Valid() bool {
	switch reason {
	case StudyCloseDataMissing, StudyCloseFictitious, StudyCloseIdentityDoubtful, StudyCloseCustomerRequest:
		return true
	default:
		return false
	}
}

// SederhanaRegisterEntry is one row of the register of CDD Sederhana users with the reason (guideline Bab 7).
type SederhanaRegisterEntry struct {
	SubjectID     string    `json:"subject_id"`
	LowRiskReason string    `json:"low_risk_reason"`
	ApprovedAt    time.Time `json:"approved_at"`
}

// MonitoringAlert is a rule hit for compliance review. It is not a finding of suspicion.
type MonitoringAlert struct {
	AlertID   string    `json:"alert_id"`
	SubjectID string    `json:"subject_id"`
	Rule      string    `json:"rule"`
	Detail    string    `json:"detail"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}
