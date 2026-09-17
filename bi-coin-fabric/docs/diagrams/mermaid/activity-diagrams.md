# Activity Diagrams Track A — CBDC Digital Rupiah (Hyperledger Fabric)

Mermaid flowchart diagrams for AD01–AD04 with monochrome styling.
Generated for Luthfi thesis format.

**Thesis scope:** KYC is implementation-only, and QRIS is code-only; both are
excluded from thesis acceptance criteria. Thesis acceptance criteria cover participant lifecycle,
treasury issuance, two-tier distribution, retail transfer, participant freeze,
and supervision.

---

## AD01 — Pendaftaran Peserta (Participant Registration)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Klien/Bank]
    S1((" ")):::startend
    A1["Mengirimkan data<br>pendaftaran peserta"]:::action
  end

  subgraph lane_b [Backend API]
    A2["Menerima data pendaftaran<br>& meneruskan ke blockchain"]:::action
    A3["Simpan data peserta pending"]:::action
    D1{"[disetujui?]"}:::decision
    A4["Kirim notifikasi penolakan"]:::action
    E1a((" ")):::startend
    A5["POST /participants/{id}/approve"]:::action
    A6["Konfirmasi pendaftaran aktif"]:::action
    E1b((" ")):::startend
  end

  subgraph lane_c [Blockchain]
    A7["SubmitParticipant()<br>→ status = pending"]:::action
    A8["ApproveParticipant()<br>→ status = active"]:::action
    A9["Buat wallet otomatis<br>(wlt_&lt;participantID&gt;)"]:::action
  end

  S1 --> A1
  A1 --> A2
  A2 --> A7
  A7 --> A3
  A3 --> D1
  D1 -->|"[tidak]"| A4
  A4 --> E1a
  D1 -->|"[ya]"| A5
  A5 --> A8
  A8 --> A9
  A9 --> A6
  A6 --> E1b
```

---

## AD02 — Penerbitan Digital Rupiah (Digital Rupiah Issuance)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Bank Indonesia]
    S2((" ")):::startend
    B1["Inisiasi permintaan<br>penerbitan"]:::action
  end

  subgraph lane_b [Backend API]
    B2["Menerima request penerbitan<br>(POST /issuance-requests)"]:::action
    B3["Validasi role pengirim<br>(harus BI)"]:::action
    D2{"[role valid?]"}:::decision
    B4["Kirim error 403"]:::action
    E2a((" ")):::startend
    B5["Teruskan ke blockchain"]:::action
    B6["Kirim respons sukses ke BI"]:::action
    E2b((" ")):::startend
  end

  subgraph lane_c [Blockchain]
    B7["RequestIssuance()<br>Validasi BI authority"]:::action
    B8["Tolak penerbitan"]:::action
    E2c((" ")):::startend
    B9["Mint(bi_treasury)<br>supply += amount"]:::action
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

## AD03 — Distribusi Likuiditas dari Treasury (Treasury Liquidity Distribution)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Bank Indonesia]
    S3((" ")):::startend
    C1["Inisiasi distribusi<br>likuiditas ke Custodian"]:::action
  end

  subgraph lane_b [Backend API]
    C2["Terima request distribusi<br>(POST /distribute)"]:::action
    C3["Validasi role pengirim<br>= BI"]:::action
    D4{"[role BI?]"}:::decision
    C4["Kirim error"]:::action
    E3a((" ")):::startend
    C5["Teruskan ke blockchain"]:::action
    C6["Kirim konfirmasi distribusi"]:::action
    E3b((" ")):::startend
  end

  subgraph lane_c [Blockchain]
    C7["Validasi penerima = Validator Bank/PJP"]:::action
    D5{"[penerima Custodian?]"}:::decision
    C8["Tolak distribusi"]:::action
    E3c((" ")):::startend
    C9["Transfer dari bi_treasury<br>kurangi saldo Treasury"]:::action
    C10["Kredit wallet Custodian<br>tambah saldo penerima"]:::action
    C11["Catat transaksi distribusi"]:::action
  end

  S3 --> C1
  C1 --> C2
  C2 --> C3
  C3 --> D4
  D4 -->|"[tidak]"| C4
  C4 --> E3a
  D4 -->|"[ya]"| C5
  C5 --> C7
  C7 --> D5
  D5 -->|"[tidak]"| C8
  C8 --> E3c
  D5 -->|"[ya]"| C9
  C9 --> C10
  C10 --> C11
  C11 --> C6
  C6 --> E3b
```

---

## AD04 — Onboarding KYC Pelanggan (Customer KYC Onboarding)

```mermaid
flowchart TD
  classDef startend fill:#000,stroke:#000,color:#fff
  classDef action fill:#fff,stroke:#000,color:#000
  classDef decision fill:#fff,stroke:#000,color:#000

  subgraph lane_a [Operator]
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

## AD08 — Pembekuan Peserta (Participant Freeze)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart TD
    subgraph L1["🏊 Supervisor"]
        S([Start]) --> S1["Inisiasi pembekuan peserta"]
        S2["Inisiasi pembukaan blokir"]
    end
    subgraph L2["🏊 Backend API"]
        B1["POST /participants/{id}/freeze"] --> B2["Validasi otorisasi supervisor"]
        B2 --> D1{Otorisasi valid?}
        D1 -- tidak --> B3["Kirim error"] --> E1([End])
        B4["POST /participants/{id}/unfreeze"]
    end
    subgraph L3["🏊 Blockchain"]
        C1["FreezeParticipant()<br/>ubah status ke frozen"]
        C2["Freeze wallet terkait<br/>(cascade)"]
        C3["Catat supervision event<br/>participant_frozen"]
        D2{Akan di-unfreeze?}
        C4["UnfreezeParticipant()<br/>status kembali active"]
        C5["Unfreeze wallet"]
        C6["Catat supervision event<br/>participant_unfrozen"] --> E3([End])
    end
    S --> S1
    S1 --> B1
    D1 -- ya --> C1
    C1 --> C2 --> C3 --> D2
    D2 -- tidak --> E2([End])
    D2 -- ya --> S2
    S2 --> B4
    B4 --> C4 --> C5 --> C6
    B3 --> E1
```

---

## AD10 — Laporan Supervisi (Supervision Reports)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart TD
    subgraph L1["🏊 Supervisor"]
        S([Start]) --> S1["Akses dashboard supervisi"]
    end
    subgraph L2["🏊 Backend API"]
        B1["Terima permintaan laporan"] --> FK{{Fork}}
        FK --> B2["GET /supervision/events"]
        FK --> B3["GET /reports/reconciliation"]
        FK --> B4["GET /reports/metrics"]
        B2 --> JN{{Join}}
        B3 --> JN
        B4 --> JN
        JN --> B5["Gabungkan hasil laporan"]
        B5 --> B6["Format laporan supervisi"]
        B6 --> B7["Kirim laporan ke Supervisor"]
    end
    subgraph L3["🏊 Blockchain"]
        C1["GetSupervisionEvents()<br/>Kembalikan audit"]
        C2["GetReconciliationReport()<br/>Supply, issued, burned"]
        C3["GetMetrics()<br/>Statistik transaksi"]
    end
    S1 --> B1
    B2 -.-> C1 -.-> JN
    B3 -.-> C2 -.-> JN
    B4 -.-> C3 -.-> JN
    B7 --> E([End])
```
