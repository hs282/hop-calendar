'use strict'

const Course = require("./course")
const Student = require("./student")
const Instructor = require("./instructor")

class Server {
	constructor() {
        //get everything as objects not string ids
        this.students = []
		this.courses = []
		this.instructors = []
	}
	
	//create student & instructor
	createStudent(studentId, name, username, password) {
		studentA = this.findStudent(studentId)
		if (!studentA) {
			studentA = new Student({ name: name, studentId: studentId, username: username, password: password })
			this.students.push(studentA)
			this.numStudents += 1
			return true
		}
		return false
	}
	
	createInstructor(instructorId, name, username, password) {
		instructorA = this.findInstructor(instructorId)
		if (!instructorA) {
			instructorA = new Instructor({ name: name, instructorId: instructorId, username: username, password: password })
			this.instructors.push(instructorA)
			this.numInstructors += 1
			return true
		}
		return false
	}

	//student end
	findStudent(studentId) {
		for (let i = 0; i < this.students.length; i++) {
			if (this.students[i].studentId == studentId) {
				return this.students[i]
			}
		}
		return null
	}
	getCourses(studentId) {
		studentA = this.findStudent(studentId)
		if (studentA) {
			return studentA.courses
			//this returns courseIDs
		}
		return null;
	}
	addCourse(studentId, courseId) {
		studentA = this.findStudnet(studentId)
		if (studentA) {
			return studentA.addCourse(courseId)
		}
		return false
	}
	removeCourse(studentId, courseId) {
		studentA = this.findStudent(studentId)
		if (studentA) {
			return studentA.deleteCourse(courseId)
		}
		return false
	}

	//instructor end from here
	findInstructor(instructorId) {
		for (let i = 0; i < this.instructors.length; i++) {
			if (this.instructors[i].instructorId == instructorId) {
				return this.instructors[i]
			}
		}
		return null
	}

	findCourse(courseId) {
		for (let i = 0; i < this.courses.length; i++) {
			if (this.courses[i].courseId == courseId) {
				return this.courses[i]
			}
		}
		return null
	}

	createCourse(instructorId, courseId, courseName) {
		courseA = this.findCourse(courseId)
		instructorA = this.findInstructor(instructorId)
		if (!courseA && instructorA) {
			courseA = new Course({ name: courseName, courseId: courseId })
			courseA.addAdmin(instructorId)
			instructorA.addCourse(courseId)
			this.courses.push(courseA)
			this.numCourses += 1
			return true
		}
		return false
	}
	
	getCoursesInst(instructorId) {
		instructorA = this.findInstructor(instructorId)
		if (instructorA) {
			return instructorA.courses
			//this returns courseIDs
		}
		return null;
	}

	createTask(instructorId, courseId, type, deadline, taskId, blurb) {
		courseA = this.findCourse(courseId)
		instructorA = this.findInstructor(instructorId)
		if (courseA.checkAdmin(instructorA.instructorId)) {
			taskA = new Task({ type: type, deadline: deadline, taskId: taskId, blurb: blurb})
			courseA.addTask(taskId)
			courseA.addTaskobj(taskA)
			return true
		}
		return false
	}
	updateTask(instructorId, courseId, type, deadline, taskId, blurb) {
		courseA = this.findCourse(courseId)
		instructorA = this.findInstructor(instructorId)
		if (courseA.checkAdmin(instructorA.instructorId)) {
			taskA = courseA.findTaskobj(taskId)
			if (taskA) {
				courseA.updateTaskobj(taskA, type, deadline, taskId, blurb)
				return true
			}
		}
		return false
	}
	deleteTask(instructorId, courseId, taskId) {
		courseA = this.findCourse(courseId)
		instructorA = this.findInstructor(instructorId)
		if (courseA.checkAdmin(instructorA.instructorId)) {
			taskA = courseA.findTaskobj(taskId)
			if (taskA) {
				courseA.deleteTaskobj(taskA)
				courseA.deleteTask(taskId)
				return true
			}
		}
		return false
	}

	//server
	get allCourses() {
		return this._courses
	}


}
export default Server
