# bi-coin-retail-cbdc

Retail Central Bank Digital Currency (CBDC) prototype on Hyperledger Fabric.
Digital Rupiah with PostgreSQL-backed off-chain KYC, JWT-authenticated role access,
subjects under CDD Sederhana, on-chain limits and ceilings, and audit trail.

**Thesis scope:** KYC is implementation-only and excluded from thesis acceptance criteria. Thesis acceptance criteria cover participant lifecycle,
issuance to Distributor banks, Conversion and Wallet funding, retail transfer, participant freeze,
and supervision. The subject flow implements CDD Sederhana only, for individual Retail Customers (ADR 0020).

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

Monetary flow: `Bank Indonesia -> Distributor reserve (w-Rupiah Digital) -> Conversion -> Retail float (r-Rupiah Digital) -> Wallet funding -> Retail Customer wallet`.
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
| `GET /identities/me`, `POST /subjects` (multipart: form fields including `address`, `birth_place`, and `birth_date`, and a PNG or JPEG `document`; category `retail` only) | Authenticated, KYC-verified customer |
| `POST /customer-wallets`, `POST /retail-transfers`, `GET /customer-wallets/{subject_id}/balance` | KYC-verified customer |
| `POST /conversions` | DistributorMSP (Distributor, Conversion) |
| `POST /wallet-fundings` | DistributorMSP (Distributor) |
| `POST /subjects/{subject_id}/endorsement-policies`, `/reviews`, `/decisions`, `/verifications`, `/updates` (multipart), `/closures`, `/low-risk-revocations`, `/restrictions`, `/restriction-release-requests`, `/restriction-release-decisions`; `PUT /subjects/{subject_id}/limits`; `POST /monitoring-alerts/{alert_id}/confirmations` | DistributorMSP |
| `GET /subjects/{subject_id}`, `GET /monitoring-alerts` | DistributorMSP, CentralBankMSP, Auditor |
| `GET /cdd-ceilings` | DistributorMSP, CentralBankMSP, Auditor |
| `GET /sederhana-register` | CentralBankMSP, Auditor |
| `PUT /cdd-ceilings` | CentralBankMSP |
| `POST /staff`, `POST /staff/{client_id}/endorsement-policies`, `PUT /staff/{client_id}/role` | CentralBankMSP |
| `POST /monetary-initializations`, `/distributors`, `/issuances`, `/reserve-redemptions` | CentralBankMSP |

## Chaincode Functions

| Chaincode | Exported transactions (caller) |
|-----------|--------------------------------|
| `rupiah-monetary` | `Initialize`, `RegisterDistributor`, `Issue`, `RedeemReserve` (CentralBankMSP); `DebitReserveForConversion` (nested call from `rupiah-payments`); reads `GetReserve`, `GetParticipant`, `GetWholesaleSupply`, `GetRetailSupply`, `GetTotalSupply` |
| `rupiah-controls` | `CreatePending` (EndUserMSP; CDD contents in transient `payload`); `ProtectSubject` (DistributorMSP); `CreateStaffPending`, `ProtectStaff`, `SetStaffRole` (CentralBankMSP); `SetCddCeilings` (CentralBankMSP; two integer arguments); `RecordReview` (DTTOT result, low-risk flag and reason), `ApproveSubject`, `SetLimits`, `VerifySubject`, `UpdateSubject`, `CloseSubject`, `FreezeSubject`, `RequestUnfreeze`, `ApproveUnfreeze` (staff roles on DistributorMSP; contents in transient `payload`); `RevokeLowRisk` (`compliance_officer` on DistributorMSP); reads `GetCallerIdentity`, `CanActFor`, `CanPay`, `GetLimits`, `GetSubject` (member MSPs or the subject's actor), `GetCddCeilings` (any caller); `CheckPayee` (nested call from `rupiah-payments`, no access check) |
| `rupiah-payments` | `OpenWallet`, `Transfer` (EndUserMSP); `ConvertToRetail`, `FundWallet` (DistributorMSP); reads `GetBalance`, `GetReceipt`, `GetRetailFloat` |

## Environment Variables

See `.env.example` for Fabric identity, PostgreSQL, and JWT configuration.
