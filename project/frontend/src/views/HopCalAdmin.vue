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
                console.log("hey")
                const res = await axios.post(
                    `${BASE_URL}/getpotentialinstructors`
                )
                this.potentialInstructors = res.data
            },
            async validate(potentialI) {
                const res = await axios.post(
                    `${BASE_URL}/create_account`, {
                        name: potentialI.name,
                        username: potentialI.username,
                        password: potentialI.password,
                        role: potentialI.role
                    }
                )
            }
        },
    }
</script>

<style scoped>

</style>
