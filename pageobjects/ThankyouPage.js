export class ThankyouPage {
    /** 
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.orderIDText = page.locator("label[class='ng-star-inserted']");
        this.ordersHitoryBtn = page.locator("label[routerlink='/dashboard/myorders']");
    }
    async getOrderId() {
        const text = await this.orderIDText.textContent();
        const arrayText = await text.split("| ");
        const orderId = await arrayText[1].split(" ")[0];
        return orderId;
    }
    async proceedToOrdersHistoryPage(){
        await this.ordersHitoryBtn.click();
        await this.page.locator("tbody").waitFor();
    }
}