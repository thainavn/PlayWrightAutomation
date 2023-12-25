const { test, expect } = require('@playwright/test');
const { LoginUtils } = require('../tests/utils/LoginUtils');
const { AdminLoginPage } = require('../pageobjects/AdminLoginPage');
const { AdminHomePage } = require('../pageobjects/AdminHomePage');
test.only('Login', async ({ page, baseURL }) => {
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goTo(baseURL);
    await adminLoginPage.login(LoginUtils.USERNAME, LoginUtils.PASSWORD);
    await adminLoginPage.waitForLoginSuccess();
    const adminHomepage = new AdminHomePage(page);
    await expect(adminHomepage.verifyLoginSuccess()).toBeTruthy();
    await expect(adminHomepage.verifyOnHomePage()).toBeTruthy();
})

test('TaoMaGiamGiaGuiHocVien', async ({ page }) => {

})
