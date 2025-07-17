import { test, expect } from '@playwright/test';

test.describe('Promo Code Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/promotions');
  });

  test('should allow creating a new promo code', async ({ page }) => {
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

  test('should show validation errors for empty fields', async ({ page }) => {
    // Click the "Add Promo Code" button
    await page.click('button:has-text("Add Promo Code")');

    // Submit the form without filling it out
    await page.click('button[type="submit"]');

    // Verify that validation error messages are displayed
    const codeError = await page.waitForSelector('text=Code is required');
    expect(codeError).not.toBeNull();

    const discountValueError = await page.waitForSelector('text=Discount value is required');
    expect(discountValueError).not.toBeNull();

    const maxUsesError = await page.waitForSelector('text=Max uses is required');
    expect(maxUsesError).not.toBeNull();

    const expiryDateError = await page.waitForSelector('text=Expiry date is required');
    expect(expiryDateError).not.toBeNull();
  });
});
