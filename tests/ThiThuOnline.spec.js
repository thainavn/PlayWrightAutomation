const { test, expect } = require('@playwright/test');
const { AdminLoginPage } = require('../pageobjects/AdminLoginPage');
test('ThiThuOnline', async ({ page }) => {
    const email = "super_admin";
    const password = "Admin@123";
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goTo();
    await adminLoginPage.validLogin(email, password);

})