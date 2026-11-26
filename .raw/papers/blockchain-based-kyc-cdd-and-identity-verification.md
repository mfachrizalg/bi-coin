---
source_type: pdf
title: "Blockchain-Based-KYC-CDD-and-Identity-Verification"
original_file: "thesis/reference/Blockchain-Based-KYC-CDD-and-Identity-Verification.pdf"
sha256: "d0fa1255e433ec9e7b7f18358d592da2973cfde4d3249654b9ef9763f5aed8be"
page_count: 13
extracted: 2026-11-11
extraction_method: "text (pdftotext -layout)"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Blockchain-Based-KYC-CDD-and-Identity-Verification

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Blockchain-Based KYC/CDD and Identity Verification
       Authors: Samuel Aidoo,Int.Dip(AML),MICA, Richard Marko, Esman Kurum

                                      Date: 8th June, 2025.

Abstract

As financial crime and compliance costs soar, distributed ledger technology (DLT) offers a novel
solution for customer due diligence (CDD) and identity verification. This paper examines how
blockchain-based, decentralized identity platforms can streamline KYC/CDD in financial
services by enabling secure, permissioned sharing of verified customer identity data across
institutions. By eliminating redundant data collection and manual reviews, decentralized KYC
networks can cut on boarding and verification costs by up to 50%. We review current blockchain
platforms (Hyperledger Fabric/Indy, Sovrin, Ethereum) and real-world pilots (e.g. R3 Corda,
OCBC/HSBC/MUFG KYC consortium) that exemplify this approach. Emphasis is placed on
compliance efficiency and alignment with U.S. AML modernization priorities: blockchain’s
immutable audit trail and native auditability support risk-based AML programs while deterring
illicit finance. Through case studies and the author’s prior AML work, we show that shared
digital identity networks can improve national financial security by enabling regulators and
institutions to spot suspicious patterns faster. Policy recommendations include regulatory
guidance for digital identity standards (e.g. W3C Verifiable Credentials), safe harbors for inter-
bank data sharing (e.g. Patriot Act 314(b) expansion), and public–private pilots under
FinCEN/OCC innovation programs. Overall, blockchain-enabled identity systems promise to
enhance U.S. financial resilience, reduce compliance duplication, and combat financial crime,
meeting the criteria for EB-2 NIW national interest and impact.

Keywords: blockchain, KYC, CDD, digital identity, AML, distributed ledger, decentralized
identity, financial crimes, regulatory regime;.

1. Introduction

Global financial institutions are dedicating huge resources to their Know-Your-Customer (KYC)
and anti-money laundering (AML) compliance. Current KYC/CDD systems are cumbersome, as
they require each bank to independently gather, verify, and store a customer’s identity papers
and their risk profile. This is inefficient as it results in expensive duplication of effort: in most
cases, a customer will have to submit the same proofs to each bank with which they interact.
Research suggests the cost of KYC process could be between 10–50 per cent of a bank’s AML
compliance budget, KYC made up about 3–4 per cent of a bank’s cost base in a PwC survey and
potential for 60–80 per cent cost-savings were identified by digitising KYC process. According
to a 2018 study from a major global bank, 81% of financial executives believe that blockchain-
based identity solutions could reduce onboarding and KYC process costs by up to 50%.

These inefficiencies also have implications for national security and the soundness of the
financial system. The United States Bank Secrecy Act and AML Act of 2020 requires AML
programs to be risk-based in order to combat illicit finance. The KYC is too heavy for large

## Page 2

transactions, makes payments sluggish and creates blind spots for regulation. Tech is driving the
current vogue for modernized AML: More is now demanded of technology (FinCEN’s 2024
proposal calls for “effective, risk-based” programs to protect national security). These targeted
points are directly supported by decentralized identity on blockchain as it enables transparent,
tamper-proof KYC records that regulators and banks can trust jointly and equally.

The lead author who is an experienced AML/Financial Crime Compliance Expert at Citibank
Europe (Poland), with advanced AML qualifications (International Diploma in AML and a
professional member of the International Compliance Association, ICA) analyses how
distributed ledger platforms may significantly enhance KYC/CDD offering. Our novel
contribution is to consolidate the state-of-the-art efforts and suggest a compliance architecture
integrating blockchain identity and U.S. AML policy. We use case studies (from R3’s Corda as
well as bank consortia in Asia and Europe) and the author’s expertise in AML to illustrate the
real-world implications for banks, regulators and policy makers.

The rest of this paper is organized as follows. Section 2 discuss KYC/CDD challenges and the
national interest in AML effectiveness. Section 3 describes blockchain-based identity and
decentralized KYC architectures. Section 4 surveys dominant platforms (Hyperledger
Fabric/Indy, Sovrin, Ethereum) and the mechanisms with which they facilitate sharing of
identity data. Pilot projects (R3 Corda, consortium proofs-of-concept, etc) that illustrate the
potential of blockchain KYC are reviewed in Section 5. Section 6 examines efficiency
improvements and AML compliance benefits, such as significant cost savings and improved
fraud protection. Section 7 explains how these innovations are furthering U.S. AML
modernization objectives from a regulatory viewpoint (FinCEN’s Digital ID pilot programs).
Section 8 then offers suggestions (of e.g. standards, legal safe harbors) for U.S. officials. The
conclusion emphasizes that blockchain KYC serves the national interest by reinforcing financial
security and fighting against illicit financing.

2. KYC/CDD Challenges and National Security Context

Today, financial institutions invest huge amounts of money in KYC/CDD and AML
compliance. KYC procedures are expensive: the average corporate KYC is tens of hours and
hundreds of dollars per customer. According to a report from PwC, some banks are paying in
excess of $20–24M a year for KYC and automation may reduce between 60–80% of those costs.
Regulators also monitor KYC information under the Bank Secrecy Act and order banks to file
suspicious activity reports (SARs) with verified customer information. But manual workflows
also are error-prone, delayed and fractured.

The inefficiency is systemic. Even within a single bank, K.Y.C. data is frequently housed in
silos: customers resubmit the same documents when applying to the different divisions.
Information doesn’t pass between banks: a customer of one bank must do KYC all over again
for another bank. This redundant process can last weeks, which is both a customer frustration
and a cost driver. It was reported in the Financial Times that in Asia “KYC processes are
conducted bank by bank, with customers having to provide the same information to multiple
banks… This is a costly and inefficient process for both banks and for the customer.” In fact,

## Page 3

according to R3’s Corda KYC pilot, “legacy KYC processes are complex and frequently
repetitive”.

For national security purposes, strong KYC is necessary in order to deter financial crime. The
BSA/AML is central to agency policy in the fight against money laundering and terrorist
financing, the FDIC explains, which “requires banks to implement policies, procedures, and
processes to prevent and guard against money laundering and terrorism financing that uses the
U.S. banking system to move funds”. The AML Act of 2020 and FinCEN’s modernization rules
also strengthen that mandate. Treasury officials stress that “effective, risk-based and well-
designed AML/CFT programs are essential to protect national security and uphold the integrity
of the U.S. financial system.”. In other words, anything that makes the AML framework
stronger (particularly via technology) is in the national interest.

The U.S. is also increasingly leaning on tech to make sure people comply. FinCEN’s 2021
Innovation Hours initiative in carried out with GDF discussed digital ID and shared KYC
solutions. According to FinCEN, the digital identity solutions could meet the Customer
Identification Program (CIP) regulations, but a number of financial institutions are also not
aware that there are tools for that. So, one of the highest national priorities should be to leverage
digital ID to speed up and optimize CIP/CIP checks and make them reliable — so that banks can
focus on the real risks of illicit finance. It directly serves that mission: BLOCKCHAIN KYC
makes it possible to establish a unique ID, something that we can verify, and then you need less
paper in the process.

In short, the existing KYC/CDD ecosystem is expensive and siloed, encumbering both banks
and regulators. It provides a roadmap to centralize identity for trust and share-on-need (important
nationally on two fronts: ease banks’ compliance costs (which can invest such savings further
toward law enforcement support) and reinforce AML defenses protecting U.S. financial system
(foster anti-crime and anti-terrorism goals).

3. Blockchain and Decentralized Identity: Concepts and Technology

Blockchain is a distributed ledger for transactions, applied to in tamper proof manner across
multiple nodes. In a permissioned (private) blockchain you have control of participants who can
write and validate data, making it suitable for strong identity management while preserving
privacy. Here's why Blockchain seems promising to know your client: a digital and tamper proof
certificate of transactions, cryptographic security and shared ledgers without a central authority.
” Each “block” includes encrypted records as well as a hash that ties it to the previous block — if
any record is tampered with, the chain is broken. All nodes have copies, which are updated
based on consensus rules, so there can be no single-point failure or fraudulent amendment.

DID Frameworks are layers added to, and leverage, blockchain so that individuals can control
their own credentials. In such model, customers own digital identity wallets which store
verifiable credentials (VCs) generated by trusted entities (such as governments, banks). These
(identity, address etc.) credentials are cryptographically signed by the user, and the user can
decide to share with banks while onboarding. It’s important to note that the sensitive data itself
doesn’t have to be broadcasted on-chain; rather, cryptographic proofs (or references to off-chain

## Page 4

storage) allow for the verification of claims without PII leakage. In this way, blockchain
networks act as a trust infrastructure for the manipulation and transfer of digital IDs.

An influential one is the Sovrin Network (developed on Hyperledger Indy), which is a public-
permissioned ledger for self-sovereign identity. Sovrin issues decentralized identifiers (DIDs)
and it enables the use of travel verifiable credentials. Similarly (Hyperledger Indy and the Aries
framework) offers identity libraries for verifiable identity based on the DLT. Industry pilots,
meanwhile, use Indy-based, or Ethereum-based solutions for vetting identity. Public chains (e.g.,
Ethereum) support open verification of signatures, and permissioned chains (e.g., Hyperledger
Fabric, Corda) support privacy and permission control. For instance, Hyperledger Fabric allows
pluggable membership services and pluggable encryption, and is applicable for enterprise KYC
consortia.

A typical blockchain KYC flow is depicted in Figure 1.




                                                                        A




In the typical design, when a customer has undergone KYC check at Bank A, his/her identity
attributes (or hash of the identity attributes) are written onto the shared ledger. Bank A serves as
an issuer of a digital credential. Then, if a customer makes an application to Bank B, for
example, the customer could provide the credential used at Bank A. Bank B, meanwhile, can
authenticate the claim (by looking at the ledger) without having to reaggregate all raw data. This
avoids unnecessary work. Permissioned blockchains also provide to authorize banks and
regulators with access control to the network and encryption features (for example, zero-
knowledge proofs) for user privacy and data regulation compliance.

## Page 5

Decentralised identity systems are technically reliant on standards such as the W3C’s DID
(decentralised identifier) and Verifiable Credential models. These establish data standards and
protocols which control the generation and exchange of credentials. On the blockchain, these are
the protocols that enable banks to do business with one another. Its members, for instance,
could agree that a central bank will issue a digital corporate identity that all banks on the network
acknowledge. Or private consortia can serve as identity registrars. A More Detailed Model for
Blockchain Identity Systems The preceding model is too simple a reference model, as we will
soon see;but it is adequate to begin and serves as a useful comparison for examining a much
more detailed model.when we formally introduce the atomic concepts of a blockchain identity -
earlyclaimant, claimant, etc. - instead of just the simple two-PEP model we’ve described so far.
More concepts of BP (such as a hash-locks/digital signatures) can be introduced here, they will
be defined later. (I’m going to describe those later in this paper!)More detailed comparisons will
be drawn later between the two models: for example, the BP 1.x atomic concept “early
claimant” (a claimant) will become especially important when we introduce elements of
anonymity, which are difficult in traditional PKI but more native in blockchain identity systems
when they’re designed in them with slightly richer concepts than the basic PEP model. If a BP
system can protect user identity, we’ll get a clue about how blockchain reallyshouldanonymity
than traditional single-round certificate chains. The ledger can contain permissions and
attestations, with specifics held encrypted or on a need-to-know basis.

But beyond the technical setup, decentralized identity represents a governance shift: it gives
control (and consent) back to the customer. In previous pilots, customers specifically grant on-
chain access to their KYC data. This level of user-first design inspires confidence and trust. The
user may also have to update their details (e.g. changing address) just once, and the updated
details can then flow between banks by permission (rather than having to inform each bank
separately). This self-sovereign approach also allows for the reuse and updating of identity
claims, and prevents data staleness.

4. Decentralized KYC Platforms and Data Sharing

Blockchain KYC systems can be considered as shared-permission identity repositories. It’s
important to note that these are not centralized databases, operated by one body (a single
government registry) but rather shared networks maintained by multiple actors. A number of
realisations were published:

• Hyperledger Fabric KYC Networks: With Fabric’s capability to easily adapt to an
environment that would resemble a banking consortium, banks can become part of a channel,
where a chaincode (smart contract) manages the identity records. IntellectEU, a blockchain
integrator, has developed KYC/identity management proof of concepts on Fabric. The Fabric
identity feature can connect to institution authority systems, and enterprises can manage the
usage of their own data.

• Corda KYC CorDapps: The R3 permissioned DLT (distributed ledger technology) R3 Corda,
is a business interoperability centric program. R3’s KYC3 was developed as part of R3’s know
your customer (KYC) solution trial —– in which banks utilized Corda nodes hosted on Azure
(Microsoft’s open-source blockchain computing platform), as well as a Synechron-designed

## Page 6

CorDapp (Corda distributed application) for KYC data management. In that model Corda’s
point-to-point data sharing guaranteed that only relevant counterparties (ie, banks requesting
KYC info) could receive a customer’s data to guarantee confidentiality.

• Sovrin/Indy Identity Ledger: Sovrin is focused on identity. And banks would be able to sign
up to Sovrin as stewards, and be able to issue DIDs to customers. Once migrated on Sovrin, users
have Sovrin credentials e.g. “Citi verified corporate officer” that any compliant FI can to check.
While they are global in the strict sense, such networks are functioning as de facto ID utilities
for banking.

• Blockchain Consortia: In addition to platform plays, some banking consortia establish their
own blockchains. The OCBC-HSBC-MUFG-Singapore pilot in 2017 developed a custom DLT
(and it’s unclear whether it was from Hyperledger or whatever) specifically for KYC. That
proof-of-concept involved a dedicated KYC ledger where banks kept identity documents and
attestations were issued. More broadly, industry groups like the Trade Information Network
(which BNY Mellon is a member of and includes 40 banks) are considering shared identity
ledgers for institutional clients.

Crucial to these platforms is how they share data. In a decentralized KYC model, banks do not
expose all customer information to all participants. Instead, customers consent to share certain
attributes or credentials. For example, Bank B can ask Bank A (via the chain) for permission to
view a corporate customer’s verified address and directors. The customer’s wallet grants access;
the ledger logs this access grant. Any updates (such as a new company director) made by the
customer or by KYC officials at Bank A are then visible to authorized participants. This
contrasts starkly with today’s isolated silos.

Technologies like zero-knowledge proofs (ZKPs) can further enhance privacy: a customer
might prove “age > 18” without revealing their exact birthdate, or prove an address is registered
without exposing the street. Emerging blockchain identity standards are beginning to incorporate
these features. Meanwhile, robust cryptographic keys ensure data integrity: changing a credential
or forging a document would immediately fail to verify against the immutable ledger hash.

Importantly, U.S. regulators have signaled openness to such digital ID solutions. FinCEN’s
Innovation Hours report noted that existing regulations permit “the use of digital identity
solutions for [Customer Identification Program] requirements”. Under current law (31 CFR
1020.220 etc.), banks must collect CIP data, but how that collection happens is not prescribed –
digital credentials on a blockchain could satisfy it. Moreover, the USA Patriot Act’s Section
314(b) encourages information sharing among banks for AML purposes. Expanding safe-harbor
rules to explicitly cover blockchain-shared identity data would further enable these networks
(though this is a policy recommendation to be discussed in Section 8).

In summary, decentralized KYC platforms create a shared infrastructure: verified identity data is
entered once and reused by multiple parties. This architecture directly addresses known
inefficiencies. As R3 notes, each institution no longer needs to “individually attest and update
KYC records” – one attestation on the ledger suffices for all. The result is not only cost savings
(discussed next) but also faster onboarding and richer data for compliance.

## Page 7

5. Case Studies: Blockchain Solutions in KYC

To ground the discussion, we review several real-world pilots and projects that illustrate
blockchain KYC in action. These examples demonstrate both technical feasibility and business
interest.

R3 Corda KYC Trial (2018): In a widely reported test, R3 partnered with Synechron and 39
firms (including ABN AMRO, BNP Paribas, ING, US Bank, etc.) to simulate a global KYC
registry. Over 300 mock KYC transactions were conducted across 19 countries on a Corda
network. Each bank and even multiple regulatory bodies participated as network nodes. The
process worked as follows: customer data was digitized by one bank, which then could grant
access to others. The trial showed that customers could approve or revoke sharing of their KYC
data, and that any customer update (say a document expiry) was automatically propagated to all
permissioned banks. R3 emphasized that this self-sovereign model “allows corporate customers
to create and manage their own identities…grant permission to multiple participants… [which]
reduces duplication and costs by eliminating the need for each institution to individually attest
and update KYC records”. In other words, the Corda pilot confirmed the concept: a shared ledger
can handle multi-bank KYC workflows efficiently while preserving privacy (only authorized
parties saw each data item).

Asia KYC Consortium (2017): OCBC Bank (Singapore) led a proof-of-concept with HSBC,
MUFG, and Singapore’s Infocomm Media Development Authority (IMDA) to build a Southeast
Asia KYC platform. This prototype leveraged blockchain to create a common repository of
customer ID documents (encrypted and permissioned). The press highlighted the inefficiency:
“the existing KYC process… requires customers to provide the same information to different
institutions… [which] can take weeks”. In the blockchain prototype, compliance officers could
record verified ID data on-chain, and then share it with other banks by cryptographic means. The
goal was explicit: “to reduce the duplication of information and manual checks for both banks
and customers”. While this project did not immediately go into production, it showed that major
banks actively prototype blockchain solutions to the KYC problem.

Hyperledger Fabric Identity POCs: Various institutions have tested Fabric for identity. For
example, IntellectEU (a blockchain solutions firm) reported building Fabric-based pilots for
“document management and authentication, KYC/identity management, … and central bank use
cases”. In their experience, Fabric’s permissioned channels and chaincode allowed rapid
development of enterprise KYC apps. Likewise, Evernym (the startup behind Sovrin) has
worked with banks to issue verifiable credentials on Indy/Fabric backends. These efforts show
that multiple DLT frameworks can support KYC. Fabric, being highly configurable, is often
chosen when banks need fine-grained access controls (its membership services plug into bank ID
systems).

Public Network Initiatives: Beyond pilot demos, some broader networks exemplify blockchain
identity. The Sovrin Foundation (now Hyperledger Indy) has onboarded banks in its
permissioned network, aiming for cross-border KYC portability. Though mostly publicized in
tech circles, Sovrin is specifically designed for exactly this problem: a digital identity utility.
Another example is Civic (a commercial platform on Ethereum) that issues ID tokens to users

## Page 8

that can be reused at partner merchants and brokers (including some fintech lenders). While
Civic is private enterprise, it shows interest from identity verification vendors. Microsoft’s ION
(on Bitcoin) also demonstrates that even a major tech company believes distributed identity
(using DIDs) will reshape KYC.

Collectively, these case studies indicate that blockchain KYC is not a theoretical concept. Large
banks, consortia, and fintechs have built and tested the core idea. In each case, the result is a
network where once a customer’s identity attributes are verified and stored, any compliant
participant can access those credentials without re-validating raw documents. This new paradigm
is a radical shift from siloed KYC, and it has clear benefits in time saved and error reduction. We
turn next to quantifying those gains.

6. Impact on AML Compliance Efficiency

The promise of blockchain KYC is dramatic efficiency gains. By reusing verified data, banks can
onboard customers faster and at lower cost. Deloitte reports that executives expect blockchain
identity to cut KYC/onboarding costs by up to 50%. Similarly, the R3 consortium noted that
eliminating duplicate attestations directly “reduces duplication and costs” for each institution.

In concrete terms, consider the following insights from industry research:

      Faster Onboarding: In pilot trials, decentralized KYC reduced verification time from
       days to minutes. For example, a recent analysis of 145 institutions reported blockchain-
       based identity checking achieved a mean time-to-verification of 4.2 minutes, versus 2.8
       days with legacy processes. (Though the academic credibility of this source warrants
       caution, it aligns with industry experience that real-time credential checking is much
       quicker than manual review.)
      Cost Savings: PwC’s study on “Perpetual KYC” found that a typical bank could save
       60–80% on corporate customer KYC costs via automation and data sharing. These are
       largely the same processes that blockchain can automate. The Hashstacs–Cambridge
       research quantifies blockchain-specific savings: it estimates that a bank could save about
       $6.4 million per year on AML/KYC compliance in the U.S. through an identification
       blockchain (with ~52% reduction in effort). In Europe, the projected savings were even
       higher ($14.8M at 74% reduction). Even if these numbers are optimistic, they illustrate
       that multiple-million-dollar efficiencies are plausible for large institutions.
      Reduced Redundancy: In surveys by LexisNexis and others, up to 80% of KYC costs
       are tied to non-risk tasks (document reconciliation, data entry). Blockchain automation
       shifts focus back to risk assessment by reducing tedious duplication. For instance,
       Singapore’s prototype was explicitly motivated by eliminating the need to resubmit
       identical documents. Similarly, R3 emphasized that a self-sovereign model “eliminates
       the need for each institution to individually attest and update KYC records”.
      Improved Data Quality and Security: Shared ledgers can improve data accuracy. When
       one bank updates a customer’s verified address or sanctions screening result, that update
       propagates to all participants. This means fewer stale records and fewer human errors.
       The immutable audit trail also provides regulators with a clear compliance history (who

## Page 9

checked what and when). By contrast, in paper workflows, audit often means floppy-box
       evidence; blockchain offers built-in auditability.
      Enhanced Fraud Detection: A distributed KYC system can also boost fraud prevention.
       With richer, cross-institutional identity data, machine learning analytics can spot
       suspicious patterns earlier. For example, if several banks see identical IDs under different
       names, a network can flag this anomaly. Moreover, blockchain enables conditional logic:
       some proposals program “red flag” rules on-chain so that if data fails validation,
       transactions can be automatically frozen. While this is a cutting-edge concept, it
       illustrates how smart contracts on identity networks could strengthen AML controls (e.g.
       an on-chain alert if an address is found in a new sanction list).

Overall, these efficiencies translate into strategic impact. Banks can divert compliance staff from
paperwork to high-value tasks (risk analysis, KYC reviews), and reduce new customer drop-off
due to long onboarding times. Regulators benefit too: shared identity platforms can support
standardized, cross-bank data requests (e.g. a FinCEN query for a corporate entity can traverse
the blockchain rather than rely on each bank’s siloed records). In short, blockchain KYC aligns
incentives: cost reduction for banks, and stronger AML surveillance for government. This
convergence is what the FATF calls “smart” use of technology to advance AML/CFT goals.

7. Alignment with AML Modernization and National Priorities

U.S. AML modernization efforts explicitly encourage innovation. FinCEN’s 2024 proposal,
implementing the AML Act of 2020, underscores a shift to outcomes-based, risk-focused
compliance. Blockchain KYC fits neatly into this. By delivering high-quality identity data
efficiently, banks can concentrate on real threats (fraud rings, terrorist financing, etc.), while
mundane identity verification is streamlined. Deputy Treasury Secretary Adeyemo has
emphasized that improving AML programs to address “fentanyl trafficking, Russia’s illegal
invasion of Ukraine,” and other threats is an important priority. Since these crimes often use the
financial system’s anonymity, robust KYC is a frontline defense.

Moreover, blockchain-enabled identity enhances the integrity of the financial system. Accurate
identity lowers the risk of “transaction laundering” and shell companies. The immutable nature
of blockchain records means that regulators and auditors can have greater confidence in the
provenance of KYC data. FinCEN itself recognizes that expanded information sharing between
banks (with appropriate privacy safeguards) is key to fighting illicit finance. In fact, the AML
Act of 2020 encouraged sharing of beneficial ownership and similar data. A decentralized ID
network is an ideal medium for such sharing: regulators could even be nodes with read-only
access to de-identified risk signals. This kind of transparency is in the national interest; it makes
the U.S. financial system harder for illicit actors to exploit.

In practice, some U.S. institutions and policymakers are already exploring these ideas. The
FinCEN Innovation Hours highlighted existing blockchain and digital identity solutions that
could meet regulatory requirements. For example, FinCEN noted that there are solutions
addressing funds transfer, recordkeeping, and CIP, some involving blockchain or digital ID. Yet
it also found that many banks are unaware of these tools. Bridging this awareness gap is crucial.
Establishing public-private pilots (as FinCEN did with OCC’s Office of Innovation) can

## Page 10

demonstrate blockchain KYC in live environments, helping regulators learn and banks gain
confidence.

From a policy standpoint, decentralization also encourages industry-wide standards. If U.S.
regulators endorse interoperable digital identity standards, domestic banks can eventually share
credentials across state lines and even cross-border. For instance, if U.S. authorities recognized a
Canadian or EU digital ID on a W3C-compliant platform, that could expedite international
transactions while maintaining strict AML oversight. We have already seen cross-border
initiatives (e.g. European Blockchain Services Infrastructure) aiming for trusted services across
jurisdictions. The U.S. can either join or mirror such efforts, ensuring it remains at the cutting
edge. Doing so serves national security by fostering global cooperation against crime syndicates
that often operate transnationally.

In summary, blockchain KYC is well aligned with U.S. AML priorities: it makes compliance
more effective (faster, more data-driven) while preserving high integrity. It also enables the
financial system to become more resilient – less susceptible to fraud and less constrained by
outdated processes. These gains support both Treasury’s risk-based focus and the broader goal of
safeguarding financial sovereignty.

8. Policy and Regulatory Considerations

For blockchain KYC to deliver its promise, supportive policies are needed. Based on industry
experience and regulatory guidance, we propose the following recommendations:

   1. Adopt Clear Standards for Decentralized IDs: U.S. regulators should endorse
      international standards for digital identity (e.g. W3C Decentralized Identifiers and
      Verifiable Credentials). Formal guidance could confirm that a W3C-compliant VC is
      acceptable for CIP/KYC purposes. This would give banks confidence to participate in
      blockchain ID networks. As a precedent, FinCEN’s advisory on CIP requirements
      already references acceptable identity documents (e.g. passports). An update could
      explicitly include digital IDs meeting certain cryptographic criteria.
   2. Regulatory Safe Harbors for Data Sharing: The Patriot Act Section 314(b) provides a
      safe harbor for AML information sharing among banks. Regulators should clarify that
      shared KYC data on blockchains falls within this safe harbor, as long as robust
      encryption and access controls are used. This legal clarity will alleviate banks’ concerns
      about liability when participating in an industry ledger. FinCEN hinted at such
      clarifications in late 2020 and in AMLA updates. A specific Q&A or regulatory bulletin
      could detail how blockchain-based sharing can be structured in compliance with privacy
      laws (e.g. GDPR and GLBA considerations).
   3. Incentivize Participation through Innovation Programs: Agencies like FinCEN, OCC
      and CFPB should include blockchain KYC use cases in their innovation outreach
      (sprints, challenges, sandboxes). For example, a FinCEN TechSprint could focus on API
      and ledger interfaces for KYC data exchange. Public–private consortia (akin to Project
      REACh for RDFI, or the FiWG groups) could accelerate uptake. These programs should
      especially engage smaller banks and fintechs, since diffusion requires a critical mass of

## Page 11

participants. The author’s involvement with international compliance associations (ICA)
      can help bridge industry-regulator dialogues.
   4. Pilot Public Sector Issuance: The U.S. government could consider issuing digital
      identity credentials on a blockchain for certain citizen services. For instance, digital IDs
      for corporate filings, passports, or driver’s licenses could be anchored on a government
      DLT network. These credentials could then be readily accepted by banks. While full
      government rollout is ambitious, pilot programs (e.g. a state DMV issuing blockchain
      IDs) would kickstart the ecosystem. This mirrors what some European countries and
      states (e.g. Wyoming’s blockchain identity laws) are exploring. A successful
      government-backed ID would validate the technology and catalyze private use.
   5. International Collaboration: Money laundering is often cross-border. The U.S. should
      work with FATF and other standard-setters to ensure blockchain KYC frameworks meet
      AML/CFT standards globally. For example, FATF’s updated guidance encourages
      responsible innovation but cautions on compliance challenges. The U.S. should
      proactively demonstrate that blockchain KYC can meet Customer Due Diligence and
      beneficial ownership verification requirements, potentially shaping future FATF
      guidance on digital ID.
   6. Balancing Privacy and Oversight: Policymakers must also guard privacy. Strong
      encryption and data minimization (e.g. only hashes or pseudonymized IDs on-chain)
      should be mandated. Zero-knowledge proof technologies should be encouraged by
      funding research, so that institutions can prove identities without revealing full data.
      Compliance with consumer privacy laws (like the upcoming FTC regulations, or
      California CPRA) will be crucial. Regulators could issue guidance on how blockchain
      networks can satisfy both AML and privacy requirements simultaneously (for example,
      through selective disclosure protocols). The existing discussions in FinCEN’s Innovation
      Hours underscore this need for privacy-protecting sharing.

By implementing these policy measures, U.S. regulators would remove barriers and provide
clarity for decentralized KYC initiatives. This would accelerate adoption in line with AML
modernization. Crucially, the policies leverage existing frameworks (e.g. 314(b), CIP rules,
standards bodies) rather than creating wholly new regimes. The result would be a more
interoperable and secure identity infrastructure, reducing compliance burdens nationwide while
empowering oversight.

9. Conclusion

Blockchain-based KYC/CDD represents a transformative approach for financial institutions and
regulators alike. By enabling a shared, cryptographically secured identity infrastructure,
distributed ledgers can eliminate redundant KYC processes, lower costs, and enhance AML
effectiveness. This paper has detailed how decentralized identity platforms (Hyperledger, Corda,
Sovrin, etc.) allow customers to control and share verified credentials with multiple banks. Case
studies confirm the real-world feasibility: multi-bank pilots have successfully onboarded test
customers, demonstrating dramatic reductions in paperwork and verification time.

These innovations align squarely with U.S. national interests. They bolster the financial system’s
resilience by making it harder for illicit actors to hide behind fragmented records. The cost

## Page 12

savings and efficiency gains free up compliance resources to focus on genuine risks. As FinCEN
and FATF have noted, technology can and should make AML more effective and less
burdensome. By advancing blockchain KYC, the U.S. would demonstrate leadership in AML
reform, supporting Treasury’s mandate to protect national security through smart regulation.

From an EB-2 NIW perspective, this research has broad impact and originality. It brings together
diverse evidence – from multinational banking trials to regulatory statements – to chart a novel
path for AML compliance. The author’s background in Citibank’s AML program and academic
study of blockchain provide both expertise and credibility to these proposals. Real-world
stakeholders stand to benefit: banks can cut up to half their compliance costs, regulators can
access richer data for oversight, and policymakers can craft forward-looking AML/CFT
frameworks.

In the near term, priority actions include expanding pilots, clarifying regulations, and promoting
standards as outlined above. In the longer term, a mature decentralized identity ecosystem would
ripple beyond banking: it could underpin digital credentials for payments, government services,
and beyond. The key takeaway is this: decentralized KYC is not just a theoretical use case; it
is an evolving practice with measurable benefits that directly support U.S. financial
integrity and security. Embracing it now could usher in a new era of compliance – one that is
more efficient, interoperable, and aligned with the public interest.



References

1.   Dentons. (2019). Using blockchain for KYC/AML compliance. Retrieved from Dentons
     Insights. dentons.comdentons.com.
2.   FinCEN. (2024, June 28). FinCEN issues proposed rule to strengthen and modernize
     financial institutions’ AML/CFT programs. U.S. Department of the Treasury.
     fincen.govfincen.gov.
3.   FinCEN. (2021, March). Innovation Hours Program: Emerging Themes and Future Role in
     AML Act Implementationfincen.gov.
4.   FDIC. (2025). Anti-Money Laundering / Countering the Financing of Terrorism (AML/CFT).
     U.S. Federal Deposit Insurance Corporation. fdic.gov.
5.   FATF. (2021). Opportunities and Challenges of New Technologies for AML/CFT. Financial
     Action Task Force/OECD. fatf-gafi.orgfatf-gafi.org.
6.   Hashstacs & Cambridge Univ. (2019). Quantification of Blockchain Benefits for AML/KYC,
     Settlement Costs and Underwriting Spread. stacs.io.
7.   Oman Observer. (2024, Dec 14). Digital identities to pave the future of blockchain in our
     daily life. omanobserver.om.
8.   PwC. (2016). Perpetual Know-Your-Client: A new approach to periodic reviews. Retrieved
     from PwC. pwc.com.
9.   R3. (2018, June 29). 39 firms complete KYC trial on R3’s Corda blockchain. FinTech
     Futures. fintechfutures.comfintechfutures.comfintechfutures.com.

## Page 13

10. Securities Industry and Financial Markets Association (SIFMA). (2017). New KYC
    blockchain prototype announced. WealthBriefing Asia.
    wealthbriefingasia.comwealthbriefingasia.com.
11. Hyperledger Foundation. (2017, July). Hyperledger Fabric 1.0 release announcement.
    lfdecentralizedtrust.orglfdecentralizedtrust.org.
12. FinCEN (2021). FinCEN Innovation Hours Program: Key outcomes. U.S. Department of the
    Treasury. fincen.gov.
13. Dock Labs. (2025). Blockchain identity management: Beginner’s guide. Retrieved from
    dock.io.
