const { test, expect } = require('@playwright/test');

test.skip('Client App', async ({ page }) => {
    const productName = "ADIDAS ORIGINAL";
    const products = page.locator(".card-body");
    const email = "thai@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[type='email']").fill(email);
    await page.locator("[type='password']").fill("4Youonly4");
    await page.locator("[type='submit']").click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('adidas original')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator("[class='input txt']").nth(1).fill("Ngo Anh Thai");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    await expect(page.locator("[name='coupon']+p")).toContainText("Coupon Applied");
    await page.locator(".action__submit").click();
    const text = await page.locator("label[class='ng-star-inserted']").textContent();
    const arrayText = text.split("| ");
    const orderId = arrayText[1].split(" ")[0];
    console.log(orderId);
    await page.locator("label[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const allOrders = await page.locator("tbody tr");
    const ordersCount = await allOrders.count();
    for(let i=0;i<ordersCount;++i)
    {
        const historyOrderId = await allOrders.locator("th").nth(i).textContent();
        if(historyOrderId===orderId)
        {
            await allOrders.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

})