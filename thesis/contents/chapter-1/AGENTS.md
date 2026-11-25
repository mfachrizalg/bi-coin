# AGENTS.md: BAB I: Pendahuluan

## Chapter identity

- **Chapter:** BAB I: Pendahuluan
- **File:** `contents/chapter-1/chapter-1.tex`
- **Purpose:** Tell the thesis's reasoning as one story. Blockchain and smart contracts, DLT and permissioned platforms (Hyperledger Fabric), CBDC and the two-tier design, Proyek Garuda, the retail design of Rohmalia and Nugraha and the CDD it does not report, why CDD matters at retail, and CDD outside the ledger. Then Rumusan Masalah, Tujuan, Batasan, Manfaat, and Sistematika.
- **Position:** First content chapter. It sets up the whole thesis.

Shared rules, Bahasa policy, and the supervisor persona: `../../AGENTS.md`.

---

## Current structure

`chapter-1.tex`, in order:
1. `\section{Latar Belakang}`: nine paragraphs, no table, no figure, no list. It is told as a story in the form of `thesis_luthfi.pdf` (see Chapter rules).
2. `\section{Rumusan Masalah}`: lead-in restating two premises from Latar Belakang ("... dua premis utama. Pertama, ... Kedua, ... Berangkat dari kedua premis tersebut, ..."), then items 1 and 2 in plain `enumerate`. Each item is a problem statement followed by its consequence ("Dampaknya, ..."). No questions (user decision 2026-11-04).
3. `\section{Tujuan Penelitian}`: lead-in that maps 1:1 ("Berdasarkan kedua rumusan masalah tersebut, ..."), then items 1 and 2, plain `enumerate`.
4. `\section{Batasan Penelitian}`: lead-in (grandiv p20 pattern, no citations) that ends with a period ("dirinci sebagai berikut."), then five items. Each item is a bold label that ends with a period, the limit, and its effect in plain sentences. No "Oleh karena itu,". No citations.
5. `\section{Manfaat Penelitian}`: outer `enumerate`. Item 1 is bold "Manfaat Akademis" with three `itemize` bullets. Item 2 is bold "Manfaat Praktis" with two `itemize` bullets (user decision 2026-11-04: title case, bullets, no (a)(b)).
6. `\section{Sistematika Penulisan}`: one intro sentence, then an ordered list of five items, one per chapter, written "Bab I" to "Bab V" without chapter titles. Intro and list are kept together with `samepage`.

Gambar 1.1 (Garuda flow) was removed on 2026-11-03: the text carries the chain. Tabel 1.1 (indicator table) was removed on 2026-11-04. The retail-relevance argument (bank account ownership, internet penetration, merchant digital payment numbers) was removed by user decision on 2026-11-06. Do not bring it back.

## Chapter rules

Latar Belakang follows the storytelling of the three reference theses (user decisions 2026-11-05 and 2026-11-09): `thesis_luthfi.pdf` §1.1 (printed pp. 1–4), `thesis_deren.pdf` §1.1 (PDF pp. 15–18), and `thesis_grandiv.pdf` §1.1 (PDF pp. 17–19). What the three share: each paragraph explains one thing and how it works, gives a concrete fact, number, or named example, and then turns to its limit ("Namun,", "Akan tetapi,", "Untuk mengatasi ..."). Luthfi's order is the template: blockchain, its characteristics, the platform, a use case, one implementation, that implementation's technical design, then its weaknesses and the redesign. The reasoning sits inside the sentences ("karena", "sehingga"). No fixed opening or closing phrase repeats across paragraphs. The "Bagi penelitian ini," closer was removed on 2026-11-09 because it came from this project, not from the references.

Paragraph map (nine paragraphs. Retail-first rewrite, 2026-11-12, after Guntur's note that Latar Belakang focused on two-tier. Frame: retail CBDC for Indonesia, updating Rohmalia and Nugraha 2023 (`rohmalia2023retail`). Two-tier is a retail distribution fact and the KYC rationale, not the frame):

1. **Blockchain origin (P1).** Bitcoin as a peer-to-peer electronic cash system. Without a financial institution, no party records balances, so double spending arises (`nakamoto2008`). Blocks linked by hash and proof-of-work resolve it without a trusted third party (`nakamoto2008`). Turn ("Namun,"): Bitcoin scripting is very limited (`buterin2014`). Ethereum answers with a built-in Turing-complete language for arbitrary state transition functions (`buterin2014`). Smart contract, with Bitcoin script as predecessor (`androulaki2018`).
2. **DLT and its traits (P2).** Immutable record-keeping through cryptographic validation, consensus-based verification without a central intermediary (`sethaput2025`). Tamper detection through the hash chain and the single-point-of-failure reduction are reasoning from that definition. Turn ("Namun,"): public networks admit anyone without identity (`androulaki2018`), so a financial institution cannot choose its participants.
3. **Permissioned platform (P3).** "Untuk mengatasi keterbukaan tersebut": permissioned blockchain restricts participation to authorized parties and gives more control and regulatory compliance for institutional use (`sethaput2025`). Fabric: Hyperledger project under the Linux Foundation, known participants who do not fully trust each other, membership service provider, endorsement, ordering without reading content, validation, chaincode (`androulaki2018`). No forward pointer to later chapters (rule of 2026-11-05).
4. **CBDC and retail scope (P4).** The first sentence is fixed by the user: "Salah satu kasus penggunaan blockchain di sektor keuangan adalah Central Bank Digital Currency (CBDC)." Then CBDC as a direct central bank liability (`unknown2024p`), permissioned blockchain being more suitable for CBDC than permissionless (`unknown2022`), and CBDC designed as wholesale or retail (`bi_whitepaper2022`), with the retail tier reaching end users directly. Two-tier is not introduced here (Guntur note, 2026-11-12). It appears in P7 as the KYC rationale (`bhawana2021`).
5. **Proyek Garuda (P5).** Three stages in an iterative process, with the end state letting wholesalers distribute to retailers and end users (`bi_consultative`). The 2023 consultation focuses on the immediate state. The proof of concept of the w-Rupiah Digital wholesale cash ledger was reported in December 2024 (`bi_garuda_poc`) and covers the wholesale tier only. Stage names verified from the consultative paper on 2026-11-09. r-Rupiah Digital (retail, open to the public, distributed through intermediaries) and w-Rupiah Digital (wholesale, limited access) are defined here, so P7 needs no second definition (2026-11-12).
6. **Rohmalia and Nugraha design (P6).** A Fabric retail CBDC model as a payment system (`rohmalia2023retail`): three organizations, each with a peer node and CouchDB, off-chain and on-chain accounts, conversion, transfer, CA certificate check at the ordering service, focus on data confidentiality, transfer times 3,2845 detik (one data) and 7,9101 detik (50 data). One citation, one source.
7. **P7 CDD gap at retail (retail-first rewrite, 2026-11-12).** Rohmalia and Nugraha require identifiable participants and an authorized network (`rohmalia2023retail`), but the paper does not describe the CDD process or where its results are recorded. The owner's name sits on the asset, with no verification described. Every user is a peer holding a ledger copy, so unrestricted CDD records would be readable by all participants (`androulaki2018`). The paper does not show how access would be restricted. Two-tier appears only here, as the KYC rationale: the central bank has no end-user relationship, so the bank komersial runs KYC (`bhawana2021`). Retail CDD matters because the distributor faces end users, so KYC and AML/CFT become design considerations (`Michalopoulos2025Privacy`, AML/CFT expanded at first use). Four cite keys, at the cap.
   - Correction, 2026-11-12: the earlier text said CDD sits outside the ledger because end users are not members. Table 1 and the text on p. 3 make every user a peer, so that reasoning is wrong and must not return.
8. **P8 Garuda and regulation.** Proyek Garuda places KYC and AML/CFT as a function shared between central bank and private sector, run through CDD (`aryani2023critlit`, `Sun2022Behind`, always paired). OJK sets CDD for banks (`ojk2023pojk8`), and BI sets CDD for parties it regulates, including nonbank payment providers (`bi2024pbi10`).
9. **P9 performance gap and volume.** The paper lists high throughput and low confirmation latency as requirements (`rohmalia2023retail`), but reports only two transfer times (3,2845 s for 1 data, 7,9101 s for 50 data), with no throughput or load behaviour. Retail volume reached 25,3 miliar in 2023, more than double end-2019 (`bi_bspi2030`). P7 to P9 feed RM 1 and RM 2.

Notes:
- Ethereum is cited as `buterin2014` (whitepaper, PDF in `thesis/reference/Ethereum_Whitepaper_-_Buterin_2014.pdf`, added 2026-11-12). P1 cites it for both Ethereum claims.
- "wholesaler" is the term of the sources (rohmalia, BI). Our role is `distributor`. P9 writes "distributor berupa PJSP nonbank" at first use.
- No research gap, no "belum" or "celah" framing. Bab I explains why the problem matters.
- No global CBDC survey (e-Krona, Sand Dollar, e-CNY). The chain goes straight from CBDC to Garuda.
- Citations: cite a source where its claim first appears. At most three keys per paragraph, except the merged paragraph 7, which has four keys by user decision (2026-11-10). Split it if the examiner objects. No key repeated inside one paragraph unless two different claims need it. At most two consecutive sentences may share a key.

RM and Tujuan map 1:1. Labels are plain numbers, and prose refers to "rumusan masalah 1 dan 2" and "Tujuan 1 dan 2":
- Rumusan masalah 1 (statement): the two-tier retail design proposed in prior studies does not explain a CDD process that other participants can verify ("dilaporkan" removed as ambiguous, 2026-11-12). Consequence: the bank sentral and other parties cannot confirm that every retail transfer was checked by the same compliance rules. The lead-in links two-tier to CDD: the bank sentral has no end-user relationship, so CDD falls to the distributor (2026-11-12).
- Rumusan masalah 2 (statement): measured throughput, latency, and transaction success of the retail CBDC architecture are still limited ("masih terbatas", 2026-11-12), while retail is expected to show high throughput and low latency, especially for Indonesia. Consequence: the scalability trend cannot yet be predicted. Enforcement accuracy stays in the Tujuan 2 functional test, not in RM 2.
- Every concept in the RM items must already appear in Latar Belakang (merged paragraph 7 and paragraph 6). No new claim, no new citation, no "belum" or "celah" framing. The lead-in names two persoalan and never uses the word premis (user decision 2026-11-10).
- Tujuan 1: design and implement CDD-decision enforcement on the ledger for retail Rupiah Digital on Hyperledger Fabric, with supporting AML/CFT controls.
- Tujuan 2: test the architecture functionally and measure throughput, latency, and transaction success through load testing ("pengujian beban", no tool named, 2026-11-12), then interpret the results to predict the scalability trend. The paragraph after the list states that single-host results cannot be compared directly with BI-FAST and BI-RTGS, and that only the scalability trend can be predicted for a larger deployment of the same architecture (2026-11-12).
- Format: `\begin{enumerate} \item ... \item ... \end{enumerate}`, with no custom labels.

Batasan (deren p19 style, compacted 2026-11-10): one lead-in sentence that names the focus and ties it to RM 1 and 2, then five items. Each item is a bold label ending with a period, followed by at most three short sentences with concrete values (numbers, scope). No citations. No "Oleh karena itu," (user decision 2026-11-09). Target about 300 words for the whole section.
- **Lingkungan Pengujian dan Kondisi Awal.** Container on one host, one Caliper worker, synthetic subjects reused across rounds. Effect: throughput, latency, and success hold only for this environment.
- **Privasi dan Penyimpanan Data.** One channel. CDD contents sit in the private data collection, readable by the Distributor, Bank Indonesia, and the Auditor. Others see pseudonym, action, and time. Identity data in PostgreSQL. Document files local, synthetic images only. ZKP, IPFS, and purge are not implemented.
- **Ketersediaan dan Ketahanan Layanan.** Transactions only while connected. Three Raft orderers in one organization on one host. Failover not tested. BFT out of scope.
- **Kebijakan Moneter dan Sistem Pembayaran Nasional.** Not connected to the national payment system. Limits are prototype parameters, not policy. One nonbank Distributor, reserve simplification.
- **Keaslian Identitas dan Cakupan CDD.** Format and size checks only, no identity verification and no sanctions screening. Restriction reason entered by hand. Source-of-funds checks and monitoring absent. The study does not prove identity.

Manfaat, two bold groups with nested lists. Each item opens with a verb and stays within the prototype's scope. No claims of inclusion impact or production readiness:
- **Manfaat Akademis** (bullets)
  - Theoretical reference for retail CBDC design on a permissioned blockchain.
  - Functional evidence, within the prototype, that CDD decisions, with supporting AML/CFT controls, can be enforced on a Fabric ledger.
  - Initial performance baseline showing the controls' impact on throughput, latency, and transaction success.
- **Manfaat Praktis** (bullets)
  - Prototype that models role separation (central bank, distributor, Auditor, end user) with portal data off the ledger, for technical experiments.
  - Technical input stating the prototype's limits: topology expansion, transaction privacy, advanced security testing.

Sistematika: one intro sentence ("Penulisan skripsi ini disusun ke dalam lima bab dengan sistematika sebagai berikut."), then an ordered list with one item per chapter. Items use "Bab I" to "Bab V" without the chapter title (user decision, 2026-11-04). Intro and list are wrapped in `samepage`. The Bab IV item names the architecture implementation, the functional and Caliper results with their interpretation, and the comparison with prior work (2026-11-05).

## Style decisions for Bab I (user decisions, 2026-11-09)

- No colon, semicolon, or dash used as punctuation in Bab I prose. Compound hyphens inside terms stay (peer-to-peer, off-chain, w-Rupiah). A sentence that introduces a list ends with a period. This departs from `../../AGENTS.md` § Lists ("... sebagai berikut:") for Bab I only. The other chapters keep the shared rule until the user extends this one.
- English technical terms stay English and are italic on every occurrence: `ledger`, `compliance`, `wholesale`, `wholesaler`, `retail`, `retailer`, `end user`, `intermediary`, `two-tier`, `distribution layer`, `user layer`, `channel`, `peer node`, `orderer node`, `wallet`, `balance`, `account`. These Indonesian renderings are not used in prose: buku besar, kepatuhan, grosir, pengecer, perantara, ritel, pengguna akhir, bank umum, akun, saldo, dompet, simpul, kanal, dua lapisan. Exception (user decision 2026-11-12): `bank sentral` replaces `central bank` throughout Bab I prose, and `bank komersial` replaces `commercial bank` (user decision 2026-11-12).
- Proper names, institutions, regulations, and generic words stay Indonesian: Bank Indonesia, Rupiah Digital, Proyek Garuda, pengguna, sistem pembayaran, nasabah, pelaku jasa keuangan.

## Writing guideline

Shared patterns: `../../AGENTS.md` § Reference-thesis patterns. The rules below are for Bab I only (deren p15–21, grandiv p17–24, luthfi printed pp. 1–6).

- Opening: Bab I starts at 1.1 Latar Belakang with no chapter paragraph (deren p15, grandiv p17). Keep it that way.
- Latar Belakang tells a story. Luthfi runs from blockchain, through the platform and a financial use case, to one implementation, its design, and its weaknesses. Deren p15–18 runs from LLM agents, through hallucination as the problem, to oracles and consensus. Grandiv p17–19 runs from agent identity, through three linked security problems, to the RM. Take the form (explain, concrete fact, turn to the limit, cause, consequence, response), not the topics.
- Numbers with a citation show the stakes. Deren p15 cites hallucination rates of 15%–52% across 37 models. Grandiv p26 cites completion rates of 4%–91%. Bi-coin's numbers are the Garuda dates (December 2024) and the transfer times reported by Rohmalia and Nugraha (3,2845 detik and 7,9101 detik).
- Connectives carry each turn: "Namun,", "Akan tetapi,", "Dampaknya,", "Dengan demikian,", "Akibatnya,". Do not end Latar Belakang with a connective or with an argument sentence. End on a normal declarative sentence, as deren p15–18 and grandiv p17–19 do (user decision 2026-11-05).
- Chapter writing: know only earlier chapters. Bab I names only its own content, and the Sistematika roadmap is the one exception (user decision 2026-11-05). Bab I therefore has no pointer to Bab II or Bab III.
- No figure: neither reference has one in Bab I.
- Rumusan Masalah (deren p18–19 style, user decision 2026-11-10): lead-in describes the two persoalan (perancangan CBDC retail, penegakan CDD, kinerja arsitektur), then "Rumusan masalah adalah sebagai berikut." (no "penelitian ini" in RM, 2026-11-12) Items are numbered problem statements with the consequence in the same item ("Hal ini ..."). Do not write premis.
- Tujuan (deren p18–19 style, user decision 2026-11-10): lead-in does not say "rumusan masalah"; it reads "Tujuannya, yang menjawab kedua persoalan tersebut secara berurutan, adalah sebagai berikut." Each item is one sentence that opens with a verb.
- Batasan (deren p19 style, compacted 2026-11-10): see Chapter rules.
- Manfaat: the lead-in reads "Berdasarkan rumusan masalah dan tujuan yang telah ditetapkan, penelitian ini diharapkan dapat ..." (deren p20). Each item opens with a verb.
- Sistematika: one sentence per chapter, saying what it presents and what it leads to. The Bab IV sentence names the result dimensions (deren p21).
- Not adopted: a research gap in Bab I (grandiv p23, §1.7 "mengidentifikasi kesenjangan (research gap)"). The user decision overrides it. Also not adopted: the Kontribusi Penelitian section (grandiv §1.6, p22).

## Supervisor checks

From `thesis_deren.pdf` and `thesis_grandiv.pdf`, Bab I:
- Latar Belakang narrows from broad context to the specific problem.
- RM and Tujuan map 1:1, and the correspondence is stated in the text.
- Each Tujuan opens with a verb.
- Each Batasan item carries a concrete limit (a number, a scope, or a reason) and states its effect on the results.
- Manfaat is grouped as Akademis and Praktis, both in bold.
- Each table is interpreted in one sentence in the text.
- RM items are statements, not questions (user decision 2026-11-04; deren p18, grandiv p19, luthfi p18).
- The no-research-gap rule overrides `thesis_grandiv.pdf`, which states a gap in Bab I.

Bi-coin checks:
- P7 states the limit of the claim about `rohmalia2023retail`: participants must be identifiable, but no verification process is described, and every user is a peer holding a ledger copy (text p. 3, Table 1 p. 4).
- P7 must not say CDD sits outside the ledger because end users are not members. Rohmalia's end users are peers. The gap is that the paper does not say where CDD results are recorded or who may read them (corrected 2026-11-12).
- No paragraph opens or closes with a repeated formula.

## Constraints

- Cite only keys in `references.bib`. Never invent one.
- Batasan contains no `\cite`.
- `bhawana2021` is a design proposal with no evaluation. Cite it for architecture only, never for performance or Bab IV results (user decision, 2026-11-03).
- Claims about `rohmalia2023retail` stay within what the paper reports. Write "tidak melaporkan" or "tidak menjelaskan". Never write that its design "tidak memiliki" CDD without the qualifier, because an unreported CDD step may exist outside the prototype.
- Iroha/Garuda is not a design basis. It may appear only to state the scope boundary.
- Cross-chapter references use the "Bab II" style.
- Do not change section title strings.
- Term set: AML/CFT is the regime. CDD is the central concept. Enhanced due diligence appears only as a Saran item in Bab V and is not implemented. Use KYC only where a cited source uses it (`bi_whitepaper2022`, `bhawana2021`, `aryani2023critlit`'s KYC/AML-CFT).
- Never write that Garuda documents name CDD.
- Never write "menerapkan CDD secara penuh".
- Always pair `aryani2023critlit` with `Sun2022Behind` for the function-framework claim.
- Never write that PBI 10/2024 covers commercial banks. Its regulated parties (`Pihak Yang Diatur`) are non-bank payment providers, non-bank KUPVA, and other non-bank parties licensed by BI (verified on the BI page, 2026-11-05). Banks are PJK under POJK 8/2023 (`ojk2023pojk8`). Verified from the BPK PDF on 2026-11-09: Pasal 2(1)a lists banks as PJK, Pasal 1 angka 12 defines CDD as identification, verification, and monitoring, and Pasal 25 lists the identification data. Cite POJK for banks and PBI only for parties regulated by Bank Indonesia.

## Compaction (user decision 2026-11-10)

- Bab I is compacted: no repeated word within a sentence or paragraph. Use "ini", "itu", or "tersebut" when the referent is clear.
- Latar Belakang: no "penelitian ini". Use the thesis's reading verbs ("dipandang", "diposisikan") instead.
- Retail volume sentence (user decision 2026-11-10): Retail volume now from BSPI 2030 (`bi_bspi2030`): 25,3 miliar retail transactions through digital channels in 2023, more than double end-2019. The infobank2026 figures (549 juta, 0,86 juta, ~640x) were removed because the BSPI text does not contain them. The 1,63 miliar Q3 2026 figure was removed on 2026-11-10 (user request; unverified). The 100.000x ratio the user proposed is not supported; the ~640x ratio is no longer used (2026-11-12).
