import { test, expect } from '@playwright/test';

test.describe('Local Living Experience Form', () => {
  test('should allow creating a new local living experience', async ({ page }) => {
    await page.goto('/local-living');

    // Step 1: Tour Name
    await page.fill('textarea[name="tourName"]', 'A wonderful local living experience');
    await page.click('button:has-text("Next")');

    // ... and so on for the rest of the steps

    // Final step: Summary and Confirmation
    await page.click('button:has-text("Confirm")');

    // Verify that the user is redirected to the experience library
    await expect(page).toHaveURL('/experiences?tab=experience-library');
  });
});
