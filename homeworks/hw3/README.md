https://github.com/jhu-oose/2020-fall-group-fantastic-sniffle

Tim Chung - tchung17 

Inpyo Ma - ima2 

Jang Woo Park - jpark278 

Hyunsu Shin - hshin28


Hyunsu added the /books, /addbooks, /delauthor, and /delbook routes. Jang Woo wrote the unit test cases in RESTAPITest.java and tried to figure out
where our errors were coming from, specifically the 500 Internal Server Errors.
Inpyo and Tim also worked on fixing any bugs they found in the process of testing the endpoints. An assumption we made was that we could input random/default
arguments for title, publisher, year, and authorId in /delbook and for numOfBooks and nationality in /delauthor since isbn is unique in the Books table and name is unique in the Authors table, indicating that deletion can be done solely using isbn for Books and name for Authors.