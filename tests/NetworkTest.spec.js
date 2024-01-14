const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');
const loginPayload = { userEmail: "thai@gmail.com", userPassword: "4Youonly4" };
const orderPayload = { orders: [{ country: "Vietnam", productOrderedId: "6581ca979fd99c85e8ee7faf" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };
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
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body
                }
            );
            //intercepting response - API response  -> {playwright fake response} -> browser -> render data on front-end
        });
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    expect(await page.locator(".mt-4").textContent()).toMatch("You have No Orders to show at this time. Please Visit Back Us");



})