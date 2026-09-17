import { useEffect, useMemo, useRef, useState } from 'react'
import {
  cancelQrisIntent,
  createQrisIntent,
  getErrorMessage,
  getWallets,
  listQrisIntents,
  payQris,
  resolveQrisPayload,
  type QrisIntent,
  type QrisPayResult,
  type Wallet,
} from '../lib/api'
import { formatRupiah } from '../lib/money'
import { recordPaymentReceipt } from './Activity'
import LoadingSkeleton from '../components/LoadingSkeleton'


interface Props {
  role: string
  selectedWallet: string
}

function payloadSeed(payload: string, index: number) {
  let value = 0
  for (let i = 0; i < payload.length; i += 1) value = (value + payload.charCodeAt(i) * (index + 7 + i)) % 9973
  return value % 3 === 0 ? 1 : 0
}

function PrototypeQrisCard({ payload }: { payload: string }) {
  const cells = useMemo(() => Array.from({ length: 21 * 21 }, (_, index) => payloadSeed(payload, index)), [payload])
  return (
    <div className="prototype-qr-card">
      <div className="prototype-qr-grid">
        {cells.map((cell, index) => <span key={index} className={cell ? 'on' : 'off'} />)}
      </div>
      <p className="muted">Prototype QRIS code. Settlement uses the signed backend payload.</p>
    </div>
  )
}

export default function QrisPayments({ role, selectedWallet }: Props) {
  const canCreate = role === 'merchant'
  const canPay = role === 'merchant' || role === 'kyc_verified'
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [intents, setIntents] = useState<QrisIntent[]>([])
  const [payload, setPayload] = useState('')
  const [resolved, setResolved] = useState<QrisIntent | null>(null)
  const [payResult, setPayResult] = useState<QrisPayResult | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState<'static' | 'dynamic'>('dynamic')
  const [merchantWalletId, setMerchantWalletId] = useState(selectedWallet)
  const [createAmount, setCreateAmount] = useState('25000')
  const [payAmount, setPayAmount] = useState('25000')
	const [label, setLabel] = useState('Retail purchase')
	const [payerWalletId, setPayerWalletId] = useState(selectedWallet)
	const paymentIdempotencyKey = useRef(crypto.randomUUID())
	const [submitting, setSubmitting] = useState(false)
	const [walletsLoading, setWalletsLoading] = useState(true)
	const [intentsLoading, setIntentsLoading] = useState(canCreate)
	const confirmAction = (message: string) => typeof window === 'undefined' || window.confirm(message)

  const loadWallets = async () => {
    setWalletsLoading(true)
    try {
      const data = await getWallets()
      setWallets(data ?? [])
      if (!merchantWalletId && data?.[0]) setMerchantWalletId(data[0].wallet_id)
      if (!payerWalletId && data?.[0]) setPayerWalletId(data[0].wallet_id)
    } catch (e) {
	      setError(getErrorMessage(e))
    } finally {
      setWalletsLoading(false)
    }
  }

  const loadIntents = async () => {
    if (!canCreate) { setIntentsLoading(false); return }
    setIntentsLoading(true)
    try {
      const data = await listQrisIntents()
      setIntents(data ?? [])
    } catch (e) {
	      setError(getErrorMessage(e))
    } finally {
      setIntentsLoading(false)
    }
  }

  useEffect(() => {
    loadWallets()
    loadIntents()
  }, [role])

  useEffect(() => {
    if (selectedWallet) {
      setMerchantWalletId(selectedWallet)
      setPayerWalletId(selectedWallet)
    }
  }, [selectedWallet])

  const handlePayloadChange = (nextPayload: string, nextResolved: QrisIntent | null = null) => {
    setPayload(nextPayload)
    setResolved(nextResolved)
    setPayResult(null)
  }

  const handleCreate = async () => {
    if (!merchantWalletId) {
      setError('Select a merchant wallet first.')
      return
    }
    try {
	  setSubmitting(true)
      setError('')
      setMessage('')
      const intent = await createQrisIntent({
        mode,
        merchant_wallet_id: merchantWalletId,
        amount: mode === 'dynamic' ? createAmount : undefined,
        label,
      })
      handlePayloadChange(intent.payload ?? '', intent)
      setMessage(`${intent.mode} QRIS is ready to share.`)
      await loadIntents()
    } catch (e) {
	      setError(getErrorMessage(e))
    } finally {
	  setSubmitting(false)
    }
  }

  const handleResolve = async () => {
    if (!payload) {
      setError('Enter a QRIS payload first.')
      return
    }
    try {
	  setSubmitting(true)
      setError('')
      setMessage('')
      const intent = await resolveQrisPayload(payload)
      handlePayloadChange(payload, intent)
      setPayAmount(intent.amount !== '0' ? intent.amount : payAmount)
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
	  setSubmitting(false)
    }
  }

  const handlePay = async () => {
    if (!resolved || !payerWalletId) {
      setError('Resolve the payload and select a payer wallet first.')
      return
    }
	if (!confirmAction(`Pay ${formatRupiah(resolved.mode === 'static' ? payAmount : resolved.amount)} to merchant ${resolved.merchant_id}?`)) return
    try {
	  setSubmitting(true)
      setError('')
		const result = await payQris({
			payload,
			payer_wallet_id: payerWalletId,
			amount: resolved.mode === 'static' ? payAmount : undefined,
		}, paymentIdempotencyKey.current)
		setPayResult(result)
		setMessage(`QRIS payment completed. Reference ${result.reference_id}`)
		recordPaymentReceipt({ id: crypto.randomUUID(), operation: 'QRIS payment', amount: resolved.mode === 'static' ? payAmount : resolved.amount, recipient: resolved.merchant_id, txId: result.tx_id, reference: result.reference_id, createdAt: new Date().toISOString() })
		paymentIdempotencyKey.current = crypto.randomUUID()
      await loadIntents()
    } catch (e) {
	      setError(getErrorMessage(e))
    } finally {
	  setSubmitting(false)
    }
  }

  const handleCancel = async (intentId: string) => {
    try {
      await cancelQrisIntent(intentId)
      await loadIntents()
    } catch (e) {
	      setError(getErrorMessage(e))
    }
  }

  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">QRIS</div>
          <h2>QRIS payments</h2>
        </div>
      </section>

      {message && <div className="banner success" role="status">{message}</div>}
      {error && <div className="banner error" role="alert">{error}</div>}

      <section className="panel-grid">
        <article className="surface-card">
          <h3>Payload QRIS</h3>
          {payload ? (
            <div className="stack-small">
              <PrototypeQrisCard payload={payload} />
              <textarea className="app-textarea" rows={5} value={payload} onChange={e => handlePayloadChange(e.target.value)} />
            </div>
          ) : (
            <p className="muted">No active payload. A merchant can create one, or a customer can enter a merchant payload.</p>
          )}
        </article>

        {canCreate && (
          <article className="surface-card">
            <h3>Merchant collect</h3>
            {walletsLoading ? <LoadingSkeleton kind="form" label="Loading merchant wallets" rows={4} /> : <div className="stack-small">
              <label className="app-label">
                <span>Mode</span>
                <select className="app-input" value={mode} onChange={e => setMode(e.target.value as 'static' | 'dynamic')}>
                  <option value="dynamic">Dynamic QR</option>
                  <option value="static">Static QR</option>
                </select>
              </label>
              <label className="app-label">
                  <span>Merchant wallet</span>
                  <select className="app-input" value={merchantWalletId} onChange={e => setMerchantWalletId(e.target.value)}>
                  <option value="">Select a wallet</option>
                  {wallets.map(wallet => <option key={wallet.wallet_id} value={wallet.wallet_id}>{wallet.wallet_id} · {wallet.owner_id || wallet.participant_id} · custodian {wallet.participant_id}</option>)}
                </select>
              </label>
              {mode === 'dynamic' && (
                <label className="app-label">
                  <span>Amount</span>
                  <input className="app-input" value={createAmount} onChange={e => setCreateAmount(e.target.value)} />
                </label>
              )}
              <label className="app-label">
                <span>Label</span>
                <input className="app-input" value={label} onChange={e => setLabel(e.target.value)} />
              </label>
              <button className="primary-button" onClick={() => void handleCreate()} disabled={submitting}>{submitting ? 'Creating…' : 'Create QRIS'}</button>
            </div>}
          </article>
        )}
      </section>

      <section className="panel-grid">
        <article className="surface-card">
          <h3>Customer pay</h3>
          <div className="stack-small">
            <button className="secondary-button" onClick={() => void handleResolve()} disabled={submitting}>Resolve payload</button>
            {resolved && (
              <div className="stack-small">
                <div className="context-row"><span>Merchant</span><strong>{resolved.merchant_id}</strong></div>
                <div className="context-row"><span>Mode</span><strong>{resolved.mode}</strong></div>
                <div className="context-row"><span>Status</span><strong>{resolved.status}</strong></div>
                <div className="context-row"><span>Reference</span><strong>{resolved.reference_id}</strong></div>
                <label className="app-label">
                  <span>Payer wallet</span>
                  <select className="app-input" value={payerWalletId} onChange={e => setPayerWalletId(e.target.value)}>
                    <option value="">Select a wallet</option>
                    {wallets.map(wallet => <option key={wallet.wallet_id} value={wallet.wallet_id}>{wallet.wallet_id} · {wallet.owner_id || wallet.participant_id} · custodian {wallet.participant_id}</option>)}
                  </select>
                </label>
                {resolved.mode === 'static' ? (
                  <label className="app-label">
                    <span>Amount</span>
                    <input className="app-input" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
                  </label>
                ) : (
                  <div className="context-row"><span>Amount</span><strong>{formatRupiah(resolved.amount)}</strong></div>
                )}
                {canPay && <button className="primary-button" onClick={handlePay} disabled={submitting}>{submitting ? 'Processing…' : 'Pay with QRIS'}</button>}
              </div>
            )}
            {payResult && <div className="banner success" role="status">Tx {payResult.tx_id ?? '—'} · Ref {payResult.reference_id}</div>}
          </div>
        </article>

        {canCreate && (
          <article className="surface-card">
            <h3>Recent intents</h3>
            <div className="stack-small">
              {intentsLoading && <LoadingSkeleton kind="list" label="Loading QRIS intents" rows={3} />}
              {!intentsLoading && intents.length === 0 && <p className="muted">No QRIS intents found.</p>}
              {!intentsLoading && intents.map(intent => (
                <div key={intent.intent_id} className="intent-card">
                  <div className="context-row">
                    <strong>{intent.label || intent.intent_id}</strong>
                    <span className="pill">{intent.status}</span>
                  </div>
                  <div className="muted">{intent.mode} · {intent.amount !== '0' ? formatRupiah(intent.amount) : 'amount set by payer'}</div>
                  <div className="muted">{intent.reference_id}</div>
                  <div className="intent-actions">
                    <button className="secondary-button" onClick={() => handlePayloadChange(intent.payload ?? '', intent)}>Use</button>
                    {(intent.status === 'pending' || intent.status === 'active') && (
                      <button className="secondary-button danger" onClick={() => handleCancel(intent.intent_id)}>Cancel</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}
      </section>
    </div>
  )
}
