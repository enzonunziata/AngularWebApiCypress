declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<any>;
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');

  if (username.length > 0) {
    cy.get('input[formControlName="username"]').type(username);
  }

  if (password.length > 0) {
    cy.get('input[formControlName="password"]').type(password);
  }

  cy.get('button').click();
});
