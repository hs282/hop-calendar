import Sequelize from 'sequelize'
import Student from './database-models/Student.js';
import Instructor from './database-models/Instructor.js';
import Course from './database-models/Course.js';
import Task from './database-models/Task.js';


//create database prior to runnign
//change this according to your local database
const user = ''
const host = 'localhost'
const password = ''
const port = '5432'
const database = 'oose'

// Option 1: Passing a connection URI

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres'
});

// const models = {
//   students: sequelize.import('./database-models/Student.js')
//   instructors: sequelize.import('./database-models/Instructor.js')
//   courses: sequelize.import('./database-models/Course.js')
//   tasks: sequelize.import('./database-models/Task.js')
// };
// Object.keys(models).forEach(modelName) => {
//   if('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });
//const sequelize = new Sequelize('postgres://postgres:971106@localhost:7000');

(async function main() {
    try {
        await sequelize.authenticate();
        await Student.sync({ force: true });
        await Instructor.sync({ force: true });
        await Course.sync({ force: true });
        await Task.sync({ force: true });
        const jane = await Student.create({ name: "Jane", courses: "[]", username:"janedoe", password:"hellokitty" });
        //const java = 
        //sequelize - 
        //create object - track (relationship) - query
        //website (username/password) -> username + password -> studentid -> jack logged in -> query student id -> create jack object from the string from student db -> courseids -> query coure ids ->create courses
        // -> tasks[] -> viewing
        //darvish course -> query task objects taskids -> create task objects from the string-> update task based on object fuctions -> change fields for tasks except for task id
        //->put object back into string -> task id will be the same query same database w task id -> update that on database 
        const darvish = await Instructor.create({ name: "Darvish", courses: "[]", username:"oose", password:"computer" });
        console.log('Connection has been established successfully.');
        const query = await Student.findAll({
            where: {
                name: "Jane"
            }
        });
        console.log(query[0].dataValues.username)
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;
// export default models;