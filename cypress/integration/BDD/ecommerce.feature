Feature: End to End Ecommerce Validation

    Application Regression

    @Regression
    Scenario: Ecommerce Products Delivery

        Given I open Ecommerce Page
        When I add items to Cart
        And Validate the total prices
        Then Select the country , sumbit and verify Succes! message

    @Smoke
    Scenario: Filling the form to shop

        Given I open Ecommerce Page
        When I fill the form details
            | name | gender |
            | Bob  | Male   |
        Then Validate the forms behaviour
        And select the Shop Page






