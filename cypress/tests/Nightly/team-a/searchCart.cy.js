import { CartPage } from '../../../pages/team-a/CartPage';
import { cartAssertions } from '../../../support/team-a/assertions/cartAssertions';
import { SearchPage } from '../../../pages/team-a/SearchPage';
import * as CartLocators from '../../../support/team-a/locators/cart-locators.js';
import * as SearchLocators from '../../../support/team-a/locators/search-locators.js';
import { parsePrice } from '../../../support/utils/price';

const cartPage = new CartPage();
const searchPage = new SearchPage();

function buildProductAssertObj(product, quantity = 1) {
  const price = parsePrice(product.price);
  return {
    name: product.name,
    price,
    quantity,
    total: price * quantity
  };
}

describe(
  'Cart Functionality',
  { retries: 2 },
  function () {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit('/');

      cy.fixture('users/user').then((user) => {
        cy.login(user.email, user.password);
      });

      cy.get(CartLocators.CART_MODAL).should('not.be.visible');
      cartPage.goToCart();
      cartPage.clearCartIfNotEmpty();
      cartAssertions.assertCartIsEmpty();
    });

    it('should display correct product in cart after search and add', () => {
      cy.fixture('users/products').then((products) => {
        const product = products[0];

        searchPage.searchProduct(product.name);

        cy.get(SearchLocators.SEARCHED_PRODUCTS_TITLE).contains('Searched Products');
        cy.contains(SearchLocators.PRODUCT_INFO, product.name).should('exist');

        cartPage.addProductToCart(product.name);
        cy.get(CartLocators.CONTINUE_SHOPPING_BUTTON).click();
        cy.get(CartLocators.CART_MODAL).should('not.be.visible');

        cartPage.goToCart();
        cy.url().should('include', '/view_cart');
        cartAssertions.assertProductInCart(product.name, '1', product.price);

        cartAssertions.assertCartProductTotals([
          buildProductAssertObj(product)
        ]);
      });
    });

    it('should show no products when searching for a non-existent item', () => {
      const nonexistentProduct = 'qwertyuiop-doesnotexist-123';

      searchPage.searchProduct(nonexistentProduct);
      cy.get(SearchLocators.PRODUCT_INFO).should('not.exist');
      cy.url().should('include', '/products');
    });

    it('should remove product from cart and confirm cart is empty', () => {
      cy.fixture('users/products').then((products) => {
        const product = products[0];

        searchPage.searchProduct(product.name);
        cartPage.addProductToCart(product.name);

        cy.get(CartLocators.CONTINUE_SHOPPING_BUTTON).click();
        cy.get(CartLocators.CART_MODAL).should('not.be.visible');

        cartPage.goToCart();
        cy.url().should('include', '/view_cart');
        cartAssertions.assertProductInCart(product.name, '1', product.price);

        cartAssertions.assertCartProductTotals([
          buildProductAssertObj(product)
        ]);

        cy.get(CartLocators.CART_DELETE_BUTTON).click();
        cartAssertions.assertCartIsEmpty();
        cy.url().should('include', '/view_cart');
      });
    });

    it('should allow adding multiple products to cart', () => {
      cy.fixture('users/products').then((products) => {
        const product1 = products[0];
        const product2 = products[1];

        expect(product1, 'Product 1 fixture should be loaded').to.exist;
        expect(product2, 'Product 2 fixture should be loaded').to.exist;

        // Add first product
        searchPage.searchProduct(product1.name);
        cartPage.addProductToCart(product1.name);

        cy.get(CartLocators.CONTINUE_SHOPPING_BUTTON).click();
        cy.get(CartLocators.CART_MODAL).should('not.be.visible');

        // Add second product
        searchPage.searchProduct(product2.name);
        cartPage.addProductToCart(product2.name);

        cy.get(CartLocators.CONTINUE_SHOPPING_BUTTON).click();
        cy.get(CartLocators.CART_MODAL).should('not.be.visible');

        cartPage.goToCart();
        cy.url().should('include', '/view_cart');

        cartAssertions.assertProductInCart(product1.name, '1', product1.price);
        cartAssertions.assertProductInCart(product2.name, '1', product2.price);

        cartAssertions.assertCartProductTotals([
          buildProductAssertObj(product1),
          buildProductAssertObj(product2)
        ]);
      });
    });
  }
);