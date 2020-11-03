class Instructor {
	constructor(instructor) {
		if (!instructor) {
			this.instructorId = 0
            this.courses = [] //stores courseIDs instead of actual Course objects
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