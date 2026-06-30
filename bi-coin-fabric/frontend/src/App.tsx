import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import WalletList from './pages/WalletList'
import CreateWallet from './pages/CreateWallet'
import Transfer from './pages/Transfer'
import Limits from './pages/Limits'
import AuditLog from './pages/AuditLog'
import Supply from './pages/Supply'
import Participants from './pages/Participants'
import WorldState from './pages/WorldState'
import DemoPanel, { type DemoPrefill } from './pages/DemoPanel'
import { getMe, login, setAccessToken } from './lib/api'

type Tab = 'participants' | 'wallets' | 'create' | 'transfer' | 'limits' | 'audit' | 'supply' | 'worldstate'
type Role = 'public' | 'authenticated' | 'kyc_verified' | 'bank_pjp' | 'bank_indonesia' | 'merchant' | 'supervisor'

interface RoleConfig {
  label: string
  tagLine: string
  tabs: Tab[]
}

const ROLES: Record<Role, RoleConfig> = {
  public: {
    label: 'Public',
    tagLine: 'Masuk untuk mengakses dasbor sesuai peran',
    tabs: [],
  },
  authenticated: {
    label: 'Authenticated',
    tagLine: 'Akses dompet',
    tabs: ['wallets'],
  },
  kyc_verified: {
    label: 'KYC Verified',
    tagLine: 'Transfer Digital Rupiah sebagai pelanggan terverifikasi',
    tabs: ['wallets', 'transfer'],
  },
  bank_pjp: {
    label: 'Bank / PJP',
    tagLine: 'Onboarding nasabah, keputusan KYC, dan operasi peserta',
    tabs: ['participants', 'wallets', 'create'],
  },
  bank_indonesia: {
    label: 'Bank Indonesia',
    tagLine: 'Akses penuh — penerbitan, limit, pengawasan',
    tabs: ['participants', 'wallets', 'limits', 'supply', 'audit', 'worldstate'],
  },
  merchant: {
    label: 'Merchant',
    tagLine: 'Transfer dan saldo merchant terverifikasi',
    tabs: ['wallets', 'transfer'],
  },
  supervisor: {
    label: 'Supervisor',
    tagLine: 'Pengawasan hanya-baca, laporan',
    tabs: ['participants', 'limits', 'supply', 'audit', 'worldstate'],
  },
}

const TAB_LABELS: Record<Tab, string> = {
  participants: 'Peserta',
  wallets: 'Dompet',
  create: 'Buat Dompet',
  transfer: 'Transfer',
  limits: 'Batas Transaksi',
  audit: 'Log Audit',
  supply: 'Jumlah Beredar',
  worldstate: 'World State DB',
}

export default function App() {
  const [role, setRole] = useState<Role>('public')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sessionUser, setSessionUser] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<Tab>('participants')
  const [selectedWallet, setSelectedWallet] = useState('')
  const [demoMode, setDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(1)
  const [demoPrefill, setDemoPrefill] = useState<DemoPrefill | null>(null)

  useEffect(() => {
    getMe()
      .then(me => {
        const r = me.role as Role
        setSessionUser(me.username)
        setRole(r)
        setTab(ROLES[r].tabs[0] ?? 'participants')
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
      const r = me.role as Role
      setSessionUser(me.username)
      setRole(r)
      setTab(ROLES[r].tabs[0] ?? 'participants')
      setPassword('')
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Login gagal')
    }
  }

  function handleLogout() {
    setAccessToken('')
    setRole('public')
    setSessionUser('')
    setTab('participants')
  }

  function handleDemoStep(stepId: number, _newRole: string, newTab: string) {
    setDemoStep(stepId)
    setDemoPrefill(null)
    const t = newTab as Tab
    if (ROLES[role].tabs.includes(t)) setTab(t)
    else setTab(ROLES[role].tabs[0] ?? 'participants')
  }

  const cfg = ROLES[role]
  const allowedTabs = cfg.tabs

  // Full-screen login card for unauthenticated users
  if (role === 'public') {
    return (
      <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex', flexDirection: 'column' }}>
        {/* Minimal header */}
        <header style={{
          background: '#1a3c6e', color: '#fff',
          padding: '1rem 1.5rem',
          display: 'flex', alignItems: 'center',
        }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Garuda Digital Rupiah</span>
          <span style={{ marginLeft: 12, opacity: 0.6, fontSize: '0.9rem' }}>Retail CBDC Dashboard</span>
        </header>

        {/* Centered login card */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{
            background: '#fff', borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            padding: '2.5rem 2rem',
            width: '100%', maxWidth: 420,
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏦</div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a3c6e', margin: 0 }}>
                Garuda Digital Rupiah
              </h1>
              <p style={{ fontSize: '1rem', color: '#6b7280', marginTop: 8, marginBottom: 0 }}>
                Masuk untuk mengakses dasbor
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Nama Pengguna
                </label>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Contoh: bi"
                  autoComplete="username"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8,
                    border: '1.5px solid #d1d5db', fontSize: '1rem',
                    boxSizing: 'border-box', outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Kata Sandi
                </label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Kata sandi"
                  type="password"
                  autoComplete="current-password"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8,
                    border: '1.5px solid #d1d5db', fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              {authError && (
                <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#dc2626', fontSize: '0.95rem' }}>
                  {authError}
                </div>
              )}
              <button
                type="submit"
                style={{
                  padding: '14px 0', background: '#1a3c6e', color: '#fff',
                  border: 'none', borderRadius: 8, fontSize: '1.1rem', fontWeight: 700,
                  cursor: 'pointer', marginTop: 4,
                }}
              >
                Masuk
              </button>
            </form>

            {/* Demo credential hints */}
            <div style={{ marginTop: '1.5rem', padding: '14px', background: '#f8faff', border: '1px solid #dbeafe', borderRadius: 8 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1d4ed8', marginBottom: 8 }}>
                Akun Demo
              </div>
              <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['bi', 'bi-password', 'Bank Indonesia'],
                    ['pjp', 'pjp-password', 'Bank / PJP'],
                    ['customer', 'customer-password', 'Pelanggan KYC'],
                    ['merchant', 'merchant-password', 'Merchant'],
                    ['supervisor', 'supervisor-password', 'Supervisor'],
                  ].map(([u, p, label]) => (
                    <tr key={u}>
                      <td style={{ padding: '3px 0', color: '#374151', width: '30%' }}>{label}</td>
                      <td style={{ padding: '3px 6px', fontFamily: 'monospace', color: '#1a3c6e', fontWeight: 700 }}>{u}</td>
                      <td style={{ padding: '3px 0', fontFamily: 'monospace', color: '#6b7280' }}>{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', fontSize: '16px' }}>
      {/* Header */}
      <header style={{
        background: '#1a3c6e', color: '#fff',
        padding: '0.75rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Garuda Digital Rupiah</span>
          <span style={{ marginLeft: 12, opacity: 0.6, fontSize: '0.9rem' }}>Retail CBDC Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setDemoMode(d => !d)}
            style={{
              padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700,
              background: demoMode ? '#3b82f6' : 'rgba(255,255,255,0.15)',
              color: '#fff', border: demoMode ? '1px solid #60a5fa' : '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {demoMode ? '📋 Demo ON' : '📋 Demo'}
          </button>
          <span style={{ fontSize: '0.9rem', opacity: 0.85 }}>{sessionUser}</span>
          <span style={{
            fontSize: '0.85rem',
            background: 'rgba(255,255,255,0.12)', padding: '3px 10px',
            borderRadius: 4, opacity: 0.9,
          }}>
            {cfg.label}
          </span>
          <button
            onClick={handleLogout}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Role tagline */}
      <div style={{
        background: '#e8f0fb', borderBottom: '1px solid #c5d5f0',
        padding: '8px 1.5rem', fontSize: '0.95rem', color: '#2a4a8e',
      }}>
        {cfg.tagLine}
      </div>

      <div style={{ display: 'flex', alignItems: 'stretch', minHeight: 'calc(100vh - 96px)' }}>
        <div style={{ flex: 1, maxWidth: demoMode ? 'calc(100% - 320px)' : 1200, margin: '0 auto', padding: '1.5rem', minWidth: 0 }}>
          {allowedTabs.length === 0 ? (
            <div style={{ marginTop: 60, textAlign: 'center', color: '#666' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔒</div>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Tidak ada halaman dasbor untuk peran <em>{cfg.label}</em>.</p>
              <p style={{ fontSize: '0.95rem', marginTop: 6, color: '#999' }}>
                Gunakan <a href="/docs" style={{ color: '#1a3c6e' }}>dokumentasi API</a> untuk berinteraksi langsung.
              </p>
            </div>
          ) : (
            <>
              {/* Tab bar */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                {allowedTabs.map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: '10px 20px',
                      fontWeight: tab === t ? 700 : 500,
                      border: tab === t ? '2px solid #1a3c6e' : '1.5px solid #d1d5db',
                      borderRadius: 8,
                      background: tab === t ? '#dbeafe' : '#fff',
                      color: tab === t ? '#1a3c6e' : '#374151',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                  >
                    {TAB_LABELS[t]}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              {tab === 'participants' && (
                <Participants
                  role={role}
                  prefill={demoPrefill?.target === 'submit' || demoPrefill?.target === 'issue' || demoPrefill?.target === 'distribute' ? demoPrefill : undefined}
                  onPrefillConsumed={() => setDemoPrefill(null)}
                />
              )}
              {tab === 'wallets' && <WalletList onSelect={setSelectedWallet} />}
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
              {tab === 'limits' && <Limits />}
              {tab === 'audit' && <AuditLog walletID={selectedWallet} />}
              {tab === 'supply' && <Supply />}
              {tab === 'worldstate' && <WorldState />}
            </>
          )}
        </div>

        {demoMode && (
          <DemoPanel
            currentStep={demoStep}
            onStep={handleDemoStep}
            onPrefill={data => setDemoPrefill(data)}
          />
        )}
      </div>
    </div>
  )
}
