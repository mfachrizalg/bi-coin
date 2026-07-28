---
source_type: pdf
title: "Blockchain-Based Central Bank Digital Currency Empowering Centralized Oversight With Decentralized Transactions"
original_file: "thesis/reference/Blockchain-Based Central Bank Digital Currency_ Empowering Centralized Oversight With Decentralized Transactions.pdf"
sha256: "97e017922c7da218e521d2669797da7f65a7f3f21ddf478e3e4c99f8e7b4985f"
page_count: 21
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Blockchain-Based Central Bank Digital Currency Empowering Centralized Oversight With Decentralized Transactions

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Received 17 November 2024, accepted 7 December 2024, date of publication 13 December 2024,
date of current version 27 December 2024.
Digital Object Identifier 10.1109/ACCESS.2024.3517147

Blockchain-Based Central Bank Digital Currency:
Empowering Centralized Oversight With
Decentralized Transactions
TAYRIN TUNZINA 1 , MD ASIF KARIM CHAYON 1 , PRITAM GUPTA JITU 1 ,
MOSAMMED UPNAN ANKON1 , SHEIKH NAHIDUZZAMAN JOY1 , REDOY KUMAR SHAHA
MD. MOTAHARUL ISLAM 1 , (Member, IEEE), MUHAMMAD SHAKHAWAT HUSSAIN2 ,
MOHAMMAD MEHEDI HASSAN 3 , (Senior Member, IEEE), AND PHUOC HUNG PHAM4

1,

1 Department of Computer Science and Engineering, United International University, Dhaka 1212, Bangladesh
2 AFI Ventures, Dubai, United Arab Emirates

3 Department of Information Systems, College of Computer and Information Sciences, King Saud University, Riyadh 11543, Saudi Arabia
4 Department of Mathematics and Computer Science, Providence College, Providence, RI 02918, USA

Corresponding author: Md. Motaharul Islam (motaharul@cse.uiu.ac.bd)
This work was funded by the Institute for Advanced Research Publication Grant of United International University, Ref. No.:
IAR-2024-Pub-037. Additionally, King Saud University supported this work through Researchers Supporting Project Number
(RSP2025R18).

ABSTRACT The advent of Central Bank Digital Currencies (CBDCs) represents a significant evolution
in monetary systems, enhancing transparency, efficiency, and resilience in financial transactions. This
research presents a comprehensive CBDC framework that integrates centralized databases with decentralized
blockchain technology, aimed at strengthening monetary oversight and tackling challenges such as money
laundering and financial irregularities. By employing blockchain’s immutable ledger, the proposed system
supports secure and transparent digital transactions, thereby fostering trust and accountability in the financial
ecosystem. Furthermore, the framework promotes financial inclusion by offering various transaction
methods, such as internet-based payments, smart cards, and offline One-Time Password (OTP) systems.
This diverse approach helps users in areas with limited internet access, effectively bridging critical gaps in
digital accessibility and ensuring that everyone can participate in the digital economy. Through prototype
development and empirical evaluation using tools like Ethereum, Geth, and web3.js, the study explores
CBDC’s potential for sustainable economic development, offering insights into practical applications and
future scalability.
INDEX TERMS
Central bank digital currency, blockchain, digital currency, P2P payments, KYC, consensus, ethereum, smart
contracts.
I. INTRODUCTION

The rise of Central Bank Digital Currencies (CBDCs) is
reshaping global finance. Positioned at the forefront of this
change, the initiative to implement a sophisticated CBDC
system seeks to transform monetary governance and promote
transparency within financial ecosystems [1]. Leveraging
The associate editor coordinating the review of this manuscript and
approving it for publication was Mueen Uddin

VOLUME 12, 2024

.

blockchain technology, CBDCs represent a pivotal step in
modernizing banking practices and enhancing the efficiency
and security of digital transactions [2]. From 2016 to 2024,
research focused on motivations, technology implementation,
and legal challenges, with a current focus on socioeconomic
implications such as financial stability, monetary policy, and
consumer behavior [3]. The development of CBDCs marks
a watershed moment in monetary systems, highlighting
the importance of competitive advantages over traditional

2024 The Authors. This work is licensed under a Creative Commons Attribution 4.0 License.
For more information, see https://creativecommons.org/licenses/by/4.0/

192689

## Page 2

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

fiat money. This shift highlights critical concerns such as
the possible impact on financial systems in the face of
changing economic and interest rate situations. In addition, it emphasizes the crucial need of establishing strong
technical solutions to effectively manage risks in the use
of digital currencies [4]. This paper outlines a detailed
approach to CBDC implementation, aiming to overcome
challenges and maximize opportunities in this transformative
landscape.
Designing CBDCs to achieve specific objectives often
poses challenges in balancing other critical goals, such
as reconciling financial inclusion with effective fraud
prevention amidst reduced Know Your Customer (KYC)
standards. Moreover, there is a notable lack of empirical
evidence on how CBDC adoption influences credit costs and
financial stability, underscoring the need for further research
to understand potential impacts on bank deposit volumes
and overall economic stability [5]. The financial sector
is actively pursuing greater inclusivity and transparency
in monetary systems through the adoption of digital currencies. Leveraging blockchain technology, CBDC systems
aim to combat issues like money laundering and enhance
trust in digital transactions [6]. Furthermore, they aim to
expand financial accessibility through customized solutions,
facilitating broader participation in the digital currency
ecosystem [7].
Blockchain technology has the potential to revolutionize the banking industry by upgrading payment clearing
and credit information systems, enhancing efficiency, and
supporting economic transformation, despite challenges in
regulation and implementation [8]. The consensus mechanisms for CBDCs differ from traditional blockchain methods
like Proof-of-Work (PoW), using designated nodes to ensure
security properties such as preventing double-spending,
ensuring non-repudiation, and guaranteeing unforgeability [9]. These mechanisms are crucial for maintaining
the integrity and security of digital currencies issued by
central banks. Drawing insights from pioneering CBDC
implementations in countries like the Bahamas, China, and
Uruguay, this paper explores various aspects of CBDCs and
their implications. Statistical data and correlation techniques
inform strategic decisions regarding CBDC adaption [10],
[11]. Other research demonstrates that addressing the
challenge of ensuring privacy and security in peer-to-peer
payments, similar to physical cash transactions, involves
introducing innovative approaches such as using a one-time
program (OTP) to mitigate the issue of double-spending in
digital transactions [12]. Digital currencies issued by central
banks must be widely available at all times and places, just
like physical cash, in order to be accepted as national legal
tender. So, the ability to make payments offline is becoming
more and more desirable [13].
To guide this research and address critical issues within the
implementation of CBDC frameworks, this study is centered
around the following research questions:
192690

FIGURE 1. System context diagram.

RQ1: How can CBDCs integrate centralized and
decentralized elements to provide secure and efficient
monetary oversight?
• RQ2: What mechanisms can a CBDC framework
incorporate to ensure financial inclusion, particularly for
users with limited internet access or lack of access to
smart devices?
• RQ3: What are the key differences in security,
efficiency, and user accessibility between CBDCs,
traditional banking systems, and other digital banking
solutions?
The major contributions of this paper are summarized
below:
• Proposed CBDC Framework: We have designed
a comprehensive framework for the implementation
of CBDC. This framework outlines the essential
components, processes, and interactions necessary for
establishing a secure, efficient, and scalable CBDC
system, providing a clear roadmap for understanding and
deploying CBDC architecture.
• Financial Inclusion Solutions: We have proposed
innovative solutions, including a smart card and OTP
system, to enhance CBDC ecosystem participation,
particularly in regions with limited access to smart
devices and internet for digital transactions.
• Comparison with Banking and Blockchain Systems:
We have provided a detailed comparison of CBDCs with
traditional banking systems and blockchain-based digital currencies, highlighting differences in functionality,
security, and operational efficiency.
• Prototype Implementation: We have developed a test
application to demonstrate the practical implementation
of our proposed CBDC framework. This application
showcases key functionalities, such as decentralized
transactions using blockchain and storing transaction
details in a database.
Our proposed CBDC system prioritizes scalability, security, and reliability, ensuring seamless transaction handling,
robust authentication and stringent security measures. Ethical
considerations and user accessibility are essential for promoting trust and adoption, aligning with modern financial
needs. In line with the paper’s exploration of blockchain technology, the study focuses on establishing private Ethereum
networks and creating genesis blocks to ensure secure
•

VOLUME 12, 2024

## Page 3

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

and robust blockchain networks [14]. The system context
diagram, Fig. 1 provides a high-level overview, illustrating
essential processes involved in the model’s execution,
serving as a fundamental functional element of the entire
system.
The paper is structured as follows: Background
(Section II): Provides an overview of foundational concepts;
Related Work and Gap Analysis (Section III): Explores
existing research on blockchain and CBDCs and identifies
gaps in the current literature; Architecture for Our Proposed
System (Section IV): Describes the proposed system’s architecture, including blockchain design, and integration with
the financial systems; Implementation of Blockchain-Based
CBDC (Section V): Details the implementation process
for the blockchain-based CBDC; Results and Discussion
(Section VI): Analyzes the system’s performance and
security; Limitations and Future Work (Section VII):
Discusses the study’s limitations and suggests directions for
future research; Conclusion (Section VIII): Summarizes the
findings and conclusions of the paper.
II. BACKGROUND

Modern societies have two types of fiat money: central bank
money and commercial bank money. A central bank’s money
is generally used for wholesale payments, with the exception
of currency in the form of banknotes and coins. Commercial
bank money, which is created by commercial banks through
the issuance of loans or credit lines, accounts for the vast
majority of fiat money in circulation and is widely utilized for
retail payments between non-financial entities, corporations,
and individuals. CBDC is an emerging technology for central
bank money issuance, consisting of digital assets backed and
controlled by the central bank [15].
Blockchain is key to digital cryptocurrencies, and central banks worldwide are investigating its possibilities
for CBDC. Since 2016, numerous central banks have
launched blockchain-based CBDC initiatives, with some
producing proof-of-concept prototypes. With the emergence
of permissioned consortium blockchains such as Ethereum,
Corda, Hyperledger Fabric, and Quorum, these technologies
are being used in CBDC for inner-bank, inter-bank, and
cross-border payments and settlements [16].
A. COMPARISON BETWEEN BANKING SYSTEMS

CBDCs with blockchain technology offers potential cost
savings and faster transactions compared to traditional
banking methods. They challenge the central bank’s currency
issuing monopoly and encourage savings through interestbearing features, although they face obstacles such as
under utilization and competition from cryptocurrencies.
The distributed structure of blockchain provides secure
transactions, but the coexistence of physical currency raises
legal and economic stability problems [17]. For a detailed
comparison, see Table 1.

VOLUME 12, 2024

1) CONTROL STRUCTURE

Centralization involves concentrating power and decisionmaking at a single location or among a few entities. In a
centralized system, everything is managed from one central
authority. In contrast, decentralization spreads authority and
decision-making across multiple entities or nodes, reducing
the risk of a single point of failure.
A centralized virtual currency has a single administrator
or authority, similar to a central bank, which manages and
controls the currency. This setup allows central banks to
oversee digital currencies like CBDCs, bridging the gap
between digital and traditional money. On the other hand,
decentralized virtual currencies operate without a central
authority, using blockchain networks and cryptography.
These are commonly known as cryptocurrencies [18]. For our
proposed structure, we combine centralization for monetary
and regulatory control with decentralization to enhance
security and transparency.
2) TRANSPARENCY

Transparency refers to how much of the activities, transactions, and data are visible and accessible to the public and
stakeholders. Increased transparency promotes accountability and confidence. Blockchain technology is crucial for the
digitization of financial assets. It allows for the creation of
a secure record of transactions. This technology enhances
transparency by making transaction details visible to all
participants. The decentralized nature of blockchain removes
the need for a single authority to oversee transactions.
As a result, it provides a reliable and efficient method
for managing and tracking financial assets. Transparency is
essential for any financial system. Using blockchain for digital currencies ensures transparency in financial transactions
and makes records immutable due to its distributed ledger
technology, which ensures that everyone has a copy of the
transaction records [19].
3) SECURITY

Security involves measures and technologies used to protect a
system from unauthorized access, fraud, and other malicious
activities, which is essential for maintaining user trust
and data integrity. In both traditional electronic payment
systems and CBDCs, security is crucial. For a CBDC,
the ability to process payments instantly and with finality
means transactions cannot be easily stopped or reversed.
While real-time settlement has long been standard in banking
systems, it is a more recent development for retail payments.
Any security issues in CBDC systems can have immediate
and serious effects on payment processes and users. A breach
or attack on a CBDC system could lead to widespread
disruptions, impacting financial markets, economies, and
the institutions issuing the currency. Blockchain technology
helps enhance security because it creates a permanent
record of transactions. If someone tries to alter a block of

192691

## Page 4

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

TABLE 1. Comparison table for banking systems.

transactions, the blockchain automatically detects this and
invalidates the modified block, making the system highly
secure [20].
4) TRANSACTION SPEED

Transaction speed refers to the time required to complete
a financial transaction from initiation to finalization. Faster
transaction speeds enhance efficiency and user satisfaction.
Transactions Per Second (TPS) measures how many transactions a blockchain network can handle each second. CBDC
could offer a quicker and more secure method for conducting
transactions, potentially boosting the overall efficiency of the
financial system [21].
5) COSTS

Costs refer to the expenses associated with using the
system, including transaction fees, operational costs, and
service charges. For CBDCs, it is crucial that payments
192692

incur very low or no cost to end users, who should
also face minimal technological investment requirements.
CBDCs can reduce issuance costs compared to traditional
financial infrastructures, which can be expensive [16]. While
blockchain technology does involve some costs, transaction
fees are generally stable and predictable.

6) ACCESSIBILITY

Accessibility encompasses the ease with which users can
engage with the financial system, considering factors such as
geographic reach, technological requirements, and inclusivity. Unlike traditional bank reserves, CBDCs operate with a
distinct structure that supports retail transactions and interest
payments, thereby facilitating a wide range of transactions
similar to cash, including point-of-sale and person-to-person
transfers. Additionally, it should include the capability for
offline transactions, potentially for limited durations and up
VOLUME 12, 2024

## Page 5

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

to set thresholds, ensuring users can access the system even
in low-connectivity areas [22].

By incorporating these regulatory measures, CBDCs can
align with both traditional financial stability standards and
modern digital requirements [16].

7) TRUST MECHANISM

In traditional banking systems, trust is built on the reputation
and oversight of financial institutions, which ensure stability
and compliance. CBDCs shift this paradigm by employing
blockchain technology. Blockchain’s decentralized nature
ensures that transactions are transparent and secure, with
data being immutable once recorded. The involvement of
central banks in issuing and managing CBDCs enhances trust
by blending traditional reliability with advanced technology.
Various consensus algorithms—such as PoW, Proof of Stake
(PoS), Proof-of-Authority (PoA), and other variants—are
employed across different public blockchain systems that
support cryptocurrencies [23].
8) IMMUTABLE RECORDS

Immutable records ensure that once data is recorded, it cannot
be altered or deleted, enhancing integrity and historical
accuracy. Distributed ledger technology (DLT) supports
CBDCs by providing a transparent and secure system
where transactions are permanently recorded and cannot be
tampered with. This immutability fosters trust and stability
in the CBDC network [24].
In contrast, traditional banking systems use centralized databases that can be modified, potentially affecting
data integrity. Decentralized cryptocurrencies also offer
immutability but lack centralized oversight, which can
complicate regulation. CBDCs leverage the benefits of
immutable records with the added reliability of central bank
oversight, balancing transparency and control [15].

11) CUSTOMER EXPERIENCE

Customer Experience (CX) plays a crucial role in gaining
a competitive edge across industries. The rise of advanced
devices and apps has raised customer expectations in
banking, making it essential for banks to offer seamless,
integrated services to retain customers and reduce churn [26].
Traditional banking systems often hinge on physical branch
services, but CBDCs must provide seamless digital interactions and support to ensure a smooth and efficient user
experience. For optimal customer experience, banks should
support various payment methods, including NFC-enabled
smartphones, QR codes, and stored value cards, while
ensuring accessibility for users with impairments through
user-friendly design and dedicated devices [22].
12) INFRASTRUCTURE

Infrastructure refers to the physical and technological
systems that support the financial system’s operations,
including servers, data centers, and communication networks.
Traditional banking systems rely heavily on centralized
infrastructure, which can be complex and expensive to
manage. In contrast, CBDCs utilize decentralized blockchain
technology, which can streamline infrastructure requirements
by using distributed ledgers and peer-to-peer networks.
This reduces the reliance on central servers and enhances
scalability and resilience. However, CBDCs still require a
robust, controlled, and regulated infrastructure with clear
governance for design, maintenance, and upgrades to ensure
security and efficiency [2], [15].

9) SMART CONTRACTS

Smart contracts are self-executing contracts with terms
directly written in code, automating and enforcing agreements based on predefined conditions. Unlike traditional
banking, where contracts are manually handled and enforced,
smart contracts streamline processes and reduce errors by
automating tasks on the blockchain. For CBDCs, smart
contracts enhance efficiency, security, and cost-effectiveness
by integrating automated agreements within the digital
currency framework [25].
10) REGULATION

Regulation encompasses the level and rigor of governmental
oversight to ensure adherence to laws, protect consumers,
and maintain financial stability. Unlike traditional banking
systems, which are closely regulated to manage risks and
ensure compliance, CBDCs require a tailored regulatory
framework. CBDCs must integrate features such as offline
and instant payments, anonymity, security, resilience, and
scalability. This framework should also include mechanisms
for controllable regulation, ensuring that the digital currency
operates within a secure and user-friendly environment.
VOLUME 12, 2024

13) OPERATING HOURS

Operating hours refer to the times when the system is
available for transactions and services. Extended operating hours enhance convenience and service availability.
Traditional banking systems have fixed hours and can be
limited by maintenance or downtime. In contrast, CBDCs
aim for continuous, 24/7/365 availability, bridging the gap
between traditional cash and electronic payments. They are
designed to be resilient, flexible, interoperable, private, and
secure, potentially offering offline capabilities with physical
devices to complete transactions even without constant online
access [27].
14) IDENTITY VERIFICATION PROCESS

Identity verification involves techniques to confirm users’
identities and ensure compliance with regulations such
as KYC and Anti-Money Laundering (AML). Traditional
financial systems rely on KYC to validate identities and
assess risks, while AML policies aim to prevent illegal
activities like money laundering and terrorist financing [29].
In the context of CBDCs, ensuring compliance with these
192693

## Page 6

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

regulations while maintaining user privacy is crucial. Digital
identity solutions are evolving, and the choice of payment
authentication methods, such as identity-based, token-based,
or multifactor will shape how CBDCs interact with other
systems and handle various transaction types, balancing
security and privacy [22].
15) THROUGHPUT

Throughput measures the volume of transactions a system
can handle within a given timeframe. Higher throughput
indicates better performance during high-demand periods.
Blockchain-based CBDC models can handle a high number
of simultaneous transactions more efficiently than traditional
banking systems, which often face performance issues
during peak periods due to their centralized infrastructure.
Compared to digital banking systems leveraging cloud
technologies, which can dynamically scale and manage large
transaction volumes with ease, blockchain-based CBDCs are
still evolving to achieve similar performance levels. A welldesigned CBDC must support thousands of transactions per
second and confirm them within seconds, confirming them
within seconds to meet high demand during peak loads [28].
16) SCALABILITY

Scalability refers to a system’s capacity to grow and handle
increasing numbers of users and transactions as demand
rises. Traditional centralized systems and digital banking
solutions leveraging cloud technologies excel in scalability
by vertically expanding their infrastructure and dynamically
allocating resources to manage large volumes of transactions
efficiently. In contrast, blockchain-based systems, including
CBDCs, face notable scalability challenges due to their
decentralized nature, which limits transaction speed and
volume. While cloud-based digital banking can quickly scale
up to meet demand, blockchain technology has yet to match
this level of scalability, with ongoing development needed to
address its limitations in handling high transaction volumes
and maintaining performance [16].
III. RELATED WORK AND GAP ANALYSIS

In our previous work [30], we proposed the architectures of
a blockchain-based CBDC system. This paper extends that
work by introducing the full implementation and detailed
security analysis.
A. BLOCKCHAIN TECHNOLOGY IN CBDC

In recent years, the integration of blockchain technology in CBDC development has gained significant traction. Zhang et al. [16] explored the functional and
non-functional requirements of CBDCs, emphasizing challenges like cross-chain interoperability and performance.
They recommend using permissioned blockchains for CBDC
implementations and provide design insights specific to
blockchain-based CBDCs. Niepelt et al. [31] explored the
operational dynamics of a dual-tiered monetary system,
shedding light on the implications of integrating blockchain
192694

in central banking frameworks. They examined various
aspects of money issuance, considering factors like reserves
and digital currencies, and derived policy rules, revealing
implicit subsidies to US banks. A hybrid blockchain model
proposed by Zhang et al. [32] represents a significant step
towards achieving controlled decentralization and effective
supervision in digital currencies. Their model, featuring
modular blockchain architecture and an optimized consensus
algorithm, offers a comprehensive solution tailored to CBDC
implementations’ unique demands. Rigorous simulation
experiments validate its ability to address major challenges
while ensuring scalability and regulatory compliance.
B. FINANCIAL IMPLICATIONS AND ECONOMIC
STRATEGIES

Javaid et al. [6] provides an extensive analysis of blockchain’s
transformative potential in the financial sector, highlighting
its benefits in fraud prevention, credit score calculation,
and security enhancement. They also discuss blockchain’s
role in international payments and its impact on accelerating transition systems and improving the audit process.
Niepelt et al. [31] examine the effects of introducing CBDC
on the monetary system and changes since the 2007 financial
crisis. They introduce two different payment methods,
examine monetary economy with households, banks, and
businesses, assess the associated costs, and consider the
role of the central bank in settling interbank payments.
Furthermore, the study sheds light on the operation of
the monetary system by examining interest rates, inflation,
deposits, reserves, and banking profits using economic data
from sources such as FRED. In response to economic downturns like the COVID-19 pandemic, Selim et al. [33] propose
a theoretical framework advocating for the introduction of
digital currencies with incentivized discounts by central
banks. Their strategy aims to stimulate consumer spending
and boost economic performance by offering discounts
on digital currency transactions. This innovative approach
underscores the importance of leveraging digital currencies
for countercyclical economic policy, especially during crises.
C. METHODOLOGIES AND TECHNOLOGICAL
INNOVATIONS

In the realm of blockchain technology, Islam et al. [23] conduct a meticulous investigation into blockchain algorithms,
spanning various domains such as security, economics,
and power consumption. Their comparative analysis of
consensus algorithms sheds light on challenges in scalability,
authenticity, cost, and security, offering invaluable insights
for both researchers and practitioners.
On the forefront of CBDC innovation, Zhang et al. [32]
propose a hybrid blockchain model tailored specifically for
CBDC systems. This model, featuring modular architecture
and the DPOS-BFT consensus algorithm, emphasizes CBDC
supervision and regulatory compliance. Through rigorous
simulation experiments, their research substantiates the
VOLUME 12, 2024

## Page 7

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

efficacy of this comprehensive solution, paving the way
for enhanced transactional efficiency and security within
central banking systems. Gao et al. [34] define post-quantum
blockchain (PQB) and propose a secure cryptocurrency
scheme resistant to quantum computing attacks. They
advocate for the use of lattice-based cryptography to improve
blockchain security, combining post-quantum cryptography
and blockchain technology to create a more effective and safe
cryptocurrency system.
Continuing the discourse on blockchain integration,
He et al. [35] advocate for the fusion of blockchain and
smart contracts to improve data security. Their introduction
of the DIV-SC technique for streamlined data verification
addresses trust and reliability concerns in digital ecosystems,
eliminating the necessity for third-party auditors. Additionally, Fernandez-Carames et al. [36] delve into the realm of
post-quantum cryptosystems, addressing emerging security
threats posed by quantum computing. By highlighting the
importance of proactive measures in fortifying blockchain
infrastructures against potential quantum attacks, their study
underscores the critical necessity for resilient security
primitives in decentralized networks.
CBDC frameworks are further explored by Sun et al. [37],
introducing the Model-Based Design and Construction
(MBDC) framework, leveraging multi-blockchain technology to enhance transaction velocity and scalability. Their
comprehensive evaluation of the model’s performance metrics offers valuable insights into the development and
deployment of blockchain-based CBDC solutions. Lastly,
Han et al. [38] propose a three-tier structure of a
blockchain-based CBDC framework, consisting of a regulatory layer, network layer, and user layer. The paper
details features such as currency value, issuance and supply,
payment methods, and regulatory approaches. It explains the
main business procedures of CBDC and uses cross-border
payments to illustrate how the framework manages transactions. The study also provides a comprehensive analysis
of the functional differences between decentralized digital
currencies and CBDCs, specifying the functional and security
requirements for CBDCs.
D. COMPARISON BETWEEN RELATED RESEARCH

The gap analysis presented in Table 2 highlights significant areas where existing research on CBDCs falls short,
particularly regarding the implementation of secure and
efficient payment methods. Our methodology addresses these
gaps by incorporating a robust CBDC model that integrates
blockchain technology, OTP payment mechanisms, and card
payment systems. This approach not only enhances transaction security and efficiency but also ensures interoperability
and scalability, which are often overlooked in previous
studies.
IV. ARCHITECTURE FOR OUR PROPOSED SYSTEM

Our proposed blockchain-based CBDC architecture provides
a comprehensive framework for securely managing digital
VOLUME 12, 2024

identities and enabling financial transactions. This system
aims to enhance security, efficiency, and regulatory compliance within the financial domain. By using a permissioned
blockchain with Proof-of-Authority (PoA) consensus, our
model balances the central bank’s oversight role with the
decentralized transaction capability offered by blockchain
technology.
A. KEY DESIGN PRIORITIES

The architecture prioritizes three key aspects:
Security: Implementing robust verification, encryption,
and consensus mechanisms ensures transaction integrity,
prevents fraud, and maintains user privacy.
• Efficiency: PoA consensus facilitates fast transaction
processing, even at high volumes, making it suitable for
a high-throughput financial environment.
• Scalability: The system’s modular structure enables
integration with existing banking infrastructures and
future
scalability
across
different
financial
institutions.
•

B. BLOCKCHAIN ARCHITECTURE AND CONSENSUS
MECHANISM

Blockchain systems are classified into permissioned and permissionless types. In permissioned blockchains, only a select
group of trusted participants, such as central and authorized
commercial banks, maintain full copies of the blockchain,
which allows for a simpler, less resource-intensive
consensus process [23]. This structure supports efficient, high-performance operations essential for CBDC
applications.
To achieve a balance between central oversight and
decentralized transaction capabilities, we adopt a PoA
consensus mechanism. PoA is particularly well-suited for
permissioned blockchain environments, aligning with the
central bank’s regulatory role while facilitating secure
transaction verification by authorized entities within the
network. Compared to Byzantine Fault Tolerance (BFT)
algorithms, PoA’s lightweight message protocol enhances
system efficiency, supporting the high transaction throughput
required in central bank-operated networks. Configurations
such as Aura and Clique, designed for private networks,
utilize a trusted authority to propose new blocks, which are
accepted based on signatures from a majority of authorized
entities [39].
In this PoA model, a limited group of pre-approved validator nodes, including the central bank and selected commercial
banks, validate transactions under verified identities. This
consensus approach provides CBDCs with decentralization
at the technical level while maintaining logical centralization,
as required by the central bank’s regulatory authority.
Research indicates that while PoA consensus introduces
some decentralization in CBDC architectures, regulatory
oversight remains essential, given the central bank’s supervisory responsibilities [40].
192695

## Page 8

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

TABLE 2. Gap analysis.

C. USER VERIFICATION PROCESS

The user verification process, as illustrated in Fig. 2, begins
with users establishing their identities through government
banks by providing personal information from birth certificates and national identification documents [step-1]. The
Banking Software then forwards this request to verify the
data against the national identity database [steps 2-5]. Upon
successful verification [step-6], authenticated documentation
is sent to the central bank to create a digital identity
[step-7]. The central bank manages this process, storing the
digital identity on both a central server and a blockchain
database [steps 8 & 9]. Banks then distribute this digital
identity, initially assigned a zero value, to users [step-10].
This process mirrors the conversion of physical currency to
digital currency. Additionally, after [step-6], users can also
create their digital identity through the app, which verifies
the national ID (NID) number against the central identity
database before generating and storing the digital identity on
the blockchain. Users can conduct transactions via internetbased platforms, card payment software, or offline methods.
D. INTERNET-BASED TRANSACTION

Fig. 3 illustrates the process for internet-based transactions in
the proposed system, which is detailed through the following
steps. Users begin by verifying the recipient’s digital identity,
which can be done using QR codes or similar methods
[step-1]. Once the user confirms the transfer and provides
the necessary information, including their hashed security
password for added protection, the request is sent to the cloud.
The request is then forwarded [step-2] to a mathematical
processing center along with key details such as the transfer
amount and digital identities of both sender and recipient.
The mathematical processing program performs calculations and verifies the transaction’s validity by checking
the databases and blockchain using PoA, a consensus
192696

algorithm suited for private and permissioned blockchains.
This ensures the sender has sufficient funds and checks
for any anomalies or unauthorized modifications in the
blockchain database [step-3]. Here, smart contracts play a
crucial role in automating transactions and ensuring their
integrity by executing predefined conditions without human
intervention. Upon successful verification [steps 4 & 5],
a transaction hash containing details of the sender, recipient,
timestamp, and transaction value is recorded in both the
blockchain and central databases.
If the results are accurate, a success message is sent to
both parties. Any discrepancies result in a warning message
[step-6]. Additionally, to enhance transaction security and
integrity, the balances of both parties are stored in the
blockchain and linked servers for future reference and
computation. Updated balances are then forwarded to the
users for transaction verification [steps 7 & 8].
E. SMART CARD TRANSACTION

Transactions can be facilitated using cards for users without
digital devices. These cards, initially with no balance, utilize
database storage to allocate funds. Equipped with the user’s
digital identity, the cards are inserted into card-receiving
software to initiate transactions. Upon insertion, the software
takes input of the required transfer amount which is then
forwarded for processing. Successful transactions update
both users’ balances, similar to internet-based transactions.
Errors are reported to the sender’s device and software. This
transaction is stored in the blockchain database and shared
to the public ledger for transparency. Refer to Fig. 4 for the
transactional process.
F. OFFLINE OTP TRANSACTIONS

In cases where users lack internet access but possess digital
devices, transactions can be conducted using One-Time
VOLUME 12, 2024

## Page 9

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

FIGURE 2. User verification and digital identity creation in the proposed system.

FIGURE 3. Proposed internet-based payment.

Passwords (OTPs). Users initiate this process by dialing a
designated number and providing recipient information along
with a transfer request. The data is then transmitted to the SIM
provider tower, routed to the SIM provider company, and forwarded to the processing center. Stringent security measures,
including detection of potential alterations to the transaction
request, ensure the rejection of any malicious attempts. Valid
requests prompt the generation and transmission of an OTP
to the senders device. Upon successful authentication, the
transaction progresses to update values and store them on the
blockchain.

VOLUME 12, 2024

To prevent double spending, each OTP is generated
uniquely for a specific transaction request. Once an OTP
is used to authenticate a transaction, it becomes invalid
for any subsequent transaction attempts. This ensures that
digital assets cannot be duplicated or spent more than once,
maintaining the integrity and security of the transaction
process.
While OTP usage may have limitations in geographically
dispersed scenarios, its implementation assures transaction
integrity and security. See Fig. 5 for an illustration of the
payment process.

192697

## Page 10

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

FIGURE 4. Proposed card payment process.

communication protocols. This allows for real-time
transaction processing, essential for high-volume
financial operations.
4) Transaction Flow and User Interaction: Users can
interact with the CBDC system through digital wallets, smart cards, or offline OTP-based transactions.
Transactions will be validated by smart contracts,
ensuring transparency and security, while preserving
user privacy through cryptographic methods.
5) Regulatory Compliance and Auditing: The
blockchain’s immutable ledger supports regulatory
compliance by providing a transparent record of all
transactions. This enables authorized auditors to verify
compliance with financial regulations and detect illegal
activities, such as fraud or money laundering.
V. IMPLEMENTATION OF BLOCKCHAIN BASED CBDC
A. STARTING THE BLOCKCHAIN NETWORK
FIGURE 5. Proposed OTP payment process.

G. INTEGRATION WITH FINANCIAL SYSTEMS

The integration of the proposed blockchain-based CBDC
system into the financial sector involves several key steps:
1) Collaboration with Financial Institutions: A strong
partnership between the central bank, government
authorities, and commercial banks is crucial for
implementing the CBDC system. Banks will verify
user identities and issue digital identities, which will
be securely stored on the blockchain.
2) Onboarding Validators: The central bank, as the
supervisory authority, will onboard commercial banks
and other authorized entities onto the permissioned
blockchain. These institutions will act as validators
within the PoA consensus mechanism, ensuring transaction integrity and blockchain maintenance.
3) Blockchain Integration with Existing Infrastructure: The CBDC system can be integrated into
existing financial infrastructures using secure APIs and
192698

Our digital identity management solution leverages essential
components including go-ethereum, web3, and smart contracts to ensure robustness, security, and efficiency. Each
element plays a pivotal role in developing and operationalizing the system, addressing specific needs and challenges
inherent to blockchain-based applications.
Web3.js is Ethereum JavaScript API which is a collection
of libraries that will allow us to interact with a local or
remote ethereum node using HTTP, IPC or WebSocket.
With web3.js we can connect to the local geth node using
HTTP, IPC or WebSocket provider. At first initializing a
private provider we need to create nodes with geth. Private
networks are crucial in Ethereum’s ecosystem, connecting
multiple nodes exclusively. Each node needs a distinct data
directory (–datadir) for local operation, sharing information
and maintaining a common consensus algorithm. This geth
nodes will act as the primary block of the chain. To create a
geth node we will create datadir for the node using: [Listing 1]

LISTING 1. Command to create a new node/account.
VOLUME 12, 2024

## Page 11

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

This command will save the output in a keystore file with
node address and encrypted private key which can be used
later on the geth’s javascript console.
B. CREATING THE GENESIS BLOCK FOR PRIVATE
ETHEREUM NETWORKS

Every Ethereum blockchain initiates with a genesis block,
which serves as its foundational element. While Geth, the
Go Ethereum client, defaults to committing the Mainnet
genesis, it is advisable to tailor a distinct genesis block
for private networks. The genesis block configuration is
facilitated through a genesis.json file, the path of which is
specified during Geth startup. Essential parameters defining
the private blockchain are delineated during genesis block
creation:
• Ethereum Platform Features: Configuring Ethereum
platform features at launch is crucial for customizing the
network’s functionalities to suit specific requirements.
• Initial Block Gas Limit: The gas limit of the initial
block (gasLimit) is pivotal as it determines the extent of
computation possible within a single Ethereum Virtual
Machine (EVM) block. This limit can be adjusted post
launch using the miner.gastarget command-line flag to
accommodate evolving computational demands.
• Initial Ether Allocation: The allocation of initial
ether (alloc) dictates the amount of ether available to
addresses listed in the genesis block. Additional ether
can be generated through mining as the blockchain
progresses, ensuring liquidity and incentivizing network
participation. Configuring these parameters meticulously ensures the establishment of a robust and customized private blockchain network tailored to specific
use cases and operational requirements.

will break if you restart which can be dangerous. Upon
completion of genesis.json’s configuration, the blockchain
can be initiated. Setting a balance requires action before the
blockchain is launched [Listing 2].
Breakdown of terms in genesis.json
• chainId: A unique identifier for this blockchain network. Different networks have different chain IDs to
avoid conflicts. (e.g., Ethereum mainnet has a chainId
of 1)
• clique: Settings for a consensus mechanism. Clique
mechanism used in blockchains, particularly private or
consortium blockchains. Clique is a type of consensus
mechanism called PoA. Unlike PoW used in Bitcoin,
where miners compete to solve complex puzzles to validate transactions, PoA relies on pre-defined validators
to create new blocks. These validators are trusted entities
with a stake in the network’s success [41].
• period: The time (in seconds) between elections for a
new block proposer.
• epoch: The number of blocks after which difficulty is
recalculated.
• difficulty: A string representing the difficulty level for
mining new blocks. Higher difficulty makes mining
more complex.
• gasLimit: The maximum amount of gas allowed per
block. Gas is a unit used to measure the computational
effort needed for transactions.
• extradata: Optional data included in the genesis block
header. Often used for custom network information or
identification.
• alloc: Defines the initial allocation of funds (usually
cryptocurrency) to specific accounts.
• node address: The address of a blockchain node
(account) in hexadecimal format.
• balance: The initial amount of currency to allocate to
that address.
C. INITIALIZING THE GETH DATABASE

To create a blockchain node that uses this genesis block, first
use geth init to import and sets the canonical genesis block
for the new chain. This requires the path to genesis.json to be
passed as an argument [Listing 3].

LISTING 3. Initialising genesis.json configurating to node.

LISTING 2. Example of genesis.json.

It should be noted that once the blockchain has been
launched, it cannot be modified and restarted. The blocks
VOLUME 12, 2024

The next step is to configure a bootnode. This can be any
node, but for this tutorial the developer tool bootnode will be
used to quickly and easily configure a dedicated bootnode.
First the bootnode requires a key, which can be created with
the following command, which will save a key to boot.key:
[Listing 4]

LISTING 4. Example of bootnode command.
192699

## Page 12

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

This key can then be used to generate a bootnode as
follows: [Listing 5]

LISTING 5. Example of bootnode command.

The choice of port passed to -addr is arbitrary, but public
Ethereum networks use 30303, so this is best avoided. After
that we can connect the nodes using the below command so
the nodes can interact with each other. The same command
can be used to other nodes but changing the port for each node
to communicate with each other [Listing 6].

LISTING 6. Example of node connecting command.

After setting up the private network, we can utilize
web3.js to create users and use our geth as an HTTP, IPC,
or WebSocket provider. Additionally, either node can now
have a Javascript console attached to it in order to query
network properties and send transactions to users to set their
balances.
D. ETHEREUM INTEGRATION AND SOLIDITY SMART
CONTRACTS

Ethereum stands at the forefront as the ideal blockchain
platform for meeting CBDC requirements, offering robust
scalability and advanced privacy features within the world’s
largest blockchain ecosystem, engaging over 350,000 developers [42]. Integral to Ethereum’s functionality is Solidity, the
smart contract programming language. Solidity enables the
specification of logic and behavior governing critical aspects
such as user registration, authentication, and transaction processing. These self-executing contracts enforce predefined
rules seamlessly within Ethereum’s decentralized network.
Our implementation ensures secure and immutable digital
identity management by harnessing Ethereum’s decentralized architecture and Solidity’s expressive programming
capabilities. Users benefit from a platform where identities
and transactions are securely managed through blockchain
technology and governed by smart contracts.
To mitigate costs associated with the Ethereum main
network, particularly during development and testing phases,
we leverage our dedicated Ethereum test network. This
approach enables agile experimentation and iteration, ensuring robust and secure smart contracts before potential
deployment to the main network. This was specifically
implemented for the test app to ensure a smooth development
process.
Moreover, Ethereum’s versatile programming language
supports complex business logic, making it particularly
192700

suitable for applications in both identity management and
transaction processing. Its peer-to-peer architecture allows
independent nodes to maintain a shared global state,
facilitating secure transactions without relying on trusted
third parties. This decentralized approach not only enhances
efficiency and security but also opens the door to new use
cases that were previously unattainable, driving innovation
across various industries [43].
E. IMPLEMENTATION OF TEST APPLICATION:
INTEGRATION OF TOOLS AND TECHNOLOGIES

Our blockchain-based CBDC system integrates a suite of
cutting-edge tools and technologies to ensure operational
efficiency and robust security.
At the core of our system’s interaction with the Ethereum
blockchain is Web3.js. Web3.js facilitates essential features
such as user transactions and contract interactions, making it
integral to our solution.
In our development environment, we use Ganache, a local
blockchain emulator [44]. Ganache allows us to replicate the
Ethereum network locally, providing a controlled environment for deploying and testing smart contracts. This setup
significantly accelerates our development cycle by enabling
rapid iteration and debugging without needing to deploy on
the main Ethereum network [Listing 7].

LISTING 7. Connecting to Ganache with Web3.js.

Complementing these tools is MongoDB, a scalable
NoSQL database. MongoDB serves as the backend infrastructure of our system, providing persistent storage for
crucial data such as user profiles, transaction records, and
other vital information. By leveraging MongoDB’s flexibility
and scalability, we ensure efficient data management and
retrieval, allowing our identity management platform to
operate smoothly.
This system features centralized oversight, as user details
and transaction records can be accessed by central or government banks, while the transaction processes themselves
are decentralized due to the implementation of blockchain
technology.
The chosen tools and technologies are based on their
compatibility with blockchain-based applications, their comprehensive features, and their ability to address the unique
requirements and constraints of digital identity management.
Together, they form a cohesive ecosystem that enables our
system to deliver secure, transparent, and user-centric digital
identity solutions [45].
F. SMART CONTRACTS FOR GENERATING DIGITAL
IDENTITIES

The smart contract for generating digital identities is designed
to securely register users on the Ethereum blockchain.
VOLUME 12, 2024

## Page 13

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

It ensures that each user can only register once, preventing
duplicate registrations. The contract utilizes the ‘registerIdentity‘ function, which takes the user’s name and national ID
(NID) number as inputs [Listing 8].
Before a user can register through the app, their NID
number must already be present in the MongoDB database.
The NID number entered in the registration form is
cross-checked with the database. If the NID number matches,
the digital identity is created and stored in the blockchain
database, ensuring the user’s registration details are securely
recorded. This digital identity is then used to store details of
transactions both from and to the user.
The ‘registerIdentity‘ function first checks if the user is
already registered using the ‘registered‘ mapping. If the
user is not registered, their details are stored in the
‘users‘ mapping, and their address is marked as registered.
An event, ‘UserRegistered‘, is then emitted to log the registration details on the blockchain, ensuring transparency and
traceability.

By ensuring that only registered users can process
transactions, this function helps maintain the integrity of
the system and provides a secure method for conducting
transactions within the decentralized network.
H. SYSTEM WORKFLOW AND FUNCTIONALITY

The UML diagrams presented in Fig. 6 and Fig. 7
illustrate the comprehensive workflow and functionality
of the blockchain-based CBDC system. These diagrams
delineate both user interactions and administrative processes,
showcasing how the system operates at different levels.
In Fig. 6, the user workflow is depicted, beginning with the
registration process where users validate their NID number
against the MongoDB database. Upon successful verification,
a digital identity is created and stored on the blockchain,
allowing for secure transactions. Subsequent actions include
initiating transactions and reviewing account details.
Fig. 7 illustrates the administrative functionality, highlighting the dashboard for authorized personnel to manage
user accounts and oversee transaction histories, ensuring
compliance and integrity in the CBDC ecosystem.
I. SYSTEM DEMONSTRATION

LISTING 8. Smart contract function for user registration.

This implementation ensures that users’ digital identities
are securely recorded on the blockchain, leveraging the
decentralized nature of Ethereum to prevent tampering and
unauthorized modifications.
G. SMART CONTRACTS FOR PROCESSING TRANSACTIONS

The smart contract also includes a function for processing
transactions between registered users. The ‘processTransaction‘ function is designed to verify that both the sender and
the recipient are registered users before allowing a transaction
to proceed. This ensures that only authenticated users can
participate in transactions, adding an additional layer of
security [Listing 9].
When a user initiates a transaction, the function checks the
registration status of both the sender and the recipient. If both
are registered, the function emits a ‘TransactionProcessed‘
event, logging the details of the transaction on the blockchain.

LISTING 9. Smart contract function for processing transactions.
VOLUME 12, 2024

The following figures, Fig. 8, 9 & 10 depict the registration
process within our system. They illustrate the steps from
filling out the registration form to the creation of a new
account and storing user address data in the database.
The following figures, Fig. 11, 12 & 13 illustrate the
transaction process using our test application. They show
the sender entering the recipient’s address, a successful
transaction, and the transaction details stored in the database.
The following figures, Fig. 14 & 15 display the CBDC
Administration Panel. They show the admin dashboard and
the transaction history that administrators can view to manage
and monitor the system.
VI. RESULTS AND DISCUSSIONS
A. PERFORMANCE ANALYSIS WITH EXISTING MODELS

The experiment’s results are shown in this part, along with
a detailed comparison with current research focused on
practical applications.
We have compared a number of qualities in this part
based on the activities that have an impact on the handling
of transactions of any kind like account verification, user
administration, etc. The first Fig. 16 displays the service
time of users across various infrastructures according to the
maximum number of users that may be supported. This data
may vary on the infrastructure of the Bank.
As a result of human inspections and outdated systems,
account verification and user administration procedures in
traditional banking systems might take a long time. For
example, depending on the infrastructure of the bank and regulatory requirements, the process of creating and verifying an
account in a traditional bank may take several days to weeks.
Conversely, digital banks, CBDCs or our proposed CBDC
192701

## Page 14

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

FIGURE 6. User workflow including registration, transaction initiation, and account management.

FIGURE 7. Administrative dashboard for monitoring user accounts and transactions.

192702

VOLUME 12, 2024

## Page 15

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

FIGURE 8. Registration form.

with blockchain technology use cutting-edge technologies
like automation and artificial intelligence to drastically cut
down on service times to a few hours or even minutes.
We have compared infrastructures on the transaction
costs and amount in the Fig. 17, which illustrates how
the transaction amount might impact the fees during any
transaction process.
In traditional banks, transaction times can increase with
the number of users due to limited processing capacity and
the need for manual oversight. For instance, peak times
can result in delays of several minutes per transaction.
CBDCs, utilizing advanced digital infrastructure, can handle
high volumes of transactions with minimal delays, often
processing transactions in real times or within a few seconds
This graph shows how transaction time can affect the
number of users in Fig. 18. This line graph can differ based
on the infrastructure of the bank and other commodities.
We can observe the impact of the transaction amount on
the clearance time in Fig. 19. While it may not always be
the same, there are instances when the user will benefit
from paying a fee to have certain inquiries answered or legal
difficulties resolved.
Traditional banks often have longer clearance times for
larger transactions, especially for international transfers,
which can take several days due to multiple intermediaries
and regulatory checks. CBDCs can potentially offer nearinstantaneous clearance, leveraging blockchain technology to
settle transactions within minutes.
VOLUME 12, 2024

FIGURE 9. New account created.

B. SECURITY ANALYSIS OF THE PROPOSED SYSTEM

Blockchain technology offers inherent security advantages,
but applying it to a financial sector context with diverse
transaction methods presents specific security challenges.
Our proposed methodology integrates insights from established security frameworks to address these challenges across
various transaction modalities.
•

Key Management and End-to-End Encryption
According to NIST SP (National Institute of Science &
Technology Special Publications) 800-57 [46] and NIST
SP 800-63B [47], sensitive cryptographic keys, such as
private keys used in blockchain transactions, should be
securely managed within a controlled environment. Our
approach includes encryption for data at rest and in transit, as outlined by FISMA (Federal Information Security
Management Act), to achieve end-to-end encryption
across client devices. We recommend utilizing hardware
security modules (HSMs) or secure enclaves, such as
ARM’s TrustZone on Android and Apple’s Secure
Enclave on iOS, for secure key storage. Additionally,
the Public-Key Cryptography Standards (PKCS # 11)
provide guidance for local key generation, reducing
exposure and minimizing risks of key compromise.
Our model suggests a Key Lifecycle Management protocol with automatic key rotation after each transaction,
aligned with ISO/IEC 27001 Control A.10.1.2 [48],
to mitigate key leakage which enhances the confidentiality and integrity of transaction authorizations
192703

## Page 16

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

FIGURE 10. Address stored in database.

FIGURE 11. Sender entering recipient’s address.

on the CBDC model, reducing vulnerability to replay
attacks.
•

OTP-Based Payment Security (Multi-Factor Authentication)
The OTP-based system integrates multi-factor authentication (MFA) in compliance with CIS Control
16 (Application Software Security) and NIST SP
800-63B, specifically for Authenticator Assurance
Level (AAL) 2. It employs dynamic OTPs, which
are delivered through a secure channel, combining the
‘‘something you have’’ factor (e.g., the OTP) with the
‘‘something you know’’ factor (e.g., a password or PIN).
The transmission of OTPs is encrypted using Transport
Layer Security (TLS 1.3), preventing interception or
man-in-the-middle (MITM) attacks, and ensuring confidentiality and integrity in alignment with the NIST
Cybersecurity Framework (NIST CSF) standards.
Additionally, this system follows ISO/IEC 27002
Control A.9.4.2 [49], which recommends the use of
time-based algorithms, such as TOTP (Time-based
One-Time Password Algorithm), for OTP generation.
This methodology significantly enhances security
by protecting against phishing and replay attacks.
The use of encrypted, time-sensitive OTPs ensures
compliance with both temporal and entropy-based
security requirements.

192704

FIGURE 12. Successful transaction prompt.

•

Card-Based Payment Security
For NFC/RFID-based payment methods, the ISO/IEC
14443 [50] and ISO/IEC 7816 standards for contactless
smart cards define secure protocols that establish mutual
authentication between devices, ensuring an encrypted
session to prevent unauthorized eavesdropping. This
system also integrates CIS Control 13.7 (Encrypt Mobile
Device Data), which mandates data encryption during
NFC exchanges to safeguard against data interception
and relay attacks.
User identity verification utilizes a secret key or PIN,
which is authenticated and processed on the backend.
This approach complies with PCI-DSS (Payment
Card Industry Data Security Standard) requirements
for card-based transaction security and adheres to
ISO/IEC 27001 Control A.9.4.3, which requires mutual
authentication and session encryption during card
transactions.

•

Multi-Factor Authentication (MFA) Integration
The implementation of MFA involves three components:
password (knowledge), OTP or card (possession), and
optionally, biometric authentication (inherence). This
approach complies with NIST SP 800-63B requirements
for AAL3, the highest assurance level for digital
identity. By combining these factors, the system reduces
the risk of unauthorized access and protects against

VOLUME 12, 2024

## Page 17

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

FIGURE 13. Transaction details stored in database.

FIGURE 14. Admin dashboard.

brute-force attacks. Additionally, by recording each
authentication event on the blockchain, a tamperevident audit trail is created, supporting compliance with
NIST CSF PR.PT-1 (Audit Logging) and ISO/IEC
27001 Control A.12.4.1 (Event Logging).
•

Frontend and Blockchain Integration Security
Securing the frontend of a blockchain-based digital
finance system is critical to protect user data from
potential vulnerabilities. To address common attack
vectors such as XSS, CSRF, and clickjacking, security

VOLUME 12, 2024

FIGURE 15. Transaction history.

measures are implemented following the OWASP (Open
Worldwide Application Security Project) Application
Security Verification Standard (ASVS) Level 2. These
include content security policy (CSP) headers, crossorigin resource sharing (CORS) policies, and client-side
data encryption.
To ensure data integrity, SHA-256 hashing is used on
the client side before sending data to the blockchain
backend, preventing tampering. Additionally, a secure
communication pipeline is established between the
frontend and backend using end-to-end encryption.
192705

## Page 18

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

FIGURE 16. Comparison of user service time across infrastructures,
highlighting how the number of users impacts the processing time.

FIGURE 18. Impact of transaction time on the number of users,
demonstrating how infrastructure influences transaction delays.

FIGURE 17. The relationship between transaction fees and the
transaction amount, showing how higher transaction amounts
can result in higher fees.

FIGURE 19. Effect of transaction amount on clearance time, showing how
larger transactions may require more time for processing.

This approach complies with ISO/IEC 27002 Controls
A.13.2.1 (Information Transfer Policies and Procedures)
and A.13.2.3 (Electronic Messaging).
Real-Time Monitoring and Auditing
Continuous monitoring is implemented in alignment
with CIS Control 6 (Maintenance, Monitoring, and
Analysis of Audit Logs) and NIST CSF DE.AE
(Anomalies and Events). Automated alerts are configured to detect unusual behavior, and regular security
assessments are conducted to ensure the timely identification of potential security breaches. Transaction and
audit logs stored on the blockchain provide tamper-proof
records, supporting compliance with ISO/IEC 27001
Control A.12.4.3 (Protection of Log Information) and
enabling forensic analysis when needed.
The proposed blockchain-based digital finance system incorporates robust security measures aligned with
•

192706

established cybersecurity frameworks to ensure secure
transactions across various payment methods. By adhering
to standards such as NIST CSF, CIS Controls, ISO/IEC
27001, and OWASP ASVS, the system establishes a
multi-layered security approach that safeguards transaction
integrity, protects user data confidentiality, and ensures
system availability.
VII. LIMITATIONS AND FUTURE WORKS

Central banking, rooted in trust and responsive to technological advancements, will continue evolving alongside digital
innovations, maintaining critical roles in money issuance,
settlement systems, and monetary policy while adapting to
global economic shifts [51]. While our research demonstrates
the transformative potential of CBDCs, several opportunities
for further enhancement and exploration remain:
• Scalability & Interoperability
– Addressing scalability is crucial to managing large
transaction volumes efficiently. As the adoption
VOLUME 12, 2024

## Page 19

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

of CBDCs grows, the system must be capable
of processing extensive numbers of transactions
without compromising speed or reliability.
– Ensuring interoperability with existing financial
systems and other digital payment platforms is vital
for seamless integration and broader acceptance.
Developing strategies to enhance compatibility will
facilitate more seamless transitions and increase the
utility of CBDCs.
• User Adoption and Trust
– Building user adoption and trust is vital for the
success of CBDCs, necessitating concerted efforts
to foster public confidence.
– Improving digital literacy is essential to enable
all users to effectively utilize CBDCs. Educating
the public about the benefits and security features
of CBDCs can mitigate resistance and enhance
acceptance.
• Economic Implications
– A thorough investigation is needed into the economic implications of widespread CBDC adoption,
particularly its impacts on monetary policy and
financial stability. This includes understanding
potential effects on interest rates, banking sector
dynamics, and economic cycles.
• Technological Advancements
– Keeping pace with rapid technological changes to
ensure the CBDC system remains relevant and
effective.
– Continuously updating and improving the technology to enhance security and efficiency.
• Operational Challenges
– Ensuring regulatory compliance to facilitate smooth
implementation and sustainability.
– Overcoming operational challenges is necessary
to achieve the seamless functioning of the CBDC
ecosystem.
Future research should focus on these areas to ensure
the successful and sustainable implementation of CBDCs,
enabling them to revolutionize financial systems and position
economies for growth in the digital age.
VIII. CONCLUSION

This research delves into the implementation of a blockchainbased CBDC, highlighting its transformative potential
for modern financial systems. By combining centralized
oversight with decentralized transaction mechanisms, our
approach aims to enhance economic growth and stability through digital currency platforms. Key achievements
include leveraging blockchain for an immutable and transparent ledger, thus reducing financial fraud and enhancing
accountability; fostering an inclusive financial system by
integrating digital identities and diverse transaction methods
(online, smart card, and offline OTP) to ensure broad
user inclusion; and enabling effective centralized control
VOLUME 12, 2024

by allowing the central bank to manage digital identities
and currency distribution for better oversight and monetary policy implementation. Overall, CBDCs promise to
improve transaction security, efficiency, and transparency,
streamline financial operations by reducing transaction fees,
and promote financial inclusion, while reducing fraud and
facilitating efficient cross-border transactions. Future studies
should concentrate on improving scalability to manage
high transaction volumes, encouraging interoperability with
current systems, establishing public trust through digital
literacy and education campaigns, and analyzing the financial
stability and monetary policy effects of CBDC adoption.
Addressing operational problems will also require regulatory compliance and technological agility. With these
developments, CBDCs could completely transform financial
institutions, guaranteeing economic growth, modernity, and
resilience in a world that is becoming more and more digital.
REFERENCES
[1] F. Allen, X. Gu, and J. Jagtiani, ‘‘Fintech, cryptocurrencies, and CBDC:
Financial structural transformation in China,’’ J. Int. Money Finance,
vol. 124, Jun. 2022, Art. no. 102625.
[2] V. Sethaput and S. Innet, ‘‘Blockchain application for central bank digital
currencies (CBDC),’’ Cluster Comput., vol. 26, no. 4, pp. 2183–2197,
Aug. 2023.
[3] P. A. Petare, H. P. Josyula, S. R. Landge, S. K. K. Gatala, and
S. R. Gunturu, ‘‘Central bank digital currencies: Exploring the future of
money and banking,’’ Migration Lett., vol. 21, no. S7, pp. 640–651, 2024.
[4] D. M. Sakharov, ‘‘Central bank digital currencies: Key aspects and
impact on the financial system,’’ Finance, Theory Pract., vol. 25, no. 5,
pp. 133–149, Oct. 2021.
[5] P. K. Ozili, ‘‘Central bank digital currency research around the world:
A review of literature,’’ J. Money Laundering Control, vol. 26, no. 2,
pp. 215–226, Mar. 2023.
[6] M. Javaid, A. Haleem, R. P. Singh, R. Suman, and S. Khan, ‘‘A review of
blockchain technology applications for financial services,’’ BenchCouncil
Trans. Benchmarks, Standards Evaluations, vol. 2, no. 3, Jul. 2022,
Art. no. 100073.
[7] N. Dashkevich, S. Counsell, and G. Destefanis, ‘‘Blockchain application
for central banks: A systematic mapping study,’’ IEEE Access, vol. 8,
pp. 139918–139952, 2020.
[8] Y. Guo and C. Liang, ‘‘Blockchain application and outlook in the banking
industry,’’ Financial Innov., vol. 2, no. 1, pp. 1–12, Dec. 2016.
[9] Y. Lee, B. Son, S. Park, J. Lee, and H. Jang, ‘‘A survey on security and
privacy in blockchain-based central bank digital currencies,’’ J. Internet
Services Inf. Secur., vol. 11, no. 3, pp. 16–29, Aug. 2021.
[10] S. L. N. Alonso, J. Jorge-Vazquez, and R. F. R. Forradellas, ‘‘Central banks
digital currency: Detection of optimal countries for the implementation
of a CBDC and the implication for payment industry open innovation,’’
J. Open Innov., Technol., Market, Complex., vol. 7, no. 1, p. 72, Mar. 2021.
[11] M. A. Mohammed, C. De-Pablos-Heredero, and J. L. M. Botella,
‘‘Exploring the factors affecting countries’ adoption of blockchain-enabled
central bank digital currencies,’’ Future Internet, vol. 15, no. 10, p. 321,
Sep. 2023.
[12] L. Mainetti, M. Aprile, E. Mele, and R. Vergallo, ‘‘A sustainable approach
to delivering programmable peer-to-peer offline payments,’’ Sensors,
vol. 23, no. 3, p. 1336, Jan. 2023.
[13] Y. Chu, J. Lee, S. Kim, H. Kim, Y. Yoon, and H. Chung, ‘‘Review of offline
payment function of CBDC considering security requirements,’’ Appl. Sci.,
vol. 12, no. 9, p. 4488, Apr. 2022.
[14] R. A. Canessane, N. Srinivasan, A. Beuria, A. Singh, and B. M. Kumar,
‘‘Decentralised applications using Ethereum blockchain,’’ in Proc. 5th Int.
Conf. Sci. Technol. Eng. Math. (ICONSTEM), vol. 1, Mar. 2019, pp. 75–79.
[15] M. Bouchaud, T. Lyons, M. S. Olive, K. Timsit, S. Adinolfi, B. Calmejane,
and M. Singer, ‘‘Central banks and the future of digital money,’’
ConsenSys, Fort Worth, TX, USA, White Paper, 2020, pp. 1–20.
192707

## Page 20

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

[16] T. Zhang and Z. Huang, ‘‘Blockchain and central bank digital currency,’’
ICT Exp., vol. 8, no. 2, pp. 264–270, Jun. 2022.
[17] A. A. Ahmed, A. A. Saidu, and J. H. Kawure, ‘‘The role of central bank
digital currency on features, perceived benefits and challenges compared
to physical currency,’’ Traditional J. Law Social Sci., vol. 1, pp. 21–67,
May 2022.
[18] Y. Zhang, B. Gong, and P. Zhou, ‘‘Centralized use of decentralized
technology: Tokenization of currencies and assets,’’ Struct. Change Econ.
Dyn., vol. 71, pp. 15–25, Dec. 2024.
[19] J. Tayazime and A. Moutahaddib, ‘‘DeFi, blockchain and cryptocurrencies:
Proposing a global money matrix for the blockchain era,’’ Eur. Sci. J.,
vol. 19, no. 16, p. 160, Jun. 2023.
[20] T. Hansen and K. Delak, ‘‘Security considerations for a central bank digital
currency,’’ FEDS Notes, vol. 2022, p. 2970, Feb. 2022.
[21] M. M. Antunez, Understanding CBDC Money and Blockchain. Norderstedt, Germany: BOD GmbH DE, 2023.
[22] Central Bank Digital Currencies: Foundational Principles and Core
Features, Bank Int. Settlements (BIS), Basel, Switzerland, 2020.
[23] S. Islam, M. J. Islam, M. Hossain, S. Noor, K.-S. Kwak, and S. M. R. Islam,
‘‘A survey on consensus algorithms in blockchain-based applications:
Architecture, taxonomy, and operational issues,’’ IEEE Access, vol. 11,
pp. 39066–39082, 2023.
[24] Bhawana and S. Kumar, ‘‘Permission blockchain network based central
bank digital currency,’’ in Proc. IEEE 4th Int. Conf. Comput., Power
Commun. Technol. (GUCON), Sep. 2021, pp. 1–6.
[25] I. Kocsis, L. Gönczy, A. Klenik, P. Varga, A. Frankó, and B. Oláh,
‘‘Research report CBDC-based smart contract ecosystems,’’ MNB-BME,
Budapest, Hungary, 2021.
[26] R. Vergallo and L. Mainetti, ‘‘The role of technology in improving the
customer experience in the banking sector: A systematic mapping study,’’
IEEE Access, vol. 10, pp. 118024–118042, 2022.
[27] P. Wong and J. L. Maniff, ‘‘Comparing means of payment: What role
for a central bank digital currency?’’ FEDS Notes, vol. 2020, p. 2739,
Aug. 2020.
[28] J. Lovejoy, C. Fields, M. Virza, T. Frederick, D. Urness, K. Karwaski,
A. Brownworth, and N. Narula, ‘‘A high performance payment processing
system designed for central bank digital currencies,’’ Cryptol. ePrint Arch.,
p. 1, May 2022.
[29] F. Tronnier, ‘‘Privacy in payment in the age of central bank digital
currency,’’ in Proc. IFIP Int. Summer School Privacy Identity Manage.,
Maribor, Slovenia, 2021, pp. 96–114.
[30] T. Tunzina, M. A. K. Chayon, P. G. Jitu, M. U. Ankon, S. N. Joy,
R. K. Shaha, M. M. Islam, and M. S. Hussain, ‘‘CBDC: Implementation
of central bank digital currency using blockchain,’’ in Proc. 12th Int. Conf.
Frontiers Intell. Comput., Theory Appl. (FICTA), London, U.K., 2024.
[31] D. Niepelt, ‘‘Monetary policy with reserves and CBDC: Optimality,
equivalence, and politics,’’ Centre Econ. Policy Res. (CEPR), London,
U.K., Tech. Rep. DP15457, 2020.
[32] J. Zhang, R. Tian, Y. Cao, X. Yuan, Z. Yu, X. Yan, and X. Zhang,
‘‘A hybrid model for central bank digital currency based on blockchain,’’
IEEE Access, vol. 9, pp. 53589–53601, 2021.
[33] M. Selim, ‘‘Countercyclical monetary policy for overcoming COVID 19
induced recession by introducing incentive based digital currency,’’ in
Proc. Int. Conf. Data Anal. Bus. Ind., Way Towards Sustain. Economy
(ICDABI), Oct. 2020, pp. 1–6.
[34] Y.-L. Gao, X.-B. Chen, Y.-L. Chen, Y. Sun, X.-X. Niu, and Y.-X. Yang,
‘‘A secure cryptocurrency scheme based on post-quantum blockchain,’’
IEEE Access, vol. 6, pp. 27205–27213, 2018.
[35] S. He, X. Xing, G. Wang, and Z. Sun, ‘‘A data integrity verification scheme
for centralized database using smart contract and game theory,’’ IEEE
Access, vol. 11, pp. 59675–59687, 2023.
[36] T. M. Fernández-Caramès and P. Fraga-Lamas, ‘‘Towards post-quantum
blockchain: A review on blockchain cryptography resistant to quantum
computing attacks,’’ IEEE Access, vol. 8, pp. 21091–21116, 2020.
[37] H. Sun, H. Mao, X. Bai, Z. Chen, K. Hu, and W. Yu, ‘‘Multi-blockchain
model for central bank digital currency,’’ in Proc. 18th Int. Conf. Parallel
Distrib. Comput., Appl. Technol. (PDCAT), Dec. 2017, pp. 360–367.
[38] X. Han, Y. Yuan, and F.-Y. Wang, ‘‘A blockchain-based framework for
central bank digital currency,’’ in Proc. IEEE Int. Conf. Service Oper.
Logistics, Informat. (SOLI), Nov. 2019, pp. 263–268.
[39] B. Lashkari and P. Musilek, ‘‘A comprehensive review of blockchain
consensus mechanisms,’’ IEEE Access, vol. 9, pp. 43620–43652, 2021.
192708

[40] A. Tsareva, Y. Madhwal, and Y. Yanovich, ‘‘CBDC consensus algorithm
design choice,’’ in Proc. 6th Int. Conf. Blockchain Technol. Appl.,
Dec. 2023, pp. 12–18.
[41] P. Szilšgyi. (Mar. 2017). EIP-225: Clique Proof-of-Authority Consensus
Protocol. Ethereum Improvement Proposals. Accessed: Nov. 11, 2024.
[Online]. Available: https://eips.ethereum.org/EIPS/eip-225
[42] Consensys. CBDC Solutions. Accessed: Nov. 11, 2024. [Online]. Available: https://consensys.io/solutions/payments-and-money/cbdc
[43] S. Tikhomirov, ‘‘ETHEREUM: State of knowledge and research perspectives,’’ in Proc. 10th Int. Symp. Found. Pract. Secur., Nancy, France. Cham,
Switzerland: Springer, Jan. 2018, pp. 206–221.
[44] Ganache. Accessed: Nov. 11, 2024. [Online]. Available: https://archive.
trufflesuite.com/ganache/
[45] V. P. Ranganthan, R. Dantu, A. Paul, P. Mears, and K. Morozov, ‘‘A
decentralized marketplace application on the Ethereum blockchain,’’
in Proc. IEEE 4th Int. Conf. Collaboration Internet Comput. (CIC),
Oct. 2018, pp. 90–97.
[46] B. Elaine, ‘‘Recommendation for key management, Part 1: General,’’
NIST, Gaithersburg, MD, USA, Special Publication 800-57, 2020, vol. 1,
no. 5, pp. 1–171, doi: 10.6028/NIST.SP.800-57pt1r5.
[47] P. A. Grassi, J. L. Fenton, E. M. Newton, R. Perlner, A. Regenscheid,
W. E. Burr, J. P. Richer, N. Lefkovitz, J. M. Danker, Y. Y. Choong,
and K. K. Greene, ‘‘Digital identity guidelines: Authentication and
lifecycle management,’’ NIST Special Publication, Gaithersburg, MD,
USA, Tech. Rep. 800-63B, 2020, doi: 10.6028/NIST.SP.800-63b.
[48] ISO/IEC 27001 Control Annex 10. Accessed: Nov. 11, 2024. [Online].
Available: https://www.isms.online/iso-27001/annex-a-10-cryptography/
[49] ISO/IEC 27001 Control Annex 9. Accessed: Nov. 11, 2024. [Online].
Available: https://www.isms.online/iso-27001/annex-a-9-access-control/
[50] L. Pankaczi and M. Eldefrawy, ‘‘Enhancing the security of ISO/IEC 144433 and 4 RFID authentication protocols through formal analysis,’’ in Proc.
IEEE Int. Conf. Omni-layer Intell. Syst. (COINS), Jul. 2023, pp. 1–6.
[51] E. Kabaklarlı, ‘‘Future of money: Cryptocurrencies, blockchain technology
and central bank digital currency,’’ in Proc. Int. Academic Conf. Manage.
Econ., Barcelona, Spain, 2021, pp. 1–4.

TAYRIN TUNZINA is currently pursuing the B.Sc.
degree in computer science and engineering with
a major in software with United International University (UIU). Proficient in various programming
languages, she is interested in software development, mobile applications, and software quality
assurance, with research interests in blockchain,
AI, machine learning, digital image processing,
and the IoT. She has received multiple accolades
at the UIU CSE Project Show and the Best
Paper Award at the FICTA-2024 Conference held at London Metropolitan
University.

MD ASIF KARIM CHAYON received the Bachelor of Science degree in computer science
and engineering (CSE) from United International
University, Bangladesh (UIU). His major is in
software engineering and he is interested in
the Internet of Things (IoT), cloud computing,
cybersecurity, UI/UX research, green computing,
and artificial intelligence. He has proven to
develop different software using various types of
frameworks.
VOLUME 12, 2024

## Page 21

T. Tunzina et al.: Blockchain-Based Central Bank Digital Currency: Empowering Centralized Oversight

PRITAM GUPTA JITU is currently pursuing the
B.Sc. degree in computer science and engineering
with United International University. His work
focuses on web development, blockchain, software
testing, and image processing. He is researching
blockchain, AI, and image processing, and collaborates with Prof. Motaharul Islam on projects in
the IoT, computer security, and green computing.
As an enthusiastic learner, he aims to deepen his
expertise in computer science.

MOSAMMED UPNAN ANKON is currently pursuing the bachelor’s degree in computer science
and engineering with a major in software engineering at United International University, Bangladesh.
Guided by Prof. Md. Motaharul Islam, her
research interests include web development, computer security, AI, image processing, blockchain,
and software testing. She is involved in projects
on the IoT, blockchain, and digital image processing, and has received awards in UIU’s CSE
Project Show.

SHEIKH NAHIDUZZAMAN JOY received the
Diploma degree in engineering and computer science and the B.Sc. degree in computer science and
engineering from United International University.
He has taken several computer-related courses.
He enjoys solving new problems and is dedicated
to continuous learning. He is always seeking new
educational opportunities to expand his knowledge
and skills in the field of computer science.

REDOY KUMAR SHAHA is currently pursuing
the bachelor’s degree in computer science at
United International University. With a solid
background in web development and software
methodology, he has experience in a range of
technologies, including Python, Java, MySQL,
HTML, CSS, Django, WordPress, and Arduino.
He is an active participant in software development, has contributed to several group projects,
and has achieved several positions in various club
competitions.

VOLUME 12, 2024

MD. MOTAHARUL ISLAM (Member, IEEE)
received the Ph.D. degree in computer engineering from Kyung Hee University, South Korea,
in 2013. He has been a Professor with the
Department of Computer Science and Engineering, United International University (UIU), Dhaka,
Bangladesh, since 2020. Previously, he was with
institutions, such as the Islamic University of
Madinah, Saudi Arabia, and Brac University.
He has published around 100 articles over the past
decade. His research interests include the smart Internet of Things, IP-based
wireless sensor networks (IP-WSN), WSN virtualization, cloud computing,
and green computing.

MUHAMMAD
SHAKHAWAT
HUSSAIN
received the M.Sc. degree in mathematics from
the University of Chittagong, and the M.B.A.
degree in IT from Staffordshire University, U.K.
He is currently a Senior Investment Analyst with
AFI Ventures, Dubai, United Arab Emirates. With
further academic credentials from Asia Pacific
University, Malaysia, he combines his expertise in
mathematics and IT to provide strategic insights
in investment analysis, with a focus on blockchain
and Web3 technologies.

MOHAMMAD MEHEDI HASSAN (Senior
Member, IEEE) received the Ph.D. degree in
computer engineering from Kyung Hee University.
He is currently a Full Professor with the
Information Systems Department, King Saud
University. He has published over 375 works, with
333 in SCI/ISI-indexed journals. A top expert in
cloud/edge computing and AI, he is among the top
2% of scientists globally. He received awards, such
as the Distinguished Researcher Award in 2020.
He serves on conference committees and editorial boards.

PHUOC HUNG PHAM received the B.S. degree
in computer engineering from Vietnam National
University, Ho Chi Minh City, the M.S. degree
in computer science from Dongguk University,
South Korea, and the Ph.D. degree in computer engineering from Kyung Hee University,
South Korea. He is currently a Visiting Assistant
Professor with Providence College, Providence,
RI, USA, and a Lecturer with Nguyen Tat Thanh
University, Vietnam. His research interests include
resource allocation, parallel computing, data mining, and cloud and fog
computing.

192709
