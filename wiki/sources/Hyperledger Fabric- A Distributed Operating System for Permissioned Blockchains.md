---
type: source
title: "Hyperledger Fabric: A Distributed Operating System for Permissioned Blockchains"
created: 2026-07-23
updated: 2026-07-23
tags:
  - "source"
  - "research"
  - "full-text"
status: developing
source_type: paper
source_availability: full-text
author: "Androulaki, Elli; Barger, Artem; Bortnikov, Vita; Cachin, Christian; Christidis, Konstantinos; De Caro, Angelo; Enyeart, David; Ferris, Christopher; Laventman, Gennady; Manevich, Yacov; others"
date_published: 2018
url: "https://doi.org/10.1145/3190508.3190538"
confidence: high
key_claims:
  - "Fabric is the first truly extensible blockchain system for running distributed applications. (PDF p. 1)"
  - "Fabric is also the first blockchain system that runs distributed applications written in standard, general-purpose programming languages, without systemic dependency on a native cryptocurrency. (PDF p. 1)"
  - "This stands in sharp contrast to existing blockchain platforms that require “smart-contracts” to be written in domain-specific languages or rely on a cryptocurrency. (PDF p. 1)"
  - "To support such flexibility, Fabric introduces an entirely novel blockchain design and revamps the way blockchains cope with nondeterminism, resource exhaustion, and performance attacks. (PDF p. 1)"
related:
  - "[[CBDC Design and Policy]]"
  - "[[DLT and Blockchain Architecture]]"
  - "[[Privacy Security and Compliance]]"
  - "[[Performance and Benchmarking]]"
  - "[[Adoption Inclusion Banking and Macroeconomics]]"
  - "[[Permissioned Blockchain]]"
  - "[[Smart Contracts]]"
  - "[[Byzantine Fault Tolerance]]"
  - "[[Digital Identity]]"
  - "[[CBDC Privacy]]"
  - "[[Double-spending Prevention]]"
  - "[[CBDC Adoption]]"
  - "[[Trust in Digital Currency]]"
  - "[[Payment System Resilience]]"
  - "[[CBDC Scalability]]"
  - "[[Transaction Throughput]]"
  - "[[Transaction Latency]]"
  - "[[Blockchain Benchmarking]]"
  - "[[Cryptocurrency]]"
  - "[[Hyperledger Foundation]]"
  - "[[Hyperledger Fabric]]"
sources:
  - "[[.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains|Raw extraction]]"
---

# Hyperledger Fabric: A Distributed Operating System for Permissioned Blockchains

## Source

- Original: `thesis/reference/Hyperledger Fabric_ A Distributed Operating System for Permissioned Blockchains.pdf`
- SHA-256: `0c679377ab46697e3d598100fd749be7eebef9f74f164b15f7ea015f41c63bad`
- Pages: 15
- DOI: `10.1145/3190508.3190538`

## Evidence-backed summary

- Fabric is the first truly extensible blockchain system for running distributed applications. ([[.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains#Page 1|PDF p. 1]]).
- Fabric is also the first blockchain system that runs distributed applications written in standard, general-purpose programming languages, without systemic dependency on a native cryptocurrency. ([[.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains#Page 1|PDF p. 1]]).
- This stands in sharp contrast to existing blockchain platforms that require “smart-contracts” to be written in domain-specific languages or rely on a cryptocurrency. ([[.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains#Page 1|PDF p. 1]]).
- To support such flexibility, Fabric introduces an entirely novel blockchain design and revamps the way blockchains cope with nondeterminism, resource exhaustion, and performance attacks. ([[.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains#Page 1|PDF p. 1]]).
- This paper describes Fabric, its architecture, the rationale behind various design decisions, its most prominent implementation aspects, as well as its distributed application programming model. ([[.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains#Page 1|PDF p. 1]]).
- We show that Fabric achieves end-to-end throughput of more than 3500 transactions per second in certain popular deployment configurations, with sub-second latency, scaling well to over 100 peers. ([[.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains#Page 1|PDF p. 1]]).
- A blockchain can be defined as an immutable ledger for recording transactions, maintained within a distributed network of mutually untrusting peers. ([[.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains#Page 1|PDF p. 1]]).

## Method and evidence

- Fabric realizes the permissioned model using a portable notion of membership, which may be integrated with industry-standard identity management. (PDF p. 1).
- This paper describes Fabric, its architecture, the rationale behind various design decisions, its most prominent implementation aspects, as well as its distributed application programming model. (PDF p. 1).

## Limitations and cautions

- However, blockchains depart from traditional SMR with Byzantine faults in important ways: (1) not only one, but many distributed applications run concurrently; (2) applications may be deployed dynamically and by anyone; and (3) the application code is untrusted, potentially even malicious. (PDF p. 2).
- Although the order-execute design is not immediately apparent in all systems, because the additional transaction validation step may blur it, its limitations are inherent in all: every peer executes every transaction and transactions must be deterministic. (PDF p. 2).

## Concepts

- [[Blockchain Benchmarking]] — first matched on PDF p. 3
- [[Byzantine Fault Tolerance]] — first matched on PDF p. 1
- [[CBDC Adoption]] — first matched on PDF p. 2
- [[CBDC Privacy]] — first matched on PDF p. 2
- [[CBDC Scalability]] — first matched on PDF p. 1
- [[Cryptocurrency]] — first matched on PDF p. 1
- [[Digital Identity]] — first matched on PDF p. 1
- [[Double-spending Prevention]] — first matched on PDF p. 6
- [[Payment System Resilience]] — first matched on PDF p. 14
- [[Permissioned Blockchain]] — first matched on PDF p. 1
- [[Smart Contracts]] — first matched on PDF p. 2
- [[Transaction Latency]] — first matched on PDF p. 1
- [[Transaction Throughput]] — first matched on PDF p. 1
- [[Trust in Digital Currency]] — first matched on PDF p. 1

## Entities

- [[Hyperledger Fabric]] — first matched on PDF p. 1
- [[Hyperledger Foundation]] — first matched on PDF p. 1
- [[Androulaki, Elli]] — author metadata
- [[Barger, Artem]] — author metadata
- [[Bortnikov, Vita]] — author metadata
- [[Cachin, Christian]] — author metadata
- [[Christidis, Konstantinos]] — author metadata
- [[De Caro, Angelo]] — author metadata
- [[Enyeart, David]] — author metadata
- [[Ferris, Christopher]] — author metadata
- [[Laventman, Gennady]] — author metadata
- [[Manevich, Yacov]] — author metadata
- [[others]] — author metadata

## Research domains

- [[CBDC Design and Policy]]
- [[DLT and Blockchain Architecture]]
- [[Privacy Security and Compliance]]
- [[Performance and Benchmarking]]
- [[Adoption Inclusion Banking and Macroeconomics]]
