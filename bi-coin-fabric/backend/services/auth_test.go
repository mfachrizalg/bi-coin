package services

import (
	"testing"
	"time"

	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/middleware"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

type memoryUserStore struct {
	users map[string]AuthUser
}

func (s memoryUserStore) FindAuthUser(username string) (*AuthUser, error) {
	user, ok := s.users[username]
	if !ok {
		return nil, ErrInvalidCredentials
	}
	return &user, nil
}

func TestAuthServiceLoginAndVerifyToken(t *testing.T) {
	hash, err := HashPassword("secret")
	if err != nil {
		t.Fatalf("hash password: %v", err)
	}
	auth := NewAuthService(memoryUserStore{users: map[string]AuthUser{
		"bi": {Username: "bi", PasswordHash: hash, Role: middleware.RoleBankIndonesia, Active: true},
	}}, "test-secret-32-bytes-long", time.Hour)

	token, err := auth.Login(models.LoginRequest{Username: "bi", Password: "secret"})
	if err != nil {
		t.Fatalf("login: %v", err)
	}
	if token.TokenType != "Bearer" {
		t.Fatalf("token type = %q, want Bearer", token.TokenType)
	}
	claims, err := auth.Verify(token.AccessToken)
	if err != nil {
		t.Fatalf("verify: %v", err)
	}
	if claims.Username != "bi" || claims.Role != middleware.RoleBankIndonesia {
		t.Fatalf("claims = %+v", claims)
	}
}

func TestAuthServiceRejectsWrongPassword(t *testing.T) {
	hash, err := HashPassword("secret")
	if err != nil {
		t.Fatalf("hash password: %v", err)
	}
	auth := NewAuthService(memoryUserStore{users: map[string]AuthUser{
		"bi": {Username: "bi", PasswordHash: hash, Role: middleware.RoleBankIndonesia, Active: true},
	}}, "test-secret-32-bytes-long", time.Hour)

	if _, err := auth.Login(models.LoginRequest{Username: "bi", Password: "wrong"}); err == nil {
		t.Fatal("expected invalid credentials")
	}
}
