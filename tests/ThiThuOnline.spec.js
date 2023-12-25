const { test, expect } = require('@playwright/test');
const { LoginUtils } = require('../tests/utils/LoginUtils');
const { baseURL, webBaseURL } = require('../playwright.config');
const { AdminLoginPage } = require('../pageobjects/Admin/AdminLoginPage');
const { AdminHomePage } = require('../pageobjects/Admin/AdminHomePage');
const { WebHomePage } = require('../pageobjects/Web/WebHomePage');
test('LoginAdmin', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goTo(baseURL);
    await adminLoginPage.login(LoginUtils.ADMIN_USERNAME, LoginUtils.ADMIN_PASSWORD);
    await adminLoginPage.waitForLoginSuccess();
    const adminHomepage = new AdminHomePage(page);
    await expect(adminHomepage.verifyLoginSuccess()).toBeTruthy();
    await expect(adminHomepage.verifyOnHomePage()).toBeTruthy();
})

test.only('LoginWebApp', async ({ page }) => {
    const webHomePage = new WebHomePage(page);
    await webHomePage.goTo(webBaseURL);
    await webHomePage.openLoginPopup();
    await webHomePage.login(LoginUtils.WEB_USERNAME, LoginUtils.WEB_PASSWORD);
    await webHomePage.waitForLoginSuccess();
    await expect(webHomePage.verifyLoginSuccess()).toBeTruthy();

})
