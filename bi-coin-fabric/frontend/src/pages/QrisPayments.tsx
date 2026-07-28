import { useEffect, useMemo, useState } from 'react'
import {
  cancelQrisIntent,
  createQrisIntent,
  getWallets,
  listQrisIntents,
  payQris,
  resolveQrisPayload,
  type QrisIntent,
  type QrisPayResult,
  type Wallet,
} from '../lib/api'

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

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
      <p className="muted">Prototype QRIS code. Settlement tetap memakai payload signed dari backend.</p>
    </div>
  )
}

export default function QrisPayments({ role, selectedWallet }: Props) {
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

  const canCreate = role === 'merchant'
  const canPay = role === 'merchant' || role === 'kyc_verified'

  const loadWallets = async () => {
    try {
      const data = await getWallets()
      setWallets(data ?? [])
      if (!merchantWalletId && data?.[0]) setMerchantWalletId(data[0].wallet_id)
      if (!payerWalletId && data?.[0]) setPayerWalletId(data[0].wallet_id)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const loadIntents = async () => {
    if (!canCreate) return
    try {
      const data = await listQrisIntents()
      setIntents(data ?? [])
    } catch (e: any) {
      setError(e.message)
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

  const handleCreate = async () => {
    if (!merchantWalletId) {
      setError('Pilih dompet merchant lebih dulu')
      return
    }
    try {
      setError('')
      setMessage('')
      const intent = await createQrisIntent({
        mode,
        merchant_wallet_id: merchantWalletId,
        amount: mode === 'dynamic' ? createAmount : undefined,
        label,
      })
      setPayload(intent.payload ?? '')
      setResolved(intent)
      setMessage(`QRIS ${intent.mode} siap dibagikan`)
      await loadIntents()
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleResolve = async () => {
    if (!payload) {
      setError('Tempel payload QRIS lebih dulu')
      return
    }
    try {
      setError('')
      setMessage('')
      const intent = await resolveQrisPayload(payload)
      setResolved(intent)
      setPayAmount(intent.amount > 0 ? String(intent.amount) : payAmount)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handlePay = async () => {
    if (!resolved || !payerWalletId) {
      setError('Resolve payload dan pilih dompet payer terlebih dulu')
      return
    }
    try {
      setError('')
      const result = await payQris({
        payload,
        payer_wallet_id: payerWalletId,
        amount: resolved.mode === 'static' ? payAmount : undefined,
      })
      setPayResult(result)
      setMessage(`QRIS dibayar. Reference ${result.reference_id}`)
      await loadIntents()
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleCancel = async (intentId: string) => {
    try {
      await cancelQrisIntent(intentId)
      await loadIntents()
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">QRIS</div>
          <h2>Merchant collect dan customer pay dalam alur desktop yang sama.</h2>
        </div>
      </section>

      {message && <div className="banner success">{message}</div>}
      {error && <div className="banner error">{error}</div>}

      <section className="panel-grid">
        <article className="surface-card">
          <h3>Payload QRIS</h3>
          {payload ? (
            <div className="stack-small">
              <PrototypeQrisCard payload={payload} />
              <textarea className="app-textarea" rows={5} value={payload} onChange={e => setPayload(e.target.value)} />
            </div>
          ) : (
            <p className="muted">Belum ada payload aktif. Merchant bisa membuat QRIS baru, customer bisa menempel payload dari merchant.</p>
          )}
        </article>

        {canCreate && (
          <article className="surface-card">
            <h3>Merchant collect</h3>
            <div className="stack-small">
              <label className="app-label">
                <span>Mode</span>
                <select className="app-input" value={mode} onChange={e => setMode(e.target.value as 'static' | 'dynamic')}>
                  <option value="dynamic">Dynamic QR</option>
                  <option value="static">Static QR</option>
                </select>
              </label>
              <label className="app-label">
                <span>Dompet merchant</span>
                <select className="app-input" value={merchantWalletId} onChange={e => setMerchantWalletId(e.target.value)}>
                  <option value="">Pilih dompet</option>
                  {wallets.map(wallet => <option key={wallet.wallet_id} value={wallet.wallet_id}>{wallet.wallet_id} · {wallet.participant_id}</option>)}
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
              <button className="primary-button" onClick={handleCreate}>Buat QRIS</button>
            </div>
          </article>
        )}
      </section>

      <section className="panel-grid">
        <article className="surface-card">
          <h3>Customer pay</h3>
          <div className="stack-small">
            <button className="secondary-button" onClick={handleResolve}>Resolve payload</button>
            {resolved && (
              <div className="stack-small">
                <div className="context-row"><span>Merchant</span><strong>{resolved.merchant_id}</strong></div>
                <div className="context-row"><span>Mode</span><strong>{resolved.mode}</strong></div>
                <div className="context-row"><span>Status</span><strong>{resolved.status}</strong></div>
                <div className="context-row"><span>Reference</span><strong>{resolved.reference_id}</strong></div>
                <label className="app-label">
                  <span>Dompet payer</span>
                  <select className="app-input" value={payerWalletId} onChange={e => setPayerWalletId(e.target.value)}>
                    <option value="">Pilih dompet</option>
                    {wallets.map(wallet => <option key={wallet.wallet_id} value={wallet.wallet_id}>{wallet.wallet_id} · {wallet.participant_id}</option>)}
                  </select>
                </label>
                {resolved.mode === 'static' ? (
                  <label className="app-label">
                    <span>Amount</span>
                    <input className="app-input" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
                  </label>
                ) : (
                  <div className="context-row"><span>Amount</span><strong>{fmt(resolved.amount)}</strong></div>
                )}
                {canPay && <button className="primary-button" onClick={handlePay}>Bayar QRIS</button>}
              </div>
            )}
            {payResult && <div className="banner success">Tx {payResult.tx_id ?? '—'} · Ref {payResult.reference_id}</div>}
          </div>
        </article>

        {canCreate && (
          <article className="surface-card">
            <h3>Intent terbaru</h3>
            <div className="stack-small">
              {intents.length === 0 && <p className="muted">Belum ada QRIS intent tersimpan.</p>}
              {intents.map(intent => (
                <div key={intent.intent_id} className="intent-card">
                  <div className="context-row">
                    <strong>{intent.label || intent.intent_id}</strong>
                    <span className="pill">{intent.status}</span>
                  </div>
                  <div className="muted">{intent.mode} · {intent.amount > 0 ? fmt(intent.amount) : 'nominal diisi payer'}</div>
                  <div className="muted">{intent.reference_id}</div>
                  <div className="intent-actions">
                    <button className="secondary-button" onClick={() => { setPayload(intent.payload ?? ''); setResolved(intent) }}>Pakai</button>
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
