import {
    login
} from './utils'

describe('Sending feedback form', () => {
    context('Positive case', () => {
        it("The subsciption letter is successefully sent", () => {
            //Step 1. Open the initial page.
            cy.viewport("macbook-13");
            cy.visit("https://www.g5e.com/ru/");

            //Step 2. Close the teaser pop-up.
            cy.get("button.takeover-close.close-icon").click();

            //Step 3. Close the cookie pop-up.
            cy.get(
                "button.cookiePopup__btn.btn.btn--secondary.btn--shadow-primary"
            ).click();

            //Step 4. Click the subcription link and check the correct page opening.
            cy.clickLink("li.desktop-menu__item.desktop-menu__subscript");
            cy.url().should("include", "/email");

            //Step 6. Fill in the form, check its content.
            cy.fixture('user.json').then((user) => {
                login(user.name, user.familyname, user.email);
            });

            //Step 7. Send the subscription form.
            cy.get("form.subscribe__form").submit()

            //Step 8. Check the text of the pop-up with the success confirmation.
            cy.get(".thank-msg").should("include.text", "Проверьте вашу почту");
        });
    })

    context("Negative case", () => {
        it("The system shows errors during the incorrect subsciption", () => {
            //Step 1. Open the initial page.
            cy.viewport("macbook-13");
            cy.visit("https://www.g5e.com/ru/");

            //Step 2. Close the teaser pop-up.
            cy.get("button.takeover-close.close-icon").click();

            //Step 3. Close the cookie pop-up.
            cy.get(
                "button.cookiePopup__btn.btn.btn--secondary.btn--shadow-primary"
            ).click();

            //Step 4. Click the subcription link and check the correct page opening.
            cy.clickLink("li.desktop-menu__item.desktop-menu__subscript");
            cy.url().should("include", "/email");

            //Step 6. Try to send the subscrition form whithout filling the form fields.
            cy.get("form.subscribe__form").submit();

            //Step 7. Check the text of the pop-up which confirms the success sending.
            cy.get(".ajax-msg.assert.assert--error.error").should("include.text", "Необходимо заполнить поле с адресом электронной почты.");
        });
    });
});