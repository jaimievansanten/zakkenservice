
const URL = 'https://www.zakkenservice.nl';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    cy.log(err.message);

    return false;
});

describe('Zakkenservice', () => {
    it('Requests new PMD bags', () => {
        cy.visit(URL);

        fillInput('[name="ctl00$MainContent$TextBox1"]', Cypress.env('postal_code'));
        fillInput('[name="ctl00$MainContent$TextBox2"]', Cypress.env('house_number'));

        cy.get('#ctl00_MainContent_Label4')
          .contains('Postcode gecontroleerd, druk op bestellen.')
          .should('be.visible');

        cy.get('[type=submit]').first().click();
        cy.screenshot();
    });
});

var fillInput = (selector, value) => {
    cy.get(selector)
    .first()
    .type(value)
    .blur()
    .wait(500);
};
