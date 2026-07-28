import { useEffect, useState } from 'react'
import { getMetrics, getWallets, type MetricsReport, type Wallet } from '../lib/api'

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

interface Props {
  role: string
  selectedWallet: string
}

const METRIC_ROLES = new Set(['bank_indonesia', 'supervisor'])

export default function Overview({ role, selectedWallet }: Props) {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [metrics, setMetrics] = useState<MetricsReport | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getWallets().then(data => setWallets(data ?? [])).catch(e => setError(e.message))
    if (METRIC_ROLES.has(role)) {
      getMetrics().then(setMetrics).catch(e => setError(prev => prev || e.message))
    }
  }, [role])

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0)
  const frozenWallets = wallets.filter(wallet => wallet.frozen).length
  const currentWallet = wallets.find(wallet => wallet.wallet_id === selectedWallet)

  return (
    <div className="workspace-stack">
      <section className="hero-panel">
        <div>
          <div className="eyebrow">Desktop Cockpit</div>
          <h1>Operasi retail CBDC, QRIS, dan observabilitas dalam satu workspace.</h1>
          <p>
            Gunakan panel kiri untuk berpindah alur kerja. Pilih dompet dari workspace dompet untuk
            mengisi konteks transfer, audit, dan QRIS customer-pay.
          </p>
        </div>
        <div className="hero-meta">
          <div className="hero-chip">{role.replace(/_/g, ' ')}</div>
          {currentWallet && (
            <div className="hero-context">
              <span>Dompet aktif</span>
              <strong>{currentWallet.wallet_id}</strong>
              <span>{fmt(currentWallet.balance)}</span>
            </div>
          )}
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <span className="metric-label">Dompet terlihat</span>
          <strong>{wallets.length}</strong>
          <small>Total saldo {fmt(totalBalance)}</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Dompet beku</span>
          <strong>{frozenWallets}</strong>
          <small>Perlu perhatian operator</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Transfer tersettle</span>
          <strong>{metrics?.total_transfers ?? '—'}</strong>
          <small>{metrics ? `Snapshot ${metrics.generated_at}` : 'Butuh peran pengawasan'}</small>
        </article>
        <article className="metric-card">
          <span className="metric-label">Supply beredar</span>
          <strong>{metrics ? fmt(metrics.total_supply) : '—'}</strong>
          <small>{metrics ? `${metrics.active_wallets} dompet aktif` : 'Tersedia untuk BI/Supervisor'}</small>
        </article>
      </section>

      {error && <div className="banner error">{error}</div>}

      <section className="panel-grid">
        <article className="surface-card">
          <h3>Alur kerja utama</h3>
          <ul className="plain-list">
            <li>`Participants & Liquidity`: onboarding, approval, freeze/unfreeze, distribusi, issuance.</li>
            <li>`Retail KYC & Wallets`: anchor KYC off-chain, approval, lalu create wallet.</li>
            <li>`Payments & QRIS`: transfer biasa atau merchant collect / customer pay QRIS.</li>
            <li>`Observability`: topologi, limits, dan transaksi terbaru berbasis backend.</li>
          </ul>
        </article>
        <article className="surface-card">
          <h3>Konteks aktif</h3>
          {currentWallet ? (
            <div className="stack-small">
              <div className="context-row"><span>Wallet ID</span><strong>{currentWallet.wallet_id}</strong></div>
              <div className="context-row"><span>Owner</span><strong>{currentWallet.participant_id}</strong></div>
              <div className="context-row"><span>Tipe</span><strong>{currentWallet.wallet_type}</strong></div>
              <div className="context-row"><span>Tier</span><strong>{currentWallet.tier}</strong></div>
            </div>
          ) : (
            <p className="muted">Belum ada dompet dipilih. Klik baris pada workspace Dompet untuk mengikat konteks ke transfer, audit, dan QRIS.</p>
          )}
        </article>
      </section>
    </div>
  )
}
