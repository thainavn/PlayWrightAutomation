const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');
const loginPayload = { userEmail: "thai@gmail.com", userPassword: "4Youonly4" };
const orderPayload = { orders: [{ country: "Vietnam", productOrderedId: "6581ca979fd99c85e8ee7faf" }] };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});


test('API login bypass', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);

    }, response.token);
    const productName = "adidas original";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const allOrders = await page.locator("tbody tr");
    const ordersCount = await allOrders.count();
    for (let i = 0; i < ordersCount; ++i) {
        const historyOrderId = await allOrders.locator("th").nth(i).textContent();
        if (historyOrderId === response.orderId) {
            await allOrders.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator("div .col-text").textContent();
    // await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

})