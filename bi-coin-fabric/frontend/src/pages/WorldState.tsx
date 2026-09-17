import { useState } from 'react'
import LoadingSkeleton from '../components/LoadingSkeleton'

interface OrgConfig {
  label: string
  org: string
  port: number
}

const ORGS: OrgConfig[] = [
  { label: 'Bank Indonesia', org: 'bi.paynet', port: 5984 },
  { label: 'Himbara Bank', org: 'himbara.paynet', port: 6984 },
  { label: 'Validator Bank', org: 'commercial.paynet', port: 7984 },
  { label: 'Observer', org: 'ojk.paynet', port: 8984 },
  { label: 'PJP', org: 'pjp.paynet', port: 9984 },
]

export default function WorldState() {
  const [selectedPort, setSelectedPort] = useState(ORGS[0].port)
  const [frameLoading, setFrameLoading] = useState(true)
  const selected = ORGS.find(o => o.port === selectedPort)!
  const fauxton = `http://localhost:${selectedPort}/_utils`

  return (
    <div className="world-state">
      {/* Toolbar */}
      <div className="world-state-toolbar">
        <span className="world-state-title">CouchDB world state</span>
        <div className="world-state-tabs">
          {ORGS.map(org => (
            <button
              key={org.port}
              onClick={() => { setSelectedPort(org.port); setFrameLoading(true) }}
              className={`world-state-tab${selectedPort === org.port ? ' active' : ''}`}
            >
              {org.label}
            </button>
          ))}
        </div>
        <div className="world-state-actions">
          <code className="world-state-url">
            localhost:{selectedPort}/_utils
          </code>
          <a
            href={fauxton}
            target="_blank"
            rel="noreferrer"
            className="world-state-link"
          >
            Open tab ↗
          </a>
        </div>
      </div>

      {/* Credential hint */}
      <div className="world-state-hint">
        <span>Org: <strong>{selected.org}</strong></span>
        <span>Login: <code>admin</code> / <code>adminpw</code></span>
        <span>If the iframe is blocked, use "Open tab ↗".</span>
      </div>

      {/* Fauxton iframe */}
      <div className="world-state-frame-shell">
        {frameLoading && <LoadingSkeleton kind="form" label="Loading CouchDB world state" rows={4} />}
        <iframe
          key={selectedPort}
          src={fauxton}
          title={`CouchDB Fauxton - ${selected.org}`}
          className="world-state-frame"
          onLoad={() => setFrameLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  )
}
