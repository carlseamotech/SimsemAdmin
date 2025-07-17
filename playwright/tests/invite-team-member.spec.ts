import { test, expect } from '@playwright/test';

test.describe('Invite Team Member Form', () => {
  test('should allow inviting a new team member', async ({ page }) => {
    await page.goto('/teams');

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
});
