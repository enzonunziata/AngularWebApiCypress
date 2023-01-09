describe('Product detail page', () => {
  beforeEach(() => {
    cy.login('admin@example.com', 'Admin');
  });

  it('Should have h3 title', () => {
    cy.visit('/product/AJ76D09');
    cy.get('h3').should('contain', 'Product detail');
  });

  it('Should contain product information', () => {
    cy.visit('/product/H387NM3');
    cy.get('li').eq(0).should('contain', 'Product 06');
    cy.get('li').eq(1).should('contain', 'H387NM3');
    cy.get('li').eq(2).should('contain', 'It has roots in a piece');
    cy.get('li').eq(3).should('contain', '353.00');
  });

  it('Can go back to product list', () => {
    cy.visit('/product/QM76GH6');
    cy.get('a.btn-secondary').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/products');
  });
});
