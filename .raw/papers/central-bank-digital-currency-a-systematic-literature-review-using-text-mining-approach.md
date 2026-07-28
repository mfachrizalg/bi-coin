---
source_type: pdf
title: "Central bank digital currency: A systematic literature review using text mining approach"
original_file: "thesis/reference/Central bank digital currency: A systematic literature review using\ntext mining approach.pdf"
sha256: "ec1cfd1b5f1573b21fa966fc86025867c260b8ee04dd6fa6018eb25b37cceb3c"
page_count: 20
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: Central bank digital currency: A systematic literature review using text mining approach

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Research in International Business and Finance 64 (2023) 101889

Contents lists available at ScienceDirect

Research in International Business and Finance
journal homepage: www.elsevier.com/locate/ribaf

Central bank digital currency: A systematic literature review using
text mining approach
Yen Hai Hoang a, Vu Minh Ngo a, Ngoc Bich Vu b, *
a
b

University of Economics Ho Chi Minh City, School of Banking, 59C Nguyen Dinh Chieu Street, District 3, Ho Chi Minh City, Vietnam
Ho Chi Minh City Open University, School of Advanced Study, 97 Vo Van Tan Street, District 3, Ho Chi Minh City, Vietnam

A R T I C L E I N F O

A B S T R A C T

Keywords:
Central bank digital currency
CBDC
Literature review
Text mining
Frequency analysis
Topic modeling
Blockchain

Central bank digital currency (CBDC) is seen as a possible next step in the evolution of money,
offering a more stable unit of account, a more efficient medium of exchange, and a safer way to
store value. However, since it began to get significant attention from academics and practitioners
a few years ago, many concerns about how a central bank may build an efficient CBDC and how it
would impact a country’s current financial system still remain unanswered satisfactorily. Based
on the combination of text mining and systematic review methods, this work presents a thorough
literature assessment of 191 academic papers on CBDC in order to identify major research issues
and knowledge gaps that may be addressed in the future. We find seven primary research themes
linked to CBDC including (1) Central bank, (2) CBDC and other digital currency, (3) CBDC and
money markets, (4) CBDC and monetary policy, (5) CBDC design and technologies, (6) CBDC and
payment system, and (7) CBDC and financial stability and regulatory. The finding helps provide
both overall and in-depth views of the current state of research in digital fiat currency topics, as
well as drawing some important implications and suggestions on directions for the future
research.

1. Introduction
Undoubtedly, inspired by recent advances in technology-driven payment systems such as mobile payment systems, cryptocurrencies, and block-chain technologies, central banks worldwide recently explored the possibility of issuing digital forms of fiat
money called central bank digital currencies (CBDC). A central bank’s key tasks are to issue and manage the quantity of money, to
operate as a clearinghouse for the settlement of payments transactions, and to act as a lender of last resort. However, it might be
claimed that contemporary central banks have failed to prevent macroeconomic crises and, in fact, may have worsened poor outcomes
by promoting excessive risk-taking and moral hazard via unorthodox monetary instruments like quantitative easing and negative
interest rates. A thoughtfully designed CBDC can be a new means for central banks to satisfy numerous policy objectives, improve
economic efficiency and inclusivity, and serve as a platform for economic innovation (Choi et al., 2021).
CBDC is expected to offer a more stable unit of account, a more efficient medium of exchange, and a more secure store of value
(Murray, 2019), and it is seen as a possible next step in the development of money (Kiff et al., 2020; Wang et al., 2022). Numerous
academicians are interested in its application to the local economy (Erlando et al., 2020) or an open economy (Minesso et al., 2022)
supply-side monetary issues (Kirkby, 2018), boosting financial inclusion (Allen, Gu, and Jagtiani, 2022; Cullen, 2021), or facilitating
* Corresponding author.
E-mail addresses: yenhh@ueh.edu.vn (Y.H. Hoang), vunm@ueh.edu.vn (V.M. Ngo), ngoc.vb@ou.edu.vn (N. Bich Vu).
https://doi.org/10.1016/j.ribaf.2023.101889
Received 30 May 2022; Received in revised form 7 January 2023; Accepted 25 January 2023
Available online 2 February 2023
0275-5319/© 2023 Elsevier B.V. All rights reserved.

## Page 2

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

cross-border payments (Allen et al., 2020; Kochergin, 2021). Some investigate whether the implementation of CBDC might increase
the efficacy of fiat currency function by facilitating the direct transfer of central bank money to families and businesses (Arner et al.,
2020; Mäntymäki et al., 2020). Arner et al. (2020) propose that replacing cash with a CBDC that resembles cash may reduce the cost of
maintaining the physical currency supply and safeguard it against counterfeiting. Thus, it is considered that the social value of CBDC
lies in its capacity to transfer some of the anonymity of currency into the digital sphere or perhaps combine the characteristics of cash
and deposits (Adams et al., 2021; Pocher and Veneris, 2021).
Could a digital money system, especially the central bank digital currency (CBDC), be a viable replacement or complement for a
central bank’s conventional money issuance and circulation? This is one of the key research questions that are being extensively
explored by the central banks and academicians worldwide. In order to have a concrete foundation for a satisfactory answer to this
question, it is crucial to have a comprehensive understanding about this topic. Despite the fact that the number of CBDC’s studies have
grown significantly since 2020, the knowledge on this emerging topic is still in high demand due to more and more countries are
exploring CBDC and considering its use. There has been several studies providing solid literature review on this new field, however, our
study is the first one that employs an advanced method, i.e text-mining, to conduct a systematic review on a large database that can
outperform similar existing studies.
Specifically, we attempt to address the above question by systematically reviewing the literature on the topic related to CBDC using
the text mining approach. Using 191 abstracts of journals and conference articles on the Scopus database related to CBDC topics
collected until Feb 2022, we attempt to identify the most common CBDC themes explored among academicians using frequency
analysis of terms occurrences and topic modeling. We found that the topics involving CBDC has significantly changed over time since
2020. In addition, using network analysis and diagrams, we defined the relationships between terms and clusters of topics for further
analysis. In general, from the top most occurred terms in 191 abstracts, seven most common themes are discovered and in-depth
discussed in this study including (1) Central bank, (2) CBDC and other digital currency, (3) CBDC and money markets, (4) CBDC
and monetary policy, (5) CBDC design and technologies, (6) CBDC and payment system, and (7) CBDC and financial stability and
regulatory. From the systematic reviews, we also suggest a number of knowledge gaps and implications that could guide future
research directions on the CBDC topic.
The remaining sections of this study are structured as follows. Section two presents the research methods employed or the sys­
tematic review. In section three, we provide the result of the key outcomes of text mining, network analysis, and an in-depth review of
the main themes in CBDC topics. Finally, we conclude the paper in section four, following by our discussion and suggested
implications.
2. Methodology
Text-based information retrieval has been becoming a key aspect of more and more study fields in the analytics domain during the
last decade (Kushwaha et al., 2021). The fast and consistent rise of text-based content such as discourse on social media along with the
development and expansion of the Internet, has necessitated the creation of the text mining frameworks that can be used to a variety of
management domains. Numerous approaches have been developed to construct, query, and analyze various big data in terms of text.
These include descriptive analytics, such as reporting, dash-boarding, visualizations, and discovery analytics, which capture early
signals via text summarizations and feature extraction (Hashimoto et al., 2016) from discourses (i.e. sentiment, topics), as well as
predictive analytics (Nassirtoussi et al., 2014), which is primarily driven by a variety of econometric models to complex machine
learning algorithms (Yau et al., 2014; Valdez et al., 2018).
The text-mining approach has been becoming one of the popular approaches for systematic review in different academic disciplines
given their advantages compared to traditional methods (Hao et al., 2018; Älgå et al., 2020; Karami et al., 2020). There are a number of
studies that have explored the application of text mining for systematic literature review. For example, Zunic et al. (2020) employed
text mining to analyse the sentiment of systematic reviews in the field of health sciences. Similarly, Valdez et al. (2018) discussed and
suggested text mining algorithms to identify relationships between key concepts in systematic reviews related to the field of social
science.
For systematic review, it is crucial to minimize possible bias when identifying all relevant research themes. This requires reviewers
to meticulously and methodically scan papers for relevant research findings, which may be exceedingly resource-intensive and timeconsuming (O’Mara-Eves et al., 2015). Thus, text mining is an invaluable tool for systematic literature review, as it can help to quickly
and efficiently identify relevant papers from large datasets (Älgå et al., 2020). Text mining can also be used to extract key concepts
from the literature and to identify relationships between them. This can help to identify trends and patterns in the literature, and can
provide a more comprehensive understanding of the research topic. Furthermore, text mining can be used to analyse the sentiment of
the literature, allowing researchers to better understand the opinions of authors on the topic.
This section describes the steps of our research framework: data collection, frequency analysis, topic modeling, and topic analysis
using network diagrams.
2.1. Data collection
To get a better understanding of CBDC topics, we may utilize the primary contents of journal and conference papers to identify
trends, key topics, and practical concepts. The abstract of an article includes principle information that summarizes the article’s
content. Thus, in this paper, relevant abstracts of academic publications are used as inputs for text mining techniques.
Firstly, we have restricted our analysis only to Scopus databases for the current study and use the API provided by Elsevier to extract
2

## Page 3

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

Fig. 1. Wordcloud of the most frequent terms in the CBDC abstract.

data from the database (see https://github.com/ElsevierDev/elsapy). We determined the most relevant keyword as “central bank
digital currency” and used it as input for the API search using python code. As a result, we found about 350 relevant publications from
journals and conferences published from 1997 to February 2022. Next, using another round of processing, we extracted abstracts from
these publications from online publishing websites.
2.2. Inclusion and exclusion criteria
Establishing the inclusion and exclusion criteria is critical for ensuring that the data included in the systematic literature review are
relevant. First, we manually checked the raw data to identify any abstracts that were not entirely downloaded. This initial phase
eliminated ten papers without an abstract for text mining. Second, non-English-language publications were omitted from the current
investigation. Given that text is the most important input for analysis, translation from other languages to English might affect the
precision of text-mining. This phase ensures that the findings of text mining for topic modeling and network analysis are similar and
more accurate. This second round eliminated seventeen publications.
This analysis considered only scholarly articles that gave direct insight into CBDC-related topics. Therefore, a second round of
abstract reading is necessary to ensure that each abstract directly relates to CBDC. In the end, we remove more than 131 papers whose
abstracts do not meet this requirement. Cross-check was also used to ensure that at least two researchers examined each abstract prior
to its exclusion from the sample. Therefore, abstracts that solely cover digital currency, cryptocurrencies, or overly broad information

Fig. 2. number of CBDC publications over time.
3

## Page 4

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

Fig. 3. Topic modeling using LDA algorithm for papers’ abstracts over time.

4

## Page 5

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

on digital transformation trends or other irrelevant issues unrelated to Central banks and digital currency are disqualified. After
applying these exclusion criteria to around 350 papers, text mining algorithms were used to the remaining 191 abstracts.
2.3. Frequency analysis
Abstracts are unstructured textual material that must be decoded. They are published in a variety of fields. Text mining approaches
enable exploratory research for the purpose of identifying semantic trends (Das et al., 2027). To understand the overall picture, we
examined the frequency of the top thirty and one hundred most often used terms using a bar chart and a word cloud, respectively. A
word cloud visualizes the frequency of terms in a corpus by varying the size of the words – with a bigger size indicating a higher
frequency (Fig. 1).
From the word-cloud analysis, the most frequent terms in papers’ abstracts such as money, monetary policy, payment, technology,
blockchain, model, design, account, cash, develop, implement, country, etc. suggest some of the most prevalent topic discussed about
CBDC. These topics are also confirmed using the frequency analysis of bigrams (two-words term) over time in papers’ abstract in
Appendix 1. Some of the most frequent topics mentioned related to CBDC are digital money, monetary policy, private money,
distributed ledger, European central bank or electronic payment. The research themes in 2020 focused more on the payment system,
the risk of the current banking system, and the benefits for private sectors when CBDC is issued. Meanwhile, from 2021 to February
2022, the design (national or universal CBDC) and technology choices of CBDC (blockchain-based or account-based) are the focused
research themes, together with some early discussion on critical regulatory issues of CBDC.
The number of publications for each year is also presented to see the development of the research areas over time (Fig. 2). We could
see that the ideas of CBDC could be traced backed long time ago but until 2018, the research on CBDC seems to be not in the main
stream and mostly ignored. Since 2018, CBDC topic has started to get attention following the emergence of private digital currencies,
especially Bitcoin as the most prominent private cryptocurrency. From 2020 onward, the number of CBDC research has grown
exponentially as more and more countries are starting to explore CBDCs.
2.4. Topic modeling
Topic modeling, as one of the most common text mining approaches, is an efficient and methodical way to analyze thousands of
documents in a matter of minutes. Latent Dirichlet Allocation (LDA) is a legitimate and extensively used topic model based on sta­
tistical distributions (Mcauliffe and Blei, 2007). LDA presupposes that in a corpus represented by a bag-of-words, there is an inter­
change of words and documents. LDA finds semantically related terms that appear in many texts in a corpus. These word lists, or
"topics," are subsequently understood as meaningful "themes" by human intuition (Karami et al., 2018a).
LDA has been used on both long-length (e.g., abstracts) and short-length (e.g., tweets) corpora (?) for a variety of applications,
including health (Karami et al., 2018b; Webb et al., 2018), e-petitions (Hagen, 2018), opinion mining (Karami and Pendergraft, 2018),
investigation of social media strategy and transportation literature (Sun and Yin, 2017).
We regarded abstractions to be our documents, and the term “abstract” and “document” will be used interchangeably from now on.
LDA gives a probability to each set of words in relation to each of the topics, as well as a probability to each of the topics in relation to
each of the documents. In conclusion, LDA determines the association between topics and documents, P(T|D), and words and topics, P
(W|T). LDA produced the following results for n documents (abstracts), m words, and t topics: the probability of each of the words given
a subject, or P(Wi |Tk), and the likelihood of each of the topics given a document, or P(Tk|Dj). To represent the themes, the top words
from each topic in decreasing order of P(Wi|Tk) were selected. In this study, the topic modeling is executed with bi-grams (two-words
phrases), not the single word, to make sure that we get the maximum comprehension of the topic extracted.
2.5. Topic analysis using network diagram
Our primary goal is to comprehend how CBDC and related topics arise from existing literature. We employed an inductive tech­
nique (Kar & Dwivedi, 2020), which is generally used for theory creation. After summarizing key terms using topic modeling, we
attempted to understand the emerging themes deeply using a network diagram of the key terms (Kushwaha and Kar, 2020). These
network diagrams are essentially a grouping of key terms that co-occur with CBDC. The results of the networking exercise are shown in
figures in the results sections of the network analysis.
3. Result
3.1. Topic modeling
Fig. 3 presents the four most popular topics which are researched in academic articles in different timeframes, including from 1997
to February 2022, before 2020, in 2020, and after 2020. In each topic, there are the top 5 bi-grams shown which have the most likely to
be connected to each other and to the topic they are representing. Combining the results from topic modeling with a manual review, we
could understand the development of researched themes over time in the CBDC topic. In general, for the whole period of the inves­
tigation from 1998 to February 2022, the four most popular topics in articles’ abstracts are (1) blockchain-based CBDC, (2) European
CBDC and its effects on monetary policy and personal data, and (3) private digital currency and payment system, and (4) the definition
of CBDC as a sovereign digital currency.
5

## Page 6

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

Before 2020, the most frequent research themes about CBDC are (1) CBDC and fiat money for financial inclusion, (2) the definition
of CBDC, privacy issues and monetary policy, (3) CBDC impacts on fiat money and payment system, and (4) CBDC and other private
digital currency. In 2020, the research themes consisted of the main themes of (1) CBDC impacts on monetary policy and (2) tech­
nological design of CBDC and (3) impacts of CBDC on traditional banking systems. After 2020, the research themes are (1) national,
universal and cross-border CBDC, (2) CBDC regulatory issue, and (3) impacts of CBDC on traditional banking systems.
From the topic modeling analysis, we could see the development of topics of CBDC over time. Before 2020, studies on CBDC
revolved around the introduction of definition of CBDC, the motivation of central banks to issue CBDC (financial inclusion), and
relationship between CBDC and other digital currencies. Then, starting from 2020, it focused more on the technical sides and possible
impacts when CBDC is implemented on a country’s financial and banking systems such as changes in current payment system, the risk
of the current banking system, and the benefits for private sectors when CBDC is issued. Especially, from 2021 to February 2022, the
cross-border option for CBDC exchange between countries are the focused research themes, together with some discussion on critical
regulatory issues of CBDC.
In addition, using the CTM algorithm for topic modeling, we run a robustness test for the results of topic modeling (Abstract 2). The
CTM (Correlated Topic Model) algorithm is a type of topic modeling which uses probabilistic generative models to uncover latent
topics from text data. It is based on a Bayesian approach which allows for the incorporation of prior knowledge about the topics and the
relationships between them (Blei and Lafferty, 2007). This allows the algorithm to capture the correlations between topics and to
generate more interpretable results. The CTM algorithm has also been used in a variety of applications such as document clustering,
text summarization, and sentiment analysis. Results from Abstract 2 shows that CTM algorithm define very similar emerged topics
compared to the previous results with LDA algorithm confirming the results of essential topics discussed in papers’ abstracts.
3.2. Network diagrams
As a robustness test for the topic modeling, we extended our analysis by using network analysis and the modularity algorithm. Each
term plays the role of a node in the network, and the links show their connections to other terms. Based on the strength of the con­
nections between terms, the modularity algorithm determines how a network can be divided into different modules (also called groups,
clusters, or communities) (Blondel et al., 2008). Table 1 presents an overview of the statistics of the network.
In total, 101 modules or groups of terms can be formed using the modularity algorithm. Using different colors to represent each
module, Fig. 4 shows some of the largest modules with the most components in the network. The results of the network analysis
confirmed the main themes extracted from the topic modeling analysis. We discovered the seven most discussed themes that have
arisen in network diagram analysis. These seven themes are as follows: (1) central bank, (2) CBDC and other digital currency, (3) CBDC
and money markets, (4) CBDC and monetary policy, (5) CBDC design and technologies, (6) CBDC and payment system, and (7)
financial stability and regulatory.
The above themes are elaborated as follows:
3.3. Central banks
Fig. 5 shows networks of terms in the central bank theme related to CBDC. Number of central banks’ CBDC projects have been
mentioned in the literature including projects from China (Allen et al., 2022; Cheng, 2022; Shen and Hou, 2021; Li and Huang, 2021),
Sweeden (E-Krona) (Kochergin, 2021; Peebles, 2021; Dostov et al., 2021) or ECB (Wagner et al., 2021; Nabilou, 2020; Groß et al.,
2020). Among them, the most popular CBDC projects mentioned as the role models is the e-CYN projects and the digital Euro from ECB.
China’s central bank, for instance, aims to develop a digital version of the yuan based on a centralized CBDC mechanism. The Digital
Currency Electronic Payment (DC/EP) initiative seems to use blockchain technology in part. The Swedish central bank has initiated a
blockchain-based e-krona pilot program for the year 2020, with the second part of the project commencing in February 2021. The
European Central Bank, the Bank of Canada, and others have also accelerated their R&D agendas. The Bahamas became the first to
implement a blockchain-based CBDC in 2020 (PwC, 2021). Globally, according to a survey conducted by the Bank for International
Settlements (BIS) in 2021, 86% of central banks are actively investigating the potential for CBDC, 60% are experimenting with the
technology, and 14% are instituting trial programs (Boar and Wehrli, 2021; Soderberg et al., 2022). In addition, the PWC CBDC
worldwide score (PwC, 2021) indicates that CBDC is not a novel idea. Since 2014, more than sixty central banks have investigated the
Table 1
The statistics of the network.
Metric

Value

No.of nodes
No.of edges
Average degree
Average Weighted Degree
Network diameter
Average path length
Number of weakly connected components
Number of strongly connected components
Modularity

1323
2292
1.787
1.836
16
5.095
82
843
0.546

6

## Page 7

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

Fig. 4. All topics network diagram.

implications of CBDC.
According to Fig. 5, other topics mentioned regarding to this theme are CBDC purposes or incentives, constrains and challenges,
CBDC classifications or categories. In particular, regarding the central banks’ incentives and motivations to adopt CBDC, Kochergin
(2021) divided it into three groups. The first group consists of nations where the CBDC launch may be planned to boost national
demand for central bank money (Sweden, Norway, Singapore, etc.). The second group consists of nations that can afford to maintain
national currencies in international settlements (the United States and the European Union) or to extend the use of national currencies
at the international level (China). The third group includes nations where the use of digital currencies may be linked to the monetary
policy implementation and financial inclusion or to tackle the de-dollarization of the financial system (Uruguay, South Africa,
Cambodia, etc.).
Regarding the choice on types of CBDC projects to implement, most of the current projects has pursued retail CBDC models.
However, the number of wholesales CBDC projects is growing given their potential in international trading and payment sytemes in the
future (Arauz, 2021; Kochergin and Yangirova, 2019). Especially, the pilot phase of e-CNY since 2021 from the People’s Bank of China
has put many countries in a much more urgent situation to have their own CBDC infrastructures, given the importance of China in
world trade. After the initial success with the retail CBDC domestically, China is now conducting cross-border wholesale testing in
addition to its domestic usage. It has been collaborating with the Bank of International Settlements and Hong Kong, Thailand, and the
United Arab Emirates on the mBridge project to construct a prototype for an interoperable wholesale CBDC (BIS Innovation Hub Hong
Kong Centre, 2022). Given the current situation of cross-border CBDC, countries worldwide need to develop both retail and wholesale
CBDC infrastructures to match the new world trade requirements with CBDC as one of the means of payment in the foreseeable future
(Auer et al., 2020; Auer et al., 2021).
Emerging economies such as Southeast Asian countries have proven to be fast in their CBDC development and implementation.
Thailand and Malaysia’s CBDC projects have entered pilot phases. Cambodia officially launched its DLT-based CBDC in 2020 and has
been testing cross-border digital currency payment with Malaysia (PwC, 2021). However, ASEAN countries have very different ap­
proaches to CBDC designs. Thailand is adopting wholesale CBDC, while other ASEAN countries such as Cambodia, Malaysia, and
Vietnam are adopting retail CBDC. However, until CBDC projects aim to solve common issues such as more efficient payment systems
or financial inclusion, the differences could be easily reconciled in the future (Bank of Thailand, 2021). In Africa, the Central bank of
7

## Page 8

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

Fig. 5. Central bank network diagram.

Fig. 6. Digital currency network diagram.
8

## Page 9

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

Nigeria has also been quick in its CBDC adoption compared to other regions (Boar and Wehrli, 2021). Nevertheless, there is currently
no research about CBDC in this region, given the potentially huge benefit of CBDC for financial inclusion (Ozili, 2021) and economic
growth (Erlando et al., 2020).
Overall, it can be seen that the motivation to adopt CBDC for each country is different. It also appears that developing countries
tend to speed up more vigorously in terms of researching, testing, and implementation to obtain financial inclusion or cross-border
payments, while more advanced economies are motivated to introduce CBDC to enhance domestic payments efficiency as well as
financial stability. Therefore, it is likely that there would be no one-size-fits-all CBDC development (Georgieva, 2022). Each country
should have its own way of developing CBDC that is most suitable for its specific circumstances and requirements.
3.4. CDBC and other digital currencies
Fig. 6 shows networks of terms in the digital currency theme related to CBDC. The future of banking and finance can be potentially
impacted significantly by the emergence of digital currencies. Especially with the fast development of blockchain technology, the
financial world has evolved vigorously with both commercial banks and the central banks in many countries have expanded their
services in accordance with the new trends in financial technology (Fintech). The term digital currency is not an exhaust definition but
can be referred to the following terms: e-money, electronic money, network money, digital money, electronic currency, digital cash,
electronic cash, e-cash, mobile money, and, more recently, crypto-currencies (Berentsen, 2005; Fabris, 2019). Alternatively, digital
currencies can be categorized into private digital currency and public digital currencies (Gans and Halaburda, 2015). Regardless the
provision of a digital currency is provided by the public sector or by a private initiative, the implementation of such new instruments is
likely to provide a significant boost to the retail use of digital assets (Castrén et al., 2022).
It can be seen that the development of digital currencies encourage a cashless economy which can bring many socio-economic
benefits, such as providing convenient means of payment, lower transaction costs, or enhancing transparency in payments, hence,
mitigating money laundering and other crimes (Fabris, 2019). However, digital currency in the form of crypto-currency involving
blockchain technology has raised serious concerns due to the threat of easing criminal activities such as money laundering, human
trafficking, etc., tax evasion, and violation of capital controls. From the perspectives of governments and regulatory agencies such as
the central banks, the private digital currencies are similar to the foreign currencies supply, which cannot be controlled (Rahman,
2018). Another concern for the government is that due to the volatility in the prices of digital currencies, the price crash is possible
with further consequences for both the economic situation as well as the well-being of the private citizens.
Despite those concerns, private digital currencies appear to be increasing as payment instruments for end-users. In order to
maintain the effectiveness of monetary policies as well as reinforce financial stability, central banks have to develop strategies to tackle
this challenge. In the era when electronic devices and high-speed networks have become practically universal (Bordo and Levin, 2017)
and the role of cash is gradually abolished, many central banks around the globe are considering the possibility of establishing digital
currencies of their own, usually called Central Bank Digital Currency (CBDC) (Bech, Shimizu, & Wong, 2017). This new form of money
is issued digitally by the central bank and serves as legal tender meaning it would function like the fiat money with a fixed nominal
value and shall be valid as legal tender for transactions (Mancini-Griffoli et al., 2018). According to Nabilou (2020), issuing CBDC is the
main innovative non-regulatory action that central banks can take as a strategy to provide an alternative virtual currency, which could
aim at complementing, substituting, or otherwise exerting a competitive force on cryptocurrencies by leveraging on its price stability.
However, the introduction of CBDC can be risky for the economy in certain aspects. In particular, issuing CBDC may result in the

Fig. 7. Money market network diagram.
9

## Page 10

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

banking sector instability, especially in times of crises, where businesses and households might switch deposits from their commercial
bank accounts to their CBDC account with central banks, facilitating a bank run from bank deposits to the safe nest of the CBDC. As a
result, the capability to supply credit of banks would be substantially restricted. Weakening such a function from the banking industry
and granting the public direct access to the central bank balance sheet may potentially lead to the less efficient allocation of credit in
the economy due to the centralization of credit allocation under the control of central banks.
3.5. CBDC and money market
Fig. 7 shows networks of terms in the money market theme related to CBDC. The significance of money markets can be explained in
three aspects, which consist of the contribution to market efficiency and market discipline; the profound implication for financial
stability as well as financing conditions of businesses and individuals; and the central role as an initial link of monetary policy
transmission (Cœuré, 2012). Well-functioning money markets not only provide liquidity to other financial markets and support an
efficient payments system but also ensure an effective transmission of monetary policy across the financial system and to the real
economy (Aziz et al., 2022; Cœuré, 2012).
With its unique characteristics, CBDC can have important implications in money markets such as the substitution effects which
depend on the way CBDC is granted, which will affect different types of financial assets (Löber and Houben, 2018). For example, if
CBDC is provided to individuals and designed as a non-interest bearing and an instrument for retail payment, it might primarily replace
cash (as token-based CBDC) and commercial bank deposits (as account-based CBDC) (Löber and Houben, 2018). Meanwhile, a CBDC
that pays interest and is readily transferable can be viewed as an alternative to money market funds or other short-term investments
including treasury bills, reverse repurchase agreements, etc., and can be a liquid and credit risk-free asset facilitating final settlement.
As a consequence, people may convert some of their investments in the money market into CBDC, which could lead to further re­
demptions for money market funds and worsen market illiquidity during the time of financial stress - when investors tend to move cash
to less risky assets such as CBDC. Therefore, substitution effects will also be influenced by whether a CBDC is non-remunerated (as is
cash) or paying interest at a fixed or adjustable-rate and whether that rate might possibly move with the policy rate (Löber and
Houben, 2018). As a consequence, a CBDC attracting considerable demand as an investment or asset to hold may change the structure
and functioning of funding markets, affecting both financial and non-financial corporations, both issuers and borrowers in money
markets would face more challenges because a CBDC would be a substitution for such claims. Ultimately, those who issue claims
brought by the central bank to accommodate demand for CBDC would be in a more favorable position.
So far, there has been two strands of literature regarding the economic and financial implications of CBDC on money markets. On
the one hand, the introduction of CBDC can have positive implications for the financial system, of which the money market is an
important component. As the demand for cash weakens with time, issuing CBDC could help the sovereign money of countries maintain
its role in sustaining the public confidence in payments by providing the reference value for all forms of private money (Jamet et al.,
2022). A CBDC could also improve capital allocation by facilitating access to payments and reducing transaction costs (Assenmacher
et al., 2021; Keister and Sanches, 2021). Furthermore, CBDC’s presence can potentially enhance competition in banks’ funding
markets by reducing banks’ market power (Andolfatto, 2021; Chiu et al., 2019). Consequently, in contrast with common opinions that
CBDC can lead to the risk of bank disintermediation, some other research recently suggests that a CBDC can foster bank intermediation.
Specifically, an increase in its remuneration would force banks to raise the interest on their deposits, leading to higher CBDC and
deposit balances, hence, higher credit supply (Bindseil and Jablecki, 2013). As the use of cash declines, a CBDC provides an alternative
to deposits and a floor on rates, limiting banks’ monopoly profits and encouraging them to increase lending (Auer and Böhme, 2021).
On the other hand, experts have raised concerns about potential unintended consequences of a CBDC that can induce the outflows
of money market funds as mentioned above, which could be made worse in times of financial stress. In a more technical aspect, Saito
(2021) argued the role of CBDC, especially in the form of crypto-currency (CBCCs), potentially can have a significant impact on the
nominal pricing system, including the price level and the nominal rates of interest. Based on the analysis of the quantity theory of
money (QTM) and the fiscal theory of the price level (FTPL), the author shows that in a deflationary environment where bond interest
has already been close to zero, strong money demand for central banks currencies, as well as ordinary money demand, may quickly
disappear. From this study, there is concern that financial and economic crises could trigger the large-scale shift from private deposit
currencies to central bank currencies.
Within a similar research theme to Saito (2021), Jia (2020) implements a formal analysis to evaluate the macroeconomic impact of
negative interest rates on CBDC from the point of view of a neoclassical general equilibrium model with monetary aggregates. The
study shows that paying negative interest on CBDC motivates people to lower savings and increase consumption thanks to the sub­
stitution effect. In turn, a decrease in savings causes a drop in capital investment, hence lowering both output and real money balances
(Jia, 2020). However, solutions to mitigate the risks can be considered by central banks, including limiting the yield of CBDC relative to
other instruments or imposing limits on the amount of CBDC one can own as well as the speed at which a single party can accumulate it
(FitchRatings, 2022).
All in all, it can be seen that the introduction of CBDC can imply both positive and negative effects on the financial system of which
money markets are an integral part. The current literature suggests that regulatory agencies need to ensure the proper design, as well as
the supply of CBDC, would not lead to sudden changes or shocks for the money markets and the entire economy.
3.6. CBDC and monetary policy
Fig. 8 shows networks of terms in the monetary theme related to CBDC. The existing literature suggests two main views in regards
10

## Page 11

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

to the impact CBDC would have on monetary policy. The first group of opinions argues that the distortionary effects of CBDC on
financial stability might be mitigated through appropriate policies, and thus, it would not directly affect the macroeconomic system
and the monetary policy of the country (Nelson, 2018; Shirai, 2020). Therefore, digital currencies do not necessarily imply a risk to
monetary or financial stability (Li et al., 2014) because they are unlikely to replace fiat paper currencies, hence, pose minimal risks to
monetary policy (Nelson, 2018).
However, the second group of scholars argues that CBDC entails a potential change in the monetary policy and the macroeconomic
system (Bordo and Levin, 2017; Fiedler et al., 2019; Kim and Kwon, 2019; Kirkby, 2018; Meaning et al., 2018). One of the prominent
studies by Barrdear and Kumholf (2016) points out that the implementation of CBDC would bring considerable changes to the real
economy and the implementation of monetary policy. In particular, the authors argue the CBDC introduced through purchases of
government bonds will be likely to increase real GDP by 3% (Barrdear and Kumhof, 2016). Based on this finding, the authors further
suggest that one of the benefits that CBDC can bring is the gains in the effectiveness of the countercyclical monetary policy, particularly
if a sizeable share of shocks is to the demand or supply of money, given the substitutability between CBDC and bank deposits is low
(Barrdear and Kumhof, 2021). In line with this, Bordo and Levin (2017) advise that CBDC may lead to a deeper transformation of the
monetary system as consumers are predicted to prefer CBDC thanks to its roles as a costless medium of exchange, a store of value, and a
stable unit of account.
In further to this, it is important to examine the impact of CBDC on price stability and inflation control, which are the key goals of
monetary policy. Specifically, Meaning et al. (2018), with the assumption that the real value of CBDC can be held stable over time and
would eventually contribute to price stability, suggest that CBDC would have a significant impact on the monetary system due to its
influence on the monetary transmission mechanism (Meaning et al., 2018). Supporting this argument, Chen and Siklos (2022) show
that economic history can be a source of information to estimate the possible impact of CBDC on inflation as the introduction of CBDC
with the embed technology will raise the speed and frequency of cash-like transactions. However, the fashion in which CBDC can have
a potential impact on inflation might be hard to predict as it provides governments and central banks with new tools to intervene in
markets (Prasad, 2021). Ultimately, the impact of CBDC will be on a broad scale, including the relationship between governments and
central banks as well as the relationship between the central bank and the financial sector.
The impact of CBDC on monetary policy also largely depends on the system design for CBDC. For example, Davoodalhosseini

Fig. 8. Monetary policy network diagram.
11

## Page 12

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

(2021) describes a system that can implement the CBDC in which a debit card system is owned and monitored by the central bank,
although its operations can be outsourced to other third parties such as fintech companies provided their low operational costs. Each
individual can have an account with the central bank, which they can earn interest on top of utilizing these balances for buying
necessities and services. The author argues that with such a system, the implementation of monetary policy becomes more transparent
as it directly affects people’s decisions to carry balances rather than through the financial system (Davoodalhosseini, 2021). Addi­
tionally, with the varying aggregate supply of CBDC, it is most likely that CBDC would lead to more effective quantitative easing
(Meaning et al., 2018). A classic limitation of monetary policy that has received significant discussion in the existing literature is the
Zero Lower Bound constraint, i.e., where the interest rates are at zero, and when there is a need for lowering interest rates, the central
bank cannot go below zero interest rate (Nabilou, 2020). In this context, some scholars say that CBDC would allow central banks to
conduct a more effective monetary policy where CBDC would help central banks to impose charges on their digital currency, which
evades the limitation of Zero Lower Bound on the nominal interest rate (Bordo and Levin, 2017; Dow, 2019). Similarly, Goodfriend
(2016), Agarwal and Kimball (2015), Rogoff (2017), and Nabilou (2020) suggest that a CBDC could potentially make it easier to set a
negative rate on central bank money and thus alleviate the lower bound on interest rates.
Nevertheless, from another perspective, the difference in interest rates imposed on CBDC can lead to the switching behavior of
people between CBDC and bank deposits (Meaning et al., 2018). For instance, when a monetary policy contraction is implemented, an
increase in the rate paid on reserves would lead to an increase in rates paid on bank deposits and thus a decrease in the relative return
of CBDC (e-cash as an example). This would make CBDC less attractive to hold and lead to a substitution of CBDC into bank deposits.
On the contrary, a monetary policy expansion would have the opposite effect, making CBDC relatively more attractive and leading to a
substitution from deposits into CBDC. These flows in and out of an e-cash CBDC could potentially be a source of instability in the
banking sector (Gross and Schiller, 2021).
Overall, it seems that current literature so far tends to support the argument that CBDC will exert a certain impact on the
implementation of monetary policies and influence its transmission mechanism to the real economy. However, it’s important for policy
makers to be aware of several risks involved while adopting CBDC as one of the unconventional monetary policy tools.

Fig. 9. CBDC design and technologies network diagram.
12

## Page 13

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

3.7. CBDC design and technologies
Fig. 9 shows networks of terms in the CBDC design and technologies theme. Because, from the point of view of central banks, the
effectiveness of CBDC creation depends on its design from the beginning, a major part of the included studies focuses on the technical
characteristics of a hypothetical CBDC. For instance, a CBDC designed to provide a secure payments service could have a different core
purpose than one used as solely a mechanism of monetary policy operation (Shen and Hou, 2021) and should have a very different
technical core from one which is designed to combine monetary and payment functions at the same time (Agur et al., 2022).
The decision to opt for a specific design can depend on whether that design can be validated on the blockchain, i.e whether an
intermediary can verify the account holder’s identity, which lead to the debate between the choice of an account-based CBDC versus a
token-based CBDC. In particular, a token-based CBDC might extend some of the characteristics and functionality of cash for retail
transactions (Bhawana and Kumar, 2021; Han et al., 2021) and could be made readily accessible to the public (Adams et al., 2021).
Universal access to this CBDC might be gained by a digital signature, and privacy will be guaranteed by default (Bhawana and Kumar,
2021; Geva et al., 2021). The demand for cash plays a critical role in the attractiveness of CBDC and the choice of token-based CBDC or
account-based CBDC (Agur et al., 2022; Khiaonarong and Humphrey, 2019). In nations where the use of cash replacements (such as
cards, electronic money, and mobile phone payments) has reduced the need for physical cash, the demand for the central bank digital
currency will be low. In contrast, if there are few alternatives to cash, the demand for digital money should be higher. McLaughlin
(2021) stated that we are at the crossroad of choosing the future of money.
Given the high popularity of cash usage among the public in emerging countries, token-based CBDC is currently a more popular
choice for central banks worldwide (Atlantic Council, 2021) and also for academicians (Dashkevich et al., 2020). According to Atlantic
Council (2021), the number of central banks that decided to choose distributed ledger technology (DLT) for CBDC (18 central banks) is
more than three times the choices of the conventional centrally controlled database for CBDC (5 central banks). Table 1 summarizes
the contents of the selected 22 studies concerning the technological features of CBDC designs in this literature review. Among these
studies, there are 17 studies that pursue ideas of token-based CBDC with distributed ledger technology involved, and only one pursued
the idea of non-blockchain token-based alternatives (Geva et al., 2021).
Additionally, regarding the choice between the permission or permissionless blockchains architecture for CBDC, most studies
suggest the use of a permission blockchain over a permissionless one (Bhawana and Kumar, 2021; Cukierman, 2020; Sun et al., 2018;
Tian et al., 2019; Zhang and Huang, 2021). Current options for producing digital fiat currencies include RSCoin, Corda, and Quorum,
among others (citation). Based on Bitcoin RSCoin is specifically built for central banks. Bank of England and University College London
suggested RSCoin as a blockchain-based CBDC prototype system in 2016. It is one of the few public blockchain projects for CBDC till
now. In contrast, Corda and Quorum are permission distributed ledger technologies built, respectively, on Bitcoin and Ethereum
(Zhang and Huang, 2021). These projects’ primary application scenarios are intrabank payments, interbank payments, cross-border
payments, and settlements. Recent studies are also concerned about the ability of interoperability between different blockchains
(cross-chain) for cross-border transactions, which is most likely being one of the most crucial functions for digital money in the future
(Han et al., 2021; Lee et al., 2021).
However, blockchain-based CBDC also has problems such as efficiency, scalability, and cross-chain interoperability (Dashkevich
et al., 2020; Zhang and Huang, 2021). Therefore, account-based CBDC is also a viable option in the future of digital money. A CBDC
based on an account might be used by transferring claims registered on the account (Geva et al., 2021; McLaughlin, 2021). As CBDC
can be a substitute for cash, especially in the context ofdepleted physical cash, it can helpreduce the costs associated with maintaining a
cash-based economy (Bordo and Levin, 2017). These measures would deter tax evasion, money laundering, and other illegal activities
(Arner et al., 2020; Pocher and Veneris, 2021). Furthermore, it is seriously considered by central banks (Arner et al., 2020; Murray,
2019) as it may provide a more trustworthy real-time window on economic activity to exert impact on monetary policy (Geva et al.,
2021; Naheem, 2019). Particularly, McLaughlin (2021) argued that even though the digital currencies without central issuers have
arisen as the potential future of money since 2008, the majority of real-world innovation in payments has occurred in the adoption of
electronic money wallets by hundreds of millions of individuals and the FinTech revolution.
Moreover, to balance the tradeoff between the privacy issue and anti-money laundering/anti-crime financing, researchers recently
have proposed different architectures for combining both token- and account-based CBDC together in one implementation framework
for central banks. For example, Bhawana and Kumar (2021) proposed the two-layered CBDC architecture in which the use of
permission blockchain is most suitable in the wholesale CBDC between the central bank and the commercial banks and the token-based
for end-users. Adams et al. (2021) also outlined a proposal for implementing CBDC based on open banking standards and supports both
account-based and token-based CBDC models, transacting online and offline with immediate finality, while considering the European
PSD2 requirements, including (multi-factor) strong customer authentication (SCA).
Overall, due to the advantages and disadvantages for both token-based and account-based CBDC, it is crucial for central banks to
have a proper design of CBDC that can balance different requirements across stakeholders such as privacy requirement for the users
and reasonable level of control over individual’s account to combat financial crimes. In order to increase the adoption of CBDC among
general public, it is suggested that significant benefits in the usage of CBDC such as ease of use, convenience, availability, and
credibility should be considered (Jabbar et al., 2022a, 2022b).
3.8. CBDC and payment system
Fig. 10 shows networks of terms in the payment system theme related to CBDC. Publications regarding CDBCs from 1997 to April
2020 pointed out that central bank holds monopoly power either establishing “traditional money” (i.e., Paper money) or digital
13

## Page 14

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

currency. Furthermore, the existence of another currency issued by central banks, i.e CBDC, can help facilitate a more diverse methods
of payments in the economy, question that remains is about the difference between CBDC and physical money payment systems.
Physical money system (paper currency and coin) is supplied from central banks into the economy through commercial banks and
other financial institutions, which are intermediary channels enforcing the monetary policies of central banks. Despite that, once
central banks establish their own digital currencies and accept them as digital legal tender, payment systems might change.
The existing literature shows that there are two payment systems widely mentioned, namely one-tire and two-tier systems. The
former is CDBCs accounts of a final user at central banks (Token-based system). It is similar to a physical money payment system in
which customers’ account balance at central banks is equivalent to reserve accounts, but registration is open to the public (Nabilou,
2019). With this system, customers can create digital wallets at central banks and use tokens to make transactions with other customers
who also have CBDC at central banks.
For the two-tier system, the first tier is among central banks, Commercial banks, and large Fintech companies (account- based
system). Depending on the choice of each country’s Central bank, the third party can either be commercial banks or both commercial
banks and Fintech companies. The second tier (token-based system) is where commercial banks and Fintech companies distribute
CBDC to users and organizations through their channels or users’ digital wallets (Buckley et al., 2021).
The token-based payment system based on blockchain technology might cause central banks to struggle with managing and
identifying money laundry, tax evasion, and terrorism funding. Furthermore, by making it widely available, central banks will be
overloaded and bear the risk of being hacked due to security flaws (Fantacci and Gobbi, 2021). Meanwhile, the account-based system
will reduce the pressure on the technological infrastructure system and the need for high-quality human resources that are capable of
applying highly complex central banks’ systems compared to directly using one-tier distribution systems from central banks to cus­
tomers. For example, the two-tier payment systems that China has been implementing also have advantages allowing commercial
banks and large Fintech can provide services more efficiently and effectively.
Regardless of the payment system chosen, it should be noted that CBDC is still centralized despite different scales. This is the
fundamental difference between CBDC and private digital systems (decentralized finance). With the account-based system of CBDC,
centralization is much higher (not much different from the distributing system of physical money). With a token-based system, the

Fig. 10. Payment system network diagram.
14

## Page 15

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

change in the supply of CBDC revolves around central banks, but transaction settlement of CBDC remains decentralized (Bech and
Garratt, 2017).
In developing countries, the launch of a centralized-finance payment system for CBDC will help more people with low income,
especially those in rural areas can access to banking services more effectively, thus, enhance financial inclusion. On the other hand, a
centralized finance system is only effective in the short term because once a country accepts crypto currencies as ledger currency,
central banks should switch to a semi-centralized model (Buckley et al., 2021).
The choice of a suitable payment system, however, depends on whether central banks would want to replace or provide an
additional means of cash entirely. It also depends on whether the CBDC holders as users or legal ones, or both (Söderberg, 2019).
Research has also shown that whatever choice is made on payment systems, CBDC can hardly replace physical money in international
transactions (Fantacci and Gobbi, 2021). Even China has only allowed payments using CBDC domestically yet internationally. To use
CBDC in international transactions, agreements must be met, and a committee managing policies and regulations among central banks
from different countries with other banking organizations (such as IMF, IFC) (Kuehnlenz et al., 2022a, 2022b) and multilateral or­
ganizations (such as WTO) must be formed (Fantacci and Gobbi, 2021). However, researchers have also pointed out that digital
currencies, either private (i.e., Libra) or public (CBDC), are being considered more of a payment method than physical money (Belke &
Beretta, 2020).
3.9. Regulation and financial stability
Fig. 11 shows networks of terms in the financial stability and regulatory theme related to CBDC. The trend of the private sector
issuing and circulating digital currency as a means of payment has presented a challenge to central banks to control money laundering
activities and illegal transactions. Attributing the responsibilities of financial institutions and the companies providing financial
services in controlling money laundering is also difficult. To solve the problem, central banks need to change to adapt to the situation in
the market. Besides the revolution in the mode of controlling monetary policies, central banks issuing their own digital currencies is a
way to control the flow of payment using digital currencies (Kovanen, 2019).
For the account-based payment system, commercial banks transfer the commercial bank’s deposit to CBDC accounts at the central

Fig. 11. Financial stability and regulatory network diagram.
15

## Page 16

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

banks. CBDC would become the resource of central banks and can be converted to physical money at a certain exchange rate (Fiedler
et al., 2019). This payment system would create instability in the financial system (Belke and Beretta, 2020). In case the commercial
banks want to improve liquidity, they need to restructure their assets (e.g., selling their receivables). Besides, when deposits are
transferred directly to CBDC accounts, central banks become both the monitoring agencies and the ones that mobilize capital
competing against the commercial banks. Therefore, it is difficult to separate the roles of supervising commercial banks and currency
trading (Belke and Beretta, 2020). Meanwhile, it is necessary to separate these roles of the central banks, even when the central banks
have their own digital currencies (Ovchinnikova and Kursevich, 2018).
Another issue that raises the concern of researchers is financial instability when using digital currencies, especially when using the
two-tier payment system. Using CBDC to lower the entry barriers to the industry providing financial services, many fintech companies
provide services similar to those of banks, with more advanced technologies. The borders separating financial institutions, markets,
and financial service providers are not clearly set. Recognizing digital currencies as a means of payment, central banks need to change
their control and supervising mechanisms of commercial banks, from the regulations for currency service providers to specific reg­
ulations on the activities of currency trading (Kovanen, 2019).
However, there are contrasting opinions about the impact of the two-tier payment system on the financial system and the regulation
of central banks. When the nonbank institutions can deposit as well as directly borrow CBDC from central banks, the deposits of banks
and non-banks can be considered as reserves at the central banks. The central banks would pay interest for the reserves. Therefore,
when lending interests on the market are lower than that of the central banks paying for the reserves, the financial intermediaries
would lower the lending volume to their customers. So, in order to regulate and control the supply of money, central banks can alterthe
interest rate of CBDC, hence, improve the effectiveness of interest rate tool as a tool for monetary policy. Besides, CBDC will provide a
new financial asset for central banks. The operating mechanism of CBDC is not credit and debit but the reserves (Habib et al., 2020).
The central banks can apply different interest rates to the volumes of reserves to achieve the desired volume (Bindseil, 2020). At
European central banks, they would suggest a reserve ceiling, and when the reserve balance is close to the ceiling, the interest rate is
high, and vice versa when the volume of the reserve is low, the interest rate is low, and even penalties are applied if the reserve is too
low compared to the ceiling. By doing so, central banks can establish a payment system for even the retail payment services while still
being able to encourage the significant institutions to maintain a high level of reserve. However, the interest rate for the reserve can be
low, but it should not be below zero percent, so the CBDC accounts can be a payment channel at the same time do not create a too big
flow of deposits from intermediaries to central banks. Thus, with regulating mechanism considering commercial banks and fintech
accounts at central banks as a reserve, central banks’ payment and adjustment of interest rates as per the balances of reserve accounts
would contribute to financial stability and improve their neutrality. With this mechanism, central banks can conduct their monetary
policies and can set the interest rates below zero percentif necessary (Cullen, 2021).
Another option is the approval of central banks for Fintech to open an account at the central banks and provide electronic wallet
services to the customers. Hence, the private sector can participate in the process of money trading at central banks. This payment
system improves market efficiency and decreases the monopolistic power of the big financial institutions and financial stability
(Cullen, 2021).
With the token-based payment system, central banks manage CBDC accounts of individual customers and institutions through the
electronic wallet. Commercial banks, financial institutions, and Fintech also use its infrastructure of payment technology to provide
services to retail and corporate clients. Therefore, the customers would have more options (European Banking Authority, 2018).
Besides, the token-based payment system, CBDC, instead of putting pressure on the financial system, would decrease the market power
of giant financial institutions, contributing to financial stability. This payment system can also decrease the pressure of huge electronic
accounts of clients at central banks and improve the neutrality of the central banks (Auer and Böhme, 2020). In order to ensure the
stability of the financial market, central banks of several countries (i.e., E.U.) have promulgated policies (e.g., digital finance strategy
in the E.U.) to make sure that the people can access the innovative financial products and ensure the safety for the users and stabilize
national finance (European Commission, 2020). However, if there is an incident where the people convert physical money to CBDC at
central banks or otherwise transfer CBDC at central banks to physical money in commercial banks at a huge volume, it would result in
financial instability (Belke and Beretta, 2020).
However, it is challenging to design an optimal model of payment system and similar legal regulations for commercial banks when
applying CBDC. The selection of the model depends on a country’s economic development and the development of its financial sys­
tems. In countries with better operation capabilities and advanced technological infrastructure to conduct a high volume of daily
transactions, it is more reasonable to apply a one-tier payment system and implement the regulations to effectively monitor this
payment system (Buckley et al., 2021). However, when CBDC utilizes a one-tier payment system, central banks would likely compete
against commercial banks and other intermediaries. Being both a regulator and transaction facilitator, the policies of central banks
would tend to lack neutrality. When improving the competition between central banks and commercial banks, central banks would not
completely play the role of the bank of banks; financial instability would be more likely if a certain bank cannot survive under the
pressure of competition. With the points mentioned above, a feasible model for central banks when using CBDC is the wholesale
payment system in which central banks issue CBDC to the commercial banks and fintech companies. Commercial banks and Fintech
companies then distribute CBDC to the customers through the network of the distribution system and their technologies (Buckley et al.,
2021).
3.10. Discussion, implications and knowledge gaps for further research
The move towards an economy with the presence of CBDC has gained momentum. Nearly a hundred countries are now researching,
16

## Page 17

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

testing, and distributing CBDC to the general public (Georgieva, 2022). For example, in China, the digital China Yuan (e-CNY) has
reached a hundred million individual users with the value of billions of yuan in transactions. In the U.S, President Biden signed the
Executive Order that directs the U.S. Government to assess the technological infrastructure and capacity needs for a potential U.S.
CBDC as well as encourages the Federal Reserve to continue its research, development, and assessment efforts for a U.S. CBDC (The
White House, 2022). There are some key highlights drawn from our comprehensive review of the most commonly discussed themes in
the existing literature about CBDC that can be served as the foundation for further discussion and research.
First, the motivation to adopt CBDC for each country is different. It also appears that developing countries tend to speed up more
vigorously in terms of researching, testing, and implementation to obtain financial inclusion or cross-border payments, while more
advanced economies are motivated to introduce CBDC to enhance domestic payments efficiency as well as financial stability.
Therefore, it is likely that there would be no one-size-fits-all CBDC development (Georgieva, 2022). Each country should have its own
way of developing CBDC that is most suitable for its specific circumstances and requirements. Therefore, a research direction will
continue to be fruitful is the determination of specific factors influencing the adoption of CBDC among different countries since so far
the number of studies on this strand of literature has still been very limited (Ngo et al., 2022; Mou et al., 2021).
Second, issuing CBDC is the main innovative non-regulatory action that central banks can take as a strategy to provide an alter­
native virtual currency, which could aim at complementing, substituting, or otherwise exerting a competitive force on private cryp­
tocurrencies by leveraging on its price stability. However, the introduction of CBDC can be risky for the economy, i.e facilitating a bank
run from bank deposits to the safe nest of the CBDC. Accordingly, the capability to supply credit of banks would be substantially
restricted as a consequence of the bank run and granting the public direct access to the central bank balance sheet may potentially lead
to the less efficient allocation of credit in the economy due to the centralized control of central banks regarding credit allocation. In the
absence of empirical data, it is suggested that more studies with simulation methods to quantify the potential impact of CBDC on the
economy and on banking sector should be encouraged to ensure the best possible outcome as well as mitigating potential risks related
to the introduction of CBDC.
Third, it can be seen that the introduction of CBDC can imply both positive and negative effects on the financial system of which
money markets are an integral part. The current literature suggests that regulatory agencies need to ensure the proper design, as well as
the supply of CBDC, would not lead to sudden changes or shocks for the money markets and the entire economy. In addition, it seems
that current literature so far tends to support the argument that CBDC will exert a certain impact on the implementation of monetary
policies and influence its transmission mechanism to the real economy. Therefore, we suggest that studies focus on examining risks
involved while adopting CBDC as one of the unconventional monetary policy tools would be helpful for central banks in this process.
Forth, in terms of technology applied, the most commonly used technology to develop CBDC is the Distributed Ledger Technology
(DLT) which is considered to be highly secure as they are decentralized, immutable, and hence, highly transparent. Although there are
different forms of DLTs, the decentralized nature of this technology allows for global and anonymous transactions (Ellul et al., 2020).
Therefore, it is crucial for governments and regulatory agencies to have a proper design of CBDC that can have a balance between
ensure the privacy for end users and at the same time maintain a reasonable level of control over individual’s account to combat
financial crimes. We suggest that more future research on factors that can offset negative perception of general public related to the
disclosure of personal information can be helpful in fostering CBDC’s adoption.
Fifth, the existing theme of CBDC and the payment system shows that both one-tier and two-tier payment have their own ad­
vantages and disadvantages. Therefore, it is challenging to design an optimal model of payment system and similar legal regulations
for commercial banks when applying CBDC. The selection of the model depends on a country’s economic development and the
development of its financial systems. The choice of a suitable payment system also depends on whether central banks would want to
replace cash entirely or only provide CBDC as a complement to cash. Moreover, regardless of the choice to be made, CBDC can hardly
replace physical money in international transactions (Fantacci and Gobbi, 2021). To use CBDC in international transactions, agree­
ments must be met, and a committee managing policies and regulations among central banks from different countries with other
banking organizations (such as IMF, IFC) and multilateral organizations (such as WTO) must be formed (Fantacci and Gobbi, 2021).
Last but not least, the introduction of CBDC can have an impact on a country’s financial stability. To avoid the potential financial
instability, the central bank needs to conduct research on the selection of an appropriate payment mechanism and accordingly adjust
policies and regulations regarding the organization of payment operation and supervision of banks’ payment activities. In further to
this, policymakers should develop a strong and secure technology infrastructure as well as high-quality human capital to ensure the
smooth operation of the decentralized financial technology system.
4. Conclusion
Returning to the initial question regarding whether a digital money system, especially the central bank digital currency (CBDC),
can be a viable replacement or complement for a central bank’s conventional money issuance and circulation, this study casts some
light on addressing this question by systematically reviewing literature in the topic related to CBDC using text mining approach. Using
191 abstracts of journals and conference articles on Scopus database related to CBDC topic collected until Feb 2022, with frequency
analysis of terms occurrence and topic modeling, we found that the most common CBDC themes explored among scholars are (1)
central bank, (2) CBDC and other digital currency, (3) CBDC and money markets (4) CBDC and monetary policy, (5) CBDC design and
technologies, (6) CBDC and payment system, and (7) financial stability and regulatory.
Thanks to the powerful text-mining technique, we also acknowledged that topics investigated about CBDC have significantly
changed over time since 2020. Specifically, the research themes about CBDC up until 2020 have evolved from less diverse and basic
themes such as CBDC as an alternative to cash to more diverse research dimensions of CBDC that include the impact of CBDC in
17

## Page 18

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

different aspects, technically, socially and economically, from 2020 onward. From the systematic reviews, we provided some dis­
cussion and suggested a number of knowledge gaps in Section 3 which could be used as guidance for future research direction on the
CBDC topic, ranging from determining specific factors influencing the adoption of CBDC among different countries; examining risks
involved while adopting CBDC as one of the unconventional monetary policy tools would be helpful for central banks in this process; or
CBDC development technology and CBDC implementation process to the economic policy implications for governments and regulatory
agencies, to research on factors that can offset negative perception of general public related to the disclosure of personal information
can be helpful in fostering CBDC’s adoption. Additionally, CBDC implementation will likely require infrastructure, social and political
acceptance, environmental sustainability, and addressing privacy issues (Elsayed and Nasir, 2022).
All in all, it can be seen that the history of money is turning into a new chapter. Countries are seeking the balance between pre­
serving critical aspects of the conventional monetary and financial systems while exploring new digital forms of money. Throughout
the literature, it is essential to note that CBDC is like a double sword, which can have both positive and negative impacts on the
financial system and the economy as a whole depending on the way it is designed, implemented, and introduced. Finding a delicate
balance between the design developments and policy considerations is crucial for governments to both achieve targets like financial
inclusion and avoid undesirable effects such as a sudden change in the financial system that could hinder financial stability.
CRediT authorship contribution statement
Yen Hoang Hai: Methodology, Conceptualization, Formal analysis, Writing – original draft, Writing – review & editing, Super­
vision. Vu Minh Ngo: Methodology, Formal analysis, Investigation, Writing – original draft, Writing – review & editing, Visualization,
Supervision. Ngoc Binh Vu: Methodology, Formal analysis, Investigation, Writing – original draft, Writing – review & editing.
Data Availability
Data will be made available on request.
Acknowledgement
This research is funded by University of Economics Ho Chi Minh City, Vietnam (UEH); Grant ID no. 2022-05-30-1007.
Appendix A. Supporting information
Supplementary data associated with this article can be found in the online version at doi:10.1016/j.ribaf.2023.101889.

References
Adams, M., Boldrin, L., Ohlhausen, R., Wagner, E., 2021. An integrated approach for electronic identification and central bank digital currencies. J. Paym. Strategy
Syst. 15 (3), 287–304. 〈https://www.ingentaconnect.com/content/hsp/jpss/2021/00000015/00000003/art00007〉.
Agarwal, R., & Kimball, M. (2015). Breaking through the zero lower bound: International Monetary Fund.
Agur, I., Ari, A., Dell’Ariccia, G., 2022. Designing central bank digital currencies. J. Monet. Econ. 125, 62–79. https://doi.org/10.1016/J.JMONECO.2021.05.002.
Älgå, A., Eriksson, O., Nordberg, M., 2020. Analysis of scientific publications during the early phase of the COVID-19 pandemic: topic modeling study. J. Med. Internet
Res. 22 (11), e21559.
Allen, F., Gu, X., Jagtiani, J., 2022. Fintech, cryptocurrencies, and CBDC: financial structural transformation in China. J. Int. Money Financ. 124, 102625 https://doi.
org/10.1016/J.JIMONFIN.2022.102625.
Allen, S., Capkun, S., Eyal, I., Fanti, G., Ford, B., Grimmelmann, J., … Zhang, F. (2020). Design Choices for Central Bank Digital Currency: Policy and Technical
Considerations.
Andolfatto, D., 2021. Assessing the impact of central bank digital currency on private banks. Econ. J. 131 (634), 525–540.
Arauz, A., 2021. The international hierarchy of money in cross-border payment systems: developing countries’ regulation for central bank digital currencies and
facebook’s stablecoin. Int. J. Political Econ. 50 (3), 226–243.
Arner, D.W., Buckley, R.P., Zetzsche, D.A., Didenko, A., 2020. After libra, digital yuan and COVID-19: central bank digital currencies and the new world of money and
payment systems. SSRN Electron. J. https://doi.org/10.2139/SSRN.3622311.
Assenmacher, K., Berentsen, A., Brand, C., & Lamersdorf, N. (2021). A unified framework for CBDC design: remuneration, collateral haircuts and quantity constraints.
Atlantic Council. (2021). Central Bank Digital Currency Tracker. Retrieved May 23, 2022, from Atlantic Council website: https://www.atlanticcouncil.org/
cbdctracker/.
Auer, R., & Böhme, R. (2021). Central bank digital currency: the quest for minimally invasive technology. Retrieved from.
Auer, R., Cornelli, G., & Frost, J. (2020). Rise of the central bank digital currencies: drivers, approaches and technologies.
Auer, Raphael, Haene, P., Holden, H., 2021. Multi-CBDC arrangements and the future of crossborder payments. Bank Int. Settl. 41 (2), 33–39. 〈https://www.bis.org/
publ/bppdf/bispap115.htm〉.
Auer, R., & Böhme, R. (2020). CBDC architectures, the financial system, and the central bank of the future. VoxEU. org–CEPR’s policy portal.
Aziz, A., de Roure, C., Hutchinson, P., & Nightingale, S. (2022). Australian Money Markets through the COVID-19 Pandemic. Retrieved from https://www.rba.gov.au/
publications/bulletin/2022/mar/australian-money-markets-through-the-covid-19-pandemic.html.
Bank of Thailand. (2021). The Way Forward for Retail Central Bank Digital Currency in Thailand.
Barrdear, J., Kumhof, M., 2021. The macroeconomics of central bank digital currencies. J. Econ. Dyn. Control, 104148.
Barrdear, J., & Kumhof, M. (2016). The macroeconomics of central bank issued digital currencies.
Berentsen, A. (2005). Digital Money, Liquidity, and Monetary Policy (originally published in July 1997). First Monday. Retrieved from https://firstmonday.org/ojs/
index.php/fm/article/view/1512/1427.

18

## Page 19

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

Bhawana, & Kumar, S. (2021). Permission Blockchain Network based Central Bank Digital Currency. 2021 IEEE 4th International Conference on Computing, Power
and Communication Technologies, GUCON 2021. https://doi.org/10.1109/GUCON50781.2021.9574020.
Bindseil, U., & Jablecki, J. (2013). Central bank liquidity provision, risk-taking and economic efficiency.
BIS Innovation Hub Hong Kong Centre. (2022). Project mBridge: Connecting economies through CBDC.
Blei, D.M., Lafferty, J.D., 2007. A correlated topic model of science. Ann. Appl. Stat. 1 (1), 17–35.
Blondel, Vincent D., Guillaume, Jean-Loup, Lambiotte, Renaud, Lefebvre, Etienne, 2008. Fast unfolding of communities in large networks. J. Stat. Mech.: Theory Exp.
no. 10 (2008), P10008.
Boar, C., Wehrli, A., 2021. Ready, steady, go? – Results of the third BIS survey on central bank digital currency. BIS Pap. 114, 77–82. 〈www.bis.org〉.
Bordo, M.D., & Levin, A.T. (2017). Central Bank Digital Currency and the Future of Monetary Policy. https://doi.org/10.3386/W23711.
Castrén, O., Kavonius, I.K., Rancan, M., 2022. Digital currencies in financial networks. J. Financ. Stab. 60, 101000 https://doi.org/10.1016/j.jfs.2022.101000.
Chen, H., Siklos, P.L., 2022. Central bank digital currency: a review and some macro-financial implications. J. Financ. Stab., 100985
Cheng, P., 2022. Decoding the rise of Central Bank Digital Currency in China: designs, problems, and prospects. J. Bank. Regul. 1–15.
Chiu, J., Davoodalhosseini, S.M., Hua Jiang, J., & Zhu, Y. (2019). Bank market power and central bank digital currency: Theory and quantitative assessment.
Available at SSRN 3331135.
Choi, K.J., Henry, R., Lehar, A., Reardon, J., Safavi-Naini, R., 2021. A proposal for a Canadian CBDC. SSRN Electron. J. https://doi.org/10.2139/SSRN.3786426.
Cœuré, B. (2012). The importance of money markets [Press release]. Retrieved from https://www.ecb.europa.eu/press/key/date/2012/html/sp120616.en.html.
Cukierman, A., 2020. Reflections on welfare and political economy aspects of a central bank digital currency. Manch. Sch. 88 (S1), 114–125. https://doi.org/
10.1111/MANC.12333.
Cullen, J., 2021. Economically inefficient and legally untenable”: constitutional limitations on the introduction of central bank digital currencies in the E.U. J. Bank.
Regul. 2021 23:1 23 (1), 31–41. https://doi.org/10.1057/S41261-021-00162-4.
Dashkevich, N., Counsell, S., Destefanis, G., 2020. Blockchain application for central banks: a systematic mapping study. IEEE Access 8, 139918–139952. https://doi.
org/10.1109/ACCESS.2020.3012295.
Davoodalhosseini, S.M., 2021. Central bank digital currency and monetary policy. J. Econ. Dyn. Control, 104150.
Dostov, V., Pimenov, P., Shoust, P., Krivoruchko, S., & Titov, V. (2021, December). Comparison of the Digital Ruble Concept with Foreign Central Bank Digital
Currencies. In 2021 4th International Conference on Blockchain Technology and Applications (pp. 70–75).
Dow, S., 2019. Monetary reform, central banks, and digital currencies. Int. J. Political Econ. 48 (2), 153–173.
Ellul, J., Galea, J., Ganado, M., Mccarthy, S., Pace, G.J., 2020. October). Regulating Blockchain, DLT and Smart Contracts: a technology regulator’s perspective, (Vol.
21,. ERA Forum, pp. 209–220.
Elsayed, A.H., Nasir, M.A., 2022. Central bank digital currencies: an agenda for future research. Res. Int. Bus. Financ. 62 (August), 101736 https://doi.org/10.1016/j.
ribaf.2022.101736.
Erlando, A., Riyanto, F.D., Masakazu, S., 2020. Financial inclusion, economic growth, and poverty alleviation: evidence from eastern Indonesia. Heliyon 6 (10),
e05235. https://doi.org/10.1016/J.HELIYON.2020.E05235.
European Banking Authority (2018). Report on the impact of Fintech on incumbent credit institutions’ business models. Retrieved from https://www.eba.europa.eu/
file/28458.
European Commission (2020). Communication from the Commission to the European Parliament, The Council, the European Economic and Social Committee and the
Committee of the Regions on a Digital Finance Strategy for the E.U. Retrieved from https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52020AE4935.
Fabris, N., 2019. Cashless society–the future of money or a utopia? J. Cent. Bank. Theory Pract. 8 (1), 53–66.
Fantacci, L., & Gobbi, L. (2021). Stablecoins, Central Bank Digital Currencies and U.S. Dollar Hegemony. Accounting, Economics, and Law: A Convivium.
Fiedler, S., Gern, K.-J., & Stolzenburg, U. (2019). The Impact of Digitalisation on the Monetary System. ECON Committee Monetary Dialogue Papers.
Fiedler, S., Gern, K.J., Stolzenburg, U., 2019. The Impact of Digitalisation on the Monetary System. Study for the Committee on Economic and Monetary Affairs. Policy
Department for Economic, Scientific and Quality of Life Policies, European Parliament.
FitchRatings. (2022). U.S. Federal Reserve Digital Currency Could Impact Money Market Funds. Retrieved from https://www.fitchratings.com/research/fund-assetmanagers/us-federal-reserve-digital-currency-could-impact-money-market-funds-15–03-2022.
Gans, J.S., Halaburda, H., 2015. Some economics of private digital currency. Econ. Anal. Digit. Econ. 257–276.
Georgieva, K., 2022. The Future of Money: Gearing up for Central Bank Digital Currency. International Monetary Fund. https://www.imf.org/en/News/Articles/2022/
02/09/sp020922-the-future-of-money-gearing-up-for-central-bank-digital-currency.
Geva, B., Grünewald, S.N., Zellweger-Gutknecht, C., 2021. The e-banknote as a ‘banknote’: a monetary law interpreted. Oxf. J. Leg. Stud. 41 (4), 1119–1148. https://
doi.org/10.1093/OJLS/GQAB019.
Goodfriend, M. (2016). The case for unencumbering interest rate policy at the zero bound. Paper presented at the Jackson Hole Economic Policy Symposium.
Gross, J., & Schiller, J. (2021). A model for central bank digital currencies: Implications for bank funding and monetary policy. Available at SSRN 3721965.
Groß, J., Klein, M., Sandner, P., 2020. Central bank digital currencies: benefits, risks and the role of blockchain technology. Wirtschaftsdienst 100 (7), 545–549.
Habib, M.M., et al., 2020. The fundamentals of safe assets. J. Int. Money Financ. 102, 102119.
Han, J., Kim, J., Youn, A., Lee, J., Chun, Y., Woo, J., & Hong, J.W. K. (2021). Cos-CBDC: Design and Implementation of CBDC on Cosmos Blockchain. 2021 22nd AsiaPacific Network Operations and Management Symposium, APNOMS 2021, 303–308. https://doi.org/10.23919/APNOMS52696.2021.9562672.
Hao, T., Chen, X., Li, G., Yan, J., 2018. A bibliometric analysis of text mining in medical research. Soft Comput. 22 (23), 7875–7892.
Hashimoto, K., Kontonatsios, G., Miwa, M., Ananiadou, S., 2016. Topic detection using paragraph vectors to support active learning in systematic reviews. J. Biomed.
Inform. 62, 59–65.
Jabbar, A., Geebren, A., Hussain, Z., Dani, S., Ul-Durar, S., 2022a. Investigating individual privacy within CBDC: a privacy calculus perspective. Res. Int. Bus. Financ.,
101826
Jabbar, A., Geebren, A., Hussain, Z., Dani, S., Ul-Durar, S., 2022b. Investigating individual privacy within CBDC: a privacy calculus perspective. Res. Int. Bus. Financ.,
101826
Jamet, J.-F., Mehl, A., Neumann, C.M., & Panetta, F. (2022). Monetary policy and financial stability implications of central bank digital currencies. Retrieved from
https://voxeu.org/article/monetary-policy-and-financial-stability-implications-central-bank-digital-currencies.
Jia, P. (2020). Negative interest rates on central bank digital currency.
Karami, A., Lundy, M., Webb, F., Dwivedi, Y.K., 2020. Twitter and research: a systematic literature review through text mining. IEEE Access 8, 67698–67717.
Keister, T., & Sanches, D.R. (2021). Should central banks issue digital currency? Available at SSRN 3966817.
Khiaonarong, T., Humphrey, D., 2019. Cash use across countries and the demand for central bank digital currency. J. Paym. Strategy Syst. 13 (1), 32–46. 〈https://
www.ingentaconnect.com/content/hsp/jpss/2019/00000013/00000001/art00005〉.
Kiff, J., Alwazir, J., Davidovic, S., & Farias, A. (2020). A Survey of Research on Retail Central Bank Digital Currency.
Kim, Y.S., & Kwon, O. (2019). Central bank digital currency and financial stability. Bank of Korea W.P., 6.
Kirkby, R., 2018. Cryptocurrencies and digital fiat currencies. Aust. Econ. Rev. 51 (4), 527–539. https://doi.org/10.1111/1467-8462.12307.
Kochergin, D.A., 2021. central banks digital currencies: world experience. Mirovaia Ekon. Mezhdunarodnye Otnos. 65 (5), 68–77. https://doi.org/10.20542/01312227-2021-65-5-68-77.
Kochergin, D.A., Yangirova, A.I., 2019. Central bank digital currencies: key characteristics and directions of influence on monetary and credit and payment systems.
Financ.: Theory Pract. 23 (4), 80–98.
Kovanen, A., 2019. Competing with bitcoin - some policy considerations for issuing digitalized legal tenders. Int. J. Financ. Res. 10, 4.
Kuehnlenz, S., Orsi, B., Kaltenbrunner, A., 2022a. Central bank digital currencies and the international payment system: the demise of the US dollar? Res. Int. Bus.
Financ., 101834

19

## Page 20

Research in International Business and Finance 64 (2023) 101889

Y.H. Hoang et al.

Kuehnlenz, S., Orsi, B., Kaltenbrunner, A., 2022b. Central bank digital currencies and the international payment system: the demise of the US dollar? Res. Int. Bus.
Financ., 101834
Kushwaha, A.K., Kar, A.K., 2020. Micro-foundations of artificial intelligence adoption in business: Making the shift. In: Re-imagining Diffusion and Adoption of
Information Technology and Systems: A Continuing Conversation: IFIP WG 8.6 International Conference on Transfer and Diffusion of IT, TDIT 2020, Tiruchirappalli, India,
December 18–19, 2020, Proceedings, Part I. Springer International Publishing, pp. 249–260.
Kushwaha, A.K., Kar, A.K., Dwivedi, Y.K., 2021. Applications of big data in emerging management disciplines: a literature review using text mining. Int. J. Inf. Manag.
Data Insights 1 (2), 100017.
Lee, Y., Son, B., Jang, H., Byun, J., Yoon, T., Lee, J., 2021. Atomic cross-chain settlement model for central banks digital currency. Inf. Sci. 580, 838–856. https://doi.
org/10.1016/J.INS.2021.09.040.
Li, S., Huang, Y., 2021. The genesis, design and implications of China’s central bank digital currency. China Econ. J. 14 (1), 67–77. https://doi.org/10.1080/
17538963.2020.1870273.
Löber, K., & Houben, A. (2018). Central bank digital currencies. Retrieved from https://www.bis.org/cpmi/publ/d174.pdf.
Mancini-Griffoli, T., Peria, M.S.M., Agur, I., Ari, A., Kiff, J., Popescu, A., Rochon, C., 2018. Casting light on central bank digital currency. IMF Staff Discuss. Note 8
(18), 1–39.
Mäntymäki, M., Wirén, M., & Najmul Islam, A.K.M. (2020). Exploring the Disruptiveness of Cryptocurrencies: A Causal Layered Analysis-Based Approach. Lecture
Notes in Computer Science (Including Subseries Lecture Notes in Artificial Intelligence and Lecture Notes in Bioinformatics), 12066 LNCS, 27–38. https://doi.org/
10.1007/978–3-030–44999-5_3/TABLES/2.
Mcauliffe, J., Blei, D., 2007. Supervised topic models. Advances in neural information processing systems, p. 20.
McLaughlin, T., 2021. Two paths to tomorrow’s money. J. Paym. Strategy Syst. 15, 1.
Meaning, J., Dyson, B., Barker, J., & Clayton, E. (2018). Broadening narrow money: monetary policy with a central bank digital currency.
Minesso, M.F., Mehl, A., Stracca, L., 2022. Central bank digital currency in an open economy. J. Monet. Econ. 127, 54–68.
Mou, C., Tsai, W.T., Jiang, X., Yang, D., 2021. Game-theoretic analysis on CBDC adoption. BenchCouncil International Federated Intelligent Computing and Block
Chain Conferences. Springer, Singapore, pp. 294–305.
Murray, J., 2019. central banks and the future of money. SSRN Electron. J. https://doi.org/10.2139/SSRN.3369649.
Nabilou, H., 2020. Testing the waters of the Rubicon: the European Central Bank and central bank digital currencies. J. Bank. Regul. 21 (4), 299–314.
Naheem, M.A. (2019). Exploring the links between AML, digital currencies and blockchain technology: Journal of Money Laundering Control, 22(3), 515–526.
https://doi.org/10.1108/JMLC-11–2015-0050/FULL/HTML.
Nassirtoussi, A.K., Aghabozorgi, S., Wah, T.Y., Ngo, D.C.L., 2014. Text mining for market prediction: a systematic review. Expert Syst. Appl. 41 (16), 7653–7670.
Nelson, B., 2018. Financial stability and monetary policy issues associated with digital currencies. J. Econ. Bus. 100, 76–78.
Ngo, V.M., Van Nguyen, P., Nguyen, H.H., Tram, H.X.T., Hoang, L.C., 2022. Governance and monetary policy impacts on public acceptance of CBDC adoption. Res.
Int. Bus. Financ., 101865
O’Mara-Eves, A., Thomas, J., McNaught, J., Miwa, M., Ananiadou, S., 2015. Using text mining for study identification in systematic reviews: a systematic review of
current approaches. Syst. Rev. 4 (1), 1–22.
Ovchinnikova, N., Kursevich, V., 2018. Fedcoin-a blockchain-backed central bank cryptocurrency. Вестник Тульского филиала Финуниверситета 1, 452–453.
Ozili, P.K., 2021. Can central bank digital currency increase financial inclusion? Arguments for and against. SSRN Electron. J. https://doi.org/10.2139/
SSRN.3963041.
Peebles, G. (2021). Privatizing Cash: Currency and Public Goods in Sweden. Accounting, Economics, and Law: A Convivium.
Pocher, N., Veneris, A., 2021. Privacy and transparency in CBDC: a regulation-by-design AML/CFT scheme. IEEE Trans. Netw. Serv. Manag. https://doi.org/10.1109/
TNSM.2021.3136984.
Prasad, E.S. (2021). The Future of Money: How the Digital Revolution is Transforming Currencies and Finance: Harvard University Press.
PwC. (2021). PwC CBDC global index PwC Global CBDC Index 2021. Retrieved from https://www.pwc.com/gx/en/industries/financial-services/assets/pwc-cbdcglobal-index-1st-edition-april-2021.pdf.
Rahman, A.J., 2018. Deflationary policy under digital and fiat currency competition. Res. Econ. 72 (2), 171–180.
Rogoff, K., 2017. Dealing with monetary paralysis at the zero bound. J. Econ. Perspect. 31 (3), 47–66.
Saito, M., 2021. Central bank cryptocurrencies in a competitive equilibrium environment: can strong money demand survive in the digital age? Strong Money Demand
in Financing War and Peace. Springer, pp. 161–189.
Shen, W., Hou, L., 2021. China’s central bank digital currency and its impacts on monetary policy and payment competition: game changer or regulatory toolkit?
Comput. Law Secur. Rev. 41, 105577 https://doi.org/10.1016/J.CLSR.2021.105577.
Shirai, S. (2020). Growing central bank challenges in the World and Japan: Low inflation, monetary policy, and digital currency: Asian Development Bank.
Soderberg, G., Bechara, M., Bossu, W., Che, N.X., Kiff, J., Lukonga, I., Yoshinaga, A., 2022. Behind the scenes of central bank digital currency: emerging trends,
insights, and policy lessons. FinTech Notes 2022 (004). https://doi.org/10.5089/9798400201219.063.
Söderberg, G., 2019. The e-krona–now and for the future. Sver. Riksbank Econ. Comment. 1–9.
Sun, H., Mao, H., Bai, X., Chen, Z., Hu, K., & Yu, W. (2018). Multi-blockchain model for central bank digital currency. Parallel and Distributed Computing,
Applications and Technologies, PDCAT Proceedings, 2017-December, 360–367. https://doi.org/10.1109/PDCAT.2017.00066.
The White House (2022). FACT SHEET: President Biden to Sign Executive Order on Ensuring Responsible Development of Digital Assets. Retrieved May 24, 2022,
from https://www.whitehouse.gov/briefing-room/statements-releases/2022/03/09/fact-sheet-president-biden-to-sign-executive-order-on-ensuring-responsibleinnovation-in-digital-assets/.
Tian, H., Chen, X., Ding, Y., Zhu, X., & Zhang, F. (2019). AFCoin: A Framework for Digital Fiat Currency of central banks Based on Account Model. Lecture Notes in
Computer Science (Including Subseries Lecture Notes in Artificial Intelligence and Lecture Notes in Bioinformatics), 11449 LNCS, 70–85. https://doi.org/
10.1007/978–3-030–14234-6_4.
Valdez, D., Pickett, A.C., Goodson, P., 2018. Topic modeling: latent semantic analysis for the social sciences. Soc. Sci. Q. 99 (5), 1665–1679.
Wagner, E., Bruggink, D., Benevelli, A., 2021. Preparing euro payments for the future: a blueprint for a digital euro. J. Paym. Strategy Syst. 15 (2), 165–187.
Wang, Y., Lucey, B.M., Vigne, S.A., Yarovaya, L., 2022. The effects of central bank digital currencies news on financial markets. Technol. Forecast. Soc. Change 180,
121715.
Yau, C.K., Porter, A., Newman, N., Suominen, A., 2014. Clustering scientific documents with topic modeling. Scientometrics 100 (3), 767–786.
Zhang, T., Huang, Z., 2021. Blockchain and central bank digital currency. ICT Express. https://doi.org/10.1016/J.ICTE.2021.09.014.
Zunic, A., Corcoran, P., Spasic, I., 2020. Sentiment analysis in health and well-being: systematic review. JMIR Med. Inform. 8 (1), e16023.

20
