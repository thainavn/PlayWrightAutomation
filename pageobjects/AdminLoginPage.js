class AdminLoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[type='submit']");
        this.userName = page.locator("[name='username']");
        this.passWord = page.locator("[name='password']");
    }
    async goTo(){
        await this.page.goto("https://admin-dev.appigv.vmo.group/log_in");
    }
    async validLogin(userName, passWord) {
        await this.userName.type(userName);
        await this.passWord.type(passWord);
        await this.signInButton.click();


    }
}
module.exports = {AdminLoginPage};