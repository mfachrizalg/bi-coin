package main

import (
	"os"
	"strings"
	"testing"
)

func TestChaincodeDoesNotPersistRawKycFields(t *testing.T) {
	src, err := os.ReadFile("digital_rupiah.go")
	if err != nil {
		t.Fatalf("read chaincode: %v", err)
	}
	forbidden := []string{
		"Legal" + "Name",
		"`json:\"legal_" + "name\"`",
		"`json:\"document_" + "number\"`",
		"`json:\"provider_" + "case_id\"`",
		"`json:\"kyc_" + "checks\"`",
	}
	for _, token := range forbidden {
		if strings.Contains(string(src), token) {
			t.Fatalf("chaincode still contains raw KYC field %q", token)
		}
	}
}

func TestSpendingFlowsRequireApprovedKyc(t *testing.T) {
	src, err := os.ReadFile("digital_rupiah.go")
	if err != nil {
		t.Fatalf("read chaincode: %v", err)
	}
	required := []string{
		"func (s *SmartContract) requireApprovedKyc",
		"func (s *SmartContract) requireApprovedKycSubject",
		"if err := s.requireApprovedKyc(ctx, sender); err != nil",
	}
	for _, token := range required {
		if !strings.Contains(string(src), token) {
			t.Fatalf("chaincode missing KYC enforcement marker %q", token)
		}
	}
}

func TestChaincodeDoesNotExposeOfflinePaymentFeature(t *testing.T) {
	src, err := os.ReadFile("digital_rupiah.go")
	if err != nil {
		t.Fatalf("read chaincode: %v", err)
	}
	forbidden := []string{
		"OfflineDevice",
		"OfflinePayment",
		"RegisterOfflineDevice",
		"LoadOfflineDevice",
		"SyncOfflinePayment",
		"ListOfflineDevices",
		"ListOfflinePayments",
		"offline_device",
		"offline_payment",
	}
	for _, token := range forbidden {
		if strings.Contains(string(src), token) {
			t.Fatalf("chaincode still exposes offline payment marker %q", token)
		}
	}
}
