import { useEffect, useState } from 'react'
import { formatRupiah } from '../lib/money'

export const PAYMENT_RECEIPTS_KEY = 'garuda-payment-receipts'

export interface PaymentReceipt {
  id: string
  operation: string
  amount: string
  recipient: string
  reference?: string
  txId?: string
  createdAt: string
}

export function recordPaymentReceipt(receipt: PaymentReceipt) {
  if (typeof window === 'undefined') return
  try {
    const current = JSON.parse(window.sessionStorage.getItem(PAYMENT_RECEIPTS_KEY) ?? '[]') as PaymentReceipt[]
    window.sessionStorage.setItem(PAYMENT_RECEIPTS_KEY, JSON.stringify([receipt, ...current].slice(0, 20)))
  } catch { /* private browsing */ }
}

export default function Activity() {
  const [receipts, setReceipts] = useState<PaymentReceipt[]>([])

  useEffect(() => {
    try { setReceipts(JSON.parse(window.sessionStorage.getItem(PAYMENT_RECEIPTS_KEY) ?? '[]') as PaymentReceipt[]) } catch { setReceipts([]) }
  }, [])

  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">Activity</div>
          <h2>Session receipts</h2>
          <p className="muted">This list supports the browser demo. The official audit log remains in the backend.</p>
        </div>
      </section>
      <section className="surface-card">
        {receipts.length === 0 ? <p className="muted">No payments in this session.</p> : (
          <div className="stack-small">
            {receipts.map(receipt => (
              <article className="receipt-card" key={receipt.id}>
                <div className="context-row"><strong>{receipt.operation}</strong><span className="pill">Completed</span></div>
                <div className="context-row"><span>Amount</span><strong>{formatRupiah(receipt.amount)}</strong></div>
                <div className="muted">Recipient: {receipt.recipient}</div>
                {receipt.txId && <div className="muted">Tx: {receipt.txId}</div>}
                {receipt.reference && <div className="muted">Reference: {receipt.reference}</div>}
                <time className="field-help" dateTime={receipt.createdAt}>{new Date(receipt.createdAt).toLocaleString('en-ID')}</time>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
