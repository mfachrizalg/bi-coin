# Retail Digital Rupiah Thesis: Conversation Summary and Proposed Changes

Date: 2 October 2026

## 1. Purpose and evidence status

This document summarizes the conversation about an undergraduate Informatics thesis on a retail Digital Rupiah prototype using a two-tier CBDC architecture, Hyperledger Fabric, Go, and PostgreSQL. It includes the research scope, KYC and AML/CFT controls, storage decisions, authorization, endorsement, evaluation, and the implications for the chaincode, backend, frontend, and thesis.

**This is a discussion summary and implementation change plan, not a verified code diff.** No chaincode source, backend repository, frontend source, or complete thesis manuscript was supplied or reviewed in this conversation. Proposed function names, fields, and workflows below are illustrative. They must not be described as implemented or tested until verified against the actual project.

The existing reference document, `Dasar_Aturan_KYC_AML_CFT_Rupiah_Digital.docx`, was reviewed in its current version. It contains legal references, control matrices, proposed scope, storage and frontend recommendations, authorization scenarios, and endorsement design. Its scope paragraphs are draft wording to adapt to the actual completed implementation.

## 2. Confirmed choices and current progress

| Item | Status established in the conversation |
| --- | --- |
| Research level | Undergraduate Informatics thesis; scope should remain manageable. |
| Research subject | Implementation and evaluation of selected KYC and AML/CFT controls for retail Digital Rupiah. |
| Architecture | Two-tier CBDC: Bank Indonesia distributes through intermediaries. |
| DLT | Hyperledger Fabric selected by the researcher. |
| Application language | Go selected for interaction with Fabric; chaincode recommendations also use Go. Actual dependencies and versions have not been reviewed. |
| Off-chain database | PostgreSQL selected for KYC and application data. |
| Frontend | The researcher reported that registration and login pages already exist. Other pages are recommendations, not confirmed completed work. |
| AI | Developing or training an AI model is not required for the proposed control prototype. |
| Object storage | Explicitly moved to future-work recommendations; it is not a required implemented component. |
| Benchmarking | The researcher initially mentioned Hyperledger Composer as a benchmark tool. The tool name needs correction or clarification: Hyperledger Caliper is the blockchain performance benchmark framework. No migration or completed benchmark was established. |

Fabric Gateway provides a Go client API for modern Fabric application interaction. The exact Fabric, Gateway, chaincode library, and benchmark versions should be selected and documented together. [T4, T8]

## 3. Initial legal and institutional questions

The conversation began with a question about whether the P2SK Law made Digital Rupiah legal tender, how legal-tender status differs from its absence, and whether Bank Indonesia's role consequently changes.

The thesis should distinguish three issues: statutory recognition and authority to issue Digital Rupiah; the consequences of legal-tender status; and the readiness or implementation of a specific retail CBDC system. A prototype or high-level design does not establish nationwide availability. The initial legal question should be checked against the applicable statutory text and amendments before a definitive legal conclusion is placed in the thesis. This summary does not present that initial assertion as independently established. Bank Indonesia's Project Garuda portal is the primary architecture reference. [L10]

The researcher proposed four actor groups: Bank Indonesia, supervisors, intermediaries, and retail users. This is useful as a conceptual stakeholder grouping, but it should not become four interchangeable technical roles.

| Actor | Role in the proposed research model | Qualification |
| --- | --- | --- |
| Bank Indonesia | Central bank and issuer; model issuance and relevant governance functions. | An intermediary must not be modeled as independently issuing central-bank money. |
| Intermediary bank or nonbank PJP | Customer onboarding, KYC/CDD, operational controls, customer-facing access, and transaction processing. | Obligations depend on the institution and activity; banks and all nonbank PJPs should not automatically be assigned identical regulations. |
| OJK and other relevant authorities | Supervision within their respective mandates. | Supervision does not automatically imply endorsing every ledger transaction. |
| PPATK | Financial-intelligence and reporting destination in the model. | Treat its reporting/intelligence function separately from institutional supervision. Actual reporting is simulated in the proposed scope. |
| Retail customer | Individual using the prototype wallet. | Customer identity verification differs from Fabric organizational membership. |
| KYC reviewer / compliance officer | Internal operational role within the intermediary. | These are application/business roles, not additional independent CBDC institutions. |

The narrowed baseline proposed in the reference document uses one nonbank PJP and domestic individual customers acting for themselves. A second intermediary is needed if cross-intermediary transfers are actually implemented. This narrowing is a recommendation, not an irreversible change to the researcher's original architecture.

## 4. Thesis wording: compliance versus selected controls

The discussion explored whether the thesis title should use “compliance” or “KYC and AML/CFT controls.” For a limited software prototype, **implementation and evaluation of selected KYC and AML/CFT controls** is the more precise proposed framing.

“Compliance” can imply a broader assessment covering institutional governance, risk management, staff responsibilities and training, independent review, reporting, confidentiality, retention, data protection, third-party arrangements, and operational effectiveness. Implementing several software rules does not prove institution-wide compliance.

Suggested English title, not a confirmed final title:

> Implementation and Evaluation of Selected KYC and AML/CFT Controls in a Retail Digital Rupiah Prototype Using Hyperledger Fabric

The research should identify which controls are implemented, which processes are simulated, which obligations are only discussed, and which subjects are outside scope. Passing prototype tests supports a claim about selected controls under defined scenarios, not full legal compliance or demonstrated prevention of real-world financial crime.

## 5. KYC, CDD, AML/CFT, and the proposed onboarding flow

KYC is not completed merely by submitting an identity document. In the discussion it is mapped to customer identification and verification within the broader PMPJ/CDD process. Relevant activities include collecting appropriate information, verifying it, understanding the relationship and customer risk, identifying whether someone acts for another party, and updating information when required.

AML/CFT is not limited to wallet tiers or transaction limits. The proposed control set also includes screening, risk-based review, transaction monitoring, handling relevant blocking decisions, case assessment, reporting, recordkeeping, and confidentiality. Risk classification, wallet access level, application role, login status, and KYC status are separate concepts.

Proposed onboarding sequence:

1. Register an application account. Public registration must not allow selection of privileged staff roles.
2. Submit manually entered KYC information and a synthetic identity document clearly marked as test data.
3. Validate completeness and format in the backend. A valid NIK format does not establish identity authenticity.
4. Have an authorized reviewer compare the entered information with the document. This checks transcription consistency, not document authenticity.
5. Simulate an external verification result: matching, nonmatching, or unavailable. An unavailable result remains pending rather than automatically approving the customer.
6. Run the chosen screening and risk rules, recording the rule/list versions and relevant evidence off-chain.
7. Record the review decision and invoke an authorized ledger transaction to update effective KYC/wallet status.
8. Confirm a valid ledger commit before treating the decision as effective for transfers.

For scope control, verification against a live Dukcapil service, biometric matching, liveness detection, authentic KTP validation, and production external-service integrations are not part of the proposed baseline.

No custom AI model is needed for deterministic controls or manual KYC entry. OCR is optional. If a pretrained OCR engine such as Tesseract's LSTM engine is later used, describe it accurately as using a pretrained model; “no model training” is different from “no AI component.” OCR extracts text and does not replace identity verification. [T7]

## 6. Proposed control set and source mapping

| Control area | Proposed prototype behavior |
| --- | --- |
| Identification and completeness | Collect the selected required fields; prevent activation when necessary information is missing. |
| Verification | Separate format checking from a simulated identity-verification result. |
| Acting for another party | Identify such applications and route them outside the simplified individual-customer flow. |
| Risk and enhanced review | Apply documented risk factors; trigger additional review where the chosen rules require it. |
| KYC updates | Track changes and review triggers; label invented periodic intervals as research parameters. |
| DTTOT screening | Use synthetic names, aliases, and identifiers; distinguish a candidate match from a confirmed identity match. |
| Blocking | Model the selected blocking rules and reject transfers from affected wallets; do not equate every AML alert with mandatory blocking. |
| Transfer information | Preserve enough information and authorized off-chain linkage to reconstruct the modeled transfer. |
| Monitoring | Use deterministic research rules for deviations or suspicious patterns; retain versions and reasons. |
| Case assessment and reporting | Have authorized staff review alerts and simulate reporting; an algorithmic alert is not automatically a legally established suspicious transaction. |
| Confidentiality | Restrict case and reporting information; retail users should not receive confidential report details. |
| Retention and audit | Apply a documented retention model to off-chain records and retain an appropriate ledger audit trail. |

The reference document maps these controls to Indonesian laws and regulations, BI guidance, FATF standards, and CBDC literature. Legal requirements, international guidance, and research choices must remain distinguishable. [L1–L10]

Wallet limits and alert thresholds should not be presented as statutory Digital Rupiah requirements without a specific applicable source. The thesis should not automatically transplant electronic-money limits into CBDC rules. Evaluate any legally sourced reporting or retention parameters using their exact scope, trigger, and applicable version.

## 7. Storage: PostgreSQL, ledger, and future object storage

The latest instruction supersedes the earlier suggestion to add object storage to the implemented architecture: **object storage is future work only.**

| Storage | Proposed contents |
| --- | --- |
| PostgreSQL | Accounts, password hashes, complete KYC profiles, synthetic KTP images in a separate `bytea` document table, document metadata, verification/review evidence, AML/CFT cases, reporting simulation data, and application caches. |
| Fabric ledger | Wallet ownership references and balances, effective KYC/wallet status, selected operational roles, enforceable control parameters, and relevant proposal/approval state. |
| Future object storage | Private document files; PostgreSQL would retain object references and metadata if this enhancement is adopted. |

PostgreSQL is the application's off-chain database, not Fabric's world-state database. Fabric documentation describes LevelDB and CouchDB as world-state options. [T2, T6]

Avoid placing KTP images, complete identity profiles, passwords, or confidential reports on a generally shared channel. A document reference or integrity hash is optional; hashing does not prove document authenticity, and hashing a NIK alone does not guarantee anonymity. If an attacker can replace both a document and its checksum, the checksum provides no independent evidence.

## 8. What the DLT stores besides payment transactions

Fabric maintains both current state and the transaction history that produced it. Creating a wallet, changing a role, approving KYC, or blocking a wallet is also a ledger transaction, even though it is not a payment. [T2]

| State category | Illustrative fields | Reason to store it |
| --- | --- | --- |
| Wallet and balance | `wallet_id`, `owner_ref`, `intermediary_msp`, `wallet_type`, `balance` | Determine ownership, custody in the model, wallet type, and spendable value. |
| Wallet status | `ACTIVE`, `SUSPENDED`, `BLOCKED`, `CLOSED` | Enforce operational restrictions. |
| Effective KYC decision | `kyc_status_effective`, `decision_ref`, optional `review_due_at` | Decide whether modeled transactions are allowed. |
| Staff-role registry | `identity_ref`, `organization`, `role`, `active` | Control privileged chaincode operations. |
| Control parameters | `policy_version`, `max_balance`, `transaction_limit` | Apply the selected rules consistently. |
| Limit aggregates, if needed | `wallet_id`, `period`, `total_amount`, `transaction_count` | Enforce cumulative limits with concurrency handled in ledger updates. |
| Proposals and approvals, if needed | `proposal_id`, bound transaction details, approvers, status | Support actions requiring several business approvals. |
| Optional evidence references | `document_ref`, `document_version`, `document_hash` | Link decisions to off-chain evidence versions. |

Key-level endorsement policies are ledger metadata. Fabric also maintains block and transaction metadata, signatures, endorsements, validation indicators, and channel configuration; the application need not duplicate all of those as its own records. [T2, T3]

An effective KYC status records an authorized decision. It does not establish that the original identity evidence was genuine.

## 9. Roles and the boundary of DLT protection

PostgreSQL may contain application roles for navigation, endpoint access, and cached displays. However, changing a PostgreSQL `role` field must not independently authorize privileged ledger actions.

For relevant chaincode functions, check authenticated Fabric identity, MSP membership, controlled certificate attributes where used, and the proposed active role registry. Example Go identity APIs include `GetID`, `GetMSPID`, and `GetAttributeValue`. A request argument such as `isAdmin=true` is not proof of authority. [T1]

Proposed role-management operations, such as `GrantRole` and `RevokeRole`, must require an authorized role administrator established through trusted bootstrap. Changing roles through a valid transaction is allowed and auditable; current state is not permanently frozen.

If every user action is signed with one powerful backend identity, chaincode sees that service identity rather than the individual end user. Separate issuer, staff, and retail-service credentials and constrain their functions. Where a retail service acts for customers, explicitly document that customer authentication and account ownership still depend on the backend. End-user signing can be future work.

DLT does not automatically secure PostgreSQL, establish KTP authenticity, or protect documents from an administrator. If one party controls every organization, credential, and application component, genuinely independent governance has not been demonstrated.

## 10. Endorsement design

The assumption that Fabric only permits one endorsement for all transactions was corrected. A chaincode definition has a default endorsement policy, but collection-level and state-based policies can override it for relevant data. One policy can require multiple organizations. Merely placing several contracts inside one chaincode does not give each contract its own default policy. [T3, T5]

Keep three layers separate:

| Layer | Responsibility |
| --- | --- |
| Caller authorization | Decide who may invoke a function. |
| Business approval | Decide which authorized people must consent to a specific action. |
| Peer endorsement | Require specified organizations' peers to endorse execution results. |

Recommended initial approach: one channel and one chaincode with SBE on balance keys. The following is an experimental design, not an official BI policy. A and B are simplified intermediary organizations.

| Key | SBE policy |
| --- | --- |
| `wholesale:A` | `AND('BIMSP.peer', 'AMSP.peer')` |
| `wholesale:B` | `AND('BIMSP.peer', 'BMSP.peer')` |
| `retail:A:u1` | `'AMSP.peer'` |
| `retail:B:u2` | `'BMSP.peer'` |

| Transfer updating both balance keys | Required organizations under this example |
| --- | --- |
| Wholesale A to wholesale B | BI, A, B |
| Wholesale A to retail at A | BI, A |
| Retail at A to retail at B | A, B |
| Retail to retail within A | A |

All policies of written keys must be satisfied. Other written keys, such as logs, proposals, or a shared total-supply key, can change the required endorsement set. Reading a public KYC state alone does not require its key-level endorsement policy to be satisfied.

Set SBE during bootstrap or wallet creation using `SetStateValidationParameter`. The Go `statebased` package can construct policy bytes. Initial installation is validated under the previously applicable default policy; subsequent policy changes must satisfy the existing key policy. A new policy cannot be treated as already protecting the transaction that installs it. Restrict policy-management functions and evaluate the default policy for keys without SBE. [T3, T9]

Fabric Gateway can gather endorsements according to the runtime requirements. Selecting organizations on the client does not override validator requirements. Check valid commit status rather than treating submission as success. [T4]

Separate wholesale and retail chaincodes on the same channel are an alternative, with additional lifecycle and cross-chaincode policy complexity. Splitting channels solely to differentiate endorsement is not the recommended baseline because it complicates cross-channel settlement. Any wholesale-to-retail conversion should preserve modeled value rather than independently minting money at the intermediary.

## 11. Business approval workflow

Where multiple staff roles must approve an action, implement explicit ledger state rather than assuming peer endorsement proves human consent:

1. `Propose`: record immutable proposal details and `PENDING` status without immediately transferring balances.
2. `Approve`: accept distinct authorized approvers; bind approval to the exact source, destination, amount, and transaction type. Prevent duplicate approvals and apply separation of duties where the research policy requires it.
3. `Execute`: recheck active roles, approvals, status, KYC, balance, and limits; update balances and settlement status atomically.
4. `Reject` / `Expire`: close unexecuted proposals. If funds are reserved, explicitly model reservation and release.

Changing proposal details invalidates old approvals. Prevent replay and double execution. Normal retail transfers do not automatically require manual consent from a recipient, BI officer, or compliance reviewer. State any such requirements as justified research rules unless an applicable source explicitly requires them.

## 12. Component-by-component differences and implementation targets

The “difference” column describes the move from the reported baseline or earlier assumption to the recommended design. It does not assert the current code has those weaknesses.

| Component | Known baseline / earlier assumption | Proposed difference | Verification status |
| --- | --- | --- | --- |
| Chaincode | Fabric selected; actual functions unknown. | Enforce effective KYC/wallet state, balances, active staff authority, and selected limits using ledger state. | Design recommendation; no code audit. |
| Chaincode endorsement | Concern that one policy must apply identically to every transaction. | Use SBE per balance key and account for every key written. | Fabric capability verified; prototype implementation unknown. |
| Chaincode approvals | Multi-role approvals discussed. | Add proposal/approval/execution state only where needed; distinguish human approval from endorsement. | Proposed workflow. |
| Backend | Go and PostgreSQL selected; implementation details unknown. | Own onboarding, off-chain evidence, simulated verification, screening, case review, identity selection, and Fabric submissions. | Design recommendation; no code audit. |
| Backend authorization | Concern about changing off-chain roles. | Do not derive privileged signing rights solely from editable DB fields or request claims. | Proposed security requirement. |
| Backend synchronization | No existing synchronization behavior established. | Separate review status from effective ledger status; update cache after valid commits and reconcile failures idempotently. | Proposed integration requirement. |
| Document storage | Object storage was previously suggested as an implemented component. | Keep PostgreSQL `bytea` for synthetic document uploads; move object storage to future work. | Latest explicit user instruction. |
| Frontend | Register and login pages reported built. | Add KYC submission, reviewer views, wallet/transfer screens, and restricted case/audit views as scope permits. | Existing two pages reported; additions unverified. |
| Thesis scope | Broad compliance evaluation initially considered. | Evaluate selected KYC/AML/CFT controls with traceability, simulations, and explicit exclusions. | Recommended framing, not a reviewed manuscript edit. |
| Benchmarking | Composer initially named as benchmark tool. | Clarify or use Caliper for performance measurement; separate performance from control correctness. | Tool clarification; no benchmark results reviewed. |

### Chaincode targets

Possible operations include `CreateWallet`, `SetKYCStatus`, `BlockWallet`, `UnblockWallet`, `Transfer`, `GrantRole`, `RevokeRole`, and restricted policy configuration. Add wholesale conversion or proposal functions only if they are implemented and evaluated within scope. These names are examples, not existing APIs.

Do not call external KYC services or PostgreSQL from chaincode to make authoritative decisions. Perform external processes in the backend and submit authorized outcomes; chaincode checks caller authority and ledger conditions. Test conservation of value, insufficient balances, prohibited wallet states, cumulative limits where included, and concurrent updates.

### Backend targets

Implement complete input validation, restricted document access, secure password handling, review evidence, versioned rule execution, appropriate credential separation, and failure handling. Keep `kyc_review_status` distinct from `kyc_status_effective`. A completed review may still await or fail ledger commitment. Reconcile caches by transaction identity/version without executing a business action twice.

### Frontend targets

Add a KYC form, synthetic-document upload, submission status, authorized review screens, wallet balances and transfers, and case/audit views where included. Display real backend/ledger outcomes and clearly label simulations. Hiding a button is not authorization enforcement. Show pending/failed commitment accurately and avoid exposing confidential report details to retail users.

### Thesis targets

Revise title, objectives, scope, actor model, architecture, data model, control matrix, testing method, and claims to match the final implementation. Separate a primary one-PJP retail baseline from optional two-intermediary/wholesale scenarios. Describe unimplemented features as designs or future work, not completed contributions.

## 13. Evaluation scenarios

| Scenario | Expected result / evidence |
| --- | --- |
| Missing KYC fields or unavailable verification | No automatic activation. |
| Correct identity format but nonmatching verification | Verification fails or remains unresolved according to the chosen rule. |
| Similar screening names with different identifiers | Distinguish candidate matches and false positives. |
| Blocked wallet or insufficient balance | Transfer rejected. |
| Concurrent transfers near a cumulative limit | Limit and balance constraints remain satisfied. |
| PostgreSQL role changed to privileged staff | Ledger privilege is not gained solely by the DB edit; separately test off-chain access protection. |
| PostgreSQL KYC status changed to approved | Transfer still uses effective ledger status. |
| Forged role or `isAdmin=true` argument | Privileged action rejected. |
| Authorized role revocation | Subsequent privileged actions fail after valid commitment. |
| Missing required endorsement | No valid state update; distinguish endorsement failure from an invalid committed transaction. |
| Unauthorized SBE weakening | Policy change rejected. |
| Altered proposal, repeated approval, or repeated execution | Old consent cannot authorize modified payloads; duplication is rejected. |
| Document bytes/reference changed | Ownership checks and integrity checks detect the applicable problem. |
| Ledger commit succeeds but PostgreSQL cache update fails | Reconciliation restores the cache without duplicate business execution. |
| Retail access to restricted cases/reports | Access denied. |

Measure functional correctness against expected synthetic scenarios. Precision/recall or false-positive/false-negative measures are appropriate only for labeled screening or detection tests. Synthetic-data results do not establish real-world detection effectiveness.

Measure throughput, latency, and success rate separately. A ledger-only workload does not measure registration, document upload, PostgreSQL access, or full application latency. Object-storage performance is excluded because object storage is future work. [T8]

## 14. Scope exclusions and future work

Proposed baseline exclusions: custom AI training, live Dukcapil integration, real-document authenticity verification, biometrics/liveness, actual PPATK/goAML submission, production deployment, complete institutional compliance certification, and comprehensive production security assessment.

If proliferation-financing prevention is excluded while the selected regulations also address it, state that exclusion explicitly. Beneficial-owner and represented-party workflows are outside the simplified “individual acting for themselves” model rather than implicitly satisfied.

Future work includes private object storage; optional pretrained OCR with confirmation; authorized external verification; stronger key management and end-user signing; additional intermediaries; and recovery/availability evaluation. Object storage should be discussed under recommendations, not as a mandatory implemented research component.

## 15. Decisions still requiring the actual project

- Final thesis title and exact implemented control list.
- Nonbank PJP-only scope versus inclusion of banks and corresponding rules.
- One intermediary versus two, and whether wholesale/conversion flows are implemented or only explanatory.
- Fabric, Go libraries, Gateway, and Caliper version compatibility.
- Retail signing/authentication model and ownership checks.
- Exact data schema, default endorsement policy, and bootstrap governance.
- Which actions require business approval and which roles approve them.
- Final rule values, source versions, and evidence of completed tests.
- Actual differences from the chaincode, backend, frontend, and thesis files, once those files are reviewed.

## 16. References and existing deliverable

The current reference document is `Dasar_Aturan_KYC_AML_CFT_Rupiah_Digital.docx`. Its source catalog supports the conversation's legal/control mapping. This summary does not replace reading the full instruments or checking applicable amendments before final submission.

### Legal, policy, and CBDC sources

- **[L1]** Republic of Indonesia, Law No. 8 of 2010 on Money Laundering Prevention and Eradication: [government repository PDF](https://peraturan.bpk.go.id/Download/27793/UU%20Nomor%20%208%20Tahun%202010.pdf).
- **[L2]** Republic of Indonesia, Law No. 9 of 2013 on Terrorism Financing Prevention and Eradication: [OJK-hosted PDF](https://www.ojk.go.id/apu-ppt/id/peraturan/pojk/Documents/UU_9_2013_pendanaan-terorisme.pdf).
- **[L3]** Bank Indonesia Regulation No. 10 of 2024: [official regulation page](https://www.bi.go.id/id/publikasi/peraturan/Pages/PBI_102024.aspx).
- **[L4]** Bank Indonesia Board of Governors Regulation No. 15 of 2025: [official regulation page](https://www.bi.go.id/id/publikasi/peraturan/Pages/PADG_152025.aspx).
- **[L5]** OJK Regulation No. 8 of 2023, relevant where institutions fall within its scope: [official page](https://ojk.go.id/apu-ppt/id/peraturan/pojk/Pages/POJK-8-2023-.aspx).
- **[L6]** PPATK Regulation No. 1 of 2021 on reporting through goAML: [government regulation page](https://peraturan.go.id/id/peraturan-ppatk-no-1-tahun-2021).
- **[L7]** Republic of Indonesia, Law No. 27 of 2022 on Personal Data Protection: [government repository PDF](https://peraturan.bpk.go.id/Download/224884/UU%20Nomor%2027%20Tahun%202022.pdf).
- **[L8]** FATF: [Recommendations](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html) and [Guidance on Digital Identity](https://www.fatf-gafi.org/content/dam/fatf/documents/recommendations/Guidance-on-Digital-Identity.pdf). International guidance should not be represented as directly applicable Indonesian legislation.
- **[L9]** IMF, *Financial Integrity Implications of Retail Central Bank Digital Currencies (rCBDCs)*, Fintech Notes 2025/010: [paper](https://www.imf.org/en/publications/fintech-notes/issues/2025/11/14/financial-integrity-implications-of-retail-central-bank-digital-currencies-rcbdcs-571769). Contextual literature, not a source of Indonesian legal duties.
- **[L10]** Bank Indonesia, Project Garuda / Digital Rupiah: [official portal and linked publications](https://www.bi.go.id/id/rupiah/digital-rupiah/default.aspx).

### Technical sources

- **[T1]** Fabric Chaincode Go: [Client Identity library](https://github.com/hyperledger/fabric-chaincode-go/blob/main/pkg/cid/README.md).
- **[T2]** Hyperledger Fabric: [Ledger](https://hyperledger-fabric.readthedocs.io/en/latest/ledger/ledger.html).
- **[T3]** Hyperledger Fabric: [Endorsement policies](https://hyperledger-fabric.readthedocs.io/en/latest/endorsement-policies.html).
- **[T4]** Hyperledger Fabric: [Fabric Gateway](https://hyperledger-fabric.readthedocs.io/en/latest/gateway.html).
- **[T5]** Hyperledger Fabric: [Smart Contracts and Chaincode](https://hyperledger-fabric.readthedocs.io/en/release-2.5/smartcontract/smartcontract.html).
- **[T6]** PostgreSQL: [Binary Data Types](https://www.postgresql.org/docs/current/datatype-binary.html).
- **[T7]** Tesseract: [User Manual](https://tesseract-ocr.github.io/tessdoc/).
- **[T8]** Hyperledger Caliper: [official project repository](https://github.com/hyperledger-caliper/caliper).
- **[T9]** Fabric Chaincode Go v2: [statebased package](https://pkg.go.dev/github.com/hyperledger/fabric-chaincode-go/v2@v2.3.0/pkg/statebased).

