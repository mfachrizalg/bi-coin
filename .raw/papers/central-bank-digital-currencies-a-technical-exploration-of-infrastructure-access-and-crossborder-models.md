---
source_type: pdf
title: "Central Bank Digital Currencies A Technical Exploration of Infrastructure Access and CrossBorder Models"
original_file: "thesis/reference/Central_Bank_Digital_Currencies_A_Technical_Exploration_of_Infrastructure_Access_and_CrossBorder_Models.pdf"
sha256: "1293880783997d4e39cb40f85dc3fc4efb5ddeca9d086718dbc73413b38f2915"
page_count: 6
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Central Bank Digital Currencies A Technical Exploration of Infrastructure Access and CrossBorder Models

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

2025 IEEE International Conference on Industry 4.0, Artificial Intelligence, and Communications Technology (IAICT) | 979-8-3315-8649-2/25/$31.00 ©2025 IEEE | DOI: 10.1109/IAICT65714.2025.11100853

The 2025 IEEE International Conference on Industry 4.0, Artificial Intelligence, and Communications Technology (IAICT)

Central Bank Digital Currencies: A Technical
Exploration of Infrastructure, Access, and CrossBorder Models
Rosa Indira
School of Economics and Business
Telkom University
Bandung, Indonesia
rosaindira@student.telkomuniversity.ac.id

Andry Alamsyah
School of Economics and Business
Telkom University
Bandung, Indonesia
andrya@telkomuniversity.ac.id

Abstract—Central Bank Digital Currencies (CBDCs)
represent a critical innovation in the era of Industry 4.0,
combining the technological advancements of digital currencies
with the regulatory oversight of central banks. Despite
increasing interest, gaps remain in understanding how technical
design choices influence CBDC integration into financial
systems. This study addresses this gap by examining key
technical characteristics of CBDCs across three critical
dimensions through a systematic literature review:
Infrastructure and Functionality, Access and Transfer
Mechanisms, and Cross-Border Payments. The Infrastructure
and Functionality dimension examines architectural models
(one-tier vs. two-tier), and the integration of blockchain and
Distributed Ledger Technology (DLT), non-DLT, and hybrid
systems, with a focus on how these frameworks impact CBDC
performance. The Access and Transfer Mechanisms dimension
focuses on access models (token-based vs. account-based) and
transfer methods (online vs. offline). The Cross-Border
Payments dimension explores interoperability through three
potential models: Compatible CBDC Systems, Linking Multiple
CBDC Systems, and Single Multi-Currency Systems. By
synthesizing insights from ongoing global CBDC projects such
as Project Garuda, Project Jura, and e-CNY, this research
develops a refined taxonomy that categorizes and maps technical
design elements of CBDCs. The findings provide a
comprehensive transformative mapping of CBDC’s technical
aspects, supporting policymakers, regulators, and developers to
navigate implementation challenges and achieve the goals of
Industry 4.0. Future studies could further investigate specific
use cases to optimize CBDC frameworks.
Keywords— central bank digital currency, blockchain, central
banking, distributed ledger technology, taxonomy, CBDC design

I. INTRODUCTION
Blockchain technology has revolutionized the financial
industry by enabling secure, decentralized, and transparent
mechanisms for value transfer [1], [2]. As part of Industry 4.0,
blockchain and digital currencies are reshaping financial
ecosystems, fostering innovations that extend beyond
traditional systems. Among its most prominent applications,
cryptocurrencies have introduced new ways to facilitate
exchanges outside traditional financial systems [3]. However,
their inherent volatility and lack of regulatory oversight have
exposed significant vulnerabilities, particularly concerning
financial stability—a challenge that conventional monetary
frameworks are ill-equipped to address effectively [4].
To address these shortcomings, central banks worldwide
are developing Central Bank Digital Currencies (CBDCs) that
integrate the innovative potential of digital assets with the

979-8-3315-8649-2/25/$31.00 ©2025 IEEE

Irni Yunita
School of Economics and Business
Telkom University
Bandung, Indonesia
irniyunita@telkomuniversity.ac.id

stability and regulatory oversight provided by central
monetary authorities [5], [6]. CBDCs are designed to enhance
payment systems, promote inclusion, and support monetary
policy—yet their implementation involves complex trade-offs
across accessibility, resilience, and interoperability [7], [8],
[9]. Among the key challenges in CBDC development are
decisions regarding technological infrastructure, access and
transfer mechanisms, and cross-border payment systems [10].
Each of these dimensions involves distinct technical and
operational trade-offs. For instance, Aurer and Böhme [11]
have delved into the architectural options and technological
platforms, highlighting the potential of blockchain and
Distributed Ledger Technology (DLT) for CBDCs. Allen et al
[7] focus their research on design choices by policy and
technical considerations of CBDC. Stamm and Koelmann [12]
represent a significant attempt to classify CBDC features into
a taxonomy but did not delve into specific technical challenges
such as infrastructure performance, transfer mechanism
integration, and cross-border interoperability. While these
studies have significantly advanced the field, a comprehensive
exploration of the technical underpinnings of CBDCs—
particularly in the context of these three dimensions—remains
underdeveloped.
To address this gap, this study develops a structured
transformative mapping that categorizes CBDC design into
three interrelated domains: infrastructure and functionality,
access and transfer mechanisms, and cross-border models. By
focusing on these categories, this research provides insights
into the operational design choices that influence CBDC
implementation. Ultimately, this research contributes
actionable insights to policymakers, central banks, and
researchers for navigating implementation challenges and
integrating CBDCs effectively into global financial systems.
The formatter will need to create these components,
incorporating the applicable criteria that follow.
II. LITERATURE REVIEW
Research on Central Bank Digital Currencies (CBDCs)
has grown rapidly as central banks explore their potential.
Early studies highlight motivations such as financial inclusion,
reduced costs, and enhanced payment resilience [11], [6]
positioning CBDCs as a response to economic digitalization
and competition from private digital assets like
cryptocurrencies and stablecoins [9].
2.1 Blockchain application on central bank
Blockchain has gained traction in financial systems for
enabling decentralized, transparent, and secure transactions

264

Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 20,2026 at 08:35:52 UTC from IEEE Xplore. Restrictions apply.

## Page 2

The 2025 IEEE International Conference on Industry 4.0, Artificial Intelligence, and Communications Technology (IAICT)

while reducing single points of failure [9], [13]. Blockchain’s
immutable ledger ensures data integrity while its decentralized
architecture reduces the reliance on single points of failure,
providing resilience against fraud and operational risks [14].
In financial systems, blockchain has demonstrated value in
improving transactional transparency and efficiency,
particularly in trade finance and payment settlement processes
[15], [16].
In the context of CBDCs, blockchain’s suitability lies in its
decentralized ledger technology (DLT), offers enhanced
traceability, cryptographic security, and real-time data
sharing, aligning with the goals of trust, security, and
efficiency in modern financial systems [10], [17]. However,
early blockchain applications like Bitcoin, while innovative,
exposed challenges such as volatility, lack of regulatory
oversight, and inefficient consensus mechanisms, which are
incompatible with central bank requirements [18]. To address
these issues, central banks are thus exploring permissioned
DLT platforms to balance decentralization with regulatory
control, addressing privacy and security concerns critical for a
foundational infrastructure for CBDCs deployment [7], [15]
2.1 Design requirements for CBDC
Designing a robust CBDC involves navigating critical
technical decisions that directly affect its functionality,
accessibility, and interoperability [7]. These decisions are
often grouped into three primary dimensions: Infrastructure
and Functionality, Access and Transfer Mechanisms, and
Cross-Border Payments [10], [19].
Infrastructure and Functionality: The choice of
technology for CBDC platforms—blockchain, nonblockchain, or hybrid systems—defines the infrastructure’s
scalability, efficiency, and security [20]. Blockchain-based
systems, as highlighted by Aurer and Böhme [11], offer
traceability and decentralization. While earlier public
blockchain platforms such as Bitcoin were criticized for high
energy consumption due to Proof-of-Work (PoW)
mechanisms, current CBDC explorations rely on
permissioned DLTs with more efficient consensus models
(e.g., PBFT, PoA), significantly reducing energy concerns
[15]. Non-DLT systems, such as JAM-DEX, provide highspeed processing and centralized control but often
compromise on transparency and resilience. Hybrid models,
explored in the Digital Euro project [18], aim to balance
decentralization with centralized oversight but require
significant technical coordination. Additionally, CBDC
architecture—whether one-tier (direct) or two-tier
(indirect)—determines how the central bank interacts with
intermediaries and end-users [12]. Project Atom or e-CNY, for
example, considers a two-tier model to preserve the role of
commercial banks, ensuring seamless integration with
existing financial systems [18].
Access and Transfer Mechanisms: CBDCs can adopt
either token-based or account-based access models, each with
distinct implications for security and privacy [12]. Tokenbased systems, resembling physical cash, prioritize anonymity
but pose challenges in preventing illicit use [6], [20], [21].
Conversely, account-based systems offer stronger identity
verification but require robust data protection frameworks
[22]. Transfer mechanisms, whether online or offline, also
play a critical role in ensuring transaction reliability in varied
scenarios [12]. Offline capabilities are particularly relevant for
promoting financial inclusion in areas with limited internet
access [8], [12].

Cross-Border Payments: The design of cross-border
CBDCs requires interoperability between national systems to
reduce transaction costs and settlement times [23]. Current
explorations have identified three primary models: compatible
CBDC systems, linking multiple CBDC systems, and single
multi-currency systems. These explorations highlight the
potential for CBDCs to overcome inefficiencies in traditional
payment systems and foster international trade connectivity
[19].
CBDC initiatives are driven by the need to enhance
monetary control, reduce transaction costs, and improve
financial inclusion [24], [8]. Additionally, CBDCs respond to
the rise of cryptocurrencies and stablecoins by offering statebacked alternatives with secure and traceable features [10].
These motivations align closely with the critical dimensions
analyzed in this study, providing a foundation for secure,
inclusive, and interoperable CBDC frameworks.
III. METHODOLOGY
This research adopts a qualitative descriptive methodology
to systematically identify and analyze the key technical
characteristics of Central Bank Digital Currencies (CBDCs)
illustrated in Figure 1. The research began with an
information-gathering process involving the collection of
primary data from credible sources to establish a theoretical
foundation for the phenomenon under study. This included an
extensive literature search covering journals, articles, official
reports, and relevant websites. To complement this theoretical
exploration, phenomenological research was conducted,
analyzing case studies of CBDC projects worldwide in the
proof-of-concept and pilot stages.

Fig. 1. Research Workflow
The information retrieval stage is the starting point of the
research, employing two key techniques: phenomenological
research and literature reviews. The pivotal questions guiding
our research include:
• What are the primary technological infrastructures
enabling CBDC systems?
• How are access and transfer mechanisms designed to
ensure inclusivity and efficiency?
• What
technical
solutions
support
CBDC
interoperability in cross-border payment models?
To address these questions, 49 references were collected
from leading academic publishers such as Scopus, Springer,
MDPI, and IEEE. These included peer-reviewed articles,
whitepapers, and official reports published between 2020 and
2024. The selected references focused on technological
aspects of CBDC, infrastructure, technical implementation,
and cross-border functionalities. Furthermore, whitepapers
from notable CBDC projects, such as JAM-DEX, Project
Garuda, and Project Ubin, were analyzed to enhance the
understanding of practical implementations.
The dimension identification stage focused on delineating
key characteristics of CBDCs based on the reviewed literature.

265
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 20,2026 at 08:35:52 UTC from IEEE Xplore. Restrictions apply.

## Page 3

The 2025 IEEE International Conference on Industry 4.0, Artificial Intelligence, and Communications Technology (IAICT)

Thematic analysis was employed to categorize data into three
primary dimensions: infrastructure and functionality, access
and transfer mechanisms, and cross-border payment models.
Building on these dimensions, the final stage synthesized the
findings into a transformative mapping.
The final stage synthesized the identified dimensions into
a transformative mapping, illustrating the interplay between
architecture, technology, and application scope. Visual
mapping techniques were used to provide a holistic
understanding of CBDC design choices, highlighting their
regulatory and operational implications. This systematic
approach ensures a robust foundation for analyzing CBDC
development across critical dimensions. The findings provide
a structured framework to evaluate CBDC design decisions,
offering valuable insights for policymakers, developers, and
central banks, with an emphasis on technical aspects that
inform regulatory and operational strategies.
IV. RESULTS AND DISCUSSION
Figure 2 presents a transformative mapping of CBDC
technical characteristics structured into three categories:
infrastructure and functionality, access and transfer
mechanisms, and cross-border payments. These categories
reflect recurring priorities found in CBDC whitepapers and
pilot studies, each representing a distinct layer of
implementation decisions—from system architecture to
interoperability. The framework includes nine dimensions and
fourteen characteristics, with parameter ranges (e.g.,
architecture type, access model, interoperability level) derived
from observed configurations in real-world projects such as eCNY, Sand Dollar, and Dunbar. This approach enables
structured comparison while remaining adaptable across
design contexts.
4.1 Infrastructure and Functionality
The first three categories particularly influence the
functionality of a CBDC and the institutions being integrated
into distribucion and management processes.
4.1.1 Architecture
CBDC architecture defines how digital currency is issued
and distributed, shaping its scalability, control, and integration
with existing financial systems [12], [6], [20]. Three main
models are recognized: one-tier (direct), two-tier (indirect), or
hybrid architectures, each reflecting different levels of central
bank involvement. [11], [25]. In a one-tier model, the central
bank directly issues and manages CBDC for end-users,
bypassing intermediaries [20], [26]. This structure allows for
direct control over the money supply and user identity
infrastructure, as demonstrated by the Bahamas' Sand Dollar,
[7], [6], [27] where the central bank handles issuance, wallet
operations, and KYC. Similarly, the Central Bank of Indonesia
initially explored a one-tier model for the wholesale digital
rupiah, prioritizing end-to-end oversight in issuance and
settlement [24].
In contrast, the two-tier model incorporates intermediaries
such as commercial banks or payment service providers for
CBDC distribution [22], [26]. This structure mirrors
traditional cash systems and relies on existing financial
institutions to manage customer interactions and the "last
mile" of distribution [11]. For example, China’s PBOC plans
to implement a two-tier CBDC system with the central bank
issuing and redeeming e-CNY through intermediaries, which
then distribute the digital currency to end-users [18], [28].

The hybrid model combines features of both architectures,
where the central bank maintains a core ledger while
intermediaries handle user interfaces and customer
interactions [11], [12], [25]. The Bank of England's CBDC
[29] exploration exemplifies this model, proposing a design
where chosen intermediaries connect via APIs to the central
bank’s core ledger, ensuring a balance between central control
and intermediary flexibility. These architectural choices are
often influenced by each country's financial system, regulatory
goals, and existing payment infrastructure.
4.1.2 Technology
Technological infrastructure determines how the data is
stored and updated when settling transactions [11]. One of the
most critical choices involves selecting between DLT-based,
non-DLT, or hybrid models. DLT (Distributed Ledger
Technology) offers decentralization, immutability, and multiparty validation. Ass seen in projects like mBridge [30], Sand
Dollar [27], e-krona [31] which applies permissioned DLT for
cross-border interbank settlement to improve transparency and
eliminate
reconciliation
needs.
However,
DLT
implementations often face limitations in transaction
throughput and latency, particularly in high-volume retail
environments.
In contrast, non-DLT systems use centralized architectures
with traditional database management. For example, JAMDEX and e-Cedi [32] adopt centralized infrastructure to
enable faster transaction processing and direct integration with
national payment switches. This model facilitates regulatory
oversight and operational simplicity but may introduce single
points of failure and reduced resilience against cyber threats.
Additionally, centralized systems typically limit transparency
and auditability across network participants.
The hybrid approach, such as that explored in the Digital
Euro [25] project, attempts to combine the efficiency of
centralized systems with the security features of DLT.
European Central Bank’s exploration for a potential. It allows
for layered architectures where transaction data may be logged
on a distributed ledger while access and control remain
centralized. These infrastructure choices directly influence
how CBDCs can be implemented within real banking
operations—including interbank settlement, liquidity
distribution, resilience planning, and data governance
models—making technology selection a fundamental policy
and technical decision.
4.1.3 Application Scope
The scope of CBDC application defines whether the
currency is designed for wholesale or retail use [6], [12].
Wholesale CBDCs is specifically designed for interbank
transactions, such as settlement and other wholesale financial
activities, similar to central bank reserves. The Project
Helvetia in Switzerland [33] showcases how wholesale
CBDCs can streamline cross-border settlements through
integration with existing financial infrastructures, while
Project Dunbar explores multi-CBDC platforms for interbank
clearing.
Retail CBDCs [23], by contrast, target broader public use,
aiming to enhance financial inclusion and provide a secure
alternative to cash. Use cases include day-to-day payments,
peer-to-peer (P2P) transactions, and government-to-person
(G2P) disbursements, such as social assistance or subsidies.
Retail models, such as the Bahamas Sand Dollar [27] prioritize
accessibility and resilience in underbanked regions, ensuring
secure, traceable transactions with real-time updates for
transparency.

266
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 20,2026 at 08:35:52 UTC from IEEE Xplore. Restrictions apply.

## Page 4

The 2025 IEEE International Conference on Industry 4.0, Artificial Intelligence, and Communications Technology (IAICT)

The choice between wholesale and retail CBDCs depends
on national priorities, with some central banks, like the
People’s Bank of China [28] piloting a hybrid model that
incorporates both scopes to maximize utility across different
economic layers. These hybrid designs leverage the strengths
of each model, enabling greater flexibility in catering to
diverse financial requirements. The distinctions in application
scope illustrate how CBDCs can address diverse use cases,
from enhancing interbank settlement systems and liquidity
management to facilitating inclusive and efficient payment
solutions for the general population.
4.2 Access and Transfer Mechanism
The following three dimensions mainly determine a
CBDC’s availability, as well as how the holdings are stored
and transferred between users.
4.2.1 Access Model
In the Access Model dimension, CBDCs can be structured
around either a token-based or an account-based framework
[12]. In a token-based model, CBDC functions like digital
cash, emphasizing anonymity and ease of transfer, similar to

for verification and processing, like the European Central
Bank's Digital Euro, which emphasizes secure and efficient
online payments. Conversely, offline capabilities, as explored
in Digital Rupiah [24] and e-Cedi [32] allow for peer-to-peer
transactions without internet access, making the system more
resilient during connectivity outages and expanding
accessibility in remote areas. The integration of dual modes
(online and offline) aims to enhance transaction efficiency
while maintaining system robustness and inclusivity, a
balance that many central banks are actively exploring. These
technological choices shape how users interact with CBDCs
and determine their reach and reliability in diverse contexts.
4.2.3 Interoperability
Interoperability assesses how well CBDCs facilitate
payments domestically and across borders. Domestically,
CBDCs integrate seamlessly with national payment systems
[12], which enhances financial stability and simplifies local
transactions. For cross-border capabilities, the emphasis is on
creating a system that can interoperate with foreign CBDCs or
traditional payment networks, addressing international
transaction challenges such as exchange rate management and

Fig.2. Transformative Mapping of CBDC
traditional banknotes. The Bahamas’ Sand Dollar [27] and the
e-CNY [28] exemplify this approach, enabling holders to
make transactions without necessarily requiring an account,
enhancing accessibility for the unbanked population. In
contrast, an account-based model ties each transaction to a
verified user account, as seen in Sweden’s e-Krona [31] pilot,
where access is controlled by central authorities, ensuring
better regulatory compliance and security. The choice between
token and account models influences user privacy, financial
inclusion, and regulatory control, making it a critical decision
in CBDC design [34].
4.2.2 Transfer Processing
CBDCs can facilitate online or offline transactions,
influencing their accessibility and reliability [6]. Online
CBDC transactions rely on continuous internet connectivity

compliance. Projects like the mCBDC Bridge a collaborating
among Hong Kong, Thailand, UAE, and China, demonstrate
efforts to establish a shared CBDC platform for cross-border
payments, showcasing how interoperability can reduce costs
and improve transparency [35]. The capacity for both
domestic and international operability shapes a CBDC’s
potential to become a global financial tool, highlighting the
significance of technological choices in its deployment.
4.3 Cross-border Payment
The following three dimensions mainly determine a
CBDC’s availability, as well as how the holdings are stored
and transferred between users. The implementation of crossborder CBDC systems addresses inefficiencies in international
payment processes, such as high transaction costs, lengthy

267
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 20,2026 at 08:35:52 UTC from IEEE Xplore. Restrictions apply.

## Page 5

The 2025 IEEE International Conference on Industry 4.0, Artificial Intelligence, and Communications Technology (IAICT)

settlement times, and lack of transparency [19], [25]. Central
banks are exploring various models for cross-border
interoperability, each with unique technical frameworks and
implications. These models—compatible CBDC systems,
linking multiple CBDC systems, and a single multi-currency
system—reflect varying degrees of integration and
complexity, offering solutions tailored to different
international financial ecosystems [36].
4.3.1 Compatible CBDC Systems
A compatible CBDC system enables interoperability by
aligning design principles and operational standards across
national CBDCs without requiring direct technical integration
[35]. In this model, central banks independently develop their
CBDCs but adopt shared protocols or standards for
settlement, messaging, and compliance. Compatibility is
achieved
through
standardized
APIs,
regulatory
harmonization, and adherence to international frameworks
like ISO 20022 for payment messaging. This approach
minimizes the need for centralized coordination, preserving
national autonomy while ensuring that transactions between
CBDCs are seamless and efficient. For example, the
European Central Bank’s digital euro and Sweden’s e-krona
[32] are exploring compatible designs that adhere to regional
standards to facilitate cross-border payments within the EU.
However, this model may face challenges in scaling to
broader international contexts where regulatory and technical
disparities are more pronounced.
4.3.2 Linking Multiple CBDC Systems
Linking multiple CBDC systems involves the
development of technical bridges that directly connect the
infrastructures of different national CBDCs. This model
supports cross-border transactions by enabling real-time
synchronization and settlement across participating systems.
Central banks collaborate to establish shared platforms or
interoperable frameworks that integrate their CBDCs while
maintaining national control over monetary policy and
operations. Project Jasper-Ubin [37] and Project Jura [38]
exemplify linked CBDC systems using DLT to enable realtime, seamless cross-border settlements. Both projects
highlight the potential of shared frameworks for
interoperability, relying on governance agreements and
standardized protocols for liquidity management and
compliance. While this model enhances efficiency and
transparency, it demands significant coordination among
central banks, including consensus on shared technological
protocols and legal frameworks.
Another noteworthy initiative relevant to cross-border
payment integration is BRICS Pay, a multilateral effort by
BRICS countries to enable instant transactions using local
currencies without relying on the US dollar. Although not
strictly a CBDC-based project, BRICS Pay shares the
objective of increasing sovereignty and efficiency in crossborder payments. Its design, based on direct interoperability
between domestic payment systems, aligns with the linked
CBDC system model in terms of decentralization and
bilateral coordination, while highlighting alternative paths
beyond DLT-based CBDCs.

facilitates transactions involving multiple CBDCs. Under this
model, a single ledger or network is used to issue and settle
transactions across various currencies, enabling high
efficiency and reducing the need for intermediaries in crossborder payments. This system operates as a centralized or
decentralized hub that integrates currency conversion and
liquidity management functionalities. An example of this
model is the Inthanon-LionRock [39], a collaboration among
central banks in Hong Kong, Thailand, and other
jurisdictions, which utilizes a shared DLT framework to settle
cross-border transactions in multiple currencies. Similarly,
Project Dunbar [40] demonstrated a multi-CBDC platform
enabling direct cross-border settlements among participating
central banks. While this model offers unparalleled
efficiency, its implementation requires robust governance
structures and consensus on regulatory oversight, as well as
advanced security measures to safeguard the system against
cyber threats.
V. CONCLUSION

The findings underscore how architectural, access, and
cross-border design choices shape the operational and policy
effectiveness of CBDCs. The infrastructure dimension
examines trade-offs in scalability, efficiency, and resilience
across architectural models (one-tier, two-tier, hybrid) and
technological frameworks (DLT, non-DLT, hybrid). In the
access and transfer mechanisms dimension, token-based and
account-based models are central to defining user access,
while online and offline capabilities enhance inclusivity,
particularly in underserved regions. For cross-border
payments, the study highlights three interoperability
models—compatible CBDC systems, linked CBDC systems,
and single multi-currency platforms—each offering distinct
advantages and challenges for seamless international
transactions.
Drawing from initiatives like Project Garuda, Project
Jura, and e-CNY, the proposed taxonomy underscores the
importance of context-specific design choices for CBDCs. It
provides a structured framework for evaluating technical
configurations and supporting integration into complex
financial systems. Future research may apply this framework
to real-world use cases, comparing DLT and non-DLT
models for wholesale and retail use. Prototyping on platforms
such as Corda or Hyperledger could further assess scalability
and practical feasibility, offering deeper insights into design
trade-offs and strategic implementation.
REFERENCES
[1]

[2]

[3]

[4]

4.3.3 Single Multi-currency System
The single multi-currency system represents the most
integrated approach, creating a unified platform that

M. Osmani, R. El-Haddadeh, N. Hindi, M. Janssen, and V.
Weerakkody, “Blockchain for next generation services in banking
and finance: cost, benefit, risk and opportunity analysis,” Journal
of Enterprise Information Management, vol. 34, no. 3, pp. 884–
899, Apr. 2021, doi: 10.1108/JEIM-02-2020-0044.
A. Alamsyah, G. N. W. Kusuma, and D. P. Ramadhani, “A Review
on Decentralized Finance Ecosystems,” Future Internet, vol. 16,
no. 3, p. 76, Feb. 2024, doi: 10.3390/fi16030076.
A. Polyviou, P. Velanas, and J. Soldatos, “Blockchain Technology:
Financial Sector Applications Beyond Cryptocurrencies,” in The
3rd Annual Decentralized Conference on Blockchain and
Cryptocurrency, Basel Switzerland: MDPI, Oct. 2019, p. 7. doi:
10.3390/proceedings2019028007.
M. Vinod Ramchandra, K. Kumar, A. Sarkar, S. Kr. Mukherjee,
and K. Agarwal, “Assessment of the impact of blockchain
technology in the banking industry,” Mater Today Proc, vol. 56,
pp. 2221–2226, 2022, doi: 10.1016/j.matpr.2021.11.554.

268
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 20,2026 at 08:35:52 UTC from IEEE Xplore. Restrictions apply.

## Page 6

The 2025 IEEE International Conference on Industry 4.0, Artificial Intelligence, and Communications Technology (IAICT)

[5]

[6]

[7]

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

[18]

[19]

[20]

[21]

[22]

[23]

C. Boar, H. Holden, and A. Wadsworth, “Impending arrival – a
sequel to the survey on central bank digital currency,” 2020.
Accessed:
Jan.
07,
2025.
[Online].
Available:
https://www.bis.org/publ/bppdf/bispap107.pdf
R. Auer, G. Cornelli, and J. Frost, “Rise of the central bank digital
currencies: drivers, approaches and technologies,” 2020.
Accessed:
Jan.
07,
2025.
[Online].
Available:
https://www.bis.org/publ/work880.pdf
S. Allen et al., “Design Choices for Central Bank Digital Currency:
Policy and Technical Considerations,” Cambridge, MA, Aug.
2020. doi: 10.3386/w27634.
P. K. Ozili, “Central bank digital currency research around the
world: a review of literature,” Journal of Money Laundering
Control, vol. 26, no. 2, pp. 215–226, Mar. 2023, doi:
10.1108/JMLC-11-2021-0126.
T. Zhang and Z. Huang, “Blockchain and central bank digital
currency,” ICT Express, vol. 8, no. 2, pp. 264–270, Jun. 2022, doi:
10.1016/j.icte.2021.09.014.
H. O. Genc and S. Takagi, “A literature review on the design and
implementation of central bank digital currencies,” International
Journal of Economic Policy Studies, vol. 18, no. 1, pp. 197–225,
Feb. 2024, doi: 10.1007/s42495-023-00125-9.
A. Raphael and R. Böhme, “The technology of retail central bank
digital currency,” 2020. Accessed: Jan. 07, 2025. [Online].
Available: https://www.bis.org/publ/qtrpdf/r_qt2003j.pdf
L. K. Stamm and H. Koelmann, “A Taxonomy of Design Decisions
for Central Bank Digital Currencies,” in Proceedings of the 24th
Annual International Conference on Digital Government
Research, New York, NY, USA: ACM, Jul. 2023, pp. 614–625.
doi: 10.1145/3598469.3598537.
A. Alamsyah and S. Syahrir, “The Taxonomy of Blockchain-based
Technology in the Financial Industry,” F1000Res, vol. 12, p. 457,
May 2023, doi: 10.12688/f1000research.133518.1.
Y. Jiang, “Exploration of its Evolution, Implications, and Prospects
within the Framework of Central Bank Digital Currency,” Finance
& Economics, vol. 1, no. 8, Aug. 2024, doi: 10.61173/eeh9kz92.
M. U. Chowdhury, K. Suchana, S. M. E. Alam, and M. M. Khan,
“Blockchain Application in Banking System,” Journal of Software
Engineering and Applications, vol. 14, no. 07, pp. 298–311, 2021,
doi: 10.4236/jsea.2021.147018.
A. Alamsyah and N. Salsabila, “Exploring the Mechanisms of
Decentralized Finance (DeFi) Using Blockchain Technology,” in
2024 3rd International Conference on Creative Communication
and Innovative Technology (ICCIT), IEEE, Aug. 2024, pp. 1–8.
doi: 10.1109/ICCIT62134.2024.10701148.
Q. Yao, “A systematic framework to understand central bank
digital currency,” Science China Information Sciences, vol. 61, no.
3, p. 033101, Mar. 2018, doi: 10.1007/s11432-017-9294-5.
V. Sethaput and S. Innet, “Blockchain application for central bank
digital currencies (CBDC),” Cluster Comput, vol. 26, no. 4, pp.
2183–2197, Aug. 2023, doi: 10.1007/s10586-022-03962-z.
M. Hanyu, “Central Bank Digital Currency Cross-Border Payment
Model Based on Blockchain Technology,” in Proceedings of the
Second International Forum on Financial Mathematics and
Financial Technology, Springer, 2023, pp. 191–202. doi:
10.1007/978-981-99-2366-3_10.
P. Cheng, “Decoding the rise of Central Bank Digital Currency in
China: designs, problems, and prospects,” Journal of Banking
Regulation, vol. 24, no. 2, pp. 156–170, Jun. 2023, doi:
10.1057/s41261-022-00193-5.
P. R. Cunha, P. Melo, and H. Sebastião, “From Bitcoin to Central
Bank Digital Currencies: Making Sense of the Digital Money
Revolution,” Future Internet, vol. 13, no. 7, p. 165, Jun. 2021, doi:
10.3390/fi13070165.
B. Bossone et al., “Central Bank Digital Currency Background
Technical Note,” 2021. Accessed: Jan. 07, 2025. [Online].
Available:
https://documents1.worldbank.org/curated/en/6034516388692437
64/pdf/Central-Bank-Digital-Currency-Background-TechnicalNote.pdf
B. Bossone et al., “Central Bank Digital Currencies for CrossBorder Payments: A Review of Current Experiments and Ideas,”
2021. Accessed: Jan. 07, 2025. [Online]. Available:
https://documents1.worldbank.org/curated/en/3690016388718629

[24]

[25]

[26]

[27]

[28]

[29]

[30]

[31]

[32]

[33]

[34]

[35]

[36]

[37]

[38]

[39]

[40]

39/pdf/Central-Bank-Digital-Currencies-for-Cross-borderPayments-A-Review-of-Current-Experiments-and-Ideas.pdf
Bank Indonesia, “Project Garuda: Navigating The Architecture of
Digital Rupiah,” 2022. Accessed: Jan. 07, 2025. [Online].
Available:
https://www.bi.go.id/en/rupiah/digitalrupiah/Documents/White-Paper-CBDC-2022_en.pdf
F. Syarifuddin and T. Bakhtiar, “Monetary Policy Strategy in the
Presence of Central Bank Digital Currency,” 2021. Accessed: Jan.
08,
2025.
[Online].
Available:
https://publicationbi.org/repec/idn/wpaper/WP092021.pdf
D. K. C. Lee, L. Yan, and Y. Wang, “A global perspective on
central bank digital currency,” China Economic J, vol. 14, no. 1,
pp. 52–66, Jan. 2021, doi: 10.1080/17538963.2020.1870279.
Central Bank of Bahamas, “Project Sand Dollar: A Bahamas
Payments System Modernisation Initiative,” 2019. Accessed: Jan.
08,
2025.
[Online].
Available:
https://www.centralbankbahamas.com/viewPDF/documents/2019
-12-25-02-18-11-Project-Sanddollar.pdf
People’s Bank of China, “Progress of Research & Development of
E-CNY in China,” Progress Progress Progress Progress, 2021.
Accessed:
Jan.
08,
2025.
[Online].
Available:
http://www.pbc.gov.cn/en/3688110/3688172/4157443/4293696/2
021071614584691871.pdf
Bank of England, “Central Bank Digital Currency Opportunities,
Challenges and Design,” 2020. Accessed: Jan. 08, 2025. [Online].
Available:
https://www.bankofengland.co.uk//media/boe/files/paper/2020/central-bank-digital-currencyopportunities-challenges-and-design.pdf
Bank for International Settlements, “Connecting economies
through CBDC Project mBridge,” 2022. Accessed: Jan. 08, 2025.
[Online]. Available: https://www.bis.org/publ/othp59.pdf
S. Riksbank, “E-krona Report: E-krona Pilot Phase 2,” 2022.
[Online].
Available:
https://www.riksbank.se/globalassets/media/rapporter/ekrona/2021/e-krona-pilot-phase-1.pdf
Bank of Ghana, “Design paper of the digital Cedi (eCedi),” 2022.
Accessed:
Jan.
08,
2025.
[Online].
Available:
https://www.bog.gov.gh/wp-content/uploads/2022/03/eCediDesign-Paper.pdf
Bank for International Settlements, “Project Helvetia Phase II:
settling tokenised assets in wholesale CBDC,” 2022. Accessed:
Jan.
08,
2025.
[Online].
Available:
https://www.bis.org/publ/othp45.pdf
B. Pillai and G. Sorwar, “Central Bank Digital Currency (CBDC):
Design Requirements & Challenges,” in 2024 IEEE International
Conference on Blockchain and Cryptocurrency, ICBC 2024,
Institute of Electrical and Electronics Engineers Inc., 2024. doi:
10.1109/ICBC59979.2024.10634472.
Bank for International Settlements, “Central bank digital
currencies for cross-border payments : Report to the G20,” 2021.
Accessed:
Jan.
08,
2025.
[Online].
Available:
https://www.bis.org/publ/othp38.pdf
R. Auer, P. Haene, and H. Holden, “Multi-CBDC arrangements
and the future of cross-border payments,” 2021. Accessed: Jan. 08,
2025.
[Online].
Available:
https://www.bis.org/publ/bppdf/bispap115.pdf
Bank of Canada and Monetary Authority of Singapore, “Project
Jasper-Ubin: Enabling Cross-Border High Value Transfer Using
Distributed Ledger Technologies.” Accessed: Jan. 08, 2025.
[Online]. Available: https://www.mas.gov.sg/-/media/JasperUbin-Design-Paper.pdf
B. Innovation Hub, the Banque de France, and the Swiss National
Bank, Project Jura - Cross-border settlement using wholesale
CBDC. 2021. Accessed: Jan. 08, 2025. [Online]. Available:
https://www.bis.org/publ/othp44.pdf
Hong Kong Monetary Authority, Bank of Thailand, Digital
Currency Institute People’s Bank of China, and the Central Bank
of the United Arab Emirates, “Inthanon-LionRock to mBridge, BIS
Innovation Hub Hong Kong Centre, September 2021,” 2021.
Accessed:
Jan.
08,
2025.
[Online].
Available:
https://www.bis.org/publ/othp40.pdf
Bank for International Settlements, “Project Dunbar - International
settlements using multi-CBDCs,” 2022. Accessed: Jan. 08, 2025.
[Online]. Available: https://www.bis.org/publ/othp47.pdf

269
Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on June 20,2026 at 08:35:52 UTC from IEEE Xplore. Restrictions apply.
