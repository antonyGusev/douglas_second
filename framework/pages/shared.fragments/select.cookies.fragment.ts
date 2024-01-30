import { BaseFragment, BaseFragmentValues, IButtonElement, ButtonElement } from '../../../lib';

export interface ISelectCookiesFragmentSendKeys {}

export interface ISelectCookiesFragmentClick {
  strictlyRequired?: null;
  allowAll?: null;
}

export interface ISelectCookiesFragmentGetData {}

export interface ISelectCookiesFragmentResult {}

export interface ISelectCookiesFragmentIsVisible {}

export interface ISelectCookiesFragment {
  sendKeys(data: BaseFragmentValues): Promise<void>;
  clickOn(data: BaseFragmentValues): Promise<void>;
  getData(data: BaseFragmentValues): Promise<ISelectCookiesFragmentResult>;
  isVisible(data: BaseFragmentValues): Promise<ISelectCookiesFragmentIsVisible>;
}

export class SelectCookiesFragment extends BaseFragment implements ISelectCookiesFragment {
  private strictlyRequired: IButtonElement;
  private allowAll: IButtonElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.strictlyRequired = this.initChild(ButtonElement, 'button[class$="deny-all"]', 'Only Strictly Required');
    this.allowAll = this.initChild(ButtonElement, 'button[class$="accept-all"]', 'Accept All');
  }
}
