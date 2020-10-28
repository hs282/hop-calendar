import java.net.*;
import java.sql.*;
import static spark.Spark.*;
import spark.*;

import com.google.gson.Gson;
import exception.DaoException;
import model.Author;
import model.Book;
//import org.sql2o.Connection;
import org.sql2o.Sql2o;
import persistence.Sql2oAuthorDao;
import persistence.Sql2oBookDao;
import spark.ModelAndView;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import spark.template.velocity.VelocityTemplateEngine;
import sun.tools.jconsole.JConsole;

// comment for testing github auto

//codes under update database needs to new codes to satisfy postgresql
public class Server {
    final static int PORT = 5000;

    private static Sql2o getSql2o() {

        //need to create Sql2o for heroku
        String herokuPort = System.getenv("PORT");
        if (herokuPort != null) {
            String databaseUrl = System.getenv("DATABASE_URL");
            URI dbUri = null;
            try {
                dbUri = new URI(databaseUrl);
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
            String username = dbUri.getUserInfo().split(":")[0];
            String password = dbUri.getUserInfo().split(":")[1];
            String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
            + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";
            final String URI = dbUrl;
            final String USERNAME = username;
            final String PASSWORD = password;
            return new Sql2o(URI, USERNAME, PASSWORD);
        }
        final String URI = "jdbc:postgresql://localhost:7000/";
        final String USERNAME = "postgres";
        final String PASSWORD = "971106";
        return new Sql2o(URI, USERNAME, PASSWORD);

    }

    private static int getHerokuAssignedPort() {
        String herokuPort = System.getenv("PORT");
        if (herokuPort != null) {
            return Integer.parseInt(herokuPort);
        }
        return PORT;
    }

    private static Connection getConnection() throws URISyntaxException, SQLException {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null) {
            // Not on Heroku, so use SQLite
            return (Connection) DriverManager.getConnection("jdbc:postgresql://localhost:7000/", "postgres", "971106");
        }

        URI dbUri = new URI(databaseUrl);

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
                + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

        return (Connection) DriverManager.getConnection(dbUrl, username, password);
    }

    public static void main(String[] args) {
        port(getHerokuAssignedPort());
        //get("/", (req, res) -> "Hi Heroku!");
        Sql2o sql2o = getSql2o();
        //set up database table
        workWithDatabase();

        //staticFiles.location("/public");

        post("/", (req, res) -> {
            String username = req.queryParams("username");
            res.cookie("username", username);
            res.redirect("/");
            return null;
        });


        get("/", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            if (req.cookie("username") != null)
                model.put("username", req.cookie("username"));
            res.status(200);
            res.type("text/html");
            return new ModelAndView(model, "public/templates/index.vm");
        }, new VelocityTemplateEngine());


        get("/authors", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            //update database
            //model.put("authors", new Sql2oAuthorDao(sql2o).listAll());
            model.put("authors", new Sql2oAuthorDao(sql2o).listAll());
            res.status(200);
            res.type("text/html");
            return new ModelAndView(model, "public/templates/authors.vm");
        }, new VelocityTemplateEngine());


        get("/addauthor", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            res.status(200);
            res.type("text/html");
            return new ModelAndView(model, "public/templates/addauthor.vm");

        }, new VelocityTemplateEngine());


        post("/addauthor", (req, res) -> {
            System.out.println(req.queryParams("name"));
            Map<String, Object> model = new HashMap<>();
            String name = req.queryParams("name");
            int numOfBooks = Integer.parseInt(req.queryParams("numOfBooks"));
            String nationality = req.queryParams("nationality");
            Author author = new Author(name, numOfBooks, nationality);
            try {
                //update database
                int id = new Sql2oAuthorDao(sql2o).add(author);
                //int id = new Sql2oAuthorDao(getConnection().getSql2o()).add(author);
                if (id > 0) {
                    model.put("added", "true");
                } else {
                    model.put("failedAdd", "true");
                }
            } catch (DaoException ex) {
                model.put("failedAdd", "true");
            }
            res.status(201);
            res.type("text/html");
            ModelAndView mdl = new ModelAndView(model, "public/templates/addauthor.vm");
            return new VelocityTemplateEngine().render(mdl);
        });


        post("/delauthor", (req, res) -> {
            String name = req.queryParams("name");
            Author a = new Author(name, 0, "");
            //update database
            new Sql2oAuthorDao(getSql2o()).delete(a);
            //new Sql2oAuthorDao(getConnection().getSql2o()).delete(a);
            res.status(200);
            res.type("application/json");
            return new Gson().toJson(a.toString());
        });


        get("/books", (req, res) -> {

            //if not signed then redirect
            if (req.cookie("username") == null) {
                res.redirect("/");
                return null;
            }

            Map<String, Object> model = new HashMap<>();
            //update database
            model.put("books", new Sql2oBookDao(sql2o).listAll());
            //model.put("books", new Sql2oBookDao(getConnection().getSql2o()).listAll());
            res.status(200);
            res.type("text/html");
            return new ModelAndView(model, "public/templates/books.vm");
        }, new VelocityTemplateEngine());


        get("/addbook", (req, res) -> {

            //if not signed then redirect
            if (req.cookie("username") == null) {
                res.redirect("/");
                return null;
            }

            Map<String, Object> model = new HashMap<>();
            res.status(200);
            res.type("text/html");
            return new ModelAndView(model, "public/templates/addbook.vm");
        }, new VelocityTemplateEngine());


        post("/addbook", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            String isbn = req.queryParams("isbn");
            String title = req.queryParams("title");
            String publisher = req.queryParams("publisher");
            int year = Integer.parseInt(req.queryParams("year"));

            boolean authorIsNew = false; // set to true if author does not already exist in table
            //boolean incPrevAuthorBook = false; //if author already exists and book added succesfully increment author's num of books
            //Author prev;
            String name = req.queryParams("name");
            int numOfBooks = Integer.parseInt(req.queryParams("numOfBooks"));
            String nationality = req.queryParams("nationality");
            Author author = new Author(name, numOfBooks, nationality);
            int authorId = 0;
            try {
                //update database
                authorId = new Sql2oAuthorDao(sql2o).add(author);
                //authorId = new Sql2oAuthorDao(getConnection().getSql2o()).add(author);
                if (authorId > 0) {
                    authorIsNew = true;
                }

            } catch (DaoException ex) {
                //update database
                List<Author> authorList = new Sql2oAuthorDao(sql2o).listAll();
                //List<Author> authorList = new Sql2oAuthorDao(getConnection().getSql2o()).listAll();
                for (Author a : authorList) {
                    if (a.getName().equals(name)) {
                        authorId = a.getId();
                        //incPrevAuthorBook = true;
                        //prev = a;
                    }
                }
            }

            Book book = new Book(title, isbn, publisher, year, authorId);

            try {
                //update database
                int bookId = new Sql2oBookDao(sql2o).add(book);
                //int bookId = new Sql2oBookDao(getConnection().getSql2o()).add(book);
                if (bookId > 0) {
                    model.put("added", "true");
                    /*if inc needed
                    if (incPrevAuthorBook) {
                        prev.setNumOfBooks(++prev.getNumOfBooks());
                    }
                     */
                }
            } catch (DaoException ex) {
                if (authorIsNew) {
                    //update database
                    new Sql2oAuthorDao(sql2o).delete(author);
                    //new Sql2oAuthorDao(getConnection().getSql2o()).delete(author);
                }
                model.put("failedAdd", "true");
            }

            res.status(201);
            res.type("text/html");
            ModelAndView mdl = new ModelAndView(model, "public/templates/addbook.vm");
            return new VelocityTemplateEngine().render(mdl);
        });


        post("/delbook", (req, res) -> {
            String isbn = req.queryParams("isbn");
            Book b = new Book("", isbn, "", 0, 0);
            new Sql2oBookDao(getSql2o()).delete(b);
            res.status(200);
            res.type("application/json");
            return new Gson().toJson(b.toString());
        });

    }

    private static void workWithDatabase() {
        try (Connection conn = getConnection()) {
            String sql = "";
            String sql2 = "";
            /*
            if ("SQLite".equalsIgnoreCase(conn.getMetaData().getDatabaseProductName())) { // running locally
                sql = "CREATE TABLE IF NOT EXISTS Authors (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE," +
                        " numOfBooks INTEGER, nationality VARCHAR(30));";
                sql2 = "CREATE TABLE IF NOT EXISTS Books (id INTEGER PRIMARY KEY, isbn VARCHAR(100) NOT NULL UNIQUE," +
                        "authorId INTEGER FOREIGN KEY REFERENCES Authors(id)," +
                        " title VARCHAR(30), publisher VARCHAR(30), year INTEGER);";
            } else {
            

                sql = "CREATE TABLE IF NOT EXISTS Authors (id serial PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE," +
                        " numOfBooks INT, nationality VARCHAR(30));";
                sql2 = "CREATE TABLE IF NOT EXISTS Books (id serial PRIMARY KEY, isbn VARCHAR(100) NOT NULL UNIQUE," +
                        "authorId INT FOREIGN KEY REFERENCES Authors(id)," +
                        " title VARCHAR(30), publisher VARCHAR(30), year INTEGER);";
            }*/
            sql = "CREATE TABLE IF NOT EXISTS Authors(id serial PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE, numOfBooks INTEGER, nationality VARCHAR(30));";
            sql2 = "CREATE TABLE IF NOT EXISTS Books(id serial, isbn VARCHAR(100) NOT NULL UNIQUE, authorId INTEGER, title VARCHAR(30), publisher VARCHAR(30), year INTEGER," +
                    "CONSTRAINT fk_author FOREIGN KEY(authorId) REFERENCES Authors(id));";
            Statement st = conn.createStatement();

            st.execute(sql);
            st.execute(sql2);

            //sql = "INSERT INTO Authors(name, numOfBooks, nationality) VALUES ('Leo Tolstoy', 12, 'Russian');";
            //st.execute(sql);

        } catch (URISyntaxException | SQLException e) {
            e.printStackTrace();
        }
    }

}
