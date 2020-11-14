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
        <!--<h1 style="padding-left: 50px">My Courses</h1>
        <div class="div"  v-for="course in courses" v-bind:key="course.id">
            <el-card style="height: 200px; width: 900px;">
                <el-checkbox>{{ course.name }}</el-checkbox>
            </el-card>
            <div class="div" v-for="task in tasks" v-bind:key="task.id">
                <el-card style="height: 200px; width: 900px;">
                    <el-checkbox>{{ task.name }}</el-checkbox>
                </el-card>
            </div>
            <el-button style="background-color:#008CBA; color:white" @click="addtask">
                Add task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="deletetask">
                Delete task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="edittask">
                Edit task
                </el-button>
        </div>-->

        <h1 style="padding-left: 50px">My Courses</h1>
        <div class="div" v-for="course in courses" v-bind:key="course.id">
            <el-card style="height: 200px; width: 900px;">
                {{ course.name }}
                <div class="div" v-for="task in course.taskObjs" v-bind:key="task.id">
                    <el-checkbox> {{ task.deadline + ":" + task.type }}<br>{{ task.info }}</el-checkbox>
                </div>
                <el-button style="background-color:#008CBA; color:white" @click="addTask(course.id)">
                    Add task
                </el-button>
                <el-button style="background-color:#008CBA; color:white" @click="deleteTask">
                    Delete task
                </el-button>
                <el-button style="background-color:#008CBA; color:white" @click="editTask">
                    Edit task
                </el-button>
       
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
        const user = this.getUser
        const res = await axios.post('http://localhost:3000/getcourses', {
            role: "instructor",
            id: user.id,
        })
        this.courses = res.data.courseArray
        console.log(this.courses)
    },
    methods: {
        dropCourse() {
            this.$router.push('DropCourses')
        },
        addCourse() {
            this.$router.push('AllCourses')
        },
        addTask(classId) {
           // display textboxes for instructor to input task's type, deadline, and info
            
            /*const res = await axios.post('http://localhost:3000/add_task', {
                courseId: classId
                type: 
                deadline:
                blurb: 
            })*/
            


        },
        deleteTask() {

        },
        editTask() {

        }
    },
}
</script>

<style scoped></style>