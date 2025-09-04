# BookSwap

BookSwap är en simpel app byggd med Next.js och Prisma som låter användare byta och hantera böcker. Appen innehåller autentisering, dashboard med användarens böcker, och möjligheten att lägga till nya böcker. Cypress används för end-to-end tester av användarflöden.
I framtiden är tanken att man ska kunna byta med andra användare samt kunna kontakta andra användare gällande bokönskemål.

## Funktioner

- Registrering och inloggning
- Dashboard som visar användarens böcker med status (Available / Loaned out)
- Lägga till nya böcker
- Sign-out funktionalitet
- End-to-end tester med Cypress

## Kom igång

1. Lägg till atlas url till din databas i `.env` filen
2. Kör `npm install` för att installera dependencies
3. Publicera databasen med `npm run push`
4. Seeda sedan databasen med `npm run seed`
5. Starta utvecklingsservern med `npm run dev`
6. Öppna en ny terminal och kör `npm test`

## Användarflöden som testas

#### Authentication Flows

##### Registrering av ny användare

"Karin wants to create an account on BookSwap. She visits the sign-up page, fills in her name, email, and password, and submits the form. She is successfully registered and automatically redirected to the dashboard, where she sees the message 'Welcome to BookSwap!'."

##### Inloggning av befintlig användare

"Karin wants to log in to her account. She goes to the sign-in page, enters her email and password, and submits the form. She is successfully signed in and redirected to the dashboard, where she sees 'Welcome to BookSwap!'."

##### Felaktigt lösenord vid inloggning

"Karin tries to log in with the wrong password. She enters her email and an incorrect password. After submitting, she remains on the sign-in page and sees an error message: 'Invalid email or password'."

##### Sign out / logga ut

"Karin is logged in and wants to log out. She clicks the 'Sign out' button on the dashboard. She is redirected to the sign-in page and sees the 'Sign In' option again."

#### Book Flows

##### Viewing initial books on the dashboard

"When Karin visits her dashboard, she sees a list of her books. Initially, the books 'Lord of the Rings' and 'The Wise Mans Fear' are displayed."

##### Adding a new book

"Karin wants to add a new book. She visits '/books/add', fills in the title 'Wild Magic' and author 'Tamora Pierce', and submits the form. After submission, she is redirected to the dashboard and sees the new book 'Wild Magic' in the list."

##### Displaying book availability (Available / Loaned out)

"On the dashboard, each book is displayed with its title, author, and availability status. Karin sees 'Lord of the Rings by J.R.R. Tolkien (Available)' and 'The Wise Mans Fear by Robert C. Martin (Loaned out)'."
