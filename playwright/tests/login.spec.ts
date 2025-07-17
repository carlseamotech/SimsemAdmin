import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('should allow a user to log in with valid credentials', async ({ page }) => {
    await page.goto('/auth');

    await page.fill('input[name="email"]', 'admin@simsem.com');
    await page.fill('input[name="password"]', 'password');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/');
  });

  test('should show an error message with invalid credentials', async ({ page }) => {
    await page.goto('/auth');

    await page.fill('input[name="email"]', 'wrong@simsem.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    await page.click('button[type="submit"]');

    const errorMessage = await page.waitForSelector('text=Invalid credentials');
    expect(errorMessage).not.toBeNull();
  });
});
