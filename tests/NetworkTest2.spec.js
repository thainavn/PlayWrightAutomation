const { test, expect } = require('@playwright/test');


test('Security test request intercept', async ({ page }) => {
    //login and reach orders page
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6566eb999fd99c85e8da9bd1'}))
    await page.locator("button:has-text('View')").click();
})