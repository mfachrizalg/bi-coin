const API_BASE = import.meta.env.VITE_API_URL || '/api'

let currentToken = ''
let unauthorizedHandler: (() => void) | undefined
export function hasAccessToken() {
  return Boolean(currentToken)
}

export function setAccessToken(token: string) {
  currentToken = token
}

export function onUnauthorized(handler: () => void) {
  unauthorizedHandler = handler
  return () => { unauthorizedHandler = undefined }
}

export interface Wallet {
  wallet_id: string
  owner_id: string
  participant_id: string
  wallet_type: string
  tier: string
  balance: string
  frozen: boolean
  daily_spent: string
  monthly_spent: string
  monthly_received: string
  created_at: string
  updated_at: string
}

export interface Participant {
  participant_id: string
  name: string
  domain: string
  account_id: string
  participant_type: string
  compliance_status: string
  reserve_balance: string
  status: string
  created_at: string
  updated_at: string
}

export interface KycProfile {
  profile_id: string
  subject_type: string
  subject_id: string
  provider_case_id: string
  document_hashes: string[]
  status: string
  risk_level: string
  due_diligence_level: string
  senior_approval: boolean
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  role: string
}

export interface MeResponse {
  username: string
  role: string
}

export type PaymentContactType = 'retail_customer' | 'merchant'

export interface PaymentContact {
  id: string
  label: string
  wallet_id: string
  recipient_type: PaymentContactType
  created_at: string
  updated_at: string
}

export interface PaymentContactInput {
  label: string
  wallet_id: string
  recipient_type: PaymentContactType
}

export interface SystemLimit {
  scope: string
  value: string
  set_at: string
}

export interface Balance {
  participant_id: string
  wallet_id: string
  balance: string
  reserve_balance: string
}

export interface TransactionRecord {
  tx_id: string
  participant_id: string
  counterparty_id: string
  amount: string
  transaction_type: string
  status: string
  reference_id?: string
  timestamp: string
}

export interface QrisIntent {
  intent_id: string
  mode: 'static' | 'dynamic'
  merchant_id: string
  merchant_wallet_id: string
  amount: string
  status: 'active' | 'pending' | 'paid' | 'expired' | 'cancelled'
  label?: string
  payload?: string
  reference_id: string
  expires_at?: string
  paid_by_wallet_id?: string
  paid_at?: string
  created_at: string
  updated_at: string
}

export interface QrisPayResult {
  status: string
  tx_id?: string
  intent_id: string
  reference_id: string
}

export interface TopologyNode {
  id: string
  name: string
  type: string
  role: string
  domain: string
}

export interface Topology {
  nodes: TopologyNode[]
  links: { source: string; target: string; type: string }[]
}

export interface MetricsReport {
  total_participants: number
  active_wallets: number
  total_supply: string
  total_transfers: number
  generated_at: string
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (currentToken) headers['Authorization'] = `Bearer ${currentToken}`
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...headers, ...(options?.headers ?? {}) },
  })
  if (res.status === 401) {
    setAccessToken('')
    unauthorizedHandler?.()
  }
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(formatApiError(err, res.status, res.statusText))
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export function formatApiError(body: unknown, status = 0, statusText = '') {
  if (body && typeof body === 'object') {
    const record = body as { message?: unknown; detail?: unknown }
    if (typeof record.message === 'string' && record.message.trim()) return record.message
    if (Array.isArray(record.detail)) {
      const first = record.detail[0]
      if (first && typeof first === 'object' && typeof (first as { msg?: unknown }).msg === 'string') {
        return (first as { msg: string }).msg
      }
      if (typeof first === 'string') return first
    }
  }
  if (status >= 500) return 'The service is unavailable. Try again.'
  return statusText || 'The request could not be completed.'
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'The request could not be completed.'
}

export function getHealth() { return request<{ status: string }>('/health') }
export function getTopology() { return request<Topology>('/network/topology') }
export function login(data: { username: string; password: string }) {
  return request<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) })
}
export function getMe() { return request<MeResponse>('/auth/me') }

export function createWallet(data: { owner_id: string }) {
  return request<Wallet>('/wallets', { method: 'POST', body: JSON.stringify(data) })
}
export function getWallets(participantId?: string) {
  const qs = participantId ? `?participant_id=${participantId}` : ''
  return request<Wallet[]>(`/wallets${qs}`)
}

export function listPaymentContacts() {
  return request<PaymentContact[]>('/payment-contacts')
}

export function createPaymentContact(data: PaymentContactInput) {
  return request<PaymentContact>('/payment-contacts', { method: 'POST', body: JSON.stringify(data) })
}

export function updatePaymentContact(contactId: string, data: PaymentContactInput) {
  return request<PaymentContact>(`/payment-contacts/${encodeURIComponent(contactId)}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deletePaymentContact(contactId: string) {
  return request<void>(`/payment-contacts/${encodeURIComponent(contactId)}`, { method: 'DELETE' })
}

export function submitParticipant(data: any) {
  return request('/participants', { method: 'POST', body: JSON.stringify(data) })
}
export function approveParticipant(participantId: string) {
  return request(`/participants/${participantId}/approve`, { method: 'POST' })
}
export function freezeParticipant(participantId: string) {
  return request(`/participants/${participantId}/freeze`, { method: 'POST' })
}
export function unfreezeParticipant(participantId: string) {
  return request(`/participants/${participantId}/unfreeze`, { method: 'POST' })
}

export function submitKycProfile(data: any) {
  return request('/kyc/profiles', { method: 'POST', body: JSON.stringify(data) })
}
export function refreshKycProfile(profileId: string, data: any) {
  return request(`/kyc/profiles/${profileId}/refresh`, { method: 'POST', body: JSON.stringify(data) })
}
export function getKycProfile(profileId: string) {
  return request<KycProfile>(`/kyc/profiles/${profileId}`)
}

export function createRetailCustomer(data: any) {
  return request('/retail/customers', { method: 'POST', body: JSON.stringify(data) })
}
export function listRetailCustomers() {
  return request<any[]>('/retail/customers')
}

export function setLimit(data: { scope: string; value: string }) {
  return request('/limits', { method: 'POST', body: JSON.stringify(data) })
}
export function listLimits(scope?: string) {
  const qs = scope ? `?scope=${scope}` : ''
  return request<SystemLimit[]>(`/limits${qs}`)
}

export function requestIssuance(data: { amount: string }) {
  return request('/issuance-requests', { method: 'POST', body: JSON.stringify(data) })
}
export function requestRedemption(data: { participant_id: string; amount: string }) {
  return request('/redemption-requests', { method: 'POST', body: JSON.stringify(data) })
}
export function submitTransfer(data: { sender_id: string; receiver_id: string; amount: string }, idempotencyKey: string) {
  return request('/transfers', {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(data),
  })
}
export function createQrisIntent(data: {
  mode: 'static' | 'dynamic'
  merchant_wallet_id: string
  merchant_id?: string
  amount?: string
  label?: string
  expires_at?: string
}) {
  return request<QrisIntent>('/qris/intents', { method: 'POST', body: JSON.stringify(data) })
}
export function listQrisIntents(merchantId?: string) {
  const qs = merchantId ? `?merchant_id=${merchantId}` : ''
  return request<QrisIntent[]>(`/qris/intents${qs}`)
}
export function getQrisIntent(intentId: string) {
  return request<QrisIntent>(`/qris/intents/${intentId}`)
}
export function cancelQrisIntent(intentId: string) {
  return request<{ status: string }>(`/qris/intents/${intentId}/cancel`, { method: 'POST' })
}
export function resolveQrisPayload(payload: string) {
  return request<QrisIntent>('/qris/resolve', { method: 'POST', body: JSON.stringify({ payload }) })
}
export function payQris(data: { payload: string; payer_wallet_id: string; amount?: string }, idempotencyKey: string) {
	return request<QrisPayResult>('/qris/pay', {
		method: 'POST',
		headers: { 'Idempotency-Key': idempotencyKey },
		body: JSON.stringify(data),
	})
}
export function getBalances() {
  return request<Balance[]>('/balances')
}

export function getTransactions(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : ''
  return request<TransactionRecord[]>(`/transactions${qs}`)
}
export function getSupervisionEvents() {
  return request<any[]>('/supervision/events')
}
export function getReconciliationReport() {
  return request<any>('/reports/reconciliation')
}
export function getMetrics() {
  return request<MetricsReport>('/reports/metrics')
}

export function initLedger() {
  return request('/ledger/init', { method: 'POST' })
}

export function distributeToParticipant(data: {
  receiver_participant_id: string
  amount: string
}, idempotencyKey: string) {
	return request<{ status: string }>('/distribute', {
		method: 'POST',
		headers: { 'Idempotency-Key': idempotencyKey },
		body: JSON.stringify(data),
	})
}

export function listParticipants() {
  return request<Participant[]>('/participants')
}

export function getParticipant(participantId: string) {
  return request<Participant>(`/participants/${participantId}`)
}

// AuditLog support
export interface AuditEntry {
  txId: string
  operation: string
  amount: string
  referenceId?: string
  counterpartyId: string
  timestamp: string
}

export async function getAuditLog(walletID: string): Promise<AuditEntry[]> {
  const txs = await request<TransactionRecord[]>(`/transactions?participant_id=${walletID}`)
  return (txs ?? []).map(t => ({
    txId: t.tx_id,
    operation: t.transaction_type,
    amount: t.amount,
    referenceId: t.reference_id,
    counterpartyId: t.counterparty_id,
    timestamp: t.timestamp,
  }))
}

// Tier limits support
export interface TierLimit {
  tier: string
  maxBalance: string
  dailyTxLimit: string
  monthlyTxLimit: string
  monthlyIncomingLimit: string
  perTxLimit: string
}

const TIER_LIMIT_DEFAULTS: Record<string, TierLimit> = {
  BASIC:    { tier: 'BASIC',    maxBalance: '2000000',   dailyTxLimit: '500000',    monthlyTxLimit: '5000000',   monthlyIncomingLimit: '20000000',  perTxLimit: '250000' },
  STANDARD: { tier: 'STANDARD', maxBalance: '20000000',  dailyTxLimit: '10000000', monthlyTxLimit: '40000000',  monthlyIncomingLimit: '40000000',  perTxLimit: '2500000' },
  MERCHANT: { tier: 'MERCHANT', maxBalance: '200000000', dailyTxLimit: '50000000', monthlyTxLimit: '500000000', monthlyIncomingLimit: '500000000', perTxLimit: '10000000' },
}

export async function getTierLimit(tier: string): Promise<TierLimit> {
  return TIER_LIMIT_DEFAULTS[tier] ?? TIER_LIMIT_DEFAULTS['BASIC']
}

export async function setTierLimit(_limit: TierLimit): Promise<void> {
  // Tier limits are managed via chaincode SetTierLimit; backend REST doesn't expose per-tier endpoint
}

// Total supply
export async function getTotalSupply(): Promise<{ totalSupply: string }> {
  const m = await request<MetricsReport>('/reports/metrics')
  return { totalSupply: m.total_supply }
}

// Transfer alias matching Transfer.tsx usage
export function transfer(data: { senderId: string; receiverId: string; amount: string }, idempotencyKey: string) {
	return submitTransfer({ sender_id: data.senderId, receiver_id: data.receiverId, amount: data.amount }, idempotencyKey)
}
