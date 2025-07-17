import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Local Living Experience Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/local-living');
  });

  test('should allow creating a new local living experience', async ({ page }) => {
    // Step 1: Tour Name
    await page.fill('textarea[name="tourName"]', 'A wonderful local living experience');
    await page.click('button:has-text("Next")');

    // Step 2: Description
    await page.fill('textarea[name="description"]', 'A detailed description of the local living experience.');
    await page.click('button:has-text("Next")');

    // Step 3: Basic Info
    await page.selectOption('select', 'turkey');
    await page.fill('input[type="number"] >> nth=0', '50');
    await page.fill('input[type="number"] >> nth=1', '2');
    await page.fill('input[type="number"] >> nth=2', '4');
    await page.click('text=Historical');
    await page.click('text=Culture');
    await page.click('button:has-text("Next")');

    // Step 4: Inclusions
    await page.click('text=Breakfast');
    await page.click('text=Transportation');
    await page.click('text=Accommodation');
    await page.click('button:has-text("Next")');

    // Step 5: Cover Photo
    const photoPath = path.resolve(__dirname, '../../public/living-test.png');
    await page.setInputFiles('input[type="file"]', photoPath);
    await page.click('button:has-text("Next")');

    // Final step: Summary and Confirmation
    await page.click('button:has-text("Confirm")');

    // Verify that the user is redirected to the experience library
    await expect(page).toHaveURL('/experiences?tab=experience-library');
  });
});
