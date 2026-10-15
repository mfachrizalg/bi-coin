# Repository guide

This is a local two-tier Digital Rupiah prototype. The React frontend calls a Go REST API, which uses PostgreSQL for private application data and Fabric Gateway for ledger transactions; Go chaincode enforces shared ledger rules.

Follow [AGENTS.md](AGENTS.md) for repository architecture, subsystem boundaries, thesis traceability, benchmark evidence, and checks. Use the nearest subsystem guide in chaincode/, backend/, or frontend/ for local details.

## Agent skills

### Issue tracker

Issues and specs live as local Markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

Use the single-context layout. See `docs/agents/domain.md`.
