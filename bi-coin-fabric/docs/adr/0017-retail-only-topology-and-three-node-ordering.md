# Retail-only topology and three-node ordering

## Status

Accepted (2026-11-09). Supersedes ADR 0014. Amends ADR 0010.

## Context

The thesis argues that CDD decisions must be enforced on the ledger and checked by other participants. The prototype also carried wholesale and interbank features: transfer approval, four-eyes thresholds, participant status, and transfer limits. The thesis does not evaluate them, and no implementing rule for Rupiah Digital distribution was found as of October 2026 (ADR 0014).

The ordering service was one etcdraft node. That node cannot tolerate a crash, so the crash-tolerance claim in Bab III was false.

## Decision

1. The topology is retail-only. DistributorMSP holds one Distributor, CentralBankMSP holds Bank Indonesia, ValidatorMSP holds the Auditor, and EndUserMSP holds end users. Each org runs one peer.
2. **Distributor** is the canonical term. It means a PJSP, bank or non-bank, that Bank Indonesia admits, that holds a Distributor reserve, that converts reserve to Retail float, and that acts as Custodian of Wallets. The prototype runs one non-bank Distributor in DistributorMSP. Identifiers stay unchanged (`DistributorMSP`, `distributor_id`). "Distributor Bank", "Retail Bank", and "Wholesale Bank" are dropped.
3. The flow stays as in ADR 0010: `Issue` into the Distributor reserve, then `ConvertToRetail`, `FundWallet`, and `Transfer`. `RedeemReserve` stays.
4. Removed, in full:
   - `TransferReserve`, `ApproveTransfer`, `RejectTransfer`, `ProposeApprovalThreshold`, `ApproveApprovalThreshold`, `SetTransferLimit`, and `GetTransferLimit`;
   - the state keys `transfer::`, `threshold::pending::`, and `policy::transfer-limit`, and Distributor User4 and User5;
   - `SetParticipantStatus`, `CanSend`, the status gates, the closing rule, and `admissionRef` (ADR 0014 W1–W3).
5. The ledger runs three etcdraft consenters, all in CentralBankMSP, on one host. One consenter crash is tolerated. BFT is out of scope, because Fabric 2.5.16 has no SmartBFT.
6. Controls and payments endorse with `AND('DistributorMSP.peer','CentralBankMSP.peer')`. Monetary keeps its policy. The EndUser peer endorses nothing.

## Consequences

- The three orderers share one host and one organization. They tolerate one process crash. A host failure or an organization failure is not tolerated, and failover is not tested.
- An existing ledger created with one consenter cannot be extended in place. The network must be recreated from a fresh genesis block, which resets the ledger volumes.
- Chaincode definitions are redeployed at sequence 2 (`scripts/deploy-chaincodes.sh`).
- Smoke-test and benchmark fixtures that call removed functions stay broken until Plan 2.
- The non-bank Distributor holds a w-Rupiah reserve. The thesis declares this as a simplification in its Batasan. No Garuda source supports non-bank distribution, so "Distributor non-bank" is a design assumption.
