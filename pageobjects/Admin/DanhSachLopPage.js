class DanhSachLopPage {
    constructor(page) {
        this.page = page;
        this.danhSachTrangThaiDropdown = page.locator("//input[@class='ant-select-selection-search-input']");
        this.trangThaiDangHoatDongOption = page.locator("//div[@title='Đang hoạt động']");
        this.editBtn = page.locator("//span[@class='sc-btRFmh bSnhUk lnr lnr-pencil']").first();
        this.danhSachHocVienTab = page.locator("//a[text()='Danh sách học viên']");
        this.chonHocVienBtn = page.locator("//button[text()='Chọn học viên']");
        this.select1stHocVienCheckbox = page.locator("(//div[@class='modal-content']//tr[@class='cursor-pointer']//input)[1]");
        this.chonHocVienPopupBtn = page.locator("//div[@class='sc-iIDYfd eqBCuH']//button[@type='button']");
        this.dongYPopupBtn = page.locator("//button[text()='Đồng ý']");
        this.themHocVienThanhCongPopup = page.locator("//div[text()='Thêm học viên thành công!']");
    }
    async clickDanhSachTrangThai() {
        await this.danhSachTrangThaiDropdown.click();
    }
    async chonTrangThaiDangHoatDong() {
        await this.trangThaiDangHoatDongOption.click();
    }
    async clickEdit() {
        await this.editBtn.click();
    }
    async clickDanhSachHocVienTab() {
        await this.danhSachHocVienTab.click();
    }
    async clickChonHocVienOpenPopup() {
        await this.chonHocVienBtn.click();
    }
    async selectHocVienDauTien() {
        await this.select1stHocVienCheckbox.click();
    }
    async clickChonHocVien() {
        await this.chonHocVienPopupBtn.click();
    }
    async clickDongY() {
        await this.dongYPopupBtn.click();
    }
    async verifyMsgThemHocVienThanhCong() {
        await this.themHocVienThanhCongPopup.isVisible();
    }
}
export default { DanhSachLopPage };