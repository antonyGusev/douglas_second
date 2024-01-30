import { IParfumCategories } from '../../framework/pages/parfum.page/fragments';
import { BaseElement } from '../base.elements';
import {  logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';

enum PARFUM_CATEGORIES {
  parfum = '/de/c/parfum/01',
  damendufte = '/de/c/parfum/damenduefte/0101',
  herrendufte = '/de/c/parfum/herrenduefte/0102',
  unisexdufte = '/de/c/parfum/unisex-duefte/0103',
  nischendufte = '/de/c/parfum/nischenduefte/0105',
  duftnoten = '/de/c/parfum/duftnoten/0107',
  travelSize = '/de/c/parfum/travel-size/0108',
  refills = '/de/c/parfum/refills/0125',
  beautyStorys = '/de/c/parfum/beauty-storys/0120',
}

type TParfumOpts = Partial<keyof typeof PARFUM_CATEGORIES>;
type TParfumClick = IParfumCategories;

export interface IULElement {
  clickOn(data: Record<string, null>): Promise<void>;
  hover(data: null | Record<string, null>): Promise<void>;
}

export class ULElement extends BaseElement implements IULElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async clickOn(data: TParfumClick) {
    const optionToSelect = Object.keys(data)[0] as unknown as TParfumOpts;

    logger.technical(logMessage(this, `clicking: ${optionToSelect}`));

    await this.clickOption(optionToSelect);
    await this.page!.waitForLoadState('networkidle');

    logger.technical(logMessage(this, `successfully clicked: ${optionToSelect}`));
  }

  @pwLogging
  async hover(data: null | TParfumClick) {
    if (data === null) {
      logger.technical(logMessage(this, `hovering`));

      const currentElement = (await this.initElement()).currentElement;
      await currentElement.hover();

      logger.technical(logMessage(this, `successfully hovered`));
    } else {
      const optionToSelect = Object.keys(data)[0] as unknown as TParfumOpts;

      logger.technical(logMessage(this, `hovering: ${optionToSelect}`));

      await this.hoverOption(optionToSelect);

      logger.technical(logMessage(this, `successfully hovered: ${optionToSelect}`));
    }
  }

  /**
   *
   * @private_service_methods
   */

  private async clickOption(option: TParfumOpts) {
    const currentElement = (await this.initElement()).currentElement;
    const optionElems = await currentElement.getByRole('link').all();

    for (const elemOpt of optionElems) {
      const linkValue = await elemOpt.getAttribute('href');

      if (linkValue === PARFUM_CATEGORIES[option]) {
        await elemOpt.click();
      }
    }
  }

  private async hoverOption(option: TParfumOpts) {
    const currentElement = (await this.initElement()).currentElement;
    const optionElems = await currentElement.getByRole('link').all();

    for (const elemOpt of optionElems) {
      const linkValue = await elemOpt.getAttribute('href');

      if (linkValue === PARFUM_CATEGORIES[option]) {
        await elemOpt.hover();
      }
    }
  }
}
