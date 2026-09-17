export function formatRupiah(value: string) {
  return 'Rp ' + BigInt(value || '0').toLocaleString('id-ID')
}

export function sumRupiah(values: string[]) {
  return values.reduce((total, value) => total + BigInt(value || '0'), 0n).toString()
}
