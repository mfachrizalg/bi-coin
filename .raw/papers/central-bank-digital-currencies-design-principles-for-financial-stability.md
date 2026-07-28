---
source_type: pdf
title: "Central bank digital currencies — Design principles for financial stability"
original_file: "thesis/reference/Central bank digital currencies — Design principles for\nfinancial stability.pdf"
sha256: "16040bdc6fead030797f8550654af07478de10f6efd99ebc969eedfa4403018f"
page_count: 20
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Central bank digital currencies — Design principles for financial stability

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Economic Analysis and Policy 71 (2021) 553–572

Contents lists available at ScienceDirect

Economic Analysis and Policy
journal homepage: www.elsevier.com/locate/eap

Analyses of Topical Policy Issues

Central bank digital currencies — Design principles for
financial stability✩
Michael Kumhof a , Clare Noone b ,
a
b

∗

Bank of England, Threadneedle St, London, EC2R 8AH, UK
Reserve Bank of Australia, 65 Martin Pl, 2000, NSW, Australia

article

info

Article history:
Received 29 January 2021
Received in revised form 15 April 2021
Accepted 17 June 2021
Available online 22 June 2021
JEL classification:
E42
E44
E52
E58
Keywords:
Central bank digital currency
Financial stability
Bank run

a b s t r a c t
This paper studies sectoral balance sheet dynamics when a central bank digital currency
(CBDC) is first introduced into an economy, and when there is an attempt at a large-scale
run out of bank deposits into CBDC. We find that if the introduction of CBDC follows a
set of conservative core principles, bank funding is not necessarily reduced, credit and
liquidity provision to the private sector need not contract, and the risk of a system-wide
run from bank deposits to CBDC is addressed. In addition, under these core principles
CBDC can be expected to trade at par with other types of money in all but the most
extreme situations. The core principles are: (i) CBDC pays an adjustable interest rate;
(ii) CBDC and reserves are distinct, and not guaranteed to be directly convertible into
each other at the central bank; (iii) no guaranteed convertibility of bank deposits into
CBDC at commercial banks (and therefore by implication at the central bank); (iv) the
central bank guarantees to issue CBDC only against eligible securities. The final two
principles imply that households and firms can freely trade bank deposits against CBDC
in a private market, and that the private market can freely obtain additional CBDC from
the central bank against eligible securities.
© 2021. The Bank of England. Published by Elsevier B.V. on behalf of The Economic Society of
Australia All rights reserved.

1. Introduction
Central banks are increasingly studying the monetary policy and financial system implications of issuing central bank
digital currencies (CBDC).1 This paper focuses on the sectoral and aggregate balance sheet dimensions of an initial CBDC
issuance and of sudden large-scale increases in demand for CBDC. In our model, CBDC can be viewed as a substitute for
commercial bank deposits, and we consider how the introduction of CBDC into the economy may affect the size and
✩ The views expressed in this paper are those of the authors, and not necessarily those of the Bank of England or the Reserve Bank of Australia.
This paper was predominantly produced while both authors worked at the Bank of England. We are grateful to Richard Finlay, Cordelia Kafetz, Emily
Clayton, Ulrich Bindseil and Associate Professor Will Bateman for helpful comments and suggestions. All errors are the responsibility of the authors
alone.
∗ Corresponding author.
E-mail addresses: Michael.Kumhof@bankofengland.gsi.gov.uk (M. Kumhof), NooneC@rba.gov.au (C. Noone).
1 For example, the Bank of England has published an discussion paper on CBDC and, with the UK Ministry of Finance, has created a Taskforce to
coordinate the exploration of a potential UK CBDC (Bank of England, 2021), while Sveriges Riksbank has published a number of reports examining
the monetary policy and financial stability consequences of the e-krona model of CBDC (Sveriges Riksbank, 2017, 2018). In addition, several other
central banks are actively considering the use of distributed ledger technology to provide CBDC for interbank payments. This includes, but is not
limited to, the Bank of Canada, the Monetary Authority of Singapore, the European Central Bank and the Bank of Japan. See Boar and Wehrli (2021)
for a recent survey of CBDC activity.
https://doi.org/10.1016/j.eap.2021.06.012
0313-5926/© 2021. The Bank of England. Published by Elsevier B.V. on behalf of The Economic Society of Australia All rights reserved.

## Page 2

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

composition of the balance sheets of the central bank, commercial banks, non-bank financial institutions (NBFIs), and
households and firms. Our analysis of the scope for CBDC to displace bank deposits following its introduction, and/or to
affect banks’ susceptibility to runs from bank deposits to CBDC, will hopefully be useful in future analyses of the financial
stability implications of CBDC. Our paper is also intended to be helpful to policy makers who are concerned that the
presence of a widely accessible CBDC might be highly disruptive (Constâncio, 2017), and that if it is widely used for
transactions it might open the door to rapid bank runs (Broadbent, 2016; Callesen, 2017).
Electronic central bank money is not a new concept. It has existed for decades, most ubiquitously as balances
(commonly referred to as ‘reserves’) that are held by commercial banks and other selected financial institutions at the
central bank to facilitate electronic settlement in Real Time Gross Settlement (RTGS) systems. CBDC, however, exhibits
several distinct features from reserves. We define CBDC as electronic central bank money that (i) can be accessed more
broadly than reserves, (ii) potentially has much greater functionality for retail transactions than cash, (iii) has a separate
operational structure to other forms of central bank money, allowing it to potentially serve a different core purpose, and
(iv) can be interest bearing, and under realistic assumptions would pay a rate that would be different to the rate on
reserves.2 This definition allows scope for exploring whether CBDC can be used by the central bank as a second policy
tool, with either an interest rate rule (where the central bank sets the interest rate on CBDC and allows the quantity to
vary) or a quantity rule (where the central bank sets the quantity of CBDC supplied and allows the interest rate to vary)
possible.
We consider the most general model of CBDC access, where CBDC is available to all agents in the economy, including
households and non-financial firms. In this model CBDC can be used as a medium of exchange and a store of value,
much like bank deposits and cash, and could be deemed legal tender by the government. This is an economy-wide CBDC
system similar to the model examined in Juks (2018) and Barrdear and Kumhof (2016), the ‘interest-bearing CBDC’ option
in Engert and Fung (2017), and also to the ‘co-existence with reserves’ variant in Meaning et al. (2018).3 We are agnostic
as to the technology that underlies CBDC — use of distributed ledger technology (DLT) is not assumed. Scorer (2017) sets
out why it may not be necessary to use DLT for a CBDC, and also the specific risks and benefits of using DLT for CBDC.
To study the question of how CBDC could affect the size and composition of commercial bank balance sheets, we
study two sets of scenarios. First, in Section 4, we trace through the changes in assets and liabilities across balance sheets
when CBDC is first introduced. Second, in Section 5, we study an environment where CBDC is already established, and
the economy experiences a sudden loss of confidence in the banking sector that results in a large-scale attempt on the
part of households and firms to switch their holdings from bank deposits to CBDC.
For the first scenario we show that if a set of reasonable and conservative core principles is followed, the banking
sector’s two key functions, the provision of credit to borrowers and the provision of liquidity to depositors, are not
necessarily curtailed when CBDC is first introduced. Some bank deposits may disappear, but, to a first approximation,
this can occur without affecting the quantity of aggregate credit or aggregate liquidity. Banks and their customers,
through their respective portfolio decisions, control the extent to which depositor switching to CBDC affects the size
and composition of bank balance sheets. Banks can continue to play their traditional intermediation role. For the scenario
of a confidence loss in the banking system, we set out how the likelihood of a run from bank deposits to CBDC can be
largely ameliorated through the application of the same core principles.
The core principles are: (i) CBDC pays an adjustable interest rate; (ii) CBDC and reserves are distinct, and not guaranteed
to be directly convertible into each other at the central bank; (iii) no guaranteed convertibility of bank deposits into CBDC
at commercial banks (and therefore by implication at the central bank); and (iv) the central bank issues CBDC only against
eligible securities.
The first core principle is that the interest rate paid on CBDC should be adjustable. As set out in Section 2.1, this allows
the market for CBDC to clear without a need for either large balance sheet adjustments or movements in the general price
level. The market clearing mechanism does of course depend on whether the central bank pursues a CBDC interest rate
or quantity rule.
The second core principle is that CBDC should be distinct from reserves, with the central bank not guaranteeing to
exchange reserves for CBDC. As set out in Section 2.2, this addresses the risk of a ‘run by the back door’, whereby a
single bank’s commitment to provide CBDC in exchange for bank deposits, together with all banks’ commitment to settle
interbank payments in reserves, could, in the absence of this condition, facilitate a rundown in aggregate reserves and
deposits when bank customers seek to switch into CBDC by transferring funds to an account at the CBDC-converting
bank. This core principle also makes available a new policy instrument related to CBDC, while enabling the central bank
to retain control over the quantity of reserves in the financial system, which has traditionally been a key mechanism
through which central banks set policy to achieve their targets.
The third core principle is that commercial banks should never have an obligation, only a commercial option, to convert
deposits into CBDC on demand. As set out in Sections 2.3 and 5, requiring banks to convert deposits to CBDC on demand
2 Bech and Garratt (2017) provide a useful taxonomy of different forms of money. Under this taxonomy, the CBDC in this paper can be classified
as ‘Deposited Currency Account’ money. An alternative definition of CBDC is one where reserves no longer exist separately, having been subsumed
into the new CBDC system. In Section 2 we explore why this is not desirable from the perspective of the central bank.
3 The working paper version of this paper also considers a narrower access model where CBDC is only available to the financial sector, and a
model where CBDC is provided to households indirectly by an e-money provider backed by central bank issued CBDC.
554

## Page 3

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

opens the door to runs on the aggregate banking system. These aggregate runs could be much faster and at larger scale
than in the current system, where physical cash is the only central bank money available to depositors. Such an obligation
on banks to guarantee convertibility is therefore highly dangerous. It is also unnecessary, because while the main rationale
for this obligation is that it is necessary to ensure parity between bank deposits and other forms of central bank money,
parity can be achieved in other ways, as discussed in Section 2.3. Indeed, under our design principles, due to arbitrage,
CBDC can be expected to trade at par with other forms of central bank money and bank deposits in all but the most
extreme situations.
It has also been suggested that an obligation on banks to always convert deposits into CBDC on demand is critical to
maintaining confidence in bank deposits (for example Meaning et al., 2018). We challenge this assumption, noting first
that greater vulnerability to aggregate bank runs is unlikely to increase confidence in the banking system, and second
that the key pillars supporting confidence in banks are strong prudential oversight, maintenance of adequate capital and
liquidity buffers, deposit insurance, and the commitment to clear interbank payments in reserves at parity (and thereby
facilitate payments), rather than the promise to always pay out central bank money to depositors.
The fourth core principle, which complements the second and third principle, is that the central bank only guarantees
to issue CBDC against eligible securities, envisaged in this paper as government bonds but with eligibility at the central
bank’s discretion. This conforms to current practice for the issuance of central bank money, and is therefore conservative
rather than radical. What would truly be radical, and highly undesirable, is guaranteed issuance against bank deposits,
which would amount to a guarantee of automatic and if necessary unsecured lending to banks.
Our results constitute a material step forward in understanding how the financial stability risks of CBDC can be
managed. We focus on the first round effects of the introduction of CBDC and of attempted runs, as they are likely to be
independent of the detailed modelling assumptions for a CBDC economy, whereas second round price-mediated effects
will vary by model and take time to materialise. Furthermore, in the scenario of an attempted large-scale bank run, first
round effects are likely to dominate policy makers’ attention. Nonetheless, valuable next steps in CBDC research include an
improved understanding of the second-round effects of introducing CBDC, and developing specific operational designs for
implementing the core principles — for example, the design of an efficient mechanism to allow the rate on, or the quantity
of, CBDC to adjust in response to supply–demand imbalances. It would also be valuable to explore alternative mechanisms
for managing the financial stability risks of CBDC, and their relative costs and benefits. Such work would benefit from
detailed analysis of the magnitude of the potential shifts between deposits and CBDC, including the estimation of the
interest semi-elasticities and cross-price elasticities of CBDC and bank deposits. In the sphere of monetary policy, recent
work by Meaning et al. (2018) and the authors of Sveriges Riksbank (2018) could be extended to explore more new and
novel policy tools that could potentially become feasible with CBDC. Analysis of the central bank’s own balance sheet risk
from issuing CBDC would also be valuable and could build off existing insights from the literature on quantitative easing.
This paper does not present a case for or against CBDC. Rather, it assumes that a CBDC is being or has been introduced,
and then studies the balance sheet and financial stability implications. It does not attempt to evaluate whether the
introduction of CBDC presents a net benefit to the financial system and to society. This is still an open question for
many central banks, with the answer likely to vary across countries. A few central banks have taken a decision. In 2015,
Ecuador issued a US-dollar denominated national digital currency (although the government decommissioned the CBDC
in March 2018 after it failed to gain a significant number of users or payment volumes), while more recently the National
Bank of Denmark (Gürtler et al., 2017) and the Reserve Bank of Australia (Lowe, 2017) concluded that in their respective
economies the potential benefits of introducing a CBDC to households and businesses do not currently outweigh the risks.4
China has developed and tested a pilot version of a CBDC, while Sweden has committed to doing so (Ingves, 2018).
The rest of the paper is organised as follows. Section 2 discusses the core principles in greater detail. Section 3 provides
an overview of our general model of CBDC and the simplifying assumptions made to facilitate a stylised balance sheet
analysis of the model. Section 4 discusses the mechanics and balance sheet implications of the initial introduction of
CBDC. Section 5 discusses the loss-of-confidence or digital bank run scenario. Section 6 summarises the key insights of
the paper.
2. CBDC — core principles
Before presenting our proposed core principles, we need to discuss two concepts that will be used repeatedly
throughout our analysis.
The first concept concerns the determination of interest rates. For any medium of exchange, its overall return consists of
the sum of a financial return and its usefulness as a medium of exchange, which is typically referred to as the convenience
yield. The sum of these two returns should, by arbitrage, equal the financial return on a pure store-of-value asset. The
key observation is that highly liquid, and therefore highly convenient-to-use monetary assets, including bank checking
4 Engert and Fung (2017) also address this specific question for a CBDC used by the general public and find that some of the motivations for
a central bank issuing a CBDC (reducing the effective lower bound on interest rates and reducing financial crime) are not compelling, or could
potentially be achieved by other means (such as regulation to increase contestability in retail payments). In contrast, Barrdear and Kumhof (2016)
have found, through macroeconomic modelling, that CBDC can convey substantial benefits if issued against government bonds, as it could permanently
raise GDP due to reductions in real interest rates, distortionary taxes, and monetary transaction costs.
555

## Page 4

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

deposits but also CBDC if issued as a retail payment medium to households and firms, have a relatively high convenience
yield and therefore a relatively low financial yield, and conversely for less liquid assets such as time deposits.
The second concept concerns the manner in which CBDC can be introduced into the economy, namely via a CBDC
quantity rule or a CBDC interest rate rule. The reason for considering this distinction is that, while under existing monetary
frameworks the question of whether to choose interest rate or quantity rules has been settled for decades, both in theory
and in practice, in favour of the former, it is not a priori obvious that this should continue to apply in a world with CBDC.
We therefore study the consequences of both options throughout the rest of the paper.
2.1. CBDC pays an adjustable interest rate
Consider first an interest rate rule, where the central bank sets the interest rate on CBDC and supplies whatever
quantity is demanded against eligible assets. A variable interest rate is important for two reasons, first during normal
times, where it can be used as an additional policy tool to manage financial market conditions and affect aggregate
demand, and second during crises, where the interest rate can be lowered relative to the policy rate, if necessary to
negative levels, to discourage bank runs, as discussed in Section 5.
In the case of a quantity rule, where the central bank sets the quantity of CBDC and allows the CBDC interest rate to
adjust, a variable interest rate is important to maintain price stability. To see this, assume that the central bank has made
a policy decision to set the quantity of CBDC at a fixed level, but also prevents the interest rate on CBDC from adjusting.
Further, assume that the quantity of CBDC supplied exceeds CBDC demand, perhaps because the central bank’s estimate
of the demand for real CBDC balances is imprecise. We now ask which price can clear the market by eliminating the
oversupply. The first possibility is that CBDC depreciates relative to other forms of money, in other words parity breaks
down, which is undesirable. The second possibility is that the CBDC-deposit exchange rate remains fixed at parity but
the general price level clears the market, by reducing the real value of nominal CBDC balances and bringing them in line
with the real demand for CBDC. This would directly challenge the anti-inflationary mandate of the central bank, and is
therefore also undesirable. It is in fact a textbook example of inflationary money printing (electronically). Critically, this
problem does not arise when the CBDC interest rate is allowed to vary to clear the market. In our example, the CBDC
interest rate would rise relative to the policy rate, as this would increase demand and thus bring it into line with supply.
Except perhaps for cases where CBDC is exclusively designed for the narrow purpose of replacing disappearing
physical cash, and therefore designed with very limited functionality, an adjustable CBDC interest rate is a fundamental
requirement for an effective CBDC system. It plays a key role in monetary policy design, maintenance of financial stability,
maintenance of price stability, and maintenance of parity between CBDC and bank deposits.
2.2. Reserves and CBDC are distinct, and not guaranteed to be directly convertible into each other at the central bank
The second core principle is that reserves and CBDC must be distinct, and not guaranteed to be directly convertible
into each other at the central bank on demand. The main objective of this principle is to help safeguard financial stability
when depositors seek to switch into CBDC in large numbers. The reason is that under such circumstances a single bank’s
willingness to pay out CBDC against deposits could be sufficient to threaten financial stability if reserves and CBDC are
directly convertible. This stems from banks’ commitment to settle interbank payments in reserves via the RTGS system.
When a single bank pays out CBDC against deposits, all non-bank agents can make use of this by transferring deposits to
that bank, and upon losing deposits to that bank, other banks must settle the resulting interbank obligations in reserves.
When these reserves are convertible into CBDC on demand at the central bank, the single bank can use its newly acquired
reserves to in turn acquire CBDC, which it then pays out to the depositors that came to it for that purpose. This would
lead to a destruction of deposits and facilitate a system-wide, near-instantaneous bank run. If reserves and CBDC are not
distinct, but instead one and the same, a run via the RTGS system could occur in the same way.
A further benefit of reserves and CBDC being distinct is that it enables reserves and CBDC to have a separate core
purpose. In particular, CBDC does not have to function as the interbank settlement asset or be bound by the same rules as
RTGS. This in turn allows the central bank to operate a new policy instrument, specifically the quantity of or the interest
rate on CBDC. The existence of a new policy instrument flows from the central bank being the sole provider of two forms
of money that are imperfect substitutes, thereby allowing for time-varying spreads between their interest rates. The main
reason is that the convenience yield on a retail payment medium like CBDC will be very different and much higher than
that on an interbank payment medium — we will discuss this in more detail below. The new policy instrument could be
used as a tool for monetary policy or for financial stability (the latter potentially targeted at managing the risks associated
with the presence of CBDC), while enabling the central bank to retain control over the quantity of reserves in the financial
system. Retaining this control allows the central bank to continue to influence the rate on reserves and thereby the
risk-free interest rate in the economy, the key rate for real investment and intertemporal allocation decisions.5
5 Note that if the central bank converts some quantity of reserves to CBDC at its discretion, this need not pose a risk to financial stability. It is
the guaranteed on-demand ability of commercial banks to obtain CBDC for reserves at the central bank which opens the door to banks runs and
breaks central bank control over the quantity of reserves. A policy mistake by the central bank on this issue could, nevertheless, be destabilising,
and switching on and off convertibility in response to demand for CBDC could introduce signalling that could be destabilising. Accordingly, a broad
policy of no conversion of reserves to CBDC might be preferable.
556

## Page 5

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

Fig. 1.

CBDC demand curve. The interest rate and convenience yield on CBDC.

If reserves and CBDC are both distinct and operated using different technological systems, then this might make the
overall financial system costlier, but it would also increase the resilience of that system, because CBDC could potentially
provide at least a partial back-up service for reserves and bank deposits should the RTGS system fail.
Some papers that study CBDC assume that the market for reserves is subsumed into the new CBDC system (Meaning
et al., 2018). Or, to put this in another way, they assume that CBDC is created via a broadening of access to the reserves
system rather than via the introduction of a new form of central bank money. Such a system would not allow for the
second core principle to be respected, and therefore for the above benefits to be realised. Moreover, broader access to
reserves could change the transmission mechanism of monetary policy in unknown ways, while when reserves and CBDC
remain separate, at least the transmission mechanism of conventional monetary policy via the policy rate could look very
similar to today.
Other papers argue that – even when CBDC is distinct from reserves – it is not possible for a new policy tool to exist,
as arbitrage will bring about convergence between the rates on reserves and CBDC (Engert and Fung, 2017; Bordo and
Levin, 2017). This conclusion is a direct consequence of the assumption that these two forms of central bank money are
essentially identical in the utility they provide to users. If, on the other hand, CBDC is used as a payment medium beyond
the banking sector, with a high convenience yield, while reserves are used as an interbank settlement medium, with a
much lower convenience yield, this assumption would not hold, as indeed it does not hold with reserves and physical
cash. Therefore, using instead a set up where reserves and CBDC are distinct, we can show that the use of a new policy
instrument is indeed feasible while the traditional policy rate continues to determine the risk-free interest rate, and while
at the same time avoiding the above-mentioned financial stability issues that can arise with merged reserves and CBDC.
We now discuss the above arguments in additional detail, by showing that reserves and CBDC can be distinct, with
different interest rates applying to each. We also demonstrate that arbitrage by households, firms and banks will not drive
the interest rate paid on these two forms of central bank liability to be equalised.
2.2.1. Determinants of the interest rates on reserves and CBDC
We start by discussing the interest rates paid on the different forms of central bank money. The nominal interest rate
on physical cash of course equals zero. The nominal interest rate currently paid on reserves is either equal, or closely
related by arbitrage, to the economy’s risk-free nominal interest rate, which is an interest rate on a nominally risk-free
pure store-of-value asset such as local-currency denominated short-dated government bills.6 The nominal interest rate
on CBDC is also risk-free, but this is an interest rate on an asset that functions not only as a store of value but also as
a retail medium of exchange that can be used by all households and firms, so that its return consists of the sum of a
financial return and a sizeable convenience yield. All else equal, at the margin, the convenience yield is decreasing in the
quantity of CBDC supplied, and the CBDC demand curve is upward sloping in the interest rate paid on CBDC. See Fig. 1
for an illustration.
The convenience yield is large when the supply of CBDC is not large relative to bank deposits (a reasonable assumption
in our view, and in any event a policy choice), and when CBDC is used as a generally accessible and therefore useful
medium of exchange by households and firms. For this case, we adopt the notation cycbdc
hf . Other important properties of
6 Because reserves serve as an interbank payment medium, they do attract a small convenience yield.
557

## Page 6

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

the convenience yield are that it is a function of the stock of CBDC, that is cycbdc
= cycbdc
(CBDC ), that its size is hard to
hf
hf
know by the policymaker ex-ante because it depends on many details of the transactions cost technology, and that it is
potentially volatile, especially during financial crises characterised by rapid changes in the demand for liquidity.
Denoting the risk-free interest rate by rr and the interest rate on CBDC by rc, we have the no-arbitrage condition
rr = rc + cycbdc
hf (CBDC )

(1)

Different assumptions about the design of a CBDC system can now be discussed against the background of this simple
condition. The assumption of Barrdear and Kumhof (2016), henceforth BK, is that CBDC is a third form of central bank
money, and is therefore distinct, including in the interest rate paid on it, from reserves. This is also the assumption of
this paper. The alternative definition, henceforth ALT, is that CBDC represents expanded access to reserves.
The BK assumption under a CBDC interest rate rule is that policy controls both rr, via the market for reserves, and rc,
via the market for CBDC. In this world, optimising agents can approach the central bank and exchange eligible securities
for CBDC to adjust their holdings of CBDC until cycbdc
hf (CBDC ) is consistent with the difference rr − rc, which is set by the
central bank. The BK assumption under a CBDC quantity rule is that policy controls both rr and the quantity of CBDC, and
that the interest rate on CBDC, rc, is determined by the market, and adjusts to satisfy the arbitrage condition, given the
convenience yield implied by the quantity of CBDC. In both cases, the central bank exploits the fact that the introduction
of CBDC with a sizeable convenience yield makes it possible to control a second policy instrument. The central bank uses
this to control both the risk-free interest rate and either the interest rate on or the quantity of an important new form of
money.
In ALT, it is instead assumed that the authorities surrender the benefits of a second policy instrument, by merging the
markets for reserves and CBDC. It is typically also assumed that the authorities choose to control the interest rate on,
rather than the quantity of, this money. Specifically, reinterpreting rc now as the interest rate on the combined reservescum-CBDC money rather than on stand-alone CBDC, the authorities control only rc, which is likely to be very similar to
the rc of a BK system because the marginal user, who determines the convenience yield, is in both cases a retail user,
that is a household or firm. Crucially, this means that the authorities do not directly control rr, the risk-free interest rate.
But this immediately raises a number of questions.
First, why would the authorities accept the previously discussed financial stability risks of merging reserves and CBDC?
Second, why would the authorities give up control over a second policy instrument when there is no necessity to do so,
and knowing that there is at least a chance that this second instrument could make a substantial contribution to stabilising
the economy? Third, why would the authorities choose to control rc? If they control rc, which now equals the rate on
both reserves and CBDC, then rr, the risk-free interest rate, will be determined by the magnitude of the convenience
yield, cycbdc
hf (CBDC ). We have discussed above why the size of this yield is hard to know ex-ante and probably at times
quite volatile, properties that rr would inherit. But the real risk-free interest rate on a pure store-of-value asset is the key
interest rate for real investment and intertemporal allocation decisions, and should therefore remain the main instrument
of monetary policy.
Matters would be even more problematic with a quantity rule for reserves-cum-CBDC. Here the authorities would
control the quantity of CBDC in Eq. (1), but they would not directly control cycbdc
hf (CBDC ), because that depends not only
on money supply but also on money demand, and they would not directly control any interest rate.
2.2.2. The role of household and firm arbitrage
We now use the no-arbitrage condition (1) to study the argument that arbitrage by households and firms would
eliminate any difference between the interest rates on reserves, rr, and on CBDC, rc. Start by assuming that rc = rr.
The problem with this assumption is that it requires cycbdc
(CBDC ) = 0, meaning CBDC would have to reach a satiation
hf
point. We can assess the likelihood of this point being reached by considering the situation with bank deposits. Taking
the deposit rate to be rd, major economies are typically far from rr = rd, and this is at levels of bank deposits that are
already large relative to GDP. By analogy, expanding CBDC so that rc = rr, even approximately, would probably require a
very large issuance of CBDC. This would raise a major question: with so much liquidity in the economy from CBDC alone,
why would there still be any need for bank deposits? This leads us to conclude that the central bank would probably like
to issue only a moderate quantity of CBDC. And in that case, the convenience yield will be of a similar order of magnitude
as the convenience yield on bank deposits, which is typically in the order of percentage points rather than basis points. It
is therefore not likely that arbitrage would eliminate differences between the interest rates on reserves and on CBDC in
a BK-style CBDC system. Of course, in an ALT-style system it would eliminate those differences by assumption, because
reserves and CBDC would be indistinguishable in their functionality, but we have pointed out above why such a system
is undesirable.
2.2.3. The role of bank arbitrage
Our analysis up to this point, much of which is contained in Eq. (1), has centred on the role of non-bank users of
CBDC, because they are the agents that determine, in conjunction with central bank policy rules, the interest rate on
or quantity of CBDC. The reason is that they are the agents that absorb the marginal unit of CBDC, because they derive
substantial non-pecuniary benefits from holding a retail medium of exchange, while banks’ marginal benefit from holding
CBDC over reserves or government bonds is likely to be very small by comparison. Non-banks therefore determine the
558

## Page 7

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

convenience yield of CBDC, which, given the policy interest rate on reserves, in turn determines the CBDC interest rate.
But this analysis is not complete without also considering the role of banks in the CBDC market. We now turn to this,
and offer two additional insights.
First, banks will not tend to hold much CBDC. Banks face the same rr and cycbdc
(CBDC ) as households and firms, because
hf
the risk-free interest rate is common to all agents in the economy, while the convenience yield in the CBDC market is
determined by households or firms. This means that banks would likely not hold any substantial quantity of CBDC because
the opportunity cost would be too high. Formally, and denoting the quantity of CBDC held by banks by CBDC b , and the
convenience yield of CBDC to banks by cycbdc
(CBDCb ), this represents a corner solution in banks’ portfolio problem:
b
rr > rc + cycbdc
(CBDCb )
b

(2)

When a customer wants to buy CBDC from a bank as a service, the bank can still offer that service if it chooses to do
so, but it would do this by purchasing CBDC at the time it is requested by customers. Therefore, for settlement purposes,
commercial banks will prefer reserves to CBDC, and banks will only keep as much CBDC on their balance sheet as they
consider necessary to satisfy customer requests. If customers satisfied their demand for CBDC exclusively in a CBDC market
rather than via banks, we would have CBDCb = 0. This is analogous to banks’ decision on holding physical cash, which is
also minimised to the point where it is just sufficient to service customer requests.
Second, arbitrage by banks will not cause rr and rc to converge in a world where reserves and CBDC are distinct. Banks
cannot ‘borrow CBDC’ at the rate rc and invest it in reserves at the rate rr. CBDC is an outside asset, and banks can acquire
this asset like any other security, by paying for it by creating deposits. Deposits in turn must pay the market-clearing
interest rate on deposits, not the rate on CBDC. The same is true for any purchases of securities paid for by the creation of
dep
deposits. Denoting the rate on deposits by rd, the convenience yield on deposits as cyhf , and the spread that compensates
deposit holders for the credit risk of holding deposits at commercial banks by s, we have the no-arbitrage condition
dep

dep

rd = rc + cycbdc
(CBDC ) − cyhf (DEP ) + s = rr − cyhf (DEP ) + s
hf

(3)

The marginal holders of CBDC, households or firms, will therefore be indifferent between deposits and CBDC at the
prevailing interest rates and endogenous stocks of these two types of money. And, similar to (1), (3) does not imply that
arbitrage will tend to equalise any of the three interest rates rr, rc and rd.7
Summarising Section 2.2, when CBDC is distinct from reserves, the result is the avoidance of a potentially important
source of risk for runs on the banking system, the prevention of potentially costly fluctuations in the risk-free interest
rate, and the availability of a new policy instrument for the central bank, either the interest rate on or the quantity of
CBDC. The ability to use reserves and CBDC as separate policy tools arises from the central bank being the sole provider
of these two distinct forms of money, which are not perfect substitutes for each other or for the other main source of
money in the economy — bank deposits.
2.3. No guaranteed convertibility of bank deposits into CBDC
The literature on CBDC sometimes suggests that there should be guaranteed convertibility of bank deposits into CBDC
for all bank depositors, meaning households, firms and NBFIs. In other words, banks should have an obligation to convert
deposits into CBDC at any time and in any quantity. We find that, as a mandatory feature of CBDC, this is unprecedented,
dangerous and unnecessary.
Why is it unprecedented? As discussed in Section 2.5, there is no legally mandated requirement for commercial banks
to pay out retail central bank money, specifically banknotes, on demand against bank deposits. Indeed there are many
examples during banking crises where governments explicitly forbid banks to pay out banknotes (beyond some low
limit). Thus requiring banks to pay out retail central bank money, now in the form of CBDC, against deposits would
be unprecedented.
Why is it dangerous? Because it facilitates runs from deposits into CBDC that could conceivably be near-instantaneous
and of an unprecedented scale, given that this would be an electronic run from the banking system as a whole to the
central bank, rather than a run from one bank to another.8 This guarantee would require the central bank to pre-commit
to take an unprecedented amount of risk onto its balance sheet. The reason is that while the banking sector may be able
to meet the convertibility obligation when net flows into CBDC and out of deposits are small and slow-moving, credibility
also relies on being able to meet the obligation in times of stress. This means that the guarantee must cover situations
where demand is so great that the banking sector has run out of CBDC and is also unable to obtain CBDC from the non-bank
sector, because the assumption is that that sector as a whole wants more CBDC, not less. Banks would then need to sell
eligible securities to the central bank to gain CBDC, with the central bank possibly having to expand the list of eligible
7 Engert and Fung (2017) set out an arbitrage strategy for banks that is similar except that it (i) abstracts from the convenience yields on CBDC
and bank deposits, and (ii) assumes that banks are able to borrow CBDC in the market at the CBDC interest rate, rather than at the going interest
rate on bank deposits. Under these assumptions, they find that the rr-rc spread would, other things equal, reduce to zero.
8 It is not problematic if banks provide CBDC for deposits at their discretion. Banks could choose to convert regular deposits to CBDC when it
suits them, by becoming a seller (against bank deposits) in an economy-wide market for CBDC that is open to banks and non-banks alike. But in
conditions where they run out of CBDC or eligible assets they could simply choose to no longer participate in this market.
559

## Page 8

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

collateral, or even to dispense with collateral requirements altogether in large-scale unsecured lending. Hence a credible
obligation on banks to supply CBDC on demand for deposits requires the central bank in turn to pre-commit to supply
CBDC on demand to banks.
A central bank action that may help in such a crisis scenario would be to lower the rate on CBDC (relative to deposits),
to discourage switching. However, rates on CBDC may need to be substantially negative to materially stem the outflow
of deposits, and negative rates of this magnitude may face political economy barriers. There is also a risk that even
substantially negative rates would not be an effective disincentive to hold CBDC in a situation of widespread market
panic.
By contrast, consider a situation where banks are not obliged to provide CBDC on demand for deposits. In this case
non-banks can nevertheless freely obtain CBDC against bank deposits in a private market, either from other non-banks or
also, at their discretion and at most times, from banks. We emphasise this: ruling out an obligation on banks to convert
deposits into CBDC does not imply that households or firms cannot exchange deposits against CBDC in a private market
where furthermore, at most times, banks might participate. Furthermore, participants in this market do have a guarantee
that they can freely obtain additional CBDC from the central bank against eligible securities. What is ruled out is only
guaranteed convertibility against non-eligible securities. Crucially, exchanging deposits for CBDC with non-banks does not
affect the aggregate quantity of bank deposits, it only changes the owners of bank deposits. More generally, there cannot
be a run on the aggregate banking system when that run is driven by deposit withdrawals from one bank that end up
being deposited in another bank. In this way it can be seen that it is not the presence of CBDC in and of itself that would
make the financial system fundamentally different from, and more dangerous than, our current system. Rather, it is the
presence of a CBDC in combination with a guarantee of unlimited convertibility between deposits and CBDC that drives
a real risk to financial stability. Under our core principles, any run into CBDC would necessarily be a run from eligible
securities, not from bank deposits.
There can still be one form of aggregate bank run even in a world where guaranteed convertibility between deposits
and CBDC is ruled out, namely a run from bank deposits into physical cash. But this is as feasible with CBDC as without.
Furthermore, a run from deposits to cash is less likely than a run from deposits to deposits, because the time requirements
and expenses associated with physical conversion into cash are much greater than those of digital conversions.
Runs within the banking system, where customers move their deposits electronically from one bank to another, are
also possible in a world where convertibility between deposits and CBDC is ruled out. But once again this is as feasible
in a world with CBDC as without. The precise effects of CBDC on the risk of within-system deposits-to-deposits runs,
deposits-to-cash runs, and other risks to financial stability are an important area for further research. But there is no a
priori reason to think that CBDC would make such runs larger or more likely. In fact, with CBDC present it may become
easier to resolve troubled institutions quickly and without the risk of contagion, which can remove a major reason for
depositors to run in the first place (for further comments on this, see Section 5). In this paper we focus on runs out of
the aggregate banking sector into CBDC, because that type of run is genuinely new to CBDC, and conceivable if the CBDC
system were to be badly designed.
Why is guaranteed deposits-to-CBDC convertibility unnecessary? The argument for a guarantee of convertibility of bank
deposits into CBDC often seems to be that it is necessary to maintain a 1:1 exchange rate (parity) between bank deposits
and central bank money. This is not compelling. Indeed, parity between bank deposits and CBDC can be maintained as long
as: (i) The central bank allows the adjustment of the interest rate on CBDC (under a CBDC quantity rule) or the quantity
of CBDC via exchanges of eligible securities against CBDC (under a CBDC interest rate rule) such that private sector agents
expect the parity condition to hold. That is, the central bank consistently and credibly acts to match the quantities of CBDC
demanded and supplied at the targeted quantities or prices. (ii) There is a functioning and liquid market for CBDC eligible
securities. (iii) There is at least one private sector agent (such as a bank or other financial institution) that can accept/issue
a payment from bank deposits and is active in both the market for CBDC and in the market for CBDC eligible securities.
Condition (i) is self-explanatory. Conditions (ii) and (iii) allow for agents to take advantage of any arbitrage opportunity
in this market, thus driving deviations from parity between CBDC and bank deposits to zero. As an example, assume that
CBDC is trading at an exchange rate of 1 − x to deposits, for x > 0. Then a financial institution can lock in a riskless profit,
by taking 1 unit of deposit inflow from a customer, buying 1 unit worth of government bonds in the market, immediately
selling the bonds to the central bank for 1 unit of CBDC, delivering 1 − x of CBDC to the customer, and keeping x CBDC
as riskless profit. Arbitrage will drive x to zero. Note that it is the central bank’s commitment to pay 1 unit of CBDC for
a bond worth 1 unit of ‘deposit-money’ – that is, the central bank’s use of a parity exchange rate in its operations – that
allows this strategy to work. The same arbitrage argument also applies to the at-par relationship between cash or reserves
and CBDC in the absence of guaranteed convertibility: banks obtain cash and reserves by exchanging eligible securities
for them at par, so convertibility at par between CBDC and eligible securities, together with arbitrage by banks, ensures
that CBDC and cash or reserves also trade at par.
Under these conditions, a plausible outcome would be a large and liquid private market in which households and
firms at all times, and banks at their discretion, can trade bank deposits against CBDC among themselves, with a few
participating agents having access to stocks of eligible securities that can unlock additional CBDC from the central bank.
Reliance on this market, together with the presence of at least one agent capable of trading on any arbitrage opportunities,
as outlined above, would ensure parity of bank deposits, cash and reserves with CBDC as effectively, and with fewer risks,
as reliance on their guaranteed convertibility into CBDC.
560

## Page 9

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

The channels for maintaining parity between bank deposits and other forms of central bank money that exist today,
that is without CBDC, are as follows: Parity between cash and reserves is maintained by the central bank exchanging
reserves for cash. Parity between bank deposits and reserves (and therefore cash) is maintained by the requirement on
commercial banks to settle interbank deposit flows in reserves at parity.9 Convertibility of bank deposits into cash is
generally not mandated by law. But it is typically offered by banks, and this does help to support parity during normal
times. However, in modern economies, where electronic payments dominate, it is the commitment by banks to settle
interbank electronic transfers in reserves at par that anchors bank deposits to the national currency. Thus, there is parity
between bank deposits and all forms of central bank money, and yet this does not require the central bank to offer
guaranteed convertibility of bank deposits into any form of central bank money, either directly or via an obligation on
commercial banks.
We note that there are several other quantity-based or price-based mechanisms whereby a CBDC system could be set
up so as to limit the conversion of deposits into CBDC in the event of an attempted run. Examples for quantity-based
mechanisms include capping the amount of deposits that banks are obliged to convert into CBDC over a set period,
or limiting the quantity of CBDC that can be held in any one CBDC account. However, such limits run the risk of not
maintaining parity even during normal times. Moreover, as set out in Gürtler et al. (2017), a cap on holdings of CBDC
would limit the number or value of transactions that could be made, potentially compromising the effectiveness of CBDC
as a payment system. Relating this to financial stability, Callesen (2017) argues that if the cap is high enough to allow
CBDC to be useful for transaction purposes it will also be too high to contain the risk of bank runs. This is why we have
chosen to express our third core principle as banks having no unconditional obligation to provide CBDC for deposits at
all, while they are free to exchange CBDC for deposits at their discretion. This is an attractive approach as it allows banks
and non-banks to determine for themselves how to manage the risks they face, while – in concert with the other core
principles – providing assurance that the risk of an aggregate run out of the banking sector has been addressed.
An example of a price-based mechanism to limit the conversion of deposits into CBDC is the two-tiered CBDC
remuneration scheme proposed by Bindseil (2020), where the central bank sets a relatively high CBDC interest rate for
tier 1 quantities up to a cap and a much lower interest rate for tier 2 quantities beyond that. Bindseil (2020) argues that
this could allow interest rates alone, rather than additional limits on convertibility, to solve the problem of digital bank
runs into CBDC. While a two-tiered remuneration scheme (or even a scheme where interest rates become increasingly
negative for each additional unit of CBDC held) may help to limit CBDC holdings during normal times, it is not clear
that such a scheme, on its own, would be effective during a market panic: when depositors fear capital loss, they will
be willing to pay (almost) any penalty interest rate, at least over short periods, to avoid this, and this is why, as well
as advocating for an adjustable interest rate, we include a mechanism for CBDC to decouple from the banking sector in
times of crisis. In addition, many of the criticisms levelled at quantity caps could be made here (a cap high enough to
facilitate transactions will be too high to contain the risk of bank runs), and moreover implementing a tiered remuneration
scheme could face significant practical difficulties: would firms receive the same tier 1 cap as households? If not, how
would firm caps be determined? Would different types and sizes of firms get different allocations (for example, retailers
versus financial firms)? Would firms be able to devise arbitrage schemes to get around caps? While one could come up
with criteria, it seems likely that any proposal would be seen as unjust by at least some participants. Finally, if ongoing
central bank research were to conclude that token-based CBDC was preferable to account-based CBDC, this might make
implementing a tiered interest rate system problematic.
2.4. The central bank guarantees to issue CBDC only against eligible securities
The fourth core principle is that the central bank only guarantees to issue CBDC against eligible securities of its
choosing, such as government bonds. It does not guarantee to exchange CBDC for reserves, as argued in Section 2.2,
and it does not exchange CDBC for bank deposits, as argued in Section 2.3. This core principle allows the central bank to
manage the risk to its own balance sheet from issuing CBDC, just as it does for reserves and cash today. More importantly,
these arrangements can mostly eliminate the risk of aggregate runs out of the banking sector.
The principle that the central bank only guarantees to issue CBDC against eligible securities, alongside the other core
principles, means that bank funding is not necessarily displaced when the supply of CBDC expands. To illustrate this,
consider a simplified scenario where we assume that eligible securities consist only of government bonds. A private-sector
agent who wishes to switch from bank deposits to CBDC must first acquire government bonds in exchange for deposits,
in order to then offer the government bonds to the central bank in exchange for CBDC, or alternatively the agent must
find a counterparty that obtains CBDC from the central bank in exchange for government bonds, and is willing to trade
that CBDC against the agent’s deposits. With these transactions, so long as the government bonds are not acquired from
the banking sector, the deposits do not leave the aggregate banking system, they are simply transferred to the seller of
the government bonds or of CBDC. As a result, bank funding is not, in aggregate, ‘lost’ when the private sector acquires
additional CBDC. The key to this result is that the central bank will not accept bank deposits in exchange for CBDC,
in other words it will not commit to funding commercial banks directly and without limit. In this simplified scenario
9 This observation is particularly relevant for proposals for CBDC that are motivated by a desire to address declining cash use and/or to accelerate
the demise of cash (see Sveriges Riksbank (2017) and Bordo and Levin (2017), respectively).
561

## Page 10

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

this forces agents to first exchange their deposits for assets that are not bank liabilities, namely government bonds, and
the counterpart of increases in CBDC holdings is decreases in private sector government bond holdings, not in deposits.
Furthermore, if the government bonds are acquired from the banking sector, the counterpart of lower deposit holdings is
neither reduced lending to the private sector (because it is bank holdings of government bonds that decrease, not loans)
nor reduced liquidity in the hands of private agents (because the sum of bank deposits and CBDC does not change), at
least in the first round.10
It may be the case that the non-bank supplier of the bonds does not wish to retain the additional liquidity gained
when it sold government bonds in exchange for deposits, but instead uses the deposits to purchase a different asset. But
so long as banks do not choose to sell their own assets for these deposits, aggregate bank funding will not be reduced,
and even if they do sell their own assets, the transaction will be voluntary rather than forced.
2.5. Are these core principles too radical?
One potential objection to the core principles outlined above, and in particular to the second and third principles, is
that they are too radical a departure from the traditional world of central banking. We would argue against this on two
fronts. First, our proposals are less radical than they might at first appear, and second, the current reality is ‘more radical’
than many realise. We begin with the former, distinguishing between the second and third core principles.
The second principle argues that one form of central bank money, reserves, should not be guaranteed to be directly
convertible to another form, CBDC. This seems like a major imposition, but first of all this leaves open the possibility that
the central bank will in fact perform this conversion during normal times, and even if it does not, the important word
here is ‘directly’. In normal times, reserves and CBDC will, to all intents and purposes, be convertible by a bank even if the
central bank does not directly perform the conversion. This is because the bank can first buy a government bond or other
eligible security with reserves, and can then deliver the same bond to the central bank for CBDC. The only time when
CBDC-reserves convertibility might break down is when the central bank does not perform the direct conversion and in
addition markets for eligible securities become impaired, either due to an absence of offers to sell eligible securities in a
very serious crisis, or possibly if the central bank comes to view prices as distorted and, to protect its own balance sheet,
suspends its CBDC operations (although accepting a wide range of eligible securities would ameliorate this risk, as only
a single functioning eligible securities market is needed). In this instance, and as discussed in Section 5, our principles
allow CBDC to decouple from other forms of central bank money, in preference to forcing the liquidation of the banking
system or uncontrolled risk-taking by the central bank. The second principle is therefore much less radical than it might
appear.
The same is true for the third principle, which argues that banks and the central bank should have no obligation to
convert deposits into CBDC on demand. Similar to the second principle, this will only bind in a crisis. In normal times
competitive pressures will lead many banks or other institutions to offer a deposits-to-CBDC exchange service. The reason
is that this is of commercial value to its deposit holders, and that providing this service is likely to be low risk and low
cost as it simply involves buying an eligible security with deposits and delivering the same security to the central bank for
CBDC. Again, in a crisis, this might break down as banks withdraw from this market, but this is preferable to the forced
liquidation of the banking system or uncontrolled risk-taking by the central bank.
We would envisage that CBDC will be legal tender as cash is today. In this context, it is important to observe that
CBDC being legal tender is compatible with the absence of legally-mandated at-par convertibility between CBDC and
cash, reserves, or bank deposits.11 The legal concept of ‘legal tender’ varies in different legal systems, but within the
monetary jurisdictions of the Dollar, Euro and Sterling zones, a few relevant characteristics are shared. First, legal tender
is a relatively narrow legal concept, which is only relevant for the payment of debt: when a debtor provides ‘legal tender’
to a creditor in payment of debt, the debtor can legally consider the debt paid whether the creditor accepts the payment
or not. Put differently, if a creditor refuses legal tender from a debtor, the creditor loses the right to pursue the debtor in
court for payment (see Gleeson (2018) and McBride (2007) for an accessible discussion of these concepts). Second, legal
tender legislation only applies to banknotes and coins, not to credit balances in reserve accounts held at a central bank
(see the 31 U.S. Code §5103 (for the US); Report of the Euro Legal Tender Expert Group, pages 23–43 (for the Eurozone)
and Currency and Bank Notes Act 1954 (2 & 3 Eliz II, c 12) s 1 (for the UK)).12 Third, although legal tender laws do
assume that notes and coins will trade at par ‘‘when being used as a means of payment’’, they do not oblige a central
or commercial bank to ‘‘exchange’’ or ‘‘convert’’ electronic account balances into banknotes or coins at par (see Report of
the Euro Legal Tender Expert Group, pages 4 and 16).
10 As discussed in Section 4, there might be second round effects that lead to equilibrium changes in lending to the private sector. Some of these
effects may be due to regulatory requirements such as the Basel III Net Stable Funding Ratio and Liquidity Coverage Ratio.
11 Legal tender status can be viewed as a design choice for CBDC rather than an inherent characteristic, analogous to the technical functionality
that a central chooses to give to CBDC (e.g. the richness in messaging attached to CBDC transactions, the capacity to link to other payment systems,
etc.).
12 There is in fact a simple reason that reserves are not legal tender, which is that most people cannot accept reserves as payment. Legal tender
status means that a debtor can discharge their debts by offering to pay using that payment method; for this to be equitable, essentially all citizens
must be able to accept such an offer of payment. This is true for cash, but no citizen can accept reserves as payment.
562

## Page 11

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

The financial practices of commercial and central banks reflect those legal rules. Central banks provide banknotes
(legal tender) to some reserve account holders via discretionary transactions (which may have a fee attached) governed
by supply contracts (see, Bank of England (2019); Federal Reserve Banks (2016); Allen and Dent (2010)). In short, the
commercial bank makes a request to buy legal tender (banknotes) using non-legal tender money (reserve balances) from
the central bank with a potential premium attached. No legal rules oblige central banks to deliver banknotes to commercial
banks; the note issues occur under facultative legal powers to ‘issue’ rather than ‘exchange’ or ‘covert’ reserve balances
into banknotes (e.g. Federal Reserve Act, 16; Currency and Bank Notes Act 1954, s 1). The same basic practice is followed
by commercial banks distributing banknotes to customers via ATMs or cashiers: non-legal tender money (deposits) is
used to buy legal tender (banknotes) and a small fee may, in the many countries, be charged, which de facto breaks the
1:1 exchange rate between deposits and cash.13
Additionally, there is nothing under the law requiring different forms of legal tender to be directly convertible at par,
and indeed there are historical examples where this has not been the case.14 ‘Legal tender’ is therefore best viewed as
one of many legal and non-legal attributes of a financial asset that affect its attractiveness as a medium of exchange.
We now turn to the fact that the current reality is in fact ‘more radical’ than many realise. For convertibility between
different forms of central bank money, the second principle is not far from current practice, since very few entities can
directly exchange the existing forms of central bank money, namely reserves and physical cash (banknotes), and none
have a legally-mandated ‘right’ to do so. For example, in the UK, of the roughly 200 institutions with reserve accounts,
only the four members of the Notes Circulation Scheme can buy or sell banknotes directly with the Bank of England.
And, of course, many millions of non-financial firms and households in the economy without reserve accounts cannot
obtain reserves for their banknotes. The situation is similar in many other countries. For convertibility between bank
deposits and central bank money, the third principle is also not radically different from current practice. As discussed,
deposits at commercial banks are commonly only convertible into banknotes if your bank agrees to do the conversion.
In many countries including the UK and US this is not required by law (or even specified in the terms and conditions
of many deposit accounts). And in every country any explicit or implicit promise to pay out banknotes fails when the
bank making this promise fails. Similarly, bank deposits are often not convertible into banknotes in times of crisis. This
happened even in the Eurozone recently, when Greece and Cyprus imposed withdrawal limits during their crises.
We have argued that the interest rate on (or the quantity of) CBDC could constitute a new, separate policy instrument.
In this context, we note that financial markets already perceive central banks to be operating multiple policy instruments,
so that the addition of one more instrument would not seem per se controversial. The most obvious example here is
QE, but even focusing only on central bank interest rates, the use of tiering already delivers multiple policy leavers. In
particular, in many currency areas the ‘main’ central bank refinancing rate (for example the Main Refinancing Operations
Rate in the Eurozone) and the ‘deposit’ rate are increasingly moved independently to achieve policy aims, and some
central banks even operate multiple ‘deposit’ rates, with a higher rate that applies to the bulk of reserves (and which
is often interpreted by the financial market press and participants as set to protect domestic bank profitability), and a
lower rate that applies to the marginal unit of reserves (and which is often interpreted by the financial market press
and participants as intended to alter the incentives faced by investors and speculators). An ability on the part of the
central bank to set these rates at different levels is predicated on the assumption that different asset classes are imperfect
substitutes. This assumption is even more justified in the case of CBDC, which offers a distinct retail payment medium,
with a large convenience yield that signals imperfect substitutability.
3. Model assumptions
The model of CBDC that we consider is one where all banks, non-bank financial institutions (NBFIs), households and
firms can have a CBDC account. That is, CBDC can serve as money for all agents in the economy. Access does not imply
that the central bank provides retail services to all holders of CBDC, and for simplicity we assume that only banks and
NBFIs can trade CBDC directly with the central bank, while households and firms must use a new type of NBFI, which we
call a ‘CBDC Exchange’, to buy/sell CBDC in exchange for deposits (an alternative where households and firms can directly
trade CBDC with the central bank is also feasible). A CBDC Exchange may be a new standalone NBFI, or operated by a
bank or existing NBFI, but for clarity of exposition we treat CBDC Exchanges as separate entities in our illustration. A CBDC
Exchange takes bank deposits from households and firms and provides CBDC in return (and vice versa). It may charge a
fee or spread for this service. It is also conceivable that banks may choose to absorb any cost to customers, much as the
cost of providing banknotes today is often not passed on by banks. To maintain its holdings of CBDC, the CBDC Exchange
uses the deposits it receives to purchase government bonds, and then uses the government bonds to obtain CBDC at the
13 The authors are very grateful to Associate Professor Will Bateman of the ANU College of Law for his assistance concerning the legal aspects of
banknotes, deposits, and legal tender.
14 For example, in the early 1900s both gold coins and banknotes were legal tender in Australia, but £1 in gold coins was worth more than £1
in banknotes. A case appeared before the High Court of Australia in which a debt was specified to be paid in gold coins but the debtor chose to
repay the debt with lower-value banknotes instead. The court found that this was acceptable, and that despite the contract specifying gold coins as
payment the creditor could not demand gold coins instead of banknotes. One High Court judge summarised the case thus: ‘‘A contract that a debt
shall be discharged by payment of gold coins (being one form of legal tender) cannot abrogate the enactment by the Legislature that the debt may
be discharged by payment in banknotes (being another form of legal tender)’’. See Mainka (1933), 49 CLR. 242.
563

## Page 12

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

Fig. 2. CBDC Model Setup.

central bank. The CBDC Exchange has an account with at least one commercial bank, in order to be able to accept and
clear deposits. The model setup is illustrated in Fig. 2. It shows the interaction between the central bank, the commercial
banking sector, the NBFI sector, the CBDC Exchange, and the household and firm sector. A setup without the presence of
CBDC can be visualised by ignoring the red CBDC lines.
To simplify the exposition, we assume that banks and NBFIs do not themselves use the services of CBDC Exchanges,
given their direct access to the central bank and their ability to transact in wholesale debt markets to acquire eligible
collateral. CBDC account holders can trade CBDC among themselves, in exchange for assets (including bank deposits) or
goods and services. Banks, in addition to having CBDC accounts (as mentioned above, they are likely to minimise CBDC
holdings), also have access to reserve accounts at the central bank, and no other economic agents have access to reserve
accounts. This can be relaxed to allow CBDC Exchanges to have access to reserves, without any change to our key findings.
We assume that CBDC is issued by the central bank through outright purchases of government bonds and/or loans
to the private sector under repurchase agreements (hereafter, repo) against government bond collateral, with the choice
between outright sales and/or repo at the central bank’s discretion (noting that both are examples of CBDC being issued
against eligible securities).15 The choice between outright sales and repo does not affect our results: in either case eligible
securities must be presented in order to acquire CBDC from the central bank, and the central bank is always prepared to
engage in such transactions; and in both cases the transaction can be reversed by presenting CBDC back to the central
bank, with this reversal required under a repo (but the same securities can then be re-pledged to the central bank for
CBDC) whereas it is optional under an outright transaction. There are differences between outright transactions and repos
– outright transactions involve a transfer of interest rate risk from the seller to the buyer, whereas repos do not; and repos
gross-up balance sheets, whereas outright transactions do not – but neither is relevant for our key results concerning the

15 Under a repo, securities are purchased by the central bank in the first instance, but the transaction is agreed to be unwound and the securities
sold back at an agreed price at some future point. Legally, ownership of the securities changes hands, but this is not reflected in the accounting
treatment, and from an accounting and economic perspective a repo is a secured loan.
564

## Page 13

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

displacement of bank deposits or the possibility of bank runs discussed in Sections 4 and 5.16
We assume for simplicity that only the central bank, commercial banks, and NBFIs hold government bonds directly,
while households and firms only invest in government bonds indirectly via a bank or an NBFI. While this is clearly not
true in practice – consider, for example, high net worth individuals or the treasury departments of large corporations –
it is nearly true and helps to streamline our analysis by limiting the number of possible scenarios that we need to study.
Finally, we assume that the economy is closed, and abstract from the role of foreign banks and foreign investors.
Commercial banks maintain debit and credit positions with NBFIs and with households and firms (these are represented
by the black arrows ‘Bank Deposits’ and ‘Bank Loans’ in Fig. 2). NBFIs provide financial services to households and
firms, including fund management services, which result in NBFIs having financial debit and credit positions vis-à-vis
the household and firm sector.
This model permits us to study how banks would be affected if households and firms could choose between using
electronic commercial bank money and electronic central bank money. Broad access CBDC is also studied in Barrdear
and Kumhof (2016), Engert and Fung (2017), Sveriges Riksbank (2017, 2018) and Meaning et al. (2018), amongst others,
although all differ in their exact specification. We make no assumptions about whether a private digital currency is present
and widely used, and what technology underlies the CBDC system.
4. Balance sheet implications of an initial CBDC introduction
To explore the balance sheet impact of an initial CBDC introduction into the economy, we examine a scenario where
the central bank fixes the interest rate on CBDC and allows households and firms to obtain the quantity of CBDC that they
desire at that interest rate. Our illustration assumes that, at this interest rate and ceteris paribus, households and firms
wish to replace a significant part of their holdings of bank deposits with newly issued CBDC to satisfy their liquidity needs,
which for simplicity are assumed to remain constant in dollar terms. We do not analyse the likelihood of such a shift into
CBDC, but note that it is a feasible outcome if the interest rate and functionality of CBDC were to be sufficiently attractive
relative to bank deposits. A more comprehensive analysis would take into account general equilibrium effects whereby
the introduction of CBDC may increase economic activity and thereby, in combination with imperfect substitutability
between bank deposits and CBDC, the demand for both bank deposits and CBDC.
To understand the potential impact on the size and composition of balance sheets, we trace through all the potential
movements of assets and liabilities within and across the balance sheets of the central bank, the commercial banking
sector, the NBFI sector and the household and firm sector as agents shift from holding bank deposits to holding CBDC.
We assume that the introduction of CBDC occurs in an orderly manner and is not accompanied by material stress in the
financial system.
In each of our scenarios the maintained assumption is that households and firms have an unchanged demand for
liquidity, where liquidity is defined as the sum of bank deposits and CBDC. This means that an increase in CBDC held by
households and firms must result in a reduction in deposits of the same magnitude. When households and firms attempt
to offload deposits that are surplus to their requirements, they can do so by exchanging their deposits with banks, against
either other assets held by banks, or against alternative non-deposit liabilities offered by banks. If the assumption of an
unchanged demand for liquidity is relaxed, deposits need not fall at all when CBDC is introduced. In fact, in Barrdear and
Kumhof (2016), the introduction of CBDC stimulates the economy sufficiently to ensure that demand for bank deposits
rises, rather than falls.
Fig. 3 illustrates the different possible scenarios by way of flow charts, while Fig. 4 and Tables 1 to 3 show the balance
sheet changes corresponding to the possible outcomes in Fig. 3. If banks choose to provide CBDC for deposits, three
ultimate outcomes are possible:

• Banks may sell their own holdings of government bonds to the central bank for CBDC, and then exchange the
CBDC for households’ and firms’ unwanted deposits. In this case the banking sector’s balance sheet contracts. This
corresponds to the left-hand path of Fig. 3, and Option 1 in Fig. 4 and Table 1.
• Banks may purchase government bonds from NBFIs, sell those bonds to the central bank for CBDC, and then exchange
the CBDC for households and firms unwanted deposits. This leaves NBFIs with excess unwanted deposits. These
deposits can be used to:
i. Purchase other (non-deposit) bank liabilities. In this case the banking sector’s balance sheet does not contract.
This corresponds to the middle-right path in Fig. 3, and to Option 2 in Fig. 4 and Table 1.
ii. Purchase other (non-government bond) bank assets. In this case the banking sector’s balance sheet contracts.
This corresponds to the middle-left path in Fig. 3, and to Option 3 in Fig. 4 and Table 1.
16 While both outright transactions and repo are possible, outright transactions may be preferable, and this issuance method accords with how
many central banks issue banknotes: banknotes are a retail payment instrument and store of wealth, and tend to say in circulation for many
years or even decades once issued, with outright purchases of long-dated government bonds a natural counterpart to these long-lived liabilities. It
seems likely that CBDC – being a retail payment instrument and store of wealth – will also stay in circulation for long periods once issued, and in
this respect resemble banknotes. Note that CBDC could also be spent into circulation by the central bank or government, but this represents flow
transactions that cumulate relatively slowly over time, while the focus of this paper is on potentially large stock transactions involving CBDC.
565

## Page 14

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

Fig. 3. Possible CBDC scenarios - flow chart.

iii. Or purchase non-deposit household and firm assets. Households and firms are then left with unwanted
deposits, and again they can purchase other (non-government bond) bank assets or other (non-deposit) bank
liabilities, with banking sector balance sheet outcomes as above. This corresponds to the middle path in Fig. 3.
If banks choose not to provide CBDC for deposits, households and firms must instead use the services of a CBDC
Exchange. This corresponds to the right-hand path of Fig. 3. But this ultimately leads to the same set of balance sheet
outcomes. The CBDC Exchange has deposits, and needs CBDC. It can:

• Buy government bonds from banks in exchange for the deposits, and use those bonds to obtain CBDC from the central
bank. In this case the balance sheet outcomes are identical to the first bullet point above.

• Buy government bonds from NBFIs, and use those bonds to obtain CBDC from the central bank. This leaves NBFIs
with excess unwanted deposits, however, and the situation mirrors the second bullet point above.
One can thus see that the banking sector’s balance sheet contracts if and only if banks in aggregate choose to sell some of
their own assets to help accommodate the desired deposits-to-CBDC switch. The banking sector’s balance sheet remains
unchanged when the source of government bonds sold to the central bank is NBFIs, and when NBFIs, households or
firms who hold unwanted deposits use those deposits to buy non-deposit bank liabilities (thereby changing the liability
composition of the banking sector’s balance sheet but not its overall size).
566

## Page 15

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

Fig. 4. Possible CBDC scenarios - balance sheet implications.

If government bonds are transferred under repo, rather than outright, the flows are similar to the above, but the
balance sheet impact is a little more complicated as a new quantity is introduced: loans secured against government
bond collateral. This has the effect of expanding balance sheets, including those of banks, such that the banking sector’s
balance sheet can now contract, remain unchanged, or expand, depending on the scenario, as illustrated in Table 2 (where
banks choose to provide CBDC in exchange for deposits) and Table 3 (where banks do not provide CBDC in exchange for
deposits).
The choice made by commercial banks between sales of non-government bond assets and sales of non-deposit bank
liabilities (and between transacting outright or via repo, if that choice is open to them) will be influenced by regulatory
567

## Page 16

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

Table 1
Balance Sheet Impact of CBDC Acquisition - Government bonds sold outright.
Option 1:
Banks sell own bonds

Central bank
Banks

Option 2:
NBFIs sell bonds, buy
other bank liabilities

Option 3:
NBFIs sell bonds, buy
other bank assets

Assets

Liabilities

Assets

Liabilities

Assets

Liabilities

+ GB
−GB

+ CBDC
−DHH/F

+ GB

+ CBDC
−DHH/F
+ OBL

+ GB
−OBA

−DHH/F

NBFIs

−GB

−GB

HH/F

+ OBL
+ CBDC
−DHH/F

+ OBA
+ CBDC
−DHH/F

+ CBDC
−DHH/F

+ CBDC

Notes: GB = government bonds; DHH/F = household and firm deposits;
OBA = other (non-GB) bank assets; OBL = other (non-deposit) bank liabilities.
Table 2
Balance Sheet Impact of CBDC Acquisition - Government bonds sold under repo; banks provide CBDC for deposits.
Option 1:
Banks sell own
bonds under repo

Central bank
Banks

Option 2:
NBFIs sell bonds under repo,
buy other bank liabilities

Option 3:
NBFIs sell bonds under
repo, buy other bank assets

Assets

Liabilities

Assets

Liabilities

Assets

Liabilities

(+ GB)
+ LCB→B
(−GB)

+ CBDC

(+ GB)
+ LCB→B
+ LB→NBFI

+ CBDC

(+ GB)
+ LCB→B
+ LB→NBFI
−OBA

+ CBDC

−DHH/F

−DHH/F
+ LCB→B
+OBL
+ LB→NBFI

+ LCB→B
NBFIs
HH/F

(−GB)
+ OBL
+ CBDC
−DHH/F

+ CBDC

−DHH/F

(−GB)
+ OBA
+ CBDC
−DHH/F

−DHH/F
+ LCB→B
+ LB→NBFI

Notes: (±GB) = change in legal title to GBs that does not generate an accounting entry.
DHH/F = household and firm deposits; OBA = other (non-GB) bank assets.
OBL = other (non-deposit) bank liabilities.
LCB→B = loan from the central bank to banks, collateralised by government bonds; LB→NBFI = a loan from banks to NBFIs, collateralised by government
bonds.
Table 3
Balance Sheet Impact of CBDC Acquisition - Government bonds sold under repo; banks do not provide CBDC for deposits.
Option 2:
NBFIs sell bonds under repo,
buy other bank liabilities

Option 1:
Banks sell own
bonds under repo

Central bank
Banks

Assets

Liabilities

Assets

Liabilities

Assets

Liabilities

(+ GB)
+ LCB→Ex
(−GB)

+ CBDC

(+ GB)
+ LCB→Ex

+ CBDC

(+ GB)
+ LCB→Ex
−OBA

+ CBDC

−DHH/F
+ LEx→B

NBFIs
CDBC Exch.
HH/F

Option 3:
NBFIs sell bonds under
repo, buy other bank assets

+ LEx→B
+ CBDC
−DHH/F

+ LCB→Ex

(−GB)
+ OBL
+ LEx→NBFI
+ CBDC
−DHH/F

−DHH/F
+ OBL
+ LEx→NBFI
+ LCB→Ex

(−GB)
+ OBA
+ LEx→NBFI
+ CBDC
−DHH/F

−DHH/F
+ LEx→NBFI
+ LCB→Ex

Notes: (±GB) = a change in legal title to GBs that does not generate an accounting entry.
DHH/F = household and firm deposits; OBA = other (non-GB) bank assets.
OBL = other (non-deposit) bank liabilities.
LCB→Ex = loan from the central bank to the CBDC Exchange, collateralised by GBs.
LEx→NBFI = loan from the CBDC Exchange to NBFIs, collateralised by GBs.

requirements and by the relative cost of the different options. The choices made by NBFIs, households and firms similarly
depend on the relative returns and other characteristics of the available options.
We emphasise that the size of the aggregate banking sector’s balance sheet is not per se important for economic
outcomes. Instead, the critical magnitudes are two balance sheet sub-aggregates. On the asset side, the critical magnitude
is credit, meaning total funding received by non-bank borrowers, which determines those borrowers’ ability to invest and
trade. We denote this category by ‘Total Credit’ in Fig. 3, which (ignoring the linked repo transactions potentially involved
in obtaining the CBDC, which inflate balance sheets but otherwise do not increase the ability to trade or invest) equals
568

## Page 17

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

the sum of ‘Other Bank Assets’ and ‘Loans’ in Fig. 4 and Tables 1 to 3.17 On the liability side, the critical magnitude is
liquidity, because liquidity affects the ability of non-banks to engage in economic exchange transactions. Liquidity can
take the form of bank deposits, cash (ignored here for simplicity because it is small) and, after its introduction, CBDC.
Our simplifying assumption is that what matters for aggregate liquidity is the sum of bank deposits and CBDC held by
households, firms and NBFIs. We denote this category by ‘Total Liquidity’ in Fig. 3.
We observe that Total Credit is never directly affected by the switch from bank deposits to CBDC (although ownership
can change hands if banks sell some of their assets to NBFIs). There might be second round effects, through the interest
rate on bank loans, which lead to equilibrium changes in the quantity of credit. Some of these effects may be due to the
effect of CBDC on funding costs, while others may be due to regulation such as the Basel III Net Stable Funding Ratio
and Liquidity Coverage Ratio. The increase in wholesale funding (Option 2 in Fig. 4 and Tables 1 to 3), or the removal
of relatively liquid government bonds (Option 1 in Fig. 4 and Tables 1 to 3), could impact these ratios and thereby the
quantity or price of credit. Understanding these channels is an important area of future research.
We also observe that Total Liquidity is never directly affected by the switch from bank deposits to CBDC. However,
as for Total Credit, there may be second round effects through prices, especially if our simplifying assumption of perfect
substitutability between bank deposits and CBDC does not hold, as is likely.
Finally, the willingness of banks to provide CBDC to depositors does not predetermine the impact on their aggregate
balance sheet. This can be seen from Fig. 3 by observing that all balance sheet outcomes can be obtained whether or not
banks provide CBDC directly to depositors. While we have considered an economy-wide, direct access model of CBDC,
similar results hold if one restricts CBDC access to just banks and NBFIs, or if one considers a model where households
and firms only have indirect access to CBDC via an NBFI e-money provider backed by CBDC.
5. Digital bank runs?
5.1. Preliminaries
In Section 4 we studied the balance sheet dynamics associated with an orderly introduction of CBDC into an economy
where CBDC is not yet present, and where bank deposits are the only significant form of money in the economy. We now
turn to studying an environment where CBDC is already established alongside bank deposits, and where the economy
experiences a sudden loss of confidence in the banking sector that results in a large-scale attempt on the part of nonbanks to switch from holding bank deposits to holding CBDC. The balance sheet issues, namely the attempts to acquire
additional stocks of CBDC, are therefore very similar to those discussed above. The differences are in the potentially very
large size of the desired switch into CBDC, and in the assumption that this switch is not orderly, but is instead taking place
in an environment of financial market panic. In discussions of the pros and cons of CBDC, concerns about the vulnerability
of the banking system to such ‘digital bank runs’ are very common.
Our main point in this section will be that, as long as the core design principles for a CBDC system of Section 2 are
respected, such concerns are to a significant extent misguided, in that they either presume CBDC transmission channels
that appear to exist in partial equilibrium, but that do not survive a general equilibrium analysis, or that they consider
scenarios that are as possible in today’s financial system as they are in a world with CBDC.
The first core principle is an adjustable interest rate on CBDC. Under a CBDC quantity rule, the adjustment mechanism
for the interest rate on CBDC should be designed in a way that continuously clears the market in response to demand
fluctuations. Under a CBDC interest rate rule, the main response to changes in the demand–supply balance for CBDC will
of course come through quantity adjustments, which we will discuss below. But even here, the central bank can use
discretion in order to quickly respond to financial market dislocation and an attempted run into CBDC, by lowering the
CBDC interest rate. Unlike for the interest rate on reserves, which would continue to be adjusted in the current fashion,
at discrete and fairly long intervals measured in weeks or months, adjustments to the interest rate on CBDC should be
made quickly and frequently if circumstances demand it.
We now turn to the remaining core principles set out in Section 2, which state that CBDC is only guaranteed to be
issued against eligible securities of the central bank’s choosing, which explicitly exclude bank deposits. In many major
economies, including the UK, the set of central bank eligible securities is considerably broader than domestic government
securities. Conversion into CBDC of such a large pool of available securities can in principle quickly accommodate a run
into CBDC, by making it easier for banks to obtain the desired CBDC. It does not, however, make it easy for households and
firms to eliminate exposures to banks in a bank confidence crisis, for example in an environment where some households
and firms do not wish to hold bank deposits at any price, irrespective of their return differential with CBDC. This is because
the run into CBDC is necessarily out of eligible securities, not out of bank deposits.
17 ‘Loans’ do not appear in Tables 1 to 3 as we have assumed that banks sell ‘other bank assets’ rather than loans; relaxing this assumption does
not change any results, however.
569

## Page 18

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

5.2. Digital bank run scenarios in general equilibrium
We now attempt to construct scenarios of large-scale digital bank runs, and we explain where such scenarios can
run into contradictions in general equilibrium. Assume that a large group A of private agents panics and wishes to sell
bank deposits at scale in order to obtain CBDC. It is assumed that group A does not hold eligible assets, and that banks
do not hold CBDC on their balance sheets. It is also assumed that the central bank fixes the interest rate on CBDC, not
its quantity.18 What happens next depends on whether, where and how the additional CBDC demanded by group A is
available. There are three sets of scenarios.
5.2.1. Scenario 1: Willing non-bank sellers of CBDC or eligible securities exist
The first set of scenarios is that there is a group B of private non-bank agents, and that these agents are willing to
sell CBDC to group A. In this case CBDC, but also bank deposits, simply change hands between different non-bank agents,
while there is no change in their aggregate quantity. What looks, from the vantage point of group A, like a successful
digital bank run, is in general equilibrium no run on the aggregate banking system at all. There are several variants to
this scenario, and aggregate bank runs do not occur in any of them.
The first variant is one where commercial banks serve as intermediaries for group A, by entering the private market to
buy CBDC from group B, and then selling it to group A. Because banks buy the additional CBDC by issuing new deposits
to group B, and group A subsequently withdraws its deposits to obtain the CBDC, this does not change the quantity of
aggregate deposits, it only changes their distribution.
The second variant is one where group B is willing to sell eligible securities rather than CBDC to group A. As before,
group B ends up with the bank deposits of group A, and the latter ends up with the desired CBDC, obtained by exchanging
their newly acquired eligible securities against CBDC at the central bank.
The third variant is one where commercial banks serve as intermediaries for group A, this time by entering the private
market to buy eligible securities from group B, and then converting the eligible securities into CBDC before selling it to
group A. Because banks buy the additional eligible securities by issuing new bank deposits to group B, and group A then
withdraws its deposits to get the CBDC, the aggregate quantity of deposits has not changed, only its distribution.
It could now be argued that a run on a single bank can be sufficient to trigger systemic financial sector problems, and
that the presence of CBDC makes such a run more likely because of its electronic, click-of-a-button nature. But this is not
convincing. The reason is that bank deposits at different financial institutions are also electronic and easy to use, and a run
that moves existing deposits from a single troubled institution to other institutions is in this regard not fundamentally
different from a run via CBDC. But such a run is of course perfectly possible today, in a world without CBDC.
A more convincing argument is that a run on a single bank is more likely because the presence of CBDC reduces to
zero the search cost of finding a low risk (or indeed risk-free) provider of liquid assets that can, unlike cash, be held at
large volume at low cost. Depositors will inherently know that CBDC is ‘safe’, whereas determining which commercial
banks are safe can be difficult in a period of financial stress where banks’ liquidity position (and indeed solvency) can shift
rapidly. But there are arguments in the other direction. The presence of CBDC could potentially make it easier and faster
to resolve an individual troubled institution, by giving the authorities the option of repaying its depositors in safe CBDC
at an early stage, and then resolving the institution without the danger of contagion effects to other parts of the financial
system which would otherwise likely occur when the deposits of the troubled institution can temporarily not be used and
are perceived to be at risk of at least partial default. Because a CBDC-based resolution can be carried out almost instantly,
it reduces the potential for contagion. Because bank depositors know this ex-ante, this may in fact reduce the probability
of a bank run compared to a world without CBDC. We note that this resolution mechanism amounts to the central bank
accepting bank IOUs in exchange for CBDC in an emergency. However, this would be at the central bank’s discretion rather
than automatic, and the central bank would only accept the IOUs of a specific troubled institution rather than of all banks
(and then potentially only up to some deposit insurance limit). Another argument in the other direction is found in Engert
and Fung (2017), who conjecture that, to the extent that the presence of widely accessible CBDC increases the credibility
of the run threat, banks may respond ex-ante by reducing their risk-taking or by holding more capital.
5.2.2. Scenario 2: Willing bank sellers of excess eligible securities exist
The second set of scenarios is that there is no non-bank group B (households, firms or NBFIs) that is willing to supply
CBDC or eligible securities to group A, or to banks as intermediaries for group A, but that commercial banks have excess
supplies of eligible securities on their balance sheets. When group A demands additional CBDC, banks may choose to
liquidate their eligible securities at the central bank against CBDC, and sell this CBDC to group A. The bank balance sheet
shrinks by the amount of bank deposits withdrawn against CBDC. Similar to the balance sheet scenarios in Section 4, this
is an orderly reduction in the size of bank balance sheets that, at least on impact, changes neither the total amount of
credit to non-bank borrowers nor the total amount of liquidity in the economy. Because the eligible securities liquidated
by banks are excess to requirements, this by assumption also has no critical effects on regulatory ratios. As long as the
18 Note that a scenario where the central bank fixes the quantity of CBDC and allows the interest rate to adjust in close to real time is very
similar to one where it fixes the interest rate but uses discretion to adjust the interest rate quickly in response to an attempted run. The difference
is that in the former case the interest rate adjustment is automatic, while in the latter case it requires a policy decision.
570

## Page 19

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

available excess supplies of eligible securities do not exceed the demand for CBDC of group A, this need not cause serious
problems for the banking sector or its customers.
At this stage it is worth considering whether there are enough eligible securities to accommodate a large-scale increase
in holdings of CBDC. In the case of the UK, as at the end of 2016 the total value of UK sight deposits held by the private
sector (excluding banks and non-residents) was approximately £1300 billion, with a further £650 billion held in term
deposits, while the total market value of gilts held by the private sector was around £1430 billion. A significant portion
of gilts may not be freely tradable, however, due to portfolio restrictions on insurance companies and pension funds
(which hold around two-fifths of total gilts), price insensitivity for gilts held offshore (around one quarter of total gilts),
and regulatory requirements on financial institutions (around 10 per cent of total gilts). On the other hand, if CBDC
eligible assets are those accepted under the Sterling Monetary Framework, including own-name securities, then they
would amount to more than the stock of deposits (Bank of England, 2015).
5.2.3. Scenario 3: No willing sellers of CBDC or excess eligible securities exist
This takes us to the third set of scenarios, which is that the run to CBDC is so large that, at the current CBDC interest
rate, neither group B nor banks are willing to part with sufficient quantities of CBDC or eligible securities to satisfy the
demand of group A. In this case we again need to distinguish between CBDC quantity and interest rate rules.
Assume first a CBDC quantity rule. Under this regime any nascent increase in the demand for CBDC can be eliminated
by a drop in the interest rate on CBDC. But there are potential limits if this requires a highly negative interest rate, and
if further reductions of the interest rate below this level become politically difficult. At this point, the central bank might
be forced to switch to an interest rate rule. Assume therefore a CBDC interest rate rule where the central bank fixes the
interest rate on CBDC at the lowest politically acceptable level, and assume that even at this penalty rate group A wants
to convert deposits to CBDC at (almost) any price, perhaps because it is concerned about the solvency of banks. What
would be the consequences?
In the first instance, under the assumption that no more CBDC eligible securities can be purchased, the deposits-CBDC
parity might break. This is because the elimination of deviations from parity relies on arbitragers being able to purchase a
security for deposits and then selling the same security to the central bank at par, for CBDC. If there are no more securities
available to purchase (or alternatively if the price of CBDC eligible securities rises to such an extent that the central bank
chooses to stop purchasing them in order to protect its balance sheet), this arbitrage mechanism breaks down.
However, parity does not necessarily have to break at this stage, because another price, the interest rate on bank
deposits, can adjust. Given the large reduction in demand for bank deposits at given interest rates, the interest rate on
bank deposits is likely to increase relative to the policy rate and the CBDC rate, to incentivise households and firms to
keep holding deposits. Because the interest rate on bank deposits constitutes the marginal cost of funding for banks,
competitive banks would pass this increase on to borrowers in the form of higher lending rates.
Until this point, deposits have been destroyed only to the extent that banks have chosen to sell their own holdings of
CBDC, or of CBDC eligible securities. As discussed in Section 4, this destruction of deposits does not entail an immediate
reduction in either economy-wide credit or economy-wide liquidity. However, an increase in deposit and lending rates
would reduce the demand for loans.19 This in turn would lead to repayments of loans, and loan repayments are made
through the destruction of existing bank deposits. In this case there would then be a reduction in credit and liquidity. But
such loan repayments are flow phenomena that cannot become extremely large overnight or inside a few days, while bank
runs are clearly almost instantaneous stock phenomena. Put another way, loan repayments are, to a significant extent,
asset-side events for banks, and require explicit decisions that take time, while bank runs are liability-side events, where
banks are mostly passive responders. These are very different phenomena. Further, the adjustments via the deposit interest
rate channel outlined above do not have any necessary connection with CBDC, and are as feasible in a world without CBDC
as in a world with CBDC.
We emphasise that the third set of scenarios is very extreme indeed, entailing a loss of confidence in the entire banking
system. In such a scenario, historical precedent suggests that, irrespective of the existence of a CBDC, the central bank and
government may take measures to minimise disorder early in the panic, such as suspending commercial bank conversions
between deposits and central bank money, imposing capital controls, and/or nationalising banks. The central bank would
also be free, at its discretion rather than as an automatic response, to expand the list of eligible securities in order to limit
the increase in funding costs for the banking system.
We summarise the foregoing as follows: First, if our core design principles are followed, then runs on individual
financial institutions into other financial institutions, system-wide runs from bank deposits into cash, and system-wide
increases in interest rate risk premia on deposits, are as feasible in a world without CBDC as in a world with CBDC. Indeed,
given the advantages of CBDC in limiting bank risk-taking and in facilitating bank resolution, these events may even be
less likely with CBDC. Second, system-wide runs that attempt to reduce exposure to the entire banking system can only
succeed through asset-side adjustments of banks, and again their feasibility does not depend on the presence of CBDC
19 They might also limit banks’ demand for securities. However, this is not likely to be a significant factor in balance sheet adjustments, for two
reasons. First, it is not clear that during periods of financial stress the demand of non-banks for such securities would increase; if securities sales
only happen between different financial institutions this does not change the balance sheet of the aggregate financial sector. Second, in the data
net sales of securities are a very minor factor in adjustments of aggregate financial sector balance sheets — see Jakab and Kumhof (2019).
571

## Page 20

M. Kumhof and C. Noone

Economic Analysis and Policy 71 (2021) 553–572

while their likelihood may be lower with CBDC. Third, attempts by non-banks to drastically increase the quantity of CBDC
relative to bank deposits can be accommodated through these design principles, and this accommodation only encounters
limits under very extreme circumstances, including a limit to how negative the interest rate on CBDC can become, and a
limit on the availability of eligible securities that the central bank is willing accept.
6. Conclusions
Central bank digital currencies raise many fundamental questions about the architecture and operation of the monetary
and financial system, and of the economy more broadly. To make discussions about the potential impact of CBDC
practically useful, it is essential to start with a clear description of how a CBDC system might operate in the real world. A
key aspect of this is the balance sheet dimension of CBDC. In this paper we therefore start by describing the balance sheet
implications of an initial introduction of CBDC, and then discuss the subject of digital bank runs in a world with CBDC.
In both cases, it is critical to understand the impact of CBDC not only on the total size of bank balance sheets, but on
economically important dimensions of those balance sheets, most importantly on total private credit and total provision
of a liquid medium of exchange.
We set out core principles for a CBDC system that both support an orderly introduction of CBDC and ameliorate the
risk of digital bank runs. We show that, if these principles are followed and CBDC is introduced in an orderly manner, the
size of bank balance sheets may be, but need not be, reduced. More importantly, there are, up to a first approximation
that abstracts from second round and price-mediated effects that generally take time to materialise, no adverse effects
on total private credit or on total liquidity provision to the economy. Bank runs can never be completely ruled out under
fractional reserve banking — the best that can be accomplished is to minimise the probability of their occurrence. We
argue that a CBDC system would contribute to doing so, based on the above core principles together with the ability
to resolve institutions more efficiently through the use of CBDC. But residual risks remain. Under a CBDC quantity rule,
the risk is that in a crisis the required interest rate on CBDC might drop so far below zero that this would no longer be
politically acceptable, even as a temporary phenomenon. And under a CBDC interest rate rule, the risk is that the market
could run out of eligible assets to convert into CBDC. It is of course prudent to worry about such risks, but they make for
a significantly weaker argument against CBDC than what popular partial equilibrium arguments about digital bank runs
could lead one to believe.
References
Allen, H., Dent, A., 2010. Managing the circulation of banknotes. Bank Engl. Q. Bull. 50 (4), 302–310.
Bank of England, 2015. The Bank of England’s Sterling Monetary Framework, Available at: http://www.bankofengland.co.uk/markets/Documents/
money/publications/redbook.pdf.
Bank of England, 2019. NCS Payments Annex to the RTGS Account Mandate Terms and Conditions (effective from February 2019).
Bank of England, 2021. https://www.bankofengland.co.uk/research/digital-currencies.
Barrdear, J., Kumhof, M., 2016. The macroeconomics of central bank issued digital currencies, Bank of England Working Papers, No. 605.
Bech, M., Garratt, R., 2017. Central bank cryptocurrencies, BIS Quarterly Review, September 2017. pp. 55–70.
Bindseil, 2020. Tiered CBDC and the financial system, ECB Working Paper No. 2351.
Boar, C., Wehrli, A., 2021. Ready, steady, go? – results of the third BIS survey on central bank digital currency, BIS Papers, No. 114.
Bordo, M.D., Levin, A.T., 2017. Central bank digital currency and the future of monetary policy, NBER Working Papers, No. 23711.
Broadbent, B., 2016. Central banks and digital currencies, speech at the london school of economics, 2 2016.
Callesen, P., 2017. Can banking be sustainable in the future? A perspective from danmarks nationalbank, speech at the copenhagen business school
100 years celebration event, copenhagen, 30 2017. Available at: https://www.bis.org/review/r171031c.htm.
Constâncio, V., 2017. The future of finance and the outlook for regulation, remarks at the financial regulatory outlook conference organised by the
centre for international governance innovation and oliver wyman, Rome, 9 November 2017. Available at: https://www.ecb.europa.eu/press/key/
date/2017/html/ecb.sp171109.en.html.
Engert, W., Fung, B.S., 2017. (2017), central bank digital currency: motivations and implications, Bank of Canada Staff Discussion Papers, No. 2017-16.
Federal Reserve Banks, 2016. Operating Circular No 2: Cash Services (effective from 4 January 2016).
Gleeson, S., 2018. The Legal Concept of Money. Oxford University Press.
Gürtler, K., Nielsen, S.T., Rasmussen, K., Spange, M., 2017. Central bank digital currency in Denmark?, Analysis, (28) 2017. Available at: http:
//www.nationalbanken.dk/en/publications/Pages/2017/12/Central-bank-digital-currency-in-Denmark.aspx.
Ingves, S., 2018. The e-krona and the payments of the future. Speech. Available at: https://www.riksbank.se/globalassets/media/tal/engelska/ingves/
2018/the-e-krona-and-the-payments-of-the-future.pdf.
Jakab, Z., Kumhof, M., 2019. Banks are not intermediaries of loanable funds – facts, theory and evidence, Bank of England Staff Working Papers, No
761 (January 2019 update).
Juks, R., 2018. When a central bank digital currency meets private money: effects of an ekrona on banks. In Sveriges Riksbank Economic Review. Special
issue on the e-krona. 2018-03. Available at: https://www.riksbank.se/globalassets/media/rapporter/pov/artiklar/engelska/2018/181105/20183when-a-central-bank-digital-currency-meets-private-money---effects-of-an-e-krona-on-banks.pdf.
Lowe, P., 2017. EAUD? Address to the 2017 Australian payment summit, Sydney, 13 December 2017. Available at: https://www.rba.gov.au/speeches/
2017/sp-gov-2017-12-13.html.
Mainka, Jolley V., 1933. 49 CLR. 242. Available at: http://eresources.hcourt.gov.au/downloadPdf/1933/HCA/4.
McBride, N., 2007. Payments and the concept of legal tender. Reserve Bank Bulletin 70 (3). https://www.rbnz.govt.nz/research-and-publications/
reserve-bank-bulletin/2007/rbb2007-70-03-03.
Meaning, J., Dyson, B., Barker, J., Clayton, E., 2018. Broadening narrow money: monetary policy with a central bank digital currency, Bank of England
Working Papers, No. 724.
Scorer, S., 2017. Central bank digital currency: DLT or not DLT? That is the question, bank underground. Published 5 June 2017. Available at:
https://bankunderground.co.uk/2017/06/05/central-bank-digital-currency-dlt-or-not-dlt-that-is-the-question/.
Sveriges Riksbank, 2017. The Riksbank’s e-krona project: Report 1, Available at: http://www.riksbank.se/Documents/Rapporter/E-krona/2017/rapport_
ekrona_170920_eng.pdf.
Sveriges Riksbank, 2018. Sveriges Riksbank Economic Review. Special issue on the e-krona 2018-03. Available at: https://www.riksbank.se/globalassets/
media/rapporter/pov/engelska/2018/economic-review-3-2018.pdf.
572
