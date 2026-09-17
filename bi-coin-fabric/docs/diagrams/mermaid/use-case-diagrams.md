# Mermaid Use Case Diagrams — Track C

**Thesis scope:** KYC is implementation-only, and QRIS is code-only; both are
excluded from thesis acceptance criteria. Thesis acceptance criteria cover participant lifecycle,
treasury issuance, two-tier distribution, retail transfer, participant freeze,
and supervision.

## UC01 — Sistem Keseluruhan (Overall System)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart LR
    BI[👤 Bank Indonesia]
    BV[👤 Validator Bank]
    PJP[👤 PJP]
    M[👤 Merchant]
    PR[👤 Pelanggan Ritel]
    SV[👤 Supervisor]
    OJK[👤 OJK Observer]

    subgraph SYS["Sistem bi-coin-fabric"]
        UC1([Mendaftarkan Peserta])
        UC2([Menerbitkan Digital Rupiah])
        UC3([Mendistribusikan Likuiditas])
        UC4([Mengelola KYC Pelanggan])
        UC5([Mentransfer Saldo])
        UC6([Transfer ke Pedagang])
        UC7([Bekukan/Cairkan Peserta])
        UC9([Laporan Supervisi])
    end

    BI --> UC1
    BI --> UC2
    BV --> UC1
    BI --> UC3
    PJP --> UC1
    PJP --> UC4
    M --> UC6
    PR --> UC5
    PR --> UC6
    BI --> UC7
    SV --> UC9
    OJK --> UC9

    UC1 -.->|include| UC4
    UC7 -.->|extend| UC1
```

---

## UC02 — Operasi Wholesale (Wholesale Operations)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart LR
    BI[👤 Bank Indonesia]
    BV[👤 Validator Bank]
    PJP[👤 PJP]
    SV[👤 Supervisor]

    subgraph WHO["Operasi Wholesale"]
        UC1([Menerbitkan Digital Rupiah])
        UC2([Mendistribusikan Likuiditas])
        UC3([Mengelola Siklus Hidup Peserta])
        UC4([Mengelola Kebijakan Limit])
        UC6([Laporan & Metrik])
    end

    BI --> UC1
    BI --> UC3
    BI --> UC4
    BI --> UC6
    BI --> UC2
    PJP --> UC3
    SV --> UC6

    UC2 -.->|include| UC1
```

---

## UC03 — Operasi Retail (Retail Operations)

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#000000', 'lineColor': '#000000'}}}%%
flowchart LR
    PR[👤 Pelanggan Ritel]
    M[👤 Merchant]

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

    UC4 -.->|include| UC3
```
