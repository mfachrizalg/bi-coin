import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import {
  compileFrontendModule,
  createRenderer,
  jsonResponse,
} from './runtime.mjs'

const apiSource = fs.readFileSync(new URL('../src/lib/api.ts', import.meta.url), 'utf8')
const appSource = fs.readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const stylesSource = fs.readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
const studySource = fs.readFileSync(new URL('../src/pages/StudyConsole.tsx', import.meta.url), 'utf8')
const skeletonSource = fs.readFileSync(new URL('../src/components/LoadingSkeleton.tsx', import.meta.url), 'utf8')
globalThis.__TEST_IMPORT_META_ENV__ = {}

test('access tokens stay in memory and unauthorized responses clear them', () => {
  assert.match(apiSource, /let currentToken = ''/)
  assert.doesNotMatch(apiSource, /sessionStorage\.(getItem|setItem|removeItem).*access_token/)
  assert.match(apiSource, /res\.status === 401/)
})

test('responsive and accessibility foundations are present', () => {
  assert.doesNotMatch(stylesSource, /min-width:\s*1280px/)
  assert.match(stylesSource, /@media\s*\(max-width:/)
  assert.doesNotMatch(stylesSource, /transition\s*:/)
  assert.doesNotMatch(stylesSource, /animation\s*:/)
  assert.doesNotMatch(stylesSource, /gradient/)
  assert.match(stylesSource, /button:focus-visible/)
  assert.match(appSource, /aria-current=/)
  assert.match(appSource, /<nav className="nav-tabs"/)
})

test('login is a form-only surface and the old demo identity contract is gone', () => {
  assert.match(appSource, /<h1 id="sign-in-title">Sign in<\/h1>/)
  assert.match(appSource, /className="auth-form"/)
  assert.match(appSource, /Username/)
  assert.match(appSource, /Password/)
  assert.doesNotMatch(appSource, /auth-hero|demo-credentials|credential-card|getDemoIdentities|VITE_DEMO_IDENTITIES/)
  assert.doesNotMatch(stylesSource, /auth-hero|demo-credentials|credential-card|nav-rail/)
})

test('data surfaces use static accessible loading placeholders', () => {
  assert.match(skeletonSource, /role="status"/)
  assert.match(skeletonSource, /kind: SkeletonKind/)
})

test('API errors preserve backend text and use an English fallback', async () => {
  const { moduleUrl } = compileFrontendModule('lib/api.ts')
  const api = await import(moduleUrl)
  assert.equal(api.formatApiError({ message: 'wallet frozen' }, 409, 'Conflict'), 'wallet frozen')
  assert.equal(api.formatApiError(null, 500, 'Internal Server Error'), 'The service is unavailable. Try again.')
  assert.equal(api.formatApiError(null, 0, ''), 'The request could not be completed.')
})

test('compliance API preserves authenticated routes, decimal strings, and idempotency keys', async () => {
  const { moduleUrl } = compileFrontendModule('lib/api.ts')
  const api = await import(moduleUrl)
  const calls = []
  const originalFetch = global.fetch
  api.setAccessToken('study-token')
  assert.deepEqual(api.studyRestrictionReasonOptions.map(option => option.value), [
    'dttot', 'authority_order', 'internal_review',
  ])
  global.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options })
    return jsonResponse(String(url).endsWith('/balance') ? '9007199254740993' : { status: 'ok' })
  }
  try {
    assert.equal(await api.getStudyBalance('retail/one'), '9007199254740993')
    await api.createStudySubject({
      legal_name: 'Synthetic Customer', document_type: 'ktp', document_number: 'doc-1',
      address: 'Jl. Contoh 1', birth_place: 'Sleman', birth_date: '2000-01-02', document: new Blob(['x']),
    })
    await api.setStudyLimits('retail/one', {
      per_transaction: '9007199254740993', daily: '9007199254740994', monthly: '9007199254740995', holdings: '9007199254740996',
    })
    await api.recordStudyReview('retail/one', { dttot_result: 'not_listed', low_risk: true, low_risk_reason: 'capped product' })
    await api.transferStudyFunds({ from: 'retail/one', to: 'retail-two', amount: '9007199254740993' }, 'study-transfer-key')
    await api.verifyStudySubject('retail/one', 'ab'.repeat(32))
    await api.closeStudySubject('retail/one', 'identity_doubtful')
    await api.setCddCeilings({ unverified_holdings: '2000000', verified_holdings: '20000000' })
    await api.confirmMonitoringAlert('alert/1')
  } finally {
    api.setAccessToken('')
    global.fetch = originalFetch
  }
  assert.equal(calls[0].url, '/api/customer-wallets/retail%2Fone/balance')
  assert.equal(calls[0].options.headers.Authorization, 'Bearer study-token')
  assert.deepEqual(JSON.parse(calls[2].options.body), {
    per_transaction: '9007199254740993', daily: '9007199254740994', monthly: '9007199254740995', holdings: '9007199254740996',
  })
  assert.equal(calls[1].url, '/api/subjects')
  assert.equal(calls[1].options.body.get('category'), 'retail')
  assert.equal(calls[1].options.body.get('birth_date'), '2000-01-02')
  assert.equal(calls[1].options.body.get('address'), 'Jl. Contoh 1')
  assert.equal(calls[1].options.body.get('birth_place'), 'Sleman')
  assert.equal(calls[2].options.method, 'PUT')
  assert.equal(calls[3].url, '/api/subjects/retail%2Fone/reviews')
  assert.deepEqual(JSON.parse(calls[3].options.body), { dttot_result: 'not_listed', low_risk: true, low_risk_reason: 'capped product' })
  assert.equal(calls[4].options.headers['Idempotency-Key'], 'study-transfer-key')
  assert.equal(calls[5].url, '/api/subjects/retail%2Fone/verifications')
  assert.deepEqual(JSON.parse(calls[5].options.body), { evidence_ref: 'ab'.repeat(32) })
  assert.equal(calls[6].url, '/api/subjects/retail%2Fone/closures')
  assert.deepEqual(JSON.parse(calls[6].options.body), { reason: 'identity_doubtful' })
  assert.equal(calls[7].url, '/api/cdd-ceilings')
  assert.equal(calls[7].options.method, 'PUT')
  assert.deepEqual(JSON.parse(calls[7].options.body), { unverified_holdings: '2000000', verified_holdings: '20000000' })
  assert.equal(calls[8].url, '/api/monitoring-alerts/alert%2F1/confirmations')
})

test('staff API encodes client IDs and sends the selected role', async () => {
  const { moduleUrl } = compileFrontendModule('lib/api.ts')
  const api = await import(moduleUrl)
  const calls = []
  const originalFetch = global.fetch
  api.setAccessToken('staff-token')
  global.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options })
    return jsonResponse({ status: 'ok' })
  }
  try {
    await api.createStudyStaff('x509::client/1')
    await api.protectStudyStaff('x509::client/1')
    await api.setStudyStaffRole('x509::client/1', 'compliance_officer')
  } finally {
    api.setAccessToken('')
    global.fetch = originalFetch
  }
  assert.equal(calls[0].url, '/api/staff')
  assert.deepEqual(JSON.parse(calls[0].options.body), { client_id: 'x509::client/1' })
  assert.equal(calls[1].url, '/api/staff/x509%3A%3Aclient%2F1/endorsement-policies')
  assert.equal(calls[2].url, '/api/staff/x509%3A%3Aclient%2F1/role')
  assert.equal(calls[2].options.method, 'PUT')
  assert.deepEqual(JSON.parse(calls[2].options.body), { role: 'compliance_officer' })
})

test('organization function tabs show only the signed-in organization actions', async () => {
  const { moduleUrl, hooksModuleUrl } = compileFrontendModule('pages/StudyConsole.tsx')
  const [{ default: StudyConsole }, hooksModule] = await Promise.all([import(moduleUrl), import(hooksModuleUrl)])
  const expandedText = node => {
    if (node == null || typeof node === 'boolean') return ''
    if (Array.isArray(node)) return node.map(expandedText).join('')
    if (typeof node === 'string' || typeof node === 'number') return String(node)
    if (typeof node.type === 'function') return expandedText(node.type(node.props))
    return expandedText(node.props?.children)
  }
  const validator = createRenderer(hooksModule, StudyConsole, { role: 'auditor', section: 'study_audit' })
  const validatorText = expandedText(validator.render())
  assert.match(validatorText, /ValidatorMSP/)
  assert.doesNotMatch(validatorText, /Restrict subject|Transfer rupiah|Issuance/)

  const retail = createRenderer(hooksModule, StudyConsole, { role: 'authenticated', section: 'study_identity' })
  const retailText = expandedText(retail.render())
  assert.match(retailText, /Create pending subject/)
  assert.match(retailText, /Address/)
  assert.match(retailText, /Birth place/)
  assert.match(retailText, /Birth date/)
  assert.doesNotMatch(retailText, /Merchant|Business/)
  assert.doesNotMatch(retailText, /Transfer rupiah|Set limits|Convert to retail float/)
  const unverifiedWallet = createRenderer(hooksModule, StudyConsole, { role: 'authenticated', section: 'study_wallet' })
  assert.match(expandedText(unverifiedWallet.render()), /cannot access this function/)
  const retailTransfer = createRenderer(hooksModule, StudyConsole, { role: 'kyc_verified', section: 'study_transfer' })
  assert.match(expandedText(retailTransfer.render()), /Transfer rupiah/)

  const distributor = createRenderer(hooksModule, StudyConsole, { role: 'retail_bank', section: 'study_approval' })
  const approvalText = expandedText(distributor.render())
  assert.match(approvalText, /DistributorMSP/)
  assert.match(approvalText, /Record review/)
  assert.match(approvalText, /DTTOT result/)
  assert.match(approvalText, /Low-risk reason/)
  assert.match(approvalText, /Verify subject/)
  assert.match(approvalText, /Update subject/)
  assert.match(approvalText, /Close subject/)
  assert.doesNotMatch(approvalText, /Business authority|Restrict subject|Convert to retail float/)
  const compliance = createRenderer(hooksModule, StudyConsole, { role: 'retail_bank', section: 'study_compliance' })
  const complianceText = expandedText(compliance.render())
  assert.match(complianceText, /Load alerts/)
  assert.match(complianceText, /Revoke low-risk/)
  assert.doesNotMatch(complianceText, /Load register/)
  const biCompliance = createRenderer(hooksModule, StudyConsole, { role: 'bank_indonesia', section: 'study_compliance' })
  const biComplianceText = expandedText(biCompliance.render())
  assert.match(biComplianceText, /Load alerts/)
  assert.match(biComplianceText, /Load register/)
  assert.doesNotMatch(biComplianceText, /Revoke low-risk/)
  const ceilings = createRenderer(hooksModule, StudyConsole, { role: 'bank_indonesia', section: 'study_ceilings' })
  assert.match(expandedText(ceilings.render()), /Set ceilings/)
  const centralBank = createRenderer(hooksModule, StudyConsole, { role: 'bank_indonesia', section: 'study_monetary' })
  assert.match(expandedText(centralBank.render()), /CentralBankMSP/)
  assert.match(expandedText(centralBank.render()), /Issuance/)

  const staff = createRenderer(hooksModule, StudyConsole, { role: 'bank_indonesia', section: 'study_staff' })
  const staffText = expandedText(staff.render())
  assert.match(staffText, /Create staff/)
  assert.match(staffText, /Protect staff/)
  assert.match(staffText, /Set role/)
  assert.doesNotMatch(staffText, /Issuance|Transfer rupiah/)
  const restrictions = createRenderer(hooksModule, StudyConsole, { role: 'retail_bank', section: 'study_restrictions' })
  assert.match(expandedText(restrictions.render()), /Restrict subject/)

  const retailFunding = createRenderer(hooksModule, StudyConsole, { role: 'retail_bank', section: 'study_funding' })
  const retailFundingText = expandedText(retailFunding.render())
  assert.doesNotMatch(retailFundingText, /Interbank transfer/)
  assert.match(retailFundingText, /Convert to retail float/)
  assert.match(retailFundingText, /Wallet funding/)

  assert.doesNotMatch(appSource, /Controls study/)
  assert.match(appSource, /study_identity: \{ label: 'Subject onboarding' \}/)
  assert.match(appSource, /study_audit: \{ label: 'Controls audit' \}/)
  assert.match(appSource, /startsWith\('study_'/)
  assert.match(appSource, /bank_indonesia: \{ label: 'Bank Indonesia', shell: 'institutional', tabs: \['study_staff', 'study_ceilings', 'study_monetary', 'study_compliance'\] \}/)
  assert.match(appSource, /auditor: \{ label: 'Auditor', shell: 'institutional', tabs: \['study_audit', 'study_compliance'\] \}/)
  assert.match(appSource, /retail_bank: \{ label: 'Retail Bank', shell: 'institutional', tabs: \['study_approval', 'study_restrictions', 'study_funding', 'study_compliance'\] \}/)
  assert.doesNotMatch(appSource, /merchant|Merchant|study_business/)
  assert.doesNotMatch(appSource, /wholesale_bank|Wholesale Bank/)
  assert.match(appSource, /study_funding: \{ label: 'Reserve and float' \}/)
  assert.match(appSource, /has no workspace in the demo/)
  assert.doesNotMatch(appSource, /DemoPanel|Show demo/)
  assert.doesNotMatch(appSource, /validator_bank/)
  assert.match(studySource, /server for each username/)
})
