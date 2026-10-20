# Direct issuance and separate wholesale and retail instruments

## Status

Accepted

## Decision

Bank Indonesia is the sole issuer of Digital Rupiah. It issues w-Rupiah Digital directly into a Distributor reserve. There is no treasury account and no allocation step. Wholesale and retail are separate instruments: w-Rupiah Digital is held only in Distributor reserves, and r-Rupiah Digital is held only in Retail floats and Wallets. Conversion moves a Retail Bank's w-Rupiah Digital into its own Retail float at par.

Only banks hold Distributor reserves or Retail floats. Wholesale Banks hold reserves only, and only a Retail Bank can be a Custodian. Ownership is enforced on the ledger. Each bank identity carries the Fabric CA attribute `distributor_id=<id>:ecert`, and chaincode rejects any debit of a reserve or float that belongs to another bank. This decision supersedes ADR 0009.

## Rationale

The earlier design credited a Bank Indonesia treasury and then moved the balance to a Distributor in a separate allocation step. Bank Indonesia is the sole issuer, so the treasury added a ledger state and a transaction without changing who can create money. Direct issuance removes both. Keeping wholesale and retail as separate instruments lets total supply be checked as wholesale plus retail.

## Consequences

Redemption retires w-Rupiah Digital from a Distributor reserve. Interbank transfer moves it between two reserves without changing supply. The chaincode, backend, frontend, benchmark, and thesis must describe these two instruments. The RTGS giro backing of issued w-Rupiah Digital is not modelled, and no path returns value from a Wallet to a reserve. Both are stated limitations.
