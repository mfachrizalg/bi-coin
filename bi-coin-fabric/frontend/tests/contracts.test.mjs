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
  assert.match(apiSource, /requestIssuance\(data: \{ amount: string \}\)/)
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

test('DemoPanel exposes disclosure and current-step aria state', async () => {
  const { moduleUrl, hooksModuleUrl } = compileFrontendModule('pages/DemoPanel.tsx')
  const [{ default: DemoPanel }, hooksModule] = await Promise.all([
    import(moduleUrl),
    import(hooksModuleUrl),
  ])

  const renderer = createRenderer(hooksModule, DemoPanel, {
    currentStep: 3,
    onStep: () => {},
    onPrefill: () => {},
  })
  renderer.render()

  const disclosureButton = findByText(renderer.getTree(), 'button', 'Phase 1 — Bank Onboarding')
  assert.ok(disclosureButton.props['aria-controls'])
  assert.equal(disclosureButton.props['aria-expanded'], true)

  const currentStepButton = findByText(renderer.getTree(), 'button', 'Issue Rp 100,000,000 to Treasury')
  assert.equal(currentStepButton.props['aria-current'], 'step')

  disclosureButton.props.onClick()
  renderer.render()

  const collapsedButton = findByText(renderer.getTree(), 'button', 'Phase 1 — Bank Onboarding')
  assert.equal(collapsedButton.props['aria-expanded'], false)
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
