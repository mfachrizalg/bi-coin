# Network reset: archive host crypto material and remove orphan study volumes

## Status

Accepted (2026-10-20)

## Decision

1. `scripts/network-down.sh` with `REMOVE_VOLUMES=true` moves `network/organizations` and `network/ca-client` out of the repo, after `docker compose down`. They go to `$BI_COIN_BACKUP_DIR` (default `~/bi-coin-backups`) under `wipe-<timestamp>/`. The script writes `REASON.md` into that folder.
2. The 11 volumes named `bi-coin-rupiah-study-*` are deleted. They belong to the earlier `rupiah-study` project. Before deletion each is archived as `.tar.gz` under `~/bi-coin-backups/orphan-volumes-20261020/`, and the stopped `study-*` containers that held them are removed.
3. Archives stay until the next verified benchmark run. Then a person deletes them by hand. Read `REASON.md` before deleting any archive.

## Rationale

- `docker compose down -v` removes only the volumes the current compose file names (`bi-coin-*`). The `bi-coin-rupiah-study-*` volumes were never mounted by the current network.
- `network/bootstrap-org.sh` exits early with "MSP materials already exist" when `msp/config.yaml` is present. Host crypto material therefore survives a volume wipe, and the new CAs issue nothing that the peers see. On 2026-10-20 this produced identical issuer DNs and an identity collision in the smoke test, which failed three runs before the material was moved aside.
- Study Postgres (`bi_coin_study`) held 6 test users and no business rows. Ledger, CouchDB, CA, and orderer state belong to the older chaincode and CA roots, which the current network cannot reuse. Benchmark evidence lives in `benchmark/results` and in the `bi-coin-compliance-*` volumes. This decision does not touch either.

## Related fixes

- Each CA starts with `--csr.cn ca.<org>.bi-coin`. Without it all four CAs share the issuer `CN=fabric-ca-server`. The `FABRIC_CA_SERVER_CSR_CN` env var did not change the root CN in this setup.
- `scripts/network-up.sh` waits for the four CA ports before bootstrap. Bootstrap registered before the CAs listened.
- `scripts/deploy-chaincodes.sh` uses `PACKAGE_SEQUENCE=1`. A fresh channel has no committed definition, so the first definition must be sequence 1.

## Consequences

- Archived keys are never reused. A new network regenerates them.
- `benchmark/compliance/runner.js` also runs `network-down.sh` with `REMOVE_VOLUMES=true`, inside its disposable workspace. The archive step runs there too, and the runner then deletes the same folders itself.
- Resolved (2026-10-20): host tools are pinned at `~/fabric-tools-2.5.16`. Fabric 2.5.16 comes from `hyperledger/fabric-tools:2.5`, and `fabric-ca-client` 1.5.9 comes from `hyperledger/fabric-ca:1.5.9` to match the CA server. Both were checked against the live peer and orderer, which report v2.5.16. Scripts use them when `FABRIC_SAMPLES=$HOME/fabric-tools-2.5.16` is exported. The repo default `$HOME/fabric-samples` (v3.1.4) is unchanged. Still open: the isolated benchmark requires an official Fabric 2.5.16 release bundle with a checksum. This pin is verified by image ID and binary SHA-256 instead, recorded in `~/fabric-tools-2.5.16/MANIFEST.txt`.

## Execution (2026-10-20)

- Orphan volumes: 11 `bi-coin-rupiah-study-*` volumes were archived to `~/bi-coin-backups/orphan-volumes-20261020/`. Each tar listing was verified. Then the 11 stopped `study-*` containers and the 11 volumes were removed. No orphan volumes remain. `REASON.md` in that folder has the reason and restore commands.
- Earlier host material: three folders were moved by hand to `~/bi-coin-backups/` (`organizations-20261020-1216`, `organizations-partial-20261020-1217`, `ca-client-20261020-1217`). Each has a `REASON.md`.
- Archive step in `scripts/network-down.sh`: tested in a scratch copy with a stub `docker`, covering a wipe with material, a wipe with nothing, and no wipe. It has not run against the live network yet.
