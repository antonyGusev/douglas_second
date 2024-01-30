import { pubsub } from '../helpers';
import { IPage } from '../types';

export abstract class BaseAbstraction {
  protected _page: IPage | undefined;
  protected _selector: string;
  protected _name: string;

  constructor(selector: string, name: string) {
    this._selector = selector;
    this._name = name;

    pubsub.publish('entity_Initialization', this);
    pubsub.subscribe('current_page', this.initPage.bind(this));
  }

  get name() {
    return this._name;
  }

  get selector() {
    return this._selector
  }

  get page() {
    return this._page;
  }

  protected initPage(page: IPage) {
    this._page = page;
  }
}
