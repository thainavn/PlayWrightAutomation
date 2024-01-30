const { expect } = require('@playwright/test');
class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
    }
    async verifyProductInCart(string) {
        const bool = await this.page.locator(`h3:has-text("${string}")`).isVisible();
        expect(bool).toBeTruthy();
    }
    async proceedToCheckout(){
        await this.checkoutBtn.click();
    }
}
module.exports = { CartPage };