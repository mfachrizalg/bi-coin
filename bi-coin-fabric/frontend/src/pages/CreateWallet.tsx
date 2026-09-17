import { useEffect, useState } from 'react'
import {
  createRetailCustomer,
  createWallet,
  getErrorMessage,
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
    } catch (e) {
      setError(getErrorMessage(e))
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
    } catch (e) {
      setError(getErrorMessage(e))
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
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="workspace-stack create-wallet-page">
      <h2>KYC and wallet</h2>

      <div className="workspace-stack">
        <section className="surface-card">
          <h3>Off-chain KYC</h3>
          <div className="field-grid">
            <input
              className="app-input"
              placeholder="Customer / merchant ID"
              value={customerId}
              onChange={e => {
                setCustomerId(e.target.value)
                setOwnerId(e.target.value)
              }}
            />
            <select
              className="app-input"
              value={subjectType}
              onChange={e => setSubjectType(e.target.value as 'retail_customer' | 'merchant')}
            >
              <option value="retail_customer">Retail customer</option>
              <option value="merchant">Merchant</option>
            </select>
            <input
              className="app-input"
              placeholder="Legal name"
              value={legalName}
              onChange={e => setLegalName(e.target.value)}
            />
            <input
              className="app-input"
              placeholder="Document type"
              value={documentType}
              onChange={e => setDocumentType(e.target.value)}
            />
            <input
              className="app-input"
              placeholder="Document number"
              value={documentNumber}
              onChange={e => setDocumentNumber(e.target.value)}
            />
            <input
              className="app-input"
              placeholder="Wallet account ID"
              value={walletAccountId}
              onChange={e => setWalletAccountId(e.target.value)}
            />
            <input
              className="app-input"
              placeholder="Provider case ID"
              value={providerCaseId}
              onChange={e => setProviderCaseId(e.target.value)}
            />
            <input
              className="app-input field-grid-wide"
              placeholder="KYC profile ID"
              value={kycProfileId}
              onChange={e => setKycProfileId(e.target.value)}
            />
            <select
              className="app-input"
              value={riskLevel}
              onChange={e => setRiskLevel(e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">Low risk</option>
              <option value="medium">Medium risk</option>
              <option value="high">High risk</option>
            </select>
            <select
              className="app-input"
              value={dueDiligenceLevel}
              onChange={e => setDueDiligenceLevel(e.target.value as 'simplified' | 'standard' | 'enhanced')}
            >
              <option value="simplified">Simplified due diligence</option>
              <option value="standard">Standard due diligence</option>
              <option value="enhanced">Enhanced due diligence</option>
            </select>
            <label className="checkbox-label field-grid-wide">
              <input type="checkbox" checked={seniorApproval} onChange={e => setSeniorApproval(e.target.checked)} />
              Senior approval (required for high risk)
            </label>
          </div>
          <div className="button-row form-actions">
            <button
              className="primary-button"
              onClick={submitKyc}
              disabled={loading}
            >
              Store Off-Chain KYC
            </button>
            <button
              className="secondary-button"
              onClick={approveKyc}
              disabled={loading}
            >
              Approve KYC Anchor
            </button>
          </div>
        </section>

        <section className="surface-card">
          <h3>Create wallet</h3>
        <div className="stack-small">
          <label className="app-label" htmlFor="owner-id">
            Owner / KYC Subject ID
          </label>
          <input
            id="owner-id"
            className="app-input"
            value={ownerId}
            onChange={e => setOwnerId(e.target.value)}
            placeholder="budi"
          />
        </div>

        <div>
          <div className="field-help callout">
            Tier is derived by chaincode from subject type, risk, due diligence, and senior approval. It cannot be selected by the operator.
          </div>
        </div>

        <button
          className="primary-button"
          onClick={submit}
          disabled={loading}
        >
          {loading ? 'Creating…' : 'Create Wallet'}
        </button>
        </section>
      </div>

      {message && (
        <div className="banner success" role="status">
          {message}
        </div>
      )}
      {error && (
        <div className="banner error" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
