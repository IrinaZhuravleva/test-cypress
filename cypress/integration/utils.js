export const login = (userFirstName, userLastName, email) => {
    cy.get("#SubscriptionForm_first_name")
        .type(userFirstName)
        .should("have.value", userFirstName)
    cy.get("#SubscriptionForm_last_name")
        .type(userLastName)
        .should("have.value", userLastName)
    cy.get("#SubscriptionForm_email")
        .type(email)
        .should("have.value", email)
}
