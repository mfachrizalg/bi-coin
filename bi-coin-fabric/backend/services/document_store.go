package services

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

// MaxDocumentBytes caps one identity document upload (D15).
const MaxDocumentBytes = 2 << 20

// ValidateDocument accepts only PNG or JPEG files of at most MaxDocumentBytes.
func ValidateDocument(data []byte) error {
	if len(data) == 0 {
		return InvalidInput("document is required")
	}
	if len(data) > MaxDocumentBytes {
		return InvalidInput("document must be at most 2 MB")
	}
	switch http.DetectContentType(data) {
	case "image/png", "image/jpeg":
		return nil
	default:
		return InvalidInput("document must be a PNG or JPEG image")
	}
}

// StoreDocument writes the file under its SHA-256 hex name and returns that name as documentRef (D15).
func StoreDocument(dir string, data []byte) (string, error) {
	sum := sha256.Sum256(data)
	ref := hex.EncodeToString(sum[:])
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return "", fmt.Errorf("create document store: %w", err)
	}
	if err := os.WriteFile(filepath.Join(dir, ref), data, 0o600); err != nil {
		return "", fmt.Errorf("write document: %w", err)
	}
	return ref, nil
}

// NewRandomHex returns n random bytes as lowercase hex. Subject IDs use 16 bytes (D16), salts use 32 bytes (D17).
func NewRandomHex(n int) (string, error) {
	buf := make([]byte, n)
	if _, err := rand.Read(buf); err != nil {
		return "", fmt.Errorf("read random bytes: %w", err)
	}
	return hex.EncodeToString(buf), nil
}
