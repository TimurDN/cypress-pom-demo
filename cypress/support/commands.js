import * as LoginLocators from '../support/team-a/locators/login-locators.js';

Cypress.Commands.add('login', (email, password) => {
  cy.get(LoginLocators.SIGNUP_LOGIN_LINK).click();
  cy.get(LoginLocators.LOGIN_EMAIL_INPUT).type(email);
  cy.get(LoginLocators.LOGIN_PASSWORD_INPUT).type(password);
  cy.get(LoginLocators.LOGIN_BUTTON).click();
});

Cypress.Commands.add('logout', () => {
  cy.get(LoginLocators.LOGOUT_LINK).click();
});

// Custom Assertions
Cypress.Commands.add('assertLoggedInState', (user) => {
  cy.contains(user.name).should('be.visible');
  cy.get(LoginLocators.LOGOUT_LINK).should('be.visible');
  cy.get(LoginLocators.CART_LINK).should('be.visible');
  cy.get(LoginLocators.SIGNUP_LOGIN_LINK).should('not.exist');
  cy.url().should('eq', Cypress.config('baseUrl') + '/');
});

Cypress.Commands.add('assertLoggedOutState', (user) => {
  cy.url().should('include', '/login');
  cy.get(LoginLocators.SIGNUP_LOGIN_LINK).should('be.visible');
  cy.contains(user.name).should('not.exist');
  cy.get(LoginLocators.LOGOUT_LINK).should('not.exist');
});
