import { useEffect, useState } from 'react'
import { transfer, getWallets, type Wallet } from '../lib/api'
import type { DemoPrefill } from './DemoPanel'

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

interface Props {
  selectedWallet: string
  prefill?: DemoPrefill
  onPrefillConsumed?: () => void
}

export default function Transfer({ selectedWallet, prefill, onPrefillConsumed }: Props) {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [senderId, setSenderId] = useState(selectedWallet)
  const [receiverId, setReceiverId] = useState('')
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getWallets().then(ws => setWallets(ws ?? [])).catch(() => {})
  }, [])

  useEffect(() => {
    if (selectedWallet) setSenderId(selectedWallet)
  }, [selectedWallet])

  useEffect(() => {
    if (!prefill || prefill.target !== 'transfer') return
    if (prefill.senderId) setSenderId(prefill.senderId)
    if (prefill.receiverId) setReceiverId(prefill.receiverId)
    if (prefill.amount) setAmount(Number(prefill.amount))
    onPrefillConsumed?.()
  }, [prefill])

  const walletLabel = (w: Wallet) =>
    `${w.wallet_id} · ${w.participant_id} · ${fmt(w.balance)}`

  const submit = async () => {
    if (!senderId || !receiverId) { setError('Pilih dompet pengirim dan penerima'); return }
    try {
      setError('')
      setMessage('')
      await transfer({ senderId, receiverId, amount })
      setMessage(`${fmt(amount)} berhasil ditransfer`)
      setAmount(0)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const sel: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontSize: '1rem',
    background: '#fff',
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ marginBottom: 24, fontSize: '1.4rem' }}>Transfer Digital Rupiah</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
            Dompet Pengirim
          </label>
          <select value={senderId} onChange={e => setSenderId(e.target.value)} style={sel}>
            <option value="">— Pilih dompet pengirim —</option>
            {wallets.filter(w => !w.frozen).map(w => (
              <option key={w.wallet_id} value={w.wallet_id}>{walletLabel(w)}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
            Dompet Penerima
          </label>
          <select value={receiverId} onChange={e => setReceiverId(e.target.value)} style={sel}>
            <option value="">— Pilih dompet penerima —</option>
            {wallets.filter(w => !w.frozen && w.wallet_id !== senderId).map(w => (
              <option key={w.wallet_id} value={w.wallet_id}>{walletLabel(w)}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
            Jumlah (IDR)
          </label>
          <input
            type="number"
            placeholder="Jumlah (Rp)"
            value={amount || ''}
            onChange={e => setAmount(Number(e.target.value))}
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: '1rem', boxSizing: 'border-box' }}
          />
        </div>
        <button
          onClick={submit}
          style={{ padding: '14px 0', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer' }}
        >
          Kirim Transfer
        </button>
      </div>
      {message && (
        <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, color: '#15803d', fontSize: '1rem', fontWeight: 600 }}>
          ✓ {message}
        </div>
      )}
      {error && (
        <div style={{ marginTop: 16, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#dc2626', fontSize: '1rem' }}>
          {error}
        </div>
      )}
    </div>
  )
}
