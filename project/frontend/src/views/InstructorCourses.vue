<template>
    <div>
        <h1 style="padding-left: 50px">My Courses</h1>
        <div class="div" v-for="course in courses" v-bind:key="course.id">
            <el-card style="height: 500px; width: 900px;">
                {{ course.name }}
                <div
                    class="div"
                    v-for="task in course.taskObjs"
                    v-bind:key="task.id"
                >
                    <!-- if this task.id is in course.tasks, then display the following -->
                    {{ task.deadline + ':' + task.type }}<br />{{ task.info }}
                    <el-dialog
                        title="Edit Task"
                        :visible.sync="dialogVisible"
                        width="30%"
                        @open="
                            newType = task.type
                            newDeadline = task.deadline
                            newInfo = task.info
                        "
                    >
                        <el-form>
                            <el-input
                                placeholder="Type"
                                v-model="newType"
                            ></el-input>
                            <el-input
                                placeholder="Deadline"
                                v-model="newDeadline"
                            ></el-input>
                            <el-input
                                placeholder="Info"
                                v-model="newInfo"
                            ></el-input>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false"
                                >Cancel</el-button
                            >
                            <el-button
                                type="primary"
                                @click="
                                    dialogVisible = false
                                    editTask(prevTask.id)
                                "
                                >Confirm</el-button
                            >
                        </span>
                    </el-dialog>
                    <el-button
                        style="background-color:#008CBA; color:white"
                        @click="
                            dialogVisible = true
                            prevTask = task
                        "
                    >
                        Edit task</el-button
                    >
                    <el-button
                        style="background-color:#008CBA; color:white"
                        @click="deleteTask(course.id, task.id)"
                    >
                        Delete task
                    </el-button>
                </div>
                <el-dialog
                    title="Add Task"
                    :visible.sync="dialogAddVisible"
                    width="30%"
                >
                    <el-form>
                        <el-input
                            placeholder="Type"
                            v-model="newT"
                        ></el-input>
                        <el-input
                            placeholder="Deadline"
                            v-model="newD"
                        ></el-input>
                        <el-input
                            placeholder="Info"
                            v-model="newI"
                        ></el-input>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogAddVisible = false"
                            >Cancel</el-button
                        >
                        <el-button
                            type="primary"
                            @click="
                                dialogAddVisible = false
                                addTask(prevCourse.id)
                            "
                            >Confirm</el-button
                        >
                    </span>
                </el-dialog>
                <el-button
                    style="background-color:#008CBA; color:white"
                    @click="
                        dialogAddVisible = true
                        prevCourse = course
                    "
                >
                    Add task
                </el-button>

                <!-- <form :id="course.id" style="display:none">
                    <div>
                        <label>Name: </label>
                        <input id="name" required />
                    </div>
                    <div>
                        <label>Deadline: </label>
                        <input id="deadline" required />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input id="description" required />
                    </div>
                    <el-button id="submitAdd" @click="addTask(course.id)">
                        Submit
                    </el-button>
                </form> -->
            </el-card>
        </div>

        <p style="padding-left: 300px">
            <el-button
                style="background-color:#008CBA; color:white"
                @click="dropCourse"
                >Drop course</el-button
            >
            <el-button
                style="background-color:#008CBA; color:white"
                @click="addCourse"
                >Add course</el-button
            >
        </p>
    </div>
</template>

<script>
import axios from 'axios'
import {BASE_URL} from '../api.js'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            courses: [],
            tasks: [],
            dialogVisible: false,
            dialogAddVisible: false,
            newType: '',
            newDeadline: '',
            newInfo: '',
            newT: '',
            newD: '',
            newI: ''
        }
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    async mounted() {
        /*const user = this.getUser
        const res = await axios.post('https://immense-garden-94246.herokuapp.com/getcourses', {
            role: "instructor",
            id: user.id,
        })
        this.courses = res.data.courseArray
        console.log(this.courses)*/
        console.log(JSON.parse(this.getUser).id)
        this.getCourses()
    },
    methods: {
        dropCourse() {
            this.$router.push('DropCourses')
        },
        addCourse() {
            this.$router.push('AllCourses')
        },
        async displayEditForm(taskID) {
            document.getElementById(taskID).style.display = ''
        },
        async displayAddForm(courseID) {
            document.getElementById(courseID).style.display = ''
        },
        async addTask(courseID) {
            const res = await axios.post(
                `${BASE_URL}/add_task`,
                {
                    courseId: courseID,
                    type: this.newT,
                    deadline: this.newD,
                    info: this.newI,
                }
            )
            //document.getElementById('add').style.display = 'none'
            this.getCourses()
        },
        async deleteTask(courseID, taskID) {
            const user = JSON.parse(this.getUser)
            const response = await axios.post(
                `${BASE_URL}/delete_task`,
                {
                    courseId: courseID,
                    taskId: taskID,
                }
            )
            this.getCourses()
        },
        async editTask(taskID) {
            const res = await axios.post(`${BASE_URL}/edit_task`, {
                taskId: taskID,
                type: this.newType,
                deadline: this.newDeadline,
                info: this.newInfo,
            })
            // document.getElementById('edit').style.display = 'none'
            this.getCourses()
        },
        async getCourses() {
            const user = JSON.parse(this.getUser)
            const res = await axios.post(`${BASE_URL}/getcourses`, {
                id: parseInt(user.id),
                role: 'instructor',
            })
            this.courses = res.data.courseArray
            this.tasks = res.data.taskArray
            this.courses.forEach(course => {
                course.taskObjs = []
                let taskIds = course.tasks.split(',') //ids stored in the course obj
                taskIds.forEach(id => {
                    //1, 2
                    this.tasks.forEach(task => {
                        //looping through all tasks objs from backend
                        //if we find id we are looking for, add it to the taskObjs array.
                        if (parseInt(id) === task.id) {
                            course.taskObjs.push(task)
                        }
                    })
                })
            })
        },
    },
}
</script>

<style scoped></style>
