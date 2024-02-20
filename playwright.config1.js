const { devices } = require('@playwright/test');
const config = {
  testDir: './tests',
  retries: 1,
  workers: 3,
  timeout: 30 * 1000,
  baseURL: 'https://admin-dev.appigv.vmo.group/',
  webBaseURL: 'https://web-dev.appigv.vmo.group/',
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 11']
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure',
        // ...devices['Galaxy S9+']
        // viewport: {
        //   width: 720,
        //   height: 720
        // }
      }
    }
  ]
};
module.exports = config;

