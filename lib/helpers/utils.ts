import { deepStrictEqual } from 'assert';
import { BaseAbstraction } from '../base.abstractions';

import { camelize } from 'sat-utils';

function prettifyCamelCase(camelCaseString: string): string {
  let humanReadableString = '';
  for (let index = 0; index < camelCaseString.length; index++) {
    const char = camelCaseString.charAt(index);

    if (index === 0) {
      humanReadableString += char.toUpperCase();
    } else if (Number.isInteger(+char) || (char !== char.toLowerCase() && char === char.toUpperCase())) {
      humanReadableString += ` ${char}`;
    } else {
      humanReadableString += char;
    }
  }

  return humanReadableString;
}

function isEqual(a: any, b: any) {
  try {
    deepStrictEqual(a, b);
    return true;
  } catch {
    return false;
  }
}

type TReplacer = (this: any, key: string, value: any) => any;

const stringifyValue = (value: any, replacer?: TReplacer, space?: number) => {
  if (value === null) return '';
  return JSON.stringify(value, replacer, space);
};

const logMessage = (cls: BaseAbstraction, msg: string) => {
  let message = `${cls.name} selector: ${cls.selector} ` + msg;
  return message;
}

const normalizeCamelize = (str: string) => camelize(str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase());

export { isEqual, stringifyValue, logMessage, prettifyCamelCase, normalizeCamelize };
