//import models from './db.js';

"use strict";
// const express = require('express');
// const cors = require('cors');
// const bodyparser = require('body-parser');
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser'

const app = express();
app.use(cors());
app.use(bodyparser.json());

//import our Classes
// var Course = require('./course.js');
// var Task = require('./task.js');
// var Student = require('./student.js');
// var Instructor = require('./instructor.js');

//we might not use this
//import Course from './course.js';
//import Task from './task.js';
//import Student from './student.js';
//import Instructor from './instructor.js';

import Student from './database-models/Student.js';
import Instructor from './database-models/Instructor.js';
import Course from './database-models/Course.js';
import Task from './database-models/Task.js';

//dummy data
let homework = new Task({ type: 'assignment', deadline: "11:59PM", taskId: 0, blurb: "Please submit before midnight"});
let test = new Task({ type: 'examination', deadline: "1:30PM", taskId: 1, blurb: "Please turn on your webcams"});
let algebra = new Course({ name: 'algebra', tasks: [0, 1], courseId: 3})

//stringify to store in database
let asString = JSON.stringify(algebra);
//back to object to send to frontend/use class methods
let backToObjJSON = JSON.parse(asString);

//test endpoint
app.get('/', (req, res) => {
    res.send(backToObjJSON._name)
})

//endpoint login => find which student it is 
app.get('/login', (req, res) => {
    //get username, password and rolefrom req object role
    var userInfo = req.body;
    var name = userInfo.username;
    var pw = userInfo.password;
    var role = userInfo.role;
    //query table -> check true -> send back failed or succeed
    const query;
    if (role == "Student") {
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
    if (query[0] == null) {
        res.send("login failed")
    }   else {
        //if succeeds send studentid or instructor id back
        res.send(query[0].dataValues.id)
    }
})

//endpoint create account 
app.get('/create_account', (req, res) => {
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
        const newUser;
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

//endpoint get all relevant tasks for this student 
app.get('/calendar', (req, res) => {
    res.send(backToObjJSON._name)
})

app.listen(3000);