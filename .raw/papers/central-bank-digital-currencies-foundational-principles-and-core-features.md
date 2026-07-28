---
source_type: pdf
title: "Central bank digital currencies foundational principles and core features"
original_file: "thesis/reference/Central bank digital currencies_ foundational principles and core features.pdf"
sha256: "87c6d4e4fc4b341b19e47888eaaf4760e48971149906ba37892c4cad8e37ba6a"
page_count: 26
extracted: 2026-07-23
extraction_method: "text-with-ocr-review"
ocr_pages:
extraction_warnings:
  - "Page OCR failed or was not accepted (p.3: No text detected; p.5: No text detected)."
---

# Raw extraction: Central bank digital currencies foundational principles and core features

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Central bank digital currencies:
foundational principles and core features

Bank of Canada
European Central Bank
Bank of Japan
Sveriges Riksbank
Swiss National Bank
Bank of England
Board of Governors Federal Reserve System
Bank for International Settlements

Report no 1
in a series of collaborations
from a group of central banks

## Page 2

This publication is available on the BIS website (www.bis.org).

© Bank for International Settlements 2020. All rights reserved. Brief excerpts may be reproduced or
translated provided the source is stated.
ISBN: 978-92-9259-427-5 (online)

## Page 3

[No extractable text]

## Page 4

Contents
Executive summary ........................................................................................................................................................................... 1
1.

Introduction ...................................................................................................................................................................... 2
1.1

The report ................................................................................................................................................................. 3

1.2

CBDC explained ...................................................................................................................................................... 3

“Synthetic CBDC” is not a CBDC .................................................................................................................................................. 4
2.

Motivations, challenges and risks............................................................................................................................. 5
2.1

Payment motivations and challenges ............................................................................................................ 5

Cross-border payments and CBDC ............................................................................................................................................ 7
2.2

Monetary policy motivations and risks ......................................................................................................... 8

2.3

Financial stability risks.......................................................................................................................................... 8

2.4

Balancing motivations and risks ...................................................................................................................... 9

3

Issuing a CBDC ............................................................................................................................................................... 10
3.1

Three foundational principles ......................................................................................................................... 10

3.2

Core features ......................................................................................................................................................... 11

4

5.

CBDC design and technology .................................................................................................................................. 12
4.1

Design choices ...................................................................................................................................................... 12

4.2

Technology considerations .............................................................................................................................. 13

4.3

Key trade-offs ........................................................................................................................................................ 15
Concluding thoughts and next steps .................................................................................................................... 16

References .......................................................................................................................................................................................... 18
Annex A: Questions to guide further research .................................................................................................................... 19
Annex B: Group members ............................................................................................................................................................ 20

Central bank digital currencies: foundational principles and core features

i

## Page 5

[No extractable text]

## Page 6

Executive summary
Central banks have been providing trusted money to the public for hundreds of years as part of their
public policy objectives. Trusted money is a public good. It offers a common unit of account, store of value
and medium of exchange for the sale of goods and services and settlement of financial transactions.
Providing cash for public use is an important tool for central banks.
Yet the world is changing. Even before Covid-19, cash use in payments was declining in some
advanced economies. Commercially provided, fast and convenient digital payments have grown
enormously in volume and diversity. To evolve and pursue their public policy objectives in a digital world,
central banks are actively researching the pros and cons of offering a digital currency to the public (a
“general purpose” central bank digital currency (CBDC)). Understanding of CBDCs has advanced
significantly in the last few years. Published research, policy work and proofs-of-concept from central
banks have gone a long way towards establishing the potential benefits and risks.
For the central banks contributing to this report, the common motivation for exploring a general
purpose CBDC is its use as a means of payment. Providing cash to the public is a core responsibility of
central banks and a public good. All the contributing central banks commit to continue providing cash as
long as there is public demand. Yet a CBDC could provide a complementary central bank money to the
public, supporting a more resilient and diverse domestic payment system. It might also offer opportunities
not possible with cash while supporting innovation.
CBDC issuance and design are sovereign decisions to be made by each jurisdiction. This report
is not about if or when to issue a CBDC. Central banks will make that decision for their jurisdictions (in
consultation with governments and stakeholders). None of the central banks contributing to this report
have reached a decision on whether or not to issue a CBDC. Instead, this report advances the foundational
international work by outlining common principles and the key features a CBDC and supporting
infrastructure would need in order to contribute to central bank public policy objectives.
The principles emphasise that: (i) a central bank should not compromise monetary or financial
stability by issuing a CBDC; (ii) a CBDC would need to coexist with and complement existing forms of
money; and (iii) a CBDC should promote innovation and efficiency. The possible adverse impact of a CBDC
on bank funding and financial intermediation, including the potential for destabilising runs into central
bank money, has been a concern of central banks. Any decision to launch a CBDC would depend on an
informed judgment that these risks can be managed, likely through some combination of safeguards
incorporated in the design of a CBDC and financial system policies more generally. Understanding the
potential market structure effects of CBDC, their implications for financial stability, and any potential
mitigants is a further area of work for this group.
A CBDC robustly meeting these criteria and delivering the features set out by this group could
be an important instrument for central banks to deliver their public policy objectives.
This potential, together with the agreement on common principles and features, means there is
considerable scope for future international collaboration, knowledge-sharing and experimentation on
CBDC. Simultaneous research and development of CBDC by central banks could also explore ways to
improve cross-border payments, as part of the G20 roadmap (CPMI (2020)), while avoiding spillovers and
unintended consequences.
The next stage of CBDC research and development will emphasise individual and collective
practical policy analysis and applied technical experimentation by central banks. This report highlights
CBDC design and technology considerations, including initial thoughts on where trade-offs lie. Far more
work is required to truly understand the many issues, including where and how a central bank should play

Central bank digital currencies: foundational principles and core features

1

## Page 7

a direct role in an ecosystem and what the appropriate role might be for private participation. The speed
of innovation in payments and money means that these questions are ever more urgent.
A CBDC could be an important instrument for central banks to continue to provide a safe means
of payment in step with wider digitalisation of people’s day-to-day lives. Public trust in central banks is
central to monetary and financial stability and the provision of the public good of a common unit of
account and secure store of value. To maintain that trust and understand if a CBDC has value to a
jurisdiction, a central bank should proceed cautiously, openly and collaboratively.
This group of central banks will continue to work actively and collaboratively on CBDC, further
exploring the practical implications of the core features. Individually, the contributing central banks will
continue outreach efforts in order to foster an open and informed dialogue with domestic stakeholders
on CBDC. Collaboratively, we will also explore practical issues and challenges for broad interoperability of
domestic CBDCs in accord with related international workstreams (eg the G20 roadmap on cross-border
payments) We welcome further BIS information sharing on CBDC and BIS Innovation Hub plans to explore
the technologies that could support CBDCs.

1.

Introduction

Central banks have a mandate for monetary and financial stability in their jurisdictions and, explicitly or
implicitly, to promote broad access to safe and efficient payments. A core instrument by which central
banks carry out their public policy objectives is providing the safest form of money to banks, businesses
and the public – central bank money.
This money acts as a means of payment, unit of account and store of value for a jurisdiction. A
common unit of account is a public good that allows goods and services to be exchanged and financial
transactions to be settled efficiently and safely. Today, central banks provide money to the public through
cash and to banks and other financial companies through reserve and settlement accounts. In this way,
some of the smallest and largest payments in an economy are carried out using central bank money. Yet
the ongoing digitalisation of the economy is changing the way people pay. The use of cash, currently the
only form of central bank money available to the public, is falling in many jurisdictions. The Covid-19
pandemic may be accelerating this trend. Taking cash’s place is private digital money and alternative
payment methods.
Many central banks’ public policy objectives have remained broadly unchanged for the last
hundred years. Yet the significant changes of that period have required central banks to innovate and
evolve in how they met their objectives. A potential further evolution being considered is through issuing
a new form of money: central bank digital currency (CBDC). A recent survey found that 80% of central
banks are engaged in investigating CBDC and half have progressed past conceptual research to
experimenting and running pilots (Graph 1). To coordinate and consolidate some of this work, the central
banks of Canada, Japan, Sweden, Switzerland, the United Kingdom and the United States have come
together, along with the European Central Bank and the Bank for International Settlements. This report
summarises where they collectively stand.
Arguments for and against issuing a CBDC and the design choices being considered are driven
by domestic circumstances. There will be no “one size fits all” CBDC. Yet domestic CBDCs would still have
international implications. Cooperation and coordination are essential to prevent negative international
spillovers and simultaneously ensure that much needed improvements to cross-border payments are not
overlooked.

2

Central bank digital currencies: foundational principles and core features

## Page 8

Central banks continue to work on CBDC
Share of respondents
Engagement in CBDC work

1

Graph 1
Focus of work

Type of work in addition to research1

Share of respondents conducting work on CBDC.

Source: Boar et al (2020)

1.1

The report

This report starts by examining central banks’ motivations and evaluates some of the opportunities driving
CBDC research. In this context, some foundational principles for central banks’ role in payment systems
are then articulated together with the core features required of any CBDC for it to fulfil public policy
objectives. To realise these core features, a suitable design for a CBDC and its underlying system must be
developed. This report highlights some of the key design choices and where the policy trade-offs and
technology challenges currently lie for central banks. The report concludes with thoughts on future work
and some recommendations for where and how international collaboration can aid future domestic policy
discussions.

1.2

CBDC explained

CBDC is “a digital form of central bank money that is different from balances in traditional reserve or
settlement accounts” (CPMI-MC (2018)). Interest in this new form of money is increasing and central banks
are researching and experimenting with underlying technology. At the same time, private experiments
with new forms of digital money continue and the conceptual variety afforded by new technologies has
meant that, although CBDC is well defined, this definition is not always well understood.
A CBDC is a digital payment instrument, denominated in the national unit of account, that is a
direct liability of the central bank. 1 This report focuses on broadly available general purpose CBDCs (ie that
can be used by the public, for day-to-day payments rather than CBDCs restricted to wholesale, financial
market payments).

1

Some commentators and academics have referred to “synthetic CBDCs”, which are the equivalent of narrow-bank money and
not a direct claim on a central bank. This is not a CBDC by definition and lacks the neutrality and liquidity of central bank money
(Box 1). Similarly, a liability issued by a central bank that is not in its own currency (ie where it does not have monetary authority)
is not a CBDC.

Central bank digital currencies: foundational principles and core features

3

## Page 9

Today, central banks issue two types of money and provide infrastructure to support a third.
Physical cash and electronic central bank deposits, also known as reserves or settlement balances, are
issued. Physical cash is widely accessible and peer-to-peer. In contrast, central bank reserves are electronic
and typically only accessible to qualifying financial institutions. The third type of money is private money,
principally available through widely accessible and electronic commercial bank deposits. Central banks
support commercial bank money in various ways, by: (i) allowing commercial banks to settle interbank
payments using central bank money; (ii) enabling convertibility between commercial and central bank
money through banknote provision; and (iii) offering contingent liquidity through the lender of last resort
function. Importantly, while cash and reserves are a liability of the central bank, commercial bank deposits
are not. CBDC would be a new type of central bank money.
A general purpose CBDC would require an underlying system to provide and distribute it
conveniently to the public. This system would comprise the central bank, operator(s), participating
payment service providers and banks. 2 A wider ecosystem supporting the system could then include data
service providers, companies providing and maintaining applications and providers of point of sale devices
to initiate and accept payments.
Box 1

“Synthetic CBDC” is not a CBDC

A potential alternative framework under which central banks could engage with the rise of digital currencies
would be for private sector payment service providers to issue liabilities matched by funds held at the central
bank. Such an approach has been suggested by some stablecoin proposals and described in some papers as
“synthetic CBDC” (eg Adrian and Mancini Griffoli (2019)).
These payment service providers would act as intermediaries between the central bank and the end
users. If the regulatory framework can guarantee that these providers’ liabilities will always be fully matched by
funds at the central bank, these liabilities could share some of the characteristics of a CBDC issued by the central
bank. Yet these liabilities would not be a CBDC, as the end user would not hold a claim on the central bank. They
are, essentially, a form of “narrow-bank” money.
In addition to not being a CBDC by definition, these liabilities would also lack some key features of
central bank money. As described in Section 2.1.3, commercial payment service providers benefit from strong
network effects, potentially leading to concentration and monopolies or fragmentation. Central banks have public
policy, rather than profit objectives. This enables neutrality in providing services to users, allowing for an open
and inclusive system.
Another difference between CBDC and narrow-bank money is liquidity. Central banks can expand their
balance sheets and create additional liabilities, at short notice, in response to underlying demand. By design, a
payment service provider as described above cannot do this – every liability must be matched by funds held at
the central bank. This makes a CBDC more liquid than a matched claim on a private provider. For narrow-bank
money, concerns about the existence of the underlying matched funds could cause doubts on the value of the
liabilities and result in users selling them at a discount to the par value of the currency. This cannot occur with a
CBDC.
There might be a useful role for privately issued liabilities matched with central bank money in a
jurisdiction’s payment system (Kahn et al (2018)). However, the necessary information and decision-making
process for a central bank to enable such an arrangement is very different from a consideration of issuing CBDC.
 The value of a financial system based on narrow banking or “full-reserve banking” has been debated for hundreds of years. Bossone
(2001) provides an overview of the arguments.

2

4

Some of these entities could overlap, eg the central bank could operate the system.
Central bank digital currencies: foundational principles and core features

## Page 10

2.

Motivations, challenges and risks

•

A variety of motivations drive central bank research into CBDC.

•

Currently, the focus is on providing a CBDC for payments, enabling broad access to central bank
money and providing resilience.

•

Practical challenges and risks exist, which multiply when additional requirements are considered,
eg improving cross-border payments or enabling monetary policy tools.

There are a large and diverse number of motivations driving central banks’ interest in CBDCs. Differences
between emerging market economies and advanced economies are especially pronounced but individual
jurisdictions can also vary significantly depending on their circumstances (Boar et al (2020)). For the central
banks contributing to this report, the primary research motivation is a CBDC’s use as a means of payment,
although there are secondary motivations (eg enhancing monetary policy tools). CBDC is not unique in
being able to fulfil many of these motivations and CBDC designs are likely to require trade-offs that mean
not all motivations can be realised simultaneously.

2.1

Payment motivations and challenges

2.1.1

Continued access to central bank money

In jurisdictions where access to cash is in decline, there is a danger that households and businesses will no
longer have access to risk-free central bank money. Some central banks consider it an obligation to provide
public access and that this access could be crucial for confidence in a currency. A CBDC could act like a
“digital banknote” and could fulfil this obligation.

2.1.2

Resilience

Cash serves as a backup payment method to electronic systems if those networks cease to function.
However, if access to cash is marginalised, it will be less useful as a backup method if the need arises. A
CBDC system could act as an additional payment method, improving operational resilience. 3 Compared
to cash, a CBDC system might provide a better means to distribute and use funds in geographically remote
locations or during natural disasters. However, significant offline capabilities would need to be developed,
both for the CBDC system and any dependencies (eg some availability of electricity for mobile devices).
Counterfeiting and cyber risk present a challenge. Cash has sophisticated anti-counterfeiting
features and large-scale issues rarely occur. Theoretically, a successful cyber attack on a digital CBDC
system could quickly threaten a significant number of users and their confidence in the wider system (as
it could for a large bank or payment service provider). Defending against cyber attacks will be made more
difficult as the number of endpoints in a general purpose CBDC system will be significantly larger than
those of current wholesale central bank systems.

2.1.3

Increased payments diversity

Payment systems, like other infrastructure, benefit from strong network effects, potentially leading to
concentration and monopolies or fragmentation. Payment service providers have the incentive to organise
their platforms as closed-loop systems. When a small number of systems dominate, high barriers to entry
and high costs (especially for merchants) can occur. Where more systems exist, fragmentation may still
occur as systems often have proprietary messaging standards, increasing the cost and complexity of
3

However, this increase in resilience assumes that other payment methods and instruments remain available.

Central bank digital currencies: foundational principles and core features

5

## Page 11

interoperability (CPMI (2018)). Fragmentation of payment systems means that users and merchants may
face costs and difficulties paying users of other systems. This is inconvenient and socially inefficient. CBDC
could provide a common means to transfer between fragmented closed-loop systems (although an
accessible fast payment system can also achieve the same end). 4

2.1.4

Encouraging financial inclusion

For the central banks contributing to this report, most of the adult population in their jurisdictions can
conveniently access electronic payments. However, increasing digitalisation could leave some sections of
society behind as potential barriers around trust, digital literacy, access to IT and data privacy concerns
create a digital divide. For central banks in many emerging market economies, a key driver for researching
CBDC is the opportunity to improve financial inclusion (Boar et al (2020)).
Yet for a CBDC to increase financial inclusion, it must address the causes of exclusion, which vary
by jurisdiction and are often complex. 5 Given the complexity of this issue and possible underlying obstacles
to digital inclusion (eg illiteracy), any CBDC initiative would likely need to be embedded in a wider set of
reforms (CPMI-World Bank (2020)).

2.1.5

Improving cross-border payments

Cross-border payments are inherently more complex than purely domestic ones. They involve more, and
in some cases numerous, players, time zones, jurisdictions and regulations. As a result, they are often slow,
opaque and expensive (CPMI (2018)). An interoperable CBDC (ie one that is broadly compatible with
others) could play a role in improving cross-border payments (Box 2).

2.1.6

Supporting public privacy

A key feature of cash is that no centralised records of holdings or transactions exist. Some have argued
that the main benefit a CBDC could bring would be some level of anonymity for electronic payments (Bech
and Garratt (2017)).
Full anonymity is not plausible. While anti-money laundering and combating the financing of
terrorism (AML/CFT) requirements are not a core central bank objective and will not be the primary
motivation to issue a CBDC, central banks are expected to design CBDCs that conform to these
requirements (along with any other regulatory expectations or disclosure laws).
For a CBDC and its system, payments data will exist, and a key national policy question will be
deciding who can access which parts of it and under what circumstances. 6 Striking this balance between
public privacy (especially as data protection legislation continues to evolve) and reducing illegal activity
will require strong coordination with relevant domestic government agencies (eg tax authorities).

2.1.7

Facilitating fiscal transfers

For some jurisdictions, the Covid-19 pandemic illustrates the benefits of having efficient facilities for the
government to quickly transfer funds to the public and businesses in a crisis. A CBDC system with identified
users (eg a system linked to a national digital identity scheme) could be used for these payments.

4

At a user level, cash could theoretically fulfil the same function but transferring from electronic to physical and back to electronic
money is costly and inconvenient. At a payment provider level, existing wholesale central bank payment systems already fulfil
this role. Yet not all payment service providers will be eligible or want to participate.

5

Causes of exclusion can include: (i) depository institutions being unable to offer profitable services to users in certain
geographies or at lower income levels; (ii) high requirements or costs for offered services (eg fees or travel time to branches);
and (iii) other reasons, such as lack of trust in available depository institutions.

6

A possible model is one where personal and business data (eg users’ identities and transactions) would not be disclosed to
third parties or governments unless required by law, while maintaining capability to investigate (eg ECB and BoJ (2020)).

6

Central bank digital currencies: foundational principles and core features

## Page 12

Although a CBDC could play a role in making fiscal transfers more efficient (especially in
jurisdictions with greater unbanked populations), on its own, it would not be necessary or sufficient. A
linked digital identity system would be a necessity to realise real improvement. If such a system were in
place, the incremental benefit of CBDC over transfers to (eg) commercial accounts, etc could be small,
depending on designs. Additionally, if fiscal transfers were made with CBDC there is a risk of blurring the
division between monetary and fiscal policy and a potential reduction in monetary policy independence.

Cross-border payments and CBDC

Box 2

The G20 has made enhancing cross-border payments a priority. CPMI (2020) identifies CBDC as one area of
interest for making cross-border payments using central bank money more efficient. Although many of today’s
CBDC projects and pilots have a primarily domestic focus (Auer et al (2020)), various bilateral experiments have
demonstrated the feasibility of using CBDCs for cross-border payments (eg ECB and BoJ (2019), BoC and MAS
(2019), BoT and HKMA (2020)).
CBDC could be used for cross-border payments in different ways. A domestic CBDC could be used for
payments from, to and perhaps even within another currency area. This could facilitate efficiency but may also
create risks for the foreign jurisdiction. Additionally, CBDC systems could be designed to interoperate to facilitate
cross-border and cross-currency payments. Interoperability is a broadly understood term and potentially covers
a multitude of different ways payment systems or arrangements can interact with one another. At a basic technical
level, this can involve reducing the barriers to membership of both systems, eg through common messaging
standards and overlapping operating times. Moving beyond this, coordination between the systems can extend
to common business arrangements, eg a designated settlement agent between the systems for certain payments.
Another means is integration of the systems through an interoperable link where the infrastructures combine
their functions (eg arrangements where there are multiple CBDCs (Auer et al (2020)).
A future challenge with interoperability might be the number and diversity of payment systems
domestically and internationally. CBDC systems will enter a crowded field of domestic payment systems and
interoperability can enable complementarity and coexistence. For cross-border payments, closed-loop systems
(eg global stablecoins) can potentially offer some efficiencies but only if they interoperate with others (CPMI
(2018)). Common international standards (eg ISO 20022) can help. Yet for CBDC systems, their additional
functionalities and future designs may require these standards to be enhanced and for central banks to work
collaboratively in their development. Similarly, if CBDC systems are linked with supplementary systems and data
services (eg digital identity repositories), then commensurate international standards may be required for
seamless cross-border payments. New systems based on different technologies (eg token-based) may also
present challenges.
Interoperability between domestic CBDCs is, however, not just a question of technical design and work
on common standards and interfaces. CPMI (2020) describes five “focus areas” to improve cross-border payments,
of which only one involves exploring new payment infrastructure. Different legal and regulatory frameworks
present a significant obstacle to cross-border payments. Harmonising these frameworks would be a challenge.
Finally, monetary policy and financial stability implications related to cross-border CBDC arrangements
need thorough analysis. Designing a CBDC that is convenient for cross-border payments could help adoption.
Enabling easy access for tourists and foreign travellers could incentivise merchant acceptance. Yet significant
foreign holdings of a CBDC could result in stronger unintended international spillovers (Ferrari et al (2020)).
Specifically: undesirable volatility in foreign exchange rates, “digital dollarisation” for other countries and, if laws
and regulations are not equivalent, facilitation of tax avoidance and loss of oversight by domestic authorities.
More research on the potential spillover risks and challenges of a cross-border CBDC is needed to better
understand how to safely realise efficiencies.

Central bank digital currencies: foundational principles and core features

7

## Page 13

2.2

Monetary policy motivations and risks

CPMI-MC (2018) included “interest-bearing” as one of the five key design features of a CBDC and provided
a thorough overview of the academic debates around conceptual possibilities. Theoretically, a
remunerated CBDC could pass on policy rate changes immediately to CBDC holders (which might also
incentivise banks to pass on rates faster too). However, beyond the theory, there are challenges and risks.
To be effective in transmitting policy rates, a remunerated CBDC would need to pay competitive rates and
allow the public to hold significant amounts. This could exacerbate financial stability risks associated with
disintermediating banks and making fund flows more volatile (discussed below). 7
Beyond bearing interest, there has also been public discussion about CBDC use to stimulate
aggregate demand through direct transfers to the public (so-called “helicopter drops”), possibly combined
with “programmable monetary policy” (eg transfers with an “expiry date” or conditional on being spent
on certain goods). However, a key challenge for these transfers is identifying recipients and their accounts.
A CBDC is not a precondition or necessarily useful, while also potentially blurring the separation between
monetary and fiscal policy in ways which should be better understood and mitigated. Although a CBDC
(depending on its design) provides a range of monetary policy possibilities, further consideration would
need to be given to practicalities. Monetary policy will not be the primary motivation for issuing CBDC.

2.3

Financial stability risks

2.3.1

Potential disintermediation of banks

Depending on the design and adoption of a CBDC, there may be broad market structure effects. There is
a risk of disintermediating banks or enabling destabilising runs into central bank money, thereby
undermining financial stability. Today, the public can (and have in the past) run into central bank money
by holding more cash, but such runs are very rare, given the existence of deposit insurance and bank
resolution frameworks that protect retail depositors. There is, however, a concern that a widely available
CBDC could make such events more frequent and severe, by enabling “digital runs” towards the central
bank with unprecedented speed and scale (CPMI-MC (2018)). More generally, if banks begin to lose
deposits to CBDC over time they may come to rely more on wholesale funding, and possibly restrict credit
supply in the economy with potential impacts on economic growth.
There has been a great deal of academic research on the risks of disintermediation, runs into
central bank money and potential mitigants (eg through a more “cash-like” and less “deposit-like” CBDC,
discussed later in Section 4.1 on “design choices”). Given designs and systems will differ by jurisdiction, so
will the risk, which will require significant research by a central bank to understand. A central bank should
have robust means to mitigate any risks to financial stability before any CBDC is issued.

2.3.2

Protecting monetary sovereignty

Significant adoption of money not denominated in the sovereign currency could limit the impact of
monetary policy or the ability to support financial stability. A risk of stablecoins, so-called
“cryptocurrencies” and foreign CBDCs is that domestic users adopt them in significant numbers and use
of the domestic sovereign currency dwindles. In extremis, such a “digital dollarisation” could see a national

7

Some academics have also explored the possibility of CBDCs passing on negative rates to the public. However, these rates
could be avoided by holding cash, or (if this were not available) could encourage the public to use a foreign currency or even
a so-called “cryptocurrency”. This would limit the effectiveness of policy rate transmission and increase financial stability risks.
Likewise, any central bank issuing CBDC to better pass on negative rates is likely to face opposition and adoption difficulties,
also limiting the effectiveness of rate transmission.

8

Central bank digital currencies: foundational principles and core features

## Page 14

currency substituted by another with the domestic central bank gradually losing control over monetary
matters (Brunnermeier et al (2019); G7 Working Group on Stablecoins (2019)). 8
By offering an efficient and convenient CBDC itself, a central bank may reduce the risk of
alternative units of account dominating. 9 Alternatively or additionally, a central bank could work with
domestic private payment providers to ensure that the domestic payment system is as efficient and fit for
purpose as possible. Current efforts to modernise existing wholesale and retail payments infrastructure
(eg the introduction of faster payment systems) can offer the public better services and dissuade them
from using alternative payment means. Finally, the principle of improving existing payment systems
applies internationally. Existing cross-border payments infrastructure needs to be improved (CPMI (2020)).

2.4

Balancing motivations and risks

A changing payments landscape and technological developments can, in extremis, challenge the ability of
central banks to deliver on their public policy responsibilities. Yet they also present new opportunities to
make improvements and address long-running issues.
A central bank’s decision to embark on issuing a CBDC will require assessing the value of
opportunities to further pursue its objectives, balanced against any risks. The most valuable opportunities
that encourage issuance will be where a CBDC can support a central bank’s public policy objectives. Other
opportunities abound (eg reducing illegal activity, facilitating fiscal transfers or enabling “programmable
money”), yet unless these have a bearing on a central bank’s objectives, they will be secondary
considerations.
Finally, central banks serve jurisdictions with hugely differing financial systems, economies,
societies and legal structures. The motivations and risks balanced by different central banks will vary
significantly. However, given that central banks have common objectives, common principles and
requirements for a CBDC are possible. These are developed in the next section.

8

Even in a case where a stablecoin is denominated in the domestic currency of a jurisdiction, there is a risk that the payment
system and the data that comes along with operating the payment system will be in foreign hands and beyond the control of
domestic institutions.

9

Although it may also increase the risk to other jurisdictions if there is insufficient control and coordination.

Central bank digital currencies: foundational principles and core features

9

## Page 15

3

Issuing a CBDC

•

Diverse motivations are driving research into CBDCs. Yet central banks have common public
policy objectives.

•

Common objectives allow common principles to be agreed. These include that CBDCs: (i) do not
interfere with or impede a central bank in carrying out its mandate; (ii) coexist with cash and
robust private money; and (iii) enable innovation and efficiency in services for end users.

•

In practice, these common principles require a CBDC and its underlying system to incorporate
core features. These include: ease of use, low cost, convertibility, instant settlement, continuous
availability and a high degree of security, resilience, flexibility and safety.

3.1

Three foundational principles

Central banks have a common mandate for monetary and financial stability in their jurisdictions and have
been providing trusted money to the public for hundreds of years as part of their public policy objectives.
Their policy choices reflect their jurisdiction’s specific requirements and circumstances at a point in time.
Policy choices can therefore differ and change. Yet there are three common foundational principles for a
central bank’s consideration of CBDC issuance that flow from their common objectives.
“Do no harm”. New forms of money supplied by the central bank should continue supporting
the fulfilment of public policy objectives and should not interfere with or impede a central bank’s ability
to carry out its mandate for monetary and financial stability. For example, a CBDC should maintain and
reinforce the “singleness” or uniformity of a currency, allowing the public to use different forms of money
interchangeably.
Coexistence. Central banks have a mandate for stability and proceed cautiously in new territory.
Different types of central bank money – new (CBDC) and existing (cash, reserve or settlement accounts) –
should complement one another and coexist with robust private money (eg commercial bank accounts)
to support public policy objectives. Central banks should continue providing and supporting cash for as
long as there is sufficient public demand for it.
Innovation and efficiency. Without continued innovation and competition to drive efficiency in a
jurisdiction’s payment system, users may adopt other, less safe instruments or currencies. Ultimately this
could lead to economic and consumer harm, potentially damaging monetary and financial stability. The
payments ecosystem is comprised of public authorities (in particular the central bank) and private agents
(eg commercial banks and payment service providers). There is a role for the public and private sectors in
the supply of payment services to create a safe, efficient and accessible system. Private economic agents
should generally be free to decide which means of payment they use to conduct their transactions. 10

10

Although for merchants, sometimes “legal tender” legislation requires them to accept certain means of payment in certain
circumstances.

10

Central bank digital currencies: foundational principles and core features

## Page 16

3.2

Core features

To fulfil the foundational principles, a potential CBDC would need certain features. Fourteen core features
have been identified (Table 1), covering the CBDC instrument, the underlying system and the broader
institutional framework in which they exist.
Core CBDC features

Table 1

Instrument features
Convertible

To maintain singleness of the currency a CBDC should exchange at par with cash and
private money.

Convenient

CBDC payments should be as easy as using cash, tapping with a card or scanning a
mobile phone to encourage adoption and accessibility.

Accepted and
available

A CBDC should be usable in many of the same types of transactions as cash, including
point of sale and person-to-person. This will include some ability to make offline
transactions (possibly for limited periods and up to predetermined thresholds).

Low cost

CBDC payments should be at very low or no cost to end users, who should also face
minimal requirements for technological investment.

System features
Secure

Both the infrastructure and participants of a CBDC system should be extremely resistant
to cyber attacks and other threats. This should also include ensuring effective protection
from counterfeiting.

Instant

Instant or near-instant final settlement should be available to end users of the system.

Resilient

A CBDC system should be extremely resilient to operational failure and disruptions,
natural disasters, electrical outages and other issues. There should be some ability for end
users to make offline payments if network connections are unavailable.

Available

End users of the system should be able to make payments 24/7/365.

Throughput

The system should be able to process a very high number of transactions.

Scalable

To accommodate the potential for large future volumes, a CBDC system should be
able to expand.

Interoperable

The system needs to offer sufficient interaction mechanisms with private sector digital
payment systems and arrangements to allow easy flow of funds between systems.

Flexible and
adaptable

A CBDC system should be flexible and adaptable to changing conditions and policy
imperatives.

Institutional features
Robust legal
framework

A central bank should have clear authority underpinning its issuance of a CBDC.

Standards

A CBDC system (infrastructure and participating entities) will need to conform to the
appropriate regulatory standards (eg entities offering transfer, storage or custody of
CBDC should be held to equivalent regulatory and prudential standards as firms offering
similar services for cash or existing digital money).

Central bank digital currencies: foundational principles and core features

11

## Page 17

4

CBDC design and technology

•

Designing a CBDC and its underlying system is inherently a choice on where and how the central
bank should be involved in the national payments ecosystem.

•

Understanding the feasibility of these choices requires an understanding of the technologies
available.

•

Balancing the safety and efficiency of the ecosystem, while factoring in sufficient competition,
cooperation, innovation and flexibility among participants, results in complex and multifaceted
trade-offs (CPSS (2003)).

4.1

Design choices

There are different design choices for a CBDC instrument and for the underlying CBDC system. These
design features are not discrete. They all have some bearing on one another and making a coherent set
of choices will be essential to a smoothly functioning system. Understanding the impact of design choices
is a challenge. CBDC research remains a young field, with limited pilot examples or testing at scale. As a
result, an examination of how a system could work, including the respective roles of both the private and
public sector, is necessarily preliminary (eg Sveriges Riksbank (2018), Auer and Böhme (2020), Bank of
England (2020), and Bank of Canada (2020)).

4.1.1

Instrument designs

Two fundamental and complementary design features for a CBDC are whether and how to: (i) make it
interest-bearing; and (ii) impose a cap or limit on individual holdings. Many central banks are considering
issuing a CBDC that is “cash-like”. CPMI-MC (2018) explored the implications of alternative choices, noting
that interest could play a role in controlling demand for CBDC and facilitate pass-through of interest rate
decisions. Yet designing a CBDC that moves away from cash-like attributes to a “deposit-like” CBDC could
hasten any disintermediation of existing deposit takers. Limits could mitigate such disintermediation,
including by impeding a possible “run to CBDC” during a crisis, but they would also limit the effectiveness
of making a CBDC interest-bearing. A possible alternative to limits could be a tiering of interest rates by
volumes held (eg Bindseil (2020)). Yet limits and tiering create additional complexity and could raise
calibration challenges for central banks and users.

4.1.2

Ledger designs

In a CBDC system, a payment is a transfer of a central bank liability, recorded on a ledger. In designing a
CBDC ledger, there are five key factors: (i) structure; (ii) payment authentication; (iii) functionality; (iv)
access; and (v) governance. Each design factor will have a bearing on how a CBDC system meets the core
features set out earlier.
A ledger’s structure could be centralised, decentralised (eg through use of distributed ledger
technology) or a combination (eg a centralised ledger could record only the total CBDC issued, with
individual balances stored locally on a smartphone or card). A centralised ledger would require an
intermediary to manage and transfer the liabilities, making anti-fraud and security features easier to
incorporate, whereas a decentralised ledger could have the potential to make peer-to-peer and offline
payments easier. A combination could be developed but the resulting complexity could create a significant
burden on the functioning of a system.
Payment authentication designs (eg identity-based, token-based or multifactor) will drive the
underlying data structure of a CBDC system and determine how it will integrate with others (eg for digital
identity verification as part of know-your-customer (KYC) or transaction monitoring requirements) in

12

Central bank digital currencies: foundational principles and core features

## Page 18

addition to the level of privacy offered to users of the system. Different payments could also be subject to
different authentication methods (eg smaller-value payments could have simpler requirements).
A CBDC ledger could serve only as a very simple record of central bank liabilities or incorporate
more sophisticated functions (eg the ability to synchronise payments). More sophistication could help
drive initial adoption of a CBDC but also increase costs and limit differentiation between service providers
(depending on other design choices).
Access requirements, such as those establishing which entities can read (ie provide supporting
services) and write (ie settle payments) on the ledger, would affect the safety and efficiency of the entire
ecosystem. A balance would need to be struck between encouraging diversity and competition within the
ecosystem, while maintaining sufficient regulatory standards of private service providers.
A CBDC system would require a rulebook formalising the roles and responsibilities of the
operator(s), participants and potentially other service providers and stakeholders. Beyond the rulebook,
other governance arrangements would also need to be considered. For example, what discretion would a
central bank have to modify elements of the system, how would data-sharing and privacy be structured
and how would any interoperability arrangements be organised?

4.1.3

Incentive designs

Issuing a CBDC would require capital expenditure and impose running costs (just as for the production of
cash today). Deciding who should pay will have implications for ecosystem efficiency, competition,
innovation and inclusiveness. Directly recovering costs from the public users would be transparent but
could be a disincentive to adoption. Assigning a public good and/or seigniorage earned by the central
bank could reduce or eliminate the need for charges. Charging service providers would require them to
have a viable business model to recover their costs.
Private service providers’ business models will vary based on the system’s participation rules. A
variety is possible, with the ability to generate revenues impacting competition, innovation and privacy
within the system. Decisions will be required on whether all costs are transparently charged through fees
(and whether these are borne by merchants, users or both) or if some subsidisation through public funding,
private cross-subsidy or allowing access to consumer data is permitted.

4.2

Technology considerations

Issuing a CBDC and meeting policy goals will require suitable technologies. A variety of
complementary technologies could potentially support the core features. However, any conclusions will
require extensive practical testing and experimentation (Table 2).

Central bank digital currencies: foundational principles and core features

13

## Page 19

CBDC technology considerations

Table 2

Core features

Technology considerations

Convenient

Achieving tap-to-pay for users with relatively modern smartphones, stored value cards and
custom devices fitted with near field communications (NFC) is straightforward and well
understood. However, depending on the jurisdiction, the availability of NFC or fitted cameras on
smartphones to read QR codes could be used. A variety of user-friendly payment options may
be needed to support differing use cases (eg e-commerce or person-to-person payments).

For users without smartphones, central banks (or customer-facing intermediaries)
could offer devices (eg stored value cards or more interactive devices with displays) designed for
point of sale terminals, online and device-to-device transactions. Dedicated devices could also
support offline transactions. To support users with cognitive, motor or sensory impairments,
engagement with representative user groups and design experts should guide development.
Secure and
resilient

To protect user data, there are a variety of mature cryptographic techniques flexible enough to
be used across centralised or distributed ledgers. Typically, in a centralised platform, it is the
system administrator who enforces privacy policy, while distributed or device-based
environments with less straightforward governance arrangements can face complications from
software-based privacy enforcement. For local store of value style systems, technologies such as
tamper-resistant hardware found in credit cards and smartphones today do store other forms of
sensitive data and may be a suitable basis on which to provide local CBDC security.

As critical infrastructure, the resilience of CBDC will likely need to be similar to current
payment systems and operate a 24/7/365 service. While in principle distributed ledger
technology (DLT)-based systems may offer resilience benefits, by replicating data over many
more computers, so could a centralised ledger with a small number of data centres.
Fast and
scalable

The CBDC system will need to be able to meet the volume and throughput (transactions per
second) requirements at a justifiable cost. Ideally, volumes can drive marginal costs to extremely
low levels. Existing large centralised systems (eg card networks) demonstrate that very high
transaction capacity for large populations is possible with conventional technologies.

Research on scalability has shown that performance problems associated with public
DLT networks (that require mining or other consensus protocols) can be overcome with
permissioned DLT networks. Nonetheless, estimating current and future volumes and
throughput requirements for a CBDC is complicated and exacerbated by other industry
developments (eg payment requests generated by smart devices and the potential for highvolume micro transactions).

Interoperable

Technologies to support platform business models, allowing third parties to build services on
top of a CBDC system, are well established (eg use of application programming interfaces (APIs)).
The challenge in interoperating with existing payment arrangements will depend on their designs
but most have standardised mechanisms to make inter-account transactions.

Common data standards, most notably ISO 20022, will likely play a part in enabling
interoperability with other payment systems. In a CBDC system with intermediaries, its design
will need to support payments (be it online or offline) between customers of one intermediary
and those of another and support portability, to avoid users being locked in to a single
intermediary.
Flexible and
adaptable

14

Several factors determine how adaptable a CBDC system is: how accurately the fundamental
concepts of money and payments are enacted; a careful, layered design with a clear separation
of concerns; designing with foresight into how the environment may evolve (eg micro
transactions, changes in cryptography) and so on.

Central bank digital currencies: foundational principles and core features

## Page 20

4.3

Key trade-offs

Any CBDC and its underlying system will face competing pressures for design choices (eg fast processing
versus stronger security, which adds processing time). This is true of any system. The potential complexities
of any CBDC ecosystem and the interlinkages between design choices create multifaceted trade-offs.
Although some trade-offs can be alleviated through technological innovation, there are still uncertainties.
Detailed engagement with end users, businesses and ecosystem partners can help a central bank clarify
these for its own jurisdiction. Some broad examples of system trade-offs are discussed below. However,
this is not a complete list and mostly serves to highlight open questions for any CBDC development
(summarised in Annex A).
The trade-offs between an interest-bearing CBDC and the potential financial stability impact on
the banking system are discussed above and in CPMI-MC (2018). Significantly more work is required to
really understand the trade-offs. A further practical consideration here is that it is currently easier to
calculate and pay interest using a centralised ledger. Using only a centralised ledger potentially reduces
the payments convenience of a CBDC (eg making peer-to-peer and offline payments more difficult, or
subject to caps) and using a combination of centralised and decentralised ledgers adds complexity to the
system.
Even if it adds complexity, a variety of payment options with different functionalities may be
needed to support heterogeneous use cases, eg a CBDC that could be stored in both a digital wallet and
on a dedicated device. Offering multiple user experiences and functionalities will need to be considered
in the wider business model of the system, including which services are provided by the public or private
sector. A basic CBDC offering will still need features that make it convenient and attractive enough to drive
adoption.
However, improving user convenience by making offline and peer-to-peer payments possible
would necessitate additional safeguards to counter the risk of fraud, since security features and centralised
controls (eg to “lock” stolen funds or query suspicious transactions) are more difficult to implement on a
distributed system. A centralised ledger with a cap on allowable offline transactions is a potential
compromise. However, an offline cap could limit functionality in the event of a prolonged operational
problem (eg a natural disaster) and thereby reduce the resilience of the system.
The resilience of a CBDC system’s infrastructure would also depend on how the ledger is
designed. A decentralised ledger could bring some operational resilience benefits, although so could a
centralised ledger with multiple data centres. A choice that could have more bearing on resilience would
be any interdependency or integration with other systems. If a critical function is provided to a CBDC
system by another system or supporting infrastructure, then their unavailability could impact the CBDC.
In addition to being resilient, a CBDC infrastructure will need to settle instantly a very large
number of authenticated payments and potentially increase its capacity substantially as future demand
increases. This may require compromises on some features that might otherwise be desirable (such as
computationally demanding privacy techniques or programmable payments) as additional complexities
could increase the processing demand on the system.

Central bank digital currencies: foundational principles and core features

15

## Page 21

5.

Concluding thoughts and next steps

5.1

Concluding thoughts

Understanding of CBDCs has advanced significantly in the last few years. Published research, policy work
and proofs-of-concept from central banks have gone a long way towards establishing the practical
benefits and challenges in any issuance. Progress has accompanied a gradual convergence on definitions
and terms and an improved understanding of the capabilities of current technologies. Many central banks
are actively engaging the public through reports, speeches and parliamentary hearings. A CBDC, as the
digital claim on a central bank, is just a different manifestation of the same unit of account, store of value
and medium of exchange already offered by central banks.
There is considerable agreement amongst the central banks in this group on the foundational
principles which will guide our ongoing research on CBDC. This report highlights a set of practical,
common features which build on these principles. The central banks in this group expect these features
would have to be incorporated in some fashion by any potential CBDC design, so that it can deliver on the
public policy objectives. To achieve these objectives, a CBDC must be convertible, convenient, accessible
and low cost. The underlying system should be resilient, available 24/7, flexible, interoperable, private and
secure for the general public. At the same time, the payment system upon which a CBDC exists and is
transferred must involve the private sector to benefit from innovation and competition and support
adoption and use.
A CBDC robustly meeting these criteria and delivering the features set out by this group could
be an important instrument for central banks to deliver their public policy objectives.
There is considerable scope for future collaboration to develop these features in practice.
Balancing exactly how to meet sometimes competing CBDC objectives while managing the risks in a
coherent architecture is not simple. Direct management by the central bank of more CBDC system
functions could be simpler and support objectives like universal access and resilience but may sacrifice
innovation that drives flexibility, convenience and adoption. Deciding who has access to the core ledger,
how payments are authenticated, the interconnections with other systems and how costs and revenues
will be apportioned across the system will drive key trade-offs. These include privacy and monitoring
scope, service costs and universal access, system resilience and interoperability, and personal security and
convenience. Currently, technology can ease many policy trade-offs, but it cannot transcend them.
Understanding how policy goals, practical issues and technology intersect requires further
research and technological experimentation. Considerations like the best way to deliver offline payments,
the most effective measures to drive adoption (for the public and merchants) and the right mix of controls
to limit commercial bank disintermediation are all open questions. The answers are likely to be jurisdictionand time-specific.
Today, vast sums flow within and between economies every day using the arrangements already
in place. With a mandate for stability, central banks’ introduction of CBDC should complement these preexisting systems. In broad terms, these pre-existing domestic retail payment systems work well. In the
jurisdictions of the central banks contributing to this report, the current systems offer low-cost, fast and
safe payments domestically through a mix of commercial banks, other payment service providers and cash.
Yet each has evolved over time, with an understandably domestic focus.
Differences between jurisdictions persist and policy and design choices do too. Any CBDC will
be, first and foremost, designed for domestic users and the domestic payment system. Meeting each
jurisdiction’s requirements will mean there can be no such thing as an “off-the-shelf” CBDC. Economic
design decisions on CBDC remuneration policy and any controls or tools to manage the impact on the
banking system will vary by jurisdiction.

16

Central bank digital currencies: foundational principles and core features

## Page 22

Yet national differences should not create unintended barriers to cross-border payments with
CBDCs. The potential for cross-border interoperability should be considered by central banks from the
outset of research on CBDC (focusing on broad harmonisation and compatibility between currencies to
encourage safe and efficient transfers). The central banks in this group are therefore committed to
coordinating as we move forward with our own domestic choices, exploring practical issues and
challenges.
Allowing international use of CBDC brings additional considerations for the safe functioning of
the international monetary and financial system. Spillovers are possible. A CBDC of one jurisdiction could
impact on another’s monetary policy or financial stability (eg through “dollarisation”) or be used to avoid
laws and regulations outside a jurisdiction where sufficient controls are not in place. Transparency and
coordination between central banks and other public authorities will be needed to understand and
manage any unintended consequences.

5.2

Next steps

Regardless of the motivation, any approach to issuing a CBDC will naturally be cautious, incremental and
collaborative. Yet, at the same time, debates over CBDC have matured and there is significant common
policy ground among central banks. To further advance understanding, a continued and deepened shift
in emphasis towards practical policy research and applied technical experimentation is under way.
Given the speed of innovation in payments and financial technology, this group recognises the
need to prioritise this work appropriately and proceed quickly. As a result, we recommend:
1.

This group of central banks, together with the BIS, will continue to work actively and
collaboratively on CBDC, without prejudging any decision whether or not to introduce CBDC in
our jurisdictions. We will further explore:
a.

the practical implications of the core features set out in this report while advancing our
understanding around other open questions (eg the trade-offs in CBDC designs that aim to
mitigate financial stability risks); and

b. practical issues and challenges for cross-border transfer of domestic CBDC;
and contribute to these international workstreams. In particular, we support the G20 roadmap
on cross-border payments and subsequent work on building block 19 on CBDC (“factor an
international dimension into CBDC designs”), led by the CPMI and the BIS.
2.

We invite the BIS to continue promoting information-sharing and collaboration between central
banks on CBDC research.

3.

We invite the BIS Innovation Hub to explore further technological experiments that could
support our work and we support their plans to explore the technologies that could enable
interoperability and cross-border transactions between domestic CBDCs.

4.

We will continue domestic outreach efforts to foster an open and informed dialogue on CBDC
in our jurisdictions. We will provide domestic stakeholders with opportunities to participate in
this dialogue. We will reach out to other central banks, including in developing economies, and
to international organisations.

Central bank digital currencies: foundational principles and core features

17

## Page 23

References
Adrian, T and T Mancini Griffoli (2019): “The rise of digital money”, IMF FinTech Notes, no 19/001, July.
Auer, R and R Böhme (2020): “The technology of retail central bank digital currency”, BIS Quarterly Review,
March, pp 85–100.
Auer, R, G Cornelli and J Frost (2020): Rise of the central bank digital currencies: drivers, approaches and
technologies”, BIS Working Papers, no 880, August.
Auer, R, P Haene and H Holden (2020): Multi CBDC arrangements and the future of cross-border payments,
BIS papers, forthcoming.
Bank of Canada (2020): Contingency planning for a central bank digital currency, February.
Bank of Canada and Monetary Authority of Singapore (2019): Enabling cross-border high value transfer
using distributed ledger technologies, May.
Bank of England (2020): Central bank digital currency: opportunities, challenges and design, March.
Bank of Thailand and Hong Kong Monetary Authority (2020): Inthanon-LionRock: leveraging distributed
ledger technology to increase efficiency in cross-border payments, January.
Bech, M and R Garratt (2017): “Central bank cryptocurrencies”, BIS Quarterly Review, September, pp 55–
70.
Bindseil, U (2020): “Tiered CBDC and the financial system”, ECB Working Paper Series, no 2351, January.
Boar, C, H Holden and A Wadsworth (2020): “Impending arrival – a sequel to the survey on central bank
digital currency”, BIS Papers, no 107, January.
Bossone, B (2001): “Should banks be narrowed?”, IMF Working Papers, WP/01/159, October.
Brunnermeier, M, H James and J-P Landau (2019): “The digitalization of money”, NBER Working Papers, no
26300, September.
Committee on Payments and Market Infrastructures (2018): Cross-border retail payments, February.
——— (2020): Enhancing cross-border payments: building blocks of a global roadmap, July.
Committee on Payments and Market Infrastructures and Markets Committee (2018): Central bank digital
currencies, March.
Committee on Payments and Market Infrastructures and World Bank Group (2020): Payment aspects of
financial inclusion in the fintech era, April.
Committee on Payment and Settlement Systems (2003): The role of central bank money in payment
systems, August.
European Central Bank and Bank of Japan (2019): Synchronised cross-border payments, June.
European Central Bank and Bank of Japan (2020): Balancing confidentiality and auditability in a distributed
ledger environment, February.
Ferrari, M, A Mehl and L Stracca (2020): Central bank digital currency in the open economy, forthcoming.
G7 Working Group on Stablecoins (2019): Investigating the impact of global stablecoins, October.
Kahn, C, F Rivadeneyra and R Wong (2018): “Should the central bank issue e-money?”, Bank of Canada
Staff Working Paper, 2018-58, December.
Sveriges Riksbank (2018): The Riksbank’s e-krona project, report 2, October.

18

Central bank digital currencies: foundational principles and core features

## Page 24

Annex A: Questions to guide further research
Balancing the motivations behind issuing a CBDC with the practical challenges and risks requires a central
bank to consider several open questions. This is not a complete list but provides an overview of areas still
under debate where more evidence and experimentation may be valuable for central banks.
•

How effective are potential controls against risks to financial stability (eg caps, use of interest
rates) and what consequences might they have for the functioning of the CBDC system?

•

How can features that enable convenient use of a CBDC (eg open access, offline usage, broad
and diverse support from payment system providers) be balanced with security considerations?

•

What CBDC design can best enable cross-border efficiencies while preventing unintended
international spillovers?

•

How can high standards (eg for security) be balanced with low costs for end users and payment
service providers?

•

Within the requirements of the law, what data should be collected by participants in the CBDC
system, including the central bank?

•

What are the best approaches to system design that meets policy goals, enables all key features
and supports the desired business model? How should a CBDC system be designed to remain
adaptable over decades in a changing environment?

•

How should systems be secured against the most sophisticated attackers, including organised
crime and nation states? Are the current approaches to cyber security up to the task of securing
CBDC? What is the path to ensuring future-proofing of a CBDC (eg quantum-proof encryption)?
What is the balance between applying technology and operational design to achieve security?
What if a holder of CBDC has it stolen or loses whatever keys protect it?

•

What lessons can be drawn from other domains such as safety-critical and fault-tolerant systems
to create high resilience?

•

How can future demand be forecast (eg from the internet of things)? Is there an upper bound
to scalability where the incremental cost per transaction is not acceptable?

•

Offline transactions can offer enhanced resilience and universal access. Can tamper-resistant
devices survive unbreached for long periods of non-connectivity? Can users truly settle deviceto-device or only clear the transaction locally and settle when reconnected to the network? What
is the balance between device costs against the risk and severity of breach? How should central
banks design prototype studies to help clarify ideas around usability and universal access of such
devices?

•

Which emerging cryptographic techniques can be usefully applied to privacy? Is it feasible to
provide enough capacity for a national population with these techniques? What institutional
arrangements will be required along with technology?

•

Is there value in developing standards for CBDC (eg interoperability between jurisdictions,
avoiding vendor lock-in and enabling vendors to build products for common market) and should
central banks play a part in creating these? Which initiatives should central banks support?

•

Digital identity is an emerging field in many jurisdictions. In the absence of digital identity
infrastructure, what are efficient approaches to KYC/AML/CTF? Are there commonalities across
approaches to digital identity in different jurisdictions?

•

What are the relative strengths and weaknesses of the use of proprietary technology vs open
source?

Central bank digital currencies: foundational principles and core features

19

## Page 25

Annex B: Group members
Steering group members
Co-chairs
Bank for International Settlements

Benoît Coeuré

Bank of England

Sir Jon Cunliffe

Members
Bank of Canada

Timothy Lane

European Central Bank

Fabio Panetta

Bank of Japan

Shinichi Uchida

Sveriges Riksbank

Cecilia Skingsley

Swiss National Bank

Fritz Zurbrügg

Board of Governors of the Federal Reserve System

Lael Brainard

Bank for International Settlements

Hyun Song Shin

Expert group members
Members
Bank of Canada

James Chapman
Scott Hendry
Francisco Rivadeneyra
Dinesh Shah

European Central Bank

Andrej Bachmann
Ulrich Bindseil
Fiona van Echelpoel
Arnaud Mehl
Andrea Pinna
Ignacio Terol

Bank of Japan

Masaki Bessho
Kazushige Kamiyama (from July 2020)
Takeshi Kimura (until July 2020)
Michinobu Kishi (until July 2020)
Akio Okuno (from July 2020)
Yutaka Soejima
Takeshi Yamada

Sveriges Riksbank

Carl Andreas Claussen
Gabriela Guibourg

Swiss National Bank

Martin Schlegel
Petra Gerlach
Sebastien Kraenzlin
Thomas Moser

20

Central bank digital currencies: foundational principles and core features

## Page 26

Bank of England

James Bell
Sarah John
Tom Mutton
Cormac Sullivan

Board of Governors of the Federal Reserve System

David Mills
Melissa Leistra

Federal Reserve Bank of Boston

Jim Cunha

Bank for International Settlements

Raphael Auer
Henry Holden
Cyril Monnet

The expert groups were led by Timothy Lane (Bank of Canada) and Cecilia Skingsley (Sveriges Riksbank).
Thanks also go to Michael Yoganayagam (Bank of England), Björn Segendorff (Sveriges Riksbank) and
Mario Barrantes (Bank for International Settlements).

Central bank digital currencies: foundational principles and core features

21
