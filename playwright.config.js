const { devices } = require('@playwright/test');
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  baseURL: 'https://admin-dev.appigv.vmo.group/',
  webBaseURL: 'https://web-dev.appigv.vmo.group/',
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  contextOptions: {
    viewport: null 
  },
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on'
  },
};
module.exports = config;

