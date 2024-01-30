import { ParfumFiltersBuilder } from '../parfum.filters.data.builder';

export const PARFUM_FILTERS_SALE_TEST_DATA = new ParfumFiltersBuilder()
  .highlights({ isRandom: false, value: ['Sale'] })
  .marke({ isRandom: false, value: ['Armani'] })
  .produktart({ isRandom: false, value: ['Eau de Parfum'] })
  .furWen({ isRandom: false, value: ['Weiblich'] })
  .build();
