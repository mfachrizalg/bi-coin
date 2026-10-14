import { expect, test } from '@playwright/test'

const username = process.env.SMOKE_USERNAME ?? 'bi'
const password = process.env.SMOKE_PASSWORD ?? 'bi-password'

test('signs in through the frontend to the backend API', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)

  const loginResponse = page.waitForResponse(response => (
    response.request().method() === 'POST'
    && new URL(response.url()).pathname.endsWith('/auth/login')
  ))
  const principalResponse = page.waitForResponse(response => (
    response.request().method() === 'GET'
    && new URL(response.url()).pathname.endsWith('/auth/me')
  ))

  await page.getByRole('button', { name: 'Sign in' }).click()

  expect((await loginResponse).status()).toBe(200)
  expect((await principalResponse).status()).toBe(200)
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Staff roles', level: 2 })).toBeVisible()
})
