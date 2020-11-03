class Task {
	constructor(task) {
        //optional constructor parameter
		if (!task) {
			this.type = ''
			this.deadline = ''
			this.taskId = 0
			this.blurb = ''
		} else {
			this.type = task.type
			this.deadline = task.deadline
			this.taskId = task.taskId
			this.blurb = task.blurb
		}
	}
	get type() {
		return this._type
	}
	set type(type) {
		this._type = type
	}
	set deadline(time) {
		this._deadline = time
	}
	get deadline() {
		return this._deadline
	}
	get taskId() {
		return this._taskId
	}
	set taskId(id) {
		this._taskId = id
	}
	get blurb() {
		return this._blurb
	}
	set blurb(blurb) {
		this._blurb = blurb
	}
}
export default Task
