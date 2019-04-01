describe("The navigation bar should", () => {

  it("display desktop components when on desktop viewport", () => {
    cy.visit("/");

    cy.get(".no-display-mobile")
      .should("be.visible");
  });

  it("display mobile components when on mobile viewport", () => {
    cy.visit("/");
    cy.viewport('iphone-6');

    cy.get("[data-acctest='mobile-menu']")
      .should("be.visible")
      .click();

    cy.get(".no-display-mobile")
      .should("not.be.visible");

    cy.get("[data-acctest='mobile-drawer']")
      .should("be.visible");

    cy.get("[data-acctest='drawer-close']")
      .click();

    cy.get("[data-acctest='mobile-drawer']")
      .should("not.be.visible");
  });

});
