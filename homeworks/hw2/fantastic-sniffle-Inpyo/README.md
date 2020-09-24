# MyBooksApp

This is a simple application we build during lectures in fall 2020 OOSE class together to practice with various concepts and technologies. This 
is a web app conforming to Client-Server Architecture where user(s) can store/access their favorite books and authors. The app
will store data in a database and its backend functionalities are implemented as RESTful API end-points.

Tim Chung - tchung17
Inpyo Ma - ima2 
Jang Woo Park - jpark278
Hyunsu Shin - hshin28

https://github.com/orgs/jhu-oose/teams/2020-fall-group-fantastic-sniffle

Inpyo worked on adding the BookDao interface and implementing Sql2oBookDao and the delete methods in both Sql2oAuthorDao and Sql2oBookDao. Jangwoo worked on implementing the update method in both the Sql2oAuthorDao and Sql2oBookDao classes.
Hyunsu worked on the unit tests for Sql2oAuthorDao. She also edited the delete method in Sql2oAuthorDao so that it would recognize the input string for the author’s name in the testing file. An assumption that was made was that deleting an author would delete all of the books associated with him/her.

Tim was responsible for creating the test file for BookDao. He implemented
4 unit tests involving all 4 CRUD (create, read, update, delete)
operations. He also made changes to the Book object (specifically, author property)
in order to get more consistency in the relational model. Tim also 
fixed any bugs he found in the process of testing the BookDao object.
There was definitely a struggle trying to use raw sql queries and he was not able to
figure out how to use a resultset object without errors.