---
type: domain
title: "bi-coin-fabric"
created: 2026-07-21
updated: 2026-07-21
tags:
  - domain
  - code
status: developing
subdomain_of: ""
page_count: 0
related:
  - "[[thesis]]"
  - "[[paper]]"
---

# bi-coin-fabric

Hyperledger Fabric implementation of the two-tier CBDC design. 5-org Garuda-style network,
Raft ordering, CouchDB state DB, 5 CAs. Backend in Go (`backend/handlers/`), frontend in
React/TypeScript (`frontend/src/`).

## Open threads
- Backend handlers, routes tests, and frontend (App.tsx, api.ts, WalletList.tsx, vite.config.ts)
  have uncommitted changes as of 2026-07-21 — in progress.

## Key facts
- Caliper canonical benchmark (2026-06-30, zero-failure run): 9.0 / 45.9 / 57.7 TPS.
- Double-spend and MVCC conflict behavior under concurrent transfers verified.

## Related
- [[thesis]]
- [[paper]]

<!-- research-corpus-links:start -->
## Research corpus

- [[CBDC Design and Policy]]
- [[Digital Rupiah and Indonesian Payments]]
- [[DLT and Blockchain Architecture]]
- [[Privacy Security and Compliance]]
- [[Performance and Benchmarking]]
- [[Adoption Inclusion Banking and Macroeconomics]]
<!-- research-corpus-links:end -->
