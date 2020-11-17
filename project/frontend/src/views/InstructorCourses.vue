<template>
    <div>
        <h1 style="padding-left: 50px">My Courses</h1>
        <div class="div" v-for="course in courses" v-bind:key="course.id">
            <el-card style="height: 500px; width: 900px;">
                {{ course.name }}
                <div class="div" v-for="task in tasks" v-bind:key="task.id">   
                    <!-- if this task.id is in course.tasks, then display the following --> 
                    {{ task.deadline + ":" + task.type }}<br>{{ task.info }}
                    <el-button style="background-color:#008CBA; color:white" @click="displayEditForm(task.id)">
                        Edit task</el-button>
                    <el-button style="background-color:#008CBA; color:white" @click="deleteTask(course.id, task.id)">
                        Delete task
                    </el-button>
                    <form :id="task.id" style="display:none"> 
                        <div >
                            <label>Name: </label>
                            <input size="small" id="updatedName" :value="task.type" required/>
                        </div>
                        <div>
                            <label>Deadline: </label>
                            <input size="small" id="updatedDeadline" :value="task.deadline" required/>
                        </div>
                        <div>
                            <label>Description: </label>
                            <input size="small" id="updatedDescription" :value="task.info" required/>
                        </div>
                        <!--<input type="submit" value="Submit"/>-->
                        <el-button id="submitEdit" @click="editTask(course.id , task.id)">
                            Submit
                        </el-button>
                    </form>


                    
                </div>
                
                <el-button style="background-color:#008CBA; color:white" @click="displayAddForm(course.id)">
                    Add task
                </el-button>

                <form :id="course.id" style="display:none">
                    <div>
                        <label>Name: </label>
                       <input id="name" required/>
                    </div> 
                    <div>
                        <label>Deadline: </label>
                       <input id="deadline" required/>
                    </div>
                    <div>
                        <label>Description: </label>
                       <input id="description" required/>
                    </div>
                    <el-button id="submitAdd" @click="addTask(course.id)">
                        Submit
                    </el-button>
                </form>
            </el-card>
        </div>

        <p style="padding-left: 300px">
            <el-button style="background-color:#008CBA; color:white" @click="dropCourse">Drop course</el-button>
            <el-button style="background-color:#008CBA; color:white" @click="addCourse">Add course</el-button>
        </p>
            
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            courses: [],
            tasks: []
        }
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    async mounted() {
        /*const user = this.getUser
        const res = await axios.post('http://localhost:3000/getcourses', {
            role: "instructor",
            id: user.id,
        })
        this.courses = res.data.courseArray
        console.log(this.courses)*/
        console.log(JSON.parse(this.getUser).id)
        this.getCourses();
    },
    methods: {
        dropCourse() {
            this.$router.push('DropCourses')
        },
        addCourse() {
            this.$router.push('AllCourses')
        },
        async displayEditForm(taskID) {
            document.getElementById(taskID).style.display = ""
        },
        async displayAddForm(courseID) {
            document.getElementById(courseID).style.display = ""
        },
        async addTask(courseID) {
            const res = await axios.post(
                'http://localhost:3000/add_task', 
                {
                    courseId: courseID,
                    type: document.getElementById("name"),
                    deadline: document.getElementById("deadline"),
                    info: document.getElementById("description")
                }
            )
            document.getElementById("add").style.display = "none"
            this.getCourses();
        },
        async deleteTask(courseID, taskID) {
            const user = JSON.parse(this.getUser)
            const response = await axios.post(
                'http://localhost:3000/delete_task',
                {
                    courseId: courseID,
                    taskId: taskID,
                }
            )
            this.getCourses();
        },
        async editTask(courseID, taskID) {
            const res = await axios.post(
                'http://localhost:3000/edit_task', 
                {
                    courseId: courseID,
                    taskId: taskID,
                    type: document.getElementById("updatedName"),
                    deadline: document.getElementById("updatedDeadline"),
                    info: document.getElementById("updatedDescription")
                }
            )
            document.getElementById("edit").style.display = "none"
            this.getCourses();
        },
        async getCourses() {
            const user = JSON.parse(this.getUser)
            const res = await axios.post('http://localhost:3000/getcourses', {
                id: parseInt(user.id),
                role: 'instructor'
            })
            this.courses = res.data.courseArray
            this.tasks = res.data.taskArray
        },
    },
}
</script>

<style scoped></style>
