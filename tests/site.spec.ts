import { test, expect } from '@playwright/test';

test.describe('IFSA NIT Trichy E2E Smoke Tests', () => {
  test('homepage renders hero and chapters', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/IFSA NIT Trichy/);
    await expect(page.getByText('Where ambition meets')).toBeVisible();
    await expect(page.getByText('Our Alumni Are Placed At')).toBeVisible();
  });

  test('publications page renders reports', async ({ page }) => {
    await page.goto('/publications');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('End of Cheap Sovereignty').first()).toBeVisible();
  });

  test('clients page renders live and completed mandates', async ({ page }) => {
    await page.goto('/clients');
    await expect(page.getByRole('heading', { name: 'Varicash' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Climate B Venture' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'myMFD' })).toBeVisible();
  });

  test('events page renders past events with completed badges', async ({ page }) => {
    await page.goto('/events');
    await expect(page.getByText('IFSA Forum 2026').first()).toBeVisible();
  });
});
