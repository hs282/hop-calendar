<template>
    <div>
        <h1 style="padding-left: 50px">All Courses</h1>
        <el-input style="width:100%; margin: 20px;" placeholder="Search Courses" v-model="search"></el-input>
        <div class="div" v-for="course in courses" v-bind:key="course.id">
            <el-card class="card">
                <div
                    class="body"
                    style="height: 100%; display: flex; justify-content: space-between; align-items: center;"
                >
                    <span class="name">
                        {{ course.classNumber }} <strong>{{ course.name }}:</strong> {{ course.instructor}}
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
import { BASE_URL } from '../api.js'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            courses: [],
            selected: 0,
            allCSCourses: [],
            search: ""
        }
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    watch: {
        // display courses whose names include what's entered in the search bar (case-insensitive)
        search(value) {
            let search = value.toLowerCase()
            this.courses = this.allCSCourses.filter(course =>
                JSON.stringify(course).toLowerCase().includes(search)
            )
        },
    },
    methods: {
        // add the given course ID to this user's string of course IDs
        async add(courseId) {
            const user = JSON.parse(this.getUser)
            const response = await axios.post(
                `${BASE_URL}/add_course`,
                {
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    courseId: courseId,
                }
            )
            if (response.data.success == '0') {
                console.log('wrong course id or already exists in your courses')
            } else {
                // redirect to user's home page
                if (user.role == 'student' || user.role == 'Student') {
                    this.$router.push('/home')
                } else {
                    this.$router.push('/InstructorCourses')
                }
            }
        },
        // get all courses in the database
        async getCourses() {
            const user = JSON.parse(this.getUser)
            const res = await axios.post(
                `${BASE_URL}/AllCourses`
            )
            this.allCSCourses = res.data
            this.courses = res.data
        },
    },
    async mounted() {
        const user = this.getUser
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
