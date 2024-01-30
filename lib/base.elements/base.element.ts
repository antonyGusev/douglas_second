import { IPage, ILocator, IMouse } from '../types';
import { waiters, logger, logMessage } from '../helpers';
import { TIMEOUTS } from '../configs';
import { pwLogging } from '../reporter';
import { BaseAbstraction } from '../base.abstractions';

type TInitResult = { currentElement: ILocator; mouse: IMouse };

export class BaseElement extends BaseAbstraction {
  protected currentElement: ILocator | null = null;
  protected mouse: IPage['mouse'] | undefined;

  constructor(selector: string, name: string) {
    super(selector, name)
  }

  protected initPage(page: IPage): void {
    this._page = page;
    this.currentElement = null;
  }

  protected async initElement(): Promise<TInitResult> {
    await waiters.waitForVisible(this, TIMEOUTS['45_SECONDS']);
    this.currentElement = this._page!.locator(this.selector);
    this.mouse = this._page!.mouse;

    return {
      currentElement: this.currentElement,
      mouse: this.mouse,
    };
  }

  @pwLogging
  async hover(data: any): Promise<void> {
    const currentElement = (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `hovering`));

    await currentElement.hover();
    logger.technical(logMessage(this, `successfully hovered`));
  }

  @pwLogging
  async isVisible(data: any): Promise<boolean> {

    let result: boolean;

    if (data === false) {
      logger.technical(logMessage(this, `checking that element is not visible`));

      await this.page?.locator(this.selector).waitFor({ state: 'detached' });
      result = data;
    } else {
      logger.technical(logMessage(this, `checking that element is visible`));

      const currentElement = this.currentElement ?? (await this.initElement()).currentElement;
      result = await currentElement.isVisible();
    }
    logger.technical(logMessage(this, `visibility is: ${result}`));

    return result;
  }
}
