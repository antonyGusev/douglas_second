import { devices } from '../lib';

/**
 *  Adding new browser to config don't forget to add it's name
 *  to BROWSERS_TO_RUN and browserNames in select.browser module
 */

/* Test against mobile viewports. */
export const mobileBrowsers = [
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
  },
];

/* Test against branded browsers. */
export const brandedBrowsers = [
  {
    name: 'Microsoft Edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
  },
  {
    name: 'Google Chrome',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  },
];

export const modernBrowsers = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },

  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },

  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
];

export const allBrowsers = [...mobileBrowsers, ...modernBrowsers, ...brandedBrowsers];
