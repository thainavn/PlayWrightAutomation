Feature: Ecommerce validations

  Scenario: Placing the Order
    Given a login to Ecommerce application with "thai@gmail.com" and "4Youonly4"
    When Add "zara coat 3" to Cart
    Then Verify "zara coat 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify the order is present in the OrderHistory