---
source_type: pdf
title: "SoK: Blockchain Applications in Central Bank Digital Currencies (CBDCs)"
original_file: "thesis/reference/Blockchain application for central bank digital currencies (CBDC).pdf"
sha256: "d5049740cbadf6ba535b4877a5fb4c98c7300325caa23a76f127b02a6dbeeaeb"
page_count: 15
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: SoK: Blockchain Applications in Central Bank Digital Currencies (CBDCs)

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Cluster Computing (2023) 26:2183–2197
https://doi.org/10.1007/s10586-022-03962-z

(0123456789().,-volV)(0123456789().,-volV)

Blockchain application for central bank digital currencies (CBDC)
Vijak Sethaput1

•

Supachate Innet1

Received: 29 April 2022 / Revised: 24 December 2022 / Accepted: 28 December 2022 / Published online: 16 January 2023
 The Author(s), under exclusive licence to Springer Science+Business Media, LLC, part of Springer Nature 2023

Abstract
Central Bank Digital Currency (CBDC) is a digital version of domestic currency with a unit of account equivalent to its
domestic currency. Blockchain or Distributed Ledger technology (DLT) can be used to implement CBDC to execute and
settle peer-to-peer transactions. With the emergence of private money, such as cryptocurrencies and stablecoins, and the
growing use of digital payments to lessen the global pandemic spread, CBDC is an active research area among central
banks worldwide. Many central banks started their CBDC projects by building DLT proofs of concept (PoCs) to replicate
wholesale payment systems and expand their investigation into other use cases, such as delivery versus Payment (DvP) and
cross-border remittance. Many large economies like the United States have projects exploring CBDC. The People’s Bank
of China (PBoC), China Central Bank, has already started a pilot testing of their digital retail currency. This paper
discusses the application of blockchain for CBDC by presenting CBDC projects by central banks. Moreover, this paper
analyses issues, identify challenges and discusses future works in this rapidly evolving field.
Keywords Central bank digital currency  CBDC  Digital currency

1 Introduction
This section has two subsections. The first subsection
highlights the digital transformation of currency from
exchange of things to physical token then evolve to be
digital data in ledger and digital token today. The second
subsection describes the organization and contribution of
this paper.

1.1 Digital transformation of currency
Before the invention of ‘‘Currency,’’ humans exchange
goods and services directly using the barter system. For
example, a farmer may want to barter a bowl of rice for
kilograms of meat. However, this arrangement takes time
and suffers at least three significant issues. First, the parties
must find each other to make the trade. Second, they must

& Vijak Sethaput
vijak_set@live4.utcc.ac.th
Supachate Innet
supachate_inn@utcc.ac.th
1

School of Engineering, University of the Thai Chamber of
Commerce (UTCC), Bangkok, Thailand

agree on the unit, such as how many bowls of rice would be
for those kilograms of meat third, once the exchange is
done. People cannot store the value of goods for a long
time since most goods traded using this method are perishable. Slowly, a currency was developed over the centuries using traded goods such as salt or weapons as the
medium of exchange, a unit of account, and a store of
value. However, those traded items used as currencies were
similar but not identical in every unit. Humans solve this
problem by minting metal coins that already have intrinsic
value and are standardized in every unit of coinage. The
first official currency was the Lydian coins made from
electrum, a mixture of silver and gold that occurs naturally.
The coins were stamped with pictures that acted as
denominations. The use of government-minted metal coins
continued until today.
With the lighter weight of paper currency, which can
easily be transported, China’s Yuan dynasty was one of the
first to move from coins to paper money. However, some of
Europe still used metal coins as their only currency until
the sixteenth century. This is because European acquisitions of the new colonies provided new sources of precious
metals and enabled nations to keep minting more coins.
However, bank depositors and borrowers started using
paper banknotes to carry around in place of metal coins.

123

## Page 2

2184

People can take those notes to the bank at any time to
exchange for their face value in metal—usually silver or
gold—coins. These paper notes could also be used to buy
goods and services like today’s currency. However, it was
privately issued by banks and private institutions, not the
governments. To create more trust in these notes, many
governments issued this paper currency by having assets
such as gold to back up the value of each banknote issued,
so only a limited number of banknotes could be printed.
Hence, this provides more stability in previously unbacked
currency.
Mobile payment and virtual currency are the two innovative forms of currency in the twenty first century. People
can use their portable electronic devices, such as smartphones or tablets, to pay for their goods or services and
send money to friends or family members. In 2009, Bitcoin, a new form of currency which is a virtual currency,
was released. Virtual currencies have no physical coinage
but are in digital format. It is operated using a decentralized
system, unlike fiat currency, centralized and controlled by
government-issued currencies.
CBDC is a digital version of domestic currency with a
unit of account equivalent to its domestic currency. The
holder of this CBDC has a direct claim on the Central Bank
balance sheet. With the emergence of private money, such
as cryptocurrencies and stablecoins, and the growing use of
digital payments to lessen the global pandemic spread,
CBDC is an active research area for most central banks
worldwide. More than a quarter of them are now developing or running concrete pilots, as reported by Bank for
International Settlements (BIS) [1]. In [1], BIS updates
earlier surveys that asked central banks for their CBDC
engagement. This shows that more than two-thirds of
central banks will likely issue a retail CBDC in the short or
medium term. Many are exploring a CBDC ecosystem that
involves private sector collaboration and interoperability
with existing payment systems.

1.2 Organization and contribution
This paper is organized as follows: (together with the
highlight of our contribution.)
• Section 2 provides related work from Blockchain or
Distributed Ledger Technology (DLT), stablecoins, and
Facebook Libra or Diem, which are fundamental for our
CBDC studies.
• Section 3 surveys wholesale and retail Central Bank
Digital Currency (CBDC) projects worldwide.
• Section 4 analyzes the technical platform and design
issues for CBDC.
• Section 5 posts challenges for CBDC.
• Section 6 discusses future works and provides a
conclusion.

123

Cluster Computing (2023) 26:2183–2197

2 Related works
2.1 Blockchain or distributed ledger technology
(DLT)
DLT is a set of technologies or protocols that use distributed participants to collectively and securely maintain a
decentralized digital database without a single central
authority. Bitcoin, invented in 2008 and released in 2009
by an unknown person or group of persons named Satoshi
Nakamoto [2], is the most famous application of DLT.
Another example is Ethereum [3] which has programmable
as its distinctive feature. Developers can use Ethereum as a
platform to build many innovative cryptocurrencies or
applications called decentralized applications (or ‘‘dapps’’).
Based on Bitcoin or Ethereum, many cryptocurrencies
were created and are called ‘‘Altcoins.’’
Since only those involved in the transaction should see
the transaction as the main requirement for financial
transactions, ‘‘private’’ or ‘‘permissioned’’ DLT, which
requires that nodes in the system must be permitted to join,
emerges as the solution for this problem. Hence, many
Central Banks choose this DLT platform to implement
their CBDC. Corda [4] is an open-source ‘‘private’’ DLT
platform that provides strict privacy for recording and
managing contracts between mutually distrusting parties.
Corda is unique among blockchain platforms that introduce
the concept of ‘‘Notary,’’ which stamps every transaction to
avoid double-spending. Hyperledger Fabric [5] is another
‘‘permissioned’’ DLT foundation for application development or modular architecture solutions. Quorum [6] is a
DLT based on Ethereum that combines the innovation of
the public Ethereum community with enhancements to
support enterprise needs. Hyperledger Iroha [7] is designed
to be simple and easy to incorporate into projects that
require DLT with a new crash fault-tolerant consensus
algorithm called YAC [8]. Hyperledger Besu [9] is an
enterprise-friendly Ethereum client for public and private
permissioned networks. Hyperledger Besu includes several
consensus algorithms and has comprehensive permissioning schemes explicitly designed for use in a consortium
environment. Elements [10] is an open-source, sidechaincapable blockchain platform providing access to community-developed features such as Confidential Transactions
and Issued Assets. Interledger [11] is an open protocol for
sending payments across various ledgers, enabling interoperability for any value transfer system. Bitt [12] is a
company that has expertise in digital currency and provides
a solution for central banks to develop and implement
digital currency for a central bank using blockchain or DLT
technologies.

## Page 3

Cluster Computing (2023) 26:2183–2197

2.2 Stable coins
Stablecoins are cryptocurrencies designed to minimize the
price volatility relative to some ‘‘stable’’ asset or basket of
assets. This is a significant problem for cryptocurrencies to
be used as payment instruments. A stablecoin can be
pegged to assets such as fiat money or exchange-traded
commodities (Asset-Backed), a cryptocurrency (CryptoBacked), or does not peg to anything but has a mechanism
to stabilize its value (Algorithmic).

2.3 Facebook Libra or Diem
In June 2019, Libra formally published its white paper
[13]. After the announcement, many regulators, central
banks, and politicians strongly criticized and opposed the
project causing a few members to leave the associations.
The main concerns are the threat to countries’ monetary
sovereignty, financial stability, and systemic financial risks,
consumer protection, the potential for marketing dominance abuse, privacy concerns resulting from Facebook’s
dubious reputation given the previous scandal, and lack of
explicit compliance undermining global regulatory efforts,
especially in money laundering. With the ‘‘Libra 2.0’’
blueprint [14], the Libra association hopes to address
concerns from regulators and opposition groups.
In Libra, the Libra Association is a trusted entity as ‘‘a
de facto central bank.’’ Hence it is not decentralized.
Unlike bitcoin, which uses ‘‘public’’ or ‘‘permissionless’’
blockchain and relies on cryptocurrency mining, Libra
processed transactions only by members of the Libra
Association via the permissioned blockchain. At first, Libra
would transition to a ‘‘permissionless’’ proof-of-stake system within five years, but this idea was later dropped.
Calibra, now renamed ‘‘Nuvi,’’ is a digital wallet for Libra.
‘‘Nuvi’’ will be a standalone app in Messenger and
WhatsApp. The association also changed its name from
‘‘Libra’’ to ‘‘Diem’’ in December 2020 to be the new
beginning for its launch of single currency stablecoin in
2021 which never materialized as it sold the Diem Group’s
Assets to Silvergate in 2022 [15].

2.4 Blockchain application for central banks
With the disruptive potential of Blockchain or Distributed
Ledger Technology (DLT), many central banks are interested in adapting this technology with many use cases [16]
utilizes a systematic mapping study approach to this field
of study, presents an in-depth assessment of research
maturity and the types of researchers, and found that the
most research-intensive use-cases for the central banks are
Central Bank issued Digital Currency (CBDC, Regulatory

2185

Compliance, Payment Clearing and Settlement Systems
(PCS). [17] analyzes requirements of CBDC design, make
a literature review on blockchain based CBDC schemes,
and provide guidelines for blockchain based CBDC design.

3 Central bank digital currency (CBDC)
CBDC is a digital version of domestic currency with a unit
of account equivalent to its domestic currency. CDBC can
be classified as retail or wholesale. Retail CBDC is issued
for general use, such as person-to-person or person-tobusiness payments. For more efficient interbank payments,
wholesale CBDC is issued only by financial institutions
and clearinghouses. With the emergence of private digital
currencies such as Bitcoin [2], Ethereum [3], Diem, or
Libra [13], CBDC often assumes to be implemented by
using blockchain or DLT. However, CBDC can be
implemented using centralized architecture. This section
discusses the case for CBDC and surveys both wholesale
and retail CBDC as define in the Tables 1 and 2.

3.1 Case for CBDC
In a world where cash use is decreasing, and private
e-money is ubiquitous and currently controlled by a few
large companies, such as in China or Sweden, CBDC can
bring many people who use private money back to use
public money in a financial system. CBDC can also enable
the domestic payment system to be more resilient.
Since digital penetration, such as a smartphone, is more
significant than a bank account in many countries, CBDC
could provide financial inclusion for the unbanked who
access smartphones. In addition, CBDC can help users
access current digital payment tools at considerably lower
or zero costs without a bank account.
Utilizing CBDCs can help financial institutions or fintech companies experiment with DLT on its programable
money features, encouraging competition and innovation in
the financial sector. Newcomers can build on CBDC programable money features to enter the payments market and
offer solutions that reduce smaller institutions’ need to
execute their payments through larger banks. Using
advanced digital features like smart contracts and programmable money, innovators can utilize these as the basis
of innovative new financial services or platforms.
A domestically issued CBDC would help lessen or fend
off privately issued currency adoption. Central Banks can
retain sovereignty over monetary policy. CBDC can be
used to enhance monetary policy transmission. Some academics also argue that CBDC that pays interest would
increase the economy’s response to changes in the policy
rate. CBDC that pays negative interest rates can break the

123

## Page 4

2186
Table 1 Wholesale CBDC
projects

Cluster Computing (2023) 26:2183–2197

Project

Abbreviation

Country

Jasper

J

Canada

Ubin

U

Singapore

Steller

S

EU and Japan

Khokha

K

South Africa

Inthanon

I

Thailand

mCBDC Bridge

M

BIS, Thailand, Hongkong, China, UAE

Table 2 Retail CBDC projects
Project

Abbreviation

Country

e-CNY or China DECP

C

China

Bahamas Sand Dollar

B

The
Bahamas

e-Krona

K

Sweden

Nigeria eNaira

N

Nigeria

Bakong

B

Cambodia

Project Hamilton

H

USA

Thailand Retail CBDC

TH

Thailand

e-Peso

P

Uruguay

Hryvnia

U

Ukrane

More of an all-in-one mobile payment
and banking app than retail CBDC

‘‘zero lower bound’’ constraint to make holding cash costly
during a prolonged crisis.
While there are some definite benefits and advantages,
there are also challenges and disadvantages of CBDC,
which can be mitigated by the appropriate design of
CBDC. The challenges and issues are discussed in Sect. 4.

3.2 Wholesale CBDC
This section provides surveys of wholesale CBDC project
worldwide as summaries in Table 1.

3.2.1 Project Jasper
Launched in March 2016, Project Jasper [18] primary
objective is to understand how DLT could transform the
payments in Canada. The project is a collaborative effort
between Payments Canada, its member financial institutions, the Bank of Canada, and other market participants.
The project has 3 Phases which are Phase I: Platform
allows for Central Bank-Issued Digital Receipt for
Deposited Fund [19], Phase II: New DLT Platform [20],
Phase III: Securities Settlement using Distributed Ledger
Technology [21]. Project Jasper focused on clearing and
settling high-value interbank cash payments using DLT in

123

phases I and II. However, phase III explored integrated
payments and securities (Delivery versus Payment, DvP).
3.2.2 Project Ubin: Singapore’s central bank digital money
using distributed ledger technology
Project Ubin [22] results from the collaboration between
the Monetary Authority of Singapore (MAS) and the
industry to better understand Blockchain and DLT potential benefits through practical experimentation by developing more easy-to-use and efficient alternative payments
and securities clearance and settlement systems based on
CBDC. The project has five phases: Phase I: Tokenize
SGD [23], Phase II: Re-Imagine RTGS [24] and the
source-codes [25], Phase III: Delivery versus Payment
(DvP) [26] to develop tokenized assets settlements across
various blockchain platforms Phase IV: Cross Border
Payment versus Payment (PvP) [27] produced the report,
Cross-border interbank payments, and settlements:
Emerging opportunities for digital transformation [28], and
Phase V: Enabling Broad Ecosystem Collaboration [29],
developed prototype by MAS with J.P. Morgan and
Temasek that enables payments to be executed in various
currencies on the same network and seamlessly connect
and interface with other blockchain networks. The network
also supports use cases such as securities trading asset DvP
clearing and settlement, private exchanges settlement,
conditional payments, escrow for trade, and trade finance
payment commitments [30]. Phase V also considers DLT
payments network commercial viability and value beyond
technical experimentation.
3.2.3 Project Stella
In December 2016, Project Stella was a joint research
project of the European Central Bank (ECB) and the Bank
of Japan (BOJ). This project has three phases and produces
reports. Published in September 2017, Phase 1 [31] analyzed large-value payment processing using DLT. Published in March 2018, phase 2 [32] investigated securities
delivery versus payment (DvP) in a DLT environment.
Published in June 2019, phase 3 [33], DLT-related technologies could improve cross-border payments, especially

## Page 5

Cluster Computing (2023) 26:2183–2197

in terms of safety. Like other CBDC study projects, Project
Stella analysis and experimental results are not meant to
replace or complement existing arrangements. The scope of
the project does not include legal and regulatory aspects.
[34]
3.2.4 Project Khokha
Early in 2018, Project Khokha [35] was formally initiated
by the South African Reserve Bank (SARB). This project
was a collaborative effort that involved many partners: a
consortium of banks, ConsenSys as the technical partner,
and PricewaterhouseCoopers Inc. (PwC) as the support
partner. Khokha is a Zulu word meaning ‘pay.‘ Project
Khokha is an Enterprise Ethereum solution to increase
transaction volume and network resilience while maintaining confidentiality requirements for real-time gross
settlement. Managed by the SARB Fintech Unit, the project planning started late in 2017, with execution running
for 14 weeks from January to April 2018.
3.2.5 Project Inthanon
The Bank of Thailand (BOT) collaborated with eight
commercial banks to initiate Project Inthanon. The project’s primary goal is to explore the potential of DLT for
improving efficiencies in financial market infrastructure.
Project Inthanon is divided into three phases, starting with
the study of DLT as a mechanism for managing and settlement of wholesale payments between banks (Real-time
Gross Settlement, RTGS) in phase I, continuing with the
study of DLT smart contracts in phase II, and the study of
cross border payments in phase III.
3.2.5.1 Project Inthanon phase I: real-time gross settlement
(RTGS) Project Inthanon Phase I [36] focused on building
a decentralized RTGS prototype with important payment
functionalities: tokenization of cash and bond, decentralized bilateral transfer, queuing mechanisms, gridlock resolution (GR), and automated liquidity provision (ALP).
The GR and ALP design and implementation were innovative and significant additional contributions to other
central bank studies. A decentralized payment network
prototype was built using the Corda platform. BOT nodes
and bank nodes are in this network. The BOT node is the
only node that can mint and destroy Thai Baht cash tokens.
Other bank nodes can convert their RTGS balance into
cash tokens through the cash tokenization process. Once
the bank nodes have cash tokens, they can use them for
peer-to-peer payment to other nodes.
3.2.5.2 Project Inthanon phase II: smart contracts This
phase was built upon RTGS PoC from Phase I and

2187

continues to collaborate, design, develop, and test a PoC as
in phase I. Aiming to improve settlement efficiency and
solve business use cases’ pain points, Phase II [37] investigates two key areas. The first area is the interbank bond
trading and repurchase life cycle. The second area is regulatory compliance and data reconciliation for third-party
funds transfers. Phase II illustrated that DLT, with smart
contract implementation, could help enhance bond trading
and repurchasing activities. This bond life cycle includes
coupon payments, interbank trading, and repurchase
transactions. Using smart contracts for process automation,
Post-trade can operate more efficiently, and liquidity
management can be improved. Moreover, the redesigned
third-party fund’s transfer workflow could avert fraudulent
transactions by letting senders verify beneficiary information before submitting the transactions and allowing
involved parties to track the status of the transactions for
more transparency.
3.2.5.3 Project Inthanon-Lion rock: cross-border settlement As the Hong Kong Monetary Authority (HKMA)
and the Bank of Thailand (BOT) signed the Memorandum
of Understanding in May 2019, the two authorities continue to work together and initiate Project Inthanon-LionRock to study CBDC application to cross-border payments.
In January 2020, they announced the outcomes [38] and
published a report [39]. As a result, the THB-HKD crossborder corridor’s network prototype was developed successfully with ten participating banks from both countries.
This network enables participating banks in Hong Kong
and Thailand to conduct peer-to-peer funds transfers and
foreign exchange transactions. This reduces settlement
layers and eliminates intermediaries such as corresponding
banks, which is the current practice.
3.2.5.4 Central bank digital currency: the future of payments for corporates With the exploration of CBDC for
corporates in this project, the BOT expands its CBDC
research and development to businesses. This project
demonstrates that DLT can increase payment efficiency for
businesses. By allowing users to set various conditions on
the CBDC, such as specific conditions for payments for
specified invoices in supply chain financing, CBDC can
enhance flexibility in handling business activities. However, the project found some limitations in scaling to
support a high volume of transactions and preserving the
privacy of the transactions, which needs to be explored
further.
3.2.5.5 Cross border payment or multiple CBDCs The
Multiple CBDC (mCBDC) Bridge [40] is a wholesale
CBDC project first bilaterally initiated by HKMA and BOT
in 3.2.5.3. The project was renamed mCBDC Bridge after

123

## Page 6

2188

the BIS innovation hub, the People’s Bank of China Digital
Currency Institute, and the Central Bank of the United
Arab Emirates joined. By developing a prototype that
provides instant cross-border payment versus payment
(PvP) in multi-currency cross-border payments, the project
participant can investigate DLT potential and issues such
as scalability, interoperability, privacy, governance, and
significant challenges in the design of CBDC application
for multi-currency cross border CBDC.
The project Dunbar [41] is the collaborative work by the
Reserve Bank of Australia, Bank Negara Malaysia, the
Monetary Authority of Singapore, and the South African
Reserve Bank with the Bank for International Settlements
Innovation Hub. Project Dunbar’s objective is to develop
prototype shared platforms for cross-border transactions
using multiple CBDCs that enable financial institutions to
directly conduct transactions in digital currencies, eliminating intermediaries and reducing transaction time and
cost. Hence, this could make cross-border payments
cheaper, faster, and safer. The report [42] published in
March 2022, provides a broad overview of the multiCBDC, key benefits and challenges, describes the design,
and identifies and categorizes across the areas of policy,
business, and technology. The report also identifies key
milestones and next steps that represent problem statements that need further exploration in the multi-CBDC
space and constitutes an open call for collaboration to the
central banking, banking and payment, and broader technology ecosystem.
3.2.5.6 Retail CBDC Early in 2020, there was a growing
interest in retail CBDC due to three major trends: the
announcement of global stablecoins such as Libra or Diem,
the People’s Bank of China testing of the digital currency
electronics payment (DCEP) or e-CNY, and the COVID-19
pandemic which encourages digital payment. Table 2
summaries the project surveyed in this section.

3.2.5.7 PBoC DCEP or China e-CNY or digital Yuan Digital
Currency DCEP (Digital Currency Electronic Payment,
DCEP) [43, 44] or e-CNY [45] is a proposed digital version
of China cash issued only by the People’s Bank of China
(PBoC). e-CNY is backed by reserves and has properties
like paper money but only in digital form. Following the
Facebook announcement of Libra, PBoC accelerates its
effort to test and plan to launch its digital currency to guard
against the effect of other private or public digital currencies on its monetary sovereignty and currency (CNY).
This could be considered the world’s first retail CBDC as
PBoC issues it, and it is not listed on cryptocurrency
exchanges and will not be for speculation of value.

123

Cluster Computing (2023) 26:2183–2197

For issuance and redemptions, e-CNY would be based
on a ‘‘two-tier system.‘‘ PBoC would issue and redeem
China’s CBDC via commercial banks or other financial
institutions on the first layer. Commercial banks would
redistribute this CBDC to retail customers on the second
layer. However, this design has a ‘‘blockchain as an
option’’ as the technical roadmap has not been released yet.
In addition, e-CNY would allow fund transfers without
requiring bank accounts or a ‘‘loosely-coupled’’ design.
e-CNY would also have an ‘‘offline’’ fund transfer feature.
With e-CNY, the PBoC hopes to conduct a more effective
monetary policy while having a broader view of all businesses and individuals across China. However, individual
financial privacy abuses are still potential risks and remain
serious concerns. Further, China can increase its CNY
circulation and global reach with the hope that CNY will be
a global currency like the US Dollar in the digital world.
3.2.5.8 Project sand dollar by central bank of The
Bahamas Project Sand Dollar [46] is the Central Bank of
The Bahamas’ initiative to issue its digital Bahamian dollar
(B$) and implement the digital payments system infrastructure to support the operation of a digital currency
ecosystem.
3.2.5.9 The Riksbank’s e-krona pilot In Sweden, private
e-money payments have increased, and cash is declining.
Since cash is the only possibility for the general public to
hold and pay with central bank-issued money, Riksbank,
Sweden Central Bank, has decided to study CBDC. This
works as a complement to cash and is named ‘‘e-krona.’’
The project aims to increase the Riksbank knowledge of a
central bank-issued digital krona and show how the general
public could use an e-krona in a test environment. This
technical solution [47] will be based on DLT. However,
there is no decision on issuing an e-krona.
3.2.5.10 Nigeria’s eNaira In early 2021, Nigeria’s government and the Central Bank of Nigeria (CBN) issued
crypto transactions ban within the banking sector in
response to the rise of cryptocurrency. Then, a few months
later, Nigeria announced the plans to introduce the retail
CBDC for Nigeria named eNaria. Like cash or coin, the
eNaira is also a liability of the CBN and complements
Nigeria’s physical currency. In October 2021, CBN launched eNaira [48, 49]. Draws substantial international
interest, especially the other economy’s central banks.
With a digital currency management system (DCMS)
from the fintech company Bitt, the technology behind the
eNaira is blockchain-like in crypto-assets. However, the
eNaira is not as open as crypto-assets because the central
bank controls its access. The eNaira is stored in digital
wallets, transferred digitally to anyone with its wallet at no

## Page 7

Cluster Computing (2023) 26:2183–2197

cost, and used for payment. CBN expects that the eNaira
will gradually bring multiple benefits with a robust regulatory system as the eNaira becomes more widespread. Key
benefits are increased financial inclusion, remittance
facilitation, and reduced informality.
With about half of the population with a mobile phone
[50], the eNaira will expand to the unbanked population,
allow financial access with a mobile phone, and support
more direct transfer for government or social programs.
Hence, increasing financial inclusion. With remittance
receipts amounting to $17 billion in 2020 [51], Nigeria is
one of the significant remittance destinations. With the
high cost per transaction using traditional remittance services, the eNaira will make it easier for Nigerians in foreign countries to remit funds to Nigeria using eNaira
wallet-to-wallet transfer with lower remittance transfer
costs. With exchange rate reforms, including a unified
market-clearing rate, remittance using eNaira would
enhance the invention by reducing the gap between official
and parallel market exchange rates. With transactions over
half of the GDP and equivalent to 80% employment,
Nigeria has significant informal economy employment.
Moreover, the eNaira is account-based which makes it
traceable. As a result, the eNaira makes informal payments
more transparent and enhances consumption through
greater financial inclusion with greater adoption and
widespread usage.
3.2.5.11 Cambodia: project Bakong Bakong [52] is more
of an all-in-one mobile payment and banking app than
retail CBDC. Cambodians can quickly receive and transfer
funds using their personalized QR code or mobile phone
number using the system they registered with a National ID
card/Passport and local valid phone numbers instead of
using a bank account.
3.2.5.12 Digital dollar and project Hamilton There are
two projects involving digital dollars. The first project is a
partnership between Accenture and the Digital Dollar
Foundation called the ‘‘Digital Dollar Project.‘‘ The project
issued its white paper [53] detailing a plan and considerations for developing a US CBDC. It proposes a tokenized
US digital dollar champion model, outlines US. CBDC
benefits, and offers potential use cases and pilots.
The second project is Project Hamilton [54], the collaboration project between the Federal Reserve Bank of
Boston and the Massachusetts Institute of Technology’s
Digital Currency Initiative. This exploratory research project tries to understand the opportunities and limitations of
promising CBDC technologies [55]. Project Hamilton
explores the design of CBDC and gets a practical understanding of the technical challenges and opportunities for
CBDC. The primary goal for phase 1 was to design a core

2189

transaction processor with extensive retail payment system
requirements of robust speed, high throughput, and fault
tolerance. The secondary goal was to create a flexible
platform for collaboration, data gathering, comparison with
multiple architectures, and future research. With this
intention, the project publicly releases all software from the
study under the MIT open-source license [56]. Since phase
1 focuses on the feasibility and performance of transactions, Phase 2 aims to create a foundation for more complex functionality, such as time to the finality of fewer than
five seconds, the throughput of 100,000 transactions per
second, and wide-scale geographic fault tolerance. Various
topics are also left to Phase 2. These include questions
around high-security issuance, systemwide auditability,
programmability, balancing privacy with compliance,
technical roles for intermediaries, and denial of service
attacks resiliency.
3.2.5.13 Thailand’s retail CBDC After exploring Wholesale CBDC in Project Inthanon, the Bank of Thailand
(BOT) announced Field [53] for its study, survey results,
and pilot test plan.
The study [57], the paper [58], and surveys show that
retail CBDC design and development must not harm the
transmission of monetary policy and financial institutions
or the overall stability of the financial system to reach its
full benefits. Accordingly, there are three characteristics of
retail CBDC. The first characteristic is that it should be like
cash and pay no interest. The second is that the distributors
of retail CBDC to the public should be intermediaries such
as financial institutions. The third characteristic is the
establishment of conditions or limits for converting CBDC.
With these characteristics, the central bank can be more
confident that retail CBDC would not affect deposits at
financial institutions or cause bank runs during a crisis.
These will also preserve the intermediaries’ role in collecting deposits, providing credits, and managing liquidity
in the financial system. With a prediction that retail CBDC
demand will gradually increase, it can become an alternate
payment method to cash and e-money in the future.
From the feedback from the public survey and discussion in a focus group, the respondents view that retail
CBDC has benefits as an infrastructure that is open to
access and competition. There is also a potential to foster
significant and safe financial innovation. As generally
agreed on by respondents, the CBDC design guidelines
from the study can also help mitigate the effects caused by
retail CBDC on the Thai financial sector. The respondents
also suggested promoting consumer education to have
more knowledge and understand benefits and use cases,
notably how retail CBDC differs from current electronic
payment options.

123

## Page 8

2190

Based on survey results and the study, the Retail CBDC
Pilot Test guidelines are established for developing and
testing in the real-life environment under the Foundation
and Innovation track. Expect to begin testing in 2022. The
Foundation Track tests and evaluates retail CBDC uses in
cash-like activities within a limited scale. For example, the
use cases accept, convert, or pay for goods and services.
Considering the format and criteria for participation, the
Innovation Track tests and evaluates how the private sector
and technology developers can develop innovative use
cases for retail CBDC. By assessing all results and associated risks from this Pilot test, the BOT will ensure that
the public can benefit from retail CBDC and that it does not
harm economic and financial stability.
3.2.5.14 e-Peso Uruguay In November 2017, the Central
Bank of Uruguay began a pilot program called called to
issue, circulate and test unique digital banknotes in several
denominations called ‘‘e-Peso.‘‘ The digital banknotes
were issued for distribution to a non-DLT platform named
‘‘e-note manager platform,‘‘ the registry of digital banknotes ownership. In this system, users can instantly
transfer e-Peso peer-to-peer via mobile phones using text
messages or the e-Peso app. The e-Peso pilot was successful and closed in April 2018. All e-Pesos were canceled. However, this project is in an evaluation phase, and
several questions are being considered before the central
bank decides on further trials and potential issuance in the
future.
3.2.5.15 Ukraine The National Bank of Ukraine, the
country’s central bank, has been working on a pilot project
[59] to test the usefulness of a digital version of its currency, the Hryvnia. In 2019, the National Bank of Ukraine
announced completing a two-month-long pilot involving
central bank employees [60].
3.2.6 Request for proposal/solutions and study groups
for CBDC
3.2.6.1 Request for proposal/solutions Several countries
choose to request proposals or solutions to study and test
CBDC. South African Reserve Bank: Request for expression of interest from prospective solution providers in
anticipation of a feasibility project to issue electronic legal
tender [61]. Banque de France calls for applications [62] to
experiment using digital euro for interbank settlements.
The Bank of Korea (BOK) launched a pilot test program
[63] to assess the logistics of issuing a CBDC and recently
took another step toward developing a CBDC with plans to
build a pilot platform. BOK said it intends to select a
technology supplier through an open bidding process to
research the practicalities of a CBDC. The test will run

123

Cluster Computing (2023) 26:2183–2197

from August to December 2021 and involve simulations of
banks and retailers, including mobile phone payments,
funds transfers, and deposits. BOK’s research into the
issuance of a CBDC was published in February 2021 and
determined that it could be treated like fiat currency, not a
crypto asset, and could therefore be exchanged freely with
cash.
3.2.7 Study groups
Six central banks from Canada (BoC), England (BoE),
Japan (BoJ), the European Central Bank (ECB), the
Sveriges Riksbank, and the Swiss National Bank, together
with the Bank for International Settlements (BIS), joined in
a group to share experiences as they investigate CBDC
potential in their home jurisdictions [64]. Central Banks in
this group have published numerous noteworthy papers.
For example, BoE’s Central Bank Digital Currency:
opportunities, challenges, and design [65], BIS’s Central
bank digital currencies [66], and the technology of retail
central bank digital currency [67].
International Telecommunications Union (ITU) also
established a Focus Group on Digital Currency, including
Digital Fiat Currency ITU [68] with Stanford University
[69]. In addition, the World Economic Forum (WEF)
publishes the Central Bank Digital Currency Policy-Maker
Toolkit [70] to help countries systematically study CBDC.

4 Technical platform and design issues
for CBDC
CBDC would be widely available at a basic level, local
electronic money, and issued by the central bank that must
have several high-level features such as scalability, confidentiality, resilience, and security. This section discusses
design issues and the technical platform for CBDC.

4.1 Centralized or distributed
Since many private-issued digital currencies such as
Libra or Diem [71] or Bitcoin [2] use blockchain or DLT to
ensure that the transaction is immutable, this often leads to
the assumption that CBDC might be implemented using
blockchain or DLT as discussed in the article [72]. However, it could also be a centralized digital fiat currency,
such as in eCurrency [73].

4.2 Immutability of transactions or consensus
In a Centralized system, the consensus has no problem
because it relies on the central trusted party to confirm the
system’s state. Bitcoin [2] was designed to reach consensus

## Page 9

Cluster Computing (2023) 26:2183–2197

in a trustless environment without the need to trust a single
centralized party. However, the Central bank is at least one
trusted central party in the CBDC environment. Hence,
many design features, such as proof-of-work (POW),
would be optional and desirable. In ‘‘permissioned’’ or
‘‘private’’ DLT, the Practical Byzantine Fault Tolerance
[74] consensus mechanism can be used and is more
straightforward because all the validators are known and
authorized. However, applying them to a CBDC would
need further studies of the risk and challenges.

4.3 Resiliency and availability
Widely available CBDC needs to have a high level of
operational resilience. DLT has this advantage over the
centralized system with its distributed nature, which has a
single point of failure disadvantage. CBDC that uses DLT
can continuously operate without interruption, even when
any validators stop working or the central bank is temporarily down. This is the fundamental difference to the
existing centralized financial architecture. However, this
DLT resiliency is optional in every scenario. For example,
when all nodes execute the same flawed ‘‘buggy’’ code,
that causes the system to stop operation. Centralized systems can operate by using multiple backups to achieve high
resiliency. However, DLT offers potentially better efficiency and cost-effectiveness to an increased level of
resilience.

4.4 Privacy and security
Providing full resilience and security benefits, the system
must allow multiple parties to help verify transactional
data. However, this compromises privacy for parties that
transact because others will also know the transactional
data. By using pseudonyms or addresses rather than realworld identities, DLT systems still have privacy issues.
Many studies found that hackers can determine various
information by analyzing pseudonyms or addresses. Consequently, this is not offering true privacy. Instead, a few
broad approaches to tackle this privacy of DLT: Permissioned DLT, No sensitive data included on the shared
ledger, data encryption, and cryptographic protocol such as
Zero-knowledge proof [75].

4.5 Scalability and operation efficiency
Blockchain and DLT systems today are still relatively
slow. For example, with about 10 min for bitcoin or around
15 s for Ethereum for transactions to be confirmed, DLT
CBDC must scale to meet the requirement of a few seconds
for transaction confirmation in a high peak load in thousands of transactions per second. However, the latest

2191

research paper from Project Hamilton [76] shows that retail
CBDC systems can provide high throughput, as high as one
hundred thousand transactions per second.
With widely used CBDC, more CBDC payments will
increase the number of transactions compared to existing
payment systems. Therefore, central banks will have to
decide to expand their computing or operational capacity to
handle this. However, by using DLT, central banks can set
the rules and requirements for CBDC and let various
vendors in the ecosystem provide on-demand computing
capacity. Hence, only necessary for the central bank to
operate some infrastructure.

4.6 Cybersecurity
With distributed nature of DLT, there is an increased
cybersecurity risk as more parties can access and participate in the system’s protocol. However, DLT can also offer
cybersecurity benefits. For example, when a single party is
compromised, the consensus mechanism can ensure that
other participants in the network will reject any deceptive
transactions.

4.7 Distribution models for CBDC
Another critical design feature is how the Central Bank will
distribute the CBDC. In BIS the technology of retail central
bank digital currency [67] proposes potential retail CBDC
architectures: Direct CBDC, Hybrid CBDC, Indirect or
synthetic CBDC.
4.7.1 Direct CBDC
In this model, Central Banks distribute CBDC themselves.
As a result, they will have to expand their computing and
operational capacity, such as Know Your Customer (KYC)
for all accounts. They will also have to allow many direct
claims on the Central Bank ledger.
4.7.2 Hybrid CBDC
In this model, Central Banks can have some intermediaries
to help distribute CBDC. Many central banks are working
with the private sector using this collaborative approach.
The only entity allowed to create or destroy a token in the
‘core ledger’ is the Central Bank. While private-sector
interacts with end-users, maintains KYC checks, and provides customers with additional ‘overlay services.‘ This
model can also be called the ‘‘Two-Tier Model,’’ as
explained in Sect. 3.2.5.7 PBoC DECP or e-CNY.

123

## Page 10

2192

Cluster Computing (2023) 26:2183–2197

Table 3 Techincal solutions for CBDC projects

4.7.3 Indirect CBDC
There are separate responsibilities between the private and
public sectors in hybrid proposals, such as the central bank,
asset issuance, and network governance. The indirect
CBDC model gives more responsibilities to the private
sector. ‘Synthetic CBDC’ (sCBDC) [77] is recently coined
by researchers at the IMF. In this model, Central Banks can
have a non-central bank institution or private sector intermediary that issues a stablecoin backed by central bank
reserve. That sCBDC held by retail participants is a liability of the private sector intermediary, not the central
bank, as in previous models.

4.8 Technical solutions for CBDC projects
Table 3 summarizes technical solutions for CBDC projects,
with the number in each cell denoting the phase of each
project. Most wholesale CBDC projects use private or
permissioned DLT because of privacy concerns that public

123

blockchain such as Bitcoin has nodes in the system verified
transactions. Corda [4] was chosen as the platform for most
wholesale CBDC projects. Project Khokha [35] uses
Ethereum enterprise as the platform. Elements [10] (bitcoin
derived) are used in Project Stella with the use of many
other libraries for a specific function such as interledger
[11, 78], cryptography, and privacy [79]. Hyperledger
Fabric [5] was one of Project Ubin Phase 2, and Quorum
[6] was used as the primary implementation for Project
Ubin in subsequence phases.
For Retail CBDC, Sweden has published a technical
solution based on Corda [47]. China DCEP [43] is implemented on a hybrid system with a possible DLT platform
developed in China. Bahamas Sand Dollar and Nigeria’s
eNaira use the Bitt digital currency management system
[12].

## Page 11

Cluster Computing (2023) 26:2183–2197
Table 4 Business use cases for
wholesale CBDC projects

2193

Use cases

Wholesale CBDC Projects
Jasper

Ubin

Stella

Khokha

Inthanon

Tokenized currency

1

1

1

1

1

RTGS

1,2

2

1

1

1

DvP

3

3

2

1

2

Smart contracts

4

5

2

1

2

1

2

Cross border (PvP)

4

4

3

Data privacy

1

1

4

Board ecosystem collaboration (different assets)

5 Challenges
5.1 Appropriate use cases
The business use cases for the CBDC project are shown in
Table 4, where the number in the cell indicates the phase of
the particular project.
All wholesale CBDC projects start from tokenized currency and build RTGS as a platform to continue their
studies. Then many projects progress further to study
Delivery versus Payment, DvP and Payment versus Payment, PvP, or cross-border payment. Project Stella took a
unique approach to learning data privacy approaches and
Project Inthanon but with different techniques. Using the
cryptographic library in Project Stella, Project Inthanon
explores data privacy using smart contracts and necessary
data.

5.2 Economics financial markets implications
In issuing CBDC, Central Banks [80], IMF Working Paper
[81], and academics [82] have published various research
questions considering the impact of CBDC on monetary
policy and financial stability. For example, depositors,
especially in times of crisis, trust that the central bank is
more stable than the commercial banks. Hence, the central
bank can be a deposit monopolist attracting all deposits
away from the retail banking sector. Another effect of
CBDC is that it can theoretically charge negative interest
rates and directly inject or ‘‘helicopter drop’’ to individuals,
introducing a new and innovative way to implement
monetary policy.

3

5

2

Riksdag supports the Riksbank’s request to inquire into the
payment market in a cashless digital economy, the roles of
the central government and the private sector in such a
market.

5.4 Data privacy and AML/CFT
Once in electronic form, transaction data can be collected
and traced. This is good for Anti-Money Laundering and
Combating the Financing of Terrorism (AML/CFT).
However, the data privacy that people enjoy from using
physical paper money is compromised. CBDC design and
implementation must consider this issue and develop
solutions to balance the two groups’ needs.

6 Conclusions and future works
Since current interest now shifts to explore more in the area
of retail CBDC, there will be interesting to follow developments and lessons learned from the testing of retail
CBDC such as China’s DCEP, Project Hamilton [54],
Sweden’s e-krona [47], South Africa digital tender [61],
South Korea [63]. However, wholesale CBDC is still
developing, such as Digital Euro in France [62] and Project
Ubin Phase 5 [84]. In addition, increased scalability and
interoperability issues in blockchain are active areas of
research that can be beneficially upgraded to the existing
platform that numerous CBDCs have already implemented.
The main contribution of this paper is the discussion on
the application of blockchain or DLT to Central Bank
Digital Currency.

5.3 Law and regulations

Author contribution All authors have accepted responsibility for the
entire content of this manuscript and approved its submission.

Since the issuance of CBDC will affect societies and the
way of life of its citizen, representatives of the people
should be consulted. For example, in Sweden, the Riksbank
partition to Riksdag (Parliament) [83] proposes that the

Funding No funding was received.
Data availability Data sharing does not apply to this article as no
datasets were generated or analyzed during the current study.

123

## Page 12

2194

Declarations
Conflict of interest The first author, Mr. Vijak Sethaput, was a senior
developer and participated in project Inthanon, Thailand’s CBDC
mentioned in Sect. 3.2.5)
Informed consent Not applicable.

References
1. a., C.B., Wehrli, A.: ‘‘Ready, steady, go?—Results of the third
BIS survey on central bank digital currency,‘‘ 1 2021. [Online].
Available:
https://www.bis.org/publ/bppdf/bispap114.pdf.
Accessed 1 May 2021
2. Nakamoto, S.: [Online]. Available: (2008). https://bitcoin.org/
bitcoin.pdf. Accessed 15 May 2020
3. Buterin, V.: ‘‘Ethereum White Paper: A next-generation smart
contract and decentralized application platform,‘‘ 2014. [Online].
Available: https://github.com/ethereum/wiki/wiki/White-Paper.
Accessed 15 May 2020
4. R3:, ‘‘Corda Enterprise–a next-gen blockchain platform,‘‘ R3,
[Online].
Available:
https://www.r3.com/corda-platform/.
Accessed 15 May 2020
5. Foundation, L.: ‘‘Hyperledger Fabric,‘‘ [Online]. Available:
https://www.hyperledger.org/use/fabric. Accessed 15 May 2020
6. ‘‘Quorum,‘‘ [Online]:. Available: https://www.goquorum.com/.
Accessed 15 May 2020
7. Foundation, L.: ‘‘Hyper Ledger Iroha,‘‘ [Online]. Available:
https://www.hyperledger.org/use/iroha. Accessed 15 May 2020
8. N. I. B., A.L., Fedor Muratov, N.M.T.: ‘‘YAC: BFT Consensus
Algorithm for Blockchain,‘‘ 3 9 2018. [Online]. Available:
https://arxiv.org/pdf/1809.00554.pdf. Accessed 15 May 2020
9. Foundation, L.: ‘‘Hyper Ledger Besu,‘‘ [Online]. Available:
https://www.hyperledger.org/use/besu. Accessed 15 May 2020
10. ‘‘Elements,‘‘ [Online]:. Available: https://elementsproject.org/.
Accessed 15 May 2020
11. ‘‘Interledger,‘‘ [Online]:. Available: https://interledger.org/.
Accessed 15 May 2020
12. Bitt: ‘‘Digital Currency Management System | Bitt,‘‘ [Online].
Available: https://www.bitt.com/. Accessed 31 March 2022
13. Association, L.: ‘‘White Paper: An Introduction to Libra,‘‘ 2019 6
18. [Online]. Available: https://sls.gmu.edu/pfrt/wp-content/
uploads/sites/54/2020/02/LibraWhitePaper_en_US-Rev0723.pdf.
Accessed 1 December 2022
14. Association, L.: ‘‘Libra White Paper v2.0,‘‘ 4 2020. [Online].
Available: https://wp.diem.com/en-US/wp-content/uploads/sites/
23/2020/04/Libra_WhitePaperV2_April2020.pdf. Accessed 1
December 2022
15. Diem, ‘‘Statement by Diem CEO Stuart Levey on the Sale of the
Diem Group: ’s Assets to Silvergate,‘‘ 1 1 2022. [Online].
Available:
https://www.diem.com/en-us/updates/stuart-leveystatement-diem-asset-sale/. Accessed 1 December 2022
16. Dashkevich, G.D.N.: ‘‘Blockchain application for central banks: a
systematic mapping study‘‘. IEEE Access 8, 139918–139952
(2020)
17. Tao Zhang, Z.H.: Blockchain and central bank digital currency.
ICT Exp. 8(2), 264–270 (2022)
18. Bank of Canada: ‘‘Project Jasper,‘‘ [Online]. Available: https://
www.bankofcanada.ca/research/digital-currencies-and-fintech/
projects/#project-jasper. Accessed 22 October 2020
19. Payments Canada, ’’Project Jasper Primer,‘‘ Payments Canada,
2017. [Online]. Available: https://www.payments.ca/sites/default/
files/project_jasper_primer.pdf. Accessed 22 October 2022

123

Cluster Computing (2023) 26:2183–2197
20. Payments Canada, ’’Project Jasper: A Canadian Experiment with
Distributed Ledger Technology for Domestic Interbank Payments
Settlement,‘‘ Payments Canada, 2017. [Online]. Available:
https://payments.ca/sites/default/files/2022-09/jasper_report_eng.
pdf. Accessed 22 October 2022
21. Payments Canada, ’’Jesper Phase III Securities Settlement using
Distributed Ledger Technology,‘‘ Payments Canada, Canada,
October, 2018. [Online]. Available: https://payments.ca/sites/
default/files/2022-09/jasper_phase_iii_whitepaper_EN.pdf.
Accessed 22 October 2022
22. Monetary Authority of Singapore (MAS):, ‘‘Project Ubin: Central
Bank Digital Money using Distributed Ledger Technology,‘‘
[Online]. Available: https://www.mas.gov.sg/schemes-and-initia
tives/Project-Ubin. Accessed 19 April 2020
23. Monetary Authority of Singapore (MAS) and, Deloitte: ‘‘Project
Ubin: SGD on Distributed Ledger,‘‘ 3 2017. [Online]. Available:
https://www.mas.gov.sg/-/media/MAS/ProjectUbin/ProjectUbin–SGD-on-Distributed-Ledger.pdf. Accessed 19 April 2020
24. Monetary Authority of Singapore (MAS): and Associatiation of
Bans in Singapore (ABS), ‘‘Project ubin phase 2 report: reimagining RTGS,‘‘ 9 2017. [Online]. Available: https://www.
mas.gov.sg/-/media/MAS/ProjectUbin/Project-Ubin-Phase-2Reimagining-RTGS.pdf. Accessed 19 April 2020
25. Ubin, P.: ‘‘Project Ubin,‘‘ [Online]. Available: https://github.com/
project-ubin. Accessed 19 April 2020
26. Monetary Authority of Singapore (MAS), ’’ Delivery versus
Payment on DLT,‘‘ Monetary Authority of Singapore (MAS) and
Singapore Exchange (SGX), Singapore, 11 November
2018.[Online]. Available: https://www.mas.gov.sg/-/media/MAS/
ProjectUbin/Project-Ubin-DvP-on-Distributed-Ledger-Technolo
gies.pdf. Accessed 10 December 2022
27. The Bank of Canada (BOC) and the Monetary Authority of
Singapore (MAS):, ‘‘Jasper-Ubin Design Paper: Enabling CrossBorder High Value Transfer using DLT,‘‘ 2 5 2019. [Online].
Available: https://www.mas.gov.sg/-/media/MAS/ProjectUbin/
Jasper-Ubin-Design-Paper.pdf?la=en. Accessed 19 April 2020
28. The Bank of Canada:, [Online]. Available: (2018). https://www.
mas.gov.sg/-/media/MAS/ProjectUbin/Cross-Border-InterbankPayments-and-Settlements.pdf. Accessed 1 May 2021
29. Monetary Authority of Singapore (MAS):, ‘‘MAS helps develop
blockchain-based prototype for multi-currency payments,‘‘ 2019
11 11. [Online]. Available: https://www.mas.gov.sg/news/mediareleases/2019/mas-helps-develop-blockchain-based-prototypefor-multi-currency-payments. Accessed 19 April 2020
30. #STACS, D.L.T.: Integrations with payment systems,‘‘ [Online].
Available: https://stacs.io/dlt-integrations-with-payment-systems/
. Accessed 15 May 2020
31. ‘‘STELLA - a joint research project of the European Central Bank
and the Bank of Japan,‘‘: [Online]. Available: (2017). https://
www.boj.or.jp/en/announcements/release_2017/data/
rel170906a1.pdf. Accessed 19 April 2020
32. STELLA - a joint research project of the European Central Bank
and the Bank of Japan:, [Online]. Available: (2018). https://www.
boj.or.jp/en/announcements/release_2018/data/rel180327a1.pdf.
Accessed 19 April 2020
33. the European Central Bank (ECB) and the Bank of Japan (BOJ):,
‘‘Synchronised cross-border payments.,‘‘ 4 6 2019. [Online].
Available:
https://www.boj.or.jp/en/announcements/release_
2019/data/rel190604a1.pdf. Accessed 19 April 2020
34. Project Stella, a joint research project of the European Central:
Bank (ECB) and the Bank of Japan (BOJ), ‘‘Balancing confidentiality and auditability in a distributed ledger environment.,‘‘
12 2 2020. [Online]. Available: https://www.boj.or.jp/en/
announcements/release_2020/data/rel200212a1.pdf. Accessed 19
April 2020

## Page 13

Cluster Computing (2023) 26:2183–2197
35. Consensys, ‘‘Project Khokha: : blockchain case study for central
banking in South Africa,‘‘ [Online]. Available: https://consensys.
net/blockchain-use-cases/finance/project-khokha/. Accessed 19
April 2020
36. the Bank of Thailand (BOT):, ‘‘Inthanon phase I: an application
of distributed ledger technology for a decentralised real time
gross settlement system using wholesale central bank digital
currency,‘‘ 29 1 2019. [Online]. Available: https://www.bot.or.th/
Thai/PaymentSystems/Documents/Inthanon_Phase1_Report.pdf.
Accessed 15 May 2020
37. the Bank of Thailand (BOT):, ‘‘Inthanon Phase 2,‘‘ 18 7 2019.
[Online]. Available: https://www.bot.or.th/English/FinancialMar
kets/ProjectInthanon/Documents/Inthanon_Phase2_Report.pdf.
Accessed 15 May 2020
38. the Bank of Thailand and (BOT) the Hong Kong Monetary
Authority (HKMA):, ‘‘The outcomes and findings of Project
Inthanon-LionRock and the Next Steps,‘‘ 22 1 2020. [Online].
Available: https://www.bot.or.th/English/AboutBOT/Activities/
Pages/Inthanon_LionRock.aspx. Accessed 15 May 2020
39. the Bank of Thailand (BOT) and Hong Kong Monetary Authority
(HKMA):, ‘‘Inthanon-LionRock: Leveraging Distributed Ledger
Technology to Increase Efficiency in Cross-Border Payments,‘‘
22 1 2020. [Online]. Available: https://www.bot.or.th/English/
FinancialMarkets/ProjectInthanon/Documents/Inthanon-Lion
Rock.pdf. Accessed 15 May 2020
40. BIS, ‘‘Multiple: CBDC (mCBDC) Bridge,‘‘ [Online]. Available:
https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm.
Accessed 20 May 2021
41. BIS, ‘‘Project Dunbar: ’’ 9 [Online]. Available: (2021). https://
www.bis.org/about/bisih/topics/cbdc/wcbdc.htm. Accessed 9
2021
42. BIS Innovation hub:, ‘‘Project Dunbar International settlements
using multi-CBDCs,‘‘ March 2022. [Online]. Available: https://
www.bis.org/publ/othp47.pdf. Accessed 31 March 2022
43. Michael, ‘‘China’s National Digital Currency DCEP:/CBDC
Overview,‘‘ 13 5 2020. [Online]. Available: https://boxmining.
com/dcep/. Accessed 15 May 2020
44. Binance Research: (Jinze & Etienne), ‘‘First Look: China’s
Central Bank Digital Currency,‘‘ 28 7 2019. [Online]. Available:
https://research.binance.com/analysis/china-cbdc. Accessed 15
May 2020
45. Working Group on E-CNY Research and Development of the
People’s Bank of China, ‘‘Progress of Research & Development
of E-CNY in China,‘‘ 7 [Online]. Available: (2021). http://www.
pbc.gov.cn/en/3688110/3688172/4157443/4293696/
2021071614584691871.pdf. Accessed 15 September 2021
46. Central Bank of The Bahamas:, ‘‘Digital Bahamian Dollar,‘‘
2021. [Online]. Available: https://www.sanddollar.bs/. Accessed
20 May 2021
47. SVERIGES, R.I.K.S.B.A.N.K.: ‘‘The Riksbank’s e-krona pilot,‘‘
2 [Online]. Available: (2020). https://www.riksbank.se/globa
lassets/media/rapporter/e-krona/2019/the-riksbanks-e-kronapilot.pdf. Accessed 15 May 2020
48. Ree, J.: ‘‘Five Observations on Nigeria’s Central Bank Digital
Currency,‘‘ 16 11 2021. [Online]. Available: https://www.imf.
org/en/News/Articles/2021/11/15/na111621-five-observationson-nigerias-central-bank-digital-currency.
Accessed
1
February 2022
49. Crawley, J.: ‘‘Nigeria’s eNaira CBDC Goes Live,‘‘ 25 10 2021.
[Online]. Available: https://www.coindesk.com/policy/2021/10/
25/nigerias-enaira-cbdc-goes-live/. Accessed 2 February 2022
50. statista: ‘‘Nigeria mobile internet user penetration 2026|Statista,‘‘
7 [Online]. Available: (2021). https://www.statista.com/statistics/
972900/internet-user-reach-nigeria/. Accessed 31 March 2022
51. The World Bank:, ‘‘Personal remittances, received (current
US$),‘‘ 2020. [Online]. Available: https://data.worldbank.org/

2195
indicator/BX.TRF.PWKR.CD.DT?locations=NG. Accessed 31
March 2022
‘‘ Bakong—the next-gen52. National Bank of Cambodia,
eration mobile payments,‘‘ [Online]. Available: https://bakong.
nbc.org.kh/. Accessed 15 May 2020
53. Digital Dollar Foundation and Accenture:, [Online]. Available:
(2020).
https://static1.squarespace.com/static/
5e16627eb901b656f2c174ca/t/5ecfc542da96fb2d2d5b5f15/
1590674759958/Digital-Dollar-Project-Whitepaper_vF.pdf.
Accessed 6 2020
54. Federal Reserve Bank of Boston and Massachusetts Institute of
Technology Digital Currency Initiative:, ‘‘Project Hamilton
Phase 1 Executive Summary,‘‘ 3 2 2022. [Online]. Available:
https://www.bostonfed.org/publications/one-time-pubs/projecthamilton-phase-1-executive-summary.aspx.
Accessed
22
February 2022
55. The Federal Reserve Bank of Boston:, ‘‘The Federal Reserve
Bank of Boston announces collaboration with MIT to research
digital currency,‘‘ 2020 8 13. [Online]. Available: https://www.
bostonfed.org/news-and-events/press-releases/2020/the-federalreserve-bank-of-boston-announces-collaboration-with-mit-toresearch-digital-currency.aspx. Accessed 22 February 2022
56. Federal Reserve Bank of Boston and Massachusetts Institute of
Technology Digital Currency Initiative:, ‘‘GitHub - mit-dci/
opencbdc-tx: A transaction processor for a hypothetical, generalpurpose, central bank digital currency,‘‘ 2022. [Online]. Available: https://github.com/mit-dci/opencbdc-tx. Accessed 22
February 2022
57. Bank of Thailand, ‘‘Retail Central bank digital currency: :
implications on monetary policy and financial stability in Thailand,‘‘ 8 2021. [Online]. Available: https://www.bot.or.th/Thai/
PressandSpeeches/Press/News2564/n6064t_annex.pdf. Accessed
22 February 2022
58. Bank of Thailand, ‘‘The way forward for retail central bank
digital currency in: Thailand,‘‘ 4 2021. [Online]. Available:
https://www.bot.or.th/Thai/digitalcurrency/documents/bot_
retailcbdcpaper.pdf. Accessed 22 February 2022
59. CCN.com, ‘‘Not a cryptocurrency: Ukraine completes national
digital currency Ppilot,‘‘ 26 2 2019. [Online]. Available: https://
www.ccn.com/ukrainian-central-bank-completes-national-digi
tal-currency/. Accessed 15 May 2020
60. COINTELEGRAPH, ‘‘Ukraine completes pilot scheme for
E-Hryvnia national digital: currency,‘‘ 25 2 2019. [Online].
Available:
https://cointelegraph.com/news/ukraine-completespilot-scheme-for-e-hryvnia-national-digital-currency. Accessed
15 May 2020
61. South African Reserve Bank:, ‘‘Request for expression of interest
from prospective solution providers in anticipation of a feasibility
project for the issuance of electronic legal tender,‘‘ 26 4 2019.
[Online]. Available: https://www.resbank.co.za/AboutUs/Depart
ments/FinancialServices/ProcNew/Pages/Publications.aspx?sarb
web=9f333ff2-bf64-4708-a361-076bd6802ff4&sarblist=fdf9dae8-3990-44d4-b89a-c87649f22461&sarbitem=40. Accessed 15
May 2020
62. BANQUE DE FRANCE, ‘‘CENTRAL BANK DIGITAL CURRENCY EXPERIMENTS WITH THE BANQUE DE FRANCE:
CALL FOR: APPLICATIONS,‘‘ 30 3 2020. [Online]. Available:
https://www.banque-france.fr/sites/default/files/media/2020/03/
30/fact_sheet_-_central_bank_digital_currency_30_march_2020.
pdf. Accessed 15 May 2020
63. Bank of Korea:, ‘‘Bank of Korea, Central Bank Digital Currency
(CBDC) pilot test,‘‘ 6 4 2020. [Online]. Available: http://www.
bok.or.kr/portal/bbs/P0000559/view.do?nttId=
10057475&menuNo=200690. Accessed 15 May 2020
64. Bank for International Settlements (BIS):, ‘‘Central bank group to
assess potential cases for central bank digital currencies,‘‘ 21 1

123

## Page 14

2196
2020. [Online]. Available: https://www.bis.org/press/p200121.
htm. Accessed 15 May 2020
65. Bank of England:, ‘‘Central bank digital currency: opportunities,
challenges and design,‘‘ 12 3 2020. [Online]. Available: https://
www.bankofengland.co.uk/paper/2020/central-bank-digital-cur
rency-opportunities-challenges-and-design-discussion-paper.
Accessed 15 May 2020
66. BIS Committee on Payments and Market Infrastructures:,
‘‘Central bank digital currencies,‘‘ 2018. [Online]. Available:
https://www.bis.org/cpmi/publ/d174.pdf. Accessed 15 May 2020
67. Boehme, R.A.R.: ‘‘The technology of retail central bank digital
currency,‘‘ BIS Quarterly Review, 1 3 2020. [Online]. Available:
https://www.bis.org/publ/qtrpdf/r_qt2003j.htm. Accessed 15
May 2020
68. ITU, ‘‘Focus Group on Digital Currency including Digital Fiat
Currency:, ’’ [Online]. Available: https://www.itu.int/en/ITU-T/
focusgroups/dfc/Pages/default.aspx. Accessed 15 May 2020
69. News, I.T.U.: ‘‘ITU and Stanford University to launch new
partnership supporting pilots of Digital Fiat Currency,‘‘ 5 6
[Online]. Available: (2019). https://news.itu.int/itu-stanford-uni
versity-launch-new-partnership-supporting-pilots-digital-fiat-cur
rency/. Accessed 15 May 2020
70. WORLD ECONOMIC FORUM (WEF):, ‘‘Central Bank Digital
Currency Policy-Maker Toolkit,‘‘ 1 2020. [Online]. Available:
https://www.weforum.org/whitepapers/central-bank-digital-cur
rency-policy-maker-toolkit. Accessed 15 May 2020
71. Association, D.: ‘‘Diem Association: Home Page‘‘. [Online].
Available: https://www.diem.com/en-us/. Accessed 1 December
2022
72. Scorer, S.: ‘‘Central Bank Digital Currency: DLT, or not DLT?
That is the question,‘‘ [Online]. Available: https://theotcspace.
com/content/central-bank-digital-currency-dlt-or-not-dlt-ques
tion. Accessed 15 May 2020
73. eCurrency: ‘‘eCurrency - Central Bank issued Digital Currency
(CBDC),‘‘ [Online]. Available: https://www.ecurrency.net/.
Accessed 1 June 2020
74. Liskov, M.C.B.: ‘‘Practical Byzantine Fault Tolerance,‘‘ in OSDI
‘99: Proceedings of the third symposium on Operating systems
design and implementation, New Orleans Louisiana USA, (1999)
75. Wikipedia: ‘‘Zero-knowledge proof,‘‘ [Online]. Available:
https://en.wikipedia.org/wiki/Zero-knowledge_proof#cite_noteknowledgecomplexity-9. Accessed 1 June 2021
76. J. L. C. F. M. V. T. F. D. U. K. K. A. B. N. Narula, ‘‘A High
performance payment processing system designed for central
bank digital currencies,‘‘ 2 2 2022. [Online]. Available: https://
dci.mit.edu/s/HamiltonWhitepaper-2022-02-02-FINAL2.pdf.
Accessed 22 February 2022
77. a., T.A., Griffoli, T.M.: ‘‘FinTech Notes: The Rise of Digital
Money,‘‘ 15 7 2019. [Online]. Available: https://www.imf.org/en/
Publications/fintech-notes/Issues/2019/07/12/The-Rise-of-Digi
tal-Money-47097. Accessed 15 May 2020
78. ‘‘GitHub: Five Bell Ledger,‘‘ [Online]. Available: https://github.
com/interledger-deprecated/five-bells-ledger.
Accessed
15
May 2020
79. ‘‘fastecdsa: 2.1.2,‘‘ [Online]. Available: https://pypi.org/project/
fastecdsa/. Accessed 15 May 2020
80. a., D.S.L.S.: H. U. Jesús Fernández-Villaverde, ‘‘Central Bank
Digital Currency: Central Banking for All?,‘‘ 1 6 2020. [Online].
Available:
https://www.philadelphiafed.org/-/media/researchand-data/publications/working-papers/2020/wp20-19.pdf?la=en.
Accessed 7 June 2020
81. a., A.A., Itai Agur, G.D., ‘‘IMF working paper: : designing central
bank digital currencies,‘‘ International Monetary Fund (IMF),
(2019)
82. Brunnermeier, M.K., Niepelt, D., ‘‘On the equivalence of private
and public money,’’ J. Monet. Econ. 106, 27–41 (2019). [Online].

123

Cluster Computing (2023) 26:2183–2197
Available:
https://www.sciencedirect.com/science/article/pii/
S0304393219301229. Accessed 10 December 2022
83. Riksbank, ‘‘Petition to the Swedish Riksdag:, The states role on
the payment market,‘‘ 2018/19. [Online]. Available: https://www.
riksbank.se/globalassets/media/betalningar/framstallan-till-riksda
gen/petition-to-the-swedish-riksdag-the-states-role-on-the-pay
ment-market.pdf. Accessed 30 May 2020
84. TEMASEK and Monetary Authority of Singapore:, ‘‘Project ubin
phase 5 enabling broad ecosystem opportunities,‘‘ [Online].
Available: https://www.mas.gov.sg/-/media/MAS/ProjectUbin/
Project-Ubin-Phase-5-Enabling-Broad-Ecosystem-Opportunities.
pdf. Accessed 3 November 2021
Publisher’s Note Springer Nature remains neutral with regard to
jurisdictional claims in published maps and institutional affiliations.
Springer Nature or its licensor (e.g. a society or other partner) holds
exclusive rights to this article under a publishing agreement with the
author(s) or other rightsholder(s); author self-archiving of the
accepted manuscript version of this article is solely governed by the
terms of such publishing agreement and applicable law.
Vijak Sethaput currently a Ph.D.
student in the College of Engineering at the University of
the Thai Chamber of Commerce
and Assistant Managing Director Architecture and Engineering, National ITMX company.
He was a Deputy Director at the
Information
Technology
(IT) Department at the Bank of
Thailand. He was a Senior
Developer for Project Inthanon,
wholesale CBDC Proof of
Concept Project at Bank of
Thailand. He received a Bank of
Thailand Scholarship to study in the US for undergraduate level
computer engineering at Brown University and in graduate-level
electrical engineering and computer science at Harvard University.
After graduation in 2001, he returned home to Thailand to work at the
Bank of Thailand in various departments from Note Printing Works,
Banknote Management, Corporate Communications, Financial Markets, and IT. He also received additional degrees such as Master of
Business Economics (MBE) and Master of Business Administration
(MBA).
Supachate Innet is an Assistant
Professor in the Computer
Engineeringand Artificial Intelligence Department at the
School of Engineering, Universityof the Thai Chamber of
Commerce (UTCC), Thailand.
In his previous role at UTCC,he
served as the Head of the Electronics Engineering Department, Director ofMaster Degree
Program in Informatics, Associate Dean in Academic Affairs,
andAssociate Dean in Student
Affairs. Currently, He is the
Dean of the School of Engineeringat UTCC. After Innet obtained his
Bachelor’s Degree in Electronics Engineering,he has been granted a
scholarship to continue his Master’s and Doctoral Programfrom
UTCC. He graduated with his Master’s and Ph.D. in

## Page 15

Cluster Computing (2023) 26:2183–2197
TelecommunicationsEngineering from Swinburne University of
Technology, Melbourne Australia. Hehas supervised more than 20
masters and doctoral students. His researchinterests include

2197
Evolutionary Computation, Artificial Intelligence,Cryptography, and
Data Analytics.

123
