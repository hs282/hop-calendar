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
        <div class="div"  v-for="course in courses" v-bind:key="course.id">
            <el-card style="height: 200px; width: 900px;">
                <el-checkbox name="drop">{{ course.name }}</el-checkbox>
            </el-card>
        </div>
        <el-button style="background-color:#008CBA; color:white" @click="drop">
                Drop
        </el-button>
        
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
            id: user.id,
        })
        this.courses = res.data.courseArray
        console.log(this.courses)
    },
    drop() {
        const user = this.getUser
        //get all checked courses and delete each one
        /*const response = await axios.post('http://localhost:3000/delete_course',
        {
            username: user.username,
            
            role: 'student'
        });*/
        window.location.reload();
    }
}
</script>

<style scoped></style>
