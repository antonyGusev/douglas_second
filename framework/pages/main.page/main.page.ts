import { BasePage, ButtonElement, IButtonElement, StateType } from '../../../lib';
import {
  HeaderFragment,
  IHeaderFragment,
  IHeaderFragmentClick,
  IHeaderFragmentIsVisible,
  IHeaderFragmentResult,
  ISelectCookiesFragment,
  ISelectCookiesFragmentClick,
  SelectCookiesFragment,
} from '../shared.fragments';

interface IMainPageSendKeys {}

interface IMainPageClick {
  header?: IHeaderFragmentClick;
  selectCookies?: ISelectCookiesFragmentClick;
}

interface IMainPageGetData {}

interface IMainPageHover {}

interface IMainPageWaitForPageState {
  selectCookies?: boolean;
}

interface IMainPageResult {
  header: IHeaderFragmentResult;
}

interface IMainPageIsVisible {
  header?: IHeaderFragmentIsVisible;
}

export interface IMainPage {
  sendKeys(data: IMainPageSendKeys): Promise<void>;
  clickOn(data: IMainPageClick): Promise<void>;
  getData(data: IMainPageGetData): Promise<IMainPageResult>;
  hover(data: IMainPageHover): Promise<void>;
  isVisible(data: IMainPageIsVisible): Promise<IMainPageResult>;
  waitForLoaded(data?: StateType): Promise<void>;
  waitForPageState(data: IMainPageWaitForPageState): Promise<void>;
}

export class MainPage extends BasePage implements IMainPage {
  private header: IHeaderFragment;
  private selectCookies: ISelectCookiesFragment;

  constructor() {
    super('body', 'Main Douglas page');
    this.header = this.initChild(HeaderFragment, 'header.header', 'Header Fragment');
    this.selectCookies = this.initChild(SelectCookiesFragment, 'div[role="dialog"]', 'Privacy Settings Dialog Window');
  }
}
