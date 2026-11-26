package handlers

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"image"
	"image/png"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"testing"
	"time"

	"github.com/gorilla/mux"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/services"
)

type ledgerCall struct {
	MSP         string
	Chaincode   string
	Transaction string
	Args        []string
	Payload     string
}

type fakeLedger struct {
	calls   []ledgerCall
	results map[string]string
	errs    map[string]error
}

func (f *fakeLedger) record(msp, chaincode, transaction string, transient map[string][]byte, args []string) ([]byte, error) {
	f.calls = append(f.calls, ledgerCall{MSP: msp, Chaincode: chaincode, Transaction: transaction, Args: args, Payload: string(transient["payload"])})
	return []byte(f.results[transaction]), f.errs[transaction]
}

func (f *fakeLedger) Submit(_ string, msp string, chaincode string, transaction string, args ...string) ([]byte, error) {
	return f.record(msp, chaincode, transaction, nil, args)
}

func (f *fakeLedger) SubmitWithTransient(_ string, msp string, chaincode string, transaction string, transient map[string][]byte, args ...string) ([]byte, error) {
	return f.record(msp, chaincode, transaction, transient, args)
}

func (f *fakeLedger) Evaluate(_ string, msp string, chaincode string, transaction string, args ...string) ([]byte, error) {
	return f.record(msp, chaincode, transaction, nil, args)
}

func (f *fakeLedger) IdentityMSP(string) (string, error) { return studyDistributorMSP, nil }

// call returns the recorded call of a transaction, or fails the test.
func (f *fakeLedger) call(t *testing.T, transaction string) ledgerCall {
	t.Helper()
	for _, call := range f.calls {
		if call.Transaction == transaction {
			return call
		}
	}
	t.Fatalf("transaction %s was not called; calls: %+v", transaction, f.calls)
	return ledgerCall{}
}

func (f *fakeLedger) called(transaction string) bool {
	for _, call := range f.calls {
		if call.Transaction == transaction {
			return true
		}
	}
	return false
}

type fakeStore struct {
	profile      services.KYCProfile
	review       []string
	update       services.KYCUpdate
	synced       []services.LedgerSubjectState
	notices      [][]string
	noticeErr    error
	flows        [][]any
	register     []models.SederhanaRegisterEntry
	alerts       []models.MonitoringAlert
	alertSubject string
	alertErr     error
	confirmed    []string
}

func (f *fakeStore) CreateKYCProfile(_ context.Context, profile services.KYCProfile) error {
	f.profile = profile
	return nil
}

func (f *fakeStore) MarkKYCLedgerAnchored(context.Context, string) error { return nil }

func (f *fakeStore) RecordKYCReview(_ context.Context, subjectID string, dttotResult string, lowRiskReason string) error {
	f.review = []string{subjectID, dttotResult, lowRiskReason}
	return nil
}

func (f *fakeStore) RecordKYCUpdate(_ context.Context, _ string, update services.KYCUpdate) error {
	f.update = update
	return nil
}

func (f *fakeStore) SyncKYCStatus(_ context.Context, _ string, state services.LedgerSubjectState) error {
	f.synced = append(f.synced, state)
	return nil
}

func (f *fakeStore) CreateCustomerNotice(_ context.Context, subjectID string, kind string, reason string) error {
	f.notices = append(f.notices, []string{subjectID, kind, reason})
	return f.noticeErr
}

func (f *fakeStore) RecordFlow(_ context.Context, flowID string, kind string, fromID string, toID string, amount int64) error {
	f.flows = append(f.flows, []any{flowID, kind, fromID, toID, amount})
	return nil
}

func (f *fakeStore) ListSederhanaRegister(context.Context) ([]models.SederhanaRegisterEntry, error) {
	return f.register, nil
}

func (f *fakeStore) ListMonitoringAlerts(context.Context) ([]models.MonitoringAlert, error) {
	return f.alerts, nil
}

func (f *fakeStore) OpenAlertSubject(context.Context, string) (string, error) {
	return f.alertSubject, f.alertErr
}

func (f *fakeStore) ConfirmMonitoringAlert(_ context.Context, alertID string, confirmedBy string) error {
	f.confirmed = append(f.confirmed, alertID+" by "+confirmedBy)
	return nil
}

const lowRiskSubject = `{"status":"active","low_risk":true,"low_risk_reason":"capped product","approved_at":1700000000}`

func newStudyTestRouter(ledger *fakeLedger, store *fakeStore, documentDir string) *mux.Router {
	router := mux.NewRouter()
	registerStudyRoutes(router, &StudyHandler{svc: ledger, store: store, documentDir: documentDir})
	return router
}

func serve(router *mux.Router, req *http.Request) *httptest.ResponseRecorder {
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)
	return response
}

func pngBytes(t *testing.T) []byte {
	t.Helper()
	var buf bytes.Buffer
	if err := png.Encode(&buf, image.NewRGBA(image.Rect(0, 0, 1, 1))); err != nil {
		t.Fatal(err)
	}
	return buf.Bytes()
}

func multipartRequest(t *testing.T, path string, fields map[string]string, document []byte, role middleware.Role) *http.Request {
	t.Helper()
	var body bytes.Buffer
	writer := multipart.NewWriter(&body)
	for key, value := range fields {
		if err := writer.WriteField(key, value); err != nil {
			t.Fatal(err)
		}
	}
	if document != nil {
		part, err := writer.CreateFormFile("document", "id.png")
		if err != nil {
			t.Fatal(err)
		}
		if _, err := part.Write(document); err != nil {
			t.Fatal(err)
		}
	}
	if err := writer.Close(); err != nil {
		t.Fatal(err)
	}
	req := studyRequest(http.MethodPost, path, body.String(), role)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	return req
}

func onboardingFields() map[string]string {
	return map[string]string{
		"category": "retail", "legal_name": "Test Subject", "document_type": "ktp", "document_number": "0000000000000000",
		"address": "Jl. Contoh 1", "birth_place": "Yogyakarta", "birth_date": "2000-01-31",
	}
}

func TestCreateSubjectAcceptsRetailOnlyWithProfileFields(t *testing.T) {
	ledger, store := &fakeLedger{}, &fakeStore{}
	router := newStudyTestRouter(ledger, store, t.TempDir())
	response := serve(router, multipartRequest(t, "/subjects", onboardingFields(), pngBytes(t), middleware.RoleAuthenticated))
	if response.Code != http.StatusOK {
		t.Fatalf("create subject: status %d body %s", response.Code, response.Body.String())
	}
	if store.profile.Address != "Jl. Contoh 1" || store.profile.BirthPlace != "Yogyakarta" || store.profile.BirthDate != "2000-01-31" || store.profile.SubjectType != "retail" {
		t.Fatalf("profile fields not stored: %+v", store.profile)
	}
	call := ledger.call(t, "CreatePending")
	if call.MSP != studyEndUserMSP || !strings.Contains(call.Payload, `"category":"retail"`) {
		t.Fatalf("CreatePending call = %+v", call)
	}
}

func TestCreateSubjectRejectsInvalidForms(t *testing.T) {
	tests := []struct {
		name   string
		change func(map[string]string)
	}{
		{"merchant category", func(f map[string]string) { f["category"] = "merchant" }},
		{"business category", func(f map[string]string) { f["category"] = "business" }},
		{"missing address", func(f map[string]string) { delete(f, "address") }},
		{"missing birth place", func(f map[string]string) { delete(f, "birth_place") }},
		{"missing birth date", func(f map[string]string) { delete(f, "birth_date") }},
		{"birth date in wrong form", func(f map[string]string) { f["birth_date"] = "31-01-2000" }},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ledger := &fakeLedger{}
			fields := onboardingFields()
			test.change(fields)
			response := serve(newStudyTestRouter(ledger, &fakeStore{}, t.TempDir()), multipartRequest(t, "/subjects", fields, pngBytes(t), middleware.RoleAuthenticated))
			if response.Code != http.StatusUnprocessableEntity || len(ledger.calls) != 0 {
				t.Fatalf("status %d body %s calls %+v", response.Code, response.Body.String(), ledger.calls)
			}
		})
	}
}

func TestRecordReviewSubmitsExplicitFields(t *testing.T) {
	tests := []struct {
		name        string
		body        string
		wantPayload string
		wantStore   []string
	}{
		{"low risk with reason", `{"dttot_result":"not_listed","low_risk":true,"low_risk_reason":" salary wallet "}`, `{"dttot_result":"not_listed","low_risk":true,"low_risk_reason":"salary wallet"}`, []string{"s1", "not_listed", "salary wallet"}},
		{"listed and not low risk", `{"dttot_result":"listed","low_risk":false}`, `{"dttot_result":"listed","low_risk":false,"low_risk_reason":""}`, []string{"s1", "listed", ""}},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ledger, store := &fakeLedger{}, &fakeStore{}
			response := serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/subjects/s1/reviews", test.body, middleware.RoleRetailBank))
			if response.Code != http.StatusOK {
				t.Fatalf("status %d body %s", response.Code, response.Body.String())
			}
			call := ledger.call(t, "RecordReview")
			if call.MSP != studyDistributorMSP || call.Payload != test.wantPayload || !reflect.DeepEqual(call.Args, []string{"s1"}) {
				t.Fatalf("RecordReview call = %+v, want payload %s", call, test.wantPayload)
			}
			if !reflect.DeepEqual(store.review, test.wantStore) {
				t.Fatalf("stored review = %v, want %v", store.review, test.wantStore)
			}
		})
	}
}

func TestRecordReviewRejectsIncompleteReview(t *testing.T) {
	tests := []struct{ name, body, want string }{
		{"empty body", `{}`, "dttot_result"},
		{"missing low_risk", `{"dttot_result":"not_listed"}`, "low_risk"},
		{"missing dttot_result", `{"low_risk":false}`, "dttot_result"},
		{"unknown dttot_result", `{"dttot_result":"maybe","low_risk":false}`, "dttot_result"},
		{"low risk without reason", `{"dttot_result":"not_listed","low_risk":true,"low_risk_reason":"  "}`, "low_risk_reason"},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ledger := &fakeLedger{}
			response := serve(newStudyTestRouter(ledger, &fakeStore{}, ""), studyRequest("POST", "/subjects/s1/reviews", test.body, middleware.RoleRetailBank))
			if response.Code != http.StatusUnprocessableEntity || !strings.Contains(response.Body.String(), test.want) || len(ledger.calls) != 0 {
				t.Fatalf("status %d body %s calls %+v", response.Code, response.Body.String(), ledger.calls)
			}
		})
	}
}

func TestVerifySubjectValidatesEvidenceReference(t *testing.T) {
	evidence := strings.Repeat("ab", 32)
	ledger, store := &fakeLedger{results: map[string]string{"GetSubject": lowRiskSubject}}, &fakeStore{}
	router := newStudyTestRouter(ledger, store, "")
	response := serve(router, studyRequest("POST", "/subjects/s1/verifications", `{"evidence_ref":"`+evidence+`"}`, middleware.RoleRetailBank))
	if response.Code != http.StatusOK {
		t.Fatalf("status %d body %s", response.Code, response.Body.String())
	}
	if call := ledger.call(t, "VerifySubject"); call.Payload != `{"evidence_ref":"`+evidence+`"}` {
		t.Fatalf("VerifySubject payload = %s", call.Payload)
	}
	if len(store.synced) != 1 || store.synced[0].Status != "active" || store.synced[0].ApprovedAt != 1700000000 {
		t.Fatalf("profile not synced from the ledger: %+v", store.synced)
	}
	for _, body := range []string{`{}`, `{"evidence_ref":"abcd"}`, `{"evidence_ref":"` + strings.Repeat("zz", 32) + `"}`} {
		bad := &fakeLedger{}
		response := serve(newStudyTestRouter(bad, &fakeStore{}, ""), studyRequest("POST", "/subjects/s1/verifications", body, middleware.RoleRetailBank))
		if response.Code != http.StatusUnprocessableEntity || len(bad.calls) != 0 {
			t.Fatalf("body %s: status %d calls %+v", body, response.Code, bad.calls)
		}
	}
}

func TestUpdateSubjectStoresDocumentAndCallsLedger(t *testing.T) {
	dir := t.TempDir()
	document := pngBytes(t)
	sum := sha256.Sum256(document)
	ref := hex.EncodeToString(sum[:])
	ledger, store := &fakeLedger{results: map[string]string{"GetSubject": lowRiskSubject}}, &fakeStore{}
	fields := map[string]string{"dttot_result": "not_listed", "address": "Jl. Baru 2"}
	response := serve(newStudyTestRouter(ledger, store, dir), multipartRequest(t, "/subjects/s1/updates", fields, document, middleware.RoleRetailBank))
	if response.Code != http.StatusOK {
		t.Fatalf("status %d body %s", response.Code, response.Body.String())
	}
	if call := ledger.call(t, "UpdateSubject"); call.Payload != `{"documentRef":"`+ref+`","dttot_result":"not_listed"}` {
		t.Fatalf("UpdateSubject payload = %s", call.Payload)
	}
	if store.update.DocumentHash != ref || store.update.Address != "Jl. Baru 2" || store.update.LegalName != "" {
		t.Fatalf("stored update = %+v", store.update)
	}
}

func TestUpdateSubjectRejectsInvalidForms(t *testing.T) {
	tests := []struct {
		name     string
		fields   map[string]string
		document []byte
	}{
		{"missing dttot result", map[string]string{}, pngBytes(t)},
		{"unknown dttot result", map[string]string{"dttot_result": "maybe"}, pngBytes(t)},
		{"bad birth date", map[string]string{"dttot_result": "listed", "birth_date": "yesterday"}, pngBytes(t)},
		{"missing document", map[string]string{"dttot_result": "not_listed"}, nil},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ledger := &fakeLedger{}
			response := serve(newStudyTestRouter(ledger, &fakeStore{}, t.TempDir()), multipartRequest(t, "/subjects/s1/updates", test.fields, test.document, middleware.RoleRetailBank))
			if response.Code != http.StatusUnprocessableEntity || len(ledger.calls) != 0 {
				t.Fatalf("status %d body %s calls %+v", response.Code, response.Body.String(), ledger.calls)
			}
		})
	}
}

func TestCloseSubjectWritesCustomerNotice(t *testing.T) {
	ledger, store := &fakeLedger{results: map[string]string{"GetSubject": `{"status":"closed","closed_at":1700000100,"close_reason":"fictitious"}`}}, &fakeStore{}
	response := serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/subjects/s1/closures", `{"reason":"fictitious"}`, middleware.RoleRetailBank))
	if response.Code != http.StatusOK {
		t.Fatalf("status %d body %s", response.Code, response.Body.String())
	}
	if call := ledger.call(t, "CloseSubject"); call.Payload != `{"reason":"fictitious"}` {
		t.Fatalf("CloseSubject payload = %s", call.Payload)
	}
	if !reflect.DeepEqual(store.notices, [][]string{{"s1", "closure", "fictitious"}}) {
		t.Fatalf("notices = %v", store.notices)
	}
	if len(store.synced) != 1 || store.synced[0].Status != "closed" || store.synced[0].CloseReason != "fictitious" {
		t.Fatalf("profile not synced: %+v", store.synced)
	}
}

func TestCloseSubjectRejectsUnknownReasonAndWritesNoNoticeOnLedgerFailure(t *testing.T) {
	ledger, store := &fakeLedger{}, &fakeStore{}
	response := serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/subjects/s1/closures", `{"reason":"because"}`, middleware.RoleRetailBank))
	if response.Code != http.StatusUnprocessableEntity || len(ledger.calls) != 0 {
		t.Fatalf("unknown reason: status %d calls %+v", response.Code, ledger.calls)
	}
	failing := &fakeLedger{errs: map[string]error{"CloseSubject": errors.New("subject is not active")}}
	response = serve(newStudyTestRouter(failing, store, ""), studyRequest("POST", "/subjects/s1/closures", `{"reason":"data_missing"}`, middleware.RoleRetailBank))
	if response.Code != http.StatusInternalServerError || len(store.notices) != 0 {
		t.Fatalf("ledger failure: status %d notices %v", response.Code, store.notices)
	}
}

func TestCloseSubjectReportsLostNotice(t *testing.T) {
	ledger, store := &fakeLedger{}, &fakeStore{noticeErr: errors.New("database down")}
	response := serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/subjects/s1/closures", `{"reason":"customer_request"}`, middleware.RoleRetailBank))
	if response.Code != http.StatusInternalServerError {
		t.Fatalf("status %d, want 500 so the lost notice is visible", response.Code)
	}
}

func TestRevokeLowRiskWritesNoCustomerNotice(t *testing.T) {
	ledger, store := &fakeLedger{results: map[string]string{"GetSubject": `{"status":"active","low_risk":false}`}}, &fakeStore{}
	response := serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/subjects/s1/low-risk-revocations", ``, middleware.RoleRetailBank))
	if response.Code != http.StatusOK {
		t.Fatalf("status %d body %s", response.Code, response.Body.String())
	}
	if call := ledger.call(t, "RevokeLowRisk"); !reflect.DeepEqual(call.Args, []string{"s1"}) {
		t.Fatalf("RevokeLowRisk args = %v", call.Args)
	}
	if len(store.notices) != 0 {
		t.Fatalf("anti-tipping-off: notice written %v", store.notices)
	}
	if len(store.synced) != 1 || store.synced[0].LowRisk {
		t.Fatalf("profile not synced: %+v", store.synced)
	}
}

func TestConfirmAlertRevokesLowRiskAndWritesNoNotice(t *testing.T) {
	ledger, store := &fakeLedger{results: map[string]string{"GetSubject": lowRiskSubject}}, &fakeStore{alertSubject: "s1"}
	response := serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/monitoring-alerts/a1/confirmations", ``, middleware.RoleRetailBank))
	if response.Code != http.StatusOK {
		t.Fatalf("status %d body %s", response.Code, response.Body.String())
	}
	ledger.call(t, "RevokeLowRisk")
	if !reflect.DeepEqual(store.confirmed, []string{"a1 by user"}) || len(store.notices) != 0 {
		t.Fatalf("confirmed = %v, notices = %v", store.confirmed, store.notices)
	}
}

func TestConfirmAlertSkipsRevocationWhenAlreadyOutsideSederhana(t *testing.T) {
	ledger, store := &fakeLedger{results: map[string]string{"GetSubject": `{"status":"active","low_risk":false}`}}, &fakeStore{alertSubject: "s1"}
	response := serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/monitoring-alerts/a2/confirmations", ``, middleware.RoleRetailBank))
	if response.Code != http.StatusOK || ledger.called("RevokeLowRisk") || len(store.confirmed) != 1 {
		t.Fatalf("status %d revoke called %t confirmed %v", response.Code, ledger.called("RevokeLowRisk"), store.confirmed)
	}
}

func TestConfirmAlertNeedsOpenAlertAndLedgerSuccess(t *testing.T) {
	store := &fakeStore{alertErr: services.NotFound("open alert not found")}
	ledger := &fakeLedger{}
	response := serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/monitoring-alerts/gone/confirmations", ``, middleware.RoleRetailBank))
	if response.Code != http.StatusNotFound || len(ledger.calls) != 0 {
		t.Fatalf("missing alert: status %d calls %+v", response.Code, ledger.calls)
	}
	store = &fakeStore{alertSubject: "s1"}
	ledger = &fakeLedger{results: map[string]string{"GetSubject": lowRiskSubject}, errs: map[string]error{"RevokeLowRisk": errors.New("caller is not compliance_officer")}}
	response = serve(newStudyTestRouter(ledger, store, ""), studyRequest("POST", "/monitoring-alerts/a1/confirmations", ``, middleware.RoleRetailBank))
	if response.Code != http.StatusInternalServerError || len(store.confirmed) != 0 {
		t.Fatalf("ledger refusal: status %d confirmed %v", response.Code, store.confirmed)
	}
}

func TestCddCeilingsRoutes(t *testing.T) {
	ledger := &fakeLedger{results: map[string]string{"GetCddCeilings": `{"unverified_holdings":2000000,"verified_holdings":20000000}`}}
	router := newStudyTestRouter(ledger, &fakeStore{}, "")
	response := serve(router, studyRequest("PUT", "/cdd-ceilings", `{"unverified_holdings":"2000000","verified_holdings":"20000000"}`, middleware.RoleBankIndonesia))
	if response.Code != http.StatusOK {
		t.Fatalf("set ceilings: status %d body %s", response.Code, response.Body.String())
	}
	if call := ledger.call(t, "SetCddCeilings"); call.MSP != studyCentralBankMSP || !reflect.DeepEqual(call.Args, []string{"2000000", "20000000"}) {
		t.Fatalf("SetCddCeilings call = %+v", call)
	}
	for _, body := range []string{`{}`, `{"unverified_holdings":"0","verified_holdings":"20000000"}`, `{"unverified_holdings":"2000000","verified_holdings":"-1"}`, `{"unverified_holdings":2000000,"verified_holdings":20000000}`} {
		bad := &fakeLedger{}
		response := serve(newStudyTestRouter(bad, &fakeStore{}, ""), studyRequest("PUT", "/cdd-ceilings", body, middleware.RoleBankIndonesia))
		if response.Code != http.StatusUnprocessableEntity || len(bad.calls) != 0 {
			t.Fatalf("body %s: status %d calls %+v", body, response.Code, bad.calls)
		}
	}
	response = serve(router, studyRequest("GET", "/cdd-ceilings", ``, middleware.RoleAuditor))
	if response.Code != http.StatusOK || strings.TrimSpace(response.Body.String()) != `{"unverified_holdings":"2000000","verified_holdings":"20000000"}` {
		t.Fatalf("get ceilings: status %d body %s", response.Code, response.Body.String())
	}
}

func TestGetSubjectStringifiesLimitsAndKeepsCddFields(t *testing.T) {
	ledger := &fakeLedger{results: map[string]string{"GetSubject": `{"subject_id":"s1","status":"active","limits":{"per_transaction":500000,"daily":1000000,"monthly":5000000,"holdings":2000000},"low_risk":true,"low_risk_reason":"capped product","verified":false,"closed_at":0}`}}
	response := serve(newStudyTestRouter(ledger, &fakeStore{}, ""), studyRequest("GET", "/subjects/s1", ``, middleware.RoleAuditor))
	if response.Code != http.StatusOK {
		t.Fatalf("status %d body %s", response.Code, response.Body.String())
	}
	var subject map[string]any
	if err := json.Unmarshal(response.Body.Bytes(), &subject); err != nil {
		t.Fatal(err)
	}
	limits := subject["limits"].(map[string]any)
	for _, key := range []string{"per_transaction", "daily", "monthly", "holdings"} {
		if _, ok := limits[key].(string); !ok {
			t.Fatalf("limit %s = %v, want a string", key, limits[key])
		}
	}
	if subject["low_risk"] != true || subject["low_risk_reason"] != "capped product" || subject["verified"] != false {
		t.Fatalf("CDD fields not passed through: %v", subject)
	}
}

func TestFundWalletRecordsFundingForMonitoring(t *testing.T) {
	ledger, store := &fakeLedger{results: map[string]string{"FundWallet": `{"reference":"k1"}`}}, &fakeStore{}
	req := studyRequest("POST", "/wallet-fundings", `{"subject_id":"s1","distributor_id":"d1","amount":"150000"}`, middleware.RoleRetailBank)
	req.Header.Set("Idempotency-Key", "k1")
	response := serve(newStudyTestRouter(ledger, store, ""), req)
	if response.Code != http.StatusOK {
		t.Fatalf("status %d body %s", response.Code, response.Body.String())
	}
	if want := [][]any{{"funding:k1", "funding", "d1", "s1", int64(150000)}}; !reflect.DeepEqual(store.flows, want) {
		t.Fatalf("flows = %v, want %v", store.flows, want)
	}
}

func TestRegisterAndAlertListsReturnJSONArrays(t *testing.T) {
	approved := time.Date(2026, 11, 25, 8, 0, 0, 0, time.UTC)
	store := &fakeStore{
		register: []models.SederhanaRegisterEntry{{SubjectID: "s1", LowRiskReason: "capped product", ApprovedAt: approved}},
		alerts:   []models.MonitoringAlert{{AlertID: "a1", SubjectID: "s1", Rule: "R2", Detail: "11 transfers", Status: "open", CreatedAt: approved}},
	}
	router := newStudyTestRouter(&fakeLedger{}, store, "")
	response := serve(router, studyRequest("GET", "/sederhana-register", ``, middleware.RoleBankIndonesia))
	if response.Code != http.StatusOK || !strings.Contains(response.Body.String(), `"subject_id":"s1"`) || !strings.Contains(response.Body.String(), `"approved_at":"2026-11-25T08:00:00Z"`) {
		t.Fatalf("register: status %d body %s", response.Code, response.Body.String())
	}
	response = serve(router, studyRequest("GET", "/monitoring-alerts", ``, middleware.RoleRetailBank))
	for _, want := range []string{`"alert_id":"a1"`, `"rule":"R2"`, `"status":"open"`, `"created_at"`} {
		if !strings.Contains(response.Body.String(), want) {
			t.Fatalf("alerts body %s missing %s", response.Body.String(), want)
		}
	}
	empty := serve(newStudyTestRouter(&fakeLedger{}, &fakeStore{}, ""), studyRequest("GET", "/monitoring-alerts", ``, middleware.RoleAuditor))
	if strings.TrimSpace(empty.Body.String()) != `[]` {
		t.Fatalf("empty alerts body = %s, want []", empty.Body.String())
	}
}
