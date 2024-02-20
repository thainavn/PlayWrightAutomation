const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string2}', { timeout: 100 * 1000 }, async function (username, password) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productname) {
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productname);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productname) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductInCart(productname);
    await cartPage.proceedToCheckout();
});

When('Enter valid details and Place the Order', async function () {
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.selectCountry(data.country);
    await checkoutPage.verifyEmail(data.username);
    await checkoutPage.inputNameCard(data.name);
    await checkoutPage.inputCoupon(data.coupon);
    await checkoutPage.clickApplyCoupon();
    await checkoutPage.verifyApplyCouponMsg(data.coupon_success_msg);
    await checkoutPage.clickPlaceOrder();
    const thankyouPage = this.poManager.getThankyouPage();
    const orderId = await thankyouPage.getOrderId();
    console.log(orderId);
});

Then('Verify the order is present in the OrderHistory', async function () {
    await thankyouPage.proceedToOrdersHistoryPage();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.openTheLatestOrder(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy;
});