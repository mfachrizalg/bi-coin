---
source_type: pdf
title: "retail cbdc consensus"
original_file: "thesis/reference/retail_cbdc_consensus.pdf"
sha256: "114ca4353246445ca1f991b3cecfd979979c9f67df2c2cad3082147e6d656125"
page_count: 7
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: retail cbdc consensus

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Retail CBDC Research Review
1. Introduction
Retail central bank digital currency is a digital form of central bank money for public use in everyday payments, and the literature
treats it as a potentially important change to payments, banking, and central bank operations. Across this corpus, the strongest
consensus is that retail CBDC’s benefits and risks depend heavily on design, especially remuneration, holding limits, privacy
architecture, and whether intermediaries handle customer-facing services \cite{Infante2024Retail} \cite{Auer2020The}
\cite{Tsareva2024Retail} \cite{Bindseil2025Modeling}. The main motivations are maintaining access to public money as cash use
falls, improving payment efficiency and resilience, supporting financial inclusion in some economies, and responding to competition
from private digital payment systems \cite{Kiff2020A} \cite{Morales-Reséndiz2021Implementing} \cite{2023Central}
\cite{Kochergin2024GLOBAL}.
The main concern is bank disintermediation: households and firms could shift deposits into safer central bank liabilities, potentially
shrinking bank balance sheets and affecting credit supply. But the literature is not one-sided. Some models predict lower lending and
higher run risk under certain designs, while others find that careful design, central bank recycling of funds, improved competition,
and better information can offset or even reverse fragility effects \cite{Infante2024Retail} \cite{Infante2023Retail}
\cite{Keister2022Central} \cite{Kim2022Central}. Privacy is the other major fault line: retail CBDC could improve compliance and
traceability, but it also creates unusually sensitive data governance questions that cash largely avoids \cite{Auer2020The}
\cite{Allen2020Design} \cite{Soana2024Central} \cite{2021Privacy}.
Is retail CBDC beneficial overall?
Requires at least 5 papers that directly answer your question. Try adjusting your query to find more papers.

FIGURE 1 Consensus on overall benefits and risks

The meter should be read as mixed-positive rather than unqualified endorsement. Most papers support potential welfare or
payments benefits, but they repeatedly stress that adoption, banking effects, and privacy outcomes are design-contingent rather
than automatic \cite{Infante2024Retail} \cite{Tsareva2024Retail} \cite{Zamora-Pérez2022Ensuring}.

2. Methods
This Deep Search review synthesizes research on retail CBDC from Consensus, which searches over 170 million research papers
across Semantic Scholar, PubMed, and other sources. The workflow identified 7,932 papers in the initial search, expanded the pool
through targeted sub-searches and citation crawling, screened 239 papers after relevance filtering, judged 129 as eligible, and
included the top 50 most relevant papers for synthesis.

Search Strategy

87.2M

1K

50

Retrieved

Eligible

Included

22 searches

Papers meeting relevance and quality criteria,

Top papers selected to be included in the final

after deduplication

analysis

1 citation graph use
All papers retrieved from 22 searches and 1
citation graph use.

FIGURE 2 Paper identification and screening strategy

The search combined foundational theory, design, risks, case studies, alternative terminology, and critique-focused queries.

1 / 7

## Page 2

3. Results
3.1 Key Papers
A few papers anchor this literature because they define the core design trade-offs, summarize macro-financial consequences, or
provide broad surveys of policy and implementation choices. The most central are Auer and Böhme on technology trade-offs, Infante
et al. on banking and financial stability, and Kiff et al. on operational and governance considerations \cite{Auer2020The}
\cite{Infante2024Retail} \cite{Kiff2020A}.
Paper

Summary

\cite{Tsareva2024Retail}

Defines core technology trade-offs in resilience, privacy, and architecture \cite{Auer2020The}

\cite{Infante2024Retail}

Reviews banking and stability effects of retail CBDC \cite{Infante2024Retail}

\cite{Soana2024Central}

Organizes operational, legal, and risk considerations \cite{Kiff2020A}

FIGURE 3 Foundational papers in retail CBDC literature

3.2 Banking And Stability
Dimension

Stabilizing View

Destabilizing View

Citations

Deposit
competition

Raises deposit rates, curbs
market power

Pulls funds from banks

\cite{Paul2025A}

Credit supply

Can recover if central bank

Can contract under deposit

\cite{Infante2024Retail}

recycles funds

substitution

\cite{Kim2022Central}

Monitoring CBDC flows can

Safe CBDC can intensify

\cite{Keister2022Central}

reduce panic

flight to quality

Low remuneration and caps

Those same limits reduce

\cite{Infante2023Retail}

restrain surges

usefulness

\cite{Baeriswyl2024Retail}

Long-run

Banking impact may be modest

Transition and stress effects

\cite{Malloy2022Retail}

structure

after adjustment

can still bite

Run dynamics

Design mitigants

FIGURE 4 Competing banking and stability findings

The key difference is conditionality. Models agree that retail CBDC changes bank funding incentives, but they disagree on whether
the net effect is harmful because assumptions about refinancing, reserve supply, user demand, and design restrictions differ sharply
\cite{Infante2023Retail} \cite{Malloy2022Retail}.
3.3 Design And Adoption
Adoption is not expected to happen automatically. Survey and modeling work indicates that weak incentives or unattractive wallet
features lead to low and slow uptake, while rewards, subsidy distribution, and user-friendly functionality can materially improve
adoption \cite{Zamora-Pérez2022Ensuring} \cite{León2024Simulating}.
Pilot evidence from Thailand points in the same direction but adds operational nuance. Retail users used rCBDC primarily as a
payment method, with higher use among older users and under reward incentives, while the hybrid distribution model relied heavily
on a few financial service providers and spread funds slowly through the network \cite{Bhensook2025Public}.

2 / 7

## Page 3

Design preferences also differ by country context. In emerging economies, offline capability, hybrid architecture, traceable
anonymity, and mixed account/token approaches are often presented as practical compromises because infrastructure limits and
inclusion goals matter more than in advanced economies \cite{Syarifuddin2024OPTIMAL} \cite{Kochergin2024GLOBAL}.
3.4 Privacy And Infrastructure
Retail CBDC design consistently faces a privacy-compliance trade-off. The technology literature argues that a system should
preserve cash-like privacy where possible while still enabling law enforcement and AML/CFT enforcement, but different
architectures achieve that balance differently \cite{Auer2020The} \cite{Pocher2022Privacy}.
Offline payments sharpen that trade-off because they can improve privacy and resilience while weakening direct third-party
oversight of transactions. Recent work therefore emphasizes compliance-by-design, technical taxonomies for offline privacy options,
and KYC-linked transaction or holding limits as practical controls \cite{Michalopoulos2025Privacy} \cite{Kakebayashi2023Policy}.
The infrastructure burden is substantial. A deployable retail CBDC must be resilient, secure, performant at mass scale, and simple
enough for rigorous security analysis, which is why technical experimentation such as Project Hamilton has become part of policy
research rather than a separate engineering exercise \cite{Allen2020Design} \cite{Lovejoy2022A}.
Results Timeline

12

2

6

14

15

5

Jul 2020

Jan 2021

Jul 2021

10

11

Jan 2022

7

18

Jul 2022

Jan 2023

Jul 2023

9

17

8

Jan 2024

13

3

19

Jul 2024

1

4
20

16

Jan 2025

FIGURE 5 Retail CBDC research timeline, larger markers indicate more citations

Top Contributors
Type

Name

Papers

Author

Raphael A. Auer

[39e2cb48614955eca653cd598e55548a][92de6e2a8ab45d40b6f0a592097c14b0]
[9b35d1423d175bd58759cb6c1f6b5a3b]

Author

Jon Frost

[92de6e2a8ab45d40b6f0a592097c14b0][9b35d1423d175bd58759cb6c1f6b5a3b]

Author

J. Kiff

[1a79b88d849f5672b9e79a8900029ebe][144c0eb3c9d05a1b8de5d8813674929a]

Journal

SSRN Electronic
Journal

[013b1cfb279f502786cac2ecc1f0ae9a][8c094b8bbe2a5261aa953093a0c6fc6d]
[92de6e2a8ab45d40b6f0a592097c14b0][9ba220b479c558a19da0259b1ea8d9dc]
[a1bd85745cef593eb4ff4b3b60f36de4][b8b85fcac9935cb1bb292f6c383429d5]
[f4582068918b54059d68805e09f7ae25][3fe45b0d4c92530db11f7d28202b885e]

3 / 7

## Page 4

Type

Name

Papers

Journal

Journal of
Economic
Dynamics and
Control

[d87ed4c84b685a1b8b421376e29ed9d2][5e7b84a557fc595685579422fda3e4e1]
[ec8322f9ed2b529f80682836a5e3557e]

Journal

IMF Working
Papers

[b2dc790f269c5dc4aeacd222068493f6][1a79b88d849f5672b9e79a8900029ebe]

FIGURE 6 Authors and journals appearing most often

4. Discussion
The core strength of this literature is that it no longer rests only on abstract advocacy. It now includes formal macroeconomic
models, policy reviews, technical design analyses, and a small but growing number of empirical pilot studies \cite{Infante2024Retail}
\cite{Bindseil2025Modeling} \cite{Bhensook2025Public} \cite{Lovejoy2022A}. Across these approaches, one conclusion is robust:
retail CBDC is not a single intervention but a bundle of design choices whose effects can differ materially by remuneration, caps,
architecture, convertibility, and distribution model \cite{Infante2024Retail} \cite{Baeriswyl2024Retail} \cite{Auer2020Rise}
\cite{Bhensook2025Public}.
The main weakness is external validity. Many influential findings come from calibrated or stylized models, and several reviews
explicitly note that real-world pilots remain few and country-specific \cite{Sun2022Behind} \cite{Infante2023Retail}
\cite{Bhensook2025Public}. Even the most policy-relevant empirical results, such as early Sand Dollar impacts or Thailand’s pilot
usage patterns, are still limited by short time horizons, local institutional context, and evolving implementation details \cite{GiraldoGordillo2026CBDCs} \cite{Bhensook2025Public}.
Still, some claims are now better supported than others. Payment-system modernization, public access to central bank money, and
the centrality of privacy-stability trade-offs are strongly replicated across reviews and technical papers. By contrast, the magnitude
of bank disintermediation, long-run lending effects, and eventual mass adoption remain uncertain because they depend on behavior
under designs that most countries have not yet implemented at scale \cite{Infante2024Retail} \cite{Allen2020Design}
\cite{Infante2023Retail} \cite{Kochergin2024GLOBAL}.
Evidence
Claim

Reasoning

Papers

Retail CBDC’s effects

Repeated across reviews,

\cite{Infante2024Retail} \cite{Auer2020The}

depend primarily on
design choices.

theory, and policy guidance.

\cite{Tsareva2024Retail}

Supported by multiple
models and policy reviews,

\cite{Infante2024Retail} \cite{Tan2023Central}
\cite{Barrdear2021The}

Retail CBDC can improve
payments efficiency,
access, and welfare.

Strength

Strong

Strong

though effect sizes vary.

Retail CBDC can cause

Common in models and

\cite{Infante2024Retail} \cite{Giraldo-

deposit substitution and

some early empirical

Gordillo2026CBDCs} \cite{Kim2022Central}

credit contraction.

Moderate

evidence, but not universal.

Privacy-compliance

Strongly repeated in

\cite{Michalopoulos2025Privacy}

trade-offs are unavoidable
in retail CBDC.

technical, legal, and policy
papers.

\cite{Allen2020Design}
\cite{Soana2024Central}

Strong

4 / 7

## Page 5

Evidence
Claim

Strength

Reasoning

Papers

Large-scale public

Evidence remains thin, with

\cite{Zamora-Pérez2022Ensuring}

adoption pathways are
well understood.

few real-world pilots and
mixed uptake evidence.

\cite{Bhensook2025Public}
\cite{León2024Simulating}

Weak

FIGURE 7 Key claims and evidence strength

5. Conclusion
Retail CBDC research converges on a clear bottom line: it is a promising but highly design-sensitive public payment innovation. The
literature supports meaningful potential gains in payment resilience, inclusion, and monetary architecture, but it also identifies
nontrivial risks around bank funding, privacy, operational burden, and adoption \cite{Infante2024Retail} \cite{Kiff2020A}
\cite{
2025Central}.

Оглоблина

Research Gaps
The biggest gaps are empirical rather than conceptual. The field has many design frameworks and macro models, but comparatively
little evidence on long-run public usage, merchant acceptance, cross-country generalizability, and post-launch banking effects
\cite{Bhensook2025Public} \cite{Sun2022Behind}.
Topic/Outcome

Payments Use

Banking Effects

Privacy Design

Long-Run Evidence

Real-world user adoption

4

1

2

1

Financial stability in stress

2

5

1

1

Offline CBDC implementation

3

GAP

5

1

Emerging-market inclusion effects

4

3

1

1

FIGURE 8 Research coverage across core retail CBDC topics

Open Research Questions
Future work is likely to matter most where policy choices meet real user behavior and banking-system responses.
Question

Why

Which retail CBDC design features reliably increase

Adoption and disintermediation are often studied separately, but

adoption without accelerating deposit flight?

policy must optimize both simultaneously.

How do offline privacy features affect AML/CFT

Offline CBDC is a priority design goal, yet evidence on compliance

effectiveness in real-world deployments?

performance remains largely conceptual.

Do intermediated hybrid models reduce long-run banking

Early evidence suggests architecture matters, but comparative

disruption relative to direct models?

post-launch data are still sparse.

Retail CBDC research supports cautious, design-led experimentation rather than one-size-fits-all implementation.

These search results were found and analyzed using Consensus, an AI-powered search engine for research. Try it at
https://consensus.app. © 2026 Consensus NLP, Inc. Personal, non-commercial use only; redistribution requires copyright holders’
consent.

5 / 7

## Page 6

References
@article{2023Central, title={Central Bank Digital Currencies (CBDCs) and democratic values}, journal={OECD Business and Finance
Policy Papers}, year={2023}, doi={10.1787/f3e70f1f-en} }
@article{2021Privacy, title={Privacy Beyond Possession: Solving the Access Conundrum in Digital Dollars}, journal={Regulation of
Financial Institutions eJournal}, year={2021}, doi={10.2139/ssrn.3798838} }
@article{Allen2020Design, title={Design Choices for Central Bank Digital Currency: Policy and Technical Considerations}, author=
{Sarah Allen and Srdjan Čapkun and Ittay Eyal and G. Fanti and B. Ford and James Grimmelmann and A. Juels and Kari Kostiainen
and S. Meiklejohn and Andrew K. Miller and E. Prasad and Karl Wüst and Fan Zhang}, journal={SSRN Electronic Journal}, year=
{2020}, doi={10.3386/w27634} }
@article{Auer2020The, title={The technology of retail central bank digital currency}, author={Raphael A. Auer and Rainer Böhme},
year={2020} }
@article{Auer2020Rise, title={Rise of the Central Bank Digital Currencies: Drivers, Approaches and Technologies}, author={Raphael
A. Auer and G. Cornelli and Jon Frost}, journal={SSRN Electronic Journal}, year={2020}, doi={10.2139/ssrn.3724070} }
@article{Baeriswyl2024Retail, title={Retail CBDC purposes and risk transfers to the central bank}, author={Romain Baeriswyl and
Samuel Reynard and A. Swoboda}, journal={Swiss Journal of Economics and Statistics}, year={2024}, volume={160}, pages={1-15},
doi={10.1186/s41937-024-00124-3} }
@article{Barrdear2021The, title={The macroeconomics of central bank digital currencies}, author={John Barrdear and Michael
Kumhof}, journal={Journal of Economic Dynamics and Control}, year={2021}, pages={104148}, doi={10.1016/j.jedc.2021.104148} }
@article{Bhensook2025Public, title={Public Use and Distribution of Retail CBDC: An Evidence from Thailand’s Retail CBDC Pilot
Program}, author={Nuntapun Bhensook and Thanaporn Rattanakul and Witit Synsatayakul and Pakaporn Tohwisessuk}, journal=
{Jahrbücher für Nationalökonomie und Statistik}, year={2025}, volume={245}, pages={367 - 399}, doi={10.1515/jbnst-2024-0047} }
@article{Bindseil2025Modeling, title={Modeling Central Bank Digital Currencies}, author={U. Bindseil and Richard Senner}, journal=
{Journal of Economic Surveys}, year={2025}, doi={10.1111/joes.12686} }
@article{Giraldo-Gordillo2026CBDCs, title={CBDCs and Liquidity Risks: Evidence from the SandDollar’s Impact on Deposits and
Loans in the Bahamas}, author={Francisco Elieser Giraldo-Gordillo and Ricardo Bustillo-Mesanza}, journal={FinTech}, year={2026},
doi={10.3390/fintech5010005} }
@article{Infante2024Retail, title={Retail CBDC: Implications for Banking and Financial Stability}, author={Sebastian Infante and
Kyungmin Kim and Anna Orlik and A. F. Silva and R. Tetlow}, journal={Annual Review of Financial Economics}, year={2024}, doi=
{10.1146/annurev-financial-082123-105958} }
@article{Infante2023Retail, title={Retail Central Bank Digital Currencies: Implications for Banking and Financial Stability}, author=
{Sebastian Infante and Kyungmin Kim and A. Orlik and A. F. Silva and R. Tetlow}, journal={Finance and Economics Discussion Series},
year={2023}, doi={10.17016/feds.2023.072} }
@article{Kakebayashi2023Policy, title={Policy Design of Retail Central Bank Digital Currencies: Embedding AML/CFT Compliance},
author={Michi Kakebayashi and Gerard P. Presto and Tomonori Yuyama and Shin’ichiro Matsuo}, journal={SSRN Electronic Journal},
year={2023}, doi={10.2139/ssrn.4366778} }
@article{Keister2022Central, title={Central Bank Digital Currency: Stability and Information}, author={Todd Keister and Cyril
Monnet}, journal={Journal of Economic Dynamics and Control}, year={2022}, doi={10.1016/j.jedc.2022.104501} }
@article{Kiff2020A, title={A Survey of Research on Retail Central Bank Digital Currency}, author={J. Kiff and Jihad Alwazir and Sonja
Davidovic and A. Farias and Ashraf Khan and T. Khiaonarong and Majid Malaika and Hunter Monroe and Nobuyasu Sugimoto and
Hervé Tourpe and Peter X. Zhou}, journal={IMF Working Papers}, year={2020}, doi={10.5089/9781513547787.001} }
@article{Kim2022Central, title={Central Bank Digital Currency, Credit Supply, and Financial Stability}, author={Y. S. Kim and Ohik
Kwon}, journal={Journal of Money, Credit and Banking}, year={2022}, doi={10.1111/jmcb.12913} }
@article{Kochergin2024GLOBAL, title={GLOBAL EXPERIENCE IN IMPLEMENTING CENTRAL BANKS DIGITAL CURRENCIES FOR
RETAIL PAYMENTS IN EMERGING MARKETS AND DEVELOPING COUNTRIES}, author={D. Kochergin}, journal={
}, year={2024}, doi={10.52180/2073-6487_2024_5_130_171} }

Вестник

Института экономики Российской академии наук

6 / 7

## Page 7

@article{León2024Simulating, title={Simulating the Adoption of a Retail CBDC}, author={Carlos León and Jose Moreno and Kimmo
Soramäki}, journal={Jahrbücher für Nationalökonomie und Statistik}, year={2024}, volume={245}, pages={401 - 433}, doi=
{10.2139/ssrn.4528315} }
@article{Lovejoy2022A, title={A High Performance Payment Processing System Designed for Central Bank Digital Currencies},
author={James Lovejoy and Cory Fields and M. Virza and Tyler Frederick and David Urness and Kevin Karwaski and Anders
Brownworth and Neha Narula}, journal={IACR Cryptol. ePrint Arch.}, year={2022}, volume={2022}, pages={163} }
@article{Malloy2022Retail, title={Retail CBDC and U.S. Monetary Policy Implementation: A Stylized Balance Sheet Analysis}, author=
{Matthew Malloy and Francis Martinez and Mary-Frances Styczynski and A. Thorp}, journal={Finance and Economics Discussion
Series}, year={2022}, doi={10.17016/feds.2022.032} }
@article{Michalopoulos2025Privacy, title={Privacy and Compliance Design Options in Offline Central Bank Digital Currencies},
author={P. Michalopoulos and Odunayo Olowookere and Nadia Pocher and Johannes Sedlmeir and Andreas G. Veneris and Poonam
Puri}, journal={IEEE Transactions on Network and Service Management}, year={2025}, volume={22}, pages={3748-3763}, doi=
{10.1109/tnsm.2025.3575367} }
@article{Morales-Reséndiz2021Implementing, title={Implementing a retail CBDC: Lessons learned and key insights}, author={Raúl
Morales-Reséndiz and Jorge Ponce and Pablo Picardo and A. Velasco and Bobby Chen and L. Sanz and Gabriela Guiborg and Björn
Segendorff and J. L. Vásquez and John Arroyo and Illich Aguirre and N. Haynes and N. Panton and M. Griffiths and Cedric Pieterz
and A. Hodge}, year={2021}, volume={2}, pages={100022}, doi={10.1016/j.latcb.2021.100022} }
@article{Paul2025A, title={A Macroeconomic Model of Central Bank Digital Currency}, author={Pascal Paul and Mauricio Ulate and
J. Wu}, journal={SSRN Electronic Journal}, year={2025}, doi={10.2139/ssrn.4761011} }
@article{Pocher2022Privacy, title={Privacy and Transparency in CBDCs: A Regulation-by-Design AML/CFT Scheme}, author={Nadia
Pocher and A. Veneris}, journal={IEEE Transactions on Network and Service Management}, year={2022}, volume={19}, pages={17761788}, doi={10.1109/tnsm.2021.3136984} }
@article{Soana2024Central, title={Central Bank Digital Currencies and financial integrity: finding a new trade-off between privacy
and traceability within a changing financial architecture}, author={G. Soana and Thomaz de Arruda}, journal={Journal of Banking
Regulation}, year={2024}, volume={25}, pages={467 - 486}, doi={10.1057/s41261-024-00241-2} }
@article{Sun2022Behind, title={Behind the Scenes of Central Bank Digital Currency}, author={T. Sun and J. Kiff and Wouter Bossu
and Natasha X Che and Tommaso Mancini Griffoli and Sonja Davidovic and Akihiro Yoshinaga and Marianne Bechara and Gabriel
Soderberg and Inutu Lukonga}, journal={FinTech Notes}, year={2022}, doi={10.5089/9798400201219.063} }
@article{Syarifuddin2024OPTIMAL, title={OPTIMAL CENTRAL BANK DIGITAL CURRENCY DESIGN FOR EMERGING
ECONOMIES}, author={Ferry Syarifuddin}, journal={Journal of Central Banking Law and Institutions}, year={2024}, doi=
{10.21098/jcli.v3i2.194} }
@article{Tan2023Central, title={Central Bank Digital Currency and Financial Inclusion}, author={B. Tan}, journal={IMF Working
Papers}, year={2023}, doi={10.5089/9798400238277.001} }
@article{Tsareva2024Retail, title={Retail Central Bank Digital Currency Design Choices: Guide for Policymakers}, author={Anastasia
Tsareva and M. Komarov}, journal={IEEE Access}, year={2024}, volume={12}, pages={66129-66146}, doi=
{10.1109/access.2024.3399113} }
@article{Zamora-Pérez2022Ensuring, title={Ensuring Adoption of Central Bank Digital Currencies – an Easy Task or a Gordian Knot?},
author={Alejandro Zamora-Pérez and Eliana Coschignano and Lorena Barreiro}, journal={SSRN Electronic Journal}, year={2022}, doi=
{10.2139/ssrn.4245420} }

Оглоблина2025Central, title={Central Bank Digital Currencies: International Experience and Development Risks}, author=
Елизавета Валентиновна Оглоблина and В.В. Макарова}, journal={Теория и практика общественного развития}, year={2025},

@article{

{
doi={10.24158/tipor.2025.10.19} }

7 / 7
