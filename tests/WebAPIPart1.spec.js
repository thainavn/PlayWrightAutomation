const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "thai@gmail.com", userPassword: "4Youonly4" };
const orderPayload = { orders: [{ country: "Vietnam", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
let token;
let orderID;

test.beforeAll(async () => {
    //login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
    //create order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers:
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderID = await orderResponseJson.orders[0];
});


test('API login bypass', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);

    }, token);
    const productName = "adidas original";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const allOrders = await page.locator("tbody tr");
    const ordersCount = await allOrders.count();
    for (let i = 0; i < ordersCount; ++i) {
        const historyOrderId = await allOrders.locator("th").nth(i).textContent();
        if (historyOrderId === orderID) {
            await allOrders.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator("div .col-text").textContent();
    await page.pause();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();

})