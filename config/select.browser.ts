import { IViewportSize } from '../lib';
import { allBrowsers, brandedBrowsers, mobileBrowsers, modernBrowsers } from './browsers';

type TBrowserProp = {
  name: string;
  use: {
    viewport: IViewportSize;
    userAgent: string;
    deviceScaleFactor: number;
    isMobile: boolean;
    hasTouch: boolean;
    defaultBrowserType: 'chromium' | 'firefox' | 'webkit';
  };
};

const BROWSERS_TO_RUN = {
  chromium: 'chromium',
  firefox: 'firefox',
  webkit: 'webkit',
  mobile_chrome: 'Mobile Chrome',
  mobile_safari: 'Mobile Safari',
  branded_chrome: 'Google Chrome',
  branded_edge: 'Microsoft Edge',
  modern: 'modern',
  mobile: 'mobile',
  branded: 'branded',
};

const browserNames = [
  'modern',
  'chromium',
  'firefox',
  'webkit',
  'mobile',
  'mobile_chrome',
  'mobile_safari',
  'branded',
  'branded_chrome',
  'branded_edge',
];

function trimBrowsersList(browsers: string | undefined) {
  const condition = browsers?.includes(' ') || browsers?.includes(',');

  if (!condition) {
    return [browsers]
  }
  
  const initialArr = browsers?.split(/(,\s|,|\s)/);

  const browsersArr = initialArr?.filter((br) => {
    for (const browser of browserNames) {
      if (br === browser) return br;
    }
  })

  return browsersArr;
}

export function selectBrowser(BROWSERS: string | undefined): TBrowserProp[] {
  const brArr: TBrowserProp[] = [];

  const browsersArr = trimBrowsersList(BROWSERS);

  if (browsersArr?.includes('all')) {
    return allBrowsers;
  }

  if (browsersArr?.includes('modern')) {
    const i = browsersArr.indexOf('modern');
    browsersArr.splice(i, 1)
    brArr.push(...modernBrowsers)
  }

  if (browsersArr?.includes('mobile')) {
    const i = browsersArr.indexOf('mobile');
    browsersArr.splice(i, 1)
    brArr.push(...mobileBrowsers)
  }

  if (browsersArr?.includes('branded')) {
    const i = browsersArr.indexOf('branded');
    browsersArr.splice(i, 1)
    brArr.push(...brandedBrowsers)
  }

  for (const browser of browsersArr!) {
    const br = allBrowsers.filter((b) => {
      return b.name === BROWSERS_TO_RUN[browser as keyof typeof BROWSERS_TO_RUN];
    });
    brArr.push(...br);
  }

  return brArr;
}
