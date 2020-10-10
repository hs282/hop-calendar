https://github.com/jhu-oose/2020-fall-group-fantastic-sniffle

Tim Chung - tchung17

Inpyo Ma - ima2

Jang Woo Park - jpark278

Hyunsu Shin - hshin28

Hyunsu added the Show all books and Add book links along with the /books and /addbook endpoints. When adding a book, we assumed
that if a new author is inserted into the table, but the book insertion fails, the author must be deleted from the table. Another assumption
made when adding a new book was that if the author's name is the same as that of an author already in the table, 
but the nationality and/or number of books differs, the authors are still considered the same author.

Tim went around and fixed miscellaneous bugs. 
Jang Woo was responsible for debugging and saving the user's color of choice as cookie.

Inpyo set the session cookie for user's colors of choice and made sure the welcome message is printed in the same color. He also updated all four views such that only users that have previously signed in can access them.
