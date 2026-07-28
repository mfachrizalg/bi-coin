---
type: source
title: "An analysis of pervasive payment channel networks for Central Bank Digital Currencies"
created: 2026-07-23
updated: 2026-07-23
tags:
  - "source"
  - "research"
  - "full-text"
status: developing
source_type: paper
source_availability: full-text
author: "Marco Benedetti; Francesco De Sclavis; Marco Favorito; Giuseppe Galano; Sara Giammusso; Antonio Muci; Matteo Nardelli"
date_published: 2025
url: "https://www-sciencedirect-com.ezproxy.ugm.ac.id/science/article/pii/S0140366425001562"
confidence: high
key_claims:
  - "A blockchain alone has known scalability issues that can be overcome by, e.g., a layer-2 payment channel network (PCN). (PDF p. 1)"
  - "In this paper, we consider a two-layer hypothetical CBDC in which the wholesale layer utilizes a permissioned blockchain, which ensures high integrity and verifiability, while the retail layer leverages an off-ledger PCN model (with pervasive nodes distributed on a large-scale) that supports instant, privacy-preserving, and retail payments. (PDF p. 1)"
  - "Through extensive simulations and analyses, we offer insights into optimizing PCN structures for CBDCs by exploring the trade-offs among liquidity locked by market operators, payment success rate, throughput, payment completion time, as well as load on the underlying blockchain. (PDF p. 1)"
  - "Although both SH-PCNs and SF-PCNs can offer state-of-the-art guarantees of fault-tolerance and integrity, we demonstrate that SH-PCNs are better suited for handling large volumes of payments, scale better with the number of network nodes, are more aligned with the anatomy of the current monetary and financial system, and therefore should be preferred in CBDC designs. (PDF p. 1)"
related:
  - "[[CBDC Design and Policy]]"
  - "[[DLT and Blockchain Architecture]]"
  - "[[Privacy Security and Compliance]]"
  - "[[Performance and Benchmarking]]"
  - "[[Adoption Inclusion Banking and Macroeconomics]]"
  - "[[Central Bank Digital Currency]]"
  - "[[Retail CBDC]]"
  - "[[Distributed Ledger Technology]]"
  - "[[Permissioned Blockchain]]"
  - "[[CBDC Privacy]]"
  - "[[Payment System Resilience]]"
  - "[[CBDC Scalability]]"
  - "[[Transaction Throughput]]"
  - "[[Transaction Latency]]"
  - "[[Cryptocurrency]]"
  - "[[Digital Euro]]"
sources:
  - "[[.raw/papers/an-analysis-of-pervasive-payment-channel-networks-for-central-bank-digital-currencies|Raw extraction]]"
---

# An analysis of pervasive payment channel networks for Central Bank Digital Currencies

## Source

- Original: `thesis/reference/An analysis of pervasive payment channel networks for Central Bank Digital
Currencies.pdf`
- SHA-256: `767cab3ec33decd6d70824f1506e5a577913530bfb7f7c82419fbbe956b231ca`
- Pages: 13
- DOI: `10.1016/j.comcom.2025.108199`

## Evidence-backed summary

- A blockchain alone has known scalability issues that can be overcome by, e.g., a layer-2 payment channel network (PCN). ([[.raw/papers/an-analysis-of-pervasive-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- In this paper, we consider a two-layer hypothetical CBDC in which the wholesale layer utilizes a permissioned blockchain, which ensures high integrity and verifiability, while the retail layer leverages an off-ledger PCN model (with pervasive nodes distributed on a large-scale) that supports instant, privacy-preserving, and retail payments. ([[.raw/papers/an-analysis-of-pervasive-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- Through extensive simulations and analyses, we offer insights into optimizing PCN structures for CBDCs by exploring the trade-offs among liquidity locked by market operators, payment success rate, throughput, payment completion time, as well as load on the underlying blockchain. ([[.raw/papers/an-analysis-of-pervasive-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- Although both SH-PCNs and SF-PCNs can offer state-of-the-art guarantees of fault-tolerance and integrity, we demonstrate that SH-PCNs are better suited for handling large volumes of payments, scale better with the number of network nodes, are more aligned with the anatomy of the current monetary and financial system, and therefore should be preferred in CBDC designs. ([[.raw/papers/an-analysis-of-pervasive-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- The advent of blockchain technology has opened new perspectives in the financial sector, with the promise of enabling peer-to-peer, secure, and programmable payments or exchanges of value in general. ([[.raw/papers/an-analysis-of-pervasive-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- Currently, the most popular examples of blockchains (i.e., [1,2]) are public and permissionless, meaning that transactions are stored on a public ledger (open to anyone for inspection) and that the ledger can be updated by any node participating in the blockchain network (open to anyone for validation). ([[.raw/papers/an-analysis-of-pervasive-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).
- For example, public blockchains have throughput of approximately 10 transactions per second (in Bitcoin), approximately 100 transactions per second (in Ethereum), or approximately 1000 transactions per second (in Algorand)1 , with average latencies of 10 minutes, 12 s and 4 s, respectively.2 These blockchain figures contrast with transaction volumes handled by centralized systems deployed to implement retail instant  ([[.raw/papers/an-analysis-of-pervasive-payment-channel-networks-for-central-bank-digital-currencies#Page 1|PDF p. 1]]).

## Method and evidence

- In this paper, we consider a two-layer hypothetical CBDC in which the wholesale layer utilizes a permissioned blockchain, which ensures high integrity and verifiability, while the retail layer leverages an off-ledger PCN model (with pervasive nodes distributed on a large-scale) that supports instant, privacy-preserving, and retail payments. (PDF p. 1).
- In our current model, each end user directly participates into the PCN with their own (mobile) node, making the resulting CBDC non-custodial and with minimal 3 trust assumptions. (PDF p. 2).

## Limitations and cautions

- However, not all aspects of such a PCN are easy to specify and optimize. (PDF p. 1).
- Currently, the LN boasts over 13k active nodes, each maintaining an average of 8 open channels.3 However, not all aspects of a PCN are statically and easily specified. (PDF p. 2).

## Concepts

- [[CBDC Privacy]] — first matched on PDF p. 1
- [[CBDC Scalability]] — first matched on PDF p. 1
- [[Central Bank Digital Currency]] — first matched on PDF p. 1
- [[Cryptocurrency]] — first matched on PDF p. 12
- [[Distributed Ledger Technology]] — first matched on PDF p. 9
- [[Payment System Resilience]] — first matched on PDF p. 3
- [[Permissioned Blockchain]] — first matched on PDF p. 1
- [[Retail CBDC]] — first matched on PDF p. 2
- [[Transaction Latency]] — first matched on PDF p. 2
- [[Transaction Throughput]] — first matched on PDF p. 1

## Entities

- [[Digital Euro]] — first matched on PDF p. 3
- [[Marco Benedetti]] — author metadata
- [[Francesco De Sclavis]] — author metadata
- [[Marco Favorito]] — author metadata
- [[Giuseppe Galano]] — author metadata
- [[Sara Giammusso]] — author metadata
- [[Antonio Muci]] — author metadata
- [[Matteo Nardelli]] — author metadata

## Research domains

- [[CBDC Design and Policy]]
- [[DLT and Blockchain Architecture]]
- [[Privacy Security and Compliance]]
- [[Performance and Benchmarking]]
- [[Adoption Inclusion Banking and Macroeconomics]]
