//import models from './db.js';

"use strict";
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser'

var PORT = process.env.PORT || 8080;
var express = require('express');
const app = express();
app.use(cors());
app.use(bodyparser.json());

import Student from './database-models/Student.js';
import Instructor from './database-models/Instructor.js';
import Course from './database-models/Course.js';
import Task from './database-models/Task.js';

// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// app.get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/db', results );
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })

//endpoint login => find which student it is 
app.post('/login', async (req, res) => {
    //get username, password and rolefrom req object role
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
        //if succeeds send entire student/instructor object back to store on the frontend.
        res.status(200).send(query[0].dataValues)
    }
})

//endpoint create account 
app.post('/create_account', async (req, res) => {
    //first get username, password, role, name from front end
    console.log(1)
    var userInfo = req.body;
    var reqName = userInfo.name;
    var reqUsername = userInfo.username;
    var reqPw = userInfo.password;
    var role = userInfo.role;
    let query = null;
    //first check whether same username exists in the database
    if (role == "student") {
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
    let newId = 100;
    if (query.length != 0) {
        console.log("wrong id")
        return res.send("choose a different userid")
    } else {
        //if succeeds create a new user based on the role 
        //need to create an id (Get an id that is + 1 from most recently created account's id)
        console.log("new")
        let newUser = null;
        newId = Math.max(await Student.max('id'), await Instructor.max('id')) + 1;
        if (role == 'Student' || role == 'student'){
            newUser = await Student.create({ name: reqName, courses: "", username: reqUsername, password:reqPw, id: newId });
        } else {
            newUser = await Instructor.create({ name: reqName, courses: "", username: reqUsername, password:reqPw, id: newId});   
        }
        //console.log(newUser)
        //added to database
    }
    //return newId
    console.log(5)
    res.status(200).send(null)
})

//endpoint delete account
app.get('/delete', async (req, res) => {
    res.send(backToObjJSON._name)
})

//endpoint all courses
app.post('/AllCourses', async (req, res) => {
    const courses = await Course.findAll();
    const courseArray = []
    courses.forEach(course => {
        courseArray.push(course.dataValues)
    })
    res.send(courseArray)
})

//endpoint add courses for a user 
app.post('/add_course', async (req, res) => {
    const reqBody = req.body
    const role = reqBody.role
    const id = reqBody.id
    const courseId = reqBody.courseId
    let user = null
    if (role == "student" || role == "Student") {
        user = await Student.findByPk(id)
    } else {
        user = await Instructor.findByPk(id)
    }

    const newCourseArray = []
    //find newCourse
    const newCourse = await Course.findByPk(courseId)
    let success = "0";
    if (newCourse == null) {
        return res.send({success, user})
    }
    console.log(user)
    let courseArray = user.dataValues.courses.split(',');
    for (let i = 0; i < courseArray.length; i++) {
        if (courseArray[i] == "") {
            continue;
        }
        newCourseArray.push(courseArray[i])
        if (courseArray[i] == courseId) {
            console.log(1)
            return res.send({success, user})
        }
    }
    //add new course
    newCourseArray.push(newCourse.id)
    if (role == 'student' || role == 'Student') {
        await Student.update({ courses: newCourseArray.toString() }, {
            where: {
                id: id
            }
        })
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
    success = "1";
    console.log(success)
    res.send({success, user})
})

//endpoint delete courses for a user 
app.post('/delete_course', async (req, res) => {
    const reqBody = req.body
    const role = reqBody.role
    const id = reqBody.id
    const courseId = reqBody.courseId
    let user = null
    if (role == "student" || role == "Student") {
        user = await Student.findByPk(id)
    } else {
        user = await Instructor.findByPk(id)
    }
    let courseArray = user.dataValues.courses.split(',');
    let newCourseArray = [];
    //to get rid of null string in the beginning
    if (courseArray[0] == "") {
        for (let i = 1; i < courseArray.length; i++) {
            newCourseArray.push(courseArray[i])
        }
    } else {
        newCourseArray = courseArray;
    }
    for (let i = 0; i < newCourseArray.length; i++) {
        if (newCourseArray[i] == courseId) {
            newCourseArray.splice(i, 1)
        }
    }
    if (role == 'student' || role == 'Student') {
        await Student.update({ courses: newCourseArray.toString() }, {
            where: {
                id: id
            }
        })
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
})

//endpoint add tasks for instructor
//endpoint add tasks for instructor
app.post('/add_task', async (req, res) => {
    const reqBody = req.body
    const courseId = reqBody.courseId
    const type = reqBody.type
    const deadline = reqBody.deadline
    const info = reqBody.info
    let course = await Course.findByPk(courseId)

    //const taskId = Math.max(await Task.max('id')) + 1;

   
    const newTask = await Task.create({type: type, deadline: deadline, info: info});
    let taskId = newTask.dataValues.id
    let taskArray = course.dataValues.tasks.split(',')
    taskArray.push(`${taskId}`)
    //let newTaskID = newTask.id;
    await Course.update({tasks: taskArray.toString()}, {
        where: {
            id: courseId
        }
    })

    /*let updatedNumTasks = course.numTasks + 1

    await Course.update({numTasks: updatedNumTasks}, {
        where: {
            id: courseId
        }
    })*/
    res.send(course.tasks)
})

//endpoint delete tasks for instructor 
app.post('/delete_task', async (req, res) => {
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
    await Course.update({tasks: taskArray.toString()}, {
        where: {
            id: courseId
        }
    })

    /*let updatedNumTasks = course.numTasks - 1

    await Course.update({numTasks: updatedNumTasks}, {
        where: {
            id: courseId
        }
    })*/
    res.send(course.tasks)
})

//endpoint edit tasks for instructor
app.post('/edit_task', async (req, res) => {
    const reqBody = req.body
    const taskId = reqBody.taskId

    const newType = reqBody.type
    const newDeadline = reqBody.deadline
    const newInfo = reqBody.info

    await Task.update({type: newType}, {
        where: {
            id: taskId
        }
    })

    await Task.update({deadline: newDeadline}, {
        where: {
            id: taskId
        }
    })

    await Task.update({info: newInfo}, {
        where: {
            id: taskId
        }
    })

    let task = await Task.findByPk(taskId)
    
    res.send(task)
})

//endpoint get all courses and tasks associated with the student 
//expects student/instructor ID.
app.post('/getcourses', async (req, res) => {
    const reqBody = req.body
    const role = reqBody.role
    //const id = reqBody.id
    const id = parseInt(reqBody.id)
    let user = null
    if (role == "student" || role == "Student") {
        user = await Student.findByPk(id)
    } else {
        user = await Instructor.findByPk(id)
    }
    // const student = await Student.findByPk(id)
    // const courses = student.dataValues.courses
    const courses = user.dataValues.courses;
    if (courses == "") {
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
    res.send({courseArray, taskArray})
})

app.listen(3000);