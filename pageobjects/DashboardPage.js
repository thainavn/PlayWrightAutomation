export class DashboardPage {
    /** 
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.addProductSuccessMsg = page.locator("//div[@aria-label='Product Added To Cart']");
    }
    async searchProductAddCart(productName) {
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                await this.addProductSuccessMsg.waitFor();
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cart.click();
        await this.page.locator("div li").first().waitFor();
    }
}