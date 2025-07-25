import okhttp3.*;
import org.eclipse.jetty.util.IO;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import java.io.IOException;
import java.sql.*;
import static org.junit.Assert.*;

public class RESTAPITest {

    static OkHttpClient client;
    @BeforeClass
    public static void beforeClassTests() throws SQLException {
        client = new OkHttpClient();
    }

    @Test
    public void testListAuthors() throws IOException {
        Request request = new Request.Builder()
                .url("http://localhost:7000/authors")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
    }

    @Test
    public void testAddAuthor() throws IOException {
        RequestBody postBody = new FormBody.Builder()
                .add("name", "Sadegh Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody)
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(201, response.code());
    }

    // TODO: Add your tests here

    @Test
    public void testBooks() throws IOException {
        Request request = new Request.Builder()
                .url("http://localhost:7000/books")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
    }

    @Test
    public void testAddBook() throws IOException {
        // add Moby Dick to Books
        RequestBody postBody = new FormBody.Builder()
                .add("title", "Moby Dick")
                .add("isbn", "9780141199603")
                .add("publisher", "Penguin")
                .add("year", "2013")
                // what TODO for authorId?
                .add("authorId", "1")
                .build();
        Request request = new Request.Builder()
                .url("http://localhost:7000/addbook")
                .post(postBody)
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(201, response.code());
    }

    @Test
    public void testDelAuthor() throws IOException {

        RequestBody postBody_delauthor = new FormBody.Builder()
                .add("name", "Sadegh Hedayat")
                .build();
        Request request_delauthor = new Request.Builder()
                .url("http://localhost:7000/delauthor")
                .post(postBody_delauthor)
                .build();
        Response response_delauthor = client.newCall(request_delauthor).execute();
        assertEquals(200, response_delauthor.code());
    }

    @Test
    public void testDelBook() throws IOException {

        RequestBody delbook_postBody = new FormBody.Builder()
                .add("isbn", "9780141199603")
                .build();
        Request delbook_request = new Request.Builder()
                .url("http://localhost:7000/delbook")
                .post(delbook_postBody)
                .build();
        Response delbook_response = client.newCall(delbook_request).execute();
        assertEquals(200, delbook_response.code());
    }

}