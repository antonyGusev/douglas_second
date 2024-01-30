import { expect } from 'chai';

const errorMessage = (msg: string, expected: any, actual: any, dataToLog?: any) => {
  if (!!dataToLog) {
    return `${msg}.
      EXPECTED: ${JSON.stringify(expected, null, '  ')},
      ACTUAL: ${JSON.stringify(actual, null, '  ')}
      TEST DATA: ${JSON.stringify(dataToLog, null, '  ')}`;
  } else {
    return `${msg}.
      EXPECTED: ${JSON.stringify(expected, null, '  ')},
      ACTUAL: ${JSON.stringify(actual, null, '  ')}\n`;
  }
};

export interface IAssertion {
  (actualResult: any): {
    arrayHasSameObjects: (expectedResult: Record<string, any>[], testDataToLog?: any) => Chai.Assertion;
    stringArraysEqual: (expectedResult: string[], testDataToLog?: any) => Chai.Assertion;
    stringArraysNotEqual: (expectedResult: string[], testDataToLog?: any) => Chai.Assertion;
    stringArrayContainsAllstrings: (expectedResult: string[], testDataToLog?: any) => Chai.Assertion;
    stringArrayContainsString: (expectedResult: string[], testDataToLog?: any) => Chai.Assertion;
    stringContains: (expectedResult: string, testDataToLog?: any) => Chai.Assertion;
    isEqual: (expectedResult: any, testDataToLog?: any) => Chai.Assertion;
    isTrue: (expectedResult: string, testDataToLog?: any) => Chai.Assertion;
  };
}

export const assert: IAssertion = function (actualResult: any) {
  return {
    arrayHasSameObjects: (expectedResult: Record<string, any>[], testDataToLog?: any) => {
      return expect(actualResult).to.have.deep.members(
        expectedResult,
        errorMessage('Arrays should have the same objects, but they are not', expectedResult, actualResult, testDataToLog),
      );
    },
    /* Assert not sorted arrays of strings */
    stringArraysEqual: (expectedResult: string[], testDataToLog?: any) => {
      return expect(actualResult).to.eql(
        expectedResult,
        errorMessage('Array should have the same strings, but they are not', expectedResult, actualResult, testDataToLog),
      );
    },
    stringArraysNotEqual: (expectedResult: string[], testDataToLog?: any) => {
      return expect(actualResult).to.not.eql(
        expectedResult,
        errorMessage('Array should not have the same strings, but they are', expectedResult, actualResult, testDataToLog),
      );
    },
    stringArrayContainsAllstrings(expectedResult: string[], testDataToLog?: any) {
      return expect(actualResult).to.include.members(
        expectedResult,
        errorMessage('Array should have all strings, but it does not', expectedResult, actualResult, testDataToLog)
      )
    },
    stringArrayContainsString(expectedResult: string[], testDataToLog?: any) {
      return expect(actualResult).to.include(
        expectedResult,
        errorMessage('Array should include string, but it does not', expectedResult, actualResult, testDataToLog)
      )
    },
    stringContains(expectedResult: string, testDataToLog?: any) {
      return expect(actualResult).contains(
        expectedResult,
        errorMessage('String should have the given string, but they are not', expectedResult, actualResult, testDataToLog),
      );
    },
    isEqual(expectedResult: any, testDataToLog?: any) {
      return expect(actualResult).to.equal(
        expectedResult,
        errorMessage('Values should be the same, but they are not', expectedResult, actualResult, testDataToLog),
      );
    },
    isTrue() {
      return expect(actualResult).to.be.true;
    },
  };
};
