describe("Blog cards should be", () => {

  it("less than 4 on the home page", () => {
    cy.visit("/");

    cy.get("[data-blog-card='AT-blog-card']")
      .its("length")
      .should("lt", 4);
  });

  it("equal to the amount of markdown files in the blogs directory", async () => {
    cy.visit("/blog");

    const amount = await cy.task("getBlogsInFileSystem");
    cy.get("[data-blog-card='AT-blog-card']")
      .its("length")
      .should("eq", amount);
  });
});
