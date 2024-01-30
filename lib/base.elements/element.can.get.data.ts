import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';
import { BaseElement } from './base.element';

type TGetDataArgs = {type: 'image', path: string} | any

export class CanGetData extends BaseElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async getData(data: TGetDataArgs): Promise<any> {
    const currentElement = this.currentElement ?? (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `getting data`));

    let result;

    if (data && data.type === 'image') {
      result = await currentElement.screenshot({ path: data.path });
    } else {
      result = (await currentElement.innerText()).trim();
    }

    logger.technical(logMessage(this, `successfully got data: ${result}`));
    return result;
  }
}
