class Instructor {
	constructor(instructor) {
		if (!instructor) {
			this.instructorId = 0
            this.courses = []
            this.name = ''
		} else {
            this.instructorId = instructor.instructorId
            this.courses = instructor.courses
            this.name = instructor.name
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
	addCourse(course) {
		this.courses.push(course)
	}
	get courses() {
		return this._courses
	}
	set courses(courses) {
		this._courses = courses
	}
}
module.exports = Instructor