import { useEffect, useState } from 'react'
import {
  createPaymentContact,
  deletePaymentContact,
  getErrorMessage,
  listPaymentContacts,
  updatePaymentContact,
  type PaymentContact,
  type PaymentContactInput,
  type PaymentContactType,
} from '../lib/api'
import LoadingSkeleton from '../components/LoadingSkeleton'

const EMPTY_FORM: PaymentContactInput = {
  label: '',
  wallet_id: '',
  recipient_type: 'retail_customer',
}

export default function Contacts() {
  const [contacts, setContacts] = useState<PaymentContact[]>([])
  const [form, setForm] = useState<PaymentContactInput>(EMPTY_FORM)
  const [editingId, setEditingId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setContacts((await listPaymentContacts()) ?? [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  const change = <K extends keyof PaymentContactInput>(key: K, value: PaymentContactInput[K]) => {
    setForm(current => ({ ...current, [key]: value }))
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setSaving(true)
    try {
      if (editingId) {
        await updatePaymentContact(editingId, form)
        setMessage('Payment contact updated.')
      } else {
        await createPaymentContact(form)
        setMessage('Payment contact saved.')
      }
      setForm(EMPTY_FORM)
      setEditingId('')
      await load()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const edit = (contact: PaymentContact) => {
    setEditingId(contact.id)
    setForm({ label: contact.label, wallet_id: contact.wallet_id, recipient_type: contact.recipient_type })
    setError('')
    setMessage('')
  }

  const remove = async (contact: PaymentContact) => {
    if (!window.confirm(`Delete contact ${contact.label}?`)) return
    setError('')
    setMessage('')
    try {
      await deletePaymentContact(contact.id)
      setMessage('Payment contact deleted.')
      await load()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">Payment contacts</div>
          <h2>Saved recipients</h2>
          <p className="muted">Contacts store a label and Wallet ID. Each payment is still checked by the backend.</p>
        </div>
      </section>

      {message && <div className="banner success" role="status">{message}</div>}
      {error && <div className="banner error" role="alert">{error}</div>}

      <section className="panel-grid">
        <article className="surface-card">
          <h3>{editingId ? 'Edit contact' : 'Add contact'}</h3>
          <form className="stack-small" onSubmit={submit}>
            <label className="app-label" htmlFor="contact-label">
              <span>Contact label</span>
              <input id="contact-label" className="app-input" value={form.label} onChange={event => change('label', event.target.value)} maxLength={80} required />
            </label>
            <label className="app-label" htmlFor="contact-wallet-id">
              <span>Recipient Wallet ID</span>
              <input id="contact-wallet-id" className="app-input" value={form.wallet_id} onChange={event => change('wallet_id', event.target.value)} required />
            </label>
            <label className="app-label" htmlFor="contact-type">
              <span>Recipient type</span>
              <select id="contact-type" className="app-input" value={form.recipient_type} onChange={event => change('recipient_type', event.target.value as PaymentContactType)}>
                <option value="retail_customer">Retail Customer</option>
                <option value="merchant">Merchant</option>
              </select>
            </label>
            <div className="button-row">
              <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Save contact'}</button>
              {editingId && <button className="secondary-button" type="button" onClick={() => { setEditingId(''); setForm(EMPTY_FORM) }}>Cancel</button>}
            </div>
          </form>
        </article>

        <article className="surface-card">
          <h3>Saved contacts</h3>
          {loading && <LoadingSkeleton kind="list" label="Loading payment contacts" rows={3} />}
          {!loading && contacts.length === 0 && <p className="muted">No contacts found. Add a recipient Wallet ID.</p>}
          {!loading && <div className="stack-small">
            {contacts.map(contact => (
              <div className="contact-card" key={contact.id}>
                <div>
                  <strong>{contact.label}</strong>
                  <div className="muted">{contact.wallet_id} · {contact.recipient_type === 'merchant' ? 'Merchant' : 'Retail Customer'}</div>
                </div>
                <div className="button-row">
                  <button className="secondary-button" type="button" onClick={() => edit(contact)}>Edit</button>
                  <button className="secondary-button danger" type="button" onClick={() => void remove(contact)}>Delete</button>
                </div>
              </div>
            ))}
          </div>}
        </article>
      </section>
    </div>
  )
}
