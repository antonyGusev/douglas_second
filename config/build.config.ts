import { IPlaywrightTestConfig, devices, logger } from '../lib';
import { selectBrowser } from './select.browser';

import os from 'os';

const cpuCores = os.cpus();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();
const { MODE, WORKERS, RETRIES, BROWSERS, HEADLESS, TEST_TIMEOUT, REPORTER } = process.env;

export function buildConfig() {
  const config: IPlaywrightTestConfig = {
    globalSetup: require.resolve('./global.setup.ts'),
    testDir: './tests',
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: Number(RETRIES) || process.env.CI ? 2 : 1,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    timeout: Number(TEST_TIMEOUT) || 90000,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      headless: HEADLESS === 'true' ? true : false,
      trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ],
  };

  if (MODE === 'PARALLEL') {
    config.fullyParallel = true;
    config.workers = Number(WORKERS) || cpuCores.length / 3;
  } else if (MODE === 'SINGLE') {
    config.fullyParallel = false;
    config.workers = 1;
  }

  if (REPORTER === 'ALLURE') {
    config.reporter = [
      [
        'allure-playwright',
        {
          detail: true,
          outputFolder: 'allure-results',
          suiteTitle: false,
        },
      ],
    ];
    config.use = {
      ...config.use,
      video: 'on',
      screenshot: 'on',
      contextOptions: {
        recordVideo: {
          dir: './allure-results',
        },
      },
    }
  }

  if (BROWSERS) {
    config.projects = selectBrowser(BROWSERS);
  }

  logger.technical(JSON.stringify(config))

  return config as IPlaywrightTestConfig;
}
