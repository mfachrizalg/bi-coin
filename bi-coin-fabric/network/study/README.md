# Retail Rupiah study network

This is a fresh four-peer study network with its own PostgreSQL database. Its channel is `rupiah-study`; generated identities, channel blocks, ledger volumes, and database volume stay separate from the existing Garuda network.

Peer MSPs:

- `CentralBankMSP` runs the issuer peer and the single ordering node.
- `DistributorMSP` represents the PJP intermediary.
- `ValidatorMSP` is the read-only audit/report peer.
- `EndUserMSP` contains eight generated client identities for retail, merchant, and company representatives.

The Distributor identities `User1`, `User2`, and `User3` are separate synthetic staff identities. Register their hashed client identities in `rupiah-controls` as `kyc_reviewer`, `senior_approver`, and `compliance_officer` before running KYC flows. CentralBank identities also include a peer, orderer, administrator, and two client identities, all under `CentralBankMSP`.

The first start creates a private, ignored `.env.study` file with random local CA, CouchDB, and PostgreSQL credentials. Keep that file for later restarts.

```bash
bash scripts/study-network-up.sh
bash scripts/deploy-study-chaincodes.sh
```

The monetary policy requires CentralBankMSP and DistributorMSP. Payments require DistributorMSP and EndUserMSP. Controls use `AND('DistributorMSP.peer',OR('CentralBankMSP.peer','EndUserMSP.peer'))` for cross-chaincode reads; protected effective-control keys require CentralBankMSP and DistributorMSP.

`FundFromReserve` is the only route to the monetary debit function. It checks eligibility, invokes the monetary debit, and credits the wallet in one same-channel transaction. A failure in either chaincode aborts the complete transaction. `STUDY_REMOVE_VOLUMES=true bash scripts/study-network-down.sh` removes only this study network's ledger, CouchDB, CA, and PostgreSQL volumes.

PostgreSQL is exposed only on `127.0.0.1:15432` and stores backend study data in `bi_coin_study`. To use its generated credentials from the repository root:

```bash
source bi-coin-fabric/network/study/study-env.sh
export DATABASE_URL="postgresql://${STUDY_POSTGRES_USER}:${STUDY_POSTGRES_PASSWORD}@localhost:15432/${STUDY_POSTGRES_DB}?sslmode=disable"
```

The CA endpoint is bound to localhost and uses generated enrollment secrets. This network and its generated identities are for synthetic research data only.

## Backend signer map

The backend study routes use `FABRIC_STUDY_IDENTITIES_JSON` to map each auth username to one server-managed X.509 client identity. Set this separately from `FABRIC_GATEWAYS_JSON`; user identity MSP and wallet custodian remain separate fields.

Each entry has this shape:

```json
{
  "username": "pjp-reviewer",
  "msp_id": "DistributorMSP",
  "peer_endpoint": "localhost:18051",
  "gateway_peer": "peer0.distributor.rupiah.study:7051",
  "cert_path": "/absolute/path/to/User1@distributor.rupiah.study/msp/signcerts/User1@distributor.rupiah.study-cert.pem",
  "key_path": "/absolute/path/to/User1@distributor.rupiah.study/msp/keystore/priv_sk",
  "tls_cert_path": "/absolute/path/to/peer0.distributor.rupiah.study/tls/ca.crt"
}
```

Use separate usernames and certificate paths for the reviewer (`User1`), senior approver (`User2`), and compliance officer (`User3`). Customer users map to separate `EndUserMSP` identities. `AUTH_BOOTSTRAP_USERS_JSON` assigns application roles such as `bank_pjp`, `bank_indonesia`, and `supervisor`; it does not assign chaincode staff roles. A CentralBank user provisions each staff certificate's hashed client ID and chaincode role through `POST /staff` and `PUT /staff/{client_id}/role`. The service rejects an identity whose configured MSP does not match the route's required role.

The API uses unversioned resource routes, including `/subjects`, `/customer-wallets`, `/retail-transfers`, `/conversions`, `/issuances`, `/reserve-allocations`, and `/reserve-redemptions`. The conversion endpoint debits wholesale distributor reserves and credits an approved retail wallet atomically. These paths avoid the legacy `/wallets` and `/transfers` routes. Without `FABRIC_STUDY_IDENTITIES_JSON`, these compliance routes are not registered.
