const { expect } = require('@playwright/test');
class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.allOrders = page.locator("tbody tr");
        this.orderIdDetailsLocator = page.locator(".col-text");
    }
    async openTheLatestOrder(string) {
        const ordersCount = await this.allOrders.count();
        for (let i = 0; i < ordersCount; ++i) {
            const historyOrderId = await this.allOrders.locator("th").nth(i).textContent();
            if (historyOrderId === string) {
                await this.allOrders.nth(i).locator("button").first().click();
                break;
            }
        }
    }
    async getOrderId() {
        const orderIdDetails = await this.orderIdDetailsLocator.textContent();
        return orderIdDetails;
    }
}
module.exports = { OrdersHistoryPage };