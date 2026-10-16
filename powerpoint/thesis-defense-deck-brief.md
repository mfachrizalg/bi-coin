# Brief for Claude for PowerPoint — bi-coin skripsi defense deck

**How to use this file:** open `Presentasi Skripsi_Muhammad Fachrizal Giffari.pptx`
in PowerPoint, invoke Claude for PowerPoint, and feed it this file slide by
slide (or in a few batches). Every instruction says "keep the existing
layout" — the goal is to reuse the current design (colors, section tracker,
box/table styling, fonts) and only replace the text/data/images. Slides not
listed below (the original slides 30–35 ROC-curve set, the polynomial-filter
verification slide, and the station-map photo slide) should be **deleted** —
noted explicitly at the point in the sequence where they used to sit.

Image files referenced below are in:
`/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/tmp/deck-brief/slide_figures/` (rendered from thesis TikZ sources, 300dpi PNG)
`/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-4/generated/` (Caliper charts)
`/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/figures/activity/` and `/reference/` (activity diagrams, comparison refs)

---

## SECTION: PENDAHULUAN

### Slide 1 — Title
Replace the title-slide text. Keep the `www.ugm.ac.id` header and "Locally
Rooted, Globally Respected" tagline as-is (UGM branding, applies to this
thesis too).

- Title: **Rancang Bangun Rupiah Digital Ritel Berbasis Hyperledger Fabric**
- Dosen Pembimbing I: Teguh Bharata Adji, S.T., M.T., M.Eng., Ph.D.
- Dosen Pembimbing II: Dr. Ir. Guntur Dharma Putra, S.T., M.Sc.
- Disusun oleh: Muhammad Fachrizal Giffari – 22/504570/TK/55192

### Slide 2 — Outline
No content change needed — the outline already reads: Pendahuluan, Dasar
Teori, Metodologi, Hasil, Kesimpulan.

### Slide 3 — Hook: transformasi pembayaran digital
Replace this slide's body text with the following, keep existing box/panel
layout:

- Transformasi digital sistem pembayaran Indonesia berlangsung cepat; BSPI
  menempatkan digitalisasi sebagai agenda menjaga kedaulatan moneter dan
  inklusi keuangan.
- Risiko baru: penetrasi internet 74% (204,7 juta pengguna, 2022),
  kapitalisasi pasar kripto global tumbuh 1.393% (2019–2021), investor
  kripto Indonesia 16,3 juta (September 2022, tumbuh 81,6% YoY) — memicu
  *cryptoization*, *shadow currency*, *shadow central banking*.
- CBDC menjaga kepercayaan publik dan kedaulatan moneter; Indonesia
  menamainya Rupiah Digital (Proyek Garuda), bertahap dari w-Digital
  Rupiah menuju r-Digital Rupiah, model *two-tier*.
- Hyperledger Fabric dipilih: *permissioned blockchain* matang untuk
  sektor keuangan (MSP, channel, execute-order-validate, tanpa PoW).

### Slide 4 — 4-panel hook: mengapa purwarupa ini
Replace the 4-panel layout content with:

1. **Pentingnya CBDC ritel** — instrumen pembayaran digital sah yang
   menjaga kedaulatan moneter di tengah cryptoization.
2. **Mengapa Hyperledger Fabric** — permissioned, MSP-based identity,
   execute-order-validate, tanpa proof-of-work, cocok sektor keuangan.
3. **Masalah teknis** — penerbitan berjenjang, otorisasi organisasi,
   keselamatan transfer, dan pengawasan harus ditegakkan di lapisan
   *chaincode*, bukan hanya dijelaskan sebagai kebijakan.
4. **Solusi** — purwarupa terintegrasi (penerbitan → distribusi →
   transfer ritel → pengawasan) dievaluasi kinerjanya dengan Hyperledger
   Caliper.

### Slide 5 — Celah Penelitian
Replace body text:

- **Sudah mapan/dikaji**: konsep CBDC, model dua jenjang, dan Hyperledger
  Fabric sebagai platform *permissioned blockchain* sudah banyak dibahas
  literatur.
- **Celah yang diisi penelitian ini**: belum ada purwarupa CBDC ritel yang
  mengintegrasikan penerbitan dan distribusi berjenjang, transfer ritel,
  pengawasan, dan batas wewenang organisasi dalam satu sistem Hyperledger
  Fabric yang diuji dengan protokol Caliper terukur.

### Slide 6 — Rumusan Masalah
Replace with 2 numbered items (verbatim from thesis Ch1):

1. Bagaimana merancang dan membangun sistem Rupiah Digital ritel berbasis
   Hyperledger Fabric yang mendukung model penerbitan dan distribusi
   likuiditas berjenjang dari Bank Indonesia menuju bank, PJP, dan
   pelanggan ritel, serta transfer ritel dan pengawasan transaksi dengan
   batas wewenang organisasi yang jelas?
2. Bagaimana kinerja sistem yang dibangun dari sisi *throughput* dan latensi
   pada berbagai skenario beban transaksi yang diukur menggunakan
   Hyperledger Caliper?

### Slide 7 — Tujuan Penelitian
Replace with 2 numbered items:

1. Merancang dan membangun purwarupa sistem Rupiah Digital ritel berbasis
   Hyperledger Fabric dengan arsitektur multipihak yang mendukung penerbitan,
   distribusi likuiditas berjenjang, transfer ritel, dan pengawasan transaksi
   dengan batas wewenang organisasi yang jelas.
2. Mengevaluasi kinerja sistem (*throughput* dan latensi) pada berbagai
   skenario beban menggunakan Hyperledger Caliper.

### Slide 8 — Batasan Penelitian
Replace with bullets:

- Purwarupa pada jaringan tersimulasi lokal (*container*), bukan sistem
  produksi.
- Hyperledger Fabric versi 2.5, lima organisasi peserta, konsensus Raft
  (etcdraft).
- Fokus pada perancangan, implementasi, dan evaluasi kinerja fungsional;
  aspek hukum dan kebijakan moneter di luar cakupan.
- Evaluasi via Hyperledger Caliper pada satu *host* dan satu *peer* per
  organisasi, dengan 1/2/4 *worker*. Populasi mengikuti konfigurasi profil:
  116 pelanggan, 16 pedagang, dan 52 slot untuk 1 *worker*; 58 pelanggan,
  8 pedagang, dan 26 slot untuk 2 *worker*; serta 29 pelanggan, 4 pedagang,
  dan 13 slot untuk 4 *worker*.
- Profil transfer memakai pemanasan 30 detik pada 10 TPS dan ronde terukur
  120 detik pada 30 serta 60 TPS.
- Tidak mengimplementasikan pembayaran *offline*.
- Satu *application channel*, tanpa *private data collection*.
- Satu *consenter* Raft (tidak toleran kegagalan *orderer*); tidak
  menilai kesiapan produksi.

### Slide 9 — Manfaat Penelitian
Replace with 5 numbered items:

1. Rujukan teoretis perancangan CBDC ritel berbasis *permissioned
   blockchain*.
2. Penjelasan penerapan Hyperledger Fabric untuk memisahkan peran Bank
   Indonesia, peserta distribusi, PJP, dan pengguna ritel.
3. Purwarupa untuk eksperimen teknis penerbitan, distribusi, transfer, dan
   pengawasan.
4. Dasar evaluasi kinerja awal (*throughput*, latensi, dan keberhasilan
   transaksi).
5. Mendukung diskusi teknis pengembangan Rupiah Digital ritel.

---

## SECTION: DASAR TEORI

### Slide 10 — Taksonomi CBDC
Insert image `slide_figures/cbdc-taxonomy-1.png` (or
`cbdc-architecture-types-1.png` if it fits the layout better — pick
whichever matches the slide's box shape). Body text:

- Wholesale vs. retail CBDC: sasaran pengguna berbeda (antarlembaga vs.
  masyarakat luas).
- Model satu jenjang vs. dua jenjang: distribusi langsung bank sentral vs.
  via bank/PJP perantara.
- Account-based vs. token-based: verifikasi identitas+saldo vs. verifikasi
  objek token.
- Arsitektur penerbitan direct/indirect/hybrid: struktur klaim CBDC
  terhadap bank sentral.

### Slide 11 — Blockchain & Hyperledger Fabric
Insert image `slide_figures/blockchain-structure-1.png` and/or
`slide_figures/fabric-architecture-1.png`. Body text:

- DLT & struktur blockchain: *block*, *hash chaining*, *Merkle root/tree*
  untuk integritas.
- Hyperledger Fabric: *framework permissioned blockchain* (*peer*,
  *orderer*, MSP, *channel*, *chaincode*).
- Model *execute-order-validate*; *ledger* = *world state* + *blockchain*
  (CouchDB); MVCC untuk validasi konflik versi.
- Kebijakan *endorsement* kanal menerima satu MSP institusional untuk
  transaksi aplikasi; *lifecycle* chaincode tetap memerlukan BI dan satu
  peserta institusional.

### Slide 12 — Two-Tier CBDC sebagai model utama
Insert image `slide_figures/two-tier-cbdc-1.png`. Body text:

- Model dua jenjang dipilih agar selaras dengan desain Proyek Garuda dan
  mengurangi risiko disintermediasi perbankan.
- Distribusi purwarupa: Treasury Bank Indonesia → bank validator/PJP sebagai
  kustodian → pelanggan ritel. BI tidak mencetak langsung ke dompet ritel.

### Slide 13 — Perbandingan platform DLT dan konsensus
Two tables — use whichever table shapes exist on this slide type, or split
across two slides if the original layout only fits one table per slide.

**Tabel platform DLT** (`tab:platform-dlt`):

| Kriteria | Hyperledger Fabric | R3 Corda | Quorum/Besu | Hyperledger Sawtooth |
|---|---|---|---|---|
| Konsensus | Raft (CFT), pluggable | Notary (CFT) | IBFT/Clique | PoET, Raft |
| Model eksekusi | Execute-order-validate | Flow-based | Order-execute | Order-execute |
| Throughput | >3.500 TPS | ~170 TPS | ~300 TPS (indikatif) | ~1.000 TPS (indikatif) |
| Penerapan CBDC dilaporkan | eNaira | PoC Proyek Garuda | PoC Proyek Garuda | Tidak |

**Tabel konsensus** (`tab:konsensus`):

| Algoritme | Toleransi kesalahan | Throughput | Latensi | Finalisasi |
|---|---|---|---|---|
| Raft | CFT | Tinggi | Rendah | Deterministik |
| PBFT | BFT | Menengah | Menengah | Deterministik |
| HotStuff | BFT | Menengah | Rendah | Deterministik |
| PoW | — | Sangat rendah | Sangat tinggi | Probabilistik |
| PoS/PoA | BFT/CFT | Menengah | Menengah | Semi-deterministik |

Caption note: Fabric (Raft) dipilih karena CFT, deterministik, dan native
pada Fabric, dengan throughput indikatif tertinggi di antara platform
permissioned yang dibandingkan.

### Slide 14 — Otorisasi dan Pengawasan
Body text:

- Model dua jenjang memisahkan penerbit, bank validator, PJP, dan pengguna
  ritel.
- *Backend* memeriksa JWT, peran, dan kepemilikan dompet sebelum mengirim
  transaksi.
- *Chaincode* memeriksa MSP kustodian, status dompet, nilai transfer,
  referensi bisnis, dan kecukupan saldo.
- *Supervisor* mendapat akses baca terhadap rekonsiliasi, metrik, dan
  *event* pengawasan.

### Slide 15 — Metrik evaluasi kinerja
Body text:

- Hyperledger Caliper: *framework benchmark* mengukur *throughput* (TPS),
  latensi, dan tingkat keberhasilan transaksi.
- Rumus tingkat keberhasilan: Rs = N_valid / N_submitted × 100%.
- Caliper dipilih atas BlockBench karena menguji *chaincode* CBDC ritel
  aktual pada satu jaringan Fabric, bukan perbandingan lintas platform.

---

## SECTION: METODOLOGI

### Slide 16 — Alur Penelitian
Insert image `slide_figures/sdlc-prototyping-1.png`. Body text: SDLC
*prototyping* iteratif — analisis kebutuhan → perancangan → implementasi →
evaluasi — dari studi literatur, penentuan metode, pengembangan sistem
(instal Fabric → konfigurasi jaringan → *deploy chaincode* → gateway →
*backend* API), pengujian (fungsional + kinerja Caliper), hingga analisis
hasil.

### Slide 17 — Arsitektur Sistem
Insert image `slide_figures/system-architecture-1.png` (full stack:
client → backend API → Fabric Gateway SDK → Fabric network) and/or
`slide_figures/network-architecture-1.png`. Body text:

- 5 organisasi peserta + 1 *orderer*: BankIndonesiaOrg (penerbit),
  HimbaraBankOrg & CommercialBankOrg (validator), PJPOrg (PJP ritel),
  OJKObserverOrg (*observer*, akses baca).
- Setiap organisasi: MSP + *peer* + CouchDB sendiri; satu *channel*
  `mychannel`, *endorsement* aplikasi dari satu MSP institusional; TLS
  antarnode. *Lifecycle* chaincode memerlukan BI dan satu peserta
  institusional.
- *Backend* API (Go, Gorilla Mux) sebagai *gateway* HTTP → *chaincode*
  via *Fabric Gateway SDK* (gRPC), menegakkan RBAC + validasi JWT.

### Slide 18 — Basis Data Off-chain
Do not reuse the old ERD image because it contains out-of-scope identity and
tiering labels. If the layout requires a visual, draw a simple
`PostgreSQL account data ↔ Backend API ↔ Fabric ledger state` diagram.
Body text:

- PostgreSQL mendukung autentikasi portal dan data akun aplikasi.
- *Ledger* menyimpan status dompet, transaksi, dan *event* pengawasan yang
  diperlukan untuk settlement dan rekonsiliasi.
- Tekankan pemisahan data aplikasi off-chain dari state transaksi on-chain;
  jangan menambahkan klaim tentang data atau kontrol yang tidak diuji.

### Slide 19 — Alur Transfer dan Validasi
Replace the tier table with a four-step flow:

1. Backend memvalidasi JWT, peran, dan kepemilikan dompet.
2. Chaincode memvalidasi MSP kustodian, status dompet, nilai positif, dan
   referensi bisnis.
3. Chaincode membaca saldo, menulis perubahan pengirim dan penerima secara
   atomik, lalu mencatat histori transaksi.
4. Fabric MVCC memvalidasi versi state sebelum transaksi di-*commit*.

### Slide 20 — Fungsi Chaincode Kunci
Insert image `slide_figures/account-token-payment-1.png`. Body text:

- `Mint` / `RequestIssuance`, `Burn` / `RequestRedemption`,
  `DistributeToParticipant` — penerbitan dan distribusi berjenjang.
- `Transfer` — satu fungsi untuk C2C dan C2M; memeriksa otorisasi, MSP
  kustodian, status dompet, nilai transfer, referensi bisnis, dan saldo.
- `GetReconciliationReport`, `GetMetrics`, dan
  `GetSupervisionEvents` — menyediakan jalur baca pengawasan.

### Slide 21 — Lingkungan Uji
Table:

| Komponen | Spesifikasi |
|---|---|
| Perangkat keras | Intel Core i7-7700HQ, 4 inti fisik/8 utas, 2,80 GHz, RAM 15,52 GiB |
| Runtime | Node.js 22.23.2, npm 10.9.8, Docker client 29.5.3 / Engine 29.8.1 |
| Hyperledger Fabric / CouchDB | 2.5 / 3.2, konsensus Raft (etcdraft) |
| Chaincode | digital-rupiah v3.0 (Go, sequence 1) |
| Benchmark | Hyperledger Caliper 0.6.0 |

### Slide 22 — Unit Test Suite
Reuse the original deck's "verification stages" visual style but for tests
instead of math. Body text:

- Chaincode: 1 paket, memvalidasi siklus hidup peserta, pembuatan dompet,
  jalur berhasil/tolak transfer, dan pembaruan state.
- Backend: 6 paket, memvalidasi dispatch layanan, urutan argumen,
  kepemilikan dompet, penerbitan, penebusan, dan distribusi.
- Tampilkan pemisahan hasil uji pada slide berikutnya: backend 76 pengujian
  dan chaincode 58 pengujian, semuanya lulus.
- Tekankan bahwa unit test mendukung verifikasi logika prototipe, bukan bukti
  validasi menyeluruh atau kesiapan produksi.
- Exact pass counts belong on the Results slide (25), not here — Ch3 only
  describes scope, Ch4 has the numbers.

### Slide 23 — Konfigurasi Benchmark Caliper
Table (`tab:laju`):

| Profil | Worker | Durasi/jumlah | Laju | Komposisi |
|---|---|---|---|---|
| Transfer terisolasi | 1 | 120 detik | 20 / 75 / 150 TPS | Rp100, kontensi rendah dan tinggi, lima pengulangan |
| Kalibrasi transfer | 2 | 5×60 detik | 30 / 40 / 50 TPS | Rp1.000, transfer ritel terisolasi |
| Pengganti distribusi | 1 | 5×120 detik | 75 TPS | Rp1.000, lima pengulangan |
| Pengganti penebusan | 1 | 5×120 detik | 20 TPS | Rp1.000, lima pengulangan |
| Fungsional | 2 | 168 tx | 5–30 TPS | Penerbitan, transfer, moneter, pengawasan |
| Otorisasi | 1 | 1 tx | 5 TPS | MSP pemanggil tidak cocok dengan kustodian |
| Agregat overspend | 4 | 200 tx | 80 TPS | Rp200.000 diminta dari saldo awal Rp50.000 |

Note: selain manifes final, studi pengganti memiliki manifes sumber dan artefak
tersendiri. Jumlah Rp100 adalah kontrol sintetis di bawah batas harian STANDARD,
bukan representasi nominal pembayaran ritel.

---

## SECTION: HASIL

### Slide 24 — Hasil Pengujian Fungsional & Negative-path
Body text:

- Skenario otorisasi: satu transfer dengan MSP pemanggil yang tidak cocok
  dengan MSP kustodian ditolak; saldo pengirim Rp100.000 dan penerima Rp0
  tidak berubah, *infrastructure error* = 0, oracle PASS.
- Overspend/kontensi: **10 dari 200 transfer dikomit, 190 ditolak**;
  permintaan total Rp200.000 melebihi saldo awal Rp50.000 dan saldo akhir
  tetap Rp40.000.

### Slide 25 — Hasil Unit Test
Body text:

- **Backend: 76 pengujian pada 6 paket, lulus semua.**
- **Chaincode: 58 pengujian pada 1 paket, lulus semua.**
- Mendukung kebenaran logika layanan backend dan aturan bisnis chaincode
  pada purwarupa — bukan bukti validasi menyeluruh atau kesiapan produksi.

### Slide 26 — Hasil Kinerja: Kontensi dan Batas Kebijakan
Do not reuse the historical mixed-workload throughput chart. Use a clean table
from the replacement studies. Values are medians across five repetitions:

| Profil | Target | Achieved TPS | Sukses (%) | p95 (s) |
|---|---:|---:|---:|---:|
| Rp100 rendah | 20 TPS | 20,01 | 100,00 | 0,63 |
| Rp100 tinggi | 20 TPS | 2,01 | 10,04 | 0,59 |
| Rp100 rendah | 75 TPS | 8,88 | 11,85 | 7,77 |
| Rp100 tinggi | 75 TPS | 4,82 | 6,42 | 0,45 |
| Rp100 rendah | 150 TPS | 5,57 | 4,29 | 10,17 |
| Rp100 tinggi | 150 TPS | 0,99 | 1,00 | 4,62 |

Add a footnote: the Rp100 protocol removes the Rp10 million daily-cap
confounder. At 20 TPS, the low/high comparison isolates shared-key contention;
at 75 and 150 TPS, both modes expose prototype saturation. Failure categories
are MVCC read conflict and gateway-concurrency limit.

### Slide 27 — Pemakaian Sumber Daya Docker
Replace the old repeatability chart with a compact resource summary from the
replacement manifests:

| Evidence | Coverage |
|---|---|
| Prometheus | Host, Fabric containers, disk, network, and Caliper client |
| Per-run artifacts | 26 Rp1.000 runs + 30 Rp100 runs |
| Validation | Both replacement studies `valid: true` |

Caption note: resource telemetry is retained per run; do not convert monitored
container values into whole-host utilization or production capacity.

### Slide 28 — Interpretasi Hasil
Body text:

- Pada 20 TPS, transfer Rp100 rendah mencapai 20,01 TPS dan 100% keberhasilan;
  transfer Rp100 tinggi hanya mencapai 2,01 TPS dan 10,04% keberhasilan.
- Pada 75 dan 150 TPS, kedua mode gagal memenuhi gerbang keberlanjutan.
- Profil otorisasi menolak MSP pemanggil yang tidak sesuai tanpa mengubah
  saldo.
- Profil *overspend* mengomit 10 dari 200 permintaan dan menjaga saldo akhir
  Rp40.000; kegagalan pengujian pengganti diklasifikasikan sebagai konflik
  MVCC atau batas konkurensi gateway.

### Slide 29 — Perbandingan dengan Penelitian Lain
Table (`tab:perbandingan-cbdc`, condense to fit):

| Dimensi | Aryani (2023) | PoC Garuda (2024) | Penelitian ini |
|---|---|---|---|
| Jenis CBDC | Ritel (konseptual) | Grosir (PoC eksperimental) | Ritel (purwarupa) |
| Metodologi | Tinjauan literatur | PoC eksperimental | Purwarupa fungsional + Caliper |
| Platform DLT | Tidak dievaluasi | R3 Corda + Hyperledger Besu | Hyperledger Fabric |
| Transfer ritel | Direkomendasikan | Tidak diuji | Antarpelanggan dan pelanggan–pedagang |
| Metrik kinerja | Kutipan sekunder | Corda 37 TPS, Besu 39 TPS | Kontrol Rp100: 20,01 TPS rendah vs 2,01 TPS tinggi pada 20 TPS; lima pengulangan |

Optionally insert `figures/reference/aryani2023-cbdc-architecture.png` if
there's an image slot on this slide's layout.

### Slide 30 — Diskusi
Body text:

- Pada 20 TPS, kontrol Rp100 rendah mencapai 100% keberhasilan, sedangkan
  kontensi tinggi hanya 10,04%.
- Failure logs mengklasifikasikan konflik MVCC dan batas konkurensi gateway;
  jangan menambahkan diagnosis peer di luar kategori yang tercatat.
- Nilai sumber daya berasal dari pemantauan kontainer, bukan pemakaian seluruh
  host dan bukan estimasi kapasitas nasional.
- Sepuluh dari 200 transaksi overspend dikomit dan saldo akhir Rp40.000;
  hasil ini bukan pembuktian formal anti-*double-spend*.
- Angka Caliper mengukur performa purwarupa pada lingkungan lokal, bukan bukti
  kesiapan produksi atau keamanan formal.

---

## SECTION: KESIMPULAN

### Slide 31 — Kesimpulan
Body text:

1. Berhasil merancang/membangun purwarupa dua jenjang (BI, bank
   validator, PJP, pengguna ritel) pada Hyperledger Fabric 2.5, lima
   organisasi, backend Go, CouchDB, dan PostgreSQL.
2. Kepemilikan pada backend dan pemeriksaan MSP pada chaincode menjaga batas
   otorisasi; jalur transfer dan pengawasan dapat dijalankan pada purwarupa.
3. Kontrol Rp100 pada 20 TPS memisahkan kontensi: profil rendah mencapai
   20,01 TPS dan 100% keberhasilan, sedangkan profil tinggi hanya mencapai
   2,01 TPS dan 10,04%. Pada 75 dan 150 TPS, kedua profil tidak memenuhi
   gerbang keberlanjutan. Sepuluh dari 200 transaksi overspend dikomit dan
   saldo akhir Rp40.000; semua angka adalah garis dasar lokal.

### Slide 32 — Saran
Condense to ~6 items:

1. Mengulang protokol Caliper pada perangkat keras dan topologi terdistribusi.
2. Menelusuri konflik MVCC, batas konkurensi gateway, dan kegagalan siklus
   hidup chaincode dengan instrumentasi klien, peer, dan orderer yang lebih rinci.
3. Memperluas pengujian worker, pengulangan, dan *clean-ledger* dengan
   interval kepercayaan serta latensi persentil ke-95/ke-99.
4. Mengevaluasi *private data collections* atau mekanisme privasi lain untuk
   data yang tidak semestinya berada pada kanal bersama.
5. Mengembangkan pembayaran *offline* serta integrasi BI-RTGS dan BI-FAST pada
   penelitian terpisah.

### Slide 33 — Terima Kasih
No content change — closing slide as-is.

---

## Slides to delete from the original deck

The following original slides have no bi-coin analog and fold into the
mapping above instead — delete them:

- Original slides 30–35 (6 near-duplicate "Kurva ROC" per-scenario
  slides) → replaced by the 2 chart slides (26, 27) above.
- Original slide 18 (polynomial-filter-vs-ideal verification slide) →
  folded into slide 22 (Unit Test Suite) above.
- Original slide 22 (station-map photo slide, "Sebaran 20 Stasiun
  Pengamatan") → dropped, no bi-coin equivalent.
