class HomePage {
  visit() {
    cy.visit("/");
    cy.get('#fromCity', { timeout: 15000 }).should('be.visible');
  }

  enterFromCity(city) {
    cy.get('#fromCity', { timeout: 10000 }).should('be.visible').click();
    cy.get('input[placeholder="From"]', { timeout: 10000 }).should('be.visible').type(city, { delay: 100 });
    cy.contains('.react-autosuggest__suggestion', city, { timeout: 10000 }).should('be.visible').click();
  }

  enterToCity(city) {
    cy.get('#toCity', { timeout: 10000 }).should('be.visible').click();
    cy.get('input[placeholder="To"]', { timeout: 10000 }).should('be.visible').type(city, { delay: 100 });
    cy.contains('.react-autosuggest__suggestion', city, { timeout: 10000 }).should('be.visible').click();
  }

  selectDepartureDate(day, monthYear) {
    cy.selectDate(day, monthYear);
  }
selectDepartureDateByAriaLabel(ariaLabel) {
  cy.get('label[for="departure"]').click();
  cy.get(`div[aria-label="${ariaLabel}"]`).click({ force: true });
}

  clickSearch() {
    cy.get('a.primaryBtn', { timeout: 10000 }).should('be.visible').click();
  }
}

module.exports = new HomePage();
