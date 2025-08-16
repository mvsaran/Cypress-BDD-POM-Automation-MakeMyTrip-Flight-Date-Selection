Feature: Flight Date Selection on MakeMyTrip

  Scenario: Search for flights from Hyderabad to Mumbai
    Given I am on the MakeMyTrip homepage
    When I enter "Hyderabad" as the from city
    And I enter "Mumbai" as the to city
    And I select "25" "August 2025" as the departure date
    Then the selected departure date should be displayed
