---
source_type: pdf
title: "Behind the Scenes of Central Bank Digital Currency Emerging Trends, Insights, and Policy Lessons"
original_file: "thesis/reference/Behind the Scenes of Central Bank Digital Currency Emerging Trends, Insights, and Policy Lessons.pdf"
sha256: "2ca30b9e8564081b4432d7b44b0e9fd8cceedadac2006184911861d42cacd3a6"
page_count: 35
extracted: 2026-07-23
extraction_method: "text-with-ocr-review"
ocr_pages:
extraction_warnings:
  - "Page OCR failed or was not accepted (p.5: No text detected)."
---

# Raw extraction: Behind the Scenes of Central Bank Digital Currency Emerging Trends, Insights, and Policy Lessons

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

FINTECH
NOTES

Behind the Scenes of Central Bank
Digital Currency

Emerging Trends, Insights, and Policy Lessons
Gabriel Soderberg
In collaboration with Marianne Bechara, Wouter Bossu, Natasha Che,
Sonja Davidovic, John Kiff, Inutu Lukonga, Tommaso Mancini-Griffoli, Tao Sun,
and Akihiro Yoshinaga
NOTE/2022/004

## Page 2

FINTECH NOTE

Behind the Scenes of Central
Bank Digital Currency

Emerging Trends, Insights, and Policy Lessons
Prepared by Gabriel Soderberg in collaboration with Marianne Bechara,
Wouter Bossu, Natasha Che, Sonja Davidovic, John Kiff, Inutu Lukonga,
Tommaso Mancini-Griffoli, Tao Sun, and Akihiro Yoshinaga
February 2022

## Page 3

©2022 International Monetary Fund
Behind the Scenes of Central Bank Digital Currency
Emerging Trends, Insights, and Policy Lessons
Note 2022/004
Prepared by Gabriel Soderberg
In collaboration with Marianne Bechara, Wouter Bossu, Natasha Che, Sonja Davidovic,
John Kiff, Inutu Lukonga, Tommaso Mancini-Griffoli, Tao Sun, and Akihiro Yoshinaga
Names: Soderberg, Gabriel, author. | Bechara, Marianne, author. | Bossu, Wouter, author. | Che, Natasha
Xingyuan, author. | Davidovic, Sonja, author. | Kiff, John, author. | Lukonga, Inutu, author. | ManciniGriffoli, Tommaso, author. | Sun, Tao, 1970-, author. | Yoshinaga, Akihiro, author. | International
Monetary Fund, publisher.
Title: Central bank digital currency behind the scenes : emerging trends, insights, and policy lessons /
prepared by Gabriel Soderberg in collaboration with Marianne Bechara, Wouter Bossu, Natasha Che,
Sonja Davidovic, John Kiff, Inutu Lukonga, Tommaso Mancini-Griffoli, Tao Sun, and Akihiro Yoshinaga.
Other titles: Emerging trends, insights, and policy lessons. | Fintech Notes (International Monetary Fund).
Description: Washington, DC : International Monetary Fund, 2022. | February 2022. | Note 2022/004. |
Fintech notes. | Includes bibliographical references.
Identifiers: ISBN 9798400201219 (paper)

ISBN 9798400200373 (ePub)

ISBN 9798400200403 (WebPDF)
Subjects: LCSH: Digital currency. | Banksand banking, Central. | International finance.
Classification: LCC HG1710.S63 2022
The paper was written under the supervision of Tommaso Mancini-Griffoli, and drew on work by Natasha
Che, Sonja Davidovic, John Kiff, Inutu Lukonga, and Tao Sun. Marianne Bechara, Wouter Bossu, and Akihiro
Yoshinaga researched and wrote the section on legal foundations of CBDC. While the authors are responsible for any mistakes, the paper greatly benefitted from interactions with central bank representatives:
Cleopatra Davis and Kimwood Mott (Central Bank of the Bahamas), Scott Henry, Francisco Rivadeneyra,
and Dinesh Shah (Bank of Canada), Changchun Mu, Naji Liu, and Yuan Lyu (People’s Bank of China),
Sharmyn Powell (Eastern Caribbean Central Bank), Gabriela Guibourg, Johan Schmalholz, and Mithra
Sundberg (Sveriges Riksbank), and Adolfo Sarmiento (Banco Central de Uruguay). The paper benefitted
from comments by IMF staff. Carlos Padilla-Chavez provided outstanding research assistance, and Erica
Sandoval provided precious editorial assistance.
Fintech Notes offer practical advice from IMF staff members to policymakers on important issues. The
views expressed in Fintech Notes are those of the author(s) and do not necessarily represent the views
of the IMF, its Executive Board, or IMF management.
Publication orders may be placed online or through the mail:
International Monetary Fund, Publication Services
P.O. Box 92780, Washington, DC 20090, U.S.A.
T. +(1) 202.623.7430
publications@IMF.org
IMFbookstore.org
elibrary.IMF.org

## Page 4

Contents
1. . Introduction. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
2.. Policy Goals of CBDC Projects. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
A. Financial Inclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
B. Access to Payments . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
C. Making Payments More Efficient. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
D. Ensuring Resilience of Payments. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
E. Reducing Illicit Use of Money . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
F. Monetary Sovereignty. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
G. Competition. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
H. Summary of Policy Goals. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
3.. Operating Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
A. Central Bank and Private Sector Functions. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
B. The Business Model of CBDC. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11
4.. Design Features. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .12
A. Restrictions Aimed at Ensuring Financial Stability. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
B. Anonymity. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .13
C. Off-Line Capacity . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13
D. Cross-Border Payments Using CBDC. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14
E. Summary of Design Features . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
5..Technology. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .16
A. Technology Suppliers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
B. Distributed Ledger Technology vs Centralized Technology. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
C. Summary of Technology Choices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
6.. Legal Foundations for CBDC. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .18
7.. Project Implementation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .20
A. Organizational Changes at the Central Bank . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
B. Internal Staffing. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
C. Organization and Design of Pilots. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
D. Stakeholders and Public CBDC Communication . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
E. Major Challenges and Hindrances. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24
F. Key Insights. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
8. . Conclusions. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .26
References. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .27

## Page 5

[No extractable text]

## Page 6

Behind the Scenes of Central Bank Digital Currency

1

1. Introduction
Central banks are increasingly pondering whether to issue their own digital currencies to the general
public, so-called retail central bank digital currency (CBDC).1 The majority of IMF member countries are
actively evaluating CBDCs, with only a few having issued CBDCs or undertaken extensive pilots or tests.2
This paper shines the spotlight on the handful of countries at the frontier in the hope of identifying
and sharing insights, lessons, and open questions for the benefit of the many countries following in their
footsteps. Clearly, what can be gleaned from these experiences does not necessarily apply elsewhere. The
sample of countries remains small and country circumstances differ widely. However, the insights in this
paper may inspire further investigation and allow countries to gain time by building on the experience of
others. Importantly, the purpose of this paper is not to evaluate the courses taken by different jurisdictions,
but to study and discuss their key experiences and lessons.
The paper studies six advanced CBDC projects, drawing on collaboration and exchanges with the respective central banks to get insights beyond what has previously been published. Unless a specific published
source is cited, all information stems from interviews and workshops with members of CBDC project teams
in each jurisdiction.3
The chosen CBDC projects fulfill at least one of the following criteria:
a. A CBDC is already issued. Selected project: Central Bank of The Bahamas (CBOB).
b. A pilot CBDC has been or is being tested involving actual households and firms. Selected projects:
People’s Bank of China (PBOC), Eastern Caribbean Central Bank (ECCB),4 and Banco Central de
Uruguay (BCDU).
c. A CBDC project has been brought onto the country’s political agenda and is being analyzed by government or parliamentary bodies outside of the central bank. Selected project: Sveriges Riksbank.
d. The central bank has carried out a CBDC project and decided against issuing a CBDC for the time being.
Selected project: Bank of Canada (BOC).
Importantly, these countries have different national contexts and their CBDC projects are at different
stages of development (see Box 1 for a quick overview). Thus, the information that central banks can provide
differs. Whether or when these projects, except for that of the Bahamas, eventually evolve into an officially
launched CBDC offered to the general public remains to be seen.
The structure of this paper is based on the primary considerations for a CBDC project and is summarized
graphically in Figure 1. Importantly, all these considerations should be viewed as being carried out with
sound processes for risk identification and mitigation.5
This paper first explores the policy goals of the different jurisdictions. It then reviews the operational
models for CBDC, that is, who issues and distributes CBDC and the respective roles of the central bank
and the private sector. The paper then turns to the design features of CBDC, which range from ways to
1 	 CBDC is digital money issued by a central bank and is conceivable in both retail and wholesale form. Retail CBDC, or

sometimes general purpose CBDC, refers to CBDC that can be held and used by individuals, whereas wholesale CBDCs
are available only to a selected set of financial institutions. For more on these different types, see BIS (2018).

2 	 For a recent survey of CBDC projects around the world, see Boar and Wehrli (2021). For online resources that are updated

continuously, see Atlantic Council (2021) and Kiff (2021).

3 	 These central banks have also been given the opportunity to read and comment on the text before publication. Any errors

remain the responsibility of the author.

4 	 The ECCB is the monetary authority in the Eastern Caribbean Currency Union (ECCU), which is a monetary union consisting

of Anguilla, Antigua and Barbuda, Dominica, Grenada, Montserrat, St. Kitts and Nevis, Saint Lucia, and St. Vincent and
the Grenadines.

5 	 For a discussion of different risks that a central bank needs to consider in a CBDC project, see Kiff and others (2020) and

Khan and Malaika (2021).

## Page 7

2

International Monetary Fund—Fintech Notes

BOX 1. Current Status of CBDC Projects
y CBOB, Sand Dollar: The Sand Dollar was officially launched in October 2020. In late 2021, there
were around 20,000 active Sand Dollar wallets in a population of about 400,000, and functions
are continuously being developed.
y BOC: The BOC has not found a pressing case for a digital currency given the present state of
the Canadian payments system. However, it continues to build the technical capacity to issue a
CBDC, and monitor developments that could increase its urgency.
y PBOC, e-CNY: No formal decision has been taken to launch the e-CNY. The PBOC runs a pilot
in parallel in different regions. By October 2021, there were over 123 million e-CNY wallets
registered with individuals and about 9.2 million wallets held by firms—a rapid increase from
approximately six million active e-CNY wallets in April 2021. In a population of nearly one and a
half billion, the share of e-CNY users is now approaching 10 percent.
y ECCB, DCash: No decision has been made to formally issue DCash. In March 2021, the ECCB
launched a pilot program to successively extend DCash throughout the countries of the Eastern
Caribbean Currency Union (ECCU) and run the program for 12 months. Given its rapid adoption,
ECCB is now considering transitioning to an official CBDC launch.
y Sveriges Riksbank, e-krona: No decision has been made to issue the e-krona. The Riksbank has
developed a proof of concept and is exploring technological and policy angles of CBDC. A
government inquiry is investigating the role of the state in the digital payments system, including
the potential role of a CBDC.
y BCDU, e-peso: After ending a pilot in 2018, the BCDU has changed leadership and has opted
to not pursue a second pilot due to other priorities and a lack of resources. Potentially, a second
pilot will be launched in the future.

Figure 1. The Main Choices and Considerations for a Central Bank Digital
Currency Project
Technology

Project
Implementation

Operating
Model

Policy Goals

Legal
Foundations

Source: IMF staﬀ.

Design
Features

## Page 8

Behind the Scenes of Central Bank Digital Currency

3

mitigate risks to uses in cross-border payments. Next , the paper considers options available to jurisdictions
on specific technologies and moves to the legal foundations of CBDC. The last section examines the process
of exploring and testing CBDC, such as organizational choices and staffing. It also includes insights identified as particularly important by the jurisdictions themselves on the way forward.

## Page 9

4

International Monetary Fund—Fintech Notes

2. Policy Goals of CBDC Projects
Policy goals for CBDC naturally guide the ensuing exploration and work. These goals also help establish
guidelines to make design and technology choices.
The goals differ across jurisdictions, reflecting factors like the characteristics of the payment systems and
various perceived domestic challenges. Mandates may also be a consideration. Central bank laws often
establish the function of promoting efficient, safe, and secure payment systems, or set efficient and effective
monetary policy, both of which may be relevant to CBDC.
However, the themes of modernizing and/or future-proofing countries’ payment systems ran across
the various goals stated by the central banks reviewed in this paper. Modernizing is about improving the
payment system through increasing digitalization. And future-proofing refers to updating a payment system
that is already extensively digitalized to counter potential future risks associated with continuous innovation.
This section discusses the different policy goals that each jurisdiction identified as crucial. Other goals
may also exist and be important, but of lesser priority.

A. Financial Inclusion
Financial inclusion is a common policy goal for CBDC projects. Financial inclusion entails access to appropriate and affordable financial services and is associated with poverty reduction worldwide.6 But despite
significant progress, large parts of the world’s population remain financially underserved. Increasing
financial inclusion has many challenges, including access to digital technology. CBDC could potentially
facilitate financial inclusion by increasing access to digital payments and thus serving as a gateway to wider
access to financial services.
Most of the six jurisdictions in this survey identify financial inclusion as a top policy goal. In the Bahamas,
pockets of the population are excluded from financial services because they live in regions where it is not
profitable for commercial actors to operate. Approximately 20 percent of the adult population is estimated
to have no bank account.7 Geography exacerbates the problem since the Bahamas consists of many islands,
which are costly to serve.
Likewise, the ECCU consists of island nations where it has been difficult for financial institutions to develop
economies of scale and find profitable channels of expansion. Foreign banks have increasingly withdrawn
from the region, citing low profitability. The result is lower financial inclusion.
Uruguay has also seen a sluggish development of financial services for a significant part of the population. The government has actively sought to stimulate its development, including by making a digital option
mandatory for essential payments.8
While China has made rapid progress in financial inclusion and digitalization, the population in remote
regions remain underbanked and underserviced by mobile payment operators. The PBOC has sought to
promote digital payments and financial inclusion for two decades, but estimates that around 10 percent of
the Chinese population still lack access to basic financial services.9 Meanwhile, some financial institutions
that focus on local business have difficulties in digitalizing due to their technological capabilities. PBOC now
sees extending financial inclusion to this part of the population as a key policy goal for the e-CNY.

6  

For an overview of financial inclusion, see World Bank (2021), Ozili (2020), and Dev (2006).

7  

IMF (2019), p.13.

8  

The Financial Inclusion Law was enacted in 2014.

9  

For more on financial inclusion in China, see World Bank and PBOC (2018).

## Page 10

Behind the Scenes of Central Bank Digital Currency

5

B. Access to Payments
Helping facilitate payments among the population is an important objective for central banks in most
countries.10 Access to payments is associated with, but not identical to, financial inclusion. Even countries
with high levels of financial inclusion, such as Sweden, can still face access to payments challenges. Some
central banks are concerned that private payment service providers might not find extending services to all
parts of the population sufficiently profitable, and that a declining use of cash will exacerbate the problem.
Some jurisdictions are therefore exploring if a CBDC could help achieve or safeguard universal access to
payments.
Access to payments may encounter multiple hurdles, including shortage of cash, firms’ refusal to accept
cash, and lack of or recurring disturbances of digital infrastructure. In the Bahamas, for example, the island
geography creates difficulties in both distributing cash and extending digital infrastructure. This is why
the CBOB has listed access to payments—regardless of age, social status, or location—as one of its most
important goals.11
In countries in which cash usage is dwindling, access to payment is also a key concern. Some segments
of the population still rely on, or prefer, making cash payments, but may run into limitations. One of the
Riksbank’s top priority goals for the e-krona project is to ensure broad access to payments in the years
ahead.12 In particular, the Riksbank has identified the elderly and groups with certain disabilities as potentially adversely affected in a cashless society. While the Riksbank is committed to ensuring that cash will still
be available and possible to use in the future,13 it is also exploring how CBDC could facilitate the creation of
digital payments especially suitable for these groups as a complement to cash.
The BOC also emphasizes access to payments as a key policy goal despite near-universal financial
inclusion. If cash availability falls beneath a certain level, some groups might experience difficulties in
making payments. These groups include individuals in remote areas where private firms find it unprofitable
to operate, with low income, and with different forms of impairments.14 A potential CBDC could hence be
designed with universal access in mind.15

C. Making Payments More Efficient
In countries where cash and check use is high, operational costs are elevated. And in some countries,
existing digital payments are also relatively expensive. CBDC is therefore a potential policy tool to offer
digital forms of payments that are cheaper to operate. The non-profit nature of central banks means that
they could potentially offer low-cost payments as a public good, potentially subject to the need to eventually
recover costs.
The Bahamas and the ECCU are high-cost jurisdictions for both physical and existing digital payments.
In the Bahamas, an important additional consideration has been the high cost for government agencies to
make cash-based payments to citizens who lack bank accounts. There are plans to integrate government
agencies in the Sand Dollar network to support digital government payments to individuals to lower this
cost.16

10  

For a discussion on the general role of central banks in payments, see BIS (2003).

11  

CBOB (2019).

12  

Sveriges Riksbank (2018).

13  

The Riksbank is also analyzing legal forms to strengthen cash. See Sveriges Riksbank (2021a).

14  

BOC (2020), p.7.

15 	 Miedema and others (2020).
16 	 CBOB (2019).

## Page 11

6

International Monetary Fund—Fintech Notes

While the Chinese payments market in urban areas is already highly digitalized, the PBOC has expressed
a desire to improve its payment services. It sees this as part of an ongoing international effort by central
banks to improve their services to the public, comparable to the roll-out of instant payments platforms.

D. Ensuring Resilience of Payments
Ensuring the ability to pay and extending government transfers to individuals under severe circumstances
is important for all jurisdictions, but the urgency of this policy goal is especially high in disaster-prone
nations. For the Bahamas and the ECCU, resilience is thus considered a key policy goal. Both consist of
islands in a region where natural disasters are frequent. Destruction of physical, financial infrastructure and
impediments to shipping cash are immediate concerns. In the Bahamas, a hurricane in 2019 precipitated the
start of the Sand Dollar pilot in the same year to facilitate assistance payments to and within afflicted areas.
Likewise, the ECCB accelerated the expansion of its DCash pilot to areas affected by a volcano eruption
in St. Vincent and the Grenadines in 2021.
Countries with a highly digitalized payment sector are concerned about disruption to digital services and
concentration risks where there are only a few large operators. In China, for example, the mobile payment
market is dominated by two firms, AliPay and TenPay/WeChat Pay. The PBOC has expressed concern that
the failure of such firms could have serious consequences to the Chinese payments system. One of the
crucial policy goals expressed by the PBOC is for the e-CNY to function as a backup to existing digital
payment solutions.
Similarly, the Riksbank has identified single points of failure among a few dominant actors as a potential
risk that would be exacerbated in a society in which cash is no longer available as a backup or “redundancy”
system. The resilience of payments has also become an important part of the country’s ongoing modernization of civil defense.17 While the Riksbank advocates the continued existence of cash, the e-krona could
potentially serve as an additional backup to existing forms of digital payments.
The BOC has also noted that cash can function as a backup when digital payments are unfunctional, and
that falling cash usage might thus mean impaired payments resilience. CBDC could therefore potentially
play a role as an additional backup.18

E. Reducing Illicit Use of Money
Some features of cash, including anonymity and the lack of an audit trail,19 make it attractive for illicit
transactions (for example, tax evasion, money laundering, and terrorist financing). CBDC could potentially
reduce this problem.
At this point, however, only the Bahamas has reduction of the illicit use of money as a top policy objective
for its CBDC. The background to this objective is an ongoing campaign to strengthen the Anti-Money
Laundering / Combating Financing of Terrorism (AML/CTF). The Bahamas was put on the Financial Action
Task Force (FATF) grey list in 2018 due to strategic deficiencies in its AML/CFT framework, which resulted
in increased monitoring. The Bahamian authorities subsequently implemented an action plan aimed at
addressing the identified deficiencies, and as a result, the Bahamas was de-listed in December 2020.20

17  

Utredningen om civilt försvar (2021).

18  

BOC (2020), Miedema and others (2020).

19  

FATF (2015).

20  

FATF (2020).

## Page 12

Behind the Scenes of Central Bank Digital Currency

7

F. Monetary Sovereignty
While currency substitution has long been a risk facing countries, it is possible that new forms of digital
currency might have a competitive advantage relative to older forms of currencies. If a sufficiently large
portion of a country’s population adopts a foreign digital currency or a global stablecoin, the ability of the
country to carry out several crucial central bank functions might be impaired, such as monetary policy and
lender of last resort.21
The BOC has stated that serious consideration of a CBDC might be triggered if monetary sovereignty
were to become an issue—say if Canadians began adopting a non-Canadian digital currency or stablecoin.22
Likewise, the PBOC has said that one motivation for investigating CBDC was to secure monetary sovereignty
in a digital future.23

G. Competition
CBDC could potentially increase competition in a country’s payments sector in two ways: directly, by
competing with existing forms of payments; and indirectly, should the CBDC be designed as a platform
open to private payment service providers (see the following section, Operating Model). The latter would
ensure low barriers of entry for new firms seeking to offer new payment services.
The Riksbank, in particular, sees competition as a potentially important contribution by the e-krona.
The payments market, according to Riksbank analysis, displays clear network effects that tend to favor the
concentration of a few large actors. This may lead to high fees or stagnating innovation in the future. The
e-krona could be a way to ensure more competition and enhance market efficiency.24
The BOC has also said that the high concentration of service providers in the Canadian financial system
may be contributing to the high costs of payments. If cash were to decline significantly, competition in the
Canadian payments market would decline even more. This is among the reasons why the BOC is monitoring
cash usage and building capacity to launch a potential CBDC.

H. Summary of Policy Goals
The different policy goals of the jurisdictions in this survey are summarized in Table 1.

Table 1. Jurisdictions’ Stated Policy Goals of Central Bank Digital Currency
Country

Financial
Inclusion

Access

Efficiency

Illicit Use
of Money

Resilience

Bahamas

✓

✓

✓

✓

✓

Canada

Competition

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

China

✓

ECCU

✓

Sweden
Uruguay

Sovereignty

✓
✓

✓

✓

Sources: Central banks.
Note: ECCU = Eastern Caribbean Currency Union.

21  

For example, IMF (2020a) and BIS and others (2021).

22  

BOC (2020).

23  

For example, Mu (2021).

24  

Sveriges Riksbank (2017, 2018); Soderberg (2019).

✓

## Page 13

8

International Monetary Fund—Fintech Notes

3. Operating Model
A crucial choice is how CBDC will be issued and circulated, and what the role of the central bank and the
private sector will be. We refer to this overarching structure as the operating model.25 Different names and
classifications are used in other literature and there is no established standard for the typology of different
operating models.26
In the first model, which we call unilateral CBDC, the central bank carries out all functions in the payments
system, from issuing the CBDC to distributing it, and interacting with end-users.
The second model entails issuance by the central bank, but includes a role for private sector firms to
interact with the end-user. We refer to these agents as intermediaries and the model in which they operate
intermediated CBDC. The intermediary role can be filled by financial firms, but also other types of companies
such as payment service providers and mobile phone operators. Most would likely be privately-owned and
for-profit firms, but state-owned intermediaries and cooperatives may also be involved.27 This second model
would require the central bank to regulate and/or oversee other actors, which adds an extra layer of legal
and operational complexity.28
In the third model, digital currency is issued not by the central bank but by private firms that back the
issuance by holding central bank liabilties. Hence, the third model is not a CBDC, but rather a stablecoin, or
a special type of e-money, as it is not issued by a central bank and may be referred to as synthetic CBDC or
sCBDC. But as it is backed one-to-one by central bank-issued assets, it may be considered by some central
banks as an alternative to CBDC, and is therefore included in this paper.
These conceptual models should not be seen as mutually exclusive. Some central banks are considering
the intermediated model as their main operating model, but also offering basic payment services through a
unilateral model to ensure universal access and resilience. Likewise, an sCBDC is not necessarily a replacement for CBDC and could, for instance, be issued by private firms alongside, or even backed by, CBDC.29
These three conceptual models are depicted in Figure 2.
These conceptual operating models are useful starting points for discussions on CBDC design. So far,
there is a convergence on the intermediated model. No central bank in this survey has explored the unilateral or synthetic CBDC models and the rest of this section will focus on the intermediated model.30

25

This follows the concept used in Kiff and others (2020).

26

For example, see Armelius and others (2020), BOE (2020), and Auer and Böhme (2020).

27

For a discussion on how state-owned enterprises have developed in the recent decades, see Bruton and others (2014).

28

For a discussion, see Kiff and others (2020).

29
30

See Adrian and Mancini-Griffoli (2019, 2021), Auer and Böhme (2020), and Auer and others (2021).
Recently, however, the Hong Kong Monetary Authority issued a whitepaper outlining an approach similar to sCBDC.
Cash in Hong Kong SAR is currently also mainly issued by private institutes rather than the monetary authority. For more
on this, see HKMA (2021).

## Page 14

Behind the Scenes of Central Bank Digital Currency

9

Figure 2. Three Conceptual CBDC Operating Models

Unilateral CBDC
Central bank issues money and
performs all functions, including
direct interaction with end users

Intermediated CBDC
Central bank issues money, but
delegates functions to non-central
bank intermediaries who interact with
end users

Synthetic CBDC
Non-central bank actors issue money
that is backed by central bank assets
that they acquire from the central
bank (dashed line)

Source: IMF staﬀ.
Note: CBDC = central bank digital currency.

A. Central Bank and Private Sector Functions
The intermediated model can take different forms depending on how functions are distributed between
the central bank and private intermediaries, as illustrated in Figure 3.
When discussing the distribution of functions between actors, it is useful to distinguish between the
owner of the technical system necessary to carry out a specific function and the executor of the function
itself. These are not always the same; indeed the system might be owned by the central bank while the

Figure 3. Functions to Be Carried Out in a CBDC Environment
Issuing

Ledger Update

Validation

User Interface

KYC-AML/CFT

Customer Service

User Data

Source: IMF staﬀ.
Note: AML/CFT = anti–money laundering/combating the financing of terrorism; KYC = know your customer.

## Page 15

10

International Monetary Fund—Fintech Notes

function is carried out by a private company.31 For instance, the IT system that intermediaries use to monitor
users of the Sand Dollar relating to AML/CFT is owned by the CBOB, which ensures a standardized approach.
As mentioned above, delegating functions to private actors still requires regulation and monitoring.
Issuing is obviously a crucial function of all types of money. As discussed above, all central banks in
the study currently explore models in which the CBDC are their own liability, just like cash. It is possible,
though, for central banks to let a private company own the technical systems that enable CBDC issuance.
For instance, in the Uruguay e-peso pilot, a private vendor owned and operated a technical system that
converted pesos created by the central bank into e-pesos, effectively making the issuance of e-peso into a
two-stage process.32
Validation refers to validating a transaction. The concept is often associated with the validation that takes
place in a distributed ledger technology (DLT) network but can also refer to more traditional processes
including checking the user’s identity, the authenticity of money, and the availability of funds.33 In some
cases, these functions are divided between the central bank and private entities. For instance, in the e-krona
proof of concept, the central bank owns and operates a notary node that ensures money has not been spent
before, while private intermediaries carry out remaining validations, such as checking the authenticity of
e-kronas.
Each transaction entails a ledger update when users transfer holdings of CBDC between each other. A
ledger is a database of records of monetary holdings but can be either centralized or distributed across a
network. Updating the ledger means updating the records of CBDC balances after payments have been
made. The centralized ledger, owned and updated by a single entity, is still the standard approach among
central banks, whereas DLT is a potential new approach.
In the case of DLT, at least three alternatives exist. First, the central bank owns the infrastructure of the
entire ledger and updates it (for example, the Bahamas Sand Dollar). Second, the central bank owns the
ledger, but private intermediaries update it. And third, a private intermediary owns part of the ledger and
updates that same part of the ledger, conditional on the central bank’s approval (in the Swedish e-krona
proof of concept, the intermediary can update the ledger after the central bank’s notary node has checked
that no double spending has taken place).
The remaining functions of Figure 3 concern the interaction with the end-users. KYC-AML/CFT refers to
the process of implementing Know Your Customer (KYC) and AML/CFT requirements (for example customer
due diligence measures) aimed at combating illicit flows. User interface denotes the means through which
users can interact with and/or pay with their CBDC holdings, such as through applications on mobile phones.
User data refers to the function of handling the personal data of users, and customer service captures the
process of helping users connect to the CBDC, handling errors, and solving other issues.
Table 2 summarizes how functions are allocated between central banks and private sector actors in the
six CBDC projects.34 In some cases the distribution of functions may change when the project progresses
from pilot to formal launch. For instance, the ECCB currently offers private intermediaries a ready-made
application for users to interact with DCash wallets, but states that after a formal launch, intermediaries
would develop their own user interfaces.
31

32

Importantly, systems ownership does not preclude outsourcing of certain aspects but it entails responsibility for the
overall development, maintenance, and functionality of the system, including outsourced services. For a definition of
system owner, see NIST (2021).
For more on potential operational risks of outsourcing central bank activities, see Kiff and others (2020)

33

For an overview of DLT in payments, see BIS (2017) and Shabsigh and others (2020). DLT can be permissionless, meaning
that anyone can join the network and partake in performing crucial functions, or permissioned, meaning there are strict
requirements to joining the network. All central banks that are currently exploring DLT are focusing on the permissioned
variant. For more on this, see Natarajan and others (2017).

34

Private sector here includes state-owned enterprises and cooperatives. See Bruton and others (2014) for a discussion.

## Page 16

Behind the Scenes of Central Bank Digital Currency

11

Table 2. The Distribution of CBDC Functions Between the Central Bank and the Private Sector
Issuing
Owner

Executor

Validation
Owner

Executor

Ledger Update

KYC-AML/CFT

User Interface

Owner

Owner

Owner

Executor

Executor

Executor

User Data1
Owner

Executor

Customer Service
Owner

Executor

Bahamas
Canada
China
ECCU
Sweden
Uruguay
Color scheme:
Central Bank
Both
Private
Still Exploring
Source: Central banks and IMF staff.
Note: AML/CFT = anti–money laundering/combating the financing of terrorism; KYC = know your customer.
1One option is to grant central banks access to data stored by intermediaries. This is the practice in China.

B. The Business Model of CBDC
The business model of CBDC is a key concern for both private firms and the central bank. If private
firms are expected to carry out a function in the CBDC ecosystem, they will have to make a profit at least in
the medium term. Similarly, though central banks are not-for-profit organizations, they will need to decide
whether to seek cost-recovery for their expenditures of building the CBDC system. Central banks may also
decide to subsidize the use of CBDC to increase adoption if supported by a particular policy goal.
Among the CBDC projects reviewed in this paper, there is almost universal consensus that the main
business model for private intermediaries is fees on payments. The role of the central bank is seen as
providing a free or low-cost platform on which private intermediaries can operate. None of the central
banks favor allowing private intermediaries to gather payments data, which could be used for commercial
purposes. The PBOC notes it does not charge intermediaries or users, and intermediaries cannot charge
individual users in the e-CNY project. However, intermediaries have the choice of charging merchants. The
PBOC views this as a substantial incentive for firms to enter the market, and keeping fees in check.
The BOC states the choice of business model is complex. One possibility is for the central bank itself to
provide a basic CBDC payment function to the public, possibly but not necessarily charging a fee for using
it. The Riksbank is also considering this approach.
The question of whether a central bank should charge intermediaries for using the CBDC system is also
connected to the question of whether it anticipates recovering its development costs. There is a risk that
if central banks collect fees, intermediaries will in turn pass the cost downstream and raise the price of
payments, which may counter initial policy goals. The question of whether and how to cover costs remains
an open question, and the BOC states this as one of its most important areas of research.
Staff at the Riksbank also state that charging intermediaries fees is difficult because of the current regulatory framework. Another issue is that charging fees would possibly contradict its commitment to offering
payments as a public good. Revenues for the central bank would likely solely be in the form of seignorage.
While subsidizing the adoption of CBDC is currently not seen as a viable path, the Riksbank is discussing if
it might subsidize the cost of developing certain functions that the private sector would not find profitable.
Examples of this include increasing payments resilience and developing payment solutions for minorities.

## Page 17

12

International Monetary Fund—Fintech Notes

4. Design Features
CBDCs can be designed in different ways with different characteristics and functions. We refer to these
characteristics and functions as design features. Design features are more specific than the operating
model, and CBDCs with the same operating model can still differ in their design features. CBDC designs are
generally intended to support policy goals or mitigate risks that could arise from issuing CBDC. This section
is divided by topic and ends by summing up design features of individual projects in Table 3.

A. Restrictions Aimed at Ensuring Financial Stability
Central banks engaged in CBDC projects have committed to not jeopardizing financial stability and
avoiding any sudden shifts to the structure of the financial system.35 The literature discusses the potential
risk that the introduction of CBDC could create, including crowding out banks and facilitating bank runs.36
In addition, the literature discusses different ways to mitigate these risks by either restricting CBDC balances
or taxing the use or balances of CBDC above a threshold.37
All CBDCs that are currently circulating, either as official currency or through a pilot, are designed with
restrictions that limit the competitiveness of CBDC versus bank deposits. At the time of writing, however,
only three of the six central banks in this study—the central banks of the Bahamas, China, and the Eastern
Caribbean—have circulating CBDC. Other central banks are still analyzing these questions conceptually.
Limits on CBDC fall under two main categories: restrictions on remuneration of CBDC and quantitative
restrictions on holdings and transactions of CBDC.
Restrictions on the Remuneration of CBDC
The Bahamas, China, and the ECCU currently do not pay interest on CBDC holdings. In all three cases, the
reason is to limit CBDC competition with bank deposits. If there is no interest, CBDC can still be attractive
as a means of payment, even while its attractiveness as a store of value (savings instrument) diminishes.38
There is a potential policy trade-off between limiting competition with bank deposits and ensuring an
effective transmission mechanism of monetary policy. Staff at the Riksbank, reflecting the past Swedish
experience of low interest rates, point out that a zero percent interest rate on CBDC could limit the ability to
carry out a negative interest rate monetary policy.39 Also, the attractiveness of bank deposits versus CBDC
would shrink with lower policy rates. A possible solution is a CBDC with an interest rate that is consistently
lower than the policy rate. The Riksbank is investigating the legal issues related to paying interest rates
(whether positive or negative) on CBDC.40
An alternative discussed in the literature is to impose fees on transactions above a certain threshold, but
so far none of the CBDC projects have tried this.
Quantitative Restrictions
All three active CBDC projects were designed with quantitative restrictions. The goal is to explicitly limit
competition with bank deposits but also to foster financial inclusion. To lower the threshold to onboard new

35  

Central Banks and BIS (2020), G7 (2021).

36  

For example, see Kumhof and Noone (2018), Juks (2018), and Bindseil (2019).

37  

In particular, see Bindseil (2020).

38  

For more on this, see Agur and others (2022).

39  

For example, see Armelius and others (2018) and Armelius and others (2020).

40  

For a legal discussion on interest rates and CBDC, see Bossu and others (2020).

## Page 18

Behind the Scenes of Central Bank Digital Currency

13

users, small CBDC holdings are allowed without the need for identification or other KYC procedures (see
more in the section on Anonymity).
Without special arrangements, it is not possible to send money to a wallet that has reached its specified
limit, and the sender will typically receive an error message when trying to do so. CBDC holdings may also
be connected to a bank account to which excess holdings of CBDC may automatically be transferred. Such
a function is currently under development in the Bahamas Sand Dollar.
Limits to CBDC balances may also help limit pilot programs. Uruguay limited both the number of users
and the amount of total e-pesos each user could hold. This made the pilot more manageable, but also
lowered risks of disruptions and to the reputation of the central bank (were something to go wrong).
The ECCB DCash pilot also plans to limit the total amount of DCash that can be created. For now, however,
DCash is offered to meet demand. No decision has been made on when to set the limit or how high it should
be, in part to meet unexpectedly high demand due to the COVID-19 pandemic and support the economic
recovery.
The Riksbank is exploring different technological options that could allow quantitative restrictions, and
has tested a payments card which carries a limited amount of e-krona.

B. Anonymity
Anonymity is one of the key traits of cash, and the rise of digital payments threatens the lawful or legitimate preference for anonymity by certain segments of the public or for certain purposes—such as buying
a present for one’s spouse. Anonymity is also connected to financial inclusion: non-anonymous payment
services often require forms of identifications that can be difficult or costly to obtain.
However, anonymity can also be used for illicit purposes and can undermine AML/CFT measures.
Anonymity, therefore, poses a policy trade-off—the more anonymity, the larger the risk for illicit use.
All three active CBDC projects have chosen the same way to handle the policy trade-off between anonymity/
financial inclusion and AML/CFT compliance. Their approach has been to provide a tiered selection of
wallets with different levels of thresholds. Those with lower thresholds allow for greater anonymity. As a
result, CBDC can more easily be rolled out into rural or disadvantaged areas where virtual identification can
be difficult.
The use of tiered CBDC wallets thus gives rise to “policy synergies” between anonymity, risk-reduction (of
bank runs), and financial inclusion.

C. Off-Line Capacity
The ability to pay when not connected to main telecommunication systems is important to increase resilience in crisis situations, such as during natural disasters and armed conflicts. Off-line capacity is hence
linked to the policy goal of resilience and is especially important in disaster-prone or geopolitically tense
areas. The PBOC also emphasizes that off-line functionality is important in areas with patchy telecom access,
which also often correspond to areas of low financial inclusion.
In practice, off-line functionality has turned out to be complicated technologically.41 Further, the exact
definition of off-line transactions differs. Often the term refers to being off-line from the Internet but still
reliant on a local network, such as Bluetooth. But some events such as prolonged black-outs or electromagnetic disturbances might affect local networks as well.
The Bahamas considers off-line functionality to be vitally important but has encountered difficulties in
achieving it. The pilot revealed that the planned solution of local off-line networks—built on introducing
local redundancies to the main telecommunication system—did not fully achieve the policy goal. The
41  

For a discussion, see Chohan (2021), Armelius and others (2021), and ECB (2020).

## Page 19

14

International Monetary Fund—Fintech Notes

telecommunication towers required in the solution are vulnerable to the same weather conditions as the
main telecommunication system. Also, the geographical reach of the local networks is limited, which makes
it difficult to make payments between islands. Presently, the CBOB is working with its main contractor to
identify alternative solutions. Staff at the CBOB state that the decision to explore alternative off-line solutions
was the most significant change that resulted from the practical experience of the pilot.42
The PBOC has tested different solutions, and reports that sufficiently safe and efficient off-line payments
are now in place. These include hardware-based e-CNY wallets placed inside mobile phones, or held as
cards that can make payments to another mobile phone wallet in physical proximity without Internet access.
To reduce the effects of illicit tampering with the devices, which could lead to double spending and counterfeiting, each user can only perform a limited number of off-line payments before needing to go back online
to access the main ledger. In addition, offline payments in e-CNY involve a variety of technologies, including
digital signature and encrypted storage to further reduce risks.
The team working on the Swedish e-krona proof of concept has identified a number of potential solutions
to establish offline functionality and is proceeding to test these. Participants have identified several challenges, such as how to prevent double spending and ensure the authenticity of e-kronas while off-line.43

D. Cross-Border Payments Using CBDC
Central banks and international organizations are increasingly evaluating the use of CBDCs to enhance
the efficiency of cross-border payments, which is generally considered costly and inefficient.44 The G20
has instigated an ongoing collaboration between international organizations and national central banks to
explore ways to further this goal, including through CBDCs.45
Retail CBDC projects are carried out primarily with domestic purposes in mind, at least so far. Nonetheless,
discussions on how CBDC could potentially be used in cross-border payments are ongoing. And technical
experiments on wholesale CBDC for cross-border usage have been conducted for several years.46 Adverse
macroeconomic implications, such as increased currency substitution and vulnerability to financial shocks,
are possible as retail CBDC become available across borders.47 These potential risks, and means of mitigating them, are being discussed in the context of the G20 roadmap to enhance cross-border payments.
The six jurisdictions in this study are exploring cross-border issues carefully but largely on the side of their
domestic considerations. Canada, China, and Sweden are represented in the Future of Payments Working
Group, which stems from the G20 roadmap. In addition, the PBOC is also exploring how a retail CBDC, such
as the e-CNY, can be used for cross-border payments, and has partnered with the BIS Innovation Hub and
other national central banks in the multi-CBDC Bridge project—an experimental CBDC arrangement leveraging DLT to facilitate cross-border payments.48
The PBOC states three principles for their ongoing work on cross-border payments for CBDC. The first
is the principle of “no disruption,” which in practice means to avoid negative spillovers on the Chinese
economy and that of other nations, such as significant currency substitution. The second rule is that any
CBDC cross-border payments system must be compliant with the rules and regulations of all connected
countries, including capital flow management measures. In addition, according to the PBOC, information
42

The tested solution relied on smaller local networks that were meant to act as backups to the main telecommunication
system rather than independently of telecommunications.

43

See also Sveriges Riksbank (2021b).

44

BIS and others (2021).

45

FSB (2020).

46

For example, see BOC and others (2018) and BOT and HKMA (2020).

47

For more on potential macrofinancial implications of cross-border use of CBDC, see IMF (2020a) and BIS and others (2021).

48

BISIH and others (2021).

## Page 20

Behind the Scenes of Central Bank Digital Currency

15

flows between countries should be improved to help authorities counter illicit use of money, including tax
evasion. According to the third rule, cross-border payments should involve interoperability across domestic
CBDCs or between domestic CBCDs and incumbent payment systems rather than a single CBDC used
for transactions on both sides of the border. The PBOC thus prefers a system where domestic CBDCs are
converted to other currencies as payments cross borders.
The Bahamas does not currently allow the Sand Dollar to be used outside its borders. It has stated that
the Sand Dollar is exclusively intended for domestic purposes and that cross-border payments must take
place through commercial banks in traditional non-CBDC Bahamian dollars. However, foreigners can own
and pay with Sand Dollars when visiting the Bahamas after registering for an account with a low limit on both
balances and monthly transactions.49 Nevertheless, the central bank is planning to explore cross-border
functionality for the Sand Dollar within the next three years.
Staff at the ECCB look favorably to using CBDC for cross-border payments, given the importance of
trade and overseas remittances for the countries in the ECCU. The ECCB has begun discussions with other
regional central banks regarding the interoperability with legacy payment systems and platforms to enable
remittances and trade in the region. At present, however, the main priority is ensuring that DCash works for
domestic purposes. That being said, as the ECCU consists of eight different nations, the DCash technically
represents the first trial of a single CBDC used for cross-border payments, although within a monetary union
and with the same central bank.
Staff at the six central banks have raised the following main hurdles to using CBDC across borders:
y Technical interoperability: The lack of coordination on technology and messaging standards in initial
stages of development could imply that retrofitting CBDC for cross-border use will be costly and complex.
Collaboration on the G20 roadmap may help, while decentralized forms of compatibility between different
DLT systems may also be promising.50
y Legal and regulatory harmonization: At present, all the jurisdictions have carried out their legal investigations based on their domestic legal systems. However, some harmonization may be needed regarding
the treatment of data and privacy, tax and payments laws, and capital flow management measures.

E. Summary of Design Features
Table 3 summarizes the design features under consideration or deployed by the six central banks.

Table 3. Design Features of CBDC Projects
Carry Interest or Not

Quantitative
Restrictions

Anonymity

Offline

Cross-Border Payments

Bahamas

No

Yes

For lower tier

Yes/exploring

Future project

Canada

Undecided

Undecided

Undecided

Exploring

International collaboration

China

No

Yes

For lower tier

Yes

Experimenting/international
collaboration

ECCU

No

Yes

For lower tier

No

Future project

Sweden

Undecided

Exploring

Undecided

Exploring

International collaboration

Yes

Yes, but
traceble

No

Possible future project

Uruguay

No

Source: Central bank staff and published sources.

49

It is possible, however, to integrate a Sand Dollar account with a bank account so that CBDC is exchanged into commercial
bank money before making the cross-border payment.

50

BIS and others (2021), Herlihy (2018).

## Page 21

16

International Monetary Fund—Fintech Notes

5. Technology
CBDCs rely on technology, which must be appropriately selected to operationalize the policy goals
discussed earlier. Even in an intermediated CBDC model, the central bank must build a core system for
issuing CBDC and processing transactions. One of the great difficulties is making decisions while much
of the technology is still developing and remains relatively untested. Central banks must decide where to
acquire technology, if they do not build it in-house, and which technology best suits their purposes.

A. Technology Suppliers
A central bank typically needs to acquire technology from or partner with external vendors to develop
proprietary solutions. So far, there are two main approaches to the technology supply question. The first is
to choose a main contractor that supplies the technology and collaborates with the central bank to develop
the CBDC. This “CBDC package solution” was chosen by the Bahamas (NZIA), the ECCB (Bitt), Sweden
(Accenture), and Uruguay (Roberto Giori). In the case of Sweden and Uruguay, however, contractors were
used to deliver a specific test solution and thus would not necessarily be relied upon to further develop, and
potentially launch, CBDC.
In the second approach, the central bank relies to a greater extent on internal resources and has different
contractors for different areas as necessary. This approach tends to be more onerous for the central bank
in terms of internal capacity and resources, but also offers more control over the development process.
Canada and China have chosen this path. The BCDU indicates that a second Uruguay CBDC pilot may likely
be based on this approach to avoid relying on a single vendor.
Intermediaries can also be selected as development partners. The PBOC, for instance, has partnered
with specific e-CNY intermediaries to develop payments solutions and functions that have been added to
the e-CNY ecosystem.

B. Distributed Ledger Technology vs Centralized Technology
Distributed ledger technology (DLT), the best known of which is blockchain, has in recent years emerged
as a promising alternative to technologies that are based on centralized ledgers. Central bankers are
therefore faced with another technology choice.51 The choice is particularly difficult as DLT is still developing, and its capacity and suitability are being explored. Some pilots and proofs of concept are therefore
testing DLT without necessarily expecting to select it for further development.
The experiences so far suggest that there is no universal case for DLT as the primary engine of CBDC,
and jurisdictions have different views on the potential merits of the technology. The Bahamas and the ECCB
have DLT-based systems, and staff from both central banks cite the security of the technology as valuable
for their needs.
The PBOC, on the other hand, has tested DLT during its pilots and decided that its capacity to process
transactions and store data does not meet its requirements. It is particularly concerned about e-CNY’s
ability to handle days with very high levels of transactions, such as the “Singles Day” (November 11, China’s
equivalent to Black Friday in the United States).
However, the PBOC has committed to what it refers to as a “hybrid architecture.” Thus, DLT is being used
in the e-CNY system but only in limited areas where it is deemed to have an advantage over other technologies. Intermediaries can also base their activities on any technology, including DLT, and still function in
the e-CNY ecosystem.This openness to different technologies is part of what the PBOC calls a “Long Term
51  

See Kiff and others (2020), Auer and Böhme (2020).

## Page 22

Behind the Scenes of Central Bank Digital Currency

17

Evolution System,” through which new features of technology can continue to be added to the e-CNY even
though its core is a centralized ledger.
The e-peso did not rely on DLT, but BCDU staff acknowledge that a potential second e-peso pilot might
test the appropriateness of DLT, or a hybrid system that incorporates DLT for particular purposes.
The BOC has not decided on technology but is carrying out multiple technological workstreams,
including DLT. Its staff has expressed some skepticism about the suitability of DLT for central bank purposes
but acknowledges that DLT can support some important functions. One possibility would be to combine
different technologies to achieve different purposes.52
The Riksbank is currently exploring a DLT-based proof of concept, but its staff stress that a potential future
e-krona does not necessarily have to be built on DLT. A second e-krona proof of concept or pilot could thus
be based on a different technology.

C. Summary of Technology Choices
Table 4 sums up the technology choices described above.

Table 4. Summary of Technology Choices
Main Tech Contractor

DLT

Bahamas

NZIA

Yes

Canada

—

—

China

—

Hybrid

ECCU

Bitt

Yes

Sweden

Accenture

Testing

Uruguay

Roberto Giori

No

Source: Central banks and published sources.
Note: DLT = distributed ledger technology; ECCU = Eastern Caribbean Currency Union.

52  

BOC (2020).

## Page 23

18

International Monetary Fund—Fintech Notes

6. Legal Foundations for CBDC
CBDC53 requires a legal framework that clarifies whether the central bank has the mandate to issue CBDC
and what status it would have legally.54 Existing legal frameworks were typically enacted in a pre-digital age,
and investigating CBDC therefore also entails ascertaining whether law reform is necessary to ensure that a
CBDC can be issued by the central bank.
The status of the six surveyed jurisdictions is summarized in Figure 4.

Figure 4. Status of Law Reforms in the Six Jurisdictions
No Law Reform
Envisaged at this Stage

Law Reform Under
Preparation

Law Reform Enacted

Uruguay

Sweden

Bahamas

Canada

China
ECCU

Sources: Central banks and IMF staﬀ.
Note: ECCU = Eastern Caribbean Currency Union.

To issue the Sand Dollar, The Bahamas enacted a revised legal framework, the Central Bank of Bahamas
Act, in 2020. The currency issuance function is broadly worded, and the definition of “currency” explicitly
includes not only banknotes and coins but also “electronic money” issued by the Central Bank.55 Moreover,
the Act specifically grants the Central Bank the power to issue currency in the form of “electronic money.”56
To support this, the Act also grants the Central Bank regulatory powers to prescribe “the framework under
which electronic money issued by the Central Bank…may be held or used by the public.”57
Among the countries that have not yet formally issued a CBDC law, reform is still being investigated and
prepared. For example, China is preparing for a general revision on People’s Bank of China Law (draft), which
suggests that Chinese currency includes both physical and digital forms (e-CNY) and thus confirm the legal
tender status of e-CNY.58 The draft law provides the central bank with the broad power to plan, organize,
and supervise the payment system and financial infrastructures. The Central Bank will have responsibility
to coordinate the work on national financial security, with the goal of developing a cyber-resilient CBDC.
In addition, the draft law explicitly prohibits and imposes fines on the production, sale, and circulation of
“illegal CBDC.”
The ECCB has prepared a draft amendment to its central bank act. The draft amendment would establish
the legal foundation of CBDC by extending the definition of “currency” to “digital currency.”59 Further, it

53  

This section was written by Marianne Bechara, Wouter Bossu, and Akihiro Yoshinaga.

54  

On the analytical model for assessing those questions, see Bossu and others (2020).

55  

Central Bank Act of The Bahamas (2020). Sections 5(1) and 8(1).

56  

Central Bank Act of The Bahamas (2020). Section 12(7).

57  

Central Bank Act of The Bahamas (2020). Section 15.

58  

PBOC (2020). Articles 18 and 19.

59  

Eastern Caribbean Central Bank Agreement (Amendment) Order (2020), Article 2.

## Page 24

Behind the Scenes of Central Bank Digital Currency

19

explicitly attributes legal tender status to digital currency and clarifies the central bank’s sole right to issue
digital currency.60
In Sweden, the legal questions are currently being investigated in a government inquiry launched after
a petition was sent to Parliament by the Riksbank in 2019.61 In parallel, the central bank is actively analyzing
whether existing means of payment and legal mechanisms in Sweden would be fit for e-krona operations or
whether new types of assets or legal mechanisms should be created by law.
Since it has decided not to issue a CBDC at this time, Canada is not currently looking into law reform.
When Uruguay completed its six months e-Peso pilot in 2018, the legal framework was considered sufficient
at the time for the central bank to carry out the testing without the need for legal amendments. Such amendments, however, would be necessary for an official roll-out of the e-peso, according to the central bank.
Surveyed central banks flagged several legal challenges (in addition to the challenge of legal harmonization mentioned in the section on cross-border payments) to issuing CBDC, as well as lessons that could be
drawn from that process.
“Law follows technology”: In many cases, the operating and even legal design of CBDC was initially driven
by technological developments, often under the advice of consulting firms. Central banks are therefore
recommended to initiate legal reflections very early in the process. This should go hand in hand with building
sufficient internal legal capacity in central banks’ legal departments.
Understanding the legal nature of CBDC: In many countries, this new form of money poses significant
legal challenges under public and private law. In some countries, some fundamental issues still need to be
decided, such as the legal nature and ramifications of issuing digital currency (for instance, rights of holders
subsequent to the insolvency of authorized providers). Given the many legal complexities, several central
banks relied on external counsel to develop the legal-regulatory framework for CBDC. Central banks should
consider combining the abovementioned internal capacity building with a needs assessment for external
counsel. This could go hand in hand with a close dialogue with financial intermediaries, in particular, to gain
insights into for instance how they see CBDC impacting their business models.
Legal tender status: While central banks acknowledge that the technical means to receive CBDC in
payment (such as devices or internet access) is not universal in their countries, most of the surveyed central
banks nevertheless advocate granting legal tender status to CBDC. This approach could be possible under
a fairly “relaxed” legal conception of legal tender status, with ample space for contractual derogations.
That said, it is also acknowledged that without wide acceptance and circulation of CBDC, the reputation of
the issuing central bank would be at risk. Against this background, a few jurisdictions have started a fundamental debate on the role of legal tender currency.
Flexibility and law reform in preparatory phase vs. final phase: Several central banks indicated that they
saw no need for law reform in the pilot phase, but that law reform would be necessary for the final phase
(roll-out). Maintaining this type of flexibility during the pilot phase may be useful for other central banks, in
particular at a stage where CBDC is not yet issued as an actual liability of the central bank, and central banks
may alter fundamental design features subsequent to the pilot.
Specific vs. general law reform: Modifying the central bank law and other laws only to strengthen the
legal basis for CBDC issuance may be the fastest route. However, a few central banks chose to anchor these
amendments into a broader reform of the central bank’s charter to address other legal issues. This was the
case in the Bahamas. Whilst such an approach may somewhat slow down the law reform process, it yields the
benefit that other aspects of the central bank’s legal framework can be strengthened in conjunction. Going
forward, countries should assess whether CBDC-related law reform could be an opportunity to introduce
other legal amendments.
60  

Eastern Caribbean Central Bank Agreement (Amendment) Order (2020), Articles 18(1) and 18(3).

61  

SOU (2021).

## Page 25

20

International Monetary Fund—Fintech Notes

7. Project Implementation
CBDC projects are generally large undertakings for central banks and need to be organized, staffed, and
financed. The availability of resources differs across central bank, as does the importance of CBDC projects
relative to other undertakings. Carrying out a pilot further requires planning and execution, supportive
institutional structures, and investment in staff education, skills, and retention. A key part of a CBDC project
is also to ensure that there is enough staff to identify and monitor operational risks.62
This section investigates the different organizational paths taken by this paper’s six central banks, the
learning curve of staff engaged in CBDC, and the main challenges they have faced.

A. Organizational Changes at the Central Bank
Central banks investigating CBDC must decide whether to make formal organizational changes, or work
with existing structures. Some have created new committees, divisions, or research centers.63 Others have
instead reprioritized the work of staff in existing divisions.
At one end of the spectrum, and reflecting the size of its undertaking, the PBOC first set up a specialized
work team in 2014, but two years later created a new specialized institute, the Digital Currency Institute of
the People’s Bank of China (PBCDCI). The PBCDCI has set up subsidiaries across geographical areas to help
organize the e-CNY pilots.
Similarly, the CBOB created a new unit devoted to developing the Sand Dollar but under the supervision
of a policy steering committee made up of representatives from the different departments of the bank.
The decision to make formal organizational changes can also arise as work on CBDC advances. The
BOC carried out a substantial part of its CBDC analysis by drawing on the resources of two departments—
coordinated by a fintech senior officer—neither of which were exclusively devoted to CBDC. Then, in 2020,
after presenting its official position on CBDC (see Box 1), the BOC formed a research team to investigate
technology that would help build capacity for a successful CBDC launch; the team was also tasked with
monitoring conditions that could trigger the need to proceed.
Likewise, the Riksbank started its e-krona project with a project team consisting of members from different
departments. However, a new division was created in 2019 devoted specifically to developing its e-krona
proof of concept. CBDC policy analysis, however, remains part of the payments department’s general policy
work. The two divisions work closely together.
In contrast, the ECCB has not initiated any changes in its organizational structure and instead draws
personnel from across different departments at the central bank to form an internal working group. Similarly,
the BCDU did not initiate any organizational changes while conducting the e-peso pilot.

B. Internal Staffing
The number of staff at central banks involved in CBDC projects varies mainly with the degree of
outsourcing to private vendors. Another important factor is the size of the pilots undertaken by the central
banks. For instance, the staff working on the Chinese e-CNY project grew from around 40 to around 300.
Importantly, this number does not include private-sector employees that have been working in collaboration with the PBOC.
For the CBOB and the ECCB, both operating in smaller countries and teaming up with a main contractor,
the numbers involved are considerably smaller. At its peak during the launch, the Sand Dollar employed 35
62  

Khan and Malaika (2021).

63  

For a discussion on CBDC projects and central bank governance, see Bechara and others (2021).

## Page 26

Behind the Scenes of Central Bank Digital Currency

21

people at varying levels of time commitment. Currently, 15 people work full-time on the Sand Dollar. The
ECCB is currently managing its DCash project with 12 people, all of whom in addition have other duties.
This has been possible thanks to considerable technical expertise from outside. The Uruguay e-peso pilot
similarly employed five full-time and five part-time employees. Again, these numbers refer only to central
bank staff, and the full amount of personnel involved on the private sector side is likely considerably larger.

Table 5. Number of Central Bank Staff Engaged in CBDC
Projects in Late 2021
Central Bank

Number of Staff

CBOB, Sand Dollar

15

BOC

50

PBOC, e-CNY

300

ECCB, DCash

12

Riksbank, e-krona

20

BCDU, ePeso

0 (10 during pilot)

Source: Central banks.
Note: This table does not include private sector personnel. Further, it does not
distinguish between those working full time or part time on the CBDC project. The
reason is the difficulty in comparing the time spent by part-time employees who, in some
phases of the project, may work more than full time. Part-time employed, therefore, often
means that they have other tasks besides CBDC. BCDU = Banco Central de Uruguay;
BOC = Bank of Canada; CBDC = central bank digital currency; CBOB = Central Bank of
Bahamas; ECCB = Eastern Caribbean Central Bank; PBOC = People's Bank of China.

C. Organization and Design of Pilots
This section focuses on the organization and execution of pilots. Canada and Sweden have not launched
pilots, so are not discussed in this section. The three main aspects of a pilot are its general organization, how
users are recruited and what results they yield, and how those results are incorporated.
General Organization of Pilots
The first main pilot design factor is how limited it will be. Pilots can be limited in time by having a clear
termination date communicated in advance. But they can also be limited in scope in terms of how many
users can participate or how much money will be issued.
The second main pilot design factor is its goals and the ability to revisit these as the pilot progresses. For
instance, central banks may choose to develop and test new functions after the initial launch. Pilots are also
sometimes directly used to further specific policy goals, for instance, by being extended to certain areas to
support economic development or recovery after a natural disaster.
The four pilots studied in this paper are described below in the order they were first launched.
Planning for the Uruguay e-peso began in 2016 and the pilot ran from November 2017 to April 2018.
Compared to the other pilots in this study, this effort was more contained in time and scope. It was clear
from the outset that the pilot would end after six months, and all e-pesos owned by test users at the end of
the pilot would be cashed in and destroyed. Total issuance was set at 20 million e-pesos, and no more than
10,000 end-users could take part by downloading an app on their cell phones. The pilot was also contained
in terms of functional involvement of the private sector: from the outset, the different functions of the pilot
were distributed among, as well as funded and developed by, a group of firms that were primarily interested

## Page 27

22

International Monetary Fund—Fintech Notes

in testing aspects of their respective technologies. Thus, the e-peso was not an open platform, and commercial banks were not involved.
The CBOB launched the Sand Dollar pilot in December 2019 after more than three years of research into
CBDC and planning the pilot. When considering suitable test areas, the bank opted to first roll out the pilot
in the Exuma District in the South East Bahamas. Usage of mobile phones is high in Exuma, and testing the
pilot there was ideal to ensure as many test users as possible. To create a baseline for measuring progress,
the CBOB conducted a survey of the level of financial inclusion and willingness of the population to adopt
digital payments.64
The pilot was rolled out to a second test area, the Abaco Islands, in February 2020. The Abacos infrastructure was severely damaged by a hurricane in September 2019, and the area was still recovering economically.
The Sand Dollar pilot in this area, therefore, served a double purpose—to test off-line payments solutions as
well as a means to support relief efforts and economic recovery.
In total, the Sand Dollar pilot included around 2,000 wallets, and around 35 persons at the central bank
were involved in its launch. The COVID-19 pandemic made the execution of the Abacos tests more difficult
but did not change the pilot plans.
The scale of the Chinese e-CNY pilot is unique. By October 8, 2021, over 123 million e-CNY wallets were
held by individuals and around 9.2 million wallets were held by firms. To help organize such a large trial in
different areas in China, the Digital Currency Institute of the People’s Bank of China (PBCDCI) created several
subsidiaries in Shenzhen, Suzhou, and Shanghai, and is considering creating more in other areas.
The PBCDCI has the main responsibility for planning and executing the e-CNY trials, but collaborates with
local authorities, private intermediaries, and technology firms. So far, trials have been conducted in more
than 10 cities and regions. The scale of the trials has allowed the PBCDCI to test both core technologies for
raw payment processing but also for ancillary and add-on features such as identification, off-line payments,
and programmability. Trials have increasingly been conducted in rural areas, following regional economic
development goals.
The ECCB rolled out the DCash pilot to four countries in the ECCU in March 2021: Antigua and Barbuda,
Grenada, Saint Kitts and Nevis and Saint Lucia. The pilot is scheduled to run for 12 months, after which all
DCash are to be cashed in and destroyed. DCash has been issued on demand as the number of users grew,
but the central bank announced that there would be a total limit on how much would be issued. The central
bank initially stated that the pilot will be successful when DCash reaches 4,000 end-users and 35 merchants
per country in the ECCU. But with experience, the ECCB has adjusted these goals to reflect differences
between countries.
The ECCB altered the plan for its pilot because of two external events. First, the COVID-19 pandemic
led to an unanticipated increase in demand for both DCash and online shopping. In response, the ECCB
decided to expand the pilot to include online purchases using a web browser. Second, a volcano eruption in
St. Vincent and the Grenadines also prompted the ECCB to accelerate the pilot in the affected area to help
it recover by increasing access to payments.
In sum, the pilots of several jurisdictions were modified to address external events, thus highlighting the
importance of a flexible approach.
Recruitment of Users for the Pilots
A CBDC pilot requires users willing to learn to use a new payments solution and trust it with their money.
All central banks with pilots stressed the importance of information campaigns to recruit test users. In
addition, financial incentives can be used. In the e-peso pilot, the BCDU’s technology partner Roberto Giori
paid for the information campaign to recruit test users and funded financial incentives: the first 1,000 users
64  

For a summary of the Exuma survey, see CBOB (2019).

## Page 28

Behind the Scenes of Central Bank Digital Currency

23

received 1,000 e-pesos (approximately $23) for free, and 20 awards of 1,000 e-pesos were granted to the
most active users for each month of the pilot.
The PBOC similarly launched a series of lotteries in collaboration with local authorities offering free
e-CNY, which could be spent at merchants also joining the pilot. The local authorities provided the funding
for these lotteries.
In the Bahamas and the ECCU, central banks have relied to a great extent on public information campaigns
that stress the convenience and safety of paying with CBDC compared to physical means of payment.
Recently, however, the ECCB added the incentive to get a percentage of expenses rebated in DCash at the
end of the day for payments made in DCash at registered merchants.
Results of Pilots
Pilots can identify which areas need more testing, potentially through new pilots or extensions of pilots.
The BCDU concluded that a potential second Uruguay CBDC pilot would need to be based on different
principles compared to the first, including multiple vendors, and the participation of commercial banks.
Results of a pilot can also be used to improve the pilot or an officially launched CBDC. Staff at the CBOB
stress that the most important gain from the Sand Dollar pilot was to better understand the motivations for
potential users to adopt CBDC and for firms to join the CBDC network as intermediaries. This motivated
the central bank to step up its communication and educational efforts on the local level. Further, the pilot
showed the importance of increasing interoperability with the retail banking system to make it easier for
users to convert bank deposits to Sand Dollars. As mentioned earlier, the pilot revealed that the planned
off-line payment solution did not work as intended, and was the one major revision of the pilot in the officially
launched Sand Dollar.
The ECCB’s pilot is still in its early stages, so results are considered preliminary. However, demand has
been sufficiently strong that ECCB now believes that ending the pilot after the planned 12 months might
impair the payments system. Therefore, it is considering formally launching the CBDC and extending access
to all countries in the ECCU rather than ending the pilot.
The PBOC reports that it is so far very pleased with the results of the e-CNY pilot. It has enabled testing
a wide variety of different technological solutions for various features, including off-line capacity (see the
sections above on design features and technology), payments methods using facial recognition, and tapand-go. Surveys among test users, and the public, on the progress of the e-CNY, are also reported as being
very favorable.

D. Stakeholders and Public CBDC Communication
Potential stakeholders in a CBDC project include the potential users, but also private intermediaries,
incumbents in the payments and financial markets, as well as government agencies, representative political
bodies, and governments. Some government agencies with a need to facilitate payments to invidividuals,
such as tax agencies, social welfare agencies, or in some cases ministries of finance, might in particular have
a stake in improving payments methods through CBDC.65
The introduction of CBDC requires approval that goes beyond the central bank. For instance, legal
changes are often needed that are typically enacted by politicians in legislative bodies. Further, getting
people to test, understand, and trust a CBDC pilot does not come automatically, and so without the buy-in of
the public, there will never be a meaningful level of adoption. Therefore, communication with stakeholders
is a key part of CBDC projects.
The CBOB, as mentioned above, stressed the importance of reaching out to potential user communities.
The bank partnered with communication experts and marketing agencies, and the pilot and official launch
65  

For example, see IMF (2020b).

## Page 29

24

International Monetary Fund—Fintech Notes

were accompanied by surveys and market research. The bank invited representatives of different industries
to discussion forums to discuss what the Sand Dollar could mean for them. Specifically, the bank took time to
promote to commercial banks what benefits the Sand Dollar could bring in terms of lower costs of handling
cash and a potentially larger customer base.
The Bahamas government, and other government agencies, were supportive from the outset of the Sand
Dollar project. A key potential benefit for government agencies is lower costs of handling public transfer
payments to individuals. However, staff at the CBOB states that it would have been beneficial to have had
more engagements with these stakeholders to ensure that digitalization efforts were more synchronized.
The PBOC and the ECCB also stress the importance of organized public information campaigns. In China,
public information is extended by the PBOC but also by the private intermediaries which carry out face-toface interactions with end-users. The ECCB partnered with market research agencies to better understand
the public’s needs and to receive real-time feedback as the pilot progressed. The e-peso was also accompanied by an educational campaign.
The BOC and the Riksbank, however, have not engaged in organized information campaigns. The Riksbank
stresses that its communication strategy has been openness about its project rather than education or
promotion. It has published regularly on its CBDC work, as well as participated in both national and international conferences, forums, and bilateral meetings with representatives of different stakeholders. The
second e-krona report, published in 2018, was accompanied by a call for comments from stakeholders,
which were published on the bank’s website.
In 2019, the Riksbank sent in a petition to the Swedish Parliament to create a government inquiry into
the future role of the state in the digital payments market – including assessing the pros and cons of a
Swedish CBDC. Parliament approved the petition, and the inquiry was launched in 2021. This is an example
of how central banks can directly solicit key stakeholders and elicit a policy response, in this case starting the
process of potentially changing legislation to allow for the creation of a CBDC.

E. Major Challenges and Hindrances
Investigating, testing, and even launching CBDC comes with its challenges. The central banks studied in
this paper raise several common themes.
Lack of precedents: Several central banks pointed out the difficulty of designing a project where there
is little or no experience, nor established standards. However, prior research, even if conceptual, was of
value to guide choices along the way. The central banks all emphasize the need to continue learning and
experimenting.
Lack of resources: As demonstrated in this paper, CBDC projects are resource-intensive and become
even more so as their scale increases. Thus, the PBOC raises resources as a constraint. Likewise, resource
constraints are one of the key reasons why Uruguay has not yet launched a second e-peso pilot. Staff at
the ECCB also stated that the financial cost of the DCash project has been one of the major obstacles to
overcome.
Unwillingness to adopt digital payments among the population: Some jurisdictions mentioned that part of
the population is suspicious about CBDC and digital payments in general. The CBOB has pointed out that
part of the population still does not trust that their money is safe if converted to Sand Dollar and that they
are concerned about privacy issues.
Legal issues: The need to make amendments or change laws and regulations is mentioned as one of the
key obstacles by several jurisdictions.
Cyber security: The PBOC said that the risks from cyberattacks are substantial if the e-CNY becomes a
crucial payments system. Creating an acceptable level of cyber security is one of the main challenges it sees.

## Page 30

Behind the Scenes of Central Bank Digital Currency

25

Technological uncertainty: As technology is still developing, choosing the best technology is deemed a
challenge. For instance, ECCB staff were uncertain whether DCash’s DLT technology was sufficiently scalable
to meet the demands of large-scale adoption. It is therefore open to considering another model.

F. Key Insights
Central bank staff gain experience and insights from running CBDC pilots and interacting with intermediaries and users. This section summarizes key insights raised by the staff at the six jurisdictions. Thus,
these insights reflect the experiences of staff at individual central banks and are not necessarily immediately
applicable in other contexts.
The importance of market research: Based on its experiences with the pilot and official launch of the
Sand Dollar, the CBOB stresses the need to perform extensive market research to understand the needs of
potential users.
Collaboration with participating private intermediaries: The CBOB underscores the need for the central
bank to have strong collaboration and open communication with private firms that have face-to-face contact
with the end-users. This point is also emphasized by the PBOC.
Technology neutrality: The PBOC is a strong proponent of neutrality. The e-CNY is designed as a hybrid
system which, though its core is based on centralized technology, is fully compatible with DLT or other
technologies that intermediaries choose to use. This reflects the PBOC’s key recommendation that no technology is perfect and that being open to using different technologies is key. Similarly, the BCDU said that
the simplest and most appropriate technology for the purposes of the CBDC should be favored, a principle
that it followed when setting up the e-peso pilot.
Importance of cross-border payments: The PBOC stresses the importance of exploring cross-border
payments with CBDC and adhering to the principles of “no disruption, compliance, and interoperability.”
The anonymity/privacy trade-off: The PBOC emphasizes the need to manage the tension between
anonymity and privacy, but that full anonymity for all transactions cannot be considered.
Allowing the public access to information on CBDC: The Riksbank highlights the importance for a central
bank to be open about its work on CBDC. The first reason is that issuing CBDC is fundamentally about
how to organize a society’s payments system and therefore concerns everyone. The second reason is that
understanding CBDC can take a long time and the process of communicating with the public (and decisionmakers) should begin early in the process.
The importance of non-technical aspects: The BCDU stresses that a CBDC is not only a technical process
but also a cultural one. The introduction of CBDC will have to be guided by careful knowledge about the
cultural aspects of users and preferences for the characteristics of money.

## Page 31

26

International Monetary Fund—Fintech Notes

8. Conclusions
This paper discussed six CBDC pioneer projects. It illustrated the importance of individual country context
and policy goals for the design and implications of CBDC. Just as there is no universal case for CBDC, there
is no universal design or recipe to implement CBDC.
CBDC is still in its infancy, and there are still open issues as well as commonly identified obstacles. Open
issues referred to by several jurisdictions include the nature of sustainable business models that will ensure
cost recovery and provide sufficient incentives for private sector participation. Other issues have to do with
pushing the boundaries of innovation to allow for important features such as off-line capacity. The choice
of technology is also frequently highlighted, including the use cases and limits of DLT. Key difficulties going
forward include making choices in a very new and rapidly evolving field, as well as costs associated with the
development process.
A new trend among some of the jurisdictions in this study, spearheaded by the PBOC, is a pragmatic view
of technology. The choice between centralized and distributed technology does not need to be either-or.
And central banks could adopt CBDCs that utilize different technologies for different ends.
While individual country contexts remain important, there are also areas of convergence. All central banks
have explored the intermediated operational model. Countries are seeking a balance between preserving
key aspects of the traditional monetary and financial system while at the same time updating the role of
central banks in the digital era. Relatedly, all CBDCs currently in circulation have design characteristics that
limit competition with bank deposits.
Examples of policy trade-offs were evident during the discussions, but policy synergies were also identified. The relationship between anonymity and illicit use of money, for example, presents a policy trade-off,
but there are policy synergies between anonymity, risk reduction, and financial inclusion. Managing policy
trade-offs and leveraging policy synergies could be a potential area of increased central bank attention in
the future.
Pilot designs differ among the jurisdictions from strictly limited in time, scope, and goals to more openended. Pilots are also used as policy tools. The exact dividing line between an open-ended pilot and an
officially launched CBDC is therefore not always clear-cut, especially since an officially launched CBDC can
continue to be upgraded and developed after launch. To some degree, a pilot could therefore lead to a “soft
launch.”
CBDC exploration is still in an early stage, and not all country experiences can be easily ported abroad.
There are still open questions, and CBDC remains an uncharted territory, raising challenges as well as opportunities. Increased international information-sharing of insights learned from individual CBDC projects and
cooperation on policy and design issues will be important going forward. This paper represents an early
contribution to this ongoing process.

## Page 32

Behind the Scenes of Central Bank Digital Currency

27

References
Adrian, Tobias, and Tommaso Mancini-Griffoli. 2019. “The Rise of Digital Money.” IMF Fintech Note 19/01,
International Monetary Fund, Washington, DC.
Adrian, Tobias, and Tommaso Mancini-Griffoli. 2021. “Public and Private Money Can Coexist
in the Digital Age.” IMFBlog (blog), Februay 18. https://blogs.imf.org/2021/02/18/
public-and-private-money-can-coexist-in-the-digital-age.
Agur, Itai, Anil Ari, and Giovanni Dell’Ariccia. 2022. ”Designing Central Bank Digital Currencies.” Journal of
Monetary Economics, forthcoming.
Atlantic Council. 2021. “Central Bank Digital Currency Tracker.” Accessed on December 17, 2021. https://
www.atlanticcouncil.org/cbdctracker.
Armelius, Hanna, Paola Boel, Carl Andreas Claussen, and Marianne Nessén. 2018. ”The E-krona and the
Macroeconomy.” Sveriges Riksbank Economic Review 2018 (3): 43-65.
Armelius, Hanna, Gabriela Guibourg, Stig Johansson, and Johan Schmalholz. 2020. “E-krona Design
Models: Pros, Cons and Trade-offs." Sveriges Riksbank Economic Review 2020 (2): 80-96.
Armelius, Hanna, Carl Andreas Clausen, and Isaiah Hull. 2021. “On the Possibility of a Cash-Like CBDC.”
Staff Memo, Sveriges Riksbank, Stockholm.
Auer, Raphael, and Rainer Böhme. 2020. “The Technology of Retail Central Bank Digital Currency.” BIS
Quarterly Review March: 85-100.
Auer, Raphael, and Rainer Böhme. 2021. “Central Bank Digital Currency: The Quest for Minimally Invasive
Technology.” BIS Working Paper 948, Bank for International Settlements, Basel, Switzerland.
Auer, Raphael, Jon Frost, Leonardo Gambacorta, Cyril Monnet, Tara Rice, and Hyun Song Shin. 2021.
“Central Bank Digital Currencies: Motives, Economic Implicatios, and the Research Frontier.” BIS
Working Paper 976, Bank for International Settlements, Basel, Switzerland.
Bechara, Marianne, Wouter Bossu, Yan Liu, and Arthur Rossi. 2021.”The Impact of Fintech on Central Bank
Governance.” IMF Fintech Note 21/01, International Monetary Fund, Washington, DC.
Bindseil, Ulrich. 2019. “Central Bank Digital Currency: Financial System Implications and Control.”
International Journal of Political Economy 48 (4): 303-335.
Bindseil, Ulrich. 2020. “Tiered CBDC and the Financial System.” ECB Working Paper 2351, European
Central Bank, Frankfurt.
BIS (Bank for International Settlements). 2003. “The Role of Central Bank in Payment Systems.” Committee
on Payment and Settlement Systems, Basel, Switzerland.
BIS (Bank for International Settlements). 2017. “Distributed Ledger Technology in Payment, Clearing
and Settlement: An Analytical Framework.” CPMI Paper 157, Committee on Payments and Market
Infrastructures, Basel, Switzerland.
BIS (Bank for International Settlements). 2018. “Central Bank Digital Currencies.” Committee on Payments
and Market Infrastructure, Basel, Switzerland.
BIS (Bank for International Settlements), BIS Innovation Hub, the International Monetary Fund, and the
World Bank. 2021. “Central Bank Digital Currencies for Cross-border Payments.” Joint report to the
G20.
BISIH (Bank for International Settlements Innovation Hub), Bank of Thailand, Central Bank of the United
Arab Emirates, Hong Kong Monetary Authority, and People’s Bank of China. 2021. “Building a Multi
CBDC Platform for International Payments.” Joint report.
Boar, Condruta, and Andreas Wehrli. 2021. “Ready, Steady, Go? Results of the Third BIS Survey on Central
Bank Digital Currency.” BIS Paper 114, Bank for International Settlements, Basel, Switzerland.
BOC (Bank of Canada), Bank of England, and Monetary Authority of Singapore. 2018. “Cross-Border
Interbank Payments and Settlements. Emerging Opportunities for Digital Transformation.” Joint
report.
BOC (Bank of Canada). 2020. “Contingency Planning for CBDC.” Background Note. Bank of Canada,
Ottawa.
BOE (Bank of England). 2020. “Central Bank Digital Currency: Opportunities, Challenges, and Design.”
Future of Money Discussion Paper, Bank of England, London.

## Page 33

28

International Monetary Fund—Fintech Notes

Bossu, Wouter, Masaru Itatani, Catalina Margulis, Arthur Rossi, Hans Weenink, and Akihiro Yoshinaga.
2020. “Legal Aspects of Central Bank Digital Currency : Central Bank and Monetary Law
Considerations.” IMF Working Paper 20/254, International Monetary Fund, Washington, DC.
BOT (Bank of Thailand) and HKMA (Hong Kong Monetary Authority). 2020. “Inthanon-LionRock.
Leveraging Distributed Ledger Technology to Increase Efficiency in Cross-Border Payments.” Joint
report.
Bruton, Garry, Mike Peng, David Ahlstrom, Stan Ciprian, and Kehan Xu. 2014. “State-Owned Enterprises
Around the World as Hybrid Organization.” The Academy of Management Perspectives 29 (1) : 92-114.
CBOB (Central Bank of Bahamas). 2019. “Project Sand Dollar: A Bahamas Payments System Modernisation
Initiative.” Sand Dollar Whitepaper, Central Bank of the Bahamas.
Central Banks and BIS. 2020. “Central Bank Digital Currencies: Foundational Principles and Core
Features”. Joint report by Bank of Canada, European Central Bank, Bank of Japan, Sveriges Riksbank,
Swiss National Bank, Bank of England, Board of Governors Federal Reserve System and Bank for
International Settlements.
Central Bank Act of The Bahamas. 2020. Nassau.
Chohan, Usman. 2021. “The Double Spending Problem and Cryptocurrencies.” SSRN Electronic Journal
Doi: 10.2139/ssrn.3090174.
Dev, Mahendra. 2006. “Financial Inclusion: Issues and Challenges.” Economic and Political Weekly 41 (41):
4310-4314.
ECB (European Central Bank). 2020. “Report on a Digital Euro.” European Central Bank, Frankfurt.
FATF (Financial Action Task Force). 2015. “Money Laundering Through the Physical Transportation of
Cash.” FATF, Paris, and MENAFATF (Middle East & North Africa Financial Action Task Force),
Manama, Bahrain.
FATF (Financial Action Task Force). 2020. “FATF Removes The Bahamas from the List of Jurisdictions under
Increased Monitoring.” Press release, December 18, 2020. https://www.fatf-gafi.org/publications/highrisk-and-other-monitored-jurisdictions/documents/bahamas-delisting-2020.html.
FSB (Financial Stability Board). 2020. “Enhancing Cross-Border Payments. Stage 3.” Financial Stability
Board, Basel.
G7 (Group of Seven). 2021. “Public Policy Principles for Retail Central Bank Digital Currencies.” October.
IMF (International Monetary Fund). 2019. “The Bahamas. Financial Sector Assessment Program. Technical
Note on Financial Inclusion, Retail Payments, and SME Finance.” IMF Country Report 19/201,
International Monetary Fund, Washington, DC.
IMF (International Monetary Fund). 2020a. “Digital Money Across Borders: Macro-financial Implications.”
IMF Policy Paper, International Monetary Fund, Washington, DC.
IMF (International Monetary Fund). 2020b. “Digital Solutions for Direct Cash Transfers in Emergencies.”
Special Series on Fiscal Policies to Respond to COVID-19, International Monetary Fund, Washington,
DC.
Herlihy, Maurice. 2018. “Atomic Cross-Chain Swaps.” In Proceedings of the 2018 ACM Symposium on
Principles of Distributed Computing. Association for Computing Machinery, New York, 245-254.
HKMA (Hong Kong Monetary Authority). 2021. "e-HKD: A technical perspective." Request for Comments,
Hong Kong Monetary Authority.
Juks, Reimo. 2018. “When a central bank digital currency meets private money: effects of an e-krona on
banks.” Sveriges Riksbank Economic Review 2018 (3): 79-99.
Khan, Ashraf, and Majid Malaika. 2021. “Central Bank Risk Management, Fintech and Cybersecurity.” IMF
Working Paper 21/105, International Monetary Fund, Washington, DC.
Kiff, John. 2021. “Jurisdictions Where Retail CBDC Is Being Explored.” Kiffmeister Chronicles. http://kiffmeister.blogspot.com/2019/12/countries-where-retail-cbdc-is-being.html.
Kiff, John, Jihad Alwazir, Sonja Davidovic, Aquiles Farias, Ashraf Khan, Tanai Khiaonarong, Majid Malaika.
2020. “A Survey of Research on Retail Central Bank Digital Currency.” IMF Working Paper 20/104,
International Monetary Fund, Washington, DC.

## Page 34

Behind the Scenes of Central Bank Digital Currency

29

Kumhof, Michael, and Clare Noone. 2018. “Central Bank Digital Currencies – Design Principles and Balance
Sheet Implications.” Staff Working Paper 725, Bank of England, London.
Natarajan, Harish, Solvej Krause, and Helen Gradstein. 2017. "Distributed Ledger Technology and
Blockchain." FinTech Note No. 1. World Bank, Washington, DC.
NIST (National Institute of Standards and Technology). 2021. “System Owner.” Computer Security Resource
Center, Glossary. https://csrc.nist.gov/glossary/term/system_owner.
Miedema, John, Cyrus Minwalla, Martine Warren, Dinesh Sha. 2020. “Designing a CBDC for Universal
Access.” Staff Analytical Note 2020-10, Bank of Canada, Ottawa.
Mu, Changchun. 2021. “Navigating the Uncharted Waters of Retail CBDC.” Presentation at the BIS
Innovation Summit (virtual conference), March 25. https://www.bis.org/events/bis_innovation_
summit_2021/agenda.htm.
Ozili, Peterson. 2020. “Financial Inclusion Research Around the World: A Review.” Forum for Social
Economics 50 (4): 457-479.
PBC (People’s Bank of China). 2020. Revised Law for People’s Bank of China. Draft for consultation.
Shabsigh, Ghiath, Tanai Khiaonarang, and Harry Leinonen. 2020. “Distributed Ledger Technology
Experiments in Payments and Settlements.” IMF Fintech Note 20/01, International Monetary Fund,
Washington, DC.
Soderberg, Gabriel. 2019. “The E-krona – Now and for the Future.” Economic Commentary No. 8, Sveriges
Riksbank, Stockholm, Sweden.
SOU (Statens Offentliga Utredningar). 2021. “Committee Terms of Reference. Role of the State in the
Payment Market.“ Statens Offentliga Utredningar, Stockholm.
Sveriges Riksbank. 2017. “The Riksbank’s e-krona Project. Report 1.” Sveriges Riksbank, Stockholm,
Sweden.
Sveriges Riksbank. 2018. “The Riksbank’s e-krona Project, Report 2.” Sveriges Riksbank, Stockholm,
Sweden.
Sveriges Riksbank. 2021a. “The Position of Cash as Legal Tender Needs Strenghtening.” In Payments
Report 2021. Sveriges Riksbank, Stockholm, Sweden.
Sveriges Riksbank. 2021b.“E-krona Pilot. Phase 1.” Sveriges Riksbank, Stockholm.
Utredningen om civilt försvar. 2021. “Struktur för ökad motståndskraft.” Statens Offentliga Utredningar
2021:25. Regeringskansliet, Stockholm.
World Bank. 2021. The State of Economic Inclusion Report 2021: The Potential to Scale. Washington, DC:
World Bank.
World Bank and PBOC (People’s Bank of China). 2018. “Toward Universal Financial Inclusion in China:
Models, Challenges, and Global Lessons.” Joint Report. World Bank, Washington, DC.

## Page 35

[No extractable text]
