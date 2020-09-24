package persistence;

import exception.DaoException;
import model.Book;
import java.util.List;
import org.sql2o.*;

public class Sql2oBookDao implements BookDao {

    private final Sql2o sql2o;

    public Sql2oBookDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }


    @Override
    public String add(Book book) throws DaoException {
        try (Connection con = sql2o.open()) {



            String query = "INSERT INTO Books (title, isbn, publisher, year, author)" +
                    "VALUES (:title, :isbn, :publisher, :year, :author)";
            int id = (int) con.createQuery(query, true)
                    .bind(book)
                    .executeUpdate().getKey();
            book.setId(id);
            return book.getIsbn();

            //we should be ideally using ISBN but for now I have added id field in book
            //I have also added ISBN version so check if this works later when we are testing

//            String query = "INSERT INTO Books (title, isbn, publisher, year, authorId)" +
//                    "VALUES (:title, :isbn, :publisher, :year, :authorId)";
//            con.createQuery(query, true)
//                    .bind(book)
//                    .executeUpdate().getKey();
//            String isbn = book.getIsbn();
//            return isbn;
        }
    }

    @Override
    public List<Book> listAll() {
        String sql = "SELECT * FROM Books";
        try (Connection con = sql2o.open()) {
            return con.createQuery(sql).executeAndFetch(Book.class);
        }
    }

    @Override
    public boolean delete(Book bo) throws DaoException {
        try (Connection con = sql2o.open()) {
            String book_isbn = bo.getIsbn();
            String query = "DELETE FROM Books WHERE isbn = '" + book_isbn +"'";
            con.createQuery(query).executeUpdate();
            return true;
        }
    }

    public boolean update(Book bo) throws DaoException {
        try (Connection con = sql2o.open()) {
            System.out.println(bo.getIsbn());
            String query = "UPDATE Books SET title = '" + bo.getTitle() +
                    "', publisher = '" + bo.getPublisher() +
                    "', year = " + bo.getYear() +
                    ", author = '" + bo.getAuthor() +
                    "' WHERE isbn = '" + bo.getIsbn() + "'";
            con.createQuery(query).executeUpdate();
            return true;
        }
    }

}
