---
source_type: pdf
title: "Supporting Literature and Design Analysis for a Bank Indonesia Thesis on Blockchain-Based Digital Mo"
original_file: "thesis/reference/Supporting Literature and Design Analysis for a Bank Indonesia Thesis on Blockchain-Based Digital Mo.pdf"
sha256: "c707dccd6b165ff5f33b5a0bb7941b4907d40a49667e6bda2efa4fd278f0c410"
page_count: 17
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Supporting Literature and Design Analysis for a Bank Indonesia Thesis on Blockchain-Based Digital Mo

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Supporting Literature and Design Analysis for a
Bank Indonesia Thesis on Blockchain-Based Digital
Money with Hyperledger Iroha
Executive Summary
The strongest direct support for your thesis comes from four source clusters: Bank Indonesia’s own Project
Garuda materials; design papers from Bank for International Settlements 1 and International Monetary
Fund 2 ; official Hyperledger Iroha and other platform documentation; and a smaller set of academic
papers on CBDC architecture and permissioned blockchain performance. Taken together, these sources
strongly support a thesis that simulates Bank Indonesia’s wholesale-Rupiah-Digital immediate-state
business process on a permissioned ledger, provided the thesis is explicit that it is a research simulation
and not evidence that Bank Indonesia has selected Hyperledger Iroha for production. Bank Indonesia’s
public materials currently present a staged roadmap, a wholesale immediate state, and a 2024 proof of
concept for issuance, redemption, and fund transfer, but they also explicitly state that the two technologies
tested in the PoC do not commit Bank Indonesia to those platforms for later phases. 3
For your specific platform choice, Hyperledger Iroha 2 is defensible for an undergraduate prototype
because it supports private-permissioned deployment, manual peer onboarding, flexible permission
tokens, explicit accounts/domains/assets, event triggers, multisignature operations, an HTTP/WebSocket
API, and developer-facing SDKs in Python, Rust, Kotlin/Java, and JavaScript. Those characteristics map well
to a thesis that needs to model issuance authority, participant onboarding, bank-to-bank transfer, audit
events, and back-end integration without the full operational complexity of a production CBDC stack. The
main caution is maturity: official project reports show that Iroha 1 is no longer actively maintained, while
Iroha 2 is a Rust rewrite with active progress but is still a newer codebase and is not backward compatible
with Iroha 1. 4
Bank Indonesia’s public documents support a thesis structure centered on the Immediate State. In those
materials, the public design focus is a wholesale cash ledger with basic functions of issuance, redemption/
destruction, and fund transfer; access is permissioned; distribution in the immediate state is one-tier;
transfer processing, gridlock, and settlement finality are recognized as core design questions; hot wallets
are mandatory while cold wallets are optional; and BI’s PoC tested administrative roles such as validating,
non-validating, observer, regulator, provider, and no-node participation. The PoC further concludes that DLT
can support the wholesale cash-ledger business model, that smart contracts add value through
programmability/composability/tokenization, and that interoperability with conventional systems and ISO
20022 messaging is central. 5
The most important analytical conclusion is that Iroha is a good simulation platform for the businessprocess layer, but not yet the most naturally aligned production analogue to Bank Indonesia’s public
PoC. Bank Indonesia’s PoC used Corda and Hyperledger Besu, partly because those platforms directly
exposed strong privacy and smart-contract design trade-offs that were relevant to BI’s criteria. A rigorous

1

## Page 2

thesis should therefore present Iroha as a deliberate research choice for a prototype implementation and
should strengthen that choice with at least one comparator experiment, preferably against Hyperledger
Besu or Hyperledger Fabric, plus an explicit discussion of where Iroha fits well and where it does not. 6
Several critical details remain unspecified in public Bank Indonesia materials and should be labeled as
such in the thesis: the final production platform; exact validator topology and target decentralization level;
exact KYC workflow; quantitative SLA or performance targets; final privacy technology; exact offline design;
and the final division of responsibilities between BI, wholesalers, and other intermediaries in later stages.
The public record also says that future work is needed on privacy, liquidity-saving mechanisms, and multivalidator deployment. 7

Source Base and Research Quality
This report prioritizes official/primary sources first: Bank Indonesia’s Project Garuda portal, consultative and
PoC documents, official Hyperledger and platform documentation, BIS reports, central-bank technical
papers, and only then academic and conference papers. English official BI materials exist for the Project
Garuda portal and PoC report, while Indonesian official sources also exist for the white paper, consultative
paper, public consultation report, and Indonesian PoC report. 8
A caveat is necessary for the IEEE-first portion of your requested search order. Direct access to some IEEE
Xplore pages was blocked in this environment, so some IEEE paper metadata had to be verified through
DOI landing pages or accessible secondary metadata pages. I therefore treat official institutional
documents and directly accessible academic full texts as the highest-confidence evidence, and I use
inaccessible-IEEE metadata conservatively. This matters most for Han et al. and Zhang et al., which are still
relevant, but which should be downloaded from your university library before final thesis writing.
The source base is strong enough to support a rigorous undergraduate thesis because the direct BI
materials define the business-process problem; BIS and central-bank reports define accepted CBDC design
principles; official platform docs define implementable technical features; and academic sources support
architectural choices and benchmarking methodology. 9

Core Literature and What It Contributes
The table below identifies the most relevant sources and explains how each one supports the thesis.

Source

Bank Indonesia, Project
Garuda portal and
document hub 10

Type

Main contribution

Why it supports your
thesis

Official
central-bank
portal

Defines the three-stage
roadmap; clarifies that the
immediate state is wholesalefocused; states that PoC
technologies are not a final
production commitment

This is the authoritative
framing source for your
thesis scope and for any
claim about what BI has
and has not decided

2

## Page 3

Source

Bank Indonesia,
Wholesale Rupiah
Digital Cash Ledger –
Consultative Paper 11

Bank Indonesia, Proof
of Concept Report
(2024) 12

BIS, Foundational
principles and core
features 13

BIS, CBDC system
design 14

BIS, Project Rosalind
15

BIS, Project Dunbar

16

Type

Main contribution

Why it supports your
thesis

Official
central-bank
consultative
paper

Describes immediate-state
functionality: access,
issuance/destruction,
transfer, gridlock, settlement
finality, technical/3i concerns,
wallets, permissioned DLT,
PoA assumptions

Best source for deriving
a BPMN/process model
and for identifying
which business-process
elements your
simulation should
implement

Official
central-bank
technical
report

Reports that Corda and Besu
were tested across 55
scenarios; confirms issuance/
redemption/transfer focus;
shows node roles, observer/
admin mechanisms, API and
ISO 20022 integration, and
future exploration areas

Best direct evidence for
which BI process details
are public, what was
actually tested, and
what future gaps exist

Official
multilateral
policy report

Defines the canonical CBDC
principles: no harm to
monetary/financial stability,
coexistence with cash/private
money, innovation and
efficiency

Use this to justify your
design criteria and
evaluation chapter

Official
technical
design report

Explains modular/two-tier
architectures, privacy tradeoffs, PET limits, and offlinefunction trade-offs

Supports your
architecture discussion
and any claim that
business-process design
and ledger design
should be separated

Official CBDC
prototype
report

Demonstrates an API layer
between central-bank ledger
and private interfaces; tests
both account- and tokenbased ledgers using Besu and
Fabric simulations; includes
offline APIs and privacy
assumptions

Particularly useful if you
want to “improve the
Garuda whitepaper” by
adding a more explicit
API/back-end/serviceprovider architecture

Official
wholesaleCBDC
prototype
report

Shows how a common ledger
can reduce reconciliation,
simplify settlement, and
centralize parts of compliance
and conditional settlement

Strong support for your
reconciliation/reporting
rationale and for smartcontract-based
settlement workflow
arguments

3

## Page 4

Source

Type

Main contribution

Why it supports your
thesis

BIS, Using CBDCs across
borders 17

Official crossborder CBDC
synthesis

Compares common-platform
and subnetwork
interoperability models
across projects

Helps position BI’s
intermediate and endstate ambitions in the
broader design space

Peer-reviewed
academic
paper

Reviews functional and nonfunctional CBDC
requirements and concludes
permissioned blockchain is
more suitable than
permissionless blockchain

Direct academic support
for your use of a
permissioned ledger
rather than public
Ethereum-like networks

IEEE
conference
paper

Early framework paper for
blockchain-based CBDC
architecture

Useful as a foundational
academic citation for
your literature review
and design-model
section

IEEE Access
paper

Proposes a hybrid CBDC
model; widely cited in CBDC
design literature

Useful when discussing
account-based versus
token/UTXO/hybrid
architecture choices

Compares Fabric, Sawtooth,
and Iroha under a common
evaluation lens

Best academic source in
your collected set for
discussing why platform
selection should be
benchmarked, not
assumed

Historical Iroha consensus
paper with proofs and
empirical scaling discussion

Helpful background for
Iroha’s lineage, though
your implementation
should prefer Iroha 2
documentation over
Iroha 1-era assumptions

Tao Zhang and
Zhigang Huang,
Blockchain and central
bank digital currency
18

Xuan Han, Yong Yuan,
and Fei-Yue Wang, A
Blockchain-based
Framework for Central
Bank Digital Currency
19

Jinnan Zhang et al., A
Hybrid Model for
Central Bank Digital
Currency Based on
Blockchain 20
Arnold Woznica and
Michal Kedziora,
Performance and
Scalability Evaluation of
a Permissioned
Blockchain Based on the
Hyperledger Fabric,
Sawtooth and Iroha 21

YAC: BFT Consensus
Algorithm for
Blockchain 22

Peer-reviewed
performance
paper

Original
technical
paper

4

## Page 5

Source

Hyperledger Iroha 2
docs and project
reports 23

Bakong official white
paper snippet and
LFDT case study on
National Bank of
Cambodia 24 25

Type

Main contribution

Why it supports your
thesis

Official
platform docs

Defines current Iroha 2
features: Rust rewrite,
Sumeragi BFT, permission
tokens, private mode, Torii
API, triggers, ISI/WASM, SDKs,
multisig; also documents
current project-health status

This is the primary
source for defending —
and qualifying — the
Iroha choice

Shows a real Iroha-based
central-bank-operated digital
money/payment deployment
in production

Important because it
provides a real-world
Iroha reference,
although it is not a
wholesale-CBDC
equivalent to BI’s
immediate-state design

Official/casestudy evidence

What the source set says, analytically
Across the official CBDC literature, a clear pattern emerges: central-bank digital money systems are usually
discussed as permissioned, role-segregated, API-intensive, and interoperable with existing payment
rails, with privacy and compliance implemented through architecture decisions rather than left to the
ledger alone. BIS reports emphasize modular design, two-tier boundaries, ecosystem APIs, privacy tradeoffs, and interoperability. Bank Indonesia’s materials fit this pattern almost exactly: the public documents
emphasize 3i, BI-RTGS interconnection, messaging standards, node roles, and future work on privacy and
liquidity management. 26
This matters for your thesis because it means the quality of the work will depend less on raw blockchain
mechanics and more on whether you can convincingly simulate the business process and control model:
who issues, who validates, where reserves/giro conversion happens, how reporting is generated, what data
observers see, and how back-end services bridge conventional systems to the ledger. That is also why BI’s
PoC spent substantial attention on observer nodes, administrator roles, bridge integrations, message
formats, and smart-contract programmability rather than only on pure consensus. 27

Bank Indonesia Process Mapping to Hyperledger Iroha
Public BI process elements and what remains unspecified
From the public BI material, the highest-confidence process scope is the Immediate State wholesale cash
ledger. Publicly documented elements include one-tier wholesale distribution, issuance, redemption/
destruction, fund transfer, validating/non-validating/no-node participation modes, smart-contract-based
transaction logic, administrative functions, observer supervision, interoperability with BI-RTGS, and the use
of ISO 20022 as a target messaging standard. Publicly discussed but not fully specified elements include
gridlock resolution rules, liquidity-provider design, exact settlement-finality rules in law and operations,
identity/KYC service design, privacy-enhancing technology choice, and offline behavior. 28

5

## Page 6

For thesis purposes, that means you should model the specified core and label the rest as assumed
simulation rules. That is academically stronger than pretending the unspecified parts are final BI policy.

Process-to-feature mapping
BI businessprocess
element

Issuance

Public BI evidence

Consultative paper and
PoC show issuance
through reserve/giro
conversion and a BIoperated KDR-like gate;
issuance can be RTGStriggered or platformtriggered.

Hyperledger Iroha
mapping

Implementation notes for your
thesis

Use a privileged BI
issuer account and a
single widr#bi asset

Implement an RTGS bridge
simulator: off-chain service
verifies reserve transfer, then
submits Mint + Transfer

definition; only BI can
Mint ; use multisig
for issuance approval.

29

to Iroha. This best matches
BI’s documented bridge logic.
30

Use roles such as issuer ,
wholesaler ,

Immediate state is onetier; wholesalers and
non-wholesalers can
obtain w-Rupiah Digital
directly from BI. 31

Model BI-to-bank
transfer directly, with
separate domains or
roles for wholesalers/
non-wholesalers.

Fund transfer

BI’s CP and PoC treat
fund transfer as a core
basic function;
validating authority can
be distributed for
transfers. 33

Use Iroha asset
transfers between
participant accounts.
Finality occurs on
block commit.

Add optional triggers for
queue release and priority
handling, but explicitly label
gridlock logic as a simulation
assumption because BI has
not finalized it publicly. 34

KYC/AML

Public BI PoC says
observer capabilities
support AML/CFT; CP
asks how identity
services should balance
privacy, traceability,
and illegal-transaction
monitoring. Detailed
workflow is not publicly
specified. 35

Keep KYC/AML
primarily off-chain.
On-chain, store only a
status hash, whitelist
flag, risk score, or
reference ID in
metadata.

Best design: onboarding
service validates participants,
then registers Iroha accounts
only for approved entities;
observer/reporting service
subscribes to transactions and
feeds AML analytics. Do not
store raw PII on-chain. This is
an inference from BI and
Rosalind privacy patterns. 36

Distribution

6

nonwholesaler ,
observer , regulator ,
provider . In the thesis,
state that later retail-tier
distribution is outside current
scope. 32

## Page 7

BI businessprocess
element

Public BI evidence

Settlement
finality

CP explicitly highlights
settlement finality as a
core question; PoC
reports DLT can
support the moneysupply process and
interbank transfer. 37

Reconciliation

BI documentation ties
DLT to more efficient
processing and notes
interoperability with
conventional systems;
Dunbar shows common
ledgers can greatly
reduce reconciliation.

Hyperledger Iroha
mapping

Implementation notes for your
thesis

In Iroha 2, treat block
commitment under
Sumeragi as final
settlement for the
simulated ledger state.

State clearly that this is ledger
finality inside the prototype,
not a legal-finality opinion for
BI systems. For thesis rigor,
distinguish technical finality
from legal settlement finality.
38

Use block stream +
query APIs to
materialize a reporting
database; compare onchain balances against
emulated RTGS
omnibus balances.

Add daily reconciliation
reports: minted, burned,
outstanding, transfers,
exceptions. This is a major way
to make the thesis look like a
central-bank back-end
simulation rather than a
generic blockchain demo. 40

Implement an
observer/audit
service consuming
Torii events and
blocks; regulator
accounts can have
query/report privileges
but no transfer rights.

Keep the analytical report
store off-chain for
convenience, but derive it
deterministically from onchain events. This mirrors BI’s
architecture emphasis on roles
and data capture. 42

Use permission
grants/revokes, role
reassignment,
metadata flags, or
account suspension
logic backed by
triggers.

Exact suspension semantics
are not built-in as a named BI
feature in Iroha docs; model
them through role revocation
and policy checks.

For Iroha, represent
cold-wallet behavior as
offline key custody or
staged signing, not as
fully offline payment
settlement.

If you include offline
scenarios, frame them as
experimental extensions,
informed by Rosalind’s offline
API patterns, not as BI’s
current defined immediatestate process. 45

39

Reporting and
audit

BI PoC includes
observer nodes and
granular transaction
capture for supervision,
monetary analysis,
stability monitoring,
and AML/CFT support.
41

Administrative
control

BI PoC lists onboarding,
freeze, unfreeze, and
off-boarding via
administrator node.
43

Wallets and
cold/offline
storage

CP says hot wallet is
mandatory; cold wallet
is optional. Operational
offline payment design
is not specified for BI
immediate-state
wholesale use. 44

7

## Page 8

BI businessprocess
element

Privacy

Public BI evidence

Hyperledger Iroha
mapping

Implementation notes for your
thesis

BI PoC highlights
privacy criteria, future
ZKP exploration, and
trade-offs between
Corda-like need-toknow models and EVMlike global-state
models. 46

Iroha gives
permissioning, query
control, metadata
control, and off-chain
integration points, but
the collected docs do
not show a built-in BIstyle PET stack or
wholesale need-toknow privacy model.

For a rigorous thesis, say
plainly that privacy beyond
role-based restriction will
require off-chain design and is
a limitation of the prototype
unless you add additional
cryptographic mechanisms.

Suggested system architecture for the thesis
flowchart LR
RTGS[BI-RTGS / reserve simulator]
Bridge[RTGS bridge service]
Admin[BI admin & membership service]
AML[Off-chain KYC AML service]
Report[Observer / audit / reporting DB]
API[Application API layer]
subgraph IROHA[Hyperledger Iroha network]
BI[BI issuer account]
B1[Wholesaler bank account]
B2[Non-wholesaler / participant account]
Trig[Triggers / multisig / permissions]
end
RTGS --> Bridge
Bridge --> API
Admin --> API
AML --> API
API --> IROHA
IROHA --> Report
This architecture is directly aligned with BI’s emphasis on bridge connectivity, controlled participant roles,
observer functions, and a separation between ledger logic and surrounding payment-system services. It
also mirrors the API-layer thinking seen in Project Rosalind, which is useful if your thesis claims to improve
or operationalize parts of the Garuda white paper. 47

8

## Page 9

Example sequence for issuance
sequenceDiagram
participant Bank as Participant bank
participant RTGS as RTGS reserve simulator
participant Bridge as RTGS bridge
participant BI as BI issuer on Iroha
participant Net as Iroha validators
participant Obs as Observer/reporting
Bank->>RTGS: move reserve/giro to technical account
RTGS-->>Bridge: issuance confirmation
Bridge->>BI: submit mint + transfer request
BI->>Net: signed transaction
Net-->>Bank: committed balance update
Net-->>Obs: event/block stream for reporting
This sequence captures the core immediate-state issuance idea without pretending that your prototype is
BI’s actual operational design. It is the right level of abstraction for an undergraduate simulation. 48

Platform Comparison and Implications for the Iroha Choice
Before the table, one methodological caution: I am not presenting a fake apples-to-apples TPS chart across
all candidate platforms. Throughput and latency in permissioned DLT systems are highly sensitive to
workload, privacy mode, signature policy, validator count, hardware, and network topology. The strongest
public performance number gathered here from BI’s own work is that both tested PoC platforms were
capable of more than 30 transactions per second in the tested setup, while Federal Reserve Bank of Boston
49 ’s Project Hamilton research architecture demonstrated 170,000 tx/s in one design and 1.7 million tx/s in
another, but those are custom research architectures and are not directly comparable to Hyperledger/Corda
stacks. 50

9

## Page 10

Platform

Consensus /
finality

Hyperledger
Iroha 2

Sumeragi
BFT; blockcommit
finality in a
private
network

Hyperledger
Fabric

Mature
permissioned
enterprise
stack; official
docs
emphasize
channel/
policy/
orderer
architecture
rather than a
single simple
consensus
label in the
collected
sources

Hyperledger
Sawtooth

PBFT gives
deterministic
finality;
architecture
is modular
through
transaction
families

Permissioning
and identity

Private mode,
explicit
permission
tokens,
manual peer
registration

Asset and
contract
model

Privacy
features

Native
accounts/
domains/
assets/NFTs;
ISI + triggers
+ WASM;
multisig
available

Finegrained
permissions
and offchain
design
points; no
strong
primary
evidence in
collected
docs for BIstyle PET/
privacy
stack

MSP, X.509,
ACLs, channel
policies,
strong
organizational
segregation

Chaincode
smart
contracts;
strong
application
model

Channels
and private
data are
strong
privacy
advantages

Identity
transaction
family
enables role/
policy
permissions

Business
logic
implemented
in
transaction
families and
processors

Privacy is
less central
in the
collected
official
material
than in
Fabric/
Corda

10

APIs /
SDKs /
tooling

Maturity /
community

Ease
thesi

Torii HTTP/
WebSocket
API; SDKs
in Python,
Rust,
Kotlin/Java,
JavaScript

Attractive for
prototyping,
but Iroha 1 is
legacy and
Iroha 2 is
newer/pre-MVP
relative to
Fabric/Besu

High
goal
unde
simu
medi
goal
produ
align
engin

Gateway
APIs for
Go, Java,
Node;
extensive
enterprise
docs

Mature and
stable, with LTS
releases

High
comp
medi
want
thesi
imple
becau
chain
chan
comp

REST API;
custom
transaction
families

Official TOC
discussions
moved
Sawtooth
toward
archived/longtermmaintenance
status

Loweduc
usefu
curre
choic
Fabri
Iroha

## Page 11

Platform

Consensus /
finality

Corda

Notary-based
uniqueness
consensus;
strong
finality
model for
UTXO/state
workflows

Permissioned
Ethereum via
Hyperledger
Besu

QBFT/IBFTstyle PoA/BFT
finality in
private
networks

Permissioning
and identity

Vetted
network
identities and
certificates

Allowlists and
privatenetwork
configuration

Asset and
contract
model

Privacy
features

States,
contracts,
and flows fit
financialprocess
automation
well

Strong
privacy
model;
point-topoint
sharing and
enhanced
ledger
privacy

EVM smart
contracts;
Solidity;
strong token
standards

Private
contracts/
data
options
exist, but
BI’s PoC still
identified
meaningful
privacy
trade-offs
versus
need-toknow
models

APIs /
SDKs /
tooling

Maturity /
community

Ease
thesi

CorDapps,
flows,
enterprise
tooling

Mature
financial-sector
orientation; BI
already tested
it publicly

High
close
comp
heavi
more
speci
unde
build

JSON-RPC,
CLI, Docker
quickstarts,
strong EVM
tooling

Active
ecosystem and
operational
familiarity; BI
already tested
Besu-based
implementation
publicly

High
comp
for pr
align
progr
exper

Bottom-line platform judgment
If the thesis objective is “simulate BI wholesale digital-money business processes and reason about
back-end design choices”, Hyperledger Iroha 2 is a reasonable platform because it is expressive enough to
model roles, issuance, distribution, transfer, permissions, and audit events with relatively low conceptual
overhead. If the objective is “argue for the most production-aligned stack relative to BI’s current public
PoC”, Corda and Besu are better aligned with the present public evidence because BI actually tested them
and publicly discussed their privacy and infrastructure trade-offs. 55
The best thesis framing is therefore:
“This thesis uses Hyperledger Iroha 2 as a controlled research platform to simulate and
analyze Bank Indonesia’s publicly documented wholesale Rupiah Digital immediate-state
business processes, while comparing the design implications against BI’s published Corda/
Besu proof-of-concept findings.”
That framing is accurate, defensible, and avoids overclaiming.

11

## Page 12

Recommended Citations Ranked by Relevance and Credibility
Rank

Recommended citation

Relevance

Credibility

Annotation

Very High

Your most important source.
Cite for actual public BI-tested
processes, node roles, 55
scenarios, smart-contract
conclusions, API/ISO 20022
integration, and future gaps.

1

Bank Indonesia, Wholesale
Rupiah Digital Proof of Concept
Report 56

2

Bank Indonesia, Project Garuda
portal and White Paper
summary 10

Very High

Very High

Cite for stage structure,
purpose, official status, and the
statement that current PoC
technologies do not commit BI
to a final platform.

3

Bank Indonesia, Wholesale
Rupiah Digital Cash Ledger –
Consultative Paper 57

Very High

Very High

Best source for turning BI’s
policy/business ideas into a
process model.

4

BIS, Central bank digital
currencies: foundational
principles and core features

Very High

Very High

13

Use for design criteria and
evaluation framework.

BIS, CBDCs – system design

14

Very High

Very High

Best source on architecture
modularity, privacy trade-offs,
and offline/PET caveats.

Very High

Essential if you add an API-layer
or service-provider architecture
to improve Garuda-style
documentation.

Very High

Primary source for defending
the technical choice of Iroha —
and for openly discussing
maturity caveats.

5

Very High

6

BIS, Project Rosalind

7

Hyperledger Iroha 2 official
docs and project reports 59

8

Tao Zhang and Zhigang
Huang, Blockchain and central
bank digital currency 18

High

High

Good academic source for why
permissioned blockchain is a
sensible CBDC design direction.

9

Arnold Woznica and Michal
Kedziora, Performance and
Scalability Evaluation of a
Permissioned Blockchain Based
on the Hyperledger Fabric,
Sawtooth and Iroha 60

High

High

Best comparative academic
source for why benchmarking
matters in platform selection.

58

High

High

12

## Page 13

Rank

Recommended citation

Relevance

Credibility

Annotation

10

Xuan Han, Yong Yuan, and FeiYue Wang, A Blockchain-based
Framework for Central Bank
Digital Currency 19

MediumHigh

MediumHigh

Useful early academic
architecture citation, especially
in literature review and
conceptual model sections.

MediumHigh

MediumHigh

Good academic support for
hybrid/account-token
architecture discussion.

Very High

Valuable for settlement/
reconciliation/compliance
arguments, especially if your
thesis looks ahead to
intermediate-state or crossborder design.

Very High

Useful comparator for how
central banks write technology
architecture papers separate
from policy papers.

Very High

Strong technical benchmark
reference for performance and
architecture thinking, not for
direct platform comparison.

MediumHigh

Important because it is the
clearest real-world Iroha-centralbank example in your source
set, but it is not a direct BI
wholesale-CBDC analogue.

11

Jinnan Zhang et al., A Hybrid
Model for Central Bank Digital
Currency Based on Blockchain
20

12

BIS, Project Dunbar

13

Bank of England 61 , Digital
Pound Technology Working
Paper 62

14

Federal Reserve Bank of
Boston 49 , Project Hamilton
Phase 1 63

15

16

Bakong white paper snippet
and LFDT case study 64

MediumHigh

Medium

Medium

Medium

Short citation strategy
If you need only a compact core bibliography for an undergraduate thesis chapter, the minimum defensible
package is:
• BI Consultative Paper
• BI PoC Report
• BIS foundational principles
• BIS system design
• Iroha official docs
• Zhang and Huang (permissioned blockchain suitability)
• Woznica and Kedziora (comparative benchmarking)
• Rosalind or Dunbar, depending on whether your emphasis is retail/API architecture or wholesale
settlement

13

## Page 14

Gap Analysis and Experiments That Would Strengthen the Thesis
The public BI materials leave several research gaps that your thesis can usefully fill at prototype level. The
biggest ones are not conceptual; they are operational: bridge workflows, role mapping, reporting
pipelines, queue/gridlock logic, privacy leakage, and performance under realistic back-end behavior. BI’s
own PoC says future exploration is needed on privacy, liquidity-saving mechanisms, and multi-validator
deployment. That is an invitation for a thesis to do disciplined simulation work. 65
Proposed
experiment

What to simulate

Metrics

Why it matters

Immediatestate core
workflow

Issuance, redemption,
fund transfer, freeze/
unfreeze, off-boarding,
observer reporting

Success rate, end-toend completion time,
reconciliation
mismatch count

Proves that your prototype
implements BI’s publicly
documented core process
rather than a generic token
demo

RTGS bridge
experiment

Reserve transfer
confirmation from a BIRTGS emulator to Iroha
mint/burn actions

Bridge latency,
message failure rate,
idempotency success,
retry behavior

BI’s official documents
repeatedly stress RTGS
interconnection and message
transformation; this is the
most important back-end
experiment. 66

Queue and
liquidity
experiment

Priority queues, transfer
holds, intraday liquidity
assumptions, token
borrowing, simple
gridlock resolution

Queue length, wait
time, rejected
transfers, fairness by
priority class

BI’s CP identifies gridlock and
liquidity questions but does
not finalize them; this is ideal
thesis territory. 67

Privacy and
compliance
experiment

Whitelist onboarding,
hashed KYC metadata,
observer-only visibility,
AML event feed

Unauthorized-field
exposure count, event
leakage count, AML
alert latency

Demonstrates that privacy/
auditability is an architecture
problem, not only a ledger
problem. 68

Validator
scaling / fault
test

4, 7, 10 peers; singlepeer failure; observer
load; multisig overhead

p50/p95/p99 latency,
commit time, CPU/
memory, recovery
time

Needed because BI highlights
resilience, multi-validator
exploration, and performance.

Comparator
benchmark

Same issuance/transfer
workload on Iroha and
one comparator, ideally
Besu or Fabric

Throughput, latency
distribution,
deployment
complexity, code
volume, operational
complexity

14

69

Turns the platform choice
from preference into evidence.
Use a standard metrics
framework for reporting. 70

## Page 15

Proposed
experiment

What to simulate

Metrics

Why it matters

Offline
extension

Limited-value offline
wallet or signed voucher
with later
synchronization

Double-spend rate,
sync conflict rate, max
safe offline value,
replay rejection

BI public wholesale
documents do not define
operational offline design; this
becomes a clearly labeled
exploratory add-on. Rosalind
is a good reference point. 45

Suggested datasets and workloads
Use synthetic data, not real banking data. Public BI documents do not specify public benchmark datasets,
so your dataset should be stated as a research artifact. A good workload design would include:
• 1 central-bank issuer account
• 3–10 wholesaler banks
• 10–100 non-wholesaler or no-node participants
• issuance/redemption events from an RTGS emulator
• high-value, low-volume transfer bursts
• queue scenarios with priority classes
• freeze/unfreeze/off-boarding events
• observer and reporting subscriptions
That dataset is both manageable and aligned to BI’s documented immediate-state functions.

A practical thesis evaluation rubric
A strong thesis should evaluate the prototype on four dimensions:
Dimension

Passing evidence

Functional
correctness

All immediate-state flows execute and reconcile correctly

Governance fidelity

Roles and permissions match BI-style issuer/admin/observer/regulator
separation

Back-end realism

RTGS bridge, reporting, and AML/support services are implemented or
convincingly emulated

Technical
justification

Iroha is benchmarked or at least explicitly compared against one alternative
platform

Open Questions and Limitations
The public BI material reviewed here does not provide a final, fully operational specification for: exact KYC
workflow; exact participant onboarding data model; precise legal-finality mechanism; exact future validator

15

## Page 16

topology; final production platform; explicit target TPS/latency SLA; final privacy-enhancing mechanism; or
an operational wholesale offline-payment design. The documents instead show a staged, iterative program
with future exploration in privacy, liquidity management, and multi-validator deployment. 71
For IEEE papers, some metadata had to be verified through accessible DOI or secondary metadata pages
because direct Xplore access was unavailable in this environment. Those papers are still useful, but in your
final thesis bibliography you should replace any secondary-metadata access with your university-library
copy of the original publisher PDF.
Overall confidence in the conclusions of this report is Medium-High. The highest-confidence parts are the
Business-Process and CBDC-design sections grounded in official BI, BIS, and Hyperledger documentation.
The lowest-confidence parts are any production recommendation that would go beyond those public
materials, especially for privacy and performance, where your own prototype benchmarks should carry the
final argumentative weight.

1

15

45

49

58

https://www.bis.org/publ/othp69.pdf

https://www.bis.org/publ/othp69.pdf
2

9

13

26

https://www.bis.org/publ/othp33.pdf

https://www.bis.org/publ/othp33.pdf
3

5

7

8

10

71

https://www.bi.go.id/en/rupiah/digital-rupiah/default.aspx

https://www.bi.go.id/en/rupiah/digital-rupiah/default.aspx
4

23

38

59

61

https://docs.iroha.tech/get-started/iroha-2.html

https://docs.iroha.tech/get-started/iroha-2.html
6

12

27

35

39

41

43

46

47

50

55

56

65

66

69

https://www.bi.go.id/en/rupiah/digital-rupiah/

Documents/Laporan_POC_Proyek_Garuda_EN.pdf
https://www.bi.go.id/en/rupiah/digital-rupiah/Documents/Laporan_POC_Proyek_Garuda_EN.pdf

https://www.bi.go.id/id/rupiah/digital-rupiah/Documents/
Consultative_Paper_Rupiah_Digital_BI.pdf
11

28

29

31

33

37

44

48

57

67

68

https://www.bi.go.id/id/rupiah/digital-rupiah/Documents/Consultative_Paper_Rupiah_Digital_BI.pdf
14

https://www.bis.org/publ/othp88_system_design.pdf

https://www.bis.org/publ/othp88_system_design.pdf
16

https://www.bis.org/publ/othp47.pdf

https://www.bis.org/publ/othp47.pdf
17

https://www.bis.org/publ/othp51.pdf

https://www.bis.org/publ/othp51.pdf
18

24

https://www.sciencedirect.com/science/article/pii/S2405959521001399

https://www.sciencedirect.com/science/article/pii/S2405959521001399
19

https://dl.acm.org/doi/10.1109/SOLI48380.2019.8955032

https://dl.acm.org/doi/10.1109/SOLI48380.2019.8955032

16

## Page 17

20 https://www.researchgate.net/publication/
350665268_A_Hybrid_Model_for_Central_Bank_Digital_Currency_Based_on_Blockchain

https://www.researchgate.net/publication/350665268_A_Hybrid_Model_for_Central_Bank_Digital_Currency_Based_on_Blockchain
21

60

https://elib.mi.sanu.ac.rs/files/journals/csis/57/csisn57p659-678.pdf

https://elib.mi.sanu.ac.rs/files/journals/csis/57/csisn57p659-678.pdf
22

https://arxiv.org/abs/1809.00554

https://arxiv.org/abs/1809.00554
25

64

https://bakong.nbc.gov.kh/download/NBC_BAKONG_White_Paper.pdf

https://bakong.nbc.gov.kh/download/NBC_BAKONG_White_Paper.pdf
30

36

https://docs.iroha.tech/blockchain/instructions.html

https://docs.iroha.tech/blockchain/instructions.html
32

https://docs.iroha.tech/guide/configure/modes.html

https://docs.iroha.tech/guide/configure/modes.html
34

https://docs.iroha.tech/blockchain/trigger-examples.html

https://docs.iroha.tech/blockchain/trigger-examples.html
40

42

https://docs.iroha.tech/reference/torii-endpoints.html

https://docs.iroha.tech/reference/torii-endpoints.html
51

https://hyperledger-fabric.readthedocs.io/en/latest/gateway.html

https://hyperledger-fabric.readthedocs.io/en/latest/gateway.html
52

https://sawtooth.splinter.dev/docs/1.2/pbft/architecture.html

https://sawtooth.splinter.dev/docs/1.2/pbft/architecture.html
53

https://docs.r3.com/en/platform/corda/4.8/enterprise/key-concepts-notaries.html

https://docs.r3.com/en/platform/corda/4.8/enterprise/key-concepts-notaries.html
54

https://besu.hyperledger.org/

https://besu.hyperledger.org/

https://www.bankofengland.co.uk/-/media/boe/files/paper/2023/the-digital-pound-technology-workingpaper.pdf
62

https://www.bankofengland.co.uk/-/media/boe/files/paper/2023/the-digital-pound-technology-working-paper.pdf

https://www.bostonfed.org/-/media/Documents/Project-Hamilton/Project-Hamilton-Phase-1Whitepaper.pdf
63

https://www.bostonfed.org/-/media/Documents/Project-Hamilton/Project-Hamilton-Phase-1-Whitepaper.pdf
70

https://www.lfdecentralizedtrust.org/learn/publications/blockchain-performance-metrics

https://www.lfdecentralizedtrust.org/learn/publications/blockchain-performance-metrics

17
