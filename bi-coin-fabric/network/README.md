# Retail Rupiah study network

This is a fresh four-peer study network with its own PostgreSQL database. Its channel is `bi-coin`; generated identities, channel blocks, ledger volumes, and database volume stay local to this network.

Peer MSPs:

- `CentralBankMSP` runs the issuer peer and the single ordering node.
- `DistributorMSP` represents the two Distributor Banks, `wholesale-bank` and `retail-bank`.
- Observer (MSP ID: ValidatorMSP) peer (OJK, PPATK) for read-only audit and reports.
- `EndUserMSP` contains eight generated client identities for retail, merchant, and company representatives.

The Distributor identities `Admin`, `User1`, `User2`, and `User3` act for `retail-bank`, and `User4` and `User5` act for `wholesale-bank`. Two officers per bank let a second officer approve four-eyes transfers (ADR 0014). Each enrollment certificate carries a `distributor_id=<id>:ecert` attribute that chaincode checks. `User1`, `User2`, and `User3` are separate synthetic staff identities. Register their hashed client identities in `rupiah-controls` as `kyc_reviewer`, `senior_approver`, and `compliance_officer` before running KYC flows. CentralBank identities also include a peer, orderer, administrator, and two client identities, all under `CentralBankMSP`.

The first start creates a private, ignored `.env.study` file with random local CA, CouchDB, and PostgreSQL credentials. Keep that file for later restarts.

```bash
bash scripts/network-up.sh
bash scripts/deploy-chaincodes.sh
```

The monetary policy requires CentralBankMSP and DistributorMSP. Payments require DistributorMSP and EndUserMSP. Controls use `AND('DistributorMSP.peer',OR('CentralBankMSP.peer','EndUserMSP.peer'))` for cross-chaincode reads; protected effective-control keys require CentralBankMSP and DistributorMSP.

`ConvertToRetail` is the only route to the monetary conversion debit (`DebitReserveForConversion`). It invokes that debit and credits the same bank's retail float in one same-channel transaction. A failure in either chaincode aborts the complete transaction. `REMOVE_VOLUMES=true bash scripts/network-down.sh` removes only this study network's ledger, CouchDB, CA, and PostgreSQL volumes. It also moves the generated `organizations` and `ca-client` folders out of the repo into `~/bi-coin-backups/wipe-<timestamp>/`, with a `REASON.md` that says why. The bootstrap skips any org whose material already exists, so those folders must not survive a wipe. Decision and history: `docs/adr/0011-network-reset-archive-and-orphan-volumes.md`.

PostgreSQL is exposed only on `127.0.0.1:15432` and stores backend study data in `bi_coin_study`. To use its generated credentials from the repository root:

```bash
source bi-coin-fabric/network/network-env.sh
export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:15432/${POSTGRES_DB}?sslmode=disable"
```

Each organization's CA endpoint is bound to localhost and uses generated enrollment secrets. This network and its generated identities are for synthetic research data only.

## Backend signer map

The backend study routes use `FABRIC_IDENTITIES_JSON` to map each auth username to one server-managed X.509 client identity. User identity MSP and wallet custodian remain separate fields.

Each entry has this shape:

```json
{
  "username": "retail-bank",
  "msp_id": "DistributorMSP",
  "peer_endpoint": "localhost:18051",
  "gateway_peer": "peer0.distributor.bi-coin:7051",
  "cert_path": "/absolute/path/to/User1@distributor.bi-coin/msp/signcerts/cert.pem",
  "key_path": "/absolute/path/to/User1@distributor.bi-coin/msp/keystore/priv_sk",
  "tls_cert_path": "/absolute/path/to/peer0.distributor.bi-coin/tls/ca.crt"
}
```

Use separate usernames and certificate paths for `retail-bank` (`User1`) and `wholesale-bank` (`User4`, with `User5` as its second officer). Customer users map to separate `EndUserMSP` identities. `AUTH_BOOTSTRAP_USERS_JSON` assigns application roles such as `retail_bank`, `wholesale_bank`, `bank_indonesia`, and `auditor`; it does not assign chaincode staff roles. A CentralBank user provisions each staff certificate's hashed client ID and chaincode role through `POST /staff` and `PUT /staff/{client_id}/role`. The service rejects an identity whose configured MSP does not match the route's required role.

The API uses unversioned resource routes, including `/subjects`, `/customer-wallets`, `/retail-transfers`, `/distributors`, `/issuances`, `/reserve-redemptions`, `/interbank-transfers`, `/conversions`, and `/wallet-fundings`. `/conversions` moves a retail bank's reserve into its retail float, and `/wallet-fundings` moves that float into an approved retail wallet. Each call is atomic. These paths avoid the legacy `/wallets` and `/transfers` routes. Without `FABRIC_IDENTITIES_JSON`, these compliance routes are not registered.
