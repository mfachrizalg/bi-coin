---
source_type: pdf
title: "Central bank digital currency: Central banking for all?"
original_file: "thesis/reference/Central bank digital currency: Central banking for all?.pdf"
sha256: "034e37135afb3f06b21c02241b116c032a312ca9e9ba49c79a2beede7cfe372e"
page_count: 18
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Central bank digital currency: Central banking for all?

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Review of Economic Dynamics 41 (2021) 225–242

Contents lists available at ScienceDirect

Review of Economic Dynamics
www.elsevier.com/locate/red

Central bank digital currency: Central banking for all? ✩
Jesús Fernández-Villaverde a,b,c,∗ , Daniel Sanches d , Linda Schilling e,c ,
Harald Uhlig f,b,c
a

University of Pennsylvania, United States of America
NBER, United States of America
c
CEPR, United Kingdom of Great Britain and Northern Ireland
d
Federal Reserve Bank of Philadelphia, United States of America
e
École Polytechnique, CREST, France
f
University of Chicago, United States of America
b

a r t i c l e

i n f o

Article history:
Received 15 January 2020
Received in revised form 19 November 2020
Available online 29 December 2020
JEL classiﬁcation:
E58
G21
Keywords:
Central bank digital currency
Central banking
Intermediation
Maturity transformation
Bank runs
Lender of last resort

a b s t r a c t
The introduction of a central bank digital currency (CBDC) allows the central bank to
engage in large-scale intermediation by competing with private ﬁnancial intermediaries
for deposits. Yet, since a central bank is not an investment expert, it cannot invest in longterm projects itself, but relies on investment banks to do so. We derive an equivalence
result that shows that absent a banking panic, the set of allocations achieved with private
ﬁnancial intermediation will also be achieved with a CBDC. During a panic, however,
we show that the rigidity of the central bank’s contract with the investment banks has
the capacity to deter runs. Thus, the central bank is more stable than the commercial
banking sector. Consumers internalize this feature ex-ante, and the central bank arises as a
deposit monopolist, attracting all deposits away from the commercial banking sector. This
monopoly might endanger maturity transformation.
© 2020 Elsevier Inc. All rights reserved.

1. Introduction
We investigate the implications for the ﬁnancial architecture of introducing a central bank digital currency, or CBDC. In
particular, we focus on the effects of a CBDC on ﬁnancial intermediation and maturity transformation. We show how the
central bank must offer contracts on par with those of commercial banks to make the CBDC suﬃciently attractive as an
alternative to commercial bank deposits. While this achieves social eﬃciency, we also point out a sinister counterpart. We
assume that the central bank cannot invest in long-term projects on its own, but has to rely on investment banks instead. In

✩
The contribution of Linda Schilling has been prepared under the Lamfalussy fellowship program sponsored by the ECB. The views expressed in this
paper are those of the authors and do not necessarily reﬂect the views of the ECB, the Federal Reserve Bank of Philadelphia, or the Federal Reserve System.
The project was partially written during a research stay of Linda Schilling at the Simons Institute at UC Berkeley. Its support and hospitality is gratefully
acknowledged. We thank Larry Christiano, Todd Keister, Roberto Robatto, Chris Sims, two referees, the editor, and participants at different seminars for
useful feedback.
Corresponding author.
E-mail addresses: jesusfv@econ.upenn.edu (J. Fernández-Villaverde), Daniel.Sanches@phil.frb.org (D. Sanches), lin.schilling@gmail.com (L. Schilling),
huhlig@uchicago.edu (H. Uhlig).

*

https://doi.org/10.1016/j.red.2020.12.004
1094-2025/© 2020 Elsevier Inc. All rights reserved.

## Page 2

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

turn, this reliance renders central bank CBDC deposits safer and, thus, more attractive than deposit contracts at commercial
banks, endangering the commercial banking sector.
Recent advances in cryptographic and distributed ledger techniques (von zur Gathen, 2015; Narayanan et al., 2016) have
opened the door to the widespread use of digital currencies. While the lead in introducing these currencies came from
private initiatives such as Bitcoin, Ethereum, and Libra, researchers and policymakers have explored the possibility that
central banks can also issue their own digital currencies, aptly called a CBDC.1
The introduction of a CBDC can represent an important innovation in money and banking history. Besides its potential
role in eliminating physical cash, a CBDC will allow the central bank to engage in large-scale intermediation by competing
with private ﬁnancial intermediaries for deposits (and, likely, engaging in some form of lending of those deposits). In other
words, a CBDC amounts to giving consumers the possibility of holding a bank account with the central bank directly.
Defenders of a CBDC have been rather explicit about this implication. For instance, Barrdear and Kumhof (2016, p. 7)
state: “By CBDC, we refer to a central bank granting universal, electronic, 24x7, national-currency-denominated and interestbearing access to its balance sheet.” In this paper, we will use these authors’ deﬁnition as the working concept of a CBDC.2
Similarly, Bordo and Levin (2017) propose that either “an account-based CBDC could be implemented via accounts held
directly at the central bank” [p. 7], or that a “CBDC could be provided to the public via specially designated accounts at
supervised commercial banks, which would hold the corresponding amount of funds in segregated reserve accounts at the
central bank” [p. 8], an option often referred to as a synthetic CBDC. In this formulation, the differences between a CBDC
held directly at the central bank or a commercial bank with segregated reserves are mostly inconsequential for our analysis,
for they have the same implications for ﬁnancial intermediation.
Thus, we could be at a juncture where changes in technology –namely, the introduction of digital currencies– may
justify a fundamental shift in the architecture of a ﬁnancial system, a central bank “open to all.” As argued by Friedman and
Schwartz (1986) in a classic paper, external forces –in this case, technological innovations– might shape how we think about
the role of government in setting up monetary and ﬁnancial institutions and make us opt for alternative arrangements.
These considerations are already relevant to monetary policy. In June 2018, Swiss voters turned down the sovereignmoney (Vollgeld) initiative that would have given the central bank a monopoly on issuing demand deposits, an idea
motivated in part by the possibility of a Swiss CBDC. Despite the Vollgeld initiative being soundly defeated at the ballot
box, similar designs are bound to be widely discussed during the coming years.
A CBDC is frequently promoted as a vehicle for ﬁnancial inclusion of a previously unbanked population as well as a safer
alternative to commercial bank accounts. With that, the central bank needs to make the CBDC suﬃciently attractive relative
to interest-bearing and risk-sharing commercial bank deposit contracts. Inevitably, this means that the central bank will
ﬁnd itself confronted with traditional banking functions such as maturity transformation and ﬁnancial intermediation. The
purpose of this paper is to think these issues through to the very end and answer the key questions that arise.
What effects will the introduction of a CBDC and the opening of central bank facilities have on ﬁnancial intermediation?
Will a CBDC impair the role of the ﬁnancial system in allocating funds to productive projects? Or can we reorganize the
ﬁnancial system in such a way that a CBDC will still allow the right ﬂow of funds between savers and investors? Will a
CBDC make bank runs disappear and stabilize the ﬁnancial system?
To answer these questions, we build on the classic model by Diamond and Dybvig (1983), augmented by the presence
of a central bank. We select this model because it emphasizes the role of banks in maturity transformation: banks ﬁnance
long-term projects with demand deposits, which may be withdrawn at a shorter horizon. Exploring how a CBDC will interact
with maturity transformation is a ﬁrst-order consideration that has not been thoroughly examined by the literature, often
more interested in questions such as the consequences of a CBDC for interest rates, tax evasion, or anonymity (for a review
of that literature, see Beniak, 2019). Furthermore, the model by Diamond and Dybvig (1983) allows us to explore how the
propensity for bank runs might change with the introduction of a CBDC and to compare those results with previous ﬁndings
in the literature.
More concretely, we consider a framework in which the CBDC takes the form of demand deposit accounts of the public
at the central bank. Like a commercial bank, the central bank holds assets funded by these liabilities, but in contrast to
commercial banks, we assume that the central bank cannot invest in high-return long-term projects. This constraint might
be due to the central bank not having a good technology to screen, monitor, and liquidate productive projects. The central
bank can, instead, rely on investment banks to engage in wholesale loans. We derive an interesting equivalence result that
shows that the set of allocations achieved with private ﬁnancial intermediation (which, in the Diamond-Dybvig framework,

1
See, without trying to be exhaustive, Adrian and Mancini-Griffoli (2019), Agur et al. (2019), Barontini and Holden (2019), Berentsen and Schar (2018),
Brunnermeier et al. (2019), Barrdear and Kumhof (2016), Bordo and Levin (2017), Danezis and Meiklejohn (2015), Dyson and Hodgson (2016), Ketterer
and Andrade (2016), Mancini-Griffoli et al. (2018), Rogoff (2014), and Wadsworth (2018). The BIS, the ECB, the Sveriges Riksbank, and the Bank of Japan
—among other central banks— have issued oﬃcial reports examining different aspects of CBDCs.
2
Notice that the sense in which most economists have deﬁned a CBDC as an account-based currency goes well beyond a basic notion of central bankissued electronic money (which may or may not fully replace physical cash). To focus our investigation, we will avoid the discussion of the relative merits
of other forms of central bank-issued electronic money, such as a token-based central bank cryptocurrency or traditional electronic reserves. Conversely,
one could consider situations where the central bank opens its account facilities to all citizens, even in the absence of a CBDC. As we will see in Section 2,
this opening has occurred often in history, and it was defended in the 1980s by Tobin (1987, p. 172) as “deposited currency.” Nearly all of the analysis in
our paper carries over to a “deposited currency” environment.

226

## Page 3

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

can deliver an ex-ante ﬁrst-best allocation) can also be achieved with a CBDC, provided competition with commercial banks
is allowed.
This equivalence result vindicates some of the views of proponents of a CBDC: the socially optimal amount of maturity
transformation can still be produced in an economy where the central bank has been opened to all. But our equivalence
result has a sinister counterpart. If the competition from commercial banks is impaired (for example, through some ﬁscal
subsidization of central bank deposits), the central bank has to be careful in its choices to avoid creating havoc with maturity
transformation.
We can think about our equivalence result as belonging to the tradition of public ﬁnance Modigliani-Miller theorems
(Sargent, 2009, ch. 8). These theorems highlight how the same allocation can often be implemented through very different
government policies. In our case, the socially optimal allocation can be implemented with and without a CBDC. But these
Modigliani-Miller theorems also emphasize how strict are the conditions under which such results work. In the presence
of a CBDC, we are likely to ﬁnd powerful political-economic forces that will break the equivalence conditions. For instance,
we can expect directives or subsidies to provide preferences for investment in some class of projects over others that are
favored by the electoral process.
The fragility of the equivalence result is even clearer when we add to the analysis the consideration of commercial and
central bank runs. Under bank runs, the central bank can still offer the socially optimal deposit contract, but the conditions
for runs in commercial and central banks are different. The intuition is as follows. The wholesale loan of the central bank
to the investment bank is not callable. This implies that the central bank’s indirect investment in the long asset is protected
from early liquidation. This protection either deters runs on the central bank or makes them less likely than runs on the
commercial banking sector. Consumers internalize this feature and exclusively deposit with the central bank. That is, due to
the rigidity of the central bank’s contract with the investment banks, the central bank becomes the monopoly provider of
deposits.
Importantly, this monopoly power allows the central bank to deviate from offering the socially optimal deposit contract.
If the central bank exercises this market power, it will deviate from offering the socially optimal deposit contract, and the
economy will not have the ﬁrst-best amount of maturity transformation.
Commercial banks do not have access to the same rigid contract because of two fundamental aspects of public law in
nearly all legal systems: the seniority of the debt to the central bank and the protection it enjoys against forced liquidation.
Once the central bank starts dealing with investment banks, it will displace commercial banks from this market because,
thanks to its seniority, it will obtain a higher expected rate of return. Also, the protection against forced liquidation will
allow the central bank to use the investment banks and deny withdrawal requests that exceed the level of its short assets.
A central bank can default but not go bankrupt. These two legal features make the nature of the central bank’s assets and
liabilities essentially different from a commercial bank’s assets and liabilities. This element of CBDCs is an overlooked but
key factor behind the consequences of this new money.3
Our paper is related to several important branches of monetary economics. In terms of money and banking theory,
we are closest to Diamond and Dybvig (1983), and all the subsequent literature. Our main equivalence result resembles
some aspects of Brunnermeier and Niepelt (2019), who show the equivalence of private and public monies in quite a
different environment without maturity transformation. By contrast, we highlight, in particular, the equivalence of ﬁnancial
arrangements in terms of maturity transformation, a novel result in the literature, and derive our results by studying the
incentives of individual depositors.
There is also an emerging literature on CBDC. Beyond the many papers cited above, Andolfatto (2020), Böser and Gersbach (2019), Brunnermeier and Niepelt (2019), Chiu et al. (2019), Niepelt (2020), and Keister and Sanches (2019) discuss
related issues to ours regarding the interaction between the commercial banking sector and a CBDC. A distinctive feature of
our paper is that we pay much attention to allocations under bank runs and analyze how a CBDC can and cannot prevent
these runs.
Finally, notice that the debate on CBDC belongs to a broader debate on narrow banking (Pennacchi, 2012). This literature
has been concerned with how alternative forms of ﬁnancial intermediation may unravel banks’ deposit markets (von Thadden, 1998). For example, Jacklin (1987), among others, shows that a proﬁt-sharing contract between a bank and depositors
would prevent runs and monopolize the market.
The rest of the paper is organized as follows. Section 2 frames the current discussion within the historical background.
Section 3 introduces our model of a central bank open to all. Section 4 deﬁnes and characterizes the equilibrium of the
economy. Section 5 analyzes bank runs. Section 6 presents some discussion of the robustness of our results. Section 7
concludes.
2. Historical background
Historically, many central banks have allowed deposits by and extended loans to ﬁrms and private citizens at large.
These activities were often considered more important for the central banks than monetary policy, both in terms of daily

3
Of course, one could advocate the reform of public law and the elimination of these legal features, but that would fundamentally impair many of
the other roles of governments in taxation, conventional monetary policy, etc. The most diverse legal systems agree on this point: to function properly, a
modern government requires seniority of its debts and protection against forced liquidation.

227

## Page 4

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

Fig. 1. Banco de España, Assets and Liabilities, 1874-1914.

operations and the top management priorities. Indeed, many governments saw the positive impact on economic growth of
a central bank’s commercial activities –namely, the supply of demand deposits, the creation of credit, the integration of
payment systems, etc.– as the motivation to create such institutions.4
Perhaps the most famous case of a central bank engaged in commercial activities is the Bank of England. This institution,
established in 1694 as a privately owned limited-liability corporation, was given “the right to maximize its proﬁts through
undertaking a general banking business, including through issuing paper money, taking deposits, lending on mortgages and
dealing in bills of exchange as well as gold and silver” (Kynaston, 2017, p. 5). The Bank of England vigorously pursued
such a goal for over two centuries, encroaching on other commercial banks’ business through direct competition and the
lobbying effort with Parliament at Westminster for additional legal privileges to protect its private interests against potential
competitors.
In the U.S., both the First and Second Banks of the United States participated actively in the borrowing and credit markets
(Cowen, 2000, and Knodell, 2017). In fact, the bank war between Andrew Jackson and Nicholas Biddle was linked directly to
the Second Bank of the United States’ operations with ﬁrms and merchants, which Jackson considered favored his political
rivals (Remini, 2017).
Sometimes, central banks’ commercial activities were so extensive that they became the dominant players in the borrowing and lending markets. For example, in 1900, the Bank of Spain (Banco de España), with 58 branches that covered

4
Bindseil (2019) offers a rich historical narrative of how early central banks were deeply involved in lending and borrowing with private parties and the
motivations behind their creation.

228

## Page 5

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

all major towns across the nation, held 68% of total assets and 73% of all demand deposits in the Spanish ﬁnancial sector
(Martín-Aceña, 2017, 2018). In Fig. 1, we plot the assets and liabilities of the Bank of Spain from 1874 to 1914. Panel 1a
shows how, by the start of the 20th century, the bank’s private portfolio of loans was larger than the public portfolio of
treasury bonds. We can also appreciate, in panel 1b, the large size of the current accounts (i.e., demand deposits) on the
liabilities side of the bank.
A related development was the existence of postal savings systems. The ﬁrst such system was the Post Oﬃce Savings
Bank (POSB) in the United Kingdom, which opened in 1861. In the U.S., such a system operated from 1911 to 1967, reaching
by the end of World War II around 10% of assets of the commercial banking sector. These postal savings systems took
advantage of the existing network of post oﬃces to offer government-backed deposit accounts and other ﬁnancial services
such as easy and cheap money transfers to private citizens. If we think about a consolidated public-sector balance sheet,
deposits at a postal savings system are fully equivalent to deposits at a central bank: they are deposits in two different
agencies of the same public sector. Political-economic constraints, however, may make such full equivalence break down in
practice (for instance, if a government treats proﬁts and losses from a postal savings system differently from proﬁts and
losses from a central bank).5
The sharp distinction between a central bank operating only with primary depository institutions and commercial banks
dealing with members of the public at large is, to no small extent, a post-WWII development. This move was induced,
among other reasons, by the governments’ desire to directly control discretionary monetary policies once the gold standard
had disappeared.6
These new economic conditions led to the nationalization of many central banks, such as the Bank of England in 1946
and the Bank of Spain in 1962, regardless of the political inclination of governments (left-leaning in the U.K. in 1946, rightwing authoritarian in Spain in 1962). But, even today, one can trade shares of many central banks on stock exchanges,
including the Swiss National Bank and the Bank of Japan. Although these shares come with severe voting rights limitations,
their active trading is proof that central banks used to be engaged in a set of activities very different from the pure
conducting of conventional monetary policy.
The arrival of digital money has reopened the debate about the role of central banks. First, CBDCs have become feasible.
Second, the internet allows a central bank to skip building an extensive network of branches, either directly or in cooperation with existing commercial banks. Both factors suggest that we can, and very likely will, revisit the sharp separation wall
between central banks and the public at large. But, for such an endeavor, we require a formal economic model.
3. A model of banking
Our benchmark economy builds on the canonical banking model by Diamond and Dybvig (1983). This framework focuses
on the role of banks as maturity transformation providers. Thus, we can use our model to investigate how a CBDC, and the
subsequent opening of central bank deposits to the public at large, affects ﬁnancial intermediation and the bank runs that
might break it down.
We depart from the standard version of the model on two points. First, less signiﬁcantly, we distinguish between commercial and investment banks. This distinction clariﬁes our results, and nothing of substance beyond some intuition is lost
by eliminating it. We could rework our main propositions by allowing a richer set of contracts between banks and consumers and interbank loans. Also, dealing separately with each type of bank opens the door to extensions of the model
incorporating the observed regulatory differences between commercial and investment banks.
Second, more relevantly, we add a government-controlled central bank. Mechanically, since we are interested in CBDCs,
our model must have a central bank. But there is a more subtle point at play. One primary purpose of our analysis is
to verify that an eﬃcient allocation can be implemented when a government-controlled institution competes with private
banks for deposits. Such discussions can be logically separated from any consideration of digital money, even if digital
money makes the debate more salient by overcoming previous logistic hurdles that opening central bank balance sheets to
the public could bring. The equivalence result that emerges from our analysis can be viewed as an implementation exercise
relevant for the discussions regarding the role of central banks in the provision of deposit accounts to the public at large.
Let us then introduce the main blocks of our model. There are three periods indexed by t = 0, 1, 2. In each period,
there is a single good that can be used for either consumption or investment. The economy is populated by consumers,
commercial and investment bankers, and a central bank. Let us now describe each agent in turn. Subsections 3.1 and 3.2
follow Allen and Gale (2009), except for introducing investment banks in Subsection 3.2.

5
Governments across the world also often own controlling stakes in commercial banks. However, those banks keep a separate corporate structure subject
to regular private law and, thus, are not equivalent to postal systems, which are usually integral parts of the public sector and subject to public law.
6
Also, as economies grew, maintaining central bank facilities open to the public at large became increasingly challenging from an operational perspective.
This was, let us remember, the time before the arrival of the internet and cheap computing. Commercial banks, in comparison, found that economic growth
allowed them to gain size and offer more attractive terms to a wide range of consumers, eroding the role of central banks in providing retail services and
payment facilities.

229

## Page 6

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

3.1. Consumers
There is a [0, 1]-continuum of ex-ante identical consumers, each of whom has an endowment of one unit of the good in
period 0. The consumer’s utility function is:



U (c 1 , c 2 ) =

u (c 1 ) with probability λ,
u (c 2 ) with probability 1 − λ,

where c 1 ∈ R+ denotes consumption in period 1 and c 2 ∈ R+ denotes consumption in period 2. The utility function u :
R+ → R+ is strictly increasing, strictly concave, and continuously differentiable.
This setting has an interpretation where ex-ante identical consumers are subject to idiosyncratic consumption shocks in
t = 1. With probability λ ∈ (0, 1), an agent is an early (impatient) consumer who values consumption in period 1; with
probability 1 − λ, an agent is a late (patient) consumer who values consumption in period 2. Each consumer learns her
type (i.e., whether she is an early or late consumer) in period 1, which is private information. This informational asymmetry
will prevent banks from discriminating among consumers. In period 1, consumers can visit a central location, which occurs
sequentially in random order.
Finally, the consumer has access to a storage technology that carries one unit of the good from period 0 into one unit
of the good in period 1 and, similarly, one unit of the good from period 1 into one unit of the good in period 2. This
technology allows the patient consumer to withdraw her deposit from the bank in period 1 even if she prefers to consume
in period 2. This feature will become relevant when we deal with bank runs.
3.2. Banks
There are a large number of banks that make investments on behalf of consumers. Banks have access to two types
of investment technologies: a short- and a long-term technology. The short-term technology (or short asset) is a constantreturns-to-scale technology that takes one unit of the good at date t = 0, 1 and converts it into one unit of the good at date
t + 1. We can think about this technology as storage, such as the vault in the basement of a bank.7
The long-term technology (or long asset) is a risk-free constant-returns-to-scale technology that transforms one unit of
the good in period 0 into R > 1 units of the good in period 2. If the long-term technology is liquidated prematurely in
period 1, it pays off κ ∈ (0, 1) units of the good for each unit invested. We can think about this technology as a productive
project that requires time to yield its fruits and subject to an early liquidation cost.
There are two types of banks: commercial banks and investment banks. Both types of banks are found in the central
location. In what follows, we use the terms “banker” and “bank” interchangeably. Commercial (also called retail) banks offer
demand deposit contracts (to be described momentarily) to consumers and use the proceedings to invest in short and long
assets.
While also having access to the storage technology and the long assets, investment bankers only offer contracts contributing non-negative proﬁts in period 2. To put it differently: investment banks do not provide liquidity by offering demand
deposits to consumers. All future cash ﬂows from investment banks to a counterpart are already determined in t = 0, and
the counterpart cannot demand payments in t = 1, as is the case with demand deposits at commercial banks. Consequently,
and since the long-asset return dominates the short-asset returns, investment bankers choose only to operate the long-term
technology and maximize period-2 proﬁts.
We include in our interpretation of investment banks not only ﬁnancial institutions that call themselves by that name,
but also industrial banks (historically common in Continental Europe, Japan, and South Korea), and any other investment
vehicles, such as retirement funds, whose goals are centered around long-term returns.
3.2.1. Deposit contracts
A commercial bank offers a deposit contract (ĉ 1 , ĉ 2 ) ∈ R2+ to consumers. If the consumer accepts a banker’s contract,
she must deposit one unit of the good with the banker in period 0. The banker invests a portion y of the goods in the
short-term technology, and the remaining portion 1 − y is invested in the long-term technology.
The banker promises to pay either ĉ 1 units of the good to a consumer on demand in period 1 or the lower of the
amount ĉ 2 and the resources available to the banker, which are equally divided across all remaining consumers in period 2.
The banker is committed to paying ĉ 1 units to consumers arriving in period 1 either by using the returns from the shortterm investment or by liquidating long-term projects until all resources are exhausted. Any leftover resources in period 1
are invested in the short-term investment technology. The banker consumes any leftover resources in period 2.
The bankers maximize their period-2 consumption, which cannot be negative, per their choice of the deposit contract.
Finally, bankers are in Bertrand competition when offering deposit contracts to consumers and, thus, make zero proﬁts.
If we close the model here, before the introduction of a central bank, allocations would result in the same allocation as
in the standard Diamond-Dybvig setup. In equilibrium, the bankers would consume nothing and the expected utility of the

7
This storage technology is the same as the one available to consumers. Banks, however, have the advantage that they can pool the risks of early and
late consumers, while individual consumers cannot sign insurance contracts among themselves against their idiosyncratic liquidity risk.

230

## Page 7

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

consumers is maximized, subject to the feasibility constraints arising from the problem above. As a result, the equilibrium
allocation would be ﬁrst-best eﬃcient ex-ante (even if subject to possible runs ex-post). We refer to the contract associated
with the ﬁrst-best eﬃcient allocation as (c 1∗ , c 2∗ ). Appendix A provides the details.
3.3. The central bank
In our model, the central bank is a government-controlled institution with access to the short-term investment technology but no access to the long asset. The central bank may, however, contract with investment banks. Furthermore, the
central bank cannot rely on independent sources of taxation. Let us unpack the four components of this deﬁnition.
3.3.1. The central bank is a government-controlled institution
The ﬁrst component of our deﬁnition is that the central bank is a government-controlled institution. Our deﬁnition
highlights effective control instead of formal ownership. Many central banks have complex ownership structures that are
the product of historical accidents and political-economic bargainings. Think, for instance, about the intricate design of the
Federal Reserve System in the U.S. However, in practice, all central banks in the advanced economies behave similarly due
to governance rules that place them ﬁrmly under public control. This is true even when the central banks enjoy operational
independence to pursue goals like price stability laid down by the legislative branch. Bartels et al. (2016) provide evidence
on the irrelevance of ownership structures among 35 OECD central banks.
Government control, however, has two crucial consequences: the priority for the payment of claims due to the government (or government-controlled institutions) and protection against forced liquidation. First, a common feature of legal
systems is that the government has absolute seniority when liquidating a bankrupt debtor’s debts. In the U.S., this seniority
is inherited from the common law and established by the federal priority statute, 31 U.S.C. §3713. Federal debt seniority has
been upheld by the Supreme Court’s case law since U.S. v. State Bank of North Carolina, 31 U.S. 29 (1832), and is interpreted
broadly in favor of the U.S. This seniority holds even if other creditors have a lien on a property of the debtor or the debts
are payable in the future (e.g., bonds to be paid at a future date).8 Second, central banks cannot be forced into liquidation.
A central bank can default, but it is next to impossible to use the legal system to recover any government asset to cover the
creditor losses (unless these assets are outside the territory of the sovereign).
While these two consequences do not play any role in deriving our main equivalence result in Section 4, they will be
important in Section 5, when we analyze bank runs. We will develop this argument when we get there.
3.3.2. The central bank and the short-term asset
The ﬁrst component of our deﬁnition is that we allow the central bank to access the short-term asset. All central banks
have storage technologies: a simple visit to the gold vault at the Federal Reserve Bank of New York veriﬁes this statement.
Such a visit proves, as well, an important but subtle point: the vault allows for the storage of a real good, gold. The
Diamond-Dybvig model deals with real goods, not nominal contracts. Scaling up storage facilities could be costly but is well
within the capabilities of modern states.
3.3.3. The central bank and the long-term asset
The third component of our deﬁnition is that we do not allow the central bank to have access to the long-term asset.
This assumption captures the idea that private banks have a comparative advantage in monitoring loans to extract their full
return (or, in an alternative formulation, in liquidating non-performing loans à la Diamond and Rajan, 2001). Private banks
have developed over decades expertise in screening, monitoring, and liquidating productive projects. Thus, it is reasonable
to assume that a central bank does not have access to the same investment opportunities as private banks.9 The assumption
also makes the economics of our paper more interesting: the central bank is not a simple clone of a commercial bank on a
larger scale.
3.3.4. No ﬁscal backing
The last component of our deﬁnition is that the central bank is not ﬁscally backed, either directly through seigniorage,
or indirectly through taxation, such as a subsidy from the general-government budget. In other words, the central bank
has access only to goods provided by consumers in period 0 or the proceeds from investing these deposits. Conversely, the
commercial banks are not taxed by any special levy that might make their deposits unattractive.
This fourth component will be key for our analysis and, yet, at the same time, the most fragile. If a central bank had
ﬁscal backing, it would have an advantage with respect to commercial banks that would render the rest of the analysis
trivial. At the same time, political-economic considerations are likely to be a ﬁrst-order consideration in the actual running
of a central bank open to all. Many political groups will lobby the bank to change its borrowing and lending policies so

8

For more details, see https://www.justice.gov/jm/civil-resource-manual-206-priority and https://www.ﬁscal.treasury.gov/ﬁles/dms/debt-treatise-partII.

pdf.
9
We could relax the assumption by allowing the central bank to have access to the long-term asset with a return R ∗ < R. Since we will show an
equivalence result where, under certain circumstances, the central bank can circumvent its investment limitations, such an extension would only strengthen
our argument.

231

## Page 8

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

as to achieve the group’s preferred outcomes, even if this action requires ﬁscal backing. Similarly, considerations about the
ownership structure of central banks and dividend payments, which we argued above are mainly inconsequential at the
moment, might resurface.
3.3.5. Deposits at the central bank
The central bank can offer the same kind of deposit contract (d1 , d2 ) described above to consumers, i.e., it competes for
deposits with the commercial banks. Speciﬁcally, in exchange for one unit of the good at date 0, the central bank allows
consumers to withdraw either d1 ∈ R+ units in period 1 or d2 ∈ R+ units in period 2.
From our previous discussion, the central bank is in a disadvantaged position to compete with the commercial banks.
Lacking access to long-term investment opportunities, a central bank might seem less capable of engaging in liquidity
transformation. We will show that, despite this disadvantage, the central bank can still compete in the retail deposit market
by contracting with the investment banks to access the long-term technology, referred to as wholesale deposits. Implicit in
this step is the assumption that a central bank will not face frictions in the wholesale deposit market (such as a lack of
information or the expertise to operate in it). Given that central banks already participate in this market, this assumption
is empirically sound. For instance, the ECB operates its reﬁnancing operations (MROs), longer-term reﬁnancing operations
(LTROs), targeted longer-term reﬁnancing operations (TLTROs), and pandemic emergency longer-term reﬁnancing operations
(PELTROs) with a wide variety of ﬁnancial institutions.
In period 0, all bankers and the central bank play a simultaneous game, referred to as the demand deposit game, when
offering both retail and wholesale deposit contracts. After observing the contracts posted by all bankers and the central
bank, all consumers make their deposit decisions. The central bank then deposits a portion 1 − x of each deposited unit
with the investment banks, investing the remainder x ∈ [0, 1] in the short-term technology.
Let 2 ∈ R+ be the contract between the central bank and the representative investment bank. In this contract, the
private investment bank receives wholesale deposits from the central bank in period 0, invests them in the long asset, and
returns, in period 2, 2 to the central bank per unit deposited. The investment bank only offers this contract if it results in
non-negative proﬁts, i.e., if

2 ≤ R.

(1)

Let f ∈ [0, 1] denote the fraction of consumers who deposit with the central bank in period 0. Because each consumer
deposits one unit, the central bank receives f units from all consumers. Let α ∈ [0, 1] denote the fraction of consumers who
decide to withdraw in period 1. The budget constraints for the central bank in periods 1 and 2 are:

α d1 ≤ x

(2)

(1 − α ) d2 ≤ 2 (1 − x) + x − αd1 ,

(3)

and

respectively.
Notice that we do not assume a particular behavior of the central bank (such as proﬁt or social welfare maximization)
beyond the requirement that the central bank satisﬁes its budget constraints (i.e., no ﬁscal backing). In the tradition of
public ﬁnance, we will postulate below an equilibrium indexed by the central bank choice of deposit contract (regardless of
how it is determined) and characterize it for a class of relevant contracts.
3.4. The consumer’s problem
Consider now the consumer’s problem. An individual consumer must decide whether to deposit with the central bank,
consuming either c 1 = d1 upon withdrawal in period 1 or c 2 = d2 in period 2, or with a commercial bank, consuming either
c 1 = ĉ 1 upon withdrawal in period 1 or c 2 = ĉ 2 in period 2. Consumers choose the contract that delivers the highest ex-ante
expected utility. If both contracts offer the same utility, then some fraction f will pick the central bank, and the remaining
fraction will pick the commercial banks. In that case, the fraction f is indeterminate.
To complete the description of consumer behavior in period 0, we need to specify deposit decisions in the initial period
and withdrawal strategies in the intermediate period. Let h i ∈ {0, 1} denote the deposit decision of consumer i ∈ [0, 1],
where h i = 0 represents depositing with a commercial bank and h i = 1 represents depositing with the central bank. Let
h = {h i }i ∈[0,1] denote the proﬁle of deposit choices in the initial period.
A withdrawal strategy for consumer i is a variable σi ∈ {1, 2} that indicates the date at which consumer i withdraws from
the banking system. An early consumer always withdraws in the intermediate period with probability one. A late consumer
may choose to withdraw early, depending on her beliefs about other patient consumers’ actions. Let σ = {σi }i ∈[0,1] be the
complete proﬁle of withdrawal strategies, and let σ−i denote the proﬁle of strategies for all investors except i. In period 1,
consumer i selects a best response σi in the withdrawal game, given her expectations of other agents’ strategies σ−i .
232

## Page 9

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

4. Equilibrium
We are ready to deﬁne an equilibrium for the economy with a central bank. We restrict our attention to symmetric
equilibria, where all investment banks and all commercial banks use the same contract.
Deﬁnition 1. An 
equilibrium
is a contract 2 between the central bank and the representative investment bank, a demand
deposit contract ĉ 1 , ĉ 2 for the representative commercial bank, a demand-deposit contract (d1 , d2 ) for the central bank,
deposit decisions h ∈ {0, 1} in the initial period, a strategy proﬁle σ ∈ {1, 2} for the withdrawal game in the intermediate
period, a fraction α ∈ [0, 1] of consumers who withdraw in period 1, and a fraction f ∈ [0, 1] of consumers depositing with
the central bank such that:





1. In period 0, given the contracts ĉ 1 , ĉ 2 and (d1 , d2 ), each consumer i ∈ [0, 1] optimally deposits one unit of the good
with a ﬁnancial institution by selecting the contract that offers the highest expected utility. The strategy proﬁle σ is a
Nash equilibrium of the withdrawal game inperiod 1.
2. Each commercial bank chooses the contract ĉ 1 , ĉ 2 to maximize proﬁts in period 2, given (d1 , d2 ).
3. Each investment bank offers the contract 2 , provided it satisﬁes the non-negative proﬁt condition (1).
4. The budget constraints (2) and (3) for the
 central bank hold with equality, given the strategy proﬁle σ .
5. Withdrawals in period 1 satisfy α = 1 − {i ∈[0,1]:σ =2} di.
6. Initial deposits f at the central bank satisfy f =


i

h i di.

While, in this economy, the central bank does not necessarily act as a self-interested agent, it still competes with the
commercial banks for deposits from consumers. This competition could lead commercial banks to behave differently than
they would do in the absence of a central bank. In particular, 0 < f < 1 can only occur if consumers are indifferent between
depositing at the central bank or a commercial bank. Nevertheless, we next show that the central bank can replicate the
socially optimal contract described in Appendix A by relying on the investment banking sector.
Lemma 4.1 (Replication of the optimal contract). The central bank replicates the socially optimal commercial bank contract by setting
x = y ∗ , d1 = c 1∗ , d2 = R (1 − y ∗ )/1 − λ. To offer this optimal contract, the central bank requires l2 = R, implying zero proﬁts to
investment banks.
Proof Lemma 4.1. The allocation x = y ∗ , d1 = c 1∗ , d2 = R (1 − y ∗ )/1 − λ with l2 = R is feasible by (1), (2), and (3) and with
α = λ and optimal by (A.1), and (A.2). 
Our next result shows that, in equilibrium, the socially optimal contract is always offered by some bank.
Proposition 4.1. In equilibrium, the socially optimal contract is offered either by the commercial banks or the central bank or both. If
both the central bank and the commercial bank have customers, f ∈ (0, 1), then both banks are offering the optimal contract.
If only commercial banks offer the optimal contract, they absorb the entire deposit market ( f = 0). Conversely, if only
the central bank offers the optimal contract ( f = 1). If both kinds of banks offer the optimal contract, by indifference, every
f ∈ [0, 1] is an equilibrium.
Proof Proposition 4.1. We ﬁrst show that, in equilibrium, all commercial bankers that have deposits make zero proﬁts and
offer the socially optimal contract.
Let τ denote the commercial bank’s proﬁt. Consider the following depositor utility maximization problem, which guarantees proﬁt τ :

V (τ ) =

max

( y ,c 1 ,c 2 )∈R3+

[λu (c 1 ) + (1 − λ) u (c 2 )]

subject to 0 ≤ y ≤ 1, λc 1 ≤ y, and

(1 − λ) c 2 ≤ R (1 − y ) + y − λc 1 − τ .
Let ( y (τ ) , c 1 (τ ) , c 2 (τ )) denote the solution to this problem. The value function V (τ ) gives the maximum expected utility
for the consumer for each proﬁt level τ ∈ R+ for the banker. Given our assumptions on preferences and technologies, we
obtain a unique interior solution characterized by:

u

 y
λ

= Ru 



R (1 − y ) − τ
1−λ

,
233

## Page 10

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242
R[1− y (τ )]−τ

y (τ )

which implicitly deﬁnes y (τ ). Then, we have c 1 (τ ) = λ and c 2 (τ ) =
.
1−λ
The envelope theorem implies V  (τ ) < 0 for any τ > 0. All consumers contract only with those banks that offer the
highest utility-yielding contract. All commercial banks internalize that the banks that offer the best contract absorb the
entire
If the commercial banker’s proﬁt is non-zero τ > 0, then any banker who offers a contract
    market
  of deposits.
 
y τ , c 1 τ  , c 2 τ  with 0 < τ  < τ will end up attracting all consumers and, therefore, make non-zero proﬁts. Due
to
 ∗this∗ price
 competition, we can only obtain an equilibrium for τ → 0. The result follows by ( y (τ ) , c 1 (τ ) , c 2 (τ )) →
y , c 1 , c 2∗ pointwise: if f < 1, then the commercial banks with customers offer the optimal contract. Fix V ∗ ≡ limτ →0 V (τ ),
the value implied by the optimal contract.
What if the central bank also attracts some, and potentially all customers, f ∈ (0, 1]? We next show that in this case,
the central bank must also be offering the optimal contract.
By Lemma 4.1, the central bank is capable of offering the socially optimal commercial bank contract. Since the central
bank does not have access to better technology, and by 2 ≤ R (otherwise the investment banking sector runs losses) and
α ≥ λ, the central bank cannot offer a contract better than the socially optimal commercial bank contract.
Suppose the central bank offers a contract (d1 , d2 ) subject to the feasibility constraints (1), (2), and (3). Such a contract
will result in the expected utility λu (d1 )+(1 − λ) u (d2 ) for the consumer. Because V (τ ) is continuous, and decreasing, there
exists a proﬁt τc ≥ 0 such that the commercial bank can replicate the central bank contract V (τc ) = λu (d1 ) + (1 − λ) u (d2 ).
If τc = 0, the central bank is offering the socially optimal contract. In that case, the commercial bank can make the central
bank customers indifferent by also setting the optimal contract, achieving by this any f ∈ [0, 1] in equilibrium. If τc > 0,
then the central bank is not offering the socially optimal contract. Thus, the commercial bank can lure the central bank’s
customers away ( f = 0) by offering a contract that implies a proﬁt τ < τc . Other commercial banks can further undercut
the proﬁt and again the socially optimal contract is offered in equilibrium as τ → 0 via Bertrand competition. Further, since
the central bank anticipates this competition, it may set the socially optimal contract in the ﬁrst place. 
The previous result shows how competition limits how much surplus investment banks can extract from the central
bank. For any 2 < R, the central bank fails to offer the socially optimal contract. Due to Bertrand competition with the
commercial banking sector, the central bank attracts zero deposits, which leads to zero initial investment in the investment
banking sector. The competition for deposits between the commercial banking sector and the central bank disciplines the
investment banking sector.
Lemma 4.1 and Proposition 4.1 show that, since a central bank is capable of replicating the socially optimal contract by
relying on the investment banking sector, the presence of a CBDC (or, more generally, of a central bank “open to all”) can
still deliver the same maturity transformation that commercial banks do in its absence. Moreover, if the socially optimal
contract is offered and if all consumers behave according to their types (i.e., consumers withdraw if and only if impatient),
then the socially optimal contract is indeed attained. This result holds independently of whether the contract is offered by
the commercial bank or the central bank.
This equivalence result backs up some of the statements of the defenders of a CBDC: in equilibrium, we still obtain
the socially optimal amount of maturity transformation. However, this equivalence result has a sinister counterpart. If the
conditions behind Lemma 4.1 and Proposition 4.1 are broken, for instance, because the central bank receives ﬁscal backing, the competitive forces that create the right amount of maturity transformation disappear and the central bank must
tread carefully in deciding how to avoid creating suboptimal levels of maturity transformation. While the central bank can
do so, nothing in the model is ensuring such an outcome. In particular, there is the threat that, in the absence of the
counterbalancing forces of competition, political-economic mechanisms might lead the central bank to outcomes that are
suboptimal.
5. Runs
In the previous section, we show a fundamental equivalence result between commercial and central banks’ deposit
contracts. Nevertheless, the payments written in the deposit contract were feasible only if consumers behaved according to
their types. But what if they do not do so?
The contract offered by the central bank is not identical in functionality to the contract offered by the commercial banks.
The central bank contract is more rigid, since the central bank cannot call its loan to the investment bank. That is, the central
bank can serve up to the returns of the short asset and not more. In comparison, the commercial bank has direct control
over its investment: the commercial bank can serve consumers in the interim period on demand by liquidating the short
and long asset. Hence, once we allow for banking panics where consumers mimic the impatient type and withdraw early
to secure their deposits, the rigidity of the central bank’s contract has implications for depositor incentives and equilibrium
outcomes.
5.1. Why do commercial banks not deposit with the investment banks?
As mentioned in Subsection 3.3, commercial banks do not engage in the same contract with the investment banks for
two complementary reasons deeply rooted in public law all across the world. These two reasons make central banks’ assets
and liabilities inherently different from the commercial banks’ assets and liabilities.
234

## Page 11

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

First, the seniority of central bank debt means that commercial banks avoid depositing with investment banks that
also receive deposits from the central bank. The simplest way to see this is to introduce, in the next paragraphs, a small
probability that a long-term asset fails.
Imagine that a long-term project reaches fruitful completion and returns R only with probability χ . With probability
1 − χ , the long-term project fails and, in liquidation, we can recover only γ R where 0 < γ < 1. If a commercial bank invests
in a long-term project by itself, the expected return is χ R + (1 − χ )γ R. Let us consider the case where the commercial
bank has, instead, deposited in an investment bank, where the central bank has also deposited. The fraction of deposits that
ﬁnance the project that comes from the central bank is ρ > 0. In case of the failure of the long-term project, at liquidation,
the central bank is senior and obtains min(ρ , γ R ), that is, the minimum of either of all its investment (ρ ) or the liquidation
value of the project. In comparison, the commercial bank gets the residual max(0, γ R − ρ ).10 Thus, Bertrand competition
among the commercial banks will force them to avoid the investment bank and rely on their own long-term projects to be
able to offer a better rate of return to their depositors.11
This problem is similar to the situation in sovereign debt lending. Since lending from multilateral institutions like the
IMF and World Bank is senior to private lending, even if the latter is older in time, new multilateral programs crowd out
private lending by increasing its expected loss in the event of default (see the evidence for crowding out in Krahnke, 2020).
We will skip introducing the parameters χ and γ in our model. Except to illustrate the point above, they only complicate
algebra and they can always be trivially small and still deliver the desired result.
The second reason is that the central bank cannot be forced into liquidation, but commercial banks can. A commercial
bank that faces too many withdrawals in the interim period cannot argue that its assets are tied down with the investment
bank (as a “commitment device” to avoid runs) to refuse payment: bankruptcy will be the consequence.12 In comparison, a
central bank can default, but it is next to impossible to use the legal system to force its liquidation. A central bank will use
this protection against liquidation to prevent runs.
5.2. Commercial bank runs
Following Diamond and Dybvig (1983), we now show how commercial banks are prone to self-fulﬁlling runs. Consider
a consumer who has deposited with the commercial bank. By Proposition 4.1, we know that this bank must be offering
the socially eﬃcient contract (c 1∗ , c 2∗ ). Assume that, at t = 1, the consumer learns that she is patient. Since her type is
unobservable, she may nevertheless act as if she were impatient and decide to withdraw. When would she do this?
If only a measure α = λ of consumers withdraw, the payoffs are exactly as in her contract. If, however, patient consumers
also withdraw, i.e., α ∈ (λ, 1], the payoffs to rolling over and withdrawing deviate from the payoffs promised in the contract.
This is because the commercial bank has committed to paying c 1∗ to every consumer who demands back her deposit in t = 1.
To ﬁnance withdrawals above λ, the commercial bank needs to liquidate the long-term asset, which reduces payoffs to those
consumers who roll over.
We say that a run on the commercial bank occurs if the commercial bank is forced to liquidate not only its investment
in the short-term asset but also its investment in the long-term asset to satisfy short-term withdrawals. That is, if α c 1∗ >
y ∗ + (1 − y ∗ )κ , or equivalently if

{Run on Commercial Bank}

⇔

{(α − λ) c1∗ > (1 − y ∗ )κ }

(4)

In the case of a run, consumers who roll over receive zero, and consumers who withdraw receive the payoff c ∗ only
1

with a certain likelihood due to rationing. The interpretation here is that α > λ consumers queue at the commercial bank to
receive their deposits back. As explained above, the bank serves consumers by using short assets and liquidating long-term
assets. If there are not enough long-term assets to liquidate, the commercial bank chooses a random subset of consumers
y ∗ +(1− y ∗ )k
in the queue to whom it serves the payment c 1∗ .13 Conditional on no run, the consumers’ payoffs are as in the
αc∗
1

original contract.
The payoff matrix is, then:

10
This argument assumes that investment banks cannot discriminate against the central bank in terms of interest rates. Most legal systems preclude
this discrimination: governments cannot be offered worse prices than private parties for equivalent products. Notice that the investment bank cannot get
around this problem by offering different tranches of returns on an underlying long-term asset. The seniority of the central bank would overrule any
privately contracted seniority tranching.
11
Interestingly, consumers do not seem to be too interested in lock-ins. For example, the well-known “closed-end funds” puzzle documents that closedend funds that lock in capital and offer liquidity to investors through exchange-traded fund shares trade at a 10%-20% discount (Lee et al., 1991). More in
general, consumers react tepidly to deposit contracts that introduce some equity components. It is not the point of our paper to analyze why. We just take
these observations as given.
12
Unless the regulatory system allows a mandatory stay in deposits, which most systems do not. Ennis and Keister (2009) highlights that, for plausibly
parameter values, suspension of convertibility is not ex-post optimal. In fact, deposit freezes and payment rescheduling with court intervention, are usually
only allowed in cases of system-wide runs.
13
Goldstein and Pauzner (2005) make this assumption about which consumers receive payments to avoid the possible complications of a sequential
service constraint pointed out by Wallace (1988).

235

## Page 12

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

Event/ Action

withdraw
u (c ∗ )

no run


u

1

rollover
R [(1− y ∗ )−(α −λ)c 1∗ /κ ]
1−α

y ∗ +(1− y ∗ )k
· u (c 1∗ )
α c1∗

run



0

Thus, we ﬁnd a classic strategic complementarity in actions: conditional on a bank run, the payoff from withdrawing
exceeds the payoff from rolling over and withdrawing deposits is optimal. Conversely, if only a few consumers withdraw,
α = λ, then the payoff from rolling over is larger, c1∗ < c2∗ (recall Appendix A). Thus, for a patient consumer, it is optimal to
roll over her deposit. We summarize this idea in the proposition below, taken from Diamond and Dybvig (1983).
Proposition 5.1 (Commercial bank multiple equilibria). The withdrawal game of commercial bank consumers has two pure equilibria.
There is a good equilibrium in which all patient consumers roll over their deposit, α = λ, and the socially optimal contract is attained.
But there is also a bank run equilibrium, where all patient consumers panic and withdraw, α = 1. In the latter case, the socially optimal
contract is not attained.
5.3. Central bank runs
Runs on central banks are a very different phenomenon than runs on commercial banks. During a bank panic, the
central bank can only serve withdrawals up to the returns stemming from the short asset since it cannot call the loan to
the investment bank.14
This constraint has two implications. First, the payoffs under a run on the central bank differ from payoffs under a run on
the commercial bank. In the social optimum, the central bank invests y ∗ = λc 1∗ in the short asset and loans the remaining
1 − y ∗ to the investment bank. Thus, the central bank cannot serve more than a measure y ∗ of withdrawals, while the
commercial bank can serve up to a measure y ∗ + (1 − y ∗ )κ by liquidating long assets early.
Second, the incident that triggers a run on the central bank differs from the triggering event for a run on a commercial
bank. A run on the central bank occurs if α c 1∗ > y ∗ or, equivalently, if:

{Run on Central Bank}

⇔

{α > λ}

(5)

In the incident of a run, the central bank can allocate only real goods of quantity y ∗ to a measure α of agents. As in the

commercial bank case, we assume that consumers queue and receive c 1∗ units with likelihood λ/α .
But how do we treat the remaining consumers who were not served? Recall that the central bank cannot be forced into
liquidation. Instead, a central bank can adopt two different schemes: punishment and equal treatment.

5.3.1. Punishment
The central bank can decide to punish consumers who contribute to the run by not paying any consumers who try to
withdraw beyond the measure λ. All returns earned in t = 2 will go exclusively to consumers who roll over. Then, the payoff
matrix becomes:
Event/ Action

withdraw

no run, α = λ

u (c 1∗ )

run, α > λ



λ
∗
α · u (c 1 ) + 1 − α · 0
λ

rollover


u
u



R (1− y ∗ )
1−λ
R (1− y ∗ )
1−α




Under this scheme, a consumer who rolls over is rewarded when withdrawals are high, since she shares the total returns
with fewer consumers. For α > λ,



u

R (1 − y ∗ )
1−α



>u

R (1 − y ∗ )
1−λ

(6)

.

In addition, during a run, due to punishment and queuing, a withdrawing consumer receives c 1∗ only with a certain likelihood:

λ

α

u (c 1∗ ) < u (c 1∗ ).

Last, we know c 1∗ < c 2∗ ≡

(7)
R (1− y ∗ )
, since the utility function is concave and by R > 1 and equation (A.2). Altogether, for
1−λ

α > λ:

14
The central bank does not have ﬁscal backing and, this being a real model, it cannot issue ﬁat money to meet consumers’ demand. Schilling et al.
(2020) relax the latter assumption by building a nominal model of CBDCs.

236

## Page 13

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

λ

α

u (c 1∗ ) < u



Review of Economic Dynamics 41 (2021) 225–242

R (1 − y ∗ )

(8)

1−α

Thus, the resulting payoff matrix breaks the strategic complementarity of actions and runs do not happen. To patient
consumers, rolling over is dominant, and, in equilibrium, only impatient consumers withdraw. Formally, we have our next
proposition.
Proposition 5.2 (Central bank equilibria: no run under punishment). If the central bank punishes consumers who contribute to a run,
then the withdrawal game of central bank consumers has a unique equilibrium. All patient consumers roll over, and only impatient
consumers withdraw. Runs on the central bank do not occur. The socially optimal contract is always attained when offered.
This result is reminiscent of a mandatory stay for consumers that enforces a halt of service. Diamond and Dybvig (1983)
already show that the combination of punishment and a regulatory intervention (here the deposit of the central bank in the
investment bank) can deter runs.
5.3.2. Equal treatment
Now assume instead that the central bank forces consumers beyond measure λ who cannot be served in the interim
period to roll over their deposits. Consequently, the payoff to rolling over is independent of what other consumers do and
the resulting payoff matrix becomes:
Event/ Action

withdraw

no run, α = λ

u (c ∗ )

run, α > λ

1





λ
λ
∗
α · u (c 1 ) + 1 − α · u

rollover




R (1− y ∗ )
1−λ



u
u



R (1− y ∗ )
1−λ
R (1− y ∗ )
1−λ




As before, the rigidity of the central bank’s contract with the investment bank prevents runs from happening. We still
R (1− y ∗ )
have that c 1∗ < c 2∗ ≡ 1−λ and rolling over is dominant if the consumer is patient. The new proposition is as follows.
Proposition 5.3 (Central bank equilibria: no run under equal treatment). Assume the central bank does not punish consumers who
contribute to the run, but treats them as if they had rolled over their deposits. Then, the withdrawal game of central bank consumers
has a unique equilibrium. All patient consumers roll over and only impatient consumers withdraw. Runs do not occur. The socially
optimal contract is always attained when offered.
5.4. Deposit monopoly
Given that consumers anticipate outcomes before depositing with the commercial or the central bank, we obtain our
next result when runs occur at the commercial bank with a strictly positive probability along the equilibrium path:
Proposition 5.4 (Central bank deposit monopoly under bank runs). If the central bank offers the socially optimal contract, then via
either a punishment or an equal treatment scheme, it will attract all deposits in the market away from the commercial banking sector.
We omit the proof in the interest of space, but it is easy to see what is happening here. Even if the commercial banking
sector offers the socially optimal contract to compete with the central bank, the commercial bank cannot prevent the bad
bank run equilibrium from occurring. Thus, the consumers are better off depositing at the central bank. If consumers believe
that commercial bank runs can happen with positive probability, they will be strictly better off by depositing at the central
bank. Only in the case where consumers believe that commercial bank runs do not happen, will they be indifferent between
depositing at the central bank and at the commercial bank. Since even a small tremble in beliefs will break this indifference,
we do not consider this limit case further.
Since consumers internalize that the central bank contract is run-proof, the central bank enjoys market power. In particular, the central bank can offer a different deposit contract from the socially optimal one and still obtain a monopoly of all
deposits. We can see this through a variational argument with respect to the result in Proposition 5.4.
Let U 1 be the expected utility from the run-prone commercial bank deposit contract and U 2 the expected utility from
the run-proof central bank deposit contract. If runs occur with a strictly positive probability, U 1 < U 2 even if both contracts
are socially optimal ex-ante. Thus, the central bank can ﬁnd a c 1 < c 1∗ such that U 1 < U (c 1 ) < U 2 . That is, c 1 maintains
run-proofness but i) lowers the utility of the consumer and generates positive proﬁts for the central bank, and ii) departs
from the socially optimal allocation.
5.5. The risks of deposit monopoly
Why is there a risk that a central bank that enjoys deposit monopoly will use it and depart from the socially optimal
allocation? Because of political-economic forces. Let us provide a concrete example. On November 27, 2019, a group of
237

## Page 14

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

academics and various social groups signed an open letter to Christine Lagarde asking the ECB to act on climate change
through a commitment “to gradually eliminating carbon-intensive assets from its portfolios.” Indeed, if the central bank has
market power, it can divert investment toward environmental-friendly technologies. Operationally, the central bank can use
its positive proﬁts from the previous paragraph and distribute them, through lower interest rates, to ﬁrms with a lower
C O 2 imprint. The political process, which in Europe has recently witnessed large electoral gains by green parties, is likely
to look at this policy most favorably.
The political-economic pressures are endless: diverting investment toward ﬁrms that lead in gender and racial equality,
diverting investment toward ﬁrms to bridge the rural-urban divide, diverting investment toward poorer regions, diverting
investment toward ﬁrms that offer a better balance of family and work life, diverting investment toward “strategic” sectors
of high added value, diverting investment toward “national champions,” and so forth. We can even think of less benign
reasons, such as diverting investment to ﬁrms owned by the supporters of the political party in power.
In fact, the TRLOs III of the ECB already conditions the interest rate applied to the participating banks’ lending patterns.15
In the U.S., the Community Reinvestment Act of 1977 redirects loans by commercial banks toward local communities, and
it is easy to see how such a program could be extended to a Federal Reserve System “open to all.”
Admittedly, many of the policy goals enumerated in the previous paragraph exist because the market allocation is not
optimal. For example, climate change is caused by market failures. Is it a good idea to use the central bank’s monopoly
power to ﬁght the market failures behind climate change? Decades of disappointing experiences with government-owned
banks subsidizing investment in otherwise laudable goals such as ﬁghting regional disparities in Europe suggests that exploiting the central bank’s market power and departing from the competitive-market maturity transformation might not be
the best tool to improve social welfare. For the poor performance of these efforts, see Fernández-Villaverde et al. (2013).
Pigouvian taxes, for example, seem a much cleaner alternative to ﬁght climate change.
The central bank’s resilience to runs is a double-edged sword: it avoids ﬁnancial panics, but it destroys the competitive
forces that discipline central banks that are “open to all.”
6. Robustness
Our benchmark model can be extended in many different directions to better reﬂect the possible advantages and disadvantages of a CBDC. In the interest of space, we focus on the robustness of our results to fundamental runs due to asset risk
and the presence of central bank regulation.
6.1. Fundamental runs due to asset risk
In our benchmark model, the long-term asset has no aggregate risk: it returns R for sure in t = 2. Consider now, instead,
the case where bank loans are subject to the risk that the borrower (i.e., the long-term project) fails to repay for some
exogenous reason (credit risk). If information reaches markets that a borrower may not repay (i.e., the bank has issued a
bad loan), we might have a run on the bank driven by information, and not, as before, by panic (Chari and Jagannathan,
1988, and Goldstein and Pauzner, 2005, hereafter GP).
To model these information-driven runs, we assume that the asset return R is only paid with probability p (θ). With
probability 1 − p (θ), it pays zero. The function p (·) is strictly increasing and differentiable, with p (0) = 0, and θ ∼ U [0, 1]
is the random state of the economy. Bank consumers observe noisy, private, and correlated signals about the return probabilities before making their decision θi = θ + εi , εi ∼ U [−ε , ε ], where the noise terms εi are i.i.d. and independent of the
state distribution.
The payoffs at the commercial bank then become:
Event/ Action
no run
run

withdraw



u (c ∗ )

p (θ) u

1

rollover
R [(1− y ∗ )−(α −λ)c 1∗ /κ ]
1−α

(1− y ∗ )κ
∗
(α −λ)c 1∗ · u (c 1 )



0

In a global games environment, GP show that a run on the commercial bank continues to exist under these circumstances
either due to miscoordination or bad fundamentals. More relevant for us, the central bank will also be subject to runs.
Consider the case of equal treatment under aggregate risk:
Event/ Action

withdraw

no run, α = λ

u (c 1∗ )

run, α > λ





λ
λ
∗
α · u (c 1 ) + 1 − α · p (θ) u

rollover





R (1− y ∗ )
1−λ



p (θ) u
p (θ) u



R (1− y ∗ )
1−λ
R (1− y ∗ )
1−λ




15
See https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019D0021(01). Monnet (2018) describes some of the long history of central banks in
Europe redirecting credit toward social outcomes preferred by the political process.

238

## Page 15

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

Then, for suﬃciently low state realizations, i.e., θ ∈ [0, θ ], with θ such that:

u (c 1∗ ) = p (θ )u



R (1 − y ∗ )
1−λ

(9)

,

“withdraw” is a dominant action and we have a central bank run.
Unlike the case for the commercial bank described in GP, depositors at the central bank do not play a coordination
game. In equilibrium, all impatient consumers withdraw, and, thus, α cannot be below λ. Thus, every patient consumer is
pivotal: if she withdraws, she triggers a run on the central bank. But since the investment in the long asset is protected
from liquidation by the rigidity of the contract, for every θ > θ , rolling over the deposit is dominant.
The lower dominance region for commercial bank runs is determined by the same threshold θ given by condition (9).
However, due to miscoordination, the range of state realizations for which commercial bank runs occur is larger. There exists
a critical state θb ∈ (θ, 1] such that commercial bank runs occur for all states in [0, θb ).16
Consequently, there exists an interval of state realizations (θ , θb ) for which runs occur on the commercial bank, but not
on the central bank under equal treatment. Consumers internalize that the central bank is safer ex-ante, and solely deposit
with the central bank. Thus, as before, the central bank has a monopoly power that it can exploit to deviate from the
socially optimal deposit contract.
Our next proposition characterizes central bank runs under the assumption that the central bank offers the socially
optimal deposit contract, a natural benchmark for our investigation, generating a deposit monopoly.
Proposition 6.1 (Deposit monopoly under asset risk and equal treatment). If the central bank offers the socially optimal deposit contract, under asset risk and equal treatment, central bank runs occur for state realizations in [0, θ], but do not arise for states [θ, 1].
Ex-ante, runs on the central bank occur less often than runs on commercial banks and, therefore, the central bank attracts all deposits.
In the case of a run on the central bank, we do not get the optimal allocation if the asset fails to pay or if an impatient
consumer is forced to wait until the long asset matures. Also, as we mentioned above, while the proposition is driven by the
rigidity of the contract, the main result resembles a setting where a commercial bank invests in the risky asset directly and
a regulator has the authority to stop runs to protect asset liquidation once a critical measure of consumers has withdrawn.
For further details, see Schilling (2018).
Now let us return to the case where the central bank punishes consumers who contribute to the run under asset risk.
The payoff matrix becomes:
Event/ Action

withdraw

no run, α = λ

u (c ∗ )

run, α > λ

1



rollover



p (θ) u



λ
λ
∗
α · u (c 1 ) + 1 − α · 0

p (θ) u



R (1− y ∗ )
1−λ
R (1− y ∗ )
1−α




Consider the state θ deﬁned by condition (9). For all [θ , 1], rolling over remains dominant because, in equilibrium, all
impatient types withdraw and α ≥ λ. Therefore:

λ

α

∗



∗

u (c 1 ) ≤ u (c 1 ) ≤ p (θ) u

R (1 − y ∗ )
1−λ



≤ p (θ) u

R (1 − y ∗ )
1−α

.

(10)

We look now at the range [0, θ ). Under equal treatment, consumers’ withdrawal is dominant for state realizations in
[0, θ ). Under punishment, however,
this

 is not true. To see this, assume the state is realized in θ ∈ (0, θ ). Then, p (θ) > 0.
Because the pro rata share u

R (1− y ∗ )
1−α

goes to inﬁnity for α → 1 and because αλ · u (c 1∗ ) ∈ [λu (c 1∗ ), u (c 1∗ )] is bounded, there

exists a measure of withdrawals α (θ) > λ such that:

λ

α

∗

u (c 1 ) < p (θ) u



R (1 − y ∗ )

(11)

1−α

for all α > α (θ). That is, for every low state realization (0, θ ), rolling over is optimal if withdrawals are suﬃciently high.
We can formalize this argument in the next proposition, again under the assumption that the central bank offers the
socially optimal deposit contract.
Proposition 6.2 (Deposit monopoly under asset risk and punishment). If the central bank offers the socially optimal deposit contract,
under asset risk, a central bank that punishes consumers for contributing to runs is at least as stable as the central bank that applies
equal treatment. Therefore, under asset risk, the central bank is always more stable than the commercial banking sector and attracts
all deposits away from the commercial banks.

16
Using a global games approach (Carlsson and Van Damme, 1993), GP show the existence of such a critical state θb > θ when depositors observe noisy
private and correlated signals θi = θ + εi about the state of the world, where εi ∼ U [−ε , ε ] are noise terms that are independent of the state θ .

239

## Page 16

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

The intuition for this result is simple. The punishment of consumers who contribute to a run implies a reward for
consumers who roll over. Moreover, the rigidity of the contract protects consumers who roll over from receiving nothing
(recall that θ = 0 has zero probability and, thus, the asset always pays with some probability). Hence, as soon as enough
consumers withdraw, the reward for rolling over is large enough to compensate for a bad outlook of the asset. The rigidity
of the contract paired with the punishment-reward scheme self-regulates withdrawals and deters runs.
The deterrence of runs is always optimal and eﬃcient if the long asset is free of risk. Under aggregate risk, however,
early asset liquidation is eﬃcient if the asset’s continuation value p (θ) R falls short of the liquidation value κ (Allen and
Gale, 1998). In this situation, the rigidity of the central bank’s contract can cause harm and ineﬃcient investment during a
recession (i.e., a time of low p (θ) R).
6.2. Central bank regulation
Our analysis has focused on the setting where the central bank can invest in both the storage technology and a loan to
the investment bank. In principle, however, nothing prevents the central bank from investing in a demand-deposit contract
with a commercial bank to conduct maturity transformation.
Unlike the rigid contract with the investment bank, the commercial bank serves deposit withdrawals in the interim
period on demand. As consumers start withdrawing from the central bank, the central bank withdraws from the commercial
bank to ﬁnance those demands from its deposits. Since the commercial bank may liquidate the entire long asset in the
interim period, consumers who roll over at the central bank may receive a zero payment. As consumers internalize this
feature, central bank runs become more likely ex-ante in comparison to the case where the central bank abstains from
investing in the commercial bank and only uses the investment bank. Moreover, a run on the central bank may trigger a
run on the corresponding commercial bank and vice versa. Our analysis suggests the usefulness of prohibiting the central
bank from investing in maturity-transforming institutions. In that way, we can prevent a bank run cascade (contagion). For
related ideas, check Dasgupta (2004).
Recall that the central bank’s investment in the long asset through investment banks exposes the central bank to runs
if the long asset is risky. If, by regulation, the central bank only invests in the short asset (i.e., highly liquid assets), central
bank runs do not occur, but the socially optimal contract is only offered by the commercial banking sector. As we found
before, central banks face a trade-off between offering the socially optimal contract and being run-proof.
6.3. Deposit insurance
Notice that most of our analysis regarding the effects of a CBDC would remain unchanged if we introduce deposit
insurance. First, an actuarially fair deposit insurance (for instance, against fundamental asset risk) does not violate the
condition of no ﬁscal backing of the central bank since it does not change the deposits’ expected value at a commercial
bank in the absence of runs.
Second, deposit insurance does not wholly eliminate bank runs. Large deposits are not covered by deposit insurance
(especially when we go to the “shadow banking sector,” which plays the same role as commercial banks in our models). As
shown during the 2007-2008 ﬁnancial crisis, we can have an even quicker bank run among large depositors than with small
consumers. Thus, a CBDC may favor large depositors more than smaller ones, even if the motivation for a CBDC has often
been to help the latter, not the former. Nevertheless, even small consumers may run in the presence of deposit insurance to
avoid the delays and inconveniences of having to deal with the insurance corporation to recover their deposits. Therefore, a
CBDC that eliminates bank runs might attract them, which confers market power on the central bank.
7. Conclusions
In this paper, we have investigated the implications of an account-based central bank digital currency (CBDC), focusing on
its potential competition with the traditional maturity-transforming role of commercial banks, as in Diamond and Dybvig
(1983). The central bank cannot invest in long-term projects itself, but instead has to rely on the expert knowledge of
investment banks to do so. We have derived an equivalence result that shows that the set of allocations achieved with
private ﬁnancial intermediation will also be achieved with a CBDC, provided competition with commercial banks is allowed
and if consumers do not panic.
Nevertheless, our equivalence result has a sinister counterpart. If the competition from commercial banks is impaired
(for example, through some ﬁscal subsidization of central bank deposits), the central bank has to be careful in its choices
to avoid creating havoc with maturity transformation. Furthermore, we have shown that the rigidity of the central bank’s
contract with investment banks deters runs. In equilibrium, consumers internalize this feature and exclusively deposit with
the central bank such that the central bank arises as a deposit monopolist, attracting deposits away from the commercial
banking sector. But this monopoly power eliminates the forces that induce the central bank to deliver the socially optimal
amount of maturity transformation.
In closing, recall that the analysis in this paper has been entirely real: all contracts are denominated in real quantities.
We pursue the implications of a CBDC in a nominal setting and its inter-relations with more traditional monetary policy in
Schilling et al. (2020).
240

## Page 17

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

Appendix A. The commercial bank deposit contract
In this appendix, we derive the banking solution to the liquidity insurance problem, provided there are only commercial
banks and consumers behave according to their type. The optimal contract takes the form of a standard demand deposit
contract (i.e., a depositor can choose to withdraw from the bank either in period 1 or 2). Bertrand competition among the
banks forces them to maximize the expected utility of consumers subject to feasibility conditions. Formally, the private
banking arrangement solves:

max

( y ,c 1 ,c 2 )∈R3+

λu (c 1 ) + (1 − λ) u (c 2 )

subject to 0 ≤ y ≤ 1, λc 1 ≤ y, and (1 − λ) c 2 ≤ R (1 − y ) + y − λc 1 , where y is the fraction of deposits invested in the shortterm technology and the remainder 1 − y is invested in the long-term technology. With this contract, it is optimal for all
patient consumers to withdraw only in period 2, provided all other patient consumers do so, i.e., α = λ is an equilibrium.
This withdrawal behavior is also the ﬁrst-best solution to the social planning problem where the planner knows the type of
each agent. Because of the properties of the utility function, the banking allocation when patient consumers withdraw only
in period 2 is given by:

c 1∗ =
u



y∗

λ

y∗

λ

, c 2∗ =

= Ru 

R (1 − y ∗ )



,
1−λ
R (1 − y ∗ )
1−λ

(A.1)
.

(A.2)

This allocation coincides with the eﬃcient allocation derived in the planner’s problem. Thus, the private banking arrangement provides an eﬃcient way to insure against the idiosyncratic liquidity risk in the economy (i.e., the event of being an
early consumer).
It is well known in the literature that, since types are unobservable and unveriﬁable and consumers have access to the
storage technology, the previously described banking arrangement also features a bank run equilibrium, where α = 1. If we
assume that the bank is required to liquidate all of its assets to satisfy the demand of consumers, and if all consumers
withdraw, then, for c 1∗ > 1, the bank cannot serve all consumers. Since consumers know the potential of a liquidity squeeze
ex-ante, a self-fulﬁlling run can occur in equilibrium with late consumers withdrawing early and storing the good because
they believe others will withdraw early. Ennis and Keister (2009) refer to an economy that admits a bank run equilibrium
such as this one as an economy with a fragile banking system. Obviously, the bank run equilibrium is suboptimal compared
to the ﬁrst-best solution. While it is interesting to consider second-best planning problems for comparison, this is not the
purpose of this paper.
References
Adrian, T., Mancini-Griffoli, T., 2019. The rise of digital money. FinTech Notes 19/001, International Monetary Fund.
Agur, I., Ari, A., Dell’Ariccia, G., 2019. Designing central bank digital currencies. Working Paper 19/252, International Monetary Fund.
Allen, F., Gale, D., 1998. Optimal ﬁnancial crises. The Journal of Finance 53, 1245–1284.
Allen, F., Gale, D., 2009. Understanding Financial Crises, Clarendon Lectures in Finance. Oxford University Press.
Andolfatto, D., 2020. Assessing the impact of central bank digital currency on private banks. The Economic Journal. https://doi.org/10.1093/ej/ueaa073.
Barontini, C., Holden, H., 2019. Proceeding with caution - a survey on central bank digital currency. BIS Papers 101, Bank for International Settlements.
Barrdear, J., Kumhof, M., 2016. The macroeconomics of central bank issued digital currencies. Bank of England Working Paper 605. Bank of England.
Bartels, B., Eichengreen, B., Weder, B., 2016. No smoking gun: Private shareholders, governance rules and central bank ﬁnancial behavior. CEPR Discussion
Papers 11625, C.E.P.R. Discussion Papers.
Beniak, P., 2019. Central bank digital currency and monetary policy: a literature review. MPRA Paper 96663. University Library of Munich, Germany.
Berentsen, A., Schar, F., 2018. The case for central bank electronic money and the non-case for central bank cryptocurrencies. Review - Federal Reserve Bank
of St. Louis 100, 97–106.
Bindseil, U., 2019. Central Banking Before 1800: A Rehabilitation. Oxford University Press.
Bordo, M.D., Levin, A.T., 2017. Central bank digital currency and the future of monetary policy. Working Paper 23711. National Bureau of Economic Research.
Böser, F., Gersbach, H., 2019. A central bank digital currency in our monetary system? Mimeo, Center of Economic Research at ETH. Zurich.
Brunnermeier, M.K., James, H., Landau, J.-P., 2019. The digitalization of money. Working Paper 26300. National Bureau of Economic Research.
Brunnermeier, M.K., Niepelt, D., 2019. On the equivalence of private and public money. Journal of Monetary Economics 106, 27–41.
Carlsson, H., Van Damme, E., 1993. Global games and equilibrium selection. Econometrica, 989–1018.
Chari, V.V., Jagannathan, R., 1988. Banking panics, information, and rational expectations equilibrium. The Journal of Finance 43, 749–761.
Chiu, J., Davoodalhosseini, S.M.R., Jiang, J.H., Zhu, Y., 2019. Bank market power and central bank digital currency: Theory and quantitative assessment. Staff
working papers. Bank of Canada.
Cowen, D.J., 2000. The Origins and Economic Impact of the First Bank of the United States, 1791-1797. Garland Publishing.
Danezis, G., Meiklejohn, S., 2015. Centrally banked cryptocurrencies. CoRR. arXiv:1505.06895 [abs].
Dasgupta, A., 2004. Financial contagion through capital connections: a model of the origin and spread of bank panics. Journal of the European Economic
Association 2, 1049–1084.
Diamond, D.W., Dybvig, P.H., 1983. Bank runs, deposit insurance, and liquidity. Journal of Political Economy 91, 401–419.
Diamond, D.W., Rajan, R.G., 2001. Liquidity risk, liquidity creation, and ﬁnancial fragility: a theory of banking. Journal of Political Economy 109, 287–327.
Dyson, B., Hodgson, G., 2016. Digital cash: Why central banks should start issuing electronic money. Tech. Rep., Positive Money.
Ennis, H.M., Keister, T., 2009. Bank runs and institutions: the Perils of intervention. The American Economic Review 99, 1588–1607.
241

## Page 18

J. Fernández-Villaverde, D. Sanches, L. Schilling et al.

Review of Economic Dynamics 41 (2021) 225–242

Fernández-Villaverde, J., Garicano, L., Santos, T., 2013. Political credit cycles: the case of the eurozone. The Journal of Economic Perspectives 27, 145–166.
Friedman, M., Schwartz, A.J., 1986. Has government any role in money? Journal of Monetary Economics 17, 37–62.
Goldstein, I., Pauzner, A., 2005. Demand–deposit contracts and the probability of bank runs. The Journal of Finance 60, 1293–1327.
Jacklin, C.J., 1987. Demand deposits, trading restrictions, and risk sharing. In: Prescott, E.C., Wallace, N. (Eds.), Contractual Arrangements for Intertemporal
Trade. University of Minnesota Press, pp. 26–47.
Keister, T., Sanches, D.R., 2019. Should central banks issue digital currency? Working Paper 19-26. Federal Reserve Bank of Philadelphia.
Ketterer, J.A., Andrade, G., 2016. Digital central bank money and the unbundling of the banking function. Discussion Paper IDB-DP-449. Inter-America
Development Bank.
Knodell, J.E., 2017. The Second Bank of the United States: “Central” Banker in an Era of Nation Building, 1816-1836. Routledge.
Krahnke, T., 2020. Doing more with less: the catalytic function of IMF lending and the role of program size. Working Paper 18/2020. Deutsche Bundesbank.
Kynaston, D., 2017. Till Time’s Last Sand: A History of the Bank of England, 1694-2013. Bloomsbury Publishing.
Lee, C.M., Shleifer, A., Thaler, R.H., 1991. Investor sentiment and the closed-end fund puzzle. The Journal of Finance 46, 75–109.
Mancini-Griffoli, T., Peria, M.S.M., Agur, I., Ari, A., Kiff, J., Popescu, A., Rochon, C., 2018. Casting light on central bank digital currencies. IMF Staff Discussion
Notes 18/08, International Monetary Fund.
Martín-Aceña, P., 2017. The Banco de España, 1782-2017. The history of a central bank. Tech. Rep. 73. Banco de España.
Martín-Aceña, P., 2018. Money in Spain. New historical statistics. 1830-1998. Working Paper 1806. Banco de España.
Monnet, E., 2018. Controlling Credit: Central Banking and the Planned Economy in Postwar France, 1948-1973. Cambridge University Press.
Narayanan, A., Bonneau, J., Felten, E., Miller, A., Goldfeder, S., 2016. Bitcoin and Cryptocurrency Technologies. Princeton University Press.
Niepelt, D., 2020. Monetary Policy with reserves and CBDC: Optimality, equivalence, and politics. Tech. Rep. DP15457. CEPR.
Pennacchi, G., 2012. Narrow banking. Annual Review of Financial Economics 4, 141–159.
Remini, R.V., 2017. Andrew Jackson and the Bank War. W. W. Norton & Company.
Rogoff, K.S., 2014. Costs and beneﬁts to phasing out paper currency. Working Paper 20126. National Bureau of Economic Research.
Sargent, T.J., 2009. Dynamic Macroeconomic Theory. Harvard University Press.
Schilling, L., 2018. Optimal forbearance of bank resolution. Becker Friedman Institute for Research in Economics Working Paper.
Schilling, L., Fernández-Villaverde, J., Uhlig, H., 2020. Central Bank Digital Currency: when Price and Bank Stability Collide. Working Paper 28237. National
Bureau of Economic Research.
Tobin, J., 1987. The case for preserving regulatory distinctions. In: Proceedings - Economic Policy Symposium - Jackson Hole, pp. 167–205.
von Thadden, E.-L., 1998. Intermediated versus direct investment: optimal liquidity provision and dynamic incentive compatibility. Journal of Financial
Intermediation 7, 177–197.
von zur Gathen, J., 2015. CryptoSchool. Springer.
Wadsworth, A., 2018. The pros and cons of issuing a central bank digital currency. Reserve Bank of New Zealand Bulletin 81, 1–21.
Wallace, N., 1988. Another attempt to explain an illiquid banking system: the Diamond and Dybvig model with sequential service taken seriously. Quarterly
Review - Federal Reserve Bank of Minneapolis, 3–16.

242
