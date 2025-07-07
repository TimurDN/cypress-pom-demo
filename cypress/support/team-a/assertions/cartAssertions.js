import * as CartLocators from '../locators/cart-locators.js';

export const cartAssertions = {
  assertProductInCart(productName, expectedQuantity = '1') {
    cy.get(CartLocators.CART_DESCRIPTION).should('contain.text', productName);
    cy.get(CartLocators.CART_PRICE).should('be.visible');
    cy.contains(CartLocators.CART_DESCRIPTION, productName)
      .parents('tr')
      .find(CartLocators.CART_QUANTITY_DISABLED_BUTTON)
      .should('have.text', expectedQuantity);
  },

  assertCartIsEmpty() {
    cy.get(CartLocators.CART_TABLE_ROWS).should('have.length', 0);
  },
};
