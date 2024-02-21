const { expect } = require('@playwright/test');
exports.CheckoutPage = class CheckoutPage {
    /** 
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.selectCountryField = page.locator("[placeholder*='Country']");
        this.dropdownCountryResults = page.locator(".ta-results");
        this.emailField = page.locator(".user__name [type='text']").first();
        this.nameCardField = page.locator("[class='input txt']").nth(1);
        this.couponField = page.locator("[name='coupon']");
        this.applyCouponBtn = page.locator("[type='submit']");
        this.applyCouponMsg = page.locator("[name='coupon']+p");
        this.placeOrderBtn = page.locator(".action__submit");
    }
    async selectCountry(string) {
        await this.selectCountryField.pressSequentially(`${string}`);
        await this.dropdownCountryResults.waitFor();
        const optionsCount = await this.dropdownCountryResults.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdownCountryResults.locator("button").nth(i).textContent();
            if (text.trim() === `${string}`) {
                await this.dropdownCountryResults.locator("button").nth(i).click();
                break;
            }
        }
    }
    async verifyEmail(string) {
        await expect(this.emailField).toHaveText(string);
    }
    async inputNameCard(string) {
        await this.nameCardField.fill(string);
    }
    async inputCoupon(string) {
        await this.couponField.fill(string);
    }
    async clickApplyCoupon() {
        await this.applyCouponBtn.click();
    }
    async verifyApplyCouponMsg(string) {
        await expect(this.applyCouponMsg).toContainText(`${string}`);
    }
    async clickPlaceOrder() {
        await this.placeOrderBtn.click();
    }
}