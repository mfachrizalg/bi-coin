import { useEffect, useState } from 'react'
import {
  createRetailCustomer,
  createWallet,
  refreshKycProfile,
  submitKycProfile,
} from '../lib/api'
import type { DemoPrefill } from './DemoPanel'

interface Props {
  prefill?: DemoPrefill
  onPrefillConsumed?: () => void
}

export default function CreateWallet({ prefill, onPrefillConsumed }: Props) {
  const [ownerId, setOwnerId] = useState('')
  const [subjectType, setSubjectType] = useState<'retail_customer' | 'merchant'>('retail_customer')
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low')
  const [dueDiligenceLevel, setDueDiligenceLevel] = useState<'simplified' | 'standard' | 'enhanced'>('simplified')
  const [seniorApproval, setSeniorApproval] = useState(false)
  const [customerId, setCustomerId] = useState('')
  const [legalName, setLegalName] = useState('')
  const [documentType, setDocumentType] = useState('ktp')
  const [documentNumber, setDocumentNumber] = useState('')
  const [walletAccountId, setWalletAccountId] = useState('')
  const [providerCaseId, setProviderCaseId] = useState('')
  const [kycProfileId, setKycProfileId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!prefill) return
    if (prefill.customer_id) {
      setCustomerId(prefill.customer_id)
      setOwnerId(prefill.customer_id)
      setProviderCaseId(prefill.provider_case_id ?? `case-${prefill.customer_id}`)
      setKycProfileId(prefill.profile_id ?? '')
    }
    if (prefill.legal_name) setLegalName(prefill.legal_name)
    if (prefill.document_type) setDocumentType(prefill.document_type)
    if (prefill.document_number) setDocumentNumber(prefill.document_number)
    if (prefill.wallet_account_id) setWalletAccountId(prefill.wallet_account_id)
    if (prefill.owner_id) setOwnerId(prefill.owner_id)
    else if (prefill.participant_id) setOwnerId(prefill.participant_id)
    if (prefill.subject_type === 'merchant' || prefill.subject_type === 'retail_customer') setSubjectType(prefill.subject_type)
    if (prefill.risk_level === 'low' || prefill.risk_level === 'medium' || prefill.risk_level === 'high') setRiskLevel(prefill.risk_level)
    if (prefill.due_diligence_level === 'simplified' || prefill.due_diligence_level === 'standard' || prefill.due_diligence_level === 'enhanced') setDueDiligenceLevel(prefill.due_diligence_level)
    if (prefill.senior_approval) setSeniorApproval(prefill.senior_approval === 'true')
    onPrefillConsumed?.()
  }, [prefill])

  const submitKyc = async () => {
    if (!customerId || !legalName || !documentType || !documentNumber) {
      setError('Fill customer ID, legal name, document type, and document number')
      return
    }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const caseID = providerCaseId || `case-${customerId}`
      const accountID = walletAccountId || `ACC-${customerId.toUpperCase()}-001`
      const profile = await submitKycProfile({
        subject_type: subjectType,
        subject_id: customerId,
        provider_case_id: caseID,
        legal_name: legalName,
        document_type: documentType,
        document_number: documentNumber,
      })
      const profileID = (profile as any)?.profile_id
      if (!profileID) throw new Error('KYC profile response did not include profile_id')
      setKycProfileId(profileID)
      setProviderCaseId(caseID)
      setWalletAccountId(accountID)
      setOwnerId(customerId)
      if (subjectType === 'retail_customer') {
        await createRetailCustomer({
          customer_id: customerId,
          legal_name: legalName,
          wallet_account_id: accountID,
          kyc_profile_id: profileID,
        })
      }
      setMessage(`Off-chain KYC stored and anchored: ${profileID}`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const approveKyc = async () => {
    const profileID = kycProfileId
    if (!profileID) {
      setError('Submit KYC first, or paste a KYC profile ID')
      return
    }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      await refreshKycProfile(profileID, {
        provider_case_id: providerCaseId || (customerId ? `case-${customerId}` : profileID),
        status: 'approved',
        risk_level: riskLevel,
        due_diligence_level: dueDiligenceLevel,
        senior_approval: seniorApproval,
        checks: { sanctions: 'pass', aml: 'pass' },
        document_hashes: [],
      })
      setKycProfileId(profileID)
      setMessage(`KYC approved on-chain anchor: ${profileID}`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const submit = async () => {
    if (!ownerId) { setError('Enter owner / KYC subject ID'); return }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const w = await createWallet({ owner_id: ownerId })
      setMessage(`Wallet created: ${w?.wallet_id ?? 'wlt_' + ownerId}; policy tier: ${w?.tier ?? 'derived on ledger'}`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 640, fontSize: '1rem' }}>
      <h2 style={{ marginBottom: 20, fontSize: '1.4rem' }}>KYC Retail &amp; Buat Dompet</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ padding: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>KYC Off-Chain (PoC)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input
              placeholder="Customer / merchant ID"
              value={customerId}
              onChange={e => {
                setCustomerId(e.target.value)
                setOwnerId(e.target.value)
              }}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <select
              value={subjectType}
              onChange={e => setSubjectType(e.target.value as 'retail_customer' | 'merchant')}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            >
              <option value="retail_customer">Retail customer</option>
              <option value="merchant">Merchant</option>
            </select>
            <input
              placeholder="Legal name"
              value={legalName}
              onChange={e => setLegalName(e.target.value)}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <input
              placeholder="Document type"
              value={documentType}
              onChange={e => setDocumentType(e.target.value)}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <input
              placeholder="Document number"
              value={documentNumber}
              onChange={e => setDocumentNumber(e.target.value)}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <input
              placeholder="Wallet account ID"
              value={walletAccountId}
              onChange={e => setWalletAccountId(e.target.value)}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <input
              placeholder="Provider case ID"
              value={providerCaseId}
              onChange={e => setProviderCaseId(e.target.value)}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <input
              placeholder="KYC profile ID"
              value={kycProfileId}
              onChange={e => setKycProfileId(e.target.value)}
              style={{ gridColumn: 'span 2', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <select
              value={riskLevel}
              onChange={e => setRiskLevel(e.target.value as 'low' | 'medium' | 'high')}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            >
              <option value="low">Low risk</option>
              <option value="medium">Medium risk</option>
              <option value="high">High risk</option>
            </select>
            <select
              value={dueDiligenceLevel}
              onChange={e => setDueDiligenceLevel(e.target.value as 'simplified' | 'standard' | 'enhanced')}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            >
              <option value="simplified">Simplified due diligence</option>
              <option value="standard">Standard due diligence</option>
              <option value="enhanced">Enhanced due diligence</option>
            </select>
            <label style={{ gridColumn: 'span 2', display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
              <input type="checkbox" checked={seniorApproval} onChange={e => setSeniorApproval(e.target.checked)} />
              Senior approval (required for high risk)
            </label>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button
              onClick={submitKyc}
              disabled={loading}
              style={{
                flex: 1, padding: '12px 0', background: loading ? '#93c5fd' : '#2563eb', color: '#fff',
                border: 'none', borderRadius: 6, fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              Store Off-Chain KYC
            </button>
            <button
              onClick={approveKyc}
              disabled={loading}
              style={{
                flex: 1, padding: '12px 0', background: loading ? '#86efac' : '#16a34a', color: '#fff',
                border: 'none', borderRadius: 6, fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              Approve KYC Anchor
            </button>
          </div>
        </div>

        <div style={{ padding: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>Buat Dompet</h3>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>
            Owner / KYC Subject ID
          </label>
          <input
            value={ownerId}
            onChange={e => setOwnerId(e.target.value)}
            placeholder="budi"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
          />
        </div>

        <div>
          <div style={{ fontSize: 12, color: '#4b5563', padding: '8px 10px', background: '#f9fafb', borderRadius: 4 }}>
            Tier is derived by chaincode from subject type, risk, due diligence, and senior approval. It cannot be selected by the operator.
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            padding: '14px 0', background: loading ? '#93c5fd' : '#2563eb', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating…' : 'Create Wallet'}
        </button>
        </div>
      </div>

      {message && (
        <div style={{ marginTop: 16, padding: '12px 14px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, fontSize: '1rem', color: '#15803d', fontWeight: 600 }}>
          {message}
        </div>
      )}
      {error && (
        <div style={{ marginTop: 12, padding: '8px 12px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, fontSize: 14, color: '#dc2626' }}>
          {error}
        </div>
      )}
    </div>
  )
}
