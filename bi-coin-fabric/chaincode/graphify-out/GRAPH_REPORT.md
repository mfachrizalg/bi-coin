# Graph Report - .  (2026-09-01)

## Corpus Check
- Corpus is ~15,977 words - fits in a single context window. You may not need a graph.

## Summary
- 253 nodes · 777 edges · 8 communities detected
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 268 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_CBDC Contract Operations|CBDC Contract Operations]]
- [[_COMMUNITY_Wallet Identity and KYC|Wallet Identity and KYC]]
- [[_COMMUNITY_Compliance and Authorization Tests|Compliance and Authorization Tests]]
- [[_COMMUNITY_Fabric Mock Stub|Fabric Mock Stub]]
- [[_COMMUNITY_Ledger State Test Harness|Ledger State Test Harness]]
- [[_COMMUNITY_Ledger Queries and Reporting|Ledger Queries and Reporting]]
- [[_COMMUNITY_RTK Workflow Tooling|RTK Workflow Tooling]]
- [[_COMMUNITY_RTK Command Discipline|RTK Command Discipline]]

## God Nodes (most connected - your core abstractions)
1. `SmartContract` - 85 edges
2. `mockStub` - 41 edges
3. `txNow()` - 31 edges
4. `requireBankIndonesia()` - 17 edges
5. `newMockTransactionContext()` - 16 edges
6. `setMockTransaction()` - 14 edges
7. `putActiveParticipant()` - 14 edges
8. `newMockTransactionContextWithMSP()` - 13 edges
9. `TestTransferUpdatesBalancesRecordsTransactionAndEmitsHighRiskEvent()` - 13 edges
10. `requireInstitution()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `TestCreateWalletRejectsTierMismatchAndUsesPolicyDerivedTier()` --calls--> `approvedProfile()`  [INFERRED]
  digital_rupiah_test.go → compliance_policy_test.go
- `TestTransferUpdatesBalancesRecordsTransactionAndEmitsHighRiskEvent()` --calls--> `approvedProfile()`  [INFERRED]
  digital_rupiah_test.go → compliance_policy_test.go
- `TestPayQrisRecordsReferenceAndTransactionType()` --calls--> `approvedProfile()`  [INFERRED]
  digital_rupiah_test.go → compliance_policy_test.go
- `TestSubmitAndApproveParticipantCreatesMerchantWallet()` --calls--> `newMockTransactionContext()`  [INFERRED]
  digital_rupiah_test.go → test_helpers_test.go
- `TestFreezeAndUnfreezeParticipantTogglesWalletState()` --calls--> `newMockTransactionContext()`  [INFERRED]
  digital_rupiah_test.go → test_helpers_test.go

## Hyperedges (group relationships)
- **RTK Development Workflows** — claude_build_compile_workflow, claude_test_workflow, claude_git_workflow, claude_github_workflow, claude_javascript_typescript_tooling, claude_files_search_workflow, claude_analysis_debug_workflow, claude_infrastructure_workflow, claude_network_workflow [EXTRACTED 1.00]

## Communities

### Community 0 - "CBDC Contract Operations"
Cohesion: 0.13
Nodes (8): TestBankIndonesiaOnlyFunctionsRejectBankPjpMSP(), checkedAddInt64(), checkedSubInt64(), requireBankIndonesia(), SmartContract, TestFreezeAndUnfreezeParticipantTogglesWalletState(), TestSubmitAndApproveParticipantCreatesMerchantWallet(), txNow()

### Community 1 - "Wallet Identity and KYC"
Cohesion: 0.05
Nodes (32): AutoLimitPolicy, currentMSP(), DueDiligenceLevel, IdempotencyRecord, KycAuditEvent, KycProfile, KycProviderCheck, KycRiskLevel (+24 more)

### Community 2 - "Compliance and Authorization Tests"
Cohesion: 0.07
Nodes (25): TestBankPjpCanSubmitParticipant(), TestOJKObserverCannotInvokeMutations(), applyRetailTransferPolicy(), deriveWalletTier(), resetRetailCounters(), approvedProfile(), TestDeriveWalletTierFromKycPolicy(), TestResetRetailCounters() (+17 more)

### Community 3 - "Fabric Mock Stub"
Cohesion: 0.06
Nodes (1): mockStub

### Community 4 - "Ledger State Test Harness"
Cohesion: 0.23
Nodes (23): TestBurnPropagatesAuditWriteFailure(), TestCreateWalletRejectsTierMismatchAndUsesPolicyDerivedTier(), TestPayQrisRecordsReferenceAndTransactionType(), TestPayQrisRequiresReference(), TestSetAndListSystemLimits(), TestSubmitAndRefreshKycProfilePersistsAuditTrail(), TestTransferPropagatesAuditWriteFailure(), TestTransferRequiresApprovedKycAnchor() (+15 more)

### Community 5 - "Ledger Queries and Reporting"
Cohesion: 0.21
Nodes (3): TestOJKObserverCanReadLedgerState(), hasCompositeState(), mockStateIterator

### Community 6 - "RTK Workflow Tooling"
Cohesion: 0.22
Nodes (14): Analysis and Debug Workflow, 60-90 Percent Average Token Reduction, Build and Compile Workflow, Files and Search Workflow, Git Workflow, GitHub Workflow, Infrastructure Workflow, JavaScript and TypeScript Tooling (+6 more)

### Community 7 - "RTK Command Discipline"
Cohesion: 0.67
Nodes (3): Always Prefix Commands with RTK, RTK in Command Chains, Dedicated Filtering with Safe Passthrough

## Knowledge Gaps
- **33 isolated node(s):** `ParticipantStatus`, `TransactionType`, `TransactionStatus`, `Participant`, `Wallet` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SmartContract` connect `CBDC Contract Operations` to `Wallet Identity and KYC`, `Ledger State Test Harness`, `Ledger Queries and Reporting`?**
  _High betweenness centrality (0.256) - this node is a cross-community bridge._
- **Why does `mockStub` connect `Fabric Mock Stub` to `CBDC Contract Operations`, `Compliance and Authorization Tests`, `Ledger State Test Harness`, `Ledger Queries and Reporting`?**
  _High betweenness centrality (0.240) - this node is a cross-community bridge._
- **Why does `time` connect `Compliance and Authorization Tests` to `Wallet Identity and KYC`, `Ledger State Test Harness`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Are the 14 inferred relationships involving `newMockTransactionContext()` (e.g. with `TestSubmitAndApproveParticipantCreatesMerchantWallet()` and `TestFreezeAndUnfreezeParticipantTogglesWalletState()`) actually correct?**
  _`newMockTransactionContext()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ParticipantStatus`, `TransactionType`, `TransactionStatus` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CBDC Contract Operations` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
- **Should `Wallet Identity and KYC` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._