---
source_type: pdf
title: "Performance Evaluation of Blockchain Systems Parameters Criteria and Modeling Techniques"
original_file: "thesis/reference/Performance_Evaluation_of_Blockchain_Systems_Parameters_Criteria_and_Modeling_Techniques.pdf"
sha256: "e070a3e4824da80c8a46fc30a3d95b08d4bf1936c16a0073981e1654433b3b14"
page_count: 3
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Performance Evaluation of Blockchain Systems Parameters Criteria and Modeling Techniques

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2024 IEEE/ACM 17th International Conference on Utility and Cloud Computing (UCC)

2024 IEEE/ACM 17th International Conference on Utility and Cloud Computing (UCC) | 979-8-3503-6720-1/24/$31.00 ©2024 IEEE | DOI: 10.1109/UCC63386.2024.00043

Performance Evaluation of Blockchain Systems:
Parameters, Criteria and Modeling Techniques
Madhav Ajwalia
Chandubhai S. Patel Institute of Technology (CSPIT),
Faculty of Technology & Engineering (FTE),
Charotar University of Science and Technology (CHARUSAT),
Changa, Gujarat, India
madhavajwalia.it@charusat.ac.in

Parth Shah
Chandubhai S. Patel Institute of Technology (CSPIT),
Faculty of Technology & Engineering (FTE),
Charotar University of Science and Technology (CHARUSAT),
Changa, Gujarat, India

Abstract—Blockchain technology has emerged as a
transformative solution for decentralized applications,
significantly affecting various sectors. Despite its potential,
evaluating blockchain performance remains a complex
challenge due to its multifaceted nature. This paper overviews
important performance parameters like throughput, latency,
energy efficiency or resource consumption, scalability and
security. After studying different performance parameters and
base in weighted importance, these evaluation parameters are
grouped by category. This study explores evaluation criteria,
and various modelling techniques (Benchmarking, Simulation,
Empirical Analysis, and Analytical Modeling) used to analyses
blockchain performance to discuss their effectiveness in
capturing the intricacies of blockchain operations. The goal is to
provide a comprehensive study for evaluating blockchain
systems, suggest a comprehensive framework and future
research in this domain.

examining the performance implication of different
blockchain architectures and consensus techniques. Since the
inception of the technology, performance evaluation of
blockchain systems has undergone tremendous change.
Evaluation of blockchain performance has been done from a
variety of perspectives. Various elements, including the
consensus algorithm, architectural design, hashing and
encryption techniques, and the capabilities of participating
nodes, affect how well blockchain systems perform [4] [5].
Researchers have developed several evaluation techniques to
measure these performance metrics. Initial research was
focused on theoretical aspects and simulation-based
evaluations. Recent studies have incorporated real-world
implementations and empirical measurements. For example,
Ethereum platform with Proof of Stake (PoS) proposed an
alternative to Proof of Work (PoW), emphasizing energy
efficiency and scalability. Research comparing PoW and PoS
highlighted trade-offs between security, energy consumption,
and transaction throughput [6]. By the latest, machine learning
improves blockchain technology evaluation and optimization
by predicting transaction throughput, detecting latency issues,
detecting anomalies, optimizing smart contracts, forecasting
market trends, and optimizing consensus mechanisms,
ensuring robust and efficient blockchain operations with
security enhancement [7].

Keywords—Blockchain, Performance Evaluation, Modeling
Techniques, Throughput, Latency, Energy Efficiency, Scalability,
Security.

I. INTRODUCTION
Blockchain technology was first associated with
cryptocurrency such as Bitcoin. It has then expanded to
support various decentralized applications including smart
contracts and distributed ledgers. While emphasis has been
placed on blockchain’s functional features, performance
evaluation remains underexplored compared to other features
such as security [1]. The efficiency and adoption of
blockchain systems depend on their ability to function
effectively. The evaluation of blockchain system’s feasibility
in real world scenarios depends heavily on performance
criteria including transaction throughput, latency, energy
efficiency and security.

III. RELATED WORK
The application and use of blockchain technology are now
beyond cryptocurrency, but never bother about efficiency,
stability, scalability, and performance. Moreover, to assess the
blockchain platform’s suitability to specific use cases, there is
a need for comprehensive performance evaluation [5] [8].
Along with the performance evaluation of blockchain
systems, selecting a blockchain platform for development and
adoption is crucial, considering factors such as suitability to
the business case, usability, and architectural design options
[9]. As per table I, performance evaluation parameters are
classified into three categories: blockchain metrics, network
metrics, and node metrics [10].

Due to architectural constraint in transaction processing
and data verification, blockchain technology faces scalability
issues [2] [3]. These limitations reduce system throughput by
raising transaction cost and consensus time. This study
examines several modeling methodologies used in blockchain
performance analysis, evaluates various performance
evaluation strategies, and discuss about important parameters
and criteria. In this study, the necessity of standardization of
evaluation techniques and generalized performance metrics is
discussed. It presents a structured approach to performance
assessment incorporating the latest developments in
blockchain research.

TYPE OF PERFORMANCE EVALUATION PARAMETERS [10]

Blockchain
metrics

consensus, transaction throughput, transaction
type/size, block size, chain size, transaction latency,
and finality time
network size, traffic and structure of volume, and
packet loss ratio
Hardware device, execution power, memory and
storage capacity, read latency, and read throughput.

Network
metrics
Node metrics

II. BACKGROUND
Nakamoto's groundbreaking work on Bitcoin established
the foundation for understanding the blockchain principles.
Buterin's subsequent research on consensus mechanisms and
decentralized applications on Ethereum draw the way for
further research. This has been expanded in recent research by

979-8-3503-6720-1/24/$31.00 ©2024 IEEE
DOI 10.1109/UCC63386.2024.00043

TABLE I.

[4] had done a comparative and analytical review of 84
performance evaluation parameters. And they classified them
into four categories: algorithm throughput, profitability of
mining, decentralization level, and consensus vulnerabilities.
Table II below further illustrates the significance of various

256

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:53:57 UTC from IEEE Xplore. Restrictions apply.

## Page 2

performance criteria, aiding in categorizing standard,
common, and related parameters for evaluating blockchain
networks. The pairwise comparison method determines the
most important criteria among the criteria set [11]. In this
method, criteria are compared to each other based on the
importance value of each criterion over the other. This
weighted importance is derived from the experts’ answers to
the questionnaires.
TABLE II.

Double spending attack
Transaction per second
51% attack
Sybil attack
Power consumption
Trust model
Verification time
Latency
Transaction fees
Hardware dependency

Weight

V. METHODOLOGY
To address these evaluation challenges, a possible multifaceted approach to blockchain performance evaluation is
directed by incorporating key performance parameters,
evaluation criteria and modelling techniques.

(%)
4.32
4.24
4.18
2.93
2.87
2.54
2.38
2.29
2.29

A. Performance Parameters
Key parameters to evaluate consist transaction throughput
(transactions per second), latency (time per transactions),
scalability (performance with increasing network size),
resource consumption (CPU and memory usage) and security
(resilience against attacks). These parameters are critical for
assessing the efficiency and robustness of any blockchain
systems.

IMPORTANCE OF CRITERIA [4]
Weight

Criteria

network protocols, and transaction types, it is difficult to
assess all performance factors in a single review. c) Realworld Relevance: Many evaluations are based on theoretical
models or simulations that may not adequately reflect realworld settings, limiting their application.

(%)
8.85
8.63
8.03
7.99
7.52
5.75
5.37
5.29
4.57
4.41

Criteria
Mining reward
Governance
Block size
Crash fault tolerance
Block withholding
Timejacking attack
Routing attack
Number of forks
Virtual mining

1) Throughput: This metric measures the blockchain
network’s capacity to process transactions per second (TPS).
For example, Bitcoin has a throughput of approximately 7
TPS, while platform like Ethereum supports significantly
higher rates of 14-50 TPS. Stellar and Bitshare can reach up
to 1000 TPS, and Solana can achieve over 65,000 TPS. High
throughput indicates a system’s ability to handle a large
volume of transaction efficiency.
2) Latency: It refers to the time it takes for a transaction
to be confirmed and added in the blockchain. Lower latency
improves user experience and system responsiveness. Latency
can be affected by factors such as network congestion and
block size. Recent studies focus on reducing latency to
improve system responsiveness [13].
3) Scalability: It assesses how well a blockchain system
performs as the network size and transaction flow increases.
Scalability challenges include managing increased transaction
loads and maintaining performance as more nodes join the
network. Recent research [14] emphasizes scalability
solutions such as layer-2 protocol and sharding.
4) Resource Consumption/Energy Efficiency: This
prameter evalaute the computational resources and energy
required by blockchain network to process transactions and
maintain consensus. Efficient resource consumption is
crucial for sustainability. Ongoing research [15] focuses in
optimizating algorithms and exploring soluitions to enhance
energy efficiency without compromising performance or
security.
5) Security: Security metrics evaluate blockchain’s
resistance to attacks and vulnerabilities, and ensure data
integrity. Key aspects include resistance to double spending
attack, 51% attack, sybil attack, timejacking attack and the
robustness of consensus mechanism. Security analysis ensure
the integrity and trustworthiness of the blockchain. Recent
research highlights new attack vectors and countermeasures
[16] and provides an approach towards hybrid consensus and
machine learning techniques [17].

After reviewing more than 100 parameters, the most
common are throughput, latency, scalability, transaction
validation/rate/size, block time/size, and energy efficiency.
They were grouped together according to the research of [4].
Furthermore, considering the range of assaults on blockchain
networks, security appears to be a critical parameter that
requires careful attention.
In performance evaluation, two primary methodologies
are employed [5]: empirical analysis and analytical modeling.
Empirical analysis encompasses approaches such as
benchmarking, monitoring, experimental analysis, and
simulations. Conversely, analytical modeling involves
techniques such as queuing models, Markov chains, and other
mathematical frameworks. [12] Categorize performancemodeling techniques into four distinct types: analytical
modeling, empirical analysis, simulation, and benchmarking.
Table III shows benchmarking and simulation tools used for
performance evaluation.
TABLE III.
Benchmarking
tools

Simulation
tools

TYPE OF PERFORMANCE EVALUATION TOOLS
Blockbench, BPChain, DAGBench, OpBench,
BCTMark, Pribb, EVM perf, GoHammer, xBCBench,
Gromit, BCmaster, Ledgerbench, BCadvisor, Diablo,
BlockMeter, Veribench, BlockCompass, Hammer,
Chainhammer, Quoram Profiling, Hyperledger caliper
DAGSim, BlockSim, SimBlock, BlockPerf,
TangleSim

IV. PROBLEM STATEMENT
Despite developments, there is no standardized approach
to evaluating blockchain performance. Evaluating blockchain
performance is difficult due to the involvement of multiple
elements such as network size, consensus techniques, and
transaction types. This leads to inconsistent evaluation metrics
in real-world events, limiting usable insights for system
optimization.
There are numerous issues in evaluating blockchain
performance: a) Standardization: There is no standardized
framework or specifications for performance evaluation,
resulting in uneven results and comparisons between research.
b) Complexity: Because blockchain systems include several
interacting components, including as consensus processes,

B. Evaluation Criteria
Criteria for performance evaluation should include
accuracy, realism, and reproducibility.

257
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:53:57 UTC from IEEE Xplore. Restrictions apply.

## Page 3

Accurate evaluation represents real-world performance by
verifying models and aligning them with actual behavior.
Realistic scenarios mimic them actual practical situations,
encompassing various network topologies, transaction types
and user behaviors. Similar findings across several studies are
made possible by reproducible outcomes, supported by
defined criteria and techniques for improved comparison.

evaluation framework by incorporating advanced machine
learning algorithm to predict blockchain performance under
unknown conditions, aiming to promote efficient, scalable
blockchain system and innovation. By advancing performance
evaluation methods, study aim to support the development of
more efficient and scalable blockchain systems.
REFERENCES

C. Modeling Techniques
Different modeling techniques are suggested by [5] [12].
1) Benchmarking Framework: Different benchmarking
frameworks, such as Blockbench and Hyperledger Caliper,
provide a systematic approach for evaluating performance
against standardize tests. This offers insights on comparative
performance and scalability for practical application. These
frameworks used to compare various systems and find
strengths and weaknesses.
2) Simulation Model: This model employes discriteevent simulation to denote the behavior of blockchain
transactions and consesnsus mechanisms. Models such as
DAGSim and BlockSim can simulate different network
scenarioes and transaction volumes. That enables
performance evaluation under diverse conditions without
implemeting the real system. For example, simulations can
model network congestion and consensus delay to assess their
effects on throughput and latency.
3) Analytical Model: Queuing theory offers a
methemtical structure for examining transacion processing
and network latencies. These model assist in finding
performance bottelnecks and predicts susyem behavior under
vaarious load. For instance, queuing models ebvalute how
transaction volume and processing time infulance overaall
system efficiency.

[1]

M. Dabbagh, K.-K. R. Choo, A. Beheshti, M. Tahir, and N. S. Safa, “A
survey of empirical performance evaluation of permissioned
blockchain platforms: Challenges and opportunities,” Comput. Secur.,
vol.
100,
no.
102078,
p.
102078,
2021,
doi:
10.1016/j.cose.2020.102078.
[2] I. S. Rao, M. L. M. Kiah, M. M. Hameed, and Z. A. Memon,
“Scalability of blockchain: a comprehensive review and future research
direction,” Cluster Comput., vol. 27, no. 5, pp. 5547–5570, 2024, doi:
10.1007/s10586-023-04257-7.
[3] T. A. Alghamdi, R. Khalid, and N. Javaid, “A survey of blockchain
based systems: Scalability issues and solutions, applications and future
challenges,” IEEE Access, vol. 12, pp. 79626–79651, 2024, doi:
10.1109/access.2024.3408868.
[4] S. M. H. Bamakan, A. Motavali, and A. Babaei Bondarti, “A survey of
blockchain consensus algorithms performance evaluation criteria,”
Expert Syst. Appl., vol. 154, no. 113385, p. 113385, 2020, doi:
10.1016/j.eswa.2020.113385.
[5] C. Fan, S. Ghaemi, H. Khazaei, and P. Musilek, “Performance
evaluation of blockchain systems: A systematic survey,” IEEE Access,
vol. 8, pp. 126927–126950, 2020, doi: 10.1109/access.2020.3006078.
[6] M. Dabbagh, M. Kakavand, M. Tahir, and A. Amphawan,
“Performance analysis of blockchain platforms: Empirical evaluation
of hyperledger fabric and ethereum,” in 2020 IEEE 2nd International
Conference on Artificial Intelligence in Engineering and Technology
(IICAIET), IEEE, 2020.
[7] S. Kayikci and T. M. Khoshgoftaar, “Blockchain meets machine
learning: a survey,” J. Big Data, vol. 11, no. 1, 2024, doi:
10.1186/s40537-023-00852-y.
[8] M. Touloupou, M. Themistocleous, E. Iosif, and K. Christodoulou, “A
systematic literature review toward a blockchain benchmarking
framework,” IEEE Access, vol. 10, pp. 70630–70644, 2022, doi:
10.1109/access.2022.3188123.
[9] T. A. Almeshal and A. A. Alhogail, “Blockchain for businesses: A
scoping review of suitability evaluations frameworks,” IEEE Access,
vol. 9, pp. 155425–155442, 2021, doi: 10.1109/access.2021.3128608.
[10] S. Smetanin, A. Ometov, M. Komarov, P. Masek, and Y. Koucheryavy,
“Blockchain evaluation approaches: State-of-the-art and future
perspective,” Sensors (Basel), vol. 20, no. 12, p. 3358, 2020, doi:
10.3390/s20123358.
[11] G. O. Odu, “Weighting methods for multi-criteria decision making
technique,” J. Appl. Sci. Environ. Manage., vol. 23, no. 8, p. 1449,
2019, doi: 10.4314/jasem.v23i8.7.
[12] M. Esmaili and K. Christensen, “Performance modeling of public
permissionless blockchains: A survey,” arXiv [cs.CR], 2024. [Online].
Available: http://arxiv.org/abs/2402.18049
[13] W. Tang, L. Kiffer, G. Fanti, and A. Juels, “Strategic latency reduction
in blockchain peer-to-peer networks,” Perform. Eval. Rev., vol. 51, no.
1, pp. 93–94, 2023, doi: 10.1145/3606376.3593572.
[14] S. Fernandez, “Scalability Solutions - Layer 2 Protocols and Sharding:
Analyzing Layer 2 Protocols and Sharding Techniques for Improving
the Scalability of Blockchain Networks”, Blockchain Technology and
Distributed Systems, 2023.
[15] S. Abed, R. Jaffal, and B. J. Mohd, “A review on blockchain and IoT
integration from energy, security and hardware perspectives,” Wirel.
Pers. Commun., vol. 129, no. 3, pp. 2079–2122, 2023, doi:
10.1007/s11277-023-10226-5.
[16] A. Hamdi, L. Fourati, and S. Ayed, “Vulnerabilities and attacks
assessments in blockchain 1.0, 2.0 and 3.0: tools, analysis and
countermeasures,” Int. J. Inf. Secur., 2023, doi: 10.1007/s10207-02300765-0.
[17] K. Venkatesan and S. B. Rahayu, “Blockchain security enhancement:
an approach towards hybrid consensus algorithms and machine
learning techniques,” Sci. Rep., vol. 14, no. 1, p. 1149, 2024, doi:
10.1038/s41598-024-51578-7.

VI. CONCLUSION AND FUTURE WORK
This study describes a structured way to evaluate
blockchain performance. That includes important
performance parameters, evaluation criteria and modeling
techniques. Performance of blockchain systems may
evaluated by focusing on these factors with proper modeling
tools such as benchmarking frameworks. By addressing
current difficulties and presenting a comprehensive
framework, blockchain system performance can be improved.
Further study will be critical to improving evaluation
approaches and enhancing blockchain technology.
Future research in evaluating blockchain performance
should concentrate on few areas. One significant direction is
the formulation of integrated evaluation methodologies that
combines benchmarking, simulation and analytical
approaches.
This amalgamation can furnish a more
comprehensive methodology on the assessment of blockchain
performance and address the shortcomings of individual
methods. Another essential area is empirical validation,
wherein real-world case studied are executed to authenticate
and refine performance model. Testing blockchain system in
operational settings will assist to ensure that evaluation
methods accurately represent practical performance.
Furthermore, there is a need for adaptive modeling, whereby
models evolve alongside advancements in blockchain
technology, and consensus mechanism should be sufficiently
flexible to accommodate new developments and sustain
relevance over time. Future research will enhance the

258
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:53:57 UTC from IEEE Xplore. Restrictions apply.
