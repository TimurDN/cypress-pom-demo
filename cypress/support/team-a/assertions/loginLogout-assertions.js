import * as LoginLocators from '../../../support/team-a/locators/login-locators';

Cypress.Commands.add('assertLoggedInState', (user) => {
  cy.contains(user.name).should('be.visible');
  cy.contains(LoginLocators.LOGOUT_LINK).should('be.visible');
  cy.contains(LoginLocators.CART_LINK).should('be.visible');
  cy.contains(LoginLocators.SIGNUP_LOGIN_LINK).should('not.exist');
  cy.url().should('eq', Cypress.config('baseUrl') + '/');
});

Cypress.Commands.add('assertLoggedOutState', (user) => {
  cy.url().should('include', '/login');
  cy.contains(LoginLocators.SIGNUP_LOGIN_LINK).should('be.visible');
  cy.contains(user.name).should('not.exist');
  cy.contains(LoginLocators.LOGOUT_LINK).should('not.exist');
});
