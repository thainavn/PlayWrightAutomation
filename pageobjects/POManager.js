import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { ThankyouPage } from "./ThankyouPage";

export class POManager{
    /** 
     * 
     * @param {import ('@playwright/test').Page} page 
     */
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