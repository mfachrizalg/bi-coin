---
source_type: pdf
title: "Blockchain and central bank digital currency"
original_file: "thesis/reference/Blockchain and central bank digital currency.pdf"
sha256: "4dfaf3f09d234eac97b2ed4dccd892d5d0ff0764da719be11ed3e1f0a6e8aee0"
page_count: 7
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Blockchain and central bank digital currency

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Available online at www.sciencedirect.com

ScienceDirect
ICT Express 8 (2022) 264–270
www.elsevier.com/locate/icte

Blockchain and central bank digital currency
Tao Zhanga,b ,∗, Zhigang Huangc
a Guangxi Key Laboratory of Trusted Software & Guangxi Key Laboratory of Cryptography and Information Security, Guilin University of Electronic

Technology, Guilin, China
b School of Cyber Science and Technology, Beihang University, Beijing, China
c Fujian Provincial Key Laboratory of Financial Science and Technology Innovation, Fuzhou University, Fuzhou, China

Received 31 May 2021; received in revised form 19 August 2021; accepted 29 September 2021
Available online 29 October 2021

Abstract
With the development of blockchain and digital currencies, central banks all over the world are accelerating the process of CBDC
development. However, it is still controversial on adoption of blockchain in CBDC design. In the paper, we analyze both functional and
non-functional requirements of CBDC design, and make a literature review on blockchain based CBDC schemes. Analysis findings show that
permissioned blockchain is more suitable for CBDC than permissionless blockchain. Besides, there are some challenges in blockchain based
CBDC, such as performance, scalability, and cross-chain interoperability. Our analysis is timely and can provide guidelines for blockchain
based CBDC design.
c 2021 The Authors. Published by Elsevier B.V. on behalf of The Korean Institute of Communications and Information Sciences. This is an open
⃝
access article under the CC BY-NC-ND license (http://creativecommons.org/licenses/by-nc-nd/4.0/).
Keywords: Central bank digital currency; CBDC; Fiat money; Distributed ledger; Blockchain

1. Introduction
In 2008, Bitcoin [1] is proposed as the first decentralized cryptocurrency (digital currency), which enables transactions without relying on trusted third parties, such as banks.
Blockchain is the backbone technology of Bitcoin and breakthroughs on blockchain have made a great influence on payment methods, e-commerce and cross-border transfer.
Blockchain technology is also widely used in cryptocurrencies
and more than 5000 blockchain based cryptocurrencies have
emerged in the past 10 years [2].
In the fast-changing digital world, more and more transactions are processed online and less paper money is used.
To comply with the trend, governments all over the world are
towards digital fiat money. Fiat money is government-issued
currency, the U.S. Dollar, the Euro, and the Chinese Yuan are
all fiat money.
There are significant differences between Bitcoin like decentralized blockchain based cryptocurrencies and fiat money,
∗

Corresponding author at: School of Cyber Science and Technology,
Beihang University, Beijing, China.
E-mail address: tao.zhang.cn@outlook.com (T. Zhang).
Peer review under responsibility of The Korean Institute of Communications and Information Sciences (KICS).

such as stability and regulatory means. Thus, these decentralized cryptocurrencies cannot be an option for digital fiat
money. And central banks all over the world are researching
their digital fiat money, CBDC (Central Bank Digital Currency). International Monetary Fund (IMF) defines CBDC as
a new form of fiat money issued digitally by the central bank
and served as legal tender [3]. According to BIS (Bank for
International Settlements) [4], central banks have a positive
attitude to CBDC research and development, and more than
80% of central banks are actively researching and developing
CBDC prototypes. The main motivations of CBDC are to
promote safety, robustness and efficiency of payments, reduce
issuing cost and increase transaction convenience.
As the key technology of most cryptocurrencies, blockchain
is also explored in CBDC researches and prototype experiments. With benefits of blockchain, blockchain-based CBDC
can help to increase efficiency and create more secure payment
systems [4]. However, it is still controversial on adoption of
blockchain in CBDC design, because there are still many
challenges of blockchain technology to overcome, such as
security, throughout and scalability issues.

https://doi.org/10.1016/j.icte.2021.09.014
c 2021 The Authors. Published by Elsevier B.V. on behalf of The Korean Institute of Communications and Information Sciences. This is an
2405-9595/⃝
open access article under the CC BY-NC-ND license (http://creativecommons.org/licenses/by-nc-nd/4.0/).

## Page 2

T. Zhang and Z. Huang

ICT Express 8 (2022) 264–270

To help to close the gap and provide guidance for CBDC
design, we conduct a comprehensive analysis of existing typical CBDC schemes based on blockchain. Then analyze requirements and scenarios of CBDC and potential applications
of blockchain in CBDC. Finally, challenges and open issues
of blockchain based CBDC are discussed.
There are also some researches on blockchain and CBDC.
In [5], World Economic Forum makes a survey on how central
banks use blockchain to solve financial and monetary challenges, experimentation and implementation of CBDC are also
involved. In [6], Codruta Boar and Andreas Wehrli make a
survey on CBDC from 65 central banks all over the world in
late 2020 about their engagement in CBDC work, their motivations and intentions are regarding CBDC issuance. In [7],
Natalia Dashkevich et al. summarize central bank usecases
of blockchain, including CBDC. In [2], Ayisi Opare and
Kwangjo Kim present a survey on blockchain based CBDCs
from central banks. However, it only focuses on CBDCs which
have completed proof-of-concept prototypes, so many ongoing
CBDC programs are not taken into consideration. Compare
to these works, blockchain based on CBDC schemes both
from central banks and research communities are taken into
consideration in our work.
The paper is organized as follows. Section 2 introduces
some background information about blockchain and CBDC.
Section 3 is a literature review on blockchain based CBDC
schemes. Section 4 discusses blockchain and CBDC and challenges and open issues on blockchain based CBDC and Section 5 concludes the paper.

Table 1
Comparison of three kinds of blockchain.

Openness
Permissioned
Speed
Scalability
Decentralization
Cost
Throughout
Example

Public
blockchain

Consortium
blockchain

Private
blockchain

High
No
Low
Low
High
Low
Low
Bitcoin,
Ethereum

Medium
Yes
Medium
Medium
Medium
Medium
Medium
Fabric,
Corda,
Quorum

Low
Yes
high
high
Low
High
High
–

2.1.2. Classification of blockchain
There are three kinds of blockchain, as public blockchain,
consortium blockchain and private blockchain.
Public blockchain is permissionless and anyone can participate in the blockchain. Public blockchain is highly decentralized, but has some drawbacks such as performance, privacy
and security. Bitcoin and Ethereum are two most famous
public blockchains.
Consortium blockchain is permissioned and is built by
consortia with several organizations. Each organization is one
node of the blockchain, if other organizations want to join
the consortium blockchain, authorization from consortia is
necessary. Consortium blockchain is less decentralized than
public blockchain, but with higher throughput and better performance. Hyperledger Fabric, Corda, and Quorum are representatives of consortium blockchain. Quorum is an enterprise
version of Ethereum.
Private blockchain is also permissioned and more centralized than consortium blockchain and public blockchain.
Private blockchain is controlled by only one organization,
which control who can participate, execute a consensus and
maintain the shared ledger. Private blockchain is more trusted
among participants and performance is much better than consortium blockchain. Table 1 is detailed comparison of these
three kinds of blockchain.

2. Background information
2.1. Blockchain
2.1.1. Characteristics of blockchain
Blockchain is a distributed ledger technology, cryptographic
techniques and consensus algorithms are utilized to achieve
features like decentralization, traceability, immutability,
anonymity, transparency, security [8]. As a decentralized distributed ledger, decentralization is key feature of blockchain,
which can help to reduce cost and increase efficiency. Only
transactions confirmed can be recorded on the blockchain. And
once validated by other nodes, transactions cannot be altered.
Since each of the transactions on the blockchain is validated
and recorded with a timestamp, all nodes in the blockchain network can verify these transactions. The ledger is shared among
all participants in the blockchain network, which can provide
transparency. With cryptographic techniques, blockchain can
guarantee that data recorded on the ledger cannot be tampered.
Smart contract is among the most important features of
blockchain. A smart contract can be executed automatically
when predetermined conditions are met, which can help to
improve transaction efficiency, reduce transaction costs and
make transactions simple.

2.2. CBDC
CBDCs can be categorized as wholesale and retail CBDC
by usage scenarios [9]. Retail CBDC is a digital version of
cash and mainly used for payments among individuals and
businesses. Retail CBDC can increase access and usability
for users, reduce costs for e-commerce and cross-border payments, and help to enhance monetary policy. Wholesale CBDC
is a new infrastructure for inter-bank settlements, such as
payments between banks and other entities that have direct
relationship with the central bank. Wholesale CBDC can improve inter-bank payment settlement, reduce risks and costs of
cross-border payment transactions.
2.2.1. Participants
In a CBDC system, there are three kinds of participants
as central bank, commercial banks and end users. Central
265

## Page 3

T. Zhang and Z. Huang

ICT Express 8 (2022) 264–270

3. Literature review on blockchain based on CBDC

bank is responsible for monetary policy making, currency
issuance, withdraw and circulation. Commercial banks act as
proxies to bridge central bank and end users. End users can
create transactions and make direct payments. End users can
be individuals, small businesses and large companies, and
payments can be inner-bank payments, inter-bank payments,
and cross-border payments.

Blockchain is the key and fundamental technology of current digital cryptocurrencies. Central banks around the world
are actively researching and exploring potential applications
of blockchain in CBDC. Since 2016, many central banks
have initiated projects on adoption of blockchain in CBDC.
Some projects have finished and developed proof-of-concept
prototypes. In this section, we make a literature review on
blockchain based on CBDC projects and schemes both from
central banks and research communities, as shown in Table 2.

2.2.2. Application scenarios
As for CBDC, there are two main application scenarios as domestic payments scenarios and cross-border payments scenarios. Domestic payments scenarios are designed
for domestic users and domestic payment systems, such as
retail payment, payment between enterprises and individuals.
Cross-border payments scenarios are mainly for cross-border
transactions.

3.1. Blockchain based CBDC schemes from central banks
3.1.1. Bitcoin based CBDC
Bitcoin is the most successful cryptocurrency and is also
considered by central banks in early blockchain based CBDC
researches, such as DNBcoin/Dukaton and RSCoin.
DNBcoin/Dukaton. In 2015, Dutch central bank developed
a blockchain based CBDC prototype, DNBcoin/Dukaton [10].
The first version of DNBcoin was adapted from Bitcoin
blockchain and focused on sustainability in the payments system. Then Dutch central bank tested different consensus and
validation mechanisms in subsequent four blockchain prototypes. Finally, Dutch Central Bank concluded that blockchain
technology cannot be an option for financial infrastructures
for its limitations on capacity, efficiency and certainty of
payment. Unfortunately, there are no public technology details
on Dukaton project.
RSCoin. In 2016, the Bank of England and University
College in London proposed RSCoin [11] as a blockchain
based CBDC prototype system. RSCoin is based on Bitcoin
and UTXO (Unspent Transaction Output) model is used. There
are two kind of ledgers in RSCoin as high level global ledger
and low level ledger. Central bank is responsible for issuing
currency and maintaining the high level global ledger. The low
level ledger is maintained by payment interface providers and
will be submitted to central bank. Payment interface acts as
a proxy between payment interface providers and end users.
Central bank is also responsible for dealing with potential
conflicts in transactions and maintaining the global consistency
of global ledger.

2.2.3. Design requirement of CBDC
As a payment method and digital fiat money, CBDC should
increase payment diversity. Just like current fiat money (cash),
CBDC should offer low-cost, fast and safe payments both for
domestic and cross-border scenarios. As for currency functions, CBDC should provide features like offline and instant
payment, anonymity and privacy, security, resilience, controllable regulation, availability, scalability, convenience and user
friendliness [4,9].
Offline and instant payment. CBDC should have the ability
to provide dual offline and instant transactions like cash. Dual
offline payment means both parties of a transaction are offline.
What’s more, payments should be processed and finished as
soon as possible.
Anonymity and privacy. As cash is anonymous during
currency circulation and anonymity is an important feature for
online transactions. CBDC should provide enough privacy for
end users, including anonymity of user identity and privacy of
transactions.
Security. Considering the digital nature of CBDC, security is the key to CBDC. CBDC should be against potential
fraud and attacks, provide security features like no double
spending, anti-counterfeiting, non-repudiation, and verifiability. No double spending is a basic security requirement for
digital currency, which means a CBDC cannot be used in one
transaction if it is used in another transaction before. Just like
cash, CBDC should be anti-counterfeiting to maintain security.
Non-repudiation refers that all actions related to CBDC should
be logged and can be repudiated. Verifiability means that all
CBDC transactions can be verified.
Resilience. CBDC system should have the ability to recover
from potential hardware or software failures.
Controllable regulation. CBDC should be compliant with
regulations.
Availability. CBDC should provide 24/7 payments with no
planned downtime.
Scalability. CBDC should be scalable and can handle increased transaction volumes as necessary with affordable costs.
Convenience and user friendliness. CBDC should be convenient and friendly to all users including those without smartphones. Central banks could offer devices supporting offline
transactions.

3.1.2. Permissioned blockchain based CBDC
With the maturity of permissioned consortium blockchain,
central banks have been attempting application of consortium blockchain in CBDC. Most widely used consortium
blockchain in CBDC are Ethereum, Corda, Hyperledger Fabric and Quorum. The main application scenarios of these
projects include inner-bank payments, inter-bank payments,
cross-border payments and settlements.
Project Jasper/CAD-coin. In 2016, the Bank of Canada
launched Project Jasper [12] as a blockchain based wholesale CBDC. Project Jasper developed a proof of concept of
payment system on high amount inter-bank payments. In the
first phase, Ethereum is used to make payments between
participants. In the second phase, Corda blockchain is tested.
266

## Page 4

T. Zhang and Z. Huang

ICT Express 8 (2022) 264–270

Table 2
A summary of blockchain based on CBDC.
Project name

Project status

CBDC types

Blockchain

Blockchain
types

Use cases

Country

Year

DNBcoin
Dukaton [10]
RSCoin [11]
Project
Jasper/CADcoin [12]
Project
Ubin [13]

Prototype

–

Bitcoin

Public

–

Dutch

2015

Prototype
Prototype

–
Wholesale

Bitcoin
Ethereum, Corda

Public
Consortium

Domestic payments
Inter-bank payments

England
Canada

2016
2016

Prototype

Wholesale

Ethereum, Corda,
Hyperledger Fabric
and Quorum

Consortium

Singapore

2016

Project
Stella [14]

Prototype

–

–

Consortium

ECB and
Bank of Japan

2017

Project
Khokha [15]
E-krona [16]

Prototype

–

Quorum

Consortium

South African

2018

Prototype

Retail

Corda

Consortium

Swedish

2018

Prototype

Corda, hyperledger

Private

Thailand

2018

Corda

Consortium

Inter-bank settlements

HK, China

2018

Prototype

Retail and
wholesale
Retail and
wholesale
–

Inter-bank payment and
settlements, cross-border
settlement payments, Delivery
versus Payment, cross border
payments
Cross border payments,
securities delivery versus
payment, cross-border
payments
Inter-bank payments and
settlement
Domestic retail payments,
inter-bank payment
Inter-bank settlements

–

–

Cross border payments

Thailand and
HK, China

2019

Australia

2020

Research
community
Research
community
Research
community
Research
community

2017

Project
Inthanon [17]
Project
LionRock [18]
Project
LionRockInthanon [18]
Australia
project [19]
Sun et. al [20]

Research

Wholesale

Ethereum

Consortium

Research

–

Consortium

Panda [21]

Research

–

HyperLedger,
Ethereum
–

Wholesale financial market
transactions
–

–

–

Han et. al [22]

Research

–

–

–

Cross-border payments

AFCoin [23]

Research

–

Ethereum

Consortium

–

Prototype

The two phases demonstrate that central bank can benefit
from blockchain based wholesale payment system, which can
increase efficiency and reduce costs. To explore more applications of blockchain, in 2017, the Central Bank of Canada
extended Project Jasper and developed a blockchain based
CBDC prototype, CAD-coin. Apart from Bank of Canada,
many commercial banks joined and cooperated to build the
experimental inter-bank payment system with CAD-coin.
Project Ubin. In 2016, The Monetary Authority of Singapore launched a blockchain based CBDC, Project Ubin [13],
to explore the use of blockchain for clearing and settlement
of payments and securities. Five phase experiments prove
that blockchain can be applied in CBDC. In the phase 1,
Ethereum is used to conduct inter-bank payments. In the phase
2, Corda, Hyperledger Fabric and Quorum are used to explore decentralized inter-bank payments. In the phase 3, smart
contracts are used to explore Delivery versus Payment. Phase
4 conducts experiments on cross-border settlement payments
with blockchain. As a continuation of phase 4, phase 5 uses
blockchain and CBDC to conduct cross-border payments and
explore the development of multi-currency payments model.

2018
2019
2019

Project Stella. In 2017, The European Central Bank (ECB)
and Bank of Japan initiated Project Stella [14], which focuses on cross-border payments with blockchain. The phase 1
tests the processing of large-value payments with blockchain,
and phase 2 investigates securities delivery versus payment
with blockchain; and phase 3 evaluates the applicability of
blockchain in improving cross-border payments.
Project Khokha. In 2018, South African Reserve Bank
launched Project Khokha [15] as a proof-of-concept inter-bank
payment and settlement system based on Quorum blockchain.
Project Khokha does not involve currency issuance and only
focuses on inter-bank payments, which shows that blockchain
can help accelerate transaction processing and lower transaction costs.
E-Krona. In 2018, Swedish central bank proposed E-krona
[16], a Corda blockchain based CBDC. E-krona is a two-tier
and private blockchain based model. In the first tier, central
bank masters the private blockchain network tier and can
approve and add new participants to the network. Besides, the
central bank is also responsible for issuing and withdrawing ekronor. Participants in the e-krona network distribute e-kronor
to end-users through the second tier, then end users can use
267

## Page 5

T. Zhang and Z. Huang

ICT Express 8 (2022) 264–270

e-krona for different purposes. E-kronor is domestic focused
and application scenarios are mainly on retail payments, such
as payments among individuals.
Project Inthanon. In 2018, Bank of Thailand (BOT)
launched project Inthanon [17], which aims to develop a proofof-concept for domestic wholesale CBDC with blockchain.
Project Inthanon runs on a private-permissioned Hyperledger
Besu network and focuses on wholesale CBDC. Project
Inthanon enables commercial banks to conduct domestic funds
transfers through a wholesale CBDC, such as inter-bank settlements. Project Inthanon proved that blockchain based CBDC
can help to improve payment efficiency, expand operational
scope, reduce operational and compliance risks.
Project LionRock. In 2017, Hong Kong Monetary Authority (HKMA) proposed a blockchain based program, Project
LionRock [18], to explore benefits and risks of blockchain
based CBDC. Project LionRock evaluates technical feasibility
of CBDC issuance with blockchain and develops a proofof-concept CBDC with Corda blockchain. Both retail and
wholesale scenarios are taken into consideration in LionRock.
Project LionRock-Inthanon. To further explore other potential CBDC scenarios like cross-border payments, the HKMA
and BOT proposed Project Inthanon-LionRock [18] to test
blockchain based cross-border payments at wholesale level
in 2019. In project Inthanon-LionRock, a blockchain tunnel network is used to connect LionRock and Inthanon, two
blockchain based CBDC. Compared with traditional crossborder payments, LionRock-Inthanon enables real-time crossborder payments, which greatly improve efficiency and reduce
costs of cross-border payments. Besides, LionRock-Inthanon
is the first to bridge two blockchain based CBDC.
Australia. In Jan 2020, Reserve Bank of Australia [19]
announced a project to explore a wholesale CBDC based on
Ethereum. The CBDC project aims to explore the implications
of CBDC for efficiency, risk management, and innovation in
wholesale financial market transactions.
DC/EP. DC/EP (Digital Currency Electronic Payment) [24]
is China’s CBDC system. In DC/EP, blockchain is used for
right confirmation registration and security enhancement. Central banks and commercial banks unite to build a decentralized
ledger, which can provide others with query services for
CBDC ownership.

user’s privacy. With permissioned blockchain, superchain can
assure that all digital currencies are created and issued by
central bank. In local area blockchain and branch blockchain,
both the scalability and performance are greatly improved.
MDBC is also implemented in HyperLedger and Ethereum,
and experiments show that MDBC is with good performance,
scalability and speed of transaction execution. MDBC matches
well with requirements of commercial banks.
Tsai et al. [21] present Panda as a multi-blockchain based
CBDC model. Like current banking systems, account model
instead of UTXO model is used in Panda. Experiments show
that Panda is with high throughput, low latency, low energy consumption, security, privacy, monitoring, reliability and
timeliness. Besides, Panda model is scalable as many financial
institutions and individuals can be added.
Han et al. [22] propose a blockchain based CBDC framework with three layers, as supervisory layer, network layer
and user layer. Then, take cross-border payments as an example to explain the entire life cycle of CBDC, as currencies
issuance, currency circulation, currency withdrawal, inter-bank
payments, and cross-border payments.
AFCoin [23] is an Ethereum blockchain based CBDC
model with account model. In AFCoin, smart contracts are
used to process transactions and maintain the account status
of commercial banks. Commercial banks can submit transaction information and status information to central bank for
regulatory and compliance purpose. Compared with payment
services with third parties, AFCoin can provide both better
privacy and regulation.

3.2. Blockchain based CBDC schemes from research
communities

4.1. Permissioned blockchain vs. permissionless blockchain

4. Discussions
Blockchain technology can bring unique advantages to
CBDC and financial systems. Characters like auditability and
immutability make blockchain ideal to meet requirements
of CBDC. Besides, blockchain based CBDC model has an
advantage of regulation and can help to reduce cost and
improve payment efficiency. Fig. 1 is a blockchain based
CBDC design scheme. Even though some central banks have
already confirmed that they are working on blockchain based
CBDC, it is still controversial on adoption of Blockchain.

Decentralization is a key feature of blockchain, which
is contrary to traditional centralized management in central
banks. So some people think that blockchain is not suitable for
CBDC. Current cryptocurrencies like Bitcoin are lack of regulatory means and are prone to money laundering, extortion and
other criminal activities. So public (permissionless) blockchain
cannot meet requirements of financial systems in regulation,
scalability, and efficiency and is not suitable for blockchain
based CBDC. Compared with permissionless blockchain, permissioned blockchain is more suitable for CBDC. More than
46 central banks all over the world are considering CBDC
schemes with permissioned blockchain [4].

Besides central banks, research communities are also interested in blockchain based CBDC. Some blockchain based
CBDC schemes have been proposed by research communities in recent years, and multiple-blockchains model is also
adopted in these schemes.
Sun et al. [20] propose MBDC as a multi-blockchain based
CBDC architecture. In MBDC, there are one superchain and
multiple local area blockchains and branch blockchains, all
these blockchains are permissioned. Central bank is responsible for maintaining the superchain and can analyze data
on the superchain, avoiding double-spending and protecting
268

## Page 6

T. Zhang and Z. Huang

ICT Express 8 (2022) 264–270

4.2.3. Usage scenarios
As for usage scenarios, blockchain based CBDC should
consider issues related to usage scenarios, including offline
payment, user privacy, regulation, security and convenience.
Just like cash, CBDC should support dual offline payments
and protect user privacy. The prevailing proposals on dual
offline payments are hardware based wallet. Thus, security
of hardware wallet is the key to security of user funds. As
fiat money, blockchain based CBDC should be inclusive and
convenient for all, including people without smartphone. So
these issues related to usage scenarios should be resolved as
soon as possible.
5. Conclusion
There is a hot debate on adoption of blockchain in CBDC
design. Characteristics of blockchain are suitable for requirements of CBDC design. In the paper, we make a literature
review on blockchain based CBDC schemes both from central
banks and research communities. Compared to permissionless blockchain, permissioned blockchain is more suitable for
CBDC design. However, there is no central bank who has
implemented a blockchain based CBDC. Because there are
some challenges to be solved in blockchain based CBDC,
including performance, scalability, cross-chain interoperability
and usage scenarios. Our work is timely and can provide
guidelines for blockchain based CBDC design.

Fig. 1. Blockchain based CBDC design.

4.2. Challenges and open issues
Most central banks are positive to CBDC schemes with
blockchain, many even have proposed blockchain based CBDC
prototypes. However, these banks only explore application of
blockchain in CBDC and no central bank has implemented
a blockchain based CBDC. Because there are still some
challenges to overcome both in blockchain and blockchain
based CBDC, such as performance, scalability, cross-chain
interoperability and usage scenarios.

Declaration of competing interest
The authors declare that they have no known competing
financial interests or personal relationships that could have
appeared to influence the work reported in this paper.

4.2.1. Performance and scalability
In 2019, FastFabric [25] is proposed as an extension of Hyperledger Fabric, which increases transaction throughput from
3000 to 20,000 TPS (transactions per second). However, Visa
can process 76,000 transaction per second [26]. Performance
of current blockchain system is still lower than traditional
centralized systems. And blockchain should have the good
scalability to deal with increasing transactions. However, there
are no perfect solutions to resolve these issues in blockchain.
Performance and scalability are also two main challenges for
blockchain based CBDC.

Acknowledgments
This work was supported by Guangxi Key Laboratory of
Trusted Software, China (kx202016), Guangxi Key Laboratory
of Cryptography and Information Security, China
(GCIS201806), Key Lab of Film and TV Media Technology
of Zhejiang Province, China (2020E10015), Fujian Provincial
Key Laboratory of Financial Science and Technology Innovation, Fuzhou University, Fujian Jiangxia University, China
(KF1901), Key Laboratory of Oceanographic Big Data Mining
& Application of Zhejiang Province, China (obdma202001).

4.2.2. Cross-chain interoperability
As different countries and central banks are exploring
blockchain based CBDC schemes, different blockchains are
chosen, such as Corda, Ethereum and Fabric. For example,
Corda is used in Project Jasper/ CAD-coin and E-krona,
Quorum is adopted in Project Khokha, Ethereum will be used
in Australia’s CBDC project. As for cross-border transactions,
these different blockchain based CBDC networks need to communicate and exchange. However, different blockchains may
use different encryption algorithms, consensus algorithms, digital signature schemes, hashing algorithms, transaction structures and block sizes. Cross-chain interoperability among
different blockchains is a big challenge for both blockchain
and blockchain based CBDC schemes. If domestic payments
are the only focus of CBDC, cross-chain interoperability may
not be under consideration.

References
[1] S. Nakamoto, Bitcoin: A peer-to-peer electronic cash system, 2008.
[2] E.A. Opare, K. Kim, A compendium of practices for central bank
digital currencies for multinational financial infrastructures, IEEE
Access 8 (2020) 110810–110847, http://dx.doi.org/10.1109/ACCESS.
2020.3001970.
[3] Tobias Adrian, Martin Muhleisen, Maurice Obstfeld, Casting light on
central bank digital currencies, Staff Discussion Notes 2018 008 (2018)
A001, http://dx.doi.org/10.5089/9781484384572.006.A001.
[4] BIS, Central bank digital currencies: foundational principles and core
features, https://www.bis.org/publ/othp33.pdf.
[5] W.E. Forum, Central Banks and Distributed Ledger Technology:
How are Central Banks Exploring Blockchain Today?
http://www3.weforum.org/docs/WEF_Central_Bank_Activity_in_
Blockchain_DLT.pdf.
269

## Page 7

T. Zhang and Z. Huang

ICT Express 8 (2022) 264–270
[19] Reserve Bank partners with Commonwealth Bank, National Australia
Bank, Perpetual and ConsenSys Software on Wholesale Central
Bank Digital Currency Research Project, https://www.rba.gov.au/
media-releases/2020/mr-20-27.html.
[20] H. Sun, H. Mao, X. Bai, Z. Chen, K. Hu, W. Yu, Multi-blockchain
model for central bank digital currency, in: 2017 18th International
Conference on Parallel and Distributed Computing, Applications and
Technologies (PDCAT), 18-20 Dec. 2017, 2017, pp. 360–367, http:
//dx.doi.org/10.1109/PDCAT.2017.00066.
[21] W. Tsai, Z. Zhao, C. Zhang, L. Yu, E. Deng, A multi-chain model for
CBDC, in: 2018 5th International Conference on Dependable Systems
and their Applications (DSA), 22-23 Sept. 2018, 2018, pp. 25–34,
http://dx.doi.org/10.1109/DSA.2018.00016.
[22] X. Han, Y. Yuan, F. Wang, A blockchain-based framework for central
bank digital currency, in: 2019 IEEE International Conference on
Service Operations and Logistics, and Informatics (SOLI), 6-8 Nov.
2019, 2019, pp. 263–268, http://dx.doi.org/10.1109/SOLI48380.2019.
8955032.
[23] H. Tian, X. Chen, Y. Ding, X. Zhu, F. Zhang, AFCoin: A framework for digital fiat currency of central banks based on account
model, in: Information Security and Cryptology, Springer International
Publishing, Cham, 2019, pp. 70–85.
[24] Q. Yao, Experimental study on prototype system of central bank
digital currency, J. Softw. 29 (9) (2018) 2716–2732, http://dx.doi.org/
10.13328/j.cnki.jos.005595, (in Chinese).
[25] C. Gorenflo, S. Lee, L. Golab, S. Keshav, Fastfabric: Scaling hyperledger fabric to 20, 000 transactions per second, in: 2019 IEEE
International Conference on Blockchain and Cryptocurrency (ICBC),
14-17 2019, 2019, pp. 455–463, http://dx.doi.org/10.1109/BLOC.2019.
8751452.
[26] https://usa.visa.com/about-visa/visanet.html.

[6] C. Board, A. Wehrli, Ready, steady, go? - Results of the third
BIS survey on central bank digital currency, https://www.bis.org/publ/
bppdf/bispap114.pdf.
[7] N. Dashkevich, S. Counsell, G. Destefanis, Blockchain application for
central banks: A systematic mapping study, IEEE Access 8 (2020)
139918–139952, http://dx.doi.org/10.1109/ACCESS.2020.3012295.
[8] Christian Esposito, Massimo Ficco, Brij Bhooshan Gupta, Blockchainbased authentication and authorization for smart city applications,
Inf. Process. Manage. (ISSN: 0306-4573) 58 (2) (2021) 102468,
http://dx.doi.org/10.1016/j.ipm.2020.102468.
[9] Bank of England, Discussion Paper: Central Bank Digital Currency. https://www.bankofengland.co.uk/-/media/boe/files/paper/2020/
central-bank-digital-currency-opportunities-challenges-and-design.pdf.
[10] D.N. Bank, Annual report DNB, 2015, https://www.dnb.nl/binaries/
Jaarverslag%202015_tcm46-339389.pdf.
[11] G. Danezis, S. Meiklejohn, Centrally Banked Cryptocurrencies, in:
2016 Network and Distributed System Security Symposium, San
Diego, CA, USA, 2016.
[12] Project
Jasper,
https://www.bankofcanada.ca/research/digitalcurrencies-and-fintech/projects/.
[13] Project Ubin, https://www.mas.gov.sg/schemes-and-initiatives/ProjectUbin.
[14] Project Stella, https://www.boj.or.jp/en/announcements/release_2020/
rel200212a.htm/.
[15] Project khokha, https://consensys.net/blockchain-use-cases/finance/
project-khokha/.
[16] E-krona, https://www.riksbank.se/globalassets/media/rapporter/e-krona/
2019/the-riksbanks-e-krona-pilot.pdf.
[17] Project
Inthanon,
https://www.bot.or.th/English/FinancialMarkets/
ProjectInthanon/Documents/Inthanon_Phase2_Report.pdf.
[18] Inthanon-LionRock,
https://www.hkma.gov.hk/media/eng/doc/keyfunctions/financial-infrastructure/Report_on_Project_InthanonLionRock.pdf.

270
