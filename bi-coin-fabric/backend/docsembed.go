package main

import _ "embed"

//go:embed docs/api/openapi-public.json
var specPublic []byte

//go:embed docs/api/openapi-authenticated.json
var specAuthenticated []byte

//go:embed docs/api/openapi-kyc_verified.json
var specKycVerified []byte

//go:embed docs/api/openapi-retail_bank.json
var specRetailBank []byte

//go:embed docs/api/openapi-wholesale_bank.json
var specWholesaleBank []byte

//go:embed docs/api/openapi-bank_indonesia.json
var specBankIndonesia []byte

//go:embed docs/api/openapi-merchant.json
var specMerchant []byte

//go:embed docs/api/openapi-auditor.json
var specAuditor []byte
