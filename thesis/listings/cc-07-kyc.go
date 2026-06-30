func (s *SmartContract) SubmitKycProfile(ctx contractapi.TransactionContextInterface, profileID string, subjectType string, subjectID string, providerCaseID string, documentHashesJSON string) error {
	exists, err := s.kycProfileExists(ctx, profileID)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("KYC profile %s already exists", profileID)
	}
	var hashes []string
	if err := json.Unmarshal([]byte(documentHashesJSON), &hashes); err != nil {
		return fmt.Errorf("invalid document_hashes: %w", err)
	}
	now := txNow(ctx)
	profile := KycProfile{
		ProfileID:      profileID,
		SubjectType:    KycSubjectType(subjectType),
		SubjectID:      subjectID,
		ProviderCaseID: providerCaseID,
		DocumentHashes: hashes,
		Status:         KycPending,
		RiskLevel:      RiskLow,
		KycChecks:      map[string]string{},
		CreatedAt:      now.Format(time.RFC3339),
		UpdatedAt:      now.Format(time.RFC3339),
	}
	if err := s.putKycProfile(ctx, profile); err != nil {
		return err
	}
	return s.emitKycAudit(ctx, profileID, "profile_created", "", "pending", "KYC profile submitted")
}

func (s *SmartContract) RefreshKycProfile(ctx contractapi.TransactionContextInterface, profileID string, status string, riskLevel string, checksJSON string, documentHashesJSON string, rejectionReason string, expiresAt string) error {
	profile, err := s.getKycProfile(ctx, profileID)
	if err != nil {
		return err
	}
	oldStatus := string(profile.Status)
	var checks map[string]string
	if checksJSON != "" {
		if err := json.Unmarshal([]byte(checksJSON), &checks); err != nil {
			return fmt.Errorf("invalid checks: %w", err)
		}
	}
	var hashes []string
	if documentHashesJSON != "" {
		if err := json.Unmarshal([]byte(documentHashesJSON), &hashes); err != nil {
			return fmt.Errorf("invalid document_hashes: %w", err)
		}
	}
	now := txNow(ctx)
	profile.Status = KycStatus(status)
	profile.RiskLevel = KycRiskLevel(riskLevel)
	if checks != nil {
		profile.KycChecks = checks
	}
	if len(hashes) > 0 {
		profile.DocumentHashes = hashes
	}
	profile.RejectionReason = rejectionReason
	profile.ExpiresAt = expiresAt
	profile.UpdatedAt = now.Format(time.RFC3339)
	if err := s.putKycProfile(ctx, profile); err != nil {
		return err
	}
	checkID := fmt.Sprintf("chk_%s_%s", profileID, now.Format("20060102150405"))
	pc := KycProviderCheck{
		CheckID:         checkID,
		ProfileID:       profileID,
		Status:          KycStatus(status),
		RiskLevel:       KycRiskLevel(riskLevel),
		Checks:          checks,
		DocumentHashes:  hashes,
		RejectionReason: rejectionReason,
		ExpiresAt:       expiresAt,
		Timestamp:       now.Format(time.RFC3339),
	}
	if err := s.putKycProviderCheck(ctx, pc); err != nil {
		return err
	}
	return s.emitKycAudit(ctx, profileID, "profile_refreshed", oldStatus, status, fmt.Sprintf("Provider decision: %s risk=%s", status, riskLevel))
}
