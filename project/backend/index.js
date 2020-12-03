"use strict";
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser'
import { user, host, password, port, database } from './credentials.js'
import startScraper from './scraper/index.js'
const app = express();
app.use(cors());
app.use(bodyparser.json());

import Student from './database-models/Student.js';
import Instructor from './database-models/Instructor.js';
import Course from './database-models/Course.js';
import Task from './database-models/Task.js';

app.get('/', async (req, res) => {
    try {
        res.send('Welcome to HopCalendar!')
    } catch (error) {
        res.send('failed')
    }
})

//endpoint login => find which student it is 
app.post('/login', async (req, res) => {
    //get username, password and rolefrom req object role
    try {
        var userInfo = req.body
        var name = userInfo.username
        var pw = userInfo.password
        var role = userInfo.role
        let query = null
        if (role == 'Student' || role == 'student') {
            query = await Student.findAll({
                where: {
                    username: name,
                    password: pw,
                },
            })
        } else {
            query = await Instructor.findAll({
                where: {
                    username: name,
                    password: pw,
                },
            })
        }
        if (query.length == 0) {
            res.sendStatus(500)
        } else {
            //if succeeds send entire student/instructor object back to store on the frontend.
            res.status(200).send(query[0].dataValues)
        }
    } catch (error) {
        res.sendStatus(500)
    }
    
})

//endpoint create account 
app.post('/create_account', async (req, res) => {
    //first get username, password, role, name from front end
    try {
        var userInfo = req.body
        var reqName = userInfo.name
        var reqUsername = userInfo.username
        var reqPw = userInfo.password
        var role = userInfo.role
        let query = null
        //first check whether same username exists in the database
        if (role == 'student') {
            query = await Student.findAll({
                where: {
                    username: reqName,
                },
            })
        } else {
            query = await Instructor.findAll({
                where: {
                    username: reqName,
                },
            })
        }
        let newId = 100
        if (query.length != 0) {
            console.log('wrong id')
            return res.send('choose a different userid')
        } else {
            //if succeeds create a new user based on the role
            //need to create an id (Get an id that is + 1 from most recently created account's id)
            console.log('new')
            let newUser = null
            newId =
                Math.max(await Student.max('id'), await Instructor.max('id')) +
                1
            if (role == 'Student' || role == 'student') {
                newUser = await Student.create({
                    name: reqName,
                    courses: '',
                    username: reqUsername,
                    password: reqPw,
                    id: newId,
                })
            } else {
                newUser = await Instructor.create({
                    name: reqName,
                    courses: '',
                    username: reqUsername,
                    password: reqPw,
                    id: newId,
                })
            }
            //console.log(newUser)
            //added to database
        }
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
    
})

//endpoint delete account
app.get('/delete', async (req, res) => {
    res.send(backToObjJSON._name)
})

//endpoint all courses
app.post('/AllCourses', async (req, res) => {
    try {
        const courses = await Course.findAll()
        const courseArray = []
        courses.forEach((course) => {
            courseArray.push(course.dataValues)
        })
        res.send(courseArray)
    } catch (error) {
        res.sendStatus(500)
    }
    
})

//endpoint add courses for a user 
app.post('/add_course', async (req, res) => {
    try {
        const reqBody = req.body
        const role = reqBody.role
        const id = reqBody.id
        const courseId = reqBody.courseId
        let user = null
        if (role == 'student' || role == 'Student') {
            user = await Student.findByPk(id)
        } else {
            user = await Instructor.findByPk(id)
        }

        const newCourseArray = []
        //find newCourse
        const newCourse = await Course.findByPk(courseId)
        let success = '0'
        if (newCourse == null) {
            return res.send({ success, user })
        }
        console.log(user)
        let courseArray = user.dataValues.courses.split(',')
        for (let i = 0; i < courseArray.length; i++) {
            if (courseArray[i] == '') {
                continue
            }
            newCourseArray.push(courseArray[i])
            if (courseArray[i] == courseId) {
                console.log(1)
                return res.send({ success, user })
            }
        }
        //add new course
        newCourseArray.push(newCourse.id)
        if (role == 'student' || role == 'Student') {
            await Student.update(
                { courses: newCourseArray.toString() },
                {
                    where: {
                        id: id,
                    },
                }
            )
        } else {
            await Instructor.update(
                { courses: newCourseArray.toString() },
                {
                    where: {
                        id: id,
                    },
                }
            )
        }
        success = '1'
        res.send({ success, user })
    } catch (error) {
        res.sendStatus(500)
    }
    
})

//endpoint delete courses for a user 
app.post('/delete_course', async (req, res) => {
    try {
        const reqBody = req.body
        const role = reqBody.role
        const id = reqBody.id
        const courseId = reqBody.courseId
        let user = null
        if (role == 'student' || role == 'Student') {
            user = await Student.findByPk(id)
        } else {
            user = await Instructor.findByPk(id)
        }
        let courseArray = user.dataValues.courses.split(',')
        let newCourseArray = []
        //to get rid of null string in the beginning
        if (courseArray[0] == '') {
            for (let i = 1; i < courseArray.length; i++) {
                newCourseArray.push(courseArray[i])
            }
        } else {
            newCourseArray = courseArray
        }
        for (let i = 0; i < newCourseArray.length; i++) {
            if (newCourseArray[i] == courseId) {
                newCourseArray.splice(i, 1)
            }
        }
        if (role == 'student' || role == 'Student') {
            await Student.update(
                { courses: newCourseArray.toString() },
                {
                    where: {
                        id: id,
                    },
                }
            )
        } else {
            await Instructor.update(
                { courses: newCourseArray.toString() },
                {
                    where: {
                        id: id,
                    },
                }
            )
        }
        res.send(user.courses)
    } catch (error) {
        res.sendStatus(500)
    }
})

//endpoint add tasks for instructor
//endpoint add tasks for instructor
app.post('/add_task', async (req, res) => {
    try {
        const reqBody = req.body
        const courseId = reqBody.courseId
        const type = reqBody.type
        const deadline = reqBody.deadline
        const info = reqBody.info
        let course = await Course.findByPk(courseId)
        const newTask = await Task.create({
            type: type,
            deadline: deadline,
            info: info,
        })
        let taskId = newTask.dataValues.id
        let taskArray = course.dataValues.tasks.split(',')
        taskArray.push(`${taskId}`)
        await Course.update(
            { tasks: taskArray.toString() },
            {
                where: {
                    id: courseId,
                },
            }
        )
        res.send(course.tasks)
    } catch (error) {
        res.sendStatus(500)
    }
    
})

//endpoint delete tasks for instructor 
app.post('/delete_task', async (req, res) => {
    try {
        const reqBody = req.body
        const courseId = reqBody.courseId
        const taskId = reqBody.taskId
        let course = await Course.findByPk(courseId)
        let taskArray = course.dataValues.tasks.split(',')
        for (let i = 0; i < taskArray.length; i++) {
            if (taskArray[i] == taskId) {
                taskArray.splice(i, 1)
            }
        }
        await Course.update(
            { tasks: taskArray.toString() },
            {
                where: {
                    id: courseId,
                },
            }
        )
        res.send(course.tasks)
    } catch (error) {
        res.sendStatus(500)
    }
    
})

//endpoint edit tasks for instructor
app.post('/edit_task', async (req, res) => {
    try {
        const reqBody = req.body
        const taskId = reqBody.taskId

        const newType = reqBody.type
        const newDeadline = reqBody.deadline
        const newInfo = reqBody.info

        await Task.update(
            { type: newType },
            {
                where: {
                    id: taskId,
                },
            }
        )

        await Task.update(
            { deadline: newDeadline },
            {
                where: {
                    id: taskId,
                },
            }
        )

        await Task.update(
            { info: newInfo },
            {
                where: {
                    id: taskId,
                },
            }
        )
        let task = await Task.findByPk(taskId)
        res.send(task)
    } catch (error) {
        res.sendStatus(500)
    }
    
})

app.post('/mark_complete', async (req, res) => {
    try {
        const reqBody = req.body
        const taskId = reqBody.taskId
        const studentId = reqBody.studentId
        const student = await Student.findByPk(studentId)
        let complTasks = student.dataValues.completedTasks.split(',')
        if (complTasks[0] == '') {
            complTasks[0] = `${taskId}`
        } else {
            complTasks.push(`${taskId}`)
        }
    
        await Student.update({completedTasks: complTasks.toString()}, {
            where: {
                id: studentId,
            },
        })
        
        /*const completedTaskArray = []
        for (let taskId of Student.dataValues.completedTasks) {
            const completedTask = await Task.findByPk(parseInt(taskId))
            completedTaskArray.push(completedTask)
        }
        res.send(completedTaskArray)*/
    }
    catch (error) {
        res.sendStatus(500)
    }

})

app.post('/mark_incomplete', async (req, res) => {
    try {
        const reqBody = req.body
        const taskId = reqBody.taskId
        const studentId = reqBody.studentId

        const student = await Student.findByPk(studentId)
        let complTasks = student.dataValues.completedTasks.split(',')

        for (let i = 0; i < complTasks.length; i++) {
            if (complTasks[i] == taskId) {
                complTasks.splice(i, 1)
            }
        }

        await Student.update({completedTasks: complTasks.toString()}, {
            where: {
                id: studentId
            }
        })

        /*const completedTaskArray = []
        for (let taskId of Student.dataValues.completedTasks) {
            const completedTask = await Task.findByPk(parseInt(taskId))
            completedTaskArray.push(completedTask)
        }
        res.send(completedTaskArray)*/
    }
    catch (error) {
        res.sendStatus(500)
    }
})

app.post('/getcompletedtasks', async (req, res) => {
    try {
        const reqBody = req.body
        const studentId = reqBody.id
        const student = await Student.findByPk(studentId)
        let array = student.completedTasks.split(',')
        res.send({array})
    }
    catch (error) {
        res.sendStatus(500)
    }
})

//endpoint get all courses and tasks associated with the student 
//expects student/instructor ID.
app.post('/getcourses', async (req, res) => {
    try {
        const reqBody = req.body
        const role = reqBody.role
        //const id = reqBody.id
        const id = parseInt(reqBody.id)
        let user = null
        if (role == 'student' || role == 'Student') {
            user = await Student.findByPk(id)
        } else {
            user = await Instructor.findByPk(id)
        }
        // const student = await Student.findByPk(id)
        // const courses = student.dataValues.courses
        const courses = user.dataValues.courses
        if (courses == '') {
            res.send({ courseArray: [], taskArray: [] })
            return
        }
        const courseIds = courses.split(',')
        const courseArray = []
        for (let courseId of courseIds) {
            const course = await Course.findByPk(parseInt(courseId))
            courseArray.push(course)
        }
        console.log(courseArray)
        const taskArray = []
        for (let course of courseArray) {
            const taskIds = course.tasks.split(',')
            for (let taskId of taskIds) {
                const task = await Task.findByPk(parseInt(taskId))
                taskArray.push(task)
            }
        }
        res.send({ courseArray, taskArray })
    } catch (error) {
        res.sendStatus(500)
    }
    
})

//get tasks for an individual class (both student and instructor)
app.post('/get_tasks', async (req, res) => {
    try {
        const reqBody = req.body
        const courseId = reqBody.courseId
        let course = await Course.findByPk(courseId)
        const tasks = course.dataValues.tasks
        //const taskArray = course.dataValues.tasks.split(',')
        if (tasks == '') {
            res.send({ taskArray: [] })
            return
        }
        const taskIds = tasks.split(',')
        const taskArray = []
        for (let taskId of taskIds) {
            const task = await Task.findByPk(parseInt(taskId))
            taskArray.push(task)
        }
        res.send({ taskArray })
    } catch (error) {
        res.sendStatus(500)
    }
    
})

//endpoint login => find which student it is 
app.post('/gradescope_scraper', async (req, res) => {
    //get username, password and rolefrom req object role
    try {
        var userInfo = req.body
        var name = userInfo.username
        var pw = userInfo.password
        var type = userInfo.type
        let data = null
        if (type == "gradescope") {
            data = await startScraper(name, pw)
            console.log(data)
            //we call gradescope scraper
            //scraper data organized as -- coursename(1 element) - taskname (n elements) - task due dates (n) - blob (1 element - fixed as scraped from gradescope)
            //pass in name and pw to scraper & run scraper
            //return data from scraper
            // for (i = 0; i < data.length; i++) {
            //     coursename = data[i][0]
            //     tasknames = data[i][1]
            //     taskduedates = data[i][2]
            //     taskblob = data[i][3]
            //     //query course using coursename (prob need to think abt this as well but most courses follow a similar format
            //     // either xxx.xxx or EN xxx.xxx or EN xxx.xxx/yyy) => so just get numbers and disregard any letters; also when / exists, ignore anything that comes after (as of now)
            //     //compare number of tasks under course vs tasknames.length
            //     //if diff, need to update
            //     //num_new_tasks = tasknames.length(from scraper) - course.tasks.length (From our db)
            //     //for (i = 0; i < num_new_tasks; i++) {
            //         //task = new Task(tasknames[i], taskduedates[i], taskblob)
            //         //add task to tasks (our db)
            //         //we could use this whole process using what we already have (just like an instructor would add for a class)
            //     //} 
            // }

        }
        res.send(data)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`)
});