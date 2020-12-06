<template>
    <div style="background-color:cornflowerblue;">
        <h1 style="padding-left:400px; padding-top:40px; padding-bottom:40px">Drop Courses</h1>
        <div class="div" v-for="course in courses" v-bind:key="course.id" style="padding-left:380px; padding-bottom:20px">
            <el-card class="card" style="width:40%">
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
        // remove the given course ID from this user's string of course IDs
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

            // redirect to user's homepage
            if (user.role == 'student' || user.role == 'Student') {
                this.$router.push('/home')
            } else {
                this.$router.push('/InstructorCourses')
            }
        },
        // get all of the user's courses
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
