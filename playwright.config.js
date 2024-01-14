const { devices } = require('@playwright/test');
const config = {
  testDir: './tests',
  timeout: 40 * 1000,
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
    trace: 'retain-on-failure'



  },
};
module.exports = config;

