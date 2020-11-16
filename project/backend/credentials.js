const user 
const host 
const password 
const port 
const database 
const dbUri
const path

try {
    if (System.getenv("DATABASE_URL") == null) {
        user = 'postgres'
        host = 'localhost'
        password = 'postgres'
        port = '5432'
        database = 'oose'
        path = ''
    } else {
        dbUri = System.getenv("DATABASE_URL");
        port = dbUri.getPort();
        host = dbUri.getHost();
        path = dbUri.getPath();
        user = (dbUri.getUserInfo() == null) ? null : dbUri.getUserInfo().split(":")[0];
        password = (dbUri.getUserInfo() == null) ? null : dbUri.getUserInfo().split(":")[1];
        database = postgresql-sinuous-90620
    }
} catch (e) {
    }

export  {
    user as user,
    host as host,
    password as password,
    port as port,
    database as database,
    path as path,
}

