<template>
    <div>
        <!-- <h1 style="padding-left: 50px">Drop Courses</h1>
        <br />
        <form style="padding-left: 100px">
            <input type="checkbox" /> EN.601.104 Computer Ethics
            <p style="padding-left: 17px">
                W 4:30PM - 6:30PM, T. Leschke
            </p>
            <input type="checkbox" /> EN.601.467 Introduction to Human Language
            Technology
            <p style="padding-left: 17px">
                TTh 9:00AM - 10:15AM, P. Koehn
            </p>
            <input type="checkbox" /> AS.210.111 Spanish Elements
            <p style="padding-left: 17px">
                MWF 9:00AM - 9:50am, M. Tracy
            </p>
            <input type="checkbox" /> AS.020.329 Microbiology
            <p style="padding-left: 17px">
                TTh 10:30AM - 11:45AM, E. Fisher
            </p>
        </form>

        <p style="padding-left: 300px">
            <el-button
                style="background-color:#008CBA; color:white"
                @click="drop"
            >
                Drop
            </el-button>
        </p> -->
        <h1 style="padding-left: 50px">Drop Courses</h1>
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
                        @click="drop(course.id)"
                    >
                        Drop
                    </el-button>
                </div>
            </el-card>
        </div>
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
            selected: 0,
        }
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    methods: {
        async drop(courseId) {
            const user = JSON.parse(this.getUser)
            const response = await axios.post(
                `${BASE_URL}/delete_course`,
                {
                    id: user.id,
                    role: user.role,
                    courseId: courseId,
                }
            )
            this.getCourses()
            if (user.role == 'student' || user.role == 'Student') {
                this.$router.push('/home')
            } else {
                this.$router.push('/InstructorCourses')
            }
        },
        async getCourses() {
            const user = JSON.parse(this.getUser)
            const res = await axios.post(
                `${BASE_URL}/getcourses`,
                {
                    id: parseInt(user.id),
                    role: user.role,
                }
            )
            this.courses = res.data.courseArray
        },
    },
    async mounted() {
        console.log('hello')
        console.log(JSON.parse(this.getUser).id)
        console.log(JSON.parse(this.getUser).role)
        this.getCourses()
    },
}
</script>

<style scoped>
.card {
    height: 100px;
    width: 1000px;
    margin: 20px;
}
</style>
