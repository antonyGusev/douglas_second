import { BaseElement } from '../base.elements';
import { TIMEOUTS } from '../configs';
import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';

type TParfumFilters =
  | 'produktart'
  | 'marke'
  | 'duftnote'
  | 'produktmerkmal'
  | 'furWen'
  | 'geschenkFur'
  | 'anwendungsbereich'
  | 'highlights'
  | 'preis';

enum FILTER_TITLES_ENUM {
  produktart = 'Produktart',
  marke = 'Marke',
  duftnote = 'Duftnote',
  produktmerkmal = 'Produktmerkmal',
  furWen = 'Für Wen',
  geschenkFur = 'Geschenk für',
  anwendungsbereich = 'Anwendungsbereich',
  highlights = 'Highlights',
  preis = 'Preis',
}

export interface IFiltersTableElement {
  clickOn(data: Record<TParfumFilters, string[]>): Promise<void>;
  sendKeys(data: Record<TParfumFilters, string[] | {from?: number, to?: number}>): Promise<void>
  getData(data: Record<TParfumFilters, null>): Promise<any>;
}

const expandMoreFiltersLocator = 'button[class$="show-more"]';
const filtersMenuLocator = 'div.facet__menu-content';
const closeFiltersLocator = 'button[class$="__close-button"]';
const selectedCheckboxLocator = 'div[class$="--selected"]';
const successIconSlector = 'svg.icon--color-success';

const filterTitleLocator = (text: string) => `div.facet__title:has-text("${FILTER_TITLES_ENUM[text as TParfumFilters]}")`;
const filterOptionLocator = (text: string) => `a:has-text("${text}")`;

export class FiltersTableElement extends BaseElement implements IFiltersTableElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async clickOn(data: Record<TParfumFilters, string[]>) {
    let filterTitle;
    const currentElement = (await this.initElement()).currentElement;

    await currentElement.locator(expandMoreFiltersLocator).click();

    for (const [title, filters] of Object.entries(data)) {

      logger.technical(logMessage(this, `clicking title: ${title}`));

      const filterTitleSelector = filterTitleLocator(title);
      filterTitle = currentElement.locator(filterTitleSelector);
      await filterTitle.click();

      const filtersMenu = currentElement.locator(filtersMenuLocator);

      for (const filter of filters) {

        logger.technical(logMessage(this, `clicking filter: ${filter}`));

        const filterOptionSelector = filterOptionLocator(filter);
        const filterOption = filtersMenu.locator(filterOptionSelector);

        await filterOption.scrollIntoViewIfNeeded();
        await filterOption.click();

        const selectedCheckbox = filterOption.locator(selectedCheckboxLocator);

        try {
          await selectedCheckbox.waitFor({timeout: TIMEOUTS['2_SECONDS']});
        } catch (error: any) {
          
          if (error.message.includes(`Timeout ${TIMEOUTS['2_SECONDS']}ms exceeded`)) {
            const isMenuVisible = await filtersMenu.isVisible();

            if (!isMenuVisible) {
              await filterTitle.click();
              await selectedCheckbox.waitFor({timeout: TIMEOUTS['2_SECONDS']});
            }
          }
        }

        logger.technical(logMessage(this, `successfully clicked filter: ${filter}`));
      }

      await filtersMenu.locator(closeFiltersLocator).click();
    }

    await filterTitle?.locator(successIconSlector).waitFor();
  }

  @pwLogging
  async getData(data: Record<TParfumFilters, null>) {
    let filtersData: Record<string, {}> = {};
    const currentElement = (await this.initElement()).currentElement;

    await currentElement.locator(expandMoreFiltersLocator).click();

    for (const title of Object.keys(data)) {

      logger.technical(logMessage(this, `getting data from: ${title} filters`));

      const filterTitleSelector = filterTitleLocator(title);
      await currentElement.locator(filterTitleSelector).click();

      const filtersMenu = currentElement.locator(filtersMenuLocator);
      const optionsList = await filtersMenu.locator('a.facet-option').all();

      if (title === 'preis') {
        const options = await filtersMenu.locator('input').all();
        filtersData[title] = await options.reduce(
          async (acc, cur) => {
            const awaitedAcc = await acc;

            const inputValue = (await cur.inputValue()).trim();

            const testId = await cur.getAttribute('data-testid');
            const name = testId?.split('-')[1];

            awaitedAcc[`${name}`] = inputValue;

            return awaitedAcc;
          },
          Promise.resolve({} as Record<string, string>),
        );
      } else {
        filtersData[title] = await optionsList.reduce(
          async (acc, cur) => {
            const awaitedAcc = await acc;

            const text = (await cur.innerText()).trim();
            const indexOfQuantity = text.indexOf('(');
            const quantity = text.substring(indexOfQuantity);
            const name = text.replace(quantity, '').trim();

            const css = await cur.locator('div').first().getAttribute('class');

            if (css === null) {
              throw new Error('Filter checkbox css should not be null! Check filter selector');
            }

            const isChecked = css.includes('selected');
            const filterValue = {
              quantity,
              isChecked,
            };

            awaitedAcc[name] = filterValue;

            return awaitedAcc;
          },
          Promise.resolve({} as Record<string, {}>),
        );
      }

      await filtersMenu.locator(closeFiltersLocator).click();
    }
    logger.technical(logMessage(this, `successfully got data: ${filtersData}`));

    return filtersData;
  }

  @pwLogging
  async sendKeys(data: Record<TParfumFilters, string[] | {from?: number, to?: number}>) {
    let filterTitle, searchField;
    const currentElement = (await this.initElement()).currentElement;

    const expandAllFiltersButton = currentElement.locator(expandMoreFiltersLocator);
    await expandAllFiltersButton.click();

    const filtersMenu = currentElement.locator(filtersMenuLocator);

    for (const [title, values] of Object.entries(data)) {

      logger.technical(logMessage(this, `sending keys: ${values} to: ${title}`));

      const expandButtonText = await expandAllFiltersButton.innerText();

      if (expandButtonText.includes('Mehr')) {
        await expandAllFiltersButton.click();
      }

      const filterTitleSelector = filterTitleLocator(title);
      filterTitle = currentElement.locator(filterTitleSelector);
      await filterTitle.click();

      if (title === 'preis' && !Array.isArray(values)) {

        if ('from' in values && 'to' in values) {
          await filtersMenu.getByTestId('preis-from').fill(`${values.from}`);
          await filtersMenu.getByTestId('preis-to').fill(`${values.to}`);
        } else if ('from' in values) {
          await filtersMenu.getByTestId('preis-from').fill(`${values.from}`);
        } else {
          await filtersMenu.getByTestId('preis-to').fill(`${values.to}`);
        }

      } else {

        try {
          searchField = filtersMenu.locator('input');
        } catch (error) {
          logger.error(`Filter ${title} does not have search field!`);
          return;
        }

        for (const value of values as string[]) {
          await searchField.fill(value);
  
          const filterOptionSelector = filterOptionLocator(value);
          const filterOption = filtersMenu.locator(filterOptionSelector);
  
          await filterOption.click();
          await filterOption.locator(selectedCheckboxLocator).waitFor();
        }
      }

      await filtersMenu.locator(closeFiltersLocator).click();
      await filtersMenu.waitFor({state: 'detached'});

      logger.technical(logMessage(this, `successfully sent keys to: ${title}`));
    }

    await filterTitle?.locator(successIconSlector).waitFor();
  }
}
