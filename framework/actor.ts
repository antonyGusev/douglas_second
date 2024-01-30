import {
  IMainPageActions,
  MainPageActions,
  IParfumPageActions,
  ParfumPageActions,
} from './actions';

interface IActor {
  onMainPage: IMainPageActions;
  onParfumPage: IParfumPageActions
}

class Actor implements IActor {

  public onMainPage: IMainPageActions;
  public onParfumPage: IParfumPageActions;

  constructor() {
    this.onMainPage = new MainPageActions();
    this.onParfumPage = new ParfumPageActions();
  }
}

const USER: IActor = new Actor();

export { USER, IActor };
