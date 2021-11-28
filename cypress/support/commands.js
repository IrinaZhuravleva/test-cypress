Cypress.Commands.add('clickLink', (label) => {
    cy.get(label).click()
});