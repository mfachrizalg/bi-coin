---
source_type: pdf
title: "Demystifying Blockchain Technology in Healthcare Perspective and its Implementation"
original_file: "thesis/reference/Demystifying_Blockchain_Technology_in_Healthcare_Perspective_and_its_Implementation.pdf"
sha256: "752a760f4d82064e53a4ede830882cc563418e0b4dad818a4f313c348ac8dab6"
page_count: 6
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Demystifying Blockchain Technology in Healthcare Perspective and its Implementation

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2025 12th International Conference on Reliability, Infocom Technologies and Optimization (Trends and Future Directions) (ICRITO) | 979-8-3315-5421-7/25/$31.00 ©2025 IEEE | DOI: 10.1109/ICRITO66076.2025.11241397

2025 12th International Conference on Reliability, Infocom Technologies and Optimization (Trends and Future Directions) (ICRITO)
Amity University, Noida, India. Sep 18-19, 2025

Demystifying Blockchain Technology in Healthcare
Perspective and Its Implementation
Aditi Sharma
Chitkara University Institute of
Engineering and Technology,
Chitkara University,
Punjab, India
aditi.sharma@chitkara.edu.in

Rajesh Kumar Kaushal*
Chitkara University Institute of
Engineering and Technology,
Chitkara University,
Punjab, India
rajesh.kaushal@chitkara.edu.in

and applications. Three different types of blockchain are
private, public, and consortium blockchain.

Abstract- Electronic Health Records have become a
foundation of modern healthcare for the digital storage and
management of patient data. However, conventional Electronic
Health Record (EHR) systems still encounter significant
challenges related to data quality, security, and privacy. This
study examines the integration of Hyperledger Fabric with the
Electronic Health Record in the context of blockchain
technology, which provides a decentralized storage and
immutability of patient health data. With the help of a
permissioned blockchain framework, this approach maintains
the patient’s privacy and reliability of the system, with safe,
transparent, and complete data sharing among various
stakeholders. A prototype system was created by using Node.js
programming and Hyperledger Fabric. For calculating the
system’s performance on different testing rounds, transaction
quantities are increased from 300 to 1500 packets sent with a
fixed size of 2 KB. This system's reliability generates a 100%
success rate without any failure. Moreover, the packet sent rate
was increased from 500 to 2500, and the transaction size was also
increased from 2KB to 4 KB, which evaluates the system’s
reliability with a higher data load. Even the system is
dependable with heavy load because it maintains a perfect
commit rate, and the system achieves a 100% success rate under
the variant transaction load.

Public blockchain is completely decentralized, where
anyone can join the network and participate in the verification
process. It follows proof of work (PoW), proof of stake (PoS)
cryptographic algorithms to reach consensus. Permissioned
blockchain is partially decentralized, as the verification
process is managed by a group of predetermined and known
participants [2]. It provides more privacy but less transparency
as compared to the public blockchain.
With the increase in the popularity of blockchain in
various sectors, it has become an essential component in
various business activities, including supply chain, financial
transactions, real estate, and healthcare. The banking sector
uses R3, Corda, and Ripple for cross-border payment, whereas
supply chain networks use Quorum. Blockchain provides
inherent features that include data decentralization,
immutability, and auditability. Blockchain uses blocks to store
information. Other main parts of the block are the nonce
protocol, timestamping, Merkle root, and hash.
The
establishment of a blockchain offers a secure data chain,
which is described in Fig 1. The Genesis Block is the name of
the initial block, which has no previous hash. Future blocks
maintain integrity and protect against manipulation by
connecting to their predecessors using cryptographic hashes
[4]. The interconnecting blocks illustrate the immutability and
security of blockchain technology.

Keywords- Blockchain, Electronic Health Record, Healthcare,
Hyperledger Fabric, Hyperledger Caliper

I.

Naveen Kumar
Chitkara University Institute of
Engineering and Technology,
Chitkara University,
Punjab, India
Naveen.sharma@chitkara.edu.in

INTRODUCTION

Due to the growing popularity of cryptocurrency,
distributed ledger technology has also gained popularity in
various sectors. Bitcoin was initially developed in 2008,
managed by multiple peer-to-peer network systems, which are
used to solve the double-spending problem [1]. Over time,
many blockchain technologies have emerged with special
features and capabilities designed for specific requirements

Blockchain technology offers several advantages over
centralized approaches, like increased security, transparency,
and decentralization. The following quality of service
standards are determined by an extensive assessment of the
state of the art in the field of blockchain-based ecosystems.
Key advantages of blockchain are described as:

Fig. 1. Representation of blocks in blockchain

979-8-3315-5421-7/25/$31.00 ©2025 IEEE

1

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:31 UTC from IEEE Xplore. Restrictions apply.

## Page 2

x

Decentralization- Blockchain runs on a distributed
system of nodes, contrasting with traditional
databases governed by a central authority. Each
participant has a copy of the ledger, reducing the risk
of a single point of failure [4].

x

Immutability- Data on a blockchain cannot be
removed or changed once it has been recorded. This
is made possible via consensus processes and
cryptographic hashing, which make blockchain
resistant to manipulation or fraud [5]. The majority
should come together to do so in the case of a public
blockchain that is 51% attacked.

x

This study contributes in the following ways:

Security- Blockchain secures transactions via
cryptographic methods. Two consensus techniques,
PoW and PoS, ensure that only authorized
transactions are recorded [6]. Since data is spread
across several nodes, cyberattacks are extremely
difficult to impact.

x

Consensus mechanism- Blockchain technology
employs a consensus procedure that ensures that
every node in the network is under the present state of
the ledger. This reduces the possibility of fraud and
double spending [7].

x

Tokenization- On a blockchain, assets, like digital or
physical, can be represented as tokens. There are
several kinds of tokens, such as non-fungible tokens,
which are independent and cannot be traded one-toone, and fungible tokens, which are similar to
cryptocurrencies like Bitcoin and Ethereum. By
removing middlemen, tokenization facilitates
fractional ownership, enhances liquidity, and
streamlines asset transfers[2].

x

Anonymity & Privacy- Blockchain provides
transparency, but it can also offer privacy by using
cryptographic methods. Zero-knowledge proofs are
employed by privacy-focused blockchains such as
Monero and Zcash to secure user identities.
Confidential transactions and coin mixers are
examples of privacy-enhancing tools that help hide
sender, recipient, and transaction amounts[8].

x

integration and broad use in the healthcare sector. Many of
these problems can be resolved by blockchain, but
implementation is still slow because of legal barriers, outdated
infrastructure, and low understanding. As a result, blockchain
technology is expected to be underutilized in the healthcare
industry, particularly in areas such as patient data exchange
and Electronic Health Record management, where the
appropriate selection of a blockchain framework and tools can
provide better solutions.
x

Integrates Hyperledger Fabric into EHR systems in a
multi-organization environment to enhance data
security and transparency.

x

Test the performance of the system’s reliability under
varying transaction loads.

The organisation of the paper is as follows: Section II
discusses the extensive literature review on electronic health
records employing various technologies. Section III describes
the methodology used. After that, section IV covers the
working environment of the Hyperledger Fabric network. The
result of the proposed solution is given in Section V, and
Section VI covers the conclusion of this research work.
II.

METHODOLOGY USED

The study followed a structured research methodology
comprising system design and implementation of an efficient
blockchain-enabled EHR system. The first step involved
reviewing existing studies in this domain and identifying
issues related to data security, privacy, decentralization, and
immutability. Based on these key insights, a blockchain-based
Electronic Health Record has been proposed. The
methodology used to implement in proposed solution is
discussed in Fig 2.
A. Literature Review
This section reviews existing research on Electronic
Health Record management systems and identifies limitations
and challenges, such as a single point of failure and security,
and auditability concerns.
B. Use case
To demonstrate the implementation of blockchain in the
EHR system, a use case has been set up where a prototype of
the efficient EHR system has been proposed. JavaScript object
notation (JSON) is used to send data to the distributed ledger.

Programmability—Blockchain
programmability
can be applied to smart contracts, which are selfexecuting contracts with established guidelines
encoded in code. These contracts offer efficiency,
security, and transparency by managing transactions
without the need for middlemen.

C. Network Setup
In this phase, a blockchain-based network is established
using the Hyperledger Fabric framework with various key
factors, including programming language, network
architecture, channels, consensus algorithm, orderer, and
certificate authorities.

Blockchain technology is transparent, decentralized, and
secure; it is frequently used in different areas. It supports
digital currencies, enables fast and secure transactions, and
promotes decentralized financing (DeFi) in the financial
industry. It supports better transparency, fraud prevention, and
product tracking in supply chain management. While digital
identification uses blockchain to create safe, self-owned
identities, voting systems benefit from tamper-proof records.
Blockchain is being used in the government, energy, and
transportation sectors to increase automation and trust.

D. Business Logic
The business logic is used to achieve the desired outcome.
It can be written in any supported programming language such
as Go, Java, or Node.js. this research has employed Node.js
for business logic development.
E. Implementation
This phase involves the implementation of blockchain
with EHR. The technique involves utilizing Hyperledger
Fabric to construct a permissioned blockchain architecture

Despite its potential, blockchain is still not fully explored
in the healthcare industry. Interoperability issues, privacy
concerns, and fragmented data systems are some of the
challenges that affect interactions, which still prevent its

2
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:31 UTC from IEEE Xplore. Restrictions apply.

## Page 3

rates. These tests provide insights into the robustness of the
proposed system.

that provides private channels based on electronic health
records, individual ledger of every organisation, and modular
consensus. A RAFT-based ordered controls consensus and
transaction ordering within the network, and each of the two
organizations has a peer node that keeps a copy of the ledger.

III.

Blockchain technology has revolutionized the healthcare
sector by enabling improved data security, interoperability,
and transparency. The development of Electronic Health
Records significantly altered how healthcare systems collect,
store, and manage patient data. Digital copies of a patient's
medical history, including diagnoses, treatments, test results,
prescription medicines, and other health information, are
called electronic health records, or EHRs. By reducing
medical errors, increasing provider collaboration, and
improving data accessibility, they are designed to improve the
delivery of healthcare. EHRs are essential for providing
patients with immediate, reliable, and effective care. Many
studies have looked into the impact, design, and
implementation of traditional EHR systems during the last ten
years, showing both their advantages and recurring
difficulties. A summary of the technologies used for different
research is given in Table 1.
An existing study presents a thorough technical analysis of
integrating Electronic Health Records with modern healthcare
systems. It explores the relationships between EHRs and
healthcare platforms, remote monitoring systems, and clinical
decision support tools. The study focused on how real-time
data processing and predictive analysis might increase clinical
efficiency, diagnostic accuracy, and patient safety. In addition,
it emphasizes the significance of strong privacy frameworks
like HIPAA and role-based access control, as well as
interoperability standards like HL7 FHIR and the function of
APIs [9].

Fig. 2. Methodology to converge Blockchain with EHR system

F. Testing
This section involves the testing of the proposed system
by injecting a heavy load in varying transaction and sending
TABLE I.

LITERATURE REVIEW

EXISTING STUDY ON ELECTRONIC HEALTH RECORD

Year
Ref.

Technology used

Approach

Summary

Limitation

2025
[9]

EHR integrated with
Decision Support Systems
(DSS)
Electronic Health Records

Literature-based
comparative

Medical devices connect with EHRs
to improve patient outcomes and
healthcare processes
EHRs improve decision-making, care
coordination, and data access, which
improve patient care.

Interoperability issues, low user
adoption, and limited technical
resources
interoperability issues, data security
concerns, and barriers to adoption from
providers.

2024
[11]

UML-based
Software
Reference Architecture

The multi-phase
approach consists of case
studies, layered design,
analysis, and
classification.

EHR security and privacy have been
validated by a Brazilian healthcare
organization.

Privacy and security features are
missing in systems like SRA need
further validation and integration.

2020
[12]

Entropy-regularized
Convolutional
Neural
Network

Use EHR data and ten critical
indicators to predict the chance of
admission for dementia.

High learning time and complexity,
limited generalizability because of local
data.

2023
[13]

Machine Learning, Deep
learning, Natural Language
Processing

Entropy-based
regularization and
snapshot ensemble
learning were combined.
supervised,
unsupervised, CNN, T5,
Graph network

EHR is used to extract structured data
for improved decision-making and
contextually identify clinical symbols.

Large, labelled data is required;
unbalanced datasets are difficult to
interpret.

2023
[14]

Ethereum Blockchain

Use for GDPR compliance and safe
EHR management with patientcontrolled access

Depends on an external database;
requires
ether;
lacks
on-chain
scalability or deletion.

2023
[15]

Ethereum with Solidity

Decentralized web-based system for
tracking the supply chain of sugar.

High gas costs and a slow transaction
pace (12 TPS)

2024
[10]

Comprehensive literature
review

Smart contract,
consortium blockchain
SDLC Waterfall model
for systematic system
development.

3
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:31 UTC from IEEE Xplore. Restrictions apply.

## Page 4

In another study[10] the author examines how Electronic
Health Records enhance patient care, emphasizing how better
access, coordination, and decision-making lead to better
performance. Using a literature review approach, it indicates
that EHRs support evidence-based care and lower errors, yet
issues like security and interoperability still exist. Future
possibilities for more effective and personal healthcare
include combining EHRs with blockchain, AI, and
telemedicine.

deep learning, and artificial intelligence techniques.
Few studies have looked into blockchain integration—
primarily using Ethereum—to improve privacy and
traceability, even though real-time data processing, predictive
analytics, and decision support tools are being added to
traditional Electronic Health Record systems. The
implementation of Ethereum-based solutions in critical
healthcare settings is difficult due to major challenges such
as high gas costs, scalability problems, immutable data, and
dependence on public consensus.

According to the study [9], which emphasizes enhancing
security and privacy, the work aims to develop a Software
Reference Architecture (SRA) for Electronic Health Records.
Concepts are discussed, existing solutions are examined, the
architecture is categorized, a layered model is created using
UML, and an evaluation is conducted using a case study of a
Brazilian Electronic Health Record. The findings show how
well the suggested SRA incorporates important security and
privacy characteristics and assists in locating problems in
current systems. To test the SRA's larger applicability, future
research will apply it to different healthcare systems.

Our study employs Hyperledger Fabric, a suitable
blockchain framework identified through a comprehensive
literature review and comparative analysis of public and
permissioned frameworks[16][17]. Its permissioned structure,
private channel performance, flexible consensus algorithms,
strong performance, and compliance with GDPR and HIPAA
regulations make it a preferred choice to implement an EHR
system.
IV. IMPLEMENTATION
This section discusses the overview of the development
environment for the proposed blockchain-based EHR system.
The software configuration is listed in Table II.

In another study[12] it was used to sparsely analyze
massive EHR data to predict hospitalization probability in
patients. It suggested an ensemble deep neural network
(ECNN) model that combines snapshot ensembles for feature
selection and prediction with entropy-based weight
regularization. The model achieved high accuracy
at 0.759 with reduced complexity by identifying 10 vital
signs, such as vitamin D insufficiency and hypertension, from
nearly 54,000 features. The application of ECNN in early
warning systems was supported by its excellent performance
and interpretability. Time-series modelling, larger datasets,
and complex neural techniques are all part of the future effort.

TABLE II.

Using a review of the literature on medical errors, EHR
adoption, and NLP/ML-based classification techniques, the
paper attempts to address clinical errors in EHRs caused by
ambiguous medical abbreviations. It concludes that although
deep learning has enhanced acronym resolution, practical use
is constrained by issues such as data scarcity, privacy, and
interpretability. To get over data shortages and enhance patient
safety, future studies should concentrate on scalable,
explainable models and examine generative or unsupervised
learning [13].

SOFTWARE REQUIREMENT

Component

Specification

Operating System

Ubuntu 20.04 LTS

Programming Language

Node.js

Container Tool

Docker and composer

Blockchain Framework

Hyperledger Fabric (V2.X)

Consensus Algorithm

RAFT

The network initialization commenced with the
installation of essential software components, including
cURL, JQ, Docker, and Docker Compose. To retrieve the data
from a web-based HTTP repository, we use the concept of
cURL, which is a command-line tool. For parsing and
manipulation of the structured data, JQ serves as a flexible and
lightweight command-line JSON processor. Docker is an
open-source program that provides a portable container for
developing and executing applications in remote units. These
packets are dependable and run consistently in different
environments. Whereas Docker Composer is a tool that allows
us to compose and manage multiple container applications
simultaneously.

To safeguard EHR privacy and maintain the GDPR's this
paper proposes to use the Ethereum blockchain to create a
secure mobile healthcare system. It makes use of wearable
technology, off-chain encrypted storage, and smart contracts.
The outcomes indicate enhanced patient management, data
security, and compliance. In the future, include sharing a
healthcare system via GitHub and deleting on-chain data
using the redactable blockchain [14]. In another study, it was
found that a blockchain system based on Ethereum for supply
chain transactions involving white sugar that are transparent
and traceable. It uses a web application with ReactJS, PHP,
and MySQL, Metamask, Ropsten test-net, and smart contracts
like Solidity using the SDLC Waterfall methodology. Users
can use transaction hash codes to confirm product details
because of the system's real-time data tracking features.
Future goals include becoming everywhere, utilizing Layer-2
platforms like Polygon for improved performance, and
integrating IoT for automation [15].
Recent research has improved the deployment of
Electronic Health Record systems using machine learning,

Fig. 3. Channel’s Configuration

4
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:31 UTC from IEEE Xplore. Restrictions apply.

## Page 5

The Hyperledger Fabric framework was installed and
deployed in the Fig 3. In this network, there are two
organisations, each of which has a single peer node. For digital
credentials, peer is simplified through Hyperledger Fabric’s
Certificate Authority (CA) for a secure issuance and validation
process. Moreover, to accept and commit the transactions to
the distributed ledger system, transaction ordering and
validation was ruled by the orderer node.

Number of Transactions

Packet Sent

Commit Packets
1500

1600
1400
1200

1000

1000

800

800
600
400
200

1500

500
300
300

800

1000

500

0

20

40

60

80

100

Sent Rate
Fig. 5. Comparison of Packet Sent Vs Packet Commit Rate

Fig 5 shows the result obtained from Hyperledger Caliper,
where the proposed system has been tested in multiple rounds
of write operations with varying send rate, starting from 20
TPS to 100 TPS, with also increase in the number of
transactions sent in every round. Each round used a
transaction size of 2 KB, and the number of transactions
increased from 300 to 1500. The system reliably committed
all submitted transactions, achieving a 0% transaction failure
rate and demonstrating consistent performance across all
rounds.

Fig. 4. Smart Contract Modules

After the positive creation of the network, the smart
contract is deployed on the network channel and written using
Node.js. Smart system has three major users, which are the
patient, the admin, and the healthcare provider. In the
proposed solution smart contract has separate components in
every phase. The architecture of the various modules of the
smart contract is shown in image 4.

Packet Sent

Packet Committed

3000

TABLE III.
Round

Packets

1
2
3
4
5

300
500
800
1000
1500

Number of Transactions

V. RESULTS AND DISCUSSION
The proposed solution is deployed with multiple
organizations set up, where each organization has one peer,
one orderer node, one certificate authority, and a common
channel. The blockchain state ledger maintains all the
transactions and transaction logs. Now it becomes important
to check the performance and robustness of the system by
injecting a heavy load of transactions. Hyperledger Caliper,
which is a benchmarking tool to test the performance of a
blockchain network, is installed and configured. The
robustness of the proposed system is tested by injecting write
transactions through Hyperledger Caliper in multiple rounds
of varying load and variable transfer rates. The success rate
and the results of the testing of the proposed solution are given
in Table III.

Failure
rate
0
0
0
0
0

2000

2000

1500

1500
1000

1000

2500
2000

500

500

1500
1000

500
0
20

40

60

80

100

Sent Rate
Fig. 6. Comparison of packets sent vs packets committed with increased
packet size

Another scenario has been tested by increasing the
transaction size from 2 KB to 4 KB while maintaining the
same transfer rate from 20–100 TPS and number of rounds to
further confirm the reliability of the proposed method.
However, the quantity of packets was greatly increased, going
from 500 to 2500 in 500-packet increments. Fig 6 exhibits that
the system maintained a 100% packet success rate with no
packet loss throughout any test round, even with high load. In
addition to confirming the network's outstanding
reliability under greater throughput demands, this shows how
well it can manage larger data sizes.

HYPERLEDGER CALIPER TEST RESULT
Transfer
Rate (TPS)
20
40
60
80
100

2500

2500

Success
rate
100%
100%
100%
100%
100%

The robustness of the proposed solution is tested using
Hyperledger Caliper, where multiple rounds of heavy
transactions are injected, and all the transactions are
successfully committed on the ledger, and no single failure
occurred during any round of testing.

VI.

CONCLUSION

Managing the sensitive data of patients in the healthcare
sector using blockchain technology is significant as the
blockchain offers various features that provide better security
and safety of highly sensitive data through cryptographic
algorithms and its inherent features. The performance of the

5
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:31 UTC from IEEE Xplore. Restrictions apply.

## Page 6

system is calculated by a suitable framework of blockchain
technology. This analysis determines the effective integration
of electronic health records with Hyperledger Fabric systems
to address challenges in security, data privacy, and
interoperability. A permissioned blockchain and integrated
consensus mechanisms are used to provide real-time patient
information and ensure accountability. The output of this
study shows that the Hyperledger Fabric framework is reliable
and overcomes the drawbacks of the traditional EHR system.
The model's reliability has been shown by supplementary
testing with the increased transaction size from 2KB to 4 KB,
and the packet sent rate is from 300 to 1500 and from 500 to
2500, and from 20 to 100 TPS, which examines no packet loss
on any transaction even with higher data size, the suggested
blockchain-based EHR network is strongly reliable. Future
research should focus on integrating Internet of Medical
Things, improving integration with current standards like HL7
FHIR, and evaluating performance in real-world healthcare
environments to ensure broad application as blockchain
popularity increases.

[7]

P. K. Sarao, N. Kaur, and M. Sharma, “Blockchain: A Review Study of
Protocols and Enterprise Frameworks,” in 2023 International
Conference on Computational Intelligence, Communication
Technology and Networking (CICTN), 2023, pp. 474–479. Doi:
10.1109/CICTN57981.2023.10141434.
[8] R. Kumar and R. Tripathi, “Towards design and implementation of
security and privacy framework for Internet of Medical Things (IoMT)
by leveraging blockchain and IPFS technology,” J. Supercomput., vol.
77, no. 8, pp. 7916–7955, 2021, Doi: 10.1007/s11227-020-03570-x.
[9] S. Maddela, “Integration Of Electronic Health Records With Modern
Healthcare Systems: A Technical Overview,” Int. J. Comput. Eng.
Technol., vol. 16, no. 1, pp. 295–305, 2025, Doi:
10.34218/IJCET_16_01_027.
[10] A. O. Adeniyi, J. O. Arowoogun, R. Chidi, C. A. Okolo, and O.
Babawarun, “The impact of electronic health records on patient care
and outcomes: A comprehensive review,” World J. Adv. Res. Rev., vol.
21, no. 2, pp. 1446–1455, 2024, Doi: 10.30574/wjarr.2024.21.2.0592.
[11] R. Tertulino, N. Ivaki, and H. Morais, “Design a Software Reference
Architecture to Enhance Privacy and Security in Electronic Health
Records,” IEEE Access, vol. 12, no. 4, pp. 1–23, 2024, Doi:
10.1109/ACCESS.2024.3441751.
[12] G. Tsang, S.-M. Zhou, and X. Xie, “Modeling large sparse data for
feature selection: hospital admission predictions of the dementia
patients using primary care electronic health records,” IEEE J. Transl.
Eng. Heal. Med., vol. 9, no. 2, pp. 1–13, 2020, Doi:
10.1109/JTEHM.2020.3040236.
[13] T. I. Amosa, L. I. B. Izhar, P. Sebastian, I. B. Ismail, O. Ibrahim, and S.
L. Ayinla, “Clinical errors from acronym use in electronic health
record: A review of NLP-based disambiguation techniques,” IEEE
Access, vol. 11, no. 5, pp. 59297–59316, 2023, Doi:
10.1109/ACCESS.2023.3284682.
[14] A. Kumar, N. Aggarwal, U. Vasisht, L. Aggarwal, S. Alam, and P.
Goswami, “Patient-mediated Health Data Exchange using
Blockchain,” in 2023 5th International Conference on Advances in
Computing, Communication Control and Networking (ICAC3N),
IEEE, 2023, pp. 1510–1515. Doi: 10.1109/CSCI51800.2020.00161.
[15] R. Ekawati, Y. Arkeman, S. Suprihatin, and T. C. Sunarti,
“Implementation of ethereum blockchain on transaction recording of
white sugar supply chain data,” Indones. J. Electr. Eng. Comput. Sci.,
vol. 29, no. 1, pp. 396–403, 2023, Doi: 10.11591/ijeecs.v29.i1.pp396403.
[16] G. Shilpi, K. Rajesh Kumar, K. Naveen, and V. Anshul, “Effective
Tools and Technologies for IoT and Blockchain-Based Remote Patient
Monitoring: A Comparative Analysis,” SN Comput. Sci., vol. 4, no. 6,
p. 844, 2023.
[17] H. Kumar, R. K. Kaushal, N. Kumar, and A. Verma, “An Analytical
Study on the Efficacy of Blockchain Frameworks for Student
Grievance Management,” SN Comput. Sci., vol. 5, no. 8, pp. 1071–
1093, 2024, Doi: https://doi.org/10.1007/s42979-024-03378-z.

REFERENCES
[1]

[2]

[3]

[4]

[5]

[6]

Y. Singh, M. A. Jabbar, S. Kumar Shandilya, O. Vovk, and Y. Hnatiuk,
“Exploring applications of blockchain in healthcare: road map and
future directions,” Front. Public Heal., vol. 11, p. 1229386, 2023, Doi:
10.3389/fpubh.2023.1229386.
S. Zeba, P. Suman, and K. Tyagi, “Types of blockchain,” in Distributed
Computing to Blockchain, Elsevier, 2023, pp. 55–68. Doi:
10.1016/B978-0-323-96146-2.00003-6.
R. Rastogi, R. Jain, P. Mishra, and M. Shahjahan, “Healthcare Records
Maintenance in Smart Cities for Healthcare 4.0: An Approach with
Blockchain,” Blockchain‐Enabled Solut. Pharm. Ind., no. 4, pp. 59–80,
2025, Doi: 10.4018/979-8-3693-2109-6.ch010.
S. Nakamoto, “Bitcoin: A Peer-to-Peer Electronic Cash System,”
Cryptogr. Mail. List https//metzdowd.com, 2008, [Online]. Available:
http://www.bitcoin.org/bitcoin.pdf
H. Naser Alsuqaih, W. Hamdan, H. Elmessiry, and H. Abulkasim, “An
efficient privacy-preserving control mechanism based on blockchain
for E-health applications,” Alexandria Eng. J., vol. 73, pp. 159–172,
2023, Doi: 10.1016/j.aej.2023.04.037.
R. Jafri and S. Singh, “Blockchain applications for the healthcare
sector: Uses beyond Bitcoin,” Blockchain Appl. Healthc. Informatics
beyond 5G, pp. 71–92, 2022, Doi: 10.1016/B978-0-323-906159.00022-0.

6
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:31 UTC from IEEE Xplore. Restrictions apply.
