import { IPage, IBrowser, IBrowserContext, chromium, ITestInfo } from '../types';
import { pubsub } from '../helpers';
import { BasePage } from '../base.components';
import { pwLogging } from '../reporter';

interface InitialEntities {
  browser: IBrowser;
  currentPage: IPage;
  browserContext: IBrowserContext;
  pages: IPage[];
  initialPageIndex: number;
}

class BrowserAdapter {
  private currentPage: IPage | null = null;
  private browser: IBrowser | null = null;
  private browserContext: IBrowserContext | null = null;
  private pages: IPage[] = [];
  private initialPageIndex: number | null = null;

  constructor() {
    pubsub.subscribe('entity_Initialization', this.initPageForRemoteCtx.bind(this));
  }

  get page() {
    return this.currentPage;
  }

  private initPageForRemoteCtx<T extends BasePage>(ctx: T): void {
    ctx['initPage'](this.currentPage!);
  }

  async init(): Promise<InitialEntities> {
    this.browser = await chromium.launch();
    this.browserContext = await this.browser.newContext();
    this.currentPage = await this.browserContext.newPage();

    pubsub.publish('current_page', this.currentPage);

    this.pages = this.browserContext.pages();
    this.initialPageIndex = this.findCurrentPageIndex();

    return {
      browser: this.browser,
      currentPage: this.currentPage,
      browserContext: this.browserContext,
      pages: this.pages,
      initialPageIndex: this.initialPageIndex,
    };
  }

  @pwLogging
  async goTo(url: string): Promise<void> {
    const currentPage = this.currentPage ?? (await this.init()).currentPage;
    await currentPage.goto(url);
    await currentPage.waitForLoadState('load');
  }

  async saveVideo(testInfo: ITestInfo): Promise<void> {
    if (process.env.REPORTER === 'ALLURE') {
      await this.browserContext!.close();
      const path = await this.currentPage!.video()?.path();

      await testInfo.attach('video', {
        path,
        contentType: 'video/webm',
      });
    }
  }

  async saveScrenshot(testInfo: ITestInfo): Promise<void> {
    const screenshot = await this.currentPage!.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  }

  @pwLogging
  async close(): Promise<void> {
    await this.browser!.close();

    this.browser = null;
    this.currentPage = null;
    this.browserContext = null;
    this.pages = [];

    pubsub.publish('close_browser', this.currentPage);
  }

  async sleep(timeout = 1000): Promise<void> {
    await (() => new Promise((res) => setTimeout(res, timeout)))();
  }

  /**
   *
   * @private_service_methods
   */

  private getPageGuid = (page: IPage): string => JSON.parse(JSON.stringify(page))._guid;

  private findCurrentPageIndex() {
    return this.pages.findIndex((page) => this.getPageGuid(page) === this.getPageGuid(this.currentPage!));
  }
}

const browser = new BrowserAdapter();

export { browser, BrowserAdapter };
