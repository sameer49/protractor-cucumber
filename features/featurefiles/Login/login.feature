@Login
Feature: Login

    Scenario: Open Delta Website
        Given User is on Delta Website

    Scenario: Empty Login Details
        Given User click login page menu
        And User is on Login Page
        And User enters username as " "
        And User enters password as " "
        When User click on log in 
        Then User should not be logged in
        And User should display error message as "please correct the items indicated."

    Scenario: Invalid Login Details
        And User is on Login Page
        And User enters username as "foo"
        And User enters password as "foo"
        When User click on log in 
        Then User should not be logged in
        And User should display error message as "please correct the 2 items indicated."

    Scenario: Valid Login Details
        And User is on Login Page
        And User enters username as "ironman161992"
        And User enters password as "Xyz123456789"
        When User click on log in 
        Then User should be logged in
        
