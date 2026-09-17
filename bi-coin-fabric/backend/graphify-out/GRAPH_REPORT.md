# Graph Report - .  (2026-09-01)

## Corpus Check
- Corpus is ~22,102 words - fits in a single context window. You may not need a graph.

## Summary
- 429 nodes · 991 edges · 12 communities detected
- Extraction: 71% EXTRACTED · 29% INFERRED · 0% AMBIGUOUS · INFERRED: 286 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Error Codes and Validation|Error Codes and Validation]]
- [[_COMMUNITY_Authorization Tests|Authorization Tests]]
- [[_COMMUNITY_Development Workflows|Development Workflows]]
- [[_COMMUNITY_Transaction Handlers|Transaction Handlers]]
- [[_COMMUNITY_API Data Contracts|API Data Contracts]]
- [[_COMMUNITY_Authentication Services|Authentication Services]]
- [[_COMMUNITY_Fabric Configuration|Fabric Configuration]]
- [[_COMMUNITY_PostgreSQL Persistence|PostgreSQL Persistence]]
- [[_COMMUNITY_Documentation Server|Documentation Server]]
- [[_COMMUNITY_OpenAPI Contract Tests|OpenAPI Contract Tests]]
- [[_COMMUNITY_OpenAPI Spec Generator|OpenAPI Spec Generator]]
- [[_COMMUNITY_Embedded API Docs|Embedded API Docs]]

## God Nodes (most connected - your core abstractions)
1. `LedgerService` - 56 edges
2. `Handler` - 46 edges
3. `writeJSON()` - 45 edges
4. `writeServiceError()` - 42 edges
5. `New()` - 32 edges
6. `NewLedgerServiceForTest()` - 28 edges
7. `PostgresStore` - 25 edges
8. `decodeJSON()` - 18 edges
9. `Internal()` - 18 edges
10. `memoryKycStore` - 15 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `NewPostgresStore()`  [INFERRED]
  main.go → services/postgres_store.go
- `main()` --calls--> `NewAuthService()`  [INFERRED]
  main.go → services/auth.go
- `newHTTPServer()` --calls--> `New()`  [INFERRED]
  main.go → handlers/handlers.go
- `newHTTPServer()` --calls--> `AuthMiddleware()`  [INFERRED]
  main.go → middleware/auth.go
- `newHTTPServer()` --calls--> `NewDocsHandler()`  [INFERRED]
  main.go → handlers/docs.go

## Communities

### Community 0 - "Error Codes and Validation"
Cohesion: 0.06
Nodes (16): Conflict(), Forbidden(), Internal(), InvalidInput(), parseInt64(), TestCreateRetailCustomerHashesIdentityAndAnchorsCustomer(), TestLedgerServiceLiquidityAndLimitCommands(), validateMoneyReceipt() (+8 more)

### Community 1 - "Authorization Tests"
Cohesion: 0.07
Nodes (42): requestWithIdentity(), TestQrisMutationsRejectForeignWallet(), TestRetailActorCannotUseInstitutionalRedemptionRoute(), TestRetailBalancesAreScopedToOwnedWallets(), TestRetailBalancesDoNotUseSharedCustodianAsOwnership(), TestRetailTransferAllowsOwnedSenderWallet(), TestRetailTransferRejectsForeignSenderWallet(), TestRetailWalletListIgnoresForeignParticipantFilter() (+34 more)

### Community 2 - "Development Workflows"
Cohesion: 0.04
Nodes (54): Analysis and Debug Workflow, Build and Compile Workflow, cargo build, check, and clippy, cargo test, curl, docker, ls, read, grep, and find, Files and Search Workflow (+46 more)

### Community 3 - "Transaction Handlers"
Cohesion: 0.16
Nodes (10): decodeJSON(), Handler, isRetailActor(), ledgerServiceContextKey, ownerSubject(), TopologyHandler(), writeError(), writeJSON() (+2 more)

### Community 4 - "API Data Contracts"
Cohesion: 0.04
Nodes (47): AmountRequest, AmountResult, Balance, CreateQrisIntentRequest, CreateWalletRequest, DistributeRequest, DueDiligenceLevel, ErrorResponse (+39 more)

### Community 5 - "Authentication Services"
Cohesion: 0.1
Nodes (25): AuthMiddleware(), GetCustodianMSPID(), GetParticipantID(), GetRole(), GetSubjectID(), GetUsername(), HashPassword(), NewAuthService() (+17 more)

### Community 6 - "Fabric Configuration"
Cohesion: 0.08
Nodes (24): Config, FabricGateway, getEnv(), getEnvInt(), Load(), TestResolveGatewayByMSP(), TestValidateRejectsMissingSecretsAndSchema(), connectFabricContract() (+16 more)

### Community 7 - "PostgreSQL Persistence"
Cohesion: 0.11
Nodes (11): QrisMode, QrisStatus, NewPostgresStore(), nullableJSON(), nullablePointerString(), nullableString(), auditExecer, BootstrapUser (+3 more)

### Community 8 - "Documentation Server"
Cohesion: 0.2
Nodes (5): NewDocsHandler(), DocsHandler, DocsSpecs, roleInfo, TestDocsRoleTaglinesUseCurrentScope()

### Community 9 - "OpenAPI Contract Tests"
Cohesion: 0.47
Nodes (5): assertSchemaRef(), checkIdempotency(), openAPIDoc, openAPIOperation, TestEmbeddedOpenAPISpecsMatchV3Contracts()

### Community 10 - "OpenAPI Spec Generator"
Cohesion: 0.6
Nodes (3): jsonContent(), op(), response()

### Community 11 - "Embedded API Docs"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **106 isolated node(s):** `openAPIDoc`, `openAPIOperation`, `FabricGateway`, `roleInfo`, `DocsSpecs` (+101 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Embedded API Docs`** (1 nodes): `docsembed.go`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Handler` connect `Transaction Handlers` to `Authorization Tests`, `Authentication Services`, `Fabric Configuration`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `New()` connect `Authorization Tests` to `Error Codes and Validation`, `Transaction Handlers`, `Authentication Services`, `Fabric Configuration`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `LedgerService` connect `Error Codes and Validation` to `Authorization Tests`, `Fabric Configuration`, `PostgreSQL Persistence`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Are the 31 inferred relationships involving `New()` (e.g. with `newHTTPServer()` and `TestOfflineRoutesAreNotRegistered()`) actually correct?**
  _`New()` has 31 INFERRED edges - model-reasoned connections that need verification._
- **What connects `openAPIDoc`, `openAPIOperation`, `FabricGateway` to the rest of the system?**
  _106 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Error Codes and Validation` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Authorization Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._