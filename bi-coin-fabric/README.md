# bi-coin-retail-cbdc

Retail Central Bank Digital Currency (CBDC) prototype on Hyperledger Fabric.
Digital Rupiah with PostgreSQL-backed off-chain KYC, JWT-authenticated role access,
KYC-tiered wallets, on-chain limits, and audit trail.

**Thesis scope:** KYC is implementation-only, and QRIS is code-only; both are
excluded from thesis acceptance criteria. Thesis acceptance criteria cover participant lifecycle,
treasury issuance, two-tier distribution, retail transfer, participant freeze,
and supervision.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Frontend   │────▶│  Backend API  │────▶│  Fabric Network  │
│  React/TS   │     │  Go REST API  │     │  (chaincode)     │
└─────────────┘     └──────┬───────┘     └──────────────────┘
                           │
                   ▼
            PostgreSQL KYC/Auth
```

Monetary flow: `Bank Indonesia Treasury -> Validator Bank/PJP Custodian reserve -> Retail Customer/Merchant wallet`.
Issuance credits only `bi_treasury`; Custodian funding uses the ordinary transfer policy.

## Components

| Component | Tech | Description |
|-----------|------|-------------|
| `chaincode/` | Go | Hyperledger Fabric smart contract for Digital Rupiah |
| `backend/` | Go | REST API gateway with Fabric Go SDK, JWT auth, and off-chain KYC store |
| `frontend/` | React + TypeScript | Admin dashboard (wallet, transfer, limits, audit) |
| `scripts/` | Bash | Network setup, chaincode deployment, smoke tests |

## Wallet Tiers

| Tier | Max Balance | Per-Tx Limit | Daily Out | Monthly Out | Monthly In |
|------|------------|-------------|-----------|-------------|------------|
| BASIC | Rp 2,000,000 | Rp 250,000 | Rp 500,000 | Rp 5,000,000 | Rp 20,000,000 |
| STANDARD | Rp 20,000,000 | Rp 2,500,000 | Rp 10,000,000 | Rp 40,000,000 | Rp 40,000,000 |
| MERCHANT | Rp 200,000,000 | Rp 10,000,000 | Rp 50,000,000 | Rp 500,000,000 | Rp 500,000,000 |

## Quick Start

### Prerequisites
- Hyperledger Fabric samples (test-network)
- Go 1.22+
- Node.js 18+
- Docker & Docker Compose

### 1. Start everything
```bash
./start.sh
```

`start.sh` starts the Garuda Fabric network, deploys and initializes chaincode,
starts PostgreSQL, then runs the backend gateway and frontend.

Default PoC users are defined in `.env.example`, for example `bi` / `bi-password`.

### 6. Smoke Test
```bash
./scripts/smoke-test.sh
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/auth/login` | Login and receive Bearer token |
| GET | `/auth/me` | Current authenticated user |
| POST | `/kyc/profiles` | Store raw KYC off-chain and anchor sanitized status on Fabric |
| POST | `/kyc/profiles/:profile_id/refresh` | Store provider result off-chain and update Fabric KYC anchor |
| POST | `/wallets` | Create wallet from `{ "owner_id": ... }` |
| POST | `/transfers` | Transfer with KYC and tier-limit enforcement; requires `Idempotency-Key` |
| POST | `/qris/pay` | Settle QRIS payment; requires `Idempotency-Key` |
| POST | `/issuance-requests` | BI-only issuance into Treasury |
| POST | `/distribute` | BI-only Treasury distribution to a Validator Bank or PJP Custodian; requires `Idempotency-Key` |

## Chaincode Functions

| Function | Args | Authority |
|----------|------|-----------|
| `InitLedger` | — | Admin |
| `CreateWholesaleWallet` | walletID, participantID, walletType | Institution |
| `GetWallet` | walletID | Query |
| `ListWalletsByParticipant` | participantID | Query |
| `Transfer` | senderID, receiverID, amount, referenceID | Sender custodian |
| `PayQris` | payload, payerWalletID, amount, referenceID | Payer custodian |
| `RequestIssuance` | amount | Bank Indonesia |
| `DistributeToParticipant` | receiverParticipantID, amount, referenceID | Bank Indonesia |
| `RequestIssuanceRtgs` | senderBIC, amount, reference | Bank Indonesia |
| `SetSystemLimit` | scope, value | Bank Indonesia |
| `ListSystemLimits` | — | Query |
| `GetTotalSupply` | — | Query |
| `GetTransactions` | — | Oversight query |
| `GetSupervisionEvents` | — | Oversight query |

## Environment Variables

See `.env.example` for Fabric gateway, PostgreSQL, JWT, and KYC hash configuration.
