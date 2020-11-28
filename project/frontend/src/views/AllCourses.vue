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
        search(value) {
            let search = value.toLowerCase()
            this.courses = this.allCSCourses.filter(course =>
                JSON.stringify(course).toLowerCase().includes(search)
            )
        },
    },
    methods: {
        async add(courseId) {
            const user = JSON.parse(this.getUser)
            const response = await axios.post(
                `${BASE_URL}/add_course`,
                {
                    id: user.id,
                    role: user.role,
                    username: user.username,
                    courseId: courseId,
                }
            )
            if (response.data.success == '0') {
                console.log('wrong course id or already exists in your courses')
            } else {
                if (user.role == 'student' || user.role == 'Student') {
                    this.$router.push('/home')
                } else {
                    this.$router.push('/InstructorCourses')
                }
            }
        },
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
