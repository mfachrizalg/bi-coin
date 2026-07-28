---
source_type: pdf
title: "Garuda-Project-Public-Consultation-Report"
original_file: "thesis/reference/Garuda-Project-Public-Consultation-Report.pdf"
sha256: "a4fa9b847db5c6d80b655a96dc1a31b26d45afaa54acdd4c55e011d6caaa3ee3"
page_count: 33
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Garuda-Project-Public-Consultation-Report

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

[No extractable text]

## Page 2

i

This report summarizes public comments on the design of the wholesale Digital Rupiah
Cash Ledger and does not represent Bank Indonesia's stance. Bank Indonesia
welcomes all forms of public participation and input sent to support the development of
the most appropriate and suitable Digital Rupiah for the Republic of Indonesia.

## Page 3

ii

Assalamu'alaikum Warahmatullahi Wabarakatuh, Peace
be upon us all, Shalom, Om swastiastu, Namo buddhaya,
Greetings of virtue.
On January 31, 2023, Bank Indonesia published a Consultative
Paper on the design of the Immediate Stage of the Digital Rupiah,
namely the Wholesale Rupiah Digital cash ledger as a form of
synergy between all stakeholders in the development of the Digital
Rupiah. We received inputs and insights from industries and
associations, ministries/institutions, academics, and the public up
to July 15 2023 as useful feedback for the development of the
Digital Rupiah design. We summarize these inputs and thoughts in
this report.
We publish this report as a form of Bank Indonesia's transparency
in developing the Digital Rupiah design. The involvement and
contribution of these diverse stakeholders is a key element in
enriching the insights in designing a Digital Rupiah design that best
suits the needs of the industry and the general public. To that end,
Bank Indonesia is committed to continue engaging the public in the
design iterations of the Digital Rupiah, through various channels
and activities that will be organized.
Bank Indonesia fully appreciates the synergy of
various parties in building the Digital Rupiah design.
Hopefully, the efforts of the Digital Rupiah
experimentation under the Garuda Project can lead
the Indonesian nation to a more advanced future
and provide benefits and blessings for the whole
society.

Jakarta, October 30, 2023

Deputy Governor of Bank Indonesia

## Page 4

iii

Preface

ii

Executive Summary

1

2.5 Technical Capabilities and 3i
Aspects (Interconnectivity,
Interoperability, Integration)

I. Introduction

2

2.6 Implications towards the Payment 16
System, Financial System, and
Monetary System

II. Summary of Public
Consultation

5

III. Conclusion

2.1 Choice of Technology

6

2.2 Access
2.3 Issuance and Redemption
2.4 Gridlock Resolution, Funds
Transfer, and Settlement
Finality

Appendix A

14

19

Consultative Paper Question List

iv

8

Appendix B

vii

11

Bibliography

x

12

Acknowledgement

xii

Glossary

## Page 5

1

Executive
Summary
• In general, the top-level design of wDigital Rupiahl1 is in line with public
expectations. This report summarizes the
public input gathered by Bank Indonesia
through the Consultative Paper from 31
January to 15 July 2023.
• Participation procedures must be
designed in a balanced manner. Validating
node functions need to be distributed
appropriately to mitigate single points of
failure. The roles of wholesalers and nonwholesalers need to be separated to
maintain stability. Opening membership
access to non-banks will encourage
innovation and healthy competition,
although the number of validators
remains to be determined based on
effectiveness, efficiency, scalability and
resilience.
• The role of issuing and managing wallets
needs to be allocated appropriately.
Wallets can be issued directly by Bank
Indonesia. Meanwhile, its management can
be transferred by Bank Indonesia to the
industry. Bank Indonesia also needs to
establish provisions or standards in the
management of transaction data and/or
identity to protect privacy and ensure the
effectiveness of supervision.
• Digital Rupiah Depository (KDR) needs to
be managed by Bank Indonesia.
Conversely, the function of validating the
validity of tokens at issuance can be
performed by participants to mitigate
single points of failure, accelerate the
transaction process, increase innovation,
ensure security, and reduce Bank
Indonesia's operational burden.
1

• Integrated solutions are required in
gridlock resolution on Distributed Ledger
Technology (DLT). Appropriate consensus
mechanisms, efficient transaction queue
management, as well as the use of
appropriate technologies, including the
use of smart contracts in this regard are
required.
• Permissioned DLT with Proof-of-Authority
(PoA) consensus mechanism is viewed as
optimal. DLT promises better security and
reliability than centralized systems due to
the absence of a single point of failure and
the availability of features for regulating
access, distribution, and encryption of
transaction data. Meanwhile, the
guarantee of settlement finality in PoA is
considered better than other consensus
mechanisms.
• Standardization and the availability of
middleware that guarantees crossplatform transferability are necessary in
fulfilling the 3i aspects (interconnection,
interoperability, and integration). This step
will ensure coexistence between w-Digital
Rupiah platforms.
• The impact of w-Digital Rupiah is believed
to be positive on Monetary, Financial
System, and Payment System. Payment
system efficiency is expected to increase.
Similarly, product innovation, market
efficiency, and financial market deepening.
The money market and forex market are
expected to be more active with the 24/7
operation of w-Digital Rupiah and more
diverse use cases.

See Rupiah Digital White Paper on "Project Garuda: Navigating the Digital Rupiah Architecture", November 2022.

## Page 6

2

Project Garuda: Wholesale Rupiah Digital Cash Ledger

This Public Consultation
Report is a summary of
public comments and
input for the first phase of
development, the
Immediate State, regarding
the design, impact and
benefits of Rupiah Digital.
This is also the follow-up
to the Consultative Paper
Phase I titled "Project
Garuda: Wholesale Rupiah
Digital Cash Ledger", as
well as the White Paper.

Project Garuda
White Paper
November 30, 2022

Consultative Paper
Phase I titled “Project
Garuda: Wholesale
Rupiah Digital Cash
Ledger”
Januari 31, 2023

## Page 7

Project Garuda: Wholesale Rupiah Digital Cash Ledger

3

Bank Indonesia published Consultative Paper Phase I
titled "Garuda Project: Wholesale Rupiah Digital Cash
Ledger" on January 31, 2023, as a follow-up to the
issuance of the Garuda Project White Paper. Through
this Consultative Paper, Bank Indonesia seeks public
comments and inputs on the design, impact, and
benefits of Digital Rupiah in the first phase of
development, i.e., immediate state1.
A total of 35 questions were asked in this
Consultative Paper. The questions are divided into two
categories, namely functionality and general
considerations, which are then further derived into six
sub-categories namely: i) technology (scalability and
resilience); ii) access (membership, data access and
wallet); iii) issuance and redemption; iv) fund transfer,
gridlock resolution and settlement finality; v) technical
capability and 3i aspects (interconnection,
interoperability and integration); and vi) implications for
Payment System, Financial System Stability and
Monetary Stability (Appendix 1).

Access

(participation, data
access, dan wallet)

Technical
Capabilities and 3i
Aspects

(interconnectivity,
interoperability, integration)

Issuance &
Redemption

Technology
(scalability and
resilience)

Gridlock
Resolution,
Funds Transfer,
and Settlement
Finality

Implications
towards the
Payment System,
Financial System,
and Monetary
System

6 subcategories
2

The development phases of Project Garuda: Phase I (immediate) w-Rupiah Digital cash ledger; Phase II (intermediate) w-Rupiah
Digital cash and securities ledgers; Phase III (end state) integrated w-Rupiah Digital and r-Rupiah Digital.

## Page 8

Project Garuda: Wholesale Rupiah Digital Cash Ledger

A total of 42 comments and inputs were
collected from Banks, LSBs,
Ministries/Institutions, Associations,
Academics, Non-Financial Corporations,
International Institutions and Individuals. The
comments and inputs were collected through
written communication and Focus Group
Discussion during the period of January 31 July 15, 2023.

Commenters

4

This report is a summary of the public
input gathered by Bank Indonesia on
the immediate use cases of issuance,
transfer, and destruction of wholesale3
Digital Rupiah (w-Digital Rupiah ).

Banks

12

Non-Banks

5
Non-financial
Institutions

7

Total
Associations

9

Ministries /
Agencies

5

Individuals

4
3 In this report, wholesale refers to various transactions in financial market, including money market, stocks, bonds, FX trading,

and derivatives. These are typically large value transactions.

## Page 9

5

Project Garuda: Wholesale Rupiah Digital Cash Ledger

The public consultation is summarized into 6
subcategories of questions, which are i) technology
(scalability and resilience); ii) access; iii) issuance
and redemption; iv) gridlock resolutions, funds
transfer, and settlement finality; v) technical
capabilities and 3i aspects; and vi) implications
towards Implications for Payment System, Financial
System Stability, and Monetary System

## Page 10

Project Garuda: Wholesale Rupiah Digital Cash Ledger

Choice of
Technology
Bank Indonesia is developing Digital Rupiah
based on technology neutral principles. This
section summarizes public opinion on the
appropriate technology choice for w-Digital
Rupiah, including the risks that Bank
Indonesia needs to consider in its
implementation.

Regarding the choice of technology,
respondents' opinions narrowed down to
permissioned DLT. This option is believed to
be superior to a centralized system,
especially in the aspect of controlling the risk
of single point of failure with the availability
of backups that work independently at a
number of points. DLT is also able to
stimulate the development of new and
innovative use cases. The availability of
features for regulating access, distribution
and encryption of transaction data in a
permissioned paradigm enables Bank
Indonesia to define and regulate the role of
entities in the w-Digital Rupiah platform so
that the system can work more efficiently,
safely and scalably.
Regarding consensus algorithms,
respondents' opinions narrowed down to
the Proof of Authority (PoA) mechanism.
Compared to other mechanisms, PoA is more
capable of meeting throughput needs,
scalable to transaction spikes, and is more
resilient, especially against cyber attacks.
However, these solutions are not riskproof. There are risks such as cyber-attacks
(e.g., Sybil, Eclipse, 51% attack, DDoS), single
point of failure at the notary node, and
operational disruption due to transaction
spikes.

6

Risks also arise from the use of smart
contracts and wallets. Smart contracts
are vulnerable to exploitation, which can
lead to data leaks and inaccuracies.
Similarly, wallets are vulnerable to theft
and illegal use of private keys.

The materialization of risks will erode user
confidence in data integrity and validity.
Therefore, Bank Indonesia must take a
number of mitigation measures.
Hardware standardization (including
cloud), server location calibration,
standardization and diversification of
technology vendors are needed to mitigate
cyber risks3. More than one notary node
should be developed to mitigate a single
point of failure. A scalable system with
proper capacity planning is required to
ensure system readiness to accommodate
transaction surges. Bank Indonesia also
needs to study in depth the fulfillment of
the security features of smart contracts
and wallets that will be used to prevent
data leaks and illegal access.
The implementation of permissioned DLT
with PoA consensus mechanism is also
faced with challenges. Implementation
and maintenance of DLT demands greater
resources than centralized systems. In
addition, determining the ideal number of
validating nodes in PoA can also pose

Bank Indonesia is
developing Digital Rupiah
based on technology
neutral principles…

4 Minister of Communication and Information Technology Regulation No. 3 of 2021 concerning Business Activity Standards and

Product Standards in the Implementation of Risk-Based Business Licensing in the Post, Telecommunications, and Electronic
Systems and Transactions Sectors regulates business standards for the development of blockchain technology.

## Page 11

Project Garuda: Wholesale Rupiah Digital Cash Ledger

7

a challenge. The impact of the failure of a
single validating node in PoA will be greater
than other consensus mechanisms in the
event of an insufficient number of validating
nodes.
The steps needed to address these challenges
are:
A sufficient number of validating nodes. PoA
needs to be designed in a resilient and tested
manner that takes into account the needs of
the network. An optimal formulation of
validating nodes is needed so that the wDigital Rupiah platform built is able to meet
transaction processing needs without
reducing security aspects. The formulation
needs to consider network topology and size,
consensus mechanism implementation,
access control, data privacy, scalability
targets and system resilience.
Adequate human resource competencies,
both on the Bank Indonesia and participant
sides. These competencies include technical
competencies, in particular the practice of
consensus mechanisms, mastery of smart
contracts, network governance, and risk
control including capabilities in responding to
operational incidents.
Reliable information system capabilities.
The w-Digital Rupiah platform needs to be
equipped with encryption and authentication
mechanisms capable of protecting sensitive
data that facilitates the process of auditing
and tracing activities on the network.
Adequate risk control. The w-Digital Rupiah
system requires solid risk mitigation, namely
a comprehensive Business Continuity Plan
(BCP). Some respondents highlighted the
importance of maintaining active backups on

the validating nodes to mitigate risks and
respond quickly to operational incidents.

DLT
permissioned
Proof of
Authority (PoA)

Sufficient
validators

Competent human
resources on Bank
Indonesia and
participants

Reliable
information
system

Adequate risk
control

## Page 12

Project Garuda: Wholesale Rupiah Digital Cash Ledger

Access
This section summarizes public opinions on
participation arrangements, wallet
management, and data access.

A. Participation Arrangements
This aspect includes the construct of the
roles of Bank Indonesia and industry, the
roles of wholesalers and non-wholesalers
and the distinction of their functions into
validating, non-validating, and no-node.
These aspects influence network stability
and participants’ investment. Related
issues are segregation of participation
roles and the optimal number of validators.

Bank Indonesia
Industri – Wholesaler

Industri – Non
Wholesaler

Industri – Non
Wholesaler

The function of validating node should be
conducted by Bank Indonesia and
industry to mitigate the risk of a single
point of

8

failure. The roles of wholesalers and nonwholesalers also need to be differentiated
to maintain stability. Wholesalers will
function as both validating node and
distributor. Meanwhile, non-wholesalers
can act as either non-validating node or
no-node.
Non-validating node option should not be
granted to wholesalers to prevent an
inadequate number of validating nodes that
could put platform integrity at risk. In
contrast, validating node should be
restricted to wholesalers as allowing too
permissive access might lead to increased
risk, especially in cyber, resulted from low
computing capacity.5
Regulatory instruments covering the
differentiation of roles, rights and
obligations should be prepared. It is also
the case for definition, roles, and minimum
security criteria for wholesalers and nonwholesalers. Security standards for both
wholesalers and non-wholesalers should
at least include the procedures,
infrastructure readiness, DLT practice and
understanding, data privacy, and risk
mitigation.

In terms of the optimal number of
validators, there are trade-offs between
system scalability versus resilience and
system efficiency versus security. The
greater the number of validators, the lower
the system’s vulnerability to cyber risks6.
Conversely, lack of validators may increase
system efficiency but heighten operational
risk.
Determining the number of validators
needs to consider in the effectiveness,

5 A non-financial institution commenter argued that further disaggregation could be implemented to accommodate various risks

depending on the use case. For example, custodial services should be designated to wholesalers. Wholesalers will manage customer
access, administer customer accounts, and interact with BI in the event of customer insolvency.
6 For example, the 51% attack.

## Page 13

Project Garuda: Wholesale Rupiah Digital Cash Ledger

9

efficiency, scalability, and resilience of
the system design7. Bank Indonesia needs
to determine the number and criteria of
wholesalers acting as validating nodes.
Suppose Bank Indonesia allows nonwholesalers to function as validating
nodes. In that case, Bank Indonesia will
also need to establish criteria that can
ensure consistent capabilities across nonwholesalers and wholesalers. In addition,
Bank Indonesia should establish incentives
and technology standards that consider
return on investment, operating costs, and
business continuity.
LSB's participation could spur innovation
and competition. Diversified participation
help facilitate standardization and expand
membership. Nevertheless, this may
complicate security, data confidentiality,
and surveillance risks management.

Thus, non-discriminatory participation
criteria based on risk profile should be
established in case non-bank can partake
in the platform. These should incorporate
minimum capital requirements, transaction
limits, infrastructure standardization, and
risk management. Equivalent requirements
relevant to banks (e.g., BI-RTGS
participation, technical and regulatory
standards), including IT investment, should
also be applied. Bank Indonesia needs to
regulate the limitation in the features and
roles of LSBs to prevent misuse of
participation and reduce potential systemic
risks.

between cold and hot wallets. Related
issues are the industry's role in wallet
management and the use of cold wallets to
mitigate cyber risk.
Wallet issuance should be entrusted to
Bank Indonesia to ensure complete control
over all services and data. The involvement of
the industry in formulating the regulations
and technological solutions is needed to
ensure the system’s interoperability and
security and build user trust.
The industry should handle wallet
management to promote adoption and
innovation for a robust Rupiah Digital
ecosystem. Therefore, Bank Indonesia must
establish regulations and standards as well
as oversee wallet administrators.
Commenters' views were diverged
regarding options for wallet types. An
individual commenter argued cold wallets
should be mandatory considering the higher
security level compared to hot wallets8.
Another commenter emphasize the
importance of keeping abreast of trends in
wallet technology supported with a private
key management framework9.

B. Wallet Management
This aspect includes the formulation of
roles for issuing and managing of wallets,
including options for wallet types

Wallet issuance should be
entrusted to Bank Indonesia to
ensure complete control over
all services and data.
Conversely, The industry
should handle wallet
management to promote
adoption and innovation….

7 In Project Stella, transaction processing time increased with additional validating nodes up to a certain number. The increase in the

number of nodes, from 4 to 13, increased the transaction volume by 20%.

8 Cold wallets are part of a multi-layered wallet security system that protects against cyberattacks and the loss of digital assets.
9 For example, the adoption of cold storage is becoming less favorable than multi-signature (multisig) and Multi-Party Computation.

## Page 14

Project Garuda: Wholesale Rupiah Digital Cash Ledger

10

In contrast, the majority of commenters
from associations and non-financial
institutions suggested that cold wallets
should be optional. Although being more
secure than hot wallets, cold wallets’
accessibility and convenience are relatively
limited, and they require a greater
investment. Cold wallets are regarded as
more appropriate for retail transactions
and consumers with limited Internet
access.

data exchange that could preserve personal
data. Some methods in PET, such as zeroknowledge proof (ZKP) and privacy group10
allow configuration for partial disclosure of
data to the public.

C. Data Access
This aspect includes the construction of
personal data management and security
within w-Rupiah Digital. The main issue is
on balancing confidentiality and auditability.

Commenters stated that it is necessary to
establish arrangements/standards for
administering transaction/identity data.
Concerning technology, commenters viewed
privacy-enhancing technology (PET) as a
prospective solution for secure and efficient

Regarding the compliance to Anti-Money
Laundering and Countering the Financing of
Terrorism (AML-CFT) principles,
commenters recommended the use of key
randomization11 for AML-CFT monitoring
that could preserve privacy. The Ring
signature technology and encryption12,
combined with a personal data protection
mechanism (ZKP or Privacy Group), also
present as potential solutions.
Nonetheless, the implementation of PET
should consider relevant risks. PET
implementation may reduce throughput
scalability. Therefore, the PET selection must
consider its impacts on platform reliability
and performance. In addition, standards
regarding data access, view, and publication
should be established to maintain a balance
between confidentiality and auditability .

Commenters viewed privacyenhancing technology (PET) as a
prospective solution for secure
and efficient data exchange that
could preserve personal data…

10 ZKP is a validation method to a statement without requiring the disclosure of the statement itself. Privacy group utilizes a private

channel between network entities so that only the transacting parties can view the transactions.

11 With key randomization, parties involved in a transaction is identified with their public key, while fresh key pairs are generated for

each transaction.

12 These methods separate individual transaction data.

## Page 15

Project Garuda: Wholesale Rupiah Digital Cash Ledger

11

Issuance &
Redemption
This section summarizes public opinions on
validation of token during issuance and
redemption, including the roles of Digital
Rupiah Depository (KDR) and token
validator.

KDR mainly operates in the management,
storage, and distribution of w-Rupiah Digital.
Commenters highlighted potential expansion
of the KDR functions for custodian services,
illegal transactions monitoring, and
interoperability of the Rupiah Digital.

Commenters argued that KDR
could be managed by Bank
Indonesia. On the other hand,
token validation functions for
issuance is performed by
participants…
verification and authorization, digital
signatures, network and system security,
data storage security, monitoring, auditing.

KDR Functions

Commenters argued that KDR could be
managed by Bank Indonesia. To prevent a
single point of failure, token validation
functions for issuance is performed by
participants. This would also accelerate
transaction processes, stimulate innovation,
ensure security, and reduce Bank Indonesia's
operational burden.
In the operationalization of the w-Rupiah
Digital issuance and redemption, several
risks may arise. These include the risks of
delays, errors, and faults in the issuance and
redemption as well as increasing cyber risks
due to 24/7 operations.
Regulations concerning the issuance and
redemption of w-Rupiah Digital should be
established. Specifically, the regulations
should cover areas such as the issuance and
redemption of w-Rupiah Digital outside of BIRTGS operating hours, the selection of
redemption mechanisms13, identity

KDR

(Digital Rupiah Depository)

Centre for managing, storing,
and distributing w-Rupiah
Digital.

Rupiah Digital
Interoperability

Custodian
Illegal
transaction
monitoring

13 Commenters from non-financial institutions conveyed two mechanisms for the redemption of w-Rupiah Digital: (i) in DLT system,

resulting in a decrease in the stock of w-Rupiah Digital; (ii) deposited in Bank Indonesia, resulting in no change in the stock of wRupiah Digital.

## Page 16

Project Garuda: Wholesale Rupiah Digital Cash Ledger

Gridlock Resolution,
Funds Transfer and
Settlement Finality
This section summarizes public opinions
on gridlock resolution application, liquidity
provision arrangements, and settlement
finality in DLT.

12

§ Commenters from financial and nonfinancial institutions observed the use
of smart contracts and Liquidity
Saving Mechanisms (LSMs), in
addition to queue management
systems.

A
F

B

A. Gridlock Resolution
Most commenters agreed that the high
complexity of gridlock14 resolution in DLT
is an important issue. Only a small fraction
of commenters that expressed this is only
relevant to retail transactions (r-Rupiah
Digital).
Commenters suggested gridlock resolution
in a DLT platform would require proper
consensus mechanisms, efficient
transaction queue management, and
appropriate technology adoption. The
implementation of the intraday/overdraft
facility scheme, performance standards for
validators, early warning indicators, and
ZKP are highly advised15. These solutions
are deemed as suitable for ensuring smooth
operation and improving overall platform
efficiency and scalability.

GRIDLOCK

E

C
D

Strategies
Associations

Financial and nonfinancial
institutions

§ Grouping of
transactions
§ Increasing the
number of
validators
§ Sharding
§ Zero-Knowledge
Rollups (ZK RollUps).

§ The use of
smart contracts
§ Liquidity Saving
Mechanism
(LSM)
§ Queue
management
system

Specifically, commenters elaborated several
strategies to prevent gridlock in DLT:

§ Association commenters recommended
grouping of transactions, increasing the
number of validators, sharding, and the use of
Zero-Knowledge Rollups (ZK Roll-Ups).

B. Funds Transfer
This aspect include the implementation of
liquidity provision functions in DLT.

14 According to the BIS, gridlock is a situation that can arise in a funds or securities transfer system in which the failure of some

transfer instructions to be executed (because the necessary funds or securities balances are unavailable) prevents a substantial
number of other instructions from other participants from being executed.
15 Project Ubin Phase 2 described the experimentation of gridlock mechanism on three DLT platforms. One of them is Quorum which
adopted zero-knowledge proof to resolve gridlocks.

## Page 17

Project Garuda: Wholesale Rupiah Digital Cash Ledger

13

Commenters tend to diverge on the role of
liquidity providers. Some argued that such
role is necessary to ensure an adequate
supply of w-Rupiah Digital, support the
smooth transfer of funds, ensure security
and efficiency in the transaction process,
monitor and estimate the demands for wRupiah Digital, and perform gridlock
resolution. This role could be fulfilled by
Bank Indonesia, wholesalers, commercial
banks, and other institutions appointed by
Bank Indonesia.

In contrast, several commenters expressed
that the role is no longer necessary with
the advent of smart contract. In addition,
participants’ liquidity requirements can be
covered using their BI-RTGS balance. Due to
the on-demand nature of the w-Rupiah
Digital, liquidity mismatch can be facilitated
by Intraday Liquidity Facility (FLI)16.
Financial institutions commenters
suggested that w-Rupiah Digital design
could focus on interoperability with BIRTGS. In addition, Bank Indonesia should
explore an early warning system for
managing participant liquidity, including the
use of Automated Market-Making (AMM)
and Liquidity Management Capabilities,
commonly found in Decentralized Finance
(DeFi) platforms.

C. Settlement Finality
Issues on settlement finality16 in DLT include
the suitability of consensus mechanism and
legal basis that ensures settlement finality in
a decentralized system.

Most commenters regarded PoA
as the most appropriate
consensus mechanism.
Nonetheless, there are risks
associated with PoA…
Most commenters regarded PoA as the most
appropriate consensus mechanism. It is
seen as more capable in guaranteeing finality
that the Proof-of-Stake (PoS) and Proof-ofWork (PoW). Settlement finality in DLT also
needs to accommodate transaction
reversibility and correction features, both of
which can be facilitated by smart contracts or
network configurations, before the settlement
finality point is reached.
Nonetheless, there are risks associated with
PoA. Those risks include compromised
validating nodes and violation of rules by
validating nodes18. To mitigate such risks,
Bank Indonesia should carefully select
validating nodes, in addition to a reliable and
secure system.
The effectiveness of PoA also depends on its
validation design and configuration. For this
reason, designing such consensus mechanism
would require comprehensive understanding
and careful planning. These are also relevant
to settlement finality in DLT, especially with
regards to immutability, including specifying
the distinction between the definitions of
finality according to the system and law.

16 According to PBI no.6/6/2004 regarding Intraday Liquidity Facility for Commercial Banks, intraday liquidity facility (FLI) is funding

facility offered by Bank Indonesia to facilitate banks overcoming their shortage in liquidity during the operating hours of the BI-RTGS
System given the value of outgoing obligation is greater than the balance of their Rupiah reserve account at Bank Indonesia.
17 Settlement finality is funds that have been transferred from one institution to another that is final and irrevocable in principle. This
procedure is regulated in Law Number 3 of 2011 concerning Funds Transfer to guarantee/ensure the point in time when the
transaction is declared final or irrevocable.
18 Validating nodes are considered compromised when they have been accessed or controlled by unauthorized or malicious parties.

## Page 18

Project Garuda: Wholesale Rupiah Digital Cash Ledger

Technical Capabilities
and 3i Aspects
(Interconnectivity,
Interoperability, dan
Integration)19
This section summarizes public opinions
on the technical harmonization between
DLT systems and financial market
infrastructures (FMIs) as well as the use of
cloud.

A. Harmonization of DLT
Systems with Traditional
Systems
This aspect includes issues on the
interoperability between DLT and
traditional systems, including the
prerequisites for coexistence and relevant
risk factors.
Commenters argued that integrating DLT
with FMIs could be the solution to improve
transactional efficiency. Thus, there is a
need for standardization and risk
mitigation through the adoption of the
latest technical standards, i.e., protocols,
data formats, APIs, and encryption, as well
as regulatory support.
Bank Indonesia should use a DLT
platform that supports interoperability
and prepare middleware for systems
integration. These aim to achieve crosschain transferability, complement the
existing systems and provide those
systems with added values while
promoting innovative use cases.

14

However, integration between w-Rupiah
Digital and FMIs encounters several risk
factors. The risks include cybersecurity,
regulatory compliance, ineffectiveness,
scalability, asset price volatility, asset loss
(partially or completely) due to
technological disruptions, and the systemic
impact of a failure in one participating node
on the overall system stability.

Commenters argued that
integrating DLT with FMIs
could be the solution to
improve transactional
efficiency…
In particular, commenters highlighted the
differences between technological design of
the decentralized w-Rupiah Digital platform
and the centralized r-Digital Rupiah from
the high-level configuration’s perspective of
Rupiah Digital. The Rupiah Digital
conversion between these two platforms
can introduce security risks. In this regard,
the commenters considered the use of
reliable middleware and connectors would
overcome this issue. The 3i aspects needs
to consider compatibility, cost effectiveness,
scalability, and transaction complexity
between w-Rupiah Digital platform and
FMIs.
Integrating DLT with existing financial
market infrastructures provide a solution
to improve transaction efficiency and
capability for the future. Certainly, this
decision is based on a clear understanding
of risks associated with interoperability and

19 The forms of connectivity between financial market infrastructures. Interconnection is the ability of two systems to exchange

information or transact indirectly through intermediaries. Interoperability is the ability of two systems to communicate or transact
directly. Integration is the harmonization of post-trade infrastructure in one institution for a value chain of transaction services.

## Page 19

Project Garuda: Wholesale Rupiah Digital Cash Ledger

15

regulatory harmonization. Bank Indonesia
and stakeholders must consider
compatibility, cost-effectiveness, scalability
and complexity of transactions across the
w-Digital Rupiah platform and existing
infrastructures.
Participations from the industry would
require appropriate incentives.

B. Cloud Usage
This aspect includes the use of cloud
provider which could enhance the
resilience of the DLT system for w-Rupiah
Digital.
Commenters viewed that standardization
of cloud used for the DLT platform is
crucial to mitigate risks related to the
regulators and participants20. The
unstandardized use of cloud services
possesses challenges for nodes to
establish connection and share data,
triggering system vulnerabilities and data
leakage (e.g. illegally copying data and
replicating data overseas).

Standardization of cloud would depend on
use cases and network design, service
level agreement (SLA), business continuity
plan (BCP), and audit and compliance. It is
also needs to consider landing zone,
network, compute, security, logging,
monitoring, and compliance. Commenters
suggested the use of masking and limiting
the types of data that can be transferred
based on sensitivity.

Bank Indonesia should consider the
prerequisites for the use of multiple
cloud services with different provider
locations spread across Indonesia.
Commenters believed that the use of cloud
should be optional. In this case,
participants may build an on-premise data
center tailored to their specific needs.
Flexibility, scalability, and services (such
as usability, cost, and security) are the
main factors influencing these needs.
For the early stages of the w-Rupiah
Digital implementation, commenters
suggested that Bank Indonesia might
offer an on-chain cloud to participants. In
the next stage, participants can connect to
the Rupiah Digital system through their
cloud or independent on-premise data
center.

Commenters viewed that
standardization of cloud used
for the DLT platform is crucial
to mitigate risks related to the
regulators and participants.
Furthermore, the use of cloud
should be optional…

20 Kesetaraan standar teknis antara lain penggunaan platform DLT permissioned yang saat ini umum digunakan dalam web 3.0.

## Page 20

Project Garuda: Wholesale Rupiah Digital Cash Ledger

Implications towards
Payment System,
Financial System
Stability, and
Monetary System
This section summarizes public opinions
on the implications of w-Rupiah Digital on
the payment system, financial system, and
monetary system.
The w-Digital Rupiah implementation will
alter the role of FMIs and increase the
payment system's efficiency. The
implementation and securities tokenization
will reduce the importance of Central
Securities Depositories (CSD)21 and
Central Counterparty (CCP)22. The
payment system's efficiency will increase
after a decrease in transaction costs and
an increase in transaction speed. The 24/7
operations of w-Digital Rupiah facilitate
real-time settlement with immediate
finality and reduce human errors.

16

Participants’ compliance with rules and
standard aspects and the availability of
various use cases can optimize Digital
Rupiah value added. The aspects include (i)
data security and protection (encryption,
authentication, firewalls, monitoring,
recovery procedures); (ii) reliable
infrastructure; (iii) collaboration and sharing
information among participants; (iv) the
availability of risk monitoring and evaluation
systems, to manage the risk of
interdependencies between infrastructures
and between participants.

Several potential use cases, such as
securities bonds, forex transactions with
Payment versus Payment (PvP)23, and
Delivery versus Payment (DVP)24, and its
application on Interbank Money Market
(PUAB), can accelerate the adoption of
Rupiah Digital.
The implementation of Rupiah Digital
could contribute to the financial market
deepening. The 24/7 Rupiah Digital
operation will assist banks to fulfilling their
daily liquidity needs. The implementation
will also encourage innovation in certain
products, such as digital insurance and
digital asset-based financing.

Added Values
Optimalization of
Use Cases

Data Security
and Protection

Infrastructure
Reliability

Collaboration and
Data Exchange

Availability of
Risk Monitoring
and Evaluation
System

## Page 21

Project Garuda: Wholesale Rupiah Digital Cash Ledger

17

However, the integration of w-Digital
Rupiah with existing FMIs carries with it
certain risks. The risks include cyber
security, ineffective system integration, low
scalability, high volatility, operational
disruption, and systemic risk because of
node failure. Even though industry
participation could aid in reducing
concentration risk and easing the need for
liquidity outside of BI-RTGS operating
hours, their participation could increase
liquidity and credit risks. In addition,
respondents highlight the risk of
disintermediation and the rise in banks'
average cost of funds.

On the monetary side, respondents were
most concerned with the impact of wRupiah Digital on reserve requirements
(GWM), monetary operations (OM), and
PUAB. Participants’ GWM will decrease,
resulting from Digital Rupiah issuance via
the conversion of BI-RTGS balances.
However, only a small proportion of
respondents believe that GWM or OM
construction will remain unchanged
following the implementation of the wDigital Rupiah. Focusing on PUAB, the 24/7
operations, and the variety of use cases
will increase activity in PUAB, the foreign
exchange and the securities market.

Respondents believed the existence of a
lender of last resort on w-Rupiah Digital
was necessary to mitigate the risks
described above. In addition, they
recommend that Bank Indonesia closely
monitor participant compliance to
participation requirements and design
risk management proportionally.
Moreover, Rupiah Digital must be a noninterest-bearing asset, similar to fiat
money, to prevent price volatility and
disintermediation risks.

In terms of risk factors, respondents
were concerned about the possibility of
moral hazard exploiting the DLT system's
transparent features. Using the w-Rupiah
Digital platform in OM transactions, for
instance, may result in collusion between
participants acting as DLT validators. On
the DLT platform, participants can store
and access data and information regarding
the liquidity positions and conditions of
other participants for use in OM
transactions. If this risk materializes, Bank
Indonesia's monetary policy may become
less effective.

W-Rupiah Digital implementation faces a
number of challenges. The majority of
respondents are concerned about Rupiah
digital's real-time settlement and 24/7
operations, which may have an impact on
participant profiles and liquidity structure.
The 24/7 operational hours of the digital wRupiah, which are outside of the BI-RTGS
operating hours, will have an impact on
how participants manage their liquidity and
treasury activities, particularly back-office
settlement and nostro monitoring.

Most respondents believe the w-Digital
Rupiah must be included in the GWM
calculation. The w-Rupiah Digital design
must incorporate data protection features
to reduce the possibility of collusion among
validating nodes. Bank Indonesia must also
calculate issuance and redemption to
maintain control over its balance sheet and
the effects of w-Rupiah Digital's substitute
of fiat currency.

## Page 22

Project Garuda: Wholesale Rupiah Digital Cash Ledger

In general, the top-level design of w-Digital
Rupiah as described in the publication “Project
Garuda: Navigating The Architecture Of Digital
Rupiah“ is in line with public views and
expectations…

18

## Page 23

19

Project Garuda: Wholesale Rupiah Digital Cash Ledger

1. The high-level design of w-Rupiah Digital, as presented
in the publication "Garuda Project: Navigating Digital
Rupiah Architecture," aligns with the public perspective
and expectation. The public perspective concurs with the
key elements of the Digital Rupiah configuration, such as
technological choices on DLT permissioned, the two-tier
distribution model through wholesalers, and the 3i aspects
(interconnection, interoperability, and integration).

2. Additionally, public input significantly contributes to the
improvement of the Digital Rupiah's design, particularly in
its initial development stage (immediate stage). Several
inputs, including the PoA consensus mechanism, the
procedures for validator functions in the w-Rupiah Digital
platform, and the PET application for gridlock resolution,
present opportunities to refine the Digital Rupiah's design
comprehensively.
3. The public consultation results also revealed several
challenges and risk factors that Bank Indonesia must
address. The results of the public consultation also
revealed a number of challenges and risk factors that Bank
Indonesia must consider. An in-depth examination of
operational risk, especially cyber risk, which is highly
scrutinized by the public, provides Bank Indonesia with
invaluable insights for identifying critical points when
exploring Rupiah Digital Design.
4. Inputs and feedback from the public will assist w-Digital
Rupiah in the development and refinement, particularly at
the Proof of Concept (POC) stage. Given that Rupiah
Digital is a national effort to safeguard Rupiah's
sovereignty, the Garuda project possesses a strong sense
of nationalism. Collaboration with stakeholders is essential
to its development, and public consultation is evidence of
this engagement.

## Page 24

Project Garuda: Wholesale Rupiah Digital Cash Ledger

20

Through wholesalers
and retailers
(open 1-tier)
Distribution
Transaction
Legal Claim

CENTRAL
BANK
Gold, Securities, Foreign
Exchange, Reserves

ASSET

CBDC
Real Money
LIABILITY

W-CBDC
X
Y

R-CBDC
X
A
Y
B
L
C
M
D
E

Wholesaler

Wholesaler Y

X

Retailer L
(Bank)

Retailer M
(Non-bank)

Individual A

Merchant B

One entity

R-CBDC

W-CBDC

Giro Accounts

Individual B

Retailer

Individual D

Merchant E

## Page 25

Project Garuda: Wholesale Rupiah Digital Cash Ledger

iv

Consultative Paper Question List
Access (Participation, Data Access, and Wallet)
§

In your view, what are the implications of segregating participation into
wholesaler and non-wholesaler? Would this segregation adequate to
mitigate risk?

§

In your view, does the number of validators for w-Digital Rupiah platform
need to be large to ensure its operational efficiency and effectiveness? What
would be your considerations?

§

In your view, how should incentives/rewards be designed in order to
encourage participants to take a role as a validating node?

§

In your view, what would be the risk if wholesalers have options to select
non-validating node?

§

In your view, what would be the risk of non-wholesalers who act as a
validating node?

§

Has it been possible to expose data content partially in DLT, e.g., only
transaction value, to allow for the implementation of gridlock resolution
without violating privacy? To what extent could data visibility be set?

§

What are the arrangements/standards for identity management in the wDigital Rupiah platform (identity service) that could protect user privacy and
enable traceability, including monitoring of illegal transactions?

§

What are the factors that need to be taken into consideration in selecting
the privacy-enhancing technology?

§

How can confidentiality and auditability be balanced in a decentralized
system?

§

In your view, should the issuance and management of w-Digital Rupiah
wallet be directly performed by Bank Indonesia, or should it be handed over
to the industry?

§

Should cold wallets be mandatory for the w-Digital Rupiah design?

2

1

Issuance and Redemption
§

What is your view on KDR role?

§

In your view, should the role of validating the authenticity of Digital
Rupiah be delegated to participants other than Bank Indonesia?

§

What would be the risk embodied in the withdrawals and
redemption process of w-Digital Rupiah that need to be taken into
consideration?

## Page 26

Project Garuda: Wholesale Rupiah Digital Cash Ledger

v

Gridlock Resolution, Funds Transfer,
Settlement Finality

3
•

In your view, does w-Digital Rupiah require the role of liquidity
providers? If required, who should take the role?

•

In your view, is the risk of gridlock relevant in a DLT system as is in a
centralized system? If so, how could gridlock resolution be implemented
fairly in a DLT system?

•

Is proof of authority sufficient to ensure settlement finality?

•

Are the current legal provisions sufficient to ensure settlement finality in
a decentralized system?

Technical Capabilities and 3I
•

In your view, what would be the conditions for a DLT system to coexist
with existing centralized systems like BI-RTGS? What are the potential
use cases that could stimulate systems’ coexistency other than issuance
and redemption?

•

What risks might arise from the coexistence between w-Digital Rupiah
DLT platform and the current financial market infrastructures, including
in the event that effective coexistence fails to occur?

•

How could Digital Rupiah be designed to achieve transferability across
multiple payment platforms (cross-chain platforms)? Are new
technologies or technical standards required?

Consultative Paper
Question List

4

## Page 27

Project Garuda: Wholesale Rupiah Digital Cash Ledger

vi

5

Technology: Scalability and Resilience
§ Would a decentralized system provide better operational resilience than a
centralized system? Would proof of authority be adequate in mitigating cyberattack?
§ To what extent does DLT risk management differ from centralized systems? What
capabilities must be built by each party involved?
§ What aspects must be considered and ensured in designing backups and Business
Continuity Plan (BCP) for decentralized systems? Must each node in DLT maintain an
active backup to ensure resilience of each node within the DLT?
§ Does the use of cloud in DLT networks require standardization? If so, to what degree
should cloud standardization be implemented within a resilient DLT ecosystem?
§ In your view, is a permissioned DLT comparable to centralized systems in handling
low-volume and high-value transactions, including its capacity to tackle the surge in
transaction volume?
§ What is the optimal level of distribution/decentralization in the Digital Rupiah ledger
to achieve the optimal combination of resilience, speed, efficiency, and scalability?
§ Would there be other operational risks that have not been clearly mapped in the use
of DLT, especially those affecting system resilience, reliability and security and how
could they be addressed? What operational or cyber risks may be unavoidable?

Implications for Payment System,
Financial System, and Monetary System
•

How would the use of w-Digital Rupiah change the financial structure, particularly
the interbank money market structure, including its implications for the asset
pricing? Does the classification of participation into wholesalers, non-wholesalers,
and retailers affect the market structure and resilience of the financial industry and
payment systems?

•

Should the quantity of w-Digital Rupiah in circulation be capped? If so, what factors
should be considered for such policy?

•

What implications would arise due to the 24/7 operation of interbank money market,
enabled by the use of w-Digital Rupiah?

•

What are the minimum requirements that must be met by each participant to
manage risk arising from interdependencies?

•

In your view, what opportunities and challenges could arise from active involvement
of nonbank entities in financial markets? Is it necessary to have specific criteria
regarding the participation of non-bank financial institutions in the w-Digital Rupiah
platform? Are capital requirements considered sufficient to mitigate risks?

•

Which features should be adopted by Digital Rupiah to optimize its potential added
value to financial market deepening (i.e., potential smart contracts that could be
leaveraged to overcome classic problems related to financial market deepening)?

•

What factors must be considered to ensure effective adoption of Digital Rupiah in
the wholesale market? What use cases are needed to ensure effective adoption of wDigital Rupiah?

6

## Page 28

Project Garuda: Wholesale Rupiah Digital Cash Ledger

Glossary
Auditability
Automated Market
Makers (AMM)
BI- RTGS
Blockchain
Bonding Curve
Business Continuity
Plan (BCP)

The degree on how easy a system or process or historical data is to be examined and
evaluated by auditors effectively and efficiently,
A decentralised exchange using a bonding curve and a liquidity pool to price and exchange
tokenised assets (i.e. a constant function market-maker).
Financial infrastructure used for electronic funds transfer where the settlement is
instantaneous on a gross basis.
An immutable digital ledger shared across computers within a network that supports
recording digital transactions and tracking assets.
A function determining the relative price of the assets traded through an AMM.

Cloud

Strategies to overcome certain circumstances where business must continue after a
disaster.
An entity that interposes itself between counterparties to contracts traded in one or more
financial markets, becoming the buyer to every seller and the seller to every buyer and
thereby ensuring the performance of open contracts.
An entity that provides securities accounts, central safekeeping services and asset
services, which may include the administration of corporate actions and redemptions and
plays an important role in helping to ensure the integrity of securities issues (that is,
ensure that securities are not accidentally or fraudulently created or destroyed or their
details changed).
Data storage and processing facilities provided by third parties allowing shared computing
resources to multiple parties with all data encrypted.

Cold Wallet
Cold Storage
Compliance

Physical hardware wallet for storing private keys offline.
See Cold Wallet.
Acts of complying with standards of cloud usage regulations.

Compute

Provision of cloud computing resources such as servers, data storage, networking, and
software over the internet.

Central
Counterparty (CCP)

Central Securities
Depositories (CSD)

Cross-Chain
Platform
Decentralized
Finance (DeFi)
Delivery versus
Payment (DvP)
Digital Rupiah
Depository
Distributed Ledger
Technology (DLT)
Early Warning
System
Encryption
Ethereum 2.0
Fresh Key Pairs
Gridlock
Hot Wallet
Immediate Finality

Interoperability of crypto technology where multiple blockchain networks are connected
allowing exchanges of information and value.
A new paradigm in the provision of services including lending, investing or exchanging
cryptoassets that uses DLT and do not rely on traditional (decentralized) intermediary
institutions.
A new paradigm in the provision of services including lending, investing or exchanging
cryptoassets that uses DLT and do not rely on traditional (decentralized) intermediary
institutions.
Digital Rupiah Depository, is one of the nodes in the w-Digital Rupiah platform involved in
the issuance and redemption of w-Digital Rupiah tokens.
An approach that records and shares data across multiple data storage locations
(journals). This technology enables transactions and data to be recorded, shared and
synchronized across distributed networks with different network participants.
A preventive measure to detect indications of potential hazards. In this report, potential
hazards refer to shortage of liquidity.
A form of data security technique through conversion of data into secret codes (obscuring
data sent, received, or stored) so that it can only be accessed by certain people with
access.
An improved version of Ethereum 1.0 (a public blockchain network) aimed to improve
scalability, accessibility, and transaction throughput.
New symmetric lock pairs generated from public key cryptography.
Situation that can arise in a funds or securities transfer system in which the failure of
some transfer instructions to be executed (because the necessary funds or securities
balances are unavailable) prevents a substantial number of other instructions from other
participants from being executed.
Software wallet for storing private keys that is connected online.
In this context, immediate finality refers to the settlement of transactions in DLT which
conceptually will be faster compared to centralized systems. In technical blockchain terms,
immediate finality refers to the period when a block is added to the local ledger.

vii

## Page 29

Project Garuda: Wholesale Rupiah Digital Cash Ledger

viii

Immutability
Intraday Liquidity
Facility (ILF)
Key Randomization
Landing Zone
Layer-2 Scaling
Technology
Lender of the Last
Resort
Liquidity Management
Capabilities
Liquidity Pool
Liquidity Saving
Mechanism (LSM)
Logging

A condition where data that has been stored can no longer be deleted, overwritten, or
modified.
Funding facility offered by Bank Indonesia to facilitate banks overcoming their shortage in
liquidity during the operating hours of the BI-RTGS System given the value of outgoing
obligation is greater than the balance of their Rupiah reserve account at Bank Indonesia..
Public key cryptography with hash functions that can accommodate signing, confidentiality
and tamper-proofing processes of transactions in the network.
Modular and scalable configurations that allows organizations to adopt the cloud for their
business needs.
Layer 2 is a collective term for solutions designed to help scale your application by handling
transactions off the Ethereum Mainnet (layer 1) while taking advantage of the robust
decentralized security model of Mainnet.
Authorities provide liquidity in times of crisis.
The ability to manage liquidity through the placement or transfer of funds across
instruments to maintain smooth transactions or gain returns.
Smart contract with the ability to hold and transfer tokenised assets based on pre-defined
logic.
The features/mechanisms which include frequent netting or offsetting of transactions
(payments and/or securities) in the course of the operating day. A typical approach is to hold
transactions in a central queue and to net or offset those transactions on a bilateral or
multilateral basis at frequent intervals.
Enabling customers to manage, analyze, monitor, and derive insights from log data in the
cloud in real time.

On-Chain Cloud

Obfuscating sensitive information by replacing it with proxy data.
The term for the hardware or software components that connect various computers or
applications.
Types of wallets with multiple layers of security features; requiring two or more private keys
to perform a specific task.
Cryptographic security technology that allows multiple parties to assess computing without
revealing personal information or related confidential data held by each party.
Cryptographic security technology that allows multiple parties to assess computing without
revealing personal information or related confidential data held by each party.
An integral piece of distributed ledger technology that store ledgers.
A type of participation where the participant does not have a node and only needs to provide
a network to connect to the operator's ledger service.
Types of financial assets that do not provide and/or promise over time returns or
remuneration (e.g., interest rates) from the issuer to its holders and/or owners.
Parties that have access to Digital Rupiah directly from Bank Indonesia and can transact on
the w-Digital Rupiah platform.
A type of participation where the participant is granted the rights to control the
management/custody of their w-Digital Rupiah tokens without a right to perform as
validator.
Dedicated servers that perform notarized transactions.
Transaction processing outside the blockchain, involving third parties who guarantee,
facilitate deals, and execute transactions. The agreement between transacting parties is
made outside the blockchain. The third party set the terms of the agreement, and it will
execute and record the transaction into blockchain after the terms are met.
A public cloud that everyone on the network can see

On-Premise

Data storage and processing facilities owned and managed by the company itself (in-house).

Operating Costs

In the context of this CP Report, the definition of operating costs refers to costs arising from
wholesaler/non-wholesaler operational activities in carrying out their functions as
validating/non-validating/no-node.
A settlement mechanism that ensures that the final transfer of a payment in one currency
occurs if and only if the final transfer of a payment in another currency or currencies takes
place.
A paradigm in DLT that restricts access to distributed ledger to certain parties. Participants,
including validators, are known and authorized.

Masking
Middleware
Multi Signature
(Multisig)
Multi-Party
Computation
Network
Node
No-Node
Non-Interest Bearing
Asset
Non-Wholesaler
Non-Validating Node
Notary Node
Off-Chain

Payment versus
Payment (PvP)
Permissioned DLT

## Page 30

Project Garuda: Wholesale Rupiah Digital Cash Ledger

Permissionless DLT
Privacy Enhancing
Technology (PET)
Privacy Group
Private Key
Private Key
Management
Framework
Proof-of-Authority
(PoA)
Proof-of-Stake (PoS)

Proof-of-Work (PoW)

Public Key
Queue Management
System
Real Time Settlement
Return on Investment
Reversibility
Ring Signature
Roll-Up
Scalability
Securities Bond
Service Level
Agreement (SLA)
Smart Contract
Settlement Finality
Sharding
Single Point of
Failure
Throughput
Token
Transferability
Use Case
Validating Node
Wallet (E-wallet)
Wholesaler
Transferability

Use Case

A paradigm in DLT that open access to the DLT platform to the public. Any party can
participate in the network, including as validator.
Technology designed to extract the value of data without compromising data protection
principles.
A private channel between entities on the network so that transactions are known only to
the transacting participants.
A key used to decrypt information encrypted with a public key.
Private key management solutions for enhanced security where transactions from a
wallet can only be authorized/executed if/when a group of clients sharing the wallet have
enough private key fragments to authorize a transaction.
A consensus mechanism for DLT characterized by only certain parties performing
validation of transactions which are appointed by an authority.
A consensus mechanism for DLT characterized by only certain parties performing
validation of transactions which are selected based on computing capabilities and
pledged/staked coins.
A consensus mechanism for DLT characterized by all network participants having the
right to validate transactions through competition to solve complex mathematical
puzzles/problems (a.k.a. mining).
A key that can be used to encrypt information and used to verify a digital signature.
System which has specific configuration for handling transaction queues.
Immediate settlement occurs once assets are received and transferred at the same time.
In the context of this CP, the return on investment of participants in carrying out their
functions as validating/non-validating/no-node in the w-Rupiah Digital design.
Features where transactions can be reversed.
Digital signatures created by members of a group, each with their own key, are useful for
maintaining authenticity, integrity, and non-denial.
Batch of transactions for processing.
The ability of an IT system (such as applications, storage, or networks) to work properly
under increasing workloads.
Debt securities with a certain tenor and interest rate.
Contractual agreement between service provider and client on the type and standard of
service that needs to be met.
A programmable digital contract that can be executed given certain conditions.
Funds that have been transferred from one institution to another that are in principle final
and irrevocable.
Method for splitting transactions into smaller, more manageable parts.
Any point in a system, whether a service, activity, or process, that, if it fails to work
correctly, leads to the failure of the entire system.
A measure of how many transactions a blockchain can process in a given period of time.
A verified digital version of banknotes and coins.
The ability of data or entities in different circumstances
Overview of the functionality of a system, so that system users understand and
understand the usefulness of the system to be built.
A type of participation where the participant is granted the rights to perform as validator
of transactions and control the management/custody of their w-Digital Rupiah tokens.
Services that are electronic and function to store data and payment instruments and
transact on digital platforms.
A party who obtains the right to access Digital Rupiah directly from Bank Indonesia and
distributes it to retailers and end users.
A way of proving the validity of a statement without revealing the statement itself. The
‘prover’ is the party trying to prove a claim, while the ‘verifier’ is responsible for
validating the claim.
Layer 2 scaling solutions that increase throughput on Ethereum Mainnet by moving
computation and state-storage off-chain.

ix

## Page 31

Project Garuda: Wholesale Rupiah Digital Cash Ledger

x

Auer, Raphael., Haslhofer,. Bernhard., Kitzler, Stefan., Saggese, Pietro., dan Victor, Friedhelm.
(2023). The Technology of Decentralized Finance (DeFi). Bank for International
Settlements. Januari. https://www.bis.org/publ/work1066.pdf
Bank for International Settlements. (2023). Project Mariana: Cross-border exchange of wholesale
CBDCs using automated market-makers. Bank for International Settlements. September.
https://www.bis.org/publ/othp75.pdf
Bank for International Settlements and International Organization of Securities Commissions.
(2012). Principles for financial market infrastructures. April.
https://www.bis.org/cpmi/publ/d00b.htm?selection=76&scope=CPMI&c=a&base=term
Bank Indonesia (2022). Project Garuda: Navigating the architecture of digital rupiah. Retrieved from
https://www.bi.go.id/en/rupiah/digital-rupiah/default.aspx#wp
Bank Indonesia (2023). Consultative Paper: Project Garuda – Wholesale digital rupiah cash ledger.
Retrieved from https://www.bi.go.id/en/rupiah/digital-rupiah/default.aspx#ConsultativePaper
Bech, Morten L. and Soramäki, Kimmo. (2001). Gridlock Resolution in Interbank Payment Systems.
Bank of Finland Research Discussion Paper No. 9/2001. Juni.
https://ssrn.com/abstract=3018053
Cook, J. (2023). Zero-Knowledge Rollups. Retrieved from
https://ethereum.org/en/developers/docs/scaling/zk-rollups/
European Central Bank & Bank of Japan. (2017). Project Stella Payment systems: liquidity saving
mechanisms in a distributed ledger environment. ECB. September.
https://www.ecb.europa.eu/pub/pdf/other/ecb.stella_project_report_september_2017.pdf
Monetary Authority of Singapore dan The Association of Banks in Singapore. (2017). Project Ubin
Phase 2: Re-imagining Interbank Real-Time Gross Settlement System Using Distributed
Ledger Technologies Powered by Accenture. MAS. November. https://www.mas.gov.sg//media/MAS/ProjectUbin/Project-Ubin-Phase-2-Reimagining-RTGS.pdf

## Page 32

Project Garuda: Wholesale Rupiah Digital Cash Ledger

xi

Steering Committee: Filianingsih Hendarta
Coordinator : Dicky Kartikoyono
Editor
: Ryan Rizaldy

Writer
Rozidyanti (Coordinator), Eva Rosdiana Lase, Sigit Setiawan, Teguh Arifyanto,
Nadya Astrid Puspitaningrum, Indah Ayu Fauziah, Septy Adriningsih, Claudia
Hapsari Priyono, Hanzholah Shobri, Tria Rahmat Mauludin, Muhammad
Noorrosyid Sulaksono, Farhan Sumadiredja, Ridha Nur Huzaifah

Translator
Teguh Arifyanto, Hanzholah Shobri, Radhy Muhammad Ampera

Layout & Design
Nur Annisa Hasniawati, Fathahilah Dipanegara

Back Office
Kanne Aprillia Dyna Hutagalung, Peni Mala Sari
Acknowledgements and appreciation were also conveyed to DKEM, DSSK,
DPSD, DPID, and DKMP for the comments given.

## Page 33

www.bi.go.id

BankIndonesiaOfﬁcial

bank_indonesia

Bank Indonesia Channel

@bank_indonesia

Contact Center: 131
