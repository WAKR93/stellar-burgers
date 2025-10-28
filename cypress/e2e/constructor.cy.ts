import cypress from 'cypress';
import * as testOrder from '../fixtures/order.json';

describe('Тестирование конструктора бургера', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
        cy.visit('/');

        cy.get('[data-cy="burger-constructor"]').as('constructor');
        cy.get('[data-ingredient="bun"]').as('bun');
        cy.get('[data-ingredient="main"]').as('main');
        cy.get('[data-ingredient="sauce"]').as('sauce');
        cy.get('#modals').as('modals');
        cy.get('[data-order-button]').as('orderButton');
    });

    it('Тестирование существования компонента', () => {
        cy.get('@bun').should('exist');
        cy.get('@main').should('exist');
        cy.get('@sauce').should('exist');
    });

    it('Удаление компонента из пустого конструктора', () => {
        cy.get('@constructor').find('.constructor-element__action').should('not.exist');
    });

    it('Удаление компонента', () => {
        cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]').children('button').click();
        cy.get('@constructor').should('contain', 'Филе Люминесцентного тетраодонтимформа');
        cy.get('.constructor-element__action').click();
        cy.get('@constructor').should('not.contain', 'Филе Люминесцентного тетраодонтимформа');
    });

    it('Тестирование добавления компонента', () => {
        cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');
        cy.get('@constructor').should('not.contain', 'Филе Люминесцентного тетраодонтимформа');
        cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').children('button').click();
        cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]').children('button').click();
        cy.get('@constructor').should('contain', 'Краторная булка N-200i');
        cy.get('@constructor').should('contain', 'Филе Люминесцентного тетраодонтимформа');
    });

    describe('Тестирование модального окна', () => {
        it('Тестирование открытия модального окна', () => {
            cy.get('@modals').should('not.be.visible');
            cy.get('@bun').click();
            cy.get('@modals').children().should('have.length', 2);
            cy.get('@modals').should('contain', 'Краторная булка N-200i');
        });

        it('Тестирование закрытия модального окна по кнопке', () => {
            cy.get('@bun').click();
            cy.get('#modals button:first-of-type').click();
            cy.wait(500);
            cy.get('@modals').children().should('have.length', 0);
        });

        it('Тестирование закрытия модального окна на оверлей', () => {
            cy.get('@bun').click();
            cy.get('#modals>div:nth-of-type(2)').click({ force: true });
            cy.wait(500);
            cy.get('@modals').children().should('have.length', 0);
        });
    });

    describe('Тестирование создания заказа', () => {
        beforeEach(() => {
            cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
            cy.intercept('POST', 'api/orders', { fixture: 'order' });
            cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

            cy.setCookie('accessToken', 'testToken');
            localStorage.setItem('refreshToken', 'testToken');

            cy.visit('/');
        });

        it('Тестирование оформления заказа', () => {
            cy.get('@orderButton').should('be.disabled');
            cy.get('@bun').contains('Добавить').click();
            cy.get('@main').contains('Добавить').click();
            cy.get('@orderButton').click(); 
            cy.get('@modals').children().should('have.length', 2);
            cy.get('#modals h2:first-of-type').should('have.text', testOrder.order.number);
            cy.get('#modals button:first-of-type').click();
            cy.wait(500);
            cy.get('@modals').children().should('have.length', 0);
            cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');
            cy.get('@constructor').should('not.contain', 'Филе Люминесцентного тетраодонтимформа');
        });

        afterEach(() => {
            cy.clearCookie('accessToken');
            localStorage.removeItem('refreshToken');
        });
    });
});


/*describe('Burger Constructor', () => {
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
});*/