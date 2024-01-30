import { browser, test } from '../lib';
import { USER } from './actor';

import PARFUM_HIGHLIGHTS_JSON from '../test.data/fixtures/filters/parfum.highlights.filters.json';

const provider = {
  get actor() {
    return { USER };
  },
  get test() {
    return test;
  },
  get packages() {
    return { browser };
  },
  get fixtures() {
    return { PARFUM_HIGHLIGHTS_JSON };
  },
};

export { provider };
