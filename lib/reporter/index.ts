import { prettifyCamelCase, logger } from '../helpers';
import { test } from '../types';

export function pwLogging(target: any, context: any) {
  const decoratedFunc = target;

  return function (...args: any[]) {
    const constructorName = this.constructor.name;
    let methodName = decoratedFunc.name;

    const condition =
      constructorName.includes('Page') || constructorName.includes('Fragment') || constructorName.includes('Element');

    if (constructorName.includes('PageActions')) {
      const pageName = prettifyCamelCase(constructorName.replace('Actions', ''));
      methodName = `User on ${pageName} ${prettifyCamelCase(methodName)} ${args[0] ? JSON.stringify(args[0]) : ''}`;
      logger.log(methodName);
    } else if (condition) {
      methodName = `${this.name} execute ${methodName} with arguments ${args[0] ? JSON.stringify(args[0]) : ''}`;
      logger.verbose(methodName);
    } else if (constructorName.includes('Browser')) {
      methodName = `${constructorName.replace('Adapter', '')} ${prettifyCamelCase(methodName)} ${args[0] ? args[0] : ''}`;
      logger.log(methodName);
    }

    return test.step(methodName, async () => {
      return await decoratedFunc.call(this, ...args);
    });
  };
}
