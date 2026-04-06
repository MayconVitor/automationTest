import { test, expect } from '@playwright/test';

async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-23/${stepName}.png`,
    fullPage: true 
  });
}

test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
  // Define address data that will be used for registration
  const addressData = {
    title: 'Mr.',
    name: 'TestUser',
    email: `testuser${Date.now()}@example.com`,
    password: '123456',
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Apt 456',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890'
  };
  
  // 1. Launch browser - Playwright handles this automatically
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');
  await takeScreenshot(page, 'step-2-navigate-homepage');
  
  // 3. Verify that home page is visible successfully
  await expect(page).toHaveURL(/automationexercise/);
  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
  await takeScreenshot(page, 'step-3-verify-homepage');
  
  // 4. Click 'Signup / Login' button
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await takeScreenshot(page, 'step-4-click-signup-login');
  
  // 5. Fill all details in Signup and create account
  await expect(page.getByText('New User Signup!')).toBeVisible();
  
  await page.getByPlaceholder('Name').fill(addressData.name);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(addressData.email);
  await page.getByRole('button', { name: 'Signup' }).click();
  await takeScreenshot(page, 'step-5a-fill-signup-form');
  
  // Wait for account information page
  await page.waitForSelector('input[name="password"]', { timeout: 10000 });
  
  // Fill account details with the same data we'll verify later
  await page.getByLabel(addressData.title).check();
  await page.locator('input[name="password"]').fill(addressData.password);
  await page.locator('input[name="first_name"]').fill(addressData.firstName);
  await page.locator('input[name="last_name"]').fill(addressData.lastName);
  await page.locator('input[name="company"]').fill(addressData.company);
  await page.locator('input[name="address1"]').fill(addressData.address1);
  await page.locator('input[name="address2"]').fill(addressData.address2);
  
  // Select country
  await page.locator('select[name="country"]').selectOption(addressData.country);
  
  await page.locator('input[name="state"]').fill(addressData.state);
  await page.locator('input[name="city"]').fill(addressData.city);
  await page.locator('input[name="zipcode"]').fill(addressData.zipcode);
  await page.locator('input[name="mobile_number"]').fill(addressData.mobileNumber);
  await takeScreenshot(page, 'step-5b-fill-account-details');
  
  await page.getByRole('button', { name: 'Create Account' }).click();
  await takeScreenshot(page, 'step-5c-click-create-account');
  
  // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await page.waitForTimeout(2000);
  await expect(page.getByText(/ACCOUNT CREATED!/i)).toBeVisible();
  await takeScreenshot(page, 'step-6-account-created');
  
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.waitForTimeout(1500);
  
  // Navigate directly to homepage to ensure session is loaded
  await page.goto('http://automationexercise.com');
  await page.waitForTimeout(2000);
  
  // 7. Verify 'Logged in as username' at top
  await expect(page.getByText('Logged in as')).toBeVisible({ timeout: 10000 });
  await takeScreenshot(page, 'step-7-verify-logged-in');
  
  // 8. Add products to cart
  await page.getByText('Add to cart').first().click();
  await expect(page.getByText('Added!')).toBeVisible({ timeout: 5000 });
  await takeScreenshot(page, 'step-8-add-product-to-cart');
  
  // 9. Click 'Cart' button
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.waitForTimeout(500);
  
  await page.locator('a[href="/view_cart"]').first().click();
  await takeScreenshot(page, 'step-9-click-cart-button');
  
  // 10. Verify that cart page is displayed
  await expect(page).toHaveURL(/view_cart/);
  await expect(page.getByText('Shopping Cart')).toBeVisible();
  await takeScreenshot(page, 'step-10-verify-cart-page');
  
  // 11. Click Proceed To Checkout
  await page.locator('a').filter({ hasText: 'Proceed To Checkout' }).click();
  await takeScreenshot(page, 'step-11-click-proceed-checkout');
  
  // Wait for checkout page to load
  await page.waitForTimeout(1000);
  await expect(page.getByText('Address Details')).toBeVisible();
  await expect(page.getByText('Review Your Order')).toBeVisible();
  await takeScreenshot(page, 'step-11-checkout-page');
  
  // 12. Verify that the delivery address is same address filled at the time registration of account
  const deliveryAddress = page.locator('#address_delivery');
  
  // Verify delivery address details
  await expect(deliveryAddress.locator('.address_firstname')).toContainText(`${addressData.title} ${addressData.firstName} ${addressData.lastName}`);
  await expect(deliveryAddress).toContainText(addressData.company);
  await expect(deliveryAddress).toContainText(addressData.address1);
  await expect(deliveryAddress).toContainText(addressData.address2);
  await expect(deliveryAddress).toContainText(`${addressData.city} ${addressData.state} ${addressData.zipcode}`);
  await expect(deliveryAddress).toContainText(addressData.country);
  await expect(deliveryAddress).toContainText(addressData.mobileNumber);
  await takeScreenshot(page, 'step-12-verify-delivery-address');
  
  console.log('✅ Delivery address verified successfully!');
  
  // 13. Verify that the billing address is same address filled at the time registration of account
  const billingAddress = page.locator('#address_invoice');
  
  // Verify billing address details
  await expect(billingAddress.locator('.address_firstname')).toContainText(`${addressData.title} ${addressData.firstName} ${addressData.lastName}`);
  await expect(billingAddress).toContainText(addressData.company);
  await expect(billingAddress).toContainText(addressData.address1);
  await expect(billingAddress).toContainText(addressData.address2);
  await expect(billingAddress).toContainText(`${addressData.city} ${addressData.state} ${addressData.zipcode}`);
  await expect(billingAddress).toContainText(addressData.country);
  await expect(billingAddress).toContainText(addressData.mobileNumber);
  await takeScreenshot(page, 'step-13-verify-billing-address');
  
  console.log('✅ Billing address verified successfully!');
  
  // 14. Click 'Delete Account' button
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await takeScreenshot(page, 'step-14-click-delete-account');
  
  // Wait a moment for navigation
  await page.waitForLoadState('domcontentloaded');
  
  // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible({ timeout: 10000 });
  await takeScreenshot(page, 'step-15-account-deleted');
  
  await page.getByRole('link', { name: 'Continue' }).click();
  await takeScreenshot(page, 'step-15-click-continue');
  
  console.log('✅ Test Case 23 completed successfully! All address details verified.');
});
