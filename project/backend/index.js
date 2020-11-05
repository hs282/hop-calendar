//import models from './db.js';

"use strict";
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser'

const app = express();
app.use(cors());
app.use(bodyparser.json());

//import our Classes
// import Course from './course.js';
// import Task from './task.js';
// import Student from './student.js';
// import Instructor from './instructor.js';
import Student from './database-models/Student.js';
import Instructor from './database-models/Instructor.js';
import Course from './database-models/Course.js';
import Task from './database-models/Task.js';
//dummy data
// let homework = new Task({ type: 'assignment', deadline: "11:59PM", taskId: 0, blurb: "Please submit before midnight"});
// let test = new Task({ type: 'examination', deadline: "1:30PM", taskId: 1, blurb: "Please turn on your webcams"});
// let algebra = new Course({ name: 'algebra', tasks: [0, 1], courseId: 3})

//stringify to store in database
// let asString = JSON.stringify(algebra);
//back to object to send to frontend/use class methods
// let backToObjJSON = JSON.parse(asString);

//test endpoint
app.get('/', (req, res) => {
    res.send(backToObjJSON._name)
})

//endpoint login => find which student it is 
app.post('/login', async (req, res) => {
    //get username, password and rolefrom req object role
    console.log(req.body)
    var userInfo = req.body;
    var name = userInfo.username;
    var pw = userInfo.password;
    var role = userInfo.role;
    console.log(name, pw, role)
    //query table -> check true -> send back failed or succeed
    let query = null;
    if (role == "Student" || role == 'student') {
        query = await Student.findAll({
            where: {
                username: name,
                password: pw
            }
        });
    } else {
        query = await Instructor.findAll({
            where: {
                username: name,
                password: pw
            }
    });
    }
    if (query.length == 0) {
        res.sendStatus(500)
    }   else {
        //if succeeds send studentid or instructor id back
        console.log(query[0].dataValues.id)
        res.status(200).send({id: query[0].dataValues.id})
    }
})

//endpoint create account 
app.get('/create_account', async (req, res) => {
    //first get username, password, role, name from front end
    var reqUserInfo = req.body;
    var reqName = userInfo.name;
    var reqUsername = userInfo.username;
    var reqPw = userInfo.password;
    var role = userInfo.role;
    //first check whether same username exists in the database
    if (role == "Student") {
        query = await Student.findAll({
            where: {
                username: reqName,
            }
        });
    } else {
        query = await Instructor.findAll({
            where: {
                username: reqName,
            }
    });
    }
    if (query[0] != null) {
        res.send("choose a different username")
    } else {
        //if succeeds create a new user based on the role 
        //need to create an id (Get an id that is + 1 from most recently created account's id)
        const newUser = null;
        const newId = MAX(await Student.max('id'), await Instructor.max('id')) + 1;
        if (role == 'Student'){
            const newUser = await Student.create({ name: reqName, courses: "[]", username: reqUsername, password:reqPw, id: newId });
        } else {
            const newUser = await Instructor.create({ name: reqName, courses: "[]", username: reqUsername, password:reqPw, id: newId});   
        }
        //added to database
    }
    //return newId
    res.send(newId)
})

//endpoint delete account
app.get('/delete', async (req, res) => {
    res.send(backToObjJSON._name)
})

//endpoint add courses for a user 
app.get('/add_course', async (req, res) => {
    const reqBody = req.body
    const role = reqBody.role
    const username = reqBody.username
    const courseId = reqBody.courseId
    const user = null
    if (role == "Student") {
        user = await Student.findAll({
            where: {
                username: username
            }
        });
    } else {
        user = await Instructor.findAll({
            where: {
                username: username
            }
        });
    }
    user = user[0]

    if (user.addCourse(courseId)) {
        res.send(user.courses)
    } else {
        res.send("Course has already been added")
    }
})

//endpoint delete courses for a user 
app.get('/delete_course', async (req, res) => {
    const reqBody = req.body
    const role = reqBody.role
    const username = reqBody.username
    const courseId = reqBody.courseId
    const user = null
    if (role == "Student") {
        user = await Student.findAll({
            where: {
                username: username
            }
        });
    } else {
        user = await Instructor.findAll({
            where: {
                username: username
            }
        });
    }
    user = user[0]

    user.deleteCourse(courseId)
    res.send(user.courses)
})

//endpoint add tasks for instructor
app.get('/add_task', async (req, res) => {
    const reqBody = req.body
    const courseId = reqBody.courseId
    const type = reqBody.type
    const deadline = reqBody.deadline
    const blurb = reqBody.blurb
    course = await Course.findAll({
        where: {
            id: courseId
        }
    });

    course = course[0]
    //create task
    const taskId = MAX(await Task.max('id')) + 1;
    const newTask = await Task.create({id: taskId, type: type, deadline: deadline, info: blurb});
    course.addTask(taskId)
    course.addTaskobj(newTask)
    res.send(course.taskobjs)
})

//endpoint delete tasks for instructor 
app.get('/delete_task', async (req, res) => {
    const reqBody = req.body
    const courseId = reqBody.courseId
    const taskId = reqBody.taskId
    course = await Course.findAll({
        where: {
            id: courseId
        }
    });
    course = course[0]
    course.deleteTask(taskId)
    taskObj = course.findTaskobj(taskId)
    course.deleteTaskobj(taskObj)
    res.send(course.taskobjs)
})

//endpoint edit tasks for instructor
app.get('/edit_task', async (req, res) => {
    const reqBody = req.body
    // assuming cookie stores instructor
    
    // check if there's cookie for instructor role

    // if cookie doesn't exist, then authenticate as instructor

    // if cookie does exist,
    // but user is not an instructor, then deny access

    // else, give access

    const courseId = reqBody.courseId
    const taskId = reqBody.taskId
    const newType = reqBody.type
    const newDeadline = reqBody.deadline
    const newInfo = reqBody.info

    course = await Course.findAll({
        where: {
            id: courseId
        }
    });

    course = course[0]
    taskObj = course.findTaskobj(taskId)
    course.updateTaskobj(taskObj, newType, newDeadline, taskId, newInfo)

    res.send(taskObj)
})

//endpoint get all courses and tasks associated with the student 
app.get('/getcourses', async (req, res) => {
    const reqBody = req.body
    const name = reqBody.name
    const student = await Student.findAll({
        where: {
            name: name
        }
    })
    const courseIds = student.courses
    const courseArray = []
    for (let courseId in courseIds) {
        const course = await Course.findByPk(courseId)
        courseArray.push(course)
    }
    const taskArray = []
    for (let course in courseArray) {
        const taskIds = course.tasks
        for (let taskId in taskIds) {
            const task = await Task.findByPk(taskId)
            taskArray.push(task)
        }
    }
    res.send({courseArray, taskArray})
})

app.listen(3000);