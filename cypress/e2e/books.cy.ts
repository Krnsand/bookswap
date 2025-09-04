

describe("Book flows", () => {
  const books = [
    { id: "1", title: "Lord of the Rings", author: "J.R.R. Tolkien", available: true },
    { id: "2", title: "The Wise Mans Fear", author: "Patrick Rothfuss", available: false },
  ];

  beforeEach(() => {
    cy.intercept("GET", "/api/books", (req) => {
      req.reply({ statusCode: 200, body: books });
    }).as("getBooks");

    cy.intercept("POST", "/api/books", (req) => {
      const newBook = {
        id: String(books.length + 1),
        title: req.body.title,
        author: req.body.author,
        available: true,
      };
      books.push(newBook); 
      req.reply({ statusCode: 200, body: newBook });
    }).as("postBook");
  });

  it("should show initial books on dashboard", () => {
    cy.visit("/dashboard");
    cy.wait("@getBooks");
    cy.contains("Lord of the Rings");
    cy.contains("The Wise Mans Fear");
  });

  it("should allow adding a book", () => {
    cy.visit("/books/add");

    cy.get('input[name="title"]').type("Wild Magic");
    cy.get('input[name="author"]').type("Tamora Pierce");
    cy.get('button[type="submit"]').click();

    cy.wait("@postBook");

    cy.visit("/dashboard");
    cy.wait("@getBooks");
    cy.contains("Wild Magic");
  });

 it("should show available vs loaned out correctly", () => {
  cy.visit("/dashboard");
  cy.wait("@getBooks");

  cy.contains("Lord of the Rings by J.R.R. Tolkien (Available)");
  cy.contains("The Wise Mans Fear by Patrick Rothfuss (Loaned out)");
});

});
