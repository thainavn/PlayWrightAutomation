class QuanLyNhomCauHoiPage {
    constructor(page) {
        this.page = page;
        this.firstNhomCauHoi = page.locator(".MuiTableRow-root").nth(0);
        this.addNhomCauHoiBtn = page.locator("button[class='sc-llJcti ceBvQN btn btn-primary']");
        this.inputTenNhomCauHoiField = page.locator("input[placeholder='Tên nhóm câu hỏi']");
        this.saveTenNhomCauHoiBtn = page.locator("div[role='dialog'] button:nth-child(1)");
    }
    async waitForLoadQuanLyNhomCauHoi() {
        await this.firstNhomCauHoi.waitFor({ state: "visible" });
    }
    async clickThemMoiNhomCauHoi(){
        await this.addNhomCauHoiBtn.click();
    }
    async inputTenNhomCauHoi(tennhomcauhoi){
        await this.inputTenNhomCauHoiField.type(tennhomcauhoi);
    }
    async clickSaveTenNhomCauHoi(){
        await this.saveTenNhomCauHoiBtn.click();
    }
    async waitForPopupThemMoiNhomCauHoiInvisible(){
        await this.saveTenNhomCauHoiBtn.waitFor({ state: "hidden" });
    }
}
module.exports = { QuanLyNhomCauHoiPage };