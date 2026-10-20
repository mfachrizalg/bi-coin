import type { Tab } from '../App'

interface Requirement {
  id: string
  title: string
  evidence: string
  tabs: Tab[]
  covered: boolean
}

// Evidence per chapter-4 coverage. Requirements render only when covered; the rest stay hidden until evidence is complete.
// Empty tabs = evidence-only (inspection or benchmark, no live action).
const REQUIREMENTS: Requirement[] = [
  { id: 'FR-01', title: 'Subject lifecycle', evidence: 'Partial: termination not tested', tabs: ['study_identity', 'study_approval'], covered: false },
  { id: 'FR-02', title: 'Issuance and interbank transfer', evidence: 'Limited: pending re-run on the direct-issuance model', tabs: ['study_monetary', 'study_funding'], covered: true },
  { id: 'FR-03', title: 'Transfer authorization', evidence: 'Integration test, run-20261014-01', tabs: ['study_transfer'], covered: true },
  { id: 'FR-04', title: 'Reconciliation and monitoring', evidence: 'Partial: reports not tested on study network', tabs: ['study_audit'], covered: false },
  { id: 'FR-05', title: 'API role separation', evidence: 'Role-route matrix, run-20261014-01', tabs: ['study_audit'], covered: true },
  { id: 'NFR-01', title: 'Permissioned Fabric network', evidence: 'Architecture and network inspection', tabs: [], covered: true },
  { id: 'NFR-02', title: 'Audit traceability', evidence: 'Partial: unit tests not in run artifact', tabs: [], covered: false },
  { id: 'NFR-03', title: 'Layer separation', evidence: 'Architecture and config inspection', tabs: [], covered: true },
  { id: 'NFR-04', title: 'Caliper measurement', evidence: 'Benchmark: throughput, latency, success rate', tabs: [], covered: true },
  { id: 'NFR-05', title: 'Repeatability', evidence: 'Partial: manifest only', tabs: [], covered: false },
]

export default function RequirementRail({ allowedTabs, tab, onSelect }: { allowedTabs: Tab[]; tab: Tab; onSelect: (next: Tab) => void }) {
  const shown = REQUIREMENTS.filter(requirement => requirement.covered)

  return (
    <aside className="workspace-demo" aria-label="Thesis requirement map">
      <div className="demo-header">
        <div className="demo-kicker">Thesis traceability</div>
        <div className="demo-title">Requirement map</div>
      </div>
      <div className="demo-steps">
        {shown.map(requirement => {
          const target = requirement.tabs.find(next => allowedTabs.includes(next))
          const active = target !== undefined && target === tab
          const blocked = requirement.tabs.length > 0 && !target
          const content = (
            <>
              <span className="demo-step-role">{requirement.id}</span>
              <div>
                <div className="demo-step-label">{requirement.title}</div>
                <div className="demo-thesis">{requirement.evidence}</div>
                {blocked && <div className="demo-login-hint">Not in this role</div>}
              </div>
            </>
          )

          if (requirement.tabs.length === 0) {
            return <div key={requirement.id} className="demo-step evidence-only">{content}</div>
          }
          return (
            <button key={requirement.id} type="button" className={`demo-step${active ? ' active' : ''}`} aria-current={active ? 'step' : undefined} disabled={!target} onClick={() => { if (target) onSelect(target) }}>
              {content}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
