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