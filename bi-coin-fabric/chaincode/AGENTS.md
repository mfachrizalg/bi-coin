# Chaincode guide

This directory is a standalone Go module that packages the Digital Rupiah Fabric contract. The contract owns shared ledger state and independently enforces caller MSP, participant status, wallet custody, balance, and transaction rules. Backend role checks are an additional boundary, not a replacement for chaincode checks.

## Integration contract

- digital_rupiah.go defines the Fabric contract and exported transaction names.
- backend/services/ledger.go submits or evaluates those names and supplies their arguments.
- benchmark/workloads/ invokes the same contract through Caliper identities and scenario setup.
- network/configtx.yaml and network/ configuration define channel membership and endorsement policy. Keep network policy and chaincode authorization aligned.
- CONTEXT.md defines participant, Custodian, Wallet Owner, issuance, distribution, redemption, and supervision.

Changing a transaction name, parameter order, return shape, state key, or authorization rule can affect the backend, workloads, seeded ledger, and thesis evidence. Search those callers and update the relevant tests before considering the change complete.

## Transaction groups

| Domain | Main transactions and behavior |
|---|---|
| Participant lifecycle | SubmitParticipant, ApproveParticipant, FreezeParticipant, UnfreezeParticipant, RejectParticipant, OffboardParticipant |
| Wallet and money | CreateWallet, CreateWholesaleWallet, Mint, Burn, Transfer, FreezeWallet, UnfreezeWallet |
| Treasury flow | RequestIssuance(amount, reference), RequestIssuanceRtgs, RequestRedemption(participant, amount, reference), DistributeToParticipant |
| Limits and policy | SetTierLimit, SetSystemLimit and corresponding reads |
| KYC anchor | SubmitKycProfile, RefreshKycProfile, and profile reads; raw KYC material belongs in the off-chain store |
| Oversight | Participant and wallet reads, GetTransactions, GetTransactionHistory, GetAuditLog, GetSupervisionEvents, GetReconciliationReport, GetMetrics, and GetTopology |

Current monetary flow: Mint credits only bi_treasury; distribution transfers from Treasury to an active institutional Custodian; Transfer supports later wallet-to-wallet movement. RequestIssuanceRtgs currently increases Treasury and records a receipt; it does not itself credit the participant wallet. Verify this behavior in source before changing descriptions or workflows.

QRIS is disabled: PayQris is not exported by the active Fabric contract. Its historical state and supporting code remain untouched; receipt validation and single-use dynamic-intent settlement are prerequisites for restoration. Retail low-balance automatic redemption and its policy API are retired; use BI-authorized explicit redemption.

## Authorization and state

- requireBankIndonesia, requireInstitution, and the MSP helpers derive authority from the Fabric transaction context.
- Custodian and participant checks protect wallet creation and monetary operations. The ledger remains authoritative for wallet custody and balances.
- Use checked integer arithmetic and existing limit helpers for monetary state changes.
- Keep raw identity/KYC documents in the private application store; chaincode stores only the approved anchor and shared status required for ledger decisions.
- Audit entries, transaction records, idempotency receipts, and supervision events are ledger evidence. Preserve their transaction ordering and arguments when changing a mutation.

## Thesis traceability

The complete requirement matrix is in the root [AGENTS.md](../AGENTS.md). Chaincode contributions:

| Thesis item | Contract responsibility | Evidence |
|---|---|---|
| FR-01 | Participant lifecycle and allowed state transitions | digital_rupiah_test.go, digital_rupiah_v3_test.go, authorization_test.go; thesis Chapter 4 functional results |
| FR-02 | Treasury-only issuance and Treasury-to-Custodian distribution | digital_rupiah_v3_test.go; thesis Chapter 4 issuance/distribution result; ADR 0001 and ADR 0003 |
| FR-03 | Transfer authorization, frozen-wallet, amount, balance, and state-update rules | digital_rupiah_test.go, authorization_test.go, digital_rupiah_v3_test.go; thesis Chapter 4 transfer result |
| FR-04 | Transaction history, audit, reports, metrics, and supervision events | digital_rupiah_v3_test.go; thesis Chapter 4 oversight result |
| NFR-01 | MSP policy in code must agree with channel endorsement configuration | ../network/configtx.yaml, ../network/crypto-config.yaml, and ../scripts/deploy-chaincode.test.js; thesis Chapter 3 architecture |
| NFR-02 | Ledger audit and transaction traceability | digital_rupiah_v3_test.go, offchain_kyc_test.go; thesis Chapter 4 functional evidence |
| NFR-03 | Contract remains the ledger boundary behind the backend gateway | Root architecture and ../backend/services/ledger.go; thesis Chapter 3 architecture |

Use go test ./... from this directory for chaincode checks. The files digital_rupiah_test.go, digital_rupiah_v3_test.go, authorization_test.go, offchain_kyc_test.go, and compliance_policy_test.go cover the main contract boundaries.

Terminology lives in [CONTEXT.md](../CONTEXT.md). Architectural decisions live in [docs/adr/](../docs/adr/).
