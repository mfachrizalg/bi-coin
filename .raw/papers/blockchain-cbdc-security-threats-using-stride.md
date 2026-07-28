---
source_type: pdf
title: "Blockchain CBDC Security Threats Using STRIDE"
original_file: "thesis/reference/Blockchain_CBDC_Security_Threats_Using_STRIDE.pdf"
sha256: "b612d62b2aff65310a162b7d2c14bb3a9bab69bb3b7ce503daf2d3d59ab55cf4"
page_count: 8
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Blockchain CBDC Security Threats Using STRIDE

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA)

Blockchain CBDC Security Threats using STRIDE
Jaqueline Hans∗ , Sajjad Khan∗ , and Davor Svetinovic∗†

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA) | 979-8-3503-3923-9/23/$31.00 ©2023 IEEE | DOI: 10.1109/BCCA58897.2023.10338905

∗ Information Systems and Operations Management

Vienna University of Economics and Business, Vienna, Austria
Email: jaqueline.hans@s.wu.ac.at, sajjad.khan@wu.ac.at
† Center for Cyber-Physical Systems, Electrical Engineering and Computer Science
Khalifa University, Abu Dhabi, UAE
Email: dsve@acm.org

Abstract—In strategic response to the increasing threats
from crypto payment systems, cryptocurrencies, and stablecoins,
central banks globally are contemplating the introduction
of their digital currencies, termed Central Bank Digital
Currencies (CBDCs). This trend, especially the emergence of
CBDCs built on blockchain technology, instigates significant
discourse on security and privacy concerns. This research paper
delves into the potential security risks of blockchain-based
CBDCs, distinguishing between permissionless and permissioned
network architectures and token-based and account-based
access mechanisms. We employed STRIDE, a threat modeling
methodology, to elucidate these risks, on architectural constructs
derived from CBDC proposals and use cases, identifying 39
distinct threats. Our study intends to enrich the ongoing dialogue
on the evolution of blockchain-based CBDCs. The findings
provide a robust foundation to guide and inform prudent design
decisions by offering a detailed understanding of potential
security and privacy risks, thereby contributing to developing
more secure CBDCs.
Index Terms—Central Bank Digital Currencies, Blockchain,
Cybersecurity, Threat Modeling, STRIDE

I. I NTRODUCTION
The advent and increased adoption of electronic payment
methods have resulted in a gradual reduction of physical
cash utilization [1]. In response to competitive pressures from
cryptocurrencies, Big Tech payment systems, and stablecoins,
numerous central banks are contemplating the rollout of their
proprietary digital currencies, known as (retail) Central Bank
Digital Currencies (CBDCs) [2].
Illustrative of this trend are ongoing research endeavors such
as the Digital Euro project led by the European Central Bank
[2], pilot schemes like the one initiated by the People’s Bank of
China [3], and successfully launched currencies including the
Bahamian Sand Dollar [4]. Despite the prevalence of security
issues and the challenge of exclusion in privately operated
financial systems [1], CBDCs have also incited discussions
surrounding security [3] and privacy concerns [5] [6].
Over recent years, many CBDC variants have been
suggested, indicative of the diverse potential implementations
of this technology. Consequently, CBDCs can adopt either a
centralized [7] or decentralized architecture [8], adding another
layer of complexity to the ongoing discourse.
This study centers on CBDCs predicated on blockchain
technology, wherein the ledger is managed by various
entities in a decentralized manner [8]. This variant not

979-8-3503-3923-9/23/$31.00 ©2023 IEEE

only finds consideration among countries like Singapore [9]
and Cambodia [1], but also presents a unique context of
potential threats accompanied by distinct security and privacy
implications.
Blockchain-based CBDCs can be further classified into two
categories: permissionless and permissioned network variants
[1]. Additionally, these CBDCs can operate on account-based
or token-based access mechanisms [10], thereby diversifying
the nature and extent of potential security considerations.
Given that both the architecture and the associated
security and privacy concerns may vary across different
CBDC variants, this research aims to elucidate the distinct
threats to each type of CBDC. The exploration utilizes
the well-recognized threat modeling methodology STRIDE
[11], shedding light on variant-specific requirements. This
investigation is guided by the research question (RQ): How
can the threat context of blockchain-based CBDCs be analyzed
using STRIDE?
Additional objectives encompass the identification of unique
threat instances across diverse CBDC variants, achieved
through the abstraction of a synthesized system architecture
coupled with illustrative use cases utilizing sequence diagrams.
After applying STRIDE’s threat modeling methodology, the
detected threats are consolidated, classified according to
the corresponding STRIDE category, and aligned with the
impacted system element. Through this rigorous analysis, the
study provides valuable insights to inform and guide future
design decisions about blockchain-based CBDCs.
The paper is organized as follows: Section II explores
previous research in this area. Section III covers the research
methodology. Section IV describes the abstracted system
architecture and the use case scenarios. Section V presents
the identified threat scenarios based on STRIDE.Section
VI discusses and evaluates these findings, indicating their
limitations. Finally, Section VII concludes the paper and lists
the future research directions.
II. R ELATED R ESEARCH
Due to the novelty of CBDCs, the research regarding
security and privacy, which uses explicit threat modeling
methodologies, was very limited. This section also includes the
findings of threat modeling conducted in familiar fields such

522

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 04:14:53 UTC from IEEE Xplore. Restrictions apply.

## Page 2

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA)

as mobile banking and blockchain, as these can be considered
relevant when studying blockchain-based CBDCs.
The work by Lee et al. [6] deals with discovering security
and privacy threats of blockchain-based CBDCs, splitting them
into ’Identity Privacy’ and ’Transaction Privacy’ threats. In
the first category, they list de-anonymization and networklevel attacks, whereas, in the second category, they further
distinguished between data privacy and program (i.e., smart
contract) privacy. Although they did not use any specific
threat model methodology, they were able to highlight research
challenges and discover a set of threats significantly.
Guma et al. [12] present related research within
their work on threat modeling authentication measures
of mobile money, identifying a set of threats and
specific countermeasures. The threats were categorized
based on whether they materialize attacks against privacy,
authentication, confidentiality, integrity, and availability.
Guggenberger et al. [13] extracted 87 threats, further
structured using attack trees. Their study focused on
permissionless blockchains, such as Bitcoin or Ethereum. The
results showed an attack tree listing numerous attacks, split
into five paths: attacks on the peer-to-peer network, attacks
on the consensus mechanism, attacks on the virtual machine,
attacks on the application logic, and attacks on the client’s
wallet.
In contrast, Putz et al. [14] focused on permissioned
blockchains, such as Hyperledger Fabric, within their study.
They identified several threats by conducting extensive
literature research, narrowing down even detailed attacks,
and highlighting further improvement potential. Threats
were categorized into vulnerabilities (contract, framework,
dependency, cryptographic, etc.), DoS, network partitioning,
malicious consensus behavior, consensus configuration
manipulation, and identity provider compromise.
While there is ongoing research about CBDCs, there is
a lack of studies discussing threat modeling papers in this
area, especially with the widely-recognized threat modeling
methodologies such as STRIDE or attack trees. This provides
the basis to follow the proposed research methodology, which
aims at closing this identified research gap.
III. R ESEARCH M ETHOD
The applied research design consists of two steps: 1) a
CBDC architecture and specific use cases are abstracted; 2)
threat scenarios, backed by scientific literature and following
the threat modeling methodology STRIDE, are identified and
accordingly categorized. This section aims to explain each step
in more detail.
The architecture abstraction aims to provide a
comprehensive high-level view of a CBDC system. It
is based on white papers ( [8], [15], [16]) dealing with
potential system designs of CBDCs and on a proposal
from an already ongoing pilot project [4]. The use cases,
modeled using sequence diagrams, further support the system
study by providing an additional, more in-depth view of
specific procedures. These use cases cover, on the one hand,

access control processes (either subject to account-based
access technology or a token-based access technology)
and transaction processes (either based on a permissioned
blockchain or a permissionless blockchain). This abstraction
represents the foundation for the threat modeling conducted
based on STRIDE.
Some aspects of the abstracted architecture and the use
case diagrams are analyzed using the STRIDE methodology
to identify threats. STRIDE is a threat modeling methodology
that is widely accepted and appropriate for identifying threats
at a higher level and consists of six categories: Spoofing,
Tampering, Repudiation, Information Disclosure, Denial of
Service, and Elevation of Privilege.
Findings from scientific research further back the threats
identified by analyzing the system components. This step
is conducted to better understand the threats in place
and emphasize their relevance. The criteria ’relevance’ and
’credibility’ were defined for selecting relevant literature.
Relevance refers to the criterion of scientific literature
accurately relating to the research objectives and being relevant
in terms of their publication date. Hence, papers that do not
relate to the topic or that were published before 2019 are
excluded from the literature sample. Credibility refers to the
criterion that only trustworthy (i.e., scientific papers or official
proposals by relevant institutions) are included in the paper.
As the paper ends with a list of identified threats, the next
step deals with appropriately categorizing them. Therefore,
tables are created based on different STRIDE categories. The
columns of the tables depict the element where the threat
manifests and a scenario description. It is also indicated to
which extent threats may be specific to the potential CBDC
variants, i.e., token-based vs. account-based access control and
permissionless vs. permissioned blockchain. In the discussion
part, the results and their limitations are outlined.
IV. S YSTEM U NDER S TUDY
A. Architecture Abstraction
To understand threats, it is important to consider the
entities involved, the trust boundaries between them, and the
transmitted data. Figure 1, therefore, depicts an overview of a
(high-level) blockchain-based CBDC system architecture that
includes further variations regarding the access technology or
the type of blockchain in use. The architecture was abstracted
from several proposals/white papers about CBDC design (
[8], [15], [16]) and information about the CBDC from the
Bahamas, also referred to as the Sand Dollar [4]. However,
it has to be noted that this system abstraction might have
limitations, such as incompleteness, as it was primarily created
for threat discovery and visualization purposes.
A possible variant of a CBDC design can be represented by
a tiered structure consisting of three core entities: the central
bank, intermediaries (which can be other licensed institutions),
and end-users (which can be persons or merchants). Under this
scheme, the regulatory Know Your Customer (KYC) process
would be carried out by the respective intermediaries [8]. This
is also the case for the Bahamian Sand Dollar, where an

523

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 04:14:53 UTC from IEEE Xplore. Restrictions apply.

## Page 3

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA)

intermediary such as a bank or a government agency performs
a KYC or Anti-money laundering regulations (AML) checks
and accordingly saves the results, such as the customer and
wallet ID, into a shared KYC database [4]. Furthermore, it is
presumed that the central bank issues the CBDCs [16].
Further ecosystem components within a responsible
intermediary include a customer-facing user interface (mobile
phone or web application) and an identity management system.
Furthermore, it may contain customer support processes [16].
The Sand Dollar project, for instance, makes use of QR codes
[4].
Looking closer at the end-user entity, CBDCs will most
likely be stored in a wallet (also seen in the Sand Dollar
example [4]). As mentioned throughout the paper, design
choices might include an account-based or token-based access
technology. An account would hereby be closely linked to a
personal identity. In this case, a person must verify themselves
based on an ’I am, therefore I own’ principle. In contrast,
a token-based access technology uses so-called secrets, i.e.,
public and private keys. It follows the principle ”I know,
therefore I own” [8]. An end-user can perform business-tobusiness or peer-to-peer transactions within the Sand Dollar
project. Furthermore, there is the possibility of payment
services such as bill payment [4].
This part is when the Distributed Ledger Technology (DLT)
is added, which can be based either on a permissioned or
permissionless blockchain. It is common for permissioned
blockchains to use nodes with different capabilities, potentially
resulting in a mix of certificate authorities, transaction
endorsers, transaction validators, transaction orderers, and
anchor peers [15]. Corda, Hyperledger, and Quorum
are common types of blockchains that fit under this
example. The Swedish CBDC E-Krona, for instance, is
also considering implementing this type of blockchain.
Permissionless blockchains are commonly built on Unspent
Transaction Output (UTXO), a concept known from
cryptocurrencies such as Bitcoin. The CBDC project RSCoin
is built on a similar technology [17], however, by making
adaptions to make it appropriate for central bank usage
[18]. Both types of blockchains are supported by smart
contracts [16]. While this abstracted version of a blockchainbased CBDC architecture might have some limitations, the
entities and data flows discovered are helpful for the applied
threat modeling approach, considering that the STRIDE
methodology was chosen.
B. Use Cases
This section demonstrates specific use cases using sequence
diagrams to understand certain aspects of a blockchain-based
CBDC system. It primarily showcases the different transaction
workflows of permissioned and permissionless blockchains
and elaborates on the access control procedure, which can be
token- or account-based. The use cases were abstracted from
either research proposals or whitepapers.
Figure 3 illustrates the transaction workflow in a
permissioned blockchain based on [15]. As mentioned in

Fig. 1. High-Level Blockchain-Based CBDC Architecture

the section above, this can involve different kinds of nodes,
such as certificate authorities, anchor peers, transaction
orderers, and transaction endorsers. Users may request a
cryptographic certificate issued by a certificate authority
upon verification of the user’s identity and role. After
the user initiates a transaction, an anchor peer broadcasts
the proposals to transaction orderers. After ordering these
proposals, they need to be verified by a transaction endorser.
The endorser also receives a transaction invocation call from
the anchor peer upon which it needs to endorse the transaction.
Regarding operator candidates, certificate authorities may be
licensing authorities, compliance regulators responsible for
AML measures, or certified financial institutions.
Telecommunication firms, payment service providers, or
other financial institutions may operate anchor peers.
Transaction endorsers and transaction orderers might be
operated by the central bank or as the other nodes by licensed
financial institutions [15].
To illustrate some mechanisms of a permissionless process,
the transaction validation process of the previously mentioned
RSCoin was abstracted and visualized in a sequence diagram
depicted in Figure 3. While RSCoin’s system is built on a

524

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 04:14:53 UTC from IEEE Xplore. Restrictions apply.

## Page 4

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA)

merged into ’higher-level blocks,’ and incorporated into the
blockchain [18].
Figure 4 demonstrates an account-based access technology.
Account-based access control is a conventional way of
granting users access to their digital wallets. Hereby, the
ownership of an account is always linked to a user’s identity,
meaning that each user has one identifier across the CBDC
system [8]. Account-based access control typically uses login
credentials to verify a user’s identity [16].

Fig. 2. Permissioned Blockchain Transaction Example

blockchain similar to Bitcoin, some modifications have been
made to make it suitable for central bank usage. The system
comprises distributed ”Minettes,” and the central bank acts as
a centralized entity. To engage in a transaction, users first need
to retrieve information about each address in its transaction.

Fig. 4. Account-Based Access Scenario

In contrast to account-based access technology, token-based
access technology is not tied to a personal identity but rather
to a secret, i.e., the knowledge of one’s private key. Instead of
verifying users based on matching credentials, this technology
uses pairs of public and private keys [8].
V. T HREAT M ODELING BASED ON STRIDE
A. Threat Discovery

Fig. 3. Permissionless Blockchain Transaction Example

They further need approval from the majority of
input address owners. Upon approval, the user sends the
transactions, including the approvals, to the owners of the
according transaction identifier. After this step, a subset of
these Minettes adds this transaction into ’lower-level’ blocks.
The lower-level blocks are presented to the central bank,

Applying STRIDE, this section underlines the identified
threats within the proposed CBDC ecosystem. Looking at
the hardware and software infrastructure for intermediaries
and the central bank, the threat of spoofing and tampering
may occur. To masquerade themselves, hackers might leverage
white-listed tools and protocols [19]. Regarding tampering, a
malicious actor could introduce a backdoor at the hardware
level during chip manufacturing processes [20]. Tampering
could also occur when a malicious employee installs malware
to modify data [12]. This could potentially harm the integrity
of the software infrastructure. Hackers could also attempt to
compromise software from vendors, referred to as supply chain
attacks [21]. Hackers might also have motives that go beyond
financial gains. For instance, sponsored hackers could exploit
system vulnerabilities to cause damage to a country’s financial
system, also known as cyberwarfare [22]. Usually, this
involves so-called ‘advanced persistent threats’ (APTs) [20].
Furthermore, information disclosure threats may also occur at
the hardware or software level. On the software level, this

525

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 04:14:53 UTC from IEEE Xplore. Restrictions apply.

## Page 5

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA)

threat would manifest by having sensitive information stolen
from running applications within the CBDC ecosystem. On a
hardware level, it would mean that the attacker steals secrets
from running hardware using compromised malicious devices
nearby [20]. Further threats deal with a potential Denial of
Service, i.e. the conventional DDos example when servers
are flooded with fake traffic [12] or when hackers deploy
ransomware, infecting the IT environment by encrypting data
and demanding money in exchange for restoring the access
[23].
Analyzing the identity management system, the discovered
threats mostly relate to the elevation of privilege. For instance,
hackers could manipulate access and identity policies in the
system to their advantage [24]. If they have high capabilities,
they could also enable packet sniffing and retrieve account
usernames and passwords, which can be further exploited to
gain unauthorized access [25].
The KYC database also comes along with some threats
regarding information disclosure. Depending on the database,
hackers could perform an SQL injection to reach the database
and gain access to its data [26]. Moreover, if database backups
are not protected, it could lead to another threat if hackers can
get direct access [27].
Within customer support, threats regarding spoofing and
repudiation were identified. On the one hand, an attacker
could attempt to claim to be a user using social engineering
methods, aiming at gathering information or provoking certain
actions that are in their malicious interest. On the other hand,
spoofing might also occur when a malicious actor reaches out
to customers via email, impersonating a legitimate business
unit [28], such as customer support, and manipulating the user
to hand out sensitive information or perform specific actions.
A prominent example of repudiation could also occur when
users reach out to customer support, denying the receipt of
payments or claiming that they are fake [1].
Many threats were discovered for user interfaces such
as web and mobile applications. In the context of
spoofing, attackers could falsely impersonate secure CBDC
management software (a tactic observed in fraudulent
cryptocurrency wallets [29]), capitalizing on user data entry
during registration. Considering the potential role of mobile
applications, threats linked to SIM cards emerged, where
malevolent entities could spoof a genuine user, procuring their
SIM card via social engineering and counterfeit documents
[12].
Tampering threats were also identified, particularly in
mobile contexts. For instance, attackers could intercept and
manipulate the communication between the user and their
mobile application, inducing unintended transactions [30].
Furthermore, tampering could occur if a user installs a trojan,
providing backdoor access to the attacker.
As the research further deals with uncovering differences
between account-based and token-based access control, threats
were also identified specifically relating to these technologies.
Regarding account-based access control, there is a severe
threat regarding information disclosure and another regarding

the elevation of privilege. Given the nature of accountbased access, a breach could reveal users’ identities [8].
Since account-based access is typically handled using login
credentials, [16], there is a unique threat of hackers trying
to brute force a user’s password [12], gaining access to
their account even though they are not authorized to. While
token-based access somewhat mitigates these threats, there
are others. Since the access is linked to a secret, a user’s
private key is essential and confidential. For instance, users
unfamiliar with this technology could disclose their private
key to hackers [13], potentially losing their currencies. From
a repudiation perspective, users could further deny that they
made a particular transaction, claiming their private key was
stolen or otherwise revealed to hackers.
As the paper examines CBDCs built on a distributed
ledger, it is important to identify blockchain-specific threats.
Several threats may manifest on the Distributed ledger of a
CBDC. Looking at spoofing, there is the threat of a malicious
actor disguising as a legitimate node [20]. Furthermore,
in a permissioned blockchain, there is the possibility that
fraudulent new identities are forged using compromised
certificates [14]. In the context of tampering, there might be
the threat of a malicious entity creating nodes to increase
their control and influence over the network, especially in the
context of permissionless blockchains [31].
Further tampering might occur when the consensus protocol
is manipulated through network partitioning via manipulation
of the network routing. Additionally, exploiting cryptographic
vulnerabilities through, for instance, collision attacks is
another example of how tampering could occur on a
Distributed ledger [14]. Regarding information disclosure,
large-scale data breaches are possible if the ledger is operated
and organized by intermediaries [8] as in the case of a
permissioned blockchain. It is also possible to re-identify
users using techniques such as network analysis, transaction
fingerprinting, and address clustering, mostly manifesting
in permissionless blockchains, where such information is
more easily accessible. Additionally, there is the threat of
disclosing information by intercepting sensitive requests that
were intended for nodes that have more permissions [6].
The research identified further threats relating to the denial
of service. For instance, a hacker may flood specific peer
nodes with TCP syn packets [14]. Another way an attacker
can deny service is by sending false transactions to pressure
the consensus mechanism [1]. In a permissioned blockchain,
the transaction endorser might get overwhelmed when this
happens [14].
The fact that smart contracts are a substantial part
of a CBDC ecosystem led to identifying a few specific
threats. Regarding information disclosure, program privacy,
i.e., the privacy of smart contracts, might be harmed when
programming code or input data is disclosed [6]. Furthermore,
there is another threat of tampering when updates for smart
contracts are modified to create backdoors [14].

526

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 04:14:53 UTC from IEEE Xplore. Restrictions apply.

## Page 6

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA)

B. Threat Classification
The threat discovery led to identifying 39 threats classified
in this section. Each table lists the threats relating to one
of the STRIDE categories spoofing, tampering, repudiation,
information disclosure, denial of service, and elevation of
privilege. The left column indicates the system element, i.e.,
where the threat manifests. The right column summarizes the
scenario in a short description. What can be noticed is that, to
a substantial part, threats were discovered in the categories of
spoofing, tampering, and information disclosure. These results
are further evaluated in the discussion section, and potential
limitations are outlined.
TABLE I
S POOFING T HREATS
Element

Scenario Description

SW/HW Infrastr.

leverage white-listed tools and protocols to
masquerade themselves
claim to be users in front of customer support to
engage in further malicious activity
send emails in which they impersonate customer
support
claim to offer software to securely manage CBDCs,
exploiting users’ registration or data input
claim to be users to obtain their SIM card using
social engineering and fake documents
disguise themselves as legitimate nodes
forge new identities using compromised certificates

Customer Support
Customer Support
User Interface
User Interface
DLT
DLT

Table I shows seven spoofing threats that could be identified,
manifesting within the software/hardware infrastructure,
customer support processes, the user interface, and the
Distributed ledger. There is one spoofing threat that primarily
relates to a permissioned blockchain.
Regarding tampering, the research discovered 10 threats,
manifesting in almost every relevant element. One threat is
unique to a permissionless blockchain.
The research only revealed 2 repudiation threats; one for
customer support and one for token-based access control.
Regarding information disclosure, 12 threats could be
identified. These threats also occur in most of the substantial
system elements. Unique threats are appearing in both
account-based and token-based access technologies and in
permissioned and permissionless blockchains.
Denial of service threats was limited to discovering 4 threats
in total. They manifest in both the hardware and software
infrastructure and the DLT.
Regarding the elevation of privilege, 4 threats could be
identified. They occur within the identity management system,
the user interface, and account-based access technology.
Comparing the occurrences of threats based on the
respective STRIDE categories shows that most threats
could be identified thinking about spoofing, tampering, and
information disclosure by discovering 7, 10, and 12 threats,
respectively. It further shows that three threats are specific to a
permissioned blockchain variant, while two primarily occur in
permissionless blockchain networks. Regarding access control,

TABLE II
TAMPERING T HREATS
Element

Scenario Description

SW/HW Infrastr.

introduce a backdoor at the hardware level during
chip manufacturing processes
a malicious employee installs malware to modify
data, harming the integrity of the software
infrastructure, including the associated databases
engage in cyberwarfare and APTs to cause damage
to a country’s financial system
compromise software from vendors, referred to as
supply chain attacks
control the traffic between the user and their mobile
application using MITM attacks and manipulate
messages or let the user perform unintended
transactions
make users install trojan malware, granting them
backdoor access
create nodes to increase their control and influence
over the network
manipulate the consensus protocol through network
partitioning via manipulation of the network routing
exploit cryptographic vulnerabilities using collision
attacks
manipulate updates to create backdoors

SW/HW Infrastr.

SW/HW Infrastr.
SW/HW Infrastr.
User Interface

User Interface
DLT
DLT
DLT
Smart Contract

TABLE III
R EPUDIATION T HREATS
Element

Scenario Description

Customer Support

users deny the receipt of payments or claim that
they are fake
users deny that they made a certain transaction,
claiming their private key was stolen

Access Technology

TABLE IV
I NFORMATION D ISCLOSURE T HREATS
Element

Scenario Description

SW/HW Infrastr.

steal sensitive information from running
applications within the CBDC ecosystem
steal secrets from running hardware using
compromised malicious devices
gain direct access to data storage backups
perform an SQL injection to reach the database and
gain access to its data
intercept the PIN sent via SMS by eavesdropping
on the network communication
reveal users’ full identities due to a privacy breach
make users disclose their private key
perform a large-scale data breach targeting
intermediaries that operate the ledger
re-identify users by making use of network
analysis, transaction fingerprinting, and address
clustering
intercept sensitive requests that were intended for
nodes with more permissions
get access to the code of smart contracts
get access to input data of smart contracts

SW/HW Infrastr.
KYC Database
KYC Database
User Interface
Access Technology
Access Technology
DLT
DLT

DLT
Smart Contract
Smart Contract

account-based access and token-based access come with two

527

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 04:14:53 UTC from IEEE Xplore. Restrictions apply.

## Page 7

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA)
TABLE V
D ENIAL OF S ERVICE T HREATS
Element

Scenario Description

SW/HW Infrastr.
SW/HW Infrastr.

flood servers with fake traffic
deploy ransomware, encrypting data and demanding
money in exchange for restoring the access
flood specific peer nodes with TCP syn packets
send false transactions to pressure the consensus
mechanism by overwhelming the transaction endorser

DLT
DLT

TABLE VI
E LEVATION OF P RIVILEGE T HREATS
Element

Scenario Description

Identity Management System

manipulate access and identity policies
in the system to elevate privileges
enable packet sniffing and retrieve
account usernames and passwords to
gain unauthorized access
exploit
the
vulnerabilities
of
applications, gaining admin status
and full access
brute force a user’s password, gaining
access to their account

Identity Management System

User Interface

Access Technology

unique threats each.
VI. D ISCUSSION AND L IMITATIONS
Referring to the initial research question, identifying 39
threats as shown in Figure 5 indicates that STRIDE is an
appropriate methodology for discovering threats in the context
of CBDCs. It must be noted that threats in the categories
of spoofing, tampering, and information disclosure could be
discovered more frequently than the remaining categories,
indicating a potential limitation.
Given the synthesized architecture abstraction, the threat
model might look different than one done for a system
that represents an officially launched CBDC. Considering
the novelty of that topic and the lack of existing pilots
or well-documented proposals, a synthesized abstraction of
a few proposed CBDC architectures was chosen under
acknowledgment of potential drawbacks from taking a higherlevel perspective and, hence, not being able to discover very
specific threats. However, the fact that this paper presents a
pioneering work in the context of threat modeling CBDCs
might make up for this limitation and yet manages to provide
valuable insights for future design choices.
Another factor that influenced the research objectives was
current indecisiveness about design specifics such as the
access technology in use or the type of blockchain (if any)
[8], which led to an approach attempting to discover threats
under consideration of potential variants of blockchain-based
CBDCs. While the results show that threats are unique to
one of these specifics, they provide no conclusion of what
choice might be more favorable from a security and privacy
perspective. However, they provide further insights into the
unique threats and the potentially different requirements. For

Fig. 5. STRIDE Threats Distribution

instance, for account-based access, it might be necessary to
put greater focus on mitigating brute-force attacks, while for
token-based access, the focus should be on propagating the
confidentiality behind private keys to users unfamiliar with that
technology. While these differences are worth to be examined,
they are not free from limitations.
Although many central banks have not yet proposed
their preferences, there are some tendencies regarding
which implementation might be more likely. Based on the
documentation by the Bank for International Settlements
[8], account-based access combined with a permissioned
blockchain network might be the favorable option. Accountbased access may be necessary to mitigate money laundering
or terrorism financing, as each account is linked to a user’s
real identity. Furthermore, a permissioned blockchain might
be favored as it grants central banks and intermediaries more
control over the network while achieving lower economic
costs. However, although these two options might be favored,
no concrete evidence rules out the alternatives completely,
which led to the inclusion of these variants within the studied
CBDC system abstraction.
In summary, while this paper has its limitations, it provides
39 threats that could be discovered using STRIDE. It classifies
them based on the respective STRIDE categories while at the
same time paying additional attention to the threat context
of CBDCs containing certain design specifics. It provides
the research implications that 1.) STRIDE is appropriate for
examining the threats of CBDCs, at least on a higher level, and
2.) depending on design specifics, the requirements revealed by
this threat model vary. There lies great potential in exploring
the threat context of CBDCs using alternative threat modeling
methodologies or applying threat modeling to a different
system architecture once central banks decide to publish more
information about their ongoing CBDC projects.
VII. C ONCLUSION
This research delineates 39 potential threats pertaining to
CBDCs using the STRIDE threat modeling methodology. A
rigorous analysis was conducted by abstracting a synthesized

528

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 04:14:53 UTC from IEEE Xplore. Restrictions apply.

## Page 8

2023 Fifth International Conference on Blockchain Computing and Applications (BCCA)

version of a CBDC system and incorporating visualized
use cases via sequence diagrams. Each component was
meticulously scrutinized, leading to the identification and
classification of threats.
The application of STRIDE illuminated a higher number
of threats associated with spoofing (7), tampering (10), and
information disclosure (12) relative to repudiation (2), denial
of service (4), and elevation of privilege (4). The volume
of threats discerned underscores the efficacy of the STRIDE
methodology. However, it is essential to acknowledge the
inherent limitations of a high-level architecture abstraction,
which could obfuscate the revelation of specific threats.
The study further illustrates how differences in system
specifics, which remain undecided, can significantly affect
the landscape of potential threats, indicating a scope of
varying requirements contingent on the final design decisions.
As an inaugural exploration into the threat modeling of
CBDCs, this work sparks a broader conversation on security
and privacy concerns tied to this novel form of payment.
It advocates for future research utilizing alternative threat
modeling methodologies and various system architectures,
emphasizing the importance of addressing security and privacy
considerations in developing CBDCs.
In our future work, we will focus on the analysis of
CBDCs in more complex AI environments [32] and investigate
strategic requirements engineering [33] for their secure
incorporation in such environments [34], [35].
ACKNOWLEDGMENT
This research has been supported in part by ASPIRE
under the ASPIRE Virtual Research Institute Program,
Award Number VRI20-07. ASPIRE is part of the Advanced
Technology Research Council located in Abu Dhabi, UAE.
R EFERENCES
[1] Y. Chu, J. Lee, S. Kim, H. Kim, Y. Yoon, and H. Chung, “Review
of offline payment function of cbdc considering security requirements,”
Applied Sciences, vol. 12, no. 9, p. 4488, 2022.
[2] J. Gross, J. Sedlmeir, M. Babel, A. Bechtel, and B. Schellinger,
“Designing a central bank digital currency with support for cash-like
privacy,” Available at SSRN 3891121, 2021.
[3] Y.-R. Wang, C.-Q. Ma, and Y.-S. Ren, “A model for cbdc audits
based on blockchain technology: Learning from the dcep,” Research
in International Business and Finance, vol. 63, p. 101781, 2022.
[4] “Project sand dollar: A bahamas payments system modernisation
initiative,” 2019.
[5] M. Kashif and K. Kalkan, “Bcpripiot: Blockchain utilized privacypreservation mechanism for iot devices,” in 2021 Third International
Conference on Blockchain Computing and Applications (BCCA). IEEE,
2021, pp. 201–209.
[6] Y. Lee, B. Son, S. Park, J. Lee, and H. Jang, “A survey on security and
privacy in blockchain-based central bank digital currencies.” J. Internet
Serv. Inf. Secur., vol. 11, no. 3, pp. 16–29, 2021.
[7] Z. Ke and N. Park, “Hyperledger fabric node types and performance
study,” in 2021 Third International Conference on Blockchain
Computing and Applications (BCCA). IEEE, 2021, pp. 119–126.
[8] R. Auer and R. Böhme, “The technology of retail central bank digital
currency,” BIS Quarterly Review, March, 2020.
[9] V. Sethaput and S. Innet, “Blockchain application for central bank digital
currencies (cbdc),” Cluster Computing, pp. 1–15, 2023.
[10] S. Abramova, R. Böhme, H. Elsinger, H. Stix, and M. Summer, “What
can cbdc designers learn from asking potential users? results from a
survey of austrian residents,” Working Paper, Tech. Rep., 2022.

[11] R. Khan, K. McLaughlin, D. Laverty, and S. Sezer, “Stride-based threat
modeling for cyber-physical systems,” in 2017 IEEE PES Innovative
Smart Grid Technologies Conference Europe (ISGT-Europe). IEEE,
2017, pp. 1–6.
[12] G. Ali, M. Ally Dida, and A. Elikana Sam, “Two-factor authentication
scheme for mobile money: A review of threat models and
countermeasures,” Future Internet, vol. 12, no. 10, p. 160, 2020.
[13] T. Guggenberger, V. Schlatt, J. Schmid, and N. Urbach, “A structured
overview of attacks on blockchain systems.” PACIS, p. 100, 2021.
[14] B. Putz and G. Pernul, “Detecting blockchain security threats,” in 2020
IEEE International Conference on Blockchain (Blockchain). IEEE,
2020, pp. 313–320.
[15] S. Warren, Z. Fan, and M. Blake, “Cbdc technology considerations,”
2021.
[16] L. de Lima and E. Salinas, “Retail central bank digital currency: From
vision to design,” 2022.
[17] T. Zhang and Z. Huang, “Blockchain and central bank digital currency,”
ICT Express, vol. 8, no. 2, pp. 264–270, 2022.
[18] G. Danezis and S. Meiklejohn, “Centrally banked cryptocurrencies,”
CoRR, vol. abs/1505.06895, 2015.
[19] A. Basak, C. Kamhoua, S. Venkatesan, M. Gutierrez, A. H. Anwar,
and C. Kiekintveld, “Identifying stealthy attackers in a game theoretic
framework using deception.” Springer, 2019, pp. 21–32.
[20] C. Minwalla, “Security of a cbdc,” Bank of Canada, Tech. Rep., 2020.
[21] S. Doerr, L. Gambacorta, T. Leach, B. Legros, and D. Whyte, “Cyber
risk in central banking,” 2022.
[22] S. Tian, B. Zhao, and R. O. Olivares, “Cybersecurity risks and central
banks’ sentiment on central bank digital currency: Evidence from global
cyberattacks,” Finance Research Letters, vol. 53, p. 103609, 2023.
[23] M. Vučinić and R. Luburić, “Fintech, risk-based thinking and cyber
risk,” Journal of Central Banking Theory and Practice, vol. 11, no. 2,
pp. 27–53, 2022.
[24] H. Tabrizchi and M. Kuchaki Rafsanjani, “A survey on security
challenges in cloud computing: issues, threats, and solutions,” The
journal of supercomputing, vol. 76, no. 12, pp. 9493–9532, 2020.
[25] A. E. Eldewahi, A. Hassan, K. Elbadawi, and B. I. Barry, “The
analysis of mate attack in sdn based on stride model,” in Advances in
Internet, Data & Web Technologies: The 6th International Conference on
Emerging Internet, Data & Web Technologies (EIDWT-2018). Springer,
2018, pp. 901–910.
[26] A. Mousa, M. Karabatak, and T. Mustafa, “Database security threats and
challenges,” in 2020 8th International Symposium on Digital Forensics
and Security (ISDFS). IEEE, 2020, pp. 1–5.
[27] S. M. Hussain, M. H. Islam, A. Ali, and M. U. Nazir, “Threat modeling
framework for security of unified storages in private data centers,” in
2020 IEEE 22nd Conference on Business Informatics (CBI), vol. 2.
IEEE, 2020, pp. 111–120.
[28] D. Bera, O. Ogbanufe, and D. J. Kim, “Towards a thematic dimensional
framework of online fraud: An exploration of fraudulent email attack
tactics and intentions,” Decision Support Systems, p. 113977, 2023.
[29] M. Froehlich, P. Hulm, and F. Alt, “Under pressure. a user-centered
threat model for cryptocurrency owners,” in 2021 4th International
Conference on Blockchain Technology and Applications, 2021, pp. 39–
50.
[30] B. Reaves, J. Bowers, N. Scaife, A. Bates, A. Bhartiya, P. Traynor,
and K. R. Butler, “Mo(bile) money, mo(bile) problems: Analysis of
branchless banking applications,” ACM Transactions on Privacy and
Security (TOPS), vol. 20, no. 3, pp. 1–31, 2017.
[31] T. Hansen and K. Delak, “Security considerations for a central bank
digital currency,” 2022.
[32] O. Bouachir, M. Aloqaily, F. Karray, and A. Elsaddik, “Ai-based
blockchain for the metaverse: Approaches and challenges,” in 2022
Fourth International Conference on Blockchain Computing and
Applications (BCCA), 2022, pp. 231–236.
[33] D. Svetinovic, “Strategic requirements engineering for complex
sustainable systems,” Systems Engineering, vol. 16, no. 2, pp. 165–174,
2013.
[34] H. Suleiman and D. Svetinovic, “Evaluating the effectiveness of the
security quality requirements engineering (square) method: A case study
using smart grid advanced metering infrastructure,” Requir. Eng., vol. 18,
no. 3, p. 251–279, sep 2013.
[35] T.-H. Chang and D. Svetinovic, “Improving bitcoin ownership
identification using transaction patterns analysis,” IEEE Transactions on
Systems, Man, and Cybernetics: Systems, vol. 50, no. 1, pp. 9–20, 2018.

529

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on April 21,2026 at 04:14:53 UTC from IEEE Xplore. Restrictions apply.
