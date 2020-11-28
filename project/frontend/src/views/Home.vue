home.vue

<template>
    <div class="home">
        <div class="content" style="display:flex; align-items: center;">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-sheet height="600" style="width: 100%">
                <v-calendar
                    ref="calendar"
                    v-model="value"
                    :weekdays="weekday"
                    :type="getMode"
                    :events="events"
                    @click:event="showEvent"
                    :event-overlap-mode="mode"
                    :event-overlap-threshold="30"
                    :event-color="getEventColor"
                    @change="getEvents"
                ></v-calendar>
            </v-sheet>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </div>
        <el-dialog :title="dialogName" :visible.sync="showDialog" width="30%">
            {{ dialogInfo }}
        </el-dialog>
        <div
            class="buttons"
            style="display: flex; justify-content: flex-end; margin-top: 20px; margin-right: 20px;"
        >
            <el-button type="primary" @click="pushMyCourse"
                >My Courses</el-button
            >
            <el-button type="primary" @click="pushAddCourse"
                >Add Course</el-button
            >
            <el-button type="primary" @click="pushDropCourse"
                >Drop Course</el-button
            >
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {BASE_URL} from '../api.js'
import { mapGetters } from 'vuex'
export default {
    data: () => ({
        mode: 'stack',
        modes: ['stack', 'column'],
        weekday: [0, 1, 2, 3, 4, 5, 6],
        courses: [],
        tasks: [],
        value: '',
        events: [],
        colors: [
            'blue',
            'indigo',
            'deep-purple',
            'cyan',
            'green',
            'orange',
            'grey darken-1',
        ],
        names: [
            'Meeting',
            'Holiday',
            'PTO',
            'Travel',
            'Event',
            'Birthday',
            'Conference',
            'Party',
        ],
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        showDialog: false,
        dialogName: '',
        dialogInfo: '',
    }),
    computed: {
        ...mapGetters(['getUser', 'getMode']),
    },
    methods: {
        async pushAddCourse() {
            this.$router.push('AllCourses')
        },
        pushDropCourse() {
            this.$router.push('DropCourses')
        },
        pushMyCourse() {
            this.$router.push('MyCourses')
        },
        getEvents({ start, end }) {
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

            const events = []
            for (let course of this.courses) {
                for (let task of course.taskObjs) {
                    events.push({
                        name: course.name + ': ' + task.type,
                        start: new Date(Date.parse(task.deadline)),
                        end: new Date(Date.parse(task.deadline)),
                        color: this.colors[this.rnd(0, this.colors.length - 1)],
                        timed: false,
                    })
                }
            }
            this.events = events
        },
        getEventColor(event) {
            return event.color
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        showEvent({ nativeEvent, event }) {
            this.showDialog = true
            console.log(event)
            this.dialogName = event.name
            for (let course of this.courses) {
                for (let task of course.taskObjs) {
                    if ((task.name = event.name)) {
                        this.dialogInfo = task.info
                    }
                }
            }
        },
    },
    async mounted() {
        const user = JSON.parse(this.getUser)
        const res = await axios.post(
            `${BASE_URL}/getcourses`,
            {
                id: parseInt(user.id),
                role: 'student',
            }
        )
        this.courses = res.data.courseArray
        this.tasks = res.data.taskArray
        /*const events = []
            for (let task of this.tasks) {
                console.log(task)
                console.log(new Date(Date.parse(task.deadline)))
                events.push({
                    name: task.type,
                    start: new Date(Date.parse(task.deadline)),
                    end: new Date(Date.parse(task.deadline)),
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: false,
                })
            }*/
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

        const events = []
        for (let course of this.courses) {
            for (let task of course.taskObjs) {
                console.log(task)
                console.log(new Date(Date.parse(task.deadline)))
                events.push({
                    name: course.name + ': ' + task.type,
                    start: new Date(Date.parse(task.deadline)),
                    end: new Date(Date.parse(task.deadline)),
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: false,
                })
            }
        }
        this.events = events
    },
}
</script>
