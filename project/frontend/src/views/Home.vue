<template>
    <div class="home">
        <!-- <v-sheet tile height="54" class="d-flex">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select
                v-model="mode"
                :items="modes"
                dense
                outlined
                hide-details
                label="event-overlap-mode"
                class="ma-2"
            ></v-select>
            <v-select
                v-model="weekday"
                :items="weekdays"
                dense
                outlined
                hide-details
                label="weekdays"
                class="ma-2"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-sheet> -->
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

        <div
            class="buttons"
            style="display: flex; justify-content: flex-end; margin-top: 20px; margin-right: 20px;"
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
    }),
    computed: {
        ...mapGetters(['getUser', 'getMode']),
    },
    methods: {
        pushAddCourse() {
            this.$router.push('AllCourses')
        },
        pushDropCourse() {
            this.$router.push('DropCourses')
        },
        getEvents({ start, end }) {
            const events = []
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
            }
            // const min = new Date(`${start.date}T00:00:00`)
            // const max = new Date(`${end.date}T23:59:59`)
            // const days = (max.getTime() - min.getTime()) / 86400000
            // const eventCount = this.rnd(days, days + 20)

            // for (let i = 0; i < eventCount; i++) {
            //     const allDay = this.rnd(0, 3) === 0
            //     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
            //     const first = new Date(
            //         firstTimestamp - (firstTimestamp % 900000)
            //     )
            //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
            //     const second = new Date(first.getTime() + secondTimestamp)

            //     events.push({
            //         name: this.names[this.rnd(0, this.names.length - 1)],
            //         start: first,
            //         end: second,
            //         color: this.colors[this.rnd(0, this.colors.length - 1)],
            //         timed: false,
            //     })
            // }
            this.events = events
        },
        getEventColor(event) {
            return event.color
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    },
    async mounted() {
        const user = this.getUser
        const res = await axios.post('http://localhost:3000/getcourses', {
            id: user.id,
        })
        this.courses = res.data.courseArray
        this.tasks = res.data.taskArray
        console.log(this.tasks)
    },
}
</script>
