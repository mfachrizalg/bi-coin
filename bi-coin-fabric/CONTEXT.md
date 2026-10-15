# Retail Digital Rupiah

This context defines institutional, wholesale, and retail language for a two-tier digital rupiah governed by Bank Indonesia.

## Language

**Bank Indonesia**:
The monetary authority that governs the system and is the sole issuer of retail digital rupiah.
_Avoid_: BI, Central Bank, Issuer

**Participant**:
An institution admitted in exactly one of three roles: Validator Bank, Observer, or Payment Service Provider. Bank Indonesia, Retail Customer, and Merchant are not Participants.
_Avoid_: Member, Network Member, Node Operator

**Validator Bank**:
A Participant bank responsible for validating authorized operations and providing retail digital rupiah services. The Auditor of the compliance study is not a Validator Bank.
_Avoid_: Bank Validator, Bank Participant, Commercial Bank, Validator

**Observer**:
The Participant role held by OJK for Supervision without authority to initiate or approve monetary operations.
_Avoid_: Regulator, Validator

**Auditor**:
A human role that performs Supervision. It is read-only: it can inspect controls records but cannot submit mutations. It is distinct from the institutional Observer Participant.
_Avoid_: Supervisor, Observer, OJK, Validator Bank

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

**Distributor reserve**:
Digital Rupiah held by an authorized distributor for later wholesale use or conversion into retail holdings.
_Avoid_: Retail reserve, Customer balance

**Retail balance**:
Digital Rupiah held in a customer or merchant Wallet for retail transfers and payments.
_Avoid_: Wholesale balance, Distributor reserve

**Wholesale-to-retail conversion**:
An equal-value movement from a Distributor reserve into an approved retail balance that does not change total outstanding supply.
_Avoid_: Minting, Redemption, Transfer

**Issuance**:
The creation of Digital Rupiah exclusively by Bank Indonesia into its treasury, increasing outstanding supply.
_Avoid_: Minting, Printing, Distribution

**Distribution**:
The transfer of issued Digital Rupiah from Bank Indonesia's treasury to an authorized distributor for onward retail use.
_Avoid_: Circulation, Issuance, Transfer

**Redemption**:
The retirement of issued retail digital rupiah under Bank Indonesia authorization, reducing outstanding supply.
_Avoid_: Refund, Withdrawal, Burn

**Supervision**:
The oversight of institutional and monetary activity without authority to create, distribute, redeem, or transfer retail digital rupiah.
_Avoid_: Administration, Validation, Governance

**Institutional Operator**:
An authenticated human who uses the institutional experience on behalf of Bank Indonesia or a Participant, or in the Auditor role. The operator's visible actions follow the institution's existing authority.
_Avoid_: Admin, User, Network Member

**Payment Contact**:
A private shortcut owned by a Retail Customer or Merchant that stores a label, a Wallet ID, and the intended recipient type. A Payment Contact is not proof of identity, ownership, or payment authorization.
_Avoid_: Account, Directory Entry, User Profile

**Restriction reason**:
One of the study's three manually selected codes: DTTOT, authority order, or internal review. The code records why a subject was restricted; it does not perform screening or verify the authority evidence.
_Avoid_: Sanctions match, Screening result

**Release evidence reference**:
A SHA-256 digest reference submitted by a KYC reviewer as part of the release review for a restricted subject. Every new restriction requires a new reviewer submission; the digest may be reused and the evidence itself remains off ledger.
_Avoid_: Evidence document, Evidence proof

**Subject**:
The party under customer due diligence, in the category retail, merchant, or business.

**Restriction**:
A subject-level hold, recorded with a Restriction reason. It is lifted only by an approved release backed by a Release evidence reference.
_Avoid_: Freeze

**Freeze**:
A legacy hold on a wallet or participant. Subjects are restricted, not frozen.
_Avoid_: Restriction

**Staff role**:
A maker-checker role in the compliance study: KYC reviewer, senior approver, or compliance officer. A KYC reviewer and a senior approver must be different people.
