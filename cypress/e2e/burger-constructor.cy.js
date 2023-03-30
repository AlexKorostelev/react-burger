import { baseApiUrl } from "../../src/utils/burger-api";

const ingredient1Class =
  ":nth-child(1) > :nth-child(1) > .IngredientGroup_cards_container__E0ALD > :nth-child(1)";
const ingredient2Class =
  ":nth-child(2) > :nth-child(1) > .IngredientGroup_cards_container__E0ALD > :nth-child(2)";

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
    cy.get('[data-cy="modal-wrapper"]').should("exist");
    cy.contains("Детали ингредиента");
  });

  it("should close ingredient details by button", function () {
    cy.contains("Краторная булка N-200i").click();
    cy.get('[data-cy="modal_close_icon"]').click();
    cy.get('[data-cy="modal-wrapper"]').should("not.exist");
  });

  it("should drag-n-drop ingredients", function () {
    cy.get(ingredient1Class).drag(".BurgerConstructor_items_container__Y7AZH");
    cy.get(ingredient2Class).drag(".BurgerConstructor_items_container__Y7AZH");
    cy.contains("Краторная булка N-200i (верх)");
    cy.contains("Краторная булка N-200i (низ)");
    cy.contains("2590");
  });

  it("should remove ingredient from constructor", function () {
    cy.get(ingredient1Class).drag(".BurgerConstructor_items_container__Y7AZH");
    cy.get(ingredient2Class).drag(".BurgerConstructor_items_container__Y7AZH");
    cy.get('[data-cy="remove_ingredient_icon"]').click();
    cy.get(".BurgerConstructor_items_container__Y7AZH")
      .find("section")
      .should("have.length", 2);
    cy.contains("2510");
  });

  it("should remove ingredient from constructor", function () {
    cy.visit("http://localhost:3000#/login");

    cy.get(":nth-child(2) > .input > .input__textfield").type("alex1@alex.ru");
    cy.get(":nth-child(3) > .input > .input__textfield").type("1234");
    cy.get(".button").click();
    cy.get(ingredient1Class).drag(".BurgerConstructor_items_container__Y7AZH");
    cy.get(ingredient2Class).drag(".BurgerConstructor_items_container__Y7AZH");
    cy.get(".button").click();
    cy.get('[data-testid="falling-lines"]').should("exist");
    cy.wait("@postOrder");
    cy.get('[data-cy="modal-wrapper"]').should("exist");
    cy.contains("Идентификатор заказа");
    cy.get('[data-cy="modal_close_icon"]').click();
  });
});
