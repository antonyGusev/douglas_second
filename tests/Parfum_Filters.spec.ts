import { provider } from '../framework';

const test = provider.test;

const { USER } = provider.actor;
const { browser } = provider.packages;
const {
  PARFUM_HIGHLIGHTS_JSON,
} = provider.fixtures;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

PARFUM_HIGHLIGHTS_JSON.forEach(({testID, testName, fixture}) => {
  test(`DTC 00${testID} Parfum Filters (${testName})`, async () => {
    const expectedFilterLabels = Object.values(fixture).flat();
  
    await USER.onMainPage.selectCookies('Required');
    await USER.onMainPage.useNavigationBarToOpen('parfum');
    await USER.onParfumPage.filterProducts(fixture as never);
    
    await USER.onParfumPage.assertSelectedFiltersDisplayed(expectedFilterLabels);
    await USER.onParfumPage.assertFilteredProductsDisplayed(fixture);
  });
});
  

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
