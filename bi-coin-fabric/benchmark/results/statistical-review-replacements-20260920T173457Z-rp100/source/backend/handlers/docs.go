package handlers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type roleInfo struct {
	Label   string
	DevKey  string
	Spec    []byte
	TagLine string
}

var roleOrder = []string{
	"public", "authenticated", "kyc_verified",
	"bank_pjp", "validator_bank", "pjp", "bank_indonesia", "merchant", "supervisor",
}

// DocsSpecs holds the embedded OpenAPI JSON bytes keyed by role name.
// Populated by the main package via NewDocsHandler.
type DocsSpecs struct {
	Public        []byte
	Authenticated []byte
	KycVerified   []byte
	BankPjp       []byte
	ValidatorBank []byte
	Pjp           []byte
	BankIndonesia []byte
	Merchant      []byte
	Supervisor    []byte
}

type DocsHandler struct {
	roles map[string]roleInfo
}

func NewDocsHandler(specs DocsSpecs) *DocsHandler {
	return &DocsHandler{
		roles: map[string]roleInfo{
			"public":         {Label: "Public", DevKey: "dev-public-key", Spec: specs.Public, TagLine: "Health, topology, and JWT login"},
			"authenticated":  {Label: "Authenticated", DevKey: "dev-auth-key", Spec: specs.Authenticated, TagLine: "Principal profile and wallet listing"},
			"kyc_verified":   {Label: "KYC Verified", DevKey: "dev-kyc-key", Spec: specs.KycVerified, TagLine: "Retail transfers and QRIS payer flows"},
			"bank_pjp":       {Label: "Bank / PJP", DevKey: "dev-bank-pjp-key", Spec: specs.BankPjp, TagLine: "Onboarding, KYC, retail customers, and wallet custody"},
			"validator_bank": {Label: "Validator Bank", DevKey: "dev-validator-bank-key", Spec: specs.ValidatorBank, TagLine: "Validator-bank onboarding, KYC, and wallet custody"},
			"pjp":            {Label: "PJP", DevKey: "dev-pjp-key", Spec: specs.Pjp, TagLine: "PJP onboarding, KYC, and wallet custody"},
			"bank_indonesia": {Label: "Bank Indonesia", DevKey: "dev-bi-key", Spec: specs.BankIndonesia, TagLine: "Issuance, distribution, limits, RTGS, and oversight"},
			"merchant":       {Label: "Merchant", DevKey: "dev-merchant-key", Spec: specs.Merchant, TagLine: "Merchant transfers and QRIS intent lifecycle"},
			"supervisor":     {Label: "Supervisor", DevKey: "dev-supervisor-key", Spec: specs.Supervisor, TagLine: "Read-only oversight and reporting"},
		},
	}
}

func (d *DocsHandler) RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/docs", d.handleIndex).Methods("GET")
	r.HandleFunc("/docs/{role}", d.handleSwaggerUI).Methods("GET")
	r.HandleFunc("/docs/{role}/openapi.json", d.handleSpec).Methods("GET")
}

func (d *DocsHandler) handleIndex(w http.ResponseWriter, r *http.Request) {
	var sb strings.Builder
	for _, name := range roleOrder {
		info := d.roles[name]
		sb.WriteString(fmt.Sprintf(`
		<a href="/docs/%s" class="card">
			<div class="role-name">%s</div>
			<div class="role-slug">%s</div>
			<div class="role-tagline">%s</div>
		</a>`, name, info.Label, name, info.TagLine))
	}

	html := fmt.Sprintf(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Garuda Digital Rupiah — API Docs</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; color: #1a1a1a; }
  header { background: #1a3c6e; color: #fff; padding: 2rem; }
  header h1 { font-size: 1.5rem; font-weight: 700; }
  header p { margin-top: 0.4rem; opacity: 0.8; font-size: 0.9rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; padding: 2rem; }
  .card { display: block; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.25rem 1.5rem; text-decoration: none; color: inherit; transition: box-shadow 0.15s, border-color 0.15s; }
  .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-color: #1a3c6e; }
  .role-name { font-size: 1.1rem; font-weight: 600; color: #1a3c6e; }
  .role-slug { font-size: 0.75rem; font-family: monospace; color: #666; margin-top: 0.2rem; background: #f0f0f0; display: inline-block; padding: 0.1rem 0.4rem; border-radius: 3px; }
  .role-tagline { font-size: 0.85rem; color: #444; margin-top: 0.6rem; line-height: 1.4; }
  .auth-note { margin: 0 2rem 1rem; padding: 0.75rem 1rem; background: #fff8e1; border-left: 4px solid #f0a500; border-radius: 0 4px 4px 0; font-size: 0.85rem; color: #5a4000; }
  code { font-family: monospace; background: #f0f0f0; padding: 0.1rem 0.3rem; border-radius: 3px; }
</style>
</head>
<body>
<header>
  <h1>Garuda Digital Rupiah — API Documentation</h1>
  <p>Select a role to browse its interactive Swagger UI</p>
</header>
<div class="auth-note">
  Auth: call <code>POST /auth/login</code>, then use <code>Authorization: Bearer &lt;jwt&gt;</code> in Swagger's Authorize dialog.
</div>
<div class="grid">%s</div>
</body>
</html>`, sb.String())

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, html)
}

func (d *DocsHandler) handleSwaggerUI(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roleName := vars["role"]
	info, ok := d.roles[roleName]
	if !ok {
		http.Error(w, "unknown role", http.StatusNotFound)
		return
	}

	html := fmt.Sprintf(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>%s — Garuda Digital Rupiah API</title>
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css" integrity="sha384-wxLW6kwyHktdDGr6Pv1zgm/VGJh99lfUbzSn6HNHBENZlCN7W602k9VkGdxuFvPn" crossorigin="anonymous">
<style>
  body { margin: 0; }
  .topbar { background: #1a3c6e !important; }
  .topbar a { color: #fff !important; }
  .topbar-wrapper { display: flex; align-items: center; gap: 1rem; }
  .back-link { color: #fff !important; text-decoration: none; font-size: 0.85rem; opacity: 0.8; }
  .back-link:hover { opacity: 1; }
  .role-badge { background: rgba(255,255,255,0.15); color: #fff; font-size: 0.75rem; font-family: monospace; padding: 0.2rem 0.5rem; border-radius: 4px; }
  .dev-key-notice { background: #fff8e1; border-left: 4px solid #f0a500; padding: 0.6rem 1rem; font-size: 0.8rem; color: #5a4000; margin: 0; }
  .dev-key-notice code { font-family: monospace; background: #f5e0a0; padding: 0.05rem 0.3rem; border-radius: 3px; }
</style>
</head>
<body>
<div class="dev-key-notice">
  Login via <code>POST /auth/login</code>, then paste the returned JWT into Swagger's Authorize dialog as <code>Bearer &lt;jwt&gt;</code>. Role: <strong>%s</strong>.
  <a href="/docs" style="margin-left:1rem; color:#5a4000;">← All roles</a>
</div>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js" integrity="sha384-wmyclcVGX/WhUkdkATwhaK1X1JtiNrr2EoYJ+diV3vj4v6OC5yCeSu+yW13SYJep" crossorigin="anonymous"></script>
<script>
SwaggerUIBundle({
  url: '/docs/%s/openapi.json',
  dom_id: '#swagger-ui',
  presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
  layout: 'BaseLayout',
  deepLinking: true,
  tryItOutEnabled: true,
  persistAuthorization: true
});
</script>
</body>
</html>`, info.Label, roleName, roleName)

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, html)
}

func (d *DocsHandler) handleSpec(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roleName := vars["role"]
	info, ok := d.roles[roleName]
	if !ok {
		http.Error(w, "unknown role", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(info.Spec)
}
