import Transfer from './Transfer'
import QrisPayments from './QrisPayments'
import type { DemoPrefill } from './DemoPanel'

interface Props {
  role: string
  selectedWallet: string
  prefill?: DemoPrefill
  onPrefillConsumed?: () => void
}

export default function Pay({ role, selectedWallet, prefill, onPrefillConsumed }: Props) {
  const retail = role === 'kyc_verified' || role === 'merchant' || role === 'authenticated'
  if (!retail) return <Transfer role={role} selectedWallet={selectedWallet} prefill={prefill} onPrefillConsumed={onPrefillConsumed} />

  return (
    <div className="workspace-stack">
      <section className="workspace-heading">
        <div>
          <div className="eyebrow">Pay</div>
          <h2>Send Digital Rupiah</h2>
          <p className="muted">Use a Wallet ID, saved contact, or QRIS.</p>
        </div>
      </section>
      <Transfer role={role} selectedWallet={selectedWallet} prefill={prefill} onPrefillConsumed={onPrefillConsumed} />
      {(role === 'kyc_verified' || role === 'merchant') && <QrisPayments role={role} selectedWallet={selectedWallet} />}
    </div>
  )
}
