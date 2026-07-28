# AGENTS.md: Thesis academic writing

## Scope

These rules apply to manuscript prose under `thesis/`. Root repository instructions and any nearer chapter `AGENTS.md` also apply.

## Required skill workflow

For any task that drafts or revises natural-language manuscript prose:

1. Announce the academic workflow and mode before editing.
2. Apply the academic research suite first:
   - Codex: use `ars-codex:academic-research-suite` and route through its task-matched workflow.
   - Claude Code: use the matching plugin skill: `academic-research-skills:academic-paper`, `academic-research-skills:deep-research`, `academic-research-skills:academic-paper-reviewer`, or `academic-research-skills:academic-pipeline`.
3. Select the smallest applicable mode:
   - Drafting or revision: `academic-paper`.
   - Citation audit: `academic-paper` in `citation-check` mode.
   - Source discovery or fact-checking: `deep-research`.
   - Manuscript review: `academic-paper-reviewer`.
   - Full research-to-paper pipeline: only when the user explicitly requests it.
4. Stabilize claims, evidence, citations, and structure before style editing.
5. Apply `humanizer:humanizer` as the final prose pass.
6. Use humanizer's draft-audit-final process internally, but write only the final rewrite into manuscript files.

If either required skill is unavailable, report the exact missing skill. Never claim the combined workflow ran when it did not.

## Trigger boundary

Apply both skills to Indonesian or English academic prose in manuscript `.tex` files and directly related manuscript `.md` drafts.

Do not invoke both skills for changes limited to:

- BibTeX records or citation keys.
- LaTeX structure, commands, environments, or formatting.
- Equations, tables, figures, code, listings, generated files, or build artifacts.
- Review notes or administrative documents unless the user asks to draft or humanize them.

For mixed tasks, apply the workflow only to the natural-language prose portion.

## Protected content

Humanizer is a style editor, not a research or technical editor. It must preserve:

- Claim meaning, qualifications, uncertainty, and scope.
- Citations, citation keys, references, and source attribution.
- Numbers, units, benchmark results, equations, and statistical meaning.
- Proper names, technical terms, direct quotations, and defined terminology.
- Original English technical terms must stay in English unless the user explicitly asks to translate them.
- LaTeX commands, environments, labels, `\cite{...}`, `\ref{...}`, and cross-references.
- DTETI template structure, PUEBI/EYD, and formal Indonesian academic register. Do not inject conversational voice, personality, or unsupported interpretation.

After humanization, recheck claim-citation alignment and protected tokens. Compile the thesis when manuscript content changed.

## Bahasa Indonesia authority and precedence

Use these sources in this order for Indonesian manuscript prose:

1. Current EYD/PUEBI for spelling, capitalization, word separation, and punctuation.
2. Current KBBI Daring (`https://kbbi.kemdikbud.go.id/`) for current lexical forms and meanings.
3. The local 2008 *Kamus Bahasa Indonesia* as an offline lexical fallback and historical comparison.

The local source is documented at `../wiki/sources/Kamus Bahasa Indonesia 2008.md`; its immutable extraction is `.raw/papers/kamus-bahasa-indonesia-2008.md` relative to the repository root. Despite the filename `KBBI.pdf`, the printed title is *Kamus Bahasa Indonesia*, not *Kamus Besar Bahasa Indonesia*.

Use the 2008 source for lemmas, meanings, word classes, derivations, and usage labels. Do not treat its dictionary-specific punctuation, typography, or compressed forms such as `yg`, `dng`, `dl`, `dr`, and `sbg` as manuscript-writing rules. If it conflicts with a current official source, follow the current source and note the difference when relevant. DTETI guidance continues to govern thesis structure and academic presentation.

## Bahasa Indonesia grammar and project style

The examples below are project style defaults. The authority and precedence rules above govern any conflict.

### Kata dan Penulisan

**Kata Depan ("di", "ke", "dari") vs Awalan:**
- Kata depan: ditulis terpisah: `di dalam`, `ke atas`, `dari Jakarta`
- Awalan (imbuhan): ditulis serangkai: `dilakukan`, `menggunakan`, `diterapkan`
- BEDA: `di uji` (kata depan, salah) → `diuji` (awalan, benar)
- BEDA: `dilakukan di sistem` (kata depan, benar) vs `disistem` (salah)

**Partikel "pun":**
- Ditulis terpisah: `apa pun`, `siapa pun`, `di mana pun`
- Ditulis serangkai (pengecualian): `adapun`, `andaipun`, `bagaimanapun`, `biarpun`, `kalaupun`, `maupun`, `meskipun`, `sekalipun`, `walaupun`

**Kata Ulang:**
- Gunakan tanda hubung: `sistem-sistem`, `data-data`
- Angka tidak boleh diulang: `dua` bukan `dua-dua` (kecuali idiom)

**Gabungan Kata:**
- Serangkai: `daripada`, `kepada`, `apabila`, `bagaimana`
- Terpisah: `penanggung jawab`, `mata uang`, `uji coba`, `terima kasih`
- Jika dapat awalan/akhiran → serangkai: `dipertanggungjawabkan`, `mengujicobakan`

### Huruf Kapital

- Awal kalimat
- Nama orang, lembaga, negara: `Bank Indonesia`, `Hyperledger Fabric`
- Judul bab/section (di-handle otomatis oleh .cls)
- TIDAK kapital: nama bidang ilmu (`teknologi informasi`), istilah umum (`blockchain`)
- TIDAK kapital setelah tanda koma

### Huruf Miring / Italic (`\textit{}`)

- Pertahankan istilah teknis dalam bahasa Inggris asli. Jika perlu penjelasan dalam Bahasa Indonesia, jelaskan di sekeliling istilah tanpa menerjemahkan istilah teknisnya.
- Istilah asing pertama kali muncul: `\textit{Central Bank Digital Currency} (CBDC)`
- Kata/istilah Latin: `\textit{et al.}`, `\textit{ad hoc}`
- Judul buku/jurnal dalam daftar pustaka
- Setelah didefinisikan: gunakan roman (tidak miring)

### Angka dan Bilangan

- 1–10: tulis huruf (`satu`, `tiga node`)
- >10: tulis angka (`100 transaksi`, `25 peer`)
- Awal kalimat: harus ditulis huruf (`Seratus transaksi diuji...`)
- Satuan: `50 TPS`, `200 ms`: angka diikuti spasi, satuan sesuai standar
- Desimal: koma: `50,3` bukan `50.3`
- Ribuan: titik: `1.000` bukan `1,000`
- Rumus: boleh angka

### Tanda Baca

- Koma sebelum konjungsi antar-kalimat: `...diuji, sedangkan...`, `...valid, tetapi...`
- Koma sebelum `yaitu` dan `adalah` (opsional, konsisten per dokumen)
- Titik koma: pisahkan klausa setara dalam kalimat majemuk
- Tanda hubung (-): kata ulang, perangkai
- Tanda pisah (—): hanya bila benar-benar diperlukan; lebih pilih koma, tanda kurung, atau titik koma
- Kurung: penjelasan, singkatan pertama

### Kalimat Akademik

- Struktur: SPOK (Subjek-Predikat-Objek-Keterangan): kalimat lengkap
- Hindari: `di mana` sebagai pengganti "tempat" → gunakan `tempat` atau `dalam hal ini`
- Hindari: `daripada` untuk perbandingan → gunakan `dibandingkan dengan`
- Hindari: awalan `ke-` untuk membentuk kata kerja → bukan `ketimbang`, gunakan `dibandingkan`
- Kalimat efektif: satu gagasan per kalimat, hindari kalimat terlalu panjang (>25 kata)
- Paragraf: satu gagasan utama, 3–8 kalimat

### Kata Baku

- Gunakan kata baku, hindari bentuk lisan:
  - `tidak` bukan `enggak`
  - `tetapi` bukan `tapi`
  - `sudah` bukan `udah`
  - `melakukan` bukan `ngelakuin`
  - `memberikan` bukan `ngasih`
- Hindari singkatan tidak baku: `yg` → `yang`, `dg` → `dengan`, `ttg` → `tentang`
- Singkatan umum boleh setelah didefinisikan: `dkk.`, `dsb.`, `dst.`

### Pengecekan

- Jika ragu tentang bentuk atau makna mutakhir, periksa KBBI Daring, bukan Google Translate.
- Jika akses daring tidak tersedia, gunakan sumber lokal 2008 sebagai fallback dan tandai kemungkinan perbedaan edisi.
