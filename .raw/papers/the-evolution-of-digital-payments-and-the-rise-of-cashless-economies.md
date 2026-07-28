---
source_type: pdf
title: "The Evolution of Digital Payments and the Rise of Cashless Economies"
original_file: "thesis/reference/The_Evolution_of_Digital_Payments_and_the_Rise_of_Cashless_Economies.pdf"
sha256: "6ad93485dc997c3b91d59948259ccfc3dec49066f1af3047ffc84685df30ef91"
page_count: 7
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: The Evolution of Digital Payments and the Rise of Cashless Economies

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Proceedings of the 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL-2026)
IEEE Xplore Part Number: CFP26UU5-ART; ISBN: 979-8-3315-6883-2

2026 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL) | 979-8-3315-6883-2/26/$31.00 ©2026 IEEE | DOI: 10.1109/ICSADL67539.2026.11452023

The Evolution of Digital Payments and the Rise of
Cashless Economies
Tilak Kale
Department of Artificial Intelligence &
Data Science, Faculty of
Engineering and Technology, Datta
Meghe Institute of Higher Education
and Research,
Wardha, Maharashtra, India 442001
tilakkale@gmail.com

K.T.V Reddy
Department of Artificial Intelligence &
Data Science, Faculty of
Engineering and Technology, Datta
Meghe Institute of Higher Education
and Research,
Wardha, Maharashtra, India 442001
ktvreddy.feat@dmiher.edu.in

Harshraj N. Gadbail
Department of Artificial Intelligence &
Machine Learning, Faculty of
Engineering and Technology, Datta
Meghe Institute of Higher Education
and Research,
Wardha, Maharashtra, India 442001
harshraj8140@gamil.com

Nishant Rajendra Jumde
Department of Artificial Intelligence &
Machine Learning, Faculty of
Engineering and Technology, Datta
Meghe Institute of Higher Education
and Research,
Wardha, Maharashtra, India 442001
nishantjumde11@gmail.com

Saksham Khode
Department of Computer Science &
Medical Engineering, Faculty of
Engineering and Technology, Datta
Meghe Institute of Higher Education
and Research,
Wardha, Maharashtra, India 442001
khodesaksham2020@gmail.com

Pratik Kale
Department of Computer Science &
Medical Engineering, Faculty of
Engineering and Technology, Datta
Meghe Institute of Higher Education
and Research,
Wardha, Maharashtra, India 442001
pratikkale7777@gmail.com

Abstract—Digital payment systems are one of the significant
building blocks of modern financial infrastructure that allow
the transformation of a cash-based economy to a cashless one.
The innovation of mobile computing, real-time communication
networks, cryptography, and the interoperability of APIs have
greatly lowered transactional friction and enhanced financial
accessibility. The current literature discusses security with
mobile payments, settlement systems based on blockchain, and
adoption patterns but fails to provide a viewpoint on a system
level, system architecture, and technology, security, and
governance aspects. This gap is addressed in this study, which
proposes a common reference architecture for digital payment
systems and provides a layer-by-layer security and privacy
analysis. This study refers to a real-time retail payment system
as a reference case to draw practical design information. Major
drivers, challenges, and sustainability issues are discussed in the
study, including interoperability, cybersecurity, digital
inclusion, and the new role of Central Bank Digital Currencies.
The results can be used to design safe, scalable, and resilient
cashless payment systems.
Keywords—Digital Payments, Cashless Economy, FinTech,
Real-Time Payments, Blockchain, CBDC, Payment Architecture

I. INTRODUCTION
Digital payment platforms have become part of the
contemporary financial system, allowing the replacement of
cash-based transactions with cashless economies. Mobile
computing, real-time communication networks, and the
security of transaction networks have enabled the extensive
implementation of mobile wallets, contactless payment
protocols, and real-time account-to-account transfer systems.
These technologies are now used to sustain high-volume and
low-latency transactions and are progressively being
considered a key national financial infrastructure [8].

Although these efforts provide valuable information, they
mostly do not conduct any system-level architectural study
that discusses how heterogeneous elements Additionally, the
security and privacy issues of digital payment systems are
frequently addressed in a generalized way and not mapped
directly to the accepted architectural layers. This impedes the
evaluation of systemic vulnerability and mitigation
performance with the acquisition of payment infrastructure.
These fears are further heightened by the coming up of Central
Bank Digital Currencies because available literature does not
tell much about how the CBDCs can be used in coexistence
with the proven real-time payments framework without
adding new security or operational risks.[1],[4].
This study fills these gaps by analyzing digital payments in
terms of the architectural perspective of the system level. The
primary contributions of this study are three-fold: (i) the
suggestion of a common reference architecture for presentday digital payment systems that can support cashless
economies; (ii) a layer-level analysis of security and privacy
goals that defines the main threat vectors and the mechanisms
of their mitigation; and (iii) applauded by a real-time payment
system, the development of a set of design suggestions
applicable to the creation of scalable and stable cashless
infrastructures[5].
A. Background and Evolution of Digital Payment Systems

Previous studies have explored digital payments from
isolated perspectives, such as secure mobile payment
applications, biometric authentication processes, blockchainbased settlement systems, and user adoption models.

979-8-3315-6883-2/26/$31.00 ©2026 IEEE

1565

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:15 UTC from IEEE Xplore. Restrictions apply.

## Page 2

Proceedings of the 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL-2026)
IEEE Xplore Part Number: CFP26UU5-ART; ISBN: 979-8-3315-6883-2

The digital payment systems are no longer seen as cash and
card-based instruments but online banking systems, mobile
wallets, and real-time account-to-account transfer systems.
Old systems upon use of electronic payments used to rely on
batch settlement and card networks but in modern systems, the
focus lies on instant settlement, interoperability, and low
transaction costs. Live payment systems allow funds to be
accessible instantly and have taken center stage in the national
cashless plans. More so, more recently, there has been the
introduction of systems based on blockchain-based systems
and Central Bank Digital Currencies (CBDCs), which have
brought about programmable settlement and new governance
considerations [4].
The contemporary digital payments may be placed into four
categories, namely, (i) card networks, (ii) wallet-based
platforms, (iii) real-time payment infrastructures, and (iv)
blockchain-based and CBDC systems. All models are
differentiating in terms of settlement latency, security
assumptions and also operational complexity which justifies
a system level comparison [2].
The various payment models vary greatly in the finality of
settlement, trust assumptions, scalability and governance
design. Card networks are built on the use of centralized
processors that settle slowly and wallet-powered platforms
focus on user experience but create platform dependency.
Instant settlement and interoperability are the top priorities of
real-time payment infrastructures, and the blockchain-based
system and CBDC implement programmability and
cryptographic trust at the expense of more complex
operations. These variations have an impact on system
scalability, security architecture and policy implications.
Beyond the variation in the latency and trust, digital payment
models vary in terms of clearing and settlement processes.
Multi-stage clearing processes are used in card networks and
they include issuing banks, acquiring banks and card
schemes, and settlement takes place after authorizing the
transactions. Platforms that are wallet based usually
consolidate user balances in platform-controlled accounts,
which present custodial risk. Account-to-account settlement
directly between regulated financial institutions is used in
real-time payment infrastructures, and allows finality.
Blockchain and CBDC systems introduce a system based on
a ledger settlement whereby ownership is recorded on a
shared or central bank managed digital ledger. These
diverging settlement models have significant implications on
liquidity, risk of fraud, regulatory control and stability of
systems.[5],[4].
Therefore, the available studies have investigated these
payment models in various technological and operational
facets, which are discussed in the section below [8].
II. LITERATURE REVIEW
The study on digital payment systems and cashless
economies covers a variety of technological fields, such as
mobile payment systems, blockchain-based settlement
systems, cross-border digital currencies and sustainabilityfocused payment systems. In spite of this, these studies are
mostly pieced together in terms of application-level,
blockchain level, and policy level and there is scarce
integration across the system level [2].

A. Mobile and wallet—Based Payment Systems
There is an extensive literature that aims at enhancing the
security, usability and accessibility of mobile payment
systems. Research on secure mobile payment architecture has
placed emphasis on the use of encryption, tokenization and
multi factor authentication to safeguard the user credentials
and transaction data. Models of fingerprint-based
authentication have also been put forward as a way of
improving usability and trust, especially when it comes to
older users, who do not need to rely on passwords and manual
typing. End to end surveys of secure mobile payments are used
to study authentication frameworks, communications security,
and application level threat mitigation [3].
Whereas the approaches enhance the security and adoption of
the end-users, they mostly work at the application layer. They
pay no attention to the interaction of mobile wallets with
payment switches, interbank settlement networks or
regulatory infrastructures, and are useful only to nation-scale
cashless economies.
B. Blockchain-Based Payment and Settlement Systems
The research on blockchain discussed issues of universal
trading of digital assets, ensuring the safety of contracts and
decentralized settlement systems. The research on the
vulnerability of the use of smart contracts pinpoints
vulnerabilities like re-entrancy, logic bugs and unauthorized
access, whereas transaction analysis methods are applied to
fraud and malicious behavior in order to identify them using
an abnormal pattern of transactions. Digital asset systems
across chains and royalty-compatible exchange frameworks
are trying to enhance interoperability, transparency, and trust
in blockchain-based payment systems [8].
The bulk of blockchain payment systems are not
developed as large-volume retail and do not usually
accommodate real time banking infrastructure, and thus
cannot stand on their own as cashless payment systems
C. Cross-Border and Consortium Blockchain Payment
Models
A number of studies suggest consortium based blockchain
systems to facilitate low cost and auditable global payments.
These models are based on permissioned ledgers, multisignature protocols, and decentralised identifiers and offer
privacy, compliance and transparency. These systems
decrease the dependence on the correspondent banking
system and elevate the ability of international settlements.
Although they have the merits associated with cross-border
transfer, such systems are normally based on the controlled
participation and specialized infrastructures. They make no
reference to the high frequencies and open-access character
of domestic retail payment ecosystems, or to architecture
integration with extant real-time payment systems.[6],[7].
D. Sustainability and Trend-Based Studies
Bibliometric and topic-modeling are the research trends of
sustainable electronic payment systems measured and reveal
an expansion of research on the topic in the fields of secured
payments, financial inclusion, and digitalization. These
papers draw out the differences in research focus in the area
of security, cloud-based payment methods, and future digital
payment methods. Though these studies are very useful at the
macro level they do not include the technical and

979-8-3315-6883-2/26/$31.00 ©2026 IEEE

1566

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:15 UTC from IEEE Xplore. Restrictions apply.

## Page 3

Proceedings of the 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL-2026)
IEEE Xplore Part Number: CFP26UU5-ART; ISBN: 979-8-3315-6883-2

architectural advice. They cannot therefore tell the design of
robust, scalable and interoperable payment infrastructures
that are necessary to support cashless economies [8].
TABLE I.

Work
Mobile
payment
models
Smart
contract
studies
Crossborder
blockchain
E-payment
trend
analysis
This work

COMPARISON OF PRIOR WORK AND THIS STUDY

Focus
App
security

Tech
Biometrics,
MFA

Scope
Wallets

Limitation
No system
view

Blockchain

DLT

Crypto

Not retail

Settlement

Consortium
chain

Intl.

Policy

Topic
modeling

Macro

Cashless
systems

Architecture
+ security

End-toend

No
domestic
RTP
No
technical
model
—

Table I Comparison of Prior Work vs This Paper
E. Research Gaps and Motivation
1) Lack of a harmonized end-to-end payment framework
which embodies user interfaces, payment applications,
payment networks and settlement layers in one cashless
environment.
2) This is due to the absence of the layer-by-layer security
and privacy modeling of digital payment infrastructures that
would allow developing a systematic comprehension of the
threats spread between users, applications, networks, and
settlement mechanisms.
3) The recognized lack of technical study of real-time
retail payment systems even though it is so vital as the base
of the contemporary cashless economies.
4) The lack of architectural advice on the coexistence
between Central Bank Digital Currencies (CBDCs) and the
current payment infrastructures, specifically in the area of
interoperability, governance, and systemic stability.
III. METHODOLOGY
The paper shall employ a system-based, architecturebased method of analyzing digital payment infrastructures that
underpin cashless economies in which the performance-based
analysis is indicated by simulation-based analysis. Unlike
application or technology insured approaches, the proposed
methodology of the approach illustrates payment systems as
integrated socio-technical structures where transaction
processing, security, settlement and governance are correlated
at various levels of architecture in a controllable load
environment that is difficult to observe in running payment
infrastructures.
A. Study Design
The paper analyses significant digital payment paradigms that
inform contemporary cashless economies to comprise cardbased networks, wallet-centric platforms, real-time accountto-account payment systems and blockchain-based or CBDCenabled systems. Although all of the paradigms are evaluated
through the lens of architecture and security aspects, real-time
payment (RTP) systems are chosen to be the experimental

subject as it lies at the core of highly-volatile and low-latency
retail transactions [2].
B. Layered Architecture
The payment paradigms are all mapped to a five layer
reference architecture, including the user layer, application
layer, the layer of payment processing and switching,
settlement layer, and the governance layer. This abstraction
is the entire end-to-end payment life cycle including how the
users initiate a transaction, regulatory oversight, and
settlement. The layered modeling approach addresses the
absence of unified architectural representations in the
existing literature with the help of the provision of the
common structural framework of the analysis of
heterogeneous payment technologies[3].
C. Security and Pricacy Evalution Framework
The layer-wise analysis evaluates security and privacy
threat through a layer-wise assessment framework and in line
with the proposed architecture. The threats to include identity
compromise, application-level, network interception, data
leakage, and settlement manipulation are defined in
accordance with earlier studies of secure mobile payments and
blockchain security. The mitigation mechanisms are
associated with respective architectural layers, such as multifactor authentication, biometric verification, cryptographic
protection, secure APIs, monitoring transactions, and audit
trails, among others. Privacy is considered based on the
exposure of data, traceability of transactions and regulatory
compliance, especially in real time payment and
CBDC.[2],[6].
D. Performance Evaluation Model
To perform the experimental analysis, the real-time payment
system is modelled into four operational units: sender bank,
centralized payment switch, receiver bank and settlement
layer. The payment is processed sequentially whereby the
transaction processing begins at the sender bank, then routing
and validation of the transaction at the payment switch, credit
processing at the receiver bank, and the settlement. The
payment switch is characterized as a common resource with
limited processing capacity as their criticality during the
process of routing transactions and interoperability. This
abstraction allows one to observe the effects of queueing, the
behavior of congestion and the saturation of throughput with
an increasing load of transactions.
E. Simulation Environment
A discrete-event simulation framework is considered to
evaluate the system. The randomized delay distributions are
used to model transaction processing delays at the sending
banks, payment switch, and receiving banks whereas
settlement latency is modeled as a fixed delay. The
transaction arrivals are created with adjustable rates to
simulate the low-load and high-load situations. Every
simulation is run 60 seconds to obtain steady-state system
behavior in response to each of the various transaction arrival
rates and payment switch capacity settings [6].
F. Performance Metrics
The metrics used to determine system performance are:

979-8-3315-6883-2/26/$31.00 ©2026 IEEE

1567

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:15 UTC from IEEE Xplore. Restrictions apply.

## Page 4

Proceedings of the 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL-2026)
IEEE Xplore Part Number: CFP26UU5-ART; ISBN: 979-8-3315-6883-2

•
•
•
•

Average Latency: This is the average end-to-end
transaction time to complete a transaction once
initiated through to its settlement.[8]
Tail Latency (95th Percentile): This is the threshold of
Latency that 95% of the transactions will have been
fulfilled and this is a measure of worst-case behavior.
Throughput: This is the number of transactions
completed successfully in a one second period.
Throughput Efficiency: Ratio of the throughput that
has been attained to the rate of transaction arrival [8].
Such measures allow to perform a systematic study of
scalability thresholds, congestion behaviour, and
performance bottlenecks of dominant payments
systems in real-time.[6]

IV. UNIFIED DIGITAL PAYMENT SYSTEM ARCHITECTURE
Contemporary cashless economies are based on incredibly
networked digital payment systems that incorporate users,
financial entities, and payment service providers as well as
regulation bodies. To simplify this intricacy and bring it into
a coherent and analytical form, this paper suggests a single
layered architecture that encapsulates the entire end-to-end
digital payment cycle of heterogeneous technology, including
wallets, real-time payment systems, blockchain platforms, and
CBDCs[1].

V. SECURITY AND PRIVACY ANALYSIS
There is a high level of risk in which digital payment
infrastructures are vulnerable to cyber-attacks in which
monetary funds, personal information, and domestic financial
systems are at stake. The layered structure shown in Section
IV allows the systematic security and privacy risk analysis
throughout the entire lifecycle of payment [3].
A. Threat Model
Identity theft, device compromise, and social engineering
attacks are some of the threats at the user layer. The
application layer is susceptible to malware, keys, and wallets
and banking applications. Some of the risks that the payment
processing layer is prone to include are API abuse,
transaction manipulation and denial-of-service attacks
capable of disrupting real-time transaction routing. Financial
integrity is vulnerable to fraud, errors in reconciliation and
insider attacks that can be committed on settlement layer.
Systemic vulnerabilities may arise at the governance layer as
a result of regulatory shortcomings or important management
practices [2].
B. Layerwise Security Mitigation
Contemporary digital payment systems implement various
protection mechanisms at a multifaceted level in architecture.
Multi-factor authentication, biometrics and secure binding
are applied to user and application layers. In the processing
layer, encrypted communication, secure APIs and transaction
validation are employed in order to avoid interception and
manipulation. The settlement layer makes use of ledger
integrity checks, reconciliation, and audit measures to
provide finality of a transaction. Governance layer ensures
that there is regulatory compliance, access control and
continuous monitoring in order to uphold trust and
stability[1],[3].
TABLE II. THREATS AND MITIGATION ACROSS PAYMENT SYSTEM
LAYERS

Layer
User
Application
Processing
Settlement
Governance

Major Threats
Identity
theft,
phishing
Malware, credential
theft
API
abuse,
interception
Fraud,
double
spending
Policy
abuse,
mismanagement

Key Mitigation
Biometrics, MFA
Secure
apps,
tokenization
Encryption, secure
APIs
Ledger
verification, audits
Regulatory
control, oversight

Table.II summarizes the major security threats and
corresponding mitigation mechanisms across different layers
of the digital payment architecture.

Fig. 1. Layered architecture of a unified digital payment
system for cashless economies

C. Privacy and Trust
One of the major conditions to user adoption of a cashless
system is privacy. Payment platforms should avoid exposing
redundant data, provide privacy of transactions, and adhere
to the laws of financial and data security. CBDC systems and
real-time payment system need to satisfy the lawenforceability versus user privacy needs of controlled access
and cryptography protection. The layer-based security and

979-8-3315-6883-2/26/$31.00 ©2026 IEEE

1568

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:15 UTC from IEEE Xplore. Restrictions apply.

## Page 5

Proceedings of the 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL-2026)
IEEE Xplore Part Number: CFP26UU5-ART; ISBN: 979-8-3315-6883-2

privacy model can help gain the confidence of the user and
enable the provision of sustainable use of cashless payment
systems. [1]
VI. CASE STUDY: REAL TIME PAYMENT SYSTEMS
Payment real-time payment (RTP) systems form a backbone
of a cashless economy by providing the means of providing
an account-to-account fund transfer at a steady rate with nearreal-time confirmation. Whereas some of the current
literature research RTP platforms through the prism of
interoperability, security mechanisms, and adoption, little is
known about system-level performance behavior when
subjected to heavy load of transactions. Since they are
commonly used in national payment systems and demand a
low latency, RTP systems are an ideal and practically relevant
case study to test the suggested reference architecture [6].
A. System Architecture Mapping
Payment real-time payment (RTP) systems form a backbone
of a cashless economy by providing the means of providing
an account-to-account fund transfer at a steady rate with nearreal-time confirmation. Whereas some of the current
literature research RTP platforms through the prism of
interoperability, security mechanisms, and adoption, little is
known about system-level performance behavior when
subjected to heavy load of transactions. Since they are
commonly used in national payment systems and demand a
low latency, RTP systems are an ideal and practically relevant
case study to test the suggested reference architecture [8].

performance real-time payment infrastructures in cashless
economies [6].
VII. RESULT
A. Low Load Stability
When the transaction load is low (10-100 transactions per
second), the RTP system shows consistently low latency
behavior, as in Fig. 2.

Fig.2 Average transaction latency under low transaction load,
Latency Under High Load.

B. Transaction Flow
The modeled transaction flow has a source of payment
request in the sender bank and this is redirected to the
centralized payment switch to be validated and forwarded.
The transaction is taken up by the receiver bank and the
transaction is done at the settlement layer. The simulation
does not model protocol-level or business-rule details, but
instead models the effects of processing delays, sharedresource contention and queueing behavior and provides the
opportunity to control the effects of latencies, throughput, and
congestion under different levels of transaction demand [4].
C. Security and Reliabilty
The RTP system is tested on a model simulation on which the
transaction processing is abstracted by the sender bank,
centralized payment switch, receiver bank, and settlement
parts. The payment switch is represented as a common
resource that has a limited processing capacity. It is
demonstrated by simulation that the weighted performance
bottleneck is the payment switch. Latency and throughput are
constant with small load, but higher than switch capacity
causes queueing effect, higher average and tail latency, and
throughput saturation. When the switching capacity is
increased, performance is greatly enhanced, which means
that the switch capacity of RTP is largely limited by the
capacity to make payments. As this case study shows, the
suggested reference architecture can be related to real-world
deployments of RTP as well as facilitate consideration of
meaningful performance through simulation. The findings
emphasize capacity conscious design of the payment switch
as a key to the attainment of scalable, stable and high-

As transaction load increases beyond system capacity,
average latency rises sharply due to congestion, as illustrated
in Fig. 3
B. Tail Latency Behavior

Fig. 4. 95th-percentile transaction latency under increasing
transaction load, illustrating severe congestion beyond switch
capacity.
979-8-3315-6883-2/26/$31.00 ©2026 IEEE

1569

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:15 UTC from IEEE Xplore. Restrictions apply.

## Page 6

Proceedings of the 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL-2026)
IEEE Xplore Part Number: CFP26UU5-ART; ISBN: 979-8-3315-6883-2

increases dramatically when the transaction load is higher
than the switch capacity. Saturated improvement in switch
capacity is important to enhance the stability of latency .
X. DISCUSSION

C. Throughput Analysis

Fig. 5. Throughput behavior of the RTP system under high
transaction load and varying payment switch capacities.
VIII. RTP VS BATCH SETTEMENT
Conventional batch-based payment settlement systems
Traditional batch-based payment settlement systems are
generally on a T+1 or longer settlement cycle thus taking
hours to days to process transactions. Conversely, real-time
payment (RTP) systems are meant to accommodate near-real
time confirmation of a transaction and instant access to the
money. Within the simulation-based RTP model that has
been created and assessed in the current work, the average
end-to-end transaction latency under the uncongested
operating conditions does not exceed 0.1 seconds. This is in
comparison with RTP architectures having an inherent
latency advantage over batch settlement mechanisms, and the
critical importance of capacity-conscious system design in
order to maintain low-latency performance with a growing
volume of transactions [8].
IX. IMPACT OF PAYMENT SWITCH CAPACITY
To quantify further the impact of processing capacity on the
performance of the system, Table II represents a summative
view of the significant latency, and throughput values in the
case of representative transaction loads and payment switch
capacity settings
TABLE III.

IMPACT OF PAYMENT SWITCH CAPACITY ON RTP
PERFORMANCE

Switch
Capacity

Load
(tx/Sec)

Avg.
Latency
(ms)

P95
Latency
(ms)

Throughout
(tx/Sec)

3

100

37.9

78.9

99.9

3

300

13043

24443

171.1

5

300

1283

2489

287.2

10

500

38.8

78.1

499.7

The simulated analysis gives system-level an understanding
of performance of real-time payment (RTP) infrastructures
configurations under an increasing transaction load. These
findings are consistent in pointing out the centralized
payment switch as the major scalability bottleneck. At low
load the regime in which the system is operating is
uncongested and both latency and throughput are stable and
depend on the arrival rate. But at high transaction demand
beyond switch capacity, the congestion effects quickly arise,
and average, and tail latency are sharply increasing, with
throughput saturation occurring. The findings also reveal that
raising the capacity on payment switching is an efficient
process of regaining performance stability. The increased
switch capacity has a major impact in the reduction of the
queueing delays and near-linear scaling of the throughput
thus signifying that the scalability of RTP is not dependent
much on the application-layer delays or settlement delays but
on the processing core capacity. The findings have
highlighted the significance of capacity conscious
architectural design on the national scale real time payment
systems [2],[5].
XI. LIMITATION
•

The simulation is conducted on the basis of
architectural modeling and secondary data, as opposed
to real-time system deployment and experimental
validation.

•

Security and fault tolerance mechanisms are also
considered at an architectural level and not
experimentally
benchmarked.The
performance
measures including the transaction throughput and
latency are talked about qualitatively but not
quantitatively.

•

Both network-specific and protocol-level information
is abstracted in order to concentrate on system-level
performance behavior.
XII. CONCLUSION

This paper has provided a system-level architectural and
performance analysis of real-time payment (RTP) systems to
support cashless economies. The findings demonstrate that
the RTP performance can be considered constant at low
transaction load and declines quickly when the transaction
demand is more than the payment switch capacity through
simulation-based case study. Both the average and tail
latency shoot up and throughput saturates in the case of
congestion. The switch capacity of payment can be scaled to
a large extent, eliminating such effects, which validates it as
the main scalability bottleneck. These results demonstrate the
significance of capacity-conscious architectural design to
constitute the real-time payment infrastructure which is
scalable and resilient.

Table III. reveals that rtp performance greatly depends on
payment switch capacity and the average and tail latency

979-8-3315-6883-2/26/$31.00 ©2026 IEEE

1570

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:15 UTC from IEEE Xplore. Restrictions apply.

## Page 7

Proceedings of the 5th International Conference on Sentiment Analysis and Deep Learning (ICSADL-2026)
IEEE Xplore Part Number: CFP26UU5-ART; ISBN: 979-8-3315-6883-2

REFERENCES
Li, Zeyan, Shengda Zhuo, Yichen Shi, Jiadong Huang,
Jingchun He, Wangjie Qiu, Zhiming Zheng, Shuqiang Huang,
Min Chen, and Yin Tang. "Unveiling Blockchain Transactions
Insights: Behavior Anomaly Detection via Relational
Mechanisms." IEEE Internet of Things Journal (2025).
[2] S. K. Trivedi, S. Vishnu, A. Singh, and M. Yadav, “Research
trends in sustainable e-payment systems: A study using topic
modeling approach,” IEEE Transactions on Engineering
Management, vol. 71, pp. 7511–7524, 2024.
[3] P. Zhang, X. Hua, and H. Zhu, “Cross-chain digital asset
system for secure trading and payment,” IEEE Transactions on
Computational Social Systems, vol. 11, no. 2, pp. 1654–1667,
Apr. 2024.
[4] Islam, Md Mainul, Md Kamrul Islam, Md Shahjalal, Mostafa
Zaman Chowdhury, and Yeong Min Jang. "A low-cost crossborder payment system based on auditable cryptocurrency with
consortium blockchain: Joint digital currency." IEEE
Transactions on Services Computing 16, no. 3 (2022): 16161629.
[1]

A. C. Moreaux and M. P. Mitrea, “Royalty-friendly digital
asset exchanges on blockchains,” IEEE Access, vol. 11, pp.
56235–56249, 2023.
[6] D. He, Z. Deng, Y. Zhang, S. Chan, Y. Cheng, and N. Guizani,
“Smart contract vulnerability analysis and security audit,”
IEEE Network, vol. 34, no. 5, pp. 276–283, Sept.–Oct. 2020.
[7] Iqbal, Sarwat, Muhammad Irfan, Kamran Ahsan, Muhammad
Azhar Hussain, Muhammad Awais, Muhammad Shiraz,
Mohammed Hamdi, and Abdullah Alghamdi. "A novel mobile
wallet model for elderly using fingerprint as authentication
factor." IEEE Access 8 (2020): 177405-177423.
[8] Liu, Wenzheng, Xiaofeng Wang, and Wei Peng. "State of the
art: secure mobile payment." IEEE Access 8 (2020): 1389813914.
[5]

979-8-3315-6883-2/26/$31.00 ©2026 IEEE

1571

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:15 UTC from IEEE Xplore. Restrictions apply.
