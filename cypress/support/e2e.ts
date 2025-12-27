import './commands';

// Убираем оверлей вебпак дев сервера перед каждым тестом
beforeEach(() => {
  cy.window().then((win) => {
    // Ждем пока приложение загрузится
    cy.wait(1000);
    
    // Убираем оверлей вебпак дев сервера если он есть
    const overlay = win.document.getElementById('webpack-dev-server-client-overlay');
    if (overlay) {
      overlay.remove();
    }
    
    // Убираем другие возможные оверлеи
    const errorOverlay = win.document.querySelector('iframe[src*="webpack-dev-server"]');
    if (errorOverlay) {
      errorOverlay.remove();
    }
  });
});

// После каждого теста проверяем и убираем оверлей
afterEach(() => {
  cy.window().then((win) => {
    const overlay = win.document.getElementById('webpack-dev-server-client-overlay');
    if (overlay) {
      overlay.remove();
    }
  });
});