Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    cy.log(err.message);

    return false;
});

describe('Zakkenservice', () => {
    it('Requests new PMD bags', () => {
        cy.visit('https://www.zakkenservice.nl');

        fillInput('[name="ctl00$MainContent$TextBox1"]', 'POSTALCODE');
        fillInput('[name="ctl00$MainContent$TextBox2"]', 'HOUSENUMBER');

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
