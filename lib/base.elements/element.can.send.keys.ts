import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';
import { BaseElement } from './base.element';

export class CanSendKeys extends BaseElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async sendKeys(value: string): Promise<void> {
    const currentElement = (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `sending keys: ${value}`));

    await currentElement.fill(value);
    logger.technical(logMessage(this, `successfully sent keys`));
  }
}
