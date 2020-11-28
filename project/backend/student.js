class Student {
	constructor(student) {
        //optional constructor parameter
		if (!student) {
			this.studentId = 0
			this.name = name
			this.courses = [] //stores courseIDs instead of actual Course objects
			this.username = ''
			this.password = ''
		} else {
			this.studentId = student.studentId
			this.name = student.name
			this.courses = student.courses
			this.username = student.username
			this.password = student.password
		}
	}
	addCourse(courseId) {
		for (let i = 0; i < this.courses.length; i++) {
			if (this.courses[i] == courseId) {
				return false
			}
		}
		this.courses.push(courseId)
		return true
	}
	deleteCourse(courseId) {
		for (let i = 0; i < this.courses.length; i++) {
			if (this.courses[i] == courseId) {
				this.courses.splice(i, 1)
				return true
			}
		}
		return false
	}
    get name() {
		return this._name
	}
	set name(name) {
		this._name = name
	}
	get courses() {
		return this._courses
	}
	set courses(courses) {
		this._courses = courses
	}
	get studentId() {
		return this._studentId
	}
	set studentId(id) {
		this._studentId = id
	}
	get username() {
		return this._username
	}
	set username(username) {
		this._username = username
	}
	get password() {
		return this._password
	}
	set password(password) {
		this._password = password
	}
}
export default Student
