import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDoc = JSON.parse(
  fs.readFileSync(path.join(__dirname, "openapi-bank_indonesia.json"), "utf8"),
);
const baseSchemas = baseDoc.components?.schemas ?? {};

const bearerSecurity = [{ BearerAuth: [] }];
const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const jsonContent = (schema) => ({ "application/json": { schema } });
const response = (description, schema) => ({
  description,
  content: jsonContent(schema),
});
const authErrors = {
  "401": response("Unauthorized", ref("ErrorResponse")),
  "403": response("Forbidden", ref("ErrorResponse")),
  "422": response("Validation Error", ref("HTTPValidationError")),
  "500": response("Server Error", ref("ErrorResponse")),
};

const parameters = {
  ParticipantFilter: {
    name: "participant_id",
    in: "query",
    required: false,
    schema: { type: "string" },
    description: "Optional participant filter. Retail actors remain scoped server-side.",
  },
  ScopeQuery: {
    name: "scope",
    in: "query",
    required: false,
    schema: { type: "string" },
  },
  ProfileID: {
    name: "profile_id",
    in: "path",
    required: true,
    schema: { type: "string" },
  },
  ParticipantID: {
    name: "participant_id",
    in: "path",
    required: true,
    schema: { type: "string" },
  },
  IntentID: {
    name: "intent_id",
    in: "path",
    required: true,
    schema: { type: "string" },
  },
  IdempotencyKeyHeader: {
    name: "Idempotency-Key",
    in: "header",
    required: true,
    schema: { type: "string", minLength: 1 },
    description:
      "Required on replay-safe money mutations. Reuse the same key only when retrying the same logical request.",
  },
};

const schemas = {
  ...baseSchemas,
  LoginRequestBody: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
    example: { username: "bi", password: "bi-password" },
  },
  LoginResponse: {
    type: "object",
    required: ["access_token", "token_type", "expires_in", "role"],
    properties: {
      access_token: { type: "string" },
      token_type: { type: "string", example: "Bearer" },
      expires_in: { type: "integer" },
      role: { type: "string" },
      subject_id: { type: "string" },
      participant_id: { type: "string" },
      custodian_msp_id: { type: "string" },
    },
  },
  MeResponse: {
    type: "object",
    required: ["username", "role"],
    properties: {
      username: { type: "string" },
      role: { type: "string" },
      subject_id: { type: "string" },
      participant_id: { type: "string" },
      custodian_msp_id: { type: "string" },
    },
  },
  ErrorResponse: {
    type: "object",
    properties: {
      code: { type: "string" },
      message: { type: "string" },
      detail: {
        type: "array",
        items: ref("ValidationError"),
      },
    },
  },
  HealthResponse: {
    type: "object",
    additionalProperties: true,
    example: { status: "ok" },
  },
  GenericObject: {
    type: "object",
    additionalProperties: true,
  },
  GenericArray: {
    type: "array",
    items: { type: "object", additionalProperties: true },
  },
  CreateWalletRequestBody: {
    type: "object",
    required: ["owner_id"],
    properties: {
      owner_id: {
        type: "string",
        minLength: 1,
        description: "Retail subject or institutional owner bound to the wallet.",
      },
    },
    example: { owner_id: "cust_bank_a_customer_01" },
  },
  Wallet: {
    type: "object",
    required: ["wallet_id", "owner_id", "participant_id", "wallet_type", "balance", "frozen"],
    properties: {
      wallet_id: { type: "string" },
      owner_id: { type: "string" },
      participant_id: { type: "string" },
      tier: { type: "string" },
      wallet_type: { type: "string" },
      balance: { type: "integer" },
      frozen: { type: "boolean" },
      daily_spent: { type: "integer" },
      monthly_spent: { type: "integer" },
      monthly_received: { type: "integer" },
      created_at: { type: "string" },
      updated_at: { type: "string" },
    },
  },
  WalletList: {
    type: "array",
    items: ref("Wallet"),
  },
  TransferRequestBody: {
    type: "object",
    required: ["sender_id", "receiver_id", "amount"],
    properties: {
      sender_id: { type: "string", minLength: 1 },
      receiver_id: { type: "string", minLength: 1 },
      amount: {
        type: "string",
        pattern: "^[0-9]+$",
        description: "Whole-rupiah decimal string.",
      },
    },
    example: {
      sender_id: "wlt_cust_bank_a_customer_01",
      receiver_id: "wlt_cust_bank_b_customer_02",
      amount: "25000",
    },
  },
  TransferResult: {
    type: "object",
    required: ["status"],
    properties: {
      status: { type: "string" },
      tx_id: { type: "string" },
      reference_id: { type: "string" },
      sender_id: { type: "string" },
      receiver_id: { type: "string" },
      amount: { type: "integer" },
    },
  },
  AmountResult: {
    type: "object",
    required: ["status"],
    properties: {
      status: { type: "string" },
      tx_id: { type: "string" },
    },
  },
  StatusResponse: {
    type: "object",
    required: ["status"],
    properties: {
      status: { type: "string" },
    },
  },
  ResolveQrisRequestBody: {
    type: "object",
    required: ["payload"],
    properties: {
      payload: { type: "string", minLength: 1 },
    },
  },
  QrisMode: {
    type: "string",
    enum: ["static", "dynamic"],
  },
  QrisStatus: {
    type: "string",
    enum: ["pending", "paid", "cancelled", "expired"],
  },
  CreateQrisIntentRequestBody: {
    type: "object",
    required: ["mode", "merchant_wallet_id"],
    properties: {
      mode: ref("QrisMode"),
      merchant_wallet_id: { type: "string" },
      amount: { type: "string", pattern: "^[0-9]+$" },
      label: { type: "string" },
      expires_at: { type: "string", format: "date-time" },
    },
  },
  PayQrisRequestBody: {
    type: "object",
    required: ["payload", "payer_wallet_id"],
    properties: {
      payload: { type: "string", minLength: 1 },
      payer_wallet_id: { type: "string", minLength: 1 },
      amount: { type: "string", pattern: "^[0-9]+$" },
    },
  },
  QrisIntent: {
    type: "object",
    required: [
      "intent_id",
      "mode",
      "merchant_id",
      "merchant_wallet_id",
      "amount",
      "status",
      "reference_id",
      "created_at",
      "updated_at",
    ],
    properties: {
      intent_id: { type: "string" },
      mode: ref("QrisMode"),
      merchant_id: { type: "string" },
      merchant_wallet_id: { type: "string" },
      amount: { type: "integer" },
      status: ref("QrisStatus"),
      label: { type: "string" },
      payload: { type: "string" },
      reference_id: { type: "string" },
      expires_at: { type: "string", format: "date-time" },
      paid_by_wallet_id: { type: "string" },
      paid_at: { type: "string", format: "date-time" },
      tx_id: { type: "string" },
      created_at: { type: "string" },
      updated_at: { type: "string" },
    },
  },
  QrisIntentList: {
    type: "array",
    items: ref("QrisIntent"),
  },
  QrisPayResult: {
    type: "object",
    required: ["status", "intent_id", "reference_id"],
    properties: {
      status: { type: "string" },
      tx_id: { type: "string" },
      intent_id: { type: "string" },
      reference_id: { type: "string" },
    },
  },
  DistributeRequestBody: {
    type: "object",
    required: ["sender_participant_id", "receiver_participant_id", "amount"],
    properties: {
      sender_participant_id: { type: "string" },
      receiver_participant_id: { type: "string" },
      amount: { type: "integer", minimum: 1 },
    },
  },
  RtgsIssuanceRequestBody: {
    type: "object",
    required: ["sender_bic", "amount", "reference"],
    properties: {
      sender_bic: { type: "string" },
      amount: { type: "string", pattern: "^[0-9]+$" },
      reference: { type: "string" },
      timestamp: { type: "string", format: "date-time" },
    },
  },
  RtgsIssuanceReceipt: {
    type: "object",
    required: ["status", "reference", "amount", "participant_id", "sender_bic", "tx_id"],
    properties: {
      status: { type: "string" },
      reference: { type: "string" },
      amount: { type: "integer" },
      participant_id: { type: "string" },
      sender_bic: { type: "string" },
      tx_id: { type: "string" },
    },
  },
};

function op({
  tags,
  summary,
  description,
  auth = true,
  parameters: params = [],
  requestBody,
  responses,
}) {
  return {
    tags,
    summary,
    ...(description ? { description } : {}),
    ...(auth ? { security: bearerSecurity } : {}),
    ...(params.length ? { parameters: params } : {}),
    ...(requestBody
      ? {
          requestBody: {
            required: true,
            content: jsonContent(requestBody),
          },
        }
      : {}),
    responses,
  };
}

const paths = {
  "/health": {
    get: op({
      tags: ["system"],
      summary: "Health check",
      auth: false,
      responses: {
        "200": response("Healthy", ref("HealthResponse")),
      },
    }),
  },
  "/auth/login": {
    post: op({
      tags: ["auth"],
      summary: "Login and receive JWT",
      auth: false,
      requestBody: ref("LoginRequestBody"),
      responses: {
        "200": response("Authenticated", ref("LoginResponse")),
        "401": response("Unauthorized", ref("ErrorResponse")),
        "413": response("Request Too Large", ref("ErrorResponse")),
        "422": response("Validation Error", ref("HTTPValidationError")),
      },
    }),
  },
  "/auth/me": {
    get: op({
      tags: ["auth"],
      summary: "Current authenticated principal",
      responses: {
        "200": response("Authenticated principal", ref("MeResponse")),
        "401": response("Unauthorized", ref("ErrorResponse")),
      },
    }),
  },
  "/network/topology": {
    get: op({
      tags: ["network"],
      summary: "Network topology",
      auth: false,
      responses: {
        "200": response("Topology", ref("GenericObject")),
      },
    }),
  },
  "/wallets": {
    get: op({
      tags: ["wallets"],
      summary: "List wallets",
      parameters: [parameters.ParticipantFilter],
      responses: {
        "200": response("Wallets", ref("WalletList")),
        ...authErrors,
      },
    }),
    post: op({
      tags: ["wallets"],
      summary: "Create wallet",
      description: "Create a wallet bound to owner_id. Custodian and participant bindings come from the authenticated principal and ledger state.",
      requestBody: ref("CreateWalletRequestBody"),
      responses: {
        "200": response("Created wallet", ref("Wallet")),
        ...authErrors,
      },
    }),
  },
  "/balances": {
    get: op({
      tags: ["wallets"],
      summary: "List balances visible to the authenticated actor",
      responses: {
        "200": response("Visible balances", ref("WalletList")),
        ...authErrors,
      },
    }),
  },
  "/transfers": {
    post: op({
      tags: ["payments"],
      summary: "Transfer retail Digital Rupiah",
      description: "Requires wallet ownership and an Idempotency-Key header.",
      parameters: [parameters.IdempotencyKeyHeader],
      requestBody: ref("TransferRequestBody"),
      responses: {
        "200": response("Transfer receipt", ref("TransferResult")),
        ...authErrors,
        "409": response("Conflict", ref("ErrorResponse")),
      },
    }),
  },
  "/qris/resolve": {
    post: op({
      tags: ["qris"],
      summary: "Resolve QRIS payload",
      requestBody: ref("ResolveQrisRequestBody"),
      responses: {
        "200": response("Resolved QRIS intent", ref("QrisIntent")),
        ...authErrors,
      },
    }),
  },
  "/qris/pay": {
    post: op({
      tags: ["qris"],
      summary: "Pay QRIS intent",
      description: "Requires payer wallet ownership and an Idempotency-Key header.",
      parameters: [parameters.IdempotencyKeyHeader],
      requestBody: ref("PayQrisRequestBody"),
      responses: {
        "200": response("QRIS payment receipt", ref("QrisPayResult")),
        ...authErrors,
        "409": response("Conflict", ref("ErrorResponse")),
      },
    }),
  },
  "/qris/intents": {
    post: op({
      tags: ["qris"],
      summary: "Create merchant QRIS intent",
      requestBody: ref("CreateQrisIntentRequestBody"),
      responses: {
        "200": response("Created intent", ref("QrisIntent")),
        ...authErrors,
      },
    }),
    get: op({
      tags: ["qris"],
      summary: "List merchant QRIS intents",
      responses: {
        "200": response("Intent list", ref("QrisIntentList")),
        ...authErrors,
      },
    }),
  },
  "/qris/intents/{intent_id}": {
    get: op({
      tags: ["qris"],
      summary: "Get merchant QRIS intent",
      parameters: [parameters.IntentID],
      responses: {
        "200": response("Intent", ref("QrisIntent")),
        ...authErrors,
      },
    }),
  },
  "/qris/intents/{intent_id}/cancel": {
    post: op({
      tags: ["qris"],
      summary: "Cancel merchant QRIS intent",
      parameters: [parameters.IntentID],
      responses: {
        "200": response("Cancelled intent", ref("QrisIntent")),
        ...authErrors,
        "409": response("Conflict", ref("ErrorResponse")),
      },
    }),
  },
  "/participants": {
    post: op({
      tags: ["participants"],
      summary: "Submit participant onboarding request",
      requestBody: ref("OnboardingRequestBody"),
      responses: {
        "200": response("Participant", ref("GenericObject")),
        ...authErrors,
      },
    }),
    get: op({
      tags: ["participants"],
      summary: "List participants",
      responses: {
        "200": response("Participants", ref("GenericArray")),
        ...authErrors,
      },
    }),
  },
  "/participants/{participant_id}": {
    get: op({
      tags: ["participants"],
      summary: "Get participant",
      parameters: [parameters.ParticipantID],
      responses: {
        "200": response("Participant", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/participants/{participant_id}/approve": {
    post: op({
      tags: ["participants"],
      summary: "Approve participant",
      parameters: [parameters.ParticipantID],
      responses: {
        "200": response("Participant", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/participants/{participant_id}/freeze": {
    post: op({
      tags: ["participants"],
      summary: "Freeze participant",
      parameters: [parameters.ParticipantID],
      responses: {
        "200": response("Participant", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/participants/{participant_id}/unfreeze": {
    post: op({
      tags: ["participants"],
      summary: "Unfreeze participant",
      parameters: [parameters.ParticipantID],
      responses: {
        "200": response("Participant", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/participants/{participant_id}/reject": {
    post: op({
      tags: ["participants"],
      summary: "Reject participant",
      parameters: [parameters.ParticipantID],
      responses: {
        "200": response("Participant", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/participants/{participant_id}/offboard": {
    post: op({
      tags: ["participants"],
      summary: "Offboard participant",
      parameters: [parameters.ParticipantID],
      responses: {
        "200": response("Offboarding receipt", ref("TransferResult")),
        ...authErrors,
      },
    }),
  },
  "/retail/customers": {
    post: op({
      tags: ["kyc"],
      summary: "Create retail customer anchor",
      requestBody: ref("RetailCustomerRequestBody"),
      responses: {
        "200": response("Retail customer", ref("GenericObject")),
        ...authErrors,
      },
    }),
    get: op({
      tags: ["kyc"],
      summary: "List retail customers",
      responses: {
        "200": response("Retail customers", ref("GenericArray")),
        ...authErrors,
      },
    }),
  },
  "/kyc/profiles": {
    post: op({
      tags: ["kyc"],
      summary: "Submit KYC profile",
      requestBody: ref("KycProfileRequestBody"),
      responses: {
        "200": response("KYC profile", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/kyc/profiles/{profile_id}": {
    get: op({
      tags: ["kyc"],
      summary: "Get KYC profile",
      parameters: [parameters.ProfileID],
      responses: {
        "200": response("KYC profile", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/kyc/profiles/{profile_id}/refresh": {
    post: op({
      tags: ["kyc"],
      summary: "Refresh KYC profile from provider result",
      parameters: [parameters.ProfileID],
      requestBody: ref("KycProviderResultRequestBody"),
      responses: {
        "200": response("Updated KYC profile", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/kyc/profiles/{profile_id}/provider-checks": {
    get: op({
      tags: ["kyc"],
      summary: "List provider checks",
      parameters: [parameters.ProfileID],
      responses: {
        "200": response("Provider checks", ref("GenericArray")),
        ...authErrors,
      },
    }),
  },
  "/kyc/profiles/{profile_id}/audit-events": {
    get: op({
      tags: ["kyc"],
      summary: "List KYC audit events",
      parameters: [parameters.ProfileID],
      responses: {
        "200": response("Audit events", ref("GenericArray")),
        ...authErrors,
      },
    }),
  },
  "/limits": {
    post: op({
      tags: ["policy"],
      summary: "Set system limit",
      requestBody: ref("SetLimitRequestBody"),
      responses: {
        "200": response("Limit", ref("GenericObject")),
        ...authErrors,
      },
    }),
    get: op({
      tags: ["policy"],
      summary: "List system limits",
      parameters: [parameters.ScopeQuery],
      responses: {
        "200": response("Limits", ref("GenericArray")),
        ...authErrors,
      },
    }),
  },
  "/issuance-requests": {
    post: op({
      tags: ["liquidity"],
      summary: "Request issuance",
      requestBody: ref("AmountRequestBody"),
      responses: {
        "200": response("Issuance result", ref("StatusResponse")),
        ...authErrors,
      },
    }),
  },
  "/redemption-requests": {
    post: op({
      tags: ["liquidity"],
      summary: "Request redemption",
      requestBody: ref("AmountRequestBody"),
      responses: {
        "200": response("Redemption result", ref("StatusResponse")),
        ...authErrors,
      },
    }),
  },
  "/distribute": {
    post: op({
      tags: ["liquidity"],
      summary: "Distribute wholesale funds to participant",
      description: "Requires Idempotency-Key header.",
      parameters: [parameters.IdempotencyKeyHeader],
      requestBody: ref("DistributeRequestBody"),
      responses: {
        "200": response("Distribution status", ref("StatusResponse")),
        ...authErrors,
      },
    }),
  },
  "/ledger/init": {
    post: op({
      tags: ["ledger"],
      summary: "Initialize ledger",
      responses: {
        "200": response("Initialization status", ref("StatusResponse")),
        ...authErrors,
      },
    }),
  },
  "/rtgs/issuance-notification": {
    post: op({
      tags: ["liquidity"],
      summary: "RTGS issuance notification",
      requestBody: ref("RtgsIssuanceRequestBody"),
      responses: {
        "200": response("RTGS issuance receipt", ref("RtgsIssuanceReceipt")),
        ...authErrors,
      },
    }),
  },
  "/transactions": {
    get: op({
      tags: ["supervision"],
      summary: "List transactions",
      responses: {
        "200": response("Transactions", ref("GenericArray")),
        ...authErrors,
      },
    }),
  },
  "/supervision/events": {
    get: op({
      tags: ["supervision"],
      summary: "List supervision events",
      responses: {
        "200": response("Events", ref("GenericArray")),
        ...authErrors,
      },
    }),
  },
  "/reports/reconciliation": {
    get: op({
      tags: ["reports"],
      summary: "Reconciliation report",
      responses: {
        "200": response("Report", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
  "/reports/metrics": {
    get: op({
      tags: ["reports"],
      summary: "Metrics report",
      responses: {
        "200": response("Metrics", ref("GenericObject")),
        ...authErrors,
      },
    }),
  },
};

const rolePaths = {
  public: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/network/topology": ["get"],
  },
  authenticated: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
    "/network/topology": ["get"],
    "/wallets": ["get"],
  },
  kyc_verified: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
    "/network/topology": ["get"],
    "/wallets": ["get"],
    "/balances": ["get"],
    "/transfers": ["post"],
    "/qris/resolve": ["post"],
    "/qris/pay": ["post"],
  },
  merchant: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
    "/network/topology": ["get"],
    "/wallets": ["get"],
    "/balances": ["get"],
    "/transfers": ["post"],
    "/qris/resolve": ["post"],
    "/qris/pay": ["post"],
    "/qris/intents": ["post", "get"],
    "/qris/intents/{intent_id}": ["get"],
    "/qris/intents/{intent_id}/cancel": ["post"],
  },
  bank_pjp: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
    "/network/topology": ["get"],
    "/participants": ["post", "get"],
    "/participants/{participant_id}": ["get"],
    "/retail/customers": ["post", "get"],
    "/kyc/profiles": ["post"],
    "/kyc/profiles/{profile_id}": ["get"],
    "/kyc/profiles/{profile_id}/refresh": ["post"],
    "/kyc/profiles/{profile_id}/provider-checks": ["get"],
    "/kyc/profiles/{profile_id}/audit-events": ["get"],
    "/wallets": ["post", "get"],
  },
  bank_indonesia: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
    "/network/topology": ["get"],
    "/participants": ["post", "get"],
    "/participants/{participant_id}": ["get"],
    "/participants/{participant_id}/approve": ["post"],
    "/participants/{participant_id}/freeze": ["post"],
    "/participants/{participant_id}/unfreeze": ["post"],
    "/participants/{participant_id}/reject": ["post"],
    "/participants/{participant_id}/offboard": ["post"],
    "/retail/customers": ["get"],
    "/kyc/profiles/{profile_id}": ["get"],
    "/kyc/profiles/{profile_id}/provider-checks": ["get"],
    "/kyc/profiles/{profile_id}/audit-events": ["get"],
    "/wallets": ["get"],
    "/limits": ["post", "get"],
    "/issuance-requests": ["post"],
    "/redemption-requests": ["post"],
    "/distribute": ["post"],
    "/ledger/init": ["post"],
    "/rtgs/issuance-notification": ["post"],
    "/transactions": ["get"],
    "/supervision/events": ["get"],
    "/reports/reconciliation": ["get"],
    "/reports/metrics": ["get"],
  },
  supervisor: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
    "/network/topology": ["get"],
    "/participants": ["get"],
    "/participants/{participant_id}": ["get"],
    "/retail/customers": ["get"],
    "/kyc/profiles/{profile_id}": ["get"],
    "/kyc/profiles/{profile_id}/provider-checks": ["get"],
    "/kyc/profiles/{profile_id}/audit-events": ["get"],
    "/limits": ["get"],
    "/transactions": ["get"],
    "/supervision/events": ["get"],
    "/reports/reconciliation": ["get"],
    "/reports/metrics": ["get"],
  },
};

const descriptions = {
  public: "Public entrypoints: health, topology, and JWT login.",
  authenticated: "Authenticated principal surface plus wallet listing.",
  kyc_verified: "Retail transfer and QRIS payer surface after KYC verification.",
  merchant: "Merchant QRIS and payment surface.",
  bank_pjp: "Custodian onboarding, KYC, retail customer, participant read, and wallet issuance surface.",
  bank_indonesia: "Bank Indonesia mutation and oversight surface.",
  supervisor: "Read-only oversight surface.",
};

for (const [role, allowedPaths] of Object.entries(rolePaths)) {
  const doc = {
    openapi: "3.1.0",
    info: {
      title: `Garuda Digital Rupiah API Gateway — Role: ${role}`,
      version: "0.3.0",
      description: descriptions[role],
    },
    paths: Object.fromEntries(
      Object.entries(allowedPaths).map(([routePath, methods]) => [
        routePath,
        Object.fromEntries(methods.map((method) => [method, paths[routePath][method]])),
      ]),
    ),
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Use Authorization: Bearer <JWT> from POST /auth/login.",
        },
      },
      parameters,
      schemas,
    },
  };

  const outPath = path.join(__dirname, `openapi-${role}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(doc, null, 2)}\n`);
}
