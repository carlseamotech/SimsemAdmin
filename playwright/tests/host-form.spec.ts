import { test, expect } from '@playwright/test';

test.describe('Host Form', () => {
  test('should allow editing and saving host information', async ({ page }) => {
    // This test requires a host to exist. We'll navigate directly to a host page.
    await page.goto('/hosts/4kQcAzFFXM');

    // Click the "Edit" button
    await page.click('button:has-text("Edit")');

    // Modify a field
    await page.fill('input[name="about"]', 'This is an updated bio for the host.');

    // Save the changes
    await page.click('button:has-text("Save")');

    // Verify the change was saved
    const updatedBio = await page.inputValue('input[name="about"]');
    expect(updatedBio).toBe('This is an updated bio for the host.');
  });
});
