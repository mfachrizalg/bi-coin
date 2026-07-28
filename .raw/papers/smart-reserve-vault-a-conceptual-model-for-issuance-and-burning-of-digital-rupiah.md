---
source_type: pdf
title: "Smart Reserve Vault A Conceptual Model for Issuance and Burning of Digital Rupiah"
original_file: "thesis/reference/Smart_Reserve_Vault_A_Conceptual_Model_for_Issuance_and_Burning_of_Digital_Rupiah.pdf"
sha256: "0b77614dc4a2aa06e3ae3e23d5960d165663723029c3d212e91a2778e7fe995d"
page_count: 4
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Smart Reserve Vault A Conceptual Model for Issuance and Burning of Digital Rupiah

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2025 13th International Conference on Orange Technology (ICOT) | 979-8-3315-8183-1/25/$31.00 ©2025 IEEE | DOI: 10.1109/ICOT68409.2025.11425593

Smart Reserve Vault: A Conceptual Model for
Issuance and Burning of Digital Rupiah
Bryan Ananda
Information System Management Department, BINUS
Graduate Program - Master of Information Systems
Management,
Bina Nusantara University,
Jakarta, Indonesia 11480
bryan.ananda@binus.ac.id

Abstract—Central bank digital currency (CBDC) designs
often lack transparent operational links between reserves and
programmable supply adjustments. This paper introduces the
Smart Reserve Vault (SRV), a conceptual framework anchoring
retail CBDC issuance to tokenized strategic reserves via
auditable smart-contract rules. Using a mixed qualitativedesign science approach, we synthesized comparative CBDC
evidence and thematic analysis of n=9 expert interviews. The
findings formalize the SRV artifact, detailing (i) quota-based
minting derived from marked-to-market reserve value and (ii)
trigger-based burning governed by macro-financial thresholds
with circuit-breaker safeguards. This two-tier compatible model
offers a pathway to strengthen supply discipline and exchangerate credibility without disintermediating banks. The primary
limitation is the conceptual nature of the evaluation, which lacks
live monetary deployment data. This work provides an
auditable technical model for central banks seeking to enhance
public trust.

Elfindah Princes
Information System Management Department,
BINUS Graduate Program - Master of Information Systems
Management,
Bina Nusantara
University, Jakarta,
Indonesia 11480
elfindah.princes@binus.edu

2.

An Auditable Policy Mechanism: We define a rulebased algorithm for quota-based minting and triggerbased burning, enhancing supply discipline and
transparency.

3.

An Expert-Validated Design: We validate the
framework's core components and two-tier
compatibility using thematic analysis from n=9
targeted expert interviews.

As shown in Fig. 1, the SRV positions itself in the highgovernance, high-integration quadrant, distinct from nontokenized or manually-operated models.

Keywords—Central Bank Digital Currency, rule-based
issuance/burning, tokenized reserves, two-tier architecture,
permissioned DLT, smart contracts, circuit-breaker.

I. INTRODUCTION
Central Bank Digital Currencies (CBDCs) have
transitioned from exploration to active design, motivated by
a need to preserve the public anchor of money in an
increasingly digital world [1], [2]. However, many current
pilots lack operational transparency, failing to specify the
rules linking digital currency supply to a central bank's
reserve assets. This opacity can undermine public trust and
policy credibility, especially in open economies where
exchange rates and capital flows are key concerns [5]. While
designs favor two-tier structures to mitigate disintermediation
[3], [4], [6], [7], a critical gap remains.
landscape; Existing work clarifies CBDC objectives but
lacks operational rules linking tokenized reserves to
programmable supply adjustments [1], [2], [3], [4], [5]. This
paper addresses this gap by proposing the Smart Reserve
Vault (SRV): a two-tier-compatible mechanism anchoring
Digital Rupiah issuance and burning to tokenized strategic
reserves (e.g., FX, gold) via auditable smart-contract rules.
This research makes three primary contributions:
1.

A Novel Conceptual Framework: We formalize the
SRV as a technical artifact that operationally links
reserve asset value directly to CBDC supply.

Fig. 1. CBDC design landscape and SRV positioning.

II. LITERATURE REVIEW
Literature on CBDC design confirms a preference for twotier intermediation to mitigate banking sector risks [1], [3].
This is supported by analyses calling for safeguards like tiered
remuneration and holding limits [4], [9]. Parallel work on
monetary policy transmission in open economies highlights
the need for designs that support exchange-rate credibility [5],
[8], a feature also central to reserve-backed stablecoins [11],
[12]. While technology studies confirm the feasibility of using
permissioned DLT and smart contracts for auditable
operations [3], [13], a gap persists. Across these streams, no
operational framework exists that tokenizes public-sector
reserves, feeds their value via oracles into a rule-based policy
engine, and executes automated mint/burn operations while

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:19 UTC from IEEE Xplore. Restrictions apply.

## Page 2

preserving two-tier distribution. This paper specifies the SRV
artifact to fill this gap [3], [4], [5], [8], [9].

III. METHOD
We employ a mixed qualitative-design science research
(DSR) approach to formalize the Smart Reserve Vault (SRV)
as a policy-technology artifact [15], [20], [21], [22]. The
objective is to specify an auditable, reserve-backed, two-tier
compatible mechanism for the Digital Rupiah, addressing its
operational rules, technical architecture, and policy
integration. The artifact's design was informed by two primary
sources: (1) a comparative review of international CBDC
projects to identify best practices, and (2) thematic analysis of
semi-structured interviews with n=9 purposively sampled
experts. These experts span central banking, bank
treasury/ALM, fintech, payments regulation, and IT audit
[17]. The interviews probed five key themes: architecture
(T1), safeguards (T2), reserves/oracles (T3), policy triggers
(T4), and audit/transparency (T5) [15], [18], [19].

IV. THE SMART RESERVE VAULT FRAMEWORK AND
OPERATIONAL RULES
Our thematic analysis (T1-T5) with n=9 experts
confirmed that a two-tier architecture is non-negotiable,
preserving the role of banks/PSPs in retail services. Experts
strongly favoured a rule-based, auditable system anchored in
a diversified, tokenized reserve portfolio to enhance supply
discipline. Based on these findings, we formalized the SRV
artifact with the following components.
A. SRV Architecture
The SRV operates on a permissioned Distributed Ledger
(DLT) within a two-tier structure. The central bank (Tier-1)
acts as issuer and reserve manager, while private
intermediaries (Tier-2) handle all retail distribution and
services. The core of the SRV, shown in Fig. 2, links the
conventional settlement system (BI-RTGS) to the new CBDC
ledger. This linkage is managed by three key components: (1)
a Reserve Oracle, (2) a smart-contract Policy Engine, and (3)
Supervisory Audit APIs.

Fig. 2. SRV architecture: reserves-to-mint–burn.
B. Algorithmic Governance
Governance is automated and enforced by the smartcontract Policy Engine, detailed in Listing 1. This algorithm
serves as the "brain" of the SRV, computing the official
policy stance ("Mint", "Hold", "Burn") based on two main
inputs: the Reserve Adequacy Ratio (RAR) and a macrofinancial stability indicator (ERPI, e.g., Exchange Rate
Pressure Index). The design explicitly includes safeguards,
such as cooldown periods and override_flags, to prevent
procyclicality and allow for human intervention during
"black swan" events.
Listing 1. Algorithm-SRV Mint-Burn Policy Rule
Inputs: RAR_t, ERPI_t, L, U, τ, Δ_max, cooldown,
limits, override_flag, now, last_action
Derived: within_cooldown = (now - last_time) <
cooldown
Procedure SRV_Policy():
if override_flag: action=GovernanceAction(); Log;
return
Base stance: if RAR_t > U: "Mint"; elif < L: "Burn";
else "Hold"
Adjust for ERPI: if ERPI_t > τ and base=="Mint":
"Hold"
Guardrails: if within_cooldown: action=last; else
action=adj; step=ComputeStep(Δ_max)
Apply Remuneration/Limits
Execute on ledger; Log; return action

C. Mint-Burn Mechanisms
The Policy Engine executes its decisions through two
primary functions:
1. Minting: New CBDC is not discretionary. It is
minted via a quota system derived from the markedto-market value of tokenized reserves (gold, FX,
SDRs). This link is formalized in Eq. (1), where the
mint quota is a function of verified reserves,

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:19 UTC from IEEE Xplore. Restrictions apply.

## Page 3

outstanding CBDC, and a defined policy risk buffer.
MintQuotat = α⋅Reservest − β⋅Outstanding CBDC
t−γ⋅RiskBuffer
2.

inflation or FX depreciation targets) or when
intermediaries redeem CBDC for central bank
reserves. The overall system context, linking the
conventional RTGS to the CBDC ledger and a
phased rollout, is shown in Fig. 4.

Burning: Burning is initiated automatically when
macro-financial thresholds are breached (e.g.,

Fig. 4. SRV system context and phased rollout

D. Oracle and Attestation Mechanism
A critical component for system integrity is the oracle and
attestation mechanism. The SRV cannot function without a
reliable, trust-minimized data feed for the Reserves variable
in Eq. (1). This is not a single oracle. The design requires a
redundant, multi-node network that pulls data from
independent, cryptographically signed sources (e.g.,
custodians, independent auditors). The Policy Engine
(Listing 1) is programmed to execute only when these oracles
provide an attestation that reaches a predefined consensus
threshold. This mechanism prevents manipulated data from
triggering improper minting and ensures the supply of CBDC
is verifiably linked to real-world, audited reserve assets.
V. DISCUSSION: IMPLICATIONS AND LIMITATIONS
The formalization of the SRV artifact carries
significant implications. For central banks, the primary
benefit is enhanced monetary credibility. By transparently
anchoring CBDC supply to tokenized reserves via auditable
rules, the framework strengthens exchange-rate credibility
and price-discipline signals [5], [8]. This rule-based approach
complements conventional policy instruments by functioning
as a quasi-automatic stabilizer. For the market, the mandated
two-tier structure preserves the existing compliance
perimeter for KYC/AML and ensures commercial

banks/PSPs remain the primary interface for retail services,
mitigating disintermediation [3], [4].
This design is not without risk. Key challenges identified
by experts and literature include:
1. Technical Risk: The system's integrity hinges on
oracle reliability. This must be mitigated by using
redundant, multi-source attestation networks and
anomaly detection, as described in Section IV.
2. Economic Risk: The primary concern is banking
disintermediation. This is mitigated directly by the
framework's compatibility with safeguards like
tiered holding limits and zero remuneration, which
are common in global CBDC design [4], [9].
3. Governance Risk: The override_flag (Listing 1)
creates a potential for discretionary drift. This is
mitigated by requiring dual-control, immutable
audit trails for its use, and clear legal definitions.
Implementation would follow a staged 3-phase roadmap:
starting with a Wholesale foundation (Months 1-12),
expanding to Enhanced Wholesale (Months 13-24), and
culminating in a full Retail Rollout (Months 25-36).
Finally, the study's limitations must be acknowledged.
The evidence is based on expert interviews and a conceptual
mechanism; no live monetary deployment is evaluated. The
$n=9$ expert panel, while targeted, leans toward centralbank/industry perspectives, limiting end-user adoption
insights. Furthermore, the framework assumes the reliability

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:19 UTC from IEEE Xplore. Restrictions apply.

## Page 4

of oracle attestations and ledger resilience; technical failures
or governance capture would impair effectiveness.
VI. CONCLUSION AND FUTURE WORK
We present SRV, a reserve-anchored, rule-based
framework that automates CBDC mint–burn via smart
contracts and staged deployment. Future work includes
macro-welfare
calibration
and
stress
testing,
oracle/attestation security evaluations, interoperability and
programmability guardrails, inclusion/user-protection pilots,
and supervisory/legal harmonization to enable credible pilots.
ACKNOWLEDGMENT
Bryan Ananda designed the research, conducted
experiments, and wrote the paper under Elfindah Princes'
guidance. All authors approved the manuscript, and the
research data from the PDF Document is available at
https://drive.google.com/file/d/1WRmo7HolQhkRmJEaZrgS
pT1O2nMf5Spg/view?usp=sharing

REFERENCES
[1]

[2]

[3]

[4]

[5]

[6]

[7]

T. Adrian and T. Mancini-Griffoli, “The Rise of Digital Money,” IMF
FinTech
Notes,
no.
2019/001,
2019.
DOI:
https://doi.org/10.5089/9781498324908.063
J. Kiff, J. Alwazir, S. Davidovic, et al., “A Survey of Research on Retail
Central Bank Digital Currency,” IMF Working Paper, WP/20/104,
2020. DOI: https://doi.org/10.5089/9781513547787.001
R. Auer and R. Böhme, “The Technology of Retail Central Bank
Digital Currency,” BIS Quarterly Review, Mar. 2020. DOI (SSRN):
https://doi.org/10.2139/ssrn.3561198
I. Agur, A. Ari, and G. Dell’Ariccia, “Designing Central Bank Digital
Currencies,” IMF Working Paper, WP/19/252, 2019. DOI:
https://doi.org/10.5089/9781513514154.001
M. M. Ferrari, A. Mehl, and L. Stracca, “Central Bank Digital Currency
in an Open Economy,” Journal of Monetary Economics, vol. 127, pp.
54–68, 2022. DOI: https://doi.org/10.1016/j.jmoneco.2022.02.001
D. Andolfatto, “Assessing the Impact of Central Bank Digital Currency
on Private Banks,” The Economic Journal, vol. 131, no. 634, pp. 525–
540, 2021. DOI: https://doi.org/10.1093/ej/ueaa073
T. Keister and D. Sanches, “Should Central Banks Issue Digital
Currency?,” Review of Economic Studies, vol. 90, no. 1, pp. 404–431,
2023. DOI: https://doi.org/10.1093/restud/rdac017

[8]

M. D. Bordo and A. S. Levin, “Central Bank Digital Currency and the
Future of Monetary Policy,” NBER Working Paper No. 23711, 2017.
DOI: https://doi.org/10.3386/w23711
[9] J. Fernández-Villaverde, D. Sanches, L. Schilling, and H. Uhlig,
“Central Bank Digital Currency: Central Banking for All?,” NBER
Working Paper No. 26753, 2020. DOI: https://doi.org/10.3386/w26753
[10] N. Barrdear and M. Kumhof, “The Macroeconomics of Central Bank
Digital Currencies,” Bank of England Staff Working Paper No. 605,
2016. DOI (SSRN): https://doi.org/10.2139/ssrn.2811208
[11] G. B. Gorton and J. Zhang, “Taming Wildcat Stablecoins,” NBER
Working Paper No. 29984, 2022. DOI: https://doi.org/10.3386/w29984
[12] D. W. Arner, R. Auer, and J. Frost, “Stablecoins: Risks, Potential and
Regulation,”
SSRN
Working
Paper,
2020.
DOI:
https://doi.org/10.2139/ssrn.3560074
[13] C. Catalini and J. S. Gans, “Some Simple Economics of the
Blockchain,” Communications of the ACM, vol. 63, no. 7, pp. 80–90,
2020. DOI: https://doi.org/10.1145/3359552
[14] M. Kumhof and C. Noone, “Central Bank Digital Currencies—Design
Principles and Balance Sheet Implications,” SSRN Working Paper,
2018. DOI: https://doi.org/10.2139/ssrn.3180720
[15] V. Braun and V. Clarke, “Using Thematic Analysis in Psychology,”
Qualitative Research in Psychology, vol. 3, no. 2, pp. 77–101, 2006.
DOI: https://doi.org/10.1191/1478088706qp063oa
[16] G. Guest, K. M. MacQueen, and E. E. Namey, Applied Thematic
Analysis.
Thousand
Oaks,
CA:
SAGE,
2012.
DOI:
https://doi.org/10.4135/9781483384436
[17] A. Tong, P. Sainsbury, and J. Craig, “Consolidated criteria for
reporting qualitative research (COREQ): A 32-item checklist for
interviews and focus groups,” International Journal for Quality in
Health Care, vol. 19, no. 6, pp. 349–357, 2007. DOI:
https://doi.org/10.1093/intqhc/mzm042
[18] J. Cohen, “A Coefficient of Agreement for Nominal Scales,”
Educational and Psychological Measurement, vol. 20, no. 1, pp. 37–46,
1960. DOI: https://doi.org/10.1177/001316446002000104
[19] M. L. McHugh, “Interrater Reliability: The Kappa Statistic,”
Biochemia Medica, vol. 22, no. 3, pp. 276–282, 2012. DOI:
https://doi.org/10.11613/BM.2012.031
[20] A. R. Hevner, S. T. March, J. Park, and S. Ram, “Design Science in
Information Systems Research,” MIS Quarterly, vol. 28, no. 1, pp. 75–
105, 2004. DOI: https://doi.org/10.2307/25148625
[21] K. Peffers, T. Tuunanen, M. A. Rothenberger, and S. Chatterjee, “A
Design Science Research Methodology for Information Systems
Research,” Journal of Management Information Systems, vol. 24, no.
3, pp. 45–77, 2007. DOI: https://doi.org/10.2753/MIS07421222240302
[22] J. Seawright and J. Gerring, “Case Selection Techniques in Case Study
Research: A Menu of Qualitative and Quantitative Options,” Political
Research Quarterly, vol. 61, no. 2, pp. 294–308, 2008. DOI:
https://doi.org/10.1177/1065912907313077

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:19 UTC from IEEE Xplore. Restrictions apply.
