---
source_type: pdf
title: "An analysis of pervasive payment channel networks for Central Bank Digital Currencies"
original_file: "thesis/reference/An analysis of pervasive payment channel networks for Central Bank Digital\nCurrencies.pdf"
sha256: "767cab3ec33decd6d70824f1506e5a577913530bfb7f7c82419fbbe956b231ca"
page_count: 13
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: An analysis of pervasive payment channel networks for Central Bank Digital Currencies

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Computer Communications 240 (2025) 108199

Contents lists available at ScienceDirect

Computer Communications
journal homepage: www.elsevier.com/locate/comcom

An analysis of pervasive payment channel networks for Central Bank Digital
CurrenciesI
Marco Benedetti a , Francesco De Sclavis a , Marco Favorito a , Giuseppe Galano a,b ,
Sara Giammusso a , Antonio Muci a , Matteo Nardelli a ,∗
a

Bank of Italy, Rome, Italy

b University of Pisa, Pisa, Italy

ARTICLE

INFO

Keywords:
CBDC
Payment systems
Permissioned blockchain
Payment channel network
Semi-hierarchical topology
SH-PCN

ABSTRACT
The recent advancement of blockchain technology presents interesting opportunities that are worth a systematic
investigation for their potential use in a Central Bank Digital Currency (CBDC). A blockchain alone has known
scalability issues that can be overcome by, e.g., a layer-2 payment channel network (PCN). However, not all
aspects of such a PCN are easy to specify and optimize. Therefore, its overall behavior, given the multitude of
decentralized and individually configured nodes, is challenging to fully comprehend. In this paper, we consider
a two-layer hypothetical CBDC in which the wholesale layer utilizes a permissioned blockchain, which ensures
high integrity and verifiability, while the retail layer leverages an off-ledger PCN model (with pervasive nodes
distributed on a large-scale) that supports instant, privacy-preserving, and retail payments. We systematically
analyze the performances of two families of PCNs, namely SF-PCNs and SH-PCNs, characterized respectively by
a Scale-Free topology and a Semi-Hierarchical topology. Through extensive simulations and analyses, we offer
insights into optimizing PCN structures for CBDCs by exploring the trade-offs among liquidity locked by market
operators, payment success rate, throughput, payment completion time, as well as load on the underlying
blockchain. Although both SH-PCNs and SF-PCNs can offer state-of-the-art guarantees of fault-tolerance and
integrity, we demonstrate that SH-PCNs are better suited for handling large volumes of payments, scale better
with the number of network nodes, are more aligned with the anatomy of the current monetary and financial
system, and therefore should be preferred in CBDC designs.

1. Introduction
The advent of blockchain technology has opened new perspectives
in the financial sector, with the promise of enabling peer-to-peer,
secure, and programmable payments or exchanges of value in general.
Currently, the most popular examples of blockchains (i.e., [1,2]) are
public and permissionless, meaning that transactions are stored on a
public ledger (open to anyone for inspection) and that the ledger can be
updated by any node participating in the blockchain network (open to
anyone for validation). When running a distributed consensus protocol

to update either a permissioned or permissionless ledger, blockchains
exhibit limited scalability (e.g., [3]). For example, public blockchains
have throughput of approximately 10 transactions per second (in Bitcoin), approximately 100 transactions per second (in Ethereum), or approximately 1000 transactions per second (in Algorand)1 , with average
latencies of 10 minutes, 12 s and 4 s, respectively.2
These blockchain figures contrast with transaction volumes handled
by centralized systems deployed to implement retail instant payment
systems. These systems manage a very high load of transactions, on the

I All views are those of the authors and do not necessarily reflect the position of Bank of Italy.
∗ Corresponding author.

E-mail addresses: marco.benedetti@bancaditalia.it (M. Benedetti), francesco.desclavis@bancaditalia.it (F. De Sclavis), marco.favorito@bancaditalia.it
(M. Favorito), giuseppe.galano2@bancaditalia.it (G. Galano), sara.giammusso@bancaditalia.it (S. Giammusso), antonio.muci@bancaditalia.it (A. Muci),
matteo.nardelli@bancaditalia.it (M. Nardelli).
1
We acknowledge that determining the expected throughput of a blockchain is cumbersome, as it depends on different factors including consensus, the type
of transactions and their complexity. Here, we indicate approximate and expected values only to support a qualitative comparison among existing approaches
and to provide an insight on the scalability issue of blockchains.
2
https://developer.algorand.org/docs/get-details/transactions/#average-block-time
https://doi.org/10.1016/j.comcom.2025.108199
Received 29 July 2024; Received in revised form 11 February 2025; Accepted 25 April 2025
Available online 12 May 2025
0140-3664/© 2025 Elsevier B.V. All rights are reserved, including those for text and data mining, AI training, and similar technologies.

## Page 2

Computer Communications 240 (2025) 108199

M. Benedetti et al.

order of 104 –105 transactions per second (e.g., [4, Sect. IV-A]), settled
within seconds [5].
Payment Channel Networks (PCNs) hold significant promise for addressing blockchain scalability challenges (e.g., [3,6–8]): By establishing an off-ledger, permissionless, and peer-to-peer system, they enable
efficient exchange of payments without overloading the blockchain
(e.g., [9–11]). A PCN consists of numerous independent nodes that
use a specialized cryptographic protocol to cooperate in forwarding
payments. This protocol ensures that off-ledger payments are still secured by the blockchain, which remains the authoritative source of
asset ownership. Notable PCN implementations, like the widely-used
Lightning Network (LN) [12], incorporate incentives and protection
mechanisms to deter or penalize dishonest behavior. Currently, the
LN boasts over 13k active nodes, each maintaining an average of 8
open channels.3 However, not all aspects of a PCN are statically and
easily specified. For example: its topology develops spontaneously and
is inherently unstructured; the routing selection algorithm is chosen by
the sender; the fees are set autonomously by each node. Consequently,
the behavior of this complex system, with its multitude of decentralized
and individually configured nodes, is challenging to fully characterize.
A retail Central Bank Digital Currency (CBDC) is a digital currency
issued by a central bank and available to the general public. It aims
to ensure that payment services are available to anyone, anywhere,
at any time. For these reasons, retail CBDC systems represent an
extreme example of a retail payment system, and are very challenging
to design. Besides performance, in the case of CBDCs, further business
and technical requirements are put in place, such as strong security
and privacy guarantees, minimal or no fees for citizens, a cap on
the amount of liquidity users can amass, and the possibility to be
used by unbanked individuals. In addition, CBDC systems have to be
embedded into—and play nice with—the multi-tier structure of the
existing monetary infrastructure, while providing each actor with clear
and strong incentives to adopt the CBDC itself.
We suggest that a CBDC system can benefit from the advanced
technological solutions revolving around blockchains in order to enable
novel and advanced services that can, e.g., exploit programmability, pseudo-anonymity, strong cryptographic proofs, or claims on the
exchanged funds.
On that account, we design a two-layered CBDC system where the
first (wholesale) layer is implemented with a permissioned blockchain,
and exhibits high integrity, availability, fault-tolerance, and verifiability of monetary exchanges. We investigated such permissioned
blockchain in [13,14]. To overcome its inherent scalability limits,
in [4], we embraced the off-ledger paradigm, and described a permissioned PCN. This PCN represents a second (retail) layer built on top
of the actual blockchain, accommodating fast-payments, with cash-like
levels of privacy within the limits of individual wallet caps.
We are interested in investigating whether this two-layered system
is suited to implement a CBDC that needs to support large volumes of
payments (e.g., [15]). Different work has been conducted in analyzing
blockchains (e.g., [10,16,17]), PCNs (e.g., [11,18–20], or simulating
them (e.g., [21–23]) with the aim of analyzing their efficiency, scalability, privacy, fault-tolerance, or to propose protocol improvements.
Nonetheless, to the best of our knowledge, a systematic investigation
of the PCNs ability to support real-world payments is missing. Our
contribution moves towards this direction demonstrating that not all
network topologies are alike. Certain families of PCN topologies can
efficiently handle a large number of transactions (comparable to realworld volumes) and should be considered when designing a CBDC.
PCNs can reduce payment latency and enhance user experience by
enabling instant transaction processing. In our current model, each
end user directly participates into the PCN with their own (mobile)
node, making the resulting CBDC non-custodial and with minimal

3

trust assumptions. We observe that the envisioned design for a CBDC,
characterized by real-time processing capability and the ubiquitous
diffusion of PCN nodes, requires investigating some key cornerstones
that are typical of pervasive systems.
This paper builds on our previous contributions, aiming to strengthen
and generalize our results. In [4], we devised a family of PCNs with a
partially constrained topology, called Semi-Hierarchical Payment Channel Networks (SH-PCNs), and showed how PCNs — born as decentralized P2P networks — can be adapted to operate into the existing
hierarchical monetary system. We also introduced strategies capable
of counteracting the natural tendency of SH-PCN channels to get
unbalanced under streams of payments. In this paper, we extend
our investigation and present a systematic analysis of different PCN
topologies. First, we extend our machinery to generate Scale-Free PCN
(SF-PCN) as well, i.e., networks that mimic the emerging topology of
the LN. We describe how a CBDC can be implemented by exploiting the SF-PCN, with no control over how PCN nodes can establish
connections among them. Second, we present a more accurate model
of the blockchain, which handles and satisfies swap requests from
the second layer. To this end, we extend CLoTH-over-ROSS,4 our
distributed-memory parallel discrete-event simulator (PDES) built on
ROSS [24] and inspired by CLoTH [21], which enables the execution
of simulations across different processes [25]. Third, we run a thorough
investigation of SH-PCNs and SF-PCNs. We analyze the two topologies
in terms of payment success rate, liquidity efficiency, payment completion time, sender–receiver payment path length, load imposed on the
blockchain, cost of channel management, and scalability.
The rest of this paper is organized as follows. In Section 2, we briefly
present some background information that can help understand the
technology and the problem we are working on. Then, in Section 3, we
describe how PCN can be adopted in the context of CBDCs: we present
our SH-PCN and how SF-PCN can be used for CBDCs. In Section 4, we
describe our simulation model and the channel rebalancing techniques.
Both of them are then implemented into our simulator, named CLoTHover-ROSS, which is described in Section 5. By means of extensive
simulations, in Section 6, we evaluate the two PCN topologies for the
purpose of implementing a CBDC that needs to handle very large5
volumes of payments. Finally, we review related work in Section 8, and
conclude in Section 9. To ease the reading of this paper, we summarize
the main acronyms we use in Table 1.
2. Background
2.1. Blockchain
Blockchains are decentralized systems where a global state is represented as a chain of blocks and is replicated across all participant
nodes (e.g., [1,2]). To update the global state, a consensus protocol
is needed as participants must agree on the next block to add to the
chain; the chain growth is the result of a cooperative agreement process
(e.g., [16]). Different types of blockchains exist, being permissionless
and permissioned according to the subset of participants allowed to
actively join the consensus protocols. Also, different consensus protocols exist, which can be grouped into proof-based (e.g., such as
Proof-of-Work and Proof-of-Stake) and committee-based (e.g., such as
Practical Byzantine Fault Tolerant and HotStuff) [17]. However, due
to the difficulty of reaching an agreement in decentralized systems,
blockchains typically suffer from limited scalability. Layer-2 solutions

4

Our simulator is open source: https://bancaditalia.github.io/itcoin/.
Simulating a 1:1 model with respect to the population of, e.g., the euro
area is computationally very demanding, and it is beside the point in this
paper: We are mainly interested in investigating how the two topologies
compare and how they behave in terms of scalability; these insights can be
obtained working on a suitably reduced model.
5

https://1~ml.com/statistics visited on July 10, 2024.
2

## Page 3

Computer Communications 240 (2025) 108199

M. Benedetti et al.
Table 1
Main acronyms (and their meaning) used throughout the paper.
Acronym

Meaning

Acronym

Meaning

CB
CBDC
CLoTH

Central Bank
Central Bank Digital Currency
A PCN simulator (named by
inverting the letters in HTLC)
Custodian Service
Discrete Event System
European Central Bank
End User
Hashed Time-Locked Contract
Lightning Network
Lightning Service Provider
Monetary Hub

NCB
P2P
PCN
POS
ROSS

National Central Bank
Peer-to-Peer
Payment Channel Network
Point of Sale
Rensselaer’s Optimistic
Simulation System
Routing Service Provider
Scale-Free PCN
Semi-Hierarchical PCN
Study on the Payment Attitudes
of Consumers in the Euro area
Transactions per Second

CS
DES
ECB
EU
HTLC
LN
LSP
MH

RSP
SF-PCN
SH-PCN
SPACE
TPS

Table 2
Statistics on non-recurring payments. ECB SPACE 2022.
Type

N. %

PoS
Online
P2P

80
17
3

For a public retail payment system, such as a prospective CBDC
for the euro area, we can refer to the ‘‘Study on the payment attitudes
of consumers in the euro area’’ (SPACE) by the ECB [15]. Participants
from 19 euro area countries were requested to document their pointof-sale (POS), peer-to-peer (P2P), and eCommerce (Online) transactions
in a one-day diary. The key results of SPACE 2022 are summarized in
Table 2. SPACE includes information about real-world payments: the
distribution of amounts, the proportion among PoS, Online, and P2P
payments, and the tendency of retail payments to be domestic (within
the same country) rather than cross-border.
In addition, we consider Annex 1 of the ECB’s ‘‘Market Research on
Potential Technical Approaches for a Digital Euro’’ [26], which states that,
on average, individuals within the euro area engage in two financial
transactions per day, encompassing various payment methods and interaction points. The ‘‘Large adoption’’ scenario in this report assumes
that 70% of the eurozone population will use the CBDC for 35% of
all transactions. This implies approximately 2,000 tps on average. Peak
values may be larger by an order of magnitude.
These numbers corroborate our working hypothesis about the need
for an off-ledger layer, and they provide us with a reference point for
designing proportioned scaled-down models.

Distribution (%) of Range Amount (e)
<5

[5, 10)

[10, 20)

[20, 30)

[30, 50)

[50, 100)

> 100

21
10
(14)a

17
11
(11)a

21
20
(22)a

13
15
(16)a

13
17
(14)a

10
16
(11)a

5
11
(12)a

a

Unfortunately, the frequencies of amount ranges in the P2P scenario are not available
in SPACE; these values have been estimated by the authors.

represent a prominent approach to overcome this issue. They build a
(decentralized) system grounded on the blockchain, which represents
the layer-1 and ultimately holds the single source of truth regarding the
global state. Among layer-2 approaches, PCNs are the most popular and
emerging solution (e.g., [3,9,10]). In the blockchain we consider [14],
the global state is represented through Unspent Transaction Outputs
(UTXOs): a payment spends one or more UTXOs and generates one or
more new UTXOs. A novel aspect of the blockchain technology is its
ability to impose spending conditions on assets in circulation (i.e., programmability). It enables the implementation of Hash Time Locked
Contracts (HTLCs), which are pivotal for establishing a PCN [12].

3. PCN topologies for a CBDC
2.2. Payment channel networks (PCNs)
3.1. Roles in PCN topology
In a PCN, two nodes create a bilateral payment channel by ‘‘prefunding’’ it, i.e., by locking some amount of liquidity, called channel
capacity, into a 2-of-2 multisig UTXO,6 using a single on-chain funding
transaction. The sum of nodes’ balance in the channel can never exceed
the channel capacity. After the channel is created (i.e., the funding
transaction is confirmed), the nodes can exchange multiple, instant,
off-chain payments, which update the balances of nodes and eliminate
the need to constantly execute on-chain transactions. The safety of
payments within the channel is ensured through the pre-funding and
a channel revocation mechanism: If a cheating attempt by one party
is detected, the other is entitled to claim the entire channel capacity.
We refer the interested reader to, e.g., [9,12], for a comprehensive
description of PCNs. To safely exchange payments over a channel, the
participant nodes exchange a commitment transaction that, if published
on-chain, closes the channel and transfers the right amount of funds to
both nodes.

In our PCN topologies we consider four different roles. We have:
• Monetary Hubs (MHs). MHs are routing nodes with considerable liquidity, which are largely/fully interconnected. MHs are
business-to-business entities and do not interact with EUs (see
next).
• Lightning Service Providers (LSPs). LSPs are nodes that freely
open channels towards each other, ensuring that fault tolerance
and the other benefits of distributed networks are achieved. LSPs
offer their service to EUs by opening channels with them, thus
providing them with connectivity and reachability.
• Custodian Services (CSs). In addition to off-chain liquidity, EUs
generally own one or more accounts at a CSs, such as banks or
exchanges, which allow them to deposit/withdraw funds to/from
their personal accounts8 in private money. The CSs are connected
to the LSP network. The EU does not necessarily have direct
channels opened with CSs: Their monetary interactions happen
out-of-band and via LSPs.
• End-Users (EUs). These nodes are managed by ‘‘end users’’
(i.e., citizens, merchants), which are the ultimate beneficiaries of
the payment services. They access the network connecting to one
or more LSPs in a non-custodial way, i.e., they retain control over

2.3. Payments in a real-world payment system
Retail payment systems sustain a high load of transactions per
second (tps). A global-scale example is VISA, which recently disclosed
that its network can execute more than 65,000 tps at its peak.7

6
A 2-of-2 multisig UTXO is a transaction that requires two signatures,
i.e., by both nodes participating in a channel, to be spent.
7
https://usa.visa.com/solutions/crypto/deep-dive-on-solana.html

8
These other ledgers are managed by the CSs via separate (likely
account-based, centralized) systems, decoupled from the PCN.

3

## Page 4

Computer Communications 240 (2025) 108199

M. Benedetti et al.

Fig. 1. Structure and main features of a Semi-Hierarchical Payment Channel Network (SH-PCN), plus three sample payment routes: One Point-of-Sale payment from retail user 𝑐4
(a citizen) to merchant 𝑚2 ; one Peer-to-Peer transaction from 𝑐2 to 𝑐3 ; one eCommerce route from 𝑐1 to a foreign merchant 𝑚1 . As usual with source-based onion-routed protocols,
no actor (other than the payer and payee) has full information about any of these payments.

their private keys and route calculations, thereby preserving the
privacy of their payments. We assume EUs do not open channels
with each other, but they only open channels with their LSPs.

3.4. Simplifying assumptions
A full characterization of how SH-PCNs and SF-PCNs respond under
high load is extremely difficult to attain: In its full generality, the
construction is rather articulated; a very large number of parameters
and degrees of freedom come into play.
To cope with this complexity, we restrict our analysis to a tractable
subproblem. In particular—given that our aim is to provide initial
insights into the feasibility of using 2nd layer open-source technologies
for designing a CBDC—we conduct our analysis under the following
simplifying assumptions: (a) the topologies are static, i.e., after the
initial setup, no new channels are opened/closed; (b) each EU (person,
merchant) has only a single channel, with a single LSP; (c) LSPs are connected to their reference MH (in SH-PCN) or to one another (in SF-PCN)
in such a way that full connectivity is ensured; (d) the LSP of an EU also
acts as reference, trusted CS; (e) LSPs, CSs, and EUs are always online;
(f) fees are not imposed to route payments: The best payment route
is the shortest path between the payer and the payee with sufficient
capacity–and not the one occasioning the smallest fee; (g) PCN nodes
collaborate to rebalance channels among them, i.e., a node receiving a
submarine swap request always accepts it; (h) submarine swap requests
do not expire, and will be eventually completed; and (i) since our focus
is on modeling the blockchain’s impact on the PCN — particularly the
delay introduced when using submarine swaps for channel rebalancing
— we abstract away certain inconsequential contrivances introduced by
the blockchain setting (e.g., communication layer, consensus protocol).
These assumptions simplify the analysis of our model while still
allowing us to provide substantial insights into how the architecture
behaves. Furthermore, the target deployment scenario — that is, the
support of a CBDC scheme — diminish the distance between such
simplified model and a prospective real-world fully general solution:
Indeed, similar simplifying assumptions would likely be enforced by
policy in a CBDC. For instance, if LSPs are operated by commercial
banks or financial institutions, they would likely be subject to strict
service-level agreements (SLAs), ensuring reliable operation rather than
a best-effort approach as in public PCNs. The network dynamics might
be significantly slower than those observed, e.g., in the Lightning Network. Moreover, central banks could introduce policies and incentives
that shape how EUs select their LSPs or CSs, and likely limit the number
of channels they can open; they would also likely regulate liquidity
distribution and/or impose specific routing policies.

Usually there are many more EUs than LSPs/CSs, which in turn are
many more than the MHs.
3.2. Semi-hierarchical PCN
The current monetary system is based on a 3-tier banking system,
where: the central bank (CB) is at the top; a set of authorized intermediaries (e.g., commercial banks) are in the middle; retail users
(e.g., citizens and merchants) are at the bottom. For an introduction
to this 3-tier architecture, see [27]. We map the business roles of the
current monetary system onto the different technical roles in the PCN,
and the hierarchical anatomy of the banking system is reflected in
the (semi) hierarchical topology of the network. In the resulting SemiHierarchical PCN (SH-PCN), MHs only connect to LSPs, and EUs only
connect to LSPs. In particular, we have (see Fig. 1): Tier-1 nodes are
large MHs managed by a central bank9 (or a set of CBs in the same
monetary area). We assume that a CB can have a very large amount
of liquidity, since liquidity is not a cost for a CB. Tier2 nodes are LSPs
and CSs managed by commercial banks and other financial institutions,
which deploy large amounts of liquidity. They are connected with
the MH of their country, and among themselves forming a ‘‘small
world’’-like network. Finally, Tier-3 nodes are managed by ‘‘end users’’
(i.e., citizens, merchants), and they open small-sized channels with
authorized LSP(s).
3.3. Scale-Free PCN
The public Lightning Network (LN) shows strong small-world and
scale-free network characteristics with a few highly connected nodes
that route most of the payments (e.g., [18,19]). These highly connected
nodes facilitate the connection among nodes and the LN ability to
successfully route payments.
We are interested in understanding how such a network topology
performs and whether it can be employed to exchange large volumes
of transactions. To this end, we build Scale Free PCNs (SF-PCNs) that
mimic the topology of the LN. In these topologies, there are no MHs;
LSPs and CSs can establish connections and deploy large amounts of
liquidity only among them, in such a way that the resulting distribution
(asymptotically) follows a power law. Regarding EUs, we assume that
the same policy of SH-PCNs applies: EUs do not open channels with
each other, but they only open small-sized channels with their LSP(s).

4. Simulating a PCN-based CBDC
Our simulation model consists of the payment channel network
(with nodes and channels), the blockchain, and the payments exchanged between nodes. First, we describe the simulation model. Then,
we present the channel rebalancing techniques we developed to extend
the lifespan of channels.

9
At the on-chain layer, the CB is also responsible for running a secure
ledger (such as [13,14]) where transactions to open/close channels are stored,
i.e., where the liquidity that backs each channel is locked.

4

## Page 5

Computer Communications 240 (2025) 108199

M. Benedetti et al.

of all confirmed blocks, whereas the mempool includes transactions
waiting to be included in a block. The blockchain process creates a new
block periodically, according to an exponential distribution with mean
equal to block time, that is a simulation parameter we set equal
to 1 minute in Section 6. The blockchain throughput is controlled by
block size.

4.1. Payment channel network
To simulate a PCN, we extend the model proposed in CLoTH [21]
to represent SH-PCNs and SF-PCNs. The network consists of nodes and
channels. A node models a generic PCN node operated by an MH, an
LSP, a CS, or an EU. A node opens channels towards other nodes by
sending on-chain funding transactions.10 A node is characterized by its
operator (i.e., MH, LSP, CS, or EU), its country, and reference intermediary (needed only for end user nodes). A channel links two nodes. We
consider both public and private channels: the former can be used to
route payments among nodes, whereas the latter are meant to be used
only by the two counterparts. Private channels are especially useful
in the CBDC we envision, serving to represent connections between
LSP and EU nodes. A channel is characterized by its capacity and its
visibility (i.e., whether it is private or public). Since routing a payment
changes how such a balance is allocated among nodes, the channel
also includes two edges, one for each possible forwarding direction: an
edge keeps trace of the balance on a specific side of the channel. We
consider that PCN nodes are geographically distributed. Therefore, we
model network latencies among them by extracting their values from
a gamma distribution 𝛤 (6.4, 4.35) estimated on the average daily AWS
network latencies11 among European regions.

4.4. Channel rebalancing techniques
Forwarding a payment moves the channel balance towards the
receiver end of the payment. In the long term, as channels become
more and more unbalanced, they cannot successfully participate in the
routing of an increasing percentage of payments; the performance of
PCNs subjected to a load degrades over time. Rebalancing techniques
improve channel lifetimes while minimizing locked liquidity (e.g., [22,
28]). In [4], we describe three rebalancing techniques: two off-chain
solutions, i.e., waterfall and reverse waterfall, and an on-chain solution,
i.e., submarine swap. In the following, we briefly present them; further
details can be found in [4].
The waterfall rebalance allows EUs having high inbound traffic to
always get paid, even if the receiving payment amount would result
in exceeding its channel capacity (i.e., wallet cap). This is achieved
by automatically depositing some funds to a linked CS account. When
the LSP receives a payment to forward but the EU’s channel does not
have enough outbound liquidity, the LSP notifies the user about the
incoming payment, and delays the payment forwarding until the payment expiration time (i.e., 10 s13 ). The user requests a real-time deposit
to his CS by sending the deposit via the same LSP (thus rebalancing
the channel). If the channel is not successfully rebalanced within the
timeout, the payment fails. The reverse waterfall rebalance allows EU
having high outbound traffic to automatically fund a channel before
making transactions too large for its current state. The EU can request
a withdrawal, thus taking out some money from their CS account.
Once the withdrawal has transferred liquidity from the linked CS to
the channel, the user can send the payment.
An LSP can initiate a submarine swap when a payment about
to be forwarded would result in the channel balance exceeding a
predefined threshold. The unbalancedness of an incoming channel is
defined as the ratio between the local balance and the channel capacity:
unbalancedness greater than 0.5 indicates liquidity concentrated on the
side of the local node. Incoming payments are going to further increase
the unbalance. If the unbalancedness exceeds a swap threshold,
the node attempts to initiate a submarine swap for the incoming
channel. The happy path process is the following: (i) the node sends
a SWAP REQUEST to the channel counterparty; (ii) the counterparty
initiates the swap by sending a PREPARE HTLC transaction to the
blockchain; (iii) once the PREPARE HTLC transaction is confirmed, the
node sends a submarine off-ledger payment to the counterparty; (iv)
upon receipt of the submarine payment, the node can broadcast the
CLAIM HTLC transaction to the blockchain and (v) when the CLAIM
HTLC transaction is confirmed the swap is completed.
The simulation of submarine swaps leverages two simplifying assumptions. First, a node receiving a swap request always accepts it and
forwards the PREPARE HTLC transaction. Second, we do not handle
submarine swap timeouts.

4.2. Payments
A payment is exchanged between nodes, updating the state of traversed channels. Its model includes the payment details (i.e., sender,
receiver, amount), the forwarding path,12 and statistical information
(i.e., start time, number of attempts, status, errors). Note that the PCN
can throw an error while forwarding a payment, e.g., when the path
is not found, or it has not enough available balance. As detailed in
Section 5, payments represent the main entity driving simulations, as
they trigger events while flowing from the sender to its recipient.
4.3. Blockchain
For the purpose of our work, we are only interested in the interaction between the PCN (as a second-layer solution) and its underlying
layer-1 blockchain.
In several scenarios, users interact with the underlying blockchain
through on-chain transactions to ensure the liquidity or security of
payment channels. The block time and block size parameters have a
direct impact on transaction latency and on the overall blockchain
throughput. Transaction latency refers to the time it takes for a transaction to be confirmed and added to the blockchain; it can significantly
influence the payment success rate and liquidity efficiency of PCNs.
The blockchain throughput refers to the number of transactions processed per unit of time; it may become a bottleneck especially when
multiple channel actions need to be performed simultaneously. This
limitation can lead to increased transaction fees and delayed channel
operations, thereby affecting the PCN’s ability to handle high volumes
of transactions efficiently.
For these reasons, we introduce a lightweight model of the
blockchain, in which we abstract away all details related to its network, consensus, and application protocol. We mainly focus on the
ability of the blockchain to receive transactions, collect them in a
transaction pool (mempool), and periodically publish a new block.
We model the blockchain as a single process that manages the chain
data structures and the mempool. The chain represents the sequence

5. Implementation
To evaluate the different PCN topology models, we develop a system
consisting of a topology generator and a PCN simulator [25]. In this
paper, we extend the topology generator to build SH-PCN as well as

10
In this work, we assume that the network topology is statically defined.
We do not model the cost of opening and closing channels on-chain.
11
Source: https://www.cloudping.co
12
LN adopts a source-based routing : the sender identifies and specifies the
sequence of channels to be used to forward the payment towards the recipient.

13
The ECB defines instant payments as credit transfers ensuring funds appear
in the payee’s account within ten seconds of the payment order [5].

5

## Page 6

Computer Communications 240 (2025) 108199

M. Benedetti et al.

SF-PCN topologies. The topology generators define the initial configuration (e.g., channel balances); moreover, they divide the network into a
specified number of partitions (see later). The PCN simulator evaluates
the network by simulating payments exchanged between PCN nodes.
With a simulation, each node representing an EU triggers payments
towards other EUs, allowing both a steady transaction rate and varying
loads. The simulator records metrics related to transactions, including
latency and outcome (i.e., success or failure), and registers its own performance, including the number of rolled-back events and simulation
efficiency.
5.1. Cloth-over-ROSS
We briefly present CLoTH-over-ROSS, our implementation of the
PCN model in the distributed-memory PDES ROSS [24]. Further details
on CLoTH-over-ROSS can be found in [25]. To better understand the
impact of submarine swaps on load and performance, in this paper,
we extend our PCN model to represent the blockchain. We present
a straightforward model designed solely to receive, accept, or deny
requests from the PCN, potentially introducing a delay.
We map the PCN entities onto ROSS Logical Processes (LPs) and the
latter onto physical processes (PEs). An LP serves as the fundamental
computation unit; it manages its own event queue, receives messages,
processes the events they contain, and can send additional messages to
other LPs. We recur to a simple modeling and assign an LP for each
node in the PCN.
Global State. Each PE manages a global state (shared among all
LPs running on the same PE), which includes configuration parameters,
e.g., the target transaction rate, the payment timeout, and other variables used by specific features. It also includes the network structure
resulting from the topology generator. Finally, each PE stores a routing
table used to cache the computed shortest paths between nodes.
Parallel Execution. In ROSS, PEs are the processes of the distributed MPI architecture, which ultimately run the simulation by
feeding events to the managed LPs. The even distribution of events
(i.e., load) across PEs is crucial in a distributed-memory PDES like
ROSS: Co-locating chatty LPs on the same PE significantly improves
performance, as messages can be exchanged in memory instead of
relying on inter-process communication (which can involve exchanging
messages across the network). Unfortunately, in ROSS such a mapping
is static and must be defined before the simulation execution, thus
forcing us to partition the PCN beforehand. We take this into account
while generating the PCN topology, thus delegating this task to the
topology generator.
Payments and Events. Being event-based simulators, ROSS [24]
and CLoTH [21] leverage events to push forward the simulation. The
simulation model defines the PCN logic by implementing forward (and
reverse) handlers to change the simulation state and generate new
events. Reverse handlers are used in the optimistic event scheduling, whenever a roll-back should be performed, thus rewinding the
simulation state.
In CLoTH-over-ROSS, the payment generation logic is decentralized:
each PCN node can emit payment events. Unlike CLoTH, where payments are generated upfront, our approach enables longer simulations
as well as the analysis of large networks that exchange a volume of payments that cannot be stored in memory upfront. CLoTH-over-ROSS also
supports the presence of private channels (which are particularly useful
in the CBDC we envision) and the channel rebalancing techniques
described in Section 4.4.
Events move forward the simulation. We extend the event types defined in CLoTH to account for the decentralized generation of payments
and the rebalancing mechanisms. Fig. 2 summarizes the events our
simulation relies on, with the newly introduced events and transitions
represented in red. At the beginning of the simulation, each PCN
node schedules, at a random time that depends on the node payment

Fig. 2. Event diagram of our PCN simulator. New events compared to those in
CLoTH [21] are in red.

frequency, a GENERATE PAYMENT event. Its handler randomly determines the payment receiver and its amount, and enqueues a new FIND
PATH event and a GENERATE PAYMENT event to trigger the generation
of the next payment.
The FIND PATH handler computes the path between the sender
and the receiver of the payment. If a path cannot be found, the payment fails. Otherwise, the payment goes through the sequence SEND
PAYMENT, FORWARD PAYMENT (if the payment traverses more than
one edge), RECEIVE PAYMENT, FORWARD SUCCESS (if any), and
RECEIVE SUCCESS for a successful payment.
The forward handlers of SEND PAYMENT, FORWARD PAYMENT and
RECEIVE PAYMENT events — corresponding to the sender, intermediary node, and receiver of a payment, respectively — are responsible
for determining whether a payment can be forwarded. Specifically,
they check whether the next node is online and the channel has
sufficient capacity to forward the payment. If these conditions are
met, the handlers update the channel state14 and forward the payment
by scheduling the next FORWARD PAYMENT or RECEIVE PAYMENT
event. These handlers are very similar and only differ for conditions to
check and for handling different rebalancing operations. The FORWARD
PAYMENT handler can issue a NOTIFY PAYMENT to the recipient node
if the channel is unbalanced, prompting the recipient to initiate a waterfall rebalance (which schedules a FIND PATH event). The FORWARD
PAYMENT handler can also directly schedule FIND PATH events when
executed by an LSP involved in a submarine swap, facilitating the offchain exchange of payments that counterbalance an on-chain payment
performed in the PREPARE HTLC. In a reverse waterfall rebalancing
scenario, when a node receives the withdrawal (RECEIVE PAYMENT
event), it can schedule a FIND PATH to perform the (desired) payment
to another EU.
The RECEIVE PAYMENT handler also generates a FORWARD SUCCESS directed to the previous node of the path, when the payment
successfully reaches the receiver; instead, a RECEIVE SUCCESS event
is generated when the previous node in the path is the sender of the
payment. When the payment is delivered correctly to the receiver,
FORWARD SUCCESS events are scheduled to propagate the notification
up to the payment sender accordingly updating the channel state. A
non-successful payment results in the generation of FORWARD FAIL
and RECEIVE FAIL events, whose handlers are in charge of restoring
the channel state by reverting the balance update. A payment may fail
due to an insufficient balance to forward it along the path selected

14
Since the channel balance is stored in its two edges (one per direction),
these handlers only update the edge heading towards the receiver. The second
edge of the channel will be updated only in case of success by the FORWARD
SUCCESS event handler; conversely, RECEIVE FAIL will recover the channel
state in case of payment failure.

6

## Page 7

Computer Communications 240 (2025) 108199

M. Benedetti et al.

by the sender. The handlers of FORWARD FAIL and RECEIVE FAIL
restore the channel state by reverting the balance update, performed
by the FORWARD PAYMENT handler. Once a RECEIVE FAIL notifies
the failure to the sender, the payment can be re-tried until a successful
path is found, no other path connecting sender and receiver exists, or
a 10 s timeout expires and the payment fails.
Routing. The FIND PATH event handler solves a routing problem.
Custom routing policies can be defined, e.g., to account for routing
fees or perform multi-path routing. A CBDC can define incentives and
policies that might strongly diverge from the fee policies we witness in
the LN. Therefore, for sake of simplicity, we consider a simple Dijkstra
algorithm, that computes the shortest path — in terms of number of
traversed channels — between the payment sender and recipient.
Blockchain. The blockchain is modeled as a single LP that receives
requests from LPs representing PCN nodes and sends notifications once
their requests have been processed (i.e., added to a valid block). At the
start of the simulation, the blockchain LP schedules a NEXT BLOCK
event. The scheduling time is drawn from an exponential distribution
with a mean equal to the block time, which is set to 1 minute in
Section 6. The NEXT BLOCK event handler selects transactions from
the mempool to create the next block and subsequently schedules the
next NEXT BLOCK event. Additionally, the blockchain LP processes
TX BROADCAST events scheduled by PCN nodes to prepare and claim
HTLCs. Specifically, the FORWARD PAYMENT handler can initiate a
submarine swap by submitting an on-chain transaction to prepare an
HTLC. To complete the swap, the PCN node on the receiving end of
the rebalancing channel can claim the HTLC by submitting a second
on-chain transaction; this is managed by the RECEIVE SUCCESS
handler.

payment system, we point out that the LN already consists of multiple
connected components (e.g., [30,31]). Conversely, by construction, SHPCNs never exhibit disconnected subnetworks. Second, the properties
of our SF-PCNs can be compared with those of the LN [19]. Our
topologies are larger by two orders of magnitude, with the largest
connected component counting way more nodes. This is needed to
account for the number (albeit scaled down) of EUs in the euro area.
The average node degree of our SF-PCN is similar to that of the LN
testnet (i.e., 4, with a graph diameter that, in our case, is equal to 7
instead of 8). As a consequence, our SF-PCN has lower density (7 × 10−6
compared to 7 × 10−3 of LN mainnet and 5 × 10−3 of LN testnet). We
decide not to generate SF-PCN with higher node degrees to run a fair
comparison against SH-PCN; otherwise, the overall SF-PCN liquidity
would have been much higher due to the increased number of graph
edges.
Partitioning. ROSS does not support automatic load distribution.
Therefore, we partition the network topology in advance, so to better
take advantage of parallel execution mode of ROSS. To this end, we
need to reduce the number of events (i.e., payments) exchanged between multiple PEs; such events introduce the need of synchronization
among PEs which may result in a high number of rolled-back events
and computation when optimistic schedulers are used in ROSS.
We observe that the payment domain intrinsically holds a concept
of ‘‘locality’’: in a realistic payment load, a large volume of payments
is performed within a national territory, whereas a limited (roughly
5–10%) volume is involved in cross-border payments. We want to
exploit this characteristic to define custom partitioning (which, in turn,
will lead to a custom LP to PE mapping). Ideally, we would like to
allocate on the same partition PCN nodes that are geographically close
(e.g. belonging to the same country) and exchange most payments
among them.
The topology generator uses METIS [32] to logically partition the
PCN. To this end, we augment the PCN by adding weights on edges
representing the expected frequency of messages exchanged between its
nodes (which it depends on the number of expected payments). Then,
in order to achieve a balanced distribution of EUs among partitions,
we assign increasing weights respectively to EUs, LSPs, and MHs. We
assign weights to edges and nodes of the network in such a way that,
empirically, the partitioning groups nodes of the same country within
the same partition.

5.2. Topology generation and partitioning
We devise a generator of random Scale-Free and Semi-Hierarchical
PCN topologies with the features presented in Section 3. The generator
leverages NetworkX15 and METIS16 to randomly generate the network
graph and, then, partition it.
Parameters of SH-PCNs. At tier-1, we consider a fully connected
topology of MHs (i.e., they form a clique); each MH operates a node
with considerable liquidity (i.e., unlimited). At tier-2, LSPs open channels towards each other forming a ‘‘small world’’-like network (without
considering their belonging country); in our experiments, we consider
Watts–Strogatz graphs [29] with 𝑘 = 4 and 𝑝 = 0.1. Each LSP can
also play the role of CSs. Moreover, we assume that each LSP opens
a channel towards the MH of its country. At tier-3, EUs open a channel
towards a single LSPs of their country, which also acts as CS. EUs
are distributed across LSPs following a log-normally distribution (with
𝜇 = 0 and 𝜎 = 1). By policy, we assume that EUs do not open direct
links with each other.
Parameters of SF-PCNs. LSPs open channels forming a ‘‘scale-free’’
network; in our experiments, we generate scale-free networks using the
default parameters of networkX (i.e., 𝛼 = 0.41, 𝛽 = 0.54, 𝛾 = 0.05,
𝛿𝑖𝑛 = 0.2, and 𝛿𝑜𝑢𝑡 = 0). Each LSP can also play the role of CSs. EUs
open a channel towards a single LSPs, which also acts as CS. EUs are
distributed across LSPs following the same log-normal distribution of
SH-PCNs. EUs do not open direct links with each other.
The reference SF-PCN we use in the evaluation has 303k nodes and
606k edges, with a single large connected component. The average
shortest path among all nodes has length 4, with average degree of
4. We can draw two main observations. First, by construction, SFPCNs do not guarantee that only a single connected component exists;
therefore, some SF-PCNs could consist of multiple sub-networks that
are mutually disconnected. Although this sounds quite strange for a

15
16

6. Experimental evaluation
In this section, we investigate how SH-PCNs and SF-PCNs compare
with one another when processing a realistic (although scaled-down)
volume of payments in a timely manner. First, we analyze the two
topologies in terms of payment success rate, liquidity efficiency, payment completion time, load imposed on the blockchain, and cost of
channel management (Section 6.1). Then, we study how the system
reacts to a 10× increase in the number of payments per second (Section 6.2). Finally, we investigate how the number of swaps changes
when the topology size increases (Section 6.3), aiming to identify the
relationship among these two factors.
We run the experiments on AWS m5a.4xlarge machines (16 vCPUs and 64 GB of RAM). We generate and simulate 5 random SH-PCNs
and 5 random SF-PCN with the features described in Section 4. There
are only small performance fluctuations among the different samples
of our set, so we present and analyze their average results; figures
represent the mean with a solid line and the standard deviation using
colored bands.
We study a network on a scale ∼1:1000 relative to the population of
the euro area (344 million citizens). Hence, we simulate SH-PCNs with
3 MHs, 30 LSPs (which also play the role of CSs), and 303k EUs (300k
of which are citizens and 3k are merchants) that exchange payments —
randomly generated between EUs — for 24 hours, with an overall rate

NetworkX v3.3.0: https://networkx.org/
METIS v5.1.0: http://glaros.dtc.umn.edu/gkhome/metis/metis/overview
7

## Page 8

Computer Communications 240 (2025) 108199

M. Benedetti et al.

Fig. 3. Percentage of successfully routed payments (𝑦 axis) as a function of the liquidity
in the network/channels (𝑥 axis).

of 2 tps. To avoid excessively lengthening the simulation times, we precompute the payment paths between each pair of node as the shortest
path in the number of hops between payment sender and receiver.
We consider a swap threshold of 90% and a block time of 1
minute [14]; we scale down the block size proportionally to the
number of users, resulting in 4 transactions per block. The experiments
detailed in this section are fully reproducible and can be accessed via
our open-source repository.17

Fig. 4. Daily cost of locked liquidity and of submarine swaps for different network
capacities. In SH-PCNs, the sum of these components has a minimum at 1M, whereas
in SF-PCNs the minimum is obtained at 2.45M. We assume the CB lends money at
4.75%,18 and charges 0.1 monetary units per Layer 1 transaction. The gray area denotes
a success rate < 100%.

6.1. Payment performance and management cost
In this first set of experiments, we study (A) under which conditions
our rebalancing strategies are able to keep the success rate at 100%
under a constant load; (B) how the trade-off between liquidity locked
in channels and their rebalancing plays out; (C) whether payments
remain ‘‘instant’’ in all cases; and (D) the cumulative distribution of
submarine swap completion time and of sender- receiver path length.
Fig. 3 summarizes the experiments results. Note that we assign liquidity
per channel; SH-PCNs and SF-PCNs have a different number of channels
and ultimately result in a different total network liquidity.
We observe that SH-PCNs and SF-PCNs show a very different behavior in terms of payment success rate. Regarding the rebalancing
mode, when none are used, the maximum payment success rate that
both the topologies can achieve is 94% even when very high liquidity
is locked in the payment channels. Waterfall and reverse waterfall
sensibly improve the payment success rate, especially for SH-PCN;
instead, SF-PCN still requires high network liquidity (order of millions)
to achieve a success rate above 90%—which is achieved with just 60k
in SH-PCNs. The best performance is achieved with all the rebalancing
modes activated, i.e., waterfall, reverse waterfall, and submarine swaps.
In this case, SH-PCN registers 100% of payment success rate with 1M
of total network liquidity, whereas SF-PCN requires 2.8M of network
liquidity.
There is an inverse correlation between channel capacity and swaps
per unit of time at the channel level. At system level, this technical
trade-off engenders a related economical trade-off: submarine swaps
have an economic cost in the form of Layer-1 transaction fees, which
are set by Tier 1 actors; at the same time, the cost for Tier 2 market
operators to keep central bank liquidity locked into channels is again
decided by Tier 1 actors. The resulting economic dynamics are out
of the scope of the present work. However, in Fig. 4, we show that,
once the cost parameters are set, the market can optimize (statically
or dynamically) network liquidity at Tier 2. In particular, the sum of
(a) the cost of liquidity — monotonically increasing with the capacity

of channels, plus (b) the cost of submarine swaps — monotonically
increasing with the number of swaps, is a convex function with a
global minimum. If the minimum is to the left of the point where a
100% success rate is achieved (gray area in Fig. 4), it means swaps
are so cheap compared to borrowing liquidity that the lower bound
for network capacity is the minimum liquidity necessary to sustain a
100% success rate. Conversely, if the minimum is to the right of the
point where submarine swaps are no longer needed, it means liquidity
is so cheap compared to swaps that its optimal value is the minimum
value sufficient to process all payments without swaps (for SH-PCN it
is ∼ 12M in our example).
We now focus on the two configurations of network liquidity that,
with the full rebalancing mode, register 100% of payment success rate,
i.e., 1M for SH-PCN and 2.8M for SF-PCN. Fig. 5 shows the empirical
cumulative distribution function of different metrics of interest. Our
goal is to better understand the difference between the two topologies.
By observing the completion time of payments in Fig. 5(a), we see
that both the topologies can complete ∼ 99% of payments within 1.5 s.
Note that, even though SF-PCN uses much more network liquidity, the
payment completion time is slightly higher. To understand why, we
recur to Figs. 5(b) and 5(c); the former shows the cumulative distribution function of the completion time of submarine swaps, whereas
the latter represents the average number of hops in the sender–receiver
path for payments. On average, to obtain 100% of payment success
rate, SH-PCN uses 0.09 swaps per minute, compared to 0.11 by SFPCN. Being small numbers, more than half of them are completed
within 120 s, i.e., with two consecutive blocks. When the blockchain is
particularly congested we observe a long tail distribution with a small
percentage of swaps completing in almost 10× the block time. However,
overall, the two topologies have very similar distribution of the swap
completion time. A completely different behavior is observed for the
distribution of the number of hops between the sender and receiver of
payments (Fig. 5(c)). The regular structure of SH-PCN results in a low
variance in the path length, with almost all payments having a path
with exactly 4 hops. Conversely, in SF-PCN paths are characterized by
a high variance, with the average length equal to 4.2 (instead of 3.9)
hops. We observe that in the network topology we consider, network
delays are rather limited—begin modeled upon the network delays
between the European AWS data centers (see Section 4.1). However,

17
https://github.com/bancaditalia/itcoin-pcn-simulator/releases/tag/
comcom25-v1
18
This seemingly arbitrary number is the annual Marginal Lending Facility
(MLF) of the European Central Bank (ECB) as of Sept. 20, 2023.

8

## Page 9

Computer Communications 240 (2025) 108199

M. Benedetti et al.

Fig. 5. Empirical cumulative distribution of different simulation metrics.

Fig. 6. The top charts show the number of (reverse) waterfall events per minute during a 12 h stress test (7 am to 7 pm). The bottom charts represent the (much smaller) number
of submarine swaps per minute requested by Layer 2 to Layer 1 in order to keep the system balanced for three different levels of total routing liquidity.

the more EUs and LSPs are scattered on a geographic scale, the higher
would be the impact of the number of hops on the overall payment
completion time.

Table 3
Key parameters used during the scalability analysis of SH-PCNs and SF-PCNs. Note that,
differently from SH-PCNs, there are no MHs in SF-PCNs.

6.2. Handling peak loads
Payment systems must be able to sustain peaks that increase the
volume of transactions by an order of magnitude over the nominal
average throughput. To show how SH-PCNs and SF-PCNs responds to
one such occurrence, we simulate a day where, from 7 am to 7 pm,
the load on the system suddenly increases by an order of magnitude.
Fig. 6 shows the system response under different configuration of network liquidity. All the rebalancing mechanisms start working harder to
maintain the entire payment network sufficiently well balanced, even
under pressure. By their nature, submarine swaps submit transactions
to the underlying blockchain, thus representing the transactional load
on the DLT by the PCN. As expected, the number of swaps for a given
routing liquidity grows substantially under pressure and channels of
larger capacity require fewer swaps. Both SH-PCNs and SF-PCNs exhibit
an inverse relation (approximately linear) between network liquidity
and the number of swap per minute. Furthermore, Fig. 6 also shows
that the number of (reverse) waterfall events is independent of network
liquidity, of the number of swaps, and — in our case — of the network
topology, as it only depends on the load. Overall, it is much higher
than the number of submarine swaps because the capacity/cap for retail
wallets is much smaller than the average channel size. The payment
success rate (not shown in the chart) stays at 100% at all times during
the peak window.

Network
size

#MHs

#LSPs

#EUs
(citizens+merchants)

TPS

block
size

1×
2×
3×
4×

3 or none
3 or none
3 or none
3 or none

30
60
90
120

300k + 3k
600k + 6k
900k + 9k
1.2M + 12k

2
4
6
8

4
8
12
16

6.3. Scalability analysis
Aiming to investigate how the PCN performs when the number of
nodes increases, we run a third set of experiments. We keep constant
the number of CBs (to 3) and linearly increase the number of LSPs,
retail users and merchants (i.e., EUs) of factors 2x, 3x, and 4x. We also
increase the number of payments per second and the blockchain block
size of the same factor—see Table 3.
As can be observed from Fig. 7, SH-PCNs and SF-PCNs show a
very different scalability profile. As the network size increases, the two
topologies have trends with different slopes: SH-PCNs appears to be
more efficient in managing the traffic. We observe that this depends by
two factors: (1) the hierarchical structure of SH-PCNs helps to reduce
the number of swaps per channel; (2) SH-PCNs easily accommodate for
MHs that, employing channels with high capacity in convenient points
of the network, definitely help reducing the unbalancing speed of the
9

## Page 10

Computer Communications 240 (2025) 108199

M. Benedetti et al.

Rohrer et al. [18] show how the LN can be subject to channel exhaustion or node isolation attacks. Our SH-PCNs aim to combine the
benefits of decentralized and star-like topologies, leveraging a hierarchical approach, where multiple well-connected hubs simplify routing
and funds locking [4]. A similar idea is also exploited in [36], where,
however, the presence of the hubs is taken for granted, and the focus
is on their optimal placement. Interestingly, the proposed rate-based
routing strategy perfectly fits the network features we propose.
8.1.1. Channel capacity and rebalancing
When a channel routes a transaction, it moves liquidity, getting
progressively imbalanced over time (thus reducing the success probability of routing). Shabgahi et al. [28] propose a model to predict the
expected time for a channel to get unbalanced, considering its centrality
and its initial balance.
Basically, two main approaches emerged to replenish channels and
extend their lifespan, namely via on-chain transactions (e.g., [22]) or
via in-place rebalancing (e.g., by introducing ad-hoc routing strategies—
[37–41]). Centralized approaches to rebalancing require nodes to disclose their individual contribution to the channel, thus violating privacy (e.g., [38]). Avarikioti et al. [40] enhance the protocol using
privacy-preserving techniques. Li et al. [42] propose to divide time in
epochs and to use a randomly selected committee of nodes to estimate
the channels’ capacity needs. This approach incurs a large number of
on-ledger transactions.
Awathare et al. [39] propose a decentralized protocol that leverages
network cycles to perform rebalances. Papadis et al. [43] use reinforcement learning to proactively perform submarine swaps aiming to
maximize profit from fees. To the best of our knowledge, this is the
most detailed model of rebalancing through on-chain transactions. The
authors elegantly capture the different timescale at which rebalancing
decisions and user transactions are performed. Approaches that resort
to on-chain transactions (e.g., [22,28,42,43]) usually do not explicitly
model the limits imposed by the blockchain and, often implicitly,
assume that the blockchain can always satisfy rebalancing requests in
due time, with no overload occurring, ever. Among them, we mention Cycle [41], which proposes to identify cycles among PCN nodes,
where payments can be sent to asynchronously balance channels. Cycle
proposes an off-chain solution for honest participants and an on-chain
solution for dispute settlement with malicious participants. It can be
considered a generalization of Revive [38], which in turn works in
rounds. Miller et al. [44] propose an alternative to LN, enabling incremental deposits and withdrawals through extended off-chain contracts
(i.e., with no on-ledger impact).
Although sophisticated off-chain rebalancing techniques can be
adopted, there is currently no de-facto standard approach that also
preserves the confidentiality of the channel state. We postpone as future
work the investigation of off-chain rebalancing. Conversely, in this
paper, we leverage custom strategies besides submarine swaps, and
investigate them while considering the limitations set by the layer 1.

Fig. 7. Average number of submarine swaps per minute under different configurations
of network size and network liquidity.

channels. Also note that, introducing MHs in SF-PCNs would basically
transform them into SH-PCNs.
7. Discussion
The empirical evaluation of Section 6 provides different insights that
help us better understand whether and how PCNs can be adopted to
implement a blockchain-based CBDC. As widely known, the blockchain
alone cannot efficiently deal with the very large volume of daily
payments in, e.g., the Euro area. PCNs definitely represent a possible
solution to overcome limitations of blockchains in terms of scalability
and, although not investigated in this paper, of confidentiality and
privacy.
The empirical analysis highlighted that not all PCN topologies are
alike. The SH-PCN family can efficiently handle a large number of
transactions and may be preferable when designing a CBDC. In particular, we remark what follows. First, SH-PCNs rely on MHs to ensure
connectivity by construction; conversely, SF-PCNs could be made up
of multiple connected components that are possibly mutually disconnected. This represents a key problem in the context of CBDCs, which
aim at ensuring that payment services are available to anyone, anywhere, at any time. Second, as shown in Section 6, SH-PCN are more
efficient in terms of total network liquidity compared to SF-PCNs.
Our experiments show that they can route payments with 100% of
payment success rate with less liquidity locked in the layer 2 system
and, more importantly, with a daily cost of channel management of
almost 36% less than that of a SF-PCN. Third, the specific topology of
SH-PCNs, with centralized MHs that can route payments between LSPs,
results in a very limited variance in the path length between sender
and receiver. Although this is not an issue when EUs and LSPs use
stable and fast connectivity, it could be an issue assuming that these
nodes are geographically distributed or operate with limited or unstable
connectivity. Fourth, SH-PCNs appear to scale better in the number of
required submarine swaps per minute as the network size increases.
This boils down to a reduced impact on the blockchain as the number
of EUs using the CBDC increases. This is particularly relevant if we
consider that we analyzed a scaled-down version of the network, and
the number of EUs in a possible real-world deployment would be almost
three orders of magnitude larger than that.

8.2. Simulating PCNs
Although deeply intertwined, to date there are no simulators that focus on the blockchain-PCN interaction. We first briefly look at blockchain
simulators, and then summarize the key tools for simulating PCNs and,
in particular, the LN.
The popularity of blockchains as well as their complexity led to the
development of a rather large number of simulators (e.g., [45–47]),
with nearly half of them available in open-source (e.g., [23,48–51]).
They model a wide range of blockchain features, including the network, consensus, data, execution, and application layers. Paulavičius
et al. [52] and Albshri et al. [53] present an extensive literature
review on blockchain simulators, and provide an interesting comparison among them along different dimensions, including the supported
features. Unlike our approach, which relies on an established Parallel

8. Related work
8.1. Topology definition
The unstructured topology of the public LN led to a small-world and
scale-free network, with a few highly connected nodes that route most
of the payments [18]. Avarikioti et al. [33] show that this topology is
not optimal: When all transactions are known a priori, a star topology
minimizes locked capital and maximizes profits. Such a central node
reduces the average path length and the routing failures at the expense
of weakening fault-tolerance, security, and privacy (e.g., [20,34,35]).
10

## Page 11

Computer Communications 240 (2025) 108199

M. Benedetti et al.

Discrete Event Simulator, all of the previously mentioned works use
sequential (and often custom) simulators. They do not exploit advanced
simulation features, such as load distribution and optimistic event
scheduling, which might turn out to be very useful when simulating
large networks. To the best of our knowledge, all of these simulators
do not explicitly consider second layer systems, and they do not easily allow modeling and evaluating other systems that depend on the
simulated blockchain to operate.
Several PCN simulators exist (e.g. [54–56]), even though a comprehensive comparison among them is lacking. Research efforts typically
build their own simulator to evaluate specific features, therefore most
of them — unfortunately — appear not to be actively maintained
(e.g., [54,57]). In this context, simulations have been widely used,
e.g., to evaluate policies related to channel design, rebalancing, routing,
and privacy. One of the LN developer open-sourced a simulator 19
that focuses on the LN gossiping protocol. Beres et al. [54] develop a
simulator specifically focused on fee and profitability,20 to empirically
study LN’s transaction fees and privacy provisions. Furthermore, Kappos et al. [34] develop a custom simulator to investigate the privacy of
LN. Simulations are used to investigate the rouging problem, as well.
Engelmann et al. [58] do it by considering channels characterized by
economic-technical constraints. Zhang et al. [59] evaluate their routing
algorithm, which is aimed at minimizing the transaction fee of a payment path, subject to timeliness and feasibility constraints. Likewise, Yu
et al. [56] utilize a closed-source PCN simulator built on ns-3 to assess
CoinExpress, a novel payment routing mechanism. Conversely, Brânzei
et al. [60] disclose their custom sequential simulator, which is used to
investigate the Bitcoin ecosystem economics taking into account offledger transactions and miner fees as incentives for honesty. Rebello
et al. [55] introduce an open-source PCN simulator that implements
the official LN message protocol in OMNET++. Recently, Conoscenti
et al. [21] proposed CLoTH, an open-source simulator that reproduces
the code of LND, with specific regards to the routing and HTLC mechanisms. Different research works already use CLoTH for evaluating their
contributions (e.g., [61–63]). In [25], we propose CLoTH-over-ROSS a
model for simulating large-scale PCNs in the ROSS PDES simulator. The
model we propose here builds on the model by CLoTH [21], which we
extend so as to encompass specific topologies and features suited to
implement a hypothetical CBDC.

management costs compared to their scale-free counterparts. The superior performance of SH-PCNs can be attributed to their structure, which
facilitates more predictable and stable payment paths, thus minimizing
the complexity and potential bottlenecks inherent in decentralized
networks. This organized approach not only ensures a better user
experience through faster transaction processing but also enhances the
reliability of the network by reducing the risk of channel saturation
and imbalance. The findings from our research underscore the potential
of SH-PCNs in the context of CBDC implementation. Although further
investigation is needed to assess performance on a 1:1 scale with the
population of a real-world monetary area, SH-PCNs offer a promising
pathway to deploy digital currencies that meet the high throughput
demands of modern economies.
As future work, we will move towards removing one by one the
simplifying assumptions listed in Section 3.4, and towards presenting
and studying a simulation at scale 1:1. We plan to further refine our
PCN simulation models. In particular, we are interested in designing
rebalancing strategies as well as routing policies that can exploit the
specific features of the semi-hierarchical topology we are considering.
For example, in this contribution, we employed a rather simple and
reactive policy for triggering submarine swaps; it would be interesting
to devise a proactive approach that can more conveniently replenish the
payment channel beforehand, so as to avoid delaying payments or withdrawals. Regarding the routing policy, it would be interesting to design
a solution that can conveniently split payments and exploit multi-path
routing so to improve the payment channel lifespan (and, in turn, the
number of submarine swaps). As shown in the literature, payments can
be also exploited to keep channels balanced through the identification
of circular paths. Finally, we are interested in investigating the strength
of the privacy enjoyed by the payer/payee in this system, compared to
the public LN.
CRediT authorship contribution statement
Marco Benedetti: Writing – original draft, Visualization, Software,
Methodology, Investigation, Conceptualization. Francesco De Sclavis:
Writing – review & editing, Conceptualization. Marco Favorito: Writing – review & editing, Software, Investigation. Giuseppe Galano:
Writing – review & editing, Validation, Software, Conceptualization.
Sara Giammusso: Writing – review & editing, Visualization, Software, Investigation, Conceptualization. Antonio Muci: Writing – review & editing, Software, Conceptualization. Matteo Nardelli: Writing
– original draft, Methodology, Investigation, Conceptualization.

9. Conclusions and future work
In this paper, we conducted an extensive exploration into the realm
of PCNs as scalable solutions for implementing blockchain-based CBDCs. By showing the practical viability of PCN topologies for CBDCs, we
contribute to the ongoing discourse on how to best harness blockchain
technologies for public good, particularly in the facilitation of efficient, fault-tolerant, and secure financial systems. Our investigation has
demonstrated that the topology of a PCN significantly influences its performance, scalability, and overall effectiveness in real-world payment
environments. Particularly, we focused on comparing SH-PCNs and SFPCNs, each representing distinct approaches to network organization
and scalability.
Our systematic analysis reveals that SH-PCNs outperform SF-PCNs
across several critical metrics. The semi-hierarchical structure of SHPCNs, with its partially constrained topology, exhibits higher payment
success rates and enhanced liquidity efficiency. Also, they smoothly
fit the existing 3-tier banking/payment architecture. Even though both
topologies can meet the performance requirements of CBDC systems
aimed at handling real-time, high-volume transactions, SH-PCNs help
reduce the variability of payment completion time, impose lower load
on the underlying blockchain technology, and involve reduced channel

19
20

Declaration of competing interest
The authors declare that they have no known competing financial interests or personal relationships that could have appeared to
influence the work reported in this paper.
Data availability
Link to data and code in the paper.

References
[1] S. Nakamoto, Bitcoin: A peer-to-peer electronic cash system, Decentralized Bus.
Rev. (2008) URL https://bitcoin.org/bitcoin.pdf.
[2] V. Buterin, A Next Generation Smart Contract & Decentralized Application
Platform, Tech. Rep., Ethereum, 2014.
[3] Q. Wang, J. Yu, S. Chen, Y. Xiang, SoK: DAG-based blockchain systems, ACM
Comput. Surv. 55 (12) (2023) http://dx.doi.org/10.1145/3576899.
[4] M. Benedetti, F. De Sclavis, M. Favorito, G. Galano, S. Giammusso, A. Muci, M.
Nardelli, Self-balancing semi-hierarchical payment channel networks for central
bank digital currencies, in: Proc. of 2024 IEEE PerCom Workshops, 2024, pp.
530–536, http://dx.doi.org/10.1109/PerComWorkshops59983.2024.10503409.
[5] European Central Bank, What are instant payments? 2023, https://www.ecb.
europa.eu/paym/integration/retail/instant_payments/html/index.en.html.

https://github.com/rustyrussell/million-channels-project
https://github.com/ferencberes/LNTrafficSimulator
11

## Page 12

Computer Communications 240 (2025) 108199

M. Benedetti et al.
[6] W. Tang, W. Wang, G. Fanti, S. Oh, Privacy-utility tradeoffs in routing cryptocurrency over payment channel networks, Proc. ACM Meas. Anal. Comput. Syst. 4
(2) (2020) http://dx.doi.org/10.1145/3392147.
[7] G. Malavolta, P. Moreno-Sanchez, A. Kate, M. Maffei, S. Ravi, Concurrency and
privacy with payment-channel networks, in: Proc. of the 2017 ACM SIGSAC
Conference on Computer and Communications Security, CCS ’17, ACM, 2017,
pp. 455–471, http://dx.doi.org/10.1145/3133956.3134096.
[8] Q. Zhou, H. Huang, Z. Zheng, J. Bian, Solutions to scalability of blockchain: A
survey, IEEE Access 8 (2020) 16440–16455, http://dx.doi.org/10.1109/ACCESS.
2020.2967218.
[9] A. Gangwal, H.R. Gangavalli, A. Thirupathi, A survey of layer-two blockchain
protocols, J. Netw. Comput. Appl. 209 (2023) 103539, http://dx.doi.org/10.
1016/j.jnca.2022.103539.
[10] G.A.F. Rebello, G.F. Camilo, L.A.C. de Souza, M. Potop-Butucaru, M.D. de
Amorim, M.E.M. Campista, L.H.M.K. Costa, A survey on blockchain scalability:
From hardware to layer-two protocols, IEEE Commun. Surv. Tutor. (2024)
http://dx.doi.org/10.1109/COMST.2024.3376252, 1–1.
[11] N. Papadis, L. Tassiulas, Blockchain-based payment channel networks: Challenges
and recent advances, IEEE Access 8 (2020) 227596–227609, http://dx.doi.org/
10.1109/ACCESS.2020.3046020.
[12] J. Poon, T. Dryja, The Bitcoin Lightning Network: Scalable off-chain instant
payments, 2016.
[13] M. Benedetti, F. De Sclavis, M. Favorito, G. Galano, S. Giammusso, A. Muci,
M. Nardelli, PoW-less bitcoin with confidential Byzantine PoA, in: Proc. 2023
IEEE Int. Conf. Blockchain and Cryptocurrency, ICBC, 2023, pp. 1–3, http:
//dx.doi.org/10.1109/ICBC56567.2023.10174972.
[14] M. Benedetti, F. De Sclavis, M. Favorito, G. Galano, S. Giammusso, A. Muci, M.
Nardelli, Certified Byzantine consensus with confidential quorum for a bitcoinderived permissioned DLT, in: Proc. of the 5th Distributed Ledger Technology
Workshop, 2023, pp. 1–17.
[15] ECB Surveys, Study on the Payment Attitudes of Consumers in the Euro Area
(SPACE), ECB, 2022, URL https://www.ecb.europa.eu/stats/ecb_surveys/space/
html/ecb.spacereport202212~783ffdf46e.en.html.
[16] N. Kannengießer, S. Lins, T. Dehling, A. Sunyaev, Trade-offs between distributed
ledger technology characteristics, ACM Comput. Surv. 53 (2) (2020) http://dx.
doi.org/10.1145/3379463.
[17] J. Xu, C. Wang, X. Jia, A survey of blockchain consensus protocols, ACM Comput.
Surv. 55 (13s) (2023) http://dx.doi.org/10.1145/3579845.
[18] E. Rohrer, J. Malliaris, F. Tschorsch, Discharged payment channels: Quantifying
the lightning network’s resilience to topology-based attacks, in: Proc. of the
2019 IEEE European Symposium on Security and Privacy Workshops, EuroS&PW,
2019, pp. 347–356, http://dx.doi.org/10.1109/EuroSPW.2019.00045.
[19] S. Lee, H. Kim, On the robustness of Lightning Network in Bitcoin, Pervasive Mob. Comput. 61 (2020) 101108, http://dx.doi.org/10.1016/j.pmcj.2019.
101108.
[20] E. Erdin, S. Mercan, K. Akkaya, An evaluation of cryptocurrency payment
channel networks and their privacy implications, 2021, arXiv:2102.02659, URL
https://arxiv.org/abs/2102.02659.
[21] M. Conoscenti, A. Vetrò, J.C. De Martin, CLoTH: A lightning network simulator,
SoftwareX 15 (2021) 100717, http://dx.doi.org/10.1016/j.softx.2021.100717.
[22] V. Sivaraman, S.B. Venkatakrishnan, M. Alizadeh, G. Fanti, P. Viswanath, Routing
cryptocurrency with the spider network, in: Proc. of the 17th ACM Workshop
on Hot Topics in Networks, HotNets ’18, ACM, 2018, pp. 29–35, http://dx.doi.
org/10.1145/3286062.3286067.
[23] M. Alharby, A. van Moorsel, BlockSim: A simulation framework for blockchain
systems, ACM Sigmetrics Perform. Eval. Rev. 46 (3) (2019) 135–138, http:
//dx.doi.org/10.1145/3308897.3308956.
[24] C.D. Carothers, D. Bauer, S. Pearce, ROSS: A high-performance, low-memory,
modular Time Warp system, J. Parallel Distrib. Comput. 62 (11) (2002)
1648–1669, http://dx.doi.org/10.1016/S0743-7315(02)00004-7.
[25] G. Galano, S. Giammusso, M. Nardelli, Modeling central bank digital currency
over payment channels: A parallel ROSS-based approach, in: Proc. of 38th ACM
SIGSIM Conference on Principles of Advanced Discrete Simulation, SIGSIM PADS
’24, ACM, 2024, pp. 30–34, http://dx.doi.org/10.1145/3615979.3656052.
[26] ECB Market Research, Market Research on Possible Technical Solutions for
a Digital Euro, ECB, 2023, URL https://www.ecb.europa.eu/press/intro/news/
html/ecb.mipnews230113.en.html.
[27] F.S. Mishkin, The Economics of Money, Banking, and Financial Markets, Pearson
Education, 2007.
[28] S.Z. Shabgahi, S.M. Hosseini, S.P. Shariatpanahi, B. Bahrak, Modeling effective
lifespan of payment channels, 2023, arXiv:2301.01240, URL https://arxiv.org/
abs/2301.01240.
[29] D.J. Watts, S.H. Strogatz, Collective dynamics of ‘small-world’ networks, Nature
393 (6684) (1998) 440–442, http://dx.doi.org/10.1038/30918.
[30] I.A. Seres, L. Gulyás, D.A. Nagy, P. Burcsi, Topological analysis of bitcoin’s
lightning network, in: Mathematical Research for Blockchain Economy, Springer,
2020, pp. 1–12, http://dx.doi.org/10.1007/978-3-030-37110-4_1.
[31] I. Gallo, M. Ribaudo, M. Dell’Amico, Network Analysis of the Lightning Network,
in: Proc. of the 6th Distributed Ledger Technology Workshop, 2024, pp. 1–2,
Available at https://dlt2024.di.unito.it/wp-content/uploads/2024/05/DLT2024_
paper_57.pdf.

[32] G. Karypis, V. Kumar, A fast and high quality multilevel scheme for partitioning
irregular graphs, SIAM J. Sci. Comput. 20 (1) (1998) 359–392, http://dx.doi.
org/10.1137/S1064827595287997.
[33] G. Avarikioti, Y. Wang, R. Wattenhofer, Algorithmic channel design, in: Proc.
of ISAAC 2018, in: LIPIcs, vol. 123, Schloss Dagstuhl - Leibniz-Zentrum für
Informatik, Dagstuhl, Germany, 2018, pp. 16:1–16:12, http://dx.doi.org/10.
4230/LIPIcs.ISAAC.2018.16.
[34] G. Kappos, H. Yousaf, A. Piotrowska, S. Kanjalkar, et al., An empirical analysis of
privacy in the lightning network, in: Financial Cryptography and Data Security,
2021, pp. 167–186, http://dx.doi.org/10.1007/978-3-662-64322-8_8.
[35] C. Sguanci, A. Sidiropoulos, Mass exit attacks on the lightning network, in: Proc.
of the 2023 IEEE International Conference on Blockchain and Cryptocurrency,
ICBC, 2023, pp. 1–3, http://dx.doi.org/10.1109/ICBC56567.2023.10174926.
[36] L. Yang, X. Dong, S. Gao, Q. Qu, X. Zhang, W. Tian, Y. Shen, Optimal hub
placement and deadlock-free routing for payment channel network scalability, in:
Proc. of the 2023 IEEE 43rd International Conference on Distributed Computing
Systems, ICDCS, 2023, pp. 692–702, http://dx.doi.org/10.1109/ICDCS57875.
2023.00087.
[37] R. Pickhardt, M. Nowostawski, Imbalance measure and proactive channel rebalancing algorithm for the Lightning Network, in: Proc. of the 2020 IEEE
International Conference on Blockchain and Cryptocurrency, ICBC, 2020, pp.
1–5, http://dx.doi.org/10.1109/ICBC48266.2020.9169456.
[38] R. Khalil, A. Gervais, Revive: Rebalancing off-blockchain payment networks, in:
Proc. of the 2017 ACM SIGSAC Conference on Computer and Communications
Security, CCS ’17, ACM, New York, NY, USA, 2017, pp. 439–453, http://dx.doi.
org/10.1145/3133956.3134033.
[39] N. Awathare, Suraj, Akash, V.J. Ribeiro, U. Bellur, REBAL: Channel balancing for
payment channel networks, in: Proc. of the 2021 29th International Symposium
on Modeling, Analysis, and Simulation of Computer and Telecommunication
Systems, MASCOTS, 2021, pp. 1–8, http://dx.doi.org/10.1109/MASCOTS53633.
2021.9614304.
[40] Z. Avarikioti, K. Pietrzak, I. Salem, S. Schmid, S. Tiwari, M. Yeo, Hide & seek:
Privacy-preserving rebalancing on payment channel networks, in: I. Eyal, J.
Garay (Eds.), Financial Cryptography and Data Security, Springer, 2022, pp.
358–373, http://dx.doi.org/10.1007/978-3-031-18283-9_17.
[41] Z. Hong, S. Guo, R. Zhang, P. Li, Y. Zhan, W. Chen, Cycle: Sustainable off-chain
payment channel network with asynchronous rebalancing, in: Proc. of the 2022
52nd Annual IEEE/IFIP International Conference on Dependable Systems and
Networks, DSN, 2022, pp. 41–53, http://dx.doi.org/10.1109/DSN53405.2022.
00017.
[42] P. Li, T. Miyazaki, W. Zhou, Secure balance planning of off-blockchain payment
channel networks, in: Proc. of the 2020 IEEE Conference on Computer Communications, INFOCOM’20, 2020, pp. 1728–1737, http://dx.doi.org/10.1109/
INFOCOM41043.2020.9155375.
[43] N. Papadis, L. Tassiulas, Deep reinforcement learning-based rebalancing policies
for profit maximization of relay nodes in payment channel networks, in: P.
Pardalos, I. Kotsireas, W.J. Knottenbelt, S. Leonardos (Eds.), Mathematical
Research for Blockchain Economy, Springer, Cham, 2023, pp. 1–27, http://dx.
doi.org/10.1007/978-3-031-48731-6_1.
[44] A. Miller, I. Bentov, S. Bakshi, R. Kumaresan, P. McCorry, Sprites and state
channels: Payment networks that go faster than lightning, in: I. Goldberg, T.
Moore (Eds.), Financial Cryptography and Data Security, Springer, 2019, pp.
508–526, http://dx.doi.org/10.1007/978-3-030-32101-7_30.
[45] E. Androulaki, G.O. Karame, M. Roeschlin, T. Scherer, S. Capkun, Evaluating
user privacy in Bitcoin, in: A.-R. Sadeghi (Ed.), Financial Cryptography and
Data Security, Springer, Springer Berlin Heidelberg, 2013, pp. 34–51, http:
//dx.doi.org/10.1007/978-3-642-39884-1_4.
[46] I. Eyal, E.G. Sirer, Majority is not enough: Bitcoin mining is vulnerable, Commun.
ACM 61 (7) (2018) 95–102, http://dx.doi.org/10.1145/3212998.
[47] A. Gervais, G.O. Karame, K. Wüst, V. Glykantzis, H. Ritzdorf, S. Capkun, On
the security and performance of proof of work blockchains, in: Proc. of 2016
ACM SIGSAC Conference on Computer and Communications Security, CCS’16,
ACM, New York, NY, USA, 2016, pp. 3–16, http://dx.doi.org/10.1145/2976749.
2978341.
[48] A. Deshpande, P. Nasirifard, H.-A. Jacobsen, eVIBES: Configurable and interactive
ethereum blockchain simulation framework, in: Proc. of 19th Int. Middleware
Conference (Posters), Middleware ’18, ACM, New York, NY, USA, 2018, pp.
11–12, http://dx.doi.org/10.1145/3284014.3284020.
[49] A. Miller, R. Jansen, Shadow-Bitcoin: Scalable simulation via direct execution
of Multi-Threaded applications, in: Proc. of 8th Workshop on Cyber Security
Experimentation and Test, CSET 15, USENIX Association, Washington, D.C.,
2015, pp. 1–8.
[50] C. Faria, M. Correia, BlockSim: Blockchain simulator, in: Proc. of the 2019
IEEE International Conference on Blockchain (Blockchain), 2019, pp. 439–446,
http://dx.doi.org/10.1109/Blockchain.2019.00067.
[51] D.K. Gouda, S. Jolly, K. Kapoor, Design and validation of BlockEval, a
blockchain simulator, in: Proc. of the 2021 Int. Conf. on COMmunication
Systems & NETworkS, COMSNETS, 2021, pp. 281–289, http://dx.doi.org/10.
1109/COMSNETS51098.2021.9352838.
12

## Page 13

Computer Communications 240 (2025) 108199

M. Benedetti et al.
[52] R. Paulavičius, S. Grigaitis, E. Filatovas, A systematic review and empirical
analysis of blockchain simulators, IEEE Access 9 (2021) 38010–38028, http:
//dx.doi.org/10.1109/ACCESS.2021.3063324.
[53] A. Albshri, A. Alzubaidi, B. Awaji, E. Solaiman, Blockchain simulators: A systematic mapping study, in: Proc. of the 2022 IEEE Int. Conf. on Services Computing,
SCC, 2022, pp. 284–294, http://dx.doi.org/10.1109/SCC55611.2022.00049.
[54] F. Beres, I.A. Seres, A.A. Benczur, A cryptoeconomic traffic analysis of bitcoin’s
lightning network, 2019, arXiv:1911.09432, URL https://arxiv.org/abs/1911.
09432.
[55] G.A.F. Rebello, G.F. Camilo, M. Potop-Butucaru, M.E.M. Campista, M.D. de
Amorim, L.H.M.K. Costa, PCNsim: A flexible and modular simulator for payment
channel networks, in: Proc. of 2022 IEEE Conference on Computer Communications Workshops(INFOCOM WKSHPS), 2022, pp. 1–2, http://dx.doi.org/10.1109/
INFOCOMWKSHPS54753.2022.9798003.
[56] R. Yu, G. Xue, V.T. Kilari, D. Yang, J. Tang, CoinExpress: A fast payment routing
mechanism in blockchain-based payment channel networks, in: Proc. of the
2018 27th International Conference on Computer Communication and Networks,
ICCCN, 2018, pp. 1–9, http://dx.doi.org/10.1109/ICCCN.2018.8487351.
[57] G. Di Stasi, S. Avallone, R. Canonico, G. Ventre, Routing payments on the
lightning network, in: Proc. of the 2018 IEEE International Conference on
Internet of Things (IThings) and IEEE Green Computing and Communications
(GreenCom) and IEEE Cyber, Physical and Social Computing (CPSCom) and
IEEE Smart Data (SmartData), 2018, pp. 1161–1170, http://dx.doi.org/10.1109/
Cybermatics_2018.2018.00209.

[58] F. Engelmann, H. Kopp, F. Kargl, F. Glaser, C. Weinhardt, Towards an economic
analysis of routing in payment channel networks, in: Proc. of the 1st Workshop
on Scalable and Resilient Infrastructures for Distributed Ledgers, SERIAL ’17,
ACM, New York, NY, USA, 2017, pp. 1–6, http://dx.doi.org/10.1145/3152824.
3152826.
[59] Y. Zhang, D. Yang, G. Xue, CheaPay: An optimal algorithm for fee minimization
in blockchain-based payment channel networks, in: Proc. of the 2019 IEEE
International Conference on Communications, ICC’19, 2019, pp. 1–6, http://dx.
doi.org/10.1109/ICC.2019.8761804.
[60] S. Brânzei, E. Segal-Halevi, A. Zohar, How to charge lightning: The economics
of bitcoin transaction channels, in: Proc. of the 2022 58th Annual Allerton
Conference on Communication, Control, and Computing (Allerton), 2022, pp.
1–8, http://dx.doi.org/10.1109/Allerton49937.2022.9929412.
[61] K. Asgari, A.A. Mohammadian, M. Tefagh, DyFEn: Agent-based fee setting in
payment channel networks, 2022, arXiv:2210.08197, URL https://arxiv.org/abs/
2210.08197.
[62] V. Davis, B. Harrison, Learning a scalable algorithm for improving betweenness
in the lightning network, in: Proc. of the 4th International Conference on
Blockchain Computing and Applications, BCCA’22, 2022, pp. 119–126, http:
//dx.doi.org/10.1109/BCCA55292.2022.9922233.
[63] T.K. Dasaklis, V. Malamas, A review of the lightning network’s evolution:
Unraveling its present state and the emergence of disruptive digital business
models, J. Theor. Appl. Electron. Commer. Res. 18 (3) (2023) 1338–1364,
http://dx.doi.org/10.3390/jtaer18030068.

13
