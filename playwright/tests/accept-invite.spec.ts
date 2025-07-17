import { test, expect } from '@playwright/test';

test.describe('Accept Invite Form', () => {
  test('should allow a new user to accept an invitation and create an account', async ({ page }) => {
    // This test requires a valid invitation token.
    const invitationToken = 'some-valid-token';
    await page.goto(`/accept-invite?token=${invitationToken}`);

    // Fill out the form
    await page.fill('input[name="password"]', 'newpassword');
    await page.fill('input[name="confirmPassword"]', 'newpassword');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify that the user is redirected to the login page
    await expect(page).toHaveURL('/auth');
  });
});
