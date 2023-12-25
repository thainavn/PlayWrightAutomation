const { devices } = require('@playwright/test');
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  baseURL : 'https://admin-dev.appigv.vmo.group/',
  webBaseURL : 'https://web-dev.appigv.vmo.group/',
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace: 'retain-on-failure' //off-on
  
  
  },
};
module.exports = config;

