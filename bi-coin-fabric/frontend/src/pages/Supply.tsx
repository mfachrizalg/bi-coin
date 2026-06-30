import { useEffect, useState } from 'react'
import { getTotalSupply } from '../lib/api'

export default function Supply() {
  const [supply, setSupply] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    getTotalSupply().then(s => setSupply(s.totalSupply)).catch(e => setError(e.message))
  }, [])

  return (
    <div>
      <h2 style={{ marginBottom: 20, fontSize: '1.4rem' }}>Total Digital Rupiah Beredar</h2>
      {error && (
        <div style={{ padding: '10px 14px', marginBottom: 16, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#dc2626', fontSize: '1rem' }}>
          {error}
        </div>
      )}
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', fontVariantNumeric: 'tabular-nums' }}>
        Rp {supply.toLocaleString('id-ID')}
      </div>
      <div style={{ marginTop: 8, fontSize: '1rem', color: '#6b7280' }}>
        Saldo total di seluruh jaringan (5 peer orgs)
      </div>
    </div>
  )
}
