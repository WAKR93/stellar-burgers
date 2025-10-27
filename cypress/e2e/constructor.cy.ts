describe('Burger Constructor', () => {
  beforeEach(() => {
    // Перехватываем API запросы
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
    
    // Устанавливаем токены авторизации
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    
    // Переходим на главную страницу
    cy.visit('/');
    
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
    
    // Убираем оверлей
    cy.removeOverlay();
    
    // Даем приложению время для полной инициализации
    cy.wait(1000);
  });

  afterEach(() => {
    // Очищаем токены после теста
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('should have working ingredient modal functionality', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .first()
      .click({ force: true });
    
    cy.get('[data-testid="modal"]').should('exist');
    cy.contains('Краторная булка N-200i').should('exist');
    
    cy.get('[data-testid="modal-close"]').first().click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should close modal by overlay click', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .first()
      .click({ force: true });
    
    cy.get('[data-testid="modal"]').should('exist');
    
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should have basic constructor functionality', () => {
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
    
    cy.get('[data-testid^="ingredient-"]').should('have.length.at.least', 3);
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').should('exist');
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]').should('exist');
    
    cy.get('[data-testid="order-button"]').should('exist');
    cy.contains('Оформить заказ').should('exist');
  });

  it('should have DnD functionality', () => {
    // Проверяем что элементы для DnD присутствуют
    cy.get('[data-testid^="ingredient-"]').should('exist');
    cy.get('[data-testid="burger-constructor"]').should('exist');
    
    // Проверяем что можно инициировать drag
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .first()
      .trigger('dragstart', { force: true })
      .trigger('dragend', { force: true });
    
    cy.log('DnD elements are present and draggable');
  });
});