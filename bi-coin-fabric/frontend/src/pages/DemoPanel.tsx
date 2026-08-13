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
    title: 'Issue Rp 100,000,000 to Himbara',
    description: 'BI mints Digital Rupiah and credits Himbara\'s reserve balance (wholesale issuance).',
    thesis: 'Only BI can mint. Supply is recorded on-chain and verifiable by all peers.',
    prefill: {
      target: 'issue',
      participant_id: 'himbara',
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
    role: 'bank_pjp',
    roleLabel: 'Bank / PJP',
    roleColor: '#16a34a',
    tab: 'participants',
    title: 'Himbara → GoPay: Distribute Rp 30,000,000',
    description: 'Himbara distributes wholesale liquidity to GoPay for retail customer payments.',
    thesis: 'Wholesale → retail bridge: second tier of the two-tier CBDC model.',
    prefill: {
      target: 'distribute',
      sender: 'himbara',
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
    id: 17,
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
    id: 19,
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
    id: 20,
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
    <div style={{
      width: 320,
      flexShrink: 0,
      background: '#fff',
      borderLeft: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'sticky',
      top: 0,
    }}>
      {/* Header */}
      <div style={{ background: '#111827', color: '#fff', padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: '#9ca3af' }}>DEMO SCRIPT</div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>Retail CBDC Flow</div>
        <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
          Step {currentIndex + 1} of {STEPS.length}
        </div>
        {/* progress bar */}
        <div style={{ marginTop: 8, background: '#374151', borderRadius: 4, height: 5 }}>
          <div style={{
            height: 5, borderRadius: 4, background: '#3b82f6',
            width: `${((currentIndex + 1) / STEPS.length) * 100}%`,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Current step callout */}
      {current && (
        <div style={{ background: '#eff6ff', borderBottom: '1px solid #bfdbfe', padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Required Login
          </div>
          <div style={{
            display: 'inline-block', marginTop: 4, padding: '3px 12px', borderRadius: 10,
            background: current.roleColor, color: '#fff', fontSize: 13, fontWeight: 700,
          }}>
            {current.roleLabel}
          </div>

          <div className="muted" style={{ marginTop: 8 }}>Login dengan kredensial yang diberikan oleh operator environment.</div>

          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8, color: '#111827' }}>{current.title}</div>
          <div style={{ fontSize: 13, color: '#374151', marginTop: 4, lineHeight: 1.5 }}>{current.description}</div>
          {current.thesis && (
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6, fontStyle: 'italic', lineHeight: 1.4 }}>
              Thesis: {current.thesis}
            </div>
          )}
          {current.manualAction && (
            <div style={{ marginTop: 8, padding: '7px 10px', background: '#fef9c3', border: '1px solid #fde047', borderRadius: 4, fontSize: 13, color: '#713f12', lineHeight: 1.4 }}>
              ✋ {current.manualAction}
            </div>
          )}
          {current.prefill && (
            <button
              onClick={() => onPrefill(current.prefill!)}
              style={{
                marginTop: 10, width: '100%', padding: '8px 0', fontSize: 14, fontWeight: 700,
                background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
              }}
            >
              Isi Data Demo
            </button>
          )}
        </div>
      )}

      {/* Steps list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {phases().map((group, groupIndex) => {
          const panelId = `demo-phase-panel-${groupIndex + 1}`
          const expanded = !collapsed[group.phase]
          return (
          <div key={group.phase}>
            <button
              onClick={() => setCollapsed(c => ({ ...c, [group.phase]: !c[group.phase] }))}
              aria-controls={panelId}
              aria-expanded={expanded}
              style={{
                width: '100%', textAlign: 'left', padding: '7px 14px',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: group.color, flexShrink: 0,
              }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: group.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {group.phase}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: '#9ca3af' }}>
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
                  onClick={() => onStep(step.id, step.role, step.tab)}
                  aria-current={isActive ? 'step' : undefined}
                  style={{
                    width: '100%', textAlign: 'left', padding: '9px 14px 9px 24px',
                    background: isActive ? '#eff6ff' : 'none',
                    border: 'none',
                    borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
                    cursor: 'pointer',
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                  }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                    background: isDone ? '#d1fae5' : isActive ? '#2563eb' : '#f3f4f6',
                    color: isDone ? '#059669' : isActive ? '#fff' : '#9ca3af',
                    marginTop: 1,
                  }}>
                    {isDone ? '✓' : step.id}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? '#1d4ed8' : isDone ? '#6b7280' : '#111827', lineHeight: 1.4 }}>
                      {step.title}
                    </div>
                    <span style={{
                      display: 'inline-block', marginTop: 3, padding: '2px 7px', borderRadius: 8,
                      background: step.roleColor + '22', color: step.roleColor,
                      fontSize: 11, fontWeight: 600,
                    }}>
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
        <div style={{ padding: 14, borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => onStep(nextStep.id, nextStep.role, nextStep.tab)}
            style={{
              width: '100%', padding: '11px 0', fontSize: 14, fontWeight: 700,
              background: '#111827', color: '#fff', border: 'none', borderRadius: 6,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            Langkah Berikut: {nextStep.title} →
          </button>
        </div>
      )}
      {!nextStep && currentIndex === STEPS.length - 1 && (
        <div style={{ padding: 14, borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#059669' }}>Demo Selesai!</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Semua fase telah didemonstrasikan.</div>
        </div>
      )}
    </div>
  )
}
