class AdminHomePage {
    constructor(page) {
        this.page = page;
        this.successLoginMsg = page.locator(".Toastify__toast-body");
        this.homePageLogo = page.locator("[class='sc-QzmmP ihppzK']");
    }
    async verifyLoginSuccess(){
        await this.successLoginMsg.isVisible();
    }
    async verifyOnHomePage(){
        await this.homePageLogo.isVisible();
    }
}
module.exports = {AdminHomePage};