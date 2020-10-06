class Student {
	constructor(student) {
        //optional constructor parameter
		if (!student) {
			this.studentId = 0
			this.name = name
			this.courses = [] //stores courseIDs instead of actual Course objects
		} else {
			this.studentId = student.studentId
			this.name = student.name
			this.courses = student.courses
		}
	}
	addCourse(courseId) {
		this.courses.push(courseId)
	}
	deleteCourse(courseId) {
		for (let i = 0; i < this.courses.length; i++) {
			if (this.courses[i] == courseId) {
				this.courses.splice(i, 1);
			}
		}
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
}
module.exports = Student
