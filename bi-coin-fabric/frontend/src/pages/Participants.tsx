import { useEffect, useRef, useState } from 'react'
import {
  listParticipants,
  submitParticipant,
  approveParticipant,
  freezeParticipant,
  unfreezeParticipant,
  distributeToParticipant,
  requestIssuance,
  getErrorMessage,
  type Participant,
} from '../lib/api'
import { ParticipantTypeLabel } from '../lib/constants'
import type { DemoPrefill } from './DemoPanel'
import LoadingSkeleton from '../components/LoadingSkeleton'

const badge = (type: string) => (
  <span className={`participant-badge participant-${type}`}>
    {ParticipantTypeLabel[type] ?? type}
  </span>
)

interface Props {
  role?: string
  prefill?: DemoPrefill
  onPrefillConsumed?: () => void
}

const can = (role: string | undefined, ...allowed: string[]) => allowed.includes(role ?? '')
const confirmAction = (message: string) => typeof window === 'undefined' || window.confirm(message)

export default function Participants({ role, prefill, onPrefillConsumed }: Props) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)
  const [busy, setBusy] = useState('')

  const genId = (): string => crypto.randomUUID()

  const [form, setForm] = useState<{
    participant_id: string
    name: string
    domain: string
    account_id: string
    participant_type: string
    initial_reserve_balance: string
    compliance_status: string
  }>({
    participant_id: genId(),
    name: '',
    domain: '',
    account_id: '',
    participant_type: 'validator',
    initial_reserve_balance: '0',
    compliance_status: 'pending',
  })

	const [distForm, setDistForm] = useState({
		receiver_participant_id: '',
		amount: '',
	})

	const [issueForm, setIssueForm] = useState({ amount: '' })
	const distributionIdempotencyKey = useRef(crypto.randomUUID())

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault()
	if (!issueForm.amount) { notify('Enter an issuance amount.', 'error'); return }
	if (!confirmAction(`Issue ${issueForm.amount} Digital Rupiah to Treasury?`)) return
	try {
	  setBusy('issue')
		await requestIssuance({ amount: issueForm.amount })
			notify('Digital Rupiah issued to Treasury')
		setIssueForm({ amount: '' })
      load()
	    } catch (e) { notify(getErrorMessage(e), 'error') } finally { setBusy('') }
  }

  useEffect(() => {
    if (!prefill) return
    if (prefill.target === 'submit') {
      setForm(f => ({
        ...f,
        participant_id: prefill.participant_id ?? f.participant_id,
        name: prefill.name ?? f.name,
        domain: prefill.domain ?? f.domain,
        account_id: prefill.account_id ?? f.account_id,
        participant_type: prefill.participant_type ?? f.participant_type,
      }))
    } else if (prefill.target === 'issue') {
		setIssueForm({ amount: prefill.amount ?? '' })
    } else if (prefill.target === 'distribute') {
      setDistForm(f => ({
        ...f,
		receiver_participant_id: prefill.receiver ?? f.receiver_participant_id,
        amount: prefill.amount ?? f.amount,
      }))
    }
    onPrefillConsumed?.()
  }, [prefill])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listParticipants()
      setParticipants(data ?? [])
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const notify = (text: string, kind: 'success' | 'error' = 'success') => setNotice({ text, kind })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
	  setBusy('submit')
      await submitParticipant(form)
      notify('Participant registered')
      setForm(f => ({ ...f, participant_id: genId(), name: '', domain: '', account_id: '' }))
      load()
	    } catch (e) { notify(getErrorMessage(e), 'error') } finally { setBusy('') }
  }

  const handleAction = async (fn: () => Promise<any>, label: string) => {
    if (!confirmAction(`Confirm ${label.toLowerCase()} for this participant?`)) return
    try { setBusy(label); await fn(); notify(label + ' completed'); load() }
    catch (e) { notify(getErrorMessage(e), 'error') }
    finally { setBusy('') }
  }

  const handleDistribute = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!distForm.receiver_participant_id || !/^\d+$/.test(distForm.amount) || BigInt(distForm.amount) <= 0n) {
      notify('Enter a recipient and a positive amount.', 'error')
      return
    }
	if (!confirmAction(`Distribute ${distForm.amount} Digital Rupiah to ${distForm.receiver_participant_id}?`)) return
    try {
	  setBusy('distribute')
		await distributeToParticipant({
			receiver_participant_id: distForm.receiver_participant_id,
          amount: distForm.amount,
		}, distributionIdempotencyKey.current)
			notify('Distribution completed')
		setDistForm({ receiver_participant_id: '', amount: '' })
		distributionIdempotencyKey.current = crypto.randomUUID()
	    } catch (e) { notify(getErrorMessage(e), 'error') } finally { setBusy('') }
  }

	const validators = participants.filter(p => p.participant_type === 'validator' && p.status === 'active')
	const pjps = participants.filter(p => p.participant_type === 'pjp' && p.status === 'active')
	const custodians = [...validators, ...pjps]

  return (
    <div className="workspace-stack participants-page">
      <h2>Participants</h2>

      {notice && (
        <div className={`banner ${notice.kind}`} role={notice.kind === 'error' ? 'alert' : 'status'}>
          {notice.text}
        </div>
      )}
      {error && (
        <div className="banner error" role="alert">
          {error}
        </div>
      )}

      {/* Participant list */}
      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              {['ID', 'Name', 'Type', 'Domain', 'Status', 'Actions'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6}><LoadingSkeleton kind="table" label="Loading participants" rows={4} /></td></tr>
            )}
            {!loading && participants.length === 0 && (
              <tr><td colSpan={6} className="empty-cell">No participants found.</td></tr>
            )}
            {participants.map(p => (
              <tr key={p.participant_id}>
                <td className="mono">{p.participant_id}</td>
                <td>{p.name}</td>
                <td>{badge(p.participant_type)}</td>
                <td className="muted">{p.domain}</td>
                <td>
                  <span className={`status status-${p.status}`}>{p.status}</span>
                </td>
                <td>
                  <div className="button-row">
                    {can(role, 'bank_indonesia') && p.status === 'pending' && (
                      <button className="secondary-button" disabled={Boolean(busy)} onClick={() => handleAction(() => approveParticipant(p.participant_id), 'Approve')}>
                        Approve
                      </button>
                    )}
                    {can(role, 'bank_indonesia') && p.status === 'active' && (
                      <button className="secondary-button danger" disabled={Boolean(busy)} onClick={() => handleAction(() => freezeParticipant(p.participant_id), 'Freeze')}>
                        Freeze
                      </button>
                    )}
                    {can(role, 'bank_indonesia') && p.status === 'frozen' && (
                      <button className="secondary-button warning" disabled={Boolean(busy)} onClick={() => handleAction(() => unfreezeParticipant(p.participant_id), 'Unfreeze')}>
                        Unfreeze
                      </button>
                    )}
                    {!can(role, 'bank_indonesia') && (
                      <span className="muted">—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="participant-forms-grid">
        {/* Submit participant — validator bank/PJP + BI */}
        {can(role, 'bank_pjp', 'validator_bank', 'pjp', 'bank_indonesia') && <section className="surface-card">
          <h3>Register participant</h3>
          <form className="stack-small" onSubmit={handleSubmit}>
            <div className="button-row field-row">
              <input
                value={form.participant_id}
                readOnly
                className="app-input mono"
              />
              <button type="button" onClick={() => setForm(f => ({ ...f, participant_id: genId() }))}
                title="Regenerate ID"
                aria-label="Regenerate participant ID"
                className="secondary-button">
                Regenerate
              </button>
            </div>
            {(['name', 'domain', 'account_id'] as const).map(field => (
              <input
                key={field}
                aria-label={field.replace(/_/g, ' ')}
                placeholder={field.replace(/_/g, ' ')}
                value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="app-input"
              />
            ))}
            <select
              value={form.participant_type}
              onChange={e => setForm(f => ({ ...f, participant_type: e.target.value }))}
              className="app-input"
            >
              <option value="validator">Bank / Validator</option>
              <option value="pjp">PJP (Payment Service Provider)</option>
              <option value="observer">Observer</option>
            </select>
            <button type="submit" className="primary-button" disabled={Boolean(busy)}>
              Register participant
            </button>
          </form>
        </section>}

		{/* Treasury distribution to an institutional Custodian */}
      {can(role, 'bank_indonesia') && <section className="surface-card">
        <h3>Distribute from Treasury</h3>
        <p className="field-help">
              Bank Indonesia sends issued Digital Rupiah from Treasury to an active Validator Bank or PJP.
            </p>
				<form className="stack-small" onSubmit={handleDistribute}>
					<select
              value={distForm.receiver_participant_id}
              onChange={e => setDistForm(f => ({ ...f, receiver_participant_id: e.target.value }))}
              className="app-input"
            >
						<option value="">Select a Validator Bank or PJP</option>
					{custodians.map(p => (
                <option key={p.participant_id} value={p.participant_id}>{p.name} ({p.participant_id})</option>
              ))}
            </select>
            <input
              type="number"
              aria-label="Distribution amount in rupiah"
              placeholder="Amount (rupiah)"
              value={distForm.amount}
              onChange={e => setDistForm(f => ({ ...f, amount: e.target.value }))}
              className="app-input"
            />
            <button type="submit" className="primary-button" disabled={Boolean(busy)}>
              Distribute
            </button>
          </form>
        </section>}
			{/* Issue Digital Rupiah to Treasury */}
        {can(role, 'bank_indonesia') && <section className="surface-card">
          <h3>Issue Digital Rupiah</h3>
          <p className="field-help">
					Bank Indonesia issues Digital Rupiah to Treasury. Use Treasury distribution to fund a Custodian.
          </p>
		  <form className="stack-small" onSubmit={handleIssue}>
            <input
              type="number"
              aria-label="Issuance amount in rupiah"
              placeholder="Amount (rupiah)"
              value={issueForm.amount}
              onChange={e => setIssueForm(f => ({ ...f, amount: e.target.value }))}
              className="app-input"
            />
            <button type="submit" className="primary-button" disabled={Boolean(busy)}>
              Issue
            </button>
          </form>
        </section>}
      </div>
    </div>
  )
}
