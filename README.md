# Douglas Playwright Automation Testing Framework (Test Task)

This Automation Testing Framework for "Douglas" application.\
It's made for the purpose of demonstrating my ability to create testing frameworks.\
I used Playwright to interact with browser and run test cases, and Allure for the reporting system.\
This framework written with ability to be run on different environments and have several options to run,\
including debug mode and parallel mode.\
I've written this framework in BDD style using common patterns as Page Object and Screen Play.

## Test Example

```typescript
test('=== YOUR TEST NAME ===', async () => {
  await user.onMainPage.selectCookies('All');
  await user.onMainPage.verifyCookiesIs('All');
});
```

## Installation

Before cloning the repository ensure that you have installed Node.JS, Java and JAVA_HOME path is set.\
If not, you can install them via next links:\
Node.JS - https://nodejs.org/en/download/current \
Java - https://www.oracle.com/cis/java/technologies/downloads/ \
How to set JAVA_HOME - https://www.baeldung.com/java-home-on-windows-7-8-10-mac-os-x-linux \
Java is necessary for generating and viewing Allure reports.

When preconditions are met please clone the repository and run "npm install" command in the terminal.

```bash
npm install
```

That's it. You can run the tests.

## Usage

```bash
# runs tests in the single thread mode with default setup.
npm run test

# runs tests in the single thread mode with informational console logging for understanding what's happening in the test.
npm run test:console:info

# runs tests in the single thread mode with extended informational console logging.
npm run test:console:verbose

# runs tests in the single thread mode with console logging displaying only errors.
npm run test:console:error

# runs tests in the single thread mode with verbose console logging for debug test.
npm run test:console:debug

# runs tests in the parallel mode.
npm run test:parallel

# generates Allure report
npm run report

# Deleting reports
npm run delete:report

```

## Notice

After installing necessary things, create .env file to store env variables for local running with such variables:

```bash
RUN_ENV=https://www.douglas.de./
WORKERS=2
RETRIES=1
BROWSERS=modern  # modern, chromium, firefox, webkit, mobile, mobile_chrome, mobile_safari, branded, branded_chrome, branded_edge, all
HEADLESS=false   # true, false
TEST_TIMEOUT=120000
```
