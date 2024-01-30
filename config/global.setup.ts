import { logger, chromium } from '../lib';
import { Filters } from './get.filters.data.to.mock';
import { createTestData } from './create.test.data';
import { PARFUM_HIGHLIGHTS_TEST_DATA } from '../test.data';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filters = new Filters(page);

  await page.goto(process.env.RUN_ENV!);

  const dialog = page.getByRole('dialog');
  await dialog.waitFor();
  await dialog.locator('button[class$="deny-all"]').click();

  await page.locator('a.link--nav-heading', { hasText: 'PARFUM' }).click();
  await page.locator('div.left-content-slot').hover();

  const filtersData = await filters.getData();

  await createTestData(filtersData, './test.data/mocks/filters/parfum.filters.json');
  await createTestData(PARFUM_HIGHLIGHTS_TEST_DATA, './test.data/fixtures/filters/parfum.highlights.filters.json')

  logger.technical('Global setup finished successfully');
}

export default globalSetup;
