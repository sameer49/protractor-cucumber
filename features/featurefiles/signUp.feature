@SignUp
Feature: SignUp

    Scenario: Open Delta Website
        Given User is on Delta Website

    Scenario: SignUp for new user
        Given User click SignUp page menu
        And User enter basic information
            | Prefix | Fname | Mname | Lname | Suffix |
            | Mr     | Foo   | Bar   | Xyz   | Jr     |
