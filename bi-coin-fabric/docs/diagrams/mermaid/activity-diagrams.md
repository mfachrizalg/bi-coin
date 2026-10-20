# Activity Diagrams Track A — CBDC Digital Rupiah (Hyperledger Fabric)

Mermaid flowchart diagrams for AD01–AD04 with monochrome styling.
Generated for Luthfi thesis format.

**Thesis scope:** KYC is implementation-only, and QRIS is code-only; both are
excluded from thesis acceptance criteria. Thesis acceptance criteria cover participant lifecycle,
issuance to banks, two-tier distribution, retail transfer, participant restriction,
and supervision.

---

## AD01 — Pendaftaran Peserta (Participant Registration)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Distributor Bank]
    S1((" ")):::startend
    A1["Kirim data pendaftaran peserta"]:::action
  end

  subgraph lane_b [Backend API]
    A2["POST /subjects"]:::action
    A3["Validasi peran dan data pendaftaran"]:::action
    D1{"Data valid?"}:::decision
    A4["Kirim error validasi"]:::action
    E1a((" ")):::startend
    A5["POST /subjects/{subject_id}/decisions"]:::action
    A6["POST /subjects/{subject_id}/decisions"]:::action
    A7["Kirim hasil pendaftaran"]:::action
    E1b((" ")):::startend
  end

  subgraph lane_c [Blockchain]
    A8["CreatePending()<br>status = pending"]:::action
    A9["ApproveStandard() / DecideHighRisk()<br>status = active"]:::action
    A10["ApproveStandard() / DecideHighRisk()<br>status = rejected"]:::action
  end

  subgraph lane_d [Staf Distributor]
    A11["Tinjau pengajuan peserta"]:::action
    D2{"Pengajuan disetujui?"}:::decision
  end

  S1 --> A1
  A1 --> A2
  A2 --> A3
  A3 --> D1
  D1 -->|"[tidak]"| A4
  A4 --> E1a
  D1 -->|"[ya]"| A8
  A8 --> A11
  A11 --> D2
  D2 -->|"[ya]"| A5
  A5 --> A9
  A9 --> A7
  D2 -->|"[tidak]"| A6
  A6 --> A10
  A10 --> A7
  A7 --> E1b
```

---

## AD02 — Penerbitan w-Rupiah Digital ke Distributor (w-Rupiah Digital Issuance)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Bank Indonesia]
    S2((" ")):::startend
    B1["Inisiasi penerbitan<br>w-Rupiah Digital"]:::action
  end

  subgraph lane_b [Backend API]
    B2["Menerima request penerbitan<br>(POST /issuances)"]:::action
    B3["Validasi role pengirim<br>(harus BI)"]:::action
    D2{"[role valid?]"}:::decision
    B4["Kirim error 403"]:::action
    E2a((" ")):::startend
    B5["Teruskan ke blockchain"]:::action
    B6["Kirim respons sukses ke BI"]:::action
    E2b((" ")):::startend
  end

  subgraph lane_c [Blockchain]
    B7["Issue()<br>Validasi kewenangan BI<br>dan Distributor"]:::action
    B8["Tolak penerbitan"]:::action
    E2c((" ")):::startend
    B9["Kredit reserve<br>dan supply wholesale"]:::action
    B10["Catat transaksi penerbitan<br>(emit audit)"]:::action
  end

  S2 --> B1
  B1 --> B2
  B2 --> B3
  B3 --> D2
  D2 -->|"[tidak]"| B4
  B4 --> E2a
  D2 -->|"[ya]"| B5
  B5 --> B7
  B7 --> B9
  B9 --> B10
  B10 --> B6
  B6 --> E2b
```

---

## AD03 — Transfer Antarbank, Konversi, dan Pendanaan Dompet (Interbank Transfer, Conversion, and Wallet Funding)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Distributor Bank]
    T0((" ")):::startend
    T1["Inisiasi transfer antarbank"]:::action
  end

  subgraph lane_b [Backend API]
    T2["Terima request transfer<br>(POST /interbank-transfers)"]:::action
    T3["Validasi peran<br>Distributor Bank"]:::action
    D1{"[Peran valid?]"}:::decision
    T4["Kirim error 403"]:::action
    TE1((" ")):::startend
    T6["Kirim konfirmasi transfer"]:::action
    V2["Terima request konversi<br>(POST /conversions)"]:::action
    V3["Validasi peran<br>Retail Bank"]:::action
    D2{"[Peran valid?]"}:::decision
    V4["Kirim error 403"]:::action
    VE1((" ")):::startend
    V6["Kirim konfirmasi konversi"]:::action
    F2["Terima request pendanaan<br>(POST /wallet-fundings)"]:::action
    F3["Validasi peran<br>Retail Bank"]:::action
    D3{"[Peran valid?]"}:::decision
    F4["Kirim error 403"]:::action
    FE1((" ")):::startend
    F6["Kirim konfirmasi pendanaan"]:::action
    FE2((" ")):::startend
  end

  subgraph lane_c [Blockchain]
    T7["TransferReserve() validasi nominal dan atribut pengirim"]:::action
    D4{"[Saldo reserve cukup?]"}:::decision
    T8["Tolak transfer"]:::action
    TE2((" ")):::startend
    T9["Kurangi reserve pengirim, tambah reserve penerima"]:::action
    T10["Catat transaksi transfer"]:::action
    V5["ConvertToRetail() validasi atribut dan kind retail"]:::action
    D5{"[Saldo reserve cukup?]"}:::decision
    V7["Tolak konversi"]:::action
    VE2((" ")):::startend
    V8["Debit reserve w-Rupiah Digital, kredit float r-Rupiah Digital"]:::action
    V9["Catat transaksi konversi"]:::action
    F5["FundWallet() validasi kelayakan dan limit"]:::action
    D6{"[Subjek layak dan dalam limit?]"}:::decision
    F7["Tolak pendanaan"]:::action
    FE3((" ")):::startend
    F8["Debit float r-Rupiah Digital, kredit dompet pelanggan"]:::action
    F9["Catat transaksi pendanaan"]:::action
  end

  subgraph lane_d [Retail Bank]
    V1["Inisiasi konversi ke r-Rupiah Digital"]:::action
    F1["Inisiasi pendanaan dompet pelanggan"]:::action
  end

  T0 --> T1
  T1 --> T2
  T2 --> T3
  T3 --> D1
  D1 -->|"[tidak]"| T4
  T4 --> TE1
  D1 -->|"[ya]"| T7
  T7 --> D4
  D4 -->|"[tidak]"| T8
  T8 --> TE2
  D4 -->|"[ya]"| T9
  T9 --> T10
  T10 --> T6
  T6 --> V1
  V1 --> V2
  V2 --> V3
  V3 --> D2
  D2 -->|"[tidak]"| V4
  V4 --> VE1
  D2 -->|"[ya]"| V5
  V5 --> D5
  D5 -->|"[tidak]"| V7
  V7 --> VE2
  D5 -->|"[ya]"| V8
  V8 --> V9
  V9 --> V6
  V6 --> F1
  F1 --> F2
  F2 --> F3
  F3 --> D3
  D3 -->|"[tidak]"| F4
  F4 --> FE1
  D3 -->|"[ya]"| F5
  F5 --> D6
  D6 -->|"[tidak]"| F7
  F7 --> FE3
  D6 -->|"[ya]"| F8
  F8 --> F9
  F9 --> F6
  F6 --> FE2
```

---

## AD04 — Onboarding KYC Pelanggan (Customer KYC Onboarding)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Operator Distributor Bank]
    S4((" ")):::startend
    D1a["Mengirim data KYC<br>pelanggan"]:::action
  end

  subgraph lane_b [Backend API]
    D2a["Terima data KYC<br>(POST /kyc/profiles)"]:::action
    D3a["Validasi kelengkapan<br>data KYC"]:::action
    D6a{"[data lengkap?]"}:::decision
    D4a["Kirim error validasi"]:::action
    E4a((" ")):::startend
    D5a["Kirim ke blockchain"]:::action
    D8a["Simpan profil KYC pending"]:::action
    D9a["Proses verifikasi KYC<br>(POST /kyc/profiles/{id}/refresh)"]:::action
    D10["Kirim notifikasi hasil KYC"]:::action
    E4b((" ")):::startend
  end

  subgraph lane_c [Blockchain]
    D7a["SubmitKycProfile()<br>→ status = pending"]:::action
    D10a["RefreshKycProfile()<br>Periksa dokumen & risiko"]:::action
    D7{"[hasil verifikasi?]"}:::decision
    D11["status = approved"]:::action
    D12["status = rejected"]:::action
  end

  S4 --> D1a
  D1a --> D2a
  D2a --> D3a
  D3a --> D6a
  D6a -->|"[tidak]"| D4a
  D4a --> E4a
  D6a -->|"[ya]"| D5a
  D5a --> D7a
  D7a --> D8a
  D8a --> D9a
  D9a --> D10a
  D10a --> D7
  D7 -->|"[disetujui]"| D11
  D7 -->|"[ditolak]"| D12
  D11 --> D10
  D12 --> D10
  D10 --> E4b
```


# Activity Diagrams Track B — CBDC Digital Rupiah (Hyperledger Fabric)

Mermaid flowchart diagrams for AD05–AD07 with monochrome styling.
Generated for Luthfi thesis format.

---

## AD05 — Transfer Saldo Ritel (Retail Balance Transfer)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Pelanggan]
    S1((" ")):::startend
    A1["Inisiasi transfer saldo"]:::action
  end

  subgraph lane_b [Backend API]
    B1["POST /transfers<br>Terima request transfer"]:::action
    B2["Validasi token autentikasi"]:::action
    D1{"[token valid?]"}:::decision
    B3["Kirim error 401"]:::action
    E1a((" ")):::startend
    B4["Kirim request ke Blockchain"]:::action
    B5["Kirim konfirmasi transfer"]:::action
    E1b((" ")):::startend
  end

  subgraph lane_c [Blockchain]
    C1["Periksa saldo pengirim"]:::action
    D2{"[saldo cukup?]"}:::decision
    C2["Tolak transfer"]:::action
    E2a((" ")):::startend
    C3["Validasi limit transaksi<br>(per-tx, harian, bulanan)"]:::action
    D3{"[dalam limit?]"}:::decision
    C4["Tolak transfer"]:::action
    E2b((" ")):::startend
    C5["Validasi tier penerima<br>(BASIC/STANDARD/MERCHANT)"]:::action
    C6["Debit pengirim<br>Kredit penerima"]:::action
    D4{"[saldo < minimum?]"}:::decision
    C7["Auto-redeem<br>sisa saldo"]:::action
    C8["Catat transaksi"]:::action
  end

  S1 --> A1
  A1 --> B1
  B1 --> B2
  B2 --> D1
  D1 -->|"[tidak]"| B3
  B3 --> E1a
  D1 -->|"[ya]"| B4
  B4 --> C1
  C1 --> D2
  D2 -->|"[tidak]"| C2
  C2 --> E2a
  D2 -->|"[ya]"| C3
  C3 --> D3
  D3 -->|"[tidak]"| C4
  C4 --> E2b
  D3 -->|"[ya]"| C5
  C5 --> C6
  C6 --> D4
  D4 -->|"[ya]"| C7
  C7 --> C8
  D4 -->|"[tidak]"| C8
  C8 --> B5
  B5 --> E1b
```

---

## AD08 — Pembatasan Peserta (Participant Restriction)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart TD
    subgraph L1["🏊 Staf Distributor"]
        S([Start]) --> S1["Compliance Officer menginisiasi pembatasan peserta"]
        S2["KYC Reviewer mengajukan permintaan pembukaan pembatasan"]
        S3["Senior Approver menyetujui pembukaan pembatasan"]
    end
    subgraph L2["🏊 Backend API"]
        B1["POST /subjects/{subject_id}/restrictions"] --> B2["Validasi peran Distributor"]
        B2 --> D1{Otorisasi valid?}
        D1 -- tidak --> B3["Kirim error"] --> E1([End])
        B4["POST /subjects/{subject_id}/restriction-release-requests"]
        B5["POST /subjects/{subject_id}/restriction-release-decisions"]
    end
    subgraph L3["🏊 Blockchain"]
        C1["FreezeSubject() ubah status peserta ke dibatasi"]
        C2["Batasi subjek<br/>(transfer ditolak selama pembatasan)"]
        C3["Catat pembatasan subjek"]
        D2{Akan dibuka pembatasannya?}
        C4["RequestUnfreeze() catat reviewer dan referensi bukti"]
        C5["ApproveUnfreeze() status kembali ke active"]
        C6["Buka pembatasan subjek"]
        C7["Catat pembukaan pembatasan subjek"] --> E3([End])
    end
    S --> S1
    S1 --> B1
    D1 -- ya --> C1
    C1 --> C2 --> C3 --> D2
    D2 -- tidak --> E2([End])
    D2 -- ya --> S2
    S2 --> B4
    B4 --> C4 --> S3
    S3 --> B5
    B5 --> C5 --> C6 --> C7
    B3 --> E1
```

---

## AD10 — Pembacaan Status Subjek oleh Auditor (Subject Status Read)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart TD
    subgraph L1["🏊 Observer/Auditor (OJK, PPATK)"]
        S([Start]) --> S1["Akses status subjek"]
    end
    subgraph L2["🏊 Backend API"]
        B1["GET /subjects/{subject_id}"] --> B2["Validasi peran (BI, Distributor Bank, atau Auditor)"]
        B3["Kirim status subjek ke Auditor"]
    end
    subgraph L3["🏊 Blockchain"]
        C1["GetSubject()<br/>Kembalikan status subjek"]
    end
    S1 --> B1
    B2 -.-> C1 -.-> B3
    B3 --> E([End])
```
