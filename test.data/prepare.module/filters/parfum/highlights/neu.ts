import { ParfumFiltersBuilder } from '../parfum.filters.data.builder';

export const PARFUM_FILTERS_NEU_TEST_DATA = new ParfumFiltersBuilder()
  .highlights({ isRandom: false, value: ['NEU'] })
  .marke({ isRandom: false, value: ['Carner Barcelona'] })
  .produktart({ isRandom: false, value: ['Eau de Parfum'] })
  .furWen({ isRandom: false, value: ['Unisex'] })
  .build();
