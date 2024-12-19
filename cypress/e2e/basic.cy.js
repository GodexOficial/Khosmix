describe("Basic Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the homepage", () => {
    cy.get("h1").should("contain", "Khosmix");
  });

  it("should navigate to sections", () => {
    cy.get('a[href="#sectionsobre"]').click();
    cy.get("#sectionsobre").should("be.visible");

    cy.get('a[href="#trabalhos"]').click();
    cy.get("#trabalhos").should("be.visible");

    cy.get('a[href="#nossotime"]').click();
    cy.get("#nossotime").should("be.visible");
  });

  it("should open contact form", () => {
    cy.get('button:contains("Contato")').click();
    cy.get('[data-testid="contact-form"]').should("be.visible");
  });
}); 