import { useState } from 'react'

interface OrgConfig {
  label: string
  org: string
  port: number
  color: string
}

const ORGS: OrgConfig[] = [
  { label: 'Bank Indonesia',  org: 'bi.paynet',         port: 5984, color: '#1a3c6e' },
  { label: 'Himbara Bank',    org: 'himbara.paynet',    port: 6984, color: '#0a6e3c' },
  { label: 'Commercial Bank', org: 'commercial.paynet', port: 7984, color: '#6e3c0a' },
  { label: 'OJK Observer',    org: 'ojk.paynet',        port: 8984, color: '#4a0a6e' },
  { label: 'PJP',             org: 'pjp.paynet',        port: 9984, color: '#6e0a2a' },
]

export default function WorldState() {
  const [selectedPort, setSelectedPort] = useState(ORGS[0].port)
  const selected = ORGS.find(o => o.port === selectedPort)!
  const fauxton = `http://localhost:${selectedPort}/_utils`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px',
        background: '#1e293b', borderRadius: '8px 8px 0 0',
        flexWrap: 'wrap',
      }}>
        <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          COUCHDB WORLD STATE
        </span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ORGS.map(org => (
            <button
              key={org.port}
              onClick={() => setSelectedPort(org.port)}
              style={{
                padding: '4px 12px',
                borderRadius: 5,
                border: 'none',
                background: selectedPort === org.port ? org.color : 'rgba(255,255,255,0.08)',
                color: selectedPort === org.port ? '#fff' : '#94a3b8',
                fontSize: '0.8rem',
                fontWeight: selectedPort === org.port ? 700 : 400,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {org.label}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <code style={{
            fontSize: '0.72rem', color: '#64748b',
            background: 'rgba(255,255,255,0.06)',
            padding: '2px 8px', borderRadius: 4,
          }}>
            localhost:{selectedPort}/_utils
          </code>
          <a
            href={fauxton}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.75rem', color: '#60a5fa',
              textDecoration: 'none', padding: '3px 8px',
              border: '1px solid rgba(96,165,250,0.3)',
              borderRadius: 4,
            }}
          >
            Open tab ↗
          </a>
        </div>
      </div>

      {/* Credential hint */}
      <div style={{
        background: '#0f172a', padding: '5px 14px',
        fontSize: '0.72rem', color: '#475569',
        display: 'flex', gap: 16, alignItems: 'center',
      }}>
        <span>Org: <strong style={{ color: selected.color }}>{selected.org}</strong></span>
        <span>Login: <code style={{ color: '#94a3b8' }}>admin</code> / <code style={{ color: '#94a3b8' }}>adminpw</code></span>
        <span style={{ color: '#334155' }}>If iframe blocked → use "Open tab ↗"</span>
      </div>

      {/* Fauxton iframe */}
      <iframe
        key={selectedPort}
        src={fauxton}
        title={`CouchDB Fauxton — ${selected.org}`}
        style={{
          width: '100%',
          height: 'calc(100vh - 220px)',
          minHeight: 500,
          border: 'none',
          borderRadius: '0 0 8px 8px',
          background: '#fff',
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  )
}
