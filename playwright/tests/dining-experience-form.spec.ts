import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Dining Experience Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dining');
  });

  test('should allow creating a new dining experience', async ({ page }) => {
    // Step 1: Meal Name
    await page.fill('textarea[name="mealName"]', 'A delicious dining experience');
    await page.click('button:has-text("Next")');

    // Step 2: Description
    await page.fill('textarea[name="description"]', 'A very detailed description of the dining experience.');
    await page.click('button:has-text("Next")');

    // Step 3: Starter
    await page.click('text=Hummus');
    await page.click('button:has-text("Next")');

    // Step 4: Main Dish
    await page.click('text=Tabbouleh');
    await page.click('button:has-text("Next")');

    // Step 5: Dessert
    await page.click('text=Knafeh');
    await page.click('button:has-text("Next")');

    // Step 6: Tell us more
    await page.selectOption('select', 'turkey');
    await page.fill('input[type="number"]', '25');
    await page.click('button:has-text("Next")');

    // Step 7: Cover Photo
    const photoPath = path.resolve(__dirname, '../../public/dining-test.png');
    await page.setInputFiles('input[type="file"]', photoPath);
    await page.click('button:has-text("Next")');

    // Final step: Summary and Confirmation
    await page.click('button:has-text("Confirm")');

    // Verify that the user is redirected to the experience library
    await expect(page).toHaveURL('/experiences?tab=experience-library');
  });
});
