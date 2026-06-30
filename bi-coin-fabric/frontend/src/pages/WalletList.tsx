import { useEffect, useState } from 'react'
import { getWallets, listParticipants, initLedger, type Wallet, type Participant } from '../lib/api'
import { ParticipantTypeColor, ParticipantTypeLabel } from '../lib/constants'

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function WalletList({ onSelect }: { onSelect: (id: string) => void }) {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [participantMap, setParticipantMap] = useState<Record<string, Participant>>({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const ws = await getWallets()
      setWallets(ws ?? [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
    // participant badges — optional, silently skip if role lacks permission
    try {
      const ps = await listParticipants()
      const map: Record<string, Participant> = {}
      for (const p of ps ?? []) map[p.participant_id] = p
      setParticipantMap(map)
    } catch {
      // no access to participants for this role — skip type badges
    }
  }

  useEffect(() => { load() }, [])

  const q = search.toLowerCase()
  const filtered = wallets.filter(w =>
    w.wallet_id.toLowerCase().includes(q) ||
    w.participant_id.toLowerCase().includes(q) ||
    w.wallet_type.toLowerCase().includes(q)
  )

  const totalBalance = filtered.reduce((sum, w) => sum + w.balance, 0)
  const frozenCount = filtered.filter(w => w.frozen).length

  const badge = (participantId: string) => {
    const p = participantMap[participantId]
    if (!p) return null
    const type = p.participant_type
    return (
      <span style={{
        display: 'inline-block', padding: '1px 7px', borderRadius: 10,
        fontSize: 11, fontWeight: 600, color: '#fff',
        background: ParticipantTypeColor[type] ?? '#6b7280', marginLeft: 6,
      }}>
        {ParticipantTypeLabel[type] ?? type}
      </span>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          placeholder="Cari wallet ID, peserta, tipe…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '10px 14px',
            border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: '1rem',
          }}
        />
        {search && (
          <button onClick={() => setSearch('')}
            style={{ padding: '9px 14px', borderRadius: 6, border: '1px solid #d1d5db', cursor: 'pointer', fontSize: '1rem' }}>
            Hapus
          </button>
        )}
        <button onClick={load}
          style={{ padding: '9px 16px', borderRadius: 6, border: '1px solid #d1d5db', cursor: 'pointer', fontSize: '1rem' }}>
          Segarkan
        </button>
        <button
          onClick={() => initLedger().then(load).catch(e => setError(e.message))}
          style={{ padding: '9px 16px', borderRadius: 6, border: '1px solid #d1d5db', cursor: 'pointer', fontSize: '1rem' }}>
          Init Ledger
        </button>
      </div>

      {error && <div style={{ color: '#dc2626', fontSize: 14 }}>{error}</div>}
      {loading && <div style={{ color: '#6b7280', fontSize: 14 }}>Loading…</div>}

      {/* Balance summary */}
      {!loading && wallets.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Balance{search ? ' (filtered)' : ''}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1e3a8a', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
              {fmt(totalBalance)}
            </div>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, color: '#15803d', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Wallets
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#14532d', marginTop: 4 }}>
              {filtered.length - frozenCount}
              <span style={{ fontSize: 13, fontWeight: 400, color: '#6b7280', marginLeft: 6 }}>of {filtered.length}</span>
            </div>
          </div>
          <div style={{ background: frozenCount > 0 ? '#fef2f2' : '#f9fafb', border: `1px solid ${frozenCount > 0 ? '#fca5a5' : '#e5e7eb'}`, borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, color: frozenCount > 0 ? '#dc2626' : '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Frozen
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: frozenCount > 0 ? '#991b1b' : '#9ca3af', marginTop: 4 }}>
              {frozenCount}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Wallet ID', 'Peserta / Tipe', 'Tipe Dompet', 'Saldo (IDR)', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap', fontSize: '1rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && !loading && (
              <tr><td colSpan={5} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>
                {search ? `No wallets matching "${search}"` : 'No wallets'}
              </td></tr>
            )}
            {filtered.map(w => (
              <tr key={w.wallet_id}
                onClick={() => onSelect(w.wallet_id)}
                style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f8faff')}
                onMouseLeave={e => (e.currentTarget.style.background = '')}
              >
                <td style={{ padding: '10px 14px', color: '#2563eb', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                  {w.wallet_id}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{w.participant_id}</span>
                  {badge(w.participant_id)}
                </td>
                <td style={{ padding: '8px 12px', color: '#6b7280', textTransform: 'capitalize' }}>{w.wallet_type}</td>
                <td style={{ padding: '8px 12px', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                  {fmt(w.balance)}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{
                    display: 'inline-block', padding: '2px 8px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                    background: w.frozen ? '#fee2e2' : '#dcfce7',
                    color: w.frozen ? '#dc2626' : '#16a34a',
                  }}>
                    {w.frozen ? 'FROZEN' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {search && filtered.length > 0 && (
          <div style={{ padding: '6px 12px', fontSize: 12, color: '#6b7280', borderTop: '1px solid #f3f4f6' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
          </div>
        )}
      </div>
    </div>
  )
}
