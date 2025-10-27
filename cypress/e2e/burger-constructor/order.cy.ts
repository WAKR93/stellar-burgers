import {
  API_ENDPOINTS,
  BUTTON_TEXTS,
  DATA_SELECTORS,
  DUMMY_TEXTS,
  FIXTURES,
  INGREDIENTS_TEXTS,
  SUCCESS_ORDER_TEXTS,
  TOKENS,
  UI_ROUTES,
} from "../../support/constants";

describe("Burger order", () => {
  beforeEach(() => {
    cy.intercept("GET", API_ENDPOINTS.GET_INGREDIENTS, {
      fixture: FIXTURES.GET_INGREDIENTS,
    }).as("getIngredients");
  });

  context("Unauthenticated user", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();

      cy.intercept("GET", API_ENDPOINTS.GET_USER, {
        fixture: FIXTURES.GET_NO_USER,
        statusCode: 401,
      }).as("getUser");

      cy.visit(UI_ROUTES.HOME);

      cy.wait("@getUser");
      cy.wait("@getIngredients");

      cy.get(DATA_SELECTORS.BURGER_INGREDIENTS).should("be.visible");
    });

    it("should redirect to login page after order button click", () => {
      cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR)
        .contains("button", BUTTON_TEXTS.ORDER_BUTTON)
        .click();

      cy.location("pathname").should("equal", UI_ROUTES.LOGIN);
    });
  });

  context("Authenticated user", () => {
    beforeEach(() => {
      cy.setCookie("accessToken", TOKENS.ACCESS);
      cy.window().then((win) => {
        win.localStorage.setItem("refreshToken", TOKENS.REFRESH);
      });

      cy.intercept("GET", API_ENDPOINTS.GET_USER, {
        fixture: FIXTURES.GET_USER,
      }).as("getUser");

      cy.visit(UI_ROUTES.HOME);

      cy.wait("@getUser");
      cy.wait("@getIngredients");

      cy.get(DATA_SELECTORS.BURGER_INGREDIENTS).should("be.visible");
    });

    it("should create order after order button click", () => {
      const bunItem = cy.contains(INGREDIENTS_TEXTS.BUN_FLUORESCENT).parent("li");
      const addBunButton = bunItem.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

      const ingredientItem1 = cy.contains(INGREDIENTS_TEXTS.INGREDIENT_TETRAODONT).parent("li");
      const addIngredientButton1 = ingredientItem1.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

      const ingredientItem2 = cy.contains(INGREDIENTS_TEXTS.INGREDIENT_TREE).parent("li");
      const addIngredientButton2 = ingredientItem2.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

      addBunButton.click();
      addIngredientButton1.click();
      addIngredientButton2.click();

      cy.intercept("POST", API_ENDPOINTS.CREATE_ORDER, {
        fixture: FIXTURES.CREATE_ORDER,
      }).as("createOrder");

      cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR)
        .find("button")
        .contains(BUTTON_TEXTS.ORDER_BUTTON)
        .click();

      cy.wait("@createOrder");

      cy.get(DATA_SELECTORS.MODAL)
        .should("be.visible")
        .within(() => {
          cy.get("h2").should("have.text", SUCCESS_ORDER_TEXTS.ORDER_NUMBER);
          cy.get("p").contains(SUCCESS_ORDER_TEXTS.ORDER_NUMBER_CAPTION).should("exist");
        });

      cy.get(DATA_SELECTORS.MODAL_CLOSE).click();
      cy.get(DATA_SELECTORS.MODAL).should("not.exist");

      cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR).within(() => {
        cy.get(`div:contains("${DUMMY_TEXTS.CHOOSE_BUNS}")`).should("have.length", 2);
        cy.get(`ul > :contains("${DUMMY_TEXTS.CHOOSE_INGREDIENT}")`).should("have.length", 1);
      });
    });
  });
});
