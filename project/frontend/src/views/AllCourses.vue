<template>
    <div>
        <!-- <h1 style="padding-left: 50px">All Courses</h1><br>
        <form style="padding-left: 100px">
            <input type="checkbox"> AS.010.101 Introduction to Art History
            <p style="padding-left: 17px">
                MW 12:00PM - 1:15PM, M. Feldman
            </p>
            <input type="checkbox"> AS.020.151 General Biology
            <p style="padding-left: 17px">
                TTh 12:00PM - 1:15PM, C. Roberson
            </p>
            <input type="checkbox"> EN.520.447 Information Theory
            <p style="padding-left: 17px">
                WF 12:00PM - 1:15PM, J. Prince
            </p>
            <input type="checkbox"> EN.601.315 Databases
            <p style="padding-left: 17px">
                TTh 3:00PM - 4:15PM, D. Yarowsky
            </p>
            <input type="checkbox"> EN.601.340 Web Security
            <p style="padding-left: 17px">
                TTh 12:00PM - 1:15PM, Y. Cao
            </p>
            <input type="checkbox"> EN.601.418 Operating Systems
            <p style="padding-left: 17px">
                TTh 1:30PM - 2:45PM, P. Huang
            </p>
            <input type="checkbox"> EN.601.428 Compilers and Interpreters
            <p style="padding-left: 17px">
                MW 12:00PM - 1:15PM, D. Hovemeyer
            </p>
            <input type="checkbox"> EN.601.104 Computer Ethics
            <p style="padding-left: 17px">
                W 4:30PM - 6:30PM, T. Leschke
            </p>
        </form>
        
        <p style="padding-left: 300px">
            <el-button style="background-color:#008CBA; color:white" @click="add">
                Add
            </el-button>
        </p> -->
        <div class="div" v-for="course in courses" v-bind:key="course.id">
            <el-card class="card">
                <div
                    class="body"
                    style="height: 100%; display: flex; justify-content: space-between; align-items: center;"
                >
                    <span class="name">
                        {{ course.name }}
                    </span>
                    <el-button
                        style="background-color:#008CBA; color:white"
                        @click="add(course.id)"
                    >
                        Add
                    </el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            courses: [],
            selected: 0,
        }
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    methods: {
        async add(courseId) {
            const user = JSON.parse(this.getUser)
            const response = await axios.post(
                'http://localhost:3000/add_course',
                {
                    id: user.id,
                    role: user.role,
                    username: user.username,
                    courseId: courseId,
                }
            )
            if (response.data.success == "0") {
                console.log("wrong course id or already exists in your courses")
            }
        },
        async getCourses() {
            const user = JSON.parse(this.getUser)
            const res = await axios.post('http://localhost:3000/AllCourses')
            console.log(res)
            this.courses = res.data
            if (this.courses == null) {
                console.log("hello")
            }
            console.log(this.courses)
        },
    },
    async mounted() {
        const user = this.getUser
        console.log('hello')
        //this.courses = res.data.courseArray
        this.getCourses();
        //console.log(this.courses)
    },
}

//original
    // async mounted() {
    //         const user = this.getUser
    //         // const res = await axios.post('http://localhost:3000/add_course', {
    //         //     username: user.username,
    //         //     role:
    //         //     courseId: 
    //         // })
    //         this.courses = res.data.courseArray
    //         console.log(this.courses)
    // }
</script>

<style scoped>
.card {
    height: 100px;
    width: 1000px;
    margin: 20px;
}
</style>