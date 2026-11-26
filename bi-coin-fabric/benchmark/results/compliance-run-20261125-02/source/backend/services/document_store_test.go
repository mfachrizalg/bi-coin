package services

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"os"
	"path/filepath"
	"testing"
)

var pngSignature = []byte("\x89PNG\r\n\x1a\n")

func TestValidateDocumentRejectsNonImage(t *testing.T) {
	if err := ValidateDocument([]byte("plain text, not an image")); err == nil {
		t.Fatal("non-image accepted")
	}
}

func TestValidateDocumentRejectsOversizedFile(t *testing.T) {
	data := append(append([]byte{}, pngSignature...), make([]byte, MaxDocumentBytes)...)
	if err := ValidateDocument(data); err == nil {
		t.Fatal("file above 2 MB accepted")
	}
}

func TestValidateDocumentAcceptsPNG(t *testing.T) {
	if err := ValidateDocument(pngSignature); err != nil {
		t.Fatalf("png rejected: %v", err)
	}
}

func TestStoreDocumentNamesFileBySHA256(t *testing.T) {
	dir := t.TempDir()
	data := append(append([]byte{}, pngSignature...), []byte("solid colour test image")...)
	ref, err := StoreDocument(dir, data)
	if err != nil {
		t.Fatal(err)
	}
	sum := sha256.Sum256(data)
	if ref != hex.EncodeToString(sum[:]) {
		t.Fatalf("documentRef %s is not the SHA-256 of the file", ref)
	}
	stored, err := os.ReadFile(filepath.Join(dir, ref))
	if err != nil {
		t.Fatal(err)
	}
	if !bytes.Equal(stored, data) {
		t.Fatal("stored bytes differ from the upload")
	}
}

func TestTamperedDocumentRehashDiffers(t *testing.T) {
	dir := t.TempDir()
	data := append(append([]byte{}, pngSignature...), []byte("original")...)
	ref, err := StoreDocument(dir, data)
	if err != nil {
		t.Fatal(err)
	}
	tampered := append(append([]byte{}, pngSignature...), []byte("tampered")...)
	sum := sha256.Sum256(tampered)
	if hex.EncodeToString(sum[:]) == ref {
		t.Fatal("tampered file re-hashes to the stored documentRef")
	}
}

func TestNewRandomHexLengths(t *testing.T) {
	subjectID, err := NewRandomHex(16)
	if err != nil || len(subjectID) != 32 {
		t.Fatalf("subject ID %q: %v", subjectID, err)
	}
	salt, err := NewRandomHex(32)
	if err != nil || len(salt) != 64 {
		t.Fatalf("salt %q: %v", salt, err)
	}
}
