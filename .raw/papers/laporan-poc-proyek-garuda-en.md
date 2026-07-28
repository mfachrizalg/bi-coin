---
source_type: pdf
title: "Laporan POC Proyek Garuda EN"
original_file: "thesis/reference/Laporan_POC_Proyek_Garuda_EN.pdf"
sha256: "84927f4b3325df560508d52496571be2c725b9d3743f4bfed617d641269497c7"
page_count: 50
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Laporan POC Proyek Garuda EN

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Proof of Concept (PoC) Report

Wholesale Rupiah Digital
Cash Ledger
December 2024

## Page 2

Project Garuda: Proof of Concept (PoC) Report
Wholesale Rupiah Digital Cash Ledger
BANK INDONESIA
Jalan M.H. Thamrin No.2
Jakarta - 10350
Indonesia
This publication is available at Bank Indonesia website (www.bi.go.id).
Jakarta, December 2024
© Bank Indonesia 2024. All rights reserved.
Design and Layout by Setyo Kuncoro, Bagas Aji Pratama, Kevin Eza Rizky,
Timothy Thamrin Andrew H. Sihombing, Sirria Panah Alam, Dewi Septina Br Pelawi,
Bijak Antusias Sufi, Faradilla Azranur, Dian Nofitri, Annisa Muzdalifa

## Page 3

Contents
Figures
Preface Governor of Bank Indonesia
Preface Deputy Governor of Bank Indonesia
Preface Deputy Governor of Bank Indonesia
Executive Summary
Overview
1.1. Background
1.2. Objective
1.3. Business Model
PoC Methodology
2.1. PoC Stages
2.2. PoC Scenario
2.3. Scope and Assumptions
PoC Development
3.1 Use Case Layer

3.1.1 Money Supply Process

3.1.1.1 Issuance

3.1.1.2 Redemption

3.1.1.3 Fund Transfer

3.1.2 System Policy

3.1.2.1 Limit Feature

3.1.2.2 Administrative Features

3.1.3 Supervision
3.2. Digital Asset Layer
3.3. Execution Layer

3.3.1. Container

3.3.2. Smart Contract

3.3.3. Application Programming Interface (API)

3.3.4. Web Application (Web App)

3.3.5. Messaging

3.3.6. Integration, Interoperability, and

InterConnection (3i)
3.4. Data Layer

3.4.1. Storage in the Database

3.4.2. Structure of DLT
3.5. Consensus Layer
3.6. Network Layer
3.7. Security Aspects
PoC Testing & Result
4.1. Implementation of DLT in Money Supply Process of

Wholesale Rupiah Digital
4.2. Implementation of Smart Contract on Rupiah Digital

Wholesale Platform
4.3. Integration, Interoperability and Interconnection of

wRD with Other Financial Market Infrastructure
Finding and Next Step
5.1 Finding
5.2 Next Step
Abbreviations

I
II
III

1
2
3

4

5

i
iii
v
vi
vii
1
2
2
4
5
6
6
6
6
8
8
8
8
9
10
11
11
11
12
12
12
13
13
13
13
13
14
14
14
15
15
15
16
17
17
18
19
20
20
20
21

Contents

## Page 4

Appendix A. Detail Evaluation of DLT

B. Implementation Details of the Use Case Layer
C. Implementation Details of the Execution Layer
D. Implementation Details of the Data Layer
E. Implementation Details of the Consensus Layer
F. Implementation Details of the Network Layer
G. Liquidity Management and Privacy Concepts for
		 Advanced Exploration
H. PoC Scenario Topics
I. Load Test
List of Authors

Contents

22
24
26
31
33
35
36
38
39
42

## Page 5

Figure 1. Three Goals of the Rupiah Digital

2

Figure 2. Project Garuda Stages

3

Figure 3. Project Garuda Activities

4

Figure 4. wRD Membership Registration

5

Figure 5. Money Supply Process at wRD

5

Figure 6. wRD PoC Configuration

7

Figure 7. wRD PoC Architecture

7

Figure 8. Issuance and Redemption wRD Platform Integrated
with BI-RTGS

8

Figure 9. (a) RTGS Triggered Issuance Process
(b) Platform Triggered Issuance Process

9

Figure 10. Redemption Flow Platform Triggered

10

Figure 11. Fund Transfer Process with Queue Mechanism

10

Figure 12. Observer Node Solution

12

Figure 13. Web App View on R3 Corda Solution

14

Figure 14. Web App View on Kaleido Hyperledger Besu Solution

14

Figure 15. Design of Data Layer on R3 Corda

15

Figure 16. The Process of Identifying New Members in
		 the Network
		 (a) In the Implementation of R3 Corda;
		 (b) In the Implementation of Kaleido Hyperledger Besu

16

Figure 17. Creation on R3 Corda UTXO

24

Figure 18. Creation on Kaleido Hyperledger Besu Account Based

24

Figure 19. Destruction on R3 Corda UTXO

24

Figure 20. Destruction on Kaleido Hyperledger Besu

24

Figure 21. Redemption Process RTGS Triggered

25

Figure 22. Bank Indonesia’s R3 Corda Cluster Configuration
		 on AWS Infrastructure

26

Figure 23. Participant’s R3 Corda Cluster Configuration
		 on AWS Infrastructure

26

Figure 24. Kaleido Hyperledger Besu Cluster Configuration
		 of Bank Indonesia’s and Participant’s Node
		 on AWS Infrastructure

27

Figure 25. CordApp Component

28

Figure 26. Rupiah Digital and Digital Securities Illustration at
		 Wholesale Wallets R3 Corda

28

Figure 27. Firefly Event Bus (Hyperledger Firefly, 2024)

29

Figure 28. R3 Corda Based PoC Solution Design:
		 BI-RTGS Integration

30

Figure 29. Database Design on R3 Corda

31

Figure 30.Database Design on Kaleido Hyperledger Besu

31

Figure 31. Directed Acyclic Graph on R3 Corda

31

Figure 32. Kaleido’s Asset Platform Digital Data Layer
		 (Kaleido, 2024)

31

Figure 33.Blockchain on Kaleido Hyperledger Besu

32

Figure 34. Consensus Mechanism in R3 Corda

33

Figure 35.Consensus Mechanism in Kaleido Hyperledger Besu

33

Figure 36.Illustration of the Use of CENM (Corda, 2024)

35

Figures

## Page 6

Figure 37. Queue Management Flow for Further Exploration

36

Figure 38. Kaleido’s Privacy Model Concept for Further Exploration 37

Figures

Figure 39. R3 Corda Infrastructure on AWS for Wholesale
			Participant Clusters

39

Figure 40. Kaleido Hyperledger Besu Infrastructure on AWS for
			Wholesale Participant Clusters

40

## Page 7

PREFACE
Governor of Bank Indonesia
Assalamu’alaikum Warahmatullahi Wabarakatuh,
Greetings to all of us, Shalom, Om swastiastu, Namo buddhaya, Greetings of virtue.
Currently, Bank Indonesia through the Project Garuda has completed the first phase of the Rupiah
Digital exploration journey, known as the Immediate State, which is marked by the completion of the
proof of concept wholesale cash ledger Rupiah Digital. This achievement is a manifestation of Bank
Indonesia’s commitment to the development of the Rupiah Digital in response to the rapid growth of
the digital financial economy and in its position as the sole authority in issuing legal currency in the
Republic of Indonesia.
The development of the Rupiah Digital is carried out by prioritizing the public interest while carrying
out the mandate of the effectiveness of the implementation of Bank Indonesia’s duties. This makes the
Rupiah Digital critical to complement the digitalization of the payment system, especially in supporting
the development of an increasingly decentralized digital financial economy in the future. The Rupiah
Digital is also directed to be integrated, interoperable, and interconnected with the current payment
system and financial market infrastructure, both domestically and cross-border.
The proof of concept stage of wholesale cash ledger Rupiah Digital is taken to ensure the use of the
right technology in meeting the design needs of the Rupiah Digital which has also considered various
views and public inputs. We see the proof of concept as an essential step to evaluate the feasibility
of the technology that will be the basis for the operationalization of the Rupiah Digital in the future,
including identifying potential risks. We hope that the proof of concept will not only serve as a means
of technical testing, but also as a tool to ensure the long term adoption and success of implementing
the Rupiah Digital in Indonesia.
The publication of this report is a manifestation of Bank Indonesia’s transparency in every stage of the
development of the Rupiah Digital. Bank Indonesia will continue to advance with the Project Garuda
initiative in responding to future payment system challenges. We hope that this project will have a
great impact and benefit the entire nation, especially in maintaining the sovereignty of the Rupiah in
the digital era.
Wassalamu’alaikum warahmatullahi wabarakatuh

Jakarta, December 2024
Perry Warjiyo
Governor of Bank Indonesia

v

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 8

PREFACE
Deputy Governor of Bank Indonesia
Assalamu’alaikum Warahmatullahi Wabarakatuh,
Greetings to all of us, Shalom, Om swastiastu, Namo buddhaya, Greetings of virtue.
Bank Indonesia, through the Project Garuda, has completed the proof of concept for Rupiah Digital
in the first phase of the wholesale cash ledger, known as the Immediate State. This proof of concept
is a strategic step in testing the feasibility of technology that supports the development of the Rupiah
Digital business model. The testing was done comprehensively, covering critical technical aspects,
transaction security, and interoperability with existing payment systems and financial infrastructure.
The proof of concept design, deeply focused on these three aspects, aiming to ensure that the
developed system can deliver efficient, secure, and reliable services.
Each stage of the technology testing is a crucial element in the process of enriching ideas, exploring
innovation, and validating previously formulated concepts. This testing was conducted using 2 (two)
potential technology platforms based on distributed ledger technology (DLT), which underwent
thorough technical evaluations and were aligned with the projected needs of the Rupiah Digital
business model in the future. The results of the testing show that both technology platforms have
different characteristics and advantages, especially in terms of resilience, privacy, speed, scalability,
and fault tolerance. The overall results of the proof of concept were able to meet all test scenarios and
prove that distributed ledger technology-based solutions can meet the business and technical needs of
the wholesale Rupiah Digital cash ledger.
This initial phase of the proof of concept marks an important milestone in the development of the
Rupiah Digital. The success and various insights from this proof of concept will form the foundation for
strengthening the business and technical aspects of the Rupiah Digital in the future.
Moving forward, we are committed to continuing the exploration of the Rupiah Digital through the
Intermediate State phase in Project Garuda. We hope that the exploration of the Rupiah Digital can
support Bank Indonesia’s efforts to maintain the sovereignty of the Rupiah and provide an innovative
and inclusive solution to address various challenges arising from the development of digital economy
and finance in the future.
Wassalamu’alaikum warahmatullahi wabarakatuh

Jakarta, December 2024
Juda Agung
Deputy Governor of Bank Indonesia

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

vi

## Page 9

PREFACE
Deputy Governor of Bank Indonesia
Assalamu’alaikum Warahmatullahi Wabarakatuh,
Greetings to all of us, Shalom, Om swastiastu, Namo buddhaya, Greetings of virtue.
The Rupiah Digital, as one of the five initiatives (4 I + 1 RD) in the Indonesia Payment System Blueprint
2030, is currently being explored under the Project Garuda. Each stage of the Project Garuda is carried
out through an ongoing iterative process, starting from design drafting to testing the technological
feasibility through proof of concept. Bank Indonesia has received various constructive public inputs
regarding the design of the wholesale Rupiah Digital cash ledger, which will be tested in the proof of
concept.
Collaboration with the public is a key element in the development of the Rupiah Digital. We have
conducted a series of consultations and received valuable input from industry, associations, ministries/
institutions, academics, and the community. The results of the consultative paper that we received until
July 15, 2023, provide in-depth insights and become constructive inputs in improving the design of
the Rupiah Digital. Active participation of various stakeholders enriches the development process and
ensures that the resulting Rupiah Digital meets the needs and expectations of all stakeholders.
Proof of concept for the wholesale Rupiah Digital cash ledger is focused on testing the business
model, particularly related to the processes of issuance, redemption, and fund transfer. We explore a
range of use case scenarios and the potential economic benefits that could be gained. This approach
ensures that the proposed business model is not only financially sustainable but also adds value to all
stakeholders, including banks, financial institutions, and the public.
Overall, this proof of concept plays a crucial role in laying a strong foundation for the Indonesia
Payment System Blueprint 2030 initiative, which aims to further integrate digital payment systems into
the national economy, facilitate financial inclusion, and promote sustainable economic growth. The
proof of concept report is one of the milestones in the early development of the Rupiah Digital, part of
the Indonesia Payment System Blueprint 2030’s efforts to provide a secure, efficient, and responsive
payment solution that meets the needs and expectations of all stakeholders in the digital era.
The involvement and contributions of various stakeholders are key elements
in enriching insights to design a Rupiah Digital that best fits the needs of
Indonesia’s industry and society. Therefore, Bank Indonesia is committed
to continuously engaging the public in every iteration of the Rupiah
Digital’s development.
"Innovation thrives when people come together and collaborate."
— Chris Anderson
Wassalamu’alaikum warahmatullahi wabarakatuh

Jakarta, December 2024
Filianingsih Hendarta
Deputi Gubernur Bank Indonesia

vii

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 10

EXECUTIVE
SUMMARY

Central bank digital currency
(CBDC) is one of the potential uses
of distributed ledger technology (DLT)
by central banks, which combines the
capabilities of distributed ledger technology
with the central bank’s mandate to issue fiat
currency. Bank Indonesia is striving to explore the
Rupiah Digital as a form of Indonesia’s CBDC through
the Project Garuda.
The White Paper “Project Garuda: Navigating the
Rupiah Digital Architecture” divides the exploration
of the Rupiah Digital into 3 (three) stages: Immediate
State, Intermediate State, and End State. This proof
of concept (PoC) report is part of the Immediate
State, focusing on the exploration of the wholesale
Rupiah Digital (wRD) Cash Ledger.3 (three) business
processes were tested: issuance, redemption, and
fund transfer.
This proof of concept report is a continuation of the
Project Garuda’s activities. The design and business
model tested in the proof of concept were established
through previous phases of the Project Garuda,
including public consultations via the “Consultative
Paper of the Project Garuda Wholesale Rupiah Digital
Cash Ledger” and the outcomes of these consultations
in the “Public Consultation Report.”
The design and business model, resulting from public
consultations, will be developed and tested using
2 (two) distributed ledger technology platforms,
namely Corda and Hyperledger Besu. To ensure
the sustainability of the solution, the development
was conducted by the principal developers of each
technology: Corda, developed by R3, and
Hyperledger Besu, developed by Kaleido.
In addition to detailing the 3 (three) business
processes, technical evaluations were conducted on
both platforms, focusing on resilience, privacy,
and performance aspects of each distributed
ledger technology. These evaluations were
carried out through 55 test scenarios aimed at
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

answering 3 (three) key
questions (KQ):




1 How can distributed

ledger technology be
leveraged to implement the
wRD business model?

2 What are the potential benefits and added
value of integrating smart contracts into
wRD?

3 How can wRD connect to conventional systems,
Bank Indonesia’s internal systems, cross-border
transactions, and other distributed ledger
technologies, in alignment with the principles of
integration, interoperability, and interconnection
(3i)?

Both platforms successfully developed all scenarios
according to the characteristics of their respective
technologies. Corda uses a consensus mechanism
where a central party validates transactions (“notary”)
and transaction data is stored in a connected
manner from one transaction to another (“directed
acyclic graph”). Hyperledger Besu uses a consensus
mechanism where transaction validation is carried
out by several predetermined validators (“proofof-authority”), and transaction data is stored in
interconnected transaction blocks (“blockchain”).
Both platforms were able to meet all testing scenarios
and address all key questions. First, distributed ledger
technology can effectively support the implementation
of a wholesale Rupiah Digital cash ledger. Second,
smart contracts offer added value in terms of flexibility
for the Rupiah Digital development and transaction
efficiency. Third, distributed ledger technology can
connect with conventional systems using existing
standards and with other systems using the ISO 20022
standard.
The PoC results indicate that there are potential areas
that can be further explored regarding privacy, liquidity
management, and multi-validator deployment.
1

## Page 11

CHAPTER 1
OVERVIEW
The proof of concept (PoC) Report for wRD is a follow-up to the Project Garuda, aiming to
identify the most suitable technology solutions according to the needs and characteristics
of Indonesia’s payment ecosystem. The exploration of these needs and characteristics was
previously conducted through the publication of a White Paper,
a Consultative Paper, and a Public Consultation Report.
1.1. BACKGROUND
Technological advances are driving innovation
in the payment ecosystem through distributed
ledger technology (DLT) 1 . Central banks
worldwide recognize the potential of DLT and are
actively exploring its applications. One significant
potential use of DLT by central banks is the creation
of central bank digital currency (CBDC), which
leverages DLT to fulfill the central banks mandate to
issue fiat currency.
While central banks share similar views on the
potential of CBDC, their specific objectives vary.
Some central banks regard CBDC as a means to
maintain relevance amid the steady decline in cash
usage or as a strategy to enhance financial inclusion.
CBDC could bolster Indonesia’s existing
payment ecosystem.

The Rupiah Digital’s potential to strengthen
Indonesia’s payment ecosystem depends on
achieving 3 (three) goals, as illustrated in
Figure 1:
1.

Becoming a legal digital payment instrument in
the Republic of Indonesia;

2.

Supporting Bank Indonesia’s objectives in
monetary policy, Financial System Stability
(SSK), and Payment System (SP) sectors in the
digital era; and

3.

Increasing the inclusion, innovation, and
efficiency of the financial system.

Bank Indonesia is exploring the Rupiah Digital to
achieve these goals through the Project Garuda
initiative.
The Project Garuda is an initiative by Bank
Indonesia to explore a digital version of the
Rupiah, complementing existing paper and

Figure 1. Three Goals of the Rupiah Digital

1. Distributed ledger technology is a database distributed across multiple locations or institutions and is typically public. One well-known form of DLT implementation
is ‘Blockchain’.
2

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 12

Figure 2. Project Garuda Stages

coin forms used so far. This exploration aims to
preserve the Rupiah’s sovereignty in the digital era,
in accordance with Act No. 4 of 2023 concerning
Financial Sector Development and Strengthening
(P2SK), specifically section six titled ‘Rupiah Digital’.
Similar to how banknotes in different countries
feature distinct designs and security elements,
the Rupiah Digital’s design must be tailored to
the Indonesian payment ecosystem’s needs and
characteristics. At the end of 2023, Bank Indonesia
began exploring the design, impact, and benefits of
the Rupiah Digital for Indonesia. The findings from
these explorations were subsequently published in 3
(three) documents: the White Paper, the Consultative
Paper, and the Public Consultation Report.
The White Paper published in November 2023
outlines the exploration of the Rupiah Digital in
3 (three) stages, as depicted in Figure 2. The first
stage is the Immediate State that involves exploring
a cash ledger wholesale Rupiah Digital. The second
stage is the Intermediate State, which expands the
wholesale Rupiah Digital use case to include Digital
Assets. The third stage is the End State, which
examines interconnection with other DLTs, including
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

cross-border transactions. Each stage prioritizes the
sustainability of the money supply process, aligning
with Bank Indonesia’s policies.
At each stage of the Rupiah Digital project,
3 (three) series of activities were conducted,
as illustrated in Figure 3. The first activity is the
publication of the Consultative Paper (CP), which
serves as a form of communication and public
consultation to gather input on the business model
at each stage. The second activity involves issuing
a Public Consultation Report, summarizing the
public input that will be tested. The third activity
is the implementation of a proof of concept (PoC)
to evaluate the feasibility of technology solutions
based on the business model outlined in the Public
Consultation Report. These activities ensured that
the Rupiah Digital was developed with an optimal
design.
This proof of concept (PoC) report continues
the Rupiah Digital’s exploration of technological
solutions for the Rupiah Digital wholesale cash
ledger (wRD) business model. The high-level
design of wRD is outlined in the Project Garuda
White Paper, the Consultative Paper published
3

## Page 13

Figure 3. Project Garuda Activities

in January 2023, which included public input on
the design of the cash ledger, and the Public
Consultation Report published in October 2023.
These documents also define the business model,
including the design of the money supply process
and the arrangement of wRD membership.
The wRD money supply process tested in the
PoC encompasses issuance, fund transfer,
and redemption. In the Immediate State, these
processes did not create new monetary value (no
money creation), as they utilized the conversion
of funds in reserve accounts for the issuance and
redemption of the Rupiah Digital. Membership
arrangements defined the roles of wRD participants,
enabling the establishment of a distributed wRD
ecosystem by delegating transaction validation
authority to these participants.
The Immediate State of the Rupiah Digital PoC
report is presented with the following structure:
1.

Overview, this section includes the
background, objectives, and business model of
wRD;

2. PoC Methodology, this section explains the
implementation of the PoC, including the
stages, scenarios, scopes, and assumptions
used during the PoC;
3. PoC Development, this section describes the
development of the wRD platform;
4. PoC Testing and Results, this section
addresses the objectives of the PoC based on
the test results;
5. Findings and Next Step, this section explains
the findings from the PoC results and outlines
future exploration plans.

1.2. OBJECTIVE
The primary objective of the PoC is to identify
the most suitable solution for the wRD platform.
Based on the evaluation results (see Apendix A), 2
(two) potential DLT platforms have been identified
for further exploration: Corda2 and Hyperledger
Besu3 . The development of both platforms during
the PoC was supported by the respective principals,
R3 for Corda and Kaleido for Hyperledger Besu.
Support from these principals will ensure the
sustainability of the solutions developed during the
PoC. The solution in the PoC was developed by
the principal specifically to meet the needs of Bank
Indonesia.
To address the primary objectives of the PoC, 3
(three) key questions have been developed:

1
2
3

How can DLT be leveraged to implement
the wRD business model?

What are the potential benefits and added
value of implementing smart contracts on
wRD?
How can wRD connect to conventional
systems, Bank Indonesia’s internal
systems, cross-border systems, and
other DLTs, based on the principles
of integration, interoperability4 , and
interconnection (3i)?

2. 		A blockchain platform that shares transaction data only with the parties involved in the transaction. It is available in an open-source version and an enterprise
		version called Corda Enterprise.
3. 		An open-source blockchain protocol and platform established by Linux Foundation. Hyperledger Besu is a Java-based Ethereum client. Hyperledger Besu adheres
		to the specifications of the Enterprise Ethereum Alliance (EEA).
4. 		The ability of 2 (two) or more systems to exchange information or conduct transactions without middleware.
4

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 14

Figure 4. wRD Membership Registration

1.3. BUSINESS MODEL
wRD’s primary business model encompasses
its money supply process and membership
arrangements. The money supply process in
the Immediate State is conducted through the
conversion of current accounts (no-money creation).
Concurrently, the wRD membership structure is
designed to delegate transaction validation authority
to participants (node5).

���� ���������
��������
- ����������

��������
–
�
����������

Figure 4 outlines the membership arrangements
for wRD participants. Transaction validation
authority will be delegated to appointed participants
(wholesalers), who can act as validating nodes 6
alongside Bank Indonesia. Meanwhile,
non-wholesaler participants can become
non-validating nodes7 or no-nodes8 .
The White Paper illustrates the wRD money
supply process in Figure 5, detailing the cycle
and interconnectedness of the Rupiah Digital.
This cycle begins with issuance and concludes
with redemption through the conversion of current
accounts in BI-RTGS.
The Rupiah Digital Treasury, or Khazanah Digital
Rupiah (KDR), owned by the central bank, will

��������
–
�
����������

facilitate this conversion. Unlike a traditional
treasury that stores money, KDR acts as a facilitator
and does not hold the Rupiah Digital. Instead, KDR
will maintain a zero balance and solely distribute
money to participants. Participants possessing the
Rupiah Digital can transact with other participants
on the web platform.

Figure 5. Money Supply Process at wRD

5. 		A node is a representation of a participant or party in a DLT network.
6. 		Validating node: a participant authorized to manage/store wRD tokens and validate transactions (Public Consultation Report, Project Garuda, 2024).
7. 			Non-validating node: a participant authorized to manage/store wRD tokens (Public Consultation Report, Project Garuda, 2024).
8. 		No-node: a participant authorized to manage/store wRD tokens but does not have a node and only needs to provide a network connection to access
		multitenancy services (Public Consultation Report, Project Garuda, 2024).
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

5

## Page 15

CHAPTER 2
poc METHODOLOGY
The PoC methodology outlines a systematic approach to achieving the objectives of the
PoC. It encompasses the stages, test scenarios, and scope necessary to ensure
comprehensive execution of every aspect of the PoC.

The wRD PoC is structured into 3 (three)
stages to clearly define the scope, focus on
the objectives of each stage, and mitigate the
risks associated with PoC implementation. The
implementation of the wRD PoC involves the Project
Garuda Workstream (WS) 9 . The details of the 3
(three) stages are as follows:

1
2
3

Pre PoC
This stage explores and transforms 3
(three) key questions in this PoC into test
scenarios. These activities are conducted
through workshops and requirements
gathering sessions with stakeholders.
During this stage, Bank Indonesia
shortlisted 2 (two) technology platforms
based on its needs and considerations.
Main PoC
This stage focuses on building and
executing test scenarios on both
technology platforms. Both platforms are
developed and tested in parallel using agile
and iterative approaches.
Post PoC
This stage involves a detailed analysis of the
test results from the Main PoC stage, which
are then documented in a comprehensive
report.

2.2. POC SCENARIO
The 3 (three) critical questions of the PoC will
be addressed through 55 test scenarios (see
Appendix H). Building and executing these test
scenarios provides a solid foundation for answering
key questions and gaining insights for the future
development of the Rupiah Digital. The test
scenarios are divided into 2 (two) aspects:
1. 		 Business aspect (functional): focusing on “what”
the system/platform should do;
2. Technical aspect (non-functional): focusing on
“how” the system/platform should perform its
functions.

,,

2.1. POC STAGES

wRD PoC involves Project Garuda Workstream,
divided into 3 (three) stages: Pre PoC, Main PoC, and
Post PoC.

,,

2.3. SCOPE AND ASSUMPTIONS
To optimize time and resources, the scope of
developing and executing test scenarios has
been determined. In this PoC, the model and
configuration utilized are illustrated in Figure 6.
The wRD platform is designed as a permissioned
network, with Bank Indonesia regulating the access
and roles of participants.
The wRD platform encompasses various roles
and permissions, including:
1. Master Node (Bank Indonesia)
a.

KDR Node: responsible for the creation,
issuance, redemption, and destruction of the
Rupiah Digital.

b.

Regulator Node: determines the rules and
policies for managing the Rupiah Digital and
oversees smart contract management (see
Subchapter 3.3.2).

c.

Observer Node: collects and supervises all
transaction activity data on wRD without active
participation in the transactions.

d.

Administrator Node: manages participant
access on the wRD platform.

e.

Provider Node: supplies multitenant
infrastructure for participants who lack
infrastructure within the wRD network.

2. Node Participants (Members)
a.

Validating Node (Full Node): engages
in transaction activities of the wRD and
possesses the right to validate transactions.

b.

Non-Validating Node (Light Node): engages in
transaction activities of the wRD but lacks the
right to validate transactions.

c.

No-Node (Multitenancy): participates in
transaction activities of the wRD but does not
have infrastructure within the wRD network.

9. Project Garuda is continuously managed by 3 (three) Workstreams (WS), each with a specific focus: WS1 (business), WS2 (technology), WS3 (regulation).
6

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 16

Figure 6. wRD PoC Configuration

Bank Indonesia

Bank Indonesia
KDR Node
Validating the creation
and destruction of Rupiah
Digital
Administrator Node
Configuring the wRD
membership
Observer Node
Monitoring of wRD
transaction
Regulator Node
The configuration of wRD
using Policies (Capping
and Smart Contract)

KDR
Node

Administrator
Node

Smart
Contract

Observer
Node

Regulator
Node

Multi-Assets
Cash
Ledger

Securities
Ledger

WSr A Validating
Node WSr A

Provider Node
Multi-tenancy services
for participants

WSr D

Non-Validating Node
WSr B
Executing transaction

WSr E

No-Node
WSr D dan WSr E
Executing transaction
without providing node

Non-Validating
Node WSr B

1.

Use Case Layer: Describes the use cases of
applications built on top of the DLT platform;

2.

Digital Asset Layer: Describes digital assets
developed on top of the DLT platform;

3.

Execution Layer: Describes how the DLT
platform serves as an environment for
executing computer programs;

4.

Data Layer: Describes how data is stored and
managed;

5.

Consensus Layer: Describes how nodes
communicate to reach agreement on adding
transaction blocks to the ledger;

6.

Network Layer: Describes how nodes connect,
the protocols used, and the connectivity
between nodes and their respective ledgers;

7.

Security Aspect: Explains how security
is implemented in the DLT platform,
encompassing an aspect that is integral to all
6 (six) layers mentioned above.

Membership

,,

Given the complexity of the DLT system, the
concept of the layered architecture, as depicted
in Figure 7, has been adopted to facilitate
understanding, development, and maintenance.
In DLT, there are 6 (six) layers of abstraction and
1 (one) supporting aspect:

© Bank Indonesia 2024. All rights reserved.

Provider
Node

Validating Node
WSr A dan WSr C
Executing and validating
transaction

Validating WSr C
Node WSr C

WSr B

Project Garuda: Proof of Concept Report | DECEMBER 2024

Participant

Bank Indonesia together with participant
(wholesaler) of wRD platform will have different roles
to support operational resilience of wRD platform.

,,

Figure 7. wRD PoC Architecture

7

## Page 17

CHAPTER 3
POC DEVELOPMENT
As outlined in the methodology section, the wRD technology architecture layer, which
consists of 6 (six) layers of abstraction and 1 (one) supporting aspect (security), was
developed in the implementation of PoC using 2 (two) DLT platforms, namely R3 Corda
dan Kaleido Hyperledger Besu version 24.3.0. Both DLT platforms have characteristics that
meet the objectives of the Rupiah Digital. R3 developed Corda using the Corda Enterprise
DLT platform version 4.10, while Kaleido developed Hyperledger Besu using a DLT platform
based on Hyperledger Besu.
3.1 USE CASE LAYER
The use case layer is the uppermost layer of the
wRD platform, where users interact directly with
the platform. The business process in wRD is built
on the use case layer, which includes the money
supply process, system policy, and supervision.
Implementing the wRD business processes
involves smart contracts that allow various
business processes in the network to be carried out
automatically, minimizing human intervention.

3.1.1 MONEY SUPPLY PROCESS
The Rupiah Digital is designed with the
principle of no harm to monetary stability and
financial system stability. The money supply
process consists of issuance, redemption, and
transfer. As explained in Figure 8, issuance is carried
out through the conversion of current accounts in
BI-RTGS into the Rupiah Digital while the process
of redemption is carried out through the conversion

of the Rupiah Digital into BI-RTGS current
accounts. Through this conversion process, there
is no addition/decrease in the amount of money
in circulation so that in the PoC phase Immediate
State there is no creation of new money value.

3.1.1.1 ISSUANCE
Issuance process can be initiated through the
wRD platform (Platform Triggered) or BI-RTGS
(RTGS Triggered). Both trigger types involve
the omnibus account10 on the BI-RTGS system
to complete the settlement on the BI-RTGS side
and the KDR node on the wRD platform to make
settlements on the wRD side. Figure 9 illustrates
the process of issuance carried out by Bank 1 using
both types of triggers.
On the BI-RTGS settlement, refer to
Figure 9 (a) RTGS triggered issuance; the
process begins with debiting the current
account and crediting the omnibus account.

Figure 8. Issuance and Redemption wRD Platform Integrated with BI-RTGS

10. 		The account in BI-RTGS that holds all the participants’ funds converted into Rupiah Digital, therefore the giro balance in the omnibus account will be equal to the total Rupiah Digital in
		circulation. In the omnibus account, all participants’ funds are pooled together.
8

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 18

Figure 9. (a) RTGS Triggered Issuance Process (b) Platform Triggered Issuance Process

Then, BI-RTGS sent MT202 along with MT910 to
indicate that the settlement on the BI-RTGS side
had been completed. Meanwhile, referring to Figure
9 (b) Platform triggered issuance, Bank 1 initiated
the issuance of the Rupiah Digital through the wRD
platform, which was carried out both when the
bank wanted to increase the stock of the Rupiah
Digital and when it occurred auto-issuance11. Next, a
message is exchanged between the KDR node and
BI-RTGS using the MT202 standard format.

,,

Issuance process can be initiated through the wRD
platform (Platform Triggered) or BI-RTGS (RTGS
Triggered). Both trigger types involve the omnibus
account on the BI-RTGS system to complete the
settlement on the BI-RTGS side and the KDR node
on the wRD platform.

,,

Settlement on the wRD side is also known
as the process of creating the Rupiah Digital
with the implementation according to each
technology (see Appendix B.2). On R3 Corda, the
creation process will create a new Rupiah Digital
token owned by participants. In contrast, in Kaleido
Hyperledger Besu, the creation process will add
a balance of the Rupiah Digital to the accounts of
participating banks through new token minting. R3
Corda and Kaleido Hyperledger Besu validate the
creation of transactions through the consensus layer
(see Subchapter 3.5).

3.1.1.2 REDEMPTION
Redemption is done through the wRD platform
(platform triggered) 12 and initiated by the
participating banks to Bank Indonesia. The
redemption process engages the omnibus account
BI-RTGS system to complete settlements on the BIRTGS side and the KDR node on the wRD platform
to make settlements on the wRD side. Figure 10
shows an example of the redemption process by
Bank 1.

11. 		Auto-issuance occurs when the balance at a participant’s bank falls below a threshold set by each bank.
12. 		Initiation of the redemption process from BI-RTGS was technically tested but could not be executed commercially due to regulations on the BI-RTGS side (see Appendix B.4).
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

9

## Page 19

Figure 10. Redemption Flow Platform Triggered

The bank can initiate redemption when it needs
to reduce the Rupiah Digital stock and during
the auto-redemption13 process. Both begin with
sending a request to the KDR node, as shown in
the Figure 10 (number 1). Furthermore, in process
number 2, messages are exchanged between the
KDR node and BI-RTGS using the standard MT
format.
When BI-RTGS receives MT202, the settlement
(number 3) occurs on the BI-RTGS side, then
when the process is completed (number 4), MT900
(success) or MT296 (failed) is sent to the KDR
node. Furthermore, the KDR node initiates the
settlement on the wRD side, also called destruction
process, with the implementation according to each
technology (see Appendix B.2).
On the destruction process in the R3 Corda
platform, the KDR node makes a transaction
that destroys the Rupiah Digital token. In
contrast, in Kaleido Hyperledger Besu, the KDR
node redeems the Rupiah Digital, thus reducing
the account balance by sending it to the burn
address14 . The validation process of the transaction
involves the consensus layer, which is explained
in more detail in Subchapter 3.5. If the KDR node
receives a failed message in MT296 format, then
the KDR node does not follow up on the redemption
request belonging to the participating bank.

2.

A queue mechanism, especially for high
priority transactions.

The transaction processing feature in the wRD
platform will be completed in real-time and gross if
the sender has sufficient funds/liquidity and queued
if liquidity is insufficient.
Transaction processing features and queue
mechanisms will be facilitated through smart
contracts, as shown in Figure 11. An additional
component outside the smart contract for the
queue mechanism was developed for each
participant’s application. In contrast to issuance and
redemption, which require KDR node for current
account conversion validation, fund transfers can
be validated by any validating node. Distribution of
validation allows fund transfer to no longer depend
on a central authority, which is made possible by
using consensus (see Subchapter 3.5).
A decentralized queue mechanism in which
participants are responsible for managing their
respective queues is expected to distribute the
queue processing load on each node, making the
decentralized queue process more resilient than the
conventional system.
Figure 11. Fund Transfer Process with Queue Mechanism

3.1.1.3 FUND TRANSFER
The fund transfer process on the wRD platform
replicates the practices that apply to the current
wholesale payment system. Some of the features
of the wholesale payment system include:
1.

Transaction processing occurring in real-time
and gross;

13. Auto-redemption occurs when the balance at a participant’s bank exceeds a threshold set by each bank.
14. Specific address used by Kaleido Hyperledger Besu to burn tokens is 0x000000000000000000000000000000000000.
10

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 20

The optimal queue solution for the R3 Corda
platform is a First In First Out (FIFO) queue.
In FIFO, transactions earlier in the queue are
processed first when the participant’s balance has
fulfilled the transaction.
Meanwhile, the optimal queue solution for
the Kaleido Hyperledger Besu platform is a
First Available First Out (FAFO) queue, where
transactions with sufficient balance are processed
first.
Besides decentralized queue, there are model
options for queue centrality, which can be
further explored (see Appendix G). A centralized
queue will manage the queue from all participants
by an entity, making it easier to resolve gridlock
problems, which causes a transaction not to be
completed between participants.

4. Transfer limit between participants, sets the
maximum value of the Rupiah Digital that can
be transferred between participants;
5. Maximum participant balance, sets the
maximum balance that a participant can hold
at any given time;
6. Minimum participant balance, sets the
minimum balance that a participant must hold
at all times.
The participant limit aims to manage the
liquidity of each participant according to their
needs. If the limit set by the participant is exceeded,
an automated conversion process (auto-issuance
and auto-redemption) will be triggered. 2 (two)
limits have been developed for participants:
1.

3.1.2 SYSTEM POLICY

3.1.2.1 LIMIT FEATURE
The limit on wRD is divided into 2 (two)
categories based on the regulating party. The
first category is the limit set by Bank Indonesia,
which applies to all wRD participants. The second
category is the limit that each participant can set for
themselves.
The limit feature is parameterized to allow
adjustments as needed. However, Bank Indonesia
has not yet committed to implementing this feature;
its development is currently intended for testing
purposes only.
Bank Indonesia’s limit aims to regulate the
amount of the Rupiah Digital in circulation and
prevent the concentration of the Rupiah Digital
ownership among a few participants. Bank
Indonesia sets these limits through regulator node.
6 (six) limits have been developed:
1.

Total circulation limit, regulates the total
amount of the Rupiah Digital that can be
circulated at any given time;

2. Limit per issuance per participant, sets the
maximum conversion value from a current
account to the Rupiah Digital that a participant
can perform;
3. Limit per redemption per participant, sets
the maximum conversion value of the Rupiah
Digital to a current account that a participant
can perform;
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

2. Minimum balance, regulates the minimum
balance each participant must hold, which
cannot be lower than the minimum participant
balance set by Bank Indonesia. If this limit is
exceeded, the auto-issuance process will be
initiated automatically.

,,

The wRD platform must implement transaction and
activity management features to support central
bank policies. The limit feature regulates the Rupiah
Digital transactions, while the administration feature
oversees participant activities.

Maximum balance, regulates the maximum
balance each participant can hold, which
cannot exceed the maximum participant
balance set by Bank Indonesia.
The auto-redemption process will be initiated
automatically if this limit is exceeded.

The limit feature is parameterized to allow
adjustments as needed...

,,

To avoid a continuous conversion process, the PoC
also includes a buffer value feature, which acts as an
additional value during the automated conversion
process.
In its implementation, R3 Corda and Kaleido
Hyperledger Besu have incorporated the limits
set by Bank Indonesia into smart contracts/
CorDapps. This approach ensures that the
limits set by Bank Indonesia are distributed and
checked by each participant. Meanwhile, the
limits set by participants are implemented within
each participant’s application using R3 Corda and
Kaleido Hyperledger Besu.

3.1.2.2 ADMINISTRATIVE FEATURES
The permissioned DLT network wRD platform
requires an administrative feature to manage
participant memberships. As a result, 4 (four)
administrative features were developed for this
purpose:
1.

On-boarding, allows Bank Indonesia to add
new participants to the wRD platform;
11

## Page 21

2. Freeze, Bank Indonesia to stop funds from
entering and exiting participant nodes;
3. Unfreeze, allows Bank Indonesia to revoke the
frozen status of participants;
4. Off-boarding, allows Bank Indonesia to
remove participants from the wRD platform.
Bank Indonesia can manage these 4 (four)
administrative features on the wRD platform
using the administrator node. This ensures that
Bank Indonesia has the final authority over who can
participate in the wRD.

specific features for supervision. This specific
node is the observer node, which receives a copy
of the transaction between participants, as shown
in Figure 12. The observer node can only be owned
and operated by Bank Indonesia.
In R3 Corda, supervision is implemented by utilizing
the broadcast feature to the observer node to
send transaction data upon settlement finality.
Meanwhile, Kaleido Hyperledger Besu implements
observer nodes by utilizing the emit event feature on
smart contracts.
Figure 12. Observer Node Solution

R3 Corda utilized Business Network
Membership (BNM) tools to implement
membership feature. Kaleido Hyperledger Besu
managed membership features via HierarchicalDeterministic (HD) Wallets. The membership data
for both wRD platforms is accessible through smart
contracts.

3.1.3 SUPERVISION

,,

...it is necessary to balance the need-to-know basis
principle in wholesale transactions with the interest
in supervision.

,,

R3 Corda and Kaleido Hyperledger Besu have
distinct characteristics when implementing
transaction recording. R3 Corda uses the concept
of shared facts, where no singular ledger contains
all transaction data. Transaction data on R3 Corda
is shared with and stored only by the involved
participants. In contrast, on Kaleido Hyperledger
Besu, participants have identical data on the ledger,
but this data is stored in encrypted form. Only
the parties involved can decrypt and access the
transaction data. Therefore, a monitoring solution
that can be implemented on both platforms while
maintaining the confidentiality of participant
transactions is necessary.
Monitoring solutions to maintain transaction
confidentiality involve adding a node with

3.2. DIGITAL ASSET LAYER
The digital asset layer represents the digital
assets transacting on the wRD platform. In the
wRD technology architecture, Bank Indonesia can
manage 2 (two) types of digital assets: the Rupiah
Digital and the digital securities. The existence
of various digital assets on a single platform is
known as a unified ledger. The use of a unified
ledger optimizes automation and customization of
asset (programmability), integration of one asset
with another (composability), and simultaneous
settlement of multiple assets (atomic settlement).
The Immediate State phase PoC focuses on
developing the Rupiah Digital (cash ledger)
assets across all test scenarios. Digital securities
assets are developed in a limited manner within
the Delivery Versus Payment (DVP)16 scenario.
Further exploration of digital securities assets will be
conducted at a later stage.

,,

For more effective and efficient policy making
and to protect participants and customers, Bank
Indonesia, as the regulator of the wRD platform,
must be able to supervise transactions in
real-time. The distribution of transaction data on
the DLT platform does not inherently hinder Bank
Indonesia’s supervisory process. However, it is
necessary to balance the need-to-know basis15
principle in wholesale transactions with the interest
in supervision.

In the wRD technology architecture, Bank
Indonesia can manage 2 (two) types of digital
assets: Rupiah Digital and digital securities.

,,

3.3. EXECUTION LAYER
The execution layer comprises components
that facilitate the execution of transactions and
computing processes on the wRD platform.

15. 		Need-to-know basis is a principle where only participants involved in a transaction can access the transaction data.
16. 		A securities settlement mechanism that links transfer of securities and transfer of funds in such a way that the delivery of securities occurs only if the
		corresponding payment has been made.
12

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 22

1.

Container, as the development environment for
the wRD platform;

2.

Smart Contract, as a form of business
functionality implementation on the wRD
platform;

3.

Application Programming Interface (API), as
a communication protocol to execute smart
contract functions;

4.

Web Application (Web App), as an interface to
access the wRD platform;

5.

Messaging, as a communication method
between nodes on the wRD platform;

6.

Integration, Interoperability, and
Interconnection (3i), as the communication
standard between wRD and BI-RTGS.

3.3.1. CONTAINER
The use of containers17 allows the wRD platform
to run consistently across various operating
systems. Containers minimize compatibility issues
that can affect performance test results. Additionally,
containers simplify the scalability of the wRD
platform by enabling the creation and management
of multiple application instances for performance
testing under varying loads. Containers also
promote modular application development by
packaging all application dependencies within
the containers, thereby reducing development
complexity. Both platforms utilize Kubernetes18 as a
container orchestration tool.
R3 Corda and Kaleido Hyperledger Besu use a
Kubernetes cloud service on AWS called AWS
Elastic Kubernetes Service (EKS). The platforms,
however, have different Kubernetes cluster
configurations (see Appendix C).

3.3.2. SMART CONTRACT
Smart contracts are computer programs that
run on blockchain technology and contain the
rules and functions of business processes. The
use of smart contracts supports the money supply
process, system policy, and supervision of the
Rupiah Digital.
Each platforms has a different implementation of
smart contracts.Smart contract in the R3 Corda,
resides within a CorDapp file written in the Java
programming language, which operates on the
Java Virtual Machine (JVM)19 . Meanwhile, in Kaleido

Hyperledger Besu, smart contracts are created
using the Solidity programming language, which
runs on the Ethereum Virtual Machine (EVM) 20 (see
Appendix C).

3.3.3. APPLICATION PROGRAMMING
INTERFACE (API)
Application Programming Interface (API) 21 on
R3 Corda solutions utilize the
HTTP-REST protocol and are built using
Java Spring Boot. The API on R3 Corda serves
as an intermediary to execute functions on smart
contracts operating within the blockchain, offchain22 transactions, and facilitate communication
between the back-end and front-end.
Similarly, Kaleido Hyperledger Besu solutions
employ the HTTP-REST protocol, built using
the Golang programming language. In Kaleido
Hyperledger Besu, the HTTP-REST interface can be
generated automatically based on the predefined
smart contract functions, simplifying the integration
with other platforms.

3.3.4. WEB APPLICATION (WEB APP)
A web application (web app) serves as the user
interface for executing business processes. In
R3 Corda-based solutions, web apps are developed
using HTML and JavaScript, with the Angular.js
framework, and are stored in cloud storage AWS S3
Bucket. An example of a web app developed with R3
Corda is shown in Figure 13.
In Kaleido Hyperledger Besu-based solution
as shown in Figure 14, web apps are developed
using HTML and JavaScript. These web apps are
then packaged into a container, designed to run
after deployment on a Kubernetes cluster.

3.3.5. MESSAGING
Both DLT platforms employ messaging queues23
to facilitate asynchronous communication
between application components within the
web platform. R3 Corda utilizes Apache Artemis as
its messaging system, whereas Kaleido Hyperledger
Besu uses the Firefly Event Bus (see Appendix C).

17. A container is a virtualization method used to run and distribute applications consistently across various computing environments (portability), which is required by both DLT platforms to be
developed.
18. Kubernetes is a container orchestration tool used to automatically scale applications up and down based on demand.
19. JVM (Java Virtual Machine) is responsible for executing Java bytecode programs.
20. EVM (Ethereum Virtual Machine) is a program responsible for executing smart contracts on the Ethereum blockchain network.
21. API (Application Programming Interface) is a protocol that allows one software application to interact and communicate with other software applications.
22. Off-chain transactions are processes that occur within the wRD platform without involving DLT database, such as limit policies, user management, file transfers, etc.
23. Messaging queue is a mechanism for communication through messages using a queue. It works by placing a message generated by a producer into the queue, and then the message is
retrieved from the queue to be processed by a consumer.
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

13

## Page 23

Figure 13. Web App View on R3 Corda Solution

Figure 14. Web App View on Kaleido Hyperledger Besu Solution

3.3.6. INTEGRATION,
INTEROPERABILITY, and
INTER CONNECTION (3i)

platform, data is stored in a relational database. The
data structure outlines the DLT structure, which
meets the requirements of the use case layer
(see Subchapter 3.1).

In the PoC, BI-RTGS is integrated with the
wRD platform for issuance and redemption. In
R3 Corda, this integration is achieved through file
exchange using AWS S3 Bucket, a cloud file storage
service. Conversely, Kaleido Hyperledger Besu
utilizes a web based interface to transmit BI-RTGS
messages (see Appendix C).

3.4.1. STORAGE IN THE DATABASE

3.4. DATA LAYER
The data layer encompasses both data storage
methods and data structures. On the wRD

In the wRD PoC, both R3 Corda and Kaleido
Hyperledger Besu utilize the Relational
Database Management System (RDBMS) 24 for
data storage. Participants with nodes (wholesalers
and non-wholesalers) are responsible for managing
their respective databases. For participants
categorized as no-node, the database management
is handled by the provider node.
Data storage in R3 Corda is categorized into

24. RDBMS technology used is PostgreSQL, provided through AWS Relational Database Service (RDS) (see Appendix D).
25. On-chain refers to the environment within the wRD platform that specifically uses DLT.
14

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 24

Data storage, both off-chain and on-chain, on
Kaleido Hyperledger Besu utilizes Kaleido’s
Digital Asset Platform26 . This platform provides
a range of off-chain services, such as the Smart
Contract Manager, Private Data Manager, and Key
Manager, as well as on-chain services, including the
Hyperledger Besu node, block indexer, and IPFS
node. Each service within the Digital Asset Platform
stores data and manages its own database. While
the database schema is consistent across all nodes,
the number of schemas varies depending on the
services required by each node.
Figure 15. Design of Data Layer on R3 Corda

The DLT structures also shapes how the defined
policy are stored (see Subchapter 3.1.2). In R3
Corda, the configuration policy wRD is stored as a
state within CorDapp, while in Kaleido Hyperledger
Besu, policy wRD is stored as an attribute in a
smart contract.

,,

2 (two) types: on-chain25 data storage, known
as the Corda Vault, and off-chain data storage
(Figure 15). The on-chain database comprises
tables that represent the decentralized ledger. This
data is immutable and distributed across nodes
based on the need-to-know principle, ensuring
a consistent schema throughout the network.
Conversely, the off-chain database consists of
tables related to access management for the wRD
web application. This data is mutable, allowing for
changes, and can have different schemas across
nodes. For example, tables storing interconnection
data with BI-RTGS are only available on the KDR
node.

3.5. CONSENSUS LAYER
The consensus layer incorporates a method to
achieve agreement among nodes when a block
of transactions is added to the ledger. This
consensus scheme on DLT is designed to enhance
operational resilience by distributing transaction
validation process, one of which is transfer.
R3 Corda employs a unique consensus
mechanism that involves a notary27 (see
Appendix E). In the PoC, the designated notary
is a non-validating notary28 implemented by Bank
Indonesia.
Kaleido Hyperledger Besu employs proof-ofauthority (PoA) 29 consensus mechanism. In the
PoC, the selected PoA is Quorum Byzantine Fault
Tolerance (QBFT), involving Bank Indonesia and all
full nodes (see Apendix E).

,,

R3 Corda employs a unique consensus mechanism
that involves a notary... Kaleido Hyperledger
Besu employs proof of authority (PoA) consensus
mechanism.

3.4.2. STRUCTURE OF DLT
Despite the similarities in using RDBMS in R3
Corda and Kaleido Hyperledger Besu, the
2 (two) DLT platforms have significantly
different structures. The DLT structures used in
PoCs are directed acyclic graph (DAG) for R3 Corda
and Blockchain for Kaleido Hyperledger Besu (see
Appendix D).
In R3 Corda, the Rupiah Digital is stored as
a token within a state on CorDapps, with
attributes such as nominal value, issuer (Bank
Indonesia), and owner. Conversely, in Kaleido
Hyperledger Besu, the Rupiah Digital is stored via
a smart contract that contains the participant’s
account and balance.

,,

The DLT structures used in PoCs are directed
acyclic graph (DAG) for R3 Corda and Blockchain
for Kaleido Hyperledger Besu.

,,

3.6. NETWORK LAYER
The most basic layer of the DLT Layer
Framework is the network layer30 , where data
exchange communication within the network
is determined based on network access. In the
PoC, according to the design of the Whitepaper and
Consultative Paper, the chosen network access is
permissioned network.
There is a difference in network creation
between R3 Corda and Kaleido Hyperledger
Besu, as illustrated in the Figure 16 below.

26. Digital Asset Platform is a middleware service from Kaleido that provides services related to DLT platform.
27. A notary is an entity responsible for preventing double-spending (money being spent twice) by validating the input state of a transaction.
28. A notary that checks transactions to prevent double-spending (uniqueness validation) but does not verify the correctness of the transactions (transaction validation).
29. A consensus algorithm in which participants know and trust each other. A central authority designates participants who can perform transaction validation (delegates).
30. Network Layer is a set of interconnected nodes that adhere to a technology standard (protocol) and actively participate together in storing, exchanging data, and processing information within
an integrated communication channel.
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

15

## Page 25

Figure 16. The Process of Identifying New Members in the Network (a) In the Implementation of R3 Corda;
(b) In the Implementation of Kaleido Hyperledger Besu

R3 Corda relies on an additional component called
Corda Enterprise Network Manager (CENM)31,
which is responsible for identifying participants, as
well as adding them to the network map32.
Meanwhile, Kaleido Hyperledger Besu involves
creating a network by using bootnode33 and
genesis files34 for new participants, subsequently
adding those participants to the configuration of
each node. Both CENM and bootnode are under the
authority of Bank Indonesia (see Appendix F).
In R3 Corda, the node must have an identity
encapsulated in a digital certificate (which
contains public and private keys) issued by
CENM, as depicted in numbers 1 and 2 in
Figure 16 (a). The identity registered on CENM

,,

The network layer is where data exchange
communication within the network is determined
based on network access. In the PoC, the chosen
network access is permissioned network.

must be unique to ensure that participants of
the wRD platform can be identified through the
certificate.
In Kaleido Hyperledger Besu, adding a new node
to the network involves utilizing the genesis
file owned by the bootnode, as illustrated in
Figure 16 (b). The bank initiates the creation of a
new node based on the genesis file and modifies
the network configuration accordingly. Additionally,
synchronizing the network configuration across all
nodes requires establishing a communication link
with the new node.

3.7. SECURITY ASPECTS
The security aspects in the implementation of
the wRD PoC have been tested and follow the
applicable security standards at Bank Indonesia.

,,

31. R3’s commercial service, Corda Enterprise, allows for the operation of a Corda network with full control, including consensus management.
32. A network map is a component that stores information about all nodes connected to the network and functions like a directory.
33. Bootnode is node that initially creates the network.
34. Genesis file is a file that contains the network configuration.
16

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 26

CHAPTER 4
POC TESTING & RESULT
Based on 3 (three) key questions, tests have been conducted to address all scenario
topics, encompassing both business and technical aspects.

KQ# 1:
4.1. Implementation of
DLT in the Money Supply Process
of Wholesale Rupiah Digital
The implementation of wRD on the DLT platform
involves a series of processes related to money
supply. The issuance and redemption processes
adhere strictly to the principle of no-money creation
through conversion. This conversion process is
executed by transferring the participant’s current
account balance to/from wRD in real-time,
orchestrated by KDR node. Additionally, the DLT
platform supports the transfer of funds between
participants within the network through the fund
transfer process. This process is designed to
enhance liquidity efficiency, particularly through the
transaction queue function.
The wRD incorporates features designed to
support the implementation of monetary and
macroprudential policies. These policies are
enforced through system controls, such as setting
limits on circulating wRD and utilizing administrative
features to manage participant eligibility. An
observer node is employed to monitor participant
activities, as well as track the position and changes
of wRD on the DLT platform.
Money supply processes, policy settings, and
monitoring on the DLT network are regulated by
smart contracts. These smart contracts, with their
automation capabilities, are a novel aspect of the
system that streamlines transactions.
Besides the reliability of smart contracts,
the DLT finalizes wRD transactions through
a consensus mechanism that differs from
conventional systems. This mechanism distributes
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

the burden of transaction
processing and validation
across multiple participants
in the DLT network, rather than
relying solely on the central bank.
Kaleido Hyperledger Besu, using the Quorum
Byzantine Fault Tolerance (QBFT) consensus
algorithm, decentralizes validation rights to DLT
participants predetermined by the central bank.
Conversely, R3 Corda employs a unique consensus
method involving notary nodes and transaction
participants.
Through smart contracts and consensus
mechanisms, the DLT platform ensures the
confidentiality of transaction data. The Kaleido
Hyperledger Besu-based solution guarantees
confidentiality through encryption methods, while
R3 Corda applies the need-to-know principle for
every transaction.
For Kaleido Hyperledger Besu, in addition to
the encrypted privacy model, the confidential
unspent transaction output (UTXO) model
with a notary is also implemented in the PoC.
In further exploration, there is a possibility to apply
Zero Knowledge Proof (ZKP) privacy model (see
Appendix G).
Access management plays a crucial role in
supporting privacy aspects and regulating
participant authorization on the DLT platform.
By leveraging smart contracts and consensus, the
DLT platform has significantly increased the speed
of money circulation, with each platform capable of
processing more than 30 transactions per second
(see Appendix I).

17

## Page 27

Implementing smart contracts on the wRD
platform increases the efficiency of business
processes by automating transaction
execution based on predetermined rules,
leveraging programmability, composability, and
tokenization advantages. The programmability
capabilities of smart contracts provide the ability
to program the Rupiah currency with specific
functionality to determine how the currency can be
used. For example, a Rupiah Digital could be issued
and explicitly programmed for tax payments.
Programmability implies that Bank Indonesia
can add or modify smart contracts to enhance
the functionality of the wRD platform. In
R3 Corda-based solutions, smart contract
customization on the network can be achieved
through CorDapp (Corda Distributed Application).
Meanwhile, Kaleido Hyperledger Besu provides a
Contract Management service accessed through
the Asset Platform to deploy new smart contracts
into the blockchain.

18

Tokenization enables the conversion of
BI-RTGS current accounts to wRD, allowing the
implementation of smart contracts in Rupiah
currency. Additionally, tokenization helps the wRD
platform manage the Rupiah Digital assets and
digital securities.
Each DLT platform has a different tokenization
method. R3 Corda’s Token SDK supports the
issuance and management of digital tokens,
while Kaleido Hyperledger Besu uses the ERC20
standard for the Rupiah Digital token base and
ERC1400 for digital securities tokens. Use cases
for DvP transactions and digital securities are not
the primary focus of the Immediate State phase
of PoC but will require further exploration for the
Intermediate State phase.

,,

KQ# 2:
4.2. Implementation of Smart Contract
on Rupiah Digital Wholesale
Platform

Smart contract composability
capabilities allow atomic settlement in
payment systems, particularly in Delivery
Versus Payment (DvP) transactions. In DvP
transactions, the transfer of digital asset ownership
and transaction funds occur simultaneously. Atomic
settlement reduces settlement risk because the
transaction is only completed if both parties meet
the requirements.

Implementing smart contracts on the wRD platform
increases the efficiency of business processes
by automating transaction execution based on
predetermined rules, leveraging programmability,
composability, and tokenization advantages.

,,

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 28

In this PoC, interconnection focuses on the
interoperability of existing Financial Market
Infrastructures (FMIs) through connectivity to
the Bank Indonesia Real Time Gross Settlement
(BI-RTGS) system during issuance and
redemption. R3 Corda builds a mock system that
replicates the current BI-RTGS system based on
ISO 150022. The mock system is designed to read
input files from BI-RTGS and trigger the appropriate
R3 Corda API. It can also generate output files that
can be processed by the BI-RTGS system.
Meanwhile, in Kaleido Hyperledger Besu, the
interconnection simulation with BI-RTGS is
conducted through the RTGS Bridge (using API).
Data exchange in the form of files with BI-RTGS is
performed through a user interface in accordance
with ISO 150022.

3

2

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

Furthermore, the observer node enables wRD
to accommodate the needs of data centers by
capturing transactions in a granular, private,
and secure manner. This supports monetary policy
analysis, financial system stability, and payment
systems, while also helping to prevent fraudulent
transactions and support the AML/CFT process.
To future proof payment system initiatives, wRD
will adopt ISO 20022 as a messaging standard.
ISO 20022 has been recognized and adopted
globally to facilitate the harmonization of
cross-border and cross-industry transactions.

,,

KQ# 3:
4.3. Integration, Interoperability and
Interconnection of wRD with
Other Financial Market
Infrastructure

In this PoC, interconnection focuses on the
interoperability of existing Financial Market
Infrastructures (FMIs) through connectivity to the
Bank Indonesia Real Time Gross Settlement
(BI-RTGS) system during issuance and redemption.

,,

1
19

## Page 29

CHAPTER 5
FINDING AND NEXT sTEp
In the Rupiah Digital PoC, findings and considerations for future steps have been
identified. Aspects not implemented in the PoC will be explored further, taking into
account feedback from the industry, the community, and the current PoC results.

20

5.1 FINDING

5.2 NEXT STEP

Bank Indonesia and technology experts
successfully achieved the objectives and
addressed 3 (three) key questions in this PoC.
Based on the development and execution of the test
scenario, the following conclusions can be drawn:

This PoC is a milestone in achieving Project
Garuda’s goals. Project Garuda will proceed with a
broader exploration of securities ledger. This includes
feasibility analysis, development of utilization and
business processes, interoperability with other digital
assets, and the exploration of potential advantages
offered by the implementation of digital securities.

1

The implementation of the wholesale
Rupiah Digital (wRD) business model,
including the money supply process and
governance of its implementation, can be
effectively carried out on distributed ledger
technology (DLT) using smart contracts
and consensus mechanisms;

2
3

The added value of smart contracts in
DLT, compared to conventional systems,
lies in their capabilities to support
programmability, composability, and
tokenization;

Based on the PoC results, several exploration
topics can enhance the next phase of Project
Garuda, specifically in liquidity management (e.g.:
Liquidity Saving Mechanism (LSM)) and privacy
technology (e.g.: Parallelism of Zero Knowledge
Proof). This ensures that the implementation of
business models and technology will provide the
market with more efficient liquidity and information
data privacy in accordance with Bank Indonesia’s
criteria.

The implementation of wRD on DLT
facilitates connectivity with Bank
Indonesia’s internal systems, domestic
financial market infrastructure, cross-border
initiatives, and other payment system
projects through API connections and the
ISO 20022 messaging standard.

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 30

abbreviations
Integration, Interoperability, and
Interconnection
Anti-Money Laundering and
AML/CFT Combating the Financing of
Terrorism
Advanced Message Queuing
AMQP
Protocol
Application Programming
API
Interface
App
Application (Software)
AWS
Amazon Web Service
BFT
Byzantine Fault Tolerance
BI
Bank Indonesia
Bank Indonesia Real Time
BI-RTGS
Gross Settlement
3i

ISO

International Organization for
Standardization

JMS

Java Message Service

JVM

Java Virtual Machine

KDR

Khazanah Digital Rupiah

KQ
LSB
LSM
MT

Key Question
Non-Bank Institutions
Liquidity Saving Mechanism
Message Type

MTO

Make-to-Order

BNM

Business Network Membership

NATS

Neural Autonomic Transport
System

BSPI

Indonesia Payment System
Blueprint

NKRI

Republic of Indonesia

CBDC

Central Bank Digital Currency

P2SK

Financial Sector Development
and Strengthening

PoA

Proof of Authority

CorDapp

Corda Enterprise Network
Manager
Corda Distributed Application

PoC

CP

Consultative Paper

QBFT

DAG

Directed Acyclic Graph

RDBMS

DLT
DvP
EDA
EEA
EKD
EKS
ERC
EVM
FAFO
FIFO
HD

Distibuted Ledger Technology
Delivery Versus Payment
Event-driven Architecture
Enterprise Ethereum Alliance
Digital Financial Economy
Elastic Kubernetes Service
Ethereum Request for Comment
Ethereum Virtual Machine
First Available First Out
First In First Out
Hierarchial-Determinitic

RDS
REST
RTGS
S3
SDK
SP
SSK
TLS
TPS
UTXO
UU

HSM

Hardware Security Modules

wRD

HTTP
ID
IPFS

Hypertext Transfer Protocol
Identity
InterPlanetary File System

WS
WSr
ZKP

Proof of Concept
Quorum Byzantine Fault
Tolerance
Relational Database
Management System
Relational Database Service
Representational State Transfer
Real Time Gross Settlement
Simple Storage Service
Software Development Kit
Payment System
Financial Stability System
Transport Layer Security
Transaction per Second
Unspent Transaction Output
Act, Law
Wholesale Cash Ledger Rupiah
Digital
Workstream
Wholesaler
Zero Knowledge Proof

CENM

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

21

## Page 31

APPENDIX
A. DETAIL EVALUATION OF DLT
In the series of PoC activities, 2 (two) DLT platforms
were selected through a technical evaluation with
the objective of ensuring the suitability of the DLT
platform characteristics with the needs of Bank
Indonesia. The technical evaluation was conducted
through 3 (three) stages: the preparation of a long
list, a short list, and the final selection.

1. Long List
The long list is a compilation of all potential DLT
platforms that can be tested in the PoC. The
potential DLT platform candidates were sourced
from web searches, news, and correspondence with
both national and international DLT practitioners.
Based on the evaluation results (as of October 2023),
39 potential DLT platforms were identified, each
with its own characteristics as shown in Table 1.

2. Short List

ensure that the DLT platforms can be used as a
solution for central bank digital currency (CBDC).
There are 3 (three) track record criteria used, based
on the exploration roadmap for the Rupiah Digital
in the White Paper: the use of the DLT platform as a
CBDC solution for wholesale cash ledger, wholesale
securities ledger, and retail (the option remains
open for either DLT or a centralized system). The
short list evaluation was conducted by matching the
DLT platforms on the long list with those used by
central banks and international financial institutions
in the exploration of CBDC wholesale cash ledger,
wholesale securities ledger, and retail, as published.
The assessment results for the short list showed
that, out of the 39 DLT platforms in the long list, 5
(five) DLT platforms had been used by central banks
or other international financial institutions (as of
October 2023) and became candidates for the final
selection.

3. Final Selection

The short list is the result of selecting DLT platforms
from the long list based on each platform’s track
record. The purpose of creating the short list is to

The selection of the 2 (two) DLT platforms to be
tested in the PoC was based on 3 (three) selection
criteria. The first is mandatory requirements, where

Table 1. List of Potential DLT Platform

22

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 32

the DLT platform must be supported by a company/
legal entity to ensure the sustainability of the
technology and is a permissioned network.
The second is the track record of each DLT platform,
DLT platform that have been used more frequently
in CBDC or digital securities projects receive higher
scores. The third is the compatibility of the selected
DLT platform with the 3 (three) focus areas to be
explored during the PoC, which are:
1.

The difference in ledger structures between
token/unspent transaction output (UTXO)
based and account-based DLT platforms;

2.

The data privacy solutions used by each
DLT platform to ensure the confidentiality of
transaction information;

3.

The consensus methods used by the DLT
platforms.

Corda and Hyperledger Besu were selected as
the DLT platforms with the highest potential
based on the 3 (three) final selection criteria to be
developed and tested according to the needs of
Bank Indonesia. As per the mandatory selection
criteria, both platforms have supporting companies/
legal entities. Corda is supported by R3, while
Hyperledger Besu is supported by Kaleido.

R3 Corda and Kaleido Hyperledger Besu meet the
3 (three) focus areas of the Bank Indonesia PoC,
where both have different characteristics in terms of
ledger structure, privacy solutions, and consensus
methods, as shown in Table 2.
R3 Corda uses a UTXO ledger structure, which
can be simply described as recording transactions
based on the transfer of token ownership. Kaleido
Hyperledger Besu uses an account-based ledger
structure, which can be simply described as
recording transactions based on changes in account
balances.
Privacy solutions on R3 Corda use a vault that
only stores transactions relevant to its owner.
Kaleido Hyperledger Besu has a global ledger that
records all transactions and distributes them to all
participants, data privacy is achieved through a
private data manager, which performs encryption
and decryption of data on the global ledger. Only
participants involved in a transaction can decrypt
the data on the global ledger.
R3 Corda uses a unique consensus method
called ‘Notary,’ which acts as a central authority to
verify the uniqueness of transactions (uniqueness
consensus). Kaleido Hyperledger Besu uses a
proof of authority (PoA) consensus method, where
several validators pre-determined by participants are
authorized to validate transactions.

Table 2. PoC Focus Detail

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

23

## Page 33

APPENDIX
B. IMPLEMENTATION DETAILS of the use
case layer
1. Integration of wRD Platform with
BI-RTGS for Issuance and
Redemption

illustration of the transaction creation process in
Kaleido Hyperledger Besu is depicted in Figure 18.

There are 4 (four) types of MT used for
communication of the wRD platform with the BIRTGS system in Table 3.

In R3 Corda, which utilizes the Unspent Transaction
Output (UTXO) model, destruction is a transaction
intended to delete a token. The transaction is
executed through the redemption flow call in the
Rupiah Digital CorDapps application. The illustration
of the destruction flow in R3 Corda is depicted in
Figure 19.

Table 3. The Use of MT File

3. Destruction Detail

Figure 19. Destruction on R3 Corda UTXO

2. Creation Detail
In R3 Corda, which utilizes the Unspent Transaction
Output (UTXO) model, the creation process involves
a transaction that produces the Rupiah Digital
token. This transaction is executed by invoking the
issuance flow on the Rupiah Digital CorDapps. The
illustration of the transaction creation process in R3
Corda is depicted in Figure 17.
Figure 17. Creation on R3 Corda UTXO

Figure 18. Creation on Kaleido Hyperledger
Besu Account Based

In Kaleido Hyperledger Besu, which utilizes the
account model, the creation process involves
a transaction that adds balance to an account
by updating the world state. This transaction is
executed by invoking the issuance flow through the
KDR node to the Rupiah Digital smart contract. The
24

In Kaleido Hyperledger Besu, which utilizes
accounts, destruction is a transaction that reduces
an account’s balance through an update world state.
Transactions are made by calling the redemption
function in Rupiah Digital smart contract. The
illustration of the destruction flow in Kaleido
Hyperledger Besu is depicted in Figure 20.
Figure 20. Destruction on Kaleido Hyperledger Besu

4. Redemption with RTGS Triggered
Redemption initiated from BI-RTGS is explored in
the PoC using a mock-up of the BI-RTGS system.
However, implementing further processes requires
developing BI-RTGS capabilities that are beyond the
scope of the Rupiah Digital PoC. The illustration of
the RTGS triggered redemption flow is depicted in
Figure 21.

Participants registered in the BI-RTGS system
initiate requests to credit their current accounts and
debit the CBDC omnibus account. Upon completion
of the settlement in RTGS, the KDR node on
the wRD platform receives MT202 and MT900
messages as confirmation.
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 34

Figure 21. Redemption Process RTGS Triggered

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

Subsequently, KDR node initiates the crediting of the
omnibus account and debits participants’ balance
on the wRD platform to finalize the settlement on the
Rupiah Digital side. In R3 Corda, KDR node initiates
a flow on CorDapps that receives the Rupiah Digital
token input and destroys the token. In Kaleido
Hyperledger Besu, KDR node triggers a function in
the smart contract to transfer the balance from the
participant’s account to the burn address.

25

## Page 35

APPENDIX
C. IMPLEMENTATION DETAILS of the
execution layer
1. Kubernertes Cluster Configuration
In R3 Corda solutions, the Kubernetes cluster
configuration is separated into 2 (two) types: the

Bank Indonesia Kubernetes cluster, as illustrated in
Figure 22, and 3 (three) participant bank Kubernetes
clusters, as depicted in Figure 23.

Figure 22. Bank Indonesia’s R3 Corda Cluster Configuration on AWS Infrastructure

Figure 23. Participant’s R3 Corda Cluster Configuration on AWS Infrastructure

26

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 36

In Kaleido Hyperledger Besu solution, there are 4
(four) entities: Bank Indonesia, Bank 1,
Bank 2, and Bank 3. This configuration employs
a single Kubernetes cluster, with a Kubernetes
Namespace separating the entities within it. The
cluster configuration for Kaleido Hyperledger Besu
is shown in Figure 24.

2. Smart Contract
Smart contracts are computer programs that
operate on blockchain technology, offering several
unique capabilities: programmability, composability,
and tokenization. Programmability refers to the
ability to automatically execute, control, or document
events and actions according to predetermined
rules, eliminating the need for human intervention.

Composability allows multiple smart contracts to
interact with each other, enabling the bundling
of multiple transactions into one. Tokenization
facilitates the creation and management of various
digital assets, including both the Rupiah Digital and
the digital securities.
The use of smart contracts introduces new features
such as access restrictions, cryptography, and the
separation of on-chain and off-chain data. These
features are tested in this PoC to enhance the
current transaction privacy model. In the long term,
as transaction data accumulates and the demand
for improved transaction methods increases, smart
contracts can be further developed to meet these
evolving needs.

Figure 24. Kaleido Hyperledger Besu Cluster Configuration of Bank Indonesia’s and Participant’s Node
on AWS Infrastructure

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

27

## Page 37

In R3 Corda, a smart contract resides within a
CorDapp (Corda Distributed Application).
As depicted in Figure 25, a CorDapp is a file with
jar extension containing classes written in Java or
Kotlin, which typically include:
1.

State: Contains data and facts that will be
agreed upon by all parties;

2. Contract: Contains rules that regulate the
parties involved in a business process and the
transactions that can be carried out;
3. Flow: Contains flows of a business process and
how transaction data is modified or updated.

as illustrated in Figure 26. Both platforms implement
data separation using on-chain and off-chain
storage. Transaction records, such as transaction ID,
sender-receiver details, and transaction amounts,
are stored on-chain, while other data, such as
participant profiles, are stored off-chain.
Kaleido Hyperledger Besu supports smart contracts
written in Solidity or any other programming
language that can be compiled into Ethereum Virtual
Machine (EVM) bytecode. These smart contracts are
deployed onto the blockchain and executed within
the EVM. The execution of a smart contract function
occurs when a new transaction is written into a

Figure 25. CordApp Component

R3 Corda supports the issuance and management
of digital tokens using the Token SDK, which
facilitates tokenization, including the Rupiah Digital
and the digital securities tokens. Each token is
governed by smart contracts that control its status
and data, and manage the MTO process from
issuance to settlement according to specified
business processes.
R3 Corda does not implement a global ledger.
Instead, its architecture utilizes bilateral/point-topoint data sharing. In R3 Corda, only approved
parties can join the network, and only relevant
parties have access to transaction information,

block within the DLT network. Kaleido Hyperledger
Besu provides a contract management service that
facilitates the deployment and customization of
open-source smart contract standards on EVMs,
such as ERC20, ERC721, and ERC1400. The ERC20
standard is used as the basis for the Rupiah Digital
token, while ERC1400 is utilized for digital securities
tokens. Kaleido Hyperledger Besu stores all
transaction details (transaction ID, sender, recipient,
timestamp, etc.) on-chain in encrypted form,
ensuring that only authorized parties can access the
transaction details.

Figure 26. Rupiah Digital and Digital Securities Illustration at Wholesale Wallets R3 Corda

28

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 38

3. Messaging Components In R3 Corda
and Kaleido Hyperledger Besu

4. Integration of the wRD platform
with BI-RTGS

Event-driven architecture (EDA) is a software
development approach where system components
interact through the exchange of events. An event
signifies a state change within the system, such
as user input, data updates, or notifications from
an external system. This pattern contrasts with the
traditional request/response architecture, where
services must wait for a reply before proceeding to
the next task.

R3 Corda and Kaleido Hyperledger Besu, in general,
have built-in interoperability features that enable the
wRD platform to communicate with other payment
systems, such as BI-RTGS, through standard
communication protocols. This capability directly
supports the creation of an integrated, interoperable,
and interconnected (3i) digital ecosystem.

In EDA, components or services communicate
asynchronously by reading or sending events,
allowing them to react to changes flexibly and
independently. Messaging is a crucial component in
EDA, facilitating the sending and receiving of events.
R3 Corda employs the Advanced Message
Queuing Protocol (AMQP) 1.0 via Transport Layer
Security (TLS) 1.2 between nodes. This is currently

In the PoC, both solutions were connected to
the BI-RTGS using standard communication
protocols and message formats defined by the
existing BI-RTGS messaging standard. The wRD
platform demonstrated that message formats and
communication protocols could be configured to
meet user requirements. Adjustments from the
current message format standard to the ISO 20022
standard are feasible, leveraging the Bank Indonesia
3i standard of integration, interoperability and
interconnection.

Figure 27. Firefly Event Bus (Hyperledger Firefly, 2024)

implemented using Apache Artemis, a message
broker built on top of the MQ protocol. R3 Corda
uses Artemis for communication across the DLT
network, such as when executing transactions
between nodes. Similarly, Kaleido Hyperledger
Besu utilizes the FireFly Event Bus, a messaging
system developed by Kaleido, enabling applications
to receive events from all back-ends connected to
FireFly, as illustrated in Figure 27.
Applications that subscribe to these events use
protocols such as websocket and webhook.
Additionally, plugins can connect to other transport
protocols, including NATS, Kafka, and Java Message
Services (JMS) Server.

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

The mapping of the current message format
to the ISO 20022 format was carried out in the
PoC and will serve as a reference point for future
developments. Bank Indonesia chose ISO 20022
because it is a globally recognized communication
standard for financial transactions, including
payments, remittances, and other transactions that
support financial inclusion.
For R3 Corda solutions, a parser and file generator
were developed, compatible with the current
standard format, as illustrated in
Figure 28. The application, built using Java Spring
Boot, processes BI-RTGS message files and triggers
an R3 Corda API in response. This application also
generates message files for the emulated BI-RTGS
systems, which are then uploaded into AWS S3.
This approach simulates the existing file messaging
exchanges in BI-RTGS.
29

## Page 39

Figure 28. R3 Corda Based PoC Solution Design: BI-RTGS Integration

The BI-RTGS Bridge was developed to connect
the Kaleido Hyperledger Besu platform with the
BI-RTGS system, handling business scenarios of
issuance and redemption. Data exchange with
BI-RTGS, using the standard format, is conducted
through a user interface (web app).

websocket. Transaction triggers are executed by
sending data in standard format through a form on
the web app. Subsequently, this data becomes an
event sent through websocket to be executed as an
on-chain transaction on the DLT.

The BI-RTGS Bridge is developed using HTML
and JavaScript, connected to the Firefly service via

30

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 40

APPENDIX
D. IMPLEMENTATION DETAILS of the data
layer
1. Relational Database Management on
R3 Corda

Figure 31. Directed Acyclic Graph on R3 Corda

R3 Corda utilized 10 (ten) instances of AWS RDS: 9
(nine) for different on-chain databases and 1 (one)
dedicated to managing 8 (eight) off-chain databases,
as illustrated in Figure 29.
Figure 29. Database Design on R3 Corda

2. Relational Database Management on
Kaleido Hyperledger Besu
Figure 30. Database Design on Kaleido Hyperledger Besu

The image depicts various entities forming
interconnected nodes, each representing a single
transaction. For instance, a Transaction (Command)
signed by a party processes a state and generates
a new state. This transaction remains indirectly
connected, producing a new state that can be
traced back to its origin.

4. Kaleido Hyperledger Besu: Asset
Platform and Blockchain
In addition to blockchain, Kaleido Hyperledger Besu
has a data modeling layer that is divided into 3
(three) segments, as depicted in Figure 32.
Figure 32. Kaleido’s Asset Platform Digital Data Layer

Kaleido Hyperledger Besu utilizes 4 (four) AWS
RDS instances, with each instance connected to its
corresponding Asset Platform and the middle-layer
App Stack. Participants who own nodes manage
their own databases and Asset Platforms.

3. R3 Corda: Directed Acyclic Graph
(DAG)

Graph data consists of nodes, or points,
interconnected by edges. Nodes represent entities
or instances of data, while edges represent the
relationships between nodes. Together, connected
nodes and edges form graphs, a model that
illustrates the interconnectedness of data.
A directed acyclic graph (DAG) is a specific type of
graph characterized by 2 (two) main properties:
1) Each edge has a single direction, from an origin
node to a destination node, and 2) There are no
cycles, meaning no nodes form a loop. A more
precise illustration can be seen in the following
image.
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

(Kaleido, 2024)
Application
External
Users

UI

API

Member Instance / Node

Private Off-Chain
Execution

Member-Specific State

Rules / Policies

Keys

Connected
Systems

Private Datastore

Selective Disclosure
Confidential UTXO

Data Hashing

Rollups

Data Signing

Agreed Off-Chain
Execution
Tasks / Flow

Zero Knowledge Proofs

DApps

Shared On-Chain
Execution
Shared Global State
Blockchain

Notary-controlled DLT

Smart Contracts
Shared Database

The top layer is the Member-Specific State, which
contains specific data from network participants,
such as Public and Private Keys. The second
layer contains additional data modeling to store
confidential transaction data that remains connected
to global data.
At the bottom layer, known as the Shared Global
State, a distributed ledger forms a fundamental
component of Kaleido’s technology. In the current
PoC, the selected blockchain stores transaction data
that is shared globally.
31

## Page 41

Figure 33. Blockchain on Kaleido Hyperledger Besu

functions as a chain linking one block to the previous
block. Each block can contain zero to n transactions,
with the maximum number of transactions
determined by the network configuration.
Using a DLT structure such as blockchain,
transactions can be traced back to the creation of
the first block. Transactions can be referenced by
their index within a block and traced through the
hash of the previous block stored in the block header.

5. Confidential UTXO Implementation

Blockchain technology is distinguished by its unique
characteristic of storing data in a connected block
structure. As illustrated in the Figure 33, 1 (one) block
comprises 2 (two) categories of information: header
blocks and transaction data. The header block

32

The implementation chosen for the PoC is the
Confidential Unspent Transaction Output (UTXO). In
this approach, the amount and owner data of a token
are stored off-chain in the Member-Specific State.
The blockchain transaction data only stores the ID of
the token being transacted.

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 42

APPENDIX
E. IMPLEMENTATION DETAILS OF THE
CONSENSUS LAYER
1. Consensus Mechanism in R3 Corda
The consensus mechanism in R3 Corda can be
divided into 2 (two) main components: transaction
validation and transaction uniqueness.
i.

ii.

Transaction Validation
Transaction validation ensures that all
conditions required for a transaction are met
(e.g., sufficient balance, participants acting
within their authority). This process is performed
by smart contracts (when executed) and the
transaction participants. Every transaction
must comply with the smart contract terms.
Before sending the transaction to the notary
(explained in section ii: Transaction Uniqueness),
the participants must sign the transaction,
indicating it has been validated. Before signing,
participants review the transaction to ensure it
adheres to the smart contract terms and meets
all necessary requirements for validity.

2. Consensus Mechanism in Kaleido
Hyperledger Besu
QBFT is a proof of authority (PoA) consensus
algorithm recommended for private networks in
Kaleido Hyperledger Besu. In QBFT, participants
designated as validators (referred to as trusted
validators) are authorized to validate transactions
and take turns in block creation within the network.
A supermajority (more than 2/3) of the trusted
validators who are not assigned to block creation
must sign the transactions before the “created
block” can be added to the blockchain.
Figure 35. Consensus Mechanism in
Kaleido Hyperledger Besu

Transaction Uniqueness
Transaction uniqueness prevents doublespending by verifying that each transaction
input has not been used in another transaction
(ensuring uniqueness). This verification is
performed by the notary. Once the transaction
is signed by all relevant participants, it is sent
to the notary. After the notary confirms the
transaction’s uniqueness, it is considered final.
This finality ensures that the transaction cannot
be canceled or altered.

Figure 34. Consensus Mechanism in R3 Corda

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

33

## Page 43

Furthermore, QBFT is designed to tolerate Byzantine
failures, meaning it can handle up to f “faulty” nodes,
provided the total number of nodes n meets the
condition n ≥ 3f + 1. This ensures that the network
will continue to reach consensus as long as the
number of failed trusted validators does not exceed
the tolerated threshold.

3. Findings: Consensus
When adding a block to a DLT, each node in
the system must reach an agreement. This is
accomplished in the consensus layer. Most
consensus algorithms today fall into 3 (three)
categories: i) proof-based, ii) BFT-based, and iii)
DAG-based.
i.

34

Proof-based
Consensus with proof-based algorithms is the
most commonly used in public/permissionless
DLTs. Proof of work in Bitcoin and proof of
stake in Ethereum are well-known proof-based
consensus mechanisms that provide high levels
of security, scalability, and decentralization
in trustless systems. However, proof-based
consensus, especially traditional proof of work,
requires a significant amount of energy and has
low throughput and transaction confirmation
speed. Despite this, innovations and
modifications in proof-based methods continue
with the aim of achieving better performance
while maintaining the same level of security.

ii.

BFT-based
Consensus with vote/Byzantine Fault Tolerance
(BFT)-based algorithms is generally used in
permissioned DLTs. BFT-based consensus
is achieved through a series of deterministic
communications between nodes. Contrary to
proof-based, BFT-based has better performance
but tends to be lower in decentralization (BFTbased tends to be more centralized).

iii. DAG-based
Consensus with DAG-based algorithms is
used by distributed ledgers that employ graph
structures rather than blocks, as typically
used in blockchain. In DAG-based systems,
transactions form nodes in a graph that refer
to each other, creating a series of graphs. This
graph structure allows transactions to occur
in parallel, resulting in high scalability and
throughput. However, DAG-based systems
tend to have lower security. Some DAGbased systems also use the concept of trusted
validators, which reduces decentralization.
In conclusion, there is no “one-size-fits-all”
consensus. Therefore, it is necessary to delve into
the specific needs of each case to determine which
consensus is most suitable.

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 44

GAMBAR 36. ILUSTRASI PENGGUNAAN CENM (R3 CORDA, 2024)

APPENDIX
F. IMPLEMENTATION DETAILS of the
NETWORK LAYER
1. Illustration of the Use of CENM
Corda Enterprise Network Manager (CENM)
manages and operates the R3 Corda DLT network.
CENM provides a set of functions that can be used
by operators to manage DLT networks, including
node configuration, network map management, and
certificate authority services.
CENM is supported by 3 (three) main components
to carry out its functions, including:
1.

Identity Manager
The identity manager performs 2 (two) main
functions to manage the identity of nodes in
the R3 Corda network: 1) Issuance of node
identities through the issuance of certificates
that associate legal names with public keys.
2) Revoking the certificate when needed. The
Certificate Issuance and Revocation service
in Identity Manager supports using plugins35
to model the approval process workflow for
certificate issuance and revocation.

Figure 36. Illustration of the Use of CENM (Corda, 2024)

3. Signing Service
The Signing Service is responsible for signing
several things: Identity Certificates, Revocation
lists, Network Parameters, and Network Maps.
R3 recommends storing each key in Hardware
Security Modules (HSMs) to keep that critical
security by adding a configuration to the
Signing Service.

2. Permissioned Network Kaleido
Hyperledger Besu
There are 3 (three) networks that connect the
Kaleido Hyperledger Besu nodes: the blockchain
network, the private transaction network, and the
InterPlanetary File System (IPFS). The blockchain
network on Kaleido Hyperledger Besu operates
using a permissioned network with 2 (two) types of
access controls: node-based and account-based.
Node-based access control manages a node’s
ability to connect to the network, while accountbased access control governs the onboarding
process, account freezing, and the limitation of
transaction activities within the network.
In the blockchain network, there are 2 (two) levels
of access control: local and on-chain. Local access
controls are stored on individual nodes and contain
a whitelist of nodes approved for communication.
This level of control primarily focuses on protecting
nodes connected to the network. On the other
hand, on-chain access controls are stored in smart
contracts and regulate the roles of individual
accounts in performing transactions on the network.

2. Network Map
The Network Map serves as a location service
for nodes once they obtain the identity
assigned by CENM. In addition, by joining the
network, a node agrees on a set of parameters
that define the rules for reaching a consensus
on the zone. One of the most important is the
list of trusted notary services.

To meet privacy standards, Kaleido Hyperledger
Besu employs a private data manager, which
connects to the private transaction network using
mutual TLS protocols for secure point-to-point data
transmission.
The InterPlanetary File System (IPFS) network
facilitates file exchanges between nodes.

A zone can host several consensus rule sets,
each forming a different sub-zone within the
main zone.

35. Plugins are software components that add specific features or functions to a computer program.
Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

35

## Page 45

APPENDIX
G. Liquidity Management and Privacy
Concepts for Advanced
Exploration
1. Liquidity Management: Liquidity
Saving Mechanism
In the implementation of the Rupiah Digital proof
of concept (PoC), both the R3 Corda and Kaleido
Hyperledger Besu solutions adopted gross
settlement mechanisms equipped with queueing
mechanisms to simplify and reduce the need for
a complex liquidity-savings mechanism (LSM).
The queueing mechanism is implemented in a
decentralized manner, where participants are
responsible for managing their own queues. A
transaction enters the queue if it does not meet the
transaction criteria: 1) Low Priority, and
2) Sufficient Balance.
The R3 Corda solution processes queues using a
First In, First Out (FIFO) approach, meaning that the
earliest transaction in the queue is processed first
once the participant’s balance is sufficient to cover
the transaction. On the other hand, the Kaleido
Hyperledger Besu solution applies a First Available,
First Out (FAFO) method for queue processing,
where transactions with sufficient balance are
processed first.
There are aspects of the queueing mechanism for
LSM that can be further explored, as illustrated
in the diagram below. In general, the queue
management process remains consistent with the
PoC implementation results. The criteria applied can
be tailored to the business process, ensuring that
transactions meeting these criteria are settled on a
gross basis. The primary difference lies in the queue
management approach, which involves a centralized
queue.
Figure 37. Queue Management Flow for Further
Exploration

Unlike the PoC implementation that distributes
queue management among participants, a
centralized queue relies on a single entity, such
as the observer node, to manage the queue. In
this case, the observer node, which is aware of
each participant’s transactions, is delegated to
manage the queue and resolve gridlocks. When
multiple participants experience gridlocked
transactions, they can submit these transactions to
the centralized queue, encapsulated as an event.
The centralized queue then waits for additional
transactions that can be resolved within a
predefined time limit. If this time limit is exceeded,
the transactions are canceled to prevent ongoing
gridlock.

2. Privacy: Zero Knowledge Proof
In the BI-RTGS system, only the transaction parties
have information about their own transaction
data. There are several DLT solutions that can
accommodate this policy. R3 Corda, which is built
on a need-to-know principle using a directed acyclic
graph (DAG), directly meets the privacy criteria
set by Bank Indonesia. On the other hand, Kaleido
Hyperledger Besu, which utilizes EVM blockchain
technology, adopts Ethereum’s global state36
model with a transparent and “trustless” ledger
design. Due to its public blockchain foundation,
EVM inherently provides transparency between
participants. Privacy concepts are added on top
of the public blockchain layer of EVM with various
solutions depending on the specific requirements. In
the proof of concept (PoC), in addition to on-chain
transaction data, Confidential UTXO with Notary,
which fundamentally resembles the working method
of R3 Corda, was also explored. Confidential UTXO
comprises off-chain components and a UTXO
pattern layered on top of EVM. Integrated privacy
solutions using Zero-Knowledge Proofs (ZKP) will
also be explored in further detail below.
The privacy criteria tested in the PoC are: 1) Only
the sender and receiver should be aware of the
transaction, and 2) Other parties should not be able
to detect the transaction being added to a block
from any particular party. To meet the first criterion,
Kaleido Hyperledger Besu leverages a combination
of Besu nodes processing encrypted data and a
private data manager that sends decrypted data on
a peer-to-peer basis. However, since the blockchain

36. Global state model is a model in which all system components have access to the same set of data.
36

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 46

GAMBAR 36. ILUSTRASI PENGGUNAAN CENM (R3 CORDA, 2024)

generates an event for each transaction, the details
of the encrypted transactions in the block can still
be seen through event subscriptions, thereby failing
to meet the first criterion in this model.
The privacy model explored in the PoC is
Confidential UTXO utilizing a Notary, which
conceptually aligns with R3 Corda. However, this
model requires an enterprise version of the EVM
blockchain and additional processes to ensure
transactions occur. The difference between R3
Corda and Kaleido Hyperledger Besu in this model
lies in the connectivity between nodes, which is
point-to-point in R3 Corda and distributed in Kaleido
Hyperledger Besu. Both have their respective
strengths and weaknesses.
Confidential UTXO (whether in R3 Corda or Kaleido
Hyperledger Besu) uses a Notary to validate the
balance update of participants in a transaction.
However, the centralized role of the Notary
introduces a single point of failure, leading to the
proposal of an alternative solution, Zero-Knowledge
Proof (ZKP), which has emerged within the EVM
community. The ZKP privacy model can meet both
privacy criteria (points 1 and 2) while maintaining
the multi-validator concept within the blockchain
network. This model is relatively new and continues
to evolve in industry practices.
The ZKP method under consideration still uses
the UTXO structure to store participants’ tokens.

Validators will validate transactions without knowing
the contents of those transactions. To ensure that
the tokens added comply with the rules, verification
is stored in smart contracts relying on the ZKP
principle.
In Figure 38, the fund transfer conducted by the
Bank relies on an additional component, the ZK
Prover, to generate components ‘a’ and ‘b’, which are
the encryption of tokens 1 and 2 respectively, known
only to the sender. The sender will create new
components that are known only to the receiver and
observer, allowing both parties to know the value of
the transaction that occurred.
With this solution, Party B cannot determine the
number of tokens and their respective values used
by Party A. Party B only knows the new tokens
received.
According to experiments conducted by Kaleido,
this process adds approximately 2 seconds to each
transaction. Additionally, there are components that
need to be added according to the variables that
require verification and the parties involved.
An essential component of this solution is the
zero-knowledge circuit, implemented through a
combination of mathematical operations. This
component generates an output in the form of a
hash of the data, which is then processed into a
block.

Figure 38. Kaleido’s Privacy Model Concept for Further Exploration

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

37

## Page 47

APPENDIX
H. poc SCENARIO TOPICS
Table 4. PoC Scenario Topics

38

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 48

GAMBAR 36. ILUSTRASI PENGGUNAAN CENM (R3 CORDA, 2024)

APPENDIX
I. load test
1. Scope and Results of Load Test
The load test results were obtained using the
Locust Dashboard and AWS CloudWatch. Due to
the limitations and time constraints of the PoC, the
load test primarily focused on meeting the threshold
consistent with the typical traffic of wholesale
payment systems, approximately 30 transactions
per second (tps). Both technologies successfully
met this threshold, with R3 Corda recording 37
tps and Kaleido Hyperledger Besu achieving 39
tps. It is important to note that further exploration
with additional time and resources is necessary
to fully assess the maximum capabilities of both
technologies. Additionally, the load test results are
influenced by multiple factors, including the type of
distributed ledger technology (DLT) used, as well as
other elements such as middleware, infrastructure
capacity, and configuration settings.

2. R3 Corda and Kaleido Hyperledger
Besu Load Configuration when
Performing Load Test

node, non-validating notary node, and network map
node. Each wholesaler bank cluster consists of 1
(one) wholesaler node. Due to the non-validating
nature of the notary, it is not required to validate
transactions, resulting in improved performance.
Similarly, the Kaleido Hyperledger Besu network
consists of 1 (one) Bank Indonesia node cluster
and 3 (three) wholesaler bank clusters. However, in
the Kaleido Hyperledger Besu network, the Bank
Indonesia cluster does not include notary or network
map nodes. Instead, the wholesaler bank clusters
serve as validators. Kaleido Hyperledger Besu also
employs a combination of off-chain and on-chain
processing when executing logic on the network,
which can positively impact performance.
For load testing, the minimum configured AWS
cloud infrastructure was utilized, as depicted in
Figures 39 and 40. The on-premise configuration
was not explored in the PoC. In the future,
infrastructure configurations should be designed
according to specific performance requirements,
whether on-premise or cloud-based.

In the proof of concept (PoC), the R3 Corda network
comprises 1 (one) Bank Indonesia node cluster
and 3 (three) wholesaler bank clusters. The Bank
Indonesia cluster includes observer node, KDR
node, provider node, regulator node, administrator
Figure 39. R3 Corda Infrastructure on AWS For Wholesale Participant Clusters

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

39

## Page 49

Figure 40. Kaleido Hyperledger Besu Infrastructure on AWS For Wholesale Participant Clusters

Both platforms require further optimization to handle
the potential for increased transaction loads. This
can be done in synergy across various components
ranging from network design and hardware specs

40

to refinement of consensus methods, application
architectures, and potential scalability solutions
(such as channels, data sharding, and others).

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.

## Page 50

list of AUTHORs
Coordinator:
Endang Trianti (Assistant Governor/DPID),
Dicky Kartikoyono (Assistant Governor/DKSP)
Contributor:
Rohadi Triatmono (Executive Director/DPID),
Ryan Rizaldy (Director/DKSP),
Yudi Muliawirawan Sugalih (Deputy Director/DPID)
Writer Team:
Setyo Kuncoro, Bagas Aji Pratama, Kevin Eza Rizky, Timothy Thamrin Andrew H. Sihombing,
Sirria Panah Alam, Dewi Septina Br Pelawi, Bijak Antusias Sufi, Faradilla Azranur, Dian Nofitri,
Annisa Muzdalifa
Technical Team:
Workstream 1 Project Garuda:
Novi Maryaningsih, Kusuma Ayu Kinanti, Nenden Endah Sari, Akhmad Ginulur Pangersa,
Moh. Nuryazidi, Yudha Wastu Prawira, Ivan Devara, Najibullah Ulul Albab, Abhirama Budiawan,
Adinda Diyah Ayu Permata Sari, Ridha Nur Huzaifah, Ruth A Cussoy Intama, Afaf Munawwarah,
Angga Puspa Hapsari, Yoga Aroyandi
Workstream 2 Project Garuda:
Setyo Kuncoro, Bagas Aji Pratama, Kevin Eza Rizky, Timothy Thamrin Andrew H. Sihombing,
Sirria Panah Alam, Dewi Septina Br Pelawi, Bijak Antusias Sufi, Faradilla Azranur, Dian Nofitri,
Annisa Muzdalifa, Ngadino, Muhammad Arif Sultoni, Prihantojo, Istianto Utomo,
Suryo Pranoto Utomo, Johannes Andrew Kristiandi
Workstream 3 Project Garuda:
Lisa Rienelda Irsal, Faried Caesar Nugroho, Charvin Lim, Berly, Renold Abdi
Acknowledgements and appreciation were also conveyed to Consultant, Technology Partner,
Cloud Provider, and Cloud Implementator
BANK INDONESIA
Jalan M.H. Thamrin No.2, Jakarta – 10350, Indonesia

42

Project Garuda: Proof of Concept Report | DECEMBER 2024
© Bank Indonesia 2024. All rights reserved.
