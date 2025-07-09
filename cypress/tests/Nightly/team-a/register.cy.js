import { RegistrationPage } from '../../../pages/team-a/RegisterPage';
import * as RegistrationLocators from '../../../support/team-a/locators/register-locators.js';

const registrationPage = new RegistrationPage();

describe(
  'User Registration',
  { retries: 2 },
  function () {
    beforeEach(function () {
      cy.visit('/');
      cy.fixture('users/user').as('user');
    });

    afterEach(function () {
      // Only delete if a unique user was created in this test
      if (this.uniqueUser && this.uniqueUser.email) {
        cy.visit('/');
        cy.get(RegistrationLocators.ACCOUNT_DELETE_BUTTON).click();
        cy.contains('Account Deleted').should('be.visible');
      }
    });

    it('Validate user registration flow with unique email', function () {
      const timestamp = Date.now();
      const uniqueUser = {
        ...this.user,
        email: `timur_${timestamp}@example.com`,
      };
      this.uniqueUser = uniqueUser; // Save for afterEach

      registrationPage.startRegistration(uniqueUser);
      cy.url().should('include', '/signup');
      cy.get(RegistrationLocators.GENDER_MR, { timeout: 5000 }).should('be.visible');
      registrationPage.completeRegistrationForm(uniqueUser);

      cy.get(RegistrationLocators.ACCOUNT_CREATED_TEXT).should('be.visible');
      cy.url().should('include', '/account_created');
    });

    it('Should show error when registering with an already existing email', function () {
      registrationPage.startRegistration(this.user);

      cy.contains(RegistrationLocators.EMAIL_ALREADY_EXISTS_TEXT).should('be.visible');
      cy.url().should('include', '/signup');
    });
  }
);