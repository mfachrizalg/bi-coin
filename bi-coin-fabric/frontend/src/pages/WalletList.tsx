import { useEffect, useState } from 'react'
import { getErrorMessage, getWallets, listParticipants, initLedger, type Wallet, type Participant } from '../lib/api'
import { ParticipantTypeLabel } from '../lib/constants'
import { formatRupiah, sumRupiah } from '../lib/money'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function WalletList({
  onSelect,
  role,
  showParticipantBadges = false,
}: {
  onSelect: (id: string) => void
  role?: string
  showParticipantBadges?: boolean
}) {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [participantMap, setParticipantMap] = useState<Record<string, Participant>>({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const ws = await getWallets()
      setWallets(ws ?? [])
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setLoading(false)
    }
    if (showParticipantBadges) {
      try {
        const ps = await listParticipants()
        const map: Record<string, Participant> = {}
        for (const p of ps ?? []) map[p.participant_id] = p
        setParticipantMap(map)
      } catch {
        setParticipantMap({})
      }
    } else {
      setParticipantMap({})
    }
  }

  useEffect(() => { load() }, [])

  const q = search.toLowerCase()
  const filtered = wallets.filter(w =>
    w.wallet_id.toLowerCase().includes(q) ||
    w.participant_id.toLowerCase().includes(q) ||
    w.wallet_type.toLowerCase().includes(q)
  )

  const totalBalance = sumRupiah(filtered.map(w => w.balance))
  const frozenCount = filtered.filter(w => w.frozen).length

  const badge = (participantId: string) => {
    const p = participantMap[participantId]
    if (!p) return null
    const type = p.participant_type
    return (
      <span className={`participant-badge participant-${type}`}>
        {ParticipantTypeLabel[type] ?? type}
      </span>
    )
  }

  return (
    <div className="workspace-stack wallet-page">
      {/* Toolbar */}
      <div className="button-row wallet-toolbar">
        <input
          className="app-input wallet-search"
          placeholder="Search Wallet ID, participant, or type"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="secondary-button" onClick={() => setSearch('')}>
            Clear
          </button>
        )}
        <button className="secondary-button" onClick={load}>
          Refresh
        </button>
        {role === 'bank_indonesia' && <button
          className="secondary-button"
          onClick={() => initLedger().then(load).catch(e => setError(getErrorMessage(e)))}
        >
          Initialize ledger
        </button>}
      </div>

      {error && <div className="banner error" role="alert">{error}</div>}

      {/* Balance summary */}
      {!loading && wallets.length > 0 && (
        <div className="metric-grid wallet-summary-grid">
          <div className="metric-card">
            <div className="metric-label">Total balance{search ? ' (filtered)' : ''}</div>
            <div className="summary-value">{formatRupiah(totalBalance)}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Active wallets</div>
            <div className="summary-value">
              {filtered.length - frozenCount}
              <span>of {filtered.length}</span>
            </div>
          </div>
          <div className={`metric-card${frozenCount > 0 ? ' warning-card' : ''}`}>
            <div className="metric-label">Frozen</div>
            <div className="summary-value">
              {frozenCount}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              {['Wallet ID', 'Participant / type', 'Wallet type', 'Balance (IDR)', 'Status'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5}><LoadingSkeleton kind="table" label="Loading wallets" rows={5} /></td></tr>
            )}
            {filtered.length === 0 && !loading && (
              <tr><td colSpan={5} className="empty-cell">
                {search ? `No wallets matching "${search}"` : 'No wallets'}
              </td></tr>
            )}
            {filtered.map(w => (
              <tr key={w.wallet_id} className="selectable-row"
                onClick={() => onSelect(w.wallet_id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(w.wallet_id) } }}
                tabIndex={0}
                role="button"
                aria-label={`Select wallet ${w.wallet_id}`}
              >
                <td className="mono wallet-id">
                  {w.wallet_id}
                </td>
                <td>
                  <span className="mono">{w.owner_id || w.participant_id}</span>
                  <span className="wallet-custodian">(custodian: {w.participant_id})</span>
                  {badge(w.participant_id)}
                </td>
                <td className="muted wallet-type">{w.wallet_type}</td>
                <td className="wallet-balance">
                  {formatRupiah(w.balance)}
                </td>
                <td>
                  <span className={`status ${w.frozen ? 'status-frozen' : 'status-active'}`}>
                    {w.frozen ? 'Frozen' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {search && filtered.length > 0 && (
          <div className="table-note">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
          </div>
        )}
      </div>
    </div>
  )
}
