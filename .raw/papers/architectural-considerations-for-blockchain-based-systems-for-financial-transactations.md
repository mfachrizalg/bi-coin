---
source_type: pdf
title: "Architectural Considerations for Blockchain Based Systems for Financial Transactations"
original_file: "thesis/reference/Architectural Considerations for Blockchain Based Systems for Financial Transactations.pdf"
sha256: "148d29181b4a37c15653b0340df5fcc0e52400e3aa3fbbf95a1982bc7f746f91"
page_count: 7
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Architectural Considerations for Blockchain Based Systems for Financial Transactations

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Available online at www.sciencedirect.com
Available online at www.sciencedirect.com

ScienceDirect
ScienceDirect

Available online at www.sciencedirect.com
Procedia Computer Science 00 (2018) 000–000
Procedia Computer Science 00 (2018) 000–000

ScienceDirect

www.elsevier.com/locate/procedia
www.elsevier.com/locate/procedia

Procedia Computer Science 168 (2020) 265–271

Complex Adaptive Systems Conference with Theme:
AdaptiveLearning
Systems for
Conference
with Theme:CAS 2019
LeveragingComplex
AI and Machine
Societal Challenges,
Leveraging AI and Machine Learning for Societal Challenges, CAS 2019

Architectural Considerations
Considerations for
for Blockchain
Blockchain Based
Based Systems
Systems for
for Financial
Financial
Architectural
Transactions
Transactions
Raghvinder S. Sangwana*, Mohamad Kassabb, Christopher Capitoloc
Raghvinder S. Sangwana*, Mohamad Kassabb, Christopher Capitoloc
a,b,c
Pennsylvania State University, Malvern, PA, U.S.A
a,b,c

Pennsylvania
State
University,
Malvern, PA, U.S.A
{rsangwan,
muk36,
cxc666}@psu.edu
{rsangwan, muk36, cxc666}@psu.edu

Abstract
Abstract
Systems supporting financial dealings at an enterprise scale must be able to handle large volumes of transactions in a secure manner while
Systems
supporting
financial
dealings availability.
at an enterprise
scale
must be
ablealso
to handle
large
volumes
transactions
in a secure
manner
while
maintaining
high level
of operational
These
systems
must
have the
flexibility
to of
interface
with many
third-party
applications
with
maintaining
of operational
availability. considerations
These systems for
must
also have
the flexibility
to interface
withusing
manythe
third-party
applications
ease. In thishigh
paperlevel
we explore
these architectural
systems
supporting
financial
transactions
blockchain
technology.with
We
ease.
In this
we explore
these architectural
considerations
forassociated
systems supporting
transactions
using the
technology.tactics
We
identify
the paper
strengths
of this technology
in achieving
the qualities
with thesefinancial
architectural
considerations
andblockchain
suggest architectural
identify
of this technology
in achieving
the qualities
associated
with these
architectural
considerations
and suggest
architecturalusing
tactics
that canthe
be strengths
used to overcome
its weaknesses.
A reference
architecture
is presented
along
with a prototype
that implements
this architecture
that
canabe
used to overcome
its weaknesses.
A reference
architecture
is presented along with a prototype that implements this architecture using
Iroha,
commercially
available
financial ledger
for blockchain
systems.
Iroha, a commercially available financial ledger for blockchain systems.

© 2020 The Authors. Published by Elsevier B.V.
© 2018 The Authors. Published by Elsevier B.V.
This
is an
open
accessPublished
article under
the CC BY-NC-ND
license (http://creativecommons.org/licenses/by-nc-nd/4.0/)
©
2018
The
Authors.
by Elsevier
B.V.
This is an open
access
article under
thescientific
CC BY-NC-ND
license
Peer-review
under
responsibility
of the
committee
of the(https://creativecommons.org/licenses/by-nc-nd/4.0/)
Complex Adaptive Systems
Conference with Theme: Leveraging AI and Machine
This is
an open
access
article under
the CC
BY-NC-ND
license
(https://creativecommons.org/licenses/by-nc-nd/4.0/)
Selectionfor
andSocietal
peer-review
under responsibility of the Complex Adaptive Systems Conference with Theme: Engineering Cyber Physical Systems.
Learning
Challenges
Selection and peer-review under responsibility of the Complex Adaptive Systems Conference with Theme: Engineering Cyber Physical Systems.
Keywords: Blockchain, Quality Attribute, Finance, Availability, Modifiability, Performance, Security, Usability.
Keywords: Blockchain, Quality Attribute, Finance, Availability, Modifiability, Performance, Security, Usability.

1. Introduction
1. Introduction
Transactions among individual entities, especially involving money, involve several steps and intermediaries that facilitate their
Transactions among individual entities, especially involving money, involve several steps and intermediaries that facilitate their
interactions while ensuring trust. The result is that these standard transactions can be slow and costly. Blockchain is a distributed
interactions while ensuring trust. The result is that these standard transactions can be slow and costly. Blockchain is a distributed
ledger technology that allows secure transactions in a network of independent entities without the need for a trusted 3rd party [1].
ledger technology that allows secure transactions in a network of independent entities without the need for a trusted 3rd party [1].
This technology works by keeping a digital ledger of all transactions distributed across a network to prevent tampering and allows for
This technology works by keeping a digital ledger of all transactions distributed across a network to prevent tampering and allows for
consensus among parties involved in a transaction to be met. In each blockchain network, a notary node (aka miner node) is present
consensus among parties involved in a transaction to be met. In each blockchain network, a notary node (aka miner node) is present
that performs some necessary actions whenever a transaction request occurs which include:
that performs some necessary actions whenever a transaction request occurs which include:

* Raghvinder S. Sangwan. Tel.: +1-610-725-5354; fax: +1-610-648-3377.
* Raghvinder
S. Sangwan.
Tel.: +1-610-725-5354; fax: +1-610-648-3377.
E-mail address:
rsangwan@psu.edu
E-mail address: rsangwan@psu.edu
1877-0509 © 2018 The Authors. Published by Elsevier B.V.
1877-0509
© 2018
The article
Authors.
Published
Elsevier B.V.
This is an open
access
under
the CCby
BY-NC-ND
license (https://creativecommons.org/licenses/by-nc-nd/4.0/)
This
is an open
access article
under
the CC BY-NC-ND
license (https://creativecommons.org/licenses/by-nc-nd/4.0/)
Selection
and peer-review
under
responsibility
of the Complex
Adaptive Systems Conference with Theme: Engineering Cyber Physical Systems.
Selection and peer-review under responsibility of the Complex Adaptive Systems Conference with Theme: Engineering Cyber Physical Systems.

1877-0509 © 2020 The Authors. Published by Elsevier B.V.
This is an open access article under the CC BY-NC-ND license (http://creativecommons.org/licenses/by-nc-nd/4.0/)
Peer-review under responsibility of the scientific committee of the Complex Adaptive Systems Conference with Theme: Leveraging AI
and Machine Learning for Societal Challenges
10.1016/j.procs.2020.02.252

## Page 2

Sangwan
al./ Procedia
Computer
Science
00 (2018)
000–000
Raghvinder
S. et
Sangwan
et al.
/ Procedia
Computer
Science
168 (2020) 265–271

266

●
●
●
●

Verifying the identity (via public and private keys) of both parties involved in the transaction
Checking business rules to ensure the transaction meets the proper criteria
Ensuring there’s no double spend (i.e. one buyer trying to use the same funds more than once)
Recording a new transaction (fact) in a distributed ledger

One of the most well-known implementations of blockchain is Bitcoin that allows users to buy and sell coins from each other
without the need for any intermediaries [2]. The success of Bitcoin has caught the attention of enterprise businesses who are
interested in the benefits that implementing a blockchain environment can provide. However, there are some significant roadblocks
currently standing in the way of enterprise businesses being able to implement blockchain environments in production.
One of the major concerns observed is the lack of data privacy [3]. Since a typical blockchain environment has no privileged
users, some thought needs to be given to ensure that user data is kept private and only accessible to the parties that need to have
access to it. Scalability concerns [4] are another potential source of trouble. A blockchain test network may be successful, but when
plans are made to implement it in a production setting, the amount of resources required to build the network may be daunting and
result in an option that’s too expensive. Similarly, the amount of energy consumption required [5] may be a detriment to some
potential enterprise blockchain solutions. Slow performance [4] has also been cited as a major concern. While it may be acceptable
for some use cases to have transactions that take a significant time to complete, other examples may not be able to tolerate the
amount of time it takes for a transaction to commit. Bitcoin specifically can only execute a few transactions per second and operates
normally with a backlog of thousands of transactions. Availability and security guarantees of blockchain technology, critical for
many enterprise applications, are also not clear [3, 6].
This paper presents a case study which is based on a scenario from a proof of concept (POC) from Hewlett Packard Enterprise
(HPE) done by one of their financial services customers who attempted to implement a blockchain network to facilitate buying and
selling mutual fund investment units. The study will focus on architectural design for improving availability and security of
blockchain networks. Two methods, namely Quality Attribute Workshop (QAW) and Attribute-Driven Design (ADD) [7], will be
used to systematically explore architectural tactics that can be designed into an enterprise blockchain environment to achieve these
qualities.
2. Background
The theory behind Bitcoin as a peer-to-peer electronic cash system was introduced in a white paper written under the pseudonym
“Satoshi Nakamoto” in 2008 [8]. A decade later, and despite the uncertainty of the identity of its creator, Bitcoin was rapidly
implemented and widely accepted as a prominent online cryptocurrency. This is evidenced by the total USD value of Bitcoin supply
in circulation at the time of writing this paper which hovers around $100 billion dollars (as of May 2019). Many online retailers
accept Bitcoin as a mean of payment with many mechanisms in existence for exchanging it with fiat currency and vice versa. The
blockchain is the essence of the infrastructure underlying Bitcoin and other cryptocurrencies.
In practice, a blockchain is built upon a chronological chain of block-like data structures, hence its name. A block hosts a timestamped set of transactions that are bundled together. Each new block is linked to its preceding block. Combined with cryptographic
hashes, this time-stamped chain of blocks provides an “immutable” record of all transactions in a network, from the genesis block
until the last / most current block. A blockchain network comprises a set of nodes without a pre-existing trust relationship and are
connected through a peer-to peer topology.
Each node in the blockchain network hosts the same copy of a blockchain creating a decentralized structure. But for such a
structure to be useful, there must exist some mechanism by which the nodes can mutually reach a consensus on the next valid block
in the chain to be added. The consensus mechanisms are protocols that make sure all nodes (devices that maintain the blockchain and,
sometimes, process transactions) are synchronized with each other and agree on which transactions are legitimate and are added to
the blockchain. These consensus mechanisms are crucial for the precise function of a blockchain. Some of the schemes adopted for
establishing a distributed consensus include Proof of Work, Proof of Stake, Proof of Capacity, Proof of Human-Work, Proof of
Activity and Proof of Elapsed Time.
A blockchain is an append-only distributed ledger. In other words, the new entries get added at the end of the ledger. In contrast
with a traditional relational database where data can be deleted or altered, there are no administrator’s permissions within a
blockchain that allow for deleting or editing of the recorded data. Furthermore, unlike a centralized relational database, blockchains
are designed for decentralized applications. This immutability feature implies that once a transaction is added onto the blockchain, no
one can alter it. This makes blockchain an ideal solution for assets transactions and identity management, to mention a few examples.
In addition to decentralization, consensus and immutability, a blockchain network has two additional key characteristics: provenance
and finality. Provenance refers to awareness that participants of the network have about where the asset was originated from and its
ownership history, while finality refers to the status of a transaction as complete.

## Page 3

Raghvinder S. Sangwan et al. / Procedia Computer Science 168 (2020) 265–271
Sangwan et al./ Procedia Computer Science 00 (2018) 000–000

267

A blockchain can use smart contracts, which are stored on the blockchain and executed automatically to serve as agreements or a
set of rules that oversee a blockchain transaction. For example, a smart contract may define the contractual conditions of individual’s
travel insurance. The conditions will automatically execute upon notice of a flight delay by more than a certain number of hours [9].
A blockchain can be both permissionless (public) or permissioned (private). In a permissionless blockchain, any node can join the
network. In a permissioned (private) blockchain, pre-verification of the participating parties, which are all known to each other, is
required. The choice between the two types is mainly driven by the use case in a particular application. If a network can
‘commoditize’ trust, where the identity of the facilitating parties does not need to be verified, a permissionless blockchain makes
sense. An example of a permissionless blockchain is Bitcoin or Ethereum. On the other hand, managing the medical healthcare
records is an ideal use case for a permissioned blockchain as it makes sense to have the participating companies vetted. In other
words, when it is vital that the blockchain participants require permission to execute transactions, a permissioned blockchain makes
sense. This also helps all participants in the network to understand where the transactions are originated from. Hyperledger - an open
source blockchain initiative hosted by the Linux Foundation - is an example of a permissioned blockchain.
3. Case Study
This case study will be based on a scenario from a proof of concept (POC) from Hewlett Packard Enterprise (HPE) done by one of
their financial services customers who attempted to implement a blockchain network to facilitate buying and selling mutual fund
investment units. The goal was to allow their users to buy investment units either directly from the bank or to buy and sell them from
each other. They configured the environment and ran this trial with some functional testing. A few users were setup with digital
wallets with some cryptocurrency that they were able to spend on the blockchain network to buy and sell units. When a user wanted
to purchase units from the bank, they would initiate the request, and the notary node would instantaneously transfer the currency
from the user to the bank and the units from the bank to the user. When a user wanted to sell some of their units, they would write a
“smart contract” which represents the terms of their agreement. This contract would be put on the network and be available for
anyone interested in buying the units. When a buyer wanted to purchase the units from the seller as per the contract, they would
initiate the transaction, the notary node would verify that the buyer met the terms of the contract, and it would transfer the currency
from the buyer to the seller and the units from the seller to the buyer. While the functional results of the POC were deemed
successful, there were critical quality attribute requirements that could not be met. In this section, we systematically derive these
requirements associated with the scenario, and explore architectural blueprints that can satisfy them using two methods described in
[7], namely Quality Attribute Workshop (QAW) and Attribute-Driven Design (ADD).
Using QAW and ADD, a blockchain system for a hypothetical financial institution can be designed by creating some business
goals and quality attributes required to fulfill those goals as shown in Table 1.
Table 1: Business goals and their refinement for the mutual funds trading POC system
Business Goal

Goal Refinement

Quality Attribute

Quality Attribute Scenario

BG1: Allow
users to
buy/sell units

Develop a system that can
handle outages and still allow its
users to function normally

Availability

One of the notary nodes crashes, but
the system continues to operate with
no interruption

Develop a system that can
prevent data loss

Availability

The primary data store fails but the
system continues to operate without
any data loss.

Develop a system to have fully
customizable security settings to
allow users access to only the
information they need

Security

While examining all of their related
data, users are not able to access data
that they are not authorized to

Develop a system that prevents
unauthorized access to data

Security

A malicious user attempts to access
unauthorized data; the system detects
this, prevents access and sends alerts
as needed

BG2: The
system must
be private and
secure

## Page 4

Raghvinder S. Sangwan et al. / Procedia Computer Science 168 (2020) 265–271

268

Sangwan et al./ Procedia Computer Science 00 (2018) 000–000

Taking the list of goals from Error! Reference source not found., we can identify the quality attributes and the architectural
tactics we can use when designing the system. This is shown in Error! Reference source not found..
Table 2: Quality Attributes and Tactics for the mutual funds trading POC system
Business Goal

Quality Attribute

Tactics and Categories

BG1

Availability

fault recovery: active redundancy

BG2

Security

resist attacks: encrypt data
resist attacks: identify actors

Related to availability and security, there are three functional tactics to design into the system: active redundancy, encrypt data,
and identify actors. Figure 1.a shows a black box view of the blockchain system together with its outside actors and list of
architectural drivers related to availability and security.
In its current form, the system is incapable of satisfying these architectural drivers. We must examine each of the four identified
architectural drivers and refine this design fragment (using the tactics named above) in such a way as to address the quality attribute
concerns corresponding to that driver. To begin, we will look at the requirement that the notary function of the system be able to
handle an unexpected system failure. Using the “active redundancy” availability tactic, we can add redundancy to the design so that
when one piece fails, there are others that can take over without interruption to the user. This is shown in Figure 1.b.
We added multiple redundant nodes to the system to provide a necessary level of high-availability. A router will route incoming
requests from the user and send them to an available node for processing. Each node needs to be able to run independently of each
other, so each node will be configured to have its own copy of the ledger. It may also be necessary for some data to be stored “offchain” in a separate location outside the ledger. This can be accomplished with a shared database used by all nodes which ensures
that no matter which node is processing the requests from the user, they will all be using the same data in the backend.
The next quality attribute to incorporate into the design is the data integrity (a sub-quality of Security) requirement which also
uses the “active redundancy” availability tactic. In order to ensure that no data is lost as the result of an outage in the off-chain
database, we will want to configure a backup database. This backup database can be populated either directly by the application, or
via a replication engine from the primary database. Rather than changing the application to do two I/Os instead of one every time, a
better option would be to configure a replication engine between the primary and the backup database so that any changes done on
the primary will be replicated to the backup automatically. This ensures that the backup database stays current, rather than relying on
regular tape backup/restore operations which allows the backup database to become stale. The design fragment for this requirement
is shown in Figure 1.c.
We next want to figure out how to handle the privacy of sensitive data (sub quality of Security). This can be done using several
methods, but one of the simplest would be to utilize the “encrypt data” security tactic to configure an encryption engine on each
node. This engine would encrypt sensitive data whenever it gets written to the database or the ledger. To handle the desired
customizable security settings for each user, we want to use the “identify actors” security tactic to allow the system to have a user
control function that validates users using their unique identifiers. Using this control, it ensures that each user can only perform the
functions they are allowed to. These two tactics would be incorporated into the system as shown in Figure 1.d which shows all the
necessary pieces required to fulfill the availability and security tactics necessary for an enterprise blockchain solution.

## Page 5

Sangwan et al./ Procedia Computer Science 00 (2018) 000–000

Raghvinder S. Sangwan et al. / Procedia Computer Science 168 (2020) 265–271

a.

Design fragment showing a list of architectural drivers the
system must satisfy.

b.

269

Design fragment after incorporating “active redundancy”
for availability.
Ledger

System

Records

Redundant nodes
Encryption
engine

Architectural drivers (Encryption engine):
4. Privacy of sensitive data
4.1 Encrypt data before writing ledger records

I/O

User control

Architectural drivers (User control):
3. Configurable security settings
3.1 Validate each user’s identity via username/password

Active
database
Replication engine

Requests

Backup
database
Units

Router

Currency

Units

c.

Design fragment after further incorporating “active
redundancy” for data integrity.

d.

Bank

Design fragment after incorporating “encrypt data” and
“identify actors”.

Figure 1: ADD architectural decomposition applied on the mutual funds trading POC system

4. Results
In order to run some real-life tests, it was decided that Hyperledger Iroha be installed and configured. Hyperledger Iroha is an
open source commercial blockchain product that uses a consensus algorithm to validate transactions requested by each node in the
greater network of nodes. Iroha was installed and configured in a test environment using Docker containers to setup multiple VMs
that all ran Iroha in the same network, such that a transaction done on one node would be reflected in all other nodes, as long as the
proper validation and consensus was met. This architecture was able to simulate the redundant VM nodes and each node’s ledger
from our conceptual design diagram. Iroha also has a built-in client that can run locally on each node. This client was used to
simulate an application performing transactions in the network, although it could not simulate a router to send user requests to one of
the available nodes, or an interface into an external off-chain database. Three nodes were configured in the test network, but a reallife network would typically have many more nodes than that. Specifically, the scenario to be investigated was a simple banking
withdrawal transaction where a user attempts to take a certain amount of some asset and put it into their own personal wallet.
Knowing the common concerns regarding blockchain solutions discussed above, the focus was on observing the security and
availability attributes of the solution and measuring its strengths and weaknesses.

## Page 6

270

Raghvinder S. Sangwan et al. / Procedia Computer Science 168 (2020) 265–271
Sangwan et al./ Procedia Computer Science 00 (2018) 000–000

With regards to availability concerns, the Iroha solution is overall very resilient by design. Iroha, at its core, implements active
redundancy very well. Each node in the network is independent and can process transactions without the need to access any sort of
shared resource in the network. If one node has an outage, it does not cause the withdrawal to fail, since a different node can be used
to process the transaction. The sequence diagram in Figure 2 shows how this interaction works.

Figure 2: Sequence Diagram for the Availability Scenario
With regards to security concerns, Iroha is able to maintain integrity of all transactions that are attempted. A withdrawal must be
valid on the given node where it is run, and the consensus ensures that tampering with a single node does not allow fraudulent
withdrawals to be validated in the blockchain history. In addition, the block itself acts as a sort of audit trail that shows a complete
history of every transaction in the network’s history. In order to see the withdrawal in the transaction history, the blocks themselves
can be inspected to see the chain of events that have occurred in the network, and details about the withdrawal can be seen.
The historical nature of the blocks can also be one aspect of Iroha that’s unacceptable for enterprise use. In Iroha, all details about
each transaction can be viewed in plain text on the block files on the node itself. For enterprises, customer privacy and privilege
must be taken into account when planning an architecture. For a withdrawal, a customer would not want their name and amount
recorded into a historical block that will be visible to anyone who can access the block files. With the GDPR law (General Data
Protection Regulation) that is currently being enforced in Europe, this concern is more than just optional. By law, a user has the right
to have any of their personal details deleted from systems and databases owned by any legitimate company. If a user’s personal
details are recorded into a block during a withdrawal, there’s no recourse to remove this data later, as per the design of the blockchain
architecture. One method to address this would be to store personal details in a different location than the blockchain (off-chain), and
instead only store a reference to that data in the chain. This way, the data in the block itself has nothing to personally identify the
user involved in the withdrawal, but instead it will only contain a reference to the location where the user’s information is stored, as
shown in Figure 3. If this solution is implemented, a user’s data could later be removed from the off-chain location without the need
to modify the data already in the chain, and it would still be GDPR compliant. One major problem with this workaround is that it
introduces a new component to the solution in the form of a conventional database used to store the customer’s personal information.
This database would be subject to all the flaws of standard data storage that Iroha is designed to prevent. The Iroha solution already
has some very robust availability and security tactics implicit to its architecture, but some of these tactics would need to be explicitly
designed and implemented for this off-chain storage. In order to make this database highly available, redundant copies of the
database should be maintained with replication keeping both in sync. The redundant copy of the database should also be in an
active/active architecture so that an outage in the main database would not result in any serious availability outage in the Iroha
implementation. Also, the database and all its copies introduce new entry points where data is stored and can possibly be accessed or
manipulated by unauthorized means. All the security and traceability of the Iroha solution would need to be implemented in this offchain storage in order to guarantee similar security.

## Page 7

Sangwan et al./ Procedia Computer Science 00 (2018) 000–000

Raghvinder S. Sangwan et al. / Procedia Computer Science 168 (2020) 265–271

271

Figure 3: Sequence Diagram for the Security Scenario.

6.

Conclusions

Systems supporting financial dealings at an enterprise scale must be able to handle large volumes of transactions in a secure
manner while maintaining high level of operational availability. In this paper, we discussed the limitations of blockchain technology
as a mechanism for conducting transactions among a network of participants who do not need to trust each other. Two architectural
considerations, availability and security, were explored in detail to investigate how architectural tactics can be used to designing
blockchain-based systems to overcome some of these limitations. Due to their decentralized nature, blockchain systems also face
performance and scalability challenges. Being a trustless peer-to-peer network, each transaction must be validated at each hop in the
network thus limiting how quickly a transaction can be processed and how many transactions can be processed in a given unit of time
[4]. In our future work, we intend to investigate performance and scalability concerns.
A reference architecture was presented along with a prototype that implements this architecture using Iroha, a commercially
available financial ledger for blockchain systems. While the architecture was used for a POC in the financial domain, it can be used
for applications in other domains that have availability and security as architectural concerns.
References
[1] Tiana Laurence. Blockchain for Dummies. John Wiley & Sons Inc., 2011.
[2] Yonatan Sompolinsky and Aviv Zohar. “Bitcoin's Underlying Incentives: The unseen economic forces that govern the Bitcoin protocol.” ACM Queue Vol. 15 No.
5, September - October, 2017.
[3] Qinghua Lu and Xiwei Xu. “Adaptable Blockchain-Based Systems.” Computing Edge January 2019: 17 - 23.
[4] Aleksandar Kuzmanovic. “Net Neutrality: Unexpected Solution to Blockchain Scaling”. ACM Queue Vol. 17 No. 1, May - June, 2019.
[5] Jim Waldo. “A Hitchhiker’s Guide to the Blockchain Universe.” ACM Queue Vol. 16 No. 6, November - December, 2018.
[6] Ingo Weber, Vincent Gramoli, Alex Ponomarev, Mark Staples, Ralph Holz, An Binh Tran and Paul Rimba. “On Availability for Blockchain-Based Systems.” 2017
IEEE 36th Symposium on Reliable Distributed Systems (SRDS), p 64 - 73, 2017.
[7] Len Bass, Paul Clements and Rick Kazman. Software Architecture in Practice Third Edition. Addison-Wesley, 2013.
[8] S. Nakamoto, “Bitcoin: A peer-to-peer electronic cash system,” 2008.
[9] M. Gupta, “Blockchain for dummies,” IBM Limited Edition, US, 2017.
