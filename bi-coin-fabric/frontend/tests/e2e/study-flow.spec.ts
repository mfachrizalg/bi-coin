import { expect, test, type Browser, type Page } from '@playwright/test'

// Live study network only. Needs the backend with FABRIC_IDENTITIES_JSON and
// AUTH_BOOTSTRAP_USERS_JSON (network/README.md) on a fresh ledger: Create staff fails
// if the staff identity already exists. Env: E2E_STUDY=1,
// E2E_STUDY_USERS='{"customer":{"username","password"}, "bi", "reviewer", "senior", "compliance", "auditor"}',
// E2E_STAFF_IDS='{"reviewer":"<64-hex>","senior":"<64-hex>","compliance":"<64-hex>"}'.

type Actor = 'customer' | 'bi' | 'reviewer' | 'senior' | 'compliance' | 'auditor'
interface Credentials {
  username: string
  password: string
}

const enabled = process.env.E2E_STUDY === '1'
const actors = JSON.parse(process.env.E2E_STUDY_USERS ?? '{}') as Record<Actor, Credentials>
const staffIDs = JSON.parse(process.env.E2E_STAFF_IDS ?? '{}') as Record<'reviewer' | 'senior' | 'compliance', string>
const subjectID = `e2e-${Date.now()}`
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

test.describe('compliance study flow', () => {
  test.skip(!enabled, 'set E2E_STUDY=1 with the study network up')
  test.describe.configure({ mode: 'serial', timeout: 180_000 })

  test('customer creates a pending subject', async ({ browser }) => {
    await asActor(browser, 'customer', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await page.locator('#study-category').selectOption('retail')
      await act(page, 'Create pending subject', 'Create pending subject completed.')
    })
  })

  test('BI provisions the three staff identities', async ({ browser }) => {
    await asActor(browser, 'bi', async page => {
      const staff = [
        { id: staffIDs.reviewer, role: 'kyc_reviewer' },
        { id: staffIDs.senior, role: 'senior_approver' },
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

  test('reviewer protects the subject', async ({ browser }) => {
    await asActor(browser, 'reviewer', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await act(page, 'Protect subject', 'Protect subject completed.')
    })
  })

  test('senior approver sets the limits', async ({ browser }) => {
    await asActor(browser, 'senior', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await fillLimits(page)
      await act(page, 'Set limits', 'Set limits completed.')
    })
  })

  test('reviewer high-risk decision is rejected without a senior approver', async ({ browser }) => {
    await asActor(browser, 'reviewer', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await page.locator('#study-risk-level').selectOption('high')
      await act(page, 'Record review', 'Record review completed.')
      await page.getByRole('button', { name: 'Apply decision', exact: true }).click()
      await expect(page.getByRole('alert')).toContainText('senior_approver', slow)
      await expect(page.getByRole('status').filter({ hasText: 'Apply decision completed.' })).toHaveCount(0)
    })
  })

  test('senior approver applies the high-risk decision', async ({ browser }) => {
    await asActor(browser, 'senior', async page => {
      await page.locator('#study-subject-id').fill(subjectID)
      await act(page, 'Apply decision', 'Apply decision completed.')
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

  test('senior approver approves the release', async ({ browser }) => {
    await asActor(browser, 'senior', async page => {
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
})
