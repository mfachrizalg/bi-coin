---
source_type: pdf
title: "Consultative-Paper-Rupiah-Digital-BI"
original_file: "thesis/reference/Consultative-Paper-Rupiah-Digital-BI.pdf"
sha256: "45410d2d4034c000ae1b25b2d2f333c180f41758b246e427e5d9314f29052c57"
page_count: 21
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Consultative-Paper-Rupiah-Digital-BI

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Consultative Paper

January 2023

Wholesale Digital Rupiah
Cash Ledger

## Page 2

BANK INDONESIA
Jalan M.H. Thamrin No. 2
Jakarta – 10350
Indonesia
This publication is available at BI website (www.bi.go.id).
Jakarta, 31 January 2023
© Bank Indonesia 2023. It is forbidden to quote, reproduce, and translate part or
all of the contents of this book without written permission from the Publisher.

## Page 3

CONTENTS
CONTENTS

PREFACE

3

4

BACKGROUND

5

THE W-DIGITAL RUPIAH DESIGN:
IMMEDIATE STATE

6

2.1 Overview of W-Digital Rupiah Design

6

2.2 W-Digital Rupiah Design for the
Immediate State

6

THE SCOPE OF PUBLIC
CONSULTATION

8

3.1 Functionality

8

3.1.1 Access

8

3.1.2 Issuance/Redemption

11

3.1.3 Funds Transfer

12

3.1.4 Technical Capabilities and 3I Aspects

13

3.2 General Considerations

14

3.2.1 Technology: Scalability and Resilience

14

3.2.2 Implications towards the Payment
System and Financial and Monetary
Systems

16

GLOSSARY

18

## Page 4

PREFACE

Bank Indonesia publishes this Consultative Paper (CP) regarding the
Digital Rupiah development plan as a follow-up to the publication of the
Garuda Project White Paper: Navigating the Digital Rupiah
Architecture. The issuance of this CP is an endeavor to begin public
discussions on the design of the Digital Rupiah.
This CP provides an overview of the Digital Rupiah design for the
first stage of its development (immediate stage), namely the wholesale
Digital Rupiah cash ledger which includes the introduction of the
technology and basic functionalities constituting the issuance, redemption,
and transference of funds. The design of the Digital Rupiah development
has taken into consideration benchmarks against best practices from
several countries that have conducted studies and experiments on
wholesale central bank digital currency.
In this regard, Bank Indonesia invites the inputs or views from all
relevant stakeholders based on this CP to improve the design of the Digital
Rupiah development. All inputs or views submitted should be
accompanied by a detailed explanation and/or supporting information.
Feedback can be submitted through the following methods:

Email to: Payment System Policy Department (proyekgaruda@bi.go.id)


Letter to: Payment System Policy Department – Bank Indonesia
D Building 5th Floor, Jl. MH Thamrin No.2, Jakarta 10350

## Page 5

1

BACKGROUND
On November 30, 2022, Bank Indonesia published
a white paper titled "Project Garuda: Navigating
the Digital Rupiah Architecture". The white paper
served as a form of public communication. The
publication also detailed the end-to-end
integrated high-level design configuration of
Digital Rupiah, its design features to enable the
development of new business models, its
technology architecture, and regulatory and policy
support for the implementation of the design.
Bank Indonesia will develop Digital Rupiah design
in stages within an iterative process enabling
broader exploration of design alternatives and
ensuring optimal benefit. The development of the
Digital Rupiah is divided into three stages. On the
first stage (immediate state), Bank Indonesia
develops wholesale Digital Rupiah (w-Digital
Rupiah) cash ledger (issuance, redemption, and
transference of funds use cases). On the next
stage (intermediate state), Bank Indonesia will
expand the w-Digital Rupiah use cases to include
broader types of financial market transactions.
Lastly, on the final stage (end state), Bank

Testing the applicability
of the prototype with a
sandbox
mechanism
(using
dummy
data).
Option for piloting is
open.

Indonesia will pilot the integrated end-to-end
design of w-Digital Rupiah and retail Digital
Rupiah (r-Digital Rupiah).
The development of the Digital Rupiah at each of
the stages would be pursued in sequences (Figure
1). Each sequence comprises public consultation in
the form of Consultative Paper (CP), proof of
concept, prototyping, piloting/sandboxing, and
review of the policy stance. Bank Indonesia takes
this approach to ensure the proper design of
Digital Rupiah. Bank Indonesia publishes this CP
as the implementation of the sequence. Presently,
for this CP, Bank Indonesia places a focus on the
first stage of Digital Rupiah development
(immediate state).
This CP is part of Bank Indonesia's efforts to
initiate public engagement on the Digital Rupiah
design. Stakeholder inputs and views are
expected, as they would become crucial elements
for reinforcing the design of Digital Rupiah in the
next sequence of its development.

PoC:
Concept
validation
before the development stage.

Iterative
Process

CONSULTATIVE PAPER

CP publication and FGDs to establish ownership
and stakeholders’ engagement

POLICY STANCE REVIEW

Policy stance review on Digital Rupiah
development based on sandboxing evaluation
results

Figure 1 Digital Rupiah Sequences

5

Prototyping: Development of
prototypes with a specific
scope.

## Page 6

2

THE W-DIGITAL RUPIAH DESIGN:
IMMEDIATE STATE
2.1

Overview of W-Digital Rupiah
Design

Digital Rupiah is a liability of Bank Indonesia to its
users issued in digital format. It is denominated in
Rupiah, that functions as a medium of exchange,
unit of account, and store of value. Digital Rupiah
is the realization of the mandate from the
Currency Act as amended by the Development
and Strengthening of Financial Sector Act (P2SK
Act) which states that the kind of Rupiah consists
of rupiah banknotes, rupiah coins, and digital
rupiah.
It will be issued in two types, wholesale Digital
Rupiah (w-Digital Rupiah) and retail Digital Rupiah
(r-Digital Rupiah). Both would be developed in an
integrated manner from wholesale to retail. WDigital Rupiah is the foundation for the entire
Digital Rupiah architecture.
W-Digital Rupiah would act as a risk-free
settlement asset in the wholesale market and
become the complement of the central bank
reserve accounts. Additionally, w-Digital Rupiah
would bear no interest to its holder.
Users would access w-Digital Rupiah through
token-based verification. Tokens are perceived as
a suitable choice for w-Digital Rupiah as they are
considered
more
capable
of
facilitating
transactions between actors in financial markets
that tend to be more complex.
W-Digital Rupiah would use Distributed Ledger
Technology (DLT) as technology platform. Bank
Indonesia views DLT as a potential solution to
tackle single point of failure problem and improve
financial integrity as well as promote higher
efficiency.
The DLT platform in w-Digital Rupiah will be
permissioned-based. It is seen as more secure and
compatible for the character of large value-small
volume type of transactions commonly found in
financial markets.

2.2

W-Digital Rupiah Design for the
Immediate State

This CP places a focus on the first stage of Digital
Rupiah development (immediate state), which is
w-Digital Rupiah cash ledger. It consists of three
use cases namely the issuance, redemption, and
transference of funds among participants (Figure
2) with the following key attributes:

Accessability
W-Digital Rupiah is accessed and used on a
limited basis by particular parties (commercial
banks and non-banks) who meet certain criteria
set by Bank Indonesia. These parties are then
referred to as wholesalers and non-wholesalers.
Bank Indonesia could also serve as a wholesaler.

Role
Bank Indonesia would take roles as:
a. genesis developer, the sole party that develops
and modifies the source code within the
platform.
b. validating node, which validates transactions.
c. regulatory node, which holds the right to
regulate and supervise the network, including
the right to collect and analyse data in real
time.
d. operator node, which serves as a proxy that
provides access to the ledger for participants
who do not possess their own node (no
node).
e. administrative
node,
which
manages
participation
arrangements
within
the
network.
Commercial banks and non-banks who would own a
status as wholesaler or non-wholesaler could act as
either a validating node, non-validating node, or no
node with arrangements that would be explained in
the following section.

6

## Page 7

2

THE W-DIGITAL RUPIAH DESIGN:
IMMEDIATE STATE
Issuance
W-Digital Rupiah is issued through the transfer of
funds from participant's reserve account to the
Digital Rupiah technical account at Bank Indonesia
Real Time Gross Settlement (BI-RTGS) System.

Usage
W-Digital Rupiah is used as the settlement asset
for financial transactions, inter-participants, or
between participants and Bank Indonesia.
Participants transfer w-Digital Rupiah within the

DLT network in accord with best practices that are
settlement finality, queue management supported
by gridlock resolution, and privacy.

Redemption
The w-Digital Rupiah cycle ends with redemption.
In case participants wish to reduce their Digital
Rupiah holding, they could convert w-Digital
Rupiah into their reserve account at Bank
Indonesia.

CENTRAL BANK
BI - RTGS

Issuance
Redemption
Conversion of
reserves to wDigital Rupiah

Digital Rupiah
Depository

Conversion of
reserves to wDigital Rupiah

W-DIGITAL
RUPIAH
PLATFORM
CASH LEDGER
NON-WHOLESALER

Transaction of w-Digital
Rupiah between participants

R-Digital Rupiah
Platform

RETAILER

end state
Figure 2 Wholesale Digital Rupiah Design

7

WHOLESALER

## Page 8

3

THE SCOPE OF PUBLIC CONSULTATION
As described in the previous section, this CP is designed as the initial sequence of the w-Digital Rupiah
cash ledger development. W-Digital Rupiah cash ledger is the transference of funds among participants
in the financial market in a decentralized environment.
This CP will discuss two issues, they are functionality and general considerations. Bank Indonesia
welcomes all inputs from various parties on several issues and concerns presented in the questions
below.

3.1

Functionality

In this section, various functional aspects within w-Digital Rupiah cash ledger (w-Digital Rupiah) will be
explored including the functional links between the DLT platform and BI-RTGS. These aspects comprise
access, issuance/redemption, transference of funds, as well as technical and 3i1 capabilities (Figure 3).
DECENTRALIZED PROCESS
Participation
Arrangements

Access

Data Access
Arrangements

Wallet
Management

BASIC FUNCTIONS
W-Digital Rupiah Cash Ledger

Issuance

Redemption

Funds
Transfer

Funds Transfer
Main Function

Gridlock
Resolution

Settlement
Finality

TECHNOLOGY
Technical Capabilities & 3I Aspects
Figure 3 The Scope of Functionality Aspects of w-Digital Rupiah Cash Ledger

3.1.1

Access

This section covers three issues on access,
consisting of the participation arrangements, data
access arrangements, and wallet management.

A

Participation Arrangements

As discussed in the previous section, access to wDigital Rupiah is restricted only to wholesalers and
non-wholesalers. Bank Indonesia will designate

parties who would be appointed as wholesalers
based on certain additional criteria set by Bank
Indonesia.
W-Digital Rupiah distribution scheme would be
one-tier. Both wholesaler and non-wholesaler
could obtain w-Digital Rupiah directly from Bank
Indonesia (one-tier). In contrast to nonwholesalers, at the last stage of Digital Rupiah
development (end state), wholesalers would have
a function in distributing Digital Rupiah to retailers
and end users.

1 Integration, interoperability, dan interconnection.

8

## Page 9

3

THE SCOPE OF PUBLIC CONSULTATION
Wholesalers dan non-wholesalers will take a
certain role in the w-Digital Rupiah platform.
The configuration of roles and access rights is
arranged into 3 (three) classifications:
Validating node: this classification grants rights
to participant to perform as validator of
transactions
and
control
the
management/custody of their w-Digital Rupiah
tokens.
Non-validating node: this classification grants
rights
to
participant
to
control
the
management/custody of their w-Digital Rupiah
tokens without a right to perform as validator.
No node: this option enables a participant to
hold w-Digital Rupiah without any rights
to manage and hold tokens as well as perform
as validator. Tokens will be custodied in Bank
Indonesia as the ledger operator (operator
node).
Each option has different implications on
investment and operations. In validating node,
participants would need to provide and operate
infrastructures with high computation capacity,
the computing capacity required for nonvalidating nodes tends to be lower than for
validating nodes. This will leave no node at the
lowest, as participants in this option would only
need to provide a network connection with
ledger operator.
Participants could operate nodes independently
with DLT infrastructure provided by Bank
Indonesia. Wholesalers, as suggested by their
function, would be required to take a role as
validating node. Whilst non-wholesaler would
have an option to select either as non-validating
node, or no node. These arrangements are
needed to warrant scalability and proper
incentive in the w-Digital Rupiah platform.

B

Data Access Arrangements

Privacy is an important element of transactions
in the wholesale ecosystem. In a centralized
system, transactions between parties are only
known by the transacting parties and the central
authority. Similar condition may not be found in
the decentralized system.

9

As explained in the previous section, the
engagement of multi-parties in validating
transaction in this system will simultaneously
expose them to other participants’ data.
W-Digital Rupiah platform must be designed
based on the need-to-know principle. This
principle restricts access to data and information
only to relevant parties. On this matter, w-Digital
Rupiah platform would need to be equipped
with query and capturing2 features to ensure
that any bilateral or multilateral transaction data
would only be accessible to relevant parties in
the network based on their access right with
different visibility levels.
Those relevant parties consist of transacting
parties, Bank Indonesia and other parties acting
as validators. Only regulator, in this respect,
Bank Indonesia, has direct access to all
transaction data for supervisory and oversight
purposes. In this regard, Bank Indonesia would
assume full control over the Digital Rupiah
network.
Therefore, the w-Digital Rupiah DLT platform
would be equipped with cryptographic
mechanism which enables access rights
segregation and restriction to data propagated
to all participants in the network. This also
applies for user interface. Challenge remains in
determining the degree of visibility that could
be granted to each party, the selection of
optimal privacy-enhancing technology and
cryptographic technique, and the balance
between confidentiality and auditability.

Query is a mechanism to access data and
information stored in each participant's ledger in the
form of granular or aggregate data in real-time or
within a certain time period. Meanwhile, capturing is a
mechanism for recording all transactions that have
been validated in real-time where the validating node
that validates the transactions sends every copy to
the regulatory node.
2

## Page 10

3

THE SCOPE OF PUBLIC CONSULTATION

C

Wallet Management

Wallet management issues comprises the types of wallets which will be developed in the w-Digital
Rupiah platform. The w-Digital Rupiah token is stored in a digital wallet, which could be a hot or cold
wallet3. Hot wallets would be mandatory as it is used for transactional purposes. Conversely, cold
wallets would be optional. Participants could leverage cold wallets for cyber risk mitigation.

Questions

1

In your view, what are the implications of segregating participation into wholesaler and
non-wholesaler? Would this segregation adequate to mitigate risk?

2

In your view, does the number of validators for w-Digital Rupiah platform need to be large
to ensure its operational efficiency and effectiveness? What would be your considerations?

3

In your view, how should incentives/rewards be designed in order to encourage participants
to take a role as a validating node?

4

In your view, what would be the risk if wholesalers have options to select non-validating
node?

5

In your view, what would be the risk of non-wholesalers who act as a validating node?

6

Has it been possible to expose data content partially in DLT, e.g., only transaction value, to
allow for the implementation of gridlock resolution without violating privacy? To what
extent could data visibility be set?

7

What are the arrangements/standards for identity management in the w-Digital Rupiah
platform (identity service) that could protect user privacy and enable traceability, including
monitoring of illegal transactions?

8

What are the factors that need to be taken into consideration in selecting the privacyenhancing technology?

9

How can confidentiality and auditability be balanced in a decentralized system?

10

In your view, should the issuance and management of w-Digital Rupiah wallet be directly
performed by Bank Indonesia, or should it be handed over to the industry?

11

Should cold wallets be mandatory for the w-Digital Rupiah design?

3 Hot wallets are online token storage, while cold wallets are offline. Cold wallet could take the form of the hardware or other physical forms.

1 0

## Page 11

3

THE SCOPE OF PUBLIC CONSULTATION

3.1.2

Issuance/Redemption

As explained in the previous section, the issuance
of w-Digital Rupiah is conducted through the
transfer of funds from participant's reserve
account to the technical account of Digital
Rupiah at BI-RTGS System. This simultaneously
triggers an instruction to issue w-Digital Rupiah
tokens in KDR on the w-Digital Rupiah platform
which is immediately forwarded to the
requesting participant (on demand). In this
process, tokens issued would be checked for its
validity4 by participants that act as validating
nodes before being updated into the ledger.
KDR plays an instrumental role in the w-Digital Rupiah configuration. KDR will act as the single-entry
point in ensuring security, completeness, validity, and accuracy of Digital Rupiah supply. Bank Indonesia
will develop and operate the KDR.
In the event the wholesaler wishes to reduce the stock of Digital Rupiah, the tokens will be converted
back into current account balance at Bank Indonesia. The issuance, transference, and redemption
processes occur in real-time on the w-Digital Rupiah platform. Conversion from a participant's current
account balance to Digital Rupiah could occur 24/7 or during designated operating hours.

Questions

1

What is your view on KDR role?

2

In your view, should the role of validating the authenticity of Digital Rupiah be delegated to
participants other than Bank Indonesia?

3

What would be the risk embodied in the withdrawals and redemption process of w-Digital
Rupiah that need to be taken into consideration?

4 Validity in this case includes the authenticity of the token and ensures that the token has never been spent.

1 1

## Page 12

3

THE SCOPE OF PUBLIC CONSULTATION

3.1.3

Funds Transfer

This section discusses on how w-Digital Rupiah
platform implements funds transfer functions,
gridlock resolution, and settlement finality,
including their challenges.

A

Funds Transfer Main Functions

can function just as it would in the real-time gross
settlement system. Liquidity needs can be met
through Bank Indonesia (e.g., through intraday
liquidity facilities) or other participants (lending of
w-Digital Rupiah tokens).

B

Gridlock Resolution

Gridlock resolution is a mechanism to resolve
transaction deadlocks that often occur in largevalue transactions settlements. This mechanism is
executed through netting and reordering of
transaction priorities.

The funds transfer process on the w-Digital
Rupiah platform refers to the best practices
applied in wholesale payment system. In this
regard, transaction settlement has two main
functions, namely (i) real-time and gross
transaction processing (including submission,
validation,
conditionality,
and
settlement
functions) and (ii) liquidity saving mechanisms
which includes queue mechanism (queue
arrangement,
queue
reordering,
queue
cancellation) and gridlock resolution. Payments in
w-Digital Rupiah will be settled in real-time if the
sender has sufficient funds/liquidity.
The implementation of the above functions will be
facilitated by smart contract. This feature allows
various activities in the network to be carried out
automatically without human intervention. It is
used to determine the business logic of a
transaction. For example, the transaction
processing flow in a traditional system can be
moved into a smart contract so that it could be
executed
by
each
participating
node
(decentralized).
Smart contracts could also be used for liquidity
management, including queuing and gridlock
resolution mechanisms. Implementation of both
mechanisms on the w-Digital Rupiah platform

The implementation of gridlock resolution in
decentralized system will potentially be more
complex than centralized system. In a centralized
system, algorithms or criteria set by a central
authority triggers the resolution whereby gridlock
could be resolved accordingly based on priority.
Similar condition may not occur in decentralized
systems. In a decentralized system, each party can
initiate simulation of reprioritization. This may
potentially disadvantage some parties. Gridlock
may be unfairly settled, as resolution may not be
conducted according to order.

C

Settlement Finality

The main principle of settlements is settlement
finality. This principle determines the point when
transactions are recognized as final or irrevocable.
Within a decentralized system, the compliance of
this principle will be determined by the chosen
consensus mechanism. Consensus, in this respect,
will be achieved after certain conditionalities are
met (probabilistic). Consequently, settlement
process would take time and the timing of
settlement finality could be hard to define.
W-Digital Rupiah will use proof of authority as its
consensus mechanism. This choice is better in
terms of speed and security. In this respect,
consensus is achieved by authorized parties
without demanding complex computation.

1 2

## Page 13

3

THE SCOPE OF PUBLIC CONSULTATION
In addition, the use of permissioned DLT in w-Digital Rupiah platform will allow an easier determination
of settlement finality compared to the use of permissionless DLT (e.g., finality occurs when a transaction
on the ledger is validated).
Questions

1

In your view, does w-Digital Rupiah require the role of liquidity providers? If required, who
should take the role?

2

In your view, is the risk of gridlock relevant in a DLT system as is in a centralized system? If
so, how could gridlock resolution be implemented fairly in a DLT system?

3

Is proof of authority sufficient to ensure settlement finality?

4

Are the current legal provisions sufficient to ensure settlement finality in a decentralized
system?

3.1.4

Technical Capabilities and 3I Aspects

The Digital Rupiah platform is designed with the
capability to integrate with existing financial
market
infrastructures,
including
payment
systems.
This
connectivity
accommodates
seamless conversion, transference of funds, and
exchange of assets, and alignment of different
participation rules among infrastructures.
To achieve this, the Digital Rupiah platform must
comply with the 3i principles when connecting to
the financial market infrastructures. The fulfillment
of 3i principles in the development of Digital
Rupiah could be achieved through two
prerequisites. Firstly, the capability for Digital
Rupiah to exchange information and conduct
transactions, either directly or indirectly, with
traditional, both existing and future, financial
market
infrastructures.
Secondly,
the
standardization of technical, semantic, and
business/legal
aspects
with
respect
to
technological
advancements
and
policy
requirements. This will also apply in terms of
cross-border interoperability.

1 3

W-Digital Rupiah will act as a complement to the
account-based BI-RTGS System. As described in
the previous sections, interoperability between wDigital Rupiah platform and BI-RTGS system will
occur on the issuance and redemption cycle of wDigital Rupiah token. In this respect, challenges in
harmonizing both systems remain, among others
related to the difference on technical capabilities,
participation arrangements, and operational
model, e.g., difference in operational hours.

## Page 14

3

THE SCOPE OF PUBLIC CONSULTATION
In addition, a challenge may occur through the differences in the use of cloud services. Each DLT
participant may use different cloud infrastructures thus potentially limiting interoperability.
Questions

1

In your view, what would be the conditions for a DLT system to coexist with existing
centralized systems like BI-RTGS? What are the potential use cases that could stimulate
systems’ coexistency other than issuance and redemption?

2

What risks might arise from the coexistence between w-Digital Rupiah DLT platform and the
current financial market infrastructures, including in the event that effective coexistence fails
to occur?

3

How could Digital Rupiah be designed to achieve transferability across multiple payment
platforms (cross-chain platforms)? Are new technologies or technical standards required?

3.2

General Considerations

3.2.1

Technology: Scalability and Resilience

As explained in the previous section, the
technology platform used for w-Digital Rupiah
would be based on permissioned DLT with proof
of authority consensus considering its ability to
ensure greater security.
First, DLT is seen as an innovative solution to
overcome the classic problem of single point of
failure embedded in every centralized system such
as RTGS. RTGS systems, including the BI-RTGS
system, are classified as systemically important
financial market infrastructure (SIPS). This system
is a payment system used to settle large-value,
critical, and immediate transactions such as
monetary operations and interbank money
market. However, given its crucial role and status,
the RTGS system tends to be vulnerable to the
single point of failure risk.
DLT provides an innovative solution to overcome
such risk. The use of DLT enables higher resilience
as it allows the system to recover quickly in the
event of operational disruption, including from
cyber-attacks. This is possible as data and

processing are distributed to several nodes,
whereby other nodes could back up the failure of
one node.
Second, the use of permissioned DLT provides
better scalability compared to permissionless DLT.
One of the emerging issues in DLT infrastructure is
the technical ability/capability to process
transactions with high volumes rapidly. This can
be accommodated through permissioned DLT
which is considered to be the middle ground for
the needs of resilience and scalability, given the
issue of better scalability compared to
permissionless DLT. In this model, access to the
platform would be given only to the selected
parties that meet certain criteria as such scalability
would be easier to reach and thus considered
more capable to handle large value-small volume
characteristics of wholesale transactions.

1 4

## Page 15

3

THE SCOPE OF PUBLIC CONSULTATION
Third, DLT is regarded as capable of increasing
traceability while encouraging efficiency with
atomic settlements, which enables seamless
transaction processing.
Fourth, the chosen consensus mechanism is
viewed to provide better cyber-resilience. Most of
the DLT consensus mechanisms are prone to
cyber-attacks such as the "51% attack" posing
double spending risk, and finality disruption. In
this respect, the use of proof of authority
consensus mechanism is perceived to have better
ability to mitigate such risk.
However, challenges remain.
First, like any other payment system, Digital
Rupiah platform is prone to operational
disruptions and cyber-attacks.
Second, issue on the provision of efficient
recovery mechanism. As described in the previous
section, the use of DLT may incure privacy issues.

On the contrary, if privacy compliance is met (e.g.,
data is held exclusively by transacting parties and
parties acting as a regulatory node), a new
problem occurs. In this condition, recovery
process in DLT may not be performed as
efficiently as in centralized systems, especially
when the party suffering from disruptions does
not maintain active backups. Furthermore, data
recovery through the regulatory node is likely
time-consuming.
Third, scalability issue. Despite being superior in
terms of scalability compared to permissionless
DLT, a permissioned DLT is still untested in
sustaining the stability of its performance in the
event of a surge in transaction volume above its
normal capacity. In this respect, a trade off occurs
between resiliency and speed. A system that does
not duplicate the ledger, such as centralized
systems, will have low resilience. On the contrary,
a highly decentralized system will tend to be slow,
inefficient, and low in its scalability.

Questions

1 5

1

Would a decentralized system provide better operational resilience than a centralized
system? Would proof of authority be adequate in mitigating cyber-attack?

2

To what extent does DLT risk management differ from centralized systems? What
capabilities must be built by each party involved?

3

What aspects must be considered and ensured in designing backups and Business
Continuity Plan (BCP) for decentralized systems? Must each node in DLT maintain an active
backup to ensure resilience of each node within the DLT?

4

Does the use of cloud in DLT networks require standardization? If so, to what degree should
cloud standardization be implemented within a resilient DLT ecosystem?

5

In your view, is a permissioned DLT comparable to centralized systems in handling lowvolume and high-value transactions, including its capacity to tackle the surge in transaction
volume?

6

What is the optimal level of distribution/decentralization in the Digital Rupiah ledger to
achieve the optimal combination of resilience, speed, efficiency, and scalability?

7

Would there be other operational risks that have not been clearly mapped in the use of DLT,
especially those affecting system resilience, reliability and security and how could they be
addressed? What operational or cyber risks may be unavoidable?

## Page 16

3

THE SCOPE OF PUBLIC CONSULTATION

3.2.2

Implications towards the Payment System and
Financial and Monetary Systems

The issuance of the Digital Rupiah could open
wider economic opportunities. On the wholesale
side, the use of w-Digital Rupiah as a settlement
asset for transactions in monetary operations and
financial transactions is expected to strengthen
monetary policy transmission. Additionally, the
use of smart contract features in Digital Rupiah is
expected to deepen the financial market through
the emergence of more efficient and diverse
business model, shorter intermediation chains,
and more integrated technology platforms
between Digital Rupiah and digital securities 5.
From the financial system stability perspective, the
risks of using Digital Rupiah for wholesale
transactions are less sophisticated than its use for
retail transactions. In this regard, concerns
regarding disintermediation risk and procyclicality
generally arise with r-Digital Rupiah.

However, this does not mean that w-Digital
Rupiah is immune to risks. In addition to the
operational risks, as described in the previous
section, the risk of using w-Digital Rupiah towards
financial system stability may occur from higher
interdependency. This level of risk is perceived to
be greater in w-Digital Rupiah given the higher
intensity of interconnectedness both across
infrastructures within the Digital Rupiah platform
and between Digital Rupiah infrastructures and
traditional infrastructures. In addition, the scope of
wholesaler participation, which includes non-bank
institutions, will increase risk exposure.
Achieving high-level of adoption is also not an
easy task. The design of w-Digital Rupiah needs to
identify the right use cases to ensure effective
adoption, in this context, for the wholesale
financial market ecosystem.

This CP prioritizes the development of w-Digital Rupiah at the immediate stage. The integration of w-Digital Rupiah with
monetary operation and digital securities will be elaborated at the next stage of development (intermediate stage).
5

1 6

## Page 17

3

THE SCOPE OF PUBLIC CONSULTATION

Questions

1

2

Should the quantity of w-Digital Rupiah in circulation be capped? If so, what factors should
be considered for such policy?

3

What implications would arise due to the 24/7 operation of interbank money market,
enabled by the use of w-Digital Rupiah?

4

What are the minimum requirements that must be met by each participant to manage risk
arising from interdependencies?

5

6

7

1 7

How would the use of w-Digital Rupiah change the financial structure, particularly the
interbank money market structure, including its implications for the asset pricing? Does the
classification of participation into wholesalers, non-wholesalers, and retailers affect the
market structure and resilience of the financial industry and payment systems?

In your view, what opportunities and challenges could arise from active involvement of nonbank entities in financial markets? Is it necessary to have specific criteria regarding the
participation of non-bank financial institutions in the w-Digital Rupiah platform? Are capital
requirements considered sufficient to mitigate risks?
Which features should be adopted by Digital Rupiah to optimize its potential added value
to financial market deepening (i.e., potential smart contracts that could be leaveraged to
overcome classic problems related to financial market deepening)?
What factors must be considered to ensure effective adoption of Digital Rupiah in the
wholesale market? What use cases are needed to ensure effective adoption of w-Digital
Rupiah?

## Page 18

GLOSSARY
BI Real Time Gross
Settlement (BIRTGS) System

Financial infrastructure used for electronic funds transfer where the settlement is
instantaneous on a gross basis.

Business Continuity
Plan (BCP)

Strategies to overcome certain circumstances where business must continue
after a disaster

Distributed Ledger
Technology (DLT)

An approach that records and shares data across multiple data storage locations
(journals). This technology enables transactions and data to be recorded, shared
and synchronized across distributed networks with different network
participants.

Integration,
interoperability,
interconnection (3i)

Types of interlinkages among financial market infrastructures

Integration

The unification of post trade infrastructure in the same institution for the
transaction service value chain

Interoperability

The ability for two or more systems to exchange information or transact without
middleware

Interconnection

The ability between systems to exchange information or transact requires an
intermediary, or in other words the interconnection between systems occurs
indirectly

Digital Rupiah
Depository (KDR)

Digital Rupiah Depository, is one of the nodes in the w-Digital Rupiah platform
involved in the issuance and redemption of w-Digital Rupiah tokens

Node

An integral piece of distributed ledger technology that store ledgers

No node

A type of participation where the participant does not have a node and only
needs to provide a network to connect to the operator's ledger service

Non-wholesaler

Parties that have access to Digital Rupiah directly from Bank Indonesia and can
transact on the w-Digital Rupiah platform

## Page 19

GLOSSARY
Permissioned DLT

A closed-source distributed ledger technology variant where the participants are
known, and authorization is required before usage or activity validation on the
network

Permissionless DLT

An open source distributed ledger technology variant where any party can
participate in usage and activity validation on the network

Proof of authority

A consensus mechanism where validation is only performed by authorized
parties

Single point of
failure

Any point in a system, whether a service, activity, or process, that, if it fails to
work correctly, leads to the failure of the entire system

Systemically
Important Payment
System (SIPS)

A payment system that can potentially trigger systemic risks in the event of a
disruption or if proper risk management is not implemented, as it is processing
large-value transactions or settling transactions from other financial market
infrastructures

Wholesale

In the context of this CP, the definition of wholesale falls within the scope of
financial markets, hereafter known as wholesale markets, where financial
instruments such as stocks, bonds, currencies, and derivatives are traded

Wholesaler

A party who obtains the right to access Digital Rupiah directly from Bank
Indonesia and distributes it to retailers and end users

## Page 20

LIST OF AUTHORS

Coordinator:
Filianingsih Hendarta (Assistant Governor / Payment System Policy
Department), Dudi Dermawan (Director / Payment System Policy Department)

Editor:
Ryan Rizaldy (Director / Payment System Policy Department)

Drafting Team:
Rozidyanti, Eva Rosdiana Lase, Sigit Setiawan, Nur Annisa Hasniawati,
Abdurrahman, Fathahillah Dipanegara Wicaksana, Indah Ayu Fauziah, Claudia
Hapsari Priyono, Kanne Aprillia Dyna Hutagalung, Radhy Muhammad Ampera,
Tria Rahmat Mauludin, Muhammad Noorrosyid Sulaksono, Hanzholah Shobri.

Contributors:
Bastian Muzbar Zams, Himawan Kusprianto, Novi Maryaningsih, R. Yulia
Saptasari, Akhmad Ginulur Pangersa, Nenden Endah Sari, Faizal Kurniawan,
Septine Wulandini, Ivan Devara, Najibullah Ulul Albab, Kevin Eza Rizky, Farhan
Muhammad Sumadiredja, Nesya Ayussnita.
Information System Management Department, Economic and Monetary Policy
Department, Macroprudential Policy Department, Monetary Management
Department, Financial Market Development Department, Payment System
Management Department, Strategic Management and Governance
Department, Financial System Surveilance Department, Legal Affairs
Department.

## Page 21

Address

: Jalan MH. Thamrin No. 2
Jakarta 10350 Indonesia

Phone

: 131 / +62 21 1500 131

Fax

: +62 21 3864884

E-mail

: bicara@bi.go.id

www.bi.go.id

BankIndonesiaOfﬁcial

@bank_indonesia

bank_indonesia

Bank Indonesia Channel

Contact Center: 131
