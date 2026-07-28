---
source_type: pdf
title: "How does the fintech sector react to signals from central bank digital currencies"
original_file: "thesis/reference/How does the fintech sector react to signals from central bank\ndigital currencies.pdf"
sha256: "8effa3e557f1c815f22378f76e68c51f7b6e1b03701aab720cb806a7b84c8b5e"
page_count: 5
extracted: 2026-07-23
extraction_method: "text"
ocr_pages:
extraction_warnings:
---

# Raw extraction: How does the fintech sector react to signals from central bank digital currencies

> [!note] Immutable extraction
> Generated from the original PDF. Preserve page boundaries and do not edit source claims here.

## Page 1

Finance Research Letters 50 (2022) 103308

Contents lists available at ScienceDirect

Finance Research Letters
journal homepage: www.elsevier.com/locate/frl

How does the fintech sector react to signals from central bank
digital currencies?☆
Zhenghui Li a, Cunyi Yang b, Zhehao Huang a, *
a
b

Guangzhou Institute of International Finance, Guangzhou University, Guangzhou, China
Lingnan College, Sun Yat-Sen University, Guangzhou, China

A R T I C L E I N F O

A B S T R A C T

Keywords:
Fintech
Central bank digital currency
Capital market
Impulse response
TVP-VAR

This study analyzes how the fintech sector reacts to central bank digital currency (CBDC) signals
released by central banks. First, we innovatively construct a signal index for the CBDC. Second, by
collecting data from January 2012 to February 2022, the positively time-varying response of the
fintech sector to the CBDC signals is found. Meanwhile, the response intensity reduces over time,
thereby reflecting the weakening sensibility of the fintech sector to the CBDC signals. Third,
shocks of symbolic events regarding the CBDC in the fintech sector are captured to further
confirm the response to signals.

1. Introduction
With shocks from COVID-19 and the increasing competition among global digital currencies, central banks are speeding up the
progress regarding their sovereign digital currencies. The cryptocurrency (Libra) by Facebook was invented on June 18, 2019 and has
garnered considerable attention by worldwide central banks, thereby leading to their accelerated planning of sovereign digital cur­
rencies. During the COVID-19 pandemic, electronic payment has shown prominent advantages in comparison with traditional pay­
ment systems because of quarantine and restrict exit and entry (Didenko et al., 2020; Khatun et al., 2021). At the 2020 Work
Conference of the People’s Bank of China (PBOC), continuing to steadily push forward the research and development of e-RMB was
emphasized. As new attributes and functions, central bank digital currencies (CBDCs) will challenge the issuance of paper money and
macroeconomic regulation (Wu and Chen, 2021).
The issuance of CBDCs is a very complex and systematic project, wherein the fintech industry will play a key role. This issuance not
only involves technical problems (Ali et al., 2014) but is also closely related to financial security and economic development (Binseil,
2019). CBDCs can optimize traditional payment systems, thereby better contributing to economic and social development (Kochergin
and Dostov, 2020). Additionally, they can optimize the operating toolbox of monetary policy, thereby increasing its conduction ef­
ficiency (Davoodalhosseini, 2021). Meanwhile, the issuance of CBDCs will cause significant management and financial regulation risks
for central banks (Nelson, 2018). To promote the issuance and mitigate subsequent shocks, the fintech industry is encouraged to
participate in the progress of CBDCs (Nabilou, 2020) alongside traditional financial institutions, such as central and commercial banks.
Because they innovatively apply digital technologies, such as cloud computing, artificial intelligence, and blockchain, to financial
products/services, existing literature acknowledges that fintech companies will be important in every aspect of CBDCs, including

☆
The work is supported by National Office for Philosophy and Social Sciences (No.21CTJ014).
* Corresponding author.
E-mail addresses: lizh@gzhu.edu.cn (Z. Li), yangcy9@mail2.sysu.edu.cn (C. Yang), zhehao.h@gzhu.edu.cn (Z. Huang).

https://doi.org/10.1016/j.frl.2022.103308
Received 5 May 2022; Received in revised form 25 August 2022; Accepted 31 August 2022
Available online 1 September 2022
1544-6123/© 2022 Elsevier Inc. All rights reserved.

## Page 2

Finance Research Letters 50 (2022) 103308

Z. Li et al.

payment system design, circulation framework, access mode, and cross-border payment settlement (Dow, 2019; Barrdear and Kum­
hof, 2021; Khan et al., 2021; Barontini and Holden, 2019; Fernández et al., 2021; Parlour et al., 2020). The issuance and maintenance
of CBDCs should be jointly initiated by central banks, financial institutes, and fintech companies (Auer et al., 2021). With the
deepening progress of CBDC, the roles of fintech companies will become more significant, which may be reflected by their values and
market capitalizations.
It is implied that the capital market’s fintech sector may react to some signals regarding CBDC development released by the central
banks, which is verified by this study.. The PBOC has published termly news announcing the different stages of a CBDC. For instance,
the PBOC claimed setting up a research team for a CBDC in January 2014, thereby symbolizing the beginning of the embryonic stage,
whereas the establishment of the CBDC research institute in January 2017 implies the preparatory stage. Since the DC/EP1 project was
announced in August 2019, China’s CBDC has entered the development stage. The CBDC signals released by the PBOC represent the
official attention to CBDCs. The signals are usually considered a wind indicator in China’s capital market, guiding the investor’s
attention. Due to the important roles played by fintech companies in the progress of a CBDC, it is believed that CBDC signals will
increase investor expectations from the fintech sector, which should receive positive shocks after central banks release signals about
the CBDC. This forms the critical hypothesis of this study, which is verified by setting a vector autoregression model (VAR). Meanwhile,
the CBDC signals released at different stages show different intensities, thereby reflecting varying shocks in the fintech sector.
Accordingly, to capture the time-varying characteristic, we involved the time-varying parameters and set up the TVP-VAR (TimeVarying Parameter Vector Autoregression) model to test the time-varying shocks of the CBDC signals in the capital market’s fintech
sector. Additionally, reactions to the signals of some symbolic events in the progress of CBDC are also analyzed.
We highlight the innovative construction of the CBDC signal index in this study. In most of the existing literature, quantitative
analysis is difficult to carry out due to the unavailability of data. In this study, we overcome this problem by employing the text analysis
technique and obtaining a time series describing the released CBDC signals from the PBOC, which reflects the official attention to the
CBDC. With such a sequence of CBDC signals, we test whether the government could lead investor attention effectively and transmit
shocks to the capital market. More responses to any sound during the progress of CBDC can be explored through our constructed CBDC
signals such that we can analyze the economic effects induced by CBDC development and infer some possible incoming shocks,
especially when formally issuing the CBDC to the public.
The rest of this study is organized as follows. In Section 2, we introduce the data and briefly describe the applied methods and the
model. Empirical results are shown in Section 3. In Section 4, we conclude the paper.
2. Data and methodology
The official research of e-RMB was initiated in January 2014. Due to this early preparation, some slightly weaker signals should be
released before January 2014. Thus, we determine the scope of data from January 2012 to February 2022, thereby totaling 124
months. The official stock index of the fintech sector was published in June 2017, which included over 80 stocks. To extend this stock
index to cover the determined time frame, we selected 55 stocks whose time frames covered January 2012–February 2022 and
recalculated the index using the given weights.2 Regarding the CBDC signals, we adopted the text analysis methodology inspired by
Chen et al. (2018). The methodology is as follows: (1) employ the Python crawler method to collect 1000 information articles related to
the CBDC from Baidu information; (2) use the demo keyword extraction method to extract 16 keywords3 associated with the CBDC
from all information articles; (3) manually extract 3882 valid news texts (excluding noisy texts, such as commemorative coin releases)
from the press release page of the PBOC website and summarize them by month; (4) select all sentences containing the keywords as
“sentences related to CBDC” in the central bank news texts; (5) calculate the indicator as and (6) obtain the CBDC signals by stan­
dardizing the proportion of relevant sentences.
Proportion of relevant sentences =

word number of relevant sentences
total number of words in the news

Fig. 1 shows the trends of the CBDC signals and fintech index, wherein the full line represents the fintech index and the dotted line
represents the CBDC signals. Setting up the CBDC research team in January 2014 symbolized the first step toward the progress of
CBDC, which is reflected by the peak of the dotted line (marked ①). Another peak of the CBDC signals was attained in July 2021, when
the “White paper on the development of China’s digital RMB” was published (marked ②). We also observe a lower peak in October 2020
(marked ③). This is when the “10+1 pattern”4 is formed. Regarding the fintech index, we can observe a peak in May 2015. It coincides
1

DC/EP stands for Digital Currency Electronic Payment. It is China’s version of a CBDC and is a controllable, anonymous payment tool,
equivalent to banknotes and coins, with value characteristics and unlimited legal compensation. It is issued by the PBOC, operated by designated
operating institutions, and exchanged among the public. Based on the generalized account system, it supports the loose-coupling function of bank
accounts.
2
On June 9, 2017, the Shenzhen Stock Exchange released the first fintech index (Code 399699). The weights used in this study are derived from
the public weights of this index.
3
The keywords include: digital currency, digital economy, digital finance, bitcoin, CBDC, DCEP, digital RMB, virtual currency, e-wallet, epayment, cryptocurrency, cloud computing, blockchain, e-cash, financial technology, and online consumption.
4
The PBOC announced the first batch of pilot cities, including Shenzhen, Chengdu, Suzhou and Xiong’an, for the digital RMB in April 2020.
Subsequently, six other cities, Shanghai, Hainan, Changsha, Xi’an, Qingdao and Dalian, and scenes in Beijing Winter Olympics, were included,
thereby forming the so called “10+1 pattern.”
2

## Page 3

Finance Research Letters 50 (2022) 103308

Z. Li et al.

Fig. 1. Trends of the CBDC signals and fintech index.

with the entire market index, i.e., the Shanghai Securities Composite Index, which is considered The Madness before the crash in 2015.
Therefore, we eliminate this impact by controlling the Shanghai Securities Composite Index (SSE in Figs. 2, 3) in our econometric
model when testing the response of the fintech index to the CBDC signals. Additionally, we can observe roughly similar trends of the
CBDC signals and fintech index, which might imply that the fintech industry is growing alongside the CBDC.
We employed the TVP-VAR with random volatility. It is assumed that the parameters reflecting the response from the fintech sector
obey the first-order random walk process. The volatility is random, which can fully reflect the lasting changes in parameters caused by
structural mutation. Additionally, it is assumed that the structural impact terms are independent of each other, and the parameters to
be estimated follow a random walk process. Because the likelihood function with random fluctuation is difficult to deal with, we
employed the Markov Chain Monte Carlo (MCMC) algorithm for continuous sampling in the background of Bayesian inference. To
ensure sampling effectiveness, an analog filter was used to sample the time-varying parameters.
3. Empirical results
We now empirically investigate how the fintech sector in China’s capital market reacts to the CBDC signals released by the PBOC.
The core sequences, CBDC signals, and fintech index are stationary through the ADF test. The model is set with lag order 2. When
running the MCMC simulation iteration, 20,000 continuous and effective simulation samples are produced. According to the result and
diagnosis of the MCMC estimation, the Geweke value is high and invalid factors are relatively low (all less than 100), thereby indi­
cating that the MCMC algorithm is effective.
3.1. Time-varying characteristics
We can calculate the impulse responses for each variable with different lag phases at all the moments using the estimated pa­
rameters in the TVP-VAR model. Fig. 2 introduces impulse responses with lag phases of 3, 6, and 12 to analyze the short-, medium-, and
long-term impacts. The subfigure in the middle of the first row shows the evolutions of the time-varying parameters with different lag
phases, thereby reflecting the responses of the fintech sector to termly released CBDC signals. First, the responses of the fintech sector
to CBDC signals are positive. The participation of fintech companies in the CBDC project of the PBOC generated investor attention to
the fintech sector in the capital market and raised investor expectation. Second, the fintech sector reacted firmly to the CBDC signals
firmly in the short and medium terms but weakly in the long term. Third, it is found that the parameter was decreasing over time,
meaning that the sensibility of the fintech sector to CBDC signals was gradually reducing. In general, the market is verified to be
asymptotically efficient. With the deepening development of the CBDC, the information delivered by the CBDC signals will be reflected
accurately and sufficiently in the fintech sector in time as significant roles played by fintech companies in the overall progress of CBDC.
Therefore, the uncertain shocks from the CBDC signals were gradually weakening, and the fintech sector no longer reacted to the CBDC
signals as strongly as it previously did.
3.2. Responses to specific events
During CBDC progress, a series of symbolic events occurred. For instance, the PBOC announced setting up the research team in
January 2014; PBOC published the official objective of CBDC in January 2016 for the first time; PBOC announced setting up the CBDC
institute in January 2017; Ministry of Commerce issued the digital RMB pilot program in August 2020, and the “10+1 pattern” was
formed in October 2020; and the PBOC published the “White paper on the development of China’s digital RMB” in July 2021. Such
symbolic events usually release important information to the public, which may guide investors’ attention to the capital market,
especially the fintech sector due to its unique role in developing the CBDC. Therefore, some responses of the fintech sector to the event
3

## Page 4

Finance Research Letters 50 (2022) 103308

Z. Li et al.

Fig. 2. The impulse response diagram.

Fig. 3. Responses to three symbolic events.

shocks should occur. In this study, we select three representative events: the establishment of the CBDC research team, formation of the
“10+1′′ pattern, and publication of the “White paper on the development of China’s digital RMB.” These three events correspond to the
three peaks of the CBDC signals, marked ①, ②, and ③, respectively (Fig. 1). Then, we focus on their shocks on the fintech sector in the
capital market (see Fig. 3 where the lines with time labels correspond to different events). First, we confirm the positive responses of
the fintech sector to all these events but with different response intensities, where the most vigorous response is to the establishment of
the CBDC research team, followed by the formation of the “10+1 pattern,” and then the publication of the white paper. Second, all the
4

## Page 5

Finance Research Letters 50 (2022) 103308

Z. Li et al.

responses to the three events exhibit convex profiles over the lag phase, where they attained their respective peak responses around lag
phase 4. The attenuating response intensity may be due to the reducing sensibility of the fintech sector to CBDC signals.
4. Conclusion
We investigated the responses of the fintech sector in the capital market to a series of CBDC signals released by the PBOC. By
innovatively constructing a signal index, which reflects the official attention to the CBDC, we overcome the problem of empirical
analysis in the previous literature. Because the fintech industry played a vital role in the progress of CBDC it is found that the fintech
sector in the capital market shows a positive response to the constructed CBDC signals. This response was time-varying, and the in­
tensity decreased over time, which means that the sensibility of the fintech sector to CBDC signals is reducing, as the market ex­
pectations on the role played by the fintech industry in developing the CBDC tended to be stable. Some symbolic events during the
progress of CBDC also impacted the fintech sector, thereby leading to its positive responses.
The government should encourage the fintech companies to take part in the progress of CBDC development and create more
conditions such that it can realize the rational allocation of market resources by guiding the investors’ attention and raising their
expectations of the emerging fintech industry. As a result, it will further push digital economy development. Moreover, this study
suggests that investors pay more attention to the fintech sector and adjust their strategies.
Declaration of Competing Interest
All the authors claim that the manuscript is completely original. The authors also declare no conflict of interest.
Data Availability
The authors do not have permission to share data.
References
Ali, R., Barrdear, J., Clews, R., Southgate, J., 2014. Innovations in payment technologies and the emergence of digital currencies. Bank Engl. Q. Bull. 3, 262–275.
Auer, R., Boar, C., Cornelli, G., Frost, J., Holden, H., Wehrli, A. (2021). CBDCs beyond borders: results from a survey of central banks. BIS Paper.
Barontini, C., Holden, H. (2019). Proceeding with caution – a survey on central bank digital currencies. BIS Paper.
Barrdear, J., Kumhof, M., 2021. The macroeconomics of central bank digital currencies. J. Econ. Dyn. Control 104–148.
Binseil, U., 2019. Central bank digital currency: financial system implications and control. Int. J. Political Econ. 48 (4), 303–335.
Chen, Z., Kahn, M.E., Liu, Y., Wang, Z., 2018. The consequences of spatially differentiated water pollution regulation in China. J. Environ. Econ. Manag. 88, 468–485.
Didenko, A.N., Zetzsche, D.A., Arner, D.W., Buckley, R.P. (2020). After libra, digital yuan and COVID-19: central bank digital currencies and the new world of money
and payment systems. Working Paper, 2020.
Kochergin, D., Dostov, V., 2020. Central banks digital currency: issuing and integration scenarios in the monetary and payment system. Bus. Inf. Syst. Work. 111–119
page.
Davoodalhosseini, S.M., 2021. Central bank digital currency and monetary policy. J. Econ. Dyn. Control 104–150.
Dow, S., 2019. Monetary reform, central banks, and digital currencies. Int. J. Political Econ. 48 (2), 153–173.
Fernández, J., Sanches, D., Schilling, L., Uhlig, S., 2021. Central bank digital currency: central banking for all? Rev. Econ. Dyn. 41, 225–242.
Khan, S.N., Loukil, F., Ghedira-Guegan, C., Benkhelifa, E., Bani-Hani, A., 2021. Blockchain smart contracts: applications, challenges, and future trends. Peer-to-Peer
Netw. Appl. 14, 2901–2925.
Khatun, M.N., Mitra, S., Sarker, M.N.I., 2021. Mobile banking during COVID-19 pandemic in Bangladesh: a novel mechanism to change and accelerate people’s
financial access. Green Finance 3 (3), 253–267.
Nabilou, H., 2020. Testing the waters of the Rubicon: the European Central Bank and central bank digital currencies. J. Bank. Regul. 21 (4), 299–314.
Nelson, B., 2018. Financial stability and monetary policy issues associated with digital currencies. J. Econ. Bus. 100, 76–78.
Parlour, C.A., Rajan, U., Walden, J., 2020. Payment system externalities and the role of Central Bank digital currency. J. Finance.
Wu, T., Chen, J., 2021. A study of the economic impact of Central Bank Digital Currency under global competition. China Econ. J. 14 (1), 78–101.

5
