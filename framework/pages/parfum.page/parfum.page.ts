import { BasePage, StateType } from '../../../lib';
import {
  HeaderFragment,
  IHeaderFragment,
  IHeaderFragmentClick,
  IHeaderFragmentIsVisible,
  IHeaderFragmentResult,
} from '../shared.fragments';
import {
  IMainContentFragment,
  IMainContentFragmentClick,
  IMainContentFragmentGetData,
  IMainContentFragmentHover,
  IMainContentFragmentResult,
  IMainContentFragmentSendKeys,
  MainContentFragment,
} from './fragments';

interface IParfumPageSendKeys {
  mainContent?: IMainContentFragmentSendKeys;
}

interface IParfumPageClick {
  header?: IHeaderFragmentClick;
  mainContent?: IMainContentFragmentClick;
}

interface IParfumPageGetData {
  mainContent: IMainContentFragmentGetData;
}

interface IParfumPageHover {
  mainContent: IMainContentFragmentHover;
}

interface IParfumPageWaitForPageState {}

interface IParfumPageResult {
  header: IHeaderFragmentResult;
  mainContent: IMainContentFragmentResult;
}

interface IParfumPageIsVisible {
  header?: IHeaderFragmentIsVisible;
}

export interface IParfumPage {
  sendKeys(data: IParfumPageSendKeys): Promise<void>;
  clickOn(data: IParfumPageClick): Promise<void>;
  hover(data: IParfumPageHover): Promise<void>;
  getData(data: IParfumPageGetData): Promise<IParfumPageResult>;
  isVisible(data: IParfumPageIsVisible): Promise<IParfumPageResult>;
  waitForLoaded(data?: StateType): Promise<void>;
  waitForPageState(data: IParfumPageWaitForPageState): Promise<void>;
}

export class ParfumPage extends BasePage implements IParfumPage {
  private header: IHeaderFragment;
  private mainContent: IMainContentFragment;

  constructor() {
    super('body', 'Parfum Douglas page');
    this.header = this.initChild(HeaderFragment, 'header.header', 'Header Fragment');
    this.mainContent = this.initChild(MainContentFragment, 'main.content', 'Main Content Fragment');
  }
}
