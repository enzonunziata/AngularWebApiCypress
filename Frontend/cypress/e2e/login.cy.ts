describe('Login page', () => {
  it('The landing page should be login', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
  });

  it('Form should give error if username not filled', () => {
    cy.login('', 'dfgdfg');
    cy.get('div.alert').should('contain', 'Invalid form values');
  });

  it('Form should give error if password not filled', () => {
    cy.login('olkjsbdfg', '');
    cy.get('div.alert').should('contain', 'Invalid form values');
  });

  it('Form should give error if unauthorized', () => {
    cy.login('olkjsbdfg', 'sdfgsdfg');
    cy.get('div.alert').should('contain', 'Unauthorized');
  });

  it('should redirect to products after successful login', () => {
    cy.login('admin@example.com', 'Admin');
    cy.url().should('eq', Cypress.config().baseUrl + '/products');
  });

  it('login should set local storage key', () => {
    cy.login('admin@example.com', 'Admin');

    const key = Cypress.config().baseUrl!;

    cy.getAllLocalStorage().then((result) => {
      expect(result).ownProperty(key);
      expect(result[key]).ownProperty('auth');
    });
  });

  it('should be able to logout', () => {
    cy.login('admin@example.com', 'Admin');
    cy.get('a[data-cy="logout-button"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/login');

    const key = Cypress.config().baseUrl!;

    // logout should have removed the localStorage key
    cy.getAllLocalStorage().then((result) => {
      expect(result).not.ownProperty(key);
    });
  });
});
