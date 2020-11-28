import Sequelize from 'sequelize'
import Student from './database-models/Student.js'
import Instructor from './database-models/Instructor.js'
import Course from './database-models/Course.js'
import Task from './database-models/Task.js'
import axios from 'axios'
import { user, host, password, port, database, path } from './credentials.js'

let sequelize = null
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(
        'postgres://ujnnamqnliqscn:edc2dd3fe40cca2b58aae0be177189bd5a9bee5e3d1b6024f17c5d8ff98abc74@ec2-54-84-98-18.compute-1.amazonaws.com:5432/dfh5kacbr40b52'
    )
} else {
    sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: 'postgres',
    })
}

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
            completedTasks: '',
        })
        const darvish = await Instructor.create({
            name: 'Darvish',
            courses: courses.toString(),
            username: 'oose',
            password: 'computer',
        })
        const res = await axios.get(
            'https://sis.jhu.edu/api//classes/Whiting%20School%20of%20Engineering%20Programs%20for%20Professionals/PE%20Computer%20Science/current?key=HU86bHdqJaIM6Kr7vHwMfaIfJUKIDf0j'
        )

        const admins = [1]
        const tasks1 = [1, 2]
        const tasks2 = [3, 4]
        const tasks3 = [5, 6]
        const tasks4 = [7, 8]
        const tasks5 = [9, 10]
        const tasks6 = [11, 12]
        const alltasks = [tasks1, tasks2, tasks3, tasks4, tasks5, tasks6]
        const filtered = res.data.filter(
            (v, i, a) =>
                a.findIndex((t) => t.OfferingName === v.OfferingName) === i
        )
        let i = 0
        filtered.forEach(course => {
            Course.create({
                admins: admins.toString(),
                tasks: alltasks[i].toString(),
                name: course.Title,
                instructor: course.InstructorsFullName,
                classNumber: course.OfferingName
            })
            i += 1
            if (i > 5) {
                i = 0
            }
        });
        // const oose = await Course.create({
        //     //numTasks: 2,
        //     admins: admins.toString(),
        //     tasks: tasks1.toString(),
        //     name: 'oose',
        // })
        // const algo = await Course.create({
        //     //numTasks: 2,
        //     admins: admins.toString(),
        //     tasks: tasks2.toString(),
        //     name: 'algo',
        // })
        // const csf = await Course.create({
        //     //numTasks: 2,
        //     admins: admins.toString(),
        //     tasks: tasks3.toString(),
        //     name: 'csf',
        // })
        // const automata = await Course.create({
        //     //numTasks: 2,
        //     admins: admins.toString(),
        //     tasks: tasks4.toString(),
        //     name: 'automata',
        // })
        // const statistics = await Course.create({
        //     //numTasks: 2,
        //     admins: admins.toString(),
        //     tasks: tasks5.toString(),
        //     name: 'statistics',
        // })
        // const uima = await Course.create({
        //     //numTasks: 2,
        //     admins: admins.toString(),
        //     tasks: tasks6.toString(),
        //     name: 'uima',
        // })
        const hw1 = await Task.create({
            type: 'Homework',
            deadline: '11/9/2020',
            info: 'Submit on blackboard.',
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
        const hw7 = await Task.create({
            type: 'Homework',
            deadline: '11/9/2020',
            info: 'Submit on blackboard.',
        })
        const hw8 = await Task.create({
            type: 'Homework',
            deadline: '11/30/2020',
            info: 'Submit on blackboard.',
        })
        const hw9 = await Task.create({
            type: 'Homework',
            deadline: '11/25/2020',
            info: 'Submit on blackboard.',
        })
        const hw10 = await Task.create({
            type: 'Homework',
            deadline: '11/26/2020',
            info: 'Submit on blackboard.',
        })
        const hw11 = await Task.create({
            type: 'Homework',
            deadline: '11/29/2020',
            info: 'Submit on blackboard.',
        })
        const hw12 = await Task.create({
            type: 'Homework',
            deadline: '11/23/2020',
            info: 'Submit on blackboard.',
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})()
