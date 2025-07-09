import { CartPage } from '../../../pages/team-a/CartPage';
import { cartAssertions } from '../../../support/team-a/assertions/cartAssertions';
import { SearchPage } from '../../../pages/team-a/SearchPage';
import * as CartLocators from '../../../support/team-a/locators/cart-locators.js';
import * as SearchLocators from '../../../support/team-a/locators/search-locators.js';

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

            cy.get(CartLocators.CART_MODAL).should('not.be.visible');
            cartPage.goToCart();
            cartPage.clearCartIfNotEmpty();
            cartAssertions.assertCartIsEmpty();
        });

        it('should display correct product in cart after search and add', () => {
            searchPage.searchProduct(productName);

            cy.get(SearchLocators.SEARCHED_PRODUCTS_TITLE).contains('Searched Products');
            cy.contains(SearchLocators.PRODUCT_INFO, productName).should('exist');

            cartPage.addProductToCart(productName);
            cy.get(CartLocators.CONTINUE_SHOPPING_BUTTON).click();
            cy.get(CartLocators.CART_MODAL).should('not.be.visible');

            cartPage.goToCart();
            cartAssertions.assertProductInCart(productName);
        });

        it('should show no products when searching for a non-existent item', () => {
            const nonexistentProduct = 'qwertyuiop-doesnotexist-123';

            searchPage.searchProduct(nonexistentProduct);
            cy.get(SearchLocators.PRODUCT_INFO).should('not.exist');
        });

        it('should remove product from cart and confirm cart is empty', () => {
            searchPage.searchProduct(productName);
            cartPage.addProductToCart(productName);

            cy.get(CartLocators.CONTINUE_SHOPPING_BUTTON).click();
            cy.get(CartLocators.CART_MODAL).should('not.be.visible');

            cartPage.goToCart();
            cartAssertions.assertProductInCart(productName);

            cy.get(CartLocators.CART_DELETE_BUTTON).click();
            cartAssertions.assertCartIsEmpty();
        });

        it('should allow adding multiple products to cart', () => {
            searchPage.searchProduct(productName);
            cartPage.addProductToCart(productName);

            cy.get(CartLocators.CONTINUE_SHOPPING_BUTTON).click();
            cy.get(CartLocators.CART_MODAL).should('not.be.visible');

            searchPage.searchProduct(secondProductName);
            cartPage.addProductToCart(secondProductName);

            cy.get(CartLocators.CONTINUE_SHOPPING_BUTTON).click();
            cy.get(CartLocators.CART_MODAL).should('not.be.visible');

            cartPage.goToCart();
            cartAssertions.assertProductInCart(productName);
            cartAssertions.assertProductInCart(secondProductName);
        });
    }
);
