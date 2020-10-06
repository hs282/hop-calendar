"use strict";
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
var s = require("serialijse");

const app = express();
app.use(cors());
app.use(bodyparser.json());

//import our Classes
var Course = require('./course.js');
var Task = require('./task.js');
var Student = require('./student.js')
var Instructor = require('./instructor.js')

//dummy data
let homework = new Task({ type: 'assignment', deadline: "11:59PM", taskId: 0, blurb: "Please submit before midnight"});
let test = new Task({ type: 'examination', deadline: "1:30PM", taskId: 0, blurb: "Please turn on your webcams"});

let algebra = new Course({ name: 'algebra', tasks: [homework, test], numTasks: 2, courseId: 3})

//so that the library will recognize these Classes
s.declarePersistable(Course);
s.declarePersistable(Task);
s.declarePersistable(Instructor);
s.declarePersistable(Student);

//serialize object into string format to store into database/over http.
let string = s.serialize(algebra);

//deserialize object for use in backend and has access to methods.
let newobj = s.deserialize(string);

//test endpoint
app.get('/', (req, res) => {
    res.send(string)
})

app.listen(3000);