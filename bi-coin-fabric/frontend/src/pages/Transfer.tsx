import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { formatRupiah } from '../lib/money'
import {
  getErrorMessage,
  getWallets,
  listPaymentContacts,
  transfer,
  type PaymentContact,
  type Wallet,
} from '../lib/api'
import { recordPaymentReceipt } from './Activity'
import type { DemoPrefill } from './DemoPanel'
import LoadingSkeleton from '../components/LoadingSkeleton'

interface Props {
  role: string
  selectedWallet: string
  prefill?: DemoPrefill
  onPrefillConsumed?: () => void
}

const RETAIL_ROLES = new Set(['authenticated', 'kyc_verified', 'merchant'])

export default function Transfer({ role, selectedWallet, prefill, onPrefillConsumed }: Props) {
  const retail = RETAIL_ROLES.has(role)
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [contacts, setContacts] = useState<PaymentContact[]>([])
  const [senderId, setSenderId] = useState(selectedWallet)
  const [receiverId, setReceiverId] = useState('')
  const [contactId, setContactId] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const idempotencyKey = useRef(crypto.randomUUID())

  useEffect(() => {
    Promise.all([getWallets(), retail ? listPaymentContacts() : Promise.resolve([] as PaymentContact[])])
      .then(([nextWallets, nextContacts]) => {
        setWallets(nextWallets ?? [])
        setContacts(nextContacts ?? [])
      })
      .catch(err => setError(getErrorMessage(err)))
      .finally(() => setLoading(false))
  }, [retail])

  useEffect(() => {
    if (selectedWallet) setSenderId(selectedWallet)
  }, [selectedWallet])

  useEffect(() => {
    if (!prefill || prefill.target !== 'transfer') return
    if (prefill.senderId) setSenderId(prefill.senderId)
    if (prefill.receiverId) setReceiverId(prefill.receiverId)
    if (prefill.amount) setAmount(prefill.amount)
    setReviewing(false)
    onPrefillConsumed?.()
  }, [prefill, onPrefillConsumed])

  const walletLabel = (wallet: Wallet) => `${wallet.wallet_id} · ${wallet.owner_id || wallet.participant_id} · ${formatRupiah(wallet.balance)}`

  const prepare = (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (!senderId || !receiverId) { setError('Select a sender wallet and enter the recipient Wallet ID.'); return }
    if (senderId === receiverId) { setError('Sender and recipient wallets must be different.'); return }
    if (!/^\d+$/.test(amount) || BigInt(amount) <= 0n) { setError('Amount must be a positive whole-rupiah value.'); return }
    setReviewing(true)
  }

  const submit = async () => {
    if (!reviewing || submitting) return
    try {
      setError('')
      setMessage('')
      setSubmitting(true)
      const result = await transfer({ senderId, receiverId, amount }, idempotencyKey.current) as { tx_id?: string; reference_id?: string }
      const reference = result.reference_id
      setMessage(`${formatRupiah(amount)} transferred successfully.`)
      recordPaymentReceipt({ id: crypto.randomUUID(), operation: 'Digital Rupiah transfer', amount, recipient: receiverId, txId: result.tx_id, reference, createdAt: new Date().toISOString() })
      setAmount('')
      setContactId('')
      setReviewing(false)
      idempotencyKey.current = crypto.randomUUID()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  const selectContact = (value: string) => {
    setContactId(value)
    const contact = contacts.find(item => item.id === value)
    if (contact) setReceiverId(contact.wallet_id)
  }

  return (
    <section className="surface-card transfer-card">
      <div className="workspace-heading">
        <div><div className="eyebrow">{retail ? 'Pay' : 'Institutional transfer'}</div><h2>{retail ? 'Send Digital Rupiah' : 'Transfer between wallets'}</h2><p className="muted">{retail ? 'Use a saved contact or the recipient Wallet ID.' : 'Select a wallet within your role scope.'}</p></div>
      </div>

      {message && <div className="banner success" role="status">{message}</div>}
      {error && <div className="banner error" role="alert">{error}</div>}

      {loading ? <LoadingSkeleton kind="form" label="Loading transfer options" rows={retail ? 4 : 3} /> : (
        <form className="stack-small" onSubmit={prepare}>
          <label className="app-label" htmlFor="transfer-sender"><span>Sender wallet</span><select id="transfer-sender" className="app-input" value={senderId} onChange={event => setSenderId(event.target.value)}><option value="">Select a sender wallet</option>{wallets.filter(wallet => !wallet.frozen).map(wallet => <option key={wallet.wallet_id} value={wallet.wallet_id}>{walletLabel(wallet)}</option>)}</select></label>
          {retail && <label className="app-label" htmlFor="transfer-contact"><span>Saved contact <small>(optional)</small></span><select id="transfer-contact" className="app-input" value={contactId} onChange={event => selectContact(event.target.value)}><option value="">Select a contact</option>{contacts.map(contact => <option key={contact.id} value={contact.id}>{contact.label} · {contact.wallet_id}</option>)}</select></label>}
          <label className="app-label" htmlFor="transfer-recipient"><span>Recipient Wallet ID</span><input id="transfer-recipient" className="app-input" value={receiverId} onChange={event => { setReceiverId(event.target.value); setContactId('') }} placeholder="Enter recipient Wallet ID" required /></label>
          <label className="app-label" htmlFor="transfer-amount"><span>Amount (rupiah)</span><input id="transfer-amount" className="app-input" type="text" inputMode="numeric" pattern="[0-9]+" value={amount} onChange={event => setAmount(event.target.value)} placeholder="150000" required /></label>

          {!reviewing ? <button className="primary-button" type="submit">Review transfer</button> : (
            <div className="review-card">
              <div className="eyebrow">Review</div>
              <div className="context-row"><span>From</span><strong className="mono">{senderId}</strong></div>
              <div className="context-row"><span>To</span><strong className="mono">{receiverId}</strong></div>
              <div className="context-row"><span>Amount</span><strong>{formatRupiah(amount)}</strong></div>
              <div className="button-row"><button className="primary-button" type="button" onClick={() => void submit()} disabled={submitting}>{submitting ? 'Sending…' : 'Confirm and send'}</button><button className="secondary-button" type="button" onClick={() => setReviewing(false)} disabled={submitting}>Edit</button></div>
            </div>
          )}
        </form>
      )}
    </section>
  )
}
