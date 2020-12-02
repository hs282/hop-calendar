var user 
var host 
var password 
var port 
var database 
var dbUri
var path

// try {
//     if (System.getenv("DATABASE_URL") == null) {
//         user = 'postgres'
//         host = 'localhost'
//         password = 'postgres'
//         port = '5432'
//         database = 'oose'
//         path = ''
//         console.log("local run")
//     } else {
//         dbUri = System.getenv("DATABASE_URL");
//         port = dbUri.getPort();
//         host = dbUri.getHost();
//         path = dbUri.getPath();
//         user = (dbUri.getUserInfo() == null) ? null : dbUri.getUserInfo().split(":")[0];
//         password = (dbUri.getUserInfo() == null) ? null : dbUri.getUserInfo().split(":")[1];
//         database = "postgresql-sinuous-90620";
//     }
// } catch (e) {
//     }

user = 'postgres';
host = 'localhost';
password = 'postgres';
port = '5432';
database = 'oose';
path = '';
// if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
//     // the application is executed on Heroku ... use the postgres database
//     sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
//       dialect:  'postgres',
//       protocol: 'postgres',
//       port:     match[4],
//       host:     match[3],
//       logging:  true //false
//     })
// if (System.getenv("DATABASE_URL") != null) {
//     database: 'd3nnndm0co39db';
//     user: 'muecqrlopmrbnc';
//     password: 'ebfa980fe7cd0ab97da33ec827ec8f50ee0295919ebd9847b78f48e42081f062';
//     host: 'ec2-52-202-22-140.compute-1.amazonaws.com';
//     port: '5432';
//     dialect: 'postgres';
// }

export  {
    user as user,
    host as host,
    password as password,
    port as port,
    database as database,
    path as path,
}

