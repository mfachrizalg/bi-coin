---
source_type: pdf
title: "Demystifying Hyperledger Fabric Framework for Distributed Ledgers and Approach to Evaluate Its Performance"
original_file: "thesis/reference/Demystifying_Hyperledger_Fabric_Framework_for_Distributed_Ledgers_and_Approach_to_Evaluate_Its_Performance.pdf"
sha256: "af1396738c43828b66ec20e7901b5725dc93dee950233c8d73b48d969e0d30c6"
page_count: 5
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Demystifying Hyperledger Fabric Framework for Distributed Ledgers and Approach to Evaluate Its Performance

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2023 International Conference on Sustainable Emerging Innovations in Engineering and Technology (ICSEIET) | 979-8-3503-2919-3/23/$31.00 ©2023 IEEE | DOI: 10.1109/ICSEIET58677.2023.10303377

2023 International Conference on Sustainable Emerging Innovations in Engineering and Technology (ICSEIET)

Demystifying Hyperledger Fabric Framework
for Distributed Ledgers and Approach to
Evaluate Its Performance
1DYHHQ.XPDU
5DMHVK.XPDU.DXVDO
&KLWNDUD8QLYHUVLW\,QVWLWXWHRI(QJLQHHULQJ &KLWNDUD8QLYHUVLW\,QVWLWXWHRI(QJLQHHULQJ
DQG7HFKQRORJ\&KLWNDUD8QLYHUVLW\3XQMDE DQG7HFKQRORJ\&KLWNDUD8QLYHUVLW\3XQMDE
,QGLD
,QGLD
QDYHHQVKDUPD#FKLWNDUDHGXLQ
UDMHVKNDXVKDO#FKLWNDUDHGXLQ

6KDQWL0DNND
9DUGKDPDQ&ROOHJHRI(QJLQHHULQJ
6KDPVKDEDG+\GHUDEDG7HODQJDQD
,QGLD
VKDQWKLPDNND#JPDLOFRP

.DPDO6DOXMD
&KLWNDUD8QLYHUVLW\,QVWLWXWHRI
(QJLQHHULQJDQG7HFKQRORJ\
&KLWNDUD8QLYHUVLW\3XQMDE
,QGLD
Abstract— Hyperledger Fabric is a highly advanced
private data collections that permits integration of external
blockchain framework for enterprise level organizations.
services.
Hyperledger Fabric is designed to establish either permissioned
Hyperledger Fabric is very much flexible and modular and
or private blockchain networks. This means that only endorsed
permit
organizations to tailor their blockchain network to meet
members and parties are able to join the network, and ledgers are
their
certain
requirements. It provides a rich support for
only accessible to those parties that have been granted permission to
numerous consensus algorithms, including Raft and Practical
access them. Such environment is ideal for organizations that needs
a high degree of privacy and security in their ledgers. Another key
Byzantine Fault Tolerance (PBFT) which can be adopted based
feature of Fabric is its endorsement policy, which permits to define
on the network's performance requirements. Moreover, Fabric
flexible and customizable transaction validation rules. As a result,
supports the concept of smart contracts also popularly known
organizations can define which members are required to sign off on
as "chaincode," and can be programmed in various
transactions before they can be added to the blockchain. The Fabric
programming languages such as Go or Node.js.
framework also includes a numeral other features that make it
Another key feature of Fabric is its endorsement policy,
suitable for enterprise-level use such as support for multiple
consensus algorithms, modular architecture and private data
which permits to define flexible and customizable transaction
collections that permits integration of external services. Its
validation rules. As a result, organizations can define which
modular nature, support for several other consensus algorithms
members are required to sign off on transactions before they can
and customizable endorsement policy make it a suitable for
be added to the blockchain. In nutshell, Fabric is an extremely
businesses looking to setup their own blockchain networks. This
customizable and potent blockchain framework that is
research work is disclosing the practical approach to implement
appropriate for a comprehensive range of enterprise
Hyperledger Fabric along with the approach to evaluate its
performance primarily throughput and latency.
applications. Its modular nature, support for several other
Index Terms—Hyperledger Fabric, Hyperledger
Caliper, Blockchain, Fabric Performance, Fabric Latency

I. INTRODUCTION
Hyperledger Fabric is one of the open source and
enterprise-grade frameworks that permits businesses and
organizations to design and deploy their own blockchain
networks [1][2]. Hyperledger framework works under the
Linux Foundation and is designed to stipulate a modular
architecture that can be tailored to meet the certain needs
of distinctive enterprise applications. Hyperledger Fabric
facilitate the establishment of permissioned blockchain
networks, which means that only authorized members are
allowed to join and interact with the network [3]. Thus, it is
ideal for enterprise applications that demands a high degree
of privacy, security, and scalability. The Fabric framework
also includes a numeral other features that make it suitable
for enterprise-level use such as support for multiple
consensus algorithms, modular architecture and

979-8-3503-2919-3/23/$31.00 ©2023 IEEE

116

consensus algorithms and customizable endorsement policy
make it a suitable for businesses looking to setup their own
blockchain networks [4].
Every technology has pros and cons which must be addressed
wisely. Though, Fabric is a powerful and flexible framework
that is well-suited for enterprise-level businesses and
organizations, yet it is suffering from some issues that need to
be addressed. Firstly, Hyperledger Fabric is a complex
framework that requires a substantial amount of technical
proficiency to set up and manage. This can make it very
challenging for businesses with inadequate technical resources
to adopt and implement [5-7]. Another challenge is related to
scalability. Though Hyperledger Fabric has made significant
improvements in its scalability over the years, yet it is facing
several challenges while handling high transaction volumes.
This is one of the biggest barrier in its adoption for businesses
with large-scale use cases. Another challenge is, integrating
Hyperledger Fabric with existing enterprise systems, especially
when dealing with legacy systems or proprietary technologies.

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:16 UTC from IEEE Xplore. Restrictions apply.

## Page 2

2023 International Conference on Sustainable Emerging Innovations in Engineering and Technology (ICSEIET)

Hyperledger Fabric is aimed for enterprise level businesses,
thus it requires a well-defined governance model to guarantee
that all participants on the network are following the rules and
regulations. Moreover, presently there is a shortage of
blockchain experts, thus making it very challenging for
businesses to find the talent they need to productively
implement Hyperledger Fabric. Thus, it is clear that even
though Hyperledger Fabric is a powerful tool but primarily
utilized by larger organizations due to its complexity and lack
of expertise. This study is an attempt to disclose its
technicalities in a simpler way, approach to implement
Hyperledger Fabric server and evaluating system performance
primarily throughput and latency.

management system. Artificial intelligence is another area
where Blockchain can play a vital role [16][17].

II. RELATED WORK
Hyperledger Fabric is a blockchain framework which can be
used to implement immutable and auditable distributed ledger
for several key areas like supply chain management, electronic
health records, insurance sector, asset administration, Internet
of Things (IoT) applications and many more. There are several
blockchain frameworks like Ethereum, Hyperledger Sawtooth
and R3 Corda but among all these Hyperledger Fabric is the
most effective due to its low latency and high throughput. Table
1 is depicting all those studies which have performed empirical
studies and evaluated performances of multiple blockchain
frameworks.

Fig. 1. Sector wise adoption of Blockchain
All these sectors are very sensitive in nature and require a
blockchain environment which can deliver best performance in
context to throughput and latency. Thus, blockchain framework
selection is crucial and several studies has proved that
hyperledger fabric framework can delivery high throughput and
low latency as compared to others. These studies are mentioned
in the Table 1. But due to its complexity and lack of expertise,
this framework is less adopted and needs attention.
III. OBJECTIVES

Table 1. Published comparative studies on Blockchain
framework
Citation
[8]
[9]
[10]
[11]

[12]
[13]
[14]
[15]

Comparison
Ethereum with
Hyperledger Fabric
Ethereum with
Hyperledger Fabric
Ethereum with
Hyperledger Fabric
Ethereum, Fabric,
Quaram and R3 Corda

Year
2017

Hyperledger Sawtooth
and Hyperledger
fabric
Hyperledger Iroha,
Sawtooth and Fabric
Ethereum with
Hyperledger Fabric
Ethereum, Parity and
Hyperledger Fabric

2021

2018
2020
2020

2022
2022
2022

This study is aimed to demystify the technicalities associated
with the Hyperledger Fabric and approach to implement Fabric
server. Another objective is to disclose tools and techniques for
evaluating system performance primarily throughput and
latency by designing a test network and injecting workload
(transactions) through fabric tools such as Hyperledger Caliper.

Outcome
Fabric
outperformed
Fabric
outperformed
Fabric
outperformed
Corda
outperformed in
latency and fabric
in throughput
Fabric
outperformed

IV. METHODOLOGY
The proposed approach is to achieve the objectives is to
develop a test network in Hyperledger Fabric framework and
then evaluate its performance using the Hyperledger Caliper.
Table 2. Test-Network Components

Fabric
outperformed
Fabric
outperformed
Fabric
outperformed

Component
Organizations
Peers
Orderer
Channel

The related work indicates that in majority of the cases
Hyperledger Fabric performed well with respect to throughput
and latency. This framework is suitable for applications areas
such as finance and banking, healthcare, identity and access
management, real-estate, energy and insurance sector. A
comprehensive analysis of sector wise adoption of blokchain is
illustrated in the Figure 1. It is clear from this figure that
blockchain is widely adopted for Internet of Things (IoT) and
energy sector followed by healthcare and supply chain

Certificate
Authority

Details
Can be visualized as profit or not-profit
entities running their business.
Can be visualized as employees/staff/students
or any other stake holders.
A component responsible for generating
blocks.
All above components must join a common
channel to send and received
transactions/blocks.
A fabric component responsible to issue
certificates to join the blockchain network

A test network is setup with the components listed in the
Table 2. This test network depicts an environment where there
are two organizations with one peer each, a single orderer,
certificate authority for every organization and a single

117

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:16 UTC from IEEE Xplore. Restrictions apply.

## Page 3

2023 International Conference on Sustainable Emerging Innovations in Engineering and Technology (ICSEIET)

network.sh script is executed which is bundled with fabric
binaries. At any time, new peers can be added to the existing
organizations. Adding new peers onto the network require
following steps.
a. Create crypto material for the new peer.
b. Then create a docker-compose file containing this
peer.
c. Make this peer join the existing channel
d. Install the existing chaincode onto the newly created
peer.

common channel. This test network is also depicted in the
Figure 2.

Thereafter hyperledger caliper is installed and assigned the
workload to throw transactions onto this newly created
blockchain test network. Hyperledger caliper was configured to
inject hundreds of transactions at different rates to evaluate the
performance of the network in context of latency and
throughput. The experiment was conducted twice, once by
injecting transactions at 100 transactions per second (TPS) and
then at 200 TPS. A total of 1100 transactions were injected both
the times.

Fig. 2. Hyperledger fabric test network
V. EXPERIMENT
The test network requires installation of several utilities on the
Linux machine. The details of these utilities are illustrated in
the Table 3.
Table 3. Prerequisites for the test network
Software

Version

Purpose

Docker

20.10.12

cURL

7.71.1

Packaging application into
container
To make http requests

Ubuntu

20.04

Underlying operating system

NPM

7.24.0

Node package manger

Node.js

16.10.0

Hyperledger
Fabric
Fabric Ca

2.3.1

Node.js and Hyperledger fabric
SDK for Node.js
Blockchain Framework

1.4.9

Client Certificate Authority

Fabric Peer

2.3.1

Peer denotes a client

Peer Orderer

2.3.1

Orderer organization

Chaincode

2.3.1

Smart Contract

VI. RESULT ANALYSIS
The Hyperledger Calliper, a benchmarking tool for
blockchain performance, is used to test the performance of the
suggested paradigm. It can be set up to produce a lot of
workload on the Fabric. Throughput and latency are employed
as metrics to gauge performance. The proposed model will be
used on Hyperledger Fabric because of the platform's increased
industry popularity as proximately 400 production applications
and proofs of concept are currently using it. In order to execute
the experiment, two organizations with two peers each were
created.

This study used Node.js programming language for chaincode
to write the business logic and to retrieve and write transactions
on the ledger. Bringing up this test network involves a
predefined sequence which is listed below.
a. Invoking certificate authorities.
b. Generating crypto-material for organizations
including orderer and peers.
c. Bringing up remaining network components
configured with docker-compose.
d. Bringing channel up requires generating
configuration transaction, genesis block with
ordering service and joining all peers with this
channel.
e. Packaging chaincode, installing it on peers,
approving chaincode definition for organizations
and commiting chanincode.
The above steps are automatically followed when a

Fig. 3. Average latency with 100 TPS
During experiment, a total of 1100 transactions were injected at
100 TPS. Figure 3 illustrates that system took 49 seconds to
commit all the transactions. In the second round, the transaction
rate was changed to 200 TPS and this time the system took 53
seconds to commit all the transactions. The results are
illustrated in the Figure 4.

118

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:16 UTC from IEEE Xplore. Restrictions apply.

## Page 4

2023 International Conference on Sustainable Emerging Innovations in Engineering and Technology (ICSEIET)

multi-organization scenario having multiple peers interacting
with the shared ledger. This study not even setup the test
network but also exhibits the approach to evaluate the network
performance. This study proves that hyperledger caliper can be
configured to throw huge workload on the network that too with
different transaction rates and network can be closely
monitored to calculate the overall throughput and latency.
In order to execute the experimental study, two organisations
with two peers each were created. These organisations are
likely to be profit or non-profit institutions or companies. All
peers and organizations were part of a common channel and
have similar chaincode.
Only latency and throughput were used as the metrics for
testing the suggested model. A total of 1100 transactions were
introduced into the Hyperledger network at different rates of
100 and 200 TPS (transactions per second) in order to measure
the throughput and latency. This study demonstrates that the
throughput remains unaffected even after varying the
transaction rates but shift in transaction rates had a slight effect
on the latency.

Fig. 4. Average latency with 200 TPS
This study also computed the throughput by first injecting
transactions at 100 TPS and then 200 TPS. The results are
illustrated in the Figure 5 and Figure 6 respectively.

The only flaw in this study is that it does not track throughput
and latency as organizations and peers multiply. This is known
as scalability, and it will be important to assess how scalability
affects network performance in upcoming research. This study
suggests that the network might be tested with many peers and
many organizations to determine how scalability affects latency
and throughput. Testing the hyperledger network when
transactions originate from a remote place is another
unexplored field of research. Given the need for actual nodes
and cloud services, this would be more difficult.
REFERENCES

Fig. 5. Average throughput with 100 TPS

[1]

[2]

[3]
[4]
Fig. 6. Average throughput with 200 TPS
[5]

It is observed that throughput is 12 TPS regardless of varying
transaction rate, 200 TPS and 100 TPS respectively.
VII. CONCLUSION

[6]

This study is demystifying the way to install and use
hyperledger framework which is one of the most effective
frameworks of blockchain technology. This study also
demonstrates the way to setup a test network which simulates a

[7]

119

R. K. Kaushal, N. Kumar, and S. N. Panda,
“Blockchain Technology, Its Applications and Open
Research Challenges,” J. Phys. Conf. Ser., vol. 1950,
no. 1, p. 12030, Aug. 2021.
B. Bhushan, P. Sinha, K. M. Sagayam, and J. Andrew,
“Untangling blockchain technology: A survey on state
of the art, security threats, privacy services,
applications and future research directions,” Comput.
Electr. Eng., vol. 90, p. 106897, 2021.
S. Aggarwal and N. Kumar, “Core components of
blockchain,” in Advances in Computers, vol. 121,
Elsevier, 2021, pp. 193–209.
C. Walsh, P. O’Reilly, R. Gleasure, J. McAvoy, and K.
O’Leary, “Understanding manager resistance to
blockchain systems,” Eur. Manag. J., vol. 39, no. 3, pp.
353–365, 2021.
Z. Zheng, S. Xie, H. Dai, X. Chen, and H. Wang, “An
overview of blockchain technology: Architecture,
consensus, and future trends,” in 2017 IEEE
international congress on big data (BigData congress),
2017, pp. 557–564.
J. Denny, R. Chanda, S. R. Lenka, A. S. Reddy, and S.
Vallabaneni, “A Web Portal for Student Grievance
Support System,” 2021.
S. Prajapat, V. Sabharwal, and V. Wadhwani, “A

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:16 UTC from IEEE Xplore. Restrictions apply.

## Page 5

2023 International Conference on Sustainable Emerging Innovations in Engineering and Technology (ICSEIET)

[8]

[9]

[10]

[11]

[12]

[13]

[14]

[15]

[16]

[17]

prototype for grievance redressal system,” in
Proceedings of International Conference on Recent
Advancement on Computer and Communication, 2018,
pp. 41–49.
S. Pongnumkul, C. Siripanpornchana, and S.
Thajchayapong, “Performance Analysis of Private
Blockchain Platforms in Varying Workloads,” In2017
26th Int. Conf. Comput. Commun. Networks (ICCCN),
IEEE, pp. 1–6, 2017.
Y. Hao, Y. Li, X. Dong, L. Fang, and P. Chen,
“Performance Analysis of Consensus Algorithm in
Private Blockchain,” IEEE Intell. Veh. Symp. Proc.,
vol. 2018–June, no. Iv, pp. 280–285, 2018, doi:
10.1109/IVS.2018.8500557.
M. Dabbagh, M. Kakavand, M. Tahir, and A.
Amphawan, “Performance Analysis of Blockchain
Platforms: Empirical Evaluation of Hyperledger Fabric
and Ethereum,” in 2020 IEEE 2nd International
Conference on Artificial Intelligence in Engineering
and Technology (IICAIET) . IEEE., 2020, pp. 1–6.
A. A. Monrat, O. Schelen, and K. Andersson,
“Performance Evaluation of Permissioned Blockchain
Platforms,” 2020 IEEE Asia-Pacific Conf. Comput. Sci.
Data
Eng.
CSDE
2020,
2020,
doi:
10.1109/CSDE50874.2020.9411380.
V. Capocasale, S. Musso, and G. Perboli, “A
Blockchain , 5G and IoT-based transaction
management system for Smart Logistics: an
Hyperledger framework,” In2021 IEEE 45th Annu.
Comput. Software, Appl. Conf., pp. 1285–1290, 2021,
doi: 10.1109/COMPSAC51774.2021.00179.
A. Woznica and M. Kedziora, “Performance and
Scalability Evaluation of a Permissioned Blockchain
Based on the Hyperledger Fabric, Sawtooth and Iroha,”
Comput. Sci. Inf. Syst., vol. 19, no. 2, pp. 659–678,
2022, doi: 10.2298/CSIS210507002W.
P. M. Abhishek, D. G. Narayan, H. Altaf, and P.
Somashekar, “Performance Evaluation of Ethereum
and Hyperledger Fabric Blockchain Platforms,” in
2022 13th International Conference on Computing
Communication and Networking Technologies
(ICCCNT),
2022,
pp.
1–5.
doi:
10.1109/ICCCNT54827.2022.9984288.
Y. Liu, K. Qian, K. Wang, and L. He, “BCmaster: A
Compatible
Framework
for
Comprehensively
Analyzing and Monitoring Blockchain Systems in
IoT,” IEEE Internet Things J., vol. 9, no. 22, pp.
22529–22546, 2022, doi: 10.1109/JIOT.2022.3182004.
Kukreja, V., & Dhiman, P. (2020, September). A Deep
Neural Network based disease detection scheme for
Citrus fruits. In 2020 International conference on smart
electronics and communication (ICOSEC) (pp. 97101). IEEE.
Dhiman, P., Kukreja, V., Manoharan, P., Kaur, A.,
Kamruzzaman, M. M., Dhaou, I. B., & Iwendi, C.
(2022). A novel deep learning model for detection of
severity level of the disease in citrus fruits. Electronics,
11(3), 495.

120

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 16:05:16 UTC from IEEE Xplore. Restrictions apply.
