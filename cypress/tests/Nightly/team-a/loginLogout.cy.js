import * as LoginLocators from '../../../support/team-a/locators/login-locators.js';

describe(
  'Login and Logout Functionality',
  { retries: 2 },
  () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit('/');
    });

    it('should log in successfully and display correct user state', () => {
      cy.fixture('users/user').then((user) => {
        cy.contains(LoginLocators.SIGNUP_LOGIN_LINK).click();
        cy.get(LoginLocators.LOGIN_EMAIL_INPUT).type(user.email);
        cy.get(LoginLocators.LOGIN_PASSWORD_INPUT).type(user.password);
        cy.get(LoginLocators.LOGIN_BUTTON).click();
        cy.assertLoggedInState(user);
      });
    });

    it('should log out successfully', () => {
      cy.fixture('users/user').then((user) => {
        cy.contains(LoginLocators.SIGNUP_LOGIN_LINK).click();
        cy.get(LoginLocators.LOGIN_EMAIL_INPUT).type(user.email);
        cy.get(LoginLocators.LOGIN_PASSWORD_INPUT).type(user.password);
        cy.get(LoginLocators.LOGIN_BUTTON).click();
        cy.contains(LoginLocators.LOGOUT_LINK).click();
        cy.assertLoggedOutState(user);
      });
    });

    it('should show error with invalid credentials', () => {
      cy.contains(LoginLocators.SIGNUP_LOGIN_LINK).click();
      cy.get(LoginLocators.LOGIN_EMAIL_INPUT).type('notarealuser@example.com');
      cy.get(LoginLocators.LOGIN_PASSWORD_INPUT).type('wrongpassword');
      cy.get(LoginLocators.LOGIN_BUTTON).click();
      cy.contains(LoginLocators.INCORRECT_LOGIN_ERROR).should('be.visible');
    });
  }
);
