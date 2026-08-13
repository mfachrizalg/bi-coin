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
3. **Masalah kepatuhan** — penerbitan berjenjang, KYC-tier berbasis
   risiko, limit transaksi, dan pengawasan harus ditegakkan di lapisan
   *chaincode*, bukan hanya kebijakan di atas kertas.
4. **Solusi** — purwarupa terintegrasi (penerbitan → distribusi →
   transfer ritel → pengawasan) dievaluasi kinerjanya dengan Hyperledger
   Caliper.

### Slide 5 — Celah Penelitian
Replace body text:

- **Sudah mapan/dikaji**: konsep CBDC, model dua jenjang, dan Hyperledger
  Fabric sebagai platform permissioned blockchain sudah banyak dibahas
  literatur.
- **Celah yang diisi penelitian ini**: belum ada purwarupa CBDC ritel yang
  mengintegrasikan penerbitan berjenjang, kontrol kepatuhan (KYC-tier,
  limit, pengawasan), dan transfer ritel dalam satu sistem berbasis
  Hyperledger Fabric, sekaligus dievaluasi kinerjanya secara terukur dan
  dapat diulang melalui Hyperledger Caliper.

### Slide 6 — Rumusan Masalah
Replace with 3 numbered items (verbatim from thesis Ch1):

1. Bagaimana merancang dan membangun sistem Rupiah Digital ritel berbasis
   Hyperledger Fabric yang mendukung model penerbitan dan distribusi
   likuiditas berjenjang dari Bank Indonesia menuju bank, PJP, dan
   pelanggan ritel?
2. Bagaimana menerapkan kontrol kepatuhan pada lapisan *chaincode* berupa
   kebijakan KYC-tier berbasis risiko, penurunan tingkatan dompet, limit
   transaksi, dan pengawasan transaksi?
3. Bagaimana kinerja sistem dari sisi *throughput* dan latensi pada
   berbagai skenario beban transaksi yang diukur menggunakan Hyperledger
   Caliper?

### Slide 7 — Tujuan Penelitian
Replace with 3 numbered items:

1. Merancang dan membangun purwarupa sistem Rupiah Digital ritel berbasis
   Hyperledger Fabric dengan arsitektur multipihak yang mendukung
   penerbitan dan distribusi likuiditas berjenjang.
2. Mengimplementasikan kontrol kepatuhan pada *chaincode* (KYC-tier
   berbasis risiko, penurunan tingkatan dompet, limit transaksi masuk/
   keluar, pengawasan transaksi).
3. Mengevaluasi kinerja sistem (*throughput* dan latensi) pada berbagai
   skenario beban menggunakan Hyperledger Caliper.

### Slide 8 — Batasan Penelitian
Replace with bullets:

- Purwarupa pada jaringan tersimulasi lokal (*container*), bukan sistem
  produksi.
- Hyperledger Fabric versi 2.5, lima organisasi peserta, konsensus Raft
  (etcdraft).
- Fokus pada perancangan, implementasi, dan evaluasi kinerja fungsional;
  aspek hukum dan kebijakan moneter di luar cakupan.
- Evaluasi via Hyperledger Caliper, satu *host*, 1/2/4 *worker* Caliper,
  satu *peer* per organisasi.
- Per *worker*: 116 pelanggan, 16 pedagang, 52 slot transaksi; ronde
  pemanasan 30 detik, ronde terukur 120 detik.
- Tidak mengimplementasikan pembayaran *offline*.
- KYC disimulasikan terprogram (tier BASIC/STANDARD/MERCHANT), bukan
  ketentuan resmi BI/OJK/FATF.
- Satu *application channel*, tanpa *private data collection*.
- Satu *consenter* Raft (tidak toleran kegagalan *orderer*); tidak
  menilai kesiapan produksi.

### Slide 9 — Manfaat Penelitian
Replace with 5 numbered items:

1. Rujukan teoretis perancangan CBDC ritel berbasis *permissioned
   blockchain*.
2. Penjelasan penerapan Hyperledger Fabric untuk memisahkan peran Bank
   Indonesia, peserta distribusi, dan pengguna ritel tanpa data identitas
   mentah di *ledger*.
3. Purwarupa untuk eksperimen teknis (penerbitan, transfer, pembatasan
   dompet, kepatuhan, pengawasan).
4. Dasar evaluasi kinerja awal (*throughput*, latensi, keberhasilan
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
- *Endorsement policy* (mis. *majority*) menentukan berapa organisasi
  harus menyetujui sebuah transaksi sebelum di-*commit*.

### Slide 12 — Two-Tier CBDC sebagai model utama
Insert image `slide_figures/two-tier-cbdc-1.png`. Body text:

- Model dua jenjang dipilih agar selaras dengan desain Proyek Garuda dan
  mengurangi risiko disintermediasi perbankan.
- Distribusi: Bank Indonesia → bank/PJP → pelanggan ritel — bukan
  langsung dari bank sentral ke publik.

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

### Slide 14 — Teori tiering KYC
Body text:

- Uji tuntas (*due diligence*): *simplified* / *standard* / *enhanced*.
- Tingkat risiko: rendah / menengah / tinggi / terlarang.
- Tingkatan dompet ritel: **BASIC**, **STANDARD**, **MERCHANT** —
  diturunkan deterministik dari kombinasi jenis subjek + uji tuntas +
  tingkat risiko; operator tidak dapat memilih tingkatan secara manual.
- Limit sebagai instrumen desain risiko: saldo maksimum, batas per
  transaksi, pengeluaran harian/bulanan, penerimaan bulanan.

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
  `mychannel`, *endorsement policy majority*; TLS antarnode.
- *Backend* API (Go, Gorilla Mux) sebagai *gateway* HTTP → *chaincode*
  via *Fabric Gateway SDK* (gRPC), menegakkan RBAC + validasi JWT.

### Slide 18 — Basis Data Off-chain KYC
Insert image `slide_figures/erd-offchain-1.png`. Body text:

- PostgreSQL menyimpan data KYC mentah dan kredensial: `auth_users`,
  `kyc_profiles`, `kyc_provider_checks`, `kyc_audit_events`,
  `retail_customers`.
- *Ledger* hanya menyimpan hash/jangkar kepatuhan — bukan data identitas
  mentah.
- PostgreSQL dipilih atas MySQL/SQL Server: JSONB+GIN, *Row-Level
  Security*, MVCC+DDL transaksional.

### Slide 19 — Desain Tier KYC
Table (`tab:tier`, dalam Rupiah):

| Tingkatan | Saldo maks. | Per transaksi | Harian keluar | Bulanan keluar | Bulanan masuk |
|---|---|---|---|---|---|
| BASIC | 2.000.000 | 250.000 | 500.000 | 5.000.000 | 20.000.000 |
| STANDARD | 20.000.000 | 2.500.000 | 10.000.000 | 40.000.000 | 40.000.000 |
| MERCHANT | 200.000.000 | 10.000.000 | 50.000.000 | 500.000.000 | 500.000.000 |

Note under table: nilai adalah parameter kebijakan purwarupa untuk menguji
penurunan tingkatan dan penegakan limit — bukan ketentuan resmi BI/OJK/FATF.
Batas tingkat sistem: pasokan global maksimum Rp10.000.000.000.000, saldo
maksimum per peserta Rp1.000.000.000.000, nilai maksimum per transaksi
Rp100.000.000.000.

### Slide 20 — Fungsi Chaincode Kunci
Insert image `slide_figures/account-token-payment-1.png`. Body text:

- `Mint` / `RequestIssuance`, `Burn` / `RequestRedemption`,
  `DistributeToParticipant` — penerbitan dan distribusi berjenjang.
- `Transfer` — satu fungsi untuk C2C dan C2M; `applyRetailTransferPolicy`
  memeriksa status beku, kelayakan KYC pengirim, limit per transaksi,
  pengeluaran harian/bulanan, penerimaan bulanan, kecukupan saldo pengirim,
  dan saldo maksimum penerima sebelum eksekusi.
- `deriveWalletTier` — derivasi tier dari profil KYC; menolak subjek
  institusional (memakai *SystemLimit*, bukan tier ritel).

### Slide 21 — Lingkungan Uji
Table:

| Komponen | Spesifikasi |
|---|---|
| Perangkat keras | Intel Core i7-7700HQ @2,80GHz (4 inti/8 utas), RAM 16 GB |
| Sistem operasi | Fedora Linux 44 Workstation x86_64, Docker 29.6.2 |
| Hyperledger Fabric | v2.5 (rilis 2.5.16), state DB CouchDB, konsensus Raft (etcdraft) |
| Konfigurasi orderer | BatchTimeout 2 detik, MaxMessageCount 10 pesan, blok maks 10 MB |
| Chaincode | digital-rupiah v2.0 (Go 1.22, fabric-contract-api-go v2.0.0) |
| Backend | Go 1.23, fabric-gateway v1.8.0 |
| Benchmark | Hyperledger Caliper 0.6.0 |

### Slide 22 — Unit Test Suite
Reuse the original deck's "verification stages" visual style but for tests
instead of math. Body text:

- Chaincode: 1 paket, memvalidasi kebijakan kepatuhan, penurunan tier
  dompet, siklus hidup peserta, jalur berhasil/tolak transfer.
- Backend: 6 paket, memvalidasi pemilihan metode layanan ke chaincode,
  jalur tulis KYC, validasi persetujuan risiko tinggi, pembentukan anchor
  hash.
- Example (chaincode): `TestCreateWalletRejectsTierMismatchAndUsesPolicyDerivedTier`
  — menolak dompet jika tier yang diminta tidak sesuai hasil derivasi
  kebijakan KYC.
- Example (backend): `authorization_test.go` — menolak transfer jika
  `owner_id` dompet pengirim tidak cocok dengan identitas JWT pemanggil.
- Exact pass counts belong on the Results slide (25), not here — Ch3 only
  describes scope, Ch4 has the numbers.

### Slide 23 — Konfigurasi Benchmark Caliper
Table (`tab:laju`):

| Profil | Worker | Durasi/jumlah | Laju | Komposisi |
|---|---|---|---|---|
| Transfer | 1/2/4 | 30s / 120s / 120s | 10 / 30 / 60 TPS | 70% P2P, 25% pelanggan–pedagang, 5% baca |
| Pengulangan puncak | 2 | 5×60 detik | 60 TPS | Transfer ritel identik, untuk rerata & CI |
| Fungsional | 2 | 40–80 tx | 5–30 TPS | KYC, moneter, pengawasan, administratif |
| Negative-path | 1 | 7 tx | 5 TPS | 7 pelanggaran harus ditolak dengan alasan tepat |
| Agregat overspend | 4 | 200 tx | 80 TPS | Rp200.000 diminta dari saldo awal Rp50.000 |

Note: batch `2026-07-27-214918`, commit `f4b0910ecc69`, seed `20260725`.

---

## SECTION: HASIL

### Slide 24 — Hasil Pengujian Fungsional & Negative-path
Body text:

- 5 skenario fungsional lulus sesuai rancangan: penerbitan/distribusi
  berjenjang, penegakan limit, KYC & pembekuan, transfer ritel,
  pengawasan.
- Negative-path: **7 dari 7 transaksi ditolak** dengan alasan tepat;
  *enforcement gap* = 0, *oracle error* = 0.
- Overspend/kontensi: **4 dari 200 transfer dikomit, 196 ditolak**;
  permintaan total Rp200.000 melebihi saldo awal Rp50.000; saldo akhir
  Rp46.000, tetap nonnegatif di seluruh *worker*.

### Slide 25 — Hasil Unit Test
Body text:

- **Backend: 45 pengujian pada 6 paket, lulus semua.**
- **Chaincode: 42 pengujian pada 1 paket, lulus semua.**
- Mendukung kebenaran logika layanan backend dan aturan bisnis chaincode
  pada purwarupa — bukan bukti validasi menyeluruh atau kesiapan produksi.

### Slide 26 — Hasil Kinerja: Transfer Dasar
Insert image
`/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-4/generated/throughput-vs-sendrate.png`.
Table (`tab:hasil-kinerja-caliper`):

| Worker | Beban | Sukses | Gagal | Sukses (%) | Selesai (TPS) | Sukses (TPS) |
|---|---|---|---|---|---|---|
| 1 | 30 TPS | 3.601 | 0 | 100,00 | 29,5 | 29,5 |
| 1 | 60 TPS | 5.037 | 2.164 | 69,95 | 58,9 | 41,2 |
| 2 | 30 TPS | 3.602 | 0 | 100,00 | 29,5 | 29,5 |
| 2 | 60 TPS | 5.748 | 1.454 | 79,81 | 58,9 | 47,0 |
| 4 | 30 TPS | 3.604 | 0 | 100,00 | 29,5 | 29,5 |
| 4 | 60 TPS | 5.603 | 1.601 | 77,78 | 58,9 | 45,8 |

### Slide 27 — Hasil Kinerja: Pengulangan 5 Ronde
Insert image
`/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-4/generated/transfer-repeat-ci.png`.
Table (`tab:hasil-kinerja-repeat`, 60 TPS, 2 worker):

| Ronde | Sukses | Gagal | Sukses (%) | Selesai (TPS) | Sukses (TPS) |
|---|---|---|---|---|---|
| 1 | 2.342 | 1.256 | 65,09 | 57,7 | 37,6 |
| 2 | 1.494 | 2.105 | 41,51 | 57,5 | 23,9 |
| 3 | 1.885 | 1.713 | 52,39 | 59,2 | 31,0 |
| 4 | 1.671 | 1.931 | 46,39 | 59,5 | 27,6 |
| 5 | 2.327 | 1.275 | 64,60 | 57,7 | 37,3 |

Below table: rerata *successful throughput* **31,46 TPS ± 7,44 TPS** (CI
95%); rerata sukses 54,00% ± 13,20pp; rerata latensi 1,44s ± 0,43s.

### Slide 28 — Hasil Profil Fungsional
Table (`tab:hasil-kinerja-fungsi`):

| Profil | Sukses | Gagal | Throughput (TPS) | Latensi rata-rata (detik) |
|---|---|---|---|---|
| KYC/onboarding | 56 | 0 | 3,8 | 0,85 |
| Operasi moneter | 80 | 0 | 19,7 | 0,33 |
| Kueri pengawasan | 80 | 0 | 30,7 | 0,04 |
| Kebijakan administratif | 40 | 0 | 5,2 | 0,90 |

### Slide 29 — Perbandingan dengan Penelitian Lain
Table (`tab:perbandingan-cbdc`, condense to fit — pick the 4 most
presentation-worthy rows if the table shape can't fit all 9):

| Dimensi | Aryani (2023) | PoC Garuda (2024) | Penelitian ini |
|---|---|---|---|
| Jenis CBDC | Ritel (konseptual) | Grosir (PoC eksperimental) | Ritel (purwarupa) |
| Platform DLT | Tidak dievaluasi | R3 Corda + Hyperledger Besu | Hyperledger Fabric |
| Dompet berjenjang | Direkomendasikan | Tidak ada (grosir saja) | BASIC/STANDARD/MERCHANT |
| Metrik kinerja | Kutipan sekunder | Corda 37 TPS, Besu 39 TPS | 29,5 TPS (30 TPS beban); 41,2–47,0 TPS (60 TPS beban) |

Optionally insert `figures/reference/aryani2023-cbdc-architecture.png` if
there's an image slot on this slide's layout.

### Slide 30 — Diskusi
Body text:

- Kegagalan pada beban 60 TPS didominasi ketidakcocokan *proposal
  response payload* (peer membaca versi status berbeda) — bukan bukti
  kapasitas maksimum Fabric.
- 196 penolakan overspend mendukung *invariant* saldo, bukan pembuktian
  formal anti-*double-spend* (konektor Caliper menghapus diagnostik peer).
- Angka Caliper memverifikasi NFR-05 (keterukuran kuantitatif), bukan
  klaim kapasitas nasional atau bukti keamanan formal.
- Selisih vs. PoC Garuda (Corda 37 TPS, Besu 39 TPS) berasal dari
  perbedaan platform/harness/beban, bukan klaim keunggulan Fabric.

---

## SECTION: KESIMPULAN

### Slide 31 — Kesimpulan
Body text:

1. Berhasil merancang/membangun purwarupa dua jenjang (BI, bank
   validator, PJP, pengguna ritel) pada Hyperledger Fabric 2.5, lima
   organisasi, backend Go, CouchDB, PostgreSQL.
2. Kontrol kepatuhan chaincode (status/risiko KYC, penurunan tingkatan
   dompet, limit transaksi) tervalidasi sesuai aturan purwarupa; identitas
   mentah tetap di PostgreSQL.
3. Kinerja (batch 27 Juli 2026): beban 30 TPS → 29,5 TPS sukses, 0
   kegagalan; beban 60 TPS → 41,2–47,0 TPS sukses; 5 ronde ulang → rerata
   31,46 ± 7,44 TPS; 7/7 kasus negatif ditolak benar; uji kontensi dompet
   → saldo tetap nonnegatif (Rp50.000 → Rp46.000).

### Slide 32 — Saran
Condense to ~6 items:

1. Mengulang protokol Caliper pada perangkat keras/topologi lebih luas,
   dengan konfigurasi lengkap dilaporkan.
2. Menelusuri ketidakcocokan *proposal response payload* pada beban 60
   TPS.
3. Memperluas *repeatability run* ke lebih banyak profil, dengan CI dan
   latensi persentil ke-95/ke-99.
4. Memvalidasi angka limit/tingkatan bersama BI, bank/PJP, ahli APU/PPT.
5. Mengintegrasikan eKYC nyata dan kontrol retensi/enkripsi/audit data
   identitas.
6. Mengembangkan pembayaran *offline* dan integrasi/interkoneksi IPK
   pada penelitian terpisah.

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
