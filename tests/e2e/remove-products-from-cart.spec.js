import { test, expect } from '@playwright/test';

async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-17/${stepName}.png`,
    fullPage: true 
  });
}

test('Test Case 17: Remove Products From Cart', async ({ page }) => {
  // 1. Launch browser - Playwright handles this automatically
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');
  await takeScreenshot(page, 'step-2-navigate-homepage');
  
  // 3. Verify that home page is visible successfully
  await expect(page).toHaveURL(/automationexercise/);
  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
  await takeScreenshot(page, 'step-3-verify-homepage');
  
  // 4. Add products to cart
  // Add first product
  await page.getByText('Add to cart').first().click();
  await expect(page.getByText('Added!')).toBeVisible({ timeout: 5000 });
  await takeScreenshot(page, 'step-4-add-product');
  
  // Close modal
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.waitForTimeout(500);
  
  // 5. Click 'Cart' button
  await page.locator('a[href="/view_cart"]').first().click();
  await takeScreenshot(page, 'step-5-click-cart-button');
  
  // 6. Verify that cart page is displayed
  await expect(page).toHaveURL(/view_cart/);
  await expect(page.getByText('Shopping Cart')).toBeVisible();
  await takeScreenshot(page, 'step-6-verify-cart-page');
  
  // Get initial number of products in cart
  const initialCartItems = await page.locator('tr[id^="product-"]').count();
  console.log(`Initial cart items: ${initialCartItems}`);
  await takeScreenshot(page, 'step-6-initial-cart-items');
  
  // 7. Click 'X' button corresponding to particular product
  // Click the delete button for the first product
  await page.locator('.cart_quantity_delete').first().click();
  await page.waitForTimeout(1000); // Wait for removal animation/update
  await takeScreenshot(page, 'step-7-click-remove-product');
  
  // 8. Verify that product is removed from the cart
  const finalCartItems = await page.locator('tr[id^="product-"]').count();
  console.log(`Final cart items: ${finalCartItems}`);
  
  // Verify that the product was removed (should be 0 items now)
  expect(finalCartItems).toBe(0);
  
  // Verify empty cart message or that cart is empty
  const isCartEmpty = finalCartItems === 0;
  expect(isCartEmpty).toBe(true);
  
  await takeScreenshot(page, 'step-8-verify-product-removed');
  
  console.log(`Product successfully removed! Items before: ${initialCartItems}, Items after: ${finalCartItems}`);
});
