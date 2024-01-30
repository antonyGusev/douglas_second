import { BaseFragment, FiltersTableElement, IFiltersTableElement, IULElement, ULElement } from '../../../../lib';
import { FiltersLabelElement, IFiltersLabelElement } from '../../../../lib/elements/filter.label';
import { IProductsTableElement, ProductsTableElement } from '../../../../lib/elements/products.table';
import {
  TBrandFilters,
  TForWhomFilters,
  THighlightsFilters,
  TPresentForFilters,
  TProductFeatureFilters,
  TProductTypeFilters,
  TScentFilters,
  TScopeOfApplicationFilters,
} from '../../../../test.data/mocks/filters/parfum.filters.types';

export type TParfumFilterLabels =
  | TProductTypeFilters
  | TBrandFilters
  | TScentFilters
  | TProductFeatureFilters
  | TForWhomFilters
  | TPresentForFilters
  | TScopeOfApplicationFilters
  | THighlightsFilters;

export type TParfumFilterLabelsClick = TParfumFilterLabels | 'resetAll' | 'preis';

export interface IParfumCategories {
  parfum?: null;
  damendufte?: null;
  herrendufte?: null;
  unisexdufte?: null;
  nischendufte?: null;
  duftnoten?: null;
  travelSize?: null;
  refills?: null;
  beautyStorys?: null;
}

export interface IParfumFiltersClick {
  produktart?: TProductTypeFilters[];
  marke?: TBrandFilters[];
  duftnote?: TScentFilters[];
  produktmerkmal?: TProductFeatureFilters[];
  furWen?: TForWhomFilters[];
  geschenkFur?: TPresentForFilters[];
  anwendungsbereich?: TScopeOfApplicationFilters[];
  highlights?: THighlightsFilters[];
  preis?: [number, number];
}

export interface IParfumFiltersSendKeys {
  produktart?: TProductTypeFilters[];
  marke?: TBrandFilters[];
  duftnote?: TScentFilters[];
  produktmerkmal?: TProductFeatureFilters[];
  geschenkFur?: TPresentForFilters[];
  anwendungsbereich?: TScopeOfApplicationFilters[];
  preis?: { from?: number; to?: number };
}

export interface IParfumFiltersGetData {
  produktart?: null;
  marke?: null;
  duftnote?: null;
  produktmerkmal?: null;
  furWen?: null;
  geschenkFur?: null;
  anwendungsbereich?: null;
  highlights?: null;
  preis?: null;
}

export interface IParfumFiltersResult {
  produktart: any;
  marke: any;
  duftnote: any;
  produktmerkmal: any;
  furWen: any;
  geschenkFur: any;
  anwendungsbereich: any;
  highlights: any;
  preis: any;
}

export interface IMainContentFragmentSendKeys {
  parfumFilters?: IParfumFiltersSendKeys;
}

export interface IMainContentFragmentClick {
  parfumCategories?: IParfumCategories;
  parfumFilters?: IParfumFiltersClick;
  parfumFiltersLabels?: TParfumFilterLabelsClick[];
}

export interface IMainContentFragmentHover {
  parfumCategories?: IParfumCategories | null;
}

export interface IMainContentFragmentGetData {
  parfumFilters?: IParfumFiltersGetData;
  parfumFiltersLabels?: null;
  parfumGrid?: null;
}

export interface IMainContentFragmentResult {
  parfumFilters: IParfumFiltersResult;
  parfumFiltersLabels: Record<string, string>[];
  parfumGrid: any;
}

export interface IMainContentFragmentIsVisible {}

export interface IMainContentFragment {
  sendKeys(data: IMainContentFragmentSendKeys): Promise<void>;
  clickOn(data: IMainContentFragmentClick): Promise<void>;
  hover(data: IMainContentFragmentHover): Promise<void>;
  getData(data: IMainContentFragmentGetData): Promise<IMainContentFragmentResult>;
  isVisible(data: IMainContentFragmentIsVisible): Promise<IMainContentFragmentResult>;
}

export class MainContentFragment extends BaseFragment implements IMainContentFragment {
  private parfumCategories: IULElement;
  private parfumFilters: IFiltersTableElement;
  private parfumFiltersLabels: IFiltersLabelElement;
  private parfumGrid: IProductsTableElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.parfumCategories = this.initChild(ULElement, 'div.left-content-slot', 'Parfum Categories Left Menu');
    this.parfumFilters = this.initChild(FiltersTableElement, 'div.facet-list', 'Parfum Filters');
    this.parfumFiltersLabels = this.initChild(FiltersLabelElement, 'div.selected-facets', 'Parfum Selected Filters');
    this.parfumGrid = this.initChild(ProductsTableElement, '#productlisting', 'Parfum Products Table');
  }
}
