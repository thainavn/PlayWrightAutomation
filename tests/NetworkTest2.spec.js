const { test, expect } = require('@playwright/test');


test('Security test request intercept', async ({ page }) => {
    //login and reach orders page
    const productName = "ADIDAS ORIGINAL";
    const products = page.locator(".card-body");
    const email = "thai@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[type='email']").fill(email);
    await page.locator("[type='password']").fill("4Youonly4");
    await page.locator("[type='submit']").click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6566eb999fd99c85e8da9bd1'
        }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})