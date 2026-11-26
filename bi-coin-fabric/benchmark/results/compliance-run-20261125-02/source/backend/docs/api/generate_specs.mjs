import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bearerSecurity = [{ BearerAuth: [] }];
const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const jsonContent = (schema) => ({ "application/json": { schema } });
const response = (description, schema) => ({
  description,
  content: jsonContent(schema),
});
const schemas = {
  HTTPValidationError: {
    type: "object",
    properties: {
      detail: {
        type: "array",
        items: ref("ValidationError"),
        title: "Detail",
      },
    },
    title: "HTTPValidationError",
  },
  ValidationError: {
    type: "object",
    properties: {
      loc: {
        type: "array",
        items: { anyOf: [{ type: "string" }, { type: "integer" }] },
        title: "Location",
      },
      msg: { type: "string", title: "Message" },
      type: { type: "string", title: "Error Type" },
      input: { title: "Input" },
      ctx: { type: "object", title: "Context" },
    },
    required: ["loc", "msg", "type"],
    title: "ValidationError",
  },
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
};

const rolePaths = {
  public: {
    "/health": ["get"],
    "/auth/login": ["post"],
  },
  authenticated: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
  },
  kyc_verified: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
  },
  merchant: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
  },
  retail_bank: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
  },
  wholesale_bank: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
  },
  bank_indonesia: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
  },
  auditor: {
    "/health": ["get"],
    "/auth/login": ["post"],
    "/auth/me": ["get"],
  },
};

const descriptions = {
  public: "Public entrypoints: health and JWT login.",
  authenticated: "Health, JWT login, and principal profile.",
  kyc_verified: "Health, JWT login, and principal profile.",
  merchant: "Health, JWT login, and principal profile.",
  retail_bank: "Health, JWT login, and principal profile.",
  wholesale_bank: "Health, JWT login, and principal profile.",
  bank_indonesia: "Health, JWT login, and principal profile.",
  auditor: "Health, JWT login, and principal profile.",
};

for (const [role, allowedPaths] of Object.entries(rolePaths)) {
  const doc = {
    openapi: "3.1.0",
    info: {
      title: `bi-coin Digital Rupiah API Gateway — Role: ${role}`,
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
      schemas,
    },
  };

  const outPath = path.join(__dirname, `openapi-${role}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(doc, null, 2)}\n`);
}
