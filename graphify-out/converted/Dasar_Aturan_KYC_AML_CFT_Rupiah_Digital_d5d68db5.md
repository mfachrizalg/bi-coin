<!-- converted from Dasar_Aturan_KYC_AML_CFT_Rupiah_Digital.docx -->

Dasar aturan KYC dan AML CFT
untuk prototipe rupiah digital ritel
Kumpulan sumber primer dan matriks kontrol untuk skripsi Teknik Informatika
Tanggal penelusuran 2 Oktober 2026
# Ruang lingkup yang disarankan
Penelitian memodelkan arsitektur two-tier dengan satu PJP nonbank yang melayani pengguna perseorangan domestik untuk kepentingan sendiri. Bank Indonesia dimodelkan sebagai penerbit dan otoritas terkait; PJP melaksanakan kontrol operasional; PPATK menjadi tujuan pelaporan yang disimulasikan. Pemilihan ini adalah batas penelitian, bukan pernyataan bahwa model distribusi rupiah digital ritel tersebut sudah beroperasi atau telah ditetapkan secara final oleh BI. [12]
KYC dipetakan ke Prinsip Mengenali Pengguna Jasa dan Customer Due Diligence (CDD). AML/CFT dipetakan ke Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme (APU/PPT). Aturan BI juga mencakup Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal (PPPSPM); jika aspek ini dikeluarkan, tuliskan batasnya secara eksplisit. [1–4]
## Pemilihan aturan berdasarkan perantara
PBI 10/2024 dan PADG 15/2025 menjadi acuan utama untuk PJP nonbank yang masuk cakupannya. Untuk bank, tambahkan POJK 8/2023 dan petakan kewajiban menurut kegiatan serta kewenangan pengawasnya. Jangan menganggap seluruh PJP otomatis tunduk pada paket aturan bank yang sama. [3–4, 8]
Tujuan evaluasi yang terukur adalah kesesuaian kontrol terpilih terhadap sumber yang dipetakan. Kelulusan pengujian prototipe tidak membuktikan kepatuhan menyeluruh suatu lembaga atau efektivitas pencegahan kejahatan di dunia nyata.
# Matriks kontrol KYC
Baris berikut memisahkan tuntutan sumber dari cara implementasi yang diusulkan. PJP tetap menjadi pemilik proses, termasuk ketika sebagian verifikasi dibantu pihak lain. Petugas kepatuhan adalah peran internal PJP, bukan lembaga tambahan. [3]
CDD sederhana hanya digunakan jika syarat risiko dan ketentuan terkait terpenuhi. Tingkat akses dompet tidak dapat menggantikan pemeriksaan identitas. Biometrics, liveness dan akses Dukcapil nyata dapat dikeluarkan dari implementasi, dengan hasil verifikasi disebut simulasi. [3–5, 10]
# Matriks kontrol AML dan CFT
# Parameter dan evaluasi penelitian
## Angka hukum dan angka eksperimen
## Pengujian yang sesuai untuk prototipe tanpa AI
Gunakan data sintetis dan hasil yang diharapkan untuk setiap skenario. Untuk aturan Boolean, ukur apakah keputusan aktual sesuai harapan. Untuk screening dan deteksi pola, gunakan true positive, false positive, true negative dan false negative sesuai definisi label data uji. Precision dan recall pada data sintetis hanya menggambarkan kemampuan terhadap skenario tersebut.
Tambahkan kasus batas: field hilang, penyedia verifikasi tidak tersedia, nama mirip tetapi tanggal lahir berbeda, daftar diperbarui, transaksi bersamaan mendekati limit, dan upaya membaca laporan tanpa hak. Versi aturan, versi daftar dan alasan keputusan harus tersimpan agar hasil uji bisa direproduksi.
## Batas klaim dan penerapan pada Fabric
Pisahkan evaluasi fungsi kontrol dari pengukuran throughput dan latency. Kontrol status dompet dan transfer dapat ditegakkan dalam chaincode Go; verifikasi identitas, screening dan investigasi membutuhkan layanan serta otorisasi di luar chaincode. Sertifikat organisasi Fabric tidak menggantikan verifikasi identitas pengguna ritel.
Penyimpanan dokumen di luar ledger merupakan pilihan arsitektur untuk mendukung kerahasiaan dan pengelolaan retensi, bukan kewajiban eksplisit menggunakan teknologi tertentu. Dasar pemrosesan data perlu dipetakan; persetujuan bukan satu-satunya dasar dalam Pasal 20 UU PDP. Hash NIK saja tidak menjamin anonimitas. [7]
# Batasan penyimpanan dan dokumen KYC
Prototipe menggunakan PostgreSQL untuk data KYC terstruktur dan citra KTP sintetis dalam kolom bytea pada tabel dokumen terpisah. Object storage ditempatkan sebagai saran pengembangan dan tidak diimplementasikan atau dievaluasi dalam penelitian ini. Pemilihan penyimpanan merupakan keputusan arsitektur, bukan kewajiban menggunakan teknologi tertentu. [16]
## Batas evaluasi keamanan dan performa
Implementasi menguji kontrol akses, integritas referensi dan alur retensi terpilih. Audit keamanan menyeluruh, penetrasi produksi, pemulihan bencana berskala besar dan sertifikasi kepatuhan berada di luar cakupan. Tetap terapkan akses privat, perlindungan komunikasi dan pemisahan akses dokumen pada prototipe. [7]
Jika workload benchmark hanya memanggil Fabric, hasilnya menggambarkan performa ledger. Pengukuran register, unggah KTP dan akses PostgreSQL dilaporkan terpisah sebagai pengukuran aplikasi apabila dimasukkan. Performa object storage tidak diukur karena komponen tersebut menjadi saran pengembangan.
# Frontend demonstrasi dan saran pengembangan
Menurut keterangan pengguna, frontend saat ini baru memiliki halaman register dan login. Halaman tersebut menjadi awal demonstrasi alur akun. Implementasi frontend, backend dan koneksi Fabric belum diperiksa melalui kode pada pembaruan dokumen ini.
## Prioritas implementasi
Prioritas berikutnya adalah satu alur lengkap dari pengajuan KYC sampai keputusan dan satu transaksi dompet. Tambahkan penolakan yang jelas pada dokumen tidak lengkap, hasil verifikasi tidak cocok, status dompet diblokir dan pemanggilan fungsi oleh pihak tanpa hak. Halaman demonstrasi perlu menampilkan hasil backend dan ledger sebenarnya; kondisi yang hanya disimulasikan diberi label.
## Saran pengembangan setelah baseline
Pengembangan lanjutan dapat mencakup object storage privat untuk memisahkan berkas dari database, OCR siap pakai dengan konfirmasi pengguna, integrasi penyedia verifikasi berwenang, pengelolaan kunci yang lebih kuat dan pengujian pemulihan. Jika object storage diterapkan, PostgreSQL menyimpan object_key serta metadata; uji konsistensi unggahan, retensi dan akses dokumen. Integrasi verifikasi nyata membutuhkan kewenangan dan akses yang sesuai.
Status login, role, tingkat risiko dan status KYC adalah konsep berbeda. Pengguna dapat berhasil login tetapi belum boleh bertransaksi. Role ritel tidak berubah menjadi petugas setelah KYC disetujui. Tingkat risiko juga tidak otomatis sama dengan tingkat akses atau limit dompet.
# Role dan batas kepercayaan pada Fabric
Data off-chain boleh memuat role aplikasi untuk navigasi dan kontrol endpoint. Role institusi seperti BI, PJP dan PPATK berbeda dari role pengguna aplikasi. MSP mengidentifikasi organisasi pada Fabric; peran bisnis seperti petugas KYC harus ditetapkan melalui desain otorisasi. [13–14]
## Risiko identitas backend bersama
Jika semua pengguna memakai satu identitas Fabric dengan kewenangan luas, chaincode melihat identitas layanan tersebut. user_id dalam argumen tidak otomatis membuktikan identitas end user. Pemilihan kunci petugas juga tidak boleh hanya berdasarkan role atau pemetaan yang bebas diubah pada PostgreSQL. [13]
Untuk baseline, pisahkan identitas layanan ritel dari identitas petugas dan penerbit; batasi fungsi masing-masing. Ikat penandatanganan tindakan petugas pada kendali kredensial yang terpisah dari perubahan role database. Jika layanan ritel bertindak sebagai perantara, nyatakan bahwa autentikasi dan kepemilikan akun ritel masih mempercayai backend. Bukti tanda tangan end user dapat menjadi saran pengembangan lanjutan.
## Makna penggunaan DLT
Fabric menyimpan state yang dapat berubah melalui transaksi valid beserta riwayat perubahan yang tidak ditimpa. DLT tidak membuktikan kebenaran KTP dan tidak otomatis melindungi PostgreSQL dari administratornya. Manfaat yang diuji adalah kontrol perubahan ledger dan audit lintas organisasi. Jika seluruh jaringan, kunci dan aplikasi dikendalikan satu pihak, independensi tata kelola belum dibuktikan. [13–15]
# Uji perubahan data off-chain dan otorisasi
Gunakan tindakan berikut sebagai skenario uji tambahan. Hasil di bawah adalah target rancangan, bukan hasil pengujian yang sudah dilakukan.
## Pemisahan status dan salinan data
Bedakan kyc_review_status di PostgreSQL dari kyc_status_effective pada ledger. Review dapat selesai sementara transaksi ledger masih pending atau gagal. Tampilan harus menunjukkan kondisi itu. Event ledger dan pembacaan ulang dapat dipakai untuk memperbarui cache setelah commit valid; keberhasilan submit saja belum cukup. [15]
## Rumusan batasan yang dapat disesuaikan
Penelitian mengimplementasikan prototipe rupiah digital ritel dengan Hyperledger Fabric, backend Go dan PostgreSQL untuk akun, data KYC terstruktur serta citra KTP sintetis dalam bytea. Frontend mendemonstrasikan register, login, pengajuan dan review KYC serta transaksi dompet. Verifikasi eksternal dan pelaporan PPATK disimulasikan. Evaluasi mencakup kontrol terpilih dan penolakan perubahan role atau status KYC yang hanya dilakukan off-chain. Object storage menjadi saran pengembangan. Pengembangan model AI, verifikasi biometrik dan evaluasi keamanan produksi berada di luar cakupan.
Jika sebagian halaman atau fungsi belum dibangun, ubah kata mengimplementasikan menjadi merancang pada bagian tersebut. Batasan harus menggambarkan hasil akhir yang benar-benar diuji.
# Endorsement dan persetujuan role bisnis
Fabric memiliki satu policy default pada definisi chaincode, bukan satu policy yang wajib berlaku identik pada seluruh transaksi. State-based endorsement (SBE) dapat menetapkan policy per key dan menggantikan default untuk key itu. Collection juga memiliki policy tersendiri. Mengelompokkan beberapa contract di dalam satu chaincode tidak memberikan default policy terpisah kepada setiap contract. [14, 18–19]
## Rancangan SBE satu channel dan satu chaincode
Contoh eksperimen menggunakan BIMSP, AMSP dan BMSP. A dan B adalah dua perantara uji yang masing-masing mengelola dompet wholesale dan retail. Perluasan menjadi dua perantara hanya diperlukan jika transfer antarlembaga menjadi cakupan implementasi; model satu PJP dapat tetap dipakai untuk transfer internal. Policy berikut adalah pilihan penelitian, bukan ketentuan final BI. [12]
Tabel mengasumsikan saldo sumber dan tujuan berubah dalam satu transaksi pada channel yang sama. Semua policy key yang ditulis harus terpenuhi, termasuk key tambahan seperti log, proposal atau total supply. Jangan memperbarui key bersama dengan policy BI pada setiap transfer retail jika desain tidak ingin mewajibkan endorsement BI untuk transfer itu. [14]
# Implementasi SBE dan alur persetujuan
## Penetapan dan perubahan policy
Tetapkan SBE saat bootstrap atau pembuatan dompet, sebelum transfer yang dilindungi. Chaincode Go menggunakan SetStateValidationParameter(key, policyBytes); pkg/statebased membantu membentuk policy AND dari MSP organisasi. Sesuaikan import v2 dengan versi dependensi proyek. [14, 20]
Policy baru yang ditetapkan pada suatu transaksi tidak boleh dianggap sebagai syarat yang sudah melindungi transaksi itu sendiri. Pemasangan pertama memakai policy yang sebelumnya berlaku; perubahan policy yang sudah ada harus memenuhi policy sebelumnya. Batasi fungsi pengaturan policy agar identitas tanpa hak tidak dapat melemahkannya. [14]
Untuk key yang tidak memiliki SBE, default chaincode tetap penting. Sebagai contoh, default OR(BI.peer, A.peer, B.peer) dapat dipakai untuk metadata umum pada model ini, hanya jika chaincode membatasi pembuatan aset dan perubahan sensitif dengan benar. Default yang longgar bukan pengganti kontrol akses; setiap key yang ditulis tanpa SBE harus dievaluasi. [13–14]
## Jika beberapa role bisnis perlu menyetujui
Persetujuan manual tidak harus diterapkan pada setiap transfer retail. Dalam model otomatis, izin pengirim, status KYC/dompet, saldo dan limit dapat diperiksa oleh chaincode. Jika transaksi tertentu membutuhkan pemeriksaan tambahan, gunakan alur proposal tersebut. OJK dan PPATK tidak otomatis menjadi endorser hanya karena memiliki fungsi pengawasan atau pelaporan.
## Alternatif dan batas implementasi
Chaincode wholesale dan retail yang terpisah pada channel yang sama dapat memiliki policy default berbeda; pemanggilan antar-chaincode untuk update memerlukan gabungan policy yang relevan. Ini menambah pengelolaan lifecycle. Pemisahan channel menambah masalah penyelesaian transaksi lintas channel, sehingga tidak disarankan hanya untuk membedakan endorsement pada prototipe ini. [18–19]
Fabric Gateway dapat mengumpulkan endorsement berdasarkan policy yang diakses saat eksekusi. Pemilihan organisasi pada client tidak mengganti policy validator. Uji endorsement lengkap/tidak lengkap, peer wajib tidak tersedia, policy diubah tanpa hak dan transaksi diulang. Konversi model wholesale ke retail harus menjaga nilai total dan tidak dijelaskan sebagai penerbitan independen oleh PJP. [18]
# Daftar sumber hukum dan pedoman nasional
Nomor di bawah digunakan sebagai rujukan matriks. Tautan menuju penerbit atau repositori pemerintah. Tanggal akses 2 Oktober 2026. Baca naskah lengkap dan lampiran saat menetapkan rincian field, prosedur, atau tenggat khusus; ringkasan tidak menggantikan naskah peraturan.
[1] Republik Indonesia. UU Nomor 8 Tahun 2010 tentang Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang.
Bagian utama: Pasal 1 angka 5; Pasal 12; Pasal 17–25; Pasal 31. Dasar PMPJ, TKM, retensi, pelaporan dan larangan tipping off.
https://peraturan.bpk.go.id/Download/27793/UU%20Nomor%20%208%20Tahun%202010.pdf
[2] Republik Indonesia. UU Nomor 9 Tahun 2013 tentang Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme.
Bagian utama: Pasal 10–19 dan ketentuan pemblokiran serta DTTOT. Dana untuk pendanaan terorisme juga dapat berasal dari sumber yang sah.
https://www.ojk.go.id/apu-ppt/id/peraturan/pojk/Documents/UU_9_2013_pendanaan-terorisme.pdf
[3] Bank Indonesia. PBI Nomor 10 Tahun 2024 tentang Penerapan Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal bagi Pihak yang Diatur dan Diawasi oleh Bank Indonesia.
Acuan utama program untuk pihak nonbank yang termasuk cakupannya. Berlaku 31 Desember 2024. Mencakup CDD, risiko, tata kelola dan penanganan daftar.
https://www.bi.go.id/id/publikasi/peraturan/Pages/PBI_102024.aspx
[4] Bank Indonesia. PADG Nomor 15 Tahun 2025 dengan judul Penerapan APU, PPT, dan PPPSPM bagi Pihak yang Diatur dan Diawasi oleh Bank Indonesia.
Peraturan pelaksana PBI 10/2024, berlaku 30 Juni 2025. Baca bagian kebijakan dan prosedur tertulis, manajemen risiko, CDD, serta pelaporan dan lampirannya.
https://www.bi.go.id/id/publikasi/peraturan/Pages/PADG_152025.aspx
[5] Bank Indonesia. Portal Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme beserta pedoman teknis yang ditautkan.
Unduh Pedoman CDD, petunjuk teknis Risk Based Approach, SRA, pedoman DTTOT dan pedoman DPPSPM. Beberapa bagian portal masih menyebut peraturan lama; baca dengan PBI 10/2024 dan PADG 15/2025.
https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/anti-pencucian-uang-dan-pencegahan-pendanaan-terrorisme/default.aspx
[6] PPATK. Peraturan Nomor 1 Tahun 2021 tentang Tata Cara Penyampaian LTKM, LTKT, dan Laporan Transfer Dana dari dan ke Luar Negeri melalui Aplikasi goAML bagi Penyedia Jasa Keuangan.
Dasar prosedur pelaporan. Prototipe dapat mensimulasikan pengiriman; format internal tidak boleh disebut valid goAML tanpa pemeriksaan spesifikasi terkait.
https://peraturan.go.id/id/peraturan-ppatk-no-1-tahun-2021
# Daftar sumber pendukung dan konteks CBDC
[7] Republik Indonesia. UU Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.
Fokus: Pasal 20 tentang dasar pemrosesan; Pasal 35–39 tentang keamanan dan kerahasiaan; Pasal 42–44 tentang akhir pemrosesan, penghapusan dan pemusnahan sesuai ketentuan.
https://peraturan.bpk.go.id/Download/224884/UU%20Nomor%2027%20Tahun%202022.pdf
[8] OJK. POJK Nomor 8 Tahun 2023 tentang Penerapan Program APU, PPT, dan PPPSPM di Sektor Jasa Keuangan.
Tambahkan jika penelitian memasukkan bank atau lembaga dalam cakupan OJK. Jangan diterapkan kepada setiap PJP nonbank hanya karena sama-sama menggunakan CBDC.
https://ojk.go.id/apu-ppt/id/peraturan/pojk/Pages/POJK-8-2023-.aspx
[9] FATF. International Standards on Combating Money Laundering and the Financing of Terrorism & Proliferation — The FATF Recommendations. Versi diperbarui Juni 2026.
R1 risiko; R6 sanksi terarah terkait terorisme; R10 CDD; R11 catatan; R12 PEP; R16 transparansi pembayaran; R20 TKM; R21 kerahasiaan. Standar internasional, bukan peraturan Indonesia yang berlaku langsung.
https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html
[10] FATF. Guidance on Digital Identity. 2020.
Pedoman identitas digital yang netral terhadap teknologi. Mendukung pemisahan identifikasi, pembuktian identitas dan verifikasi; tidak menetapkan kewajiban menggunakan model AI.
https://www.fatf-gafi.org/content/dam/fatf/documents/recommendations/Guidance-on-Digital-Identity.pdf
[11] IMF. Financial Integrity Implications of Retail Central Bank Digital Currencies (rCBDCs). Fintech Notes 2025/010. 2025.
Kajian kebijakan untuk menghubungkan pilihan desain CBDC, risiko keuangan dan pembagian tanggung jawab AML/CFT. Digunakan sebagai konteks arsitektur, bukan sumber kewajiban hukum Indonesia.
https://www.imf.org/en/publications/fintech-notes/issues/2025/11/14/financial-integrity-implications-of-retail-central-bank-digital-currencies-rcbdcs-571769
[12] Bank Indonesia. Proyek Garuda Digital Rupiah, termasuk White Paper yang ditautkan pada portal.
Sumber primer konteks desain dan tahapan pengembangan rupiah digital. Perlakukan arsitektur penelitian sebagai model yang dijelaskan asumsi dan batasnya.
https://www.bi.go.id/id/rupiah/digital-rupiah/default.aspx
## Cara mencatat sumber untuk metodologi
Untuk setiap aturan, simpan judul sumber, nomor dan tahun, pasal atau bagian, jenis kewajiban, subjek yang diwajibkan, kondisi pemicu, tindakan, serta tanggal versi. Tambahkan kolom keputusan desain dan skenario uji. Dengan cara ini, perubahan parameter eksperimen dapat ditelusuri tanpa mengubah makna kewajiban hukum.
# Referensi teknis tambahan
[13] Hyperledger Fabric Chaincode Go — Client Identity Chaincode Library
Dokumentasi primer pemeriksaan identitas pemanggil, MSP dan atribut untuk kontrol akses.
https://github.com/hyperledger/fabric-chaincode-go/blob/main/pkg/cid/README.md
[14] Hyperledger Fabric — Endorsement policies
Dokumentasi primer kebijakan endorsement chaincode, collection dan state.
https://hyperledger-fabric.readthedocs.io/en/latest/endorsement-policies.html
[15] Hyperledger Fabric — Ledger
Dokumentasi primer world state, blockchain, transaksi valid dan pembagian penyimpanan.
https://hyperledger-fabric.readthedocs.io/en/latest/ledger/ledger.html
[16] PostgreSQL — Binary Data Types
Dokumentasi primer tipe bytea untuk data biner. Object storage adalah keputusan rancangan penelitian.
https://www.postgresql.org/docs/current/datatype-binary.html
[17] Tesseract — User Manual
Dokumentasi primer ekstraksi teks dan penggunaan mesin OCR berbasis LSTM serta model yang telah dilatih.
https://tesseract-ocr.github.io/tessdoc/
# Referensi endorsement tambahan
[18] Hyperledger Fabric — Fabric Gateway
Dokumentasi primer pengumpulan gabungan endorsement saat runtime dan validasi pilihan organisasi client.
https://hyperledger-fabric.readthedocs.io/en/latest/gateway.html
[19] Hyperledger Fabric — Smart Contracts and Chaincode
Dokumentasi primer hubungan contract, chaincode dan cakupan endorsement pada channel.
https://hyperledger-fabric.readthedocs.io/en/release-2.5/smartcontract/smartcontract.html
[20] Hyperledger Fabric Chaincode Go v2 — pkg/statebased
API NewStateEP, AddOrgs, Policy dan RoleTypePeer untuk pembentukan state-based endorsement.
https://pkg.go.dev/github.com/hyperledger/fabric-chaincode-go/v2@v2.3.0/pkg/statebased
| Lapisan sumber | Fungsi dalam penelitian |
| --- | --- |
| Hukum dan peraturan Indonesia | Dasar kewajiban bagi subjek yang termasuk cakupannya. UU 8/2010, UU 9/2013, PBI 10/2024, PADG 15/2025, aturan pelaporan PPATK, dan UU PDP. [1–4, 6–7] |
| Pedoman resmi BI dan FATF | Pedoman BI merinci penerapan CDD dan risiko. FATF memberi standar internasional dan panduan identitas digital; statusnya berbeda dari peraturan Indonesia. [5, 9–10] |
| Kajian CBDC dan pilihan desain | IMF memberi konteks risiko CBDC. Ambang alert, algoritme, arsitektur penyimpanan dan skenario uji ditetapkan sebagai desain penelitian dengan alasan yang terdokumentasi. [11] |
| Kontrol dan dasar | Usulan aturan prototipe | Bukti uji |
| --- | --- | --- |
| K01 Identifikasi
UU 8/2010 Pasal 18–20; CDD BI [1, 3–5] | Kumpulkan identitas, dokumen pendukung, sumber dana, tujuan hubungan usaha/transaksi dan pernyataan bertindak untuk diri sendiri. Daftar kolom rinci diturunkan dari pedoman CDD yang dipilih. | Data lengkap dapat diproses; kolom atau dokumen wajib yang kosong mencegah aktivasi/transaksi terkait. |
| K02 Verifikasi
UU 8/2010 Pasal 18 ayat (5); CDD BI; FATF Digital ID [1, 3, 5, 10] | Verifikasi terpisah dari pemeriksaan format NIK atau unggah KTP. Gunakan layanan simulasi dengan hasil cocok, tidak cocok, atau tidak tersedia; rekam rujukan dan waktu pemeriksaan. | Format benar tetapi identitas tidak cocok tetap gagal. Layanan tidak tersedia menghasilkan pending, tanpa aktivasi otomatis. |
| K03 Pihak yang diwakili
UU 8/2010 Pasal 19–20; aturan Beneficial Owner BI [1, 3–5] | Tanyakan apakah pengguna bertindak untuk diri sendiri. Permohonan mewakili orang/korporasi diarahkan ke alur di luar cakupan; jangan otomatis menyamakannya dengan pengguna perseorangan biasa. | Permohonan atas nama pihak lain tidak lolos jalur perseorangan tanpa pemeriksaan tambahan. |
| K04 Risiko dan EDD
PBI 10/2024; PADG 15/2025; FATF R1 dan R12 [3–4, 9] | Faktor risiko terdokumentasi menghasilkan tingkat risiko dan kebutuhan Enhanced Due Diligence (EDD). PEP menjadi pemicu pemeriksaan lebih lanjut sesuai ketentuan, bukan kesimpulan bahwa pengguna melakukan kejahatan. | Kasus berisiko tinggi masuk pemeriksaan tambahan dan memerlukan keputusan petugas yang berwenang. |
| K05 Pemantauan dan pembaruan
UU 8/2010 Pasal 18 ayat (5); CDD BI [1, 3–5] | Perubahan profil atau keraguan atas informasi memicu verifikasi ulang. Interval pembaruan diperlakukan sebagai kebijakan penelitian jika tidak bersumber pada ketentuan khusus. | Perubahan profil tercatat; status dan alasan keputusan dapat ditelusuri. |
| K06 Kegagalan PMPJ
UU 8/2010 Pasal 20 dan 22 [1] | Bedakan data belum lengkap, penolakan memenuhi PMPJ dan keraguan kebenaran informasi. Modelkan penolakan transaksi serta pemutusan hubungan dan pelaporan sesuai kondisi hukum. | Skenario pemutusan karena Pasal 22 menghasilkan catatan alasan dan kasus pelaporan TKM; tidak sekadar menghapus akun. |
| Kontrol dan dasar | Usulan aturan prototipe | Bukti uji |
| --- | --- | --- |
| A01 Screening DTTOT
UU 9/2013; PBI dan pedoman BI [2–5] | Gunakan daftar uji sintetis dengan nama, alias dan pengenal lain. Catat versi daftar. Kemiripan nama menghasilkan kandidat; penetapan kecocokan identitas memerlukan informasi pendukung. | Nama sama dengan pengenal berbeda diuji sebagai false positive. Kecocokan yang terbukti memicu tindakan serta merta sesuai ketentuan. |
| A02 Pemblokiran dan daftar baru
PBI 10/2024; PADG 15/2025; pedoman BI [3–5] | Modelkan pemblokiran dana yang terkena kewajiban DTTOT dan pelaporannya. Daftar baru memicu screening ulang. Jangan menyamakan blokir DTTOT dengan penundaan transaksi karena alert AML biasa. | Transfer dana yang diblokir ditolak. Pengguna lama yang cocok dengan pembaruan daftar ikut terdeteksi. |
| A03 Informasi transfer
UU 9/2013 Pasal 18–19; PBI 10/2024 [2–3] | Rekam informasi pengirim dan penerima, jumlah, waktu, mata uang serta informasi relevan menurut ketentuan. Rancang pemetaan field, bukan hanya alamat dompet pseudonim. | Transfer dengan informasi wajib yang tidak lengkap tidak diproses; transaksi dapat direkonstruksi oleh pihak berwenang. |
| A04 Pemantauan transaksi
UU 8/2010 Pasal 1 angka 5 dan Pasal 18; BI; FATF R20 [1, 3–5, 9] | Contoh rule penelitian: transaksi menyimpang dari profil atau rangkaian transaksi yang mengindikasikan penghindaran pelaporan. Jendela waktu, jumlah kejadian dan ambang nilai diberi label parameter eksperimen. | Kasus sintetis yang dirancang sebagai pola mencurigakan menghasilkan alert; transaksi normal pembanding tidak selalu diberi alert. |
| A05 Penilaian kasus dan LTKM
UU 8/2010 Pasal 23 dan 25; UU 9/2013 Pasal 13; PPATK 1/2021 [1–2, 6] | Alert masuk penilaian petugas dan keputusan beralasan. Simulasikan laporan kepada PPATK dan pantau tenggat. Alert algoritme tidak otomatis sama dengan pengetahuan adanya unsur TKM secara hukum. | Alasan, bukti, waktu mengetahui unsur TKM, dan pengiriman tersimpan; akhir pekan diperhitungkan dalam hari kerja. |
| A06 Kerahasiaan laporan
UU 8/2010 Pasal 12; UU 9/2013 Pasal 10 [1–2] | Batasi akses laporan dan status pelaporan pada peran berwenang. Pesan kepada pengguna tidak membocorkan laporan yang disusun atau disampaikan. | Pengguna ritel gagal membaca laporan, termasuk melalui API dan data ledger yang dapat diaksesnya. |
| A07 Retensi dan keamanan
UU 8/2010 Pasal 21; UU 9/2013 Pasal 19; UU PDP [1–2, 7] | Atur retensi berdasarkan jenis catatan dan pemicu hukumnya. Usulkan dokumen identitas di penyimpanan terbatas di luar ledger; ledger memuat ID acak, status dan rujukan audit minimum. | Penghapusan sebelum masa retensi ditolak; akses tanpa hak gagal; perubahan status dapat diaudit tanpa menampilkan citra KTP. |
| Ketentuan atau parameter | Cara menggunakannya |
| --- | --- |
| PMPJ pada awal hubungan usaha | UU 8/2010 Pasal 18 ayat (3) memuat beberapa pemicu. Pembukaan hubungan usaha sendiri memicu PMPJ; jangan menunggu transaksi mencapai Rp100 juta. [1] |
| Tenggat pelaporan TKM | UU 8/2010 Pasal 25 ayat (1): sesegera mungkin, paling lama 3 hari kerja setelah mengetahui unsur TKM. UU 9/2013 Pasal 13 memuat tenggat 3 hari kerja untuk TKM terkait pendanaan terorisme. [1–2] |
| Retensi identitas dan transfer | UU 8/2010 Pasal 21 ayat (2): minimal 5 tahun setelah hubungan usaha berakhir. UU 9/2013 Pasal 19 ayat (2): informasi pengirim/penerima minimal 5 tahun setelah transaksi pengiriman berakhir. Gunakan pemicu yang sesuai jenis catatan. [1–2] |
| Rp500 juta transaksi tunai | Pasal 23 UU 8/2010 membedakan pelaporan tunai, TKM, dan transfer lintas negara. Ambang tunai tersebut bukan batas transaksi dompet rupiah digital dan bukan ambang umum pelaporan TKM. [1] |
| Limit dompet dan ambang alert | Nilai saldo maksimum, frekuensi transfer dan jendela agregasi adalah parameter desain jika belum memiliki dasar khusus yang relevan. Jangan memindahkan limit uang elektronik ke CBDC tanpa dasar penerapan. |
| Komponen | Cakupan implementasi dan batasnya |
| --- | --- |
| PostgreSQL | Menyimpan akun, hash password, profil KYC, citra KTP sintetis dalam bytea, metadata dokumen, hasil review, kasus AML/CFT dan cache data ledger. PostgreSQL aplikasi bukan world state Fabric. [15–16] |
| KTP dan verifikasi | Gunakan dokumen sintetis bertanda DATA UJI. Identitas perseorangan domestik menjadi cakupan. Integrasi Dukcapil nyata, validasi keaslian dokumen, face matching dan liveness tidak diimplementasikan; hasil verifikasi identitas disimulasikan sebagai cocok, tidak cocok atau tidak tersedia. |
| Input data dan OCR | Baseline menggunakan formulir manual dan unggah KTP. Petugas membandingkan isian dengan citra; langkah ini hanya memeriksa kesesuaian transkripsi. OCR siap pakai dapat menjadi pengembangan tambahan. Jika memakai mesin LSTM Tesseract, jelaskan bahwa komponen tersebut menggunakan model yang sudah dilatih. [17] |
| Data pada Fabric | Menyimpan status dompet/KYC untuk keputusan transaksi, saldo/transaksi simulasi, role operasional terpilih dan jejak perubahan. Hindari citra KTP, password, NIK, data identitas lengkap dan laporan TKM dalam channel yang dapat dibaca pihak tanpa hak. |
| Evaluasi penyimpanan | Uji akses dokumen tanpa hak, berkas berubah dan kegagalan pencatatan dokumen. Simpan bytea dan metadata dokumen dalam transaksi database yang sesuai. Checksum mendeteksi perubahan byte terhadap rujukan tepercaya, bukan membuktikan KTP asli. |
| Tahap demonstrasi | Halaman atau tindakan yang disarankan | Hasil yang perlu terlihat |
| --- | --- | --- |
| 1 Akun | Register dan login yang sudah dibuat | Register membuat akun ritel berstatus belum KYC. Hak petugas tidak dapat dipilih melalui formulir publik. |
| 2 Pengajuan KYC | Formulir profil, unggah KTP dan status pengajuan | Citra dokumen masuk kolom bytea dan metadata masuk tabel dokumen PostgreSQL. Status berubah menjadi sedang ditinjau setelah data lengkap. |
| 3 Review oleh PJP | Daftar pengajuan dan detail review untuk petugas | Periksa dokumen sintetis, hasil verifikasi simulasi dan screening. Keputusan serta alasan dicatat; status ledger ditampilkan setelah commit valid. |
| 4 Penggunaan dompet | Saldo, transfer dan riwayat transaksi | Transfer ditolak jika status KYC atau dompet tidak memenuhi aturan. Saldo mengikuti ledger; data PostgreSQL hanya salinan untuk tampilan. |
| 5 Kasus dan audit | Daftar alert dan detail kasus untuk petugas berwenang | Tampilkan bukti, keputusan, tx_id dan jejak perubahan. Informasi pelaporan TKM tidak ditampilkan kepada pengguna ritel. [1–2] |
| Sumber kewenangan | Rancangan yang disarankan |
| --- | --- |
| PostgreSQL | Simpan role aplikasi dan cache role ledger. Role ini dapat mengatur tampilan, tetapi tidak menjadi satu-satunya bukti untuk SetKYCStatus, BlockWallet, Mint atau perubahan role di ledger. |
| Identitas Fabric | Gunakan identitas penandatangan yang telah diautentikasi, MSP ID dan atribut yang diterbitkan secara terkendali. Chaincode Go dapat memeriksa GetID, GetMSPID dan GetAttributeValue. Atribut sertifikat berbeda dari teks role yang dikirim sebagai argumen. [13] |
| Registry role pada ledger | Untuk petugas, simpan role aktif berdasarkan identitas Fabric. GrantRole dan RevokeRole hanya dapat dipanggil identitas pengelola role yang ditetapkan saat bootstrap. Pengelola tidak ditentukan oleh role di PostgreSQL. Perubahan role adalah transaksi baru yang tercatat. [13, 15] |
| Aturan chaincode | Periksa kewenangan pemanggil dan status KYC/dompet dari ledger untuk fungsi penting. Backend tidak cukup mengirim isAdmin=true atau kycApproved=true. Data off-chain tidak dibaca langsung oleh chaincode untuk menentukan role. |
| Endorsement policy | Tentukan organisasi yang harus mengesahkan hasil eksekusi. Endorsement beberapa organisasi tidak otomatis berarti beberapa petugas meninjau KTP; persetujuan manusia terpisah harus dimodelkan jika dibutuhkan. [14] |
| Manipulasi atau perubahan | Hasil yang diharapkan |
| --- | --- |
| Ubah role ritel menjadi petugas langsung pada PostgreSQL | Menu mungkin berbeda jika frontend memakai role tersebut, tetapi identitas ritel tetap gagal memanggil fungsi petugas pada chaincode. Akses dokumen off-chain harus ikut diuji; Fabric tidak melindunginya otomatis. |
| Ubah status KYC pada PostgreSQL menjadi disetujui | Transfer tetap memeriksa status ledger dan ditolak jika ledger belum menyetujui. Tidak ada sinkronisasi otomatis yang mengubah ledger hanya karena baris database berubah. |
| Kirim isAdmin=true atau role palsu melalui API | Backend dan chaincode menolak tindakan penting. Argumen permintaan tidak dipakai sebagai bukti kewenangan. |
| Ajukan GrantRole dari identitas tanpa hak | Tidak ada perubahan role ledger. Perubahan sah oleh pengelola berwenang menghasilkan transaksi dan alasan yang dapat diaudit. |
| Cabut role petugas melalui transaksi sah | Pemanggilan berikutnya gagal setelah pencabutan commit valid. Batalkan atau perbarui sesi aplikasi; periksa registry role aktif dalam chaincode, bukan hanya claim token lama. |
| Ganti referensi document_id atau isi bytea KTP | Akses tidak boleh berpindah ke dokumen pengguna lain. Ketidakcocokan terhadap rujukan checksum tepercaya memicu penanganan; checksum yang dapat diubah bersama berkas tidak memberi bukti independen. |
| Ledger commit berhasil tetapi pembaruan cache PostgreSQL gagal | Ledger tetap menjadi rujukan keputusan. Rekonsiliasi idempotent berdasarkan tx_id/versi memperbarui cache tanpa menjalankan transaksi bisnis dua kali. |
| Lapisan kontrol | Tugas implementasi |
| --- | --- |
| Otorisasi pemanggil | Chaincode memeriksa MSP, identitas dan role aktif untuk setiap fungsi. Contoh: penerbitan hanya oleh identitas penerbit yang berwenang. [13] |
| Persetujuan bisnis | Jika beberapa petugas harus menyetujui transaksi, simpan proposal dan approval dari identitas yang berbeda, terikat pada jumlah, pengirim, penerima dan jenis transaksi. Ini merupakan alur aplikasi, bukan endorsement otomatis peer. |
| Endorsement | Peer organisasi menjalankan chaincode dan menandatangani hasil eksekusi. Policy menentukan organisasi yang wajib mengesahkan hasil tersebut. [14] |
| Key saldo | Policy sebelum transaksi |
| --- | --- |
| wholesale:A | AND(BIMSP.peer, AMSP.peer) |
| wholesale:B | AND(BIMSP.peer, BMSP.peer) |
| retail:A:u1 | AMSP.peer |
| retail:B:u2 | BMSP.peer |
| Transaksi uji | Key yang diubah | Organisasi wajib |
| --- | --- | --- |
| Wholesale A ke B | wholesale:A dan wholesale:B | BI, A dan B |
| Konversi wholesale A ke retail A | wholesale:A dan retail:A:u1 | BI dan A |
| Retail A ke retail B | retail:A:u1 dan retail:B:u2 | A dan B |
| Retail internal A | Dua key retail di A | A |
| Tahap | Aturan prototipe yang disarankan |
| --- | --- |
| Propose | Buat proposal PENDING dengan identitas pengusul, jenis transaksi, jumlah, sumber dan tujuan. Jangan mengubah saldo terlebih dahulu. |
| Approve | Setiap petugas mengirim transaksi approval dengan identitas Fabric miliknya. Catat approver dan role, cegah approval ganda serta larang persetujuan diri sendiri jika kebijakan mensyaratkan pemisahan tugas. |
| Execute | Periksa approval lengkap, role masih aktif, proposal belum dieksekusi, saldo cukup serta kondisi KYC/dompet. Perbarui saldo dan status SETTLED dalam satu transaksi; perubahan rincian proposal membatalkan approval lama. |
| Reject atau expire | Tolak atau kedaluwarsakan proposal menurut kebijakan penelitian. Proposal yang belum menahan saldo harus diperiksa kembali saat Execute; jika ada reservation, aturan pelepasannya perlu dimodelkan. |