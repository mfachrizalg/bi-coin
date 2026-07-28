import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import WalletList from './pages/WalletList'
import CreateWallet from './pages/CreateWallet'
import Transfer from './pages/Transfer'
import Limits from './pages/Limits'
import AuditLog from './pages/AuditLog'
import Participants from './pages/Participants'
import DemoPanel, { type DemoPrefill } from './pages/DemoPanel'
import Overview from './pages/Overview'
import Observability from './pages/Observability'
import QrisPayments from './pages/QrisPayments'
import { getMe, hasAccessToken, login, setAccessToken } from './lib/api'

type Tab = 'overview' | 'participants' | 'wallets' | 'create' | 'transfer' | 'qris' | 'limits' | 'audit' | 'observability'
type Role = 'public' | 'authenticated' | 'kyc_verified' | 'bank_pjp' | 'bank_indonesia' | 'merchant' | 'supervisor'

interface RoleConfig {
  label: string
  tagLine: string
  tabs: Tab[]
}

const ROLES: Record<Role, RoleConfig> = {
  public: {
    label: 'Public',
    tagLine: 'Masuk untuk mengakses cockpit sesuai peran',
    tabs: [],
  },
  authenticated: {
    label: 'Authenticated',
    tagLine: 'Akses konteks dompet pribadi',
    tabs: ['overview', 'wallets'],
  },
  kyc_verified: {
    label: 'KYC Verified',
    tagLine: 'Pembayaran retail, dompet, dan QRIS customer pay',
    tabs: ['overview', 'wallets', 'transfer', 'qris'],
  },
  bank_pjp: {
    label: 'Bank / PJP',
    tagLine: 'Onboarding peserta, retail KYC, distribusi likuiditas',
    tabs: ['overview', 'participants', 'wallets', 'create'],
  },
  bank_indonesia: {
    label: 'Bank Indonesia',
    tagLine: 'Pengawasan, policy, observability, dan kontrol sistem',
    tabs: ['overview', 'participants', 'wallets', 'limits', 'audit', 'observability'],
  },
  merchant: {
    label: 'Merchant',
    tagLine: 'Merchant collect, transfer, dan QRIS desktop',
    tabs: ['overview', 'wallets', 'transfer', 'qris'],
  },
  supervisor: {
    label: 'Supervisor',
    tagLine: 'Read-only oversight untuk transaksi, limits, dan topologi',
    tabs: ['overview', 'participants', 'limits', 'audit', 'observability'],
  },
}

const TAB_META: Record<Tab, { label: string; description: string }> = {
  overview: { label: 'Overview', description: 'Status sistem dan konteks aktif' },
  participants: { label: 'Participants & Liquidity', description: 'Onboarding, approval, distribusi, issuance' },
  wallets: { label: 'Wallets', description: 'Saldo, status, dan pemilihan konteks dompet' },
  create: { label: 'Retail KYC & Wallets', description: 'Anchor KYC off-chain lalu create wallet' },
  transfer: { label: 'Transfer', description: 'Transfer retail langsung antar wallet' },
  qris: { label: 'QRIS', description: 'Merchant collect dan customer pay' },
  limits: { label: 'Limits', description: 'Live limits dari backend' },
  audit: { label: 'Audit', description: 'Riwayat transaksi berdasarkan dompet aktif' },
  observability: { label: 'Observability', description: 'Topologi, metrics, limit, transaksi QRIS' },
}

const DEMO_ACCOUNTS = [
  { username: 'bi', password: 'bi-password', label: 'Bank Indonesia' },
  { username: 'pjp', password: 'pjp-password', label: 'Bank / PJP' },
  { username: 'customer', password: 'customer-password', label: 'Pelanggan KYC' },
  { username: 'merchant', password: 'merchant-password', label: 'Merchant' },
  { username: 'supervisor', password: 'supervisor-password', label: 'Supervisor' },
]

export default function App() {
  const [role, setRole] = useState<Role>('public')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sessionUser, setSessionUser] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<Tab>('overview')
  const [selectedWallet, setSelectedWallet] = useState('')
  const [demoMode, setDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(1)
  const [demoPrefill, setDemoPrefill] = useState<DemoPrefill | null>(null)

  useEffect(() => {
    if (!hasAccessToken()) return

    getMe()
      .then(me => {
        const nextRole = me.role as Role
        setSessionUser(me.username)
        setRole(nextRole)
        setTab(ROLES[nextRole].tabs[0] ?? 'overview')
      })
      .catch(() => {
        setAccessToken('')
        setRole('public')
      })
  }, [])

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    setAuthError('')
    try {
      const res = await login({ username, password })
      setAccessToken(res.access_token)
      const me = await getMe()
      const nextRole = me.role as Role
      setSessionUser(me.username)
      setRole(nextRole)
      setTab(ROLES[nextRole].tabs[0] ?? 'overview')
      setPassword('')
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Login gagal')
    }
  }

  function handleLogout() {
    setAccessToken('')
    setRole('public')
    setSessionUser('')
    setSelectedWallet('')
    setTab('overview')
  }

  function handleDemoStep(stepId: number, _newRole: string, newTab: string) {
    setDemoStep(stepId)
    setDemoPrefill(null)
    const nextTab = newTab as Tab
    if (ROLES[role].tabs.includes(nextTab)) setTab(nextTab)
    else setTab(ROLES[role].tabs[0] ?? 'overview')
  }

  const cfg = ROLES[role]
  const allowedTabs = cfg.tabs

  if (role === 'public') {
    return (
      <div className="auth-shell">
        <section className="auth-hero">
          <div>
            <div className="role-pill">Garuda Digital Rupiah</div>
            <h1>Retail CBDC desktop cockpit with QRIS, observability, and live ledger flows.</h1>
            <p>
              Dashboard ini menggabungkan role-based operational flow, retail KYC off-chain anchoring,
              transfer, QRIS prototype, dan observabilitas jaringan tanpa kembali ke iframe CouchDB.
            </p>
          </div>

          <div className="stack-small">
            <div className="role-pill">What changed</div>
            <ul className="plain-list">
              <li>Shell desktop baru dengan workspace per domain kerja.</li>
              <li>QRIS merchant collect + customer pay terhubung ke backend dan chaincode.</li>
              <li>Observability live dari `/network/topology`, `/reports/metrics`, `/transactions`, `/limits`.</li>
            </ul>
          </div>
        </section>

        <section className="auth-card-panel">
          <div className="auth-card">
            <div className="stack-small">
              <div>
                <div className="eyebrow">Sign In</div>
                <h2 style={{ margin: '6px 0 8px' }}>Masuk ke cockpit retail CBDC</h2>
                <p className="muted">Pilih akun demo atau gunakan kredensial yang sudah dibootstrap di backend.</p>
              </div>

              <form className="stack-small" onSubmit={handleLogin}>
                <label className="app-label">
                  <span>Nama Pengguna</span>
                  <input className="app-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Contoh: merchant" autoComplete="username" />
                </label>
                <label className="app-label">
                  <span>Kata Sandi</span>
                  <input className="app-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Kata sandi" type="password" autoComplete="current-password" />
                </label>
                {authError && <div className="banner error">{authError}</div>}
                <button type="submit" className="primary-button">Masuk</button>
              </form>

              <div className="demo-credentials">
                {DEMO_ACCOUNTS.map(account => (
                  <div key={account.username} className="credential-card">
                    <div>
                      <div>{account.label}</div>
                      <strong>{account.username}</strong>
                    </div>
                    <code>{account.password}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <aside className="nav-rail">
        <div className="nav-brand stack-small">
          <div className="role-pill">{cfg.label}</div>
          <div>
            <h2>Garuda Digital Rupiah</h2>
            <p>{cfg.tagLine}</p>
          </div>
        </div>

        <div className="nav-tabs">
          {allowedTabs.map(nextTab => (
            <button
              key={nextTab}
              className={`nav-tab${tab === nextTab ? ' active' : ''}`}
              onClick={() => setTab(nextTab)}
            >
              <strong>{TAB_META[nextTab].label}</strong>
              <span>{TAB_META[nextTab].description}</span>
            </button>
          ))}
        </div>

        <div className="surface-card">
          <h3 style={{ marginTop: 0 }}>Konteks aktif</h3>
          <div className="stack-small">
            <div className="context-row"><span>User</span><strong>{sessionUser}</strong></div>
            <div className="context-row"><span>Role</span><span className="pill">{cfg.label}</span></div>
            <div className="context-row"><span>Wallet</span><strong>{selectedWallet || 'belum dipilih'}</strong></div>
          </div>
        </div>
      </aside>

      <main className="app-main">
        <header className="topbar">
          <div>
            <div className="eyebrow">{TAB_META[tab]?.label ?? cfg.label}</div>
            <h1 style={{ margin: '4px 0 6px' }}>{TAB_META[tab]?.description ?? cfg.tagLine}</h1>
            <p className="muted" style={{ margin: 0 }}>
              Dompet aktif dipakai ulang di transfer, audit, dan QRIS customer-pay.
            </p>
          </div>
          <div className="topbar-actions">
            <button className="secondary-button" onClick={() => setDemoMode(current => !current)}>
              {demoMode ? 'Sembunyikan demo' : 'Tampilkan demo'}
            </button>
            <button className="secondary-button" onClick={handleLogout}>Keluar</button>
          </div>
        </header>

        <section className="workspace-shell">
          {allowedTabs.length === 0 ? (
            <div className="surface-card">
              <h3>Tidak ada workspace untuk peran ini.</h3>
              <p className="muted">
                Gunakan <a className="logged-out-link" href="/docs">dokumentasi API</a> untuk eksplorasi langsung.
              </p>
            </div>
          ) : (
            <div className={`workspace-layout${demoMode ? ' with-demo' : ''}`}>
              <div className="workspace-main">
                {tab === 'overview' && <Overview role={role} selectedWallet={selectedWallet} />}
                {tab === 'participants' && (
                  <Participants
                    role={role}
                    prefill={demoPrefill?.target === 'submit' || demoPrefill?.target === 'issue' || demoPrefill?.target === 'distribute' ? demoPrefill : undefined}
                    onPrefillConsumed={() => setDemoPrefill(null)}
                  />
                )}
                {tab === 'wallets' && (
                  <WalletList
                    onSelect={setSelectedWallet}
                    showParticipantBadges={role === 'bank_pjp' || role === 'bank_indonesia'}
                  />
                )}
                {tab === 'create' && (
                  <CreateWallet
                    prefill={demoPrefill?.target === 'wallet' || demoPrefill?.target === 'kyc-customer' || demoPrefill?.target === 'kyc-approve' ? demoPrefill : undefined}
                    onPrefillConsumed={() => setDemoPrefill(null)}
                  />
                )}
                {tab === 'transfer' && (
                  <Transfer
                    selectedWallet={selectedWallet}
                    prefill={demoPrefill?.target === 'transfer' ? demoPrefill : undefined}
                    onPrefillConsumed={() => setDemoPrefill(null)}
                  />
                )}
                {tab === 'qris' && <QrisPayments role={role} selectedWallet={selectedWallet} />}
                {tab === 'limits' && <Limits />}
                {tab === 'audit' && <AuditLog walletID={selectedWallet} />}
                {tab === 'observability' && <Observability />}
              </div>

              {demoMode && (
                <aside className="workspace-demo">
                  <DemoPanel
                    currentStep={demoStep}
                    onStep={handleDemoStep}
                    onPrefill={data => setDemoPrefill(data)}
                  />
                </aside>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
