# Laporan Review Tesis

**Naskah:** *Rancang Bangun Rupiah Digital Ritel Berbasis Hyperledger Fabric*  
**Tanggal review:** 25 Juli 2026  
**Objek review:** sumber LaTeX tesis, PDF hasil kompilasi terisolasi, implementasi
Fabric/backend, konfigurasi jaringan, skrip benchmark, dan artefak hasil benchmark
pada working tree saat ini.  
**Jenis review:** review penuh, baca-saja; sumber tesis dan implementasi tidak diubah.

## Keputusan Editorial

**Keputusan: Major Revision. Naskah belum siap diajukan atau dipertahankan dalam
bentuk saat ini.**

Kontribusi rekayasa tetap layak: pertanyaan penelitian, tujuan, arsitektur,
implementasi, dan hasil telah disusun sebagai satu alur; keterbatasan purwarupa
juga diungkapkan lebih terbuka daripada kebanyakan naskah rekayasa tingkat sarjana.
Namun, empat klaim inti belum ditopang bukti yang valid:

1. Batas kewenangan BI, bank/PJP, nasabah, dan pengawas belum ditegakkan pada
   trust boundary chaincode.
2. Pengujian bernama *double-spend* tidak membuat nilai transaksi agregat melebihi
   saldo dan terutama mengukur konflik MVCC.
3. Oracle pengujian jalur negatif menerima kegagalan konektor generik sebagai
   keberhasilan aturan bisnis.
4. Proyek Garuda digunakan sebagai bukti implementasi Fabric, padahal laporan
   PoC menyebut Corda dan Hyperledger Besu.

Masalah tersebut memengaruhi jawaban RQ, bukan hanya penyajian. Keputusan tetap
**Major Revision**, bukan penolakan akhir, karena seluruh masalah masih dapat
diperbaiki melalui penguatan otorisasi, pengujian ulang, regenerasi bukti, dan
pembatasan klaim. Jika remediasi teknis tidak dilakukan, kontribusi harus
dipersempit menjadi purwarupa logika bisnis dan karakterisasi lokal, bukan bukti
efektivitas tata kelola CBDC ritel dua tingkat.

## Panel dan Independensi

| Peran | Fokus | Skor | Rekomendasi | Keyakinan |
|---|---|---:|---|---|
| Editor-in-Chief | koherensi kontribusi dan kesiapan tesis | 60/100 | Major Revision | 4/5 |
| Reviewer metodologi | validitas eksperimen Fabric/Caliper | 52/100 | Major Revision | 5/5 |
| Reviewer domain | CBDC ritel, Fabric, KYC/AML, Indonesia | 58/100 | Major Revision | 4/5 |
| Reviewer perspektif | keamanan, privasi, operasi, inklusi | 64/100 | Major Revision | 4/5 |
| Devil's Advocate | falsifikasi klaim inti | 48/100 | Tolak bentuk saat ini; ajukan ulang | 0,94 |

Setiap reviewer bekerja dari fokus berbeda sebelum sintesis. Semua posisi
reviewer dijalankan oleh keluarga model yang sama; karena itu, keragaman perspektif
tidak menghilangkan risiko kesalahan yang saling berkorelasi. Naskah tidak
diunggah ke layanan penelaah eksternal.

## Kekuatan Naskah

- RQ dan tujuan tersusun satu-ke-satu dan dalam urutan yang konsisten
  ([Bab I:133](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-1/chapter-1.tex:133),
  [Bab I:149](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-1/chapter-1.tex:149)).
- Batas purwarupa dinyatakan eksplisit: satu host, topologi terbatas, KYC simulatif,
  tanpa privasi transaksi dan penyelesaian luring, serta tanpa klaim kesiapan
  produksi
  ([Bab I:162](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-1/chapter-1.tex:162)).
- Naskah mempertahankan hasil negatif, termasuk kegagalan endorsement, alih-alih
  hanya menampilkan hasil yang menguntungkan.
- Bab implementasi dan evaluasi menyediakan detail konfigurasi, skenario, serta
  artefak yang cukup untuk menemukan sumber ketidaksesuaian.
- Seluruh 58 kunci sitasi aktif terdefinisi; kompilasi akhir tidak menghasilkan
  sitasi atau referensi yang tidak terpecahkan.
- Pengujian Go backend dan chaincode pada working tree saat ini lulus.

## Temuan Kritis

### C1. Otorisasi tidak ditegakkan pada trust boundary chaincode

Semua peran HTTP menggunakan satu identitas gateway Fabric yang berumur panjang
([ledger.go:79](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/backend/services/ledger.go:79)).
Pemanggil transfer mengirim `sender_id` sendiri
([models.go:140](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/backend/models/models.go:140)),
tetapi handler dan `Transfer` tidak mengikat wallet itu ke subjek terautentikasi
([handlers.go:452](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/backend/handlers/handlers.go:452),
[digital_rupiah.go:607](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/chaincode/digital_rupiah.go:607)).
`Mint`, `Burn`, perubahan limit, administrasi partisipan, dan penyegaran KYC juga
tidak memeriksa MSP atau atribut identitas pemanggil
([digital_rupiah.go:546](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/chaincode/digital_rupiah.go:546),
[digital_rupiah.go:915](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/chaincode/digital_rupiah.go:915)).

Kebijakan endorsement menentukan peer yang harus menyetujui proposal, bukan
otorisasi bisnis pemanggil. Peer dapat meng-endorse transaksi tidak sah yang
deterministik. Hal ini bertentangan dengan klaim pemisahan peran dan penegakan
aturan pada
[Bab V:8](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-5/chapter-5.tex:8).

**Perbaikan minimum:** gunakan identitas gateway per organisasi/peran; tegakkan
MSP/atribut pada setiap fungsi administratif dan moneter; ikat wallet nasabah ke
subjek terautentikasi; tambah pengujian pemanggil MSP salah, peran salah,
wallet milik pihak lain, dan pemanggilan chaincode langsung. Regenerasi seluruh
bukti fungsional setelah perubahan.

### C2. Oracle jalur negatif tidak membuktikan aturan yang diklaim

Workload menerima kegagalan konektor generik sebagai bukti bahwa aturan tertentu
ditegakkan
([negative-path.js:108](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/benchmark/workloads/negative-path.js:108),
[negative-path.js:115](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/benchmark/workloads/negative-path.js:115)).
Kegagalan setup KYC kedaluwarsa justru menghapus kasus itu secara diam-diam
([negative-path.js:74](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/benchmark/workloads/negative-path.js:74)).
Log mentah menunjukkan kegagalan setup dan jumlah verdict target yang lebih sedikit
daripada 42 request yang dinyatakan desain.

**Perbaikan minimum:** fixture harus *fail closed*; setiap kasus harus memeriksa
kode/kelas error spesifik, bukan sekadar status gagal; verifikasi bahwa state
tidak berubah; keluarkan matriks jumlah request, verdict, alasan, dan invariant
per aturan. Pengujian harus gagal bila fixture tidak terbentuk.

### C3. Skenario “double-spend” bukan percobaan overspending

Saldo awal pengirim sekitar Rp19 juta, sedangkan 200 transaksi × Rp1.000 hanya
meminta Rp200 ribu
([adversarial.yaml:9](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/benchmark/benchconfigs/adversarial.yaml:9),
[adversarial.yaml:19](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/benchmark/benchconfigs/adversarial.yaml:19)).
Workload mengklasifikasikan setiap kegagalan sebagai konflik MVCC
([adversarial-double-spend.js:98](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/benchmark/workloads/adversarial-double-spend.js:98)),
padahal log mentah juga berisi kegagalan endorsement. Dua belas transaksi yang
berhasil bukan indikasi pelanggaran: beberapa pembelanjaan sah memang dapat
berhasil selama totalnya tidak melampaui saldo. Kesimpulan pencegahan
*double-spend* pada
[Bab V:34](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-5/chapter-5.tex:34)
belum terbukti.

**Perbaikan minimum:** ubah nama menjadi “kontensi MVCC pada wallet yang sama”,
atau rancang ulang agar nilai agregat melebihi saldo. Untuk opsi kedua, periksa
saldo akhir, jumlah kredit penerima, keunikan transaksi, retry, dan idempotensi;
laporkan kode validasi aktual untuk setiap kegagalan.

### C4. Proyek Garuda salah diklasifikasikan sebagai implementasi Fabric

Bab II menyatakan lingkup Garuda yang dipublikasikan masih wholesale
([Bab II:92](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-2/chapter-2.tex:92)),
tetapi tabel dan argumen pemilihan platform memasukkan Garuda sebagai implementasi
Fabric
([Bab II:618](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-2/chapter-2.tex:618),
[Bab II:632](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-2/chapter-2.tex:632)).
Laporan PoC lokal menyebut Corda dan Hyperledger Besu, bukan Fabric
([laporan Garuda](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/reference/Laporan_POC_Proyek_Garuda_EN.pdf)).

**Perbaikan minimum:** gunakan Garuda hanya sebagai baseline rancangan bisnis
wholesale dan konteks gap ritel. Jika tetap membutuhkan preseden Fabric, gunakan
eNaira sesuai batas bukti sumber. Audit ulang seluruh tabel perbandingan dan
alasan pemilihan platform.

## Temuan Mayor

### M1. Sel puncak W4 terkontaminasi kegagalan setup

Mint pada setup W4 gagal karena wallet tidak ditemukan, lalu transfer dijalankan
dengan saldo nol. Fungsi setup tidak menghentikan ronde berdasarkan status hasil
([retail-base.js:65](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/benchmark/workloads/retail-base.js:65)).
Hasil itu tidak boleh digunakan untuk menyimpulkan saturasi atau bottleneck.

**Perbaikan minimum:** batalkan dan tandai ronde invalid ketika setup gagal;
reset/snapshot state untuk setiap sel; jalankan ulang W4; jangan mencampur hasil
lama dengan hasil baru.

### M2. Desain eksperimen terlalu pendek dan memiliki confounder

Empat puluh transaksi pada 60 TPS hanya berlangsung sekitar 0,67 detik, lebih
pendek daripada `BatchTimeout` dua detik dan hanya menghasilkan beberapa blok
([retail-transfer-workers-2.yaml:39](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/benchmark/benchconfigs/retail-transfer-workers-2.yaml:39),
[configtx.yaml:163](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/network/configtx.yaml:163)).
Sel W1/W2/W4 dijalankan berurutan setelah satu reset, dengan populasi dan state
yang berubah. Generator beban juga berbagi host dengan target.

**Perbaikan minimum:** gunakan ronde berdurasi beberapa menit dengan warm-up,
pengulangan independen, populasi tetap, reset per sel, urutan sel teracak, dan
monitor resource generator/peer/orderer/CouchDB. Jika tidak dilakukan, sebut
hasil sebagai karakterisasi *short-run*, bukan titik saturasi.

### M3. Repeatability disebut reproducibility dan provenance belum cukup

Lima ronde berurutan pada host yang sama menunjukkan repeatability, bukan
reproducibility lintas lingkungan. RNG tidak memiliki seed tetap. Skrip suite
tidak merekam commit SHA, status working tree, hash konfigurasi, image digest,
seed, dan status setiap ronde. Salinan `report.html` lama bahkan dapat terarsipkan
jika run baru gagal
([run-full-suite.sh:43](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/scripts/run-full-suite.sh:43)).

**Perbaikan minimum:** hapus artefak lama sebelum run, hentikan suite saat ronde
gagal, simpan manifest mesin-terbaca beserta hash dan status, tetapkan seed, lalu
jalankan reproduksi dari lingkungan bersih atau batasi klaim menjadi “protokol
terdokumentasi dan dapat diulang”.

### M4. Interpretasi interval kepercayaan keliru

Observasi 14,1 TPS berada di luar CI rerata yang dilaporkan
\([14,18; 14,82]\), tetapi narasi menyatakan seluruh observasi berada di dalam
interval
([Bab IV:382](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-4/chapter-4.tex:382),
[Bab IV:407](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-4/chapter-4.tex:407)).
CI rerata memang bukan interval yang harus memuat setiap observasi.

**Perbaikan minimum:** hapus interpretasi containment; jelaskan estimator,
ukuran sampel, simpangan baku, rumus/derajat kebebasan Student-t, dan laporkan
rentang observasi secara terpisah.

### M5. Konsep arsitektur CBDC dan kapabilitas Fabric tercampur

Ritel, wholesale, distribusi dua tingkat, dan arsitektur hybrid diperlakukan
seolah dimensi yang sama
([Bab II:837](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-2/chapter-2.tex:837)).
Wallet institusional bukan bukti keberadaan ledger wholesale. MSP bukan KYC
nasabah. Kapabilitas channel juga dinilai seolah telah diimplementasikan, padahal
topologi saat ini menggunakan satu application channel
([configtx.yaml:196](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/network/configtx.yaml:196)).

**Perbaikan minimum:** pisahkan tiga dimensi: bentuk klaim/liabilitas, model
distribusi operasional, dan lingkup ledger retail/wholesale. Bedakan “kapabilitas
platform” dari “fitur yang diimplementasikan”; ubah status pemenuhan menjadi
parsial bila semantiknya belum dibuktikan.

### M6. Argumen Raft dan fault tolerance terlalu kuat

Identitas MSP memungkinkan autentikasi dan atribusi, tetapi tidak membuat node
terkompromi menjadi dapat dipercaya. Konfigurasi hanya memiliki satu consenter
Raft
([configtx.yaml:157](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/network/configtx.yaml:157)),
sehingga tidak menoleransi satu pun kegagalan orderer.

**Perbaikan minimum:** nyatakan model ancaman dan asumsi trust; sebut Raft sebagai
pilihan ordering purwarupa, bukan fault tolerance yang telah didemonstrasikan.

### M7. KYC tier dan limit belum setara validasi AML/CFT

Pemetaan BASIC/STANDARD/MERCHANT adalah kebijakan purwarupa, bukan derivasi resmi
dari BI, OJK, atau FATF
([Bab II:449](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-2/chapter-2.tex:449)).
Implementasi tidak mencakup sanksi/PEP, beneficial ownership, ongoing due
diligence, pelaporan transaksi mencurigakan, atau integrasi PPATK.

**Perbaikan minimum:** ganti klaim “kepatuhan AML/CFT” menjadi “purwarupa
KYC-tier dan limit transaksi yang diinspirasi pendekatan berbasis risiko”.
Pisahkan asumsi desain dari ketentuan regulator.

### M8. Klaim privasi tidak sesuai topologi

Bab I mengakui bahwa kriptografi privasi dan private-data collection tidak
diimplementasikan
([Bab I:205](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-1/chapter-1.tex:205)),
tetapi tabel dan pembahasan kemudian mengreditkan privasi sebagai hasil platform.
Satu channel membuat metadata wallet/KYC dan graph transaksi terlihat oleh
partisipan channel.

**Perbaikan minimum:** gunakan istilah “pemisahan data identitas on-chain dan
off-chain”, bukan “privasi transaksi”; jelaskan threat model dan visibilitas
setiap data; jadikan PDC/kriptografi privasi pekerjaan lanjutan.

### M9. Peran pengawas dan persetujuan senior tidak sesuai klaim

Naskah menyatakan pengawas hanya membaca laporan
([Bab IV:139](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-4/chapter-4.tex:139)),
tetapi routing mengizinkan pengawas memanggil sejumlah mutasi administratif
([handlers.go:69](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/backend/handlers/handlers.go:69)).
Persetujuan senior juga berupa boolean yang disuplai pemanggil, bukan bukti
*four-eyes approval*.

**Perbaikan minimum:** pisahkan route mutasi BI dan route baca pengawas; tambah
deny-test untuk seluruh mutasi; modelkan identitas pemberi persetujuan dan audit
trail yang berbeda dari pengusul.

### M10. Kebaruan dan keterbukaan menggunakan klaim ketiadaan yang terlalu luas

Klaim tidak adanya sistem terintegrasi setara dan klaim benchmark terbuka/
reproducible tidak menyatakan batas pencarian atau locator artefak publik
([Bab II:86](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-2/chapter-2.tex:86),
[Bab II:101](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-2/chapter-2.tex:101)).

**Perbaikan minimum:** tulis “dalam sumber yang ditelaah”; dokumentasikan basis
data, kata kunci, rentang waktu, dan kriteria inklusi; berikan URL/tag/DOI arsip
yang stabil sebelum menyebut artefak terbuka.

### M11. Kesiapan operasional, inklusi, dan tata kelola belum dievaluasi

Motivasi mencakup inklusi finansial, tetapi SRS dan evaluasi tidak mengukur
aksesibilitas, usability, perangkat/jaringan rendah, biaya, atau ketahanan
operasional. Tidak ada analisis HA, RTO/RPO, revokasi/rotasi identitas, upgrade,
respons insiden, pemulihan, serta mekanisme keberatan atas KYC/freeze/offboarding.

**Perbaikan minimum:** kecualikan outcome inklusi dan kesiapan produksi dari
kontribusi yang diuji. Tambahkan threat/operations/governance gap sebagai batasan
dan agenda evaluasi lanjut.

## Temuan Format, Bahasa, dan Administrasi

### F1. Halaman pengesahan belum lengkap

Template masih mencetak “Pada tanggal . . .” pada PDF halaman fisik 2
([thesisdtetiugm.cls:413](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/thesisdtetiugm.cls:413))
dan mengabaikan `\examdate` pada
[main.tex:39](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/main.tex:39).
Konfirmasikan format dan penandatangan yang diwajibkan DTETI, lalu isi tanggal
final yang sah.

### F2. Kronologi dokumen tidak konsisten

Pernyataan dan prakata bertanggal 2 Juli 2026, jadwal ujian dikonfigurasi
8–13 Juli 2026, sedangkan hasil benchmark dalam intisari/abstract bertanggal
25 Juli 2026
([statement.tex:23](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/statement/statement.tex:23),
[intisari.tex:29](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/abstract/intisari.tex:29)).
Dokumen deklaratif perlu diperbarui dan ditandatangani ulang setelah naskah serta
hasil final dibekukan.

### F3. Intisari dan abstract terlalu padat

Hitungan teks tanpa perintah LaTeX menghasilkan sekitar 379 kata untuk intisari
dan 339 kata untuk abstract. Keduanya memenuhi satu halaman, tetapi sulit dipindai.
Pedoman DTEDI UGM yang ditemukan membatasi 250 kata; itu hanya pembanding lintas
departemen, bukan bukti aturan DTETI yang berlaku. Konfirmasikan pedoman DTETI
terkini, lalu ringkas latar, metode, hasil utama, dan batas generalisasi.

### F4. Perbaikan bahasa dan tipografi terarah

- Perbaiki `Infomrasi` menjadi `Informasi`
  ([statement.tex:11](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/statement/statement.tex:11)).
- Perbaiki `Terimakasih` menjadi `Terima kasih`, `warna warni` menjadi
  `warna-warni`, dan konsistensi `objek`
  ([preface.tex:33](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/preface/preface.tex:33)).
- Hapus spasi sebelum titik dua pada `di bawah ini :`, `Kata kunci :`, dan
  `Keywords :`.
- Ganti frasa Inggris yang tidak idiomatis `other-function throughput` dan
  redundansi `mean average latency`
  ([abstract.tex:33](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/abstract/abstract.tex:33)).
- Konsistenkan rujukan `Bab III/Bab IV`, bukan `BAB III/BAB IV`, di dalam prosa.

### F5. Layout PDF memerlukan pemeriksaan akhir

Kompilasi menghasilkan empat `Overfull \hbox`: dua pada cover, satu pada tabel
lingkungan Bab III, dan satu pada tabel fungsi chaincode Bab IV. Gambar throughput
sekitar Gambar 4.37 memiliki label/legenda sangat kecil dan whitespace berlebih.
Urutan daftar gambar menempatkan Gambar 3.23 sebelum 3.22 akibat antrian float.
Metadata PDF Title/Author/Subject/Keywords juga kosong dan dokumen belum tagged.

## Temuan Minor Lain

- Hitungan pengujian di Bab IV perlu disinkronkan dengan metode hitung aktual.
  Eksekusi saat ini menghasilkan 26 kasus backend dan 32 kasus chaincode bila
  subtest dihitung, sedangkan naskah menyebut 22 dan 30
  ([Bab IV:193](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-4/chapter-4.tex:193)).
- Bab II memuat generalisasi teknis yang perlu dipresisikan: DLT tidak selalu
  tanpa otoritas sentral, ledger lebih tepat disebut tamper-evident daripada
  immutable absolut, dan PoS tidak memiliki biaya komputasi seperti PoW
  ([Bab II:269](/home/mfachrizalg/2026/Skripsi/bi-coin/thesis/contents/chapter-2/chapter-2.tex:269)).
- Bab II mencampur teori dengan rincian REST API, Go, dan fungsi implementasi.
  Pindahkan mekanik purwarupa ke Bab III.
- MeetCoin diposisikan terlalu kuat sebagai literatur CBDC. Hapus atau batasi
  menjadi preseden implementasi lokal sederhana.
- Bibliografi aktif terselesaikan, tetapi basis `.bib` berisi banyak entri tanpa
  penulis, URL proxy institusi, satu duplikasi DOI tidak valid, dan metadata tesis
  yang tidak lengkap. Bersihkan entri yang digunakan sebelum finalisasi.
- Sampul mencantumkan SDG 8 dan 9 melalui template, tetapi naskah tidak memberi
  argumen eksplisit. Jika diwajibkan, gunakan bahasa hati-hati seperti “selaras
  dengan” atau “berpotensi mendukung”, bukan klaim dampak.

## Roadmap Revisi

### P1 — Wajib sebelum evaluasi ulang

1. Terapkan otorisasi chaincode berbasis identitas organisasi/atribut dan
   ownership wallet; pisahkan identitas gateway; tambah pengujian lintas trust
   boundary.
2. Perbaiki oracle jalur negatif dan fixture *fail closed*; jalankan ulang seluruh
   matriks aturan.
3. Ubah atau rancang ulang skenario *double-spend*; tambahkan invariant state dan
   klasifikasi kode validasi nyata.
4. Buang sel W4 yang terkontaminasi; gunakan reset per sel, ronde lebih panjang,
   pengulangan independen, urutan teracak, dan manifest provenance.
5. Regenerasi tabel, grafik, log, dan narasi Bab IV–V hanya dari run yang lolos
   validasi.
6. Koreksi klasifikasi Proyek Garuda dan bangun ulang argumen pemilihan Fabric
   tanpa perbandingan TPS lintas studi yang tidak sebanding.

### P2 — Wajib sebelum naskah final

1. Batasi klaim AML/CFT, privasi, fault tolerance, hybrid/wholesale, inklusi,
   kesiapan operasi, dan reproducibility sesuai bukti aktual.
2. Dokumentasikan strategi pencarian kebaruan dan locator artefak stabil.
3. Sinkronkan abstract, intisari, RQ, hasil, dan kesimpulan dengan bukti baru.
4. Perbaiki peran pengawas, persetujuan senior, dan mekanisme recourse/audit.
5. Sinkronkan jumlah pengujian dan definisikan unit perhitungannya.

### P3 — Finalisasi administratif dan presentasi

1. Benahi tanggal, halaman pengesahan, pernyataan, dan tanda tangan setelah hasil
   final dibekukan.
2. Ringkas intisari/abstract sesuai aturan DTETI yang terkonfirmasi.
3. Jalankan penyuntingan bahasa, bibliografi, float, tabel, grafik, dan metadata
   PDF.
4. Kompilasi bersih dan lakukan inspeksi visual halaman per halaman.

## Gerbang Review Ulang

Naskah siap ditelaah ulang hanya jika tersedia:

- pengujian otorisasi pemanggilan langsung, MSP/peran salah, dan wallet pihak lain;
- matriks jalur negatif dengan kode error dan invariant per aturan;
- workload overspending atau pelabelan ulang kontensi MVCC;
- run benchmark baru dengan setup *fail closed*, manifest, seed, hash, dan raw log;
- hasil W1/W2/W4 yang independen dan tidak terkontaminasi;
- tabel Garuda/platform yang telah dikoreksi terhadap sumber primer;
- Bab IV–V dan abstract yang diregenerasi dari bukti baru;
- PDF bersih dengan persetujuan dan kronologi yang sah.

## Verifikasi yang Dilakukan

```text
rtk latexmk -pdf -interaction=nonstopmode -halt-on-error \
  -outdir=/tmp/bi-coin-thesis-review-build main.tex
PASS — 131 halaman, 3.464.781 byte, tanpa undefined citation/reference.

rtk env GOCACHE=/tmp/bi-coin-review-go-build \
  go -C bi-coin-fabric/backend test -count=1 ./...
PASS — 26 kasus termasuk subtest.

rtk env GOCACHE=/tmp/bi-coin-review-go-build \
  go -C bi-coin-fabric/chaincode test -count=1 ./...
PASS — 32 kasus termasuk subtest.
```

TDD tidak diterapkan karena pekerjaan ini berupa review baca-saja, bukan perubahan
perilaku. PDF hasil kompilasi berada di
`/tmp/bi-coin-thesis-review-build/main.pdf`.

## Sumber Primer untuk Pemeriksaan Ulang

- [Hyperledger Fabric: chaincode access control](https://github.com/hyperledger/fabric/blob/main/docs/source/chaincode4ade.md)
- [Hyperledger Fabric: endorsement policies](https://github.com/hyperledger/fabric/blob/main/docs/source/endorsement-policies.md)
- [Pedoman penulisan DTEDI UGM sebagai pembanding, bukan aturan DTETI terkonfirmasi](https://tri.sv.ugm.ac.id/wp-content/uploads/sites/712/2025/03/Ver-1.5-PEDOMAN-PENULISAN-PROYEK-AKHIR-DTEDI-1.docx-1.pdf)

## Ringkasan Akhir

Tesis memiliki fondasi rekayasa dan struktur argumentasi yang dapat diselamatkan.
Risiko utamanya bukan jumlah fitur, melainkan ketidaksesuaian antara klaim dan
trust boundary serta antara nama pengujian dan bukti yang dihasilkan. Perbaiki
otorisasi dan validitas eksperimen terlebih dahulu; penyuntingan bahasa dan layout
baru bernilai setelah hasil teknis dibekukan.
