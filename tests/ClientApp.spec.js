const { test, expect } = require('@playwright/test');

test.only('Client App', async ({ page }) => {
    const productName = "adidas original";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[type='email']").fill("thai@gmail.com");
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
await page.pause();
})