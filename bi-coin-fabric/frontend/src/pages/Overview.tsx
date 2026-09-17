import { useEffect, useState } from 'react'
import { getErrorMessage, getMetrics, getWallets, type MetricsReport, type Wallet } from '../lib/api'
import { formatRupiah, sumRupiah } from '../lib/money'
import LoadingSkeleton from '../components/LoadingSkeleton'

interface Props {
  role: string
  selectedWallet: string
}

const METRIC_ROLES = new Set(['bank_indonesia', 'supervisor'])

export default function Overview({ role, selectedWallet }: Props) {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [metrics, setMetrics] = useState<MetricsReport | null>(null)
  const [walletsLoading, setWalletsLoading] = useState(true)
  const [metricsLoading, setMetricsLoading] = useState(METRIC_ROLES.has(role))
  const [error, setError] = useState('')

  useEffect(() => {
    setWalletsLoading(true)
    getWallets()
      .then(data => setWallets(data ?? []))
      .catch(e => setError(getErrorMessage(e)))
      .finally(() => setWalletsLoading(false))

    const needsMetrics = METRIC_ROLES.has(role)
    setMetricsLoading(needsMetrics)
    if (needsMetrics) {
      getMetrics()
        .then(setMetrics)
        .catch(e => setError(prev => prev || getErrorMessage(e)))
        .finally(() => setMetricsLoading(false))
    } else {
      setMetrics(null)
    }
  }, [role])

  const totalBalance = sumRupiah(wallets.map(wallet => wallet.balance))
  const frozenWallets = wallets.filter(wallet => wallet.frozen).length
  const currentWallet = wallets.find(wallet => wallet.wallet_id === selectedWallet)

  return (
    <div className="workspace-stack">
      {(walletsLoading || metricsLoading) ? <LoadingSkeleton kind="metrics" label="Loading overview" /> : (
        <section className="metric-grid">
          <article className="metric-card">
            <span className="metric-label">Visible wallets</span>
            <strong>{wallets.length}</strong>
            <small>Total balance {formatRupiah(totalBalance)}</small>
          </article>
          <article className="metric-card">
            <span className="metric-label">Frozen wallets</span>
            <strong>{frozenWallets}</strong>
            <small>Requires operator attention</small>
          </article>
          <article className="metric-card">
            <span className="metric-label">Settled transfers</span>
            <strong>{metrics?.total_transfers ?? '—'}</strong>
            <small>{metrics ? `Snapshot ${metrics.generated_at}` : 'Restricted to Bank Indonesia and Supervisor'}</small>
          </article>
          <article className="metric-card">
            <span className="metric-label">Circulating supply</span>
            <strong>{metrics ? formatRupiah(metrics.total_supply) : '—'}</strong>
            <small>{metrics ? `${metrics.active_wallets} active wallets` : 'Restricted to Bank Indonesia and Supervisor'}</small>
          </article>
        </section>
      )}

      {error && <div className="banner error" role="alert">{error}</div>}

      <section className="panel-grid">
        <article className="surface-card">
          <h3>Selected wallet</h3>
          {currentWallet ? (
            <div className="stack-small">
              <div className="context-row"><span>Wallet ID</span><strong className="mono">{currentWallet.wallet_id}</strong></div>
              <div className="context-row"><span>Balance</span><strong>{formatRupiah(currentWallet.balance)}</strong></div>
            </div>
          ) : <p className="muted">Select a wallet to use it in payment and audit workflows.</p>}
        </article>
        <article className="surface-card">
          <h3>Wallet details</h3>
          {currentWallet ? (
            <div className="stack-small">
              <div className="context-row"><span>Wallet ID</span><strong>{currentWallet.wallet_id}</strong></div>
              <div className="context-row"><span>Owner</span><strong>{currentWallet.owner_id || currentWallet.participant_id}</strong></div>
              <div className="context-row"><span>Custodian</span><strong>{currentWallet.participant_id}</strong></div>
              <div className="context-row"><span>Type</span><strong>{currentWallet.wallet_type}</strong></div>
              <div className="context-row"><span>Tier</span><strong>{currentWallet.tier}</strong></div>
            </div>
          ) : (
            <p className="muted">Wallet details appear after you select a wallet.</p>
          )}
        </article>
      </section>
    </div>
  )
}
