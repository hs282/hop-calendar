package persistence;

import exception.DaoException;
import model.Book;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.sql.SQLException;
import java.util.List;

public class Sql2oBookDao implements BookDao {
    private final Sql2o sql2o;

    public Sql2oBookDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public int add(Book book) throws DaoException {
        //used for checking author id exists condition?
            /*
            String conditionQuery = "SELECT * FROM Books WHERE authorId = ?";
            PreparedStatement pstmt = con.getJdbcConnection().prepareStatement(conditionQuery);
            int checkID = book.getAuthorId();
            pstmt.setInt(1,checkID);
            if (!(pstmt.executeQuery().getBoolean(0))){
                throw new Sql2oException();
            }*/
        try (Connection con = sql2o.open()) {
            String query = "INSERT INTO Books (id, title, isbn, publisher, year, authorId)" +
                    "VALUES (NULL, :title, :isbn, :publisher, :year, :authorId)";
            int id = (int) con.createQuery(query, true)
                    .bind(book)
                    .executeUpdate().getKey();
            book.setId(id);
            return id;
        }
        //maybe needed to make sure id is not null
            /*
            book.setId(id);
            String checkIsbn = book.getIsbn();
            String updateQuery = "UPDATE Books id = ? WHERE isbn = ?";
            PreparedStatement pstmt = con.getJdbcConnection().prepareStatement(updateQuery);
            pstmt.setInt(1,id);
            pstmt.setString(2,checkIsbn);
            pstmt.executeUpdate();
            return id;
             */
        catch (Sql2oException ex) {
            throw new DaoException();
        }
    }

    @Override
    public List<Book> listAll() {
        String sql = "SELECT * FROM Books";
        try (Connection con = sql2o.open()) {
            return con.createQuery(sql).executeAndFetch(Book.class);
        }
        catch (Sql2oException ex) {
            throw new DaoException();
        }
    }
    // "delete" method from hw2
    // @Override
    public boolean delete(Book bo) throws DaoException {
        try (Connection con = sql2o.open()) {
            String book_isbn = bo.getIsbn();
            String query = "DELETE FROM Books WHERE isbn = '" + book_isbn +"'";
            con.createQuery(query).executeUpdate();
            return true;
        }
    }
}