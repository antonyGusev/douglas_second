import ParfumFilters from '../../../mocks/filters/parfum.filters.json';
import {
  TBrandFilters,
  TForWhomFilters,
  THighlightsFilters,
  TPresentForFilters,
  TProductFeatureFilters,
  TProductTypeFilters,
  TScentFilters,
  TScopeOfApplicationFilters,
} from '../../../mocks';

interface IFilters {
  marke: any | null;
  produktart: any | null;
  duftnote: any | null;
  produktmerkmal: any | null;
  furWen: any | null;
  geschenkFur: any | null;
  anwendungsbereich: any | null;
  highlights: any | null;
  preis: any | null;
}

type TFiltersKeys = keyof IFilters;

export class ParfumFiltersBuilder {
  private rootData: any;

  private filters: IFilters = {
    marke: null,
    produktart: null,
    duftnote: null,
    produktmerkmal: null,
    furWen: null,
    geschenkFur: null,
    anwendungsbereich: null,
    highlights: null,
    preis: null,
  };

  constructor() {
    this.rootData = ParfumFilters;
  }

  produktart({ isRandom, value }: { isRandom: true; value: number }): ParfumFiltersBuilder;
  produktart({ isRandom, value }: { isRandom: false; value: TProductTypeFilters[] }): ParfumFiltersBuilder;
  produktart({ isRandom, value }: { isRandom: boolean; value: TProductTypeFilters[] | number }): ParfumFiltersBuilder {
    const existedFilters = Object.keys(ParfumFilters.Produktart);
    const filterName = 'produktart';

    if (isRandom && typeof value === 'number') {
      this.filters[filterName] = randomFilters(filterName, existedFilters, value);
    } else {
      this.filters[filterName] = value;
    }

    return this;
  }

  marke({ isRandom, value }: { isRandom: true; value: number }): ParfumFiltersBuilder;
  marke({ isRandom, value }: { isRandom: false; value: TBrandFilters[] }): ParfumFiltersBuilder;
  marke({ isRandom, value }: { isRandom: boolean; value: TBrandFilters[] | number }): ParfumFiltersBuilder {
    const existedFilters = Object.keys(ParfumFilters.Marke);
    const filterName = 'marke';

    if (isRandom && typeof value === 'number') {
      this.filters[filterName] = randomFilters(filterName, existedFilters, value);
    } else {
      this.filters[filterName] = value;
    }

    return this;
  }

  duftnote({ isRandom, value }: { isRandom: true; value: number }): ParfumFiltersBuilder;
  duftnote({ isRandom, value }: { isRandom: false; value: TScentFilters[] }): ParfumFiltersBuilder;
  duftnote({ isRandom, value }: { isRandom: boolean; value: TScentFilters[] | number }): ParfumFiltersBuilder {
    const existedFilters = Object.keys(ParfumFilters.Duftnote);
    const filterName = 'duftnote';

    if (isRandom && typeof value === 'number') {
      this.filters[filterName] = randomFilters(filterName, existedFilters, value);
    } else {
      this.filters[filterName] = value;
    }

    return this;
  }

  produktmerkmal({ isRandom, value }: { isRandom: true; value: number }): ParfumFiltersBuilder;
  produktmerkmal({ isRandom, value }: { isRandom: false; value: TProductFeatureFilters[] }): ParfumFiltersBuilder;
  produktmerkmal({ isRandom, value }: { isRandom: boolean; value: TProductFeatureFilters[] | number }): ParfumFiltersBuilder {
    const existedFilters = Object.keys(ParfumFilters.Produktmerkmal);
    const filterName = 'produktmerkmal';

    if (isRandom && typeof value === 'number') {
      this.filters[filterName] = randomFilters(filterName, existedFilters, value);
    } else {
      this.filters[filterName] = value;
    }

    return this;
  }

  furWen({ isRandom, value }: { isRandom: true; value: number }): ParfumFiltersBuilder;
  furWen({ isRandom, value }: { isRandom: false; value: TForWhomFilters[] }): ParfumFiltersBuilder;
  furWen({ isRandom, value }: { isRandom: boolean; value: TForWhomFilters[] | number }): ParfumFiltersBuilder {
    const existedFilters = Object.keys(ParfumFilters['Für Wen']);
    const filterName = 'furWen';

    if (isRandom && typeof value === 'number') {
      this.filters[filterName] = randomFilters(filterName, existedFilters, value);
    } else {
      this.filters[filterName] = value;
    }

    return this;
  }

  geschenkFur({ isRandom, value }: { isRandom: true; value: number }): ParfumFiltersBuilder;
  geschenkFur({ isRandom, value }: { isRandom: false; value: TPresentForFilters[] }): ParfumFiltersBuilder;
  geschenkFur({ isRandom, value }: { isRandom: boolean; value: TPresentForFilters[] | number }): ParfumFiltersBuilder {
    const existedFilters = Object.keys(ParfumFilters['Geschenk für']);
    const filterName = 'geschenkFur';

    if (isRandom && typeof value === 'number') {
      this.filters[filterName] = randomFilters(filterName, existedFilters, value);
    } else {
      this.filters[filterName] = value;
    }

    return this;
  }

  anwendungsbereich({ isRandom, value }: { isRandom: true; value: number }): ParfumFiltersBuilder;
  anwendungsbereich({ isRandom, value }: { isRandom: false; value: TScopeOfApplicationFilters[] }): ParfumFiltersBuilder;
  anwendungsbereich({ isRandom, value }: { isRandom: boolean; value: TScopeOfApplicationFilters[] | number }): ParfumFiltersBuilder {
    const existedFilters = Object.keys(ParfumFilters.Anwendungsbereich);
    const filterName = 'anwendungsbereich';

    if (isRandom && typeof value === 'number') {
      this.filters[filterName] = randomFilters(filterName, existedFilters, value);
    } else {
      this.filters[filterName] = value;
    }

    return this;
  }

  highlights({ isRandom, value }: { isRandom: true; value: number }): ParfumFiltersBuilder;
  highlights({ isRandom, value }: { isRandom: false; value: THighlightsFilters[] }): ParfumFiltersBuilder;
  highlights({ isRandom, value }: { isRandom: boolean; value: THighlightsFilters[] | number }): ParfumFiltersBuilder {
    const existedFilters = Object.keys(ParfumFilters.Highlights);
    const filterName = 'highlights';

    if (isRandom && typeof value === 'number') {
      this.filters[filterName] = randomFilters(filterName, existedFilters, value);
    } else {
      this.filters[filterName] = value;
    }

    return this;
  }

  preis(priceRange: {from?: number, to?: number}) {
    this.filters.preis = priceRange;

    return this;
  }

  build() {
    const resultData: Record<string, string[]> = {};

    for (const prop in this.filters) {
      if (this.filters[prop as TFiltersKeys] !== null) {
        resultData[prop] = this.filters[prop as TFiltersKeys];
      }
    }

    return resultData;
  }
}

function randomFilters(filterName: string, filters: string[], count: number) {
  if (filters.length < count) {
    throw new Error(
      `Count is bigger than existed filters. Choose number in range between 1 and ${filters.length} in ${filterName}`,
    );
  }

  return [...filters].sort(() => 0.5 - Math.random()).slice(0, count);
}
