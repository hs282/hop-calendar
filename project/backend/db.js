import Sequelize from 'sequelize'
import Student from './database-models/Student.js'
import Instructor from './database-models/Instructor.js'
import Course from './database-models/Course.js'
import Task from './database-models/Task.js'

const user = ''
const host = 'localhost'
const password = ''
const port = '5432'
const database = 'oose'

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
})

;(async function main() {
    try {
        await sequelize.authenticate()
        await Student.sync({ force: true })
        await Instructor.sync({ force: true })
        await Course.sync({ force: true })
        await Task.sync({ force: true })
        const courses = [1]
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
        const tasks = [1, 2]
        const oose = await Course.create({
            admins: admins.toString(),
            tasks: tasks.toString(),
            name: 'oose',
        })
        const hw1 = await Task.create({
            type: "Homework",
            deadline: "11/9/2020",
            info: "Submit on blackboard."
        })
        const hw2 = await Task.create({
            type: 'Homework',
            deadline: '11/11/2020',
            info: 'Submit on blackboard.',
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})()
