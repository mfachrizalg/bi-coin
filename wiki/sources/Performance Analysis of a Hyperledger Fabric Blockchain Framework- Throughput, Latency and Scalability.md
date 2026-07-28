---
type: source
title: "Performance Analysis of a Hyperledger Fabric Blockchain Framework: Throughput, Latency and Scalability"
created: 2026-07-23
updated: 2026-07-23
tags:
  - "source"
  - "research"
  - "full-text"
status: developing
source_type: paper
source_availability: full-text
author: "Murat Kuzlu; Manisa Pipattanasomporn; Levent Gurses; Saifur Rahman"
date_published: 2019
url: "https://doi.org/10.1109/blockchain.2019.00003"
confidence: high
key_claims:
  - "Abstract— Focusing on one of the most popular open source blockchain frameworks—Hyperledger Fabric, this paper evaluates the impact of network workload on performance of a blockchain platform. (PDF p. 1)"
  - "In particular, the performance of the Hyperledger Fabric platform is evaluated in terms of: (a) throughput, i.e., successful transactions per second; (b) latency, i.e., response time per transaction in seconds; and (c) scalability, i.e., number of participants serviceable by the platform. (PDF p. 1)"
  - "The results indicate that the instance of Hyperledger Fabric platform being implemented can support up to 100,000 participants on the selected AWS EC2 instance. (PDF p. 1)"
  - "In the literature, several studies discussed the scalability and performance analysis of different blockchain platforms. (PDF p. 1)"
related:
  - "[[DLT and Blockchain Architecture]]"
  - "[[Performance and Benchmarking]]"
  - "[[Distributed Ledger Technology]]"
  - "[[CBDC Scalability]]"
  - "[[Transaction Throughput]]"
  - "[[Transaction Latency]]"
  - "[[Blockchain Benchmarking]]"
  - "[[Hyperledger Fabric]]"
  - "[[Hyperledger Caliper]]"
sources:
  - "[[.raw/papers/performance-analysis-of-a-hyperledger-fabric-blockchain-framework-throughput-latency-and-scalability|Raw extraction]]"
---

# Performance Analysis of a Hyperledger Fabric Blockchain Framework: Throughput, Latency and Scalability

## Source

- Original: `thesis/reference/Performance_Analysis_of_a_Hyperledger_Fabric_Blockchain_Framework_Throughput_Latency_and_Scalability.pdf`
- SHA-256: `8ba27963a4d740e6a52977652c0e6eb1b4be6851e914bf921aa2adb141acd167`
- Pages: 5
- DOI: `10.1109/blockchain.2019.00003`

## Evidence-backed summary

- Abstract— Focusing on one of the most popular open source blockchain frameworks—Hyperledger Fabric, this paper evaluates the impact of network workload on performance of a blockchain platform. ([[.raw/papers/performance-analysis-of-a-hyperledger-fabric-blockchain-framework-throughput-latency-and-scalability#Page 1|PDF p. 1]]).
- In particular, the performance of the Hyperledger Fabric platform is evaluated in terms of: (a) throughput, i.e., successful transactions per second; (b) latency, i.e., response time per transaction in seconds; and (c) scalability, i.e., number of participants serviceable by the platform. ([[.raw/papers/performance-analysis-of-a-hyperledger-fabric-blockchain-framework-throughput-latency-and-scalability#Page 1|PDF p. 1]]).
- The results indicate that the instance of Hyperledger Fabric platform being implemented can support up to 100,000 participants on the selected AWS EC2 instance. ([[.raw/papers/performance-analysis-of-a-hyperledger-fabric-blockchain-framework-throughput-latency-and-scalability#Page 1|PDF p. 1]]).
- In the literature, several studies discussed the scalability and performance analysis of different blockchain platforms. ([[.raw/papers/performance-analysis-of-a-hyperledger-fabric-blockchain-framework-throughput-latency-and-scalability#Page 1|PDF p. 1]]).
- Performance metrics of different blockchain platforms, mainly Hyperledger Fabric and Ethereum, were compared in [16, 17]. ([[.raw/papers/performance-analysis-of-a-hyperledger-fabric-blockchain-framework-throughput-latency-and-scalability#Page 1|PDF p. 1]]).
- Authors in [16] introduced BLOCKBENCH – the evaluation framework for private blockchains, to analyze major blockchain platforms: Ethereum, Parity and Hyperledger Fabric. ([[.raw/papers/performance-analysis-of-a-hyperledger-fabric-blockchain-framework-throughput-latency-and-scalability#Page 1|PDF p. 1]]).
- In [17], the performance analyses of both Hyperledger Fabric and Ethereum were presented. ([[.raw/papers/performance-analysis-of-a-hyperledger-fabric-blockchain-framework-throughput-latency-and-scalability#Page 1|PDF p. 1]]).

## Method and evidence

- The Hyperledger Fabric supports either LevelDB or CouchDB as state database options; and CouchDB was used in deployment model. (PDF p. 2).
- A prototype blockchain network was implemented for storing personal health information as discussed in [26]. (PDF p. 2).

## Limitations and cautions

- The increase in latency was however still considered very small, i.e., 0.03 seconds. (PDF p. 4).
- There existed however the impact of simultaneous transactions on network latency and throughput. (PDF p. 5).

## Concepts

- [[Blockchain Benchmarking]] — first matched on PDF p. 1
- [[CBDC Scalability]] — first matched on PDF p. 1
- [[Distributed Ledger Technology]] — first matched on PDF p. 1
- [[Transaction Latency]] — first matched on PDF p. 1
- [[Transaction Throughput]] — first matched on PDF p. 1

## Entities

- [[Hyperledger Caliper]] — first matched on PDF p. 2
- [[Hyperledger Fabric]] — first matched on PDF p. 1
- [[Murat Kuzlu]] — author metadata
- [[Manisa Pipattanasomporn]] — author metadata
- [[Levent Gurses]] — author metadata
- [[Saifur Rahman]] — author metadata

## Research domains

- [[DLT and Blockchain Architecture]]
- [[Performance and Benchmarking]]
