describe("Authentication flows", () => {
 it("should allow a new user to register", () => {
  cy.visit("/sign-up");
  cy.get('input[name="name"]').type("Karin Testsson");
  cy.get('input[name="email"]').type("karin@example.com");
  cy.get('input[name="password"]').type("SuperSecret123!");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
  cy.contains("Welcome to BookSwap!");
});

 it("should allow an existing user to sign in", () => {
    cy.visit("/sign-in");
    cy.get('input[name="email"]').type("karin@example.com");
    cy.get('input[name="password"]').type("SuperSecret123!");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome to BookSwap!");
  });

  it("should show error on wrong password", () => {
    cy.visit("/sign-in");
    cy.get('input[name="email"]').type("karin@example.com");
    cy.get('input[name="password"]').type("WrongPassword123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/sign-in");
    cy.contains("Invalid email or password");
  });

  it("should allow a user to sign out", () => {
  // Logga in först
  cy.visit("/sign-in");
  cy.get('input[name="email"]').type("karin@example.com");
  cy.get('input[name="password"]').type("SuperSecret123!");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");

  // Klicka på Sign out
  cy.contains("Sign out").click();

  // Borde redirectas till /sign-in
  cy.url().should("include", "/sign-in");
  cy.contains("Sign In"); // eller rubrik/knapp på sign-in sidan
});

});
