---
source_type: pdf
title: "BPO-CBS A Data-Driven Blockchain Performance Optimization Framework for Cloud Blockchain Services"
original_file: "thesis/reference/BPO-CBS_A_Data-Driven_Blockchain_Performance_Optimization_Framework_for_Cloud_Blockchain_Services.pdf"
sha256: "f4820ef797599a0a0282c6600763c4a5f94fe7346ae18ea6f0fbf3c062967e6d"
page_count: 18
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: BPO-CBS A Data-Driven Blockchain Performance Optimization Framework for Cloud Blockchain Services

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

949

BPO-CBS: A Data-Driven Blockchain Performance
Optimization Framework for Cloud
Blockchain Services
Jishu Wang , Member, IEEE, Xuan Zhang , Member, IEEE, Linfeng Liu , Xuekun Yang, Tao Zhou ,
Chen Miao , Rui Zhu , and Zhi Jin , Fellow, IEEE

Abstract—Recently, blockchain has been widely used in important scenarios (e.g., finance and auditing). To fully meet the needs
of various business scenarios and reduce deployment costs, cloud
blockchain services (CBS) are now being offered by cloud computing providers. However, in high-frequency and large-scale transaction scenarios, blockchain performance faces serious challenges,
limiting its further application. Therefore, blockchain performance
optimization (BPO) has become a key field. Recent BPO methods
that adjust blockchain configuration parameters like block size,
offer benefits such as low cost and easy deployment. However,
these methods face challenges including unsuitability for dynamic
environments, high optimization overhead, and failure to consider
marginal utility (MU) in BPO. MU describes the decreasing effectiveness of BPO as transaction arrival rates increases, eventually
leading to limited BPO benefits. This paper proposes a data-driven
BPO framework (BPO-CBS) for CBS. First, a blockchain performance prediction model is trained using ensemble learning. Second,
a performance scoring and adjustment mechanism is designed
to identify optimal configuration parameters and adjust them to
Received 9 September 2025; revised 2 March 2026; accepted 22 March
2026. Date of publication 25 March 2026; date of current version 9 June 2026.
This work was supported in part by the Xingdian Talent Support Program
Industrial Innovation Talent Project of Yunnan under Grant yfgrc202422, in
part by the Science Foundation of Young and Middle-aged Academic and
Technical Leaders of Yunnan under Grant 202205AC160040, in part by the
China Central Fund for Guiding Development of Local Science and Technology
under Grant 202407AB110010, in part by the Knowledge-driven Smart Energy
Science and Technology Innovation Team of Yunnan Provincial Department
of Education, in part by the Open Foundation of Yunnan Key Laboratory of
Software Engineering under Grant 2023SE101, in part by the Yunnan Key
Laboratory of Digital Communications under Grant 202205AG070008, in part
by the Science and Technology Plan Project of Yunnan Provincial Department
of Science and Technology under Grant 202501AT070138, and in part by The
17th Practical Innovation Project of Postgraduate Students in the Professional
Degree of Yunnan University under Grant ZC-252513880. Recommended for
acceptance by L. Gu. (Corresponding author: Xuan Zhang.)
Jishu Wang is with the School of Information Science and Engineering, Yunnan University, Kunming 650091, China (e-mail: cswangjishu@hotmail.com).
Xuan Zhang, Linfeng Liu, Tao Zhou, and Rui Zhu are with the School
of Software, Yunnan University, Kunming 650091, China, and also with the
Yunnan Key Laboratory of Software Engineering, Kunming 650091, China
(e-mail: zhxuan@ynu.edu.cn; llf60f@gmail.com; ztao158@hotmail.com;
rzhu@ynu.edu.cn).
Xuekun Yang is with the Yunnan Key Laboratory of Digital Communications,
Broadvision Engineering Consultants Company, Ltd., Kunming 650200, China
(e-mail: kunxueyoung@163.com).
Chen Miao is with State Grid Xinyuan Material Company, Ltd., Beijing
100000, China (e-mail: 965378706@qq.com).
Zhi Jin is with the School of Computer Science, Peking University, Beijing 100871, China, and also with the Key Laboratory of High Confidence
Software Technologies, Ministry of Education, Beijing 100871, China (e-mail:
zhijin@pku.edu.cn).
Digital Object Identifier 10.1109/TCC.2026.3677471

enhance BPO. Finally, extensive quantitative and qualitative comparisons with related works show that BPO-CBS achieves more
effective BPO with low optimization overhead.
Index Terms—Blockchain, BPO, CBS, cloud computing,
hyperledger fabric.

I. INTRODUCTION
In recent years, due to its decentralized and tamper-proof
nature, blockchain has gradually been applied to various scenarios such as finance [1], intelligent transportation systems [2],
Internet of Things (IoT) [3], [4], and cloud services [5], [6]
to solve problems such as data silos [7], untrustworthy environments [8], [9], and auditing [10], [11]. As blockchain
applications become more widespread and the requirements of
cloud scaling [12], [13], cloud blockchain services (CBS) are
also known as blockchain-as-a-service has begun to be provided
as a cloud computing resource (e.g., Amazon Blockchain1 and
Huawei Blockchain2 ), which is a way to reduce blockchain
deployment costs and meet the customized needs of various
business scenarios.The integration of cloud computing and
blockchain has garnered significant attention across numerous
application scenarios, such as cloud storage [6], cloud IoT [14],
cloud manufacturing [15], and cloud blockchain [16].
However, as blockchain technology is gradually applied to
the cloud computing environment, its performance bottlenecks
(i.e., low throughput and high latency) have begun to emerge,
thereby limiting its practical application [17]. The permissionless blockchain represented by Bitcoin [18] is unable to meet its
performance and business needs. Meanwhile, the permissioned
blockchain represented by Hyperledger Fabric (HLF3 ) still has
some performance optimization space, and solutions need to be
designed to adapt to CBS features flexibly.
Critically, poor blockchain performance can lead to multifaceted risks affecting system availability, security, and user
experience [17], thereby undermining the effectiveness of CBS
in real-world applications. For example, when CBS data is
deposited into the blockchain as a transaction, if the transaction
throughput of the blockchain is insufficient, it will result in a
large number of transactions that cannot be quickly confirmed,
1 https://aws.amazon.com/cn/managed-blockchain/
2 https://www.huaweicloud.com/intl/en-us/product/bcs.html
3 https://www.hyperledger.org/

2168-7161 © 2026 IEEE. All rights reserved, including rights for text and data mining, and training of artificial intelligence and similar technologies.
Personal use is permitted, but republication/redistribution requires IEEE permission. See https://www.ieee.org/publications/rights/index.html for more information.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 2

950

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

leading to transaction congestion and service restrictions. In
addition, many critical operations (such as cloud storage verification) cannot be completed in real time due to high transaction
latency.
Therefore, the blockchain performance optimization (BPO)
for CBS is an ongoing challenge that needs to be addressed. In
recent years, BPO has become an important and well-attended
research area, and many representative BPO approaches have
been proposed from different optimization aspects, including
sharding [19], [20], consensus mechanisms [21], and directed
acyclic graphs (DAG) [22]. However, these methods are not very
suitable for the CBS scenario. First, consensus mechanisms are
often designed for specific scenarios and have limited scalability.
Next, sharding and DAG require high costs and technical thresholds and may increase system complexity, leading to a significant
increase in hardware investment and maintenance costs. Even
though some solutions based on lightweight consensus and DAG
have been proposed recently, they still cannot flexibly meet the
performance requirements of various CBS scenarios.
Recently, blockchain configuration parameters (BCP) adjustment has gained some attention as an easily deployable and
low-cost BPO solution, it achieves BPO by analyzing the relationship between BCP such as block size (BS) with blockchain
performance, identifying BCP that can achieve optimal performance under different transaction arrival rate (TAR4 ) and
adjusting them. These existing methods can be mainly classified
into static analysis and dynamic adjustment. In the static analysis
approaches [23], [24], researchers mainly model the impact of
BCP on blockchain performance to derive the optimal BCP. In
dynamic adjustment approaches, a part methods are based on
deep reinforcement learning (DRL), which generates blockchain
performance through a simulator and uses a stochastic strategy
for training and adjusts based on feedback [25], [26], [27].
Other researchers [28], [29] used machine learning (ML) to train
blockchain performance prediction models to find the optimal
BCP under real-time TAR, and achieved BPO. This method
is applicable to CBS scenarios because various CBS systems
generate a large amount of blockchain performance data, which
can be used to comprehensively analyze the relationship between
TAR (and BCP) and blockchain performance, thereby achieving
effective BPO. Moreover, CBS offers a stable network environment and efficient computational resources to support BPO
approaches based on BCP adjustments.
However, through an in-depth analysis of existing methods,
we identify two key issues (limited throughput optimization and
repidly increasing latency) in the BPO process when using realtime TAR as the optimization benchmark, if the TAR exceeds
the transaction load that the blockchain system can process. This
severely limits the effectiveness of existing BPO methods.
A set of blockchain performance empirical studies [30] on
HLF fully demonstrates the existence of these issues, as shown
in Fig. 1. Firstly, when the TAR is 150 transactions per second
(TPS), by adjusting the BS, the optimal throughput at this time
can reach 142 TPS. When the TAR is 175 TPS, even after
adjusting the BS, the optimal throughput declined to 141 TPS.
4 The number of transactions received by the blockchain system per second,
which can be used to measure the scale of transaction load.

Fig. 1. The effect of MU on the effectiveness of BPO, which significantly
affects the throughput and has latency as the TAR grows.

We believe the limited throughput optimization is due to the
marginal utility (MU) involved in the BPO process. MU is a
classical theory used in economics to measure the relationship
between the quantity of a good and its benefits [31], [32]. The
central feature of MU is its diminishing nature, which is reflected
explicitly in the BPO process, where throughput grows at a
slower and slower rate as the TAR continues to grow. In addition,
when TAR is less than 150 TPS, the blockchain latency remains
at a very low level. However, when TAR increases to 150 TPS
and higher levels, the latency increases rapidly. In blockchain
systems, when real-time TAR gradually approaches or even
exceeds the system’s processing capacity, MU begins to manifest
due to the consensus delays (reasons a and b described below)
and network bottlenecks (reason c described below). Taking
HLF as an example, this is primarily due to three main reasons:
(a) Sorting service bottlenecks: The first stage significantly
impacting consensus latency is transaction ordering. When a
large number of transactions accumulate at the ordering node,
it leads to higher consensus latency; (b) Overloaded validation
nodes: The transaction verification phase also impacts consensus latency. Due to the large volume of transactions requiring
validation by nodes, longer transaction verification times further
increase consensus latency; (c) Network and storage contention:
Simultaneous submission of numerous transactions triggers resource contention during both network transmission and ledger
commit phases. Therefore, as TAR increases, these three factors
collectively cause throughput growth to slow or even decline,
while latency increases rapidly.
Using real-time TAR as an optimization benchmark will
severely limit the effectiveness of BPO when the real-time
TAR exceeds the maximum transaction processing load of the
blockchain system. Therefore, jointly controlling TAR and adjusting BCP is a promising direction to enhance the effectiveness
and flexibility of BPO. For example, for latency-sensitive CBS
scenarios (e.g., payment), adjusting BCP based on a lower
TAR is a more effective BPO solution. On the other hand,
for throughput-sensitive scenarios (e.g., decentralized gaming),
controlling the optimization benchmark to the optimal TAR and
adjusting the BCP not only achieves maximum throughput but
also prevents excessive latency increases. However, the current
work has not yet considered this point; therefore, this is the main
motivation for this paper.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 3

WANG et al.: BPO-CBS: A DATA-DRIVEN BLOCKCHAIN PERFORMANCE OPTIMIZATION FRAMEWORK FOR CBS

To address the shortcomings of the existing works and improve the applicability of CBS, we propose a data-driven BPO
framework BPO-CBS towards the CBS scenario. Our main
contributions are highlighted as follows.
r We identify MU involved in the BPO process and analyze
the impact of MU on the effectiveness of BPO. Towards the
features of the CBS scenario, we propose BPO-CBS to improve the BPO effectiveness and enhance the applicability
of CBS.
r In BPO-CBS, we use ensemble learning to train a
blockchain performance prediction model, and design a
global scoring mechanism and an adjustment module to
select and adjust the optimal TAR and BCP, thus achieving BPO. Meanwhile, we collect and contribute a multimachine blockchain performance dataset (called MMBPD)
for future research. Currently, due to the difficulty of collection, such datasets are scarce and valuable.
r Qualitative comparisons and analyses with related work
fully demonstrate the innovation and significance of this
paper. Sufficient quantitative experimental results validate
the effectiveness of BPO-CBS, which achieves more effective BPO with low optimization overhead compared to
state-of-the-art (SOTA) methods.
The rest of this paper is organized as follows. We discuss introduces some related work in Section II. Section III describes the
system model of BPO-CBS. Section IV introduces the proposed
method. Section V describes the collection process of MMBPD
and the prototype deployment process of BPO-CBS. Section VI
provides sufficient and in-depth experiment evaluation and analysis. This paper is concluded in Section VII.
II. RELATED WORK
A. Cloud Computing and CBS
As blockchain begins to be offered as a cloud computing
resource, CBS is also gaining attention.
Blockchain is widely used to assist and enhance the performance of cloud computing in terms of security, fairness, and
service quality. To improve the fairness and efficiency of data auditing in cloud storage systems, Shu et al. [11] proposed a decentralized public auditing scheme based on blockchain, utilizing
the decentralized characteristics of blockchain to perform public
auditing of cloud storage data. Misra et al. [4] proposed a consortium blockchain-based sensor cloud architecture to provide
high-quality sensor cloud services, and they used blockchain
to track the activity of each sensor, thereby establishing a trust
environment. Lyu et al. [5] proposed a blockchain-based auditable anonymous user authentication protocol for anonymous
mutual authentication between users and cloud service providers
in a cloud service environment while maintaining user privacy.
To improve user access efficiency for encrypted cloud storage
data, Zhang et al. [6] introduced blockchain technology and
integrated each user-initiated data keyword request into the
blockchain, thereby avoiding the inefficiency caused by key
server synchronization.
In any case, these solutions rely on efficient blockchain performance. Therefore, a full implementation of BPO, oriented

951

TABLE I √
THE COMPARISON WITH RELATED WORK ( : COVERED; ×: UNCOVERED)

towards the features of CBS, will be able to enhance the applicability and interoperability of these solutions effectively.
B. BPO Based on BCP Adjustment
BCP adjustment is a viable way to achieve BPO [30]. Many
researchers have conducted studies from different perspectives
on the reasonable setting of BCP to achieve BPO. These methods
can be classified into static analysis and dynamic adjustment.
1) Static Analysis: Wilhelmi et al. [23] proposed an end-toend latency model based on batch service queuing theory to
analyze Proof-of-Work-based blockchain performance and used
a Markov Chain to select the optimal BS to optimize transaction
latency. Lee et al. [24] focused on the distribution of latency,
which is particularly important for some latency-sensitive scenarios (e.g., smart healthcare). They fitted a probability distribution to the latency and explored the impact of BCP on latency
to achieve minimal latency.
2) Dynamic Adjustment: With ML being applied to many
fields, it is highly accurate when the data is sufficient. Therefore,
using ML to train blockchain performance prediction models
and adjust the optimal BCP has become a feasible BPO method.
BPR [28] and LearningChain [29] are our previous works, and
we first trained the TAR and blockchain performance prediction
models, respectively. After that, we designed a scoring mechanism and input the TAR at future moments and different BS to
score the corresponding performance. Eventually, the BS with
the highest score is selected for adjustment, thus completing
the BPO [28]. Later, to enhance the scalability of BPO, metalearning is used to enable the training of blockchain performance
prediction models at small sample data sizes [29]. DRL methods
have also gained some attention in recent years, since concepts
such as simulators and learning feedback, they do not require
additional data for training. Liu et al. [25] proposed a DRLbased BPO framework to meet high throughput requirements
and aimed to accomplish BPO by dynamically adjusting BCP.
Recently, some related DRL-based BPO methods have been
proposed [26], [27], [33], [34].
The detailed comparison of BPO-CBS with related work is
given in Table I. Even though much progress has been made
with existing work, these methods do not work well for the BPO

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 4

952

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

Fig. 2.

The scenario model for BPO-CBS and three key features of CBS scenarios.

of CBS. First, CBS scenarios are dynamically changing, and
methods based on static analysis [23], [24] do not apply to this
situation. Second, DRL-based methods [25], [26], [27] suffer
from training instability and high computational overhead and
thus are not suitable for CBS. Next, ML-based methods [28],
[29] suffer from two-stage (i.e., TAR and blockchain performance) prediction errors, and the BPO effectiveness will be
affected due to the prediction errors. Finally, none of the above
works considered that real-time TAR as the optimization benchmark will severely affect the BPO effectiveness, this limits the
applicability of existing methods.
III. SYSTEM MODEL AND SOLUTION
In this section, we will illustrate and introduce the system
model of BPO-CBS, and present the main modules and optimization processes it contains, as well as the design goals.
A. CBS Scenarios Model
When blockchain is introduced into the cloud computing
infrastructure to provide CBS, we analyze three key features
in CBS scenarios, as shown in Fig. 2. These three key features
are, on the one hand, strongly related to the cloud computing
scenarios, and on the other hand, limit the blockchain performance, making it difficult to fully meet the needs of the CBS
scenarios.
1) High-Frequency and Massive Transactions: CBS typically
operate at a large scale, handling numerous data elements within
a continuous information exchange environment. Therefore,
when blockchain is used as a cloud computing infrastructure,
the blockchain system receives and processes high-frequency
and large-scale transactions.
2) Dynamic and Volatile Transactions: In CBS, transaction
scale (i.e., TAR) is also affected by factors such as time for different business needs (such as cloud storage and cloud auditing).
Therefore, transaction scale is dynamic and unstable.
3) Guarantee of Security and Efficiency: Cloud computing
service providers often ensure the stable provision and operation
of CBS through enhanced security, scalability, and flexibility.
The first two features lead to limitations in blockchain performance. When high-frequency and large numbers of transactions
are sent to the blockchain system for processing, its performance
(e.g., high latency) cannot adequately meet this demand. In
addition, the dynamic and fluctuating transaction volume also
places demands on blockchain performance, which needs to be
dynamically optimized to better adapt to the transaction volume.
Finally, in the CBS, many advantages (e.g., node devices with
high computational power and stable communication networks)
can be used to achieve accurate and efficient BPO. However,

since cloud computing resources often process multiple computational tasks simultaneously, the computational overhead associated with BPO must also be considered to avoid significantly
impacting other computational tasks. It is worth noting that since
the CBS providers usually simultaneously support permissioned
and permissionless blockchains, but in BPO-CBS, we find it
more appropriate for permissioned blockchain setups, because
these environments have fewer nodes and a trusted access model
that can fully guarantee the validity of the BPO. For permissionless blockchains (e.g., Bitcoin), due to their large number of
participating nodes and factors such as heterogeneous network
and computing environments, frequent adjustments to TAR and
BCP may yield limited performance optimization benefits while
introducing security risks. Therefore, BPO-CBS is less suitable
for such blockchains (cf., Section VI-F for details).
B. Overall Framework
The overall framework of BPO-CBS is illustrated in Fig. 3,
which comprises three key modules, and the specific content of
each module will be explained in Section IV.
1) Monitoring: This module is responsible for monitoring
the status of the blockchain, including the real-time volume
of transactions (i.e., TAR), the workload of the nodes, and the
overall performance of the blockchain. This foundation supports
subsequent performance prediction and optimization.
2) Prediction: Blockchain performance prediction plays a
crucial role in the BPO approach, based on BCP adjustment,
as it directly influences the effectiveness of the final BPO.
Once a sufficient amount of blockchain performance data is
gathered to train an accurate performance prediction model, it
can swiftly and accurately forecast the corresponding throughput
and latency when different TAR and BCP values are input to the
prediction model. All prediction results will be pre-stored and
periodically updated for use by the optimization module.
3) Optimization: This module handles specific blockchain
performance optimization procedures. Using real-time TAR data
from the monitoring module, it sets optimization benchmarks
based on selected strategies (such as using the TAR as the benchmark or calculating the best benchmark from all TARs) and
carries out performance scoring. After identifying the optimal
TAR and BCP, the transaction volume input to the blockchain
system is dynamically adjusted, and the BCP is modified to
quickly achieve efficient BPO.
C. Workflow
In BPO-CBS, the complete BPO process as shown in Fig. 4.
The preparation stage establishes the foundation for optimization. Using the operational blockchain system, extensive

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 5

WANG et al.: BPO-CBS: A DATA-DRIVEN BLOCKCHAIN PERFORMANCE OPTIMIZATION FRAMEWORK FOR CBS

Fig. 3.

953

The overall framework and key modules of BPO-CBS.

blockchain performance data (including various TAR and BCP)
can be collected to support training an ensemble learningbased blockchain performance prediction model. First, when
transactions are submitted to the blockchain, the monitoring
module transmits data (e.g., TAR) to the prediction module.
Next, the prediction module checks whether the performance
prediction result corresponding to this TAR has already been
stored. If it has, it proceeds to BPO; otherwise, it performs
fast inference, stores the performance result, and then proceeds with BPO. Subsequently, based on the chosen optimization strategy, different optimization weights are set, and
optimization benchmarks are configured to complete performance scoring. Finally, using the performance scores, a set
of TAR and BCP achieving optimal performance is identified. The designed dynamic adjustment module then adjusts
TAR and BCP according to the strategy, effectively achieving
BPO.
The primary processes in these modules (e.g., training and
inference of performance prediction models, performance scoring) are executed by the nodes with the lowest workload within
the blockchain network, effectively minimizing the impact of
these modules for the CBS.
D. Design Goals
We define the following design goals to ensure the feasibility,
effectiveness, and low optimization overhead of BPO-CBS.

1) Accurate and Effective BPO: Since the transaction patterns of CBS are high-frequency and high-volume, dynamic
and fluctuating, BPO-CBS must be capable of adapting to such
transaction features and achieving improvements in throughput
and reductions in latency by simultaneously adjusting TAR and
BCP. This will enable fast on-chain confirmation of CBS-related
transactions (e.g., storage and audit).
2) Low Optimization Overhead: While optimizing blockchain
performance, it is essential to minimize the impact of the introduced optimization modules on the CBS. For instance, during
peak transaction periods, the real-time TAR may exceed the
transaction processing capacity of the blockchain, at which
point optimizing blockchain performance becomes necessary.
Conversely, when the real-time TAR is low (e.g., early in the
morning), the benefits gained from executing BPO may not be
significant; in this case, optimization can be temporarily stopped.
Moreover, the additional overhead caused by the introduction
of the optimization module should be controlled. Therefore,
it is crucial to selectively perform BPO according to TAR,
optimization effect, and other factors to ensure low optimization
overhead.
3) High Scalability: Although BPO-CBS was designed for the
CBS scenario, many blockchain systems are not built on cloud
computing services. Additionally, other scenarios (e.g., parking
and electricity trading) also involve high-frequency, large-scale
transactions. Therefore, BPO-CBS must have high scalability to
perform well in similar scenarios.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 6

954

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

TABLE II
LIST OF NOTATIONS

Fig. 4.

The main BPO process of BPO-CBS.

In summary, the aforementioned design objectives not only
ensure the applicability of BPO-CBS in CBS scenarios but also
enhance its scalability for other similar scenarios.
IV. METHODOLOGY
In this section, three key modules in BPO-CBS will be described in detail to illustrate the specific optimization processes
of BPO-CBS. The symbols used in this paper are shown in
Table II.
A. Blockchain Performance Prediction Module
Collecting blockchain performance data in real-world environments is time-consuming and labor-intensive, often resulting in limited datasets. Therefore, supplementing blockchain
performance data with machine learning model predictions will
provide strong support for BPO. To adequately obtain accurate
blockchain performance data under various scenarios (different
TAR and BCP) for BPO implementation, we use ensemble
learning to train blockchain performance prediction models.
1) Model Training: Different base models exhibit varying
sensitivities to specific features. Ensembling these base models
make it possible to fully leverage their respective strengths,

enhancing overall prediction accuracy and robustness. In BPOCBS, the ensemble of these models is constructed as follows,
which is used to predict the blockchain performance (i.e.,
throughput and latency).
First, for the input features in training samples T S (i.e., TAR
and BCP), which are processed through the multilayer perceptron (MLP) backbone network to produce an initial prediction
(i.e., throughput and latency).
YM LP = fM LP (T S) ∈ Rm ,

(1)

where fM LP denotes the MLP model and YM LP denotes the
corresponding prediction results.
YBi = fBi (T S) ∈ R,

(2)

where fBi (T S) represents the i-th base model, and which will
produce a single scalar prediction YBi .
⎤
⎡
Y1 ← YM LP
⎥
⎢
⎢ Y2 ← YBi ⎥
⎥
⎢
(m+N )
i+1 ⎥
,
(3)
Ymatrix = ⎢
⎢ Y3 ← YB ⎥ ∈ R
⎢
... ⎥
⎣ Y... ← YB ⎦
Ym+N ← YBN
where N denotes the number of base models, and the output from
the backbone network YM LP is concatenated with the outputs of
all base models YBi , resulting in an ensemble prediction results
Ymatrix .

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 7

WANG et al.: BPO-CBS: A DATA-DRIVEN BLOCKCHAIN PERFORMANCE OPTIMIZATION FRAMEWORK FOR CBS

TABLE III
AN EXAMPLE OF THE CARTESIAN PRODUCT OF TAR AND BCP

Finally, the final fused prediction Ŷ is calculated by averaging
all values in Ymatrix :
m+N

Ŷ =


1
Yi .
m + N i=1

(4)

By combining the prediction results from multiple base models, ensemble learning can provide more accurate and reliable
predictions for throughput and latency tasks. In addition, the
ensemble of multiple base models can effectively improve the
generalization and thus apply to blockchain performance prediction tasks in different scenarios [35].
2) Pre-Stored Prediction Results: The network structure of
CBS does not change frequently, so its performance is relatively
more stable. When the performance prediction model is successfully trained, iterating over all possible TAR and BCP will
yield many combinations of input Com (cf. Eq. (5)). Com is fed
into the model for prediction, and its prediction result is stored.
For example, when TAR includes 100, 150, and 200 TPS, BCP
contains only BS, and BCP includes 50 and 100. Then Com
is shown in Table III. Therefore, as many combinations (i.e.,
the Cartesian product) of TAR and BCP as possible will be fed
into the trained model to predict the corresponding results and
stored. As many cases as possible will be covered for better
optimization when performing BPO.
Com = T AR × BCP = {a, b|a ∈ T AR, b ∈ BCP }. (5)
3) Model Update: Even though a certain amount of blockchain
performance data has been collected for model training in
the preparation stage. However, the blockchain performance
is affected due to possible changes in the blockchain network
(e.g., the number of nodes and the computing power of devices). Therefore, to dynamically adapt to changes in blockchain
performance, an online learning mechanism5 will be used to
maintain the accuracy of blockchain performance prediction
models based on a small amount of new data. After the prediction
model is updated, Com will be fed into the model for prediction
to update the pre-stored prediction results.
Through the designed workflow, the trained model will accurately predict blockchain performance and dynamically update
parameters based on network and computational environments.
This enables adaptive training and prediction, ensuring the effectiveness of performance optimization.
B. Global BPO Scoring Mechanism
Existing methods rely solely on real-time TAR as the optimization benchmark. This not only overlooks the potential
5 Online learning is a machine learning method that can adapt to dynamically
changing environments and fine-tune models based on instant data [36].

955

impact of MU on throughput optimization but can also induce a
rapid increase in latency. Consequently, the overall effectiveness
of BPO is severely compromised (cf. Fig. 1). Therefore, in
BPO-CBS, our optimization approach no longer relies solely on
real-time TAR as the sole benchmark. Instead, we use real-time
TAR as a foundation to search for optimal TAR and BCP values.
This enables us to achieve more efficient BPO than existing
methods by controlling the TAR input into the blockchain system and adjusting the BCP. We design a global BPO scoring
mechanism to perform the search for optimal TAR and BCP.
The main workflow of this mechanism is as follows.
1) Optimization Strategy Selection: First, different CBSs
have varying requirements and preferences regarding blockchain
performance. Therefore, different optimization strategies must
be selected. We define several primary optimization strategies:
throughput-first, latency-first, balanced optimization, and other
strategies (i.e., custom optimization).
2) BPO Scoring: Second, using the pre-trained performance
prediction model and pre-stored performance results, we retrieve the performance results corresponding to each input pair
in the Com and calculate their scores. We use the min-max
normalization idea to score the performance corresponding to
Com.
SiT hr =

T hri − T hrM in
,
T hrM ax − T hrM in

(6)

where SiT hr denotes the score of throughput corresponding to
Comi , and Comi denotes the i-th input pair in Com. T hri
represents the throughput corresponding to Comi . T hrM in
and T hrM ax represent minimum throughput, and maximum
throughput corresponding to Com, respectively.
The same method is also used for calculating the latency score,
which can be expressed as
SiLat =

Lati − LatM ax
,
LatM in − LatM ax

(7)

where SiLat denotes the score of latency corresponding to Comi ,
Lati represents the latency corresponding to Comi . LatM in
and LatM ax represent minimum latency, and maximum latency
corresponding to Com, respectively.
For T hri , the closer it is to T hrM ax , the higher SiT hr .
Meanwhile, for Lati , the closer it is to LatM in , the higher SiLat .
Next, we design a score summation method to meet different
optimization strategies, which is oriented towards optimization bias to meet the requirements of different scenarios. The
optimization-biased summation is expressed as
Si = ΩT hr · SiT hr + ΩLat · SiLat ,

(8)

where Si represents the total score corresponding to Comi ,
ΩT hr and ΩLat denote the scoring weight of throughput and
latency, respectively. By setting ΩT hr and ΩLat , a bias towards
performance optimization is achieved. In addition, to ensure the
fairness of the optimization, ΩT hr and ΩLat need to satisfy as
1 = ΩT hr + ΩLat .

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

(9)

## Page 8

956

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

We analyze the business scenarios of CBS and define the
following three primary optimization strategies: Throughputfirst, latency-first, and balanced optimization.
Throughput-First:1 · SiT hr + 0 · SiLat ,

(10)

Latency-First:0 · SiT hr + 1 · SiLat ,

(11)

Balanced-Optimization:0.5 · SiT hr + 0.5 · SiLat .

(12)

For business scenarios with high frequency and a large number
of transactions and tolerable seconds-level latency (e.g., supply
chain traceability), throughput should be the main optimization
goal (Eq. (10)); for latency-sensitive (i.e., hundred milliseconds) scenarios (e.g., real-time interaction of on-chain data),
latency should be the main optimization goal (Eq. (11)), and
for scenarios with dual performance requirements (e.g., vehicle
networking), a balanced optimization strategy should be adopted
(Eq. (12)).
3) Optimization Benckmark Configuration: To balance effectiveness and overhead, we configure the TAR search range (i.e.,
the optimization benchmark). Analysis shows TAR significantly
affects throughput but has no clear monotonic relationship with
latency. Thus, we set configuration principles:
When throughput is the main optimization object, if MU is
negligible, use real-time TAR as the benchmark to avoid unnecessary adjustment. If MU is apparent, enable global scoring
to find the optimal TAR (which may be lower than real-time
TAR) and its corresponding optimal BCP. And when latency is
the main optimization object, since latency and TAR lack a clear
correlation, always enable global scoring to find the (TAR, BCP)
pair achieving the lowest latency.
Therefore, we introduce a threshold Θ to determine whether
global scoring is used when throughput is the main optimization
objective. Meanwhile, in blockchain, throughput is always less
than or equal to TAR; therefore, we determine the degree of MU
based on the relationship between TAR and throughput.
DegM U =

in
ax
+ T hrTMAR
T hrTMAR
,
2 · T AR

(13)

in
ax
where T hrTMAR
and T hrTMAR
are the min and max throughput
achievable under the current TAR (by adjusting BCP). When MU
is absent, DegM U → 1. As MU intensifies, DegM U decreases.
If DegM U < Θ, global scoring is enabled; otherwise, scoring is
limited to the current TAR.
Overall, in the scoring stage, the optimization principle aims
for the highest possible throughput while achieving lower latency, achieving a more efficient BPO than existing methods,
and controlling the optimization overhead.

C. Dynamic Adjustment of Optimal TAR and BCP
In the previous part, based on the designed global BPO scoring
mechanism, the optimal TAR and BCP can be calculated. In this
subsection, we introduce the designed dynamic adjustment module of TAR and BCP, which ultimately achieves the improvement
of BPO effectiveness.
The designed adjustment module is shown in Fig. 5, which
consists of the following three component.

Fig. 5.

The designed adjustment module of TAR and BCP for BPO.

1) Submission Transaction Pool: When a batch transaction is
submitted from a client to a blockchain system, the transaction
will be stored uniformly in the submission transaction pool,
and the nodes will sort and validate the transactions in it. To
effectively adjust the number of entered transactions and thus
ultimately achieve BPO, transactions in the submission transaction pool will not be directly packaged and processed. In short,
this module is only responsible for staging received transactions.
2) Adjustment Module: Based on the optimal TAR and BCP
derived from the previously completed performance scoring, this
module will accomplish the adjustment of TAR and BCP. For
example, when the optimal TAR is 50 TPS, and the optimal BCP
is 50 BS, this module will send the first 50 transactions from the
submission transaction pool to the transaction pool and complete
the BCP adjustment.
3) Processing Transaction Pool: This component is essentially the original transaction pool within the blockchain, and
which will process the received transactions so that the node
performs block packing and validation.
The adjustment frequency of TAR and BCP also needs to be
controlled to reduce the system overhead caused by adjustments
and to ensure BPO effectiveness. Based on the volume of the
submission transaction pool V olSub , we design two adjustment
strategies. First, when V olSub is greater than or equal to the
optimal TAR, the adjustment frequency of TAR will be fixed
because the optimal TAR is to be entered into the processing
transaction pool to maintain optimal blockchain performance.
In opposite, when V olSub is less than the optimal TAR, all the
transactions in the submission transaction pool are submitted to
the processing transaction pool.
Further, a common situation needs to be considered. When the
optimal TAR is large, the blockchain system may not confirm
all submitted transactions within a given time unit, and some
transactions will remain unprocessed. Therefore, this module
will send unprocessed transactions back to the submission transaction pool to await subsequent processing, thus guaranteeing
the stability of the processing transaction pool and enabling
accurate and efficient BPO.
In summary, we introduce the submission transaction pool to
temporarily store the received transactions and get the optimal
TAR and BCP through performance scoring, which completes
the adjustment of TAR and BCP, and finally realizes BPO with
low optimization overhead.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 9

WANG et al.: BPO-CBS: A DATA-DRIVEN BLOCKCHAIN PERFORMANCE OPTIMIZATION FRAMEWORK FOR CBS

957

TABLE IV
THE COMPARISON OF THREE
√ OPEN-SOURCE BLOCKCHAIN PERFORMANCE
DATASETS ( : COVERED; ×: UNCOVERED)

Fig. 6.

The deployment of nodes and blockchain network.

V. IMPLEMENTATION
In this section, the detailed collection process of MMBPD and
the prototype deployment process of BPO-CBS are presented.
A. Blockchain Configuration
To ensure the data collection quality and representativeness
of MMBPD and to deploy a prototype system to validate the
performance of BPO-CBS, we set up an HLF-based blockchain
environment. We collectively deploy nodes (e.g., servers and
PC) into the same geographic location to facilitate node management and migration. In this scenario, communication latency
between nodes is very low level.
The network configuration is shown in Fig. 6. We use HLF
2.5, set up three organizations, each with one Peer node, use one
Orderer node in total, and the endorsement policy is “OR”.
B. Collection Process of MMBPD
To the best of our knowledge, two blockchain performance
datasets, BPD-1 [37] and HFBTP [38], have been open-sourced
at this stage, both of which are based on HLF and collected using
Hyperledger Caliper.6 However, even though these two datasets
have large data sizes and rich data features, they are both based
on data collected in a single-machine environment. Thus, they
do not consider the communication latency between nodes in
real blockchain scenarios. In addition, performance data on the
consumption of computational resources is not provided in these
two datasets.
Therefore, we fully consider these factors during the MMBPD
collection process. We use batch scripts to dynamically modify
the parameter values of HLF’s configuration files regarding
TAR and BCP to accomplish blockchain performance testing
and ultimately collect MMBPD under different TAR and BCP.
A comparison of the features of the three datasets is shown
in Table IV, which demonstrates the value and necessity of
MMBPD, and it can be used in future research.
C. The Prototype Deployment of BPO-CBS
To verify the performance of BPO-CBS in real scenarios in
Section VI, we develop and deploy a prototype of BPO-CBS.
6 https://github.com/hyperledger-caliper/

The detailed evaluation process for BPO-CBS is described below. First, based on each blockchain performance dataset, we
respectively train the corresponding prediction model in advance
and pre-store the potential prediction results. Thereafter, we
select a node with the smallest workload to complete the performance scoring. Next, in actual distributed CBS deployments,
the designed “Submission Transaction Pool” is implemented
as a highly available cloud service. Towards HLF, we achieve
this through a distributed service software development kit
(SDK) that interacts with all blockchain clients. This SDK
centrally collects transaction submission requests and performs
global TAR control based on the optimal TAR calculated by
the optimization module. This design ensures the precision of
global TAR control while inherently possessing resilience and
fault tolerance as a cloud service. It also does not impact the
decentralized consensus process of the underlying blockchain
network. Finally, the BCP adjustment is achieved by modifying
the configuration files of HLF, thereby realizing BPO.
VI. EXPERIMENTAL EVALUATION AND ANALYSIS
In this section, we design multi-group experiments to verify
and analyze the performance and effectiveness of BPO-CBS, and
the quantitative comparisons are also made with related work.
We use a workstation (64-bit Intel Core i9-12900 K 3.2 GHz,
128 GB RAM, and Windows 11 operation system) for the
training and inference of the blockchain performance prediction
model, and the rest is based on the previously described deployment environment. MMBPD and source code (Python-based)
for this paper are available on GitHub.7
7 https://github.com/JishuWang/BPO-CBS

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 10

958

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

A. Experimental Setup
1) Experimental Design: We design the following three experiments to fully validate the performance of BPO-CBS.
Prediction Accuracy: The accuracy of blockchain prediction models will significantly affect BPO effectiveness. The
commonly used mean absolute error (MAE), mean absolute
percentage error (MAPE), and root mean square error (RMSE)
are used as evaluation metrics.
BPO Effectiveness: We use transaction throughput and latency
to validate the effectiveness of BPO-CBS and its enhancement
over the SOTA approach.
Optimization Overhead: Ensuring low optimization overhead
while achieving effective BPO will further enhance the feasibility and scalability of BPO-CBS in real-world scenarios. The
training and inference duration of the blockchain performance
prediction model, the computational overhead of the scoring
module, and the computational overhead of the dynamic adjustment mechanism will be used to evaluate the optimization
overhead of the BPO-CBS.
2) Datasets: In the first experiment, to fully validate the accuracy and generalization of the blockchain performance prediction model, we use three open-source blockchain performance
datasets (BPD-1, HFBTP, and MMBPD) for model training and
prediction. In the BPO effectiveness experiments, we first use
BPD-1 and HFBTP for simulation validation, followed by actual
validation using MMBPD in the deployment environment. In the
optimization overhead experiments, we use only the MMBPD
dataset, thereby verifying the computational overhead of key
modules in BPO-CBS in real deployment environments.
3) Comparison Baselines: In the first experiment, we choose
two SOTA methods8 (BPR [28] and LearningChain [29])
for comparison and complement them with several classical
machine learning methods: LinearRegression (LR), AdaBoostRegressor (ABR), DecisionTreeRegressor (DTR), KNeighborsRegressor (KNR), GradientBoostRegressor (GBR), BaggingRegressor (BR), RandomForestRegressor (RFR), ExtraTreesRegressor (ETR), and LightGBMRegressor (LGBMR).
For the remaining experiments, we choose not only BPR
[28] and LearningChain [29] as baselines, but also two randomly
selected fixed BCP (with BS of 60 and 200, respectively) for
comparison.
B. Accuracy of Blockchain Performance Prediction Models
In this experiment, since the accuracy of the blockchain
performance prediction model will critically impact BPO effectiveness, we verify the accuracy of the proposed model and
compare it with existing methods. For throughput, it increases
with the rise in TAR until the MU starts to appear. In contrast,
for latency, its variations are relatively more fluctuating and
exhibit no evident patterns related to TAR. Given these differences, and by comprehensively evaluating the performance
of various models on both tasks, we ultimately select GBR,
RFR, ETR, and LGBMR as the base models for throughput
8 They included the blockchain performance prediction module and achieved
BPO by adjusting BCP based on real-time TAR, thus can be used to make fair
and valid comparisons (cf. Section II).

and latency prediction. Specifically, to ensure the fairness of
experiments, BPO-CBS adopts the same experimental setup as
LearningChain [29]. We perform the following key settings:
learning rate set to 0.001, the batch size to 32, estimators count
in each base model set to 500, early stopping strategy enabled,
random seed set to 42, five-fold cross-validation, and mean
squared error as the loss function for model training with all
remaining parameters default.
The experimental results, as shown in Table V, show that
BPO-CBS achieves lower errors than the existing methods on
most results for the throughput and latency prediction tasks
because the chosen base model in BPO-CBS can effectively
capture the data distribution and thus improve the model
accuracy.
For the throughput task, a low prediction error is achieved
on all datasets due to their significant correlation with the TAR.
As for latency, in BPD-1 and HFBTP datasets, the blockchain
performance is collected based on a single-machine environment, where the latency mainly depends on the computational
capacity and performance bottleneck of the device, with fewer
influencing factors, and thus, it is easy to train models with
high accuracy. Meanwhile, in the MMBPD dataset, since the
performance is collected in a multi-machine environment, there
is network latency; the trained latency prediction model also
achieves high accuracy. Since the throughput is taken and fluctuates more compared to the latency, it exhibits greater values
in the MAE and RMSE metrics.
C. BPO Effectiveness
In this experiment, we fully verify the BPO effect of different
methods, thus demonstrating the effectiveness of BPO-CBS.
To fully validate the effectiveness of the proposed method in
CBS scenarios, we assume that the network quality and computational capabilities of nodes in the experimental environment remain stable, thereby avoiding network fluctuations and
node failures. Since there are certain blockchain performance
prediction errors in different methods, we compare the actual
performance (instead of predicting performance) corresponding to the selected optimal BCP by each method (the optimal
TAR is also included in BPO-CBS), to ensure the fairness
and validity of the experimental results. To fully evaluate the
BPO effectiveness of BPO-CBS, we set up and adopt the
three primary optimization strategies mentioned earlier (cf. Section IV-B). We conduct experiments under two TAR patterns
(incremental and fluctuating). For incremental TAR, we send
transactions with gradually increasing TAR [10-180, 5], and
the performance data is contained in pre-stored performance
results. For fluctuating TAR, their corresponding performance
data can be obtained either pre-prediction and storage, or instantaneous prediction. We jointly evaluate the effectiveness
of BPO-CBS using both simulation validation and deployment
validation.
1) Simulation Validation: To fully evaluate the effectiveness
of BPO-CBS, we conduct experiments on BPD-1 and HFBTP
as well. However, since the collection environment of BPD-1
and HFBTP is different from that of MMBPD, the performance
data in each dataset shows inconsistent distribution and pattern.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 11

WANG et al.: BPO-CBS: A DATA-DRIVEN BLOCKCHAIN PERFORMANCE OPTIMIZATION FRAMEWORK FOR CBS

959

TABLE V
THE PREDICTION PERFORMANCE OF DIFFERENT METHODS WITH THREE BLOCKCHAIN PERFORMANCE DATASETS

The blockchain performance prediction models trained based
on BPD-1 and HFBTP cannot be directly used for BPO in the
MMBPD collection environment (there may be relatively obvious differences between the predicted and actual performance).
Therefore, we adopt a simulation validation approach for the
evaluation, i.e., predicting and scoring based directly on the
performance data in BPD-1 and HFBTP, with the dynamic adjustment module being treated as auto-complete, and ultimately
evaluating the performance it corresponds to.
Incremental TAR: In this evaluation mode, we only use incremental TAR for these experiments (since the actual performance
of dynamic TAR under these two datasets is not obtained). The
experimental results are shown in Fig. 7 and Table VI. When
throughput is the primary optimization objective, BPO-CBS
achieves an improvement of 0.204% to 19.52% compared to
the baselines. Since TAR significantly affects throughput, using
real-time TAR as the optimization baseline achieves optimal
throughput when MU is not obvious. When the MU starts
to appear (e.g., Fig. 7(a), real-time TAR is 125 to 160 TPS),
BPO-CBS achieves better throughput by turning on the global
performance scoring, using the optimal TAR as the optimization
benchmark, and finding the optimal BCP. And when latency is
the main optimization objective, BPO-CBS achieves a significant improvement (from 8.097% to 90.79%) due to the fact that
global performance scoring will be turned on the whole time to
achieve the lowest latency at this point.
It is worth noting that when balanced optimization is used,
experiments on BPD-1 show that BPO-CBS sacrifices a small
amount of throughput (from −1.430% to −7.832%) for a huge
reduction in latency (from 73.68% to 86.17%). In contrast,
experiments on HFBTP achieve simultaneous optimization of

TABLE VI
BPO EFFECTIVENESS (% REPRESENTS THE IMPROVEMENT RATIO OF OUR
RESULT COMPARED TO THE BASELINE) ON BPD-1 AND HFBTP

both metrics. In the next experiment, in combination with
MMBPD, by enhancing the realism of the evaluation, we will
verify the effectiveness and feasibility of BPO-CBS in a real
deployment environment.
2) Deployment Validation: As described in Section V,
based on the collection environment of MMBPD, we deploy BPO-CBS in the same environment to verify its actual
performance.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 12

960

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

Fig. 7.

The BPO effectiveness of BPO-CBS with three optimization strategies. (a)–(c) BPD-1 (d)–(f) HFBTP.

Fig. 8.

The BPO effectiveness of BPO-CBS with three optimization strategies on MMBPD. (a)–(c) Incremental TAR (d)–(f) Fluctuating TAR.

Incremental TAR: The experimental results are shown in
Fig. 8(a)–(c) and Table VIII. Under different optimization
strategies, both BPO-CBS achieve the throughput improvement
(from 3.03% to 18.9%) compared to these baselines, and the
improvement for latency is more significant (from 21.8% to
81.0%). When throughput-first is adopted as the optimization

strategy (Fig. 8(a)), BPO-CBS achieves the highest throughput
with different TAR.
On the other hand, BPO-CBS also consistently achieves
very low latency when latency-first is the adopted optimization strategy (Fig. 8(b)). In BPR [28] and LearningChain [29],
since real-time TAR is used as the optimization benchmark, the

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 13

WANG et al.: BPO-CBS: A DATA-DRIVEN BLOCKCHAIN PERFORMANCE OPTIMIZATION FRAMEWORK FOR CBS

TABLE VII
THE DESCRIPTION OF THE USED DATA ON TARP DATASET

TABLE VIII
BPO EFFECTIVENESS (% REPRESENTS THE IMPROVEMENT RATIO OF OUR
RESULT COMPARED TO THE BASELINE) ON MMBPD

optimization space for latency is relatively limited, and it is
difficult to reduce the latency small enough value even if a more
suitable BCP is chosen for adjusting. BPO-CBS can select the
optimal TAR and BCP and adjust them to achieve the lowest
latency.
We also conduct experiments for the balanced optimization strategy. (Fig. 8(c)). The experimental results show that
BPO-CBS improves the throughput and reduces the latency
significantly compared to the existing methods. We believe that
reasonably setting the optimization weights to optimize both
throughput and latency can achieve more effective BPO. This
is because this case avoids high latency due to the over-pursuit
of throughput and low throughput due to the over-pursuit of
latency.
Fluctuating TAR: Since BPR [28] and LearningChain [29]
all have an additional TAR prediction stage, this also affects the
effectiveness of BPO. That is, they use the predicted TAR as
a benchmark for optimization and thus select and adjust BCP
to achieve BPO, but there is a difference between the predicted
TAR and the real-time TAR, which leads to the selected BCP
not being optimal. More importantly, TAR in blockchain systems
tends to fluctuate, with additional features such as high and low
peak periods in the parking scenario. Therefore, we also fully
validate the actual optimization performance of each method in
fluctuating TAR scenarios, thus demonstrating that BPO-CBS
with a reduced error stage can effectively improve the BPO effect
for parking scenarios with fluctuating TAR.

961

We choose a blockchain TAR dataset TARP [39] for this
experiment, which was constructed based on real-world taxi
requests, and it was used to train a TAR prediction model
in BPR [28] and LearningChain [29]. We select 20 of these
consecutive TAR data for this experiment, and the descriptions
of the used data are shown in Table VII.
The experimental results are shown in Fig. 8(d)–(f) and
Table VIII. Similar to the results of the previously conducted experiments based on the performance of BPO under incremental
TAR, in this experiment, under all three optimization strategies,
BPO-CBS achieves higher throughput and lower latency. Both
BPO-CBS achieve the throughput improvement (from 2.98%
to 24.1%) compared to these baselines, and the improvement
for latency is more significant (from 0.10% to 72.7%).
Selective TAR: Furthermore, we select seven representative
TARs (10, 30, 50, 75, 100, 120, and 150 to simulate the different
transaction traffic) to evaluate the robustness of the experimental
results, with each set of experiments independently repeated
20 times. We record the throughput and latency for each run.
For each TAR, we calculate the mean, standard deviation, and
variance after 20 experimental runs. The experimental results
are shown in Table IX, BPO-CBS consistently outperforms or
matches SOTA methods under three optimization strategies.
This set of experiments further demonstrates the robustness and
stability of BPO-CBS in BPO. Identical performance indicates
that these methods adjust the same BCP. Several observations
emerge. First, when real-time TAR is 10 TPS, throughput optimization yields limited gains, whereas latency optimization
delivers more significant benefits. In addition, as real-time TAR
increases, BPO-CBS consistently achieves superior throughput
and latency.
These experimental results demonstrate that BPO-CBS effectively mitigates the impact of MU, thereby achieving more
efficient BPO than existing methods. The framework’s effectiveness is consistent across scenarios with different performance
data features, as evidenced by its accurate performance on all
three blockchain datasets. This robustness stems from three key
improvements in our design. First, a more accurate blockchain
performance prediction model allows the predicted performance
to be close to the actual performance, thus providing a basis for
accurate performance scoring. Second, BPO-CBS determines
the degree of MU and decides the range of performance scores
based on different optimization strategies, thereby effectively
reducing the impact of MU on the BPO process and improving
the BPO effectiveness. Finally, the designed adjustment module effectively accomplishes the adjustment of TAR and BCP,
thereby achieving BPO.
D. Optimization Overhead
In this subsection, we validate the optimization overhead of
BPO-CBS, thus showing that BPO-CBS achieves accurate and
efficient BPO while its optimization overhead is acceptable.
1) Time for Model Training and Inference: We first validate the time cost of the model in the training and inference
process. Since the time the model spends in the training and
inference process mainly depends on the number of samples

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 14

962

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

TABLE IX
BPO EFFECTIVENESS AND ROBUSTNESS (SELECTIVE TAR) ON MMBPD, MEAN ± STANDARD DEVIATION (VARIANCE)

input, we evaluate the training and inference overhead by taking
the average training time per epoch (0.326 s) and the average
inference time per sample (0.028 s). In the model training
and inference sessions, the size of the input samples significantly affects the time. It also leads to an increase in the
training time due to the base models (e.g., RFR) introduced
by BPO-CBS to achieve high accuracy through a complex
search space. In summary, the time overhead required for the
introduction of the integrated learning approach is acceptable
and limited due to the introduction of an online learning mechanism to micro-update the model and pre-store the prediction
results, thus avoiding frequent training and inference of the
model.
2) Computational Cost of the Scoring Module: The computational overhead of the scoring module depends largely on the
size of the scoring. Based on the data range of MMBPD (TAR
from 10-200, BS from 10-400, both with a step size of 5), we
perform 10 experiments and take the average duration. When
global scoring is enabled, the scoring duration is 0.025 s, the
opposite is 0.002 s, and the impact is minimal for the system.
3) Computational Cost of the Dynamic Adjustment Module:
We observe the adjustment frequency of BPO-CBS under three

optimization strategies. As an example, the observation results
are shown in Fig. 9. When throughput-first is adopted, based
on the proposed adjustment strategy, full submission is mainly
adopted, and BPO is achieved by adjusting BCP. When latencyfirst is adopted, the adjustment situation is relatively stable. For
example, when real-time TAR is from 90 TPS to 175 TPS, the
optimal TAR is calculated to be 90 TPS and the BS is adjusted
to 15. This occurs because this configuration corresponds to
an optimal latency performance point. Below this point, system
resources are underutilized; Above this point, blockchain latency
constraints are triggered, such as sorting queue backlogs, causing end-to-end latency to increase. That is, when the real-time
TAR exceeds 90 TPS, regardless of how the BCP is adjusted, the
corresponding latency cannot be reduced below the lower level.
Through the designed global scoring performance mechanism,
the optimization framework successfully locates this point and
completes adjustments to both TAR and BCP, thereby achieving
the current minimum latency. Based on the proposed adjustment
strategy, fixed adjustment is used in this cycle. One noteworthy
point is that when latency-first is used, the adjustment remains
stable with the real-time change of TAR, which indicates that it
is always adjusted in a fixed adjustment mode, and the lower

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 15

WANG et al.: BPO-CBS: A DATA-DRIVEN BLOCKCHAIN PERFORMANCE OPTIMIZATION FRAMEWORK FOR CBS

Fig. 9.

963

The adjustment situation of TAR and BCP with three optimization strategies. (a)–(c) Incremental TAR (d)–(f) Fluctuating TAR.

frequency of adjustment reduces the extra system overhead
caused by adjustment.
Overall, BPO-CBS does not need to make frequent performance predictions, scores, and adjustments, thus controlling the
optimization overhead while ensuring the optimization effectiveness.
E. System Analysis and Discussion
1) Applicability: The most suitable type of blockchain for
BPO-CBS is the consortium blockchain, because the consortium
blockchain has a small scale of nodes and the nodes have
features such as trusted access, sufficient computing power,
and a stable network environment. In this case, BPO-CBS can
quickly adjust TAR and BCP to achieve effective BPO. On the
other hand, for public blockchains (e.g., Bitcoin and Ethereum),
BPO-CBS also has some applicability. However, direct application faces fundamental challenges rooted in the permissionless
nature of these systems. First, there is no central coordinator
to enforce an optimal TAR across the network. Implementing
TAR throttling would require innovative, incentive-compatible
mechanisms, potentially enacted through smart contracts or at
the client/relayer level, ensuring no single entity gains undue
advantage. In addition, the performance of a public network is
dictated by its slowest consensus participants. Our performance
prediction models would need to be significantly enhanced
to account for highly variable node hardware, global network
latency, and diverse client software implementations. Despite
these challenges, BPO-CBS provides a foundational step (i.e.,
model training and predicting, performance scoring, TAR and
BCP adjustment).
2) Scalability: BPO-CBS is designed for the features (highfrequency and huge, dynamic and fluctuating transaction traffic)

of the CBS scenarios. Therefore, BPO-CBS can be extended to
many scenarios with similar transaction features. For example,
in the energy trading scenario, there are peaks and lows in
the transaction traffic, which have a dynamic and fluctuating
pattern throughout the day. Furthermore, in these scenarios,
BPO-CBS can be effectively scaled due to the computational
devices being capable of relatively strong computational power
and possessing stable communication networks. Additionally,
BPO-CBS maintains a certain level of applicability even in
complex environments (e.g., multi-cloud or hybrid environments). First, the monitoring modules can achieve resource
monitoring (e.g., network latency) and management in complex environments through further integration with hybrid-cloud
management tools such as Azure Arc and Azure Monitor. Next,
the prediction module possesses online update capabilities,
enabling it to learn these metrics (e.g., network latency) as
features. This allows BPO-CBS to adapt to complex environments and perform efficient BPO. However, it is important to
note that in this environment, optimization strategies must be
carefully balanced to avoid frequent adjustments to TAR and
BCP, thereby reducing the additional overhead of optimization
methods and minimizing their impact on multi-cloud systems.
On the other hand, at the methodological level, the optimization
foundation of BPO-CBS relies on performance datasets. For
different blockchain platforms, BPO-CBS can be applied by
simply providing a sufficiently scaled blockchain performance
dataset. Compared to existing non-learning static optimization
methods (e.g., Ethereum-oriented [23]), it offers greater scalability because its optimization approach does not depend on the
underlying architecture of the blockchain. Static analysis methods depend on specific blockchain architectures and technical
details. When blockchain platforms change, the scalability of
such methods becomes limited because they require reanalysis.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 16

964

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

3) Optimization Strategies: Through detailed BPO effectiveness experiments, we get some key observations for the setting
of the optimization strategy when the optimization based on
BCP adjustment is used. First, when the TAR is small (e.g.,
Fig. 8(a)–(b), 10-30 TPS), the impact of BCP adjustment on
throughput is slight, but the impact on latency is obvious. Therefore, latency should be the main optimization objective at this
point. Second, as the TAR grows, adjusting BCP has a significant
impact on both throughput and latency (e.g., Fig. 8(a)–(b),
30-180 TPS), and then the optimization strategy should be set
in conjunction with the performance requirements of specific
scenarios. Finally, while adopting global performance scoring
effectively mitigates the impact of MU and discovers superior
TAR and BCP combinations by broadening the search space, it
necessitates a careful trade-off between the optimization gain
and the associated adjustment overhead.
4) Security and Stability: In BPO-CBS, the primary factors
that may impact system security and stability lie in dynamically
adjusting TAR and BCP. First, when TAR is small, adjusting
BCP alone can achieve effective BPO. Therefore, TAR control
primarily occurs during high transaction traffic periods. Frequent control of TAR may cause the “Submission Transaction
Pool” to temporarily store a large number of transactions. This
can be mitigated by setting a lower control limit (e.g., when
real-time TAR reaches 200 TPS, TAR is maintained at no
less than 150 TPS) or using real-time TAR as an optimization
benchmark. Regarding BCP adjustments, when BS is large, it
may increase block propagation time, but this can be mitigated
by setting a BS threshold. Since BPO-CBS targets network
stability and computationally efficient cloud environments, and
the optimization overhead is tiny, adjusting TAR and BCP has
an acceptable impact on the system.
F. Limitations and Future Work
Although BPO-CBS demonstrates superior performance, it
still has some limitations. Since BPO-CBS is designed for CBS
scenarios with stable network and computational environments,
its applicability may be compromised when significant network
fluctuations or changes in node computational capacity suddenly
occur within the CBS. The primary limitations and potential
future work are discussed below.
1) Dependency on Historical Performance Data: The BPO
effectiveness of BPO-CBS relies on the quality and representativeness of the blockchain performance dataset. When the CBS
environment undergoes significant changes (e.g., the number
of nodes or computational resources), the sudden blockchain
performance fluctuations may prevent trained models from
adapting quickly. Therefore, how to quickly discern whether
such fluctuations are temporary or long-term will significantly
impact the model’s training strategy. First, introducing a timeseries forecasting model can help detect trends in TAR changes,
enabling proactive optimization decisions. Furthermore, prior
experiments have validated that the accuracy of blockchain
performance prediction models substantially influences actual
BPO outcomes. Consequently, further aggregating BCP analysis
can enhance the accuracy of blockchain performance prediction

models. Finally, in CBS scenarios, beyond blockchain platforms
like HLF, other widely adopted blockchains such as FISCO
BCOS exist. Consequently, collecting performance data across
broader blockchain platforms and more complex network environments will substantially impact performance evaluation and
optimization.
2) Assumption of Stable Cloud Environment: BPO-CBS assumes relatively stable network conditions and node availability
within the CBS. Significant fluctuations in cloud resource performance or network latency could impact optimization decisions.
Because of the numerous factors affecting the performance of
the blockchain, it is important to not only fully investigate
the various levels of BPO methods but also to aggregate the
various types of BPO methods further. Studying the existence
of MU in BPO and aggregating BPO-CBS with other BPO
methods, such as sharding [19], [40], and consensus mechanisms [21], [41]. Specifically, BPO-CBS primarily optimizes at
the transaction load and configurable parameter levels. When
system performance bottlenecks are rooted in the consensus
protocol itself, the optimization effectiveness of BPO-CBS will
be constrained by the theoretical performance ceiling of that
consensus protocol. However, we believe this is not a limitation
of BPO-CBS, as it demonstrates its adaptability to diverse consensus protocols. Even if the underlying consensus protocol is
further optimized, performance bottlenecks (specifically MU)
may still emerge at a certain TAR threshold, but BPO-CBS
remains applicable in such scenarios. Therefore, the proposed
framework and consensus/sharding research are complementary
rather than mutually exclusive. In future work, we will integrate
BPO-CBS with consensus and sharding efforts to construct a
cross-layer, comprehensive performance optimization system,
thereby further enhancing optimization outcomes and stability.
3) Unstable Optimization Overhead: Due to the designed adjustment module in BPO-CBS, the TAR input to the blockchain
system can be effectively controlled, which improves the BPO
effectiveness. However, it is worth noting that this approach uses
instantaneous control for the TAR due to the inability to know the
TAR at future moments. The control frequency will be relatively
fixed when the TAR is higher than the blockchain system,
and can be processed. However, the control frequency will be
relatively frequent when the TAR is high or low. Therefore,
many mainstream temporal prediction models [28], [29] can be
aggregated with BPO-CBS to control the adjustment frequency
for TAR, thus reduce the optimization overhead.
VII. CONCLUSION
In a cloud computing-based CBS, transactions have the features of high frequency and large quantity, dynamic fluctuation,
which leads to a performance bottleneck of the blockchain.
In addition, we find that in the existing BPO approach based
on BCP adjustment, the optimization benchmark will severely
impact the BPO effectiveness. Therefore, to optimize the performance of blockchain in CBS scenarios (e.g., cloud storage and
audit), we propose a data-driven BPO framework (called BPOCBS), which includes three key modules (blockchain performance prediction, global BPO scoring mechanism, and dynamic

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 17

WANG et al.: BPO-CBS: A DATA-DRIVEN BLOCKCHAIN PERFORMANCE OPTIMIZATION FRAMEWORK FOR CBS

adjustment of optimal TAR and BCP). Through the designed
three key modules, it is shown under sufficient experimental
validation that BPO-CBS achieves a more efficient BPO effectiveness than the SOTA method, and it not only has a low
optimization overhead but also can be extended to many CBS
scenarios with similar transaction features.
ACKNOWLEDGMENTS
The authors would like to express their utmost appreciation
to the anonymous reviewers for their invaluable and insightful
comments, which have significantly improved the quality of this
article. They also thank the Editor-in-Chief, Associate Editor,
and all potential participants for their valuable contributions to
advancing the article review process.
REFERENCES
[1] T. Zhang, F. Jia, and L. Chen, “Blockchain adoption in enabling disruptive
supply chain finance innovation: Toward a research agenda,” IEEE Trans.
Eng. Manage., vol. 72, pp. 1519–1531, 2025.
[2] J. Wang, R. Zhu, T. Li, F. Gao, Q. Wang, and Q. Xiao, “ETC-oriented
efficient and secure blockchain: Credit-based mechanism and evidence
framework for vehicle management,” IEEE Trans. Veh. Technol., vol. 70,
no. 11, pp. 11324–11337, Nov. 2021.
[3] T. Mai, H. Yao, N. Zhang, L. Xu, M. Guizani, and S. Guo, “Cloud mining
pool aided blockchain-enabled Internet of Things: An evolutionary game
approach,” IEEE Trans. Cloud Comput., vol. 11, no. 1, pp. 692–703,
Jan.–Mar. 2023.
[4] S. Misra, A. Chakraborty, A. Mondal, and D. Kamath, “Consortium
blockchain-based federated sensor-cloud for IoT services,” IEEE Trans.
Cloud Comput., vol. 13, no. 2, pp. 605–616, Apr.–Jun. 2025.
[5] Q. Lyu al., “A2UA: An auditable anonymous user authentication protocol
based on blockchain for cloud services,” IEEE Trans. Cloud Comput., vol.
11, no. 3, pp. 2546–2561, Jul.–Sep. 2023.
[6] Y. Zhang, C. Xu, J. Ni, H. Li, and X. S. Shen, “Blockchain-assisted publickey encryption with keyword search against keyword guessing attacks for
cloud storage,” IEEE Trans. Cloud Comput., vol. 9, no. 4, pp. 1335–1348,
Oct.–Dec. 2021.
[7] W. Liu, Y. Han, G. Wang, Y. Huang, A. Dong, and J. Yu, “Breaking
IoT data silos: Trustworthy data trading with consortium blockchain and
zero-knowledge proof,” in Proc. IEEE 28th Int. Conf. Comput. Supported
Cooperative Work Des., Compiegne, France, 2025, pp. 1531–1536.
[8] Y. Wei, K. Gai, J. Yu, L. Zhu, and K. R. Choo, “Trustworthy access control
for multiaccess edge computing in blockchain-assisted 6G systems,” IEEE
Trans. Ind. Informat., vol. 20, no. 5, pp. 7732–7743, May 2024.
[9] M. Zhang, J. Cao, Y. Sahni, Q. Chen, S. Jiang, and L. Yang, “Blockchainbased collaborative edge intelligence for trustworthy and real-time video
surveillance,” IEEE Trans. Ind. Informat., vol. 19, no. 2, pp. 1623–1633,
Feb. 2023.
[10] Y. Miao, K. Gai, L. Zhu, K. R. Choo, and J. Vaidya, “Blockchain-based
shared data integrity auditing and deduplication,” IEEE Trans. Dependable
Secure Comput., vol. 21, no. 4, pp. 3688–3703, Jul./Aug. 2024.
[11] J. Shu, X. Zou, X. Jia, W. Zhang, and R. Xie, “Blockchain-based decentralized public auditing for cloud storage,” IEEE Trans. Cloud Comput.,
vol. 10, no. 4, pp. 2366–2380, Oct.–Dec. 2022.
[12] X. Feng, S. Zhang, T. Jiao, C. Guo, and J. Song, “Adaptive container
auto-scaling for fluctuating workloads in cloud,” Future Gener. Comput.
Syst., vol. 172, 2025, Art. no. 107872.
[13] G. Quattrocchi, E. Incerto, R. Pinciroli, C. Trubiani, and L. Baresi,
“Autoscaling solutions for cloud applications under dynamic workloads,”
IEEE Trans. Serv. Comput., vol. 17, no. 3, pp. 804–820, May/Jun. 2024.
[14] J. A. Alzubi, O. A. Alzubi, A. Singh, and M. Ramachandran, “Cloud-IIoTbased electronic health record privacy-preserving by CNN and blockchainenabled federated learning,” IEEE Trans. Ind. Inform., vol. 19, no. 1, pp.
1080–1087, Jan. 2023.
[15] T. Hewa, A. Braeken, M. Liyanage, and M. Ylianttila, “Fog computing
and blockchain-based security service architecture for 5G industrial IoTenabled cloud manufacturing,” IEEE Trans. Ind. Inform., vol. 18, no. 10,
pp. 7174–7185, Oct. 2022.

965

[16] M. Xu, S. Liu, D. Yu, X. Cheng, S. Guo, and J. Yu, “CloudChain: A cloud
blockchain using shared memory consensus and RDMA,” IEEE Trans.
Comput., vol. 71, no. 12, pp. 3242–3253, Dec. 2022.
[17] G. A. F. Rebello al., “A survey on blockchain scalability: From hardware
to layer-two protocols,” IEEE Commun. Surveys Tuts., vol. 26, no. 4, pp.
2411–2458, 4th Quart., 2024.
[18] S. Nakamoto, “Bitcoin: A peer-to-peer electronic cash system,” Decentralized Bus. Rev., 2008.
[19] P. Soltani and F. Ashtiani, “Analytical modeling and throughput computation of blockchain sharding,” IEEE Trans. Parallel Distrib. Syst., vol. 35,
no. 6, pp. 828–842, Jun. 2024.
[20] M. Zhang, J. Li, Z. Chen, H. Chen, and X. Deng, “An efficient and
robust committee structure for sharding blockchain,” IEEE Trans. Cloud
Comput., vol. 11, no. 3, pp. 2562–2574, Jul.–Sep. 2023.
[21] H. Guo, W. Li, and M. M. Nejad, “A hierarchical and location-aware
consensus protocol for IoT-blockchain applications,” IEEE Trans. Netw.
Serv. Manag., vol. 19, no. 3, pp. 2972–2986, Sep. 2022.
[22] Y. Chen, Y. Zhang, Y. Zhuang, K. Miao, S. Pouriyeh, and M. Han,
“Efficient and secure blockchain consensus algorithm for heterogeneous
industrial Internet of Things nodes based on double-DAG,” IEEE Trans.
Ind. Informat., vol. 20, no. 4, pp. 6300–6312, Apr. 2024.
[23] F. Wilhelmi, S. Barrachina-Muñoz, and P. Dini, “End-to-end latency
analysis and optimal block size of proof-of-work blockchain applications,”
IEEE Commun. Lett., vol. 26, no. 10, pp. 2332–2335, Oct. 2022.
[24] S. Lee, M. Kim, J. Lee, R. Hsu, M. Kim, and T. Q. S. Quek, “Facing to
latency of hyperledger fabric for blockchain-enabled IoT: Modeling and
analysis,” IEEE Netw., vol. 37, no. 6, pp. 232–239, Nov. 2023.
[25] M. Liu, F. R. Yu, Y. Teng, V. C. M. Leung, and M. Song, “Performance
optimization for blockchain-enabled Industrial Internet of Things (IIoT)
systems: A deep reinforcement learning approach,” IEEE Trans. Ind.
Informat., vol. 15, no. 6, pp. 3559–3570, Jun. 2019.
[26] R. Tapwal, S. Misra, and S. K. Pal, “PerBlocks: A reconfigurable
blockchain for service provisioning in industrial environment,” IEEE
Trans. Ind. Inform., vol. 20, no. 1, pp. 911–918, Jan. 2024.
[27] M. An al., “RLChain: A DRL approach for blockchain performance
optimization toward IIoT,” IEEE Trans. Netw. Service Manag., vol. 22,
no. 2, pp. 1629–1645, Apr. 2025.
[28] J. Wang al., “BPR: Blockchain-enabled efficient and secure parking
reservation framework with block size dynamic adjustment method,” IEEE
Trans. Intell. Transp. Syst., vol. 24, no. 3, pp. 3555–3570, Mar. 2023.
[29] J. Wang al., “LearningChain: A highly scalable and applicable learningbased blockchain performance optimization framework,” IEEE Trans.
Netw. Service Manag., vol. 21, no. 2, pp. 1817–1831, Apr. 2024.
[30] P. Thakkar, S. Nathan, and B. Viswanathan, “Performance benchmarking
and optimizing hyperledger fabric blockchain platform,” in Proc. 26th
IEEE Int. Symp. Modeling, Anal., Simul. Comput. Telecommun. Syst.,
Milwaukee, WI, USA, Sep. 2018, pp. 264–276.
[31] R. Layard, G. Mayraz, and S. Nickell, “The marginal utility of income,”
J. Public Econ., vol. 92, no. 8/9, pp. 1846–1857, 2008.
[32] E. Kauder, History of Marginal Utility Theory, vol. 2238. Princeton, NJ,
USA: Princeton Univ. Press, 2015.
[33] Y. Li, X. Luo, W. Zhao, and H. Gao, “Reputation-based stable blockchain
sharding scheme for smart cities with IoT consumer electronics: A deep
reinforcement learning approach,” IEEE Trans. Consum. Electron., vol.
70, no. 3, pp. 5737–5746, Aug. 2024.
[34] J. Wu al., “Efficiency optimization for blockchain-enabled V2V energy
trading with dynamic clustering based on deep reinforcement learning,”
IEEE Trans. Veh. Technol., vol. 75, no. 1, pp. 405–418, Jan. 2026.
[35] J. Li, H. Shi, W. Chen, N. Liu, and K. Hwang, “Semi-supervised detection model based on adaptive ensemble learning for medical images,”
IEEE Trans. Neural Netw. Learn. Syst., vol. 36, no. 1, pp. 237–248,
Jan. 2025.
[36] G. He, Y. Ding, Z. Wu, X. Chen, D. Zhang, and J. Song, “Environmentadaptive online learning for portable energy storage based on porous
electrode model,” IEEE Trans Autom. Sci. Eng., vol. 22, pp. 8386–8399,
2025.
[37] BPD-Blockchain, “Performance on hyperledger fabric,” 2022. Accessed:
May 10, 2025. [Online]. Available: https://www.kaggle.com/datasets/
loveffc/blockchain-performance/
[38] HFBTP, “A blockchain performance dataset,” 2023. Accessed: May
10, 2025. [Online]. Available: https://www.kaggle.com/datasets/loveffc/
hfbtp-a-blockchain-performance-dataset/
[39] “Transaction arrival rate (Blockchain) for parking,” 2025. Accessed: May
10, 2025. [Online]. Available: https://www.kaggle.com/datasets/loveffc/
transaction-arrival-rate-blockchain-for-parking/

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.

## Page 18

966

IEEE TRANSACTIONS ON CLOUD COMPUTING, VOL. 14, NO. 2, APRIL-JUNE 2026

[40] C. Chen, L. Wang, and Q. Shi, “Blockchain-enabled trust management in
internet of vehicles: A joint pre-reward-penalty and consensus approach,”
IEEE Internet Things J., vol. 12, no. 6, pp. 6961–6978,Mar. 2025.
[41] M. Naik, A. P. Singh, N. R. Pradhan, A. M. Almuhaideb, and N. Kumar, “A
framework for blockchain-enabled internet of electric vehicles charging
station sustainability performance evaluation,” IEEE Internet Things J.,
vol. 12, no. 5, pp. 4726–4737, Mar. 2025.

Jishu Wang (Member, IEEE) is currently working
toward the PhD degree with the School of Information
Science and Engineering, Yunnan University, Kunming, China. He has authored peer-reviewed papers in
IEEE Transactions on Intelligent Transportation Systems, IEEE Transactions on Vehicular Technology,
and IEEE Transactions on Network and Service Management. His research interests include blockchain
and intelligent transportation systems.

Xuan Zhang (Member, IEEE) received the PhD degree in system analysis and integration from Yunnan
University, Kunming, China, in 2014. She is currently
a professor with the School of Software at Yunnan
University, Kunming, China. She is the core scientist
of Yunnan Key Laboratory of Software Engineering
and Yunnan Software Engineering Academic Team.
She is the author of three books and more than 130
articles. She has been principal investigator of more
than 30 national, provincial, and private grants and
contracts. Her research interests include blockchain,
knowledge graphs, natural language processing, and computer vision.

Linfeng Liu is currently working toward the MS
degree with the School of Software, Yunnan University, Kunming, China. His research interests include
blockchain and Internet of Things.

Xuekun Yang received the ME degree in software engineering from Yunnan University, Kunming, China,
in 2023. He is currently with the Yunnan Key Laboratory of Digital Communications, Kunming. His
research interests include short-term spatiotemporal
prediction and the application of computer vision in
the field of transportation.

Tao Zhou is currently working toward the ME degree
with the School of Software Engineering, Yunnan
University, Kunming, China. His research interests
include blockchain and smart agriculture.

Chen Miao received the ME degree in software engineering from Yunnan University, Kunming, China,
in 2022. He is currently employed in the position of Technology Information Management with
State Grid Xinyuan Material Company, Ltd. His research interests include blockchain and intelligent
transportation systems.

Rui Zhu received the PhD degree in software engineering from Yunnan University, Kunming, China,
in 2016. He is currently the head and associate
professor of artificial intelligence with the School
of Software, Yunnan University, Kunming. His
research interests include blockchain, intelligent
transportation systems, and deep learning.

Zhi Jin (Fellow, IEEE) received the PhD degree in
computer science from the National University of
Defense Technology, Changsha, China, in 1992. She
is currently a professor with the School of Computer
Science and the deputy director of the Key Lab of
High Confidence Software Technologies (Ministry of
Education), Peking University, Beijing, China. She
has authored or coauthored five books. Her research
interests include software engineering, requirements
engineering, knowledge engineering, and machine
learning. She was the recipient of the IEEE TCSVC
Distinguished Leadership Award, and ACM Distinguished Paper Awards (four
times). She is/was the Principal investigator of more than 18 national competitive grants. She serves as an associate editor for IEEE Transactions on
Software Engineering, IEEE Transactions on Reliability, ACM Transactions
on Autonomous and Adaptive Systems, Empirical Software Engineering, and
Requirements Engineering. She is a fellow of CCF and AAIA, chairperson of
the Supervisory Board of CCF, chair of CCF Technical Committee of Software
Engineering during 2016–2019, and chair of CCF Technical Committee of
System Software during 2020–2023. She was a standing board member of CCF.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:57:55 UTC from IEEE Xplore. Restrictions apply.
