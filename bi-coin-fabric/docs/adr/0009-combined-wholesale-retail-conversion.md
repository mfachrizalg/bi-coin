# Combined wholesale-to-retail conversion

## Status

Superseded by 0010

## Decision

The compliance study models distributor reserves as wholesale holdings and customer wallets as retail holdings of the same Digital Rupiah supply. On-demand conversion and retail distribution happen atomically through `POST /conversions`; the reserve debit equals the wallet credit, so outstanding supply stays unchanged. The study does not model separate wholesale and retail token types or an intermediate retail reserve.

## Rationale

The thesis evaluates compliance controls on retail issuance and distribution. An intermediate inventory would add a second ledger state and transaction without expanding that evaluation. Reusing the existing atomic reserve-funding flow keeps the test focused on the requested compliance behavior.

## Consequences

The API, interface, and benchmark describe reserve funding as wholesale-to-retail conversion. Existing payload, idempotency, and receipt behavior remain stable. The model does not claim to reproduce two separate production platforms.
