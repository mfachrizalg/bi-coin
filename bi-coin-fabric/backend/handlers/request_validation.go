package handlers

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"strconv"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/mfachrizalg/bi-coin-retail-cbdc/backend/models"
)

var requestValidator = newRequestValidator()

func newRequestValidator() *validator.Validate {
	validate := validator.New(validator.WithRequiredStructEnabled())
	validate.RegisterTagNameFunc(func(field reflect.StructField) string {
		name := strings.SplitN(field.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})
	_ = validate.RegisterValidation("notblank", func(field validator.FieldLevel) bool {
		return strings.TrimSpace(field.Field().String()) != ""
	})
	_ = validate.RegisterValidation("positive_int64", func(field validator.FieldLevel) bool {
		value := field.Field().String()
		if value == "" {
			return false
		}
		for _, digit := range value {
			if digit < '0' || digit > '9' {
				return false
			}
		}
		amount, err := strconv.ParseInt(value, 10, 64)
		return err == nil && amount > 0
	})
	_ = validate.RegisterValidation("restriction_reason", func(field validator.FieldLevel) bool {
		return models.StudyRestrictionReason(field.Field().String()).Valid()
	})
	return validate
}

func validateRequest(target interface{}) error {
	return requestValidator.Struct(target)
}

func validateJSONShape(body []byte) error {
	decoder := json.NewDecoder(bytes.NewReader(body))
	decoder.UseNumber()
	if err := scanJSONValue(decoder); err != nil {
		return err
	}
	if _, err := decoder.Token(); err != io.EOF {
		if err != nil {
			return err
		}
		return errors.New("multiple JSON values")
	}
	return nil
}

func scanJSONValue(decoder *json.Decoder) error {
	token, err := decoder.Token()
	if err != nil {
		return err
	}
	delimiter, ok := token.(json.Delim)
	if !ok {
		return nil
	}
	switch delimiter {
	case '{':
		seen := make(map[string]struct{})
		for decoder.More() {
			keyToken, err := decoder.Token()
			if err != nil {
				return err
			}
			key, ok := keyToken.(string)
			if !ok {
				return errors.New("object key is not a string")
			}
			if _, exists := seen[key]; exists {
				return fmt.Errorf("duplicate JSON field %q", key)
			}
			seen[key] = struct{}{}
			if err := scanJSONValue(decoder); err != nil {
				return err
			}
		}
		end, err := decoder.Token()
		if err != nil || end != json.Delim('}') {
			return errors.New("unterminated JSON object")
		}
	case '[':
		for decoder.More() {
			if err := scanJSONValue(decoder); err != nil {
				return err
			}
		}
		end, err := decoder.Token()
		if err != nil || end != json.Delim(']') {
			return errors.New("unterminated JSON array")
		}
	default:
		return errors.New("unexpected JSON delimiter")
	}
	return nil
}

func writeRequestValidationErrors(w http.ResponseWriter, err error) {
	var validationErrors validator.ValidationErrors
	if !errors.As(err, &validationErrors) {
		writeValidationError(w, "invalid request")
		return
	}

	detail := make([]models.ValidationError, 0, len(validationErrors))
	for _, field := range validationErrors {
		message := field.Field() + " is invalid"
		switch field.Tag() {
		case "required", "notblank":
			message = field.Field() + " is required"
		case "oneof":
			message = field.Field() + " must be one of: " + strings.ReplaceAll(field.Param(), " ", ", ")
		case "restriction_reason":
			message = "reason_code must be dttot, authority_order, or internal_review"
		case "positive_int64":
			message = field.Field() + " must be a positive whole-rupiah integer"
		case "hexadecimal", "len":
			message = field.Field() + " must be a 64-character SHA-256 reference"
		case "min":
			message = field.Field() + " must contain at least " + field.Param() + " item(s)"
		}
		detail = append(detail, models.ValidationError{
			Loc:  []interface{}{"body", field.Field()},
			Msg:  message,
			Type: "value_error." + field.Tag(),
		})
	}
	writeJSON(w, http.StatusUnprocessableEntity, models.ErrorResponse{
		Code:   "validation_error",
		Detail: detail,
	})
}
