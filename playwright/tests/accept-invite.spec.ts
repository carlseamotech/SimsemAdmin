import { test, expect } from '@playwright/test';

test.describe('Accept Invite Form', () => {
  const invitationToken = 'some-valid-token';

  test.beforeEach(async ({ page }) => {
    await page.goto(`/accept-invite?token=${invitationToken}`);
  });

  test('should allow a new user to accept an invitation and create an account', async ({ page }) => {
    // Fill out the form
    await page.fill('input[name="password"]', 'newpassword');
    await page.fill('input[name="confirmPassword"]', 'newpassword');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify that the user is redirected to the login page
    await expect(page).toHaveURL('/auth');
  });

  test('should show an error if passwords do not match', async ({ page }) => {
    // Fill out the form with mismatching passwords
    await page.fill('input[name="password"]', 'newpassword');
    await page.fill('input[name="confirmPassword"]', 'wrongpassword');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify that an error message is shown
    const errorMessage = await page.waitForSelector('text=Passwords do not match');
    expect(errorMessage).not.toBeNull();
  });
});
