---
type: source
title: "FISCO-BCOS An Enterprise-Grade Permissioned Blockchain System with High-Performance"
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
date_published: 2023
url: ""
confidence: high
key_claims:
  - "However, performance bottlenecks seriously hinder the adoption of these systems in many industrial applications that process complex business logic and huge transaction volumes. (PDF p. 1)"
  - "Our research identifies two key factors that limit the system performance: 1) At the block level, the serial dependency of inter-block processing severely limits the system throughput. (PDF p. 1)"
  - "2) At the transaction level, the lack of efficient intra-block transactions concurrency makes it difficult to achieve high performance, especially when dealing with multiple CPU-heavy contracts which are commonly used in industrial scenarios. (PDF p. 1)"
  - "In this paper, we present FISCO-BCOS, an enterprise-grade permissioned blockchain system with high performance. (PDF p. 1)"
related:
  - "[[DLT and Blockchain Architecture]]"
  - "[[Privacy Security and Compliance]]"
  - "[[Performance and Benchmarking]]"
  - "[[Adoption Inclusion Banking and Macroeconomics]]"
  - "[[Permissioned Blockchain]]"
  - "[[Smart Contracts]]"
  - "[[Byzantine Fault Tolerance]]"
  - "[[Trust in Digital Currency]]"
  - "[[Payment System Resilience]]"
  - "[[CBDC Scalability]]"
  - "[[Transaction Throughput]]"
  - "[[Transaction Latency]]"
  - "[[Blockchain Benchmarking]]"
  - "[[Cryptocurrency]]"
  - "[[Hyperledger Fabric]]"
sources:
  - "[[.raw/papers/fisco-bcos-an-enterprise-grade-permissioned-blockchain-system-with-high-performance|Raw extraction]]"
---

# FISCO-BCOS An Enterprise-Grade Permissioned Blockchain System with High-Performance

## Source

- Original: `thesis/reference/FISCO-BCOS_An_Enterprise-Grade_Permissioned_Blockchain_System_with_High-Performance.pdf`
- SHA-256: `4deb31101a8560cd9f5b094e4de078ab8e6b408c16a1105b2287fe5e174c008a`
- Pages: 17
- DOI: `10.1145/3581784.3607053`

## Evidence-backed summary

- However, performance bottlenecks seriously hinder the adoption of these systems in many industrial applications that process complex business logic and huge transaction volumes. ([[.raw/papers/fisco-bcos-an-enterprise-grade-permissioned-blockchain-system-with-high-performance#Page 1|PDF p. 1]]).
- Our research identifies two key factors that limit the system performance: 1) At the block level, the serial dependency of inter-block processing severely limits the system throughput. ([[.raw/papers/fisco-bcos-an-enterprise-grade-permissioned-blockchain-system-with-high-performance#Page 1|PDF p. 1]]).
- 2) At the transaction level, the lack of efficient intra-block transactions concurrency makes it difficult to achieve high performance, especially when dealing with multiple CPU-heavy contracts which are commonly used in industrial scenarios. ([[.raw/papers/fisco-bcos-an-enterprise-grade-permissioned-blockchain-system-with-high-performance#Page 1|PDF p. 1]]).
- In this paper, we present FISCO-BCOS, an enterprise-grade permissioned blockchain system with high performance. ([[.raw/papers/fisco-bcos-an-enterprise-grade-permissioned-blockchain-system-with-high-performance#Page 1|PDF p. 1]]).
- Under BLP and DMC, FISCO-BCOS achieves inter-block and intra-block paralleling to meet high-performance requirements in industrial application scenarios. ([[.raw/papers/fisco-bcos-an-enterprise-grade-permissioned-blockchain-system-with-high-performance#Page 1|PDF p. 1]]).
- The result shows that FISCO-BCOS achieves 7.4 times and 28.4 times the throughput of This work is licensed under a Creative Commons Attribution International 4.0 License. ([[.raw/papers/fisco-bcos-an-enterprise-grade-permissioned-blockchain-system-with-high-performance#Page 1|PDF p. 1]]).
- FISCO-BCOS: An Enterprise-grade Permissioned Blockchain System with High-performance. ([[.raw/papers/fisco-bcos-an-enterprise-grade-permissioned-blockchain-system-with-high-performance#Page 1|PDF p. 1]]).

## Method and evidence

- SC ’23, November 12–17, 2023, Denver, CO, USA Threat Model. (PDF p. 3).
- To design an efficient and deterministic scheduling mechanism, there are two concerns we need to address: (1) how to design an algorithm to parallelize transactions that call contracts within a shard only, and (2) how to design a scheduling method to parallelize transactions invoking contracts across shards. (PDF p. 6).

## Limitations and cautions

- However, performance bottlenecks seriously hinder the adoption of these systems in many industrial applications that process complex business logic and huge transaction volumes. (PDF p. 1).
- To overcome serial limitations and fully utilize machine resources, FISCO-BCOS introduces Block Level Pipelining (BLP) workflow to process blocks in a pipeline manner. (PDF p. 1).

## Concepts

- [[Blockchain Benchmarking]] — first matched on PDF p. 8
- [[Byzantine Fault Tolerance]] — first matched on PDF p. 1
- [[CBDC Scalability]] — first matched on PDF p. 7
- [[Cryptocurrency]] — first matched on PDF p. 10
- [[Payment System Resilience]] — first matched on PDF p. 11
- [[Permissioned Blockchain]] — first matched on PDF p. 1
- [[Smart Contracts]] — first matched on PDF p. 2
- [[Transaction Latency]] — first matched on PDF p. 1
- [[Transaction Throughput]] — first matched on PDF p. 1
- [[Trust in Digital Currency]] — first matched on PDF p. 1

## Entities

- [[Hyperledger Fabric]] — first matched on PDF p. 1

## Research domains

- [[DLT and Blockchain Architecture]]
- [[Privacy Security and Compliance]]
- [[Performance and Benchmarking]]
- [[Adoption Inclusion Banking and Macroeconomics]]
