# Mermaid Use Case Diagrams — Track C

**Thesis scope:** KYC is implementation-only, and QRIS is code-only; both are
excluded from thesis acceptance criteria. Thesis acceptance criteria cover participant lifecycle,
issuance to banks, two-tier distribution, retail transfer, participant restriction,
and supervision.

## UC01 — Sistem Keseluruhan (Overall System)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart LR
    BI[👤 Bank Indonesia]
    DB["👤 Distributor Bank"]
    M[👤 Merchant]
    PR[👤 Pelanggan Ritel]
    OBS["👤 Observer/Auditor (OJK, PPATK)"]
    KYC[👤 KYC Reviewer]
    SA[👤 Senior Approver]
    CO[👤 Compliance Officer]

    subgraph SYS["Sistem bi-coin-fabric"]
        UC1([Mendaftarkan Peserta])
        UC2([Menerbitkan w-Rupiah Digital])
        UC3([Mentransfer Antarbank])
        UC4([Mengelola KYC Pelanggan])
        UC5([Mentransfer Saldo])
        UC6([Transfer ke Pedagang])
        UC7([Membatasi/Membuka Pembatasan Peserta])
        UC9([Membaca Status Subjek])
    end

    BI --> UC1
    BI --> UC2
    DB --> UC3
    DB --> UC1
    DB --> UC4
    M --> UC6
    PR --> UC5
    PR --> UC6
    KYC --> UC4
    SA --> UC4
    KYC --> UC7
    SA --> UC7
    CO --> UC7
    OBS --> UC9

    UC1 -.->|include| UC4
    UC7 -.->|extend| UC1
```

---

## UC02 — Operasi Wholesale (Wholesale Operations)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart LR
    BI[👤 Bank Indonesia]
    DB["👤 Distributor Bank"]
    RB["👤 Retail Bank"]
    OBS["👤 Observer/Auditor (OJK, PPATK)"]

    subgraph WHO["Operasi Institusional"]
        UC1([Menerbitkan dan Menebus w-Rupiah Digital])
        UC2([Mentransfer Antarbank])
        UC3([Mengelola Siklus Hidup Peserta])
        UC4([Mengelola Kebijakan Limit])
        UC6([Membaca Status Subjek])
        UC7([Mengonversi ke r-Rupiah Digital])
        UC8([Mendanai Dompet Pelanggan])
    end

    BI --> UC1
    BI --> UC3
    BI --> UC4
    BI --> UC6
    DB --> UC2
    DB --> UC3
    RB --> UC2
    RB --> UC7
    RB --> UC8
    OBS --> UC6
```

---

## UC03 — Operasi Retail (Retail Operations)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart LR
    PR[👤 Pelanggan Ritel]
    M[👤 Merchant]
    KYC[👤 KYC Reviewer]
    SA[👤 Senior Approver]
    CO[👤 Compliance Officer]

    subgraph RET["Operasi Retail"]
        UC1([Registrasi KYC])
        UC2([Mentransfer Saldo])
        UC3([Transfer Antarpelanggan])
        UC4([Transfer ke Pedagang])
    end

    PR --> UC1
    PR --> UC2
    PR --> UC4
    M --> UC3
    KYC --> UC1
    SA --> UC1

    UC4 -.->|include| UC3
```
