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

    it('Validate user registration flow with unique email', function () {
      const timestamp = Date.now();
      const uniqueUser = {
        ...this.user,
        email: `timur_${timestamp}@example.com`,
      };

      registrationPage.startRegistration(uniqueUser);

      cy.get(RegistrationLocators.GENDER_MR, { timeout: 5000 }).should('be.visible');
      registrationPage.completeRegistrationForm(uniqueUser);

      cy.contains('Account Created!').should('be.visible');
    });

    it('Should show error when registering with an already existing email', function () {
      registrationPage.startRegistration(this.user);

      cy.contains('Email Address already exist!').should('be.visible');
    });
  }
);