# Ledger receipts and off-chain recovery

Fabric operation receipts are authoritative when a REST request or its PostgreSQL journal write has an uncertain outcome. Each mutation reuses one principal-scoped reference, the chaincode binds that reference to its original caller and request fields, and the SQL journal advances only from pending to submitted to completed. KYC retries reuse one profile identifier and preserve an existing review decision. A PostgreSQL response alone never authorizes another ledger effect.
