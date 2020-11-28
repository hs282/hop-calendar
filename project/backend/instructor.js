class Instructor {
	constructor(instructor) {
		if (!instructor) {
			this.instructorId = 0
            this.courses = [] //stores courseIDs instead of actual Course objects
			this.name = ''
			this.username = ''
			this.password = ''
		} else {
            this.instructorId = instructor.instructorId
            this.courses = instructor.courses
			this.name = instructor.name
			this.username = instructor.username
			this.password = instructor.password
        }
    }
    get name() {
		return this._name
	}
	set name(name) {
		this._name = name
	}
	get instructorId() {
		return this._instructorId
	}
	set instructorId(id) {
		this._instructorId = id
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
	
	addCourse(courseId) {
		this.courses.push(courseId)
	}
	deleteCourse(courseId) {
		for (let i = 0; i < this.courses.length; i++) {
			if (this.courses[i] == courseId) {
				this.courses.splice(i, 1)
			}
		}
	}
	get courses() {
		return this._courses
	}
	set courses(courses) {
		this._courses = courses
	}
}
export default Instructor