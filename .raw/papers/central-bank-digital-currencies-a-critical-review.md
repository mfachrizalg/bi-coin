---
source_type: pdf
title: "Central bank digital currencies: A critical review"
original_file: "thesis/reference/Central bank digital currencies: A critical review.pdf"
sha256: "de4ee59de7a680aa9eec6e99aa27f8d6e64189be6324e69f7110be8eafef763b"
page_count: 18
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Central bank digital currencies: A critical review

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

International Review of Financial Analysis 91 (2024) 103031

Contents lists available at ScienceDirect

International Review of Financial Analysis
journal homepage: www.elsevier.com/locate/irfa

Central bank digital currencies: A critical review
Lambis Dionysopoulos ∗, Miriam Marra, Andrew Urquhart
ICMA Centre, Henley Business School, University of Reading, Reading, UK

ARTICLE

INFO

Keywords:
Central bank digital currency
CBDC
Monetary policy
Financial stability
Blockchain

ABSTRACT
This critical literature survey offers a comprehensive understanding of the key aspects and implications of
central bank digital currencies (CBDCs) as a rapidly evolving area of academic and policy research. We review
in depth the key discussion around motivations for the introduction of CBDCs and their design (looking at
options of availability, provision, access, and supporting infrastructure). In addition, we review studies and
arguments laid out on the implications that the introduction of CBDC may have for monetary policy and
financial stability. Finally, we identify sub-areas of CBDC research that need further investigation in future
research.

1. Introduction
The evolution of monetary systems has often been viewed as a
private-sector development (Clower, 1967; Kiyotaki & Wright, 1989,
1993; Menger, 1892), however, the most significant and consequential shifts have been instigated by state responses to extraordinary
events (Goodhart, 1998). Throughout history, states have encouraged
the development of monetary systems in order to support their geopolitical and economic expansion (such as in the cases of the Macedonian Engels, 1980; Graeber, 2014 and British Ingham, 2004 empires);
and the development of central banking and finance to accelerate
and sustain the capitalistic system (Varoufakis, 2013). Furthermore,
large economic and political shocks like the Great Depression of 1929–
39 and the two World Wars (1914–18 and 1939–45) have triggered
modifications to the gold standard monetary system1 (Eichengreen &
Flandreau, 2005).
Likewise, in the most recent times high competition amongst financial players, global upheavals such as the Global Financial Crisis
of 2007–09, and, in the past three years, the COVID19 pandemic and
Russian–Ukrainian conflict in Easter Europe, have intensified the demand for more adaptable monetary and fiscal policies that address contemporary needs while simultaneously mitigating emerging challenges
for the financial system. Those chiefly include increasing digitisation,
declining cash usage, ineffectiveness of monetary policy, and widening

social divisions in the backdrop of proprietary financial solutions, such
as fintech and cryptocurrencies, which threaten national economic
sovereignty.2 Moreover, as the digital economy becomes increasingly
important and reliant on privately owned digital platforms with proprietary and opaque rules – potentially expanding into all-encompassing
metaverses – central banks are preparing for another intervention of
epochal proportions.
Central bank (CB) Digital Currencies, or CBDCs, are a novel form of
digital central bank (CB) money that represent the culmination of state
efforts to manage this digital transition. They are designed to provide
attractive instruments for both wholesale and retail functions, as well
as bolster CBs’ influence and control over the economy through new
monetary, fiscal policy tools and programmable capabilities. As with
past shifts in monetary policy, their introduction may have significant
disintermediating effects on the financial system, such as disintermediating commercial banks and some of the operation of private money
providers. While 86% of CBs are involved in CBDC research, 60% in experiments and 14% in live pilot deployments (BIS, 2021), independent
academic research into this topic is still nascent; thus a comprehensive
understanding of their key aspects and implications remains limited.
Given the intricate nature of the CBDC topic, it is imperative for
a review to critically evaluate the existing body of literature and not
just ‘‘organise’’ it. That is to provide a solid foundation for the ongoing

∗ Corresponding author.

E-mail addresses: c.dionysopoulos@pgr.reading.ac.uk (L. Dionysopoulos), m.marra@icmacentre.ac.uk (M. Marra), a.j.urquhart@icmacentre.ac.uk
(A. Urquhart).
1
The Great Depression resulted in countries abandoning the gold standard in favour of more flexible exchange rate systems. The standard was further disrupted
through various forms of government intervention necessary to finance war efforts during the two World Wars. The gold standard became defunct following World
War II as governments adopted new monetary policies such as fixed or floating exchange rates.
2
As outlined in Section 3.
https://doi.org/10.1016/j.irfa.2023.103031
Received 13 March 2023; Received in revised form 16 October 2023; Accepted 8 November 2023
Available online 10 November 2023
1057-5219/© 2023 The Author(s). Published by Elsevier Inc. This is an open access article under the CC BY license (http://creativecommons.org/licenses/by/4.0/).

## Page 2

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

CBDC debate, highlight the aspects that remain relevant and articulate
why some aspects of the debate may now be obsolete. The critical
approach we follow also helps to identify emerging research pathways
and facilitate future research avenues in this domain.
In addition to be critical, this review also takes an interdisciplinary
approach, encompassing finance, economics, and computer science.
This approach considers macroeconomic and regulatory aspects, both
of which have significantly influenced the CBDC discussions, as well as
it connects the CBDC developments to the dynamics of the cryptocurrency space.
Previous reviews, particularly those developed by CBs,3 as well
as Kiff et al. (2020) primarily present summaries of studies and exploratory experiments, and/or adopt a non-multi-disciplinary approach.
Moreover, the studies of Hoang et al. (2023), Nobanee et al. (2022)
and Tronnier et al. (2020) utilise a systematic method to categorise
existing research on CBDCs but do not evaluate it critically. Overall,
existing literature reviews are exploratory and overlook the critical element while also often not accounting for the broader multi-disciplinary
body of work, thus missing the bigger picture.
In contrast, our work presents a critical, comprehensive, and multidisciplinary examination of the literature, a perspective currently
absent in CBDC literature. Through this, we provide a robust foundation
for the material aspects of the CBDC debate and illuminate emerging
research avenues.
To this end, we organise our discussion into five distinct segments.
Section 2 critically examines key concerns regarding the definition
and categorisation of CBDCs before providing a universal description.
Section 3 delineates arguments for CBDC issuance to further elucidate
the need for their introduction and to pave the way for the subsequent
discussion on their design. Section 4 explores the CBDC design space
and options. Section 5 addresses key monetary and macroprudential considerations. Finally, Section 6 details arguments against CBDC
issuance.
These sections are interconnected and vital in achieving a critical
examination and robust foundation for the debate and the emerging
research on CBDC. In fact, they critically examine what CBDCs can be
and can achieve, why we may need them, how we can design them and
then – depending on the design choices – what the main implications
and the arguments in favour and against adopting them are.
In Section 2, we provide a more flexible and universal definition
than the definitions provided in the extant literature reviews. Our
definition is a result of a critical scrutiny of the CBDC literature
and seeks to include all possible variations of CBDCs, by anchoring
them to our contemporary understanding of traditional money and
more innovative digital monies. We particularly emphasise the difference between centralised CBDC and decentralised cryptocurrencies, the
most prominent ones being Bitcoin and Ethereum, and pinpoint also
potential weaknesses in the typical money-categorisation.
We then elucidate the need for CBDCs and outline the primary
motivations behind their introduction in Section 3. To the best of our
knowledge, we are the first to clearly relate the CBDC developments
with specific events transpiring in the economy. This requires a critical
review of a substantial corpus of literature, primarily the one developed
by Central Banks around the world.
The debate surrounding the potential usefulness of CBDCs also sets
the stage for a discussion on their possible designs, which are examined
in Section 4. Using an interdisciplinary approach, we draw insights
from computer science and the literature focusing on financial stability

and monetary policy to critically assess drivers and implications of each
design choice. These insights are then further expanded in Section 5.
Considering the discussion developed in the earlier sections around
the CBDC definition and design, and its monetary and financial implications, Section 6 concludes the review by evaluating whether CBDCs
are apt tools for achieving their proposed goals. In this context, we
critically assess a subset of ‘contrarian’ literature not much highlighted
in any of the referenced reviews.
2. Defining CBDCs
Most literature defines CBDCs narrowly, for instance, many CBs
focus on their retail and consumer-facing aspects, as outlined in a
joint report by seven central banks4 and the BIS in which CBDCs are
defined as ‘‘a digital payment instrument, denominated in the national
unit of account, that is a direct liability of the CB’’ (Group of Central
Banks, 2020). This notion is echoed in individual reports such as those
from the Bank of England (BoE), Bank of Canada (BoC), European
CB (ECB), which respectively define CBDCs as ‘‘an electronic form of
CB money that could be used by households and businesses to make
payments and store value’’ (BoE, 2020), ‘‘a digital form of CB money
that can be used for retail payments’’ (Chiu et al., 2019), and ‘‘a CB
liability offered in digital form for use by citizens and businesses for
their retail payments’’ (ECB, 2020). Some other reports emphasise its
advantageous role in facilitating the execution and settlement of crossborder transactions between financial institutions, therefore defining
CBDCs as a strictly wholesale instrument (Group of Central Banks,
2018, 2020).
Such distinctions are not limited to a CBDCs retail or wholesale
functionality. A distinction can also be made between a type of CBDC
that is different from CB reserves and another that pertains to the
expansion of the reserve system to the wider private sector. Indicatively the Committee on Payments and Market Infrastructures (CPMI,
2018) define CBDCs as ‘‘a digital form of CB money that is different
from balances in traditional reserve or settlement accounts’’, a notion that is echoed in others such as Barrdear and Kumhof (2016),
Griffoli et al. (2018), and Kumhof and Noone (2021) that envisage
a remunerated or interest-bearing CBDC, distinct from existing traditional reserves. Kumhof and Noone (2021), also explicitly mention
that ‘‘CBDC and reserves are distinct, and not convertible into each
other’’, and Griffoli et al. (2018) that CBDCs would ‘‘differ from other
forms of money typically issued by central banks: cash and reserve
balances’’. On the other hand, Meaning et al. (2018) define CBDC as
‘‘any electronic, fiat liability of a CB that can be used to settle payments,
or as a store of value’’ noting that CBDC ‘‘already exists in the form of
CB reserves’’. Overall, narrow CBDC definitions reflect the experimental
state of research.
In this thematic survey of CBDC research, we start by providing a
more and universal definition of CDBCs that can include and encompass
the variety of definitions retrieved in the reviewed literature. Similarly
to Kiff et al. (2020) we define CBDC as a digital liability of a CB,
or other competent authority, representing a jurisdiction’s sovereign
currency available to the private sector. In contrast to others, this abstractive definition accommodates the full range of CBDC possibilities.
While a dominant CBDC design may eventually emerge, a more broad
definition would still be preferable as different jurisdictions will adopt
different CBDC options to accommodate their diverse needs and legal
frameworks (BIS, 2021). A CBDC is distinct from other monies in a
number of ways.
The Committee on Payments and Market Infrastructures (CPMI,
2015) was the first to consider CBDCs in the context of different types of

3
See: BoE (2020), Carapella and Flemming (2020), ECB (2020), Fung and
Halaburda (2016), Griffoli et al. (2018), Group of Central Banks (2018, 2020),
Kahn et al. (2019) and Meaning et al. (2018) from the International Monetary
Fund, the Committee on Payments and Market Infrastructures (Bordo & Levin,
2017; CPMI, 2018) from the National Bureau of Economic Research, and Bech
and Garratt (2017) from the Bank of International Settlements (BIS).

4
The Bank of Canada, European Central Bank, Bank of Japan, Sveriges
Riksbank (Central Bank of Sweden), Swiss National Bank, Bank of England,
and the Board of Governors Federal Reserve Systems.

2

## Page 3

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.
Table 1
Money classification.
Feature

Deposits

eMoney

Crypto

P. Metals

Cash

Reserves

CBDC

Medium of exchange
Store of value
Unit of account
Status
Convertibility
Issuer
Access
Availability

✓
✗
✓
D
✓
CM
A
R

✓
✗
✓
D
?
PS
A
W, R, U

✗
✗
✗
D
✗
N/A, PS
T, A
W, R, U

✗
✓
✗
P
✗
N/A
T
W, R, U

✓
✗
✓
P
N/A
CB
T
W, R, U

✗
✓
✗
D
✓
CB
A
W

✓
?
✓
D
?
CB
T, A
W, R, U

Deposits: Funds held an account at a commercial bank by a customer.
eMoney: A digital currency stored electronically and issued by a private sector entity.
Cryptocurrency: A digital form of money upended by a decentralised network utilising cryptography.
P. Metals: Naturally occurring metals, such as gold or silver, that have an economic value.
Cash: Physical currency. Reserves: Money held at central banks Status, P: Physical, D: Digital.
Issuer, CB: Central Bank, CM: Commercial bank, PS: Private sector.
Access, A: Account T: Token.
Availability, W: Wholesale, R: Retail, U: Universal.

money by examining the physical or digital state of money tokens, and
whether their exchange can occur in a peer-to-peer manner, or requires
a financial intermediary. Similarly Bech and Garratt (2017) introduce
their ‘‘money flower’’ model which distinguishes between accessibility, digital or physical state, issuer and ‘‘exchange mechanism’’. Bjerg
(2017) distinguishes between reserves, cash, and commercial bank
money based on parameters such as the issuer, physical or digital
state and wholesale or retail availability. Adrian and Mancini-Griffoli
(2019) propose a ‘‘money tree’’ that classifies B-money, meaning fiat
backed money issued by private actors, eMoney, and I-Money, meaning
commodity-backed eMoney according to ‘‘type’’ (token/account, explored further in 4.3), ‘‘value’’ (convertibility at par/penalties applied),
‘‘backstop’’ (entity where liability originates) and technology (database
versus DLT/blockchain, a form of decentralised record keeping explored in 4.4). Finally, BoE (2020) consider the functions of money
and their convertibility in their money classification. The frameworks
are summarised in Table 1, were we also consider the wholesale, retail,
and universal availability of money. By wholesale availability we mean
money intended for use by appointed (financial) entities usually for
interbank transactions. By retail money, we mean money intended for
use by the wider domestic private sector as a medium of exchange.
Universal money is also available to foreign entities.
Naturally, such categorisations are imperfect. In practice, some
households and individuals use deposits and cash as store of value,
despite high rates of inflation. Similarly, proponents of certain cryptocurrencies would argue that they can serve as a medium of exchange,
store of value or both. Indicatively, such arguments can be made
in the case of Bitcoin which was explicitly devised as a medium of
exchange, or ‘‘peer-to-peer electronic cash’’ (Nakamoto, 2009), and
is even formally recognised as legal tender in countries such as El
Salvador and the Central African Republic (Savage et al., 2022).5 Additionally, its diminishing rate of inflation and fixed maximum supply
support the narrative of bitcoin as ‘‘digital goal’’, ‘‘sound money’’, or
‘‘inflation hedge’’, and ultimately, store of value.6 Ethereum’s ether
(ETH), the second most popular cryptocurrency, has been used as a unit
of account for many online non-fungible token (NFT) marketplaces.
In practice however, cryptocurrencies are, neither good mediums of
exchange, nor good stores of value or units of account; their adoption

for retail payments remains low (Jonker, 2018), roll out as legal tender
problematic (Morris, 2022), and high correlation with other financial
assets does not offer hedging benefits (Klein et al., 2018). Moreover,
in the case of ether, its use as a unit of account can be attributed
to excitement, the relatively niche and self-referential culture of the
NFT space, and the extreme market price volatility of NFTs, making
accurate price quotes unnecessary. There is also a lot of variation in
each category. For instance, cash and deposits can serve as better or
worse stores of value depending on domestic inflation rates, and, if
stablecoins7 are to be considered under cryptocurrencies, those could
better serve as mediums of exchange and units of account, due to their
relative stability.
Finally, it is worth noting that sufficiently decentralised cryptocurrencies, such as Bitcoin and Ethereum, stand in contrast with CBDCs.
‘‘Decentralisation’’ refers to the extent of distribution of authority and
control across a network; so, a higher degree of decentralisation indicates a greater dispersion of control. We elaborate on this argument in
Section 4, but the primary points are crucial here for an understanding
of CBDCs. Decentralised cryptocurrencies rely on open blockchains,
co-governance, and, in some instances, token schemes. For cryptocurrencies, there is still a trade-off between level of scalability and the
degree of decentralisation. A limitation to scalability would likely be
unacceptable for CBDCs as they are intended the whole economy and
even enhance financial inclusion. In addition, decentralisation might
also be an entirely undesirable feature in cases where the CBDC projects
are intended to improve programmability and control of money by
Central Banks in contemporary monetary systems. For these reasons,
the material interconnectedness between digital decentralised and centralised currencies is quite low given they have different purposes and
often of interest to different parties.
3. Motivations for issuing CBDCs
3.1. The three phases of development
Regarding arguments supporting CBDC issuance, we observe that
these are informed and prompted by concurrent macro-economic events
and changing trends in the financial system. Three main developmental
stages can be identified: (𝑖) For much of the decade following the 2008
financial crisis, many CBs had to contend with persistently low inflation
levels; as such, CBDCs were proposed as a potential remedy. (𝑖𝑖)

5
In fact competing narratives around Bitcoin have even resulted in hard
forks (non-backwards compatible changes) of the protocol, such as Bitcoin
Cash.
6
Even Bitcoin’s proponents are divided as to which function it should serve,
resulting in incompatible variations of the protocol. Bitcoin (BTC) and Bitcoin
Cash (BCH) are such example.

7
Stablecoins are cryptocurrencies designed to maintain a more stable
market price, by usually tracking the value of a national currency such as
the USD. They are explored further in Section 3.1.3.

3

## Page 4

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

The emergence of fintech, cryptocurrencies and blockchain technology
prompted discussions regarding a structural reform of the financial system to achieve greater efficiency, cost-savings, transparency and novel
features. (𝑖𝑖𝑖) More recently, the proliferation of foreign and private
money solutions has been seen as a threat to financial sovereignty
leading to CBDCs being promoted as a possible response. In addition
to these reactive developments, many sophisticated arguments have
been put forward that did not directly relate to then current economic
events. Examples include using CBDCs to address declining cash usage,
preserving access to CB money in an increasingly digitised world and
facilitating financial inclusion for all citizens. In the following sections,
we will explore both types of arguments in more detail.

ledger and access methods for money. The authors discuss the trade offs
from the perspective of the CB, the financial system and in particular
commercial banks, and the end-consumer perspective but do not arrive
at conclusive evidence as to what options are ultimately the best. Auer
and Boehme (2020) summarise the main points of this debate and
connect it to contemporary consumer needs.
Yet, as in the case of industrial applications, concurrent practical
experiments suggested that blockchains might not be a good substitute for conventional databases owning to the overheads of consensus
mechanisms (indicatively Chapman et al., 2017 and Chiu & Koeppl,
2017) and that the debate between tokens and accounts as access
methods was ultimately immaterial due to reporting requirements and
the nature of digital transactions that necessarily produce identifiable
‘‘fingerprints’’ (Claussen et al., 2021).
However, as outlined by BIS (2021), the notion of utilising CBDCs
as a potential source of efficiencies was not abandoned, but re-framed
under more pragmatic terms. Barrdear and Kumhof (2016) suggest
that an CBDCs could result in substantial efficiency gains by avoiding
withdrawal and processing fees, a claim also echoed in He et al.
(2017). Andolfatto (2021), Chiu and Wong (2021), and Keister and
Sanches (2021) outline CBDC efficiency benefits in payment systems
whereas Auer et al. (2022) the potential benefits for cross-border
transfers. Group of Central Banks (2020) also suggest that CBDCs can
provide a common method of transfer between proprietary payment
systems, making transactions cheaper and more efficient. This additional payment system can also enhance the resilience in payments
according to the BoE (2020). The same report outlines that the benefits
of efficiency and robustness can be brought to cross-border payments,
although as Auer and Boehme (2020) highlight, such matters are
subject to political considerations. Finally, World Bank (2021) outlines
how CBDCs could facilitate interoperability and standardisation in
cross-border transactions remedying existing frictions such as lengthy
transaction delays costs (due to intermediation), lack of traceability and
transparency, hindering anti-money laundering (AML) and counterterrorist financing (CFT) checks. This exploration reinforces the notion
that the novelty and impact of CBDCs relies chiefly on political and
procedural consideration and the potential expansion of the role of the
CB.

3.1.1. The backdrop of persistent low inflation
Following the 2008 financial crisis, stimulating efforts such as quantitative easing (QE) proved less effective than initially anticipated,
leading to an increase in the size of the financial market and meager
growth in the real economy (Simmons et al., 2021). In the backdrop of
persisting low inflation, proposals for unconventional monetary policy
utilising government electronic money emerged. Indicatively Agarwal
and Kimball (2015), Dyson and Hodgson (2016), and Rogoff (2016)
suggested that ‘‘digital cash’’8 could eliminate the zero lower bound.
By charging negative interest rates (demurrage fee) on government
electronic money, CBs would encourage spending and stimulate the
economy. Naturally, households and firms would be incentivised to
switch the demurrage-charged digital cash for other forms of money,
so limits on convertibility, or the elimination of physical cash altogether would also be necessary. At the same time Agarwal and Kimball
(2015) and Dyson and Hodgson (2016) in particular, have recognised
the fiscal utility of digital cash, especially through the provision of
‘‘helicopter money’’,9 a benefit also recognised by the Group of Central
Banks (2020), especially for identified users. Indicatively, Agarwal and
Kimball (2015) suggest that by paying a high interest on CBDC, CBs
can simultaneously stimulate the economy and increase the supply of
money by instead increasing the value of an interest-bearing CBDC
relative to other monies. This use of government electronic money
for new monetary and fiscal policy techniques remained staple in
CBDC literature since. Hence the first stage in the CBDC evolution was
motivated by the need for expanding the monetary and fiscal policy
toolbox.

3.1.3. The stablecoin and foreign CBDC threat to financial stability and
sovereignty
This second exploratory phase was succeeded by concerns stemming
from the rising competition from private and foreign money.
Decentralised stablecoins are a type of cryptocurrency that seeks
to mitigate volatility by maintaining a stable price against a predetermined target. This target can be a financial asset, real asset, other
cryptocurrency, or a combination thereof, but is most often the US
dollar, due to its status as a global reserve currency and its stability. Stablecoins are important for several reasons, including reducing volatility
in the cryptocurrency market, enabling crypto-holders to maintain
liquidity, providing a blockchain-native unit of account, and enabling
much of the functionability of decentralised finance (DeFi) protocols.11
Additionally, they retain some of the desirable characteristics of nonstablecoin cryptocurrencies, such as censorship resistance, borderless
operation, and decentralised issuance and access. Owing to this utility,
their use12 has increased over the past years.
Yet, stablecoins were also perceived by regulators as a potential
threat to financial stability, even more so than cryptocurrencies, owing
to their positioning as payment instruments. In many cases, they utilise

3.1.2. CBDC and improvements in payment systems
During the mid 2010s blockchain hype which peaked in 2017–
2018, the enterprise sector explored the potential of blockchain for
cost savings and increased efficiency through ledger co-maintenance,
programmability and disintermediation; however these ambitions were
not fully realised due to a range of factors including consensus overhead
costs, technological complexity implementation requirements, lack of
suitability or need for firm control over infrastructure (Bousquette,
2022; Disparte, 2019; Gartner, 2019).
This brief exploration, however, influenced discussions on CBDC
design choices and in particular the use of alternative technologies
for CBDC infrastructure as a source of efficiency, cost effectiveness,
interoperability and novel features. Bech and Garratt (2017) and Raskin
and Yermack (2016), but also later CPMI (2018), Griffoli et al. (2018),
and Kahn et al. (2019), identify of distributed ledger technology
(DLT)/blockchain10 and cryptographically secured tokens as alternative

8
The term CBDC was only popularised in a 2018 report of the same name
by CPMI (2018).
9
A form of fiscal policy where a central bank creates new money and
distributes it directly to the public, typically through government spending,
in order to stimulate the economy.
10
Blockchains are type of DLT with specific features. In their analysis,
CBs, utilise the term DLT to distance their offering from cryptocurrencies.
Blockchain and DLT are analysed further in Section 4.4. For the purposes of
the present we will use the terms interchangeably.

11
DeFi applications blockchain-based and decentralised alternatives to traditional financial applications, such as borrowing, lending, derivatives, and
insurance.
12
The total stablecoin market capitalisation reached a peak of approximately
$200 billion in April of 2022 according to defillama.com.

4

## Page 5

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

unproven stability mechanisms which often fail13 negatively affecting
(i) financial entities with stablecoin exposure, (ii) individual investors
and financial markets, (iii) investor confidence in cryptocurrencies,
and (iv) their use as payment instruments, according to the Financial
Stability Board (FSB, 2022). The G7 has expressed additional concerns
which include issues with stablecoin governance, cyber risks, market
integrity and pricing, tax compliance, as well as data, consumer and
investor protection. For stablecoins that achieve global scale, they also
cite potential concerns for financial stability (similar to those of the
FSB), and the implementation and efficacy of monetary policy (G7,
2019). Moreover, due to the market dominance of certain stablecoins,
such as Tether’s USDT, their potential failure has also been perceived as
a potential systemic risk for the financial system, and for the financial
sector exposed in such assets, leading to direct regulatory intervention (Browne, 2021). Due to their substitutability with stablecoins, the
introduction of CBDC was seen as a way to mitigate the negative effects
described above.
Despite their popularity, stablecoins fall short as a means of payment due to throughput limitations of blockchain, transaction costs,
and redemption limitations (Adachi et al., 2022). Moreover an argument can be made that they lack the institutional backing to facilitate
adoption and integration with existing payment systems and procedures. Those issues were to be mitigated by global private stablecoins.
Global private stablecoins were an attempt by established big tech
and big finance players to capture parts of the monetary system by
leveraging their dominant position. Perhaps the most popular was
Facebook’s (now Meta) Libra (later Diem). Diem was a ‘‘blockchainbacked’’14 financial network that aimed to enable ‘‘open, instant, and
low-cost movement of money’’ and universal access to related financial
services. While its economic design became notably less ambitious
owing to regulatory pressure, at one point Diem was to be backed by
a ‘‘basket’’ of currencies, financial and real assets creating a private
‘‘super-currency’’15 to be used across the platforms of Meta and its
partners (Amsden et al., 2020). Putting things into perspective, if each
of Facebook’s active monthly users held 3 units of Diem, then it would
become more widely used than the United States Dollar.16 In the
prospect of Diem’s destabilisation of the global financial system and
hindrance of CB influence on monetary policy (Diez de los Rios & Zhu,
2020), regulatory response was stern (Zetzsche et al., 2019) leading to
the scaling down and ultimately abandonment of Diem (Levey, 2022)
and of other similar efforts.17
In parallel to Meta’s announcement of Diem, China became the first
major economy to successfully test CBDCs on a large scale (Areddy,
2021). Earlier, the Bahamas had become the first country to launch
a CBDC, the Sand Dollar, followed by Nigeria’s eNaira, and Jamaica’s
JAM-DEX. Concurrently, Saudi Arabia, the United Arab Emirates,
Canada, France, Singapore, Tunisia, and the Eastern Caribbean Economic and Currency Union launched pilot CBDCs.18 CBDCs research
was also expanding virtually everywhere (BIS, 2021), leading to concerns about financial sovereignty.
In particular, Yeyati (2021) highlights the prospect of digital dollarisation stemming from potential easy access to foreign CBDCs, and
counter-propose a domestic CBDC issuance to mitigate it. Andolfatto
(2021) expands this argument by suggesting that a domestic CBDC

would reduce consumer incentives to adopt foreign and private monies
and thus safeguard financial sovereignty, by ensuring that the national
currency continues to be perceived as financially secure, and competitive in terms of features. Besides safeguarding against foreign CBDCs
and private moneys, Ferrari Minesso et al. (2022) offer an additional
explanation for the fast pace of CBDC development. They suggest that
potential imbalances in the international monetary system stemming
from a lack of monetary policy autonomy as a result of CBDC introduction explain why issuing a CBDC quickly could provide a significant
competitive edge. Yet (Chorzempa, 2021) notes that such advantage
might be short lived due to changes in technology and markets.
Competing monies pose additional concerns that a CBDC can protect
against. As highlighted by BoE (2019, 2020) and CPMI (2018) those
may neither offer the same level of safety and confidence as existing
payment systems nor be subject to the same protections and guarantees
as deposits or cash. Additionally, CBDCs can counteract the potential
for private payment systems to become natural monopolies, thereby
reducing market dominance and concentration risk (Group of Central
Banks, 2020; Kiff et al., 2020). On the contrary, a ‘‘well-designed’’
CBDC can facilitate healthy competition between private payment service providers (BoE, 2020). Finally, CBDCs can mitigate the impact of
exclusions and bans from global financial systems and standards such
as SWIFT, as was recently the case with Russia (BBC, 2022).
3.2. Additional sophisticated arguments for CBDC issuance
3.2.1. Declining use of cash and financial inclusion
Surveys in Canada (Henry et al., 2018), the United States (Foster
& Greene, 2021), Europe (ECB, 2022), the UK (BoE, 2022), and in
particular Sweden (Sveriges Riksbank, 2018), demonstrate a diminishing usage of cash, in comparison to other forms of payment owing
to a collection of factors which include shifting consumer preferences,
increasing digitisation, and the knock on effects of COVID-19. This has
two important implications. First, absent a CBDC and by choosing not
to use cash, consumers no longer have access to the CB balance sheet
and have to instead rely completely on the private sector money. Second, if cash is gradually phased out, financial inclusion will be impacted
significantly (CPMI, 2018). Commercial banks and other financial intermediaries that provide the main substitute for cash, i.e., deposits and
eMoney, are incentivised, as for-profit institutions, to only extend their
services to countries, communities, or individuals if they can generate
a profit. This could leave underprivileged groups at risk, particularly
in countries with underdeveloped financial systems and low financial
penetration where commercial banks may be financially constrained.
This presents a compelling case for a CBDC to serve as a medium of
exchange and store of value to combat financial exclusion (BIS, 2021;
Bordo & Levin, 2017; Camera, 2017; Group of Central Banks, 2020).
Additionally, CBDCs can also help CBs recoup seigniorage revenue lost
from the declining cash usage (Kahn et al., 2019).
3.2.2. Privacy in payments
Despite its declining usage, cash remains an important instrument
for preserving privacy in payments due to its anonymous nature (Kahn
& Roberds, 2009). If cash use diminishes, or it is discontinued in
favour of alternative public or private solutions, consumers will demand a private alternative. In fact, research suggests that this is one
of the driving rational for CBDCs (ECB, 2021). The lack of privacy
in payments can hinder consumer welfare, for instance, Garratt and
Lee (2022) demonstrate that payment data collection techniques from
private actors can contribute to the establishment of monopolies. Here
the role of the CB as the CBDC issuer is particularly important, since it
can, as a not-for-profit organisation, commit to the non-exploitation of
user data for commercial purposes.
Gross et al. (2021) showcase how CBDCs with cash-like privacy
can be achieved through zero-knowledge proofs, whereas BoE (2020)
and Claussen et al. (2021) deem the possibility of entirely anonymous

13

A recent example was that of UST (Dionysopoulos, 2022).
It is unclear whether Diem’s infrastructure would be classified as a
blockchain, or whether the term was used to benefit from the publicity
surrounding decentralised blockchains.
15
A currency used globally and backed by a basket of reserve currencies
and assets.
16
Author’s calculations based on Facebook monthly users from Meta Q3
2022 Earnings Slides, page 14 (Meta, 2022) and Claims in U.S. dollars, in
December 2022 from COFER (data.imf.org).
17
JPM Coin by JP Morgan was another such attempt.
18
More information available at cbdctracker.org.
14

5

## Page 6

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

or private CBDCs unlikely, citing that digital transactions produce ‘‘digital fingerprints’’ that, given enough time and resources, can be traced
back to parties involved in the transaction, among other regulatory
and political considerations. In practice, complete anonymity is hard
to achieve even in cases where a payment instrument is specifically
devised with anonymity in mind and utilises state of the art techniques (CipherTrace, 2021). The overarching consensus is that some
level of privacy, and not anonymity from the CBDC operator, can
be achieved, thus providing consumers with an alternative to private
sector payments solutions that can be privacy-invasive (Bech & Garratt,
2017; Erlandsson & Guibourg, 2018; Group of Central Banks, 2020).
The concept of ‘‘tiered privacy’’ is also explored, with larger transactions revealing more information about the transacting parties. As
anonymity from the CBDC operator is unlikely, two additional benefits
of CBDC become apparent. Firstly, with sufficient adoption, CBDCs
could positively contribute to limiting or eliminating black markets that
rely on cash. Secondly, as a result of this, they could also lead to an
increase in tax revenues and a reduction in tax evasion, in particular
from the adoption of eMoney by tax evaders or criminals (McAndrews,
2020).
The debate on CBDC privacy and anonymity is still-unfolding with
significant implications in a number of areas. Indicatively, Bordo and
Levin (2017) and Rogoff (2015, 2016) argue that the widespread use of
CBDC, or its introduction as a replacement for cash could also reduce
criminal activity, whereas Wang (2020) shows that a CBDC with cashlike privacy could increase tax evasion. Finally, it should be noted that
due to the centralised nature of the operator and digital-record keeping
a CBDC can be used as a tool for mass surveillance, something that
many CBs are considering and actively designing against (Fanti et al.,
2022; Uberti, 2022), although this could be perceived as a desirable
property in certain regimes.

To summarise, 1 shows that CBs have three distinct options when
it comes to programmable CBDCs. In Model 1 they can achieve programmability and high throughput by sacrificing security, in Model 2,
they can achieve programmability and security by sacrificing throughput, whereas in Model 3 they can abandon the prospect of programmability to maintain security and high transaction throughput.
This trilemma is presented in figure.
Nonetheless programmability in payments and money has significant implications. At a basic payment-level it can facilitate automated
money transfers, for salary, subscription, or other purposes, based on
predetermined rules. It can also bolster the implementation of other
policies such as special taxes or discounts that can be applied when a
unit is spent on a transaction that meets certain criteria. For instance,
money spent on carbon intensive activities could be valued differently
(lower) than money spent on education (valued higher). This can also
influence the implementation of fiscal policy by mitigating moral hazard. For example, programmable money could disallow the spending of
stimulus checks or other benefits on certain products, such as alcohol
or tobacco, or even encourage its spending on essential goods (through
adjusting its value at the point of sale).
At this point, it is worth noting that programmability at the unit
of money is not always desirable. The ECB has announced that such
feature ‘‘is not in line with the guiding principles of the digital euro
endorsed by the Governing Council’’ (Digital Euro Project Team, 2022).
The political economy implications of the above are very large and
would need careful consideration.
4. CBDC design space and options
In this section, we review the current debate surrounding the design
of CBDCs by looking at five main aspects: (𝑖) its nature as a CB liability
(in terms of expanding the existing reserve system or creating a new
form of CB liability); (𝑖𝑖) its availability to end-users (whether wholesale, retail, or universal digital currency); (𝑖𝑖𝑖) its provision through a
direct, indirect, or hybrid system depending on the level of involvement
of private financial intermediaries; (𝑖𝑣) the type of user access to CBDC,
either through accounts or tokens, which relates to an ongoing debate
on privacy issues and transaction traceability; and (𝑣) the needed
infrastructure, i.e. whether blockchain technology can bring effective
improvements in the opted design/system.

3.2.3. Programmability of payments and money
Another argument in favour of CBDC issuance is their facilitating of programmability of money and payments. Programmability in
money refers to programmable functions at the unit level, allowing
(or disallowing) their use or altering their value based on predetermined rules.19 Programmability of payments is an adjacent concept that
refers to payment executions based on predefined conditions. The BoE
(2020) recognises three possible approaches to CBDC programmability,
namely (𝑖) integrating the functionality into the fundamental ledger,
(𝑖𝑖) providing the capability through an additional ‘‘module’’, (𝑖𝑖𝑖) or
‘‘outsourcing’’ it to PSPs. Each option presents different trade offs. For
instance, implementing native programmability to a CBDC would potentially hinder throughput, as more computations would be performed
as part of the payment execution, but presents the safest option as
it does not rely on third parties that have a higher chance of being
compromised than the CB.
Non-native programmability on the other hand presents trade offs
that resemble those of the ‘‘oracle problem’’ in blockchains. Blockchains
are entirely isolated from the outside world and are unable to natively
access data such as a node’s hardware, file system, or other information
feeding through the internet. As a result, for processing real-life data
necessary for some of their functions (for instance, the time, date,
or market prices) they rely on smart contracts called ‘‘oracles’’ which
‘‘feed’’ (and some times pre-process to save computational resources)
real-world information to blockchains. While this increases the functionality and throughput, it comes with the risk of compromised or
inaccurate data sourcing. Programmable CBDCs relying on external
modules or payment service providers (PSPs) for their functionality will
face a similar trade off and need to trust that those sources are reliable
and necessarily compromise on some decentralisation and potentially
even security.

19

4.1. Nature and availability of CBDCs
As implied above, not all CBDCs can be created equal. When it
comes to their particular characteristic and attributes (CPMI, 2018)
highlight that ‘‘it is easier to define a CBDC by highlighting what it
is not’’. With regard to the choice between a CBDC that is distinct from
reserves (nR CBDC), and a one that pertains to the expansion of the
reserve system to the wider private sector (R CBDC), there are compelling reasons to pursue either option. Reserves have a special status
in the monetary system as they are subject to rules and limitations
and serve as settlement asset for interbank transactions. Owing to this,
they also represent the safest form of money in an economy. For that
reason, a reserve CBDC that pertains to their expansion would be very
safe, although not flexible. In contrast, while any CBDC necessarily
leads to the expansion of the CB balance sheet, CBs can back CBDCs
that are distinct from reserves with a different collection of assets,
potentially making them less secure, but more flexible, than reserves.
A non-reserve CBDC could be less safe if backed by more volatile CB
assets, such as more risky financial instruments compared to precious
metals or foreign exchange (Kumhof & Noone, 2021).
Flexibility in non-reserve CBDCs also comes in other forms. As
demonstrated by Kumhof and Noone (2021), remuneration in the case
of a non-reserve CBDC can be independent than that of reserves, leading
to greater flexibility in the conduct of monetary policy. For example,
CBs could keep the rate of reserves low to influence the market interest

This would break the fungibility of money, especially if tied to identity.
6

## Page 7

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

Fig. 1. CBDC programmability trilemma.

rate on interbank loans, while at the same time increasing the CBDC
interest rate to curb CBDC demand. A non-reserve CBDC can pay
positive, negative, or even no interest, without limiting the CBs options.
At the same time, distinguishing CBDC from reserves can allow them
to pursue different design choices, such as infrastructure and access
methods.
Literature also distinguishes between three levels of CBDC availability. Those are, from more to less restrictive, wholesale, retail, and
universal CBDC (-W, -R, -U, CBDC, respectively). Like CB reserves, a
wholesale CBDC would be a liability of the CB and asset of appointed
entities, such as commercial banks or other non-bank financial institutions (NBFIs). By contrast, a retail CBDC would also be available to
the wider domestic private sector, meaning individuals and households.
Finally, a universal CBDC would be the most expanded version, also
available to the foreign sector.
CPMI (2018) were among the first to distinguish between wholesale and retail CBDCs. As the name suggests, wholesale CBDCs would
be devised for wholesale applications between commercial banks, as
well as NBFIs. Retail CBDCs on the other hand would be suited for
retail applications, such as payments and domestic remittances and
money transfers. Finally, a universal CBDC as described by Bjerg (2017)
and Fung and Halaburda (2016) would allow individuals to hold and
transact in different currencies at the retail level.
CPMI (2018) suggest that an interoperable wholesale CBDC could
foster the robustness and efficiency of cross-border settlement of securities and other financial instruments. Their argument has become
popular with policy makers, such as ECB’s president Cristine Lagarde
who stated that ‘‘Digital wholesale money is not new, as banks have
been able to access CB money for decades. But new technology can be
used to make settling financial transactions more efficient. It also opens
the possibility of a retail CBDC, which would be very innovative in that
it would be accessible to a wide audience’’ (Lagarde, 2020).
A wholesale CBDC could enhance payment efficiency, not necessarily due to its technical characteristics,20 but by introducing a clean slate
for wholesale and cross-border functions, allowing for their more efficient design, by reducing red tape and streamlining processes (Carney,
2019).
Notably, literature does not distinguish between a wholesale CBDC
that is distinct from reserves, and a wholesale CBDC that simply pertains to the expansion of the reserve system to other entities. In this
dichotomy, the question is whether having a wholesale CBDC distinct
from existing reserves could be useful. We argue that depending on
its monetary and technological characteristics, a non-reserve wholesale CBDC serve as a fail-safe and can be used alongside reserves

by commercial banks. For example, a wholesale CBDC that utilises a
different infrastructure from reserves could enhance the resilience of
the banking system. CPMI (2018) also highlight that a creditworthy
wholesale CBDC, especially if remunerated, could serve as an appealing
asset for NBFIs and other institutional investors and compete with
financial instruments such as short maturity government bills, with
implication for on commercial banks’ funding.
By contrast, a retail CBDC serving as an instrument for consumerfacing applications could result in an expanded role of the CB in retail
functions and partial or entire disintermediation of commercial banks
depending on its provision and other features. Owing to its retail nature, such CBDC could compete with commercial bank money, leading
to changes in the funding composition of commercial banks, especially
in times of stress (CPMI, 2018).21 However, it could also promote
positive change for households and individuals. Indicatively commercial banks, as for profit institutions, are incentivised to only extend
financial services when they can make a profit. A retail CBDC, issued
by a non-for-profit CB could be particularly important in facilitating
financial inclusion in developing and underdeveloped economies where
the private sector lacks the universal provision of robust payment
services (Kiff et al., 2020).
A reserve retail CBDC would be the safest form of money that could
be made available to the private sector. However, as noted above, it
would come at the expense of monetary policy flexibility, since CBs
would have to consider retail clients when implementing changes to
reserve remuneration and holding requirements. Instead, a non-reserve
retail CBDC, while potentially less secure from a financial standpoint,
could provide a third monetary level (besides holding requirements and
interest) for central banks, while also serving retail functions for the
wider private sector.
A universal CBDC, as described by Bjerg (2017) and Fung and
Halaburda (2016), could enable what (Auer & Boehme, 2020) describe
as ‘‘retail interlinkages’’ for cross-border payments. Currently, digital
transactions in a foreign currency necessarily involve one or more
financial intermediaries who imposes fees and inflated exchange rates.
This process also often leads to delays due to the number of counter
parties involved in the process. With a universal CBDC end consumers
would be able to acquire foreign currency in advance of the transaction
potentially for cheaper, as is currently the case with cash. This advancement would be similar to current fintech and eMoney deployments by
the private sector that allow customers to hold and exchange currencies
in digital wallets. Yet, as a universal CBDC would be a liability of the
CB, it would not be subject to the same counterparty and financial risks
of eMoney and digital wallets.
Depending on its remuneration and issuing authority, a reserve
universal CBDC, could also offer a compelling store of value in certain
international markets and even compete with domestic short term
government bonds and other private sector financial instruments, such
as savings accounts. In times of crisis, universal CBDCs could also
aggravate bank runs, not from deposits to cash as is usually the case,
but from deposits to what is essentially a foreign currency. The same

20
In fact, the benefits of blockchain/DTL for efficiency and robustness have
been refuted mainly (𝑖) due to the probabilistic finality of settlements in
some blockchain/DLT arrangements, meaning that transactions are never fully
settled, but only become increasingly hard (more costly) to reverse as more
blocks (transactions) are added, (𝑖𝑖) the need for centralised notaries that make
the added complexity of DLT redundant, (𝑖𝑖𝑖) and the potential implementation
of coordination mechanisms such as systems for liquidity saving (Chapman
et al., 2017; Chiu & Koeppl, 2017).

21

7

This is explored further in Section 5.

## Page 8

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

could be said for a non-reserve universal CBDC, although those will
likely be less ‘‘safe’’ compared to a reserve counterpart.

sector (Auer & Boehme, 2020; BoE, 2020; ECB, 2020; Group of Central
Banks, 2020). Finally, to support a CBDC (although this is a concern
in every provision method), the CB might be incentivised to engage
in credit provision to support their expanded balance sheet, further
increasing its role and involvement in the financial system.
An indirect CBDC is comparatively a more modest proposal, in
which the private sector (consumers in the case of a retail and universal, and NBFIs in the case of wholesale CBDCs) hold accounts with
commercial banks, which are backed by CBDC held with the CB (Auer &
Boehme, 2020; Bordo & Levin, 2017). This scheme has been described
with various names in literature, such as ‘‘synthetic CBDC’’ (Kumhof &
Noone, 2021), and ‘‘two-tier CBDC’’ for its resemblance to the existing
two-tier financial system. An indirect CBDC presents a number of
possibilities. In what we will call ‘‘strict indirect CBDC’’ a commercial
bank would be required to fully back private sector deposits CBDC held
at the CB. By contrast, in a ‘‘relaxed indirect CBDC’’ model private
sector deposits would be partially backed by CBDC. The non-reserve
versus reserve status of CBDC enters this discussion too. Specifically, in
either the ‘‘strict’’ or ‘‘relaxed’’ indirect CBDC private sector deposits
could be backed by either a CBDC that is distinct from reserves, or
reserves with the CB. In the latter scenario, a CBDC would essentially be
either a reinvention of the existing two tier system, or simply constitute
a stricter version of existing reserve requirements.
In either case, commercial banks would have the same consumerfacing and operational responsibilities as they do today. Due to its
minimally disruptive nature, an indirect CBDC would not translate into
material improvements for the private sector, especially in terms of
protection. For instance, in case of insolvency of the commercial bank,
it is unclear how a CB would honour consumer claims. Deposits up
to a certain amount are already guaranteed in many countries, thus
rendering an indirect CBDC redundant. At the same time, and according
to many definitions including the one in the present, an argument can
be made that such arrangement would not constitute a CBDC in the
first place, as is not a direct liability of the CB and asset of the private
sector (Group of Central Banks, 2020).
Auer and Boehme (2020) also describe a hybrid CBDC arrangement
in which consumer-facing activities are carried out by financial intermediaries, such as payment service providers (PSPs) and commercial
banks, while the CBDC remains a direct claim with the CB. This
approach marries the safety stemming from a direct claim with the CB
with the convenience of the private sector managing consumer-facing
functions. A hybrid arrangement could also implement a ‘‘check pointing’’ system in which the CB would periodically record end-consumer
balances to ensure that claims are honoured in case of technical and
financial failure of a PSP. Other back-up arrangements where the CB
would operate an emergency transaction system can also be envisaged.
Yet, as Auer and Boehme (2020) point out, the downside of a hybrid
approach would be the complexity of its implementation. Most CB are
considering to opt for a hybrid indirect CBDC (Auer et al., 2020).

4.2. Direct, indirect, and hybrid CBDC provision
As outlined in Section 3, in the second exploratory phase of CBDCs
motivated predominately by advances from the cryptocurrency and
blockchain space, CBs and researchers examined alternative CBDC
designs as potential sources of financial safety as well as efficiency
and resilience of the financial system. The exploration revolved around
three key areas: (𝑖) the specifics of CBDC provision and in particular,
the operational role of the central and commercial banks as well as
other financial intermediaries, (𝑖𝑖) the method for accessing CBDCs
and authorising transfers, and finally (𝑖𝑖𝑖) the ledger and process for
recording said transfers and other state transitions. The overarching
academic consensus was that (𝑖) the operational role of the CB influences the financial safety of the CBDC instrument in addition to aspects
of customer experience, (𝑖𝑖) the access method could impact the levels
of privacy and anonymity of CBDC transactions, and finally, (𝑖𝑖𝑖) that a
new novel infrastructure could be a source of efficiency and desirable
features for CBDCs.
Auer and Boehme (2020) focus on a CBDC with retail applications
and map six main consumer needs, to specific CBDC design choices,
forming a Maslow-like hierarchy for payments. In particular they identify the needs for cash-like convenience and peer-to-peer functionality,
resilient and robust operations, universal accessibility and privacy, as
well as the need for cross border payments. A public consultation
conducted by the Eurosystem on the digital euro (EU’s version of a
CBDC) identified privacy, security, lack of fees, availability, ease of
use, and speed as the most important consumer demands (ECB, 2020).
Similar consumer needs are also outlined in a joint report by seven CBs
representative (Group of Central Banks, 2020).
Literature identifies three distinct models, the (𝑖) direct, (𝑖𝑖) indirect,
and (𝑖𝑖𝑖) hybrid, (- -D, - -I, - -H CBDC, respectively). According to Adrian
and Mancini-Griffoli (2019), Auer and Boehme (2020), and Bordo and
Levin (2017), a direct CBDC is a direct liability of the CB and asset of
the private sector. In the case of a wholesale CBDC this would mean
that banks and NBFI would hold a direct liability of the CB. Similarly,
in the case of retail or universal CBDCs, households and individuals
would hold a direct claim with the CB. Under a direct CBDC model the
operational role of the CB would be that of the primary operator of
a CBDCs infrastructure and all of its consumer-facing aspects. Indicatively it would be tasked with acquiring and retaining (wholesale or
retail) clients, performing due diligence, including know-your-customer
(KYC), AML, and CTF checks, or otherwise managing customer data,
transactions and complaints or other inquiries. On the operations side,
it would be charged with developing and managing the technology
necessary for payments and their settlement, as well as other consumer
facing features and applications (Adrian & Mancini-Griffoli, 2019).
The option of a direct CBDC is attractive for its seeming simplicity,
as the private sector holds a secure, direct claim with the CB bank
which is responsible for the entire CBDC’s operation. Yet it incubates
the disintermediation of commercial banks and other financial intermediaries22 (Auer et al., 2022; Carstens, 2022). Such scheme would
entail a large expansion of the CB mandate, the costly building of a
vast infrastructure, and the CB’s need to acquire consumer-focused skill.
Besides the obvious point of cost, this expansion is also tied to concerns
around the willingness and ability of CB to compete with existing and
future private sector deployments, and the crowding out of the private

22

4.3. CBDC access
With regard to access to the CBDC, two methods are currently
debated: the account and the token-based methods. Account CBDCs
rely on ‘‘strong’’ and verifiable identities, whereas token systems on an
individual’s ability to perform a specific action, such as demonstrate
knowledge of a special value (BoE, 2020; Brunnermeier et al., 2019;
Kahn et al., 2019). King (2020) report that among the 46 central banks
in their survey, 58 percent focus their research on a ‘‘token model’’
In particular, an account-based CBDC would operate in a similar
manner to checking accounts with commercial banks where access
relies on an individual’s ability to veritably prove that they are the
account holder (e.g., with a password or other form of identification).
For that reason it can be thought of as a ‘‘I am, therefore I own’’
system (Auer & Boehme, 2020; Bossu et al., 2020). By contrast, a
token-based CBDC would be more akin to a bearer instrument, such

Explored further in Section 5.
8

## Page 9

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

as cash. In such scheme, individuals perform actions to (𝑖) verify the
payment object’s (CBDC) validity and (𝑖𝑖) the counterparty’s authority,
or access over the payment object. In the case of many cryptocurrencies
this amounts to producing and verifying a digital signatures utilising a
public and corresponding private key. More specifically, transactions
are initiated by ‘‘signing’’ information about the payment object and
transaction instructions with a secret private key. The validity of the
transaction (and the payment object) is verified when the signer’s corresponding unique public key is compared to the signature generated
by the private key. This is possible due to a mathematical relationship
between the private and public keys that allows for the validation of the
signature only against the public key (Antonopoulos, 2014). Knowledge
of the private key (represented as an alphanumeric value) enables full
access to the underlying asset, therefore token-based systems can be
thought of as ‘‘I know, therefore I own’’ systems (Auer & Boehme,
2020; Bossu et al., 2020), and bearer investments, as whoever ‘‘bears’’
the private key ‘‘bears’’ the payment instrument. The main concern
associated with account-based CBDC is identify theft or impersonation,
whereas loss of keys is an issue in token-based solutions.
Account and token CBDC deployments would also differ in terms
of their accountancy, and their introduction would likely necessitate
changes in the legal and accounting frameworks to accommodate those.
Account-based CBDCs, as existing checking accounts, would be minimally disruptive and follow the rules of double entry accounting.
Balances would be recorded in accounts and transactions would work
by debiting the payer’s account (assets) and crediting the payees account (assets). By contrast, token-based systems come with ‘‘built-in’’
accounting in the form of an unspent transaction output (UTXO). In a
token-based CBDC UTXOs would represent a certain amount of CBDC
value that can be spent by a specific private key. When a UTXO is
spent, it is ‘‘destroyed’’ by a new one, that can be spend with a different
private key. This association of private keys with UTXOs constitutes a
novel system for keeping track of balances without the use of accounts
or balance sheets.
The three primary considerations in the token versus account debate relate to privacy/anonymity and cash-likeness. Cash has value
to consumers because it is by nature anonymous, thus protecting individuals’ privacy (Kahn & Roberds, 2009). Garratt and van Oordt
(2021) discuss privacy in payments. Because of their non-reliance
on ‘strong identities’ token-based CBDCs were initially promoted as
private/anonymous alternatives to accounts, as well as more cash-like,
as transfers would not involve the debiting and crediting of accounts,
but rather the peer-to-peer transfer of tokens (Auer & Boehme, 2020;
Bordo & Levin, 2017; Bossu et al., 2020; Claussen et al., 2021; Kahn
& Rivadeneyra, 2020). Yet, as BoE (2020) and Claussen et al. (2021)
demonstrate, complete anonymity/privacy and cash-likeness in CBDCs
is likely unattainable. Claussen et al. (2021) identifies the three main
factors for this: (𝑖) First, the fact that digital processes necessarily
produce digital fingerprinting which, given enough time and resources
can be traced back to the counterparties in the transaction. (𝑖𝑖) Second,
the need for a remote ledger to facilitate the notarisation of transactions, which would, even for some time store information that could
be used to identify the counterparties of a transaction. (𝑖𝑖𝑖) Finally,
regulation is likely to necessitate the involvement of the CB as a notary,
and requires that under certain conditions the identities of individuals
enmeshed in transactions must be known to facilitate KYC, AML and
CTF. Indeed, in a first report published by a consortium of central
banks, complete anonymity for CBDC is deemed ‘‘not plausible’’ (Group
of Central Banks, 2020).

As with many new technologies there is a lot of confusion surrounding DLT/blockchain and what exactly they pertain to. Studying
the writings of Haber and Stornetta (1991) and Nakamoto (2009)
and the Ethereum (Buterin, 2014) and Hyperledger (Androulaki et al.,
2018) whitepapers as well as Antonopoulos (2014), we will define
blockchain as an append-only data structure where information is
grouped in sets, called ‘‘blocks’’ with each block cryptographically
referencing, through a hash function, forming a ‘‘chain’’. This data set
is distributed in a network of peers who can independently verify its
validity while its updating is subject to special rules. DLT is a superset of blockchain as references data sets that do not necessarily utilise
cryptography (hashes) to link information together. We use both terms
interchangeably in the present.
Notably, DLT/blockchain can accommodate either an account or token/UTXO CBDCs, as is the case in Ethereum and Bitcoin respectively.
In a private setting it can also support a direct, indirect, and hybrid
provision CBDC scheme depending on the participants’ authorisation
levels. Similarly, databases are also suitable for direct, indirect, or
hybrid CBDCs (by changing participant’s access levels), account CBDCs
(as is currently the case with customer accounts at commercial banks)
and even token/UTXO CBDCs, since under such scheme, a token/UTXO
CBDC would in essence be ‘‘a chain of digital signatures’’ stored in a
database instead of DLT/blockchain (Nakamoto, 2009).
DLT/blockchain has been studied as a potential source of efficiency,
especially in terms of reducing reconciliation and data management
costs by automating or streamlining, clearing, offering greater transparency, and tamper evidence (see for instance Chiu & Koeppl, 2019;
Morgan Stanley, 2016; Santander, 2016, and Ruttenberg, 2016). Yet the
overarching academic consensus is that the above are not necessarily
hindered by the choice of technology, but by existing processes (Benos
et al., 2017; Board of Governors of the Federal Reserve System (U.S.)
et al., 2016). Additionally, DLT/blockchain deployments come with a
number of drawbacks that mostly relate to scalability.
At this point a distinction needs to be made between private and
public deployments (Dinh et al., 2017). While the data structure and
its organisation remains the same, in public blockchains, network
participants are usually unknown and mutually distrusting nodes that
are economically incentivised to achieve consensus on state of the
data set in a process secured by cryptography and game theory. This
process is associated with significant overhead costs and hinders scalability to the point that a public DLT/blockchain deployment would
be unsuitable for the volumes of a CBDC (especially its retail and universal variants) (Auer & Boehme, 2020; Budish, 2018; Chiu & Koeppl,
2019). Indicatively, for validating and submitting new blocks, Bitcoin
(the most popular cryptocurrency by most measures) utilises Proofof-Work (PoW), which involves the computationally intensive solving
of cryptographic puzzles (mining) by special nodes called ‘‘miners’’.
PoW, in conjunction with restrictions on block size and production
frequency to facilitate accessibility to a wider audience, translate to
a throughput of about seven transactions per second (Antonopoulos,
2014; Nakamoto, 2009). Ethereum, another popular public blockchain
utilises Proof-of-Stake (PoS), which despite being more efficient compared to PoW, owning to artificial limits in block size and production
to facilitate accessibility, can only process between 15–30 transactions per second. ‘‘Public’’ blockchain deployments that achieve higher
throughputs have compromised on decentralisation or security, forming
the popular blockchain trilemma, between scalability, security, and
decentralisation.
Faced with this trilemma, CBs will opt for scalability and security
over decentralisation (see for instance BoE, 2020; ECB, 2020; Group of
Central Banks, 2020). Benos et al. (2017) and Danezis and Meiklejohn
(2015) describe how some amount of centralisation will be necessary
in a CBDC scheme to mitigate the overheads of distributed consensus.
In fact, blockchain was rejected by China as it cannot accommodate
the volume of transactions required for a CBDC (Gigichina, 2022).
Databases are the more intuitive option as participants are known

4.4. CBDC infrastructure
The advent of blockchain and cryptocurrencies motivated the exploration of alternative CBDC infrastructures as sources of efficiency
and novel features. The debate resolves around the use of conventional
databases and real time gross settlement systems, versus
DLT/blockchain. See Auer and Boehme (2020), Benos et al. (2017),
Danezis and Meiklejohn (2015) and Scorer (2017).
9

## Page 10

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

(usually vetted) and securing and updating the data set can rely on
their access-level, role and other business incentives, instead of inefficient consensus mechanisms. Additionally, those participants can
have access to specialised hardware and software to facilitate the fast
processing of transactions and state transitions, as is currently the
case with commercial banks and PSPs. Databases remain an intuitive
choice when other aspects such as resilience and vulnerabilities are
considered, since DLT/blockchain does not necessarily constitute a
material improvement and comes with its own set of trade offs.
That is not to say that DLT/blockchain can be made more, or even
entirely, centralised to accommodate for a CBDC function. CBs could
opt for a Proof-of-Authority (PoA) mechanism that relies on a small set
of trusted and reputable entities to act as transaction validators and
update the ledger (Wood, 2015). In the case of a direct CBDC, there
would be a sole validator, the CB, whereas in the case of an indirect
or hybrid CBDC, commercial banks and other PSPs would also have
validator rights. Yet, such scheme would largely constitute a reinvention of the existing processes, but with extra steps rendering the use of
DLT/Blockchain redundant as its ‘‘main benefits are lost if a trusted
third party is still required’’ (Nakamoto, 2009). Yet, as explored in
Section 3.2.3 in the context of programmability DLT/blockchain might
offer benefits as it could allow for native execution of open-source code
originally intended for decentralised blockchains, potentially yielding
cost-savings in development time. In the interest of preserving space,
the CBDC design tree is included in Appendix.

public or private monies. Naturally, such a scenario is unlikely in a
stable developed economy with a healthy financial system.
Besides offering an overview of the ways CBDCs interface with
monetary policy, the above also highlights the most important components of a CBDC when it comes to monetary policy, namely, its ability
to bear positive and negative interest, wholesale, retail, or universal
availability, and convertibility with other monies. In this section, we
will analyse those considerations in further detail.

5.1.1. Interest rate considerations
As noted, the choice of whether a CBDC should bear interest is
crucial. Depending on the economic cycle, this interest can be positive,
zero or even negative. The concept of paying interest on short-term CB
liabilities was first proposed by Friedman (1960), who suggested that
an equivalent rate to the risk-free rate should be paid in order to make
sure that the cost of holding money is equal to the marginal cost of
its production. Keister and Sanches (2021) posit that a remunerated
CBDC can serve as a new monetary policy tool that can be used to
influence the efficiency of exchange and aggregate investment. The
optimal interest rate depends on the characteristics of the CBDC and
of other payment methods it is in competition with. As suggested
in Meaning et al. (2018), interest paid can very depending on the entity
that bears the CBDC instrument. For instance, CB might wish to offer
different remunerations for commercial banks, NBFIs, or individuals
and households to achieve different policy goals. Different interest rates
can also be charged based on the size of CBDC holdings (Meaning et al.,
2018). This argument favours a CBDC that is distinct from reserves,
allowing for greater flexibility. In a system that is non-distinct from
reserve, if the CB charges different interest rates for different reserve
holders, this would de facto break their fungibility and create a two
tiered CBDC system, of reserve-like and non-reserve CBDCs.

5. CBDCs, monetary policy and financial stability
5.1. CBDCs and monetary policy
CBDCs can certainly have a wide potential impact on the financial
landscape. Hence, announcements related to CBDCs plans and advancements move financial markets, as demonstrated by Wang et al. (2022).
They introduce two indices, the CBDC Uncertainty Index (CBDCUI) and
the CBDC Attention Index (CBDCAI), derived from over 660 million
news-stories, and demonstrate that financial assets, including cryptocurrencies, foreign exchange rates, and even traditional safe-haven
assets like gold, show higher volatility in response to CBDC news. In
this section we elaborate on the possible impact of CBDC schemes on
monetary policy and financial stability.
In particular (Davoodalhosseini et al., 2020) summarise the main
ways in which a CBDC could improve monetary policy, categorising
them in ‘‘proactive’’ and ‘‘defensive’’. Under proactive arguments, they
outline how a CBDC can facilitate the effectiveness, implementation,
and transmission of monetary policy, as well as help stimulate the
economy when necessary. By allowing for differentiated interest rate
schemes dependent on the size of the deposit balance, incentivising
consumers to maintain efficient levels of liquidity and minimising
opportunity cost. Additionally, a CBDC’s substitutability with deposits
could improve the transmission of monetary policy as any change in
remuneration would be more quickly and accurately reflected to other
consumer rates. Finally and in conjunction with the phasing out of cash
or high denomination notes, a CBDC could eliminate the zero lower
bound, incentivising spending when needed. However, the authors
point out that quantitative estimates of such benefits are limited, and
there are ill-understood caveats associated with the elimination of the
zero lower bound and the discontinuation of cash or the imposing
of other restrictions. Additionally, such measures might blur the line
between monetary and fiscal policy.
In terms of defensive arguments, the authors outline that a CBDC
could preserve the effectiveness of monetary policy and safeguard the
financial sovereignty by reducing consumer incentives to adopt alternative or competing monies, not denominated in the national currency.
Such potential adoption would depend on the national currency being
perceived as (i) financially risky or unstable (due to inflation or other
factors), and/or (ii) severely lacking in features compared to other

Bordo and Levin (2017), who consider CBDC and reserves to be
distinct, suggest that the introduction of a remunerated CBDC may
provide a unique opportunity to reform the existing monetary policy
framework. In a growing economy with a stable price level, the interest
rate paid on CBDCs would be positive. However, if the economy were
to be exposed to a major shock, it would be possible for the CB
to reduce interest rates as required (even to negative levels through
demurrage fees) in order to stimulate economic growth and promote
price stability. However, the effectiveness of negative interest rates is
hindered by the use and circulation of cash money because cash would
become more attractive when nominal interest rates approach zero and
especially when they turn negative. This is supported by Agarwal and
Kimball (2015), Goodfriend (2000), and Rogoff (2016) who propose
that replacing cash with a CBDC could make it simpler to set a negative
rate on CB money and thus bypass the zero lower bound. Nevertheless,
as these authors acknowledge, the elimination of cash is not an essential
outcome of CBDC. Bordo and Levin (2017) also note that interest rates
can facilitate the establishment of a constant price level target that
would serve as a natural focal point for expectations and a nominal
anchor. Additionally, nominal interest rate adjustment on CBDCs could
replace other monetary policy techniques (such as QE) as the primary
monetary policy tool.
Finally, a (positively) remunerated CBDC could facilitate a more
competitive financial system ensuring that government-issued money
bears the same return as other risk-free assets and providing an incentive for depositors to shift funds into CBDC accounts over less competitive private sector institutions. Andolfatto (2021) and Chiu et al. (2019)
study the financial implications of this more competitive landscape,
noting that it does not necessarily hinder credit provision and bank
funding, but does reduce monopoly profits, whereas Mancini-Griffoli
et al. (2019) warn that remunerated CBDCs could result in increased
10

## Page 11

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

loan interest rates and diminishing credit demand.23 Moreover, providing wide access to the CB’s balance sheet through a retail or universal
CBDC and offering market participants an interest rate could more
effectively guarantee that no entity would lend at a rate lower than
the floor, thus making the floor a more effective limitation (Meaning
et al., 2018).

possible in a CBDC scheme that is distinct from reserves (like the
one proposed by Bordo & Levin, 2017). Instead, commercial banks
would need to first switch reserves for CBDC (either with the CB, or
other private entity) before offering it to other entities in the private
sector.

5.1.2. Technological availability considerations
When a CBDC is available to more entities in the private sector, it
allows for a direct implementation of monetary policy, without relying
on the existing monetary transmission mechanism (Bordo & Levin,
2017). This argument is based on the idea that decisions concerning
the remuneration and convertibility of a CBDC can be more influential
when more economic agents have access to it. Therefore, altering (increasing or decreasing) the interest rate, or convertibility (by limiting
or expanding it) of a wholesale CBDC would be less impactful compared
to doing the same for a retail or universal CBDC.
Additionally, Meaning et al. (2018) suggest that with a retail CB,
the demand curve for electronic CB money could become less or more
volatile depending on the positive or negative correlation of shocks
affecting new market participants with those of existing participants.
In the case of a positive correlation, more active management of the
demand curve by CB would be required, whereas, in the case of a
negative correlation, the demand curve would become less volatile,
requiring less intervention. Finally, the more available a CBDC is,
the more the CB’s balance sheet can expand (Bindseil, 2020) with
important implications for the financial system, such as those seen with
quantitative easing (Plosser, 2019).

5.1.4. Other considerations
Davoodalhosseini (2022) examines the optimal monetary policy
under a cash-only, CBDC-only and a dual cash-CBDC regime. In their
model, a CBDC is interest bearing and users incur a (technological) cost
for using it. At the same time, due to its remunerated electronic nature,
a CBDC can improve the efficacy of ‘‘helicopter drops’’. Assuming that
the CBDC perfectly substitutes cash and its cost is low, the optimal
policy is to abolish cash.
Conversely, if the CBDC cost is set too high, the model predicts
that only cash should be used. In the case of co-existence, if the cost
of utilising CBDC is not too high, the optimal policy would be to use
only one form of payment. This is because if both cash and CBDC are
allowed to co-exist, and are perfect substitutes, consumers may decide
to use cash in order to avoid taxes associated with CBDC, leading to an
underutilisation of the attractive feature that CBDC offers — bearing
interest. If cash and CBDC are not perfect substitutes, co-existence can
be optimal.
Barrdear and Kumhof (2022) consider a similar scenario where
deposits and CBDC are not perfect substitutes. The authors find that
the introduction of a CBDC increases the steady-state GDP through reductions in real interest rates, distortionary taxes, and transaction costs,
due to a reduction of defaultable debt, cost of government financing,
and increased liquidity respectively. Additionally, a CBDC expands the
monetary policy toolbox by offering an additional policy lever in the
form of the interest it pays. Finally, Chen and Siklos (2022), examine
the potential impact of CBDC on inflation and financial stability using
historical data and McCallum’s policy rule. Their model predicts that
while CBDC is unlikely to result in higher inflation, there is a risk to
financial stability. It also suggests that eliminating large denominations
from circulation will not negatively impact inflation control, but does
not advocate eliminating physical currency entirely.

5.1.3. Convertibility considerations
Convertibility of a CBDC for other monies is an important attribute
that influences monetary policy. With convertibility here we mean
the ability for a CBDC holder to exchange it with other forms of
money, such as deposits and cash, at face value. Naturally, at-par
convertibility with every form of money (for instance eMoney, crypto,
or foreign currencies) cannot be enforced, but in the case of deposits
and especially cash it can be desirable. For instance, absent at-par CBDC
convertibility with deposits or cash, any changes in the interest rate of
a CBDC would not influence deposit rates or cash demand as strongly as
in the case of convertibility at par. On that note, Agarwal and Kimball
(2015) and Assenmacher and Krogstrup (2018), and later (Kumhof
& Noone, 2021), argue for a dual-fiat currency system relying on
flexible exchange rates between CBDCs, cash, and deposits, to facilitate
financial stability and overcoming the lower bound.
Meaning et al. (2018) on the contrary, argue that the ability of depositors to convert commercial bank money into CB money on demand
is essential for preserving confidence in bank deposits whereas, Kumhof
and Noone (2021) counter-argue that it is high regulatory oversight
and compliance requirements rather than guaranteed convertibility
of financial instruments which drive confidence in the commercial
banking system. Although there is no concrete evidence to support
either position conclusively, certain events from the 2008 financial
crisis as well as capital controls imposed in Greece and Cyprus during
the Eurozone debt crisis provide strong arguments both for increased
oversight and direct convertibility. Moreover, as we will demonstrate
in the next section, Kumhof and Noone’s suggested CBDC is of arguable
utility to the wider private sector, in part due to their non-convertibility
requirement.
Meaning et al. (2018) offer another argument in favour of direct
convertibility. The authors note that in certain scenarios excessive QE
has resulted in commercial banks holding an excess of reserves, which
in a case of a CBDC that is non-distinct from reserves could be used
for asset purchases from the private sector. This would not be directly

23

5.2. CBDCs and financial stability
This section explores existing research on the potential impacts
of CBDC on the financial system, contingent on the CBDC design,
substitutability with other forms of public and private money, and any
restrictions set in place to mitigate substitution between them, bank
market power and more. In most cases, authors consider a hybrid CBDC
solution. As highlighted in Section 4.2, this solution is the most intuitive
as it allows each agent to focus on their core competencies, namely,
the CB on providing access to safe money, and the private sector on
handling customer relationships.
The literature so far has focused on how different designs of CBDCs
will affect bank funding, deposits, lending, consumer welfare, and
financial system fragility through bank runs. For instance, if a CBDC is
highly substitutable for cash or deposits it terms of functionality, while
paying higher interest and offering additional technological features, it
could be desirable enough that consumers abandon alternative assets
to use it — leading to disruption in the financial system. On the
contrary, if a CBDC does not offer sufficient utility or substitute value
compared to existing instruments then it would cause minimal disruption but may be redundant. Overall, a CBDC can improve allocative
efficiency provided that their interest rate is reasonable. However,
besides remuneration, CBDCs can compete with other monies across

Explored in Section 5.2.
11

## Page 12

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.
Table 2
Overview of papers.
Author

Model

Intstr.

Comp.

Design

I

Rd

Rl

Runs

Andolfatto (2021)
Fernández-Villaverde et. al. (2021)
Kim and Kwon (2019)
Schilling et al. (2021)
Chiu et al (2019)
Keister and Sanches (2019)
Williamson (2021)
Dong and Xiao (2021)

DD
DD
DD
DD
LW
LW
LW
LW

X,C,D
X,D
X,D
X,D
X,D
X,C,D
X,C,D
X,C,D

M
M/C
C
M/C
C
C
C
C

nR,R,H,-,-,R,D,A,nR,R,D,A,nR,R,D/I,A/T,nR,R,D,A,nR,R,-,-,-,R,-,-,-,R,I,-,-

✗
N/A
✗
N/A
N/A
✓
N/A
✗

↑
N/A
↑
N/A
↑
↑
N/A
↑

–
N/A
↑
N/A
↓
↓
N/A
↓

✗
✓
✓
✓
✓
N/A
\cmark
N/A

This table provides an overview of various papers examining the financial implications of CBDC implementation. Papers utilise different models
which they apply to CBDCs with different characteristics. The columns report the author, the model being studied, the payment instruments
examined, the competitive environment examined, the design of the CBDC, whether the CBDC impairs commercial bank income/funding, the
deposit rate, the lending rate, and whether it can facilitate bank runs.
Model: DD: Diamond and Dybvig (1983), or variation, LW: Lagos and Wright (2005), or variation.
Instr: Payment instruments examined. X: CBDC, C: Cash, D: Deposits.
Comp: Competitive environment examined, where M: Monopolistic, C: Competitive.
Design CBDC: nR or R: Reserve or non-reserve. W, R, or H: Wholesale, retail, or universal. D, I, or H: Direct, indirect, or hybrid. A or T:
Account or token. B or D: Blockchain or Database.
I: Impairs commercial bank income/funding.
Rd: Deposit rate, Rl: Lending rate, Runs: Can facilitate bank runs.

multiple dimensions, including safety, privacy, and novel features such
as programmability, which remain largely unexplored in literature.24
Table 2 provides an (non-exhaustive) overview of relevant research
articles, the models used and their often contradicting findings. Overall,
there remains no definitive answer concerning whether there exists
a design that offers tangible utility while also avoiding disruption
across the financial system. This question is further compounded by
the ever-evolving nature of research into this area along with numerous
mutually exclusive design options available. Additionally, most studies
concentrate on how CBDCs will affect commercial banking rather than
non-banking entities. The latter could be particularly vulnerable given
certain proposed designs where banks still have some minor role within
the framework of certain CBDC systems. Finally, the role of wholesale
CBDCs in financial disintermediation is not examined.

(2021) in terms of Rd but deviate in terms of the impact on the lending
rate.
Overall the main benefit of a CBDC is found in an imperfectly competitive deposit market, in which commercial banks limit the amount
of deposits available in order to suppress Rd. The introduction of a
CBDC establishes a floor rate for Rd = Rc, reducing bank’s incentives
to restrain the supply of deposits. As a result commercial banks offer
more deposits, reduce loan rates, increase lending activity, and expand
financial inclusion. This holds true so long as 𝑅𝑐 ≤ 𝑅𝑟. In a scenario
where 𝑅𝑐 > 𝑅𝑟 a bank would make a loss if they chose to maintain
deposits, resulting in higher cost of funding for commercial banks, and
suppression of deposits. Chiu et al. (2019) also caution that lending
rates may increase in case commercial banks face liquidity constraints
due to 𝑅𝑐 > 𝑅𝑑. Andolfatto (2021) offers the additional insight that
higher Rd resulting from increased competition could have disinflationary effects on the economy, while also offering more compelling
terms for depositors and facilitating financial inclusion. Kim and Kwon
(2019) find that the introduction of a CBDC suppresses supply of credit
by commercial banks resulting in a higher nominal rate and lower
reserve-deposit ratio also leading to an increased probability of bank
runs.
Keister and Sanches (2021) study the introduction of a CBDC in
a competitive bank market. They consider three distinct scenarios, a
CBDC with a high degree of substitutability with cash, deposits, or both
cash and deposits respectively and comment on the trade-offs of each.
They find that if there is a strong incentive for financial inclusion, it is
optimal to have a CBDC with a high degree of substitutability for cash.
When the number of productive projects is limited compared to the
demand for deposit-like money, then it may be advantageous to devise
a deposit-like CBDC, particularly when financial frictions are moderate.
If a CBDC can fulfil both roles simultaneously, its circulation could be
either broader or more restricted than if it had high substitutability
with either cash or deposits. Overall, while a CBDC always causes
some disintermediation social welfare can still increase. Importantly,
in the scenario of a CBDC with high substitutability with deposits, they
arrive at the same conclusion as Andolfatto (2021) and Chiu et al.
(2019), noting that increased competition raises Rd, and expands the
commercial bank depositor base.
Their findings deviate from those of Andolfatto (2021), Chiu et al.
(2019), and Monnet et al. (2021), to the extent that under perfect
competition, commercial banks are unable to insulate themselves from
changes in funding costs, since they already offer competitive Rd, and
as a result pass their costs onto borrowers. This can lead to a decrease in

5.2.1. CBDC effects on deposits, funding, lending and consumer welfare in
different competitive environments
Andolfatto (2021) and Chiu et al. (2019) examine the potential
effects of implementing a hybrid remunerated retail CBDC, distinct
from reserves, on bank lending and funding activity, in an economy
with a monopoly bank, and imperfect competition respectively. In both
cases, the introduction of CBDC gives consumers the option to hold
deposits outside the traditional banking sector, creating competition
between commercial bank deposit rates (Rd) and CBDC interest rates
(Rc). Rational consumers typically opt for whichever rate is higher,
assuming no technological advantages between CBDCs and deposits or
disruptive financial events that make CB liabilities more attractive.
When the interest rate of reserves (Rr) remains below Rc (𝑅𝑟 < 𝑅𝑐),
commercial banks have every incentive to match Rd to Rc to maintain
customer deposits. This is because the commercial bank’s cost of money
is Rr and not Rc. As long as there remains a positive spread between
these two rates, it pays for banks to retain deposits despite any reduced
profit margins from raising Rd = Rc. Additionally, this potential rate
increase leads to more favourable terms for depositors which expands
financial inclusion.25 Andolfatto (2021) observes no effect on bank
lending in his model, as the opportunity cost for loans is determined
by Rr instead or Rc. Chiu et al. (2019) underline that a CBDC might
increase bank lending due to the expansion in deposits. Dong and Xiao
(2021) and Monnet (2021) also agree with the findings of Andolfatto

24

Although Agur et al. (2022) explore the concept of privacy/anonymity.
As consumers are more incentivised to bear the costs of opening a bank
account.
25

12

## Page 13

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

rate, allowing for the market for CBDC to settle without the need
for extensive balance sheet adjustments or changes in the general
price level; (𝑖𝑖) be distinct from reserves, with no guaranteed direct
convertibility to one another at the CB, so as to address the risk of
a ’run by the back door’ scenario; (𝑖𝑖𝑖) not be subject to guaranteed
convertibility with bank deposits at commercial banks, so as to avoid
runs on the aggregate banking system; and (𝑖𝑣) be issued by the CB only
against eligible securities, such as government bonds, and strictly at its
discretion.
They examine its potential first-order effects on commercial banks’
balance sheets by considering the scenario of an initial introduction of
a CBDC, and that of confidence crisis in the banking system, leading
to an increased demand for CBDCs by households and individuals. If
these principles are upheld, they conclude that in the first scenario:
(𝑖) The core functions of the commercial banking sector, namely, the
provision of credit to borrowers and liquidity to depositors, are not
impaired, despite diminishing deposits. (𝑖𝑖) Commercial banks and their
customers, through their respective portfolio decisions, decide how
much depositors switching to CBDC affects the size and composition
of commercial bank balance sheets. (𝑖𝑖𝑖) Banks can still fulfil their traditional role as intermediaries. For the scenario of a loss of confidence
in the banking system, we explain how the probability of a run from
bank deposits to CBDC can be notably reduced by using the same core
principles.
While the authors acknowledge the potential of CBDC to serve as the
most secure form of money in the economy, their proposed restrictions
may diminish this utility. For instance, under conditions of extreme
financial stress, access to CBDC might be limited as a result of public
and private sector actions. For example, decreased interest rates set
by the CB (potentially even demurrage fees), refusal from commercial
banks to convert government securities and deposits into CBDCs, or
refusals from NBFIs and other private entities to exchange CBDC for
deposits could reduce the appeal of CBDC as a safe instrument. It is thus
uncertain if such a CBDC would be attractive or beneficial. Features
such as anonymity and programmable payment capabilities may make
it an attractive medium of exchange rather than only a safe asset;
however, its competitiveness in this capacity against offerings from the
private sector and its appeal to consumers remain debatable.
Other authors share similar concerns with Kumhof and Noone
(2021) but have proposed less radical solutions. For instance,
Fernández-Villaverde et al. (2021), Meaning et al. (2018), and
Williamson (2022) posit that such concerns can be mitigated through
deposit insurance schemes by the CB and Kim and Kwon (2019) as well
as Brunnermeier and Niepelt (2019) argue that if the CB lends CBDC
deposits to commercial banks it can reduce the risk on bank runs and
improve financial stability. Bindseil (2020) outline how Kumhof and
Noone (2021) proposed limitations might be redundant. They showcase
how interest rate on CBDCs is not a necessary condition for market
clearing or inflation control, instead suggesting that, similar to cash,
a potential CBDC oversupply would be neutralised by returning to
the CB which would then adjust reserves and open market operations
accordingly. Similarly they question the choices of distinguishing CBDC
from reserves and establishing non-convertibility outlining that similar
schemes exist between cash and reserves. Overall they argue that in
their attempt to create a minimally disruptive CBDC, Kumhof and
Noone’s suggestions disrupt the status quo and counter-propose other
solutions. Similarly to Panetta (2018), they suggest limiting the amount
of CBDC holdings per consumer, and even offering remuneration tiers
depending on the amount of holdings to mitigate bank runs to CBDCs.
Finally, they also note that the attractiveness of CBDCs also relies on
other features, besides remuneration, while recognising that a remunerated CBDC would provide a useful monetary policy level for adjusting a
CBDCs substitutability with other monies, a notion also echoed in Agur
et al. (2022).
A strand of literature also suggests that concerns around the levels of commercial bank disintermediation might be exaggerated, and

aggregate lending and investment. Yet, when payment efficiency is low,
introducing a CBDC may be sufficient for achieving gains in payment
efficiency that could offset any losses incurred by reduced aggregate
investment.
Similarly, Agur et al. (2022) and Keister and Sanches (2021) examine the welfare implications of introducing a CBDC. They consider
a scenario in which consumers need to allocate their income between cash, deposits and a CDBC according to their preferences on
the payment instruments’ degree of security versus anonymity, positive
network effects stemming from their widespread use, and remuneration
(if any) vis a vis other instruments.
On the privacy-to-security spectrum, cash and deposits fall at the
two extremes, with cash being entirely private and non-secure and
deposits entirely secure but non-private. Instead, a CBDC is socially
valuable as it can be designed to occupy any point in the privacy-toanonymity-spectrum. The authors find that the more cash-like a CBDC
is, the more it substitutes cash even causing its disappearance due to the
lack of network effects stemming from its lower usage. On the contrary,
a deposit like CBDC leads to increased competition with commercial
banks and increased deposit and lending rates, before contracting credit
provisions to firms.
The latter is in contrast to the findings of Andolfatto (2021) who
concludes that assuming commercial bank market power and provided
𝑅𝑟 < 𝑅𝑐, the commercial bank lending process is not hindered, and
that the depositor base can even expand if the commercial bank accepts
lower profit margins to retain customer deposits by matching Rd = Rc.
Such an assumption is absent from Agur et al. (2022).
For Agur et al. (2022), interest paid on CBDC is seen as introducing
distortions in consumer choice of payment instrument. Yet, the authors
recognise the interest rate’s utility in limiting the substitutability of
CBDC with other monies, and in preserving consumer welfare by controlling payment instrument network effects. The authors also consider
other political economy factors for an interest bearing CBDC which include the preservation of cash, limiting impact on bank intermediation,
the introduction of CBDC after cash has fallen out of favour or when
anonymous payment instruments create negative social externalities,
and when banks have market power the optimal CBDC rate can deviate
from zero.
5.2.2. CBDC effects on bank runs and financial disintermediation
On the point of disintermediation and deposits, Bindseil (2020),
Kim and Kwon (2019), Mersch (2018), Schilling et al. (2020), and
Williamson (2022), highlight the possibility of CBDCs facilitating bank
runs in times of financial stress and Cecchetti and Schoenholtz (2017)
suggest that unsophisticated consumers might exchange deposits for
CBDC when the first signs of financial risk appear. While the authors
recognise that tools to enable such bank runs exist today (for instance,
cash or government debt) the digital nature of a CBDC could aggravate
the switching. Additionally (Fernández-Villaverde et al., 2021) utilise
the Diamond–Dybvig model to showcase how the CB can emerge
as a monopoly depository institution. In their model, a non-fiscally
backed CB has access to liquidity transformation (long term investment) through arrangements with investment banks and is able to
replicate the socially optimal contract offered by commercial banks.
Yet, if the CB were to receive fiscal backing it would monopolise
deposits. Moreover, due to the CB’s contract rigidity with investment
banks (the CB cannot call on its investment) runs on CB are deterred.
Consumers aware of this fact opt to deposit with the CB instead
of commercial banks, leading it to become the monopoly depository
institution. With its new monopoly power, the CB can deviate from the
socially optimal contract.
Considering those effects, Kumhof and Noone (2021) envisage a
minimally disruptive CBDC which: (𝑖) would pay an adjustable interest
13

## Page 14

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

policy to increase CB influence. Lastly, and importantly, despite the
consumer need for cash-like privacy and anonymity, as discussed in
Section 3.2.2, CBDCs can serve as a tool of mass surveillance, due to
the concentration of information on citizens. Naturally, this lack of
cash-like privacy and anonymity is another argument against CBDC
issuance.
CBDC schemes involving the private sector are viewed favourably,
with some (such as Bofinger and Haas (2020) and Engert and Fung
(2017)) arguing that they can offer products and services that serve
the same purpose as CBDCs while achieving higher customer satisfaction and lower costs. This is supported by the analysis of the direct
and hybrid CBDC schemes in Section 4.2. Mobile payment services
like Apple Pay, Google Pay, PayPal, AliPay, and WeChat Pay already
handle trillions of transactions annually, and blockchain providers26
offer CBDC-as-a-service, demonstrating the private sector’s capability in providing solutions at a large scale. Additionally, proposals
for scaling blockchain deployments such as rollups27 can theoretically enable hundreds of thousands of transactions per second, potentially making stablecoins or even cryptocurrencies a viable solution for
payments.
Furthermore, Engert and Fung (2017) outline several arguments
against the issuance of a CBDC, even if it is designed entirely within
existing boundaries. Chiefly, they note that central banks have been
able to effectively influence consumer rates through the adjustment of
the overnight rate, thus rendering the need for an additional monetary policy level redundant. Additionally, they argue that the ability
of a CBDC to pay interest is incompatible with strong privacy and
anonymity due to regulatory and tax considerations, noting that such
remunerated CBDC would hinder any benefits to financial inclusion for
individuals without access to strong identities. CBDC interest would
also inhibit any marginal seigniorage gains in proportion to the level of
the interest rate. Regarding the argument of using CBDCs to eliminate
the zero lower bound, the authors warn that such a move would have
significant political economy implications that may damage the reputation of the CB, in addition to impairing the welfare of less sophisticated
consumers who might rely on such income. Finally, as we outline in
Section 5.2, while most authors suggest that a reasonably designed
CBDC can provide welfare benefits through increased competition,
they simultaneously recognise that, absent that level of restraint, its
implications for the financial system will be severe, including funding
constrained commercial banks raising fees and rates for customers, and
the disintermediation of large parts of the existing financial system.
There could also be potential negative consequences and costs related
to the widespread adoption of digital payment solutions by consumers
with low financial literacy, but not much literature has been developed
yet on this topic.
Overall, as the more radical schemes of total anonymity, decentralisation, and disintermediation have been abandoned in favour of
more modest proposals, the above arguments suggest the potential
redundancy of CBDCs.

measures such as those proposed by Bindseil (2020) and Kumhof and
Noone (2021) might be redundant. Indicatively, Williamson (2022)
posits that bank runs might be less disruptive under a CBDC regime
whereas Keister and Monnet (2022) find that CBDCs might decrease financial fragility as the CB can monitor the flow of funds into CBDCs and
identify weak banks giving policymakers more time to act, discouraging
depositors to run on banks.
6. Arguments against CBDC issuance
While Section 2 has listed a number of arguments in favour of the
introduction of CBDC, this section allows us to explain the existing
counter-arguments against. The CBs tend to favour CBDC because they
allow them to increase their control over the financial system and
mitigate some of the existing financial risks.
Regarding motivations, recently, many CBs have placed great emphasis on issuing CBDCs in order to protect financial sovereignty,
particularly against the issuance of foreign CBDCs. The theoretical
arguments supporting this idea were presented in Section 3.1.3 and
include the threat of currency substitution and bank runs to foreign
assets. However, some of these concerns may be exaggerated. For example, Martin Chorzempa, a senior fellow at the Peterson Institute for
International Economics, testified to the US–China Economic Security
Review Commission on the threat of China’s CBDC, stating that it has
yet to demonstrate greater cost-effectiveness, efficiency, privacy, or
convenience than other solutions, and is therefore unlikely to challenge the dollar’s international dominance in the short to medium
term (Kaminska, 2021). Additionally, Engert and Fung (2017) argues
that the potential of a CBDC to reduce the effective lower bound and
combat financial crime can be achieved through other means, such as
the implementation of regulatory measures to promote competition in
retail payments. Finally, Quarles (2021) notes how a CBDC may pose
a threat to resilience by serving as a honeypot for cyber-criminals, due
to its digital nature, large surface, and significance relative to other
forms of money. Moreover (Bindseil, 2022) highlights that the alleged
transformative potential of digitisation in money and payments, as well
as CBDCs in particular, might be overestimated, citing the constant
evolution of money and the relatively unchanged issues of commercial
and central banking.
The proposed alternative infrastructures and design options discussed in Section 4.4 have yet to show a clear advantage over existing
systems in terms of meeting the needs of both consumers and central
banks. In fact, many suggested solutions would come with significant
costs. For example, developing a new DLT/blockchain record-keeping
infrastructure, or expanding the CB’s role as the sole financial intermediary as advocated by direct CBDC schemes, would be costly and
disruptive and less desirable. Additionally, the introduction of a CBDC
would require educating consumers, who may be resistant to change,
on its use and proper security practices. Even if accessing a CBDC
requires minimal equipment, such as a smartphone, the CB would need
to provide this for consumers who do not have it, especially if cash
usage decreases.
The factors of cost and destabilisation have led many to abandon
more radical CBDC schemes in favour of deployments that iterate
on and do not replace existing infrastructure and schemes, with any
additional features, such as programmability, likely offered as optional
‘‘add-ons’’, as outlined in Section 3.2.3. In academic research, most
authors abstract away from CBDC infrastructure, as, for the most part,
a CBDC that satisfies CB motives can be designed entirely within
the boundaries of existing systems, particularly through adjustments
of interest rates and the availability of a reserve or non-reserve CB
liability to the private sector. This raises the question of whether
a CBDC is truly a new payment instrument or simply a shift in

7. Summary and future research
Nearly every CB in the world is examining the issuance of CBDCs
and many at an advanced stage. CBDCs are therefore an eventuality
whose impact is still unclear due to the complexity of their de-

26

See for instance Consensys, Ripple, and nChain.
Rollups are a blockchain scaling solution that utilises off-chain computations to increase scalability and throughput while maintaining the security of
the underlying blockchain. Transactions are combined into a single ‘‘rollup’’
transaction which is broadcast to the main chain, enabling a higher transaction
throughput.
27

14

## Page 15

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

sign and the implications for the financial system. It is essential that
research keeps up to speed to avoid any of the discussed negative
consequences of CBDCs. The extant literature reviews on this topic
have followed a systematic approach and have been useful in organising the earlier knowledge. However, navigating the fast-growing
research on CBDC can be particularly labyrinthine due to its pace and
complexity.
This thematic literature survey provides a comprehensive handbook
for understanding all CBDC aspects. First, we review the existing definitions and provide a universal one; we contextualise CBDCs as the latest
in a line of key financial system’s shifts; we analyse the arguments in
favour of CBDC issuance instigated by contemporary financial events
and trends requiring the introduction of new financial instruments.
In particular, we look at the discussion around CBDC in response to
the need for: a new monetary and fiscal policy tool, improvements in
payment speed and efficiency, the safeguard to CB sovereignty with
heightened competition from cryptocurrencies, the mitigation of the
negative effects of declining cash usage and of increasing privacyinvasive private sector payment systems, and, finally, the development
of programmable money and payments solutions.
Second, we examine the design space and options for CBDCs, including: their reserve or non-reserve status as a liability, wholesale,
retail, or universal availability, direct, indirect, or hybrid provision,
account or token access, and the choice of a novel DLT/blockchain
or the use of the conventional real-time gross settlement infrastructure. We argue that the choice of infrastructure and access method
are largely inconsequential. In particular, a token-based CBDC would
not necessarily facilitate anonymity/privacy and a DLT/blockchain
infrastructure would not always result in efficiency or resilience gains.
We also demonstrate how, in certain cases, the opposite might be
true.
On the contrary, the availability and liability-nature of CBDCs are,
by contract, impactful for their monetary implications. We discuss the
implications of different breadth of CBDC availability, its eventual
interest-bearing nature, the convertibility with other monies, its impact
on bank confidence and stability and competitivity. In particular, we
note that a reasonably designed CBDC, bearing a modest interest rate,
may not necessarily lead to financial system disintermediation. In this
light, we also showcase some proposals for more conservative CBDC
approaches. Finally, we present the primary arguments against CBDC
issuance and focus on discussing their potential redundancy due to their
progressively diminishing ambitious design.
In light of the literature reviews and the developed discussion, we
identify several research priorities. First, we need further empirical
studies on the motivations for CBDC issuance and the factors influencing CBDC adoption. While prior studies have employed qualitative
methods, such as questionnaires administered to CBs, these may not
always provide a comprehensive understanding of the underlying political and economic drivers and certainly cannot focus on the needs and
opinions of the public (see for instance Bindseil et al., 2021 and ECB,
2021). Bijlsma et al. (2021) and Maryaningsih et al. (2022) utilise
empirical methods to study the drivers of CBDC adoption considering
the characteristics of consumers and the needs of the financial system.
However, these studies can be expanded in a number of ways, for
instance by considering how different CBDCs may appeal to different
consumers or different scope of use.28 The difficulty of this research
question is compounded by the inherently complex nature of CBDCs,
and in certain cases, even by the low financial literacy of the final potential users. However, the insights that can be derived by such study

can be useful to analyse the demand for CBDCs, the disintermediation
potential, and the most useful design.
Second, while some studies have attempted to predict the general CBDC demand (for instance, Li, 2022 and Burlon et al., 2022),
such studies do not exist for the majority of advanced or developing
economies. Notably, the volatility of CBDC demand potential, including
its determinants, remain largely unexplored.
Third, in terms of CBDC infrastructure, we find programmability
being an important and largely unexplored aspect (with some exception
in the computer science literature). In particular, we need to study more
which new capabilities digital centralised money programmability can
offer and its implications on competition in the financial system as well
as on consumer welfare. Additionally, researchers should examine the
implications of CBDC programmability on environmental or sustainable
goals. For instance, as outlined in Section 3.2.3, the introduction of a
novel tax at the unit-level if a CBDC is spent on a carbon-intensive
goods and services would influence consumer preferences, payment
choices, and welfare.
Fourth, as discussed in Section 5, while the literature on the financial implications of CBDC introduction is growing, most authors focus
on its effects on commercial banks, leaving out non-banking entities,
such as eMoney and fintech providers, and stablecoin and cryptocurrency deployments. The latter may be particularly susceptible to the
issuance of a CBDC, even more than commercial banks which, as most
literature recognises, may preserve a role. Future research can start
addressing this important gap in knowledge for example by looking
at how announcements related to CBDCs developments influence the
relative institutions and markets.
Fifth, in Section 5 we also underline how different CBDC schemes
deployed in different competitive environments might influence financial stability. The overarching consensus is that there is a trade-off
between CBDC utility and the level of financial disintermediation. The
question of whether a CBDC that is both minimally disruptive for the
financial system and maximally valuable for its users exists remains
unanswered. Moreover, even if such a CBDC scheme does not exist,
there is no definitive answer as to the optimal design options that
balance the various benefits and costs.
Sixth, another potential research avenue is the study of how CBDC
issuance – against other existing CB liabilities – might influence the
CB balance sheet structure and how this can reverberate on the financial system. Importantly, to support a CBDC, especially in absence of
restrictions such as those set by Kumhof and Noone (2021), the CB
might be incentivised to engage in credit provision to support their
expanded balance sheet, further increasing its role and involvement
in the financial system. How this provision of credit would work in
practice, and how it would influence the wider private sector is an
important avenue for future research.
Seventh, as discussed in Section 3.2.2, the widespread adoption of a
CBDC may potentially curb illegal markets and tax evasion. The extent
of this curbing and its potential impacts on the financial system and tax
revenues remain an area for further research.
CRediT authorship contribution statement
Lambis Dionysopoulos: Conceptualization, Investigation, Writing
– original draft, Writing – review & editing. Miriam Marra: Conceptualization, Writing – review & editing, Supervision. Andrew Urquhart:
Conceptualization, Writing – review & editing, Supervision.
Data availability
No data was used for the research described in the article.

28

The ECB’s 2020 report on the digital euro (ECB, 2020) examines the
desirable features of a CBDC by consumers; however, it does not address the
question of whether consumers can derive any utility from a CBDC in the first
place and, if so, what type.
15

## Page 16

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

Appendix. CBDC design space and options

CBDC design space
R1
W2
D3
A4
B5

T4
D5

R2

I3

B5

H3

A4
D5

B5

T4
D5

B5

D3

A4
D5

B5

T4
D5

B5

A4
D5

B5

T4
D5

U2

I3

B5

H3

A4
D5

B5

T4
D5

B5

D3

A4
D5

B5

T4
D5

B5

I3

A4
D5

B5

T4
D5

B5

H3

A4
D5

B5

T4
D5

B5

A4
D5

B5

T4
D5

B5

D5

CBDC design space
nR1
W2
D3
A4
B5

T4
D5

R2

I3

B5

H3

A4
D5

B5

T4
D5

B5

D3

A4
D5

B5

T4
D5

B5

A4
D5

B5

T4
D5

U2

I3

B5

H3

A4
D5

B5

T4
D5

B5

References

D3

A4
D5

B5

T4
D5

B5

I3

A4
D5

B5

T4
D5

B5

H3

A4
D5

B5

T4
D5

B5

A4
D5

B5

T4
D5

B5

D5

Bindseil, U. (2020). Tiered CBDC and the financial system. SSRN Electronic Journal.
Bindseil, U. (2022). The case for and against CBDC – five years later. SSRN Electronic
Journal.
Bindseil, U., Panetta, F., & Terol, I. (2021). Central bank digital currency: Functional
scope, pricing and controls. SSRN Electronic Journal.
BIS (2021). Ready, steady, go? Results of the third BIS survey on central bank digital
currency. OCLC: 1238191056.
Bjerg, O. (2017). Designing new money - the policy trilemma of central bank digital
currency.
Board of Governors of the Federal Reserve System (U. S. ), Mills, D., Board of Governors
of the Federal Reserve System (U. S. ), Wang, K., Board of Governors of the
Federal Reserve System (U. S. ), Malone, B., Board of Governors of the Federal
Reserve System (U. S. ), Ravi, A., Board of Governors of the Federal Reserve
System (U. S. ), Marquardt, J., Board of Governors of the Federal Reserve System
(U. S. ), Chen, C., Board of Governors of the Federal Reserve System (U. S. ),
Badev, A., Fedearl Reserve Board, Brezinski, T., Federal Reserve Bank of New York,
Fahy, L., Federal Reserve Bank of New York, .... Baird, M. (2016). Distributed ledger
technology in payments, clearing, and settlement. Finance and Economics Discussion
Series, 2016(095).
BoE (2019). Financial stability report july 2019 | issue no. 45: Technical report, (p. 74).
BoE (2020). Central bank digital currency: Opportunities, challenges and design: Technical
report, (p. 57).
BoE (2022). Knocked down during lockdown: the return of cash: Technical report.
Bofinger, P., & Haas, T. (2020). CBDC: Can central banks succeed in the marketplace
for digital monies? CEPR Discussion Papers, Number: 15489 Publisher: C.E.P.R.
Discussion Papers.
Bordo, M., & Levin, A. (2017). Central bank digital currency and the future of monetary
policy. (w23711), Cambridge, MA: National Bureau of Economic Research, Article
w23711.
Bossu, W., Itatani, M., Margulis, C., Rossi, A., Weenink, H., & Yoshinaga, A. (2020).
Legal aspects of central bank digital currency: Central bank and monetary law
considerations.
Bousquette, I. (2022). Blockchain fails to gain traction in the enterprise. Wall Street
Journal.
Browne, R. (2021). Cryptocurrency firms Tether and Bitfinex agree to pay $18.5 million
fine to end New York probe.
Brunnermeier, M., James, H., & Landau, J.-P. (2019). The digitalization of money:
Technical report w26300, Cambridge, MA: National Bureau of Economic Research,
Article w26300.
Brunnermeier, M. K., & Niepelt, D. (2019). On the equivalence of private and public
money. Journal of Monetary Economics, 106, 27–41.
Budish, E. (2018). The economic limits of bitcoin and the blockchain.
Burlon, L., Montes-Galdón, C., Muñoz, M., & Smets, F. (2022). The optimal quantity of
CBDC in a bank-based economy. SSRN Electronic Journal.
Buterin, V. (2014). Ethereum: A next-generation smart contract and decentralized
application platform. (p. 36).
Camera, G. (2017). A perspective on electronic alternatives to traditional currencies.

Adachi, M., Da Silva, P. B. P., Born, A., Cappuccio, M., Czák-Ludwig, S., Gschossmann, I., Pellicani, A., Plooij, M., Paula, G., & Philipps, S.-M. (2022). Stablecoins’
role in crypto and beyond: functions, risks and policy. (18).
Adrian, T., & Mancini-Griffoli, T. (2019). IMF FinTech notes: no. 19/0018, The rise of
digital money. Washington, D.C: International Monetary Fund.
Agarwal, R., & Kimball, M. (2015). Breaking through the zero lower bound. IMF.
Agur, I., Ari, A., & Dell’Ariccia, G. (2022). Designing central bank digital currencies.
Journal of Monetary Economics, 125, 62–79.
Amsden, Z., Arora, R., Bano, S., Baudet, M., Blackshear, S., Bothra, A., Cabrera, G.,
Catalini, C., Chalkias, K., Cheng, E., Ching, A., Chursin, A., Danezis, G., Giacomo, G.
D., Dill, D. L., Ding, H., Doudchenko, N., Gao, V., Gao, Z., .... Zhou, R. (2020).
The libra blockchain.
Andolfatto, D. (2021). Assessing the impact of central bank digital currency on private
banks. The Economic Journal, 131(634), 525–540, Publisher: Oxford University
Press.
Androulaki, E., Barger, A., Bortnikov, V., Cachin, C., Christidis, K., De Caro, A.,
Enyeart, D., Ferris, C., Laventman, G., Manevich, Y., Muralidharan, S., Murthy, C.,
Nguyen, B., Sethi, M., Singh, G., Smith, K., Sorniotti, A., Stathakopoulou, C.,
Vukolić, M., .... Yellick, J. (2018). Hyperledger fabric: A distributed operating
system for permissioned blockchains. In Proceedings of the thirteenth EuroSys
conference (pp. 1–15). arXiv:1801.10228 [cs].
Antonopoulos, A. M. (2014). Mastering bitcoin: unlocking digital crypto-currencies (1st ed.).
O’Reilly Media, Inc..
Areddy, J. T. (2021). China creates its own digital currency, a first for major economy.
Wall Street Journal.
Assenmacher, K., & Krogstrup, S. (2018). Monetary policy with negative interest rates:
Decoupling cash from electronic money.
Auer, R., & Boehme, R. (2020). The technology of retail central bank digital currency.
(p. 16).
Auer, R., Cornelli, G., & Frost, J. (2020). Rise of the central bank digital currencies:
drivers, approaches and technologies.
Auer, R., Frost, J., Gambacorta, L., Monnet, C., Rice, T., & Shin, H. S. (2022). Central
bank digital currencies: Motives, economic implications, and the research frontier.
Annual Review of Economics, 14(1), 697–721.
Barrdear, J., & Kumhof, M. (2016). The macroeconomics of central bank issued digital
currencies. SSRN Electronic Journal.
Barrdear, J., & Kumhof, M. (2022). The macroeconomics of central bank digital
currencies. Journal of Economic Dynamics & Control, 142, Article 104148.
BBC (2022). Ukraine conflict: What is swift and why is banning Russia so significant?
- BBC news.
Bech, M. L., & Garratt, R. (2017). Central bank cryptocurrencies. (p. 16).
Benos, E., Garratt, R., & Gurrola Perez, P. (2017). The economics of distributed ledger
technology for securities settlement. SSRN Electronic Journal.
Bijlsma, M., van der Cruijsen, C., Jonker, N., & Reijerink, J. (2021). What triggers
consumer adoption of CBDC?. 6 citations (Crossref) [2023-03-20].
16

## Page 17

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.

Goodfriend, M. (2000). The case for unencumbering interest rate policy at the zero
bound. (p. 34).
Goodhart, C. A. E. (1998). The two concepts of money: implications for the analysis
of optimal currency areas. European Journal of Political Economy, 14(3), 407–432.
Graeber, D. (2014). Debt : The first 5,000 years / David Graeber (Updated and expanded
ed.). Brooklyn, NY ; London: Melville House, [2014].
Griffoli, T., Peria, M., Agur, I., Ari, A., Kiff, J., Popescu, A., & Rochon, C. (2018).
Casting light on central bank digital currencies. Staff Discussion Notes, 18, 1.
Gross, J., Sedlmeir, J., Babel, M., Bechtel, A., & Schellinger, B. (2021). Designing a
central bank digital currency with support for cash-like privacy. SSRN Electronic
Journal.
Group of Central Banks (2018). Cross-border interbank payments and settlements: Technical
report, (p. 68).
Group of Central Banks (2020). Central bank digital currencies: foundational principles and
core features: Technical report.
Haber, S., & Stornetta, W. S. (1991). How to time-stamp a digital document. Journal
of Cryptology, 3(2), 99–111.
He, D., Leckow, R., Haksar, V., Mancini, T., Jenkinson, N., Kashima, M.,
Khiaonarong, T., Rochon, C., & Tourpe, H. (2017). Fintech and financial services:
Initial considerations. (p. 49).
Henry, C. S., Huynh, K., & Welte, A. (2018). 2017 Methods-of-payment survey report.
Number: 2018-17 Publisher: Bank of Canada.
Hoang, Y. H., Ngo, V. M., & Bich Vu, N. (2023). Central bank digital currency: A
systematic literature review using text mining approach. Research in International
Business and Finance, 64, Article 101889.
Ingham, G. (2004). The nature of money. (p. 12).
Jonker, N. (2018). What drives bitcoin adoption by retailers.
Kahn, C. M., & Rivadeneyra, F. (2020). Security and convenience of a central bank
digital currency. (p. 7).
Kahn, C. M., Rivadeneyra, F., & Wong, T.-N. (2019). Should the central bank issue emoney? Technical report 2019–3, Federal Reserve Bank of St. Louis, Publication Title:
Working Papers.
Kahn, C., & Roberds, W. (2009). Why pay? An introduction to payments economics.
Journal of Financial Intermediation, 18(1), 1–23, Publisher: Elsevier.
Kaminska, I. (2021). Is the central bank panic about the PBOC coin justified? Financial
Times.
Keister, T., & Monnet, C. (2022). Central bank digital currency: Stability and
information. Journal of Economic Dynamics & Control, 142, Article 104501.
Keister, T., & Sanches, D. (2021). Should central banks issue digital currency? Working
paper (Federal Reserve Bank of Philadelphia) 21–37, (pp. 21–37). Federal Reserve
Bank of Philadelphia, Series: Working paper (Federal Reserve Bank of Philadelphia).
Kiff, J., Alwazir, J., Davidovic, S., Farias, A., Khan, A., Khiaonarong, T., Malaika, M.,
Monroe, H., Sugimoto, N., Tourpe, H., & Zhou, Z. (2020). A survey of research on
retail central bank digital currency. SSRN Electronic Journal.
Kim, Y. S., & Kwon, O. (2019). Central bank digital currency and financial stability.
King, R. (2020). The central bank digital currency survey 2020 – debunking some
myths.
Kiyotaki, N., & Wright, R. (1989). On money as a medium of exchange. Journal of
Political Economy, 97(4), 927–954, Publisher: University of Chicago Press.
Kiyotaki, N., & Wright, R. (1993). A search-theoretic approach to monetary economics.
The American Economic Review, 83(1), 63–77, Publisher: American Economic
Association.
Klein, T., Pham Thu, H., & Walther, T. (2018). Bitcoin is not the new gold – a
comparison of volatility, correlation, and portfolio performance. International Review
of Financial Analysis, 59, 105–116.
Kumhof, M., & Noone, C. (2021). Central bank digital currencies — Design principles
for financial stability. Economic Analysis and Policy, 71, 553–572.
Lagarde, C. (2020). Payments in a digital world.
Levey, S. (2022). Statement by diem CEO stuart levey on the sale of the diem group’s
assets to silvergate | diem association.
Li, J. (2022). Predicting the demand for central bank digital currency: A structural
analysis with survey data. Journal of Monetary Economics.
Mancini-Griffoli, T., Peria, M. S. M., Agur, I., Ari, A., Kiff, J., Popescu, A., & Rochon, C.
(2019). Casting light on central bank digital currency. In Cryptoassets (pp. 307–340).
Oxford University Press.
Maryaningsih, N., Nazara, S., Kacaribu, F. N., & Juhro, S. M. (2022). Central bank
digital currency: What factors determine its adoption? Buletin Ekonomi Moneter dan
Perbankan, 25(1), 1–24.
McAndrews, J. J. (2020). The case for cash. Latin American Journal of Central Banking,
1(1), Article 100004.
Meaning, J., Dyson, B., Barker, J., & Clayton, E. (2018). Broadening narrow money:
Monetary policy with a central bank digital currency. SSRN Electronic Journal.
Menger, K. (1892). On the origin of money. The Economic Journal, 2(6), 239–255,
Publisher: [Royal Economic Society, Wiley].
Mersch, Y. (2018). Virtual or virtueless? The evolution of money in the digital age.
Meta (2022). Meta earnings presentation Q3 2022.
Monnet, C. (2021). Central bank account for all: Efficiency and risk taking.
Monnet, E., Riva, A., & Ungaro, S. (2021). The real effects of bank runs. Evidence from
the French great depression (1930–1931).
Morgan Stanley (2016). Global financials / FinTech: Global insight: Blockchain in
banking: Disruptive threat or tool? (p. 31).
Morris, D. Z. (2022). 1 year of bitcoin in el salvador: The bad, the good and the ugly.
Section: Layer 2.

Carapella, F., & Flemming, J. (2020). Central bank digital currency: A literature review.
Carney, M. (2019). The growing challenges for monetary policy in the current
international monetary and financial system.
Carstens, A. (2022). Digital currencies and the soul of money.
Cecchetti, S., & Schoenholtz, K. (2017). Banking the unbanked: The Indian revolution.
Chapman, J., Garratt, R., Hendry, S., McCormack2, A., & McMahon, W. (2017). Project
jasper: Are distributed wholesale payment systems feasible yet? Technical report, (p. 11).
Chen, H., & Siklos, P. L. (2022). Central bank digital currency: A review and some
macro-financial implications. Journal of Financial Stability, 60, Article 100985.
Chiu, J., Davoodalhosseini, S. M., Hua Jiang, J., & Zhu, Y. (2019). Bank market power
and central bank digital currency: Theory and quantitative assessment. Available
at SSRN 3331135.
Chiu, J., & Koeppl, T. V. (2017). The economics of cryptocurrencies—Bitcoin and
beyond. MAG ID: 3122961627.
Chiu, J., & Koeppl, T. (2019). Blockchain-based settlement for asset trading. The Review
of Financial Studies, 32(5), 1716–1753, Publisher: Society for Financial Studies.
Chiu, J., & Wong, T.-N. (2021). Payments on digital platforms: Resiliency,
interoperability and welfare. 21(4), Article 104173, MAG ID: 3135362039.
Chorzempa, M. (2021). China, the United States, and central bank digital currencies:
How important is it to be first?.
CipherTrace (2021). CipherTrace announces monero tracing capabilities - CipherTrace.
Claussen, C.-A., Armelius, H., & Hull, I. (2021). On the possibility of a cash-like CBDC.
(p. 15).
Clower, R. (1967). A reconsideration of the microfoundations of monetary theory.
Economic Inquiry, 6(1), 1–8, _eprint: https://onlinelibrary.wiley.com/doi/pdf/10.
1111/j.1465-7295.1967.tb01171.x.
CPMI (2015). Digital currencies: Technical report, (p. 24).
CPMI (2018). Central bank digital currencies: Technical report.
Danezis, G., & Meiklejohn, S. (2015). Centrally banked cryptocurrencies.
Davoodalhosseini, S. M. (2022). Central bank digital currency and monetary policy.
Journal of Economic Dynamics & Control, 142, Article 104150.
Davoodalhosseini, M., Rivadeneyra, F., & Zhu, Y. (2020). CBDC and monetary policy.
Number: 2020-4 Publisher: Bank of Canada.
Diez de los Rios, A., & Zhu, Y. (2020). CBDC and monetary sovereignty. Number:
2020-5 Publisher: Bank of Canada.
Digital Euro Project Team (2022). Programmable payments in digital euro.
Dinh, T. T. A., Wang, J., Chen, G., Liu, R., Ooi, B. C., & Tan, K.-L. (2017).
BLOCKBENCH: A framework for analyzing private blockchains. arXiv:1703.04057
[cs].
Dionysopoulos, L. (2022). Post mortem: The death of LUNA & TerraUSD, explained
simply.
Disparte, D. A. (2019). Why enterprise blockchain projects fail. Section: Crypto &
Blockchain.
Dong, M., & Xiao, S. X. (2021). Central bank digital currency: a corporate finance
perspective. SSRN Electronic Journal.
Dyson, B., & Hodgson, G. (2016). Why central banks should start issuing electronic
money. (p. 44).
ECB (2020). Report on a digital euro: Technical report, (p. 55).
ECB (2021). Eurosystem report on the public consultation on a digital euro.
ECB (2022). Study on the payment attitudes of consumers in the euro area (SPACE) –
2022. (2022).
Eichengreen, B., & Flandreau, M. (2005). Gold standard in theory & history (0th ed.).
Routledge.
Engels, D. W. (1980). Alexander the great and the logistics of the macedonian army.
Engert, W., & Fung, B. (2017). Central bank digital currency: Motivations and
implications. Number: 2017-16 Publisher: Bank of Canada.
Erlandsson, F., & Guibourg, G. (2018). Times are changing and so are payment patterns:
Technical report, (p. 9).
Fanti, G., Lipsky, J., & Moehr, O. (2022). Central bankers’ new cybersecurity challenge.
Fernández-Villaverde, J., Sanches, D., Schilling, L., & Uhlig, H. (2021). Central bank
digital currency: Central banking for all? Review of Economic Dynamics, 41, 225–242.
Ferrari Minesso, M., Mehl, A., & Stracca, L. (2022). Central bank digital currency in
an open economy. Journal of Monetary Economics, 127, 54–68.
Foster, K., & Greene, C. (2021). Consumer behavior in a health crisis: What happened
with cash? Policy Hub, Number: 2021-1 Publisher: Federal Reserve Bank of Atlanta.
Friedman, M. (1960). Moorhouse I.X. Millar lecture series, A program for monetary stability.
New York: Fordham University Press, OCLC: 245773.
FSB (2022). Review of the FSB high-level recommendations of the regulation, supervision
and oversight of ‘‘global stablecoin’’ arrangements: Consultative report: Technical report.
Fung, B. S. C., & Halaburda, H. (2016). Central bank digital currencies: A framework
for assessing why and how.
G7 (2019). Investigating the impact of global stablecoins: Technical report.
Garratt, R. J., & Lee, M. J. (2022). Monetizing privacy with central bank digital
currencies.
Garratt, R., & van Oordt, M. (2021). Privacy as a public good: A case for electronic cash.
Journal of Political Economy, 129(7), 2157–2180, Publisher: University of Chicago
Press.
Gartner (2019). Gartner predicts 90% of current enterprise blockchain platform
implementations will require replacement by 2021.
Gigichina (2022). China’s digital currency and blockchain network: Disparate projects
or two sides of the same coin?
17

## Page 18

International Review of Financial Analysis 91 (2024) 103031

L. Dionysopoulos et al.
Nakamoto, S. (2009). Bitcoin: A peer-to-peer electronic cash system. Cryptography
Mailing list at https://metzdowd.com.
Nobanee, H., Ellili, N. O. D., Dilshad, M. N., Alshamsi, M., & Daher, B. (2022).
Mapping central bank and digital currency: A taxonomical study using bibliometric
visualization and systematic analysis.
Panetta, F. (2018). 21St century cash: Central banking, technological innovation and
digital currencies. Central Banking, (40).
Plosser, C. I. (2019). A limited central bank.
Quarles, R. K. (2021). Speech by vice chair for supervision quarles on central bank
digital currency.
Raskin, M., & Yermack, D. (2016). Digital currencies, decentralized ledgers, and the
future of central banking. NBER Working Papers, Number: 22238 Publisher: National
Bureau of Economic Research, Inc.
Rogoff, K. S. (2015). Costs and benefits to phasing out paper currency. In NBER
macroeconomics annual 2014, Vol. 29 (pp. 445–456).
Rogoff, K. (2016). The curse of cash.
Ruttenberg, W. (2016). Distributed ledger technologies in securities post-trading: Technical
report, (p. 35).
Santander (2016). The fintech 2 0 paper.pdf: Technical report, (p. 20).
Savage, R., Howcroft, E., & Howcroft, E. (2022). Central African Republic delays crypto
token listing, cites ‘market conditions’. Reuters.
Schilling, L., Fernández-Villaverde, J., & Uhlig, H. (2020). Central bank digital currency:
When price and bank stability collide. National Bureau of Economic Research, MAG
ID: 3139916637.
Scorer, S. (2017). Central bank digital currency: DLT, or not DLT? That is the question.
Simmons, R., Dini, P., Culkin, N., & Littera, G. (2021). Crisis and the role of money in
the real and financial economies—An innovative approach to monetary stimulus.
Journal of Risk and Financial Management, 14(3), 129.

Sveriges Riksbank (2018). The Riksbank’s e-krona project ; Report 2: Report 2, The
Riksbank’s e-krona project; Report 2. Stockholm, Stockholm: Sveriges Riksbank.
Tronnier, F., Recker, M., & Hamm, P. (2020). Towards central bank digital currency a systematic literature review.
Uberti, D. (2022). Surveillance risks shape how central banks test digital currencies.
Wall Street Journal.
Varoufakis, Y. (2013). Economic controversies, The global minotaur: America, Europe, and
the future of the global economy (New and updated ed.). London, New York: Zed
Books; Distributed in U.S.A. by Palgrave Macmillan, OCLC: 810117720.
Wang, Z. (2020). Tax compliance, payment choice, and central bank digital currency.
SSRN Electronic Journal.
Wang, Y., Lucey, B. M., Vigne, S. A., & Yarovaya, L. (2022). The effects of central
bank digital currencies news on financial markets. Technological Forecasting and
Social Change, 180, Article 121715.
Williamson, S. D. (2022). Central bank digital currency and flight to safety. Journal of
Economic Dynamics & Control, 142, Article 104146.
Wood, G. (2015). Poa private chains. original-date: 2015-08-08T12:16:59Z.
World Bank (2021). Central bank digital currencies for cross-border payments: a review of
current experiments and ideas. World Bank.
Yeyati, E. L. (2021). Financial dollarization and de-dollarization in the new millennium: School of government working papers, Number: wp_gob_2021_02 Publisher:
Universidad Torcuato Di Tella.
Zetzsche, D. A., Buckley, R. P., & Arner, D. W. (2019). Regulating LIBRA: The
transformative potential of facebook’s cryptocurrency and possible regulatory
responses.

18
