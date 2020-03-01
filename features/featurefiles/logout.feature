@Logut
Feature: Logout

    Scenario: Open Delta Website
        Given User is on Delta Website

    Scenario: Valid Login Details
        And User is on Login Page
        And User enters username as "ironman161992"
        And User enters password as "Xyz123456789"
        When User click on log in 
        Then User should be logged in