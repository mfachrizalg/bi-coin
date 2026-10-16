# Hyperledger Fabric Endorsement Approach for Two-Tier Retail CBDC

## Overview

In Hyperledger Fabric, endorsement policies determine which organizations must approve a transaction before it can be committed.

Types of endorsement:

- OR endorsement: any one authorized organization can approve.
- AND endorsement: all specified organizations must approve.
- Threshold endorsement: a defined number of organizations from a group must approve.

For a two-tier retail CBDC, endorsement should depend on transaction risk and governance requirements.

## Two-Tier CBDC Architecture

### Tier 1: Central Bank

Responsibilities:
- CBDC issuance and destruction
- Monetary supply management
- Governance
- Oversight

### Tier 2: Intermediaries

Participants:
- Commercial banks
- Payment service providers

Responsibilities:
- Wallet services
- Customer onboarding
- KYC/AML
- Retail payment processing

# Endorsement Approach by Transaction

| Transaction | Recommended Policy | Reason |
|---|---|---|
| CBDC issuance | AND / threshold | Prevent unauthorized money creation |
| CBDC distribution to banks | AND | Confirm institutional transfer |
| Wallet creation | OR | High-volume customer service |
| Wallet funding | OR | Fast retail processing |
| P2P payment | Threshold (2-of-3) | Balance security and performance |
| Merchant payment | OR / threshold | Low latency requirement |
| Refund | AND | Requires agreement from parties |
| Interbank settlement | AND / threshold | Protect wholesale settlement |
| CBDC redemption | AND | Controls CBDC destruction |
| Wallet freeze/unfreeze | AND | Prevent unilateral action |
| Dispute resolution | Multi-party threshold | Governance protection |

# Example Fabric Policies

## CBDC Issuance

```
AND(
 CentralBank.peer,
 Regulator.peer
)
```

Purpose:
- Changes monetary supply.
- Requires multiple approvals.

## Retail Payment

```
OutOf(2,
 CommercialBankA.peer,
 CommercialBankB.peer,
 PSP.peer
)
```

Purpose:
- Maintains security while supporting scalability.

## Wholesale Settlement

```
AND(
 CentralBank.peer,
 BankA.peer,
 BankB.peer
)
```

Alternative:

```
OutOf(2,
 CentralBank.peer,
 BankA.peer,
 BankB.peer
)
```

Purpose:
- Protects institutional balances.

# Design Principle

The simplified statement:

"Retail CBDC uses OR and wholesale CBDC uses AND"

is not always correct.

The better approach:

- High-volume operational transactions use OR or threshold endorsement.
- Monetary supply and governance transactions use AND or stronger threshold endorsement.
- Wholesale settlement uses stronger multi-party approval.

# References

1. BIS (2024). A proposal for a retail central bank digital currency (CBDC) architecture.

2. BIS CPMI (2023). Central bank digital currencies: System design and interoperability considerations.

3. Thakkar, A., Nathan, S., & Vishwanathan, B. (2018). Performance Benchmarking and Optimizing Hyperledger Fabric Blockchain Platform.

4. Androulaki et al. (2023). Fabric-X: Scaling Hyperledger Fabric for Asset Exchange.

5. Christodorescu et al. (2020). Towards a Two-Tier Hierarchical Infrastructure: An Offline Payment System for Central Bank Digital Currencies.
