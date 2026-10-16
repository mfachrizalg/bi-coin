# Ready-to-paste prompts for Claude for PowerPoint — bi-coin defense deck

Send **Step 0** first (deletes the 3 no-analog slide groups so the deck settles at 33 slides). Then send each numbered prompt below in order, one per message, waiting for it to finish before the next. Each prompt is self-contained — content is copied in full, not referenced by file.

## Figure placement rules

All presentation figures are in `slide_figures/`; use the PNGs listed in
`slide_figures/README.md`. Keep the existing theme, section tracker, and slide
margins unchanged. For every inserted figure:

- Preserve the PNG aspect ratio; never stretch, crop, rotate, or place it
  behind another object.
- Keep the figure inside the main content area, above the bottom section
  tracker, with at least 0.15 in of clearance from titles, bullets, and edges.
- Use the largest size that leaves body text readable: normally 55--65% of
  the slide width for one figure, or 42--48% per figure for two figures.
- Align one-figure slides to the visual center; align two-figure slides to a
  common top edge and equal height. Keep captions directly below the figure.
- If the existing layout cannot fit the figure and text at readable size,
  reduce body copy or split the visual across the explicitly permitted slides;
  do not shrink the figure below readable labels.

## Step 0 — delete slides with no bi-coin analog

```
In the open presentation, delete these slides: the 6 near-duplicate "Kurva ROC" slides (per-scenario ROC curve charts, currently forming a block together), the single slide comparing the polynomial filter against the ideal filter ("Filter Polinomial sebagai Pembanding"), and the single slide showing a station/sensor map ("Sebaran 20 Stasiun Pengamatan"). Do not touch any other slide yet.
```

## SECTION: PENDAHULUAN

### Slide 1 — Title

```
Edit the current slide (slide 1 in the presentation, titled or about "Title"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace the title-slide text. Keep the `www.ugm.ac.id` header and "Locally
Rooted, Globally Respected" tagline as-is (UGM branding, applies to this
thesis too).

- Title: **Rancang Bangun Rupiah Digital Ritel Berbasis Hyperledger Fabric**
- Dosen Pembimbing I: Teguh Bharata Adji, S.T., M.T., M.Eng., Ph.D.
- Dosen Pembimbing II: Dr. Ir. Guntur Dharma Putra, S.T., M.Sc.
- Disusun oleh: Muhammad Fachrizal Giffari – 22/504570/TK/55192
```

### Slide 2 — Outline

```
Edit the current slide (slide 2 in the presentation, titled or about "Outline"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

No content change needed — the outline already reads: Pendahuluan, Dasar
Teori, Metodologi, Hasil, Kesimpulan.
```

### Slide 3 — Hook: transformasi pembayaran digital

```
Edit the current slide (slide 3 in the presentation, titled or about "Hook: transformasi pembayaran digital"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

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
```

### Slide 4 — 4-panel hook: mengapa purwarupa ini

```
Edit the current slide (slide 4 in the presentation, titled or about "4-panel hook: mengapa purwarupa ini"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace the 4-panel layout content with:

1. **Pentingnya CBDC ritel** — instrumen pembayaran digital sah yang
   menjaga kedaulatan moneter di tengah cryptoization.
2. **Mengapa Hyperledger Fabric** — permissioned, MSP-based identity,
   execute-order-validate, tanpa proof-of-work, cocok sektor keuangan.
3. **Masalah teknis** — penerbitan dan distribusi berjenjang, batas
   kewenangan organisasi, keselamatan transfer, dan pengawasan harus
   ditegakkan di lapisan *chaincode*.
4. **Solusi** — purwarupa terintegrasi (penerbitan → distribusi →
   transfer ritel → pengawasan) dievaluasi kinerjanya dengan Hyperledger
   Caliper.
```

### Slide 5 — Celah Penelitian

```
Edit the current slide (slide 5 in the presentation, titled or about "Celah Penelitian"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace body text:

- **Sudah mapan/dikaji**: konsep CBDC, model dua jenjang, dan Hyperledger
  Fabric sebagai platform permissioned blockchain sudah banyak dibahas
  literatur.
- **Celah yang diisi penelitian ini**: belum ada purwarupa CBDC ritel yang
  mengintegrasikan penerbitan dan distribusi berjenjang, transfer ritel,
  pengawasan, serta batas kewenangan organisasi dalam satu sistem berbasis
  Hyperledger Fabric yang dievaluasi secara terukur melalui Hyperledger
  Caliper.
```

### Slide 6 — Rumusan Masalah

```
Edit the current slide (slide 6 in the presentation, titled or about "Rumusan Masalah"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace with 2 numbered items (verbatim from thesis Ch1):

1. Bagaimana merancang dan membangun sistem Rupiah Digital ritel berbasis
   Hyperledger Fabric yang mendukung penerbitan oleh Bank Indonesia ke dalam
   Treasury, distribusi langsung kepada bank validator atau PJP sebagai
   kustodian, serta layanan kepada pelanggan ritel, transfer ritel, dan
   pengawasan transaksi dengan batas wewenang organisasi yang jelas?
2. Bagaimana kinerja sistem dari sisi *throughput* dan latensi pada
   berbagai skenario beban transaksi yang diukur menggunakan Hyperledger
   Caliper?
```

### Slide 7 — Tujuan Penelitian

```
Edit the current slide (slide 7 in the presentation, titled or about "Tujuan Penelitian"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace with 2 numbered items:

1. Merancang dan membangun purwarupa sistem Rupiah Digital ritel berbasis
   Hyperledger Fabric dengan arsitektur multipihak yang mendukung penerbitan
   ke Treasury Bank Indonesia, distribusi langsung kepada bank validator atau
   PJP sebagai kustodian, transfer ritel, dan pengawasan transaksi dengan
   batas wewenang organisasi yang jelas.
2. Mengevaluasi kinerja sistem (*throughput* dan latensi) pada berbagai
   skenario beban menggunakan Hyperledger Caliper.
```

### Slide 8 — Batasan Penelitian

```
Edit the current slide (slide 8 in the presentation, titled or about "Batasan Penelitian"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace with bullets:

- Purwarupa pada jaringan tersimulasi lokal (*container*), bukan sistem
  produksi.
- Hyperledger Fabric versi 2.5, lima organisasi peserta, konsensus Raft
  (etcdraft).
- Fokus pada perancangan, implementasi, dan evaluasi kinerja fungsional;
  aspek hukum dan kebijakan moneter di luar cakupan.
- Evaluasi utama memakai Hyperledger Caliper dengan satu *host* dan satu
  *worker* yang dipilih setelah kalibrasi pada 1, 2, 4, dan 8 *worker*.
- Pilot memakai laju tetap 5, 10, 20, 40, 60, 80, 100, dan 150 TPS;
  pengujian utama memakai lima pengulangan per laju dan per jenis transaksi.
- Jenis transaksi diisolasi: penerbitan, distribusi, transfer ritel,
  pembayaran pedagang, penebusan, kueri saldo, pembekuan, dan pembukaan
  pembekuan. Transfer ritel juga memiliki kontensi rendah dan tinggi.
- Beban berkelanjutan berarti minimal 99% penyelesaian berhasil dan p95
  latensi transaksi berhasil paling tinggi 2,5 detik pada kelima pengulangan.
- PostgreSQL/KYC dievaluasi sebagai demonstrasi *end-to-end* terpisah;
  interoperabilitas lintas negara berada di luar benchmark utama.
- Tidak mengimplementasikan pembayaran *offline*.
- Satu *application channel*, tanpa *private data collection*.
- Satu *consenter* Raft (tidak toleran kegagalan *orderer*); tidak
  menilai kesiapan produksi.
```

### Slide 9 — Manfaat Penelitian

```
Edit the current slide (slide 9 in the presentation, titled or about "Manfaat Penelitian"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Pendahuluan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace with 5 numbered items:

1. Rujukan teoretis perancangan CBDC ritel berbasis *permissioned
   blockchain*.
2. Penjelasan penerapan Hyperledger Fabric untuk memisahkan peran Bank
   Indonesia, peserta distribusi, dan pengguna ritel tanpa data identitas
   mentah di *ledger*.
3. Purwarupa untuk eksperimen teknis (penerbitan, transfer, otorisasi,
   pengawasan).
4. Dasar evaluasi kinerja awal (*throughput*, latensi, keberhasilan
   transaksi).
5. Mendukung diskusi teknis pengembangan Rupiah Digital ritel.

---
```

## SECTION: DASAR TEORI

### Slide 10 — Taksonomi CBDC

```
Edit the current slide (slide 10 in the presentation, titled or about "Taksonomi CBDC"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Dasar Teori" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Insert image `slide_figures/cbdc-taxonomy-1.png` (or
`cbdc-architecture-types-1.png` if it fits the layout better — pick
whichever matches the slide's box shape). Place the selected figure centered
in the upper 58% of the content area; put the four bullets in a readable
right-hand or lower text panel without covering the figure or section tracker.
Body text:

- Wholesale vs. retail CBDC: sasaran pengguna berbeda (antarlembaga vs.
  masyarakat luas).
- Model satu jenjang vs. dua jenjang: distribusi langsung bank sentral vs.
  via bank/PJP perantara.
- Account-based vs. token-based: verifikasi identitas+saldo vs. verifikasi
  objek token.
- Arsitektur penerbitan direct/indirect/hybrid: struktur klaim CBDC
  terhadap bank sentral.
```

### Slide 11 — Blockchain & Hyperledger Fabric

```
Edit the current slide (slide 11 in the presentation, titled or about "Blockchain & Hyperledger Fabric"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Dasar Teori" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Insert image `slide_figures/blockchain-structure-1.png` and/or
`slide_figures/fabric-architecture-1.png`. Place both figures side-by-side in
the upper 55% of the content area, aligned to one top edge and sized equally;
put the explanatory bullets below them. If the slide cannot keep labels
readable, use the two permitted figure areas or split the figures across two
slides rather than shrinking them. Body text:

- DLT & struktur blockchain: *block*, *hash chaining*, *Merkle root/tree*
  untuk integritas.
- Hyperledger Fabric: *framework permissioned blockchain* (*peer*,
  *orderer*, MSP, *channel*, *chaincode*).
- Model *execute-order-validate*; *ledger* = *world state* + *blockchain*
  (CouchDB); MVCC untuk validasi konflik versi.
- Kebijakan *endorsement* kanal menerima satu MSP institusional untuk
  transaksi aplikasi; *lifecycle* chaincode tetap memerlukan BI dan satu
  peserta institusional.
```

### Slide 12 — Two-Tier CBDC sebagai model utama

```
Edit the current slide (slide 12 in the presentation, titled or about "Two-Tier CBDC sebagai model utama"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Dasar Teori" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Insert image `slide_figures/two-tier-cbdc-1.png`. Place it centered and large
in the upper 62% of the content area; place the two explanatory bullets in a
short lower text panel above the section tracker. Body text:

- Model dua jenjang dipilih agar selaras dengan desain Proyek Garuda dan
  mengurangi risiko disintermediasi perbankan.
- Distribusi purwarupa: Treasury Bank Indonesia → bank validator/PJP sebagai
  kustodian → pelanggan ritel. BI tidak mencetak langsung ke dompet ritel.
```

### Slide 13 — Perbandingan platform DLT dan konsensus

```
Edit the current slide (slide 13 in the presentation, titled or about "Perbandingan platform DLT dan konsensus"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Dasar Teori" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

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
```

### Slide 14 — Otorisasi dan Pengawasan

```
Edit the current slide (slide 14 in the presentation, titled or about "Otorisasi dan Pengawasan"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Dasar Teori" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Body text:

- Backend memvalidasi JWT, peran pengguna, dan kepemilikan dompet sebelum
  meneruskan permintaan.
- Chaincode memeriksa MSP pemanggil, status dompet, nilai transfer positif,
  referensi bisnis, dan saldo.
- Bank Indonesia, bank/PJP, dan supervisor memiliki batas akses sesuai
  organisasi; supervisor memiliki jalur baca untuk rekonsiliasi.
- Satu kanal bersama tidak memberi privasi antarorganisasi; kebutuhan privasi
  lanjutan tetap menjadi batasan purwarupa.
```

### Slide 15 — Metrik evaluasi kinerja

```
Edit the current slide (slide 15 in the presentation, titled or about "Metrik evaluasi kinerja"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Dasar Teori" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Body text:

- Hyperledger Caliper: *framework benchmark* mengukur *throughput* (TPS),
  latensi, dan tingkat keberhasilan transaksi.
- Offered TPS = transaksi submitted / durasi eksperimen; achieved TPS =
  transaksi successful / durasi eksperimen.
- Untuk setiap sel benchmark, tampilkan lima jumlah: submitted, committed /
  successful, failed, timed out, dan success rate = successful / submitted ×
  100%.
- Latensi didefinisikan eksplisit sebagai `time_final - time_create` pada
  successful completions di Fabric; ini bukan total latensi API + PostgreSQL +
  Fabric. PostgreSQL/KYC dilaporkan sebagai demonstrasi *end-to-end* terpisah.
- Laporkan mean, median/p50, p95, p99, standard deviation, minimum, dan
  maksimum; tampilkan mean dan standard deviation antar lima pengulangan.
- Gunakan taksonomi kegagalan: endorsement failure, MVCC read conflict,
  insufficient balance, authorization failure, wallet-tier limit exceeded,
  KYC rejection, gateway timeout, ordering/commit timeout, connection
  failure, invalid chaincode response, dan Unknown bila bukti log tidak cukup.
  Jangan mengklaim kategori yang tidak didukung log.
- Saturation point adalah laju tertinggi yang tetap memenuhi minimal 99%
  successful completions dan p95 successful latency paling tinggi 2,5 detik
  pada kelima pengulangan; nyatakan offered rate yang terus naik, plateau
  throughput, kenaikan p95/p99, dan kegagalan sebagai indikator pendukung.
- Caliper dipilih atas BlockBench karena menguji *chaincode* CBDC ritel
  aktual pada satu jaringan Fabric, bukan perbandingan lintas platform.

---
```

## SECTION: METODOLOGI

### Slide 16 — Alur Penelitian

```
Edit the current slide (slide 16 in the presentation, titled or about "Alur Penelitian"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Metodologi" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Insert image `slide_figures/sdlc-prototyping-1.png`. Place it on the left
60% of the content area and keep the SDLC explanation in the right 40%;
preserve the figure's labels and leave the bottom tracker unobstructed. Body
text: SDLC
*prototyping* iteratif — analisis kebutuhan → perancangan → implementasi →
evaluasi — dari studi literatur, penentuan metode, pengembangan sistem
(instal Fabric → konfigurasi jaringan → *deploy chaincode* → gateway →
*backend* API), pengujian (fungsional + kinerja Caliper), hingga analisis
hasil.
```

### Slide 17 — Arsitektur Sistem

```
Edit the current slide (slide 17 in the presentation, titled or about "Arsitektur Sistem"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Metodologi" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Insert image `slide_figures/system-architecture-1.png` (full stack:
client → backend API → Fabric Gateway SDK → Fabric network) and/or
`slide_figures/network-architecture-1.png`. Place the system-architecture
figure as the dominant left 58% visual and the network-architecture figure in
the right 42% visual, both aligned at the top; keep the organization bullets
in a narrow lower panel. If only one visual fits, use the system-architecture
figure as the dominant visual and omit the network image; do not overlay or
shrink either figure below readable labels. Body text:

- 5 organisasi peserta + 1 *orderer*: BankIndonesiaOrg (penerbit),
  HimbaraBankOrg & CommercialBankOrg (validator), PJPOrg (PJP ritel),
  OJKObserverOrg (*observer*, akses baca).
- Setiap organisasi: MSP + *peer* + CouchDB sendiri; satu *channel*
  `mychannel`, *endorsement* aplikasi dari satu MSP institusional; TLS
  antarnode. *Lifecycle* chaincode memerlukan BI dan satu peserta
  institusional.
- *Backend* API (Go, Gorilla Mux) sebagai *gateway* HTTP → *chaincode*
  via *Fabric Gateway SDK* (gRPC), menegakkan RBAC + validasi JWT.
```

### Slide 18 — Basis Data Off-chain

```
Edit the current slide (slide 18 in the presentation, titled or about "Basis Data Off-chain"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Metodologi" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Do not reuse the old ERD image because it contains out-of-scope identity and
tiering labels. If the layout requires a visual, draw a simple
`PostgreSQL account data ↔ Backend API ↔ Fabric ledger state` diagram.
Place that replacement diagram centered in the upper half and keep the three
labels horizontal; place the scope bullets below it. Do not place the old ERD
PNG in the slide.
Body text:

- PostgreSQL mendukung autentikasi portal dan data akun aplikasi.
- PostgreSQL mendukung autentikasi portal dan data akun aplikasi.
- \`Ledger\` menyimpan status dompet, transaksi, dan \`event\`
  pengawasan yang diperlukan untuk settlement dan rekonsiliasi.
- Tekankan pemisahan data aplikasi off-chain dari state transaksi on-chain;
  jangan menambahkan klaim tentang data atau kontrol yang tidak diuji.
```

### Slide 19 — Alur Transfer dan Validasi

```
Edit the current slide (slide 19 in the presentation, titled or about "Alur Transfer dan Validasi"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Metodologi" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace the tier table with a four-step flow:

1. Backend memvalidasi JWT, peran, dan kepemilikan dompet.
2. Chaincode memvalidasi MSP kustodian, status dompet, nilai positif, dan
   referensi bisnis.
3. Chaincode membaca saldo, menulis perubahan pengirim dan penerima secara
   atomik, lalu mencatat histori transaksi.
4. Fabric MVCC memvalidasi versi state sebelum transaksi di-`commit`.
```

### Slide 20 — Fungsi Chaincode Kunci

```
Edit the current slide (slide 20 in the presentation, titled or about "Fungsi Chaincode Kunci"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Metodologi" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Insert image `slide_figures/account-token-payment-1.png`. Place it centered in
the left 55% of the content area and place the three function groups in the
right 45%; keep the diagram fully visible and the bottom tracker clear. Body
text:

- `Mint` / `RequestIssuance`, `Burn` / `RequestRedemption`,
  `DistributeToParticipant` — penerbitan dan distribusi berjenjang.
- `Transfer` — satu fungsi untuk C2C dan C2M; memeriksa otorisasi,
  MSP kustodian, status dompet, nilai transfer, referensi bisnis, dan saldo.
- `GetReconciliationReport`, `GetMetrics`, dan
  `GetSupervisionEvents` — menyediakan jalur baca pengawasan.
```

### Slide 21 — Lingkungan Uji

```
Edit the current slide (slide 21 in the presentation, titled or about "Lingkungan Uji"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Metodologi" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Table:

| Komponen | Spesifikasi |
|---|---|
| Perangkat keras | Intel Core i7-7700HQ, 4 inti fisik/8 utas, 2,80 GHz, RAM 15,52 GiB |
| Runtime | Node.js 22.23.2, npm 10.9.8, Docker client 29.5.3 / Engine 29.8.1 |
| Hyperledger Fabric / CouchDB | 2.5 / 3.2, konsensus Raft (etcdraft) |
| Chaincode | digital-rupiah v3.0 (Go, sequence 1) |
| Benchmark | Hyperledger Caliper 0.6.0 |
```

### Slide 22 — Unit Test Suite

```
Edit the current slide (slide 22 in the presentation, titled or about "Unit Test Suite"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Metodologi" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Reuse the original deck's "verification stages" visual style but for tests
instead of math. Body text:

- Chaincode: 1 paket, memvalidasi siklus hidup peserta, pembuatan dompet,
  jalur berhasil/tolak transfer, dan pembaruan state.
- Backend: 6 paket, memvalidasi dispatch layanan, urutan argumen,
  kepemilikan dompet, penerbitan, penebusan, dan distribusi.
- Tampilkan pemisahan hasil uji pada slide Hasil; angka pass count berada di
  slide 25, bukan pada slide metodologi.
- Tekankan bahwa unit test mendukung verifikasi logika prototipe, bukan bukti
  validasi menyeluruh atau kesiapan produksi.
- Exact pass counts belong on the Results slide (25), not here — Ch3 only
  describes scope, Ch4 has the numbers.
```

### Slide 23 — Konfigurasi Benchmark Caliper

```
Edit the current slide (slide 23 in the presentation, titled or about "Konfigurasi Benchmark Caliper"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Metodologi" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Table (`tab:laju`):

| Profil | Worker | Durasi/jumlah | Laju | Cakupan |
|---|---|---|---|---|
| Transfer terisolasi | 1 | 5×120s per sel | 20/75/150 TPS | Rp100, kontensi rendah dan tinggi |
| Kalibrasi worker | 2 | 5×60s per sel | 30/40/50 TPS | Rp1.000, transfer ritel |
| Pengganti distribusi | 1 | 5×120s | 75 TPS | Rp1.000, lima pengulangan |
| Pengganti penebusan | 1 | 5×120s | 20 TPS | Rp1.000, lima pengulangan |
| KYC terpisah | -- | 5 pengulangan | -- | Go/PostgreSQL/KYC *end-to-end* |

The replacement protocol fixes retail transfers at Rp100 to separate the
STANDARD-wallet daily cap from shared-key contention. Rp1.000 replacement runs
cover distribution at 75 TPS, redemption at 20 TPS, and transfer calibration at
30/40/50 TPS. Every confirmatory cell uses five repetitions and reports offered
TPS, achieved TPS, success rate, latency, failure category, and resource traces.

Note: replacement manifests are stored under the two
`statistical-review-replacements-*` result directories; chaincode
`digital-rupiah` v3.0 sequence 1; Fabric latency uses
`time_final - time_create` for successful completions.

---
```

## SECTION: HASIL

### Slide 24 — Hasil Pengujian Fungsional dan Keselamatan Saldo

```
Edit the current slide (slide 24 in the presentation, titled or about "Hasil Pengujian Fungsional dan Keselamatan Saldo"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Hasil" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Body text:

- Profil otorisasi: satu transfer dengan MSP pemanggil yang tidak cocok
  dengan MSP kustodian ditolak; saldo pengirim Rp100.000 dan penerima Rp0
  tidak berubah, *infrastructure error* = 0, oracle PASS.
- Overspend/kontensi: **10 dari 200 transfer dikomit, 190 ditolak**;
  permintaan total Rp200.000 melebihi saldo awal Rp50.000 dan saldo akhir
  tetap Rp40.000.
```

### Slide 25 — Hasil Unit Test

```
Edit the current slide (slide 25 in the presentation, titled or about "Hasil Unit Test"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Hasil" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Body text:

- **Backend: 76 pengujian pada 6 paket, lulus semua.**
- **Chaincode: 58 pengujian pada 1 paket, lulus semua.**
- Mendukung kebenaran logika layanan backend dan aturan bisnis chaincode
  pada purwarupa — bukan bukti validasi menyeluruh atau kesiapan produksi.
```

### Slide 26 — Hasil Kinerja: Kontensi dan Batas Kebijakan

```
Edit the current slide (slide 26 in the presentation, titled or about "Hasil Kinerja: Transfer Dasar"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Hasil" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Use a clean table from the replacement studies. Values are medians across five
repetitions. Define sustainability before showing the numbers: at least 99%
successful completions and p95 successful latency at most 2.5 seconds in all
five repetitions.

| Profil | Target | Achieved TPS | Success | p95 |
|---|---:|---:|---:|---:|
| Rp100 low contention | 20 TPS | 20,01 | 100,00% | 0,63 s |
| Rp100 high contention | 20 TPS | 2,01 | 10,04% | 0,59 s |
| Rp100 low contention | 75 TPS | 8,88 | 11,85% | 7,77 s |
| Rp100 high contention | 75 TPS | 4,82 | 6,42% | 0,45 s |
| Rp100 low contention | 150 TPS | 5,57 | 4,29% | 10,17 s |
| Rp100 high contention | 150 TPS | 0,99 | 1,00% | 4,62 s |

Add a footnote: the Rp100 protocol removes the Rp10 million daily-cap
confounder. At 20 TPS, the low/high comparison isolates shared-key contention;
at 75 and 150 TPS, both modes expose prototype saturation. Failure categories
are MVCC read conflict and gateway-concurrency limit.

Below the table, add a compact outcomes block for each reported sustainable
cell with submitted, committed/successful, failed, timed out, and success rate.
Add a compact latency block with mean, median/p50, p95, p99, standard deviation,
minimum, and maximum. Values must come from `summary.json`; show the mean and
standard deviation across the five repetitions, and do not replace missing
observations with zero.
```

### Slide 27 — Pemakaian Sumber Daya Docker

```
Edit the current slide (slide 27 in the presentation, titled or about "Pemakaian Sumber Daya Docker"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Hasil" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Replace the old repeatability chart with a resource-coverage table:

| Layer | Metrics |
|---|---|
| Host | CPU, memory, network I/O, disk I/O, IOPS, disk latency |
| Fabric containers | CPU, memory, network, IOPS, disk service latency |
| Caliper client | Process CPU |
| PostgreSQL/KYC | CPU, memory, network I/O, disk I/O, IOPS, disk latency when collected |
| Prometheus | Monitoring CPU and memory |

Caption note: report exact mean, p95, and maximum values from
`summary.json`/`resources.csv`; mark a metric as not collected when no source
exists, and do not substitute the old 1/2/4-worker values.
```

### Slide 28 — Interpretasi Hasil

```
Edit the current slide (slide 28 in the presentation, titled or about "Interpretasi Hasil"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Hasil" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

- At 20 TPS, the Rp100 low-contention profile reaches 20,01 TPS and 100%
  success; the paired high-contention profile reaches 2,01 TPS and 10,04%.
- At 75 and 150 TPS, both contention modes fail the sustainability gate.
- Rp1.000 replacement runs cover distribution, redemption, and transfer
  calibration separately; do not merge them with the Rp100 paired table.
- Failure categories are MVCC read conflict and gateway-concurrency limit;
  retain the categories actually observed in the replacement logs.
- Treat the taxonomy as a reporting schema, not as evidence that every category
  occurred. Show only observed categories and retain Unknown when the log does
  not support a narrower reason.
```

### Slide 29 — Perbandingan dengan Penelitian Lain

```
Edit the current slide (slide 29 in the presentation, titled or about "Perbandingan dengan Penelitian Lain"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Hasil" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Table (`tab:perbandingan-cbdc`, condense to fit):

| Dimensi | Aryani (2023) | PoC Garuda (2024) | Penelitian ini |
|---|---|---|---|
| Jenis CBDC | Ritel (konseptual) | Grosir (PoC eksperimental) | Ritel (purwarupa) |
| Metodologi | Tinjauan literatur | PoC eksperimental | Purwarupa fungsional + Caliper |
| Platform DLT | Tidak dievaluasi | R3 Corda + Hyperledger Besu | Hyperledger Fabric |
| Transfer ritel | Direkomendasikan | Tidak diuji | Antarpelanggan dan pelanggan–pedagang |
| Metrik kinerja | Kutipan sekunder | Corda 37 TPS, Besu 39 TPS (Locust) | Five-repetition primary study; sustainable limits by function under a declared 99%/p95 gate |

Optionally insert `figures/reference/aryani2023-cbdc-architecture.png` in a
small right-hand reference panel (maximum 35% of slide width), with the
comparison table kept readable on the left. Omit the image if that panel does
not exist; never overlay it on the table.
```

### Slide 30 — Diskusi

```
Edit the current slide (slide 30 in the presentation, titled or about "Diskusi"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Hasil" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Body text:

- The Rp100 low-contention profile reaches 20,01 TPS and 100% success at 20
  TPS; the paired high-contention profile reaches 2,01 TPS and 10,04%.
- At 75 and 150 TPS, both contention modes fail the sustainability gate.
- Failure logs classify observed failures as MVCC read conflicts or
  gateway-concurrency limits; do not add peer diagnoses absent from the logs.

---
```

## SECTION: KESIMPULAN

### Slide 31 — Kesimpulan

```
Edit the current slide (slide 31 in the presentation, titled or about "Kesimpulan"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Kesimpulan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Body text:

1. Berhasil merancang/membangun purwarupa dua jenjang (BI, bank
   validator, PJP, pengguna ritel) pada Hyperledger Fabric 2.5, lima
   organisasi, backend Go, CouchDB, dan PostgreSQL.
2. Kepemilikan pada backend dan pemeriksaan MSP pada chaincode menjaga batas
   otorisasi; jalur transfer dan pengawasan dapat dijalankan pada purwarupa.
3. The primary study fixes one calibrated worker and five repetitions per load.
   The Rp100 paired control reaches 20,01 TPS with 100% success at 20 TPS under
   low contention, but only 2,01 TPS and 10,04% under high contention. At 75 and
   150 TPS, both modes fail the sustainability gate.
```

### Slide 32 — Saran

```
Edit the current slide (slide 32 in the presentation, titled or about "Saran"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Kesimpulan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

Condense to ~5 items:

1. Mengulang protokol Caliper pada perangkat keras dan topologi terdistribusi.
2. Menelusuri konflik MVCC, batas konkurensi gateway, dan kegagalan siklus hidup
   chaincode dengan instrumentasi endorsement, validasi, dan pengiriman.
3. Menguji kontensi dompet bersama, retry, dan backoff terhadap konflik MVCC
   tanpa mengubah idempotensi.
4. Mengevaluasi *private data collections* atau mekanisme privasi lain untuk
   data yang tidak semestinya berada pada kanal bersama.
5. Mengembangkan pembayaran *offline* dan integrasi BI-RTGS/BI-FAST sebagai
   penelitian terpisah.
```

### Slide 33 — Terima Kasih

```
Edit the current slide (slide 33 in the presentation, titled or about "Terima Kasih"). Keep the existing design: theme colors, box/table styling, fonts, and the bottom section-tracker text box unchanged — the tracker reads Pendahuluan / Dasar Teori / Metodologi / Hasil / Kesimpulan, with "Kesimpulan" as the active/highlighted one for this slide. Only replace the slide's title and body content with the following:

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
```
