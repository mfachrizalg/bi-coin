# Graph Report - .  (2026-08-31)

## Corpus Check
- 133 files · ~108,325 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1465 nodes · 2848 edges · 87 communities detected
- Extraction: 75% EXTRACTED · 25% INFERRED · 0% AMBIGUOUS · INFERRED: 715 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Policy and Ledger Tests|Policy and Ledger Tests]]
- [[_COMMUNITY_Trust and Endorsement|Trust and Endorsement]]
- [[_COMMUNITY_QRIS and Payment Flows|QRIS and Payment Flows]]
- [[_COMMUNITY_Benchmark Workload APIs|Benchmark Workload APIs]]
- [[_COMMUNITY_Adversarial Benchmarking|Adversarial Benchmarking]]
- [[_COMMUNITY_Activity Diagram Flows|Activity Diagram Flows]]
- [[_COMMUNITY_Ledger Core|Ledger Core]]
- [[_COMMUNITY_Backend Data Models|Backend Data Models]]
- [[_COMMUNITY_Participant Lifecycle|Participant Lifecycle]]
- [[_COMMUNITY_Retail Transfer Benchmarks|Retail Transfer Benchmarks]]
- [[_COMMUNITY_Authentication Middleware|Authentication Middleware]]
- [[_COMMUNITY_Chaincode Operations|Chaincode Operations]]
- [[_COMMUNITY_Authorization Evidence|Authorization Evidence]]
- [[_COMMUNITY_Backend Auth Services|Backend Auth Services]]
- [[_COMMUNITY_Peak Repetition Results|Peak Repetition Results]]
- [[_COMMUNITY_Frontend Runtime Contracts|Frontend Runtime Contracts]]
- [[_COMMUNITY_Money Representation|Money Representation]]
- [[_COMMUNITY_Transfer Error Flow|Transfer Error Flow]]
- [[_COMMUNITY_Functional Benchmarks|Functional Benchmarks]]
- [[_COMMUNITY_Issuance Flow|Issuance Flow]]
- [[_COMMUNITY_Participant Approval|Participant Approval]]
- [[_COMMUNITY_Functional Profile Results|Functional Profile Results]]
- [[_COMMUNITY_Double Spend Prevention|Double Spend Prevention]]
- [[_COMMUNITY_API Documentation Tests|API Documentation Tests]]
- [[_COMMUNITY_OpenAPI Specification|OpenAPI Specification]]
- [[_COMMUNITY_Benchmark Manifesting|Benchmark Manifesting]]
- [[_COMMUNITY_Negative Path Enforcement|Negative Path Enforcement]]
- [[_COMMUNITY_Negative Path Results|Negative Path Results]]
- [[_COMMUNITY_Boundary Conformance|Boundary Conformance]]
- [[_COMMUNITY_KYC Verification Flow|KYC Verification Flow]]
- [[_COMMUNITY_Participant Unfreeze|Participant Unfreeze]]
- [[_COMMUNITY_KYC Scope Tests|KYC Scope Tests]]
- [[_COMMUNITY_Retail Transfer Workloads|Retail Transfer Workloads]]
- [[_COMMUNITY_Peak Confidence Intervals|Peak Confidence Intervals]]
- [[_COMMUNITY_Overspend Contention|Overspend Contention]]
- [[_COMMUNITY_Authorization Log Validation|Authorization Log Validation]]
- [[_COMMUNITY_Functional Workload Tests|Functional Workload Tests]]
- [[_COMMUNITY_Transfer Baseline|Transfer Baseline]]
- [[_COMMUNITY_Client Money Precision|Client Money Precision]]
- [[_COMMUNITY_Frontend Demo Panel|Frontend Demo Panel]]
- [[_COMMUNITY_Frontend Limits|Frontend Limits]]
- [[_COMMUNITY_Frontend Overview|Frontend Overview]]
- [[_COMMUNITY_Frontend Observability|Frontend Observability]]
- [[_COMMUNITY_Negative Log Tests|Negative Log Tests]]
- [[_COMMUNITY_Negative Log Validation|Negative Log Validation]]
- [[_COMMUNITY_Boundary Log Validation|Boundary Log Validation]]
- [[_COMMUNITY_Clean Ledger Benchmark|Clean Ledger Benchmark]]
- [[_COMMUNITY_Zero Failure Benchmark|Zero Failure Benchmark]]
- [[_COMMUNITY_Functional Profile Benchmarks|Functional Profile Benchmarks]]
- [[_COMMUNITY_Documentation Embedding|Documentation Embedding]]
- [[_COMMUNITY_Vite Configuration|Vite Configuration]]
- [[_COMMUNITY_Frontend Entry Point|Frontend Entry Point]]
- [[_COMMUNITY_Vite Environment Types|Vite Environment Types]]
- [[_COMMUNITY_World State UI|World State UI]]
- [[_COMMUNITY_Supply UI|Supply UI]]
- [[_COMMUNITY_Frontend Constants|Frontend Constants]]
- [[_COMMUNITY_Authorization Test|Authorization Test]]
- [[_COMMUNITY_Boundary Test|Boundary Test]]
- [[_COMMUNITY_Retail Benchmark Tests|Retail Benchmark Tests]]
- [[_COMMUNITY_Caliper Benchmarking|Caliper Benchmarking]]
- [[_COMMUNITY_Fabric Platform|Fabric Platform]]
- [[_COMMUNITY_Digital Rupiah Domain|Digital Rupiah Domain]]
- [[_COMMUNITY_Fixed Rate Control|Fixed Rate Control]]
- [[_COMMUNITY_Caliper Workers|Caliper Workers]]
- [[_COMMUNITY_Docker Resource Monitoring|Docker Resource Monitoring]]
- [[_COMMUNITY_One Worker Transfer|One Worker Transfer]]
- [[_COMMUNITY_Two Worker Transfer|Two Worker Transfer]]
- [[_COMMUNITY_Four Worker Transfer|Four Worker Transfer]]
- [[_COMMUNITY_Repeated One Worker|Repeated One Worker]]
- [[_COMMUNITY_Repeated Two Worker|Repeated Two Worker]]
- [[_COMMUNITY_Repeated Four Worker|Repeated Four Worker]]
- [[_COMMUNITY_Repeated Functional Profiles|Repeated Functional Profiles]]
- [[_COMMUNITY_Monitored One Worker|Monitored One Worker]]
- [[_COMMUNITY_Monitored Two Workers|Monitored Two Workers]]
- [[_COMMUNITY_Monitored Four Workers|Monitored Four Workers]]
- [[_COMMUNITY_Monitored Functional Profiles|Monitored Functional Profiles]]
- [[_COMMUNITY_Monitored Peak Repetitions|Monitored Peak Repetitions]]
- [[_COMMUNITY_Monitored Negative Path|Monitored Negative Path]]
- [[_COMMUNITY_Monitored Double Spend|Monitored Double Spend]]
- [[_COMMUNITY_Fabric Ledger Platform|Fabric Ledger Platform]]
- [[_COMMUNITY_Digital Rupiah Model|Digital Rupiah Model]]
- [[_COMMUNITY_Interrupted Benchmark Runs|Interrupted Benchmark Runs]]
- [[_COMMUNITY_Successful Benchmark Runs|Successful Benchmark Runs]]
- [[_COMMUNITY_Blockchain Activity Lane|Blockchain Activity Lane]]
- [[_COMMUNITY_Review Status|Review Status]]
- [[_COMMUNITY_KYC Feature Scope|KYC Feature Scope]]
- [[_COMMUNITY_QRIS Feature Scope|QRIS Feature Scope]]

## God Nodes (most connected - your core abstractions)
1. `SmartContract` - 85 edges
2. `New()` - 66 edges
3. `LedgerService` - 56 edges
4. `Handler` - 46 edges
5. `writeJSON()` - 45 edges
6. `Comprehensive bi-coin-fabric Review` - 43 edges
7. `writeServiceError()` - 42 edges
8. `mockStub` - 41 edges
9. `request()` - 37 edges
10. `txNow()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Garuda Digital Rupiah` --semantically_similar_to--> `Retail digital rupiah`  [INFERRED] [semantically similar]
  frontend/index.html → docs/adr/0003-thesis-and-prototype-feature-boundaries.md
- `newMockTransactionContextWithMSP()` --calls--> `New()`  [INFERRED]
  chaincode/test_helpers_test.go → backend/handlers/handlers.go
- `setMockTransaction()` --calls--> `New()`  [INFERRED]
  chaincode/test_helpers_test.go → backend/handlers/handlers.go
- `TestCreateWalletRejectsTierMismatchAndUsesPolicyDerivedTier()` --calls--> `createWallet()`  [INFERRED]
  chaincode/digital_rupiah_test.go → frontend/src/lib/api.ts
- `TestTransferUpdatesBalancesRecordsTransactionAndEmitsHighRiskEvent()` --calls--> `getSupervisionEvents()`  [INFERRED]
  chaincode/digital_rupiah_test.go → frontend/src/lib/api.ts

## Hyperedges (group relationships)
- **Retail CBDC application architecture** — readme_frontend, readme_backend, readme_fabric_network, readme_postgresql_kyc_auth [EXTRACTED 1.00]
- **P1 evidence and remediation benchmark suite** — benchmark_negative_path_conformance, benchmark_custody_authorization, benchmark_adversarial_double_spend, benchmark_repetition_confidence_interval, benchmark_resource_metrics [EXTRACTED 1.00]
- **Overspend contention benchmark round** — report_aggregate_overspend_contention_round, report_fixed_rate_control, report_adversarial_double_spend_workload, report_caliper_result_metrics [EXTRACTED 1.00]
- **Caliper Fabric Benchmark Reports** — report_2026_06_30_invalid_missing_tier_limits, report_2026_06_30_caliper_clean_ledger_run_1, report_2026_06_30_caliper_zero_failure_run_1, report_2026_06_30_112324_transfer_w1, report_2026_06_30_113543_transfer_w1, report_2026_06_30_113543_transfer_w2, report_2026_06_30_113543_transfer_w4, report_2026_06_30_113543_functionality, report_p1_20260725_181743_transfer_w1, report_p1_20260725_181743_transfer_w2, report_p1_20260725_181743_transfer_w4, report_p1_20260725_181743_functionality, report_p1_20260725_181743_transfer_repeat, report_p1_20260725_181743_negative_path, report_p1_20260725_181743_adversarial, report_res_20260725_185547_transfer_w1, report_res_20260725_185547_transfer_w2, report_res_20260725_185547_transfer_w4, report_res_20260725_185547_functionality, report_res_20260725_185547_transfer_repeat, report_res_20260725_185547_negative_path, report_res_20260725_185547_adversarial, hyperledger_caliper, hyperledger_fabric, digital_rupiah, fixed_rate_control, local_caliper_workers [EXTRACTED 1.00]
- **Worker-Scaling Transfer Benchmarks** — report_2026_06_30_113543_transfer_w1, report_2026_06_30_113543_transfer_w2, report_2026_06_30_113543_transfer_w4, local_caliper_workers [INFERRED 0.90]
- **Docker-Instrumented Benchmark Results** — report_res_20260725_185547_transfer_w1, report_res_20260725_185547_transfer_w2, report_res_20260725_185547_transfer_w4, report_res_20260725_185547_functionality, report_res_20260725_185547_transfer_repeat, report_res_20260725_185547_negative_path, report_res_20260725_185547_adversarial, docker_resource_monitor [EXTRACTED 1.00]
- **One-, two-, and four-worker retail transfer scenarios** — transfer_w1_scenario, transfer_w2_scenario, transfer_w4_scenario, retail_transfer_workload [INFERRED 0.80]
- **Onboarding, monetary operations, supervision reads, and administrative policy benchmark profiles** — functional_benchmark_profile_set, kyc_onboarding_scenario, monetary_ops_scenario, supervision_reads_scenario, admin_policy_scenario [EXTRACTED 1.00]
- **Digital Rupiah benchmark architecture: Hyperledger Fabric, Hyperledger Caliper, and Docker monitoring** — digital_rupiah_system, hyperledger_fabric_dlt, hyperledger_caliper, docker_resource_monitor [INFERRED 0.80]
- **Retail transfer warmup, sustained, and peak rounds** — 20260811_live_v3_performance_w1_final_report, 20260811_live_v3_performance_w1_final_retail_warmup_w1, 20260811_live_v3_performance_w1_final_retail_sustained_w1, 20260811_live_v3_performance_w1_final_retail_peak_w1 [EXTRACTED 1.00]
- **Functional benchmark profile rounds** — 20260824_review_full_01_functionality_report, 20260824_review_full_01_functionality_kyc_onboarding_round, 20260824_review_full_01_functionality_monetary_ops_round, 20260824_review_full_01_functionality_supervision_reads_round, 20260824_review_full_01_functionality_admin_policy_round [EXTRACTED 1.00]
- **Review full 01 conformance and adversarial scenarios** — 20260824_review_full_01_boundary_path_report, 20260824_review_full_01_authorization_report, 20260824_review_full_01_negative_path_report, 20260824_review_full_01_recovery2_aggregate_overspend_report [INFERRED 0.70]
- **Fabric trust boundary stack** — adr0001_network_endorsement_policy, adr0001_chaincode_authorization, adr0001_ojk_read_only, adr0001_bank_indonesia [EXTRACTED 1.00]
- **Canonical two-tier retail CBDC flow** — adr0003_bank_indonesia_issuer, adr0003_treasury, adr0003_institutional_custodian, adr0003_retail_customer, adr0003_merchant [EXTRACTED 1.00]
- **Thesis acceptance core operations** — adr0003_core_thesis_path, uc_overall_register_participant, uc_overall_issue_digital_rupiah, uc_overall_distribute_liquidity, uc_overall_transfer_balance, uc_overall_freeze_participant, uc_overall_supervision_reports [EXTRACTED 1.00]

## Communities

### Community 0 - "Policy and Ledger Tests"
Cohesion: 0.05
Nodes (38): TestBankIndonesiaOnlyFunctionsRejectBankPjpMSP(), AutoLimitPolicy, DueDiligenceLevel, IdempotencyRecord, KycAuditEvent, KycProfile, KycProviderCheck, KycRiskLevel (+30 more)

### Community 1 - "Trust and Endorsement"
Cohesion: 0.02
Nodes (125): Bank Indonesia, Bank Indonesia treasury, Independent chaincode authorization, Defense in depth, ADR 0001 — Fabric trust and endorsement boundaries, Hyperledger Fabric, Bank Indonesia issuance authority, Monetary and governance endorsements (+117 more)

### Community 2 - "QRIS and Payment Flows"
Cohesion: 0.04
Nodes (45): createQrisIntent(), payQris(), requestWithIdentity(), TestQrisMutationsRejectForeignWallet(), TestRetailActorCannotUseInstitutionalRedemptionRoute(), TestRetailBalancesAreScopedToOwnedWallets(), TestRetailBalancesDoNotUseSharedCustodianAsOwnership(), TestRetailTransferAllowsOwnedSenderWallet() (+37 more)

### Community 3 - "Benchmark Workload APIs"
Cohesion: 0.04
Nodes (18): AdminPolicyWorkload, AdversarialDoubleSpendWorkload, BoundaryPathWorkload, createWorkloadModule(), CustodyAuthorizationWorkload, MonetaryOpsWorkload, NegativePathWorkload, actorRequest() (+10 more)

### Community 4 - "Adversarial Benchmarking"
Cohesion: 0.03
Nodes (106): npm run benchmark:adversarial, Adversarial committed/rejected split, Adversarial double-spend benchmark, benchmark/workloads/adversarial-double-spend.js, Increase workers or TPS until submissions overlap within a block, Expired KYC rule, Fabric MVCC validation, Frozen sender rule (+98 more)

### Community 5 - "Activity Diagram Flows"
Cohesion: 0.03
Nodes (99): Mermaid Activity Diagrams — CBDC Digital Rupiah (Hyperledger Fabric), Activity-diagram thesis scope, Activity Diagrams Track A, Activity Diagrams Track B, AD01 Client/Bank lane, AD01 Participant Registration, Participant registration data, Burn(sender): reduce Validator Bank balance (+91 more)

### Community 6 - "Ledger Core"
Cohesion: 0.05
Nodes (26): Conflict(), Forbidden(), Internal(), InvalidInput(), connectFabricContract(), loadIdentity(), loadSigner(), NewLedgerService() (+18 more)

### Community 7 - "Backend Data Models"
Cohesion: 0.03
Nodes (57): AmountRequest, AmountResult, CreateQrisIntentRequest, CreateWalletRequest, DistributeRequest, DueDiligenceLevel, ErrorResponse, HealthResponse (+49 more)

### Community 8 - "Participant Lifecycle"
Cohesion: 0.05
Nodes (56): approveParticipant(), cancelQrisIntent(), createRetailCustomer(), createWallet(), distributeToParticipant(), freezeParticipant(), getBalances(), getHealth() (+48 more)

### Community 9 - "Retail Transfer Benchmarks"
Cohesion: 0.04
Nodes (71): Local Caliper workers: 1, Seeded low-contention retail transfer baseline with one Caliper worker, Hyperledger Caliper Report — Digital Rupiah Retail Transfer Benchmark (1 Worker), Retail peak W1 round: 120 seconds; fixed-rate 60 TPS, Retail peak W1 result: 2,072 successes, 5,129 failures; 60.0 send TPS; 15.23 s max latency, 0.01 s min latency, 2.77 s average latency; 58.7 TPS throughput, Retail sustained W1 round: 120 seconds; fixed-rate 30 TPS, Retail sustained W1 result: 3,178 successes, 423 failures; 30.0 send TPS; 3.50 s max latency, 0.00 s min latency, 0.88 s average latency; 29.5 TPS throughput, Retail warmup W1 round: 30 seconds; fixed-rate 10 TPS (+63 more)

### Community 10 - "Authentication Middleware"
Cohesion: 0.11
Nodes (23): AuthMiddleware(), GetCustodianMSPID(), GetParticipantID(), GetRole(), GetSubjectID(), GetUsername(), RequireRole(), writeError() (+15 more)

### Community 11 - "Chaincode Operations"
Cohesion: 0.09
Nodes (45): getTotalSupply(), getTransactions(), initLedger(), transfer(), TestBankPjpCanSubmitParticipant(), TestOJKObserverCannotInvokeMutations(), TestOJKObserverCanReadLedgerState(), applyRetailTransferPolicy() (+37 more)

### Community 12 - "Authorization Evidence"
Cohesion: 0.03
Nodes (63): Artifact SHA-256 hashes, npm run benchmark:authorization, authorization-oracle expected result: verdict=PASS, custody error, zero infrastructure errors, BI-custodied wallet, BI creates the authorization fixture, Boundary checks, Caliper 0.6 monitors.resource[].module schema, Explicit Caliper invokerMspId and invokerIdentity fields (+55 more)

### Community 13 - "Backend Auth Services"
Cohesion: 0.06
Nodes (30): getAuditLog(), load(), HashPassword(), NewAuthService(), parseParam(), signHMAC(), TestAuthServiceLoginAndVerifyToken(), TestAuthServiceRejectsWrongPassword() (+22 more)

### Community 14 - "Peak Repetition Results"
Cohesion: 0.09
Nodes (22): Digital Rupiah Retail Transfer - Repetition (mean +/- CI); retail-peak-rep-1 result: 3117 success, 485 failed; send rate 60.0 TPS; max/min/avg latency 2.54/0.01/0.75 s; throughput 58.0 TPS; retail-peak-rep-2 result: 3092 success, 510 failed; send rate 60.0 TPS; max/min/avg latency 2.38/0.01/0.71 s; throughput 57.9 TPS; retail-peak-rep-3 result: 3128 success, 474 failed; send rate 60.0 TPS; max/min/avg latency 2.34/0.01/0.71 s; throughput 57.9 TPS; retail-peak-rep-4 result: 3082 success, 520 failed; send rate 60.0 TPS; max/min/avg latency 2.47/0.01/0.75 s; throughput 59.7 TPS; retail-peak-rep-5 result: 3121 success, 481 failed; send rate 60.0 TPS; max/min/avg latency 2.38/0.01/0.68 s; throughput 57.8 TPS, Digital Rupiah Retail Transfer - Repetition (mean +/- CI); retail-peak-rep-1 result: 2342 success, 1256 failed; send rate 59.9 TPS; max/min/avg latency 3.69/0.01/1.07 s; throughput 57.7 TPS; retail-peak-rep-2 result: 1494 success, 2105 failed; send rate 60.0 TPS; max/min/avg latency 5.41/0.03/1.91 s; throughput 57.5 TPS; retail-peak-rep-3 result: 1885 success, 1713 failed; send rate 60.0 TPS; max/min/avg latency 3.98/0.01/1.45 s; throughput 59.2 TPS; retail-peak-rep-4 result: 1671 success, 1931 failed; send rate 60.0 TPS; max/min/avg latency 6.08/0.01/1.62 s; throughput 59.5 TPS; retail-peak-rep-5 result: 2327 success, 1275 failed; send rate 60.0 TPS; max/min/avg latency 3.69/0.01/1.15 s; throughput 57.7 TPS, Five seeded 60-second peak rounds support mean and confidence-interval estimation, Seeded low-contention retail transfer baseline with four Caliper workers, Seeded low-contention retail transfer baseline with one Caliper worker, Seeded low-contention retail transfer baseline with two Caliper workers, benchmark/workloads/retail-transfer.js, Digital Rupiah Retail Transfer Benchmark - 2 Workers; retail-warmup-w2 result: 302 success, 0 failed; send rate 10.1 TPS; max/min/avg latency 2.10/0.00/0.54 s; throughput 9.4 TPS (+14 more)

### Community 15 - "Frontend Runtime Contracts"
Cohesion: 0.18
Nodes (4): findAll(), findByPlaceholder(), findByText(), walkTree()

### Community 16 - "Money Representation"
Cohesion: 0.19
Nodes (13): Whole-rupiah decimal strings in JSON, ADR 0002 — Public API projections and money representation, Explicit stable DTO projection, Internal int64 representation, JSON serialization boundary, Ledger record, Ledger schema changes, Public API mapping layer (+5 more)

### Community 17 - "Transfer Error Flow"
Cohesion: 0.17
Nodes (13): HTTP 401 transfer error, Auto-redeem remaining balance, Check sender balance, AD05 Customer lane, Debit sender and credit recipient, Reject insufficient-balance transfer, Reject over-limit transfer, Check whether balance is below minimum (+5 more)

### Community 18 - "Functional Benchmarks"
Cohesion: 0.27
Nodes (10): Administrative policy scenario, benchmark/workloads/admin-policy.js, Digital Rupiah Functional Benchmark Profiles; kyc-onboarding result: 56 success, 0 failed; send rate 4.5 TPS; max/min/avg latency 2.17/0.10/0.84 s; throughput 3.8 TPS; monetary-ops result: 80 success, 0 failed; send rate 20.5 TPS; max/min/avg latency 0.53/0.11/0.32 s; throughput 19.9 TPS; supervision-reads result: 80 success, 0 failed; send rate 30.8 TPS; max/min/avg latency 0.09/0.00/0.03 s; throughput 30.7 TPS; admin-policy result: 40 success, 0 failed; send rate 5.3 TPS; max/min/avg latency 1.71/0.08/0.90 s; throughput 5.2 TPS, Digital Rupiah Functional Benchmark Profiles; kyc-onboarding result: 56 success, 0 failed; send rate 4.5 TPS; max/min/avg latency 2.19/0.09/0.85 s; throughput 3.8 TPS; monetary-ops result: 80 success, 0 failed; send rate 20.5 TPS; max/min/avg latency 0.55/0.11/0.33 s; throughput 19.7 TPS; supervision-reads result: 80 success, 0 failed; send rate 30.8 TPS; max/min/avg latency 0.09/0.00/0.04 s; throughput 30.7 TPS; admin-policy result: 40 success, 0 failed; send rate 5.3 TPS; max/min/avg latency 1.71/0.09/0.90 s; throughput 5.2 TPS, KYC onboarding scenario, Monetary operations scenario, benchmark/workloads/monetary-ops.js, benchmark/workloads/retail-onboarding.js (+2 more)

### Community 19 - "Issuance Flow"
Cohesion: 0.2
Nodes (10): HTTP 403 issuance error, AD02 Bank Indonesia lane, Validate sender role must be BI, AD02 Digital Rupiah Issuance, Issuance transaction audit event, POST /issuance-requests, Mint(): balance += amount, Reject non-PJP issuance target (+2 more)

### Community 20 - "Participant Approval"
Cohesion: 0.29
Nodes (8): Active participant status, POST /participants/{id}/approve, ApproveParticipant(), Automatic wallet wlt_<participantID>, AD01 Backend API lane, Pending participant status, Registration rejection notification, SubmitParticipant()

### Community 21 - "Functional Profile Results"
Cohesion: 0.29
Nodes (7): Functional Benchmark Profiles, Rationale: separate profiles cover onboarding, monetary operations, supervision reads, and administrative policy writes, Functional Profiles — kyc-onboarding: 56/0 succ/fail; send 4.4, thr 3.7 TPS; lat 0.13/0.88/2.29 s; zero failures | monetary-ops: 80/0 succ/fail; send 20.5, thr 19.9 TPS; lat 0.10/0.32/0.53 s; zero failures | supervision-reads: 80/0 succ/fail; send 30.8, thr 17.0 TPS; lat 0.01/1.10/3.24 s; zero failures | admin-policy: 40/0 succ/fail; send 5.3, thr 5.2 TPS; lat 0.09/0.91/1.72 s; zero failures; local workers: 2, Administrative Policy Workload, Monetary Operations Workload, Retail Onboarding Workload, Supervision Reads Workload

### Community 22 - "Double Spend Prevention"
Cohesion: 0.29
Nodes (7): Double-Spend Prevention, MVCC Version Conflicts, Rationale: concurrent shared-sender transfers force MVCC conflicts as evidence of double-spend prevention, Adversarial Double-Spend — double-spend-contention: 14/186 succ/fail; send 81.7, thr 44.4 TPS; lat 0.15/0.21/0.31 s; mixed success/failure; local workers: 4, Double-Spend Contention, Shared-Sender Transfer Contention, Adversarial Double-Spend Workload

### Community 23 - "API Documentation Tests"
Cohesion: 0.47
Nodes (5): openAPIDoc, openAPIOperation, assertSchemaRef(), checkIdempotency(), TestEmbeddedOpenAPISpecsMatchV3Contracts()

### Community 24 - "OpenAPI Specification"
Cohesion: 0.6
Nodes (3): jsonContent(), op(), response()

### Community 25 - "Benchmark Manifesting"
Cohesion: 0.4
Nodes (0): 

### Community 26 - "Negative Path Enforcement"
Cohesion: 0.4
Nodes (5): Policy-Rule Enforcement, Rationale: violating one policy rule tests rejection enforcement, Negative-Path Conformance — negative-path: 4/38 succ/fail; send 5.3, thr 5.2 TPS; lat 1.71/1.91/2.11 s; mixed success/failure; local workers: 2, Negative Path, Negative-Path Workload

### Community 27 - "Negative Path Results"
Cohesion: 0.4
Nodes (5): Digital Rupiah Negative-Path Conformance; negative-path result: 0 success, 7 failed; send rate 5.8 TPS; max/min/avg latency -/-/- s; throughput 5.8 TPS, Digital Rupiah Negative-Path Conformance benchmark (live v3 negfinal); negative-path result: 0 success, 7 failed; send rate 5.8 TPS; max/min/avg latency -/-/- s; throughput 5.8 TPS, Every submission violates one policy rule; a zero-gap run proves enforcement, Negative-path policy-rejection scenario, benchmark/workloads/negative-path.js

### Community 28 - "Boundary Conformance"
Cohesion: 0.4
Nodes (5): Digital Rupiah Boundary-Value Conformance benchmark; boundary-path result: 4 success, 4 failed; send rate 2.3 TPS; max/min/avg latency 0.43/0.20/0.34 s; throughput 2.2 TPS, Digital Rupiah Boundary-Value Conformance benchmark (live v3 fix); boundary-path result: 5 success, 3 failed; send rate 2.3 TPS; max/min/avg latency 2.13/0.63/1.52 s; throughput 1.6 TPS, Boundary-path cap-conformance scenario, benchmark/workloads/boundary-path.js, Probe each cap from both sides; an exact limit must commit and one unit past it must be rejected

### Community 29 - "KYC Verification Flow"
Cohesion: 0.5
Nodes (5): KYC approved status, KYC document and risk verification, POST /kyc/profiles/{id}/refresh, KYC rejected status, KYC result notification

### Community 30 - "Participant Unfreeze"
Cohesion: 0.4
Nodes (5): Participant active status after unfreeze, POST /participants/{id}/unfreeze, UnfreezeParticipant(), participant_unfrozen supervision event, Unfreeze related wallet

### Community 31 - "KYC Scope Tests"
Cohesion: 0.5
Nodes (0): 

### Community 32 - "Retail Transfer Workloads"
Cohesion: 0.5
Nodes (4): Direct Retail Digital Rupiah Transfers, Missing Tier Limits (filename cue), Retail CBDC — retail-warmup: 3/97 succ/fail; send 10.2, thr 10.2 TPS; lat 0.01/0.01/0.01 s; mixed success/failure | retail-sustained: 42/558 succ/fail; send 50.2, thr 50.1 TPS; lat 0.00/0.00/0.01 s; mixed success/failure | retail-peak: 33/567 succ/fail; send 150.6, thr 150.3 TPS; lat 0.00/0.00/0.01 s; mixed success/failure; local workers: 2, Retail Transfer Workload

### Community 33 - "Peak Confidence Intervals"
Cohesion: 0.5
Nodes (4): Throughput/Latency Confidence Interval Reporting, Rationale: five identical peak rounds support confidence-interval reporting, Retail Transfer Repetition (mean +/- CI) — retail-peak-rep-1: 40/0 succ/fail; send 63.2, thr 15.0 TPS; lat 0.06/0.61/2.20 s; zero failures | retail-peak-rep-2: 40/0 succ/fail; send 63.3, thr 14.9 TPS; lat 0.06/0.61/2.21 s; zero failures | retail-peak-rep-3: 40/0 succ/fail; send 62.8, thr 14.8 TPS; lat 0.02/0.66/2.19 s; zero failures | retail-peak-rep-4: 40/0 succ/fail; send 63.2, thr 15.1 TPS; lat 0.06/0.61/2.16 s; zero failures | retail-peak-rep-5: 40/0 succ/fail; send 63.2, thr 15.1 TPS; lat 0.04/0.61/2.15 s; zero failures; local workers: 2, Retail Peak Repetition

### Community 34 - "Overspend Contention"
Cohesion: 0.5
Nodes (4): benchmark/workloads/adversarial-double-spend.js, Digital Rupiah Aggregate Overspend Contention; aggregate-overspend-contention result: 4 success, 196 failed; send rate 81.7 TPS; max/min/avg latency 1.06/0.52/0.86 s; throughput 41.2 TPS, Concurrent transfers request more value than a shared sender owns; final non-negative balance and classified rejections test the conservation invariant, Aggregate overspend contention scenario

### Community 35 - "Authorization Log Validation"
Cohesion: 1.0
Nodes (2): oracleLines(), validateAuthorizationLog()

### Community 36 - "Functional Workload Tests"
Cohesion: 0.67
Nodes (0): 

### Community 37 - "Transfer Baseline"
Cohesion: 0.67
Nodes (3): Contention-Free Retail Transfer Baseline, Rationale: contention-free workload establishes a transfer baseline, Retail Transfer - 1 Worker — retail-warmup-w1: 40/0 succ/fail; send 10.3, thr 10.0 TPS; lat 0.10/0.57/1.04 s; zero failures | retail-sustained-w1: 40/0 succ/fail; send 30.8, thr 28.4 TPS; lat 0.11/0.28/0.45 s; zero failures | retail-peak-w1: 40/0 succ/fail; send 61.5, thr 46.8 TPS; lat 0.16/0.29/0.46 s; zero failures; local workers: 1

### Community 38 - "Client Money Precision"
Cohesion: 0.67
Nodes (3): JavaScript client, Other public clients, Monetary precision loss

### Community 39 - "Frontend Demo Panel"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Frontend Limits"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Frontend Overview"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Frontend Observability"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Negative Log Tests"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Negative Log Validation"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Boundary Log Validation"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Clean Ledger Benchmark"
Cohesion: 1.0
Nodes (2): Caliper Clean Ledger Run 1, Retail CBDC — retail-warmup: 97/3 succ/fail; send 10.2, thr 8.8 TPS; lat 0.01/0.66/2.11 s; mixed success/failure | retail-sustained: 502/98 succ/fail; send 50.2, thr 41.8 TPS; lat 0.01/0.63/2.40 s; mixed success/failure | retail-peak: 251/349 succ/fail; send 135.3, thr 77.1 TPS; lat 0.01/2.70/4.40 s; mixed success/failure; local workers: 2

### Community 47 - "Zero Failure Benchmark"
Cohesion: 1.0
Nodes (2): Retail CBDC — retail-warmup: 100/0 succ/fail; send 10.2, thr 9.0 TPS; lat 0.01/0.61/2.14 s; zero failures | retail-sustained: 600/0 succ/fail; send 50.1, thr 45.9 TPS; lat 0.01/1.18/2.12 s; zero failures | retail-peak: 600/0 succ/fail; send 148.8, thr 57.7 TPS; lat 0.01/4.20/6.74 s; zero failures; local workers: 2, Caliper Zero-Failure Run 1

### Community 48 - "Functional Profile Benchmarks"
Cohesion: 1.0
Nodes (2): Digital Rupiah functional benchmark profiles, Separate benchmark profiles for onboarding, monetary operations, supervision reads, and administrative policy writes

### Community 49 - "Documentation Embedding"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Vite Configuration"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Frontend Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Vite Environment Types"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "World State UI"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Supply UI"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Frontend Constants"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Authorization Test"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Boundary Test"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Retail Benchmark Tests"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Caliper Benchmarking"
Cohesion: 1.0
Nodes (1): Hyperledger Caliper

### Community 60 - "Fabric Platform"
Cohesion: 1.0
Nodes (1): Hyperledger Fabric

### Community 61 - "Digital Rupiah Domain"
Cohesion: 1.0
Nodes (1): Digital Rupiah

### Community 62 - "Fixed Rate Control"
Cohesion: 1.0
Nodes (1): Caliper Fixed-Rate Rate Control

### Community 63 - "Caliper Workers"
Cohesion: 1.0
Nodes (1): Local Caliper Workers

### Community 64 - "Docker Resource Monitoring"
Cohesion: 1.0
Nodes (1): Docker Resource Monitor

### Community 65 - "One Worker Transfer"
Cohesion: 1.0
Nodes (1): Retail Transfer - 1 Worker — retail-warmup-w1: 40/0 succ/fail; send 10.3, thr 7.8 TPS; lat 0.01/0.78/2.14 s; zero failures | retail-sustained-w1: 40/0 succ/fail; send 30.8, thr 12.7 TPS; lat 0.00/0.62/2.15 s; zero failures | retail-peak-w1: 40/0 succ/fail; send 57.6, thr 14.5 TPS; lat 0.07/0.66/2.32 s; zero failures; local workers: 1

### Community 66 - "Two Worker Transfer"
Cohesion: 1.0
Nodes (1): Retail Transfer - 2 Workers — retail-warmup-w2: 40/0 succ/fail; send 10.5, thr 7.8 TPS; lat 0.01/0.80/2.14 s; zero failures | retail-sustained-w2: 40/0 succ/fail; send 31.6, thr 12.3 TPS; lat 0.01/0.64/2.25 s; zero failures | retail-peak-w2: 40/0 succ/fail; send 61.0, thr 14.5 TPS; lat 0.03/0.69/2.27 s; zero failures; local workers: 2

### Community 67 - "Four Worker Transfer"
Cohesion: 1.0
Nodes (1): Retail Transfer - 4 Workers — retail-warmup-w4: 40/0 succ/fail; send 11.1, thr 8.0 TPS; lat 0.01/0.81/2.18 s; zero failures | retail-sustained-w4: 40/0 succ/fail; send 33.3, thr 12.9 TPS; lat 0.01/0.64/2.16 s; zero failures | retail-peak-w4: 40/0 succ/fail; send 65.9, thr 14.5 TPS; lat 0.01/0.70/2.30 s; zero failures; local workers: 4

### Community 68 - "Repeated One Worker"
Cohesion: 1.0
Nodes (1): Retail Transfer - 1 Worker — retail-warmup-w1: 40/0 succ/fail; send 10.3, thr 7.8 TPS; lat 0.00/0.79/2.16 s; zero failures | retail-sustained-w1: 40/0 succ/fail; send 30.8, thr 12.8 TPS; lat 0.00/0.62/2.13 s; zero failures | retail-peak-w1: 40/0 succ/fail; send 61.6, thr 14.9 TPS; lat 0.07/0.63/2.19 s; zero failures; local workers: 1

### Community 69 - "Repeated Two Worker"
Cohesion: 1.0
Nodes (1): Retail Transfer - 2 Workers — retail-warmup-w2: 40/0 succ/fail; send 10.5, thr 7.8 TPS; lat 0.01/0.76/2.14 s; zero failures | retail-sustained-w2: 40/0 succ/fail; send 31.6, thr 12.5 TPS; lat 0.01/0.62/2.21 s; zero failures | retail-peak-w2: 40/0 succ/fail; send 63.2, thr 15.1 TPS; lat 0.10/0.62/2.18 s; zero failures; local workers: 2

### Community 70 - "Repeated Four Worker"
Cohesion: 1.0
Nodes (1): Retail Transfer - 4 Workers — retail-warmup-w4: 40/0 succ/fail; send 11.1, thr 8.1 TPS; lat 0.01/0.78/2.15 s; zero failures | retail-sustained-w4: 40/0 succ/fail; send 33.3, thr 13.1 TPS; lat 0.01/0.60/2.13 s; zero failures | retail-peak-w4: 40/0 succ/fail; send 66.7, thr 14.7 TPS; lat 0.01/0.66/2.31 s; zero failures; local workers: 4

### Community 71 - "Repeated Functional Profiles"
Cohesion: 1.0
Nodes (1): Functional Profiles — kyc-onboarding: 56/0 succ/fail; send 4.4, thr 3.8 TPS; lat 0.10/0.85/2.19 s; zero failures | monetary-ops: 80/0 succ/fail; send 20.5, thr 19.9 TPS; lat 0.11/0.33/0.55 s; zero failures | supervision-reads: 80/0 succ/fail; send 30.8, thr 17.2 TPS; lat 0.01/1.09/3.18 s; zero failures | admin-policy: 40/0 succ/fail; send 5.3, thr 5.2 TPS; lat 0.09/0.91/1.72 s; zero failures; local workers: 2

### Community 72 - "Monitored One Worker"
Cohesion: 1.0
Nodes (1): Retail Transfer - 1 Worker — retail-warmup-w1: 40/0 succ/fail; send 10.3, thr 7.7 TPS; lat 0.01/0.81/2.19 s; zero failures | retail-sustained-w1: 40/0 succ/fail; send 30.8, thr 12.7 TPS; lat 0.01/0.64/2.15 s; zero failures | retail-peak-w1: 40/0 succ/fail; send 58.7, thr 14.7 TPS; lat 0.08/0.64/2.22 s; zero failures; local workers: 1; Docker resource monitor

### Community 73 - "Monitored Two Workers"
Cohesion: 1.0
Nodes (1): Retail Transfer - 2 Workers — retail-warmup-w2: 40/0 succ/fail; send 10.5, thr 7.8 TPS; lat 0.01/0.77/2.12 s; zero failures | retail-sustained-w2: 40/0 succ/fail; send 31.6, thr 12.5 TPS; lat 0.00/0.63/2.21 s; zero failures | retail-peak-w2: 40/0 succ/fail; send 62.9, thr 14.8 TPS; lat 0.03/0.66/2.27 s; zero failures; local workers: 2; Docker resource monitor

### Community 74 - "Monitored Four Workers"
Cohesion: 1.0
Nodes (1): Retail Transfer - 4 Workers — retail-warmup-w4: 40/0 succ/fail; send 11.1, thr 8.1 TPS; lat 0.01/0.82/2.13 s; zero failures | retail-sustained-w4: 40/0 succ/fail; send 31.9, thr 11.1 TPS; lat 0.07/0.99/2.63 s; zero failures | retail-peak-w4: 38/2 succ/fail; send 66.6, thr 14.3 TPS; lat 0.01/0.62/2.32 s; mixed success/failure; local workers: 4; Docker resource monitor

### Community 75 - "Monitored Functional Profiles"
Cohesion: 1.0
Nodes (1): Functional Profiles — kyc-onboarding: 56/0 succ/fail; send 4.4, thr 3.8 TPS; lat 0.08/0.88/2.26 s; zero failures | monetary-ops: 80/0 succ/fail; send 20.5, thr 19.9 TPS; lat 0.10/0.32/0.56 s; zero failures | supervision-reads: 80/0 succ/fail; send 30.7, thr 16.3 TPS; lat 0.01/1.17/3.43 s; zero failures | admin-policy: 40/0 succ/fail; send 5.3, thr 5.2 TPS; lat 0.11/0.92/1.72 s; zero failures; local workers: 2; Docker resource monitor

### Community 76 - "Monitored Peak Repetitions"
Cohesion: 1.0
Nodes (1): Retail Transfer Repetition (mean +/- CI) — retail-peak-rep-1: 40/0 succ/fail; send 63.4, thr 14.1 TPS; lat 0.02/0.72/2.44 s; zero failures | retail-peak-rep-2: 40/0 succ/fail; send 63.2, thr 14.8 TPS; lat 0.10/0.63/2.27 s; zero failures | retail-peak-rep-3: 40/0 succ/fail; send 62.6, thr 14.6 TPS; lat 0.01/0.67/2.27 s; zero failures | retail-peak-rep-4: 40/0 succ/fail; send 63.2, thr 14.5 TPS; lat 0.02/0.69/2.29 s; zero failures | retail-peak-rep-5: 40/0 succ/fail; send 63.2, thr 14.5 TPS; lat 0.02/0.68/2.29 s; zero failures; local workers: 2; Docker resource monitor

### Community 77 - "Monitored Negative Path"
Cohesion: 1.0
Nodes (1): Negative-Path Conformance — negative-path: 4/38 succ/fail; send 5.3, thr 5.2 TPS; lat 1.73/1.93/2.13 s; mixed success/failure; local workers: 2; Docker resource monitor

### Community 78 - "Monitored Double Spend"
Cohesion: 1.0
Nodes (1): Adversarial Double-Spend — double-spend-contention: 12/188 succ/fail; send 81.4, thr 44.4 TPS; lat 0.18/0.24/0.38 s; mixed success/failure; local workers: 4; Docker resource monitor

### Community 79 - "Fabric Ledger Platform"
Cohesion: 1.0
Nodes (1): Hyperledger Fabric DLT

### Community 80 - "Digital Rupiah Model"
Cohesion: 1.0
Nodes (1): Digital Rupiah

### Community 81 - "Interrupted Benchmark Runs"
Cohesion: 1.0
Nodes (1): benchmark_exit=143

### Community 82 - "Successful Benchmark Runs"
Cohesion: 1.0
Nodes (1): benchmark_exit=0

### Community 83 - "Blockchain Activity Lane"
Cohesion: 1.0
Nodes (1): AD01 Blockchain lane

### Community 84 - "Review Status"
Cohesion: 1.0
Nodes (1): Review complete

### Community 85 - "KYC Feature Scope"
Cohesion: 1.0
Nodes (1): KYC implementation-only scope

### Community 86 - "QRIS Feature Scope"
Cohesion: 1.0
Nodes (1): QRIS code-only scope

## Ambiguous Edges - Review These
- `Retail CBDC — retail-warmup: 3/97 succ/fail; send 10.2, thr 10.2 TPS; lat 0.01/0.01/0.01 s; mixed success/failure | retail-sustained: 42/558 succ/fail; send 50.2, thr 50.1 TPS; lat 0.00/0.00/0.01 s; mixed success/failure | retail-peak: 33/567 succ/fail; send 150.6, thr 150.3 TPS; lat 0.00/0.00/0.01 s; mixed success/failure; local workers: 2` → `Missing Tier Limits (filename cue)`  [AMBIGUOUS]
  benchmark/results/2026-06-30-invalid-missing-tier-limits.html · relation: references
- `Treasury-only issuance` → `Validate issuance participant type`  [AMBIGUOUS]
  docs/diagrams/mermaid/activity-diagrams.md · relation: conceptually_related_to

## Knowledge Gaps
- **395 isolated node(s):** `ParticipantStatus`, `TransactionType`, `TransactionStatus`, `Participant`, `Wallet` (+390 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Frontend Demo Panel`** (2 nodes): `phases()`, `DemoPanel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Limits`** (2 nodes): `Limits.tsx`, `fmt()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Overview`** (2 nodes): `Overview.tsx`, `fmt()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Observability`** (2 nodes): `Observability.tsx`, `fmt()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Negative Log Tests`** (2 nodes): `validate-negative-path-log.test.js`, `validLog()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Negative Log Validation`** (2 nodes): `validate-negative-path-log.js`, `validateNegativePathLog()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Boundary Log Validation`** (2 nodes): `validate-boundary-log.js`, `validateBoundaryLog()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Clean Ledger Benchmark`** (2 nodes): `Caliper Clean Ledger Run 1`, `Retail CBDC — retail-warmup: 97/3 succ/fail; send 10.2, thr 8.8 TPS; lat 0.01/0.66/2.11 s; mixed success/failure | retail-sustained: 502/98 succ/fail; send 50.2, thr 41.8 TPS; lat 0.01/0.63/2.40 s; mixed success/failure | retail-peak: 251/349 succ/fail; send 135.3, thr 77.1 TPS; lat 0.01/2.70/4.40 s; mixed success/failure; local workers: 2`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Zero Failure Benchmark`** (2 nodes): `Retail CBDC — retail-warmup: 100/0 succ/fail; send 10.2, thr 9.0 TPS; lat 0.01/0.61/2.14 s; zero failures | retail-sustained: 600/0 succ/fail; send 50.1, thr 45.9 TPS; lat 0.01/1.18/2.12 s; zero failures | retail-peak: 600/0 succ/fail; send 148.8, thr 57.7 TPS; lat 0.01/4.20/6.74 s; zero failures; local workers: 2`, `Caliper Zero-Failure Run 1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Functional Profile Benchmarks`** (2 nodes): `Digital Rupiah functional benchmark profiles`, `Separate benchmark profiles for onboarding, monetary operations, supervision reads, and administrative policy writes`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Documentation Embedding`** (1 nodes): `docsembed.go`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Configuration`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Entry Point`** (1 nodes): `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Environment Types`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `World State UI`** (1 nodes): `WorldState.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Supply UI`** (1 nodes): `Supply.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Constants`** (1 nodes): `constants.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Authorization Test`** (1 nodes): `validate-authorization-log.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Boundary Test`** (1 nodes): `validate-boundary-log.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Retail Benchmark Tests`** (1 nodes): `retail-base.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Caliper Benchmarking`** (1 nodes): `Hyperledger Caliper`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fabric Platform`** (1 nodes): `Hyperledger Fabric`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Digital Rupiah Domain`** (1 nodes): `Digital Rupiah`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fixed Rate Control`** (1 nodes): `Caliper Fixed-Rate Rate Control`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Caliper Workers`** (1 nodes): `Local Caliper Workers`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Docker Resource Monitoring`** (1 nodes): `Docker Resource Monitor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `One Worker Transfer`** (1 nodes): `Retail Transfer - 1 Worker — retail-warmup-w1: 40/0 succ/fail; send 10.3, thr 7.8 TPS; lat 0.01/0.78/2.14 s; zero failures | retail-sustained-w1: 40/0 succ/fail; send 30.8, thr 12.7 TPS; lat 0.00/0.62/2.15 s; zero failures | retail-peak-w1: 40/0 succ/fail; send 57.6, thr 14.5 TPS; lat 0.07/0.66/2.32 s; zero failures; local workers: 1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Two Worker Transfer`** (1 nodes): `Retail Transfer - 2 Workers — retail-warmup-w2: 40/0 succ/fail; send 10.5, thr 7.8 TPS; lat 0.01/0.80/2.14 s; zero failures | retail-sustained-w2: 40/0 succ/fail; send 31.6, thr 12.3 TPS; lat 0.01/0.64/2.25 s; zero failures | retail-peak-w2: 40/0 succ/fail; send 61.0, thr 14.5 TPS; lat 0.03/0.69/2.27 s; zero failures; local workers: 2`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Four Worker Transfer`** (1 nodes): `Retail Transfer - 4 Workers — retail-warmup-w4: 40/0 succ/fail; send 11.1, thr 8.0 TPS; lat 0.01/0.81/2.18 s; zero failures | retail-sustained-w4: 40/0 succ/fail; send 33.3, thr 12.9 TPS; lat 0.01/0.64/2.16 s; zero failures | retail-peak-w4: 40/0 succ/fail; send 65.9, thr 14.5 TPS; lat 0.01/0.70/2.30 s; zero failures; local workers: 4`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Repeated One Worker`** (1 nodes): `Retail Transfer - 1 Worker — retail-warmup-w1: 40/0 succ/fail; send 10.3, thr 7.8 TPS; lat 0.00/0.79/2.16 s; zero failures | retail-sustained-w1: 40/0 succ/fail; send 30.8, thr 12.8 TPS; lat 0.00/0.62/2.13 s; zero failures | retail-peak-w1: 40/0 succ/fail; send 61.6, thr 14.9 TPS; lat 0.07/0.63/2.19 s; zero failures; local workers: 1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Repeated Two Worker`** (1 nodes): `Retail Transfer - 2 Workers — retail-warmup-w2: 40/0 succ/fail; send 10.5, thr 7.8 TPS; lat 0.01/0.76/2.14 s; zero failures | retail-sustained-w2: 40/0 succ/fail; send 31.6, thr 12.5 TPS; lat 0.01/0.62/2.21 s; zero failures | retail-peak-w2: 40/0 succ/fail; send 63.2, thr 15.1 TPS; lat 0.10/0.62/2.18 s; zero failures; local workers: 2`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Repeated Four Worker`** (1 nodes): `Retail Transfer - 4 Workers — retail-warmup-w4: 40/0 succ/fail; send 11.1, thr 8.1 TPS; lat 0.01/0.78/2.15 s; zero failures | retail-sustained-w4: 40/0 succ/fail; send 33.3, thr 13.1 TPS; lat 0.01/0.60/2.13 s; zero failures | retail-peak-w4: 40/0 succ/fail; send 66.7, thr 14.7 TPS; lat 0.01/0.66/2.31 s; zero failures; local workers: 4`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Repeated Functional Profiles`** (1 nodes): `Functional Profiles — kyc-onboarding: 56/0 succ/fail; send 4.4, thr 3.8 TPS; lat 0.10/0.85/2.19 s; zero failures | monetary-ops: 80/0 succ/fail; send 20.5, thr 19.9 TPS; lat 0.11/0.33/0.55 s; zero failures | supervision-reads: 80/0 succ/fail; send 30.8, thr 17.2 TPS; lat 0.01/1.09/3.18 s; zero failures | admin-policy: 40/0 succ/fail; send 5.3, thr 5.2 TPS; lat 0.09/0.91/1.72 s; zero failures; local workers: 2`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Monitored One Worker`** (1 nodes): `Retail Transfer - 1 Worker — retail-warmup-w1: 40/0 succ/fail; send 10.3, thr 7.7 TPS; lat 0.01/0.81/2.19 s; zero failures | retail-sustained-w1: 40/0 succ/fail; send 30.8, thr 12.7 TPS; lat 0.01/0.64/2.15 s; zero failures | retail-peak-w1: 40/0 succ/fail; send 58.7, thr 14.7 TPS; lat 0.08/0.64/2.22 s; zero failures; local workers: 1; Docker resource monitor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Monitored Two Workers`** (1 nodes): `Retail Transfer - 2 Workers — retail-warmup-w2: 40/0 succ/fail; send 10.5, thr 7.8 TPS; lat 0.01/0.77/2.12 s; zero failures | retail-sustained-w2: 40/0 succ/fail; send 31.6, thr 12.5 TPS; lat 0.00/0.63/2.21 s; zero failures | retail-peak-w2: 40/0 succ/fail; send 62.9, thr 14.8 TPS; lat 0.03/0.66/2.27 s; zero failures; local workers: 2; Docker resource monitor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Monitored Four Workers`** (1 nodes): `Retail Transfer - 4 Workers — retail-warmup-w4: 40/0 succ/fail; send 11.1, thr 8.1 TPS; lat 0.01/0.82/2.13 s; zero failures | retail-sustained-w4: 40/0 succ/fail; send 31.9, thr 11.1 TPS; lat 0.07/0.99/2.63 s; zero failures | retail-peak-w4: 38/2 succ/fail; send 66.6, thr 14.3 TPS; lat 0.01/0.62/2.32 s; mixed success/failure; local workers: 4; Docker resource monitor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Monitored Functional Profiles`** (1 nodes): `Functional Profiles — kyc-onboarding: 56/0 succ/fail; send 4.4, thr 3.8 TPS; lat 0.08/0.88/2.26 s; zero failures | monetary-ops: 80/0 succ/fail; send 20.5, thr 19.9 TPS; lat 0.10/0.32/0.56 s; zero failures | supervision-reads: 80/0 succ/fail; send 30.7, thr 16.3 TPS; lat 0.01/1.17/3.43 s; zero failures | admin-policy: 40/0 succ/fail; send 5.3, thr 5.2 TPS; lat 0.11/0.92/1.72 s; zero failures; local workers: 2; Docker resource monitor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Monitored Peak Repetitions`** (1 nodes): `Retail Transfer Repetition (mean +/- CI) — retail-peak-rep-1: 40/0 succ/fail; send 63.4, thr 14.1 TPS; lat 0.02/0.72/2.44 s; zero failures | retail-peak-rep-2: 40/0 succ/fail; send 63.2, thr 14.8 TPS; lat 0.10/0.63/2.27 s; zero failures | retail-peak-rep-3: 40/0 succ/fail; send 62.6, thr 14.6 TPS; lat 0.01/0.67/2.27 s; zero failures | retail-peak-rep-4: 40/0 succ/fail; send 63.2, thr 14.5 TPS; lat 0.02/0.69/2.29 s; zero failures | retail-peak-rep-5: 40/0 succ/fail; send 63.2, thr 14.5 TPS; lat 0.02/0.68/2.29 s; zero failures; local workers: 2; Docker resource monitor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Monitored Negative Path`** (1 nodes): `Negative-Path Conformance — negative-path: 4/38 succ/fail; send 5.3, thr 5.2 TPS; lat 1.73/1.93/2.13 s; mixed success/failure; local workers: 2; Docker resource monitor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Monitored Double Spend`** (1 nodes): `Adversarial Double-Spend — double-spend-contention: 12/188 succ/fail; send 81.4, thr 44.4 TPS; lat 0.18/0.24/0.38 s; mixed success/failure; local workers: 4; Docker resource monitor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fabric Ledger Platform`** (1 nodes): `Hyperledger Fabric DLT`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Digital Rupiah Model`** (1 nodes): `Digital Rupiah`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Interrupted Benchmark Runs`** (1 nodes): `benchmark_exit=143`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Successful Benchmark Runs`** (1 nodes): `benchmark_exit=0`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Blockchain Activity Lane`** (1 nodes): `AD01 Blockchain lane`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Review Status`** (1 nodes): `Review complete`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `KYC Feature Scope`** (1 nodes): `KYC implementation-only scope`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `QRIS Feature Scope`** (1 nodes): `QRIS code-only scope`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Retail CBDC — retail-warmup: 3/97 succ/fail; send 10.2, thr 10.2 TPS; lat 0.01/0.01/0.01 s; mixed success/failure | retail-sustained: 42/558 succ/fail; send 50.2, thr 50.1 TPS; lat 0.00/0.00/0.01 s; mixed success/failure | retail-peak: 33/567 succ/fail; send 150.6, thr 150.3 TPS; lat 0.00/0.00/0.01 s; mixed success/failure; local workers: 2` and `Missing Tier Limits (filename cue)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Treasury-only issuance` and `Validate issuance participant type`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `New()` connect `QRIS and Payment Flows` to `Policy and Ledger Tests`, `Ledger Core`, `Authentication Middleware`, `Chaincode Operations`, `Backend Auth Services`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `LedgerService` connect `Ledger Core` to `Policy and Ledger Tests`, `Chaincode Operations`, `Backend Auth Services`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `Comprehensive bi-coin-fabric Review` connect `Trust and Endorsement` to `Activity Diagram Flows`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 65 inferred relationships involving `New()` (e.g. with `newMockTransactionContextWithMSP()` and `setMockTransaction()`) actually correct?**
  _`New()` has 65 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ParticipantStatus`, `TransactionType`, `TransactionStatus` to the rest of the system?**
  _395 weakly-connected nodes found - possible documentation gaps or missing edges._