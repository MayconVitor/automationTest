import { BaseAction } from './BaseAction.js';

/**
 * Action for clicking elements
 */
export class ClickAction extends BaseAction {
  /**
   * Click on a selector
   * @param {string} selector - The selector to click
   * @param {object} options - Click options
   */
  async execute(selector, options = {}) {
    await this.page.click(selector, options);
  }
}