import {
  API_ENDPOINTS,
  BUTTON_TEXTS,
  CLASS_SELECTORS,
  DATA_SELECTORS,
  FIXTURES,
  INGREDIENTS_TEXTS,
} from "../../support/constants";

describe("Burger constructor", () => {
  beforeEach(() => {
    cy.intercept("GET", API_ENDPOINTS.GET_USER, {
      fixture: FIXTURES.GET_USER,
    }).as("getUser");
    cy.intercept("GET", API_ENDPOINTS.GET_INGREDIENTS, {
      fixture: FIXTURES.GET_INGREDIENTS,
    }).as("getIngredients");

    cy.visit("/");

    cy.wait("@getIngredients");

    cy.get(DATA_SELECTORS.BURGER_INGREDIENTS).should("be.visible");
  });

  it("should show bun on both sides after adding", () => {
    const bunItem = cy.contains(INGREDIENTS_TEXTS.BUN_FLUORESCENT).parent("li");
    const addButton = bunItem.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

    addButton.click();

    cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR).within(() => {
      cy.get(CLASS_SELECTORS.TOP_BUN).should("contain", INGREDIENTS_TEXTS.BUN_FLUORESCENT);

      cy.get(CLASS_SELECTORS.BOTTOM_BUN).should("contain", INGREDIENTS_TEXTS.BUN_FLUORESCENT);
    });
  });

  it("should show new bun on both sides after changing", () => {
    const bunItem1 = cy.contains(INGREDIENTS_TEXTS.BUN_FLUORESCENT).parent("li");
    const addButton1 = bunItem1.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

    addButton1.click();

    cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR).within(() => {
      cy.get(CLASS_SELECTORS.TOP_BUN).should("contain", INGREDIENTS_TEXTS.BUN_FLUORESCENT);

      cy.get(CLASS_SELECTORS.BOTTOM_BUN).should("contain", INGREDIENTS_TEXTS.BUN_FLUORESCENT);
    });

    const bunItem2 = cy.contains(INGREDIENTS_TEXTS.BUN_CRATER).parent("li");
    const addButton2 = bunItem2.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

    addButton2.click();

    cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR).within(() => {
      cy.get(CLASS_SELECTORS.TOP_BUN).should("contain", INGREDIENTS_TEXTS.BUN_CRATER);

      cy.get(CLASS_SELECTORS.BOTTOM_BUN).should("contain", INGREDIENTS_TEXTS.BUN_CRATER);
    });
  });

  it("should show bun and ingredient after adding", () => {
    const bunItem = cy.contains(INGREDIENTS_TEXTS.BUN_FLUORESCENT).parent("li");
    const addBunButton = bunItem.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);
    const ingredientItem = cy.contains(INGREDIENTS_TEXTS.INGREDIENT_MAGNOLIA).parent("li");
    const addIngredientButton = ingredientItem.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

    addBunButton.click();
    addIngredientButton.click();

    cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR).within(() => {
      cy.get(CLASS_SELECTORS.TOP_BUN).should("contain", INGREDIENTS_TEXTS.BUN_FLUORESCENT);

      cy.get(CLASS_SELECTORS.CONSTRUCTOR_ELEMENT).should(
        "contain",
        INGREDIENTS_TEXTS.INGREDIENT_MAGNOLIA,
      );

      cy.get(CLASS_SELECTORS.BOTTOM_BUN).should("contain", INGREDIENTS_TEXTS.BUN_FLUORESCENT);
    });
  });

  it("should show remaining ingredients after removal", () => {
    const ingredientItem1 = cy.contains(INGREDIENTS_TEXTS.INGREDIENT_MAGNOLIA).parent("li");
    const addIngredientButton1 = ingredientItem1.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

    const ingredientItem2 = cy.contains(INGREDIENTS_TEXTS.INGREDIENT_RINGS).parent("li");
    const addIngredientButton2 = ingredientItem2.find("button").contains(BUTTON_TEXTS.ADD_BUTTON);

    addIngredientButton1.click();
    addIngredientButton2.click();

    cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR).within(() => {
      cy.get(CLASS_SELECTORS.CONSTRUCTOR_ELEMENT).should(
        "contain",
        INGREDIENTS_TEXTS.INGREDIENT_MAGNOLIA,
      );

      cy.get(CLASS_SELECTORS.CONSTRUCTOR_ELEMENT).should(
        "contain",
        INGREDIENTS_TEXTS.INGREDIENT_RINGS,
      );

      cy.get(CLASS_SELECTORS.CONSTRUCTOR_ELEMENT)
        .contains(INGREDIENTS_TEXTS.INGREDIENT_RINGS)
        .closest(CLASS_SELECTORS.CONSTRUCTOR_ELEMENT)
        .find(CLASS_SELECTORS.ELEMENT_REMOVE_BUTTON)
        .click();
    });

    cy.get(DATA_SELECTORS.BURGER_CONSTRUCTOR).within(() => {
      cy.get(CLASS_SELECTORS.CONSTRUCTOR_ELEMENT).should(
        "contain",
        INGREDIENTS_TEXTS.INGREDIENT_MAGNOLIA,
      );

      cy.get(CLASS_SELECTORS.CONSTRUCTOR_ELEMENT).should(
        "not.contain",
        INGREDIENTS_TEXTS.INGREDIENT_RINGS,
      );
    });
  });
});
