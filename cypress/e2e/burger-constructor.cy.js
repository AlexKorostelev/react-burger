import { baseApiUrl } from "../../src/utils/burger-api";

const ingredient1 = '[data-cy="ingredientItem-60d3b41abdacab0026a733c6"]';
const ingredient2 = '[data-cy="ingredientItem-60d3b41abdacab0026a733cd"]';
const modalWindow = '[data-cy="modal-wrapper"]';
const modalCloseButton = '[data-cy="modal-close-icon"]';
const constructorContainer = '[data-cy="constructor-container"]';
const spinner = '[data-testid="falling-lines"]';
const inputEmail = '[data-cy="input-email"]';
const inputPassword = '[data-cy="input-password"]';
const removeIngredientButton = '[data-cy="remove-ingredient-icon"]';

describe("template spec", () => {
  beforeEach(function () {
    cy.intercept("POST", `${baseApiUrl}/orders`, {
      fixture: "orders.json",
      delay: 1000,
    }).as("postOrder");
    cy.viewport(1024, 768);
    cy.visit("localhost:3000");
  });

  it("should be available localhost:3000", function () {
    cy.contains("Соберите бургер");
  });

  it("should open ingredient details", function () {
    cy.contains("Краторная булка N-200i").click();
    cy.get(modalWindow).should("exist");
    cy.contains("Детали ингредиента");
  });

  it("should close ingredient details by button", function () {
    cy.contains("Краторная булка N-200i").click();
    cy.get(modalCloseButton).click();
    cy.get(modalWindow).should("not.exist");
  });

  it("should drag-n-drop ingredients", function () {
    cy.get(ingredient1).drag(constructorContainer);
    cy.get(ingredient2).drag(constructorContainer);
    cy.contains("Краторная булка N-200i (верх)");
    cy.contains("Краторная булка N-200i (низ)");
    cy.contains("2590");
  });

  it("should remove ingredient from constructor", function () {
    cy.get(ingredient1).drag(constructorContainer);
    cy.get(ingredient2).drag(constructorContainer);
    cy.get(removeIngredientButton).click();
    cy.get(constructorContainer).find("section").should("have.length", 2);
    cy.contains("2510");
  });

  it("should remove ingredient from constructor", function () {
    cy.visit("http://localhost:3000#/login");

    cy.get(inputEmail).type("alex1@alex.ru");
    cy.get(inputPassword).type("1234");
    cy.get(".button").click();
    cy.get(ingredient1).drag(constructorContainer);
    cy.get(ingredient2).drag(constructorContainer);
    cy.get(".button").click();
    cy.get(spinner).should("exist");
    cy.wait("@postOrder");
    cy.get(modalWindow).should("exist");
    cy.contains("Идентификатор заказа");
    cy.get(modalCloseButton).click();
  });
});
