import { BaseAbstraction } from '../base.abstractions';
import { logger } from './logger';

export const waiters = {
  waitForVisible: async (ctx: BaseAbstraction, timeout: number) => {
    const { page, selector } = ctx;
    logger.technical(`Wait for selector: ${selector}, during ${timeout / 1000} seconds`);

    await page!.waitForSelector(selector, { state: 'visible', timeout })
  }
};
