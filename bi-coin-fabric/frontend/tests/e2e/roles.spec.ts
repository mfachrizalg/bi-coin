import { expect, test, type Page } from '@playwright/test'

const workspaces = [
  {
    role: 'bank_indonesia',
    roleLabel: 'Bank Indonesia',
    nav: 'Bank Indonesia workspace navigation',
    tabs: ['Staff roles', 'Monetary operations'],
    landingHash: '#/institutional/study-staff',
    landingHeading: 'Staff roles',
  },
  {
    role: 'auditor',
    roleLabel: 'Auditor',
    nav: 'Auditor workspace navigation',
    tabs: ['Controls audit'],
    landingHash: '#/institutional/study-audit',
    landingHeading: 'Controls audit',
  },
  {
    role: 'retail_bank',
    roleLabel: 'Retail Bank',
    nav: 'Retail Bank workspace navigation',
    tabs: ['Subject approval', 'Business authority', 'Restrictions', 'Reserve and float'],
    landingHash: '#/institutional/study-approval',
    landingHeading: 'Subject approval',
  },
  {
    role: 'wholesale_bank',
    roleLabel: 'Wholesale Bank',
    nav: 'Wholesale Bank workspace navigation',
    tabs: ['Reserve and float'],
    landingHash: '#/institutional/study-funding',
    landingHeading: 'Reserve and float',
  },
  {
    role: 'authenticated',
    roleLabel: 'Retail Customer',
    nav: 'Retail Customer workspace navigation',
    tabs: ['Subject onboarding'],
    landingHash: '#/retail/study-identity',
    landingHeading: 'Subject onboarding',
  },
  {
    role: 'kyc_verified',
    roleLabel: 'Retail Customer',
    nav: 'Retail Customer workspace navigation',
    tabs: ['Subject onboarding', 'Wallet', 'Pay'],
    landingHash: '#/retail/study-identity',
    landingHeading: 'Subject onboarding',
  },
  {
    role: 'merchant',
    roleLabel: 'Merchant',
    nav: 'Merchant workspace navigation',
    tabs: ['Subject onboarding', 'Wallet', 'Pay'],
    landingHash: '#/retail/study-identity',
    landingHeading: 'Subject onboarding',
  },
]

async function signIn(page: Page, role: string) {
  // Auth calls are mocked; the app makes no other API call after login.
  await page.route('**/api/auth/login', route =>
    route.fulfill({ json: { access_token: 'e2e-token', token_type: 'Bearer', expires_in: 3600, role } }),
  )
  await page.route('**/api/auth/me', route => route.fulfill({ json: { username: `${role}-e2e`, role } }))
  await page.goto('/')
  await page.getByLabel('Username').fill(`${role}-e2e`)
  await page.getByLabel('Password').fill('e2e-password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
}

for (const workspace of workspaces) {
  test(`${workspace.role} sees its tabs and lands on its first workspace`, async ({ page }) => {
    await signIn(page, workspace.role)

    const nav = page.getByRole('navigation', { name: workspace.nav })
    await expect(nav.getByRole('button')).toHaveText(workspace.tabs)
    await expect(page).toHaveURL(new RegExp(`${workspace.landingHash}$`))
    await expect(page.getByLabel('Session context').getByText(workspace.roleLabel, { exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: workspace.landingHeading, level: 2 })).toBeVisible()
  })
}

test('distributor bank has a workspace, not the empty placeholder', async ({ page }) => {
  await signIn(page, 'retail_bank')

  await expect(
    page.getByRole('navigation', { name: 'Retail Bank workspace navigation' }).getByRole('button'),
  ).toHaveText(['Subject approval', 'Business authority', 'Restrictions', 'Reserve and float'])
  await expect(page.getByText('This role has no workspace in the demo.', { exact: true })).toHaveCount(0)
})

test('a hash naming a tab outside the role renders no workspace', async ({ page }) => {
  await signIn(page, 'auditor')
  await page.evaluate(() => {
    window.location.hash = '#/institutional/study-staff'
  })

  await expect(page.getByRole('heading', { name: 'Staff roles', level: 2 })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Restrict subject' })).toHaveCount(0)
  await expect(
    page.getByRole('navigation', { name: 'Auditor workspace navigation' }).getByRole('button', { name: 'Controls audit' }),
  ).not.toHaveAttribute('aria-current', 'page')
})
