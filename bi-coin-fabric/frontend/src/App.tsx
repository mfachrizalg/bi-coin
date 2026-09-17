import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import WalletList from './pages/WalletList'
import CreateWallet from './pages/CreateWallet'
import Transfer from './pages/Transfer'
import Pay from './pages/Pay'
import Participants from './pages/Participants'
import DemoPanel, { type DemoPrefill } from './pages/DemoPanel'
import Overview from './pages/Overview'
import Contacts from './pages/Contacts'
import Activity from './pages/Activity'
import Supervision from './pages/Supervision'
import PrototypeLab from './pages/PrototypeLab'
import { getErrorMessage, getMe, hasAccessToken, login, onUnauthorized, setAccessToken } from './lib/api'
import LoadingSkeleton from './components/LoadingSkeleton'

export type Tab = 'overview' | 'participants' | 'wallets' | 'create' | 'transfer' | 'contacts' | 'activity' | 'supervision' | 'prototype'
export type Role = 'public' | 'authenticated' | 'kyc_verified' | 'bank_pjp' | 'validator_bank' | 'pjp' | 'bank_indonesia' | 'merchant' | 'supervisor'
type Shell = 'institutional' | 'retail'

interface RoleConfig {
  label: string
  shell: Shell | 'public'
  tabs: Tab[]
}

export const ROLES: Record<Role, RoleConfig> = {
  public: { label: 'Public', shell: 'public', tabs: [] },
  authenticated: { label: 'Retail Customer', shell: 'retail', tabs: ['overview', 'wallets', 'contacts'] },
  kyc_verified: { label: 'Retail Customer', shell: 'retail', tabs: ['overview', 'wallets', 'transfer', 'contacts', 'activity'] },
  bank_pjp: { label: 'Participant', shell: 'institutional', tabs: ['overview', 'participants', 'wallets', 'create', 'transfer'] },
  validator_bank: { label: 'Validator Bank', shell: 'institutional', tabs: ['overview', 'participants', 'wallets', 'create', 'transfer'] },
  pjp: { label: 'PJP', shell: 'institutional', tabs: ['overview', 'participants', 'wallets', 'create', 'transfer'] },
  bank_indonesia: { label: 'Bank Indonesia', shell: 'institutional', tabs: ['overview', 'participants', 'wallets', 'supervision', 'prototype'] },
  merchant: { label: 'Merchant', shell: 'retail', tabs: ['overview', 'wallets', 'transfer', 'contacts', 'activity'] },
  supervisor: { label: 'Supervisor', shell: 'institutional', tabs: ['overview', 'participants', 'wallets', 'supervision'] },
}

export const TAB_META: Record<Tab, { label: string }> = {
  overview: { label: 'Overview' },
  participants: { label: 'Participants' },
  wallets: { label: 'Wallets' },
  create: { label: 'KYC and wallet' },
  transfer: { label: 'Pay' },
  contacts: { label: 'Contacts' },
  activity: { label: 'Activity' },
  supervision: { label: 'Supervision' },
  prototype: { label: 'Prototype lab' },
}

interface DemoHandoff {
  stepId: number
  role: Role
  tab: Tab
}

const DEMO_STATE_KEY = 'garuda-demo-progress'
const UI_STATE_KEY = 'garuda-ui-context'

function readSession<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const value = window.sessionStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

function writeSession(key: string, value: unknown) {
  try { window.sessionStorage.setItem(key, JSON.stringify(value)) } catch { /* private browsing */ }
}

function clearSession(key: string) {
  try { window.sessionStorage.removeItem(key) } catch { /* private browsing */ }
}

function routeFor(shell: Shell, tab: Tab) {
  if (shell === 'retail') {
    return ({ overview: 'home', wallets: 'wallets', transfer: 'pay', contacts: 'contacts', activity: 'activity' } as Partial<Record<Tab, string>>)[tab] ?? 'home'
  }
  return ({ overview: 'overview', participants: 'participants', wallets: 'wallets', create: 'kyc', transfer: 'transfer', supervision: 'supervision', prototype: 'prototype-lab' } as Partial<Record<Tab, string>>)[tab] ?? 'overview'
}

function navigate(shell: Shell, tab: Tab) {
  if (typeof window !== 'undefined') window.location.hash = `#/${shell}/${routeFor(shell, tab)}`
}

function tabFromHash(hash: string): Tab | undefined {
  const path = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (path[0] === 'retail') {
    return ({ home: 'overview', wallets: 'wallets', pay: 'transfer', contacts: 'contacts', activity: 'activity' } as Record<string, Tab>)[path[1] ?? '']
  }
  if (path[0] === 'institutional') {
    return ({ overview: 'overview', participants: 'participants', wallets: 'wallets', kyc: 'create', transfer: 'transfer', supervision: 'supervision', limits: 'supervision', audit: 'supervision', observability: 'supervision', 'prototype-lab': 'prototype', supply: 'prototype', worldstate: 'prototype' } as Record<string, Tab>)[path[1] ?? '']
  }
  return undefined
}

function roleFrom(value: string): Role | undefined {
  return value in ROLES && value !== 'public' ? value as Role : undefined
}

function demoTab(value: string): Tab {
  if (value === 'supply' || value === 'worldstate') return 'prototype'
  if (value === 'create') return 'create'
  if (value === 'transfer') return 'transfer'
  if (value === 'participants') return 'participants'
  return 'overview'
}

export default function App() {
  const [role, setRole] = useState<Role>('public')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sessionUser, setSessionUser] = useState('')
  const [authError, setAuthError] = useState('')
  const [sessionLoading, setSessionLoading] = useState(() => hasAccessToken())
  const [tab, setTab] = useState<Tab>(() => tabFromHash(typeof window === 'undefined' ? '' : window.location.hash) ?? 'overview')
  const [selectedWallet, setSelectedWallet] = useState(() => readSession(UI_STATE_KEY, { wallet: '' }).wallet)
  const [demoMode, setDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(() => readSession<DemoHandoff | null>(DEMO_STATE_KEY, null)?.stepId ?? 1)
  const [demoPrefill, setDemoPrefill] = useState<DemoPrefill | null>(null)
  const [demoHandoff, setDemoHandoff] = useState<DemoHandoff | null>(() => readSession(DEMO_STATE_KEY, null))

  function handleLogout() {
    setAccessToken('')
    setRole('public')
    setSessionUser('')
    setSelectedWallet('')
    setTab('overview')
    setDemoPrefill(null)
    setSessionLoading(false)
    if (typeof window !== 'undefined') window.location.hash = '#/login'
  }

  useEffect(() => onUnauthorized(handleLogout), [])

  useEffect(() => {
    const onHashChange = () => {
      const next = tabFromHash(window.location.hash)
      if (next) setTab(next)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => { writeSession(UI_STATE_KEY, { wallet: selectedWallet }) }, [selectedWallet])

  useEffect(() => {
    if (demoMode && role !== 'public') writeSession(DEMO_STATE_KEY, { stepId: demoStep, role, tab })
  }, [demoMode, demoStep, role, tab])

  useEffect(() => {
    if (!hasAccessToken()) { setSessionLoading(false); return }
    getMe()
      .then(me => {
        const nextRole = roleFrom(me.role)
        if (!nextRole) throw new Error('Account role is not recognized.')
        setSessionUser(me.username)
        setRole(nextRole)
        const nextTab = tabFromHash(window.location.hash) ?? ROLES[nextRole].tabs[0] ?? 'overview'
        setTab(ROLES[nextRole].tabs.includes(nextTab) ? nextTab : ROLES[nextRole].tabs[0] ?? 'overview')
      })
      .catch(() => handleLogout())
      .finally(() => setSessionLoading(false))
  }, [])

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    setAuthError('')
    try {
      const res = await login({ username, password })
      setAccessToken(res.access_token)
      const me = await getMe()
      const nextRole = roleFrom(me.role)
      if (!nextRole) throw new Error('Account role is not recognized.')
      if (demoHandoff && demoHandoff.role !== nextRole) {
        setAccessToken('')
        setAuthError(`This demo step requires sign-in as ${ROLES[demoHandoff.role].label}.`)
        return
      }
      setSessionUser(me.username)
      setRole(nextRole)
      setPassword('')
      const nextTab = demoHandoff ? demoTab(demoHandoff.tab) : tabFromHash(window.location.hash) ?? ROLES[nextRole].tabs[0] ?? 'overview'
      setTab(ROLES[nextRole].tabs.includes(nextTab) ? nextTab : ROLES[nextRole].tabs[0] ?? 'overview')
      if (demoHandoff) {
        setDemoStep(demoHandoff.stepId)
        setDemoMode(true)
        clearSession(DEMO_STATE_KEY)
        setDemoHandoff(null)
      }
      const nextShell = ROLES[nextRole].shell === 'public' ? 'retail' : ROLES[nextRole].shell
      navigate(nextShell, ROLES[nextRole].tabs.includes(nextTab) ? nextTab : ROLES[nextRole].tabs[0] ?? 'overview')
    } catch (err) {
      setAuthError(getErrorMessage(err))
    }
  }

  function handleDemoStep(stepId: number, requestedRole: string, requestedTab: string) {
    const nextRole = roleFrom(requestedRole)
    if (!nextRole) {
      setAuthError('Demo step role is not recognized.')
      return
    }
    const nextTab = demoTab(requestedTab)
    setDemoStep(stepId)
    setDemoPrefill(null)
    setDemoMode(true)
    if (nextRole !== role) {
      const handoff = { stepId, role: nextRole, tab: nextTab }
      writeSession(DEMO_STATE_KEY, handoff)
      setDemoHandoff(handoff)
      handleLogout()
      setAuthError(`Sign in as ${ROLES[nextRole].label} to continue the demo.`)
      return
    }
    setTab(nextTab)
    navigate(ROLES[role].shell === 'public' ? 'retail' : ROLES[role].shell, nextTab)
  }

  const cfg = ROLES[role]
  const allowedTabs = cfg.tabs

  if (sessionLoading) {
    return <div className="auth-shell"><LoadingSkeleton kind="form" label="Loading session" rows={3} /></div>
  }

  if (role === 'public') {
    return (
      <div className="auth-shell">
        <main className="auth-card" aria-labelledby="sign-in-title">
          <h1 id="sign-in-title">Sign in</h1>
          <form className="auth-form" onSubmit={handleLogin}>
            <label className="app-label" htmlFor="login-username"><span>Username</span><input id="login-username" className="app-input" value={username} onChange={event => setUsername(event.target.value)} autoComplete="username" required /></label>
            <label className="app-label" htmlFor="login-password"><span>Password</span><input id="login-password" className="app-input" value={password} onChange={event => setPassword(event.target.value)} type="password" autoComplete="current-password" required /></label>
            {authError && <div className="banner error" role="alert">{authError}</div>}
            <button type="submit" className="primary-button">Sign in</button>
          </form>
        </main>
      </div>
    )
  }

  const shell: Shell = cfg.shell === 'public' ? 'retail' : cfg.shell

  return (
    <div className={`app-shell ${shell}-shell`}>
      <header className="app-header">
        <div className="topbar">
          <div className="brand-block">
            <span className="brand-mark" aria-hidden="true">G</span>
            <div><strong>Garuda Digital Rupiah</strong><span>{cfg.label}</span></div>
          </div>
          <div className="header-context" aria-label="Session context">
            <div><span>Signed in</span><strong>{sessionUser}</strong></div>
            <div><span>Role</span><strong>{cfg.label}</strong></div>
            <div><span>Wallet</span><strong>{selectedWallet || 'Not selected'}</strong></div>
          </div>
          <div className="topbar-actions">
            <button className="secondary-button" onClick={() => setDemoMode(current => !current)} aria-expanded={demoMode}>{demoMode ? 'Hide demo' : 'Show demo'}</button>
            <button className="secondary-button" onClick={handleLogout}>Sign out</button>
          </div>
        </div>
        <nav className="nav-tabs" aria-label={`${shell === 'retail' ? 'Retail payments' : 'Institutional operations'} navigation`}>
          {allowedTabs.map(nextTab => (
            <button key={nextTab} className={`nav-tab${tab === nextTab ? ' active' : ''}`} aria-current={tab === nextTab ? 'page' : undefined} onClick={() => { setTab(nextTab); navigate(shell, nextTab) }}>
              {TAB_META[nextTab].label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main" id="main-content">

        <section className="workspace-shell" aria-live="polite">
          <div className={`workspace-layout${demoMode ? ' with-demo' : ''}`}>
            <div className="workspace-main">
              {tab === 'overview' && <Overview role={role} selectedWallet={selectedWallet} />}
              {tab === 'participants' && <Participants role={role} prefill={demoPrefill?.target === 'submit' || demoPrefill?.target === 'issue' || demoPrefill?.target === 'distribute' ? demoPrefill : undefined} onPrefillConsumed={() => setDemoPrefill(null)} />}
              {tab === 'wallets' && <WalletList onSelect={setSelectedWallet} role={role} showParticipantBadges={cfg.shell === 'institutional'} />}
              {tab === 'create' && <CreateWallet prefill={demoPrefill?.target === 'wallet' || demoPrefill?.target === 'kyc-customer' || demoPrefill?.target === 'kyc-approve' ? demoPrefill : undefined} onPrefillConsumed={() => setDemoPrefill(null)} />}
              {tab === 'transfer' && (shell === 'retail' ? <Pay role={role} selectedWallet={selectedWallet} prefill={demoPrefill?.target === 'transfer' ? demoPrefill : undefined} onPrefillConsumed={() => setDemoPrefill(null)} /> : <Transfer role={role} selectedWallet={selectedWallet} prefill={demoPrefill?.target === 'transfer' ? demoPrefill : undefined} onPrefillConsumed={() => setDemoPrefill(null)} />)}
              {tab === 'contacts' && <Contacts />}
              {tab === 'activity' && <Activity />}
              {tab === 'supervision' && <Supervision walletID={selectedWallet} />}
              {tab === 'prototype' && <PrototypeLab />}
            </div>
            {demoMode && <aside className="workspace-demo"><DemoPanel currentStep={demoStep} onStep={handleDemoStep} onPrefill={data => setDemoPrefill(data)} /></aside>}
          </div>
        </section>
      </main>
    </div>
  )
}
