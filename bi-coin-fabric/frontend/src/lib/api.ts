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

export const studyRestrictionReasonOptions = [
  { value: 'dttot', label: 'DTTOT' },
  { value: 'authority_order', label: 'Authority order' },
  { value: 'internal_review', label: 'Internal review' },
] as const

export type StudyRestrictionReason = typeof studyRestrictionReasonOptions[number]['value']

export interface StudySubjectView {
  subject_id: string
  category: 'retail' | 'merchant' | 'business'
  status: string
  risk_level: string
  pep: boolean
  protected: boolean
  restricted: boolean
  restriction_reason: string
  reviewer_id: string
  senior_id: string
  authority_evidence_ref: string
  limits: { per_transaction: string; daily: string; monthly: string; holdings: string }
  representatives: string[]
  beneficial_owner_refs: string[]
}

export interface StudyLimitsInput {
  per_transaction: string
  daily: string
  monthly: string
  holdings: string
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
export function login(data: { username: string; password: string }) {
  return request<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) })
}
export function getMe() { return request<MeResponse>('/auth/me') }

function studyPost<T>(path: string, data?: unknown, idempotencyKey?: string) {
  return request<T>(path, {
    method: 'POST',
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
    ...(data === undefined ? {} : { body: JSON.stringify(data) }),
  })
}

export function getStudyIdentity() { return request<string>('/identities/me') }
export function createStudySubject(data: { subject_id: string; category: StudySubjectView['category'] }) {
  return studyPost<{ status: string }>('/subjects', data)
}
export function openStudyWallet(data: { subject_id: string }) {
  return studyPost<{ status: string }>('/customer-wallets', data)
}
export function getStudyBalance(subjectID: string) {
  return request<string>('/customer-wallets/' + encodeURIComponent(subjectID) + '/balance')
}
export function transferStudyFunds(data: { from: string; to: string; amount: string }, idempotencyKey: string) {
  return studyPost<unknown>('/retail-transfers', data, idempotencyKey)
}
export function getStudySubject(subjectID: string) {
  return request<StudySubjectView>('/subjects/' + encodeURIComponent(subjectID))
}
export function protectStudySubject(subjectID: string) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/endorsement-policies')
}
export function recordStudyReview(subjectID: string, data: { risk_level: 'standard' | 'high'; pep: boolean }) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/reviews', data)
}
export function setStudyLimits(subjectID: string, data: StudyLimitsInput) {
  return request<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/limits', {
    method: 'PUT', body: JSON.stringify(data),
  })
}
export function setStudyBusinessAuthority(subjectID: string, data: { representatives: string[]; beneficial_owner_refs: string[] }) {
  return request<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/business-authority', {
    method: 'PUT', body: JSON.stringify(data),
  })
}
export function decideStudySubject(subjectID: string, approved: boolean) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/decisions', { approved })
}
export function restrictSubject(subjectID: string, reason_code: StudyRestrictionReason) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/restrictions', { reason_code })
}
export function requestSubjectRelease(subjectID: string, authority_evidence_ref: string) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/restriction-release-requests', { authority_evidence_ref })
}
export function approveSubjectRelease(subjectID: string) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/restriction-release-decisions')
}
export type StudyStaffRole = 'kyc_reviewer' | 'senior_approver' | 'compliance_officer'
export function createStudyStaff(clientID: string) {
  return studyPost<{ status: string }>('/staff', { client_id: clientID })
}
export function protectStudyStaff(clientID: string) {
  return studyPost<{ status: string }>('/staff/' + encodeURIComponent(clientID) + '/endorsement-policies')
}
export function setStudyStaffRole(clientID: string, role: StudyStaffRole) {
  return request<{ status: string }>('/staff/' + encodeURIComponent(clientID) + '/role', {
    method: 'PUT', body: JSON.stringify({ role }),
  })
}
export function convertStudyToRetail(data: { distributor_id: string; amount: string }, idempotencyKey: string) {
  return studyPost<unknown>('/conversions', data, idempotencyKey)
}
export function fundStudyWallet(data: { subject_id: string; distributor_id: string; amount: string }, idempotencyKey: string) {
  return studyPost<unknown>('/wallet-fundings', data, idempotencyKey)
}
export function initializeStudyMonetary() {
  return studyPost<{ status: string }>('/monetary-initializations')
}
export type StudyBankKind = 'wholesale' | 'retail'
export function registerStudyDistributor(data: { distributor_id: string; kind: StudyBankKind; admission_ref: string }) {
  return studyPost<{ status: string }>('/distributors', data)
}
export function issueStudyRupiah(data: { distributor_id: string; amount: string }, idempotencyKey: string) {
  return studyPost<{ status: string }>('/issuances', data, idempotencyKey)
}
export function transferStudyInterbank(data: { from_distributor_id: string; to_distributor_id: string; amount: string }, idempotencyKey: string) {
  return studyPost<unknown>('/interbank-transfers', data, idempotencyKey)
}
export function redeemStudyReserve(data: { distributor_id: string; amount: string }, idempotencyKey: string) {
  return studyPost<{ status: string }>('/reserve-redemptions', data, idempotencyKey)
}
