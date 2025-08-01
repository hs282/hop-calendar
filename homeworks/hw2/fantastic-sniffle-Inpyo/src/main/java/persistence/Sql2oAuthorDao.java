package persistence;

import exception.DaoException;
import model.Author;

import java.beans.Statement;
import java.sql.PreparedStatement;
import java.util.List;
import org.sql2o.*;

public class Sql2oAuthorDao implements AuthorDao {

    private final Sql2o sql2o;

    public Sql2oAuthorDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }


    @Override
    public int add(Author author) throws DaoException {
        try (Connection con = sql2o.open()) {
            String query = "INSERT INTO Authors (name, numOfBooks, nationality)" +
                    "VALUES (:name, :numOfBooks, :nationality)";
            int id = (int) con.createQuery(query, true)
                    .bind(author)
                    .executeUpdate().getKey();
            author.setId(id);
            return id;
        }
    }

    @Override
    public List<Author> listAll() {
        String sql = "SELECT * FROM Authors";
        try (Connection con = sql2o.open()) {
            return con.createQuery(sql).executeAndFetch(Author.class);
        }
    }

    @Override
    public boolean delete(Author au) throws DaoException {
        try (Connection con = sql2o.open()) {
            String author_name = au.getName();
            String query = "DELETE FROM Authors WHERE name = '" + author_name + "'";
            con.createQuery(query).executeUpdate();
            return true;
        }
    }

    @Override
    public boolean update(Author au) throws DaoException {
        try (Connection con = sql2o.open()) {
            String author_name = au.getName();
            String query = "UPDATE Authors SET numOfBooks = " + au.getNumOfBooks() +
                    ", nationality = '" + au.getNationality() +
                    "' WHERE name = '" + author_name + "'";
            con.createQuery(query).executeUpdate();
            return true;
        }
    }

}
