import Sequelize from 'sequelize'
import Student from './database-models/Student.js'
import Instructor from './database-models/Instructor.js'
import Course from './database-models/Course.js'
import Task from './database-models/Task.js'
import { user, host, password, port, database, path } from './credentials.js'

var sequelize;
console.log(path+'\n');
if (path != '') {
    console.log("heroku\n")
    // var Sequelize = require("sequelize"),
    //   sequelize = null;
    sequelize = new Sequelize({
        database: process.env.DATABASE,
        port: process.env.PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        dialect: 'postgres',
        dialectOptions: {
          connectTimeout: Number(process.env.CONNECT_TIMEOUT)
        }
      })
} else {
    console.log("local\n")
    sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: 'postgres',
    })
}

//original
// const sequelize = new Sequelize(database, user, password, {
//     host,
//     port,
//     dialect: 'postgres',
// })

;(async function main() {
    try {
        await sequelize.authenticate()
        await Student.sync({ force: true })
        await Instructor.sync({ force: true })
        await Course.sync({ force: true })
        await Task.sync({ force: true })
        const courses = [1, 2]
        const jane = await Student.create({
            name: 'Jane',
            courses: courses.toString(),
            username: 'janedoe',
            password: 'hellokitty',
        })
        const darvish = await Instructor.create({
            name: 'Darvish',
            courses: courses.toString(),
            username: 'oose',
            password: 'computer',
        })
        const admins = [1]
        const tasks1 = [1, 2]
        const tasks2 = [3, 4]
        const tasks3 = [5, 6]
        const oose = await Course.create({
            //numTasks: 2,
            admins: admins.toString(),
            tasks: tasks1.toString(),
            name: 'oose',
        })
        const algo = await Course.create({
            //numTasks: 2,
            admins: admins.toString(),
            tasks: tasks2.toString(),
            name: 'algo',
        })
        const csf = await Course.create({
            //numTasks: 2,
            admins: admins.toString(),
            tasks: tasks3.toString(),
            name: 'csf',
        })
        const automata = await Course.create({
            //numTasks: 2,
            admins: admins.toString(),
            tasks: tasks1.toString(),
            name: 'automata',
        })
        const statistics = await Course.create({
            //numTasks: 2,
            admins: admins.toString(),
            tasks: tasks2.toString(),
            name: 'statistics',
        })
        const uima = await Course.create({
            //numTasks: 2,
            admins: admins.toString(),
            tasks: tasks2.toString(),
            name: 'uima',
        })
        const hw1 = await Task.create({
            type: "Homework",
            deadline: "11/9/2020",
            info: "Submit on blackboard."
        })
        const hw2 = await Task.create({
            type: 'Homework',
            deadline: '11/12/2020',
            info: 'Submit on blackboard.',
        })
        const hw3 = await Task.create({
            type: 'Homework',
            deadline: '11/21/2020',
            info: 'Submit on blackboard.',
        })
        const hw4 = await Task.create({
            type: 'Homework',
            deadline: '11/19/2020',
            info: 'Submit on blackboard.',
        })
        const hw5 = await Task.create({
            type: 'Homework',
            deadline: '11/29/2020',
            info: 'Submit on blackboard.',
        })
        const hw6 = await Task.create({
            type: 'Homework',
            deadline: '11/21/2020',
            info: 'Submit on blackboard.',
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})()
