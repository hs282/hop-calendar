import Sequelize from 'sequelize'
import Student from './database-models/Student.js';
import Instructor from './database-models/Instructor.js';
import Course from './database-models/Course.js';
import Task from './database-models/Task.js';


//create database prior to runnign
//change this according to your local database
const user = 'postgres'
const host = 'localhost'
const password = 'postgres'
const port = '3306'
const database = 'temp'

// Option 1: Passing a connection URI

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false
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
        const jane = await Student.create({ name: "Jane", courses: "[]", username:"jandoe", password:"hellokitty" });
        const darvish = await Instructor.create({ name: "Darvish", courses: "[]", username:"oose", password:"computer" });
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;
// export default models;