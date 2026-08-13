# bi-coin-retail-cbdc

Retail Central Bank Digital Currency (CBDC) prototype on Hyperledger Fabric.
Digital Rupiah with PostgreSQL-backed off-chain KYC, JWT-authenticated role access,
KYC-tiered wallets, on-chain limits, and audit trail.

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

### 1. Start Fabric Network
```bash
./scripts/network-up.sh
```

### 2. Deploy Chaincode
```bash
./scripts/deploy-chaincode.sh
```

### 3. Start PostgreSQL

```bash
docker compose -f docker-compose.postgres.yaml up -d
```

### 4. Start Backend
```bash
cd backend
cp ../.env.example .env
go run .
```

### 5. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

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
| POST | `/distribute` | BI-only wholesale distribution; requires `Idempotency-Key` |

## Chaincode Functions

| Function | Args | Authority |
|----------|------|-----------|
| `InitLedger` | — | Admin |
| `CreateWholesaleWallet` | walletID, participantID, walletType | Institution |
| `GetWallet` | walletID | Query |
| `ListWalletsByParticipant` | participantID | Query |
| `Transfer` | senderID, receiverID, amount, referenceID | Sender custodian |
| `PayQris` | payload, payerWalletID, amount, referenceID | Payer custodian |
| `DistributeToParticipant` | senderParticipantID, receiverParticipantID, amount, referenceID | Bank Indonesia |
| `RequestIssuanceRtgs` | senderBIC, amount, reference | Bank Indonesia |
| `SetSystemLimit` | scope, value | Bank Indonesia |
| `ListSystemLimits` | — | Query |
| `GetTotalSupply` | — | Query |
| `GetTransactions` | — | Oversight query |
| `GetSupervisionEvents` | — | Oversight query |

## Environment Variables

See `.env.example` for Fabric gateway, PostgreSQL, JWT, and KYC hash configuration.
