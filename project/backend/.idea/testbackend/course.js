'use strict'
class Course {
	constructor(course) {
        //optional constructor parameter
		if (!course) {
            this.name = ""
            this.courseId = 0
            this.tasks = []
		} else {
            this.name = course.name
            this.courseId = course.courseId
            this.tasks = course.tasks
		}
    }
    get name() {
		return this._name
	}
	set name(name) {
		this._name = name
	}
	set courseId(id) {
		this._courseId = id
	}
	get courseId() {
		return this._courseId
	}
	set tasks(task) {
		this._tasks = task
	}
	get tasks() {
		return this._tasks
	}
	addTask(task) {
		this.tasks.push(task)
		this.numTasks += 1
	}
	deleteTask(taskId) {
		for (let i = 0; i < this.tasks.length; i++) {
			if ((this.tasks[i].taskId = taskId)) {
			}
		}
		this.numTasks -= 1
	}
	toString() {
		console.log(this.tasks)
	}
}
module.exports = Course
