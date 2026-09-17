# Retail Digital Rupiah

This context defines the institutional and retail language for a two-tier retail digital rupiah governed by Bank Indonesia.

## Language

**Bank Indonesia**:
The monetary authority that governs the system and is the sole issuer of retail digital rupiah.
_Avoid_: BI, Central Bank, Issuer

**Participant**:
An institution admitted in exactly one of three roles: Validator Bank, Observer, or Payment Service Provider. Bank Indonesia, Retail Customer, and Merchant are not Participants.
_Avoid_: Member, Network Member, Node Operator

**Validator Bank**:
A Participant bank responsible for validating authorized operations and providing retail digital rupiah services.
_Avoid_: Bank Validator, Bank Participant, Commercial Bank, Validator

**Observer**:
The Participant role held by OJK for Supervision without authority to initiate or approve monetary operations.
_Avoid_: Regulator, Auditor, Validator

**Supervisor**:
A human role that performs Supervision, distinct from the institutional Observer Participant.
_Avoid_: Observer, OJK, Participant

**Payment Service Provider (PJP)**:
A non-bank Participant that provides retail digital rupiah payment services under the system's governance.
_Avoid_: PSP, Payment Provider, Fintech

**Retail Customer**:
An individual end user who holds and uses retail digital rupiah through a Custodian. A Retail Customer is not a Participant.
_Avoid_: Consumer, Retail Participant, User

**Merchant**:
A business beneficiary that accepts retail digital rupiah for goods or services through a Custodian. A Merchant is not a Participant.
_Avoid_: Seller, Merchant Participant, Business User

**Wallet Owner**:
The Retail Customer or Merchant that benefits from the value held in a Wallet, regardless of which Custodian administers it.
_Avoid_: Account Holder, Wallet User, Customer

**Custodian**:
Either a Validator Bank or Payment Service Provider Participant that administers a Wallet on behalf of its Wallet Owner. An Observer cannot be a Custodian.
_Avoid_: Wallet Owner, Wallet Provider, Account Provider

**Wallet**:
A retail digital rupiah holding attributed to one Wallet Owner and administered by a Custodian.
_Avoid_: Account, Balance, Purse

**Issuance**:
The creation of retail digital rupiah exclusively by Bank Indonesia into its treasury, increasing outstanding supply.
_Avoid_: Minting, Printing, Distribution

**Distribution**:
The transfer of issued retail digital rupiah from Bank Indonesia's treasury directly to either a Validator Bank or Payment Service Provider Custodian for onward provision to Wallet Owners.
_Avoid_: Circulation, Issuance, Transfer

**Redemption**:
The return of retail digital rupiah from Custodians to Bank Indonesia's treasury for withdrawal from circulation and reduction of outstanding supply.
_Avoid_: Refund, Withdrawal, Burn

**Supervision**:
The oversight of institutional and monetary activity without authority to create, distribute, redeem, or transfer retail digital rupiah.
_Avoid_: Administration, Validation, Governance

**Institutional Operator**:
An authenticated human who uses the institutional experience on behalf of Bank Indonesia or a Participant, or in the Supervisor role. The operator's visible actions follow the institution's existing authority.
_Avoid_: Admin, User, Network Member

**Payment Contact**:
A private shortcut owned by a Retail Customer or Merchant that stores a label, a Wallet ID, and the intended recipient type. A Payment Contact is not proof of identity, ownership, or payment authorization.
_Avoid_: Account, Directory Entry, User Profile
