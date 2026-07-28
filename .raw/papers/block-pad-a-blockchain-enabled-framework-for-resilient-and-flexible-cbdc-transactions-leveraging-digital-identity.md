---
source_type: pdf
title: "Block-PAD: A blockchain-enabled framework for resilient and flexible CBDC transactions leveraging digital identity"
original_file: "thesis/reference/Block-PAD: A blockchain-enabled framework for resilient and flexible\nCBDC transactions leveraging digital identity.pdf"
sha256: "ebf97dcea56fbad1cfaacac0d728fc3c5d950dd2c9695991e547b1f4d6894f5e"
page_count: 23
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Block-PAD: A blockchain-enabled framework for resilient and flexible CBDC transactions leveraging digital identity

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Computer Networks 275 (2026) 111805

Contents lists available at ScienceDirect

Computer Networks
journal homepage: www.elsevier.com/locate/comnet

Block-PAD: A blockchain-enabled framework for resilient and ﬂexible
CBDC transactions leveraging digital identity
Olivier Atangana
a

a,∗, Lyes Khoukhi

b , Morgan Barbier

a , Ahmet Kokcam

a

ENSICAEN (National Graduate School of Engineering of Caen), GREYC Laboratory, 6 Boulevard Maréchal Juin, Caen, 14000, France

b CNAM (National Conservatory of Arts and Crafts), 292 Rue Saint-Martin, Paris, 75003, France

a r t i c l e

i n f o

a b s t r a c t

Keywords:
CBDC
Resilience
Privacy
Security
Blockchain
Digital identity
Regurlarly compliance

In an economic landscape increasingly dominated by the proliferation of virtual currencies and the rise of digital payments, Central Bank Digital Currencies (CBDCs) emerge as a credible payment alternative. CBDCs, researched extensively by both governmental and non-governmental ﬁnancial institutions, promise to digitize ﬁat
money, making it more eﬃcient, cost-eﬀective, rapid, and ﬁnancially inclusive. However, realizing such prospects
hinges on overcoming challenges that address monetary policy support, privacy, regulatory compliance, security, resilience, and now consumer-desired features. This paper introduces Block-PAD, a novel blockchain-enabled
framework speciﬁcally designed to enhance the resilience and ﬂexibility of CBDC transactions. Our solution introduces: 1) a full transferable oﬄine payment method (Alice to Bob); 2) A staged (hybrid) oﬄine payment
method (Bob to Carla) 3) an end-to-end privacy that aligns with regulatory standards; 4) a security framework
assessed by properties of unlinkability, undeniability, clearance, balance integrity, and protection against double
spending and incoming; and 5) interoperability between traditional payment schemes and the CBDC paradigm.
Leveraging blockchain, privacy accountability description, (PAD), eID wallets, Trusted Execution Environment,
and three Privacy Enhancing Technologies (PETs): blind signature, zk-SNARK, and full homomorphic encryption Cheon-Kim-Kim-Song (CKKS). Block-PAD stands as an innovative solution embodying privacy by design
and regulatory compliance. Experimental results demonstrate that our solution delivers exceptional transaction
performance with low latency and high throughput, while eﬀectively integrating privacy-enhancing technologies without signiﬁcant computational overhead. The system also proves robust and scalable, making it highly
suitable for real-world retail and micro-payment scenarios.

1. Introduction

connected. This research focuses on technical aspects in harmony with
its legislative ramiﬁcations, notably on privacy protection, security, and
resilience orchestrated by oﬄine payment without infringing legal constraints.

The interest in Central Bank Digital Currencies (CBDC) is gauged by
the growing number of projects and research initiatives initiated by governments, academic institutions, and private sector actors to make them
operational. This increased attractiveness for electronic money issued
and controlled by central banks follows the evolutionary curve reﬂecting the trend of preferential options for digital payment observed among
users over the last decade. Yet, despite this fervor and widespread research, very few projects have entered the production phase [1]. Indeed,
for CBDCs to be a credible payment alternative, it is crucial that they offer advantageous features and correct the pitfalls of traditional payment
systems, all without undermining the monetary policy of central banks.
In this vein, public and private service actors must address a range of
technical, legal, economic, and social challenges that are evidently inter-

1.1. Securing privacy of oﬄine payments in a decentralized world
The emergence of cryptocurrencies following the economic crisis of
2008 highlighted the potentials and characteristics of blockchain technology. The application ﬁelds of blockchain are so varied that it can
justly be qualiﬁed as a technological revolution in the domain of computer science, on par with artiﬁcial intelligence. Yet, like AI, it does not
escape concerns related to privacy protection and security, especially
when it comes to crypto payments, which additionally bear the risk of
illicit use oriented towards money laundering or terrorism ﬁnancing.

∗ Corresponding author.

E-mail addresses: thomas-olivier.atangana@unicaen.fr (O. Atangana), lyes.khoukhi@cnam.fr (L. Khoukhi), morgan.barbier@unicaen.fr (M. Barbier),
ahmet.kokcam@ﬁme.com (A. Kokcam).
https://doi.org/10.1016/j.comnet.2025.111805
Received 18 April 2025; Received in revised form 16 September 2025; Accepted 21 October 2025
Available online 12 November 2025
1389-1286/© 2025 Elsevier B.V. All rights are reserved, including those for text and data mining, AI training, and similar technologies.

## Page 2

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 1. Architecture of transferable CBDC based PAD.

•

Moreover, oﬄine payments are intended to increase resilience in case of
internet connection failure but do not escape the aforementioned problems. Subsequently, it is incumbent to establish a new paradigm that
leverages the advantages of oﬄine payment and blockchain while simultaneously guaranteeing privacy and regulatory compliance. In particular, we distinguish two types of oﬄine CBDC payment ﬂows in our
framework. First, a full transferable oﬄine transaction, where Alice
transfers value directly to Bob without any network connectivity at the
time of payment. Second, a staged oﬄine transaction (hybrid approach),
where Bob transfers value to Carla in an oﬄine setting, but the transaction only achieves ﬁnality after later online synchronization. The organization of the rest of this paper is structured as follows: Section 1.2
presents the paper contributions, Section 2 addresses related work, Section 3 outlines preliminaries, Section 4 delves into the proposed model,
Section 5 illustrates System operations, Section 6 covers security analysis, Section 7 presents the discussion and Section 8, Conclusion and
future works

We present a security analysis against double spending, Sybil, and
collusion attacks, highlighting the robustness of our approach.

Blockchain technology, due to its multiple desirable properties, is
revolutionizing various sectors of everyday life, similar to the payment
industry. With the advent of Bitcoin and other cryptocurrencies, it has
highlighted the advantages and beneﬁts of this type of distributed system for the payment industry. CBDC and stablecoins incorporate in their
projects the use of a blockchain, whether public or private. However, the
major problem facing CBDCs is inevitably privacy. Indeed, blockchains
do not natively guarantee privacy. At least, not in the sense of being the
opposite of transparency. At the same time, it is essential not to fall into
the other extreme, which would consist of neglecting the need for regulatory compliance compatibility. [2] proposed an oﬄine CBDC payment
scheme that ensures privacy. An intuitive approach, for instance, might
involve conducting a consecutive oﬄine payment with blockchain integration for defunding operations, using the recipient’s public key for the
transaction. The recipient could then connect to their public account and
proceed with the defunding. This straightforward approach breaks the
guarantee of privacy in oﬄine mode and exposes users to the backchain
problem. To overcome these pitfalls, it is therefore necessary to customize blockchain systems so that they meet the standards of regulatory
privacy compliance.

1.2. Paper contributions
This work extends the research in [2] by relying on a two-tier architecture oﬀering end-users an oﬄine payment solution presented in
Fig. 1. The core novelty of this work is the operational integration of the
Privacy Accountability Description (PAD) model into a CBDC transaction ﬂow that supports consecutive oﬄine transfers and on-chain reconciliation. Rather than presenting a mere collection of privacy-enhancing
technologies, we demonstrate how PAD enables contextual privacy, i.e.,
deciding what, when, and to whom information should be disclosed under trustees/validators thresholds. This integration provides strong privacy guarantees while ensuring regulatory traceability and transferability of digital cash.
Building on this foundation, we make the following complementary
contributions:

2. Related work
2.1. Decentralized e-cash approaches
The protocol proposed in [3] stands out for its decentralized oﬄine
electronic cash system, oﬀering compact and divisible schemes that enhance payment security and deposit veriﬁcation eﬃciencies. It addresses
scalability issues inherent in blockchain and privacy concerns in centralized payment infrastructure management, although its implementation
complexity remains a challenge, especially in real-world environments.
Furthermore, the detection of double spending is not immediate but occurs posteriorly during the deposit phase, which introduces the potential
for unidentiﬁed vulnerabilities due to the novel nature of the system.
On the other hand, [4] proposes an e-cash payment system free from
speciﬁc storage systems, oﬀering a secure transferability functionality.
This system is more eﬃcient and signiﬁcantly more conﬁdential than
older approaches. However, it does not address regulatory compliance
issues and only detects double spending at the time of deposit.

•

We design a blockchain-enabled two-tier CBDC architecture (central
bank + shard ledgers) that incorporates PAD for accountability, interoperability, and resilience in both online and oﬄine settings.
• We combine PAD with PETs (blind signatures, zk-SNARK, and CKKS
homomorphic encryption) to secure transactions while preserving
privacy under regulatory compliance.
• We implement a working simulator and provide a detailed performance evaluation (latency, throughput, and gas usage) to validate
the practicality of the proposed framework.
2

## Page 3

Computer Networks 275 (2026) 111805

O. Atangana et al.

2.2. TEE-Based oﬄine payment solutions and hardware wallet

its core is an unspent account state (UAS) that enables three diﬀerent
privacy levels in line with regulatory requirements: fully private, semiprivate, and entirely transparent. While this design integrates digital
identity and oﬀers privacy by design, private wallets remain vulnerable to illicit acquisitions on the black market. [16] proposes a secure
and eﬃcient double transaction scheme for oﬄine CBDC payments in
centralized banking systems. Its combination of digital signature cryptography with Secure Elements (SE) and TEEs makes it reliable in terms
of security, but less so for privacy-sensitive data is recorded for regulatory compliance.
Similarly, [17] introduces a secure protocol leveraging digital signatures for consecutive CBDC payments, Tamper Resistant Element (TRE)
and aiming to provide “contextual privacy” oﬄine. However, synchronization remains a challenge, as public key certiﬁcates imply third-party
knowledge of user identities.
Ref. [18] speciﬁcally targets mobile platforms with an anonymous
oﬄine payment solution (OAPM) based on SE+TEE hardware. This approach enables “controllable anonymity,” allowing authorities to unmask the payer in case of illicit activities. Nevertheless, the payee’s
anonymity is not guaranteed, compliance management is tied to the
currency issuer, and there is no property enabling transferability.
Ref. [19] outlines a retail CBDC (rCBDC) payment protocol that functions oﬄine for the point of sale (POS) but stays online for the buyer.
Relying on a shared symmetric key and time-based one-time protocol,
it ensures payer anonymity but not that of the payee, thus oﬀering only
partial oﬄine capability.
Ref. [2] serves as a robust and secure payment solution oriented toward privacy while also being compatible with regulatory compliance.
It uses multiple PETs (including blind signatures and zk-SNARK) and
ensures that synchronization does not reveal the origin of funds, though
it predominantly focuses on transaction privacy. Building on [2], the
present research aims to integrate this solution into a decentralized system to guarantee end-to-end contextual privacy for both issuer and receiver, fulﬁlling regulatory requirements. Table 1 compares these approaches in detail.

Ref. [5] introduces a secure oﬄine payment system based on digital signatures and a Trusted Execution Environment (TEE). Although
it integrates well with retail CBDC infrastructures, robust privacy is
not assured, since the protocol primarily targets traditional banking
designs. In a subsequent eﬀort, [6] improves upon [5] by mitigating the risks of forgeability and DDoS attacks. Then [7] provides a
smart card implementation of [5], incorporating [6]’s enhancements
and opening the door to blockchain connectivity. However, none of
these three works [5–7] address privacy and regulatory considerations
comprehensively.
Moving to a more innovative perspective, [8] describes a system
leveraging One-Time Programs (OTP) and reﬂective architectures for ofﬂine, asynchronous P2P CBDC transactions. It utilizes the TEE of smartphones, ensuring a high degree of privacy and programmability. Still, a
malicious wallet app could compromise OTP executions by modifying
or halting embedded libraries. Moreover, the protocol does not cover
regulatory compliance aspects.
Ref. [9] relies on eIDAS Advanced Electronic Signatures (AdES) and
X.509 Attribute Certiﬁcates to handle oﬄine trust veriﬁcation for complex CBDC transactions. It supports both account-based and token-based
models, aligns with ISO 20022 for Anti-Money Laundering (AML) compliance, and can manage intricate data structures. However, it does
not integrate Privacy-Enhancing Technologies (PETs), oﬀering limited
conﬁdentiality, and the protocol’s reliance on evolving “middle phone”
technologies may demand future updates.
Ref. [10] proposes a universal hard wallet equipped with quantumresistant bits for storing and transferring centrally minted CBDC units in
a decentralized manner. Oﬀering strong privacy by design, high security, and ﬁnancial inclusion, it requires no synchronization and places
no transaction limit. Despite its convenience, the approach does not explain how to ensure regulatory compliance in an oﬄine context. As a
result, scenarios such as large-scale acquisitions of these hardware wallets for illegitimate purposes remain a concern.
Ref. [11] provides Integrated Circuit Card (ICC) speciﬁcations for
payment systems, including asymmetric cryptography, digital certiﬁcates, and conﬁgurable payment limits. While this structure oﬀers robust
security and eﬀective fraud risk management, privacy is only “soft,” as
users’ identities are not strongly protected.

3. Preliminaries
3.1. Theoretical foundations
CBDCs
CBDCs represent a new form of money that is government-backed.
They embody the ambition to digitalize existing physical currency in
the form of cash and deposits. The signiﬁcant attention and interest that
CBDCs are garnering are not without reason. Indeed, they oﬀer an alternative, innovative, and complementary means of payment that promises
to revolutionize the traditional payment ecosystem. This is particularly
due to their potential for eﬃciency, cost-eﬀectiveness, speed, and ﬁnancial inclusion.
Generally, two types of models are distinguished based on their usage perspectives. The ﬁrst type, retail CBDC (rCBDC), aims to facilitate
transactions between merchants and users and comes in three forms:
Direct rCBDC, which bypasses intermediaries like commercial banks or
other institutions in the transaction ﬂow; Indirect rCBDC, which is currently the most favored and involves the participation of commercial
banks for KYC operations, limiting the central bank’s role to currency
issuance and monetary policy enforcement; and Hybrid rCBDC, where
one might imagine a scenario in which the central bank only manages
the transaction chain while the funds of the owners are held by the central bank itself.
Additionally, wholesale CBDCs are designed to handle transactions
between ﬁnancial institutions. It is also important to note that CBDC systems can be classiﬁed based on their ledger management type, which
can be either centralized (single-ledger based system) or distributed
(distributed-ledger based system).

2.3. Compliant privacy-centric model
Ref. [12] presents a comprehensive approach to privacy and regulation within CBDC, combining cryptographic techniques with distributed
system design. Although transactions are anonymous in principle, each
transaction is tagged, allowing it to be traced back to the original holder.
Furthermore, while the protocol accounts for malicious actors, it provides only limited consideration of coalition attacks by maintainers who
could revoke a user’s privacy by consensus.
In contrast, many smart contract-based privacy solutions, other than
[13], revolve around a “privacy pool.” These solutions use zk-SNARK
proofs to demonstrate that transaction funds originate from honest
users. While these privacy pools add a layer of conﬁdentiality and help
meet compliance requirements, they rely on social consensus (to deﬁne
associations among users) and might struggle with regulatory evolutionthereby questioning the feasibility of true privacy by design in CBDC
systems.
Additionally, [14] guarantees payment conﬁdentiality on the
blockchain using ZKPs and threshold homomorphic encryption for
anonymous balance updates, adding identity authorities for user certiﬁcation. Despite its decentralized regulatory control, this protocol does
not fully protect user identity privacy and overlooks privacy breaches
via coalition attacks.
[15] proposes a CBDC payment system oriented toward accountbased transactions by leveraging commitments, nulliﬁers, and ZKPs. At
3

## Page 4

Computer Networks 275 (2026) 111805

O. Atangana et al.

Table 1
Comparative study of various solutions.
Proposed solution

Wallet

Oﬄine function

Privacy Type

Additional hardware

Digital Identity

DLT Integration

Privacy Enhancing
Technologies

[3]
[12];[13]
[14]
[15]
[5]
[7]
[8]
[9]
[10]
[4]
[16]
[17]
[18]
[19]
[11]
[2]
Our solution

Software
Software
Software
Software
Software
Smart Card
Software
Software
Hardware
Software
Software
Software
Software
Software
Software/Hardware
Software
Software

Yes
No
No
No
Yes
Yes
Yes
Yes
Yes
Yes
Yes
Yes
No
Yes
Yes
Yes
Yes

Strong Privacy
Strong Privacy
Conﬁdential Transaction
Controllable Privacy
Soft Privacy
Soft Privacy
Data Privacy
Medium Privacy
Strong Privacy
Data Privacy
Soft Privacy
Contextual Privacy
Controllable Privacy
Semi-Private
Soft Privacy
Strong Privacy
Contextual Privacy

No
No
No
No
SE+TEE
No
SE+TEE
No
No
No
SE+TEE
TRE
SE+TEE
No
Must be speciﬁed
SE+TEE
SE+TEE

No
No
No
Yes
No
No
No
Yes
No
No
No
No
No
No
No
No
Yes

Yes
Yes
Yes
No
No
Possible
No
No
No
No
No
Possible
No
No
No
Yes
Yes

No
Yes
Yes
Yes
No
No
No
No
No
No
No
No
No
No
No
Yes
Yes

Oﬄine payment function
The oﬄine payment function is also a desirable feature in CBDC systems for resilience reasons in the absence of internet or network connection, and to fully immerse in an experience similar to cash payments.
[20] noted that several types of oﬄine payments can be distinguished
depending on whether they connect to a ledger (oﬄine or online) or
not:

CBDCs, leading to a varied lexicon that reﬂects its level or type, sometimes with subtle distinctions. Thus, we can basically distinguish three
levels of privacy: strong/high/hard privacy, baseline/medium privacy,
and low/soft privacy. However, if the terms privacy and conﬁdentiality
are interchangeable, we can have: limited conﬁdentiality, controllable
conﬁdentiality, and selective conﬁdentiality. Contextual privacy in particular refers to the ability to condition the disclosure of transaction
data (both metadata and content) on speciﬁc contextual factors such as
amount, frequency, regulatory triggers, or jurisdictional rules. It ensures
that information is revealed selectively, only when justiﬁed by the operational or regulatory context, rather than in a blanket or unconditional
manner. In our framework, this property is realized through the Privacy Accountability Description (PAD) technology, which orchestrates
disclosure policies under trustee and validator thresholds, thereby enforcing contextual privacy in CBDC payment transactions.In truth, the
levels of privacy are considered in relation to their degree of anonymity.
This is why some prefer the qualiﬁcations of full anonymity/full private,
semi-private, transparency. There is also a classiﬁcation according to
the type of cryptographic method involved: complete privacy, limited
privacy, and controllable privacy. Or, according to the type of data to
protect: identity privacy, conﬁdential transaction, data privacy or based
on the nature of synchronization: balance reconciliation and transactional reconciliation. All things considered, these concepts enrich the
lexical ﬁeld of privacy, bringing important subtleties. However, it is important never to confuse transparency (pseudo-anonymity), anonymity,
and conﬁdentiality, which, when considered separately, are distinct concepts and therefore not interchangeable. Finally, all these levels of privacy can be applied according to the nature of the stakeholders in the
CBDC ecosystem (central bank, commercial bank, users, other PSPs,
etc.).

1. Fully oﬄine payments do not require synchronization with a ledger
for recording and reconciliation operations. These transactions are
immediate and are most often associated with hardware wallets.
2. Intermittently oﬄine payments involve transferability properties
and call for delayed synchronization when an online connection is
available.
3. Staged oﬄine payments require a connection to the ledger to validate the payment made oﬄine. Therefore, they lack a transferability
property.
Furthermore, deploying an oﬄine CBDC payment solution poses a
signiﬁcant challenge, particularly in terms of security and privacy.
Security requirements
Security is a serious challenge in CBDC systems in general, and particularly in oﬄine payment solutions. It involves not only detecting cyber threats but also mitigating risks associated with vulnerabilities in the
ecosystem, notably by taking proactive and corrective measures. In the
context of this research, we particularly focus on the threats inherent in
transactions, especially when they are related to oﬄine payments. The
required security standards can be grouped into ﬁve properties [6]: no
double-spending, unforgeability, non-repudiation, veriﬁability, and integrity. Clearance is another property that any consumed value (coin or
balance) is eﬀectively deducted from committed states (oﬄine/online)
and cannot be re-presented (prevents ‘double incoming’ during reconciliation). To cover all these properties from an oﬄine perspective, two
types of security protocols are proposed, depending on the payment system design. There is the native layer-1 security protocol, which is the
same security protocol derived from the online payment infrastructure.
On the other hand, the non-native layer-2 protocol can perfectly integrate with any payment infrastructure [21].

Blockchain
Blockchain is a distributed system for writing, reading, and storing data, characterized by desirable features of decentralization, autonomy, veriﬁcation, immutability, traceability, and eﬃciency. It operates
cryptographic protocols and consensus mechanisms, which can be governed and optimized by a smart contract [23]. There are two types of
blockchains: permissioned blockchain and permissionless blockchain.
Cryptocurrencies are a use case of blockchain, which also has other
applications such as supply chain, insurance, healthcare, IoT, identity
management, agricultural sector, and more. Despite the attractiveness
of blockchain, it must overcome multiple challenges such as security and
privacy. Hence, there are various frameworks in the literature aimed at
making blockchain secure and private. Many of them utilize privacyenhancing technologies.

Privacy
Privacy is currently the most sought-after feature in the development of CBDCs, given its signiﬁcant implications [22]. Previously relegated to a secondary role in the design of CBDC systems, it is now
receiving more attention in the literature concerning the deployment of
4

## Page 5

Computer Networks 275 (2026) 111805

O. Atangana et al.

3.2. Technical background

public key (𝑎, −𝑎 ⋅ 𝑠 + 𝑒). Consequently, even if 𝑎, 𝑠, and 𝑒 are given, it is
easy to calculate 𝑎 ⋅ 𝑠 + 𝑒, but it is practically impossible to ﬁnd 𝑠 from
𝑎 and 𝑎 ⋅ 𝑠 + 𝑒. This public key is therefore used to encrypt a message 𝑚
(to which a smaller prime number 𝑝 is attached) so that the encryption
message is in the form 𝐶𝑚 = (𝐶1 , 𝐶2 ) with 𝐶1 = (−𝑎 ⋅ 𝑠 + 𝑒) + 𝑅0 + 𝑚𝑝 and
𝐶2 = 𝑎𝑅0 + 𝑅2 .

Blind signature
Blind signature is a cryptographic process whereby an entity signs a
message without knowing its content. In the context of electronic payment, Chaum initially proposed a ﬁrst version (ecash1), which he later
improved. This protocol aims to guarantee the payer’s privacy by breaking the link between the identity of the requester who asked the bank
to sign the coin and the transactions that they will carry out afterward.
In this paper, we adopt the scheme proposed in ecash2 [24]: Let 𝑓 (𝑥) be
the hash function representing the monetary value issued by the central
bank for a coin. Alice, a user of the system, generates a random number
𝑏 via her device. She then applies a signature using fractional powers
according to the calculation:

Trusted erxecution environment
Plenty of devices today incorporate additional dedicated hardware
elements to enhance the security of software applications, especially in
terms of data integrity and conﬁdentiality. This is the case with Trusted
Execution Environments found in modern smartphones, which enable
secure code execution and protect the data stored against various forms
of attacks. These include counterfeiting, side-channel attacks, jailbreaking, roll-back attacks, man-in-the-middle, and replay attacks. While a
variety of architectures are oﬀered in the market, this research adopts
the Global Platform standard that has standardized the TEE model [27].
In this paper, we will utilize this technology for the protection against
the aforementioned attacks, for biometric access, key generation, and
digital identity.

(𝑓 (𝑥)𝑏)𝑛
where 𝑏 is the blinding factor and 𝑛 is the exponent associated with the
coin’s denomination. The coin’s authenticity is guaranteed by its ability
to perform fractional power calculations on a number, a task diﬃcult
for other entities to replicate. Thus, the bank receiving the blinded coin
applies a signature of the form :
((𝑓 (𝑥)𝑏)𝑛 )1∕𝑛

Wallet-based digital identity
Several initiatives have emerged to standardize the digital identity
of individuals or organizations [28]. The frenzy for digital identity,
theorized since the deployment of the internet and accelerated since
the COVID-19 pandemic, is hardly surprising given the stakes in security, privacy, and accessibility to digital inclusion. Digital identity,
which can be deﬁned as the set of information available on the internet (including personal data, online behaviors, credentials, and digital
access rights) associated with a person or an organization, can be used
to authenticate and authorize individuals in online transactions, access
services, or personalize user experiences. Among the ﬁelds of application for digital identity, wallets are particularly notable, especially in
terms of security and fraud, as well as privacy and data control. While
the concept of identity is generally agreed upon, its implementation is
subject to caution, hence the emergence of various paradigms and implementation models. The paradigm proposed by EIDAS is widely explored in projects in Europe today, particularly concerning the EUDI
wallet [29].

mod 𝐶.

Then the coin is added to a mix network-a system designed to anonymize
electronic communications by mixing cryptographic messages from different users, making it extremely diﬃcult to trace the source or destination of a speciﬁc message-to an unspent coin list by the bank, which
then returns the signed coin to Alice. She can then apply the unblinding
via an operation that ’reverses’ the eﬀect of the blinding factor, possibly
a division by 𝑏 or an equivalent operation to cancel the eﬀect of 𝑏𝑛 and
make the coin usable.
zk-SNARK
A zk-SNARK is a variant of zero-knowledge proof based on three algorithms: key security parameters, a proof generator, and a proof veriﬁer [25]. The idea behind zk-SNARK is to allow the Veriﬁer to generate
a public argument associated with a corresponding private argument
known only to them, in order to verify a proof presented in the form
of a polynomial for a given witness. For instance, if we need to prove
the knowledge of solutions 𝑥 and 𝑦 for the equation 𝑥3 + 𝑦4 = 𝑧 without
revealing 𝑥 and 𝑦, we use our knowledge of 𝑥 and 𝑦 to construct a polynomial. The polynomial is the compilation of the initial calculation (often
represented as an arithmetic circuit). We then create a cryptographic
commitment based on this polynomial. In other words, the prover ’commits’ to certain values without revealing them, often using an elliptic
curve-based cryptosystem. We then provide proof that this commitment
corresponds to a solution of the equation, without revealing the values
of 𝑥 and 𝑦. Finally, three conditions should be satisﬁed: completeness,
succinctness, and soundness.

PAD Model
The PAD model is a model of secure and private information ﬂow
based on the exchange and decryption of shared keys, as proposed by
[30]. The use of PAD guarantees, on one hand, high availability, access,
and integrity of information for a designated receiver without the aid of
a trusted third party. On the other hand, it ensures that this information
remains secure and private for any other non-designated entity. Finally,
it guarantees transparency for all decryption operations and access to
information in such a way that it is impossible for a dishonest user to
deny being responsible for a malicious act.
The PAD system consists of three entities depicted in Fig. 2:

CKKS
Homomorphic encryption methods are cryptographic techniques for
performing arithmetic operations on encrypted data without the need
to decrypt them. In this vein, [26]proposes a homomorphic encryption
based on an eﬃcient approximate calculation process. This process uses
not integer numbers as is done in many cryptographic processes for the
calculation of asymmetrical keys, but rather integer degree polynomials.
If ℝ𝑞 is deﬁned as a suﬃciently large polynomial space (the encrypted
text space) with polynomials 𝑅0 , 𝑅1 , and 𝑅2 , it is possible to consider
performing operations from 𝑅1 to 𝑅2 and obtaining 𝑅3 , another polynomial so that the operations performed from 𝑅2 to 𝑅1 correspond homomorphically to the underlying clear text operations. Speciﬁcally, for
a palette of polynomials 𝑎, 𝑠, 𝑒, and 𝑏 in ℝ𝑞 where 𝑞 is the coeﬃcient
modulus, 𝑛 the degree of the polynomial space, 𝑎 and 𝑏 being uniformly
random and 𝑒, a random "small" one, one can complexify the calculation of secret key 𝑠 (which has the coeﬃcients ±1 or 0) to part of the

•

One or more accountability ledgers with the properties of ’appendonly’, tamper-proof, and time-stamped.
• Several trustees who are third-party service providers whose role is
to respond to valid decryption requests and publish messages in the
accountability ledger that initiate decryption.
• Validators are service providers that ensure the maintenance and
veriﬁcation of the ledger.
For a secret that Alice wants to share with Bob, Alice ﬁrst encrypts
the secret with a symmetric key known only to her. Then she uses a
cryptographic secret sharing scheme to fragment the secret key and distribute each encrypted part to the trustees and validators. It is impossible to decrypt the information related to the key unless there is a broad
coalition of trustees.
5

## Page 6

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 2. Simpliﬁed PAD schematic. See this link for more details.

•

To access Alice’s secret, Bob can publish a request in the accountability ledger, to which the trustees and validators will respond with a
decryption of the shared secret, also posted in the ledger. [31] proposed
integrating PAD into blockchain to oﬀer contextual privacy for CBDC
payments. Our proposed solution is based on this intuition.

Attribute Provider, the entity in charge of providing oﬃcial identiﬁcation documents on the individual or legal entity.
• Identity Provider, which veriﬁes and attests that the user of the eWallet is based on oﬃcial identiﬁcation documents. It has access to the
user’s real identity. It has read access to the list of PIDs with suspicious transactions.
• Personal Identiﬁcation Data (PID) provider, which issues the PID
for eID Wallet holders in compliance with the Identity Veriﬁcation
Provider’s requirements.
• Qualiﬁed Trust Service Provider (qTSP), the certiﬁcation authority
in charge of issuing certiﬁcates or electronic attribute attestations.
• Wallet providers, the authority responsible for providing the digital
wallet-PAD to end-users.
• Regulatory Identity Overseer (RIO), here the Payment Interface
Provider (PIP), which ensures the connection link between the PAD
system and eID wallet for CBDC payment. It connects the pseudonymous identities of users with anonymous account(s) in a CBDC shard
ledger. It generates pseudonymous identities with a user’s eID without having access to the user’s real identity. Before carrying out an
online transaction, the RIO checks the validity of the user’s eID. It
also ensures that transactions are carried out in accordance with regulatory compliance. It also publishes a list of eID with suspicious
transactions.
• PAD System described in the Section 4.
• Financial intermediaries (Commercial bank or Payment service), the
intermediaries that handle their clients’ KYC in a traditional manner,
or alternatively, an onboarding based on eKYC relying on the client’s
PID, and manage distribution.
• CBDC ledger managed by the central bank, which issues and controls
the currency.
• Regulatory Authority: it has read access to suspect PIDs and, if necessary, initiates a PID revocation operation with the Identity Veriﬁcation Provider. Fig. 3 shows the overview of the proposed model.

4. The proposed model
4.1. Security model
Transaction system composition: The system involves three entities.
Noticeably, 𝐴device , a secure device operated by Alice (payer), 𝐵device , a
secure device operated by Bob (payee), and 𝐶account , a pseudonymous
account registered on the blockchain and associated with Carla (payee
without a device).
CBDC architecture: The proposed system is based on a two-tier architecture. This involves the participation of commercial bank intermediaries for KYC operations for withdrawals and deposits.
TEE: We assume the system has a secure hardware module type TEE,
discussed in the Section 3.2. This protects against man-in-the-middle, replay/rollback attacks in oﬄine mode. Indeed, this module secures fund
transfer operations launched by the trusted application oriented towards
FLOSS (Free/Libre and Open Source Software), notably by leveraging
the advantages of data conﬁdentiality and integrity in Alice.
Oﬄine Block-PAD wallet: Alice does not have access to her private
key, and it is not possible to bypass the oﬄine Block-PAD wallet for ofﬂine transactions and online deposits (synchronization). Moreover, the
device possesses an atomicity feature, implying that all required steps
must be respected for any transaction, otherwise, the transaction will
fail.
Communication Channel: We assume the exchange channel between
Alice and Bob’s devices via NFC or Bluetooth is entirely secure, as well
as the online communications between diﬀerent entities with a protocol
type TLS.
Biometrics and Credentials: Access to the device for any operation is
protected and controlled by passwords and ﬁngerprints.
Cryptographic Methods: The system relies on correctly implemented
cryptographic protocols, including blind signature as proposed in
ecash2, zk-SNARK, asymmetric encryption with shared secret key, and
CKKS.

5. System operations
For clarity of presentation, Table 2 summarizes the mapping between
process steps, their corresponding algorithms, and the sections where
they are described.

4.2. System description

5.1. Onboarding phase

The global system is composed of:
The eIDWallet ecosystem based on:

The onboarding phase begins with obtaining an eID wallet. This is
a private and secure wallet, requiring FLOSS, open-source software. It
6

## Page 7

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 3. Overview of the proposed model. In addition to the client-facing ﬂows, the commercial bank shard is connected to the central bank core ledger through a
ledger shard link. This connection, consistent with the two-tier architecture in Fig. 1, provides an implicit channel for transaction veriﬁcation and audit.
Table 2
Crosswalk of process steps, algorithms, and sections.
Process step

Description

Algorithm(s)

Section

Onboarding (eID)
Withdrawal
Oﬄine: Alice → Bob
Oﬄine: Bob → Carla
Online deposit / transfer (PAD)
Funding/Defunding

Identity creation and veriﬁcation
Withdrawal with blinding
Negotiation + veriﬁcation + storage
Consecutive payment (oﬄine & hybrid modes)
Veriﬁcation + PAD securing + update
RIO claim & update

Algorithms 1 and 2
– (procedure described)
Algorithms 3–5
Algorithm 6
Algorithms 7–10
Algorithm 11

5.1
5.2
5.3
5.4
5.5–5.6
5.7

is assumed that coins cannot be stolen due to enhanced biometric security. Alice obtains her eID wallet from the wallet provider. Each eID
wallet corresponds to an account (individual or business). Each account
is linked to a pair of cryptographic keys and Alice’s credentials in the
form of a digital certiﬁcate issued by the identiﬁer provider. These credentials link Alice’s real identity with the application. It is also assumed
that Alice’s digital identity can be revoked and updated. The term ’authorities’ refers to the trustees and validators. The process unfolds as
follows.

ice can generate a set of short term asymmetric keys:
(1)

(𝑒𝐼𝐷𝐴 , 𝐴pk , 𝐴pvk , 𝐴pkcert ) → 𝐴e_wallet

(2)

(𝑒𝐼𝐷𝐵 , 𝐵pk , 𝐵pvk , 𝐵pkcert ) → 𝐵e_wallet

(1) → 𝜙(𝑒𝐼𝐷𝐴 , 𝐴pk , 𝐴pkcert , 𝑅pk )
(2) → 𝜙(𝑒𝐼𝐷𝐵 , 𝐵pk , 𝐵pkcert , 𝑅pk )
(3)

{(𝐾𝐴priv , 𝐾𝐴pub )}𝑖∈{1…𝑝} ← PseudonymGen

(4)

{(𝐾𝐵priv , 𝐾𝐵pub )}𝑖∈{1…𝑝} ← PseudonymGen

𝑖

𝑖

𝑖

𝑖

During online transactions, she uses the pseudonymous account information. The regulator, designated as Regulatory Identity Overseer
(RIO), oversees regulatory compliance and identity veriﬁcation. The RIO
does not have access to Alice’s real identity but only to her eID and
Alice’s certiﬁcate’s public key. The central bank and the client’s commercial bank do not have access to this second part of the onboarding.
Table 3 showcases the notation of RIO Onboarding.
Fig. 4 showcases the outcomes of simulation for 800 users in digital
identity onboarding.

1. Alice downloads the eID wallet in a secure gallery application such
as Google Play or App Store and obtains directly the public key of
the ID provider. Then, she inserts her password and her personal
information for the veriﬁcation by the ID provider. The ID provider
veriﬁes the user’s information with the Attribute Provider. Once the
veriﬁcation is completed and approved, the ID provider generates
the credential structure follows the Algorithm 1.
2. Bank Onboarding: This phase assumes Alice already has an account
with her bank. The eKYC process with her bank is as usual. The process of client registration protocol for CBDC account on the server
𝑆𝑣 follows the Algorithm 2.
3. RIO Complete Onboarding Integration: 𝐴e_wallet sends to RIO its credentials for authentication. RIO can then generate the pseudonymous accounts associated with Alice’s virtual identity. For each real
public key certiﬁed 𝐴pk _cert associated with her virtual identity Al-

5.2. Withdrawal Phase
The withdrawal process usually follows the blind signature method
determined in Section 4.2. Alice withdraws coins from her online balance, which are signed by the central bank following the blind signature
process.
7

## Page 8

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 4. Simulation of users digital identity onboarding.

Algorithm 1 Credential structure and key generation.

Algorithm 2 Client registration protocol.

1: Generate credential structure with Identity Provider (IP) information and claims:

1: Alice’s e_wallet generates a pair of zk-SNARK parameters (𝐽𝑘 , 𝑍𝑘 ):
(𝐽𝑘 , 𝑍𝑘 ) ← zKeyGen()

Ω(IP, 𝜇) → 𝑐𝑠

2: Then Alice’s e_wallet shares 𝑉𝑐 with the server 𝑆𝑣 for veriﬁcation:

2: where 𝑐𝑠 is the Credential structure with Identity Provider (IP) information and a set of 𝜇 claims.
3: Alice generates a pair of asymmetric keys and sends her public key
to the ID Provider:

𝑉 (𝑐𝐸 , 𝐴pk , 𝑐𝐾, 𝑐𝑉 ) → 𝑉𝑐
3: where 𝑉𝑐 is the boolean result of the veriﬁcation, true if both the
claim and the signature are valid:

(𝐴pvk , 𝐴pk ) ← KeyGen()

𝑆𝑣 ← 𝑃 (𝑉𝑐 )
Ξ ← Output(𝑉𝑐 )

4: The IP signs the credentials with its private key 𝐼𝑃pvk and associates
them with Alice’s public key, 𝐴pvk :

4: Then the server checks if 𝐴e_wallet is already registered:

Ω𝐸 (cs, 𝐼𝑃pvk ) → (𝑐𝐸 , 𝐴pk )

If (𝐴pk , ∅), the server adds 𝐴pk to the clients database:𝛽 ← 𝑆𝑣 (𝐴pk )

5: where (𝑐𝐸 , 𝐴pk ) is the public key associated with the signed credential structure:

5: Else, it cancels the request.

(𝑐𝐸 , 𝐴pk ) → eID𝐴

Then the server initialises Alice current’s balance to 0:𝐴𝐶𝐵 ← 0

6: Finally, the ID provider shares the hashed claims of the credential
structure and its public key for veriﬁcation to 𝐴e_wallet :

Creates a 𝐴pk _cert and sends it to 𝐴e_wallet .

𝐻(𝑐𝑐 ) → 𝐻𝑐
Table 3
Notation of RIO Onboarding.

7:
𝑃 (𝑐𝐸 , 𝐴pk , 𝑐𝐾, 𝑐𝑉 ) → 𝐴e_wallet
8: where 𝑐𝐾 is the key of the claim to be veriﬁed, and 𝑐𝑉 is the value
of the claim to be veriﬁed.

The coins are then transferred to her oﬄine wallet. The central bank
blindly signs the coins using its private key. Knowing that 𝑃 𝑘𝑏 is its
public key, we obtain ﬁnally as output an unblinded coin 𝐹𝑠 .
Then Alice performs the oﬄine transaction which is outlined
by the following process unfolds as explained in [2] but with
some modiﬁcations. Table 4 presents the notations of Oﬄine Sealed
Transaction.

Variable

Description

𝑒𝐼𝐷𝐴
𝐴pk
{(𝐾𝐴priv𝑖 , 𝐾𝐴pub𝑖 )}𝑖∈{1…𝑝}
𝑒𝐼𝐷𝐵
𝐵pk
{(𝐾𝐵priv𝑖 , 𝐾𝐵pub𝑖 )}𝑖∈{1…𝑝}
𝑒𝐼𝐷𝐶
𝐶pk
{(𝐾𝐶priv𝑖 , 𝐾𝐶pub𝑖 )}𝑖∈{1…𝑝}

Alice’s virtual identity
Alice’s virtual public key
A set of Alice’s short-term keys
Bob’s virtual identity
Bob’s virtual public key
A set of Bob’s short-term keys
Carla’s virtual identity
Carla’s public key
A set of Carla’s short-term keys

5.5. Scenario of Bob paying Carla
We now consider the case where Bob pays Carla, who does not have
a secure device but has a pseudonymous account registered on the CBDC
ledger. Table 5 presents notations for the Algorithm 6. The Algorithm 6
showcases the steps of payment procedure in the case of this scenario.
Fig. 7 showcases the Data structure for consecutive oﬄine transaction CBDC.

5.3. Contract negotiation
The ﬁrst step of this oﬄine transaction phase consists of contract negotiation between Alice and Bob. The Algorithm 3 presents all the steps
of the process, while the Algorithms 4 and 5 showcase, respectively, the
process of contract checking and coin storage.

5.6. Online deposit/transfer via PAD
5.4. Contract checking: 𝑉 (Γ()) → 𝜁
A user may deposit into their own account or transfer to another
user’s pseudonymous account. For instance, to make a deposit into
Carla’s account, Bob uses the eIDWallet application installed on his device. The deposit and transfer ﬂows are managed via the RIO, which

Fig. 5 depicts the main step of oﬄine transaction between Alice and
Bob while Fig. 6 depicts the result of transaction veriﬁcation between
Alice and Bob.
8

## Page 9

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 5. Oﬄine transaction between Alice and Bob.

Fig. 6. Overview of transaction veriﬁcation result between Alice and Bob.

veriﬁes Bob’s credentials before enabling payment.

used; if the coin is authentic and unique, it is followed by the veriﬁcation
of the zk-SNARK proof at the PAD level. The Algorithm 7 presents the
process of transaction veriﬁcation using zk-SNARK proof.

Ξ ← Output(𝑉𝑐 ).
If the credentials are successfully veriﬁed, the RIO initiates the corresponding payment or deposit.
Fig. 8 depicts the result simulation of online deposit.

Step 0.1: Verify zk-SNARK Proof for Double Spending

Step 0: Transaction Veriﬁcation

If the zk-SNARK proof veriﬁcation is successful, the RIO’s wallet
sends a receipt to the wallet for the coin’s destruction (exactly as in the
oﬄine payment process between Alice and Bob). The next step consists
of securing the secret, which is a blinded coin 𝐹𝑠 , by using the protocol
proposed in section 3.3 of [30]. The Algorithm 8 presents the process
for securing the blinded coin.

RIO’s wallet checks the transaction in the same way as a transaction
between Alice and Bob. The diﬀerence is that the RIO has access to all
the coins signed by the central bank and already distributed to users.
Therefore, it can verify that the deposited coin has not already been
9

## Page 10

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 7. Data structure for CBDC consecutive oﬄine transaction.

Fig. 8. Online deposit simulation.

Table 4
Notations of Oﬄine Sealed Transaction.

Table 5
Notations for Algorithm 6.

Notations

Description

Notation

Description

𝐵pk _cert
𝑅
𝜎
𝑃 𝑘𝑏
𝐴device
𝐵device
𝑃req
Σ𝐶
𝐶𝑛
𝑊
Π
𝜁1
𝜁2
𝜁3
𝜁4
𝜎
𝑁
𝑅pk
𝛼
𝐹𝑠

Bob’s certiﬁed public key
Receiver
Secure transaction channel
Public key of the central bank
Alice’s device
Bob’s device
Payment request
Signed contract
Contract
Witness
zk-SNARK proof of payment
Decision bit for Alice’s public key checking
Decision bit for coin’s authenticity
Decision bit for receiver transaction checking
Decision bit for zk-SNARK proof checking
Coin’s storage
Nonce
RIO’s public key
Receiver’s pseudonymous identity
Unblinded coin

𝐷
𝐿
𝑇
𝐾sym
𝑅sym
(𝑖)
{𝐾pubt
}

Decision bit for double spending veriﬁcation
Ledger Address
Token value
Symmetric key
Mask for symmetric key
Set of trustees’ public keys

(𝑗)
{𝐾pubv
}

Set of validators’ public keys

𝑁𝑡
𝑅𝑠𝑓

Number of trustees
Retrieved secret function

Step 2: PIP Requesting a Decryption
RIO veriﬁes the transaction threshold, creates the decryption request
and posts it anonymously to the ledger.
If 𝑇 > 𝜃, then
𝜙 ← 𝐺(𝐻(𝑇 ), 𝐾Bpub )
Step 3 : Bob Recovers and Decrypts Secret function

Step 1: Securing the blinded coin 𝐹𝑠
Finally, the RIO sends Data to the PAD System with zk-SNARK Proof
and provides Token value 𝑇 and Veriﬁcation Key 𝐾verif to Bob.

𝑅𝑠𝑓 ← 𝐺(𝐸 −1 (𝐸 −1 (𝐶 ′ , 𝐾Bpriv ), 𝐾verif ))
10

## Page 11

Computer Networks 275 (2026) 111805

O. Atangana et al.

Algorithm 5 Coin’s storage procedure.

Algorithm 3 Contract negotiation.

1: Bob’s device receives acknowledgment from Alice’s device.
2: They store the coin:

1: Alice and Bob agree on a contract for the payment.
2: Bob’s device selects the attestation of the receiver:

Δ() → Λ2

𝑅 ← 𝐵pkcert

3: Conﬁrm the coin has been stored:

3: Bob’s and Alice’s devices establish a secure transaction via NFC or
Bluetooth:

Λ2 = 1
4: Store the e-coin securely:

𝜎 ← 𝑆(𝐴device , 𝐵device )

𝜎 ← 𝑆(𝐹𝑠 )

4: Bob initiates a payment request to Alice.
𝑃req ← 𝑃 (𝐵 → 𝐴)
5: Alice inputs an e-coin corresponding to the requested amount:

Algorithm 6 Payment procedure from Bob to Carla.

𝐹𝑠 ← 𝜀(𝐴)

1: — Oﬄine Phase —
2: Bob and Carla agree on a contract for the payment.
3: Bob’s wallet requires him to select the attestation of the RIO:

6: Alice signs the contract using the e-coin:
Σ𝐶 ← Σ(𝐹𝑠 , 𝐶𝑛 )

𝑅 ← 𝑅pkcert

7: Generate the zk-SNARK proof of payment:
Π ← Φ(𝐹𝑠 , 𝐽𝑘 , 𝑊 )

4: Carla provides Bob one of her public pseudonym identities.
5: Bob inputs an e-coin corresponding to the desired amount:

8: Encrypt the transaction data:

𝐹𝑠 ← 𝜀(𝐵)

Θencr ← 𝜀𝑇 (Π, 𝐵pk , 𝐶𝑛 , Σ𝐶 , 𝑁, 𝑍𝑘 , 𝐴pvk )

6: Bob’s wallet signs the contract using the e-coin:

9: Send the encrypted data to Bob, associating it with Bob’s public key:

Σ𝐶 ← Σ(𝐹𝑠 , 𝐶𝑛 )

Γ() → (𝑅, 𝜎, 𝑃req , 𝐴pk , 𝐴pkcert , Θencr )

7: Generate the zk-SNARK proof of payment:
Π ← Φ(𝐹𝑠 , 𝐽𝑘 , 𝑊 )
Algorithm 4 Contract checking procedure.

8: Encrypt the transaction data:

1: Check Alice’s public key:

Θencr ← 𝜀𝑇 (Π, 𝑅pk , 𝐶𝑛 , Σ𝐶 , 𝑁, 𝑍𝑘 , 𝐵pvk , 𝛼)

𝜁1 ← Γ𝐴pk (𝐴pkcert , 𝐴pk )

9: — Online Phase (synchronization with RIO) —
10: Send the encrypted data to RIO, associating it with RIO’s public key:

2: if 𝜁1 = 0 then
3:
Transaction fails.
4: else
5:
Check coin’s authenticity:

Γ() → (𝑅, 𝐵pk , 𝑅pk , 𝐵pkcert , Θencr )
11: RIO: After successful execution of Algorithms 7–9, issue receipt 𝜆
bound to Carla’s pseudonymous account 𝛼.
12: Carla: Observes 𝜆 and updated balance upon next connection.

𝜁2 ← Γ𝐹𝑠 (𝐹𝑠 , 𝑃 𝑘𝑏 )
6:
7:
8:
9:

if 𝜁2 = 0 then
Transaction fails.
else
Check receiver’s transaction:

Algorithm 7 Verify zk-SNARK proof to check for double spending at the
PAD level.
1: 𝐷 ← 𝐹 (Π, 𝑍𝑘 )
2: if 𝐷 = 0 ∨ 𝜆(Π, 𝐿) then
3: 𝜓(𝐿, "Alert")
4: else
5: 𝜓(𝐿, "Ok")
6: end if

𝜁3 ← Γ𝐵pk (𝐵pk )
10:
11:
12:
13:

if 𝜁3 = 0 then
Transaction aborts.
else
Check zk-SNARK proof:
𝜁4 ← ΓΠ (Π, 𝑍𝑘 , 𝐹𝑠 )

14:
15:
16:
17:

if 𝜁4 = 0 then
Transaction fails.
else
Bob’s device sends an acknowledgment to Alice if the contract checking succeeds:

In this step, Bob has to retrieve and decode a secret. Bob uses his
private key to decrypt the secret, and he uses Alice’s veriﬁcation key
to conﬁrm that it is authentic. After veriﬁcation, he uses the decrypted
content to reassemble the secret and retrieves the original secret data.
The ﬁrst step in the PIP Decryption Request function is to look over
the transaction data. A decryption request is created when the value of
the token surpasses a predetermined threshold or when the transaction
occurs frequently. After that, this request is made public for decryption,
and the results are given back. No more action is taken if the transaction
does not meet the requirements for a deeper examination. Fig. 9 depicts
the result simulation of decryption process.

Δ() → Λ1
18:
Λ1 = 1
19:
end if
20:
end if
21: end if
22: end if
11

## Page 12

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 9. Result simulation of decryption process.

Algorithm 8 Securing the blinded coin 𝐹𝑠 .

Algorithm 9 Balance updating procedure.
1: Key Generation:

1: if 𝜓(𝐿, "Ok") then
2:
Encrypt Secret and Token with symmetric key:

GenKey() → (𝑅pvk , (𝑅pk0 , 𝑅pk1 ))

𝐶 ← 𝐸(𝑇 , 𝐹𝑠 , 𝐾sym )
3:

𝑅pk0 = −𝑎𝜔 + 𝑒

Sign and Encrypt Content with Bob’s public key:

𝑅pk1 = 𝑎

𝐶 ′ ← 𝐸(𝐸(𝑇 , 𝐹𝑠 , 𝐾sym , 𝐾Apriv ), 𝐾Bpub )
4:

𝑆𝑚 ← 𝐾sym ⊕ 𝑅sym ,
5:

Enc(𝑇 , 𝑅pk ) → (𝑐0 , 𝑐1 )

𝑆𝑡 ← 𝑃 (𝑆𝑚 , 𝑁𝑡 )

𝑐0 = 𝑅pk0 ⋅ 𝑟 + 𝑒0 + 𝑇 𝑡

Generate Validator Shares and Encrypt Trustee Hashes:
𝑉 ← 𝑃 (𝑅, 𝐾Bpub , 𝑁𝑣 ),

6:

2: Encryption:

Mask Symmetric Key and Share function for trustees:

𝑐1 = 𝑅pk1 ⋅ 𝑟 + 𝑒1

(𝑗)
𝐸ℎ𝑣 ← 𝐸(𝐻(𝑆𝑡 ), {𝐾pubv
})

3: Update Alice or Bob or Carla account:

Encrypt Shares for Trustees and Validators:

Upd(𝑐𝐵 , 𝑇 , op, 𝑅pk , 𝛼) → 𝑐𝐵 ′

(𝑗)
(𝑖)
𝐸𝑡 , 𝐸𝑣 ← 𝐸(𝑃 (𝑆𝑚 , 𝑉 , {𝐾pubt
}, 𝐾pubv
))

7:

𝛼 ∈ {𝐾𝐴pub𝑖 , 𝐾𝐵pub𝑖 , 𝐾𝐶pub𝑖 }𝑖∈{1…𝑝}

Data Transmission and storage:

𝑐𝑇 = Enc(𝑇 , 𝑅pk )

𝐷𝑡𝑠 ← (𝐸𝑡 , 𝐸𝑣 , 𝐻(𝑇 ), 𝐶 ′ )

4: if op = "INC" then
5:

8: end if

𝑐𝐵 ′ = 𝑐𝐵 + 𝑐𝑇
Table 6
Notations for Algorithm 9.
Notation

Meaning

𝑞
𝑡
𝑛
MAXB
𝜔
𝑒
𝑟, 𝑒0 , 𝑒1 , 𝑎
(𝑅pk0 , 𝑅pk1 )
𝑅pk
𝛼
op
𝑅pvk
𝑇
𝐶𝑚
𝐶𝑏

A large prime number
Another prime number for the message
Degree of polynomial
Maximum allowed balance
A random polynomial of degree 𝑛
A small noise
Random polynomials of degree 𝑛
Pair of keys
Public key of PIP
Recipient’s pseudonym (Alice, Bob, or Carla)
Operation type
Random polynomials of degree 𝑛 (RIO’s private key)
Token value (coin’s amount)
Current amount
Current balance

6: if Dec(𝑐𝐵′ , 𝑅pvk , 𝑡, 𝑞) > MAXB then
7:
return error
8: end if
9: return 𝑐𝐵′
10: else
11: if op = "DEC" then
12:
return 𝑐𝐵 + (−𝑐𝑇 )
13: end if
14: end if

a visual representation following the deployment of the smart contract
for a transaction in the PAD Ledger, while the Fig. 11 illustrates the
recording of the transaction in the blockchain PAD Ledger. The balance
decryption procedure is described in Algorithm 10.
5.7. Funding/Defunding operation

Step 4: Balance Updating

The PAD adds a layer of privacy protection for transferring funds
into a Central Bank Digital Currency (CBDC) account from a traditional
bank account, and vice versa. When Alice transfers money from her regular ﬁat bank account to her CBDC account, the bank can see the connection between her personal identity and her unique CBDC account

The PAD ledger encrypts the value token and sends it to the smart
contract address shard ledger. Table 6 is the Notations for Algorithm 9
which is the process of Balance decryption Procedure. Fig. 10 provides
12

## Page 13

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 10. Smart contract deployment for transaction in PAD Ledger.

Fig. 11. Overview of recording transaction in PAD Ledger.

Algorithm 10 Balance decryption procedure.
1: Decryption:
Dec(𝑐, 𝑅pvk , 𝑡, 𝑞) → 𝐵

Algorithm 11 Funding process.
1: Alice deposits an amount 𝑇 from her bank account 𝐴𝐵 to the RIO’s
wallet 𝑅𝑤 with a PAD process:

′

𝑃𝑇 ← 𝜅(𝐴𝐵 , 𝑇 , 𝑅pk )

𝐵 ′ = round((𝑐0 + 𝑐1 ⋅ 𝑅pvk )∕𝑡) mod 𝑞

2: A cryptographic claim check is issued to Alice:

2: The smart contract performs the homomorphic operation and updates the balance:
3: if operationType is INC then
4: if balance does not exceed MAXB then
5:
update Recipient’s balance
6: else
7:
return an error
8: end if
9: else if operationType is DEC then
10: update Recipient’s balance
11: end if

𝜆𝐴 ← 𝜂(𝑃𝑇 )
3: Alice re-randomizes the claim check:
𝜆′𝐴 ← 𝜂 ′ (𝜆𝐴 )

Table 7
Notations for Algorithm 11.
Notation

Description

𝐴𝐵
𝑅𝑤
𝜆𝐴
𝜆′𝐴

Alice’s bank account
RIO’s wallet
Cryptographic claim check
Re-randomized claim check

6. Security analysis

identiﬁer. However, with the PAD integration, Alice ﬁrst deposits funds
into a special wallet on the CBDC network, a RIO wallet, and receives
a cryptographic claim check, 𝜆𝐴 , which she can re-randomize to break
the traceability to her original transaction. Table 7 presents the notations of the Algorithm 11 which showcases the implementation of these
operations.
Fig. 12 illustrates the materialization of a funding transaction following the deployment of the smart contract, while Fig. 13 shows the
recording of several funding transactions in the blockchain through the
Ganache tool. Alice then broadcasts to the CBDC PAD chain, which includes trustees, validators, the PAD channel, and the CBDC shard ledger,
to update her account.
Fig. 14 depicts the high-level functionnal map of PAD system centric
Blockchain for CBDC payments.

We propose to analyze the entirety of the system. By reassessing the
risks associated with the PAD, previously presented in [30], with fresh
insight and a new approach, we then evaluate the rest of the system and
implement corrective measures.

6.1. Coalition attacks against secret sharing
The most imminent risk for Bob is that trustees and validators collaborate to discover Bob’s secret "s". To preserve his secret, it is vital that
Bob ensures the PIP or the recipient "Carla" can only decrypt the secret
under certain conditions. We state the following theorem:
13

## Page 14

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 12. Funding transaction following the deployment of the smart contract.

Fig. 13. recording of several funding transactions in the blockchain through the Ganache tool

Theorem 1. We assume the secret sharing thresholds for the trustees 𝑘1
and validators 𝑘2 . For any coalition involving 𝑘1 trustees and 𝑘2 validators
and Bob having enough information to decrypt "s", it is then possible to drasti𝑘
cally reduce the probability of such a coalition by adjusting the ratios 𝑛1 and

sponses. To avoid Censorship Attacks that reduce the risk of insuﬃcient
responses from trustees, we state the following theorem:
Theorem 2: For a number of corrupted authorities 𝑎 present in the system, there exists an honest majority such that 𝑛 = 2𝑎 + 1. Thus, for a number
𝑏 of trustees (or validators) having left the system, we need that 𝑎 + 𝑏 < 𝑡,
where 𝑡 is the threshold.
Theorem 3: In a system where secrets are distributed, the protocol’s
progression is conditioned by the publication of at least 𝑘 elements out of 𝑛
by the trustees. Thus, blocking this process requires the collusion of at least
𝑛 − 𝑘 + 1 unscrupulous trustees. Ideally, 𝑘 is chosen to be less than half of
𝑛 to minimize the probability of such coalitions. This logic also extends to
validators and their speciﬁc parameters 𝑘0 , 𝑛0 .

1

𝑘2
, where 𝑛1 and 𝑛2 represent the total number of trustees and validators,
𝑛2

respectively.

6.2. Coalition attacks against Carla’s identity
This attack would involve trustees pooling their actions to bias the
process based on the identity of the requester. The identity should only
be revealed by the RIO after the validators’ calculations. Note that the
boycott or publishing of invalid parts by trustees could slow down the
process in the PAD system. Validators, in their role as guarantors, are
tasked with identifying any invalid trustee part on the PAD blockchain
channel.

6.4. Bob fraud risk: Double incoming
In oﬄine payment systems based on account synchronization on the
ledger, there is a signiﬁcant risk of Bob committing double incoming
fraud. This involves using the same monetary unit to receive an amount
of money in his oﬄine account (for example, a CBDC smart card he
owns) and in his online account. Even if the token itself is unusable due
to cryptographic techniques, this often creates token synchronization
problems. Currently, this is unlikely to happen. Indeed, in our protocol,

6.3. Corrupted trustees and validators risk
A corrupted authority is either an authority that leaves the system
holding a valid secret part or a trustee who boycotts by not providing re14

## Page 15

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 14. PAD system-centric Blockchain for CBDC payments. Annotations A1-A6 indicate the main process steps: A1 - Onboarding (Algs. 1-2), A2 - Withdrawal
(Alg. 3), A3 - Oﬄine Alice→Bob (Algs. 4-5), A4 - Oﬄine Bob→Carla (Alg. 6), A5 - Online deposit/transfer via PAD (Algs. 7-10), A6 - Funding/Defunding (Alg. 11).
See also Table 2 for a summary crosswalk.

the online deposit phase requires making at least one oﬄine payment
before making a deposit. The fact is that once the transaction is completed (with the receipt) by the user, he is deprived of his coin through a
destruction operation. To enhance security, one can consider including
a "Redeem Online" tag in the payment transaction frame, which will be
taken into account during the online veriﬁcation of the zk-SNARK proof.

Algorithm 12 Command processing procedure.
1: Initialization:
2: 𝐾() → (𝐶𝑛 = 0, 𝑛 = 0, Activate 𝐶𝑛 )
3: Main Loop:
4: while True do
5: if 𝐶𝑛 < 𝑇 then
6:
Φcmd ← CheckForCommands()
7:
if Φcmd = 1 then
8:
Process the deposit or withdrawal commands
9:
else
10:
Wait for new commands
11:
end if
12: else
13:
if 𝑛 > 𝑁 then
14:
Proceed with the normal protocol
15:
end if
16:
if Φcmd = 1 then
17:
Process the deposit or withdrawal commands
18:
end if
19: end if
20: end while
21: Utilized Functions (description only):
22: CheckForCommands(): Returns 1 if deposit or withdrawal commands are available, 0 otherwise.
23: ProcessCommands(commands): Executes the available deposit or
withdrawal commands.

6.5. DDoS attacks vulnerability risk
Denial of service attacks capable of defeating the system can be orchestrated during the withdrawal and deposit phase. Although the withdrawal and deposit process does not occur on the same communication
channel, the system may still be vulnerable to denial of service attacks,
notably the RIO managing decryption and transaction recording operations. To mitigate this, one can limit the number of anonymous accounts
and deﬁne a transaction threshold per user (here it refers to a pseudonymous account). Before each transaction, we can proceed with a threshold veriﬁcation implemented with the following Algorithm 12: Let 𝐶𝑛
be the counter initialized to 0, which increases by 1 every second. Let 𝑇
be the time threshold for the ﬁrst phase of command processing, and let
𝑁 be the maximum number of commands to process before changing
the protocol, with 𝑛, the command counter, initialized to 0. The system
alternates between an active waiting phase for new commands and a
command processing phase, adjusting its behavior based on the elapsed
time and the number of processed commands.
6.6. Risks related to smart contracts and inherent to the blockchain
network
Blockchain has various risks, including denial of service attacks and
endpoint security [23]. This context focuses on smart contract vulnerabilities, which are crucial in verifying zk-SNARK payment proofs,
recording PAD requests, and anonymously updating accounts in the
CBDC ledger. Smart contract failures can have severe consequences,

such as bad randomness, ether reception forcing, incorrect interfaces,
integer overﬂow, race conditions, re-entrancy, unchecked external calls,
unprotected functions, and variable shadowing. Therefore, thorough
testing and auditing of smart contracts before deployment, using ded15

## Page 16

Computer Networks 275 (2026) 111805

O. Atangana et al.

icated tools or AI [32], and post-deployment anomaly detection monitoring are essential.

Overall, the objective is to prototype a secure system for issuing, transferring, and depositing tokens (coins) that guarantees privacy with an
extensible payment lifecycle management framework.
Our prototype is implemented in Python 3.9.2 and runs on Windows
10 Professional, deployed on a computer equipped with an Intel(R)
Core(TM) i7-5700HQ CPU @ 2.70GHz (64-bit, 16GB DDR3, 512GB
SSD). We utilize the PyCryptodome library for cryptographic operations.
Symmetric encryption is instantiated with SHA256 for indexing simulated proofs and AES in GCM mode, an authenticated mode ensuring
conﬁdentiality and integrity. The integration of cryptographic randomness provides the necessary entropy for generating symmetric keys, initialization vectors, etc. These symmetric keys are 256 bits in length.
For AES key transportation, we use hybrid encryption combining
PKCS1_OAEP with RSA (2048-bit) to perform asymmetric encryption
for secure symmetric key distribution. For implementing hashing functions, we use Python’s standard hashlib module, primarily for coin
identiﬁer derivation (coin_id, etc.) and simulated blind signatures
(sign_blinded_hash).
For the on-chain implementation, we deployed smart contracts on
Remix v0.61.1 [33]. This platform, dedicated to Ethereum smart contract development and testing, is used in conjunction with Ganache
[34]. Ganache allows deploying Ethereum smart contracts in a local
blockchain environment, enabling transaction simulations.
For payment operations, we opted for the Ipv8 [35] communication
protocol. Ipv8 encapsulates and transmits encrypted transactions endto-end in a peer-to-peer manner without relying on centralized servers,
thereby enhancing privacy protection. The pyipv8 package is integrated
with NFC and Bluetooth protocols to enable autonomous transactions
and ensure resilience in the absence of internet connectivity.
The implementation of our Block-PAD framework, along with all
simulation notebooks and scripts, is publicly available in our GitHub
repository [36], ensuring reproducibility of the reported results.

6.7. Security properties evaluation
Traceability
All actions and transactions in the system, such as decryption requests, trustee or validator responses, or a CBDC transaction, are
recorded transparently and veriﬁably. This guarantees the unforgeability of coins. In the oﬄine phase, the zk-SNARK proof is associated with a
nonce at the recipient, ensuring that for each transaction from the same
issuer, the payee’s device must track the previously received nonce to
make any replay attempt impossible.
Unlinkability
The real identities of Alice, Bob, or Carla are not revealed during
transactions, which are conducted through completely anonymous accounts. Participants can have multiple anonymous accounts, and transactions cannot be linked to reveal their real identities. Identity disclosure is only possible in cases of proven suspicion and requires a process
involving the Identity Provider, RIO, and auditors. Outside of this process, retrieving a user’s identity is extremely diﬃcult. Additionally, even
if an anonymous transaction is visible in the ledger, its origin cannot be
traced, ensuring the conﬁdentiality of users and their transactions.
Undeniability
Attempts at double spending or double incoming must be detected
and, if applicable, attributed only to their authors. Therefore, the system must be able to detect cases of double spending and double deposit
(double income) independently of the number of users in the system.
Balance integrity.
All accounts must be correctly updated during a ﬁnancial transaction. This implies that the operations of incrementing and decrementing
the balances at the honest issuer and recipient involved in the transaction must be performed safely.

7.2. Results analysis
7.2.1. Digital identity management
For user onboarding, we experimented with diﬀerent user counts-10,
50, 100, 500, and 1000-and recorded digital identity metrics such as average onboarding time, standard deviation of onboarding time, average
veriﬁcation time, and total onboarding time. Each conﬁguration was
tested over thirty independent runs to reduce random bias. The results
are summarized in Table 8 and visualized in Fig. 15.
The average onboarding time per user remains extremely low, in the
order of 10−5 to 10−4 seconds, across all scenarios. Fluctuations between
runs are minimal, with slightly more pronounced variability for small
cohorts (10 and 50 users) compared to larger groups. This suggests that
variance is more sensitive to short simulation batches than to the overall
scalability of the system.
The veriﬁcation process is consistently faster than onboarding, with
execution times in the order of 10−6 seconds. Results show almost negligible cost, with only minor ﬂuctuations at 500 and 1000 users, likely
due to background system activity rather than inherent ineﬃciency of
the protocol.
The standard deviation of onboarding times increases slightly with
the number of users, which is expected given that larger-scale simulations amplify natural variability. However, values remain low, conﬁrming the overall stability of the process.
The total onboarding time increases linearly with the number of
users, reaching approximately 3.4 × 10−2 seconds for 1000 users. This
linear trend is expected since the system processes users sequentially,
and it conﬁrms that performance degradation is proportional to the
workload without unexpected overhead.
Overall, the results indicate that the proposed digital identity framework is lightweight and scalable, with near-instantaneous onboarding
and veriﬁcation per user.We observed that these outcomes are consis-

7. Performance evaluation
In this section, we discuss the experiments conducted to evaluate our
end-to-end solution design. We assess the system’s performance through
benchmarking and analysis of diﬀerent operational phases, including
digital identity management, withdrawal operations, payment transactions, as well as deposit and funding operations. The performance metrics considered include throughput, latency, average onboarding time,
identity veriﬁcation time, zk-SNARK proof generation and veriﬁcation
time, computational load, and gas usage for blockchain-involved operations.
In our experimental evaluation, we aim to compare the performance
of our CBDC payment solution under various conﬁgurations. The performance metrics (such as latency, throughput, and CPU load) are measured over multiple independent runs. Therefore, the proposed experimental design, which includes multiple runs with standard deviation
evaluation for critical phases and a reduced number of runs for lower
variability tasks, oﬀers an eﬃcient and robust method for assessing the
performance and scalability of the CBDC payment solution. This approach not only ensures statistical reliability but also provides clear insights into the system’s behavior under diﬀerent load conditions.
7.1. Experimental setup
To evaluate our solution, we implemented a simulator based on the
CBDC SIM tool. This open-source solution models the classical operations of a CBDC infrastructure. However, to optimally test our system’s
operations, we substantially modiﬁed and customized our simulator.
16

## Page 17

Computer Networks 275 (2026) 111805

O. Atangana et al.

Table 8
Onboarding and identity veriﬁcation metrics (averaged over runs).
Users

Avg Onb (s)

Std Onb (s)

Avg Verif (s)

Total Onb (s)

10
50
100
500
1000

1.663e-05
2.000e-05
1.833e-05
2.177e-05
3.423e-05

5.247e-05
1.325e-04
1.212e-04
1.468e-04
6.515e-04

6.633e-06
2.000e-06
7.000e-06
6.367e-06
4.767e-06

1.663e-04
1.000e-03
1.833e-03
1.088e-02
3.423e-02

s, with occasional dips below the 50-unit curve. The stability of latency
after a few initial runs suggests rapid system stabilization. The higher
latency for 75 units could be due to cryptographic overhead or internal
parameter alignment.
Regarding load computing over runs, the 75-unit case exhibits
slightly larger ﬂuctuations, peaking near 0.085-0.090 s by run 4 before
descending toward 0.08 s. The 50 and 100-unit cases remain within a
compact 0.065-0.075 s range. This suggests that CPU overhead is the
primary driver behind latency variations in the 75-unit case.
The distribution of load computing follows a right-skewed histogram, where most runs cluster around lower values (0.065-0.070 s),
with a small tail extending toward higher values (0.08-0.10 s), likely
due to sporadic cryptographic overhead.
For transaction veriﬁcation time, times mostly range between 0.5 ×
10−5 s and 3.0 × 10−5 s, with occasional spikes in the 75-unit case due
to initialization or cryptographic warm-up. Despite these ﬂuctuations,
veriﬁcation times remain consistently low, indicating eﬃcient cryptographic handling.

Legend: Avg Onb = Avg Onboarding Time (blue), Std Onb = Std
Dev Onboarding Time (orange), Avg Verif = Avg Veriﬁcation Time
(green), Total Onb = Total Onboarding Time (red).
Table 9
Results of the ﬁrst 10 withdrawals for amounts of 50, 75, and 100.
Transaction ID Amount Latency (s) Load Computing (s) Throughput (tx/s)
0
1
2
3
4
5
6
7
8
9
0
1
2
3
4
5
6
7
8
9
0
1
2
3
4
5
6
7
8
9

50
50
50
50
50
50
50
50
50
50
75
75
75
75
75
75
75
75
75
75
100
100
100
100
100
100
100
100
100
100

0.0694
0.0671
0.0665
0.0738
0.0686
0.0671
0.0681
0.0689
0.0708
0.0666
0.1060
0.0823
0.0827
0.0885
0.0798
0.0814
0.0779
0.0756
0.0798
0.0767
0.0688
0.0676
0.0666
0.0701
0.0688
0.0669
0.0668
0.0718
0.0676
0.0677

0.0696
0.0671
0.0665
0.0734
0.0685
0.0671
0.0680
0.0693
0.0703
0.0666
0.1037
0.0800
0.0818
0.0850
0.0793
0.0800
0.0773
0.0749
0.0771
0.0739
0.0688
0.0676
0.0666
0.0696
0.0690
0.0669
0.0670
0.0710
0.0679
0.0677

13.2967
13.2967
13.2967
13.2967
13.2967
13.2967
13.2967
13.2967
13.2967
13.2967
13.2305
13.2305
13.2305
13.2305
13.2305
13.2305
13.2305
13.2305
13.2305
13.2305
13.4545
13.4545
13.4545
13.4545
13.4545
13.4545
13.4545
13.4545
13.4545
13.4545

7.2.3. Transaction settlement
We consider two scenarios. First, Alice pays Bob, representing two
users with secured devices. Then, Bob pays Carla. The graphs illustrate six distinct metrics: Latency, ZK Proof Generation Time, ZK Proof
Veriﬁcation Time, Transaction Veriﬁcation Time, Load Computing, and
Throughput. Table 10 shows the results of the transaction settlement
between Alice and Bob after 10 runs. Fig. 17 shows the graphics of the
ﬁrst ﬁve results of these transactions.
For latency, the observed range is 0.038 s to 0.048 s, with a peak
near transaction 55. Minor spikes may arise from local CPU scheduling, ephemeral key generation, or short-range data transfer overhead.
All times remain under 50 ms, making them suitable for near-real-time
oﬄine payments.
Regarding ZK proof generation time, on a microsecond scale, the
values rarely exceed 1.8 × 10−4 s and eventually settle around 1.0 × 10−5
s, indicating a highly eﬃcient ZK scheme. Early spikes may relate to
cryptographic initialization.
Conversely, ZK proof veriﬁcation time shows a steady plateau. The
red curve remains between 9.6 × 10−5 s and 1.0 × 10−4 s. This low and
stable veriﬁcation cost ensures good scalability and minimal risk of performance bottlenecks.
For transaction veriﬁcation time, microsecond-level overhead remains mostly under 1.0 × 10−4 s, with minor variations around runs 56
and 58. Even at peaks, sub-millisecond overhead ensures minimal userperceived delay.
Regarding load computing, the range is approximately 0.039-0.046
s, with outliers near runs 53 and 58. Higher load computing often coincides with small latency spikes, underscoring CPU usage as a key driver
of response time.
Finally, throughput remains steady at 23.5-24.0 TPS, indicating a
robust capacity for oﬄine transactions. This implies that the system can
handle multiple rapid-ﬁre payments, aligning well with real-world retail
demands.
For the payment scenario between Bob and Carla, we focus on average latency, average load computing, and average throughput metrics.
Table 11 shows the results of this simulation and Fig. 18, the corresponding graphic.
For average latency, the dark blue bar (10 units) exhibits the highest
average latency, exceeding 8.0 s-a notably large value. Meanwhile, 15
units (teal) drops to roughly 3-4 s, 50 units (turquoise) sits around 5-6
s, and 100 units (lime green) showcases the lowest latency below 1 s.
The signiﬁcantly higher latency for 10 units is counterintuitive and may
reﬂect cryptographic or initialization overhead triggered by small transactions. In contrast, the minimal latency for 100 units suggests beneﬁcial
batching or caching behaviors that scale better for larger sums.
Regarding average load computing, the bar for 10 units dominates
at over 8 s, whereas 15 is closer to 3-4 s, 50 approaches 6-7 s, and

tent across all tested scales, suggesting that execution times remain negligible even when the number of users increases.
7.2.2. Withdrawal transactions
The observed metrics in this phase include the evolution of load computing by run index, distribution of load computing, evolution of latency
by run index, evolution of throughput by run index, and transaction veriﬁcation time. For better visualization and comprehension of the graphs,
we limited our observations to the ﬁrst 10 runs. Table 9 shows the results
of the withdrawal simulation, and Fig. 16 shows the graphical evolution
of the observed metrics.
The throughput over runs indicates that the 100-unit scenario (green
line) achieves the highest throughput (about 13.45 TPS). The 50-unit
scenario (blue) remains around 13.30 TPS, slightly below 100, while the
75-unit scenario (orange) stabilizes near 13.20 TPS, the lowest among
the three. The relatively ﬂat throughput curves suggest that the solution processes each run at a steady rate. The slightly higher throughput
for 100 units suggests that the protocol may be optimized for larger
transactions, or that internal overhead dominates over the transaction
amount.
The latency evolution graph shows that the 75-unit scenario (orange
line) consistently starts higher (0.105 s at run 0) and remains above
the other two for most runs, stabilizing around 0.08-0.09 s. The 50-unit
(blue) and 100-unit (green) scenarios generally stay within 0.065-0.075
17

## Page 18

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 15. Digital identity onboarding and veriﬁcation performance under varying user scales.
Table 10
Results of oﬄine transaction simulation (Alice to Bob).
ID
51
52
53
54
55
56
57
58
59
60

Period
1740407553.531021
1740407553.57149
1740407553.6117558
1740407553.6525247
1740407553.7004604
1740407553.7439003
1740407553.7855418
1740407553.8264637
1740407553.8684583
1740407553.9144616

From
Alice
Alice
Alice
Alice
Alice
Alice
Alice
Alice
Alice
Alice

To
Bob
Bob
Bob
Bob
Bob
Bob
Bob
Bob
Bob
Bob

Amount
50
50
50
50
50
50
50
50
50
50

Latency
0.0411
0.0404
0.0402
0.0407
0.0479
0.0434
0.0416
0.0409
0.0420
0.0460

zk Proof Gen.
0.0002
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001
18

zk Proof Verif.
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001
0.0001

Trans. Verif.
0.00066
0.00066
0.00064
0.00063
0.00108
0.00064
0.00064
0.00063
0.00064
0.00086

Load Comp.
0.0412
0.0404
0.0402
0.0407
0.0461
0.0430
0.0416
0.0409
0.0420
0.0455

Throughput
23.5768
23.5768
23.5768
23.5768
23.5768
23.5768
23.5768
23.5768
23.5768
23.5768

Status
Success
Success
Success
Success
Success
Success
Success
Success
Success
Success

## Page 19

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 16. Withdrawal results
Table 11
Results of payment simulations between Bob and Carla.
Period

From

To

Amount

Latency

Load Comp.

Throughput

Status

1740417109.1297
1740416652.6854
1740415986.8613
1740415751.8391
1740415405.1866

Bob
Bob
Bob
Bob
Bob

Carla
Carla
Carla
Carla
Carla

100
50
20
15
10

1.7949
6.2916
3.6511
1.9801
9.2675

1.7953
6.2145
3.6221
1.9783
9.2150

0.5571
0.1589
0.2739
0.5050
0.1079

Success
Success
Success
Success
Success

100 remains near 2 s. This correlates with the latency patterns: high
load computing usually indicates longer transaction times. The extreme
diﬀerence between 10 and 100 suggests that overhead is not strictly
proportional to the payment amount but may hinge on internal or cryptographic routines.
Finally, average throughput increases with the amount of transactions. For 10 units (navy), throughput sits below 0.3 TPS; 15 is slightly
higher at 0.4-0.45 TPS. The 50-unit bar ranges around 0.35-0.4 TPS,
while 100 units soar above 0.65 TPS. The system handles larger payments more eﬃciently, indicating that repeating small transactions does
not boost throughput. Instead, amortized cryptographic or ledger operations favor higher amounts.
These ﬁndings reinforce the importance of analyzing payment size
eﬀects in oﬄine digital currency systems, guiding future reﬁnements
to harmonize performance across all denominations while maintaining
robust cryptographic guarantees.

reveal important aspects of performance and scalability in a potential
oﬄine or blockchain-based funding scenario. Table 12 shows the results
of the funding simulation and Fig. 19, the graphical representation of
this simulation.
In terms of total time vs. number of runs, the 300-unit (blue) and
700-unit (orange) curves typically range from 0.015 s to 0.030 s, while
the 1000-unit (green) curve peaks near 0.040 s at run 3 before abruptly
dropping close to zero at run 4. In early runs, cryptographic or setup
routines may be triggered, inﬂating total time for runs 1-3. The sharp
dip for 1000 by run 4 might indicate cache priming or resource liberation, while background processes or environment-driven tasks may
account for minor spikes. Nonetheless, even the highest total time observed ( 0.040 s) remains relatively low for payment contexts, suggesting
that the funding operation is not excessively time-consuming.
Regarding CPU load during funding transactions, we observe striking diﬀerences. The transaction for 1000 units (green line) stays near
0.016 for runs 1-3, then unexpectedly drops to 0.0 at runs 4-5. The
transaction for 700 units (orange line) remains at zero for runs 1-2 before surging to 0.014-0.016 for runs 3-5. The 300-unit transaction (blue
line) hovers near zero after the initial runs, implying negligible CPU us-

7.2.4. Funding operation
To evaluate funding transactions, we limited our observations to ﬁve
runs for three diﬀerent amounts: 300, 700, and 1000. These patterns
19

## Page 20

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 17. Oﬄine transactions performance (Alice-Bob) results.

Fig. 18. Oﬄine transactions performance (Bob-Carla) results.

age for subsequent iterations. These results indicate: - Resource Allocation or Scheduling: The signiﬁcant swings from near-max to near-zero
CPU usage show that certain runs handle cryptographic tasks or concurrency diﬀerently. - Protocol Phases: The transaction amount (300,
700, 1000) may inﬂuence concurrency or cryptographic load distribution. Some conﬁgurations perform heavy computation early and remain
idle in later runs.
Another interesting performance metric is gas usage. All gas values stay within the range of 21776-21788, showing a cyclical pattern
but minimal overall variation. The 1000-unit transaction (green) oscil-

lates between 21776 and 21788 across runs, notably at runs 2 and 4.
The stable range implies a fairly uniform on-chain execution path, unaffected by run index or parameter changes. Additionally, minor cyclical
spikes likely occur when ephemeral checks or ledger updates are triggered. From a cost standpoint, staying within 21780 ±10 suggests a
predictable computational overhead.
Finally, we analyzed transaction eﬃciency, deﬁned as the ratio of Total Time to CPU Load. The 300-unit transaction (blue) is approximately
0.8-1.4, while the 700-unit transaction (orange) ranges from 0.2 to 2.6,
and the 1000-unit transaction (green) peaks near 2.8 before dropping
20

## Page 21

Computer Networks 275 (2026) 111805

O. Atangana et al.

Fig. 19. Funding transaction performance.

Table 12
Results of funding simulation.
Number of Runs

Amount

1
2
3
4
5

300
300
300
300
300

1
2
3
4
5

700
700
700
700
700

1
2
3
4
5

1000
1000
1000
1000
1000

Total Time (s)
Amount = 300
0.021000
0.018000
0.018000
0.017970
0.017000
Amount = 700
0.024000
0.015996
0.018035
0.017892
0.020010
Amount = 1000
0.026010
0.022995
0.041524
0.016106
0.018000

CPU Load

Gas Used

0.015625
0.015625
0.015625
0.015625
0.000000

21776
21788
21776
21788
21776

0.000000
0.000000
0.015625
0.000000
0.000000

21776
21788
21776
21788
21776

0.015625
0.015625
0.015625
0.000000
0.000000

21776
21788
21776
21788
21776

oﬄine payment approaches reported in the literature. This comparative
perspective provides additional insights into the strengths and limitations of our framework, and sets the stage for a broader discussion on
its integration with regulatory and practical requirements.
8.1. Comparative analysis
Table 13 provides a comparative view of our proposed Block-PAD
solution against existing oﬄine payment frameworks. Several solutions
report transaction times in the order of hundreds of milliseconds to seconds (e.g., [16,18]), which can be limiting in retail environments where
low-latency payments are required. Other works such as [37] demonstrate the integration of advanced privacy-enhancing technologies but
incur signiﬁcant performance costs, with latencies around 210 ms per
payment.
High-throughput protocols, notably [38], achieve tens to hundreds
of transactions per second. However, these approaches rely on speciﬁc
assumptions, such as access to trusted online services (e.g., timestamp
servers), which limit their applicability in full oﬄine deployments.
The DigiVault and MarkoPayChain solution [39] shows encouraging
results, with latencies between 10-30 ms, throughput of 45-50 TPS, and
proof operations (zk-SNARK) remaining lightweight (generation ∼0.011
s, veriﬁcation <0.015 s). However, the observed success rate is around
88-90%, which highlights trade-oﬀs between speed and reliability in
constrained environments.
Additional schemes such as Luo and Yang’s EMV-compatible protocol [40] and Igboanusi’s Pure Wallet architecture [41] highlight other
trade-oﬀs. EMV-compatible designs achieve latencies of about 100-150
ms but remain hardware dependent, while Pure Wallet emphasizes programmability, though blockchain-side synchronization constrains scalability in fully oﬄine contexts.
In contrast, Block-PAD achieves a stable throughput of 23.57 TPS
with a latency consistently around 40–47 ms and near-100% success
rate. While the throughput is moderate compared to DigiVault/MarkoPayChain or highly optimized systems, the combination of low latency,
adaptive privacy features, and genuine full oﬄine feasibility makes our
solution well-suited for retail and micro-payment use cases. This balance

to approximately 0.3. A higher ratio suggests more waiting or I/O time
compared to CPU time, implying a less CPU-bound process. Surges to
2.6-2.8 may indicate that the CPU ﬁnishes quickly, with the remaining
time spent in idle or waiting states. Sharp changes suggest that some
runs might be CPU-saturated while others rely on external or concurrency factors.
In conclusion, large eﬃciency swings highlight protocol phases that
are either CPU-bound or I/O-bound. This behavior may be expected in
protocols handling cryptographic veriﬁcations or ledger interactions in
bursts.
8. Discussion
The empirical evaluation highlights the eﬃciency and scalability of
the proposed digital identity onboarding and veriﬁcation processes, as
well as the feasibility of oﬄine transaction execution. To further contextualize these results, it is essential to compare our solution with existing
21

## Page 22

Computer Networks 275 (2026) 111805

O. Atangana et al.

Table 13
Comparative performance evaluation of oﬄine payment solutions.
Solution

Performance (Latency / TPS)

Limitations

Remarks

Ref[16]

112-568 ms (comm.), up to 1590 ms (20
blocks / 60 nodes), < 1 TPS
Withdraw: <400 ms; Spend: 275-1600 ms

Weak privacy, secure element dependency

Large cryptographic proofs
Needs timestamp server; energy cost not detailed
Slightly reduced success rate under stress

Ref[40]

∼210 ms/payment; ∼90 ms acceptance
548 ms → 91.24 TPS (simulated)
10-30 ms latency; 45-50 TPS; 88-90%
success; zk-SNARK: gen. 0.011 s / verif.
<0.015 s
∼100–150 ms/transaction (NFC)

Transaction time exceeds typical retail requirements.
Not suitable for rapid consecutive oﬄine
payments.
PET integration degrades performance.
High throughput, but not full oﬄine.
Strong balance of speed and cryptographic
robustness, but not perfect reliability.

Ref[41]

Few tens of TPS (not precisely quantiﬁed)

Requires blockchain-side synchronization

Our work (Block-PAD)

40–47 ms latency; 23.57 TPS (stable);
∼100% success

Throughput moderate vs. optimized systems

Ref[18]
Ref[37]
Ref[38]
Ref[39]

High receiver cost (bilinear pairing)

EMV dependency, limited privacy

between performance and deployability highlights Block-PAD’s practical value as a resilient oﬄine payment framework.

Good EMV compatibility, but slower than
Block-PAD.
Highlights programmability but limited in
full oﬄine context.
Balanced trade-oﬀ: low latency, stable
throughput, adaptive privacy, full oﬄine
feasibility.

proach oﬀers immediate ﬁnality and scalability, which account-based
systems lack, and avoids the caps or limits associated with token-based
systems. As discussed by [31] and described as "signed balance update"
by [47], the Block-PAD system eﬀectively integrates both authentication
methods to optimize their beneﬁts.

8.2. Full consecutive oﬄine payments integrated blockchain (Alice, Bob,
Carla)

9. Conclusion and future works

Oﬄine payment in rCBDCs enhances resilience during technical failures and reduces network load, improving scalability by decreasing peak
transaction volumes [42]. Intermittently oﬄine payments that synchronize with the ledger are recommended for security. DLT systems like
blockchain facilitate consecutive oﬄine payments. For example, [2] detailed an oﬄine method where Alice pays Bob with a secure device, and
Bob can pay Carla, who connects to a blockchain-centric PAD without
a device. The Block-PAD system enables unlimited consecutive oﬄine
payments with immediate ﬁnality and end-to-end privacy. However, integrating blockchain into CBDC protocols requires considering motivations.

In this paper, we introduced the Block-PAD framework, a blockchainenabled architecture designed to support resilient and privacypreserving CBDC transactions. Block-PAD addresses a broad spectrum
of challenges related to CBDC deployments, including privacy, security,
interoperability, regulatory compliance, and resilience in scenarios with
limited or intermittent connectivity. By integrating digital identity into
the transaction workﬂow, the framework ensures that oﬄine and hybrid payment ﬂows can be executed reliably while remaining compliant
with accountability requirements.
Our experimental evaluation, conducted over multiple independent
runs, conﬁrmed that Block-PAD achieves consistently low per-user onboarding and veriﬁcation times, stable throughput (23.57 TPS), and latency in the range of 40-47 ms for autonomous device-to-device payments. These results demonstrate the practical feasibility of real-time
retail payments in constrained oﬄine environments. Furthermore, the
system scales linearly in terms of total onboarding time while maintaining negligible per-user costs, thus conﬁrming its robustness across increasing user volumes. In addition, the integration of privacy-enhancing
technologies (zk-SNARKs and homomorphic encryption) proved eﬃcient, with minimal computational overhead, allowing both privacy protection and regulatory auditability without compromising performance
(Table 12 and Fig. 7). To contextualize these results, we also provided
a comparative analysis with existing CBDC oﬄine payment solutions.
While some state-of-the-art protocols achieve higher throughput under
speciﬁc assumptions (e.g., reliance on timestamp servers or ﬁxed user
sets), Block-PAD balances low latency, adaptive privacy, and genuine
oﬄine feasibility, making it particularly suitable for retail and micropayment use cases.
Looking forward, several performance-oriented enhancements can
be pursued. These include cryptographic acceleration via optimized
proof systems, batching, and hardware support, pipeline processing and
micro-batching strategies to further increase throughput, lightweight
reconciliation mechanisms using accumulators and delta synchronization, and system-level optimizations such as parallelism, thread-pools,
and resource governance to sustain success rates under bursty loads.
Exploring these directions, together with a tighter integration into decentralized digital identity standards, will further strengthen the scalability, eﬃciency, and deployability of Block-PAD in real-world CBDC
environments.

8.3. Reconciling privacy and regulatory constraints
Privacy is crucial for CBDC adoption but faces challenges due to security and regulatory requirements against fraud. Increasing security often
reduces privacy, while enhancing privacy can hinder traceability for detecting illicit activities. We believe privacy and regulatory compliance
can be reconciled through a secure, private, and legally compliant payment system based on speciﬁc principles. Privacy should be the default
mode for all transactions, ensuring both payer and payee anonymity.
This approach strengthens data protection by limiting exﬁltration. Minimal user information should be retained during onboarding, transactions, and data access by system entities, as discussed in [43] and developed in [44]. In the Block-PAD, each entity has minimal access to user
information, facilitated by digital identity, ensuring privacy from coin
withdrawal onwards. Transactions remain anonymous unless there is a
proven suspicion of illicit activity.
Private or public blockchains do not inherently guarantee privacy. As
[45] warns about "the mistake of pseudonymity" and [46] highlights the
risk of "de-anonymization on blockchains," privacy issues are signiﬁcant.
PETs play a crucial role in addressing these concerns while ensuring
regulatory compliance. The Block PAD employs cryptographic tools such
as blind homomorphic encryption and zero-knowledge proofs within a
trusted execution environment to maintain high levels of privacy.
8.4. Hybrid paradigm model based on regulatory compliance
When designing a CBDC system, the choice of authentication method
is key. A hybrid CBDC system can overcome the limitations of tokenbased and account-based systems by combining their strengths. This ap22

## Page 23

Computer Networks 275 (2026) 111805

O. Atangana et al.

CRediT authorship contribution statement

[15] M. Babel, A. Bechtel, J. Gross, B. Schellinger, J. Sedlmeir, Designing a central
bank digital currency with support for cash-like privacy, 2021. https://ssrn.com/
abstract=3899.
[16] B. Yang, D. Tong, Y. Zhang, DOT-M: a dual oﬄine transaction scheme of central
bank digital currency for trusted mobile devices, in: Proc. 16th Int. Conf. Netw. Syst.
Secur. (NSS), 16th Int. Conf. Network and System Security (NSS)Denarau Island, Fiji,
2022, pp. 233–248.
[17] Idemia, Oﬄine CBDC Payments, 2023.
[18] B. Yang, D. Tong, Q. Yu, F. Wei, Y. Zhang, A dual oﬄine anonymous e-payment
scheme for mobile devices based on TEE and SE, J. Softw. 35 (8) (2024).
[19] E. Benoist, Practical oﬄine payments using one-time passcodes, 622, 2023.
[20] Bis, Project polaris: a handbook for oﬄine payments with CBDC, 2023.
[21] B. Brodsky, A. Dubey, D.T. Lucas, Enabling oﬄine payments in an online world: a
practical guide to oﬄine payment security, 2023.
[22] Ecb, Eurosystem Report on the Public Consultation on a Digital Euro, 2023.
https://www.ecb.europa.eu/pub/pdf/other/Eurosystem_report_on_the_public_
consultation_on_a_digital_euro539fa8cd8d.en.pdf.
[23] H. Guo, X. Yu, A survey on blockchain technology and its security, Blockchain 3 (2)
(2022) 1–15.
[24] D. Chaum, T. Moser, Technical Report eCash 2.0, SNB Working Paper, 2022.
[25] N. Bitansky, et at., From extractable collision resistance to succinct non-interactive
arguments of knowledge, and back again, in: Proc. 3rd Conf. Innov. Theor. Comput.
Sci. (ITCS’12), 3rd Conf. Innovations in Theoretical Computer Science (ITCS’12)New
York, United States, 2012, pp. 326–349.
[26] J.H. Cheon, A. Kim, M. Kim, Y. Song, Homomorphic Encryption for Arithmetic of
Approximate Numbers, 10624, Springer, Cham, Cham, 2017.
[27] Globalplatform, GlobalPlatform TEE White Paper, 2015. https://globalplatform.
org/wpcontent/uploads/2018/04/GlobalPlatform_TEE_Whitepaper_2015.pdf.
[28] Ttc, Draft EU US, 2023.
[29] S. Elfors,
Idnow, FIDO Alliance White Paper: Using FIDO for the
EUDI Wallet, 2023. https://ﬁdoalliance.org/wp-content/uploads/2023/04/
FIDO-EUDI-Wallet-White-Paper-FINAL.pdf.
[30] Sw7group, PAD Privacy-Preserving Accountable Decryption, 2021. https://padtech.
s3.eu-central-1.amazonaws.com/pad-whitepaper/white_paper_2021.pdf.
[31] M. Rahmilevich, Towards a Scalable Privacy-Preserving and Regulatable CBDC
Framework, 2022. https://static.sched.com/hosted_ﬁles/hgf22/f6/Oracle_CBDC_
Presentation_v6.pdf.
[32] I. David, L. Zhou, K. Qin, D. Song, L. Cavallaro, A. Gervais, Do you still need a
manual smart contract audit?, arXiv preprint arXiv:2306.12338, 2023, https://doi.
org/10.48550/ARXIV.2306.12338
[33] E. Foundation, Remix Ethereum - IDE, 2025. https://remix.ethereum.org.
[34] T. Suite, Ganache: Personal Blockchain for Ethereum Development, 2025. https://
truﬄesuite.com/ganache/.
[35] Tribler, IPv8: A Secure P2P Communication Library, 2025. https://github.com/
Tribler/py-ipv8.
[36] O. Atangana, L. Khoukhi, M. Barbier, A. Kockam, Block-PAD: experimental implementation repository, 2025. https://github.com/Olivieratangana/Block-PAD.
[37] C. Beer, S. Zingg, K. Kostiainen, PayOﬀ: A Regulated Central Bank Digital Currency
with Private Oﬄine Payments, Technical Report, arXiv Preprint, 2024. https://doi.
org/10.48550/arXiv.2408.06956
[38] A. Dmitrienko, D. Noack, M. Yung, Secure wallet-assisted oﬄine Bitcoin payments with double-spender revocation, in: Proc. Conf. Blockchain Cryptocurr.,
Conf. Blockchain and Cryptocurrency, 2017, pp. 520–531. https://doi.org/10.1145/
3052973.3052980
[39] O. Atangana, L. Khoukhi, M. Barbier, J.D. Manno, Securing oﬄine CBDC transactions: DigiVault card and MarkoPayChain with mobile phone integration, in: Proc.
28th Conf. Innov. Clouds Internet Netw. (ICIN), 28th Conf. Innovation in Clouds,
Internet and Networks (ICIN)Paris, France, 2025, pp. 33–40.
[40] N. Luo, M.H. Yang, EMV-compatible oﬄine mobile payment protocol with mutual
authentication, Sensors 19 (21) (2019). https://doi.org/10.3390/s19214611
[41] I.S. Igboanusi, K.P. Dirgantoro, J.M. Lee, D.S. Kim, Blockchain side implementation
of Pure Wallet (PW): an oﬄine transaction architecture, ICT Express 7 (3) (2021)
327–334.
[42] B. Brodsky, A. Dubey, D.T. Lucas, Enabling oﬄine payments in an online world:
Scalability, 2023.
[43] D. Ballaschk, J. Paulick, The public, the private and the secret: thoughts on privacy
in central bank digital currencies, J. Payments Strategy Syst. 15 (3) (2023) 277–286.
[44] R. Auer, R. Böhme, J. Clark, D. Demirag, Mapping the privacy landscape for central
bank digital currencies, acmqueue 20 (4) (2022).
[45] R. Barresi, in: La Conﬁdentialité des Paiements: Du XVIIIe Siècle à l’Euro Numérique,
les Monnaies Numériques et les Cryptoactifs, 2023, pp. 257–269.
[46] H. Jang, A Survey on Security and Privacy in Blockchain-based Central Bank Digital
Currencies, J. Internet Serv. Inf. Secur. 11 (3) (2022) 16–29.
[47] G. Fanti, K. Kostiainen, MISSING KEY: the challenge of cybersecurity and central
bank digital currency, 2022.

Olivier Atangana: Writing – original draft, Validation, Formal analysis, Conceptualization; Lyes Khoukhi: Supervision, Resources, Funding acquisition; Morgan Barbier: Visualization, Project administration,
Methodology, Data curation; Ahmet Kokcam: Resources, Project administration, Formal analysis.
Data availability
Data will be made available on request.
Declaration of competing interest
The authors declare that they have no known competing ﬁnancial
interests or personal relationships that could have appeared to inﬂuence
the work reported in this paper.
Acknowledgments
The authors would like to express their gratitude to the GREYC Laboratory of ENSICAEN and the FIME company for technical assistance,
helpful discussions, and cooperation in the realization of this work.
Their assistance was crucial for the quality and usability of this work.
The authors also thank colleagues who provided constructive remarks
and suggestions at various stages of this project.
References
[1] Human Rights Foundation, Central Bank Digital Currencies (CBDCs) Tracker, 2023,
https://cbdctracker.org/.
[2] O. Atangana, M. Barbier, L. Khoukhi, W. Royer, Securing privacy in oﬄine payment for retail central bank digital currencies: a comprehensive framework, in: Proceedings of the 2nd Blockchain and Cryptocurrency Conference (B2C’ 2023), (B2C’
2023), 18-20 October 2023, Corfu, Greece, 2023, 25–32.
[3] A. Rial, A.M. Piotrowska, Compact and divisible e-cash with threshold issuance,
Proc. Priv. Enhanc. Technol. 2023 (4) (2023) 381–415.
[4] W.H. Yin, Issues in Electronic Payment Systems: A New Oﬄine Transferable E-Coin
Scheme and a New Oﬄine E-Check Scheme, Technical Report, Chinese Univ. Hong
Kong, 2001.
[5] M. Christodorescu, et al, Towards a Two-Tier Hierarchical Infrastructure: An Ofﬂine Payment System for Central Bank Digital Currencies, Technical Report, arXiv
Preprint, 2020.
[6] Y. Chu, J. Lee, S. Kim, H. Kim, Y. Yoon, H. Chung, Review of oﬄine payment function
of CBDC considering security requirements, Appl. Sci. 12, 9, 4488. 2022, https://
doi.org/10.3390/app12094488
[7] A. Dogan, M. Takaoglu, T. Dursun, E. Olcer, Smart card based oﬄine payment system for central bank digital currencies, in: Proceedings of the Blockchain and Cryptocurrency Congress (B2C’ 22), (B2C’22)9-11 November, Barcelona, Spain, 2022,
114–127.
[8] M. Aprile, L. Mainetti, E. Mele, R. Vergallo, A sustainable approach to delivering
programmable peer-to-peer oﬄine payments, Sensors 23 (3) (1336).
[9] M. Adams, L. Boldrin, R. Ohlhausen, E. Wagner, An integrated approach for electronic identiﬁcation and central bank digital currencies, J. Payments Strategy Syst.
15 (3) (2021) 287–305.
[10] G. Samid, A levev paying ﬁeld: cryptographic solutions towards social accountability
and ﬁnancial inclusion, 2022.
[11] Emvco, EMV Integrated Circuit Card Speciﬁcations for Payment Systems Book 3 Application Speciﬁcation, 2022. https://www.emvco.com/speciﬁcations/?search_bar_
keywords=book3.
[12] A. Kiayias, M. Kohweiss, A. Sarencheh, PEReDi: privacy-enhanced, regulated and
distributed central bank digital currencies, 2023.
[13] V. Buterin, J. Illum, M. Nadler, F. Schär, A. Soleimani, Blockchain privacy and regulatory compliance: Towards a practical equilibrium, 2023.
[14] Y.C. Liao, Z. Liu, Y. Tseng, R. Tso, Blockchain-based conﬁdential payment system
with controllable regulation, in: Proc. 17th Int. Conf. Inf. Security Pract. Exp., 17th
Int. Conf. Information Security Practice and ExperienceTaipei, Taiwan, 2022, pp.
39–56.

23
