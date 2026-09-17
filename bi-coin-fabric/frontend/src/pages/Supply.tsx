import { useEffect, useState } from 'react'
import { getErrorMessage, getTotalSupply } from '../lib/api'
import { formatRupiah } from '../lib/money'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Supply() {
  const [supply, setSupply] = useState('0')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getTotalSupply().then(s => setSupply(s.totalSupply)).catch(e => setError(getErrorMessage(e))).finally(() => setLoading(false))
  }, [])

  return (
    <div className="workspace-stack supply-page">
      <h2>Circulating Digital Rupiah</h2>
      {error && (
        <div className="banner error" role="alert">
          {error}
        </div>
      )}
      {loading ? <LoadingSkeleton kind="form" label="Loading circulating supply" rows={1} /> : <>
        <div className="supply-value">{formatRupiah(supply)}</div>
        <div className="field-help">Total balance across five peer organizations.</div>
      </>}
    </div>
  )
}
