import * as RegistrationLocators from '../../support/team-a/locators/register-locators.js';

export class RegistrationPage {
  startRegistration(user) {
    cy.contains(RegistrationLocators.SIGNUP_LOGIN_LINK).click();
    cy.get(RegistrationLocators.SIGNUP_NAME_INPUT).type(user.name);
    cy.get(RegistrationLocators.SIGNUP_EMAIL_INPUT).type(user.email);
    cy.get(RegistrationLocators.SIGNUP_BUTTON).click();
  }

  completeRegistrationForm(user) {
    cy.get(RegistrationLocators.GENDER_MR).check();
    cy.get(RegistrationLocators.PASSWORD_INPUT).type(user.password);
    cy.get(RegistrationLocators.DAYS_SELECT).select('10');
    cy.get(RegistrationLocators.MONTHS_SELECT).select('May');
    cy.get(RegistrationLocators.YEARS_SELECT).select('1990');
    cy.get(RegistrationLocators.FIRST_NAME_INPUT).type(user.firstName);
    cy.get(RegistrationLocators.LAST_NAME_INPUT).type(user.lastName);
    cy.get(RegistrationLocators.ADDRESS1_INPUT).type(user.address);
    cy.get(RegistrationLocators.COUNTRY_SELECT).select(user.country);
    cy.get(RegistrationLocators.STATE_INPUT).type(user.state);
    cy.get(RegistrationLocators.CITY_INPUT).type(user.city);
    cy.get(RegistrationLocators.ZIPCODE_INPUT).type(user.zipcode);
    cy.get(RegistrationLocators.MOBILE_INPUT).type(user.mobile);
    cy.get(RegistrationLocators.CREATE_ACCOUNT_BUTTON).click();
  }
}
