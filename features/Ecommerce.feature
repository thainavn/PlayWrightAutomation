Feature: Ecommerce validations

  @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "thai@gmail.com" and "4Youonly4"
    When Add "ADIDAS ORIGINAL" to Cart
    Then Verify "ADIDAS ORIGINALl" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify the order is present in the OrderHistory

  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error messgae is displayed

    Examples: 
      | username       | password  |
      | thai@gmail.com | 4Youonly4 |
      | hello@123.com  | 4Youonly4 |
