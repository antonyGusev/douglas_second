import { TParfumFilterLabelsClick } from '../../framework/pages/parfum.page/fragments';
import { BaseElement } from '../base.elements';
import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';

export interface IFiltersLabelElement {
  clickOn(data: TParfumFilterLabelsClick[]): Promise<void>;
  getData(): Promise<any>;
}

const resetAllFiltersSelector = 'button.selected-facets__reset';


export class FiltersLabelElement extends BaseElement implements IFiltersLabelElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async clickOn(data: TParfumFilterLabelsClick[]) {
    const currentElement = (await this.initElement()).currentElement;

    for (const label of data) {

      logger.technical(logMessage(this, `clicking: ${label}`));

      if (label === 'resetAll') {
        const resetAllButton = currentElement.locator(resetAllFiltersSelector);
        await resetAllButton.click();
        await resetAllButton.waitFor({state: 'detached'});
      } else if (label === 'preis') {
        const filterLabel = currentElement.locator('button', {hasText: '€'});
        await filterLabel.click();
        await filterLabel.waitFor({state: 'detached'});
      } else {
        const filterLabel = currentElement.locator('button', {hasText: label});
        await filterLabel.click();
        await filterLabel.waitFor({state: 'detached'});
      }

      logger.technical(logMessage(this, `successfully clicked: ${label}`));
    }
  }

  @pwLogging
  async getData() {
    const currentElement = (await this.initElement()).currentElement;

    logger.technical(logMessage(this, `getting data`));

    const labelsList = await currentElement.locator('button').all();

    const result = await labelsList.reduce(async (acc, cur) => {
      const awaitedAcc = await acc;
      const text = await cur.innerText();

      awaitedAcc.push(text);
      
      return awaitedAcc;
    }, Promise.resolve([] as string[]));

    logger.technical(logMessage(this, `successfully got data: ${result}`));

    return result;
  }
}
