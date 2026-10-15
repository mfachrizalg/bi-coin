# Backend guide

This Go API authenticates requests, applies role and ownership checks, stores private application data in PostgreSQL, and selects a Fabric Gateway for ledger operations.

Follow [AGENTS.md](AGENTS.md) for route ownership, request flow, API and data contracts, thesis traceability, and tests. Check ../chaincode/digital_rupiah.go and ../frontend/src/lib/api.ts when changing cross-layer contracts.
