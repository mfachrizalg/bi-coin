import AuditLog from './AuditLog'
import Limits from './Limits'
import Observability from './Observability'

interface Props {
  walletID: string
}

export default function Supervision({ walletID }: Props) {
  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">Supervision</div>
          <h2>System supervision</h2>
          <p className="muted">Read system evidence. Monetary operations remain restricted by the backend.</p>
        </div>
      </section>
      <div className="panel-grid">
        <article className="surface-card"><Limits /></article>
        <article className="surface-card"><Observability /></article>
      </div>
      <article className="surface-card"><AuditLog walletID={walletID} /></article>
    </div>
  )
}
