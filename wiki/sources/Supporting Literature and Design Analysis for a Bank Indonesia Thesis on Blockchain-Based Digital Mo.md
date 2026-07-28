---
type: source
title: "Supporting Literature and Design Analysis for a Bank Indonesia Thesis on Blockchain-Based Digital Mo"
created: 2026-07-23
updated: 2026-07-23
tags:
  - "source"
  - "research"
  - "full-text"
status: developing
source_type: paper
source_availability: full-text
author: "ChatGPT Deep Research"
date_published: unknown
url: ""
confidence: high
key_claims:
  - "Those characteristics map well to a thesis that needs to model issuance authority, participant onboarding, bank-to-bank transfer, audit events, and back-end integration without the full operational complexity of a production CBDC stack. (PDF p. 1)"
  - "The main caution is maturity: official project reports show that Iroha 1 is no longer actively maintained, while Iroha 2 is a Rust rewrite with active progress but is still a newer codebase and is not backward compatible with Iroha 1. (PDF p. 1)"
  - "Bank Indonesia’s PoC used Corda and Hyperledger Besu, partly because those platforms directly exposed strong privacy and smart-contract design trade-offs that were relevant to BI’s criteria. (PDF p. 1)"
  - "6 Several critical details remain unspecified in public Bank Indonesia materials and should be labeled as such in the thesis: the final production platform; exact validator topology and target decentralization level; exact KYC workflow; quantitative SLA or performance targets; final privacy technology; exact offline design; and the final division of responsibilities between BI, wholesalers, and other intermediaries i (PDF p. 2)"
related:
  - "[[CBDC Design and Policy]]"
  - "[[Digital Rupiah and Indonesian Payments]]"
  - "[[DLT and Blockchain Architecture]]"
  - "[[Privacy Security and Compliance]]"
  - "[[Performance and Benchmarking]]"
  - "[[Adoption Inclusion Banking and Macroeconomics]]"
  - "[[Central Bank Digital Currency]]"
  - "[[Two-tier CBDC Architecture]]"
  - "[[Distributed Ledger Technology]]"
  - "[[Permissioned Blockchain]]"
  - "[[Blockchain Interoperability]]"
  - "[[Byzantine Fault Tolerance]]"
  - "[[Offline CBDC Payments]]"
  - "[[Know Your Customer]]"
  - "[[Anti-Money Laundering]]"
  - "[[CBDC Privacy]]"
  - "[[CBDC Scalability]]"
  - "[[Transaction Throughput]]"
  - "[[Transaction Latency]]"
  - "[[Blockchain Benchmarking]]"
  - "[[Bank Indonesia]]"
  - "[[Bank for International Settlements]]"
  - "[[Hyperledger Fabric]]"
  - "[[Project Garuda]]"
  - "[[Digital Rupiah]]"
sources:
  - "[[.raw/papers/supporting-literature-and-design-analysis-for-a-bank-indonesia-thesis-on-blockchain-based-digital-mo|Raw extraction]]"
---

# Supporting Literature and Design Analysis for a Bank Indonesia Thesis on Blockchain-Based Digital Mo

## Source

- Original: `thesis/reference/Supporting Literature and Design Analysis for a Bank Indonesia Thesis on Blockchain-Based Digital Mo.pdf`
- SHA-256: `c707dccd6b165ff5f33b5a0bb7941b4907d40a49667e6bda2efa4fd278f0c410`
- Pages: 17

## Evidence-backed summary

- Those characteristics map well to a thesis that needs to model issuance authority, participant onboarding, bank-to-bank transfer, audit events, and back-end integration without the full operational complexity of a production CBDC stack. ([[.raw/papers/supporting-literature-and-design-analysis-for-a-bank-indonesia-thesis-on-blockchain-based-digital-mo#Page 1|PDF p. 1]]).
- The main caution is maturity: official project reports show that Iroha 1 is no longer actively maintained, while Iroha 2 is a Rust rewrite with active progress but is still a newer codebase and is not backward compatible with Iroha 1. ([[.raw/papers/supporting-literature-and-design-analysis-for-a-bank-indonesia-thesis-on-blockchain-based-digital-mo#Page 1|PDF p. 1]]).
- Bank Indonesia’s PoC used Corda and Hyperledger Besu, partly because those platforms directly exposed strong privacy and smart-contract design trade-offs that were relevant to BI’s criteria. ([[.raw/papers/supporting-literature-and-design-analysis-for-a-bank-indonesia-thesis-on-blockchain-based-digital-mo#Page 1|PDF p. 1]]).
- 6 Several critical details remain unspecified in public Bank Indonesia materials and should be labeled as such in the thesis: the final production platform; exact validator topology and target decentralization level; exact KYC workflow; quantitative SLA or performance targets; final privacy technology; exact offline design; and the final division of responsibilities between BI, wholesalers, and other intermediaries i ([[.raw/papers/supporting-literature-and-design-analysis-for-a-bank-indonesia-thesis-on-blockchain-based-digital-mo#Page 2|PDF p. 2]]).
- The public record also says that future work is needed on privacy, liquidity-saving mechanisms, and multivalidator deployment. ([[.raw/papers/supporting-literature-and-design-analysis-for-a-bank-indonesia-thesis-on-blockchain-based-digital-mo#Page 2|PDF p. 2]]).
- The source base is strong enough to support a rigorous undergraduate thesis because the direct BI materials define the business-process problem; BIS and central-bank reports define accepted CBDC design principles; official platform docs define implementable technical features; and academic sources support architectural choices and benchmarking methodology. ([[.raw/papers/supporting-literature-and-design-analysis-for-a-bank-indonesia-thesis-on-blockchain-based-digital-mo#Page 2|PDF p. 2]]).
- BIS reports emphasize modular design, two-tier boundaries, ecosystem APIs, privacy tradeoffs, and interoperability. ([[.raw/papers/supporting-literature-and-design-analysis-for-a-bank-indonesia-thesis-on-blockchain-based-digital-mo#Page 5|PDF p. 5]]).

## Method and evidence

- Taken together, these sources strongly support a thesis that simulates Bank Indonesia’s wholesale-Rupiah-Digital immediate-state business process on a permissioned ledger, provided the thesis is explicit that it is a research simulation and not evidence that Bank Indonesia has selected Hyperledger Iroha for production. (PDF p. 1).
- 3 For your specific platform choice, Hyperledger Iroha 2 is defensible for an undergraduate prototype because it supports private-permissioned deployment, manual peer onboarding, flexible permission tokens, explicit accounts/domains/assets, event triggers, multisignature operations, an HTTP/WebSocket API, and developer-facing SDKs in Python, Rust, Kotlin/Java, and JavaScript. (PDF p. 1).

## Limitations and cautions

- The public record also says that future work is needed on privacy, liquidity-saving mechanisms, and multivalidator deployment. (PDF p. 2).
- Bank Indonesia’s materials fit this pattern almost exactly: the public documents emphasize 3i, BI-RTGS interconnection, messaging standards, node roles, and future work on privacy and liquidity management. (PDF p. 5).

## Concepts

- [[Anti-Money Laundering]] — first matched on PDF p. 6
- [[Blockchain Benchmarking]] — first matched on PDF p. 13
- [[Blockchain Interoperability]] — first matched on PDF p. 1
- [[Byzantine Fault Tolerance]] — first matched on PDF p. 4
- [[CBDC Privacy]] — first matched on PDF p. 1
- [[CBDC Scalability]] — first matched on PDF p. 4
- [[Central Bank Digital Currency]] — first matched on PDF p. 1
- [[Distributed Ledger Technology]] — first matched on PDF p. 1
- [[Know Your Customer]] — first matched on PDF p. 2
- [[Offline CBDC Payments]] — first matched on PDF p. 7
- [[Permissioned Blockchain]] — first matched on PDF p. 1
- [[Transaction Latency]] — first matched on PDF p. 9
- [[Transaction Throughput]] — first matched on PDF p. 9
- [[Two-tier CBDC Architecture]] — first matched on PDF p. 3

## Entities

- [[Bank Indonesia]] — first matched on PDF p. 1
- [[Bank for International Settlements]] — first matched on PDF p. 1
- [[Digital Rupiah]] — first matched on PDF p. 6
- [[Hyperledger Fabric]] — first matched on PDF p. 2
- [[Project Garuda]] — first matched on PDF p. 2
- [[ChatGPT Deep Research]] — author metadata

## Research domains

- [[CBDC Design and Policy]]
- [[Digital Rupiah and Indonesian Payments]]
- [[DLT and Blockchain Architecture]]
- [[Privacy Security and Compliance]]
- [[Performance and Benchmarking]]
- [[Adoption Inclusion Banking and Macroeconomics]]
