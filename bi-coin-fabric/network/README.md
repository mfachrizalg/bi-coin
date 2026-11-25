# Retail Rupiah study network

This is a fresh four-peer study network with its own PostgreSQL database. Its channel is `bi-coin`; generated identities, channel blocks, ledger volumes, and database volume stay local to this network.

Peer MSPs:

- `CentralBankMSP` runs the issuer peer and three ordering nodes, `orderer0`, `orderer1`, and `orderer2`, all on this host (ADR 0017).
- `DistributorMSP` represents one non-bank Distributor (ADR 0017).
- Observer (MSP ID: ValidatorMSP) peer (OJK, PPATK) for read-only audit and reports.
- `EndUserMSP` contains eight generated client identities for Retail Customers.

The Distributor identities `Admin`, `User1`, `User2`, and `User3` act for the Distributor. The second-bank identities were removed with the interbank features (ADR 0017). Each enrollment certificate carries a `distributor_id=<id>:ecert` attribute that chaincode checks. `User1` and `User3` are separate synthetic staff identities. Register their hashed client identities in `rupiah-controls` as `kyc_reviewer` and `compliance_officer` before running KYC flows. The `kyc_reviewer` records the review (DTTOT result and low-risk flag), sets limits, approves or rejects, verifies, updates, and closes a Subject. The `compliance_officer` revokes the low-risk flag and approves a restriction release. A reviewer and a compliance officer must be different people. CentralBank identities also include three orderer identities (`orderer0`, `orderer1`, `orderer2`), a peer, an administrator, and two client identities, all under `CentralBankMSP`.

The first start creates a private, ignored `.env.study` file with random local CA, CouchDB, and PostgreSQL credentials. Keep that file for later restarts.

```bash
bash scripts/network-up.sh
bash scripts/deploy-chaincodes.sh
```

After deployment, Bank Indonesia sets the CDD ceilings once with `PUT /cdd-ceilings` (`SetCddCeilings`, CentralBankMSP), for example `{"unverified_holdings":"2000000","verified_holdings":"20000000"}` in Rupiah (ADR 0020). Until they are set, `SetLimits` and `ApproveSubject` refuse, so no Subject can be approved. A network reset clears them, so repeat this step after every reset.

Monetary requires `AND('CentralBankMSP.peer','DistributorMSP.peer')`. Controls and payments require `AND('DistributorMSP.peer','CentralBankMSP.peer')` (ADR 0017). The subject collection `cddCollection` has members DistributorMSP, CentralBankMSP, and ValidatorMSP, and its definition is `network/collections/rupiah-controls.json` (ADR 0018). The subject record's state-based policy, set by `ProtectSubject`, uses the same AND policy.

`ConvertToRetail` is the only route to the monetary conversion debit (`DebitReserveForConversion`). It invokes that debit and credits the same Distributor's retail float in one same-channel transaction. A failure in either chaincode aborts the complete transaction. `REMOVE_VOLUMES=true bash scripts/network-down.sh` removes only this study network's ledger, CouchDB, CA, and PostgreSQL volumes. It also moves the generated `organizations` and `ca-client` folders out of the repo into `~/bi-coin-backups/wipe-<timestamp>/`, with a `REASON.md` that says why. The bootstrap skips any org whose material already exists, so those folders must not survive a wipe. Decision and history: `docs/adr/0011-network-reset-archive-and-orphan-volumes.md`. Moving from one orderer to three requires this reset, because the three-orderer genesis block cannot be applied to an existing ledger (ADR 0017).

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
  "username": "distributor",
  "msp_id": "DistributorMSP",
  "peer_endpoint": "localhost:18051",
  "gateway_peer": "peer0.distributor.bi-coin:7051",
  "cert_path": "/absolute/path/to/User1@distributor.bi-coin/msp/signcerts/cert.pem",
  "key_path": "/absolute/path/to/User1@distributor.bi-coin/msp/keystore/priv_sk",
  "tls_cert_path": "/absolute/path/to/peer0.distributor.bi-coin/tls/ca.crt"
}
```

Map the Distributor identity `User1` to its own username. Customer users map to separate `EndUserMSP` identities. Those identities sign as `EndUserMSP` but must connect through the Distributor peer (`peer_endpoint` `localhost:18051`, `gateway_peer` `peer0.distributor.bi-coin:7051`), because EndUser peers hold no private data collection. Through the EndUser peer, `OpenWallet`, `FundWallet`, and `GetBalance` return HTTP 500. `AUTH_BOOTSTRAP_USERS_JSON` assigns application roles such as `retail_bank`, `bank_indonesia`, and `auditor`; it does not assign chaincode staff roles. A CentralBank user provisions each staff certificate's hashed client ID and chaincode role through `POST /staff` and `PUT /staff/{client_id}/role`. The service rejects an identity whose configured MSP does not match the route's required role.

The API uses unversioned resource routes, including `/subjects`, `/customer-wallets`, `/retail-transfers`, `/distributors`, `/issuances`, `/reserve-redemptions`, `/conversions`, and `/wallet-fundings`. `/conversions` moves a Distributor's reserve into its retail float, and `/wallet-fundings` moves that float into an approved retail wallet. Each call is atomic. These paths avoid the legacy `/wallets` and `/transfers` routes. Without `FABRIC_IDENTITIES_JSON`, these compliance routes are not registered.
