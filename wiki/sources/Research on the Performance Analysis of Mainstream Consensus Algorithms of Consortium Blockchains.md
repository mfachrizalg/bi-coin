---
type: source
title: "Research on the Performance Analysis of Mainstream Consensus Algorithms of Consortium Blockchains"
created: 2026-07-23
updated: 2026-07-23
tags:
  - "source"
  - "research"
  - "full-text"
status: developing
source_type: paper
source_availability: full-text
author: "Weizhi Xiong; Xiu Yao; Xiaohong Deng"
date_published: 2024
url: "https://doi.org/10.1109/miccis63508.2024.00031"
confidence: high
key_claims:
  - "Experimental evaluations were conducted on average block generation time, latency, throughput, and confirmation failure probability, analyzing and comparing their performances. (PDF p. 1)"
  - "Reference [7] proposed a theoretical model for calculating transaction latency in Fabric under different network configurations, dividing latency into three parts: execution phase latency, ordering phase latency, and validation phase latency, with analysis on the calculation of each part's latency. (PDF p. 1)"
  - "Reference [8] proposed a performance evaluation framework for Hyperledger Fabric 2.2, Hyperledger Sawtooth 1.2, and ConsenSys Quorum 21.1, comparing them in terms of latency, privacy, scalability, and efficiency. (PDF p. 1)"
  - "Reference [9] designed an evaluation framework called BLOCKBENCH for private blockchains, measuring the performance of three private chains - Ethereum, Parity, and Hyperledger Fabric - based on throughput, latency, scalability, and fault tolerance. (PDF p. 1)"
related:
  - "[[DLT and Blockchain Architecture]]"
  - "[[Privacy Security and Compliance]]"
  - "[[Performance and Benchmarking]]"
  - "[[Consensus Mechanisms]]"
  - "[[Byzantine Fault Tolerance]]"
  - "[[Payment System Resilience]]"
  - "[[CBDC Scalability]]"
  - "[[Transaction Throughput]]"
  - "[[Transaction Latency]]"
  - "[[Blockchain Benchmarking]]"
  - "[[Hyperledger Fabric]]"
sources:
  - "[[.raw/papers/research-on-the-performance-analysis-of-mainstream-consensus-algorithms-of-consortium-blockchains|Raw extraction]]"
---

# Research on the Performance Analysis of Mainstream Consensus Algorithms of Consortium Blockchains

## Source

- Original: `thesis/reference/Research_on_the_Performance_Analysis_of_Mainstream_Consensus_Algorithms_of_Consortium_Blockchains.pdf`
- SHA-256: `900c1936cfe1d60cf794d5f8bd30b328bf157dacb92db4496aabb172f26c6480`
- Pages: 5
- DOI: `10.1109/miccis63508.2024.00031`

## Evidence-backed summary

- Experimental evaluations were conducted on average block generation time, latency, throughput, and confirmation failure probability, analyzing and comparing their performances. ([[.raw/papers/research-on-the-performance-analysis-of-mainstream-consensus-algorithms-of-consortium-blockchains#Page 1|PDF p. 1]]).
- Reference [7] proposed a theoretical model for calculating transaction latency in Fabric under different network configurations, dividing latency into three parts: execution phase latency, ordering phase latency, and validation phase latency, with analysis on the calculation of each part's latency. ([[.raw/papers/research-on-the-performance-analysis-of-mainstream-consensus-algorithms-of-consortium-blockchains#Page 1|PDF p. 1]]).
- Reference [8] proposed a performance evaluation framework for Hyperledger Fabric 2.2, Hyperledger Sawtooth 1.2, and ConsenSys Quorum 21.1, comparing them in terms of latency, privacy, scalability, and efficiency. ([[.raw/papers/research-on-the-performance-analysis-of-mainstream-consensus-algorithms-of-consortium-blockchains#Page 1|PDF p. 1]]).
- Reference [9] designed an evaluation framework called BLOCKBENCH for private blockchains, measuring the performance of three private chains - Ethereum, Parity, and Hyperledger Fabric - based on throughput, latency, scalability, and fault tolerance. ([[.raw/papers/research-on-the-performance-analysis-of-mainstream-consensus-algorithms-of-consortium-blockchains#Page 1|PDF p. 1]]).
- In the aforementioned studies, some were limited to qualitative analysis, while others focused more on performance analysis of private chains or specific types of consensus algorithms, lacking quantitative performance analysis for relevant consensus algorithms in consortium chains. ([[.raw/papers/research-on-the-performance-analysis-of-mainstream-consensus-algorithms-of-consortium-blockchains#Page 1|PDF p. 1]]).
- Additionally, the testing conditions varied, which may impact the fairness of performance analysis across different platforms of Ethereum or Hyperledger Fabric. ([[.raw/papers/research-on-the-performance-analysis-of-mainstream-consensus-algorithms-of-consortium-blockchains#Page 1|PDF p. 1]]).
- The main contributions of this paper are as follows: (1) The analysis concludes with the identification of key performance evaluation metrics for consensus algorithms, primarily focusing on throughput, latency, decentralization degree, and consensus security level. ([[.raw/papers/research-on-the-performance-analysis-of-mainstream-consensus-algorithms-of-consortium-blockchains#Page 1|PDF p. 1]]).

## Method and evidence

- Reference [7] proposed a theoretical model for calculating transaction latency in Fabric under different network configurations, dividing latency into three parts: execution phase latency, ordering phase latency, and validation phase latency, with analysis on the calculation of each part's latency. (PDF p. 1).
- The calculation formula is as follows:  Throughput   intx i Time  Lantency  Wq  pk  Nl  Ct   maxNode   n w    1    j Nodeiw  N i    Here,  =  =0.5, indicating that the proportion of consensus nodes and the method of selecting master nodes each contribute equally to determining the degree of decentralization. (PDF p. 2).

## Limitations and cautions

- Abstract—The diverse range of consensus algorithms poses a challenge in selecting the most suitable one for practical application scenarios. (PDF p. 1).
- Finally, the paper outlines the advantages and limitations of each consensus algorithm and identifies the factors constraining their performance. (PDF p. 1).

## Concepts

- [[Blockchain Benchmarking]] — first matched on PDF p. 1
- [[Byzantine Fault Tolerance]] — first matched on PDF p. 3
- [[CBDC Scalability]] — first matched on PDF p. 1
- [[Consensus Mechanisms]] — first matched on PDF p. 1
- [[Payment System Resilience]] — first matched on PDF p. 1
- [[Transaction Latency]] — first matched on PDF p. 1
- [[Transaction Throughput]] — first matched on PDF p. 1

## Entities

- [[Hyperledger Fabric]] — first matched on PDF p. 1
- [[Weizhi Xiong]] — author metadata
- [[Xiu Yao]] — author metadata
- [[Xiaohong Deng]] — author metadata

## Research domains

- [[DLT and Blockchain Architecture]]
- [[Privacy Security and Compliance]]
- [[Performance and Benchmarking]]
