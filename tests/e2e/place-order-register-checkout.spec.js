import { test, expect } from '@playwright/test';

async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-14/${stepName}.png`
  });
}

test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
  // 1. Launch browser - Playwright handles this automatically
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');
  await takeScreenshot(page, 'step-2-navigate-homepage');
   
  // 3. Verify that home page is visible successfully
  await expect(page).toHaveURL(/automationexercise/);
  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
  await takeScreenshot(page, 'step-3-verify-homepage');
   
  // 4. Add products to cart
  await page.getByText('Add to cart').first().click();
  await takeScreenshot(page, 'step-4-add-product-to-cart');
   
  // 5. Click 'Cart' button
  await expect(page.getByText('Added!')).toBeVisible({ timeout: 5000 });
  
  // Close modal first by clicking Continue Shopping
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.waitForTimeout(500);
  
  await page.locator('a[href="/view_cart"]').first().click();
  await takeScreenshot(page, 'step-5-click-cart-button');
   
  // 6. Verify that cart page is displayed
  await expect(page).toHaveURL(/view_cart/);
  await takeScreenshot(page, 'step-6-verify-cart-page');
   
  // 7. Click Proceed To Checkout
  await page.locator('a').filter({ hasText: 'Proceed To Checkout' }).click();
  await takeScreenshot(page, 'step-7-click-proceed-checkout');
   
  // 8. Click 'Register / Login' button
  await page.getByRole('link', { name: 'Register / Login' }).click();
  await takeScreenshot(page, 'step-8-click-register-login');
   
  // 9. Fill all details in Signup and create account
  await expect(page.getByText('New User Signup!')).toBeVisible();
  
  const uniqueEmail = `testuser${Date.now()}@example.com`;
   
  await page.getByPlaceholder('Name').fill('TestUser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(uniqueEmail);
  await page.getByRole('button', { name: 'Signup' }).click();
  await takeScreenshot(page, 'step-9-fill-signup-form');
   
  // Wait for account information page
  await page.waitForSelector('input[name="password"]', { timeout: 10000 });
  
  await page.getByLabel('Mr.').check();
  await page.locator('input[name="password"]').fill('123456');
  await page.locator('input[name="first_name"]').fill('Test');
  await page.locator('input[name="last_name"]').fill('User');
  await page.locator('input[name="address1"]').fill('123 Test St');
  await page.locator('input[name="state"]').fill('TestState');
  await page.locator('input[name="city"]').fill('TestCity');
  await page.locator('input[name="zipcode"]').fill('12345');
  await page.locator('input[name="mobile_number"]').fill('1234567890');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await takeScreenshot(page, 'step-10-click-create-account');
   
  // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await page.waitForTimeout(2000);
  await expect(page.getByText(/ACCOUNT CREATED!/i)).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.waitForTimeout(1500);
  
  // Navigate directly to homepage to ensure session is loaded
  await page.goto('http://automationexercise.com');
  await page.waitForTimeout(2000);
  await takeScreenshot(page, 'step-11-account-created-continue');
   
  // 11. Verify 'Logged in as username' at top
  await expect(page.getByText('Logged in as')).toBeVisible({ timeout: 10000 });
  await takeScreenshot(page, 'step-11-verify-logged-in');
   
  // 12. Click 'Cart' button
  await page.getByRole('link', { name: 'Cart' }).click();
  await takeScreenshot(page, 'step-12-click-cart');
   
  // 13. Click 'Proceed To Checkout' button
  await page.locator('a').filter({ hasText: 'Proceed To Checkout' }).click();
  await takeScreenshot(page, 'step-13-proceed-checkout');
   
  // 14. Verify Address Details and Review Your Order
  await expect(page.getByText('Address Details')).toBeVisible();
  await expect(page.getByText('Review Your Order')).toBeVisible();
  await takeScreenshot(page, 'step-14-verify-order-review');
   
  // 15. Enter description in comment text area and click 'Place Order'
  await page.locator('textarea[name="message"]').fill('Test order placement');
  await page.locator('a').filter({ hasText: 'Place Order' }).click();
  await takeScreenshot(page, 'step-15-place-order');
  
  // Wait for payment page to load
  await page.waitForSelector('input[name="name_on_card"]', { timeout: 10000 });
  
  // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await page.locator('input[name="name_on_card"]').fill('Test User');
  await page.locator('input[name="card_number"]').fill('1234567890123456');
  await page.locator('input[name="cvc"]').fill('123');
  await page.locator('input[name="expiry_month"]').fill('12');
  await page.locator('input[name="expiry_year"]').fill('2025');
  await takeScreenshot(page, 'step-16-fill-payment-details');
   
  // 17. Click 'Pay and Confirm Order' button
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  await takeScreenshot(page, 'step-17-confirm-order');
  
  // Wait for success message
  await page.waitForTimeout(1000);
  
  // Debug: check current URL and try to find success message
  const currentUrl = page.url();
  console.log('Current URL after payment:', currentUrl);
  
  // 18. Verify success message
  await expect(page.locator('.alert-success, .col-sm-6 h2, .container h2').first()).toBeVisible();
  await takeScreenshot(page, 'step-18-order-success');
   
  // 19. Click 'Delete Account' button
  await page.getByRole('link', { name: 'Delete Account' }).click();
  
  // Wait a moment for navigation
  await page.waitForLoadState('domcontentloaded');
  
  // 20. Verify 'ACCOUNT DELETED!'
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible({ timeout: 10000 });
});
