// AUTH & REGISTRATION LOCATORS
const SIGNUP_LOGIN_LINK = 'Signup / Login';
const LOGOUT_LINK = 'Logout';

const LOGIN_EMAIL_INPUT = 'input[data-qa="login-email"]';
const LOGIN_PASSWORD_INPUT = 'input[data-qa="login-password"]';
const LOGIN_BUTTON = 'button[data-qa="login-button"]';

const SIGNUP_NAME_INPUT = 'input[data-qa="signup-name"]';
const SIGNUP_EMAIL_INPUT = 'input[data-qa="signup-email"]';
const SIGNUP_BUTTON = 'button[data-qa="signup-button"]';

const GENDER_MR = '#id_gender1';
const PASSWORD_INPUT = '#password';
const DAYS_SELECT = '#days';
const MONTHS_SELECT = '#months';
const YEARS_SELECT = '#years';
const FIRST_NAME_INPUT = '#first_name';
const LAST_NAME_INPUT = '#last_name';
const ADDRESS1_INPUT = '#address1';
const COUNTRY_SELECT = '#country';
const STATE_INPUT = '#state';
const CITY_INPUT = '#city';
const ZIPCODE_INPUT = '#zipcode';
const MOBILE_INPUT = '#mobile_number';
const CREATE_ACCOUNT_BUTTON = 'button[data-qa="create-account"]';

Cypress.Commands.add('login', (email, password) => {
  cy.contains(SIGNUP_LOGIN_LINK).click();
  cy.get(LOGIN_EMAIL_INPUT).type(email);
  cy.get(LOGIN_PASSWORD_INPUT).type(password);
  cy.get(LOGIN_BUTTON).click();
});

Cypress.Commands.add('logout', () => {
  cy.contains(LOGOUT_LINK).click();
});

