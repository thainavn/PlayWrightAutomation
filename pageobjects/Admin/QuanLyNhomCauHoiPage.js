class QuanLyNhomCauHoiPage {
    constructor(page) {
        this.page = page;
        this.firstNhomCauHoi = page.locator(".MuiTableRow-root").nth(0);
        this.addNhomCauHoiBtn = page.locator("button[class='sc-llJcti ceBvQN btn btn-primary']");
        this.inputTenNhomCauHoiField = page.locator("input[placeholder='Tên nhóm câu hỏi']");
        this.saveTenNhomCauHoiBtn = page.locator("div[role='dialog'] button:nth-child(1)");
        this.searchTenNhomCauHoiField = page.locator("[type='search']");
        this.editBtn = page.locator("[class='lnr lnr-pencil']");
        this.tenNhomCauHoiText = page.locator("tbody tr[class='MuiTableRow-root'] td:nth-child(1) div:nth-child(1) div:nth-child(1)");
    }
    async waitForLoadQuanLyNhomCauHoi() {
        await this.firstNhomCauHoi.waitFor({ state: "visible" });
    }
    async clickThemMoiNhomCauHoi() {
        await this.addNhomCauHoiBtn.click();
    }
    async inputTenNhomCauHoi(tennhomcauhoi) {
        await this.inputTenNhomCauHoiField.type(tennhomcauhoi);
    }
    async clickSaveTenNhomCauHoi() {
        await this.saveTenNhomCauHoiBtn.click();
    }
    async waitForPopupThemMoiNhomCauHoiInvisible() {
        await this.saveTenNhomCauHoiBtn.waitFor({ state: "hidden" });
    }
    async reloadPage() {
        await this.page.reload();
    }
    async searchTenNhomCauHoi(tennhomcauhoi) {
        await this.searchTenNhomCauHoiField.type(tennhomcauhoi);
    }
    async verifyOnly1Result() {
        const so = await this.editBtn.count();
        return so;
    }
    async verifyTenNhomCauHoi() {
        const ten = await this.tenNhomCauHoiText.textContent();
        return ten;
    }
    async waitForLoadResult() {
        await this.page.waitForTimeout(1000);
    }
}
module.exports = { QuanLyNhomCauHoiPage };