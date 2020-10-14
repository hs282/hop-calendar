import com.google.gson.Gson;
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

        staticFiles.location("/public");

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

        post("/delauthor", (req, res) -> {
            String name = req.queryParams("name");
            Author a = new Author(name, 0, "");
            new Sql2oAuthorDao(getSql2o()).delete(a);
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
            model.put("books", new Sql2oBookDao(sql2o).listAll());
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
                authorId = new Sql2oAuthorDao(sql2o).add(author);
                if (authorId > 0) {
                    authorIsNew = true;
                }

            }
            catch (DaoException ex) {
                List<Author> authorList = new Sql2oAuthorDao(sql2o).listAll();
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
                int bookId = new Sql2oBookDao(sql2o).add(book);
                if (bookId > 0) {
                    model.put("added", "true");
                    /*if inc needed
                    if (incPrevAuthorBook) {
                        prev.setNumOfBooks(++prev.getNumOfBooks());
                    }
                     */
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

        post("/delbook", (req, res) -> {
            String isbn = req.queryParams("isbn");
            Book b = new Book("", isbn, "", 0, 0);
            new Sql2oBookDao(getSql2o()).delete(b);
            res.status(200);
            res.type("application/json");
            return new Gson().toJson(b.toString());
        });

    }
}
