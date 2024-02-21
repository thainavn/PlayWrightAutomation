Feature: Ecommerce validations

  @Validation @foo
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error messgae is displayed

    Examples: 
      | username       | password  |
      | thai@gmail.com | 4Youonly4 |
      | hello@123.com  | 4Youonly4 |
