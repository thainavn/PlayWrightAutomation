class WebHomePage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[type='submit']");
        this.userName = page.locator("#email");
        this.passWord = page.locator("#password");
        this.myCourseBtn = page.locator(".w-39");
        this.openLoginPopupBtn = page.locator("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)");
        this.hocCungGiaoVienBtn = page.locator("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)");
        this.tiengAnhBtn = page.locator("a[href='/learn-with-teacher/3d04feda-f504-4f8d-8791-028707f78c73']");
        this.viewKhoaHocBtn = page.getByText("TOEIC Compact Live 0 - 650+ z");
        this.onLuyenTiengAnhTab = page.getByText("Ôn luyện Tiếng anh");
        this.muaNgayBtn = page.locator("//button[contains(@class,'text-primary border')]//div[contains(@class,'')]");
        this.datHangBtn = page.locator("//div[contains(text(),'Đặt hàng')]");
        this.dongYDieuKhoanCheckbox = page.locator("//div[@class='grid gap-y-4']//span[2]");
        this.thanhToanBtn = page.locator("//div[contains(text(),'Thanh toán')]");
        this.thanhToanThanhCongText = page.locator("//h1[contains(text(),'Thanh toán thành công')]");
    }
    async goTo(webBaseURL) {
        await this.page.goto(webBaseURL);
    }
    async openLoginPopup() {
        await this.openLoginPopupBtn.click();
    }
    async login(userName, passWord) {
        await this.userName.type(userName);
        await this.passWord.type(passWord);
        await this.signInButton.click();
    }
    async waitForLoginSuccess() {
        await this.page.waitForLoadState('networkidle');
    }
    async verifyLoginSuccess() {
        await this.myCourseBtn.isVisible();
    }
    async hoverOnHocCungGiaoVienBtn() {
        await this.hocCungGiaoVienBtn.hover();
    }
    async clickOnTiengAnhBtn() {
        await this.tiengAnhBtn.click();
    }
    async waitForLoadListKhoaHoc() {
        await this.onLuyenTiengAnhTab.waitFor({ state: "visible" });
    }
    async viewKhoaHoc() {
        await this.viewKhoaHocBtn.click();
    }
    async clickMuaNgay() {
        await this.muaNgayBtn.click();
    }
    async clickDatHang() {
        await this.datHangBtn.click();
    }
    async checkDongYDieuKhoan() {
        await this.dongYDieuKhoanCheckbox.click();
    }
    async clickThanhToan() {
        await this.thanhToanBtn.dispatchEvent("click");
    }
    async waitForLoad() {
        await this.page.waitForTimeout(3000);
    }
    async waitForThanhToanThanhCong() {
        await this.page.waitForSelector("//h1[contains(text(),'Thanh toán thành công')]", { state: 'visible' });
    }
    async verifyThanhToanThanhCong() {
        await this.thanhToanThanhCongText.isVisible();
    }

}
export default { WebHomePage };