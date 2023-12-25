const { test, expect } = require('@playwright/test');

test('E2E', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "ngoanhthai20@gmail.com";
    const password = "4Youonly4";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".text-reset").click();
    await page.locator("#firstName").fill("thai");
    await page.locator("#lastName").fill("ngo");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userMobile").fill("3929215177");
    await page.locator("#userPassword").fill(password);
    await page.locator("#confirmPassword").fill(password);
    await page.locator("[value='Male']").click();
    await page.locator("[formcontrolname='required']").click();
    await page.locator("[formcontrolname='occupation']").selectOption("3: Engineer");
    await page.locator("#login").click();
    await page.locator("[class='btn btn-primary']").click();
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();
    const productName = await page.locator(".card-body h5").nth(1).textContent();
    await page.locator("[class='btn w-10 rounded']").nth(1).click();
    await page.locator("[routerlink='/dashboard/cart']").click();
    const quantity = await page.locator("[routerlink='/dashboard/cart'] label").textContent();
    await expect(page.locator(".cartSection h3")).toContainText(productName);
    await page.locator(".totalRow button").click();
    await expect(page.locator(".item__details .item__title")).toContainText(productName);
    await expect(page.locator(".item__details .item__quantity")).toContainText(quantity);
    await page.locator("[class='input txt']").nth(0).fill("123");
    await expect(page.locator("label[type='text']")).toContainText(email);
    await page.locator("[placeholder*='Country']").pressSequentially("nam");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "Vietnam") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator("[class='input txt']").nth(1).fill("Ngo Anh Thai");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    await expect(page.locator("[name='coupon']+p")).toContainText("Coupon Applied");
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toContainText("Thankyou for the order.");
    const text = await page.locator("label[class='ng-star-inserted']").textContent();
    const arrayText = text.split("| ");
    const orderID = arrayText[1].split(" ")[0];
    await page.locator("label[routerlink='/dashboard/myorders']").click();
    await expect(page.locator("[scope='row']")).toContainText(orderID);
    await page.locator("[class='btn btn-primary']").click();
    await expect(page.locator(".col-text")).toContainText(orderID);
    await expect(page.locator("[class='text']").nth(0)).toContainText(email);
    await expect(page.locator("[class='text']").nth(1)).toContainText("Country - Vietnam");
    await expect(page.locator("[class='text']").nth(2)).toContainText(email);
    await expect(page.locator("[class='text']").nth(3)).toContainText("Country - Vietnam");
})