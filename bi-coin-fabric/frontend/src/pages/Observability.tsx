import { useEffect, useState } from 'react'
import { getMetrics, getTopology, getTransactions, listLimits, type MetricsReport, type SystemLimit, type Topology, type TransactionRecord } from '../lib/api'
import { formatRupiah } from '../lib/money'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Observability() {
  const [metrics, setMetrics] = useState<MetricsReport | null>(null)
  const [topology, setTopology] = useState<Topology | null>(null)
  const [limits, setLimits] = useState<SystemLimit[]>([])
  const [transactions, setTransactions] = useState<TransactionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.allSettled([
      getMetrics(),
      getTopology(),
      listLimits(),
      getTransactions({ transaction_type: 'qris_payment' }),
    ])
      .then(results => {
        const errors = results.filter(result => result.status === 'rejected').map(result => String(result.reason?.message ?? result.reason))
        if (errors.length) setError(errors.join('; '))
        const [metricsResult, topologyResult, limitsResult, transactionsResult] = results
        if (metricsResult.status === 'fulfilled') setMetrics(metricsResult.value)
        if (topologyResult.status === 'fulfilled') setTopology(topologyResult.value)
        if (limitsResult.status === 'fulfilled') setLimits(limitsResult.value ?? [])
        if (transactionsResult.status === 'fulfilled') {
          setTransactions((transactionsResult.value ?? []).slice().sort((a, b) =>
            Date.parse(b.timestamp) - Date.parse(a.timestamp)).slice(0, 8))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">Observability</div>
          <h2>Backend system observability</h2>
        </div>
      </section>

      {error && <div className="banner error" role="alert">{error}</div>}

      {loading ? <LoadingSkeleton kind="metrics" label="Loading observability metrics" /> : <section className="metric-grid">
        <article className="metric-card">
          <span className="metric-label">Total participants</span>
          <strong>{metrics?.total_participants ?? '—'}</strong>
          <small>System snapshot</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Active wallets</span>
          <strong>{metrics?.active_wallets ?? '—'}</strong>
          <small>Application view</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Supply</span>
				<strong>{metrics ? formatRupiah(metrics.total_supply) : '—'}</strong>
          <small>Derived from `/reports/metrics`</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Settled transfers</span>
          <strong>{metrics?.total_transfers ?? '—'}</strong>
          <small>{metrics?.generated_at ?? '—'}</small>
        </article>
      </section>}

      <section className="panel-grid">
        <article className="surface-card">
          <h3>Logical topology</h3>
          <div className="stack-small">
            {loading ? <LoadingSkeleton kind="list" label="Loading network topology" rows={4} /> : topology?.nodes.map(node => (
              <div key={node.id} className="context-row">
                <div>
                  <strong>{node.name}</strong>
                  <div className="muted">{node.domain}</div>
                </div>
                <span className="pill">{node.role}</span>
              </div>
            )) ?? <p className="muted">Topology is unavailable.</p>}
          </div>
        </article>

        <article className="surface-card">
          <h3>Live system limits</h3>
          <div className="stack-small">
            {loading ? <LoadingSkeleton kind="list" label="Loading live system limits" rows={3} /> : limits.length === 0 && <p className="muted">No live limits found.</p>}
            {!loading && limits.map(limit => (
              <div key={limit.scope} className="context-row">
                <span>{limit.scope}</span>
				<strong>{formatRupiah(limit.value)}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <article className="surface-card">
        <h3>Recent QRIS payments</h3>
        <div className="table-shell">
          {loading ? <LoadingSkeleton kind="table" label="Loading recent QRIS payments" rows={5} /> : <table className="data-table">
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Sender</th>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr><td colSpan={5} className="empty-cell">No `qris_payment` transactions found.</td></tr>
              )}
              {transactions.map(tx => (
                <tr key={tx.tx_id}>
                  <td><code>{tx.tx_id}</code></td>
                  <td>{tx.participant_id}</td>
                  <td>{tx.counterparty_id}</td>
					<td>{formatRupiah(tx.amount)}</td>
                  <td>{tx.reference_id ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </article>
    </div>
  )
}
