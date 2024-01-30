import { INavigationSlider } from '../../framework/pages/shared.fragments';
import { BaseElement } from '../base.elements';
import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';

enum NAVIGATION_SLIDER_OPTIONS {
  videos = '/de/cp/videos/video-overview',
  markens = '/de/brands',
  parfum = '/de/c/parfum/01',
  makeUp = '/de/c/make-up/03',
  gesicht = '/de/c/gesicht/12',
  koerper = '/de/c/koerper/13',
  haare = '/de/c/haare/14',
  aphotekeAndGesundheit = '/de/c/apotheke-gesundheit/07',
  douglasCollection = '/de/b/douglas-collection/b9834',
  homeAndLifeStyle = '/de/c/home-lifestyle/15',
  sale = '/de/c/sale/05',
  skincareWeeks = '/de/c/skincare-health-weeks/25',
  nachhaltigkeit = '/de/c/nachhaltigkeit/59',
  luxus = '/de/c/luxuswelt/29',
  neu = '/de/c/neuheiten/09',
}

type TSliderOpts = Partial<keyof typeof NAVIGATION_SLIDER_OPTIONS>;
type TSliderClick = INavigationSlider;

export interface ISliderElement {
  clickOn(data: any): Promise<void>;
}

export class SliderElement extends BaseElement implements ISliderElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async clickOn(data: TSliderClick) {
    const optionToSelect = Object.keys(data)[0] as unknown as TSliderOpts;

    logger.technical(logMessage(this, `clicking: ${optionToSelect}`));

    await this.clickOption(optionToSelect);

    logger.technical(logMessage(this, `successfully clicked: ${optionToSelect}`));

    await this.page!.waitForLoadState('networkidle');
  }

  /**
   *
   * @private_service_methods
   */

  private async clickOption(option: TSliderOpts) {
    const currentElement = (await this.initElement()).currentElement;
    const optionElems = await currentElement.locator('a.link').all();

    for (const elemOpt of optionElems) {
      const linkValue = await elemOpt.getAttribute('href');

      if (linkValue === NAVIGATION_SLIDER_OPTIONS[option]) {
        await elemOpt.click();
      }
    }
  }
}
