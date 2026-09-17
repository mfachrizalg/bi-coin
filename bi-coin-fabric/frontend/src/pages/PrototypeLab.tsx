import Supply from './Supply'
import WorldState from './WorldState'

export default function PrototypeLab() {
  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">Prototype Lab</div>
          <h2>Technical inspection</h2>
          <p className="muted">Use these views for network demonstration only.</p>
        </div>
      </section>
      <div className="panel-grid">
        <article className="surface-card"><Supply /></article>
        <article className="surface-card"><WorldState /></article>
      </div>
    </div>
  )
}
