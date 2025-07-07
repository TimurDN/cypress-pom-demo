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
        cy.login(user.email, user.password);
        cy.contains(user.name).should('be.visible');
        cy.contains('Logout').should('be.visible');
        cy.contains('Cart').should('be.visible');
        cy.contains('Signup / Login').should('not.exist');
        cy.url().should('eq', Cypress.config('baseUrl') + '/');
      });
    });

    it('should log out successfully', () => {
      cy.fixture('users/user').then((user) => {
        cy.login(user.email, user.password);
        cy.logout();
        cy.url().should('include', '/login');
        cy.contains('Signup / Login').should('be.visible');
        cy.contains(user.name).should('not.exist');
        cy.contains('Logout').should('not.exist');
      });
    });

    it('should show error with invalid credentials', () => {
      cy.contains('Signup / Login').click();
      cy.get('input[data-qa="login-email"]').type('notarealuser@example.com');
      cy.get('input[data-qa="login-password"]').type('wrongpassword');
      cy.get('button[data-qa="login-button"]').click();
      cy.contains('Your email or password is incorrect!').should('be.visible');
    });
  }
);