---
source_type: pdf
title: "An Estimated Open-Economy DSGE Model for The Evaluation of Central Bank Policy Mix"
original_file: "thesis/reference/An Estimated Open-Economy DSGE Model for The Evaluation of Central Bank Policy Mix.pdf"
sha256: "e5fb3d8890fc91e09e6dd4905b0f1a5a6ec974bbb0e60c6b6008e9e126c8536b"
page_count: 41
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: An Estimated Open-Economy DSGE Model for The Evaluation of Central Bank Policy Mix

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Bulletin of Monetary Economics and Banking
Volume 26

Number 3

Article 1

9-30-2023

An Estimated Open-Economy DSGE Model for The Evaluation of
Central Bank Policy Mix
Solikin M. Juhro
Bank Indonesia - Indonesia, solikin@bi.go.id

Denny Lie
University of Sydney, denny.lie@sydney.edu.au

Aryo Sasongko
Bank Indonesia - Indonesia, aryo@bi.go.id

Follow this and additional works at: https://bulletin.bmeb-bi.org/bmeb

Recommended Citation
Juhro, Solikin M.; Lie, Denny; and Sasongko, Aryo (2023) "An Estimated Open-Economy DSGE Model for
The Evaluation of Central Bank Policy Mix," Bulletin of Monetary Economics and Banking: Vol. 26: No. 3,
Article 1.
DOI: https://doi.org/10.59091/2460-9196.2126
Available at: https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1

This Article is brought to you for free and open access by Bulletin of Monetary Economics and Banking. It has been
accepted for inclusion in Bulletin of Monetary Economics and Banking by an authorized editor of Bulletin of
Monetary Economics and Banking. For more information, please contact bmebjournal@gmail.com.

## Page 2

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
Bulletin of Monetary Economics and Banking, Vol. 26 No. 3, 2023, pp. 397 - 436
p-ISSN: 1410 8046, e-ISSN: 2460 9196

AN ESTIMATED OPEN-ECONOMY DSGE MODEL FOR THE
EVALUATION OF CENTRAL BANK POLICY MIX
Solikin M. Juhro*, Denny Lie**, and Aryo Sasongko***
*Economic and Monetary Policy Department, Bank Indonesia.
**Corresponding author. University of Sydney, Australia. Email: denny.lie@sydney.edu.au
***Bank Indonesia Institute, Bank Indonesia.

ABSTRACT
This paper builds and estimates a small open-economy Dynamic Stochastic General
Equilibrium (DSGE) model suitable for the evaluation of central bank policy mix, with a
particular application on the Indonesian economy. The model has a rich array of shocks
and frictions, including banking and financial frictions. We illustrate how the estimated
model can be used to investigate the source of aggregate fluctuations in Indonesia and to
evaluate and simulate a policy mix involving monetary and macroprudential policies.
Our Bayesian estimation identifies the COVID-19 pandemic shocks as being mainly a
combination of adverse supply-side (technology) and demand-side (preference and
foreign-output) shocks. We show that a countercyclical capital requirement rule could
be a potent addition to Bank Indonesia’s policy mix arsenal. Despite its rich features,
the model is scalable and can be readily extended for evaluating other types of central
bank policy mix, including monetary-macroprudential-fiscal policy interaction and
the inclusion of Central Bank Digital Currency (CBDC).
Keywords: Central bank policy mix; Integrated policy framework; Countercyclical
macroprudential policy rule; DSGE model for Indonesia; COVID-19 pandemic; Capital
requirement.
JEL Classifications: E12; E32; E58; E61; F41.
Article history:
Received		: May 11, 2022
Revised		: November 11, 2022
Accepted		: April 12, 2023
Available Online		: September 30, 2023
https://doi.org/10.59091/1410-8046.2126

Acknowledgement: We thank Richard Irfan Yusan for excellent research assistance. Comments and suggestions from
seminar participants at Bank Indonesia Institute are gratefully acknowledged. Conclusions, opinions, and views in
this paper are based on the authors’ perspective and do not constitute official conclusions, opinions, and views of
Bank Indonesia.

Published by Bulletin of Monetary Economics and Banking, 2023

1

## Page 3

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
398

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

I. INTRODUCTION
In this paper we build and present an open-economy Dynamic Stochastic General
Equilibrium (DSGE) model for the evaluation of central bank policy mix and its
various implications. We estimate the model on Indonesian data and illustrate
how the estimated model can be used to perform various analyses and policy
simulations. Indonesia offers a unique setting when it comes to central bank policy
mix.1 Since 2010, Bank Indonesia (BI) has implemented a mix of monetary and
macroprudential policies along with capital flow management to support and
achieve its institutional mandate as the central bank of Indonesia. This policy mix
complements the bank’s Inflation Targeting Framework (ITF) in maintaining price
stability consistent with the inflation target, regulating fluctuations in the business
and financial cycles, and mitigating the stability risks arising from macro-financial
linkages.2 The policy mix has been largely successful: during the 2010-2020 period
real gross domestic product grew robustly by 4.6% per year on average and the
inflation rate averaged 4.28% at the annualized rate. Various indicators also show
a sound banking and financial sector — for example, non-performing loans ratio
has been relatively low and stable, averaging 2.5% from 2012-2020.3
Despite this successful implementation, recent events, particularly the
COVID-19 pandemic, have created fresh challenges for BI, or for any central bank
in general. One pressing challenge is on whether the current form of the policy mix
can still be relied upon as the economy enters a new, post-pandemic phase. How
effective is the current policy mix in stabilizing the business cycle fluctuations postpandemic? Should BI include additional policy tools to the current mix? Would
these additional tools be welfare-improving and contribute to economic and
financial system stability? To answer these and other related questions, one would
need a model. Since various parts of the economy are interconnected, the model
would need to be a general equilibrium model. It would need to be a structural
model—as opposed to non-structural, reduced-form models—to be immune
from the Lucas’ critique (Lucas, 1976). Furthermore, the model would need to
be dynamic and stochastic to account for short-to-medium term fluctuations in
various economic time series.
The core of our model is a small open-economy DSGE model along the lines
Gali and Monacelli (2005) and Monacelli (2005), used for example in Lubik and
Schorfheide (2007), Justiniano and Preston (2010), and Lie (2019). To be able to
evaluate BI’s monetary- macroprudential policy mix, however, the model needs
to include financial and banking frictions. We do so by explicitly modelling the
banking sector, i.e., the supply of credit, following the approach of Gerali et al.
(2010). Aggregate fluctuations in the model are driven by a rich array of domestic
and external (foreign) shocks, taken as exogenous by the optimizing agents. Despite
1

2

3

Another term for central bank policy mix is Integrated Policy Framework (IPF), as coined by the
International Monetary Fund (IMF) -see Adrian et al. (2020) and Basu et al. (2020).
BI’s inflation targets are usually established for three-year periods and announced well in advance.
For example, the targets for 2019 (3.5% ±1%), 2020 (3% ±1%), and 2021 (3% ±1%) were officially set
and announced in September 2017. There has been a downward trajectory in the targets during the
ITF period from 2001 onwards. For example, the targets were 9% ±1% in 2003 and 5% ±1% in 2011.
See Bank Indonesia’s (BI) quarterly-published Financial System Statistics (Statistik Sistem Keuangan
Indonesia).

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

2

## Page 4

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

399

its rich features, the model is scalable enough to be estimated using Bayesian
techniques. This allows us to perform various analyses that would otherwise
be infeasible under the standard calibration exercise. For example, as shown in
the paper, we are able to infer from the data (and the model’s restrictions) the
composition of the COVID-19 pandemic shocks hitting the Indonesian economy.
The model can be readily extended to include other features relevant for the
evaluation of possible enhancements to the current policy mix, e.g., involving the
payment systems, the fiscal policy, and a Central Bank Digital Currency (CBDC).
We conduct the following analyses using the estimated model. Based on
the posterior estimates, we first compute the conditional forecast-error variance
decompositions of several key macroeconomic and financial variables. We find
that for all considered forecast horizons, technology, preference, and cost-push
shocks are largely responsible for output growth fluctuations in Indonesia during
our sample period (2005.Q3-2021.Q2), with monetary-policy shocks also play a
non-trivial role. Cost-push shocks are the primary driver of short-term inflation
fluctuations, consistent with the results for many other economies.4 Long-run
inflation fluctuations on the other hand are largely driven by technology shocks.
On credit growth fluctuations, financial shocks and macroeconomic shocks—
technology, cost-push, and monetary-policy—are both important. We also
conduct a historical decomposition analysis based on the estimated (smoothed)
shocks and are able to identify the COVID-19 shocks as being a combination of
adverse supply-side (technology) and demand-side (preference and foreignoutput) shocks. This is an important finding, as it contains useful information for
the policymaker (BI) in order to formulate the best policy response—both in terms
of the best policy mix and the appropriate response size of each policy instrument
in the mix—to the pandemic shocks. In terms of the evaluation of central bank
policy mix, we show that the model can be used to evaluate the effectiveness of a
monetary-macroprudential policy mix wherein the macroprudential policy tool
involves a countercyclical capital-to-asset adjustment rule.5 We show that such a
countercyclical rule could be a potent addition to BI’s policy mix arsenal.
Our paper contributes to the literature on the modelling of the Indonesian
economy using DSGE models. There has been an explosion of research on this
topic, especially in the last decade. Harmanta et al. (2014) build a DSGE model
with financial frictions and use it to simulate shocks to policy interest rate,
reserve requirement, and bank capital. They find that a shock originated in the
banking sector affects business cycle fluctuations and may require a monetary
policy intervention by the central bank. Using an estimated, standard small openeconomy DSGE model, Dutu (2016) investigates the source of fluctuations in
Indonesia’s GDP over the 2004-2014 period and finds that shocks to multi-factor
productivity are the main driver. These supply-side shocks are responsible for
the decrease in the output growth in Indonesia post-2010, compared to in the
preceding decade. Lie (2019) builds and estimates a DSGE model for Indonesia
4

5

See e.g., Smets and Wouters (2007) for the US economy, Smets and Wouters (2003) and Adolfson et al.
(2007) for the Euro area economy, and Copaciu et al. (2015) for the Romanian economy.
The focus of the current paper is on model development. Hence, we do not perform a comprehensive
analysis of monetary-macroprudential policy mix involving other macroprudential policy
instruments, e.g., the loan-to-value (LTV) ratio. We do so in a separate, companion paper.

Published by Bulletin of Monetary Economics and Banking, 2023

3

## Page 5

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
400

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

with observed inflation-target adjustments and shows that such adjustments
by Bank Indonesia play a non-trivial role in the fluctuations of inflation and the
nominal interest rate in Indonesia during the Inflation-Targeting Framework (ITF)
period. Sahminan et al. (2017) construct a small-scale DSGE model calibrated to the
Indonesian economy to analyze the impact of higher government infrastructure
spendings and find non-trivial spending multiplier and effects on output and
welfare. Within an estimated small-scale DSGE model, Zams (2021) shows that
a model with money-holding friction fits the Indonesian data better compared
to the standard cashless model. Habit formation and backward-looking price
indexation, which are standard features in quantitative DSGE models, turn out to
be unimportant during the ITF period. Calibrated DSGE models have also been
used to analyze the impact of macroprudential policy in Indonesia, e.g., Chawwa
(2021) on the impact of reserve requirement and liquidity coverage ratio and
Setiastuti et al. (2021) on the impact of a foreign-to-domestic loan ratio (external
debt management).
Our paper is differentiated by its focus on building a scalable, readily-extended
medium-scale model that can be used to evaluate and simulate any combination
of central bank policy mix.6 This includes not only macroprudential policy, but
also potentially fiscal policy, the payment systems, and the central bank digital
currency. Except for Chawwa (2021) and Setiastuti et al. (2021), which focus on
the interaction between monetary policy and a given macroprudential policy
instrument, none of the aforementioned studies constructs a DSGE model suitable
for evaluating the relative performance of a central bank policy mix, such as that
conducted by Bank Indonesia. Unlike these two studies, however, we estimate
the structural parameters of the model using a Bayesian approach. As we show in
this paper, estimating the model based on actual data allows us to, among others,
identify the source of aggregate fluctuations in the Indonesian economy, including
during the COVID-19 pandemic. Such information is useful for policymakers, e.g.,
for an optimal policy formulation.
We also contribute to the COVID-19 economic literature, particularly on
the identification of the make up of the COVID-19 pandemic shocks within an
aggregate macroeconomic model. To the best of our knowledge, ours is the first
paper that identifies these pandemic shocks within an estimated business-cycle
model for the Indonesian economy. The resulting characterization of the pandemic
shocks—a combination of adverse technology, preference, and foreign-output
shocks-is broadly consistent with those assumed or estimated in various studies
in the literature focusing on other countries. These studies (e.g., Eichenbaum et al.
(2020), Faria-e Castro (2020), Fornaro and Wolf (2020), McKibbin and Fernando
(2021), Cardani et al. (2021)) typically treat or identify the pandemic shocks as a
combination of large adverse supply-side and demand-side shocks. We uniquely
find, however, that the supply-side (technology) shocks are dominant when it
comes to the Indonesian economy. In a broader context, our paper is also related
to various studies investigating the influence of COVID-19 on the Indonesian
economy. These studies typically focus on empirically examining the impact of
6

As such, we also contribute to recent efforts to build quantitative models for the evaluation of an
integrated policy framework (see the IMF papers, Adrian et al. (2020) and Basu et al. (2020)).

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

4

## Page 6

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

401

COVID-19 using non-structural, partial-information regression models, see e.g., Ali
et al. (2021), Haldar and Sethi (2021), and Rizvi et al. (2021) regarding the impact on
the stock market, Iyke et al. (2021) regarding the impact on industrial productivity,
or Prabheesh et al. (2021) regarding the implication on the effectiveness of monetary
policy transmission. Our paper complements those studies by first identifying the
COVID-19 shocks from a structural, full-information (DSGE) model, and then
examining the impact of these shocks on the fluctuations of aggregate, businesscycle variables such as inflation and output. Similar to these studies, we show that
COVID-19 has a non-trivial, negative impact on the Indonesian economy.
Finally, our paper also complements previous studies on Bank Indonesia’s
central bank policy mix and coordination using other, non-DSGE approaches,
particularly involving the interaction between monetary and macroprudential
policies (Utari et al. (2012), Harmanta et al. (2012), Wimanda et al. (2012; 2014),
Purnawan and Nasir (2015), Simorangkir and Purwanto (2015), Warjiyo (2017)).
Recent studies on policy mix in Indonesia also investigate the interaction
between monetary and fiscal policy (Rizvi et al., 2021; Juhro et al., 2022) and the
possible implications of a CBDC issuance (Harahap et al., 2017; Zams et al., 2019;
Syarifuddin and Bakhtiar, 2021). As mentioned above, a differentiating factor of
our paper is with regard to the development of a general, estimable DSGE model
for Indonesia that can be readily extended to evaluate the relative performance
of various policy mix combinations. As such, our model can be applied to verify
the findings in those previous studies and to extend their analysis. For example,
similar to Wimanda et al. (2012) and Purnawan and Nasir (2015), we find that a
macroprudential policy instrument-bank capital requirement ratio in our paperthat reacts countercyclically to credit growth complements monetary policy in
stabilizing the financial and credit cycle. Further to this, the general equilibrium
nature of our model also means that the model can be used to analyze the relative
performance of various combinations of Bank Indonesia’s policy mix and obtain
the welfare implication.
The rest of the paper proceeds as follows. Section II presents the DSGE model.
Section III describes the data and the Bayesian estimation procedure and presents
the posterior estimates. Section IV computes the implied forecast-error variance
decompositions and historical decompositions, given the data and the model’s
restrictions. In Section V, we illustrate the usefulness of the model in evaluating
the relative performance of a monetary-macroprudential policy mix. Section VI
concludes.
II. THE DSGE MODEL: DESCRIPTION AND DERIVATION
The model has two economies: the domestic (home) economy, i.e., the small open
economy of interest, and the foreign economy. The domestic economy is small
relative to the foreign economy (rest of the world) in a sense that shocks originated
in the domestic economy negligibly affect the foreign economy. Foreign shocks,
however, propagate to the domestic economy in a non-trivial way. There are 8 types
of agents in the domestic economy: households, goods-producing entrepreneurs,
domestic-goods retailers, import-goods retailers, capital goods producers,
financial intermediaries (banks), the government and the central bank. Aggregate
Published by Bulletin of Monetary Economics and Banking, 2023

5

## Page 7

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
402

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

fluctuations are driven by 15 stochastic disturbances. 12 of these disturbances
or shocks can be considered as macroeconomic shocks: technology, preference,
domestic and import cost-push, monetary-policy, housing-demand, investment,
government-spending, risk-premium, foreign output, foreign inflation, and
foreign interest-rate shocks. The rest of the shocks are financial: shocks to bank
balance sheet and Loan-To-Value (LTV) ratios of loans to firms and households.
We next describe each economic agent’s decision problem.
A. Households
There are two types of households: patient (type P) and impatient (type I). While
both types of households are utility-maximizers, type P households are assumed
to have a higher subjective discount factor (βP>βI), as is common in heterogeneous
agent models. Each type faces a different budget constraint, reflecting their
different degree of impatience.
A.I. Patient Households
Any given (representative) type-P household i maximizes
(1)
where ctP(i),htP(i),ntP(i),εz,t and εh,t denote the household’s choice of consumption
amount, housing demand, labor hours, the aggregate consumption preference
shock, and the housing-demand shock, respectively. The aP cPt-1 term represents
the type-specific external habit. The parameters aP,σ and ϕ are the degree of habit
formation, inverse elasticity of intertemporal substitution, and inverse Frisch labor
supply elasticity, respectively. The aggregate consumption good ctP is a composite
of home- and foreign-produced goods,
(2)
where ω is the share of foreign-produced goods in the consumption basket (i.e.,
the degree of openness) and η is the elasticity of substitution between home and
foreign produced goods. Each of cPH,t and cPF,t is a standard Constant Elasticity of
Substitution (CES) aggregation of intermediate home-produced and imported
varieties, respectively, with a common elasticity ε. Note that we drop the index
i in (2) because all type-P households are identical, ex-post. The expected-utility
maximization above is subject to the following flow budget constraint (in real
terms and dropping the index i):

(3)
https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

6

## Page 8

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

403

Here, qtP,dtP,et,wtP,rtd,πt and ttP denote the real house price, real domestic-currency
deposits, nominal exchange rate (home-currency price of foreign currency), real
wage, interest rate on domestic-currency deposits, gross consumer-price inflation
rate (πt=Pt/Pt-1) and lump-sum government taxes or transfers, respectively. Γt are
transfers that include profits and dividends from domestic firms (producers),
importers, and banks, all owned by type-P households. We assume that in addition
to making domestic-currency deposits in each period, type-P households can also
invest in foreign one-period bonds in the amount of etdt*, paying interest rate rt*.7
Following Kollmann (2002) and Schmitt-Grohe and Uribe (2003), this holding of
foreign bonds is subject to a debt-elastic interest rate premium,
(4)
where x­is a scale parameter and at≡et dt*/y̅ is the real quantity of foreign debt
outstanding (in domestic-currency unit) as a fraction of steady-state output, y̅. ςt
can be interpreted as a relative risk premium: holding other things constant, as at
increases foreign bonds are more risky compared to previously, resulting in lower
ςt. This foreign-exchange risk premium is subject to a risk-premium ες,t. The firstorder conditions associated with the type-P households’ problem are:
(5)
(6)
(7)
(8)
(9)
where λtP is the associated Lagrange multiplier of the type-P households’
maximization problem. By combining (8) and (9) one can obtain the standard
(non-linear) uncovered interest-parity (UIP) equation,
(10)

7

For simplicity, we assume that patient households can purchase these (foreign-currencydenominated) foreign bonds directly in the international financial markets, without having to go
through the domestic banking system.

Published by Bulletin of Monetary Economics and Banking, 2023

7

## Page 9

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
404

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

A.II. Impatient Households
Each impatient (type-I) household i maximizes
(11)
subject to real flow budget constraint
(12)
Hence, type-I households have a similar preference to type-P households, in a sense
that their utility increases with consumption and housing services but decreases
with their labor effort. Both household types also have external habit formations,
but with potentially different habit parameters (aP,aI∈[0,1]), and are subject to
the same consumption preference and housing demand shocks, εz,t and εh,t. They
are, however, differentiated by their subjective discount factor (βI<βP) and their
saving decision. Type-I households’ consumption spending and accumulation of
housing services have to be financed with labor income (wtI ntI) and borrowing
or loans from banks (btI). Loans issued at time t-1 have to be paid at time t with
(nominal) interest rate
. In addition to the budget constraint (12), households
face a borrowing or collateral constraint in the spirit of Kiyotaki and Moore (1997)
and Iacoviello and Neri (2010):
(13)
mtI is the loan Loan-To-Value (LTV) ratio of loans to households (or mortgages),
which we assume to be exogenous and follows an AR(1) process in the baseline
model for estimation. ttI are real government transfers or taxes. Note that the final
consumption index ctI(i) is aggregated in the same way as in the patient households
case (see (2)). For simplicity, we assume that type-I households do not have direct
access to the international financial markets and hence do not invest in foreign
bonds. Denoting λtI as the multiplier attached to the constraint (12) and ΩtI as
the multiplier attached to the constraint (13), we have the following first-order
conditions with respect to ctI(i),htI(i),ntI(i) and btI(i):
(14)
(15)
(16)
(17)

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

8

## Page 10

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
405

An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

B. Entrepreneurs and Domestic Wholesale Goods Production
Entrepreneurs in the model are responsible for the production of domestic
wholesale, intermediate goods y using the production function ytE using the
production function
(18)
where εtα is the exogenous aggregate level of technology (total factor productivity),
is the physical capital input, and ntE(i) composite labor input that include
labor inputs from type-P households, ntE,P(i), and from type-I households ntE,I(i),
(19)
Each entrepreneur i in each period t chooses the amount of consumption ctE(i),
capital ktE(i), labor inputs ntE,P(i) and ntE,I(i) loans from banks btE(i) to maximize the
expected utility8
(20)
subject to the (real) budget constraint

(21)
and a collateral constraint
(22)
Hence, in addition to the proceed from the sale of wholesale goods
, entrepreneurs may also borrow from banks to finance
the production of goods and their own consumption ctE (a composite consumption
index similar to (2)). The amount of the borrowings plus the interest payments,
(1+rtbE) btE, cannot exceed the expected value of existing capital, used as a collateral
for the loans. Here, in (22), mtE is the LTV ratio of the loans to firms, qtk is the market
price of capital, and δ is the capital depreciation rate. We also assume that the
labor markets are perfectly competitive and there is no friction in wage setting (i.e.
8

We also assume implicitly that entrepreneurs have a unit measure (γE=1), just as we assume unit
measures for patient and impatient households (γP=γI=1).

Published by Bulletin of Monetary Economics and Banking, 2023

9

## Page 11

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
406

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

flexible wages). This means that the real wages of type-P and type-I labor, wtP and
wtI are equal to their respective marginal rate of substitution between consumption
and labor. Entrepreneurs are also assumed to only be able to borrow from banks
in domestic currency and are therefore not exposed to exchange rate fluctuations
in their borrowing activity.9 For the first-order conditions of the entrepreneurs’
problem, we refer the reader to the online technical appendix of the paper.
C. Domestic Final Goods Retailers
There is a continuum of monopolistically-competitive retailers in the economy,
indexed by j∈[0,1]. These retailers buy intermediate goods from domestic
producers (entrepreneurs) at wholesale price Ptw, differentiate them at no cost,
and sell the differentiated retail goods to patient and impatient households and
entrepreneurs, and government for consumption purpose. These goods are
also purchased by capital producers to create new capital goods and by foreign
households for consumption purpose. Denoting PH,t(j) as the nominal price of
good or variety j and PH,t as the aggregate domestic producer (retailer) price index,
the total demand for any given variety j at time t is given by
(23)
I
*
where yH,t=cPH,t+cH,t
+cEH,t+it+gt+cH,t
is the is the aggregate demand for domesticallyproduced retail goods, comprising of demands from domestic household (cPH,t+cIH,t),
entrepreneurs (cPH,t), capital producers (it), the government (gt), and foreign
households (c*H,t).10
Retailers face an infrequent opportunity to optimally reset their prices, based
on the standard Calvo (1983) setup. Here, only a (1-θH)∈[0,1] fraction of the retailers
are allowed to optimally adjust their prices at any given time period. Retailers that
are not allowed to adjust optimally, with probability θH, are assumed to index
their prices according to the indexation rule

(24)
where πH,t-1≡PH,t-1/PH,t-2 is the lagged (time t-1) domestic producer-price inflation
and π̅H is the steady-state domestic producer-price inflation. δH is the degree of
indexation to past inflation.11 The profit-maximization problem of the “optimalprice” retailers is thus given by
(25)
See e.g., Setiastuti et al. (2021) for a model in which entrepreneurs can also borrow from abroad.
Each of these consumption indexes is a CES aggregation of all available domestic goods varieties
j∈[0,1], with a common elasticity ε.
11
(24) is a commonly-applied price indexation mechanism in the literature see e.g., Adolfson et al.
(2007) and Feve et al. (2010).
9

10

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

10

## Page 12

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

407

with

(26)

Here, QPt,t+k is the stochastic discount factor of patient households (who own the
retailers) between time t and t+k and P̃ H,t is the time-t optimal price. After solving
the maximization problem and log-linearizing the first-order condition (see the
paper’s technical appendix), we can obtain the (New Keynesian) Phillips curve
equation for domestic-price inflation,
(27)
is a measure of retailers’ real marginal cost.12 We add a
where π̂ H,t≡πH,t-π̅ H and
H
cost-push shock ε̂ t in (27) to capture inefficient variations in retailers’ markups.
D. Importers
Import-goods retailers import foreign differentiated goods from abroad to be sold
in the domestic market. We assume that the law of one price holds at the docks
for these goods. However, importers are assumed to have some market power
(monopolistically competitive) and hence, can charge a markup over the original
purchase price. This setup means the law of one price does not hold at the retail
level. We also assume that the import retail goods are only purchased for the
purpose of consumption by patient and impatient households and entrepreneurs,
which means an importer j∈[0,1] faces a demand function.
(28)
where PF,t(j) is the nominal domestic-currency price of import goods j and
represents the aggregate demand for these goods from
households
and entrepreneurs
.13 These importers face a Calvo
pricing problem with an optimal-price reset probability (1-θF)∈[0,1]. With
probability θF, they fully index their prices to a mixture of past import-price
inflation πF,t-1=PF,t-1/PF,t-2 (with indexation degree δF) and the steady-state importprice inflation π̅ F, in a similar manner to domestic-goods retailers in (24). We could
12

To be more precise,

, where τ̂ t is the log deviation of the real price of wholesale goods

and log deviation of the wedge between producer and consumer price (vt≡PH,t/Pt) from their
respective steady-state values.
13
Implicit in (28),
, and
are each a CES aggregation (with elasticity ε) of all import goods
j∈[0,1]. Here, we drop the index i for households.

Published by Bulletin of Monetary Economics and Banking, 2023

11

## Page 13

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
408

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

then solve a similar profit-maximization problem as in (25) and obtain a (loglinearized) Phillips curve equation for import-price inflation,
(29)
Here π̂ F,t≡πF,t-π̅ F and ε̂ tF is an (import-goods) cost-push shock. The relevant measure
of real marginal cost for importers is the law of one price (LOP) gap,

,

i.e. the gap between domestic-currency price of import goods at the dock, e P (P
is the foreign-currency price of these goods), and the aggregate domestic-currency
import price at the retail level, PF,t.14 ψ̂ F,t in (29) is the log deviation of ψF,t from the
steady-state value.
*
t F,t

*
F,t

E. Banks and Banking Frictions
The setup of banks and the banking frictions is largely identical to that in Gerali
et al. (2010). Here, we only describe main, selective elements of the banking sector.
For more detailed descriptions and derivations, we refer the reader to Gerali et al.
(2010) and the technical appendix of our paper. Each bank’s operation comprises a
wholesale unit, which manages the bank’s balance sheet position, and retail units
responsible for collecting deposits and issuing loans. The wholesale unit operates
in a perfectly-competitive setting and needs to ensure that the balance-sheet
constraint
(30)
is satisfied in each period. Here, Bt is the bank’s assets (total loans issued), Ktb
is bank capital, and (1-θt)Dt is the bank’s liabilities (deposits collected) net the
required reserve. Banks are required to hold cash reserves at the central bank in
the amount of θtDt, where θt is the reserve requirement ratio. We assume that
banks do not hold excess reserves and these reserves pay no interest. To maintain
the balance-sheet position, the wholesale unit may accumulate bank capital out of
retained earnings
:
(31)
where εtKb is a balance-sheet shock. The bank capital depreciation rate δb can be
thought as the cost of managing and operating the wholesale unit. The wholesale
unit also has a target capital-to-assets ratio vt=v̅ , which we assume to be constant
(and exogenous) in the baseline model. Whenever the actual capital-to-assets ratio
Ktb/Bt deviates from the target value vtb, the bank is required to pay a quadratic
adjustment cost (Rotemberg, 1982) that is proportional to the level of bank capital:

14

ψF,t=1 if the law of one price also holds at the retail level (since

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

).

12

## Page 14

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

409

(32)
with κKb is the cost scale parameter. The two retail units operate in a monopolisticallycompetitive setting and also face quadratic costs of adjusting the deposit rate and
the loan rates. This setup means the following: (i) all the retail rates are sticky; (ii)
the retail deposit rate is a markdown from the wholesale rate; and (iii) the loan
rates are a markup over the wholesale rate. We relegate the details of the profitmaximization problems of the retail units to the paper’s technical appendix and
only present here the resulting (log-linearized) optimal retail deposit rate (r̂ td) and
retail loan rates (r̂ tbs,s∈{H,E}):
(33)
and
(34)
where s∈{H,E}, each for loans to households and loans to entrepreneurs. The
parameters κd,κbH, and κbE govern the size of the adjustment cost for the deposit
rate, the loan rate to households, and the loan rate to firms, respectively, and
hence, govern the stickiness of these rates. The elasticities εd,εbH, and εbE directly
influence the degree of monopoly power in the banking sector and hence, the size
of the deposit rate markdown and loan rate markups. R̂ td is the wholesale deposit
rate and R̂ tb is the wholesale loan rate.
F. Capital Goods Producers
Physical capital, used in the wholesale goods production by entrepreneurs, are
produced by perfectly-competitive capital goods firms. These firms are owned by
entrepreneurs. In each period, they buy back the previous-period undepreciated
capital from entrepreneurs, produce new capital, and then sell the new amount of
capital at market price qtk back to entrepreneurs to be used for goods production
(see the budget constraint (21)). They produce new capital from final domestic
goods (with one-to-one conversion), subject to a quadratic adjustment (installment)
cost. Specifically, physical capital accumulates according to

(35)

where κi is the adjustment cost scale parameter and εtqk is an investment adjustment
or efficiency cost. These firms solve the following problem:
Published by Bulletin of Monetary Economics and Banking, 2023

13

## Page 15

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
410

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

(36)
subject to (35).

is the entrepreneurs’ (who own the capital

producers) stochastic discount factor between time t + j and t (j ≥ 0). Solving this
maximization problem and combining the resulting first-order conditions yields
the following efficiency condition:

(37)
G. The Central Bank and Government (Monetary, Macroprudential, and Fiscal Policies)
The central bank is assumed to conduct monetary policy according to a Taylortype rule
(38)
Here, ϕR is the degree of interest-rate smoothing and ϕπ,ϕy,ϕ∆y, and ϕe are the
feedback coefficients on inflation deviation from the target
deviation
depreciation

, the growth rate of output

, the output level

, and the nominal exchange-rate

, respectively.15 εtr is the (unsystematic) monetary-policy shock.

In the baseline model for estimation, we assume that the central bank does not
conduct any active macroprudential policy. That is, the target capital-to-assets
ratio (or capital requirement ratio (CR)) vt≥0 is assumed to be constant. The
reserve requirement θt, which is traditionally a monetary policy instrument, is
also assumed to be constant, equal to θ̅ ≥0.16 The two LTV ratios mtI and mtE, which
in principal could be regulated by the central bank, are each assumed to follow an
exogenous AR(1) process. In terms of fiscal policy, we simply assume government
spending gt follows an AR(1) process

We assume that the central bank can only influence nominal exchange rate fluctuations through its policy
interest-rate management, based on the Taylor rule (38). In practice, central banks may also intervene
in the foreign exchange market using other means such as through capital flow management - we
leave this extension for future research.
16
In spite of this assumption, any change in the capital requirement or in the reserve requirement ratio
would be captured in the estimation (in a reduced-form fashion) by the balance-sheet shock εtqk.
15

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

14

## Page 16

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

411

(39)
where ηg,t ~ i.i.d.N(0,σg2) is the government-spending shock. While (39) is by no
means an accurate representation of the Indonesian government’s fiscal policy,
it could still capture important developments in government spending such as
fiscal subsidies in response to the COVID-19 pandemic, provided that actual
government spending data are used in the model estimation.
H. Aggregations, Market Clearing and Other Equilibrium Conditions
H.I. Resource Constraint
Aggregating across agents, the domestic goods market-clearing condition is given
by
(40)
where ct=ctP+ctI+ctE is aggregate domestic consumption, qt is the real exchange rate,
and yt* is foreign output (GDP). vt≡PH,t/Pt is the wedge between aggregate producer
price PH,t and consumer price Pt, which is related to the real exchange rate qt, terms
of trade St (ratio of import prices to export prices) and the LOP gap ψF,t through
(41)
Aggregate price level restriction implies
(42)
Given the production function (18) and CES demand functions, the aggregate
technology restriction is
(43)
where ∆t denotes a measure of price dispersion (relative-price distortion) or
domestically-produce goods. This dispersion can be expressed recursively as
(44)
given the Calvo setup.
H.II. Banking Aggregates and Housing
In equilibrium, we have Bt=btI+btE and Dt=dtP. Housing is assumed to be in fixed
supply (h̅ ), so that htP+htI=h̅ . Other relevant equilibrium conditions are provided in
the technical appendix.

Published by Bulletin of Monetary Economics and Banking, 2023

15

## Page 17

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
412

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

I. Stochastic Processes and the Foreign Economy
Except for the monetary-policy shock εtr which is assumed to be i.i.d., all the other
exogenous shock processes are assumed to follow an AR(1) process. For example,
the technology shock follows
(45)
with ηa,t ~ i.i.d.N(0,σa2). Finally, following Justiniano and Preston (2010) and Lie
(2019), we assume that the foreign economy, which is exogenous to the domestic
economy, is sufficiently characterized by a vector autoregressive process of order
two in foreign inflation πt*, foreign output yt* and foreign nominal interest rate rt*.
III. ESTIMATION PROCEDURE AND RESULTS
We estimate the structural parameters of the model using a Bayesian approach.
This approach also allows us to identify the structural shocks hitting the economy
during the sample period—including the COVID-19 pandemic shocks—implied by
the data and model restrictions. The model’s equilibrium equations are linearized
and fitted to 14 quarterly macroeconomic and financial time series (observables)
over the 2005.Q3-2021.Q2 period, with the starting period of the sample coincides
with the formal implementation of an Inflation Targeting Framework (ITF) by
Bank Indonesia.17 11 of the observables consist of Indonesian (domestic) time
series: the log difference of real GDP, real investment, real government spending,
real exchange rate, terms of trade, real housing price, real deposits, real loans to
households and real loans to firms, consumer-price inflation rate (% per year), and
the Bank Indonesia (BI) rate (% per year). Foreign time series—proxied by US real
GDP (in log difference), inflation rate (log difference in GPD deflator), and the
federal funds rate—make up the rest of the observables.18 More information on
the linearized equations, the data and measurement equations is provided in the
technical appendix.
A. Calibrated Parameters and Prior Distributions
Table 1 reports the values of those parameters that are calibrated.19 The patient
households’ discount factor βP is calibrated to 0.9942 in order to match the average
inflation rate and BI rate in our sample. The other two discount factors βI and
βE, along with patient households’ labor income share μ and housing weight in
the utility function εh, are set as in Gerali et al. (2010). Both the inverse elasticity
Bank Indonesia (BI) has formally adopted an Inflation Targeting Framework (ITF) since 2005. In
2011 BI started implementing a more flexible ITF, which has been further developed into a more
integrated Central Bank Policy Mix (CBPM). While the CBPM is currently the main policy strategy,
BI continues to rely on inflation targeting as the main objective of monetary policy (Juhro and
Goeltom (2015) and Warjiyo and Juhro (2019)).
18
Note that all these time series are already stationary, hence there is no need to demean or filter them.
19
Some of the parameters, e.g., the elasticity ε, are not identified in the linearized model used in the
estimation.
17

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

16

## Page 18

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
413

An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

of intertemporal substitution σ and Frisch labor supply elasticity ϕ are set to 1,
as is standard (σ=1 is consistent with the balanced growth path). The openness
parameter, ω, is set equal to the average share of imports and exports as a fraction
of GDP in our sample. η=1.4 is consistent with the posterior mean estimate of the
elasticity of substitution between domestic and imported goods in Lie (2019). The
risk-premium scale parameter χ is calibrated as in Justiniano and Preston (2010).
The calibrated values of capital share in production α, capital depreciation rate
δ, and goods market elasticity ε are commonly used in the literature. We also
calibrate the Taylor rule’s smoothing parameter to ϕR=0.75, which is consistent
with the posterior mean in Harmanta et al. (2014) for the Indonesian economy. The
steady-state inflation rate and government spending-to-output ratio are consistent
with the upper end of Bank Indonesia’s inflation target in 2021 (3±1% per annum)
and the average spending-to-output ratio in our sample, respectively.20
Table 1.
Calibrated Parameters
This table presents the calibration of the non-estimated structural parameters of the model --- the rest of the parameters
are estimated using a Bayesian method (see Table 2). Impatient households’ and entrepreneurs’ habit coefficients are
set equal to patient households’ (aI = aE = aP). The measure of each agent is set to unity.

Description

Parameter

Value

βP
βI
βE
μ
εH
σ
ϕ
ω
η
χ
α
δ
ε
ϕR
π̅
g̅ /y̅
mI
mE
v̅
εd
εbH
εbE
δb
ϱb
θ

0.9942
0.975
0.975
0.80
0.20
1
1
0.22
1.40
0.01
0.30
0.05
6
0.75
1%
0.085
0.70
0.45
0.086
-6.54
1.80
2.08
0.24
1
0.065

Patient HHs’ subjective discount factor
Impatient HHs’ subjective discount factor
Entrepreneurs’ subjective discount factor
Labor income share of patient HHS
Housing weight in HHs’ utility
Inv. elas. of intertemporal substitution
Inverse Frisch elas. of labor supply
Share of imports in consumption basket
Elas. of subs. domestic and imported goods
Risk-premium scale parameter
Capital share in goods production
Physical capital depreciation rate
Goods market elasticity (markup)
Taylor rule’s int. rate. smoothing
Steady-state quarterly net inflation rate
Steady-state govt. spending-to-output ratio
Impatient HHs’ steady-state LTV ratio
Entrepreneurs’ steady-state LTV ratio
Target capital-to-assets ratio
Deposit rate elasticity (markdown)
Loan rate to HHs elasticity
Loan rate to entrepreneurs elasticity (markup)
Bank’s capital depreciation rate
Bank’s retained earnings ratio
Steady-state required reserve ratio
20

The average inflation rate in our sample (2005.Q3-2021.Q2) is 5.2% per annum.

Published by Bulletin of Monetary Economics and Banking, 2023

17

## Page 19

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
414

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

Regarding the financial market parameters, we do not have reliable information
on aggregate LTV ratios in Indonesia (there is no specific regulation on these
ratios). Hence, we set mI=0.7 as in Gerali et al. (2010) and mE=0.45, which is the
mid value of the calibration used in Gerali et al. (2010) and in Chawwa (2021). The
value of the target capital-to-assets ratio v is in line with the average capital-toasset ratio in Indonesia. The elasticity parameters {εd,εbH,εbE} which determine the
markdown on deposit rate and the markups on loan rates, are consistent with the
interest rates on deposits and loans to households and firms in our sample. The
calibrated value of the depreciation rate of bank capital (or cost for managing the
bank’s capital position) ensures that the steady-state bank’s capital-to-asset ratio is
equal to the target (0.086). Finally, we set the steady-state required reserve ratio to
θ̅ =0.065, consistent with the average reserve requirement ratio in Indonesia.
Table 2 contains information on our priors for estimation. Overall, these priors
are standard and commonly used in the literature. The priors for investment,
deposit and loan rates, and bank leverage adjustment cost parameters follow
those in Gerali et al. (2010). We use identical priors as in Lie (2019) for the rest
of the structural parameters. As for the exogenous processes, the autoregressive
coefficients and standard errors are assumed to follow Beta and Inverse-Gamma
prior distributions, respectively.
Table 2.
Prior and Posterior Distribution of Estimated Structural Parameters
This table presents the prior distribution and the posterior distribution of the estimated structural parameters of the
model, based on the Bayesian method. The sample period is 2005.Q3-2021.Q2. The three foreign variables (US output,
inflation, and nominal interest rate) are assumed to follow VAR(2). The posterior distribution is obtained using the
Metropolis-Hastings algorithm with 5 MCMC chains of 100,000 draws each - the target acceptance rate is between
23.4%-30% and the first 40% of the draws in each chain are discarded as initial burn-in.

Parameter

Distr.

Mean

St.
Dev.

Posterior
Distribution
95% Prob.
Mean
Int.

βP

Beta

0.50

0.25

0.24

[0.09, 0.39]

δH

Beta

0.50

0.25

0.19

[0.04, 0.41]

δF

Beta

0.50

0.25

0.04

[0.00, 0.09]

θH

Beta

0.60

0.10

0.65

[0.58, 0.72]

θF

Beta

0.60

0.10

0.59

[0.54, 0.64]

ϕπ
ϕy

Gamma
Gamma

1.90
0.25

0.30
0.13

1.33
0.18

[1.18, 1.46]
[0.12, 0.25]

Gamma

0.25

0.13

0.25

[0.16, 0.35]

ϕe

Gamma

0.25

0.13

0.20

[0.13, 0.26]

κi
κd
κbE

Gamma
Gamma
Gamma

2.50
8.00
6.60

1.00
2.50
2.50

8.76
6.64
1.81

[8.24, 9.30]
[4.66, 9.00]
[0.79, 2.95]

Prior Distribution
Description
Habit coefficient (patient household)
Index. to past inflation, domestic
firms
Index. to past inflation, importers
Calvo price stickiness, domestic
firms
Calvo price stickiness, importers
Taylor rule coefficients
inflation
output
output growth
exchange rate
Adjustment costs
investment
deposit rate
firm loan rate

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

18

## Page 20

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

415

Table 2.
Prior and Posterior Distribution of Estimated Structural Parameters (Continued)

Parameter

Distr.

Mean

St.
Dev.

Posterior
Distribution
95% Prob.
Mean
Int.

κbH
κKb

Gamma
Gamma

5.70
10.0

2.50
5.00

7.59
7.59

[5.85, 9.52]
[5.23, 10.01]

ρa
ρz
ρH
ρF
ρζ
ρqk
ρh

Beta
Beta
Beta
Beta
Beta
Beta
Beta
Beta
Beta
Beta
Beta

0.80
0.80
0.50
0.50
0.80
0.80
0.80
0.80
0.80
0.50
0.80

0.10
0.10
0.25
0.25
0.10
0.10
0.10
0.10
0.10
0.25
0.10

0.99
0.68
0.32
0.75
0.48
0.56
0.98
0.97
0.97
0.45
0.79

[0.98, 0,99]
[0.62, 0.76]
[0.15, 0.46]
[0.63, 0.83]
[0.34, 0.58]
[0.50, 0,64]
[0.97, 0.99]
[0.95, 0.99]
[0.94, 0.99]
[0.32, 0.58]
[0.71, 0.86]

InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma
InvGamma

0.50
0.50
0.50
0.50
0.50
0.50
0.50
0.50
0.50
0.50
0.50
0.50
0.50
0.50
0.50

inf.
inf.
inf.
inf.
inf.
inf.
inf.
inf.
inf.
inf.
inf.
inf.
inf.
inf.
inf.

0.77
7.17
3.36
6.65
3.47
3.89
3.94
2.33
1.37
10.73
4.54
0.54
1.55
0.30
0.12

[0.44, 1.15]
[5.49, 9.10]
[2.62, 4.13]
[5.40, 7.88]
[0.12, 5.81]
[3.22, 4.60]
[1.96, 6.09]
[1.89, 2.79]
[1.11 1.66]
[9.14, 12.33]
[3.82, 5.26]
[0.43, 0.66]
[1.29 1.81]
[0.24, 0.35]
[0,10, 0.14]

Prior Distribution
Description
households loan rate
bank leverage
Exogenous (shock) processes
Autoregr. coefficients
technology
preferences
domestic cost-push
import cosh-push
risk premium
investment adj.
housing demand
firms’ LTV
HHs’ LTV
banks’ capital
govt. spending
Standard deviations (%)
Technology
Preference
domestic cost-push
import cost-push
risk premium
investment adj.
housing demand
firms’ LTV
HHs’ LTV
banks’ capital
govt. spending
mon. policy
foreign output
foreign inflation
foreign interest rate

ρKb
ρg
σa
σz
σH
σF
σζ
σqk
σh

σKb
σg
σr

B. Posterior Estimates
The last two columns of Table 2 report the posterior mean, along with the [5.95]%
probability bands. Overall, the data appears to be quite informative on virtually all
the parameters and the stochastic disturbances, as indicated by the lower variances
of the posterior distributions over the prior distributions across the board. On the
behavioral parameters, the patient households’ habit parameter is relatively low
(0.24 at the posterior mean), largely consistent with the finding in Zams (2021)
and Lie (2019). The mean estimates of the two price indexation parameters are
Published by Bulletin of Monetary Economics and Banking, 2023

19

## Page 21

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
416

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

smaller compared to the corresponding estimates in Lie (2019), suggesting that
indexation is not an important feature of the Indonesian economy during the ITF
period. The two Calvo price stickiness parameters are both higher than those in
Lie (2019), e.g., our Calvo domestic price stickiness parameter (probability of nonoptimal price adjustment θH) has a posterior mean of 0.65 versus 0.6 in Lie. Hence,
the additional frictions imposed in our model appear to non-trivially affect the
structural parameter estimates. 21
On the Taylor-rule parameters, the mean estimate of the inflation response
ϕπ is estimated to be 1.33, which is on the low side compared to other estimates
using the Indonesian data (e.g., Harmanta et al., 2014; Dutu, 2016; Lie, 2019).
This again highlights the importance of the additional frictions imposed in our
model. Consistent with that in Lie (2019), however, we estimate a higher response
coefficient on the output growth (ϕ∆y) than the response on the output level (ϕy).
The non-zero mean estimate of ψe implies that Bank Indonesia appears to engage
in some degree of exchange rate interventions during the ITF period through the
management of its policy rate. On the adjustment costs, all five of them appear to
be non-trivial, i.e. each has a non-zero posterior mean and the [5.95]% probability
band does not include zero. This suggests the existence of non-trivial frictions in
the capital market and in the banking sector.
In terms of the posterior distributions of the stochastic disturbances, one
striking finding is regarding the very high persistence of the technology shocks:
the posterior mean is 0.99 with a quite tight probability band. This is a much
higher estimate compared to that in Lie (ρa=0.56), albeit with a higher posterior
mean standard deviation than ours (σa=2.94% vs.0.77%). Housing-demand
shocks are also estimated to have high mean persistence and standard deviation.
However, these shocks appear to only materially affect the variations in the credit
growth and have little effect on the fluctuations of macroeconomic variables (see
the discussion on forecast-error variance decomposition in the next section).
Preference shocks are estimated to have a moderate level of persistence (ρz=0.68),
but with a relatively high standard deviation (σz=7.17%). Financial shocks appear
to have high persistence, particularly the two LTV shocks.
IV. MODEL APPLICATION: IMPLICATIONS ON THE SOURCE OF
AGGREGATE FLUCTUATIONS
In this section we apply the estimated model to conduct two analyses regarding
the source of aggregate fluctuations in the Indonesian economy. The first analysis
concerns conditional, forecast-error variance decompositions, which address the
question of which shocks are the main driving forces for each variable. Here, we
limit the discussion to the driving forces of output growth, inflation, nominal
(policy) interest rate, and credit growth. In the second analysis we compute
the historical contribution (decomposition) of each shock, which allows us to
determine the make up of the COVID-19 pandemic shocks.
21

Compared to the model in Lie (2019), our model has additional financial and banking frictions
and physical capital accumulation. We do not, however, incorporate time-varying inflation target
adjustments.

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

20

## Page 22

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

417

A. Forecast-Error Variance Decompositions
Table 3 reports the posterior mean forecast error variance decompositions of
several key endogenous variables-output (GDP) growth, inflation, the monetary
policy interest (BI) rate, and credit growth-at various horizons. Out of the macro
shocks, technology, preference, and cost-push shocks are largely responsible for
output growth fluctuations.22 The combined contributions of these three shocks
range from 69-73% in the considered forecast horizons. Monetary-policy shocks
play some role, but their contributions are less than 10%. The other macro shocks
do not appear to be materially important. Financial shocks’ contributions are nontrivial: even at 10-year (40-quarter) forecast horizon, they are responsible for 16%
of the fluctuations in the output growth.
Table 3.
Forecast Error Variance Decompositions
This table presents the forecast error variance decompositions of selective aggregate variables, based on the posterior
mean estimates. All entries are in %. Cost-push shocks include both domestic and import cost-push shock. Financial
shocks include LTV shocks and balance-sheet shock. Foreign shocks include foreign-output, foreign-inflation, foreign
interest-rate, and exchange-rate risk premium shocks. Sample period: 2005.Q3-2021.Q2.

Horizon
CostHousing Govt.
Monetary
(Quarters Technology Preference
Investment
Financial Foreign
push
Demand Spending Policy
Ahead)
Output Growth
1
18.90
4
21.34
10
21.49
20
21.68
40
21.77
Inflation
1
20.64
4
37.59
10
53.52
20
71.38
40
86.28
Int, (Policy) Rate
1
33.59
4
56.69
10
77.07
20
86.29
40
92.89
Credit Growth
1
1.00
4
19.96
10
27.00
20
32.04
40
34.57
22

32.95
29.38
29.28
29.20
29.16

22.74
18.06
18.18
18.13
18.11

1.89
3.53
3.51
3.50
3.50

0.15
0.18
0.18
0.18
0.18

0.69
0.63
0.63
0.63
0.63

8.74
8.49
8.45
8.42
8.41

12.11
16.17
16.07
16.03
16.01

2.66
2.22
2.23
2.23
2.24

1.12
0.83
0.59
0.37
0.21

73.53
56.03
39.36
21.65
9.10

.77
1.30
2.19
2.33
1.54

0.12
0.17
0,19
0.18
0.14

0.03
0.02
0.01
0.01
0

2.10
1.96
1.36
0.75
0.32

1.06
1.04
1.22
1.44
1.15

0.64
1.05
1.56
1.90
1.26

5.19
3.38
1.58
0.73
0.32

49.79
32.20
13.73
5.71
2.07

1.69
1.78
2.46
2.44
1.55

0.18
0.26
0.26
0.21
0.15

0.11
0.08
0.04
0.02
0.01

4.16
1.01
0.42
0.18
0.07

3.50
2.31
1.92
1.68
1.21

1.78
2.29
2.52
2.75
1.74

2.88
2.35
2.06
1.89
1.79

31.05
26.34
24.16
22.14
21.02

4.01
4.92
5.43
5.06
4.85

9.83
6.94
5.89
5.38
5.13

0
0
0
0
0

12.26
9.60
8.23
7.54
7.15

38.31
29.05
26.04
24.38
21.16

0.65
0.83
1.19
1.57
2.33

We group the balance-sheet and the two LTVs shocks together and term them financial shocks.
Foreign shocks on other hand represent the combined effects of foreign output, foreign inflation,
foreign interest rate, as well as foreign-exchange risk-premium shocks.

Published by Bulletin of Monetary Economics and Banking, 2023

21

## Page 23

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
418

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

We note that this output decomposition result is somewhat different than
that estimated in Lie (2019) for the Indonesian economy. There, technology
shocks and monetary-policy shocks are overwhelmingly responsible for
output fluctuations. This difference stems from the inclusion of physical capital
accumulation (investment), financial frictions and shocks, and the domestic costpush shock in our model.23 When capital is absent and labor is the only input into
production, technology shocks would pick up the effect of fluctuations in capital
stocks. Including financial frictions and shocks in the model further reduce the
contribution of technology (and monetary-policy) shocks. Interestingly, these
additional model elements also imply that preference shocks are important for
output fluctuations, in contrast to the finding in Lie. Overall, these discrepancies
suggest that the choice of frictions and shocks in the estimated model has an
important implication for variance decompositions.
Short-term inflation fluctuations appear to be largely caused by cost-push
shocks, but with reduced contribution as the forecast horizon increases. This
importance of cost-push (price-markup) shocks for inflation variations in the
short-run is also found by Smets and Wouters (2003) and Copaciu et al. (2015) for
the Euro area and Romania, respectively. Technology shocks are also important
for inflation fluctuations, more so at longer horizons.
Financial and (unsystematic) monetary-policy shocks appear to contribute
little to inflation fluctuations at all considered horizons. The relative unimportance
of monetary-policy shocks for inflation variations, however, is consistent with the
finding in Adolfson et al. (2007) for the Euro area. Regarding the fluctuations of the
nominal interest (BI) rate, we find that technology and cost-push shocks to be the
most important driver. For example, at the 1-quarter horizon, cost-push shocks are
responsible for almost half of policy interest rate fluctuations. The contributions of
all the other shocks are minimal.
On credit growth variations, we find important contributions of technology,
cost-push, financial, and monetary-policy shocks. The contribution of technology
shocks appears to be increasing as the forecast horizon increases. Despite this, the
contributions of cost-push, financial, and monetary-policy shocks are still nontrivial, even at 40-quarter horizon. Out of the three financial shocks—shocks to bank
balance sheet, households’ and firms’ LTV ratios—the shocks to firms’ LTV ratio
appear to be the most important. These shocks make up to about three quarters of
the financial shocks’ contribution. Housing-demand shocks’ contribution to credit
growth appear to also be non-trivial. Not surprisingly, these shocks affect total
credit growth through their effect on loans to households, which is consistent with
finding in Gerali et al. (2010) in the context of the US data.
Overall, for these four key variables we consistently find important contributions
of technology and cost-push shocks. The importance of technology shocks for
aggregate fluctuations is perhaps not surprising, given the high persistence of
the shock (ρa=0.99 at the posterior mean). As we shall see next, technology shocks
appear to also play an important role in the Indonesian economy during the
COVID-19 pandemic.
23

The sample period for estimation in Lie (2019) is from 2005.Q3-2017.Q1. Four years of additional
data—our sample period is from 2005.Q3-2021.Q2—may matter, though not to the extent suggested
by Table 3.

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

22

## Page 24

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

419

B. Historical Shock Decompositions and COVID-19 Shocks
Figures 1-3 depict the historical shock decompositions of output growth and
inflation, as well as credit (total loans) growth.24 As these three variables are used
as observables in the Bayesian estimation, the smoothed variables depicted by the
black line in each of Figures 1-3 reflect the actual data (plotted as deviation from
the sample average). The decomposition of output growth in particular allows us
to identify the COVID-19 pandemic shocks implied by the data and the model
restrictions.
Figure 1.
Historical Decomposition of Output Growth
The figure presents the historical posterior-mean variance decomposition of output growth. The contribution unit of
each shock is in % per quarter. The top panel shows the decomposition for the whole sample period (2005Q3-2021Q2),
the bottom panel zooms on the recent 2019.Q1-2021.Q2 period. The black line plots the actual (smoothed) quarterly
output growth, shown as deviation from the sample average (1.2%). Cost-push shocks include both domestic and
import cost-push shocks. Financial shocks include LTV shocks and balance-sheet shock. Foreign shocks include
foreign-output, foreign-inflation, foreign interest-rate, and exchange-rate risk premium shocks.

A. Decomposition for the 2005Q3-2021Q2 Sample Period
Init.values

10

Tech.
Pref.

5

Cost push
Inv.

0

Hs. price
Govt. spending

-5

Mon. pol.
Financial

-10

Foreign
2006

24

2008

2010

2012

2014

2016

2018

2020

Since we impose an identical measure for impatient households and firms (γI=γE=1) in the model, the
smoothed credit growth represents the growth rate of the unweighted sum of loans to households
and loans to firms.

Published by Bulletin of Monetary Economics and Banking, 2023

23

## Page 25

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
420

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

Figure 1.
Historical Decomposition of Output Growth (Continued)
B. Decomposition for the 2019Q1-2021Q2 Sample Period
4

Init.values
Tech.

2

Pref.

0

Cost push

-2

Inv.

-4

Hs. price
Govt. spending

-6

Mon. pol.
Financial

-8

Foreign
2019

2019.5

2020

2020.5

2021

Figure 2.
Historical Decomposition of Inflation
The figure presents the historical posterior-mean variance decomposition of inflation. The contribution unit of each
shock is in % per quarter. The top panel shows the decomposition for the whole sample period (2005.Q3-2021.Q2),
the bottom panel zooms on the recent 2019.Q1-2021.Q2 period. The black line plots the actual (smoothed) inflation
rates, shown as deviation from the sample average (5.3%). Cost-push shocks include both domestic and import costpush shocks. Financial shocks include LTV shocks and balance-sheet shock. Foreign shocks include foreign-output,
foreign-inflation, foreign interest-rate, and exchange-rate risk premium shocks.

A. Decomposition for the 2005Q3-2021Q2 Sample Period
40

Init.values

30

Tech.
Pref.

20

Cost push

10

Inv.

0

Hs. price
Govt. spending

-10

Mon. pol.

-20

Financial

-30

Foreign
2006

2008

2010

2012

2014

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

2016

2018

2020

24

## Page 26

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
421

An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

Figure 2.
Historical Decomposition of Inflation (Continued)
B. Decomposition for the 2019Q1-2021Q2 Sample Period
10

Init.values
Tech.

5

Pref.

0

Cost push
Inv.

-5

Hs. price
-10

Govt. spending

-15

Mon. pol.
Financial

-20

Foreign
2019

2019.5

2020

2020.5

2021

Figure 3.
Historical Decomposition of Credit Growth
The figure presents the historical posterior-mean variance decomposition of credit growth. The contribution unit
of each shock is in % per quarter. The top panel shows the decomposition for the whole sample period (2005.Q32021.Q2), the bottom panel zooms on the recent 2019.Q1-2021.Q2 period. The black line plots the actual (smoothed)
credit growth rates, shown as deviation from the (unweighted) sample average (2.2%). Cost-push shocks include both
domestic and import cost-push shocks. Financial shocks include LTV shocks and balance-sheet shock. Foreign shocks
include foreign-output, foreign- inflation, foreign interest-rate, and exchange-rate risk premium shocks.

A. Decomposition for the 2005Q3-2021Q2 Sample Period
Init.values

10

Tech.
5

Pref.
Cost push

0

Inv.
Hs. price

-5

Govt. spending

-10

Mon. pol.
Financial

-15

Foreign
2006

2008

2010

2012

2014

2016

2018

Published by Bulletin of Monetary Economics and Banking, 2023

2020

25

## Page 27

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
422

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

Figure 3.
Historical Decomposition of Credit Growth (Continued)
B. Decomposition for the 2019Q1-2021Q2 Sample Period
Init.values

4

Tech.

2

Pref.

0

Cost push
Inv.

-2

Hs. price

-4

Govt. spending

-6

Mon. pol.
Financial

-8

Foreign
2019

2019.5

2020

2020.5

2021

B.I. Output Growth
The top panel of Figure 1 plots the posterior mean decomposition of the output
growth for the whole sample period (2005.Q3-2021.Q2).25 Overall, the historical
decomposition result is consistent with the variance decomposition in Table 3:
technology, preference, cost-push, and financial shocks are largely responsible
for the fluctuations of the output growth historically. It is notable that unlike the
decomposition for the U.S. economy reported in Gerali et al. (2010), financial shocks
do not appear to be the dominant driver for output fluctuations during the height
of the Global Financial Crisis (GFC) in 2008. This finding is consistent with the fact
that the Indonesian economy was not particularly exposed by the 2008 GFC.
Zooming in on the recent 2019.Q1-2021.Q2 period (the bottom panel), we find
that the decline in output in the 1st quarter of 2020 (a -0.9% quarter-to-quarter
growth rate) is fueled by a combination of preference and financial shocks, and
foreign shocks to some extent. The largest pandemic-induced output contraction
occurs in 2020.Q2—around the time when the economic effect of the COVID-19
pandemic began to take hold in Indonesia— where output declines by 6.7%
compared to the previous quarter. Our estimated model attributes this huge
output decline mainly to technology, preference, and foreign (mainly, foreignoutput) shocks. Domestic cost-push shocks also appear to non-trivially contribute
to the negative output growth in 2020.Q2, although to a smaller degree compared
to the aforementioned three shocks. Interestingly, the (positive) contribution of
monetary-policy shocks to the negative growth rate in this quarter appears to
be non-trivial. This, however, does not necessarily mean that Bank Indonesia’s
25

Init. values refers to the contribution of initial values due to the stochastic initialization of the
Kalman smoother. The contribution may be non-trivial in the starting quarters, but should fade out
afterward.

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

26

## Page 28

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

423

monetary policy stance at the time was too tight. Such a positive contribution,
however, does imply that monetary policy is tighter than if the central bank strictly
follows the Taylor rule in (38) when setting the policy rate.
Our estimates attribute the huge output growth reversal in 2020.Q3 to a
combination of positive foreign-output, preference, technology, and to some
extent, positive financial and government-spending shocks. Hence, timely fiscal
subsidies by the Indonesian government in response to the pandemic, as proxied
by a positive government spending shock in 2020.Q3, are a contributing factor to
the swift output growth reversal. Absent a negative investment adjustment shock
in 2020.Q3, however, the positive output growth would have been higher. From
2020.Q4-2021.Q2, a combination of adverse technology and preference shocks
serves as a drag to the economic recovery, even though the growth rate of output
is positive in each of these quarters.
We interpret the finding in Figure 1 as a characterization of the COVID-19
pandemic shocks as a combination of adverse technology, preference, and foreignoutput shocks, especially in light of the decomposition evidence in 2020.Q2. We
believe this is a reasonable characterization. Technology shocks in the model are
supply shocks that encompass labor supply shocks. Hence, an adverse technology
shock captures an aggregate supply reduction due to supply-chain disruptions
and large-scale social and economic restrictions instituted by the Indonesian
government in response to the pandemic.26 Adverse preference shocks capture the
aggregate consumption and investment spending decrease due to various layouts,
firm exits, and scores of people voluntarily reducing their labor supply because of
the risk of infection. In addition, a negative preference shock also serves as a proxy
for an increase in households’ precautionary saving in response to heightened,
pandemic-induced income uncertainties.27 Negative foreign-output shocks on the
other hand serve as a proxy for the decline in import demands and the global
reduction in the international trade volume.
Our characterization of the COVID-19 pandemic shocks is also consistent with
those assumed in various papers in the literature. For example, Fornaro and Wolf
(2020) treat the COVID-19 shock as an adverse productivity growth rate shock.
Faria-e Castro (2020) assumes that the pandemic is an adverse demand-side shock
that affects the contact-intensive service sector. McKibbin and Fernando (2021)
translate the pandemic as a combination of labor supply, equity risk premium,
production cost, and consumer spending shocks. In the context of the Indonesian
economy, Lie (2021) models the COVID-19 shocks as a combination of preference
(consumer-spending) and labor supply shocks. In a similar decomposition analysis
using an estimated DSGE model for the Euro area, Cardani et al. (2021) also find a
dominant role of the supply-side “lockdown” shocks during the pandemic.

These restrictions are called Pembatasan Sosial Berskala Besar (PSBB) in Indonesia when it was first
instituted in 2020.Q2. These restrictions have since been revised and the term has been renamed to
Pemberlakuan Pembatasan Kegiatan Masyarakat (PPKM), which is effectively a partial lockdown.
27
The outstanding amount of saving and time deposits (up to 24-month maturity) did increase in
2020.Q3 by 4.5% compared to the previous quarter, which is markedly higher than the 1.8% average
growth rate in our sample from 2005.Q3-2021.Q2.
26

Published by Bulletin of Monetary Economics and Banking, 2023

27

## Page 29

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
424

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

B.II. Inflation and Credit Growth
Figure 2 plots the historical decomposition of inflation. For the whole sample
period, technology and cost-push shocks appear to play a dominant role. Financial
shocks also appear to non-trivially affect the historical inflation rates, especially in
the recent periods. One notable ending is regarding the source of huge inflation
spike in 2005.Q4, which was primarily due to the Indonesian government’s huge
cut in the fuel price subsidy at the time. Our model attributes the spike largely
to (mainly, domestic) cost-push shocks, as is traditional in the Phillips curve
literature. Interestingly, investment-adjustment shocks also seem to play a role
in inflation variations, including the negative contributions during the COVID-19
period (bottom panel). In spite of this, consistent with our characterization of
the COVID-19 shocks, adverse technology shocks during the COVID-19 period
appear to have important, positive contribution to inflation (an adverse supply
or technology shock leads to higher prices and a higher inflation rate). Adverse
preference shocks drag inflation down starting in 2020.Q1, but the overall effect
seems to be minimal.
As for credit growth, once again we find a dominant role of adverse technology
shocks during the COVID-19 period, as plotted in the bottom panel of Figure 3.
These shocks are largely responsible for the muted credit growth rates during
the COVID period. Financial shocks appear to also be quite important in 2020.
Q1, but the contributions are minimal from 2020.Q2 onward, especially relative
to the contribution of technology shocks. Adverse preference shocks, on the other
hand, positively contribute to credit growth (i.e., they lead to higher aggregate
loan amounts), capturing the effect of an increase in precautionary saving during
the pandemic.
V. INVESTIGATING THE IMPLICATIONS OF A MONETARYMACROPRUDENTIAL POLICY MIX: AN EXAMPLE
As an illustration of the model’s usefulness as a tool to evaluate the relative
performance of any given policy mix, we now investigate the implications of a
monetary-macroprudential mix involving a countercyclical capital requirement
(or capital buffer) regulation, in comparison to the baseline case where the
central bank only conducts monetary policy through an overnight interest-rate
management (using the Taylor rule (38)). Specifically, under the policy mix the
central bank adjusts the capital requirement ratio (CR) using the following rule:
(46)
When there is an increase in the growth rate of credit (total loans outstanding)
Bt/Bt-1, the central bank using the CR rule (39) would countercyclically increase
the capital requirement vt, thus stabilizing the financial cycle. The strength of
this response (hence, the strictness of such a policy) depends on policy-feedback
coefficient ψv≥0. The above rule also features a degree of instrument smoothing,
captured by the parameter ρv∈[0,1].

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

28

## Page 30

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
425

An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

In subsequent analysis, we set ρv=0.75 and ψv=10 (all other parameter values
are set to their posterior means). These numbers are admittedly ad hoc, though
not unreasonable. However, our purpose in this section (and in this paper) is to
illustrate how the model can be used to perform a policy mix evaluation rather
than a comprehensive analysis of a given policy mix.28 For that reason, we also
limit our investigation below to the standard impulse response analysis and a
counterfactual simulation involving the COVID-19 shocks identified in Section IV.
A. Impulse Responses
Figures 4- 5 plot the impulse responses to a negative 1% preference (consumerspending) shock and a negative 1% technology shock, respectively. We focus
on these two shocks since they appear to be the dominant shocks during the
COVID-19 pandemic in Indonesia (see Section IV).
Figure 4.
Impulse Responses to a Negative 1% Preference Shock
This figure presents the impulse responses to a -1% preference shock. The preference shock follows an AR(1) process
with persistence ρz = 0.68, per the posterior mean. MP and CR refer to monetary policy and capital requirement (bank
capital-to-assets ratio), respectively.

0

% dev

Output

% dev

0.25

Credit

0.2
-0.1

0.15
0.1

-0.2

0.05
-0.3

0

2
% dev

4

6

8

10

Consumption

0

0

0

0.15

2

4

% dev

6

8

10

8

10

Investment

0.1
0.2
0.05
-0.4

-0.6

28

0

0

2

4

6

8

10

-0.05

0

2

4

6

We perform such an analysis in a separate, companion paper.

Published by Bulletin of Monetary Economics and Banking, 2023

29

## Page 31

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
426

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

Figure 4.
Impulse Responses to a Negative 1% Preference Shock (Continued)
% deviation p.a.

Inﬂation

0

0
-0.05

-0.05

-0.1

-0.15

-0.15

-0.2

-0.2
0

2

level dev (%)

0.4

4

6

8

10

-0.25

Policy instrument

0

Nominal (policy) rate

2

4

% deviation p.a.

0

MP
MP+CR

% deviation p.a.

6

8

10

Rate on loans to ﬁrms

-0.05

0.3
-0.1
-0.15

0.1

-0.2
0
0

2

4

6

8

10

-0.25

0

2

4

6

8

10

Figure 5.
Impulse Responses to a Negative 1% Technology Shock
This figure presents the impulse responses to a -1% technology shock. The technology shock follows an AR(1) process
with persistence ρa = 0.99, per the posterior mean. MP and CR refer to monetary policy and capital requirement (bank
capital-to-assets ratio), respectively.

1

% dev

Output

0

% dev

Credit

-2
0

-4
-6

-1

-2

-8
-10
0

2

4

6

8

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

10

0

2

4

6

8

10

30

## Page 32

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
427

An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

Figure 5.
Impulse Responses to a Negative 1% Technology Shock (Continued)
% dev

Consumption

0

-1

-5

-2

-10

-3

8

0

2

% deviation p.a.

4

6

% dev

0

8

10

Inﬂation

-15

6

6

Investment

0

2

% deviation p.a.

4

6

8

10

8

10

8

10

Nominal (policy) rate

4

4
2

2
0

2

0

2

level dev (%)

4

6

8

10

Policy instrument

0

10

0

2

% deviation p.a.

4

6

Rate on loans to ﬁrms

8
0

6
MP
MP+CR

-2

4
2

-4

0

2

4

6

8

10

0

0

2

4

6

A.I. Preference Shock
The adverse preference (demand) shock causes domestic output and consumption
to contract under both policy mix cases (MP and MP+CR). After the impact
period (period 0), investment goes up in subsequent periods as the market price
of capital decreases in response to higher accumulated savings (not shown). The
consumer-price inflation rate also goes down, as expected. In response to the
output contraction and lower inflation, the central bank attempts to stimulate the
economy by immediately cutting the nominal policy interest rate by about 0.2%
Published by Bulletin of Monetary Economics and Banking, 2023

31

## Page 33

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
428

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

(per annum) in the baseline MP case (solid blue line). These responses look to be
qualitatively similar across the two cases. There appears, however, to be some
disparities quantitatively, which can be explained by the development in the
credit market.
In both cases, the total amount of credit (loans) in the economy goes up on
impact and in subsequent periods. This credit expansion is largely caused by
lower household and loans rates, stimulated by the policy rate cut. The size of
the decrease in the loan rates, however, differs across the two policy mix cases.
As shown in bottom right panel of Figure 4, the interest rate on loans to firms
decrease by less under the MP+CR case than that in the baseline MP case. The
same pattern also occurs for the rate on loans to households (not shown). The
reason behind this stems from how the CR regulation affects the credit market. A
CR regulation affects the credit market through the credit supply channel. That
is, when the central bank increases the required capital-to-assets ratio (bottom left
panel of Figure 4), the supply of credit (loanable funds) would decrease, which
in turn causes the loan rates to increase (ceteris paribus). This is the reason why
all in all, the loan rates would decrease by less under the MP+CR policy. The
countercyclical CR rule can therefore better stabilize the credit (financial) cycle
compared to standard MP case where there is no active macroprudential policy.
Looking back at the output responses, such a policy mix also appears to stabilize
output more, i.e., output decreases by slightly less under the MP+CR case. Overall,
however, when the economy is hit by a preference shock, the impact of the CR
regulation in (39) on the business cycle fluctuations appears to be minimal.
A.II. Technology Shock
When the economy is hit by an adverse technology (supply) shock, we observe
overall contractions in output, consumption, and investment. There is, however,
an increase in the price level (higher inflation) since the adverse supply shock
causes an increase in the real marginal cost of production. In response to this,
the central bank increases the nominal (policy) interest rate. As in the preference
shock case, we observe a qualitatively-similar response pattern across the policy
mixes. The development in the credit market once again leads to some quantitative
disparities. The adverse technology shock leads to a reduction in the overall credit
in the economy. In response to this, the central bank conducting a countercyclical
CR regulation using the rule (39) would decrease the required capital-to-assets
ratio (bottom left panel of Figure 5). Such a policy response increases the supply of
loanable funds (ceteris paribus), which in turn causes the loan rates to increase by
less (bottom right panel). This more subdued response of the loan rates means a
smaller effect of a given negative supply shock: output, consumption, investment,
and credit contract by less while inflation increases by less, relative to that in the
baseline MP case. In addition, there is a feedback loop between inflation and the
policy and the loan rates: the smaller increase in inflation means that the central
bank would not need to increase the policy rate as much to stabilize the business
cycle (e.g., inflation and output) fluctuations, causing a further subdued increase
in the loan rates.
https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

32

## Page 34

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
429

An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

Comparing Figure 4 and Figure 5, it is apparent that the quantitative
disparities between the two policy cases are much larger in the latter. Hence,
the countercyclical CR regulation is a more effective stabilization tool when the
main drivers of fluctuations are technology (supply) shocks instead of preference
(demand shocks). Put another way, the effect of a given macroprudential policy
is shock specific (state dependent), consistent with the finding in Unsal (2018).29
B. Counterfactual Analysis
We next perform a counterfactual analysis based on the countercyclical CR rule (39)
and the estimated (smoothed) shocks during the COVID-19 pandemic period. For
this analysis, we assume that up to 2019.Q4 the central bank has been conducting
monetary policy without the support of active countercyclical macroprudential
regulations, per the assumption in our estimation. This implies that up to that
quarter, all the variables are equal to their smoothed values (as estimated using
the Kalman filter based on the posterior means). Starting from 2020.Q1 onward,
however, the central bank is assumed to conduct a monetary-macroprudential
policy mix with a countercyclical CR policy per the rule in (39). Throughout the
counterfactual periods from 2020.Q1-2021.Q2, the economy is subjected to the
same smoothed shocks identified in the estimation. The counterfactual results are
depicted in Figure 6 by the dashed red line. For comparison purpose, we also plot
the actual, smoothed variables produced by the Kalman filter under the MP case,
represented by the solid blue line. (Note that since the data on output, credit (total
loans), investment, CPI inflation, and the BI (policy) rate are used as observables in
the Bayesian estimation, these smoothed variables match the actual data.)
Figure 6.
Smoothed Variables, Policy-Mix Counterfactuals, and COVID-19 Shocks
The figure presents the evolution of selective variables under the benchmark estimated policy (monetary policy only,
MP) versus a monetary-macroprudential policy mix involving a countercyclical bank capital requirement, or capitalto-asset, ratio (MP+CR). In the MP+CR case, the central bank is assumed to adopt the policy mix starting from 2020.
Q1 onwards. In the MP case, since output, credit, investment, inflation, and the nominal policy (BI) rate data are used
as observables in the Bayesian estimation, these variables match the actual data.
4

% dev

Output

5

2

% dev

Credit

0

0
-5
-2
-10

-4
-6

29

2019Q4

2020Q2
2020Q4
Quarter

2021Q2

-15

2019Q4

2020Q2

2020Q4

2021Q2

Quarter

Unsal (2018) considers capital flows management as a macroprudential policy tool and finds that the
optimal policy is state dependent.

Published by Bulletin of Monetary Economics and Banking, 2023

33

## Page 35

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
430

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

Figure 6.
Smoothed Variables, Policy-Mix Counterfactuals, and COVID-19 Shocks
(Continued)
5

% dev

Consumption

10

% dev

Investment

5

0

0

-5

-5
-10

4

2019Q4

2020Q2
2020Q4
Quarter

% per annum

Inﬂation

2021Q2

6

5

2019Q4

2020Q2
2020Q4
Quarter

% per annum

Nominal policy rate

2019Q4

2020Q2
2020Q4
Quarter

2021Q2

4

0

2

-2
2019Q4

5

Ivi dev

2020Q2
2020Q4
Quarter

2021Q2

0

2021Q2

Bank capital-to-asset ratio

0
-5
-10
-15

2019Q4

2020Q2
2020Q4
Quarter

2021Q2

First, from the MP case we can clearly see the devastating impact of the
COVID-19 pandemic. This is especially true in the 2nd quarter of 2020: output
(GDP) contracted by 6.7%, accompanied by a sharp drop in consumption and
investment activities. While the recovery came swiftly (starting in 2020.Q3), the
subsequent expansions were quite mild relative to the sharp reduction in 2020.
Q2. Here, the levels of output, consumption, and investment in our latest quarter
(2021.Q2) are still lower than their sample averages. Lower real economic activities
https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

34

## Page 36

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

431

also led to a decrease in the CPI inflation rate, both in 2020.Q2 and 2020.Q3.
The inflation rate started to pick up again in 2020.Q4, however, due to the swift
recovery. In response to the pandemic-induced contraction, Bank Indonesia has
gradually cut its policy rate — it stands at 3.5% in 2021.Q2.
If the central bank additionally adopted the countercyclical CR rule starting
in 2020.Q1, output, consumption and investment would have been higher overall
during the pandemic. At the end of our sample period in 2021.Q2 for example,
each of these variables would have been higher by 0.5%, 1.4%, and 9.8%,
respectively. Inflation and the nominal policy rate would be lower throughout the
counterfactual periods. Armed with the capital requirement ratio as an additional
policy instrument, the central bank would progressively lower the ratio from 2020.
Q1 up to 2021.Q1, before increasing it again in 2021.Q2. These findings stem from
the dominant effect of (adverse) technology shocks during the pandemic. This is
true even though we have characterized the pandemic shocks as a combination
of technology shocks and other—preference, foreign-output and cost-push—
shocks.30 When the effect of technology shocks is dominant, as we can see from the
impulse responses in Figure 5, the countercyclical CR rule (39) could be a potent
addition to the policy mix.
In spite of our counterfactual results, we note that a macroprudential policy
regulation does not necessarily lead to better stabilization outcomes (welfareimproving). Whether a countercyclical rule such as (39) is welfare-improving
depends on a confluence of factors, e.g., the policy response parameters, the
specific macroprudential policy instrument, and the combination of shocks hitting
the economy. It is not clear from our counterfactual results, for example, whether
the MP+CR policy mix leads to a higher aggregate welfare compared to the MP
case. It appears to be the case, but one cannot be certain without a proper welfare
comparison. We plan to investigate this important issue in a separate, companion
paper.
VI. CONCLUSION AND FUTURE DIRECTIONS
This paper builds and estimates a small open-economy Dynamic Stochastic
General Equilibrium (DSGE) model suitable for the evaluation of central bank
policy mix, with a particular application on the Indonesian economy. The model
has a rich array of shocks and frictions, including banking and financial frictions.
We illustrate how the estimated model can be used to investigate the source
of aggregate fluctuations in Indonesia and to evaluate and simulate a policy
mix involving monetary and macroprudential policies. We notably find that
with regard to the COVID-19 pandemic shocks, the data and the DSGE model
restrictions identify these shocks to be largely a combination of adverse supplyside (technology) and demand-side (preference and foreign-output) shocks. Our
evaluation and simulation of a countercyclical capital requirement rule shows that
such a macroprudential policy rule could be a potent addition to Bank Indonesia’s
30

Since ρa=0.99 (at the posterior mean), each occurence of a technology shock is highly persistent and
has a lasting effect on aggregate variables.

Published by Bulletin of Monetary Economics and Banking, 2023

35

## Page 37

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
432

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

policy mix arsenal. This is especially true when technology shocks are a dominant
driver of aggregate fluctuations, as is the case during the COVID-19 pandemic.
Our main focus in this paper is on model development. As such, we limit
the policy mix analysis to a monetary-macroprudential policy mix involving
one macroprudential policy instrument (bank capital requirement). The
model, however, can be used to evaluate the relative performance of other
macroprudential policy instruments, e.g., loan-to-value ratio or liquidity coverage
ratio. Furthermore, due to the structural nature of our model, we could conduct a
proper welfare comparison between various policy mix combinations. We plan to
address these issues in a separate, companion paper.
One could also readily extend the model to evaluate other types of policy mix,
not just a monetary-macroprudential policy mix. For example, we could investigate
whether the optimal policy mix involves direct foreign exchange intervention
and capital controls, or whether the inclusion of a Central Bank Digital Currency
(CBDC) is welfare-improving. The COVID-19 pandemic also uncovers the need
for a better coordination between monetary, macroprudential, and fiscal policy
authorities to mitigate the economic impact of future similar adverse events.
Future research should look into this more-integrated policy framework. Our
model can be used as a base model for such analyses.

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

36

## Page 38

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

433

REFERENCE
Adolfson, M., Laseen, S., Linde, J., & Villani, M. (2007). Bayesian Estimation of
an Open Economy DSGE Model with Incomplete Pass-through. Journal of
International Economics, 72, 481-511.
Adrian, T., Erceg, C. J., Linde, J., Zabczyk, P., & Zhou, J. (2020). A Quantitative
Model for the Integrated Policy Framework. International Monetary Fund
Working Paper No. 2020/122.
Ali, M., Anwar, U., & Haseeb, M. (2021). Impact of COVID-19 on Islamic and
Conventional Stocks in Indonesia: A Wavelet-based Study. Bulletin of Monetary
Economics and Banking, 24, 15-32.
Basu, S. S., Boz, E., Gopinath, G., Roch, F., & Unsal, F. D. (2020). A Conceptual
Model for the Integrated Policy Framework. International Monetary Fund
Working Paper No. 2020/121.
Calvo, G. A. (1983). Staggered Prices in a Utility-maximizing Framework. Journal
of Monetary Economics, 12, 383-398.
Cardani, R., Croitorov, O., Giovannini, M., Pfeiffer, P., Ratto, M., & Vogel, L. (2021).
The Euro Area’s Pandemic Recession: A DSGE Interpretation. JRC Working
Paper in Economics and Finance No. 2021/10.
Chawwa, T. (2021). Impact of Reserve Requirement and Liquidity Coverage Ratio:
A DSGE Model for Indonesia. Economic Analysis and Policy, 71, 321-341.
Copaciu, M., Nalban, V., Bulete, C. (2015). R.E.M. 2.0: An estimated DSGE Model
for Romania. Dynare Working Papers 48, CEPREMAP.
Dutu, R. (2016). Why has Economic Growth Slowed Down in Indonesia? An
Investigation into the Indonesian Business Cycle Using an Estimated DSGE
Model. Journal of Asian Economics, 45, 46-55.
Eichenbaum, M. S., Rebelo, S., & Trabandt, S. (2020). The Macroeconomics of
Epidemics. National Bureau of Economic Research (NBER) Working Paper 26882.
Faria-e-Castro, M. (2020). Fiscal Policy During a Pandemic. FRB St. Louis Working
Paper 2020-006.
Feve, P., Matheron, J., & Sahuc, J-, G. (2010). Inflation Target Shocks and Monetary
Policy Inertia in the Euro Area. The Economic Journal, 120, 1100- 1124.
Fornaro, L., & Wolf, M. (2020). COVID-19 Coronavirus and Macroeconomic Policy.
CEPR Discussion Paper DP14529.
Gali, J., & Monacelli, T. (2005). Monetary Policy and Exchange Rate Volatility in a
Small Open Economy. The Review of Economic Studies, 72, 707-734.
Gerali, A., Neri, S., Sessa, L., & Signoretti, F. M. (2010). Credit and Banking in a
DSGE Model of the Euro Area. Journal of Money, Credit and Banking, 42, 107-141.
Haldar, A., & Sethi, N. (2021). The News Effect of COVID-19 on Global Financial
Market Volatility. Bulletin of Monetary Economics and Banking, 24, 33-58.
Harahap, B. A., Idham, P. B., Kusuma, A., & Rakhman, N. R. (2017). Perkembangan
Financial Technology Terkait Central Bank Digital Currency (CBDC) Terhadap
Transmisi Kebijakan Moneter dan Makroekonomi. Bank Indonesia Working
Paper.
Harmanta, H., Bathaluddin,M. B., & Idham, I. (2012). ARIMBI with Macroprudential
Policy. Economic Research Group Internal Paper, Bank Indonesia.

Published by Bulletin of Monetary Economics and Banking, 2023

37

## Page 39

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
434

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

Harmanta, H., Purwanto, N. M. A., & Oktiyanto, F. (2014). Banking Sector and
Financial Friction on DSGE Model: The Case of Indonesia. Bulletin of Monetary
Economics and Banking, 17, 21-54.
Iacoviello, M., & Neri, S. (2010). Housing Market Spillovers: Evidence from an
Estimated DSGE Model. American Economic Journal: Macroeconomics, 2, 125-64.
Iyke, B. N., Sharma., S. S., & Gunadi, S. (2021). COVID-19, Policy Responses, and
Industrial Productivity around the Globe. Bulletin of Monetary Economics and
Banking, 24, 365-382.
Juhro, S. M., & Goeltom, M. (2015). The Monetary Policy Regime in Indonesia.
Macro-financial Linkages in Pacific Region, Akira Kohsaka (Ed.), Routledge.
Juhro, S. M., Narayan, P. K., & Iyke, B. N. (2022). Understanding Monetary and
Fiscal Policy Rule Interactions in Indonesia. Applied Economics, 1-19.
Justiniano, A., & Preston, B. (2010). Monetary Policy and Uncertainty in an
Empirical Small Open-economy Model. Journal of Applied Econometrics, 25, 93128.
Kiyotaki, N., & Moore, J. (1997). Credit Cycles. Journal of Political Economy, 105,
211-248.
Kollmann, R. (2002). Monetary Policy Rules in the Open Economy: Effects on
Welfare and Business Cycles. Journal of Monetary Economics, 49, 989-1015.
Lie, D. (2019). Observed Inflation-target Adjustments in an Estimated DSGE Model
for Indonesia: Do They Matter for Aggregate Fluctuations? Economic Papers: A
Journal of Applied Economics and Policy, 38, 261-285.
Lie, D. (2021). Implications of State-dependent Pricing for DSGE Model-based
Policy Analysis in Indonesia. Economic Analysis and Policy, 71, 532-552.
Lubik, T. A., & Schorfheide, F. (2007). Do Central Banks Respond to Exchange
Rate Movements? A Structural Investigation. Journal of Monetary Economics, 54,
1069- 1087.
Lucas, R. E. (1976). Econometric Policy Evaluation: A Critique. Carnegie-rochester
Conference Series on Public Policy, 1, 19-46.
McKibbin, W. J., & Fernando, R. (2021). The Global Macroeconomic Impacts of
COVID-19: Seven Scenarios. Asian Economics Papers, 20, 1-30.
Monacelli, T. (2005). Monetary Policy in a Low Pass-through Environment. Journal
of Money, Credit, and Banking, 37, 1047-1066.
Prabheesh, K. P., Juhro, S. M., & Harun, C. A. (2021). COVID-19 Uncertainty and
Monetary Policy Responses: Evidence from Emerging Market Economies.
Bulletin of Monetary Economics and Banking, 24, 489-516.
Purnawan, M. E., & Nasir, M. A. (2015). The Role of Macroprudential Policy to
Manage Exchange Rate Volatility, Excess Banking Liquidity, and Credits.
Bulletin of Monetary Economics and Banking, 18, 21-44.
Rizvi, S. A. R., Juhro, S. M., & Narayan, P. K. (2021). Understanding Market
Reaction to COVID-19 Monetary and Fiscal Stimulus in Major ASEAN
Countries. Bulletin of Monetary Economics and Banking, 24, 313-334.
Rotemberg, J. J. (1982). Sticky Prices in the United States. Journal of Political Economy,
90, 1187-1211.

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

38

## Page 40

Juhro et al.: An Estimated Open-Economy DSGE Model for The Evaluation of Centra
An Estimated Open-economy DSGE Model for the Evaluation of Central Bank Policy Mix

435

Sahminan, S., Utama, G., Rakman, R. N., & Idham, I. (2017). A Dynamic Stochastic
General Equilibrium (DSGE) Model to Assess the Impact of Structural Reforms
on the Indonesian Economy. Bulletin of Monetary Economics and Banking, 13,
149-180.
Schmitt-Grohe, S., & Uribe, U. (2003). Closing Small Open Economy Models.
Journal of international Economics, 61, 163-185.
Setiastuti, S. U., Purwanto, N. M. A., & Sasongko, A. (2021). External Debt
Management as Macroprudential Policy in a Small Open Economy. Economic
Analysis and Policy, 71, 446- 462.
Simorangkir, I., & Purwanto, N. M. A. (2015). LTV Policy Simulation in DSGE
Model. Economic Research Group Internal Paper, Bank Indonesia.
Smets, F., & Wouters, R. (2003). An Estimated Dynamic Stochastic General
Equilibrium Model of the Euro Area. Journal of the European Economic
Association, 1, 1123-1175.
Smets, F., & Wouters, R. (2007). Shocks and Frictions in US Business Cycles: A
Bayesian DSGE Approach. The American Economic Review, 97, 586-606.
Syarifuddin, F., & Bakhtiar, T. (2021). Monetary Policy Strategy in the Presence of
Central Bank Digital Currency. Bank Indonesia Working Paper No. WP/09/2021.
Unsal, D. F. (2018). Capital Flows and Financial Stability: Monetary Policy and
Macro-prudential Responses. 9th Issue (March 2013) of the International Journal
of Central Banking.
Utari, G, Arimurti, T., & Kurniati, I. (2012). Optimal Credit Growth and
Macroprudential Policy in Indonesia. Bulletin of Monetary, Economics and
Banking, 15, Article 4, 1-15.
Warjiyo, P. (2017). Indonesia: The Macroprudential Framework and the Central
Bank’s Policy Mix. Bank for International Settlements (BIS) Papers No. 94, 189205.
Warjiyo, P., & Juhro, S. M. (2019). Central Bank Policy: Theory and Practice. Emerald
Group Publishing.
Wimanda, R. E., Maryaningsih, N., Nurliana, L., & Satyanugroho, R. (2014).
Evaluating the Transmission of Policy Mix in Indonesia. Bank Indonesia Working
Paper WP/3/2014.
Wimanda, R. E., Permata, M. I., Bathaludin, M. B., & Wibowo, W. A. (2012). Study
On Implementing Macroprudential Policy in Indonesia. Bank Indonesia Working
Paper WP/11/2012.
Zams, B. M. (2021). Frictions and Empirical Fit in a DSGE Model for Indonesia.
Economic Modelling, 99, 105487.
Zams, B. M., Indrastuti, R., Pangersa, A. G., Hasniawati, N. A., Zahra, F. A., &
Fauziah, I. A. (2019). Designing Central Bank Digital Currency for Indonesia:
The Delphi-Analytic network process. Bank Indonesia Working Paper No.
WP/4/2019.

Published by Bulletin of Monetary Economics and Banking, 2023

39

## Page 41

Bulletin of Monetary Economics and Banking, Vol. 26, No. 3 [2023], Art. 1
436

Bulletin of Monetary Economics and Banking, Volume 26, Number 3, 2023

This page is intentionally left blank

https://bulletin.bmeb-bi.org/bmeb/vol26/iss3/1
DOI: 10.59091/2460-9196.2126

40
