package models

import "time"

// ─── Request Bodies ──────────────────────────────────────────────────────────

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	AccessToken    string `json:"access_token"`
	TokenType      string `json:"token_type"`
	ExpiresIn      int64  `json:"expires_in"`
	Role           string `json:"role"`
	SubjectID      string `json:"subject_id,omitempty"`
	ParticipantID  string `json:"participant_id,omitempty"`
	CustodianMSPID string `json:"custodian_msp_id,omitempty"`
}

type MeResponse struct {
	Username       string `json:"username"`
	Role           string `json:"role"`
	SubjectID      string `json:"subject_id,omitempty"`
	ParticipantID  string `json:"participant_id,omitempty"`
	CustodianMSPID string `json:"custodian_msp_id,omitempty"`
}

// ─── Response / Domain Objects ───────────────────────────────────────────────

type HealthResponse struct {
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
}

type ErrorResponse struct {
	Code    string            `json:"code,omitempty"`
	Detail  []ValidationError `json:"detail,omitempty"`
	Message string            `json:"message,omitempty"`
}

type ValidationError struct {
	Loc   []interface{} `json:"loc"`
	Msg   string        `json:"msg"`
	Type  string        `json:"type"`
	Input interface{}   `json:"input,omitempty"`
	Ctx   interface{}   `json:"ctx,omitempty"`
}

func NowUTC() string {
	return time.Now().UTC().Format(time.RFC3339)
}
