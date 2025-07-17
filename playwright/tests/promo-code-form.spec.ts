import { test, expect } from '@playwright/test';

test.describe('Promo Code Form', () => {
  test('should allow creating a new promo code', async ({ page }) => {
    await page.goto('/promotions');

    // Click the "Add Promo Code" button
    await page.click('button:has-text("Add Promo Code")');

    // Fill out the form
    await page.fill('input[name="code"]', 'TESTPROMO');
    await page.selectOption('select[name="discountType"]', 'percentage');
    await page.fill('input[name="discountValue"]', '10');
    await page.fill('input[name="maxUses"]', '100');
    await page.fill('input[name="expiryDate"]', '2025-12-31');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify that the new promo code appears in the table
    const newPromoCode = await page.waitForSelector('text=TESTPROMO');
    expect(newPromoCode).not.toBeNull();
  });
});
