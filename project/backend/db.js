
import Sequelize from 'sequelize'
import Student from './database-models/Student.js';
import Instructor from './database-models/Instructor.js';
import Course from './database-models/Course.js';
import Task from './database-models/Task.js';
// Option 1: Passing a connection URI
const sequelize = new Sequelize('mysql://root:fantasticsniffle@localhost:3306/sys');

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

