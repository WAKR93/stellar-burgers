export const BURGER_API_URL = Cypress.env("BURGER_API_URL");

export const TOKENS = {
  ACCESS: "fake-access-token",
  REFRESH: "fake-refresh-token",
};

export const UI_ROUTES = {
  HOME: "/stellar-burgers",
  LOGIN: "/stellar-burgers/login",
  INGREDIENT_DETAILS: "/stellar-burgers/ingredients/643d69a5c3f7b9001cfa093d",
};

export const API_ENDPOINTS = {
  GET_USER: `${BURGER_API_URL}/auth/user`,
  CREATE_ORDER: `${BURGER_API_URL}/orders`,
  GET_INGREDIENTS: `${BURGER_API_URL}/ingredients`,
};

export const FIXTURES = {
  GET_USER: "user.json",
  GET_NO_USER: "no-user.json",
  CREATE_ORDER: "orders.json",
  GET_INGREDIENTS: "ingredients.json",
};

export const DATA_SELECTORS = {
  MODAL: '[data-cy="modal"]',
  MODAL_CLOSE: '[data-cy="modal-close"]',
  MODAL_OVERLAY: '[data-cy="modal-overlay"]',
  BURGER_INGREDIENTS: '[data-cy="burger-ingredients"]',
  BURGER_CONSTRUCTOR: '[data-cy="burger-constructor"]',
};

export const CLASS_SELECTORS = {
  TOP_BUN: ".constructor-element_pos_top",
  BOTTOM_BUN: ".constructor-element_pos_bottom",
  CONSTRUCTOR_ELEMENT: ".constructor-element",
  ELEMENT_REMOVE_BUTTON: ".constructor-element__action",
};

export const BUTTON_TEXTS = {
  ADD_BUTTON: "Добавить",
  ORDER_BUTTON: "Оформить заказ",
};

export const DUMMY_TEXTS = {
  CHOOSE_BUNS: "Выберите булки",
  CHOOSE_INGREDIENT: "Выберите начинку",
};

export const INGREDIENTS_TEXTS = {
  BUN_CRATER: "Краторная булка N-200i",
  BUN_FLUORESCENT: "Флюоресцентная булка R2-D3",
  INGREDIENT_TREE: "Плоды Фалленианского дерева",
  INGREDIENT_RINGS: "Хрустящие минеральные кольца",
  INGREDIENT_MAGNOLIA: "Биокотлета из марсианской Магнолии",
  INGREDIENT_TETRAODONT: "Филе Люминесцентного тетраодонтимформа",
};

export const SUCCESS_ORDER_TEXTS = {
  ORDER_NUMBER: "73486",
  ORDER_NUMBER_CAPTION: "идентификатор заказа",
};
