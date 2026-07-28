---
source_type: pdf
title: "Research on the Performance Analysis of Mainstream Consensus Algorithms of Consortium Blockchains"
original_file: "thesis/reference/Research_on_the_Performance_Analysis_of_Mainstream_Consensus_Algorithms_of_Consortium_Blockchains.pdf"
sha256: "900c1936cfe1d60cf794d5f8bd30b328bf157dacb92db4496aabb172f26c6480"
page_count: 5
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Research on the Performance Analysis of Mainstream Consensus Algorithms of Consortium Blockchains

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2024 2nd International Conference On Mobile Internet, Cloud Computing and Information Security (MICCIS) | 979-8-3503-8990-6/24/$31.00 ©2024 IEEE | DOI: 10.1109/MICCIS63508.2024.00031

2024 2nd International Conference on Mobile Internet, Cloud Computing and Information Security (MICCIS)

Research on the Performance Analysis of Mainstream Consensus Algorithms of
Consortium Blockchains
1st Weizhi Xiong

2nd Xiu Yao*

School of Information Engineering
Gannan University of Science and Technology
Ganzhou, China
mrxiongwz@foxmail.com

School of Information Engineering
Gannan University of Science and Technology
Ganzhou, China
1490018665@qq.com

3rd Xiaohong Deng
School of Information Engineering
Gannan University of Science and Technology
Ganzhou, China
dengxiaohong@gnust.edu.cn
(PoW) [5], Proof of Stake (PoS) [6], and Directed Acyclic
Graph (DAG), quantifying block efficiency, confirmation
latency, throughput, and confirmation failure probability.
Experimental evaluations were conducted on average
block generation time, latency, throughput, and
confirmation failure probability, analyzing and comparing
their performances. Reference [7] proposed a theoretical
model for calculating transaction latency in Fabric under
different network configurations, dividing latency into
three parts: execution phase latency, ordering phase
latency, and validation phase latency, with analysis on the
calculation of each part's latency. Reference [8] proposed a
performance evaluation framework for Hyperledger Fabric
2.2, Hyperledger Sawtooth 1.2, and ConsenSys Quorum
21.1, comparing them in terms of latency, privacy,
scalability, and efficiency. Reference [9] designed an
evaluation framework called BLOCKBENCH for private
blockchains, measuring the performance of three private
chains - Ethereum, Parity, and Hyperledger Fabric - based
on throughput, latency, scalability, and fault tolerance. In
the aforementioned studies, some were limited to
qualitative analysis, while others focused more on
performance analysis of private chains or specific types of
consensus algorithms, lacking quantitative performance
analysis for relevant consensus algorithms in consortium
chains. Additionally, the testing conditions varied, which
may impact the fairness of performance analysis across
different platforms of Ethereum or Hyperledger Fabric.
Furthermore, due to significant differences in the
principles of different consensus algorithm types,
evaluation metrics also vary, leading to a lack of uniform
evaluation standards. The main contributions of this paper
are as follows:
(1) The analysis concludes with the identification of
key performance evaluation metrics for consensus
algorithms, primarily focusing on throughput, latency,
decentralization degree, and consensus security level.
These four metrics were quantitatively assessed.
Furthermore, a performance evaluation framework was
proposed, characterized by its ability to be configured for
different workload conditions and its traits of loose
coupling and easy scalability.
(2) Theoretical analysis and empirical testing were
conducted on mainstream consensus algorithms in
consortium blockchains, comparing and contrasting the
strengths and weaknesses of each algorithm..

Abstract—The diverse range of consensus algorithms poses a
challenge in selecting the most suitable one for practical
application scenarios. Addressing the lack of quantitative
performance comparison among consortium blockchain
consensus algorithms, this paper quantifies key performance
indicators in consensus algorithm evaluation. Furthermore,
it designs a performance evaluation framework and employs
it to conduct theoretical and empirical analyses of
mainstream consensus algorithms in consortium blockchains.
Finally, the paper outlines the advantages and limitations of
each consensus algorithm and identifies the factors
constraining their performance.
Keywords-blockchain; consensus algorithm; quantitative
assessment

I.

INTRODUCTION

With the emergence of the metaverse concept, new
vitality has been injected into the digital economy. As the
core of the digital economy, blockchain plays an important
role in driving information technology services and
promoting digital industrialization. However, the
performance of blockchain constrains its further
development. The most critical factor in improving
blockchain performance lies in the consensus algorithm.
Currently, a large amount of work has been done to study
consensus algorithms, which can be roughly categorized
based on their characteristics into three types: proof of
node attribute value, node voting system, and Paxos-like
algorithms [1]. Different types of consensus algorithms
vary significantly in their principles and have their own
advantages and disadvantages. Therefore, selecting the
appropriate consensus algorithm for practical application
scenarios has become a challenge.
Currently, some researchers have conducted
comparative analyses of the performance of consensus
algorithms. Reference [2] compared and analyzed nine
consensus algorithms, qualitatively assessing them based
on
four
indicators:
performance
efficiency,
decentralization degree, usage scale, and resource
consumption. Reference [3] directly measured the
performance of the private chain platforms Hyperledger
Fabric and Ethereum, simulating transactions with a cash
transfer program and conducting performance analysis in
terms of execution time, latency, and throughput.
Reference [4] compared the performance of Proof of work

979-8-3503-8990-6/24/$31.00 ©2024 IEEE
DOI 10.1109/MICCIS63508.2024.00031

136

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:01:30 UTC from IEEE Xplore. Restrictions apply.

## Page 2

II.

PERFORMANCE EVALUATION METHOD



A. Key metrics for performance analysis
1) Throughput: Throughput is typically used to
describe the total amount of data transmitted in a network.
In blockchain contexts, it is often used to describe the
number of transactions that can be processed per second.
This paper will utilize this as the quantification standard
for throughput, namely the number of transactions
processed by the system within a unit of time. The
calculation formula is as follows:


Throughput 

 intx i
Time



Lantency  Wq  pk  Nl  Ct 

 maxNode  
n
w 
  1 
  j Nodeiw 
N
i





Here,  =  =0.5, indicating that the proportion of
consensus nodes and the method of selecting master nodes
each contribute equally to determining the degree of
decentralization. In this equation, n represents the number
of participating consensus nodes, N represents the total
number of nodes, and maxNodew represents the node with
the highest weight value. The method of selecting master
nodes is represented by the ratio of the weight value of the
node with the maximum weight value to the total weight
value of all nodes.
4) Consensus security: From the perspective of
consensus algorithms, the security level primarily consists
of fault tolerance, handling capability of malicious nodes,
and recovery capability. Fault tolerance represents the
ability of nodes to tolerate the presence of malicious
nodes during the consensus process. The handling
capability of malicious nodes signifies whether malicious
nodes can be promptly excluded from the range of master
node selection. Recovery capability denotes the ability of
the consensus mechanism to continue functioning in the
event of malicious node activity. These three aspects are
considered as factors for calculating consensus security.
The calculation formula is as follows:



Where intxi represents the total number of transactions,
and
represents the time taken to process the
transactions. The ratio of these two parts constitutes the
measured value of throughput.
2) Delay: The latency is defined as the time taken for
one round of consensus, determining the process from
transaction initiation to being added to the blockchain.
This includes transaction queuing time, block packaging
time, network latency, and consensus time. The
calculation formula is as follows:


Decentralization  α





In the equation, Wq represents the transaction queue
waiting time, pk denotes the time taken to package
transactions into blocks, Nl stands for network latency,
and Ct represents consensus time. Due to the strong
randomness of transaction queue waiting time Wq , when
there are too many clients, resulting in a significant
increase in transaction volume, the transaction queue
waiting time will lengthen. Conversely, when there are
fewer clients, and the transaction volume is sparse, the
transaction queue waiting time will be shorter. Transaction
queue waiting time will affect the measurement of latency
since latency typically refers to average latency. Therefore,
this paper will measure the average waiting time in the
transaction queue to balance the two extreme situations
resulting from different transaction volumes. Typically,
queueing problems [10] can be addressed using queuing
theory models. we will employ queuing theory models to
calculate the average waiting time for transaction queuing.
3) Degree of decentralization: Considering the nature
of blockchain, a broader coverage of nodes involved in
the accounting process leads to a more equal competition
for accounting rights among nodes, resulting in a higher
degree of decentralization. Based on this premise,
decentralization is measured by two factors: the
proportion of nodes participating in the consensus process
and the method of selecting master nodes. The proportion
of nodes participating in consensus reflects the breadth of
coverage of nodes involved in accounting, while the
method of selecting master nodes reflects the degree of
equality in the competition for accounting rights among
nodes. The calculation formula is as follows:

Security  αfault  βwrong  γrecover 



Where  =  =  =0.33, each part constitutes onethird of the total, where 'fault' represents fault tolerance,
calculated based on the number of malicious nodes that the
consensus algorithm can tolerate. 'Wrong' represents the
capability to handle malicious nodes. If the consensus
algorithm has a mechanism to handle malicious nodes, this
value will be set to 1; otherwise, it will be 0. 'Recover'
represents the recovery capability. If the consensus
algorithm has a mechanism to recover from attacks, this
value will be set to 1; otherwise, it will be 0.
B. CBlockBench framework
In order to test the performance of consensus
algorithms under the same standards and platform, the
CBlockBench performance evaluation framework was
designed, as illustrated in Figure 1. The network
component of this framework is borrowed from the basic
network communication in the Paxi framework [11]. The
entire framework can be divided into five parts:
configuration module, network module, consensus module,
benchmarking module, and storage module.
The framework revolves around the Node interface,
which serves as the core. Different types of consensus
algorithms implement the Node interface to customize
their required node types. Additionally, the Node interface
inherits the Socket interface of the network module,
facilitating the provision of message structures and
forwarding methods needed by each consensus algorithm.
This design enhances the framework's scalability by
facilitating the addition of new algorithms in the future.

137
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:01:30 UTC from IEEE Xplore. Restrictions apply.

## Page 3

Client
calls
Benchmarker

PBFT
Messages

Replica

calls

<<interface>> register
Node

Consistency
Checker
use

calls
Configuration

extends

use

HotStuff
Messages

extends

<<interface>>
Socket

HTTP Server

<<interface>>
Transport

register

register

extends

different processing methods of each algorithm during the
consensus process. The results are presented in Table 1.
As shown in Table 1, six elements are analyzed: the
number of primary nodes, communication complexity,
view change communication complexity, Byzantine fault
tolerance capability, Leader Percentage, and Election of
leaders. The number of primary nodes represents how
many primary nodes exist in one round of consensus,
which is closely related to the efficiency of consensus.
Communication
complexity
and
view
change
communication complexity represent the communication
costs incurred during the consensus process, which greatly
affect the efficiency of consensus. Leader Percentage
refers to the ratio of nodes participating in the consensus
process to the total number of nodes. This paper believes
that this ratio is closely related to the degree of
decentralization. Election of leaders refer to the possibility
that each node may not have an equal chance of being
selected as a primary node, which also relates to the degree
of decentralization.

Raft
Messages

<<interface>>
StateMachine

use

use

<<interface>>
Codec

use

use

TCP/UDP/
chan

JSON

Datastore

Figure 1. Frame structure class diagram

III.

PERFORMANCE COMPARISON AND ANALYSIS

A. Theoretical analysis
In this section, a detailed comparison of each
consensus algorithm is conducted, highlighting the
TABLE I.

COMPARISON OF CONSENSUS ALGORITHM FEATURES

Algorithm

Primary
nodes

Communication
complexity

View change
complexity

Byzantine fault
tolerance

Leader
Percentage

Election of
leaders

Paxos [12]
Raft [13]
PBFT [14]
HotStuff [15]
PBT-BFT[16]

1
1
1
multiple
2

O(n)
O(n)
O(n 2 )
O(n)
O(n)

O(n 2 )
O(n 2 )
O(n3 )
O(n)
O(n)

0
0
1/ 3
1/ 3
1/ 3

part
all
all
all
part

arbitrary
random
in turn
random
random

From Figure 2, it is evident that as the number of nodes
increases, the throughput of each algorithm demonstrates a
decreasing trend. Paxos and Raft algorithms are both crash
fault-tolerant protocols, designed with simplicity in mind.
They maintain relatively high throughput with only 4
nodes. However, as the number of nodes increases, their
performance gradually decreases. This is believed to be
due to the increased load pressure on individual leader
nodes.
On the other hand, PBFT, HotStuff, and PBT-BFT
algorithms are all Byzantine fault-tolerant protocols, which
require more communication rounds during their design.
With 4 nodes, their throughput is slightly lower. As the
number of nodes increases, PBFT experiences a significant
decrease in throughput, primarily due to its communication
complexity being O(n 2 ) . HotStuff exhibits a slower decline
in throughput, while PBT-BFT shows the slowest decline.
This is attributed to the multi-leader node strategy
employed, which is believed to play a critical role in
maintaining performance.
From Figure 3, it can be observed that the throughput
fluctuation of Paxos and Raft is similar, both around 400
TPS. PBFT exhibits the largest fluctuation, reaching 575
TPS, while HotStuff shows smaller fluctuations at 176
TPS, and PBT-BFT has the smallest fluctuation, at only
161 TPS. During leader node switching, Paxos and Raft
exhibit a communication complexity of O(n 2 ) , PBFT has a
communication complexity of O(n 3 ) during view changes,
and HotStuff and PBT-BFT have a communication
complexity of O(n) during view changes. It can be
concluded that communication complexity is the primary
factor influencing performance during view changes.

B. Experimental analysis
1) Test environment: Table 2 lists the experimental
environment configurations.
TABLE II.
Configure the project
Server specifications
Operating system

TEST ENVIRONMENT CONFIGURATION
Configuration details
2 vCPU 8GiB (Ali Cloud ecs.g7.large)
Centos7.9 64 位

Development language

Go1.20.linux

Test the software

CBlockBench

2) Throughput comparison: In order to increase the
pressure on throughput testing, the number of clients was
set to 90, and the performance was tested for node counts
ranging from 4 to 20, as shown in Figure 2. Additionally,
to assess the throughput performance of consensus
algorithms under continuous leader switches, throughput
performance was tested with 90 clients and 4 nodes, as
depicted in Figure 3.

Figure 2. Throughput comparison

138
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:01:30 UTC from IEEE Xplore. Restrictions apply.

## Page 4

Figure 3. The throughput performance of the view-change continuously

3) Latency comparison: At a client count of 90, the
latency performance was tested across 4 to 20 nodes, with
the results illustrated in Figure 4.

173ms at 20 nodes, showing a minor increase. PBT-BFT
algorithm's latency is least affected by the number of nodes,
with latency of 34ms at 4 nodes and only 53ms at 20 nodes,
exhibiting a minimal increase.
The primary reason for the highest latency in PBFT is
primarily due to its excessively high communication
complexity, large message volume, and prolonged
processing time by a single leader node. Paxos and Raft
exhibit better latency performance compared to PBFT, as
they have lower communication complexity under similar
single leader node conditions, resulting in lower latency.
HotStuff demonstrates favorable latency performance,
benefiting from its multi-leader nodes and chain-based
pipelined consensus mechanism. PBT-BFT exhibits the
best latency performance, attributed to the critical roles
played by leader rotation and the pipeline mechanism.
4) Comparison of the degree of decentralization: The
decentralization degree was tested with 90 clients and 20
nodes for each consensus algorithm. The results illustrated
in Figure 5.
From Figure 5, it can be observed that the
decentralization degree of the Paxos algorithm is 91%,
while Raft, PBFT, and HotStuff algorithms all have a

Figure 4. Latency comparison

From Figure 4, it is evident that as the number of nodes
increases, the latency of the PBFT algorithm rises most
rapidly, from 163ms at 4 nodes to 2277ms at 20 nodes.
The latency trend of Paxos and Raft algorithms is similar,
with latency lower on each node compared to PBFT
algorithm. The latency of HotStuff is less affected by the
number of nodes, with latency of 46ms at 4 nodes and

139
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:01:30 UTC from IEEE Xplore. Restrictions apply.

## Page 5

decentralization degree of 100%. In contrast, PBT-BFT
has a decentralization degree of 48%. According to
Equation 3, the decentralization degree of the Paxos
algorithm is compromised due to the exclusion of learners
from the consensus process. Similarly, in the case of the
PBT-BFT algorithm, the decentralization degree is
diminished because some nodes do not participate in
constructing the perfect binary tree, and leader election is
based on the random selection of nodes according to their
reputation-weighted values

and compare their performance, we quantify performance
evaluation metrics and design a performance evaluation
framework to conduct analysis and comparisons under the
same standards and conditions. The results indicate that as
the number of nodes increases, the performance of these
algorithms shows a declining trend. HotStuff performs the
best, with generally higher decentralization levels, while
Paxos performs the worst. In terms of consensus security,
PBFT and HotStuff outperform Paxos and Raft.
ACKNOWLEDGMENT
This work was supported by the National Natural
Science Foundation of China (No.61762046, No.
62166019), the National Natural Science Foundation of
Jiangxi Province (No.20224BAB202019) and the Science
and Technology Research Project of the Education
Department of Jiangxi Province (No. GJJ218506).
REFERENCES
[1]

X. Deng, Z. Wang, J. Li, J. Wang and K. Li. Comparative research
on mainstream blockchain consensus algorithms [J]. Application
Research of Computers,2022,39(01):1-8.
[2] G. Lu, L. Xie, X. Li. Comparative Research of Blockchain
Consensus Algorithm [J]. Computer Science ,2020,47(S1):332-339.
[3] Pongnumkul S, Siripanpornchana C, Thajchayapong S.
Performance analysis of private blockchain platforms in varying
workloads[C]//2017 26th International Conference on Computer
Communication and Networks (ICCCN). IEEE, 2017: 1-6.
[4] B Cao, Z Zhang, D Feng, S Zhang, L Zhang. Performance analysis
and comparison of PoW, PoS and DAG based blockchains[J].
Digital Communications and Networks, 2020, 6(4): 480-485.
[5] Nakamoto S. Bitcoin: a peer-to-peer electronic cash system
[EB/OL]. https://bitcoin.org/en/bitcoin-paper, 2022-2-15.
[6] King S, Nadal S. Ppcoin: Peer-to-peer crypto-currency with proofof-stake[J]. self-published paper, August, 2012, 19(1).
[7] Xu X, Sun G, Luo L, et al. Latency performance modeling and
analysis for hyperledger fabric blockchain network[J]. Information
Processing & Management, 2021, 58(1): 102436.
[8] Capocasale V, Danilo G, Perboli G. Comparative analysis of
permissioned blockchain frameworks for industrial applications[J].
Blockchain: Research and Applications, 2022: 100113.
[9] Dinh T T A, J Wang, G Chen, et al. Blockbench: A framework for
analyzing private blockchains[C]//Proceedings of the 2017 ACM
international conference on management of data. 2017: 1085-1100.
[10] Allen A O. Probability, statistics, and queueing theory[M]. Gulf
Professional Publishing, 1990.
[11] Ailijiang A, Charapko A, Demirbas M. Dissecting the performance
of strongly-consistent replication protocols[C]//Proceedings of the
2019 International Conference on Management of Data. 2019:
1696-1710.
[12] Lamport L. Paxos made simple. ACM Sigact News,
2001,32(4):18−25.
[13] Ongaro D, Ousterhout J. In search of an understandable consensus
algorithm[C]//2014 USENIX Annual Technical Conference
(Usenix ATC 14). 2014: 305-319.
[14] CASTRO M, LISKOV B. Practical Byzantine fault
tolerance[C]//Proceedings of the Third Symposium on Operating
Systems Design and Implementation. New York: ACM Press, 1999:
173-186.
[15] M YIN, D MALKHI, M K REITER, et al. HotStuff: BFT
consensus in the lens of blockchain[C]// ACM Symposium on
Principles of Distributed Computing. ACM, 2019: 347-356
[16] S LI, W XIONG, X DENG, Z WANG, H LIU. Byzantine FaultTolerance Consensus Algorithm Based on Perfect Binary Tree
Communication[J]. Journal of Electronics & Information
Technology, 2023,45(07):2484-2493.

Figure 5. Comparison of the degree of decentralization

5) Consensus security comparison: During the testing
of consensus security level, with 90 clients and 20 nodes,
including 6 malicious nodes, the results are depicted in
Figure 6.

Figure 6. Comparison of consensus security

From Figure 6, it is evident that the consensus security
level of Paxos and Raft is 0%. This is due to the inability
of Paxos and Raft algorithms to tolerate Byzantine faults,
resulting in a fault tolerance of 0. Moreover, they lack the
capability to address malicious node behaviors, and in the
presence of malicious nodes, there is no recovery
mechanism, hence yielding a consensus security level of
0%.
In contrast, both PBFT and HotStuff exhibit a
consensus security level of 43.3%. This is because PBFT
and HotStuff share the same fault tolerance threshold, set
at no more than one-third of the total number of nodes.
Additionally, neither PBFT nor HotStuff possess the
capability to handle malicious nodes.
However, the PBT-BFT algorithm achieves the highest
consensus security level, reaching 78%. This is attributed
to its congruence with PBFT and HotStuff in terms of fault
tolerance and recovery capabilities, while also possessing
the capability to handle malicious nodes. As such, the
PBT-BFT algorithm boasts a higher consensus security
level.
IV.

SUMMARY AND DISCUSSION

This paper investigates the mainstream consensus
algorithms in consortium blockchains. To better analyze

140
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:01:30 UTC from IEEE Xplore. Restrictions apply.
