const {test, expect} = require('@playwright/test');

test('Client App', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[type='email']").fill("thai@gmail.com");
    await page.locator("[type='password']").fill("4Youonly4");
    await page.locator("[type='submit']").click();
    // await page.waitForLoadState('networkidle');

    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    
    console.log(titles);

})