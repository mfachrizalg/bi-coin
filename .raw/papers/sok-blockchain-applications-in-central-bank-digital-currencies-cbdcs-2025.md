---
source_type: pdf
title: "SoK: Blockchain Applications in Central Bank Digital Currencies (CBDCs)"
original_file: "thesis/reference/SoK_Blockchain_Applications_in_Central_Bank_Digital_Currencies_CBDCs.pdf"
sha256: "e808fa79cb57e028713efc6b57dea4ac8abde08683b47989f3b6abb9997a394e"
page_count: 8
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: SoK: Blockchain Applications in Central Bank Digital Currencies (CBDCs)

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2025 7th International Conference on Blockchain Computing and Applications (BCCA)

2025 7th International Conference on Blockchain Computing and Applications (BCCA) | 979-8-3315-0296-6/25/$31.00 ©2025 IEEE | DOI: 10.1109/BCCA66705.2025.11229667

SoK: Blockchain Applications in Central Bank
Digital Currencies (CBDCs)
Vijak Sethaput, Supachate Innet
College of Engineering
University of Thai Chamber of
Commerce (UTCC)
Bangkok, Thailand
vsethaput@gmail.com,
supachate_inn@utcc.ac.th

Abstract—The rise of Central Bank Digital Currencies
(CBDCs) or digital forms of central bank money represents a
transformative shift in the global financial landscape, aiming to
enhance financial inclusion, reduce transaction costs, and
improve payment efficiency. While blockchain technology has
been proposed as a foundational infrastructure for CBDCs, its
suitability remains debatable. This paper provides a
Systematization of Knowledge (SoK) on the application of
blockchain in CBDCs, analyzing their potential benefits and
challenges. We examine key aspects, including scalability,
security, privacy, interoperability, environmental sustainability,
offline
functionality,
regulatory
considerations,
and
architecture design. To ground our analysis in practice, we
review several real-world CBDC initiatives, including China's eCNY, the Bahamas' Sand Dollar, Nigeria’s eNaira, the
European Central Bank's digital euro initiative, Sweden’s eKrona, BIS’s CBDC projects, and Thailand’s CBDC journey.
Finally, we highlight research challenges and future directions,
including post-quantum cryptography for enhanced security,
zero-knowledge proofs for preserving privacy, and AI-driven
compliance automation. This study offers a comprehensive
knowledge base for policymakers, researchers, and financial
institutions to explore the blockchain-based CBDCs.
Keywords—FinTech, Central Bank Digital Currency (CBDC),
Blockchain Applications in FinTech, Digital Currencies

I.

INTRODUCTION

The rapid evolution of digital payment systems has
sparked global interest in Central Bank Digital Currencies
(CBDCs), which are digital representations of a central bank’s
money or a country’s physical cash. As traditional financial
infrastructures face challenges such as high transaction costs,
inefficiencies in cross-border payments, and the growing
demand for financial inclusion, central banks are actively
exploring CBDCs to modernize the monetary system.
According to the Bank for International Settlements (BIS) [1],
over 90% of central banks are researching or developing
CBDCs, reflecting the increasing significance of digital
currencies in the financial ecosystem.
Blockchain technology has been widely proposed as a
potential foundation for CBDC implementations due to its
decentralized ledger structure, cryptographic security, and
programmability through smart contracts. However, its
suitability for national-scale financial systems remains a
subject of ongoing debate. While it offers enhanced security,
traceability, and programmability benefits, it also presents
significant challenges, including scalability limitations, high
energy consumption, and complex regulatory compliance.
Consequently, central banks must carefully and critically
assess whether blockchain-based architectures align with their
broader economic goals, policy objectives, and mandates.

A. Methodology
Our methodology consists of four key phases: scope
definition, data collection, analysis, and comparative studies.
a) Scope Definition: We define the scope of this
Systematization of Knowledge (SoK) as blockchain-enabled,
CBDC initiatives globally, including both wholesale and retail
use cases.
b) Data Collection: This SoK is based on an extensive
and diverse set of sources, including official publications from
central banks, technical white papers, peer-reviewed academic
literature, and reports from international financial institutions
such as the BIS, the International Monetary Fund (IMF), and
the World Bank. The study also incorporates findings from
pilot projects and prototypes, providing many insights from
practical implementations. We conducted a systematic
literature review and a comprehensive survey of CBDC
initiatives. The primary sources for this review included
official central bank websites and CBDC research portals,
such as the CBDCTracker [2]. Academic references were
drawn from reputable databases, including IEEE Xplore [3],
ACM Digital Library [4], SSRN [5], ScienceDirect [6], and
Google Scholar [7]. In addition, we reviewed reports from the
BIS Innovation Hub [8] and related CBDC initiatives, as well
as industry reports published by leading consulting and
financial technology firms.
c) Analysis: We then analyze our data and examine the
different design models of CBDCs—retail vs. wholesale—
and assess how blockchain-based architectures compare to
alternative centralized solutions. We present our analysis in
Section 3, Design Considerations and Challenges.
d) Comparative Studies: We then examine real-world
CBDC implementations to assess the practical feasibility of
blockchain integration. Notable examples include China’s eCNY, the earliest large-scale CBDC initiatives; the Bahamas’
Sand Dollar and Nigeria’s e-Naira, which are among the first
retail CBDCs for public use; the European Central Bank’s
Digital Euro project and Sweden’s e-Krona, which reflect an
evolving approach to retail CBDCs in advanced economies.
We also analyze BIS Innovation Hub’s various CBDC
initiatives, which have significantly advanced the field,
particularly in addressing emerging challenges such as crossborder interoperability and the implications of quantum
computing. Additionally, we draw on first-hand insights from
Thailand’s CBDC journey to ground the discussion in
practical central banking experience.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 03:57:48 UTC from IEEE Xplore. Restrictions apply.

979-8-3315-0296-6/25/$31.00 ©2025 IEEE

195

## Page 2

2025 7th International Conference on Blockchain Computing and Applications (BCCA)

B. Contributions
This study provides several key contributions to
understanding blockchain-based CBDCs. It offers a
comprehensive analysis of the factors that influence the
application of blockchain technology in the development of
CBDCs, examining its benefits, challenges, and regulatory
considerations.
Furthermore, this study includes a review of real-world
CBDC initiatives, an analysis of existing projects to assess the
role of blockchain in their design choices, and the
identification of lessons learned from early adopters. Lastly, it
highlights future research directions, addressing critical
challenges and exploring emerging technologies such as ZeroKnowledge Proofs (ZKPs) [9] for privacy preservation, postquantum cryptography (PQC) [10] for enhanced security [11],
and AI-driven compliance mechanisms [12] to ensure
efficient and secure CBDCs [13]. These contributions provide
valuable insights for policymakers, researchers, and financial
institutions as they explore the evolving landscape of
blockchain-based digital currencies.
The rest of this paper is structured as follows: Section 2
presents background on CBDCs and blockchain technology.
Section 3 explores key design considerations and technical
challenges associated with blockchain-based CBDC systems.
Section 4 reviews real-world CBDC initiatives, highlights
lessons learned, and provides an outlook for the future of
CBDCs. Section 5 identifies future research and potential
topics for further exploration. Section 6 concludes the paper
with key insights.
II.

BACKGROUND ON CBDCS & BLOCKCHAIN

A. Understanding CBDC
CBDCs [14] are digital forms of sovereign money issued
and regulated by central banks, designed to function within the
existing financial and regulatory framework. In contrast to
cryptocurrencies such as Bitcoin, which function on
decentralized and permissionless networks, CBDCs are
centrally managed, ensuring greater regulatory oversight and
stability. The primary motivations behind the development of
CBDCs include fostering financial inclusion, reducing
transaction costs, improving the efficiency of cross-border
payments, and enhancing the transmission mechanisms of
monetary policy.
CBDCs are generally classified into two categories: retail
and wholesale. Retail CBDCs are for use by the general public
and serve as a digital equivalent to physical cash, facilitating
transactions while providing a secure, efficient, and costeffective alternative to both conventional cash and privatesector digital payment systems. In contrast, Wholesale
CBDCs are restricted to financial institutions. They are
designed to improve interbank settlements and cross-border
transactions, thereby improving the efficiency, security, and
transparency of large-value payments within the financial
system.
Several central banks have already launched CBDC
projects or pilots to explore their potential applications. These
CBDC projects underscore the growing global interest in
CBDCs and their potential to transform the future of digital
finance.

B. Blockchain Technology
Blockchain is a form of distributed ledger technology
(DLT) that enables secure and immutable record-keeping
through cryptographic validation. It operates on a
decentralized
structure,
allowing
consensus-driven
transaction verification without the need for a centralized
intermediary. The core components of blockchain technology
include a distributed ledger that is replicated and synchronized
across multiple nodes, enhancing system resilience and
mitigating the risk associated with single points of failure.
Additionally, consensus mechanisms such as Proof of Work
(PoW) [15], Proof of Stake (PoS) [16], and Byzantine Fault
Tolerance (BFT) [17] are instrumental in verifying
transactions and maintaining network integrity. Smart
contracts and self-executing agreements enhance blockchain
functionality by automating financial transactions and
regulatory compliance. Security is reinforced through the
applications of cryptographic techniques, including hashing
algorithms, digital signatures, and encryption schemes, which
protect data integrity, confidentiality, and authenticity.
Blockchain networks are generally classified into three
primary types: public, private, and consortium. Public or
permissionless blockchains (e.g., Bitcoin [15] and Ethereum)
are decentralized and permissionless, allowing anyone to
participate; however, they encounter challenges related to
scalability and regulatory compliance. In contrast, private or
permissioned blockchains (e.g., Hyperledger Fabric [18],
Corda [19]) are restricted to authorized participants, providing
greater control, scalability, and regulatory compliance for
enterprise and institutional use. Consortium blockchains [20]
are governed by a group of entities, offering a balance between
decentralization, efficiency, and regulatory oversight. These
different blockchain models enable various financial,
commercial, and institutional applications, making blockchain
a versatile technology for managing digital assets and
facilitating secure transactions.
III.

DESIGN CONSIDERATIONS & CHALLENGES

The design of CBDCs necessitates a calibrated approach
that strikes a balance between technological efficiency and
security, on the one hand, and regulatory compliance and the
imperative to safeguard financial stability, on the other. While
blockchain technology offers significant advantages, its
integration into a national digital currency system comes with
various challenges. This section examines the key design
considerations and trade-offs central banks must evaluate
when implementing blockchain-based CBDCs.
A. Scalability and Performance
CBDCs must be able to process transaction volumes
comparable to those of traditional financial infrastructures;
however, achieving such scalability remains a challenge,
particularly for public blockchain networks. A significant
concern is throughput limitations, as Ethereum and Bitcoin
process only 15–50 transactions per second (TPS). In contrast,
traditional payment systems such as Visa can handle over
65,000 TPS [21]. Additionally, latency issues arise because
the consensus mechanisms required for transaction validation
lead to delays in transaction finalization.
To overcome these limitations, Layer-2 scaling solutions
[22] such as state channels or rollups, and sharding [23]
improve scalability but introduce implementation
complexities. One approach for CBDCs is to adopt
permissioned blockchain models with high-throughput

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 03:57:48 UTC from IEEE Xplore. Restrictions apply.

196

## Page 3

2025 7th International Conference on Blockchain Computing and Applications (BCCA)

consensus mechanisms, such as Practical Byzantine Fault
Tolerance (PBFT) [24] or Proof-of-Authority (PoA) [25].
Another solution involves off-chain transaction processing for
low-value payments while keeping high-value transactions
on-chain to optimize efficiency. A hybrid architecture could
also be implemented, where blockchain serves as a settlement
layer while real-time retail transactions are processed through
traditional financial infrastructure. By integrating these
solutions, CBDCs can enhance scalability, reduce transaction
latency, and maintain seamless payment efficiency.
B. Security and Cyber Resilience
While blockchain technology enhances security through
cryptographic techniques, new risks emerge. Poorly designed
smart contracts present security vulnerabilities that can be
exploited by malicious actors, potentially leading to breaches
[26]. Future advancements may enable quantum computers to
break existing cryptographic security mechanisms used in
blockchain systems [27].
Adopting quantum-resistant cryptographic algorithms will
help ensure future-proof security against quantum attacks
[28]. Using multi-signature wallets and hardware security
modules (HSMs) can also improve key management, reducing
the risk of unauthorized access. Regular smart contract audits
are essential for identifying and mitigating potential exploits,
thereby strengthening the security infrastructure of CBDCs.
By integrating these security measures, blockchain-based
CBDCs can maintain resilience against evolving cyber threats
while ensuring secure and reliable digital financial
transactions.
C. Privacy vs. Transparency Trade-Off
CBDC must strike a balance between user financial
privacy and regulatory oversight to ensure compliance. A
fully transparent ledger could expose users’ financial data,
while excessive privacy might enable illicit activities. One of
the main challenges is regulatory compliance, as CBDCs must
adhere to Anti-Money Laundering (AML), CounterTerrorism Financing (CFT), and Know Your Customer
(KYC) requirements. Additionally, user privacy concerns
arise, particularly in public blockchain-based CBDCs, where
transaction details could potentially be exposed to third
parties. Moreover, a fully centralized ledger presents risks of
excessive government surveillance, raising concerns about
financial monitoring and individual freedoms.
Zero-knowledge proofs (ZKPs) [9] offer a mechanism for
selective disclosure, ensuring that transaction details remain
private while allowing verification when necessary. Privacypreserving ledger models, such as hybrid architectures that
store sensitive transaction data off-chain, can help protect user
information. Additionally, role-based access controls can be
introduced, allowing regulators to audit transactions only
when legally required, thus maintaining compliance and
financial privacy.
D. Interoperability and Cross-Border Transactions
One of the key advantages of CBDC is its potential to
enhance cross-border payments. However, achieving
seamless interoperability presents significant challenges.
Different nations may adopt varying CBDC architectures,
making it difficult for their systems to communicate and
operate together. Regulatory conflicts also pose a hurdle, as
financial regulations differ across jurisdictions, complicating
compliance and transaction execution. Additionally, foreign

exchange (FX) settlement issues arise, as real-time currency
conversion between CBDCs requires integration with forex
markets to ensure smooth transactions.
Interoperability protocols, such as the ISO 20022 standard
[29], can help standardize cross-border CBDC transactions,
making them more efficient. Decentralized identity standards
can ensure regulatory compliance across different
jurisdictions while maintaining security and privacy.
Furthermore, smart contract-based FX settlement mechanisms
can automate and streamline currency conversions, reducing
inefficiencies and enhancing the speed of international
transactions.
E. Energy Efficient and Environmental Impact
Blockchain’s energy consumption is a significant concern,
particularly for proof-of-work (PoW) systems, which require
substantial computational power. While CBDCs need a secure
and reliable infrastructure, they must also align with
environmental sustainability goals. One major challenge is
that PoW-based blockchains, such as Bitcoin, consume large
amounts of energy, making them impractical for CBDC
implementation. Additionally, large-scale blockchain
networks have a significant carbon footprint, raising concerns
about their sustainability. Furthermore, evolving regulations
may require CBDCs to adopt energy-efficient mechanisms to
comply with environmental standards.
Utilizing energy-efficient consensus mechanisms such as
Proof-of-Stake (PoS), Proof-of-Authority (PoA), or Delegated
Byzantine Fault Tolerance (dBFT) [17] can significantly
reduce energy consumption. Additionally, developing carbonneutral blockchain solutions can ensure that CBDCs are
deployed sustainably. Another approach is incorporating offchain settlement mechanisms, which can minimize the
processing load on blockchain networks while maintaining
transaction security and efficiency.
F. Offline Transactions and Financial Inclusion
CBDCs must be designed to ensure accessibility for
populations in regions with limited internet connectivity.
Blockchain-based CBDCs should support offline transactions
to remain functional in areas with unreliable networks,
enabling seamless payments even without continuous online
access. Additionally, they should promote financial inclusion
by allowing unbanked populations to use digital currency
without requiring traditional banking infrastructure.
Hardware-based CBDC wallets, which facilitate peer-topeer transactions via Bluetooth or NFC, can enable offline
payments without an internet connection. Lightweight
blockchain nodes can be developed to operate efficiently in
low-bandwidth environments, reducing the dependency on
extensive network infrastructure. Moreover, hybrid offline
mechanisms, such as temporary ledger synchronization once
connectivity is restored, can ensure transaction security and
continuity while supporting efforts to promote financial
inclusion.
G. Regulatory and Governance Considerations
The legal and regulatory frameworks for CBDCs are still
evolving, necessitating that blockchain-based CBDCs align
with existing laws and financial policies. Key considerations
include the legal status of digital currency, which determines
how CBDCs are classified under financial regulations.
Additionally, data sovereignty and governance must be
addressed to manage cross-border data-sharing requirements

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 03:57:48 UTC from IEEE Xplore. Restrictions apply.

197

## Page 4

2025 7th International Conference on Blockchain Computing and Applications (BCCA)

effectively. Another crucial aspect is operational governance,
which involves deciding whether CBDCs should be fully
controlled by central banks or involve commercial banks as
intermediaries.

concerns in other countries. Despite these challenges, the eCNY represents an essential step in the evolution of digital
currencies, influencing the international discourse on CBDCs
and their potential impact on financial ecosystems.

Several solutions can be implemented to navigate these
challenges. Establishing clear legal frameworks for the
issuance and distribution of CBDCs will provide regulatory
certainty and guide the adoption by financial institutions.
Implementing role-based governance structures can help
manage blockchain-based CBDCs efficiently while ensuring
compliance
with
financial
policies.
Furthermore,
collaboration with international regulatory bodies will be
essential to harmonize compliance standards across
jurisdictions and facilitate seamless cross-border transactions.

B. Bahamas – Sand Dollar
The Bahamas introduced Sand Dollar [32] in 2020 as the
world's first fully operational CBDC to enhance financial
inclusion across its 700 islands. Built on a private,
permissioned blockchain managed by the Central Bank of the
Bahamas, it utilizes a token-based system that facilitates
seamless transfers of Sand Dollar between users and
merchants. Additionally, it incorporates identity-based wallet
tiers to ensure compliance with Anti-Money Laundering
(AML) and Know Your Customer (KYC) regulations.

H. Centralized vs. Decentralized CBDC Architectures
CBDCs can be implemented using centralized or
decentralized architectures, each with distinct trade-offs:

Key features of the Sand Dollar include improved access
to financial services for unbanked citizens, a mobile wallet
system that reduces dependence on physical banking
infrastructure, and blockchain-based security measures that
prevent counterfeiting and unauthorized transactions.
However, challenges persist, such as limited cross-border
interoperability, as the currency remains primarily for
domestic use; reliance on internet connectivity, despite
ongoing efforts to enable offline transactions; and a slow
adoption rate among local businesses and citizens.

TABLE I.

CENTRALIZED VS. DECENTRALIZED CBDC ARCHITECTURE

Feature

Centralized

Scalability

High

Moderate

Lower (single point of
failure)
Limited (government
control)

Higher (decentralized
Validation)
Enhanced (privacypreserving techniques)
More complex due to
decentralization
More resilient with
distributed nodes

Security
Privacy
Regulatory
Compliance

Easier

Resilience

Vulnerable to cyber attacks

Blockchain-Based CBDC

Many central banks are exploring hybrid models that
combine centralized control with the benefits of blockchain
technology, enabling greater security while maintaining
regulatory oversight [30].
IV.

CASE STUDIES & REAL-WORLD IMPLEMENTATIONS

As central banks worldwide explore CBDC, several
nations have already launched pilot programs or fully
implemented blockchain-based digital currencies. This
section examines key case studies of CBDC implementations.
A. China – Digital Yuan (e-CNY)
China’s Digital Yuan (e-CNY) [31] is one of the most
advanced CBDCs globally, developed by the People’s Bank
of China (PBOC) to enhance domestic digital payments and
compete with private-sector alternatives, including Alipay and
WeChat Pay. While the e-CNY does not entirely rely on
blockchain technology, it incorporates Distributed Ledger
Technology (DLT) in its settlement layers. It operates under a
two-tier system, where the PBOC issues the digital currency
while commercial banks manage its distribution. The system
features controlled anonymity, allowing the government to
trace transactions while providing limited user privacy.
Key functionalities of the e-CNY include offline
transactions
using
NFC-based
mobile
payments,
programmability through smart contract-like features for
conditional payments, and high scalability, which enables it to
handle millions of transactions through a centralized
infrastructure. However, challenges persist, including privacy
concerns stemming from government oversight, the limited
adoption of blockchain, which leads to centralization, and
uncertainty regarding global acceptance due to regulatory

C. Nigeria – eNaira
Launched in October 2021. The eNaira [33] became
Africa’s first Central Bank Digital Currency (CBDC), aiming
to enhance digital payments and reduce reliance on cash in
Nigeria. Built on Hyperledger Fabric, a private, permissioned
blockchain, the eNaira operates under the centralized control
of the Central Bank of Nigeria (CBN). It features a tiered
wallet system with varying Know Your Customer (KYC)
compliance requirements.
The eNaira offers several advantages, including
interoperability with existing banking infrastructure and
mobile payment systems, lower transaction fees than
traditional banking services, and the potential for cross-border
trade integration with other African economies. However, its
adoption faces challenges, including public skepticism
regarding government control over digital currency, limited
usage among businesses and consumers who still prefer cash
or mobile banking alternatives, and infrastructure limitations,
particularly in rural areas with low internet access.
D. European Central Bank – Digital Euro (Pilot Stage)
The European Central Bank (ECB) is actively researching
the Digital Euro [34], conducting pilot projects to explore
potential blockchain applications for a secure and efficient
digital payment system. The initiative is exploring a hybrid
model that combines blockchain features with centralized
infrastructure, striking a balance between innovation and
regulatory oversight. As part of its research, the ECB is
evaluating Zero-Knowledge Proofs (ZKPs) to enhance
transaction privacy and is considering the use of smart
contracts for automated compliance and programmable
payments.
The Digital Euro aims to offer seamless cross-border
transactions within the EU, leveraging interoperability as a
core feature. Additionally, privacy-enhancing technologies
are being tested to ensure user data protection, while
scalability and security are being addressed by combining
blockchain with traditional financial networks. However,

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 03:57:48 UTC from IEEE Xplore. Restrictions apply.

198

## Page 5

2025 7th International Conference on Blockchain Computing and Applications (BCCA)

challenges remain, including legal and regulatory
uncertainties across EU member states, coordination among
commercial banks and payment providers, and public
concerns over potential government surveillance in digital
transactions.
E. Sweden – e-Krona (Pilot Stage)
Sweden’s e-Krona project [35] is designed to address the
decline in cash usage and ensure the availability of a stable,
government-backed digital currency. Initial trials utilized R3
Corda, a permissioned Distributed Ledger Technology
(DLT)-based blockchain, as a foundation for secure
transactions. The project also explores offline transaction
capabilities to support areas with limited internet access. It
works closely with commercial banks to integrate the e-Krona
into Sweden’s payment infrastructure.
It aims to enhance financial inclusion in an increasingly
cashless society. It has the potential to enable programmable
payments through smart contract-like functionalities.
Additionally, regulatory compliance mechanisms are
embedded within the system to ensure security and
transparency. However, challenges persist, as the project
remains in the experimental phase with no official launch date.
Strong coordination between financial institutions is
necessary for the successful implementation. Potential
resistance from commercial banks may arise due to concerns
about losing control over payment processing.
F. BIS Innovation Hub Projects on CBDC
BIS has led multiple initiatives to advance the
development and adoption of CBDC [8], exploring their
potential for retail, wholesale, and cross-border applications.
The following are concluded projects.
Project mBridge [36] reached the minimum viable product
(MVP) stage in mid-2024, marking a significant milestone in
its mission to enhance cross-border CBDC settlements.
Project Tourbillon [37], led by the BIS Innovation Hub's
Swiss Centre, focuses on cyber resiliency, scalability, and
privacy. It demonstrates cash-like anonymity in retail CBDC
transactions.
Project Mariana [38] is a collaboration between the BIS
Innovation Hub, the Bank of France (Eurosystem), the
Monetary Authority of Singapore, and the Swiss National
Bank, exploring automated market-makers (AMMs) for the
cross-border exchange of wholesale CBDCs in Swiss francs,
euros, and Singapore dollars to facilitate efficient foreign
exchange settlements in financial markets.
Retail CBDC innovations are explored through Project
Sela [39], a joint experiment by the BIS, the Hong Kong
Monetary Authority, and the Bank of Israel, which has
demonstrated that retail CBDCs (rCBDCs) can maintain
accessibility, enhance competition, and ensure cybersecurity
while retaining key attributes of physical cash. Similarly,
Project Rosalind [40] aims to develop application
programming interface (API) prototypes to improve publicprivate collaboration, enhance interoperability, and ensure
retail CBDCs meet evolving consumer payment needs.
Another initiative, Project Icebreaker [41], concluded its
experiment on a new architectural framework for cross-border
retail CBDCs, laying the groundwork for further research in
international digital payments.

For wholesale CBDC applications, Project Dunbar [42]
investigates how a multi-CBDC platform could facilitate
cheaper, faster, and safer international settlements, identifying
challenges and proposing practical design approaches for a
shared platform among central banks. Additionally, Project
Helvetia [43] examines the settlement of tokenized assets
using central bank money, particularly in a future where
financial infrastructures operate on distributed ledger
technology (DLT). Project Jura [44] extends this research by
focusing on the cross-border settlement of tokenized assets
between financial institutions using wholesale CBDCs
(wCBDCs) on a DLT-based platform.
Lastly, the Project Aurum [45], a collaboration between
the BIS Innovation Hub and the Hong Kong Monetary
Authority, has successfully developed a two-tier retail CBDC
prototype, a foundational model for secure, efficient, and
scalable digital currency issuance. These projects collectively
represent a comprehensive effort by BIS and global central
banks to refine CBDC architectures, ensuring they meet the
demands of modern financial ecosystems while addressing
critical challenges related to privacy, security, scalability, and
interoperability.
BIS has continued to launch several innovative ongoing
projects to explore and enhance the functionality of CBDC,
focusing on cross-border payments, privacy, compliance, and
security as follows:
Project Rialto [46] aims to enhance instant cross-border
payments by integrating a modular foreign exchange (FX)
component with tokenized wholesale central bank money
settlement, facilitating faster and more efficient international
transactions.
Project Aurum 2.0 [47] enhances privacy in retail CBDC
payments. This initiative, a collaboration between the BIS
Innovation Hub's Hong Kong Centre and the Hong Kong
Monetary Authority, builds upon the existing Aurum
prototype to develop privacy-preserving digital transition
technologies.
Project Mandala [48] focuses on cross-border payment
compliance, exploring how jurisdiction-specific policy and
regulatory requirements can be encoded into a standard
protocol. This initiative aims to streamline foreign direct
investment, borrowing, and payment transactions, ensuring
regulatory compliance while maintaining efficiency.
Project Polaris [49], led by the BIS Innovation Hub Nordic
Centre, investigates the security and resilience of CBDC
systems for both online and offline payments. The project has
produced a comprehensive handbook detailing key aspects of
offline transactions, a CBDC security and resilience
framework, and a threat modeling paper to address potential
vulnerabilities in digital currency systems. Collectively, these
projects demonstrate BIS's commitment to leveraging
emerging technologies to enhance the functionality, security,
and regulatory compliance of CBDCs, ultimately shaping the
future of digital finance.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 03:57:48 UTC from IEEE Xplore. Restrictions apply.

199

## Page 6

2025 7th International Conference on Blockchain Computing and Applications (BCCA)

G. Thailand CBDC Journey
Thailand's CBDC journey [50] has progressed in multiple
phases, beginning with Project Inthanon, which was launched
in August 2018 to explore a DLT-based RTGS (Real-Time
Gross Settlement System). This phase focused on developing
a prototype of a decentralized RTGS system with key
functionalities such as cash and bond tokenization, bilateral
transfers, queuing mechanisms, gridlock resolution, and
automated liquidity provision. By January 2019, the project
[51] had expanded to investigate the use of smart contracts,
enabling bond life-cycle management (including interbank
bond trading and repo), fraud prevention for third-party fund
transfers, and compliance with non-resident regulations. In
June 2019, the initiative advanced further by implementing
cross-border fund transfers and enhancing international
transaction capabilities with Hong Kong [52].
By March 2021, Thailand had launched a collaboration
between the Bank of Thailand (BOT), SCG, and Digital
Ventures Company Limited (DV), with technological support
from Consensys, which explored how CBDCs could be used
in the business sector. In August 2021, BOT further
researched the implications of retail CBDCs on the Thai
financial sector. In March 2024, Project Bang Khun Phrom
summarized the findings of the Retail CBDC Pilot Program,
assessing core functionalities (Foundation Track) and
financial innovation applications (Innovation Track). [53]
Parallel to this, Thailand joined Project mBridge [36] in
September 2021, a multi-CBDC platform that supports realtime, peer-to-peer, cross-border payments and foreign
exchange transactions using CBDCs. The initiative continued
to develop and reached the minimum viable product stage in
2024 [54].
H. Comparative Summary of CBDC Implementations
TABLE II.
Country

COMPARATIVE SUMMARY OF CBDC IMPLEMENTATIONS
Blockchain
Type

Status

China
(e-CNY)

Hybrid
(Limited
DLT)

Pilot

Bahamas
(Sand
Dollar)

Permissioned
Blockchain

Fully
Launched

Nigeria
(eNaira)

Hyperledger
(Private)

Fully
Launched

EU
(Digital
Euro)

Hybrid (DLT
+
Centralized)

Pilot

Sweden
(eKrona)

R3 Corda

Pilot

Key Features

Challenges

Offline
transactions,
controlled
anonymity,
scalability
Financial
inclusion,
mobile
wallets,
security
Mobile
banking
integration,
tiered access
Privacyfocused,
cross-border
payments
Cash
alternative,

Privacy
concerns,
limited global
adoption

programmable

BIS

Various DLT

1 MVP

Thailand

R3 Corda +
DLT

Pilot

payments
Various
Features
DLT RTGS,
Smart
Contracts,
Cross Border,
Retail CBDC

Limited
cross-border
use, slow
adoption
Trust issues,
rural
accessibility
Regulatory
complexity,
public
skepticism
Bank
resistance,
infrastructure
challenges
Various
mBridge
MVP,
Retail CBDC

I. Lessons Learned from CBDC Implementations
The adoption of blockchain-based CBDCs varies globally
and is shaped by each country’s economic, regulatory, and
technological context. Nations such as China and the
European Union have implemented hybrid models that
combine centralized systems with distributed ledger
technologies to ensure scalability and compliance with
regulations. In contrast, countries such as Nigeria and the
Bahamas rely on permissioned blockchains to enhance
security and government control. Financial inclusion drives
adoption in emerging markets, where mobile digital wallets
expand access to underserved populations. In developed
economies such as Sweden and the EU, CBDCs are designed
to replace cash and streamline digital payments. However,
privacy and oversight remain key concerns: China emphasizes
traceability, while the EU explores privacy-preserving tools,
such as Zero-Knowledge Proofs. Adoption barriers—public
distrust, limited merchant adoption, and unresolved crossborder interoperability — continue to challenge the
widespread rollout. Addressing these issues will be pivotal for
mainstream CBDC integration.
J. Future Outlook for Blockchain-Based CBDCs
As more countries explore CBDC, the role of blockchain
is expected to expand in several key areas. Cross-border
interoperability will improve through the development of
standardized frameworks, enabling seamless international
CBDC transactions and reducing inefficiencies in global trade
and remittances. Another critical advancement will be the
expansion of smart contract capabilities, allowing CBDCs to
support programmable money, which could automate
financial policies, taxation, and conditional payments, further
increasing efficiency in the digital economy.
V. FUTURE RESEARCH
As blockchain-based CBDCs continue to evolve, several
critical research areas remain open to ensure their secure,
scalable, and inclusive deployment. Multiple central banks
collaborated to produce the report [55], which aims to advance
international efforts by defining common principles and
identifying the key features that a CBDC and its supporting
infrastructure should possess to support central bank public
policy objectives effectively. They subsequently published the
report [56] that focuses on the system design aspect of
CBDCs.
Scalability and performance are also major challenges.
Current CBDCs struggle with transaction speed and
throughput, prompting research into Layer-2 solutions,
sharding, and consensus mechanism optimizations, such as
Proof-of-Stake (PoS) and Delegated Byzantine Fault
Tolerance (dBFT), to achieve national-scale efficiency.
Future CBDCs are expected to implement hybrid
architectures that integrate blockchain efficiency with
centralized
control,
leveraging
privacy-enhancing
technologies like ZKPs and MPC to ensure both
confidentiality and regulatory compliance.
Interoperability, especially cross-border, is vital for
CBDCs, with ongoing research emphasizing standards such as
ISO 20022 and multi-CBDC bridges, alongside emerging
technologies like tokenization, Decentralized Identity (DID),
and programmable FX settlement, to facilitate seamless
international transactions.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 03:57:48 UTC from IEEE Xplore. Restrictions apply.

200

## Page 7

2025 7th International Conference on Blockchain Computing and Applications (BCCA)

Ensuring smart contract security is essential to prevent
financial risks, with formal verification and secure multi-party
computation playing important roles in the safe deployment of
programmable monetary functions.

permissioned, permissionless, or hybrid—tailored to their
specific policy and technological needs. The long-term
success of CBDCs depends on thoughtful design,
technological innovation, and international collaboration.

Quantum computing poses a significant threat to
traditional cryptographic algorithms, potentially invalidating
the foundational security assumptions underlying current
digital infrastructures. Post-quantum cryptographic methods,
including lattice- and hash-based schemes, are being actively
explored—alongside hybrid models—to ensure the long-term
security and resilience of CBDC systems against quantum
computing threats.

REFERENCES

AI and machine learning offer promising tools for fraud
detection, particularly in the areas of anti-money laundering
(AML) and Know Your Customer (KYC) compliance.
Federated learning can further enhance fraud prevention while
preserving privacy.
Ensuring financial inclusion via offline CBDC capabilities
is crucial, especially in low-connectivity areas. Research is
focused on Near Field Communication (NFC) offline wallets
[57], as well as secure hardware and resilient offline network
infrastructure.
Meanwhile, legal and regulatory frameworks must evolve
to accommodate CBDCs, including addressing issues of data
protection, smart contract enforceability, and governance
models that strike a balance between oversight and user rights.
Environmental sustainability is equally essential; lowenergy consensus mechanisms and carbon-neutral blockchain
models are being considered to minimize ecological impact.
Table III shows a summary of future research for CBDCs
TABLE III.

SUMMARY OF FUTURE RESEARCH

Research Area

Key Questions

Scalability
Solutions
Privacy-Preserving
CBDCs
Cross-Border
Interoperability
Smart Contract
Security
QuantumResistant
Cryptography
AI for Fraud
Detection
Offline
Transactions
Regulatory
Challenges
Environmental
Impact

What are the best blockchain scaling strategies
for CBDCs?
How to balance privacy with AML/KYC
compliance?
How can different CBDC frameworks
communicate effectively?
How to prevent vulnerabilities in CBDC smart
contracts?
How can blockchain-based CBDCs prepare for
quantum threats?
Can AI improve real-time fraud prevention in
CBDC transactions?
What are the best solutions for offline CBDC
payments?
How should CBDCs align with global financial
regulations?
What are the most sustainable blockchain
models for CBDCs?

VI. CONCLUSION
The evolution of CBDC signifies a significant shift in the
global monetary system, providing a secure, efficient, and
inclusive digital alternative to cash. Built on blockchain
infrastructure. CBDCs leverage decentralization and
transparency but must overcome key hurdles, including
scalability, security, privacy, regulatory compliance, and
energy sustainability. Countries like China, Nigeria, the
Bahamas, and the EU adopt different architectures—

[1]

Bank for International Settlements (BIS), "Embracing diversity,
advancing together - results of the 2023 BIS survey on central bank
digital currencies and crypto," Bank for International Settlements
(BIS), 2024.
[2] Central Bank Digital Currency (CBDC) Tracker, "Central Bank
Digital Currency (CBDC) Tracker," 2021. [Online]. Available:
https://cbdctracker.org/. [Accessed 1 7 2025].
[3] IEEE, "IEEE Xplore," 2025. [Online]. Available:
https://ieeexplore.ieee.org/Xplore/home.jsp. [Accessed 1 7 2025].
[4] Association for Computing Machinery (ACM), "ACM Digital
Library," 2025. [Online]. Available: https://dl.acm.org/. [Accessed 1 7
2025].
[5] Elsevier Inc., "Home :: SSRN," 2024. [Online]. Available:
https://www.ssrn.com/index.cfm/en/. [Accessed 1 7 2025].
[6] Elsevier B.V., "ScienceDirect.com | Science, health and medical
journals, full text articles and books.," 2025. [Online]. Available:
https://www.sciencedirect.com/. [Accessed 1 7 2025].
[7] Google, "Google Scholar," 2025. [Online]. Available:
https://scholar.google.com/. [Accessed 1 7 2025].
[8] Bank for International Settlements (BIS), "BIS Innovation Hub work
on central bank digital currency," 2021. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc.htm. [Accessed 15 3
2025].
[9] S. M. a. C. R. Shafi Goldwasser, "The knowledge complexity of
interactive proof systems," SIAM J. COMPUT, vol. 18, no. 1, pp.
186-208, 2 1989.
[10] E. J. C. A. A. A. B. K. T. Ritik Bavdekar, "Post Quantum
Cryptography: A Review of Techniques, Challenges and
Standardizations," in International Conference on Information
Networking (ICOIN), Bangkok, Thailand, 2023.
[11] BIS Innovation Hub Eurosystem Centre, the Bank of France and
Deutsche Bundesbank, "Project Leap - Quantum-proofing the
financial system," 6 2023. [Online]. Available:
https://www.bis.org/publ/othp67.pdf. [Accessed 30 6 2025].
[12] D. Talati, "Enhancing data security and regulatory compliance in AIdriven cloud ecosystems: Strategies for advanced information
governance," 1 7 2022. [Online]. Available:
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5198158.
[Accessed 1 7 2025].
[13] A. P. T. G. Arvinder Bharath, "Cyber Resilience of the Central Bank
Digital Currency Ecosystem," 27 8 2024. [Online]. Available:
https://www.imf.org/en/Publications/fintechnotes/Issues/2024/08/27/Cyber-Resilience-of-the-Central-BankDigital-Currency-Ecosystem-554090. [Accessed 1 7 2025].
[14] S. I. Vijak Sethaput, "Blockchain application for central bank digital
currencies (CBDC)," Cluster Computing, no. 26, pp. 2183-2197,
2023.
[15] S. Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System,"
2008. [Online]. Available: https://bitcoin.org/bitcoin.pdf. [Accessed
15 5 2020].
[16] S. Lin, "Proof of Work vs. Proof of Stake in Cryptocurrency," in
CMLAI 2023, San Francisco, USA, 2023.
[17] W. &. Y. C. &. L. W. &. C. J. &. C. L. &. L. J. &. X. N. Zhong,
"Byzantine Fault-Tolerant Consensus Algorithms: A Survey,"
Electronics, vol. 12, p. 3801, 2023.
[18] Linux Foundation, "Hyperledger Fabric," [Online]. Available:
https://www.hyperledger.org/use/fabric. [Accessed 15 5 2020].
[19] R3, "Corda Enterprise–a next-gen blockchain platform," R3, [Online].
Available: https://www.r3.com/corda-platform/. [Accessed 15 5
2020].
[20] ScienceDirect, "Consortium Blockchain - an overview | ScienceDirect
Topics," 2025. [Online]. Available:
https://www.sciencedirect.com/topics/computer-science/consortiumblockchain. [Accessed 1 7 2025].
[21] H. G. a. X. Yu, "A survey on blockchain technology and its security,"
Blockchain: Research and Applications, vol. 3, p. 100067, 2022.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 03:57:48 UTC from IEEE Xplore. Restrictions apply.

201

## Page 8

2025 7th International Conference on Blockchain Computing and Applications (BCCA)

[22] H. R. G. A. T. Ankit Gangwal, "A Survey of Layer-Two Blockchain
Protocols," 17 4 2022. [Online]. Available:
https://arxiv.org/abs/2204.08032. [Accessed 1 7 2025].
[23] codebyankita, "EIP-4844: Proto-Danksharding and Ethereum’s
Scalability Leap," 18 6 2025. [Online]. Available:
https://medium.com/@ankitacode11/eip-4844-proto-dankshardingand-ethereums-scalability-leap-a11e6a1398e2. [Accessed 1 7 2025].
[24] M. C. a. B. Liskov, "Practical Byzantine Fault Tolerance," in the
Proceedings of the Third Symposium on Operating Systems Design
and Implementation, New Orleans, USA, 1999.
[25] S. K. R. S. M. Shahriar Fahim, "Blockchain: A Comparative Study of
Consensus Algorithms PoW, PoS, PoA, PoV," I. J. Mathematical
Sciences and Computing, vol. 3, pp. 46-57, 2023.
[26] M. B. a. T. C. Nicola Atzei, "A Survey of Attacks on Ethereum Smart
Contracts (SoK)," Proceedings of the 6th International Conference on
Principles of Security and Trust, vol. 10204, pp. 164-186, 2017.
[27] P. W. Shor, "Algorithms for quantum computation: discrete
logarithms and factoring," in Proceedings 35th Annual Symposium on
Foundations of Computer Science, Santa Fe, NM, USA, 1994.
[28] National Institute of Standards and Technology (NIST), "PostQuantum Cryptography | CSRC," 3 1 2017. [Online]. Available:
https://csrc.nist.gov/Projects/post-quantum-cryptography. [Accessed 1
7 2025].
[29] ISO, "ISO 20022 Universal financial industry message scheme,"
2004. [Online]. Available: https://www.iso20022.org/. [Accessed 15 3
2025].
[30] R. A. a. R. Boehme, "The technology of retail central bank digital
currency," 1 3 2020. [Online]. Available:
https://www.bis.org/publ/qtrpdf/r_qt2003j.pdf. [Accessed 1 7 2025].
[31] C. Mu, "Theories and Practice of exploring China’s e-CNY," 7 2021.
[Online]. Available:
http://www.pbc.gov.cn/en/3935690/3935759/4749192/202212291335
0138868.pdf. [Accessed 15 3 2025].
[32] Central Bank of The Bahamas, "Digital Bahamian Dollar," 2021.
[Online]. Available: https://www.sanddollar.bs/. [Accessed 20 5
2021].
[33] the Central Bank of Nigeria (CBN), "eNaira," 2021. [Online].
Available: https://enaira.gov.ng/. [Accessed 15 3 2025].
[34] EUROPEAN CENTRAL BANK, "Digital Euro," 2025. [Online].
Available:
https://www.ecb.europa.eu/euro/digital_euro/html/index.en.html.
[Accessed 15 3 2025].
[35] SVERIGES RIKSBANK, "E-krona," 25 3 2024. [Online]. Available:
https://www.riksbank.se/en-gb/payments--cash/e-krona/. [Accessed
15 3 2025].
[36] Bank for International Settlements (BIS), "Project mBridge reached
minimum viable product stage," 11 11 2024. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm.
[Accessed 15 3 2025].
[37] Bank for International Settlements, "Project Tourbillon demonstrates
cash-like anonymity for retail CBDC," 29 11 2023. [Online].
Available:
https://www.bis.org/about/bisih/topics/cbdc/tourbillon.htm. [Accessed
15 3 2025].
[38] Bank for International Settlements (BIS), "Project Mariana: BIS and
central banks of France, Singapore and Switzerland successfully test
cross-border wholesale CBDCs," 28 9 2023. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/mariana.htm. [Accessed
15 3 2025].
[39] Bank for International Settlements (BIS), "Project Sela demonstrates
that retail CBDC can support access, cyber security and competition,
while retaining cash features," 12 9 2023. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/sela.htm. [Accessed 15 3
2025].
[40] Bank for International Settlements (BIS), "Project Rosalind:
developing prototypes for an application programming interface to
distribute retail CBDC," 6 2022. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/rosalind.htm. [Accessed
15 3 2025].
[41] Bank for International Settlements (BIS), "Project Icebreaker
concludes experiment for a new architecture for cross-border retail
CBDCs," 6 3 2023. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/icebreaker.htm.
[Accessed 15 3 2025].

[42] Bank for International Settlements (BIS), "Project Dunbar:
international settlements using multi-CBDCs," 2 9 2021. [Online].
Available: https://www.bis.org/about/bisih/topics/cbdc/dunbar.htm.
[Accessed 15 3 2025].
[43] "Project Helvetia: a multi-phase investigation on the settlement of
tokenised assets in central bank money," Bank for International
Settlements (BIS), 1 12 2023. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/helvetia.htm. [Accessed
15 3 2025].
[44] "Project Jura: cross-border settlement using wholesale CBDC," Bank
for International Settlements (BIS), 8 12 2021. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/jura.htm. [Accessed 15 3
2025].
[45] Bank for International Settlements (BIS), "Aurum: a two-tier retail
CBDC system," 7 2022. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/rcbdc.htm. [Accessed 15
3 2025].
[46] Bank for International Settlements (BIS), "Project Rialto: improving
instant cross-border payments using central bank money settlement,"
13 2 2025. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/rialto.htm. [Accessed 15
3 2025].
[47] Bank for International Settlements (BIS), "Project Aurum 2.0:
Improving privacy for retail CBDC payment," 2025. [Online].
Available:
https://www.bis.org/about/bisih/topics/cbdc/aurum2_0.htm.
[Accessed 15 3 2025].
[48] Bank for International Settlements (BIS), "Project Mandala: shaping
the future of cross-border payments compliance," 28 10 2024.
[Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/mandala.htm. [Accessed
15 3 2025].
[49] Bank for International Settlements (BIS), "Project Polaris: secure and
resilient CBDC systems, offline and online," 26 10 2023. [Online].
Available: https://www.bis.org/about/bisih/topics/cbdc/polaris.htm.
[Accessed 15 3 2025].
[50] Bank of Thailand, "Central Bank Digital Currency," 2023. [Online].
Available: https://www.bot.or.th/en/financial-innovation/digitalfinance/central-bank-digital-currency.html. [Accessed 15 3 2025].
[51] Bank of Thailand, "Inthanon Phase 2: Enhancing Bond Lifecycle
Functionalities & Programmable Compliance Using Distributed
Ledger Technology," 2019. [Online]. Available:
https://www.bot.or.th/content/dam/bot/documents/th/financialinnovation/cbdc/20190718_Inthanon_Phase2_Report.pdf. [Accessed
15 3 2025].
[52] Bank of Thailand and Hong Kong Monetary Authority, "InthanonLionRock," 2019. [Online]. Available:
https://www.hkma.gov.hk/media/eng/doc/key-functions/financialinfrastructure/Report_on_Project_Inthanon-LionRock.pdf. [Accessed
15 3 2025].
[53] Bank of Thailand, "Retail CBDC Pilot Program – Conclusion
Report," 11 4 2024. [Online]. Available:
https://www.bot.or.th/en/financial-innovation/digital-finance/centralbank-digital-currency/_/Pilot-CBDC-2024.html. [Accessed 15 3
2025].
[54] "Project mBridge reached minimum viable product stage," 11 11
2024. [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm.
[Accessed 1 7 2025].
[55] Bank of Canada, European Central Bank, Bank of Japan, Sveriges
Riksbank, Swiss National Bank, Bank of England, Board of
Governors Federal Reserve System, Bank for International
Settlements, "Central bank digital currencies: foundational principles
and core features," 9 10 2020. [Online]. Available:
https://www.bis.org/publ/othp33.pdf. [Accessed 1 7 2025].
[56] Bank of Canada, Swiss National Bank, European Central Bank, Bank
of England, Bank of Japan, Board of Governors Federal Reserve
System, Sveriges Riksbank, Bank for International Settlements,
"CBDCs - System design," 11 2024. [Online]. Available:
https://www.bis.org/publ/othp88_system_design.pdf. [Accessed 1 7
2025].
[57] J. Kiff, "Taking Digital Currencies Offline," 9 2022. [Online].
Available:
https://www.imf.org/en/Publications/fandd/issues/2022/09/kifftaking-digital-currencies-offline. [Accessed 1 7 2025].

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 03:57:48 UTC from IEEE Xplore. Restrictions apply.

202
Powered by TCPDF (www.tcpdf.org)
