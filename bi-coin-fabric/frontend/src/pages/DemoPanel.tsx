import { useState } from 'react'

export interface DemoPrefill {
  target: 'submit' | 'issue' | 'distribute' | 'wallet' | 'kyc-customer' | 'kyc-approve' | 'transfer'
  [key: string]: string
}

interface DemoStep {
  id: number
  phase: string
  phaseColor: string
  role: string
  roleLabel: string
  roleColor: string
  tab: string
  title: string
  description: string
  thesis?: string
  prefill?: DemoPrefill
  manualAction?: string
}

const STEPS: DemoStep[] = [
  {
    id: 1,
    phase: 'Phase 1 — Bank Onboarding',
    phaseColor: '#1a3c6e',
    role: 'bank_indonesia',
    roleLabel: 'Bank Indonesia',
    roleColor: '#1a3c6e',
    tab: 'participants',
    title: 'Register Bank Himbara',
    description: 'BI registers Himbara (BUMN bank) as a validator node on the Digital Rupiah network.',
    thesis: 'Two-tier model: BI is Tier-1 issuer; banks are Tier-2 distributors.',
    prefill: {
      target: 'submit',
      participant_id: 'himbara',
      name: 'Bank Himbara',
      domain: 'himbara.paynet',
      account_id: 'ACC-HIMBARA-001',
      participant_type: 'validator',
    },
  },
  {
    id: 2,
    phase: 'Phase 1 — Bank Onboarding',
    phaseColor: '#1a3c6e',
    role: 'bank_indonesia',
    roleLabel: 'Bank Indonesia',
    roleColor: '#1a3c6e',
    tab: 'participants',
    title: 'Approve Himbara (KYC/AML)',
    description: 'BI reviews compliance and approves Himbara to participate in the network.',
    thesis: 'Permissioned network: only BI-approved participants can hold or transfer Digital Rupiah.',
    manualAction: 'Click the Approve button on the himbara row in the table.',
  },
  {
    id: 3,
    phase: 'Phase 2 — Wholesale Issuance',
    phaseColor: '#7c3aed',
    role: 'bank_indonesia',
    roleLabel: 'Bank Indonesia',
    roleColor: '#1a3c6e',
    tab: 'participants',
    title: 'Issue Rp 100,000,000 to Treasury',
    description: 'BI issues Digital Rupiah into its Treasury before distributing liquidity to Custodians.',
    thesis: 'Only BI can mint. Supply is recorded on-chain and verifiable by all peers.',
    prefill: {
      target: 'issue',
      amount: '100000000',
    },
  },
  {
    id: 4,
    phase: 'Phase 3 — PJP Onboarding',
    phaseColor: '#059669',
    role: 'bank_pjp',
    roleLabel: 'Bank / PJP',
    roleColor: '#16a34a',
    tab: 'participants',
    title: 'Register GoPay as PJP',
    description: 'Himbara onboards GoPay (Payment Service Provider) to serve retail customers.',
    thesis: 'PJPs extend reach to end users — retail distribution layer.',
    prefill: {
      target: 'submit',
      participant_id: 'gopay',
      name: 'GoPay PJP',
      domain: 'gopay.paynet',
      account_id: 'ACC-GOPAY-001',
      participant_type: 'pjp',
    },
  },
  {
    id: 5,
    phase: 'Phase 3 — PJP Onboarding',
    phaseColor: '#059669',
    role: 'bank_indonesia',
    roleLabel: 'Bank Indonesia',
    roleColor: '#1a3c6e',
    tab: 'participants',
    title: 'BI Approves GoPay PJP',
    description: 'BI approves GoPay, enabling retail wallet custody under GoPay.',
    thesis: 'Approval on-chain: immutable governance audit trail via Fabric ledger.',
    manualAction: 'Click the Approve button on the gopay row in the table.',
  },
  {
    id: 6,
    phase: 'Phase 4 — Retail Liquidity',
    phaseColor: '#d97706',
    role: 'bank_indonesia',
    roleLabel: 'Bank Indonesia',
    roleColor: '#1a3c6e',
    tab: 'participants',
    title: 'Treasury → GoPay: Distribute Rp 30,000,000',
    description: 'BI distributes issued Treasury liquidity directly to GoPay as a PJP Custodian.',
    thesis: 'Wholesale → retail bridge: second tier of the two-tier CBDC model.',
    prefill: {
      target: 'distribute',
      receiver: 'gopay',
      amount: '30000000',
    },
  },
  {
    id: 7,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Store Budi KYC Off-Chain',
    description: 'GoPay verifies Budi Santoso identity data, stores it in the off-chain KYC database, and anchors only its hash on Fabric.',
    thesis: 'Privacy boundary: raw KYC stays off-chain; Fabric stores KYC status and document hash anchors.',
    prefill: {
      target: 'kyc-customer',
      customer_id: 'budi',
      legal_name: 'Budi Santoso',
      document_type: 'ktp',
      document_number: '3173000101010001',
      wallet_account_id: 'ACC-BUDI-001',
      provider_case_id: 'case-budi',
    },
  },
  {
    id: 8,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Approve Budi KYC Anchor',
    description: 'Refresh the Fabric KYC anchor to approved after the off-chain provider result passes AML checks.',
    thesis: 'Chaincode enforces spending only when the subject has an approved KYC anchor.',
    prefill: {
      target: 'kyc-approve',
      customer_id: 'budi',
      provider_case_id: 'case-budi',
    },
  },
  {
    id: 9,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Create Budi Wallet',
    description: 'Create wallet wlt_budi after Budi has an approved KYC subject anchor. Chaincode derives BASIC.',
    thesis: 'Wallet ownership uses the retail KYC subject ID, not the PJP participant ID.',
    prefill: {
      target: 'wallet',
      owner_id: 'budi',
    },
  },
  {
    id: 10,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Store Sari KYC Off-Chain',
    description: 'GoPay verifies Sari Wulandari identity data off-chain and anchors only hash evidence on Fabric.',
    thesis: 'Retail CBDC should separate identity records from ledger balances and payments.',
    prefill: {
      target: 'kyc-customer',
      customer_id: 'sari',
      legal_name: 'Sari Wulandari',
      document_type: 'ktp',
      document_number: '3173000202020002',
      wallet_account_id: 'ACC-SARI-001',
      provider_case_id: 'case-sari',
    },
  },
  {
    id: 11,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Approve Sari KYC Anchor',
    description: 'Refresh the Fabric KYC anchor to approved for Sari.',
    thesis: 'Approved KYC is a spending precondition, while raw KYC details remain in PostgreSQL.',
    prefill: {
      target: 'kyc-approve',
      customer_id: 'sari',
      provider_case_id: 'case-sari',
    },
  },
  {
    id: 12,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Create Sari Wallet',
    description: 'Create wallet wlt_sari for Sari after KYC approval. Chaincode derives BASIC.',
    thesis: 'The wallet subject ID links payment enforcement to the approved KYC anchor.',
    prefill: {
      target: 'wallet',
      owner_id: 'sari',
    },
  },
  {
    id: 13,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Store Merchant KYC Off-Chain',
    description: 'GoPay verifies Toko Budi merchant identity off-chain before creating its receiving wallet.',
    thesis: 'Merchant onboarding follows the same off-chain KYC privacy boundary as retail users.',
    prefill: {
      target: 'kyc-customer',
      customer_id: 'toko-budi',
      legal_name: 'Toko Budi',
      document_type: 'nib',
      document_number: '912000000001',
      wallet_account_id: 'ACC-TOKO-BUDI-001',
      provider_case_id: 'case-toko-budi',
      subject_type: 'merchant',
      risk_level: 'low',
      due_diligence_level: 'standard',
    },
  },
  {
    id: 14,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Approve Merchant KYC Anchor',
    description: 'Refresh the Fabric KYC anchor to approved for Toko Budi.',
    thesis: 'The ledger needs only status and hash anchors to enforce eligibility.',
    prefill: {
      target: 'kyc-approve',
      customer_id: 'toko-budi',
      provider_case_id: 'case-toko-budi',
      subject_type: 'merchant',
      risk_level: 'low',
      due_diligence_level: 'standard',
    },
  },
  {
    id: 15,
    phase: 'Phase 5 — Off-Chain Retail KYC',
    phaseColor: '#2563eb',
    role: 'bank_pjp',
    roleLabel: 'Bank/PJP KYC Operator',
    roleColor: '#16a34a',
    tab: 'create',
    title: 'Create Merchant Wallet',
    description: 'Create wallet wlt_toko-budi. Chaincode derives MERCHANT from the approved merchant KYC profile.',
    thesis: 'Merchant wallets can use higher tier limits while still relying on approved KYC.',
    prefill: {
      target: 'wallet',
      owner_id: 'toko-budi',
    },
  },
  {
    id: 16,
    phase: 'Phase 6 — Retail Funding',
    phaseColor: '#d97706',
    role: 'bank_pjp',
    roleLabel: 'Bank / PJP Custodian',
    roleColor: '#16a34a',
    tab: 'transfer',
    title: 'GoPay Funds Budi Wallet',
    description: 'GoPay moves its distributed reserve into Budi\'s KYC-approved retail wallet.',
    thesis: 'Custodian funding keeps the two-tier path explicit: Treasury → Custodian → Wallet Owner.',
    prefill: {
      target: 'transfer',
      senderId: 'wlt_gopay',
      receiverId: 'wlt_budi',
      amount: '500000',
    },
  },
  {
    id: 17,
    phase: 'Phase 6 — Retail Funding',
    phaseColor: '#d97706',
    role: 'bank_pjp',
    roleLabel: 'Bank / PJP Custodian',
    roleColor: '#16a34a',
    tab: 'transfer',
    title: 'GoPay Funds Sari Wallet',
    description: 'GoPay funds Sari\'s KYC-approved retail wallet from its Custodian reserve.',
    thesis: 'Retail wallets are funded by their Custodian, never by direct issuance.',
    prefill: {
      target: 'transfer',
      senderId: 'wlt_gopay',
      receiverId: 'wlt_sari',
      amount: '500000',
    },
  },
  {
    id: 18,
    phase: 'Phase 6 — P2P Transfer',
    phaseColor: '#2563eb',
    role: 'kyc_verified',
    roleLabel: 'KYC Verified Customer',
    roleColor: '#2563eb',
    tab: 'transfer',
    title: 'Budi Transfers Rp 150,000 to Sari',
    description: 'Peer-to-peer Digital Rupiah transfer from wlt_budi to wlt_sari after both subjects are KYC-approved.',
    thesis: 'Atomic on-chain transfer — no intermediary settlement delay.',
    prefill: {
      target: 'transfer',
      senderId: 'wlt_budi',
      receiverId: 'wlt_sari',
      amount: '150000',
    },
  },
  {
    id: 19,
    phase: 'Phase 7 — Customer-to-Merchant Transfer',
    phaseColor: '#dc2626',
    role: 'kyc_verified',
    roleLabel: 'KYC Verified Customer',
    roleColor: '#2563eb',
    tab: 'transfer',
    title: 'Sari Pays Rp 35,000 to Toko Budi',
    description: 'Customer Sari transfers Digital Rupiah directly to the approved merchant wallet.',
    thesis: 'The same deterministic transfer policy covers peer-to-peer and customer-to-merchant retail payments.',
    prefill: {
      target: 'transfer',
      senderId: 'wlt_sari',
      receiverId: 'wlt_toko-budi',
      amount: '35000',
    },
  },
  {
    id: 20,
    phase: 'Phase 8 — Supervision',
    phaseColor: '#374151',
    role: 'bank_indonesia',
    roleLabel: 'Bank Indonesia',
    roleColor: '#1a3c6e',
    tab: 'supply',
    title: 'Monitor Total Supply',
    description: 'BI views total Digital Rupiah in circulation and network metrics.',
    thesis: 'Real-time monetary monitoring — supply verifiable by all 5 peer organizations.',
  },
  {
    id: 21,
    phase: 'Phase 8 — Supervision',
    phaseColor: '#374151',
    role: 'bank_indonesia',
    roleLabel: 'Bank Indonesia',
    roleColor: '#1a3c6e',
    tab: 'worldstate',
    title: 'Inspect World State (CouchDB)',
    description: 'View wallets, balances, KYC anchors, and transaction records live in CouchDB Fauxton.',
    thesis: 'Full auditability: every state transition recorded on Hyperledger Fabric ledger.',
  },
]

// Group consecutive steps with same phase heading
function phases(): { phase: string; color: string; steps: DemoStep[] }[] {
  const groups: { phase: string; color: string; steps: DemoStep[] }[] = []
  for (const step of STEPS) {
    const last = groups[groups.length - 1]
    if (last && last.phase === step.phase) {
      last.steps.push(step)
    } else {
      groups.push({ phase: step.phase, color: step.phaseColor, steps: [step] })
    }
  }
  return groups
}

interface Props {
  currentStep: number
  onStep: (stepId: number, role: string, tab: string) => void
  onPrefill: (data: DemoPrefill) => void
}

export default function DemoPanel({ currentStep, onStep, onPrefill }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const currentIndex = Math.min(Math.max(currentStep - 1, 0), STEPS.length - 1)
  const current = STEPS[currentIndex]
  const nextStep = STEPS[currentIndex + 1]

  return (
    <div className="demo-panel">
      {/* Header */}
      <div className="demo-header">
        <div className="demo-kicker">Demo script</div>
        <div className="demo-title">Retail CBDC flow</div>
        <div className="demo-step-count">
          Step {currentIndex + 1} of {STEPS.length}
        </div>
        {/* progress bar */}
        <div className="demo-progress">
          <div className="demo-progress-bar" style={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      {/* Current step callout */}
      {current && (
        <div className="demo-current-step">
          <div className="demo-kicker">
            Required sign-in
          </div>
          <div className="demo-role-pill">
            {current.roleLabel}
          </div>

          <div className="muted demo-login-hint">Use credentials provided by the environment operator.</div>

          <div className="demo-step-title">{current.title}</div>
          <div className="demo-step-description">{current.description}</div>
          {current.thesis && (
            <div className="demo-thesis">
              Thesis: {current.thesis}
            </div>
          )}
          {current.manualAction && (
            <div className="demo-manual-action">
              {current.manualAction}
            </div>
          )}
          {current.prefill && (
            <button
              className="primary-button demo-prefill-button"
              onClick={() => onPrefill(current.prefill!)}
            >
              Prefill demo data
            </button>
          )}
        </div>
      )}

      {/* Steps list */}
      <div className="demo-steps">
        {phases().map((group, groupIndex) => {
          const panelId = `demo-phase-panel-${groupIndex + 1}`
          const expanded = !collapsed[group.phase]
          return (
          <div key={group.phase}>
            <button
              className="demo-phase-toggle"
              onClick={() => setCollapsed(c => ({ ...c, [group.phase]: !c[group.phase] }))}
              aria-controls={panelId}
              aria-expanded={expanded}
            >
              <span className="demo-phase-dot" />
              <span className="demo-phase-label">
                {group.phase}
              </span>
              <span className="demo-phase-indicator">
                {collapsed[group.phase] ? '▼' : '▲'}
              </span>
            </button>

            <div id={panelId} hidden={!expanded}>
            {!collapsed[group.phase] && group.steps.map(step => {
              const isActive = step.id === currentStep
              const isDone = step.id < currentStep
              return (
                <button
                  key={step.id}
                  className={`demo-step${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
                  onClick={() => onStep(step.id, step.role, step.tab)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className="demo-step-number">
                    {isDone ? '✓' : step.id}
                  </span>
                  <div>
                    <div className="demo-step-label">
                      {step.title}
                    </div>
                    <span className="demo-step-role">
                      {step.roleLabel}
                    </span>
                  </div>
                </button>
              )
            })}
            </div>
          </div>
        )})}
      </div>

      {/* Next button */}
      {nextStep && (
        <div className="demo-next">
          <button
            className="primary-button"
            onClick={() => onStep(nextStep.id, nextStep.role, nextStep.tab)}
          >
            Next step: {nextStep.title} →
          </button>
        </div>
      )}
      {!nextStep && currentIndex === STEPS.length - 1 && (
        <div className="demo-complete">
          <div>Demo complete</div>
          <p>All phases are complete.</p>
        </div>
      )}
    </div>
  )
}
