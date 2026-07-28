---
source_type: pdf
title: "Blockchain in operations management and manufacturing: Potential and barriers"
original_file: "thesis/reference/Blockchain in operations management and manufacturing: Potential\nand barriers.pdf"
sha256: "a2ad5450abfabe65878d2f7e0fcf214e163f65dac3dee2716c78ebbed46c4aae"
page_count: 15
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Blockchain in operations management and manufacturing: Potential and barriers

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Computers & Industrial Engineering 149 (2020) 106789

Contents lists available at ScienceDirect

Computers & Industrial Engineering
journal homepage: www.elsevier.com/locate/caie

Blockchain in operations management and manufacturing: Potential
and barriers
Jacob Lohmer *, Rainer Lasch
Technische Universität Dresden, Chair of Business Management, esp. Logistics, Münchner Platz 1-3, 01062 Dresden, Germany

A R T I C L E I N F O

A B S T R A C T

Keywords:
Blockchain technology
Production networks
Distributed manufacturing
Industry 4.0
Case study
Digital manufacturing

Transparency, visibility, and disintermediation are some of the prospects of the aspiring blockchain technology
in the business-to-business context. The digital transformation and Industry 4.0 trends also facilitate blockchain
applications in operations management (OM) and manufacturing. However, scientific contributions and suc­
cessful industrial applications in this area are still scarce and mainly at a proof-of-concept stage. The empirical
research in this article is based on an expert interview study to uncover and analyse the potential and barriers to
the adoption of blockchain technology in OM and manufacturing from within the industry. Semi-structured
interviews with industry experts are employed to elaborate on promising practices for the industry to effi­
ciently promote blockchain adoption and meaningful research directions for scholars. Findings include unex­
plored potential regarding distributed production networks and collaboration, expected evolutionary steps of
IoT, disintermediation leading to new business models like tokenisation, and short-term rather than long-term
relationships. Current barriers include staff difficulties, legal uncertainties, missing infrastructure and stand­
ardisation, and unclear governance structures. Improving smart contract security and interoperability of private
and public protocols will enable further dissemination of the technology. Managers and academic scholars can
address these findings and new propositions of this study in future application development and implementation.

1. Introduction
Operations management (OM), the activity of managing assets
dedicated to the manufacturing and supply of products and services
(Slack, Chambers, & Johnston, 2010), has seen several technologies
disrupt the industry in light of the fourth industrial revolution, Industry
4.0 (Hofmann & Rüsch, 2017; Xu, Xu, & Li, 2018). The Internet of
Things (IoT), big data analytics, and cloud manufacturing impact the
economic, social, and political factors that drive enterprise operations
globally (Ferdows, 2018; Rossit, Tohmé, & Frutos, 2019). Almost all
sectors and most companies still rely on centralized information tech­
nology systems to store and manage data, most of which are not realtime capable and are vulnerable to attacks in various ways. One of the
technologies with the potential for a substantial disruption in OM,
manufacturing, and supply chain management (SCM) is blockchain
technology, a technology based on decentralisation, transparency, and
visibility (Swan, 2015; Tapscott & Tapscott, 2018; Wang, Han et al.,
2019). Blockchain can be perceived as a trustless system since no entity
has to rely on the trustworthiness of a specific counterpart. The

technology itself verifies confidence in the network with immutable
transaction records and decentralised governance (Mougayar, 2016;
Swan, 2015; Tapscott & Tapscott, 2018).
When business began to perceive blockchain as an interesting tech­
nology, the focus was set on the financial sector due to the capabilities of
the distributed ledger to store various monetary and non-monetary as­
sets (Cole, Stevenson, & Aitken, 2019). Some use cases followed in SCM,
but the area of OM and manufacturing has not been considered in-depth
to date (Angrish, Craver, Hasan, & Starly, 2018). At the same time, the
manufacturing industry is developing fast and there are many contexts
in light of the digital transformation, in which blockchain technology
could be meaningful. Factories and machines can be connected using
blockchain platforms to enable automated value-adding processes. Big
data generated from IoT devices can be analysed by connected partners
to gain deeper insights into production processes and enhance quality
and risk management. Digital thread mitigation, e.g. in additive
manufacturing as well as production and maintenance tracking next to
using smart contracts to trade machine data and certify products are just
some opportunities that manufacturers in different industries could

* Corresponding author.
E-mail addresses: jacob.lohmer@tu-dresden.de (J. Lohmer), rainer.lasch@tu-dresden.de (R. Lasch).
https://doi.org/10.1016/j.cie.2020.106789
Received 6 March 2020; Received in revised form 16 July 2020; Accepted 25 August 2020
Available online 31 August 2020
0360-8352/© 2020 Elsevier Ltd. All rights reserved.

## Page 2

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

tackle in blockchain applications (Chang, Iakovou, & Shi, 2019; Pai
et al., 2018). Although the prospective potentials are recognised
throughout the industry, there are few publications or reports on the
successful application of the technology (Babich & Hilary, 2020; Blos­
sey, Eisenhardt, & Hahn, 2019). There seems to be a lack of clarity about
the specific potential of the technology, with barriers to its successful
implementation persisting in industry. So far, hardly any research goes
beyond a conceptual consideration of potentials and barriers. Recently,
academic literature has called for an assessment of blockchain tech­
nology within OM strategies and principles to establish a solid theoret­
ical foundation for the literature on blockchain and to enable a
structured process of knowledge generation (Babich & Hilary, 2020;
Ferdows, 2018). In particular, there is a need for empirical evidence on
implementation challenges and potential use cases in OM and
manufacturing (Cole et al., 2019; Pournader, Shi, Seuring, & Koh, 2020).
This paper intends to address the lack of empirical insights in
research and practice by exploring the challenges and potentials of
blockchain technology in OM and manufacturing through an empirical
study. To stimulate future research, we put forward several propositions
based on the results of this study and a comparison with the literature.
The paper specifically addresses the following research questions:

combining advanced computing systems and coordination strategies
(Chang et al., 2019; Durugbo, 2016; Rodríguez Monroy & Vilana Arto,
2010; Tuma, 1998). Virtual reality (VR) and augmented reality (AR) are
promising techniques for collaboration as they enable real-time con­
sultations and dynamic data sharing in collaborative environments.
Production flexibility and product quality can be improved through
collaboration using VR or AR systems (Chryssolouris, Mavrikios, Pappas,
Xanthakis, & Smparounis, 2009; De Souza Cardoso, Mariano, & Zorzal,
2020). Other key concepts like cloud manufacturing are commonly used
to ensure that the required data structure for these networks is available
quickly and cost-effectively (Helo, Suorsa, Hao, & Anussornnitisarn,
2014; Li, Barenji, & Huang, 2018; Yang, Shi, & Zhang, 2014). Instead of
former production-oriented architectures that focus on manufacturing
physical products efficiently, cloud manufacturing promotes serviceoriented manufacturing, as services in the production process like
manufacturing, assembly, testing, maintenance or logistics can be
sourced on-demand (Ren, Zhang, Wang, Tao, & Chai, 2017). Commu­
nication between companies collaborating in production networks is
essential to enable a high system performance. However, cloud systems
and most implementations of technologies like VR or AR follow the
paradigm of central system architecture - making data available with the
help of an intermediary. Alongside the resulting dependence on the
intermediary, central architectures face problems such as data security
(centralised point of vulnerability) and trust concerning data corruption
(Casino, Dasaklis, & Patsakis, 2019; Makhdoom, 2019). Existing
decentralised approaches that are used to tackle the issues of centralised
systems, such as multi-agent architectures or peer-to-peer networks
(Rossit et al., 2019; Wang, Wan, Zhang, Li, & Zhang, 2016), often lack
transparency, leading to a certain reluctance from industry to invest the
required efforts in these systems (Li et al., 2018). So far, no technology
has been able to combine the idea of decentralisation with data security
and immutability at acceptable costs and implementation effort. The
comparatively new blockchain technology could be a viable alternative
here.

RQ1. What is the perceived potential of blockchain technology in OM
and manufacturing?
RQ2. What barriers are currently preventing common applications of
blockchain technology in OM and manufacturing?
RQ3. What practices are promising for companies to move forward
with their blockchain efforts and which topics require support from
the scientific community?
The remainder of this paper is structured as follows. Section 2 pro­
vides the reader with a concise insight into current developments in OM
and manufacturing, the principles of blockchain technology, and
blockchain applications in OM and manufacturing to date. Section 3
then introduces the research methods, followed by Section 4, where the
findings of the empirical study are presented and propositions are
developed based on the comparison of the findings of the empirical
study with the scientific literature. Section 5 provides managers and
academic research with implications on how to adapt to the changing
environment and actively shape the future trends that were identified.
Besides, the gap analysis highlights the domains where academia and
experts have different focuses in order to promote better cooperation. In
Section 6, the paper is concluded with discussions and a short outlook on
further research opportunities.

2.2. Blockchain technology
Blockchain represents a distributed ledger that is stored decentrally
as a single record of data in blocks on network nodes. It was first
introduced in 2008 in the Bitcoin white paper (Nakamoto, 2008) as the
protocol for processing transactions in the network. The communication
occurs among geographically dispersed nodes in a peer-to-peer network
through transactions and elements of cryptography. The immutable and
complete ledger is replicated between all participants in the network.
Each node can synchronise data and propagate transactions that are
issued for every communication event and typically consists of a sender
and receiver addresses, the message data, and signatures (Swan, 2015;
Tapscott & Tapscott, 2018). The transactions are recorded in lists and
stored in blocks with a hash pointer to reference the previous block, as
well as an immutable timestamp. A chronological chain of blocks is
established in this way. The ledger is protected by strong means of
cryptography, including private keys to sign transactions, hash functions
to link blocks, and consensus mechanisms to ensure irreversibility
(Bahga & Madisetti, 2016; Wang, Shen et al., 2019; Zheng, Xie, Dai,
Chen, & Wang, 2018). For the first time, organisations of all kinds can
communicate and exchange data securely with other organisations they
do not need to trust, without having to use an intermediary.
As the system is organised in a decentralised manner, coordination
has to be achieved on the current state of the ledger and the transactions
have to be added to the next block. In a blockchain system, this is
accomplished by a consensus mechanism. Proof-of-Work, Proof-ofStake, Proof-of-Authority, or variations of Byzantine Fault Tolerance
algorithms are commonly employed consensus mechanisms (Angrish
et al., 2018; Makhdoom, 2019). The choice of a consensus mechanism
depends on the inherent design of the blockchain. Permissionless, per­
missioned, and hybrid versions (consortium blockchains) can be

2. Theoretical background
2.1. Recent trends in operations management and manufacturing
In a broader context, the term Industry 4.0 in OM and manufacturing
represents a transition towards a more flexible design of production
processes (Xu et al., 2018). In decentralised architectures, autonomous
devices can use real-time information and interact directly as cyberphysical systems (CPS) (Rossit et al., 2019; Tao, Cheng, Zhang, & Nee,
2017). CPS combine hardware and software properties, have a unique
identity, and can communicate with their environment in the smart
manufacturing concept (Bartsch, Neidhardt, Nüttgens, Holland, &
Kompf, 2018). Big data and its analytics are related to volume, variety,
veracity, value, and velocity of data; data features that will all increase
in future operations (Brinch, 2018; Niesen, Houy, Fettke, & Loos, 2016;
Wang, Gunasekaran, Ngai, & Papadopoulos, 2016). Machines and parts
in production will no longer require human control to interact in the
short term (Rossit et al., 2019). These innovations facilitate a trend to
form and join virtual and collaborative production networks with mul­
tiple partners. Production networks are often set up in distributed
manufacturing as a reaction to the increasing global competition,
2

## Page 3

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

Table 1
Blockchain features, influencing factors and their relevance to OM and manufacturing.
Blockchain features

Influencing factors of the technology

Relevance to OM & manufacturing

Immutability and
Security

Cryptographic measures

Immutability leads to enhanced auditability as data is available unalterable and secure, this is
also vital for potential legal disputes
E-based rather than paper-based transactions enhance the security of data transactions
through cryptography

Transparency

Full history record, real-time transactions, redundancy
and decentralisation

Real-time processing enables a significant improvement in transparency for all parties
Simultaneous, autonomous access by all partners increases agility
The decentralized system eliminates the single point of failure

Disintermediation

Decentralisation, no central authority

Cost reduction through direct peer-to-peer exchange
New governance structures are feasible - less dependency, equality of partners

Irreversibility

Consensus mechanism, cryptographic measures

Consensus mechanism reduces opportunism
Solid commitments are legally verifiable

Automation

Smart contract functionality

Automatic transfer of data and payments lead to cost reduction and enhanced IoT capabilities

distinguished. In terms of decentralisation and equality, permissionless
blockchains perform best (Christidis & Devetsikiotis, 2016). Each entity
can join the network and participate in transactions and mining activ­
ities pseudonymously. Permissioned chains (also called private) are
more efficient regarding transaction costs and speed but are centrally
managed and therefore limited in their ability to guarantee equality and
decentralised governance. A permissioned chain will always have to
compete with a regular database that serves the same purpose and in
many cases will be more efficient and cost-effective (Wang, Singgih
et al., 2019). Hybrid versions, mainly consortium blockchains, combine
features of permissionless and permissioned chains and offer decen­
tralisation, stable transaction costs, and fast transaction speeds (Buterin,
2015).
Apart from the use of cryptocurrencies in transactions, smart con­
tracts are the blockchain feature with probably the most transformative
functionality for OM, manufacturing, and supply chains (SC) (Wang,
Han et al., 2019). A smart contract is a computerised transaction pro­
tocol that automatically executes if the terms of the specified contract
are met. Contract clauses can be embedded in scripting languages (like
Python or Solidity) to execute blockchain functions (Bahga & Madisetti,
2016; Hyperledger, 2020; Szabo, 1997). Smart contracts are trusted
applications that are set up with a unique address and can be triggered
by a transaction to this address matching the specified criteria of the
smart contract. The smart contract then executes autonomously, and the
state variables change according to internal logic. Depending on the
specific use case, smart contracts can either be partially or fully selfexecuting or self-enforcing (Weber, Xu, Riveret, Governatori, Pono­
marev, & Mendling, 2016). An essential characteristic of smart contracts
is their inherent immutability. Contractual conditions can be satisfied
with reduced costs and no time delays (Kim & Laskowski, 2017). As
smart contracts represent an essential feature for future blockchain ap­
plications, they are examined in more detail concerning OM and
manufacturing in Section 4.1.4.
In addition to the opportunities of increasing efficiency through
automation utilising smart contracts, other properties of blockchain
applications should be highlighted. These include increased availability,
disintermediation, instant asset tracking, direct peer-to-peer communi­
cation, reliable data origin, short transaction times at low costs, and
reduced risks like opportunism (Lacity & Khan, 2019; Makhdoom, 2019;
Wang, Han et al., 2019). Table 1 should be read from left to right as it
demonstrates the most important features of blockchain, the influencing
factors of the technology, and the relevance of these features to OM and
manufacturing (Cole et al., 2019; Babich & Hilary, 2020; Pournader
et al., 2020).

papers on blockchain applications in SCM or OM (Blossey et al., 2019;
Chang et al., 2019; Gurtu & Johny, 2019; Helo & Hao, 2019; Wang, Han
et al., 2019). Scientific efforts in OM and manufacturing that are rele­
vant for this study are discussed in the following. Most empirical studies
on blockchain technology focused on SCM, so we also highlight some of
the findings of these studies:
Qualitative research has provided some insights from industry, e.g.
barriers to adoption in different contexts: Petersen, Hackius, and von See
(2018) indicated regulatory uncertainty and collaboration issues as
prevailing barriers from a survey of SC managers and added techno­
logical usability issues in a recent study (Hackius & Petersen, 2020). A
sensemaking study with SC employees by Wang, Singgih et al. (2019)
indicated issues related to confidence, cultural conditions, governance,
information-sharing reluctance, lack of standardisation, and security.
Lacity and Khan (2019) identified general challenges in implementing
enterprise blockchain applications: competing standards, governance
models, intellectual property concerns, espionage risks, and regulatory
uncertainty. Biswas and Gupta (2019) indicated that scalability,
transaction-level risks, and market-based risks are important. Kurpju­
weit, Schmidt, Klöckner, and Wagner (2019) investigated blockchain in
additive manufacturing where interoperability of different systems, lack
of technical expertise, labour market availability, and governance are
common barriers. Studies on the behaviour related to the adaptation of
blockchain were performed by Queiroz and Fosso Wamba (2019) and
Kamble, Gunasekaran, and Arha (2019).
Another part of the scientific literature focuses more on the technical
perspective in manufacturing: Bartsch et al. (2018) developed a secure
additive manufacturing platform to license products on a blockchain
automatically with ensured data protection and traceability. Angrish
et al. (2018) presented a blockchain testbed platform to share logs of
machine events via smart contracts in a permissioned network. Li et al.
(2018) suggested a combination of cloud manufacturing and blockchain.
Kobzan et al. (2018) investigated issues regarding Industry 4.0 networks
and concluded that throughput, time-sensitivity, and bandwidth uti­
lisation are vital factors. Lohmer (2019) presented a concept to share
and schedule resources in distributed manufacturing networks utilising
blockchain technology. Longo, Nicoletti, Padovano, d’Atri, and Forte
(2019) connected a blockchain to an enterprise information system to
share data among the SC partners and assessed the suitability in a
simulation model. Meyer, Kuhn, and Hartmann (2019) conceptually
developed a blockchain-enabled physical internet framework. Helo and
Hao (2019) designed a reference implementation of a blockchain-based
logistics monitoring system, where knowledge issues, uncertainty and
scalability were blocking points for further implementation. Bürer, de
Lapparent, Pallotta, Capezzali, and Carpita (2019) provided an assess­
ment of potential use cases for blockchain architectures in the energy
industry. Lee, Azamfar, and Singh (2019) presented a three-level
blockchain architecture for cyber-physical production systems. Bai,
Hu, Liu, and Wang (2019) set a similar focus and developed a blockchain

2.3. Specific use cases and applications in operations management and
manufacturing
Recent reviews accumulated only limited numbers of scientific
3

## Page 4

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

Table 2
Research opportunities for scholars studying blockchain technology in OM, SCM, and manufacturing.
Research opportunities

Literature source

Comparison with other technologies for the digital transformation of OM, SCM, and
manufacturing
Empirical evidence on implementation challenges and efficient measures for implementation
Assessment of the impact of “trustless operation” on supply chain relationships and dynamics

Cole et al. (2019)

Assessment of blockchain impact on SCM and OM theory
Case study to investigate technology integration in SCM operations
Assessment of blockchain impact on opportunism, governance structures and disintermediation
in SCM
Examination of cryptocurrencies and supply chain finance
Assessment of economic and ecological sustainability through blockchain use

platform for the industrial IoT. Leng et al. (2019) recently presented
ManuChain, a combination of blockchain and digital twins for decen­
tralized, self-organised manufacturing.
Apart from science, there is a multitude of industry initiatives and
proofs-of-concept to date, only a few of which we would like to highlight
here briefly. Maersk is working with IBM on digitalising global trade
activities and paperless trade in a project called TradeLens (TradeLens,
2019). Projects in OM and manufacturing include SAMPL (Bartsch et al.,
2018) as a chain of trust for additive manufacturing and secure data
sharing or Cubichain Technologies that also focuses on the additive
manufacturing industry (Cubichain, 2020). IoT related projects were e.
g. initiated by the Bosch Group and IOTA (Bosch, 2020). Other projects
were launched in the areas of trade finance, data security, social impact
(fair trade), inventory management, and real-time auditing - for a
detailed list of blockchain projects see Cole et al. (2019), Wang, Han
et al. (2019), or Chang et al. (2019).
On top of these promising initiatives, several industry surveys
revealed that manufacturing and OM are perceived as the most prom­
ising areas for blockchain adoption by the industry (Staufen AG, 2018;
Pai et al., 2018). The digital transformation and the connection of fac­
tories, machines, and CPS enable automated value-adding processes that
can be securely deployed on blockchain platforms. Big data generated
from IoT devices can be analysed accordingly to facilitate deep insights
into production processes and enhanced quality and risk management.
Supplier contract management, digital thread mitigation, as well as
production and maintenance tracking are some opportunities that
manufacturers would like to pursue in future applications (Chang et al.,
2019; Pai et al., 2018). Identity management of machines and sensors,
implementation and execution of smart contracts to trade machine data
and the certification of products using the blockchain are further plau­
sible applications. However, the majority of companies actively
involved in blockchain projects still deal with accounting or financial
applications exclusively (Gentemann, 2019). Lack of awareness seems to
still be an issue, as most professionals have not yet fully grasped the
technology or consider it too complex to understand and apply. Legal
uncertainties also persist in mechanical and systems engineering
(Staufen AG, 2018).
This short overview of existing scientific and practical efforts on
blockchain technology demonstrates that the potential of blockchain for
OM and manufacturing is estimated to be quite high but still uncertain.
Recently published reviews and viewpoint papers by Cole et al. (2019),
Hughes et al. (2019), Pournader et al. (2020), Saberi, Kouhizadeh,
Sarkis, and Shen (2019), and Wang, Han et al. (2019) have indicated
various areas that require further research, which are summarised in
Table 2.
Although first research findings show how blockchain technology
can be implemented and used in OM and manufacturing, barriers appear
to persist that prevent a broad application in practice. Cole et al. (2019),
Pournader et al. (2020), and Hughes et al. (2019) also emphasise a need
for empirical evidence on implementation challenges and efficient
application measures from the industry. This paper intends to address

Cole et al. (2019), Hughes et al. (2019), Pournader et al.(2020)
Cole et al. (2019), Pournader et al.(2020), Saberi et al. (2019), Wang, Han et al.
(2019)
Cole et al. (2019)
Cole et al. (2019), Pournader et al.(2020)
Cole et al. (2019), Saberi et al. (2019), Wang, Han et al. (2019)
Pournader et al. (2020), Wang, Han et al. (2019)
Hughes et al. (2019), Saberi et al. (2019), Wang, Han et al. (2019)

this research gap and explore barriers and unexploited potential in OM
and manufacturing through an empirical study.
3. Research method
The contribution of this study is two-fold. Besides the intention to
uncover the inherent potential of blockchain for OM and manufacturing,
existing barriers in the industry will be highlighted. Besides, managers
from industry and scholars are provided with guidance on how to pro­
ceed with adoption and research on blockchain technology. The
empirical study, as the basis of this research, consists of semi-structured
interviews with experts from industry and academia and is described in
the following.
3.1. Interview approach
Qualitative research facilitates an in-depth and comprehensive
perspective on complex and diverse phenomena. It is a widely used
methodology to study novel technologies and their implementation in
the industry (e.g. Biswas & Gupta, 2019; Kamble et al., 2019; Moktadir,
Ali, Paul, & Shukla, 2019; Wang, Singgih et al., 2019). Research on
current advances in the application of blockchain in OM and
manufacturing and persisting barriers is still scarce. The case study
research approach provides a targeted methodology to enable theory
building and affirmation from empirical evidence (Eisenhardt, 1989).
An inductive approach was used to facilitate the generation of theory in
the emerging field of blockchain technology (Eisenhardt & Graebner,
2007; Strauss & Corbin, 1994). The term case study is a controversial
issue in the scientific literature. This study refers to it as the individual
interviews are considered as cases that are evaluated both individually
and across cases (Yin, 2018). Documents and presentations provided by
the interviewees were used for triangulation. The research procedure
followed the steps in the roadmap of Eisenhardt (1989) to ensure rele­
vant and rigorous research. The first step was the definition of research
questions and the setting of the research focus.
The case selection was initiated by a search for companies and startups that offer blockchain solutions for business clients in OM or
manufacturing and consulting firms publicly promoting blockchain
technology. Academic experts with research projects in OM and
manufacturing or related areas were also examined. The start-ups rep­
resented by some of the interview partners in the study deal with
tracking & tracing solutions, linking IoT and blockchain through sensors
and clients as well as the setup and management of production networks
with smart contract capabilities. All start-ups have been active in the
market for at least three years and are consolidated in their business
segment. The focus was deliberately placed on interview partners with
experience in the field of blockchain and a diversified field of activities
that deal with different entities in project work. Therefore, in the course
of the study, we refer to the interview partners as experts. By inter­
viewing experts instead of individual employees, we enable an evalua­
tion of how the industry in general assesses the technology (Scapolo &
4

## Page 5

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

addition to the transcribed data, one of the researchers took notes during
the interviews. These were included in the data set for analysis and
interpretation, as were documents provided by the experts. The inter­
view analysis software MAXQDA was utilised for transcription, coding,
and analysis of the interview data. The qualitative content analysis by
Mayring (2015) provides a rule-based, systematic procedure to assure
general acknowledgement of research and the validity and reliability of
results obtained. The first analysis iteration consisted of a line-by-line
text analysis of each interview to extract codes and main categories
for the codes (Mayring, 2015). In accordance with the questions asked,
several categories for the coding of the text sections emerged, which
were then used similarly for all interviews (Eisenhardt, 1989). The
within-case analysis was combined with searches for cross-case patterns
to generate general impressions and insights rather than personal im­
pressions (Eisenhardt, 1989; Yin, 2018). The iterative process of data
analysis consisted of a first phase, which was used to identify the po­
tential of blockchain as a technology in OM and manufacturing, but also
the technological barriers recognised by the experts. In a second phase,
statements were accumulated that could be attributed to an outlook for
future applications, hints for targeted development and utilisation of
blockchain technology, or general recommendations for industry or
academic research.

Miles, 2006). Studies with employees are just as important to identify
the specific potentials and barriers in individual cases - we address this
issue in the academic research implications below. The experts all work
with a multitude of companies from different sectors of the
manufacturing industry and are therefore able to provide a more
differentiated picture of the industry than a survey of employees from
individual companies would allow (Dew, Read, Sarasvathy, & Wiltbank,
2009). Individual industrial companies were thus not included in the
study. Theoretical sampling was used to assure a case selection likely to
extend the emergent theory (Eisenhardt & Graebner, 2007). Experts
were selected based on position and responsibility in project work,
experience in the field, and willingness to participate in the empirical
study (Bokrantz, Skoogh, Berlin, & Stahre, 2017). Interviews were
conducted with ten industry experts, after which theoretical saturation
was reached, i.e. few new insights were generated by new interviewees
(Guest, Bunce, & Johnson, 2006). The sample size is well in line with the
consistent approach of well-grounded qualitative research that allows
researchers to obtain rich empirical data from a limited number of
sources (Guest et al., 2006; Patton, 2015; Yin, 2018).
For the reasons given above, the explanatory value of the ten in­
terviews clearly exceeds a similar number of interviews with managers
from individual industrial companies. To further emphasize this aspect,
we listed the sectors of the manufacturing industry in which the experts
have already initiated or implemented projects in Table 3. Other char­
acteristics in Table 3 include the occupation, profile, expertise (clustered
to maintain anonymity) and the experts’ focus area. The interview
design followed a semi-structured approach to allow for flexibility to
adapt to specific but unknown circumstances (Yin, 2018). The experts
(all working in Europe) were interviewed confidentially via telephone or
video calls. On average, the detailed survey of the experts lasted about
45 min, with a resulting data set of over 100 pages of transcribed text.
The interview questions were slightly modified for the different experts,
and the full interview guidelines can be found in Appendix 1. In order to
clarify open issues after the first interview, occasionally several rounds
of interviews were conducted with the individual experts. As over­
lapping data analysis and collection is useful to speed up analysis and
adjust the following data collection, this strategy was applied. The
specific approach for data analysis is detailed in the next section.

4. Findings
The experts all expressed their general belief that blockchain tech­
nology if utilised correctly and sensibly, could have a decisive influence
on various processes and business models in OM and manufacturing. All
experts have worked or are working on concepts and implementations of
blockchain in the manufacturing domain. For this purpose, several
platforms and protocols are used, including Ethereum, EOS, IOTA and
Hyperledger Fabric. While some of the experts predict a slow but steady
spread and use of the technology, others compare the current situation
to the internet in the early 1990s. The statements made by the experts
revealed a multitude of different potentials and barriers, which are
explained in more detail in the following subsections.
4.1. Potential of blockchain technology for operations management and
manufacturing

3.2. Data analysis

Existing work in the field of OM and manufacturing used conceptual
analyses to point out the potentials of the technology (Babich & Hilary,
2020; Cole et al., 2019). In contrast, in the following subchapters, the
potential of blockchain is presented as it is perceived in the industry. The
findings can be clustered in several categories: In addition to the ability

The interview data were analysed in an iterative way to uncover both
the improvement potential and the perceived barriers in blockchain
adoption. All interviews were recorded and then transcribed word-forword to obtain accurate and complete empirical data (Yin, 2018). In
Table 3
Participants of the expert interviews.
ID

Industry/
occupation

Profile

Experience
(years)

Focus area

Sectors/Industries

A

Start-up

CEO

15–20

Supply Chain, Manufacturing

B

Technology
consulting
Technology
consulting
Software provider

Senior consultant

5–10

Banking, Manufacturing, Supply Chain

Consultant, PhD in
Information systems
Project manager

5–10

Provenance, Economy of things

Mechanical and plant engineering, food & beverage,
recycling
Automotive, shipping, aviation, pharmaceutical,
mechanical and plant engineering
Automotive, insurance industry

10–15

Digital Transformation

Senior consultant

10–15

Manufacturing, Supply Chain and more

F

Management
consulting
Software provider

Consultant

5–10

Manufacturing, Supply Chain and more

G
H

Academia
Start-up

PhD in IT law
CTO

10–15
10–15

Financial payments
Supply Chain, Manufacturing

I

Blockchain
consulting
Start-up

Senior consultant

15–20

Project manager

5–10

Finance, Certificate management,
Predictive maintenance and more
Economy of things

C
D
E

J

5

Additive manufacturing, aviation, microelectronics,
pharmaceutical
Additive manufacturing, mechanical and plant
engineering, pharmaceutical, energy
Pharmaceutical, food & beverage, mechanical and
plant engineering
Not specified
Pharmaceutical, chemical, food & beverage,
cosmetics, electronics
Printing and publishing, shipping, transportation
equipment industry
Automotive, energy, electrical engineering

## Page 6

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

between blockchain and IoT. Particularly in connection with smart
contracts, applications in the production environment that are related to
autonomy are predestined for the connection of IoT and blockchain.
Machines can interact autonomously and initiate the next process steps
or request maintenance measures based on collected sensor data, for
instance. Products with IoT features like autonomous driving cars may
pay for parking tickets or charging processes independently using
cryptocurrencies and built-in blockchain clients (interviewee J). The
paradox of today, where each IoT system is set up and operated inde­
pendently but is expected to communicate with all other IoT systems
without sharing any critical data, can be solved using blockchain tech­
nology. As trust is generally low and the risk of data leaks and data
manipulation prevails, a secure peer-to-peer connection is essential. In
an open blockchain system, the IoT devices can exchange data and trade
autonomously without the need for mutual trust and without relying on
a central cloud service provider.
Blockchain profits from its ability to handle several elements that are
required in the IoT context: identification, communication, payment,
and documentation. Gathering IoT data securely and transparently also
supports the tokenisation of assets, one of the perceived new business
models related to blockchain technology. Expert A also noted that
linking the blockchain to the physical world in the manufacturing
environment is more relaxed than in the financial world, for example.
The pressure of full decentralisation is not as intense as there is always a
link to the physical world (IoT device) and the actual order has to be
manufactured in reality, with expertise that is not shared on the
blockchain. The IoT area is still open and well suited for blockchainbased use cases with the ability to test sensible implementation, as no
standard has developed yet. Companies may benefit from a pioneering
role if they can create solutions that are capable of handling real
transactions and exploit all the advantages of IoT devices (interviewee
D).

to efficiently facilitate network establishment and enable secure
communication in the network, there are several potential applications
for linking blockchain and IoT. Various new business models are
conceivable with blockchain in place. Smart contracts represent a
crucial feature in this context. Fig. 1 summarizes the identified potential
of blockchain technology for OM and manufacturing.
4.1.1. Efficient development of new networks in operations management
and manufacturing
In general, the experts agreed that blockchain has the most signifi­
cant potential in areas where different business partners have access to
the same data. Especially the concept of production networks and the
establishment of new networks can be optimally supported by block­
chain. Companies no longer compete against individual competitors in
their industry but have to compete against other networks on a global
scale. Blockchain technology could lead to a breakthrough here. Instead
of connecting all partners to a central IT or cloud system as in the cloud
manufacturing concept, blockchain enables trustworthy collaboration in
a peer-to-peer, decentralised production network. The experts repeat­
edly emphasised this point and mentioned transparency (interviewees C,
D, I) and equality in the network (interviewees A, I), disintermediation
(interviewees D, F), and trustworthy collaboration (interviewees C, F, I)
as crucial features that blockchain facilitates in the networking of
companies:
The idea is to shift competition from company against company to
network against network. It then makes more sense for all participants.
Then they use these advantages that they get, e.g., when they share pro­
duction data or capacity data, optimise their production processes, have
an advantage as a network or as a value chain, e.g., cost savings as they
can plan better, but also share the advantages (Interviewee F).
Instead of a central authority managing the network and thus seizing
power, the experts are confident that decentralisation is the way for­
ward. The collaborative networks can operate in a highly automated
fashion using smart contracts. Data can be selectively and securely
exchanged between partners. Resulting benefits, such as increased effi­
ciency and cost reduction, can be shared in the network. These advan­
tages might even enable direct competitors to work together more
closely and intensify communication.

4.1.3. New business models based on blockchain
According to the experts, new business models are emerging in a
variety of areas. One model with possibly the highest impact is con­
cerned with the tokenisation of assets, as mentioned above. Instead of
having to procure an asset entirely, tokenisation allows any physical
goods to be divided and purchased in part by investors or shared in the
network (interviewees A, D, H, I). This offers excellent application
possibilities as tokenisation can be designed efficiently via the block­
chain, is transparent for all parties, and can be easily automated. The
connection with IoT devices may contribute to the usage recording of

4.1.2. Linking blockchain technology and IoT
All interview partners emphasised the beneficial relationship

Potential of
blockchain
adoption in OM &
manufacturing

Enhanced
collaboration

Linking blockchain
and IoT

New business models

Smart contract
implementation

Decentralisation

Autonomy

Disintermediation

Efficiency
improvement

Trust in participants
and data

Communication between
different IoT protocols

Tokenization of
assets

Connection with
tokens

Network operator
profits

Equality in
decentralization

Foundry
production

Fig. 1. Graphical representation of the potentials of blockchain adoption in OM and manufacturing.
6

## Page 7

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

assets and enable sophisticated pay-per-use models (interviewees A, H).
Considering a production network that shares production capacity: Each
partner could, for example, purchase parts of a machine asset, which in
turn represent a claim for machine capacity in the upcoming months.
The statements of the experts are consistent with the literature in this
context (e.g., Lohmer, 2019). When scheduled, the IoT device incorpo­
rated in the machine tracks the process of use. The wear and tear of the
machine are automatically calculated and charged against the remain­
ing balance of the network partner (expert A). A comparable model
would be conceivable for CO2 certificate trading in the energy industry
(expert J).
The new networks create an additional business area for companies
intending to operate the network. The tasks of setting up the network,
connecting the partners, and providing computing capacity are
compensated by the possibility of profiting from transaction fees (in­
terviewees D, E, F). Further new business opportunities could emerge in
the field of disintermediation. Decentralised platforms that are modelled
like AirBnB or Uber, but customer-to-customer based, would be an
exciting option here. Alternatively, a lot of potential can still be lever­
aged with the existing providers of sharing economy solutions (Tasca,
2018). Integration based on standardised blockchain elements across the
platforms may generate added value. In the context of future smart
production, interviewee E suggested a general change from individual
factories that produce singularly for a company to contract manufac­
turers that provide capacities that can be used by all partners in the
network (like foundries in semiconductor manufacturing).

throughout the industry and involve high transaction costs (in­
terviewees D and F). Beneficial for the application of smart contracts is
the connection of tokens with the complete ecosystem, but also that
smart contracts work well without cryptocurrencies, a statement
confirmed in the literature (Szabo, 1997).
4.1.5. Criticism and comparison to other technologies
Several interviewees (B, F, G, I) stated that it is critical to understand
that blockchain is just one technology that can contribute to the wide­
spread utilisation of Industry 4.0 applications in combination with other
technologies. Blockchain is certainly not a panacea for all issues in the
business context. However, dealing with blockchain allows enterprises
to recognise and fully utilise the potential of already digital processes
and procedures. In many cases, blockchain may also provide an initial
opportunity for companies to engage in digital transformation as the
experts indicated:
For many companies, blockchain is actually the first form of a digital
transformation that they can and like to achieve. So there is not neces­
sarily a lot of additional added value in the blockchain, but it is simply the
digitisation of basic processes and information (Interviewee D).
However, mainly larger companies are developing blockchain solu­
tions and doing so on top of already existing digital processes. There is
an inevitable trade-off between benefits and risks in this regard. On the
one hand, digital transformation is a force that affects all companies and
blockchain can act as a gateway technology that triggers digital trans­
formation processes. On the other hand, there are alternatives for many
processes that may be better suited than blockchain due to cost aspects,
real-time requirements etc. These can be traditional databases or cloudbased systems, for example. Expert D recommended that the benefits of a
blockchain solution must be assessed accurately and in detail for each
process:

4.1.4. Smart contracts
Smart contracts are an essential feature of blockchain technology for
process efficiency and automation. None of the experts has set up or
operates a system capable of leveraging this functionality productively.
Nevertheless, experts B, C, D, E, F, H, and I agreed that smart contracts
are very promising and will be crucial for the potential efficiency gains
in the industry. These statements confirm the results of the SC study by
Wang, Singgih et al. (2019), which indicated that the industry considers
smart contracts to be more significant than in literature. Experts H and D
noted that many managers have recognised that smart contracts offer
such disruptive potential for critical processes that a certain FOMO
(“Fear Of Missing Out”) atmosphere has set in. Companies are afraid of
being left behind and are increasingly concerned with the use of smart
contracts for process automation. In the meantime, smart contracts have
developed to a level that enables a timely implementation in combina­
tion with IoT (interviewee C). The most significant use of smart con­
tracts is predicted for highly standardised processes that are similar

I believe many things could be solved alternatively if you were already
digital. However, many companies are not yet ready to capture these
assets digitally and you could, of course, jump directly to blockchainbased solutions in the sense of leapfrogging. But of course, this does not
have to make sense in every case; in many cases, it is certainly over-en­
gineering (Interviewee D).
4.1.6. Comparison with the literature and research propositions
In order to elevate research efforts to a new, more focused level, we
identify several research propositions by comparing the results of our
study with the existing literature and the theories present. The following

Table 4
Comparison of academic and expert viewpoints on the potential of blockchain for OM and manufacturing.
Subject

Academic viewpoint

Experts’ viewpoint

Collaboration in
networks

• ‘Trustless’ networks will emerge with blockchain applications in productive use
(Christidis & Devetsikiotis, 2016; Kshetri, 2018)
• Efficient data sharing in networks is the main advantage of blockchain technology
(Wang, Han et al., 2019; Weber et al., 2016)

• Trust is still necessary to facilitate network establishment and
operation
• More flexible relationships between businesses are expected
• Blockchain facilitates new competition among networks rather
than among companies

Blockchain and IoT

• The interoperability of blockchain enables secure and real-time payment services
(Christidis & Devetsikiotis, 2016)
• High cost of centralized approaches can be avoided (Casino et al., 2019; Christidis &
Devetsikiotis, 2016)

• Communication across different IoT systems is a key prospect of
connecting blockchain and IoT
• Autonomous IoT with ensured transparency can truly be realized
by blockchain technology

New business
models

• Focus on disintermediation (Lacity & Khan, 2019; Tapscott & Tapscott, 2018; Wang,
Han et al., 2019) and secure data sharing (Hull, 2017) as the main new business
models

• Variety of new opportunities, e.g. tokenization of assets, network
operators, foundry production
• Disintermediation is also considered to be the most promising
feature

Smart contracts

• Smart contracts are perceived as a key feature of the technology (Christidis &
Devetsikiotis, 2016; Wang, Han et al., 2019; Weber et al., 2016)
• Use of smart contracts limits opportunistic behaviour in transactional relationships,
viable for legal compliance (Schmidt & Wagner, 2019)

• Smart contracts as the most promising feature, vital for efficiency
gains through automation of processes
• Firms are increasingly interested in using smart contracts for
process automation although practical implementations are still
rare

7

## Page 8

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

Table 4 highlights the agreements but also the gaps between the views of
the experts and the scientific literature that are detailed below.
Different terms have been proposed in the literature related to the
establishment and operation of networks, e.g., dynamic manufacturing
networks (Ivanov, Dolgui, Sokolov, Werner, & Ivanova, 2016) or virtual
manufacturing networks (Rodríguez Monroy & Vilana Arto, 2010; Tuma,
1998). Inevitable external influences such as globalisation, cost pres­
sure, and customer demand for fast delivery continue to push companies
to collaborate in networks. Trust is crucial for network management
(Kwon & Suh, 2004) and can be facilitated using blockchain technology
due to its transparency (Fleischmann & Ivens, 2019). It is evident that
collaboration is vital for the efficiency of services and algorithms and
determines the future success of SC and production networks. The ex­
perts’ impressions are in line with the latest scientific insights in this
context (Akyuz & Gursoy, 2019; Ivanov, Dolgui, & Sokolov, 2019).
However, the idea of emerging ‘trustless’ networks is not shared by the
experts, who are more cautious here. The resulting networks, structures,
and characteristics still need to be efficiently embedded or integrated
into existing theories in SCM and OM. This brings us to our first
proposition:

proposition related to the potentials of the technology:
P4: Blockchain’s transparency and the smart contract functionalities will
lead to more flexible, short-term relationships between small and mediumsized companies in collaborative networks.
4.2. Current barriers to a broader application in industry
So far, the findings section has indicated how blockchain technology
could change OM and manufacturing, highlighting the features that are
perceived as the most essential and beneficial using the feedback of the
empirical study. Now the second research question is addressed: the
current barriers in OM and manufacturing. The main findings are
summarised in Fig. 2 and detailed below. The design of Fig. 2 is based on
Saberi et al. (2019) and classifies the barriers into four categories: Intraorganisational barriers occur within the organisation, while interorganisational barriers are concerned with relationships between orga­
nisations and their network partners. Technology barriers are caused by
the technology itself, while external barriers are added from outside by
other affected stakeholders (e.g. society, legal entities, environment).
This study was able to confirm and substantially extend the barriers
identified in studies on other areas of business economics like finance or
SCM (Lacity & Khan, 2019; Petersen et al., 2018).
The current situation in OM and manufacturing regarding block­
chain technology is dominated by a lack of awareness, general scepti­
cism regarding trust, transparency and disclosure of crucial company
data, missing standards, unclear governance, and regulatory un­
certainties. Other barriers with a specific impact on OM and
manufacturing are competence deficiencies and staff difficulties, tech­
nical silos and missing infrastructure, legal uncertainties of smart con­
tracts, complex protocol selection and setup as well as the acceptance
and use of cryptocurrencies. Some of these barriers have been
acknowledged for Industry 4.0 in general (e.g. Xu et al., 2018; Moeuf
et al., 2019) but are new for OM and manufacturing and will be elabo­
rated in more detail below.

P1: Blockchain technology enables the efficient setup and operation of
trusted production networks. It could thus make collaboration a more
significant and widespread paradigm.
Linking blockchain and IoT enables several new business models like
tokenisation of assets (Babich & Hilary, 2020; Blossey et al., 2019) and a
next step towards the smart factory concept (Wang et al., 2016), where
machines and products interact autonomously. Current applications
lack transparency and interoperability, which could be overcome by
using blockchain to connect entities in a peer-to-peer manner securely.
Experts and literature share the opinion that the combination of block­
chain and IoT could raise both technologies to a new level. Research
questions to be addressed include: How can tokenisation be imple­
mented? Which type and which amount of IoT data can be efficiently
collected and distributed via the blockchain? Hence, we arrive at the
second proposition:

4.2.1. Inter-organizational barriers
As far as awareness is concerned, there are differences in the way
experts perceive the current situation. While all stress that awareness
has increased, especially in the last two years, experts B and F continue
to see awareness as critical. Others (interviewees C, E, G, H, I, J) believe
that awareness is now sufficient, but that the significant use cases still
need to be defined at the strategic management level. Large companies,
in particular, are implementing blockchain use cases via specifically
created divisions. These companies are also at the forefront of digital
transformation in general terms. Most small- and medium-sized com­
panies, on the other hand, have not even dealt with the topic so far.
Many IT executives have not yet recognised the potential of blockchain.
This aspect tends to swing in two directions. On the one hand, managers
are not aware of the possible use cases in their industry and the increases
in efficiency that could be achieved. On the other hand, many believe
that blockchain is the best solution for every use case. Especially for
smart contracts, the conviction prevails that every process can be
improved disruptively by using smart contracts. However, the phe­
nomenon of the law of the instrument – if all you have is a hammer,
everything looks like a nail – (Maslow, 1969) has subsided slightly and the
technology and its potential are now more clearly perceived. For com­
panies without sufficient knowledge, the basic concept and the advan­
tages of using blockchain technology should nevertheless be further
clarified, especially concerning the idea and merits of forming collabo­
rative production networks:

P2: Blockchain technology can support the next evolutionary step of in­
dustrial IoT and tokenisation with its secure and immutable transparency.
Apart from several other opportunities for new business models
raised by the experts, disintermediation is the most attractive feature of
blockchain, as it could mitigate opportunistic behaviour in collaboration
(Wang, Singgih et al., 2019). Opportunism has been shown to be
increasing when intermediaries are present in supply networks (Grover
& Malhotra, 2003). With the automatic execution of smart contracts and
full transparency of present and historical transactions, blockchain re­
duces opportunism threats. Disintermediation enables peer-to-peer
trading of services and goods, which opens a new research area
regarding the remaining role of businesses in this context and the in­
fluences on the behaviour of consumers participating in C2C trans­
actions. Thus, our third proposition is specified as:
P3: Disintermediation through blockchain enables radically new concepts
of exchanging and trading services and products.
Blockchain technology necessitates new perspectives on theories in
different research areas and their combination, as indicated by Saberi
et al. (2019) and Treiblmaier (2018). Approved theories such as social
capital theory, the resource-based view of organisations (Barney, 1991),
and transaction cost theory (Coase, 1937) may not be applicable in their
original form. In modern business, establishing trust is a transaction cost
itself, and therefore blockchain might lower overall transaction costs
through its transparency and distributed nature (Roeck, Sternberg, &
Hofmann, 2019). Linked to P1 above, the blockchain might lead to
smaller companies interacting on a short-term rather than a long-term
relationship basis (Ivanov et al., 2019). This brings us to our last

In this sense, more could be done to further explore and advance this
larger idea of blockchain as a network technology, as a step to build crosscompany networks without necessarily having a central authority to
control them (Interviewee F).
8

## Page 9

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

Barriers of blockchain adoption
in OM & manufacturing

Inter-organizational barriers

Intra-organizational barriers

Cryptocurrencies
(acceptance and use)

Technology barriers

External barriers

Lack of awareness

Lack of trust

Unclear governance
structure

Legal uncertainties
(smart contracts)

Issues with collaboration
and network establishment

Lack of management
support and investment

Missing standards

Regulatory uncertainty

Competence deficiencies,
staff difficulties

Missing infrastructure

Complex protocol
selection

Issues with transparency
and disclosure of “critical”
data

Creation of individual,
technical silos

Setup complexities
and costs

Fig. 2. Barriers of blockchain technology adoption in OM and manufacturing.

4.2.2. Intra-organizational barriers
The experts perceived standardisation as one of the keys to broader
application and exploitation of the technology’s potential (interviewees
A, B, D, E, F, H, I). Standardisation can create efficiency potentials that
can then be realised through features like smart contracts. Blockchain
standards also specify how transactions are structured, validated, and
secured in the network. As long as no such standard has been estab­
lished, the corporate reluctance will not noticeably improve, as several
experts predicted:

Although awareness has improved, there is still work to be done in
the area of competence building. The situation of knowledge accumu­
lation in the industry varies between big enterprises and SMEs. While
the former have already invested a lot in existing staff or hired experts
and in some cases even established blockchain departments, the latter
still have a lot of catching up to do. To make matters worse, the market
for skilled workers is scarce and developers, in particular, are hard to
find, as all experts agreed. However, the consulting market is wellpositioned in this area and can assist in the initial steps, as several of
the experts (B, E, F) pointed out. One expert, on the other hand, indi­
cated an interesting opinion:

And basically, everyone is waiting for this killer application. Where the
first one says, “Guys, I implemented it on this blockchain, it is running as
expected and my entire business process is depending on it” (Interviewee
A).

We also see the problem of the shortage of skilled specialists. But there is
also a lack of understanding that blockchain is just another technology. It
has great potential if you use it correctly. However, in the end, it is a
technology where most users in 5 to 10 years will not even notice that the
technology is used somewhere. And I think that is exactly why it is still
very difficult for many people to grasp what the technology is or does at its
core (Interviewee H).

Standardisation will also allow the dissolution of technical silos,
which have been developed as isolated, one-off solutions. This is con­
trary to the basic idea and the prospect of blockchain as a technology to
break informational silos and facilitate horizontal integration. Expert F
also notes that, apart from standardisation, the partners’ general trust in
each other must be strengthened or established in the first place. This is
closely related to the issue of collaboration and network establishment,
as mentioned above. Management support for network establishment is
vital and was highlighted by several experts (B, E, F, I):

Therefore, the staff situation may remain tense, but the issue of skills
on the operator side may subside as the protocols mature.
In OM and manufacturing, the process complexity is usually higher
than in other sectors, e.g. in the financial sector. Therefore, mainly
processes that are not business-critical are currently being implemented
as individual technical solutions in blockchain projects. These applica­
tions have not yet exceeded the status of proof-of-concept (interviewee
A). Large software providers, who are also active in consulting, often
build unique products (“technical silos” as interviewee H noted
fittingly). In most cases, governance is still centralised in these solutions,
e.g. at TradeLens, initiated by IBM (TradeLens, 2019). These projects do
not actively support standardisation and the development of critical
infrastructure. Consortia such as Hyperledger or R3 Corda are currently
the driving forces behind the development of industry infrastructure and
possible standardisation, which is a perception backed by literature
(Wang, Han et al., 2019). Productive solutions are predominantly
implemented at the consortia level in permissioned chains. This is
strongly related to the lack of an industry standard. The experts
confirmed the results of previous studies (Lacity & Khan, 2019) that
competition for the standard in the industry takes place between the
different consortia (interviewees D, E, F, H, I).

These decentralised networks have to develop first and companies have to
start sharing information before they start mapping processes across
companies via smart contracts (Interviewee F).
The benefits of collaboration only emerge when all partners perceive
transparency as a competitive advantage and business-critical processes
are implemented on the blockchain.
4.2.3. Technology barriers
The potential of smart contracts has been demonstrated above, but
some obstacles have yet to be overcome. There is still no framework for
smart contract execution that is legally sound and secure (interviewees
G and I). This may partly explain why no system has smart contracts in
productive use so far. Research has shown that many smart contracts are
insecurely set up and deployed on public blockchains (e.g. Luu, Chu,
Olickel, Saxena, & Hobor, 2016; Fröwis & Böhme, 2017). They are
protected by cryptography, but in their nature often call other smart
contracts or use data from the real world provided by oracles that may
9

## Page 10

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

cryptocurrencies for productive implementations in their active and
completed projects. This is the case for both options: newly created nonpublicly accessible cryptocurrencies that can be designed and used
exclusively for the ecosystem, as well as existing public cryptocurren­
cies. The industry is currently very hesitant to test use cases with
cryptocurrencies. A part of this scepticism can be attributed to the
volatility of existing cryptocurrencies and the media coverage of the
hype and crash in late 2017 and early 2018. The assumed volatility of
cryptocurrencies increases the complexity to a level that many com­
panies do not perceive as controllable. However, all interview partners
emphasised the excellent connection between blockchain applications
and cryptocurrencies. It will undoubtedly take some time before the first
productive use cases with cryptocurrencies go live that not only use
tokens for the network transactions but financial settlement as well.
These findings are replicated in other studies in the area of SCM (Wang,
Singgih et al., 2019). Increasing external pressure, e.g. through an
expansion of the use of cryptocurrencies as a means of payment, could
also drive them into business applications.

be manipulated. This implies that the contract would no longer be
executed in the sense of the contract creator. Interviewees C, G, and J
indicated that the correct setup of smart contracts, technically and le­
gally secure, requires proper training, which in turn refers to the topic of
skilled workers. One researcher from the expert group also noted that
legal certainty for smart contracts in the IoT context could only be
achieved if the actions of the IoT devices can be clearly attributed to the
intentions of a human (interviewee G). High data quality and accuracy
of data and referencing are therefore of immense importance for smart
contract utilisation.
In terms of protocol selection and blockchain setup, most companies
tend to use permissioned blockchains, mainly in a consortium approach.
From a technical standpoint, these are now simple to set up; the network
setup is what remains complicated. In general, several interviewees (B,
F, H, I, J) expect that a shift to permissionless blockchains will likely
happen in the future. This would allow a secure and effective application
in the protected environment while at the same time ensuring external
validation:
What I could well imagine is a hybrid variant in which the companies
themselves are operating in a consortium. But these anchor points in
public chains are there on a regular basis. For example, once a day or
every hour, a hash is written into a public blockchain. This way you can
save a kind of backup externally so that everyone can at least check if
something has been changed. I could imagine such a hybrid version, where
all the functionalities are still run on the consortium chain (Interviewee
F).

4.2.6. Comparison with the literature and research propositions
Similar to the potentials of blockchain technology in OM and
manufacturing in Section 4.1, we now compare the experts’ viewpoints
on barriers to blockchain adoption with the academic literature and
present research propositions. Table 5 highlights the viewpoints of both
groups on the different subjects of this study.
Interestingly, issues that are often raised by researchers (Mougayar,
2016; Saberi et al., 2019; Wang, Han et al., 2019) such as ethical
problems, security, and technical vulnerability of blockchain itself were
not raised by any of the interviewed experts. This certainly does not
imply that these issues are not relevant, but it indicates that other issues
are more relevant in OM and manufacturing. Security issues, however,
are present in media coverage, mostly regarding hacks and illegal use of
cryptocurrencies (Saberi et al., 2019; Swan, 2015). The public tends to
misunderstand cryptocurrencies as the only option for using blockchain
technology. Many experts regarded this as an obstacle to widespread
adoption, but not to industrial application. The focus should be set on
creating productive use cases with added value, which then have to be
well marketed to allow blockchain a better reputation in public and
industry. This may also help to overcome the reluctance of many
decision-makers who are waiting for successful and comprehensive
application in use cases, leading to the following fifth proposition:

However, as production data remains a sanctum for most companies,
the next developments in OM and manufacturing will instead rely on
hybrid solutions and remain permissioned at their core:
Everything public - I guess it is a very long way to get there. The
consortium-based approach will be the dominant approach in the medium
term and then you can really think far into the future and imagine a public
chain in this context (Interviewee E).
4.2.4. External barriers
Regulatory uncertainty was classified as important by the in­
terviewees (B, C, D, E, G, H, I), but ranked lower in comparison to
standardisation. Naturally, some companies are somewhat reluctant due
to regulatory uncertainty, but the relevant authorities are beginning to
deal with the issues more intensively (e.g., Boucher, Nascimento, &
Kritikos, 2017). Efforts to date have focused primarily on financial
transaction processing rather than any issues in OM or manufacturing.
Boucher et al. (2017) argue that criteria and regulation are necessary to
enforce the validity of smart contracts and transaction records by law.
The experts’ general view is that regulatory action should not be based
on abstract perspectives but should be targeted at specific issues (in­
terviewees B, G, I). Other areas should be explored through practical
applications before a stop is put to innovation through regulatory
intervention. However, two experts (A, H) noted that timely regulatory
intervention in the next years could favour the swift development of an
industry standard.
Legal uncertainties mainly exist for permissionless blockchains or
hybrid blockchains with a connection to a permissionless, public
blockchain such as Bitcoin or Ethereum. General Data Protection
Regulation (GDPR) compliance is an important issue (interviewees E, G,
H, I). The right of consumers or any affected entity to be assured that
data is deleted when it is no longer needed for service execution is
difficult to realise in a permissionless and public system. Therefore,
companies tend to use permissioned blockchains, mainly in a con­
sortium approach as indicated above.

P5: Identifying and implementing truly significant use cases in OM and
manufacturing will enable a broader and comprehensive application of
blockchain in this area.
Security and technical vulnerability of smart contracts in particular
are two of the main technological barriers identified by the experts. The
establishment of secure blockchain networks has to be based on tech­
nological solutions that are implemented company-wide with appro­
priate management support and investment policies. In this case, this
study is in line with existing literature (Saberi et al., 2019; Wang, Han
et al., 2019). Adaptability of blockchain in the sense of scalability, which
is an issue present in the media concerning public cryptocurrencies
(Lewis, 2019), research concerning IoT connection (Conoscenti, Vetro,
& De Martin, 2017), and adoption in the service sector (Biswas & Gupta,
2019), was not indicated as a barrier for adoption in OM and
manufacturing. On the other hand, standardisation was jointly indicated
by research and the experts as an essential prerequisite to advance the
technology. Standardisation might lead to more centralisation at first, as
all the players in the market have incentives to make their protocol the
decisive one. However, in the long run, standardisation is crucial to
support a targeted evolution of the technology and enabling more
companies to move into blockchain operated networks (Cole et al.,
2019; Saberi et al., 2019; Wang, Singgih et al., 2019). This results in our
sixth proposition:

4.2.5. Cryptocurrencies in the industry
All interview partners stated that they do not (and did not) use
10

## Page 11

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

Table 5
Comparison of academic and expert viewpoints on barriers of blockchain adoption in OM and manufacturing.
Subject

Academic viewpoint

Experts’ viewpoint

Inter-organizational
barriers

• Lack of technical expertise (Kurpjuweit et al., 2019) and awareness
(Kamble et al., 2019) can be major blocking points towards adoption
• Lack of empirical evidence and applications in productive use (Cole et al.,
2019; Hackius & Petersen, 2020; Pournader et al., 2020)

• Lack of awareness among small- and medium-sized companies – advan­
tages of collaboration in networks needs to be clarified
• Technical expertise is limited, staff difficulties in all sectors
• Current concepts are mostly isolated and centralized, there is no
development of entire industrial ecosystems – consortia dominate

Intra-organizational
barriers

• Management support is vital for implementation and further development
(Saberi et al., 2019; Wang, Han et al., 2019)
• Full transparency of data may be a blocking point (Wang, Han et al., 2019),
resistance to share valuable information in real-time (Queiroz & Fosso
Wamba, 2019)

• Full transparency of data is still perceived as a major risk by
manufacturing firms
• Management support is vital for network establishment
• Standardisation is the key to a broader application – will also help in
developing missing infrastructure

Technology barriers

• Limited scalability is a barrier to widespread productive use (Biswas &
Gupta, 2019; Conoscenti et al., 2017; Makhdoom, 2019; Mougayar, 2016)
• Lack of standardization that leads to technological uncertainty (Babich &
Hilary, 2020; Hackius & Petersen, 2020; Wang, Singgih et al., 2019)
• Business is reluctant to adapt to new and complex governance structures
(Lacity & Khan, 2019; Wang, Han et al., 2019)
• Security and technical vulnerability of blockchains limits further diffusion
(Babich & Hilary, 2020; Saberi et al., 2019)
• Research on governance models needs to intensify (Wang, Han et al.,
2019)

• Smart contracts tend to be insecure and technically vulnerable – more
research activities needed before adoption
• Governance structures are essential for the decentralization of the
networks and crucial to enable full, equal transparency – still no
applicable standard available
• Shift to permissionless blockchains will happen soon, but OM
applications are more likely to occur in consortia
• Setup is technically simple; network establishment is the hard part

External barriers

• Compliance with regulations is difficult to achieve with blockchain
applications in use (Babich & Hilary, 2020; Saberi et al., 2019)
• Legal uncertainties persist and hinder the diffusion of the technology
(Mougayar, 2016)

• Regulatory uncertainty discourages firms from further application
development
• Smart contracts need a legal framework to be implemented broadly
• Legal uncertainties mainly affect permissionless solutions, firms tend to
use permissioned blockchains only

Cryptocurrencies

• Use of cryptocurrencies and public blockchains enable entirely new fields
of application for the technology like data marketplaces for IoT (Wang,
Han et al., 2019)

• The manufacturing industry is hesitant to test use cases with
cryptocurrencies
• Broad application in practice will still take time, potentials should be
specified more precisely to accelerate the implementation

P6: Timely standardisation is crucial for the future targeted development
of blockchain technology and its further diffusion in OM and
manufacturing.

implementation of blockchain technology in business. Although there
are not many established blockchain applications in OM and
manufacturing, the interviewees emphasised the potential of the tech­
nology. This assessment is supported by industry surveys (e.g., Gente­
mann, 2019). One reason for the delay in the industry could be the mass
of technologies available and the pressure from Industry 4.0 and IoT that
has led to various projects in these areas. Therefore, managers should
recognise the specific functionalities of blockchain and examine poten­
tial use cases. All experts pointed out the need for knowledge accumu­
lation in industry. Adaption has to include the organisation itself, but
also the employees. They have to be recruited or trained so that the
benefits of the technology can be put to meaningful use:

The experts emphasised their optimism that technological progress
will continue and more transactions per second will be achieved so that
the amount of data in production can be mapped efficiently. Intensified
research on data security of smart contracts and the interconnection of
protocols are the most promising research directions for blockchain
utilisation in OM and manufacturing. Rather than investing efforts into
the optimisation of private and permissioned blockchain protocols, the
focus should be set on achieving a robust interconnection of public and
private protocols to serve both the security needs of businesses as well as
the audit requirements and transparency in the collaboration processes.
This leads to our last proposition:

You can park a Ferrari in front of my office. However, if I cannot drive a
car and drive against a tree two meters ahead, the best Ferrari will not do
me any good (Interviewee E).

P7: Secure and efficient smart contracts and robust ways to interconnect
private and public blockchain protocols will facilitate utilisation in OM
and manufacturing.

Smart contracts that offer various application possibilities (e.g., IoT
devices) need to be particularly carefully assessed, as an incorrect or
inappropriate set up could lead to critical system failures. Individual
requirements should be clarified in advance and taken into account in
the choice of a protocol and a consensus mechanism. New and upcoming
networks will likely be hybrid versions of permissioned and permis­
sionless blockchains. Managers should adapt to these developments and
take preparatory measures to ensure that no confidential data will be
publicly accessible, but that periodic storage of transactions in one (or
multiple) public blockchains is enabled. External auditors can then
validate the proper operation of the network while confidentiality of
data and performance of the productive permissioned blockchain is
maintained, technically referred to as “anchoring”.
The implications above are strongly related to blockchain setup and
network structure. As most experts are confident that the most signifi­
cant innovative drive is and will be generated by existing industry
consortia, companies seeking to benefit from early blockchain adaption
should consider joining a consortium from their industry. Some experts

5. Implications
In this section, the contribution of this paper is extended by
providing industry and academic research with suggestions on topics
that still need to be researched and tested in the field. Along with this,
trends that will become important in the future and recommendations
for action in order to react appropriately to these developments are
indicated. The final subsection then highlights the gaps in current efforts
related to blockchain technology between academic research and in­
dustry, as indicated by the experts in our study.
5.1. Managerial implications
From a managerial perspective, our findings can assist practitioners
in developing a strategy for the evaluation and subsequent
11

## Page 12

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

also recommend a somewhat agnostic attitude towards the technical
choice of a platform or a protocol. The focus should be on network
building and knowledge generation to gain competitive advantages.

5.3. Gap analysis
In order to provide practitioners with insights into the main areas of
research in academic institutions that go beyond the experts’ expres­
sions or focus on different issues, we highlight these aspects in the
following short subsection.
With regard to the potential of the technology, it is evident that
academia is more focused on the potential improvement of existing
networks using blockchain technology for efficient and secure data
sharing (Wang, Han et al., 2019; Weber et al., 2016). Another potential
addressed is the high cost of centralized approaches (e.g. intermediaries)
that can be avoided using decentralized solutions like blockchain (Ca­
sino et al., 2019; Christidis & Devetsikiotis, 2016). Thus, scholars are
mainly examining the effects of disintermediation as the primary impact
of blockchain on existing business models (Lacity & Khan, 2019).
Research is also perceiving smart contracts as vital in the further diffu­
sion of blockchain in OM and manufacturing and increasingly devotes
efforts to this feature (Christidis & Devetsikiotis, 2016; Wang, Han et al.,
2019). The use of smart contracts could limit opportunistic behaviour in
transactional relationships, which is an interesting research aspect
(Schmidt & Wagner, 2019).
In terms of challenges, most viewpoints of academia and the experts
align. The lack of technical expertise prevents a more rapid dissemina­
tion of the technology, which is reinforced by the limited number of
available productive use cases (Cole et al., 2019; Kurpjuweit et al., 2019;
Pournader et al., 2020). Research is still concerned with the limited
scalability of blockchain solutions (Makhdoom, 2019; Mougayar, 2016),
which is not perceived as critical from within the industry. However, for
the replacement of entire central ecosystems, there is certainly still
technical work to be done. Other scholars indicated that the security and
technical vulnerability of the technology in general limit the further
diffusion into the business environment (Babich & Hilary, 2020; Saberi
et al., 2019). The experts identified this aspect for smart contracts
exclusively. Research on new and adapted governance structures has
been highlighted by experts as well as scholars and is a promising topic
for the research community on both sides. Besides, meaningful appli­
cations with cryptocurrencies as the main reimbursement method
should be explored in academia and industry as well (Wang, Han et al.,
2019).

5.2. Academic research implications
Besides the interesting topics for further research indicated by
literature (Table 2) and the research propositions identified above, this
study has uncovered further research topics that are valuable to scien­
tists. The experts were asked to identify the specific research needs that
they perceive. Frequently mentioned points include the design of
governance in the network (5 out of 10 experts), legal topics such as
GDPR compliance (4), and research on specific industry-wide applica­
tions and use cases that are truly valuable (3).
Governance has emerged as the most urgent topic for further
research. In addition to basic research on governance in decentralised
systems, the establishment and operation of decentralised crosscompany networks and the stimulation of these networks through
automation of governance would be interesting in the long term. How
are decisions made in a blockchain network? How is reputation built in
these networks? Which decisions are made routinely and could be
automated? This complements the issues raised in literature so far: Cole
et al. (2019) suggested exploring the link between governance and trust
in supply chains. New supply chain and production network dynamics
could emerge that fundamentally change the way customer orders are
processed and relationships built and maintained (Wang, Han et al.,
2019).
Legal issues include the design of legally valid and secure smart
contracts and compliance with GDPR concerning disclosed identities
and personal data. Another topic raised is the ability of deleting or
archiving older histories of data that are no longer needed. This could be
achieved by connecting several blockchains, with one working as a
“backup chain”, or by hiding transaction details besides the crypto­
graphic functions needed to operate the blockchain securely. First
research on this topic is already ongoing (Farshid, Reitz, & Roßbach,
2019). Cryptocurrencies for productive use in blockchains in production
networks need to be established and the technical integration of cryp­
tocurrencies into existing IT landscapes must be advanced. Blockchain
also promises to close gaps among different technologies in use, which
can lead to improved relationships and cost savings (Banerjee, 2018).
These integrations of technologies, interdependencies between systems
and potential consolidations should be studied.
From an economical perspective, there is still a need for research into
processes with high potential for cost savings and efficiency enhance­
ment in the field of OM and manufacturing. Several experts (B, C, D, E, F,
H, I) emphasised that the potential of smart contracts has hardly been
exploited yet and is closely linked to the redesign of processes, markets,
and business models. Several new business models (e.g., smart contract
based business processes, tokenisation of assets) were outlined by the
experts that should be examined in research with critical consideration
of cost-effectiveness and technical suitability. Additionally, scholars
should focus on specific industries to assess potential use cases and new
business models in collaboration with managers, using the results of this
study as guidelines.
As the sample of our study is numerically and regionally limited and
the blockchain sphere is evolving rapidly, we call for further empirical
studies. These could confirm, contradict, or extend the barriers, poten­
tials, and propositions identified in this study in a global context. The
maturity level of companies or managers dealing with blockchain might
also be an exciting element of research. Furthermore, the results of this
study could be verified in the context of an extensive empirical study
with major OM companies from different industries. Techniques like the
Delphi method could be utilised to evaluate expert verdicts.

6. Summary
The objective of this paper was to explore the potential and the
existing barriers of blockchain technology in OM and manufacturing
through an empirical study. Potential for new collaborative
manufacturing networks, efficiency gains through smart contract uti­
lisation, the linking of IoT and blockchain, and several new business
models like the tokenisation of assets were identified. Barriers still exist
in the form of lack of awareness in the industry, general scepticism
concerning trust and transparency in networks, missing standards, un­
clear governance systems, regulatory and legal uncertainties as well as
the complex integration of cryptocurrencies into network design. In
addition to this assessment by industry experts, implications for the
industry on how to move forward with blockchain adoption were un­
covered and highlighted. A careful analysis of possible use cases has to
be conducted, but rather sooner than later, as many business areas are
still untapped and competitive advantages can be achieved. Promising
approaches and obstacles to be avoided were outlined. Academic
research is provided with stimuli for activities in areas where the sci­
entific support will enable a broad application of blockchain technology
in practice. This includes concepts and frameworks for governance
structures in new production and supply networks, making blockchain
systems compliant with the law, assessing the impact of trustlessness on
network dynamics, and research on specific industry-wide use cases.

12

## Page 13

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

CRediT authorship contribution statement

• In which direction are the different protocols developing? Do you
see any of the variants gaining in importance? Are hybrid variants
conceivable and feasible?

Jacob Lohmer: Conceptualization, Methodology, Software, Valida­
tion, Formal analysis, Investigation, Writing - original draft, Writing review & editing, Visualization. Rainer Lasch: Supervision, Writing review & editing, Validation, Project administration, Funding
acquisition.

• What influence do cryptocurrencies have on current use cases and
proofs-of-concept? Have you worked with cryptocurrencies in your
projects?

Declaration of Competing Interest

• How do you perceive a potential integration and utilization of fiat
currencies?

The authors declare that they have no known competing financial
interests or personal relationships that could have appeared to influence
the work reported in this paper.

• Do you recognize security concerns in the industry? How do you
assess concerns about security or transparency (or else) concerning
the further development of the sector?

Appendix 1. Interview guidelines
1. Organizational details

4. Further development, implications

• Please briefly describe your company, the department you are
working in, your position in the firm, your length of employment,
your specific focus area in the blockchain environment and current
projects you are working on.

• What implications can you provide to the industry?
• Where do you see a need for further research?
References

• How would you assess your company’s position in the market? Who
are your fiercest competitors?

Akyuz, G. A., & Gursoy, G. (2019). Strategic management perspectives on supply chain.
Management Review Quarterly. https://doi.org/10.1007/s11301-019-00165-6.
Angrish, A., Craver, B., Hasan, M., & Starly, B. (2018). A case study for blockchain in
manufacturing: “fabRec”: A prototype for peer-to-peer network of manufacturing
nodes. Procedia Manufacturing, 26, 1180–1192. https://doi.org/10.1016/j.
promfg.2018.07.154.
Babich, V., & Hilary, G. (2020). Distributed ledgers and operations: what operations
management researchers should know about blockchain technology. Manufacturing
& Service Operations Management, 22(2), 223–240. https://doi.org/10.1287/
msom.2018.0752.
Bahga, A., & Madisetti, V. K. (2016). Blockchain platform for industrial internet of things.
Journal of Software Engineering and Applications, 09(10), 533–546. https://doi.org/
10.4236/jsea.2016.910036.
Bai, L., Hu, M., Liu, M., & Wang, J. (2019). BPIIoT: A light-weighted blockchain-based
platform for industrial IoT. IEEE Access, 7, 58381–58393. https://doi.org/10.1109/
ACCESS.2019.2914223.
Banerjee, A. (2018). Blockchain technology: Supply chain insights from ERP. In
Advances in computers (Vol. 111, pp. 69–98). Elsevier. https://doi.org/10.1016/bs.
adcom.2018.03.007.
Barney, J. (1991). Firm resources and sustained competitive advantage. Journal of
Management, 17(1), 99–120. https://doi.org/10.1177/014920639101700108.
Bartsch, F., Neidhardt, N., Nüttgens, M., Holland, M., & Kompf, M. (2018).
Anwendungsszenarien für die Blockchain-Technologie in der Industrie 4.0. HMD
Praxis Der Wirtschaftsinformatik, 55(6), 1274–1284. https://doi.org/10.1365/
s40702-018-00456-8.
Biswas, B., & Gupta, R. (2019). Analysis of barriers to implement blockchain in industry
and service sectors. Computers and Industrial Engineering, 136(July), 225–241.
https://doi.org/10.1016/j.cie.2019.07.005.
Blossey, G., Eisenhardt, J., & Hahn, G. (2019). Blockchain technology in supply chain
management: An application perspective. In Proceedings of the 52nd Hawaii
international conference on system sciences (Vol. 6, pp. 6885–6893). https://doi.
org/10.24251/HICSS.2019.824.
Bokrantz, J., Skoogh, A., Berlin, C., & Stahre, J. (2017). Maintenance in digitalised
manufacturing: Delphi-based scenarios for 2030. International Journal of Production
Economics, 191(April), 154–169. https://doi.org/10.1016/j.ijpe.2017.06.010.
Bosch (2020). Everything you need to know about IOTA, XDK2MAM and Bosch XDK.
Retrieved June 3, 2020, from https://www.bosch-connectivity.com/newsroom/
blog/xdk2mam/.
Boucher, P., Nascimento, S., & Kritikos, M. (2017). How blockchain technology could
change our lives. European Parliamentary Research Service. https://doi.org/10.2861/
926645.
Brinch, M. (2018). Understanding the value of big data in supply chain management and
its business processes: Towards a conceptual framework. International Journal of
Operations and Production Management, 38(7), 1589–1614. https://doi.org/10.1108/
IJOPM-05-2017-0268.
Bürer, M. J., de Lapparent, M., Pallotta, V., Capezzali, M., & Carpita, M. (2019). Use cases
for blockchain in the energy industry opportunities of emerging business models and
related risks. Computers and Industrial Engineering, 137(August), 106002. https://doi.
org/10.1016/j.cie.2019.106002.
Buterin, V. (2015). On public and private blockchains. Retrieved August 29, 2019, from
https://blog.ethereum.org/2015/08/07/on-public-and-private-blockchains/.

2. Potential and barriers of the blockchain in OM and
manufacturing
• Where do you see the potential of blockchain in the operations
environment?
• How do you assess current projects and applications in relation to
this potential?
• What barriers are currently preventing a broad application and new
use cases in OM and manufacturing?
• How could these barriers be overcome?
3. Specific areas of interest in the analysis of blockchain
technology
• How do you assess the current fragmented protocol situation? What
influence does possible standardization have on current and future
developments?
• Do you expect blockchain technology to be more of an addition to
existing systems or a disruption?
• What is your perception of blockchain and IoT? Have you noticed
any issues in the industry regarding this interconnection?
• Turning to smart contracts: Do you consider them more as a blessing
curse or a curse? What are your experiences with smart contracts in
the industry?
• What has to be done to implement smart contracts on IoT devices in
manufacturing companies on a large scale?
• Do you see any new business models that are triggered by block­
chain? What influence do these business models have on the status
quo?
13

## Page 14

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789

Casino, F., Dasaklis, T. K., & Patsakis, C. (2019). A systematic literature review of
blockchain-based applications: Current status, classification and open issues.
Telematics and Informatics, 36(May), 55–81. https://doi.org/10.1016/j.
tele.2018.11.006.
Chang, Y., Iakovou, E., & Shi, W. (2019). Blockchain in global supply chains and cross
border trade: A critical synthesis of the state-of-the-art, challenges and opportunities.
International Journal of Production Research, 1–18. https://doi.org/10.1080/
00207543.2019.1651946.
Christidis, K., & Devetsikiotis, M. (2016). Blockchains and smart contracts for the
internet of things. IEEE Access, 4, 2292–2303. https://doi.org/10.1109/
ACCESS.2016.2566339.
Chryssolouris, G., Mavrikios, D., Pappas, M., Xanthakis, E., & Smparounis, K. (2009).
A web and virtual reality-based platform for collaborative product review and
customisation. In L. Wang, & A. Y. C. Nee (Eds.), Collaborative design and planning for
digital manufacturing (pp. 137–152). London: Springer. https://doi.org/10.1007/
978-1-84882-287-0_6.
Coase, R. H. (1937). The nature of the firm. Economica, 4(16), 386–405. https://doi.org/
10.1111/j.1468-0335.1937.tb00002.x.
Cole, R., Stevenson, M., & Aitken, J. (2019). Blockchain technology: Implications for
operations and supply chain management. Supply Chain Management: An International
Journal, 24(4), 469–483. https://doi.org/10.1108/SCM-09-2018-0309.
Conoscenti, M., Vetro, A., & De Martin, J. C. (2017). Blockchain for the Internet of
Things: A systematic literature review. In Proceedings of IEEE/ACS international
conference on computer systems and applications, AICCSA (pp. 1–6). https://doi.org/
10.1109/AICCSA.2016.7945805.
Cubichain (2020). Cubichain Technologies. Retrieved June 3, 2020, from http://www.
cubichain.com/.
De Souza Cardoso, L. F., Mariano, F. C. M. Q., & Zorzal, E. R. (2020). A survey of
industrial augmented reality. Computers & Industrial Engineering, 139, 106159.
https://doi.org/10.1016/j.cie.2019.106159.
Dew, N., Read, S., Sarasvathy, S. D., & Wiltbank, R. (2009). Effectual versus predictive
logics in entrepreneurial decision-making: Differences between experts and novices.
Journal of Business Venturing, 24(4), 287–309. https://doi.org/10.1016/j.
jbusvent.2008.02.002.
Durugbo, C. (2016). Collaborative networks: A systematic review and multi-level
framework. International Journal of Production Research, 54(12), 3749–3776. https://
doi.org/10.1080/00207543.2015.1122249.
Eisenhardt, K. M. (1989). Building theories from case study research. Academy of
Management Review, 14(4), 532–550. https://doi.org/10.5465/amr.1989.4308385.
Eisenhardt, K. M., & Graebner, M. E. (2007). Theory building from cases: Opportunities
and challenges. Academy of Management Journal, 50(1), 25–32. https://doi.org/
10.5465/AMJ.2007.24160888.
Farshid, S., Reitz, A., & Roßbach, P. (2019). Design of a Forgetting Blockchain: A Possible
Way to Accomplish GDPR Compatibility. In Proceedings of the 52nd Hawaii
international conference on system sciences, 6, 7087–7095. https://doi.org/10.242
51/hicss.2019.850.
Ferdows, K. (2018). Keeping up with growing complexity of managing global operations.
International Journal of Operations and Production Management, 38(2), 390–402.
https://doi.org/10.1108/IJOPM-01-2017-0019.
Fleischmann, M., & Ivens, B. (2019). Exploring the role of trust in blockchain adoption:
An inductive approach. In Proceedings of the 52nd Hawaii international conference
on system sciences (Vol. 6, pp. 6845–6854). https://doi.org/10.24251/hicss
.2019.820.
Fröwis, M., & Böhme, R. (2017). In code we trust? In J. Garcia-Alfaro, G. NavarroArribas, H. Hartenstein, & J. Herrera-Joancomartí (Eds.), Lecture notes in computer
science (Vol. 10436, pp. 357–372). Springer International Publishing. https://doi.
org/10.1007/978-3-319-67816-0_20.
Gentemann, L. (2019). Blockchain in Deutschland – Einsatz, Potenziale,
Herausforderungen. Bitkom e.V. Studienbericht 2019. Retrieved March 4, 2020,
from https://www.bitkom.org/Bitkom/Publikationen/Blockchain-Deutschland-Ein
satz-Potenziale-Herausforderungen.
Grover, V., & Malhotra, M. K. (2003). Transaction cost framework in operations and
supply chain management research: Theory and measurement. Journal of Operations
Management, 21(4), 457–473. https://doi.org/10.1016/S0272-6963(03)00040-8.
Guest, G., Bunce, A., & Johnson, L. (2006). How many interviews are enough?: An
experiment with data saturation and variability. Field Methods, 18(1), 59–82.
https://doi.org/10.1177/1525822X05279903.
Gurtu, A., & Johny, J. (2019). Potential of blockchain technology in supply chain
management: A literature review. International Journal of Physical Distribution and
Logistics Management, 49(9), 881–900. https://doi.org/10.1108/IJPDLM-11-20180371.
Hackius, N., & Petersen, M. (2020). Translating high hopes into tangible benefits: How
incumbents in supply chain and logistics approach blockchain. IEEE Access. https://
doi.org/10.1109/ACCESS.2020.2974622.
Helo, P., & Hao, Y. (2019). Blockchains in operations and supply chains: A model and
reference implementation. Computers and Industrial Engineering, 136(July), 242–251.
https://doi.org/10.1016/j.cie.2019.07.023.
Helo, P., Suorsa, M., Hao, Y., & Anussornnitisarn, P. (2014). Toward a cloud-based
manufacturing execution system for distributed manufacturing. Computers in
Industry, 65(4), 646–656. https://doi.org/10.1016/j.compind.2014.01.015.
Hofmann, E., & Rüsch, M. (2017). Industry 4.0 and the current status as well as future
prospects on logistics. Computers in Industry, 89, 23–34. https://doi.org/10.1016/j.
compind.2017.04.002.
Hughes, L., Dwivedi, Y. K., Misra, S. K., Rana, N. P., Raghavan, V., & Akella, V. (2019).
Blockchain research, practice and policy: Applications, benefits, limitations,
emerging research themes and research agenda. International Journal of Information

Management, 49(February), 114–129. https://doi.org/10.1016/j.
ijinfomgt.2019.02.005.
Hull, R. (2017). Blockchain: Distributed event-based processing in a data-centric world.
In DEBS 2017 – Proceedings of the 11th ACM International Conference on Distributed
Event-Based Systems (pp. 2–4). https://doi.org/10.1145/3093742.3097982.
Hyperledger (2020). Hyperledger – Open Source Blockchain Technologies. Retrieved
April 21, 2020, from https://www.hyperledger.org/.
Ivanov, D., Dolgui, A., & Sokolov, B. (2019). The impact of digital technology and
Industry 4.0 on the ripple effect and supply chain risk analytics. International Journal
of Production Research, 57(3), 829–846. https://doi.org/10.1080/
00207543.2018.1488086.
Ivanov, D., Dolgui, A., Sokolov, B., Werner, F., & Ivanova, M. (2016). A dynamic model
and an algorithm for short-term supply chain scheduling in the smart factory
industry 4.0. International Journal of Production Research, 54(2), 386–402. https://
doi.org/10.1080/00207543.2014.999958.
Kamble, S., Gunasekaran, A., & Arha, H. (2019). Understanding the Blockchain
technology adoption in supply chains-Indian context. International Journal of
Production Research, 57(7), 2009–2033. https://doi.org/10.1080/
00207543.2018.1518610.
Kim, H., & Laskowski, M. (2017). A perspective on blockchain smart contracts: Reducing
uncertainty and complexity in value exchange. In 2017 26th International
conference on computer communication and networks (ICCCN) (pp. 1–6). IEEE. htt
ps://doi.org/10.1109/ICCCN.2017.8038512.
Kobzan, T., Biendarra, A., Schriegel, S., Herbst, T., Muller, T., & Jasperneite, J. (2018).
Utilizing blockchain technology in industrial manufacturing with the help of
network simulation. In 2018 IEEE 16th international conference on industrial
informatics (INDIN) (pp. 152–159). IEEE. https://doi.org/10.1109/INDIN.201
8.8472011.
Kshetri, N. (2018). Blockchain’s roles in meeting key supply chain management
objectives. International Journal of Information Management, 39(June 2017),
80–89. https://doi.org/10.1016/j.ijinfomgt.2017.12.005.
Kurpjuweit, S., Schmidt, C. G., Klöckner, M., & Wagner, S. M. (2019). Blockchain in
additive manufacturing and its impact on supply chains. Journal of Business Logistics,
1–25. https://doi.org/10.1111/jbl.12231.
Kwon, I. W. G., & Suh, T. (2004). Factors affecting the level of trust and commitment in
supply chain relationships. Journal of Supply Chain Management, 40(1), 4–14. https://
doi.org/10.1111/j.1745-493X.2004.tb00165.x.
Lacity, M., & Khan, S. (2019). Exploring preliminary challenges and emerging best
practices in the use of enterprise blockchains applications. In Proceedings of the 52nd
Hawaii international conference on system sciences (pp. 4665–4674).
Lee, J., Azamfar, M., & Singh, J. (2019). A blockchain enabled cyber-physical system
architecture for industry 4.0 manufacturing systems. Manufacturing Letters, 20,
34–39. https://doi.org/10.1016/j.mfglet.2019.05.003.
Leng, J., Yan, D., Liu, Q., Xu, K., Zhao, J. L., Shi, R., et al. (2019). ManuChain: Combining
permissioned blockchain with a holistic optimization model as bi-level intelligence
for smart manufacturing. IEEE Transactions on Systems, Man, and Cybernetics: Systems,
1–11. https://doi.org/10.1109/tsmc.2019.2930418.
Lewis, M. (2019). Multimillionaire 25-year-old crypto king Vitalik Buterin speaks to the
Star about the future of Ethereum. The Star. Retrieved from www.thestar.com/busin
ess/2019/08/19/ethereums-vitalik-buterin-on-reducing-cryptocurrencys-risks.html.
Li, Z., Barenji, A. V., & Huang, G. Q. (2018). Toward a blockchain cloud manufacturing
system as a peer to peer distributed network platform. Robotics and ComputerIntegrated Manufacturing, 54(May), 133–144. https://doi.org/10.1016/j.
rcim.2018.05.011.
Lohmer, J. (2019). Applicability of blockchain technology in scheduling resources within
distributed manufacturing. In Logistics management – Proceedings of the German
academic association for business research 2019 (pp. 89–103). Springer. https://doi.
org/10.1007/978-3-030-29821-0_7.
Longo, F., Nicoletti, L., Padovano, A., d’Atri, G., & Forte, M. (2019). Blockchain-enabled
supply chain: An experimental study. Computers and Industrial Engineering, 136(July),
57–69. https://doi.org/10.1016/j.cie.2019.07.026.
Luu, L., Chu, D.-H., Olickel, H., Saxena, P., & Hobor, A. (2016). Making smart contracts
smarter. In Proceedings of the 2016 ACM SIGSAC conference on computer and
communications security – CCS’16 (pp. 254–269). New York, New York, USA: ACM
Press. https://doi.org/10.1145/2976749.2978309.
Makhdoom, I., et al. (2019). Blockchain’s adoption in IoT: The challenges, and a way
forward. Journal of Network and Computer Applications, 125, 251–279. https://doi.
org/10.1016/j.jnca.2018.10.019.
Maslow, A. H. (1969). Psychology of Science: A Reconnaissance. Nevada: Gateway Books.
Mayring, P. (2015). Qualitative Inhaltsanalyse: Grundlagen und Techniken (12th ed.).
Weinheim: Beltz Juventa Verlag.
Meyer, T., Kuhn, M., & Hartmann, E. (2019). Blockchain technology enabling the
Physical Internet: A synergetic application framework. Computers and Industrial
Engineering, 136(July), 5–17. https://doi.org/10.1016/j.cie.2019.07.006.
Moeuf, A., Lamouri, S., Pellerin, R., Tamayo-Giraldo, S., Tobon-Valencia, E., & Eburdy, R.
(2019). Identification of critical success factors, risks and opportunities of Industry
4.0 in SMEs. International Journal of Production Research, 1–17. https://doi.org/
10.1080/00207543.2019.1636323.
Moktadir, M. A., Ali, S. M., Paul, S. K., & Shukla, N. (2019). Barriers to big data analytics
in manufacturing supply chains: A case study from Bangladesh. Computers and
Industrial Engineering, 128, 1063–1075. https://doi.org/10.1016/j.cie.2018.04.013.
Mougayar, W. (2016). The business blockchain: Promise, Practice, and application of the next
internet technology (1st ed.). Hoboken, New Jersey: John Wiley & Sons Inc.
Nakamoto, S. (2008). Bitcoin: A peer-to-peer electronic cash system. https://doi.org/10.
1007/s10838-008-9062-0.

14

## Page 15

J. Lohmer and R. Lasch

Computers & Industrial Engineering 149 (2020) 106789
Szabo, N. (1997). Formalizing and securing relationships on public networks. First
Monday, 2(9), 1–21. https://doi.org/10.5210/fm.v2i9.548.
Tao, F., Cheng, Y., Zhang, L., & Nee, A. Y. C. (2017). Advanced manufacturing systems:
Socialization characteristics and trends. Journal of Intelligent Manufacturing, 28(5),
1079–1094. https://doi.org/10.1007/s10845-015-1042-8.
Tapscott, D., & Tapscott, A. (2018). How blockchain will change organizations. What the
Digital Future Holds, 58(2), 10–13. https://doi.org/10.7551/mitpress/
11645.003.0010.
Tasca, P. (2018. The hope and betrayal of blockchain. The New York Times. Retrieved
from https://www.nytimes.com/2018/12/04/opinion/blockchain-bitcoin-technolo
gy-revolution.html.
TradeLens (2019). Tradelens: Digitizing the global supply chain. Retrieved August 16,
2019, from https://www.tradelens.com.
Treiblmaier, H. (2018). The impact of the blockchain on the supply chain: A theorybased research framework and a call for action. Supply Chain Management, 23(6),
545–559. https://doi.org/10.1108/SCM-01-2018-0029.
Tuma, A. (1998). Configuration and coordination of virtual production networks.
International Journal of Production Economics, 56–57, 641–648. https://doi.org/
10.1016/S0925-5273(97)00146-1.
Wang, G., Gunasekaran, A., Ngai, E. W. T., & Papadopoulos, T. (2016). Big data analytics
in logistics and supply chain management: Certain investigations for research and
applications. International Journal of Production Economics, 176, 98–110. https://doi.
org/10.1016/j.ijpe.2016.03.014.
Wang, L., Shen, X., Li, J., Shao, J., & Yang, Y. (2019). Cryptographic primitives in
blockchains. Journal of Network and Computer Applications, 127, 43–58. https://doi.
org/10.1016/j.jnca.2018.11.003.
Wang, S., Wan, J., Zhang, D., Li, D., & Zhang, C. (2016). Towards smart factory for
industry 4.0: A self-organized multi-agent system with big data based feedback and
coordination. Computer Networks, 101, 158–168. https://doi.org/10.1016/j.
comnet.2015.12.017.
Wang, Y., Han, J. H., & Beynon-Davies, P. (2019). Understanding blockchain technology
for future supply chains: A systematic literature review and research agenda. Supply
Chain Management: An International Journal, 24(1), 62–84. https://doi.org/10.1108/
SCM-03-2018-0148.
Wang, Y., Singgih, M., Wang, J., & Rit, M. (2019). Making sense of blockchain
technology: How will it transform supply chains? International Journal of
Production Economics, 211(April 2018), 221–236. https://doi.org/10.1016/j.
ijpe.2019.02.002.
Weber, I., Xu, X., Riveret, R., Governatori, G., Ponomarev, A., & Mendling, J. (2016).
Untrusted business process monitoring and execution using blockchain. In B. Pernici
& M. Weske (Eds.), International conference on business process management (Vol.
9850, pp. 329–347). https://doi.org/10.1016/j.datak.2005.02.003.
Xu, L. Da., Xu, E. L., & Li, L. (2018). Industry 4.0: State of the art and future trends.
International Journal of Production Research, 56(8), 2941–2962. https://doi.org/
10.1080/00207543.2018.1444806.
Yang, X., Shi, G., & Zhang, Z. (2014). Collaboration of large equipment complete service
under cloud manufacturing mode. International Journal of Production Research, 52(2),
326–336. https://doi.org/10.1080/00207543.2013.825383.
Yin, R. K. (2018). Case Study Research and Applications: Design and Methods (6th ed.).
Thousand Oaks, CA: SAGE Publications Inc.
Zheng, Z., Xie, S., Dai, H. N., Chen, X., & Wang, H. (2018). Blockchain challenges and
opportunities: A survey. International Journal of Web and Grid Services, 14(4), 352.
https://doi.org/10.1504/IJWGS.2018.095647.

Niesen, T., Houy, C., Fettke, P., & Loos, P. (2016). Towards an integrative big data
analysis framework for data-driven risk management in industry 4.0. In Proceedings
of the Annual Hawaii International Conference on System Sciences. https://doi.org/
10.1109/HICSS.2016.627.
Pai, S., et al. (2018). Does blockchain hold the key to a new age of supply chain
transparency and trust? Retrieved December 20, 2018, from https://www.capgemini
.com/wp-content/uploads/2018/10/Digital-Blockchain-in-Supply-Chain-Report.
pdf.
Patton, M. Q. (2015). Qualitative research & evaluation methods: Integrating theory and
practice (4th ed.). Los Angeles: Sage Publications Ltd.
Petersen, M., Hackius, N., & von See, B. (2018). Mapping the sea of opportunities:
Blockchain in supply chain and logistics. It – Information Technology, 60(5–6),
263–271. https://doi.org/10.1515/itit-2017-0031.
Pournader, M., Shi, Y., Seuring, S., & Koh, S. C. L. (2020). Blockchain applications in
supply chains, transport and logistics: A systematic review of the literature.
International Journal of Production Research, 58(7), 2063–2081. https://doi.org/
10.1080/00207543.2019.1650976.
Queiroz, M. M., & Fosso Wamba, S. (2019). Blockchain adoption challenges in supply
chain: An empirical investigation of the main drivers in India and the USA.
International Journal of Information Management, 46(September 2018), 70–82.
https://doi.org/10.1016/j.ijinfomgt.2018.11.021.
Ren, L., Zhang, L., Wang, L., Tao, F., & Chai, X. (2017). Cloud manufacturing: Key
characteristics and applications. International Journal of Computer Integrated
Manufacturing, 30(6), 501–515. https://doi.org/10.1080/0951192X.2014.902105.
Rodríguez Monroy, C., & Vilana Arto, J. R. (2010). Analysis of global manufacturing
virtual networks in the aeronautical industry. International Journal of Production
Economics, 126(2), 314–323. https://doi.org/10.1016/j.ijpe.2010.04.008.
Roeck, D., Sternberg, H., & Hofmann, E. (2019). Distributed ledger technology in supply
chains: A transaction cost perspective. International Journal of Production Research,
1–18. https://doi.org/10.1080/00207543.2019.1657247.
Rossit, D. A., Tohmé, F., & Frutos, M. (2019). Industry 4.0: Smart Scheduling.
International Journal of Production Research, 57(12), 3802–3813. https://doi.org/
10.1080/00207543.2018.1504248.
Saberi, S., Kouhizadeh, M., Sarkis, J., & Shen, L. (2019). Blockchain technology and its
relationships to sustainable supply chain management. International Journal of
Production Research, 57(7), 2117–2135. https://doi.org/10.1080/
00207543.2018.1533261.
Scapolo, F., & Miles, I. (2006). Eliciting experts’ knowledge: A comparison of two
methods. Technological Forecasting and Social Change, 73(6), 679–704. https://doi.
org/10.1016/j.techfore.2006.03.001.
Schmidt, C. G., & Wagner, S. M. (2019). Blockchain and supply chain relations: A
transaction cost theory perspective. Journal of Purchasing and Supply Management, 25
(4), 100552. https://doi.org/10.1016/j.pursup.2019.100552.
Slack, N., Chambers, S., & Johnston, R. (2010). Operations management. Financial Times
Prentice Hall. https://doi.org/10.1079/9781845935030.0068.
Staufen AG (2018). Deutscher Industrie 4.0 Index 2018. Retrieved December 20, 2018,
from https://www.staufen.ag/fileadmin/HQ/02-Company/05-Media/2-Studie
s/STAUFEN.-Studie-Industrie-4.0-Index-2018-Web-DE-de.pdf.
Strauss, A., & Corbin, J. (1994). Grounded theory methodology. In N. K. Dezin, &
Y. S. Lincoln (Eds.), Handbook of qualitative research (pp. 273–285). Thousand Oaks,
CA: SAGE Publications Inc.
Swan, M. (2015). Blockchain: Blueprint for a new economy (1st ed.). Sebastopol, CA:
O’Reilly Media.

15
