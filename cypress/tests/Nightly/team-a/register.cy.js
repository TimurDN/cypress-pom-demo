// cypress/tests/Nightly/team-a/register.cy.js

describe('User Registration', () => {
  beforeEach(function () {
    cy.visit(Cypress.env('baseUrl'));
    cy.fixture('users/user').as('user');
  });

  it('Validate user registration flow with unique email', function () {
    const timestamp = Date.now();
    const uniqueUser = {
      ...this.user,
      email: `timur_${timestamp}@example.com`,
    };

    cy.startRegistration(uniqueUser);

    cy.get('#id_gender1', { timeout: 5000 }).should('be.visible');
    cy.completeRegistrationForm(uniqueUser);

    cy.contains('Account Created!').should('be.visible');
  });

  it('Should show error when registering with an already existing email', function () {
    cy.startRegistration(this.user);

    cy.contains('Email Address already exist!').should('be.visible');
  });
});
