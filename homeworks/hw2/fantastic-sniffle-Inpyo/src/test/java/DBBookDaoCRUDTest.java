import exception.DaoException;
import model.Author;
import model.Book;
import org.junit.BeforeClass;
import org.junit.Before;
import org.junit.Test;
import org.sql2o.Sql2o;
import java.sql.*;
import static org.junit.Assert.*;
import model.Book;
import persistence.Sql2oAuthorDao;
import persistence.Sql2oBookDao;
import java.util.*;

public class DBBookDaoCRUDTest {
    private static Sql2oBookDao a;
    private static Sql2oAuthorDao author;
    private static Statement st;
    private static String URI;
    private static Connection conn;

    @BeforeClass
    public static void beforeClassTests() throws SQLException {
        URI = "jdbc:sqlite:./MyBooksApp.db";
        conn = DriverManager.getConnection(URI);
        st = conn.createStatement();
    }
    @Before
    public void beforeTest() throws SQLException {
        String sql = "DROP TABLE IF EXISTS Books";
        st.execute(sql);
        sql = "DROP TABLE IF EXISTS Authors";
        st.execute(sql);
        sql = "CREATE TABLE IF NOT EXISTS Authors (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE," +
                " numOfBooks INTEGER, nationality VARCHAR(30));";
        st.execute(sql);
        sql = "CREATE TABLE IF NOT EXISTS Books (id INTEGER PRIMARY KEY, title VARCHAR(200) NOT NULL," +
                " isbn VARCHAR(14) NOT NULL UNIQUE, publisher VARCHAR(14), year INTEGER," +
                " author INTEGER NOT NULL, FOREIGN KEY(author) REFERENCES Authors(id)" +
                " ON UPDATE CASCADE ON DELETE CASCADE);";
        st.execute(sql);

        Sql2o sql2o = new Sql2o(URI, "", "");
        a = new Sql2oBookDao(sql2o);

        sql = "INSERT INTO Authors(id, name, numOfBooks, nationality)" +
                "VALUES (1, 'George Orwell', 15, 'British')";
        st.execute(sql);
        sql = "INSERT INTO Books(id, title, isbn, publisher, year, author)" +
                "VALUES (NULL, 'Harry Potter 1', '00000000000001', 'Penguin', 2001, " + 1 + ")";
        st.execute(sql);
        sql = "INSERT INTO Books(id, title, isbn, publisher, year, author)" +
                "VALUES (NULL, 'Harry Potter 2', '00000000000002', 'Penguin', 2002, " + 1 + ")";
        st.execute(sql);
    }
    @Test
    public void testListBooks() {
        List<Book> list = a.listAll();
        assertEquals(list.get(0).getTitle(), "Harry Potter 1");
        assertEquals(list.get(1).getTitle(), "Harry Potter 2");
        assertEquals(list.size(), 2);
    }
    @Test
    public void testAddBooks() {
        Book book = new Book("Harry Potter 4", "00000000000004", "Penguin", 2002, 1);
        a.add(book);
        List<Book> list = a.listAll();
        boolean found = false;
        for (Book item:list) {
            if (item.getIsbn().equals("00000000000004")) {
                found = true;
            }
        }
        assertTrue(found);
    }
    @Test
    public void testUpdateBooks() throws DaoException {
        Book book = new Book("Harry Potter 4", "00000000000002", "Penguin", 2002, 1);
        a.update(book);
        List<Book> list = a.listAll();
        for (Book item:list) {
            if (item.getIsbn().equals("00000000000002")) {
                assertEquals("Harry Potter 4", item.getTitle());
            }
        }
    }
    @Test
    public void testDeleteBooks() throws DaoException {
        Book book = new Book("Harry Potter 2", "00000000000002", "Penguin", 2002, 1);
        a.delete(book);
        List<Book> list = a.listAll();
        for (Book item:list) {
            assertNotEquals("00000000000002", item.getIsbn());
        }
    }

}