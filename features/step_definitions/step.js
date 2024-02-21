const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', { timeout: 100 * 1000 }, async function (productname) {
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productname);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', { timeout: 100 * 1000 }, async function (productname) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductInCart(productname);
    await cartPage.proceedToCheckout();
});

When('Enter valid details and Place the Order', { timeout: 100 * 1000 }, async function () {
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.selectCountry("India");
    await checkoutPage.clickPlaceOrder();
    this.thankyouPage = this.poManager.getThankyouPage();
    this.orderId = await this.thankyouPage.getOrderId();
    console.log(this.orderId);
});

Then('Verify the order is present in the OrderHistory', { timeout: 100 * 1000 }, async function () {
    await this.thankyouPage.proceedToOrdersHistoryPage();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.openTheLatestOrder(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy;
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator('#username');
    const signIn = this.page.locator('#signInBtn');
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(username);
    await this.page.locator('#password').fill(password);
    await signIn.click();
});

Then('Verify Error messgae is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});