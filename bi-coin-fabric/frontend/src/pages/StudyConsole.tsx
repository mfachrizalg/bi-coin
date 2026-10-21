import { useRef, useState } from 'react'
import type { Role, Tab } from '../App'
import {
  approveSubjectRelease,
  convertStudyToRetail,
  createStudyStaff,
  createStudySubject,
  decideStudySubject,
  fundStudyWallet,
  getErrorMessage,
  getStudyBalance,
  getStudyIdentity,
  getStudySubject,
  initializeStudyMonetary,
  issueStudyRupiah,
  openStudyWallet,
  protectStudyStaff,
  protectStudySubject,
  recordStudyReview,
  redeemStudyReserve,
  registerStudyDistributor,
  requestSubjectRelease,
  restrictSubject,
  setStudyBusinessAuthority,
  setStudyLimits,
  setStudyStaffRole,
  studyRestrictionReasonOptions,
  transferStudyFunds,
  transferStudyInterbank,
} from '../lib/api'
import type { StudyBankKind, StudyLimitsInput, StudyRestrictionReason, StudyStaffRole, StudySubjectView } from '../lib/api'

function StudyAction({ label, working, disabled, onClick }: { label: string; working: boolean; disabled?: boolean; onClick: () => void }) {
  return <button className="primary-button" type="button" disabled={disabled || working} onClick={onClick}>{working ? 'Working…' : label}</button>
}

function resultText(value: unknown) {
  return typeof value === 'string' ? value : JSON.stringify(value, null, 2) ?? String(value)
}

export default function OrganizationWorkspace({ role, section }: { role: Role; section: Tab }) {
  const [subjectID, setSubjectID] = useState('')
  const [category, setCategory] = useState<StudySubjectView['category']>('retail')
  const [destinationID, setDestinationID] = useState('')
  const [distributorID, setDistributorID] = useState('')
  const [recipientDistributorID, setRecipientDistributorID] = useState('')
  const [bankKind, setBankKind] = useState<StudyBankKind>('wholesale')
  const [admissionRef, setAdmissionRef] = useState('')
  const [amount, setAmount] = useState('')
  const [riskLevel, setRiskLevel] = useState<'standard' | 'high'>('standard')
  const [pep, setPep] = useState(false)
  const [approved, setApproved] = useState(true)
  const [limits, setLimits] = useState<StudyLimitsInput>({ per_transaction: '', daily: '', monthly: '', holdings: '' })
  const [representatives, setRepresentatives] = useState('')
  const [beneficialOwners, setBeneficialOwners] = useState('')
  const [reason, setReason] = useState<StudyRestrictionReason>('dttot')
  const [authorityRef, setAuthorityRef] = useState('')
  const [staffClientID, setStaffClientID] = useState('')
  const [staffRole, setStaffRole] = useState<StudyStaffRole>('kyc_reviewer')
  const [busy, setBusy] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<unknown>(null)
  const keys = useRef<Record<string, string>>({})

  const customer = role === 'authenticated' || role === 'kyc_verified' || role === 'merchant'
  const canPay = role === 'kyc_verified' || role === 'merchant'
  const distributor = role === 'retail_bank' || role === 'wholesale_bank'
  const retailBank = role === 'retail_bank'
  const centralBank = role === 'bank_indonesia'
  const customerIdentity = customer && section === 'study_identity'
  const customerWallet = canPay && section === 'study_wallet'
  const customerTransfer = canPay && section === 'study_transfer'
  const distributorApproval = distributor && section === 'study_approval'
  const distributorBusiness = distributor && section === 'study_business'
  const distributorRestrictions = distributor && section === 'study_restrictions'
  const distributorFunding = distributor && section === 'study_funding'
  const validatorAudit = role === 'auditor' && section === 'study_audit'
  const centralMonetary = centralBank && section === 'study_monetary'
  const centralStaff = centralBank && section === 'study_staff'
  const permitted = customerIdentity || customerWallet || customerTransfer || distributorApproval || distributorBusiness || distributorRestrictions || distributorFunding || validatorAudit || centralMonetary || centralStaff
  const organization = customer ? 'EndUserMSP' : distributor ? 'DistributorMSP' : centralBank ? 'CentralBankMSP' : 'ValidatorMSP'
  const sectionTitle: Partial<Record<Tab, string>> = {
    study_identity: 'Subject onboarding', study_wallet: 'Wallet', study_transfer: 'Transfer',
    study_approval: 'Subject approval', study_business: 'Business authority', study_restrictions: 'Restrictions',
  study_funding: 'Reserve and float', study_monetary: 'Monetary operations', study_audit: 'Controls audit', study_staff: 'Staff roles',
  }
  const hasSubject = subjectID.trim() !== ''
  const hasAmount = /^[0-9]+$/.test(amount)
  const hasStaffClient = staffClientID.trim() !== ''

  async function run(label: string, action: () => Promise<unknown>, retryKey?: string) {
    setBusy(label)
    setNotice('')
    setError('')
    try {
      setResult(await action())
      setNotice(label + ' completed.')
      if (retryKey) delete keys.current[retryKey]
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setBusy('')
    }
  }

  function retryKey(name: string) {
    return keys.current[name] ?? (keys.current[name] = crypto.randomUUID())
  }

  const amountField = (
    <label className="app-label" htmlFor="study-amount">
      <span>Amount in rupiah (integer)</span>
      <input id="study-amount" className="app-input" value={amount} onChange={event => setAmount(event.target.value)} inputMode="numeric" pattern="[0-9]+" />
    </label>
  )

  if (!permitted) {
    return <div className="workspace-stack"><section className="surface-card"><h2>{organization}</h2><p>This organization role cannot access this function.</p></section></div>
  }

  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">{organization} · bi-coin</div>
          <h2>{sectionTitle[section]}</h2>
          <p className="muted">{role === 'auditor' ? 'Read-only access for ValidatorMSP.' : 'Organization actions use the server-managed Fabric identity for this login.'}</p>
        </div>
      </section>

      <div className="banner">Use synthetic records and pseudonymous subject IDs only. Fabric signers are selected by the server for each username; application roles do not replace chaincode staff-role checks.</div>

      {!centralBank && <section className="surface-card">
        <label className="app-label" htmlFor="study-subject-id">
          <span>Pseudonymous subject ID</span>
          <input id="study-subject-id" className="app-input" value={subjectID} onChange={event => setSubjectID(event.target.value)} placeholder="retail-0001" autoComplete="off" />
        </label>
      </section>}

      {customerIdentity && <article className="surface-card">
        <h3>End-user identity and onboarding</h3>
        <p className="muted">The identity response comes from this login’s server-managed EndUserMSP certificate.</p>
        <label className="app-label" htmlFor="study-category">
          <span>Customer category</span>
          <select id="study-category" className="app-input" value={category} onChange={event => setCategory(event.target.value as StudySubjectView['category'])}>
            <option value="retail">Retail individual</option>
            <option value="merchant">Merchant individual seller</option>
            <option value="business">Business/company</option>
          </select>
        </label>
        <div className="button-row">
          <StudyAction label="Check mapped identity" working={busy === 'Check mapped identity'} disabled={Boolean(busy)} onClick={() => void run('Check mapped identity', getStudyIdentity)} />
          <StudyAction label="Create pending subject" working={busy === 'Create pending subject'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Create pending subject', () => createStudySubject({ subject_id: subjectID.trim(), category }))} />
        </div>
      </article>}

      {customerWallet && <article className="surface-card">
        <h3>End-user wallet</h3>
        <p className="muted">Wallet opening requires an active, approved subject.</p>
        <div className="button-row">
          <StudyAction label="Open wallet" working={busy === 'Open wallet'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Open wallet', () => openStudyWallet({ subject_id: subjectID.trim() }))} />
          <StudyAction label="Check balance" working={busy === 'Check balance'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Check balance', () => getStudyBalance(subjectID.trim()))} />
        </div>
      </article>}

      {customerTransfer && <article className="surface-card">
        <h3>End-user transfer</h3>
        <p className="muted">Amounts remain decimal strings in the browser.</p>
        <label className="app-label" htmlFor="study-destination-id">
          <span>Recipient subject ID</span>
          <input id="study-destination-id" className="app-input" value={destinationID} onChange={event => setDestinationID(event.target.value)} autoComplete="off" />
        </label>
        {amountField}
        <StudyAction label="Transfer rupiah" working={busy === 'Transfer rupiah'} disabled={!hasSubject || !destinationID.trim() || !hasAmount || Boolean(busy)} onClick={() => void run('Transfer rupiah', () => transferStudyFunds({ from: subjectID.trim(), to: destinationID.trim(), amount }, retryKey('transfer')), 'transfer')} />
      </article>}

      {distributorApproval && <article className="surface-card">
        <h3>Distributor approval</h3>
        <p className="muted">Reviewer and senior approver actions require separate server-mapped staff identities.</p>
        <StudyAction label="Read subject" working={busy === 'Read subject'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Read subject', () => getStudySubject(subjectID.trim()))} />
        <StudyAction label="Protect subject" working={busy === 'Protect subject'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Protect subject', () => protectStudySubject(subjectID.trim()))} />
        <label className="app-label" htmlFor="study-risk-level">
          <span>Risk level</span>
          <select id="study-risk-level" className="app-input" value={riskLevel} onChange={event => setRiskLevel(event.target.value as 'standard' | 'high')}>
            <option value="standard">Standard</option><option value="high">High</option>
          </select>
        </label>
        <label className="app-label" htmlFor="study-pep"><span><input id="study-pep" type="checkbox" checked={pep} onChange={event => setPep(event.target.checked)} /> Politically exposed person</span></label>
        <div className="button-row">
          <StudyAction label="Record review" working={busy === 'Record review'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Record review', () => recordStudyReview(subjectID.trim(), { risk_level: riskLevel, pep }))} />
          <label className="app-label" htmlFor="study-decision"><span>Decision</span><select id="study-decision" className="app-input" value={approved ? 'approve' : 'reject'} onChange={event => setApproved(event.target.value === 'approve')}><option value="approve">Approve</option><option value="reject">Reject</option></select></label>
          <StudyAction label="Apply decision" working={busy === 'Apply decision'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Apply decision', () => decideStudySubject(subjectID.trim(), approved))} />
        </div>
        <h4>Limits (integer rupiah strings)</h4>
        <div className="panel-grid">
          {(['per_transaction', 'daily', 'monthly', 'holdings'] as const).map(field => (
            <label className="app-label" htmlFor={'study-limit-' + field} key={field}>
              <span>{field.replace('_', ' ')}</span>
              <input id={'study-limit-' + field} className="app-input" value={limits[field]} onChange={event => setLimits(current => ({ ...current, [field]: event.target.value }))} inputMode="numeric" pattern="[0-9]+" />
            </label>
          ))}
        </div>
        <StudyAction label="Set limits" working={busy === 'Set limits'} disabled={!hasSubject || Object.values(limits).some(value => !/^[0-9]+$/.test(value)) || Boolean(busy)} onClick={() => void run('Set limits', () => setStudyLimits(subjectID.trim(), limits))} />
      </article>}

      {distributorBusiness && <article className="surface-card">
        <h3>Business authority</h3>
        <p className="muted">For active business/company subjects. Use pseudonymous IDs and SHA-256 references; a senior approver identity is required.</p>
        <label className="app-label" htmlFor="study-representatives"><span>Representative IDs (comma-separated)</span><textarea id="study-representatives" className="app-textarea" value={representatives} onChange={event => setRepresentatives(event.target.value)} autoComplete="off" /></label>
        <label className="app-label" htmlFor="study-beneficial-owners"><span>Beneficial-owner references (comma-separated)</span><textarea id="study-beneficial-owners" className="app-textarea" value={beneficialOwners} onChange={event => setBeneficialOwners(event.target.value)} autoComplete="off" /></label>
        <StudyAction label="Set business authority" working={busy === 'Set business authority'} disabled={!hasSubject || !representatives.split(',').some(value => value.trim()) || Boolean(busy)} onClick={() => void run('Set business authority', () => setStudyBusinessAuthority(subjectID.trim(), {
          representatives: representatives.split(',').map(value => value.trim()).filter(Boolean),
          beneficial_owner_refs: beneficialOwners.split(',').map(value => value.trim()).filter(Boolean),
        }))} />
      </article>}

      {distributorRestrictions && <article className="surface-card">
        <h3>Distributor restrictions</h3>
        <label className="app-label" htmlFor="study-restriction-reason"><span>Reason code</span><select id="study-restriction-reason" className="app-input" value={reason} onChange={event => setReason(event.target.value as StudyRestrictionReason)}>{studyRestrictionReasonOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <div className="button-row">
          <StudyAction label="Restrict subject" working={busy === 'Restrict subject'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Restrict subject', () => restrictSubject(subjectID.trim(), reason))} />
          <StudyAction label="Request release" working={busy === 'Request release'} disabled={!hasSubject || !authorityRef.trim() || Boolean(busy)} onClick={() => void run('Request release', () => requestSubjectRelease(subjectID.trim(), authorityRef.trim()))} />
          <StudyAction label="Approve release" working={busy === 'Approve release'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Approve release', () => approveSubjectRelease(subjectID.trim()))} />
        </div>
        <label className="app-label" htmlFor="study-authority-ref"><span>Release evidence reference (SHA-256)</span><input id="study-authority-ref" className="app-input" value={authorityRef} onChange={event => setAuthorityRef(event.target.value)} autoComplete="off" /></label>
      </article>}

      {distributorFunding && <article className="surface-card">
        <h3>Distributor reserve and float</h3>
        <p className="muted">Interbank transfers move w-Rupiah Digital between Distributor reserves. Retail banks also convert to retail float and fund wallets.</p>
        <label className="app-label" htmlFor="study-distributor-id"><span>Distributor ID (own bank)</span><input id="study-distributor-id" className="app-input" value={distributorID} onChange={event => setDistributorID(event.target.value)} autoComplete="off" /></label>
        <label className="app-label" htmlFor="study-recipient-distributor-id"><span>Recipient distributor ID</span><input id="study-recipient-distributor-id" className="app-input" value={recipientDistributorID} onChange={event => setRecipientDistributorID(event.target.value)} autoComplete="off" /></label>
        {amountField}
        <div className="button-row">
          <StudyAction label="Interbank transfer" working={busy === 'Interbank transfer'} disabled={!distributorID.trim() || !recipientDistributorID.trim() || !hasAmount || Boolean(busy)} onClick={() => void run('Interbank transfer', () => transferStudyInterbank({ from_distributor_id: distributorID.trim(), to_distributor_id: recipientDistributorID.trim(), amount }, retryKey('interbank')), 'interbank')} />
          {retailBank && <StudyAction label="Convert to retail float" working={busy === 'Convert to retail float'} disabled={!distributorID.trim() || !hasAmount || Boolean(busy)} onClick={() => void run('Convert to retail float', () => convertStudyToRetail({ distributor_id: distributorID.trim(), amount }, retryKey('conversion')), 'conversion')} />}
          {retailBank && <StudyAction label="Wallet funding" working={busy === 'Wallet funding'} disabled={!hasSubject || !distributorID.trim() || !hasAmount || Boolean(busy)} onClick={() => void run('Wallet funding', () => fundStudyWallet({ subject_id: subjectID.trim(), distributor_id: distributorID.trim(), amount }, retryKey('funding')), 'funding')} />}
        </div>
      </article>}

      {validatorAudit && <article className="surface-card">
        <h3>ValidatorMSP read-only audit</h3>
        <p className="muted">This organization can inspect pseudonymous controls records and cannot submit study mutations.</p>
        <StudyAction label="Read subject" working={busy === 'Read subject'} disabled={!hasSubject || Boolean(busy)} onClick={() => void run('Read subject', () => getStudySubject(subjectID.trim()))} />
      </article>}

      {centralMonetary && <article className="surface-card">
        <h3>CentralBank monetary operations</h3>
        <p className="muted">These actions use the CentralBankMSP identity mapped to this login.</p>
        <div className="button-row"><StudyAction label="Initialize monetary state" working={busy === 'Initialize monetary state'} disabled={Boolean(busy)} onClick={() => void run('Initialize monetary state', initializeStudyMonetary)} /></div>
        <label className="app-label" htmlFor="study-central-distributor"><span>Distributor ID</span><input id="study-central-distributor" className="app-input" value={distributorID} onChange={event => setDistributorID(event.target.value)} autoComplete="off" /></label>
        <label className="app-label" htmlFor="study-bank-kind"><span>Bank kind</span><select id="study-bank-kind" className="app-input" value={bankKind} onChange={event => setBankKind(event.target.value as StudyBankKind)}><option value="wholesale">Wholesale</option><option value="retail">Retail</option></select></label>
        <label className="app-label" htmlFor="study-admission-ref"><span>Admission evidence reference (SHA-256)</span><input id="study-admission-ref" className="app-input" value={admissionRef} onChange={event => setAdmissionRef(event.target.value)} autoComplete="off" /></label>
        <div className="button-row"><StudyAction label="Register bank" working={busy === 'Register bank'} disabled={!distributorID.trim() || !admissionRef.trim() || Boolean(busy)} onClick={() => void run('Register bank', () => registerStudyDistributor({ distributor_id: distributorID.trim(), kind: bankKind, admission_ref: admissionRef.trim() }))} /></div>
        {amountField}
        <div className="button-row">
          <StudyAction label="Issuance" working={busy === 'Issuance'} disabled={!distributorID.trim() || !hasAmount || Boolean(busy)} onClick={() => void run('Issuance', () => issueStudyRupiah({ distributor_id: distributorID.trim(), amount }, retryKey('issuance')), 'issuance')} />
          <StudyAction label="Redemption" working={busy === 'Redemption'} disabled={!distributorID.trim() || !hasAmount || Boolean(busy)} onClick={() => void run('Redemption', () => redeemStudyReserve({ distributor_id: distributorID.trim(), amount }, retryKey('redeem')), 'redeem')} />
        </div>
      </article>}

      {centralStaff && <article className="surface-card">
        <h3>Staff identities</h3>
        <p className="muted">Maker-checker roles for compliance staff. Use the client ID of the staff identity, as computed by getClientID in scripts/smoke-test.js.</p>
        <label className="app-label" htmlFor="study-staff-client-id">
          <span>Staff client ID</span>
          <input id="study-staff-client-id" className="app-input" value={staffClientID} onChange={event => setStaffClientID(event.target.value)} autoComplete="off" />
        </label>
        <label className="app-label" htmlFor="study-staff-role">
          <span>Role</span>
          <select id="study-staff-role" className="app-input" value={staffRole} onChange={event => setStaffRole(event.target.value as StudyStaffRole)}>
            <option value="kyc_reviewer">KYC reviewer</option>
            <option value="senior_approver">Senior approver</option>
            <option value="compliance_officer">Compliance officer</option>
          </select>
        </label>
        <div className="button-row">
          <StudyAction label="Create staff" working={busy === 'Create staff'} disabled={!hasStaffClient || Boolean(busy)} onClick={() => void run('Create staff', () => createStudyStaff(staffClientID.trim()))} />
          <StudyAction label="Protect staff" working={busy === 'Protect staff'} disabled={!hasStaffClient || Boolean(busy)} onClick={() => void run('Protect staff', () => protectStudyStaff(staffClientID.trim()))} />
          <StudyAction label="Set role" working={busy === 'Set role'} disabled={!hasStaffClient || Boolean(busy)} onClick={() => void run('Set role', () => setStudyStaffRole(staffClientID.trim(), staffRole))} />
        </div>
      </article>}

      {notice && <div className="banner success" role="status">{notice}</div>}
      {error && <div className="banner error" role="alert">{error}</div>}
      {result !== null && <section className="surface-card"><h3>Last response</h3><pre role="status" style={{ overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}>{resultText(result)}</pre></section>}
    </div>
  )
}
