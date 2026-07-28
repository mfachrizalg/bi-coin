---
source_type: pdf
title: "Performance Evaluation of different Hyperledger Sawtooth transaction processors for Blockchain log storage with varying workloads"
original_file: "thesis/reference/Performance_Evaluation_of_different_Hyperledger_Sawtooth_transaction_processors_for_Blockchain_log_storage_with_varying_workloads.pdf"
sha256: "10db49d2136156e14d20535fad16a33fe8f91bb26ab23bdeb757958a194e17db"
page_count: 6
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Performance Evaluation of different Hyperledger Sawtooth transaction processors for Blockchain log storage with varying workloads

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2020 IEEE International Conference on Blockchain (Blockchain)

Performance Evaluation of different Hyperledger Sawtooth transaction
processors for Blockchain log storage with varying workloads
Konstantinos Moschou, Anastasia Theodouli, Dimitrios Karamitros Sotiris Diamantopoulos
EXODUS SA
EXUS Software Limited
Sofia Terzi, Konstantinos Votis, Dimitrios Tzovaras
CERTH / ITI
Thessaloniki, Greece
konsmosc, anastath, sterzi, kvotis, tzovaras@iti.gr

Athens, Greece
London, United Kingdom
dkar@exodussa.com s.diamantopoulos@exus.co.uk

Abstract—Blockchain technology enables the trustless
sharing of distributed ledgers among peers. Despite
having valuable properties like decentralisation, and immutability of transactions, it incurs a high performance
overhead as compared with traditional databases thus
discouraging its further adoption. Even the usage of different transaction processors within the same Blockchain
platform, namely Hyperledger Sawtooth, may result in
different performance, for the same use case and the
same transaction type. This paper proposes a methodology for evaluating the performance of two different transaction processors deployed in the Hyperledger
Sawtooth platform. We evaluated experimentally the
methodology and present the results of the experimental
evaluation which may be useful to blockchain practitioners for future solution designs.

and scalability of Blockchain platforms will result in
further adoption of this technology which currently
laggs behind traditional database systems as regards
these properties.
In this paper, we present our contribution, a
methodology for comparing the performance of two
different transaction processors for the same use case
and transaction type. Such a comparison lacks from
the literature and it could be beneficial for blockchain
practitioners with similar use cases to benefit from this
experience so as to choose a transaction processor for
their specific use case. We also present the preliminary
experimental results of the performance analysis and
draw some conclusions based on the results.
The remainder of this paper is structured as follows. In Section 2 we present similar works that
have made performance analysis between blockchain
platforms. In Section 3 we present the use case of
this work which refers to the storage of logs corresponding to healthcare data exchange operations in
the Blockchain. In Section 4 we present the architecture of the system including its components and the
interactions between them. In Section 5 we present
our methodology for evaluating the performance of
the transaction processors. In Section 6 we present
the experimental results of our analysis. Finally, in
Section 7 we conclude the paper.

Index Terms—blockchain; performance analysis; healthcare data; logging

1. Introduction
Blockchain enables the update of a distributed
ledger by a network of peers in a trustless manner.
Hyperledger Sawtooth is a modular platform that enables to build, deploy, and run distributed ledgers [1]
In Hyperledger sawtooth, transactions make modifications to the blockchain state. The business logic of the
transactions is specified within transaction families. In
Hyperledger sawtooth transactions are included within
batches which can be either committed to the state
altogether or not at all. As such, a batch is an atomic
unit of state change in sawtooth. Transaction processors execute transactions.
Performance and scalability evaluation of
Blockchain Platforms is considered to be an emerging
research topic since ameliorating the performance

978-0-7381-0495-9/20/$31.00 ©2020 IEEE
DOI 10.1109/Blockchain50366.2020.00069

2. Related Work
Nasir et al. [2] evaluate the performance of two
different versions of Hyperledger Fabric, i.e. v0.6 and
v1.0 in terms of scalability, latency, and execution
time by varying the workload of transactions by up
to 10000 for each Platform. They also analyse the
scalability of the two Platforms by varying the number
of nodes up to 20 nodes. The results of their analysis

476

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:48:35 UTC from IEEE Xplore. Restrictions apply.

## Page 2

show that Hyperledger v1.0 outperforms Hyperledger
v0.6
Pongnumkul et al. [3] performed a Performance
analysis between Ethereum and Hyperledger Fabric
for the same transaction types and varying workloads.
The results of the experiments showed that Hyperledger Fabric outperforms Ethereum for all the evaluation metrics and for varying number of workloads.
A limitation of this work is that authors excluded the
impact of the consensus algorithms in the performance
of the evaluated Platforms. As a result, their evaluation
is a best case performance.
As opposed to the work above, Hao et al. [4]
evaluate the performance of two private Blockchain
platforms, namely Ethereum and Hypeledger Fabric
in terms of average latency and average throughput
with and without the consensus algorithm and also
with varying the workload from 1 to 104 transactions.
The results show that the consensus module affect
the performance of both platforms. As regards the
varying workload, the average latency increases for
both platforms when the workload increases and it is
much higher in Ethereum (PoW) compared to Hyperledger Fabric (PBFT). The average throughput is much
higher in Hyperledger Fabric and reaches a peak in the
workload of 100 transactions for both platforms. Finally, as the number of transactions increases, the difference of the average throughput between Ethereum
and Hyperledger Fabric also increases.
As compared to the works mentioned above, we
differ in that the above works compare the performance between different Blockchain platforms or different versions of the same Blockchain Platform, while
we compare the performance between two different
transaction processors of the same Blockchain platform. This paper [5] presents the basic terms and key
metrics that should be used for the evaluation of the
performance of Blockchain platforms. The methodology of our work is partially based on the instruction of
this paper, while it is also tailored to the specificities
of our use case.

there is a need to apply an auditing mechanism. A
blockchain-based auditing mechanism will store the
operations as immutable transactions and as such even
if an attacker modifies or deletes the data from the
OpenNCP database, there will be an immutable log in
the Blockchain disabling actors from repudiating their
critical actions.

4. Architecture and Components
In this section we describe the architecture of the
system, the components, and their interactions
•

Validator
–
–
–

•

Services
–

•

–
•

–
–

•

Enables the execution of Ethereum
Smart Contracts written in Solidity programming language [6] within the Sawtooth platform using the Hyperledger
Burrow implementation of the sawtooth
Ethereum Virtual Machine
A Smart contract within the Processor
stores the logs to the Blockchain

Golang Rest API
–

In frames of the KONFIDO project, there are
two National Contact Points, hereafter NCPs. In the
first NCP there are some data stored, while in the
second NCP an operation is performed so as to retrieve
data from the first NCP. The operation corresponds to
a data exchange between the two NCPs. Healthcare
data are highly sensitive and some operations regarding the healthcare data exchange are critical; as such,

A middleware node.js server which receives logs from the external component, transforms them to batches of
transactions and submits them to the
Services

SETH Transaction Processor
–

3. Use Case: OpenNCP ATNA logs and
Blockchain log storage

A generic RESTful API built-in Sawtooth used to connect clients with the
Validator

Node.js RESTful API
–

•

Validates batches of transactions
Combines transactions into blocks
Maintains consensus within the network

Allows the reception and transformation of incoming logs from the external
component to Sawtooth transactions
Implements all the business rules for
the transaction, by validating the transaction contents
Submits the formed transaction to the
validator for further processing and
storage on the ledger

Golang transaction processor

477
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:48:35 UTC from IEEE Xplore. Restrictions apply.

## Page 3

–

•

KONFIDO explorer. This is a user Interface
enabling users to:
–
–
–

–

•

•

•

•

Implements the definition and processing aspect of a Golang transaction family. The Golang family defines, enforces
and processes the defined transaction
specification. When a validator receives
such a transaction from the REST API
and Services layers, the transaction is
sent to the Golang processor for validation; if the transaction is properly
formatted, the validator adds the transaction to a block.
Fig. 1 Components of the architecture.

To view KPIs about the Blockchain
(number of blocks, number of logs,
etc.)
search for specific logs using various
criteria
decrypt logs by calling the intermediate encryption module; only the sender
and the receiver of the operation corresponding to the log are able to decrypt
the logs and see its content since they
possess the private keys with which the
encryption of the log was done
check the integrity of logs that reside
in the Blockchain; even if deletions or
modifications happen by e.g. a malicious administrator in the local OpenNCP database, there is a proof in the
Blockchain that the log indeed exists.

The logs are collected from openNCP and then
operations corresponding to critical actions are filtered
by an external filtering tool which transforms the logs
from XML to JSON. Then an intermediate module
encrypts the logs and posts the encrypted logs together
with the log metadata which are allowed to be sent as
plaintext since they do not constitute sensitive data to
two endpoints
•

•

the Node.js RESTful API which acts as a
middleware between the encryption module
and the SETH transaction processor
the Golang REST API which which acts as
a middleware between the encryption module
and the Golang transaction processor

5. Methodology

Settings Transaction Processor. This transaction processor is used for storing configuration
settings on-chain. It is necessary to register this
transaction processor with each validator of the
network.
PoET validator registry transaction processor.
This transaction family enables the registration
of new validators to the network when the
PoET consensus algorithm is used by the network to agree on valid blocks. An introduction
to the PoET consensus algorithm is presented
in subsection 5.3 below.
PoET engine. This is the consensus engine
when the PoET consensus algorithm is used
by the network.
Blockinfo transaction family is used to provide
information about historic blocks. This transaction family was used to append timestamp
information for each Block.

5.1. Infrastructure set-up
We conducted the experiments on a VM set up in
an Azure cloud computing service which runs Ubuntu
16.04, 16GB RAM, with a 2.4 GHz Intel Xeon processor, having 4 cores and 80 GB disk.

5.2. Dataset
To test the performance of the transaction processors, we used a RESTful client to post a batch
of transactions to the Node.js REST API and to the
Golang REST API, respectively.
For the Node.js REST API and the SETH transaction processor, the transactions were formed as JSON
objects and contained both metadata, i.e. the sender
of the operation, the receiver of the operation, the
type of operation, the outcome of the operation, the
hash of the original message which was used to check
the integrity of the message, and the actual encrypted

A schematic representation of the architecture and
the components is presented in Figure 1.

478
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:48:35 UTC from IEEE Xplore. Restrictions apply.

## Page 4

message. It is worth noting that due to a problem we
encountered in the version 0.2.3 of the seth transaction
processor which caused an accumulative growth in
the disk size consumed by the container hosting the
seth transaction processor with regard to the size of
each log, the message is a uuid constructed with
the JavaScript faker library [7], instead of the actual
encrypted message posted by the encryption module.
Figure 2 below shows the structure of the logs that
are sent to the Blockchain.

1)

2)

PoET simulator mode. PoET refers to an
alternative to Proof of Work that provide
Byzantine Fault Tolerance (BFT) consensus
at a lower energy consumption than PoW.
PoET uses secure instruction execution running on an SGX. The PoET simulator runs
on a simulated SGX.
Dev consensus algorithm is a random-leader
algorithm which should be used for development and testing purposes.
Parameter
Trx/batch, N
Number of validators, K
Consensus mechanism
Transaction scheduler

Default value
100
5
PoET (simulator)
parallel

TABLE 1: Parameters of the system and their default
values
Fig. 2 Structure of the logs stored in the Blockchain

6. Experimental Evaluation

The same transactions formulation corresponds to
the Golang REST API and the Golang transaction
processor.

In this section, we assess the performance of both
transaction processors in terms of the execution time
and for different values of the parameters. Furthermore, we conducted an experiment to see the impact
of the number of validators and of the type of the
transaction scheduler used (either parallel, or serial) in
the execution time for the SETH transaction processor
only. The results of this experiment appear in Tables
6 and 7.
The conclusions drawn from the experimental
analysis are the following:
1) Using SETH as a transaction processor has
the benefit of portability as regards Ethereum
developers with knowledge of programming
Smart Contracts with the Solidity programming language; however, as we can see the
execution times for the same transaction type
are much higher when executing a transaction with the SETH transaction processor as
compared to the execution with the custom
GoLang transaction processor for all the configuration of the parameters, showing that
there is a clear winner between the two in
terms of performance.
2) DEV mode has higher execution times than
the PoET simulator mode
3) There is an increase in the execution times
when increasing the number of validators,
from K =5 to K =10.
4) There is overall an increase in the execution
times when changing the transaction scheduler from parallel to serial which shows a

5.3. Evaluation metric, Workloads, and Parameters of the system
We varied the number of transactions from 10
to 100 and measured the execution time needed for
the transactions to be confirmed by the Blockchain
network. To measure the time needed for the confirmation of the transactions, we created a subscriber
having an event type=’sawtooth-block-commit’. This
event is emitted by the Validator when a block is
committed. The events are submitted and serviced by
the Validator using a ZMQ socket available in the
Validator messaging protocol [8]. Note that the time
needed to send the block commit event from the Validator to the subscriber is considered to be negligible
since they are both on the same virtual machine and
as such there are not any network delays. In Table
1 below, we present the parameters we varied and
their default values. The transaction scheduler can be
either serial or parallel. When using serial transaction
scheduler, the execution of a transaction is blocked
until the previous transaction has finished execution,
while in parallel transaction scheduling a subsequent
transaction that has no dependencies with the current
transaction can be executed in parallel with the current
transaction that has been sent for execution.
During our experiments, we used two different
types of consensus algorithms for our setting.

479
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:48:35 UTC from IEEE Xplore. Restrictions apply.

## Page 5

5)

Validators

benefit of leveraging the feature of parallel
transaction execution.
There is an increase in the execution times
when the workload is higher, i.e. when ranging the Trx/batch from 10 to 100.
Transaction Processor
SETH
Golang

Transactions
10
100

Execution time (msec)
55134
2377

6787,2
64515

19152
66503

The next steps are to repeat the experiments for
different consensus algorithms [9] and for different
workloads so as to evaluate the performance of the
system, for each of the two transaction processors,
for larger datasets and under various different configurations in general. We will also investigate other
metrics such as (average) throughput, and (average)
latency and also explore and document the capabilities of available tools for measuring performance of
Hyperledger Sawtooth Blockchain networks, such as
Hyperledger Caliper [10].

Execution time (msec)
118033
3365

TABLE 3: Measured Execution times for SETH and
Golang transaction processor for the default parameter
values except for consensus mechanism=DEV
Transaction Processor
SETH
Golang

10

TABLE 7: Execution time (msecs) for SETH transaction processor when varying number of validators, consensus algorithm=PoET, transaction scheduler=parallel

TABLE 2: Measured Execution times for SETH and
Golang transaction processor for the default parameter
values
Transaction Processor
SETH
Golang

5

Acknowledgment

Execution time (msec)
3175032
47445

Authors acknowledge support from the European
Union’s Horizon 2020 research and innovation programme under grant agreement No 727528 (KONFIDO) and No 857223 (Gatekeeper).

TABLE 4: Measured Execution times for SETH and
Golang transaction processor for the default parameter
values except for N =1000 Trx/batch and consensus
mechanism=DEV

References
Transaction Processor
SETH
Golang

Execution time (msec)
66503
4228

TABLE 5: Measured Execution times for SETH and
Golang transaction processor for the default parameter
values except for k =10 validators
Validators
Transactions
10
100

5

10

8311
68724

18956
90773

TABLE 6: Execution time (msecs) for SETH transaction processor when varying number of validators, consensus algorithm=PoET, transaction scheduler=serial

7. Conclusions and Future Work
This paper presents a performance analysis between two transaction processors deployed on a Hyperledger Sawtooth network.

[1]

“Hyperledger,”
https://www.hyperledger.org/projects/
sawtooth, accessed: 2019-10-31.

[2]

Q. Nasir, I. A. Qasse, M. Abu Talib, and A. B. Nassif, “Performance analysis of hyperledger fabric platforms,” Security
and Communication Networks, vol. 2018, 2018.

[3]

S. Pongnumkul, C. Siripanpornchana, and S. Thajchayapong,
“Performance analysis of private blockchain platforms in varying workloads,” in 2017 26th International Conference on
Computer Communication and Networks (ICCCN). IEEE,
2017, pp. 1–6.

[4]

Y. Hao, Y. Li, X. Dong, L. Fang, and P. Chen, “Performance
analysis of consensus algorithm in private blockchain,” in
2018 IEEE Intelligent Vehicles Symposium (IV). IEEE, 2018,
pp. 280–285.

[5]

“Hyperledger
blockchain
performance
metrics,”
https://www.hyperledger.org/learn/publications/
blockchain-performance-metrics, 2020, accessed: 202010-04.

[6]

“Solidity,” https://solidity.readthedocs.io/en/latest/, 2016, accessed: 2020-07-15.

[7]

Marak Squires, “Faker.js,” https://github.com/marak/faker.js,
2017, accessed: 2020-07-15.

[8]

“About event subscriptions,” https://sawtooth.hyperledger.org/
docs/core/releases/latest/app developers guide/about event
subscriptions.html, accessed: 2019-10-30.

480
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:48:35 UTC from IEEE Xplore. Restrictions apply.

## Page 6

[9]

“Sawtooth
faq
consensus
algorithms,”
https://sawtooth.hyperledger.org/faq/consensus/
#what-consensus-algorithms-does-sawtooth-support,
accessed: 2020-07-15.

[10] “Caliper,” https://www.hyperledger.org/use/caliper, 2020, accessed: 2020-07-15.

481
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:48:35 UTC from IEEE Xplore. Restrictions apply.
