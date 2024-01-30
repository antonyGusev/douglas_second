export class TestDataBuilder {
  private testData: any[] = [];
  private counter: number = 1;

  constructor() {

  }

  add(fixture: any) {
    const data = { testID: this.counter, testName: processTestName(fixture), fixture };

    this.testData.push(data);
    this.counter += 1;

    return this;
  }

  build() {
    this.counter = 1;
    return this.testData;
  }
};

function processTestName(fixture: any) {
  let result = '';

  for (const key in fixture) {
    result += `"${key}": ${JSON.stringify(fixture[key])}; `;
  }

  return result.trim().slice(0, -1);
}
