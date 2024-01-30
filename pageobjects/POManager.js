const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");
const { ThankyouPage } = require("./ThankyouPage");

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankyouPage = new ThankyouPage(this.page);
        this.ordersHistory = new OrdersHistoryPage(this.page);
    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getCheckoutPage(){
        return this.checkoutPage;
    }
    getThankyouPage(){
        return this.thankyouPage;
    }
    getOrdersHistoryPage(){
        return this.ordersHistory;
    }
}
module.exports = {POManager};