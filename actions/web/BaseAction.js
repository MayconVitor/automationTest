/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('@playwright/test').Locator} Locator
 */

/**
 * Base Action class with common methods
 */
export class BaseAction {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for page to be loaded
   * @param {string} url
   */
  async waitForUrl(url) {
    await this.page.waitForURL(url, { timeout: 10000 });
  }

  /**
   * Get element by text
   * @param {string} text
   * @returns {Locator}
   */
  async getByText(text) {
    return this.page.getByText(text);
  }
}