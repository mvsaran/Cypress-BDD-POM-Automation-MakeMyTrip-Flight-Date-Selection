// Ignore uncaught exceptions from the app under test
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
Cypress.Commands.add('closeMakeMyTripPopup', () => {
  cy.get('body').then(($body) => {
    // If the common modal close icon exists, click it
    if ($body.find('.commonModal__close').length > 0) {
      cy.get('.commonModal__close').click({ force: true });
    }
  });
});

Cypress.Commands.add('stableClick', (selector) => {
  let lastPos = null;
  cy.get(selector).should(($el) => {
    const rect = $el[0].getBoundingClientRect();
    if (lastPos && rect.top !== lastPos) {
      throw new Error('Element still moving');
    }
    lastPos = rect.top;
  });
  cy.get(selector).click({ force: true });
});
// Close login popup if exists
Cypress.Commands.add("closeLoginPopup", () => {
  cy.get('body').then(($body) => {
    if ($body.find('.loginModal').length) {
      cy.get('.loginModal .close').click({ force: true });
    }
  });
});

// Select dynamic date from calendar
Cypress.Commands.add("selectDate", (day, monthYear) => {
  cy.get('label[for="departure"]').click();

  function selectMonth() {
    cy.get('.DayPicker-Caption').first().then(($caption) => {
      if (!$caption.text().includes(monthYear)) {
        cy.get('.DayPicker-NavButton--next').click();
        selectMonth();
      }
    });
  }

  selectMonth();
  cy.contains('div[aria-label]', `${day} ${monthYear}`).click({ force: true });
});
