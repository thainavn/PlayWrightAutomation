class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInBtn = page.locator("[type='submit']");
        this.userName = page.locator("[type='email']");
        this.passWord = page.locator("[type='password']");

    }
    async validLogin(username, password) {
        await this.userName.type(username);
        await this.passWord.type(password);
        await this.signInBtn.click();
        await this.page.locator(".card-body b").first().waitFor();
    }
    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}
module.exports = {LoginPage};