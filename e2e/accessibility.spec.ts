import { test, expect } from '@playwright/test';
import { checkA11y, injectAxe } from 'axe-playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test.describe('Accessibility', () => {
  test('should not have accessibility violations on main page', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });
});