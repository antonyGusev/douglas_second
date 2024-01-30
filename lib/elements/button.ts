import { BaseElement, CanClick, CanGetData } from '../base.elements';
import { applyMixins } from '../helpers';

export interface IButtonElement {
  clickOn(): Promise<void>;
  getData(data: any): Promise<string>;
}

export interface ButtonElement extends CanGetData, CanClick {}

export class ButtonElement extends BaseElement implements IButtonElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }
}

applyMixins(ButtonElement, [CanGetData, CanClick]);
