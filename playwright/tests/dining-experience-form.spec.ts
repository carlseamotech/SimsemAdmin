import { test, expect } from '@playwright/test';

test.describe('Dining Experience Form', () => {
  test('should allow creating a new dining experience', async ({ page }) => {
    await page.goto('/dining');

    // Step 1: Meal Name
    await page.fill('textarea[name="mealName"]', 'A delicious dining experience');
    await page.click('button:has-text("Next")');

    // Step 2: Description
    await page.fill('textarea[name="description"]', 'A very detailed description of the dining experience.');
    await page.click('button:has-text("Next")');

    // ... and so on for the rest of the steps

    // Final step: Summary and Confirmation
    await page.click('button:has-text("Confirm")');

    // Verify that the user is redirected to the experience library
    await expect(page).toHaveURL('/experiences?tab=experience-library');
  });
});
