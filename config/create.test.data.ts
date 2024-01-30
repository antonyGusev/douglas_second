import { FS } from '../lib';

export async function createTestData(testData: any, path: string) {
  await FS.writeJsonToFile(testData, path);
}
