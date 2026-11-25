import { expect, test, type Browser, type Page } from '@playwright/test'

// Live study network only. Needs the backend with FABRIC_IDENTITIES_JSON and
// AUTH_BOOTSTRAP_USERS_JSON (network/README.md) on a fresh ledger: Create staff fails
// if the staff identity already exists. Env: E2E_STUDY=1,
// E2E_STUDY_USERS='{"customer":{"username","password"}, "bi", "reviewer", "compliance", "auditor"}',
// E2E_STAFF_IDS='{"reviewer":"<64-hex>","compliance":"<64-hex>"}'.

type Actor = 'customer' | 'bi' | 'reviewer' | 'compliance' | 'auditor'
interface Credentials {
  username: string
  password: string
}

const enabled = process.env.E2E_STUDY === '1'
const actors = JSON.parse(process.env.E2E_STUDY_USERS ?? '{}') as Record<Actor, Credentials>
const staffIDs = JSON.parse(process.env.E2E_STAFF_IDS ?? '{}') as Record<'reviewer' | 'compliance', string>
// Set by test 1: the backend generates the subject ID, so the form value is not used.
let subjectID = ''
const releaseEvidenceRef = 'ab'.repeat(32)
const limits = { per_transaction: '1000', daily: '5000', monthly: '20000', holdings: '5000' }
const slow = { timeout: 60_000 }

async function signIn(page: Page, actor: Actor) {
  const credentials = actors[actor]
  if (!credentials) throw new Error(`E2E_STUDY_USERS has no entry for ${actor}`)
  await page.goto('/')
  await page.getByLabel('Username').fill(credentials.username)
  await page.getByLabel('Password').fill(credentials.password)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible(slow)
}

async function asActor(browser: Browser, actor: Actor, run: (page: Page) => Promise<void>) {
  const context = await browser.newContext()
  try {
    const page = await context.newPage()
    await signIn(page, actor)
    await run(page)
  } finally {
    await context.close()
  }
}

async function act(page: Page, button: string, done: string) {
  await page.getByRole('button', { name: button, exact: true }).click()
  await expect(page.getByRole('status').filter({ hasText: done })).toBeVisible(slow)
}

async function fillLimits(page: Page) {
  for (const [field, value] of Object.entries(limits)) {
    await page.locator(`#study-limit-${field}`).fill(value)
  }
}

// 1x1 PNG: the onboarding form requires a PNG or JPEG identity document.
const identityPNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64')

test.describe('compliance study flow', () => {
  test.skip(!enabled, 'set E2E_STUDY=1 with the study network up')
  test.describe.configure({ mode: 'serial', timeout: 180_000 })

  test('customer creates a pending subject', async ({ browser }) => {
    await asActor(browser, 'customer', async page => {
      await page.locator('#study-legal-name').fill('Synthetic Customer')
      await page.locator('#study-address').fill('Jl. Contoh 1, Sleman')
      await page.locator('#study-birth-place').fill('Sleman')
      await page.locator('#study-birth-date').fill('2000-01-02')
      await page.locator('#study-document-number').fill(`e2e-doc-${Date.now()}`)
      await page.locator('#study-document').setInputFiles({ name: 'identity.png', mimeType: 'image/png', buffer: identityPNG })
      await act(page, 'Create pending subject', 'Create pending subject completed.')
      subjectID = await page.locator('#study-subject-id').inputValue()
      expect(subjectID).toMatch(/^[0-9a-f]+$/)
    })
  })

  test('BI provisions the three staff identities', async ({ browser }) => {
    await asActor(browser, 'bi', async page => {
      const staff = [
        { id: staffIDs.reviewer, role: 'kyc_reviewer' },
        { id: staffIDs.compliance, role: 'compliance_officer' },
      ]
      for (const member of staff) {
        await page.locator('#study-staff-client-id').fill(member.id)
        await page.locator('#study-staff-role').selectOption(member.role)
        await act(page, 'Create staff', 'Create staff completed.')
        await act(page, 'Protect staff', 'Protect staff completed.')
        await act(page, 'Set role', 'Set role completed.')
      }
    })
  })

  test('BI sets the CDD ceilings', async ({ browser }) => {
    await asActor(browser, 'bi', async page => {
      await page.getByRole('button', { name: 'CDD ceilings', exact: true }).click()
      await page.locator('#study-ceiling-unverified_holdings').fill('2000000')
      await page.locator('#study-ceiling-verified_holdings').fill('20000000')
      await act(page, 'Set ceilings', 'Set ceilings completed.')
      await act(page, 'Load ceilings', 'Load ceilings completed.')
      await expect(page.locator('pre')).toContainText('"verified_holdings": "20000000"', slow)
    })
  })

  test('reviewer protects the subject', async ({ browser }) => {
    await asActor(browser, 'reviewer', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await act(page, 'Protect subject', 'Protect subject completed.')
    })
  })

  test('reviewer sets the limits', async ({ browser }) => {
    await asActor(browser, 'reviewer', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await fillLimits(page)
      await act(page, 'Set limits', 'Set limits completed.')
    })
  })

  test('reviewer records the review and applies the decision', async ({ browser }) => {
    await asActor(browser, 'reviewer', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await act(page, 'Record review', 'Record review completed.')
      await act(page, 'Apply decision', 'Apply decision completed.')
    })
  })

  test('reviewer verifies the subject', async ({ browser }) => {
    await asActor(browser, 'reviewer', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await page.locator('#study-evidence-ref').fill(releaseEvidenceRef)
      await act(page, 'Verify subject', 'Verify subject completed.')
      await act(page, 'Read subject', 'Read subject completed.')
      await expect(page.getByText('Status: active · Verified: yes')).toBeVisible(slow)
    })
  })

  test('compliance officer restricts the subject', async ({ browser }) => {
    await asActor(browser, 'compliance', async page => {
      await page.getByRole('button', { name: 'Restrictions', exact: true }).click()
      await page.locator('#study-subject-id').fill(subjectID)
      await page.locator('#study-restriction-reason').selectOption('dttot')
      await act(page, 'Restrict subject', 'Restrict subject completed.')
    })
  })

  test('auditor sees the subject restricted', async ({ browser }) => {
    await asActor(browser, 'auditor', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await act(page, 'Read subject', 'Read subject completed.')
      await expect(page.locator('pre')).toContainText('"restricted": true', slow)
    })
  })

  test('reviewer requests release with a SHA-256 reference', async ({ browser }) => {
    await asActor(browser, 'reviewer', async page => {
      await page.getByRole('button', { name: 'Restrictions', exact: true }).click()
      await page.locator('#study-subject-id').fill(subjectID)
      await page.locator('#study-authority-ref').fill(releaseEvidenceRef)
      await act(page, 'Request release', 'Request release completed.')
    })
  })

  test('compliance officer approves the release', async ({ browser }) => {
    await asActor(browser, 'compliance', async page => {
      await page.getByRole('button', { name: 'Restrictions', exact: true }).click()
      await page.locator('#study-subject-id').fill(subjectID)
      await act(page, 'Approve release', 'Approve release completed.')
    })
  })

  test('auditor sees the subject released', async ({ browser }) => {
    await asActor(browser, 'auditor', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await act(page, 'Read subject', 'Read subject completed.')
      await expect(page.locator('pre')).toContainText('"restricted": false', slow)
    })
  })

  test('compliance officer and BI load the compliance views', async ({ browser }) => {
    await asActor(browser, 'compliance', async page => {
      await page.getByRole('button', { name: 'Compliance', exact: true }).click()
      await act(page, 'Load alerts', 'Load alerts completed.')
    })
    await asActor(browser, 'bi', async page => {
      await page.getByRole('button', { name: 'Compliance', exact: true }).click()
      await act(page, 'Load register', 'Load register completed.')
      await expect(page.locator('pre')).toContainText(subjectID, slow)
    })
  })

  test('reviewer closes the subject', async ({ browser }) => {
    await asActor(browser, 'reviewer', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await page.locator('#study-close-reason').selectOption('identity_doubtful')
      await act(page, 'Close subject', 'Close subject completed.')
      await act(page, 'Read subject', 'Read subject completed.')
      await expect(page.getByText('Status: closed')).toBeVisible(slow)
    })
  })
})
