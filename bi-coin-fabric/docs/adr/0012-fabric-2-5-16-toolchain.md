# Fabric 2.5.16 is the only supported toolchain

## Status

Accepted (2026-10-20)

## Decision

- The study network, chaincode, CLI container, and every host tool that touches the network use Hyperledger Fabric 2.5.16. Do not use another Fabric version for peer, orderer, configtxgen, osnadmin, or channel operations.
- Host tools are pinned at `~/fabric-tools-2.5.16` (`bin/` and `config/`). They come from the local image `hyperledger/fabric-tools:2.5`, which ships Fabric 2.5.16. `fabric-ca-client` 1.5.9 comes from `hyperledger/fabric-ca:1.5.9`, to match the CA server in `network/docker-compose.yaml`.
- Each shell sets `FABRIC_SAMPLES=$HOME/fabric-tools-2.5.16` and prepends `$FABRIC_SAMPLES/bin` to `PATH`. The network scripts read tools only through `FABRIC_SAMPLES`.
- Before any network operation, `peer version` must print `Version: v2.5.16`.

## Rationale

- The live peers, orderer, and CLI container run 2.5.16 (checked 2026-10-20).
- The repo default `$HOME/fabric-samples` holds Fabric 3.1.4 tools. The scripts fall back to it when `FABRIC_SAMPLES` is unset. On 2026-10-20 the first network was built with 3.1.4 `configtxgen` and joined 2.5.16 peers with a 3.1.4 client. Mixing versions is untested, so it is not allowed.

## Consequences

- The scripts do not check the version. If `FABRIC_SAMPLES` is unset, they run 3.1.4 without an error.
- The pinned tools come from local images, not an official Fabric release. `benchmark/isolated/README.md` requires an official 2.5.16 bundle with a verified checksum. This pin does not satisfy that rule. The official bundle `hyperledger-fabric-linux-amd64-2.5.16.tar.gz` is downloaded to `~/fabric-release-2.5.16/`, and its SHA-256 matches GitHub's published digest. Extraction for benchmark use is pending. Image IDs and binary SHA-256 hashes for the pin are in `~/fabric-tools-2.5.16/MANIFEST.txt`.
- Using any other Fabric version, or upgrading, needs a new ADR.
- Removed 2026-10-20: the Fabric 3.x host tools (`bin/`, `config/`) moved from `~/fabric-samples` to `~/bi-coin-backups/fabric-3.x-20261020/`. The `~/.zshrc` PATH line for `~/fabric-samples/bin` was removed. Restore steps are in that folder's `REASON.md`.
