# Chaincode guide

This directory is a standalone Go module that packages the Digital Rupiah Fabric contract. The contract owns shared ledger state and independently enforces caller MSP, participant status, wallet custody, balance, and transaction rules. Backend role checks are an additional boundary, not a replacement for chaincode checks.

## Integration contract

- controls/controls.go, monetary/monetary.go, and payments/payments.go define the three Fabric contracts and their exported transaction names.
- backend/services/study_ledger.go submits or evaluates those names and supplies their arguments.
- benchmark/workloads/ invokes the same contract through Caliper identities and scenario setup.
- network/configtx.yaml and network/ configuration define channel membership and endorsement policy. Keep network policy and chaincode authorization aligned.
- CONTEXT.md defines participant, Custodian, Wallet Owner, Issuance, Conversion, Redemption, and supervision.

Changing a transaction name, parameter order, return shape, state key, or authorization rule can affect the backend, workloads, seeded ledger, and thesis evidence. Search those callers and update the relevant tests before considering the change complete.

## Transaction groups

| Domain | Main transactions and behavior |
|---|---|
| Subject and staff | FreezeSubject, RequestUnfreeze, ApproveUnfreeze, SetBusinessAuthority (controls, DistributorMSP staff roles); CreateStaffPending, ProtectStaff, SetStaffRole (controls, CentralBankMSP) |
| Wallet and transfer | OpenWallet, Transfer (payments, EndUserMSP); GetBalance and GetReceipt are reads |
| Monetary flow | Issue, RedeemReserve, TransferReserve, ApproveTransfer, RejectTransfer, DebitReserveForConversion (monetary); ConvertToRetail and FundWallet (payments) |
| Wholesale participation | RegisterDistributor with admission evidence, SetParticipantStatus, SetTransferLimit (monetary, CentralBankMSP); ProposeApprovalThreshold and ApproveApprovalThreshold (monetary, two officers of the same bank). See ADR 0014 |
| Limits and policy | SetLimits and GetLimits (controls); ProtectSubject and ProtectStaff (endorsement policies) |
| KYC anchor | CreatePending, RecordReview, ApproveStandard, DecideHighRisk, and GetSubject (controls); raw KYC material belongs in the off-chain store |
| Oversight | Read-only queries: GetSubject, GetLimits, CanPay, and CanActFor (controls); GetReserve, GetParticipant, CanSend, GetTransferLimit, GetWholesaleSupply, GetRetailSupply, and GetTotalSupply (monetary); GetBalance, GetReceipt, and GetRetailFloat (payments) |

Current monetary flow: Issue (CentralBankMSP) credits a Distributor reserve and wholesale supply. TransferReserve (DistributorMSP) moves w-Rupiah Digital between reserves without changing supply; above the sender's approval threshold it stays pending until another officer of the same bank calls ApproveTransfer. A participant's status decides which of these operations it may make (ADR 0014). ConvertToRetail (DistributorMSP) moves a bank's reserve into its Retail float, and FundWallet (DistributorMSP) moves that float into the customer wallet, each in one transaction. Transfer (EndUserMSP) moves value between wallets. Verify in source before changing descriptions or workflows.

Retail low-balance automatic redemption and its policy API are retired; use BI-authorized explicit redemption (RedeemReserve).

## Authorization and state

- requireMSP, requireTopLevel, requireStaffRole, and requireProtected check the Fabric transaction context.
- Custodian and participant checks protect wallet creation and monetary operations. The ledger remains authoritative for wallet custody and balances.
- Use checked integer arithmetic and existing limit helpers for monetary state changes.
- Keep raw identity/KYC documents in the private application store; chaincode stores only the approved anchor and shared status required for ledger decisions.
- Operation receipts (monetary and payments) and subject and staff records (controls) are ledger evidence. Preserve their transaction ordering and arguments when changing a mutation.

## Thesis traceability

The complete requirement matrix is in the root [AGENTS.md](../AGENTS.md). Chaincode contributions:

| Thesis item | Contract responsibility | Evidence |
|---|---|---|
| FR-01 | Participant lifecycle and allowed state transitions | controls/controls_test.go; thesis Chapter 4 functional results |
| FR-02 | Issuance into Distributor reserves and Conversion into Retail floats | monetary/monetary_test.go; thesis Chapter 4 issuance/conversion result; ADR 0001 and ADR 0003 |
| FR-03 | Transfer authorization, frozen-wallet, amount, balance, and state-update rules | payments/payments_test.go; thesis Chapter 4 transfer result |
| FR-04 | Read-only oversight queries over subject, limit, supply, and reserve state | controls/controls_test.go; thesis Chapter 4 oversight result |
| NFR-01 | MSP policy in code must agree with channel endorsement configuration | ../network/configtx.yaml, and ../scripts/deploy-chaincodes.test.js; thesis Chapter 3 architecture |
| NFR-02 | Ledger receipts and transaction traceability | payments/payments_test.go; thesis Chapter 4 functional evidence |
| NFR-03 | Contract remains the ledger boundary behind the backend gateway | Root architecture and ../backend/services/study_ledger.go; thesis Chapter 3 architecture |

Use go test ./... inside each chaincode module (controls, monetary, payments) for chaincode checks. The contract test files are controls/controls_test.go, monetary/monetary_test.go, and payments/payments_test.go.

Terminology lives in [CONTEXT.md](../CONTEXT.md). Architectural decisions live in [docs/adr/](../docs/adr/).
