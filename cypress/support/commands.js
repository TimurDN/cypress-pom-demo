// AUTH LOCATORS
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

// AUTH COMMANDS
Cypress.Commands.add('login', (email, password) => {
  cy.contains(SIGNUP_LOGIN_LINK).click();
  cy.get(LOGIN_EMAIL_INPUT).type(email);
  cy.get(LOGIN_PASSWORD_INPUT).type(password);
  cy.get(LOGIN_BUTTON).click();
});

Cypress.Commands.add('logout', () => {
  cy.contains(LOGOUT_LINK).click();
});

// Step 1: Signup form (name + email)
Cypress.Commands.add('startRegistration', (user) => {
  cy.contains(SIGNUP_LOGIN_LINK).click();
  cy.get(SIGNUP_NAME_INPUT).type(user.name);
  cy.get(SIGNUP_EMAIL_INPUT).type(user.email);
  cy.get(SIGNUP_BUTTON).click();
});

// Step 2: Full form after initial signup
Cypress.Commands.add('completeRegistrationForm', (user) => {
  cy.get(GENDER_MR).check();
  cy.get(PASSWORD_INPUT).type(user.password);
  cy.get(DAYS_SELECT).select('10');
  cy.get(MONTHS_SELECT).select('May');
  cy.get(YEARS_SELECT).select('1990');
  cy.get(FIRST_NAME_INPUT).type(user.firstName);
  cy.get(LAST_NAME_INPUT).type(user.lastName);
  cy.get(ADDRESS1_INPUT).type(user.address);
  cy.get(COUNTRY_SELECT).select(user.country);
  cy.get(STATE_INPUT).type(user.state);
  cy.get(CITY_INPUT).type(user.city);
  cy.get(ZIPCODE_INPUT).type(user.zipcode);
  cy.get(MOBILE_INPUT).type(user.mobile);
  cy.get(CREATE_ACCOUNT_BUTTON).click();
});
