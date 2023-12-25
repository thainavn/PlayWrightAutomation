class AdminLoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[type='submit']");
        this.userName = page.locator("[name='username']");
        this.passWord = page.locator("[name='password']");
        this.successLoginMsg = page.locator(".Toastify__toast-body");
    }
    async goTo(baseURL){
        await this.page.goto(baseURL);
    }
    async login(userName, passWord) {
        await this.userName.type(userName);
        await this.passWord.type(passWord);
        await this.signInButton.click();
    }
    async waitForLoginSuccess(){
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {AdminLoginPage};