<template>
    <div
        style="height : 100vh; display:flex; justify-content:center; align-items:center;"
    >
        <el-card
            style="height: 500px; width: 500px; display:flex; justify-content:center; align-items:center;"
        >
            <h1>Create Account for Hop Calendar</h1>
            <el-form>
                <el-form-item>
                    <el-radio v-model="role" label="student" id="student"
                        >Student</el-radio
                    >
                    <el-radio v-model="role" label="instructor" id="instructor"
                        >Instructor</el-radio
                    >
                </el-form-item>
                <el-form-item label="JHED ID">
                    <el-input v-model="email" id="input_email"></el-input>
                </el-form-item>
                <el-form-item label="HopCal Password">
                    <el-input v-model="password" id="input_pw"></el-input>
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model="name" id="input_name"></el-input>
                </el-form-item>
            </el-form>
            <el-button id="create_account" @click="create_account()">
                Create Account
            </el-button>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import {BASE_URL} from '../api.js'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            role: '',
            email: '',
            password: '',
            name: '',
        }
    },
    methods: {
        ...mapActions(['setUser']),
        async create_account() {
            try {
                const response = await axios.post(
                    `${BASE_URL}/create_account`,
                    {
                        username: this.email,
                        password: this.password,
                        role: this.role,
                        name: this.name,
                    }
                )
                this.$router.push('/')
            } catch (err) {
                this.$message({
                    message: 'Existing username',
                    type: 'warning',
                })
            }
        },
        pushLogin() {
            this.$router.push('/')
        },
    },
}
</script>

<style scoped></style>
