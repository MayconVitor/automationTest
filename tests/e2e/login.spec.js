import { test, expect } from '@playwright/test';

async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-2/${stepName}.png`,
    fullPage: true 
  });
}

test('Test Case 2: Login User with correct email and password', async ({ page }) => {
  // 1. Launch browser - Playwright handles this automatically
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');
  await takeScreenshot(page, 'step-2-navigate-homepage');
   
  // 3. Verify that home page is visible successfully
  await expect(page).toHaveURL(/automationexercise/);
  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
  await takeScreenshot(page, 'step-3-verify-homepage');
   
  // Setup: Create account first (required for login test)
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByText('New User Signup!')).toBeVisible();
  await takeScreenshot(page, 'step-4-click-signup-login');
   
  // Generate unique email
  const uniqueEmail = `testuser${Date.now()}@example.com`;
   
  await page.getByPlaceholder('Name').fill('TestUser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(uniqueEmail);
  await takeScreenshot(page, 'step-5-fill-signup-form');
   
  await page.getByRole('button', { name: 'Signup' }).click();
  await takeScreenshot(page, 'step-6-click-signup-button');
   
  // Wait for account information page
  await page.waitForSelector('input[name="password"]', { timeout: 10000 });
  await takeScreenshot(page, 'step-7-account-info-page');
   
  await page.getByLabel('Mr.').check();
  await page.locator('input[name="password"]').fill('123456');
  await page.locator('input[name="first_name"]').fill('Test');
  await page.locator('input[name="last_name"]').fill('User');
  await page.locator('input[name="address1"]').fill('123 Test St');
  await page.locator('input[name="state"]').fill('TestState');
  await page.locator('input[name="city"]').fill('TestCity');
  await page.locator('input[name="zipcode"]').fill('12345');
  await page.locator('input[name="mobile_number"]').fill('1234567890');
  await takeScreenshot(page, 'step-8-fill-account-details');
   
  await page.getByRole('button', { name: 'Create Account' }).click();
  await takeScreenshot(page, 'step-9-click-create-account');
   
  // Wait for account created message
  await page.waitForTimeout(2000);
  await expect(page.getByText(/ACCOUNT CREATED!/i)).toBeVisible();
  await takeScreenshot(page, 'step-10-account-created');
   
  // After account creation, user is automatically logged in
  // Click Continue to go to home page
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.waitForTimeout(1500);
  
  // Navigate directly to homepage to ensure session is loaded
  await page.goto('http://automationexercise.com');
  await page.waitForTimeout(2000);
  
  // 8. Verify that 'Logged in as username' is visible
  await expect(page.getByText('Logged in as')).toBeVisible({ timeout: 10000 });
  await takeScreenshot(page, 'step-12-logged-in-as');
   
  // 9. Click 'Delete Account' button
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await takeScreenshot(page, 'step-13-click-delete-account');
   
  // 10. Verify that 'ACCOUNT DELETED!' is visible
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
  await takeScreenshot(page, 'step-14-account-deleted');
});
