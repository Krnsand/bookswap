// cypress/e2e/books.cy.ts

describe("Book flows", () => {
  // Mock-array som håller alla böcker under testen
  const books = [
    { id: "1", title: "The Pragmatic Programmer", author: "Andy Hunt", available: true },
    { id: "2", title: "Clean Code", author: "Robert C. Martin", available: false },
  ];

  beforeEach(() => {
    // Mock GET /api/books
    cy.intercept("GET", "/api/books", (req) => {
      req.reply({ statusCode: 200, body: books });
    }).as("getBooks");

    // Mock POST /api/books
    cy.intercept("POST", "/api/books", (req) => {
      const newBook = {
        id: String(books.length + 1),
        title: req.body.title,
        author: req.body.author,
        available: true,
      };
      books.push(newBook); // Lägg till boken i mock-arrayen
      req.reply({ statusCode: 200, body: newBook });
    }).as("postBook");
  });

  it("should show initial books on dashboard", () => {
    cy.visit("/dashboard");
    cy.wait("@getBooks");
    cy.contains("The Pragmatic Programmer");
    cy.contains("Clean Code");
  });

  it("should allow adding a book (happy path)", () => {
    cy.visit("/books/add");

    cy.get('input[name="title"]').type("Refactoring");
    cy.get('input[name="author"]').type("Martin Fowler");
    cy.get('button[type="submit"]').click();

    cy.wait("@postBook");

    // Besök dashboard och verifiera att boken finns
    cy.visit("/dashboard");
    cy.wait("@getBooks");
    cy.contains("Refactoring");
  });

 it("should show available vs loaned out correctly", () => {
  cy.visit("/dashboard");
  cy.wait("@getBooks");

  cy.contains("The Pragmatic Programmer by Andy Hunt (Available)");
  cy.contains("Clean Code by Robert C. Martin (Loaned out)");
});


});
