import { CartPage } from '../../../pages/team-a/CartPage';
import { cartAssertions } from '../../../support/team-a/assertions/cartAssertions';
import { SearchPage } from '../../../pages/team-a/SearchPage';

const cartPage = new CartPage();
const searchPage = new SearchPage();

describe(
  'Cart Functionality',
  { retries: 2 },
  () => {
    const productName = 'Blue Top';
    const secondProductName = 'Men Tshirt';

    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit('/');
      cy.fixture('users/user').then((user) => {
        cy.login(user.email, user.password);
      });
      cy.get('#cartModal').should('not.be.visible');
      cartPage.goToCart();
      cartPage.clearCartIfNotEmpty();
      cartAssertions.assertCartIsEmpty();
    });

    it('should display correct product in cart after search and add', () => {
      searchPage.searchProduct(productName);
      cy.contains('Searched Products').should('be.visible');
      cy.contains('.productinfo', productName).should('exist');
      cartPage.addProductToCart(productName);
      cy.contains('Continue Shopping').click();
      cy.get('#cartModal').should('not.be.visible');
      cartPage.goToCart();
      cartAssertions.assertProductInCart(productName);
    });

    it('should show no products when searching for a non-existent item', () => {
      const nonexistentProduct = 'qwertyuiop-doesnotexist-123';
      searchPage.searchProduct(nonexistentProduct);
      cy.get('.productinfo').should('not.exist');
    });

    it('should remove product from cart and confirm cart is empty', () => {
      searchPage.searchProduct(productName);
      cartPage.addProductToCart(productName);
      cy.contains('Continue Shopping').click();
      cy.get('#cartModal').should('not.be.visible');
      cartPage.goToCart();
      cartAssertions.assertProductInCart(productName);
      cy.get('a.cart_quantity_delete').click();
      cartAssertions.assertCartIsEmpty();
    });

    it('should allow adding multiple products to cart', () => {
      searchPage.searchProduct(productName);
      cartPage.addProductToCart(productName);
      cy.contains('Continue Shopping').click();
      cy.get('#cartModal').should('not.be.visible');
      searchPage.searchProduct(secondProductName);
      cartPage.addProductToCart(secondProductName);
      cy.contains('Continue Shopping').click();
      cy.get('#cartModal').should('not.be.visible');
      cartPage.goToCart();
      cartAssertions.assertProductInCart(productName);
      cartAssertions.assertProductInCart(secondProductName);
    });
  }
);