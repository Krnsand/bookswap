describe("Book flows", () => {
  beforeEach(() => {

    cy.visit("/sign-in");
    cy.get('input[name="email"]').type("karin@example.com");
    cy.get('input[name="password"]').type("SuperSecret123!");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("should allow adding a book (happy path)", () => {
    cy.visit("/books/add");
    cy.get('input[name="title"]').type("The Pragmatic Programmer");
    cy.get('input[name="author"]').type("Andy Hunt");
    cy.get('button[type="submit"]').click();
    cy.visit("/dashboard");
    cy.contains("The Pragmatic Programmer");
  });

  it("should show error when trying to swap unavailable book (not happy path)", () => {
    cy.visit("/books/123"); 
    cy.contains("Request Swap").click();
    cy.contains("This book is not available for swap.");
  });
});
