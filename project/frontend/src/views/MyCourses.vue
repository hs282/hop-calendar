<template>
    <div>
        <h1 style="padding-left: 50px">My Courses</h1>
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
            <div class="task" v-for="task in course.tasks" v-bind:key="task.id">
                <el-card class="card2">
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
                        
                        <el-button
                            style="background-color:#008CBA; color:white"
                            @click="markComplete(task.id, course.id, course)">
                            Mark as Complete
                        </el-button>

                        <el-button
                            style="background-color:#008CBA; color:white"
                            @click="markIncomplete(task.id, course.id, course)">
                            Mark as Incomplete
                        </el-button>

                    </div>
                </el-card>
            </div>
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
        async markComplete(taskID, courseID, course) {
            const user = JSON.parse(this.getUser)
            const res = await axios.post(
                'http://localhost:3000/mark_complete',
                {
                    taskId: taskID,
                    studentId: user.id
                }
            )
            this.view(courseID, course)
        },
        async markIncomplete(taskID, courseID, course) {
            const user = JSON.parse(this.getUser)
            const res = await axios.post(
                'http://localhost:3000/mark_incomplete',
                {
                    taskId: taskID,
                    studentId: user.id
                }
            )
            this.view(courseID, course)
        },
        async view(courseId, course) {
            const user = JSON.parse(this.getUser)
            const res = await axios.post(
                'http://localhost:3000/get_tasks',
                {
                    id: user.id,
                    role: 'student',
                    courseId: courseId,
                }
            )
            this.task_of_courseId = res.data.taskArray
            if (this.task_of_courseId == null) {
                console.log("its null")
            }
            course.tasks = this.task_of_courseId;

            course.tasks.forEach(task => {
                /*if (user.completedTasks == "") {
                    task.completed = "Incomplete"
                }*/
                task.completed = "Incomplete"
                if (user.completedTasks != null) {
                    let completedTaskArr = user.completedTasks.split(',')
                    completedTaskArr.forEach(completedT => {
                        if (parseInt(completedT) == task.id) {
                            task.completed = "Completed"
                        }
                    })
                }
                /*for (let completedT in completedTaskArr) {
                    if (task.id == parseInt(completedT)) {
                        task.completed = "Complete"
                    }
                }*/
                //task.completed = "Complete"
                /*completedTaskArr.forEach(completedT => {

                })*/
                
            })
        },
        async getCourses() {
            const user = JSON.parse(this.getUser)
            const res = await axios.post('http://localhost:3000/getcourses', {
                id: parseInt(user.id),
                role: user.role,
            })
            this.courses = res.data.courseArray
            
        },
       
    },
    async mounted() {
        console.log('hello')
        console.log(JSON.parse(this.getUser).id)
        console.log(JSON.parse(this.getUser).role)
        this.getCourses();
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
    color:crimson;
} 
</style>