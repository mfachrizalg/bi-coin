import { useEffect, useRef, useState } from 'react'
import { AuditEntry, getAuditLog, getErrorMessage } from '../lib/api'
import { formatRupiah } from '../lib/money'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function AuditLog({ walletID }: { walletID: string }) {
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const requestVersion = useRef(0)

  const load = async () => {
    if (!walletID) { setLoading(false); return }
    const version = ++requestVersion.current
    try {
      const nextEntries = await getAuditLog(walletID)
      if (version === requestVersion.current) { setEntries(nextEntries); setError('') }
    } catch (e) {
      if (version === requestVersion.current) setError(getErrorMessage(e))
    } finally {
      if (version === requestVersion.current) setLoading(false)
    }
  }

  useEffect(() => {
    setEntries([])
    setError('')
    setLoading(Boolean(walletID))
    void load()
    return () => { requestVersion.current += 1 }
  }, [walletID])

  if (!walletID) return (
    <div className="muted">
      Select a wallet to view its audit log.
    </div>
  )

  return (
    <div className="workspace-stack audit-log-page">
      <h2>Audit log / <span className="mono">{walletID}</span></h2>
      {error && (
        <div className="banner error" role="alert">
          {error}
        </div>
      )}
      {loading ? <LoadingSkeleton kind="table" label="Loading audit log" rows={5} /> : <div className="table-shell"><table className="data-table">
        <thead>
          <tr>
            <th>Tx ID</th>
            <th>Operation</th>
            <th>Counterparty</th>
            <th>Amount</th>
            <th>Reference</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e.txId}>
              <td className="mono">{e.txId}</td>
              <td>{e.operation}</td>
              <td>{e.counterpartyId || '—'}</td>
              <td className="numeric-cell">{formatRupiah(e.amount)}</td>
              <td className="mono">{e.referenceId || '—'}</td>
              <td className="muted">{e.timestamp}</td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr><td colSpan={6} className="empty-cell">No transactions found.</td></tr>
          )}
        </tbody>
      </table></div>}
    </div>
  )
}
