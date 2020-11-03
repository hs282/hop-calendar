'use strict'
class Course {
	constructor(course) {
        //optional constructor parameter
		if (!course) {
            this.name = ""
            this.courseId = 0
			this.tasks = []
			this.taskobjs = []
			this.admins = []
		} else {
            this.name = course.name
            this.courseId = course.courseId
			this.tasks = course.tasks
			this.taskobjs = course.taskobjs
			this.admins = course.admins
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
	set taskobjs(taskobj) {
		this._taskobjs = taskobj
	}
	get taskobjs() {
		return this._taskobjs
	}
	
	addTask(taskId) {
		this.tasks.push(taskId)
		this.numTasks += 1
	}
	deleteTask(taskId) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i] == taskId) {
				this.tasks.splice(i, 1)
			}
		}
		this.numTasks -= 1
	}

	//we need to keep task as class not just ids
	findTaskobj(taskId) {
		for (let i = 0; i < this.taskobjs.length; i++) {
			if (this.taskobjs[i].taskId == taskId) {
				return taskobjs[i]
			}
		}
		return null
	}
	addTaskobj(taskobj) {
		this.taskobjs.push(taskobj)
		this.numTaskobjs += 1
	}
	deleteTaskobj(taskobj) {
		for (let i = 0; i < this.taskobjs.length; i++) {
			if (this.taskobjs[i] == taskobj) {
				this.taskobjs.splice(i, 1)
			}
		}
		this.numTaskobjs -= 1
	}
	updateTaskobj(taskobj, type, deadline, taskId, blurb) {
		taskobj.type = type
		taskobj.deadline = deadline
		taskobj.taskId = taskId
		taskobj.blurb = blurb
	}
	
	set admins(adminId) {
		this._admins = adminId
	}
	get admins() {
		return this._admins
	}
	addAdmin(adminId) {
		if (!this.checkAdmin(adminId)) {
			this.admins.push(adminId)
			this.numAdmins += 1
			return true
		}
		return false
	}
	deleteAdmins(adminId) {
		for (let i = 0; i < this.admins.length; i++) {
			if (this.admins[i] == adminId) {
				this.admins.splice(i, 1)
				this.numAdmins -= 1
				return true
			}
		}
		return false
	}
	checkAdmin(adminId) {
		for (let i = 0; i < this.admins.length; i++) {
			if (this.admins[i] == adminId) {
				return admins[i]
			}
		}
		return null
	}
	toString() {
		console.log(this.tasks)
	}
}
export default Course