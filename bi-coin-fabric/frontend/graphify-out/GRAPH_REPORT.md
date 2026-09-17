# Graph Report - .  (2026-09-01)

## Corpus Check
- Corpus is ~12,997 words - fits in a single context window. You may not need a graph.

## Summary
- 135 nodes · 195 edges · 21 communities detected
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_API Client and Monitoring|API Client and Monitoring]]
- [[_COMMUNITY_RTK Workflow Guidance|RTK Workflow Guidance]]
- [[_COMMUNITY_QRIS Payments|QRIS Payments]]
- [[_COMMUNITY_Contract Test Runtime|Contract Test Runtime]]
- [[_COMMUNITY_Participant Management|Participant Management]]
- [[_COMMUNITY_Frontend Bootstrap Metadata|Frontend Bootstrap Metadata]]
- [[_COMMUNITY_Wallet and KYC Creation|Wallet and KYC Creation]]
- [[_COMMUNITY_Authentication and App Shell|Authentication and App Shell]]
- [[_COMMUNITY_Wallet Listing|Wallet Listing]]
- [[_COMMUNITY_Transfers and Audit Log|Transfers and Audit Log]]
- [[_COMMUNITY_Demo Panel|Demo Panel]]
- [[_COMMUNITY_Transaction Limits|Transaction Limits]]
- [[_COMMUNITY_System Overview|System Overview]]
- [[_COMMUNITY_Observability Dashboard|Observability Dashboard]]
- [[_COMMUNITY_Transfer API|Transfer API]]
- [[_COMMUNITY_Vite Configuration|Vite Configuration]]
- [[_COMMUNITY_React Entry Point|React Entry Point]]
- [[_COMMUNITY_Vite Type Declarations|Vite Type Declarations]]
- [[_COMMUNITY_World State|World State]]
- [[_COMMUNITY_Money Supply|Money Supply]]
- [[_COMMUNITY_Shared Constants|Shared Constants]]

## God Nodes (most connected - your core abstractions)
1. `request()` - 37 edges
2. `RTK Command Instructions` - 14 edges
3. `Frontend HTML Document Shell` - 6 edges
4. `load()` - 5 edges
5. `notify()` - 5 edges
6. `loadIntents()` - 5 edges
7. `handleLogin()` - 4 edges
8. `handleIssue()` - 4 edges
9. `handleSubmit()` - 4 edges
10. `handleCreate()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Main TSX Module Entry Point` --conceptually_related_to--> `JavaScript and TypeScript Tooling`  [INFERRED]
  index.html → CLAUDE.md
- `submit()` --calls--> `transfer()`  [INFERRED]
  src/pages/Transfer.tsx → src/lib/api.ts
- `load()` --calls--> `listParticipants()`  [INFERRED]
  src/pages/Participants.tsx → src/lib/api.ts
- `handleLogin()` --calls--> `login()`  [INFERRED]
  src/App.tsx → src/lib/api.ts
- `handleLogin()` --calls--> `setAccessToken()`  [INFERRED]
  src/App.tsx → src/lib/api.ts

## Hyperedges (group relationships)
- **Frontend Document Bootstrap** — index_html_document_shell, index_garuda_digital_rupiah_app, index_root_mount_element, index_main_tsx_module [EXTRACTED 1.00]
- **RTK Supported Workflows** — claude_rtk, claude_build_compile_workflow, claude_test_workflow, claude_git_workflow, claude_github_workflow, claude_javascript_typescript_tooling, claude_files_search_workflow, claude_analysis_debug_workflow, claude_infrastructure_workflow, claude_network_workflow, claude_rtk_meta_commands [EXTRACTED 1.00]

## Communities

### Community 0 - "API Client and Monitoring"
Cohesion: 0.14
Nodes (19): approveParticipant(), freezeParticipant(), getBalances(), getHealth(), getKycProfile(), getMetrics(), getParticipant(), getQrisIntent() (+11 more)

### Community 1 - "RTK Workflow Guidance"
Cohesion: 0.15
Nodes (15): Always Prefix Commands with RTK, Analysis and Debug Workflow, Build and Compile Workflow, RTK Prefixing in Command Chains, Files and Search Workflow, Dedicated Filter or Safe Passthrough Rationale, Git Workflow, GitHub Workflow (+7 more)

### Community 2 - "QRIS Payments"
Cohesion: 0.2
Nodes (11): cancelQrisIntent(), createQrisIntent(), listQrisIntents(), payQris(), resolveQrisPayload(), handleCancel(), handleCreate(), handlePay() (+3 more)

### Community 3 - "Contract Test Runtime"
Cohesion: 0.18
Nodes (4): findAll(), findByPlaceholder(), findByText(), walkTree()

### Community 4 - "Participant Management"
Cohesion: 0.24
Nodes (9): distributeToParticipant(), requestIssuance(), submitParticipant(), handleAction(), handleDistribute(), handleIssue(), handleSubmit(), load() (+1 more)

### Community 5 - "Frontend Bootstrap Metadata"
Cohesion: 0.28
Nodes (9): JavaScript and TypeScript Tooling, Bank Building Favicon, Garuda Digital Rupiah Application, Frontend HTML Document Shell, Main TSX Module Entry Point, Responsive Viewport Configuration, Retail CBDC, Root Application Mount Element (+1 more)

### Community 6 - "Wallet and KYC Creation"
Cohesion: 0.25
Nodes (7): createRetailCustomer(), createWallet(), refreshKycProfile(), submitKycProfile(), approveKyc(), submit(), submitKyc()

### Community 7 - "Authentication and App Shell"
Cohesion: 0.33
Nodes (5): getMe(), login(), setAccessToken(), handleLogin(), handleLogout()

### Community 8 - "Wallet Listing"
Cohesion: 0.29
Nodes (4): getWallets(), listParticipants(), loadWallets(), load()

### Community 9 - "Transfers and Audit Log"
Cohesion: 0.33
Nodes (5): getAuditLog(), load(), fmt(), submit(), walletLabel()

### Community 10 - "Demo Panel"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Transaction Limits"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "System Overview"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Observability Dashboard"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Transfer API"
Cohesion: 1.0
Nodes (2): submitTransfer(), transfer()

### Community 15 - "Vite Configuration"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "React Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Vite Type Declarations"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "World State"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Money Supply"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Shared Constants"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **13 isolated node(s):** `Retail CBDC`, `UTF-8 Character Encoding`, `Responsive Viewport Configuration`, `Dedicated Filter or Safe Passthrough Rationale`, `Build and Compile Workflow` (+8 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Demo Panel`** (2 nodes): `phases()`, `DemoPanel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Transaction Limits`** (2 nodes): `fmt()`, `Limits.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `System Overview`** (2 nodes): `fmt()`, `Overview.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Observability Dashboard`** (2 nodes): `fmt()`, `Observability.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Transfer API`** (2 nodes): `submitTransfer()`, `transfer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Configuration`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Entry Point`** (1 nodes): `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Type Declarations`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `World State`** (1 nodes): `WorldState.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Money Supply`** (1 nodes): `Supply.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared Constants`** (1 nodes): `constants.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `request()` connect `API Client and Monitoring` to `QRIS Payments`, `Participant Management`, `Wallet and KYC Creation`, `Authentication and App Shell`, `Wallet Listing`, `Transfer API`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `listParticipants()` connect `Wallet Listing` to `API Client and Monitoring`, `Participant Management`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `transfer()` connect `Transfer API` to `API Client and Monitoring`, `Transfers and Audit Log`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `Retail CBDC`, `UTF-8 Character Encoding`, `Responsive Viewport Configuration` to the rest of the system?**
  _13 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API Client and Monitoring` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._