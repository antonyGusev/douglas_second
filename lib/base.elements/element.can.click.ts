import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';
import { BaseElement } from './base.element';

export class CanClick extends BaseElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async clickOn(data?: any): Promise<void> {
    const currentElement = (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `clicking`));

    await currentElement.click();
    logger.technical(logMessage(this, `successfully clicked`));
  }
}
