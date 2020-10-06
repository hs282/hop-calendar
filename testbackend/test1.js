"use strict";
var Course = require('./course.js');
var Task = require('./task.js');
var Student  = require('./student.js')
let algebra = new Course();
let homework = new Task('assignment');
let test = new Task('examination');
algebra.addTask(homework);
algebra.addTask(test);
let tim = new Student("Tim");
tim.addCourse(algebra);
console.log(tim)