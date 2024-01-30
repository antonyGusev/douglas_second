import { ILocator, IPage } from '../lib';

export class Filters {
  private selectors = {
    root: 'div.facet-list',
    expandButton: 'button[class$="show-more"]',
    filterTitles: 'div.facet__title',
    filterMenu: 'div.facet__menu-content',
    filterWraper: 'div.facet',
    filterOption: 'a.facet-option',
  };

  private root: ILocator;
  private expandButton: ILocator;

  constructor(private page: IPage) {
    this.root = this.page.locator(this.selectors.root);
    this.expandButton = this.root.locator(this.selectors.expandButton);
  }

  async getData() {
    await this.expandButton.click();

    const filterTitles = await this.root.locator(this.selectors.filterTitles).all();

    const filtersData = await filterTitles.reduce(async (acc, cur, i, arr) => {
      const awaitedAcc = await acc;

      const filterName = (await cur.innerText()).trim();

      if (filterName === 'Preis') {
        arr.splice(i, 1);
      } else {
        await cur.click();

        const filtersMenu = cur.locator('xpath=..').locator(this.selectors.filterMenu);
        await filtersMenu.waitFor();

        const optionsList = await filtersMenu.locator(this.selectors.filterOption).all();

        awaitedAcc[filterName] = await optionsList.reduce(async (acc, cur) => {
          const awaitedAcc = await acc;

          const text = (await cur.innerText()).trim();
          const indexOfQuantity = text.indexOf('(');
          const quantity = text.substring(indexOfQuantity);
          const name = text.replace(quantity, '').trim();

          const filterVal = { quantity };

          awaitedAcc[`${name}`] = filterVal;

          return awaitedAcc;
        }, Promise.resolve({} as Record<string, {}>));
      }

      return awaitedAcc;
    }, Promise.resolve({} as Record<string, {}>));

    return filtersData;
  }
};
