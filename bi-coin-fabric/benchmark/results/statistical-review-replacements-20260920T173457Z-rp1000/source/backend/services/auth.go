package services

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
	"golang.org/x/crypto/argon2"
)

var ErrInvalidCredentials = errors.New("invalid credentials")

type AuthUser struct {
	Username       string
	PasswordHash   string
	Role           middleware.Role
	SubjectID      string
	ParticipantID  string
	CustodianMSPID string
	Active         bool
}

type AuthUserStore interface {
	FindAuthUser(username string) (*AuthUser, error)
}

type AuthService struct {
	users  AuthUserStore
	secret []byte
	ttl    time.Duration
}

func NewAuthService(users AuthUserStore, secret string, ttl time.Duration) *AuthService {
	return &AuthService{users: users, secret: []byte(secret), ttl: ttl}
}

func (s *AuthService) Login(req models.LoginRequest) (*models.LoginResponse, error) {
	user, err := s.users.FindAuthUser(req.Username)
	if err != nil || user == nil || !user.Active {
		return nil, ErrInvalidCredentials
	}
	ok, err := VerifyPassword(req.Password, user.PasswordHash)
	if err != nil || !ok {
		return nil, ErrInvalidCredentials
	}
	expires := time.Now().UTC().Add(s.ttl)
	token, err := s.sign(user.Username, user.Role, expires)
	if err != nil {
		return nil, err
	}
	return &models.LoginResponse{
		AccessToken:    token,
		TokenType:      "Bearer",
		ExpiresIn:      int64(s.ttl.Seconds()),
		Role:           string(user.Role),
		SubjectID:      user.SubjectID,
		ParticipantID:  user.ParticipantID,
		CustodianMSPID: user.CustodianMSPID,
	}, nil
}

func (s *AuthService) Verify(token string) (*middleware.TokenClaims, error) {
	if len(s.secret) < 16 {
		return nil, errors.New("auth secret must be at least 16 bytes")
	}
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errors.New("invalid token")
	}
	unsigned := parts[0] + "." + parts[1]
	expected := signHMAC([]byte(unsigned), s.secret)
	if subtle.ConstantTimeCompare([]byte(expected), []byte(parts[2])) != 1 {
		return nil, errors.New("invalid token signature")
	}
	payloadBytes, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, err
	}
	var payload struct {
		Sub           string `json:"sub"`
		Role          string `json:"role"`
		SubjectID     string `json:"subject_id,omitempty"`
		ParticipantID string `json:"participant_id,omitempty"`
		CustodianMSP  string `json:"custodian_msp_id,omitempty"`
		Exp           int64  `json:"exp"`
	}
	if err := json.Unmarshal(payloadBytes, &payload); err != nil {
		return nil, err
	}
	if payload.Sub == "" || payload.Role == "" || payload.Exp <= time.Now().Unix() {
		return nil, errors.New("invalid token claims")
	}
	user, err := s.users.FindAuthUser(payload.Sub)
	if err != nil || user == nil || !user.Active || user.Role != middleware.Role(payload.Role) {
		return nil, errors.New("inactive auth user")
	}
	return &middleware.TokenClaims{
		Username:       payload.Sub,
		Role:           middleware.Role(payload.Role),
		SubjectID:      payload.SubjectID,
		ParticipantID:  payload.ParticipantID,
		CustodianMSPID: payload.CustodianMSP,
	}, nil
}

func (s *AuthService) sign(username string, role middleware.Role, expires time.Time) (string, error) {
	if len(s.secret) < 16 {
		return "", errors.New("auth secret must be at least 16 bytes")
	}
	header := map[string]string{"alg": "HS256", "typ": "JWT"}
	user, err := s.users.FindAuthUser(username)
	if err != nil || user == nil {
		return "", ErrInvalidCredentials
	}
	payload := map[string]interface{}{
		"sub":              username,
		"role":             string(role),
		"subject_id":       user.SubjectID,
		"participant_id":   user.ParticipantID,
		"custodian_msp_id": user.CustodianMSPID,
		"iat":              time.Now().UTC().Unix(),
		"exp":              expires.Unix(),
	}
	headerJSON, err := json.Marshal(header)
	if err != nil {
		return "", err
	}
	payloadJSON, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}
	unsigned := base64.RawURLEncoding.EncodeToString(headerJSON) + "." + base64.RawURLEncoding.EncodeToString(payloadJSON)
	return unsigned + "." + signHMAC([]byte(unsigned), s.secret), nil
}

func signHMAC(data []byte, secret []byte) string {
	mac := hmac.New(sha256.New, secret)
	mac.Write(data)
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

func HashPassword(password string) (string, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return "", err
	}
	const memory = 64 * 1024
	const iterations = 3
	const parallelism = 1
	const keyLen = 32
	hash := argon2.IDKey([]byte(password), salt, iterations, memory, parallelism, keyLen)
	return fmt.Sprintf("$argon2id$v=19$m=%d,t=%d,p=%d$%s$%s",
		memory, iterations, parallelism,
		base64.RawStdEncoding.EncodeToString(salt),
		base64.RawStdEncoding.EncodeToString(hash)), nil
}

func VerifyPassword(password string, encoded string) (bool, error) {
	parts := strings.Split(encoded, "$")
	if len(parts) != 6 || parts[1] != "argon2id" || parts[2] != "v=19" {
		return false, errors.New("unsupported password hash")
	}
	params := strings.Split(parts[3], ",")
	if len(params) != 3 {
		return false, errors.New("invalid password hash params")
	}
	memory, err := parseParam(params[0], "m")
	if err != nil {
		return false, err
	}
	iterations, err := parseParam(params[1], "t")
	if err != nil {
		return false, err
	}
	parallelism, err := parseParam(params[2], "p")
	if err != nil {
		return false, err
	}
	salt, err := base64.RawStdEncoding.DecodeString(parts[4])
	if err != nil {
		return false, err
	}
	expected, err := base64.RawStdEncoding.DecodeString(parts[5])
	if err != nil {
		return false, err
	}
	actual := argon2.IDKey([]byte(password), salt, uint32(iterations), uint32(memory), uint8(parallelism), uint32(len(expected)))
	return subtle.ConstantTimeCompare(actual, expected) == 1, nil
}

func parseParam(raw string, key string) (int, error) {
	prefix := key + "="
	if !strings.HasPrefix(raw, prefix) {
		return 0, fmt.Errorf("missing %s password hash param", key)
	}
	return strconv.Atoi(strings.TrimPrefix(raw, prefix))
}
