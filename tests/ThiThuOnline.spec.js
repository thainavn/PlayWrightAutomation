const { test, expect } = require('@playwright/test');
const { DataUtils } = require('../utils/DataUtils');
const { baseURL, webBaseURL } = require('../playwright.config');
const { AdminLoginPage } = require('../pageobjects/Admin/AdminLoginPage');
const { AdminHomePage } = require('../pageobjects/Admin/AdminHomePage');
const { WebHomePage } = require('../pageobjects/Web/WebHomePage');
const { QuanLyNhomCauHoiPage } = require('../pageobjects/Admin/QuanLyNhomCauHoiPage');
const { VNPayPage } = require('../pageobjects/Web/VNPayPage');
const { DanhSachLopPage } = require('../pageobjects/Admin/DanhSachLopPage');

test('LoginAdmin', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goTo(baseURL);
    await adminLoginPage.login(DataUtils.ADMIN_USERNAME, DataUtils.ADMIN_PASSWORD);
    await adminLoginPage.waitForLoginSuccess();
    const adminHomePage = new AdminHomePage(page);
    expect(adminHomePage.verifyLoginSuccess()).toBeTruthy();
    expect(adminHomePage.verifyOnHomePage()).toBeTruthy();
})

test('LoginWebApp', async ({ page }) => {
    const webHomePage = new WebHomePage(page);
    await webHomePage.goTo(webBaseURL);
    await webHomePage.openLoginPopup();
    await webHomePage.login(DataUtils.WEB_USERNAME, DataUtils.WEB_PASSWORD);
    await webHomePage.waitForLoginSuccess();
    expect(webHomePage.verifyLoginSuccess()).toBeTruthy();

})

test('TaoMoiNhomCauHoi', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goTo(baseURL);
    await adminLoginPage.login(DataUtils.ADMIN_USERNAME, DataUtils.ADMIN_PASSWORD);
    await adminLoginPage.waitForLoginSuccess();
    const adminHomePage = new AdminHomePage(page);
    expect(adminHomePage.verifyLoginSuccess()).toBeTruthy();
    expect(adminHomePage.verifyOnHomePage()).toBeTruthy();
    await adminHomePage.clickQuanLyNganHangCauHoi();
    await adminHomePage.clickQuanLyNhomCauHoi();
    const quanLyNhomCauHoiPage = new QuanLyNhomCauHoiPage(page);
    await quanLyNhomCauHoiPage.waitForLoadQuanLyNhomCauHoi();
    await quanLyNhomCauHoiPage.clickThemMoiNhomCauHoi();
    await quanLyNhomCauHoiPage.inputTenNhomCauHoi(DataUtils.RANDOM);
    await quanLyNhomCauHoiPage.clickSaveTenNhomCauHoi();
    await quanLyNhomCauHoiPage.waitForPopupThemMoiNhomCauHoiInvisible();
    await quanLyNhomCauHoiPage.reloadPage();
    await quanLyNhomCauHoiPage.searchTenNhomCauHoi(DataUtils.RANDOM);
    await quanLyNhomCauHoiPage.waitForLoadResult();
    expect(await quanLyNhomCauHoiPage.verifyTenNhomCauHoi()).toContain(DataUtils.RANDOM);
    expect(await quanLyNhomCauHoiPage.verifyOnly1Result()).toBe(1);

})

test('HocCungGiaoVienThanhToanVNPay', async ({ page }) => {
    const webHomePage = new WebHomePage(page);
    const vnPaypage = new VNPayPage(page);
    await webHomePage.goTo(webBaseURL);
    await webHomePage.openLoginPopup();
    await webHomePage.login(DataUtils.WEB_USERNAME, DataUtils.WEB_PASSWORD);
    await webHomePage.waitForLoginSuccess();
    expect(webHomePage.verifyLoginSuccess()).toBeTruthy();
    await webHomePage.hoverOnHocCungGiaoVienBtn();
    await webHomePage.clickOnTiengAnhBtn();
    await webHomePage.waitForLoadListKhoaHoc();
    await webHomePage.viewKhoaHoc();
    await webHomePage.clickMuaNgay();
    await webHomePage.clickDatHang();
    await webHomePage.checkDongYDieuKhoan();
    await webHomePage.clickThanhToan();
    await vnPaypage.clickTheNoiDia();
    await vnPaypage.clickNCB();
    await vnPaypage.nhapSoThe(DataUtils.SOTHE);
    await vnPaypage.nhapTenChuThe(DataUtils.TENCHUTHE);
    await vnPaypage.nhapNgayPhatHanh(DataUtils.NGAYPHATHANH);
    await vnPaypage.clickContinue();
    await vnPaypage.clickDongYVaTiepTuc();
    await vnPaypage.nhapOTP(DataUtils.OTP);
    await vnPaypage.clickThanhToan();
    await webHomePage.waitForThanhToanThanhCong();
    expect(webHomePage.verifyThanhToanThanhCong()).toBeTruthy();
})

test('ThemHocVienVaoLopHoc', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    const danhSachLopPage = new DanhSachLopPage(page);
    await adminLoginPage.goTo(baseURL);
    await adminLoginPage.login(DataUtils.ADMIN_USERNAME, DataUtils.ADMIN_PASSWORD);
    await adminLoginPage.waitForLoginSuccess();
    const adminHomePage = new AdminHomePage(page);
    expect(adminHomePage.verifyLoginSuccess()).toBeTruthy();
    expect(adminHomePage.verifyOnHomePage()).toBeTruthy();
    await adminHomePage.clickQuanLyHocCungGiaoVien();
    await adminHomePage.clickDanhSachLop();
    await danhSachLopPage.clickDanhSachTrangThai();
    await danhSachLopPage.chonTrangThaiDangHoatDong();
    await danhSachLopPage.clickEdit();
    await danhSachLopPage.clickDanhSachHocVienTab();
    await danhSachLopPage.clickChonHocVienOpenPopup();
    await danhSachLopPage.selectHocVienDauTien();
    await danhSachLopPage.clickChonHocVien();
    await danhSachLopPage.clickDongY();
    await expect(danhSachLopPage.verifyMsgThemHocVienThanhCong()).toBeTruthy();
})

