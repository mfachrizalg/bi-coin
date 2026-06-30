import { useEffect, useState } from 'react'
import { listLimits, type SystemLimit } from '../lib/api'

// Tier limits enforced by chaincode (not exposed via backend REST)
const TIER_POLICY = [
  { tier: 'BASIC',    maxBalance: 2_000_000,   dailyOut: 500_000,    monthlyOut: 5_000_000,   monthlyIn: 20_000_000,  perTx: 250_000 },
  { tier: 'STANDARD', maxBalance: 20_000_000,  dailyOut: 10_000_000, monthlyOut: 40_000_000,  monthlyIn: 40_000_000,  perTx: 2_500_000 },
  { tier: 'MERCHANT', maxBalance: 200_000_000, dailyOut: 50_000_000, monthlyOut: 500_000_000, monthlyIn: 500_000_000, perTx: 10_000_000 },
]

const SCOPE_LABELS: Record<string, string> = {
  global_supply:           'Batas Supply Global',
  per_participant_balance: 'Batas Saldo per Peserta',
  per_tx_amount:           'Batas Jumlah per Transaksi',
}

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function Limits() {
  const [systemLimits, setSystemLimits] = useState<SystemLimit[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    listLimits()
      .then(data => setSystemLimits(data ?? []))
      .catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ fontSize: '1rem' }}>
      <h2 style={{ marginBottom: 24, fontSize: '1.4rem' }}>Batas Transaksi</h2>

      {/* System limits from backend */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#374151' }}>Batas Sistem (Bank Indonesia)</h3>
        {error && (
          <div style={{ padding: '10px 14px', marginBottom: 12, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#dc2626', fontSize: '0.95rem' }}>
            {error}
          </div>
        )}
        {systemLimits.length === 0 ? (
          <div style={{ padding: '12px 14px', background: '#fefce8', border: '1px solid #fde047', borderRadius: 8, color: '#713f12', fontSize: '0.95rem' }}>
            Tidak ada batas sistem yang dikonfigurasi (atau chaincode belum diinisialisasi).
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Scope</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', borderBottom: '2px solid #e5e7eb' }}>Nilai</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Diatur pada</th>
              </tr>
            </thead>
            <tbody>
              {systemLimits.map(l => (
                <tr key={l.scope} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600 }}>
                    {SCOPE_LABELS[l.scope] ?? l.scope}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(l.value)}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#6b7280', fontSize: '0.9rem' }}>{l.set_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tier policy from chaincode defaults */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 6, color: '#374151' }}>Kebijakan Tier Dompet (Chaincode)</h3>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: 12 }}>
          Batas ini ditentukan oleh chaincode berdasarkan tier KYC. Tier ditetapkan otomatis saat dompet dibuat.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Tier</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap' }}>Saldo Maks</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap' }}>Limit Harian</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap' }}>Limit Bulanan Keluar</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap' }}>Limit Bulanan Masuk</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap' }}>Limit per Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {TIER_POLICY.map(t => (
                <tr key={t.tier} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1a3c6e' }}>{t.tier}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(t.maxBalance)}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(t.dailyOut)}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(t.monthlyOut)}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(t.monthlyIn)}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(t.perTx)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
