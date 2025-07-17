import { test, expect } from '@playwright/test';

test.describe('Host Form', () => {
  test.beforeEach(async ({ page }) => {
    // This test requires a host to exist. We'll navigate directly to a host page.
    await page.goto('/hosts/4kQcAzFFXM');
  });

  test('should allow editing and saving host information', async ({ page }) => {
    // Click the "Edit" button
    await page.click('button:has-text("Edit")');

    // Modify a field
    await page.fill('input[name="about"]', 'This is an updated bio for the host.');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="languages"]', 'English, Spanish');

    // Save the changes
    await page.click('button:has-text("Save")');

    // Verify the change was saved
    await expect(page.locator('input[name="about"]')).toHaveValue('This is an updated bio for the host.');
    await expect(page.locator('input[name="city"]')).toHaveValue('New York');
    await expect(page.locator('input[name="languages"]')).toHaveValue('English, Spanish');
  });

  test('should allow updating payment information', async ({ page }) => {
    // Click the "Update Payment" button
    await page.click('button:has-text("Update Payment")');

    // Fill out the payment form
    await page.fill('input[name="bankName"]', 'Test Bank');
    await page.fill('input[name="bankAddress"]', '123 Test St');
    await page.fill('input[name="iban"]', 'TESTIBAN123');
    await page.fill('input[name="swiftOrBic"]', 'TESTSWIFT');
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="address"]', '456 Test Ave');

    // Save the changes
    await page.click('button[type="submit"]');

    // Re-open the dialog to verify the changes were saved
    await page.click('button:has-text("Update Payment")');
    await expect(page.locator('input[name="bankName"]')).toHaveValue('Test Bank');
    await expect(page.locator('input[name="bankAddress"]')).toHaveValue('123 Test St');
  });
});
