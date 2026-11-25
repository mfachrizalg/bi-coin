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

export const studyDttotResultOptions = [
  { value: 'not_listed', label: 'Not listed' },
  { value: 'listed', label: 'Listed' },
] as const

export type StudyDttotResult = typeof studyDttotResultOptions[number]['value']

export const studyCloseReasonOptions = [
  { value: 'data_missing', label: 'Data missing' },
  { value: 'fictitious', label: 'Fictitious identity' },
  { value: 'identity_doubtful', label: 'Identity doubtful' },
  { value: 'customer_request', label: 'Customer request' },
] as const

export type StudyCloseReason = typeof studyCloseReasonOptions[number]['value']

export interface StudySubjectView {
  subject_id: string
  category: 'retail'
  status: 'pending' | 'rejected' | 'active' | 'closed'
  protected: boolean
  restricted: boolean
  restriction_reason: string
  reviewer_id: string
  authority_evidence_ref: string
  limits: { per_transaction: string; daily: string; monthly: string; holdings: string }
  low_risk: boolean
  low_risk_reason?: string
  approved_at?: number
  verified: boolean
  verified_at?: number
  closed_at?: number
  close_reason?: string
}

export interface StudyReviewInput {
  dttot_result: StudyDttotResult
  low_risk: boolean
  low_risk_reason: string
}

export interface CddCeilings {
  unverified_holdings: string
  verified_holdings: string
}

export interface MonitoringAlert {
  alert_id: string
  subject_id: string
  rule: 'R1' | 'R2' | 'R3'
  detail: string
  status: 'open' | 'confirmed'
  created_at: string
}

export interface SederhanaRegisterRow {
  subject_id: string
  low_risk_reason: string
  approved_at: string | number
}

export interface StudyLimitsInput {
  per_transaction: string
  daily: string
  monthly: string
  holdings: string
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }
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
export function createStudySubject(data: { legal_name: string; document_type: string; document_number: string; address: string; birth_place: string; birth_date: string; document: File }) {
  const form = new FormData()
  form.append('category', 'retail')
  form.append('legal_name', data.legal_name)
  form.append('document_type', data.document_type)
  form.append('document_number', data.document_number)
  form.append('address', data.address)
  form.append('birth_place', data.birth_place)
  form.append('birth_date', data.birth_date)
  form.append('document', data.document)
  return request<{ status: string; subject_id: string }>('/subjects', { method: 'POST', body: form })
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
export function recordStudyReview(subjectID: string, data: StudyReviewInput) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/reviews', data)
}
export function verifyStudySubject(subjectID: string, evidence_ref: string) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/verifications', { evidence_ref })
}
export function updateStudySubject(subjectID: string, data: { document: File; dttot_result: StudyDttotResult }) {
  const form = new FormData()
  form.append('document', data.document)
  form.append('dttot_result', data.dttot_result)
  return request<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/updates', { method: 'POST', body: form })
}
export function closeStudySubject(subjectID: string, reason: StudyCloseReason) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/closures', { reason })
}
export function revokeStudyLowRisk(subjectID: string) {
  return studyPost<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/low-risk-revocations')
}
export function setStudyLimits(subjectID: string, data: StudyLimitsInput) {
  return request<{ status: string }>('/subjects/' + encodeURIComponent(subjectID) + '/limits', {
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
export type StudyStaffRole = 'kyc_reviewer' | 'compliance_officer'
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
export function registerStudyDistributor(data: { distributor_id: string }) {
  return studyPost<{ status: string }>('/distributors', data)
}
export function issueStudyRupiah(data: { distributor_id: string; amount: string }, idempotencyKey: string) {
  return studyPost<{ status: string }>('/issuances', data, idempotencyKey)
}
export function redeemStudyReserve(data: { distributor_id: string; amount: string }, idempotencyKey: string) {
  return studyPost<{ status: string }>('/reserve-redemptions', data, idempotencyKey)
}
export function getCddCeilings() { return request<CddCeilings>('/cdd-ceilings') }
export function setCddCeilings(data: CddCeilings) {
  return request<{ status: string }>('/cdd-ceilings', { method: 'PUT', body: JSON.stringify(data) })
}
export function getSederhanaRegister() { return request<SederhanaRegisterRow[]>('/sederhana-register') }
export function getMonitoringAlerts() { return request<MonitoringAlert[]>('/monitoring-alerts') }
export function confirmMonitoringAlert(alertID: string) {
  return studyPost<{ status: string }>('/monitoring-alerts/' + encodeURIComponent(alertID) + '/confirmations')
}
