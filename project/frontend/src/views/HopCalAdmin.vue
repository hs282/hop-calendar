<template>
    <div>
        <h1 style="padding-left: 50px">Admin</h1>
        <div class="div" v-for="potentialI in potentialInstructors" v-bind:key="potentialI.id">
            <el-card class="card">
                <div
                    class="body"
                    style="height: 100%; display: flex; justify-content: space-between; align-items: center;"
                >
                    <span class="name">
                        {{ potentialI.name }} <strong>{{ potentialI.email }}</strong>
                    </span>
                    <el-button
                        style="background-color:#008CBA; color:white"
                        @click="validate(potentialI)"
                    >
                        Validate Instructor
                    </el-button>
                    <el-button
                        style="background-color:#008CBA; color:white"
                        @click="removePotentialInstructor(potentialI.username)"
                    >
                        Reject Instructor
                    </el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {BASE_URL} from '../api.js'
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                potentialInstructors: []
            }
        },
        async mounted() {
            this.getPotentialInstructors()
        },
        methods: {
            async getPotentialInstructors() {
                const res = await axios.post(
                    `${BASE_URL}/getpotentialinstructors`
                )
                this.potentialInstructors = res.data
            },
            async removePotentialInstructor(username) {
                const response = await axios.post(
                    `${BASE_URL}/removepotentialinstructor`, {
                        username: username,
                    }
                )
            },
            async validate(potentialI) {
                const res = await axios.post(
                    `${BASE_URL}/create_account`, {
                        name: potentialI.name,
                        username: potentialI.username,
                        password: potentialI.password,
                        role: "potentialinstructor",
                        courses: potentialI.courses, //potential instructor's courses
                    }
                )
                this.removePotentialInstructor(potentialI.username)
                this.getPotentialInstructors()
            }
        },
    }
</script>

<style scoped>

</style>
