# AGENTS.md: BAB I: Pendahuluan

## Chapter identity

- **Chapter:** BAB I: Pendahuluan
- **File:** `contents/chapter-1/chapter-1.tex`
- **Purpose:** Tell the thesis's reasoning as one chain (Bitcoin, CBDC, Project Garuda, compliance problem), then set out Rumusan Masalah, Tujuan, Batasan, Manfaat, and Sistematika.
- **Position:** First content chapter. It sets up the whole thesis.

Shared rules, Bahasa policy, and the supervisor persona: `../../AGENTS.md`.

---

## Current structure

`chapter-1.tex`, in order:
1. `\section{Latar Belakang}`: four-step chain. Labels: `tab:ch1-indikator` (indicator table, with source line), `fig:ch1-alur-latar` (Garuda flow).
2. `\section{Rumusan Masalah}`: RM1, RM2.
3. `\section{Tujuan Penelitian}`: T1, T2.
4. `\section{Batasan Penelitian}`: four items, no citations.
5. `\section{Manfaat Penelitian}`: five items.
6. `\section{Sistematika Penulisan}`: one `\noindent` paragraph per chapter.

## Chapter rules

Latar Belakang is one chain, one paragraph per step:
1. Origin: Bitcoin as peer-to-peer electronic money on a blockchain, then DLT as the wider ledger concept.
2. Implementation: CBDC as a direct central-bank liability on a permissioned blockchain such as Hyperledger Fabric, which keeps network governance with the central bank.
3. Project Garuda: Bank Indonesia's phases (w-Rupiah Digital wholesale first, then r-Rupiah Digital retail), with Tabel 1.1.
4. Compliance problem: on the retail tier, intermediaries that deal with end users must meet KYC and AML/CFT rules. End with: controls must be enforced on the ledger and verified, and their performance measured. RM1 and RM2 follow.

- No research gap, no "belum" or "celah" framing. Bab I explains why the problem matters.
- No global CBDC survey (e-Krona, Sand Dollar, e-CNY). The chain goes straight from CBDC to Garuda.
- Cite a source where its claim first appears. Do not repeat a key in every sentence.
- Keep Tabel 1.1 with its source line. Keep Gambar 1.1 in the same order as the text.

RM and Tujuan map 1:1:
- RM1: how to build and verify functionally a Fabric-based Rupiah Digital ritel prototype that enforces selected KYC and AML/CFT controls.
- RM2: how the prototype performs when measured with Hyperledger Caliper.
- T1: build the prototype and verify its selected KYC and AML/CFT controls functionally.
- T2: measure the prototype's performance with Hyperledger Caliper.
- Format: `\begin{enumerate} \item[RM1] ... \item[RM2] ... \end{enumerate}`, and the same with `T1` and `T2`.

Batasan, four items, no citations:
- Prototype: Hyperledger Fabric 2.5, four organizations, one peer each, on a locally simulated container network, not production.
- Controls: selected KYC and AML/CFT controls only. No institutional compliance judgement and no real-world risk-model effectiveness.
- Performance: Caliper with one worker on one host and synthetic data. Results do not generalize to production hardware or topology.
- Out of scope: offline payments, privacy on the shared channel, ordering-service fault tolerance, BI-RTGS and BI-FAST integration, monetary policy analysis.

Manfaat, five items. Each stays within the prototype's scope. No claims of inclusion impact or production readiness:
1. Theoretical reference for retail CBDC design on a permissioned blockchain: tiered issuance to distributor banks, conversion to retail float, user-to-user transfer, and central-bank oversight.
2. How Hyperledger Fabric separates the roles of central bank, distributor bank, *pengawas*, and end user, with portal data kept off the ledger. Wording matches `chapter-1.tex`; see checks.
3. Prototype for technical experiments on issuance, transfer, authorization, and recording of oversight events.
4. Initial performance baseline from limited load tests: throughput, latency, and transaction success, within prototype scope.
5. Technical input to the Rupiah Digital ritel discussion, stating the prototype's limits: topology expansion, transaction privacy, advanced security testing.

Sistematika: one opening sentence (five chapters), then one `\noindent` paragraph per chapter.

## Supervisor checks

From `thesis_deren.pdf` and `thesis_grandiv.pdf`, Bab I:
- Latar Belakang narrows from broad context to the specific problem.
- RM and Tujuan are numbered and map 1:1. State the correspondence in text.
- Each Tujuan opens with a verb.
- Each Batasan item carries a concrete limit: a number, a scope, or a reason.
- Manfaat may group items as Akademis and Praktis.
- Both references write RM as statements, not questions. Raise this only as a `Note`. The RM1/RM2 spec here stands.
- The no-research-gap rule overrides `thesis_grandiv.pdf`, which states a gap in Bab I.
- Manfaat item 2 says *pengawas*. The domain role is Auditor (see the persona's naming rule). Flag it for a `.tex` edit; do not edit `.tex` without the user.

## Constraints

- Cite only keys in `references.bib`. Never invent one.
- Iroha/Garuda is not a design basis. It may appear only to state the scope boundary.
- Cross-chapter references use the "Bab II" style.
- Do not change section title strings.
