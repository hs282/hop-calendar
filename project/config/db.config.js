const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.courses = require('../../backend/database-models/Course.js')(sequelize, Sequelize);
db.instructors = require('../../backend/database-models/Instructor.js')(sequelize, Sequelize);
db.students = require('../../backend/database-models/Student.js')(sequelize, Sequelize);
db.tasks = require('../../backend/database-models/Task.js')(sequelize, Sequelize);
db.potentialinstructors = require('../../backend/database-models/PotentialInstructor.js')(sequelize, Sequelize);

module.exports = db;