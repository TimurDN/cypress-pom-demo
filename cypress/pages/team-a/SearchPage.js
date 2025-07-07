import * as SearchLocators from '../../support/team-a/locators/search-locators.js';

export class SearchPage {
  searchProduct(productName) {
    cy.get(SearchLocators.PRODUCTS_LINK)
      .should('be.visible')
      .first()
      .click({ force: true });

    cy.get(SearchLocators.SEARCH_INPUT, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(productName);

    cy.get(SearchLocators.SUBMIT_SEARCH_BUTTON)
      .should('be.visible')
      .click();
  }
}
