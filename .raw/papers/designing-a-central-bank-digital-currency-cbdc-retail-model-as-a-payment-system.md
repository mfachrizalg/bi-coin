---
source_type: pdf
title: "Designing a Central Bank Digital Currency (CBDC) Retail Model as a Payment System"
original_file: "thesis/reference/Designing a Central Bank Digital Currency (CBDC) Retail Model as a Payment System.pdf"
sha256: "fd527ec9a217e750003e48149c3dba4678d854ed5dc13ffff22696d62dd16d38"
page_count: 6
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Designing a Central Bank Digital Currency (CBDC) Retail Model as a Payment System

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2023 10th International Conference on ICT for Smart Society (ICISS) | 979-8-3503-3954-3/23/$31.00 ©2023 IEEE | DOI: 10.1109/ICISS59129.2023.10291775

Designing a Central Bank Digital Currency (CBDC)
Retail Model as a Payment System
Nima Rohmalia
School of Electrical Engineering and Informatics
Institut Teknologi Bandung
Bandung, Indonesia
23521079@std.stei.itb.ac.id

I Gusti Bagus Baskara Nugraha
School of Electrical Engineering and Informatics, Institut
Teknologi Bandung
Bandung, Indonesia
baskara@itb.ac.id

Abstract— Currency is the value of a currency established as
a valid means of payment in a country. The development of
digitalization has made people accustomed to doing digital
transactions by keeping physical money in bank accounts and
digital wallets. This, makes banking institutions and non-bank
institutions race for payment systems, debit cards, digital
wallets, and digital money. Cash usage is declining significantly
and can pose challenges in managing payment systems and
policies. The central bank is difficult to monitor because the data
is stored separately and not in one system. Then came the
emergence of virtual currencies, which have a high risk because
there is no official administrator overseeing them. It affects the
stability of the financial system and is detrimental to society. The
Central Bank is planning to introduce a new digital currency
system called the Central Bank Digital Currency (CBDC).
CBDC is a digital coin used to facilitate digital payments and
reduce the risk of using unofficial virtual money. The research
focuses on the design of a CBDC retail model that is used by the
public to conduct transactions that leverage blockchain
technology with the Hyperledger Fabric platform. The research
proposes a business model and architecture for the blockchain
network. The implementation of CBDC retail with Hyperledge
Fabric responds to the challenges of the era of digitalization,
which has a high level of privacy and data security. The central
bank can monitor money flows and have direct access to the
CBDC payment system.

accompany the current currency [4]. There are two types of
Digital Rupiah that will be issued by BI based on a white paper
that has been published, namely w-digital rupiah (wholesale
digital rupiah) and r-digital rupiah (r-digital rupiah). The wdigital rupiah will only be used by parties later appointed by
BI, so only certain entities can access it. It is different with the
r-digital rupiah, whose access is open to the public and
distributed for retail transactions [3]. Therefore, the
Indonesian people will later use the r-digital rupiah.

Keywords— CBDC, Blockchain, Hyperledger Fabric

I. INTRODUCTION
A Currency is a unit of exchange that is designated as legal
tender in a country. Currency is used by people to make
transactions by exchanging goods and services and as a means
of storing their value [1]. Current currency is called fiat
currency, which has two different forms, namely banknotes
and coins. At this time, people are accustomed to making
digital transactions, fiat money stored in bank accounts, and
digital wallets can be used to make payment transactions
without having to carry cash [2]. However, the use of debit
cards, e-banking, or digital wallets as payment systems is not
efficient [3].
This is evidenced by the large number of payment systems
issued by banks and non-bank institutions; through various
systems, people who act as users will easily make payment
transactions [5]. However, without realizing it, the central
bank will find it difficult to monitor because the digital data is
separate and not stored in one system. Systems with separate
digital data will make it difficult for the government to provide
new economic policies because the public must first wait for
the policy to be updated by conventional banks on their
systems [3].

The Central Bank of Indonesia, namely Bank Indonesia
(BI), is innovating in the application of the digital rupiah. The
digital rupiah is money in digital format that will be issued by
BI to accompany the current currency [4]. There are two types
of Digital Rupiah that will be issued by BI based on a white
paper that has been published, namely w-digital rupiah
(wholesale digital rupiah) and r-digital rupiah (r-digital
rupiah). The w-digital rupiah will only be used by parties later
appointed by BI, so only certain entities can access it. It is
different with the r-digital rupiah, whose access is open to the
public and distributed for retail transactions [3]. Therefore, the
Indonesian people will later use the r-digital rupiah.
However, there are several challenges in the
implementation of CBDC in Indonesia, namely the design of
the CBDC itself [8]. This was conveyed directly by the
Governor of BI, who mentioned that each country has a
different design because the policies are different [9]. In
addition, the implementation of the system for data security
with three principles (availability, integrity, and
confidentiality) therefore, a strong CBDC system security
implementation design with the latest technology is needed.
There are several technologies that can be used for data
security, one of which is blockchain technology [12]. Based
on a security perspective, blockchain has good security
compared to centralized systems [17]. This will minimize
three risks: integrity risk, which can protect data from
unauthorized information changes; availability risk, which
can be accessed at any time when data is needed; and
confidentiality risk in accessing the system (only authorized
parties and members of the network can access) [19]. This
research focuses on the security aspect of maintaining privacy
or confidentiality. Therefore, this research will focus on
creating a CBDC r-digital rupiah architecture design that is
tailored to existing policies using blockchain technology with
the Hyperledger Fabric platform. This research will evaluate
the effectiveness and security of the system from the aspect of
confidentiality tested through the simulation of the system
created.

This situation encourages central banks in the world to The
Central Bank of Indonesia, namely Bank Indonesia (BI), is
innovating in the application of the digital rupiah. The digital
rupiah is money in digital format that will be issued by BI to

979-8-3503-3954-3/23/$31.00 ©2023 IEEE
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:37:48 UTC from IEEE Xplore. Restrictions apply.

## Page 2

II. LITERATUR REVIEW
A. Electronic Payment System
Electronic payment system is an optional payment system
that makes it easy for buyers to make payments through
networks and applications [16].
The parties involved in each payment method are:

For the use of CBDC, it is necessary to consider the
following requirements:
•

Participants must be identified/identifiable

•

Network must be authorized

•

High transaction throughput performance

•

Low transaction confirmation latency

•

Privacy and confidentiality of transactions and data
relating to business transactions.

1.

Issuer is an institution other than a bank or bank that
issues an e-payment instrument so that it can be used
to purchase goods.

2.

Buyer or Customer are people who make e-payments
as a means of exchange in order to get goods or
services.

While many blockchain platforms are currently being
developed for enterprise use, the Hyperledger Fabric platform
has been designed for private blockchain use.

3.

Sellers or Merchants are people who receive epayments from buyers as a means of exchange to get
goods or services sold.

4.

Regulators are government agencies that have an
obligation to regulate the regulation of government
processes [9].

D. Hyperledger Fabric
An open source, enterprise-grade permissioned distributed
ledger technology (DLT) platform designed for use in an
enterprise context, which provides several key capabilities
that differentiate it from other blockchain platforms. Fabric
has a highly modular and configurable architecture, enabling
innovation, versatility and optimization for a variety of
industry use cases including banking and finance [25]

B. CBDC (CENTRAL BANK DIGITAL CURRENCY)
CBDCs are digital currencies issued and supervised by
central banks that are used as legal tender in a country. CBDCs
are seen as being able to bridge the needs of the transacting
public in the digital era with the need for central banks to
maintain and maintain the continuity of the financial system
that has been running for hundreds of years by placing the
central bank at its axis. CBDC uses distributed technology
called Distributed Ledger Technology (DLT) or blockchain
technology [11].
The central bank will issue two types of digital currencies,
namely:
1.

Retail CBDC is a currency that can be accessed by
the general public as a means of payment and store
of value.

2.

Wholesale CBDC is for financial institutions that
hold reserve deposits with the central bank and can
be accessed by institutions that have accounts with
the central bank for interbank or large-value transfers
[14].

This research focuses on a retail CBDC system called rDigital Rupiah in Indonesia based on the CBDC white paper.
r-Digital Rupiah whose access is open to the public and
distributed for retail transactions. The CBDC system is
designed to conduct payment transactions by transferring rDigital Rupiah using account access by assessing in terms of
effectiveness and one of the security principles, namely data
confidentiality.

Fabric is the first distributed ledger platform to support
smart contracts written in programming languages such as Go,
Java, and Node.js.
The Fabric platform is also permissioned, unlike
unlicensed public nets, participants in the network are
regulated who have the right to enter and if they are identified
as anonymous then they will not be allowed to join the
network so that trust and security are maintained. The
Hyperledger Fabric platform supports consensus protocols
that can be used as needed to be more effective. The
implementation of CBDC requires consensus that has
tolerance for errors in transactions so as not to hamper
performance and results, the consensus is CFT (Crash Fault
Tolerance) supported by the fabric [24].
III. PROPOSED SYSTEM
The implementation of this research uses the Design
Research Methodology (DRM) methodology. DRM
methodology is a methodology commonly used for research
related to the design of a service or system. The DRM method
has several sequences of stages as shown in Figure 1.

C. Blockchain
Blockchain is a ledger of immutable transaction records,
stored in a distributed network of nodes (peers). Each of these
nodes keeps a copy of the ledger by applying transactions
validated by a consensus protocol, grouped in blocks that
include hashes that bind each block to the previous block [15].
The first and well-known blockchain applications are the
digital currency Bitcoin and the cryptocurrency Ethereum
which integrates the characteristics of botcoin but adds smart
contracts. Bitcoin and Ethereum belong to the public
blockchain technology [26]..

Fig. 1. Stages of the DRM Method

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:37:48 UTC from IEEE Xplore. Restrictions apply.

## Page 3

A. Currency Distribution

Fig. 2. Cash Currency Distribution

Based on Figure 2, which illustrates the flow of cash to
customers to be used legally. The central bank has a policy to
distribute cash that is first channeled to commercial banks,
commercial banks that interact directly with customers by
providing the services they have. Customers get cash from
bank services provided, such as storing and receiving cash at
commercial banks.

Fig. 3. CBDC Currency Distribution

Based on Figure 3 which illustrates the distribution flow
of CBDC to customers or users. The central bank has a policy
to distribute CBDC, CBDC is distributed directly and
controlled by the central bank through a CBDC system
consisting of several permitted organizations.

The initial stage of Digital Rupiah distribution is by
issuing w-Digital Rupiah by Bank Indonesia by transferring
funds from the current account submitted by the wholesaler
(institution or bank directly appointed by BI) to the CBDC
system account. The transaction will occur if the CBDC
system provides the token issuance instruction information.
Furthermore, the issued token will be delivered to the
wholesaler in the form of w-Digital Rupiah.
R-Digital Rupiah is issued by the wholesaler by
converting its w-Digital Rupiah that has been obtained from
Bank Indonesia at the request of customers (retailers and endusers). There are three channels in distributing r-Digital
Rupiah, namely:
1. The wholesaler is the end user, in which case the
wholesaler is referred to as a retailer.
2. Wholesalers distribute through retailers first and
then to end users.
3. Bank Indonesia can go directly to end users (under
certain conditions).
Wholesalers manage their holdings of a large number of
w-Digital Rupiah and r-Digital Rupiah which they can
manage according to customer demand or as reserve deposits
for transactions in the wholesale market. r-Digital Rupiah can
be used to conduct transactions by transferring to personal or
merchants [3].
C. Blockchain System Architecture

B. Business Model

Fig. 5. Blockchain System Architecture

Fig. 4. CBDC Business Model [3]

The Digital Rupiah business model includes the issuance
and distribution of w-Digital Rupiah and r-Digital Rupiah.
Bank Indonesia is one of the organizations in the w-Digital
Rupiah platform in charge of the issuance process. The Bank
Indonesia organization will ensure the security,
completeness, validity, and accuracy of the Digital Rupiah
supply.

Based on Figure 5 of the blockchain system architecture,
users who have an account will be connected to the blockchain
network via API. The network has three organizations,
namely, central banks, wholesalers, and users, each of which
has a peer node. Each peer node has a ledger to record all
transactions that occur, which is in charge of recording the
smart contract. Each organization has a CouchDB database as
their organization's data storage. Every time there is a
transaction request, the ordering service will check whether
the transaction has a certificate obtained from the CA
(Certificate Authority), if the transaction has been accepted by
the ordering service then the transaction can be carried out.
After the transaction is made, the ordering service will insert
the transaction into the block and distribute it to all ledgers in
the network.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:37:48 UTC from IEEE Xplore. Restrictions apply.

## Page 4

IV. IMPLEMENTATION

TABLE 1. SYSTEM PARTICIPANTS

Organization

Node Peer

Network

Central Bank

Bank of Indonesia

On-chain

Wholesaler

Comercial Bank

On-chain

End-User

Users

On-chain

A. Environment Requirements
This research uses the CouchDB platform, MySQL,
golang programming language, postman service to test APIs,
and docker compose tools. Implementation is carried out with
three organizations, namely the central bank, wholesaler, and
user to present transactions in the CBDC system.

End-User

Users

Off-chain

B. CBDC System Sequence Diagram

TABLE 2. TRANSACTION FUNCTION

No

Transaction
Function

Explanantion

1

Create
account
off-chain

User create accounts on the offchain to present cash.

2

Create account onchain

User create account on the onchain to store CBDC balances.

3

Convert CBDC

User convert balance from
account off-chain to on-chain.

4

Transfer CBDC

User 1 payment by transferring
r-CBDC to user 2.

TABLE 2. DATA LEDGER ASSET

Atribut

Explanantion

id

id account

rev

Token id for account

range

Time

type

Type digital currency

owner

Owner name asset

value

CBDC balance amount

Fig. 6. CBDC Convert Sequence Diagram

TABLE 2. DATA LEDGER TRANSFER

Atribut

Explanantion

id

id account

rev

Token id for transaction

range

Time

type

Type transaction (convert, transfer)

sender

Sender asset CBDC

receiver

Receiver asset CBDC

value

Amount of balance transfer

Fig. 7. CBDC transfer Sequence Diagram

C. Implementation Results

Fig. 8. CBDC Asset Record

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:37:48 UTC from IEEE Xplore. Restrictions apply.

## Page 5

Users must create an account in the system to be able to
own CBDC assets, users are peers who are included in
network organizations such as central banks, wholesalers, and
end-users.The account creation process is done using postman
as an API service provider. The system will save the account
that has been registered in CouchDB in a json file as shown in
Figure 8. The attributes owned by the user are user id, revision
id, account owner name, creation date, CBDC type, and asset
value owned.

Fig. 11. Blockchain transaction flow
Fig. 9. Asset transfer success

Users who already have assets can make transactions by
transferring their assets to other users who have registered in
the system. The input to transfer assets is to enter the sender
ID, recipient ID, the number of assets to be transferred, and
the type of CBDC (r-CBDC or w-CBDC).Based on Figure 9,
the developed system has successfully performed peer to peer
asset transfer.

V. CONCLUSIONS
The retail CBDC model developed by producing a
simulation system as a CBDC transfer payment tool was
successfully designed and implemented with the central bank
as the central entity. System development starts with creating
a Hyperledger network, creating accounts, and recording
transactions that occur. A high level of security related to data
confidentiality for users cannot be easily spread by parties
who have commited fraud. All transactions are stored in the
blockchain database, organizations that can view and own
data are set in the network configuration so that unapproved
parties will not get the data. The CBDC transfer simulation
system for sending 1 data takes 3.2845 seconds and sending
50 data takes 7.9101 seconds. The transaction process uses
CFT (crash fault tolerance) consensus which has a higher
speed than other consensus.
REFERENCES
Accenture. 2017. The (R)evolution of Money: Blockchain
Empowered Digital Currencies.
[2] Dashkevich N, C. S. (2020). Blockchain Application for Central
Banks: A Systematic Mapping. IEEE Access, 8, 139918-139952.
[3] Bank Indonesia. (2022). Project Garuda: Navigating the Architecture
of Digital Rupiah. Jakarta: Bank Indonesia.
[4] C, E. (2021). Central Bank Digital Currency (CBDC) Sebagai Alat
Pembayaran di Indonesia. Jurist-Diction, 4(6), 2243.
[5] Pengelolaan D, N. K. (2022). Central Bank Digital Cureency (CBDC).
[6] Danezis G, M. S. (2017). Centrally Banked Cryptocurrencies. Internet
Society. San Diego, CA, USA.
[7] Chapman J, G. R. (2017). Project Jasper: Are Distributed Wholesale
Payment Systems Feasible Yet? Canada.
[8] D. Dalal, S. Y. (2017). The Future is Here-Project Ubin: SGD.
Singapore: Monetary Authority Singapore Deloitte.
[9] Ferry, M. (2015). Pemanfaatan Cryptocurrency Sebagai Penerapan
Mata Uang Rupiah . IJNS – Indonesian Journal on Networking and
Security, 4.
[10] Vanani, A. B. (2021). Analisis Legal Tender Uang Digital Bank Sentral
Indonesia. Jae (Jurnal Akuntansi Dan Ekonomi), 6, 74-83.
[11] Auer, R. B. (2020). The technology of retail central bank digital . BIS
Quarterly Review.
[1]

Fig. 10. CBDC Transaction Record

Transaction CBDC records have attributes such as
transaction id, transaction id_revision, delivery time, receiver,
sender, CBDC type, and asset amount. id_revision in
hyperledger is the same as a hash. Each transaction will have
a _rev to be able to monitor the transaction.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:37:48 UTC from IEEE Xplore. Restrictions apply.

## Page 6

[12] Han, X. Y. (2019). A blockchain-based framework for central bank
digital currency. IEEE International Conference on Service Operations
and Logistics, and Informatics (SOLI), 263-268.
[13] Rahardja, U. (2020). PENERAPAN TEKNOLOGI BLOCKCHAIN
SEBAGAI MEDIA . CESS (Journal of Computer Engineering System
and Science).
[14] Zhang J, T. R. (2021). A Hybrid Model for Central Bank Digital
Currency Based on Blockchain. IEEE Access, 9, 53589-53601.
[15] Raphael Auer, R. B. (2020). The technology of retail central bank
digital currency. BIS Quarterly Review.
[16] Raphael Auer, H. B.-A. (2022). Central bank digital currencies: a new
tool in the financial inclusion toolkit? Bank for International
Settlements.
[17] Vijak Sethaput, S. I. (2023). Blockchain application for central bank
digital currencies (CBDC). Springer, 15.
[18] Hyunjun Jung, D. J. (2021). Blockchain Implementation Method for
Interoperability between CBDCs. Future Internet, 14.
[19] Yunyoung Lee, B. S. (2021). A Survey on Security and Privacy in
Blockchain-based Central Bank Digital Currencies. Journal of Internet
Services and Information Security (JISIS), 14.
[20] Augusto, A., Belchior, R., Vasconcelos, A., Kocsis, I., László, G., &
Correia, M. (2023). CBDC bridging between Hyperledger Fabric and
permissioned EVM-based blockchains. TechRxiv., 10.

[21] Lucienne T.M. Blessing, A. C. (2009). DRM, a Design Research
Methodology. London, New York: Springer.
[22] Sergio Luis Náñez Alonso, J. J.-V. (2022). Central Banks Digital
Currency: Detection of Optimal Countries for the Implementation of a
CBDC and the Implication for Payment Industry Open Innovation. J.
Open Innov. Technol. Mark., 21.
[23] J.Chapman,R.Garratt,S.Hendry,A.McCormack,andW.McMahon,
“Project Jasper: Are distributed wholesale payment systems feasible
yet,” Financial System, vol. 59, 2017.
[24] E. Androulaki et al., "Hyperledger fabric: a distributed operating
system for permissioned blockchains," in Proc. 13th EuroSys
Conference, 2018, pp. 1-15.
[25] H. Sukhwani, J. M. Martínez, X. Chang, K. S. Trivedi, and A. Rindos,
‘‘Performance modeling of PBFT consensus process for permissioned
blockchain network (hyperledger fabric),’’ in Proc. IEEE 36th Symp.
Rel. Distrib. Syst. (SRDS), Hong Kong, Sep. 2017, pp. 253–255.
[26] S. Nakamoto. Bitcoin: A peer-to-peer electronic cash system.
Accessed: Otc. 9, 2019. [Online]. Available: https://bitcoin.
org/bitcoin. pdf .

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:37:48 UTC from IEEE Xplore. Restrictions apply.
