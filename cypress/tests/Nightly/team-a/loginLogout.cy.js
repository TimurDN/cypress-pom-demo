describe('Login and Logout Functionality', () => {
  beforeEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.fixture('users/user').as('user');
  });

  it('should log in successfully and display correct user state', function () {
    cy.login(this.user.email, this.user.password);
    cy.contains(this.user.name).should('be.visible');
    cy.contains('Logout').should('be.visible');
    cy.contains('Cart').should('be.visible');
    cy.contains('Signup / Login').should('not.exist');
    cy.url().should('eq', Cypress.env('baseUrl') + '/');
  });

  it('should log out successfully', function () {
    cy.login(this.user.email, this.user.password);
    cy.logout();
    cy.url().should('include', '/login');
    cy.contains('Signup / Login').should('be.visible');
    cy.contains(this.user.name).should('not.exist');
    cy.contains('Logout').should('not.exist');
  });

  it('should show error with invalid credentials', function () {
    cy.visit('/');
    cy.contains('Signup / Login').click();
    cy.get('input[data-qa="login-email"]').type('notarealuser@example.com');
    cy.get('input[data-qa="login-password"]').type('wrongpassword');
    cy.get('button[data-qa="login-button"]').click();
    cy.contains('Your email or password is incorrect!').should('be.visible');
  });
});
