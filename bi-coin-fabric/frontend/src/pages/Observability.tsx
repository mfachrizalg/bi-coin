import { useEffect, useState } from 'react'
import { getMetrics, getTopology, getTransactions, listLimits, type MetricsReport, type SystemLimit, type Topology, type TransactionRecord } from '../lib/api'

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function Observability() {
  const [metrics, setMetrics] = useState<MetricsReport | null>(null)
  const [topology, setTopology] = useState<Topology | null>(null)
  const [limits, setLimits] = useState<SystemLimit[]>([])
  const [transactions, setTransactions] = useState<TransactionRecord[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      getMetrics(),
      getTopology(),
      listLimits(),
      getTransactions({ transaction_type: 'qris_payment' }),
    ])
      .then(([nextMetrics, nextTopology, nextLimits, nextTransactions]) => {
        setMetrics(nextMetrics)
        setTopology(nextTopology)
        setLimits(nextLimits ?? [])
        setTransactions((nextTransactions ?? []).slice(0, 8))
      })
      .catch(e => setError(e.message))
  }, [])

  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">Observability</div>
          <h2>Topologi, limits, dan pembayaran terbaru berbasis backend.</h2>
        </div>
      </section>

      {error && <div className="banner error">{error}</div>}

      <section className="metric-grid">
        <article className="metric-card">
          <span className="metric-label">Total peserta</span>
          <strong>{metrics?.total_participants ?? '—'}</strong>
          <small>Snapshot sistem</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Dompet aktif</span>
          <strong>{metrics?.active_wallets ?? '—'}</strong>
          <small>Node application view</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Supply</span>
          <strong>{metrics ? fmt(metrics.total_supply) : '—'}</strong>
          <small>Derived from `/reports/metrics`</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Transfer tersettle</span>
          <strong>{metrics?.total_transfers ?? '—'}</strong>
          <small>{metrics?.generated_at ?? '—'}</small>
        </article>
      </section>

      <section className="panel-grid">
        <article className="surface-card">
          <h3>Logical topology</h3>
          <div className="stack-small">
            {topology?.nodes.map(node => (
              <div key={node.id} className="context-row">
                <div>
                  <strong>{node.name}</strong>
                  <div className="muted">{node.domain}</div>
                </div>
                <span className="pill">{node.role}</span>
              </div>
            )) ?? <p className="muted">Topology belum tersedia.</p>}
          </div>
        </article>

        <article className="surface-card">
          <h3>Live system limits</h3>
          <div className="stack-small">
            {limits.length === 0 && <p className="muted">Tidak ada limit live dari backend.</p>}
            {limits.map(limit => (
              <div key={limit.scope} className="context-row">
                <span>{limit.scope}</span>
                <strong>{fmt(limit.value)}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <article className="surface-card">
        <h3>Pembayaran QRIS terbaru</h3>
        <div className="table-shell">
          <table className="data-table">
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
                <tr><td colSpan={5} className="empty-cell">Belum ada transaksi `qris_payment`.</td></tr>
              )}
              {transactions.map(tx => (
                <tr key={tx.tx_id}>
                  <td><code>{tx.tx_id}</code></td>
                  <td>{tx.participant_id}</td>
                  <td>{tx.counterparty_id}</td>
                  <td>{fmt(tx.amount)}</td>
                  <td>{tx.reference_id ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}
