import { pwLogging } from '../../lib';
import { IMainPage, MainPage } from '../pages/main.page';
import { IParfumPage, ParfumPage } from '../pages/parfum.page';

const mainPage: IMainPage = new MainPage();
const parfumPage: IParfumPage = new ParfumPage();

export interface IMainPageActions {
  selectCookies: (cookies: TCookies) => Promise<void>;
  useNavigationBarToOpen: (destination: 'parfum') => Promise<void>;
}

type TCookies = 'All' | 'Required';

export class MainPageActions implements IMainPageActions {
  constructor() {}

  @pwLogging
  async selectCookies(cookies: TCookies) {
    if (cookies === 'All') {
      await mainPage.clickOn({ selectCookies: { allowAll: null } });
    } else {
      await mainPage.clickOn({ selectCookies: { strictlyRequired: null } });
    }
  }

  @pwLogging
  async useNavigationBarToOpen(destination: 'parfum') {
    await mainPage.clickOn({ header: { navigationSlider: { [destination]: null } } });
    await parfumPage.hover({ mainContent: { parfumCategories: null } });
  }

  /**
   *
   *   @Assertion_methods
   */
}
