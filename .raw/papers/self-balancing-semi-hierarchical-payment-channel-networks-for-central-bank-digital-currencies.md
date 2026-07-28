---
source_type: pdf
title: "Self-Balancing Semi-Hierarchical Payment Channel Networks for Central Bank Digital Currencies"
original_file: "thesis/reference/Self-Balancing_Semi-Hierarchical_Payment_Channel_Networks_for_Central_Bank_Digital_Currencies.pdf"
sha256: "bbd2533788db20583c659fe9468afcab6a529fde7e9371d0e5060ff5f437a0fb"
page_count: 7
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Self-Balancing Semi-Hierarchical Payment Channel Networks for Central Bank Digital Currencies

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

BRAIN 2024: Fifth Workshop on Blockchain theoRy and ApplicatIoNs

2024 IEEE International Conference on Pervasive Computing and Communications Workshops and other Affiliated Events (PerCom Workshops) | 979-8-3503-0436-7/24/$31.00 ©2024 IEEE | DOI: 10.1109/PerComWorkshops59983.2024.10503409

Self-Balancing Semi-Hierarchical Payment Channel
Networks for Central Bank Digital Currencies
Marco Benedetti1 , Francesco De Sclavis1 , Marco Favorito1 , Giuseppe Galano1,2 ,
Sara Giammusso1 , Antonio Muci1 , Matteo Nardelli1
1

Bank of Italy, 2 University of Pisa
{first name}.{last name}@bancaditalia.it, giuseppe.galano2@bancaditalia.it
Abstract—We introduce a family of PCNs (Payment Channel
Networks) characterized by a semi-hierarchical topology and a
custom set of channel rebalancing strategies. This family exhibits
two interesting benefits, if used as a platform for large-scale,
instant, retail payment systems, such as CBDCs (Central Bank
Digital Currencies): Technically, the solution offers state-of-theart guarantees of fault-tolerance and integrity, while providing a
latency and throughput comparable to centralized systems; from
a business perspective, the solution fits the 3-tier architecture
of the current banking ecosystem (central bank / commercial
banks / retail users), assigning a pivotal role to the members of
each tier. Furthermore, the cryptographic privacy of payments—
typical of PCNs such as the public Lightning Network—is largely
(possibly fully) retained. We simulate a scaled-down version of a
hypothetical European CBDC, exploring the trade-offs among
liquidity locked by market operators, payment success rate,
throughput, latency, and load on the underpinning blockchain.

I. I NTRODUCTION
Retail instant payment systems manage a very high load of
transactions, in the order of 104 –105 TPS (see Sect. IV-A).
Centralized systems are often deployed to ingest and settle all
such transactions timely. Performance is not all, though: In the
case of CBDCs, further business and technical requirements
are put into place, such as strong privacy guarantees, small or
no fees for citizens, a cap on the amount of liquidity users can
amass, and the possibility to be usable by unbanked people.
Finally, CBDC systems have to be embedded into—and play
nice with—the pre-defined, multi-tier structure of the existing
monetary infrastructure while providing each actor with clear
and strong incentives to adopt the CBDC itself.
We ask: Can a blockchain-based payment system address
all these concerns and requirements while bringing tangible
benefits compared to a centralized solution?
First key point: Most blockchains are well-known for their
limited throughput. So, we forgo on-chain settlement of retail payments entirely and embrace the off-ledger paradigm,
whereby scalability is achieved by an additional “payment
channel network”, or PCN (2nd layer) built on top of the
actual blockchain [1]. In the wild, 2nd layer networks—e.g.,
the Lightning Network—evolve freely as peer-to-peer systems.
Unfortunately, their anatomy (i) provides a performance that is
insufficient for large-scale payment systems, (ii) is oblivious to
the business requirements of CBDCs, and (iii) is not coherent
with the 3-tier structure of the monetary system.
All views are those of the authors and do not necessarily reflect the
position of Bank of Italy.

We address these issues by devising a family of PCNs with
a partially constrained topology, called “Semi-Hierarchical
Payment Channel Networks”, or SH-PCNs (Sect. II), endowed
with a set of custom balancing strategies (Sect. III).
Assuming the performances of SH-PCNs are ok (Sect. V-B),
we gain the benefits of a 2-layer solution: The 1st (wholesale)
layer exhibits high integrity, availability, fault-tolerance, and
verifiability of monetary exchanges; the 2nd (retail) layer
(i) accommodates cash-like levels of privacy; (ii) naturally
handles wallet caps; (iii) turns transaction fees and liquidity
costs into optimization tools for the CB and the market.
In short, the two major contributions of this paper are
as follows: (a) We show how PCNs—born as decentralized
P2P networks—can be adapted to operate into the existing
hierarchical monetary system, in the form of SH-PCNs; (b) We
present strategies capable of counteracting the natural tendency
of SH-PCN channels to get unbalanced under streams of daily
payments (modeled after actual European retail transactions).
Along the way, we point out properties of the emerging
payment system that make it a plausible platform for CBDCs.
We do not model a full-scale SH-PCN system just yet, but
a scaled-down version. This reduced model is still capable of
exhibiting the key dynamics we want to investigate, such as the
trade-offs among the liquidity locked in channels, the success
rate of payments, their latency, and the transactional demand
on the underlying 1st -layer blockchain (see Sect. VII).
Our preliminary results suggest that the performance of SHPCN is satisfactory for retail payments, that SH-PCNs map
naturally onto the banking/payment ecosystem, and that the
most typical CBDC-specific requirements are met.

MH Monetary Hub
CB Central Bank
NCB National Central Bank
CBDC Central Bank Digital Currency
P2P Peer-to-Peer
CLoTH A PCN simulator (named by
PCN Payment Channel Network
inverting the letters in HTLC)
POS Point of Sale
CS Custodian Service
ROSS Rensselaer’s Optimistic
DES Discrete Event System
Simulation System
ECB European Central Bank
RSP Routing Service Provider
EU End User
SH-PCN Semi-Hierarchical PCN
HTLC Hashed Time-Locked Contract
SPACE Study on the Payment Attitudes
LN Lightning Network
of Consumers in the Euro area
LSP Lightning Service Provider
TPS Transactions per Second

This paper draws terms and acronyms from different communities; to ease
the reading of the material, we collect all acronyms and their meaning here.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:22 UTC from IEEE Xplore. Restrictions apply.

979-8-3503-0436-7/24/$31.00 ©2024 IEEE

530

## Page 2

BRAIN 2024: Fifth Workshop on Blockchain theoRy and ApplicatIoNs

Tier

Technical
role

Business
entities

Size (magnitude)

1

RSP, MH

Central
Banks

2

LSP �㷓
CS ¯

3

Sub-network
topology

Channel
capacities

Rebalancing
strategy

101 / 100

Structured,
hierarchical

ÒinfiniteÓ
capacity

N/A

Commercial
Banks /
Financial
Institutions

104 / 101 �㷓
103 / n.a. ¯

Free-form,
organised
by market
operators

Allocated &
optimised by
market
operators

Just-in-time
rebalancing via
submarine
swaps

End-Users: Retail users:
payers, merchants �㷓
payees
citizens �㷾

106 / 103 �㷓
108 / 105 �㷾

Fixed topology
(Policy decision)

Fixed capacity
(Policy decision)

Just-in-time
(reverse)
waterfall

actual / simulated

Sample
SH-PCN

m1
c1

m2

c2

c3

c4

Fig. 1: Structure and main features of a Semi-Hierarchical Payment Channel Network (SH-PCN), plus three sample payment routes: One Point-of-Sale payment
from retail user c4 (a citizen) to merchant m2 ; one Peer-to-Peer transaction from c2 to c3 ; one eCommerce route from c1 to a foreign merchant m1 . As
usual with source-based onion-routed protocols, no actor (other than the payer and payee) has full information about any of these payments.

II. S TRUCTURE OF A S EMI -H IERARCHICAL PCN

End-Users (EUs). Tier-3 nodes are managed by “end
users” (i.e., citizens, merchants): They access the network
connecting to one or more LSPs in a non-custodial way,
thereby preserving the privacy of their payments. EUs do
not open channels with each other3 . And, EU channels—
of known capacity—are only opened with authorized
LSP(s): There is a cap on the maximum amount of retail
CBDC in the user wallet without sacrificing privacy.
In this hierarchy, MHs only connect to LSPs, and EUs only
connect to LSPs and CSs. There are many more EUs than
LSPs/CSs, which in turn are many more than the MHs.
•

The current monetary system—which is the target deployment environment for our solution—is based on a 3-tier
banking system, where: the CB is at the top; a set of authorized
intermediaries (e.g., commercial banks) are in the middle;
retail users (e.g., citizens and merchants) are at the bottom.
For an introduction to this 3-tier architecture, see [2].
These (business) roles are mapped onto different (technical)
roles in the PCN subclass we study, and the hierarchical
anatomy of the banking system is reflected in the (semi)
hierarchical topology of the network. We have (see Fig. 1):
• Monetary Hubs (MHs). MHs operate nodes with considerable liquidity, which are largely/fully interconnected
and act as Routing Service Providers (RSPs) for LSPs
(see next). MHs are business-to-business entities and do
not interact with EUs (see next). They are managed by a
CB1 (or a set of CBs in the same monetary area).
• Lightning Service Providers (LSPs). Tier-2 nodes are
distributed “service providers” for the system. LSPs
freely open channels towards each other, forming a “small
world”-like network, ensuring that fault tolerance and the
other benefits of distributed networks are achieved. Disconnected LSP sub-networks, if they exist, are linked via
RSP(s). This role is assigned to banks and other financial
institutions, which own large amounts of liquidity. LSPs
offer their service to EUs by opening channels with them,
thus providing them with connectivity and reachability.
• Custodian Services (CSs). In addition to off-chain liquidity, EUs generally own one or more accounts at Tier2 CSs, such as banks or exchanges, which allow them
to deposit/withdraw retail CBDC to/from their personal
accounts2 (private money). The CSs are connected to the
LSP network. The EU does not necessarily have direct
channels opened with CSs: Their monetary interactions
happen out-of-band (see Sect. III) and via LSPs.

III. AUTOMATED C HANNEL R EBALANCING T ECHNIQUES
Absent any network reshaping (Sect. IV-C), the performance
of SH-PCNs subject to most types of sustained loads degrades
over time: Channels become more and more unbalanced, hence
unable to participate in the routing of an increasing percentage
of payments. To avoid such progressive occlusion, we define
three rebalancing techniques to improve channel lifetimes
while minimizing locked liquidity.
Submarine swaps between LSP/MH nodes. A submarine
swap is a transaction that exchanges a given amount of
some on-chain asset with the same amount of the off-chain
form of the same asset (e.g., x bitcoin moved from A to
B on the blockchain as “simultaneously” x bitcoin go from
B to A in the Lightning Network). Submarine swaps can
be trustless: During the process, neither party has access to
the other party’s funds, and no third party takes temporary
custody of the asset. The swaps are atomic, with a binary
outcome: Either the parties successfully exchange their assets,
or the swap fails. To implement this trustless-ness, both the
1. Prepare HTLC
2. Send Pmt

4. Claim HTLC

3. Rcv Success

BLOCKCHAIN

LSP1

LSP2

Fig. 2: Atomic submarine swap functionality
1 At the on-chain layer, the CB is also responsible for running a secure
ledger (such as [3], [4]) where transactions to open/close channels are stored,
i.e., where the (CB) liquidity that backs each channel is locked.
2 These other ledgers are managed by the CSs via separate (likely accountbased, centralized) systems, decoupled from the SH-PCN.

3 This is not a technical limitation, but a policy option: If end users were
granted access to Layer 1 in order to open channels among them, the level
of privacy of payments would possibly approach full anonymity. This may be
seen as a bug or a feature: CBDC frameworks usually disallow total anonimity.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:22 UTC from IEEE Xplore. Restrictions apply.

531

## Page 3

BRAIN 2024: Fifth Workshop on Blockchain theoRy and ApplicatIoNs

on-chain and the off-chain transactions rely on Hash-Time
Locked Contracts (HTLCs). Fig. 2 represents two LSPs that
share an unbalanced channel, with almost all liquidity held
at the LSP1 end. LSP1 wants to rebalance the channel by
transferring assets on the payment channels with LSP2, who
in turn should move the same amount of assets on-chain to
LSP1. They proceed as follows. LSP2, the sender of the onchain transaction, generates a preimage, whose hash serves as
the foundation for constructing both the on-chain and off-chain
HTLCs and moves funds to the on-chain HTLC (step 1). LSP2
also generates an off-chain invoice using the same hash and
asks LSP1, the sender of the off-chain transaction, to pay the
invoice. After the chain confirms the locking of funds in the
on-chain HTLC, LSP1 can safely pay the invoice (step 2). To
claim the off-chain funds, LSP2 has to reveal the preimage to
LSP1 (step 3), who in turn can use it to complete the process
by claiming the funds from the on-chain HTLC (step 4). If
any part misbehaves, the other can get its funds thanks to the
unlocking conditions of the HTLCs.
Submarine swaps take time (at least the confirmation time
of the HTLC in step 1) and possibly require a fee (depending
on the MH policy). Moreover, the transactional capacity of the
underlying blockchain limits the number of submarine swaps
per unit of time that the SH-PCN can perform.
Waterfall rebalance. The waterfall [5] mechanism allows
end-users—in particular those having high inbound traffic
(e.g., merchants)—to always be able to get paid, even if the
amount P to be received raises the user balance B above the
channel capacity C (wallet cap). This is achieved by automatically depositing the amount D = max (B + P − C, LD ),
where LD is the minimum amount the user is willing to
deposit, to a linked CS account. Fig. 3 illustrates the waterfall
3. Request Deposit
2. Notify Pmt

1. Fwd Pmt

4. Snd Deposit

CUSTODIAN

4. Fwd/Rcv Deposit

LSP

5. Rcv Pmt

END USER

Fig. 3: Waterfall functionality implementation in a PCN

functionality. When the LSP receives a payment to forward
(step 1), but the end user’s channel does not have enough
outbound liquidity, the LSP notifies the user about the incoming payment (step 2), and delays the payment forwarding
until the expiration of a timeout. The user requests a real-time
deposit to their CS (step 3), and sends the deposit via the same
LSP, thus rebalancing the channel (step 4). If the channel is
successfully rebalanced within the timeout, the LSP forwards
the payment to the user (step 5); otherwise, the payment fails.
Messages exchanged in steps 2 and 3, in bold, are not part
of the LN specification but are specific to our protocol. From
a business perspective, this mechanism implements a deposit
of retail CBDC liquidity from the wallet of an EU into an
account held by the same EU at some CS, triggered when the
wallet is about to overflow the cap.

1. Request Withdrawal
2. Rcv Withdrawal
3. Snd Pmt

END USER

LSP

CUSTODIAN
2. Snd/Fwd Withdrawal

Fig. 4: Reverse waterfall functionality implementation in a PCN

Reverse waterfall rebalance. This functionality allows
retail users—in particular those having high outbound traffic
(e.g., citizens)—to automatically fund a payment channel
before making transactions too large for its current state—
See Fig. 4. If there are insufficient funds in the channel to
cover the amount P , users could request a withdrawal (step
1), thus taking out some money from their CS account (step
2). The withdrawal amount is W = max (LW − B, P − B),
where LW represents a minimum amount the user is willing
to keep in its wallet for future use. Once the withdrawal has
transferred liquidity from the linked CS to the channel, the
user can send the payment (step 3). The message exchanged
in step 1 is not part of the LN specification but is specific
to our protocol. From a business perspective, this mechanism
implements a withdrawal of commercial bank money from
the account of an EU at their CS, which is returned as CBDC
liquidity put into the wallet of the same EU.
IV. T HE REAL WORLD AND OUR SMALL - SCALE MODEL
A. Patterns of real-world retail payments
Retail payment systems sustain a high load of transactions.
A global-scale example is VISA, which recently disclosed that
its network can execute more than 65, 000 TPS at its peak4 .
For a public retail payment system, such as a prospective
CBDC for the euro area, we can refer to the “Study on the
payment attitudes of consumers in the euro area” (SPACE) by
the ECB [6]. Participants from 19 euro area countries were
requested to document their point-of-sale (POS), peer-to-peer
(P2P), and eCommerce transactions in a one-day diary. The
key results of SPACE 2022 are summarized in Table I.
In addition, we consider Annex 1 of the ECB’s “Market
Research on Potential Technical Approaches for a Digital
Euro” [7], which states that, on average, individuals within
the euro area engage in two financial transactions per day, encompassing various payment methods and interaction points.
The “Large adoption” scenario in this report assumes that
70% of the eurozone population will use the CBDC for 35%
of all transactions. This implies approximately 2,000 TPS on
average. Peak values may be larger by an order of magnitude.
TABLE I: Statistics on non-recurring payments. ECB SPACE 2022.
N.
Distribution (%) of Range Amount ( C)
(%) < 5 [5, 10) [10, 20) [20, 30) [30, 50) [50, 100) > 100
PoS
80
21
17
21
13
13
10
5
Online 17
10
11
20
15
17
16
11
P2P
3 (14)∗ (11)∗
(22)∗
(16)∗
(14)∗
(11)∗
(12)∗
Type

∗ Unfortunately, the frequencies of amount ranges in the P2P scenario are

not available in SPACE; these values have been estimated by the authors.

4 https://usa.visa.com/solutions/crypto/deep-dive-on-solana.html

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:22 UTC from IEEE Xplore. Restrictions apply.

532

## Page 4

BRAIN 2024: Fifth Workshop on Blockchain theoRy and ApplicatIoNs

These numbers corroborate our working hypothesis about
the need of an off-ledger layer, and they provide us with a
reference point to designing proportioned scaled-down models.
SPACE includes further interesting information about realworld payments (see Table I), which we can use to assemble
a believable small-scale model: the distribution of amounts,
the proportion among Point-of-Sale, eCommerce, and Peerto-Peer payments, and the tendency of retail payments to be
domestic (within the same country) rather than cross-border.
B. Size of our small-scale model
We study a network on a scale ∼1:1000 relative to the
population of the euro area (344 million citizens). Our network
thus consists of 300k individuals (retail users) at Tier 3.
We incorporate one merchant every 100 people and a service
provider every 10k end-users, in line with the 6.4k inhabitants
per bank branch in Europe [8], for a total of 3k merchants
and 30 service providers in Tier 2. We model 3 countries,
representative of different scales found in the eurozone: a small
country (such as Cyprus, with ∼1M citizens), one mediumsized country (such as Finland, ∼6M), and a large country
(such as Italy, ∼60M). LSPs and CSs are associated with only
one of these countries, and the distribution of nodes among
countries is proportional to their population.
At Tier 1, each country has a (node representing its)
National Central Bank (NCB). NCBs live in the same monetary area and are interconnected. Cross-national payments are
assumed to be a fraction of national payments, namely 5%.
The number of TPS is also scaled 1:1000: Given the average
2,000 TPS from Sect. IV-A, we simulate 2 TPS for 24 hours,
or 172, 800 payments, which move 9.75M units of value. We
move an order of magnitude up for peak loads to 20 TPS (for
12 hours), thus to 950, 000 payments (53.2M in value).
Scale-independent parameters: The cap on wallets is taken
from [9], i.e., C3000; the distribution of payment amounts is
as in Table I; instant payments take at most 10s [10].
C. Simplifying assumptions
To facilitate the initial study of SH-PCNs under high load,
we assume that (a) the topology of the SH-PCN is static, i.e.,
after the initial setup, no new channels are opened/closed; (b)
each EU (person, merchant) has only a single channel, with a
single LSP; (c) LSPs are connected to their reference MH/RSP
in such a way that full connectivity is ensured; (d) the LSP
of an EU also acts as reference, trusted CS; (e) LSPs, RSPs,
CSs, and EUs are always online; (f) fees are not imposed to
route payments; so the best route is the shortest payer→payee
path with sufficient capacity; (g) the blockchain introduces a
constant delay when on-chain transactions are needed.
V. M ODELING AND SIMULATING SH-PCN S
In order to study how SH-PCNs behave if used to support
a retail payment system akin to the one described in Sect. IV,
given the rebalancing strategies from Sect. III, we model
the entire system, and we simulate its execution over a full
business day, under different load and liquidity conditions.
Our architecture is composed of 4 logical sub-models:

A. The SH-PCN topology model and generator (Sect. V-A),
tasked with creating realistic SH-PCNs; the network it
creates is given as input to:
B. The SH-PCN runtime model and simulator (Sect. V-B),
which simulates the working of actual PCNs to great
detail; this simulator is set in motion by an incoming
stream of payment requests, generated by:
C. The load model and generator for retail payments
(Sect. V-C), which outputs 24 hours worth of simulated
payments, according to Sect. IV-B; as the PCN evolves
under the payment load, it is analyzed and updated by:
D. The PCN realtime rebalancer (Sect. V-D), which monitors the PCN and applies the strategies from Sect. III to
keep the system running at full success rate.
Sub-models (A) and (C) are inspired by the structure and
functioning of actual European payment systems/patterns.
A. SH-PCN topology model and generator
We devise a generator of random SH-PCN instances that
takes as input a list of parameters—such as the number of
entities in each tier, the constraints on their inter-connections,
the capacity of channels among different actors, etc.—and
generates a random SH-PCN instance with those features.
The generator can construct 1:1 synthetic networks (with the
parameters in Section IV-A), but we use the small scale variant
from Section IV-B in our experiments (Section VI).
Our SH-PCN random model is a composition of various
graph models, each representing the connections (i) between
different categories of nodes, and (ii) within the same tier:
1) Central banks are interconnected in a clique formation,
with each link having a capacity of C500 million;
2) The links between LSPs are modelled using a WattsStrogatz graph, with k = 4 and p = 0.1;
3) The links between CBs and LSPs are generated by
dividing the LSPs into one subset per CB/country. Then,
a channel is established from each CB to every LSP in
its subset. The subset sizes are log-normally distributed
(with µ = 0 and σ = 1);
4) Channels between LSPs and EUs are modelled just like
in (3), albeit with fixed capacities, which represent the
cap on users’ wallets (C3000). Channels linking LSPs
with merchants vary based on the merchant’s size: small
(S), medium (M), and large (L) merchants are assigned
capacities of C5k, C50k, and C500k, respectively.
The capacities of channels in the subnetworks (2) and (3) are
not fixed: A range of values is explored in the experiments.
B. SH-PCN runtime model and simulator
We select CLoTH [11] as a PCN simulator. It is an opensource Discrete Event Simulation (DES) engine used in many
papers (e.g., [12], [13]) to simulate the operation of a mainstream lightning node5 , focusing on routing and on the HTLC
mechanics. Unfortunately, the serial engine of CLoTH does
not scale well to large networks and high payment volumes.
5 https://github.com/lightningnetwork/lnd

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:22 UTC from IEEE Xplore. Restrictions apply.

533

## Page 5

BRAIN 2024: Fifth Workshop on Blockchain theoRy and ApplicatIoNs

1ms

FIND
PATH

500ms

~56ms

SEND
PAYMENT
~28ms

10ms

1/TPS s

Payment failure
notiﬁed to payer

RECEIVE
FAIL

~28ms

NOTIFY
PAYMENT

~28ms

~ 1 BT

~28ms
500ms

FORWARD
FAIL

~28ms

~28ms FORWARD

PAYMENT
~28ms

~28ms

~28ms

RECEIVE
PAYMENT

~28ms

Payment success
notiﬁed to payer

RECEIVE
SUCCESS

~28ms

Payment Success Rate (%)

~28ms

GENERATE
PAYMENT

FORWARD
SUCCESS

10ms

100
95
90
80
Rebalancing mode
Full
(Rev) Waterfall only
None

50
10
6k

Payment received
successfully by payee

Tier 1 - Tier 2: 100
Within Tier 2: 50

Fig. 5: Event diagram of our ROSS-based, CLoTH-like PCN simulator.

So, we wrapped the relevant portions of CLoTH within
ROSS [14], a Parallel DES, to make the simulation run in
parallel on a multiprocessor system. Fig. 5 contains the event
diagram of our simulator. The elements and edges in black are
part of the original CLoTH. Elements in color represent extensions to CLoTH that we introduce: dynamic load generation—
in green; waterfall and reverse waterfall functionalities—
respectively in red and blue; submarine swaps—purple.
C. Model and generator for retail payments
The payment generator schedules a GENERATE PAYMENT
event (green in Fig. 5) to match a target global payment rate; in
the small scale model (Sect. IV-B) it is between 2 and 20 TPS.
Payments are created between two users that are randomly
selected according to the SPACE model (Sect. IV). The payer,
which is always a retail user, is chosen first. Then, the
generator selects a random payment scenario according to the
SPACE distribution of contexts (POS, eCommerce, P2P) and
to the static cross-border payment probability (5%). Depending
on the selected scenario, the generator picks a random receiver
among merchants (POS, eCommerce) or retail users (P2P).
Finally, the transaction amount is chosen according to the
SPACE conditional probability distribution (see Table I).
D. PCN real-time rebalancer
The rebalancer applies the strategies described in Sect. III
to the payment system simulated via our custom blending of
CLoTH and ROSS, described in Sect. V-B. The technicalities
of implementing these strategies in our parallel simulator can
be found in the Technical Report [15].
VI. E XPERIMENTAL E VALUATION
We generate and simulate 10 random SH-PCNs having the
topology described in Sect. V-A, and sized according to the
dimensional parameters from Sect. IV-B. There are only small
performance fluctuations among the different samples in our
basket, so we present and analyze their average results.
We study (A) under which conditions our rebalancing
strategies are able to keep the success rate at 100% under
a constant load; (B) whether payments remain “instant” in
all cases; (C) how the system reacts to a 10x increase in
the number of payments per second; (D) how the trade-off
between liquidity locked in channels and their rebalancing
plays out.

60k
600k
6M
60M
Total Network Liquidity

600M

1k
500

10M
5M

10k
100k
1M
5k
50k
500k
Per Channel Liquidity

Fig. 6: Percentage of payments routed instantly by the SH-PCN (y axis) as
a function of the liquidity in the network/channels (x axis). Log-log scale.
Solid lines give the mean; lightly colored bands span ± 1 std. deviation.

A. Payment Success Rate
Payments in PCNs can fail for a number of reasons, the
main one being the insufficient capacity of some link along the
route chosen by the payer/source. When a route fails, another
one is tried, until success—or until some failure criterion
is met, e.g., a timeout expires. As the load on the system
increases, the probability of failure is expected to increase,
both because channels may become unbalanced and because
there is an increasing resource contention from multiple inflight concurrent payments with partially overlapping routes.
In this context, we supply our SH-PCNs with a constant
load as per Sect. V-C, exerted for 24 hours (simulation time).
Figure 6 shows the success rate of payments as a function of
the total amount of liquidity Tier 1 and 2 operators are willing
to lock into the system. By “total amount”, we mean the sum
of the capacity of all the channels among Tier 2 operators,
plus the channels between Tier 1 and Tier 26 .
The success rate is non-zero (∼16%) even for zero total
liquidity because a fraction of payments happens between
retail customers of the same Tier 2 entity, which can be routed
successfully without traversing internal Tier 2 links.
As the network liquidity grows, so does the percentage
of payments successfully regulated “instantly”. A fully selfrebalancing network (green line) achieves a 100% success rate
after approximately 600k units of total network liquidity. If
we disable the rebalancing tool of Tier 2 (submarine swaps)
and keep active the Tier 2-3 ones (waterfalls), we are in a
scenario where payments can always be started and received,
but they can possibly fail due to inner channels becoming
permanently (almost) unbalanced. In this case (blue line), to
route all payments we need to inject hundreds of times more
liquidity into the network (∼60M units). The removal of all
rebalancing mechanisms results—as expected—in a failure of
the system to even approach a 100% success rate (orange line).
6 The other capacities are not accounted for, because: Capacities from Tier
2 to Tier 3 (wallet caps) are set by policy, and their liquidity cost is assumed
to be zero; channels within Tier 1 nodes are practically infinite (managed by
CBs); no channel exists within Tier 3.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:22 UTC from IEEE Xplore. Restrictions apply.

534

## Page 6

BRAIN 2024: Fifth Workshop on Blockchain theoRy and ApplicatIoNs

125

(Rev)Waterfall
per Minute

Percentage of payments
routed successfully

100
75
50

Waterfall
Reverse Waterfall

100
75
50
25
0
0

25
6

0

500

1000

1500

2000

Swaps
per Minute

0
2500

Time (ms)

1

2

3

4

5

6

7

8

9 10 11 12 13 14 15 16 17 18 19 20 21 22 23

7

8

9 10 11 12 13 14 15 16 17 18 19 20 21 22 23

Network Liquidity (€)
600k
1.2M
6M

4

2

Fig. 7: Time-to-completion of payments: cumulative distribution.
0
0

B. Instant-ness of payments

1

2

3

4

5

6

Hour of the Day

D. The cost of keeping a channel well balanced
We have seen the inverse correlation between channel
capacity and swaps per unit of time at the channel level.
At system level, this technical trade-off engenders a related
economical trade-off: Submarine swaps have an economic cost
in the form of Layer-1 transaction fees, which are set by Tier 1
7 Swaps only concern channels among Tier-2 entities. Conversely, we

assume channels involving Tier-1 entities are so capacious that they need no
re-balancing in our time window (i.e., they produce no Layer 1 transactions).

actors; at the same time, the cost for Tier 2 market operators
to keep central bank liquidity locked into channels is again
decided by Tier 1 actors. The resulting economic dynamics are
out of the scope of the present work. We just show that, once
the cost parameters are set, the market can optimize (statically
or dynamically) network liquidity at Tier 2.
In particular, the sum of (a) the cost of liquidity—
monotonically increasing with the capacity of channels, plus
(b) the cost of submarine swaps—monotonically increasing
with the number of swaps, is a convex function with a global
minimum. If the minimum is to the left of the point where
a 100% success rate is achieved (gray area in Fig. 9), it
means swaps are so cheap compared to borrowing liquidity
that the lower bound for network capacity is the minimum
liquidity necessary to sustain a 100% success rate. Conversely,
if the minimum is to the right of the point where submarine
swaps are no longer needed, it means liquidity is so cheap
compared to swaps that its optimal value is the minimum
value sufficient to process all payments without swaps (∼ 30M
800

100.0%
97.5%

Payment Success Rate

Payment systems must be able to sustain peaks that increase
the volume of transactions by an order of magnitude over the
nominal average throughput (the “Christmas Day” effect).
To show how our SH-PCNs responds to one such occurrence, we simulate a day where, from 7 am to 7 pm, the load
on the system suddenly increases by an order of magnitude.
Figure 8 shows the system response: All the rebalancing
mechanisms start working harder to maintain the entire payment network sufficiently well balanced, even under pressure.
By their nature, all the re-balancing strategies in use here
(see Sect. III) submit transactions to the underlying Layer
1 blockchain. So, another perspective on Fig. 8 is that it
shows the interaction among Layer 1 and Layer 2, i.e., the
transactional load on the DLT by our self-rebalancing PCN.
As expected, the number of swaps for a given routing
liquidity grows substantially under pressure and channels of
larger capacity require fewer swaps7 (approximately linear
inverse relation). Fig. 8 also shows that the number of (reverse)
waterfall events is independent of network liquidity and of
the number of swaps (it only depends on the load). Also, it
is much higher than the number of submarine swaps because
the capacity/cap for retail wallets is much smaller than the
average channel size. The payment success rate (not shown in
the chart) stays at 100% at all times during the peak window.

Fig. 8: In the top chart, we plot the number of (reverse) waterfall events per
minute during a 12h stress test (7 am to 7 pm). The (much smaller) number of
submarine swaps per minute requested by Layer 2 to Layer 1 in order to keep
the system balanced is accounted for in the bottom chart for three different
levels of total routing liquidity. Solid lines represent values averaged over the
sample instances in our basket; lightly colored bands span ± 1 std. deviation.

Daily Cost of Channels Management

Figure 7 reports the cumulative distribution of completion
times averaged over a full day of simulated payments, i.e.,
the number of payments that succeed within a given amount
of time. Any capacity beyond the 600k threshold identified in
Sect. VI-A produces similar results. All payments complete
within less than 3 seconds, well under the 10 second cutoff.
C. Adaptive Rebalancing

600

400

200

Total channel cost
Cost of swaps
Cost of liquidity
Payment success rate

0
60k

120k

300k

600k

1.2M

3M

6M

12M

Total Network Liquidity

Fig. 9: Daily cost of locked liquidity and of submarine swaps for different
network capacities. The sum of these components has a minimum at ∼ 800k.
We assume the CB lends money at 4.75%,8 and charges 0.1 monetary units
per Layer 1 transaction. The gray area denotes a success rate < 100%.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:22 UTC from IEEE Xplore. Restrictions apply.

535

## Page 7

BRAIN 2024: Fifth Workshop on Blockchain theoRy and ApplicatIoNs

in our example). The only remaining case is represented in
Fig. 9: The optimal amount of liquidity to invest by Tier 2
actors falls in the non-trivial range [600k;30M]: It turns out our
small-scale SH-PCN has the smallest running costs at ∼800k.
VII. R ELATED W ORK
The unstructured topology of the public LN led to a smallworld and scale-free network, with a few highly connected
nodes that route most of the payments [16]. Avarikioti et
al. [17] show that this topology is not optimal: When all
transactions are known a priori, a star topology minimizes
locked capital and maximizes profits. Such a central node
reduces the average path length and the routing failures at
the expense of weakening fault-tolerance, security, and privacy
(e.g., [18], [19]). Rohrer et al. [16] show how the LN can
be subject to channel exhaustion or node isolation attacks.
Our SH-PCNs aim to combine the benefits of both topologies.
Multiple well-connected hubs are also exploited in [20]. However, their presence is taken for granted and the focus is on
their optimal placement. Interestingly, the proposed rate-based
routing strategy perfectly fits the network features we propose.
Shabgahi et al. [21] propose a model to predict the expected
time for a channel to get unbalanced, considering its centrality
and its initial balance. To extend the lifespan of channels,
they can be either replenished via on-chain transactions (e.g.,
[22]) or rebalanced in-place (e.g., [23], [24]). Centralized
approaches to rebalancing require nodes to disclose their
individual contribution to the channel, thus violating privacy
(e.g., [25]). Avarikioti et al. [24] enhance the protocol using
privacy-preserving techniques. Li et al. [26] propose to divide
time in epochs and to use a randomly selected committee of
nodes to estimate the channels’ capacity needs. This approach
incurs a large number of on-ledger transactions.
Awathare et al. [23] propose a decentralized protocol that
leverages network cycles to perform rebalances. Papadis et
al. [27] use reinforcement learning to proactively perform
submarine swaps aiming to maximize profit from fees.
Miller et al. [28] propose an alternative to LN, enabling
incremental deposits and withdrawals through extended offchain contracts (i.e., with no impact on-ledger).
VIII. C ONCLUSION AND F UTURE W ORK
We introduced a class of self-rebalancing semi-hierarchical
PCNs, and showed experimentally—on a small-scale model
based on the payment patterns and structure of the euro area—
that they seem to (a) ensure good performances (in terms of
latency, throughput, and success rate of payments) and (b) suit
the existing 3-tier banking/payment architecture naturally.
As future work, we will move towards removing one by
one the simplifying assumptions listed in Sect. IV-C, up to the
point of presenting and studying a simulation at scale 1 : 1.
Finally, we will study the strength of the privacy enjoyed
by the payer/payee in this system, compared to the public LN.

R EFERENCES
[1] A. Gangwal, H. R. Gangavalli, and A. Thirupathi, “A survey of layertwo blockchain protocols,” J. Netw. Comput. Appl., vol. 209, p. 103539,
2023.
[2] F. S. Mishkin, The economics of money, banking, and financial markets.
Pearson education, 2007.
[3] M. Benedetti, F. De Sclavis, M. Favorito, G. Galano, S. Giammusso,
A. Muci, and M. Nardelli, “PoW-less Bitcoin with Confidential Byzantine PoA,” in Proc. 2023 IEEE Int. Conf. Blockchain and Cryptocurrency
(ICBC), 2023, pp. 1–3.
[4] M. Benedetti, F. D. Sclavis, M. Favorito, G. Galano, S. Giammusso,
A. Muci, and M. Nardelli, “Certified Byzantine Consensus with Confidential Quorum for a Bitcoin-derived Permissioned DLT,” in Proc.
of the 5th Distributed Ledger Technology Workshop, 2023, available at
https://ceur-ws.org/Vol-3460/papers/DLT 2023 paper 1.pdf.
[5] ECB, “A stocktake on the digital euro,” https://bit.ly/412yK8a, 2023.
[6] ECB Surveys, “Study on the payment attitudes of consumers in the euro
area (SPACE),” https://bit.ly/412qbdE, 2022.
[7] ECB Market Research, “Market research on possible technical solutions
for a digital euro,” https://bit.ly/49YHBvM, 2023.
[8] “Banking in europe: Ebf facts & figures 2022,” https://bit.ly/47E6Dyz,
accessed: 2023-11-10.
[9] U. Bindseil, “Tiered CBDC and the financial system,” Available at SSRN
3513422, 2020.
[10] “European central bank. what are instant payments?” https://bit.ly/
3RolNlO, accessed: 2023-11-10.
[11] M. Conoscenti, A. Vetrò, and J. C. De Martin, “CLoTH: A Lightning
Network Simulator,” SoftwareX, vol. 15, p. 100717, 2021.
[12] K. Asgari, A. A. Mohammadian, and M. Tefagh, “Dyfen: Agent-based
fee setting in payment channel networks,” 2022, arXiv:2210.08197.
[13] V. Davis and B. Harrison, “Learning a scalable algorithm for improving
betweenness in the lightning network,” in BCCA, 2022.
[14] “Ross: Rensselaer’s optimistic simulation system,” https://ross-org.
github.io, 2022.
[15] M. Benedetti, F. De Sclavis, M. Favorito, G. Galano, S. Giammusso,
A. Muci, and M. Nardelli, “Self-Balancing Semi-Hierarchical PCNs for
CBDCs,” 2024, arXiv:2401.11868.
[16] E. Rohrer, J. Malliaris, and F. Tschorsch, “Discharged payment channels: Quantifying the lightning network’s resilience to topology-based
attacks,” in Proc. of IEEE EuroS&PW’19, 2019, pp. 347–356.
[17] G. Avarikioti, Y. Wang, and R. Wattenhofer, “Algorithmic channel
design,” in ISAAC, vol. 123, 2018, pp. 16–1.
[18] G. Kappos, H. Yousaf, A. Piotrowska, S. Kanjalkar et al., “An empirical
analysis of privacy in the lightning network,” in Financial Cryptography
and Data Security, 2021, pp. 167–186.
[19] C. Sguanci and A. Sidiropoulos, “Mass exit attacks on the lightning
network,” 2022, arXiv:2208.01908.
[20] L. Yang, X. Dong, S. Gao, Q. Qu, X. Zhang et al., “Optimal hub
placement and deadlock-free routing for payment channel network
scalability,” 2023, arXiv:2305.19182.
[21] S. Z. Shabgahi, S. M. Hosseini, S. P. Shariatpanahi, and B. Bahrak,
“Modeling Effective Lifespan of Payment Channels,” 2022,
arXiv:2301.01240.
[22] V. Sivaraman, S. B. Venkatakrishnan, M. Alizadeh, G. Fanti, and
P. Viswanath, “Routing cryptocurrency with the spider network,” in Proc.
of HotNets ’18. ACM, 2018, p. 29–35.
[23] N. Awathare, Suraj, Akash, V. J. Ribeiro, and U. Bellur, “Rebal: Channel
balancing for payment channel networks,” in MASCOTS, 2021.
[24] Z. Avarikioti, K. Pietrzak, I. Salem, S. Schmid et al., “Hide & seek:
Privacy-preserving rebalancing on payment channel networks,” in Financial Cryptography and Data Security. Springer, 2022, pp. 358–373.
[25] R. Khalil and A. Gervais, “Revive: Rebalancing off-blockchain payment
networks,” in Proc. of ACM SIGSAC CCS ’17. ACM, 2017, p. 439–453.
[26] P. Li, T. Miyazaki, and W. Zhou, “Secure balance planning of offblockchain payment channel networks,” in INFOCOM, 2020.
[27] N. Papadis and L. Tassiulas, “Deep reinforcement learning-based rebalancing policies for profit maximization of relay nodes in payment
channel networks,” 2023, arXiv:2210.07302.
[28] A. Miller, I. Bentov, S. Bakshi, R. Kumaresan, and P. McCorry, “Sprites
and state channels: Payment networks that go faster than lightning,” in
Financial Cryptography and Data Security, 2019, pp. 508–526.

8 This seemingly arbitrary number is the annual Marginal Lending Facility
(MLF) of the European Central Bank (ECB) as of Sept. 20, 2023.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:22 UTC from IEEE Xplore. Restrictions apply.

536
