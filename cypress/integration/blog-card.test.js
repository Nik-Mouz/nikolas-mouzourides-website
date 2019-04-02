describe("Blog cards should be", () => {

  it("less than or equal to 3 on the home page", () => {
    cy.visit("/");

    cy.get("[data-acctest='blog-card']")
      .its("length")
      .should("lte", 3);
  });

  it("equal to the amount of blogs in the blogs directory on the blogs page", () => {
    cy.visit("/blog");

    cy.task("getBlogsInFileSystem").then((amount) => {
      cy.get("[data-acctest='blog-card']")
        .its("length")
        .should("eq", amount);
    });
  });
});
