---
source_type: pdf
title: "A framework for Anti-Money Laundering based on AI and SATP in CBDC Transactions"
original_file: "thesis/reference/A_framework_for_Anti-Money_Laundering_based_on_AI_and_SATP_in_CBDC_Transactions.pdf"
sha256: "0ef7bbdb0193c994684f4cbc591795645b7ae6ffd5ba9dedc71ce76d735ab30d"
page_count: 7
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: A framework for Anti-Money Laundering based on AI and SATP in CBDC Transactions

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2025 IEEE International Conference on Big Data and Smart Computing (BigComp) | 979-8-3315-2902-4/25/$31.00 ©2025 IEEE | DOI: 10.1109/BigComp64353.2025.00049

2025 IEEE International Conference on Big Data and Smart Computing (BigComp)

A framework for Anti-Money Laundering based on
AI and SATP in CBDC Transactions
Soyoung Kim, Harang Lee, Keecheon Kim*
Dept. IT Convergence and Information Security, Smart ICT Convergence, Computer Science
Konkuk University
Seoul, South Korea
ypd07026@gmail.com, migka6@gmail.com, kckim@konkuk.ac.kr*

international transactions must meet interoperability, security,
and privacy requirements.

Abstract— Central Bank Digital Currency (CBDC) is
emerging as a pivotal element of next generation financial
innovation, with the digitalization of financial transactions
accelerates. Many countries are actively exploring the
implementation of CBDCs for retail and wholesale settings and
their potential in international financial transactions. Regulatory
compliance has become paramount in these evolving payment
systems as concerns about money laundering have grown. This
paper highlights the need for real-time transaction monitoring
and suspicious activity detection systems while proposing an
efficient approach to balance privacy protection and regulatory
compliance. In this study, we introduce an integrated
architecture that combines CBDCs with Secure Asset Transfer
Protocol (SATP) systems. It utilizes AI-based prevention and
detection techniques. This approach aims to enhance privacy
over existing approaches, tailored to international transactions
and large financial institutions, while improving the effectiveness
of anti-money laundering measures.

To address these requirements, this study proposes an
integrated anti-money laundering and detection system that
combines privacy data collection and processing methods with
Secure Asset Transfer Protocol (SATP), smart contracts,
machine learning-based real-time monitoring systems, and AIbased detection using SATP log data. The system is designed
to meet the requirements of international transactions and large
financial institutions using distributed ledger storage, private
environment, tokenized format, and an intermediary CBDC
structure. To balance privacy protection and regulatory
requirements, a multilayer security framework is applied to
perform real-time detection by integrating rule-based AML
systems and machine learning model. Moreover, SATP log
data is stored in a graph database, and post-transaction
detection is enabled using a deep learning model.

Keywords— CBDC, AML, SATP, AI, Random Forest, GCN,
Privacy Protection

II. RELATED WORK
A. Secure Asset Transfer Protocol
SATP is an internet draft under development by the IETF,
designed to securely transfer digital assets based on a trusted
gateway [8]. The protocol is built to meet four key
characteristics and can satisfy atomicity, independence,
durability, and interoperability. The operation of SATP can be
divided into three stages. The first is the initiation phase, where
the process of transferring assets from one gateway to another
is initiated. Asset lock and evidence steps involves sending a
signed confirmation to the receiving gateway to indicate that
the asset is locked in the source network, preventing doublespending. Lastly, the commitment establishment stage finalizes
the transfer, as the asset is destroyed in the source network, and
a new asset is created in the target network, completing the
transfer [9].

I. INTRODUCTION
In recent years, Central Bank Digital Currency (CBDC) has
emerged as a key component of next-generation financial
innovation, accelerating the digitization of financial
transactions [1]. Many countries are actively considering the
introduction of CBDCs, exploring not only retail but also
wholesale CBDCs and their potential applications in
international financial transactions [2],[3],[4]. While the
introduction of these new digital currencies has the potential to
enhance financial efficiency and increase transparency in
economic activities, it also underlines the growing importance
of regulatory compliance, particularly in Anti-Money
Laundering(AML) efforts [5].
AML, counter-terrorist financing (CTF), and fraud
detection are critical challenges in global finance [6]. These
challenges need to be integrated into new payment methods
such as CBDCs. Since CBDCs facilitate large-scale funds
transfers, it is crucial to implement automated systems that
detect and report transactions exceeding regulatory thresholds.
This highlights the need for real-time transaction monitoring
and suspicious activity detection systems [7]. Furthermore,
transactions between large financial institutions and

2375-9356/25/$31.00 ©2025 IEEE
DOI 10.1109/BigComp64353.2025.00049

Previous research shows that SATP operates correctly
across various distributed ledgers, utilizing smart contracts for
the SATP bridge, showing that it operates without dependency
on any specific ledger [10]. Moreover, studies that
implemented SATP for CBDCs usage in virtual environments,
such as a Hyperledger Fabric network and a private Ethereum
network show that it can be successfully applied with minimal
overhead [11]. Based on these prior works, this study assumes

207

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:04 UTC from IEEE Xplore. Restrictions apply.

## Page 2

SATP's suitability for CBDCs environments and proposes
practical and specific solutions for AML prevention and
detection within such a framework.

an AML system that includes real-time anomaly detection
using machine learning techniques and post-transaction
detection using graph networks.

B. Data and AI Techniques for Money Laundering Detection
Money laundering generally consists of three stages: Batch,
stratification, and Integration. Detection at the batch stage is
the most effective in preventing illegal activities. To this end,
an alert generation system, which is the first step in identifying
suspicious transactions, uses a rule-based approach or AI to
automatically detect suspicious transactions. Rule-based AML
systems typically detect predefined categories such as
transactions over $10,000, overseas remittances, and money
laundering-related activities, but have difficulty identifying
new patterns and have limitations in processing both structured
and unstructured data in large quantities. To overcome these
limitations, AI systems are used and commonly categorized
into Link Analysis, Behavioral Modeling, Risk Scoring,
Anomaly Detection, and Geographic Capability [12]. Anomaly
Detection involves learning normal and abnormal patterns to
identify suspicious transactions employing various machine
learning models [13],[14].

III. PROPOSED FRAMEWORK
The proposed architecture integrates a SATP-based transfer
network into the CBDC environment to ensure safe and
efficient asset transfers. To prevent and detect money
laundering, the system employs a real-time machine learningbased detection system integrated with an AML system. The
system leverages SATP bridge-based smart contracts to handle
money-laundering-related tasks. Furthermore, the GCN-based
AI model is enhanced to more effectively detect complex
money laundering patterns. Privacy protection is a key
consideration, such as using only the minimum amount of
personal data needed for AML purposes and employing a
hierarchical security framework with controlled access rights.
This approach minimizes risks associated with a single security
approach and ensures interoperability with different regulatory
frameworks and network environments. Overall, the system
provides a solution for secure and flexible asset transfers in
large and international CBDC networks.

Link Analysis, on the other hand, focuses on detecting
suspicious patterns by analyzing the relationships among
different entities within a financial network. This method can
detect complex money-laundering transactions that do not
appear suspicious as standalone transactions but reveal illegal
activities when examined in the context of the network [15].
Link Analysis leverages graph networks to detect suspicious
behavior, and detection using Graph Convolutional
Networks(GCN) is particularly effective in identifying
relationships among multiple agents [16]. GCN performs
convolution on graphs containing nodes representing agents
and edges representing relationships, making them well-suited
for relationship inference [17],[18]. In this study, we propose

The architecture summarized in Fig. 1 consists of two main
networks: the CBDC network and the SATP-based transfer
network working with conjunction with external systems to
facilitate asset transfers and AML mechanisms. In the CBDC
network, the central bank is responsible for the issuance and
management of CBDCs, while the information processing
system ensures the protection and management of user data.
Intermediaries process user transaction requests and integrate
them with the AML system to detect suspicious activities using
a real-time machine learning-based detection system. These
systems are also integrated with external AML regulatory
agencies to monitor transactions and ensure regulatory
compliance. The SATP-based transfer network, using the

Fig. 1. AML system design architecture in CBDC

208
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:04 UTC from IEEE Xplore. Restrictions apply.

## Page 3

SATP bridge, mediates asset transfers and enforces AML rules
through smart contracts. The SATP gateway handles asset
transfers between networks, and databases related to AML and
graph data support the detection and analysis of money
laundering patterns. External systems, such as regulatory
actions, oversee suspicious transactions and enforce regulatory
measures, while a GCN-based AI model analyzes the graph
database to detect and recognize money laundering patterns.
This network allows users to transfer assets and submit
transaction requests, while external systems support crossnetwork asset transfers, maintaining interoperability. Thus, The
architecture facilitates secure asset transfers, privacy
protection, and robust AML detection mechanisms in a CBDC
environment designed for large-scale international transactions.

Fig. 2. CBDC network system flowchart

unnecessary sharing of personal and transaction information
can be minimized by preventing information used for SATP
communication from being directly connected to the CBDC
distributed ledger.

A. Design of the CBDC Network System from the Perspective
of Privacy Protection
Privacy protection is not always be a mandatory factor
when considering system performance and technical suitability,
but it becomes an important consideration when CBDC
network systems are provided to actual users [19]. Ensuring
robust privacy protection helps prevent user reluctance and
ensures compliance with existing laws and regulations.
Therefore, it is important to design the system in a way that
meets regulatory requirements while protecting the privacy of
users [20]. Each internal system and institution should be given
only the minimum access required to fulfill their role.
Moreover, the degree and level of information exposure should
be adjusted according to the phase of the CBDC, the institution
involved, and the specific role they play to include only
information necessary for AML compliance and related tasks.

Fig. 2 illustrates the privacy-protected CBDC network
system. First, users register their personal information, such as
Know Your Customer(KYC) information, with intermediaries
to issue digital wallets. The intermediary institution forwards
the personal data to the information processing system, where
it is stored and pseudonymized. The intermediary institution
then transmits only the minimal necessary information, in
pseudonymized form, to the central bank for the issuance of a
digital wallet. The central bank issues the digital wallet based
on the information received and this is relayed back to the
intermediary institution. At this stage, only the wallet identifier
or address is sent, with no personal information included.
When a transaction is made, the user requests the transaction
through the intermediary institution. The intermediary retrieves
the pseudonymized personal data from the information
processing system and sends it to both the CBDC distributed
ledger and the SATP system. In the CBDC distributed ledger,
the information is pseudonymized and encrypted before being
stored, while in the SATP bridge gateway, it is used as sender
and receiver IDs. This ensures that transaction and personal
information are properly protected and shared only when
necessary, in compliance with privacy regulations.

To achieve this, the collection and processing of personal
data during the issuance and wallet access stages is limited to
trusted intermediaries. This personal data is stored separately
from the CBDC distributed ledger of the trusted information
processing system, which enhances privacy protection. It is
recommended that the collected personal data be anonymized
using techniques such as Privacy Enhancing Technologies
(PET), and transaction information must be encrypted and
hashed before storage. When integrating SATP with a CBDC
system, it is necessary to verify the identities of both the sender
and receiver independently of the CBDC distributed ledger to
establish trust between the two gateways. In this process,
personally identifiable data can be replaced by pseudonymized
data, utilizing zero-knowledge proof techniques to maximize
privacy protection.

B. AML with Smart Contracts and Machine Learning-Based
Real-Time Monitoring System
In this paper, we propose an AML system incorporating a
machine learning-based real-time monitoring system.
However, invoking the AML system for all transactions can
result in significant system overhead in real time. To prevent
this and enhance efficiency, we apply AML rules separately
from asset transfer rules to activate the machine learning-based
real-time monitoring system only for suspicious transactions.
As shown in Fig. 3, after step 0 of the SATP protocol (pretransaction), the AML smart contract is executed in the SATP
bridge [21]. If suspicious signs related to money laundering are
detected, the information processing system and SATP bridge
gateway collect relevant information and pass it to the machine
learning-based detection system for analysis and reporting. The
AML smart contract in the SATP bridge evaluate the
possibility of money laundering based on three key conditions:
1) the number of transactions initiated by the sender within a

In addition, the SATP operates independently of the
distributed ledger and functions as a secure asset transfer
method across ledgers. Therefore, the pseudonymized
information on the CBDC distributed ledger and the
sender/receiver ID information within the SATP need not be
directly linked. When a transaction is initiated, the
intermediary institution requests personal information from the
information processing system, which generates new
pseudonymized information distinct from the CBDC
distributed ledger and stores it. This pseudonymized
information is then passed to the intermediary institution,
which uses it in the SATP bridge gateway as sender and
receiver IDs to verify identities. Using this approach,

209
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:04 UTC from IEEE Xplore. Restrictions apply.

## Page 4

limit, additional warning is issued. These thresholds are
adjustable based on the standards set by central banks or AML
agencies and are incorporated into the SATP bridge smart
contracts.
One of the main issues that can arise when using machine
learning models is mismatched data types and missing values.
However, the SATP-based transaction system uses
standardized data formats, so such issues are minimized. The
real-time machine learning-based detection system processes
data from SATP by converting categorical variables into
numerical formats, as outlined in TABLE Ⅰ, making the data
suitable for machine learning. The machine learning detection
system employs a Random Forest model f or real-time money
laundering detection. The results are then reported to the AML
agency, and personal data is discarded after processing. The
AML system can be operated by intermediary institutions or
third-party AML agencies, and strict compliance with privacy
protection laws and regulations is ensured throughout the
process.

Fig. 3. Schematic of anti-money laundering system

specific timeframe, 2) the recipient’s region, and 3) the
transaction amount. If any of these conditions indicate a
potential for money laundering, the system immediately reports
to the AML system. The AML smart contract in the SATP
bridge operates as outlined in Algorithm 1.
First, the smart contract receives the necessary dataset for
AML anomaly detection. The parameter Σ<AML_PARAMS>
includes the transaction amount and pre-transaction balance,
which are not necessary for the SATP asset transfer process but
are added for AML purposes. This data is transmitted to the
SATP network with pseudonymized information at the start of
the transaction and is discarded upon completion. Next, the
system checks whether the recipient is in a high-risk area based
on the AML database. If the recipient is located in such a
region, a warning is sent to the AML system. The transaction
frequency of the sender is recorded in the AML database and
incremented with each new transaction. If this frequency
exceeds a certain threshold, a warning is triggered.
Additionally, if the transaction amount exceeds a predefined

C. Utilizing SATP Bridge Data for AI-Based Graph Detection
In this paper, we propose a GCN-based model for detecting
money laundering, as illustrated in Fig. 4. For this model to
function, it requires node data, which is used to construct the
feature matrix, and edge data, which forms the adjacency
matrix. The data is fetched from the SATP bridge and stored in
a graph database (GDB). In this study, we use Graph databases
rather than regular databases and it allows for easier data
manipulation without requiring complex table joins or
constraints, enabling rapid searches and queries. This structure
is ideal for efficient money laundering detection as it allows for
intuitive modeling and simplifies the process of handling data.
The node and edge data stored in the graph database is then
used as input for the GCN, which performs link analysis on the
graph data. The format of the node and edge data used for posttransaction money laundering detection in the SATP-based
transaction system is shown in TABLE Ⅱ.

Algorithm 1 AML Related Smart Contract
Input:

AML_REQUEST,

senderID,

receiver_gateway_network_id,

timestamp, Σ<AML_PARAMS>, requestHash
Output: Transaction Status, alerts Triggered, return Value

The input data of GCN consists of nodes representing the
sender, receiver, and transaction details, and edges representing
the relationships between these nodes. Moreover, to effectively
detect not only simple money laundering patterns but also
complex patterns involving multiple agents, we employ

1: senderChannelID ← my_channel_id(senderID)
2: satp_channels[senderChannelID].status = AML_VERIFIED
3: if receiver_gateway_network_id in amlDatabase.isHighRisk then 1)
4: AlertAMLSystem(“Warning: Receiver in high-risk zone”)
5: satp_channels[senderChannelID].status = AML_FALSE
6: end if
7: if Timer > maxTime then
2)
8: for sender in amlDatabase do
9:
amlDatabase.resetAllFrequencies()
10: end for
11: end if
12: amlDatabase.incrementTransactionFrequency(senderID)
13: currentFrequency = amlDatabase.getTransactionFrequency(senderID)
14: if currentFrequency > maxTransactionFrequency then
15: AlertAMLSystem(“Warning: Transaction frequency exceeded”)
16: satp_channels[senderChannelID].status = AML_FALSE
17: end if
18: if amount > transactionLimitThreshold then
3)
19: AlertAMLSystem(“Warning: Transaction limit exceeded”)
20: satp_channels[senderChannelID].status = AML_FALSE
21: end if
22: return true

TABLE I.

MACHINE LEARNING-BASED REAL-TIME DETECTION DATA

Column Name

Data Type

Example

Timestamp

UNIX
timestamp

1725208800

Transaction

float32

100000

Pre-Transaction Balance

float32

100000

Sender Id

object

fdw34567uyhgfer45

Receiver Id

object

asn14623uabgwdl11

Digital asset Id

object

ghytreedcfvbhfr

Asset profile Id

object

nbvcwertyhgfdsrty

Sender Gateway Network Id

object

originNETsystem

Receiver Gateway Network Id

object

nbvcwertyhgfdsrty

210
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:04 UTC from IEEE Xplore. Restrictions apply.

## Page 5

prevents unnecessary exposure by immediately deleting
sensitive data after each transaction. This approach allows the
system to fully comply with legal requirements such as privacy
laws. AML systems request privacy only, when necessary,
which significantly reduces the risk of data leakage. Moreover,
after each transaction is completed, privacy is not recorded in
the SATP log and is automatically discarded, thus keeping
privacy collection and preservation at least [22].
B. Evaluation of Interoperability
The proposed architecture is designed to operate seamlessly
in various network environments and regulatory conditions,
ensuring interoperability between different systems. As SATPbased transfer networks do not rely on specific distributed
ledgers, they can flexibly support asset transfers between
countries and systems, thus ensuring smooth international fund
transfers. Moreover, SATP bridges and gateways support data
transfers between different systems, further maximizing
interoperability between systems. However, because AML
regulations vary between countries and CBDC networks, it is
recommended that AML functions be operated as separate
systems without directly embedded within the SATP. By
applying the SATP bridge within the CBDC network and
connecting AML systems through smart contracts, the
architecture further strengthens the flexibility and scalability of
the system while maintaining interoperability in various
environments.

Fig. 4. GCN-based post-detection system
TABLE II.
Inform
ation

NODE AND EDGE INFORMATION USED FOR GRAPH DATASET
Column Name

Data Type

Example

Sender Id

object

fdw34567uyhgfer45

Reciever Id

object

asn14623uabgwdl11

Sender Id

object

fdw34567uyhgfer45

Timestamp

UNIX
timestamp

1725208800

Edge

Node

Transaction

float32

100000

Pre-Transaction
Balance

float32

100000

Digital asset Id

object

ghytreedcfvbhfr

Asset profile Id

object

xjkpzlmnqrst

object

plmnxowqrstv

object

acbdghijklmn

Sender Gateway
Network Id
Receiver Gateway
Network Id

C. Performance Evaluation of Real-Time Machine LearningBased AML System
The total latency for the proposed AML system, denoted as
, is as follows:
(1)

a combination of GCN and temporal network models. Relying
solely on a GCN has limitations of not being able to properly
address new or inactive nodes in a graph. To overcome this
limitation, this study proposes a hybrid approach using both
GCN and Gated Recurrent Unit (GRU) networks.

where
is delay generated in the smart contract related to
AML,
is delay generated in communication between
systems,
is delay generated during data processing,
is
delay generated in AI-based real-time AML detection, α
accounts for factors such as network congestion or hardware
errors.

In this approach, node embeddings are fed into the GRU
network. This setting allows the GRU to dynamically update
the parameters of the GCN, making them better suited for the
system to learn the dynamic changes of new or inactive nodes.
Moreover, we use an attention mechanism that dynamically
selects the most important nodes to capture the unique features
of each node in different graphs. This attention-based
mechanism improves the system's ability to detect complex
money laundering patterns by extracting deep relationships
between nodes. Combining GCN with GRU and attention
mechanisms, the model can be used to continuously monitor
and track suspicious transactions. This model can be used to
continuously track and monitor the whereabouts of objects for
which abnormal transactions have been detected or recorded
using a machine learning-based real-time detection model.

Total latency for the SATP system is denoted as
,
which is the delay generated during SATP communication in
stages 1 to 3. For the system to be considered performing well,
it must satisfy the condition,
(2). Therefore, a
TABLE III.
Type

IV. EXPERIMENTS AND EVALUATION
A. Evaluation of Privacy Protection
The proposed architecture minimizes the use of privacy and

MEASURED DELAY TIMES OF THE PROPOSED AML SYSTEM
Delay Location
SATP Bridge, smart contract
internal and related database
SATP Bridge, information
processing

Delay Time
Approx. 0.147 s
Approx. 0.173 s

Internal of AML detection system

Approx. 0.002 s

Internal of AML detection system

Approx. 0.006 s

SATP Gateway, inter-gateway
communication

Approx. 2.5 s

211
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:04 UTC from IEEE Xplore. Restrictions apply.

## Page 6

simplified SATP network and the proposed AML system were
implemented in an Ubuntu Docker environment with
PostgreSQL DB integration and the delay times were measured
as shown in TABLE Ⅲ. In the measurement results, the

role in enhancing the long-term stability and reliability of the
financial system. It is also expected to significantly improve
the transparency and efficiency of financial transactions by
providing the technical foundation necessary for the
introduction and operation of CBDCs.

coefficient was excluded, and according to (1),
was
approximately 0.328 seconds, while
was around 2.5
seconds. This confirms that the proposed AML system
operates smoothly within the SATP-integrated environment.

Future work will focus on fully implementing the proposed
architecture and evaluating a wider range of performance
metrics and use cases. In addition, we will build the SATP log
dataset from the implemented architecture and use this dataset
to compare and analyze the performance of different detection
model. This will contribute to further validate the performance
of the system in real financial environments and to design
better detection model by comparing the performance of
machine learning and deep learning-based detection model in
real financial transaction scenarios.

D. Evaluation of Post-Transaction Detection AI Model Using
Graph Dataset
To verify the system’s efficiency and feasibility, node and
edge data from the Elliptic Dataset of cryptocurrency
transactions were used [23]. In this study, we used 45,645 data
consisting of illegal and legal classes excluding a “unknown”
class. The data was split into 70% for training and 30% for
evaluation, with training conducted over 100 epochs using a
batch size of 64. The performance metrics used to evaluate the
proposed method, EvolveGCN+, include precision, recall, and
F1-score, and the evaluation results are shown in TABLE Ⅳ.
TABLE IV.

REFERENCES
[1]

Lamberty, R., Kirste, D., Kannengießer, N., and Sunyaev, A.
"HybCBDC: A Design for Central Bank Digital Currency Systems
Enabling Digital Cash," IEEE Access, 2024.
[2] Bank of Korea. "A step toward new financial market infrastructure:
Bank
of
Korea’s
initiative,"
2023.
Available:
https://www.bis.org/publ/othp77.pdf.
[3] V. Ramakrishna and T. Hardjono, "Secure Asset Transfer (SAT) Use
Cases," IETF Internet-Draft, draft-ietf-satp-usecases-03, Aug. 2024.
Available: https://datatracker.ietf.org/doc/draft-ietf-satp-usecases/.
[4] Kalal, J., Palande, C. B., Rajpurohit, S. C., and Parkhi, S. "A
Comparative Analysis of Global Central Bank Digital Currencies," 2023
International Conference on Decision Aid Sciences and Applications
(DASA), pp. 417-420, 2023.
[5] Li, Z., Zhang, Y., Wang, Q., and Chen, S. "Transactional Network
Analysis and Money Laundering Behavior Identification of Central
Bank Digital Currency of China," Journal of Social Computing, vol. 3,
no. 3, pp. 219-230, 2022.
[6] Song, H. J. “A Study on the Tooling of Money Laundering Using
Cryptocurrency,” Journal of the Society of Disaster Information, vol. 17,
no. 3, pp. 600–607, Sep. 2021.
[7] Samudrala, R. S., and Yerchuru, S. K. "Central bank digital currency:
risks, challenges and design considerations for India," CSI Transactions
on ICT, vol. 9, pp. 245-249, 2021.
[8] M. Hargreaves, T. Hardjono, V. Ramakrishna, "Secure Asset Transfer
Protocol (SATP) Core," IETF Internet-Draft, draft-ietf-satp-core-05,
Sep. 2024. Available: https://datatracker.ietf.org/doc/draft-ietf-satp-core/.
[9] T. Hardjono, M. Hargreaves, N. Smith, and V. Ramakrishna, "Secure
Asset Transfer (SAT) Interoperability Architecture," IETF InternetDraft,
draft-ietf-satp-architecture-05,
Aug.
2024.
Available:
https://datatracker.ietf.org/doc/draft-ietf-satp-architecture/.
[10] Marstein, K.-E., Chiriac, A., Riley, L., et al. "Implementing Secure
Bridges: Learnings from the Secure Asset Transfer Protocol," 2023
IEEE International Conference on Blockchain and Cryptocurrency
(ICBC), pp. 1-9, 2023.
[11] Augusto, A., Belchior, R., et al. "CBDC Bridging between Hyperledger
Fabric and Permissioned EVM-based Blockchains," 2023 IEEE
International Conference on Blockchain and Cryptocurrency (ICBC),
2023.
[12] Kute, Dattatray Vishnu, et al. "Deep learning and explainable artificial
intelligence techniques applied for detecting money laundering–a critical
review." IEEE Access, vol. 9, pp. 82300-82317, 2021.
[13] Alsuwailem, Alhanouf Abdulrahman Saleh, and Abdul Khader Jilani
Saudagar. "Anti-money laundering systems: a systematic literature
review." Journal of Money Laundering Control, vol. 23, no. 4, pp. 833848, 2020.
[14] Breiman, Leo. "Random forests." Machine Learning, vol. 45, no. 1, pp.
5-32, 2001.

PERFORMANCE EVALUATION OF THE PROPOSED MODEL
Model

Evaluation Criteria
Accuracy

Recall

F1 Score

EvolveGCN (Baseline Model)

91%

59%

69%

EvolveGCN+ (Proposed Model)

91%

63%

72%

Precision refers to the proportion of positive identifications
that were correct, while recall indicates the proportion of actual
positive samples that were correctly identified. The F1-score is
a harmonic average of precision and recall. When converted to
a percentage, a score closer to 100 indicates better
classification performance. The performance of the proposed
model showed an improvement of approximately 4% in recall
and 3% in F1-score compared to the existing model,
demonstrating the significance and effectiveness of the
proposed method.
V. CONCLUSION AND FUTURE WORK
In this study, we proposed an AML and detection system
based on CBDC. The proposed system integrates SATP
bridge-based smart contracts with machine learning real-time
monitoring systems to ensure interoperability and smooth
operation in different environments. In the post-transaction
detection stage, we utilized graph datasets to accurately detect
suspicious activities. Moreover, the system is designed to meet
regulatory compliance requirements while considering privacy,
which greatly improves the stability and reliability of financial
systems.
While the implementation of this system can involve
significant complexity and cost, these issues are critical to
addressing during the initial deployment and operational
phases. Given the importance of security and regulatory
compliance in financial systems, these complexities and costs
are justified. Thus, the proposed system will play an essential

212
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:04 UTC from IEEE Xplore. Restrictions apply.

## Page 7

[15] Chen, Zhiyuan, et al. "Machine learning techniques for anti-money
laundering (AML) solutions in suspicious transaction detection: a
review." Knowledge and Information Systems, vol. 57, pp. 245-285,
2018.
[16] Weber, Mark, et al. "Anti-money laundering in bitcoin: Experimenting
with graph convolutional networks for financial forensics." In
Proceedings of the 2nd KDD Workshop on Anomaly Detection in
Finance, 2019.
[17] Zhang, Si, et al. "Graph convolutional networks: a comprehensive
review." Computational Social Networks, vol. 6, no. 1, 2019.
[18] Rossi, Emanuele, et al. "EvolveGCN: Evolving graph convolutional
networks for dynamic graphs." In Proceedings of the AAAI Conference
on Artificial Intelligence, vol. 34, no. 4, pp. 5363-5370, 2020.
[19] Almeida, J. P. A., Garcia, R. D., Ramachandran, G., and Ueyama, J.
"Towards an Identity Authentication Layer in CBDC Networks using
Self-Sovereign Identities," 2024 IEEE International Conference on
Blockchain and Cryptocurrency (ICBC), pp. 690-692, 2024.

[20] Dumbre, T., Shaji, R., Sanadhya, S., Kumar, C. N. S. V., and
Vijayakumari, L. "Blockchain-Powered KYC in a CBDC World: The ERupee Experience," 2024 IEEE International Conference for Women in
Innovation, Technology & Entrepreneurship (ICWITE), pp. 389-396,
2024.
[21] D. Avrillionis and T. Hardjono, "SATP Setup Stage," IETF InternetDraft, draft-avrilionis-satp-setup-stage-00, May 2024. Available:
https://datatracker.ietf.org/doc/draft-avrilionis-satp-setup-stage/.
[22] R. Belchior, M. Correia, A. Augusto, and T. Hardjono, "SATP Gateway
Crash Recovery Mechanism," IETF Internet-Draft, draft-belchior-satpgateway-recovery-02,
Jul.
2024.
Available:
https://datatracker.ietf.org/doc/draft-belchior-satp-gateway-recovery/.
[23] Elliptic, "The Elliptic Data Set: Working With the Community to
Combat Financial Crime in Cryptocurrencies," 12 August 2019.
Available: https://www.elliptic.co/blog/elliptic-dataset-cryptocurrencyfinancial-crime.

213
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 19,2026 at 15:40:04 UTC from IEEE Xplore. Restrictions apply.
