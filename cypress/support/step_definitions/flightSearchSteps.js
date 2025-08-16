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

// Updated step for dynamic date selection
When("I select {string} {string} as the departure date", (day, monthYear) => {
  // Split month and year from the single string
  const [month, year] = monthYear.split(" ");

  // Build the Date object
  const date = new Date(`${month} ${day}, ${year}`);

  // Format like Makemytrip aria-label: e.g. "Mon Aug 25 2025"
  const ariaLabel = date.toLocaleDateString('en-US', {
    weekday: 'short', // Mon
    month: 'short',   // Aug
    day: '2-digit',   // 25
    year: 'numeric'   // 2025
  }).replace(/,/g, ''); // remove commas

  // Open date picker
  cy.get('label[for="departure"]').click({ force: true });

  // Navigate months until we see the target month & year
  cy.get('.DayPicker-Caption').first().invoke('text').then(caption => {
    if (!caption.includes(month) || !caption.includes(year)) {
      cy.get('.DayPicker-NavButton--next').click({ force: true });
      cy.get('.DayPicker-Caption').should('contain', month).and('contain', year);
    }
  });

  // Click the date
  cy.get(`div[aria-label="${ariaLabel}"]`).click({ force: true });
});

Then("the selected departure date should be displayed", () => {
cy.get('input#departure').then(($input) => {
  $input[0].dispatchEvent(new Event('focus', { bubbles: true }));
  $input.val('New Delhi').trigger('input');
});
});