import { ITestInfo, assert, pwLogging } from '../../lib';
import { IParfumPage, ParfumPage } from '../pages/parfum.page';
import {
  IParfumFiltersClick,
  IParfumFiltersGetData,
  IParfumFiltersSendKeys,
  TParfumFilterLabelsClick,
} from '../pages/parfum.page/fragments';

const parfumPage: IParfumPage = new ParfumPage();

export interface IParfumPageActions {
  filterProducts: (filters: IParfumFiltersClick) => Promise<void>;
  getFiltersData: (filters: IParfumFiltersGetData) => Promise<any>;
  searchInFilter: (filters: IParfumFiltersSendKeys) => Promise<any>;

  assertSelectedFiltersDisplayed: (expectedFilters: string[]) => Promise<void>;
  assertFilteredProductsDisplayed: (expectedFilters: any) => Promise<void>;
}

export class ParfumPageActions implements IParfumPageActions {
  constructor() {}

  @pwLogging
  async filterProducts(filters: IParfumFiltersClick) {
    await parfumPage.clickOn({ mainContent: { parfumFilters: filters } });
  }

  @pwLogging
  async getFiltersData(filters: IParfumFiltersGetData) {
    const {
      mainContent: { parfumFilters },
    } = await parfumPage.getData({ mainContent: { parfumFilters: filters } });

    return parfumFilters;
  }

  @pwLogging
  async searchInFilter(filters: IParfumFiltersSendKeys) {
    await parfumPage.sendKeys({ mainContent: { parfumFilters: filters } });
  }

  @pwLogging
  async resetParfumFilters(...filterToreset: TParfumFilterLabelsClick[]) {
    await parfumPage.clickOn({ mainContent: { parfumFiltersLabels: filterToreset } });
  }

  /**
   *
   *     @Assertion_methods
   */

  @pwLogging
  async assertSelectedFiltersDisplayed(expectedFilters: string[]) {
    const {
      mainContent: { parfumFiltersLabels },
    } = await parfumPage.getData({ mainContent: { parfumFiltersLabels: null } });

    assert(parfumFiltersLabels).stringArrayContainsAllstrings(expectedFilters);
  }

  @pwLogging
  async assertFilteredProductsDisplayed(expectedFilters: any) {
    const {
      mainContent: { parfumGrid },
    } = await parfumPage.getData({ mainContent: { parfumGrid: null } });

    const actualData = [];

    for (const prop in parfumGrid) {
      actualData.push(...parfumGrid[prop]);
    }

    const brands = expectedFilters.marke.map((str: string) => str.toUpperCase());

    actualData.forEach(({ tags, brand, category }) => {
      assert(brand.toUpperCase()).isEqual(brands[0].toUpperCase());
      assert(expectedFilters.produktart).stringArrayContainsString(category);

      if (expectedFilters.highlights[0] === 'Limitiert') {
        return;
      } else {
        assert(tags).stringArrayContainsString(expectedFilters.highlights[0].toUpperCase());
      }
    });
  }
}
