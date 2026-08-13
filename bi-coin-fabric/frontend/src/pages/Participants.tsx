import { useEffect, useState } from 'react'
import {
  listParticipants,
  submitParticipant,
  approveParticipant,
  freezeParticipant,
  unfreezeParticipant,
  distributeToParticipant,
  requestIssuance,
  type Participant,
} from '../lib/api'
import { ParticipantTypeLabel, ParticipantTypeColor } from '../lib/constants'
import type { DemoPrefill } from './DemoPanel'

const badge = (type: string) => (
  <span
    style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      color: '#fff',
      background: ParticipantTypeColor[type] ?? '#6b7280',
    }}
  >
    {ParticipantTypeLabel[type] ?? type}
  </span>
)

const statusColor: Record<string, string> = {
  active: '#16a34a',
  pending: '#d97706',
  frozen: '#dc2626',
}

interface Props {
  role?: string
  prefill?: DemoPrefill
  onPrefillConsumed?: () => void
}

const can = (role: string | undefined, ...allowed: string[]) => allowed.includes(role ?? '')

export default function Participants({ role, prefill, onPrefillConsumed }: Props) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

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
    sender_participant_id: '',
    receiver_participant_id: '',
    amount: '',
  })

  const [issueForm, setIssueForm] = useState({ participant_id: '', amount: '' })

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!issueForm.participant_id || !issueForm.amount) { notify('Fill all issuance fields'); return }
    try {
      await requestIssuance({ participant_id: issueForm.participant_id, amount: issueForm.amount })
      notify('Issuance request submitted')
      setIssueForm({ participant_id: '', amount: '' })
      load()
    } catch (e: any) { notify('Error: ' + e.message) }
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
      setIssueForm({ participant_id: prefill.participant_id ?? '', amount: prefill.amount ?? '' })
    } else if (prefill.target === 'distribute') {
      setDistForm(f => ({
        ...f,
        sender_participant_id: prefill.sender ?? f.sender_participant_id,
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
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const notify = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await submitParticipant(form)
      notify('Participant submitted')
      setForm(f => ({ ...f, participant_id: genId(), name: '', domain: '', account_id: '' }))
      load()
    } catch (e: any) { notify('Error: ' + e.message) }
  }

  const handleAction = async (fn: () => Promise<any>, label: string) => {
    try { await fn(); notify(label + ' OK'); load() }
    catch (e: any) { notify('Error: ' + e.message) }
  }

  const handleDistribute = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseInt(distForm.amount, 10)
    if (!distForm.sender_participant_id || !distForm.receiver_participant_id || isNaN(amount) || amount <= 0) {
      notify('Fill all distribute fields correctly')
      return
    }
    try {
      await distributeToParticipant({
        sender_participant_id: distForm.sender_participant_id,
        receiver_participant_id: distForm.receiver_participant_id,
        amount,
      })
      notify('Distribution successful')
      setDistForm({ sender_participant_id: '', receiver_participant_id: '', amount: '' })
    } catch (e: any) { notify('Error: ' + e.message) }
  }

  const validators = participants.filter(p => p.participant_type === 'validator' && p.status === 'active')
  const pjps = participants.filter(p => p.participant_type === 'pjp' && p.status === 'active')

  return (
    <div style={{ fontSize: '1rem' }}>
      <h2 style={{ marginBottom: 16, fontSize: '1.4rem' }}>Peserta Jaringan</h2>

      {msg && (
        <div style={{ padding: '8px 12px', marginBottom: 12, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 6 }}>
          {msg}
        </div>
      )}
      {error && (
        <div style={{ padding: '8px 12px', marginBottom: 12, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6 }}>
          {error}
        </div>
      )}

      {/* Participant list */}
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['ID', 'Nama', 'Tipe', 'Domain', 'Status', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap', fontSize: '1rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>Loading…</td></tr>
            )}
            {!loading && participants.length === 0 && (
              <tr><td colSpan={6} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>No participants</td></tr>
            )}
            {participants.map(p => (
              <tr key={p.participant_id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.95rem' }}>{p.participant_id}</td>
                <td style={{ padding: '10px 14px' }}>{p.name}</td>
                <td style={{ padding: '10px 14px' }}>{badge(p.participant_type)}</td>
                <td style={{ padding: '8px 12px', color: '#6b7280' }}>{p.domain}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ fontWeight: 600, color: statusColor[p.status] ?? '#374151' }}>{p.status}</span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {can(role, 'bank_indonesia') && p.status === 'pending' && (
                      <button onClick={() => handleAction(() => approveParticipant(p.participant_id), 'Approve')}
                        style={{ padding: '7px 16px', fontSize: '0.95rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                        Approve
                      </button>
                    )}
                    {can(role, 'bank_indonesia') && p.status === 'active' && (
                      <button onClick={() => handleAction(() => freezeParticipant(p.participant_id), 'Freeze')}
                        style={{ padding: '7px 16px', fontSize: '0.95rem', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                        Freeze
                      </button>
                    )}
                    {can(role, 'bank_indonesia') && p.status === 'frozen' && (
                      <button onClick={() => handleAction(() => unfreezeParticipant(p.participant_id), 'Unfreeze')}
                        style={{ padding: '7px 16px', fontSize: '0.95rem', background: '#d97706', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                        Unfreeze
                      </button>
                    )}
                    {!can(role, 'bank_indonesia') && (
                      <span style={{ fontSize: 12, color: '#9ca3af' }}>—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
        {/* Submit participant — bank_pjp + bank_indonesia */}
        {can(role, 'bank_indonesia') && <div>
          <h3 style={{ marginBottom: 12, fontSize: '1.1rem' }}>Daftarkan Peserta</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                value={form.participant_id}
                readOnly
                style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '0.9rem', fontFamily: 'monospace', background: '#f9fafb', color: '#6b7280' }}
              />
              <button type="button" onClick={() => setForm(f => ({ ...f, participant_id: genId() }))}
                title="Regenerate ID"
                style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer', fontSize: '1rem', background: '#fff' }}>
                ↺
              </button>
            </div>
            {(['name', 'domain', 'account_id'] as const).map(field => (
              <input
                key={field}
                placeholder={field.replace(/_/g, ' ')}
                value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
              />
            ))}
            <select
              value={form.participant_type}
              onChange={e => setForm(f => ({ ...f, participant_type: e.target.value }))}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            >
              <option value="validator">Bank / Validator</option>
              <option value="pjp">PJP (Payment Service Provider)</option>
              <option value="observer">Observer</option>
            </select>
            <button type="submit"
              style={{ padding: '12px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}>
              Submit
            </button>
          </form>
        </div>}

        {/* Distribute to PJP — bank_pjp + bank_indonesia */}
        {can(role, 'bank_indonesia') && <div>
          <h3 style={{ marginBottom: 12, fontSize: '1.1rem' }}>Distribusi Likuiditas ke PJP</h3>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 10 }}>
            Bank validator transfers Digital Rupiah to PJP wallet.
          </p>
          <form onSubmit={handleDistribute} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <select
              value={distForm.sender_participant_id}
              onChange={e => setDistForm(f => ({ ...f, sender_participant_id: e.target.value }))}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            >
              <option value="">— Sender (active bank) —</option>
              {validators.map(p => (
                <option key={p.participant_id} value={p.participant_id}>{p.name} ({p.participant_id})</option>
              ))}
            </select>
            <select
              value={distForm.receiver_participant_id}
              onChange={e => setDistForm(f => ({ ...f, receiver_participant_id: e.target.value }))}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            >
              <option value="">— Receiver (active PJP) —</option>
              {pjps.map(p => (
                <option key={p.participant_id} value={p.participant_id}>{p.name} ({p.participant_id})</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount (IDR)"
              value={distForm.amount}
              onChange={e => setDistForm(f => ({ ...f, amount: e.target.value }))}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <button type="submit"
              style={{ padding: '12px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}>
              Distribute
            </button>
          </form>
        </div>}
        {/* Issue Digital Rupiah — bank_indonesia + supervisor only */}
        {can(role, 'bank_indonesia') && <div>
          <h3 style={{ marginBottom: 12, fontSize: '1.1rem' }}>Terbitkan Digital Rupiah (BI)</h3>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 10 }}>
            BI mints and credits Digital Rupiah to bank reserve balance.
          </p>
          <form onSubmit={handleIssue} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <select
              value={issueForm.participant_id}
              onChange={e => setIssueForm(f => ({ ...f, participant_id: e.target.value }))}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            >
              <option value="">— Target bank (active validator) —</option>
              {validators.map(p => (
                <option key={p.participant_id} value={p.participant_id}>{p.name} ({p.participant_id})</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount (IDR)"
              value={issueForm.amount}
              onChange={e => setIssueForm(f => ({ ...f, amount: e.target.value }))}
              style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: '1rem' }}
            />
            <button type="submit"
              style={{ padding: '12px 16px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}>
              Issue
            </button>
          </form>
        </div>}
      </div>
    </div>
  )
}
