---
source_type: pdf
title: "The macroeconomics of central bank digital currencies"
original_file: "thesis/reference/The macroeconomics of central bank digital currencies.pdf"
sha256: "c5834a072ad70c45d3d1792057ec489d1418807dd4bcb1d3f3a940878d19b875"
page_count: 24
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: The macroeconomics of central bank digital currencies

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Journal of Economic Dynamics & Control 142 (2022) 104148

Contents lists available at ScienceDirect

Journal of Economic Dynamics & Control
journal homepage: www.elsevier.com/locate/jedc

The macroeconomics of central bank digital currencies
John Barrdear, Michael Kumhof∗
Bank of England, UK

a r t i c l e

i n f o

Article history:
Available online 15 May 2021
JEL classiﬁcation:
E41
E42
E44
E51
E52
E58
G21

a b s t r a c t
We study the macroeconomic consequences of issuing central bank digital currency (CBDC)
- a universally-accessible and interest-bearing central bank liability that competes with
bank deposits as medium of exchange. In a DSGE model calibrated to match the pre-2008
US, we ﬁnd that CBDC issuance of 30% of GDP, against government bonds, could permanently raise GDP by 3%, due to lower real interest rates, distortionary taxes, and monetary transaction costs. Countercyclical CBDC policy rules, as a second monetary policy tool,
could substantially improve the central bank’s ability to stabilise the business cycle. Risks
to banks can be minimized through appropriate issuance arrangements.
© 2021 Published by Elsevier B.V.

Keywords:
Central bank digital currency
Money creation
Money demand
Endogenous money
Banks
Financial intermediation
Bank lending
Distributed ledgers
Blockchain
Countercyclical policy
Seigniorage

1. Introduction
This paper studies the macroeconomic consequences of introducing a retail central bank digital currency (CBDC), in which
the central bank grants universal, electronic, 24x7, national-currency-denominated and interest-bearing access to its balance
sheet. CBDC, which could be issued through public spending, public lending or the purchase of eligible assets (excluding
bank deposits), would coexist alongside bank deposits as an alternative medium of exchange.
Any study of the consequences of adopting a CBDC faces the problem that there is essentially no historical experience
upon which to draw.1 There is therefore also very little empirical material that could help us to understand the costs and
beneﬁts of CBDC, or to evaluate the different ways in which monetary policy could be conducted under it. Our approach
therefore instead relies on constructing and simulating a New Keynesian DSGE model, calibrated to match the US economy
in the pre-2008 period, and extended to add features related to CBDC. The model, which was ﬁrst presented in Barrdear and
∗

Corresponding author.
A major reason for this is that the technology to make it feasible and resilient has until now not been available. Proof-of-concept and pilot programmes
are currently being explored in a handful of countries, including Sweden, China, Uruguay and the Bahamas (Kiff et al., 2020).
1

https://doi.org/10.1016/j.jedc.2021.104148
0165-1889/© 2021 Published by Elsevier B.V.

## Page 2

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

Kumhof, (2016), treats CBDC as an imperfect substitute for bank deposits, which are themselves created through loans or
asset purchases as in Jakab and Kumhof (2015, 2020). The model is detailed rather than stylized, both in order to make the
exercise credible for policymakers and in order to avoid prejudging what may be the most important economic mechanisms
that determine the effectiveness of a CBDC.
As a baseline, we consider a setting in which the central bank maintains a stock of CBDC equal to 30% of GDP in steady
state, backed by government debt, and potentially varied over the business cycle. Our choice of 30% is admittedly arbitrary.
We have chosen it because this is an amount loosely similar to the magnitudes of QE conducted by various central banks
since 2008, but we also comment on how different magnitudes would affect our results.2 We ﬁnd that this policy may have
a number of beneﬁcial effects.
First, it increases steady-state GDP by around 3%, through three channels: (i) a reduction in real interest rates, due to
a reduction in the quantity of defaultable debt and its replacement by non-defaultable low-interest CBDC;3 (ii) a reduction
in distortionary taxes as a result of a lower cost of government ﬁnancing; and (iii) a reduction in transaction costs due to
increased liquidity throughout the economy. A decomposition of the contributions and interactions of these three channels
is a key contribution of this paper.
Second, CBDC improves business cycle stabilization by granting policymakers access to a second policy instrument, the
quantity of or the interest rate on CBDC. The eﬃcacy of this instrument is higher when there is lower substitutability
between CBDC and bank deposits in facilitating payments, and when the economy is faced by signiﬁcant shocks to private
money demand or money supply. We are also able to show that the choice between a CBDC quantity and interest rate rule
is unlikely to have sizeable effects unless the substitutability between CBDC and bank deposits is extremely low. Studying
these issues is another important contribution of this paper.
Third, ﬁnancial stability considerations generally also favour the issuance of CBDC, provided that the issuance arrangements are well designed. Our paper discusses issuance arrangements when presenting the model’s speciﬁcation of monetary
policy. In our view, the only major concern is therefore the proper management of the operational diﬃculties and risks involved in transitioning to a different monetary and ﬁnancial regime.
Current electronic payment systems are tiered, with central banks at their centre. Private agents gain access by holding
claims on speciﬁc banks, with transaction settlement taking place in the balance sheets of banks that are higher up the
hierarchy. In order to preserve trust in the system, banks are regulated and subject to capital, leverage and liquidity requirements. Although necessary, these regulations are costly for banks and therefore for their customers. They also grant market
power to banks in the pricing of deposits, which serve as the economy’s primary transaction medium. A CBDC would strip
banks of their exclusive ‘gate keeper’ role by implementing Tobin (1987)’s proposal for “deposited currency accounts” at the
central bank, thereby offering an alternative means of access to the payment system.
The idea is motivated by the emergence of private digital currencies that offer both alternative units of account and
new payment systems, with claims of superiority over standard banking.4 The ﬁrst and most famous of these is Bitcoin
(Nakamoto (2008)), which operates without a central bank, instead maintaining a distributed ledger of transactions. Trust in
the system is maintained by requiring that proposed changes to the ledger be accompanied by a costly, cryptographic proof
of work.5 Ali et al. (2014a,b)) argued that it would be hypothetically possible to make use of distributed ledger technologies
to offer a payment system that transfers claims against a national central bank. In such a situation, the overall system would
remain centralized, but the operation of the ledger (transferring claims against the central bank) would be outsourced,
operating in an analogous fashion to the nodes of a cryptocurrency. Such operators would not have any market power in
the deposit market, as occurs at present with commercial banks.
In this paper, we abstract away from the technological particulars of how a CBDC payment system might operate.6 Instead we focus on the macroeconomic consequences of its introduction. We envisage an economy in which CBDC coexists
with bank deposits, credit provision remains the purview of existing banks and, crucially, banks remain the creators of the
marginal unit of money. We also abstract away from a lower bound on interest rates and from physical cash, the latter
due to its small size, its endogenous supply, and its different use case from electronic means of payment. Nevertheless, we

2
The steady-state stock of CBDC would need to be large enough to achieve economies of scale and, if an interest rate rule were used, to avoid problems
with a “quantity zero lower bound” in the conduct of countercyclical policies.
3
See Kumhof et al. (2020).
4
Fernández-Villaverde and Sanches (2019) explore the conditions under which multiple units of account could exist in stable currency competition.
5
Communication between participants of a decentralised digital currency system represents a cheap talk problem in the sense of Farrell (1987). Speciﬁcally, the construction and delivery of a message between computers is effectively costless on the margin, messages are non-binding as agents can drop out
of the network and freely re-enrol, and the validity of a transaction is not fully veriﬁable because without access to all copies of the ledger, nobody can be
sure that the transaction does not represent “double spending”. To address this problem, it is necessary to alter one of these three features, and it is in
this choice that different digital currencies may be distinguished.
6
We do note, however, that if a central bank were to select a distributed ledger system, they would likely elect a permissioned system that makes
messages binding rather than requiring a proof of work that makes them costly, since in networks with free entry this has proven to be very expensive.
The Cambridge Centre for Alternative Finance provides live estimates of the elecricity consumption of Bitcoin veriﬁcation nodes. At present, the network is
thought to require over 110 TWh of electricity per year, more than the entire consumption of the Netherlands. See https://cbeci.org/

2

## Page 3

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

emphasize that any issuance of CBDC need not be predicated on the withdrawal of banknotes from circulation. It would be
perfectly plausible for the two to operate in tandem alongside commercial bank deposits.7
Bank for International Settlements (2020), in a recent joint report with eight of the world’s leading central banks,8 sets
out the foundational principles and essential features of any CBDC. They emphasize that a potential CBDC must (i) “do no
harm” to existing mandates for monetary and ﬁnancial stability, (ii) coexist with existing forms of money (cash, reserves and
bank deposits), and (iii) promote innovation and eﬃciency within the payment system. The paper then identiﬁes several
features of CBDC that would be necessary to satisfy these criteria. The variant of CBDC that we consider in this paper
satisﬁes all of these criteria.
The rest of the paper is organized as follows. Section 2 discusses the literature on CBDC. Section 3 introduces the theoretical model, and Section 4 discusses its calibration. Section 5 presents simulation results, and discusses policy lessons.
Section 6 concludes.
2. Literature review
A sizeable new literature has emerged on the topic of CBDC, to the extent that a comprehensive survey would ﬁll an
article in itself.9 Nevertheless, the bulk of work to date has been qualitative in nature10 , and relatively few attempts have
been made to examine CBDC in a formal model.
Among those that do study CBDC formally, one critical assumption concerns the sources of demand for money.
In our own model we adopt a transaction cost speciﬁcation as in Schmitt-Grohé and Uribe, 2004. A number of
other theoretical papers examine CBDC in the New Monetarist framework of Lagos and Wright (2005). Among these,
Davoodalhosseini (2018) and Williamson (2019) examine the interaction with physical currency in some detail (a topic that
we abstract away from). Keister and Sanches (2019) consider the new entrant competing against both cash and bank deposits. They ﬁnd that so long as CBDC is interest-bearing (possibly with a negative rate) and that interest rate is chosen
appropriately (a function of the degree of ﬁnancial development of the economy), its introduction never lowers welfare
and often increases it. When CBDC is non-remunerated (thus being simply a digital form of cash), however, it is typically
welfare-reducing.
Chiu et al. (2020) also use a New Monetarist model, introducing a bank reserve requirement channel of monetary transmission Bernanke and Blinder (1988). They suppose a ﬁnite number of banks that engage in Cournot competition for deposits and are fully competitive in the market for loans. The introduction of a CBDC provides an outside option to depositors
and, hence, a lower bound on deposit rates. When the reserve requirement is binding, the net effect is to increase deposits
and lower the loan rate, thus increasing lending and raising output. Importantly, these beneﬁts accrue even if the adoption
of CBDC is near zero, so long as it remains a credible outside option that imposes a ﬂoor on deposit rates. When calibrating
an annual variant of their model to US data, they ﬁnd that the introduction of CBDC would raise output by roughly 0.5%.
Andolfatto (2018) examines CBDC in an OLG framework with a Monti-Klein model of market power for banks. In his
model, the introduction of CBDC raises competition for bank deposits and so raises the interest rate offered on them. This
is not passed on to lending rates, however, since the rate paid on reserves is the relevant marginal cost of funds,11 so that
lending activity is not reduced and, instead, banks’ monopoly proﬁts are reduced.
The above papers share two features that distinguish them from ours. First, they only consider steady state and not dynamic implications of introducing CBDC. Second, their steady state analysis focuses mainly on the implications of increased
liquidity and of competition for deposits. Our paper broadly shares their qualitative conclusions, despite many differences in
the detailed assumptions. But it goes further in two regards, by examining several additional steady-state effects and their
interactions, and by considering the behavior of the economy in a stochastic environment.
An important recent contribution to the literature is Ferrari et al. (2020), who like us consider a dynamic and stochastic
environment, albeit without studying steady-state implications. They examine monetary transmission in a two-country, open
economy model with a domestic CBDC that can be used as a means of payment in the foreign economy (an issue that would
perhaps apply more to wholesale than to retail payments).12 Their model exhibits a number of signiﬁcant differences to our
framework. In particular, credit is physical and exclusively funds capital investment, with banks effectively functioning as
shareholders. Bank deposits are treated as term deposits with no ability to be used as a medium of exchange, for which
cash balances, held outside the banking system, are used. The paper therefore abstracts entirely away from any competition
between CBDC and deposits in the market for liquidity services. Within this setup, they show that the introduction of CBDC
would introduce a new no-arbitrage condition between the foreign and the CBDC interest rates (with a wedge for expected

7
Also, if a CBDC were operated as an account rather than an anonymous token, then physical cash may retain some appeal as a means of preserving
privacy.
8
The Bank of Canada, European Central Bank, Bank of Japan, Sveriges Riksbank, Swiss National Bank, Bank of England and Board of Governors of the
Federal Reserve System.
9
Kiff et al. (2020) provide a recent survey.
10
For example, Bordo and Levin (2017) conclude that an interest-bearing CBDC would improve the achievement of ‘true price stability.’
11
This assumes that the central bank is prepared to lend willingly at the announced policy rate (i.e. that the central bank operates a ﬂoor system). If a
corridor system is used, the higher of the penalty borrowing rate and the CBDC rate (which pins down deposit rates) would be the marginal cost of funds.
12
In a similar vein, George et al. (2020) use a simpliﬁed small open economy variant of an early version of our own model.

3

## Page 4

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

exchange rate movements). This increases the volatility of the exchange rate in response to shocks unless the interest rate on
CBDC is set ﬂexibly and separately to the main policy rate. They further note that the adoption of CBDC that may circulate
abroad decreases the autonomy of the foreign economy, suggesting a possible ﬁrst-mover advantage.
One area that we do not speciﬁcally model is the potential impact of a CBDC on the risk of bank runs. Some recent work
has examined this topic. Schilling et al. (2020) examine a variant of the Diamond and Dybvig (1983) model of bank runs
in which contracts are nominal rather than real. Abstracting away from competition between CBDC and bank deposits, they
assume that by offering CBDC, the central bank becomes the monopolistic supplier of demand deposits.13 When rationing (a
classic bank run) would otherwise occur, the central bank can avoid it through the issuance of additional CBDC. This would
involve the setting aside of price stability, however, thus implying the presence of a trilemma: the central bank may only
achieve two of (i) allocative eﬃciency; (ii) (complete) ﬁnancial stability; and (iii) (complete) price stability.14
Other commentators have worried that the introduction of a CBDC, by providing a credible outside option to deposits,
could worsen the risk of bank runs. In that regard Brunnermeier and Niepelt (2019) establish conditions under which equilibrium allocations and prices are not changed by a switch of agents between public and private monies. Their result implies
that a switch from deposits to CBDC need not have any effect on the real economy or inﬂation if the deposits are replaced
by funding from the central bank.15 It should however be noted that this would effectively represent a systemic and potentially very large bank run that could prove very problematic under real-world conditions. In our own model we assume that
the central bank only issues CBDC against government debt and not against bank deposits. Under such a regime a systemwide run on deposits would be technically impossible, because in a run only the identity of the holders of deposits would
change while their aggregate quantity would not. The run would be from government debt, not from bank deposits.

3. The model
The model economy consists of households, ﬁnancial investors, unions, banks, and a government. Rigidities include sticky
nominal prices and wages, habit persistence in consumption, and investment adjustment costs. The model of banking is
based on Benes and Kumhof (2012) and Jakab and Kumhof (2015, 2020). Banks make four types of loans to households,
against several different types of asset stock and income ﬂow collateral. To fund new loans, they create new deposits for
households that are used by the latter to reduce four different types of transactions costs. The model and its calibration are
fairly detailed, in order to provide an integrated framework where many of the differences between economies with and
without CBDC emerge simultaneously, without prejudging which of them are or are not important.
Two types of private agents interact directly with banks. Financial investors, whose share in the population  = 0.05 is
small, consume and supply labour. Their main role is to generate an arbitrage condition between bank deposits and government debt.16 Households, whose share in the population 1 −  = 0.95 is large, consume, supply labour, and produce goods
and physical capital. They hold physical capital and land, and they borrow from banks in order to have banks create deposits
for them. Our model of banking represents an extension of traditional Sidrauski-Brock (SB) monetary models Brock (1975);
Sidrauski (1967). In these models retail money (money that is used in the real economy) is valued because a representative
household is subject to a transaction cost technology or an equivalent friction. But more problematically, all retail money in
SB models is exogenously supplied by the central bank, while in actual monetary systems the only type of central bank retail money is cash, whose supply endogenously responds to demand, with a stock that only accounts for around 4% of broad
monetary aggregates.17 We argue that, for a satisfactory assessment of the introduction of CBDC as a new type of electronic
money, a realistic model of the ﬁnancial system into which it would be introduced, including the use of bank deposits as
the main alternative form of electronic money, and their creation through loans, is critical. We therefore focus on modeling
the endogenous determination of the other 96% of broad monetary aggregates, with their equilibrium quantities determined
by the interaction of the proﬁt and utility maximization objectives of banks and their customers. Cash (and also reserves)
on the other hand is omitted altogether, not only due to its small size and endogenous supply, but also because cash is not
an electronic money and should therefore have, and continue to have, a different use case from bank deposits and CBDC.18
In this model, the representative household assumption of the SB model, with a single household optimally both borrowing
from and depositing in banks, turns out to be very convenient.19 Optimality occurs at the point where the beneﬁts due to
marginal transaction cost savings are equal to the costs due to the spread between loan and deposit rates.

13

They argue that this may occur when private banks are unable to fully commit.
The central bank only provides additional CBDC off the equilibrium path, but the prospect must be credible in order to ensure that it does not occur.
15
Brunnermeier and Niepelt (2019) also speculate that such an arrangement could reduce run risk if the central bank, as a large depositor, internalised
the run externalities, thus reducing incentives for small depositors to run.
16
An alternative is to assume monopolistic competition in deposit issuance, as in Jakab and Kumhof (2020), with banks as the sole holders of government
debt. The advantage of our setup is that it endogenizes movements in the spread between the policy and deposit rates, which play a role in our simulations.
17
Reserves are not retail money. Furthermore, their quantity is also endogenous away from the zero lower bound, while it does not directly determine
the quantity of retail bank deposits at the zero lower bound.
18
In modelling terms, this would suggest that if cash were to be introduced, it could be separable from electronic forms of money, with a small weight
in the transactions costs technology, and passively supplied by the central bank in response to demand.
19
However, as shown in Kumhof and Wang (2020) this is not the only way in which the money-creation and payment system roles of banks can be
modelled.
14

4

## Page 5

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

The economy’s constant technology growth rate is x = Tt /Tt−1 , where Tt is labor augmenting technology. When the
model’s nominal and real variables, say Vt and vt , are expressed in real normalized terms, we divide by technology Tt and,
for nominal variables, by the price level Pt . We use the notation v̌t = Vt /(Tt Pt ) = vt /Tt , with the steady state of v̌t denoted
by v̄.
3.1. Banks
The banking sector is divided into two subsectors. Retail lending banks maximize proﬁts by optimally choosing the terms
of retail loan contracts. Wholesale banks maximize overall bank net worth by optimally choosing the terms of deposit
contracts and of wholesale loan contracts, taking as given retail lending proﬁts. Equilibrium lending and deposit rates and
equilibrium levels of loans and deposits are determined by the simultaneous solutions of banks’, households’ and ﬁnancial
investors’ optimization problems.
3.1.1. Bank balance sheets
Bank loans to households comprise consumer loans (superscript c) that are secured on labour income and monetary
transaction balances, mortgage loans (superscript a) that are secured on land and monetary transaction balances, working
capital loans (superscript y) that are secured on sales revenue and monetary transaction balances, and investment loans
(superscript k) that are secured on physical capital and monetary transaction balances. In each case monetary transaction
balances include bank deposits and, under a CBDC regime, CBDC.
Bank deposits are modelled as a single homogenous asset type with a one-period maturity. In our calibration this corresponds to all non-equity items on the liability side of the consolidated ﬁnancial system’s balance sheet, all of which are
interpreted as monetary balances whose marginal liquidity services decrease with their quantity. Reﬁnements of the model
that break homogenous deposits into different deposit types are feasible and interesting, but are not essential for the study
of CBDC. While all bank deposits are identical from the point of view of banks, their customers use deposits for distinct
purposes, namely ﬁnancial investor deposits (superscript u = ﬁnancially unconstrained) that enter ﬁnancial investors’ utility
function, consumption deposits (superscript c) that reduce consumption-related transaction costs, real estate deposits (superscript a) that reduce real estate transaction costs, working capital deposits (superscript y) that reduce transaction costs
related to producers’ payments to their suppliers, and investment deposits (superscript k) that reduce physical investmentrelated transaction costs.
Banks maintain positive net worth because the government imposes minimum capital adequacy requirements (MCAR).
These regulations are modelled on the current Basel regime, by requiring banks to pay penalties if they violate the MCAR.20
Banks’ total net worth exceeds MCAR in equilibrium, in order to provide a precautionary buffer against adverse shocks that
could cause net worth to drop below MCAR and trigger penalties.
Wholesale banks face heterogeneous realizations of non-credit risks, and are therefore indexed by i. Nominal and
real per capita loan stocks between periods t and t + 1 are Ltx (i ) and tx (i ), x ∈ {c, a, y, k}, deposit stocks are Dtx (i ) and
dtx (i ), x ∈ {c, a, y, k, u}, and bank net worth is Ntb (i ) and ntb (i ). For future reference, CBDC stocks are M_t^x\left(i\right) and
m_t^x\left(i\right).Nominal and ex-post real gross policy rates and CBDC interest rates are denoted by it /im,t and rt /rm,t ,
where rt = it−1 /πt , rm,t = im,t−1 /πt , πt = Pt /Pt−1 , and Pt is the consumer price index. We denote the ex-post return on nominal cash ﬂows between periods t − 1 and t by rn,t = 1/πt . Wholesale banks’ gross deposit rates are id,t and rd,t . Their gross
wholesale lending rates, which are at a premium over deposit rates because of a combination of the liquidity services of
x , x ∈ c, a, y, k . Retail lending banks’ gross retail lending rates, which add
deposits and the costs of regulation, are ix,t and r,t
{
}
x .
a credit risk spread to wholesale rates, are ixr,t and rr,t
We denote total loans by t (i ) = x∈{c,a,y,k} txx (i ), where txx (i ) = (1 −  )tx (i ). Each individual wholesale and retail bank
is assumed to hold a fully diversiﬁed portfolio of loans, with its share in loans to an individual borrower equal to its share in
aggregate loans. Total deposits are denoted by dt (i ) =  dtu (i ) + (1 −  )x∈{c,a,y,k} dtx (i ). Bank i’s balance sheet in real terms
is given by

t (i ) = dt (i ) + ntb (i ) .

(1)

3.1.2. Wholesale banks - macroeconomic risk and prudential regulation
Banks face pecuniary costs of falling short of oﬃcial MCAR. In any given period, a bank either remains suﬃciently well
capitalized, or it falls short of MCAR and must pay a penalty that reduces net worth further. Banks optimize taking account
of the expected cost of such an event. We assume a continuum of banks, each of which is exposed to idiosyncratic shocks
that represent differing success at raising non-interest income and minimizing non-interest expenses, where the sum of
these over all banks equals zero. As a result there is a continuum of ex-post capital adequacy ratios across banks, and a
time-varying small fraction of banks that have to pay penalties in each period. Speciﬁcally, banks’ return on their loan book



b
b ) = 1 and V ar (ln (ω b )) = σ b
is subject to an idiosyncratic shock ωt+1
that is lognormally distributed, with E (ωt+1
t+1

2

, and

b
b
b ) and Fb
b ).
with the density function and cumulative density function of ωt+1
denoted by ft+1
= ftb (ωt+1
= Ftb (ωt+1
t+1

20
Furﬁne (2001) and Van den Heuvel (2005) contain a list of such penalties, according to the Basel rules or to national legislation, such as the U.S. Federal
Deposit Insurance Corporation Improvement Act of 1991.

5

## Page 6

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

The regulatory framework stipulates that banks must pay a real penalty of χπt+1 t (i ) at time t + 1 if the sum of the
gross returns on their loan book, net of gross interest expenses on deposits, and net of realized retail loan losses Ltb (i ) that
are received in lump-sum fashion from retail lending banks, is less than a fraction ϒ of the gross risk-weighted returns on
their loan book:
x
b
b
x
b
x∈{c,a,y,k} r,t+1
txx (i )ωt+1
− rd,t+1 dt (i ) − Lt+1
(i ) < ϒx∈{c,a,y,k} r,t+1
ζ x txx (i )ωt+1
.

(2)

Due to our assumptions about portfolio diversiﬁcation, each bank’s share in aggregate retail loan losses is proportional to
its share in aggregate loans. Different Basel risk-weights ζ x are one of the determinants of equilibrium interest rate spreads.
Because the left-hand side of (2) equals pre-dividend (and pre-penalty) net worth, while the term multiplying ϒ equals
the value of risk-weighted assets, ϒ represents the minimum capital adequacy ratio of the Basel regulatory framework. We
denote the realized (ex-post) cutoff idiosyncratic shock to loan returns below which the MCAR is breached by ω̄tb .
Banks choose their loan volumes to maximize their expected pre-dividend net worth, which equals gross returns on the
loan book minus the sum of gross interest expenses on deposits, retail loan losses, and penalties:
txx ,



Max

x∈{c,a,y,k}



x
b
b
b
Et x∈{c,a,y,k} r,t+1
txx (i )ωt+1
− rd,t+1 dt (i ) − Lt+1
(i ) − χ t (i )Ftb (ω̄t+1
) .

(3)

x
This yields four optimality conditions. Because each bank faces the same expectations for future returns r,t+1
and rd,t+1 , and
b
b , aggregation of the model over banks is straightforthe same risk environment characterized by the functions ft+1
and Ft+1
ward because loans, deposits and loan losses are proportional to the bank’s level of net worth. Indices i can therefore be
dropped. For the example of consumer loans:



c
b
0 = Et r,t+1
− rd,t+1 − χ Ft+1

b
−χ ft+1

⎫
x
⎪
txx
  r
c
c
x
c
c
⎬
d,t+1 r,t+1 (1 − ζ ϒ ) + rd,t+1 x∈{a,y,k} b r,t+1 (1 − ζ ϒ ) − r,t+1 (1 − ζ ϒ )
t

nt

ntb

t
x
x∈{a,y,k} (1 − ζ x ϒ )r,t+1
nb

xx

⎪
⎭

2

(4)

.

t

Condition (4) states that banks’ wholesale lending rate ic,t

is at a premium over the deposit rate id,t . The magnitude of
this spread depends on a combination of, on the liability side, the liquidity beneﬁts of deposits, and on the asset side, the
costs of regulation. The latter is determined by the size of the MCAR ϒ, the penalty coeﬃcient χ for breaching the MCAR,
b
b
and expressions ft+1
and Ft+1
that reﬂect the expected riskiness of banks and therefore the likelihood of a breach of the
MCAR. Banks’ retail lending rate icr,t , on the other hand, whose determination is discussed below, is at another premium
over ic,t , to compensate banks for the bankruptcy risks of their borrowers. The correct interpretation of the wholesale rate
is therefore as the rate that a bank would charge to a hypothetical borrower (not present in the model) with zero default
risk.
Note that the policy rate it does not enter these optimality conditions, because the marginal cost of banks’ funds is
given by the rate id,t at which banks can create their own funds.21 Over the business cycle, ﬁnancial investor arbitrage will
ensure that the deposit rate spread it − id,t remains nearly constant. However, during the transition to a CBDC regime, which
involves substantial changes in the government debt-to-GDP ratio, this spread can experience more sizeable changes.
In the model the acquisition of fresh capital by banks is subject to market imperfections. This is a necessary condition for
capital adequacy regulations to have non-trivial effects. We use the “extended family” approach of Gertler and Karadi (2011),
whereby bankers transfer a ﬁxed share δ b of their accumulated net worth ntb to households and ﬁnancial investors in each
period - see the Appendix for a complete discussion. Banks’ aggregate net worth ntb represents an additional state variable
of the model. It equals the difference between the gross return on loans and the sum of gross interest expenses on deposits,
 Fb , and dividends.
loan losses, ex-post penalties Mtb = χ t−1
t
3.2. Households
3.2.1. Optimization problem
Households have unit mass and are indexed by j. Household per capita consumption ctc ( j ) and hours htc ( j ) are identiﬁed
by a superscript c, to denote that households are ﬁnancially constrained. Household utility at time t depends on an external
c , where cc
consumption habit ctc ( j ) − ν ct−1
is lagged average per capita consumption, and where consumption is a Dixitt−1
Stiglitz CES aggregate over varieties, with elasticity of substitution θ p . Utility also depends on hours htc ( j ) and land at ( j ).
Lifetime utility, with discount factor βc , habit persistence v and labour supply elasticity η, is

Max

E0

∞

t=0



β

t
c

v

(1 − )
x



1

( ( j) − v

log ctc

c
ct−1

) − ψh

htc ( j )1+ η
1 + η1

+ ψa log(at ( j ))

.

(5)

21
The policy rate would represent the marginal cost of funds if banks were able to appropriate the funding cost advantage of deposits due to market
power. See Jakab and Kumhof (2020).

6

## Page 7

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148





Household income comprises real labour income wthh htc ( j ) 1 − τL,t , where wthh is the real wage paid to households by
unions and τL,t is the labour income tax rate, and real lump-sum income ιt /(1 −  ), where t is aggregate real lump-sum
income, ι is the share of this income received by households, with each household receiving an equal per capita share. t is
in turn given by the sum of bank dividends, union proﬁts tu , the lump-sum transfer share22 1 − r of monitoring costs Mt
and of monetary transaction costs Tt , and government lump-sum transfers tr ft minus lump-sum taxes τtls lst . Households
invest in land at ( j ), which has a real price of pat and a real return of reta,t = pat /pat−1 , and in capital kt ( j ), which has a real







market price of qt (Tobin’s q) and a real return of retk,t = rk,t + (1 − )qt − τk,t rk,t − qt /qt−1 , where rk,t is the user
cost of capital,  is the capital depreciation rate, and τk,t is the capital income tax rate. The empirical literature discussed
in Section 4 has found that US equilibrium real interest rates exhibit a small but positive elasticity with respect to the level
of government debt. The model replicates this by assuming that households face ﬁnancial asset holding costs23





rat
Cxf,t ( j ) = (dtx ( j ) + mtx ( j ) )φb brat
,
t − b̄ss

(6)

rat
where brat
t = Bt / (4GDPt ) = bt / (4gdpt ) is the government debt-to-GDP ratio, and b̄ss is the corresponding steady state value.
This cost is treated as exogenous by households, and is rebated back to households as part of lump-sum transfers tc ( j ).
The budgetary effect is therefore neutral, while marginal conditions are affected. Interest rates on all ﬁnancial assets are
assumed to be affected in an identical fashion, so that a change in the government debt-to-GDP ratio, ceteris paribus, will
affect the level of interest rates but not the structure of spreads.
Households borrow against one sector-speciﬁc form of real collateral, and one or two forms of ﬁnancial collateral, in
each of the four sectors x ∈ {c, a, y, k}. Banks lend against fractions κ x of collateral. We will refer to these fractions as
willingness-to-lend coeﬃcients. The lending contract (see below) speciﬁes that banks in period t + 1 receive a fraction
x,t+1 , x ∈ {c, a, y, k}, of the value of collateral, where x,t+1 covers both the expected interest on performing loans and
the expected residual value, after monitoring costs, of defaulting loans.
Household money demand is due to a Schmitt-Grohé and Uribe, 2004 monetary transaction cost stx (vtx ( j )) = Stmd Ax vtx ( j ) +

Bx /vtx ( j ) − 2(Ax Bx )1/2 , vtx ( j ) = etx / ftx , stx > 0, x ∈ {c, a, y, k} that are increasing in real effective expenditures (or asset holdings)
x
et and decreasing in real transaction balances ftx , where the latter include bank deposits and (after the transition) CBDC.
We will refer to ftx ( j ) as the liquidity generating function (LGF). Real effective expenditures etx equal etc = ctc ( j )(1 + τc,t ) for
y
pr
consumption (after taxes τc,t ), eta = pat at ( j ) for real estate, et = (wt hth ( j ) + rk,t Kt−1 ( j )) for production inputs, and etk = It ( j )
y
pr
for investment. In et , wt is the real wage charged to producers by unions, and hth ( j ) = ht ( j )/(1 −  ) and Kt−1 ( j ) are per
capita labour and capital inputs. An increase in Stmd can be thought of as a contractionary ﬂight to safety shock that leads
to a combination of a lower velocity of circulation and a lower level of transactions. Aggregate monetary transaction costs
are denoted by Tt .
As in Schmitt-Grohé and Uribe, 2004, each household is the monopolistic producer of one variety of intermediate goods, and as such maximizes the difference between sales revenue and costs, where
the former equals

−θ
pr
y
Pt ( j )yt ( j ) = Pt ( j )yt (Pt ( j )/Pt ) p , and the latter consist of real wage payments wt hth ( j ) 1 + st ( j ) , real payments to capi-









tal rk,t Kt−1 ( j ) 1 + st ( j ) , and quadratic inﬂation rate adjustment costs Cxp,t ( j ) = φ p /2 yt (πt ( j )/πt−1 − 1 ) . Each household
also produces capital goods, with proﬁts equal to the difference between the
 market value of new investment goods Qt It ( j )
and the sum of the effective purchase price of new investment goods Pt It ( j ) 1 + stk ( j ) and quadratic investment adjustment
y

2

costs CxI,t ( j ) = (φI /2 )It ( ( (It ( j )/x )/It−1 ( j ) ) − 1 ) . Finally, capital accumulation is given by kt ( j ) = (1 − )kt−1 ( j ) + It ( j ). The
representative household maximizes (5) subject to his budget constraint (see the Appendix), the capital accumulation equation, and retail lending banks’ zero proﬁt conditions derived in the next subsection.
2

3.2.2. Retail lending banks - borrower risk and participation constraint
Household j at time t chooses an optimal combination of real bank loans tx ( j ) in order to obtain an optimal combination
of real bank deposits dtx ( j ), x ∈ {c, a, y, k}. The time t pledged collateral ctx ( j ) that is used to secure these loans consists, in
each case, of a combination of pledged real and ﬁnancial collateral:





ctc ( j ) = κ c rn,t+1 4wthh htc ( j )(1 − τL,t ) + κ c rd,t+1 dtc ( j ) + rm,t+1 mtc ( j ) ,
cta

( j) = κ

cty

( j ) = κ rn,t+1 4yt (Pt ( j )/Pt )

a

reta,t+1 pat at

+κ

( j)

y

ctk ( j ) = κ k retk,t+1 qt kt ( j )

a



rd,t+1 dta

( j)



(7)

( j) ,


( j ) + rm,t+1 mty ( j ) ,


+ κ k rd,t+1 dtk ( j ) + rm,t+1 mtk ( j ) .

1 −θ p

+κ

y



+ rm,t+1 mta

rd,t+1 dty

Following Bernanke et al. (1999), at the beginning of t + 1 each borrower j draws an idiosyncratic shock that changes
x cx ( j ), where ω x
ctx ( j ) to ωt+1
is a unit mean lognormal random variable distributed independently over time and across
t
t+1
x ), Sz σ x is the risk shock of Christiano et al. (2014). It has a time-varying
borrowers. The standard deviation of ln(ωt+1
t+1
22

The share r is a real resource cost and therefore enters the goods market clearing condition.
This assumption is commonly used in the open economy literature with incomplete asset markets (Schmitt-Grohé and Uribe, 2003); Neumeyer and
Perri (2005). In the closed economy literature, Heaton and Lucas (1996) have used the same device.
23

7

## Page 8

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

z
component St+1
that is common across all loan categories, and a type-speciﬁc and constant component σ x . The density
x
x
x ) and Fx
x ).
function and cumulative density function of ωt+1
are ft+1
= ftx (ωt+1
= Ftx (ωt+1
t+1
We assume that each borrower receives a standard debt contract from the bank. This speciﬁes a nominal loan amount
Ltx ( j ), the percentage of collateral value against which the bank is willing to lend κ x , and a gross nominal retail rate of
x
interest ixr,t to be paid if ωt+1
is suﬃciently high to avoid default. We will refer to the differences between the retail and
wholesale lending rates ixr,t − ix,t as retail lending spreads, to be distinguished from the wholesale lending spreads ix,t − id,t .
The interest rate ixr,t is assumed to be pre-committed in period t, rather than being determined in period t + 1 after the
realization of time t + 1 aggregate shocks, as in Bernanke et al. (1999).24 Under our debt contract banks make zero expected
proﬁts, but realized ex-post proﬁts generally differ from zero. MCAR protect depositors from the possibility of large losses,
so that in equilibrium bank default risk is inﬁnitesimally close to zero.
x
x
Bank borrowers who draw ωt+1
below a cutoff level ω̄t+1
cannot pay the contractual interest rate ixr,t and enter
bankruptcy. They must hand over the pledged portion of their assets or income ﬂows to the bank, but the bank can only
recover a fraction (1 − ξ x ) of the collateral value of such borrowers. The remaining fraction represents monitoring costs.
Banks’ ex-ante zero proﬁt condition for borrower group x equates wholesale interest charges to the sum of the contracx
x , and the
tual retail interest income on loans to borrowers whose idiosyncratic shock exceeds the cutoff level, ωt+1
≥ ω̄t+1
x
x
amount collected in case of borrower bankruptcy, where ωt+1 < ω̄t+1 . The ex-post cutoff productivity level is determined by
x x ( j ) to the gross return on
equating, at ωtx = ω̄tx , the gross interest charges due in the event of continuing operations rr,t
t−1
x
x
x
x
x
x ≡ F x ( ω x ), 
the part of the borrower’s assets that is pledged as collateral, ct−1 ( j )ω̄t . We deﬁne ft+1 ≡ ft (ωt+1
), Ft+1
t
x,t+1
t+1
x
as the bank’s gross share in the value of collateral, and ξ Gx,t+1 as the proportion of collateral value that the lender has to
spend on monitoring costs. Then the zero proﬁt condition can be written as

Et {ctx ( j )(x,t+1 − ξ x Gx,t+1 ) − r x ,t+1 tx ( j )} = 0,

(8)

Because each borrower in sector x faces the same expectations of future returns and the same risk environment, aggregation
is trivial, and borrower-speciﬁc indices j can henceforth be dropped.
3.2.3. Optimality conditions
The optimality conditions for aggregate consumption, investment, labor input, and capital input are standard except that
in each case the effective purchase price exceeds the direct purchase price by a mark-up due to monetary transactions
costs. There is an equivalence between distortionary ﬁscal tax rates and these mark-ups, which will therefore be referred to
as liquidity tax rates:


iq
τx,t
= 1 + stx + stx vtx .

(9)

The quantitatively most important equivalences are between consumption liquidity tax rates and consumption (or labor
income) ﬁscal tax rates, where the steady state effective price of consumption equals (1 + τ̄c ) 1 + τ̄c

liq

, and between capital

liquidity tax rates and capital income tax rates, where the return to capital (under the simplifying assumption that  = 0)
equals ret k = 1 + r̄k (1 − τ̄k )/ 1 + τ̄k

liq

.25 The distortion in the case of liquidity taxes is a shortage of liquidity relative to the

Friedman rule, a shortage that can never be completely eliminated because the cost of creating bank deposits can never go
to zero.
The optimality condition for loans is identical for all four loan categories x ∈ {c, a, y, k},

λ̌tc =

βc  c x ˜ x 
Et λ̌t+1 r,t+1 λt+1 ,

(10)

x



ω
x .
˜ x = ω / ω
where λ
− ξ x Gω
, and x,t+1
and Gω
are the derivatives of x,t+1 and Gx,t+1 with respect to ω̄t+1
t+1
x,t+1
x,t+1
x,t+1
x,t+1
The optimality condition for capital is

λ̌tc =





βc  c
˜ k κ k k,t+1 − ξ k Gk,t+1
Et λ̌t+1 retk,t+1 1 − κ k k,t+1 + λ
,
t+1
x

(11)

which can be combined with (10) to yield a condition for the optimal loan contract that for κ k = 1 is identical to
Bernanke et al. (1999). For land there are two differences to (11) that are due to the presence of land in the utility function
and in one of the four transaction cost technologies. The standard optimality condition for goods prices (Phillips curve) is
modiﬁed by a term that relates to the use of sales revenue as ﬂow collateral for working capital loans, while the standard
optimality condition for hours worked is modiﬁed by a term that relates to the use of after-tax labour income as ﬂow collateral for consumer loans. The optimality conditions for deposits and, if applicable, CBDC, are modiﬁed by terms that relate
to the presence of these assets in monetary transaction costs, collateral constraints, and the ﬁnancial asset holding costs
Cxf,t ( j ).
24
k
, the borrower offers a (state-contingent) non-default payment that guarantees
In Bernanke et al. (1999): “... conditional on the ex-post realization of Rt+1
the lender a return equal in expected value to the riskless rate.”
25
Because these are the most important liquidity taxes in our model, our ﬁgures will report their average as “Average Liquidity Tax Rate”.

8

## Page 9

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

x x
Banks’ real ex-post loan losses in sector x, which correspond to gains for their borrowers, are given by Ltx = r,t
−
t−1

x , with Lb = 1 −  
(x,t − ξ x Gx,t )ct−1
(
) x∈{c,a,y,k} Ltx . Losses are positive if a larger than anticipated number of borrowers det

faults, so that ex-post banks ﬁnd that they have set their pre-committed retail loan rate at an insuﬃcient level to compenx . Total ex-post
sate for lending losses. Banks’ real aggregate ex-post monitoring costs in sector x are given by Mtx = ξ x Gx,t ct−1
monitoring costs Mt , which also include default penalties on banks Mtb , therefore equal Mt = (1 −  )x∈{c,a,y,k} Mtx + Mtb .

3.2.4. Liquidity generating functions
In this paper, in order to study different aspects of CBDC, we make use of three different model variants that differ in
their speciﬁcation of the LGF ftx ( j ). The ﬁrst and second model variants are used to study the transition from the pre-CBDC
economy to a CBDC economy, while the third variant is used to study the business cycle properties of an economy that has
fully transitioned to a CBDC regime.
The ﬁrst model variant, in which only bank deposits enter the LGF, is used to determine the pre-CBDC initial conditions
for a simulation of the transition to the CBDC regime. In real normalized form, we have

 θ

fˇtx = dˇtx

,

(12)

where θ is equal across all four sectors. In the second model variant bank deposits and CBDC jointly generate liquidity
through an additively separable LGF, with the same θ ,

 θ

fˇtx = dˇtx



+  T f intec m̌tx

θ

,

(13)

where  will normally be set equal to 1 except during our sensitivity analysis. Additive separability is critical for the simulations of the transition from the pre-CBDC economy to the CBDC regime, which needs to account for the fact that the
transition starts at a zero stock of CBDC.
The coeﬃcient T f intec , if calibrated to be greater than one (and with  = 1), quantiﬁes the extent to which a unit of CBDC
is more productive at generating monetary transactions services than a unit of bank deposits. The literature has identiﬁed
various reasons why this may indeed be the case, such as the potential for using CBDC in smart contracts. Ceteris paribus,
for a higher T f intec households are willing to hold CBDC at a lower interest rate relative to bank deposits.
Additive separability is no longer critical once business cycle simulations are performed around the steady state of an
economy that has fully transitioned to the partial use of CBDC. For these simulations we will therefore use a more ﬂexible
third model variant with a non-separable CES LGF:
1

  −1


fˇtx = (1 − γx )  dˇtx

1



+ (γx )  T f intec m̌tx

 −1



 −1

.

(14)

This functional form allows us to better explore the implications of different degrees of substitutability between bank deposits and CBDC.26
3.3. Financial investors
Financial investors have unit mass and are indexed by n. Their utility at time t depends on an external consumption
u , labour hours hu (n ), and liquidity f u (n ). They are the economy’s only holder of government bonds. Their
habit ctu (n ) − vct−1
t
t
lifetime utility is

Max

E0

∞


⎧
⎪
⎨

1

hu (n )1+ η
v
u
βut (1 − ) log(ctu (n ) − ν ct−1
) − ψh t
+ ψf
x
⎪
1 + η1
⎩
t=0

ftu (n )
Tt

1− ϑ1

⎫
⎪
⎬
⎪
⎭

1 − ϑ1

,

(15)

where, apart from the discount factor βu , all other common parameters are identical to those of households. Financial
investors maximize (15) subject to a sequence of budget constraints. Their optimality conditions are standard, except for a
utility term in the condition for deposits.
The main reason for including ﬁnancial investors is to generate an arbitrage condition between bank deposits and government bonds. The data suggest that the underlying speciﬁcation should permit the calibration of a high, and in the limit
inﬁnite, steady state interest semi-elasticity of deposit demand εud . Liquidity in the utility function, as in (15), and unlike the
Schmitt-Grohé and Uribe, 2004 speciﬁcation, makes this possible.
In simulations we have conﬁrmed that, because the equilibrium return on CBDC is calibrated to be signiﬁcantly below
that of bank deposits, if ﬁnancial investors’ preferences allowed for holdings of CBDC, those holdings would optimally be
driven towards a corner solution of zero. We have therefore simpliﬁed the model by excluding CBDC from ftu . Financial
investors still trade government bonds against CBDC, but when they do they instantaneously swap that CBDC against bank
deposits with households. For the ﬁrst and second model variants that are used for simulating the transition to a CBDC
 θ
regime, we therefore have fˇu = dˇu , while for the third model variant we have fˇu = dˇu .
t

t

t

t

26
It can be shown that simulations of the second and third model variants are very similar once the elasticity of substitution of the third model variant
is set equal to that of the second.

9

## Page 10

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

3.4. Unions
Unions have unit mass and are indexed by u. They are managed by households and ﬁnancial investors, and their intertemporal marginal rate of substitution is an average, weighted by current labour supplies, of their intertemporal marginal
rates of substitution. Each union buys homogenous labour from households at the nominal household wage Wthh , and sells
pr
labour variety u to producers at the nominal producer wage Wt (u ), with associated inﬂation rate pi_t^{pr}\left(u\right). Each
producer demands a CES composite of labour varieties, with elasticity of substitution θw . The aggregate nominal producer
wage is given by Wt . Unions face quadratic wage inﬂation rate adjustment costs Cw,t (u ) = (φw /2 )ht Tt
The optimization problem yields a familiar New Keynesian Phillips curve for wages.
pr




2
pr
πtpr (u )x/πt−1
−1 .

3.5. Fiscal policy
The government budget constraint is
g
bgt + mtg = rt bgt−1 + rm,t mt−1
+ gt + tr ft − τt ,

(16)

g
where government issuance of CBDC implies mt > 0. Government spending gt is always equal to a ﬁxed fraction sg of GDP,


ls
gt = sg gdpt . Tax revenue τt is τt = τt lst + τc,t ct + τL,t wthh ht + (1 −  )τk,t rk,t − qt kt−1 , and ﬁscal policy follows a struc-

tural deﬁcit rule:



gdtrat = gdrat − 100dgdp ln gdˇpt /gdpss



.

(17)

 g

g
For the pre-CBDC economy, we have gdtrat = 100 Bt − Bt−1



/GDPt , where GDPt is nominal GDP, and gdrat is the government’s long-run target for the deﬁcit-to-GDP ratio. Automatic stabilizers allow the deﬁcit to ﬂuctuate with the output gap
ln(gdˇpt /gdpss ), with a response coeﬃcient dgd p . This rule is suﬃcient to endogenize one ﬁscal instrument. Additional ﬁscal
instruments can be endogenized by adding auxiliary ﬁscal policy rules. Our paper considers two different sets of assumptions. First, when we simulate the transition to a CBDC regime, we assume that the revenue gains due to lower government
ﬁnancing costs and higher economic activity are applied towards a reduction of distortionary labor income, capital income,
and consumption taxes, with lump-sum taxes and transfers held constant. Speciﬁcally, the ﬁscal rule (17) endogenizes τL,t ,
while two auxiliary ﬁscal rules endogenize τk,t and τc,t such that they follow labour income tax rates in proportional fashion:

(τc,t − τ̄c )/τ̄c = (τL,t − τ̄L )/τ̄L ,



(18)


τk,t − τ̄k /τ̄k = (τL,t − τ̄L )/τ̄L .

(19)

Second, for simulations of business cycle shocks, the ﬁscal rule (17) endogenizes the lump-sum tax rate τtls , while all other
taxes and transfers are held constant at their steady state values. This allows us to distinguish the monetary and ﬁnancial
effects of shocks from any ﬁscal effects due to variations in distortionary tax rates.
For the CBDC economy, it is critical that the government should insulate its budget, and thereby tax rates and/or government spending, from the budgetary effects of potentially highly
seigniorage revenue from CBDC creation. We
 g volatile
g
g
g
therefore deﬁne the adjusted budget deﬁcit ratio as gdtrat = 100 Bt + Mt − Bt−1 − Mt−1 /GDPt , so that exchanges of CBDC
rat
against government debt have no direct effect on gdt and therefore on ﬁscal instruments.
3.6. Monetary policy
Policy rule for the interest rate on reserves: Under CBDC the main policy tool remains the interest rate on central bank
reserves. It is assumed to follow a conventional inﬂation forecast-based interest rate rule, with steady state nominal interest
rate ı̄, interest rate smoothing, and a countercyclical response to deviations of three-quarters-ahead annual inﬂation from
the inﬂation target:
ii (1−ii )

it = (it−1 ) ı



πt+3 πt+2 πt+1 πt
( π )4

 (1−i4i )iπ
.

(20)

Policy rules for CBDC: The debate about whether to use the interest rate on reserves or a monetary aggregate as a monetary policy tool was settled in favor of the former decades ago. This was based on three arguments. First, there would be
problems in deﬁning a monetary aggregate whose control would represent an economically relevant lever. However, this
need not apply to CBDC as long as the quantity outstanding is suﬃciently large and its substitutability with other monetary
transactions media is suﬃciently low to make it a relevant lever. Second, even if the relevant monetary aggregate could
be deﬁned, there would be problems in controlling it effectively, given that all but the narrowest monetary aggregates are
under the control of private banks rather than the central bank. This includes the possibility, known as Goodhart’s Law
(Goodhart (1975)), that private sector behavior may change in response to changes in the targeted monetary aggregate. This
10

## Page 11

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

is closely related to the Lucas critique (Lucas (1976)).27 There is of course no claim that controlling CBDC amounts to controlling broader monetary aggregates. But as long as the control of CBDC represents an economically relevant lever, this is
not a problem because its quantity can be directly controlled by the issuing central bank. Third, Poole (1970) argued that
controlling a quantity aggregate must lead to more aggregate volatility than controlling an interest rate if shocks to money
demand are suﬃciently important. As we will show, this argument does apply to CBDC, but in a far more attenuated form
than in Poole (1970). This is because under a CBDC regime banks remain the creators of the marginal unit of money, while
in the framework of Poole (1970) broad money was assumed to be controlled by government.
In order to study the third question, we need to ﬁrst specify CBDC policy rules. In interpreting these rules, a key insight
is that an increased supply of CBDC must be associated with a higher interest rate on CBDC. This is because the return on
a monetary asset consists of both a non-pecuniary convenience yield and a ﬁnancial return whose sum, by arbitrage, has
to equal the policy rate. With an additional supply of CBDC, liquidity becomes less scarce, so that the convenience yield of
CBDC drops. For a given policy rate, this means that the ﬁnancial return on CBDC im,t must increase.
Under a CBDC quantity rule, the central bank ﬁxes the ratio of CBDC to GDP at a target value of mrat over the cycle, and
it may in addition permit it to vary countercyclically. The rule is



mtrat = mrat − 100mπ Et ln



g



πt+3 πt+2 πt+1 πt
( π )4



,

(21)

where mtrat = 100 mt /(4gdpt ) and mπ ≥ 0. The baseline version of this rule, with mπ = 0, implies a ﬁxed quantity of CBDC
relative to GDP, so that any changes in demand for CBDC will be reﬂected in the interest rate on CBDC im,t alone, except
to the extent that they affect GDP. For mπ > 0, when inﬂation is expected to be above target, this rule removes CBDC from
circulation, through a central bank sale to the private sector of government debt against CBDC. This draining of purchasing
iq
power has a countercyclical effect, through an increase in liquidity taxes τx,t , that goes beyond the effects of the policy rate
it .
Under a CBDC interest rate rule, the central bank varies the nominal interest rate paid on digital currency according to

it
im,t =
sp



πt+3 πt+2 πt+1 πt
( π )4

−imπ

.

(22)

The baseline version of this rule, with im
π = 0, implies a ﬁxed spread sp > 1 of the policy rate relative to the CBDC interest
g
rate, so that any changes in demand for CBDC will be reﬂected in the quantity of CBDC mt alone, except to the extent that
m
they affect the policy rate. For iπ > 0, when inﬂation is expected to be above target, the interest rate on digital currency
is lowered relative to the policy rate. This, ceteris paribus, makes CBDC less attractive, so that agents will exchange it for
government bonds. This endogenous reduction in liquidity has the same effects as the direct withdrawal of liquidity under
the countercyclical quantity rule.
Issuance arrangements for CBDC: A key practical concern among policymakers has been the perceived risk of a systemwide run from bank deposits to CBDC (runs on individual institutions are of course possible with or without CBDC). A
frequent partial equilibrium fallacy is the argument that holders of bank deposits can, for technological reasons, run into
CBDC much more quickly than into cash, thereby increasing systemic risk. This does not survive general equilibrium analysis if the only available counterparties are other private-sector agents, in which case the "run" is merely a reallocation of
unchanged stocks of deposits and CBDC among different agents. For a system-wide run, it is therefore necessary that the
central bank itself adopts issuance arrangements whereby it accepts bank deposits in payment for CBDC, and that it adopts a
policy rule that elastically accommodates large-scale changes in CBDC demand, thereby potentially becoming a system-wide
and ultimately unsecured lender of last resort. Central banks have never issued central bank money under such arrangements, and Kumhof and Noone (2018) argue that they should not start doing so under CBDC. Instead, that paper advocates
core principles that minimize and largely eliminate the risk of system-wide runs. The ﬁrst line of defense is the policy rule,
which should feature an adjustable CBDC interest rate that allows the market for CBDC to clear without a need for either
large balance sheet adjustments or large movements in the general price level. A quantity rule could completely eliminate
runs into CBDC through lower CBDC interest rates, as long as the necessary interest rate can remain within acceptable
bounds. And even under an interest rate rule, rate setting could help dampen large ﬂuctuations in CBDC demand. If this is
nevertheless insuﬃcient, the second line of defense is the issuance arrangements, which should only guarantee central bank
issuance of CBDC against eligible securities, principally government securities, whereas it should not guarantee on-demand
convertibility of bank deposits into CBDC.28 Households and ﬁrms would be able to freely trade bank deposits against CBDC
in a private market, and that private market could freely obtain additional CBDC from the central bank, at the posted CBDC
interest rate and against eligible securities. During normal times the central bank could also trade CBDC against bank deposits in this market, but at its discretion. The withdrawal of the central bank from that market during times of stress would
be the equivalent of a bank holiday during a cash-driven run in a traditional banking system.
27
This includes the possibility, known as Goodhart’s Law (Goodhart (1975)), that private sector behavior may change in response to changes in the
targeted monetary aggregate. This is closely related to the Lucas critique (Lucas (1976)).
28
It can be shown that guaranteed on-demand convertibility of reserves into CBDC would also need to be ruled out, as this could still facilitate systemwide bank runs.

11

## Page 12

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

Other arrangements would be possible. For example, Bindseil (2020) proposes that the central bank should pay a relatively high CBDC interest rate on quantities up to a quantity cap, and a much lower rate on (or even an explicit prohibition
on) quantities beyond that. This would potentially allow the use of an interest rate rule, while (at least partially) guarding
against aggregate runs, and ensuring a degree of fairness in the event that a run did occur. But it is not without challenges
of its own. Not least among these, it could prove challenging to calibrate the many individual account limits. If kept too
small, they could stiﬂe the use of CBDC as an at par medium of exchange, while if set too high, they might still permit a
large-scale run.
Our theoretical model embeds the issuance arrangement assumptions of Kumhof and Noone (2018). Speciﬁcally, the
government’s budget constraint (16) shows that the government only trades CBDC against government debt and not against
bank deposits, the monetary policy rule (20) implies that the market for central bank reserves is separate from the market
for CBDC, and both CBDC policy rules (21) and (22) imply that the CBDC interest rate is adjustable.
3.7. Equilibrium
In equilibrium, each group of agents maximizes its respective objective function subject to constraints, the government follows a set of ﬁscal and monetary policy rules, and markets clear. We deﬁne aggregate consumption as ct =
 ctu + (1 −  )ctc . Then the market clearing conditions are given by (1 −  )yt = ct + (1 −  )It + gt + r(Mt + Tt ) for goods,
g
ht =  htu + (1 −  )htc for labor, at = a for land (a is the ﬁxed supply of land), kt = Kt for capital, bt =  but for government
 c

g
y
a
k
bonds, and mt = (1 −  ) mt + mt + mt + mt for CBDC. Finally, GDP is deﬁned as gdpt = ct + (1 −  )It + gt . The shock Stmd
is ﬁrst-order autoregressive. The shock Stz = Stz1 Stz2 consists of two components. The ﬁrst component represents news shocks
εtnews received over the current and the preceding 12 quarters, ln Stz1 =  12
ε news , while the second component is ﬁrst-order
j=0 t− j
z2 + ε z2 .
autoregressive and given by ln Stz2 = ρz ln St−1
t

4. Calibration
We calibrate the steady state of our model economy based on US data for the period 1990–2006. One period corresponds
to one quarter. Our discussion is kept brief in the interest of space - the Appendix shows a complete listing and more
extensive discussion of the calibrated parameter values. Calibration targets are held constant across the three model variants
with LGF (12), (13) and (14). The non-CBDC parameters for all three of these economies are very similar.
4.1. Pre-CBDC economy
The trend real growth rate is calibrated at 2% p.a., the inﬂation target at 3% p.a., and the real policy rate at 3% p.a. The
population share of ﬁnancial investors  equals 5%. In preferences, we set labour supply elasticity and habit persistence to
η = 1 and v = 0.7, common choices in the literature. The steady state ratio of per capita household and ﬁnancial investor
consumption is ﬁxed at 1:1. The real resource cost share r of monitoring and transaction costs is 25%.
The labour income share is calibrated at 61%, based on recent values in BLS data for the US business sector. The private
investment and government spending to GDP ratios are set to 19% and 18% of GDP, roughly their average in US data. The
investment adjustment cost parameter, at φI = 2.5, follows Christiano et al. (2005). The price and wage mark-ups are ﬁxed,
in line with much of the New Keynesian literature, at 10%. Together with price and wage inﬂation stickiness parameters
of φ p = 200 and φw = 200, this implies an average duration of price and wage contracts of 5 quarters in an equivalent
Calvo (1983) setup with full indexation to past inﬂation. This is similar to the results of Christiano et al. (2005).
The initial steady state government debt-to-GDP ratio of 80% is roughly equal to its value prior to the onset of the Great
Recession. Steady state tax rates on labor, capital and consumption are calibrated to reproduce the historical ratios of the
respective tax revenues to GDP. Fiscal policy automatic stabilizers dgd p = 0.34 are based on Girouard and André (2005).
For the monetary policy reaction function we stay close to the coeﬃcient estimates for the Federal Reserve Board’s SIGMA
model Erceg et al. (2006) and the IMF’s Global Projection Model Carabenciov et al. (2013), with ii = 0.7 and iπ = 2.0.
Laubach (2009), Engen and Hubbard (2004) and Gale and Orszag (2004) report empirical estimates, for the United States,
of the elasticity " (in percent p.a.) of the real interest rate rt with respect to changes in the government debt-to-GDP ratio
brat
(in percentage points). They report a range of " ∈ [0.01, 0.06], in other words each percentage point increase in the
t
debt ratio increases the real interest rate by between 1 and 6 basis points. We calibrate this elasticity conservatively at 2
basis points, or " = 0.02, which requires φb = 0.0 0 0 05.
Based on Basel-III regulations, banks’ MCAR is set at 8% of risk-weighted assets, their capital conservation buffer at 2.5%,
and the risk-weight parameters at 50% for mortgage loans, 75% for consumer loans, 100% for working capital loans, and 90%
for investment loans. The steady state percentage of banks violating the MCAR is set at 2.5% of all banks per quarter.
The interest rate margin between the policy rate and banks’ deposit rate it − id,t is calibrated at 1% p.a. This is based on
Ashcraft and Steindel (2008), but adjusting for the fact that banks in our model include not only commercial banks but also
non-bank ﬁnancial institutions, whose liabilities are less liquid on average. The steady state interest rate margin between
the deposit rate and the wholesale lending rate that banks would charge on riskless private mortgage loans ia,t − id,t is ﬁxed
12

## Page 13

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

at 1.5% p.a. in steady state.29 This means that the margin of the riskless private lending rate over the policy rate is 0.5% p.a.,
which is roughly equal to the historical spread of the 3-month US$ LIBOR over the 3-month treasury bill rate. Steady state
retail lending rate spreads over the policy rate ixr,t − it are computed from average margins between different corporate and
household borrowing rates and 3-month US treasury bill rates. Again following Ashcraft and Steindel (2008), we ﬁx spreads
of 2% p.a. for mortgage loans, 5% p.a. for consumer loans, 3% p.a. for working capital loans, and 1.5% p.a. for investment
loans. Our calibration of steady state loan default rates of ﬁrms is based on Ueda and Brooks (2011), with investment loans
at 1.5% of all ﬁrms per period, and working capital loans at 3%. Loan default rates of households are at 2.5% for mortgages
and 4% for consumer loans, see the Appendix for a more detailed discussion.
For the overall size of the ﬁnancial system’s balance sheet, Federal Financial Institutions Examination Council (2007) report 100% of GDP for commercial banks, while Gorton et al. (2012) and Pozsar et al. (2010) report 350% and 250% of GDP
after including different measures of shadow banks. We adopt a compromise of 180% of GDP. This avoids double-counting,
and is approximately consistent with Flow of Funds information on the size of borrowing exposures of the US corporate
and household sectors, with working capital loans at 20% of GDP, investment loans at 80% of GDP, mortgage loans at 60% of
GDP, and consumer loans at 20% of GDP. The steady state loan-to-equity ratios of bank borrowers are calibrated at 100% for
investment loans and 200% for mortgage loans. Steady state consumption and investment deposits are calibrated at 50% and
30% of GDP, while working capital and real estate deposits each equal 10% of GDP. Residually, deposits of ﬁnancial investors
account for 65.6% of GDP. As a result of these choices, the consumption and capital liquidity tax rates equal 4.9% and 7.1%,
while working capital and real estate liquidity tax rates are smaller given their smaller deposits-to-GDP ratios.
The steady state interest semi-elasticities of deposit demand εxd , x ∈ {c, a, y, k, u}, are the percent changes in deposit demands in response to a one percentage point increase in the opportunity cost of deposits. Traditional empirical studies have
found interest semi-elasticities of 5 (Ball (2001)) or even lower (Ireland (2007); O’Brien (2000)). We adopt Ball’s estimate of
εxd = 5 for all four categories of household deposits. For ﬁnancial investors we assume a much higher semi-elasticity of 250,
and in part of the sensitivity analysis an inﬁnite semi-elasticity.

4.2. CBDC parameters - transition simulations
We assume that following the introduction of CBDC the structural model, other than for the additively separable presence
of CBDC in the LGF, remains identical, and that all the main structural parameters also remain identical. The pre- and posttransition LGFs are given by (12) and (13), in each case with θ = 0.95. This implies a high elasticity of substitution between
CBDC and bank deposits of 20. The introduction of CBDC is assumed to be instantaneous and to equal 30% of GDP, through a
CBDC quantity rule with an appropriate setting of mrat and with mπ = 0. The ratio of government debt to GDP is kept at its
new reduced level of 50% on average, by setting gdrat and continuing to allow for automatic stabilizers. We make one small
parameter adjustment to ensure that the steady state Basel ratio remains at 10.5%, and we calibrate the ﬁnancial technology
coeﬃcient T f intec such that the steady state spread between the deposit rate and the CBDC rate equals 80 basis points. The
implied value of T f intec is 1.153.

4.3. CBDC parameters - business cycle simulations
For the business cycle simulations we calibrate the post-transition CES LGF model, with (14), to reproduce the calibration targets of the pre-transition model. To calibrate the allocation of CBDC to its four uses, we replicate the endogenous
allocation produced by the post-transition non-CES LGF model with LGF (13), through the CES quasi-share parameters γx .
We again assume that the steady state spread between CBDC rates and deposit rates equals 80 basis points.
We calibrate the elasticity of substitution between CBDC and bank deposits at  = 2. This implies an interest semielasticity of the demand for CBDC of around 34 (ε m = 34), which means that in response to a one percentage point increase
in the CBDC interest rate relative to the deposit rate, and holding deposits constant, demand for CBDC would increase by
around one third, or 10 percent of GDP. There is little guidance from the literature on this value. However, the elasticity
of substitution across retail deposit accounts at different banks appears to be low. For example, Competition and Markets
Authority (2015) reports that in a 2014 survey of UK households, almost 60% had been with the present provider of their
main checking account for over 10 years, and only 10% had been with their present provider for under two years. This is
despite the fact that in this period the interest rates offered on instant-access accounts varied across banks by as much as
2.5 percentage points. This provides some loose evidence against very high substitutability, and may also be suggestive of
potentially much lower substitutability. To illustrate the effects that this would have, we will occasionally consider the alternative of  = 0.075, which corresponds to ε m = 1.6. This is a world where any proportional increase in liquidity provided
through bank loans dx requires a similar proportional increase in CBDC liquidity mx in order to increase effective liquidity
f x by the same proportion.

29
We choose the wholesale mortgage rate because mortgages have the lowest risk-weighting, which makes them the closest equivalent in the model to
loans to blue chip, or near-zero-risk, borrowers.

13

## Page 14

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

5. Results
The following ﬁgures ﬁrst simulate the effects of a transition to CBDC, followed by the effects of different CBDC policies
when the economy is exposed to business cycle shocks. All real variables are shown in percent deviations from trend. All
interest rates are shown in percent per annum, and in levels, because their initial steady state values convey important
information. The inﬂation rate and all ﬁscal and liquidity tax rates are shown in percentage point (pp) deviations from their
initial steady state values, and the same is true for all balance sheet ratios to GDP.
5.1. Steady state effects of the transition to CBDC
5.1.1. Impulse responses
Fig. 1 studies the effects of introducing, in period 0, CBDC equal to 30% of GDP, through a purchase of government bonds
of the same value, at market-clearing prices. This policy increases GDP by 3.0% in the long run. The completion of the
transition to this new steady state takes well over two decades, as the capital stock takes time to reach a new much higher
level. Fig. 1 studies the ﬁrst 15 years, or 60 quarters. To ensure that the ﬁnal steady state values are visible, the red dotted
line in each case displays the change, in period 0, of the long-run steady state of the respective variable, while the solid
line shows the actual transition path. For CBDC, we assume that its supply is kept at 30% of GDP through a quantity rule
(21) with mπ = 0. The long-run net beneﬁcial effects of this CBDC issuance are driven by three main factors, reductions in
real interest rates, reductions in distortionary ﬁscal tax rates, and reductions in distortionary liquidity tax rates.
We begin with interest rate effects. Our calibration of " = 0.02 implies that a 30 percentage points drop in the ratio of
defaultable government debt to GDP is associated with a 60 basis points drop in the real policy rate, from 3% initially to
2.4% in the long run. The deposit rate is determined by ﬁnancial investors, due to their high interest semi-elasticity. They
hold deposits equal to 65.6% of GDP immediately before the introduction of CBDC, 95.6% of GDP immediately thereafter
as they trade government debt against CBDC with the government and CBDC against bank deposits with households, and
105.1% of GDP in the very long run as they accumulate additional ﬁnancial assets. Financial investors therefore eventually
experience a percent increase in their deposit holdings of 65%. With εud = 250, the deposit interest rate must therefore rise
by around 30 basis points relative to the policy rate30 , in other words it drops from 2.0% to 1.7%. An interpretation is that
banks’ funding becomes more expensive because they have to rely more on wholesale funding, with a sizeable share of
retail monetary transaction services now being performed by CBDC instead. The 80 basis points post-transition steady state
real interest rate discount of the CBDC rate relative to the deposit rate is calibrated, and implies a long-run level of the real
CBDC rate of 0.9%.
Bank lending and bank deposits increase by 5% of GDP in the long run,31 as banks satisfy a higher demand for deposit
balances. The latter is due to a combination of increased economic activity that requires additional transactions balances,
and of the increase in CBDC balances, which requires an increase in deposit balances due to imperfect substitutability. Note
that due to the high assumed elasticity of substitution between deposits and CBDC, the second effect is not in fact very
strong. This result is important because it addresses a common fear concerning the introduction of CBDC, that it might take
business away from banks.
Despite the increase in lending, the average real wholesale lending rate declines from 3.94% to 3.65% in the long run, and
thus follows the deposit rate almost exactly, with no signiﬁcant increase in the wholesale lending spread that represents
the opportunity cost of bank credit to households. The reason is that the increase in bank lending is not accompanied by
a signiﬁcant increase in bank riskiness. The average retail lending rate however declines by less than 30 basis points, from
5.22% to 5.07%, with the 15 basis points increase in the retail lending spread reﬂecting higher loan-to-value ratios among
bank borrowers, principally for mortgage loans but also for investment loans. This effect is partly buffered by the fact that
the real value of collateral increases due to lower real interest rates. The reductions in real interest rates, by arbitrage with
the return to physical capital, directly stimulate additional physical capital accumulation and thereby output.
But they also have additional powerful effects through ﬁscal and liquidity channels. We begin with the former. Following
the transition, interest charges on 62.5% of government ﬁnancing (50% of GDP) drop from 3.0% to 2.4% p.a., while interest
charges on the remaining 37.5% (30% of GDP) drop further from 2.4% to 0.9% p.a. The combined budgetary effect of these
two savings in ﬁnancing costs adds up to around 1.0% of GDP, shared in roughly equal proportions between reductions in
the policy rate and additional reductions in interest costs on CBDC. Furthermore, because transfers (but not government
spending) are held constant (an automatic stabilizer effect), the long-run increase in GDP reduces the ratio of transfers to
GDP by around 0.5%. With the sum of government debt and CBDC remaining constant at 80% of GDP, this means that the
long-run ratio of tax revenue to GDP can fall by 1.5%. The government’s use of these gains to fund reductions in distortionary
tax rates further stimulates economic activity. Because tax rates start from different initial levels and change proportionally,
the labour income tax rate drops by 132 basis points in the long run, and the capital and consumption tax rates by 103 and
30 basis points.
30
The standard assumption in a large part of the literature is that the deposit rate follows the policy rate one for one. We will consider this case, which
corresponds to εud −→ ∞, in our sensitivity analysis. A calibration of εud < 100 would have very unrealistic implications, as real deposit rates would increase
relative to their pre-CBDC steady state, despite the substantial drop in policy rates.
31
Loans and deposits drop slightly relative to GDP on impact, but their absolute drop is close to zero.

14

## Page 15

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

Fig. 1. Transition to New Steady State with CBDC at 30 Percent of GDP.

15

## Page 16

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148
Table 1
Steady state output gains of transition to CBDC.
Distortionary Taxes

" = 0.02
" = 0.00

Baseline
+3.0%

ε

d
u→ ∞

Lump-Sum Taxes
i →i
m

Baseline
+1.5%

+3.2%

εud → ∞

im → i

+1.6%
+2.2%

+0.7%

+1.4%
0%

+0.9%

+0.1%
-0.1%

-0.1%

The ﬁnal factor, increases of liquidity or monetary transaction balances, cannot be easily isolated from, and instead works
synergistically with, real interest rate and tax rate effects. First, half of the gains from lower distortionary ﬁscal tax rates
can be attributed to the interest savings on CBDC, which are due to the liquidity beneﬁts of CBDC. Second, part of the gains
from lower real interest rates are due to lower distortionary (and resource-consuming, with r > 0) liquidity tax rates rather
than lower real interest rates per se. Speciﬁcally, the liquidity tax rates on consumption goods, investment goods, working
capital and land drop by 38, 73, 5 and 1 basis points in the long run. This is smaller but not dramatically smaller than the
drops of the corresponding ﬁscal tax rates.
It is useful to comment on the connection between the foregoing and the Friedman rule. The Friedman rule
(Friedman, 1969) states that, because the marginal cost of producing money in a world of exogenously created high-powered
money equals zero, the money supply should if possible be expanded to the point where the marginal beneﬁt of money
also equals zero. However, in a world where almost all money is created endogenously by the private banking system, the
marginal cost of money creation equals the spread between wholesale loan and deposit rates, which must always remain
positive because of ﬁnancial frictions and ﬁnancial regulation. The introduction of CBDC, which is created independently
of the banking system, allows the economy to avoid part of these frictions and get closer to the Friedman rule, and this
explains some of the beneﬁcial effects of CBDC.
The overall long-run output effect in Fig. 1 is a very substantial GDP gain of 3.0%, with the consumption gain at 2.2% and
the investment gain at 5.3%. Liquidity increases strongly, not only due to the CBDC increase from 0% to 30% of GDP, with
T f intec > 1, but also due to a 5% increase in bank deposits in the long run.
In the shorter run, we observe a sizeable and persistent increase in inﬂation immediately after the introduction of CBDC.
The main reason is that the output gains are only realized after a prolonged transition, while aggregate demand picks up
much more quickly due to the immediate realization of the associated wealth effects. With demand running ahead of supply,
inﬂation rises, and with the policy rate reacting to inﬂation, this means that all real interest rates are elevated for some time.
Because higher real interest rates also increase government ﬁnancing costs, distortionary taxes have to temporarily remain
above their lower long-run level in order to satisfy the ﬁscal rule. This of course further dampens activity in the short run,
relative to the ﬁnal steady state. However, tax rates always remain well below their initial levels. This is one reason why
investment almost immediately grows substantially, and nearly reaches its long-run level after about one year, and why GDP
immediately expands by around 1.5%. The other reason is an immediate, strong and persistent drop in liquidity tax rates,
which is due both to the direct injection of liquidity through CBDC and the associated creation of additional bank deposits.
5.1.2. Decomposition
As in any exercise of this kind, the estimated output gains of approximately 3% are dependent on the details of the
model calibration. We see this as a strength rather than a weakness, because it makes it possible to explore the sensitivity
of our results to many different aspects of that calibration. We do so in Tables 1 and 2, which decompose the steady state
output gains of Fig. 1 into the contributions of different effects. First, we consider two alternatives for the debt elasticity of
real interest rates, with the alternatives of " = 0.02 as in the baseline and " = 0 in the alternative. Second, we consider
two different assumptions about budget balancing taxes, with distortionary taxes as in the baseline and lump-sum taxes in
the alternative. This creates four different baseline permutations that are reﬂected in the top left elements of the four main
quadrants in Table 1 and in Table 2. Third, in Table 1 we compare these four permutations, which all assume εud = 250, with
the same four permutations under εud −→ ∞. Fourth, in Table 1 we once more compare these four permutations, which all
assume  = 1, with the same four permutations under  = 0.67, which implies that the convenience yield of CBDC equals
zero, in other words that CBDC pays the same interest rate as government debt. Figure 2 adds additional information, but
only for the baseline permutations, about ﬁscal tax rates, liquidity tax rates, real interest rates, returns to capital, and the
ratios to GDP of the values of capital, land and deposits.
We begin our discussion with the output gains shown in the top left corners of each quadrant of Table 1, which all
assume εud = 250 and  = 1. In the bottom right quadrant, when neither real interest rates nor distortionary tax rates drop
in response to the introduction of CBDC, and only liquidity tax rates drop, the output gains are approximately equal to zero.
This is the net result of two countervailing effects, an expansion due to reductions in the capital and consumption liquidity
tax rates that stimulate capital accumulation and labor supply, and a contraction due to a reduced reliance on banks and
therefore on collateral to produce liquidity (see the term in square brackets in equation (11)), which reduces the beneﬁts of
16

## Page 17

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148
Table 2
Taxes, returns, and asset values during the transition to CBDC.
Distortionary Taxes

" = 0.02

" = 0.00

τk = −1.03%
τL = −1.32%
τc = −0.30%
τkliq = −0.73%
τcliq = −0.38%
τk = −0.53%
τL = −0.68%
τc = −0.15%
τkliq = −0.27%
τcliq = −0.20%

Lump-Sum Taxes

r = −0.60%
retk = −0.11%
arat = +5.5%
krat = +2.5%
d rat = +5.1%
r = 0.00%
retk = +0.07%
arat = −2.2%
krat = −0.3%
d rat = −4.3%

τk = 0.00%
τL = 0.00%
τc = 0.00%
τkliq = −0.73%
τcliq = −0.38%
τk = 0.00%
τL = 0.00%
τc = 0.00%
τkliq = −0.27%
τcliq = −0.20%

r = −0.60%
retk = −0.11%
arat = +5.9%
krat = +1.5%
d rat = +4.7%
r = 0.00%
retk = +0.07%
arat = −2.0%
krat = −0.8%
d rat = −4.5%

capital as a collateral asset and therefore reduces capital accumulation. We now show that, once real interest rates and/or
distortionary ﬁscal tax rates also drop, the collateral channel ceases to be contractionary while the liquidity tax rate channel
becomes more expansionary.
We can use the effects of lower ﬁscal tax rates to calibrate the effects of further reductions in liquidity tax rates. To do
so we ﬁrst move to the bottom left quadrant of Table 1, where real interest rates do not change but the ﬁscal gains from
cheaper CBDC ﬁnancing are used to lower ﬁscal tax rates on capital by 0.53 percentage points and on consumption and
labor by a combined 0.83 percentage points. The reductions in liquidity tax rates remain unchanged from the bottom right
quadrant. The 0.7% output gain is due to a synergy between savings in government ﬁnancing costs, which can be attributed
to the liquidity beneﬁts of CBDC, and the use of these savings to lower distortionary tax rates. This can be conﬁrmed by
considering the case of a zero CBDC convenience yield, shown in the bottom right of each quadrant, where output gains are
approximately equal to zero because there are no interest savings.
As we move to the top right quadrant of Table 1, real interest rates drop but distortionary ﬁscal tax rates remain unchanged. Output grows by a far larger 1.5%, due to a combination of a 0.11 percentage point drop in the return to capital
and 0.46 and 0.18 percentage point reductions in liquidity tax rates on capital and consumption.32 The driving force behind
these further increases in liquidity is that lower real interest rates increase the capitalized value of future returns to capital
(and land). This increases collateral values and banks’ ability to lend, with total bank deposits increasing by over 9% of GDP.
Given a comparison of the size of the reductions in ﬁscal and liquidity tax rates in the bottom left and top right quadrants,
we conservatively estimate that of the 1.5% output gain due to lower real interest rates, around 0.4% can be attributed to
lower liquidity tax rates.
Moving from the top right to the top left quadrant of Table 1, reductions in distortionary tax rates account for an additional 1.5% output gain. Based on the above arguments, we estimate that around 0.7% are due to interest savings from CBDC
issuance and 0.8% due to interest savings from lower policy interest rates. The latter 0.8% ﬁgure is also consistent with the
results for a CBDC convenience yield of zero, where output gains increase from 1.4% to 2.2% when moving from the top
right to the top left quadrant.
We are now able to decompose the 3.0% total output gains. Starting with lower real interest rates, 1.1% output gains
are exclusively due to lower real interest rates, while 2.3% are due to lower real interest rates plus their synergies with
additional liquidity (0.4%, through the collateral channel) and with lower ﬁscal tax rates (0.8%, through interest savings on
all government ﬁnancing). Turning to lower ﬁscal tax rates, 1.5% output gains are due to their synergies with lower real
interest rates (0.8%) and additional liquidity (0.7%, through interest savings on CBDC). Concluding with additional liquidity,
1.1% output gains are due to its synergies with lower real interest rates (0.4%) and lower tax rates (0.7%).
The increase in real deposit rates relative to policy rates only leads to relatively small output losses of 0.2%, meaning that
without this increase output gains would equal 3.2%. This can be seen by inspecting the middle entries of each quadrant in
Table 1, which represent the case where deposit rates do not change relative to policy rates. The reason is that what mainly
matters for banks and households is not the spread of deposit rates with the policy rate but with wholesale lending rates.
Finally, we have found that, in the neighborhood of our 30% baseline for the ratio of CBDC to GDP, the output gains are
close to linear in that ratio. It is likely that the model would need additional ingredients to study a wider range. For example, at very low levels, CBDC would probably not exhibit suﬃcient economies of scale to become accepted as an effective
medium of exchange. And at very high levels, CBDC could no longer be issued against government debt, so that the size of
further output gains would depend on how further issuance takes place. Furthermore, and perhaps more importantly, money
demand functions are unlikely to exhibit unchanging interest semi-elasticities, and elasticities of substitution between CBDC
and bank deposits, over a very wide range.

32
We note that lower capital liquidity tax rates reduce the effective purchase price of capital q, which ceteris paribus increases the equilibrium return to
capital.

17

## Page 18

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

5.2. CBDC quantity rules versus CBDC interest rate rules
In this subsection we compare the properties of strict (mπ = 0) quantity rules (21) and strict (im
π = 0) interest rate rules
(22). The exploration of countercyclical rules, with mπ > 0 or im
π > 0, is considered in the next subsection.
5.2.1. Credit cycle shocks and business cycle shocks
Fig. 2 studies the effects of a sequence of unanticipated shocks whereby, over a period of three years, banks receive
positive news shocks εtnews concerning the riskiness of their borrowers, as in Christiano et al., 2014, with magnitudes that
by the end of the third year reduce the standard deviation of borrower riskiness by 40%. At that time the news shocks are
reversed, and banks receive a large negative shock εtz2 to the riskiness of their borrowers, which thereafter unwinds, as a
ﬁrst-order autoregressive process with coeﬃcient 0.8.
Under both CBDC rules, banks respond to initially lower credit risk among their borrowers through a reduction in retail
lending spreads and an increase in deposit creation. Lower spreads and increased purchasing power increase output, inﬂation, the policy rate, and the deposit rate. The additional deposit creation, which reaches around 17% of GDP by the end of
iq
iq
the third year, reduces liquidity taxes τc,t and τk,t by well over 2 percentage points, and this is the main reason for the
over 2% increase in GDP by the end of the third year. At the time of the contraction, banks respond through a combination
of higher spreads and a dramatic reduction in deposit creation. The resulting large increase in liquidity taxes is the main
factor behind a drop in GDP of well over 4% from peak to trough.
Under a CBDC quantity rule, the initial reduction in borrower riskiness raises the relative eﬃciency of creating liquidity
through banks. An unchanged CBDC-to-GDP ratio therefore requires that the spread between the policy rate and the CBDC
rate declines by over 30 basis points by the end of the third year. Government debt declines by ultimately 5% of GDP, as the
government’s ﬁscal rule requires a countercyclical surplus during this period. When the ﬁnancial cycle turns at the end of
the third year, all of these developments are reversed.
Under a CBDC interest rate rule, households return CBDC equal to more than 4 % of GDP to the central bank in exchange
for government bonds. Privately held government debt therefore declines by much less during the boom phase, despite
the ﬁscal surpluses. This reduction in the quantity of CBDC is countercyclical for purchasing power and thus GDP, because
it counteracts the increase in purchasing power generated by additional bank lending. But the quantitative difference between interest rate and quantity rules is small. A strict CBDC interest rate rule therefore offers only a modest degree of
countercyclicality relative to a strict CBDC quantity rule.
Under shocks to the willingness to lend coeﬃcients κ x in banks’ lending technology, the differences between the two
rules are comparable to those in Fig. 2. They are even smaller under standard demand and technology shocks. Because
the marginal dollar of liquidity can always be created or destroyed by banks, the fact that a CBDC quantity rule does not
endogenously accommodate the relatively modest-sized changes in liquidity demand that arise under such shocks is of little
consequence.
5.2.2. Money demand shocks
Fig. 3 studies a shock εtmd that increases households’ demands for total money balances ftx , x ∈ {c, a, y, k}. This shock can
be interpreted as a ﬂight to safety, whereby money balances are used to a greater extent as a safe store of value rather than
as a means of payment. This reduces their velocity of circulation, increases capital and consumption liquidity tax rates by
more than 3% and more than 2%, respectively, and reduces GDP by over 1.5%.
Banks immediately respond to this increase in money demand, by expanding their loans and deposits by well over 10%
of GDP on impact, albeit at higher lending spreads. Under a CBDC quantity rule, the demand for additional CBDC balances
is not satisﬁed by the central bank, and instead the CBDC interest rate is allowed to drop by more than 60 basis points
relative to the policy rate. Under a CBDC interest rate rule, the central bank instead supplies additional CBDC equal to more
than 4% of GDP. In this case liquidity taxes rise by slightly less, and this dampens the GDP contraction. This result is closely
related to Poole (1970), who found that when money demand shocks dominate, an interest rate rule is more effective than
a quantity rule at limiting macroeconomic volatility. However, Poole (1970) assumed that the central bank can effectively
control broad monetary aggregates, while in our model the central bank can only control the comparatively small quantity
of CBDC, while banks remain the highly elastic suppliers of the marginal unit of liquidity. The difference between quantity
and interest rate rules is therefore much smaller than it would be in a Poole (1970) economy.
The difference between policy rules starts to matter more when the substitutability between CBDC and bank deposits
is low. For example, in a simulation with  = 0.075, the GDP contraction under a quantity rule is approximately twice as
large as under an interest rate rule. This is because, with strong complementarities between CBDC and bank deposits, any
increase in bank lending is much more effective at helping the economy cope with the increase in money demand when
it is accompanied by an increase in CBDC issuance. However,  = 0.075 is a very strong assumption because it implies that
CBDC and bank deposits are demanded in close to ﬁxed proportions.
The difference between policy rules also matters more when households’ increase in demand is speciﬁcally for CBDC
rather than for total money balances. But even in this case the GDP differences are not large. We emphasize that in that
simulation (not shown here to conserve space) the effect on bank deposits is very small. This is because our assumptions
about CBDC issuance arrangements imply that households can only obtain additional CBDC against government bonds.
18

## Page 19

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

Fig. 2. Quantity versus Interest Rate Rules for CBDC - Credit Cyle Shocks.

19

## Page 20

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

Fig. 3. Quantity versus Interest Rate Rules for CBDC - Higher Money Demand.

20

## Page 21

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

Fig. 4. Countercyclical CBDC Interest Rate Rules - Credit Cycle Shocks.

21

## Page 22

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

Another important factor in choosing between quantity and interest rate rules is that at the time of the initial introduction of CBDC the policymaker might ﬁnd it very diﬃcult to estimate the steady state interest rate spread sp between the
policy and CBDC rates that corresponds to the desired steady state quantity of CBDC. It might therefore be preferable to
initially issue CBDC under a quantity rule in order to let the market establish a reasonable range for CBDC interest rates,
and to switch to an interest rate rule later.
5.3. Countercyclical CBDC policy rules
Fig. 4 simulates the same credit cycle shocks that we studied in Fig. 2. It demonstrates that a countercyclical CBDC
interest rate rule can make a signiﬁcant contribution to stabilizing the business cycle, over and above the stabilization
provided by a conventional countercyclical rule for the interest rate on reserves. The black solid line is identical to the
m
m
dotted line in Fig. 2, where im
π = 0, and the two countercyclical alternatives represent iπ = 0.4 and iπ = 0.8. In other words,
for a one percentage point deviation of expected inﬂation from target, the interest rate on CBDC, which at im
π = 0 follows
the policy rate one-for-one, is reduced by 40 or 80 basis points relative to the policy rate. It can be shown that the results
under countercyclical CBDC quantity rules with mπ = 0, 4 and 8 are very similar. In that case, for a one percentage point
deviation of expected inﬂation from target, the quantity of CBDC in circulation is reduced by 0, 4 or 8 percent of GDP. The
relationship between these magnitudes is directly implied by our calibration of the interest semi-elasticity of the demand
for CBDC of 34.
Because inﬂation rises by more than 2 percentage points just before the collapse of the boom, the policy rate it increases.
Under the baseline CBDC interest rate rule, the spread between it and im,t remains constant, while under the two countercyclical rules im,t drops relative to it . This makes it less attractive to hold CBDC, so that CBDC balances drop by around 8 or
16 percent of GDP. The counterpart to the decrease in CBDC is an increase in privately held government debt, but not one
for one because the government runs a countercyclical surplus during the boom. After the downturn, inﬂation drops quickly,
the policy rate follows, and the CBDC rate is raised relative to the policy rate, with CBDC balances increasing sharply. Setting CBDC interest rates in this way dampens the cycle of aggregate liquidity creation, despite a partial offset from deposit
creation. As a result, liquidity tax rates decrease by less during the boom and increase by less during the crash. This has a
sizeable impact, where under im
π = 0.8 the increase in GDP during the boom phase is almost cut in half, and the recovery
from the crash is faster.
It can be shown that with lower substitutability between CBDC and bank deposits, the CBDC interest rate rule would
have to be calibrated more aggressively to deliver the same countercyclical effects, while the CBDC quantity rule could be
calibrated less aggressively. The implication is that under a CBDC regime policymakers need to take into account technological, institutional or legal developments that might affect this substitutability.
Under money demand shocks the effects of countercyclical variations in CBDC interest rates are smaller but still sizeable,
while they are much more modest under standard demand and technology shocks. The reason is that countercyclical CBDC
policy most directly affects monetary conditions, so that its ability to dampen economic ﬂuctuations that originate on the
real side of the economy is more limited.
6. Conclusions
This paper studies whether the introduction of a central bank digital currency (CBDC), which is currently the subject of
intense deliberations at central banks, is likely to have material beneﬁts for steady state eﬃciency, macroeconomic stability,
and ﬁnancial stability. In the absence of any historical experience and empirical data to draw on, we do so using a detailed
theoretical New Keynesian DSGE model as a laboratory. In our view, this model exhibits most of the real and ﬁnancial
transmission channels relevant for CBDC. Its key features include imperfect substitutability between CBDC and bank deposits
as the economy’s two primary electronic media of exchange, the endogenous creation of bank deposits through collateralized
loans, CBDC issuance arrangements that prevent direct runs from bank deposits into CBDC, and the conduct of monetary
policy through two separate tools, the standard risk-free interest rate on reserves, and either the interest rate on or the
quantity of CBDC.
We ﬁnd that CBDC offers a number of macroeconomic beneﬁts, with few obvious costs unless the CBDC system is badly
designed. The ﬁrst beneﬁt is large steady state output gains of 3% for an injection of CBDC equal to 30% of GDP, due to
lower real interest rates, lower distortionary ﬁscal tax rates, and lower distortionary liquidity tax rates, a term that we use
to denote the monetary tax-like wedges that arise from deviations from the Friedman rule. The second beneﬁt is gains in
the effectiveness of countercyclical monetary policy, particularly if a sizeable share of shocks is to the demand or supply of
money, and if the substitutability between CBDC and bank deposits is low. A third consideration is ﬁnancial stability, particularly risks to the banking system. We argue that these risks can be minimized through a combination of an adjustable
interest rate on CBDC and a CBDC issuance mechanism which ensures that the central bank only issues CBDC against eligible
securities such as government bonds. We ﬁnd that under these assumptions, which are built into our model, the introduction of CBDC increases bank lending in steady state because it stimulates economic activity. Furthermore, the ability of asset
holders to run into CBDC poses no signiﬁcant risk to banks, because the run must reduce asset holders’ aggregate holdings
of government bonds rather than of bank deposits.
22

## Page 23

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

This paper is also part of a broader research agenda that puts monetary quantity aggregates, and therefore ﬁnancial
sector balance sheets, back at the centre of macroeconomic analysis. We are convinced that such models will prove very
valuable in studying the many questions raised by the likely appearance of actual national CBDCs in the near future.
Acknowledgments
The authors thank a number of policymakers, and seminar participants at Austrian National Bank, Bank for International
Settlements, Bank of Canada, Bank of England, Bank Negara Malaysia, Bundesbank, Central Bank of Brasil, Central Bank of
Ecuador, Central Bank of Hungary, Central Bank of Ireland, Central Bank of Lithuania, Central Bank of South Korea, Central
Bank of Russia, Czech National Bank, European Central Bank, Humboldt University Berlin, Imperial College London, International Monetary Fund, National Institute of Economic and Social Research, Norges Bank, People’s Bank of China, Qatar Centre
at King’s College, Swedish Riksbank, University College London, University of Columbia SIPA, University of Helsinki, University of Ottawa, University of Wisconsin, World Bank, the 2016 ECB-IMF Money Markets Workshop, the 2016 Reinvent Money
Conference at Delft University, the 2016 AEA meetings, the 2017 Konstanz Seminar on Monetary Theory and Policy, the 2017
MMCN Conference, the 2017 Cambridge Conference for Alternative Finance, the 2017 World Finance Conference, the 2017
Annual Meetings of Verein für Socialpolitik, the 2017 OFR/Cleveland Fed Conference on Financial Stability and Fintech, the
2018 EUROFORUM Conference Bank-IT, the 2018 Alpha Trust (Athens) Conference on Money Creation, the 2018 Monetative
Conference on The Future of Money, the 2018 European Blockchain Convention, the 2019 Axess Think Tank Conference on
Crypto Assets Investing, the 2019 Crypto Valley Conference, the 2019 The Future of Money Conference in Stockholm, the
2019 Third Vaduz Roundtable, the 2019 ABFER-BIS-CEPR Conference on Fintech and Digital Currencies, the 2020 Symposium
on the Future of Finance at Stanford GSB, the 2020 conference of Bank of Canada/Rutgers University/JEDC on The Economics
of Digital Currencies, and the 2021 Warwick Business School Gillmore Centre Symposium on Central Bank Digital Currencies,
for many helpful comments.
Supplementary material
Supplementary material associated with this article can be found, in the online version, at 10.1016/j.jedc.2021.104148
References
Ali, R., Barrdear, J., Clews, R., Southgate, J., 2014a. The economics of digital currencies. Bank Engl. Q. Bull. 54(3), 276–286.
Ali, R., Barrdear, J., Clews, R., Southgate, J., 2014b. Innovations in payment technologies and the emergence of digital currencies. Bank Engl. Q. Bull. 54(3),
262–275.
Andolfatto, D., 2018. Assessing the impact of central bank digital currency on private banks. In: Working Papers, No. 2018-026, Federal Reserve Bank of St.
Louis.
Ashcraft, A. B., Steindel, C., 2008. Measuring the impact of securitization on imputed bank output. In: Working Paper. Federal Reserve Bank of New York.
Competition and Markets Authority, 2015. Retail banking market investigation: provisional ﬁndings report. Available at: https://www.gov.uk/cma-cases/
review- of- banking- for- small- and- medium- sized- businesses- smes- in- the- uk,191–193.
Ball, L., 2001. Another look at long-run money demand. J. Monet. Econ. 47, 31–44.
Bank for International Settlements, 2020. Central bank digital currencies: foundational principles and core features.
Benes, J., Kumhof, M., 2012. The Chicago plan revisited. In: IMF Working Paper, WP/12/202.
Barrdear, J., Kumhof, M., 2016. The macroeconomics of central-bank-issued digital currencies. Bank of England Staff Working Papers 605.
Bernanke, B., Blinder, A., 1988. Credit, money, and aggregate demand. Am Econ Rev 78(2), 101–121.
Bernanke, B., Gertler, M., Gilchrist, S., 1999. The ﬁnancial accelerator in a quantitative business cycle framework. In: Taylor, J.B., Woodford, M. (Eds.), Handbook of Macroeconomics, Volume 1C. Elsevier, Amsterdam, pp. 1341–1393.
Bindseil, U., 2020. Tiered CBDC and the ﬁnancial system. In: Working Papers, No. 2351, European Central Bank.
Bordo, M., Levin, A., 2017. Central bank digital currency and the future of monetary policy. In: NBER Working Papers, No. 23711.
Brock, W.A., 1975. A simple perfect foresight monetary model. J. Monet. Econ. 1, 133–150.
Brunnermeier, M., Niepelt, D., 2019. On the equivalence of private and public money. J. Monet. Econ. 106, 27–41.
Calvo, G.A., 1983. Staggered prices in a utility-maximizing framework. J. Monet. Econ. 12, 383–398.
Carabenciov, I., Freedman, C., Garcia-Saltos, R., Laxton, D., Kamenik, O., Manchev, P., 2013. GPM6 - the global projection model with 6 regions. In: IMF
Working Papers, WP/13/87.
Chiu, J., Davoodalhosseini, M., Jiang, J., Zhu, Y., 2020. Bank market power and central bank digital currency: theory and quantitative assessment. In: Bank
of Canada Staff Working Papers, No. 2019-20.
Christiano, L., Motto, R., Rostagno, M., 2014. Risk shocks. Am. Econ. Rev. 104(1), 27–65.
Christiano, L.J., Eichenbaum, M., Evans, C.L., 2005. Nominal rigidities and the dynamic effects of a shock to monetary policy,. J. Polit. Econ. 113(1), 1–45.
Davoodalhosseini, M., 2018. Central bank digital currency and monetary policy. In: Bank of Canada Staff Working Papers, No. 2018-36.
Diamond, D., Dybvig, P., 1983. Bank runs, deposit insurance, and liquidity. J. Polit. Econ. 91(3), 401–419.
Federal Financial Institutions Examination Council, 2007. Annual Report 2006, Washington, DC.
Engen, E.M., Hubbard, R.G., 2004. Federal government debt and interest rates. NBER Macroecon. Annu. 19, 83–138.
Erceg, C., Guerrieri, L., Gust, C., 2006. SIGMA: a new open economy model for policy analysis. In: International Finance Discussion Papers, No. 835 (revised
version, January 2006), Board of Governors of the Federal Reserve System.
Farrell, J., 1987. Cheap talk, coordination, and entry. RAND J. Econ. 18(1), 34–39.
Fernández-Villaverde, J., Sanches, D., 2019. Can currency competition work? J. Monet. Econ. 106, 1–15.
Ferrari, M., Mehl, A., Stracca, L., 2020. Central bank digital currency in an open economy. In: Working Papers, No. 2488, European Central Bank.
Friedman, M., 1969. The Optimum Quantity of Money. Macmillan, London.
Furﬁne, C., 2001. Bank portfolio allocation: the impact of capital requirements, regulatory monitoring, and economic conditions. J. Financ. Serv. Res. 20(1),
33–56.
Gale, W., Orszag, P., 2004. Budget deﬁcits, national saving, and interest rates. Brook. Pap. Econ. Act. 2, 101–187.
George, A., Xie, T., Alba, J., 2020. Central bank digital currency with adjustable interest rate in small open economies. In: Asia Competitiveness Institute
Policy Research Papers, No. 05–2020.
23

## Page 24

J. Barrdear and M. Kumhof

Journal of Economic Dynamics & Control 142 (2022) 104148

Gertler, M., Karadi, P., 2011. A model of unconventional monetary policy. J. Monet. Econ. 58(1), 17–34.
Girouard, N., André, C., 2005. Measuring cyclically-adjusted budget balances for OECD countries. In: OECD Economics Department Working Papers, No. 434.
Gorton, G., Lewellen, S., Metrick, A., 2012. The safe-asset share. In: NBER Working Paper No. 17777.
Goodhart, C., 1975. Problems of monetary management: the U.K. experience. Reserve Bank of Australia Papers in Monetary Economics 1.
Heaton, J., Lucas, D., 1996. Evaluating the effects of incomplete markets on risk sharing and asset pricing. J. Polit. Econ. 104(3), 443–487.
Van den Heuvel, S., 2005. The bank capital channel of monetary policy. In: Working Paper, Wharton School. University of Pennsylvania.
Ireland, P., 2007. On the welfare cost of inﬂation and the recent behaviour of money demand. In: Working Paper. Boston College.
Jakab, Z., Kumhof, M., 2015. Banks are not intermediaries of loanable funds - and why this matters. In: Bank of England Staff Working Papers, No. 529.
Jakab, Z., Kumhof, M., 2020. Banks are not intermediaries of loanable funds - facts, theory and evidence. In: Bank of England Staff Working Papers, No. 761.
Keister, T., Sanches, D., 2019. Should central banks issue digital currency? In: Working Papers, No. 19–26, Federal Reserve Bank of Philadelphia.
Kiff, J., Alwazir, J., Davidovic, S., Farias, A., Khan, A., Khiaonarong, T., Malaika, M., Monroe, H., Sugimoto, N., Tourpe, H., Zhou, P., 2020. A survey of research
on retail central bank digital currency. In: IMF Working Papers, WP/20/104.
Kumhof, M., Allen, J., Bateman, W., Lastra, R., Gleeson, S., Omarova, S., 2020. Central bank money – liability, asset or equity of the nation? In: Research
Papers, No. 20–46, Cornell Law School.
Kumhof, M., Noone, C., 2018. Central bank digital currencies - design principles and balance sheet implications. In: Staff Working Papers, No. 725, Bank of
England.
Kumhof, M., Wang, X., 2020. Banks, money, and the zero lower bound on deposit rates. In: Staff Working Papers, No. 752, Bank of England.
Lagos, R., Wright, R., 2005. A uniﬁed framework for monetary theory and policy analysis. J. Polit. Econ. 113, 463–484.
Laubach, T., 2009. New evidence on the interest rate effects of budget deﬁcits and debt. J. Eur. Econ. Assoc. 7(4), 858–885.
Nakamoto, S., 2008. Bitcoin: a peer-to-peer electronic cash system. In: Working Paper. Available at: http://bitcoin.org/bitcoin.pdf.
Lucas, R., 1976. Econometric policy evaluation: a critique. Carnegie-Rochester Conference Series on Public Policy 1, 19–46.
Neumeyer, P., Perri, F., 2005. Business cycles in emerging economies: the role of interest rates. J. Monet. Econ. 52, 345–380.
O’Brien, 20 0 0. Estimating the value and interest rate risk of interest-bearing transactions deposits. In: Working Paper. Board of Governors of the Federal
Reserve System.
Poole, W., 1970. Optimal choice of the monetary policy instrument in a simple stochastic macro model. Q. J. Econ. 84, 197–216.
Pozsar, Z., Adrian, T., Ashcraft, A., Boesky, H., 2010. Shadow banking. In: Federal Reserve Bank of New York Staff Reports, No. 458.
Schilling, L., Fernández-Villaverde, J., Uhlig, H., 2020. Central bank digital currency: when price and bank stability collide. In: NBER Working Papers, No.
28237.
Schmitt-Grohé, S., Uribe, M., 2003. Closing small open economy models. J. Int. Econ. 61, 163–185.
Schmitt-Grohé, S., Uribe, M., 2004. Optimal ﬁscal and monetary policy under sticky prices. J. Econ. Theory 114, 198–230.
Sidrauski, M., 1967. Rational choice and patterns of growth in a monetary economy. Am. Econ. Rev. Pap. Proc. 47, 534–544.
Tobin, J., 1987. The case for preserving regulatory distinctions. In: Restructuring the Financial System. Federal Reserve Bank of Kansas City, pp. 167–183.
Ueda, K., Brooks, R., 2011. User Manual for the Corporate Vulnerability Utility: The 4th Edition. International Monetary Fund.
Williamson, S., 2019. Central bank digital currency: Welfare and policy implications. 2019 Meeting Papers 386. Society for Economic Dynamics.

24
