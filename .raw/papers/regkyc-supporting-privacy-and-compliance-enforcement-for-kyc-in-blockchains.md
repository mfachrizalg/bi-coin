---
source_type: pdf
title: "RegKYC-Supporting-Privacy-and-Compliance-Enforcement-for-KYC-in-Blockchains"
original_file: "thesis/reference/RegKYC-Supporting-Privacy-and-Compliance-Enforcement-for-KYC-in-Blockchains.pdf"
sha256: "9160eed4d8ce00e64ed9cabfa53b85ead7980aada11d671c093d5356bcd9c641"
page_count: 5
extracted: 2026-11-11
extraction_method: "text (pdftotext -layout)"
ocr_pages:
extraction_warnings:
---

# Raw extraction: RegKYC-Supporting-Privacy-and-Compliance-Enforcement-for-KYC-in-Blockchains

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

R EG KYC: Supporting Privacy and Compliance
                                                                                                                                                                        Enforcement for KYC in Blockchains
                                                                                                                                                                                                     Xihan Xiong† , Michael Huth‡ , William Knottenbelt†




2025 IEEE International Conference on Blockchain and Cryptocurrency (ICBC) | 979-8-3315-4135-4/25/$31.00 ©2025 IEEE | DOI: 10.1109/ICBC64466.2025.11114514
                                                                                                                                                                                                             † Imperial College London, United Kingdom
                                                                                                                                                                                                            ‡ Technische Universität Nürnberg, Germany



                                                                                                                                                                Abstract—Know Your Customer (KYC) is a core component of                 to determine whether an on-chain address corresponds to an
                                                                                                                                                             the Anti-Money Laundering (AML) framework, designed to pre-                 identifiable user. This gap in traceability makes it difficult to
                                                                                                                                                             vent illicit activities within financial systems. However, enforcing        enforce accountability against criminal activities. Second, from
                                                                                                                                                             KYC and AML on blockchains remains challenging due to diffi-
                                                                                                                                                             culties in establishing accountability and preserving user privacy.         the perspective of CASPs, they will face stricter compliance
                                                                                                                                                             This study proposes R EG KYC, a privacy-preserving Attribute-               obligations. For example, verifying user nationality is crucial
                                                                                                                                                             Based Access Control (ABAC) framework that balances user                    to comply with AML and sanctions regulations, because it
                                                                                                                                                             privacy with externally mandated KYC and AML requirements.                  helps identify individuals from high-risk or sanctioned juris-
                                                                                                                                                             R EG KYC leverages a structured ABAC model to support the                   dictions. Without a reliable way to verify the nationality behind
                                                                                                                                                             flexible verification of KYC attributes and the enforcement of
                                                                                                                                                             compliance policies, providing benefits to multiple stakeholders.           blockchain addresses, CASPs risk compliance breaches. Third,
                                                                                                                                                             First, it enables legitimate users to meet compliance requirements          from the user’s perspective, the privacy of a legitimate user
                                                                                                                                                             while preserving the privacy of their on-chain activities. Second,          should be protected after withdrawing assets from a CEX to
                                                                                                                                                             it empowers Crypto-asset Service Providers (CASPs) to tailor                on-chain addresses. However, through blockchain analytics,
                                                                                                                                                             compliance policies to operational needs, ensuring adaptability to          the CEX can monitor the user’s subsequent transactions.
                                                                                                                                                             evolving regulations. Finally, it enhances regulatory accountabil-
                                                                                                                                                             ity by enabling authorized deanonymization of malicious actors.                To mitigate these challenges, we propose R EG KYC, a struc-
                                                                                                                                                             We hope this work inspires future research to harmonize user                tured Attribute-Based Access Control (ABAC) [1] framework
                                                                                                                                                             privacy and regulatory compliance in blockchain systems.                    that balances user privacy with AML and KYC requirements.
                                                                                                                                                                Index Terms—Blockchain, Compliance, Privacy, Know Your                   We summarize our main contributions as follows:
                                                                                                                                                             Customer (KYC), Attribute-Based Access Control (ABAC)
                                                                                                                                                                                                                                         • R EG KYC Design. We propose R EG KYC, a privacy-

                                                                                                                                                                                     I. I NTRODUCTION                                      preserving ABAC system that balances user privacy with ex-
                                                                                                                                                                                                                                           ternally imposed AML and KYC compliance requirements
                                                                                                                                                                In traditional finance, Know Your Customer (KYC) pro-                      on smart contract-enabled blockchains. R EG KYC enables
                                                                                                                                                             cedures are part of regulatory obligations under Anti-Money                   CASPs to define tailored compliance policies. It also allows
                                                                                                                                                             Laundering (AML) frameworks to prevent illicit activities. In                 legitimate users to prove KYC verification and attribute
                                                                                                                                                             the EU and UK, institutions such as banks, investment firms,                  compliance while preventing CEXs from linking users’
                                                                                                                                                             and insurers must conduct KYC, which typically involves                       KYC identities to their on-chain activities. In addition,
                                                                                                                                                             verifying customer identity, address, and financial history.                  it provides regulators with a mechanism to deanonymize
                                                                                                                                                                In the crypto space, Crypto-asset Service Providers (CASPs)                malicious addresses when accountability is required.
                                                                                                                                                             such as Centralized Exchanges (CEXs) and custodian wallet                   • Evaluation. We evaluate the gas cost, scalability, and off-
                                                                                                                                                             providers are often required to implement KYC. The EU’s                       chain computation of the P RIV KYC pool, a core component
                                                                                                                                                             5th AMLD (AMLD5) extended AML regulations to include                          in the R EG KYC framework. The results demonstrate effi-
                                                                                                                                                             CASPs, while the Markets in Crypto-Asset (MiCA) regulation                    cient gas usage and scalability, supporting up to 230 depos-
                                                                                                                                                             reinforced AML obligations. Similarly, the UK’s amended                       itors, aligning with Ethereum’s projected address growth.
                                                                                                                                                             MLR (2019) brought CASPs under AML compliance.                                The evaluation also shows the need to balance depositor
                                                                                                                                                                However, the pseudonymous and decentralized nature of                      capacity with the off-chain circuit generation time.
                                                                                                                                                             blockchain presents challenges for KYC, making it difficult                 • Application. We discuss R EG KYC’s flexibility in verify-
                                                                                                                                                             to determine the identity behind on-chain fund flows once                     ing different combinations of KYC attributes. This allows
                                                                                                                                                             assets leave the regulated platforms. Typically, KYC in the                   CASPs to design tailored attribute verification mechanisms
                                                                                                                                                             crypto space is only feasible at points where fiat currencies                 aligned with their service needs, addressing current compli-
                                                                                                                                                             are exchanged for cryptocurrencies or vice versa. CEXs, which                 ance requirements while adapting to future regulations1 .
                                                                                                                                                             serve as entry and exit points for users within the blockchain
                                                                                                                                                             system, are therefore required to implement KYC measures.                                             II. R ELATED W ORK
                                                                                                                                                                Despite their widespread adoption by CEXs, KYC proce-                    ABAC system. ABAC is a dynamic access control model that
                                                                                                                                                             dures remain insufficient. First, from the regulatory aspect,               grants or denies access to resources based on the evaluation of
                                                                                                                                                             although the KYC process at CEXs links user identities to
                                                                                                                                                             their initial on-chain addresses, there is no simple mechanism                1 Refer to the full version of this paper [2] for detailed discussion.




                                                                                                                                                               Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on November 04,2026 at 08:20:17 UTC from IEEE Xplore. Restrictions apply.
                                                                                                                                                                   979-8-3315-4135-4/25/$31.00 ©2025 IEEE

## Page 2

policies against a set of attributes [1]. ABAC can be integrated               CASP. Acting as the PAP, CASPs translate high-level exter-
into blockchain systems to enhance privacy protection [3, 4].               nal regulatory requirements into KYC compliance policies. For
Blockchain-based KYC Solutions. Martens et al. [5] ex-                      example, a CASP may define a policy requiring the interacting
plored the potential of blockchain for KYC. Mansoor et al. [6]              address to belong to a user from a non–high-risk jurisdiction.
provided a review of blockchain-based decentralized KYC                     They can also report malicious addresses to the system.
solutions. Hussain and Usmani [7] proposed a decentralized                     CEX. The CEX, acting as the PIP, collects and verifies
KYC framework to enhance efficiency and reduce costs.                       Alice’s KYC data, attributes, and addrA , then issues an
Blockchain-based Privacy Solutions. Bernabe et al. [8] iden-                approval with a digital signature over these elements. This
tified three privacy goals in blockchain systems: anonymity,                approval serves as proof of identity for the P RIV KYC pool.
unlinkability, and confidentiality, which are supported by cryp-               P RIV KYC Pool. The P RIV KYC pool acts as a PDP to
tographic methods [9] such as Zero-Knowledge Proofs (ZKPs)                  evaluate whether users’ KYC attributes satisfy compliance
[10–12]. Mixers such as Tornado Cash (TC) [13, 14] effec-                   policy. It also functions as a PEP, executing the decisions on
tively break traceability by using Zero-Knowledge Succinct                  access requests. This pool has the following functions:
Non-Interactive Argument of Knowledge (zk-SNARK) [15,                       • KYC-Bound Address Obfuscation. The P RIV KYC pool
16] to facilitate anonymous deposits and withdrawals [17, 18].                 breaks the link between Alice’s original address (addrA ),
Privacy-Preserving KYC Solutions. Prior work explores sev-                     tied to her KYC, and a new address (addrB ). This ensures
eral solutions: zkKYC [19], which combines ZKPs with self-                     addrB remains compliant but cannot be traced back to her
sovereign identity; a cross-chain solution by Sun et al. [20];                 identity or prior activity, preventing the CEX from linking
and KYCE [21], which employs cryptographic accumulators                        Alice’s KYC data to addrB or later transactions.
and ZKPs to balance compliance and privacy.                                 • KYC Attribute Verification. The pool verifies Alice’s KYC
Compliance-Oriented Privacy Solutions. Buterin et al. [22]                     attributes based on predefined criteria — for instance, con-
introduced two proof methods for privacy pools: membership                     firming her nationality is not “high-risk” before allowing
proofs and exclusion proofs. Dotan et al. [23] introduces Haze                 addrB to interact with CASPs that restrict such regions. As
and Daze, two compliant privacy mixers with mechanisms to                      such, addrB remains compliant despite being obfuscated.
block or retroactively deanonymize non-compliant users.                     • Anonymized Fund Withdrawal. Alice can also transfer

                       III. S YSTEM M ODEL                                     funds through the P RIV KYC pool. Similar to mixing ser-
                                                                               vices, the pool transfers funds from addrA to addrB without
A. ABAC System
                                                                               allowing the other observers to trace the funds’ origins.
   An ABAC [1] system contains the following components:                    • KYC/AML Compliance. R EG KYC ensures that all actions
Policy Administration Point (PAP) defines access control                       taken by the user remain compliant with KYC/AML reg-
policies. In R EG KYC (Fig. 1), external regulatory authorities                ulations. In the case of illicit activities, it allows external
establish high-level compliance requirements. CASPs, acting                    regulatory authorities to deanonymize malicious addresses.
as the PAP, translate these requirements into actionable rules                 External Regulatory Authority (ERC). The ERC consists
and attribute policies according to their operational needs.                of the Deanonymization Review Committee (DRC) and the
Policy Information Point (PIP) collects attribute data for                  Enforcement Agency (EA). When a suspicious address (e.g.,
policy evaluation. In R EG KYC, this role is fulfilled by the               Alice’s addrB ) is flagged by a CASP, the DRC uses a
CEX, who issues KYC approvals over KYC attributes.                          threshold decryption scheme to collectively decide whether
Policy Decision Point (PDP) evaluates attributes against                    deanonymization should proceed. When a predefined threshold
predefined compliance policies. The P RIV KYC pool, acting                  of DRC members approves the request, the deposit address
as the PDP, verifies whether the attributes meet the criteria.              (e.g., addrA ) will be revealed. After that, the DRC reveals
Policy Enforcement Point (PEP) enforces the PDP’s deci-                     addrA to the EA. Then, the EA is able to retrieve Alice’s KYC
sions based on policy evaluation results. The P RIV KYC pool                data from the CEX and take enforcement actions accordingly.
also acts as the PEP to control users’ access requests.
                                                                            C. System Properties
B. System Participants and Components                                       • Security: Only CEX approved addresses can interact into
   User. Alice, a legally conscious user, submits her KYC                     the P RIV KYC pool. Each deposit allows a single with-
data and attributes (e.g., nationality ∈
                                       / high-risk countries) and             drawal, and KYC approvals cannot be reused.
blockchain address (addrA ) to a CEX for approval. She wishes               • Privacy: The P RIV KYC pool breaks the linkability between
to transact on-chain using another address (e.g., addrB ) and                 deposit and withdrawal transactions, keeping withdrawal
wants counterparties (CASPs) to recognize addrB as linked                     addresses pseudonymous. This prevents CASPs and ob-
to verified KYC attributes. This assures CASPs that they are                  servers from tracing on-chain activity back to users’ KYC
interacting with a compliant and verified user. Additionally,                 information or revealing their identities unnecessarily.
Alice values her privacy. While the CEX knows her KYC data                  • Compliance: R EG KYC ensures compliance through a dual
and its link to addrA , she wants to prevent it from linking that             approach. It enables legitimate users to prove KYC compli-
data to addrB or her later on-chain activity. This preserves the              ance to CASPs, while allowing the DRC to deanonymize
privacy of her transactions beyond the initial KYC process.                   illicit actors and the EA to enforce accountability.




  Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on November 04,2026 at 08:20:17 UTC from IEEE Xplore. Restrictions apply.

## Page 3

① Provide KYC info and

                                                                            Alice
                   PIP                                                                PDP, PEP
                                                                                                   ⑤ KYC-bound address obfuscation
                            ② Issue approval                     ④ Provide approval
                                                                                                   ⑤ KYC-based attribute verification
                                                   Alice (   )                                                                             Alice (     )
                            ③ Transfer fund                      ④ Deposit fund                    ⑤ Anonymized fund transfer (optional)
                   CEX        (optional)                           (optional)       PrivKYC Pool

                     ⑩ Require                                                                                                             ⑥ Interaction

                     KYC info                                                 ⑧ DRC members cooperate
                                   External Regulatory Authority (ERC)                                                Required Action
                                                                                to deanonymize
                ⑪Reveal                                                                                               Contingent Action     PAP
                                                                                                                      Control
               KYC info                         ⑨ Reveal


                                 Enforcement         Deanonymization                      ⑦ Report malicious                           Crypto-asset
                                 Agency (EA)      Review Committee (DRC)                                                         Service Provider (CASP)

 Fig. 1: Illustration of the R EG KYC ABAC system, using Alice’s interaction as an example to demonstrate key workflows.


                         IV. S YSTEM D ESIGN                                            contract adds cm to ListOfCommitments, inserts cm into
A. System Workflow                                                                      the Merkle tree, and adds H(σaddrdep ) to ListOfApprovals.
                                                                                         4) Withdrawal from the P RIV KYC pool: This allows a user
   This section describes the system workflow. The detailed
                                                                                      to withdraw using the private note and private key skwd .
discussion can be found in the full version of our paper [2].
                                                                                      • txwd ← CreateWithdraw(skwd , note): The user creates
   1) System setup: The system runs the following setups:
                            λ                                                           proof pathi for cm, and encrypts cm as enc using
• par ← SystemSetup(1 ) outputs the system parameters.
                                                                                        pkDRC . Next, proof πwd = Πzk .Prove(ekwd , witdep , stmt)
• The CEX sets up a hash function H and a signature scheme
                                                                                        is generated, where witdep = (skwd , kdep , rdep , pathi )
   Πsig with a key pair (pkCEX , skCEX ) for KYC approvals.
                                                                                        and stmt = stmt[addrwd , nf wd , Rootdep , enc]. This with-
• The DRC sets up a threshold encryption scheme [24] Πte
                                                                                        drawal proof satisfies cm = H2p (kdep ||rdep ), nf wd =
   with a key pair (pkDRC , {skiDRC }ni=1 ) and a threshold t ≤ n
                                                                                        Hp (kdep ), T.Verify(i, cm, root, pathi ) = 1, and enc =
   to encrypt and decrypt the deposit information.
                                                                                        Πte .Encrypt(cm||Hp (rdep ), pkDRC ). The user finally com-
• A P RIV KYC pool with an attribute Attr is created. It con-
                                                                                        poses (addrwd , enc, nf wd , Rootdep , πwd ) as the input data of
   tains pkCEX , pkDRC , the Merkle tree depth d, two SNARK-
                                                                                        the withdrawal transaction txwd .
   friendly hash functions Hp and H2p , and a zk-SNARK
                                                                                      • 1/0 ← ExecuteWithdraw(txwd ): The pool first parses txwd .
   instance Πzk . Πzk ’s evaluation key is ekwd and verification
                                                                                        Then it checks whether nf wd is not in ListOfWithdrawAddr
   key is vkwd . A Merkle tree T with depth d is initialized to
                                                                                        and whether Rootdep is in the root list. Next, it
   store deposit commitments [25], with initial root Root0dep .
                                                                                        checks the validity of proof πwd by verifying whether
   2) KYC Approval: The CEX issues approvals as follows:                                Πzk .Verify(vkwd , πwd , stmt[pksender , nf wd , Rootdep , enc]) =
• σaddrdep /⊥ ← Approve(addrdep , KYC, Attr): The CEX ver-                              1. Then the smart contract appends nf wd to ListOfNullifier
   ifies the user’s KYC and Attr. If valid, the CEX runs                                and (addrwd , enc) to ListOfWithdrawAddr.
   σaddrdep ← Πsig .Sign(skCEX , H(KYC)||H(Attr)||addrdep )                              5) Interaction with CASPs: Now the user can use addrwd
   and returns the signature σaddrdep as approval to addrdep .                        to interact with CASPs whose set polices based on Attr.
   3) Deposit KYC approvals into the P RIV KYC pool: A user                           • 1/0 ← VerifyAuthorization(txwd , addrwd , Attr): Upon re-
issues a deposit transaction to interact with the pool.                                 ceiving an interaction request from addrwd , the CASP
• ((kdep , rdep ), txdep ) ← CreateDeposit(H(KYC), H(Attr),                             verifies whether addrwd is indeed a withdrawal address from
   addrdep , σaddrdep ): The user selects two random values kdep ,                      a P RIV KYC pool that handles the KYC attribute Attr.
         $
  rdep ←  − {0, 1}λ , and computes the deposit commitment                                6) Deanonymization: The process is conducted as follows:
                                                                                                                                       i
  cm = H2p (kdep ||rdep ). The algorithm returns a note =                             • addrdep /⊥ ← Deanonymize(addrwd , {skDRC }i∈T , t): The
  (kdep , rdep ), and a deposit transaction txdep whose input                           algorithm first extracts (addrwd , enc). Then DRC mem-
  data includes H(KYC), H(Attr), addr, σaddrdep , and cm.                               bers collborate to decrypt enc to obtain cm||Hp (rdep ) us-
After receiving txdep from the user, the pool executes:                                 ing threshold decryption with a pre-defined threshold t:
• 1/0 ← ExecuteDeposit(txdep ) parses txdep , checks whether
                                                                                        cm||Hp (rdep ) = Πte .Decrypt({skiDRC }i∈T , t, enc) where
  H(σaddrdep ) is not stored in ListOfApprovals, and runs                               |T | ≥ t. Next, the DRC retrieves addrdep and returns it
  Πsig .Verify(pkCEX , H(KYC)||H(Attr)||addrdep , σaddrdep ) to                         to the EA. Then the EA can request the CEX to provide the
  verify the approval from the CEX. If valid, the smart                                 KYC data of addrdep and take enforcement actions.




  Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on November 04,2026 at 08:20:17 UTC from IEEE Xplore. Restrictions apply.

## Page 4

Deploy Costs       Deposit Costs        Withdrawal Costs
               7                                                                                       233
               6                                                                                                                    230 , Merkle Tree Depth = 30                                                Circuit Generation Time      # Constraints
                                                                                                                                                                                                  800                                                             8




                                                                                                                                                                   Circuit Generation Time (Seconds)
                                                                                                       230




                                                                              # Unique Ethereum Addresses
               5                                                                                       227


                                                                                                                                                                                                                                                                  # Constraints (×104 )
Gas Cost (×106 )
                                                                                                                                                                                                  600                                                             6
               4                                                                                       224
               3                                                                                       221                          220 , Merkle Tree Depth = 20                                  400                                                             4
               2                                                                                       218
                                                                                                                                                                                                  200                                                             2
               1                                                                                       215
               0                                                                                       212                                                                                             0                                                          0
                    10       20     30        40      50       60                                            2016 2017 2018 2019 2020 2021 2022 2023 2024 2025                                             10    20        30        40       50             60
                                  Merkle Tree Depth                                                                               Year                                                                                   Merkle Tree Depth

                         (a) Gas costs evaluation.                                                              (b) Scalability evaluation.                                                            (c) Off-chain build time evaluation.
                                                  Fig. 2: Evaluation results for gas costs, scalability, and off-chain build time.


                                         V. I MPLEMENTATION                                                                                                                   VI. D ISCUSSION
A. P RIV KYC Pool Implementation                                                                                                   Extensions and Applications: While this work focus es on a
  We adapt the implementation of TC, to build the P RIV KYC                                                                        single KYC attribute as an example, R EG KYC is flexible to
pool. We use Groth16 [26] to implement zkSNARK and                                                                                 support the combinations of KYC attributes (e.g., nationality
two SNARK-friendly hash functions, the Pedersen hash [27]                                                                          ∈
                                                                                                                                   / high-risk countries & age>20), thereby adapting to evolving
and the MiMC hash [28], to construct Merkle trees. We                                                                              regulations (refer to the full version [2] for more details).
use the soliditySha3 function to compute the message                                                                               Limitations and Future Work: In this work, we focus
hash, the signMessage function to sign messages, and the                                                                           on evaluating the performance of the P RIV KYC pool smart
ecrecover function to verify signatures. We implement on                                                                           contracts and off-chain ZKPs, as these have a direct impact
a macOS Monterey machine with an Apple M1 chip (8-core,                                                                            on user experience. The off-chain governance and operational
3.2 GHz), 8 GB RAM, and 512 GB SSD storage.                                                                                        processes of the DRC also require evaluation to ensure robust
                                                                                                                                   deanonymization requests and governance resilience.
B. Evaluation Results                                                                                                                 The freshness of KYC attributes is also a relevant concern.
   1) Gas Costs: We evaluate the deployment, deposit, and                                                                          Attributes such as age and credit rating may change over time,
withdrawal gas costs as a function of the Merkle tree depth                                                                        which can lead to previously verified KYC attributes becoming
(see Fig. 2a). The deployment costs remain the most significant                                                                    outdated. Future research can explore how the PIP may support
contributor to overall gas consumption, requiring around 6 ×                                                                       the dynamic updating and validation of such attributes.
106 gas units. The deposit costs increase with Merkle tree                                                                            While this work presents a technical exploration of privacy-
depth, rising from 0.57 × 106 gas units at depth 10 to 2.84 ×                                                                      preserving and KYC compliance solutions in blockchains, the
106 at depth 60. The withdrawal costs remain relatively low                                                                        challenge of balancing user privacy with compliance cannot
and consistent across all depths, averaging around 368,513                                                                         be resolved by technical means alone. A sustainable solution
gas units. Overall, the P RIV KYC pool demonstrates similar                                                                        requires a governance framework built on mutual trust and
gas efficiency as TC. The gas costs of TC for deposit and                                                                          effective incentive mechanisms, where CASPs translate regula-
withdrawal are 1,088,354 and 301,233 at tree depth of 20.                                                                          tory requirements into attribute-based policies, CEXs maintain
   2) Scalability: The scalability of the P RIV KYC pool is                                                                        accurate KYC data, and users develop compliance awareness.
evaluated by comparing the growth of unique Ethereum ad-                                                                                                           VII. C ONCLUSION
dresses with the pool’s depositor capacity (see Fig. 2b). The
green and red dashed lines represent Merkle tree depths of                                                                            In this work, we propose R EG KYC, a privacy-preserving
20 and 30, supporting 220 and 230 depositors respectively.                                                                         ABAC framework that balances externally imposed KYC and
According to etherscan.io, Ethereum unique addresses                                                                               AML regulatory requirements with user privacy in blockchain
grew from about 212 to 227 . A tree depth of 30 enables the                                                                        systems. R EG KYC enables the flexible verification of KYC
pool to support all depositor addresses for the years to come.                                                                     attributes, enforces compliance policies, and supports autho-
   3) Off-Chain Circuit Generation Time: Fig. 2c shows how                                                                         rized deanonymization when accountability is required. This
the off-chain circuit generation time and the number of circuit                                                                    framework benefits multiple stakeholders. Users can achieve
constraints vary with Merkle tree depths. The number of con-                                                                       compliance while preserving the privacy of their on-chain
straints grows linearly while the generation time increases non-                                                                   activities. CASPs can implement tailored compliance policies
linearly. Focusing on depths 20 and 30, which are highlighted                                                                      aligned with their operational needs. External regulators can
in Fig. 2b as critical configurations, the circuit generation times                                                                ensure accountability when necessary. We hope this structured
are approximately 280 seconds and 430 seconds respectively.                                                                        framework provides a foundation to inspire the future develop-
While a Merkle tree depth of 30 significantly increases depos-                                                                     ment of best practices for integrating regulatory requirements
itor capacity, it comes with higher build-time costs.                                                                              into blockchain systems while protecting user privacy.




             Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on November 04,2026 at 08:20:17 UTC from IEEE Xplore. Restrictions apply.

## Page 5

R EFERENCES                                      [16] S. Atapoor and K. Baghery, “Simulation extractability in
                                                                                 groth’s zk-SNARK,” in International Workshop on Data
 [1] V. C. Hu, D. R. Kuhn, D. F. Ferraiolo, and J. Voas,                         Privacy Management, pp. 336–354, Springer, 2019.
     “Attribute-based access control,” Computer, vol. 48,                   [17] D. V. Le and A. Gervais, “AMR: Autonomous coin
     no. 2, pp. 85–88, 2015.                                                     mixer with privacy preserving reward distribution,” in
 [2] X. Xiong, M. Huth, and W. Knottenbelt, “REGKYC:                             Proceedings of the 3rd ACM Conference on Advances
     Supporting privacy and compliance enforcement for kyc                       in Financial Technologies, pp. 142–155, 2021.
     in blockchains,” Cryptology ePrint Archive, 2025.                      [18] Z. Wang, M. Cirkovic, D. V. Le, W. Knottenbelt, and
 [3] Y. Chen, L. Meng, H. Zhou, and G. Xue, “A blockchain-                       C. Cachin, “Pay Less for Your Privacy: Towards Cost-
     based medical data sharing mechanism with attribute-                        Effective On-Chain Mixers,” in 5th Conference on Ad-
     based access control and privacy protection,” Wireless                      vances in Financial Technologies (AFT 2023), vol. 282,
     Communications and Mobile Computing, vol. 2021,                             pp. 16:1–16:25, 2023.
     no. 1, p. 6685762, 2021.                                               [19] P. Pauwels, J. Pirovich, P. Braunz, and J. Deeb, “zkKYC
 [4] C. Zhonghua, S. Goyal, and A. S. Rajawat, “Smart con-                       in defi: An approach for implementing the zkKYC solu-
     tracts attribute-based access control model for security                    tion concept in decentralized finance,” Cryptology ePrint
     & privacy of iot system using blockchain and edge                           Archive, 2022.
     computing,” The Journal of Supercomputing, vol. 80,                    [20] N. Sun, Y. Zhang, and Y. Liu, “A privacy-preserving
     no. 2, pp. 1396–1425, 2024.                                                 KYC-compliant identity scheme for accounts on all pub-
 [5] D. Martens, A. V. Tuyll Van Serooskerken, and M. Steen-                     lic blockchains,” Sustainability, vol. 14, no. 21, p. 14584,
     hagen, “Exploring the potential of blockchain for KYC,”                     2022.
     Journal of Digital Banking, vol. 2, no. 2, pp. 123–131,                [21] A. Biryukov, D. Khovratovich, and S. Tikhomirov,
     2017.                                                                       “Privacy-preserving kyc on ethereum,” in Proceedings
 [6] N. Mansoor, K. F. Antora, P. Deb, T. A. Arman, A. A.                        of 1st ERCIM Blockchain Workshop 2018, European
     Manaf, and M. Zareei, “A review of blockchain ap-                           Society for Socially Embedded Technologies (EUSSET),
     proaches for KYC,” IEEE Access, 2023.                                       2018.
 [7] S. A. Hussain and Z.-u.-H. Usmani, “Blockchain-based                   [22] V. Buterin, J. Illum, M. Nadler, F. Schär, and
     decentralized KYC (know-your-customer),” in Interna-                        A. Soleimani, “Blockchain privacy and regulatory com-
     tional Conference on Systems and Networks Communi-                          pliance: Towards a practical equilibrium,” Blockchain:
     cations, 2019.                                                              Research and Applications, vol. 5, no. 1, p. 100176,
 [8] J. B. Bernabe, J. L. Canovas, J. L. Hernandez-Ramos,                        2024.
     R. T. Moreno, and A. Skarmeta, “Privacy-preserving                     [23] M. Dotan, A. Lotem, and M. Vald, “Haze: A compliant
     solutions for blockchain: Review and challenges,” IEEE                      privacy mixer,” Cryptology ePrint Archive, 2023.
     Access, vol. 7, pp. 164908–164940, 2019.                               [24] Y. Desmedt, “Threshold cryptosystems,” in International
 [9] L. Peng, W. Feng, Z. Yan, Y. Li, X. Zhou, and                               Workshop on the Theory and Application of Crypto-
     S. Shimizu, “Privacy preservation in permissionless                         graphic Techniques, pp. 1–14, Springer, 1992.
     blockchain: A survey,” Digital Communications and Net-                 [25] A. Kate, G. M. Zaverucha, and I. Goldberg, “Constant-
     works, vol. 7, no. 3, pp. 295–307, 2021.                                    size commitments to polynomials and their applications,”
[10] D. Čapko, S. Vukmirović, and N. Nedić, “State of the art                 in International conference on the theory and application
     of zero-knowledge proofs in blockchain,” in 2022 30th                       of cryptology and information security, pp. 177–194,
     Telecommunications Forum (TELFOR), IEEE, 2022.                              Springer, 2010.
[11] X. Sun, F. R. Yu, P. Zhang, Z. Sun, W. Xie, and X. Peng,               [26] J. Groth, “On the size of pairing-based non-interactive
     “A survey on zero-knowledge proof in blockchain,” IEEE                      arguments,” in Advances in Cryptology–EUROCRYPT
     network, vol. 35, no. 4, pp. 198–205, 2021.                                 2016: 35th Annual International Conference on the
[12] J. Hasan, “Overview and applications of zero knowledge                      Theory and Applications of Cryptographic Techniques,
     proof (ZKP),” International Journal of Computer Science                     Vienna, Austria, May 8-12, 2016, Proceedings, Part II
     and Network, vol. 8, no. 5, pp. 2277–5420, 2019.                            35, pp. 305–326, Springer, 2016.
[13] A. Pertsev, R. Semenov, and R. Storm, “Tornado cash                    [27] L. Grassi, D. Khovratovich, C. Rechberger, A. Roy, and
     privacy solution version 1.4,” Tornado cash privacy so-                     M. Schofnegger, “Poseidon: A new hash function for
     lution version, vol. 1, p. 7, 2019.                                         zero-knowledge proof systems.,” in USENIX Security
[14] Z. Wang, S. Chaliasos, K. Qin, L. Zhou, L. Gao,                             Symposium, vol. 2021, 2021.
     P. Berrang, B. Livshits, and A. Gervais, “On how zero-                 [28] M. Albrecht, L. Grassi, C. Rechberger, A. Roy, and
     knowledge proof blockchain mixers improve, and worsen                       T. Tiessen, “Mimc: Efficient encryption and crypto-
     user privacy,” in Proceedings of the ACM Web Confer-                        graphic hashing with minimal multiplicative complexity,”
     ence 2023, pp. 2022–2032, 2023.                                             in International Conference on the Theory and Applica-
[15] T. Chen, H. Lu, T. Kunpittaya, and A. Luo, “A review of                     tion of Cryptology and Information Security, pp. 191–
     zk-SNARKs,” arXiv preprint arXiv:2202.06877, 2022.                          219, Springer, 2016.




  Authorized licensed use limited to: UNIVERSITAS GADJAH MADA. Downloaded on November 04,2026 at 08:20:17 UTC from IEEE Xplore. Restrictions apply.
