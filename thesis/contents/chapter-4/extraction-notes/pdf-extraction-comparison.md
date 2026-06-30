# Ekstraksi PDF untuk Perbandingan Hasil Penelitian

Dokumen ini merangkum informasi kunci dari dua PDF referensi utama untuk
Bab IV sub-bab "Perbandingan Hasil Penelitian dengan Hasil Terdahulu".

Kunci sitasi di `references.bib`:
- `aryani2023critlit` → PDF 1 (Critical Literature Review)
- `bi_garuda_poc` → PDF 2 (PoC Proyek Garuda)

---

## PDF 1: Designing Central Bank Digital Currency in Indonesia: A Critical Literature Review

### 1. Identitas Publikasi
| Atribut | Nilai |
|---------|-------|
| Judul | Designing Central Bank Digital Currency in Indonesia: A Critical Literature Review |
| Penulis | Janitra Nur Aryani (NIM 19020187) |
| Pembimbing | Kurnia Fajar Afgani, S.AB., M.B.A |
| Jenis | Tugas Akhir Sarjana (Final Project) |
| Program | Manajemen (S1), School of Business and Management |
| Institusi | Institut Teknologi Bandung (ITB) |
| Tahun | 2023 |
| Venue | Tugas Akhir ITB (tidak diterbitkan di jurnal/konferensi) |
| Kunci sitasi | `aryani2023critlit` |

### 2. Tujuan dan Lingkup Penelitian
- **Tujuan**: Menilai apakah desain r-Digital Rupiah yang diusulkan cocok untuk Indonesia melalui tinjauan literatur kritis komparatif terhadap *White Paper Project Garuda* (Bank Indonesia, 2022).
- **Lingkup**: CBDC **ritel** (r-Digital Rupiah) — fokus pada desain, fitur, implikasi, dan perbandingan antarnegara.
- **Pertanyaan penelitian**:
  1. Apa kerangka desain yang diusulkan untuk CBDC Indonesia?
  2. Bagaimana membandingkannya dengan implementasi CBDC negara lain?
  3. Apa implikasi potensial Digital Rupiah bagi ekonomi, keamanan, privasi, dan hukum Indonesia?
  4. Rekomendasi apa yang dapat diberikan untuk mengoptimalkan desain?

### 3. Metodologi
- **Jenis**: *Critical Comparative Literature Review* (tinjauan literatur kritis komparatif).
- **Sumber utama**: *White Paper Project Garuda* (Nov 2022) + literatur CBDC global.
- **Negara pembanding**: eNaira (Nigeria), Sand Dollar (Bahamas), e-CNY (China), Project Orchid (Singapura).
- **Tahapan**: identifikasi literatur → analisis kerangka desain → perbandingan antarnegara → analisis implikasi → rekomendasi.
- **Tidak ada eksperimen/PoC/pengujian kinerja** — murni analisis konseptual berbasis dokumen.

### 4. Temuan Kunci

#### 4.1 Arsitektur Digital Rupiah (menurut White Paper 2022)
- **Lima elemen desain**: penerbitan (issuance), distribusi & pencatatan transaksi, akses, use cases & interlinkage, infrastruktur & teknologi.
- **Dua bentuk**: w-Digital Rupiah (grosir) + r-Digital Rupiah (ritel) — **pendekatan hybrid** yang mengintegrasikan grosir dan ritel dalam satu sistem (tidak umum secara global).
- **Distribusi**: kombinasi *one-tier* dan *two-tier* — grosir mendapat dari BI langsung, ritel didistribusikan melalui PSP berlisensi.
- **Akses**: *account-based* atau *token-based*; w-Digital Rupiah memakai token-based.
- **Tahap pengembangan**: 3 tahap — (1) Immediate: wRD terbatas, (2) Intermediate: ekspansi ke transaksi pasar uang (DvP, tokenisasi sekuritas), (3) End: integrasi wRD + rRD, distribusi ritel, *cross-border*.

#### 4.2 Pilihan Teknologi/Infrastruktur
- **w-Digital Rupiah**: *Permissioned DLT* dipilih untuk menjaga privasi, kontrol, dan transparansi.
- **r-Digital Rupiah**: **mungkin menggunakan infrastruktur terpusat (centralized)** karena keterbatasan skalabilitas DLT yang dapat memengaruhi kecepatan *settlement* ritel.
- **Argumen kritis**: DLT ritel dianggap terlalu lambat untuk volume transaksi ritel yang tinggi.
- **Catatan tentang Hyperledger Fabric**: Disebut sebagai platform yang dipakai eNaira (bersama Bitt Inc. DCMS), **bukan** sebagai pilihan teknologi Digital Rupiah.

#### 4.3 Metrik Kuantitatif yang Dikutip (bukan diukur, dikutip dari literatur)
| Metrik | Nilai | Sumber |
|--------|-------|--------|
| TPS VISA (terpusat) | hingga 65.000 TPS | SARB, 2018 |
| TPS DLT privat (rata-rata) | ~20 TPS | Mearian, 2019 |
| TPS DLT (new entrants) | hingga 10.000 TPS | Mearian, 2019 |
| Wallet eNaira (Nov 2021) | ~860.000 (0,8% rekening bank aktif) | Ree, 2022 |
| Transaksi eNaira/minggu | ~14.000 | — |
| Sand Dollar beredar (2021) | 302.785 (~28.000 eWallet, ~7% populasi) | BFSB, 2021 |
| Limit e-CNY (anonim tertinggi) | Rp 2.000 transaksi, saldo 10.000 yuan | — |
| Limit e-CNY (KYC penuh) | Rp 50.000 transaksi, saldo 500.000 yuan | — |

#### 4.4 Dimensi Desain yang Dibahas
| Dimensi | Posisi Aryani (2023) |
|---------|----------------------|
| **Privasi** | Trade-off anonimitas vs AML/CFT; anonimitas berjenjang untuk transaksi kecil direkomendasikan |
| **Programmability** | Didukung melalui *smart contract*; fitur nilai tambah Digital Rupiah |
| **Offline** | Dirancang untuk r-Digital Rupiah; e-CNY satu-satunya yang sukses menerapkan |
| **Cross-border** | 3i (Integration, Interoperability, Interconnection); kerja sama IMF, BIS, World Bank |
| **Intermediasi** | Model hybrid 1-tier + 2-tier; grosir langsung dari BI, ritel via PSP |
| **Tiered wallets** | **Direkomendasikan** mengikuti eNaira (5 tingkat), Sand Dollar (2 tingkat), e-CNY (berjenjang) |
| **KYC** | Berjenjang: anonimitas lebih tinggi untuk limit rendah, KYC penuh untuk limit tinggi/merchant |
| **Tokenisasi** | Didukung; komponen kunci untuk DvP dan sekuritas digital |
| **Legal tender** | UU Valuta 7/2011 hanya mengatur Rupiah fisik; perlu amandemen untuk CBDC |

#### 4.5 Rekomendasi untuk r-Digital Rupiah
1. Uji purwarupa (pilot test) komprehensif sebelum implementasi penuh.
2. Kolaborasi internasional untuk interoperabilitas *cross-border*.
3. Privasi & keamanan data sebagai prioritas.
4. Kerangka regulasi yang kuat (verifikasi identitas, pemantauan transaksi).
5. Edukasi dan kesadaran publik.
6. Desain dompet berjenjang mengikuti best practice antarnegara.

### 5. Konteks Indonesia-Spesifik
- Referensi BI Reg. 20/6/PBI/2018: limit uang elektronik tak terdaftar Rp2.000.000; terdaftar Rp10.000.000; bulanan Rp20.000.000 → dapat menjadi proksi limit dompet berjenjang.
- UU 7/2011 (UU Valuta) belum mengakomodasi CBDC sebagai alat tukar resmi.
- UU 4/2023 (P2SK) Bagian 6 "Rupiah Digital" menjadi dasar hukum baru.
- Literatur CBDC Indonesia didominasi penelitian BI sendiri → bias potensial.

### 6. Limitasi yang Disebutkan
- Literatur CBDC konteks Indonesia **sangat terbatas** dan didominasi oleh BI.
- *White paper* adalah desain awal → banyak celah dan *missing links*.
- Tidak ada pendekatan berbasis pengguna/partisipasi publik.
- Hanya tinjauan literatur → tidak ada validasi empiris/PoC.
- Detail desain r-Digital Rupiah **belum dijabarkan** secara komprehensif di *white paper*.

### 7. Negara Pembanding yang Dianalisis
| Negara | CBDC | Status | Platform/Teknologi |
|--------|------|--------|--------------------|
| Nigeria | eNaira | Issued (2021) | Bitt Inc. DCMS + **Hyperledger Fabric** |
| Bahamas | Sand Dollar | Issued (2020) | DLT (NZIA Ltd.) |
| China | e-CNY | Pilot | Sistem terpusat PBOC (bukan DLT publik) |
| Singapura | Project Orchid | R&D | DLT + non-DLT (Purpose Bound Money) |

---

## PDF 2: Project Garuda — Wholesale Rupiah Digital Cash Ledger Proof of Concept Report

### 1. Identitas Publikasi
| Atribut | Nilai |
|---------|-------|
| Judul | Project Garuda: Proof of Concept (PoC) Report — Wholesale Rupiah Digital Cash Ledger |
| Penulis | Bank Indonesia (Tim Project Garuda) |
| Koordinator | Endang Trianti, Dicky Kartikoyono |
| Kontributor | Rohadi Triatmono, Ryan Rizaldy, Yudi Muliawirawan Sugalih |
| Tim Penulis | Setyo Kuncoro, Bagas Aji Pratama, Kevin Eza Rizky, Timothy Thamrin Andrew H. Sihombing, et al. |
| Jenis | Laporan PoC resmi (techreport) |
| Institusi | Bank Indonesia |
| Tahun | Desember 2024 |
| Kunci sitasi | `bi_garuda_poc` |

### 2. Tujuan dan Lingkup
- **Tujuan**: Mengidentifikasi solusi teknologi paling sesuai untuk platform **wRD (wholesale Rupiah Digital) Cash Ledger**.
- **Lingkup**: **Wholesale CBDC** (bukan ritel). Fokus pada tahap *Immediate State* dari peta jalan Project Garuda.
- **Tiga proses bisnis yang diuji**: penerbitan (issuance), penebusan (redemption), dan transfer dana (fund transfer).
- **Tiga Key Questions (KQ)**:
  1. Bagaimana DLT dapat diimplementasikan untuk model bisnis wRD?
  2. Apa nilai tambah *smart contract* pada wRD?
  3. Bagaimana wRD terhubung dengan sistem konvensional, internal BI, *cross-border*, dan DLT lain (3i)?

### 3. Metodologi PoC
- **Tahapan PoC**: Pre-PoC (definisi skenario) → Main PoC (build & eksekusi paralel) → Post-PoC (analisis & laporan).
- **Pendekatan**: Agile dan iteratif; dikembangkan oleh *principal* teknologi bersangkutan.
- **Skenario uji**: **55 skenario** dibagi aspek bisnis (fungsional) dan teknis (non-fungsional).
- **Evaluasi teknis**: fokus pada *resilience*, *privacy*, dan *performance*.
- **Workstream**: WS1 (bisnis), WS2 (teknologi), WS3 (regulasi).

### 4. Platform Evaluasi dan Seleksi Teknologi
- **Long list**: 39 platform DLT potensial (per Oktober 2023).
- **Short list**: 5 platform yang sudah dipakai bank sentral/lembaga keuangan internasional untuk CBDC.
- **Final selection**: 2 platform berdasarkan 3 kriteria:
  1. **Mandatory**: didukung perusahaan badan hukum + *permissioned network*.
  2. **Track record**: lebih sering dipakai di proyek CBDC/sekuritas digital.
  3. **Compatibility**: perbedaan struktur *ledger*, solusi privasi, dan konsensus.

#### Platform yang Dipilih
| Aspek | R3 Corda | Kaleido Hyperledger Besu |
|------|----------|--------------------------|
| Pengembang | R3 | Kaleido |
| Versi | 4.10 | 24.3.0 |
| Struktur ledger | **UTXO** (Unspent Transaction Output) | **Account-based** |
| Konsensus | **Notary** (central uniqueness validator) | **QBFT / PoA** (Quorum Byzantine Fault Tolerance) |
| Privasi | *Need-to-know*; vault per peserta | *Global ledger* + enkripsi + private data manager |
| Struktur data | Directed Acyclic Graph (DAG) | Blockchain (blok terhubung) |
| Token SDK | Token SDK | ERC-20 (Rupiah Digital) + ERC-1400 (sekuritas) |

> **Penting**: PoC Garuda menggunakan **R3 Corda** dan **Hyperledger Besu**, BUKAN Hyperledger Fabric. Skripsi ini menggunakan **Hyperledger Fabric** — perbedaan platform yang relevan untuk perbandingan.

### 5. Hasil Kuantitatif (Load Test — Appendix I)

| Metrik | R3 Corda | Kaleido Hyperledger Besu |
|--------|----------|--------------------------|
| **Throughput** | **37 TPS** | **39 TPS** |
| Threshold target | ~30 TPS (lalu lintas grosir tipikal) | ~30 TPS |
| Status | **Memenuhi threshold** | **Memenuhi threshold** |
| Alat ukur | Locust Dashboard + AWS CloudWatch | Locust Dashboard + AWS CloudWatch |

**Catatan**:
- Load test fokus pada threshold ~30 TPS karena keterbatasan waktu PoC.
- Kemampuan maksimum belum diuji secara penuh — perlu eksplorasi lanjutan.
- Konfigurasi: minimum AWS cloud infrastructure; on-premise tidak dieksplorasi.
- Jaringan R3 Corda: 1 klaster BI (6 node) + 3 klaster bank grosir (1 node each).
- Jaringan Besu: 1 klaster BI + 3 klaster bank grosir (validator).
- ZKP (Zero Knowledge Proof) menambah ~2 detik per transaksi (eksperimen Kaleido).

### 6. Arsitektur Sistem (6 Lapisan + 1 Aspek)

| Lapisan | Fungsi |
|---------|--------|
| Use Case Layer | Aplikasi di atas DLT (issuance, redemption, fund transfer) |
| Digital Asset Layer | Aset digital (token Rupiah Digital, sekuritas) |
| Execution Layer | Eksekusi program (smart contract) |
| Data Layer | Penyimpanan data (database, struktur DLT) |
| Consensus Layer | Persetujuan penambahan blok |
| Network Layer | Konektivitas node, protokol |
| Security (aspek) | Keamanan menyeluruh |

#### Node dan Peran
- **Master Node (BI)**: KDR (Khazanah Digital Rupiah — penerbit/penebus), Regulator, Observer, Administrator, Provider.
- **Participant Nodes**: Validating (Full), Non-Validating (Light), No-Node (Multitenancy).

### 7. Hasil Utama (Findings)
1. **DLT dapat secara efektif mendukung implementasi wRD cash ledger** menggunakan *smart contract* dan konsensus.
2. **Smart contract memberikan nilai tambah**: *programmability*, *composability*, *tokenization* → atomik *settlement* (DvP).
3. **Konektivitas 3i tercapai**: integrasi BI-RTGS via API, ISO 20022, *cross-border*.

### 8. Limitasi dan *Next Step*
- **Privacy**: masih perlu eksplorasi ZKP lebih lanjut; model *Confidential UTXO* dengan Notary menjadi *single point of failure*.
- **Liquidity management**: *Liquidity Saving Mechanism* (LSM) belum diimplementasi penuh.
- **Multi-validator deployment**: belum dieksplorasi mendalam.
- **On-premise configuration**: tidak diuji.
- **Maximum TPS**: belum ditemukan — load test hanya membuktikan threshold 30 TPS tercapai.
- **Next Step**: ekspansi ke *securities ledger* (Intermediate State), LSM, ZKP parallelism.

### 9. Dimensi Desain yang Dibahas
| Dimensi | Posisi PoC Garuda (2024) |
|---------|--------------------------|
| **Privasi** | *Need-to-know* (Corda) / Enkripsi+PDM (Besu); ZKP untuk masa depan |
| **Programmability** | *Smart contract* (CorDapp / Contract Management); dipastikan layak |
| **Offline** | **Tidak dibahas** (wholesale only) |
| **Cross-border** | ISO 20022 messaging; konektivitas via API |
| **Intermediasi** | Model *wholesale two-tier*: BI → wholesaler (validating node) → end user |
| **Tiered wallets** | **Tidak ada** (wholesale; tidak ada dompet ritel berjenjang) |
| **KYC** | **Tidak dibahas eksplisit** (wholesale; keanggotaan via registrasi BI) |
| **Tokenisasi** | UTXO (Corda) / ERC-20 + ERC-1400 (Besu) |
| **DvP** | Disebut sebagai use case Intermediate State; belum diuji di Immediate State |

---

## Ringkasan Perbandingan: Dua PDF vs Skripsi Ini

| Dimensi | Aryani (2023) — PDF 1 | PoC Garuda (2024) — PDF 2 | **Skripsi ini** |
|---------|----------------------|--------------------------|-----------------|
| **Jenis CBDC** | Ritel (analisis konseptual) | Grosir (PoC eksperimen) | **Ritel** (purwarupa) |
| **Metodologi** | Tinjauan literatur kritis | PoC dengan 55 skenario uji | Implementasi + Caliper |
| **Platform DLT** | Tidak dieksperimenkan (konseptual) | R3 Corda + Hyperledger Besu | **Hyperledger Fabric** |
| **Topologi** | N/A | 1 klaster BI + 3 bank grosir | 5 organisasi + 1 orderer |
| **Konsensus** | N/A | Notary / QBFT (PoA) | **Raft** (etcdraft) |
| **Throughput** | Kutipan: ~20 TPS (DLT), 65K (VISA) | **37 TPS (Corda), 39 TPS (Besu)** | Dari Caliper (10–150 TPS) |
| **Dompet berjenjang** | Direkomendasikan (eNaira, e-CNY) | Tidak ada (wholesale) | **BASIC, STANDARD, MERCHANT** |
| **KYC** | Direkomendasikan berjenjang | Tidak dibahas | **Off-chain + on-chain anchor** |
| **Offline** | Direkomendasikan untuk r-CBDC | Tidak dibahas | Tidak diimplementasikan |
| **Cross-border** | 3i (Integration, Interop., Interconn.) | ISO 20022 + API | Tidak diimplementasikan |
| **Smart contract** | Konseptual: programmability + DvP | CorDapp / ERC-20 + ERC-1400 | Chaincode Go (digital-rupiah) |
| **Basis data status** | N/A | Database + DAG (Corda) / Blockchain (Besu) | **CouchDB** |
| **Privasi** | Trade-off anonimitas vs AML/CFT | Need-to-know / Enkripsi+ZKP | MVCC + endorsement policy |
| **Legal** | UU 7/2011 perlu amandemen; UU 4/2023 | UU 4/2023 (P2SK) Bagian 6 | Mengacu BI Reg. |

### Titik Temu dan Pembeda Kunci untuk Diskusi

**Titik temu**:
1. Ketiganya sepakat bahwa DLT *permissioned* cocok untuk CBDC Indonesia.
2. Skripsi dan Aryani sama-sama mengisi celah ritel yang belum dicerita oleh PoC Garuda (wholesale).
3. Prinsip dompet berjenjang yang direkomendasikan Aryani (mengikuti eNaira/e-CNY) **diimplementasikan** di skripsi ini.

**Pembeda**:
1. Skripsi memakai **Hyperledger Fabric** (berbeda dari Corda/Besu di PoC Garuda) → menambah variasi evaluasi platform DLT untuk konteks Indonesia.
2. Skripsi fokus pada **ritel end-user** (pelanggan, pedagang) sedangkan PoC Garuda pada **interbank wholesale**.
3. Skripsi mengukur kinerja dengan **Caliper** dengan beban ritel (P2P, pelanggan-ke-pedagang, baca dompet), bukan beban grosir (issuance, redemption, fund transfer antarbank).
4. Skripsi mengimplementasikan **KYC berjenjang on-chain** yang tidak ada di kedua referensi.
