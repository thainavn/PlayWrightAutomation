class WebHomePage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[type='submit']");
        this.userName = page.locator("#email");
        this.passWord = page.locator("#password");
        this.myCourseBtn = page.locator(".w-39");
        this.openLoginPopupBtn = page.locator("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)");
    }
    async goTo(webBaseURL){
        await this.page.goto(webBaseURL);
    }
    async openLoginPopup(){
        await this.openLoginPopupBtn.click();
    }
    async login(userName, passWord) {
        await this.userName.type(userName);
        await this.passWord.type(passWord);
        await this.signInButton.click();
    }
    async waitForLoginSuccess(){
        await this.page.waitForLoadState('networkidle');
    }
    async verifyLoginSuccess(){
        await this.myCourseBtn.isVisible();
    }
}
module.exports = {WebHomePage};