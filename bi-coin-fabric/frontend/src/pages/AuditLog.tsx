import { useEffect, useRef, useState } from 'react'
import { AuditEntry, getAuditLog } from '../lib/api'

export default function AuditLog({ walletID }: { walletID: string }) {
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [error, setError] = useState('')
  const requestVersion = useRef(0)

  const load = async () => {
    if (!walletID) return
    const version = ++requestVersion.current
    try {
      const nextEntries = await getAuditLog(walletID)
      if (version === requestVersion.current) { setEntries(nextEntries); setError('') }
    } catch (e: any) {
      if (version === requestVersion.current) setError(e.message)
    }
  }

  useEffect(() => {
    setEntries([])
    setError('')
    void load()
    return () => { requestVersion.current += 1 }
  }, [walletID])

  if (!walletID) return (
    <div style={{ fontSize: '1rem', color: '#6b7280', marginTop: 24 }}>
      Pilih dompet dari tab Dompet untuk melihat log audit.
    </div>
  )

  return (
    <div style={{ fontSize: '1rem' }}>
      <h2 style={{ marginBottom: 20, fontSize: '1.4rem' }}>Log Audit — {walletID}</h2>
      {error && (
        <div style={{ padding: '10px 14px', marginBottom: 16, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#dc2626', fontSize: '1rem' }}>
          {error}
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
            <th style={{ padding: '10px 14px' }}>Tx ID</th>
            <th style={{ padding: '10px 14px' }}>Operasi</th>
            <th style={{ padding: '10px 14px' }}>Counterparty</th>
            <th style={{ padding: '10px 14px' }}>Jumlah</th>
            <th style={{ padding: '10px 14px' }}>Reference</th>
            <th style={{ padding: '10px 14px' }}>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e.txId} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.9rem' }}>{e.txId}</td>
              <td style={{ padding: '10px 14px' }}>{e.operation}</td>
              <td style={{ padding: '10px 14px' }}>{e.counterpartyId || '—'}</td>
              <td style={{ padding: '10px 14px', fontVariantNumeric: 'tabular-nums' }}>Rp {e.amount.toLocaleString('id-ID')}</td>
              <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.85rem' }}>{e.referenceId || '—'}</td>
              <td style={{ padding: '10px 14px', color: '#6b7280' }}>{e.timestamp}</td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr><td colSpan={6} style={{ padding: 20, textAlign: 'center', color: '#9ca3af' }}>Tidak ada transaksi</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
