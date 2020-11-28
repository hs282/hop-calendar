import static spark.Spark.*;

public class Application {
  final static int PORT = 7000;

  public static void main(String[] args) {
    port(PORT);
    get("/", (req, res) -> "Hi Heroku!");
  }
}