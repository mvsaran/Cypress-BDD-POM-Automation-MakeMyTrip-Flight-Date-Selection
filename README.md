# ✈️ Cypress BDD POM Automation - MakeMyTrip Flight Date Selection

This project demonstrates **Cypress Automation** using  
✅ **BDD (Cucumber)**  
✅ **Page Object Model (POM)**  
✅ **Dynamic Date Selection** (for flight booking on MakeMyTrip).  

It is designed in a way that even **beginners** can understand and set it up from scratch.

---

## 📂 Project Structure

```
CYPRESSBDDPOM/
│── cypress/
│   ├── e2e/
│   │   └── features/
│   │       └── flightSearch.feature      # Feature file (Cucumber)
│   ├── pages/
│   │   └── homePage.js                   # Page Object file
│   ├── support/
│   │   ├── step_definitions/
│   │   │   └── flightSearchSteps.js      # Step definitions
│   │   ├── commands.js
│   │   └── e2e.js
│── .gitignore
│── cypress.config.js
│── package.json
│── README.md
```

---

## 🛠️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

Verify installation:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/Cypress-BDD-POM-Automation-MakeMyTrip-Flight-Date-Selection.git
cd Cypress-BDD-POM-Automation-MakeMyTrip-Flight-Date-Selection
```

2. **Install dependencies**

```bash
npm install
```

This will install Cypress, Cucumber, and required plugins.

---

## 📑 Feature File Example (`flightSearch.feature`)

```gherkin
Feature: Flight Search on MakeMyTrip

  Scenario: Search flight with dynamic date selection
    Given I am on the MakeMyTrip homepage
    When I enter "Delhi" as the from city
    And I enter "Mumbai" as the to city
    And I select "25" "Aug 2025" as the departure date
    Then I should see available flights
```

---

## 📜 Step Definitions (`flightSearchSteps.js`)

```javascript
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const homePage = require('../../e2e/pages/homePage');

Given("I am on the MakeMyTrip homepage", () => {
  homePage.visit();
  cy.closeMakeMyTripPopup();
});

When("I enter {string} as the from city", (city) => {
  homePage.enterFromCity(city);
});

When("I enter {string} as the to city", (city) => {
  homePage.enterToCity(city);
});

// Dynamic Date Selection
When("I select {string} {string} as the departure date", (day, monthYear) => {
  const [month, year] = monthYear.split(" ");
  const date = new Date(`${month} ${day}, ${year}`);
  const ariaLabel = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).replace(/,/g, "");

  cy.get('label[for="departure"]').click({ force: true });
  cy.get('.DayPicker-Caption').first().invoke('text').then((caption) => {
    if (!caption.includes(month) || !caption.includes(year)) {
      cy.get('.DayPicker-NavButton--next').click({ force: true });
    }
  });

  cy.get('.DayPicker-Day[aria-label="' + ariaLabel + '"]').click({ force: true });
});
```

---

## 🏗️ Page Object (`homePage.js`)

```javascript
class HomePage {
  visit() {
    cy.visit("https://www.makemytrip.com/");
  }

  closeMakeMyTripPopup() {
    cy.get('body').then($body => {
      if ($body.find('.loginModal').length) {
        cy.get('.close').click({ force: true });
      }
    });
  }

  enterFromCity(city) {
    cy.get('#fromCity').click({ force: true });
    cy.get('input[placeholder="From"]').type(city, { force: true });
    cy.contains(city).click({ force: true });
  }

  enterToCity(city) {
    cy.get('#toCity').click({ force: true });
    cy.get('input[placeholder="To"]').type(city, { force: true });
    cy.contains(city).click({ force: true });
  }
}

module.exports = new HomePage();
```

---

## ▶️ Running Tests

1. **Open Cypress Test Runner**

```bash
npx cypress open
```

2. **Run tests in headless mode (CLI)**

```bash
npx cypress run
```

---

## 📦 Dependencies

Key dependencies used in this project:

- **Cypress** – End-to-end testing framework  
- **Cucumber Preprocessor** – For BDD support  
- **Mocha** – Test runner  
- **Chai** – Assertions  

Check `package.json` for full list.

---

## 📊 Reports

After test execution, reports will be available under:

```
/reports
/screenshots
```

---

## 🎯 Summary

This framework provides:

✅ BDD with Cucumber (easy readability)  
✅ Page Object Model (maintainability)  
✅ Dynamic Date Selection logic  
✅ Cypress automation for MakeMyTrip flights  

---

🚀 Now you are ready to automate!

