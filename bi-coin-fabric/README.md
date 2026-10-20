# bi-coin-retail-cbdc

Retail Central Bank Digital Currency (CBDC) prototype on Hyperledger Fabric.
Digital Rupiah with PostgreSQL-backed off-chain KYC, JWT-authenticated role access,
KYC-screened subjects, on-chain limits, and audit trail.

**Thesis scope:** KYC is implementation-only and excluded from thesis acceptance criteria. Thesis acceptance criteria cover participant lifecycle,
issuance to Distributor banks, Conversion and Wallet funding, retail transfer, participant freeze,
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

Monetary flow: `Bank Indonesia -> Distributor reserve (w-Rupiah Digital) -> Conversion -> Retail float (r-Rupiah Digital) -> Wallet funding -> Retail Customer/Merchant wallet`.
Issuance credits a Distributor reserve and wholesale supply in one transaction. Wallet funding moves r-Rupiah Digital from a Retail float into a wallet.

## Components

| Component | Tech | Description |
|-----------|------|-------------|
| `chaincode/` | Go | Hyperledger Fabric smart contract for Digital Rupiah |
| `backend/` | Go | REST API gateway with Fabric Go SDK, JWT auth, and off-chain KYC store |
| `frontend/` | React + TypeScript | Guided thesis demonstration console (`src/pages/StudyConsole.tsx`) for role-selected flows |
| `scripts/` | Bash | Network setup, chaincode deployment, smoke tests |

## Quick Start

### Prerequisites
- Hyperledger Fabric samples binaries (`FABRIC_SAMPLES`, default `~/fabric-samples`)
- Go 1.22+
- Node.js 18+
- Docker & Docker Compose

### 1. Start everything
```bash
./start.sh
```

`start.sh` starts PostgreSQL, then runs the backend gateway and frontend. Start the four-organization bi-coin network and deploy its chaincodes first with `scripts/network-up.sh` and `scripts/deploy-chaincodes.sh`.

Default PoC users are defined in `.env.example`, for example `bi` / `bi-password`.

### 6. Smoke Test
```bash
node scripts/smoke-test.js
```

## API Endpoints

| Route | Caller |
|-------|--------|
| `GET /health`, `POST /auth/login` | Public |
| `GET /auth/me` | Authenticated application roles |
| `GET /identities/me`, `POST /subjects` | Authenticated, KYC-verified customer, or merchant |
| `POST /customer-wallets`, `POST /retail-transfers`, `GET /customer-wallets/{subject_id}/balance` | KYC-verified customer or merchant |
| `POST /conversions` | DistributorMSP (Retail Bank, Conversion) |
| `POST /interbank-transfers` | DistributorMSP (Wholesale Bank, Retail Bank) |
| `POST /wallet-fundings` | DistributorMSP (Retail Bank) |
| `POST /subjects/{subject_id}/endorsement-policies`, `/reviews`, `/decisions`, `/restrictions`, `/restriction-release-requests`, `/restriction-release-decisions`; `PUT /subjects/{subject_id}/limits`, `/business-authority` | DistributorMSP |
| `GET /subjects/{subject_id}` | DistributorMSP, CentralBankMSP, Auditor |
| `POST /staff`, `POST /staff/{client_id}/endorsement-policies`, `PUT /staff/{client_id}/role` | CentralBankMSP |
| `POST /monetary-initializations`, `/distributors`, `/issuances`, `/reserve-redemptions` | CentralBankMSP |

## Chaincode Functions

| Chaincode | Exported transactions (caller) |
|-----------|--------------------------------|
| `rupiah-monetary` | `Initialize`, `RegisterDistributor`, `Issue`, `RedeemReserve` (CentralBankMSP); `TransferReserve` (DistributorMSP); `DebitReserveForConversion` (nested call from `rupiah-payments`); reads `GetReserve`, `GetWholesaleSupply`, `GetRetailSupply`, `GetTotalSupply` |
| `rupiah-controls` | `CreatePending` (EndUserMSP); `ProtectSubject` (DistributorMSP); `CreateStaffPending`, `ProtectStaff`, `SetStaffRole` (CentralBankMSP); `RecordReview`, `ApproveStandard`, `DecideHighRisk`, `SetLimits`, `SetBusinessAuthority`, `FreezeSubject`, `RequestUnfreeze`, `ApproveUnfreeze` (staff roles on DistributorMSP); reads `GetCallerIdentity`, `CanPay`, `GetLimits`, `CanActFor`; `GetSubject` (CentralBankMSP, DistributorMSP, ValidatorMSP) |
| `rupiah-payments` | `OpenWallet`, `Transfer` (EndUserMSP); `ConvertToRetail`, `FundWallet` (DistributorMSP); reads `GetBalance`, `GetReceipt`, `GetRetailFloat` |

## Environment Variables

See `.env.example` for Fabric identity, PostgreSQL, and JWT configuration.
