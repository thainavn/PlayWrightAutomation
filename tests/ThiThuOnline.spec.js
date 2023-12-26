const { test, expect } = require('@playwright/test');
const { DataUtils } = require('./utils/DataUtils');
const { baseURL, webBaseURL } = require('../playwright.config');
const { AdminLoginPage } = require('../pageobjects/Admin/AdminLoginPage');
const { AdminHomePage } = require('../pageobjects/Admin/AdminHomePage');
const { WebHomePage } = require('../pageobjects/Web/WebHomePage');
const { QuanLyNhomCauHoiPage } = require('../pageobjects/Admin/QuanLyNhomCauHoiPage');
test('LoginAdmin', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goTo(baseURL);
    await adminLoginPage.login(DataUtils.ADMIN_USERNAME, DataUtils.ADMIN_PASSWORD);
    await adminLoginPage.waitForLoginSuccess();
    const adminHomePage = new AdminHomePage(page);
    expect(adminHomePage.verifyLoginSuccess()).toBeTruthy();
    expect(adminHomePage.verifyOnHomePage()).toBeTruthy();
})

test('LoginWebApp', async ({ page }) => {
    const webHomePage = new WebHomePage(page);
    await webHomePage.goTo(webBaseURL);
    await webHomePage.openLoginPopup();
    await webHomePage.login(DataUtils.WEB_USERNAME, DataUtils.WEB_PASSWORD);
    await webHomePage.waitForLoginSuccess();
    expect(webHomePage.verifyLoginSuccess()).toBeTruthy();

})

test('TaoMoiNhomCauHoi', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goTo(baseURL);
    await adminLoginPage.login(DataUtils.ADMIN_USERNAME, DataUtils.ADMIN_PASSWORD);
    await adminLoginPage.waitForLoginSuccess();
    const adminHomePage = new AdminHomePage(page);
    expect(adminHomePage.verifyLoginSuccess()).toBeTruthy();
    expect(adminHomePage.verifyOnHomePage()).toBeTruthy();
    await adminHomePage.clickQuanLyNganHangCauHoi();
    await adminHomePage.clickQuanLyNhomCauHoi();
    const quanLyNhomCauHoiPage = new QuanLyNhomCauHoiPage(page);
    await quanLyNhomCauHoiPage.waitForLoadQuanLyNhomCauHoi();
    await quanLyNhomCauHoiPage.clickThemMoiNhomCauHoi();
    await quanLyNhomCauHoiPage.inputTenNhomCauHoi("test");
    await quanLyNhomCauHoiPage.clickSaveTenNhomCauHoi();
    await quanLyNhomCauHoiPage.waitForPopupThemMoiNhomCauHoiInvisible();
})
