import { test, expect } from '@playwright/test';

test.describe('Invite Team Member Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/teams');
  });

  test('should allow inviting a new team member', async ({ page }) => {
    // Click the "Invite" button
    await page.click('button:has-text("Invite")');

    // Fill out the form
    await page.fill('input[name="email"]', 'newmember@simsem.com');
    await page.selectOption('select[name="role"]', 'Editor');

    // Submit the form
    await page.click('button:has-text("Send Invitation")');

    // Verify that the new team member appears in the table with a "Pending" status
    const newMemberEmail = await page.waitForSelector('text=newmember@simsem.com');
    const pendingStatus = await page.waitForSelector('text=Pending');
    expect(newMemberEmail).not.toBeNull();
    expect(pendingStatus).not.toBeNull();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Click the "Invite" button
    await page.click('button:has-text("Invite")');

    // Fill out the form with an invalid email
    await page.fill('input[name="email"]', 'invalid-email');
    await page.selectOption('select[name="role"]', 'Editor');

    // Submit the form
    await page.click('button:has-text("Send Invitation")');

    // Verify that a validation error is shown
    const errorMessage = await page.waitForSelector('text=Invalid email address');
    expect(errorMessage).not.toBeNull();
  });
});
