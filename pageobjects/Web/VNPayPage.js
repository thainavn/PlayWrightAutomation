class VNPayPage {
    constructor(page) {
        this.page = page;
        this.noiDiaBtn = page.locator("(//div[@class='list-method-button'])[1]");
        this.nganHangNCBBtn = page.locator("#NCB");
        this.cardNumberField = page.locator("//input[@type='digits']");
        this.cardHolderField = page.locator("//input[@name='cardHolder']");
        this.cardIssueField = page.locator("//input[@name='cardDate']");
        this.continueBtn = page.locator("//a[@id='btnContinue']");
        this.dongYVaTiepTucBtn = page.locator("//span[text()='Đồng ý & Tiếp tục']");
        this.otpField = page.locator("//input[@name='otpvalue']");
        this.thanhToanBtn = page.locator("//button[@id='btnConfirm']");

    }
    async clickTheNoiDia() {
        await this.noiDiaBtn.click();
    }
    async clickNCB() {
        await this.nganHangNCBBtn.click();
    }
    async nhapSoThe(soThe) {
        await this.cardNumberField.type(soThe);
    }
    async nhapTenChuThe(chuThe) {
        await this.cardHolderField.type(chuThe);
    }
    async nhapNgayPhatHanh(ngayPhatHanh) {
        await this.cardIssueField.type(ngayPhatHanh);
    }
    async clickContinue() {
        await this.continueBtn.click();
    }
    async clickDongYVaTiepTuc() {
        await this.dongYVaTiepTucBtn.click();
    }
    async nhapOTP(otp) {
        await this.otpField.type(otp);
    }
    async clickThanhToan() {
        await this.thanhToanBtn.click();
    }
    async reloadPage() {
        await this.page.reload();
    }

}
module.exports = { VNPayPage };