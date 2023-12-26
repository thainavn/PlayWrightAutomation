class AdminHomePage {
    constructor(page) {
        this.page = page;
        this.successLoginMsg = page.locator(".Toastify__toast-body");
        this.homePageLogo = page.locator("[class='sc-QzmmP ihppzK']");
        this.quanLyNganHangCauHoiBtn = page.locator("ul:nth-child(1) li:nth-child(1) button:nth-child(1) span:nth-child(3)");
        this.quanLyNhomCauHoiBtn = page.locator("[href='/questions_group_management']");
    }
    async verifyLoginSuccess() {
        await this.successLoginMsg.isVisible();
    }
    async verifyOnHomePage() {
        await this.homePageLogo.isVisible();
    }
    async clickQuanLyNganHangCauHoi() {
        await this.quanLyNganHangCauHoiBtn.click();
    }
    async clickQuanLyNhomCauHoi() {
        await this.quanLyNhomCauHoiBtn.click();
    }
}
module.exports = { AdminHomePage };