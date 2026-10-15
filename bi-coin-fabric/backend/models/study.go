package models

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
