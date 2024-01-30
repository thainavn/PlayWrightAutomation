const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('Client App', async ({ page }) => {
    const poManager = new POManager(page);
    const productName = "ADIDAS ORIGINAL";
    const country = "India";
    const name = "Ngo Anh Thai";
    const coupon = "rahulshettyacademy";
    const applyCouponSuccessMsg = "Coupon Applied";
    const products = page.locator(".card-body");
    const email = "thai@gmail.com";
    const password = "4Youonly4";
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductInCart(productName);
    await cartPage.proceedToCheckout();
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.selectCountry(country);
    await checkoutPage.verifyEmail(email);
    await checkoutPage.inputNameCard(name);
    await checkoutPage.inputCoupon(coupon);
    await checkoutPage.clickApplyCoupon();
    await checkoutPage.verifyApplyCouponMsg(applyCouponSuccessMsg);
    await checkoutPage.clickPlaceOrder();
    const thankyouPage = poManager.getThankyouPage();
    const orderId = await thankyouPage.getOrderId();
    await thankyouPage.proceedToOrdersHistoryPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.openTheLatestOrder(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy;
})