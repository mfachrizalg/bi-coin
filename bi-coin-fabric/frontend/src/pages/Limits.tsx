import { useEffect, useState } from 'react'
import { getErrorMessage, listLimits, type SystemLimit } from '../lib/api'
import { formatRupiah } from '../lib/money'
import LoadingSkeleton from '../components/LoadingSkeleton'

const SCOPE_LABELS: Record<string, string> = {
  global_supply:           'Global supply cap',
  per_participant_balance: 'Participant balance cap',
  per_tx_amount:           'Transaction amount cap',
}


export default function Limits() {
  const [systemLimits, setSystemLimits] = useState<SystemLimit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listLimits()
      .then(data => setSystemLimits(data ?? []))
      .catch(e => setError(getErrorMessage(e)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="workspace-stack limits-page">
      <h2>Transaction limits</h2>
      <div className="callout">Live limits from the backend. Retail tier policy remains enforced by chaincode.</div>

      {/* System limits from backend */}
      <section>
        <h3>Bank Indonesia system limits</h3>
        {error && (
          <div className="banner error" role="alert">
            {error}
          </div>
        )}
        {loading ? <LoadingSkeleton kind="table" label="Loading system limits" rows={3} /> : systemLimits.length === 0 ? (
          <div className="callout warning">No system limits found. The chaincode may not be initialized.</div>
        ) : (
          <div className="table-shell">
          <table className="data-table">
            <thead>
              <tr>
                <th>Scope</th>
                <th>Value</th>
                <th>Set at</th>
              </tr>
            </thead>
            <tbody>
              {systemLimits.map(l => (
                <tr key={l.scope}>
                  <td>
                    {SCOPE_LABELS[l.scope] ?? l.scope}
                  </td>
                  <td className="numeric-cell">
                    {formatRupiah(l.value)}
                  </td>
                  <td className="muted">{l.set_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </section>
    </div>
  )
}
