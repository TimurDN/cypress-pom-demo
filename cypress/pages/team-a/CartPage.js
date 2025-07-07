import * as CartLocators from '../../support/team-a/locators/cart-locators.js';

export class CartPage {
    goToCart() {
        cy.get(CartLocators.CART_LINK).first().click();
    }

    clearCartIfNotEmpty() {
        cy.get('body').then(($body) => {
            if ($body.find(CartLocators.CART_DELETE_BUTTON).length) {
                cy.get(CartLocators.CART_DELETE_BUTTON).each(($el) => {
                    cy.wrap($el).click();
                });
            }
        });
    }

    addProductToCart(productName) {
        cy.contains(CartLocators.PRODUCT_INFO_SELECTOR, productName)
            .parents(CartLocators.PRODUCT_CONTAINER_SELECTOR)
            .within(() => {
                cy.contains(CartLocators.ADD_TO_CART_BUTTON_TEXT).click();
            });
        cy.contains('Continue Shopping').click({ force: true });
    }
}
