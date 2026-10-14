import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import {
  compileFrontendModule,
  createRenderer,
  findAll,
  findByPlaceholder,
  findByText,
  jsonResponse,
  textContent,
} from './runtime.mjs'

const apiSource = fs.readFileSync(new URL('../src/lib/api.ts', import.meta.url), 'utf8')
const transferSource = fs.readFileSync(new URL('../src/pages/Transfer.tsx', import.meta.url), 'utf8')
const participantsSource = fs.readFileSync(new URL('../src/pages/Participants.tsx', import.meta.url), 'utf8')
const appSource = fs.readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const qrisSource = fs.readFileSync(new URL('../src/pages/QrisPayments.tsx', import.meta.url), 'utf8')
const stylesSource = fs.readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
const contactsSource = fs.readFileSync(new URL('../src/pages/Contacts.tsx', import.meta.url), 'utf8')
const studySource = fs.readFileSync(new URL('../src/pages/StudyConsole.tsx', import.meta.url), 'utf8')
const walletSource = fs.readFileSync(new URL('../src/pages/WalletList.tsx', import.meta.url), 'utf8')
const overviewSource = fs.readFileSync(new URL('../src/pages/Overview.tsx', import.meta.url), 'utf8')
const skeletonSource = fs.readFileSync(new URL('../src/components/LoadingSkeleton.tsx', import.meta.url), 'utf8')
globalThis.__TEST_IMPORT_META_ENV__ = {}

test('access tokens stay in memory and unauthorized responses clear them', () => {
  assert.match(apiSource, /let currentToken = ''/)
  assert.doesNotMatch(apiSource, /sessionStorage\.(getItem|setItem|removeItem).*access_token/)
  assert.match(apiSource, /res\.status === 401/)
})

test('transfer requests carry an idempotency key and suppress duplicate submits', () => {
  assert.match(apiSource, /Idempotency-Key/)
  assert.match(transferSource, /useRef/)
  assert.match(transferSource, /disabled=\{submitting\}/)
})

test('issuance targets Treasury and distribution selects only a Custodian', () => {
  assert.match(apiSource, /requestIssuance\(data: \{ amount: string \}, idempotencyKey: string\)/)
  assert.match(apiSource, /requestRedemption\([\s\S]*?idempotencyKey: string/)
  assert.match(apiSource, /submitKycProfile\(data: any, idempotencyKey: string\)/)
  assert.match(apiSource, /receiver_participant_id: string/)
  assert.match(apiSource, /headers: \{ 'Idempotency-Key': idempotencyKey \}/)
  assert.doesNotMatch(participantsSource, /sender_participant_id/)
  assert.match(participantsSource, /Bank Indonesia sends issued Digital Rupiah from Treasury to an active Validator Bank or PJP/)
  assert.match(participantsSource, /can\(role, 'bank_pjp', 'validator_bank', 'pjp', 'bank_indonesia'\)/)
  assert.match(appSource, /validator_bank/)
  assert.match(appSource, /pjp:/)
})

test('QRIS payments carry a distinct idempotency key', () => {
  assert.match(apiSource, /payQris\([\s\S]*?idempotencyKey: string/)
  assert.match(qrisSource, /paymentIdempotencyKey = useRef\(crypto\.randomUUID\(\)\)/)
  assert.match(qrisSource, /paymentIdempotencyKey\.current = crypto\.randomUUID\(\)/)
})

test('wallet creation submits owner_id without stale participant or tier fields', async () => {
  const { moduleUrl, hooksModuleUrl } = compileFrontendModule('pages/CreateWallet.tsx')
  const [{ default: CreateWallet }, hooksModule] = await Promise.all([
    import(moduleUrl),
    import(hooksModuleUrl),
  ])

  const fetchCalls = []
  const originalFetch = global.fetch
  global.fetch = async (url, options = {}) => {
    fetchCalls.push({ url: String(url), options })
    return jsonResponse({ wallet_id: 'wlt_budi', tier: 'BASIC' })
  }

  try {
    const renderer = createRenderer(hooksModule, CreateWallet, {})
    renderer.render()

    const ownerInput = findByPlaceholder(renderer.getTree(), 'budi')
    ownerInput.props.onChange({ target: { value: 'budi' } })
    renderer.render()

    const submitButton = findByText(renderer.getTree(), 'button', 'Create Wallet')
    await submitButton.props.onClick()
    renderer.render()

    assert.equal(fetchCalls.length, 1)
    assert.equal(fetchCalls[0].url, '/api/wallets')
    assert.equal(fetchCalls[0].options.method, 'POST')

    const body = JSON.parse(fetchCalls[0].options.body)
    assert.deepEqual(body, { owner_id: 'budi' })
    assert.equal('participant_id' in body, false)
    assert.equal('tier' in body, false)
  } finally {
    global.fetch = originalFetch
  }
})

test('QRIS switching to a different intent clears stale pay result state', async () => {
  const { moduleUrl, hooksModuleUrl } = compileFrontendModule('pages/QrisPayments.tsx')
  const [{ default: QrisPayments }, hooksModule] = await Promise.all([
    import(moduleUrl),
    import(hooksModuleUrl),
  ])

  const intents = [
    {
      intent_id: 'intent-1',
      mode: 'dynamic',
      merchant_id: 'merchant-a',
      merchant_wallet_id: 'wlt_merchant',
      amount: 25000,
      status: 'active',
      label: 'Invoice A',
      payload: 'payload-1',
      reference_id: 'ref-1',
      created_at: '2026-08-10T00:00:00Z',
      updated_at: '2026-08-10T00:00:00Z',
    },
    {
      intent_id: 'intent-2',
      mode: 'dynamic',
      merchant_id: 'merchant-a',
      merchant_wallet_id: 'wlt_merchant',
      amount: 40000,
      status: 'active',
      label: 'Invoice B',
      payload: 'payload-2',
      reference_id: 'ref-2',
      created_at: '2026-08-10T00:00:00Z',
      updated_at: '2026-08-10T00:00:00Z',
    },
  ]

  const originalFetch = global.fetch
  global.fetch = async (url, options = {}) => {
    const requestUrl = new URL(String(url), 'http://frontend.test')
    const method = options.method ?? 'GET'

    if (requestUrl.pathname === '/api/wallets' && method === 'GET') {
      return jsonResponse([
        {
          wallet_id: 'wlt_merchant',
          owner_id: 'merchant-a',
          participant_id: 'gopay',
          wallet_type: 'merchant',
          tier: 'MERCHANT',
          balance: 900000,
          frozen: false,
          daily_spent: 0,
          monthly_spent: 0,
          monthly_received: 0,
          created_at: '2026-08-10T00:00:00Z',
          updated_at: '2026-08-10T00:00:00Z',
        },
      ])
    }

    if (requestUrl.pathname === '/api/qris/intents' && method === 'GET') {
      return jsonResponse(intents)
    }

    if (requestUrl.pathname === '/api/qris/pay' && method === 'POST') {
      const body = JSON.parse(options.body)
      return jsonResponse({
        status: 'paid',
        tx_id: body.payload === 'payload-1' ? 'tx-1' : 'tx-2',
        intent_id: body.payload === 'payload-1' ? 'intent-1' : 'intent-2',
        reference_id: body.payload === 'payload-1' ? 'ref-1' : 'ref-2',
      })
    }

    throw new Error(`Unhandled fetch ${method} ${requestUrl.pathname}`)
  }

  try {
    const renderer = createRenderer(hooksModule, QrisPayments, { role: 'merchant', selectedWallet: 'wlt_merchant' })
    renderer.render()
    await renderer.settle()

    const firstUseButton = findAll(renderer.getTree(), node => node.type === 'button' && textContent(node) === 'Use')[0]
    firstUseButton.props.onClick()
    renderer.render()

    const payButton = findByText(renderer.getTree(), 'button', 'Pay with QRIS')
    await payButton.props.onClick()
    renderer.render()

    assert.match(textContent(renderer.getTree()), /Ref ref-1/)

    const secondUseButton = findAll(renderer.getTree(), node => node.type === 'button' && textContent(node) === 'Use')[1]
    secondUseButton.props.onClick()
    renderer.render()

    const pageText = textContent(renderer.getTree())
    assert.doesNotMatch(pageText, /Tx tx-1 · Ref ref-1/)
    assert.match(pageText, /ref-2/)
  } finally {
    global.fetch = originalFetch
  }
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
  assert.match(overviewSource, /LoadingSkeleton kind="metrics"/)
  assert.match(walletSource, /LoadingSkeleton kind="table"/)
  assert.match(participantsSource, /LoadingSkeleton kind="table"/)
})

test('payment contact API keeps the selected contract', async () => {
  const { moduleUrl } = compileFrontendModule('lib/api.ts')
  const api = await import(moduleUrl)
  const originalFetch = global.fetch
  const calls = []
  global.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options })
    return jsonResponse({ id: 'contact-1', label: 'Sari', wallet_id: 'wlt_sari', recipient_type: 'retail_customer' }, 201)
  }
  try {
    const contact = await api.createPaymentContact({ label: 'Sari', wallet_id: 'wlt_sari', recipient_type: 'retail_customer' })
    assert.equal(contact.wallet_id, 'wlt_sari')
    assert.equal(calls[0].url, '/api/payment-contacts')
    assert.equal(calls[0].options.method, 'POST')
    assert.deepEqual(JSON.parse(calls[0].options.body), { label: 'Sari', wallet_id: 'wlt_sari', recipient_type: 'retail_customer' })
  } finally {
    global.fetch = originalFetch
  }
  assert.match(contactsSource, /Recipient Wallet ID/)
  assert.match(contactsSource, /recipient_type/)
})

test('204 payment contact deletes do not require a JSON body', async () => {
  const { moduleUrl } = compileFrontendModule('lib/api.ts')
  const api = await import(moduleUrl)
  const originalFetch = global.fetch
  global.fetch = async () => jsonResponse(null, 204)
  try {
    assert.equal(await api.deletePaymentContact('contact-1'), undefined)
  } finally {
    global.fetch = originalFetch
  }
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
    await api.createStudySubject({ subject_id: 'retail/one', category: 'retail' })
    await api.setStudyLimits('retail/one', {
      per_transaction: '9007199254740993', daily: '9007199254740994', monthly: '9007199254740995', holdings: '9007199254740996',
    })
    await api.setStudyBusinessAuthority('business-1', { representatives: ['client-1'], beneficial_owner_refs: ['sha256-ref-1'] })
    await api.transferStudyFunds({ from: 'retail/one', to: 'merchant-two', amount: '9007199254740993' }, 'study-transfer-key')
  } finally {
    api.setAccessToken('')
    global.fetch = originalFetch
  }
  assert.equal(calls[0].url, '/api/customer-wallets/retail%2Fone/balance')
  assert.equal(calls[0].options.headers.Authorization, 'Bearer study-token')
  assert.deepEqual(JSON.parse(calls[2].options.body), {
    per_transaction: '9007199254740993', daily: '9007199254740994', monthly: '9007199254740995', holdings: '9007199254740996',
  })
  assert.equal(calls[2].options.method, 'PUT')
  assert.equal(calls[3].options.method, 'PUT')
  assert.deepEqual(JSON.parse(calls[3].options.body), { representatives: ['client-1'], beneficial_owner_refs: ['sha256-ref-1'] })
  assert.equal(calls[4].options.headers['Idempotency-Key'], 'study-transfer-key')
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
    await api.setStudyStaffRole('x509::client/1', 'senior_approver')
  } finally {
    api.setAccessToken('')
    global.fetch = originalFetch
  }
  assert.equal(calls[0].url, '/api/staff')
  assert.deepEqual(JSON.parse(calls[0].options.body), { client_id: 'x509::client/1' })
  assert.equal(calls[1].url, '/api/staff/x509%3A%3Aclient%2F1/endorsement-policies')
  assert.equal(calls[2].url, '/api/staff/x509%3A%3Aclient%2F1/role')
  assert.equal(calls[2].options.method, 'PUT')
  assert.deepEqual(JSON.parse(calls[2].options.body), { role: 'senior_approver' })
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
  const validator = createRenderer(hooksModule, StudyConsole, { role: 'supervisor', section: 'study_audit' })
  const validatorText = expandedText(validator.render())
  assert.match(validatorText, /ValidatorMSP/)
  assert.doesNotMatch(validatorText, /Restrict subject|Transfer rupiah|Mint/)

  const retail = createRenderer(hooksModule, StudyConsole, { role: 'authenticated', section: 'study_identity' })
  const retailText = expandedText(retail.render())
  assert.match(retailText, /Create pending subject/)
  assert.doesNotMatch(retailText, /Transfer rupiah|Set limits|Convert to retail wallet/)
  const unverifiedWallet = createRenderer(hooksModule, StudyConsole, { role: 'authenticated', section: 'study_wallet' })
  assert.match(expandedText(unverifiedWallet.render()), /cannot access this function/)
  const retailTransfer = createRenderer(hooksModule, StudyConsole, { role: 'kyc_verified', section: 'study_transfer' })
  assert.match(expandedText(retailTransfer.render()), /Transfer rupiah/)

  const distributor = createRenderer(hooksModule, StudyConsole, { role: 'pjp', section: 'study_approval' })
  const approvalText = expandedText(distributor.render())
  assert.match(approvalText, /DistributorMSP/)
  assert.match(approvalText, /Record review/)
  assert.doesNotMatch(approvalText, /Business authority|Restrict subject|Convert to retail wallet/)
  const business = createRenderer(hooksModule, StudyConsole, { role: 'pjp', section: 'study_business' })
  assert.match(expandedText(business.render()), /Set business authority/)
  const centralBank = createRenderer(hooksModule, StudyConsole, { role: 'bank_indonesia', section: 'study_monetary' })
  assert.match(expandedText(centralBank.render()), /CentralBankMSP/)
  assert.match(expandedText(centralBank.render()), /Allocate reserve/)

  const staff = createRenderer(hooksModule, StudyConsole, { role: 'bank_indonesia', section: 'study_staff' })
  const staffText = expandedText(staff.render())
  assert.match(staffText, /Create staff/)
  assert.match(staffText, /Protect staff/)
  assert.match(staffText, /Set role/)
  assert.doesNotMatch(staffText, /Mint|Transfer rupiah/)
  const restrictions = createRenderer(hooksModule, StudyConsole, { role: 'pjp', section: 'study_restrictions' })
  assert.match(expandedText(restrictions.render()), /Restrict subject/)

  assert.doesNotMatch(appSource, /Controls study/)
  assert.match(appSource, /study_identity: \{ label: 'Subject onboarding' \}/)
  assert.match(appSource, /study_audit: \{ label: 'Controls audit' \}/)
  assert.match(appSource, /startsWith\('study_'/)
  assert.match(appSource, /bank_indonesia: \{ label: 'Bank Indonesia', shell: 'institutional', tabs: \['study_staff', 'study_monetary'\] \}/)
  assert.match(appSource, /supervisor: \{ label: 'Auditor', shell: 'institutional', tabs: \['study_audit'\] \}/)
  assert.match(appSource, /validator_bank: \{ label: 'Validator Bank', shell: 'institutional', tabs: \[\] \}/)
  assert.match(appSource, /has no workspace in the demo/)
  assert.doesNotMatch(appSource, /tabs: \[[^\]]*'(overview|participants|wallets|create|transfer|contacts|activity|supervision|prototype)'/)
  assert.doesNotMatch(appSource, /DemoPanel|Show demo/)
  const legacyValidatorConfig = appSource.match(/validator_bank: \{[^\n]+/)
  assert.ok(legacyValidatorConfig)
  assert.doesNotMatch(legacyValidatorConfig[0], /'study_/)
  assert.match(studySource, /server for each username/)
})
