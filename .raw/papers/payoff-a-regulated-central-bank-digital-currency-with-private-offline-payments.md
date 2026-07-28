---
source_type: pdf
title: "PayOff: A Regulated Central Bank Digital Currency with Private Offline Payments"
original_file: "thesis/reference/PayOff_ Regulated Central Bank Digital Currency with Private Offline Payments.pdf"
sha256: "7548bbc423168fb3f5d5fa2a78685ea5fe86d0639abd99ad9f28b79ad908b87b"
page_count: 21
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: PayOff: A Regulated Central Bank Digital Currency with Private Offline Payments

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

PayOff: A Regulated Central Bank Digital Currency
with Private Offline Payments
Carolin Beer∗ , Sheila Zingg∗ , Kari Kostiainen∗ , Karl Wüst† , Vedran Capkun‡ , Srdjan Capkun∗

arXiv:2408.06956v1 [cs.CR] 13 Aug 2024

∗ ETH Zurich

{carolin.beer, sheila.zingg, kari.kostiainen, srdjan.capkun}@inf.ethz.ch
† Mysten Labs
karl@mystenlabs.com
‡ HEC Paris
capkun@hec.fr
Abstract—The European Central Bank is preparing for the
potential issuance of a central bank digital currency (CBDC),
called the digital euro. A recent regulatory proposal by the
European Commission defines several requirements for the digital
euro, such as support for both online and offline payments.
Offline payments are expected to enable cash-like privacy, local
payment settlement, and the enforcement of holding limits. While
other central banks have expressed similar desired functionality,
achieving such offline payments poses a novel technical challenge.
We observe that none of the existing research solutions, including
offline E-cash schemes, are fully compliant. Proposed solutions
based on secure elements offer no guarantees in case of compromise and can therefore lead to significant payment fraud.
The main contribution of this paper is PayOff, a novel CBDC
design motivated by the digital euro regulation, which focuses on
offline payments. We analyze the security implications of local
payment settlement and identify new security objectives. PayOff
protects user privacy, supports complex regulations such as
holding limits, and implements safeguards to increase robustness
against secure element failure. Our analysis shows that PayOff
provides strong privacy and identifies residual leakages that may
arise in real-world deployments. Our evaluation shows that offline
payments can be fast and that the central bank can handle high
payment loads with moderate computing resources. However, the
main limitation of PayOff is that offline payment messages and
storage requirements grow in the number of payments that the
sender makes or receives without going online in between.

I. I NTRODUCTION
The idea of a central bank digital currency (CBDC) has
gained increasing attention. Over 100 central banks have
ongoing investigations and pilot projects on the topic [1].
Notably, the European Central Bank (ECB) has communicated
its plans to introduce a digital euro [24] as retail CBDC, i.e.,
accessible to the general public, and the European Commission
has recently released a proposal [22] on its regulation.
We analyzed the regulation proposal, which considers two
types of payments. The first is online payments that are settled
online by the central bank. Online payments offer similar
privacy to bank accounts: Personally identifiable information
(PII) for payments is visible to the Payment Service Provider
(PSP) of the user, but hidden from the central bank. In such a
setting, known anonymous payment techniques could address
main privacy concerns, but the design of a highly scalable
online CBDC system still requires careful consideration.
The second type is offline payments, where both the sender
and recipient can be offline. The regulation mentions security

requirements for offline payments, such as cash-like privacy
(even towards PSPs), and regulation goals, such as enforcement
of holding limits. Furthermore, offline payments should be
settled locally on end-user devices, which we call offline
settlement. As the regulation places no restriction on the use of
funds received offline, offline payments should be transferable.
We note that some users might prefer offline payments, even
if they have network connectivity, due to better privacy [13].
In this paper, we focus on regulation-compliant offline
retail CBDC payments. Realizing secure offline payments
has been noted as a core challenge by recent central bank
documents [36], [34]. We also consider this an open problem
for the following reasons.
Firstly, simple solutions based on secure elements are
insecure. The regulation proposal hints at an approach where
offline payments fully rely on secure elements. While secure
elements can be a useful building block for a CBDC system,
assuming that no secure element gets compromised would be
naive. Without further protections, even a single compromised
device could print counterfeit money without restrictions.
Secondly, we observe that the offline settlement and transferability requirements, have significant security implications.
Offline payment recipients in such a system cannot distinguish legitimate payments from counterfeit and the central
bank takes over the risk of fraud. This will likely lead to
attacks, such as, an adversary breaking one secure element and
sending counterfeit money to a colluding device. We argue that
novel security guarantees are needed, such as de-anonymizing
counterfeit recipients.
Thirdly, we note that none of the existing research solutions
were designed for a similar offline setting, or fulfill all above
requirements. UTXO-based anonymous payment systems like
Zcash [39], and its accountable variants [27], only support
online payments. Similarly, account-based CBDC systems
either focus on online settings (Platypus [44] and Peredi [31]),
or rely on secure elements [21]. Coin-based E-cash solutions
have been designed for offline use [9], [10], [14], but these
solutions do not provide cash-like privacy, are not designed
for offline settlement, and do not implement regulation goals
like holding limits. Table I provides a detailed comparison.
Our main contribution is PayOff, a novel CBDC solution
specifically designed for offline payments and motivated by
the digital euro regulation [22]. PayOff is the first solution
that (1) focuses on offline payments with offline settlement, (2)

## Page 2

Ro
Co Cou
bu
n
un
st
ter terf
to
fei eit
Pa
e
sec
R
Co t c
co
ses
He ym
i
Li
Fu
sk
ure
l
r
u
l
e
e
g
s
l
u
nd
Of
nte
a
d m nt
i
h
R
c
d
o
t
a
t
ele
ers
flin
Tr
Ho ece Se
co
rri
rfe ors
r ep
cli
Un n un
o
me
a
n
n
e
n
l
i
i
e
e
i
i
n
d
d
v
res
rf
td
fid
de
de
Sc
ey
n
l
l
s
i
i
i
i
i
p
nt
f
n
n
n
t
n
n
or
nti
ay
era
ala
ete nti
en
gl
gl
gl
ka
ka
pri ent
fai
me supp
fi
fi
tat
f
b
b
b
b
c
i
i
i
i
v
r
a
ab
ab
mi
mi
mi
t
lur
ilit
ilit
i
i
a
ac
i
l
l
l
ion
nts
ort
u
o
i
i
i
le
le
ty
ty
ty
ts
ts
ts
d
n
e
y
y
y
Of
flin

Cash

Coin

-

High

Online E-cash [18]
Tourbillon [12]
Offline E-cash [19]
Transferable E-cash [16]
Zerocash [39]
Regulated Zcash [27]*
Auditable Tokens [7]
UTT [42]
Platypus [44]
PEReDi [31]
OPS w/o TEE [21]
OPS w/ TEE [21]

Coin
Coin
Coin
Coin
UTXO
UTXO
UTXO
UTXO
Account
Account
Account
Account

High
High
High
Medium
Medium
Medium
High
High
High
High
High
High

Our solution: PayOff

Account

Medium
= Yes;

-

-

-

-

-

-

-

-

-

-

Recipient

-

Recipient
Recipient
-

-

Central Bank
= Partial;

= No; - = Not applicable

* Coin tracing can make transactions involving specific coins linkable or non-confidential.

TABLE I: Comparison of payment and CBDC systems across dimensions derived from the digital euro regulation [22].

provides strong privacy protection for users, (3) implements an
extensive set of regulation guarantees, and (4) is robust against
secure element failure. We take account-based CBDCs [44],
[31] as the starting point of our solution because they have
been shown to be a good fit for deployments that require
expressive regulation and strong privacy.
PayOff achieves strong privacy protections: Payment
amounts and user identities are confidential, payments are
unlinkable across offline sessions and are cryptographically
unlinkable within sessions. Residual leakage (e.g., from ledger
access patterns) is limited and comparable to other anonymous
payment systems.
Our solution also provides extensive support for regulation.
Specifically, we support holding limits, which are present in
different regulation proposals [35], [22]. Furthermore, PayOff
implements fraud and double spend detection for offline payments. Although mentioned in recent ECB documents [26],
[25], this mechanism has been overlooked in regulations due
to the planned reliance of offline systems on secure elements.
Finally, we implement new protection mechanisms like the deanonymization of counterfeit recipients.
We evaluate the performance of PayOff through a prototype implementation. The client-side computation for offline
payments is fast (e.g., 0.3s). With modest computing resources
(e.g., 35 cores), the central bank can process up to 5000
payments per second. The communication requirements grow
the longer users stay offline. For offline sessions of a few days,
message sizes for offline payments are in the order of a few
kilobytes, which still allows fast payments assuming NFC as
communication channel. Very long offline periods, such as one
month, need a higher throughput than NFC can facilitate but
could be achieved by leveraging other channels like Bluetooth.

A. Privacy-Preserving Digital Payment Systems
Coin-based systems. Chaum [18] introduced E-cash, a digital
currency, where funds are represented as coins. The classic
E-cash design assumes that the payment recipient is online.
Follow-up work [19], [14], [15], has adapted E-cash for offline
payments. As preventing double spending in an offline setting
is considered impossible, the main security goal of such works
is to detect double spends and de-anonymize the dishonest
party. Offline E-cash is not transferable meaning that the
recipient needs to go online and deposit the coins before
they can use them. Transferable E-cash [37], [16], [9], [10]
overcomes this and allows payment recipients to use received
coins without needing to go online.
Coin-based systems have three main drawbacks. 1) While
the payment sender can remain anonymous, the recipient
cannot. The bank learns the identity of the recipient and the
payment value when a coin is deposited. 2) Complex regulations, such as holding limits, cannot be enforced easily. 3)
The size of a coin increases in the number of offline payments,
potentially making payments slow during long offline periods.
UTXO-based systems. In UTXO-based systems, funds are
represented as Unspent Transaction Outputs (UTXOs) and
published in a distributed ledger. Zerocash [39] introduced
payments with strong privacy by storing cryptographic commitments to outputs instead of plaintext UTXOs on the ledger.
The validators, who ensure that each transaction is correctly
executed, neither learn the identities of the payment sender and
recipient nor the payment value. In addition, validators cannot
correlate payments making them unlinkable. Zerocash does not
consider the enforcement of regulations. Follow-up work, such
as [27], [7], [42] provide UTXO-based payment systems that
can enforce some policies, such as, sending limits, auditability,
and de-anonymization for large payment volumes.
UTXO-based systems have two main drawbacks: First,
since ledger access is needed, to the best of our knowledge,

II. BACKGROUND & RELATED WORK
In this section, we provide background on digital currencies
and recent CBDC regulations.
2

## Page 3

ledger

such as a smart card or a Trusted Execution Environment
(TEE) [40]. Offline payments are restricted to payments in
physical proximity and are settled locally on the offline wallets.

central bank
online settlement

Privacy and security requirements. For online payments, the
regulation aims for privacy that is similar to existing bank
accounts. While PSPs can see the payment details, the central
bank should not learn any Personal Identifiable Information
(PII). In contrast, offline payments should offer privacy that is
comparable to cash. A notable regulatory requirement is that
users can only hold a limited amount of Digital Euros to avoid
destabilizing the financial system.

online payment
Alice’s PSP

online wallet

online wallet

Bob’s PSP

offline wallet
(secure element)

Bob

offline payment
Alice

offline wallet
(secure element)

NFC

Fig. 1: Overview of the digital euro regulation [22].

III. P ROBLEM S TATEMENT
Our goal is to design a solution that supports the requirements for offline payments in regulated CBDCs.

no existing UTXO-based system supports offline payments.
Second, complex regulation, such as holding limits, cannot be
easily enforced.

A. Offline Payment Functional Requirements
The digital euro regulation states that offline payments
should be “settled locally” with secure elements, which we
interpret as the central bank carrying the risk of potential
payment fraud. From this, we identify the following functional
requirements (F) for offline payments:

Account-based systems. Account-based systems like Platypus [44] and Peredi [31] represent funds as a balance that
is updated with each transaction and balance updates are
proven correct in zero-knowledge. This approach provides
strong privacy and unlinkability: Neither the identities of the
payment sender and recipient nor the transaction values are
leaked to the bank. Expressive regulation, such as holding
limits, is easier to implement since all user funds are captured
by their account balance. OPS [21] is an account-based offline
payment system whose security relies on secure elements.

F1: Offline settlement. If a user correctly follows the protocol
and accepts a payment offline, then they are guaranteed to keep
the received money even if it was counterfeit.
F2: Transferability. Users who receive payments offline can
use the received funds to make further offline payments
without connecting to the central bank first.

B. CBDC Motivation and Regulation
More than 100 countries have plans for the introduction of
a CBDC [1]. Some countries, such as China, are already running pilot projects [38]. The United States and England have
published working papers [35] and discussion papers [41].
Also, the European Central Bank has published its plans to
introduce a digital euro [24].
In many places, cash has already largely been replaced
by digital payments, such as credit card and mobile payments. However, digital payments do not reach the unbanked
population who will face issues if cash becomes obsolete.
Furthermore, the cost and risk of relying on large companies
for payment services is high. Past incidents of Mastercard and
Visa outages have shown the fragility of the current digital
payment landscape [8]. The deployment of retail CBDC is
expected to address these concerns by allowing users to make
digital payments with central bank money.
A recent regulation proposal by the European Commission [22] defines requirements for the digital euro. We summarize the main points of this regulation, depicted in Fig. 1.

B. Reliance on Secure Elements
A natural solution to offline settlement and transferability
is to deploy secure elements to prevent counterfeit creation
and other types of fraud, enforce regulations, and preserve user
privacy. However, such a solution relies on the assumption that
secure elements cannot be compromised, as a compromised
device would allow an adversary to create an infinite amount of
counterfeit money undetectedly. Many attacks against secure
elements [32] and TEEs [43], [17] have been demonstrated.
Thus, it is naive to assume that secure hardware for CBDC
would not be compromised given the financial benefits. Furthermore, rollback attacks [33] are often not covered by TEE
security guarantees but sufficient to create counterfeits. Lastly,
restricting payments to proximity connections is unlikely to
limit fraud, as payments could be relayed over long distances.
C. Research Question
Our goal is to design a regulation-compliant offline payment solution that has built-in protections to limit fraud caused
by compromised secure elements. The prior research that
comes closest to our scenario is transferable E-cash [9], [16]
where the bank can detect counterfeit money and identify
counterfeit money creators when a coin is deposited. However,
transferable E-cash still has major limitations. Firstly, E-cash
only protects payment sender anonymity, which provides less
privacy than cash. Secondly, E-cash does not enforce regulatory rules like holding limits. Lastly, transferable E-cash relies
on online settlement, whereas the regulation assumes offline
settlement which shifts the risk from payment recipients to
the central bank. To the best of our knowledge, none of the
known solutions fulfills our goals (see Table I).

Entities. Users can hold digital euros and send and receive
payments. The central bank issues money and enforces regulations. The users generally do not interact with the central bank
directly, but instead interact with Payment Service Providers
(PSPs), such as commercial banks.
Payment and wallet types. The regulation distinguishes between online and offline payments. For each payment type,
the user opens a wallet with a PSP. Online payments require
approval by the sender and recipient PSPs and are settled
by the central bank who records the payment on a ledger.
For offline payments, wallets are hosted on a secure element
3

## Page 4

8. reconnect

IV. S ECURITY G OALS
In this section, we define more detailed security goals for
regulated offline CBDC payments. We consider security goals
mentioned in the Digital Euro regulation and identify new
goals that we consider necessary to limit payment fraud and
hold malicious parties accountable.

9. reconnect

7. send 300
Fred

Eve
6. send 300

5. reconnect
1. send 1000

A. Privacy Goals
The regulation proposal states that offline payments should
provide cash-like privacy guarantees. We consider the following privacy goals (P) relevant for an offline CBDC:

4. send 500

Carol

Alice
balance = 1200

David

2. send 1000
3. reconnect

P1: Payment and balance confidentiality. Only the user
should know how much money they hold. For payments, the
value should be only known to the sender and the recipient,
and the identities of sender and recipient should remain hidden
from third parties.
Users may send or receive more than one payment while
offline. Once users go back online, they reconnect to the central
bank by uploading the payment details for the corresponding
payments.

Bob

Fig. 2: Example payment scenario where Alice double spends.
relying on the availability of other parties. Users should not be
able to hold more funds than their predefined holding limit.
We now explain what constitutes a counterfeit in a payment
system that combines offline settlement and double-spend
detection, how counterfeits propagate, and which assets need
to be traced to detect malicious actions effectively.
Figure 2 illustrates an example scenario where Alice has
compromised her secure element, and has an initial balance
of 1200 in her offline wallet. Alice double spends by creating
a digital copy of her funds: she first sends 1000 to Carol,
and then sends the same 1000 to Bob. Bob reconnects to
the central bank soon after. In such cases, we consider Bob’s
funds legitimate because the central bank has not yet seen the
conflicting second payment to Carol when he reconnects. The
payment that Carol received is considered counterfeit, although
she was paid first. Carol can keep the received money, but her
assets must be traced.
Next, in our example, Carol sends 500 to David without
reconnecting, and after that, David reconnects. David’s funds
are considered counterfeit because he received a payment from
Carol. This example shows how counterfeit propagates. Finally, Alice creates a third double spend payment to Eve, who
pays Fred afterwards. Eve then reconnects and de-anonymizes
herself to the central bank. After this point, tracing is no longer
needed and Eve’s assets are no longer considered counterfeit
(to prevent endless propagation). When Fred reconnects, his
money is considered legitimate.
In all of these cases, recipients are entitled to keep the
funds they received even if they were counterfeit due to the
offline settlement requirement. This is different from E-cash
and means that double spends increase the total money supply.
Similarly to previous E-cash literature [9], [16], our goal is
to identify the counterfeit creator when recipients reconnect.
For example, in the above example, Alice should be identified
once Bob and David reconnect. We define this as follows:

P2a: Payment unlinkability (towards the central bank).
When a user reconnects to the central bank, the central bank
should not be able to link offline payments if the user followed
the protocol and did not receive any double spends.
P2b: Session unlinkability (towards the central bank).
A weaker but still useful privacy notion is the unlinkability
of offline payments across offline sessions. This means that
payments that a user made before and after reconnecting
should be unlinkable if the user followed the protocol and
did not receive any double spends.
P3: Session unlinkability (towards other users). Other
users should not be able to link offline payments that a user
made before reconnecting, to those that the user made after
reconnecting.
We consider the privacy goal P2b new to the literature of
anonymous offline payment systems.
B. Security Goals
The regulation does not explicitly mention any payment security goals (S), but we consider the following two necessary:
S1: Payment security. Only the user that owns the funds
is able to use them for payments. We note that in a CBDC
system the central bank issues new money and can therefore
make payments without limitations.
S2: Payment integrity. Users who have not compromised
their secure elements should not be able to use more funds
than they own. No user should receive more funds than what
has been sent to them.
C. Accountability Goals
We define four accountability goals (A). The regulation
proposal mentions holding limits as one goal. We observe
that the definition of “holding” money is subtle, since users
can receive offline payments but delay the associated message
delivery to their offline wallet, and therefore delay the received
money from being added to the user balance. This is possible
without compromising the secure element.

A2: Counterfeit creator identification. If a user (who has
compromised one or more secure elements) creates counterfeit money, the central bank should (i) detect the fraudulent
payment event and (ii) identify the payment creator when at
least two recipients reconnect.
Because offline settlement removes the risk that payment
recipients lose money due to fraud, we consider collusion

A1: Holding limit integrity. We consider a user to hold funds
when the user can send the funds to honest recipients without
4

## Page 5

between users a relevant threat to the CBDC system. For
instance, Alice, Bob, Carol, and Eve could collude to increase
their combined assets. We thus argue that the recipients of
counterfeit money should also be de-anonymized.

Reconnect

A3: Counterfeit recipient de-anonymization. If counterfeit
money was created, at least one recipient must de-anonymize
themselves, reveal the sequence of payments through which
they received the money, and disclose the received amount.
Users with compromised secure elements could omit certain payments when they reconnect, for instance, uploading all
the legitimate payments but leaving out the fraudulent ones.
It is not possible to detect such misbehavior in all cases. For
example, if a malicious user omits a payment in which they
receive counterfeit funds that they never use, we see no way to
detect such an omission. However, this is not beneficial for the
user, and our goal is to detect practically relevant omissions.

7. Query
ledger

Central bank

Ledger

5. Query ledger

6. Request signature for
states and dependencies
one by one

1. Request payment
request commitment, payment value
Alice
sender

Offline payment

2. Create payment
commitments, SN, DS tag , ZKPs,
dependencies

Bob
recipient
3+4. Accept and
complete payment

Fig. 3: PayOff offline payment protocol. Elements marked in
blue are only needed for multiple payments.

A4: Incomplete synchronization detection. Upon synchronization, if a malicious user omits payments and continues to
use their offline wallet with honest users, the central bank will
detect this and can de-anonymize the malicious user.
To the best of our knowledge, accountability goals similar
to A3 and A4 have not been previously considered.

it has not previously seen a state with the same serial number.
If all checks pass, the central bank returns a signature over the
new state commitments to the users.
The account model has certain advantages. Firstly, this
approach can provide strong privacy (P1-P3). Secondly, a
system where all funds are captured by one account balance
enables a simple and efficient implementation of regulatory
rules such as holding limits (A1). Thirdly, since user states
evolve as a sequence of state transitions, it is possible to reason
about all payments that of a user between two points in time.
This facilitates the detection of omitted payments (A4).

V. S OLUTION OVERVIEW
In this section, we describe our solution gradually, starting
from a simplified design that allows only a single offline
payment, and then extending it to a complete solution.
A. Assumptions
Users trust the central bank to protect the integrity of the
money supply, but do not trust it to protect their privacy.
We assume that users can communicate with the central bank
anonymously, which is a common assumption in anonymous
payment systems [44], [31], [39]. In practice, anonymous
communication could be facilitated by PSPs, mix networks,
or similar means. Users can drop, delay, or modify messages.
However, only users who compromise their secure element
can deviate arbitrarily from the protocol. We assume that
all cryptographic primitives are secure with respect to their
security definitions, and the chosen Zero Knowledge Proof
(ZKP) system provides weak simulation-extractability, and in
case of a trusted setup, subversion-resistance1 .

C. Starting Point: Single Payment
We start by presenting a protocol that allows users to send
or receive only one payment offline, as illustrated in Fig. 3
without the blue elements.
Offline payment. We assume that both Alice and Bob have
recently reconnected and are now offline. Alice and Bob hold
the openings to their state commitments, which include their
secret key, account balance, holding limit, and a counter.
The counter represents the number of payments that the user
already sent, and is used to detect double spends. In addition,
each state commitment includes the previous state commitment
of the user, and a counterparty commitment provided by the
counterparty of the corresponding payment. A payment from
Alice to Bob proceeds as follows:

B. Representation of Funds
We follow the account model [44], [31], [28] that was
recently proposed for anonymous online payment systems. In
this model, the account state is represented by the openings
(e.g., the user’s balance) of a state commitment. Each state is
accompanied by a pseudorandom serial number that is used to
detect the reuse of old states, i.e., double-spending. A payment
involves a state transition by the sender and by the recipient.
For this, both users update their balance, which results in a
new state commitment, and prove in zero-knowledge that their
transition is correct, given a commitment to the payment value
and some previous state with a valid signature. In accountbased online systems [44], [31], [28], both state updates are
submitted directly to the central bank. The central bank checks
both state updates by verifying the ZKPs and by ensuring that

1) Request payment: Bob sends a payment request to Alice.
This request includes a request commitment to his state
commitment that hides his state commitment from Alice,
as well as a payment value.
2) Create payment: Alice reduces her account balance by
the payment value, adds Bob’s request commitment as
the counterparty commitment of her new account state,
and increases her payment counter by one. She computes
her new state commitment and generates a serial number
and double-spending tag. The serial number uniquely
identifies Alice’s payment with the new counter value.
The double-spending tag is computed over Alice’s new
state commitment and counter value. The tag ensures that
Alice can be identified if she double spends (makes two
payments with the same serial number, but different state

1 This means that the zero knowledge property of the ZKP system holds
even if the central bank is corrupted at setup time

5

## Page 6

Carol’s state

Multiple payments

commitments). To conclude her state transition, Alice
generates a state transition ZKP to prove that the values
were updated correctly, as described above, and that her
previous state was signed.
Next, Alice generates values that allow Bob to prove
to the central bank that he received a payment from
Alice, and thus that he is allowed to increase his balance.
These are (i) a payment commitment to the payment
value, to Bob’s request commitment, and to her new state
commitment, and (ii) a payment ZKP that shows that her
new state resulted from her payment to Bob. Finally, Alice
sends Bob her new state commitment, serial number,
double spending tag, and state transition ZKP, alongside
the openings of the payment commitment and its ZKP.
3) Accept payment: Bob verifies the received ZKPs, checks
whether the payment commitment matches the expected
values, and accepts the payment.
4) Complete payment: Bob updates his state by increasing
his balance and setting the counterparty commitment to
Alice’s new state commitment. Bob computes his new
state commitment. For his ZKP, Bob needs to show (i)
that all values were computed correctly and are consistent
with Alice’s payment, (ii) that his previous state is signed,
and (iii) that Alice’s new state is signed. However, since
Alice’s new state is not yet signed, Bob cannot create his
ZKP yet.

Single payment
Bob
state = 7
balance = 250
signed

Alice
state = 1
balance = 700
signed

receive 200

Bob
state = 8
balance = 450

receive 100 Bob
state = 9
balance = 550

send 200

Alice
state = 2
balance = 500

send 100

send 50

Bob
state = 10
balance = 500

Alice
state = 3
balance = 400

Fig. 4: Evolution of user states across payments. Solid arrows
indicate state transitions, dashed arrows indicate dependencies.
payment completion state therefore also has a dependency on
Alice’s payment creation state, as shown in Fig. 4.
D. Extension for Multiple Offline Payments
We now extend this protocol to support multiple offline
payments. In our previous protocol, Alice was able to create
the ZKP for her payment state because her last state was
signed. The same approach is not guaranteed to work, if users
can engage in multiple payments offline, since Alice’s state
before her payment may not yet have a signature.
We address this problem by moving part of the state
transition ZKP to a dependency ZKP: The state transition
ZKP now shows that the new state is computed correctly
with respect to its dependencies (i.e., the previous state and,
for payment completions, the sender’s state). The dependency
ZKP proves that all dependencies of the state are signed. For
an offline payment, Alice and Bob can generate the state
transition ZKP, even if they may not yet have signatures for all
dependencies. If Alice cannot yet generate a dependency ZKP,
she needs to equip Bob with the necessary data to get any
missing signatures to allow him to compute the dependency
ZKPs for her state. To achieve this without compromising the
confidentiality of Alice’s state, we complement each state with
a commitment to its dependencies. Alice can now share the
openings of this dependency commitment and the necessary
data for her previous states when she pays Bob.
Fig. 4 illustrates an example in which both Alice and
Bob previously engaged in a payment while offline. For
Alice’s next offline payment to Bob (state 3), Alice sends
the payment commitment and ZKP and her state commitment,
serial number, double spending tag, and state transition ZKP.
Since Alice cannot generate the dependency ZKP yet, she
shares the openings of her dependency commitment, which
include the state commitment of her previous state 2. To allow
Bob to get a signature over state 2 (which was also a payment
creation), she also sends its state commitment, serial number,
double spending tag, state transition ZKP, and dependency
commitment and ZKP. This allows Bob to verify that Alice’s
new state resulted from a sequence of valid state transitions
(1 → 2, 2 → 3).
After receiving the payment from Alice, Bob makes an
offline payment to Carol. Since Bob’s current state 9 now
depends on Alice’s state 3 (which may be a double spend),
Bob needs to include data for Alice’s states 3 and 2 to pay
Carol. Bob also includes data for his states 7, 8 and 9.
When users reconnect, they anonymously upload their
dependencies to the central bank, one by one. Users may

Reconnect. When Alice and Bob go back online, they reconnect to the central bank. Assume that Bob does this first.
5) Query ledger: Bob checks the ledger for existing signatures over Alice’s new state commitment. Alice’s state is
not signed because Alice has not yet reconnected.
6) Request signatures: Bob sends Alice’s new state commitment, serial number, double spending tag, and ZKP to
the central bank to request a signature for Alice’s state.
The central bank checks whether Alice’s payment creation
is a double spend by searching the ledger for an entry with
the same serial number and a different state commitment.
If Alice did not double spend and her ZKP verifies, the
central bank signs her new state commitment, adds it to
the ledger, and sends the signature to Bob.
Bob can now generate the missing ZKP for his own state
and send a signature request consisting of his new state
commitment, the payment commitment, and the state transition and payment ZKPs to the central bank. The central
bank verifies all proofs, signs the state commitment, adds
it to the ledger, and returns the new signature to Bob. For
payment completions, the central bank does not need to
check for double spends.
At this point, Bob is ready to go offline again and send or
receive another payment. Finally, Alice reconnects.
7) Query ledger and download signature: Alice checks
the ledger and learns that her latest state commitment is
already signed. She downloads the signature and is now
ready to send or receive the next offline payment.
Dependencies of states. The ZKPs for Alice’s and Bob’s new
states prove that their respective previous states are signed. We
therefore call the previous state a dependency of the new state.
Alice’s state has no further dependencies, her payment is valid
even if Bob never receives it. In contrast, Bob can only receive
his payment after Alice’s payment creation state is signed. His
6

## Page 7

recover her state if Bob had already executed state recovery:
In this case, Bob’s state would be signed, which allows Carol
to generate the necessary dependency ZKP for her own state.

add randomized delays between uploads to prevent time-based
correlation (see Section VII). The central bank checks the
correctness of each state transition (S2) and signs each state
commitment. If a state is a double spend, the central bank
observes the matching serial numbers and reconstructs the
identity of the double spender from the double spend tags (A2).

Synchronization. Users must periodically extend the validity
of their wallet by running an interactive synchronization protocol with the central bank. The central bank defines the interval
after which the user must synchronize in discrete epochs.
To enforce this, we include the last synchronization time (in
epochs) in the account state. During synchronization, the users
update the epoch value through a state transition and prove
that their previous state is signed. Thereby, the synchronization
mechanism ensures that double spend recipients cannot delay
state recovery indefinitely.

Offline payment. Our extended solution is illustrated in Fig. 3,
where blue elements show additions to the previous protocol.
1) Request payment: Bob computes a request commitment
and sends it, together with the payment value, to Alice.
2) Create payment: Alice updates her state, but compared
to the single payment case, she additionally creates a
dependency commitment and separates the dependency
ZKP from the state transition ZKP. Alice sends her
new state commitment, the openings of the payment
commitment, and the state transition and payment ZKPs
to Bob. She also includes either the required data about
her state dependencies along with the openings of her
dependency commitment, or the dependency commitment
and the dependency ZKP.
3) Accept payment: Bob verifies that Alice’s state was
computed correctly and that it has a valid dependency
ZKP or that he has all data to generate one, when he
reconnects. If all checks pass, he accepts the payment.
4) Complete payment: Bob updates his state and additionally creates a dependency commitment and a state
transition ZKP.

VI. S OLUTION D ETAILS
In this section, we describe our solution in detail. State recovery and synchronization details are deferred to Appendix A,
complementary pseudocode is provided in Appendix C
A. System Setup and State Representation
To set up the CBDC system, the central bank generates a
signature key pair (skCB , pkCB ), defines the security parameters, and performs the setup of the ZKP system.
The user’s state consists of the following values. The
user-chosen secret key sk and the holding limit H are fixed
during enrollment. ctri counts how many payments a user
has sent, and bali captures the current account balance. ei
reflects the last epoch (a fixed time span determined by
the central bank) in which the user synchronized. scmuser
i−1
represents the previous state commitment of the user and ccmi
represents the commitment to the state of the counterparty.
The user commits to their current state by picking blindstate
i
randomly and computing the state commitment: scmuser
=
i
user
commblindstate
(sk,
H,
ctr
,
bal
,
e
,
scm
,
ccm
).
i
i
i
i
i−1
i
The user also maintains data structures called histories,
which contain past payment data indexed by the corresponding state commitment. The internal history histint holds the
openings for the state commitment. The external history histext
stores data which the user needs to request signatures either
(i) for their own states or (ii) for states from other users that
the user received as dependencies. While internal history data
remains private, external history data may be forwarded. The
state recovery history histrecovery holds the openings of the
payment commitment for payment completions.

Reconnect. Assume that Bob reconnects first.
5) Query ledger: Bob first checks whether any of his own or
his dependency states already has a signature. We assume
that neither Alice nor Carol have reconnected yet, so this
is not the case.
6) Request signatures: In the example in Fig. 4, Bob first
sends a signature request for his dependency state 2
from Alice. The central bank verifies that Alice’s state
transition (1 → 2) was computed correctly, adds her
signed state (2) to the ledger, and returns the signature to
Bob. Bob generates the missing ZKP for his dependency
on Alice’s state 3, and sends another signature request to
the central bank. Bob repeats the same steps to iteratively
send signature requests for his states 8, 9, and finally 10.
If none of the payments was a double spend, Bob now
has a signature over his most recent state 10.
Alice reconnects later.

B. User Enrollment
The user requests the current epoch e and a challenge c
from the central bank. The user then selects a random secret
key sk and blinding value blindstate
to generate the initial
0
=
comm
state commitment scmuser
(sk, H, 0, e, 0, c).
blindstate
0
0
The previous state commitment and account balance values
are set to 0. ccm0 is set to the central bank challenge c to
ensure that all enroll requests are fresh. Additionally, the user
derives the value iduser pseudorandomly from the secret key,
which acts as their identifier towards the central bank. Lastly,
the user generates the enroll ZKP zkpenroll (see Fig. 5). The
user
user sends scmuser
, H, e, and c to the central bank, and
0 , id
adds the openings of the state commitment to histint [scmuser
0 ].
The central bank verifies zkpenroll , and checks that iduser is
not already registered in their user registry R. The central bank
then adds iduser to R and approves the enrollment request by

7) Query ledger and download signature: Alice checks the
ledger and notices that her current state is already signed
by the central bank, and downloads the signature.
State recovery. If Alice double spent in the example in
Fig. 4, the central bank detects this when Carol uploads
her dependencies when reconnecting. The central bank does
not sign Alice’s state, and therefore, Carol cannot create the
necessary dependency ZKPs for Bob’s and her states. However,
since offline settlement is guaranteed, Carol can collect her
money by executing state recovery. To recover, Carol must
identify herself and upload all her dependencies at once to
the central bank to prove that she was a (potentially indirect)
recipient of the fraudulent payment (A3). The central bank then
signs Carol’s state, and she can continue getting signatures
for other unsigned states. Note that Carol would not have to
7

## Page 8

Payment creation dependency zkpdep
create
• Public values pkCB , dcmsen
l+1
dep
sen
• Secret values scmsen
l , σl , blindl+1
sen
◦ dcml+1 = commblinddep (scmsen
l )
l+1

sen
◦ Ver(pkCB , scmsen
l , σl ) = True
Payment creation state transition zkpstate
create
sen
• Public values scmsen
l+1 , dcml+1 , snl+1 ,
dsl+1
• Secret values sk, H, ctrl , ball , el ,
state
v pm , scmsen
,
l−1 , ccml , ccml+1 , blindl
dep
blindstate
,
blind
l+1
l+1

◦ idsen := PRFid
sk (0)
◦ scmsen
:= commblindstate (sk, H, ctrl ,
l
l
ball , el , scmsen
l−1 , ccml )
sen
◦ scml+1 = commblindstate (sk, H,
l+1
ctrl + 1, ball − v pm , el , scmsen
l ,
ccml+1 )
◦ snl+1 = PRFsn
sk (ctrl + 1)
ds
◦ dsl+1 = idsen +scmsen
l+1 ·PRFsk (ctrl +
1)
sen
◦ dcmsen
l+1 = commblinddep (scml )
◦ ball ≥ v pm

l+1

Payment completion dependency zkpdep
comp
• Public values pkCB , dcmrec
k+1
rec
• Secret values scmk , ccmk+1 , σkrec ,
cp
σk+1
, blinddep
k+1
◦ dcmrec
= commblinddep (scmrec
k+1
k ,
k+1

ccmk+1 )
rec ) = True
◦ Ver(pkCB , scmrec
k , σk cp
◦ Ver(pkCB , ccmk+1 , σk+1
) = True
Payment completion state transition zkpstate
comp
rec
• Public values ∆sync , scmrec
k+1 , dcmk+1 ,
pcmsen
l+1
• Secret values sk, H, ctrk , balk , ek , esen
lreq ,
pm
v , scmrec
k−1 , ccmk , ccmk+1 , blindk ,
dep
pm
blindstate
, blindstate
k
k+1 , blindk+1 , blindl+1
rec
◦ scmk := commblindstate (sk, H, ctrk ,
k
balk , ek , scmrec
k−1 , ccmk )
req (scmrec )
◦ rcmrec
:=
comm
blindk
k
k
◦ scmrec
(sk, H,
k+1 = commblindstate
k+1
ctrk , balk + v pm , ek , scmrec
k ,
ccmk+1 )
pm , rcmrec ,
pm
◦ pcmsen
l+1 = commblindl+1 (v
k
)
ccmk+1 , esen
l
◦ dcmrec
= commblinddep (scmrec
k+1
k ,
ccmk+1 )
◦ balk + v pm ≤ H
◦ |esen
l − ek | ≤ ∆sync

Payment zkppm
• Public value pcmsen
l+1
• Secret values sk, H, ctrl , ball , el ,
pm
sen
v , scml−1 , scmsen
l+1 , ccml , ccml+1 ,
pm
blindstate
, blindstate
l
l+1 , blindl+1
◦ scmsen
:= commblindstate (sk, H, ctrl ,
l
l
ball , el , scmsen
l−1 , ccml )
sen
◦ scml+1 = commblindstate (sk, H,
l+1
ctrl + 1, ball − v pm , el , scmsen
l ,
ccml+1 )
◦ pcmsen
=
commblindpm (v pm ,
l+1
l+1
ccml+1 , scmsen
,
l+1 el )
Enrollment zkpenroll
• Public values iduser , scmuser
0 , e, H, c
• Secret values sk, blindstate
0
◦ scmuser
= commblindstate (sk, H, 0, e,
0
0
0, c)
user
id
◦ id
:= PRFsk (0)

k+1

Fig. 5: Zero knowledge proofs for payment creation, payment completion, and user enrollment.
generating a signature σ0user over the state commitment scmuser
0
and returns the signature to the user. The central bank also
user
stores (scmuser
0 , σ0 ) in their ledger L. The user completes
the enrollment by adding σ0user to histext [scmuser
0 ].

the signature request of scmuser
in the related history, i.e.,
i
state
dep
scmuser
,
dcm
,
zkp
,
zkp
,
and
additionally sni and dsi for
i
i
payment creations or pcmi and zkppm for payment completions. If the sender also lacks zkpdep for scmuser
i , they add the
openings of dcmi to the related history instead of zkpdep and
dcmi . In this case, to ensure that the recipient can generate
zkpdep when reconnecting, the sender also adds the related
history of each dependency of scmuser
i .
Next, the sender picks a random blindpm
l+1 to compute
pm
sen
sen
pm
pcmsen
, rcmrec
l+1 = commblindl+1 (v
k , scml+1 , el ) and generpm
ate the payment proof zkp (see Fig. 5). Finally, the sender
pm
sends the openings of pcmsen
l+1 together with zkp , and the
related history histrel to the recipient, which concludes the
offline payment on the sender side.

C. Offline Payment
An offline payment proceeds as illustrated in Fig. 6.
(1-2) Request payment. The recipient sends a payment request
to the sender consisting of the payment value v pm and the
req
rec
request commitment rcmrec
k := blindk (scmk ).
(3-4) Create and send payment. The sender creates a new
payment state by decreasing the balance ball by the payment
value v pm , and increasing the payment counter ctrl by one.
The user updates the previous state commitment to scmsen
and
l
the counterparty state commitment to rcmrec
.
After
choosing
a
k
random blindstate
,
the
sender
computes
the
new
state
commitl+1
sen
ment scmsen
l+1 and stores its openings in histint [scml+1 ]. Using a
dep
random value blindl+1 , the sender computes the state transition
proof zkpstate to show that the new state and dependency
commitments, the double spending tag dsl+1 and the serial
snl+1 (see Fig. 5) are computed correctly. If scmsen
has a
l
signature σlsen , the sender generates the dependency proof
sen
zkpdep . The user stores blinddep
l+1 , scml , dsl+1 , snl+1 , and the
computed ZKP(s) in the external history histext [scmsen
l+1 ].
The sender recursively generates the related history histrel .
The related history either provides the signature for the
new payment creation state, or the required data such that
the recipient can obtain this signature when reconnecting.
In particular, the related history of state scmuser
consists
i
user
of scmuser
and
its
signature
σ
.
If
the
sender
does
not
i
i
yet have σiuser , they instead include the required values for

(5) Accept payment. The recipient checks that the
sender’s wallet is not expired, and computes pcmsen
l+1 =
pm
pm
rec
sen
sen
commblindpm
(v
,
rcm
,
scm
,
e
)
to
verify
zkp
. Next,
k
l+1 l
l+1
the recipient verifies that histrel contains all the data to later
request a signature over the sender’s new state from the
central bank. This check proceeds recursively and ensures that
the sender correctly constructed the related history: Starting
with scmsen
l+1 , the recipient verifies the respective ZKPs or
the signature σ for every scm. If histrel neither contains a
dependency ZKP nor a signature σ, the recipient continues
by checking all dependencies of scm. If all checks pass, the
recipient accepts the payment.
(6) Complete payment. The recipient creates a new payment
completion state as a transition from their current state. The
balance is increased by v pm , the counterparty state commitment
is set to scmsen
l+1 , and the previous state commitment is set
to scmrec
.
The
user chooses a random blindstate
k+1 to compute
k
8

## Page 9

User wallet:
State commitment
Internal history

Public parameters:
, external history

Current states:

Public key of the central bank
Synchronization interval

, state recovery history

Alice:
Bob:

Alice
sender

Bob
recipient
2. Payment request:

3. Create payment
Update state:

1. Request payment
Compute request commitment

5. Accept payment
4. Payment creation:

Verify payment proof:
Compute

as

Verify
using
Ensure that
is not expired
Generate state transition proof:

Recusively verify states in

Prove correct state transition in
Prove knowledge of signature

for

in

Generate payment proof:
=
Prove correct payment value deduction in
Recursively generate the related history

, starting from

, starting from

:

In each recursion step for state
, verify that either
of the following holds for
:
includes a valid signature for
,
or includes valid
, and
, and, for payment completions
or includes valid
, for payment completions
,
and the recursive calls for each dependency of
succeed.

If possible, generate a dependency proof:

,

6. Complete payment

:

Update state:

In each recursion step for state
, add either of the following to
:
and ,
or
,
and (a)
for payment creations, or (b)
for payment completions
or
, the openings of
, (a)
for payment creations, or
(b)
for payment completions, and make a recursive call for
every dependency of

Generate zero-knowledge proofs:
Prove correct state transition in
If possible, prove knowledge of signatures
in

for

and

for

Fig. 6: Offline payment protocol between the payment sender, Alice, and the payment recipient, Bob.
the new state commitment scmrec
k+1 and stores its openings
in histint [scmrec
k+1 ]. Since the new state has a dependency on
the sender’s payment state, the recipient stores all received
information from the related history histrel in the external state
history histext . This ensures that the recipient can provide all
required data if they subsequently pay other users.
The recipient generates the ZKPs. Notable differences to
a payment creation are that the dependency ZKP also needs
to show that the state of the sender is signed. In addition,
the state transition proof zkpstate also uses pcmsen
l+1 as public
input. Together with zkppm , this ensures that the recipient’s
payment value v pm is consistent with the sender’s payment
value (see Fig. 5). Thus, the recipient also stores zkppm in
histext [scmrec
k+1 ]. To enable possible later state recovery, the
rec
recipient stores the openings of pcmsen
l+1 in histrecovery [scmk+1 ].

case, the central bank reconstructs the identity of the double
spender using the double spending tags and responds with ⊥.
Finally, if all checks pass, the central bank generates a
signature σ over scm, adds an entry to the ledger L, and
responds by sending σ to the user.
9) Process response. If the user receives a signature σ, it
updates histext [scm] with σ. If the central bank rejected the
payment, the user concludes that scm was a double spend and
that they need to run state recovery.
VII. S ECURITY A NALYSIS
In this section, we analyze the user privacy, payment
security, and accountability guarantees of PayOff.
A. Privacy Guarantees
Payment and balance confidentiality (P1). Signature requests for payment creation states contain a state and dependency commitment scm and dcm which are hiding, a pseudorandom serial number sn and double spend tag ds which appear
random if the sender did not double spend, and the zeroknowledge proofs zkpstate and zkpdep . Signature requests for
payment completion states contain a state, dependency, and
payment commitment scm, dcm, pcm and zero-knowledge
proofs zkpstate , zkpdep , zkppm . Since all uploaded values are
indistinguishable from random values, identities, payment values, and account balances are confidential to the central bank.
A malicious central bank could falsely flag payments as
double spends and trigger state recovery for a victim user.
During state recovery, the user must disclose their identity
and payment details to the central bank to continue using
the system. Such attacks could be prevented by requiring the
central bank to provide proof of double spending.2 Our design

D. Reconnect
Reconnect is shown in Fig. 7, and proceeds as follows.
1) Query ledger. When a user reconnects, they need to get a
signature over their most recent state. The user does this by
recursively requesting missing signatures over dependencies
from their external history: The user identifies the newest
unsigned state scm for which all dependencies are signed and
checks the ledger L for a signature σ over scm.
2)-4) Create and send signature request. If σ does not
exist, the user creates zkpdep if needed. After that the user
creates the signature request as zkpstate and zkpdep with the
respective public values for a payment state and zkpstate ,
zkpdep , and zkppm with the respective public values for a
payment completion state and sends them to the central bank.
5)-8) Processing and response to the signature request. The
central bank first verifies zkpstate , zkpdep , and, for a payment
completion, zkppm . Then, the central bank checks if the ledger
L contains a signature σ for scm and responds with σ if it does.
For a payment creation, the central bank checks whether an
entry with the same sn but a different scm exists, which would
indicate that this payment creation is a double spend. In this

2 To present such a proof, the central bank would need to additionally store
zkpstate and dcm for each payment creation, which we consider acceptable
storage overhead. In addition, PRFs need to additionally provide collisionresistance, and the system should be set up such that the central bank does
not have access to the simulation trapdoor for the ZKP system, which we also
consider reasonable assumptions for a CBDC system.

9

## Page 10

Ledger

1. Ledger query:
Query response:

6. Ledger query:
Query response:

Bob

Central Bank

1. Check for an existing signature

5. Verify signature request

If
contains a signature for
, return
.
Query the ledger. If the response contains a valid signature , return

4. Signature request:

).

2. Check if all dependencies are signed
Call
and let the return values be
If
is true, return
.
If
is a payment completion:
Call
and let the return values be
If
is true, and
is owned by the user, return
Else if
is true, return
.

.

Generate dependency proof

for

If
is a payment creation: Send
Else, send

Verify correctness proof
.
Verify dependency proof
.
In case of a payment completion, verify the payment proof
.

6. Check ledger entries and detect double spends
Query the ledger for existing entries for
. If an entry with
signature exists, send and return.
Query the ledger for existing entries with the same
and a
different state commitment. If such an entry exists, a double
spend happened. Send , reconstruct the double spender
identity, and return.

.
.

3. Create the signature request
, if not already contained in

.

7. Generate signature and update ledger

.

Generate a signature

.

9. Process the central bank response
If the response
Else, return

7. Ledger update:
payment creation:
payment completion:

is a valid signature for
, add it to
and return
to indicate that a subsequent state needs to be recovered.

8. Response:

).

If
is a payment creation, add
ledger.
Else, add
Send .

.
to the

Fig. 7: Users reconnect by recursively requesting signatures for unsigned states. The entry point is the most recent scmi .
and prototype could be extended to incorporate this solution.

most recent state and can either create a dependency ZKP for
the next state or forward its signature when creating payments.
This prevents the above linking attacks because neither the user
nor any direct or indirect recipient must request a signature or
query the ledger for that state.
We conclude that PayOff provides offline session unlinkability (P2b) for all payments, whereas full payment unlinkability (P2a) is not guaranteed in all cases.

Payment unlinkability (P2). Because all values that users
send to the central bank appear random, the central bank
cannot link (i) states of the same user or payment, or (ii)
payments that involve the same sender or recipient, based on
the content of the signature requests alone. Thus, all offline
payments are cryptographically unlikable. However, in certain
cases that we discuss next, the central bank may be able to
leverage additional information, such as the time and number
of signature requests or ledger queries, to infer payment links.
Recall that users may have multiple unsigned states when
reconnecting, and therefore, they need to get signatures for
multiple states, either through ledger queries or signature
requests. Suppose that the central bank can correlate all
signature requests from the same user (despite anonymous
communication). In this case, it learns that all the correlated
states are either dependencies on states from other users
due to payment completions, or states from the reconnecting
(anonymous) user. Combined with the fact that each signature
request explicitly discloses the type of the state (payment
creation or completion), this may help the central bank to deanonymize such correlated states. The same leakage applies if
the central bank can correlate anonymous ledger queries by
the same user, e.g., due to their timing.
We consider such correlation and de-anonymization attacks
difficult to execute in practice: In a large CBDC deployment,
many users are likely to request signatures simultaneously.
Simple countermeasures, such as short randomized waits between signature requests and ledger accesses, would further
complicate such attacks. In addition, PSPs could maintain
replicas of the ledger and users could query those replicas.
This would partially leak ledger access patterns to the PSPs but
not to the central bank. Thus, inference attacks would require
collusion between PSPs and the central bank.
In contrast, payments executed after a full reconnect are
unlinkable to previous signature requests and ledger query
sequences. In this case, the user knows the signature of their

Payment privacy towards other users (P3). First, we consider the privacy of a payment recipient towards the sender.
The payment creation message contains the sender’s new state
commitment, the related history, and openings for the payment
commitment pcm and the payment proof zkppm Since the
sender knows pcm and zkppm , the sender can recognize the
recipient’s payment completion state if they receive a payment
that includes the recipient’s state in the related history.
Next, we consider the privacy of payment senders towards
direct and indirect payment recipients. When the sender creates
a payment, they disclose data related to the payment creation
state, and possibly its dependencies, in the related history. The
recipient relays this information when they subsequently pay
other users. This allows users to recognize and link states
that they receive in different payments. If users synchronize
between payments, such links can be prevented.
Finally, we consider a malicious user who colludes with
the central bank. Such a user could pay a victim recipient and
then help the central bank to identify the recipient’s payment
completion state based on the values pcm and zkppm in the
signature request. Since these values are not stored on the
ledger, the malicious user could not identify the recipient state
independently, without the central bank.
We conclude that in PayOff, the payments of a user from an
offline session are not unlinkable to the payment counterparties
in the same offline session. Towards other users and across
offline sessions, payments are both confidential and unlinkable,
if a user synchronizes when reconnecting. In Appendix B, we
present a modification to our protocol that ensures unlinkability

10

## Page 11

user3 . This prevents the recipient from holding more money
than captured in the account balance. Therefore, for holding
limit integrity, it is sufficient to prove that each payment
completion is compliant with the pre-defined holding limit.

of offline sessions without an additional synchronization step,
which preserves offline synchronization despite collusion of
the central bank and other users.
Residual leakage. As the final part of our privacy analysis,
we consider residual leakages that allow the central bank to
infer something about offline payments, but not link payments
to the same user or break payment confidentiality.
If the central bank operates the ledger, it learns the number
of queries per state commitment. This number is a lower bound
on the number of users that received this state as a dependency.
Counting ledger queries is practical for the central bank even if
there are many users and payments in the system (as opposed
to correlation signature requests by the same user). However,
it is hard to imagine how this information could be used
to violate users’ privacy. Such residual leakage is similar to
transferable E-cash schemes, in which the size of the coin
grows with each payment [20], which allows the bank to infer
the number of offline payments for each coin at deposit time.
A malicious central bank could also infer a lower bound on
the number of users who depend on a particular state by manipulating the ledger. One such strategy is to remove previously
added signatures, and thus force every user to send a separate
signature request to the central bank. Ledger manipulation
attacks would be publicly visible to users and third parties,
and we consider them unlikely in CBDC deployments.

Counterfeit creator identification (A2). To identify a counterfeit creator, the central bank needs to receive two matching
serial numbers with different state commitments. Since two
correctly computed double spending tags with the different
state commitments reveal the sender identity, a user can only
evade detection if (i) the central bank never receives this data
or (ii) they did not correctly compute the state commitment,
serial number, or double spending tag.
Once any direct or indirect recipient of the double spending
reconnects, they send a signature request that includes the
required data unless the state commitment is already included
in the ledger, in which case the central bank has already
received the double spending tag. Since the honest (noncolluding) recipient verified the state transition before accepting the payment, the data must have been correctly computed
unless the sender can forge a central bank signature, break
the simulation-extractability of the ZKP system, or break the
binding property of the commitment scheme.
Counterfeit recipient de-anonymization (A3). If a user
reconnects and requests signatures for unsigned states, the
central bank detects any payment creations that lead to counterfeits (see A2), and refuses to sign them. If a user received
a payment with a direct or indirect dependency on the double
spend state, the user cannot get a signature for their own
state through a regular signature request. To get a signature
through state recovery, the user must disclose their identity,
and the received payment value, which satisfies the required
recipient detection. If the user does not recover their state, and
no previous recipient has recovered their state, the user has to
eventually either stop using their account, discard the received
payment, or become a double spender themselves due to the
synchronization requirement (see A4).

B. Security Guarantees
Payment security (S1). To create a valid payment, a user
must prove knowledge of the openings of their previous state
commitment in the state transition ZKP. Since the user never
shares the secret key or the blind of the state commitment,
only the rightful owner knows all required openings and
can generate a valid ZKP without breaking the soundness of
the ZKP system or the binding property of the commitment
scheme. Therefore, PayOff provides payment security.
Payment integrity (S2). Here, we consider a malicious
user who has not compromised their device. Such a user
can manipulate the communication channel, for example, by
delaying the delivery of messages to the secure element, but
they cannot arbitrarily deviate from the payment protocol.
To create a payment without reducing the account balance,
the user must create a payment that does not result from a
sequence of state transitions starting from a signed state (which
would violate simulation-extractability of ZKPs or binding of
commitments) or forge a central bank signature (which would
violate unforgeability of signatures). Completing the same payment more than once would require two openings for the same
request commitment (which would violate the binding property
of commitments) or forging a ZKP (violating simulationextractability). Thus, payment integrity is guaranteed for users
who have not compromised their secure elements.

Incomplete synchronization detection (A4). When user synchronizes, they create a state transition from their most recent
state and prove that this state is signed (Appendix A). If a user
instead creates a transition from an older state, the impact is
similar to that of a malicious recipient who completes two
concurrent payments: The user can only pay from one of the
two state transition sequences without causing a double spend.
VIII. P ERFORMANCE E VALUATION
A. Evaluation Setup
To evaluate our solution, we implemented a non-optimized
prototype in Go. We used the gnark [3] library to implement the zero-knowledge proofs using the Groth16 [29]
proof system in the BN254 group. Our implementation uses
EdDSA [11] for signatures and MiMC [6] as hash function.
Public key encryption uses ElGamal encryption, while pseudorandom functions and commitments are implemented using
MiMC hashes. The size of keys, commitments, serial numbers,
and double spending tags is 254 bits. Evaluations were run on
a laptop with an AMD Ryzen 7 PRO 7730U processor with

C. Accountability Guarantees
Holding limit integrity (A1). In an offline payment, the
recipient initially sends a request commitment that the sender
includes in the payment creation state. The recipient can only
generate a valid state transition ZKP if the request commitment
opens to the previous state commitment. Therefore, any state
transition invalidates all other outstanding payments to the

3 Users who compromised their secure element can request multiple parallel
payments and complete them by creating multiple state transitions from the
same state (similar to a double spend). However, if the user pays from more
than one of those state transition sequences, this creates a double spend.

11

## Page 12

32GB RAM and averaged over 100 runs. Network effects were
not measured, and data exchange was assumed to be instant.
Proof Circuit
Enroll
Payment
Payment creation state transition
Payment creation dependency
Payment completion state transition
Payment completion dependency
Synchronization
State recovery

linearly by around 40kB per 50 unsigned history elements.
As reconnecting is typically executed using WiFi or cellular
connection, we do not consider this a problem.

Generation (s) Verification (s) Constraints (#)
0.0239
0.0552
0.0741
0.0512
0.0795
0.0906
0.0857
0.0828

0.0012
0.0013
0.0013
0.0013
0.0013
0.0014
0.0014
0.0014

History sizes. To analyze history sizes, we distinguish between
merchants, who primarily receive payments, and consumers,
who primarily send payments. We focus on consumers because
merchants are likely to reconnect regularly. We assume that (i)
all consumers make 1.3 payments per day (the total number
of credit card payments in the U.S. [2] averaged over the
U.S. population [4]), (ii) consumers receive payments from
a group of users who never received payments, and (iii) all
consumers stay offline equally long and start with no unsigned
states in their history. We consider the following scenarios:
A) Short internet or central bank outage of around one day.
B) Consumers who choose to stay offline for a week up to a
month. C) Consumers who do not have consistent connectivity
and need to stay offline for multiple months. We analyze the
size of the unsigned history at the end of the offline period and
the final payment time, i.e., the end-to-end time until payment
completion for the last offline payment using NFC.
Scenario A: Consumers who receive one payment per day
would have an unsigned history size of 3.9, the final payment
would take roughly 340ms. Our system can handle such
outages (and thus increase the financial system’s stability).
Scenario B: Consumers who stay offline for a week and receive
payments daily would have an unsigned history size of 54.8
and a final payment time of around 1.31s. Consumers who stay
offline for a month and receive payments monthly would have
an expected unsigned history size of 60.3 and a final payment
time of around 1.43s. Payments could be accelerated by using
Bluetooth instead of NFC.
Scenario C: If consumers are offline for six months, their
history size would be 237.1 even if they do not receive
payments; the final payment would take almost 5s. Thus, our
system is not ideal for such users and scenarios.

2312
6931
9801
7662
12 674
14 993
12 283
11 954

TABLE II: Evaluation of zero-knowledge proof circuits.
B. User Operations
Subsequently, we report the results for the different user
operations. In addition, Table II shows the proof generation and
verification times as well as the number of R1CS constraints
for each proof circuit used in PayOff.
Offline payment. First, we evaluate offline payments by
varying the number of unsigned elements in the sender’s
external history. In Table III, we report payment creation,
acceptance and completion times, as well as message sizes.
Once a payment is accepted, the sender can participate in
other payments. Once a payment is completed, the receiver can
participate in other payments. We omit the payment request
computation times, which were always below 0.1ms.
We note that a sender can only create a dependency ZKP
if they have exactly one unsigned history element after the
payment creation. In this case, the payment creation takes
around 210ms, longer unsigned history sizes take around 50ms
less. The execution time for payment acceptance increases
linearly by around 90ms per 50 unsigned history elements.
At 101 elements, the end-to-end time is 341ms until payment
acceptance and 432ms until payment completion.
A payment request message is 77B and can be transferred
using QR codes. The message size of payment creations
increases linearly by around 46kB per 50 unsigned history
elements. As at most 3kB can be stored on a QR code, only
payment creations with up to two unsigned history elements
could be sent via QR codes, making them unsuitable for this
protocol. NFC connections have a transmission rate of around
420kbit/s. Combining the computation and NFC transmission
times, the end-to-end time until payment acceptance takes
around 1.1s at 51 unsigned history elements and around 2.2s
at 101. This complies with the Digital Euro regulation which
requires settlement in “a matter of seconds” [22]. For comparison, a typical Mastercard payment takes 630ms±150ms [23].

C. Central Bank Operations
We report the evaluation results of the central bank operations in Table V. Furthermore, Table II shows the proof generation and verification times and the number of R1CS constraints
for all zero-knowledge proof circuits used in PayOff.
Processing signature requests takes 3ms for payment creations and 4ms for payment completions. The latter operation
is 1ms slower, since the payment proof must also be verified.
For every offline payment, the central bank must process
two states: the sender’s creation state and the recipient’s completion state. The processing time of both signature requests
combined is around 7ms if no double spend occurred. Thus,
our system can reach a throughput of 143 payments per second
using sequential execution. PayOff is amenable to parallel
processing. Signature requests for payment completions can be
parallelized, since they don’t involve double spending checks.
Signature requests for payment creations can be parallelized if
serial numbers are queried sequentially. Serial numbers from
distinct ranges could be queried in parallel from separate logs.
In 2021, an average of around 5,000 credit card payments per
second were completed in the U.S. [2], [4]. Using PayOff with
parallel processing, 35 cores are needed to handle such a load.
On days with 5 times higher payment volume, the central bank
would need 175 cores, which we consider feasible.

Reconnect. Table IV shows the time needed for a user to
reconnect based on the number of unsigned elements in their
history and the total size of messages that the user needs to
send to the central bank. In the evaluated scenario, only one of
the unsigned states already has a dependency ZKP. In this case,
the reconnect time increases linearly by around 4.2s for every
50 unsigned history elements. This is because the user needs
to compute a dependency ZKP for all other unsigned states.
In practice, users may have more dependency ZKPs in their
history or states may already have signatures, which would
shorten the reconnect time. The total size of messages that
need to be sent to the central bank during reconnect increases
12

## Page 13

Sender

Receiver

End to end

Message sizes

Unsigned history
(# elem.)

Create Payment
(s)

Accept Payment
(s)

Complete Payment
(s)

Payment accepted
(s)

Payment completed
(s)

Request Payment
(kB)

1
51
101

0.2097
0.1554
0.157

0.004
0.0944
0.1843

0.0917
0.0903
0.0903

0.2138
0.2499
0.3413

0.3054
0.3401
0.4317

0.077
0.077
0.077

Create Payment
(kB)
1.033
46.990
92.945

TABLE III: Evaluation of offline payments based on the sender’s unsigned history size after the payment creation.
Unsigned history
(# elem.)

Reconnect without
state recovery (s)

Total size of messages sent to the
central bank (kB)

1
51
101

0.0029
4.2891
8.5675

0.786
42.286
83.786

lead to an increase in funding costs for banks and a decrease
in investments [30]. Cash-like CBDCs with holding limits are
less problematic because they do not compete with deposits.
Under certain conditions, CBDCs may crowd out cash, notably
if they provide sufficient privacy protection [5]. PayOff is a
cash-like CBDC with holding limits, and thus, avoids the risk
of crowding out deposits. The crowding out of cash can be
accepted or resolved via policy.
In order to be operational and widely used, CBDCs should
support transferable offline payments [30]. Offline payments
can enable attackers to create counterfeit money that cannot
be detected immediately as the recipient cannot query the
central bank to ensure the received money is legitimate. Secure
elements are often proposed to prevent attackers from creating
counterfeit, however, secure elements can be broken. Thus, it
is important to ensure that counterfeit and counterfeit creators
can be detected to prevent counterfeit from flooding the system
without the central bank knowing. This begs the question if
users can exchange received counterfeit for real money or
not. In most currently proposed systems they cannot, meaning
recipients bear the risk and may lose their money. This is
similar to cash where accepting a counterfeit bill may lead to
losing money. However, this approach may not be acceptable
for a CBDC: In traditional cash, a bill can be inspected
and identified as counterfeit, but in CBDC systems, honest
users have no chance to identify counterfeit. This may make
many hesitant to accept CBDC. However, allowing recipients
to exchange their counterfeit for legitimate money, such as
in PayOff, could open up many complex collusion patterns
that need to be investigated and dealt with. Furthermore,
the creation and distribution of large amounts of counterfeit
could destabilize the system. Thus, robust policies and fallback
methods need to be defined to handle these cases. One potential
solution for counterfeit becoming a serious and undetected
problem is to introduce requirements for users to regularly synchronize with the central bank. If a wallet is not synchronized
in time, it expires and cannot be used until synchronized.

TABLE IV: Evaluation of reconnect based on the user’s
unsigned history size (without wait times).
Central bank operation

Processing time (s)

Enrollment request
Signature request (Payment creation, no DS)
Signature request (Payment creation, DS)
Signature request (Payment completion)
State recovery request (without history verification)
Synchronization request

0.0016
0.0029
0.0026
0.0041
0.0017
0.0017

TABLE V: Execution time of central bank operations.

IX.

D ISCUSSION

Money destruction. In PayOff, money can be accidentally
destroyed due to crash-failures either on the communication
channel or of user wallets during payments, even if the failure
is only temporary. Suppose a sender creates a payment, but the
message does not reach the recipient. The message delivery can
be re-tried, however, if the recipient executes another payment
before receiving the previous message, the recipient cannot
complete the payment anymore. To limit losses, it is possible
to extend PayOff to allow senders to credit the payment value
back to their account if (i) the recipient proves that they did not
and will never complete the payment and (ii) the sender has not
yet created another payment. (i) prevents counterfeit creation,
whereas (ii) ensures that holding limits cannot be evaded. The
central bank may decide to relax either of these requirements
and, e.g., refund payments on a case-by-case basis if a user
identifies themselves when going back online.
Role of PSPs. This paper focuses on the end-users and the
central bank. However, in a CBDC deployment, the PSPs also
play a significant role. In PayOff, PSPs could help minimize
the amount of information that users need to send to the central
bank. For example, PSPs could replicate the central bank’s
ledger, which addresses some residual leakages identified in
Section VII. Similarly, PSPs could improve privacy towards
the central bank by assisting in the state recovery protocol.

X. C ONCLUSION
Anonymous payments and privacy-preserving digital currencies have been studied for decades, and various schemes
exist in the research literature. However, recent regulation
proposals for CBDCs present new requirements and a different
risk model, which have not been considered previously. To the
best of our knowledge, this paper is the first to design an offline
payment solution that combines strong privacy protection with
expressive regulation features, such as holding limits, in a way
that is robust to secure element failure.

Economic implications. CBDCs as a new form of legal tender
make the payment system less dependent on third parties
and may help serve currently unbanked populations. However,
since CBDCs have the potential to disrupt banking, care needs
to be taken to avoid bank-runs in which users exchange their
bank deposits for CBDCs, destabilizing the financial system in
the process. Another risk is that CDBCs crowd out deposits and

R EFERENCES
[1]

13

Atlantic council cbdc tracker.
cbdctracker/.

https://www.atlanticcouncil.org/

## Page 14

[2]
[3]
[4]
[5]
[6]

[7]

[8]
[9]

[10]

[11]

[12]

[13]

[14]

[15]

[16]
[17]

[18]
[19]

[20]

[21]

[22]

[23]

Federal reserve payment study.
https://www.federalreserve.gov/
paymentsystems/fr-payments-study.htm. Accessed: 2024-06-24.
gnark library. https://github.com/ConsenSys/gnark. Accessed: 2024-0618.
United states census bureau. https://www.census.gov/popclock/. Accessed: 2024-06-24.
Itai Agur, Anil Ari, and Dell’Ariccia Giovanni. Designing central bank
digital currencies. Journal of Monetary Economics, 125(C), 2022.
Martin Albrecht, Lorenzo Grassi, Christian Rechberger, Arnab Roy, and
Tyge Tiessen. Mimc: Efficient encryption and cryptographic hashing
with minimal multiplicative complexity. In International Conference
on the Theory and Application of Cryptology and Information Security,
pages 191–219. Springer, 2016.
Elli Androulaki, Jan Camenisch, Angelo De Caro, Maria Dubovitskaya,
Kaoutar Elkhiyaoui, and Björn Tackmann. Privacy-preserving auditable
token payments in a permissioned blockchain system. In Proceedings
of the 2nd ACM Conference on Advances in Financial Technologies,
pages 255–267, 2020.
Martin Arnold. MasterCard customers suffer outages around the world,
July 2018.
Foteini Baldimtsi, Melissa Chase, Georg Fuchsbauer, and Markulf
Kohlweiss. Anonymous transferable e-cash. In IACR International
Workshop on Public Key Cryptography, 2015.
Balthazar Bauer, Georg Fuchsbauer, and Chen Qian. Transferable ecash: A cleaner model and the first practical instantiation. In Juan A.
Garay, editor, Public-Key Cryptography – PKC 2021, Lecture Notes in
Computer Science, pages 559–590, Cham, 2021. Springer International
Publishing.
Daniel J Bernstein, Niels Duif, Tanja Lange, Peter Schwabe, and Bo-Yin
Yang. High-speed high-security signatures. Journal of cryptographic
engineering, 2(2):77–89, 2012.
Schweizerische Nationalbank BIS Innovation Hub. Exploring privacy,
security and scalability for cbdcs. https://www.bis.org/publ/othp80.pdf,
2023.
Bundesbank. Bundesbank survey: Widespread acceptance of digital
euro among general public, 2024. https://www.bundesbank.de/en/
press/press-releases/bundesbank-survey-widespread-acceptance-ofdigital-euro-among-general-public--933322.
Jan Camenisch, Susan Hohenberger, and Anna Lysyanskaya. Compact
e-cash. In Ronald Cramer, editor, Advances in Cryptology – EUROCRYPT 2005, Lecture Notes in Computer Science, pages 302–321,
Berlin, Heidelberg, 2005. Springer.
Sébastien Canard and Aline Gouget. Divisible e-cash systems can
be truly anonymous. In Moni Naor, editor, Advances in Cryptology
- EUROCRYPT 2007, Lecture Notes in Computer Science, pages 482–
497, Berlin, Heidelberg, 2007. Springer.
Sebastien Canard and Aline Gouget. Anonymity in transferable e-cash.
In Applied Cryptography and Network Security (ACNS), 2008.
David Cerdeira, Nuno Santos, Pedro Fonseca, and Sandro Pinto.
Sok: Understanding the prevailing security vulnerabilities in trustzoneassisted tee systems. In IEEE Symposium on Security and Privacy (SP).
IEEE, 2020.
David Chaum. Blind signatures for untraceable payments. In Advances
in Cryptology: Proceedings of Crypto 82, 1983.
David Chaum, Amos Fiat, and Moni Naor. Untraceable electronic cash.
In Shafi Goldwasser, editor, Advances in Cryptology — CRYPTO’ 88,
Lecture Notes in Computer Science, pages 319–327, New York, NY,
1990. Springer.
David Chaum and Torben Pryds Pedersen. Transferred cash grows in
size. In Workshop on the Theory and Application of of Cryptographic
Techniques, pages 390–407. Springer, 1992.
Mihai Christodorescu, Wanyun Catherine Gu, Ranjit Kumaresan,
Mohsen Minaei, Mustafa Ozdayi, Benjamin Price, Srinivasan Raghuraman, Muhammad Saad, Cuy Sheffield, Minghua Xu, and Mahdi
Zamani. Towards a two-tier hierarchical infrastructure: An offline
payment system for central bank digital currencies, December 2020.
European Commission. Proposal for a regulation of the european
parliament and of the council on the establishment of the digital
euro, June 2023. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=
CELEX:52023PC0369.

[24]
[25]
[26]

[27]

[28]

[29]

[30]
[31]

[32]

[33]

[34]

[35]

[36]
[37]

[38]

[39]

[40]

[41]

[42]

[43]

14

Daniele Coppola, Giovanni Camurati, Claudio Anliker, Xenia Hofmeier,
Patrick Shaller, David Basin, and Srdjan Capkun. Pure: Payments with
uwb relay-protection. In 33rd USENIX Security Symposium (USENIX
Security 2024), Philadelphia, PA, USA, August 14-16, 2024, 2024.
European Central Bank (ECB).
Digital euro, 2024.
https://
www.ecb.europa.eu/euro/digital euro/html/index.en.html.
European Central Bank. Progress on the preparation phase of a digital
euro - First progress report, June 2024.
Digital Euro team European Central Bank.
State of play
on offline digital euro, 2024.
https://www.ecb.europa.eu/
euro/digital euro/timeline/profuse/shared/pdf/ecb.degov240411
item3updateofflinedigitaleuro.en.pdf.
Christina Garman, Matthew Green, and Ian Miers. Accountable privacy
for decentralized anonymous payments. In Financial Cryptography and
Data Security (FC), 2017.
Jonas Gross, Johannes Sedlmeir, Matthias Babel, Alexander Bechtel,
and Benjamin Schellinger. Designing a central bank digital currency
with support for cash-like privacy, July 2021.
Jens Groth. On the size of pairing-based non-interactive arguments.
In Advances in Cryptology–EUROCRYPT 2016: 35th Annual International Conference on the Theory and Applications of Cryptographic
Techniques, Vienna, Austria, May 8-12, 2016, Proceedings, Part II 35,
pages 305–326. Springer, 2016.
Todd Keister and Daniel Sanches. Should central banks issue digital
currency? The Review of Economic Studies, 90(1):404–431, 03 2022.
Aggelos Kiayias, Markulf Kohlweiss, and Amirreza Sarencheh.
PEReDi: Privacy-enhanced, regulated and distributed central bank digital currencies. In ACM Conference on Computer and Communications
Security (CCS), November 2022.
Konstantinos Markantonakis, Michael Tunstall, Gerhard Hancke, Ioannis Askoxylakis, and Keith Mayes. Attacking smart card systems:
Theory and practice. information security technical report, 14(2):46–56,
2009.
Sinisa Matetic, Mansoor Ahmed, Kari Kostiainen, Aritra Dhar, David
Sommer, Arthur Gervais, Ari Juels, and Srdjan Capkun. {ROTE}: Rollback protection for trusted execution. In USENIX Security Symposium,
2017.
Bank of Canada. A central bank digital currency for offline payments, 2023. https://www.bankofcanada.ca/2023/02/staff-analyticalnote-2023-2/.
Bank of England. The digital pound: Technology working paper, February 2023. https://www.bankofengland.co.uk/paper/2023/the-digitalpound-technology-working-paper.
Bank of Finland. Reining in the expectations of offline payments, 2023.
https://publications.bof.fi/handle/10024/53147.
Tatsuaki Okamoto and Kazuo Ohta. Disposable zero-knowledge authentications and their applications to untraceable electronic cash. In Gilles
Brassard, editor, Advances in Cryptology — CRYPTO’ 89 Proceedings,
pages 481–496, New York, NY, 1990. Springer.
Mike Orcutt. Mit technologhy review – is the digital dollar dead?, July
2023. https://www.technologyreview.com/2023/07/21/1076645/is-thedigital-dollar-dead/.
Eli Ben Sasson, Alessandro Chiesa, Christina Garman, Matthew Green,
Ian Miers, Eran Tromer, and Madars Virza. Zerocash: Decentralized
anonymous payments from bitcoin. In IEEE symposium on security
and privacy (SP), 2014.
Moritz Schneider, Ramya Jayaram Masti, Shweta Shinde, Srdjan Capkun, and Ronald Perez. Sok: Hardware-supported trusted execution
environments. arXiv preprint arXiv:2205.12742, 2022.
The Federal Reserve System.
Money and payments: The
u.s. dollar in the age of digital transformation, January 2022.
https://www.federalreserve.gov/publications/files/money-andpayments-20220120.pdf.
Alin Tomescu, Adithya Bhat, Benny Applebaum, Ittai Abraham, Guy
Gueta, Benny Pinkas, and Avishay Yanai. Utt: Decentralized ecash with
accountable privacy. Cryptology ePrint Archive, 2022.
Stephan van Schaik, Alex Seto, Thomas Yurek, Adam Batori, Bader
AlBassam, Christina Garman, Daniel Genkin, Andrew Miller, Eyal
Ronen, and Yuval Yarom. Sok: Sgx. fail: How stuff get exposed, 2022.

## Page 15

[44]

towards other users, but not towards other users who collude
with the central bank. Lastly, we describe a mitigation strategy
that ensures offline session unlinkability towards other users,
even when colluding with the central bank, and does not
require synchronization.

Karl Wüst, Kari Kostiainen, Noah Delius, and Srdjan Capkun. Platypus: A central bank digital currency with unlinkable transactions and
privacy-preserving regulation. In ACM Conference on Computer and
Communications Security (CCS), 2022.

A PPENDIX
A. Additional Solution Details
In this section, we discuss the details of the state recovery
and synchronization functions.

Problem Description. The states of a user are only unlinkable
across offline sessions in one particular instance. Consider the
case of some user Alice who just made an offline payment
to Bob. Alice reconnects, gets a signature over her most
recent payment creation state, and goes offline again. Alice
then completes an offline payment from Carol. Since Carol’s
payment state is unsigned, Alice cannot yet generate a valid
dependency ZKP for her new payment completion state even
though this is her first payment since reconnecting.
Alice stays offline and does not reconnect. At some point,
Alice makes a payment to Dora. The related history for
this payment includes Carol’s unsigned payment state and
Alice’s corresponding payment completion state. In addition,
since Alice’s payment completion state does not yet have a
dependency ZKP, Alice must include the state commitment
and signature from her payment to Bob.
Therefore, if Bob ever becomes a direct or indirect recipient
of Alice’s payment to Dora, Bob can recognize and link the
state commitment across the first offline session, before Alice’s
reconnected, and the second offline session, after Alice’s
reconnected.

State Recovery. If a user cannot get a signature for one of
their states through a regular signature request because of
a double spend dependency, the user can invoke the state
recovery mechanism instead. Although the double spend state
remains unsigned, state recovery allows a user to get their own
state signed by revealing details of the affected payment and
identifying themselves towards the central bank.
To invoke state recovery, the user identifies their own
payment completion state scmuser
that completes the couni
terfeit payment. For state recovery, the user generates the
related history histrel , similarly to a payment creation, to prove
they executed all state transitions correctly. In addition, the
user needs to disclose their identifier iduser and the received
payment value v pm to the central bank. The user generates
zkprecovery (see Fig. 8) to prove that these values were computed correctly and belong to scm. To show that the user’s
previous state scmuser
i−1 is correct and unaffected by the double
spend, zkprecovery also proves that scmuser
i−1 has a signature. The
user sends zkprecovery , histrel , iduser , and v pm to the central bank.
The central bank evaluates the state recovery request by
first verifying zkprecovery using pcm in histrel [scmuser
i ] together
with iduser and v pm . This ensures that v pm and the user identity
iduser belong to the owner of scmuser
i . If this succeeds, the
central bank continues to verify the related history and adds
entries to the central bank ledger L for any states in the history
that are not yet recorded. Finally, the central bank generates a
signature σi over scmuser
i , adds a corresponding ledger entry,
and sends σi to the user.
The user adds the σ to histext [scm] to conclude the state
recovery process.

Partial mitigation through synchronization. A simple mitigation strategy that can be adopted without modifying the
protocol is to let users synchronize when they reconnect. This
way, Alice’s last state after reconnecting is a synchronization
state. Since Alice did not share this synchronization state
commitment with any user of the first offline session, none
of the (direct or indirect) recipients of her payment creation
in the second offline session can link her state to another state
from the first session anymore.
However, if we consider cases in which the central bank
can link multiple signature requests or ledger queries from
the same user and the central bank colludes with users, this
mitigation strategy is not sufficient. In this case, the central
bank can link Alice’s synchronization state commitment to
the previous state commitments of the user. If the central
bank shares Alice’s new synchronization state commitment
with any of the recipient’s of Alice’s payments in the second
session, e.g., Dora or Bob, they can again recognize Alice’s
state commitment and disclose her new state commitments
from the second offline session to the central bank.

Synchronization. To update the epoch, the user first obtains
a challenge c and the current epoch e from the central bank
and creates a state transition to update the epoch. Similar to
the enrollment process, the user includes c in place of the
counterparty commitment. Next, the user computes the new
sync
state commitment scmuser
(see Fig. 8)
i+1 and generates zkp
to show that they updated their state correctly, and that their
previous user state is signed. The user then sends zkpsync , e,
and c, scmuser
i+1 to the central bank to request a signature.
The central bank checks for existing entries in L with
user
user
scmuser
i+1 and a signature σi+1 and returns σi+1 if found. Otherwise, the central bank checks that e and c match the expected
values and verifies zkpsync . If this succeeds, it generates a
user
user
signature σi+1
, updates its ledger L, and returns σi+1
to the
user
user. The user checks if σi+1 is a valid signature and adds it
to histext [scmuser
i+1 ] to conclude the synchronization process.

Full mitigation through independent dependency ZKPs.
Finally, we discuss a full mitigation of the aforementioned
leakage, which ensures offline session unlinkability towards
other users, even if they collude with the central bank.
For this, we slightly modify the payment completion protocol: Instead of a single dependency ZKP, users create a
separate dependency ZKP for each dependency state. This
allows the user to hide the link to signed dependency states
from recipients, even if another dependency is not yet signed.
This modification slightly increases the size of payment
completion elements in the related history and a minor increases execution times. When users reconnect or complete
a payment, they may require additional time to generate
the separate dependency ZKPs. Before accepting a payment,

B. Offline session unlinkability towards other users without
synchronization
We first describe the edge case in which unlinkability of
offline sessions towards other users does not hold. Next, we
explain how and why synchronization helps mitigate this issue
15

## Page 16

State Recovery ZKP zkprecovery
• Given public values pkCB , iduser , v pm , scmuser
i , pcm,
sen
• I know secret values sk, H, ctri , bali , euser
, v pm ,
i , e
req
user
state
pm
user
scmi−1 , ccmi , blindi , blindi−1 , blind , σi−1
• such that
◦ rcmuser
(scmuser
i−1 := commblindreq
i−1 )
i−1
user
user
◦ scmi = commblindstate
(sk,
H,
ctri , bali , euser
i , scmi−1 ,
i
ccmi )
◦ iduser = PRFid
sk (0)
user
◦ Ver(pkCB , scmuser
i−1 , σi−1 ) = True
sen
◦ pcm = commblindpm (v pm , rcmuser
)
i−1 , ccmi , e

Synchronization ZKP zkpsync
• Given public values pkCB , scmuser
i+1 , e, c
• I know secret values sk, H, ctri , bali , ei , scmuser
i−1 , ccmi ,
user
blindstate
, blindstate
i
i+1 , σi
• such that
◦ scmuser
:= commblindstate
(sk, H, ctri , bali , ei , scmuser
i
i−1 ,
i
ccmi )
◦ scmuser
(sk, H, ctri , bali , e, scmuser
i+1 = commblindstate
i , c)
i+1
user
user
◦ Ver(pkCB , scmi , σi ) = True

Fig. 8: Zero-knowledge proofs for state recovery and synchronization.

for reconnect and state recovery. Figure 10 shows the main
functions needed to execute an offline payment, which make
use of some helper functions in Fig. 12. Figure 11 shows the
functions needed to generate the payment proofs. Figure 13
shows the enrollment and synchronization functions. Figure 14
shows all central bank functions. Figure 15 shows the helper
functions needed to verify states and state transitions.

users may also have to verify an additional dependency ZKP
for payment completion states. Similarly, the central bank’s
processing time for payment completion states would increase,
since the central bank needs to verify the two dependency
ZKPs separately. However, should the increased total verifier
runtime for users and the central bank become a concern,
techniques such as aggregate ZKPs could be used to reduce
overhead.
C. Pseudocode
In the following we provide pseudocode for all functions
used in our protocol. Figure 9 shows the functions needed

16

## Page 17

U.Reconnect(scmuser
i )
1) (flag, scmrecovery ) := (false, ⊥)
2) If U.QuerySignature(scmuser
i ), return (false, ⊥).
dep
3) If histext [scmuser
:
i ] does not contain zkp
recovery
• (flag, scm
) = U.Reconnect(scmuser
i−1 )
• If flag is true, return (flag, scmrecovery )
• If scmuser
corresponds to a payment completion state:
i
◦ (flag, scmrecovery ) = U.Reconnect(ccmi )
◦ If flag is true:
If scmuser
is owned by the user, return (flag,
i
scmuser
i ).
Else, return (flag, scmrecovery ).
sig request
4) m
:= U.CreateSigRequest(scmuser
i )
sig request
5) Send m
to the central bank and let the response
be σ.
6) If U.VerifyResponse(scmuser
i , σ) returns true, add σ to
histext [scmuser
i ] and return (false, ⊥).
7) Else, return (true, ⊥).

U.CreateSigRequest(scm)
1) If histext [scm] does not contain zkpdep
• For every dependency of scm with state commitment
scm′
◦ If histext [scm′ ].σ = ⊥, return ⊥
• Compute zkpdep and store the result in histext [scm]
2) If scm corresponds to a payment creation state, return
(PaymentCreation, scm, dcm, sn, ds, zkpstate , zkpdep )
3) Else, return (PaymentCompletion , scm , dcm , pcm ,
zkpcorrect , zkpdep , zkppm )
U.StateRecovery(scm)
1) If scm is not owned by the user, return false.
2) Obtain
related
history
histrel
=
U.GetRelatedHistory(scm)
3) Generate zkprecovery using histext [scm], histint [scm], and
histrecovery [scm] (See Fig. 8).
4) Send (StateRecovery, scm, iduser , v pm , zkprecovery ,
histrel ) to the central bank.
5) If the central bank returns σ, set histext [scm] = σ and
return true. Else, return false.

U.QuerySignature(scm)
1) If histext [scm].σ ̸= ⊥, return true.
2) Query ledger for a signature σ over scm.
3) If the ledger contains a valid σ for scm, add it to
histext [scm] and return true.
4) Else, return false.
U.VerifyResponse(scm, σ)
1) If σ is not a valid central bank signature for scm, return
false.
2) Else, add σ to histext [scm] and return true.

Fig. 9: Pseudocode for user reconnect function with functions that reconnect calls.

17

## Page 18

U.AcceptPayment(histrel , mpm
l+1 )

U.RequestPayment(v pm )
1) Check that the wallet is not expired
2) Let scmrec
k be the current state commitment of the user
3) Choose a request blind blindreq
k
4) Compute the request commitment by committing to the
current state commitment rcmrec
(rcmrec
k := commblindreq
k )
k
req
rec
5) Store blindk in the internal history histint [scmk ]
pm
6) Send rcmrec
to the recipient.
k and the requested value v

pm sen
pm
1) Parse (scmsen
, el , blindpm
) from mpm
l+1 , v
l+1 , zkp
l+1
state
2) Parse
(snl+1 , dsl+1 , dcmsen
,
zkp
from
l+1
l+1 )
histrel [scmsen
l+1 ]
3) Let scmrec
k be the most recent state of the user
rec
4) Parse blindreq
k from histint [scmk ]
5) Check that the sender’s epoch esen
and the user’s epoch
l
ek are recent enough
6) Verify the payment
a) Verify the payment proof zkppm
• Compute rcmrec
(scmrec
k = commblindreq
k )
k
sen
• Compute pcml+1 = commblindpm (v pm , rcmrec
k ,
l+1
sen
scmsen
,
e
)
l+1
l
• Verify zkppm for public input pcmsen
l+1
b) Verify the validity of the new sender state
VerifyOfflineCreation(histrel , scmsen
l+1 )
c) If any check fails, reject the payment. Else, accept the
payment.

pm
U.CreatePayment(rcmrec
)
k ,v
1) Check that the wallet is not expired
2) Choose a random blindstate
l+1
3) Create statesen
l+1 as a state transition from the most recent
user state statesen
l
(sk, H, ctrl + 1, ball −
4) Compute scmsen
l+1 :=commblindstate
l+1
rec
v pm , el , scmsen
,
rcm
)
l
k
sen
5) Store the openings of scmsen
l+1 in histint [scml+1 ].
6) Generate and update the external data for the new
payment creation state:
• Choose random blinddep
l+1
dep
pm
)
• mstate
l+1 = U.GenCreationStateProof(blindl+1 , v
dep
state
sen
• Add blindl+1 , scml and the values of ml+1 to
histext [scmsen
l+1 ]
• mdep
=
U.GenCreationDependencyProof(hist
ext )
l+1
sen
• Merge the values of mdep
into
hist
[scm
]
ext
l+1
l+1
7) Obtain
related
history
histrel
=
U.GetRelatedHistory(scmsen
l+1 )
8) Generate the payment proof message mpm
=
l+1
U.GenPaymentProof(v pm )
9) Send (histrel , mpm
l+1 ) to the recipient

U.CompletePayment(histrel , mpm )
pm sen
pm
1) Parse (scmsen
, el , blindpm
) from mpm
l+1 , v
l+1 , zkp
req
rec
2) Parse blindk from histint [scmk ]
3) Compute rcmrec
(scmrec
k = commblindreq
k )
k
sen
sen
4) Compute pcm = commblindpm (v pm , rcmrec
k , scml+1 , el )
l+1
state
5) Choose a random blindk+1
6) Update the user state by creating staterec
k+1 as a state
transition from staterec
k
7) Generate
the
new
state
commitment
scmrec
=
commblindstate
(sk, H, ctrk , balk +
k+1
k+1
sen
v pm , ek , scmrec
k , scml+1 )
rec
8) Store the openings of scmrec
k+1 in histint [scmk+1 ].
9) Update histext by merging the related history histrel into
it and adding pcm, zkppm to histext [scmrec
k+1 ].
pm sen
10) Add blindpm
, el to histrecovery [scmrec
k+1 ]
l+1 , v
11) Add external data for the current payment completion
state:
• Choose random blinddep
k+1
dep
• Set mstate
k+1 = U.GenCompletionStateProof (blindk+1 ,
pm
pm
sen
sen
blindl+1 , v , pcml+1 , el )
rec
sen
• Add (blinddep
k+1 , scmk , scml+1 ) and the values of
mstate to histext [scmrec
]
k+1
• Set mdep
k+1 = U.GenCompletionDependencyProof
(staterec
k+1 , histext )
rec
• Add the values of mdep
k+1 to histext [scmk+1 ]

Fig. 10: Pseudocode for offline payment functions.

18

## Page 19

U.GenCreationDependencyProof(scmsen
l , histext )

pm
U.GenCreationStateProof(blinddep
)
l+1 , v

1) Compute dependency
commblinddep (scmsen
l )

commitment

dcmsen
l+1

1) Get the dependency blind blinddep
and the previous state
l
sen
commitment scmsen
l−1 from histext [scml ]
sen
sen
2) If scml−1 does not yet have a signature σl−1
, return ⊥.
3) Compute the dependency commitment dcmsen
=
l
commblinddep (scmsen
l−1 )

=

l+1

2) Compute snl+1 = PRFsn
sk (ctrl+1 )
ds
3) Compute dsl+1 = idsen + scmsen
l+1 · PRFsk (ctrl+1 )
4) Generate zkpstate to prove that the state transition was
computed correctly (see zkpstate
create in Fig. 5)
sen
sen
state
5) Return mstate
)
l+1 = (snl+1 , dsl+1 , scml+1 , dcml+1 , zkp

l

4) Generate zkpdep to prove that all dependencies of the
state are signed (see zkpdep
create in Fig. 5)
5) Return mdep
= (zkpdep , dcmsen
l )
l

pm
pm
U.GenCompletionStateProof(blinddep
, pcm, esen
l )
k+1 , blindl+1 , v

1) Compute dependency commitment
sen
commblinddep (scmrec
k , scml+1 )

dcmrec
k+1

U.GenCompletionDependencyProof(scmrec
k , histext )

=

1) Get the blind blinddep
k , the previous state commitment
scmrec
k−1 , and the counterparty state commitment ccmk
from histext [scmrec
k ]
2) If either scmrec
k−1 or ccmk do not yet have a signature
rec
σk−1
or σkcp , return ⊥.
=
3) Compute dependency commitment dcmrec
k
commblinddep (scmrec
k−1 , ccmk )

k+1

rec
2) Parse blindreq
k from histint [scmk ]
3) Generate zkpstate to prove that the state transition was
computed correctly (see zkpstate
create in Fig. 5)
rec
rec
sen
state
4) Return mstate
)
k+1 = (scmk+1 , dcmk+1 , pcml+1 , zkp

U.GenPaymentProof(v pm )
sen
1) Choose random blindpm
=
l+1 to generate pcml+1
commblindpm (v pm , ccml+1 , scmsen
,
e
).
l+1 l
l+1
2) Generate zkppm to allow the recipient to complete the
payment (see zkppm in Fig. 5)
sen
pm
pm
3) Return mpm
, el , blindpm
l+1 = (scml+1 , v
l+1 , zkp )

k

4) Generate zkpdep to prove that all dependencies of the
state are signed (See zkpdep
comp in Fig. 5)
dep
rec
5) Return mdep
=
(zkp
,
dcm
k )
k

Fig. 11: Pseudocode for proof creation.

U.GetRelatedHistory(scmuser
i )
1) histrel = {U.GetElement(scmuser
i )}
2) If histrel does not contain σi or zkpdep :
• Set histrel = histrel ∪ U.GetRelatedHistory(scmuser
i−1 )
• If scmuser
corresponds to a payment completion state,
i
set histrel = histrel ∪ U.GetRelatedHistory(ccmi )
3) Return histrel

U.GetElement(scmuser
i )
user
1) If histext [scmuser
i ] contains σi , return (scmi , σi )
2) If scmuser
corresponds
to
a
payment
creation
state
i
dep
• If
histext [scmuser
]
contains
zkp
,
return
i
user
correct
(sni , dsi , scmuser
, zkpdep )
i , dcmi , zkp
correct
user
• Else, return (sni , dsi , scmuser
, blinddep
i , zkp
i , scmi−1 )
user
3) If scmi corresponds to a payment completion state
• if
histext [scmuser
contains
zkpdep ,
return
i ]
user
correct
pm
(scmuser
,
dcm
,
pcm
,
zkp
,
zkp
, zkpdep )
i
i
i
• Else, return (scmuser
, pcmi , zkpcorrect , zkppm ,
i
user
blinddep
,
scm
,
ccm
i)
i−1
i
4) Else, return ()

Fig. 12: Pseudocode for generating the related history for payment creations

19

## Page 20

U.Synchronize()
1) Obtain the current epoch e and a challenge c from the
central bank
2) Let stateuser
be the most recent user state
i
3) Choose a random blindstate
i+1
4) Create a state transition from stateuser
to stateuser
i
i+1
5) Compute
scmuser
=
i+1
user
commblindstate
(sk,
H,
ctr
i , bali , e, scmi , c)
i+1
6) Generate zkpsync to prove that the state transition was
computed correctly (see zkpsync in Fig. 8)
user
sync
7) Set msync
)
i+1 = (scmi+1 , e, c, zkp
user
8) Store the openings of scmuser
i+1 in histint [scmi+1 ].
sync
9) Send mi+1 to the central bank
user
10) Let σi+1
be the response of the central bank
user
11) Store σi+1
in histext [scmuser
i+1 ]

U.Enroll()
1) Obtain the current epoch e and a challenge c from the
central bank
2) Choose random sk and blindstate
i
3) Compute iduser as PRFid
sk (0)
4) Compute initial state commitment scmuser
=
i
commblindstate
(sk, H, 0, e, 0, c)
i
5) Generate zkpenroll (see zkpenroll in Fig. 5)
6) Store the openings of scmuser
in histint [scmuser
i
i ]
enroll
enroll
user
7) Send mi
= (zkp
, id , scmuser
i , e, H, c) to the
central bank to request enrollment.
8) Let σiuser be the signature received from the central bank.
9) Store σiuser in histext [scmuser
i ].

Fig. 13: Pseudocode for enroll and synchronization functions.

CB.ProcessSignatureRequest(misig request )

CB.CheckEnroll(menroll
)
0
1) Parse menroll
as (zkpenroll , iduser , scmuser
0
0 , e, H, c) and ensure that H, e, and c match the expected values.
2) Verify zkpenroll for the public inputs provided.
3) If iduser is not yet in the user registry R, add iduser to R.
Else, return false.
4) Generate σ0user
=
Sign(skCB , scmuser
add
0 ),
user
user
(scm0 , σ0 ) to the public ledger L, and send
σ0user to the user.

request
1) If VerifyState(msig
) returns false, return false
i
2) If the request is for a payment creation:
user
state
• Parse
(sni , dsi , scmuser
)
from
i , dcmi , zkp
sig request
mi
• If none of the entries in L has the same state comuser
mitment scmuser
i , add (sni , dsi , scmi , ⊥) to L. Else
if the entry has a signature σiuser , return σiuser .
• If there is more than one entry in L with sn, return ⊥
3) If the request is for a payment completion:
user
state
• Parse (scmuser
, zkpdep , zkppm )
i , dcmi , pcm, zkp
sig request
from mi
• If none of the entries in L has the same state commituser
ment scmuser
i , add (scmi , ⊥) to L. Else if an entry
has a signature σiuser , return σiuser .
for scmuser
i
4) Compute σiuser = Sign(skCB , scmuser
i ), update the corresponding entry in L and return σiuser

CB.ProcessSynchronizationRequest(msync
)
i
sync
sync
1) Parse (scmuser
,
e
,
c
,
zkp
)
from
m
.
i
i
2) Check whether e and c match the expected values.
3) Verify zkpsync for public inputs
4) If none of the entries in L has the same state commitment
user
scmuser
i , add (scmi , ⊥) to L. Else if the entry has a
user
signature σi , return σiuser .
user
5) Compute σiuser = Sign(skCB , scmuser
i ) over scmi ,
user
update the corresponding entry in L and return σi .

CB.ProcessStateRecoveryRequest(mrecovery
)
i
user
1) Parse mrecovery
as (scmuser
, v pm , zkprecovery , histrel )
i , id
i
2) Parse pcm from histrel [scm]
3) Verify
zkprecovery
for
public
input
user
pcm, scmuser
, pkCB , v pm
i , id
4) If VerifyOfflineCompletion(histrel , scmuser
returns
i )
false, return ⊥.
5) For every state commitment scm′ in histrel :
• If scm′ corresponds to a payment creation:
◦ If none of the entries in L has the same
state commitment scm′ , use histrel [scm′ ] to add
(sn, ds, scm′ , ⊥) to L
• If scm′ corresponds to a payment completion:
◦ If none of the entries in L contains an entry with
the same scm′ , add (scm′ , ⊥) to L
6) Compute σiuser = Sign(skCB , scmuser
i ), update the corresponding entry in L and return σiuser

CB.IdentifyDoubleSpenders(L)
1) dsList = {}
2) For any entries in L with the same value sn and different
state commitment scm ̸= scm′ , reconstruct the identity
id of the double spender:
• Let ds, ds′ be the corresponding double spending tags
with serial number sn := PRFsn
sk (ctr)
• Solve double spending equations ds′ = id + scm′ ·
ds
PRFds
sk (ctr) and ds = id + scm · PRFsk (ctr) for id.
• Add id to dsList
3) Return dsList

Fig. 14: Pseudocode for central bank functions.

20

## Page 21

VerifyOfflineCompletion(histrel , scmrec
k )

VerifyState(mstate
)
i
1) Check that the state transition was performed correctly:
• If the request is for a payment creation:
user
state
◦ Parse sni , dsi , scmuser
from
i , dcmi , zkp
mstate
i
◦ Verify
zkpstate
for
public
input
user
sni , dsi , scmuser
i , dcmi
• Else if the request is for a payment completion:
user
pm
state
◦ Parse scmuser
from
i , dcmi , pcm, zkp , zkp
state
mi
◦ Verify zkpstate for public input pcm, scmuser
i ,
dcmuser
i , ∆sync
◦ Verify zkppm for public input pcm
2) Check that all dependencies are signed:
• Parse zkpdep , dcm from mstate
i
• Verify zkpdep for public input dcmuser
i , pkCB .
3) If any verification fails, return false. Else return true.

1) Let mhist
be the element with state commitment scmrec
k
k
in histrel
state
2) If VerifyState(mk ) is true, return true.
rec
rec
rec
3) If mhist
k = (scmk , σk ) and σk is a valid central bank
signature for scmrec
,
return
true.
k
rec
pm
state
4) Parse (scmrec
) from mhist
k , dcmk , pcm, zkp , zkp
k
5) Verify correctness of the payment completion
• Verify
zkpstate
for
public
input
rec
pcm, scmk , dcmrec
k , ∆sync
• Verify zkppm for public input pcm
hist
rec
6) Parse (blinddep
k , scmk−1 , ccmk ) from mk
rec
7) Verify
that
dcmk
equals
to
commblinddep (scmrec
k−1 , ccmk )
k
8) If scmrec
k−1 belongs to a payment creation state
and
a) If
VerifyOfflineCreation(histrel , scmrec
k−1 )
VerifyOfflineCreation(histrel , ccmk ) both return true,
return true.
b) Else, return false.
9) Else
and
a) If VerifyOfflineCompletion(histrel , scmrec
k−1 )
VerifyOfflineCreation(histrel , ccmk ) both return true,
return true.
b) Else, return false.
VerifyOfflineCreation(histrel , scmsen
l )
1) Let mhist
be the element with state commitment scmsen
l
l
in histrel
) is true, return true.
2) If VerifyState(mstate
l
sen
sen
3) If mhist
= (scmsen
is a valid central bank
l
l , σl ) and σl
sen
signatures for scml , return true.
sen
state
4) Parse (snl , dsl , scmsen
) from mhist
l , dcml , zkp
l
state
sen
5) Verify zkp
for public input snl , dsl , scmsen
l , dcml
dep
sen
hist
6) Parse (blindl , scml−1 ) from ml
7) Verify that dcmsen
equals to commblinddep (scmsen
l
l−1 )
l
sen
8) If scml−1 belongs to a payment creation state, return
VerifyOfflineCreation(histrel , scmsen
l−1 ).
Else return VerifyOfflineCompletion(histrel , scmsen
l−1 )

Fig. 15: Pseudocode for state verification functions.

21
