import { test, expect } from '@playwright/test';

async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-5/${stepName}.png`,
    fullPage: true 
  });
}

test('Test Case 5: Register User with existing email', async ({ page }) => {
  // 1. Launch browser - Playwright handles this automatically
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');
  await takeScreenshot(page, 'step-2-navigate-homepage');
   
  // 3. Verify that home page is visible successfully
  await expect(page).toHaveURL(/automationexercise/);
  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
  await takeScreenshot(page, 'step-3-verify-homepage');
   
  // 4. Click on 'Signup / Login' button
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await takeScreenshot(page, 'step-4-click-signup-login');
   
  // 5. Verify 'New User Signup!' is visible
  await expect(page.getByText('New User Signup!')).toBeVisible();
  await takeScreenshot(page, 'step-5-verify-signup-header');
   
  // 6. Enter name and already registered email address
  // Using a test email that was registered in previous test runs
  await page.getByPlaceholder('Name').fill('AnotherUser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('testuser@example.com');
  await takeScreenshot(page, 'step-6-fill-existing-email');
   
  // 7. Click 'Signup' button
  await page.getByRole('button', { name: 'Signup' }).click();
  await takeScreenshot(page, 'step-7-click-signup-button');
   
  // 8. Verify error 'Email Address already exist!' is visible
  await expect(page.getByText('Email Address already exist!')).toBeVisible();
  await takeScreenshot(page, 'step-8-verify-error-message');
});
