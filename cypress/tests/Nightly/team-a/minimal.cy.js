describe('Minimal test', () => {
  it('should visit home', () => {
    cy.visit('/');
    cy.title().should('exist'); // Checks that the page loads and has a title
  });
});