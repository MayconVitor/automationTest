import { test, expect } from '@playwright/test';

async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-13/${stepName}.png`,
    fullPage: true 
  });
}

test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
  // 1. Launch browser - Playwright handles this automatically
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');
  await takeScreenshot(page, 'step-2-navigate-homepage');
   
  // 3. Verify that home page is visible successfully
  await expect(page).toHaveURL(/automationexercise/);
  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
  await takeScreenshot(page, 'step-3-verify-homepage');
   
  // 4. Click 'View Product' for any product on home page
  await page.goto('http://automationexercise.com/product_details/1');
  await takeScreenshot(page, 'step-4-click-view-product');
   
  // 5. Verify product detail is opened
  await expect(page).toHaveURL(/product_details/);
  await expect(page.getByText('Blue Top')).toBeVisible();
  await takeScreenshot(page, 'step-5-verify-product-detail');
   
  // 6. Increase quantity to 4
  await page.locator('#quantity').fill('4');
  await takeScreenshot(page, 'step-6-increase-quantity');
   
  // 7. Click 'Add to cart' button
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await takeScreenshot(page, 'step-7-click-add-to-cart');
   
  // 8. Click 'View Cart' button
  await expect(page.getByText('Added!')).toBeVisible({ timeout: 5000 });
  await page.getByRole('link', { name: 'View Cart' }).first().click();
  await takeScreenshot(page, 'step-8-click-view-cart');
   
  // 9. Verify that product is displayed in cart page with exact quantity
  await expect(page).toHaveURL(/view_cart/);
  await takeScreenshot(page, 'step-9-verify-cart-page');
  
  // Verify quantity is 4
  const cartQuantity = page.locator('.cart_quantity').first();
  await expect(cartQuantity).toHaveText('4');
  await takeScreenshot(page, 'step-10-verify-quantity');
});
