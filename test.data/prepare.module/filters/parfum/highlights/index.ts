import { PARFUM_FILTERS_LIMITIERT_TEST_DATA } from './limitiert';
import { PARFUM_FILTERS_NEU_TEST_DATA } from './neu';
import { PARFUM_FILTERS_SALE_TEST_DATA } from './sale';

import { TestDataBuilder } from '../../../../test.data.builder';

export const PARFUM_HIGHLIGHTS_TEST_DATA = new TestDataBuilder()
  .add(PARFUM_FILTERS_SALE_TEST_DATA)
  .add(PARFUM_FILTERS_NEU_TEST_DATA)
  .add(PARFUM_FILTERS_LIMITIERT_TEST_DATA)
  .build();
