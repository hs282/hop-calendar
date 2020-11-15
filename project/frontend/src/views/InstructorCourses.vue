<template>
    <div>
        <!--<h1 style="padding-left: 50px">My Courses</h1><br>
        <ul style="padding-left:100px">
            <h2>Object Oriented Software Engineering</h2><br>
            <input type="checkbox"> 10/25: Midterm 1
            <p style="padding-left: 17px">
                Review chapters 1-10 of textbook!
            </p>
            <input type="checkbox"> 10/30: HW3 due
            <p style="padding-left: 17px">
                <a href="https://darvishdarab.github.io/cs421_f20/docs/hw/hw3/">Link to HW3</a>
            </p>
            <el-button style="background-color:#008CBA; color:white" @click="addtask">
                Add task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="deletetask">
                Delete task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="edittask">
                Edit task
                </el-button>
            <br><br><br>

            <h2>General Biology</h2><br>
            <input type="checkbox"> 11/4: Genetics Quiz<br><br>
            <el-button style="background-color:#008CBA; color:white" @click="addtask">
                Add task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="deletetask">
                Delete task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="edittask">
                Edit task
                </el-button>
            
            <el-button type="primary" @click="pushAddCourse" style="display: flex; justify-content: flex-end; margin-top: 20px; margin-right: 20px;">Add Course</el-button>
        </ul>-->
        
        <h1 style="padding-left: 50px">My Courses</h1>
        <div class="div" v-for="course in courses" v-bind:key="course.id">
            <el-card style="height: 500px; width: 900px;">
                {{ course.name }}
                <div class="div" v-for="task in course.taskObjs" v-bind:key="task.id">
                    <span> {{ task.deadline + ":" + task.type }}<br>{{ task.info }}</span>
                    <el-button style="background-color:#008CBA; color:white" @click="document.getElementById('edit').style.display = ''">
                        Edit task</el-button>
                    <el-button style="background-color:#008CBA; color:white" @click="deleteTask(course.id, task.id)">
                        Delete task
                    </el-button>
                    <el-form id="edit" style="display:none" v-on:submit.prevent="editTask(course.id, task.id)"> 
                        <el-form-item>
                            <label>Name: </label>
                            <el-input :value="task.type" size="small" type="text" name="name" id="updatedName" required></el-input>
                        </el-form-item>
                        <el-form-item>
                            <label>Deadline: </label>
                            <el-input :value="task.deadline" size="small" type="text" name="name" id="updatedDeadline" required></el-input>
                        </el-form-item>
                        <el-form-item>
                            <label>Description: </label>
                            <el-input :value="task.info" size="small" type="text" name="name" id="updatedDescription" required></el-input>
                        </el-form-item>
                        <el-input type="submit" value="Submit"></el-input>
                    </el-form>
                </div>
                <el-button style="background-color:#008CBA; color:white" @click="document.getElementById('add').style.display = ''">
                    Add task
                </el-button>
                <el-form id="add" style="display:none" v-on:submit.prevent="addTask(course.id)">
                    <el-form-item>
                       <label>Name: </label>
                       <el-input type="text" name="name" id="name" required></el-input>
                    </el-form-item> 
                    <el-form-item>
                       <label>Deadline: </label>
                       <el-input type="text" name="deadline" id="deadline" required></el-input>
                    </el-form-item>
                    <el-form-item>
                       <label>Description: </label>
                       <el-input type="text" name="description" id="description" required></el-input>
                    </el-form-item>
                    <el-input type="submit" value="Submit"></el-input>
                </el-form>
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
        async addTask(courseID) {
            const res = await axios.post(
                'http://localhost:3000/add_task', 
                {
                    courseId: courseID,
                    type: document.getElementById("name").value,
                    deadline: document.getElementById("deadline").value,
                    info: document.getElementById("description").value,
                }
            )
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
                    type: document.getElementById("updatedName").value,
                    deadline: document.getElementById("updatedDeadline").value,
                    info: document.getElementById("updatedDescription").value,
                }
            )
            this.getCourses();
        },
        async getCourses() {
            const user = JSON.parse(this.getUser)
            const res = await axios.post('http://localhost:3000/getcourses', {
                id: parseInt(user.id),
                role: "instructor"
            })
            this.courses = res.data.courseArray
        },
    },
}
</script>

<style scoped></style>
