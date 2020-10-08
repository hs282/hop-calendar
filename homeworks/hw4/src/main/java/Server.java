import exception.DaoException;
import model.Author;
import model.Book;
import org.sql2o.Sql2o;
import persistence.Sql2oAuthorDao;
import persistence.Sql2oBookDao;
import spark.ModelAndView;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import static spark.Spark.*;
import spark.template.velocity.VelocityTemplateEngine;

public class Server {
/*
 * current issues
 * currently welcome page, login page works (login works)
 * showing add author and add book works
 * however adding authors and books x work
 * showing authors and books x work
 */



    private static Sql2o getSql2o() {
        final String URI = "jdbc:sqlite:./MyBooksApp.db";
        final String USERNAME = "";
        final String PASSWORD = "";
        return new Sql2o(URI, USERNAME, PASSWORD);
    }

    public static void main(String[] args)  {
        // set port number
        final int PORT_NUM = 7000;
        port(PORT_NUM);

        Sql2o sql2o = getSql2o();

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
            Map<String, Object> model = new HashMap<>();
            String name = req.queryParams("name");
            int numOfBooks = Integer.parseInt(req.queryParams("numOfBooks"));
            String nationality = req.queryParams("nationality");
            Author author = new Author(name, numOfBooks, nationality);
            try {
                int id = new Sql2oAuthorDao(sql2o).add(author);
                if (id > 0) {
                    model.put("added", "true");
                }
                else {
                    model.put("failedAdd", "true");
                }
            }
            catch (DaoException ex) {
                model.put("failedAdd", "true");
            }
            res.status(201);
            res.type("text/html");
            ModelAndView mdl = new ModelAndView(model, "public/templates/addauthor.vm");
            return new VelocityTemplateEngine().render(mdl);
        });

        /* TODO: add your new endpoints here! */

        get("/books", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            model.put("books", new Sql2oBookDao(sql2o).listAll());
            res.status(200);
            res.type("text/html");
            return new ModelAndView(model, "public/templates/books.vm");
        }, new VelocityTemplateEngine());

        get("/addbook", (req, res) -> {
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
            // Not sure if we should ask user for authorId as well

            boolean authorIsNew = false; // set to true if author does not already exist in table
            String name = req.queryParams("name");
            int numOfBooks = Integer.parseInt(req.queryParams("numOfBooks"));
            String nationality = req.queryParams("nationality");
            Author author = new Author(name, numOfBooks, nationality);
            int authorId = 0;

            try {
                authorId = new Sql2oAuthorDao(sql2o).add(author);
                if (authorId > 0) {
                    authorIsNew = true;
                } else {
                    List<Author> authorList = new Sql2oAuthorDao(sql2o).listAll();
                    for (Author a : authorList) {
                        if (a.getName().equals(name)) {
                            authorId = a.getId();
                        }
                    }
                }
            }
            catch (DaoException ex) {
                List<Author> authorList = new Sql2oAuthorDao(sql2o).listAll();
                for (Author a : authorList) {
                    if (a.getName().equals(name)) {
                        authorId = a.getId();
                    }
                }
            }

            Book book = new Book(title, isbn, publisher, year, authorId);

            try {
                int bookId = new Sql2oBookDao(sql2o).add(book);
                if (bookId > 0) {
                    model.put("added", "true");
                }
                else {
                    if (authorIsNew) {
                        // delete author from table if author was newly added and book insertion failed
                        // this is bc we want either both the author and book being added or none of them being added
                        new Sql2oAuthorDao(sql2o).delete(author);
                    }
                    model.put("failedAdd", "true");
                }
            }
            catch (DaoException ex) {
                if (authorIsNew) {
                    new Sql2oAuthorDao(sql2o).delete(author);
                }
                model.put("failedAdd", "true");
            }

            res.status(201);
            res.type("text/html");
            ModelAndView mdl = new ModelAndView(model, "public/templates/addbook.vm");
            return new VelocityTemplateEngine().render(mdl);
        });

    }
}
