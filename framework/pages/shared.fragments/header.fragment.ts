import { BaseFragment, BaseFragmentValues, ISliderElement, SliderElement } from '../../../lib';

export interface INavigationSlider {
  videos?: null;
  markens?: null;
  parfum?: null;
  makeUp?: null;
  gesicht?: null;
  koerper?: null;
  haare?: null;
  aphotekeAndGesundheit?: null;
  douglasCollection?: null;
  homeAndLifeStyle?: null;
  sale?: null;
  skincareWeeks?: null;
  nachhaltigkeit?: null;
  luxus?: null;
  neu?: null;
}

export interface IHeaderFragmentSendKeys {}

export interface IHeaderFragmentClick {
  navigationSlider?: INavigationSlider;
}

export interface IHeaderFragmentGetData {}

export interface IHeaderFragmentResult {}

export interface IHeaderFragmentIsVisible {}

export interface IHeaderFragment {
  sendKeys(data: BaseFragmentValues): Promise<void>;
  clickOn(data: BaseFragmentValues): Promise<void>;
  getData(data: BaseFragmentValues): Promise<IHeaderFragmentResult>;
  isVisible(data: BaseFragmentValues): Promise<IHeaderFragmentIsVisible>;
}

export class HeaderFragment extends BaseFragment implements IHeaderFragment {
  private navigationSlider: ISliderElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.navigationSlider = this.initChild(SliderElement, 'nav div.swiper-wrapper', 'Navigation Slider');
  }
}
