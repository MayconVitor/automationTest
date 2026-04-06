import { BaseAction } from './BaseAction.js';

/**
 * Action for filling input fields
 */
export class FillAction extends BaseAction {
  /**
   * Fill an input field
   * @param {string} selector - The selector for the input
   * @param {string} value - The value to fill
   */
  async execute(selector, value) {
    await this.page.fill(selector, value);
  }
}