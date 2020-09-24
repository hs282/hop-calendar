import exception.DaoException;
import org.junit.BeforeClass;
import org.junit.Before;
import org.junit.Test;
import org.sql2o.Sql2o;
import persistence.Sql2oAuthorDao;
import java.sql.*;
import static org.junit.Assert.*;
import model.Author;
import java.util.*;

public class DBDaoCRUDTest {
    private static Sql2oAuthorDao a;
    private static Statement st;
    private static Connection conn;
    private static String URI;

    @BeforeClass
    public static void beforeClassTests() throws SQLException {
        URI = "jdbc:sqlite:./MyBooksApp.db";
        conn = DriverManager.getConnection(URI);
        st = conn.createStatement();
        String sql = "DROP TABLE IF EXISTS Authors";
        st.execute(sql);
    }

    @Before
    public void beforeEachTest() throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS Authors (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE," +
                " numOfBooks INTEGER, nationality VARCHAR(30));";
        st.execute(sql);
        final String URI = "jdbc:sqlite:./MyBooksApp.db";
        Sql2o sql2o = new Sql2o(URI, null, null);
        a = new Sql2oAuthorDao(sql2o);
        Author author1 = new Author("George Orwell", 15, "British");
        a.add(author1);
        Author author2 = new Author("Ernest Hemingway", 50, "American");
        a.add(author2);
        Author author3 = new Author("Dr. Seuss", 25, "American");
        a.add(author3);

    }

    @Test
    public void testListAuthors() {
        List<Author> list = a.listAll();
        assertEquals(list.get(0).getName(), "George Orwell");
        assertEquals(list.get(1).getName(), "Ernest Hemingway");
        assertEquals(list.get(2).getName(), "Dr. Seuss");
        assertEquals(list.size(), 3);
    }

    /*@Test
    public void testUpdateAuthors() throws SQLException {
        String sql = "SELECT * FROM Authors WHERE name LIKE '%eu%';";
        ResultSet rs = st.executeQuery(sql);
        Author auth = rs.getObject(0, Author.class);
        a.update(auth);
        assertEquals(auth.getNumOfBooks(), );
        assertEquals(auth.getNationality(), );
    }*/

    @Test
    public void testDeleteAuthor() throws SQLException {
        Author au = new Author("Ernest Hemingway", 50, "American");
        a.delete(au);
        List<Author> list = a.listAll();
        assertEquals(list.size(), 2);
    }

    @Test(expected = DaoException.class)
    public void testDeleteNonexistentAuth() throws DaoException{
        Author au = new Author("Ben Franklin", 2, "American");
        a.delete(au);
    }
}