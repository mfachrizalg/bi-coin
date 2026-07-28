---
source_type: pdf
title: "Implementing a retail CBDC: Lessons learned and key insights"
original_file: "thesis/reference/Implementing a retail CBDC_ Lessons learned and key insights.pdf"
sha256: "7de6d1a41491fc789bc506724a2176647c1c959461e0e5283579d052a9acc65d"
page_count: 10
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Implementing a retail CBDC: Lessons learned and key insights

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Latin American Journal of Central Banking 2 (2021) 100022

Contents lists available at ScienceDirect

Latin American Journal of Central Banking
journal homepage: www.elsevier.com/locate/latcb

Implementing a retail CBDC: Lessons learned and key insights ✩
Raúl Morales-Resendiz a,∗, Jorge Ponce b, Pablo Picardo b, Andrés Velasco c,
Bobby Chen d, León Sanz e, Gabriela Guiborg f, Björn Segendorﬀ f, José Luis Vasquez g,
John Arroyo h, Illich Aguirre h, Natalie Haynes i, Novelette Panton i, Mario Griﬃths i,
Cedric Pieterz j, Allister Hodge k
a CEMLA, Mexico
b

Banco Central del Uruguay, Uruguay
Banco de la República, Colombia
d
Central Bank of the Bahamas, Bahamas
e
Banco Central de Chile, Chile
f
Sveriges Riksbank, Sweden
g
Banco Central de Reserva del Perú, Peru
h
Banco Central del Ecuador, Ecuador
i
Bank of Jamaica, Jamaica
j
Centrale Bank van Curaçao en Sint Maarten, Curaçao
k
Eastern Caribbean Central Bank, St. Kitts and Nevis
c

a b s t r a c t
Motivations for introducing a retail central bank digital currency (CBDC) could range from a rapid decline in the use of physical cash or ﬁnancial
inclusion strategies to an underdeveloped retail payment market. The COVID-19 pandemic and the emergence of global stablecoins proposals have
heightened the interest in exploring the introduction of a rCBDC. With the aim of informing these eﬀorts before, during and after its potential
implementation, we explore recently launched pilots in three jurisdictions. We aim to provide relevant lessons on the design, operation and implementation of such a new digital form of ﬁat money. Notably, despite diﬀerences among jurisdictions and CBDC pilots, a series of key insights
emerge from these experiences that could be useful for those thinking to launch a rCBDC.

Introduction
In the past few years, an increasing number of central banks have explored how and why they should issue digital money for general purposes beyond cash and central bank reserves, with the latter only available to banks and
other ﬁnancial system participants. Motivations for central bank digital currencies (rCBDCs), especially in emerging markets and developing economies (EMDEs), range from major eﬃciency gaps in the domestic payment infrastructure to
broadening ﬁnancial inclusion (CEMLA, 2019; Mancini-Griﬀoli et al., 2018). At the same time, rCBDC has become fertile
soil to test whether decentralized ledgers and new technologies could help modernize traditional payment infrastructure1

✩
Our work is the result of the activities of the Central Bank Digital Currencies Working Group (CBDC WG) hosted by the Center for Latin American
Monetary Studies (CEMLA). Special thanks to Peer Review teams and to Dr. Serafín Martínez-Jaramillo, CEMLA, and José Manuel Marqués, Banco
de España, for their thoughtful comments.
∗
Corresponding author.
E-mail addresses: mmorales@cemla.org, lsanchez@cemla.org (R. Morales-Resendiz).
1
For example, the Bank of England recently published a policy paper discussing the opportunities and challenges of a rCBDC after only a couple
of years of a major reform of their RTGS system.

https://doi.org/10.1016/j.latcb.2021.100022
Received 20 October 2020; Received in revised form 27 November 2020; Accepted 25 February 2021
Available online 19 March 2021
2666-1438/© 2021 The Author(s). Published by Elsevier B.V. on behalf of Center for Latin American Monetary Studies. This is an open access
article under the CC BY-NC-ND license (http://creativecommons.org/licenses/by-nc-nd/4.0/)

## Page 2

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

to make digital payment means widely available. The COVID-19 pandemic and the emergence of global stablecoins2 (GSCs) proposals
such as Libra by Facebook (Libra, 2019) have helped rCBDC to gain traction and greater attention from policymakers worldwide (BIS,
2020b; Shin, 2020).
While central banks from Ecuador, Uruguay and Ukraine have already completed pilot programs3 pondering design and technology
with diﬀerent approaches to meet their own institutional priorities, the list of central banks launching rCBDC pilots has increased
over the last year. Central banks from the Bahamas, China, the Eastern Caribbean Currency Union, Korea, South Africa and Sweden
are running or are closer to launching pilot programs (Boar and Wehrli, 2021; Boring and Kaufman, 2019; CPMI, 2018; Kiﬀ et al.,
2020). Moreover, central banks from Brazil, Canada, Chile, the European Central Bank and Jamaica have recently established internal
multidisciplinary groups to approach the subject with ﬁner eyes. In all cases, a thorough and cautious analysis has taken place before
embarking on an implementation/testing plan, especially regarding the motivations and operationalization of such projects.
We peer-reviewed three rCBDC pilots—one in the Caribbean, one in Europe and one in Latin America—to draw conclusions on
testing with a rCBDC system. Our main goal is to provide relevant lessons on the design, operation and implementation aspects of
such projects. As can be expected, the starting conditions and objectives for CBDC pilots diﬀered among jurisdictions. Interestingly,
common lessons emerged.
Our main ﬁndings relate to how central banks set up rCBDC pilot programs. Above all, central banks are guided by foundational
principles related to how rCBDC systems may be intended to become public–private partnerships, aspiring to supplement cash and
fulﬁll a wide range of population needs, not endangering the capacity of the central bank to safeguard its overarching objectives of
monetary and ﬁnancial stability (Bordo and Levin, 2017; Kahn et al., 2019). The pilot programs showed that the role of the central
bank is critical at all times, but dual roles in the payment system require a delicate execution of its operating and overseeing roles.
Leadership of a central bank should not be the subject of debate, either. In EMDEs, including those in Latin America and the Caribbean,
rCBDC pilots are mainly regarded as central bank policy to build an inclusive payment ecosystem in response to considerable gaps in
ﬁnancial access. Relatedly, the introduction of a CBDC would serve to strengthen the cooperation of central banks, payment service
providers4 (PSPs) and other related parties to deploy digital ﬁat money as a means of payment.
Other important design issues follow. For instance, monthly limits, amount thresholds and interest-bearing for rCBDC holdings
have been chosen as features to circumvent unintended consequences in ﬁnancial intermediation and monetary policy implementation. In terms of technology, we found that central banks are further testing with decentralized technologies to underpin a rCBDC
system. However, the scale of the pilot programs and the evolving nature of these technologies force policymakers to carefully approach such new technologies. All in all, the decision whether conventional or not should be the processing infrastructure will depend
on the design of the CBDC and its expected features.
Interestingly, the CPMI-IOSCO Principles for Financial Market Infrastructures (PFMI) are a powerful device to assess the operational, governance, access and business management, and ﬁnancial risk management of a rCBDC (Committee on Payments and Market
Infrastructures, 2012). Using the PFMI could be a wise approach for a central bank prior to launching a rCBDC system, because it
comprehensively considers the several aspects of a payment infrastructure, going beyond the high-level policymaking aspects of an
analytical framework.
In the next sections, we unfold the main ﬁndings and lessons learned from the peer review exercise. While we think they will be
useful for policymakers studying the topic, we acknowledge the limits of the analysis: we assessed just three of the many available
experiences worldwide, which were limited pilot programs. In general, we found that the potential of a rCBDC to either become
a leading instrument in the retail payment system or provoke unintended consequences on intermediation or disintermediation,
competition and stability, requires further academic research, experimentation and policy discussion to which we aim to contribute.
In the remainder of this report, we present a brief but relevant survey of literature in Section 2. Section 3 introduces the methodology and presents the main results of the peer review. Section 4 outlines some conclusions and issues for discussion.
2. A retail CBDC framework
The international ﬁnancial community, academia and other relevant parties are increasingly working toward a common CBDC
analytical framework. Filling this gap is as relevant as experimentation to support policymaking for designing digital ﬁat money. In
this section, we identify some of the guiding principles and relevant features for a rCBDC framework.
A rCBDC framework can be much more useful once the motivation for a CBDC system is identiﬁed. There can be diﬀerent reasons
for central banks to investigate CBDCs. EMDEs and advanced economies diﬀer signiﬁcantly in their motivations to examine a rCBDC.
EMDEs have important reasons to work on rCBDCs given their current generally underdeveloped state of domestic payment eﬃciency
and inclusion. Other important reasons concern cash: in jurisdictions where cash is king (Khiaonarong and Humphrey, 2019), and
in the absence of alternatives, a rCBDC may reduce the cost of cash management. Meanwhile, advanced economies are spurred to
consider rCBDCs mainly to improve safety in the payment infrastructure.

2 According to the Financial Stability Board, a GSC comprises an arrangement that combines a range of functions and their related activities to
provide an instrument for use as a means of payment and/or store of value. It relies on a crypto-asset that aims to maintain a stable value relative
to a speciﬁed asset, or a pool or basket of assets.
3
The Central Bank of Ecuador launched a rCBDC project named BCE Dinero Electrónico between 2014 and 2017. The Central Bank of Uruguay
launched its own e-Peso project between 2018 and 2019. The Central Bank of Ukraine launched the “e-hryvnia” project between 2016 and 2019.
4
We refer to PSPs as any banking or nonbanking entities authorized to provide a payment service.

2

## Page 3

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

Still, each case is likely to be unique; to accompany such motivations, it is important to have an analytical support on how to
proceed. Several authors5 identify few but very important guiding principles and a broader list of key aspects that can make a CBDC
framework for each type of case and the reasoning for each (Center for Latin American Monetary Studies - CEMLA, 2019; Kumhof and
Noone, 2018). Above all, the literature converges on the priming role of central banks to ensure the smooth functioning of payment
systems, which is circumscribed in the overarching mandates of ﬁnancial and monetary stability.
The guiding principles should chieﬂy concern the decision to introduce a rCBDC, followed by its design. The principles are in eﬀect
the foundational pillars. First, rCBDC may need to coexist with cash and other trusted, private monies (Center for Latin American
Monetary Studies, 2020). Second, it will require a public–private partnership to avoid harming innovation, eﬃciency and risk management in the provision of payment (Brunnermeier and Niepelt, 2019). Third, rCBDC implementation must not interfere with the
central bank mandates, given the technology and operational challenges that such a system could represent (Davoodalhosseini Seyed
and Rivadeneyra, 2020).
When speaking of key features, the literature is inconclusive, and experimentation is once more a critical source of knowledge to
deﬁne a framework. This can be explained because of the complex balance of cooperation and competition between a central bank
and private PSP in the implementation of a rCBDC. For instance, according to Adrian and Mancini-Griﬀoli (2019), cash and bank
deposits compete with new forms of digital money, mainly e-money. Such forms of money diﬀer from rCBDCs given they are claims
not issued by a central bank, but are ﬁat-pegged. Adrian and Mancini-Griﬀoli (2019) argue that e-money6 service providers could
have access to central bank reserves under strict conditions to issue what they call a “synthetic CBDC.”
Auer and Boehme (2020) considered a rCBDC where the central bank is the sole issuer and service provider, with no PSP intervention to support the rollout. While this model is unlikely in practice, they suggest two variants: indirect- and hybrid-rCBDC.
Their main diﬀerences relate to the structure of the legal claim. Notwithstanding these potential diﬀerences, they argue that having
a two-tier7 system could become common. Relatedly, Ayuso and Conesa (2020) contribute by showing that behind rCBDC, the most
relevant aspects to consider are: 1) how central bank digital money can be made widely available (like cash), and 2) how necessary
the engagement of the private sector (e.g. PSPs) is to roll out digital cash.
Furthermore, Kahn et al. (2019) suggest that the discussion about CBDC features is necessarily linked to an assessment of the
underlying payment infrastructure, so issuing digital money does not follow directly from the fact that central banks issue physical
cash.
With this in mind, we propose a set of key features that would work as critical enablers for a rCBDC framework (Fig. 1). Importantly,
these features consider that the CBDC is a digital representation of ﬁat money,8 relying on a supporting payment infrastructure (BoE,
2020; Ponce, 2019).
First, relative to money, rCBDC should be legal tender that is convertible into cash and other private monies, implying that it will
have a stable value. Second, it should be universally accepted as another transactional means to exchange value between peers of
retail payers and payees. Third, it should help to supplement cash for retail transactions with digital convenience and little or no cost.
Fourth, relative to payments, a rCBDC should run on a secure, resilient and adaptable payment infrastructure, whether existing or
new. Fifth, a rCBDC system should be ultimately interoperable, fully available (24/7) and work on the basis of standards and rules.
Finally, the CBDC system should be comprised of a competitive ecosystem that provides instant, safe and cheap overlay servicing to
ﬁnal end users (Fig. 1).
Notably, this framework entails principles that can vary little from one jurisdiction to another, as they evoke common central
banking mandates. For instance, it seems unlikely to pursue a rCBDC design for which a central bank does everything with no private
sector participation. Key features may work diﬀerently according to design choices under consideration. However, it seems reasonable
that central banks will cautiously assess the implications for monetary policy and ﬁnancial intermediation.
In sum, rCBDC systems and their respective designs are likely to diﬀer signiﬁcantly worldwide, as the objectives pursued and the
features of such a digital form of money may obey very speciﬁc circumstances of each jurisdiction. But there is a common ground
that will deﬁnitively govern the design, operation and implementation processes for central banks embarking on rCBDC exploration.

5
Adrian and Mancini-Griﬀoli (2019), Auer and Boehme (2020), Bech and Garrat (2017), Bindseil (2020), Brunermeier et al. (2019), Dyson and
Hodgson (2017), Kahn et al. (2018), Kiﬀ et al. (2020) and Kumhof and Noone (2019), among others.
6
E-money solutions have been available since the early 2000s, but the attention of policymakers toward them increased worldwide after 2007,
when the M-Pesa model gained a space as a means of payment in Africa. A similar phenomenon took place in Latin America and the Caribbean with
Tigo Money, which started to operate around ten years ago in Central American countries and a few South American jurisdictions. Both shared a
common feature: they were not initially licensed or regulated by central banks but were rapidly adopted by a population lacking adequate retail
payment infrastructure, leading the central bank and ﬁnancial authorities to work toward a regulatory framework. In other words, they became
what Adrian and Mancini-Griﬀoli (2019) termed b-money, but without serving as traditional bank accounts.
7
Such a system implies the coexistence of public and private sectors playing speciﬁc roles and layers of functionality in the ﬁnancial and payment
system. Generally speaking, central banks play key roles of issuing money and providing backbone infrastructure, whereas ﬁnancial intermediaries
(and now, other new PSPs) are delegated diﬀerent roles to make payment and ﬁnancial services available. For instance, PSPs tend to compete in
oﬀering overlay services to end users, but depend on a single issuance of money. Likewise, operating a payment infrastructure is a role the private
sector commonly plays.
8
Kiﬀ et al. (2020) also support underlining the importance of having a monetary authority issue a rCBDC as a claim held by the public.

3

## Page 4

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

Fig. 1. Key features of a retail CBDC.

2.1. Risks and opportunities
Central banks undertake several tasks in the new ﬁnancial landscape. They presently support the development of retail payment
services, broadening ﬁnancial inclusion while safeguarding the smooth functioning of domestic payment infrastructures (Bech and
Hancock, 2020; BIS, 2020a; Fernández-Villaverde et al., 2020). This recent experience makes central banks well positioned to overcome coordination obstacles to introducing rCBDC, as discussed in Ponce (2020). That capacity of central banks is of utmost relevance
in light of the complex task of achieving a CBDC design that embraces the key features and meets the suggested principles noted earlier. Yet the task is not trivial, and requires central banks to proceed cautiously. This could lead to new opportunities and challenges.
We identify three potential situations presenting risks and opportunities for rCBDCs.
First, central banks could select an adverse rCBDC system instead of exploring alternative routes to meet the expected goals of
a CBDC—for instance, with a fast payment scheme (BIS, 2020a; Ponce, 2020). Adrian and Mancini-Griﬀoli (2019) argue that CBDC
adoption will not necessarily be very high and will depend on the attractiveness of alternative forms of money.
Second, GSCs constitute a major challenge related to money and payment in general. GSCs in particular have reinforced interest
from the international central banking community to ensure that safe, convenient and accessible digital means of payment are
available. This will become crucial due to the risk for ﬁat money to be replaced by non-regulated monies, especially in EMDEs. As
such, rCBDCs could serve as counterbalances for such initiatives, combining both the digital nature of GSCs and, more importantly,
the trust and institutional support of a monetary authority.
Third, as a matter of fact, the COVID-19 pandemic has accelerated interest in rCBDCs as a potential contingency tool to deploy
public resources to households and businesses on a national basis. Amid this context, it has become evident that having a universal,
widely accessible payment means like digital cash could be useful during lockdowns and to adopt social distancing measures.
2.2. Technology issues for retail CBDCs
Central banks worldwide started monitoring decentralized technologies in ﬁnance with the emergence of Bitcoin. Blockchain
platforms underpinning ﬁnancial market infrastructures are indeed a topic of growing interest and experimentation. Several projects
testing decentralized technologies to enable wholesale payment have been documented: Jasper, Stella and Ubin are just a few of
them.
Nevertheless, conventional centrally operated payment infrastructures have crossed over several reforms during the last twenty
years, and continue to modernize on an ongoing basis. Both industry players and central banks have been pushed to ensure their
platforms can safely face larger streams of real-time transactions. Apart from technology capability, there have been market issues
not fully addressed by conventional payment infrastructures, especially in EMDEs.9 This has reinforced interest in what decentralized
technologies can do to enhance the payment rails.
Numerous issues are associated with technology for rCBDCs. These are more than relevant to its design, but some of them deserve
special attention by policymakers (Keister and Sanches, 2020). Auer and Boehme (2020) propose a few high-level questions for the
9
There is a considerable gap in ﬁnancial access in EMDEs. This ﬁnancial inclusion concern is of special relevance in Latin America and the
Caribbean (LAC). According to the World Bank Global Findex 2018, barely 20% of the poorest population in LAC holds or uses a debit card, while
the percentage for advanced economies (AEs) surpasses 80%. Moreover, only 10% of the population in LAC have accessed their accounts using
mobile phones or internet, and only around 5% have a mobile money account. Likewise, only one-third of the population in LAC sent or received
digital payment throughout the year, while the percentage rose to 90% in AE.

4

## Page 5

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

Table 1
Peer review roles of CBDC project members.
Interviewees

Interviewers

Bahamas
Sweden
Uruguay

Peru and Uruguay
Bahamas, Chile and Ecuador
Colombia and Eastern Caribbean

operational architecture of the rCBDC system. First, given the importance of featuring cash-like safety, a rCBDC system can be built
in which the central bank directly oﬀers claims (CBDC holdings) to end users, or alternatively, one where claims are indirect via PSP.
Second, in light of the nationwide scope of a rCBDC, a platform could be built in which the central bank handles only core strategic
roles such as minting (i.e. issuing digital banknotes and coins) and data management (i.e. monitoring the identity of each spent digital
banknote in circulation, safeguarding end users’ privacy (Garratt and van Oordt, 2020)), instead of centralizing all daily operations
of such a system.10
The above can be unfolded in a choice question: whether to underpin the rCBDC system on a conventional database, decentralized
protocols, or a combination of both. Existing centrally operated infrastructures and new ones relying on distributed ledger technology
(DLT) diﬀer in their setup and functioning. Novel developments with decentralized technologies are showing that DLT could achieve
valuable characteristics that are complex to implement in legacy payment systems. However, interoperable arrangements to support
a hybrid/synthetic CBDC are not yet achievable. For instance, interoperability could be structured properly within the core system
under certain architecture options (Musa et al., 2021). DLT is rapidly evolving on issues related to scalability and privacy that were
previously questioned. These issues are already addressed by enhanced consensus algorithms and are under test by conventional
infrastructures, such as the Bank of Canada’s Jasper project and other similar central bank initiatives. In light of this, policymakers
have much more to decide about technology and its implications for design features and operational capacity for a rCBDC system.
This analysis is critical to ensure that a rCBDC runs safely, eﬃciently and on a nationwide basis, just as cash does. As argued
by Townsend, 2019, any single choice of technology may also depend on legal aspects that vary on a country-by-country basis.
Furthermore, the economic, ﬁnancial and institutional setup in each jurisdiction will also inﬂuence which technologies suit it best.
Thus, understanding and experimenting with how a rCBDC system works, whether using conventional or decentralized technology,
will be key in looking ahead.
Lessons learned
The reports from BIS (2020b) and CEMLA (CEMLA (2019)) agreed in stating that there is no one-size-ﬁts-all solution for rCBDC;
every case has its own motivation and faces a very speciﬁc institutional setup. To aid in this process, some guiding principles, as
mentioned in Section 2, would be of great relevance together with academic research and experimentation. Our contribution focuses
on the latter element.
We peer reviewed rCBDC pilot studies in the Bahamas, Sweden and Uruguay with the main objective of examining their design,
operation and implementation. In the following subsections, we describe our methods and present a summary of results.
3.1. Peer review methodology
Our reviews11 consisted of a series of interviews and exchanges by mail, conference calls and videoconferences for each rCBDC
pilot study. We followed a methodology based on our own experiences with CBDC piloting. Each pilot program had an interviewee
and a group of 2–3 interviewers, as seen in Table 1.
The peer review methodology did not stipulate a common questionnaire, but just some guidelines on key topics, such as design,
implementation and operation. It is also worth mentioning that starting conditions and objectives were diﬀerent among jurisdictions. Interestingly, common concerns and messages emerged naturally, allowing us to extract general lessons that applied to all the
experiences reviewed.
3.2. Lessons from CBDC pilot programs
The following are brief summaries of the most relevant lessons learned in each rCBDC pilot study. This summary is not intended to
be exhaustive, but rather to provide insightful takeaways of the experiences of each study, bearing in mind their current progress and
key areas of development. Table 2 shows a summary of the main similarities and diﬀerences of the pilot programs under consideration.
The Sand Dollar
In the case of the rCBDC pilot program in the Bahamas, a preliminary assessment indicated that the Central Bank of The Bahamas
(CBOB) set high requirements to deliver a solution that was robust against international regulatory standards, including technological
10

See Garratt and van Oordt (2020), Huynh et al. (2020), and Kahn et al. (2018).
Reviewers’ full reports can be found as supplementary material in the online version of our article. They contain detailed ﬁndings that we
discussed with the interviewees.
11

5

## Page 6

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

Table 2
RCBDC pilot studies: main similarities and diﬀerences.
Key aspects

Sand Dollar

e-Peso

e-Krona

Preliminary assessment

Pain points

Costly onboarding
Geographical access barriers
Financial inclusion Payment
modernization
Deliver a robust, scalable and
trustworthy CBDC system

High use of cash

Declining use of cash

Payment modernization
Financial inclusion
Test a technological
solution for digital ﬁat
money
Not considered
Considered
Considered
Not tested16
Considered
Proprietary software (not
DLT)
Not tested14
Considered
Token-based16 24/7 Risk
management in place

Sheer dominance of
private monies
Ensure the public
provision of digital
money
Not applicable
Not conﬁrmed
Not conﬁrmed
Not applicable16
Not applicable15
DLT16

Motivation
Preliminary goal

Principles-related
Features-related

Cash substitution
Public–private partnership
Convertibility
Universal acceptance
Cash coexistence
Payment infrastructure

Not considered
Considered
Considered
Considered
Considered
DLT

Interoperability
Competition
Others

Considered
Considered
Token-based 24/7 Risk
management in place Low cost
(for end users)

Not applicable15
Not conﬁrmed
Not available Risk
management tested16

solutions that would be scalable and trustworthy. As the Sand Dollar, the rCBDC, oﬀers real-time retail transactions, PSPs have no
control over transmission or settlement. Moreover, the envisioned ecosystem provides room for the private sector to play diﬀerent
roles while the central bank maintains control of the most strategic ones (i.e. minting and data protection) (Central Bank of the
Bahamas, 2019). Furthermore, there are no relevant payment processing diﬀerences between CBDC access channels using mobile- or
card-based account options, and there is no direct cost for the end user. In terms of privacy, whether there is a need to investigate
suspicious activity or not, PSPs may always request information on a particular transaction. In relation to the balance sheet of the
CBOB, the issuance of a CBDC will become a liability of the CBOB (same as ﬁat), but as the current pilot only represents a controlled
issuance of Sand Dollars, this would not necessarily inﬂate the monetary base, nor have other monetary policy implications.
Importantly, starting the project in one of the Bahamian islands was a crucial decision in order to eventually include the rest of
the population. A national survey on spending habits was a necessary part of preliminary project development. Coordination with the
private sector has been crucial as well—not only with PSPs, but also technological platforms, ﬁntech entities and other authorities.
In this rCBDC pilot program design, potential disintermediation risks are controlled by design. There are limits to the amount
of Sand Dollars that customers can hold, making the CBDC a transactional (payment) service. In relation to that, the CBOB has
a dashboard that allows overseeing the circulation of Sand Dollars daily, considering all needed measures to assure privacy and
usability.
Finally, the COVID-19 pandemic has led the CBOB to re-strategize with wider stakeholder groups on various community-building
initiatives. The CBOB further reﬁnes its current solutions in order to meet the future needs of changing economic and social norms
stemming from the pandemic.
The e-Peso
In the case of the Central Bank of Uruguay (BCU), after successfully conducting a rCBDC pilot program, future steps of the e-peso
are under consideration. It is not yet possible to estimate whether the e-peso will be adopted. Above all, the e-peso pilot has been
an enriching experience, since it has involved great eﬀort by an interdisciplinary team inside the BCU in collaboration with external
technological companies. Several technological aspects have been tested, and several other questions were raised and are under
evaluation thanks to the pilot study. One can underscore that concerns should be managed ex ante by the central bank. They include
safety policy and rules, market structure and industry dialogue, mainly.
The relatively limited scope of the pilot study does not allow us to extract precise conclusions on several aspects. For instance, it
was diﬃcult to tell whether the vendor solution used for the pilot program could support the use of the CBDC system for national
scope. As such a change could bring scalability challenges. This could be a red ﬂag for central banks when dealing with third-party
solutions providers to ensure the design of a CBDC can be met, endangering the operational capacity of the system.
A very preliminary assessment indicates that there will not be major disruptive eﬀects in ﬁnancial intermediation activity, nor
in the transmission mechanisms of monetary policy. Importantly, such eﬀects will depend on the design of the CBDC system—that
is, on their cases of use, limits to transactions and cash holdings in digital wallets, etc. Nevertheless, aspects such as the velocity of
circulation, the stability of the money multiplier and the willingness of end users to use cash could be altered as noted by the central
bank.
In terms of business continuity, the pilot comprised existing contingency plans to keep the system running. In that respect, the epeso system used internet as its principal channel and the USSD telecom protocol as secondary and contingency channels. The e-peso
pilot did not feature oﬄine transactions, but the USSD protocol was used to process online transactions initiated without internet.
The e-krona
The rCBDC project of the Sveriges Riksbank, the e-krona, represents a remarkable example of how a CBDC may counterweigh the
risk of a failure in the payment market where the provision of services is mainly dominated by the private sector and the use of cash
6

## Page 7

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

as a public means of payment has been in a declining stage for several years. Design considerations for the e-krona are clear in terms
of the expected gaps to fulﬁll, including how the rCBDC is envisioned to circumvent unintended eﬀects on ﬁnancial intermediation.
It would serve as a digital payment instrument into which the payments ecosystem will have to “plug.” This will provide the public
with access to central bank money, but without any material concerns over monetary or ﬁnancial stability issues.
Although the e-krona project has not entered into a pilot phase, our review showed that its expected design will be one in which
decentralized technologies will be used for the core system (minting and data safeguarding). Likewise, the study’s authors expect an
ecosystem where a PSP will be in charge of rolling out the wallets and digital ﬁat money. This is becoming a common approach in
CBDC projects. The results of a proof of concept (or even better, a pilot program) will be illustrative of how the payment industry
accommodates a central banking-led payment solution in an advanced economy. It is still too early to determine what the operation
would look like and what technological architecture will underpin the e-krona, or whether it will be tokenized and 24/7.
The Riksbank assessed how the e-krona will meet international standards by applying the PFMI. This assessment focused on
operational, governance, access and business management features as well as ﬁnancial risk management. This could be a purposeful
approach for central banks prior to launching a CBDC initiative, because it comprehensively consider the several aspects of a payment
infrastructure going beyond the high-level policymaking aspects of an analytical framework, as suggested in Section 2.
3.3. Common lessons
This section summarizes common lessons emerging from our peer reviews. They are presented in three categories: design, operation
and implementation of the rCBDC pilot programs.
Central banks worldwide face a series of motivations to assess the feasibility of rCBDCs, from ﬁnancial exclusion given the remoteness of communities outside of a cost-eﬀective range of physical banking services, to weak payment interoperability and arrangements,
as well as limited availability of digital payment means. Relatedly, a rCBDC would be innovative in both the form of digital money
and the underlying payment infrastructure. CBDC pilot programs are thus a source of knowledge on how design, operation and
implementation should be set up for such a new system.
In the following subsections, we identify key common lessons emerging from the CBDC pilot studies we reviewed. It is worth
underlining that given the scale of the programs, some issues were not possible to assess. Full privacy, scalability, throughput and
wide accessibility are perhaps some of the most salient features that are not yet tested enough. This limitation will merit further
study, as it has been demonstrated as a key challenge for new payment instruments.
Design
Some of the most relevant lessons from the design of the rCBDC pilots can be summarized as follows:
• Framing the scope of the rCBDC. This mainly involves deploying a digital form of ﬁat money to be widely available on a safe and
reliable basis, like cash.
• Reviewing the legal framework and, where necessary, adapting it to run a pilot program. Regulatory amendments may be required
depending on the jurisdiction.
• Establishing thresholds, usability and capability features of a CBDC. This becomes relevant to keep risk under control, and to
circumvent any material concerns on bank runs and ﬂight-to-quality risks.
• Developing an ecosystem with industry players to deploy rCBDC widely. This demands an adequate coordination of roles, including
the dual role of central banks as payment overseers and operators.
• Establishing a compliance and interoperability framework. This requires PSPs fulﬁlling prerequisites of participation and ability
to enable seamless rCBDC onboarding, among other processes.
• Ensuring a resilient and reliable environment. This involves the PSP, access points and other parties providing operational capacity
and sound risk and data management.
Another important design feature present in CBDC pilots relates to quick and eﬀective universal access to instant payments at
little or no cost for end users (like cash). Another major design consideration that we found relevant relates to wallet structure, either
for PSPs or end users. Special custodial wallets (i.e. wholesale CBDC accounts at the central bank) for authorized PSPs and customizable individual wallet solutions—that is, devices for end users to access rCBDCs, whether traditional or new—must be designed in
such a way that they run seamlessly. Custodial wallets must be able to interoperate and communicate with other retail payment
infrastructures when possible. Finally, individual wallet solutions should be user-friendly and reliable to rapidly gain conﬁdence.
Operation
Some of the most important lessons from the operation of the rCBDC pilot programs can be summarized as follows:
• Leverage both central banks and technology-specialized ﬁrms to build in the layers of the processing platform. This division of
work should mainly focus on ensuring availability and scalability.12
• Rely on a multi-layer operational architecture that optionally uses decentralized technologies. DLTs could be ﬁt for purposes of
improved minting, data management and other core processing features of the CBDC system.
12
DLT-permissioned networks allow a high degree of operational reliability, as found in the peer review. For instance, preventing double-spending
or fraud is a feature that these rCBDC pilot programs have undertaken seriously, given the availability of new cryptographic developments in decentralized technologies. In the limited scale of the pilot programs, digital ﬁat money can beneﬁt from DLT, but will require a broader implementation
to conﬁrm how eﬀective these technologies could be to deal with large streams of transactions under peak demand.

7

## Page 8

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

• Assess the proposed CBDC architecture against the PFMI. This assessment will certainly ﬂag potential risks in a pilot program
before it is made a fully available rCBDC system.
• Monitor the risk management of the CBDC system operator and participants. This will be especially important in terms of operational risks.
Another signiﬁcant lesson is that eﬃcient rCBDC operation may imply that the central bank mint and distribute the currency,
possibly on a wholesale basis, through an authorized PSP. Such an operational arrangement would mean that onboarding and customer
relations will be handled by an authorized PSP, which might have greater electronic expertise than the central bank. Another lesson
relates to the resulting ecosystem. It is foreseeable that Open Banking,13 payment aggregators and other new PSPs could change the
ecosystem; thus, central banks need to deﬁne access criteria for third-party service providers. This will be greatly important for the
safety of the overall system and its end users.
Another important feature of the operational architecture is the interoperability provided by a rCBDC system. Unfortunately, given
the limitations provided by the scope of the CBDC pilot studies, we were not able to conﬁrm whether this could be achieved. However,
it is possible to remark that a high degree of standardization among the telecommunications, physical and related infrastructures of
a country has been a prerequisite to deploying any rCBDC system, which could ease interoperability with other existing payment
infrastructures (at least domestically).
Implementation
Some of the most relevant lessons from the implementation process of the rCBDC pilots can be summarized as follows:
• Implement rCBDC as a payment-driven policy. This calls for the central bank to adequately combine its dual roles as operator and
overseer in tandem with the private sector.
• Enable an inclusive ecosystem for adoption and usage. This requires engaging relevant PSPs with signiﬁcant geographical presence
and commercial resources, leveraging government payment, public transportation, and also “supermerchants” who can provide
a wide range of access points for end users.
• Onboarding, ﬁnancial education and incentives: Fostering adoption may require ﬁnancial and coordination eﬀorts as part of the
implementation strategy.
• Enhance conﬁdence in payment through risk management. Know-Your-Customer (KYC) and Customer-Due-Diligence (CDD) procedures, as well as dispute resolution mechanisms, should be in place to build conﬁdence in rCBDCs.
A major lesson that should not be understated is that implementation should be adaptable. The COVID-19 pandemic has been
an unusual test for rCBDC pilot programs, proving that central banks should be ready to face unexpected frictions when the implementation of a pilot plan or full CBDC deployment takes place.14 In particular, the new social frictions concerning social distancing
give incentives to improve the onboarding process with digital payments, and eventually, with rCBDC transactions. For instance,
being able to enhance or enable contactless payment channels and devices would be relevant to attaining social distancing measures,
instead of relying fully on physical infrastructure.
4. Key insights and discussion
A successful rCBDC would need to become a resilient and inclusive digital complement to physical cash, featuring in everyday
payment similarly to banknotes and coins. We identify some key insights stemming from the rCBDC pilot studies we reviewed, as
follows:
• Central banks should observe guiding principles. This includes coexistence of cash in the short and medium term to fulﬁll a wide
range of the population’s payment needs, a public–private partnership, and a lack of interference with the overarching mandates
of monetary and ﬁnancial stability.
• Central banks should address domestic concerns ex ante. This involves a catalyzing role in improving market failures by fostering
dialogue and cooperation with the private sector.
• Central banks should precede CBDC exploration with reliable analysis. This entails having data on payment habits to understand
exactly how a CBDC could ﬁll the gaps both in normal times and in extreme situations.
• Central banks should set the highest technological and operational requirements to deliver a solution that is likely to become
scalable, interoperable and trustable.
• Central banks should retain strategic roles in issuing and making available a CBDC. However, they should also examine how to
design an ecosystem with the private sector bringing its expertise and market abilities.
A roadmap for a rCBDC plan will minimally comprise framing the scope of the rCBDC, reviewing the legal framework, establishing appropriate risk management measures, and developing an ecosystem with industry players. Central banks should pay special
attention to rCBDCs’ usability and acceptance. In this regard, features such as thresholds, compliance controls, oﬄine servicing, nosurcharge rules and other measures could help minimize a major risk to their adoption (Jiang, 2020), and also minimize potential
13
According to the Basel Committee for Banking Supervision, open banking consists of the sharing and leveraging of customer-permissioned data
by banks with third parties to build applications and services. Some open banking developments are aimed at providing real-time payments, greater
ﬁnancial transparency options for account holders, and marketing and cross-selling opportunities.
14
This is, for instance, the case of the Sand Dollar in the Bahamas.

8

## Page 9

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

negative eﬀects on the overall model of ﬁnancial intermediation (Gross and Schiller, 2020). Moreover, central banks embarking on
rCBDC programs may wish to consider the PFMI as a reliable basis to both guide the risk management framework to govern the
system and to support a measurable assessment and monitoring of the robustness of such a brand-new payment infrastructure.
It will be also important to carefully analyze alternative policy and operational options to rCBDCs. Fast payments are becoming
a common practice worldwide (Committee on Payments and Market Infrastructures, 2016), with important lessons on how central
banks can eﬀectively underpin access to digital forms of digital money, yet with major diﬀerences for a backstopped digital cash-like
currency.
For central banks moving to the next stage, enacting a rCBDC system will require a signiﬁcant amount of coordination and
operational eﬀorts before and during implementation. First, the central bank should adequately identify its roles as regulator, operator
and catalyzer of the rCBDC system, implying that key industry players must embark to build a comprehensive and workable ecosystem
from the very beginning. Second, the central bank will have to put forth an eﬀort to ensure that such an ecosystem minimally
encompasses an interoperable, scalable and reliable operational infrastructure, whether conventional or DLT-based, with the highest
requirements and standards. For instance, this could be achieved using a tiered structure in which the ecosystem’s main players (i.e.
private PSPs) compete fairly to serve end users and the central bank remains the sole operator of core strategic activities (e.g. minting
of tokens). Third, the central bank should analyze and decide a sustainable cost structure for the implementation, operation and
maintenance of the related systems. Since a CBDC could be considered a public good, it should be envisioned that a fraction of the
costs may be borne by the central bank. And fourth, the central bank must establish a risk management framework able to embrace
the complex architecture of a rCBDC. It should bring together nationwide end users and private and public payment infrastructure,
all of them subject to an intensive technology-based novel platform, where cybersecurity, privacy, KYC and AML/FT concerns must
have the highest attention possible.
Another important aspect of making rCBDC operable has to do with unexpected events like the COVID-19 pandemic. Central banks
must be prepared to appropriately respond. Certainly, extreme situations like that will aﬀect how people, merchants and other CBDC
users behave in times of stress, for instance, moving into cash holdings as noted during the 2020 “Great Lockdown.”15 The pandemic
has shown that central banks should be ready to adapt and ensure that the rCBDC system is resilient.
With regard to the expected outcomes of rCBDC pilot studies, it is still early to conﬁrm which design choice will bring greater
interoperability or reliability. More importantly, it is yet not possible to deﬁne the real consequences of CDBCs on monetary policy
transmission or ﬁnancial intermediation, and central banks must pay special attention to design features that could be relevant to
mitigate unintended consequences. These features may include transaction limits, thresholds and interest-bearing for rCBDC holders.
To summarize, we peer reviewed three rCBDC pilot studies with the main objective of examining their design, operation and
implementation aspects. The studies invoked a multisided planning strategy in which the leadership of a nation’s central bank is
critical. Interestingly, despite the diversity in motives, the studies’ envisaged solutions share in common that central banks should
be guided by foundational principles and shared some rCBDC features. RCBDC is a matter of snowballing interest for several central
banks worldwide, but it is a development in a state of ﬂux. Its current analysis is undesirably limited to the available research, with
few proofs of concept and even fewer pilot programs. Moreover, unexpected frictions can arise when designing, implementing and
operating aa CBDC system. This makes it necessary to wait and see how rCBDC will evolve conceptually and in practice. Moreover,
given the reduced scale of the pilot programs, there were issues that we were unable to assess. These aspects certainly imply an
opportunity to further study the subject.
References
Adrian, T. and T. Mancini-Griﬀoli (2019). “The Rise of Digital Money.” IMF Fintech Note 19/01.
Auer, R., Boehme, R., 2020. The technology of retail central bank digital currency. BIS Q. Rev. 85–100 March.
Ayuso, J., Conesa, C., 2020. Una Introducción al Debate Actual Sobre la Moneda Digital de Banco Central (CBDC). Documentos Ocasionales, 2005, Banco de España.
Bank for International Settlements, 2020a. Central Banks and Payments in the Digital Era. Bank for International Settlements, BIS Annual Economic Report.
Bank for International Settlements, 2020b. Central Bank Digital Currencies: Foundational Principles and Core Features. CBDC Coalition.
Bank of England, 2020. Central Bank Digital Currency Opportunities, Challenges and Design. Bank of England (BoE) Discussion Paper.
Bech, M., Hancock, J., 2020. Innovation in payment. BIS Q. Rev. 21–36 March.
Bech, M., Garratt, R., 2017. Central bank cryptocurrencies. BIS Q. Rev. 55–70 September.
Bindseil, U., 2020. m. Tiered CBDC and the Financial Syste. European Central Bank Working Paper Series, No 2351.
Boar, C., Wehrli, A., Wadsworth, A., 2021. Ready, steady, go? Results of the third BIS survey on central bank digital currency BIS Papers 114.
Bordo, M., Levin, A., 2017. Central Bank Digital Currency and the Future of Monetary Policy. National Bureau of Economic Research Working Paper 23711.
Boring, P., Kaufman, M., 2019. Blockchain: The Breakthrough Technology of the Decade and How China is Leading the Way – An Industry White Paper. Chamber of
Digital Commerce.
Brunnermeier, M.K., Niepelt, D., 2019. On the equivalence of private and public money. J. Monet. Econ. 106 (C), 27–71.
Center for Latin American Monetary Studies - CEMLA (2019). “Policy Report: Key Aspects around Central Bank Digital Currencies.” Fintech Forum Policy Series.
Center for Latin American Monetary Studies, 2020. Latin America and the Caribbean Toward a Cashless Reality. CEMLA Yellow Book Statistics.
Central Bank of the Bahamas, 2019. Project Sand Dollar: A Bahamas Payments System Modernisation Initiative. CBOB.
Committee on Payments and Market Infrastructures, 2012. Principles for Financial Market Infrastructures. CPMI BIS Technical Report.
Committee on Payments and Market Infrastructures (2016). “Fast Payments – Enhancing the Speed and Availability of Retail Payments.” CPMI Report, No 154.
Committee on Payments and Market Infrastructures (2018). “Central Bank Digital Currencies.” CPMI Papers, No 174.
Davoodalhosseini, S.M., Rivadeneyra, F., 2020. A policy framework for e-money. Can. Publ. Policy 46 (1), 94–106 March 2020.
Dyson, B., Hodgson, G., 2017. Digital Cash: Why Central Banks Should Start Issuing Electronic Money. Positive Money.
Fernández-Villaverde, J., Sanches, D., Schilling, L., Uhlig, H., 2020. Central Bank Digital Currency: Central Banking for All?. Federal Reserve Bank of Philadelphia
Working Paper 20-19.

15

Financial Times (2020).
9

## Page 10

R. Morales-Resendiz, J. Ponce, P. Picardo et al.

Latin American Journal of Central Banking 2 (2021) 100022

Financial Times, 2020. The Comfort of Cash in a Time of Coronavirus. Game Changer May 2020.
Garratt, R. and van Oordt M. (2020). “Privacy as a Public Good: A Case for Electronic Cash.” Bank of Canada Staﬀ Working Paper 2019-24.
Gross, J., Schiller, J., 2020. A Model for Central Bank Digital Currencies: Do CBDCs Disrupt the Financial Sector?. SSRN.
Huynh, K., Molnar, J., Shcherbakov, O., Yu, Q, 2020. Demand for Payment Services and Consumer Welfare: The Introduction of a Central Bank Digital Currency. Bank
of Canada Staﬀ Working Paper 2020-7.
Jiang, J., 2020. CBDC Adoption and Usage: Some Insights From Field and Laboratory Experiments. Bank of Canada Staﬀ Analytical Note 2020-12.
Keister, T., Sanches, D., 2020. Should Central Banks Issue Digital Currency?. Federal Reserve Bank of Philadelphia.
Kahn, C., F. Rivadeneyra and T. Wong (2019). “Should the Central Bank Issue e-Money?” FRB St. Louis Working Paper No. 2019-3.
Khiaonarong, T., Humphrey, D, 2019. Cash use Across Countries and the Demand for Central Bank Digital Currency. International Monetary Fund.
Kiﬀ, J., J. Alwazir, S. Davidovic, A. Farias, A. Khan, T. Khiaonarong, M. Malaika, H. Monroe, N. Sugimoto, H. Tourpe and P. Zhou (2020). “A Survey of Research on
Retail Central Bank Digital Currency.” IMF Working Paper 20/104.
Kumhof, M., Noone, C., 2018. Central Bank Digital Currencies – Design Principles and Balance Sheet Implications. Bank of England Staﬀ Working Paper No. 725.
Libra (2019). “An Introduction to Libra.” White Paper. Libra Association Members.
Mancini-Griﬀoli, T., M.S. Martinez-Peria, I. Agur, A. Ari, J. Kiﬀ, A. Popescu and C. Rochon (2018). “Casting Light on Central Bank Digital Currency.” IMF Staﬀ
Discussion Note 18/08.
Musa, Miguel, Raúl Morales and Paolo Tasca (2021). “Tiered Access for the RTGS: A DLT Approach”. Working Paper (unpublished).
Ponce, J., 2019. Central Bank Digital Currency: A Central Banker Perspective. Banco Central del Uruguay.
Ponce, J., 2020. Digitalization, retail payments and central bank digital currency. Rev. Estab. Financ. 39 Banco de España.
Shin, H.S. (2020). “Central banks and the new world of payments” Speech at the BIS Annual General Meeting, Basel, 30 June 2020.
Townsend, R.M., 2019. Distributed Ledgers: Innovation and Regulation in Financial Infrastructure and Payment Systems. Massachusetts Institute of Technology.

10
