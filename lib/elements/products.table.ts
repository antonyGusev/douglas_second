import { BaseElement } from '../base.elements';
import { TIMEOUTS } from '../configs';
import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';
import { ILocator } from '../types';

export interface IProductsTableElement {
  getData(data: any): Promise<any>;
}

export class ProductsTableElement extends BaseElement implements IProductsTableElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async getData(data: any) {

    logger.technical(logMessage(this, `getting data`));

    let tableData: Record<string, Record<string, any>[]> = {};
    let pageCount, paginationTextArr;
    let counter = 1;

    const rootPagination = this.page!.getByTestId('pagination');
    const isPaginationPresent = await rootPagination.isVisible();

    if (isPaginationPresent) {
      await rootPagination.scrollIntoViewIfNeeded();
      const paginationText = (await rootPagination.getByTestId('pagination-title-dropdown').innerText()).trim();
      paginationTextArr = paginationText.split(' ');
      pageCount = +paginationTextArr[paginationTextArr.length - 1];
    }

    while (counter <= pageCount!) {
      const currentElement = (await this.initElement()).currentElement;
      await this.page!.locator('div.sort-facet').scrollIntoViewIfNeeded();

      const productsLists = await currentElement.locator('div.product-grid').all();

      const productTiles = await productsLists.reduce(
        async (acc, cur) => {
          const awaitedAcc = await acc;
          const arr = await cur.getByTestId('product-tile').all();

          awaitedAcc.push(...arr);

          return awaitedAcc;
        },
        Promise.resolve([] as any[]),
      );

      const productTilesData = await productTiles.reduce(
        async (acc, cur: ILocator) => {
          const awaitedAcc = await acc;
          const tileData: any = {};

          tileData['tags'] = await this.getTagsData(cur);
          tileData['wishlistButton'] = await this.getWishlistData(cur);
          tileData['image'] = await this.getImageData(cur);
          tileData['brand'] = await this.getText(cur, 'div.top-brand');
          tileData['brand_line'] = await this.getTextIfExist(cur, 'div.brand-line', TIMEOUTS['0.5_SECOND']);
          tileData['name'] = await this.getTextIfExist(cur, 'div.name', TIMEOUTS['0.5_SECOND']);
          tileData['category'] = await this.getText(cur, 'div.category');

          const { discountPrice, recomendedPrice } = await this.processPrice(cur);
          const { volume, literPrice } = await this.processBasePrice(cur);
          const { rating, feedbacksNumber } = await this.processRatings(cur);

          tileData['recomendedPrice'] = recomendedPrice;
          tileData['discountPrice'] = discountPrice;
          tileData['volume'] = volume;
          tileData['literPrice'] = literPrice;
          tileData['rating'] = rating;
          tileData['feedbacksNumber'] = feedbacksNumber;

          awaitedAcc.push(tileData);

          return awaitedAcc;
        },
        Promise.resolve([] as any[]),
      );

      tableData[`page_${counter}`] = productTilesData;

      if (isPaginationPresent && pageCount! > 1) {
        await rootPagination.getByTestId('pagination-arrow-right').click();
      }

      counter += 1;
    }

    logger.technical(logMessage(this, `successfully got data: ${JSON.stringify(tableData)}`));

    return tableData;
  }

  /**
   *   @private_methods
   */

  private async getTextIfExist(root: ILocator, selector: string, timeout: number) {
    let result;
    const elem = root.locator(selector);

    try {
      await elem.waitFor({ timeout });
      result = await elem.innerText();
    } catch (error: any) {
      if (error.message.includes(`Timeout ${timeout}ms exceeded`)) {
        result = null;
      }
    }

    return result;
  }

  private async getTagsData(root: ILocator) {
    return root.getByTestId('product-eyecatcher').allInnerTexts();
  }

  private async getWishlistData(root: ILocator) {
    const wishlistButtonLocator = root.locator('button[class*="wishlist"]');
    const wishlistCss = await wishlistButtonLocator.locator('svg').getAttribute('class');

    return { inWishlist: wishlistCss?.includes('active') };
  }

  private async getText(root: ILocator, selector: string) {
    const result = await root.locator(selector).innerText();
    return result;
  }

  private async getImageData(root: ILocator) {
    const img = root.locator('img');
    const src = await img.getAttribute('src');

    return { source: src };
  }

  private async processBasePrice(root: ILocator) {
    const literPriceText = await root.locator('div.base-price-row').innerText();
    const literPriceArr = literPriceText.split('(');

    return {
      volume: literPriceArr[0].trim(),
      literPrice: literPriceArr[1].split('/')[0].trim(),
    };
  }

  private async processPrice(root: ILocator) {
    const basePriceArr = await root.locator('div.price-row').allInnerTexts();

    return basePriceArr.reduce(
      (acc, cur) => {
        if (cur.includes('\n')) {
          const strArr = cur.split('\n');

          acc.recomendedPrice = strArr[0].replace('UVP', 'UVP ');
          acc.discountPrice = strArr[1];
        } else {
          acc.recomendedPrice = cur;
          acc.discountPrice = null;
        }

        return acc;
      },
      {} as { recomendedPrice: string; discountPrice: string | null },
    );
  }

  private async processRatings(root: ILocator) {
    const elem = root.getByTestId('ratings-info');

    try {
      await elem.waitFor({ timeout: TIMEOUTS['0.5_SECOND'] });

      const ratingsStr = await elem.innerText();
      const ratingsArr = ratingsStr.split('(');

      return {
        rating: ratingsArr[0].trim(),
        feedbacksNumber: ratingsArr[1].replace(')', ''),
      };
    } catch (error: any) {
      return {
        rating: null,
        feedbacksNumber: null,
      };
    }
  }
}
