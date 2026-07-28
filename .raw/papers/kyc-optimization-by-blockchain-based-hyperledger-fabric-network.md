---
source_type: pdf
title: "KYC Optimization by Blockchain Based Hyperledger Fabric Network"
original_file: "thesis/reference/KYC_Optimization_by_Blockchain_Based_Hyperledger_Fabric_Network.pdf"
sha256: "fa396f1a42a5a96b9ea445382125d1c427f827a4bc775fe66f12b44c216e5d73"
page_count: 6
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: KYC Optimization by Blockchain Based Hyperledger Fabric Network

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2021 4th International Conference on Advanced Electronic Materials, Computers and Software Engineering (AEMCSE) | 978-1-6654-1596-5/21/$31.00 ©2021 IEEE | DOI: 10.1109/AEMCSE51986.2021.00264

2021 4th International Conference on Advanced Electronic Materials, Computers and Software Engineering (AEMCSE)

KYC Optimization by Blockchain Based Hyperledger
Fabric Network
NAZIR ULLAH1

KAWTHER A. AL-DHLAN2

1Department of Management Science and Engineering, School of

2Department of Information and Computer Science, College of

Management and Engineering, Nanjing University, P.R. China,
email: nazirabaz@gmail.com

Computer Science and Engineering, University of Ha'il, Saudi
Arabia,
email: k_aldhlan@hotmail.com

WALEED MUGAHED AL-RAHMI3
3Faculty of Social Science and Humanities, School of Education,

Universiti Teknologi Malaysia,
email: waleed.alrahmi1@gmail.com
Corresponding Author email: nazirabaz@gmail.com

another bank has already vetted the account. Apart from the
financial burden, KYC solicitations can likewise postpone
transactions, taking 30 to 50 days for the customer verification
process [4].

Abstract—in financial institutions, the traditional Know
Your Customer (KYC) process is insecure, and costly. The
adoption of disruptive technology is a necessary condition for the
coming future of financial institutions. This study proposed a
Hyperledger Fabric network for KYC optimization. The
Performance of the proposed system was tested by using the
Hyperledger Composer. The experiment results confirm that due
to the strong and identity features of Hyperledger Fabric, the
proposed system can speed up the KYC clearing transfers,
challenge the inefficiencies that arise from duplicated conduct of
similar tasks, secure data sharing, cost-effective, and ultimately
bring transparency in the traditional KYC system.

Blockchain technology would enable banks to get a shared
KYC system. All the KYC archives through smart contracts
could be stored in an encrypted form in distributed ledgers [5].
In the future, if financial institution needs to check customer
KYC records, they can get them from blockchain based KYC
data sharing system. In public blockchain such as Ethereum [6],
anybody can set up a node and join the system. On the other
hand, in private blockchain such as Hyperledger Fabric [7],
only authorized members can add and exchange data. The
graphical design of a private blockchain-based KYC system is
shown in figure 1. The customer contacts the home bank in the
first phase and delivers all the necessary documents for the first
time KYC registration. Bank A is using the application of the
system (installed at all of the sharing documents on the banks)
to control the procedure of swap of documents with the user
outside the distributed ledger and to store credentials in its
local database. As the home bank processes any document, the
document’s hash is stored on the distributed ledgers. If the
customer file has been verified by Bank A, the archive package
is created to get the verification prominence and the digitally
signed archive that permits customer verification. Through
smart contract, other banks (Bank B) can contact the customer
to access the blockchain based KYC system. In the future,
customers don’t need to do the whole KYC procedure for other
banks. A regulator plays a central position as a trusted thirdparty holder of the private blockchain network's fabric layer.

Keywords—Blockchain, KYC, distributed ledger technology
(DLT), Hyperledger Fabric network

I.

Introduction

Currently, for all financial institutions, a global challenge is
to bear regulatory costs incurred due to the KYC verification
process. As per the survey, budgetary establishments with $10
billion or more have seen their regular revenue on KYC
process upsurge to 150 million US dollar this year from 142
million US dollars in 2016. However, workers have increased
to an average of 307 KYC compliance experts in 2017 from 68
experts in 2016 [1]. Regardless of this ascent in headcount,
more than 33% of firms revealed that rare assets remain their
greatest test in leading KYC and Customer Due Diligence
processes [2]. This cost could be expanded by the penalties
imposed on financial organizations because of their unfortunate
behavior concerning the Anti Money Laundering (AML) and
KYC guidelines [3]. In most jurisdictions, banks must
independently vet imminent accounts, notwithstanding when

978-1-6654-1596-5/21/$31.00 ©2021 IEEE
DOI 10.1109/AEMCSE51986.2021.00264

1294

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:45:59 UTC from IEEE Xplore. Restrictions apply.

## Page 2

Figure 1. Design of KYC System [1]

The existing studies on blockchain-based KYC systems
are mostly based on privacy-preserving KYC on the Ethereum
network [8],[9] which is less secure and has a high cost of
storage. This study proposed a blockchain based Hyperledger
Fabric network that suggests an answer for the high cost,
challenges the inadequacies that arise from the repeated
conduct of same tasks, high-speed clearing transfers, secure
data sharing, and ultimately brings transparency in the
traditional KYC system. According to our knowledge, this is
the first study in which the Hyperledger fabric network along
with composer is used to improve the traditional KYC system.
The findings of the study indicate that due to the strong
security and identity features of Hyperledger Fabric, using the
Hyperledger composer can provide better efficiency as
compared to the traditional KYC system. The primary aim of
the present study is to answer the subsequent research
question.

II.

RELATED WORK

A. BLOCKCHAIN IN KYC
The distributed ledger technology is a brainchild of Satoshi
Nakamoto [10],. The disruptive technology seeks to create a
decentralized system where no third party regulates the
transactions. From the late 1980s ahead, the US has presented
KYC approaches that have obliged banks to gather and store
generous data about their clients and monitor their transaction
streams to educate suspicious conduct experts [11]. The US has
turned out to be exceptionally strict in sanctions and trade
embargo policy, enforcing compliance by imposing high fines
on major banks for regulatory breaches [12]. The demise of a
reputable BCCI bank and the money laundering threats,
through the span of a concise 20-year life expectancy, went
from the sweetheart of money related business enterprise to the
most terrible of 'grimy banks' . The repercussions of the 2008
financial crisis and innovation are the principal drivers that
have given shape to the new worldview in the financial
industries. As regulatory requirements comprise a noteworthy
torment point for banks, technological solutions are in
popularity. Compared to this interest and the intricacy of the
current financial environment is the ascent of regulatory
technology that offers promising answers for decreasing the
compliance burden [13]. The study of Y. Lootsma. [11],
considered the blockchain as the new regulatory technology to
reduce the KYC burdens for the banks. The study of D.
Mingxiao et al. [14] explained the blockchain applications and
their contribution to financial institutions. The proposed system
benefits the user in terms of safety and usability. Consequently,
distributed ledger technology can rebuild the financial

Can a Hyperledger Fabric network KYC system reduce the
burden of the obsolete traditional KYC verification process for
financial institutions and improves customer experience?
The remaining part of the study is organized as follows.
Section 2 describes the theoretical background. Section 3
presents the proposed architecture. Section 4 explains the
system implementation. Section 5 explains comparison.
Section 6 provides a summary.

1295
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:45:59 UTC from IEEE Xplore. Restrictions apply.

## Page 3

The composer includes a model file, logic file, permissions file
and query file. The model file includes assets, participants and
transactions. The script file consists of various transaction
functions. The access control file is for guidelines. The query
file includes definitions.

institutions infrastructure, reduce the cost, increase
transparency and bring efficiency in the clearing and settlement
of financial transactions.
B. HYPERLEDGER FABRIC
Hyperledger is an open-source community project designed
to support disruptive technologies. It is a global partnership of
Linux Foundation that brings together pioneers in banking and
finance. The Hyperledger Fabric is a private blockchain
network under which only authorized members can exchange
data information. We may make channels with a group of
individuals in the Hyperledger fabric who will have different
records unveiled only to aggregate individuals. The various
characteristics delivered by Hyperledger is Identity
Management, Security and Privacy, Functionality of Chain
code, and Modular design [15]. The Hyperledger Fabric
network consists of Asset, is referred to as a series of key-value
pairs, with state changes documented on the record as
exchanges identify an asset and instruction for the transaction
to alter them. Chain code is used to edit the assets. Permissions
are used for interaction between members in the network. In
the Hyperledger Fabric network, to execute a transaction, peer
nodes are used. To propagate transaction ordering, nodes are
used. The immutable transactions are stored in a Blockchain
log and maintained in the state database.

D. Development of a Proposed Model
The existing literature on blockchain KYC systems is
mostly based on the Ethereum network, which is very costly
and less secure. To enhance this, our proposed system is based
on Hyperledger fabric network [17] for customer KYC
optimization. The main aim of the proposed framework is to
improve the traditional KYC system. The study findings can
help the financial institutions speed up the KYC clearing
transfers, secure data information, reduce cost, and bring
transparency to the traditional KYC system. The proposed
architecture is shown in figure 2. It consists of one customer,
two financial institutions namely Bank A and Bank B, smart
contract, KYC documents (ledgers), distributed ledger database,
consensus mechanism, and application program interface (API)
[18]. In the proposed system, the financial institutions get
permission form a customer to access his KYC data. Smart
contracts always play a key role in the permissioned
blockchain network [19]. It mainly offers the distributed ledger
progressive programmability, improving the tasks that the
distributed ledgers can perform and massively increasing the
blockchain applications range, like identity access management
[20]. The principal feature of the disruptive technology is the
immutability and distributed ledgers in which the data is stored
instantly with all nodes in the member network, so data
integrity is not dependent only on one case. It also indicates
that all members will agree on the validation of the data. The
procedure that confirms this is called consensus mechanism.
Consequently, authenticated blocks are generating a unique
cryptographic Hash function. The blocks could be accessed and
monitored at any time but cannot be changed later, thereby
maintaining consistency in this ecosystem [21]. To ensure the
confidentiality of the data and participants, an asymmetric
cryptosystem is used [22]. Consequently, there is a need for an
authorization to enter the distributed network database via the
program. It is done by the JavaScript object notation (JSON).

C. HYPERLEDGER COMPOSER
A composer is a toolset and platform for open source
development that accelerates the time it takes to write a
disruptive technology application. The Hyperledger composer
offers a convenience layer and business level abstractions to
execute smart contracts on Fabric instead of creating smart
contracts from scratch. From the smartphone application or
web, you can connect to the business network through
composer. It provides faster business network modeling,
application implementation, and integration with current
systems [16]. The composer models are supposed to adapt over
time and change.
Nevertheless, some consideration and control must be
applied when making changes to the model to certify that
current instances remain relevant regarding the new model.

Figure 2. Proposed System for KYC

1296
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:45:59 UTC from IEEE Xplore. Restrictions apply.

## Page 4

III. SYSTEM IMPLEMENTATION
The proposed system includes three main mechanisms:
permission blockchain, distributed storage database, and a
customer-centered user experience, accessed by a REST
(postman) interface [23]. The Hyperledger composer is used
for the runtime of the business network archive on the
Hyperledger Fabric network. The composer generates key files,
namely a Model file, Logic file, Permissions file, and a Query
file. The Model file further created its three key components,
namely Participants, Assets, and Transactions. The participant
in this study is a Customer, Bank A and Bank B. The asset
consists of customer main documents like ID, License, and

Utility bills for first time KYC registration in the home bank
(Bank A). The transaction includes the exchange of
information between the customer and Banks. The Logic file
described the various network transaction functions like
validation and updating of customer KYC data [24]. The
permission file described the approval of the customer to
access his KYC data. Bank B had to trigger a smart contract for
access to the customer KYC data. The next Query file is
designed for keeping the history of all the transactions between
the customer and banks. Finally, Once the system is designed,
other devices can be run by connecting through the network
card. The system implementation is shown in figure 3.

Figure 3. System Implementation [25]

IV. RESULTS AND DISCUSSION
For testing the system network, JSON by postman server
was used. To create a virtual environment for every server, an
EC2 instance was implemented for running applications on
AWS. It ran on the PC through Linux 18.04, 1 GHz, sole
vCPU, and 32GB RAM. The docker along composer and
oracle VirtualBox was used. The system performance was
evaluated based on time, task, cost, privacy, and transparency
of KYC data information.
The proposed system empowers the distribution of
encrypted updates to customer KYC data in real-time. It takes
up to 7.6 seconds for KYC first-time registration by the
customer in the home bank (Bank A) and for Bank B to access
the customer KYC data through smart contract takes 7.1
seconds. So, the Hyperledger Fabric KYC system takes (14.7
to 19 second) [25]. While in the traditional KYC system, as per
Thomson Reuters survey, it takes 3 to 4 months for a customer
to get their onboarding from each bank [2].
Customers have various relationships with several banks
and are expected to provide the same data multiple times to
different banks. So, duplication of the same activities takes
place in the traditional KYC verification process [26]. From
the experiment results, it is confirmed that the Hyperledger
Fabric KYC system can challenge the inefficiencies arising

from duplicated conduct of similar tasks and speed up KYC
clearing transfers [27].
The KYC verification process's cost is immense, costing
millions of dollars per annum in the traditional KYC process
[28]. The Hyperledger Fabric KYC system is cost-effective;
the distribution of cost-saving per customer can be measured
as Σ݆‫݆݊(×݆݌‬−1). P represents the KYC cost for the customer j
and n represents the number of financial institutions that open
KYC account for a customer j [29],[30].
Corporations are not cautious about reporting KYC
changes to the banks regularly in the traditional KYC system
[31]. The Hyperledger Fabric KYC system can provide a
historical record of all compliance activities and documents
pertaining to each customer, and supported by the other studies
of [32].
KYC and customer due diligence systems are not normally
linked to the traditional KYC system's transaction monitoring
systems [33]. The Hyperledger Fabric KYC system can enable
customer identifications for fraudulent histories and authorize
the reviewing information and documents to detect illegal
activities, and supported by the other studies of [34].

1297
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:45:59 UTC from IEEE Xplore. Restrictions apply.

## Page 5

V.

Conclusion and Future Work

This paper proposes a blockchain Hyperledger Fabric
network for customer KYC optimization. In response to a
research question, this study's findings confirmed that
hyperledger Fabric blockchain-based KYC systems can reduce
the KYC overall procedure's burden and better customer
experience. Designing the Hyperledger fabric network can
store the customer KYC document package safer and privately,
provide time-saving guarantees, distribution of cost, and bring
transparency in the traditional KYC system. In the light of the
general data protection regulation (GDPR), the fact that
customer owns the smart contracts in which customer KYC
data information is stored in distributed ledger database and
not by the participating financial institutions already addresses
the paradigm shift taking place about customer KYC data [35].
In the present study, we designed a system based on the
Hyperledger Fabric network; in the future other vital designs
such as Corda or Monetas [36] can be considered for better
performance. Indeed, the result of such studies will be more
interesting.
Acknowledgement
The authors would like to extent their sincere appreciation
to the University of Ha'il for their support and motivating the
scientific reseach movements locally and globally
REFERENCES
[1]

J. P. Moyano and O. Ross, "KYC optimization using distributed ledger
technology," Business & Information Systems Engineering, vol. 59, no.
6, pp. 411-423, 2017.
[2] N. K. Ostern and J. Riedel, "Know-Your-Customer (KYC)
Requirements for Initial Coin Offerings," Business & Information
Systems Engineering, pp. 1-17, 2020.
[3] D. De Smet and A. L. Mention, "Improving auditor effectiveness in
assessing KYC/AML practices: Case study in a Luxembourgish
context," Managerial Auditing Journal, 2011.
[4] R. Syah, M. K. Nasution, M. Elveny, and H. Arbie, "Optimization
model for customer behavior with MARS and KYC system," Journal of
Theoretical and Applied Information Technology, vol. 98, no. 13, 2020.
[5] I. Bashir, Mastering Blockchain: Distributed ledger technology,
decentralization, and smart contracts explained. Packt Publishing Ltd,
2018.
[6] G. Wood, "Ethereum: A secure decentralised generalised transaction
ledger," Ethereum project yellow paper, vol. 151, no. 2014, pp. 1-32,
2014.
[7] E. Androulaki et al., "Hyperledger fabric: a distributed operating system
for permissioned blockchains," in Proceedings of the thirteenth EuroSys
conference, 2018, pp. 1-15.
[8] W. Shbair, M. Steichen, and J. François, "Blockchain orchestration and
experimentation framework: A case study of KYC," in IEEE/IFIP
Man2Block 2018-IEEE/IFIP Network Operations and Management
Symposium, 2018.
[9] N. Sundareswaran, S. Sasirekha, I. J. L. Paul, S. Balakrishnan, and G.
Swaminathan, "Optimised KYC Blockchain System," in 2020
International Conference on Innovative Trends in Information
Technology (ICITIIT), 2020: IEEE, pp. 1-6.
[10] S. Nakamoto, "Re: Bitcoin P2P e-cash paper," The Cryptography
Mailing List, 2008.
[11] Y. Lootsma, "Blockchain as the newest regtech application—the
opportunity to reduce the burden of kyc for financial institutions,"
Banking & Financial Services Policy Report, vol. 36, no. 8, pp. 16-21,
2017.

[12] K. A. Lacey and B. C. George, "Crackdown on money laundering: a
comparative analysis of the feasibility and effectiveness of domestic and
multilateral policy reforms," Nw. J. Int'l L. & Bus., vol. 23, p. 263, 2002.
[13] R. J. Herring, "BCCI & Barings: Bank Resolutions Complicated by
Fraud and Global Corporate Structure," Systemic Financial Crises:
Resolving Large Bank Insolvencies, pp. 321-345, 2005.
[14] D. Mingxiao, M. Xiaofeng, Z. Zhe, W. Xiangwei, and C. Qijun, "A
review on consensus algorithm of blockchain," in 2017 IEEE
international conference on systems, man, and cybernetics (SMC), 2017:
IEEE, pp. 2567-2572.
[15] J. Sousa, A. Bessani, and M. Vukolic, "A byzantine fault-tolerant
ordering service for the hyperledger fabric blockchain platform," in
2018 48th annual IEEE/IFIP international conference on dependable
systems and networks (DSN), 2018: IEEE, pp. 51-58.
[16] S. A. Baset, L. Desrosiers, N. Gaur, P. Novotny, A. O'Dowd, and V.
Ramakrishna, Hands-on blockchain with Hyperledger: building
decentralized applications with Hyperledger Fabric and composer.
Packt Publishing Ltd, 2018.
[17] C. Cachin, "Architecture of the hyperledger blockchain fabric," in
Workshop on distributed cryptocurrencies and consensus ledgers, 2016,
vol. 310, no. 4: Chicago, IL.
[18] P. Thakkar, S. Nathan, and B. Viswanathan, "Performance
benchmarking and optimizing hyperledger fabric blockchain platform,"
in 2018 IEEE 26th International Symposium on Modeling, Analysis, and
Simulation of Computer and Telecommunication Systems (MASCOTS),
2018: IEEE, pp. 264-276.
[19] B. K. Mohanta, S. S. Panda, and D. Jena, "An overview of smart
contract and use cases in blockchain technology," in 2018 9th
International Conference on Computing, Communication and
Networking Technologies (ICCCNT), 2018: IEEE, pp. 1-4.
[20] N. Atzei, M. Bartoletti, and T. Cimoli, "A survey of attacks on
ethereum smart contracts (sok)," in International conference on
principles of security and trust, 2017: Springer, pp. 164-186.
[21] D. Puthal, N. Malik, S. P. Mohanty, E. Kougianos, and C. Yang, "The
blockchain as a decentralized security framework [future directions],"
IEEE Consumer Electronics Magazine, vol. 7, no. 2, pp. 18-21, 2018.
[22] V. Gramoli, "From blockchain consensus back to Byzantine consensus,"
Future Generation Computer Systems, vol. 107, pp. 760-769, 2020.
[23] L. Hang and D.-H. Kim, "Design and implementation of an integrated
iot blockchain platform for sensing data integrity," Sensors, vol. 19, no.
10, p. 2228, 2019.
[24] X. Liang, J. Zhao, S. Shetty, J. Liu, and D. Li, "Integrating blockchain
for data sharing and collaboration in mobile healthcare applications," in
2017 IEEE 28th annual international symposium on personal, indoor,
and mobile radio communications (PIMRC), 2017: IEEE, pp. 1-5.
[25] A. R. Rajput, Q. Li, M. T. Ahvanooey, and I. Masood, "EACMS:
Emergency access control management system for personal health
record based on blockchain," IEEE Access, vol. 7, pp. 84304-84317,
2019.
[26] D. Mulligan, "Know your customer regulations and the international
banking system: towards a general self-regulatory regime," Fordham
Int'l LJ, vol. 22, p. 2324, 1998.
[27] R. Beck, M. Avital, M. Rossi, and J. B. Thatcher, "Blockchain
technology in business and information systems research," ed: Springer,
2017.
[28] V. Chang, P. Baudier, H. Zhang, Q. Xu, J. Zhang, and M. Arami, "How
Blockchain can impact financial services–The overview, challenges and
recommendations from expert interviewees," Technological Forecasting
and Social Change, vol. 158, p. 120166, 2020.
[29] M. Osmani, R. El-Haddadeh, N. Hindi, M. Janssen, and V. Weerakkody,
"Blockchain for next generation services in banking and finance: cost,
benefit, risk and opportunity analysis," Journal of Enterprise
Information Management, 2020.
[30] N. Ullah, W. S. Alnumay, W. M. Al-Rahmi, A. I. Alzahrani, and H. AlSamarraie, "Modeling Cost Saving and Innovativeness for Blockchain
Technology Adoption by Energy Management," Energies, vol. 13, no.
18, p. 4783, 2020. [Online]. Available: https://www.mdpi.com/19961073/13/18/4783.

1298
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:45:59 UTC from IEEE Xplore. Restrictions apply.

## Page 6

[31] B. Viritha, V. Mariappan, and V. Venkatachalapathy, "Combating
money laundering by the banks in India: compliance and challenges,"
Journal of Investment Compliance, 2015.
[32] Y. Guo and C. Liang, "Blockchain application and outlook in the
banking industry," Financial Innovation, vol. 2, no. 1, pp. 1-12, 2016.
[33] N. Mugarura, "Customer due diligence (CDD) mandate and the
propensity of its application as a global AML paradigm," Journal of
Money Laundering Control, 2014.
[34] A. Al Mamun, S. R. Hasan, M. S. Bhuiyan, M. S. Kaiser, and M. A.
Yousuf, "Secure and Transparent KYC for Banking System Using IPFS
and Blockchain Technology," in 2020 IEEE Region 10 Symposium
(TENSYMP), 2020: IEEE, pp. 348-351.
[35] P. Voigt and A. Von dem Bussche, "The eu general data protection
regulation (gdpr)," A Practical Guide, 1st Ed., Cham: Springer
International Publishing, vol. 10, p. 3152676, 2017.
[36] E. Prasad, "Central banking in a digital age: Stock-taking and
preliminary thoughts," Hutchins Center on Fiscal & Monetary Policy at
Brookings, 2018

1299
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:45:59 UTC from IEEE Xplore. Restrictions apply.
