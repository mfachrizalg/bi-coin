---
source_type: pdf
title: "About blockchain interoperability"
original_file: "thesis/reference/About blockchain interoperability.pdf"
sha256: "60e54adead325ef7dd848f2b505e17721202fdadb1d2c14f125e101c0c9efa7b"
page_count: 6
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: About blockchain interoperability

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Information Processing Letters 161 (2020) 105976

Contents lists available at ScienceDirect

Information Processing Letters
www.elsevier.com/locate/ipl

About blockchain interoperability
Pascal Lafourcade a , Marius Lombard-Platet b,c,∗
a
b
c

Université Clermont-Auvergne, LIMOS CNRS UMR 6158, Aubière, France
Be-Studys, Geneva, Switzerland
Département d’informatique de l’ENS, École normale supérieure, CNRS, PSL Research University, Paris, France

a r t i c l e

i n f o

Article history:
Received 13 August 2019
Received in revised form 31 January 2020
Accepted 23 May 2020
Available online 27 May 2020
Communicated by Luca Viganò
Keywords:
Decentralized ledger
Interoperability
Blockchain

a b s t r a c t
A blockchain is designed to be a self-suﬃcient decentralised ledger: a peer verifying
the validity of past transactions only needs to download the blockchain (the ledger)
and nothing else. However, it might be of interest to make two different blockchains
interoperable, i.e., to allow one to transmit information from one blockchain to another
blockchain. In this paper, we give a formalisation of this problem, and we prove
that blockchain interoperability is impossible according to the classical deﬁnition of a
blockchain. Under a weaker deﬁnition of blockchain, we demonstrate that two blockchains
are interoperable is equivalent to creating a ‘2-in-1’ blockchain containing both ledgers,
thus limiting the theoretical interest of making interoperable blockchains in the ﬁrst
place. We also observe that all practical existing interoperable blockchain frameworks work
indeed by exchanging already created tokens between two blockchains and not by offering
the possibility to transfer tokens from one blockchain to another one, which implies a
modiﬁcation of the balance of total created tokens on both blockchains. It conﬁrms that
having interoperability is only possible by creating a ‘2-in-1’ blockchain containing both
ledgers.
© 2020 Elsevier B.V. All rights reserved.

1. Introduction
Blockchain was ﬁrst introduced in 2008 by Nakamoto in
[1]. In their paper, the anonymous author(s) described the
ﬁrst decentralised ledger: a database in which anyone can
write, and that is not controlled by a single or a conglomerate of identities. Since then, many other blockchains have
been described: Ethereum [2], Ripple [3] and many others.
In May 2019, 248 active blockchains were listed on [4].
While many different blockchains exist, there is no direct way of reaching interoperability, at least without a
trusted third party. Consider for instance a client willing
to convert their Bitcoins to Ether: they would need to con-

* Corresponding author.

E-mail addresses: pascal.lafourcade@limos.fr (P. Lafourcade),
marius.lombard-platet@ens.fr (M. Lombard-Platet).
https://doi.org/10.1016/j.ipl.2020.105976
0020-0190/© 2020 Elsevier B.V. All rights reserved.

sume the amount of Bitcoins they wants to convert and
to generate the equivalent amount of Ether. While Bitcoin
consumption may be reachable (by sending coins to a nonexisting address, such as the address 0), it is impossible to
spontaneously generate Ether (or any other kind of cryptocurrency). For now, the problem is solved with the help
of trusted brokers (also called escrows), even though other
solutions are on their way [5,6].
The issue of interoperability is solved in some cases,
like “atomic exchanges” and hash-locking [7], in which
game theory ensures that a broker only beneﬁts when
following the protocol. However the question of trustless
interoperability in the general context remains open.
Contributions We introduce a theoretical background to
blockchain interoperability, providing a formal deﬁnition
of a blockchain and of interoperability. We then prove

## Page 2

2

P. Lafourcade, M. Lombard-Platet / Information Processing Letters 161 (2020) 105976

that, by deﬁnition, interoperability between two public
blockchains is impossible. However, we contend that there
may be special conditions under which two blockchains
can be interoperable. This leads us to prove the equivalence between two interoperable public blockchains and
a ledger emulating both blockchains on two separate registries.
Related work The concept of sidechains (a sidechain is a
blockchain attached to another blockchain, with exchanges
possible between the two blockchains) has been explored
in [8]. The authors describe a two-way peg in which a
sidechain is fed with an SPV proof, a short proof of the
transaction allowing for lightweight clients. The sidechain
plays the role of a lightweight client, and can thus allow subsequent operations following the SPV proof. However, this pegging system requires a contest period, during
which it is assumed that people will verify that the SPV
proof does not come from a fork. Hence, additional trust
is required in this model. In a paper from 2016 [7], Buterin lists ways of reaching interoperability, and focuses on
trusted inter-chains exchanges, where one sends money on
blockchain A and receives some in blockchain B.
Similarly, the Interledger protocol [6] (ILP) allows one
to automatize money transfers while leveraging the risk
of fraud, thanks to micro-transactions. Yet, ILP is more
about escrow synchronization than interoperability as we
deﬁne it later on. In an ILP transaction from blockchain A
to blockchain B , one must ﬁnd an escrow having enough
money on B (or several escrows having in total enough
money), so the transfer can occur. More generally, we consider that interoperability can for instance allow money to
‘disappear’ from A and to ‘reappear’ on B , without the
need for trusted escrows.
Interoperability has been notably implemented in the
blockchain network Kadena [9], in which transfers from
one blockchain of the network to another is possible. The
money is destroyed on one side and generated on the
other. Kadena also uses smart contracts for securing escrow transfer. However, there is no indication that Kadena
can operate with chains outside of their speciﬁc network.
So in our terminology, we say that Kadena is a “N-in-1
blockchain”, which is to say one blockchain, with several
ledgers.
To the best of our knowledge, no theoretical work on
interoperability has been done to date. Our work, rather
than giving a practical implementation of an interoperable
blockchain, gives a theoretical background to the topic, and
explores the conceptual meaning of having interoperable
blockchains.
Outline In the next section, we formally deﬁne a blockchain
and interoperability. In Section 3, we prove that it is
impossible by design to have interoperability between
blockchains. In Section 4, we show that interoperability is
possible with a weaker deﬁnition of the blockchain. Before
concluding, in Section 5, we prove that interoperability is
equivalent to having a blockchain with two ledgers.

2. Preliminaries
Sets and tuples are noted in calligraphic font: A, algorithms in serif: Mine. When a deterministic algorithm, say
Algorithm, returns some value x from some input i, we use
the notation x ← Algorithm(i ). If Algorithm is randomised,
$

we use the notation x ←
− Algorithm(i ). A list of elements
e 1 , . . . , en (in this order) is represented by [e 1 , . . . , en ]. We
denote concatenation of two lists a and b with ab. The
set of elements belonging to A but not to B is noted A\B
(this set is also called the difference of A and B .)
2.1. Blockchain deﬁnition
Various deﬁnitions of blockchain have already been
given [10,11]. In this work, we rather give a formalization
of blockchains, which we believe is easier to use for proving theoretical results such as the one in this paper.
Intuitively, a blockchain is a chain of transactions. More
precisely, each element of the chain (each block) contains several transactions (or one or none), as well a proof
needed for consensus to take place. For instance in Bitcoin [1] or similar Proof of Work blockchains, the proof
is a nonce (a random number such that the hash of the
block is below a threshold value); in a Proof-of-Stake such
as the Casper version for Ethereum [2] the proof consists of the successive bets on what the next block will
be; in a Proof-of-Elapsed-Time as designed by Intel [12],
the proof is instead a certiﬁcate obtained from the SGX (a
trusted enclave). Note that it exists blockchains not requiring proofs (for instance, one can argue that PBFT consensus
does not require proof), in which case we consider the
proof is empty.
Deﬁnition 1 (Blockchain). Let T be a set of transactions and
P be a set of proofs. A blockchain is a tuple of elements
B = (L, W , Emit, Mine), where:

• A ledger L is a list of transactions with their proofs
deﬁned by: L = [([t 1,1 , t 1,2 , . . . ], p 1 ), . . . , [([tn,1 , tn,2 ,
. . . ], pn )] with t i , j ∈ T and p i ∈ P .
• W is such that W ⊂ T , W is called the pool of waiting transactions.

• Emit is a deterministic algorithm taking one transaction t ∈ T and W as input, and returning an updated
pool Emit(t , W ) = W ∪ t.
• Mine is an algorithm taking L, W and returning a new
ledger L , a new pool W  , where for any W ⊂ T , and
$

for (L , W  ) ←
− Mine(L, W ), we have that L is of the
form L[(transacs, p )], where transacs is a list containing all elements from W \W  , and p ∈ P a proof.
Furthermore, after a call to Emit or Mine, the ledger L
and the waiting pool W of B are updated with the values
returned by said algorithms. In other words, Mine and Emit
are not pure functions [13], as they have side effects on
the blockchain.

## Page 3

P. Lafourcade, M. Lombard-Platet / Information Processing Letters 161 (2020) 105976

At this point, transactions are appended (or not) to the
blockchain after a call to Mine. We hereby give a formal
deﬁnition of what a valid transaction is.
Deﬁnition 2 (Valid transaction). Let B = (L, W , Emit, Mine)
be a blockchain, and let t be a transaction (t ∈ W ), t is a
valid transaction for B (currently in state L) if and only
if there exists a block in the ledger returned by Mine containing t.
As we can see, the validity of a transaction depends on
the state of the ledger; if a transaction is valid at one point,
it may not be valid forever, and reciprocally. For instance,
a transaction from user U to user V is valid only as long
as U has enough funds. Yet, after the emission and the insertion of the transaction in the blockchain, U may issue
other transactions, emptying their wallet. This is the classical issue of double spending.
The same is true for smart contracts: here, they are
seen as a special subset of transactions, and they affect the
state of the ledger. Because Mine has access to the whole
ledger, it can take into account the smart contract’s side
effects.
Note that Mine is a randomized algorithm, and as such,
there is no guarantee that all users will agree on the same
ledger. Because blockchain is a decentralised ledger, state
synchronisation must be ensured. For this, we introduce a
synchronisation algorithm, called Consensus.
Deﬁnition 3 (Decentralised blockchain). A decentralised blockchain is a tuple B  = (L, W , Emit, Mine, Consensus) where:

• B = (L, W , Emit, Mine) is a blockchain,
• Consensus is a deterministic algorithm, taking as input
B , a set S of tuples (Li , Wi ) such that ∀(Li , Wi ) ∈
S , we have that (Li , Wi , Emit, Mine) is a blockchain.
Furthermore, for (L∗ , W ∗ ) ← Consensus(B , S ), then
(L∗ , W ∗ ) ∈ S ∪ (L, W ). In other words, from a list of
potential new blocks, Consensus chooses (or accepts)
one of them, or rejects them all (and returns (L, W )).
• After a call to Consensus, B  ’s ledger and waiting pool
components are replaced with the values returned by
said algorithms.
The idea of Consensus is that when a peer updates
their local version of the blockchain, they ﬁrst receive possibly more than one new version (i.e., new blocks) from
peers. However only one of these new blocks will be accepted, and all the network must agree on this block.
Deﬁnition 4 (Secure blockchain). We say that a decentralised blockchain (L, W , Emit, Mine, Consensus) is secure
if it is computationally hard for a user to craft a new ledger
L and a new transaction pool W  such that for all S such
that (L , W  ) ∈ S , we have both that Consensus(B , S ) =
(L , W  ) and L is not a preﬁx of L .
This deﬁnition makes a blockchain immune against history rewriting (and double spending), as it is computationally hard to rewrite old blocks.

3

2.2. Interoperability deﬁnition
The concept of interoperability is to enable two blockchains to work together. A classic blockchain A accepts
transactions because given the current state of A’s ledger,
the transaction does not violate A’s rules. Similarly, we say
that a blockchain A that is interoperable with blockchain
B accepts transactions because, given the current state of
A and B ’s ledgers, the transaction does not violate A’s
rules. Furthermore, if the rules for said transaction only
imply conditions on A’s ledger, then the transaction does
not require B to be valid, and as such does not make use
of the interoperability. So an interoperable transaction on
A must be dependent on B ’s ledger: if B ’s ledger is equal
to some values, then the transaction is valid; otherwise it
is invalid.
We now give a formalization of this deﬁnition.
Deﬁnition 5 (Blockchain interoperability). Let A = (L A , W A ,
Emit A , Mine A , Consensus A ) and B = (L B , W B , Emit B , Mine B ,
Consensus B ) be two decentralised blockchains. Let  A
(resp.  B ) be the set of all possible values for A’s ledger
L A (resp. L B ). A is interoperable with B if there exists:

• a transaction t ∈ T ,
• a non-empty subset ω A ⊂  A ,
• a non-empty proper subset ω B   B
such that there exists a block containing t that is accepted
by Consensus A if L A × L B ∈ ω A × ω B , and rejected otherwise.
A and B are interoperable if they are both interoperable
with each other.
3. General impossibility of interoperability
Our ﬁrst result is to show that it is impossible to have
interoperability between two blockchains in general.
Theorem 1. Under the Deﬁnitions 3 and 5, blockchain interoperability is impossible.
Proof. Assume that an interoperable transaction t exists.
Then there is a set ω B of possible ledger values of B for
which a block containing t is accepted by Consensus A , if
L B ∈ ω B . Moreover, if L B ∈  B \ω B , then Consensus A will
refuse any block containing t.
However, Consensus A only takes A, S as arguments,
where S is a set of tuples (Li , Wi ) (see Deﬁnition 3). As
a consequence, Consensus A is independent from B , and
especially from L B . Then, if t is accepted by Consensus A
when L B ∈ ω B , then t is also accepted by Consensus A
when L B ∈  B \ω B ; this implies that  B \ω B = ∅, i.e.,
ω B =  B , which is a contradiction with the hypothesis of
Deﬁnition 5, namely that ω B is a proper subset of  B . 
This result is actually quite straightforward if we remember that a blockchain is, by construction, made to be
self-suﬃcient: no blockchain can rely on external data. Especially, no blockchain can rely on another blockchain for

## Page 4

4

P. Lafourcade, M. Lombard-Platet / Information Processing Letters 161 (2020) 105976

asserting the validity of a transaction. Hence, interoperability is a contradiction of one of the intrinsic characteristics
of blockchain.
The interpretation of the result is as follows: without additional assumptions, interoperability between two
blockchains is impossible. Therefore, to achieve interoperability further assumptions need to be made. For instance,
in the two-way pegged blockchain mechanism, a dispute
period is required for each interoperability operation; as
the blockchain cannot know by itself whether the proposed SPV proof is the one of the latest block.
4. Interoperability with a weaker deﬁnition
Even though blockchain is not suited for interoperability stricto sensu, we can generalise our blockchain deﬁnition, in order to make a blockchain interoperable.
Hypothesis 1. We assume that for two blockchains A =
(L A , W A , Emit A , Mine A , Consensus A ) and B , with A both
Mine A and Consensus A have access to both A and B :
Consensus A is of the form Consensus A (A, B , S ), and
Mine A is of the form Mine A (L A , L B , W A , W B ).
We now use the notation Consensus A (A, B , ·) to note
the new consensus algorithm. Hence, the ‘version’ of
Consensus in the previous deﬁnition, is now noted
Consensus A (A, ∅, ·). Similarly, the non-interoperable version of Mine is now noted as Mine A (L A , ∅, W A , ∅).
Deﬁnition 6 (Interoperable transaction). Under the assumption Hypothesis 1, a transaction t on the blockchain
A is said to be interoperable with B if t can be accepted by Consensus A (A, B , ·) but cannot be accepted by
Consensus A (A, ∅, ·).
In this context, we have the following result.
Theorem 2. Under Hypothesis 1, it is possible to build interoperable blockchains.
Proof. Note that we already know that interoperable
blockchains exist, such as Kadena [9] or other blockchains
listed in [5], but we give an example of interoperable
blockchain in our own theoretical framework.
Consider two decentralised blockchains A = (L A , W A ,
Emit A , Mine A , Consensus A ) and B . On the blockchains we
deﬁne accounts. An account ownership is deﬁned by the
knowledge of a private key, and for simplicity the public key is assimilated to the account itself. A transaction
t ∈ T A (resp. T B ) speciﬁes the sender’s public key, the receiver’s public key, an amount and a signature of the previous ﬁelds by the sender’s private key. An account i on
blockchain A (resp. B ) is designed by i A (resp i B ).
We build blockchain B so that it is interoperable with
blockchain A in the following sense: a user can ‘create’
money on B if and only if at least the same amount of
money has been consumed on A, by sending it to a ‘bin’
account.

We ﬁrst note that accounts owned by nobody exist.
In our scheme, in most cryptosystems the public key 0
(consisting of only zeroes) is not linked to any private
key. Thus, while the account 0 A exists and money can be
transferred on this account, it cannot be claimed by anyone.
Let us construct B in order to fulﬁl the previous requirements. First, let us deﬁne the interoperability transactions t ∗ (m B , pk B ), which sends some amount of money
m B from 0 B to the account pk B on B . t ∗ (m B , pk B ) is only
valid if1 there is at least one transaction on L A sending m
to the account 0 A , with m > m B .
Then, let us construct Mine B : a transaction t is valid
for Mine B (L B , L A , W B , W A ) if and only if t is valid for
MineA (L A , ∅, W A , ∅), or if both statements are true:

• t is an interoperability transaction transferring some
amount of money m from 0 B to an account on
B,
• L A contains a transaction sending at least m on the
zero-address 0 A .
Similarly, Consensus B (B , A, ·) is conceived to accept
new ledgers that would have been accepted by
Consensus A (B , ∅, ·), as well as ledgers where the new
blocks are constituted solely of transactions that are accepted by Consensus A (B , ∅, ·) and valid interoperability
transactions (valid in the meaning that at the time of their
incorporation in the ledger, the sender has enough funds
to emit the transaction).
With this construction, we immediately get that B is
interoperable with A: a user can transfer assets from A to
B , which is shown by the fact that some transactions (here
denoted t ∗ ) are only valid on B if the sender has enough
funds on A. 
5. Equivalence of interoperable blockchains with a single
blockchain
Even though interoperable blockchains can be tweaked
into existence, we argue that they are conceptually equivalent to a single blockchain. More precisely, we argue
that they are equivalent to one blockchain, composed
of two ledgers. Such a blockchain can be easily implemented: if the ﬁrst bit of the transaction is 0, then apply
the transaction to the ﬁrst ledger, and if 1 to the second.
We say that two blockchains are equivalent if any valid
transaction on one blockchain corresponds to one valid
transaction on the other blockchain. This deﬁnition implies
that two equivalent blockchains will have very similar evolutions of their ledgers. As Mine is not deterministic, we
cannot ensure that the two ledgers will be identical, but
the deﬁnition we give is enough for practical uses.

1
Note that for a real cryptocurrency more checks would be needed for
any practical use, notably because of the fact that in the current setting,
anyone can withdraw m from 0 B as many times as they want. However,
for the sake of simplicity, we only describe a simple, naive interoperability
operation here, so these checks are omitted.

## Page 5

P. Lafourcade, M. Lombard-Platet / Information Processing Letters 161 (2020) 105976

Deﬁnition 7 (Blockchain equivalence). Let there be two
blockchains A = (L A , W A , Emit A , Mine A ) and B = (L B , W B ,
Emit B , Mine B ) accepting transactions from T A and T B , respectively. A and B are said to be equivalent if there
exists a bijection ϕ : T A → T B such that, if both ledgers
are equivalent, then there is an equivalence of the valid
transactions. In mathematical terms, ϕ (L A ) = L B ⇒ ∀t A ∈
T A , t A is a valid transaction for A ⇔ ϕ (t A ) is a valid transaction for B ).
Note that ϕ (L A ) is the generalization of ϕ to ledgers:
if L A = [t 1,1 , t 1,2 , . . . ] , . . . , [tn,1 , tn,2 , . . . ] , then ϕ (L A ) =
[[ϕ (t 1,1 ), ϕ (t 1,2 ), . . . ], . . . , [ϕ (tn,1 ), ϕ (tn,2 ), . . . ]], in the case
of a ledger without proofs. If the ledger has proofs (see
Deﬁnition 1), ϕ would need to work on a projection of the
ledger: a projection in which every poof is removed. This
subtlety has been removed from the deﬁnition for the sake
of simplicity.
For instance, let us assume that two blockchains are
equivalent, and two smart contracts being the reciprocal
image of each other. This means that whatever transaction triggers one smart contract, the effects on the state
of the blockchain will be equivalent to the effects on the
state of the image blockchain: in both cases, the acceptable elements after the transaction are the same (up to
a bijection). This deﬁnition does not guarantee that the
smart contract will behave identically: for instance, one
could image a smart contract updating a useless write-only
variable, which by deﬁnition does not affect the set of future acceptable transactions as it is write-only. However, it
ensures that the behaviour of the blockchain is strictly the
same in both cases.
Theorem 3. A decentralised blockchain A interoperable with a
blockchain B is equivalent to a decentralised blockchain C containing both A and B ’s ledgers.
Proof. Let A = (L A , W A , Emit A , Mine A , Consensus A ) and
B be two decentralised blockchains, with A being interoperable with B . A being interoperable with B , we have
Mine A of the form Mine A (L A , L B , ·), and Consensus A of
the form Consensus A (A, B , ·).
Let T A (resp. T B ) be the set of transactions for A (resp.
B ). Note that T A contains interoperability transactions. Let
C be the tuple C = (LC , WC , EmitC , MineC , ConsensusC ).
We deﬁne the set of transactions for C , TC = (T A × ∅) ∪
(∅ × T B ). Let c A (resp. c B ) be the canonical projector of TC
on T A (resp. T B ).
For
(L A [(transacs A , p A )], W A ) = Mine A (L A , L B ,
c A (WC )) and (L B [(transacs B , p B )], W B ) = Mine B (L B ,
c B (WC )), we deﬁne: MineC (LC , WC ) = (LC [(transacs A ×
∅∅ × transacs B , p A × p B ), (W A × ∅) ∪ (∅ × W B )]).
Simply put, MineC is a parallelisation of Mine A and
Mine B : a block proposed by MineC is a block comprised
of the transactions accepted by MineA and Mine B .
Similarly, ConsensusC is built as a parallelisation of
Consensus A and Consensus B . If Consensus A (A, B , c A (SC ))
= (L∗A , W A∗ ) and Consensus B (B , c B (S B )) = (L∗B , W B∗ ), then
we deﬁne ConsensusC = (L A × ∅∅ × L B , W A × ∅ ∪ ∅ ×
W B ).

5

By construction, we see that C is a decentralised
blockchain. Furthermore, by construction each transaction
accepted by MineC is either accepted by Mine A or Mine B
and, conversely, each transaction accepted by Mine A or
Mine B is accepted by MineC , hence the equivalence of the
blockchains. 
In practice, Theorem 3 means that creating two interoperable blockchains is equivalent to creating one blockchain,
with a ledger divided into two separate registries: a ‘2-in1’ blockchain. So while creating interoperable blockchains
(with a lax deﬁnition of a blockchain) is possible, we argue that the conceptual interest of doing so is limited.
However, it may be interesting to create an interoperable
blockchain on top of an already existing blockchain. Doing so allows both blockchains to fully operate, without
the older blockchain being affected by anything. Nonetheless the obvious restriction is that only one of the two
blockchains will be interoperable with the other, with all
the limits implied by this fact.
6. Conclusion
In this paper, we explored the possibility of making two
blockchains interoperable. We showed that, under classical
deﬁnitions, it is impossible to make a blockchain interact
with anything other than itself. If we relax the deﬁnition,
we do get the possibility of interoperable blockchains, but
doing so is equivalent to creating a ‘2-in-1’ blockchain, i.e.,
a blockchain with two ledgers.
Declaration of competing interest
The authors declare that they have no known competing ﬁnancial interests or personal relationships that could
have appeared to inﬂuence the work reported in this paper.
References
[1] S. Nakamoto, Bitcoin: a peer-to-peer electronic cash system, http://
www.bitcoin.org/bitcoin.pdf, 2009.
[2] V. Buterin, Ethereum: a next-generation smart contract and decentralized application platform, https://github.com/ethereum/wiki/wiki/
White-Paper, 2014.
[3] D. Schwartz, N. Youngs, A. Britto, The ripple protocol consensus algorithm, https://ripple.com/ﬁles/ripple_consensus_whitepaper.
pdf, 2014.
[4] CryptoID,
Crypto-currency
blockchain
explorers,
https://
chainz.cryptoid.info/, 2019.
[5] S. Johnson, P. Robinson, J. Brainard, Sidechains and interoperability,
arXiv e-prints, arXiv:1903.04077, 2019.
[6] S. Thomas, E. Schwartz, A protocol for interledger payments, https://
interledger.org/interledger.pdf, 2015.
[7] V. Buterin, Chain interoperability, https://www.r3.com/wp-content/
uploads/2017/06/chain_interoperability_r3.pdf, 2016.
[8] A. Back, M. Corallo, L. Dashjr, M. Friedenbach, G. Maxwell, A. Miller,
A. Poelstra, J. Timón, P. Wuille, Enabling blockchain innovations
with pegged sidechains, http://www.opensciencereview.com/papers/
123/enablingblockchain-innovations-with-pegged-sidechains, 2014.
[9] W. Martino, M. Quaintance, S. Popejoy, Chainweb whitepaper, http://
kadena2.novadesign.io/wp-content/uploads/2018/08/chainweb-v15.
pdf, 2018.
[10] J. Garay, A. Kiayias, N. Leonardos, The bitcoin backbone protocol:
analysis and applications, in: Advances in Cryptology - EUROCRYPT,
2015.

## Page 6

6

P. Lafourcade, M. Lombard-Platet / Information Processing Letters 161 (2020) 105976

[11] A.F. Anta, K. Konwar, C. Georgiou, N. Nicolaou, Formalizing and implementing distributed ledger objects, SIGACT News 49 (2) (2018)
58–76.
[12] IBM Hyperledger Consortium, Hyperledger sawtooth, https://
sawtooth.hyperledger.org/docs/core/releases/latest/index.html, 2017.

[13] B. Milewski, Pure functions, laziness, i/o, and monads, https://
www.schoolofhaskell.com/school/starting-with-haskell/basics-ofhaskell/3-pure-functions-laziness-io, 2014.
