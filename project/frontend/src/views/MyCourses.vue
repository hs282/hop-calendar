<template>
    <div>
        <h1 id="title" style="padding-left: 50px">My Courses</h1>
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
                        @click="view(course.id, course)"
                    >
                        View Tasks
                    </el-button>
                </div>
            </el-card>
            <div class="task" v-for="task in course.taskObjs" v-bind:key="task.id">
                <el-card class="card2" :id="task.id" style="display:none">
                    <div
                        class="body"
                        style="height: 100%; display: flex; justify-content: space-between; align-items: center;"
                    >
                        <span class="type">
                            {{ task.type }}
                        </span>
                        <span class="deadline">
                            {{ task.deadline }}
                        </span>
                        <span class="info">
                            {{ task.info }}
                        </span>
                        <span class="completed">
                            {{ task.completed }}
                        </span>
                        
                        <!--<VueToggles @click="value = !value" :value="value" disabled="false" checkedText="Complete" uncheckedText="Incomplete" width="95"/>-->
                        <toggle-button :value="checkIfCompleted(task.id)" :height="35" :width="120" :font-size="15"
                            color="#08c708" :labels="{checked: 'Complete', unchecked: 'Incomplete'}" @change="toggle($event, task.id, course.id, course)"/>

                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Vue from 'vue'
import { ToggleButton } from 'vue-js-toggle-button'
Vue.component('ToggleButton', ToggleButton)

export default {
    data() {
        return {
            courses: [],
            tasks: [],
            selected: 0,
        }
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    methods: {
        checkIfCompleted(taskID) {
            // if taskID is in user's completed task array, return true. otherwise, return false.
            const user = JSON.parse(this.getUser)
            if (user.completedTasks) {
                if (user.completedTasks.split(',').includes(taskID)) {
                    return true;
                }
            }
            return false;
        },
        async toggle(event, taskID, courseID, course) {

            // if value of toggle button is true, add task to student's completed tasks array
           const user = JSON.parse(this.getUser)
            if (event.value == true) {
                const res = await axios.post(
                    'http://localhost:3000/mark_complete',
                    {
                        taskId: taskID,
                        studentId: user.id
                    }
                )
            }
            else {
                const response = await axios.post(
                    'http://localhost:3000/mark_incomplete',
                    {
                        taskId: taskID,
                        studentId: user.id
                    }
                )
            }
        },
        async view(courseId, course) {
            /*const user = JSON.parse(this.getUser)
            const res = await axios.post(
                'https://immense-garden-94246.herokuapp.com/get_tasks',
                {
                    id: user.id,
                    role: 'student',
                    courseId: courseId,
                }
            )
            this.task_of_courseId = res.data.taskArray
            if (this.task_of_courseId == null) {
                console.log('its null')
            }
            course.tasks = this.task_of_courseId*/
            
            for (let t of course.taskObjs) {
                document.getElementById(t.id).style.display = ""
            }
        },
        async getCourses() {
            const user = JSON.parse(this.getUser)
            const res = await axios.post(
                'https://immense-garden-94246.herokuapp.com/getcourses',
                {
                    id: parseInt(user.id),
                    role: user.role,
                }
            )
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
.card2 {
    height: 100px;
    width: 1000px;
    margin: 20px;
    color: crimson;
}
</style>
