import { test, expect } from '@playwright/test';

async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-3/${stepName}.png`,
    fullPage: true 
  });
}

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
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
  const loginHeader = page.locator('.login-form h2, .signup-form h2').first();
  await expect(loginHeader).toBeVisible();
  await takeScreenshot(page, 'step-5-verify-login-header');
   
  // 6. Enter incorrect email address and password
  const loginForm = page.locator('form').filter({ hasText: 'Login' });
  await loginForm.getByPlaceholder('Email Address').fill('wrong@example.com');
  await loginForm.getByPlaceholder('Password').fill('wrongpassword');
  await takeScreenshot(page, 'step-6-fill-wrong-credentials');
   
  // 7. Click 'login' button
  await loginForm.getByRole('button', { name: 'Login' }).click();
  await takeScreenshot(page, 'step-7-click-login-button');
   
  // 8. Verify error 'Your email or password is incorrect!' is visible
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  await takeScreenshot(page, 'step-8-verify-error-message');
});
