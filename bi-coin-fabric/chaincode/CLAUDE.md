# Chaincode guide

This Go module contains the Fabric contract. Its exported transactions are called by the backend and Caliper; its MSP and ledger checks enforce shared-state rules.

Follow [AGENTS.md](AGENTS.md) for transaction groups, authorization boundaries, thesis traceability, and test guidance. Check ../backend/services/ledger.go and ../benchmark/workloads/ before changing a transaction contract.
