package services

import (
	"fmt"
	"net/http"
)

type ErrorCode string

const (
	CodeInvalidCredentials ErrorCode = "invalid_credentials"
	CodeInvalidInput       ErrorCode = "invalid_input"
	CodeUnauthorized       ErrorCode = "unauthorized"
	CodeForbidden          ErrorCode = "forbidden"
	CodeNotFound           ErrorCode = "not_found"
	CodeConflict           ErrorCode = "conflict"
	CodeInternal           ErrorCode = "internal_error"
)

type AppError struct {
	Code    ErrorCode
	Status  int
	Message string
	Cause   error
}

func (e *AppError) Error() string {
	if e == nil {
		return ""
	}
	if e.Cause != nil {
		if e.Message == "" {
			return e.Cause.Error()
		}
		return fmt.Sprintf("%s: %v", e.Message, e.Cause)
	}
	return e.Message
}

func (e *AppError) Unwrap() error {
	if e == nil {
		return nil
	}
	return e.Cause
}

func InvalidInput(message string) error {
	return &AppError{Code: CodeInvalidInput, Status: http.StatusUnprocessableEntity, Message: message}
}

func Unauthorized(message string) error {
	return &AppError{Code: CodeUnauthorized, Status: http.StatusUnauthorized, Message: message}
}

func Forbidden(message string) error {
	return &AppError{Code: CodeForbidden, Status: http.StatusForbidden, Message: message}
}

func NotFound(message string) error {
	return &AppError{Code: CodeNotFound, Status: http.StatusNotFound, Message: message}
}

func Conflict(message string) error {
	return &AppError{Code: CodeConflict, Status: http.StatusConflict, Message: message}
}

func Internal(message string, cause error) error {
	return &AppError{Code: CodeInternal, Status: http.StatusInternalServerError, Message: message, Cause: cause}
}
