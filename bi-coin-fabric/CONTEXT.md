# Retail Digital Rupiah

This context defines institutional, wholesale, and retail language for a two-tier digital rupiah governed by Bank Indonesia.

## Language

**Bank Indonesia**:
The monetary authority that governs the system and is the sole issuer of Digital Rupiah.
_Avoid_: BI, Central Bank, Issuer

**Participant**:
An institution admitted by Bank Indonesia in exactly one of two roles: Distributor or Observer. Bank Indonesia, Retail Customer, and Merchant are not Participants.
_Avoid_: Member, Network Member, Node Operator

**Distributor**:
A PJSP, bank or non-bank, that Bank Indonesia admits as a Participant. It receives Issuance, holds a Distributor reserve, performs Conversion, and acts as Custodian. The prototype runs one non-bank Distributor. The Auditor of the compliance study is not a Distributor.
_Avoid_: Distributor Bank, Retail Bank, Wholesale Bank, Bank Participant

**Observer**:
The Participant role held by OJK and PPATK for Supervision without authority to initiate or approve monetary operations. Observers are excluded from chaincode endorsement but still approve chaincode lifecycle changes.
_Avoid_: Regulator

**Auditor**:
A human role of an Observer institution (OJK, PPATK) that performs Supervision. It is read-only: it can inspect controls records but cannot submit mutations.
_Avoid_: Supervisor, Observer, OJK

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
A Distributor that administers a Wallet on behalf of its Wallet Owner. Only a Distributor can be a Custodian.
_Avoid_: Wallet Owner, Wallet Provider, Account Provider

**Wallet**:
A retail digital rupiah holding attributed to one Wallet Owner and administered by a Custodian.
_Avoid_: Account, Balance, Purse

**w-Rupiah Digital**:
The wholesale instrument of Digital Rupiah. It is held only in Distributor reserves.
_Avoid_: w-CBDC, wholesale token

**r-Rupiah Digital**:
The retail instrument of Digital Rupiah. It is held only in Retail floats and Wallets.
_Avoid_: r-CBDC

**Distributor reserve**:
w-Rupiah Digital held by a Distributor for later Conversion into its Retail float.
_Avoid_: Retail reserve, Customer balance

**Retail float**:
The r-Rupiah Digital held by a Distributor after Conversion. Wallet funding draws on it.
_Avoid_: Retail balance, Wallet

**Retail balance**:
Digital Rupiah held in a customer or merchant Wallet for retail transfers and payments.
_Avoid_: Wholesale balance, Distributor reserve

**Wallet funding**:
The movement of r-Rupiah Digital from a Retail float into a Wallet, subject to the CanPay and holdings-limit checks.

**Conversion**:
An at-par movement of w-Rupiah Digital from a Distributor reserve into the same Distributor's Retail float as r-Rupiah Digital. Total supply is unchanged.
_Avoid_: Minting, Redemption, Transfer

**Issuance**:
The creation of w-Rupiah Digital exclusively by Bank Indonesia directly into a Distributor reserve, increasing outstanding supply.
_Avoid_: Minting, Distribution, Allocation

**Redemption**:
The retirement of w-Rupiah Digital from a Distributor reserve under Bank Indonesia authorization, reducing outstanding supply.
_Avoid_: Refund, Withdrawal, Burn

**Supervision**:
The oversight of institutional and monetary activity without authority to issue, redeem, or transfer Digital Rupiah.
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
A reference to the evidence, submitted by a KYC reviewer as part of the release review for a restricted subject. Every new restriction requires a new reviewer submission; a reference may be reused.
_Avoid_: Evidence document, Evidence proof

**Subject**:
The party under customer due diligence, in the category retail, merchant, or business.

**Subject ID**:
A random pseudonym that identifies a Subject on the ledger. It is never the NIK.
_Avoid_: NIK, Customer number, Identity number

**Subject record**:
The CDD record of a Subject. The Distributor, Bank Indonesia, and the Auditor can read it. Other Participants see only its hash.
_Avoid_: Customer file, KYC profile

**Document reference**:
The SHA-256 of an identity document file, stored off chain under that name and recorded in the Subject record.
_Avoid_: Document link, File path

**Restriction**:
A subject-level hold, recorded with a Restriction reason. An internal-review hold lapses after 5 days and an authority-order hold after 30 days; a DTTOT hold lasts until an approved release backed by a Release evidence reference.
_Avoid_: Freeze

**Staff role**:
A maker-checker role in the compliance study: KYC reviewer or compliance officer. A KYC reviewer and a compliance officer must be different people.
