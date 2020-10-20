"use strict";
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyparser.json());
const { Sequelize } = require('sequelize');

//import our Classes
var Course = require('./course.js');
var Task = require('./task.js');
var Student = require('./student.js');
var Instructor = require('./instructor.js');

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

app.listen(3000);