'use strict'
class Course {
	constructor(course) {
        //optional constructor parameter
		if (!course) {
            this.tasks = []
            this.name = ""
			this.numTasks = 0
			this.courseId = 0
		} else {
            this.tasks = course.tasks
            this.name = course.name
			this.numTasks = course.numTasks
			this.courseId = course.courseId
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
