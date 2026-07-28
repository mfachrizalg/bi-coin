---
type: source
title: "Self-Balancing Semi-Hierarchical Payment Channel Networks for Central Bank Digital Currencies"
created: 2026-07-23
updated: 2026-07-23
tags:
  - "source"
  - "research"
  - "full-text"
status: developing
source_type: paper
source_availability: full-text
author: ""
date_published: 2024
url: ""
confidence: high
key_claims:
  - "Furthermore, the cryptographic privacy of payments— typical of PCNs such as the public Lightning Network—is largely (possibly fully) retained. (PDF p. 1)"
  - "We simulate a scaled-down version of a hypothetical European CBDC, exploring the trade-offs among liquidity locked by market operators, payment success rate, throughput, latency, and load on the underpinning blockchain. (PDF p. 1)"
  - "Performance is not all, though: In the case of CBDCs, further business and technical requirements are put into place, such as strong privacy guarantees, small or no fees for citizens, a cap on the amount of liquidity users can amass, and the possibility to be usable by unbanked people. (PDF p. 1)"
  - "Finally, CBDC systems have to be embedded into—and play nice with—the pre-defined, multi-tier structure of the existing monetary infrastructure while providing each actor with clear and strong incentives to adopt the CBDC itself. (PDF p. 1)"
related:
  - "[[CBDC Design and Policy]]"
  - "[[DLT and Blockchain Architecture]]"
  - "[[Privacy Security and Compliance]]"
  - "[[Performance and Benchmarking]]"
  - "[[Adoption Inclusion Banking and Macroeconomics]]"
  - "[[Central Bank Digital Currency]]"
  - "[[Retail CBDC]]"
  - "[[Distributed Ledger Technology]]"
  - "[[CBDC Privacy]]"
  - "[[Payment System Resilience]]"
  - "[[CBDC Scalability]]"
  - "[[Transaction Throughput]]"
  - "[[Transaction Latency]]"
  - "[[Cryptocurrency]]"
  - "[[Digital Euro]]"
sources:
  - "[[.raw/papers/self-balancing-semi-hierarchical-payment-channel-networks-for-central-bank-digital-currencies|Raw extraction]]"
---

# Self-Balancing Semi-Hierarchical Payment Channel Networks for Central Bank Digital Currencies

## Source

- Original: `thesis/reference/Self-Balancing_Semi-Hierarchical_Payment_Channel_Networks_for_Central_Bank_Digital_Currencies.pdf`
- SHA-256: `bbd2533788db20583c659fe9468afcab6a529fde7e9371d0e5060ff5f437a0fb`
- Pages: 7
- DOI: `10.1109/percomworkshops59983.2024.10503409`

## Evidence-backed summary

- Furthermore, the cryptographic privacy of payments— typical of PCNs such as the public Lightning Network—is largely (possibly fully) retained. ([[.raw/papers/self-balancing-semi-hierarchical-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- We simulate a scaled-down version of a hypothetical European CBDC, exploring the trade-offs among liquidity locked by market operators, payment success rate, throughput, latency, and load on the underpinning blockchain. ([[.raw/papers/self-balancing-semi-hierarchical-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- Performance is not all, though: In the case of CBDCs, further business and technical requirements are put into place, such as strong privacy guarantees, small or no fees for citizens, a cap on the amount of liquidity users can amass, and the possibility to be usable by unbanked people. ([[.raw/papers/self-balancing-semi-hierarchical-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- Finally, CBDC systems have to be embedded into—and play nice with—the pre-defined, multi-tier structure of the existing monetary infrastructure while providing each actor with clear and strong incentives to adopt the CBDC itself. ([[.raw/papers/self-balancing-semi-hierarchical-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- First key point: Most blockchains are well-known for their limited throughput. ([[.raw/papers/self-balancing-semi-hierarchical-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- So, we forgo on-chain settlement of retail payments entirely and embrace the off-ledger paradigm, whereby scalability is achieved by an additional “payment channel network”, or PCN (2nd layer) built on top of the actual blockchain [1]. ([[.raw/papers/self-balancing-semi-hierarchical-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- Unfortunately, their anatomy (i) provides a performance that is insufficient for large-scale payment systems, (ii) is oblivious to the business requirements of CBDCs, and (iii) is not coherent with the 3-tier structure of the monetary system. ([[.raw/papers/self-balancing-semi-hierarchical-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).

## Method and evidence

- We do not model a full-scale SH-PCN system just yet, but a scaled-down version. (PDF p. 1).
- This reduced model is still capable of exhibiting the key dynamics we want to investigate, such as the trade-offs among the liquidity locked in channels, the success rate of payments, their latency, and the transactional demand on the underlying 1st -layer blockchain (see Sect. (PDF p. 1).

## Limitations and cautions

- 3 This is not a technical limitation, but a policy option: If end users were granted access to Layer 1 in order to open channels among them, the level of privacy of payments would possibly approach full anonymity. (PDF p. 2).
- However, their presence is taken for granted and the focus is on their optimal placement. (PDF p. 7).

## Concepts

- [[CBDC Privacy]] — first matched on PDF p. 1
- [[CBDC Scalability]] — first matched on PDF p. 1
- [[Central Bank Digital Currency]] — first matched on PDF p. 1
- [[Cryptocurrency]] — first matched on PDF p. 7
- [[Distributed Ledger Technology]] — first matched on PDF p. 6
- [[Payment System Resilience]] — first matched on PDF p. 2
- [[Retail CBDC]] — first matched on PDF p. 2
- [[Transaction Latency]] — first matched on PDF p. 1
- [[Transaction Throughput]] — first matched on PDF p. 1

## Entities

- [[Digital Euro]] — first matched on PDF p. 7

## Research domains

- [[CBDC Design and Policy]]
- [[DLT and Blockchain Architecture]]
- [[Privacy Security and Compliance]]
- [[Performance and Benchmarking]]
- [[Adoption Inclusion Banking and Macroeconomics]]
