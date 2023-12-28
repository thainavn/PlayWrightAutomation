class AdminHomePage {
    constructor(page) {
        this.page = page;
        this.successLoginMsg = page.locator(".Toastify__toast-body");
        this.homePageLogo = page.locator("[class='sc-QzmmP ihppzK']");
        this.quanLyNganHangCauHoiBtn = page.locator("ul:nth-child(1) li:nth-child(1) button:nth-child(1) span:nth-child(3)");
        this.quanLyNhomCauHoiBtn = page.locator("[href='/questions_group_management']");
        this.quanLyHocCungGiaoVienBtn = page.locator("//span[text()='Quản lý học cùng giáo viên']");
        this.danhSachLopBtn = page.locator("//span[text()='Danh sách lớp']");
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
    async clickQuanLyHocCungGiaoVien() {
        await this.quanLyHocCungGiaoVienBtn.click();
    }
    async clickDanhSachLop() {
        await this.danhSachLopBtn.click();
    }
    
}
module.exports = { AdminHomePage };