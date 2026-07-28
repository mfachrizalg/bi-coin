---
source_type: pdf
title: "Central Bank Digital Currencies (CBDCs): a countermeasure to Anti‑Money Laundering (AML) challenges posed by cryptocurrencies?"
original_file: "thesis/reference/Central Bank Digital Currencies (CBDCs): a countermeasure to Anti‑Money Laundering (AML) challenges posed by cryptocurrencies?.pdf"
sha256: "461856078e2cb41abc00b02f33953b1e1432d3ee0a76bb15cad27d70ec86ad04"
page_count: 54
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Central Bank Digital Currencies (CBDCs): a countermeasure to Anti‑Money Laundering (AML) challenges posed by cryptocurrencies?

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Digital Finance (2025) 7:201–254
https://doi.org/10.1007/s42521-025-00132-9
RESEARCH

Central Bank Digital Currencies (CBDCs): a countermeasure
to Anti‑Money Laundering (AML) challenges posed
by cryptocurrencies?
Albina Gaisina1

· Matthias Finger2

Received: 23 January 2025 / Accepted: 29 March 2025 / Published online: 5 May 2025
© The Author(s), under exclusive licence to Springer Nature Switzerland AG 2025

Abstract
This study examines whether Central Bank Digital Currencies (CBDCs) are developed to address money laundering risks associated with cryptocurrencies. It focuses
on piloted/launched CBDCs to assess this relationship empirically. A cross-sectional
regression model (as of December 2024) is used to examine the relationship between
CBDC adoption, cryptocurrency activities in centralised finance (CeFi)/decentralised finance (DeFi), and Anti-Money Laundering (AML) effectiveness, proxied by
the Financial Action Task Force (FATF) Score, Basel AML Index, and Organised
Crime AML Index. The findings reveal that jurisdictions allowing legal cryptocurrency use are weakly positively associated with higher AML outcomes. Higher
cryptocurrency ownership and higher levels of CeFi trade are negatively associated
with AML performance. The FATF Score is lower in countries with local CBDC
providers. Higher GDP per capita is associated with higher AML effectiveness. This
study bridges a research gap by analysing the relationship between cryptocurrencies and CBDCs, focussing on the AML aspect. It also offers insights into which
CBDC design features can address the regulatory issues inherent in cryptocurrencies
through introduction of a novel CBDC-AML design layered framework. The policy
implication is that CBDCs, if carefully designed, can improve AML effectiveness,
and the focus should be on robust AML frameworks rather than cryptocurrency
bans. However, the study is limited by CBDC data availability due to recent adoption and the lack of early country-specific data on cryptocurrencies.
Keywords Central Bank Digital Currency (CBDC) · Cryptocurrency · AntiMoney Laundering (AML) · Financial regulation · Centralised finance (CeFi) ·
Decentralised finance (DeFi)
JEL Classification E42 · K42 · G28 · O33

Extended author information available on the last page of the article
Vol.:(0123456789)

## Page 2

202

Digital Finance (2025) 7:201–254

1 Introduction
The emergence of digital currencies has significantly reshaped the traditional
concept of money. The volume and number of transactions in digital currencies
show they have a future in the global financial landscape. The term “digital currencies” is an umbrella term that is constantly evolving. In this research, for simplicity, it will incorporate cryptocurrencies (a broader term including stablecoins)
and CBDCs.
The emergence of CBDCs represents the latest development in digital currencies (Siklos, 2023). Nineteen of the Group of 20 (G20) countries are now in
advanced stages of CBDC development, with 13 already in the pilot stage (Atlantic Council, 2024).
As central banks worldwide explore the potential issuance of CBDCs, the
focus has shifted towards addressing the challenges posed by cryptocurrencies,
particularly in the context of Anti-Money Laundering (AML) regulations due to
their decentralised and anonymous nature.
The global cryptocurrency market cap as of December 2024 is $3.32 trillion
(Coingecko, 2024). In 2023, the total cryptocurrency illicitly transferred (laundered) was $22.2 billion. Over the past 5 years, centralised exchanges (CEXs) in
the centralised finance (CeFi) space have remained the primary destination for
funds sent from illicit addresses. The share of illicit funds going to decentralised
finance (DeFi) protocols (mainly decentralised exchanges DEXs) is also growing (Chainalysis, 2024a). Unlike CBDCs directly controlled by central banks,
cryptocurrencies are typically beyond their control. If CBDCs are well designed,
central banks could potentially offer a safety net for CBDC users that may not be
possible for cryptocurrency users. This shift towards addressing the challenges
posed by cryptocurrencies indicates a need for solutions that combine technological innovations with regulatory compliance to ensure the security of financial
transactions.
While existing research has examined the rise of cryptocurrencies and the
development of CBDCs independently, there is a gap in comprehensively analysing the relationship between these two. Specifically, there is a limited exploration
into how the drawbacks of cryptocurrencies circulating in both CeFi and DeFi
ecosystems (their money laundering aspect), influence central banks’ decisions
to develop CBDCs in such a way that, technology- and regulation-wise, they represent a potential response. Early CBDC research focussed on general motives
behind CBDC creation such as monetary policy control. Literature on currency
competition/coexistence/replacing cash with cryptocurrencies is irrelevant to this
research, since it is not focussed on monetary policy. Literature on CBDC design
choices is also well researched, however, research focussing on AML is limited.
The same is true for CBDC-related privacy concerns. As of 2024, there is a trend
in analysing privacy issues from either a computer science angle or law/regulations. Further, the literature connecting CBDC and AML aspects is focussed on
cash drawbacks as a trigger for CBDC development rather than on cryptocurrencies’ drawbacks as the main trigger. Research on the money laundering aspect

## Page 3

Digital Finance (2025) 7:201–254

203

of cryptocurrencies and correspondingly on their regulation is extensive in
both academia and industry. However, there is limited literature on bridging
this aspect of cryptocurrencies with CBDC development. Consequently, our
research aims to fill this gap by empirically analysing the impact of cryptocurrency-related risks, particularly money laundering, on the effectiveness of
AML measures in countries adopting CBDCs. The hypotheses are formulated
by comprehensively analysing the literature.
The research empirically tests the hypotheses using cross-sectional data
from multiple jurisdictions to analyse the relationship between cryptocurrencyrelated money laundering risks and AML effectiveness in countries that have
launched or adopted CBDCs. The key indicators include cryptocurrency ownership and adoption in both the CeFi and DeFi spaces, AML measures such
as the Financial Action Task Force (FATF) rankings, the Basel AML Index,
and the Organised Crime AML Index, as well as CBDC-related data focussed
on technological factors. The analysis utilised robustness checks to support the
obtained results.
The results suggest that in countries with higher cryptocurrency ownership
and CeFi trade, AML effectiveness tends to be lower. Also the FATF Score is
lower in countries with local CBDC providers, suggesting to use international
providers for better AML effectiveness. By contrast, the AML effectiveness is
higher in jurisdictions allowing legal cryptocurrency use (compared to ban) and
in countries with higher GDP per capita, indicating the countries’ capacity to
combat illicit activities.
The insight for policymakers is that in case CBDCs are well designed, e.g.
they have AML features directly installed into their design, they can be more
trustworthy than cryptocurrencies. However, a balancing approach with privacy
is needed. As per our empirical results, for cryptocurrencies, the focus should
be on strong AML regulatory frameworks rather than cryptocurrency bans.
Also, the central banks should choose CBDC providing companies carefully,
the results indicate that international providers are preferred for higher AML
effectiveness.
This research provides a novel perspective by examining the interplay
between cryptocurrency-related money laundering risks and CBDC development. Unlike previous studies that mainly focussed on CBDCs or cryptocurrencies separately, this study bridges them through a comprehensive analysis
of the money laundering aspect. Furthermore, the study introduces a layered
theoretical concept of privacy, compliance, and regulation by design in CBDCs.
The remainder of the paper is organised as follows: Sect. 2 presents a
detailed literature review, exploring CBDC motives, technology, anonymity
features, and regulatory compliance. Section 3 outlines the research methodology, including the data sources and techniques used. Section 4 presents the
results of the empirical analysis. Section 5 links the findings with existing
empirical research. Section 6 concludes with the main outcomes, policy implications and recommendations for future research.

## Page 4

204

Digital Finance (2025) 7:201–254

2 Literature review and hypotheses development
With a growing interest in CBDCs as a response to the risks associated with cryptocurrencies, it is essential to understand CBDC technology, design choices, and
regulatory frameworks. Exploring the layered architecture and infrastructure of
CBDCs provides insights into how these digital assets can enhance transaction efficiency and ensure Know Your Customer (KYC) compliance. As discussions around
CBDCs evolve, it becomes evident that these digital currencies are not governmental versions of existing cryptocurrencies but rather innovative financial instruments
that leverage the benefits of programmability and user privacy. By incorporating
legal principles into CBDC design, the concepts of privacy by design, compliance
by design and regulation by design ensure compliance and safeguard user data in
accordance with AML regulations.
This analysis sheds light on the transformative potential of CBDCs by examining
the intersection of technology and regulation, aiming to provide valuable insights for
policymakers. It begins by exploring the main reasons for CBDC creation, focussing on those related to addressing risks from cryptocurrencies, namely money
laundering.

2.1 CBDC: general motives and those posed by cryptocurrencies
General motivations behind CBDC creation, such as monetary policy control,
financial inclusion, and financial stability, are extensively discussed in the literature (Kiff et al., 2020; Allen et al., 2020; Lee and Teo, 2021). These also include
combating illegal activity and protecting consumers from the risks associated with
cryptocurrencies.
A deeper analysis of the latter revealed that, while cryptocurrencies offer potential
benefits, they can be also misused (Fama et al., 2019; Lee and Teo, 2021), resulting
from such factors as weakening capital controls (Thanh et al., 2023) and anonymity
(Tertak and Kovacs, 2022). These risk factors can be broken down into such subfactors as: transferring large amounts of money; transactions on the dark Web; “layering” mechanisms as recognised by the FATF; “privacy coins” (such as Monero
and ZCash) used for mixers/tumblers; unhosted wallets/unregulated exchanges; the
expansion of the shadow economy (Pocher and Veneris, 2022). The cryptocurrencies (initially Bitcoin, now privacy coins) are often exploited in the darknet, where
cybercriminals conceal the origin, ownership, and control of illicit funds using
anonymising tools. Such tools like mixers create layers of temporary addresses,
complicating efforts to trace illicit activities (Esoimeme, 2023; Scharnowski, 2024).
Theoretical insights from several papers (Coelho et al., 2021; Pocher et al., 2023;
Wang and Hsieh, 2024; Wronka, 2022) support the idea that the anonymity of cryptocurrencies complicates compliance, reducing authorities’ ability to trace illicit
funds. As crypto adoption grows, the monitoring challenges become more evident,
potentially weakening AML effectiveness despite regulatory efforts.

## Page 5

Digital Finance (2025) 7:201–254

205

Given that it is anonymity that drives those risk factors, the intuition is that, in
this regard, CBDCs must be a less anonymous means of payment compared to cryptocurrencies, to make it relatively more difficult to use in illegal activities. While
CBDCs can decrease the size of the shadow economy (Kilingland and Dahl, 2018),
CBDC legislation and adoption go hand in hand with privacy and security concerns
(Homoliak et al., 2023).
Although the motivations behind CBDC creation hold promise, a balanced
assessment of their potential advantages and risks is crucial (Freiman, 2024; Lee
and Teo, 2021; Ripple, 2023; Guseva et al., 2024; Genc and Takagi, 2024; Kiff
et al., 2020; Allen et al., 2020; Coulter, 2022). While CBDCs are generally considered more trustworthy due to government backing, their design needs to balance
public interest with individual privacy rights (Cunha et al., 2021). The success of
CBDCs therefore depends on how they are designed and implemented, particularly
regarding the degree of anonymity they provide.
Based on these findings, the following hypotheses were derived:
H1: The enhancement of financial inclusion through CBDCs improves AML
effectiveness, as they can be a more trustworthy payment option.
H2: The reduction of the shadow economy via CBDC adoption enhances
AML effectiveness due to higher transparency.
H3: Higher levels of cryptocurrency ownership in countries are negatively
associated with AML effectiveness due to the challenges in monitoring.
2.2 CBDC technology
2.2.1 Architecture and layers
CBDCs aim to address such drawbacks of cryptocurrencies as the lack of central
bank control by incorporating advanced technologies and features. We analysed
the literature on the components of digital currencies to see how CBDCs leverage insights from cryptocurrency development, in terms of programmability and
privacy, while avoiding a direct replication of cryptocurrency models (Robleh and
Narula, 2020; Auer and Bohme, 2020).
Both cryptocurrencies and CBDCs share some common architectural components
(layers): layer one (L1): technology for transaction validation; layer two (L2): payment
channels; layer three (L3): application layer. Cryptocurrencies have specific layers not
common in CBDCs (Schar, 2021). However, CBDCs have more layers, particularly
for privacy and regulation (Qualitest Group, 2023; Han et al., 2019). The focus is to
compare the L1s: technologies for transaction validation. Most CBDCs can be built
on either centralised databases (e.g. Chinese e-CNY) or specific types of Distributed
Ledger Technology (DLT) like blockchain (e.g. Nigerian eNaira).
Central banks choose CBDC technology providers and technology for transaction validation (L1) strategically to address their implementation motives. Notably,
the Bahamian Sand Dollar leveraged DLT from NZIA Limited to enhance payment
resilience and financial inclusion across remote islands, whereas Jamaica’s JAMDEX, developed with eCurrency Mint Inc., used a centralised system without DLT,

## Page 6

206

Digital Finance (2025) 7:201–254

focussing on interoperability with existing Real-Time Gross Settlement Systems
(RTGS). Despite technological differences, both CBDCs share a common focus:
ensuring secure payment systems (Schumacher, 2024).
Unlike cryptocurrencies that rely on permissionless, public blockchains, CBDC
blockchains are permissioned and private (e.g. Hyperledger Fabric in Caribbean
D-cash and Nigerian eNaira; R3 Corda in Kazakhstan’s digital tenge), allowing only
authorised participants to validate transactions (Syed, 2023).
The blockchain built on Hyperledger Fabric offers advantages for AML enforcement by enabling real-time transaction verification. Although permissioned blockchains provide a secure foundation for CBDCs, additional security safeguards such
as consensus mechanisms (how transactions are validated) also play a critical role in
CBDC architecture (Zhang et al., 2021).
While cryptocurrencies utilise decentralised consensus mechanisms, like proof of
work (PoW) in Bitcoin, CBDCs are built with advanced consensus mechanisms that
can mitigate risks such as double-spending (Chu et al., 2022). A consensus mechanism “Practical Byzantine Fault Tolerance” (PBFT) provides resilience, ensuring
CBDC systems are secure and can handle high transaction volumes without compromising AML compliance (Guo et al., 2024). For example, PBFT used in a crossborder M-bridge project in the UAE, Thailand, China and Hong Kong, enhances
AML efforts to ensure transaction validation across jurisdictions with efficiency and
robustness.
In short, the blockchains used in CBDCs and their specific consensus mechanisms, compared to those used in cryptocurrencies, enhance security and regulatory compliance by addressing AML/KYC requirements and limiting transaction
anonymity (Swiss Federal Council, 2024). However, further analysis shows that the
design of a CBDC extends beyond the selection of a particular DLT/blockchain/consensus mechanism.
By addressing security and regulatory challenges through technology choices as
their key architectural elements, CBDCs can strengthen AML enforcement. Based
on this, the following hypotheses are formulated.
H4: The selection of CBDC technology providers is aligned with central
banks’ regulatory goals.
H5: The use of DLT in CBDC systems is a key proxy for improving transparency and regulatory compliance.
2.2.2 Design choices
The following are the top three “high level” CBDC design choices that are covered
in most of the related articles: (1) Access model: wholesale or retail; (2) Distribution
model: direct (one-tier)/indirect (two-tier) or hybrid/synthetic; (3) Authentication
model: account-based vs. token-based.
Wholesale CBDCs (wCBDCs) are designed for interbank transactions, with
AML compliance managed by financial institutions within the CBDC ecosystem.
In contrast, retail CBDCs (rCBDCs) face more complex AML challenges due to

## Page 7

Digital Finance (2025) 7:201–254

207

direct consumer interaction and reliance on commercial banks for KYC (Schumacher, 2024).
In the direct distribution model, consumers interact with the central bank
directly, which may potentially disrupt the balance between central banks and
commercial banks. The indirect (two-tier) model uses commercial banks for distribution and AML/KYC tasks, thus reducing the central banks’ workload (Pocher
and Veneris, 2022). The Bank for International Settlements (BIS) surveys show
that around three-quarters of central banks in advanced economies consider the
two-tier CBDC model (Kosse and Mattei, 2023).
This model is well illustrated by e-CNY: the People’s Bank of China (PBOC)
as a first tier distributes e-CNY to the second tier: i.e. major state-owned banks
as well as WeChat Pay and Alipay. These entities facilitate the conversion of traditional CNY into e-CNY, which is then stored in digital wallets, thus enabling
seamless integration with both the commercial and consumer sectors (Dong et al.,
2024).
Similarly, the Eastern Caribbean Central Bank (ECCB) and the Central Bank
of the Bahamas delegate KYC to financial institutions. Despite these efforts,
vulnerabilities in the KYC process persist when government ID systems are not
fraud-resistant or lack integration with verifiers. Digital ID systems or expanded
third-party collaborations can improve customer verification in CBDC systems
(Kakebayashi et al., 2023).
In synthetic CBDCs (sCBDCs), the private payment providers issue digital
currencies backed by central bank reserves, transferring AML/KYC to private
entities and reducing central bank costs (Li et al., 2021). sCBDCs act as a middle
ground between stablecoins and traditional CBDCs. For example, Switzerland’s
SIX Digital Exchange uses a stablecoin backed by the Swiss National Bank. Also
projects like Helvetia Phase III aim to mitigate counterparty risks, while ensuring
sCBDCs maintain stability similar to central bank money, even in cases of issuer
bankruptcy (Guo et al., 2024).
Account-based CBDCs require identity verification, similar to debit cards,
enabling their integration with AML/KYC systems (Auer and Bohme, 2020; Freiman, 2024). This design supports traceability and user identification, making it
effective for combating money laundering (Guo et al., 2024). In contrast, tokenbased systems prioritise privacy but limit traceability, similar to Bitcoin, where
ownership is tied to a digital token within a wallet. While cryptographic features
like Bitcoin’s Unspent Transaction Output (UTXO) model ensure authenticity
and prevent double spending, they maintain pseudonymity, creating challenges
for AML (Zhang, 2024). Overall, the literature favours account-based systems for
CBDCs in terms of AML, as they facilitate real-time transaction monitoring and
seamless detection of suspicious activities (Bordo and Levin, 2017).
Thus, security and privacy are the key drivers of CBDC design, not “afterthoughts” (Kiff et al., 2020). Designing CBDCs involves trade-offs, such as balancing anonymity with tracking suspicious activity. A key challenge is to retain
data for law enforcement without compromising privacy (Abramova et al., 2022).
Considering these factors, the following hypotheses are proposed.

## Page 8

208

Digital Finance (2025) 7:201–254

H6: The type of CBDC (wholesale vs. retail) serves as a proxy for AML effectiveness.
H7: The structure of CBDCs (token-based vs. account-based) influences AML
effectiveness; account-based models are preferred for better monitoring.
2.3 Anonymity/privacy/programmability
A deeper analysis of the privacy issue reveals that most cryptocurrencies prioritise anonymity and privacy by associating “accounts” with cryptographic key pairs
rather than with human identities (Li et al., 2021). This anonymity makes it challenging for users to comply with regulations (Allen et al., 2020). CBDCs cannot
offer complete anonymity like cryptocurrencies because they must support compliance mechanisms, as states want to detect and prevent criminal activities (Li et al.,
2021). The privacy advocates argue for anonymity to safeguard against identity theft
and maintain individual rights. However, the regulators (e.g. FATF) aim to prevent
illicit activities, requiring Customer Due Diligence (CDD) and transaction monitoring (Kiff et al., 2020). However, a fully centralised CBDC design poses risks, such
as bulk data breaches. Delegating AML/KYC to private payment providers might
be practical but also requires regulation (Allen et al., 2020). Therefore, the more
anonymity is offered by CBDCs, the greater the risk of illicit use (Soderberg et al.,
2022).
As studies by Li et al. (2022) based on the Chinese CBDC show, in anonymous
transactions, money laundering often follows patterns like circular transfers or
aggregation into one account. In contrast, real-name transactions with identity verification significantly reduce such activity. Illicit activities can be identified by the
analysis of network density (tightly connected groups or repeated transfers), emphasising the importance of transparency features, such as real-time monitoring which
still protects privacy.
2.3.1 Privacy types and traceability
There are two types of privacy: identity privacy and transaction privacy. Pseudonymous identifiers, like “Alice is 1234,” pose security risks due to potential breaches
in merchant databases. Also blockchain analytics firms like Chainalysis, can deanonymise users by analysing transaction patterns, particularly in public blockchains like Bitcoin and Ethereum (Allen et al., 2020; Lee et al., 2021). Solutions like
removing pseudonymous identifiers or using third-party services like Tor introduce
scalability and vulnerability risks. Therefore, a globally visible ledger is undesirable
for CBDCs, as it requires encryption protection for all traffic between clients and
validators (Allen et al., 2020).
These risks highlight the need for robust privacy mechanisms in CBDCs to
protect user data and secure transactions, including corresponding legal frameworks. For example, China’s Personal Information Protection Law (PIPL) and
Data Security Law (DSL) prevent e-CNY operators from sharing user data without consent (Mu and Mu, 2022). The privacy concerns resulting from traceability

## Page 9

Digital Finance (2025) 7:201–254

209

led to models such as the Bank of England proposing anonymity in settlements
while ensuring law enforcement traceability (Sidorenko et al., 2021). To address
this privacy-compliance trade-off, tiered wallet systems offer varying anonymity
based on transaction thresholds, promoting financial inclusion in areas with limited virtual IDs (Claessens et al., 2024). However, even without identity links,
digital footprints (from devices and networks) can still expose user data (Zhang,
2024).
Auer et al. (2023) argue that privacy should not be viewed as a binary choice
between anonymity and full traceability. Instead, they propose a more nuanced
approach towards privacy, which distinguishes between “soft privacy” (where certain entities can access transaction data under legal conditions) and “hard privacy”
(where cryptographic methods prevent any access).
Ultimately, CBDCs must address a question: privacy from whom? Unlike public blockchains that emphasise transparency, CBDCs require auditability to monitor transactions and detect illicit activities while safeguarding user data (Guo et al.,
2024).
Therefore, they need to embed privacy considerations within the architecture to
ensure the protection and confidentiality of user information through particular technological solutions.
Specifically, advanced cryptography like, for example, privacy-enhancing technologies (PETs), including zero-knowledge proofs (ZKPs), validate transactions without
revealing details like the sender, receiver, or amount, even in offline CBDCs (Lee
et al., 2021; Zhang, 2024; Michalopoulos et al., 2024). Emerging PETs, such as blind
and ring signatures, provide anonymity for payment authentication, while eCash 2.0
enhances privacy in digital transactions (Lamberty et al., 2024; Zhang, 2024). BIS’s
Aurora project shows how PETs and machine learning can combat financial crime
while preserving privacy across jurisdictions (Zhang, 2024). Despite their potential, PETs are still limited in CBDC pilots, with examples such as Sweden’s prepaid
CBDC cards. The privacy frameworks under regulations like the General Data Protection Regulation (GDPR) are still underdeveloped (Tronnier, 2021).
Beyond traditional PETs like ZKPs and ring signatures, even more advanced
encryption methods such as homomorphic encryption (HE) and multi-party computation (MPC) offer promising, yet computationally expensive, solutions for extra
secure data processing. Trusted execution environments (TEEs) provide a more feasible alternative in many CBDC architectures (Zhang, 2024). Additionally, federated
learning enables privacy-preserving analytics without direct data sharing, addressing regulatory concerns (Boernert et al., 2023).
Another emerging privacy-enhancing architecture is Self-Sovereign Identity
(SSI), which lets users maintain control over what personal information can be
shared and used. SSI frameworks could strengthen both identity and transaction privacy in CBDC systems by minimising data exposure but still complying with AML/
KYC (Arora et al., 2025).
See a high-level overview of PETs in Table 1.
While PETs can significantly enhance privacy and security (Buterin et al., 2024),
they also pose challenges related to efficiency (due to computational overhead) and
regulatory compliance (Allen et al., 2020).

## Page 10

210

Digital Finance (2025) 7:201–254

Table 1  Privacy-enhancing technologies (PETs) in CBDCs
PET type

Privacy function

Zero-knowledge proofs (ZKPs)

Hides transaction amount, sender, and receiver during transaction validation

Blind signatures

Hides payer identity during payment authorisation

Ring signatures

Hides sender identity among a group of possible senders during transaction signing

Homomorphic encryption (HE)

Hides transaction amount and user data during payment
processing

Multi-party computation (MPC)

Hides transaction amount, sender, receiver during payment
processing

Trusted execution environments (TEEs)

Hides transaction and user data during processing and storing

Federated learning

Hides raw transaction data during machine learning training

Source: Authors’ own compilation

2.3.2 Programmability and design principles in a unified framework
CBDCs also introduce a concept of “programmable payments”, thus enabling
automatic fund transfers based on predefined conditions (Cunha et al., 2021).
Smart contracts give CBDCs the ability to automatise AML processes, such
as transaction monitoring and risk-based KYC by encoding rules to prevent highrisk transactions or trigger alerts (Guo et al., 2024).
Unlike cryptocurrencies, the central banks have the authority to set built-in
rules that restrict how CBDCs are spent, including purpose-bound money (e.g.
can be spent for rent, food, or medicine only) and conditional spending (e.g. only
people over 30 can spend within 5 km). Without proper governance of the CBDC
infrastructure, programmable money can enable regulators to control when,
where, and how CBDCs are spent (Freiman, 2024).
Overall, the design of a CBDC from an AML perspective is influenced by three
key principles, which can be structured in three “layers” (see Fig. 1).
While existing studies often discuss privacy by design, compliance by design,
and regulation by design as separate or even as interchangeable concepts in
CBDC systems (which is not factually accurate), this study proposes a unified
framework where these concepts are organised hierarchically with distinct functional layers. Each successive layer builds upon the previous one.
The first, foundational layer is “privacy by design”. This approach introduces
tiered privacy mechanisms, e.g. creating account types with limits, which require
minimal user identification in CBDC designs (Cunha et al., 2021). Experimental
initiatives, such as the European Central Bank’s (ECB) anonymity vouchers and
China’s Digital Currency Electronic Payment (DCEP) platform strive to balance
anonymity with financial integrity. However, most current solutions are pseudoanonymous and achieving full anonymity in CBDCs remains challenging (Kiff
et al., 2020).
The next middle layer, which encloses “privacy by design” is “compliance
by design”. This approach integrates PETs to enforce AML compliance, while

## Page 11

Digital Finance (2025) 7:201–254

211

Fig. 1  Three-layer CBDC design AML unified framework. Source: Authors’ own work

preserving user privacy. For example, the low-risk transactions can remain anonymous, while higher-risk activities are fully traceable (Michalopoulos et al., 2024).
Finally, the third and broadest layer, which encompasses both “privacy by
design” and “compliance by design”, is “regulation by design”. It helps to create
compliant instruments from the start by building legal principles into technology
(Pocher and Veneris, 2022).
It aligns with the evolution of regulatory technology (RegTech) based on
CBDCs, where regulation can be built directly into the digital currency’s infrastructure (“embedded regulation”). This concept of “regulation by design” originates from Lessig’s “code is law” principle, which claims that behaviour in cyberspace is controlled by software code (Pocher and Veneris, 2022).
As we stated earlier, programmability in CBDCs offers new opportunities
for AML enforcement through smart contracts and regulatory-oriented coding
frameworks. For example, RegLang, a regulatory smart contract programming
language, allows compliance experts to write regulatory policies as digital regulatory rules and run them as smart contracts on the blockchain directly. If a transaction initiator or recipient appears on a blacklist, the supervisory contract will
automatically reject the transaction (Zhang and Li, 2022).
Thus, implementing these design principles is crucial for responsible CBDC
implementation since achieving full anonymity in identity and transactions is
impossible in CBDCs compared to cryptocurrencies. As CBDC designs evolve,
balancing privacy, programmability, and compliance is key for effective AML
enforcement. The following hypotheses explore how these design principles
affect AML effectiveness in CBDCs.

## Page 12

212

Digital Finance (2025) 7:201–254

H8: CBDC adoption improves AML effectiveness but creates challenges in
balancing privacy with regulatory compliance.
H9: Greater privacy in CBDCs negatively impacts AML effectiveness.
2.4 Regulatory compliance
2.4.1 Cryptocurrencies regulation
For cryptocurrencies “legal tender” status and “being legal” are not the same. Legal
means you can trade or hold cryptocurrencies. As of December 2023, cryptocurrency was legal in 119 countries. However, only 62 of them have comprehensive
regulations applied to cryptocurrency transactions (Coingecko, 2024). The “legal
tender” status means a currency can be accepted as payment (Bossu et al., 2020). In
most jurisdictions, except for El Salvador and the Central African Republic, cryptocurrency (Bitcoin) is not a “legal tender” and therefore cannot be regulated for payment purposes. Despite being launched in several countries (the Bahamas, Jamaica,
and Nigeria), CBDCs are not yet recognised as legal tender either, except in China
(People’s Bank of China report, 2021).
As it is difficult to regulate cryptocurrencies themselves or their specific layers
(refer to p. 2.2) due to their decentralised and transnational nature, one approach
is to target cryptocurrency exchanges (Biancotti, 2023). CeFi platforms allow for
better regulation compared to DeFi, as they involve identifiable entities subject to
licencing, AML/KYC requirements and consumer protection laws, which support
detection of suspicious transactions (Schuler et al., 2024; Zetzsche et al., 2020).
This is emphasised by the FATF’s updates to Recommendation 15, which extend
AML measures to cover virtual assets (VAs) and Virtual Asset Service Providers
(VASPs), requiring CDD, transaction monitoring, and compliance with the “travel
rule” (Rec. 16) (Ordekian et al., 2024).
Despite being easier to regulate than DeFi, CeFi platforms continue to present
AML challenges. The OECD (2022) analysis of the “crypto winter” highlights that
major CeFi platforms, including FTX, engaged in high-risk financial practices,
exploiting regulatory gaps to bypass AML measures. Moreover, CeFi platforms
were identified as primary intermediaries for illicit flows into DeFi, so these channels are connected.
While the FATF recognised DeFi platforms as VASPs and recommended compliance with the “travel rule”, implementing AML measures in DeFi remains difficult
due to anonymity and cross-border accessibility enabling illicit activities (e.g. Tornado Cash case) (Wang et al., 2024). The FATF suggests focussing on key “points
of control” in DeFi to identify responsible entities for compliance, although enforcement is challenging. Some propose installing AML measures directly into the code
through solutions like “AML Oracles”, which integrate identity verification and
transaction monitoring within smart contracts. However, their practical application
is under development (Yuyama et al., 2024).
The rules differ jurisdictions-wise. The European MiCA (Markets in CryptoAssets Regulation), adopted in 2023/2024, requires licencing for crypto firms

## Page 13

Digital Finance (2025) 7:201–254

213

(exchanges, wallets) and allows them to operate EU-wide. However, even if
MiCA represents one of the most comprehensive regulatory frameworks, it
excludes DeFi and CBDCs from its scope (European Securities and Markets
Authority, 2024).
It should be noted that Basel Institute on Governance (2019) warns that overregulation may push illicit activities into unregulated channels. Hence, overly strict
measures on VASPs may shift transactions to DeFi protocols or other “parallel systems”, making AML enforcement even more challenging (Paesano, 2019). In line
with this, a total ban on cryptocurrencies was proved ineffective even in jurisdictions
that classified bitcoin as illegal. Hence as long as cryptocurrencies are used in the
underground or “black markets” for private transactions, it will be more challenging to integrate them into traditional financial systems and regulate comprehensively
(Winnowicz et al., 2021). Aquilina et al. (2023) suggest combining three regulatory approaches for cryptocurrencies: selective bans of harmful activities, containing risks, and regulating within existing frameworks for broader oversight. They cite
Japan’s successful approach as a model for other jurisdictions.
It is the overall lack of a unified regulatory framework for cryptocurrencies
that challenges AML enforcement (Pillai and Sorwar, 2024). Therefore, the FATF
highlights a “Sunrise Issue”, where inconsistent VASP regulations across jurisdictions lead to implementation challenges, emphasising the need for better international coordination (Ordekian et al., 2024). Xiong and Luo (2024) confirm the
persistence of regulatory fragmentation in the crypto market. First, as per their
study at least 71 countries (as of 2024) still lack clear cryptocurrency regulations,
allowing crypto firms to exploit AML gaps. Second, even in regulated jurisdictions, enforcement can be inconsistent, leading to “regulatory arbitrage”. A example of which is Binance which relocated several times to avoid certain regulations.
This event was eventually marked by the FATF in 2020 as a red flag indicator for
money laundering (Ordekian et al., 2024). World Economic Forum (2021) noted
that both over-regulation and under-regulation can lead to regulatory arbitrage.
However, this does not mean all entities are necessarily looking for more deregulated jurisdictions. Market players in fact are usually looking for jurisdictions with
transparent regulatory regimes. Therefore, the regulatory model for cryptocurrencies should be risk-based.
Regulatory arbitrage should not be confused with jurisdictional arbitrage, even
though the terms are sometimes used interchangeably. Regulatory arbitrage refers to
the broader practice of exploiting loopholes in laws, either within or across jurisdictions, whereas jurisdictional arbitrage specifically involves relocating operations to
more favourable regulatory environments (Draganidis, 2023).
Literature on approaches to cryptocurrency regulation is polar. On one hand,
Nabilou (2019) suggests a decentralised regulatory architecture, where the focus
shifts from directly regulating the cryptocurrency technology to targeting intermediaries, such as exchanges, payment service providers or decentralised node operators. By contrast, Animashaun (2023) argues that entity-based regulatory frameworks are insufficient now for overseeing emerging financial intermediaries such
as DEXs, which operate without licencing. He suggests that policymakers must
adopt intermediated CBDCs and supervisory technology (SupTech) to enhance

## Page 14

214

Digital Finance (2025) 7:201–254

regulatory oversight, improve risk monitoring, and facilitate cross-border compliance coordination.
CBDCs, therefore, could avoid many challenges present in the crypto market.
By considering cross-border regulatory harmonisation from the beginning, CBDCs
could offer a more unified and tech-enabled approach to regulation. These considerations lead to the following hypotheses.
H10: Despite regulatory efforts, CeFi platforms negatively impact AML effectiveness due to regulatory gaps and being interconnected with DeFi.
H11: DeFi negatively impacts AML effectiveness due to the absence of AML/
KYC, anonymity, and cross-border accessibility.
H12: Cryptocurrency regulation (legalisation) improves AML effectiveness,
while bans push transactions into unregulated channels, making AML enforcement harder.
2.4.2 Kane’s regulatory dialectic theory
While the regulatory fragmentation, regulatory arbitrage, jurisdictional arbitrage
and AML regulatory gaps were recognised as primary compliance issues on the
crypto market, a deeper analysis of them shows that the key challenge in regulating
cryptocurrencies is the constant adaptation of the market players to bypass compliance measures.
Kane’s Regulatory Dialectic Theory (1977, 1988) explains how regulation triggers reactive innovations as adaptive market responses from market participants who
aim to appear compliant while exploiting loopholes. This cycle of regulation and
avoidance is already observed in traditional banking and now in the cryptocurrency
space. According to this theory, in the context of cryptocurrencies and money laundering, as governments want to combat illicit activities, new innovative technologies
and methods of laundering will emerge.
In detail, such a cyclical process can be illustrated as follows: regulators impose
stricter AML law on crypto transactions, then market participants adapt through
the emergence of mixers/tumblers, privacy coins, new DEXs protocols, jurisdictional arbitrage (offshore licencing), etc. Next, authorities respond with stronger
enforcement rules to re-establish control over illicit flows (Dupuis and Gleason,
2020).
Sinno et al. (2025) also demonstrate the case of how the regulatory dialectic
shifts from physical to digital assets in a context of avoiding sanctions. For example, company A used cryptocurrency to settle payables to company B, a supplier in
a sanctioned country, remitting funds through crypto-exchange. The lack of KYC
regulations in multiple jurisdictions allowed the movement of funds.
The intuition here is that proactive governmental response can be in the form
of CBDCs, which by design, can incorporate regulatory features including built-in
KYC protocols and real-time transaction monitoring. Kane’s regulatory dialectic
suggests that as CBDCs evolve to include these AML safeguards, they may cause
further innovations from cryptocurrency market participants attempting to evade
new regulations.

## Page 15

Digital Finance (2025) 7:201–254

215

For example, another cyclical process can be as follows: as CBDCs adopt stricter
AML measures, cryptocurrency operators might develop new layers of obfuscation
or alternative mechanisms to facilitate money laundering. This would let regulatory bodies respond with additional safeguards such as proactive design of CBDCs
(Dupuis and Gleason, 2020; Dupuis et al., 2022).
Here we present an attempt to connect the layered framework we presented in
2.3.2 with the Kane’s Regulatory Dialectic Theory, which connects cryptocurrencies
weaknesses with CBDCs in AML context.
1. Privacy by design
As it was introduced earlier, the foundational layer of CBDC AML design is a
“privacy by design”. According to Kane’s framework, when regulations increase
transaction transparency, market participants find alternative methods to maintain
anonymity. This is already observed in the cryptocurrencies space where, for example, CeFi users shift to DeFi protocols to avoid AML/KYC requirements (Dwyer,
2020). The DEXs do not hold assets for participants, thus avoid compliance costs
typically associated with traditional exchanges. The author applied Kane’s theory
to cryptocurrencies, noting that regulators, in turn, may respond with updated rules.
As a response, CBDC designs, such as China’s DCEP and the ECB’s anonymity
vouchers embed tiered privacy mechanisms.
2. Compliance by design
The following middle layer is compliance by design. Hence, as market players
attempt to bypass privacy restrictions, the next stage in this framework requires
enhanced enforcement mechanisms. Compliance by design incorporates PETs to
enforce risk-based AML. Kane’s theory predicts that: if CBDCs enhance compliance through automated risk scoring, illicit actors may shift towards harder-to-trace
financial instruments.
Therefore, PET-based compliance allows regulators to retain flexibility, which is
mirrored by crypto AML regulation, where authorities usually progressively amend
transaction monitoring in response to new evasion techniques.
3. Regulation by design
The final layer is regulation by design. As per Kane’s dialectic, it represents the
proactive regulatory response in CBDC context, where financial regulations are
not just enforced reactively like it usually happens in crypto space, but installed
into design from the start. Namely, if legal principles are embedded into CBDC
infrastructure, it can help regulators to prevent future AML loopholes that can be
exploited.
Given that Kane’s dialectic implies that AML enforcement must remain dynamic,
CBDCs must be designed with adaptable regulatory mechanisms. That does not
necessarily mean regulators will be able to break the traditional regulatory dialectic
cycle, since new evasion tactics can still emerge.

## Page 16

216

Digital Finance (2025) 7:201–254

2.4.3 CBDC regulation
Issuing CBDCs requires legal amendments, including defining legal tender status
(Kiff et al., 2020). For example, in the EU, where legal tender status applies only to
cash (euro banknotes), granting the Digital Euro the same status requires legislative
changes (Mazzetti, 2022).
Potential interoperability with cryptocurrencies must be formalised for efficient
and secure CBDCs. Regulation is crucial in CBDC design for integrating cryptocurrencies into a common L1 network (Allen et al., 2020). For example, the UK’s
Financial Services and Markets Bill extends AML oversight to cover both CBDCs
and stablecoins, ensuring that digital assets align with compliance mechanisms
(Broby, 2022).
Unlike traditional “command and control” methods like prohibitions and sanctions, “regulation by design” and “compliance by design” incorporate preventive
measures such as PETs (see 2.3). However, PETs can also support anonymous privacy coins like Monero, complicating illicit activity prevention. Further, some PETs
hide data too well, making them useless for audits. For example, CBDC Project
Stella by the ECB and Bank of Japan explored PETs for sharing transaction details
on DLT-based systems: since the data was hidden, it could not be checked for accuracy. Similarly, using outside companies for CBDC systems like software vendors or
cloud services creates risks (Kiff et al., 2020).
Similar to cryptocurrency AML regulation challenges, regulatory fragmentation
in CBDCs is also expected. Cross-border projects like mBridge and Project Dunbar
explore multi-CBDC platforms, but AML requirements and data privacy standards
differ across jurisdictions. Therefore, developing common frameworks aligned with
shared technical standards is crucial (Claessens et al., 2024).
To address regulatory challenges, Ren et al. (2024) proposed a blockchain-based
financial regulation framework for CBDC based on HE (see 2.3). This approach
enables authorities to validate compliance metrics without directly accessing transactional data. Moreover, their framework leverages smart contracts for automated
compliance monitoring. These technological solutions could potentially provide a
secure oversight mechanism for interoperable CBDCs.
2.4.4 CBDC and AML
Since 1989, the FATF has coordinated AML measures globally, targeting banks,
professionals, and now cryptocurrency exchanges. It employs grey-listing to identify countries with insufficient AML measures, urging them to enhance compliance. The Bahamas’ Sand Dollar was introduced to address particularly money
laundering concerns, after the country was placed on the FATF grey list in 2018
due to significant deficiencies in AML implementation (Mu and Mu, 2022).
Reducing illicit financial activity was a key policy objective for the Bahamas’
CBDC. The Bahamian authorities subsequently implemented an action plan
to address those deficiencies, and as a result, the Bahamas was delisted in 2020
(Soderberg et al., 2022).

## Page 17

Digital Finance (2025) 7:201–254

217

AML laws generally come in three forms: general prohibitions (preventing hiding
dirty money in transactions); reporting requirements (suspicious activity); and antievasion (or “structuring”) rules. The question is whether these rules are effective
and applicable to CBDCs (Allen et al., 2020). If a CBDC offers strong anonymity,
regulators may demand exchanges converting between the CBDC and other currencies implement KYC. Central banks can either handle AML compliance themselves
(expensive) or outsource it to commercial banks in a two-tier model (saves costs
by leveraging existing KYC) (Pocher and Veneris, 2022). To address vulnerabilities
such as the lack of data-sharing between government ID issuers and verifiers, jurisdictions could consider building fraud-resistant digital ID systems or collaborating
with third parties, as seen in the Sand Dollar and DCash collaboration with financial
institutions in terms of CDD (Kakebayashi et al., 2023).
The Digital Pound Foundation highlights that the digital nature of CBDCs can
strengthen AML regulations by enabling traceability, programmability, real-time
monitoring, and automated reporting, which can reduce the burden on financial
institutions (Digital Pound Foundation, 2024).
As CBDCs transaction volumes grow, the need for automated transaction monitoring and suspicious activity reporting (SAR) systems becomes even more important. A collaborative monitoring approach, like the one used by the ECCB, where
entities share monitoring tools, could be effective (Kakebayashi et al., 2023).
The FATF’s approach to VAs and VASPs offers valuable insights for CBDC
design. While cryptocurrencies struggle with the “travel rule” and risks from
unhosted wallets, CBDCs can integrate these standards. Real-time transaction monitoring and risk-based AML measures in CBDC design can align with FATF recommendations (Ordekian et al., 2024). Hence, traceable CBDCs, when widely adopted,
can offer greater control over money laundering (Sidorenko et al., 2021).
This aligns with the Chinese e-CNY’s “controlled anonymity”, using transaction size to determine user anonymity. However, criminals may use multiple small
transactions to evade detection. Proposed regulations suggest linking CBDC transaction data with big data analytics to allow authorised institutions to monitor and
de-anonymise suspicious activities (Cheng, 2023).
As Mu and Mu (2022) note, while central banks may not prioritise AML as a
core objective, they are expected to design CBDCs in line with these requirements.
Overall, CBDCs can address AML challenges posed by cryptocurrencies by
incorporating advanced monitoring and compliance features directly into their
design. A growing strand of cryptology literature develops such CBDC models, as
illustrated in the next subsection.
2.4.5 CBDCs with built‑in AML compliance
“PEReDi” is one of the proposed CBDC frameworks that balances privacy and
regulatory compliance through AML/KYC protocols and KYT (Know Your Transaction) requirements. It ensures transactions are private by default, hiding sender/
receiver identities and values via encrypted ledgers maintained by banks. However,
it also allows for conditional disclosure to regulators and law enforcement in cases
of suspicious activity (Kiayias et al., 2022).

## Page 18

218

Digital Finance (2025) 7:201–254

“KAIME” is another advanced CBDC framework that balances privacy and regulatory compliance. It introduces modular privacy, allowing sender/receiver anonymity to be added or removed as needed. Using HE and ZKPs, KAIME ensures
transaction privacy while enabling regulatory audits with threshold cryptography. Further, banks can access transaction details only with user consent. Unlike
“PEReDi”, “KAIME” supports offline transactions and offers an anonymous version
using ring signatures. Its cryptographic methods and flexible design make it adaptable to various regulatory needs (Dogan and Bicakci, 2024).
Gross et al. (2021) also propose a CBDC model that integrates privacy and
regulatory compliance using ZKPs to enforce AML without revealing transaction
details. Their design supports fully private, semi-private, and transparent transactions, ensuring cash-like privacy while addressing AML requirements. Unlike
“PEReDi” and “KAIME”, which rely on conditional disclosure or modular privacy, Gross’s model ensures privacy by design, storing transaction data only on
users’ devices.
Alternative approach to privacy and regulation trade-off in design is “Platypus”
which introduces an e-cash-based CBDC model. However, this approach focuses
more on privacy-preserving rather than AML enforcement (Wüst et al., 2022). Similarly, “UTT” (UnTraceable Transactions) model implements anonymity budgets,
allowing users to send payments anonymously till a certain threshold, after which
transactions either become public or undergo customised auditing rules (Tomescu
et al., 2022). However this approach does not offer real-time AML enforcement,
making it less effective compared to CBDCs with built-in compliance.
It could be observed that CBDCs with built-in programmability, KYC, and realtime transaction monitoring can provide the most effective solution for enhancing
AML effectiveness. However, the CBDC regulation requires legal adjustments and
integration with existing frameworks. By leveraging CBDCs’ advantages, policymakers can strengthen AML measures. This leads to the following hypothesis.
H13: The introduction of CBDCs with built-in AML compliance mechanisms
enhances AML effectiveness.
2.4.6 CBDC design variations and their implications for AML: case studies
While the advanced cryptography suggests CBDC models that may enhance AML,
we acknowledge that it is needed to overview how CDBC designs across jurisdictions address AML issues in real life. The selected top five cases below illustrate the
variations in approaches.
The e-CNY is designed with a “front-end anonymity and back-end real-name”
system. This allows users to conduct transactions with some degree of anonymity,
while the central bank has access to transaction details for monitoring and investigation. This dual-layered approach ensures privacy for everyday transactions but enables authorities to trace suspicious activities. This system leverages blockchain technology which ensures that all financial activities are recorded and can be audited,
making it harder for illicit activities to be undetected (He et al., 2023). Compared to

## Page 19

Digital Finance (2025) 7:201–254

219

the digital euro, the e-CNY offers stricter oversight since the PBOC monitors transactions directly.
While the eNaira also aims to provide some level of anonymity to users, it operates within a centralised framework where transactions are recorded on a central
ledger managed by the Central Bank of Nigeria. User transactions are not entirely
anonymous, however, the eNaira complies with Nigeria’s National Data Protection
Regulations to ensure secure handling of user data. The design also includes riskbased monitoring and reporting requirements to trace and report suspicious transactions. Additionally, the eNaira features wallet tiers and transaction limits based
on users’ bank verification numbers (BVN) or national identity numbers (NIN),
which also help to control financial flows (Ahiabenu, 2022). However, compared to
e-CNY, its reliance on a central ledger without blockchain transparency may reduce
efficiency in tracking illicit transactions.
The Sand Dollar offers a degree of anonymity for low-value transactions, through
Tier 1 eWallet, which does not require identification. However, all transactions are
monitored in real-time through an AML tool owned by the Central Bank of the
Bahamas. They also introduced simplified identity verification for low- and mediumvalue accounts, while still maintaining monitoring (Wenker, 2022). In particular, the
Sand Dollar’s real-time monitoring keeps AML enforcement by instant detection of
suspicious activity. However, the existence of anonymous Tier 1 wallets introduces
potential AML risks, particularly if these wallets are used in structuring schemes.
Compared to the digital euro, which uses a risk-based framework, the Sand Dollar’s
system places stronger reliance on direct transaction monitoring.
Jamaica’s JAM-DEX, is designed as an account-based retail CBDC, which links
transactions to the account holder’s identity, requiring identity verification. Therefore, it is quite transparent CBDC design from an AML perspective. The Bank of
Jamaica emphasised data security, stating that while transactions can be monitored,
consumers’ personal data will only be disclosed under a court order. The design also
implements KYC and KYT checks. The hybrid architecture of JAM-DEX allows the
central bank to issue digital currency directly to deposit-taking institutions (DTIs),
which then distribute it to the retail market (Baker, 2023). However, its reliance on
intermediaries, like the digital euro, introduces enforcement risks if those financial
institutions fail to monitor transactions effectively.
Unlike fully centralised systems, the ECB will not directly process or store transaction data, relying instead on regulated financial intermediaries to enforce AML.
The privacy safeguards include offline transactions for small payments without identity verification, and pseudonymisation techniques to minimise data exposure. The
system will comply with EU data protection laws (GDPR). To prevent illicit use,
a risk-based AML framework will apply: low-value transactions will have minimal
checks, while high-value transactions will trigger enhanced due diligence (EDD)
and reporting. A single ledger architecture will enable authorities to trace suspicious
activities. Financial intermediaries will be also responsible for CDD and transaction
monitoring (Soana and Aruda, 2024). Compared to more centralised CBDC models,
the reliance on intermediaries could create enforcement gaps if financial institutions
fail to report suspicious activities effectively.

## Page 20

220

Digital Finance (2025) 7:201–254

While the differences in CBDC designs and approaches to AML acknowledged
among countries that piloted/launched CBDC, our empirical approach will attempt
to evaluate the overall impact of CBDC adoption on AML effectiveness across
jurisdictions.

3 Methodology
Considering the complexities outlined in the literature, from privacy concerns
to regulatory gaps, an empirical approach is necessary to assess the relationship
between CBDC adoption and AML effectiveness, given the risks associated with
cryptocurrencies. Therefore, the regression model is constructed to investigate this
relationship, to provide a deeper understanding of how CBDC adoption impacts
AML measures.
3.1 Selection of variables and data sources
Our data set is focussed on countries that have launched or piloted CBDCs, analysed
as of December 2024 as cross-sectional data. To investigate the relationship between
different digital assets and their impact on AML effectiveness, most variables are
represented by several proxies for a comprehensive analysis.
To the authors’ knowledge, only one empirical study examines the impact of
CBDCs on AML effectiveness (Vu et al., 2024). This study was discovered after our
empirical analysis was completed and does not directly address our research question, given the limited overlap in variables.
In our study, each variable is represented by several proxies, except for the control
variables. The dependent variable (AML effectiveness) is represented by the FATF
AML index, the AML Basel score (inverted) and the AML Organised Crime Index.
The FATF AML Index is the core AML proxy which was directly derived from
FATF Mutual Evaluation Reports and consolidated assessment ratings (as of 19
December 2024) available on the FATF website. These reports are peer-reviewed
assessments that evaluate countries’ AML systems based on their compliance with
FATF standards and the effectiveness of their implementation. The average score for
each country was calculated by quantifying and summing: 11 ratings of immediate
outcomes that reflect the extent of a country’s AML effectiveness, and 40 ratings of
technical compliance that measure the implementation of FATF Recommendations.
The FATF AML Index provides a comprehensive regulatory perspective because it
directly measures compliance globally, but is subject to delays since evaluations do
not happen annually.
The AML Basel Score (2024) was sourced from the Basel Institute on Governance website. The Basel AML Index is an independent ranking that assesses countries’ money laundering and financial crime risks based on data from 17 public
sources across five domains, including (1) the quality of AML frameworks, (2) corruption risks, (3) financial transparency, (4) public accountability, and (5) political/
legal risks. Notably, the AML Basel Index was also used as an AML effectiveness

## Page 21

Digital Finance (2025) 7:201–254

221

proxy in studies by Vu et al. (2024) and Le et al. (2023). We inverted the Basel Index
(using the formula 10—Basel Index) to ensure that for all AML proxies higher rankings correspond with countries with stronger AML frameworks. The Basel AML
Index is included to provide a broader risk-based perspective, considering transparency and governance beyond technical compliance and ensuring more time consistency since its annual. However, the Basel AML Index aggregates multiple data
sources so it may be dependent on secondary data sources.
The AML Organised Crime Index was sourced from the Global Organised Crime
Index website supported by ENACT—European Network Against Crime and Terrorism and Interpol as of 2023. It provides an independent assessment of countries’ resilience against money laundering risks, incorporating governance quality, corruption
prevalence, and organised crime dynamics. The Organised Crime AML Index ensures
that the study captures AML effectiveness in the context of criminal networks, which is
crucial since AML failures often come from illicit financial flows rather than just regulatory weaknesses. However, it may be dependent on qualitative assessments, which
may vary across jurisdictions.
Together, these dependent variables capture AML effectiveness from multiple perspectives: formal compliance (FATF), systemic risk (Basel), and criminal exploitation
(Organised Crime).
For the independent variables, CBDC binary/trinary proxies were derived as follows: (1) adoption status (launched/pilot), (2) type (retail/wholesale/both), (3) structure
(account/token), (4) technology provider (local/international), (5) technology platform
(defined/not defined), (6) usage of DLT (DLT/no DLT). Data were taken from the
CBDC tracker and the Atlantic Council’s CBDC tracker. More accurate data could be
obtained from the white papers of central banks (see 6. for future research). Unlike
Vu et al. (2024), who included earlier CBDC stages, we focussed on launched or
piloted stages, as early-stage projects may not influence AML effectiveness and can be
cancelled.
All control variables were converted to binary variables via threshold setting: 1.
cryptocurrency regulation (legal/partial ban/general ban) from the Atlantic Council’s
database; 2. data privacy (presence or absence of Data Protection and Privacy Legislation) from the World Population Review website; 3. shadow economy (informal
economy sizes in %) from the World Economics database; 4. crypto ownership (cryptocurrency ownership data in %) from the Triple A report; 5. financial inclusion (Global
Financial Inclusion Account (% age 15 +)) from the World Bank; 6. internet penetration (individuals using the Internet (% of population) from the World Bank; 7. GDP
(natural logarithm (ln) of GDP per capita) from the IMF database.
Other independent variables, representing cryptocurrencies in CeFi and DeFi, were
obtained and normalised from the Chainalysis (2024b) Global Adoption Index: the
total value of cryptocurrency received through centralised services (CeFi, via the Centralised Service Value Received Ranking) and through DeFi protocols (via the DeFi
Value Received Ranking), respectively. While the lack of global data particularly on
illicit DeFi and CeFi transactions limits the direct inclusion of such volumes in this
study, the proxies for CeFi and DeFi activity capture the broader relationship between
cryptocurrencies from different spaces and AML effectiveness.

## Page 22

fatfscore

AML 1

AML 2

AML 3

CBDC 1

CBDC 2

CBDC 3

CBDC 4

CBDC 5

CBDC 6

CEFI 1

DEFI 1

Dependent

Dependent

Dependent

Independent

Independent

Independent

Independent

Independent

Independent

Independent

Independent

defivaluereceivedranking

centralisedservicevaluereceiv

DLT

tech_platform

tech_provider

structure

CBDC_type

adoption_status

organisedcrime

baselindex

Name of variable

Type of variable

Table 2  Summary of variables and data sources

Normalised country rank

The Chainalysis (2024b)
Crypto Crime Report
The Chainalysis (2024b)
Crypto Crime Report

Country rank
Global crypto adoption
2024: DeFi value received
ranking

Global crypto adoption
2024: Centralised service
value received ranking

Country rank

CBDC tracker, Atlantic
Council CBDC tracker

CBDC tracker, Atlantic
Council CBDC tracker

CBDC tracker, Atlantic
Council CBDC tracker

CBDC tracker, Atlantic
Council CBDC tracker

CBDC tracker, Atlantic
Council CBDC tracker

CBDC tracker, Atlantic
Council CBDC tracker

Defined 1 or na 0

Local 1 international 0

Account 1 token 0

Retail 1 wholesale 0 both 2

Launched 1 pilot 0

DLT 1 or non-DLT 0

CBDC DLT or no

CBDC tech platform

CBDC tech provider

CBDC structure

CBDC type

CBDC adoption status

Global Initiative Against
Transnational Organised
Crime. Organised Crime
and AML index

Basel Institute on Governance. Basel AML index.
Global ranking in 2024

2024

2024

December 2024

December 2024

December 2024

December 2024

December 2024

December 2024

2023

2024

FATF. Consolidated assess- December 2024
ment ratings

Country rank based on
scores

Date

Sources

Meaning of variable

The Organised Crime Index Normalised country rank
AML scores

Basel AML index global
ranking

FATF Mutual Evaluation
Reports Consolidated
assessment ratings

Explanation

222
Digital Finance (2025) 7:201–254

## Page 23

cefi

CEFI 2

DEFI 2

CONTROL 1 binary_cryptoreg

CONTROL 2 binary_data privacy

CONTROL 3 binary_shadow

CONTROL 4 binary_ownership

CONTROL 5 binary_fin_inclusion

CONTROL 6 binary_int_pene

CONTROL 7 lngdppc

Independent

Independent

Control

Control

Control

Control

Control

Control

Control

defi

Name of variable

Type of variable

Table 2  (continued)

Ban 0 legal 1

Normalised country rank

Normalised country rank

Meaning of variable

ln of GDP per capita

Internet Penetration: Individuals using the Internet
(% of population)

Global Financial Inclusion
Account (% age 15 +)

Cryptocurrency ownership
data in %

Informal Economy Sizes
in %

2024

International Monetary
Fund. IMF data mapper

World Bank. International
Telecommunication
Union (ITU) World
Telecommunication/ICT
Indicators Database

> 75% is 1, lower 0

2024

2022

2022

May 2024
Triple A (2024) Report:
The State of Global Cryptocurrency Ownership
in 2024

World Economics. Informal November 2023
EconomySize as a percentage of GDP

World Population Review.
Data Privacy Laws by
Country

World Bank. Global financial inclusion (Global
Findex) database

ln of GDP per capita

2024

2024

Date

Atlantic Council Cryptocur- July 2024
rency Regulation Tracker

The Chainalysis (2024b)
Crypto Crime Report

The Chainalysis (2024b)
Crypto Crime Report

Sources

> 50% is 1, lower 0

> 10% is 1, lower 0

> 50% is 1, lower 0

Data Protection and Privacy Have legislation 1 no legisLegislation Worldwide
lation 0

Legal/Partial ban/General
ban

normalised DEFI 1

normalised CEFI 1

Explanation

Digital Finance (2025) 7:201–254
223

## Page 24

IV

IV

Instrument

Instrument

tradtomonthwage

For data sources, see section “Data Sources” in References

Source: Authors’ own work

lntradvol

IV

Instrument

lntradtoint

Name of variable

Type of variable

Table 2  (continued)

Crypto trading volume
compared to average
monthly wage

Crypto trading volume per
internet user (USD)

Crypto trading volume
(USD)

Explanation

Coinwire (2024) Crypto
trading report
Coinwire (2024) Crypto
trading report

%

Coinwire (2024) Crypto
trading report

Sources

ln

ln

Meaning of variable

2024

2024

2024

Date

224
Digital Finance (2025) 7:201–254

## Page 25

Digital Finance (2025) 7:201–254

225

The selection of variables was dictated by their relevance/availability and justified
by the hypotheses derived in the literature review. See the summary on the variables in
Table 2.
3.2 The model and rationale
3.2.1 The model
The study employs multiple regression models to examine the determinants of AML
effectiveness across countries. The initial regression model is specified as follows:

AMLEffectivenessi = 𝛽0 + 𝛽1 CeFii + 𝛽2 DeFii + 𝛽3 AdoptionStatusi + 𝛽4 Typei
+ 𝛽5 Structurei + 𝛽6 Provideri + 𝛽7 Platformi + 𝛽8 DLTi
+ 𝛽9 lngdppci + 𝛽10 cryptoregulationi + 𝛽11 dataprivacyi
+ 𝛽12 shadoweconomyi + 𝛽13 cryptoownershipi + 𝛽14 finclusioni
+ 𝛽15 interpenetrationi + 𝜖i .
(1)
where AML_Effectivenessi , the dependent variable, represents AML effectiveness of
the i th country/jurisdiction, and was proxied separately by three variables: AML
FATF Score, AML Basel Index and AML Organised Crime Index. These proxies are
continuous in nature and have been transformed to ensure that higher values correspond to stronger AML frameworks. The details of each of these proxies have been
explained in prior sections.
Next, CBDCi represent a vector of six independent variables associated with
CBDC (adoption status, type, structure, technology provider, technology platform
and DLT). Adoption status is a binary variable which equals 1 if country i has
launched the CBDC and equals 0 if in pilot. Type is a trinary variable which equals
1 if CBDC is retail, 0 if wholesale and 2 if both. Structure is a binary variable which
equals 1 if CBDC is an account and equals 0 otherwise. Technology provider is a
binary variable which equals 1 if CBDC technology provider is local and equals 0
otherwise. Technology platform is a binary variable which equals 1 if CBDC technology platform is defined and equals 0 otherwise. DLT is a binary variable which
equals 1 if CBDC is on a DLT and equals 0 if otherwise.
The variables CeFii and DeFii represent cryptocurrency adoption of the ith country/
jurisdiction in a centralised or decentralised finance spaces, respectively. These two variables are continuous in nature and correspond to distinct sides of the cryptocurrency ecosystem relevant to AML effectiveness. CeFi platforms have better regulatory frameworks,
compared to DeFi platforms, which create specific AML challenges.
Seven control variables: log GDP per capita, cryptocurrency regulation, data privacy, shadow economy, cryptocurrency ownership, financial inclusion, and internet
penetration. These variables reflect information on the regulatory, political, legal,
economic and financial environment of each of the jurisdictions. Log GDP per
capita is the natural logarithmic transformation of the Gross Domestic Product per
capita of the of the i th country/jurisdiction. The rest of the control variables are

## Page 26

226

Digital Finance (2025) 7:201–254

binary in nature. Cryptocurrency regulation equals 1 if a country has placed a ban
on cryptocurrency and equals 0 otherwise. Data privacy equals 1 if a country has
at least one data privacy regulation in place and equals 0 otherwise. Shadow economy equals 1 if the percentage of informal economy data is above 50% and equals 0
otherwise. Cryptocurrency ownership equals 1 if the percentage of cryptocurrency
ownership of the i th country is above 10% and equals 0 otherwise. Financial inclusion equals 1 if the percentage of individual accounts in country i is above 50% and
equals 0 otherwise. Internet penetration equals 1 if the percentage of internet users
in country i is above 75% and equals 0 otherwise.
The parameters to be estimated 𝛽i represent the average treatment effect of the
corresponding variables. 𝜖i represents the error term of the model.
3.2.2 Rationale
The models were estimated using Ordinary Least Squares (OLS) with heteroscedastic-robust standard errors on cross-sectional data in the main results. Data
availability and consistency across jurisdictions mainly influenced the use of a
cross-sectional approach. As of December 2024, only three countries have fully
launched CBDCs; meaning that there are low within-country variations for panel
analysis. Since the AML proxies and CBDC adoption vary substantially between
countries but not necessarily within countries over short periods, a cross-sectional
approach is sufficient for identifying differences at a given point in time.
Additionally, key variables of the study (AML Effectiveness and CBDC proxies)
are either slow-moving or remain constant over time, implying low within-country
variations over time. Though the AML regulations can be argued as being dynamic,
their proxies are slow-moving indicators. For instance, FATF mutual evaluations
reports are conducted every 5–7 years, implying that changes in the FATF Score are
infrequently done. Also, the Basel AML Index and Organised Crime Index change
slowly, and they reflect long-term regulatory strength rather than short-term fluctuations. Unlike Vu et al. (2024) who used a discrete CBDC adoption measure, five different CBDC adoption proxies in this paper are binary in nature. Our CBDC adoption proxies represent either the nature of the proposed CBDC (tech provider, type,
structure, DLT) or actual adoption status (launched or not) whereas the hypothesis
of Vu et al. (2024) was on stages of adoption.
The paper used many explanatory variables to examine their impact on the AML
effectiveness indices. Backward elimination was, therefore, used to obtain smaller
subsets of explanatory variables for initial estimation before the full model containing all predictors was estimated. Four variations of Eq. 1 were estimated for each
of the dependent variable proxies in the main result based on common variables
obtained from an initial backward elimination criterion with a threshold probability
of 0.05. Backward elimination helped reduce model complexity and possibility of
overfitting, especially in the models with subset of predictors. The first three variations used a subset of the regressors while the final variation was the full model

## Page 27

Digital Finance (2025) 7:201–254

227

Table 3  Results for focussed models (FATF Score)
(1)

(2)

(3)

(4)

0.1943* (0.0937)

0.1753* (0.0760)

0.1233. (0.0639)

0.0748 (0.0824)

CBDC provider
binary

− 0.2974***
(0.0664)

− 0.3378** (0.1086)

Crypto ownership
binary

− 0.2322***
(0.0574)

− 0.2265 (0.1500)

Crypto regulation
binary

DeFi

− 0.0127 (0.3610)

CeFi
Log (GDP per
capita)
Constant

2.6202***
(0.0549)

− 0.5177***
(0.1269)

− 0.4836 (0.5909)

0.1474***
(0.0248)

0.2257***
(0.0201)

0.2657** (0.0784)

1.1559***
(0.2453)

0.6666***
(0.1793)

0.3351 (0.6513)

Controls

No

No

No

Yes

Observations

36

36

36

35

R-squared

0.1167

0.5127

0.7184

0.7718

Adj. Rsquared

0.0907

0.4832

0.6715

0.5917

F

4.2978

22.5840

33.5912

4.2844

Notes: Variable Crypto Regulation is a binary variable where 1 indicates cryptocurrencies are legal, and
0 indicates a ban on cryptocurrencies. Variable CBDC tech provider binary equals 1 for local CBDC
technology provider and equals 0 otherwise. Variable Crypto Ownership binary equals 1 if crypto ownership in the jurisdiction exceeds 10% and equals 0 otherwise. CeFi is the standardised rank of centralised
trading in the country
Significance codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1
Source: Authors’ own work

of Eq. 1. The estimated variations are provided in the main results. Intuitively, the
impact of certain variables such as GDP per capita on AML effectiveness will be
unsurprising. By starting with these variables based on the backward elimination,
we are able to detect the effects of our main proxies as they are introduced.
See the equation for the model after backward elimination below:

AMLEffectivenessi = 𝛽0 + 𝛽1 CeFii + 𝛽2 DeFii + 𝛽3 cryptoregulationi
+ 𝛽4 cryptoownershipi + 𝛽5 Provideri + 𝛽6 lngdppci + 𝜖i .

(2)

While the focussed models presented in Tables 3, 4 and 5 exclude DeFi due to its
statistical insignificance according to backward elimination, figures for DeFi from
the extended models are reported in Columns 4 for each dependent variable. Additionally, DeFi was included in the robustness checks, as shown in the model reflected
in Eq. 2. Robustness checks such as a two-stage least squares (2SLS) instrumental

## Page 28

228

Digital Finance (2025) 7:201–254

Table 4  Results for focussed models (Basel Index)
(1)

(2)

(3)

(4)

0.4916 (0.3148)

0.4431. (0.2538)

0.5628. (0.2966)

0.3723 (0.3313)

CBDC provider
binary

− 0.4718 (0.4095)

− 0.6032 (0.4611)

Crypto ownership
binary

− 1.1390***
(0.3010)

− 0.3734 (0.6127)

Crypto regulation
binary

DeFi

2.6242. (1.4241)

CeFi

0.6796 (0.7690)

Log (GDP per
capita)

− 2.9174 (2.3706)

0.4266*** (0.0936) 0.4752*** (0.1191) 1.0319** (0.3174)

Constant

4.7413*** (0.2455) 0.4967 (0.9740)

0.0166 (0.9807)

− 5.3347. (2.5658)

Controls

No

No

No

Yes

Observations

35

35

35

34

R-squared

0.0593

0.3267

0.5518

0.7438

Adj. Rsquared

0.0307

0.2846

0.4746

0.5303

F

2.4393

11.4082

11.6283

3.4838

Notes: refer to Table 3
Significance codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1
Source: Authors’ own work
Table 5  Results for focussed models (Organised Crime)
(1)

(2)

(3)

(4)

1.0054. (0.5414)

0.9073. (0.5151)

0.5222 (0.5445)

− 0.2036 (0.6931)

CBDC provider
binary

− 0.9436 (0.8849)

− 1.0557 (0.8284)

Crypto ownership
binary

− 1.2326* (0.5100) 0.7091 (1.1363)

Crypto regulation
binary

DeFi

1.0298 (2.4521)

CeFi

− 1.9691* (0.8399) − 4.4563 (3.1115)

Log (GDP per capita)

0.4150* (0.1814) 0.6768*** (0.1764) 1.4453** (0.4359)

Constant

5.3000*** (0.3073) 1.2214 (1.7794)

− 0.0943 (1.5138)

− 8.8413. (4.7501)

Controls

No

No

Yes

No

Observations

36

36

36

35

R-squared

0.0976

0.1974

0.3629

0.5569

Adj. Rsquared

0.0711

0.1487

0.2567

0.2071

F

3.4484

5.6845

11.2691

1.5922

Notes: refer to Table 3
Significance. codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1
Source: Authors’ own work

## Page 29

Digital Finance (2025) 7:201–254

229

variable approach, Generalised Methods of Moments (GMM), sub-sample based on
fully retail CBDCs, and regression with interaction term were conducted to check
the robustness of the results (see 4.3).
The equations used for the interaction term are the following:

AMLEffectivenessi = 𝛽0 + 𝛽1 CeFii + 𝛽2 DeFii + 𝛽3 AdoptionStatusi
+ 𝛽4 cryptoregulationi + 𝛽5 cryptoregulation
× AdoptionStatusi + 𝛽6 cryptoownershipi
+ 𝛽7 Provideri + 𝛽8 lngdppci + 𝜖i ,

(3)

AMLEffectivenessi = 𝛽0 + 𝛽1 CeFii + 𝛽2 DeFii + 𝛽3 AdoptionStatusi + 𝛽4 cryptoregulationi
+ 𝛽5 cryptoregulation × AdoptionStatusi + 𝛽6 Typei + 𝛽7 Structurei
+ 𝛽8 Provideri + 𝛽9 Platformi + 𝛽10 DLTi + 𝛽11 lngdppci + 𝛽12 dataprivacyi
+ 𝛽13 shadoweconomyi + 𝛽14 cryptoownershipi + 𝛽15 finclusioni
+ 𝛽16 interpenetrationi + 𝜖i .

(4)
where cryptoregulation × AdoptionStatus represent the interaction term between
adoption status and cryptocurrency regulation and all other variables remain the
same.

4 Results
The correlations between the three dependent proxies (FATF Score and Basel Index:
0.65, FATF Score and Organised Crime: 0.55, and Basel Index and Organised
Crime: 0.47) are moderate. However, utilising the same set of independent variables
across all models after performing backward elimination for each separately, is justified. This approach ensures consistency and makes it easier to compare how each
proxy affects the dependent variable.
The results of regressions are presented below, starting with the Main Results,
followed by Robustness Checks.
4.1 Main regression results
This section will include the three main regression tables (FATF Score, Basel Index,
and Organised Crime) without any additional modifications.
Each table below presents the results for the three focussed models after backward elimination was done for each, so only significant variables were pre-selected.
Table 3 shows that jurisdictions with legal cryptocurrencies have higher AML
effectiveness (the FATF Score index) than those with a ban, though the evidence is
weak at the 10% significance level. The FATF Score index is lower in countries with
local CBDC providers, higher cryptocurrency ownership, and higher levels of CeFi

## Page 30

230

Digital Finance (2025) 7:201–254

Table 6  VIF analysis
Variable

VIF

1/VIF

CeFi

24.04

0.0416

DeFi

11.64

0.0859

Log(GDP per capita)

9.97

0.1003

Adoption status

5.95

0.1679

Data privacy

5.21

0.1919

Internet penetration

4.44

0.2251

Shadow economy

4.10

0.2441

Ownership

3.59

0.2787

Financial inclusion

2.72

0.3678

CBDC DLT

2.16

0.4638

Tech provider

2.12

0.4721

Crypto ownership

1.83

0.5465

CBDC Type

1.74

0.5731

CBDC structure

1.64

0.6105

Tech platform

1.50

0.6648

Mean VIF

5.51

B. VIF excluding DeFi and CeFi
Variable

VIF

1/VIF

Data privacy

5.10

0.1962

Internet penetration

4.02

0.2488

Log(GDP per capita)

3.77

0.2656

Ownership

3.50

0.2858

Shadow economy

3.04

0.3289

CBDC adoption status

2.91

0.3434

Financial inclusion

2.18

0.4592

Crypto regulation

1.79

0.5591

CBDC type

1.74

0.5752

CBDC tech provider

1.69

0.5932

CBDC DLT

1.67

0.6004

CBDC structure

1.63

0.6125

Tech provider

1.43

0.7013

Mean VIF

2.65

trading. In contrast, countries with higher GDP per capita have higher FATF Score
index values.
Table 4 shows that jurisdictions where cryptocurrencies are legal tend to have
higher AML Basel Index values, though evidence is weak at the 10% level of significance. The AML Basel Index is lower in countries where more than 10% of the
population owns cryptocurrency. There is no statistically significant impact of the

## Page 31

Digital Finance (2025) 7:201–254

231

CBDC technology provider and CeFi trading on the Basel Index. GDP per capita
has a positive and significant impact on the AML Basel Index.
Table 5 shows that cryptocurrency regulation and CBDC technology providers
do not have statistically significant relationships with the AML Organised Crime
Index after all variables are introduced into the model. The AML Organised Crime
Index is lower in countries with more than 10% crypto-ownership and high CeFi
trading. Furthermore, higher GDP per capita is statistically associated with higher
AML Organised Crime Index.
4.2 Multicollinearity
The study acknowledges that variance inflation factor (VIF) is above 10 for two
variables of interest: CeFi and DeFi. These variables form the core of the research
hypotheses and are maintained. However, individual VIF values for all other variables when CeFi and DeFi are excluded are below 10. In fact, CeFi and DeFi are
strongly correlated (0.85), and this is expected (see 2.4.1). The variance inflation
factor (VIF) is reported in Table 6.
4.3 Robustness checks
To ensure the robustness of the findings and address potential endogeneity concerns,
a series of additional checks were performed.
4.3.1 Two‑stage least squares (2SLS) regression
The 2SLS instrumental variable approach was the first form of robustness checks
conducted. CeFi and DeFi were assumed to be endogenous, and instrumented with
crypto trading volume (lndradvol), crypto trading volume per internet user (lntradtoint) and crypto trade volume to average monthly wage (tradtomonthwage) obtained
from the Coinwire crypto trading report (2024).
The same selected instruments were used for CeFi and DeFi in the 2SLS and
GMM estimations. These instruments correlate strongly with CeFi and DeFi and
largely do not have a direct impact on AML effectiveness except through CeFi and
DeFi.
These instruments are relevant or correlate with CeFi and DeFi in the following ways. The total trading volume of cryptocurrencies reflects market activity and
engagement with cryptocurrencies, which tend to influence the adoption of both
centralised and decentralised platforms. Countries with high trading volumes will
tend to have relatively more developed CeFi exchanges and active DeFi ecosystems
compared to countries with low trading volumes. While trading volume reflects
overall market activity, trading volume per internet user and trading volume per
average wage captures the intensity of crypto engagement per potential user. Individuals within a jurisdiction with high trading volumes per internet usage are more
likely to engage in digital financial services, including CeFi and DeFi compared to

## Page 32

− 1.0043 (2.2675)

0.9122 (3.1067)

0.1057 (0.1919)

1.7659 (1.7969)

No

33

0.542

0.458

31.136***

23.354***

1.684

0.447

DeFi

CeFi

Log (GDP per capita)

Constant

Controls

Observations

R-squared

Adj. Rsquared

Weak Instrument Test (CeFi)

Weak Instrument Test (DeFi)

Sargan

Wu-Hausman

1.069

2.562

19.966***

26.972***

0.243

0.365

32

No

2.9699 (7.4510)

0.1939 (0.7912)

4.3105 (12.8399)

− 2.8233 (9.4751)

− 1.4550 (0.8772)

0.2640 (0.3478)

Source: Authors’ own work

Significance codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1

Notes: CeFi and DeFi were instrumented with lntradvol, lntradtoint and tradtomonthwage

0.273

11.875***

14.636***

9.014**

0.602

0.795

32

Yes

0.3840 (0.9549)

0.2615. (0.1467)

− 0.5519 (1.6322)

− 0.0557 (0.9404)

− 0.2301* (0.0928)

− 0.2562 (0.2045)

Crypto ownership binary

0.0497 (0.0753)
− 0.3506** (0.1177)

0.0848 (0.0861)

CBDC provider binary

Crypto regulation binary

(3)

(1)

(2)

Basel Index

FATF Score

Table 7  Robustness Check: IV estimation of results with CeFi & DeFi as endogenous

0.323

5.165*

8.041**

4.478*

0.538

0.769

31

Yes

− 6.7255* (2.3265)

1.4219** (0.3920)

− 7.5721 (4.9469)

4.1458 (2.7593)

− 0.5941* (0.2407)

− 0.9770** (0.2680)

0.0326 (0.2395)

(4)

1.567

2.189

26.422***

33.032***

− 2.909

− 2.278

32

No

− 15.3862 (29.9740)

2.2475 (3.2000)

− 29.3188 (51.4275)

20.5502 (36.7045)

1.0072 (3.7266)

0.2781 (1.3774)

(5)

Organised Crime

17.567***

0.082

87.527***

26.158***

− 3.306

− 1.153

31

Yes

− 37.8673* (13.6081)

5.5330* (1.9273)

− 44.3068* (20.1622)

23.0449. (12.4827)

0.7561 (1.6904)

− 4.3490* (1.5164)

− 0.0271 (1.1767)

(6)

232
Digital Finance (2025) 7:201–254

## Page 33

− 0.1076*** (0.0219)
0.0706 (0.0476)
0.0098 (0.0369)

− 0.1077*** (0.0201)

0.0622. (0.0318)

0.0039 (0.0163)

− 0.0218 (0.0464)

lntradvol

lntradtoint

tradtomonthwage

Crypto regulation binary
0.0112 (0.0716)
2.1486* (0.8282)
Yes
32
0.888

0.0522* (0.0252)

2.1610*** (0.5449)

No

33

0.840

0.803

Crypto ownership binary

Log (GDP per capita)

Constant

Controls

Observations

R-squared

Adj. Rsquared

0.794

0.834

32

No

2.1255*** (0.5661)

0.0530* (0.0253)

0.0230 (0.0393)

− 0.0261 (0.0499)

0.0050 (0.0165)

0.0604. (0.0329)

Source: Authors’ own work

Significance codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1

Notes: First Stage CeFi regression. Instruments were lntradvol, lntradtoint and tradtomonthwage

0.768

0.0683 (0.0593)

− 0.0939 (0.0740)

0.0253 (0.0370)

CBDC provider binary

0.0107 (0.0551)

(3)

(2)

(1)
− 0.1061*** (0.0213)

Basel Index

FATF Score

Table 8  CeFi first stage

0.757

0.887

31

Yes

1.7832 (1.1211)

0.0834 (0.0714)

− 0.0059 (0.0689)

− 0.1104 (0.0795)

− 0.0125 (0.0780)

0.0193 (0.0438)

0.0538 (0.0649)

− 0.0932* (0.0350)

(4)

0.823

0.857

32

No

2.2460*** (0.5403)

0.0471. (0.0253)

0.0137 (0.0329)

− 0.0326 (0.0451)

0.0012 (0.0173)

0.0763* (0.0320)

− 0.1117*** (0.0201)

(5)

Organised Crime

0.815

0.914

31

Yes

2.0677* (0.7834)

0.0743 (0.0529)

− 0.0025 (0.0608)

− 0.1293. (0.0712)

− 0.0060 (0.0464)

0.0169 (0.0349)

0.0902. (0.0441)

− 0.1121*** (0.0222)

(6)

Digital Finance (2025) 7:201–254
233

## Page 34

− 0.0186 (0.1064)

0.0028 (0.0904)

− 0.0187 (0.0284)

− 0.0068 (0.0502)

− 0.0566 (0.0457)

− 0.0277 (0.0364)

3.8996*** (0.4150)

No

33

0.764

0.710

tradtomonthwage

Crypto regulation binary

CBDC provider binary

Crypto ownership binary

Log (GDP per capita)

Constant

Controls

Observations

R-squared

Adj. Rsquared

0.794

0.834

32

No

2.1255*** (0.5661)

0.0530* (0.0253)

0.0230 (0.0393)

− 0.0261 (0.0499)

0.0050 (0.0165)

0.0604. (0.0329)

− 0.1061*** (0.0213)

Source: Authors’ own work

Significance codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1

Notes: First Stage DeFi regression. Instruments were lntradvol, lntradtoint and tradtomonthwage

0.714

0.862

32

Yes

5.0946*** (1.1186)

− 0.0593 (0.0871)

0.0220 (0.0845)

− 0.0260 (0.0572)

0.1235. (0.0616)

0.1051* (0.0449)

− 0.1892*** (0.0211)

− 0.1517*** (0.0148)

lntradtoint

(3)

(1)

(2)

Basel Index

FATF Score

lntradvol

Table 9  DeFi first stage

0.691

0.856

31

Yes

4.8850** (1.3825)

− 0.0506 (0.0964)

− 0.0070 (0.1009)

− 0.0281 (0.1118)

0.0087 (0.1052)

− 0.0205 (0.0632)

0.1138 (0.0788)

− 0.1809*** (0.0373)

(4)

0.823

0.857

32

No

2.2460*** (0.5403)

0.0471. (0.0253)

0.0137 (0.0329)

− 0.0326 (0.0451)

0.0012 (0.0173)

0.0763* (0.0320)

− 0.1117*** (0.0201)

(5)

Organised Crime

0.777

0.896

31

Yes

4.9765*** (1.0058)

− 0.0505 (0.0750)

− 0.0172 (0.0758)

− 0.0703 (0.0959)

− 0.0023 (0.0716)

− 0.0156 (0.0523)

0.1520** (0.0511)

− 0.1956*** (0.0196)

(6)

234
Digital Finance (2025) 7:201–254

## Page 35

33

1.683

Observations

J-Test

2.2410*** (0.4980)

1.658

32

Yes
2.450

32

No

4.7621 (8.1294)

0.0093 (0.8814)

7.9692 (14.5565)

− 5.8278 (10.5082)

− 1.4813 (0.9036)

0.3493 (0.4431)

Source: Authors’ own work

Significance codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1

Notes: CEFI and DEFI were instrumented with lntradvol, lntradtoint and tradtomonthwage

2.3200 (1.8392)

No

Constant

Controls

0.0618 (0.0766)

1.5785* (0.6268)

1.7637 (3.2761)

0.0468 (0.2048)

CeFi

− 1.1681** (0.3918)

− 1.6445 (2.2503)

DeFi

Log (GDP per capita)

− 0.4019** (0.1394)

− 0.2492 (0.1879)

Crypto ownership binary

0.1934** (0.0683)

− 0.2773** (0.0938)

0.0806 (0.1296)

CBDC provider binary

Crypto regulation binary

(3)

(1)

(2)

Basel Index

FATF Score

Table 10  Robustness Check: GMM

17.111***

31

Yes

0.3931 (1.8666)

0.5665 (0.4399)

2.3450 (3.1949)

− 1.7785 (1.3335)

− 1.5463* (0.7333)

− 0.5077 (0.8761)

− 0.0647 (0.1856)

(4)

1.248

32

No

− 13.6289 (29.4511)

2.0843 (3.1340)

− 28.4688 (46.4081)

19.6338 (32.7642)

1.2008 (3.2625)

0.5428 (1.2289)

(5)

Organised Crime

0.150

31

Yes

− 35.5282*** (7.5761)

4.6884*** (0.9488)

− 42.5220*** (9.6514)

23.6220*** (5.9985)

1.6594 (1.9298)

− 3.7892*** (0.8527)

− 1.4284 (1.1294)

(6)

Digital Finance (2025) 7:201–254
235

## Page 36

236

Digital Finance (2025) 7:201–254

those with low trading volume per internet usage. Finally, trading volume per average wage measures crypto trading activity relative to economic conditions. Higher
trading activity per wage can reflect the likelihood of individuals to engage in alternative financial arrangements, outside the traditional banking system as people
may be seeking high yield-generating opportunities. On the assumption of exogeneity, these instruments do not directly impact AML effectiveness except through
the regulations governing the CeFi and DeFi platforms. The state and nature of
AML within jurisdictions can be determined by changes in financial infrastructure
or CBDC direction, which in turn influences AML compliance and crime risks.
Empirically, diagnostic tests such as weak instrument test, first stage regression,
Sargan test and J-Test (GMM only) are reported, and largely suggest that the instruments are valid.
The tables below show that CBDC provider is negatively associated with each
of the AML effectiveness measures at least at the 5% level of significance. Crypto
ownership is negatively statistically related to FATF Score and Basel Index within
the full model at the 5% level of significance (Tables 7, 8, 9).
4.3.2 Generalised Methods of Moments (GMM) estimation
The J-test shows five out of the six model estimations were statistically insignificant,
an indication that the instruments used are generally valid econometrically. The
direction of the coefficients in the GMM estimation is generally similar to the main
specifications though with varying level of statistical significance. CBDC provider
coefficient showed a negative direction (Table 10).
4.3.3 Retail sub‑sample
Next, we considered sub-sample analysis based on fully retail CBDC status as
another form of robustness checks. On the fully retail CBDC, the direction of the
crypto-regulation binary was consistent with the main results. However, the FAFT
score was not significant which is not surprising, given a small sample size. In the
non-fully retail CBDC subsample analysis, however, significance is seen for the
FAFT Score and the Basel Index analysis. More importantly, the direction of the
coefficient is consistent with the main results. The negative coefficient on CBDC
provider binary for the FAFT Score and Basel Index analysis was consistent with
the main result. Variation in crypto-ownership binary could not be established in the
FAFT Score and Basel Index due to the singularity small sample estimation problem. The directions of other variables, CeFi, DeFi and GDP per capita were mainly
consistent with the earlier results. See the results in Table 11.
4.3.4 Interaction term
Lastly, Table 12 reports the estimation of Eqs. 3 and 4 which examine the impact of
the interaction term of Crypto regulation and CBDC Adoption Status.

## Page 37

0.2039** (0.0478)

0.8539. (0.4257)

16

0.666

0.499

3.985

Log (GDP per capita)

Constant

Observations

R-squared

Adj. Rsquared

F

Source: Authors’ own work

Significance codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1

3.63

0.484

0.669

15

− 0.7394 (1.7266)

0.5497* (0.1998)

0.959

-0.017

0.390

16

− 0.2326 (4.5135)

0.6333 (0.5368)

2.1348 (3.4278)

− 2.6554 (3.9869)

2.7427. (1.3497)

− 0.1115 (0.3262)

− 2.1516 (1.6336)

− 0.3580 (0.4000)

CeFi

0.2709 (1.4948)

− 0.9085 (1.1523)

DeFi

− 0.5477 (0.6053)

0.0291 (0.4655)
− 1.8061 (2.6341)

− 0.2089 (0.1374)

CBDC provider binary

Crypto ownership binary

0.0320 (0.1128)

Crypto regulation binary

6.996

0.654

0.764

20

0.8806 (0.6949)

0.2020* (0.0741)

− 0.2766 (0.4706)

− 0.0787 (0.7001)

− 0.2831* (0.0990)

− 0.3498* (0.1289)

0.1665. (0.0836)

(4)

(2)

(1)

(3)

FAFT

Basel

FAFT

Org. Crime

Not fully Retail

Fully Retail CBDC sub-sample

Table 11  Robustness check: use of sub-sample by retail CBDC type

5.356

0.579

0.712

20

− 2.5360 (2.6842)

0.7142* (0.2863)

2.1521 (1.8179)

− 2.2545 (2.7045)

− 0.8284* (0.3824)

− 0.2473 (0.4980)

0.8911* (0.3231)

(5)

Basel

5.366

0.580

0.712

20

0.4389 (3.7865)

0.6023 (0.4039)

− 1.4656 (2.5645)

− 1.1245 (3.8152)

− 1.1191. (0.5394)

− 1.4163. (0.7026)

1.3810** (0.4558)

(6)

Org. Crime

Digital Finance (2025) 7:201–254
237

## Page 38

0.2681** (0.0812)

0.3090 (0.7299)

Yes

35

0.772

0.1324*** (0.0279)

1.3550*** (0.2915)

No

36

0.578

0.508

Log (GDP per capita)

Constant

Controls

Observations

R-squared

Adj. Rsquared

Source: Authors’ own work

Notes: Significance codes: 0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘’ 1

0.569

− 0.5091 (0.6227)

CeFi

− 0.2262 (0.1496)

0.0115 (0.4115)

− 0.1390* (0.0612)

DeFi

Crypto ownership

− 0.0390 (0.3446)

− 0.3378** (0.0868)

− 0.0479 (0.0960)

Crypto Regulation ×
Adoption Status

0.0771 (0.1156)

0.0562 (0.2620)

CBDC provider binary

0.1635* (0.0793)

− 0.1806* (0.0782)

Crypto Regulation

0.388

0.478

35

No

0.1186 (1.2932)

0.4838*** (0.1143)

− 1.0367*** (0.2648)

− 0.2505 (0.4190)

0.0396 (0.5032)

0.4080 (0.2754)

(3)

(1)

(2)

Basel Index

FATF Score

Adoption Status

Table 12  Interaction term

0.661

0.825

34

Yes

− 8.0385** (2.0549)

1.2288*** (0.2364)

− 5.2421*** (1.3024)

5.1975*** (1.0573)

− 0.2294 (0.4642)

− 0.4787. (0.2749)

− 4.0569** (1.2342)

1.9959* (0.7856)

0.6583* (0.2958)

(4)

0.186

0.302

36

No

2.0616 (1.8452)

0.3617. (0.1842)

− 1.1577. (0.5898)

− 1.3366 (0.7887)

− 0.3864 (0.5452)

0.8925 (0.5768)

(5)

Organised Crime

0.237

0.596

35

Yes

− 10.4307.
(5.7929)

1.5075** (0.4951)

− 6.0946. (2.9287)

3.2888 (3.1953)

0.8875 (0.7537)

− 0.8757 (1.3092)

− 4.3153 (2.5624)

1.5972 (1.2849)

0.0923 (0.9689)

(6)

238
Digital Finance (2025) 7:201–254

## Page 39

Digital Finance (2025) 7:201–254

239

The coefficient of the interaction term is negative in all model specifications
but only statistically significant in the full Basel Index model. This suggests that
countries that have adopted CBDC and are crypto regulated experience lower Basel
Index effectiveness (Table 12).

5 Key findings and discussions
5.1 Confirmed hypotheses
1. Cryptocurrency regulation: in the FATF and Basel models cryptocurrency
regulation shows a positive though statistically weakly significant relationship with
AML effectiveness. Therefore, jurisdictions that allow legal cryptocurrency use,
tend to have higher AML effectiveness indexes than those with a legal ban. Hence,
our hypothesis 12 holds true.
The paper by Griffith and Clancey-Shang (2023) showed that even if the 2021
Chinese crypto ban led to a price drop and increased volatility, it did not eliminate crypto activity. Their panel regression results indicated that crypto ownership
among U.S. households increased, and mining moved to Kazakhstan. This suggests
that bans do not necessarily stop crypto activity but force cryptocurrency markets
to shift to less regulated environments, which makes further AML regulation even
harder.
These spillover effects were also observed in the empirical study by Borri
and Shakhnov (2020). They examined the effects of China’s 2017 cryptocurrency
regulatory changes by panel regression analysis and found an increase in trading
volume and bitcoin prices in markets like Korea, Japan, and the U.S., as well as
on Chinese P2P exchanges. This reflects that restrictive regulations may not prevent
cryptocurrency activity but rather redirect it into less-regulated channels, which may
complicate AML enforcement in banned jurisdictions.
Shirakawa and Korwatanasakul (2019) investigated the relationship between
institutional strength, financial openness, and regulatory approaches to cryptocurrency across 218 economies via a cross-sectional model. Their findings revealed that
jurisdictions with stronger governance frameworks are more likely to adopt a less
restrictive regulatory stance on cryptocurrency. This implies institutional capacity to
manage financial risks, including money laundering.
2. Cryptocurrency ownership: across all models higher cryptocurrency ownership
(over 10%) is negatively associated with AML effectiveness. Countries with more
widespread cryptocurrency adoption tend to have weaker AML performance. This is
in line with our hypothesis 3.
Research by Alnasaa et al. (2022), empirically examined the relationship
between cryptocurrency adoption, corruption, and financial controls through
cross-country regression analysis. Their results indicate that higher levels of
cryptocurrency adoption are associated with higher corruption and more restrictive capital controls. Their study also highlights that the pseudonymous nature of

## Page 40

240

Digital Finance (2025) 7:201–254

cryptocurrencies may facilitate illicit activities such as money laundering. The
authors conclude that to manage the risks associated with cryptocurrencies, it is
needed to implement robust KYC procedures as part of the regulatory framework.
3. CeFi: higher CeFi trading shows a negative relationship with AML effectiveness in the FATF and Organised Crime models. The increasing influence of CeFi
presents challenges for AML enforcement. This supports our hypothesis 10. Thus,
despite global efforts to combat illicit activities in the CeFi space, regulation still
needs to be strengthened.
A case-based empirical study built on court cases by Leuprecht et al. (2023)
also confirms the role of CeFi exchanges in facilitating money laundering, particularly in the placement and layering stages. Weak AML enforcement allows
illicit funds to flow through these platforms, despite regulatory measures.
Furthermore, the study by Carpentier-Desjardins et al. (2025) examined 1153
crime events in the crypto industry from 2017 to 2022. Their empirical findings
detected that the industry suffered a minimum loss of $30 billion, with two-thirds
of the losses attributed to CeFi and one-third to DeFi. Hence, the paper suggests
that CeFi remains a significant channel for financial crime, meaning CeFi still
poses AML risks.
4. CBDC technology providers: the FATF model shows that the FATF Score is
lower in countries with a local CBDC provider, suggesting weaker AML effectiveness. While hypothesis 4 did not explicitly predict such a relationship, the result
indicates that local providers may not align well with international AML standards.
No significant impact is observed on the Basel Index and Organised Crime Index.
Countries with local CBDC providers show lower FATF scores but not necessarily lower Basel or Organised Crime AML Index scores, likely due to FATF’s
stricter focus on technical compliance and enforcement. Many of these countries
are at different stages of economic development, affecting their capacity to implement AML rules related to CBDC.
While we could not find explicitly empirical support for this finding, the paper
by DiGiammara et al. (2023) followed our intuition in hypothesis 4. Namely, they
also emphasised how central banks select tech providers. For example, the Central
Bank of the Bahamas chose NZIA Ltd. for its Sand Dollar project due to its interoperability, transaction monitoring, KYC requirements and multi-factor authentication. Similarly, the Eastern Caribbean CBDC adopted IBM Hyperledger Fabric for its secure and scalable blockchain platform. These cases demonstrate that
central banks select technology providers strategically to align with regulatory
compliance.
An IMF Fintech Note by Soderberg et al. (2022) discusses how central banks
select CBDC technology providers in accordance with regulatory objectives, including AML. While the report does not classify providers as local or international, it
introduces an alternative classification: (1) the main contractor model, where central
banks collaborate with a single technology provider (e.g. the Bahamas with NZIA,
ECCB with Bitt, Sweden with Accenture), and (2) the internal development with

## Page 41

Digital Finance (2025) 7:201–254

241

multiple contractors model, where central banks keep greater control by managing
different technological components in-house (e.g. Canada and China).
Another IMF Fintech Note by Tourpe et al. (2023) also discusses the importance
of selecting CBDC technology providers in alignment with central banks’ regulatory goals. Similarly, it examines the choice between acquiring technology solutions
from external vendors or developing them internally. The report highlights that central banks must ensure that collaboration with technology partners does not compromise their regulatory objectives.
5. GDP: GDP per capita appeared as a strong predictor of AML effectiveness
among countries adopting CBDC. It implies that wealthier countries have more
robust AML frameworks, with a positive and significant impact across all models.
This variable was selected intuitively, as it was not addressed in the literature review.
While not focussed on CBDCs, Šikman and Grujić (2021) find that higher GDP
per capita is associated with greater AML effectiveness, as indicated by a moderate
correlation between GDP per capita and the Anti-Money Laundering Index (AMLI).
Ofoeda et al. (2022) analysed AML regulations and economic growth across 165
countries. They found that stronger AML frameworks correlate with higher GDP
per capita, however, till a threshold point. Below a certain level of AML regulation,
economic development promotes growth, but beyond that threshold, excessive AML
regulations slows it down. Their findings also indicate that developed countries,
with higher GDP per capita, tend to enforce more efficient AML regulations.
Interestingly, Matsui and Perez (2021) apply machine learning techniques to identify key drivers of CBDC adoption, finding that GDP per capita, alongside financial
development and institutional quality, is one of the strongest predictors of CBDC
adoption.
The highest number of observations for most of the estimated models in our
research was 36. The limited data had implications for statistical significance for
some variables. Hence, there was not enough statistical support for all the hypotheses of these affected variables, though the direction of some of the coefficients of
these variables was expected. See the explanations below.
5.2 Unconfirmed hypotheses
Here, we present the hypotheses that we could not confirm in our study due to the
statistically insignificant results we obtained, along with some empirical evidence
from related articles, briefly summarised.
H1 The enhancement of financial inclusion through CBDCs improves AML effectiveness, as they can be a more trustworthy payment option.
A cross-country regression analysis of 175 countries by Auer et al. (2020) found
that financial inclusion drives retail CBDC adoption, especially in economies with
large informal sectors. Regression analysis shows a statistically significant negative correlation between account ownership rates and the likelihood of a country

## Page 42

242

Digital Finance (2025) 7:201–254

developing a CBDC. However, the study does not measure whether CBDC-driven
financial inclusion improves AML effectiveness, it only assesses whether financial
inclusion is a driver of CBDC adoption.
Maryaningsih et al. (2022) also tested a probit model across 169 countries.
The results showed that CBDC adoption influences financial inclusion, with retail
CBDCs advancing more in countries with lower financial inclusion and larger informal economies. This supports the argument that CBDCs can serve as an alternative
payment solution, particularly in emerging markets, potentially increasing financial
transparency.
Similar results were obtained by DiGiammara et al. (2023) in a multivariate
cross-sectional model of 65 countries. The results suggest that financial inclusion is
a significant driver of CBDC adoption, particularly in emerging economies.
H2 The reduction of the shadow economy via CBDC adoption enhances AML effectiveness due to higher transparency.
An empirical study utilising the two-sector dynamic stochastic general equilibrium (DSGE) model by Oh and Zhang (2022) discovered that CBDC adoption can
contribute to the reduction of the shadow economy by improving the detection of
informal activities. Thus, the study supports the idea that CBDC helps to formalise
the economy, via strengthening regulatory oversight, mainly by increasing transaction transparency.
H5 The use of DLT in CBDC systems is a key proxy for improving transparency and
regulatory compliance.
By utilising a meta-SWOT analysis, the study by Syarifuddin (2024) came to
the conclusion that a DLT-based ledger system is the optimal choice for CBDCs in
emerging economies due to several factors. He emphasised that DLT helps to protect
against cyberattacks and provide a reliable transaction record.
DiGiammara et al. (2023) obtained the following results for 65 countries they
analysed: 40 countries did not decide, while eleven opted for a mix and seven chose
either a central database or a DLT solution. They also pointed out that jurisdictions
prioritising regulatory control tend to favour centralised databases over DLT.
H6 The type of CBDC (wholesale vs. retail) serves as a proxy for AML effectiveness.
While the study by Auer et al. (2020) does not explicitly address this hypothesis
yet their analysis revealed interesting insights: financial development is positively
correlated with wholesale CBDC projects, while retail CBDCs are more common
where informal economic activity is higher. Hence, this may imply that wholesale
CBDCs are more common in developed countries whereas retail CBDCs in developing countries.

## Page 43

Digital Finance (2025) 7:201–254

243

H7 The structure of CBDCs (token-based vs. account-based) influences AML effectiveness; account-based models are preferred for better monitoring.
As Syarifuddin (2024) indicated in his SWOT analysis, account-based CBDCs
offer greater AML control due to identity verification and traceability. Similarly,
DiGiammara et al. (2023) supports the argument that account-based CBDCs (vs.
token-based) are preferred for regulatory oversight.
Auer et al. (2020) confirm that most CBDC projects analysed favour accountbased models. Specifically, six out of seven retail CBDC projects prefer accountbased access, while two consider both account- and token-based models. However
the study does not test whether their choice is driven by regulatory motives.
H8 CBDC adoption improves AML effectiveness but creates challenges in balancing
privacy with regulatory compliance.
Syarifuddin (2024) defined CBDC’s traceability supporting AML enforcement as
strengths, whereas fully traceable systems which reduce anonymity and lead to privacy concerns as weaknesses. Further analysis highlights that some countries like
Sweden and China are still debating the legal limits of privacy in CBDCs. Overall,
the study finds that traceable CBDCs score higher in the analysis, despite the tradeoffs between privacy and compliance.
The study by Choi et al. (2023) empirically tests the relationship between CBDC
adoption, privacy and regulatory compliance via a randomised online survey experiment with 3,500 + participants in South Korea. The study shows that CBDC adoption increases when privacy is protected. However, since full anonymity is not possible due to AML requirements, it creates a trade-off between privacy and regulatory
enforcement.
The study by Alaminos Pardos et al. (2023) provides empirical evidence on the
relationship between privacy and AML risks in the context of CBDC adoption.
The study supports the hypothesis that CBDC adoption improves AML effectiveness but presents challenges in balancing privacy with regulatory compliance. Their
analysis of 78 countries finds a weak positive correlation between financial privacy
(measured via the Banking Secrecy Index) and AML risks (measured via the Basel
AML Index). This result challenges the ECB’s perspective that reduced privacy lowers AML risks. While low-privacy environments were moderately associated with
reduced risks, high-privacy jurisdictions did not show a significant link to higher
AML risks.
H9 Greater privacy in CBDCs negatively impacts AML effectiveness.
Syarifuddin (2024) identified traceable CBDC as a strength in the AML context,
while fully anonymous CBDC were recognised as a weakness given lack of traceability. The study concluded that fully anonymous CBDCs therefore present greater
challenges for AML enforcement.

## Page 44

244

Digital Finance (2025) 7:201–254

Gross et al. (2021) tests a privacy-preserving CBDC model, however, the interviewed experts raised concerns about AML effectiveness. Specifically, regulators
argued that full privacy complicates tracing illicit funds: e.g. criminals can bypass
such AML controls as transaction limits by using multiple private accounts from
black markets. Law enforcement experts also agreed that unlinkable transactions
would make investigations more challenging.
The findings by Choi et al. (2023) also indicate that survey participants prefer
CBDCs with greater privacy protections, particularly when making privacy-sensitive
purchases (e.g. healthcare). Moreover, anonymity vouchers significantly increase
CBDC adoption. However, the study acknowledges the importance of balancing privacy with regulatory compliance especially in regards with transaction traceability.
A study by Gupta et al. (2023) assessed the impact of risks and benefits on trust
and willingness to adopt CBDCs using a structural equation modelling (SEM).
Their analysis, conducted in India, reveals that financial, regulatory, and security
risks along with privacy concerns significantly reduce both trust and willingness to
adopt the digital rupee. Conversely, awareness and ease of use positively influence
adoption intentions.
H11 DeFi negatively impacts AML effectiveness due to the absence of AML/KYC,
anonymity, and cross-border accessibility.
The peer-reviewed empirical research on the use of DeFi specifically in money
laundering is limited, however private blockchain analytic firms like Chainalysis
usually publish statistics on how it is exploited in illicit activities. Nowadays the
money laundering schemes in DeFi could be traced even with open source tools.
Specifically, the research by Trozze et al. (2023) identifies various fraudulent techniques involving money laundering methods like blockchain mixers and blockchain
bridges. The study uses open-source investigative tools, such as Breadcrumbs,
Etherscan, and blockchain explorers, to trace funds and identify scammer-controlled
addresses in 5 ERC-20 tokens. Empirical evidence was provided through on-chain
data, linking fraudulent activities to illicit transactions through the manual analysis
of thousands of individual transactions. While the research does not directly quantify a negative correlation between DeFi and AML effectiveness, it provides evidence on how DeFi is used as a channel for illicit activities.
H13 The introduction of CBDCs with built-in AML compliance mechanisms
enhances AML effectiveness.
The study by Le et al. (2023) examines CBDC adoption across 55 countries from
2014 to 2021. The regression results indicate that countries with greater risks of
money laundering tend to progress more quickly through CBDC stages, particularly from research to proof of concept and launched. Financial development, inflation control, and technological factors also influence adoption, with more advanced
financial infrastructure linked to quicker CBDC implementation. These findings

## Page 45

Digital Finance (2025) 7:201–254

245

support the idea that CBDCs can help address AML challenges, especially in countries with higher financial crime risks.
While empirical analysis between CBDC and AML is limited, some articles
addressed the relationship between the broader regulatory environment and CBDC
adoption.
The SEM study of 67 countries by Mohammed et al. (2023) found a significant
negative relationship between regulatory quality and CBDC adoption, suggesting
that countries with weaker regulatory quality are more likely to adopt CBDC to
address financial crime and corruption. While the study does not directly test AML
strength, its findings suggest that weaker regulatory environments may drive CBDC
adoption to improve financial transparency.
By contrast, a study by Alfar et al. (2023) empirically analysed CBDC and various factors influencing their adoption in a sample of countries between 2013 and
2021. The results showed that regulatory quality and CBDC adoption have a positive relationship, suggesting that countries with stronger regulatory environments
are more likely to be in advanced stages of CBDC issuance. Since the findings are
contradictory, further research in this direction is needed.
Given the research question was not tested empirically before, except by one
paper partially in line with our research (Vu et al., 2024), it is difficult to estimate
whether the obtained results are consistent with the current literature. Empirical
research on the “CBDC and AML” topic is from a computer science (cryptography)
angle, so it is focussed on simulations and design development. However, regression
results by Vu et al. (2024) find that CBDC adoption significantly reduces money
laundering by increasing transparency and reducing reliance on anonymous transactions. They highlight that government expenditure and domestic savings strengthen
AML frameworks, a result partially consistent with GDP per capita’s significance in
relation to AML effectiveness across all models in our research.

6 Conclusion and policy implications
Overall, these findings highlight how the nature of cryptocurrencies and the level of
their regulation influence AML effectiveness. This research focussed on the potential impact of CBDCs on AML, inspired by the risks associated with cryptocurrencies. Given the early stage of CBDC adoption and circulation, the lack of consistent,
quantified data poses challenges for data collection.
Among the binary proxies derived from CBDC trackers, the only statistically significant variable was the CBDC technology provider (local or international). This
suggests that international CBDC providers may better align with global AML laws.
The core idea of our research is that carefully designed and regulated CBDCs with
built-in AML features have the potential to enhance AML effectiveness across jurisdictions, since they can be more trustworthy than cryptocurrencies, if they balance
privacy. According to our empirical results, for cryptocurrencies the focus should be
on strong AML regulatory frameworks rather than bans, as well as regulatory jurisdictional harmonisation. While empirical research in this field is limited, this study

## Page 46

246

Digital Finance (2025) 7:201–254

contributes by introducing a new perspective on the relationship between CBDC
adoption and AML effectiveness.
Moreover, this research leads to several key policy recommendations focussing
on CBDC design and its impact on AML effectiveness.
First, CBDC systems must comply with international AML standards: including CDD, transaction monitoring, and reporting suspicious activities (Bossu e al.,
2020). A risk-based approach should be adopted where simplified due diligence is
applied to low-risk transactions to promote financial inclusion, while EDD should
be enforced for high-risk transactions (IMF, 2023).
IMF (2024) highlights that adopting a privacy by design approach which integrates
PETs from the beginning, safeguards user data while allowing for varying levels of privacy based on transaction size and risk levels. Additionally, automated AML measures
can improve AML efficiency (IMF, 2023). Robust institutional and legal frameworks
must be established to ensure that data access is limited to necessary cases, such as law
enforcement investigations. Furthermore, international coordination is crucial especially for cross-border CBDCs, with harmonised AML frameworks across jurisdictions
(IMF, 2024).
Policymakers should ensure flexibility in CBDC design to align with local regulatory needs. Here are some examples of how different jurisdictions integrated AML features into their CBDC designs. A risk-based approach to AML where low-value transactions face minimal verification and high-value ones undergo EDD like in e-CNY.
Real-time monitoring, as demonstrated by the Sand Dollar. Intermediaries enforcing
AML measures as seen with JAM-DEX. Simplified KYC processes for unbanked populations like in the eNaira’s tiered wallet system.
However, since CBDC implementation is still in early stages and regulatory frameworks continue to evolve, drawing definitive conclusions is challenging as of now.
Therefore, future studies should address these gaps by utilising more extensive datasets
and enhancing methodologies. Our empirical analysis has several limitations dictated
by the data availability so the following is suggested:
1. CBDC adoption and broader data: as more countries adopt CBDCs, larger datasets
will become available. Currently, the limited CBDC adoption provides insufficient data for comprehensive assessments. Future research should utilise these
expanded datasets, as more observations become available.
2. Design features of CBDCs: literature emphasises the importance of technical
aspects in CBDC design, including (1) consensus mechanisms (PBFT, etc.), (2)
tier systems (e.g. one-tier or two-tier), (3) the use of PETs to prevent illicit activities. In this study, binary proxy variables were obtained from CBDC trackers for
time efficiency, but future research could collect detailed information on these
technical characteristics from white papers or central bank announcements. Those
characteristics can also be converted into binary variables for analysis.
3. Shock regression panel analysis: future research could apply a shock regression
panel analysis in line with the stated research question. Since 2021 is the median
year for CBDC announcements, dividing datasets into pre- and post-CBDC periods. However, the lack of cryptocurrency adoption and ownership data by country before 2021 complicates this approach.

## Page 47

Digital Finance (2025) 7:201–254

247

Author contributions A.G. conducted the analysis, and wrote the manuscript. M.F. reviewed and
approved the final version of the manuscript.
Data availability No datasets were generated or analysed during the current study.

Declarations
Conflict of interest The authors declare no competing interests.

References
Abramova, S., Böhme, R., Elsinger, H., Stix, H. and Summer, M. (2022). What can CBDC designers
learn from asking potential users? Results from a survey of Austrian residents. Working Paper No.
241, Oesterreichische Nationalbank (OeNB). https://​hdl.​handle.​net/​10419/​264833
Ahiabenu, K. (2022). A comparative study of the design frameworks of the Ghanaian and Nigerian central banks’ digital currencies (CBDC). FinTech, 1(3), 235–249. https://​doi.​org/​10.​3390/​finte​ch103​
0019
Alaminos Pardos, P., Andreu Smart, E., & Martret Jané, P. (2023). The impact of the introduction of central bank digital currencies (CBDCs) on the welfare of society: A study of the special case of the
digital euro. Bachelor thesis. https://​hdl.​handle.​net/​10230/​58982
Alfar, A. J. K., Kumpamool, C., Nguyen, D. T. K., & Ahmed, R. (2023). The determinants of issuing central bank digital currencies. Research in International Business and Finance, 64, 101884. https://​
doi.​org/​10.​1016/j.​ribaf.​2023.​101884
Allen, S., Čapkun, S., Eyal, I., Fanti, G., Ford, B.A., Grimmelmann, J., Juels, A. and Kostiainen, K.
et al. (2020). Design choices for central bank digital currency: policy and technical considerations. Working Paper No. 27634, National Bureau of Economic Research, https://​doi.​org/​10.​3386/​
w27634
Alnasaa, M., Gueorguiev, N., Honda, J., Imamoglu, E., Mauro, P., Primus, K., and Rozhkov, D. (2022).
Crypto, corruption, and capital controls: Cross-country correlations (IMF Working Paper No.
WP/22/60). International Monetary Fund. https://​doi.​org/​10.​5089/​97984​00204​005.​001
Animashaun, S. (2022). Platformisation of finance: DeFi’s gradual disintermediation effect and the leveraging of CBDCs in smart supervision. City University of Hong Kong Law Review (Forthcoming
2023), University of Hong Kong Faculty of Law Research Paper No. 2022/33. SSRN. https://​doi.​
org/​10.​2139/​ssrn.​41356​21
Aquilina, M., Frost, J., & Schrimpf, A. (2023). Tackling the risks in crypto: Choosing among bans, containment, and regulation. Journal of International Economics, 202, 101286. https://​doi.​org/​10.​
1016/j.​jjie.​2023.​101286
Arora, R., Du, H., Kazmi, R. A., and Le, D.-P. (2025). Privacy-enhancing technologies for CBDC solutions. Bank of Canada Staff Discussion Paper, No. 2025–1. Bank of Canada. https://​doi.​org/​10.​
34989/​sdp-​2025-1
Atlantic Council. CBDC tracker: monitoring the progress of central bank digital currencies. www.​atlan​
ticco​uncil.​org/​cbdct​racker (accessed 19 December 2024).
Auer, R., Böhme, R., Clark, J., and Demirag, D. (2023). Mapping the privacy landscape for central bank
digital currencies. ACM Queue. https://​doi.​org/​10.​1145/​35793​16
Auer, R., Cornelli, G., and Frost, J. (2020). Rise of the central bank digital currencies: Drivers,
approaches and technologies (BIS Working Papers No. 880). Bank for International Settlements.
https://​www.​bis.​org/​publ/​work8​80.​htm
Auer, R., Böhme, R. (2020). The technology of retail central bank digital currency. BIS Quarterly
Review, March, pp. 1–16. https://​www.​bis.​org/​publ/​qtrpdf/​r_​qt200​3j.​htm
Baker, C. (2023). Examining the potential of the JAM-DEX® CBDC to improve financial inclusion
in Jamaica. In The Potential of Central Bank Digital Currencies: Opportunities and Challenges
(Chapter 12). University of Bristol. https://​doi.​org/​10.​4018/​979-8-​3693-​5588-6.​ch012
Biancotti, C. (2023). Going native? How crypto technology may help regulators. Computer Law & Security Review, 51, Article No. 105900. https://​doi.​org/​10.​1016/j.​clsr.​2023.​105900

## Page 48

248

Digital Finance (2025) 7:201–254

Boernert, E., Chmiel, J., and Antczak, L. (2023). Preventing health data leaks with federated learning
using NVIDIA FLARE. NVIDIA Developer. Retrieved January 23, 2024, from https://​devel​oper.​
nvidia.​com/​blog/​preve​nting-​health-​data-​leaks-​with-​feder​ated-​learn​ing-​using-​nvidia-​flare/
Bordo, M.D. and Levin, A.T. (2017). Central bank digital currency and the future of monetary policy.
National Bureau of Economic Research, Working Paper No. 23711, https://​doi.​org/​10.​3386/​
w23711
Borri, N., & Shakhnov, K. (2020). Regulation spillovers across cryptocurrency markets. Finance
Research Letters, 36, 101333. https://​doi.​org/​10.​1016/j.​frl.​2019.​101333
Bossu, W., Itatani, M., Margulis, C., Rossi, A.D.P., Weenink, H. and Yoshinaga, A. (2020). Legal aspects
of central bank digital currency: Central bank and monetary law considerations. IMF Working
Paper No. 2020/254, https://​doi.​org/​10.​5089/​97815​13561​622.​001
Broby, D. (2022). Central bank digital currencies: Policy implications. Law and Financial Markets
Review, 16(1–2), 100–115. https://​doi.​org/​10.​1080/​17521​440.​2023.​22092​94
Buterin, V., Illum, J., Nadler, M., Schär, F., & Soleimani, A. (2024). Blockchain privacy and regulatory
compliance: Towards a practical equilibrium. Blockchain: Research and Applications, 5(1), Article
No. 100176. https://​doi.​org/​10.​1016/j.​bcra.​2023.​100176
Carpentier-Desjardins, C., Paquet-Clouston, M., Kitzler, S., & Haslhofer, B. (2025). Mapping the DeFi
crime landscape: An evidence-based picture. Journal of Cybersecurity. https://​doi.​org/​10.​1093/​
cybsec/​tyae0​29
Chainalysis. (2024). Crypto money laundering in 2024: trends and insights. www.​chain​alysis.​com/​blog/​
2024-​crypto-​money-​laund​ering
Cheng, P. (2023). Decoding the rise of central bank digital currency in China: Designs, problems, and prospects. Journal of Banking Regulation, 24(1), 156–170. https://​doi.​org/​10.​1057/​
s41261-​022-​00193-5
Choi, S., Kim, B., Kim, Y.-S., and Kwon, O. (2023). Central bank digital currency and privacy: A randomized survey experiment (BIS Working Paper No. 1147). Bank for International Settlements.
https://​www.​bis.​org/​publ/​work1​147.​htm
Chu, Y., Lee, J., Kim, S., Kim, H., Yoon, Y., & Chung, H. (2022). Review of offline payment function
of CBDC considering security requirements. Applied Sciences, 12, 4488. https://​doi.​org/​10.​3390/​
app12​094488
Claessens, S., Cong, L. W., Moshirian, F., & Park, C.-Y. (2024). Opportunities and challenges associated
with the development of FinTech and Central Bank Digital Currency. Journal of Financial Stability, 73, 101280. https://​doi.​org/​10.​1016/j.​jfs.​2024.​101280
Coelho, R., Fishman, J., and Garcia Ocampo, D. (2021). Supervising cryptoassets for anti-money laundering (FSI Insights No. 31). Bank for International Settlements. https://​www.​bis.​org/​fsi/​publ/​insig​
hts31.​htm
CoinGecko. Cryptocurrency market capitalizations and global charts. www.​coing​ecko.​com/​en/​global-​
charts (accessed 19 December 2024)
CoinGecko and Amase, W. (2023). Where is crypto legal vs illegal, around the world. www.​coing​ecko.​
com/​resea​rch/​publi​catio​ns/​crypto-​legal-​count​ries
Coulter, K-A. (2022). ‘Stop creating private money!’: should the Bank of England introduce a central
bank digital currency to compete with cryptocurrency? A review of the UK Bank of England’s
proposed retail CBDC. https://​doi.​org/​10.​2139/​ssrn.​40780​59.
Cunha, P. R., Melo, P., & Sebastião, H. (2021). From Bitcoin to central bank digital currencies: making
sense of the digital money revolution. Future Internet, 13, Article No. 165. https://​doi.​org/​10.​3390/​
fi130​70165
DiGiammara, C., Omarini, A., Kauffman, R. J., and Kwansoo, K. (2023). Evaluating effects of the payment ecosystem on central bank digital currency adoption and design. In T. X. Bui (Ed.), Proceedings of the 56th Annual Hawaii International Conference on System Sciences (pp. 5313–5322).
Association for Information Systems. 10125/103283
Digital Pound Foundation (2024). CBDC: an opportunity to re-think AML regulations. https://​digit​alpou​
ndfou​ndati​on.​com/​cbdc-​an-​oppor​tunity-​to-​re-​think-​aml-​regul​ations/
Doğan, A., & Bıçakcı, K. (2024). KAIME: Central bank digital currency with realistic and modular privacy. In Proceedings of the 10th International Conference on Information Systems Security and
Privacy (ICISSP 2024) (pp. 672–681). SCITEPRESS – Science and Technology Publications.
https://​doi.​org/​10.​5220/​00123​08600​003648
Dong, N., Pillai, B., Bai, G. and Utting, M. (Eds) (2024), Distributed Ledger Technology: 7th International Symposium, SDLT 2023, Brisbane, QLD, Australia, November 30 – December 1, 2023,

## Page 49

Digital Finance (2025) 7:201–254

249

Revised Selected Papers, Communications in Computer and Information Science, Springer, Heidelberg, https://​doi.​org/​10.​1007/​978-​981-​97-​0006-6
Draganidis, S. (2023). Jurisdictional arbitrage: Combatting an inevitable by-product of cryptoasset regulation. Journal of Financial Regulation and Compliance, 31(2), 170–185. https://​doi.​org/​10.​1108/​
JFRC-​02-​2022-​0013
Dupuis, D., & Gleason, K. (2020). Money laundering with cryptocurrency: Open doors and the regulatory
dialectic. Journal of Financial Crime, 28(1), 60–74. https://​doi.​org/​10.​1108/​JFC-​06-​2020-​0113
Dupuis, D., Gleason, K., & Wang, Z. (2022). Money laundering in a CBDC world: A game of cats and
mice. Journal of Financial Crime, 29(1), 171–184. https://​doi.​org/​10.​1108/​JFC-​02-​2021-​0035
Dwyer, G. P. (2020). Regulation of cryptocurrencies. In S. Corbet (Ed.), Understanding cryptocurrency
fraud. De Gruyter. SSRN. https://​ssrn.​com/​abstr​act=​37793​75
Esoimeme, E. (2023). A critical analysis of the effects of the Central Bank of Nigeria’s digital currency
named eNaira on financial inclusion and AML/CFT measures. GRC & Financial Crime Today,
Issue 3, November, pp. 1–19. https://​doi.​org/​10.​2139/​ssrn.​39213​96
European Securities and Markets Authority. Markets in crypto-assets regulation (MiCA). https://​www.​
esma.​europa.​eu/​esmas-​activ​ities/​digit​al-​f inan​ce-​and-​innov​ation/​marke​ts-​crypto-​assets-​regul​
ation-​mica
Fama, M., Fumagalli, A., & Lucarelli, S. (2019). Cryptocurrencies, monetary policy, and new forms of
monetary sovereignty. International Journal of Political Economy, 48(2), 174–194. https://​doi.​org/​
10.​1080/​08911​916.​2019.​16243​18
Freiman, O. (2024). CBDC governance: programmability, privacy and policies. Digital Policy Hub Working Paper, CIGI Online. https://​www.​cigio​nline.​org/​static/​docum​ents/​DPH-​paper-​Freim​an.​pdf
Genc, H. O., & Takagi, S. (2024). A literature review on the design and implementation of central bank
digital currencies. International Journal of Economic Policy Studies, 18(1), 197–225. https://​doi.​
org/​10.​1007/​s42495-​023-​00125-9
Griffith, T., & Clancey-Shang, D. (2023). Cryptocurrency regulation and market quality. Journal of International Financial Markets, Institutions and Money, 84, 101744. https://​doi.​org/​10.​1016/j.​intfin.​
2023.​101744
Gross, J., Sedlmeir, J., Babel, M., Bechtel, A., & Schellinger, B. (2021). Designing a central bank digital
currency with support for cash-like privacy. SSRN Electronic Journal. https://​doi.​org/​10.​2139/​ssrn.​
38911​21
Guo, S., Kreitem, J., & Moser, T. (2024). DLT options for CBDC. Journal of Central Banking Theory
and Practice, 13(1), 57–88. https://​doi.​org/​10.​2478/​jcbtp-​2024-​0004
Gupta, S., Pandey, D. K., El Ammari, A., & Sahu, G. P. (2023). Do perceived risks and benefits impact
trust and willingness to adopt CBDCs? Research in International Business and Finance, 67,
101993. https://​doi.​org/​10.​1016/j.​ribaf.​2023.​101993
Guseva, Y., Gazi, S. and Eakeley, D. (2024). On the coexistence of stablecoins and central bank digital
currencies, Law and Contemporary Problems, Vol. 87 No. 2, University of Hong Kong Faculty of
Law Research Paper No. 2024/03. https://​ssrn.​com/​abstr​act=​47092​82
Han, X., Yuan, Y., and Wang, F.-Y. (2019). A blockchain-based framework for central bank digital currency. In 2019 IEEE International Conference on Service Operations and Logistics, and Informatics (SOLI). IEEE. https://​doi.​org/​10.​1109/​SOLI4​8380.​2019.​89550​32
He, M., Liang, J., Zhou, J., & Tang, Y. (2023). Reflections on the privacy protection of e-CNY. Academic
Journal of Business & Management. https://​doi.​org/​10.​25236/​AJBM.​2023.​050525
Homoliak, I., Perešíni, M., Holop, P., Handzuš, J. and Casino, F. (2023). CBDC-AquaSphere: interoperable central bank digital currency built on trusted computing and blockchain [arXiv:​2305.​16893].
https://​doi.​org/​10.​48550/​arXiv.​2305.​16893.
International Monetary Fund. (2023). Central bank digital currency: Initial considerations (IMF Policy
Paper No. 2023/052). International Monetary Fund. https://​www.​imf.​org/​en/​Publi​catio​ns/​Policy-​
Papers/​Issues/​2023/​11/​14/​Centr​al-​Bank-​Digit​al-​Curre​ncy-​Initi​al-​Consi​derat​ions-​541466
International Monetary Fund. (2024). Central bank digital currency: Progress and further considerations
(Policy Paper No. 2024/052). International Monetary Fund. https://​doi.​org/​10.​5089/​97984​00293​
252.​007
Kakebayashi, M., Presto, G. P., Yuyama, T., & Matsuo, S. (2023). Policy design of retail central bank
digital currencies: Embedding AML/CFT compliance. SSRN Electronic Journal. https://​doi.​org/​
10.​2139/​ssrn.​43667​78
Kiayias, A., Kohlweiss, M., & Sarencheh, A. (2022). PEReDi: Privacy-enhanced, regulated, and distributed central bank digital currencies. In CCS ’22: Proceedings of the 2022 ACM SIGSAC

## Page 50

250

Digital Finance (2025) 7:201–254

Conference on Computer and Communications Security (pp. 1739–1752). ACM. https://​doi.​org/​10.​
1145/​35486​06.​35607​07
Kiff, J., Alwazir, J., Davidovic, S., Huertas, G., Khan, A., Khiaonarong, T., Malaika, M., Monroe, H.,
Sugimoto, N., Tourpe, H. and Zhou, P. (2020). A survey of research on retail central bank digital
currency. IMF Working Paper WP/20/104. https://​doi.​org/​10.​5089/​97815​13547​787.​001
Killingland, M. and Dahl, L.B. (2018). Central bank digital currencies–fad or the future?: a framework
for country level assessment of central bank digital currencies. http://​hdl.​handle.​net/​11250/​25867​
46
Kosse, A., and Mattei, I. (2023). Making headway – Results of the 2022 BIS survey on central bank digital currencies and crypto (BIS Papers No. 136). Bank for International Settlements. https://​www.​
bis.​org/​publ/​bppdf/​bispa​p136.​htm
Lamberty, R., Kirste, D., Kannengießer, N., & Sunyaev, A. (2024). HybCBDC: A design for central bank
digital currency systems enabling digital cash. IEEE Access. https://​doi.​org/​10.​1109/​ACCESS.​
2024.​34584​51
Le, T., Tran, S. H., Nguyen, D. T., & Ngo, T. (2023). The degrees of central bank digital currency adoption across countries: a preliminary analysis. Economics and Business Letters. https://​doi.​org/​10.​
17811/​ebl.​12.2.​2023.​97-​104
Lee, D.K.C. and Teo, E. (2021). The new money: the utility of cryptocurrencies and the need for a new
monetary policy. In: Kaili, E. and Psarrakis, D. (Eds.), Disintermediation Economics, Springer
Books, Vol. 1 No. 0, pp. 111–172, https://​doi.​org/​10.​2139/​ssrn.​36087​52.
Lee, Y., Son, B., Park, S., Lee, J., & Jang, H. (2021). A survey on security and privacy in blockchainbased central bank digital currencies. Journal of Internet Services and Information Security, 11(3),
16–29. https://​doi.​org/​10.​22667/​JISIS.​2021.​08.​31.​016
Leuprecht, C., Jenkins, C., & Hamilton, R. (2023). Virtual money laundering: Policy implications of the
proliferation in the illicit use of cryptocurrency. Journal of Financial Crime, 30(4), 1036–1054.
https://​doi.​org/​10.​1108/​JFC-​07-​2022-​0161
Li, D., Wong, W. E., Pan, S., Koh, L. S., & Chau, M. (2021). Design principles and best practices of central bank digital currency. International Journal of Performability Engineering, 17(5), 411–421.
https://​doi.​org/​10.​23940/​ijpe.​21.​05.​p1.​411421
Li, Z., Zhang, Y., Wang, Q., et al. (2022). Transactional network analysis and money laundering behavior identification of central bank digital currency of China. Journal of Social Computing, 3(3),
219–230. https://​doi.​org/​10.​23919/​JSC.​2022.​0011
Maryaningsih, N., Nazara, S., Kacaribu, F. N., & Juhro, S. M. (2022). Central bank digital currency:
What factors determine its adoption? Bulletin of Monetary Economics and Banking, 25(1), Article
8. https://​doi.​org/​10.​21098/​bemp.​v25i1.​1979
Matsui, T., and Perez, D. (2021). Data-driven analysis of central bank digital currency (CBDC) projects
drivers. arXiv. https://​doi.​org/​10.​48550/​arXiv.​2102.​11807
Mazzetti, F. (2022). The legal obstacles on the road to central bank digital currency (CBDC): The digital
euro project. SSRN Electronic Journal. https://​doi.​org/​10.​2139/​ssrn.​41761​67
Michalopoulos, P., Olowookere, O., Pocher, N., Sedlmeir, J., Veneris, A. and Puri, P. (2024). Compliance
design options for offline CBDCs: balancing privacy and AML/CFT. In: 2024 IEEE International
Conference on Blockchain and Cryptocurrency (ICBC), IEEE, https://​doi.​org/​10.​2139/​ssrn.​47705​
13.
Mohammed, M. A., De-Pablos-Heredero, C., & Montes Botella, J. L. (2023). Exploring the factors
affecting countries’ adoption of blockchain-enabled central bank digital currencies. Future Internet, 15(10), 321. https://​doi.​org/​10.​3390/​fi151​00321
Mu, Y., & Mu, A. (2022). CBDC: Concepts, benefits, risks, design, and implications. SSRN Electronic
Journal. https://​doi.​org/​10.​2139/​ssrn.​42348​76
Nabilou, H. (2019). How to regulate Bitcoin? Decentralized regulation for a decentralized cryptocurrency. International Journal of Law and Information Technology, 27(3), 266–291. https://​doi.​org/​
10.​2139/​ssrn.​33603​19
OECD. (2022). Lessons from the crypto winter: DeFi versus CeFi. OECD Business and Finance Policy
Papers. https://​doi.​org/​10.​1787/​199ed​f4f-​en

## Page 51

Digital Finance (2025) 7:201–254

251

Ofoeda, I., Agbloyor, E., & Abor, J. Y. (2022). Financial sector development, anti-money laundering
regulations, and economic growth. International Journal of Emerging Markets, 19(1), 191–210.
https://​doi.​org/​10.​1108/​IJOEM-​12-​2021-​1823
Oh, E. Y., & Zhang, S. (2022). Informal economy and central bank digital currency. Economic Inquiry,
60(4), 1520–1539. https://​doi.​org/​10.​1111/​ecin.​13105
Ordekian, M., Becker, I. and Vasek, M. (2024). Shaping cryptocurrency gatekeepers with a regulatory ’trial and error’. In: Essex, A. et al. (Eds.), FC 2023 Workshops, LNCS 13953, pp. 113–132,
https://​doi.​org/​10.​1007/​978-3-​031-​48806-1_8.
Paesano, F. (2019). Regulating cryptocurrencies: Challenges and considerations (Working Paper No.
28). Basel Institute on Governance. https://​doi.​org/​10.​12685/​bigwp.​2019.​28.1-​11
People’s Bank of China, Working Group on E-CNY Research and Development. (2021). Progress of
research & development of E-CNY in China. People’s Bank of China, www.​pbc.​gov.​cn/​en/​36881​
10/​36881​72/​41574​43/​42936​96/​20210​71614​58469​1871.​pdf
Pillai, B. and Sorwar, G. (2024). Central Bank Digital Currency (CBDC): design requirements & challenges. In 2024 IEEE International Conference on Blockchain and Cryptocurrency (ICBC), pp.
1–6, https://​doi.​org/​10.​1109/​ICBC5​9979.​2024.​10634​472.
Pocher, N., Zichichi, M., Merizzi, F., Shafiq, M. Z., and Ferretti, S. (2023). Detecting anomalous cryptocurrency transactions: An AML/CFT application of machine learning-based forensics. arXiv.
https://​arxiv.​org/​abs/​2206.​04803
Pocher, N., & Veneris, A. (2022). Privacy and transparency in CBDCs: A regulation-by-design AML/
CFT scheme. IEEE Transactions on Network and Service Management, 19(2), 1776–1788. https://​
doi.​org/​10.​1109/​TNSM.​2021.​31369​84
Qualitest Group and Rakesh, L. (2023). How to overcome the complexity of central bank digital currency
systems with quality engineering. www.​quali​testg​roup.​com/​insig​hts/​blog/​how-​to-​overc​ome-​the-​
compl​exity-​of-​centr​al-​bank-​digit​al-​curre​ncy-​syste​ms-​with-​quali​ty-​engin​eering/
Ren, Y.-S., Ma, C., & Wang, Y. (2024). A new financial regulatory framework for digital finance: Inspired
by CBDC. Global Finance Journal, 62, 101025. https://​doi.​org/​10.​1016/j.​gfj.​2024.​101025
Ripple. (2023). CBDC: the digital evolution of money. Exploring the transformational opportunities and
challenges of new sovereign monies. https://​ripple.​com/​lp/​cbdcs-​the-​digit​al-​evolu​tion-​of-​money/
Robleh, A. and Narula, N. (2020). Redesigning digital money: What can we learn from a decade of cryptocurrencies?. Digital Currency Initiative, Massachusetts Institute of Technology (MIT).
Schär, F. (2021). Decentralized finance: On blockchain- and smart contract-based financial markets. Federal Reserve Bank of St. Louis Review, 103(2), 153–174. https://​doi.​org/​10.​20955/r.​103.​153-​74
Scharnowski, S. (2024). Dark web traffic, privacy coins, and cryptocurrency trading activity. Finance
Research Letters, 67, 105875. https://​doi.​org/​10.​1016/j.​frl.​2024.​105875
Schumacher, L.V. (2024). Decoding Digital Assets: Distinguishing the Dream from the Dystopia in Stablecoins, Tokenized Deposits, and Central Bank Digital Currencies, illustrated ed., Springer Nature
Switzerland, Cham, ISBN 9783031546006.
Schuler, K., Cloots, A. S., & Schär, F. (2024). On DeFi and on-chain CeFi: How (not) to regulate decentralized finance. Journal of Financial Regulation, 10(2), 213–242. https://​doi.​org/​10.​1093/​jfr/​fjad0​
14
Shirakawa, R., J. B., and Korwatanasakul, U. (2019). Cryptocurrency regulations: Institutions and financial openness (ADBI Working Paper No. 978). Asian Development Bank Institute. https://​www.​
adb.​org/​publi​catio​ns/​crypt​ocurr​ency-​regul​ations-​insti​tutio​ns-​finan​cial-​openn​ess
Sidorenko, E.L., Sheveleva, S.V. and Lykov, A.A. (2021). Legal and economic implications of central
bank digital currencies (CBDC). In Economic Systems in the New Era: Stable Systems in an Unstable World, pp. 496–502, https://​doi.​org/​10.​1007/​978-3-​030-​60929-0_​63.
Siklos, P.L. (2023). Is CBDC Evolutionary or Revolutionary? What Economic History Can Teach Us,
CIGI Papers No. 285, October, Centre for International Governance Innovation. https://​hdl.​handle.​
net/​10419/​299982
Šikman, M. M., & Grujić, M. (2021). Relationship of Anti-Money Laundering Index with GDP, financial
market development, and Human Development Index. NBP: Journal of Criminalistics and Law,
26(1), 21–33. https://​doi.​org/​10.​5937/​nabep​o26-​29725

## Page 52

252

Digital Finance (2025) 7:201–254

Sinno, R. M., Baldock, G., Gleason, K., & Zaher, Z. (2025). The regulatory dialectic and innovation in
service-based money laundering. Journal of Financial Crime, 32(1), 245–254. https://​doi.​org/​10.​
1108/​JFC-​03-​2024-​0110
Soana, G., & de Arruda, T. (2024). Central bank digital currencies and financial integrity: Finding a
new trade-off between privacy and traceability within a changing financial architecture. Journal of
Banking Regulation, 25, 467–486. https://​doi.​org/​10.​1057/​s41261-​024-​00241-2
Soderberg, G., Bechara, M., Bossu, W., Che, N.X., Davidovic, S., Kiff, J., Lukonga, I., Mancini Griffoli,
T., Sun, T. and Yoshinaga, A. (2022). Behind the scenes of central bank digital currency: Emerging
trends, insights, and policy lessons. FinTech Notes No. 2022/004, International Monetary Fund,
https://​doi.​org/​10.​5089/​97984​00201​219.​063.
Swiss Interdepartmental Coordinating Group on Combating Money Laundering and the Financing of
Terrorism (CGMF). (2024), National Risk Assessment (NRA): Risk of money laundering and the
financing of terrorism through crypto assets. Federal Department of Justice and Police (DFJP),
Federal Office of Police (fedpol). https://​www.​sem.​admin.​ch/​fedpol/​en/​home/​krimi​nalit​aet/​geldw​
aesch​erei/​publi​katio​nen.​html
Syarifuddin, F. (2024). Optimal central bank digital currency design for emerging economies. Journal of
Central Banking Law and Institutions, 3(2), 361–392. https://​doi.​org/​10.​21098/​jcli.​v3i2.​194
Syed, M. (2023). The design and deployment of CBDCs on blockchain-based technology. https://​www.​
linke​din.​com/​pulse/​design-​deplo​yment-​cbdcs-​block​chain-​based-​techn​ology-​musta​fa-​syed/
Terták, E., & Kovács, L. (2022). The motives for issuing central bank digital currency and the challenges
of introduction thereof. Public Finance Quarterly, 67(4), 491–505. https://​doi.​org/​10.​35551/​PFQ_​
2022_4_1
Thanh, N. B., Perera, D., Thanh, N. P., Nguyen, T. V. H., Thu, P. T. T., My, L. N. T., Chu, T. T., & Kok,
S. K. (2023). Monetary policy in the age of cryptocurrencies. SSRN Electronic Journal. https://​doi.​
org/​10.​2139/​ssrn.​44074​60
Tomescu, A., Bhat, A., Applebaum, B., Abraham, I., Gueta, G., Pinkas, B., & Yanai, A. (2022). UTT:
Decentralized ecash with accountable privacy. Preprint. https://​ia.​cr/​2022/​452
Tourpe, H., Lannquist, A., & Soderberg, G. (2023). A guide to central bank digital currency product
development: 5P methodology and research and development (IMF Fintech Note). International
Monetary Fund. https://​www.​imf.​org/​en/​Publi​catio​ns/​finte​ch-​notes/​Issues/​2023/​09/​08/A-​Guide-​to-​
Centr​al-​Bank-​Digit​al-​Curre​ncy-​Produ​ct-​Devel​opment-​538496
Tronnier, F. (2021). Privacy in payment in the age of central bank digital currency. In M. Friedewald,
S. Schiffner, & S. Krenn (Eds.), Privacy and Identity Management, IFIP advances in information
and communication technology (Vol. 619, pp. 96–114). Cham: Springer International Publishing.
https://​doi.​org/​10.​1007/​978-3-​030-​72465-8_6
Trozze, A., Davies, T., and Kleinberg, B. (2023). Of degens and defrauders: Using open-source investigative tools to investigate decentralized finance frauds and money laundering (arXiv:​2303.​00810​
v2). https://​doi.​org/​10.​48550/​arXiv.​2303.​00810
Vu, N., Anh, H., Luu, C.M. and Nguyen, P.M. (2024). Can central bank digital currency hinder money
laundering?. https://​ssrn.​com/​abstr​act=​49233​57
Wang, H.-M., & Hsieh, M.-L. (2024). Cryptocurrency is new vogue: A reflection on money laundering
prevention. Security Journal, 37, 25–46. https://​doi.​org/​10.​1057/​s41284-​023-​00366-5
Wang, Q., Fu, S., Chen, S. and Yu, J. (2024). A first dive into OFAC in DeFi space. In: Essex, A. et al. (Eds.),
FC 2023 Workshops, LNCS 13953, pp. 133–140. https://​doi.​org/​10.​1007/​978-3-​031-​48806-1_9.
Wenker, K. (2022). Retail central bank digital currencies (CBDC), disintermediation and financial privacy: The case of the Bahamian Sand Dollar. FinTech, 1(4), 345–361. https://​doi.​org/​10.​3390/​finte​
ch104​0026
Winnowicz, K., Au, C.-D., & Stein, D. (2021). Crypto regulation within the European Union. SSRN.
https://​doi.​org/​10.​2139/​ssrn.​41947​71
World Economic Forum. (2021). Navigating cryptocurrency regulation: An industry perspective on the
insights and tools needed to shape balanced crypto regulation (Community paper). Global Future
Council on Cryptocurrencies. https://​www3.​wefor​um.​org/​docs/​WEF_​Navig​ating_​Crypt​ocurr​
ency_​Regul​ation_​2021.​pdf

## Page 53

Digital Finance (2025) 7:201–254

253

Wronka, C. (2022). Money laundering through cryptocurrencies: Analysis of the phenomenon and appropriate prevention measures. Journal of Money Laundering Control, 25(1), 79–94. https://​doi.​org/​
10.​1108/​JMLC-​02-​2021-​0017
Wüst, K., Kostiainen, K., Delius, N., & Čapkun, S. (2022). Platypus: A central bank digital currency with
unlinkable transactions and privacy-preserving regulation. In Proceedings of the 29th ACM Conference on Computer and Communications Security (CCS 2022). ACM. https://​doi.​org/​10.​1145/​
35486​06.​35606​17
Xiong, X., and Luo, J. (2024). Global trends in cryptocurrency regulation: An overview. arXiv. https://​
doi.​org/​10.​48550/​arXiv.​2404.​15895
Yuyama, T., Katayama, K. and Brigner, P. (2024). Proposal of principles of DeFi disclosure and regulation, in Essex, A. et al. (Eds.), FC 2023 Workshops, LNCS 13953, pp. 141–164, https://​doi.​org/​10.​
1007/​978-3-​031-​48806-1_​10
Zetzsche, D. A., Arner, D. W., & Buckley, R. P. (2020). Decentralized finance. Journal of Financial Regulation, 6(2), 172–203. https://​doi.​org/​10.​1093/​jfr/​fjaa0​10
Zhang, J., Tian, R., Cao, Y., Yuan, X., Yu, Z., Yan, X., & Zhang, X. (2021). A hybrid model for central
bank digital currency based on blockchain. IEEE Access, 9, 59422–59433. https://​doi.​org/​10.​1109/​
ACCESS.​2021.​30710​33
Zhang, T., and Li, Y. (2022). Countermeasures against CBDC financial crimes. In Proceedings of the
2022 4th International Conference on Economic Management and Cultural Industry (ICEMCI
2022). Atlantis Press. https://​doi.​org/​10.​2991/​978-​94-​6463-​098-5_​61
Zhang, Z. W., et al. (2024). Web3 applications security and new security landscape. In K. Huang (Ed.),
Future of business and finance. Cham: Springer Nature Switzerland. https://​doi.​org/​10.​1007/​
978-3-​031-​58002-4_5

Data sources
Atlantic Council. Central bank digital currency (CBDC) tracker. Atlantic Council. Retrieved December
2024, from https://​www.​atlan​ticco​uncil.​org/​cbdct​racker/
Atlantic Council. Crypto regulation tracker. Atlantic Council. Retrieved December 2024, from https://​
www.​atlan​ticco​uncil.​org/​progr​ams/​geoec​onomi​cs-​center/​crypt​oregu​latio​ntrac​ker/
Basel Institute on Governance. Basel AML Index. Global ranking in 2024. Public edition. Basel Institute
on Governance. Retrieved December 2024, from https://​index.​basel​gover​nance.​org/​ranki​ng
CBDC Tracker. Central bank digital currency (CBDC) tracker. CBDC Tracker. Retrieved December
2024, from https://​cbdct​racker.​org/
Chainalysis. (2024b). Crypto crime report 2024. Chainalysis. Retrieved December 2024, from https://​go.​
chain​alysis.​com/​crypto-​crime-​2024.​html
Coinwire. (2024). Crypto trading report, Crypto trading report: Which countries trade crypto the most?
A comprehensive analysis. Retrieved December 2024, from https://​coinw​irez.​com/​crypto-​tradi​
ng-​report-​2024/
FATF. Consolidated assessment ratings. Financial Action Task Force. Retrieved December 19, 2024,
from https://​www.​fatf-​gafi.​org/​conte​nt/​fatf-​gafi/​en/​publi​catio​ns/​Mutua​leval​uatio​ns/​Asses​sment-​ratin​
gs.​html
Global Initiative Against Transnational Organized Crime. Organised crime and anti-money laundering (AML) index. Retrieved December 2024, from https://​ocind​ex.​net/​ranki​ngs/​anti-​money_​laund​
ering?f=​ranki​ngs&​view=​List&​group=​Count​ry&​order=​DESC&​crimi​nality-​range=0%​2C10&​state-​
range=0%​2C10
International Monetary Fund. IMF data mapper. GDP per capita, current US dollars (Ln GDP) [Indicator NGDPDPC]. International Monetary Fund. Retrieved December 2024, from https://​www.​imf.​
org/​exter​nal/​datam​apper/​NGDPD​PC@​WEO/​OEMDC/​ADVEC/​WEOWO​RLD

## Page 54

254

Digital Finance (2025) 7:201–254

Triple A. (2024). Report: The State of Global Cryptocurrency Ownership in 2024. Cryptocurrency ownership data. Triple A. Retrieved December 2024, from https://​www.​triple-​a.​io/​crypt​ocurr​ency-​
owner​ship-​data
World Bank. Global financial inclusion (Global Findex) database. Global Financial Inclusion Account
(% age 15+). World Bank. Retrieved December 2024, from https://​datab​ank.​world​bank.​org/​source/​
global-​finan​cial-​inclu​sion
World Bank. International Telecommunication Union ( ITU ) World Telecommunication/ICT Indicators
Database. Internet users (per capita), total (% of population) [Indicator IT.NET.USER.ZS]. World
Bank. Retrieved December 2024, from https://​data.​world​bank.​org/​indic​ator/​IT.​NET.​USER.​ZS
World Economics. Informal economy sizes by country. Informal economy size as a percentage of GDP.
World Economics. Retrieved December 2024, from https://​www.​world​econo​mics.​com/​Infor​mal-​
Econo​my/
World Population Review. Data privacy laws by country. World Population Review. Retrieved December
2024, from https://​world​popul​ation​review.​com/​count​ry-​ranki​ngs/​data-​priva​cy-​laws-​by-​count​ry
Springer Nature or its licensor (e.g. a society or other partner) holds exclusive rights to this article under
a publishing agreement with the author(s) or other rightsholder(s); author self-archiving of the accepted
manuscript version of this article is solely governed by the terms of such publishing agreement and
applicable law.

Authors and Affiliations
Albina Gaisina1

· Matthias Finger2

* Albina Gaisina
gaisina21@itu.edu.tr
Matthias Finger
finger@itu.edu.tr
1

Graduate School, Istanbul Technical University, Istanbul, Türkiye

2

Department of Economics, Istanbul Technical University, Istanbul, Türkiye
