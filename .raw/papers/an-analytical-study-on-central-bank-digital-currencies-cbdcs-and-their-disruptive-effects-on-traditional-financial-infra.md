---
source_type: pdf
title: "An Analytical Study on Central Bank Digital Currencies CBDCs and Their Disruptive Effects on Traditional Financial Infrastructures"
original_file: "thesis/reference/An_Analytical_Study_on_Central_Bank_Digital_Currencies_CBDCs_and_Their_Disruptive_Effects_on_Traditional_Financial_Infrastructures.pdf"
sha256: "45c43b59a2bfbde7dd8fbe02d900138049b72b3dca72b38b5263222b3e8dea45"
page_count: 7
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: An Analytical Study on Central Bank Digital Currencies CBDCs and Their Disruptive Effects on Traditional Financial Infrastructures

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2026 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI) | 979-8-3315-5519-1/26/$31.00 ©2026 IEEE | DOI: 10.1109/ICMCSI67283.2026.11412689

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1

An Analytical Study on Central Bank Digital
Currencies (CBDCs) and Their Disruptive Effects on
Traditional Financial Infrastructures
Dr. D. Anjaneyalu
Associate Professor, Dept of MBA
anjaneyulu.mba@srecnandyal.edu.in
Santhiram Engineering College
Nandyal, A.P.

Dr. M. V. Subramanyam
Professor, Dept of ECE
Principal@srecnandyal.edu.in
Santhiram Engineering College
Nandyal, A.P.

Dr. A. K. Neeraja Rani
Professor dept of MBA
akneeru@gmail.com
Santhiram Engineering College
Nandyal, A.P.

Maradapu Venu Gopal
PG Student, Dept of MBA
venuv1689@gmail.com
Santhiram Engineering College
Nandyal, A.P.

Konkala Sanjeeva Kumar
PG Student, Dept of MBA
Sanjeevakkonkala@gmail.com
Santhiram Engineering College
Nandyal, A.P.

Male Sunny Alen Santha Raju
PG Student, Dept of MBA
santharajmale12@gmail.com
Santhiram Engineering College
Nandyal, A.P.

Abstract—Central Bank Digital Currencies (CBDCs) represent a
fundamental shift in the design and operation of modern financial
infrastructures. This paper presents a comprehensive analytical
and AI-assisted framework to examine the disruptive impact of
CBDCs on traditional banking systems, settlement mechanisms,
and liquidity networks. The study systematically evaluates retail
and wholesale CBDC architectures, focusing on their implications
for scalability, interoperability, cybersecurity, and institutional
roles. To address the limitations of existing descriptive and
macroeconomic analyses, a hybrid Autoencoder–Isolation Forest
(AE–IF) model is employed to detect transaction-level anomalies
and forecast systemic risk within CBDC transaction streams.
Experimental evaluation using simulated CBDC settlement data
demonstrates that the proposed hybrid approach achieves
superior detection accuracy, reduced false alarms, and
millisecond-level inference latency compared to standalone
models. The findings highlight that while CBDCs enhance
transaction efficiency and transparency, they also introduce new
challenges related to operational resilience, data concentration,
and bank disintermediation. This work contributes an integrated,
technically grounded framework that bridges policy analysis,
financial infrastructure design, and AI-driven monitoring,
offering central banks actionable insights for resilient CBDC
deployment.
Keywords—Central Bank Digital Currency (CBDC), Financial
infrastructure, Digital payments, Blockchain technology, Artificial
intelligence

I.

INTRODUCTION

The rapid digitalization of world financial systems has
transformed the manner in which the monetary value is created,
transmitted and stored, which is provoking central banks to
rethink the structure of the sovereign currency issuance.
Probably one of the most significant innovations in this shift in

the last few years is the Central Bank Digital Currency
(CBDC), which is a digital representation of fiat money
supported and issued by a country monetary authority. In
contrast to decentralized cryptocurrencies, CBDCs are aimed to
be applied to monetary sovereignty, yet provide programmable
and interoperable digital payment features, with high
efficiency. Prototypes of CBDC are currently being piloted or
deployed in several nations of the world, including China,
India, Nigeria, Sweden, and some EU member states, driven by
the desire to make settlements quicker, cash-handling costs
lower, promote financial inclusion and strategic resilience
against privately issued digital currencies and globally
stablecoins [1], [2]. But despite the increasing momentum, the
disruptive nature of CBDCs on the existing financial
infrastructures has been only partially explored, especially in
how their operations will affect the interbank network, liquidity
flow, commercial banking functions, and pathways of systemic
risks.
The current literature mostly dwells on CBDCs as a
means of improving payment and/or increasing the
effectiveness of central bank monetary instruments, yet many
such analyses are theoretic, paying no attention to the
underlying architectural and technology-informed factors that
condition how such systems are actually implemented. In the
existing literature, CBDCs are usually viewed as either
innovation in policy or cryptographic systems, which creates a
disjointed view of the phenomenon and does not reflect the
interaction of economics, network engineering, cybersecurity,
and institutional design. Besides, the majority of research
provides descriptive evaluations of CBDC pilot initiatives,
without discussion of how legacy infrastructures, in real-time
gross settlement (RTGS) systems, clearing houses,
correspondent-banking chains, and retail payment switches,
will be reconfigured or substituted. The phenomenon is further

979-8-3315-5519-1/26/$31.00 ©2026 IEEE

1459

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:12 UTC from IEEE Xplore. Restrictions apply.

## Page 2

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1

intensified by the fact that the introduction of artificial
intelligence into the layers of CBDC operation allows to apply
machine learning models, with the area being able to detect
fraud, automate regulators, and data-rich analytics that are
privacy-centered and predictive stability. Although a small
number of recent technical reports cite AI-based anomaly
detection and distributed-ledger optimization, there are few
analytical studies that have incorporated these models into the
structures of a CBDC. There will therefore still be a research
gap in terms of comprehending the systemic dislocations as
well as the technological enhancement that CBDCs bring into
the existing financial infrastructures.
In order to overcome these drawbacks, this paper
introduces a holistic analytical framework, which looks at the
CBDCs in dual perspectives: financial infrastructure disruption
and AI-enhanced operational resilience. Instead of considering
CBDCs as a payment tool, the paper considers CBDCs as
system-level innovations capable of reorganizing the
distribution of liquidity, finality of settlement, cross-border
interoperability and the workings of commercial banks. This
analysis differentiates between retail and wholesale CBDC
models, outlines where these models fit in a multi-layered
financial stack (including central bank cores, interbank
networks, payment gateways, and consumer-facing digital
wallets), and discusses cascading implications on the
architecture of these models. The paper also hypothesizes an
intelligent analytical layer with the inclusion of machine
learning to identify anomalies, patterns of transactions, and
risk-forecasting models that can be deployed by the central
banks to reduce operational risks and achieve compliance and
cyber-resilience. Incorporating this view into the design of
CBDC, the paper brings into the limelight the role of AI in
enhancing scalability, early detection of systemic anomalies
and real-time adaptive threat intelligence, which the current
financial infrastructure lacks or adopted in small bits.
This research is not aimed at either promoting or
opposing the introduction of CBDCs but rather to offer a wellinformed architectural perspective on the disruptive nature of
CBDCs on mainstream infrastructures, the vulnerabilities they
present, and how architects must redesign to ensure integrating
the technology safely. The resulting balance of the analysis
approach allows evaluating the transformative potential of
CBDCs with an equilibrium between efficiency gains and
programmability and disintermediation, data concentration, and
cyber-attack surfaces risks. Finally, the paper places CBDCs at
the forefront of a wider structural change in the world of global
finance one where AI-enhanced, digitally native systems are
increasingly substituting more sluggish and paper-based
systems received at a time when they were created. The paper
provides a subtle perspective on CBDCs as technology artifacts
and financial tools, which can aid policy makers, technoologists, and researchers in predicting future obstacles and
creating more robust digital monetary systems.
Contributions

The contributions of the paper are as follows:
An integrated analytical framework that systematically maps
retail and wholesale CBDC design choices to disruptions in
legacy settlement systems, liquidity distribution, and interbank
infrastructures.
• A hybrid AI-assisted anomaly detection model combining
Autoencoder-based representation learning with Isolation
Forest classification for real-time CBDC transaction
monitoring
and
systemic-risk
assessment.
• A quantitative evaluation demonstrating improved detection
accuracy, reduced false positives, and low inference latency
compared to traditional and standalone monitoring techniques.
II.

RELATED WORK

Carvalho Silva and Mira da Silva provide an extensive
multivocal literature review that is both broad in the coverage
and synthesis of divergent voices in its coverage and narrow in
technical modelling of impacts of infrastructure, and its greatest
strength is the breadth and synthesis of divergent views and its
greatest weakness is that the synthesis is largely descriptive and
lacks the technical modelling of consequences of infrastructure.
Relative to our work, their review gives us a great map of
themes and data which we base on, yet fails to present an
integrated systems-level or AI-enhanced analytical model on
which to assess disruption to legacy settlement and interbank
layers [1].
Bitter produces a macro- and banking-sector analysis
of banking crisis in a CBDC world, going into great detail about
how the effects of CBDC holdings might fast-track bank runs
and how stability can be impacted. Its strength lies in its careful
economic modelling of crisis dynamics; its weakness lies in the
fact that it concentrates little on technical mitigations (e.g.
architectural or algorithmic control) and the redesign of
operational payment rails itself. Our solution complements
Bitter with technology-architecture and AI-driven detection
strata capable of alleviating some of the instabilities modeled
and maintaining the fresh insights of macroprudence of the
paper [2].
The CBDC revolution as described by Ozturkcan et al.
is put in strategic, technological and regulatory terms, providing
systematic scenarios and policy heuristics. Scenario-based
relevance of the policy to the strategy; strength of their paper
One weakness is that, their paper lacks concrete infrastructurelevel models and experimental validation. We build on
Ozturkcan et al. by stepping downwards in the high-level
framing hierarchy to an analytical framework to explicitly map
CBDC design options to infrastructure reconfiguration and
trade-offs of operation based on AI-assisted analytics [3].
Kamin and Zampolli talk about the CBDC in Latin
America and the Caribbean, which are region-specific in their
institutional, legal, and deployment insights. The paper also has
strong application to contextual policy interpretation and
empirical descriptions of pilots; it is weakened by being
regionally focused and by failing to generalize the lessons of

979-8-3315-5519-1/26/$31.00 ©2026 IEEE

1460

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:12 UTC from IEEE Xplore. Restrictions apply.

## Page 3

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1

infrastructure-level technical examples. Our research, on the
other hand, uses such regional case-studies but generalizes to a
general framework of retail and wholesale designs and suggests
AI mechanisms that can be used across jurisdictions without
considering region-specific parameterizations [4].

with more qualitative modeling of infrastructure. Such
qualitative understanding is employed in our study, but is
supplemented by a clear systems model and AI methods to
quantify the disruption pathways and the threat vectors of retail
CBDC deployments [9].

Giving a useful financial-accounting view on riskmanagement and a risk-taking viewpoint, Bindseil, Marrazzo,
and Sauer examine the implications of CBDC on central bank
profitability, risk-taking and capital. It has the advantage of
putting more emphasis on balance-sheet implications and riskreturn implications on central banks; the drawback of putting
less emphasis on the technical design and cyber-resilience of
the transaction layer. Our efforts are complementary to their
financial focus, which integrates operational AI-based risk
prediction and anomaly detection into the CBDC transaction
stack, thereby relating financial outcomes of central banks to
operational measures of central banks [5].

Rizwan, Ahmad, and Qureshi examine the
contribution of CBDC to systemic risk and provide modelling
and measures of contagion and propagation of shocks. The
article is solid in terms of systemic-risk quantification; its flaw
only lies in the fact that it has not delved into detail on how
technical design and AI tools can be used to minimize detection
latency or reroute liquidity to mitigate contagion. These metrics
of systemic risk are the basis of our paper; they incorporate AIbased early-warning systems and clustering at the transaction
level to minimize both the time-to-detect and systems-level
exposure [10].

Investigating the bank profitability in the conditions of
CBDC, Bellia and Calais give empirical and theoretical
evidence concerning the role of CBDC design options on the
commercial bank margins. It is a well-written paper that is very
strong in terms of the microeconomic approach to revenue
streams of banks, but weak in terms of prescribing architectural
or algorithmic solutions to deal with disintermediation. We take
this further in our work, specifying how the functionality of
bank intermediation could be maintained by hybrid CBDC
designs and AI-enhanced service layers to provide technical
levers to offset the effects of these functions on bank profits [6].
Gafsi uses a GVAR method to measure the effects of
CBDCs in the G20 economies, which is based on macrofinancial spillovers and cross-border interactions. Its advantage
is the multi-country quantitative method; its disadvantage is
little delving in the technical aspects of interoperability and
settlement-layer modifications that facilitate or constrain the
noted macro effects. Our model adds to Gafsi the mapping of
the impacts of interoperability and settlement design decisions
(retail vs. wholesale, atomic settlement primitives) to the macro
spillovers that his model quantifies [7].
Okaro provides a macroeconomic evaluation of the
impact of CBDCs on financial intermediation and monetary
autonomy on a long basis. Its strong point is the prospective
macro view of the paper; the weak one is the little guidance on
operational or algorithmic designs. In contrast to Okaro, our
paper redirects the attention to operational architectures and AIpowered supervision tools that are capable of keeping monetary
independence in the case of dealing with the intermediation
issues he brings up [8].
Wathahong et al. conduct their analysis of the
disruptive potential of retail CBDC in Thailand on the lenses of
open innovation and design. Their advantage is in the
combination of innovation management and empirical analysis
of stakeholders; the drawback is the less quantitative approach

Sanz Bayon analyzes actual and potential CBDC
initiatives and explores the issue of governance and datacontrol on the EU level. The legal and governance framing is
one strength, and the absence of highly technical system models
or AI-based privacy preserving analytics is one weakness. We
can use the governance wisdom to suggest technical design
patterns (e.g., privacy-preserving ML, access control) that can
more fully operationalize the governance objectives defined by
Sanz Bayon [11].
On potential design traps and rebound effects of green
monetary policy with the help of CBDCs, Stockel emphasizes
on the aspect of unintentional consequences. This work is
strong in discussing policy externalities and second-order
effects; it is weak in its analysis of the mechanisms in the
infrastructure that lead to these rebound effects. We apply this
reasoning to project particular architectural decisions (e.g.,
transaction metadata, programmability) on the policies of the
environment and suggest AI-assisted monitoring to identify
rebound phenomena in their upcoming stages [12].
Rachmad views the changing central bank functions in
the digital age in the CBDC terms, offering general institutional
insights. Institutional reframing is the strong point; the absence
of technical models of the systems and empirical validation is
the weak one. Our article will be a supplement to Rachmad,
with the specifics of operational architecture and AIs that will
be needed by central banks to implement the operational role of
his vision [13].
Hess uses an agent-based model to investigate the
difference in macro- and micro-level behavior when CBDC is
adopted. Its advantage lies in the methodological rigor of
simulation and analysis of emergent behavior; its disadvantage
is the lack of the integration of AI-based detection or adaptive
defense systems in the simulated environment. In our work, we
extend the insights of Hess to the agent-based approach, but we
also add AI-based monitoring agents, as well as anomaly-

979-8-3315-5519-1/26/$31.00 ©2026 IEEE

1461

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:12 UTC from IEEE Xplore. Restrictions apply.

## Page 4

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1

response policies, to test the adaptive resilience in the
conditions of CBDC [14].
Koparan examines the trends in the global adoption of
CBDC with the focus on financial inclusion and country
characteristics. The empirical cross-country comparative lens
of the review is its strength, and the high level and lack of
concrete technical prescriptions is its weakness. The empirical
trends are synthesized in our work, and applied to specific
architectural design options and AI-driven mechanisms,
depending on the archetypes of various countries [15].

B. Data Preprocessing and Feature Construction
CBDC working data is made up of timestamps, senderreceiver identities, depth of the transaction in the settlement
queue, the features of a digital wallet, and metadata in ledgerbased form. These nonhomogeneous inputs are initially
cleansed, canonicalised and converted. A transaction record
𝑥𝑡 = {𝑎𝑡, 𝑏𝑡, 𝜏𝑡, 𝑣𝑡, ℓ𝑡}
represents sender 𝑎𝑡 receiver 𝑏𝑡 timestamp 𝜏𝑡 value 𝑣𝑡 and
ledger-position features ℓ𝑡. Each record is encoded into a fixeddimensional feature vector 𝑓𝑡 ∈ 𝑅𝑑 and standardized using
𝑓𝑡′ = 𝜎𝑓𝑡 − 𝜇

Summary and Novelty
This study advances existing CBDC research in three
key ways. First, it introduces an integrated systems-level
analytical framework that explicitly maps CBDC design
decisions—such as retail versus wholesale deployment,
settlement primitives, and interoperability protocols—to
structural disruptions across legacy settlement systems,
liquidity networks, and interbank infrastructures. Second, the
study embeds an operational AI-assisted monitoring layer
directly into the CBDC transaction architecture by combining
transaction-level anomaly detection, behavioral clustering, and
systemic-risk forecasting using a hybrid Autoencoder–Isolation
Forest model. Unlike prior studies that remain descriptive or
purely macroeconomic, this approach provides real-time,
transaction-aware risk visibility. Third, the work bridges
macro-financial analysis, governance considerations, and
infrastructure-level system design into a unified framework,
thereby addressing a critical gap in the literature between
policy-driven CBDC discussions and deployable technical
monitoring mechanisms.

This preprocessing will guarantee the model training stability
and, at the same time, will support the model training on
different national CBDC designs outlined in previous literature.
Intraday settlement pressure can be observed by using statistical
smoothing and time-window aggregation so that the system can
signal micro-structural stresses in both the liquidity and
transactional flow.
C. AI-Assisted Disruption Detection Model
The principle model is a hybrid AutoencoderIsolation
Forest (AEIF) design, which is selected due to its high
performance in the domain of unsupervised anomaly detection
and its applicability to the real-time CBDC setting. The
Autoencoder is trained to produce the low-dimensional
representations of normal transactional behavior and the
Isolation Forest increases the detection of sparse, irregular, or
destabilizing patterns. The reconstruction functions of the
Autoencoders are as follows:
^𝑡 = 𝑔(ℎ(𝑓𝑡′)),
where ℎ(⋅) is the encoder and 𝑔(⋅). The reconstruction error

III. Proposed system
A. Overview of the Analytical–AI Framework
It is proposed to combine the implementation of CBDC
transaction-stream preprocessing, AI-based anomaly detection
model and inference pipeline that could produce real-time
systemic-risk indicators to central banks. Based on the
observations of the recent CBDC literature on systemic risk,
banking stability and infrastructure disruption, this framework
sees CBDC networks as high-velocity, high-dimensional
transactional ecosystems that demand high-velocity automated
surveillance and structural analysis. The system accepts raw
transaction logs off of retail and wholesale CBDC layers,
standardizes and codes them, feeds them through a hybrid
statistical-machine-learning model, and generates a score of
anomaly and risk level. It aims to measure the disturbances
caused by the introduction of CBDC by establishing abnormal
settlement patterns, liquidity shocks, and network-level
deviations and spreading them to the rest of the financial
system. This systematic pipeline would allow tracking the
infrastructure changes occasioned by CBDC constantly and
offer quantifiable and reproducible information over and above
qualitative or macroeconomic research.

𝜖𝑡 =∥ 𝑓𝑡′ − 𝑓^𝑡 ∥ 2
serves as an intermediate anomaly score. This is paired with the
IF anomaly score 𝑠𝑡 to compute a combined disruption index
𝐷𝑡 = 𝛼𝜖𝑡 + (1 − 𝛼)𝑠𝑡,
A threshold 𝜃 generates discrete signals about inconsistent
liquidity flows, settlement congestion, or behavioral changes
within clusters of wallets. This hybrid design can meet the gaps
in the literature where sophisticated detection mechanisms
based on AI are underresearched.
D. Training, Inference, and System Runtime Complexity
The pipeline of training trains Autoencer weights with
mini-batch gradient descent and together trains Isolation Forest
trees on randomly subsampled feature distributions.
Throughout inference, new CBDC transactions are handled in
streaming mode: features are made normalized, encoded,
reconstructed, and fed to the IF classifier in order to generate
disruption indices. The complexity of training is predominated
by 𝑂(𝑛𝑑𝑘) for the Autoencoder (where 𝑛 is sample count,
𝑑 feature size, and kkk hidden-layer width) and 𝑂(𝑡𝑙𝑜𝑔𝑡) for

979-8-3315-5519-1/26/$31.00 ©2026 IEEE

1462

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:12 UTC from IEEE Xplore. Restrictions apply.

## Page 5

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1

the IF (with 𝑡 tree count). Inference is lightweight, requiring
𝑂(𝑑𝑘) appropriate to high frequency CBDC networks. This
will be compatible with real-time retail and wholesale CBDC
infrastructures and compatible with the performance
requirements of the studied previous CBDC designs.

This constructional flow chart shows the overall system of the
end to end, which starts with the raw CBDC transactions and
moves through preprocessing, feature encoding, auto encoder
reconstruction, Isolation Forest scoring and final disruptionindex generation to be analyzed by the central bank.

Experimental Setup and Parameter Configuration

Fig. 2 depicts the block-level operational pipeline of the
proposed CBDC monitoring system, detailing each sequential
processing stage from data preprocessing to risk alert
generation.

The Autoencoder was trained for 50 epochs using a
batch size of 128 with mean squared reconstruction loss. The
Isolation Forest component was configured with 100 trees and
a subsampling ratio of 0.8. The disruption-index threshold was
empirically selected based on validation data to balance
detection accuracy and false positive rate. These parameter
choices ensure stable convergence, robustness to noise, and
real-time inference capability in high-frequency CBDC
transaction environments.
Algorithm 1 – Training Procedure for Hybrid AE-IF Model
1: Initialize Autoencoder parameters W, b
2: Initialize Isolation Forest IF with T trees
3: for each epoch do
4:
for each mini-batch B ⊂ F do
5:
Normalize features B'
6:
Compute reconstruction B_hat = AE(B')
7:
Compute reconstruction loss L = ||B' - B_hat||^2
8:
Update AE parameters using gradient descent
9: end for
10: Update IF model using subsampled feature vectors
11: end for
12: return Trained AE, Trained IF
Fig. 1 illustrates the overall AI-assisted CBDC anomalydetection architecture, highlighting the flow from raw
transaction ingestion to disruption-index generation for central
bank analysis.

Fig. 1. overall AI-assisted CBDC anomaly-detection architecture.

Fig. 2. Block diagram of the proposed CBDC disruption-detection pipeline.

The block diagram shows every consecutive phase of the
proposed approach to the raw data acquisition up to risk-alert
generation, with a particular focus laid on the clarity of the
workflow.
IV.

RESULTS AND DISCUSSION

A. Quantitative Results
The offered hybrid AEIF model was tested using a
simulated CBDC transaction dataset based on retail and
wholesale settlement operations. The model was experimented
on 50,000 samples of transaction replications simulated to
replicate CBDC load conditions described in recent pilot
studies. The Autoencoder was stable in reconstruction given
that the Isolation Forest yielded explicit division between
normal and abnormal behavior. Table 1 gives the summary of
the key performance metrics and shows that the combined
disruption index is significantly better in detection sensitivity
than the individual models. The findings validate the claim that
the anomalies in CBDC settlements, including liquidity
pressure, excessive wallet concentration, and abnormal bursts
of transactions, can be detected with a high degree of reliability
in milliseconds, and therefore central banks can monitor
novelties in disruptions.
The proposed AE–IF model was evaluated against
standalone Autoencoder and Isolation Forest baselines. Table I
demonstrates that the hybrid approach achieves the highest
detection accuracy (95.8%) while minimizing false positives

979-8-3315-5519-1/26/$31.00 ©2026 IEEE

1463

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:12 UTC from IEEE Xplore. Restrictions apply.

## Page 6

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1

and false negatives. These results confirm the advantage of
combining representation learning with ensemble-based
anomaly detection for CBDC monitoring.
TABLE I: PERFORMANCE EVALUATION OF THE
PROPOSED AE–IF MODEL
Metric

Autoencoder
Only

Isolation
Forest Only

Hybrid AE–IF
(Proposed)

Detection
Accuracy (%)

89.4

91.7

95.8

False Positive
Rate (%)

7.3

6.8

4.1

False Negative
Rate (%)

9.8

8.1

3.7

Inference Time
(ms)

1.84

0.96

2.12

AUC-ROC

0.903

0.921

0.964

Table 1 demonstrates the results of the performance of separate
components (Autoencoder, Isolation Forest) and the combined
AE-IF model. The hybrid design has the best detection accuracy
(95.8) and the least false-positive and false-negative rates
which supports the high robustness of the combined disruptionindex formulation.
B. Discussion of Findings
Compared to rule-based AML checks and threshold-based
surveillance systems, the proposed model adapts dynamically
to evolving CBDC transaction patterns without manual
reconfiguration. Traditional systems fail to detect microstructural anomalies present in high-frequency CBDC
environments, whereas the hybrid AE–IF approach identifies
such deviations in real time.
The findings of the experiment suggest that CBDC
networks possess very regular and organized patterns of
behavior and can be used for unsupervised reconstructionbased anomaly detection. The hybrid AEIF model does not only
show deviations in the transaction density and settlement
latency, but it also finds deeper structural deviations vampire
within ledger-position characteristics. Fig. 3 shows distribution
of disruption scores created during inference, they clearly
reveal a boundary between normal operations and settlementlevel disruptions. These results confirm the views of the
reviewed literature, in which the fears of liquidity displacement,
bank disintermediation, and network instability, caused by
CBDC, necessitate early-warning technical solutions. The
suggested model demonstrates a high potential to assist central
banks with monitoring systemic risk, justifying the design of
CBDCs, and making the operationally resilient.
Under simulated stress conditions involving a 300% transaction
load increase and injected liquidity shocks, the disruption index
rose sharply, indicating early detection of systemic instability.
Inference latency increased marginally but remained within
operational limits, demonstrating scalability and resilience.

Fig. 3. Distribution of Disruption Scores for CBDC Transactions

Fig. 3 shows the values of disruption-index values produced by
the proposed model. Normal deals are concentrated at low
disruption scores (0.200.35), and anomalous cases take a clear
band at 0.650.80. This division shows that the hybrid AEIF
system is capable of distinguishing minor deviations in the
behavior of the networks within CBDCs and that it offers viable
information to be used in real-time monitoring and early
identification of the stress impacting infrastructure.
C. Comparative Evaluation Against Traditional Monitoring
Systems
The existing financial-surveillance systems (rule-based
AML checks, threshold alerts, and batch-based reconciliation)
are not as granular or fast as CBDM-scale digital ecosystems
need to be. Compared to these old systems, the model proposed
proves to have significantly shorter response time and active
adjustment to new trends. The AEIF framework detects microlevel anomalies that are not measurable by rule based systems,
especially those caused by high frequency settlement flows of
CBDC. Moreover the hybrid model does not demand manual
adjustment of threshold unlike the deterministic rule based
engines which are sensitive to changing patterns of usage of the
CBDC. This point of difference helps justify the use of nextgeneration monitoring instruments as evidenced in the literature
to manage the inflicted changes in the infrastructure due to
CBDC.
D. System Behaviour Analysis Under Stress Conditions
Artificial stress testing was done by adding 300
percent transaction load and adding randomized events of
liquidity shock in the dataset. Simulation of congestion periods
increased the index of disruption dramatically, which proves
the sensitivity of the model to real-life instability conditions,
including the acceleration of bank runs, irregular clusters of
wallets, or spikes in latency in retail layers of CBDC. Inference
latency growth was only slight during high-load conditions
(2.12 ms to 2.46 ms), which was still within operational range
of the national-level CBDC payment system. Such insights in
its behavior confirm the model's operational robustness and
indicate that it can be implemented on a mass scale and used by

979-8-3315-5519-1/26/$31.00 ©2026 IEEE

1464

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:12 UTC from IEEE Xplore. Restrictions apply.

## Page 7

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1

central banks where constant monitoring and stability
evaluation are fundamental.
Computational Complexity Discussion
The training complexity of the proposed model is
dominated by Autoencoder optimization and Isolation Forest
tree construction, while inference complexity remains linear
with respect to feature dimensionality. Empirical results
demonstrate that inference latency remains below 3 ms even
under stress conditions, confirming the suitability of the
approach for real-time national-scale CBDC monitoring
systems.
V.

CONCLUSION AND FUTURE SCOPE

This paper presented a technically grounded and AIassisted framework to evaluate the disruptive effects of Central
Bank Digital Currencies on traditional financial infrastructures.
By integrating a hybrid Autoencoder–Isolation Forest model
with a structured preprocessing and inference pipeline, the
proposed system effectively identified settlement anomalies,
liquidity distortions, and abnormal wallet behaviors—key
drivers of systemic risk in CBDC environments. Quantitative
evaluation demonstrated that the hybrid approach consistently
outperforms standalone models in detection accuracy, error
reduction, and inference latency, validating its applicability to
high-frequency CBDC transaction networks. The findings
confirm that while CBDCs enhance transaction efficiency and
transparency, they simultaneously introduce new operational,
architectural, and stability challenges requiring continuous and
adaptive monitoring. By bridging infrastructure-level analysis
with AI-driven surveillance, this work offers central banks a
scalable and deployable mechanism for real-time systemic-risk
assessment. Future research directions include integrating
privacy-preserving machine learning techniques such as
federated learning, extending multi-agent simulations to
capture macro-level behavioral dynamics under extreme stress
scenarios, and exploring AI-assisted cross-border CBDC
interoperability for multi-currency settlement optimization.

Intermediation and Sovereign Monetary Autonomy. Journal homepage:
yvww. ijrpr. com ISSN, 2582, 7421.
[9] Wathahong, T., Ratanabanchuen, R., Ayudhya, P. I. N., & Tientanopajai,
K. (2025). Assessing disruptive potential of retail central bank digital
currency and influence of design considerations: An open innovation
approach in Thailand. Journal of Open Innovation: Technology, Market,
and Complexity, 11(1), 100502.
[10] Rizwan, M. S., Ahmad, G., & Qureshi, A. (2025). Central bank digital
currency and systemic risk. Journal of International Financial Markets,
Institutions and Money, 99, 102104.
[11] Sanz Bayón, P. (2025). Current and Future Central Bank Digital Currency
(CBDC) Projects. In Governance and Control of Data and Digital
Economy in the European Single Market: Legal Framework for New
Digital Assets, Identities and Data Spaces (pp. 309-347). Cham: Springer
Nature Switzerland.
[12] Stöckel, M. (2025). Digital but not crypto: possible design pitfalls and
rebound effects for green monetary policy using central bank digital
currency. Eurasian Economic Review, 1-14.
[13] Rachmad, Y. E. (2025). The Role of Central Banks in the Digital Era: A
New Perspective through CBDC. The United Nations and the Nobel
Peace Prize Awards.
[14] Hess, S. (2025). What Difference Does Central Bank Digital Currency
Make? Insights from an Agent-based Model (No. 171). Thünen-Series of
Applied Economic Theory-Working Paper.
[15] Koparan, A. (2025). Central Bank Digital Currencies: A review of global
trends in adoption, financial inclusion, and the role of country
characteristics.

REFERENCES
[1]
[2]
[3]
[4]
[5]

[6]
[7]
[8]

Carvalho Silva, E., & Mira da Silva, M. (2025). Central Bank Digital
Currency: A Multivocal Literature Review. Journal of Internet and
Digital Economics.\
Bitter, L. (2025). Banking crises under a central bank digital currency
(CBDC). Jahrbücher für Nationalökonomie und Statistik, 245(4-5), 479526.
Ozturkcan, S., Senel, K., & Ozdinc, M. (2025). Framing the Central Bank
digital currency (CBDC) revolution. Technology Analysis & Strategic
Management, 37(4), 462-479.
Kamin, S., & Zampolli, F. (2025). Central bank digital currencies
(CBDCs) in Latin America and the Caribbean. Latin American Journal of
Central Banking, 6(1), 100140.
Bindseil, U., Marrazzo, M., & Sauer, S. (2025). The Impact of Central
Bank Digital Currency on Central Bank Profitability, Risk Taking and
Capital. In Central Bank Capital in Turbulent Times: The Risk
Management Dimension of Novel Monetary Policy Instruments (pp. 249272). Cham: Springer Nature Switzerland.
Bellia, M., & Calès, L. (2025). Bank profitability and central bank digital
currency. Journal of International Financial Markets, Institutions and
Money, 99, 102105.
Gafsi, N. (2025). The Impact of Central Bank Digital Currencies
(CBDCs) on Global Financial Systems in the G20 Country GVAR
Approach. FinTech, 4(3), 35.
Okaro, H. E. (2025). Evaluating the Long-Term Macroeconomic
Implications of Central Bank Digital Currencies on Global Financial

979-8-3315-5519-1/26/$31.00 ©2026 IEEE

1465

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:12 UTC from IEEE Xplore. Restrictions apply.
