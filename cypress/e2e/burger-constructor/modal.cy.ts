import {
  API_ENDPOINTS,
  DATA_SELECTORS,
  FIXTURES,
  INGREDIENTS_TEXTS,
  UI_ROUTES,
} from "../../support/constants";

describe("Modal with ingredient details", () => {
  beforeEach(() => {
    cy.intercept("GET", API_ENDPOINTS.GET_USER, {
      fixture: FIXTURES.GET_USER,
    }).as("getUser");
    cy.intercept("GET", API_ENDPOINTS.GET_INGREDIENTS, {
      fixture: FIXTURES.GET_INGREDIENTS,
    }).as("getIngredients");

    cy.visit(UI_ROUTES.HOME);

    cy.wait("@getIngredients");

    cy.get(DATA_SELECTORS.BURGER_INGREDIENTS).should("be.visible");
  });

  it("should be opened when clicking on an ingredient", () => {
    cy.contains(INGREDIENTS_TEXTS.BUN_FLUORESCENT).click();

    cy.location("pathname").should("equal", UI_ROUTES.INGREDIENT_DETAILS);

    cy.get(DATA_SELECTORS.MODAL).should("be.visible");

    cy.get(DATA_SELECTORS.MODAL).within(() => {
      cy.contains(INGREDIENTS_TEXTS.BUN_FLUORESCENT).should("be.visible");

      cy.contains("Белки").should("be.visible");
      cy.contains("44").should("be.visible");

      cy.contains("Жиры").should("be.visible");
      cy.contains("26").should("be.visible");

      cy.contains("Углеводы").should("be.visible");
      cy.contains("85").should("be.visible");

      cy.contains("Калории").should("be.visible");
      cy.contains("643").should("be.visible");
    });
  });

  it("should be closed when clicking close button", () => {
    cy.contains(INGREDIENTS_TEXTS.BUN_FLUORESCENT).click();

    cy.get(DATA_SELECTORS.MODAL).should("be.visible");

    cy.get(DATA_SELECTORS.MODAL_CLOSE).click();

    cy.get(DATA_SELECTORS.MODAL).should("not.exist");

    cy.location("pathname").should("equal", UI_ROUTES.HOME);
  });

  it("should be closed when clicking outside the modal window", () => {
    cy.contains(INGREDIENTS_TEXTS.BUN_FLUORESCENT).click();

    cy.get(DATA_SELECTORS.MODAL).should("be.visible");

    cy.get(DATA_SELECTORS.MODAL_OVERLAY).click("topLeft", { force: true });

    cy.get(DATA_SELECTORS.MODAL).should("not.exist");

    cy.location("pathname").should("equal", UI_ROUTES.HOME);
  });
});
