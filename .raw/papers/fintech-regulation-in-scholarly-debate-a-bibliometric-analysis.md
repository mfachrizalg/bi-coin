---
source_type: pdf
title: "FINTECH REGULATION IN SCHOLARLY DEBATE: A BIBLIOMETRIC ANALYSIS"
original_file: "thesis/reference/FINTECH REGULATION IN SCHOLARLY DEBATE: A BIBLIOMETRIC ANALYSIS.pdf"
sha256: "080e909f29895f6c1db8b29a15c806544a42a23be2e5126aacfffdcbecad20c3"
page_count: 28
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: FINTECH REGULATION IN SCHOLARLY DEBATE: A BIBLIOMETRIC ANALYSIS

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Journal of Central Banking Law and Institutions, Vol. 4 No. 2, 2025, pp. 359 - 386
e-ISSN: 2809-9885 – p-ISSN: 2827-7775
https://doi.org/10.21098/jcli.v4i2.259

FINTECH REGULATION IN SCHOLARLY DEBATE:
A BIBLIOMETRIC ANALYSIS
Fahmi Ali Hudaefi
Department of Islamic Economic Laws, Universitas Muhammadiyah Surakarta, Indonesia,
and Faculty of Economics and Business Administration, University of Szeged, Hungary
e-mail: fahmi.hudaefi@ums.ac.id, hudaefi.fahmi.ali@o365.u-szeged.hu
Submitted: 7 March 2024 - Last revised: 7 April 2025 - Accepted: 12 April 2025

Abstract
This study used bibliometric analysis to assess 688 scientific publications on fintech regulation,
which were published across 436 academic publishing outlets and authored by 1,395 scholars.
Research questions were developed through the lens of bibliometric theories, e.g., performance
evaluation, citation and co-citation analysis, keywords analytics, and bibliographic coupling, to
investigate the most influential papers, scientific publication outlets, authors, emerging trends,
and affiliated institutions related to fintech regulation. This work primarily employed R Studio
and VOSviewer to analyse bibliographic data from the Scopus database. Of the findings,
the most influential source for fintech regulation was Sustainability (Switzerland), the most
influential author was Douglas W. Arner (Professor at the University of Hong Kong), and
the foremost institution was the University of Cambridge. Furthermore, qualitative inductive
analysis was performed to address timely issues from the bibliometric findings. The issues
identified were fintech and banking regulation, the implications of money laundering for
financial regulators, the impact of central bank digital currency (CBDC) on financial inclusion
and stability, and the challenges posed by cloud technology for fintech firms. Employing
quantitative bibliometric analysis and qualitative inductive reasoning offers critical novelty in
evaluating academic debates on fintech regulation, providing practical implications for the
regulators, academia, and industry professionals.
Keywords: bibliometric analysis, cbdc, fintech regulation, machine learning, money laundering

I. INTRODUCTION
There has been substantial growth in the financial technology (fintech) sector,
resulting in a rapid digital transformation of the financial services industry.
Fintech has revolutionised the traditional financial industry, offering a wide
range of advanced financial solutions, e.g., mobile payments, blockchain,
robo-advisors, and peer-to-peer lending.1 There are around 32,000 fintech
1

Eskasari Putri et al., “E-Finance Transformation: A Study of M-Wallet Adoption in Indonesia,” Jurnal
Ekonomi Pembangunan: Kajian Masalah Ekonomi dan Pembangunan 23, no. 1 (2022): 123–34.

## Page 2

360

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

companies2 worldwide, which have significantly shaped the global economic
landscape. The global fintech sector has attracted over USD500 billion in
funding and reached a USD1.3 trillion valuation in 2021, representing 9% of
global financial services.3
In 2022, the World Bank used cross-sectional data from around 180
countries,4 investigating the relationship between fintech’s business activities
and infrastructure, financial development, and policy environment. This data
identified fintech activity indicators, including fintech firm creation and growth,
usage of digital forms of common financial services and mobile distribution
channels.5 The findings were varied, evincing a positive correlation between
fintech activity and infrastructure, and mixed relationship between financial
development, and policy implications.6 In particular, a positive relationship
between a regulatory framework and a high level of fintech activity was found
even though not all sampled countries with effective regulations experienced a
significant fintech growth.7 Such findings imply that an effective and efficient
legal framework in the fintech industry is key to developing the fintech sector.
However, financial regulators have faced difficulties keeping pace with the
swift technological developments, causing serious problems in the financial
industry, such as using deepfake technology in financial services.8
While the definition of fintech varies among practitioners, politicians, and
scientists,9 fintech regulations are implemented variably across countries. In
recent practice, fintech regulation may be understood by the governing laws,
including anti-money laundering (AML), data privacy protection, and know
your customer (KYC), to dictate the innovation of financial technology in
financial industries. This legal framework is commonly associated with
regulatory technology (regtech) and supervisory technology (suptech).10 The
recent practice of a regulatory sandbox was initiated by the United Kingdom’s
Financial Conduct Authority (FCA) in 2014, followed by financial regulators
in other countries, including Indonesia’s Financial Authority (OJK) in 2018.
Boston Consulting Group (BCG) and QED Investors, “Global Fintech 2023: Reimagining the Future
of Finance,” 2023, https://www.bcg.com/publications/2023/future-of-fintech-and-banking.
3
Boston Consulting Group (BCG) and QED Investors.
4
The World Bank, “Global Patterns of Fintech Activity and Enabling Factors,” 2022, https://www.
worldbank.org/en/publication/fintech-and-the-future-of-finance.
5
The World Bank, “Global Patterns.”
6
The World Bank, “Global Patterns.”
7
The World Bank, “Global Patterns.”
8
Indra Jaya Gunawan and Sylvia Janisriwati, “Legal Analysis on the Use of Deepfake Technology:
Threats to Indonesian Banking Institutions,” Law and Justice 8, no. 2 (2023): 192–210.
9
Ramona Rupeika-Apoga and Eleftherios I Thalassinos, “Ideas for a Regulatory Definition of FinTech,”
International Journal of Economics and Business Administration 8, no. 2 (2020): 136 – 154.
10
Faturrahman Fachsandy, “Regulatory and Supervisory Technology Research: A Bibliometric Analysis,”
Journal of Central Banking Law and Institutions 4, no. 1 (2025): 181–202.
2

## Page 3

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

361

Against the dynamics in legal practices of fintech regulations, what are the
critical issues in fintech regulation, and what are the recent developments in
scholarly debate on fintech regulation? Despite the increase in fintech research,
the primary emphasis has been on fundamental aspects that didn’t sufficiently
address these questions. The current body of literature has primarily focused
on foundational works, e.g., fintech innovation assessment,11 analysis of
historical perspective on fintech ecosystem,12 and a comprehensive literature
review on fintech, among others. The current literature has not adequately
investigated key issues regarding the development and evaluation of fintech
regulation as discussed in academic works.
This study assesses the current literature on fintech regulation to
understand the recent development in theoretical and practical contexts. In
doing so, a bibliometric analysis, also called a scientometric study, i.e., a kind
of data analytics method to evaluate scholarly publications,13 is employed. The
bibliometric data is harvested from the Scopus database with machine learning
tools such as RStudio and VOSviewer and is used for semi-supervised machine
learning analytics. Furthermore, qualitative human intelligence is examined to
draw practical implications. This paper offers a novel approach to evaluating
fintech regulation development in scholarly debate, offering practical relevance
for financial services professionals and regulatory authorities.
The remaining part of this paper is as follows. The next section is the
literature review, identifying the state-of-the-art academic works on fintech for
further research gap identification, and elaborating the theories that ground the
bibliometric analysis for developing research questions that this work addresses.
This section is followed by an explanation of the methodology, presenting
the scholarly approaches to answer the research questions. The results and
discussion sections follow this. Finally, the paper presents conclusions and
recommendations, generating implications for the findings of this study.
II. LITERATURE REVIEW
Fintech leverages novel technology to enhance financial services, denoted by
various terms, including algorithmic trading, the internet of things (IoT), and
Peter Gomber et al., “On the Fintech Revolution: Interpreting the Forces of Innovation, Disruption,
and Transformation in Financial Services,” Journal of Management Information Systems 35, no. 1 (2018):
220 – 265.
12
In Lee and Yong Jae Shin, “Fintech: Ecosystem, Business Models, Investment Decisions, and
Challenges,” Business Horizons 61, no. 1 (2018): 35–46.
13
M. Kabir Hassan et al., “Evaluating Indonesian Islamic Banking Scholarly Publications: A Data
Analytics,” Journal of Islamic Monetary Economics and Finance 8, no. 3 (2022).
11

## Page 4

362

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

internet finance,14 among others, that have laid the groundwork for financial
inclusion and sustainable development, but which have also had adverse
consequences, such as funding terrorism and money laundering.15 Following
the 2008 financial crisis, the number of fintech start-ups (e.g., peer-to-peer
(P2P) lending) has increased.16 The recent fifth industrial revolution has
transformed global fintech practices, with cutting-edge technologies, including
blockchain, intelligent machines, and others, yielding a significant impact on
the industry.17 The installation of the telegraph in 1838 and the construction
of the transatlantic cable in 186618 marked the start of the internet in the early
1990s, which were historically associated with the origins of fintech.19
Fintech research has grown, with influential works primarily addressing
fundamental issues. These issues include the impact of fintech on traditional
financial services and exploring how fintech has changed operational
management in financial services.20 Other works have discussed fintech
adaptation in the conventional banking system, elaborating the fintech
ecosystem, its business models, types of investments, and the challenges
faced by both fintech firms and traditional financial institutions.21 Such works
have also linked fintech with digital finance, offering evidence for promoting
financial inclusivity and stability. In addition, a previous study has investigated
shadow banking in fintech development, providing empirical evidence of the
varying impact of regulatory frameworks and technology on such shadow
banking growth.22
Nevertheless, academic publications have not covered the development
of fintech regulation, especially in the context of bibliometric analysis.
Bibliometric study is important as it allows numerical evaluation of academic
literature, discovering specific directions, patterns, and areas of a particular
Fahmi Ali Hudaefi, “How Does Islamic Fintech Promote the SDGs? Qualitative Evidence from
Indonesia,” Qualitative Research in Financial Markets 12, no. 4 (2020): 353–66.
15
Jamal Wiwoho et al., “Financial Crime in Digital Payments,” Journal of Central Banking Law and Institutions
1, no. 1 (2022): 47–70.
16
Fahmi Ali Hudaefi et al., “Exploring the Development of Islamic Fintech Ecosystem in Indonesia: A
Text Analytics,” Qualitative Research in Financial Markets 15, no. 3 (2023): 514–33.
17
Wulan Fitriana and Maiza Dea Nuraini, “Juridical Analysis of Legal Updates on Crypto Assets in
Indonesia (Comparative Study of Indonesian Law with Singapore and Islamic Law Views),” Journal of
Transcendental Law 5, no. 1 (2023): 55–72.
18
Bernardo Nicoletti, The Future of FinTech: Integrating Finance and Technology in Financial Services (Palgrave
McMillan, 2017).
19
Douglas W. Arner et al., “The Evolution of Fintech: A New Post-Crisis Paradigm?,” University of Hong
Kong Faculty of Law Research Paper (2015).
20
Gomber et al., “Fintech Revolution.”
21
Lee and Shin, “Fintech: Ecosystem.”
22
Greg Buchak et al., “Fintech, Regulatory Arbitrage, and the Rise of Shadow Banks,” Journal of Financial
Economics 130, no. 3 (2018): 453 – 483.
14

## Page 5

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

363

research topic or academic publishing outlet.23 This paper aims to fill this
particular gap in the fintech literature.
II.A. Bibliometric Study of Fintech
Evaluating scientific publications may be categorised into three main streams:
systematic literature review (SLR), meta-analysis, and bibliometric analysis.24
SLR is a qualitative method to analyse a small number of publications, while
meta-analysis summarises empirical evidence and discovers unexplored
relationships from publication data.25 A bibliometric study, also called a
scientometric study,26 takes a data-driven approach to big data analytics,
analysing large publication data, often using machine learning tools.
There has been significant growth in fintech research evaluation using
bibliometric analysis. Those studies have predominantly harvested data from
Scopus and Web of Sciences (WoS) databases, covering several topics, including
the development of fintech research with specific periods of publication,27
and various subtopics, e.g., customer due diligence,28 digital finance,29 societal
and environmental issues, and financing small and medium-sized enterprises
(SMEs),30 among others. However, no bibliometric analysis of fintech
regulation was found, leading this study to address this knowledge gap.
II.B. Theories and Research Questions
Probabilistic theory is the foundation for bibliometric analysis, assuming
success generates success.31 This theory in academic literature implies that an
article containing many citations has a greater chance of being cited again,

Hassan et al, “Indonesian Islamic Banking.”
Naveen Donthu et al., “How to Conduct a Bibliometric Analysis: An Overview and Guidelines,”
Journal of Business Research 133 (2021): 285–96.
25
Hassan et al., “Indonesian Islamic Banking.”
26
Egi Arvian Firmansyah et al., “A Scientometric Study on Management Literature in Southeast Asia,”
Journal of Risk and Financial Management 15, no. 11 (2022).
27
Bo Li and Zeshui Xu, “Insights into Financial Technology (FinTech): A Bibliometric and Visual
Study,” Financial Innovation 7, no. 1 (2021); Mohammad Sahabuddin et al., “The Evolution of FinTech
in Scientific Research: A Bibliometric Analysis,” Sustainability (Switzerland) 15, no. 9 (2023).
28
William Gaviyau and Athenia Bongani Sibindi, “Customer Due Diligence in the FinTech Era: A
Bibliometric Analysis,” Risks 11, no. 1 (2023).
29
Said Khalfa Mokhtar Brika, “A Bibliometric Analysis of Fintech Trends and Digital Finance,” Frontiers
in Environmental Science 9 (2022); Zongsen Zou et al., “Insight into Digital Finance and Fintech: A
Bibliometric and Content Analysis,” Technology in Society 73 (2023).
30
Bahati Sanga and Meshach Aziakpono, “FinTech and SMEs Financing: A Systematic Literature
Review and Bibliometric Analysis,” Digital Business 3, no. 2 (2023).
31
Derek De Solla Price, “A General Theory of Bibliometric and Other Cumulative Advantage Processes,”
Journal of the American Society for Information Science 27, no. 5 (1976): 292–306.
23
24

## Page 6

364

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

unlike a manuscript with fewer citations.32 This theory also applies to the
authorship, where authors with many citations are likelier to engage in frequent
publication than those with a small number of publication records.
The probabilistic theory is grounded in citation frequency analysis,
including examining Lotka’s law (Named after Alfred J. Lotka), which refers
to quantifying author publication frequency within a specific academic
discipline,33 and Bradford’s law.34 This study adopts bibliometric methods for
performance and science mapping analyses,35 examining the topic of fintech
regulation from the Scopus database. Specifically, science mapping analyses
cover citation and co-citation analyses, bibliographic coupling, co-author, and
co-word analyses.36
II.B.1. Performance Evaluation
Performance analysis in a bibliometric study evaluates research contributions
to knowledge areas using academic evaluation metrics, e.g., citation count,
publication count, and the ratio of citations to publications.37 This analysis
focuses on the recent developments in a particular subject or academic
publication, examining the authors, institutions, countries, and other relevant
journals.38 Productivity and impact measures are commonly employed to assess
the performance of a scholarly journal, experts’ publications, or a particular
research topic.
The performance analysis in this study aims to address the first research
question (RQ1): How is the recent development of publications, authors, and their
citations related to fintech regulation?
II.B.2. Citations and Co-citations
Citation analysis is a statistical analysis that measures intellectual connection
through citations,39 and is critical to empirically identifying impactful articles,
Price, “General Theory.”
Miranda Lee Pao, “Lotka’s Law: A Testing Procedure,” Information Processing & Management 21, no. 4
(1985): 305–20.
34
Developed by Samuel C. Bradford. It defines an ongoing trend that predicts the exponential
diminishing returns when searching for references in scientific journals. See: G Alabi, “Bradford’s Law
and Its Application,” International Library Review 11, no. 1 (1979): 151–58.
35
Donthu et al., “How to Conduct a Bibliometric Analysis: An Overview and Guidelines.”
36
Hassan, Hudaefi, and Agung, “Evaluating Indonesian Islamic Banking Scholarly Publications: A Data
Analytics.”
37
Muhamad Subhi Apriantoro, Dartim, and Ninik Andriyani, “Bibliometric Analysis of Carbon Capture
and Storage (CCS) Research: Evolution, Impact, and Future Directions,” Challenges in Sustainability 12,
no. 2 (2024): 152 – 162.
38
Vanneza Diva Ariona et al., “Charting the Course of Islamic Education Management Research: A
Comprehensive Bibliometric Analysis for Future Inquiry,” Munaddhomah 4, no. 4 (2023): 950 – 963.
39
P. Wouters and L. Leydesdorff, “Has Price’s Dream Come True: Is Scientometrics a Hard Science?,”
Scientometrics 31, no. 2 (1994): 193–222.
32
33

## Page 7

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

365

journals, or individuals.40 Meanwhile, co-citation is based on the assumption
that frequently referenced publications share a common theme in a research
area. Citation and co-citation analysis investigate the joint occurrence of the
analysed objects in a research field, resulting in the emergence of domains
and specialities from a particular scholarly publication, a research topic, or an
individual expert.41
This study’s citation and co-citation analyses aim to answer the second
research question (RQ2): Which articles, authors, countries, and affiliations have the
most scholarly contributions to fintech regulation?
II.B.3. Co-word and Bibliographic Coupling
Co-word analysis examines the authors’ keywords in the dataset of a
bibliometric study.42 Bibliographic coupling categorises a reference element
shared by two articles as a unit of coupling that enables two classifications.43
This facilitates the examination of co-author associations between researchers
and journals citing similar references.44
In this work, co-word analyses and bibliographic coupling aim to address
the third research question (RQ3): What themes can be generated from the authors’
keywords, and how do their publications correlate based on their shared references?
III. METHODOLOGY
III.A. Harvested Data and Machine Learning Tools
In this study, the bibliographical data were harvested from the Scopus database.
The search query “fintech regulation” was applied to Scopus’s search feature,
including the fields for article titles, abstracts, and keywords. The preliminary
search on 5 January 2024 identified 707 documents, indicating an extensive
range of scholarly publications on the fintech regulation topic. This dataset
was further refined by restricting the time frame to include publications in or
before 2023 for accurate interpretation in year-to-year evaluation. Following
this process, the final dataset of 688 documents was generated for the analysis.

Muhamad Subhi Apriantoro and Sendy Septianozakia, “The Potential of Productive Waqf: Research
Stream and Future Direction,” Pakistan Journal of Life and Social Sciences 22, no. 1 (2024): 1291 – 1306.
41
Donthu et al., “How to Conduct a Bibliometric Analysis: An Overview and Guidelines.”
42
Fauzul Hanif Noor Athief et al., “Profit-Loss Sharing Principle in the Islamic Finance Industry:
Current Pattern and Future Direction,” International Journal of Advanced and Applied Sciences 11, no. 9
(2024): 23 – 35.
43
M. M. Kessler, “Bibliographic Coupling between Scientific Papers,” American Documentation 14, no. 1
(1963): 10–25.
44
Athief et al., “Profit-Loss Sharing Principle.”
40

## Page 8

366

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

The bibliometric analysis in this study was technically operated via
RStudio and VOSviewer. RStudio is a machine learning tool that requires a
programming language for statistical computing and graphical analysis. This
study used the bibliometric packages, bibliometrix and biblioshiny45, for the analysis.
Furthermore, VOSviewer46 was employed to generate graphical networks for
various bibliometric analyses, including co-occurrence, co-citations, and coauthorship analyses.
III.B. Data Overview
The final dataset includes 1,395 authors and 688 documents from 436
sources published from 2014 to 2023. Of the 688 documents, 56% (386)
were journal articles. The remaining documents included 17% book chapters
(120 documents), 14% conference papers (94 documents), 6% books (40
documents), reviews (39 documents), conference reviews (0.4%), editorials
(0.4%), and notes (0.4%). Research on fintech regulation has been increasing
for nearly a decade, as evidenced by the Scopus database, with an approximately
73% annual publication growth rate. Figure 1 visualises this important fact. The
green line represents the annual number of publications, analysed against the
average number of citations (orange line). Scopus has recorded a significant
increase in fintech regulation publications. In 2014, there was one publication
record, which skyrocketed to 154 documents in 2022. Fluctuating patterns
occurred in the citation trend, with significant growth from 2014 to 2017.
Furthermore, Figure 2 visualises substantial information from the dataset,
showing the relationship among impactful authors (middle) to their keywords
(right), and the publishing outlets (left). The greater the density of the flow,
the greater the contribution level. For instance, Arner DW has significantly
contributed to some prominent keywords, such as fintech, financial regulation,
and regtech. Arner DW’s scholarly works were mostly published in the
Handbook of Blockchain, Digital Finance, and Inclusion.

45
46

Aria and Cuccurullo, “Bibliometrix.”
van Eck and Waltman, “Software Survey: VOSviewer.”

## Page 9

367

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

Figure 1.
Annual Document Productions and Average Citations
180

6

5.71
154

5.1

160

119

120
100

2.78

68
1.82

3
2.13

54

1.97

1.86

40
20
0

2
0.9

1

0

2014

2015

7

10

2016

2017

Documents
2018

2019

5
4

2.71

80
60

138

137

140

MeanTCperYear
2020

2021

2022

2023

1
0

Source: Author’s analysis. Reproduced using Microsoft Excel.

Figure 2.
Sankey Graph of Sources, Authors, and Keywords
arner dw
perspectives in law, business and innovation

european business organization law review
asian journeal of law and society
handbook of blockchain, digital ﬁnance, and inclusion

journal of risk and ﬁnancial management
sustainability (switzerland)
journal of ﬁnancial crime

ﬁntech

buckley rp
huang rh

ﬁnancial regulation

li x
wójcik d
zetzsche da
fenwick m
huang y
gruin j
alam n
xu d
knaack p
barberis j
grassi l
li j
bao h
kharisma db
iju y
chiu ih-y

china
regulation
regtech
ﬁnancial inclusion
ﬁnancial technology
blockchain
cryptocurrency
ﬁnancial stability
bitcoin
ﬁnancial services
regulatory sandbox
artiﬁcial intellegence
innovation
big
data
banking
crowdfunding

Source: Author’s analysis. The Sankey chart above shows the ﬂows of values from one variable to other variables. The left side presents the value of the names
of sources, such as journals, the middle shows the authors' names, and the right side presents the keywords used by the authors in their publications.

IV. RESULTS
IV.A. Addressing RQ1: Impactful Academic Sources
Examining the publishing outlets is essential in the performance analysis of a
bibliometric study to discover the most influential academic sources, such as
books, conference proceedings, and others.47 In this study, the unit analysis for
47

Hassan et al., “Indonesian Islamic Banking.”

## Page 10

368

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

this investigation is the 436 academic publishing outlets in the dataset. Scientific
indicators (e.g., h-index, g-index, m-index, total citations (TC), and number of
publications (NP)) were used as the measure for impactful academic sources.48
Table 1 illustrates the results for the ten most influential sources on fintech
regulation. The impact measurement score for Sustainability (Switzerland) is
the highest (h-index 7, g-index 12, and m-index 1.17), followed by Technological
Forecasting and Social Change (h-index 6, g-index 6, and m-index 0.86) and
European Business Organisation Law Review (h-index 5, g-index 7, and m-index
0.71). Regarding the number of published articles, Lecture Notes in Networks and
Systems, Sustainability (Switzerland), and Journal of Risk and Financial Management
are the top three, with 13 and 12 articles, respectively. In terms of TC, the
Journal of Financial Economics is the leader (442 citations), followed by Electronic
Commerce Research and Applications (304 citations) and the Journal of Economics and
Business (231 citations).

48

Muhamad Subhi Apriantoro et al., “Shaping the Future of Environmental Economics: A Bibliometric
Review of Current Trends and Future Directions,” International Journal of Energy Economics and Policy 14,
no. 3 (2024): 549 – 559.

## Page 11

5

5

5

5

3

3

3

Handbook of Blockchain, Digital
Finance, and Inclusion

Journal of Financial Regulation and
Compliance

Journal of Risk and Financial
Management

ACM International Conference
Proceeding Series

Asian Journal of Law and Society

Electronic Commerce Research and
Applications
European Business Law Review

4

5

6

7

8

9

10

4

3

5

7

11

5

5

7

6

12

0.6

0.43

0.36

0.33

0.83

1

0.63

0.71

0.86

1.17

7
7

European Business Organization
Law Review
Contributions to Finance and
Accounting
Technological Forecasting and
Social Change
Financial Innovation

6

6

9

9

European Business Law Review

ACM International Conference
Proceeding Series

11

12

Journal of Risk and Financial
Management
Perspectives in Law, Business and
Innovation

12

13

Total

Sustainability (Switzerland)

Lecture Notes in Networks and
Systems

Sources

Number of Publications (NP)

Journal of Financial Regulation

154

169

194

International Review of Financial
Analysis
Journal of Corporate Finance

196

199
Sustainability (Switzerland)

Northwestern Journal of
International Law and Business

219

223

International Journal of
Environmental Research and Public
Health
Technological Forecasting and
Social Change

231

304

442

Total

Journal of Economics and Business

Electronic Commerce Research and
Applications

Journal of Financial Economics

Sources

Total Citations (TC)

Source: Author’s analysis. H-index identifies the number of publications (h) with at least h citations, e.g., an h-index of 10 means 10 papers with at least 10 citations each. G-index
extends h-index, considering highly cited papers with the largest number, where the top (g) papers have at least g² total citations. M-index considers the lengths of researchers’ careers
or journals’ publications, dividing the h-index by the years since the first publication.

3

6

Technological Forecasting and
Social Change
European Business Organization
Law Review

2

3

7

h-index g-index m-index

Sustainability (Switzerland)

Sources

Impact Measurements

1

No

Table 1.
Top 10 Academic Sources

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

369

## Page 12

370

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

IV.B. Addressing RQ1 and RQ2: Authorship and Co-authorship Analyses
Table 2 shows the top ten most influential authors (out of 1,395). The measures
used the impact metrics, including the number of publications (NP) and total
citations (TC). Arner DW (Arner, Douglas Wayne) is the most influential
author in terms of scholarly impact (h-index 6, g-index 7, m-index 0.462),
followed by Buckley RP (Ross P. Buckley) (h-index 5, g-index 5, m-index 0.6)
and NP (5 articles). Furthermore, Buchak G, Matvos G, Piskorski T, and Seru
A have a comparable number of the highest TC (442), making them the most
influential authors based on TC.
Furthermore, as shown in Table 2, the top 10 affiliations based on the
number of published articles range from 6 to 11. The University of Cambridge
emerges as the leading institution with 11 articles. Followed by Bina Nusantara
University, Chinese University of Hong Kong, Universitas Indonesia, and
Shanghai University, with 10, 9, 8, and 7 publications, respectively. Regarding
the corresponding authors’ nationalities, China, the United Kingdom, and
Indonesia stand out with 59, 40, and 32 articles, respectively.
In addition, Figure 3 illustrates authors’ collaboration, showing a high
level of author disconnects, implying little collaboration among the 1,395
authors in the dataset. This may indicate a lack of collaboration among
scholars researching fintech regulation. However, small co-authorship clusters
were identified, with the red cluster (Rabani, Mustafa Reza; Rupeika-Apoga,
Ramona) and the green cluster (Barberis, Janos, Arner, Douglas W, Zetzsche,
Dirk A.) being the most significant clusters in the dataset.

## Page 13

Buckley RP

Bao H

Huang RH

Wójcik D

Barberis J

Gruin J

Knaack P

Li J

Ozili PK

2

3

4

5

6

7

8

9

10

3

3

3

3

3

4

4

4

5

6

3

3

3

3

4

4

5

4

5

7

0.5

0.6

0.5

0.5

0.3

0.6

0.6

1

0.6

0.7

h-index g-index m-index

Source: Author’s analysis.

Arner DW

Author

1

No

Impact Measurements

Huang Y

Fenwick M

Zetzsche DA

Barberis J

Wójcik D

Bao H

Alam N

Huang RH

Buckley RP

Arner DW

4

4

4

4

4

4

5

5

5

7

Number of
Publication
Author
Total

Liao S-W

Barberis J
Anagnostopoulos I
Chong B

Buckley RP

Arner DW

Seru A

Piskorski T

Matvos G

Buchak G

Author

223

223

226

226

382

393

442

442

442

442

Total

Total Citation (TC)

Ahlia University
Lviv Polytechnic
National University
Qatar University
Universitas Sebelas
Maret

UCSI University

University of
Cambridge
Bina Nusantara
University
Chinese University
of Hong Kong
Universitas
Indonesia
Shanghai University

India
Hong Kong

6

Italy

Australia

Malaysia

Spain

USA

10

11

12

13

14

17

29

32

40

United
Kingdom
Indonesia

59

China

Top Country Based
on Publication
Country
Total

6

6

6

7

7

8

9

10

11

Top Affiliation based on
Publication
Affiliation
Total

Table 2.
Top 10 Authors, Affiliations and Countries

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

371

## Page 14

372

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

Figure 3.
Co-authorship Analysis
cumming, douglas j.

migliorelli, marco

kurniati, poni sukaesih
alam, naﬁs

dorﬂeitner, gregor

langenbucher, katja

gruin, julian

chiu, iris h-y

bao, haijun rupeika-apoga, ramona
rabbani, mustafa raza

zetzsche, dirk a.

sibindi, athenia bongani

ziegler, tania

arner, douglas w.
barberis, jànos

xu, donggen

khutorna, myroslava

madir, jellena

legowo, mercurius broto

huang, robin hui
truby, jon

chen, shou

murinde, victor
allen, hilary j.

fenwick, mark

ganderson, joseph

budi, indra

donald, david c.

taghizadeh-hesary, farhad

vives, xavier

borgogno, oscar
lui, alison

kharisma, dona budi

butler, tom

huang, yiping

ioannou, stefanos

pasiouras, fotios
razletovskala, viktoriya

pranoto

grassi, laura

Source: Author’s analysis.

IV.C. Addressing RQ1 and RQ2: Impactful Manuscripts and Citation
Analyses
The unit analysis of impactful manuscripts in this study included 688 articles
in the dataset. The indicators used were local citations (LC) (citations in the
dataset), global citations (GC) (citations in the Scopus database) and the most
frequently cited references.49 The manuscript “Fintech, Regulatory Arbitrage, and
the Rise of Shadow Banks”50 is the first influential article with 442 GCs and 41
LCs. In comparison, the manuscript “Fintech and Regtech: Impact on Regulators
and Banks”51 is the second most influential article with 226 GCs and 32 LCs.
Additionally, a reference titled “EU Digital Finance Strategy 3” is the most
influential locally cited reference with 38 TCs. Table 3 explains the top 10
manuscripts based on these impactful measurements.

Hassan et al., “Indonesian Islamic Banking.”
Buchak et al., “Fintech.”
51
Ioannis Anagnostopoulos, “Fintech and Regtech: Impact on Regulators and Banks,” Journal of
Economics and Business 100 (2018): 7–25.
49
50

## Page 15

373

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

Table 3.
Top 10 Manuscripts and References
No
1
2
3
4

Global Citations
Title
Fintech, regulatory
arbitrage, and the rise of
shadow banks
Fintech and regtech:
Impact on regulators and
banks
Fintechs: A literature
review and research
agenda
FinTech, RegTech, and
the reconceptualization
of financial regulation

Local Citation
Total
GC
442
226

Title
Fintech, regulatory
arbitrage, and the rise of
shadow banks
Fintech and regtech:
Impact on regulators and
banks

Most Cited References
Total
LC

TC

41

EU Digital Finance
Strategy 3

38

32

Transportation Research
Part B: Methodological

29

Bitcoin: A Peer-To-Peer
Electronic Cash System

23

214

Regulating fintech

12

199

Fintech and the
innovation trilemma

10

Digital Disruption in
Banking

8

5

Fintech and access to
finance

141

6

Future living framework:
Is blockchain the next
enabling network?

122

7

Decentralized finance

116

8

The impact of the
FinTech revolution on
the future of banking:
Opportunities and risks

107

Regulatory sandboxes

9

Investor Platform
Choice: Herding,
Platform Attributes, and
Regulations

89

Technology v
Technocracy: Fintech as a
Regulatory Challenge

6

10

Risk spillovers between
FinTech and traditional
financial institutions:
Evidence from the U.S.

87

Evolutionary Approaches
and the Construction
of Technology-Driven
Regulations

6

Catching up with
Indonesia’s fintech
industry
Success factors in Title
III equity crowdfunding
in the United States

Title

Fintech and Regtech:
Impact on Regulators and
Banks
Fintech, Regulatory
Arbitrage, and the Rise of
Shadow Banks

19
17

8

Regulatory Sandbox

16

7

Commission 2030 Digital
Compass

14

7

Fintech and Market
Structure in Financial
Services

13

The Emergence of
the Global Fintech
Market: Economic
and Technological
Determinants
On the Fintech
Revolution: Interpreting
the Forces of Innovation,
Disruption, and
Transformation in
Financial Services

13

12

Source: Author’s analysis.

Furthermore, Figure 4 illustrates how frequently the 688 documents have
cited each other in the dataset, demonstrating the influence of one manuscript
on others. The larger the nodes, the more frequently a manuscript is cited by
other articles in the dataset. Of the 688 documents, 101 papers were included
for the analysis. A threshold minimum number of five citations was set during

## Page 16

374

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

the analysis, resulting in 239 documents meeting the threshold. The largest
connection occurred among 101 documents, which was considered for further
analysis. There were 17 clusters identified with 144 connections, where the
most influential clusters are presented in red, orange, and pink. The red cluster
explains the significant influence of Buchak’s work on fintech and regulatory
arbitrage.52 The orange cluster describes Anagnostopoulos’ study on the impact
of fintech and regtech on regulators,53 while the pink cluster illustrates the
influence of Milian’s work on the fintech literature review.54 These influential
manuscripts have contributed significantly to developing the fintech regulation
topic in academic debates.
Figure 4.
Citation Analysis of Documents
barroso (2022)

tseng (2022)

bollaert (2021)

buchak (2018)

vives (2019a)

borgogno (2020)

muryanto (2022)

bayram (2022)

nastiti (2019)

anagnostopoulos (2018)

gruin (2020)

magnuson (2018)
susilowati (2022)

brummer (2019)

macchiavello (2018)

yáñez-valdés (2023)
truby (2020)
ibrahim (2022)

deng (2018)
alaassar (2023)
ringe (2020)

hua (2021)

muganyi (2022)

giaretta (2021)

murinde (2022)

ishak (2021)

rabbani (2020)

mamonov (2018)

xu (2023a)

gupta (2018)

milian (2019)

jiang (2018)

tsai (2017)

marsal-llacuna (2018)

suryono (2020)
suryono (2019)
buckley (2020) davis (2017)

Source: Author’s analysis.

IV.D. Addressing RQ3: Co-word Analysis of Authors’ Keywords
The unit analysis of keywords in this study covered 2,816 keywords (1,252
keywords plus 1,564 author keywords). Figure 5 illustrates the occurrences of
keywords that appear together in the dataset. There is a correlation between
the size of the nodes and the frequency of occurrence of the words in the
dataset. It demonstrates the interconnections among frequently used keywords.
Buchak et al., “Fintech, Regulatory Arbitrage, and the Rise of Shadow Banks.”
Anagnostopoulos, “Fintech and Regtech.”
54
Eduardo Z Milian et al., “Fintechs: A Literature Review and Research Agenda,” Electronic
Commerce Research and Applications 34 (2019): 100833, https://doi.org/https://doi.org/10.1016/j.
elerap.2019.100833.
52
53

## Page 17

375

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

Figure 5 shows “fintech” in the blue cluster, “regulation” in the blue turquoise
cluster, and “blockchain” and “cryptocurrency” in the red brick cluster, with
other significant keywords that appear at least five times in the dataset. The
occurrences of these keywords and their connections to other words explain
the significant terms about fintech regulation topics.
Figure 5.
Keywords Co-occurrences
islamic ﬁntech
systematic review

human

information systems

developing countries
ﬁnancial industry

equity crowdfunding

electronic money technology
environmental regulations crime

sustainability

risk assessment
ﬁnancial institution

ﬁnance

initial coin oﬀering

cryptocurrency
crowdfunding

data

technological development

regulatory compliance

innovation

investment
electronic commerce

ﬁnancial services

ﬁnancial markets
regulatory sandbox

ﬁnancial inclusion

sustainable ﬁnance

regtech

ﬁntech

ecosystems

systemic risk

ﬁnancial system
ﬁnancial market
digitization
bank

smart contracts

laws and legislation

natural resource

economics

blockchain technology

blockchain
regulation

investments

china

bitcoin

sandbox

banks

ﬁnancial regulation big data
ai

gdpr

open banking

artiﬁcial intelligence

regulatory sandboxes
credit scoring

Source: Author’s analysis.

Furthermore, thematic analysis is practical for generating themes from
the authors’ keywords into four important quadrants.55 Figure 6 depicts the
thematic map showcasing the dataset’s most frequently utilised keywords.
The terms that are grouped in the upper right quadrant, “fintech”, “finance”,
“blockchain”, among others, symbolise the main topics or ideas. The terms
in the lower right quadrant, “information systems” and “information use”,
are indicators of the core theme. The keywords in the lower left quadrant,
55

Massimo Aria et al., “Thematic Analysis as a New Culturomic Tool: The Social Media Coverage on
COVID-19 Pandemic in Italy,” Sustainability 14, no. 6 (2022), https://doi.org/10.3390/su14063643.

## Page 18

376

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

“article”, “internet”, and others, suggest emerging or declining themes. The
keywords clustered in the upper left quadrant, “evolutionary game models”
and “technology innovation”, indicate a highly specialised or niche theme.
These themes represent the current debates in fintech regulation.
Figure 6.
Thematic Map Analysis of Keywords

Source: Author’s analysis.

IV.E. Addressing RQ3: Bibliographic Coupling
Bibliographic coupling measures the similarity between documents based
on shared references, indicating common research interests and thematic
connections.56 The analysis unit for bibliographic coupling in this study
comprises 688 documents. This paper considered a normalised citation measure
for correcting the temporal bias in citation counts, ensuring that recently
published works are not disadvantaged compared to earlier manuscripts that
have received more citations. Theorists posit that an older manuscript will
likely receive more citations than a newer one. Normalised citation addresses

56

Ririn Riani and Nashr Akbar, “Mapping Central Bank Digital Currency Literature: Lessons for
Governments and Research,” Journal of Central Banking Law and Institutions 3, no. 2 (2024): 203–38.

## Page 19

377

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

this problem.57 Such a normalised citation method is critical to effectively
discover the significant and timely works on fintech regulation issues.
Figure 7 illustrates the bibliographic coupling of 194 documents (selected
from 688 documents), where larger nodes denote higher normalised citations. A
minimum threshold of five citations was set during the analysis (semi-supervised
machine learning), resulting in 239 documents meeting the threshold, with the
final largest connected manuscripts consisting of 194 papers for final analysis.
Cluster 1 (red) encompasses 54 manuscripts, focusing on influential regulatory
approaches to combat money laundering. Cluster 2 (green) comprises 48
papers, highlighting significant contributions to the fintech literature review.
Cluster 3 (blue) consists of 33 works, highlighting the impact of fintech on
the banking sector. Cluster 4 (yellow corn) includes 27 articles, underlining
impactful research on the facilitators of fintech innovation. Cluster 5 (purple)
encompasses 25 manuscripts, showing influential works on China’s fintech
development. Cluster 6 (blue turquoise) and cluster 7 (orange) consist of four
and three papers, respectively, with influential contributions on central bank
digital currency (CBDC) and regulatory issues in cloud technologies.
Figure 7.
Bibliographic Coupling
guttman-kenney (2023)
vives (2019a)
jiang (2018)

dashottar (2021)

a. basha (2021) bollaert (2021)

murinde (2022)

wibowo (2020)
lebichot (2021)

jun (2016)
giatetta (2021) cai (2022)

muganyi (2022)
chang (2016)

bayram (2022)

kharisma (2021)

bajunaied (2023)
milian (2019)
xu (2021)

brummer (2019)
vučinić (2020)
dupuis (2021)
cumming (2019) kapsis (2020)
truby (2020)

alaassar (2023)

marsal-llacuna (2018)
rosli (2023)

zhang (2022)

brown (2022)

ringe (2020)
leckenby (2021)

yang (2018) arner (2017a)

anifa (2022)
fenwick (2018b)
Source: Author’s analysis.
57

Nees Jan van Eck and Ludo Waltman, VOSviewer Manual, issued 2018, https://www.vosviewer.com/
documentation/Manual_VOSviewer_1.6.7.pdf.

## Page 20

378

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

V. DISCUSSION
Turning to the author’s inductive analysis, the key points that shape the debate
on fintech regulation in academic works, as in Figure 7, were the author’s
primary object of the analysis. The first issue is the relationship between fintech
development and banking regulations, and the implications for the financial
sector. A focal discussion is the impact of money laundering, exploring the
challenges it poses for financial regulators and the adaptive measures needed
to address this issue. Additionally, the emergence of central bank digital
currencies (CBDCs) and their potential impacts on financial inclusion and
stability are elaborated. Finally discussed is the transformative influence of
cloud technology, exploring its regulatory implications.
V.A. Fintech and Banking Regulations
Fintech and banking regulation are critical issues, as shown in a blue cluster
of Figure 7. The fintech revolution has changed the landscape of the banking
industry, demanding timely regulations for practical adaptation as new risks,
including cybersecurity risks, have emerged in times of fintech growth.58
The discussion has centred around an international regulatory framework
for fintech, critical to ensuring the financial system’s stability, facilitating the
efficient functioning of markets, protecting the interests of consumers, and
improving social and economic well-being.59 Policymakers should prioritise
protecting privacy and consumer interests as increasing digitalisation and
connectivity create more opportunities for criminals to exploit personal data
for illegal activities, e.g., deepfake technology in the financial market.60
V.B. Money Laundering and Implications for Financial Regulators
Money laundering emerged as a critical issue represented by the red cluster
in Figure 7. Regulatory conflict states that when stricter laws against money
laundering exist, financial criminals actively search for opportunities to launder
their illegal profits.61 In times of technological advancement, laundering huge
amounts of money without using cryptocurrencies and current conversion
methods is practicable.62 The recent practices of banking regulators around
the world in opening doors to exchanging cryptocurrencies for fiat currencies
Zahrashafa Mahardika et al., “Going Digital Rupiah: Some Considerations from Sovereignty and
Cybersecurity Perspectives,” Journal of Central Banking Law and Institutions 2, no. 1 (2023): 25–54.
59
Victor Murinde et al., “The Impact of the FinTech Revolution on the Future of Banking: Opportunities
and Risks,” International Review of Financial Analysis 81 (2022).
60
Gunawan and Janisriwati, “Deepfake Technology.”
61
Daniel Dupuis and Kimberly Gleason, “Money Laundering with Cryptocurrency: Open Doors and
the Regulatory Dialectic,” Journal of Financial Crime 28, no. 1 (January 1, 2020): 60–74.
62
Dupuis and Gleason “Money Laundering.”
58

## Page 21

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

379

used to launder money could harm both legal businesses, and thus, amending
currency laws is deemed critical.63 This draws practical implications for financial
regulators in mitigating money laundering practices.
The continuous cycles of innovation and development of digital assets and
exchanges are expected to mitigate the growing insensitivity of KYC/AML
(know your customer and anti-money laundering) regulations on digital trades.64
This further urges the tax law enforcement to address regulatory compliance,
data privacy, and financial transparency to implement the automatic exchange
of information (AEOI) procedures within CBDC frameworks.65 Nevertheless,
implementing regulatory supervision on cryptocurrencies and exchanges could
potentially result in heightened limitations on individual liberties.66
V.C. CBDC Implications for Financial Inclusion and Stability
Cluster 6 in Figure 7 (blue turquoise colour) identifies the critical issue of
CBDC implications for financial inclusion and stability. As cryptocurrency
and financial stability are closely interconnected, the lack of regulations in
this ecosystem poses significant risks to the financial system, demanding an
optimal CBDC design, particularly in emerging economies.67 This makes it
important to introduce regulations governing crypto assets in the financial
system to reduce those risks and increase transparency to maintain financial
stability. Disconnecting the banking sector from the cryptocurrency ecosystem
may reduce the potential for liquidity risks. Conventional wisdom suggests
that the best legal approach to govern digital currency would be via settlement
institutions and external clearing.68
Furthermore, CBDC, fintech, and cryptocurrency services can improve
financial inclusion by making formal accounts less reliant on paperwork.69 In
the future, financial inclusion is expected to focus on providing people with
important access to formal financial services because digital tokens, wallets,
and cloud storage are making traditional banks less relevant.70 The policy
Arman Nefi and Agus Sardjono, “The Urgent Need to Amend the Indonesian Law on Currencies to
Face the Digital Age,” Journal of Central Banking Law and Institutions 1, no. 1 (2022): 23–46.
64
Dupuis and Gleason, “Money Laundering.”
65
Ressita Ramadhani et al., “Comparative Analysis of CBDC and Tax Law Enforcement in Selected
Countries,” Journal of Central Banking Law and Institutions 4, no. 1 (2025): 141–80.
66
Dupuis and Gleason, “Money Laundering.”
67
Ferry Syarifuddin, “Optimal Central Bank Digital Currency Design for Emerging Economies,” Journal
of Central Banking Law and Institutions 3, no. 2 (2024): 361–92.
68
David K. Linnan, “Central Bank Digital Currencies in the Indonesian Setting: Questions & Choices,”
Journal of Central Banking Law and Institutions 2, no. 2 (2023): 221–64.
69
Peterson K. Ozili, “CBDC, Fintech and Cryptocurrency for Financial Inclusion and Financial
Stability,” Digital Policy, Regulation and Governance 25, no. 1 (January 1, 2023): 40–57.
70
Ozili, “CBDC, Fintech and Cryptocurrency.”
63

## Page 22

380

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

implication for financial regulators is in the shift from “banked” people to
people having “restricted, basic, or full access” to formal financial services.71
V.D. Cloud Technology and Implications for Fintech Firms
The notion of a ‘cloud dilemma’ was coined,72 becoming a critical work in
the orange cluster of Figure 7. A cloud dilemma explains the complexities
in harmonising outsourcing regulations and innovation with cross-border
policy. The primary obstacle lies in ensuring compliance, and IT managers
comprehensively understand an organisation’s outsourcing practices. Lack of
awareness within central IT or compliance departments regarding software
as a service (SaaS) partnership can pose a challenge, particularly due to the
extensive adoption of SaaS and mobile technologies.73
Such cases are relevant for firms utilising social networking, marketing, and
data analytics applications. Regulatory tensions may arise in data protection
regulations when participants within the cloud supply chain lack transparency.
Thus, companies need to understand their providers’ technical architectures,
assess cloud vendors’ reliability, and establish suitable systems and controls to
safeguard data privacy, prevent regulatory violations, and maintain sufficient
supervision.74 Management theory is practical for professionals when they face
cloud dilemmas. That is, the assessment of regulatory risk levels involved in
outsourcing and evaluating potential arrangements about their outsourcing
strategy, rules, controls, and risk tolerance is applicable to consider the
appropriate utilisation of cloud-based technologies.75
VI. CONCLUSIONS AND LIMITATIONS
This study has employed quantitative bibliometric analysis, followed by
qualitative inductive reasoning, to investigate the current state of fintech
regulation in academic debate using data from the Scopus database. Findings
from the bibliometric analysis identified the most influential manuscripts,
authors, academic publishing outlets, affiliations and countries, and critical
themes generated from keyword analytics. Meanwhile, findings from the
qualitative inductive analysis explained timely issues in fintech regulation,
including regulatory issues between fintech and banking, money laundering
and its consequences for financial regulators, CBDC’s impact on financial
inclusion and stability, and cloud technology challenges for fintech companies.
Ozili, “CBDC, Fintech and Cryptocurrency.”
Daniel Gozman and Leslie Willcocks, “The Emerging Cloud Dilemma: Balancing Innovation with
Cross-Border Privacy and Outsourcing Regulations,” Journal of Business Research 97 (2019): 235–56.
73
Gozman and Willcocks, “Emerging Cloud,”
74
Gozman and Willcocks, “Emerging Cloud.”
75
Gozman and Willcocks, “Emerging Cloud.”
71
72

## Page 23

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

381

The use of single bibliographical data (i.e., the Scopus database) limits the
findings of this study. Generating a dataset from multiple sources (e.g., adding
Web of Science (WoS) and other databases) may add other influential works on
fintech regulation which are not included in the Scopus dataset. The qualitative
analysis may be further enhanced using policy documents for an industrydriven approach to evaluating fintech regulation. Such policy documents are
publicly available but not included in academic databases. Thus, sampling such
policy documents may discover timely issues on fintech regulation that have
not been discussed in academic papers.
This study’s use of quantitative and qualitative analyses yielded a scholarly
evaluation of the fintech regulation discussed in academic works, providing
both practical and theoretical implications for regulators, academia, and
industry professionals. That is, the author’s qualitative findings may ground
future studies in fintech regulation, including regional differences in fintech
regulation and the role of artificial intelligence (AI) in regulatory compliance.
REFERENCES
Alabi, G. “Bradford’s Law and Its Application.” International Library Review
11, no. 1 (January 1, 1979): 151–58. https://doi.org/10.1016/00207837(79)90044-X.
Anagnostopoulos, Ioannis. “Fintech and Regtech: Impact on Regulators and
Banks.” Journal of Economics and Business 100 (2018): 7–25. https://doi.
org/10.1016/j.jeconbus.2018.07.003.
Apriantoro, Muhamad Subhi, Dartim, and Ninik Andriyani. “Bibliometric
Analysis of Carbon Capture and Storage (CCS) Research: Evolution,
Impact, and Future Directions.” Challenges in Sustainability 12, no. 2 (2024):
152 – 162. https://doi.org/10.56578/cis120205.
Apriantoro, Muhamad Subhi, Rizki Dwi Putra Rosadi, Arminda Cahya
Ramdhani, and Ninik Andriyani. “Shaping the Future of Environmental
Economics: A Bibliometric Review of Current Trends and Future
Directions.” International Journal of Energy Economics and Policy 14, no. 3
(2024): 549 – 559. https://doi.org/10.32479/ijeep.15502.
Apriantoro, Muhamad Subhi, and Sendy Septianozakia. “The Potential
of Productive Waqf: Research Stream and Future Direction.” Pakistan
Journal of Life and Social Sciences 22, no. 1 (2024): 1291 – 1306. https://doi.
org/10.57239/PJLSS-2024-22.1.0087.
Aria, Massimo, and Corrado Cuccurullo. “Bibliometrix: An R-Tool for
Comprehensive Science Mapping Analysis.” Journal of Informetrics 11, no. 4
(2017): 959–75. https://doi.org/10.1016/j.joi.2017.08.007.

## Page 24

382

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

Aria, Massimo, Corrado Cuccurullo, Luca D’Aniello, Michelangelo Misuraca,
and Maria Spano. “Thematic Analysis as a New Culturomic Tool: The
Social Media Coverage on COVID-19 Pandemic in Italy.” Sustainability 14,
no. 6 (2022). https://doi.org/10.3390/su14063643.
Ariona, Vanneza Diva, Nurul Latifatul Inayati, Muhamad Subhi Apriantoro,
Afief El Ashfahany, and Eka Anugerah Tjandra. “Charting the Course of
Islamic Education Management Research: A Comprehensive Bibliometric
Analysis for Future Inquiry.” Munaddhomah 4, no. 4 (2023): 950 – 963.
https://doi.org/10.31538/munaddhomah.v4i4.711.
Arner, Douglas W., Janos Nathan Barberis, and Ross P. Buckley. “The
Evolution of Fintech: A New Post-Crisis Paradigm?” University of Hong
Kong Faculty of Law Research Paper No. 2015/047, October 22, 2015. https://
doi.org/10.2139/ssrn.2676553.
Athief, Fauzul Hanif Noor, Dafa Anisa, Qoshid Al Hadi, and Azhar Alam.
“Profit-Loss Sharing Principle in the Islamic Finance Industry: Current
Pattern and Future Direction.” International Journal of Advanced and
Applied Sciences 11, no. 9 (2024): 23 – 35. https://doi.org/10.21833/
ijaas.2024.09.004.
Boston Consulting Group (BCG), and QED Investors. “Global Fintech
2023: Reimagining the Future of Finance,” 2023. https://www.bcg.com/
publications/2023/future-of-fintech-and-banking.
Brika, Said Khalfa Mokhtar. “A Bibliometric Analysis of Fintech Trends and
Digital Finance.” Frontiers in Environmental Science 9 (2022). https://doi.
org/10.3389/fenvs.2021.796495.
Buchak, Greg, Gregor Matvos, Tomasz Piskorski, and Amit Seru. “Fintech,
Regulatory Arbitrage, and the Rise of Shadow Banks.” Journal of Financial
Economics 130, no. 3 (2018): 453 – 483. https://doi.org/10.1016/j.
jfineco.2018.03.011.
Donthu, Naveen, Satish Kumar, Debmalya Mukherjee, Nitesh Pandey, and
Weng Marc Lim. “How to Conduct a Bibliometric Analysis: An Overview
and Guidelines.” Journal of Business Research 133 (2021): 285–96. https://
doi.org/https://doi.org/10.1016/j.jbusres.2021.04.070.
Dupuis, Daniel, and Kimberly Gleason. “Money Laundering with
Cryptocurrency: Open Doors and the Regulatory Dialectic.” Journal of
Financial Crime 28, no. 1 (2020): 60–74. https://doi.org/10.1108/JFC-062020-0113.
van Eck, Nees Jan, and Ludo Waltman. “Software Survey: VOSviewer, a
Computer Program for Bibliometric Mapping.” Scientometrics 84, no. 2
(2010): 523–38. https://doi.org/10.1007/s11192-009-0146-3.
van Eck, Nees Jan, and Ludo Waltman. VOSviewer Manual, issued 2018. https://
www.vosviewer.com/documentation/Manual_VOSviewer_1.6.7.pdf.

## Page 25

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

383

Fachsandy, Faturrahman. “Regulatory and Supervisory Technology Research:
A Bibliometric Analysis.” Journal of Central Banking Law and Institutions 4, no.
1 (2025): 181–202.
Firmansyah, Egi Arvian, Hairunnizam Wahid, Ardi Gunardi, and Fahmi Ali
Hudaefi. “A Scientometric Study on Management Literature in Southeast
Asia.” Journal of Risk and Financial Management 15, no. 11 (2022). https://
doi.org/10.3390/jrfm15110507.
Fitriana, Wulan, and Maiza Dea Nuraini. “Juridical Analysis of Legal Updates
on Crypto Assets in Indonesia (Comparative Study of Indonesian Law
with Singapore and Islamic Law Views).” Journal of Transcendental Law 5,
no. 1 (2023): 55–72.
Gaviyau, William, and Athenia Bongani Sibindi. “Customer Due Diligence in
the FinTech Era: A Bibliometric Analysis.” Risks 11, no. 1 (2023). https://
doi.org/10.3390/risks11010011.
Gomber, Peter, Robert J Kauffman, Chris Parker, and Bruce W Weber. “On
the Fintech Revolution: Interpreting the Forces of Innovation, Disruption,
and Transformation in Financial Services.” Journal of Management Information
Systems 35, no. 1 (2018): 220 – 265. https://doi.org/10.1080/07421222.20
18.1440766.
Gozman, Daniel, and Leslie Willcocks. “The Emerging Cloud Dilemma:
Balancing Innovation with Cross-Border Privacy and Outsourcing
Regulations.” Journal of Business Research 97 (2019): 235–56. https://doi.
org/https://doi.org/10.1016/j.jbusres.2018.06.006.
Gunawan, Indra Jaya, and Sylvia Janisriwati. “Legal Analysis on the Use of
Deepfake Technology: Threats to Indonesian Banking Institutions.” Law
and Justice 8, no. 2 (2023): 192–210.
Hassan, M. Kabir, Fahmi Ali Hudaefi, and Ahmad Agung. “Evaluating
Indonesian Islamic Banking Scholarly Publications: A Data Analytics.”
Journal of Islamic Monetary Economics and Finance 8, no. 3 (2022). https://doi.
org/https://doi.org/10.21098/jimf.v8i3.1560.
Hudaefi, Fahmi Ali. “How Does Islamic Fintech Promote the SDGs? Qualitative
Evidence from Indonesia.” Qualitative Research in Financial Markets 12, no. 4
(2020): 353–66. https://doi.org/10.1108/QRFM-05-2019-0058.
Hudaefi, Fahmi Ali, M Kabir Hassan, and Muhamad Abduh. “Exploring
the Development of Islamic Fintech Ecosystem in Indonesia: A Text
Analytics.” Qualitative Research in Financial Markets 15, no. 3 (2023): 514–33.
https://doi.org/10.1108/QRFM-04-2022-0058.
Kessler, M. M. “Bibliographic Coupling between Scientific Papers.” American
Documentation 14, no. 1 (1963): 10–25.

## Page 26

384

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

Lee, In, and Yong Jae Shin. “Fintech: Ecosystem, Business Models, Investment
Decisions, and Challenges.” Business Horizons 61, no. 1 (2018): 35–46.
https://doi.org/10.1016/j.bushor.2017.09.003.
Li, Bo, and Zeshui Xu. “Insights into Financial Technology (FinTech): A
Bibliometric and Visual Study.” Financial Innovation 7, no. 1 (2021). https://
doi.org/10.1186/s40854-021-00285-7.
Linnan, David K. “Central Bank Digital Currencies in the Indonesian Setting:
Questions & Choices.” Journal of Central Banking Law and Institutions 2, no.
2 (2023): 221–64.
Mahardika, Zahrashafa, Rizky Banyualam Permana, and Nadia Maulisa. “Going
Digital Rupiah: Some Considerations from Sovereignty and Cybersecurity
Perspectives.” Journal of Central Banking Law and Institutions 2, no. 1 (2023):
25–54.
Milian, Eduardo Z, Mauro de M Spinola, and Marly M de Carvalho.
“Fintechs: A Literature Review and Research Agenda.” Electronic Commerce
Research and Applications 34 (2019): 100833. https://doi.org/10.1016/j.
elerap.2019.100833.
Murinde, Victor, Efthymios Rizopoulos, and Markos Zachariadis. “The Impact
of the FinTech Revolution on the Future of Banking: Opportunities and
Risks.” International Review of Financial Analysis 81 (2022): 102103. https://
doi.org/10.1016/j.irfa.2022.102103.
Nefi, Arman, and Agus Sardjono. “The Urgent Need to Amend the Indonesian
Law on Currencies to Face the Digital Age.” Journal of Central Banking Law
and Institutions 1, no. 1 (2022): 23–46.
Nicoletti, Bernardo. The Future of FinTech: Integrating Finance and Technology in
Financial Services. Palgrave McMillan, 2017.
Ozili, Peterson K. “CBDC, Fintech and Cryptocurrency for Financial Inclusion
and Financial Stability.” Digital Policy, Regulation and Governance 25, no. 1
(2023): 40–57. https://doi.org/10.1108/DPRG-04-2022-0033.
Pao, Miranda Lee. “Lotka’s Law: A Testing Procedure.” Information Processing
& Management 21, no. 4 (1985): 305–20. https://doi.org/10.1016/03064573(85)90055-X.
Price, Derek De Solla. “A General Theory of Bibliometric and Other Cumulative
Advantage Processes.” Journal of the American Society for Information Science 27,
no. 5 (1976): 292–306. https://doi.org/10.1002/asi.4630270505.
Putri, Eskasari, Aflit Nuryulia Praswati, Nalal Muna, and Nelly Purnama Sari.
“E-Finance Transformation: A Study of M-Wallet Adoption in Indonesia.”
Jurnal Ekonomi Pembangunan: Kajian Masalah Ekonomi Dan Pembangunan 23,
no. 1 (2022): 123–34.

## Page 27

Fintech Regulation in Scholarly Debate: A Bibliometric Analysis

385

Ramadhani, Ressita, Zakka Farisy, and Dina Silvia Puteri. “Comparative
Analysis of CBDC and Tax Law Enforcement in Selected Countries.”
Journal of Central Banking Law and Institutions 4, no. 1 (2025): 141–80.
Riani, Ririn, and Nashr Akbar. “Mapping Central Bank Digital Currency
Literature: Lessons for Governments and Research.” Journal of Central
Banking Law and Institutions 3, no. 2 (2024): 203–38.
Rupeika-Apoga, Ramona, and Eleftherios I Thalassinos. “Ideas for a
Regulatory Definition of FinTech.” International Journal of Economics and
Business Administration 8, no. 2 (2020): 136 – 154. https://doi.org/10.35808/
ijeba/448.
Sahabuddin, Mohammad, Md. Nazmus Sakib, Md. Mahbubur Rahman,
Adamu Jibir, Mochammad Fahlevi, Mohammed Aljuaid, and Sandra
Grabowska. “The Evolution of FinTech in Scientific Research: A
Bibliometric Analysis.” Sustainability (Switzerland) 15, no. 9 (2023). https://
doi.org/10.3390/su15097176.
Sanga, Bahati, and Meshach Aziakpono. “FinTech and SMEs Financing: A
Systematic Literature Review and Bibliometric Analysis.” Digital Business 3,
no. 2 (2023). https://doi.org/10.1016/j.digbus.2023.100067.
Syarifuddin, Ferry. “Optimal Central Bank Digital Currency Design for
Emerging Economies.” Journal of Central Banking Law and Institutions 3, no.
2 (2024): 361–92.
The World Bank. “Global Patterns of Fintech Activity and Enabling Factors,”
2022.
https://www.worldbank.org/en/publication/fintech-and-thefuture-of-finance.
Wiwoho, Jamal, Dona Budi Kharisma, and Dwi Tjahja K Wardhono. “Financial
Crime in Digital Payments.” Journal of Central Banking Law and Institutions 1,
no. 1 (2022): 47–70.
Wouters, P., and L Leydesdorff. “Has Price’s Dream Come True: Is
Scientometrics a Hard Science?” Scientometrics 31, no. 2 (1994): 193–222.
https://doi.org/10.1007/BF02018560
Zou, Zongsen, Xindi Liu, Meng Wang, and Xinze Yang. “Insight into Digital
Finance and Fintech: A Bibliometric and Content Analysis.” Technology in
Society 73 (2023). https://doi.org/10.1016/j.techsoc.2023.102221.

## Page 28

386

Journal of Central Banking Law and Institutions, Volume 4, Number 2, 2025

This page is intentionally left blank
