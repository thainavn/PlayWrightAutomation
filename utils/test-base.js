const base = require('@playwright/test');
exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "thai@gmail.com",
            password: "4Youonly4",
            product_name: "ADIDAS ORIGINAL",
            country: "India",
            name: "Ngo Anh Thai",
            coupon: "rahulshettyacademy",
            coupon_success_msg: "Coupon Applied"
        }
    }
)