import * as CartLocators from '../locators/cart-locators.js';

export const cartAssertions = {
  assertProductInCart(productName, expectedQuantity = '1', expectedPrice) {
    cy.get(CartLocators.CART_DESCRIPTION).should('contain.text', productName);
    cy.contains(CartLocators.CART_DESCRIPTION, productName)
      .parents('tr')
      .within(() => {
        cy.get(CartLocators.CART_QUANTITY_DISABLED_BUTTON).should('have.text', expectedQuantity);

        if (expectedPrice) {
          cy.get(CartLocators.CART_PRICE)
            .invoke('text')
            .then((actualPrice) => {
              expect(actualPrice.replace(/\s/g, '')).to.contain(expectedPrice.replace(/\s/g, ''));
            });
        } else {
          cy.get(CartLocators.CART_PRICE).should('be.visible');
        }
      });
  },

  assertCartIsEmpty() {
    cy.get(CartLocators.CART_TABLE_ROWS).should('have.length', 0);
  },

  /**
   * Parameterized assertion: checks each expected product's price, quantity, and total in the cart.
   * @param {Array} expectedProducts - [{ name: 'Blue Top', price: 500, quantity: 2, total: 1000 }, ...]
   */
  assertCartProductTotals(expectedProducts = []) {
    cy.get('#cart_info_table tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('td.cart_description').invoke('text').then((descText) => {
          // Try to find matching product in expectedProducts array
          const product = expectedProducts.find(p => descText.includes(p.name));
          if (!product) return; // If product not in expected list, skip this row

          // Get price from UI
          cy.get('td.cart_price > p').invoke('text').then((unitPriceText) => {
            const priceMatch = unitPriceText.match(/[\d,]+/);
            const unitPrice = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0;
            expect(unitPrice).to.eq(product.price);

            // Get quantity from UI
            cy.get('td.cart_quantity > button.disabled').invoke('text').then((qtyText) => {
              const quantity = Number(qtyText);
              expect(quantity).to.eq(product.quantity);

              // Get total from UI
              cy.get('td.cart_total > p.cart_total_price').invoke('text').then((totalText) => {
                const totalMatch = totalText.match(/[\d,]+/);
                const total = totalMatch ? parseFloat(totalMatch[0].replace(/,/g, '')) : 0;
                expect(total).to.eq(product.total);
                // Also assert UI math
                expect(total).to.eq(unitPrice * quantity);
              });
            });
          });
        });
      });
    });
  }
};
