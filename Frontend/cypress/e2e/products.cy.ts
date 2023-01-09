describe('Product list page', () => {
  beforeEach(() => {
    cy.login('admin@example.com', 'Admin');
    cy.visit('/products');
  });

  it('Should have h3 title', () => {
    cy.get('h3').should('contain', 'Product list');
  });

  it('Should have pagination', () => {
    cy.get('ul.pagination').should('exist');
  });

  it('Default page should be 1', () => {
    cy.get('li.page-item.active > a').should('contain', '1');
  });

  it('Can switch to page 2', () => {
    cy.get('a[ng-reflect-router-link="/products/2"]').click();
    cy.get('li.page-item.active > a').should('contain', '2');
    cy.url().should('contain', '/2');
  });

  it('Should show "there are not products"', () => {
    cy.intercept('GET', '/api/products?page=1', {
      body: {
        currentPage: 1,
        itemsPerPage: 5,
        totalItems: 0,
        totalPages: 0,
        items: [],
      },
      statusCode: 200,
    });
    cy.visit('/products');
    cy.get('p[data-cy="p-no-products"]').should(
      'contain.text',
      'There are no products'
    );
  });

  it('Can visit product', () => {
    cy.get('a[ng-reflect-router-link="/product/G234H63"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/product/G234H63');
  });
});
