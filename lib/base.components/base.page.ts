import { pwLogging } from '../reporter';
import { isObject, isPrimitive, isString, waitForCondition, isEqual, logger, stringifyValue } from '../helpers';
import { TIMEOUTS } from '../configs';
import { AbstractComponent } from '../base.abstractions';

export type StateType = 'load' | 'domcontentloaded' | 'networkidle';
export type OptionsType = { timeout?: number | undefined };

export class BasePage extends AbstractComponent {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async waitForPageState(data: Record<string, any>) {
    logger.technical(`Wait for page state: ${stringifyValue(data)}, during ${TIMEOUTS['60_SECONDS'] / 1000} seconds`);

    function checkThatStringsInData(dataObj: Record<string, any>) {
      for (const key of Object.keys(dataObj)) {
        if (isObject(dataObj[key])) {
          const result = checkThatStringsInData(dataObj[key]);
          if (result) {
            return true;
          }
        } else if (isPrimitive(dataObj[key]) && isString(dataObj[key])) {
          return true;
        }
      }
      return false;
    }

    const conditionToCall = checkThatStringsInData(data) ? 'getData' : 'isVisible';

    await waitForCondition(
      async () => {
        const thisCallResult = await this[conditionToCall]({ ...data });

        return isEqual(thisCallResult, data);
      },
      {
        timeout: TIMEOUTS['60_SECONDS'],
        interval: TIMEOUTS['1_SECOND'],
        message: `${this.name} should have condition: ${JSON.stringify(data)}`,
      },
    );
  }

  async waitForLoaded(state?: StateType, options?: OptionsType): Promise<void> {
    logger.technical(`Waiting for page to be loaded, during ${TIMEOUTS['30_SECONDS'] / 1000} seconds`);

    await this.page!.waitForLoadState(state, options);
  }
}
