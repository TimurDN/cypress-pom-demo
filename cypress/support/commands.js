// AUTH
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  cy.contains('Signup / Login').click();
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);
  cy.get('button[data-qa="login-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.contains('Logout').click();
});

// REGISTRATION
Cypress.Commands.add('register', (user) => {
  cy.visit('/');
  cy.contains('Signup / Login').click();
  cy.get('input[data-qa="signup-name"]').type(user.name);
  cy.get('input[data-qa="signup-email"]').type(user.email);
  cy.get('button[data-qa="signup-button"]').click();

  cy.get('#id_gender1').check();
  cy.get('#password').type(user.password);
  cy.get('#days').select('10');
  cy.get('#months').select('May');
  cy.get('#years').select('1990');
  cy.get('#first_name').type(user.firstName);
  cy.get('#last_name').type(user.lastName);
  cy.get('#address1').type(user.address);
  cy.get('#country').select(user.country);
  cy.get('#state').type(user.state);
  cy.get('#city').type(user.city);
  cy.get('#zipcode').type(user.zipcode);
  cy.get('#mobile_number').type(user.mobile);
  cy.get('button[data-qa="create-account"]').click();
});

// PRODUCT
Cypress.Commands.add('searchProduct', (productName) => {
  cy.get('input[data-qa="search-product"]').type(productName);
  cy.get('button[data-qa="search-button"]').click();
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains(productName).parents('.product-overlay').within(() => {
    cy.contains('Add to cart').click({ force: true });
  });
  cy.contains('Continue Shopping').click();
});

Cypress.Commands.add('goToCart', () => {
  cy.contains('Cart').click();
});
