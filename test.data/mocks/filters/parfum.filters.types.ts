import ParfumFilters from './parfum.filters.json';

export type TParfumMainFilters = keyof typeof ParfumFilters;

export type TProductTypeFilters = keyof typeof ParfumFilters['Produktart'];
export type TBrandFilters = keyof typeof ParfumFilters['Marke'];
export type TScentFilters = keyof typeof ParfumFilters['Duftnote'];
export type TProductFeatureFilters = keyof typeof ParfumFilters['Produktmerkmal'];
export type TForWhomFilters = keyof typeof ParfumFilters['Für Wen'];
export type TPresentForFilters = keyof typeof ParfumFilters['Geschenk für'];
export type TScopeOfApplicationFilters = keyof typeof ParfumFilters['Anwendungsbereich'];
export type THighlightsFilters = keyof typeof ParfumFilters['Highlights'];
