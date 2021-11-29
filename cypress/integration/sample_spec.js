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
    
    context('API request with the graphql query', () => {
        it("Correct UI element rendering", () => {

            //Step 1. Open the initial page.
            cy.viewport("macbook-13");
            cy.visit("https://www.producthunt.com/");

            //Step 2. Send the graphql query and check the correct render of its result.
            cy.request({
                    url: 'https://www.producthunt.com/frontend/graphql',
                    body: {
                        "operationName": "HomepageSidebarQuery",
                        "variables": {},
                        "query": "query HomepageSidebarQuery{upcomingPagesCard{...UpcomingPagesSidebarCardFragment __typename}jobs(first:4 order:FEATURED kind:INHOUSE){edges{node{...JobsSidebarCardFragment __typename}__typename}__typename}stories(first:3 order:NEWEST){edges{node{id ...StoriesSidebarCardFragment __typename}__typename}__typename}makerMainGroup{id hpSidebarDiscussions{id ...DiscussionSidebarCardItemFragment __typename}__typename}}fragment UpcomingPagesSidebarCardFragment on UpcomingPagesCard{upcomingPages{id slug name tagline subscriberCount ...UpcomingPageSubscribeButton ...UpcomingPageThumbnail __typename}__typename}fragment UpcomingPageSubscribeButton on UpcomingPage{id isSubscribed __typename}fragment UpcomingPageThumbnail on UpcomingPage{id name logoUuid backgroundImageUuid thumbnailUuid __typename}fragment JobsSidebarCardFragment on Job{_id id companyName imageUuid url isFeatured jobTitle locations __typename}fragment StoriesSidebarCardFragment on AnthologiesStory{id slug title headerImageUuid minsToRead __typename}fragment DiscussionSidebarCardItemFragment on DiscussionThread{_id id title commentsCount votesCount hasVoted slug featuredAt user{_id id name avatarUrl ...UserImage __typename}__typename}fragment UserImage on User{_id id name username avatarUrl headline isViewer badgesCount ...KarmaBadge __typename}fragment KarmaBadge on User{karmaBadge{kind score __typename}__typename}"
                    }
                })
                .its('body')
                .then((body) => {
                    const jobsFromApi = body.data.jobs.edges;

                    cy
                        .get('.style_sidebarWithSeparator___M3Mc a[href*="job_by_homepage"]')
                        .should('have.length', jobsFromApi.length)
                })
        });
    })
});