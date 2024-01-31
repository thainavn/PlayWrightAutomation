const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base')
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
for (const data of dataset) {
    test(`Client App PO for ${data.product_name}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.product_name);
        await dashboardPage.navigateToCart();
        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductInCart(data.product_name);
        await cartPage.proceedToCheckout();
        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.selectCountry(data.country);
        await checkoutPage.verifyEmail(data.username);
        await checkoutPage.inputNameCard(data.name);
        await checkoutPage.inputCoupon(data.coupon);
        await checkoutPage.clickApplyCoupon();
        await checkoutPage.verifyApplyCouponMsg(data.coupon_success_msg);
        await checkoutPage.clickPlaceOrder();
        const thankyouPage = poManager.getThankyouPage();
        const orderId = await thankyouPage.getOrderId();
        await thankyouPage.proceedToOrdersHistoryPage();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.openTheLatestOrder(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy;
    });
}
customtest.only(`Client App PO`, async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.product_name);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductInCart(testDataForOrder.product_name);
    await cartPage.proceedToCheckout();
})