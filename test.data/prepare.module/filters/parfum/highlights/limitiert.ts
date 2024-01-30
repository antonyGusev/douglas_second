import { ParfumFiltersBuilder } from '../parfum.filters.data.builder';

export const PARFUM_FILTERS_LIMITIERT_TEST_DATA = new ParfumFiltersBuilder()
  .highlights({ isRandom: false, value: ['Limitiert'] })
  .marke({ isRandom: false, value: ['Annayake'] })
  .produktart({ isRandom: false, value: ['Eau de Toilette'] })
  .furWen({ isRandom: false, value: ['Männlich'] })
  .build();
