package persistence;

import exception.DaoException;
import model.Book;
import java.util.List;

public interface BookDao {
    String add(Book book) throws DaoException;
    List<Book> listAll();
    boolean delete(Book bo);
    boolean update(Book bo);
}
