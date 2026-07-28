# Tanggapan atas Review Tesis 25 Juli 2026

Dokumen ini memetakan revisi terhadap temuan pada
`thesis-review-2026-07-25.md`. Status **Selesai** berarti kode atau naskah telah
diubah dan dapat diverifikasi di repositori. Status **Sebagian** berarti klaim
telah dibatasi, tetapi kapabilitas yang diminta belum diimplementasikan. Status
**Administratif** memerlukan tindakan pemilik naskah di luar repositori.

## Temuan Kritis

| ID | Status | Tanggapan dan bukti |
|---|---|---|
| C1 | Selesai | Mutasi sensitif dilindungi pemeriksaan MSP pada `chaincode/digital_rupiah.go`. Bank Indonesia mengendalikan siklus peserta, penerbitan, penebusan, distribusi, limit, inisialisasi, dan RTGS. Bank/PJP menangani subjek ritel. Backend membatasi rute BI, menjadikan supervisor hanya-baca, dan memeriksa kepemilikan dompet/QRIS. Regresi berada di `chaincode/authorization_test.go` dan `backend/handlers/authorization_test.go`. |
| C2 | Selesai | `benchmark/workloads/negative-path.js` mencatat identitas kasus dan status tujuh pelanggaran. Setelah Caliper selesai, `scripts/validate-negative-path-log.js` mencocokkan detail galat *peer* dengan oracle setiap kasus. Penolakan generik diperlakukan sebagai `oracle_error`, bukan bukti penegakan; runner tidak memberi status PASS jika terdapat `enforcement gap` atau `oracle error`. |
| C3 | Selesai | Skenario diganti menjadi pengeluaran agregat melebihi saldo pada `benchmark/workloads/adversarial-double-spend.js`. Permintaan Rp200.000 melebihi pendanaan pengirim Rp50.000; saldo akhir harus nonnegatif. Karena status yang dikembalikan konektor tidak mempertahankan diagnostik *peer*, naskah tidak menetapkan penyebab 196 penolakan sebagai konflik MVCC. Skenario disebut *aggregate overspend/hot-key contention*, bukan pembuktian serangan *double-spend* protokol. |
| C4 | Selesai | Bab II dan Bab IV menyatakan PoC Proyek Garuda memakai R3 Corda dan Hyperledger Besu. Hyperledger Fabric hanya merupakan platform purwarupa penelitian ini. |

## Temuan Mayor

| ID | Status | Tanggapan dan bukti |
|---|---|---|
| M1 | Selesai | `scripts/run-full-suite.sh` memasang jaringan dan buku besar bersih untuk setiap profil, menunggu kesiapan port dan discovery, menghapus laporan lama, serta mewajibkan laporan baru. Log dengan ronde Caliper gagal ditandai FAIL walaupun proses Caliper keluar dengan status nol. |
| M2 | Sebagian | Profil transfer memakai pemanasan 30 detik dan ronde terukur 120 detik pada 30/60 TPS. Total populasi tetap 116 pelanggan, 16 pedagang, dan 52 slot pada konfigurasi 1/2/4 *worker*. Pemilihan transaksi deterministik; pemakaian ulang slot dan kontensi yang tersisa dinyatakan sebagai batasan. W1 dan W4 masih berupa satu observasi profil pada satu mesin sehingga tidak mendukung inferensi kausal pengaruh jumlah *worker*. |
| M3 | Selesai untuk *repeatability* | Naskah membedakan *repeatability* pada mesin yang sama dari *reproducibility* lintas mesin. Lima ronde ulang memakai konfigurasi identik. `scripts/write-benchmark-manifest.js` merekam commit, berkas kotor, versi alat, benih, profil, dan hash masukan. Reproduksibilitas lintas mesin belum diklaim. |
| M4 | Selesai | Bab IV menafsirkan interval kepercayaan sebagai ketidakpastian estimasi rerata, bukan pita yang harus memuat seluruh observasi. Hasil *completion throughput*, tingkat sukses, dan *successful throughput* dipisahkan. |
| M5 | Selesai | Bab II memisahkan konsep dua jenjang CBDC, tingkatan KYC ritel, dompet institusional, dan kapabilitas platform Fabric. Dompet institusional purwarupa tidak disebut sebagai bukti buku besar atau instrumen CBDC *wholesale*. |
| M6 | Selesai | Raft dijelaskan sebagai CFT. MSP memberi autentikasi dan atribusi, bukan perlindungan Byzantine. Topologi satu *consenter* tidak menoleransi kegagalan *orderer* dan tidak digunakan sebagai bukti *fault tolerance*. |
| M7 | Selesai melalui pembatasan klaim | Limit dan aturan risiko disebut parameter kebijakan purwarupa yang terinspirasi pendekatan berbasis risiko. Naskah tidak lagi menyetarakan tingkatan KYC dengan kepatuhan APU/PPT menyeluruh. |
| M8 | Selesai melalui pembatasan klaim | Pemisahan identitas mentah di PostgreSQL dari jangkar *on-chain* disebut pemisahan data, bukan privasi transaksi. Naskah menyatakan metadata dan graf transaksi terlihat bagi peserta berwenang pada kanal bersama. |
| M9 | Sebagian | Supervisor/OJK dibuat hanya-baca dan rute BI dibatasi. Kolom `senior_approval` tetap merupakan status yang dipasok penyedia; identitas pemberi persetujuan dan alur empat mata belum diimplementasikan. Klaim naskah telah dibatasi sesuai fakta tersebut. |
| M10 | Selesai | Klaim kebaruan dibatasi pada korpus yang ditinjau dan integrasi artefak penelitian. Lokator publik ditambahkan: `https://github.com/mfachrizalg/bi-coin`. Manifes benchmark mengikat hasil ke commit dan hash masukan. |
| M11 | Selesai melalui pembatasan lingkup | Bab I, Bab II, dan Bab V menyatakan bahwa HA, RTO/RPO, rotasi sertifikat/kunci, pemutakhiran, respons insiden, pemulihan bencana, hasil inklusi, tata kelola produksi, dan pembayaran luring belum dievaluasi. |

## Format dan Administrasi

| ID | Status | Tanggapan dan bukti |
|---|---|---|
| F1 | Administratif | Perubahan halaman pernyataan ditarik kembali atas permintaan penulis. Typo, tanda tangan, meterai, dan pengesahan resmi tetap harus diselesaikan oleh penulis dan pihak universitas. |
| F2 | Administratif | Perubahan tanggal pada halaman pernyataan dan kata pengantar ditarik kembali. Penetapan tanggal tetap mengikuti bukti administratif resmi. |
| F3 | Selesai | Intisari dan *abstract* dipadatkan menjadi kurang dari 250 kata, menghapus hasil batch lama, dan membatasi klaim sesuai bukti. |
| F4 | Selesai | Typo, spasi sebelum titik dua, ejaan, dan sejumlah konstruksi bahasa diperbaiki tanpa mengubah istilah teknis atau sitasi. |
| F5 | Sebagian | Naskah dikompilasi ulang untuk pemeriksaan layout. Perubahan metadata PDF dan templat kelas ditarik kembali; kepatuhan PDF/UA atau tagging aksesibilitas formal belum diimplementasikan. |

## Batasan yang Dipertahankan

Revisi tidak mengubah purwarupa menjadi sistem produksi. Backend tetap menjadi
trust boundary untuk identitas pengguna ritel karena identitas tersebut tidak
diteruskan ke chaincode. Pengujian kinerja dilakukan pada satu mesin dan satu
topologi lokal. Nilai limit belum divalidasi oleh Bank Indonesia/OJK, dan hasil
tidak dapat diekstrapolasi menjadi kapasitas nasional.

## Verifikasi

- `rtk go test -count=1 ./...` pada `bi-coin-fabric/backend`: 45 pengujian lulus.
- `rtk go test -count=1 ./...` pada `bi-coin-fabric/chaincode`: 42 pengujian lulus.
- `rtk node --test benchmark/workloads/*.test.js scripts/validate-negative-path-log.test.js`: 16 pengujian lulus.
- `rtk bash -n scripts/run-full-suite.sh`: sintaks valid.
- Sepuluh berkas YAML benchmark berhasil diparsing dengan `js-yaml`.
- `rtk npm run build` pada `bi-coin-fabric/frontend`: TypeScript dan Vite lulus.
- Batch benchmark `2026-07-27-214918`: tujuh profil PASS dengan laporan baru; manifes berada di `bi-coin-fabric/benchmark/results/2026-07-27-214918-manifest.json`.
- `rtk latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex`: berhasil menghasilkan `main.pdf` 136 halaman tanpa sitasi atau referensi tak terdefinisi.
- Intisari dan *abstract* masing-masing berjumlah 249 dan 248 kata menurut pemeriksaan berbasis token spasi setelah perintah LaTeX dihapus.
- Pemeriksaan visual halaman intisari, *abstract*, dan tabel hasil Bab IV tidak menemukan pemotongan konten.
