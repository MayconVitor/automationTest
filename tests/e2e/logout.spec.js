import { test, expect } from '@playwright/test';

async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-4/${stepName}.png`,
    fullPage: true 
  });
}

test('Test Case 4: Logout User', async ({ page }) => {
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
   
  // 5. Verify 'Login to your account' is visible
  await page.waitForTimeout(500);
  await takeScreenshot(page, 'step-5-verify-login-header');
   
  // Setup: Create account first (required for login test)
  const uniqueEmail = `testuser${Date.now()}@example.com`;
   
  await page.getByPlaceholder('Name').fill('TestUser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(uniqueEmail);
  await takeScreenshot(page, 'step-6-fill-signup-form');
   
  await page.getByRole('button', { name: 'Signup' }).click();
  await takeScreenshot(page, 'step-7-click-signup-button');
   
  // Wait for account information page
  await page.waitForSelector('input[name="password"]', { timeout: 10000 });
  await takeScreenshot(page, 'step-8-account-info-page');
   
  await page.getByLabel('Mr.').check();
  await page.locator('input[name="password"]').fill('123456');
  await page.locator('input[name="first_name"]').fill('Test');
  await page.locator('input[name="last_name"]').fill('User');
  await page.locator('input[name="address1"]').fill('123 Test St');
  await page.locator('input[name="state"]').fill('TestState');
  await page.locator('input[name="city"]').fill('TestCity');
  await page.locator('input[name="zipcode"]').fill('12345');
  await page.locator('input[name="mobile_number"]').fill('1234567890');
  await takeScreenshot(page, 'step-9-fill-account-details');
   
  await page.getByRole('button', { name: 'Create Account' }).click();
  await takeScreenshot(page, 'step-10-click-create-account');
   
  // Wait for account created message
  await page.waitForTimeout(2000);
  await expect(page.getByText(/ACCOUNT CREATED!/i)).toBeVisible();
  await takeScreenshot(page, 'step-11-account-created');
   
  // Click Continue to go to home page
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.waitForTimeout(1500);
  
  // Navigate directly to homepage to ensure session is loaded
  await page.goto('http://automationexercise.com');
  await page.waitForTimeout(2000);
  
  // 8. Verify that 'Logged in as username' is visible
  await expect(page.getByText('Logged in as')).toBeVisible({ timeout: 10000 });
  await takeScreenshot(page, 'step-13-logged-in-as');
   
  // 9. Click 'Logout' button
  await page.getByRole('link', { name: 'Logout' }).click();
  await takeScreenshot(page, 'step-14-click-logout');
   
  // 10. Verify that user is navigated to login page
  await expect(page).toHaveURL(/login/);
  await expect(page.getByText('Login to your account')).toBeVisible();
  await takeScreenshot(page, 'step-15-verify-login-page');
});
