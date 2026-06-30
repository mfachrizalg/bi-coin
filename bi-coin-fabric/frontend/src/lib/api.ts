const API_BASE = 'http://localhost:8080'

let currentToken = sessionStorage.getItem('access_token') ?? ''
export function setAccessToken(token: string) {
  currentToken = token
  if (token) sessionStorage.setItem('access_token', token)
  else sessionStorage.removeItem('access_token')
}

export interface Wallet {
  wallet_id: string
  participant_id: string
  wallet_type: string
  tier: string
  balance: number
  frozen: boolean
  daily_spent: number
  monthly_spent: number
  monthly_received: number
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
  reserve_balance: number
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

export interface SystemLimit {
  scope: string
  value: number
  set_at: string
}

export interface Balance {
  participant_id: string
  wallet_id: string
  balance: number
  reserve_balance: number
}

export interface TransactionRecord {
  tx_id: string
  participant_id: string
  counterparty_id: string
  amount: number
  transaction_type: string
  status: string
  timestamp: string
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
  total_supply: number
  total_transfers: number
  generated_at: string
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (currentToken) headers['Authorization'] = `Bearer ${currentToken}`
  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || err.detail?.[0]?.msg || res.statusText)
  }
  return res.json()
}

export function getHealth() { return request<{ status: string }>('/health') }
export function getTopology() { return request<Topology>('/network/topology') }
export function login(data: { username: string; password: string }) {
  return request<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) })
}
export function getMe() { return request<MeResponse>('/auth/me') }

export function createWallet(data: { participant_id: string; tier?: string }) {
  return request<Wallet>('/wallets', { method: 'POST', body: JSON.stringify(data) })
}
export function getWallets(participantId?: string) {
  const qs = participantId ? `?participant_id=${participantId}` : ''
  return request<Wallet[]>(`/wallets${qs}`)
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

export function requestIssuance(data: { participant_id: string; amount: string }) {
  return request('/issuance-requests', { method: 'POST', body: JSON.stringify(data) })
}
export function requestRedemption(data: { participant_id: string; amount: string }) {
  return request('/redemption-requests', { method: 'POST', body: JSON.stringify(data) })
}
export function submitTransfer(data: { sender_id: string; receiver_id: string; amount: string }) {
  return request('/transfers', { method: 'POST', body: JSON.stringify(data) })
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
  sender_participant_id: string
  receiver_participant_id: string
  amount: number
}) {
  return request<{ status: string }>('/distribute', { method: 'POST', body: JSON.stringify(data) })
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
  amount: number
  timestamp: string
}

export async function getAuditLog(walletID: string): Promise<AuditEntry[]> {
  const txs = await request<TransactionRecord[]>(`/transactions?participant_id=${walletID}`)
  return (txs ?? []).map(t => ({
    txId: t.tx_id,
    operation: t.transaction_type,
    amount: t.amount,
    timestamp: t.timestamp,
  }))
}

// Tier limits support
export interface TierLimit {
  tier: string
  maxBalance: number
  dailyTxLimit: number
  monthlyTxLimit: number
  monthlyIncomingLimit: number
  perTxLimit: number
}

const TIER_LIMIT_DEFAULTS: Record<string, TierLimit> = {
  BASIC:    { tier: 'BASIC',    maxBalance: 2_000_000,   dailyTxLimit: 500_000,    monthlyTxLimit: 5_000_000,   monthlyIncomingLimit: 20_000_000,  perTxLimit: 250_000 },
  STANDARD: { tier: 'STANDARD', maxBalance: 20_000_000,  dailyTxLimit: 10_000_000, monthlyTxLimit: 40_000_000,  monthlyIncomingLimit: 40_000_000,  perTxLimit: 2_500_000 },
  MERCHANT: { tier: 'MERCHANT', maxBalance: 200_000_000, dailyTxLimit: 50_000_000, monthlyTxLimit: 500_000_000, monthlyIncomingLimit: 500_000_000, perTxLimit: 10_000_000 },
}

export async function getTierLimit(tier: string): Promise<TierLimit> {
  return TIER_LIMIT_DEFAULTS[tier] ?? TIER_LIMIT_DEFAULTS['BASIC']
}

export async function setTierLimit(_limit: TierLimit): Promise<void> {
  // Tier limits are managed via chaincode SetTierLimit; backend REST doesn't expose per-tier endpoint
}

// Total supply
export async function getTotalSupply(): Promise<{ totalSupply: number }> {
  const m = await request<MetricsReport>('/reports/metrics')
  return { totalSupply: m.total_supply }
}

// Transfer alias matching Transfer.tsx usage
export function transfer(data: { senderId: string; receiverId: string; amount: number }) {
  return submitTransfer({ sender_id: data.senderId, receiver_id: data.receiverId, amount: String(data.amount) })
}
