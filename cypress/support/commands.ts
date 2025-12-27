/// <reference types="cypress" />

// Кастомная команда для удаления оверлея
Cypress.Commands.add('removeOverlay', () => {
  cy.window().then((win) => {
    const overlay = win.document.getElementById('webpack-dev-server-client-overlay');
    if (overlay) {
      overlay.remove();
    }
  });
});

// Кастомная команда для drag and drop
Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (subject, target) => {
  cy.wrap(subject).trigger('dragstart');
  cy.get(target).trigger('drop');
});

// Объявляем типы для кастомных команд
declare global {
  namespace Cypress {
    interface Chainable {
      removeOverlay(): Chainable<void>;
      dragTo(target: string): Chainable<Element>;
    }
  }
}

export {};